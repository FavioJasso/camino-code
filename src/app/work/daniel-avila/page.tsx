import Link from "next/link";
import { BookDiscovery } from "@/components/BookDiscovery";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { danielAvila as da, danielAvilaStudy as study } from "@/content/proof";
import { pageMetadata } from "@/content/seo";
import { testimonialFor } from "@/content/testimonials";
import { breadcrumbList, caseStudyLd } from "@/lib/structured-data";
import { ClientQuote } from "../ClientQuote";
import { MoreWork } from "../MoreWork";
import { GALLERY_SIZES, WorkImage } from "../WorkImage";

const description =
  "The first portfolio site Camino Code designed and built for IT professional Daniel Avila, and the starting point for the later DANIEL AVILA 64 rebuild.";

export const metadata = pageMetadata({
  title: "Daniel Avila portfolio case study | Camino Code",
  description,
  path: da.href,
});

export default function DanielAvilaPage() {
  return (
    <>
      <PageBand stage={2} time="morning" kicker="Case study" title={study.title} />
      <section className="inner-sec in-dark on-dark" aria-labelledby="at-a-glance">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>01</i> / 06
          </p>
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
          <p className="in-mono credit in-credit-gap">
            {da.wording}
          </p>
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
                  <h3>{t.phase}</h3>
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
          <h3 className="in-sub">In the client&rsquo;s words</h3>
          <ClientQuote testimonial={testimonialFor(da.href)} />
          <h3 className="in-sub">What came next</h3>
          <p>{study.nextNote}</p>
          <p>
            <Link className="in-link" href={study.nextHref}>
              {study.nextLabel}
            </Link>
          </p>
        </div>
      </section>
      <MoreWork current={da.href} />
      <BookDiscovery />
      <JsonLd data={caseStudyLd({ headline: study.title, description, path: da.href, image: da.cardImage.src, about: study.project })} />
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: study.project, path: da.href },
        ])}
      />
    </>
  );
}
