import "./work.css";
import Link from "next/link";
import { BookDiscovery } from "@/components/BookDiscovery";
import { Figures } from "@/components/Figures";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import {
  caseStudies,
  danielAvila,
  danielAvila64,
  transparentEnergy as te,
  victoriasPainting,
} from "@/content/proof";
import { pageMetadata } from "@/content/seo";
import { breadcrumbList } from "@/lib/structured-data";
import { WEBSITE_CARD_SIZES, WorkImage } from "./WorkImage";

export const metadata = pageMetadata({
  title: "Work | Camino Code",
  description:
    "An automated reconciliation system for Transparent Energy, plus a website for Victoria's Painting and two portfolio sites for Daniel Avila.",
  path: "/work",
});

type WebsiteHref = Exclude<(typeof caseStudies)[number]["href"], typeof te.href>;

/** The three web builds, looked up by path so they follow the order caseStudies gives them.
    Keyed by every caseStudies path except the system's, so a study added there without an entry here fails the type check. */
const WEBSITES: Record<WebsiteHref, typeof victoriasPainting | typeof danielAvila64 | typeof danielAvila> = {
  [victoriasPainting.href]: victoriasPainting,
  [danielAvila64.href]: danielAvila64,
  [danielAvila.href]: danielAvila,
};

/** "Read the case study", with the study's name added for screen readers: four links on one page need four names. */
function StudyLink({ href, name }: { href: string; name: string }) {
  return (
    <Link className="in-link" href={href}>
      Read the case study<span className="in-visually-hidden">: {name}</span>
    </Link>
  );
}

export default function WorkPage() {
  // picked by path, not position, so reordering caseStudies cannot put another study's label on the system
  const system = caseStudies.find((s) => s.href === te.href)!;
  const websites = caseStudies.filter((s): s is Extract<(typeof caseStudies)[number], { href: WebsiteHref }> => s.href !== te.href);
  return (
    <>
      <PageBand stage={2} time="morning" title="Work" />
      {/* the system first, at full weight: its label, figures, summary and credit */}
      <section className="inner-sec in-light" aria-labelledby="te-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>01</i> {system.kind}
          </p>
          <h2 id="te-title">{te.name}</h2>
          <Figures />
          <div className="in-proof-body">
            <div>
              <p>{te.summary}</p>
              <p className="in-mono credit">{te.wording}</p>
            </div>
            <StudyLink href={te.href} name={te.name} />
          </div>
        </div>
      </section>
      {/* then the web builds under one small heading, as three equal, lighter cards with no figures */}
      <section className="inner-sec in-light in-day" aria-labelledby="websites-title">
        <div className="wrap">
          <h2 id="websites-title" className="in-work-group">
            Websites
          </h2>
          <ul className="in-work-cards">
            {websites.map((s) => {
              const study = WEBSITES[s.href];
              return (
                <li className="in-work-card" key={s.href}>
                  <WorkImage src={study.cardImage.src} alt={study.cardImage.alt} sizes={WEBSITE_CARD_SIZES} />
                  <p className="in-mono">{s.kind}</p>
                  <h3>{s.name}</h3>
                  <p>{study.summary}</p>
                  <p className="in-mono credit">{study.wording}</p>
                  <StudyLink href={s.href} name={s.name} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <BookDiscovery heading="Is something in your business still done by hand?" />
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
    </>
  );
}
