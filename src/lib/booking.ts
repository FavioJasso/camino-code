import { createHmac, timingSafeEqual } from "node:crypto";

export type Booking = {
  name: string;
  email: string;
  business: string;
  phone?: string;
  lookAt?: string;
  referrer?: string;
};

export type BookingErrors = Partial<Record<keyof Booking | "form", string>>;

export type ParseResult = { ok: true; data: Booking } | { ok: false; errors: BookingErrors };

/** Marker returned in `errors.form` when the honeypot was filled. */
export const SPAM = "spam";

export const LIMITS = { name: 100, email: 254, business: 200, phone: 40, lookAt: 2000, referrer: 100 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_AGE_MS = 3_000;
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

function text(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export function parseBooking(form: FormData, now: number): ParseResult {
  void now; // timing is checked separately with verifyTimestamp (it needs the secret)
  if (text(form, "website") !== "") return { ok: false, errors: { form: SPAM } };

  const errors: BookingErrors = {};
  const name = text(form, "name");
  const email = text(form, "email");
  const business = text(form, "business");
  const phone = text(form, "phone");
  const lookAt = text(form, "lookAt");
  const referrer = text(form, "referrer");

  if (!name) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep your name to ${LIMITS.name} characters or fewer.`;

  if (!email) errors.email = "Enter your email address.";
  else if (email.length > LIMITS.email || !EMAIL.test(email))
    errors.email = "Enter an email address like name@example.com.";

  if (!business) errors.business = "Enter your business name and what it does.";
  else if (business.length > LIMITS.business)
    errors.business = `Keep this to ${LIMITS.business} characters or fewer.`;

  if (phone.length > LIMITS.phone) errors.phone = `Keep your phone number to ${LIMITS.phone} characters or fewer.`;
  if (lookAt.length > LIMITS.lookAt) errors.lookAt = `Keep this to ${LIMITS.lookAt} characters or fewer.`;
  if (referrer.length > LIMITS.referrer)
    errors.referrer = `Keep this to ${LIMITS.referrer} characters or fewer.`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const data: Booking = { name, email, business };
  if (phone) data.phone = phone;
  if (lookAt) data.lookAt = lookAt;
  if (referrer) data.referrer = referrer;
  return { ok: true, data };
}

function mac(t: number, secret: string): string {
  return createHmac("sha256", secret).update(String(t)).digest("hex");
}

export function signTimestamp(t: number, secret: string): string {
  return `${t}.${mac(t, secret)}`;
}

/** Valid when the signature matches and the token is between 3 seconds and 2 hours old. */
export function verifyTimestamp(token: string, secret: string, now: number): boolean {
  const [stamp, sig, extra] = token.split(".");
  if (!stamp || !sig || extra !== undefined || !/^\d+$/.test(stamp)) return false;
  const t = Number(stamp);
  const expected = Buffer.from(mac(t, secret));
  const given = Buffer.from(sig);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false;
  const age = now - t;
  return age >= MIN_AGE_MS && age <= MAX_AGE_MS;
}
