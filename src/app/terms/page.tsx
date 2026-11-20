import { EmailLink, PhoneLink } from "@/components/ContactLinks";
import { BookDiscovery } from "@/components/BookDiscovery";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { pageMetadata } from "@/content/seo";
import { site } from "@/content/site";
import { breadcrumbList } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Terms | Camino Code",
  description: "The terms for using the Camino Code website and for the free discovery session.",
  path: "/terms",
});

// A draft awaiting the owner's legal review: keep the badge until it is approved.
export default function TermsPage() {
  return (
    <>
      <PageBand time="day" kicker="Legal" title="Terms" />
      <section className="inner-sec in-light legal in-still">
        <div className="wrap">
          <p className="in-mono draft">Draft, pending review</p>
          <p className="in-mono">Last updated: 20 November 2026</p>
          <h2 className="in-facts-gap">This website</h2>
          <p>The site describes what Camino Code does. It is general information, not advice for your particular business. Please do not rely on it as legal, financial or technical advice.</p>
          <h2>Results we describe</h2>
          <p>The figures on this site describe specific projects: the Transparent Energy reconciliation system and DANIEL AVILA 64. Another business should not expect the same numbers. Your own results depend on your data and your process.</p>
          <h2>Discovery</h2>
          <p>The discovery session is free. Afterwards we send a one-page written summary. We reply to inquiries within one business day.</p>
          <h2>Paid work</h2>
          <p>If you decide to go ahead, the work is agreed separately in writing.</p>
          <h2>Contact</h2>
          <p>Questions about these terms: <EmailLink /> or <PhoneLink />. Camino Code, {site.contact.place}.</p>
        </div>
      </section>
      <BookDiscovery heading="Questions? Start with discovery" />
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
    </>
  );
}
