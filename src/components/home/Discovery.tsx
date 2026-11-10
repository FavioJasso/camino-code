import Link from "next/link";
import { stages } from "@/content/approach";
import { site } from "@/content/site";

export function Discovery() {
  return (
    <section className="sec light day" id="discovery" aria-labelledby="discovery-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="mono">
            <i>04</i> Approach
          </p>
          <h2 id="discovery-title">It starts with discovery.</h2>
          <p className="lead">
            A free 45-minute conversation, by video or in person. Within a week
            you get a one-page summary of where data or AI would pay off, and
            where it wouldn&rsquo;t. We reply within one business day.
          </p>
        </div>
        <ol className="stages">
          {stages.map((s, i) => (
            <li className="stage" key={s.name}>
              <span className="mono">
                Stage {String(i + 1).padStart(2, "0")} / 04
              </span>
              <h3>{s.name}</h3>
              <p>{s.line}</p>
            </li>
          ))}
        </ol>
        <div className="cta">
          <Link className="btn btn-lg" href="/discovery">
            Book a discovery session
          </Link>
          <p className="cta-contact">
            Or write to {site.contact.email} or call {site.contact.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
