import { BookDiscovery } from "@/components/BookDiscovery";
import { Figures } from "@/components/Figures";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { transparentEnergy as te, transparentEnergyStudy as study } from "@/content/proof";
import { pageMetadata } from "@/content/seo";
import { breadcrumbList, caseStudyLd } from "@/lib/structured-data";
import { MoreWork } from "../MoreWork";
import { StudyCrumbs } from "../StudyCrumbs";

const title = "Transparent Energy: reconciliation, automated";
const description =
  "How an automated Python pipeline on AWS replaced hand reconciliation of Excel, PDF and vendor files at Transparent Energy, in 3.5 months with a team of two.";

/** Home / Work / this study: shown above "At a glance" and given to the structured data, from one list. */
const trail = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: te.name, path: te.href },
];

export const metadata = pageMetadata({
  title: "Transparent Energy case study | Camino Code",
  description,
  path: te.href,
});

export default function TransparentEnergyPage() {
  return (
    <>
      <PageBand stage={2} time="morning" kicker="Case study" title={title} />
      {/* in-still: this section runs past the bottom of the window when the page loads, so it does not fade in */}
      <section className="inner-sec in-dark on-dark in-still in-study-top" aria-labelledby="at-a-glance">
        <div className="wrap">
          <StudyCrumbs trail={trail} />
          <p className="in-mono in-label">
            <i>01</i> / 07
          </p>
          <h2 id="at-a-glance">At a glance</h2>
          {/* "Time" is left out of this row: the same 3.5 months is the third figure directly below */}
          <dl className="facts">
            {study.facts.filter((f) => f.label !== "Time").map((f) => (
              <div key={f.label}>
                <dt className="in-mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          {/* the outcome first: the three permitted figures sit here, not at the foot of the page */}
          <Figures />
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
          {/* the figures are under "At a glance"; they are not shown a second time here */}
          <p>{te.summary}</p>
        </div>
      </section>
      <MoreWork current={te.href} />
      <BookDiscovery heading="Have a process like this?" />
      <JsonLd data={caseStudyLd({ headline: title, description, path: te.href, about: te.name })} />
      <JsonLd data={breadcrumbList(trail)} />
    </>
  );
}
