import Link from "next/link";
import { TrailStages } from "@/components/TrailStages";
import { site } from "@/content/site";

export function Discovery() {
  return (
    <section className="sec light day" id="discovery" aria-labelledby="discovery-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="mono">
            <i>04</i> Approach{" "}
            <span className="t" aria-hidden="true">
              07:30 · Daylight
            </span>
          </p>
          <h2 id="discovery-title">It starts with discovery.</h2>
          <p className="lead">
            A free 45-minute conversation, by video or in person. Within a week
            you get a one-page summary of where data or AI would pay off, and
            where it wouldn&rsquo;t. We reply within one business day.
          </p>
        </div>
        <TrailStages />
        <p className="stages-more">
          <Link className="link" href="/approach">
            See how we work
          </Link>
        </p>
        <div className="cta">
          <Link className="btn btn-lg" href="/discovery">
            Book a discovery session
          </Link>
          <p className="cta-contact">
            Or write to <a href={site.contact.emailHref}>{site.contact.email}</a> or call{" "}
            <a className="nowrap" href={site.contact.phoneHref}>
              {site.contact.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
