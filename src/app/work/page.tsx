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
      <PageBand time="morning" title="Work" />
      <section className="inner-sec in-light" aria-labelledby="te-title">
        <div className="wrap">
          <h2 id="te-title">{te.name}</h2>
          <Figures />
          <p>{te.summary}</p>
          <p className="in-mono credit">{te.wording}</p>
          <p>
            <Link href={te.href}>Read the case study</Link>
          </p>
        </div>
      </section>
      <section className="inner-sec in-light in-day work-card" aria-labelledby="da-title">
        <div className="wrap">
          <h2 id="da-title">{da.name}</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={da.cardImage.src} alt={da.cardImage.alt} width={1920} height={1280} loading="lazy" decoding="async" />
          <Figures figures={da.figures} />
          <p>{da.summary}</p>
          <p className="in-mono credit">{da.wording}</p>
          <p>
            <Link href={da.href}>Read the case study</Link>
          </p>
        </div>
      </section>
      <BookDiscovery />
    </>
  );
}
