// Shared terrain for the home scene (three.js, Task 5) and the SVG stills (Node script, Task 3).
// Pure and dependency-free: no DOM, no three.js. Ported from the approved mockup scene
// (first-light-sunrise/parts/04-scene.js) so the two renderers cannot drift apart.

export type Vec3 = [number, number, number];

export const PALETTE = {
  midnight: '#0E1320',
  dusk: '#1C2540',
  cream: '#F4EBDC',
  haze: '#A9B4D0',
  ember: '#FF7A3D',
  moon: '#F7C948',
  morning: '#F2E6D0',
  ink: '#141A2B',
  emberInk: '#B3391B',
  sun: '#F8D97E',
} as const satisfies Record<string, string>;

const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const sstep = (a: number, b: number, x: number): number => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

// ---------- seeded heightfield: one long ridge with a high saddle, foothills in front ----------
/** Seeded PRNG (mulberry32), 0..1. */
export function mulberry(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const NOISE = (() => {
  const r = mulberry(20417);
  const g = new Float32Array(4096);
  for (let i = 0; i < 4096; i++) g[i] = r();
  return g;
})();

function vnoise(x: number, z: number): number {
  const xi = Math.floor(x);
  const zi = Math.floor(z);
  const fx = x - xi;
  const fz = z - zi;
  const u = fx * fx * (3 - 2 * fx);
  const v = fz * fz * (3 - 2 * fz);
  const g = (i: number, j: number): number => NOISE[((i & 63) + (j & 63) * 64) & 4095];
  return lerp(lerp(g(xi, zi), g(xi + 1, zi), u), lerp(g(xi, zi + 1), g(xi + 1, zi + 1), u), v);
}

/** Sharp-crested fbm, 0..1. */
function ridged(x: number, z: number): number {
  let a = 0.5;
  let f = 1;
  let s = 0;
  let n = 0;
  for (let o = 0; o < 4; o++) {
    const r = 1 - Math.abs(vnoise(x * f + o * 17.3, z * f - o * 9.1) * 2 - 1);
    s += r * r * a;
    n += a;
    a *= 0.5;
    f *= 2.1;
  }
  return s / n;
}

export const RIDGE_Z = -70;
export const H_MAX = 29;

export function heightAt(x: number, z: number): number {
  const dz = z - RIDGE_Z;
  const g = Math.exp(-(dz * dz) / (dz > 0 ? 34 * 34 : 15 * 15)); // long front slope, steep back
  const saddle = 1 - 0.42 * Math.exp(-(x * x) / (11 * 11)); // the dip the path aims for
  const lean = 1 + 0.1 * Math.tanh(-x / 26) - 0.16 * Math.exp(-((x - 62) * (x - 62)) / 900);
  const ends = Math.exp(-Math.pow(Math.abs(x + 12) / 104, 6));
  const calm = sstep(3, 16, Math.abs(x)) * 0.75 + 0.25; // keep the saddle itself clean
  const crest = ridged(x * 0.035 + 3.1, z * 0.035 + 1.7);
  const main = g * saddle * lean * ends * (17.5 + 15 * crest * calm);
  const foot =
    4.2 *
    ridged(x * 0.05 - 4, z * 0.06 + 8) *
    sstep(-64, -24, z) *
    sstep(26, 2, z) *
    (0.5 + 0.5 * sstep(-10, 30, Math.abs(x - 6)));
  return main + foot + 0.5 * vnoise(x * 0.3, z * 0.3);
}

/** The destination: where the trail ends, on the floor of the saddle. */
export const SADDLE = { x: 0, y: heightAt(0, RIDGE_Z) + 0.32, z: RIDGE_Z } as const;

/** The mockup's camera look-at point (ctx.saddle), a little above the saddle floor. */
export const CAMERA_TARGET: Vec3 = [0, 15, RIDGE_Z];

// ---------- the path: switchbacks to the saddle ----------
const TRAIL_STEPS = 1500;

/** Raw switchback polyline, as the mockup builds it, with cumulative arclength. */
const TRAIL = (() => {
  const tri = (u: number): number => (Math.asin(Math.sin(u * Math.PI * 2)) * 2) / Math.PI;
  const pts: Vec3[] = [];
  for (let i = 0; i <= TRAIL_STEPS; i++) {
    const s = i / TRAIL_STEPS;
    const z = lerp(17, RIDGE_Z, Math.pow(s, 0.9));
    const amp = lerp(3.2, 10.5, s) * sstep(1, 0.9, s);
    const x = lerp(9, 0, s) + amp * tri(0.25 + 4.5 * Math.pow(s, 1.1));
    pts.push([x, heightAt(x, z) + 0.32, z]);
  }
  const cum = [0];
  for (let i = 1; i <= TRAIL_STEPS; i++) {
    cum.push(
      cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1], pts[i][2] - pts[i - 1][2]),
    );
  }
  return { pts, cum };
})();

/** `count` points evenly spaced by arclength along the trail, start to saddle. */
export function trailPoints(count: number): Array<[number, number, number]> {
  const { pts, cum } = TRAIL;
  const total = cum[TRAIL_STEPS];
  const out: Array<[number, number, number]> = [];
  let cursor = 0;
  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) : 1;
    const d = clamp(t, 0, 1) * total;
    while (cursor < TRAIL_STEPS - 1 && cum[cursor + 1] < d) cursor++;
    const f = (d - cum[cursor]) / Math.max(1e-6, cum[cursor + 1] - cum[cursor]);
    const a = pts[cursor];
    const b = pts[cursor + 1];
    out.push([lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f)]);
  }
  return out;
}

// ---------- terrain sample points ----------
/**
 * xyz triples laid out in transect rows (near to far), jittered like the mockup.
 * About 25k points small, 84k large. Rows are in order; shuffle on the scene side
 * if an even drawRange thinning is wanted.
 */
export function terrainSamples(opts: TerrainOpts): Float32Array {
  const { rows, cols } = terrainGrid(opts);
  const out = new Float32Array(rows * cols * 3);
  const pending = fillTerrainSamples(out, opts);
  while (!pending.next().done);
  return out;
}

/**
 * Grid options. `small`: about 25k points (small screens) instead of about 84k. `wide`: the large grid's
 * extent even when small, for the header bands, whose cameras see further across than the home hero.
 */
export interface TerrainOpts {
  small: boolean;
  wide?: boolean;
}

/** Row and column counts of the terrainSamples grid. */
export function terrainGrid(opts: TerrainOpts): { rows: number; cols: number } {
  if (opts.small && opts.wide) return { rows: 110, cols: 220 };
  return opts.small ? { rows: 118, cols: 212 } : { rows: 214, cols: 392 };
}

/**
 * The same samples as terrainSamples, written into `out` (rows * cols * 3) one row at a time.
 * Yields each finished row index, so the browser scene can time-slice the work.
 */
export function* fillTerrainSamples(out: Float32Array, opts: TerrainOpts): Generator<number, void> {
  const narrow = opts.small && !opts.wide;
  const X0 = narrow ? -60 : -118;
  const X1 = narrow ? 52 : 92;
  const Z0 = -104;
  const Z1 = 24;
  const { rows, cols } = terrainGrid(opts);
  const rnd = mulberry(77);
  let k = 0;
  for (let r = 0; r < rows; r++) {
    const z = lerp(Z1, Z0, Math.pow(r / (rows - 1), 0.92));
    for (let c = 0; c < cols; c++) {
      const x = lerp(X0, X1, (c + (r % 2) * 0.5 + (rnd() - 0.5) * 0.3) / cols);
      out[k++] = x;
      out[k++] = heightAt(x, z) + 0.12;
      out[k++] = z;
    }
    yield r;
  }
}

// ---------- camera ----------
export interface SceneCamera {
  position: Vec3;
  target: Vec3;
  /** Vertical field of view in degrees. */
  fov: number;
  /**
   * Where the target (CAMERA_TARGET) lands in the viewport (0..1), reproducing the mockup's
   * camera.setViewOffset(w, h, (0.5 - cx) * w, (0.5 - cy) * h, w, h).
   */
  viewOffset: { cx: number; cy: number };
}

const BASE_EYE: Vec3 = [7, 7.5, 34];

export function cameraFor(view: { aspect: number; portrait: boolean; progress: number; dawn: number }): SceneCamera {
  const { portrait, dawn } = view;
  const travel = clamp(view.progress, 0, 1);
  const cx = portrait ? 0.58 : 0.68; // 00-vars.css --scene-cx
  const cy0 = portrait ? 0.24 : 0.4; // 00-vars.css --scene-cy
  // phones: the saddle drops to the middle of the sunrise band while it passes
  const cy = portrait ? lerp(cy0, 0.42, sstep(0, 0.2, dawn)) : cy0;
  return {
    position: [BASE_EYE[0] - travel * 1.5, BASE_EYE[1] + travel * 1.6, BASE_EYE[2] - travel * 7],
    target: [...CAMERA_TARGET],
    fov: portrait ? 52 : 38,
    viewOffset: { cx, cy },
  };
}

// ---------- inner-page header bands ----------
export type BandStage = 1 | 2 | 3 | 4;

/** Where the lantern rests on each stage's band, as a fraction of the trail (stage n covers its nth quarter). */
export const BAND_STAGE_T: Record<BandStage, number> = { 1: 0.14, 2: 0.4, 3: 0.64, 4: 0.88 };

/** The point at fraction `t` of the trail's length, start to saddle. */
export function trailAt(t: number): Vec3 {
  const { pts, cum } = TRAIL;
  const d = clamp(t, 0, 1) * cum[TRAIL_STEPS];
  let i = 0;
  while (i < TRAIL_STEPS - 1 && cum[i + 1] < d) i++;
  const f = (d - cum[i]) / Math.max(1e-6, cum[i + 1] - cum[i]);
  const a = pts[i];
  const b = pts[i + 1];
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f)];
}

/** About the height of the ridge crest either side of the saddle. */
const CREST_Y = 26;

/** Band framings by width: phones and tablets keep the subject in the strip above the title panel. */
export type BandLayout = 'phone' | 'tablet' | 'desktop';

/**
 * Reference band shapes. The build-time band stills are rendered at these sizes, and a band of any other
 * shape shows the same picture cropped the way CSS `object-fit: cover` crops the still (centred across;
 * desktop centred down, phone and tablet anchored at the top), so the live canvas fades in without a jump.
 */
export const BAND_REF = {
  desktop: { w: 1440, h: 304, anchorY: 0.5 },
  tablet: { w: 768, h: 236, anchorY: 0 },
  phone: { w: 390, h: 250, anchorY: 0 },
} as const satisfies Record<BandLayout, { w: number; h: number; anchorY: number }>;
/** Horizontal field-of-view caps, degrees: wide bands do not stretch, strip framings do not run off the terrain. */
export const BAND_HFOV_MAX = { desktop: 86, tablet: 86, phone: 64 } as const satisfies Record<BandLayout, number>;
/** Smallest band width for each larger layout (the stills' `<source media>` use the same numbers). */
export const BAND_LAYOUT_MIN = { tablet: 700, desktop: 1024 } as const;

export function bandLayoutFor(width: number): BandLayout {
  return width >= BAND_LAYOUT_MIN.desktop ? 'desktop' : width >= BAND_LAYOUT_MIN.tablet ? 'tablet' : 'phone';
}

/**
 * The band camera at its reference shape. It stands down-trail of the stage's waypoint (where the lantern
 * rests), pitched and zoomed so the ridge crest lands near `top` and the subject near `bottom`.
 * Desktop: it looks across at the saddle, which with the lantern sits right of the title panel.
 * Phone and tablet: the panel covers all but a strip at the top of the band, so the camera aims at the
 * lantern and holds it, with the trail around it, in that strip and clear of the Motion control; the ridge
 * rises above it (on the early stages the crest runs off the top).
 */
function bandRefCamera(layout: BandLayout, stage: BandStage): SceneCamera {
  const ref = BAND_REF[layout];
  const strip = layout !== 'desktop';
  const w = trailAt(BAND_STAGE_T[stage]);
  const position: Vec3 = [lerp(w[0], 4, 0.6), w[1] + (strip ? 6 : 5), w[2] + (strip ? 40 : 52)];
  const elev = (p: Vec3) => Math.atan2(p[1] - position[1], Math.hypot(p[0] - position[0], p[2] - position[2]));
  const crest = elev([SADDLE.x, CREST_Y, RIDGE_Z]);
  // desktop: near the top of the trail the saddle is lower than the lantern, and both should show
  const low = strip ? elev(w) : Math.min(elev(w), elev([SADDLE.x, SADDLE.y, SADDLE.z]));
  const [top, bottom] = strip ? [0.02, 0.12] : [0.14, 0.8];
  const deg = Math.PI / 180;
  const hmax = BAND_HFOV_MAX[layout] * deg;
  const vmax = Math.min(58 * deg, 2 * Math.atan(Math.tan(hmax / 2) / (ref.w / ref.h)));
  const v = clamp((crest - low) / (bottom - top), 14 * deg, vmax);
  const aim: Vec3 = strip ? w : [SADDLE.x, SADDLE.y, RIDGE_Z];
  const pitch = low + (bottom - 0.5) * v; // small-angle fit, exact enough at these fields of view; crest may run off the top
  return {
    position,
    target: [aim[0], position[1] + Math.tan(pitch) * Math.hypot(aim[0] - position[0], aim[2] - position[2]), aim[2]],
    fov: v / deg,
    viewOffset: { cx: layout === 'phone' ? 0.3 : layout === 'tablet' ? 0.5 : 0.72, cy: 0.5 },
  };
}

/**
 * Camera for a header band of the given shape: the reference framing, cropped like the still.
 * A band wider than the reference keeps the full width and loses some height; a narrower one keeps the
 * full height and loses the sides.
 */
export function bandCameraFor(view: { aspect: number; layout: BandLayout; stage: BandStage }): SceneCamera {
  const { aspect, layout, stage } = view;
  const ref = BAND_REF[layout];
  const a0 = ref.w / ref.h;
  const cam = bandRefCamera(layout, stage);
  const { cx, cy } = cam.viewOffset;
  if (aspect >= a0) {
    const k = aspect / a0;
    const half = Math.atan(Math.tan((cam.fov * Math.PI) / 360) / k);
    return { ...cam, fov: (2 * half * 180) / Math.PI, viewOffset: { cx, cy: ref.anchorY + (cy - ref.anchorY) * k } };
  }
  return { ...cam, viewOffset: { cx: 0.5 + (cx - 0.5) * (a0 / aspect), cy } };
}

export type BandTime = 'night' | 'morning' | 'day';

/** Band colour state per hour: night is the hero at first light; morning is mid-sunrise; day is full morning light. */
export const BAND_LIGHT: Record<BandTime, { p: number; d: number }> = {
  night: { p: 0.3, d: 0 },
  morning: { p: 1, d: 0.7 },
  day: { p: 1, d: 1 },
};

/** The sunrise sky ramp (dawn progress -> colour): one sky, exactly Morning from d = 0.8. */
export const SKY_STOPS: ReadonlyArray<readonly [number, string]> = [
  [0, PALETTE.midnight], [0.2, '#16264D'], [0.4, '#3A5184'], [0.56, '#93A2C2'], [0.62, '#D3CBC8'], [0.68, '#E9CDA6'], [0.8, PALETTE.morning],
];

/** The two sky colours at dawn progress d, as the scene's sky shader uses them: high sky, and horizon (which runs ahead). */
export function skyColours(d: number): { high: Vec3; horizon: Vec3 } {
  const at = (t: number): Vec3 => {
    let i = 0;
    while (i < SKY_STOPS.length - 2 && t > SKY_STOPS[i + 1][0]) i++;
    const [t0, a] = SKY_STOPS[i];
    const [t1, b] = SKY_STOPS[i + 1];
    const k = clamp((t - t0) / (t1 - t0), 0, 1);
    const c = (h: string, j: number) => parseInt(h.slice(1 + 2 * j, 3 + 2 * j), 16) / 255;
    return [0, 1, 2].map((j) => lerp(c(a, j), c(b, j), k)) as Vec3;
  };
  const arc = Math.sin(Math.PI * clamp(d / 0.8, 0, 1)); // 0 at both ends: opens dark, closes flat
  return { high: at(d - 0.04 * arc), horizon: at(d + 0.13 * arc) };
}

/** The sky plane and its horizon line, as the browser scene draws them. */
export const SKY_Z = -440;
export const SKY_LINE_Y = 44;
export const SUN_R = 15;

/**
 * Where the band's sun sits (world centre on the sky plane), or null at night: behind the saddle; at
 * morning still rising (its lower part behind the horizon line), by day clear of the line but never so
 * high that its ring (drawn 7 px outside the disc) leaves the top of the reference band.
 */
export function bandSun(layout: BandLayout, stage: BandStage, time: BandTime): Vec3 | null {
  if (time === 'night') return null;
  const ref = BAND_REF[layout];
  const cam = bandRefCamera(layout, stage);
  const e = cam.position;
  const k = (SKY_Z - e[2]) / (CAMERA_TARGET[2] - e[2]);
  const x = e[0] + (CAMERA_TARGET[0] + 1.2 - e[0]) * k;
  if (time === 'morning') return [x, SKY_LINE_Y - 5, SKY_Z];
  let y = SKY_LINE_Y + 12;
  for (; y > SKY_LINE_Y + 3; y -= 0.5) {
    const edge = projectToSvg([x, y + SUN_R, SKY_Z], cam, ref.w, ref.h);
    if (!edge || edge[1] - 9 >= ref.h * 0.04) break; // ring top (7 px out, 1.3 px wide) stays inside the band
  }
  return [x, y, SKY_Z];
}

/** Pure perspective projection to pixel coordinates; null when behind the camera. */
export function projectToSvg(
  p: [number, number, number],
  cam: SceneCamera,
  w: number,
  h: number,
): [number, number] | null {
  // camera basis, as three.js lookAt with up = +Y
  let fx = cam.target[0] - cam.position[0];
  let fy = cam.target[1] - cam.position[1];
  let fz = cam.target[2] - cam.position[2];
  const fl = Math.hypot(fx, fy, fz);
  fx /= fl;
  fy /= fl;
  fz /= fl;
  // right = forward x up(0,1,0)
  let rx = -fz;
  let rz = fx;
  const rl = Math.hypot(rx, rz);
  rx /= rl;
  rz /= rl;
  // up = right x forward
  const ux = -rz * fy;
  const uy = rz * fx - rx * fz;
  const uz = rx * fy;

  const dx = p[0] - cam.position[0];
  const dy = p[1] - cam.position[1];
  const dz = p[2] - cam.position[2];
  const depth = dx * fx + dy * fy + dz * fz;
  if (depth <= 0.5) return null; // behind, or inside the near plane

  const tanHalf = Math.tan((cam.fov * Math.PI) / 360);
  const ndcX = (dx * rx + dz * rz) / (depth * tanHalf * (w / h));
  const ndcY = (dx * ux + dy * uy + dz * uz) / (depth * tanHalf);
  // the target sits at the view-offset point, not the centre
  const sx = (0.5 + ndcX / 2) * w - (0.5 - cam.viewOffset.cx) * w;
  const sy = (0.5 - ndcY / 2) * h - (0.5 - cam.viewOffset.cy) * h;
  return [sx, sy];
}
