import Link from "next/link";
import { site } from "@/content/site";

export function BookDiscovery({ heading = "Start with discovery" }: { heading?: string }) {
  return (
    <section className="inner-sec in-light in-day" aria-labelledby="book-title">
      <div className="wrap">
        <h2 id="book-title">{heading}</h2>
        <p className="in-lead">
          A free 45-minute conversation, by video or in person. Within a week you get a one-page
          written summary. We reply within one business day.
        </p>
        <div className="in-cta">
          <Link className="btn in-btn-lg" href="/discovery">
            Book a discovery session
          </Link>
          <p>
            Or write to {site.contact.email} or call {site.contact.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
