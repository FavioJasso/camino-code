"use client"; // error boundaries must be Client Components

import "./globals.css"; // first, so inner.css (through PageBand) still loads after it
import localFont from "next/font/local";
import { useEffect } from "react";
import { EmailLink, PhoneLink } from "@/components/ContactLinks";
import { BrandMark } from "@/components/BrandMark";
import { PageBand } from "@/components/PageBand";

// The same two faces as the root layout, which this file replaces when it is shown.
const archivo = localFont({
  src: "../fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const martianMono = localFont({
  src: "../fonts/MartianMono-Variable.woff2",
  variable: "--font-martian",
  weight: "100 800",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 112.5%" }],
});

/**
 * Last resort: shown when the root layout itself fails, so it brings its own document,
 * styles and fonts and does not use the site header or footer.
 * Links are plain anchors: a full page load is the safest way out of a broken app shell.
 */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={`${archivo.variable} ${martianMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <title>Something went wrong | Camino Code</title>
        <header className="site-head on-dark">
          <div className="wrap">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a full reload, not client routing */}
            <a className="brand" href="/" aria-label="Camino Code home">
              <BrandMark />
              <span>Camino Code</span>
            </a>
          </div>
        </header>
        <main id="content" className="flex-1">
          <PageBand time="night" kicker="Error" title="Something went wrong" />
          <section className="inner-sec in-light">
            <div className="wrap">
              <p className="in-lead">The site did not load as it should. You can try again, or reload the home page.</p>
              <div className="in-cta">
                <button className="btn in-btn-lg" type="button" onClick={() => retry()}>
                  Try again
                </button>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a full reload, not client routing */}
                <a href="/">Back to the home page</a>
              </div>
              <p className="in-aside">
                If it keeps happening, write to <EmailLink /> or call <PhoneLink />.
              </p>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
