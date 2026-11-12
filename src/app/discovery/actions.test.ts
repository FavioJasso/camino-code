import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn(async () => ({ data: { id: "1" }, error: null }));
vi.mock("resend", () => ({ Resend: class { emails = { send }; } }));
vi.mock("@vercel/analytics/server", () => ({ track: vi.fn(async () => {}) }));
let ip = "203.0.113.7";
vi.mock("next/headers", () => ({ headers: async () => new Headers({ "x-forwarded-for": ip }) }));

import { signTimestamp } from "@/lib/booking";
import { resetAbuseGuard } from "@/lib/abuse-guard";
import { submitBooking } from "./actions";

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
const freshToken = () => signTimestamp(Date.now() - 10_000, SECRET);

beforeEach(() => {
  send.mockClear();
  resetAbuseGuard();
  ip = "203.0.113.7";
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("BOOKING_FROM", "site@send.caminocode.com");
  vi.stubEnv("FORM_SECRET", SECRET);
  vi.stubEnv("VERCEL_ENV", "preview");
  vi.stubEnv("BOOKING_TEST_MODE", "");
});
afterEach(() => vi.unstubAllEnvs());

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
    for (const t of ["", signTimestamp(Date.now() - 10_000, "wrong-secret")]) {
      expect((await submitBooking(idle, booking(t))).status).toBe("error");
    }
    expect(send).not.toHaveBeenCalled();
  });

  it("refuses to send in production when FORM_SECRET is missing", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("FORM_SECRET", "");
    const devToken = signTimestamp(Date.now() - 10_000, "camino-code-development-only-secret");
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
});
