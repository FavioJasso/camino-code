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
  // the band title, then what the page holds, in the words the 404 screen uses for this page
  title: "Work: the case studies | Camino Code",
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

/** The id of a study's block on this page, which "On this page" jumps to: the last part of its address. */
const anchor = (href: string) => href.slice(href.lastIndexOf("/") + 1);

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
      {/* the four projects by name, as jumps to their blocks below: the page is several screens long */}
      <section className="inner-sec in-dark on-dark in-still in-toc">
        <div className="wrap">
          <nav aria-labelledby="toc-title">
            <p className="in-mono" id="toc-title">
              On this page
            </p>
            <ol>
              {caseStudies.map((s) => (
                <li key={s.href}>
                  {/* The comma is for screen readers, which read the name and the label as one link.
                      Back from whatever page is opened after a jump is kept working by HistoryRepair (layout). */}
                  <a href={`#${anchor(s.href)}`}>
                    <span className="in-toc-name">{s.name}</span>
                    <span className="in-visually-hidden">, </span>
                    <span className="in-mono">{s.kind}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
      {/* the system first, at full weight: its label, figures, summary and credit.
          in-still: this card runs past the bottom of the window when the page loads, so it does not fade in */}
      <section id={anchor(te.href)} className="inner-sec in-light in-still" aria-labelledby="te-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>01</i> {system.kind}
          </p>
          {/* in-card: the link under the summary stretches over the card, so the title and the figures lead to the study too */}
          <div className="in-card">
            <h2 id="te-title">{te.name}</h2>
            <Figures />
            <div className="in-proof-body in-proof-stack">
              <div>
                <p>{te.summary}</p>
                <p className="in-mono credit">{te.wording}</p>
              </div>
              <StudyLink href={te.href} name={te.name} />
            </div>
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
                // in-card: the link under the credit stretches over the card, so the title and the image lead to the study too;
                // the id is the jump target "On this page" points at
                <li id={anchor(s.href)} className="in-work-card in-card" key={s.href}>
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
