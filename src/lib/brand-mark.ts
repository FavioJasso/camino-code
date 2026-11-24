/*
 * The Camino Code mark's master drawing, in its own 26 x 30 units: a sun disc behind a mountain, with the
 * camino cut into the peak. The master is used wherever the mark is drawn 28 px tall or more (the header and
 * footer marks, the Apple touch icon, the web-manifest icons, the share image). Below that, the browser tab
 * tile in scripts/render-icons.mjs uses a small tier: the same sun and mountain with a one-turn trail.
 *
 * src/components/BrandMark.tsx and the share image in scripts/render-stills.ts read these values.
 * scripts/render-icons.mjs is plain Node and keeps its own copy; scripts/render-stills.test.ts checks that
 * its app-icon trail matches this one.
 */

export const MARK_SUN = { cx: 13.5, cy: 10.5, r: 8.5 } as const;
export const MARK_MOUNTAIN = "M1 28 L12 9.5 L16.5 17 L19.5 14.5 L25 28 Z";
/** the outline, in the background colour, that separates the mountain from the sun */
export const MARK_GAP_WIDTH = 2.4;
/** three angular legs climbing the face, drawn with round caps and round joins */
export const MARK_TRAIL = "M5.5 25.4 L19.6 22.6 L9.8 18.8 L12.2 15";
export const MARK_TRAIL_WIDTH = 2.6;
