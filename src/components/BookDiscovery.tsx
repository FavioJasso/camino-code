import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";

/** A sun rising in the saddle of a dotted ridge line: decoration for the closing band. */
function Sunrise() {
  return (
    <svg className="in-sunrise" viewBox="0 0 320 150" aria-hidden="true" focusable="false">
      <defs>
        {/* only the sky above the ridge: the ridge hides the lower sun */}
        <clipPath id="in-sunrise-sky">
          <path d="M0 118 L48 96 L84 106 L124 62 L196 104 L268 66 L300 86 L320 80 L320 0 L0 0 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#in-sunrise-sky)">
        <circle className="in-sun-ring" cx="196" cy="112" r="58" />
        <circle className="in-sun" cx="196" cy="112" r="44" />
      </g>
      <path className="in-ridge" d="M0 118 L48 96 L84 106 L124 62 L196 104 L268 66 L300 86 L320 80" />
      <line className="in-horizon" x1="0" y1="140" x2="320" y2="140" />
    </svg>
  );
}

/** The sunrise band that closes every inner page: Day light, a sun on the ridge, then the way to book. */
export function ClosingBand({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="inner-sec in-light in-day in-book" aria-labelledby="book-title">
      <div className="wrap">
        <div className="in-book-head">
          <h2 id="book-title">{heading}</h2>
          <Sunrise />
        </div>
        {children}
      </div>
    </section>
  );
}

export function BookDiscovery({ heading = "Start with discovery" }: { heading?: string }) {
  return (
    <ClosingBand heading={heading}>
      <p className="in-lead">
        A free 45-minute conversation, by video or in person. Within a week you get a one-page
        written summary. We reply within one business day.
      </p>
      <div className="in-cta">
        <Link className="btn in-btn-lg" href="/discovery">
          Book a discovery session
        </Link>
        <p>
          Or write to {site.contact.email} or call <span className="nowrap">{site.contact.phone}</span>.
        </p>
      </div>
    </ClosingBand>
  );
}
