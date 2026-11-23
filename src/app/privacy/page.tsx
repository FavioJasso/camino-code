import { EmailLink, PhoneLink } from "@/components/ContactLinks";
import { BookDiscovery } from "@/components/BookDiscovery";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { pageMetadata } from "@/content/seo";
import { site } from "@/content/site";
import { breadcrumbList } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Privacy | Camino Code",
  description: "What Camino Code collects when you visit this site or ask for a discovery session, and what it does with it.",
  path: "/privacy",
});

/*
 * A draft awaiting the owner's legal review: keep the badge until it is approved.
 * Each statement about how the site works is tied to the code it describes, so the two
 * can be kept in step:
 * - the email delivery service: src/app/discovery/actions.ts (Resend)
 * - the network address and spam limits: src/app/discovery/actions.ts, src/lib/abuse-guard.ts
 * - analytics: src/app/layout.tsx (Analytics, SpeedInsights), actions.ts (the "discovery_request" event)
 * - browser storage: src/components/home/SceneMount.tsx (sessionStorage "camino:motion-paused"),
 *   src/app/discovery/DiscoveryForm.tsx (sessionStorage "camino:discovery-draft": the six visible form
 *   fields while they are being filled in, removed when the request is sent; never the spam-check values)
 */
export default function PrivacyPage() {
  return (
    <>
      <PageBand time="day" kicker="Legal" title="Privacy" />
      <section className="inner-sec in-light legal in-still">
        <div className="wrap">
          <p className="in-mono draft">Draft, pending review</p>
          <p className="in-mono">Last updated: 20 November 2026</p>
          <h2 className="in-facts-gap">What we collect</h2>
          <p>When you ask for a discovery session, you give us your name, email address, business name and what the business does. You may also give a phone number, what you would like looked at, and who introduced you. We use this to reply to you and to prepare for the conversation.</p>
          <h2>How we receive it</h2>
          <p>The form sends your answers to Camino Code by email. We use Resend, an email delivery service, to send that message. We do not sell your details or use them for advertising.</p>
          <p>To limit spam, the form uses your network address (IP address) for a short time, to count how many requests come from one connection. It is held in the server&rsquo;s memory only. It is not saved with your request or included in the email.</p>
          <h2>Visits to this site</h2>
          <p>We use Vercel Web Analytics and Vercel Speed Insights to count visits and measure how fast pages load. Both come from Vercel, the company that hosts this site. When a discovery request is sent, we also count that one was sent. That count carries nothing you typed into the form. The site does not use advertising trackers.</p>
          <p>Vercel states that Web Analytics works without third-party cookies: a visitor is identified by a hash made from the incoming request, and that visitor session is discarded after 24 hours.</p>
          <h2>What this site stores in your browser</h2>
          <p>Our own code on this site sets no cookies. If you use the Pause animation button, your choice is kept in your browser&rsquo;s session storage, so it carries from page to page. It is cleared when you close the tab. What you type into the discovery form is also kept in session storage, so a reload does not lose it, until your request is sent or you close the tab.</p>
          <h2>How long we keep it</h2>
          <p>We keep your inquiry for as long as we are in touch with you, and delete it when you ask us to.</p>
          <h2>Your choices</h2>
          <p>You can ask to see, correct or delete what we hold about you. Write to <EmailLink /> or call <PhoneLink />.</p>
          <h2>Who we are</h2>
          <p>Camino Code, {site.contact.place}.</p>
        </div>
      </section>
      <BookDiscovery heading="Questions? Start with discovery" />
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
    </>
  );
}
