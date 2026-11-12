"use server";

import { track } from "@vercel/analytics/server";
import { Resend } from "resend";
import { headers } from "next/headers";
import {
  SPAM,
  parseBooking,
  signTimestamp,
  tokenDeadline,
  verifyTimestamp,
  visitorKeyFromIp,
  type Booking,
  type BookingErrors,
} from "@/lib/booking";
import { allowGlobalSend, allowSend, consumeToken } from "@/lib/abuse-guard";
import { site } from "@/content/site";

export type State = {
  status: "idle" | "error" | "sent";
  errors?: BookingErrors;
  values?: Partial<Booking>;
};

const FALLBACK = `We couldn't send this. Email us at ${site.contact.email} and we'll reply within one business day.`;
const DEV_SECRET = "camino-code-development-only-secret";

const isProduction = () => process.env.VERCEL_ENV === "production";

/** Sends allowed per visitor in a 10-minute window. BOOKING_SENDS_PER_10_MIN raises it for automated tests only. */
const SEND_WINDOW_MS = 10 * 60 * 1000;
function sendLimit(): number {
  const n = Number(process.env.BOOKING_SENDS_PER_10_MIN);
  return Number.isInteger(n) && n > 0 && !isProduction() ? n : 5;
}
/** Sends per visitor per hour, kept well below the instance ceiling so one visitor can never exhaust it. */
const SENDS_PER_VISITOR_PER_HOUR = 10;
/** Ceiling on sends per server instance per hour, whatever addresses they come from. */
const GLOBAL_SENDS_PER_HOUR = 60;
const HOUR_MS = 60 * 60 * 1000;
/** Tokens a visitor may request per 10 minutes (the form asks for one after mount and after each result). */
function mintLimit(): number {
  return isProduction() ? 30 : Math.max(30, sendLimit());
}
let mintWarned = false;

/**
 * The visitor's network key. On Vercel, x-real-ip is set by the platform and cannot be supplied by
 * the client; x-forwarded-for is not trusted because other hosts pass it through from the client.
 */
async function visitorKey(): Promise<string> {
  const h = await headers();
  return visitorKeyFromIp(h.get("x-real-ip") ?? "");
}

let warned = false;
/** The signing secret, or null in production when FORM_SECRET is missing (a public fallback would make tokens forgeable). */
function secret(): string | null {
  const s = process.env.FORM_SECRET;
  if (s) return s;
  if (isProduction()) {
    console.error("[booking] FORM_SECRET is not set in production; bookings fall back to email.");
    return null;
  }
  if (!warned) {
    warned = true;
    console.warn("[booking] FORM_SECRET is not set; signing form timestamps with a development secret.");
  }
  return DEV_SECRET;
}

/** Called by the form once it is on screen, so the page itself stays statically prerendered. */
export async function issueFormToken(): Promise<string> {
  const s = secret();
  if (!s) return "";
  const visitor = await visitorKey();
  if (!allowSend(`mint:${visitor}`, Date.now(), mintLimit(), SEND_WINDOW_MS)) {
    if (!mintWarned) {
      mintWarned = true;
      console.warn("[booking] token requests limited for a visitor; their next submit falls back to email.");
    }
    return "";
  }
  return signTimestamp(Date.now(), s, visitor);
}

function valuesOf(form: FormData): Partial<Booking> {
  const out: Partial<Booking> = {};
  for (const key of ["name", "email", "business", "phone", "lookAt", "referrer"] as const) {
    const v = form.get(key);
    if (typeof v === "string") out[key] = v;
  }
  return out;
}

function oneLine(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

export async function submitBooking(_prev: State, form: FormData): Promise<State> {
  const values = valuesOf(form);
  const parsed = parseBooking(form, Date.now());
  if (!parsed.ok) {
    if (parsed.errors.form === SPAM) return { status: "sent" };
    return { status: "error", errors: parsed.errors, values };
  }

  // Every send needs a valid signed timestamp, which the form gets once its script has run.
  // Missing, forged or stale tokens (including JavaScript-off visitors) get the email fallback,
  // never a silent drop and never an email.
  const token = form.get("t");
  const s = secret();
  const visitor = await visitorKey();
  const now = Date.now();
  if (!s || typeof token !== "string" || !verifyTimestamp(token, s, now, visitor)) {
    return { status: "error", errors: { form: FALLBACK }, values };
  }

  // Order matters: per-visitor limits first, then the token is spent (so a replay is refused before it
  // can touch the shared ceiling), then the per-instance ceiling, which one visitor alone cannot reach.
  if (
    !allowSend(`send:${visitor}`, now, sendLimit(), SEND_WINDOW_MS) ||
    !allowSend(`send1h:${visitor}`, now, isProduction() ? SENDS_PER_VISITOR_PER_HOUR : Math.max(SENDS_PER_VISITOR_PER_HOUR, sendLimit()), HOUR_MS) ||
    !consumeToken(token, now, tokenDeadline(token)) ||
    !allowGlobalSend(now, isProduction() ? GLOBAL_SENDS_PER_HOUR : Math.max(GLOBAL_SENDS_PER_HOUR, sendLimit()), HOUR_MS)
  ) {
    return { status: "error", errors: { form: FALLBACK }, values };
  }

  // Test-only: lets Playwright reach the success state without Resend. Disabled in production.
  if (!isProduction() && process.env.BOOKING_TEST_MODE === "sent" && parsed.data.business === "__test_sent__") {
    return { status: "sent" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM;
  if (!apiKey || !from) return { status: "error", errors: { form: FALLBACK }, values };

  const b = parsed.data;
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: process.env.BOOKING_TO || site.contact.email,
      replyTo: b.email,
      subject: `Discovery request: ${oneLine(b.name)}`,
      text: [
        `Name: ${b.name}`,
        `Email: ${b.email}`,
        `Business: ${b.business}`,
        `Phone: ${b.phone ?? "-"}`,
        `Introduced by: ${b.referrer ?? "-"}`,
        "",
        "What they would like looked at:",
        b.lookAt ?? "-",
      ].join("\n"),
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error("[booking] send failed", e instanceof Error ? e.message : e);
    return { status: "error", errors: { form: FALLBACK }, values };
  }
  // Counting is best-effort: analytics must never turn a delivered booking into an error.
  try {
    await track("discovery_request");
  } catch (e) {
    console.warn("[booking] analytics event failed", e instanceof Error ? e.message : e);
  }
  return { status: "sent" };
}
