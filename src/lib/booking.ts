import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { LIMITS, MAX_AGE_MS, MIN_AGE_MS, type Booking, type BookingErrors } from "./booking-shared";

// Tokens are short-lived (MIN_AGE_MS to MAX_AGE_MS old) and single-use (see abuse-guard.ts), so a captured token cannot be replayed for long.
export { LIMITS, MAX_AGE_MS, type Booking, type BookingErrors };

export type ParseResult = { ok: true; data: Booking } | { ok: false; errors: BookingErrors };

/** Marker returned in `errors.form` when the honeypot was filled. */
export const SPAM = "spam";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export function parseBooking(form: FormData, now: number): ParseResult {
  void now; // timing is checked separately with verifyTimestamp (it needs the secret)
  if (text(form, "hp_note") !== "") return { ok: false, errors: { form: SPAM } };

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

function mac(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * `<timestamp>.<nonce>.<hmac>`: the random nonce makes every token unique, so each can be consumed once,
 * and the HMAC also covers `visitor` (the requester's network key), so a token only works from where it was issued.
 */
export function signTimestamp(
  t: number,
  secret: string,
  visitor = "",
  nonce: string = randomBytes(12).toString("hex"),
): string {
  return `${t}.${nonce}.${mac(`${t}.${nonce}.${visitor}`, secret)}`;
}

/** Why a token was refused. "signature" covers a forged token and one issued to a different visitor: the two cannot be told apart. */
export type TokenVerdict = "ok" | "malformed" | "signature" | "young" | "expired";

/**
 * "ok" when the signature matches for this visitor and the token is between 3 seconds and 30 minutes old.
 * The signature is checked before the age, so a forged token learns nothing about the time window.
 */
export function checkTimestamp(token: string, secret: string, now: number, visitor = ""): TokenVerdict {
  const [stamp, nonce, sig, extra] = token.split(".");
  if (!stamp || !nonce || !sig || extra !== undefined || !/^\d+$/.test(stamp) || !/^[0-9a-f]{24}$/.test(nonce)) return "malformed";
  const t = Number(stamp);
  const expected = Buffer.from(mac(`${stamp}.${nonce}.${visitor}`, secret));
  const given = Buffer.from(sig);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return "signature";
  const age = now - t;
  if (age < MIN_AGE_MS) return "young";
  return age <= MAX_AGE_MS ? "ok" : "expired";
}

/** Valid when the signature matches for this visitor and the token is between 3 seconds and 30 minutes old. */
export function verifyTimestamp(token: string, secret: string, now: number, visitor = ""): boolean {
  return checkTimestamp(token, secret, now, visitor) === "ok";
}

/** The deadline after which a token can never verify again (used to expire consumed-token records). */
export function tokenDeadline(token: string): number {
  const t = Number(token.split(".")[0]);
  return Number.isFinite(t) ? t + MAX_AGE_MS : 0;
}

/**
 * Network key for per-visitor limits: IPv4 as is, IPv6 truncated to its /64 (one household or
 * server usually controls a whole /64, so per-address buckets could be rotated).
 */
export function visitorKeyFromIp(ip: string): string {
  let a = ip.trim().toLowerCase();
  if (!a) return "unknown";
  if (a.startsWith("::ffff:") && a.slice(7).includes(".")) a = a.slice(7); // IPv4-mapped IPv6
  if (!a.includes(":")) return a;
  const [head, tail = ""] = a.split("::");
  const h = head ? head.split(":") : [];
  const tl = a.includes("::") ? (tail ? tail.split(":") : []) : [];
  const full = a.includes("::") ? [...h, ...Array(Math.max(0, 8 - h.length - tl.length)).fill("0"), ...tl] : h;
  return full.slice(0, 4).map((x) => x.replace(/^0+(?=.)/, "")).join(":") + "::/64";
}
