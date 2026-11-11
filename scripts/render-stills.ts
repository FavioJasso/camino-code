// Build-time stills: SVGs projected from the shared terrain module (src/scene/terrain.ts).
// Run with `npm run stills`; also runs before `next build`.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
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
  cameraFor,
  projectToSvg,
  terrainSamples,
  trailAt,
  trailPoints,
  type BandStage,
  type BandTime,
  type SceneCamera,
} from '../src/scene/terrain';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'stills');
const DAY = '#FAF4E8';

interface Theme {
  sky: string; // fill colour, or 'dawn' for the gradient
  ground: string; // occluder fill under each ridge row
  dots: string;
  stars: string | null;
  path: string;
  lantern: string;
  sun: boolean;
}

const NIGHT: Theme = { sky: PALETTE.midnight, ground: PALETTE.midnight, dots: PALETTE.haze, stars: PALETTE.cream, path: PALETTE.ember, lantern: PALETTE.ember, sun: false };
const DAWN: Theme = { sky: 'dawn', ground: PALETTE.morning, dots: PALETTE.ink, stars: null, path: PALETTE.emberInk, lantern: PALETTE.emberInk, sun: true };
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
  { name: 'hero-desktop', w: 1440, h: 900, portrait: false, progress: 0, dawn: 0, theme: NIGHT },
  { name: 'hero-phone', w: 390, h: 844, portrait: true, progress: 0, dawn: 0, theme: NIGHT },
  { name: 'dawn-desktop', w: 1440, h: 900, portrait: false, progress: 0.6, dawn: 0.6, theme: DAWN },
  { name: 'dawn-phone', w: 390, h: 844, portrait: true, progress: 0.6, dawn: 0.6, theme: DAWN },
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
  opts: { clipY?: number; steps?: { row: number; col: number }; minZ?: number } = {},
): string[] {
  const { clipY = Infinity, steps, minZ = -Infinity } = opts;
  const cols = small ? 212 : 392;
  const rows = small ? 118 : 214;
  const s = terrainSamples({ small });
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
  const cam = cameraFor({ aspect: w / h, portrait: spec.portrait, progress: spec.progress, dawn: spec.dawn });
  const proj = (p: [number, number, number]): [number, number] | null => projectToSvg(p, cam, w, h);
  const small = spec.portrait;

  const out: string[] = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bx} ${by} ${bw} ${bh}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Dotted mountain ridges with a lit path climbing to a saddle">`);

  const sad = proj([SADDLE.x, SADDLE.y, SADDLE.z]) ?? [w * 0.68, h * 0.4];
  out.push('<defs>');
  if (theme.sky === 'dawn') {
    out.push(`<linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${r(sad[1] + 80)}"><stop offset="0" stop-color="${PALETTE.midnight}"/><stop offset=".55" stop-color="#6B5B72"/><stop offset="1" stop-color="${PALETTE.morning}"/></linearGradient>`);
  }
  out.push('</defs>');
  out.push(`<rect x="${bx - 50}" y="${by - 50}" width="${bw + 100}" height="${bh + 100}" fill="${theme.sky === 'dawn' ? 'url(#sky)' : theme.sky}"/>`);

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
export const bandStillName = (stage: BandStage, time: BandTime, phone: boolean): string =>
  `band-s${stage}-${time}-${phone ? 'phone' : 'desktop'}`;

const hex = (c: [number, number, number]) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const mixHex = (a: string, b: string, t: number): string => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return hex([0, 1, 2].map((i) => x[i] + (y[i] - x[i]) * t) as [number, number, number]);
};

function renderBand(stage: BandStage, time: BandTime, phone: boolean): string {
  const ref = phone ? BAND_REF.phone : BAND_REF.desktop;
  const { w, h } = ref;
  const cam = bandCameraFor({ aspect: w / h, portrait: phone, stage });
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
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="${phone ? 'xMidYMin' : 'xMidYMid'} slice" role="img" aria-label="Dotted mountain ridges with a lantern on the trail below a saddle">`,
  );
  if (night) {
    // midnight, lifting a little toward deep blue at the horizon line
    out.push(
      `<defs><linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="${r(lineY - 120)}" x2="0" y2="${r(lineY)}"><stop offset="0" stop-color="${PALETTE.midnight}"/><stop offset="1" stop-color="#132042"/></linearGradient></defs>`,
    );
  }
  out.push(`<rect x="-10" y="-10" width="${w + 20}" height="${h + 20}" fill="${night ? 'url(#sky)' : theme.sky}"/>`);
  if (theme.stars) {
    const rand = rng(11);
    let d = '';
    for (let i = 0; i < (phone ? 18 : 60); i++) d += `M${r(rand() * w)} ${r(rand() * Math.max(8, lineY - 6))}h0`;
    out.push(`<path d="${d}" stroke="${theme.stars}" stroke-linecap="round" stroke-width="1.6" opacity=".6"/>`);
  }
  const sun = bandSun(phone, stage, time);
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
  const rowsOpts = { clipY: h + 10, steps: phone ? { row: 5, col: 6 } : { row: 5, col: 5 }, minZ: RIDGE_Z - 3 };
  for (const d of ridgeRows(cam, w, h, false, rowsOpts)) out.push(d);
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

export function renderAllStills(): Record<string, string> {
  const res: Record<string, string> = {};
  for (const s of SPECS) res[s.name] = render(s);
  for (const { stage, time } of BAND_STILLS) {
    for (const phone of [false, true]) res[bandStillName(stage, time, phone)] = renderBand(stage, time, phone);
  }
  return res;
}

export async function writeStills(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const all = renderAllStills();
  for (const [name, svg] of Object.entries(all)) writeFileSync(join(OUT, `${name}.svg`), svg);

  // og.png: hero-desktop with the wordmark, 1200x630
  const wordmark = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect x="0" y="470" width="1200" height="160" fill="${PALETTE.midnight}" opacity=".78"/><text x="64" y="580" font-family="Archivo, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="${PALETTE.cream}" letter-spacing="-1">Camino Code</text></svg>`,
  );
  const base = await sharp(Buffer.from(all['hero-desktop']), { density: 72 }).resize(1200, 630, { fit: 'cover' }).png().toBuffer();
  await sharp(base).composite([{ input: wordmark }]).png().toFile(join(ROOT, 'public', 'og.png'));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  writeStills().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
