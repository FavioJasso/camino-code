import "./work.css";
import Link from "next/link";
import { caseStudies } from "@/content/proof";

type StudyPath = (typeof caseStudies)[number]["href"];

/**
 * Closes a case study with links to the other studies and back to the index.
 * A Day section, so it can only sit after the page's last content section and before the booking band.
 */
export function MoreWork({ current }: { current: StudyPath }) {
  return (
    <section className="inner-sec in-light in-day in-more">
      <div className="wrap">
        <nav aria-labelledby="more-work-title">
          <h2 id="more-work-title">More work</h2>
          <ul className="in-more-list">
            {caseStudies
              .filter((s) => s.href !== current)
              .map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.name}</Link>
                  <span className="in-mono">{s.kind}</span>
                </li>
              ))}
            <li>
              <Link href="/work">All work</Link>
              <span className="in-mono">Back to the list</span>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
