import { describe, expect, it } from 'vitest';
import { sceneFrame, skyOf, toHex, type FrameSpec } from './frame';
import { PALETTE, SADDLE, projectToSvg, terrainGrid, trailAt } from './terrain';

// The frames the home stills are drawn from: the page top on a 1440 x 900 desktop and a 390 x 844 phone.
const DESKTOP: FrameSpec = { w: 1440, h: 900, portrait: false, narrow: false, small: false, p: 0, d: 0, dpr: 1 };
const PHONE: FrameSpec = { w: 390, h: 844, portrait: true, narrow: true, small: true, p: 0, d: 0, dpr: 1.25 };

describe('scene frame (the live scene without WebGL)', () => {
  const desktop = sceneFrame(DESKTOP);
  const phone = sceneFrame(PHONE);

  it('covers every point of the live cloud, and hides the ground behind the ridge', () => {
    for (const [fr, small] of [[desktop, false], [phone, true]] as const) {
      const { rows, cols } = terrainGrid({ small });
      const T = fr.terrain;
      expect(T.x.length).toBe(rows * cols);
      const hidden = T.hidden.reduce((a, b) => a + b, 0);
      expect(hidden).toBeGreaterThan(rows * cols * 0.1);
      expect(hidden).toBeLessThan(rows * cols * 0.6);
      // the far rows sit behind the crest: nothing of the last row shows inside the frame
      let shown = 0;
      for (let i = (rows - 1) * cols; i < rows * cols; i++) if (!T.hidden[i] && T.x[i] >= 0 && T.x[i] <= fr.spec.w) shown++;
      expect(shown).toBe(0);
    }
  });

  it('starts the lantern on the trail where the live scene does, not at the saddle', () => {
    for (const [fr, t] of [[desktop, 0.13], [phone, 0.6]] as const) {
      const at = trailAt(t);
      const p = projectToSvg([at[0], at[1] + 0.35, at[2]], fr.cam, fr.spec.w, fr.spec.h)!;
      expect(fr.lantern!.x).toBeCloseTo(p[0], 3);
      expect(fr.lantern!.y).toBeCloseTo(p[1], 3);
      const saddle = projectToSvg([SADDLE.x, SADDLE.y, SADDLE.z], fr.cam, fr.spec.w, fr.spec.h)!;
      expect(Math.hypot(fr.lantern!.x - saddle[0], fr.lantern!.y - saddle[1])).toBeGreaterThan(60);
    }
    // the shader's lantern is 24 px across on a 900 px canvas at this distance
    expect(desktop.lantern!.r).toBeCloseTo(12, 5);
    expect(toHex(desktop.lantern!.ring)).toBe(PALETTE.ember.toLowerCase());
  });

  it('lights the walked trail in Ember and leaves the route ahead dim', () => {
    const walked = desktop.trail.filter((d) => toHex(d.col) === PALETTE.ember.toLowerCase());
    expect(walked.length).toBeGreaterThan(20);
    expect(walked.length).toBeLessThan(desktop.trail.length * 0.3);
    // walked dots are the near, large ones
    expect(Math.min(...walked.map((d) => d.size))).toBeGreaterThan(4);
    expect(Math.min(...desktop.trail.map((d) => d.size))).toBeLessThan(2);
  });

  it('keeps first light to the highest ground at the top of the page', () => {
    const T = desktop.terrain;
    let warm = 0;
    let lowWarm = 0;
    for (let i = 0; i < T.warm.length; i++) {
      if (T.hidden[i] || T.warm[i] < 0.14) continue;
      warm++;
      if (T.y[i] > 450) lowWarm++; // lower half of the frame
    }
    expect(warm).toBeGreaterThan(20);
    expect(warm).toBeLessThan(T.warm.length * 0.01);
    expect(lowWarm).toBe(0);
  });

  it('quiets the cloud where the page copy sits: lower left on desktop, lower half on phones', () => {
    const quietShare = (fr: typeof desktop, inZone: (x: number, y: number) => boolean) => {
      const T = fr.terrain;
      let n = 0;
      let culled = 0;
      for (let i = 0; i < T.x.length; i++) {
        if (T.hidden[i] || !inZone(T.x[i], T.y[i])) continue;
        n++;
        culled += T.culled[i];
      }
      return culled / n;
    };
    // the shader drops 78 percent of the points at full strength
    expect(quietShare(desktop, (x, y) => x > 0 && x < 500 && y > 300 && y < 900)).toBeGreaterThan(0.7);
    expect(quietShare(desktop, (x, y) => x > 900 && x < 1440 && y > 0 && y < 900)).toBe(0);
    expect(quietShare(phone, (x, y) => x > 0 && x < 390 && y > 500 && y < 844)).toBeGreaterThan(0.7);
    expect(quietShare(phone, (x, y) => x > 0 && x < 390 && y > 0 && y < 250)).toBe(0);
  });

  it('shows stars only in the sky', () => {
    expect(desktop.stars.length).toBeGreaterThan(10);
    for (const s of desktop.stars) expect(s.y).toBeLessThanOrEqual(desktop.skyline[Math.round(s.x)] ?? Infinity);
  });

  it('has no sun before sunrise, and a sun on the horizon line at the caption hour', () => {
    expect(desktop.sky.sun).toBeNull();
    // 06:24 on the scene clock, hero long past: the disc straddles the line, most of it above
    const sky = skyOf({ ...DESKTOP, p: 1, d: 14 / 30 });
    expect(sky.sun).not.toBeNull();
    expect(sky.sun!.r).toBeGreaterThan(38);
    expect(sky.sun!.r).toBeLessThan(46);
    expect(sky.sun!.y).toBeLessThan(sky.lineY);
    expect(sky.sun!.y + sky.sun!.r).toBeGreaterThan(sky.lineY);
  });
});
