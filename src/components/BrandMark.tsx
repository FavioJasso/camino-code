import { useId } from "react";

/*
 * The Camino Code mark: first light over the saddle, with the camino cut into the peak.
 * It carries the original logo's picture (a warm sun behind a pale mountain) in the
 * site's three colours. One 26 x 30 drawing, two paintings:
 *
 * - tone "dark" (default): for the Midnight header and any dark panel. The gap around
 *   the mountain and the trail are painted in Midnight.
 * - tone "light": for Morning and Day sections. The gap and the trail are real
 *   cut-outs, so the mark sits on any light background.
 *
 * Size it from CSS (the header reserves 26 x 30 px). It is decorative next to the
 * wordmark, so it is hidden from assistive technology.
 */

const SUN = { cx: 13.5, cy: 10.5, r: 8.5 };
const MOUNTAIN = "M1 28 L12 9.5 L16.5 17 L19.5 14.5 L25 28 Z";
const TRAIL = "M5.6 25.8 L20 23.2 L8.4 20.4 L14.4 17.6 L12 13.6";

export function BrandMark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const id = useId();

  if (tone === "light") {
    const sunMask = `${id}-sun`;
    const peakMask = `${id}-peak`;
    return (
      <svg viewBox="0 0 26 30" aria-hidden="true" focusable="false" className={className}>
        <defs>
          <mask id={sunMask} maskUnits="userSpaceOnUse" x="0" y="0" width="26" height="30">
            <rect width="26" height="30" fill="#fff" />
            <path d={MOUNTAIN} fill="#000" stroke="#000" strokeWidth="2.4" strokeLinejoin="round" />
          </mask>
          <mask id={peakMask} maskUnits="userSpaceOnUse" x="0" y="0" width="26" height="30">
            <rect width="26" height="30" fill="#fff" />
            <path
              d={TRAIL}
              fill="none"
              stroke="#000"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        </defs>
        <circle {...SUN} fill="var(--ember-ink)" mask={`url(#${sunMask})`} />
        <path d={MOUNTAIN} fill="var(--ink)" mask={`url(#${peakMask})`} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 26 30" aria-hidden="true" focusable="false" fill="none" className={className}>
      <circle {...SUN} fill="var(--ember)" />
      {/* the Midnight outline is painted under the fill and separates the peak from the sun */}
      <path
        d={MOUNTAIN}
        fill="var(--cream)"
        stroke="var(--midnight)"
        strokeWidth="2.4"
        strokeLinejoin="round"
        paintOrder="stroke"
      />
      <path
        d={TRAIL}
        stroke="var(--midnight)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
