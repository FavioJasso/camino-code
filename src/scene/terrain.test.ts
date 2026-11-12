import { describe, expect, it } from 'vitest';
import {
  BAND_HFOV_MAX,
  BAND_LIGHT,
  bandLayoutFor,
  terrainGrid,
  BAND_REF,
  BAND_STAGE_T,
  CAMERA_TARGET,
  H_MAX,
  SADDLE,
  SKY_LINE_Y,
  SUN_R,
  bandCameraFor,
  bandSun,
  cameraFor,
  heightAt,
  projectToSvg,
  terrainSamples,
  trailAt,
  trailPoints,
  type BandStage,
} from './terrain';

describe('terrain', () => {
  it('heightAt is deterministic', () => {
    expect(heightAt(12.3, -45.6)).toBe(heightAt(12.3, -45.6));
  });

  it('heightAt stays within [0, H_MAX] across the framed terrain', () => {
    // The verbatim mockup field can overshoot H_MAX on the far-left shoulder (x < -45);
    // H_MAX is only a shading normaliser, so the bound is checked where the camera frames the ridge.
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        const h = heightAt(-40 + (i / 49) * 80, -104 + (j / 49) * 128);
        expect(h).toBeGreaterThanOrEqual(0);
        expect(h).toBeLessThanOrEqual(H_MAX);
      }
    }
  });

  it('trailPoints ends at the saddle', () => {
    const pts = trailPoints(300);
    expect(pts).toHaveLength(300);
    const last = pts[pts.length - 1];
    expect(Math.hypot(last[0] - SADDLE.x, last[1] - SADDLE.y, last[2] - SADDLE.z)).toBeLessThan(0.5);
  });

  it('terrainSamples(small) has about 25k points and large 60k-90k', () => {
    const small = terrainSamples({ small: true }).length / 3;
    const large = terrainSamples({ small: false }).length / 3;
    expect(small).toBeGreaterThan(22_000);
    expect(small).toBeLessThan(28_000);
    expect(large).toBeGreaterThanOrEqual(60_000);
    expect(large).toBeLessThanOrEqual(90_000);
  });

  it('projectToSvg puts the saddle near the design composition', () => {
    const w = 1440;
    const h = 900;
    const cam = cameraFor({ aspect: w / h, portrait: false, progress: 0, dawn: 0 });
    const p = projectToSvg([SADDLE.x, SADDLE.y, SADDLE.z], cam, w, h);
    expect(p).not.toBeNull();
    expect(Math.abs(p![0] / w - 0.66)).toBeLessThan(0.05);
    expect(Math.abs(p![1] / h - 0.4)).toBeLessThan(0.08);
    const t = projectToSvg([...CAMERA_TARGET], cam, w, h)!;
    expect(t[0] / w).toBeCloseTo(0.68, 2);
    expect(t[1] / h).toBeCloseTo(0.4, 2);
  });

  it('phone composition puts the saddle near 0.58 across and 0.24-0.28 down', () => {
    const w = 390;
    const h = 844;
    const cam = cameraFor({ aspect: w / h, portrait: true, progress: 0, dawn: 0 });
    const p = projectToSvg([SADDLE.x, SADDLE.y, SADDLE.z], cam, w, h)!;
    expect(Math.abs(p[0] / w - 0.58)).toBeLessThan(0.03);
    expect(p[1] / h).toBeGreaterThan(0.22);
    expect(p[1] / h).toBeLessThan(0.3);
  });

  it('projectToSvg returns null for points behind the camera', () => {
    const cam = cameraFor({ aspect: 1.6, portrait: false, progress: 0, dawn: 0 });
    expect(projectToSvg([7, 7.5, 200], cam, 1440, 900)).toBeNull();
  });
  it('trailAt runs from the trail start to the saddle', () => {
    expect(trailAt(0)).toEqual(trailPoints(2)[0]);
    const end = trailAt(1);
    expect(end[0]).toBeCloseTo(SADDLE.x, 5);
    expect(end[2]).toBeCloseTo(SADDLE.z, 5);
  });

  describe('header band camera', () => {
    // Band and title-panel rects (px, relative to the band) measured in the built site with the real
    // inner.css, at each width, for every page that runs a live band. The Motion control is 153 x 44 px,
    // 12 px in from the band's top-right corner.
    type Rect = [number, number, number, number];
    const PAGES: Array<{ w: number; h: number; stage: BandStage; panel: Rect; page: string }> = [
      { w: 320, h: 250, stage: 1, panel: [16, 68, 304, 218], page: '/services/data' },
      { w: 320, h: 279, stage: 1, panel: [16, 68, 304, 247], page: '/services/software' },
      { w: 320, h: 208, stage: 2, panel: [16, 113, 136, 176], page: '/work' },
      { w: 320, h: 279, stage: 2, panel: [16, 68, 304, 247], page: '/work/transparent-energy' },
      { w: 320, h: 208, stage: 3, panel: [16, 85, 269, 176], page: '/approach' },
      { w: 320, h: 220, stage: 4, panel: [16, 68, 304, 188], page: '/about' },
      { w: 320, h: 250, stage: 4, panel: [16, 68, 304, 218], page: '/discovery' },
      { w: 390, h: 250, stage: 1, panel: [16, 68, 374, 218], page: '/services/data' },
      { w: 390, h: 208, stage: 2, panel: [16, 113, 136, 176], page: '/work' },
      { w: 390, h: 279, stage: 2, panel: [16, 68, 374, 247], page: '/work/transparent-energy' },
      { w: 390, h: 208, stage: 3, panel: [16, 85, 269, 176], page: '/approach' },
      { w: 390, h: 208, stage: 4, panel: [16, 85, 372, 176], page: '/about' },
      { w: 390, h: 220, stage: 4, panel: [16, 68, 374, 188], page: '/discovery' },
      { w: 768, h: 236, stage: 1, panel: [16, 68, 720, 204], page: '/services/data' },
      { w: 768, h: 208, stage: 2, panel: [16, 100, 156, 176], page: '/work' },
      { w: 768, h: 236, stage: 2, panel: [16, 68, 720, 204], page: '/work/transparent-energy' },
      { w: 768, h: 208, stage: 3, panel: [16, 72, 302, 176], page: '/approach' },
      { w: 768, h: 208, stage: 4, panel: [16, 72, 415, 176], page: '/about' },
      { w: 768, h: 208, stage: 4, panel: [16, 72, 506, 176], page: '/discovery' },
      { w: 1024, h: 266, stage: 1, panel: [16, 77, 720, 234], page: '/services/data' },
      { w: 1024, h: 266, stage: 2, panel: [16, 77, 720, 234], page: '/work/transparent-energy' },
      { w: 1024, h: 266, stage: 3, panel: [16, 120, 381, 234], page: '/approach' },
      { w: 1024, h: 266, stage: 4, panel: [16, 120, 531, 234], page: '/about' },
      { w: 1024, h: 266, stage: 4, panel: [16, 120, 653, 234], page: '/discovery' },
      { w: 1440, h: 323, stage: 1, panel: [146, 68, 850, 291], page: '/services/data' },
      { w: 1440, h: 304, stage: 1, panel: [146, 100, 850, 272], page: '/services/software' },
      { w: 1440, h: 323, stage: 2, panel: [146, 68, 850, 291], page: '/work/transparent-energy' },
      { w: 1440, h: 304, stage: 3, panel: [146, 150, 564, 272], page: '/approach' },
      { w: 1440, h: 304, stage: 4, panel: [146, 150, 740, 272], page: '/about' },
      { w: 1440, h: 304, stage: 4, panel: [146, 100, 850, 272], page: '/discovery' },
    ];
    const LANTERN_R = 12; // the lantern's ring, in px, with a little room
    const clear = ([x, y]: [number, number], [l, t, r, b]: Rect, pad: number) =>
      x + pad <= l || x - pad >= r || y + pad <= t || y - pad >= b;

    for (const { w, h, stage, panel, page } of PAGES) {
      it(`${page} at ${w}x${h}: the lantern is in the band, clear of the title panel and the Motion control`, () => {
        const layout = bandLayoutFor(w);
        const cam = bandCameraFor({ aspect: w / h, layout, stage });
        const lantern = projectToSvg(trailAt(BAND_STAGE_T[stage]), cam, w, h)!;
        expect(lantern[0]).toBeGreaterThan(LANTERN_R);
        expect(lantern[0]).toBeLessThan(w - LANTERN_R);
        expect(lantern[1]).toBeGreaterThan(LANTERN_R);
        expect(lantern[1]).toBeLessThan(h - LANTERN_R);
        expect(clear(lantern, panel, LANTERN_R), 'panel').toBe(true);
        expect(clear(lantern, [w - 165, 12, w - 12, 56], LANTERN_R), 'control').toBe(true);
        // phones and tablets: inside the 68 px strip the band reserves above the panel; at 320 px within the top fifth
        if (layout !== 'desktop') expect(lantern[1] + LANTERN_R).toBeLessThanOrEqual(w === 320 ? 0.21 * h : 60);
        if (layout === 'desktop') {
          // desktop: the saddle clears the panel too
          const saddle = projectToSvg([SADDLE.x, SADDLE.y, SADDLE.z], cam, w, h)!;
          expect(saddle[0]).toBeGreaterThan(panel[2] + 20);
        }
      });
    }

    const SHAPES = { phone: [1.0, 1.3, 2.2], tablet: [2.9, 3.25, 3.9], desktop: [3.2, 3.85, 6] } as const;
    for (const layout of ['phone', 'tablet', 'desktop'] as const) {
      for (const stage of [1, 2, 3, 4] as const) {
        it(`${layout} stage ${stage}: any band shape is a cover crop of the reference (the still)`, () => {
          const ref = BAND_REF[layout];
          const a0 = ref.w / ref.h;
          const refCam = bandCameraFor({ aspect: a0, layout, stage });
          const p = trailAt(BAND_STAGE_T[stage]);
          const [fx, fy] = projectToSvg(p, refCam, ref.w, ref.h)!.map((v, i) => v / (i ? ref.h : ref.w));
          for (const aspect of SHAPES[layout]) {
            const [bx, by] = projectToSvg(p, bandCameraFor({ aspect, layout, stage }), aspect * 100, 100)!;
            const k = aspect / a0;
            const ex = aspect >= a0 ? fx : 0.5 + (fx - 0.5) / k;
            const ey = aspect >= a0 ? ref.anchorY + (fy - ref.anchorY) * k : fy;
            expect(bx / (aspect * 100)).toBeCloseTo(ex, 3);
            expect(by / 100).toBeCloseTo(ey, 3);
          }
        });

        it(`${layout} stage ${stage}: no stretch past the horizontal cap`, () => {
          for (const aspect of [SHAPES[layout][0] * 0.9, ...SHAPES[layout], SHAPES[layout][2] * 1.1]) {
            const cam = bandCameraFor({ aspect, layout, stage });
            const hfov = 2 * Math.atan(Math.tan((cam.fov * Math.PI) / 360) * aspect);
            expect(hfov).toBeLessThanOrEqual((BAND_HFOV_MAX[layout] * Math.PI) / 180 + 1e-9);
          }
        });
      }
    }

    for (const stage of [3, 4] as const) {
      it(`desktop stage ${stage} by day: the sun and its ring stay inside the band's top edge`, () => {
        const { w, h } = BAND_REF.desktop;
        const cam = bandCameraFor({ aspect: w / h, layout: 'desktop', stage });
        const sun = bandSun('desktop', stage, 'day')!;
        const c = projectToSvg(sun, cam, w, h)!;
        const edge = projectToSvg([sun[0], sun[1] + SUN_R, sun[2]], cam, w, h)!;
        expect(edge[1] - 9).toBeGreaterThanOrEqual(0);
        expect(c[1]).toBeLessThan(h * 0.5);
        expect(sun[1]).toBeGreaterThan(SKY_LINE_Y); // it has cleared the horizon
      });
    }
    it('there is no sun at night', () => {
      expect(bandSun('desktop', 1, 'night')).toBeNull();
    });

    it('morning is the earlier sunrise: less dawn progress and a lower sun than day', () => {
      expect(BAND_LIGHT.morning.d).toBeLessThan(BAND_LIGHT.day.d);
      expect(BAND_LIGHT.morning.d).toBeCloseTo(0.7, 5);
      for (const layout of ['phone', 'tablet', 'desktop'] as const) {
        expect(bandSun(layout, 4, 'morning')![1]).toBeLessThan(bandSun(layout, 4, 'day')![1] - 5);
      }
    });

    it('layouts switch at 700 and 1024 px', () => {
      expect([699, 700, 1023, 1024].map(bandLayoutFor)).toEqual(['phone', 'tablet', 'tablet', 'desktop']);
    });

    it("small screens' band grid keeps the large extent at no more than 25,000 points", () => {
      const { rows, cols } = terrainGrid({ small: true, wide: true });
      expect(rows * cols).toBeLessThanOrEqual(25_000);
      expect(rows * cols).toBeGreaterThan(20_000);
      const s = terrainSamples({ small: true, wide: true });
      let minX = Infinity, maxX = -Infinity;
      for (let i = 0; i < s.length; i += 3) {
        minX = Math.min(minX, s[i]);
        maxX = Math.max(maxX, s[i]);
      }
      expect(minX).toBeLessThan(-115);
      expect(maxX).toBeGreaterThan(90);
    });
  });
});
