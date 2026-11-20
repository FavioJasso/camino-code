import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { SADDLE } from '../src/scene/terrain';
import { BAND_LAYOUTS, BAND_STILLS, OG_SIZE, SADDLE_LABEL_METRES, bandStillName, renderAllStills, writeStills } from './render-stills';

const BAND_NAMES = BAND_STILLS.flatMap(({ stage, time }) => BAND_LAYOUTS.map((layout) => bandStillName(stage, time, layout)));
const HOME_NAMES = ['hero-desktop', 'hero-phone', 'dawn-desktop', 'dawn-phone'];
const NAMES = [...HOME_NAMES, 'band-night', 'band-morning', 'band-day', ...BAND_NAMES];
const ROOT = join(__dirname, '..');
const PUB = join(ROOT, 'public');
const still = (n: string) => readFileSync(join(PUB, 'stills', `${n}.svg`), 'utf8');

beforeAll(async () => {
  await writeStills();
}, 60_000);

describe('build-time stills', () => {
  it('renders every still under 40 KB with a viewBox', () => {
    expect(NAMES).toHaveLength(22);
    for (const n of NAMES) {
      const svg = still(n);
      expect(Buffer.byteLength(svg), n).toBeLessThan(40 * 1024);
      expect(svg, n).toMatch(/viewBox="[-\d. ]+"/);
      // phone and tablet band stills crop from the top, like the live band's strip framing
      expect(svg, n).toContain(n.startsWith('band-s') && !n.endsWith('-desktop') ? 'preserveAspectRatio="xMidYMin slice"' : 'preserveAspectRatio="xMidYMid slice"');
    }
  });

  it('is deterministic: a second render gives the same bytes', () => {
    const again = renderAllStills();
    expect(Object.keys(again).sort()).toEqual([...NAMES].sort());
    for (const n of NAMES) expect(again[n] === still(n), n).toBe(true);
  }, 60_000);

  it('band stills cover each live band page, at each layout, at the reference sizes', () => {
    expect(BAND_STILLS).toEqual([
      { stage: 1, time: 'night' },
      { stage: 2, time: 'morning' },
      { stage: 3, time: 'day' },
      { stage: 4, time: 'day' },
      { stage: 4, time: 'morning' },
    ]);
    for (const n of BAND_NAMES) {
      const size = n.endsWith('-phone') ? '390 250' : n.endsWith('-tablet') ? '768 236' : '1440 304';
      expect(still(n), n).toContain(`viewBox="0 0 ${size}"`);
    }
  });

  it('morning and day stills differ (morning is the earlier sunrise, with a lower sun)', () => {
    for (const layout of BAND_LAYOUTS) {
      expect(still(bandStillName(4, 'morning', layout)), layout).not.toEqual(still(bandStillName(4, 'day', layout)));
    }
  });

  it('og.png is 1200×630', async () => {
    expect(OG_SIZE).toEqual({ w: 1200, h: 630 });
    const meta = await sharp(join(PUB, 'og.png')).metadata();
    expect([meta.width, meta.height]).toEqual([1200, 630]);
  });
});

describe('home stills', () => {
  it('the hero stills stand for the live first frame at 1440 x 900 and 390 x 844', () => {
    expect(still('hero-desktop')).toContain('viewBox="0 0 1440 900"');
    expect(still('hero-phone')).toContain('viewBox="0 0 390 844"');
  });

  it('the hero still is a point cloud with a walked trail and a ringed lantern, as the live scene draws it', () => {
    for (const n of ['hero-desktop', 'hero-phone']) {
      const svg = still(n);
      // dotted rows: zero-length dashes, in several sizes and spacings (the old still had one flat style)
      const dashes = new Set(svg.match(/stroke-dasharray="0 [\d.]+"/g));
      expect(dashes.size, n).toBeGreaterThan(8);
      // the route ahead in the shader's dim ember; on desktop the walked stretch is clear of the quiet zone: pure Ember
      expect(svg, n).toContain('<path stroke="#a65e4c"');
      if (n === 'hero-desktop') expect(svg, n).toContain('<path stroke="#ff7a3d"');
      // lantern: Ember ring, Midnight gap, pale core
      expect(svg, n).toMatch(/<circle [^>]*fill="none" stroke="#ff7a3d"[^>]*\/><circle [^>]*fill="#0E1320"\/><circle [^>]*fill="#f6d88b"\/>/);
      // the quiet zone under the page copy
      expect(svg, n).toContain('mask="url(#quiet)"');
    }
  });

  it('the label on the saddle states the elevation the terrain gives', () => {
    // scene.ts buildReadouts: scene units to metres, rounded to 2 m
    const metres = Math.round((860 + (SADDLE.y - 0.32) * 44) / 2) * 2;
    expect(metres).toBe(SADDLE_LABEL_METRES);
  });

  it('the sunrise stills are the centred window, on the mockup sky', () => {
    // the window is 80 percent of the viewport height on desktop, 64 percent on phones (home.css .dawn-window)
    expect(still('dawn-desktop')).toContain('viewBox="0 90 1440 720"');
    expect(still('dawn-phone')).toContain('viewBox="0 152 390 540"');
    for (const n of ['dawn-desktop', 'dawn-phone']) {
      const svg = still(n);
      const stops = [...svg.slice(svg.indexOf('id="sky"'), svg.indexOf('</linearGradient>')).matchAll(/stop-color="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1].toUpperCase());
      expect(stops, n).toEqual(['#0E1320', '#33405F', '#A69C9A', '#E7D3AF', '#F2E6D0']);
      expect(svg.toUpperCase(), n).not.toContain('#6B5B72');
      // the sun: a disc and one thin ring, shown only above the ground and the horizon line
      expect(svg, n).toMatch(/<g clip-path="url\(#up\)"><circle [^>]*fill="#F8D97E"\/><circle [^>]*fill="none" stroke="#F8D97E"/);
    }
  });

  it('no still or share image depends on a font being installed', () => {
    for (const n of NAMES) {
      expect(still(n), n).not.toMatch(/<text[\s>]/);
      expect(still(n), n).not.toContain('font-family');
    }
    // the script draws every letter as an outline path
    const script = readFileSync(join(ROOT, 'scripts', 'render-stills.ts'), 'utf8');
    expect(script).not.toMatch(/<text[\s>]/);
    expect(script).not.toMatch(/font-family=/);
  });
});

// Written by scripts/render-icons.mjs and committed; these check the files, they do not regenerate them.
describe('icons', () => {
  it('favicon.ico holds 16, 32 and 48 px images', async () => {
    const ico = readFileSync(join(ROOT, 'src', 'app', 'favicon.ico'));
    expect([ico.readUInt16LE(0), ico.readUInt16LE(2)]).toEqual([0, 1]);
    const count = ico.readUInt16LE(4);
    const sizes: number[] = [];
    for (let i = 0; i < count; i++) {
      const entry = 6 + 16 * i;
      const [length, offset] = [ico.readUInt32LE(entry + 8), ico.readUInt32LE(entry + 12)];
      const meta = await sharp(ico.subarray(offset, offset + length)).metadata();
      expect([meta.format, meta.width, meta.height]).toEqual(['png', ico[entry], ico[entry + 1]]);
      sizes.push(ico[entry]);
    }
    expect(sizes).toEqual([16, 32, 48]);
  });

  it('the tab icon is the square tile: sun and mountain, no trail', () => {
    const svg = readFileSync(join(ROOT, 'src', 'app', 'icon.svg'), 'utf8');
    expect(svg).toContain('viewBox="0 0 32 32"');
    expect(svg).toContain('<circle cx="16.5" cy="10.5" r="8.5" fill="#FF7A3D"/>');
    expect(svg.match(/<path /g)).toHaveLength(1);
  });

  it('the Apple and manifest icons are opaque squares of the stated sizes', async () => {
    for (const [file, size] of [
      [join(ROOT, 'src', 'app', 'apple-icon.png'), 180],
      [join(PUB, 'icon-192.png'), 192],
      [join(PUB, 'icon-512.png'), 512],
    ] as const) {
      const meta = await sharp(file).metadata();
      expect([meta.width, meta.height, meta.hasAlpha], file).toEqual([size, size, false]);
      // full-bleed Midnight: the corner pixel is the tile colour
      const { data } = await sharp(file).extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
      expect([data[0], data[1], data[2]], file).toEqual([0x0e, 0x13, 0x20]);
    }
  });
});
