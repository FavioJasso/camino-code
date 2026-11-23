import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn(async () => ({ data: { id: "1" }, error: null }));
vi.mock("resend", () => ({ Resend: class { emails = { send }; } }));
vi.mock("@vercel/analytics/server", () => ({ track: vi.fn(async () => {}) }));
let ip = "203.0.113.7";
let spoofedXff = "";
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-real-ip": ip, ...(spoofedXff ? { "x-forwarded-for": spoofedXff } : {}) }),
}));

import { signTimestamp, visitorKeyFromIp } from "@/lib/booking";
import { resetAbuseGuard } from "@/lib/abuse-guard";
import { issueFormToken, submitBooking } from "./actions";

const SECRET = "test-secret";
const idle = { status: "idle" as const };

function booking(token?: string) {
  const f = new FormData();
  f.set("name", "Ana Diaz");
  f.set("email", "ana@example.com");
  f.set("business", "Diaz Plumbing, a plumbing company");
  if (token !== undefined) f.set("t", token);
  return f;
}
const freshToken = (from = ip) => signTimestamp(Date.now() - 10_000, SECRET, visitorKeyFromIp(from));
const tokenAged = (ms: number) => signTimestamp(Date.now() - ms, SECRET, visitorKeyFromIp(ip));

// every refusal writes one line to the server log; the tests read it and keep the test output quiet
const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
const logged = () => warn.mock.calls.map((args) => args.join(" "));
const reasons = () => logged().flatMap((line) => /^\[booking\] fallback: (.+)$/.exec(line)?.[1] ?? []);

beforeEach(() => {
  send.mockClear();
  warn.mockClear();
  resetAbuseGuard();
  ip = "203.0.113.7";
  spoofedXff = "";
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("BOOKING_FROM", "site@send.caminocode.com");
  vi.stubEnv("FORM_SECRET", SECRET);
  vi.stubEnv("VERCEL_ENV", "preview");
  vi.stubEnv("BOOKING_TEST_MODE", "");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

describe("submitBooking spam protection", () => {
  it("sends with a valid token", async () => {
    expect((await submitBooking(idle, booking(freshToken()))).status).toBe("sent");
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("refuses to send when the token is missing, and keeps the typed values", async () => {
    const r = await submitBooking(idle, booking());
    expect(r.status).toBe("error");
    expect(r.errors?.form).toContain("contact@caminocode.com");
    expect(r.values?.name).toBe("Ana Diaz");
    expect(send).not.toHaveBeenCalled();
  });

  it("refuses to send when the token is empty or forged", async () => {
    for (const t of ["", signTimestamp(Date.now() - 10_000, "wrong-secret", visitorKeyFromIp(ip))]) {
      expect((await submitBooking(idle, booking(t))).status).toBe("error");
    }
    expect(send).not.toHaveBeenCalled();
  });

  it("refuses to send in production when FORM_SECRET is missing", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("FORM_SECRET", "");
    const devToken = signTimestamp(Date.now() - 10_000, "camino-code-development-only-secret", visitorKeyFromIp(ip));
    expect((await submitBooking(idle, booking(devToken))).status).toBe("error");
    expect(send).not.toHaveBeenCalled();
  });

  it("ignores the test-mode shortcut in production", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("BOOKING_TEST_MODE", "sent");
    const f = booking(freshToken());
    f.set("business", "__test_sent__");
    await submitBooking(idle, f);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("sends only once per token: a replayed token never sends", async () => {
    const token = freshToken();
    expect((await submitBooking(idle, booking(token))).status).toBe("sent");
    for (let i = 0; i < 3; i++) {
      const r = await submitBooking(idle, booking(token));
      expect(r.status).toBe("error");
      expect(r.values?.name).toBe("Ana Diaz");
    }
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("allows 5 sends per visitor per 10 minutes, then falls back to email", async () => {
    for (let i = 0; i < 5; i++) expect((await submitBooking(idle, booking(freshToken()))).status).toBe("sent");
    expect((await submitBooking(idle, booking(freshToken()))).status).toBe("error");
    expect(send).toHaveBeenCalledTimes(5);
    ip = "198.51.100.4"; // a different visitor is unaffected
    expect((await submitBooking(idle, booking(freshToken()))).status).toBe("sent");
  });

  it("ignores the test override of the send limit in production", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("BOOKING_SENDS_PER_10_MIN", "1000");
    for (let i = 0; i < 5; i++) await submitBooking(idle, booking(freshToken()));
    expect((await submitBooking(idle, booking(freshToken()))).status).toBe("error");
    expect(send).toHaveBeenCalledTimes(5);
  });

  it("refuses a token issued to a different visitor", async () => {
    expect((await submitBooking(idle, booking(freshToken("198.51.100.9")))).status).toBe("error");
    expect(send).not.toHaveBeenCalled();
  });

  it("trusts x-real-ip, so a spoofed x-forwarded-for cannot open a fresh bucket", async () => {
    for (let i = 0; i < 5; i++) {
      spoofedXff = `10.0.0.${i}`;
      await submitBooking(idle, booking(freshToken()));
    }
    spoofedXff = "10.0.0.99";
    expect((await submitBooking(idle, booking(freshToken()))).status).toBe("error");
    expect(send).toHaveBeenCalledTimes(5);
  });

  it("counts a whole IPv6 /64 as one visitor", async () => {
    for (let i = 1; i <= 5; i++) {
      ip = `2001:db8:abcd:12::${i}`;
      expect((await submitBooking(idle, booking(freshToken()))).status).toBe("sent");
    }
    ip = "2001:db8:abcd:12:ffff::1";
    expect((await submitBooking(idle, booking(freshToken()))).status).toBe("error");
    ip = "2001:db8:abcd:13::1"; // a different /64
    expect((await submitBooking(idle, booking(freshToken()))).status).toBe("sent");
  });

  it("reopens a visitor's sends after the 10-minute window", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-11-12T10:00:00Z"));
    for (let i = 0; i < 5; i++) await submitBooking(idle, booking(freshToken()));
    expect((await submitBooking(idle, booking(freshToken()))).status).toBe("error");
    vi.setSystemTime(new Date("2026-11-12T10:10:01Z"));
    expect((await submitBooking(idle, booking(freshToken()))).status).toBe("sent");
  });

  it("caps sends per server at 60 an hour in production, whatever the addresses", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    for (let i = 0; i < 61; i++) {
      ip = `192.0.2.${i + 1}`;
      await submitBooking(idle, booking(freshToken()));
    }
    expect(send).toHaveBeenCalledTimes(60);
  });

  it("never lets one visitor exhaust the server's hourly ceiling", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-11-12T10:00:00Z"));
    // Every 10 minutes: one fresh token, sent once and then replayed four times (5 attempts per window).
    for (let minute = 0; minute < 60; minute += 10) {
      vi.setSystemTime(new Date(Date.parse("2026-11-12T10:00:00Z") + minute * 60_000));
      const token = freshToken();
      for (let i = 0; i < 5; i++) await submitBooking(idle, booking(token));
    }
    ip = "198.51.100.20"; // a different visitor can still book
    expect((await submitBooking(idle, booking(freshToken()))).status).toBe("sent");
  });

  it("stops issuing tokens to a visitor who requests more than 30 in 10 minutes", async () => {
    const tokens = [];
    for (let i = 0; i < 31; i++) tokens.push(await issueFormToken());
    expect(tokens.slice(0, 30).every((t) => t.length > 0)).toBe(true);
    expect(tokens[30]).toBe("");
  });
});

describe("submitBooking refusals the form can recover from", () => {
  it("marks a refusal as retryable when the token was the only thing wrong", async () => {
    const cases: [string, string | undefined, string][] = [
      ["missing", undefined, "token-missing"],
      ["empty", "", "token-missing"],
      ["not a token", "garbage", "token-malformed"],
      ["too young", tokenAged(1_000), "token-young"],
      ["expired", tokenAged(30 * 60_000 + 1_000), "token-expired"],
      ["issued to another network", freshToken("198.51.100.9"), "token-signature"],
      ["forged", signTimestamp(Date.now() - 10_000, "wrong-secret", visitorKeyFromIp(ip)), "token-signature"],
    ];
    for (const [label, token, reason] of cases) {
      warn.mockClear();
      const r = await submitBooking(idle, booking(token));
      expect(r.status, label).toBe("error");
      expect(r.retry, label).toBe(true);
      expect(r.values?.name, label).toBe("Ana Diaz");
      expect(reasons(), label).toEqual([reason]);
    }
    expect(send).not.toHaveBeenCalled();
  });

  it("marks a token that was already used as retryable, and still never sends it twice", async () => {
    const token = freshToken();
    expect((await submitBooking(idle, booking(token))).status).toBe("sent");
    const replay = await submitBooking(idle, booking(token));
    expect(replay.retry).toBe(true);
    expect(reasons()).toEqual(["token-used"]);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("sends the same values once a fresh token comes with them, under the same checks as any send", async () => {
    const first = await submitBooking(idle, booking(tokenAged(31 * 60_000)));
    expect(first.retry).toBe(true);
    // the form's automatic resend: a new token from the server, old enough by the time it is sent
    vi.useFakeTimers({ toFake: ["Date"] });
    const fresh = await issueFormToken();
    expect(fresh).not.toBe("");
    const tooSoon = await submitBooking(idle, booking(fresh));
    expect(tooSoon.status).toBe("error"); // the 3-second minimum holds for a resend too
    expect(tooSoon.retry).toBe(true);
    vi.setSystemTime(Date.now() + 3_500);
    const second = await submitBooking(idle, booking(fresh));
    expect(second.status).toBe("sent");
    expect(second.retry).toBeUndefined();
    expect(send).toHaveBeenCalledTimes(1);
    // and that token is spent like any other
    expect((await submitBooking(idle, booking(fresh))).status).toBe("error");
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("does not mark a refusal as retryable when a fresh token would not help", async () => {
    // a field error: the form is shown again with the messages, and nothing is logged as a fallback
    const invalid = booking(freshToken());
    invalid.set("email", "ana@");
    const fieldError = await submitBooking(idle, invalid);
    expect(fieldError.errors?.email).toBeTruthy();
    expect(fieldError.retry).toBeUndefined();
    expect(reasons()).toEqual([]);

    // the visitor's send limit
    for (let i = 0; i < 5; i++) await submitBooking(idle, booking(freshToken()));
    const limited = await submitBooking(idle, booking(freshToken()));
    expect(limited.status).toBe("error");
    expect(limited.retry).toBeUndefined();
    expect(reasons()).toEqual(["rate-visitor"]);

    // the mail service is not set up
    ip = "198.51.100.30";
    warn.mockClear();
    vi.stubEnv("RESEND_API_KEY", "");
    const unset = await submitBooking(idle, booking(freshToken()));
    expect(unset.status).toBe("error");
    expect(unset.retry).toBeUndefined();
    expect(reasons()).toEqual(["mail-not-configured"]);

    // the mail service refuses
    warn.mockClear();
    vi.stubEnv("RESEND_API_KEY", "re_test");
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    send.mockResolvedValueOnce({ data: null, error: { message: "domain is not verified" } } as never);
    const refused = await submitBooking(idle, booking(freshToken()));
    error.mockRestore();
    expect(refused.status).toBe("error");
    expect(refused.retry).toBeUndefined();
    expect(reasons()).toEqual(["send-failed"]);
  });

  it("does not mark a missing FORM_SECRET in production as retryable", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("FORM_SECRET", "");
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const r = await submitBooking(idle, booking(freshToken()));
    error.mockRestore();
    expect(r.status).toBe("error");
    expect(r.retry).toBeUndefined();
    expect(reasons()).toEqual(["no-secret"]);
  });

  it("logs a reason code for each fallback and nothing the visitor typed, their address or the token", async () => {
    const token = freshToken("198.51.100.9");
    const f = booking(token);
    f.set("phone", "973 555 0100");
    f.set("lookAt", "Our invoices");
    f.set("referrer", "Maria");
    await submitBooking(idle, f);
    for (let i = 0; i < 6; i++) await submitBooking(idle, booking(freshToken()));
    const lines = logged().join("\n");
    expect(reasons()).toEqual(["token-signature", "rate-visitor"]);
    for (const secretish of ["Ana", "ana@example.com", "Diaz", "973 555 0100", "Our invoices", "Maria", ip, token]) {
      expect(lines, secretish).not.toContain(secretish);
    }
  });

  it("says in the fallback message that the details are kept, and gives the email address and the phone number", async () => {
    const r = await submitBooking(idle, booking());
    expect(r.errors?.form).toBe(
      "We couldn't send this. Your details are still in the form, so you can try again. You can also call +1 973-234-2073, or email us at contact@caminocode.com and we'll reply within one business day.",
    );
  });
});

describe("submitBooking success", () => {
  it("gives back the address the reply will go to, trimmed", async () => {
    const f = booking(freshToken());
    f.set("email", "  ana@example.com ");
    expect(await submitBooking(idle, f)).toEqual({ status: "sent", sentTo: "ana@example.com" });
  });

  it("gives the address back in test mode too", async () => {
    vi.stubEnv("BOOKING_TEST_MODE", "sent");
    const f = booking(freshToken());
    f.set("business", "__test_sent__");
    expect(await submitBooking(idle, f)).toEqual({ status: "sent", sentTo: "ana@example.com" });
    expect(send).not.toHaveBeenCalled();
  });

  it("gives a filled honeypot the very answer a real send gets, address included, with no email sent", async () => {
    const real = booking(freshToken());
    real.set("email", "  ana@example.com ");
    const answer = await submitBooking(idle, real);
    send.mockClear();
    const f = booking(freshToken());
    f.set("email", "  ana@example.com ");
    f.set("hp_note", "http://spam.example");
    expect(await submitBooking(idle, f)).toEqual(answer);
    expect(answer).toEqual({ status: "sent", sentTo: "ana@example.com" });
    expect(send).not.toHaveBeenCalled();
    expect(reasons()).toEqual([]);
  });

  it("shows a filled honeypot no address when it gave none, or one too long to be an address", async () => {
    for (const email of ["", "   ", `${"a".repeat(250)}@example.com`]) {
      const f = booking(freshToken());
      f.set("email", email);
      f.set("hp_note", "http://spam.example");
      expect(await submitBooking(idle, f), email).toEqual({ status: "sent" });
    }
    expect(send).not.toHaveBeenCalled();
  });
});
