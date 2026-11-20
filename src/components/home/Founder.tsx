import Link from "next/link";
import { FounderPhoto } from "@/components/FounderPhoto";
import { founder } from "@/content/founder";

/* Who you are hiring, on the home page. The copy lives in src/content/founder.ts. */
export function Founder() {
  const { heading, paragraphs, link } = founder.home;
  return (
    <section className="sec light day" id="founder" aria-labelledby="founder-title">
      <div className="wrap founder">
        <FounderPhoto className="portrait" sizes="(max-width: 599px) 160px, 176px" />
        <div>
          <p className="mono">
            <i>03</i> Founder
          </p>
          <h2 id="founder-title">{heading}</h2>
          {paragraphs.map((line) => (
            // "lead" keeps each paragraph to a readable measure
            <p key={line} className="lead">
              {line}
            </p>
          ))}
          <p>
            <Link className="link" href={link.href}>
              {link.label}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
