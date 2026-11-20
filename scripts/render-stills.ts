// Build-time stills: SVGs projected from the shared terrain module (src/scene/terrain.ts).
// Run with `npm run stills`; also runs before `next build`.
//
// Three families:
//   home stills   hero-{desktop,phone}, dawn-{desktop,phone}: drawn from the live scene's own frame
//                 (src/scene/frame.ts), so the canvas fades in over the same picture;
//   live bands    band-s{stage}-{time}-{layout}: the inner-page header bands, framed as the live band;
//   plain bands   band-{night,morning,day}: pages with no live band (legal pages, the 404).
// Plus public/og.png, the share image. Nothing here reads a system font: the lettering is outline paths.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
  BAND_LIGHT,
  BAND_REF,
  BAND_STAGE_T,
  PALETTE,
  RIDGE_Z,
  SADDLE,
  SKY_LINE_Y,
  SKY_Z,
  SUN_R,
  bandCameraFor,
  bandSun,
  skyColours,
  cameraFor,
  projectToSvg,
  terrainGrid,
  terrainSamples,
  trailAt,
  trailPoints,
  type BandLayout,
  type BandStage,
  type BandTime,
  type SceneCamera,
} from '../src/scene/terrain';
import { sceneFrame, skyOf, toHex, type Dot, type Frame, type RGB } from '../src/scene/frame';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'stills');
const DAY = '#FAF4E8';

// ---------- plain bands: the header band of pages with no live scene ----------
interface Theme {
  sky: string;
  ground: string; // occluder fill under each ridge row
  dots: string;
  stars: string | null;
  path: string;
  lantern: string;
  sun: boolean;
}

const NIGHT: Theme = { sky: PALETTE.midnight, ground: PALETTE.midnight, dots: PALETTE.haze, stars: PALETTE.cream, path: PALETTE.ember, lantern: PALETTE.ember, sun: false };
const MORNING: Theme = { sky: PALETTE.morning, ground: PALETTE.morning, dots: PALETTE.ink, stars: null, path: PALETTE.emberInk, lantern: PALETTE.emberInk, sun: true };
const DAYT: Theme = { sky: DAY, ground: DAY, dots: PALETTE.ink, stars: null, path: PALETTE.emberInk, lantern: PALETTE.emberInk, sun: false };

interface Spec {
  name: string;
  w: number;
  h: number;
  /** viewBox crop (defaults to the full composition) */
  box?: [number, number, number, number];
  portrait: boolean;
  progress: number;
  dawn: number;
  theme: Theme;
}

const SPECS: Spec[] = [
  { name: 'band-night', w: 1440, h: 900, box: [0, 190, 1440, 324], portrait: false, progress: 0.3, dawn: 0, theme: NIGHT },
  { name: 'band-morning', w: 1440, h: 900, box: [0, 190, 1440, 324], portrait: false, progress: 0.6, dawn: 0.6, theme: MORNING },
  { name: 'band-day', w: 1440, h: 900, box: [0, 190, 1440, 324], portrait: false, progress: 1, dawn: 1, theme: DAYT },
];

const r = (n: number): number => Math.round(n);

function rng(seed: number): () => number {
  let a = seed;
  return () => {
    a = (Math.imul(a, 1664525) + 1013904223) | 0;
    return (a >>> 0) / 4294967296;
  };
}

function ridgeRows(
  cam: SceneCamera,
  w: number,
  h: number,
  small: boolean,
  opts: { clipY?: number; steps?: { row: number; col: number }; minZ?: number; wide?: boolean } = {},
): string[] {
  const { clipY = Infinity, steps, minZ = -Infinity, wide = false } = opts;
  const { rows, cols } = terrainGrid({ small, wide });
  const s = terrainSamples({ small, wide });
  const rowStep = steps?.row ?? (small ? 3 : 5);
  const colStep = steps?.col ?? (small ? 2 : 4);
  const pathsFarToNear: string[] = [];
  for (let row = rows - 1; row >= 0; row -= rowStep) {
    if (s[row * cols * 3 + 2] < minZ) continue;
    const pts: Array<[number, number]> = [];
    for (let c = 0; c < cols; c += colStep) {
      const k = (row * cols + c) * 3;
      const p = projectToSvg([s[k], s[k + 1], s[k + 2]], cam, w, h);
      if (p && p[0] > -60 && p[0] < w + 60) pts.push([r(p[0]), r(p[1])]);
    }
    if (pts.length < 2) continue;
    if (pts.every((q) => q[1] > clipY)) continue; // wholly below the frame
    pts.sort((a, b) => a[0] - b[0]);
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) d += `l${pts[i][0] - pts[i - 1][0]} ${pts[i][1] - pts[i - 1][1]}`;
    // occluder fill (unstroked) then the dotted crest line on top
    pathsFarToNear.push(`<path d="${d}V${h + 40}H${pts[0][0]}z" stroke="none"/><path d="${d}" fill="none"/>`);
  }
  return pathsFarToNear;
}

function render(spec: Spec): string {
  const { w, h, theme } = spec;
  const [bx, by, bw, bh] = spec.box ?? [0, 0, w, h];
  const cam = cameraFor({ aspect: w / h, portrait: spec.portrait, narrow: spec.portrait, progress: spec.progress, dawn: spec.dawn });
  const proj = (p: [number, number, number]): [number, number] | null => projectToSvg(p, cam, w, h);
  const small = spec.portrait;

  const out: string[] = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bx} ${by} ${bw} ${bh}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Dotted mountain ridges with a lit path climbing to a saddle">`);

  const sad = proj([SADDLE.x, SADDLE.y, SADDLE.z]) ?? [w * 0.68, h * 0.4];
  out.push('<defs></defs>');
  out.push(`<rect x="${bx - 50}" y="${by - 50}" width="${bw + 100}" height="${bh + 100}" fill="${theme.sky}"/>`);

  // stars
  if (theme.stars) {
    const rand = rng(11);
    let big = '';
    let small2 = '';
    for (let i = 0; i < 70; i++) {
      const x = r(rand() * w);
      const y = r(rand() * h * 0.5);
      if (i % 4 === 0) big += `M${x} ${y}h0`;
      else small2 += `M${x} ${y}h0`;
    }
    out.push(`<g stroke="${theme.stars}" stroke-linecap="round"><path d="${small2}" stroke-width="1.4" opacity=".45"/><path d="${big}" stroke-width="2.2" opacity=".9"/></g>`);
  }

  // sun: crisp pale-gold disc with one thin ring, sitting at the saddle
  if (theme.sun) {
    out.push(`<circle cx="${r(sad[0])}" cy="${r(sad[1] - 26)}" r="${spec.portrait ? 46 : 34}" fill="${PALETTE.sun}"/>`);
    out.push(`<circle cx="${r(sad[0])}" cy="${r(sad[1] - 26)}" r="${spec.portrait ? 66 : 52}" fill="none" stroke="${PALETTE.sun}" stroke-width="1.2" opacity=".85"/>`);
  }

  // ridge rows, far to near, each hiding the one behind
  const sw = spec.portrait ? 1.6 : 1.4;
  const gap = spec.portrait ? 3.4 : 3;
  out.push(`<g fill="${theme.ground}" stroke="${theme.dots}" stroke-linecap="round" stroke-width="${sw}" stroke-dasharray="0 ${gap}" stroke-opacity=".8">`);
  for (const d of ridgeRows(cam, w, h, small)) out.push(d);
  out.push('</g>');

  // lit path + lantern at the saddle
  const trail = trailPoints(260)
    .map(proj)
    .filter((p): p is [number, number] => p !== null);
  if (trail.length > 1) {
    let d = `M${r(trail[0][0])} ${r(trail[0][1])}`;
    let px = r(trail[0][0]);
    let py = r(trail[0][1]);
    for (let i = 1; i < trail.length; i++) {
      const x = r(trail[i][0]);
      const y = r(trail[i][1]);
      d += `l${x - px} ${y - py}`;
      px = x;
      py = y;
    }
    out.push(`<path d="${d}" fill="none" stroke="${theme.path}" stroke-width="${spec.portrait ? 2.6 : 2.2}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0 5.5" opacity=".95"/>`);
  }
  const lr = spec.portrait ? 9 : 7;
  out.push(`<circle cx="${r(sad[0])}" cy="${r(sad[1])}" r="${lr}" fill="none" stroke="${theme.lantern}" stroke-width="1.6"/><circle cx="${r(sad[0])}" cy="${r(sad[1])}" r="3" fill="${theme.lantern}"/>`);

  out.push('</svg>');
  return out.join('');
}

// ---------- live-band stills: the inner-page header bands, framed exactly as the live band ----------
/** The (stage, hour) pairs the inner pages use: services, work, approach, about, discovery. */
export const BAND_STILLS: Array<{ stage: BandStage; time: BandTime }> = [
  { stage: 1, time: 'night' },
  { stage: 2, time: 'morning' },
  { stage: 3, time: 'day' },
  { stage: 4, time: 'day' },
  { stage: 4, time: 'morning' },
];
export const BAND_LAYOUTS: BandLayout[] = ['desktop', 'tablet', 'phone'];
export const bandStillName = (stage: BandStage, time: BandTime, layout: BandLayout): string => `band-s${stage}-${time}-${layout}`;

const hex01 = (c: [number, number, number]) => hex(c.map((v) => v * 255) as [number, number, number]);
const hex = (c: [number, number, number]) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const mixHex = (a: string, b: string, t: number): string => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return hex([0, 1, 2].map((i) => x[i] + (y[i] - x[i]) * t) as [number, number, number]);
};

function renderBand(stage: BandStage, time: BandTime, layout: BandLayout): string {
  const { w, h } = BAND_REF[layout];
  const phone = layout === 'phone';
  const strip = layout !== 'desktop';
  const cam = bandCameraFor({ aspect: w / h, layout, stage });
  const proj = (p: [number, number, number]) => projectToSvg(p, cam, w, h);
  const night = time === 'night';
  const theme = night ? NIGHT : MORNING;
  // the live shader's colours: path ahead of the lantern, path walked (darkening to ember ink in daylight)
  const ahead = mixHex(hex([0x1c * 1.5, 0x25 * 1.5, 0x40 * 1.5]), PALETTE.ember, 0.58);
  const walked = night ? PALETTE.ember : mixHex(PALETTE.ember, PALETTE.emberInk, 0.8);
  const line = proj([cam.position[0], SKY_LINE_Y, SKY_Z]);
  const lineY = line ? line[1] : -10;

  const out: string[] = [];
  out.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="${strip ? 'xMidYMin' : 'xMidYMid'} slice" role="img" aria-label="Dotted mountain ridges with a lantern on the trail below a saddle">`,
  );
  const { d } = BAND_LIGHT[time];
  if (night) {
    // midnight, lifting a little toward deep blue at the horizon line
    out.push(
      `<defs><linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="${r(lineY - 120)}" x2="0" y2="${r(lineY)}"><stop offset="0" stop-color="${PALETTE.midnight}"/><stop offset="1" stop-color="#132042"/></linearGradient></defs>`,
    );
  } else {
    // the scene's sunrise sky: horizon colour at the line, high-sky colour above (85 sky units: 63% of the way)
    const sky = skyColours(d);
    const up = proj([cam.position[0], SKY_LINE_Y + 170, SKY_Z]);
    out.push(
      `<defs><linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="${r(lineY)}" x2="0" y2="${r(up ? up[1] : lineY - 200)}"><stop offset="0" stop-color="${hex01(sky.horizon)}"/><stop offset="1" stop-color="${mixHex(hex01(sky.horizon), hex01(sky.high), 0.86)}"/></linearGradient></defs>`,
    );
  }
  out.push(`<rect x="-10" y="-10" width="${w + 20}" height="${h + 20}" fill="url(#sky)"/>`);
  if (theme.stars) {
    const rand = rng(11);
    let d = '';
    for (let i = 0; i < (phone ? 18 : 60); i++) d += `M${r(rand() * w)} ${r(rand() * Math.max(8, lineY - 6))}h0`;
    out.push(`<path d="${d}" stroke="${theme.stars}" stroke-linecap="round" stroke-width="1.6" opacity=".6"/>`);
  }
  const sun = bandSun(layout, stage, time);
  if (sun) {
    const c = proj(sun);
    const e = proj([sun[0], sun[1] + SUN_R, sun[2]]);
    if (c && e) {
      const rad = c[1] - e[1];
      out.push(`<clipPath id="up"><rect x="-10" y="-10" width="${w + 20}" height="${r(lineY + 10)}"/></clipPath>`);
      out.push(
        `<g clip-path="url(#up)" fill="${PALETTE.sun}"><circle cx="${r(c[0])}" cy="${r(c[1])}" r="${rad.toFixed(1)}"/><circle cx="${r(c[0])}" cy="${r(c[1])}" r="${(rad + 7).toFixed(1)}" fill="none" stroke="${PALETTE.sun}" stroke-width="1.3" opacity=".9"/></g>`,
      );
    }
  }
  // horizon line on the sky plane (hidden behind the ridge except through the saddle)
  if (line) out.push(`<path d="M0 ${r(lineY)}H${w}" stroke="${night ? PALETTE.ember : PALETTE.emberInk}" stroke-width="1" opacity="${night ? 0.6 : 0.9}"/>`);

  const sw = phone ? 1.5 : 1.4;
  out.push(`<g fill="${theme.ground}" stroke="${theme.dots}" stroke-linecap="round" stroke-width="${sw}" stroke-dasharray="0 3" stroke-opacity=".8">`);
    // the large grid, as the live band; the low ground behind the ridge barely shows live, so it is left out
  // phone and tablet: the band's small-screen sample set (the large grid's extent at about 25k points)
  const rowsOpts = { clipY: h + 10, steps: strip ? { row: 3, col: 3 } : { row: 5, col: 5 }, minZ: RIDGE_Z - 3, wide: true };
  for (const row of ridgeRows(cam, w, h, strip, rowsOpts)) out.push(row);
  out.push('</g>');

  // the trail: walked up to the lantern, dimmer beyond it
  const T = BAND_STAGE_T[stage];
  const pts = trailPoints(phone ? 200 : 300);
  const seg = (from: number, to: number) => {
    const ps = pts
      .slice(Math.round(from * (pts.length - 1)), Math.round(to * (pts.length - 1)) + 1)
      .map(proj)
      .filter((p): p is [number, number] => p !== null && p[1] > -20 && p[1] < h + 40);
    if (ps.length < 2) return '';
    let d = `M${r(ps[0][0])} ${r(ps[0][1])}`;
    for (let i = 1; i < ps.length; i++) d += `L${r(ps[i][0])} ${r(ps[i][1])}`;
    return d;
  };
  const sw2 = phone ? 2.4 : 2.2;
  out.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0 5.5" stroke-width="${sw2}">`);
  out.push(`<path d="${seg(T, 1)}" stroke="${ahead}" opacity=".8"/><path d="${seg(0, T)}" stroke="${walked}"/>`);
  out.push('</g>');
  const L = proj(trailAt(T));
  if (L) {
    const [x, y] = [r(L[0]), r(L[1] - 2)];
    out.push(
      `<circle cx="${x}" cy="${y}" r="8.4" fill="none" stroke="${night ? PALETTE.ember : PALETTE.emberInk}" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="5.4" fill="${PALETTE.midnight}"/><circle cx="${x}" cy="${y}" r="3.6" fill="${mixHex(PALETTE.cream, PALETTE.moon, 0.55)}"/>`,
    );
  }
  out.push('</svg>');
  return out.join('');
}

// ---------- home stills: the hero and the sunrise window, drawn from the live scene's own frame ----------
// The live scene is a cloud of up to 84,000 points. An SVG that listed them would be megabytes, so the
// cloud is drawn the way the approved mockup's still drew it: each transect row of the terrain grid
// becomes a dotted line (zero-length dashes with round caps), with the dot size and spacing the live
// points have at that depth. Where rows crowd together on screen, one line stands for several rows and
// carries their dots. Everything the eye lands on is drawn dot for dot instead: the lantern and the
// ground it lights, the trail, the first-light crest, the stars.

const lum = (c: RGB): number => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];

/** Deterministic k-means on colours (centres start at luminance quantiles): class per colour, and the class colours. */
function quantise(cols: RGB[], k: number): { idx: Uint8Array; pal: RGB[] } {
  const n = cols.length;
  k = Math.max(1, Math.min(k, n));
  const order = cols.map((_, i) => i).sort((a, b) => lum(cols[a]) - lum(cols[b]) || a - b);
  let pal: RGB[] = Array.from({ length: k }, (_, j) => [...cols[order[Math.min(n - 1, Math.floor(((j + 0.5) / k) * n))]]] as RGB);
  const idx = new Uint8Array(n);
  for (let it = 0; it < 10; it++) {
    const sum = pal.map(() => [0, 0, 0, 0]);
    for (let i = 0; i < n; i++) {
      const c = cols[i];
      let best = 0;
      let bd = Infinity;
      for (let j = 0; j < k; j++) {
        const q = pal[j];
        const dd = (c[0] - q[0]) ** 2 + (c[1] - q[1]) ** 2 + (c[2] - q[2]) ** 2;
        if (dd < bd) {
          bd = dd;
          best = j;
        }
      }
      idx[i] = best;
      const s = sum[best];
      s[0] += c[0];
      s[1] += c[1];
      s[2] += c[2];
      s[3]++;
    }
    pal = pal.map((c, j) => (sum[j][3] ? ([sum[j][0] / sum[j][3], sum[j][1] / sum[j][3], sum[j][2] / sum[j][3]] as RGB) : c));
  }
  return { idx, pal };
}

const median = (v: number[]): number => {
  if (!v.length) return 0;
  const s = [...v].sort((a, b) => a - b);
  return s[s.length >> 1];
};
const num = (v: number): string => String(+v.toFixed(1));

/** Douglas-Peucker line simplification: the points worth keeping. */
function simplify(pts: Array<[number, number]>, tol: number): Array<[number, number]> {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack: Array<[number, number]> = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop()!;
    const [ax, ay] = pts[a];
    const [bx, by] = pts[b];
    const len = Math.hypot(bx - ax, by - ay) || 1;
    let worst = -1;
    let wd = tol;
    for (let i = a + 1; i < b; i++) {
      const dist = Math.abs((bx - ax) * (ay - pts[i][1]) - (ax - pts[i][0]) * (by - ay)) / len;
      if (dist > wd) {
        wd = dist;
        worst = i;
      }
    }
    if (worst > 0) {
      keep[worst] = 1;
      stack.push([a, worst], [worst, b]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

/** A polyline as compact relative path data, whole pixels. */
function linePath(pts: Array<[number, number]>): string {
  let px = r(pts[0][0]);
  let py = r(pts[0][1]);
  let d = `M${px} ${py}`;
  for (let i = 1; i < pts.length; i++) {
    const x = r(pts[i][0]);
    const y = r(pts[i][1]);
    if (x === px && y === py) continue;
    d += `l${x - px}${y - py < 0 ? '' : ' '}${y - py}`;
    px = x;
    py = y;
  }
  return d;
}

interface CloudOpts {
  /** The part of the frame the still shows: x0, y0, x1, y1. */
  box: [number, number, number, number];
  /** Rows closer together on screen than this many px share one line. */
  rowGap: number;
  maxMerge: number;
  /** Line simplification tolerance, px. */
  tol: number;
  /** Colour classes for the cloud. */
  colours: number;
  /** Points drawn dot for dot elsewhere: left out of the rows. */
  skip?: (i: number) => boolean;
  /** Where the cloud is faint anyway (faded or veiled): lines there are simplified three times as hard. */
  faint?: (x: number, y: number) => boolean;
}

/** The terrain cloud as dotted rows: path elements, grouped by colour, dot size and dot spacing. */
function cloudRows(fr: Frame, o: CloudOpts): string[] {
  const T = fr.terrain;
  const { rows, cols } = T;
  const [x0, y0, x1, y1] = o.box;
  const M = 6;
  const shown = (i: number) => !T.hidden[i] && T.x[i] > x0 - M && T.x[i] < x1 + M && T.y[i] > y0 - M && T.y[i] < y1 + M;

  // each row as the live scene shows it: dot spacing along it, distance down to the next row, dot size
  const stat = Array.from({ length: rows }, (_, row) => {
    const step: number[] = [];
    const drop: number[] = [];
    let size = 0;
    let count = 0;
    for (let c = 0; c < cols; c++) {
      const i = row * cols + c;
      if (!shown(i)) continue;
      size += T.size[i];
      count++;
      if (c + 1 < cols && shown(i + 1)) step.push(Math.hypot(T.x[i + 1] - T.x[i], T.y[i + 1] - T.y[i]));
      if (row + 1 < rows && !T.hidden[i + cols]) drop.push(Math.abs(T.y[i + cols] - T.y[i]));
    }
    return { ok: count >= 2 && step.length > 0, step: median(step), drop: median(drop) || o.rowGap, size: size / Math.max(1, count) };
  });
  // plan: which rows are drawn, and how many rows each drawn line stands for (judged over a few rows, so
  // neighbouring lines agree and the texture stays even)
  const plan: Array<{ row: number; merge: number; gap: number; width: number }> = [];
  for (let row = 0; row < rows; ) {
    if (!stat[row].ok) {
      row++;
      continue;
    }
    const drop = median(stat.slice(Math.max(0, row - 3), row + 4).filter((s) => s.ok).map((s) => s.drop));
    const merge = Math.max(1, Math.min(o.maxMerge, rows - row, Math.round(o.rowGap / Math.max(0.2, drop))));
    plan.push({ row, merge, gap: stat[row].step / merge, width: stat[row].size });
    row += merge;
  }

  // colour classes over every vertex that will be drawn
  const verts: number[] = [];
  for (const pl of plan) for (let c = 0; c < cols; c++) if (shown(pl.row * cols + c) && !o.skip?.(pl.row * cols + c)) verts.push(pl.row * cols + c);
  const { idx, pal } = quantise(verts.map((i) => [T.plain[i * 3], T.plain[i * 3 + 1], T.plain[i * 3 + 2]] as RGB), o.colours);
  const cls = new Int16Array(rows * cols).fill(-1);
  verts.forEach((i, k) => (cls[i] = idx[k]));

  // quiet zone: the live scene drops up to 78 percent of the points there (the caller's mask dims the rest).
  // Lightly quiet ground spaces its dots out; deeper in, only every second or fourth line is drawn.
  const thin = (q: number) => (q < 0.12 ? 0 : q < 0.45 ? 1 : q < 0.8 ? 2 : 3);
  const groups = new Map<string, string[]>();
  plan.forEach((pl, line) => {
    // smooth the colour class along the row so runs do not flicker between neighbours
    const raw = Array.from({ length: cols }, (_, c) => cls[pl.row * cols + c]);
    const cl = raw.map((v, c) => {
      if (v < 0) return v;
      const near = raw.slice(Math.max(0, c - 4), c + 5).filter((u) => u >= 0).sort((a, b) => a - b);
      return near[near.length >> 1];
    });
    // each vertex's path (colour class, dot size, dot spacing), '' where nothing is drawn
    const keys: string[] = [];
    const loose: boolean[] = [];
    for (let c = 0; c < cols; c++) {
      const i = pl.row * cols + c;
      const t = cl[c] < 0 ? 0 : thin(T.quiet[i]);
      loose.push(t >= 2 || !!o.faint?.(T.x[i], T.y[i]));
      if (cl[c] < 0 || (t === 2 && line % 2) || (t === 3 && line % 4)) {
        keys.push('');
        continue;
      }
      // dot spacing in steps of about 15 percent, so rows at similar depths share a path
      const gap = Math.exp(Math.round(Math.log(pl.gap * (t === 1 ? 1.3 : 1)) / 0.15) * 0.15);
      keys.push(`${cl[c]}|${(Math.round(pl.width * 5) / 5).toFixed(1)}|${num(gap)}`);
    }
    // a stretch of fewer than four vertices joins the stretch before it: fewer, longer runs
    for (let c = 1, start = 0; c <= cols; c++) {
      if (c < cols && keys[c] === keys[start]) continue;
      if (keys[start] && c - start < 4 && start > 0 && keys[start - 1]) for (let j = start; j < c; j++) keys[j] = keys[start - 1];
      start = c;
    }
    let run: Array<[number, number]> = [];
    const flush = (c: number) => {
      const key = keys[c - 1];
      if (run.length >= 2 && key) {
        const d = linePath(simplify(run, loose[c - 1] ? o.tol * 3 : o.tol));
        if (d.includes('l')) groups.set(key, [...(groups.get(key) ?? []), d]);
      }
      run = [];
    };
    for (let c = 0; c < cols; c++) {
      if (c && keys[c] !== keys[c - 1]) flush(c);
      if (keys[c]) run.push([T.x[pl.row * cols + c], T.y[pl.row * cols + c]]);
    }
    flush(cols);
  });

  // one group per colour, one path per dot size and spacing
  const out: string[] = [];
  let colour = '';
  for (const [k, ds] of [...groups.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
    const [ci, width, gap] = k.split('|');
    if (ci !== colour) out.push(`${colour ? '</g>' : ''}<g stroke="${toHex(pal[+ci])}">`);
    colour = ci;
    out.push(`<path stroke-width="${+width}" stroke-dasharray="0 ${gap}" d="${ds.join('')}"/>`);
  }
  if (colour) out.push('</g>');
  return out;
}

/** Single dots, grouped by colour class and size: one path per group, each dot a zero-length segment. */
function dotPaths(dots: Dot[], colours: number, sizeStep = 0.4, inOrder = false): string[] {
  if (!dots.length) return [];
  const { idx, pal } = quantise(dots.map((d) => d.col), colours);
  const groups = new Map<string, Array<[number, number]>>();
  dots.forEach((d, i) => {
    const k = `${idx[i]}|${num(Math.max(sizeStep, Math.round(d.size / sizeStep) * sizeStep))}`;
    groups.set(k, [...(groups.get(k) ?? []), [r(d.x), r(d.y)]]);
  });
  const out: string[] = [];
  for (const [k, pts] of [...groups.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
    if (!inOrder) pts.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // neighbours first: short relative moves
    let d = '';
    let [px, py] = [0, 0];
    pts.forEach(([x, y], i) => {
      d += i ? `m${x - px}${y - py < 0 ? '' : ' '}${y - py}h0` : `M${x} ${y}h0`;
      [px, py] = [x, y];
    });
    const [ci, size] = k.split('|');
    out.push(`<path stroke="${toHex(pal[+ci])}" stroke-width="${size}" d="${d}"/>`);
  }
  return out;
}

/** The terrain points the live scene shows inside `box` that satisfy `pick`, as dots. */
function terrainDots(fr: Frame, box: [number, number, number, number], pick: (i: number) => boolean): Dot[] {
  const T = fr.terrain;
  const dots: Dot[] = [];
  for (let i = 0; i < T.x.length; i++) {
    if (T.hidden[i] || T.culled[i] || !pick(i)) continue;
    if (T.x[i] < box[0] - 2 || T.x[i] > box[2] + 2 || T.y[i] < box[1] - 2 || T.y[i] > box[3] + 2) continue;
    dots.push({ x: T.x[i], y: T.y[i], size: T.size[i], col: [T.col[i * 3], T.col[i * 3 + 1], T.col[i * 3 + 2]] });
  }
  return dots;
}

/** The lantern as the live shader draws it: thin ring, dark gap, crisp core. */
function lanternSvg(fr: Frame): string {
  const L = fr.lantern;
  if (!L) return '';
  const [x, y] = [num(L.x), num(L.y)];
  return (
    `<circle cx="${x}" cy="${y}" r="${num(L.r * 0.885)}" fill="none" stroke="${toHex(L.ring)}" stroke-width="${num(L.r * 0.17)}"/>` +
    `<circle cx="${x}" cy="${y}" r="${num(L.r * 0.56)}" fill="${PALETTE.midnight}"/><circle cx="${x}" cy="${y}" r="${num(L.r * 0.36)}" fill="${toHex(L.core)}"/>`
  );
}

// "SADDLE 1,340 M" in Martian Mono (weight 500, width 100, letter-spacing 0.09em), as the live readout sets it:
// one outline per character, in units of 1/100 em, baseline at y = 0. Taken once from
// src/fonts/MartianMono-Variable.woff2, so the still needs no font. The first six are "SADDLE".
const SADDLE_LABEL = [
  'M20-21q2 5 6 8q4 3 10 3q6 0 10-4q4-3 4-8q0-4-3-7q-3-3-8-4l-9-1q-10-2-16-8q-5-6-5-15q0-8 3-13q4-6 10-9q6-3 14-3q8 0 15 3q6 3 9 9q4 5 4 13h-12q-2-6-6-9q-3-4-10-4q-7 0-10 4q-4 3-4 9q0 4 2 6q3 3 8 4l9 1q11 2 16 8q6 6 6 15q0 8-4 13q-3 6-9 9q-6 3-14 3q-8 0-15-3q-6-3-9-8q-4-5-4-12z',
  'M83 0l20-80h22l20 80h-14l-17-70h-1l-17 70zm13-26v-12h36v12z',
  'M167 0v-80h23q16 0 25 10q8 10 8 30q0 20-8 30q-9 10-25 10zm13-12h10q10 0 15-7q5-7 5-21q0-14-5-21q-5-7-15-7h-10z',
  'M246 0v-80h23q16 0 25 10q8 10 8 30q0 20-8 30q-9 10-25 10zm13-12h10q10 0 15-7q5-7 5-21q0-14-5-21q-5-7-15-7h-10z',
  'M333 0v-80h13v68h34v12z',
  'M408 0v-80h49v12h-36v22h31v12h-31v22h35v12z',
  'M598-80v68h19v12h-54v-12h22v-61l3 1l-25 16v-14l17-10z',
  'M656 18q4-3 7-8q3-5 4-10v-20q6 0 9 3q2 4 2 10q0 5-1 10q0 4-2 8q-2 4-4 7zm11-17q-5 0-8-3q-2-3-2-8q0-5 2-7q3-3 8-3q5 0 8 3q2 2 2 7q0 5-2 8q-3 3-8 3z',
  'M773-21q0 7-3 12q-4 5-10 8q-5 3-13 3q-9 0-15-3q-6-3-9-9q-4-6-4-14h12q1 7 5 10q4 4 11 4q4 0 7-2q3-1 4-4q2-3 2-6q0-6-3-9q-4-4-10-4h-9v-12h9q7 0 10-3q4-3 4-8q0-5-4-8q-4-4-10-4q-7 0-11 4q-4 4-5 11h-12q0-9 3-15q4-5 10-9q7-3 15-3q8 0 14 3q6 3 9 8q4 5 4 12q0 6-4 11q-3 4-9 6v2q6 1 9 6q3 6 3 13z',
  'M844-80v45h12v13h-12v22h-13v-22h-36v-17l26-41zm-38 44v1h25v-43h3z',
  'M904 2q-15 0-22-11q-8-10-8-31q0-21 8-31q7-11 22-11q15 0 22 11q8 10 8 31q0 21-8 31q-7 11-22 11zm0-12q9 0 13-8q4-7 4-22q0-15-4-22q-4-7-13-7q-9 0-13 7q-4 7-4 22q0 15 4 22q4 8 13 8zm-21-21l42-32v14l-42 32z',
  'M1034 0v-80h19l9 45h1l8-45h19v80h-11v-42v-28h-1l-8 44h-16l-8-44h-1l1 28v42z',
];
/** The elevation the label above states; the stills test checks the terrain still gives it. */
export const SADDLE_LABEL_METRES = 1340;
/** Advance of the full label and of "SADDLE" alone, in the same 1/100 em units. */
const SADDLE_LABEL_W = { full: 1097, short: 465 };

/**
 * The saddle bracket and its label, as scene.ts buildReadouts lays them out (bracket path, chip at
 * left 51 top -34, 1px 4px padding, 9.5 px type on a 14.25 px line). Phones get the short label.
 */
function saddleTagSvg(fr: Frame, short: boolean): string {
  if (!fr.saddleTag) return '';
  const size = 9.5;
  const text = (short ? SADDLE_LABEL.slice(0, 6) : SADDLE_LABEL).join('');
  const width = ((short ? SADDLE_LABEL_W.short : SADDLE_LABEL_W.full) / 100 + 0.09) * size;
  return (
    `<g transform="translate(${num(fr.saddleTag[0])} ${num(fr.saddleTag[1])})">` +
    `<path d="M-12-7v-5h5M7-12h5v5M12 7v5h-5M-7 12h-5v-5M12-12l14-14h22" fill="none" stroke="${PALETTE.cream}" stroke-opacity=".85"/>` +
    `<rect x="51" y="-34" width="${num(width + 8)}" height="16.25" fill="${PALETTE.midnight}" fill-opacity=".8"/>` +
    `<path transform="translate(55 -22.1) scale(${size / 100})" fill="${PALETTE.cream}" d="${text}"/></g>`
  );
}

type HomeLayout = 'desktop' | 'phone';
/** The canvas shapes the home stills are drawn for: the sizes the page is checked at. */
const HOME_REF = { desktop: { w: 1440, h: 900 }, phone: { w: 390, h: 844 } } as const;
const HOME_LABEL = 'Dotted mountain ridges with a lit path climbing to a saddle';

/** How far from the lantern the ground is drawn dot for dot, scene units (its glow reaches 7). */
const LANTERN_REACH = 5.8;

/** The hero still: the live scene's first frame (top of the page, before sunrise). */
function renderHero(layout: HomeLayout): string {
  const phone = layout === 'phone';
  const { w, h } = HOME_REF[layout];
  // phones run the scene at a capped pixel ratio of 1.25 (scene.ts applyDpr), which sets the far dots' size
  const fr = sceneFrame({ w, h, portrait: phone, narrow: phone, small: phone, p: 0, d: 0, dpr: phone ? 1.25 : 1 });
  const T = fr.terrain;
  const box: [number, number, number, number] = [0, 0, w, h];
  const nearLantern = (i: number) => T.lanternDist[i] < LANTERN_REACH;
  const firstLight = (i: number) => T.warm[i] > 0.14;

  const out: string[] = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${HOME_LABEL}">`);
  // quiet zone, where the page copy sits: the live shader fades the cloud toward the ground colour there.
  // A mask on the cloud does the same (the ground colour is the background), along the shader's own ramp:
  // down the frame on phones, right to left across it on desktop. (The shader also lifts the desktop zone
  // over the top 225 px; the mask does not, as the mockup's still did not: only far peaks under the page's
  // own scrim sit there.)
  const [qx0, qx1, qy0, qy1] = fr.quietZone.ramps;
  const px = (ndc: number) => num(((ndc + 1) / 2) * w);
  const py = (ndc: number) => num(((1 - ndc) / 2) * h);
  const along = phone ? `x1="0" y1="${py(qy0)}" x2="0" y2="${py(qy1)}"` : `x1="${px(qx0)}" y1="0" x2="${px(qx1)}" y2="0"`;
  out.push(
    `<defs><linearGradient id="q" gradientUnits="userSpaceOnUse" ${along}><stop offset="0" stop-opacity="0"/><stop offset="1" stop-opacity=".8"/></linearGradient>` +
      `<mask id="quiet" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#fff"/><rect width="${w}" height="${h}" fill="url(#q)"/></mask></defs>`,
  );
  out.push(`<rect width="${w}" height="${h}" fill="${PALETTE.midnight}"/>`);
  out.push('<g fill="none" stroke-linecap="round" stroke-linejoin="round">');
  out.push('<g mask="url(#quiet)">');
  out.push(...cloudRows(fr, { box, rowGap: 3.4, maxMerge: 4, tol: 1.3, colours: 4, skip: nearLantern }));
  out.push('</g>');
  out.push(...dotPaths(fr.stars, 3, 0.6));
  out.push(...dotPaths(terrainDots(fr, box, (i) => firstLight(i) && !nearLantern(i)), 2, 0.5));
  out.push(...dotPaths(terrainDots(fr, box, nearLantern), 4, 0.5));
  out.push(...dotPaths(fr.trail, 5, 0.5, true));
  out.push('</g>');
  out.push(lanternSvg(fr));
  out.push(saddleTagSvg(fr, phone));
  out.push('</svg>');
  return out.join('');
}

/** The sunrise window's share of the viewport height (home.css .dawn-window): the still is the scene as the centred window frames it. */
const DAWN_WINDOW = { desktop: 0.8, phone: 0.64 } as const;
/** Sunrise progress at the hour the window's caption states, 06:24: scene.ts runs 06:10 to 06:40 across the window. */
const DAWN_CAPTION_D = 14 / 30;
/** The mockup's sky for this still, top of the window to bottom: night above, Morning where the next section starts. */
const DAWN_SKY: Array<[number, string]> = [
  [0, PALETTE.midnight],
  [0.15, '#33405F'],
  [0.32, '#A69C9A'],
  [0.5, '#E7D3AF'],
  [0.76, PALETTE.morning],
];

/**
 * The sunrise-window still. The live window shows the fixed scene while its sunrise plays with the scroll,
 * so no single frame joins the night section above it to the Morning section below. As in the mockup, the
 * still lets the hour run down the picture instead: the scene as the centred window frames it, the land in
 * morning light (ink dots, sunlit crest, the walked trail, the lantern at the saddle), the sun where the
 * scene has it at the caption's hour, on the mockup's night-to-Morning sky.
 */
function renderDawn(layout: HomeLayout): string {
  const phone = layout === 'phone';
  const { w, h } = HOME_REF[layout];
  const winH = Math.round(h * DAWN_WINDOW[layout]);
  const top = Math.round((h - winH) / 2);
  const box: [number, number, number, number] = [0, top, w, top + winH];
  const at = { w, h, portrait: phone, narrow: phone, small: phone, p: 1, dpr: phone ? 1.25 : 1 };
  const fr = sceneFrame({ ...at, d: 0.8 });
  const sky = skyOf({ ...at, d: DAWN_CAPTION_D });
  const T = fr.terrain;
  const nearLantern = (i: number) => T.lanternDist[i] < 4.5;
  const saddleY = fr.lantern ? fr.lantern.y : top + winH * 0.45;
  // the hour runs down the picture: the land comes out of the night at the top and thins away into Morning at the bottom
  const fade: Array<[number, number]> = [
    [top, 0],
    [top + winH * 0.12, 0.3],
    [top + winH * 0.24, 1],
    [saddleY, 1],
    [saddleY + (top + winH - saddleY) * 0.55, 0.7],
    [top + winH, 0],
  ];
  const fadeAt = (y: number): number => {
    for (let i = 1; i < fade.length; i++) if (y <= fade[i][0]) return fade[i - 1][1] + ((fade[i][1] - fade[i - 1][1]) * (y - fade[i - 1][0])) / (fade[i][0] - fade[i - 1][0]);
    return 0;
  };
  const grey = (v: number) => toHex([v, v, v]);

  const out: string[] = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${top} ${w} ${winH}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Sunrise behind the saddle, over dotted mountain ridges">`);
  // the sky region (above the ground, and above the horizon line): the sun and the line show only there
  const edge: Array<[number, number]> = [];
  for (let x = 0; x <= w; x++) edge.push([x, Math.min(fr.skyline[Math.min(x, w - 1)], sky.lineY)]);
  const skyClip = `${linePath(simplify(edge, 0.8))}V${top - 10}H0z`;
  out.push(
    `<defs><linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="${top}" x2="0" y2="${top + winH}">${DAWN_SKY.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>` +
      `<linearGradient id="fade" gradientUnits="userSpaceOnUse" x1="0" y1="${top}" x2="0" y2="${top + winH}">${fade.map(([y, v]) => `<stop offset="${+((y - top) / winH).toFixed(3)}" stop-color="${grey(v)}"/>`).join('')}</linearGradient>` +
      `<mask id="land" maskUnits="userSpaceOnUse" x="0" y="${top}" width="${w}" height="${winH}"><rect y="${top}" width="${w}" height="${winH}" fill="url(#fade)"/></mask>` +
      `<clipPath id="up"><path d="${skyClip}"/></clipPath></defs>`,
  );
  out.push(`<rect y="${top}" width="${w}" height="${winH}" fill="url(#sky)"/>`);
  if (sky.sun) {
    const [x, y] = [num(sky.sun.x), num(sky.sun.y)];
    out.push(
      `<g clip-path="url(#up)"><circle cx="${x}" cy="${y}" r="${num(sky.sun.r)}" fill="${PALETTE.sun}"/>` +
        `<circle cx="${x}" cy="${y}" r="${num(sky.sun.r + 7)}" fill="none" stroke="${PALETTE.sun}" stroke-width="1.3"/></g>`,
    );
  }
  out.push(`<path d="M0 ${num(sky.lineY)}H${w}" stroke="${PALETTE.ink}" stroke-opacity=".5" clip-path="url(#up)"/>`);
  out.push('<g fill="none" stroke-linecap="round" stroke-linejoin="round" mask="url(#land)">');
  // nothing is drawn where the fade leaves under a tenth of it
  const seen: [number, number, number, number] = [0, top + winH * 0.04, w, top + winH * 0.94];
  out.push(...cloudRows(fr, { box: seen, rowGap: 6, maxMerge: 3, tol: 1.5, colours: 4, skip: nearLantern, faint: (_, y) => fadeAt(y) < 0.5 }));
  out.push(...dotPaths(terrainDots(fr, box, nearLantern), 3, 0.5));
  out.push(...dotPaths(fr.trail.filter((d) => d.y > top - 4 && d.y < top + winH + 4), 2, 0.5, true));
  out.push('</g>');
  out.push(lanternSvg(fr));
  out.push('</svg>');
  return out.join('');
}

export function renderAllStills(): Record<string, string> {
  const res: Record<string, string> = {};
  res['hero-desktop'] = renderHero('desktop');
  res['hero-phone'] = renderHero('phone');
  res['dawn-desktop'] = renderDawn('desktop');
  res['dawn-phone'] = renderDawn('phone');
  for (const s of SPECS) res[s.name] = render(s);
  for (const { stage, time } of BAND_STILLS) {
    for (const layout of BAND_LAYOUTS) res[bandStillName(stage, time, layout)] = renderBand(stage, time, layout);
  }
  return res;
}

// ---------- og.png: the share image ----------
// "Camino Code" as the header sets it (Archivo, weight 800, width 118, letter-spacing 0.02em), as one outline
// in units of 1/250 em with the baseline at y = 0. Taken once from src/fonts/Archivo-Variable.woff2, so the
// image is the same on every machine, whatever fonts it has.
const WORDMARK =
  'M115 3q-33 0-56-10q-23-10-34-30q-12-19-12-49q0-43 26-66q27-23 76-23q28 0 49 9q22 8 34 24q12 16 12 39h-49q0-11-6-19q-5-7-16-12q-10-4-24-4q-17 0-28 6q-12 6-17 17q-6 11-6 25v8q0 14 5 25q6 11 17 17q12 6 28 6q16 0 26-4q11-4 17-11q6-8 6-19h46q0 22-11 38q-12 16-33 25q-21 8-50 8zm176 0q-12 0-22-2q-9-1-17-6q-7-4-12-11q-4-8-4-19q0-16 8-25q8-9 22-13q15-5 35-6q20-2 44-2v-5q0-7-3-11q-4-5-10-7q-7-2-17-2q-7 0-14 2q-7 1-11 3q-4 3-4 8v2h-45q0-1 0-2q0-1 0-2q0-12 8-21q9-9 26-14q17-5 42-5q23 0 39 5q16 4 25 14q9 9 9 25v54q0 4 2 6q2 3 6 3h12v26q-4 2-11 3q-7 2-15 2q-12 0-19-2q-7-3-11-7q-4-4-5-9h-2q-7 5-15 9q-8 5-19 7q-10 2-22 2zm13-29q6 0 13-1q7-2 13-5q7-3 11-7q4-4 4-10v-8q-22 0-36 2q-14 2-21 6q-7 4-7 11q0 5 3 7q4 3 9 4q5 1 11 1zm127 26v-132h37l3 21h2q6-8 14-14q8-5 18-7q9-3 19-3q17 0 29 6q11 6 17 18h2q7-8 15-14q8-5 17-7q10-3 19-3q18 0 29 6q11 6 17 17q7 12 7 30v82h-45v-75q0-7-2-12q-2-4-5-8q-3-3-7-4q-5-2-11-2q-8 0-15 4q-7 4-11 10q-4 7-4 16v71h-45v-75q0-7-2-12q-1-4-4-8q-3-3-8-4q-4-2-10-2q-9 0-16 4q-7 4-11 10q-4 7-4 16v71zm281-150v-31h45v31zm0 150v-132h45v132zm82 0v-132h36l3 21h2q7-8 15-14q8-5 18-7q10-3 20-3q18 0 30 6q12 6 18 18q6 12 6 29v82h-45v-75q0-7-1-11q-2-5-6-9q-3-3-8-4q-5-2-11-2q-9 0-17 4q-7 4-11 10q-5 7-5 16v71zm261 3q-25 0-44-8q-18-7-28-23q-10-15-10-38q0-23 10-38q10-16 28-23q19-8 44-8q25 0 44 8q18 7 28 23q10 15 10 38q0 23-10 38q-10 16-28 23q-19 8-44 8zm0-31q12 0 20-4q9-4 12-12q4-8 4-19v-6q0-11-4-19q-3-7-12-12q-8-4-20-4q-12 0-20 4q-8 5-12 12q-4 8-4 19v6q0 11 4 19q4 8 12 12q8 4 20 4zm286 31q-34 0-57-10q-22-10-34-30q-11-19-11-49q0-43 26-66q26-23 76-23q28 0 49 9q21 8 33 24q12 16 12 39h-48q0-11-6-19q-6-7-16-12q-10-4-25-4q-17 0-28 6q-11 6-17 17q-6 11-6 25v8q0 14 6 25q6 11 17 17q11 6 28 6q15 0 26-4q11-4 16-11q6-8 6-19h47q0 22-12 38q-11 16-32 25q-21 8-50 8zm204 0q-25 0-43-8q-19-7-29-23q-10-15-10-38q0-23 10-38q10-16 29-23q18-8 43-8q25 0 44 8q18 7 28 23q11 15 11 38q0 23-11 38q-10 16-28 23q-19 8-44 8zm0-31q13 0 21-4q8-4 12-12q3-8 3-19v-6q0-11-3-19q-4-7-12-12q-8-4-21-4q-12 0-20 4q-8 5-12 12q-4 8-4 19v6q0 11 4 19q4 8 12 12q8 4 20 4zm173 31q-19 0-34-7q-15-8-23-23q-8-15-8-39q0-24 8-39q9-15 23-22q14-8 33-8q9 0 17 2q9 2 16 6q7 4 12 10h2v-64h45v181h-37l-3-20h-2q-9 13-22 18q-12 5-27 5zm13-34q11 0 19-4q7-4 11-12q3-7 3-17v-3q0-8-2-14q-2-6-6-11q-4-4-10-7q-6-2-15-2q-11 0-18 4q-7 4-11 11q-3 8-3 18v5q0 10 3 17q4 8 11 11q7 4 18 4zm193 34q-26 0-45-7q-18-8-29-23q-10-15-10-39q0-23 10-38q10-16 29-23q18-8 43-8q26 0 44 7q18 8 28 23q9 15 9 38v10h-116q0 11 4 17q5 7 13 11q8 3 21 3q6 0 12-1q6-2 10-4q5-3 8-7q2-4 3-8h45q0 11-6 20q-5 10-16 16q-11 7-25 10q-15 3-32 3zm-37-84h69q0-6-2-10q-2-5-7-8q-4-3-10-5q-6-2-13-2q-11 0-19 3q-8 3-13 9q-4 6-5 13z';

// The mark, as src/components/BrandMark.tsx draws it on a 26 x 30 canvas: sun, mountain, the camino cut into
// the peak. Masks make the gap and the trail real cut-outs, so it sits on the scene, not on a flat tile.
const MARK = {
  sun: 'cx="13.5" cy="10.5" r="8.5"',
  mountain: 'M1 28 L12 9.5 L16.5 17 L19.5 14.5 L25 28 Z',
  trail: 'M5.6 25.8 L20 23.2 L8.4 20.4 L14.4 17.6 L12 13.6',
};
function markSvg(x: number, y: number, scale: number): string {
  const area = 'maskUnits="userSpaceOnUse" x="0" y="0" width="26" height="30"><rect width="26" height="30" fill="#fff"/>';
  return (
    `<g transform="translate(${num(x)} ${num(y)}) scale(${+scale.toFixed(3)})">` +
    `<mask id="mark-sun" ${area}<path d="${MARK.mountain}" fill="#000" stroke="#000" stroke-width="2.4" stroke-linejoin="round"/></mask>` +
    `<mask id="mark-peak" ${area}<path d="${MARK.trail}" fill="none" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></mask>` +
    `<circle ${MARK.sun} fill="${PALETTE.ember}" mask="url(#mark-sun)"/><path d="${MARK.mountain}" fill="${PALETTE.cream}" mask="url(#mark-peak)"/></g>`
  );
}

export const OG_SIZE = { w: 1200, h: 630 } as const;

/** The hero's left-hand scrim (home.css .hero): how far toward Midnight the scene is taken at x, 0..1 across. */
const ogScrim = (x: number): number => (x <= 0.36 ? 0.9 - (0.12 * x) / 0.36 : x <= 0.6 ? (0.78 * (0.6 - x)) / 0.24 : 0);

/**
 * The share image's lockup, bottom left: mark then wordmark, in the header's proportions (globals.css .brand:
 * a 26 x 30 mark, a 10 px gap and 17 px type), scaled up together.
 */
function ogLockup(): string {
  const { w, h } = OG_SIZE;
  const type = 58; // px
  const k = type / 17;
  const [x, bottom] = [72, h - 72];
  const markH = 30 * k;
  const middle = bottom - markH / 2;
  // the header centres the mark on the text's line box: for Archivo that is 0.334 em above the baseline
  const baseline = middle + 0.334 * type;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    markSvg(x, middle - markH / 2, k) +
    `<path transform="translate(${num(x + (26 + 10) * k)} ${num(baseline)}) scale(${+(type / 250).toFixed(4)})" fill="${PALETTE.cream}" d="${WORDMARK}"/>` +
    '</svg>'
  );
}

export async function writeStills(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const all = renderAllStills();
  for (const [name, svg] of Object.entries(all)) writeFileSync(join(OUT, `${name}.svg`), svg);

  // og.png: the hero still under the hero's scrim, then the lockup. Every glyph is an outline: no system font is read.
  const { w, h } = OG_SIZE;
  const scene = await sharp(Buffer.from(all['hero-desktop']), { density: 72 }).resize(w, h, { fit: 'cover' }).removeAlpha().raw().toBuffer();
  // the scrim is mixed in here, pixel by pixel, so flat Midnight stays exactly Midnight (an alpha layer bands)
  const night = [1, 3, 5].map((i) => parseInt(PALETTE.midnight.slice(i, i + 2), 16));
  for (let x = 0; x < w; x++) {
    const a = ogScrim(x / w);
    if (a <= 0) continue;
    for (let y = 0; y < h; y++) for (let c = 0; c < 3; c++) scene[(y * w + x) * 3 + c] = Math.round(scene[(y * w + x) * 3 + c] * (1 - a) + night[c] * a);
  }
  await sharp(scene, { raw: { width: w, height: h, channels: 3 } })
    .composite([{ input: Buffer.from(ogLockup()) }])
    .png({ compressionLevel: 9 })
    .toFile(join(ROOT, 'public', 'og.png'));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  writeStills().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
