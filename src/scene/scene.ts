// First Light: the live home-page scene. Ported from the approved mockup (first-light-sunrise/parts/04-scene.js),
// with terrain, trail and camera framing taken from the shared terrain module so the stills cannot drift.
// Loaded only by SceneMount (never under reduced motion), after first paint.
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  Vector3,
  Vector4,
  WebGLRenderer,
  type IUniform,
} from "three";
import {
  BAND_PHONE_MAX,
  BAND_STAGE_T,
  CAMERA_TARGET,
  H_MAX,
  PALETTE,
  RIDGE_Z,
  SADDLE,
  SKY_LINE_Y,
  SKY_Z,
  SUN_R,
  bandCameraFor,
  bandSun,
  cameraFor,
  fillTerrainSamples,
  heightAt,
  mulberry,
  terrainGrid,
  trailPoints,
  type BandStage,
  type BandTime,
  type SceneCamera,
} from "./terrain";
import * as GLSL from "./shaders";

// The reduced-motion e2e test checks this stays undefined: proof the chunk never ran.
(globalThis as { __caminoScene?: boolean }).__caminoScene = true;

export type { BandTime };
export interface SceneOptions {
  paused?: boolean;
  /** Called with true once a frame is showing over the still, false after context loss or teardown. */
  onLive?: (live: boolean) => void;
  /** "home": the full-viewport scene driven by scroll (default). "band": an inner-page header band. */
  mode?: "home" | "band";
  /** Band framing: the stage on the trail where the lantern rests, and the hour. */
  band?: { stage: BandStage; time: BandTime };
}
export interface SceneHandle {
  destroy(): void;
  setPaused(paused: boolean): void;
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const sstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
/** Raw sRGB for our own shaders (no colour management in ShaderMaterial output). */
const rgb = (hex: string) =>
  new Vector3(parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255);

const SLICE_MS = 8; // start-up work runs in slices well under the 50 ms long-task line
const yieldTask = (): Promise<void> => {
  const s = (globalThis as { scheduler?: { yield?: () => Promise<void> } }).scheduler;
  return s?.yield ? s.yield() : new Promise((r) => setTimeout(r, 0));
};

const SLOW_WORK_MS = 12; // CPU work per frame, frame start to after render
const SLOW_SAMPLES = 60;
const WARM_FRAMES = 45;
const PAUSED_STEP = 0.1; // while paused, scroll moves the scene in discrete steps

const ABORT = Symbol("abort");

/** Band colour state per hour: night is the hero at first light; morning and day are the sunrise phase. */
const BAND_LIGHT: Record<BandTime, { p: number; d: number }> = {
  night: { p: 0.3, d: 0 },
  morning: { p: 1, d: 0.8 },
  day: { p: 1, d: 1 },
};
const HOME_FOCAL = 450 / Math.tan((19 * Math.PI) / 180); // the home camera's focal length at 900 px tall, in px

export function startScene(root: HTMLElement, opts: SceneOptions = {}): SceneHandle {
  const band = opts.mode === "band" ? (opts.band ?? { stage: 1, time: "night" }) : null;
  const canvas = root.querySelector<HTMLCanvasElement>(band ? "canvas.band-gl" : "#gl");
  const ui = band ? null : root.querySelector<HTMLElement>("#scene-ui");
  const dawnEl = band ? null : document.getElementById("dawn-window");
  const noop: SceneHandle = { destroy() {}, setPaused() {} };
  if (!canvas) return noop;

  const attrs = { antialias: false, alpha: false, depth: true, stencil: false, powerPreference: "high-performance" } as const;
  const gl = canvas.getContext("webgl2", { ...attrs }) as WebGL2RenderingContext | null;
  if (!gl) return noop;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, context: gl, ...attrs });
  } catch {
    return noop;
  }
  renderer.setClearColor(PALETTE.midnight, 1);

  let dead = false;
  let lost = false;
  let built = false;
  let raf = 0;
  const cleanups: Array<() => void> = [];
  const disposables: Array<{ dispose(): void }> = [];
  const on = <K extends keyof WindowEventMap>(t: K, f: (e: WindowEventMap[K]) => void, o?: AddEventListenerOptions) => {
    addEventListener(t, f, o);
    cleanups.push(() => removeEventListener(t, f, o));
  };

  // ---- live state: the class fades the canvas in over the still; the mount shows the Motion control ----
  let live = false;
  const setLive = (v: boolean) => {
    if (v === live) return;
    live = v;
    root.classList.toggle("is-live", v);
    opts.onLive?.(v);
  };

  const mqReduce = matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = matchMedia("(pointer: coarse)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const small = () => coarse || innerWidth < 700;
  const isSmall = band ? false : small(); // bands: the large grid, whose edges stay out of the band camera's view

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.5, 600);
  const target = new Vector3(...CAMERA_TARGET);

  // shared uniforms: every material references these same objects
  const U: Record<string, IUniform> = {
    uProg: { value: 0 }, uTime: { value: 0 }, uPx: { value: 1 }, uQuiet: { value: new Vector4() },
    uLantern: { value: new Vector3() }, uPathT: { value: 0 }, uFront0: { value: 0.92 }, uQuietK: { value: 1 },
    cMid: { value: rgb(PALETTE.midnight) }, cDusk: { value: rgb(PALETTE.dusk) }, cHaze: { value: rgb(PALETTE.haze) },
    cEmber: { value: rgb(PALETTE.ember) }, cMoon: { value: rgb(PALETTE.moon) }, cBlue: { value: rgb("#15254A") },
    cCream: { value: rgb(PALETTE.cream) },
    // sunrise phase (all neutral at dawn 0, so the hero phase is untouched)
    uDay: { value: 9 }, cGlow: { value: rgb("#E2A27C") }, cMorn: { value: rgb(PALETTE.morning) },
    uDawn: { value: 0 }, uLandL: { value: 0 }, uSun: { value: new Vector3(0, -999, 16) },
    cLand: { value: rgb(PALETTE.midnight) }, cSkyA: { value: rgb(PALETTE.midnight) }, cSkyB: { value: rgb(PALETTE.midnight) },
    cInk: { value: rgb(PALETTE.ink) }, cEmberInk: { value: rgb(PALETTE.emberInk) }, cSun: { value: rgb(PALETTE.sun) },
  };
  const pick = (keys: string[], extra: Record<string, IUniform> = {}) => {
    const r: Record<string, IUniform> = { ...extra };
    for (const k of keys) r[k] = U[k];
    return r;
  };
  const material = (m: ShaderMaterial) => (disposables.push(m), m);
  const geometry = <G extends BufferGeometry>(g: G) => (disposables.push(g), g);

  const view = { w: 1, h: 1, portrait: false };
  const state = {
    p: 0, pTarget: 0, d: 0, dTarget: 0, time: 0, dt: 0, level: 0,
    still: false, reduced: false, travel: 0, mx: 0, my: 0, band: false,
  };
  let motionOn = !opts.paused;
  let vh0 = innerHeight; // progress uses the height captured at load and on orientation change

  // ---- quality ----
  const detail: Array<(level: number) => void> = [];
  const applyDpr = () => {
    const cap = (small() ? 1.25 : 1.5) * (state.level >= 1 ? 0.8 : 1);
    const dpr = state.level >= 2 ? 1 : Math.min(devicePixelRatio || 1, cap);
    renderer.setPixelRatio(dpr);
    // band: point sizes follow the band camera's scale, held near the home scene's so dots and lantern stay legible
    U.uPx.value = band ? dpr * clamp(view.h / 2 / Math.tan((bandCam.fov * Math.PI) / 360) / HOME_FOCAL, 0.8, 1.2) : (dpr * view.h) / 900;
  };

  // ---- sizing: home: the canvas is 100lvh; height-only resizes on touch (the toolbar) are ignored.
  //      band: the canvas fills the header band and follows its size ----
  let viewKey = "";
  let bandCam: SceneCamera = bandCameraFor({ aspect: 1, portrait: false, stage: band?.stage ?? 1 });
  const frameView = () => {
    const cam = band ? bandCam : cameraFor({ aspect: view.w / view.h, portrait: view.portrait, progress: state.travel, dawn: state.d });
    const key = cam.viewOffset.cx + "|" + cam.viewOffset.cy + "|" + view.w + "|" + view.h;
    camera.fov = cam.fov;
    if (key !== viewKey) {
      viewKey = key;
      const { cx, cy } = cam.viewOffset;
      camera.setViewOffset(view.w, view.h, (0.5 - cx) * view.w, (0.5 - cy) * view.h, view.w, view.h);
    }
    return cam;
  };
  const resize = (force = false) => {
    const w = canvas.clientWidth || innerWidth;
    const h = canvas.clientHeight || innerHeight;
    if (!force && w === view.w && ((coarse && !band) || h === view.h)) return;
    if (w !== view.w) vh0 = innerHeight; // a width change is never the toolbar
    view.w = w;
    view.h = h;
    // band: the same rule as the still's <source media>, so live and still use the same framing
    view.portrait = band ? !matchMedia(`(min-width: ${BAND_PHONE_MAX}px)`).matches : w / h < 0.9;
    if (band) bandCam = bandCameraFor({ aspect: w / h, portrait: view.portrait, stage: band.stage });
    applyDpr();
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    viewKey = "";
    U.uFront0.value = view.portrait ? 0.78 : 0.85;
    // quiet zone in NDC where the page copy sits (x0, x1, y0, y1 ramps): desktop lower-left, phone bottom half
    if (view.portrait) (U.uQuiet.value as Vector4).set(9, 8, 0.36, -0.1);
    else (U.uQuiet.value as Vector4).set(0.2, -0.16, 0.86, 0.5);
    requestRender();
  };
  const onOrientation = () => {
    vh0 = innerHeight;
    resize(true);
    readScroll();
    requestRender();
  };

  // ---- sunrise: one sky whose colour follows dawn progress; exactly Morning from d = 0.8 ----
  const SKY: Array<[number, Vector3]> = (
    [[0, PALETTE.midnight], [0.2, "#16264D"], [0.4, "#3A5184"], [0.56, "#93A2C2"], [0.62, "#D3CBC8"], [0.68, "#E9CDA6"], [0.8, PALETTE.morning]] as const
  ).map(([t, h]) => [t, rgb(h)]);
  const skyRamp = (t: number, out: Vector3) => {
    let i = 0;
    while (i < SKY.length - 2 && t > SKY[i + 1][0]) i++;
    return out.lerpVectors(SKY[i][1], SKY[i + 1][1], clamp((t - SKY[i][0]) / (SKY[i + 1][0] - SKY[i][0]), 0, 1));
  };
  const LAND0 = rgb(PALETTE.midnight), LAND1 = rgb("#171F38"), MORN = rgb(PALETTE.morning);
  const clearCol = new Color(), clearV = new Vector3();
  const applyDawn = (d: number) => {
    U.uDawn.value = d;
    const arc = Math.sin(Math.PI * clamp(d / 0.8, 0, 1)); // 0 at both ends: opens dark, closes flat
    skyRamp(d - 0.04 * arc, U.cSkyA.value);
    skyRamp(d + 0.13 * arc, U.cSkyB.value); // the horizon runs ahead of the high sky
    const f = d > 0 ? lerp(1.45, -0.5, clamp((d - 0.52) / 0.25, 0, 1)) : 9; // daylight walks down, high ground first
    U.uDay.value = f;
    U.uLandL.value = sstep(f, f + 0.1, 0.52);
    (U.cLand.value as Vector3).lerpVectors(LAND0, LAND1, sstep(0, 0.5, d));
    clearV.copy(U.cLand.value).lerp(MORN, sstep(0.7, 0.8, d));
    renderer.setClearColor(clearCol.setRGB(clearV.x, clearV.y, clearV.z, SRGBColorSpace), 1);
  };

  // ---- scroll, visibility ----
  let onScreen = true, covered = false, bandOn = false;
  const readScroll = () => {
    if (band) return; // the band holds its framing: no scroll-linked travel
    state.pTarget = clamp(scrollY / (vh0 * 1.25), 0, 1);
    covered = scrollY > vh0 * 1.7;
    if (dawnEl) {
      // 0 as the window's top edge enters at the bottom, 1 as its bottom edge leaves at the top
      const r = dawnEl.getBoundingClientRect();
      bandOn = r.height > 0 && r.top < innerHeight && r.bottom > 0;
      state.dTarget = r.height > 0 ? clamp((vh0 - r.top) / (vh0 + r.height), 0, 1) : 0;
    }
    state.band = bandOn;
    if (covered) state.p = state.pTarget; // hero long past: path lit, lantern at the saddle
    if (!bandOn) state.d = state.dTarget; // nothing to see: no need to animate toward it
  };
  const animating = () => motionOn && !mqReduce.matches;
  const active = () => built && !dead && !lost && onScreen && (!covered || bandOn) && !document.hidden;
  const step = (v: number) => Math.round(v / PAUSED_STEP) * PAUSED_STEP;

  type Part = { update(s: typeof state): void };
  const parts: Part[] = [];

  let last = 0, firstFrame = true, slowT = 0, slowN = 0, warm = 0, skip = false;
  const frame = (now: number) => {
    raf = 0;
    if (!active()) return;
    const t0 = performance.now();
    const anim = animating();
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 0.016;
    last = now;
    state.still = !anim;
    state.reduced = mqReduce.matches;
    state.dt = dt;
    if (anim) {
      state.time += dt;
      state.p += (state.pTarget - state.p) * (1 - Math.exp(-dt * 4.5));
      if (Math.abs(state.pTarget - state.p) < 0.0004) state.p = state.pTarget;
      state.d += (state.dTarget - state.d) * (1 - Math.exp(-dt * 4.5));
      if (Math.abs(state.dTarget - state.d) < 0.0004) state.d = state.dTarget;
    } else {
      state.p = step(state.pTarget);
      state.d = state.dTarget >= 1 ? 1 : step(state.dTarget);
    }
    // when only the faint shimmer runs, draw every other frame
    const settled = state.p === state.pTarget && state.d === state.dTarget;
    skip = anim && settled && !skip;
    if (!skip || firstFrame) {
      U.uProg.value = Math.pow(state.p, 0.72); // light runs ahead of scroll so it lands before the panels cover it
      U.uTime.value = state.time;
      // phone: the quiet zone lifts as the copy leaves; band: the title sits on its own solid panel
      U.uQuietK.value = band ? 0 : view.portrait ? 1 - sstep(0.12, 0.34, state.p) : 1;
      applyDawn(state.d);
      for (const part of parts) part.update(state);
      renderer.render(scene, camera);
      if (firstFrame) {
        firstFrame = false;
        setLive(true);
      } else if (anim) sampleWork(performance.now() - t0);
    }
    if (anim) raf = requestAnimationFrame(frame);
    else last = 0;
  };
  // slow-device step-down: CPU work per frame (not frame interval, so a 30 fps cap is not a downgrade)
  const sampleWork = (ms: number) => {
    if (state.level >= 2 || ++warm <= WARM_FRAMES) return;
    slowT += ms;
    if (++slowN < SLOW_SAMPLES) return;
    if (slowT / slowN > SLOW_WORK_MS) {
      state.level++;
      applyDpr();
      renderer.setSize(view.w, view.h, false);
      detail.forEach((f) => f(state.level));
    }
    slowT = 0;
    slowN = 0;
  };
  function requestRender() {
    if (!raf && !dead) raf = requestAnimationFrame(frame);
  }

  // ---- listeners ----
  if (!band) on("scroll", () => { readScroll(); requestRender(); }, { passive: true });
  on("resize", () => resize(), { passive: true });
  if (band) {
    // the band's height also changes without a window resize (its title wraps differently once fonts load)
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    cleanups.push(() => ro.disconnect());
  }
  const onVisibility = () => { last = 0; requestRender(); };
  document.addEventListener("visibilitychange", onVisibility);
  cleanups.push(() => document.removeEventListener("visibilitychange", onVisibility));
  mqReduce.addEventListener("change", onVisibility);
  cleanups.push(() => mqReduce.removeEventListener("change", onVisibility));
  if (screen.orientation) {
    screen.orientation.addEventListener("change", onOrientation);
    cleanups.push(() => screen.orientation.removeEventListener("change", onOrientation));
  } else on("orientationchange", onOrientation);
  if (finePointer) {
    on("pointermove", (e) => { state.mx = e.clientX / innerWidth - 0.5; state.my = e.clientY / innerHeight - 0.5; }, { passive: true });
  }
  const io = new IntersectionObserver((es) => { onScreen = es[0].isIntersecting; last = 0; requestRender(); });
  io.observe(canvas);
  cleanups.push(() => io.disconnect());
  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
    cancelAnimationFrame(raf);
    raf = 0;
    setLive(false);
  };
  const onRestored = () => {
    lost = false;
    firstFrame = true;
    last = 0;
    viewKey = "";
    resize(true); // rebuild sizing; three re-uploads geometry and programs on restore
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);
  cleanups.push(() => {
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
  });

  // ---- time-sliced build ----
  let sliceStart = performance.now();
  const slice = async () => {
    if (performance.now() - sliceStart < SLICE_MS) return;
    await yieldTask();
    if (dead) throw ABORT;
    sliceStart = performance.now();
  };

  async function buildTerrain() {
    const grid = terrainGrid({ small: isSmall });
    const { rows, cols } = grid;
    const N = rows * cols;
    const raw = new Float32Array(N * 3);
    const rowsLeft = fillTerrainSamples(raw, { small: isSmall });
    while (!rowsLeft.next().done) await slice();

    // slope from the grid neighbours: the same shading as the mockup, without extra heightAt calls
    const L = new Vector3(0.62, 0.42, -0.66).normalize(); // first light: low, behind-right of the ridge
    const shadeFace = new Float32Array(N * 2);
    const Y = (i: number) => raw[i * 3 + 1];
    const X = (i: number) => raw[i * 3];
    const Zr = (i: number) => raw[i * 3 + 2];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const a = r * cols + Math.max(0, c - 1), b = r * cols + Math.min(cols - 1, c + 1);
        const gx = (Y(b) - Y(a)) / (X(b) - X(a) || 1);
        const up = Math.max(0, r - 1) * cols + c, dn = Math.min(rows - 1, r + 1) * cols + c;
        const dz = Zr(dn) - Zr(up) || -1;
        const gz = (Y(dn) - Y(up) - gx * (X(dn) - X(up))) / dz;
        const inv = 1 / Math.hypot(gx, 1, gz);
        shadeFace[i * 2] = clamp((-gx * L.x + L.y - gz * L.z) * inv, 0, 1);
        shadeFace[i * 2 + 1] = clamp(-gz * inv * 1.6 + 0.35, 0, 1); // how much the slope faces the viewer
      }
      await slice();
    }

    // shuffled so drawRange thins evenly when detail steps down
    const rnd = mulberry(78);
    const order = new Uint32Array(N);
    for (let i = 0; i < N; i++) order[i] = i;
    for (let i = N - 1; i > 0; i--) {
      const j = (rnd() * (i + 1)) | 0, t = order[i];
      order[i] = order[j];
      order[j] = t;
    }
    await slice();
    const pos = new Float32Array(N * 3), aux = new Float32Array(N * 3);
    for (let k = 0; k < N; k++) {
      const i = order[k];
      pos[k * 3] = raw[i * 3];
      pos[k * 3 + 1] = raw[i * 3 + 1];
      pos[k * 3 + 2] = raw[i * 3 + 2];
      aux[k * 3] = rnd();
      aux[k * 3 + 1] = shadeFace[i * 2];
      aux[k * 3 + 2] = shadeFace[i * 2 + 1];
      if ((k & 4095) === 0) await slice();
    }
    const geo = geometry(new BufferGeometry());
    geo.setAttribute("position", new BufferAttribute(pos, 3));
    geo.setAttribute("aAux", new BufferAttribute(aux, 3));
    const mat = material(
      new ShaderMaterial({
        uniforms: pick(
          ["uProg", "uTime", "uPx", "uQuiet", "uQuietK", "uLantern", "uFront0", "cMid", "cDusk", "cHaze", "cEmber", "cMoon",
            "uDawn", "uLandL", "cLand", "cInk", "cEmberInk", "uDay", "cGlow", "cMorn"],
          { uHmax: { value: H_MAX } },
        ),
        vertexShader: GLSL.TERRAIN_VS,
        fragmentShader: GLSL.DOT_FS,
      }),
    );
    const points = new Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);
    detail.push((level) => geo.setDrawRange(0, Math.floor(N * (level >= 2 ? 0.62 : 0.8))));

    // midnight occluder so far slopes hide behind near ones
    const X0 = isSmall ? -60 : -118, X1 = isSmall ? 52 : 92, Z0 = -104, Z1 = 24;
    const seg = isSmall ? 96 : 150;
    const og = geometry(new PlaneGeometry(X1 - X0 + 40, Z1 - Z0 + 30, seg, seg));
    og.rotateX(-Math.PI / 2);
    og.translate((X0 + X1) / 2, 0, (Z0 + Z1) / 2 - 5);
    const op = og.attributes.position;
    for (let i = 0; i < op.count; i++) {
      op.setY(i, heightAt(op.getX(i), op.getZ(i)) - 0.3);
      if ((i & 511) === 0) await slice();
    }
    const occ = new Mesh(
      og,
      material(
        new ShaderMaterial({
          uniforms: pick(["cLand", "uDay", "cGlow", "cMorn"], { uHmax: { value: H_MAX } }),
          vertexShader: GLSL.OCCLUDER_VS,
          fragmentShader: GLSL.OCCLUDER_FS,
        }),
      ),
    );
    occ.frustumCulled = false;
    scene.add(occ);

    parts.push({
      update(s) {
        if (s.reduced) s.travel = 0;
        else if (!s.still) s.travel = s.p; // paused: hold; reduced motion: no camera travel
        const cam = frameView();
        const par = s.still ? 0 : 1;
        // band: a slow ambient sway that holds where it is while paused (time only runs while animating)
        const sway = band && !s.reduced ? 1 : 0;
        camera.position.set(
          cam.position[0] + par * s.mx * 0.8 + sway * Math.sin(s.time * 0.09) * 1.1,
          cam.position[1] - par * s.my * 0.4 + sway * Math.sin(s.time * 0.063 + 1) * 0.35,
          cam.position[2],
        );
        camera.lookAt(target.set(...cam.target));
        camera.updateProjectionMatrix();
      },
    });
  }

  const lantern = { t: 0, u: 0, pos: new Vector3() };
  const elev = (y: number) => Math.round((860 + (y - 0.32) * 44) / 2) * 2; // scene units -> metres
  function buildPath() {
    const n = isSmall ? 300 : 460;
    const pts = trailPoints(n);
    const pos = new Float32Array(n * 3), aT = new Float32Array(n);
    pts.forEach((p, i) => { pos.set(p, i * 3); aT[i] = i / (n - 1); });
    const geo = geometry(new BufferGeometry());
    geo.setAttribute("position", new BufferAttribute(pos, 3));
    geo.setAttribute("aT", new BufferAttribute(aT, 1));
    const path = new Points(
      geo,
      material(
        new ShaderMaterial({
          uniforms: pick(["uPx", "uPathT", "uQuiet", "uQuietK", "cEmber", "cDusk", "uDawn", "uLandL", "cLand", "cEmberInk"]),
          vertexShader: GLSL.PATH_VS,
          fragmentShader: GLSL.DOT_FS,
        }),
      ),
    );
    path.frustumCulled = false;
    scene.add(path);

    const track = trailPoints(1201); // evenly spaced by arclength: index = t * 1200
    const at = (t: number, out: Vector3) => {
      const f = clamp(t, 0, 1) * (track.length - 1), i = Math.min(track.length - 2, Math.floor(f)), k = f - i;
      const a = track[i], b = track[i + 1];
      return out.set(lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k));
    };
    const lgeo = geometry(new BufferGeometry());
    lgeo.setAttribute("position", new BufferAttribute(new Float32Array(3), 3));
    const lmat = material(
      new ShaderMaterial({
        uniforms: pick(["uPx", "cEmber", "cMoon", "cCream", "cMid", "uLandL", "cEmberInk"], { uPulse: { value: 1 } }),
        vertexShader: GLSL.LANTERN_VS,
        fragmentShader: GLSL.LANTERN_FS,
        depthTest: false,
      }),
    );
    const lamp = new Points(lgeo, lmat);
    lamp.frustumCulled = false;
    lamp.renderOrder = 5;
    scene.add(lamp);

    parts.push({
      update(s) {
        // already on the trail at the top; reaches the saddle before the panels cover it
        // band: the lantern rests at the stage's waypoint
        const u = clamp(s.p / 0.7, 0, 1), t = band ? BAND_STAGE_T[band.stage] : lerp(view.portrait ? 0.6 : 0.13, 1, u);
        lantern.u = u;
        lantern.t = t;
        at(t, lantern.pos);
        U.uPathT.value = t;
        (U.uLantern.value as Vector3).copy(lantern.pos);
        lamp.position.copy(lantern.pos);
        lamp.position.y += 0.35;
        lmat.uniforms.uPulse.value = s.still ? 1 : 1 + 0.07 * Math.sin(s.time * 1.5);
      },
    });
  }

  function buildSky() {
    const n = isSmall ? 190 : 420, pos = new Float32Array(n * 3), seed = new Float32Array(n), rnd = mulberry(911);
    for (let i = 0; i < n; i++) {
      const az = (rnd() - 0.5) * 2.5, el = 0.06 + Math.pow(rnd(), 1.4) * 1.0, R = 420;
      pos.set([Math.sin(az) * Math.cos(el) * R, Math.sin(el) * R, -Math.cos(az) * Math.cos(el) * R], i * 3);
      seed[i] = rnd();
    }
    const geo = geometry(new BufferGeometry());
    geo.setAttribute("position", new BufferAttribute(pos, 3));
    geo.setAttribute("aSeed", new BufferAttribute(seed, 1));
    const stars = new Points(
      geo,
      material(
        new ShaderMaterial({
          uniforms: pick(["uProg", "uTime", "uPx", "uQuiet", "uQuietK", "cMid", "cHaze", "cCream", "uDawn"]),
          vertexShader: GLSL.STARS_VS,
          fragmentShader: GLSL.DOT_FS,
          depthWrite: false,
        }),
      ),
    );
    stars.frustumCulled = false;
    stars.renderOrder = -1;
    scene.add(stars);

    const LINE_Y = SKY_LINE_Y; // just above the saddle floor as seen from the camera
    const sky = new Mesh(
      geometry(new PlaneGeometry(2400, 700)),
      material(
        new ShaderMaterial({
          uniforms: pick(
            ["uProg", "cMid", "cBlue", "cEmber", "cMoon", "uDawn", "uSun", "cLand", "cSkyA", "cSkyB", "cEmberInk", "cSun", "uDay", "cGlow", "cMorn"],
            { uLineY: { value: LINE_Y } },
          ),
          vertexShader: GLSL.SKY_VS,
          fragmentShader: GLSL.SKY_FS,
          depthWrite: false,
        }),
      ),
    );
    sky.position.set(0, 200, SKY_Z);
    sky.renderOrder = -2;
    sky.frustumCulled = false;
    scene.add(sky);
    const R = SUN_R;
    parts.push({
      update(s) {
        const sun = U.uSun.value as Vector3;
        if (s.d <= 0) {
          sun.set(0, -999, R);
          return;
        }
        if (band) {
          // band: a fixed point in the sky, shared with the stills (terrain.ts)
          const b = bandSun(view.portrait, band.stage, band.time);
          if (b) sun.set(b[0], b[1], R);
          else sun.set(0, -999, R);
          return;
        }
        const e = camera.position, k = (-440 - e.z) / (CAMERA_TARGET[2] - e.z), rise = (s.d - 0.25) / 0.4;
        sun.set(e.x + (CAMERA_TARGET[0] + 1.2 - e.x) * k + 6 * rise, LINE_Y - R - 3 + clamp(rise, 0, 2) * (2 * R + 12), R);
      },
    });
  }

  // readouts in #scene-ui: true scene values only (stage, lantern elevation, clock) and the saddle bracket
  function buildReadouts() {
    if (!ui) return;
    const el = (tag: string, css: string, text?: string) => {
      const e = document.createElement(tag);
      e.style.cssText = css;
      if (text) e.textContent = text;
      return e;
    };
    const CHIP = "color-mix(in srgb,var(--midnight) 80%,transparent)";
    const FONT =
      "font:500 0.65625rem/1.5 var(--font-martian),ui-monospace,Menlo,monospace;letter-spacing:.09em;text-transform:uppercase;color:var(--haze);font-variant-numeric:tabular-nums;";
    const narrow = innerWidth < 900; // phones: one strip under the header; desktop: a small block top-right
    const box = el(
      "div",
      FONT + "position:absolute;box-sizing:border-box;transition:opacity .25s ease;background:" + CHIP + ";" +
        (narrow
          ? "top:calc(env(safe-area-inset-top,0px) + var(--scene-ui-top,62px));left:0;right:0;padding:6px max(16px,env(safe-area-inset-right,0px)) 0 max(16px,env(safe-area-inset-left,0px));display:flex;flex-wrap:wrap;justify-content:space-between;gap:0 10px"
          : "top:calc(env(safe-area-inset-top,0px) + var(--scene-ui-top,80px));right:max(6px,env(safe-area-inset-right,0px));width:168px;padding:8px 10px"),
    );
    const row = (label: string): [HTMLElement, HTMLElement] => {
      const r = el("div", "display:flex;justify-content:space-between;gap:8px;white-space:nowrap");
      r.append(el("span", "", label));
      const v = el("span", "color:var(--cream)");
      r.append(v);
      return [r, v];
    };
    const stage = el("div", "color:var(--ember);white-space:nowrap" + (narrow ? "" : ";margin-bottom:7px"));
    const PCT = (a: number) => "color-mix(in srgb,var(--haze) " + a + "%,transparent)";
    const ruler = el(
      "div",
      "position:relative;height:9px;border-bottom:1px solid " + PCT(55) + ";border-right:1px solid " + PCT(90) + ";" +
        (narrow ? "flex:0 0 100%;order:9;margin-top:5px;" : "margin-bottom:8px;") +
        "background:repeating-linear-gradient(90deg," + PCT(50) + " 0 1px,transparent 1px 8.3333%) left bottom/100% 4px no-repeat," +
        "repeating-linear-gradient(90deg," + PCT(90) + " 0 1px,transparent 1px 25%) left bottom/100% 9px no-repeat",
    );
    const mark = el("div", "position:absolute;left:0;bottom:-1px;width:2px;height:13px;background:var(--ember);margin-left:-1px");
    ruler.append(mark);
    const [rElev, vElev] = row("Elev"), [rTime, vTime] = row(narrow ? "" : "Local");
    if (narrow) box.append(stage, rElev, rTime, ruler);
    else box.append(stage, ruler, rElev, rTime);

    const tag = el("div", FONT + "position:absolute;left:0;top:0;width:0;height:0;font-size:0.59375rem;will-change:transform;transition:opacity .25s ease");
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    for (const [k, v] of Object.entries({
      width: "80", height: "48", viewBox: "-13 -35 80 48", fill: "none", stroke: "var(--cream)", "stroke-opacity": ".85", "stroke-width": "1",
      style: "position:absolute;left:-13px;top:-35px;overflow:visible",
    })) svg.setAttribute(k, v);
    const bracket = document.createElementNS(NS, "path");
    bracket.setAttribute("d", "M-12-7v-5h5M7-12h5v5M12 7v5h-5M-7 12h-5v-5M12-12l14-14h22");
    svg.append(bracket);
    const fmt = (m: number) => m.toLocaleString("en-US") + " m";
    const tagText = el("span", "position:absolute;left:51px;top:-34px;padding:1px 4px;white-space:nowrap;color:var(--cream);background:" + CHIP,
      narrow ? "Saddle" : "Saddle " + fmt(elev(SADDLE.y)));
    tag.append(svg, tagText);
    ui.replaceChildren(box, tag);

    const sp = new Vector3();
    const SAD_Y = SADDLE.y - 0.32 + 1.6;
    let lastKey = "", lastMode = -1, tagKey = "";
    parts.push({
      update(s) {
        const t = lantern.u, st = s.band ? 4 : Math.min(4, 1 + Math.floor(t * 4));
        const dawn = s.band || s.d > 0;
        const mins = Math.round(lerp(280, 370, s.p) + (dawn ? 30 * s.d : 0)); // 04:40 -> 06:10, then -> 06:40
        const key = st + "|" + elev(lantern.pos.y) + "|" + mins + "|" + Math.round(t * 400);
        if (key !== lastKey) {
          lastKey = key;
          stage.textContent = "Stage 0" + st + " / 04";
          vElev.textContent = fmt(elev(lantern.pos.y));
          vTime.textContent = String(Math.floor(mins / 60)).padStart(2, "0") + ":" + String(mins % 60).padStart(2, "0");
          mark.style.left = (t * 100).toFixed(2) + "%";
        }
        const mode = (dawn ? 1 : 0) + (s.d > 0.595 ? 2 : 0); // solid chip over the sunrise, ink bracket once the sky is light
        if (mode !== lastMode) {
          lastMode = mode;
          box.style.background = dawn ? "var(--midnight)" : CHIP;
          tagText.style.background = dawn ? "var(--midnight)" : CHIP;
          svg.setAttribute("stroke", mode & 2 ? "var(--ink)" : "var(--cream)");
        }
        // the bracket leaves before the window's lower edge reaches it; short phones: the hero copy covers the saddle
        const tf = s.d > (narrow ? 0.6 : 0.65) || (narrow && !dawn && view.h < 700) ? "0" : "1";
        if (tag.style.opacity !== tf) tag.style.opacity = tf;
        const bo = dawn ? (s.d > 0.8 ? "0" : "1") : !narrow || s.p < 0.1 ? "1" : s.p > 0.16 ? "0" : (1 - (s.p - 0.1) / 0.06).toFixed(2);
        if (box.style.opacity !== bo) box.style.opacity = bo;
        camera.updateMatrixWorld();
        sp.set(SADDLE.x, SAD_Y, RIDGE_Z).project(camera);
        const tk = ((sp.x * 0.5 + 0.5) * view.w).toFixed(1) + "px," + ((0.5 - sp.y * 0.5) * view.h).toFixed(1) + "px";
        if (tk !== tagKey) {
          tagKey = tk;
          tag.style.transform = "translate(" + tk + ")";
        }
      },
    });
  }

  const build = async () => {
    try {
      if (band) {
        state.pTarget = BAND_LIGHT[band.time].p;
        state.dTarget = BAND_LIGHT[band.time].d;
      }
      readScroll();
      state.p = state.pTarget;
      state.d = state.dTarget;
      state.travel = mqReduce.matches ? 0 : state.p;
      resize(true);
      await buildTerrain(); // camera part first: later parts read the camera
      await slice();
      buildPath();
      await slice();
      buildSky();
      buildReadouts();
      await slice();
      const cam = frameView();
      camera.position.set(...cam.position);
      camera.lookAt(target.set(...cam.target));
      camera.updateProjectionMatrix();
      // compile off the main thread where the driver allows it; otherwise one program per slice
      if (renderer.extensions.has("KHR_parallel_shader_compile")) await renderer.compileAsync(scene, camera);
      else {
        for (const object of [...scene.children]) {
          await yieldTask();
          if (dead) return;
          renderer.compile(object, camera, scene);
        }
      }
      if (dead) return;
      built = true;
      requestRender();
    } catch (err) {
      if (err === ABORT || dead) return;
      teardown();
    }
  };

  function teardown() {
    if (dead) return;
    dead = true;
    cancelAnimationFrame(raf);
    raf = 0;
    for (const f of cleanups.splice(0)) f();
    for (const d of disposables.splice(0)) d.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    ui?.replaceChildren();
    setLive(false);
  }

  void build();

  return {
    destroy() {
      teardown();
    },
    setPaused(paused: boolean) {
      motionOn = !paused;
      last = 0;
      requestRender();
    },
  };
}
