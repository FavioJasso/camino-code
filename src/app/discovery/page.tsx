import type { Metadata } from "next";
import { ClosingBand } from "@/components/BookDiscovery";
import { PageBand } from "@/components/PageBand";
import { site } from "@/content/site";
import { DiscoveryForm } from "./DiscoveryForm";

export const metadata: Metadata = {
  title: "Book a discovery session | Camino Code",
  description:
    "Tell us about your business. A free 45-minute discovery conversation, by video or in person; we reply within one business day.",
  alternates: { canonical: "/discovery" },
};

export default function DiscoveryPage() {
  return (
    <>
      <PageBand stage={4} time="morning" kicker="Discovery" title="Book a discovery session" />
      <section className="inner-sec in-light" aria-labelledby="form-title">
        <div className="wrap in-split">
          <div>
            <p className="in-mono in-label">
              <i>01</i> Request
            </p>
            <h2 id="form-title">Tell us about your business</h2>
            <p className="in-lead">
              A few details is enough. We reply within one business day to find a time.
            </p>
            <DiscoveryForm />
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
          Email {site.contact.email} or call <span className="nowrap">{site.contact.phone}</span>. {site.contact.place}.
        </p>
      </ClosingBand>
    </>
  );
}
