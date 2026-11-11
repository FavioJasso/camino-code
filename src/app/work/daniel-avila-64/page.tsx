import type { Metadata } from "next";
import { BookDiscovery } from "@/components/BookDiscovery";
import { Figures } from "@/components/Figures";
import { PageBand } from "@/components/PageBand";
import { danielAvila64 as da, danielAvila64Study as study } from "@/content/proof";

export const metadata: Metadata = {
  title: "DANIEL AVILA 64 case study | Camino Code",
  description:
    "A playable 3D portfolio built by Camino Code for Daniel Avila: an N64-era castle to explore, over a complete HTML portfolio recruiters can read at once.",
  alternates: { canonical: "/work/daniel-avila-64" },
};

export default function DanielAvila64Page() {
  return (
    <>
      <PageBand stage={2} time="morning" kicker="Case study" title={study.title} />
      <section className="inner-sec in-light" aria-labelledby="at-a-glance">
        <div className="wrap">
          <h2 id="at-a-glance">At a glance</h2>
          <p className="in-lead">{study.subtitle}</p>
          <dl className="facts">
            {study.facts.map((f) => (
              <div key={f.label}>
                <dt className="in-mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="in-mono credit" style={{ marginTop: "1.25rem" }}>
            {da.wording}
          </p>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="challenge-title">
        <div className="wrap">
          <h2 id="challenge-title">The challenge</h2>
          <p>{study.challengeIntro}</p>
          <ul className="ticks">
            {study.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p>{study.challengeNote}</p>
        </div>
      </section>
      <section className="inner-sec in-light" aria-labelledby="built-title">
        <div className="wrap">
          <h2 id="built-title">What was built</h2>
          <p>{study.builtIntro}</p>
          <ul className="ticks">
            {study.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p>{study.builtNote}</p>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="phases-title">
        <div className="wrap">
          <h2 id="phases-title">How it was done</h2>
          <ol className="steps">
            {study.phases.map((t) => (
              <li key={t.phase}>
                <div>
                  <h3>
                    {t.phase} <span className="in-mono">{t.length}</span>
                  </h3>
                  <p>{t.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="inner-sec in-light" aria-labelledby="gallery-title">
        <div className="wrap">
          <h2 id="gallery-title">Gallery</h2>
          <ul className="gallery">
            {study.gallery.map((g) => (
              <li key={g.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} width={1920} height={1280} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="result-title">
        <div className="wrap">
          <h2 id="result-title">Result</h2>
          <Figures figures={da.figures} />
          <ul className="ticks">
            {study.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p>
            <a href={study.visitHref} rel="noopener">
              {study.visitLabel}
            </a>
          </p>
        </div>
      </section>
      <BookDiscovery heading="Want something like this?" />
    </>
  );
}
