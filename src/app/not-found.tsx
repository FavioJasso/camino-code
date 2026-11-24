import type { Metadata } from "next";
import Link from "next/link";
import { PageBand } from "@/components/PageBand";

// No canonical and no share tags: this page answers for every address that does not exist.
export const metadata: Metadata = {
  title: "Page not found | Camino Code",
  description: "That page does not exist. Head back to the Camino Code home page.",
};

export default function NotFound() {
  return (
    <>
      <PageBand time="night" kicker="404" title="This trail doesn't lead anywhere" lazyStill />
      <section className="inner-sec in-light">
        <div className="wrap">
          <p className="in-lead">The page you were looking for is not here. It may have moved, or the link may be mistyped.</p>
          <div className="in-cta">
            <Link className="btn in-btn-lg" href="/">
              Back to the home page
            </Link>
          </div>
        </div>
      </section>
      <section className="inner-sec in-light in-day in-still" aria-labelledby="elsewhere-title">
        <div className="wrap">
          <h2 id="elsewhere-title">Other places to start</h2>
          <ul className="ticks">
            <li>
              <Link href="/services">Services</Link>
              : software, data, and AI &amp; governance.
            </li>
            <li>
              <Link href="/work">Work</Link>
              : the case studies.
            </li>
            <li>
              <Link href="/discovery">Book a discovery session</Link>
              : a free 45-minute conversation.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
