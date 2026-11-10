"use server";

import { Resend } from "resend";
import { SPAM, parseBooking, signTimestamp, verifyTimestamp, type Booking, type BookingErrors } from "@/lib/booking";
import { site } from "@/content/site";

export type State = {
  status: "idle" | "error" | "sent";
  errors?: BookingErrors;
  values?: Partial<Booking>;
};

const FALLBACK = `We couldn't send this. Email us at ${site.contact.email} and we'll reply within one business day.`;
const DEV_SECRET = "camino-code-development-only-secret";

let warned = false;
function secret(): string {
  const s = process.env.FORM_SECRET;
  if (s) return s;
  if (!warned) {
    warned = true;
    console.warn("[booking] FORM_SECRET is not set; signing form timestamps with a development secret.");
  }
  return DEV_SECRET;
}

/** Called by the form once it is on screen, so the page itself stays statically prerendered. */
export async function issueFormToken(): Promise<string> {
  return signTimestamp(Date.now(), secret());
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

  // A token is present once the page's script has run. Without JavaScript there is none, and the
  // honeypot is the only check. A token that is present must be valid; a bad one is never silent.
  const token = form.get("t");
  if (typeof token === "string" && token !== "" && !verifyTimestamp(token, secret(), Date.now())) {
    return { status: "error", errors: { form: FALLBACK }, values };
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
  return { status: "sent" };
}
