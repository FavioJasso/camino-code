import type { Metadata } from "next";
import Link from "next/link";
import { BookDiscovery } from "@/components/BookDiscovery";
import { Figures } from "@/components/Figures";
import { PageBand } from "@/components/PageBand";
import { danielAvila64 as da, transparentEnergy as te } from "@/content/proof";

export const metadata: Metadata = {
  title: "Work | Camino Code",
  description:
    "Transparent Energy: an automated reconciliation system that replaced hand-matching Excel, PDF and vendor files. DANIEL AVILA 64: a playable 3D portfolio built for Daniel Avila.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageBand stage={2} time="morning" title="Work" />
      <section className="inner-sec in-light" aria-labelledby="te-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>01</i> Reconciliation system
          </p>
          <h2 id="te-title">{te.name}</h2>
          <Figures />
          <div className="in-proof-body">
            <div>
              <p>{te.summary}</p>
              <p className="in-mono credit">{te.wording}</p>
            </div>
            <Link className="in-link" href={te.href}>
              Read the case study
            </Link>
          </div>
        </div>
      </section>
      <section className="inner-sec in-light in-day work-card" aria-labelledby="da-title">
        <div className="wrap">
          <p className="in-mono in-label">
            <i>02</i> Playable portfolio
          </p>
          <h2 id="da-title">{da.name}</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={da.cardImage.src.replace(".webp", "-960.webp")} srcSet={`${da.cardImage.src.replace(".webp", "-960.webp")} 960w, ${da.cardImage.src} 1920w`} sizes="(max-width: 815px) calc(100vw - 2rem), 768px" alt={da.cardImage.alt} width={1920} height={1280} loading="lazy" decoding="async" />
          <Figures figures={da.figures} />
          <div className="in-proof-body">
            <div>
              <p>{da.summary}</p>
              <p className="in-mono credit">{da.wording}</p>
            </div>
            <Link className="in-link" href={da.href}>
              Read the case study
            </Link>
          </div>
        </div>
      </section>
      <BookDiscovery />
    </>
  );
}
