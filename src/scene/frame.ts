// One frame of the live home scene, computed without WebGL: every point scene.ts would draw, with the
// position, colour and size shaders.ts would give it. The build-time stills (scripts/render-stills.ts) are
// drawn from this, so the still under the canvas is the same picture as the frame that fades in over it.
// Pure and dependency-free, like terrain.ts. Each block names the scene.ts / shaders.ts code it mirrors:
// change one, change the other.
import {
  CAMERA_TARGET,
  H_MAX,
  PALETTE,
  RIDGE_Z,
  SADDLE,
  SKY_LINE_Y,
  SKY_Z,
  SUN_R,
  cameraFor,
  heightAt,
  mulberry,
  projectToSvg,
  skyColours,
  terrainGrid,
  terrainSamples,
  trailAt,
  trailPoints,
  type SceneCamera,
  type Vec3,
} from './terrain';

export type RGB = [number, number, number];

export interface FrameSpec {
  /** The canvas this frame stands for, CSS px. */
  w: number;
  h: number;
  /** Canvas taller than about 10:9 (scene.ts view.portrait): field of view, quiet zone, where the lantern starts. */
  portrait: boolean;
  /** The page's phone layout (scene.ts view.narrow): where the saddle sits. */
  narrow: boolean;
  /** The small-screen point budget (scene.ts small()). */
  small: boolean;
  /** Scroll progress through the hero, 0..1, and sunrise progress, 0..1 (scene.ts state.p, state.d). */
  p: number;
  d: number;
  /** Renderer pixel ratio (scene.ts applyDpr). Point sizes are returned in CSS px. */
  dpr: number;
}

export interface Dot {
  x: number;
  y: number;
  /** Diameter, CSS px. */
  size: number;
  col: RGB;
}

export interface Frame {
  spec: FrameSpec;
  cam: SceneCamera;
  /** Screen position and view depth of a world point, or null behind the camera. */
  project(p: Vec3): [number, number, number] | null;
  /** The terrain cloud, row-major, nearest row first (terrain.ts terrainSamples order). */
  terrain: {
    rows: number;
    cols: number;
    x: Float32Array;
    y: Float32Array;
    /** 1: the live scene does not show this point (behind the camera or behind nearer ground). */
    hidden: Uint8Array;
    /** 1: thinned away by the quiet zone. */
    culled: Uint8Array;
    /** Quiet-zone strength at the point, 0..1. */
    quiet: Float32Array;
    /** Diameter, CSS px. */
    size: Float32Array;
    /** Colour as drawn, rgb triples 0..1. */
    col: Float32Array;
    /** The same colour without first light, the lantern's glow or the quiet zone's veil: the plain cloud. */
    plain: Float32Array;
    /** How much first light shows on the point, 0..1. */
    warm: Float32Array;
    /** Distance to the lantern, scene units. */
    lanternDist: Float32Array;
  };
  /** Trail dots and stars the live scene shows (hidden ones left out). */
  trail: Dot[];
  stars: Dot[];
  /** The lantern: outer radius in CSS px; the shader draws core (0.36), dark gap (0.56) and ring (0.80 to 0.97). */
  lantern: { x: number; y: number; r: number; ring: RGB; core: RGB } | null;
  /** Where the readout layer anchors the saddle bracket. */
  saddleTag: [number, number] | null;
  /** Highest ground at each pixel column, screen y (Infinity where there is none): the skyline. */
  skyline: Float32Array;
  /** Colour of unlit ground (scene.ts cLand). */
  land: RGB;
  /** The quiet zone as NDC ramps (x0, x1, y0, y1) and its strength; strength 0 means none. */
  quietZone: { ramps: [number, number, number, number]; strength: number };
  /** Sunrise: sky colours, the horizon line's screen y, and the sun's disc (null before it shows). */
  sky: { high: RGB; horizon: RGB; lineY: number; sun: { x: number; y: number; r: number } | null };
}

const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
/** GLSL smoothstep. */
const smooth = (a: number, b: number, x: number): number => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const rgb = (hex: string): RGB => [parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255];
export const mix = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
export const toHex = (c: RGB): string => '#' + c.map((v) => Math.round(clamp(v, 0, 1) * 255).toString(16).padStart(2, '0')).join('');

const C = {
  mid: rgb(PALETTE.midnight),
  dusk: rgb(PALETTE.dusk),
  haze: rgb(PALETTE.haze),
  ember: rgb(PALETTE.ember),
  moon: rgb(PALETTE.moon),
  cream: rgb(PALETTE.cream),
  ink: rgb(PALETTE.ink),
  emberInk: rgb(PALETTE.emberInk),
  morn: rgb(PALETTE.morning),
  glow: rgb('#E2A27C'),
  land1: rgb('#171F38'),
};

/** scene.ts buildTerrain: the per-point seed, in the order its shuffle hands them out. */
function pointSeeds(n: number): Float32Array {
  const rnd = mulberry(78);
  const order = new Uint32Array(n);
  for (let i = 0; i < n; i++) order[i] = i;
  for (let i = n - 1; i > 0; i--) {
    const j = (rnd() * (i + 1)) | 0;
    const t = order[i];
    order[i] = order[j];
    order[j] = t;
  }
  const seed = new Float32Array(n);
  for (let k = 0; k < n; k++) seed[order[k]] = rnd();
  return seed;
}

/** scene.ts buildTerrain: slope shading from the grid neighbours (shade toward first light, face toward the viewer). */
function slopeShade(raw: Float32Array, rows: number, cols: number): Float32Array {
  const L = [0.62, 0.42, -0.66];
  const ll = Math.hypot(L[0], L[1], L[2]);
  const [lx, ly, lz] = [L[0] / ll, L[1] / ll, L[2] / ll];
  const out = new Float32Array(rows * cols * 2);
  const X = (i: number) => raw[i * 3];
  const Y = (i: number) => raw[i * 3 + 1];
  const Z = (i: number) => raw[i * 3 + 2];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const a = r * cols + Math.max(0, c - 1);
      const b = r * cols + Math.min(cols - 1, c + 1);
      const gx = (Y(b) - Y(a)) / (X(b) - X(a) || 1);
      const up = Math.max(0, r - 1) * cols + c;
      const dn = Math.min(rows - 1, r + 1) * cols + c;
      const dz = Z(dn) - Z(up) || -1;
      const gz = (Y(dn) - Y(up) - gx * (X(dn) - X(up))) / dz;
      const inv = 1 / Math.hypot(gx, 1, gz);
      out[i * 2] = clamp((-gx * lx + ly - gz * lz) * inv, 0, 1);
      out[i * 2 + 1] = clamp(-gz * inv * 1.6 + 0.35, 0, 1);
    }
  }
  return out;
}

type Projector = (q: Vec3) => [number, number, number] | null;
type Disc = { x: number; y: number; r: number };

/** scene.ts buildSky: the horizon line's screen y, and the sun's disc on the sky plane (null before sunrise). */
function skyGeometry(cam: SceneCamera, d: number, project: Projector): { lineY: number; sun: Disc | null } {
  const line = project([cam.position[0], SKY_LINE_Y, SKY_Z]);
  let sun: Disc | null = null;
  if (d > 0) {
    const e = cam.position;
    const k = (SKY_Z - e[2]) / (CAMERA_TARGET[2] - e[2]);
    const rise = (d - 0.25) / 0.4;
    const centre: Vec3 = [e[0] + (CAMERA_TARGET[0] + 1.2 - e[0]) * k + 6 * rise, SKY_LINE_Y - SUN_R - 3 + clamp(rise, 0, 2) * (2 * SUN_R + 12), SKY_Z];
    const c = project(centre);
    const top = project([centre[0], centre[1] + SUN_R, centre[2]]);
    if (c && top) sun = { x: c[0], y: c[1], r: c[1] - top[1] };
  }
  return { lineY: line ? line[1] : -1, sun };
}

/** Just the sky of a frame, without building its terrain: where the horizon line and the sun sit. */
export function skyOf(spec: FrameSpec): { lineY: number; sun: Disc | null } {
  const cam = cameraFor({ aspect: spec.w / spec.h, portrait: spec.portrait, narrow: spec.narrow, progress: spec.p, dawn: spec.d });
  return skyGeometry(cam, spec.d, (q) => {
    const s = projectToSvg(q, cam, spec.w, spec.h);
    return s ? [s[0], s[1], 1] : null;
  });
}

const PAD = 48; // skyline columns kept either side of the frame, px

export function sceneFrame(spec: FrameSpec): Frame {
  const { w, h, portrait, small, p, d, dpr } = spec;
  const cam = cameraFor({ aspect: w / h, portrait, narrow: spec.narrow, progress: p, dawn: d });
  const fl = Math.hypot(cam.target[0] - cam.position[0], cam.target[1] - cam.position[1], cam.target[2] - cam.position[2]);
  const fwd: Vec3 = [(cam.target[0] - cam.position[0]) / fl, (cam.target[1] - cam.position[1]) / fl, (cam.target[2] - cam.position[2]) / fl];
  const project = (q: Vec3): [number, number, number] | null => {
    const s = projectToSvg(q, cam, w, h);
    if (!s) return null;
    return [s[0], s[1], (q[0] - cam.position[0]) * fwd[0] + (q[1] - cam.position[1]) * fwd[1] + (q[2] - cam.position[2]) * fwd[2]];
  };

  // ---- uniforms (scene.ts resize, frame, applyDawn) ----
  const uPx = (dpr * h) / 900;
  const uProg = Math.pow(p, 0.72);
  const front0 = portrait ? 0.78 : 0.85;
  const ramps: [number, number, number, number] = portrait ? [9, 8, 0.36, -0.1] : [0.2, -0.16, 0.86, 0.5];
  const quietK = portrait ? 1 - smooth(0.12, 0.34, p) : 1;
  const ramp = (a: number, b: number, x: number) => clamp((x - a) / (b - a), 0, 1);
  /** shaders.ts quietAt, from screen px. */
  const quietAt = (sx: number, sy: number) => quietK * ramp(ramps[0], ramps[1], (sx / w) * 2 - 1) * ramp(ramps[2], ramps[3], 1 - (sy / h) * 2);
  const nightQuiet = 1 - smooth(0, 0.3, d); // terrain and trail: the quiet zone lifts as the sunrise starts
  const uDay = d > 0 ? lerp(1.45, -0.5, clamp((d - 0.52) / 0.25, 0, 1)) : 9;
  const landL = smooth(uDay, uDay + 0.1, 0.52);
  const land = mix(C.mid, C.land1, smooth(0, 0.5, d));
  const sky = skyColours(d);
  // shaders.ts DAY_GLSL
  const dayH = (q: Vec3) => Math.min(q[1] / H_MAX, 1) + q[0] * 0.0025 + 0.035 * Math.sin(q[0] * 0.11 + q[2] * 0.17);
  const dayAt = (hx: number) => smooth(uDay, uDay + 0.1, hx);
  const landAt = (k: number) => mix(mix(land, C.glow, smooth(0.42, 0.5, k)), C.morn, smooth(0.5, 0.64, k));

  // ---- lantern (scene.ts buildPath) ----
  const lanternT = lerp(portrait ? 0.6 : 0.13, 1, clamp(p / 0.7, 0, 1));
  const lanternPos = trailAt(lanternT);

  // ---- what hides what: the occluder mesh (scene.ts buildTerrain), swept near to far as a floating horizon ----
  const X0 = small ? -60 : -118;
  const X1 = small ? 52 : 92;
  const seg = small ? 96 : 150;
  const meshW = X1 - X0 + 40;
  const meshD = 24 + 104 + 30;
  const meshCx = (X0 + X1) / 2;
  const meshCz = (-104 + 24) / 2 - 5;
  const cols0 = Math.ceil(w) + 2 * PAD;
  const horizon = new Float32Array(cols0).fill(Infinity);
  const meshZ: number[] = [];
  const snaps: Float32Array[] = [];
  for (let j = 0; j <= seg; j++) {
    const z = meshCz + meshD / 2 - (j / seg) * meshD;
    let prev: [number, number, number] | null = null;
    for (let i = 0; i <= seg; i++) {
      const x = meshCx - meshW / 2 + (i / seg) * meshW;
      const cur = project([x, heightAt(x, z) - 0.3, z]);
      if (cur && prev) {
        const a = Math.max(0, Math.ceil(Math.min(prev[0], cur[0]) + PAD));
        const b = Math.min(cols0 - 1, Math.floor(Math.max(prev[0], cur[0]) + PAD));
        for (let k = a; k <= b; k++) {
          const t = cur[0] === prev[0] ? 0 : (k - PAD - prev[0]) / (cur[0] - prev[0]);
          const y = prev[1] + (cur[1] - prev[1]) * t;
          if (y < horizon[k]) horizon[k] = y;
        }
      }
      prev = cur;
    }
    meshZ.push(z);
    snaps.push(horizon.slice());
  }
  /** Is a point at screen (sx, sy), world depth z, behind nearer ground? */
  const occluded = (sx: number, sy: number, z: number): boolean => {
    let j = 0;
    while (j < meshZ.length && meshZ[j] >= z) j++;
    if (j === 0) return false;
    const k = Math.round(sx) + PAD;
    if (k < 0 || k >= cols0) return false;
    return sy > snaps[j - 1][k];
  };

  // ---- terrain points (shaders.ts TERRAIN_VS) ----
  const { rows, cols } = terrainGrid({ small });
  const raw = terrainSamples({ small });
  const n = rows * cols;
  const seeds = pointSeeds(n);
  const sf = slopeShade(raw, rows, cols);
  const T = {
    rows,
    cols,
    x: new Float32Array(n),
    y: new Float32Array(n),
    hidden: new Uint8Array(n),
    culled: new Uint8Array(n),
    quiet: new Float32Array(n),
    size: new Float32Array(n),
    col: new Float32Array(n * 3),
    plain: new Float32Array(n * 3),
    warm: new Float32Array(n),
    lanternDist: new Float32Array(n),
  };
  const dim = (c: RGB, s: number): RGB => [c[0] * s, c[1] * s, c[2] * s];
  for (let i = 0; i < n; i++) {
    const pos: Vec3 = [raw[i * 3], raw[i * 3 + 1], raw[i * 3 + 2]];
    const s = project(pos);
    if (!s || s[2] <= 0.5) {
      T.hidden[i] = 1;
      continue;
    }
    const [sx, sy, depth] = s;
    T.x[i] = sx;
    T.y[i] = sy;
    if (occluded(sx, sy, pos[2])) T.hidden[i] = 1;
    const seed = seeds[i];
    const shade = sf[i * 2];
    const face = sf[i * 2 + 1];
    const hn = Math.min(pos[1] / H_MAX, 1);
    const q = quietAt(sx, sy) * nightQuiet;
    const b = (0.2 + 0.8 * smooth(0, 0.72, hn)) * (0.55 + 0.45 * face);
    const base = mix(dim(C.dusk, 1.75), C.haze, b);
    const front = lerp(front0, 0.1, uProg);
    const hx = hn + pos[0] * 0.004;
    const lit = smooth(front, front + 0.1, hx + (seed - 0.5) * 0.05) * (0.5 + 0.5 * smooth(0.05, 0.6, shade)) * (1 - 0.85 * q);
    const warm = mix(C.ember, C.moon, smooth(0, 0.55, hx - front));
    const ld = Math.hypot(pos[0] - lanternPos[0], pos[1] - lanternPos[1], pos[2] - lanternPos[2]);
    const glow = (1 - smooth(1.5, 7, ld)) * 0.85;
    const k = dayAt(dayH(pos) + (((seed * 7.31) % 1) - 0.5) * 0.07);
    const flip = smooth(0.35, 0.6, k);
    const sun = smooth(0.4, 0.78, hx) * (0.3 + 0.7 * smooth(0.05, 0.6, shade));
    const dayCol = mix(mix(C.morn, C.ink, 0.62 + 0.38 * b), mix(C.emberInk, C.ember, 0.55 + 0.45 * smooth(0.6, 0.95, hx)), sun * 0.95);
    const fog = smooth(95, 230, depth);
    const haze = fog * lerp(0.6, 0.35, flip);
    const finish = (night: RGB, day: RGB, veil: number): RGB => mix(mix(night, day, flip), landAt(k), Math.min(1, veil));
    const full = finish(mix(mix(base, warm, lit * 0.92), C.ember, glow), mix(dayCol, C.emberInk, glow), haze + q * 0.8);
    const plain = finish(base, dayCol, haze);
    T.col.set(full, i * 3);
    T.plain.set(plain, i * 3);
    T.quiet[i] = q;
    T.warm[i] = lit * 0.92 * (1 - flip);
    T.lanternDist[i] = ld;
    T.size[i] = (clamp((uPx * 100) / depth, 1.3, 2.8 * uPx) * (0.8 + 0.4 * seed) * (1 + 0.3 * lit * (1 - flip)) * (1 + 0.22 * flip)) / dpr;
    if (seed < q * 0.78) T.culled[i] = 1;
  }

  const inFrame = (sx: number, sy: number, m: number) => sx > -m && sx < w + m && sy > -m && sy < h + m;

  // ---- trail (scene.ts buildPath, shaders.ts PATH_VS) ----
  const trail: Dot[] = [];
  const tn = small ? 300 : 460;
  const ahead = mix(dim(C.dusk, 1.5), C.ember, 0.58);
  const walked = mix(C.ember, C.emberInk, landL * 0.8);
  trailPoints(tn).forEach((pt, i) => {
    const s = project(pt);
    if (!s || s[2] <= 0.5 || !inFrame(s[0], s[1], 6) || occluded(s[0], s[1], pt[2])) return;
    const lit = i / (tn - 1) <= lanternT ? 1 : 0;
    const col = mix(lit ? walked : ahead, land, 0.72 * quietAt(s[0], s[1]) * nightQuiet);
    trail.push({ x: s[0], y: s[1], size: (clamp((uPx * 190) / s[2], 2.3 * uPx, 4.4 * uPx) * lerp(0.8, 1, lit)) / dpr, col });
  });

  // ---- lantern (shaders.ts LANTERN_VS / LANTERN_FS; drawn over everything) ----
  const ls = project([lanternPos[0], lanternPos[1] + 0.35, lanternPos[2]]);
  const lantern = ls
    ? { x: ls[0], y: ls[1], r: clamp((uPx * 900) / ls[2], 15 * uPx, 24 * uPx) / dpr / 2, ring: mix(C.ember, C.emberInk, landL), core: mix(C.cream, C.moon, 0.55) }
    : null;

  // ---- stars (scene.ts buildSky, shaders.ts STARS_VS) ----
  const stars: Dot[] = [];
  const rnd = mulberry(911);
  for (let i = 0, sn = small ? 190 : 420; i < sn; i++) {
    const az = (rnd() - 0.5) * 2.5;
    const el = 0.06 + Math.pow(rnd(), 1.4) * 1.0;
    const seed = Math.fround(rnd());
    const s = project([Math.sin(az) * Math.cos(el) * 420, Math.sin(el) * 420, -Math.cos(az) * Math.cos(el) * 420]);
    if (!s || !inFrame(s[0], s[1], 2)) continue;
    const mag = seed * seed;
    const gone = Math.max(smooth(0.12 + mag * 0.6, 0.45 + mag * 0.6, uProg), smooth(0.01, 0.07 + 0.1 * mag, d));
    if (gone > 0.98) continue;
    const k = Math.round(s[0]) + PAD;
    if (k >= 0 && k < cols0 && s[1] > horizon[k]) continue; // behind the ridge
    const bright = (0.22 + 0.78 * mag) * (1 - gone);
    stars.push({ x: s[0], y: s[1], size: ((1.2 + 1.5 * mag) * Math.max(uPx, 1)) / dpr, col: mix(C.mid, mix(C.haze, C.cream, mag), bright * (1 - quietAt(s[0], s[1]))) });
  }

  const { lineY, sun: sunDisc } = skyGeometry(cam, d, project);

  const tag = project([SADDLE.x, SADDLE.y - 0.32 + 1.6, RIDGE_Z]); // scene.ts buildReadouts SAD_Y
  return {
    spec,
    cam,
    project,
    terrain: T,
    trail,
    stars,
    lantern,
    saddleTag: tag ? [tag[0], tag[1]] : null,
    skyline: horizon.slice(PAD, PAD + Math.ceil(w)),
    land,
    quietZone: { ramps, strength: quietK * nightQuiet },
    sky: { high: sky.high, horizon: sky.horizon, lineY, sun: sunDisc },
  };
}
