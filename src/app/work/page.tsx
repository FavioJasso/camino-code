import type { Metadata } from "next";
import Link from "next/link";
import { BookDiscovery } from "@/components/BookDiscovery";
import { Figures } from "@/components/Figures";
import { PageBand } from "@/components/PageBand";
import { transparentEnergy as te } from "@/content/proof";

export const metadata: Metadata = {
  title: "Work | Camino Code",
  description:
    "Transparent Energy: an automated reconciliation system that replaced hand-matching Excel, PDF and vendor files. Camino Code's founder led the build.",
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
      <section className="inner-sec in-light in-day">
        <div className="wrap">
          <p>Other projects appear here once the clients have confirmed them.</p>
        </div>
      </section>
      <BookDiscovery />
    </>
  );
}
