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
export function terrainSamples(opts: { small: boolean }): Float32Array {
  const { rows, cols } = terrainGrid(opts);
  const out = new Float32Array(rows * cols * 3);
  const pending = fillTerrainSamples(out, opts);
  while (!pending.next().done);
  return out;
}

/** Row and column counts of the terrainSamples grid. */
export function terrainGrid(opts: { small: boolean }): { rows: number; cols: number } {
  return opts.small ? { rows: 118, cols: 212 } : { rows: 214, cols: 392 };
}

/**
 * The same samples as terrainSamples, written into `out` (rows * cols * 3) one row at a time.
 * Yields each finished row index, so the browser scene can time-slice the work.
 */
export function* fillTerrainSamples(out: Float32Array, opts: { small: boolean }): Generator<number, void> {
  const { small } = opts;
  const X0 = small ? -60 : -118;
  const X1 = small ? 52 : 92;
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
