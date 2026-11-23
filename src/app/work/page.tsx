import "./work.css";
import Link from "next/link";
import { BookDiscovery } from "@/components/BookDiscovery";
import { Figures } from "@/components/Figures";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import {
  caseStudies,
  danielAvila as daFirst,
  danielAvila64 as da,
  transparentEnergy as te,
  victoriasPainting as vp,
} from "@/content/proof";
import { pageMetadata } from "@/content/seo";
import { breadcrumbList } from "@/lib/structured-data";
import { UnderTheHood } from "./UnderTheHood";
import { CARD_SIZES, WorkImage } from "./WorkImage";

export const metadata = pageMetadata({
  // the band title, then what the page holds, in the words the 404 screen uses for this page
  title: "Work: the case studies | Camino Code",
  description:
    "Case studies from Camino Code: a reconciliation system for Transparent Energy, the playable 3D portfolio DANIEL AVILA 64, and websites for Victoria's Painting and Daniel Avila.",
  path: "/work",
});

/** The short label each study carries above its name, from the shared list. */
const kind = (href: string) => caseStudies.find((s) => s.href === href)?.kind;

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
      {/* in-still: this card runs past the bottom of the window when the page loads, so it does not fade in */}
      <section id={anchor(te.href)} className="inner-sec in-light in-still" aria-labelledby="te-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>01</i> {kind(te.href)}
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
      {/* its figures are developer measurements, so the card leads with the screenshot and the summary and keeps them to one small line */}
      <section id={anchor(da.href)} className="inner-sec in-light in-day work-card" aria-labelledby="da-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>02</i> {kind(da.href)}
          </p>
          <div className="in-card">
            <h2 id="da-title">{da.name}</h2>
            <WorkImage src={da.cardImage.src} alt={da.cardImage.alt} sizes={CARD_SIZES} />
            <div className="in-proof-body in-proof-flush in-proof-stack">
              <div>
                <p>{da.summary}</p>
                <p className="in-mono credit">{da.wording}</p>
              </div>
              <StudyLink href={da.href} name={da.name} />
            </div>
          </div>
          <UnderTheHood label={da.figuresLabel} figures={da.figures} />
        </div>
      </section>
      {/* the two website projects have no measured outcomes, so no figures: image, summary, credit, link */}
      <section id={anchor(vp.href)} className="inner-sec in-light in-day work-card" aria-labelledby="vp-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>03</i> {kind(vp.href)}
          </p>
          <div className="in-card">
            <h2 id="vp-title">{vp.name}</h2>
            <WorkImage src={vp.cardImage.src} alt={vp.cardImage.alt} sizes={CARD_SIZES} />
            <div className="in-proof-body in-proof-flush in-proof-stack">
              <div>
                <p>{vp.summary}</p>
                <p className="in-mono credit">{vp.wording}</p>
              </div>
              <StudyLink href={vp.href} name={vp.name} />
            </div>
          </div>
        </div>
      </section>
      <section id={anchor(daFirst.href)} className="inner-sec in-light in-day work-card" aria-labelledby="da-first-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>04</i> {kind(daFirst.href)}
          </p>
          <div className="in-card">
            <h2 id="da-first-title">{daFirst.name}</h2>
            <WorkImage src={daFirst.cardImage.src} alt={daFirst.cardImage.alt} sizes={CARD_SIZES} />
            <div className="in-proof-body in-proof-flush in-proof-stack">
              <div>
                <p>{daFirst.summary}</p>
                <p className="in-mono credit">{daFirst.wording}</p>
              </div>
              <StudyLink href={daFirst.href} name={daFirst.name} />
            </div>
          </div>
        </div>
      </section>
      <BookDiscovery />
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
    </>
  );
}
