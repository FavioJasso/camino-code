import type { Metadata } from "next";
import { BookDiscovery } from "@/components/BookDiscovery";
import { FounderPhoto } from "@/components/FounderPhoto";
import { PageBand } from "@/components/PageBand";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "About | Camino Code",
  description:
    "Camino Code is a software, data and AI consultancy in Newark, New Jersey, founded by Favio Jasso.",
  alternates: { canonical: "/about" },
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
            <h2 id="founder-title">Favio Jasso, founder</h2>
            <p>
              Favio founded Camino Code in {site.contact.place}, and led the build for Transparent
              Energy.
            </p>
            <p>
              He works with small and mid-sized businesses on data, software and AI, one stage at a
              time.
            </p>
          </div>
        </div>
      </section>
      <section className="inner-sec in-light" aria-labelledby="working-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>02</i> Process
          </p>
          <h2 id="working-title">Working with us</h2>
          <p className="in-lead">
            Clients start with a free 45-minute discovery session, by video or in person. We write
            up one page within a week, build in stages you can see working, and leave documentation
            when we hand over.
          </p>
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
              <figure key={t.name}>
                <blockquote>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption>
                  {t.name}, {t.role}, {t.company}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="in-aside">
            Both were website projects.
          </p>
        </div>
      </section>
      <BookDiscovery />
    </>
  );
}
