import { describe, expect, it } from "vitest";
import { SPAM, parseBooking, signTimestamp, verifyTimestamp } from "./booking";

function form(fields: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}
const valid = { name: "Ana Ruiz", email: "ana@example.com", business: "Ruiz Bakery, wholesale bread" };

describe("parseBooking", () => {
  it("rejects missing name, email, business with field messages", () => {
    const r = parseBooking(form({ name: " ", email: "", business: "" }), 0);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(Object.keys(r.errors).sort()).toEqual(["business", "email", "name"]);
      for (const m of Object.values(r.errors)) expect(m).toMatch(/\S/);
    }
  });

  it("rejects malformed email", () => {
    for (const email of ["ana", "ana@", "a na@example.com", "ana@example"]) {
      const r = parseBooking(form({ ...valid, email }), 0);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.errors.email).toBeTruthy();
    }
  });

  it("rejects any value over its length limit (name 100, business 200, lookAt 2000)", () => {
    const cases: [string, number][] = [["name", 100], ["business", 200], ["lookAt", 2000]];
    for (const [key, max] of cases) {
      const ok = parseBooking(form({ ...valid, [key]: "x".repeat(max) }), 0);
      expect(ok.ok).toBe(true);
      const bad = parseBooking(form({ ...valid, [key]: "x".repeat(max + 1) }), 0);
      expect(bad.ok).toBe(false);
      if (!bad.ok) expect(bad.errors[key as "name"]).toBeTruthy();
    }
  });

  it('treats a filled honeypot field "website" as spam', () => {
    const r = parseBooking(form({ ...valid, website: "http://spam.example" }), 0);
    expect(r).toEqual({ ok: false, errors: { form: SPAM } });
  });

  it("accepts a valid booking and trims values", () => {
    const r = parseBooking(
      form({ ...valid, name: "  Ana Ruiz ", phone: " 555 0100 ", lookAt: " Our invoices ", referrer: " maria " }),
      0,
    );
    expect(r).toEqual({
      ok: true,
      data: {
        name: "Ana Ruiz",
        email: "ana@example.com",
        business: valid.business,
        phone: "555 0100",
        lookAt: "Our invoices",
        referrer: "maria",
      },
    });
  });
});

describe("timestamp tokens", () => {
  const secret = "s3cret";
  const t = 1_000_000;
  it("rejects a timestamp younger than 3 s or older than 2 h or with a bad signature", () => {
    const token = signTimestamp(t, secret);
    expect(verifyTimestamp(token, secret, t + 2_999)).toBe(false);
    expect(verifyTimestamp(token, secret, t + 3_000)).toBe(true);
    expect(verifyTimestamp(token, secret, t + 2 * 3600_000)).toBe(true);
    expect(verifyTimestamp(token, secret, t + 2 * 3600_000 + 1)).toBe(false);
    expect(verifyTimestamp(token, "other", t + 5_000)).toBe(false);
    expect(verifyTimestamp(token.replace(/.$/, "0"), secret, t + 5_000)).toBe(false);
    expect(verifyTimestamp(`${t + 1}.${token.split(".")[1]}`, secret, t + 5_000)).toBe(false);
    expect(verifyTimestamp("", secret, t + 5_000)).toBe(false);
    expect(verifyTimestamp("garbage", secret, t + 5_000)).toBe(false);
  });
});
