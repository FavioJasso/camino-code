import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookDiscovery } from "@/components/BookDiscovery";
import { Figures } from "@/components/Figures";
import { PageBand } from "@/components/PageBand";
import { proofBlocks } from "@/content/proof";
import { servicePages } from "@/content/service-pages";
import { services } from "@/content/services";

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
  return {
    title: `${page.kicker} | Camino Code`,
    description: page.description,
    alternates: { canonical: `/services/${page.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const page = pageFor((await params).slug);
  if (!page) notFound();
  const proof = page.proof ? proofBlocks[page.proof] : null;

  return (
    <>
      <PageBand time="night" kicker={page.kicker} title={page.title} />
      <section className="inner-sec in-light">
        <div className="wrap">
          <p className="in-lead">{page.intro}</p>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="problems-title">
        <div className="wrap cols">
          <div>
            <h2 id="problems-title">Problems this solves</h2>
            <ul className="ticks">
              {page.problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
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
        <section className="inner-sec in-light" aria-labelledby="proof-title">
          <div className="wrap">
            <h2 id="proof-title">{proof.name}</h2>
            <Figures figures={proof.figures} />
            <p>{proof.summary}</p>
            <p className="in-mono credit">{proof.wording}</p>
            <p>
              <Link href={proof.href}>Read the case study</Link>
            </p>
          </div>
        </section>
      ) : null}
      <section className="inner-sec in-light in-day" aria-labelledby="engaged-title">
        <div className="wrap">
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
      <section className="inner-sec in-light" aria-labelledby="faq-title">
        <div className="wrap">
          <h2 id="faq-title">Questions</h2>
          <dl className="faq">
            {page.faq.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <BookDiscovery />
      <section className="inner-sec in-light" aria-label="Who you will talk to">
        <div className="wrap">
          <p>Favio Jasso, Camino Code&rsquo;s founder, runs the discovery session.</p>
        </div>
      </section>
    </>
  );
}
