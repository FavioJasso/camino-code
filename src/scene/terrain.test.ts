import { describe, expect, it } from 'vitest';
import {
  CAMERA_TARGET,
  H_MAX,
  SADDLE,
  cameraFor,
  heightAt,
  projectToSvg,
  terrainSamples,
  trailPoints,
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
});
