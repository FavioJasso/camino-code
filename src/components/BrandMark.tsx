import { useId } from "react";
import {
  MARK_GAP_WIDTH as GAP_WIDTH,
  MARK_MOUNTAIN as MOUNTAIN,
  MARK_SUN as SUN,
  MARK_TRAIL as TRAIL,
  MARK_TRAIL_WIDTH as TRAIL_WIDTH,
} from "@/lib/brand-mark";

/*
 * The Camino Code mark: first light over the saddle, with the camino cut into the peak.
 * It carries the original logo's picture (a warm sun behind a pale mountain) in the
 * site's three colours. One 26 x 30 drawing (the master in src/lib/brand-mark.ts: the
 * trail is three angular legs, drawn wide enough to hold at small sizes), two paintings:
 *
 * - tone "dark" (default): for the Midnight header and any dark panel. The gap around
 *   the mountain and the trail are painted in Midnight.
 * - tone "light": for Morning and Day sections. The gap and the trail are real
 *   cut-outs, so the mark sits on any light background.
 *
 * Size it from CSS (the header reserves 26 x 30 px). It is decorative next to the
 * wordmark, so it is hidden from assistive technology.
 */

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
            <path d={MOUNTAIN} fill="#000" stroke="#000" strokeWidth={GAP_WIDTH} strokeLinejoin="round" />
          </mask>
          <mask id={peakMask} maskUnits="userSpaceOnUse" x="0" y="0" width="26" height="30">
            <rect width="26" height="30" fill="#fff" />
            <path
              d={TRAIL}
              fill="none"
              stroke="#000"
              strokeWidth={TRAIL_WIDTH}
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
        strokeWidth={GAP_WIDTH}
        strokeLinejoin="round"
        paintOrder="stroke"
      />
      <path
        d={TRAIL}
        stroke="var(--midnight)"
        strokeWidth={TRAIL_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
