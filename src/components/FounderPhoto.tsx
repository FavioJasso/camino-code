/* A plain <img> with srcset: the two files are already sized and compressed in
   public/people, so there is nothing for the image optimiser to add, and the page
   stays fully static with no runtime /_next/image requests. */
export function FounderPhoto({ className, sizes }: { className: string; sizes: string }) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/people/favio-jasso-400.webp"
        srcSet="/people/favio-jasso-400.webp 400w, /people/favio-jasso-800.webp 800w"
        sizes={sizes}
        width={400}
        height={501}
        alt="Favio Jasso, founder of Camino Code"
        loading="lazy"
        decoding="async"
      />
      <figcaption>Favio Jasso · Founder · Newark, NJ</figcaption>
    </figure>
  );
}
