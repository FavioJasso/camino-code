"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { LIMITS, type Booking } from "@/lib/booking-shared";
import { issueFormToken, submitBooking, type State } from "./actions";

const FIELD_ORDER = ["name", "email", "business"] as const;
const LABELS: Record<string, string> = {
  name: "Your name",
  email: "Email",
  business: "Business name and what it does",
  phone: "Phone",
  lookAt: "What would you like us to look at?",
  referrer: "Who introduced you?",
};

export function DiscoveryForm() {
  const [state, action, pending] = useActionState<State, FormData>(submitBooking, { status: "idle" });
  const [token, setToken] = useState("");
  const summary = useRef<HTMLDivElement>(null);
  const referrer = useRef<HTMLInputElement>(null);
  const confirmTitle = useRef<HTMLHeadingElement>(null);

  // A fresh signed timestamp after every result, so a retry is never judged on a stale or too-young one.
  useEffect(() => {
    let live = true;
    issueFormToken().then((t) => live && setToken(t), () => {});
    return () => {
      live = false;
    };
  }, [state]);

  // ?ref=maria on an associate's link pre-fills "Who introduced you?" (read here so the page stays static).
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    const input = referrer.current;
    if (ref && input && input.value === "") input.value = ref.slice(0, LIMITS.referrer);
  }, []);

  const errors = state.status === "error" ? (state.errors ?? {}) : {};
  const failed = Object.keys(errors).length > 0;
  useEffect(() => {
    if (failed) summary.current?.focus();
  }, [failed, state]);

  const sent = state.status === "sent";
  useEffect(() => {
    if (sent) confirmTitle.current?.focus();
  }, [sent]);

  const confirmation = (
    <div className="in-confirm">
      <h3 ref={confirmTitle} tabIndex={-1}>
        Thank you. Your request is in.
      </h3>
      <p>
        We reply within one business day to agree a time for your free 45-minute conversation. If
        you do not hear from us, write to {site.contact.email}.
      </p>
    </div>
  );

  const v: Partial<Booking> = state.values ?? {};
  const field = (key: keyof Booking) => ({
    id: `f-${key}`,
    name: key,
    defaultValue: v[key] ?? "",
    maxLength: LIMITS[key] + 50, // the server enforces the limit and says so; never silently truncate
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `e-${key}` : undefined,
  });
  const err = (key: keyof Booking) =>
    errors[key] ? (
      <p className="in-err" id={`e-${key}`}>
        <span className="in-visually-hidden">Error: </span>
        {errors[key]}
      </p>
    ) : null;

  const form = (
    <form action={action} className="in-form" noValidate>
      {failed ? (
        <div ref={summary} tabIndex={-1} className="in-summary" role="group" aria-labelledby="summary-title">
          <h3 id="summary-title">
            {errors.form && FIELD_ORDER.every((k) => !errors[k]) ? "We could not send your request" : "Please fix the following"}
          </h3>
          <ul>
            {errors.form ? <li>{errors.form}</li> : null}
            {(Object.keys(errors) as (keyof Booking | "form")[])
              .filter((k) => k !== "form")
              .sort((a, b) => order(a) - order(b))
              .map((k) => (
                <li key={k}>
                  <a href={`#f-${k}`}>
                    {LABELS[k]}: {errors[k]}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ) : null}

      <p className="in-note">Fields marked (required) must be filled in.</p>

      <div className="in-row">
        <label htmlFor="f-name">
          Your name <span>(required)</span>
        </label>
        <input type="text" autoComplete="name" required {...field("name")} />
        {err("name")}
      </div>
      <div className="in-row">
        <label htmlFor="f-email">
          Email <span>(required)</span>
        </label>
        <input type="email" autoComplete="email" required {...field("email")} />
        {err("email")}
      </div>
      <div className="in-row">
        <label htmlFor="f-business">
          Business name and what it does <span>(required)</span>
        </label>
        <input type="text" autoComplete="organization" required {...field("business")} />
        {err("business")}
      </div>
      <div className="in-row">
        <label htmlFor="f-phone">Phone (optional)</label>
        <input type="tel" autoComplete="tel" {...field("phone")} />
        {err("phone")}
      </div>
      <div className="in-row">
        <label htmlFor="f-lookAt">What would you like us to look at? (optional)</label>
        <textarea rows={4} {...field("lookAt")} />
        {err("lookAt")}
      </div>
      <div className="in-row">
        <label htmlFor="f-referrer">Who introduced you? (optional)</label>
        <input type="text" autoComplete="off" ref={referrer} {...field("referrer")} />
        {err("referrer")}
      </div>

      {/* Honeypot: people never see or reach it; bots fill it. */}
      <div className="in-trap" aria-hidden="true">
        <label htmlFor="f-hp_note">Leave this field empty</label>
        <input id="f-hp_note" name="hp_note" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input type="hidden" name="t" value={token} />

      <button className="btn in-btn-lg" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send request"}
      </button>
    </form>
  );

  // The status region is in the DOM from the first render, so screen readers announce what is put into it.
  return (
    <>
      <div role="status">{sent ? confirmation : null}</div>
      {sent ? null : form}
    </>
  );
}

function order(k: string): number {
  const i = ["name", "email", "business", "phone", "lookAt", "referrer"].indexOf(k);
  return i < 0 ? 99 : i;
}
