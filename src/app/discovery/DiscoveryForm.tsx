"use client";

import Link from "next/link";
import {
  Fragment,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { site } from "@/content/site";
import { LIMITS, MAX_AGE_MS, MIN_AGE_MS, type Booking } from "@/lib/booking-shared";
import { issueFormToken, submitBooking, type State } from "./actions";
import { EMAIL_HREF, EmailLink, PHONE_HREF } from "@/components/ContactLinks";

/** The six visible fields, in the order they appear. Nothing else is kept as a draft or put in an email link. */
const FIELDS = ["name", "email", "business", "phone", "lookAt", "referrer"] as const;
type Field = (typeof FIELDS)[number];
type Values = Record<Field, string>;

const LABELS: Record<Field, string> = {
  name: "Your name",
  email: "Email",
  business: "Business name and what it does",
  phone: "Phone",
  lookAt: "What would you like us to look at?",
  referrer: "Who introduced you?",
};

const IDLE: State = { status: "idle" };
/** Shown when the request itself failed (no connection, or no usable answer): nothing came back to confirm a send. */
const NOT_SENT = `Your request did not go through. Your details are still in the form. Check your connection and try again. You can also call ${site.contact.phone} or email us at ${site.contact.email}.`;

/** What has been typed, kept in this tab's session storage until the request is sent (the privacy page says so). */
const DRAFT_KEY = "camino:discovery-draft";
/** Waited on top of the server's minimum token age, for timers and the trip to the server. */
const TOKEN_MARGIN_MS = 500;
/** A token on screen is replaced at this age, well inside its 30-minute life. */
const TOKEN_REFRESH_MS = MAX_AGE_MS / 3;
/** Coming back to the tab replaces a token older than this: the network may have changed meanwhile. */
const TOKEN_RESUME_MS = 60_000;
/** Some mail programs cut off or refuse a longer mailto link. */
const MAIL_HREF_MAX = 1900;

/** `intro` is the heading and lead above the form (written in page.tsx): shown until the request is sent. */
export function DiscoveryForm({ intro }: { intro: ReactNode }) {
  // `posted` answers a plain form post: the only way to send before this script runs, or with JavaScript off.
  // Once the script runs, onSubmit sends the request itself and `result` holds the answer, so a request
  // that fails on the way never reaches useActionState (which would hand it to the page's error boundary
  // and unmount the form with everything typed).
  const [posted, action] = useActionState<State, FormData>(submitBooking, IDLE);
  const [result, setResult] = useState<State | null>(null);
  const [sending, setSending] = useState(false);
  const state = result ?? posted;
  // False in the server's HTML and until this script runs: "Try again" needs the script (it fetches the
  // token), so the answer to a plain post does not offer a button that could only fail again.
  const scripted = useSyncExternalStore(noSubscription, () => true, () => false);

  const formEl = useRef<HTMLFormElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const confirmTitle = useRef<HTMLHeadingElement>(null);
  const busy = useRef(false);
  /** The signed timestamp, and when it arrived here (so it is at least that old on the server). */
  const token = useRef({ value: "", at: 0 });
  const minting = useRef<Promise<string> | null>(null);

  /** Asks the server for a fresh signed timestamp; a second caller shares the request already on its way. */
  const mint = useCallback((): Promise<string> => {
    minting.current ??= issueFormToken()
      .then((value) => {
        if (value) token.current = { value, at: Date.now() };
        return value;
      })
      .finally(() => {
        minting.current = null;
      });
    return minting.current;
  }, []);

  // A token when the form appears, a new one about every 10 minutes while it is on screen, when the tab
  // comes back after a minute or more, and when the connection comes back. Each visitor may ask for 30
  // in 10 minutes (actions.ts), so none of these asks more often than it must.
  useEffect(() => {
    const refresh = (olderThan: number) => {
      if (busy.current || document.hidden || Date.now() - token.current.at < olderThan) return;
      mint().catch(() => {});
    };
    refresh(0);
    const onVisible = () => refresh(TOKEN_RESUME_MS);
    const onOnline = () => refresh(10_000);
    const timer = window.setInterval(() => refresh(TOKEN_REFRESH_MS), 60_000);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onOnline);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onOnline);
    };
  }, [mint]);

  // After a reload or a detour to another page, put back what was typed. Then ?ref=maria on an
  // associate's link pre-fills "Who introduced you?" (read here so the page stays static).
  // Neither touches a field that already holds something.
  useEffect(() => {
    const form = formEl.current;
    if (!form) return;
    const draft = readDraft();
    for (const key of FIELDS) {
      const el = control(form, key);
      if (el && el.value === "" && draft[key]) el.value = draft[key].slice(0, LIMITS[key] + 50);
    }
    const ref = new URLSearchParams(window.location.search).get("ref");
    const input = control(form, "referrer");
    if (ref && input && input.value === "") input.value = ref.slice(0, LIMITS.referrer);
  }, []);

  const errors = state.status === "error" ? (state.errors ?? {}) : {};
  const invalid = FIELDS.some((k) => errors[k]);
  const failed = invalid || Boolean(errors.form);
  useEffect(() => {
    if (failed) summary.current?.focus();
  }, [failed, state]);

  // While field errors show, the tab title starts with "Error: " (the GOV.UK error-summary pattern).
  useEffect(() => {
    if (!invalid) return;
    const plain = document.title;
    const flagged = `Error: ${plain}`;
    document.title = flagged;
    return () => {
      if (document.title === flagged) document.title = plain; // not if another page has set its own title since
    };
  }, [invalid]);

  const sent = state.status === "sent";
  useEffect(() => {
    if (sent) confirmTitle.current?.focus();
  }, [sent]);

  /** One send. A request that fails on the way becomes an answer too, so the form stays with everything typed. */
  async function send(data: FormData): Promise<State> {
    try {
      if (!token.current.value || minting.current) await mint(); // none yet, or a newer one is on its way
      for (let attempt = 1; ; attempt++) {
        const { value, at } = token.current;
        await sleep(at + MIN_AGE_MS + TOKEN_MARGIN_MS - Date.now()); // the server refuses a younger token
        data.set("t", value);
        const answer = await submitBooking(IDLE, data);
        // Only the token was wrong (the page sat open too long, the network changed): fetch a fresh one
        // and send the same values again, once. The server checks the resend like any other send.
        if (!answer.retry || attempt > 1 || !(await mint())) return answer;
      }
    } catch {
      return { status: "error", errors: { form: NOT_SENT }, values: read(data) };
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // the plain post (the form's action) is only for before this script runs
    if (busy.current) return;
    busy.current = true;
    setSending(true);
    const form = event.currentTarget;
    saveDraft(form);
    const answer = await send(new FormData(form));
    if (answer.status === "sent") clearDraft();
    // a refused or failed send may have spent the token: have the next one ready
    else if (answer.errors?.form) mint().catch(() => {});
    busy.current = false;
    setSending(false);
    setResult(answer);
  }

  /**
   * On a touch keyboard the Enter key reads "next" on the one-line fields (enterKeyHint), so there it
   * moves to the next field instead of sending a half-filled form. With a mouse and keyboard, Enter sends.
   */
  function onKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    const el = event.target;
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
    if (!(el instanceof HTMLInputElement) || el.enterKeyHint !== "next") return;
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    const next = control(event.currentTarget, FIELDS[FIELDS.indexOf(el.name as Field) + 1]);
    if (!next) return;
    event.preventDefault();
    next.focus();
  }

  const confirmation = (
    <div className="in-confirm">
      {/* the section's heading now: it takes over the id of the heading it replaces (page.tsx) */}
      <h2 id="form-title" ref={confirmTitle} tabIndex={-1}>
        Thank you. Your request is in.
      </h2>
      <p>
        We reply within one business day to agree a time for your free 45-minute conversation.{" "}
        {state.sentTo ? (
          <>
            We will reply to <strong className="in-sent-to">{state.sentTo}</strong>.{" "}
          </>
        ) : null}
        If you do not hear from us, write to <EmailLink />.
      </p>
    </div>
  );

  const v: Partial<Booking> = state.values ?? {};
  const field = (key: Field) => ({
    id: `f-${key}`,
    name: key,
    defaultValue: v[key] ?? "",
    maxLength: LIMITS[key] + 50, // the server enforces the limit and says so; never silently truncate
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `e-${key}` : undefined,
  });
  const err = (key: Field) =>
    errors[key] ? (
      <p className="in-err" id={`e-${key}`}>
        <span className="in-visually-hidden">Error: </span>
        {errors[key]}
      </p>
    ) : null;

  const form = (
    <form
      ref={formEl}
      action={action}
      onSubmit={onSubmit}
      onInput={(event) => saveDraft(event.currentTarget)}
      onKeyDown={onKeyDown}
      className="in-form"
      noValidate
    >
      {failed ? (
        <div ref={summary} tabIndex={-1} className="in-summary" role="group" aria-labelledby="summary-title">
          <h3 id="summary-title">{invalid ? "Please fix the following" : "We could not send your request"}</h3>
          {errors.form ? (
            <>
              <p>{withContactLinks(errors.form, mailHref(v))}</p>
              {scripted ? (
                <button className="btn" type="submit" aria-disabled={sending || undefined}>
                  {sending ? "Sending…" : "Try again"}
                </button>
              ) : null}
            </>
          ) : null}
          {invalid ? (
            <ul>
              {FIELDS.filter((k) => errors[k]).map((k) => (
                <li key={k}>
                  <a href={`#f-${k}`}>
                    {LABELS[k]}: {errors[k]}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <p className="in-note">Fields marked (required) must be filled in.</p>

      <div className="in-row">
        <label htmlFor="f-name">
          Your name <span>(required)</span>
        </label>
        <input type="text" autoComplete="name" autoCapitalize="words" enterKeyHint="next" required {...field("name")} />
        {err("name")}
      </div>
      <div className="in-row">
        <label htmlFor="f-email">
          Email <span>(required)</span>
        </label>
        <input type="email" autoComplete="email" enterKeyHint="next" required {...field("email")} />
        {err("email")}
      </div>
      <div className="in-row">
        <label htmlFor="f-business">
          Business name and what it does <span>(required)</span>
        </label>
        {/* two rows: the answer is a name and a description, longer than a one-line box shows on a phone */}
        <textarea rows={2} autoComplete="organization" required {...field("business")} />
        {err("business")}
      </div>
      <div className="in-row">
        <label htmlFor="f-phone">Phone (optional)</label>
        <input type="tel" autoComplete="tel" enterKeyHint="next" {...field("phone")} />
        {err("phone")}
      </div>
      <div className="in-row">
        <label htmlFor="f-lookAt">What would you like us to look at? (optional)</label>
        <textarea rows={4} {...field("lookAt")} />
        {err("lookAt")}
      </div>
      <div className="in-row">
        <label htmlFor="f-referrer">Who introduced you? (optional)</label>
        <input type="text" autoComplete="off" enterKeyHint="send" {...field("referrer")} />
        {err("referrer")}
      </div>

      {/* Honeypot: people never see or reach it; bots fill it. */}
      <div className="in-trap" aria-hidden="true">
        <label htmlFor="f-hp_note">Leave this field empty</label>
        <input id="f-hp_note" name="hp_note" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {/* aria-disabled, not disabled, while a send is under way: a disabled button drops keyboard focus to
          the page for the seconds the send takes. onSubmit ignores a second submit meanwhile. */}
      <button className="btn in-btn-lg" type="submit" aria-disabled={sending || undefined} aria-describedby="privacy-note">
        {sending ? "Sending…" : "Send request"}
      </button>

      {/* opens in a new tab so a half-filled form is not lost */}
      <p className="in-note" id="privacy-note">
        We use these details to reply to you and to prepare for the conversation.{" "}
        <Link href="/privacy" target="_blank">
          Read the privacy page (opens in a new tab)
        </Link>
        .
      </p>
    </form>
  );

  // The status region is in the DOM from the first render, so screen readers announce what is put into it:
  // the button's own "Sending…" while a send is under way (not shown: the button shows it), then the confirmation.
  // Once sent, the heading and lead that introduced the form go with it: the confirmation is all that is left.
  return (
    <>
      {sent ? null : intro}
      <div role="status">
        {sent ? confirmation : sending ? <span className="in-visually-hidden">Sending…</span> : null}
      </div>
      {sent ? null : form}
    </>
  );
}

/** For useSyncExternalStore: the value it reads (has this script run?) never changes once the script runs. */
function noSubscription(): () => void {
  return () => {};
}

function sleep(ms: number): Promise<void> {
  return ms > 0 ? new Promise((done) => window.setTimeout(done, ms)) : Promise.resolve();
}

function control(form: HTMLFormElement, key: Field | undefined): HTMLInputElement | HTMLTextAreaElement | null {
  const el = key ? form.elements.namedItem(key) : null;
  return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement ? el : null;
}

/** The six visible fields only, picked by name: never the honeypot and never the token. */
function read(data: FormData): Values {
  const out = {} as Values;
  for (const key of FIELDS) {
    const value = data.get(key);
    out[key] = typeof value === "string" ? value : "";
  }
  return out;
}

// Session storage can be missing or refuse (private windows, blocked site data): the form works without it.
function readDraft(): Partial<Values> {
  try {
    const stored: unknown = JSON.parse(window.sessionStorage.getItem(DRAFT_KEY) ?? "null");
    if (!stored || typeof stored !== "object") return {};
    const out: Partial<Values> = {};
    for (const key of FIELDS) {
      const value = (stored as Record<string, unknown>)[key];
      if (typeof value === "string") out[key] = value;
    }
    return out;
  } catch {
    return {};
  }
}

function saveDraft(form: HTMLFormElement) {
  const values = read(new FormData(form));
  try {
    if (FIELDS.some((key) => values[key] !== "")) window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    else window.sessionStorage.removeItem(DRAFT_KEY);
  } catch {}
}

function clearDraft() {
  try {
    window.sessionStorage.removeItem(DRAFT_KEY);
  } catch {}
}

/** A mailto link that carries what was typed, so writing to us instead does not mean typing it all again. */
function mailHref(values: Partial<Values>): string {
  // line breaks in a mailto body are CR LF, whichever way the text reached us
  const get = (key: Field) => (values[key] ?? "").trim().replace(/\r\n?|\n/g, "\r\n");
  const name = get("name").replace(/\s+/g, " ");
  const subject = name ? `Discovery request: ${name}` : "Discovery request";
  const facts = [
    ["Name", get("name")],
    ["Email", get("email")],
    ["Business", get("business")],
    ["Phone", get("phone")],
    ["Introduced by", get("referrer")],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);
  const build = (lookAt: string) => {
    const body = [...facts, ...(lookAt ? ["", "What I would like you to look at:", lookAt] : [])].join("\r\n");
    return `${EMAIL_HREF}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
  };
  try {
    let lookAt = get("lookAt");
    let href = build(lookAt);
    // Shorten the free text until the link fits; the whole of it is still in the form.
    while (href.length > MAIL_HREF_MAX && lookAt) {
      lookAt = lookAt.slice(0, Math.floor(lookAt.length * 0.8)).replace(/[\uD800-\uDBFF]$/, "");
      href = build(lookAt ? `${lookAt}…` : "");
    }
    return href;
  } catch {
    return EMAIL_HREF; // text that cannot be put in a link (a broken character): the plain address still works
  }
}

/** The email link is built from what was sent; on the way out it picks up anything changed in the form since. */
function onMailClick(event: MouseEvent<HTMLAnchorElement>) {
  const form = event.currentTarget.closest("form");
  if (form) event.currentTarget.href = mailHref(read(new FormData(form)));
}

/** The message with the published email address and phone number turned into links; the words stay the same. */
function withContactLinks(message: string, mail: string): ReactNode {
  const links: [string, ReactNode][] = [
    [
      site.contact.email,
      <a key="email" className="in-inline" href={mail} onClick={onMailClick}>
        {site.contact.email}
      </a>,
    ],
    [
      site.contact.phone,
      <a key="phone" className="in-inline nowrap" href={PHONE_HREF}>
        {site.contact.phone}
      </a>,
    ],
  ];
  let parts: ReactNode[] = [message];
  for (const [text, link] of links) {
    parts = parts.flatMap((part) =>
      typeof part === "string" ? part.split(text).flatMap((piece, i) => (i ? [link, piece] : [piece])) : [part],
    );
  }
  return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>);
}
