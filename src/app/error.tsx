"use client"; // error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import { EmailLink, PhoneLink } from "@/components/ContactLinks";
import { PageBand } from "@/components/PageBand";

/**
 * Shown inside the site's header and footer when a page fails to render.
 * `retry` (Next 16.3+) re-fetches and re-renders the failed segment.
 */
export default function RouteError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <PageBand time="night" kicker="Error" title="Something went wrong on this page" />
      <section className="inner-sec in-light">
        <div className="wrap">
          <p className="in-lead">This page did not load as it should. You can try again, or go back to the home page.</p>
          <div className="in-cta">
            <button className="btn in-btn-lg" type="button" onClick={() => retry()}>
              Try again
            </button>
            <Link href="/">Back to the home page</Link>
          </div>
          <p className="in-aside">
            If it keeps happening, write to <EmailLink /> or call <PhoneLink />.
          </p>
        </div>
      </section>
    </>
  );
}
