import "./work.css";
import type { Testimonial } from "@/content/testimonials";

/** The client's full testimonial on their case study: their words, unedited, under their name and role. */
export function ClientQuote({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="in-quote">
      <blockquote>
        {testimonial.full.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </blockquote>
      <figcaption>
        {testimonial.name}, {testimonial.attribution}
      </figcaption>
    </figure>
  );
}
