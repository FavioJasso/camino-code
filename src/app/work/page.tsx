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
import { CARD_SIZES, WorkImage } from "./WorkImage";

export const metadata = pageMetadata({
  title: "Work | Camino Code",
  description:
    "Case studies from Camino Code: a reconciliation system for Transparent Energy, the playable 3D portfolio DANIEL AVILA 64, and websites for Victoria's Painting and Daniel Avila.",
  path: "/work",
});

/** The short label each study carries above its name, from the shared list. */
const kind = (href: string) => caseStudies.find((s) => s.href === href)?.kind;

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
      <section className="inner-sec in-light" aria-labelledby="te-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>01</i> {kind(te.href)}
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
      <section className="inner-sec in-light in-day work-card" aria-labelledby="da-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>02</i> {kind(da.href)}
          </p>
          <h2 id="da-title">{da.name}</h2>
          <WorkImage src={da.cardImage.src} alt={da.cardImage.alt} sizes={CARD_SIZES} />
          <Figures figures={da.figures} />
          <div className="in-proof-body">
            <div>
              <p>{da.summary}</p>
              <p className="in-mono credit">{da.wording}</p>
            </div>
            <StudyLink href={da.href} name={da.name} />
          </div>
        </div>
      </section>
      {/* the two website projects have no measured outcomes, so no figures: image, summary, credit, link */}
      <section className="inner-sec in-light in-day work-card" aria-labelledby="vp-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>03</i> {kind(vp.href)}
          </p>
          <h2 id="vp-title">{vp.name}</h2>
          <WorkImage src={vp.cardImage.src} alt={vp.cardImage.alt} sizes={CARD_SIZES} />
          <div className="in-proof-body in-proof-flush">
            <div>
              <p>{vp.summary}</p>
              <p className="in-mono credit">{vp.wording}</p>
            </div>
            <StudyLink href={vp.href} name={vp.name} />
          </div>
        </div>
      </section>
      <section className="inner-sec in-light in-day work-card" aria-labelledby="da-first-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>04</i> {kind(daFirst.href)}
          </p>
          <h2 id="da-first-title">{daFirst.name}</h2>
          <WorkImage src={daFirst.cardImage.src} alt={daFirst.cardImage.alt} sizes={CARD_SIZES} />
          <div className="in-proof-body in-proof-flush">
            <div>
              <p>{daFirst.summary}</p>
              <p className="in-mono credit">{daFirst.wording}</p>
            </div>
            <StudyLink href={daFirst.href} name={daFirst.name} />
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
