"use server";

import { track } from "@vercel/analytics/server";
import { Resend } from "resend";
import { headers } from "next/headers";
import { MAX_AGE_MS, SPAM, parseBooking, signTimestamp, verifyTimestamp, type Booking, type BookingErrors } from "@/lib/booking";
import { allowSend, consumeToken } from "@/lib/abuse-guard";
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

/** The visitor's address as reported by the platform proxy; one shared bucket if absent. */
async function visitorKey(): Promise<string> {
  const h = await headers();
  return h.get("x-real-ip") || h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
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
  return s ? signTimestamp(Date.now(), s) : "";
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
  if (!s || typeof token !== "string" || !verifyTimestamp(token, s, Date.now())) {
    return { status: "error", errors: { form: FALLBACK }, values };
  }

  // Each token works once (a replayed token never sends), and each visitor gets a few sends per window.
  const now = Date.now();
  if (!consumeToken(token, now, MAX_AGE_MS) || !allowSend(await visitorKey(), now, sendLimit(), SEND_WINDOW_MS)) {
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
