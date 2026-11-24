import "./work.css";
import type { Testimonial } from "@/content/testimonials";

/** The id of the "In the client's words" heading above the full testimonial: where the short line links to. */
export const CLIENT_WORDS_ID = "client-words";

/**
 * One whole sentence of the client's testimonial under "At a glance", exactly as the About page
 * shows it (`quote`, with name, role and company where there is one), and a link down to the full text on the same page.
 */
export function ClientLine({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="in-outcome">
      <figure>
        <blockquote>
          <p>&ldquo;{testimonial.quote}&rdquo;</p>
        </blockquote>
        {/* name, role and company as the About caption gives them; with no business name the role stands alone */}
        <figcaption>{[testimonial.name, testimonial.role, testimonial.company].filter(Boolean).join(", ")}</figcaption>
      </figure>
      <p>
        {/* the link carries the words of the heading it jumps to */}
        <a className="in-link" href={`#${CLIENT_WORDS_ID}`}>
          In the client&rsquo;s words
        </a>
      </p>
    </div>
  );
}
