import type { Metadata } from "next";
import { BookDiscovery } from "@/components/BookDiscovery";
import { PageBand } from "@/components/PageBand";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms | Camino Code",
  description: "The terms for using the Camino Code website and for the free discovery session.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageBand time="day" kicker="Legal" title="Terms" />
      <section className="inner-sec in-light in-day legal">
        <div className="wrap">
          <p className="in-mono draft">Draft, pending review</p>
          <h2>This website</h2>
          <p>The site describes what Camino Code does. It is general information, not advice for your particular business. Please do not rely on it as legal, financial or technical advice.</p>
          <h2>Results we describe</h2>
          <p>The figures on this site describe one specific project, the Transparent Energy reconciliation system. Another business should not expect the same numbers. Your own results depend on your data and your process.</p>
          <h2>Discovery</h2>
          <p>The discovery session is free. Afterwards we send a one-page written summary. We reply to enquiries within one business day.</p>
          <h2>Paid work</h2>
          <p>If you decide to go ahead, the work is agreed separately in writing.</p>
          <h2>Contact</h2>
          <p>Questions about these terms: {site.contact.email} or <span className="nowrap">{site.contact.phone}</span>. Camino Code, {site.contact.place}.</p>
        </div>
      </section>
      <BookDiscovery heading="Questions? Start with discovery" />
    </>
  );
}
