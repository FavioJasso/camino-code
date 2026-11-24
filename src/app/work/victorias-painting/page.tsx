import { BookDiscovery } from "@/components/BookDiscovery";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { victoriasPainting as vp, victoriasPaintingStudy as study } from "@/content/proof";
import { pageMetadata } from "@/content/seo";
import { testimonialFor } from "@/content/testimonials";
import { breadcrumbList, caseStudyLd } from "@/lib/structured-data";
import { CLIENT_WORDS_ID, ClientLine } from "../ClientLine";
import { ClientQuote } from "../ClientQuote";
import { MoreWork } from "../MoreWork";
import { StudyCrumbs } from "../StudyCrumbs";
import { GALLERY_SIZES, WorkImage } from "../WorkImage";

const description =
  "The first website for Victoria’s Painting, a New Jersey painting company: services, service areas, a free-estimate form and call buttons, built by Camino Code.";

/** Home / Work / this study: shown above "At a glance" and given to the structured data, from one list. */
const trail = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: vp.name, path: vp.href },
];

export const metadata = pageMetadata({
  title: "Victoria’s Painting case study | Camino Code",
  description,
  path: vp.href,
});

export default function VictoriasPaintingPage() {
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
          <p className="in-lead">{study.subtitle}</p>
          <dl className="facts">
            {study.facts.map((f) => (
              <div key={f.label}>
                <dt className="in-mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          {/* the outcome first: one sentence of the client's testimonial, which is shown in full under Result */}
          <ClientLine testimonial={testimonialFor(vp.href)} />
          <p className="in-mono credit in-credit-gap">
            {vp.wording}
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
          <h3 className="in-sub" id={CLIENT_WORDS_ID}>
            In the client&rsquo;s words
          </h3>
          <ClientQuote testimonial={testimonialFor(vp.href)} />
          <p>
            <a className="in-link" href={study.visitHref} rel="noopener">
              {study.visitLabel}
            </a>
          </p>
        </div>
      </section>
      <MoreWork current={vp.href} />
      <BookDiscovery />
      <JsonLd data={caseStudyLd({ headline: study.title, description, path: vp.href, image: vp.cardImage.src, about: vp.name })} />
      <JsonLd data={breadcrumbList(trail)} />
    </>
  );
}
