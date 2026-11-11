import type { Metadata } from "next";
import { BookDiscovery } from "@/components/BookDiscovery";
import { Figures } from "@/components/Figures";
import { PageBand } from "@/components/PageBand";
import { transparentEnergy as te, transparentEnergyStudy as study } from "@/content/proof";

export const metadata: Metadata = {
  title: "Transparent Energy case study | Camino Code",
  description:
    "How an automated Python pipeline on AWS replaced hand reconciliation of Excel, PDF and vendor files at Transparent Energy, in 3.5 months with a team of two.",
  alternates: { canonical: "/work/transparent-energy" },
};

export default function TransparentEnergyPage() {
  return (
    <>
      <PageBand stage={2} time="morning" kicker="Case study" title="Transparent Energy: reconciliation, automated" />
      <section className="inner-sec in-dark on-dark" aria-labelledby="at-a-glance">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>01</i> / 07
          </p>
          <h2 id="at-a-glance">At a glance</h2>
          <dl className="facts">
            {study.facts.map((f) => (
              <div key={f.label}>
                <dt className="in-mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="in-mono credit in-credit-gap">
            {te.wording}
          </p>
        </div>
      </section>
      <section className="inner-sec in-light" aria-labelledby="before-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>02</i> / 07
          </p>
          <h2 id="before-title">Before</h2>
          <ul className="ticks">
            {study.before.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="inner-sec in-light" aria-labelledby="built-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>03</i> / 07
          </p>
          <h2 id="built-title">What was built</h2>
          <ul className="ticks">
            {study.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="timeline-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>04</i> / 07
          </p>
          <h2 id="timeline-title">Timeline</h2>
          <ol className="steps">
            {study.timeline.map((t) => (
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
      <section className="inner-sec in-light in-day" aria-labelledby="stack-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>05</i> / 07
          </p>
          <h2 id="stack-title">Stack</h2>
          <ul className="chips">
            {study.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="handover-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>06</i> / 07
          </p>
          <h2 id="handover-title">What was handed over</h2>
          <p>{study.handedOver}</p>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="result-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>07</i> / 07
          </p>
          <h2 id="result-title">Result</h2>
          <Figures />
          <p>{te.summary}</p>
        </div>
      </section>
      <BookDiscovery heading="Have a process like this?" />
    </>
  );
}
