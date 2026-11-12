import type { Metadata } from "next";
import Link from "next/link";
import { PageBand } from "@/components/PageBand";

export const metadata: Metadata = {
  title: "Page not found | Camino Code",
  description: "That page does not exist. Head back to the Camino Code home page.",
};

export default function NotFound() {
  return (
    <>
      <PageBand time="night" kicker="404" title="This trail doesn't lead anywhere" />
      <section className="inner-sec in-light">
        <div className="wrap">
          <p className="in-lead">The page you were looking for is not here. It may have moved, or the link may be mistyped.</p>
          <div className="in-cta">
            <Link className="btn in-btn-lg" href="/">
              Back to the home page
            </Link>
            <Link href="/discovery">Book discovery</Link>
          </div>
        </div>
      </section>
    </>
  );
}
