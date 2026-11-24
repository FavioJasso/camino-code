// GLSL for the First Light scene, ported from the approved mockup (first-light-sunrise/parts/04-scene.js).
// Written in GLSL ES 1 style; three.js maps attribute/varying/gl_FragColor onto WebGL 2.

/** Quiet zone: thins and darkens the cloud where the page copy sits. */
const QUIET_GLSL = /* glsl */ `
  float ramp(float a, float b, float x){ return clamp((x - a) / (b - a), 0.0, 1.0); }
  uniform float uQuietK;
  float quietAt(vec4 clip, vec4 q){ vec2 n = clip.xy / clip.w; return uQuietK * ramp(q.x, q.y, n.x) * ramp(q.z, q.w, n.y); }`;

/** Sunrise daylight front: the height it has reached, its thin warm edge, the lit ground. */
const DAY_GLSL = /* glsl */ `
  uniform float uDay; uniform vec3 cLand, cGlow, cMorn;
  float dayH(vec3 p, float hmax){ return min(p.y / hmax, 1.0) + p.x * 0.0025 + 0.035 * sin(p.x * 0.11 + p.z * 0.17); }
  float dayAt(float hx){ return smoothstep(uDay, uDay + 0.10, hx); }
  vec3 landAt(float k){ return mix(mix(cLand, cGlow, smoothstep(0.42, 0.5, k)), cMorn, smoothstep(0.5, 0.64, k)); }`;

/** Round crisp dot. */
export const DOT_FS = /* glsl */ `
  varying vec3 vCol;
  void main(){ vec2 c = gl_PointCoord - 0.5; if (dot(c, c) > 0.25) discard; gl_FragColor = vec4(vCol, 1.0); }`;

export const TERRAIN_VS = /* glsl */ `
  attribute vec3 aAux;
  uniform float uProg, uTime, uPx, uHmax, uFront0, uDawn, uLandL; uniform vec4 uQuiet;
  uniform vec3 uLantern, cMid, cDusk, cHaze, cEmber, cMoon, cInk, cEmberInk;
  varying vec3 vCol;
  ${QUIET_GLSL}
  ${DAY_GLSL}
  void main(){
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    // heightAt overshoots H_MAX on the far-left shoulder: clamp so colour never saturates there
    float d = -mv.z, hn = min(position.y / uHmax, 1.0), seed = aAux.x, shade = aAux.y, face = aAux.z;
    float q = quietAt(gl_Position, uQuiet) * (1.0 - smoothstep(0.0, 0.3, uDawn));
    // measured-data look: cool points, brighter with height and where the slope faces us
    float b = (0.20 + 0.80 * smoothstep(0.0, 0.72, hn)) * (0.55 + 0.45 * face);
    vec3 col = mix(cDusk * 1.75, cHaze, b);
    // first light: a warm front that starts on the highest ground and walks down-slope with progress
    float front = mix(uFront0, 0.10, uProg), hx = hn + position.x * 0.004;
    float lit = smoothstep(front, front + 0.10, hx + (seed - 0.5) * 0.05) * (0.5 + 0.5 * smoothstep(0.05, 0.6, shade)) * (1.0 - 0.85 * q);
    vec3 warm = mix(cEmber, cMoon, smoothstep(0.0, 0.55, hx - front));
    col = mix(col, warm, lit * 0.92);
    // the lantern lights the ground right around it
    float ld = distance(position, uLantern);
    col = mix(col, cEmber, (1.0 - smoothstep(1.5, 7.0, ld)) * 0.85);
    // sunrise: each point flips once to ink as the land takes the morning; high sun-facing ground stays warm
    float k = dayAt(dayH(position, uHmax) + (fract(seed * 7.31) - 0.5) * 0.07), flip = smoothstep(0.35, 0.6, k);
    float sun = smoothstep(0.40, 0.78, hx) * (0.3 + 0.7 * smoothstep(0.05, 0.6, shade));
    vec3 day = mix(mix(cMorn, cInk, 0.62 + 0.38 * b), mix(cEmberInk, cEmber, 0.55 + 0.45 * smoothstep(0.6, 0.95, hx)), sun * 0.95);
    day = mix(day, cEmberInk, (1.0 - smoothstep(1.5, 7.0, ld)) * 0.85);
    col = mix(col, day, flip);
    col *= 1.0 + 0.07 * sin(uTime * 1.1 + seed * 60.0) * (1.0 - flip);
    float fog = smoothstep(95.0, 230.0, d);
    col = mix(col, landAt(k), min(1.0, fog * mix(0.6, 0.35, flip) + q * 0.8));
    vCol = col;
    gl_PointSize = clamp(uPx * 100.0 / d, 1.3, 2.8 * uPx) * (0.8 + 0.4 * seed) * (1.0 + 0.3 * lit * (1.0 - flip)) * (1.0 + 0.22 * flip);
    if (seed < q * 0.78) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
  }`;

/** Midnight occluder under the points, so far slopes hide behind near ones. */
export const OCCLUDER_VS = /* glsl */ `
  varying vec3 vP;
  void main(){ vP = position + vec3(0.0, 0.3, 0.0); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

export const OCCLUDER_FS = /* glsl */ `
  ${DAY_GLSL}
  uniform float uHmax; varying vec3 vP;
  void main(){ gl_FragColor = vec4(landAt(dayAt(dayH(vP, uHmax))), 1.0); }`;

export const PATH_VS = /* glsl */ `
  attribute float aT;
  uniform float uPx, uPathT, uDawn, uLandL; uniform vec4 uQuiet; uniform vec3 cEmber, cDusk, cLand, cEmberInk;
  varying vec3 vCol;
  ${QUIET_GLSL}
  void main(){
    vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; float d = -mv.z;
    float lit = step(aT, uPathT);
    vec3 ahead = mix(cDusk * 1.5, cEmber, 0.58);
    vec3 walked = mix(cEmber, cEmberInk, uLandL * 0.8);
    vCol = mix(mix(ahead, walked, lit), cLand, 0.72 * quietAt(gl_Position, uQuiet) * (1.0 - smoothstep(0.0, 0.3, uDawn)));
    gl_PointSize = clamp(uPx * 190.0 / d, 2.3 * uPx, 4.4 * uPx) * mix(0.8, 1.0, lit);
  }`;

export const LANTERN_VS = /* glsl */ `
  uniform float uPx, uPulse;
  void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(uPx * 900.0 / -mv.z, 15.0 * uPx, 24.0 * uPx) * uPulse; }`;

/** Crisp core, dark gap, thin ring: no glow. */
export const LANTERN_FS = /* glsl */ `
  uniform vec3 cEmber, cMoon, cCream, cMid, cEmberInk; uniform float uLandL;
  void main(){ float r = length(gl_PointCoord - 0.5) * 2.0;
    if (r < 0.36) gl_FragColor = vec4(mix(cCream, cMoon, 0.55), 1.0);
    else if (r < 0.56) gl_FragColor = vec4(cMid, 1.0);
    else if (r > 0.80 && r < 0.97) gl_FragColor = vec4(mix(cEmber, cEmberInk, uLandL), 1.0);
    else discard; }`;

export const STARS_VS = /* glsl */ `
  attribute float aSeed;
  uniform float uProg, uTime, uPx, uDawn; uniform vec4 uQuiet; uniform vec3 cMid, cHaze, cCream;
  varying vec3 vCol;
  ${QUIET_GLSL}
  void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    float mag = aSeed * aSeed;
    float gone = max(smoothstep(0.12 + mag * 0.6, 0.45 + mag * 0.6, uProg), smoothstep(0.01, 0.07 + 0.1 * mag, uDawn));
    float b = (0.22 + 0.78 * mag) * (1.0 - gone) * (1.0 + 0.10 * sin(uTime * 0.9 + aSeed * 90.0));
    vCol = mix(cMid, mix(cHaze, cCream, mag), b * (1.0 - quietAt(gl_Position, uQuiet)));
    gl_PointSize = (1.2 + 1.5 * mag) * max(uPx, 1.0);
    if (gone > 0.98) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
  }`;

export const SKY_VS = /* glsl */ `
  varying float vY; varying float vX;
  void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vY = w.y; vX = w.x; gl_Position = projectionMatrix * viewMatrix * w; }`;

export const SKY_FS = /* glsl */ `
  uniform float uProg, uLineY, uDawn; uniform vec3 cMid, cBlue, cEmber, cMoon, uSun, cSkyA, cSkyB, cEmberInk, cSun;
  varying float vY; varying float vX;
  ${DAY_GLSL}
  void main(){
    float up = vY - uLineY;
    float lift = uProg * (up > 0.0 ? exp(-up / 62.0) : 0.5 * exp(up / 30.0));
    vec3 col = mix(cMid, cBlue, lift * 0.85);
    float w = max(fwidth(vY) * 0.75, 0.3);
    float line = (1.0 - smoothstep(w * 0.6, w, abs(up))) * smoothstep(0.12, 0.6, uProg);
    vec3 lineCol = mix(cEmber, cMoon, smoothstep(0.5, 1.0, uProg));
    if (uDawn > 0.0) {
      // one sky, high sky to horizon, no bands; below the horizon line it is land
      float far = dayAt(0.9);
      vec3 day = up > 0.0 ? mix(cSkyB, cSkyA, 1.0 - exp(-up / 85.0)) : landAt(far);
      col = mix(col, day, smoothstep(0.0, 0.1, uDawn));
      // the sun: a flat crisp disc with one thin ring
      float sd = length(vec2(vX, vY) - uSun.xy) - uSun.z;
      float px = fwidth(vY), disc = 1.0 - smoothstep(-0.5 * px, 0.5 * px, sd);
      float ring = 1.0 - smoothstep(0.5 * px, 1.3 * px, abs(sd - 7.0 * px));
      col = mix(col, cSun, max(disc, ring * 0.9) * step(0.0, up));
      lineCol = mix(lineCol, cEmberInk, far);
    }
    col = mix(col, lineCol, line);
    gl_FragColor = vec4(col, 1.0);
  }`;
