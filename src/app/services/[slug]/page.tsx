import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookDiscovery } from "@/components/BookDiscovery";
import { Figures } from "@/components/Figures";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { proofBlocks } from "@/content/proof";
import { pageMetadata } from "@/content/seo";
import { servicePages } from "@/content/service-pages";
import { services } from "@/content/services";
import { breadcrumbList, faqPage, serviceLd } from "@/lib/structured-data";
// the proof block borrows the work index's card image and its small "Under the hood" line
import { UnderTheHood } from "@/app/work/UnderTheHood";
import { CARD_SIZES, WorkImage } from "@/app/work/WorkImage";
import "../services.css";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

function pageFor(slug: string) {
  return Object.hasOwn(servicePages, slug) ? servicePages[slug as keyof typeof servicePages] : undefined;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = pageFor((await params).slug);
  if (!page) return {};
  return pageMetadata({
    // the long title, so the three pages and the /services index each have their own
    title: `${page.title} | Camino Code`,
    description: page.description,
    path: `/services/${page.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const page = pageFor((await params).slug);
  if (!page) notFound();
  const proof = page.proof ? proofBlocks[page.proof] : null;
  // a proof whose figures carry a label ("Under the hood") shows them as one small line, not as large figures
  const hood = proof && "figuresLabel" in proof ? proof : null;
  const service = services.find((s) => s.slug === page.slug);
  const others = services.filter((s) => s.slug !== page.slug);
  const path = `/services/${page.slug}`;

  return (
    <>
      <PageBand stage={1} time="night" kicker={page.kicker} title={page.title} />
      <section className="inner-sec in-dark on-dark in-intro in-svc-intro">
        <div className="wrap">
          <nav className="in-crumbs in-mono" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li aria-current="page">{page.kicker}</li>
            </ol>
          </nav>
          <p className="in-lead">{page.intro}</p>
        </div>
      </section>
      {/* in-still: this section is at the bottom of the window when the page loads, so it does not fade in */}
      <section className="inner-sec in-light in-still" aria-labelledby="problems-title">
        <div className="wrap cols">
          <div>
            <p className="in-mono in-label">
              <i>01</i> Problems
            </p>
            <h2 id="problems-title">Problems this solves</h2>
            <ul className="ticks">
              {page.problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="in-mono in-label">
              <i>02</i> Outcome
            </p>
            <h2>What you get</h2>
            <ul className="ticks">
              {page.gets.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {proof ? (
        <section className={hood ? "inner-sec in-light work-card" : "inner-sec in-light"} aria-labelledby="proof-title">
          <div className="wrap">
            <p className="in-mono in-label">
              <i>03</i> Proof
            </p>
            <h2 id="proof-title">{proof.name}</h2>
            {/* developer measurements stay small: that proof leads with its screenshot and the summary instead */}
            {hood ? (
              <WorkImage src={hood.cardImage.src} alt={hood.cardImage.alt} sizes={CARD_SIZES} />
            ) : (
              <Figures figures={proof.figures} />
            )}
            <div className={hood ? "in-proof-body in-proof-flush" : "in-proof-body"}>
              <div>
                <p>{proof.summary}</p>
                <p className="in-mono credit">{proof.wording}</p>
              </div>
              <Link className="in-link" href={proof.href}>
                Read the case study
              </Link>
            </div>
            {hood ? <UnderTheHood label={hood.figuresLabel} figures={hood.figures} /> : null}
          </div>
        </section>
      ) : null}
      <section className="inner-sec in-light in-day" aria-labelledby="engaged-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>{proof ? "04" : "03"}</i> Process
          </p>
          <h2 id="engaged-title">How we work with you</h2>
          <ol className="steps">
            {page.engaged.map((e) => (
              <li key={e}>
                <span>{e}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="faq-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>{proof ? "05" : "04"}</i> FAQ
          </p>
          <h2 id="faq-title">Questions</h2>
          <dl className="faq">
            {page.faq.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="in-aside">Favio Jasso, Camino Code&rsquo;s founder, runs the discovery session.</p>
          <nav className="in-svc-more" aria-labelledby="more-title">
            <p className="in-mono" id="more-title">
              Other services
            </p>
            <ul>
              {others.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href}>{s.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/services">All services</Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <BookDiscovery />
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: page.kicker, path },
        ])}
      />
      <JsonLd data={serviceLd({ name: page.title, description: service?.line ?? page.description, path })} />
      <JsonLd data={faqPage(page.faq.map((f) => ({ question: f.q, answer: f.a })))} />
    </>
  );
}
