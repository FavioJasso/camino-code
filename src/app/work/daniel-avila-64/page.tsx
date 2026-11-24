import Link from "next/link";
import { BookDiscovery } from "@/components/BookDiscovery";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { danielAvila64 as da, danielAvila64Study as study } from "@/content/proof";
import { pageMetadata } from "@/content/seo";
import { breadcrumbList, caseStudyLd } from "@/lib/structured-data";
import { MoreWork } from "../MoreWork";
import { StudyCrumbs } from "../StudyCrumbs";
import { UnderTheHood } from "../UnderTheHood";
import { GALLERY_SIZES, WorkImage } from "../WorkImage";

const description =
  "A playable 3D portfolio built by Camino Code for Daniel Avila: an N64-era castle to explore, over a complete HTML portfolio recruiters can read at once.";

/** Home / Work / this study: shown above "At a glance" and given to the structured data, from one list. */
const trail = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: da.name, path: da.href },
];

export const metadata = pageMetadata({
  title: "DANIEL AVILA 64 case study | Camino Code",
  description,
  path: da.href,
});

export default function DanielAvila64Page() {
  return (
    <>
      <PageBand stage={2} time="morning" kicker="Case study" title={study.title} />
      {/* in-still: this section runs past the bottom of the window when the page loads, so it does not fade in */}
      <section className="inner-sec in-dark on-dark in-still in-study-top" aria-labelledby="at-a-glance">
        <div className="wrap">
          <StudyCrumbs trail={trail} />
          <p className="in-mono in-label">
            <i>01</i> / 06
          </p>
          <h2 id="at-a-glance">At a glance</h2>
          {/* the outcome first: the title screen and the sentence that says what each visitor gets */}
          <div className="in-glance">
            <div>
              <p className="in-lead">{study.subtitle}</p>
              <dl className="facts">
                {study.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="in-mono">{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="in-outcome">{study.builtNote}</p>
              <p className="in-mono credit in-credit-gap">
                {da.wording}
              </p>
            </div>
            <WorkImage src={da.cardImage.src} alt={da.cardImage.alt} sizes={GALLERY_SIZES} />
          </div>
        </div>
      </section>
      <section className="inner-sec in-light" aria-labelledby="challenge-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>02</i> / 06
          </p>
          <h2 id="challenge-title">The challenge</h2>
          <p>{study.challengeIntro}</p>
          <ul className="ticks">
            {study.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p>
            {study.firstSiteNote}{" "}
            <Link href={study.firstSiteHref}>{study.firstSiteLabel}</Link>
            .
          </p>
        </div>
      </section>
      <section className="inner-sec in-light" aria-labelledby="built-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>03</i> / 06
          </p>
          <h2 id="built-title">What was built</h2>
          <p>{study.builtIntro}</p>
          <ul className="ticks">
            {study.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="phases-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>04</i> / 06
          </p>
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
      <section className="inner-sec in-light in-day" aria-labelledby="gallery-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>05</i> / 06
          </p>
          <h2 id="gallery-title">Gallery</h2>
          <ul className="gallery">
            {study.gallery.map((g) => (
              <li key={g.src}>
                <WorkImage src={g.src} alt={g.alt} sizes={GALLERY_SIZES} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="result-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>06</i> / 06
          </p>
          <h2 id="result-title">Result</h2>
          <ul className="ticks">
            {study.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p>
            <a className="in-link" href={study.visitHref} rel="noopener">
              {study.visitLabel}
            </a>
          </p>
          <UnderTheHood label={da.figuresLabel} figures={da.figures} />
        </div>
      </section>
      <MoreWork current={da.href} />
      <BookDiscovery />
      <JsonLd data={caseStudyLd({ headline: study.title, description, path: da.href, image: da.cardImage.src, about: da.name })} />
      <JsonLd data={breadcrumbList(trail)} />
    </>
  );
}
