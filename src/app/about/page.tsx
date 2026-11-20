import Link from "next/link";
import { BookDiscovery } from "@/components/BookDiscovery";
import { Faq } from "@/components/Faq";
import { FounderPhoto } from "@/components/FounderPhoto";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { faq } from "@/content/faq";
import { founder, whoYouWorkWith as who } from "@/content/founder";
import { pageMetadata } from "@/content/seo";
import { testimonials } from "@/content/testimonials";
import { breadcrumbList, faqPage, personLd } from "@/lib/structured-data";
import "./about.css";

export const metadata = pageMetadata({
  title: "About | Camino Code",
  description:
    "Camino Code is a founder-led software, data and AI consultancy in Newark, New Jersey. Favio Jasso, the founder, leads every engagement from discovery to hand-over.",
  path: "/about",
});

/** Link text for each testimonial's case study: two links on one page need two different names. */
const STUDY_LINK: Record<string, string> = {
  "/work/victorias-painting": "Read the Victoria's Painting case study",
  "/work/daniel-avila": "Read the Daniel Avila portfolio case study",
};

export default function AboutPage() {
  return (
    <>
      <PageBand stage={4} time="day" kicker="About" title="About Camino Code" />
      <section className="inner-sec in-light" aria-labelledby="founder-title">
        <div className="wrap founder-row">
          <FounderPhoto loading="eager" className="in-portrait" sizes="(max-width: 599px) 160px, 144px" />
          <div>
            <p className="in-mono in-label">
              <i>01</i> Founder
            </p>
            <h2 id="founder-title">{founder.about.heading}</h2>
            {founder.about.note.map((line, i) => (
              <p key={line} className={i === 0 ? "in-lead" : undefined}>
                {line}
              </p>
            ))}
            <div className="in-links">
              {founder.about.links.map((l) => (
                <Link key={l.href} className="in-link" href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* id "who" is the target of the link under the stages on /approach */}
      <section className="inner-sec in-light" id="who" aria-labelledby="who-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>02</i> Working together
          </p>
          <h2 id="who-title">{who.heading}</h2>
          <p className="in-lead">{who.lead}</p>
          <p>{who.body}</p>
          <dl className="facts">
            {who.facts.map((f) => (
              <div key={f.label}>
                <dt className="in-mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="in-aside">{who.we}</p>
          <div className="in-links">
            <Link className="in-link" href={who.link.href}>
              {who.link.label}
            </Link>
          </div>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="kind-words-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>03</i> Kind words
          </p>
          <h2 id="kind-words-title">Kind words from website projects</h2>
          <div className="quotes">
            {testimonials.map((t) => (
              <div key={t.name}>
                <figure>
                  <blockquote>
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption>
                    {t.name}, {t.role}, {t.company}
                  </figcaption>
                </figure>
                <p className="in-quote-link">
                  <Link className="in-link" href={t.href}>
                    {STUDY_LINK[t.href] ?? `Read the ${t.company} case study`}
                  </Link>
                </p>
              </div>
            ))}
          </div>
          <p className="in-aside">Both were website projects.</p>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="faq-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>04</i> FAQ
          </p>
          <h2 id="faq-title">Questions</h2>
          <Faq items={faq} className="in-faq-cols" />
        </div>
      </section>
      <BookDiscovery />
      <JsonLd data={breadcrumbList([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <JsonLd data={personLd({ name: founder.name, jobTitle: founder.role, path: "/about", image: founder.portrait })} />
      <JsonLd data={faqPage(faq)} />
    </>
  );
}
