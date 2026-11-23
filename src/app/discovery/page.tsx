import { ClosingBand } from "@/components/BookDiscovery";
import { JsonLd } from "@/components/JsonLd";
import { PageBand } from "@/components/PageBand";
import { pageMetadata } from "@/content/seo";
import { site } from "@/content/site";
import { breadcrumbList } from "@/lib/structured-data";
import { EmailLink, PhoneLink } from "@/components/ContactLinks";
import { DiscoveryForm } from "./DiscoveryForm";
import "./discovery.css";

export const metadata = pageMetadata({
  title: "Book a discovery session | Camino Code",
  description:
    "Tell us about your business. A free 45-minute discovery conversation, by video or in person; we reply within one business day.",
  path: "/discovery",
});

export default function DiscoveryPage() {
  return (
    <>
      <PageBand stage={4} time="morning" kicker="Discovery" title="Book a discovery session" />
      {/* in-still: the form is on screen when the page loads, so it does not fade in */}
      <section className="inner-sec in-light in-still" aria-labelledby="form-title">
        <div className="wrap in-split">
          <div>
            <p className="in-mono in-label">
              <i>01</i> Request
            </p>
            {/* The heading and the lead belong to the form: once the request is sent, the confirmation
                takes their place (and the heading's id, which names this section). The lead says the
                offer before the first field at every width; "What happens next" is below the Send
                button on phones and tablets. */}
            <DiscoveryForm
              intro={
                <>
                  <h2 id="form-title">Tell us about your business</h2>
                  <p className="in-lead">
                    A free 45-minute conversation, by video or in person. We reply within one business day to find a time.
                  </p>
                </>
              }
            />
          </div>
          <aside aria-labelledby="next-title">
            <p className="in-mono in-label">
              <i>02</i> Next
            </p>
            <h2 id="next-title">What happens next</h2>
            <ol className="steps">
              <li>
                <div>
                  <h3>We reply</h3>
                  <p>Within one business day, to agree a time for a 45-minute conversation.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>We talk</h3>
                  <p>By video or in person. It is free, and we look at the technology and data you already have.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>You get a summary</h3>
                  <p>A one-page written summary within a week: what to fix first, what to leave alone.</p>
                </div>
              </li>
            </ol>
          </aside>
        </div>
      </section>
      <ClosingBand heading="Prefer to write or call?">
        <p className="in-lead">
          Email <EmailLink /> or call <PhoneLink />. {site.contact.place}.
        </p>
      </ClosingBand>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Book a discovery session", path: "/discovery" },
        ])}
      />
    </>
  );
}
