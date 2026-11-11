import type { Metadata } from "next";
import { BookDiscovery } from "@/components/BookDiscovery";
import { PageBand } from "@/components/PageBand";
import { TrailStages } from "@/components/TrailStages";
import { discoveryFacts } from "@/content/approach";

export const metadata: Metadata = {
  title: "Approach | Camino Code",
  description:
    "Every engagement starts with a free 45-minute discovery session and a one-page written summary, then moves in stages you can see working.",
  alternates: { canonical: "/approach" },
};

export default function ApproachPage() {
  return (
    <>
      <PageBand stage={3} time="day" kicker="Approach" title="How we work" />
      <section className="inner-sec in-light" aria-labelledby="discovery-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>01</i> Discovery
          </p>
          <h2 id="discovery-title">It starts with discovery</h2>
          <p className="in-lead">
            Discovery is a free conversation about your business: the tools you use, where the data
            lives, and where time is being lost.
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
            You are not behind. Starting properly matters more than starting first, and discovery
            is where we work out where to start.
          </p>
        </div>
      </section>
      <BookDiscovery />
    </>
  );
}
