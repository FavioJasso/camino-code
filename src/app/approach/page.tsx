import { BookDiscovery } from "@/components/BookDiscovery";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { TrailStages } from "@/components/TrailStages";
import { discoveryFacts } from "@/content/approach";
import { pageMetadata } from "@/content/seo";
import { breadcrumbList } from "@/lib/structured-data";

export const metadata = pageMetadata({
  // the band title below: it says what the page is, where "Approach" alone did not
  title: "How we work | Camino Code",
  description:
    "How a project runs: a conversation about your business, a one-page summary of what to fix first, then work in stages you can see running.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
      <PageBand stage={3} time="day" kicker="Approach" title="How we work" />
      <section className="inner-sec in-light" aria-labelledby="discovery-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>01</i> Conversation
          </p>
          <h2 id="discovery-title">It starts with a conversation</h2>
          <p className="in-lead">
            The first step is a free conversation about your business: the tools you use, where your
            numbers live, and the jobs that eat the week.
          </p>
          <dl className="facts in-facts-gap">
            {discoveryFacts.map((f) => (
              <div key={f.label}>
                <dt className="in-mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="stages-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>02</i> Stages
          </p>
          <h2 id="stages-title">Then, in stages</h2>
          <TrailStages />
        </div>
      </section>
      <section className="inner-sec in-light in-day" aria-labelledby="start-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>03</i> Starting out
          </p>
          <h2 id="start-title">If you have not started</h2>
          <p className="in-lead">
            You are not behind. Starting properly matters more than starting first, and the first
            conversation is where we work out where to start.
          </p>
        </div>
      </section>
      <BookDiscovery />
      <JsonLd data={breadcrumbList([{ name: "Home", path: "/" }, { name: "Approach", path: "/approach" }])} />
    </>
  );
}
