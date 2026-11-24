/** `sizes` for a website card on /work: one column below 900 px (capped at 32rem), three across the wrap above it. */
export const WEBSITE_CARD_SIZES = "(max-width: 899px) min(32rem, calc(100vw - 2rem)), min(23rem, calc((100vw - 6rem) / 3))";
/** `sizes` for an image in a case study's two-column gallery. */
export const GALLERY_SIZES = "(max-width: 899px) calc(100vw - 2rem), min(566px, calc(50vw - 1.5rem))";

/**
 * A case-study image. `src` is the 1920x1280 file under /work/<slug>/; its 960w twin sits beside it
 * as <name>-960.webp (scripts/work-images.mjs makes both). A plain <img>, like the founder photo:
 * the files are already sized and compressed, so the page stays static with no /_next/image requests.
 */
export function WorkImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const small = src.replace(".webp", "-960.webp");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={small} srcSet={`${small} 960w, ${src} 1920w`} sizes={sizes} alt={alt} width={1920} height={1280} loading="lazy" decoding="async" />
  );
}
