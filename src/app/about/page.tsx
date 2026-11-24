import Link from "next/link";
import { BookDiscovery } from "@/components/BookDiscovery";
import { Faq } from "@/components/Faq";
import { FounderPhoto } from "@/components/FounderPhoto";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { faq } from "@/content/faq";
import { founder } from "@/content/founder";
import { pageMetadata } from "@/content/seo";
import { captionFor, testimonials } from "@/content/testimonials";
import { breadcrumbList, faqPage, personLd } from "@/lib/structured-data";
import "./about.css";

export const metadata = pageMetadata({
  title: "About | Camino Code",
  description:
    "Favio Jasso started Camino Code in Newark, NJ to help small and mid-sized businesses with software, data and AI. Book a free first conversation.",
  path: "/about",
});

/** Link text for each testimonial's case study: two links on one page need two different names. */
const STUDY_LINK: Record<(typeof testimonials)[number]["href"], string> = {
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
      <section className="inner-sec in-light in-day" aria-labelledby="clients-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>02</i> Clients
          </p>
          <h2 id="clients-title">In their words</h2>
          <div className="quotes">
            {testimonials.map((t) => (
              <div key={t.name}>
                <figure>
                  <blockquote>
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="in-mono">{captionFor(t)}</figcaption>
                </figure>
                <p className="in-quote-link">
                  <Link className="in-link" href={t.href}>
                    {STUDY_LINK[t.href]}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="faq-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>03</i> Questions
          </p>
          <h2 id="faq-title">Questions</h2>
          <Faq items={faq} />
        </div>
      </section>
      <BookDiscovery />
      <JsonLd data={breadcrumbList([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <JsonLd data={personLd({ name: founder.name, jobTitle: founder.role, path: "/about", image: founder.portrait })} />
      <JsonLd data={faqPage(faq)} />
    </>
  );
}
