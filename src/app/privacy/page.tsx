import type { Metadata } from "next";
import { BookDiscovery } from "@/components/BookDiscovery";
import { PageBand } from "@/components/PageBand";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy | Camino Code",
  description: "What Camino Code collects when you visit this site or ask for a discovery session, and what it does with it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageBand time="day" kicker="Legal" title="Privacy" />
      <section className="inner-sec in-light legal">
        <div className="wrap">
          <p className="in-mono draft">Draft, pending review</p>
          <h2>What we collect</h2>
          <p>When you ask for a discovery session, you give us your name, email address, business name and what the business does. You may also give a phone number, what you would like looked at, and who introduced you. We use this to reply to you and to prepare for the conversation.</p>
          <h2>How we receive it</h2>
          <p>The form sends your answers to Camino Code by email. We use an email delivery service to send that message. We do not sell your details or use them for advertising.</p>
          <h2>Visits to this site</h2>
          <p>We use Vercel Analytics and Speed Insights to count visits and measure how fast pages load. The site does not use advertising trackers.</p>
          <h2>How long we keep it</h2>
          <p>We keep your enquiry for as long as we are in touch with you, and delete it when you ask us to.</p>
          <h2>Your choices</h2>
          <p>You can ask to see, correct or delete what we hold about you. Write to {site.contact.email} or call <span className="nowrap">{site.contact.phone}</span>.</p>
          <h2>Who we are</h2>
          <p>Camino Code, {site.contact.place}.</p>
        </div>
      </section>
      <BookDiscovery heading="Questions? Start with discovery" />
    </>
  );
}
