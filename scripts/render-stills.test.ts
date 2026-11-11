import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { BAND_STILLS, bandStillName, writeStills } from './render-stills';

const BAND_NAMES = BAND_STILLS.flatMap(({ stage, time }) => [bandStillName(stage, time, false), bandStillName(stage, time, true)]);
const NAMES = ['hero-desktop', 'hero-phone', 'dawn-desktop', 'dawn-phone', 'band-night', 'band-morning', 'band-day', ...BAND_NAMES];
const PUB = join(__dirname, '..', 'public');

beforeAll(async () => {
  await writeStills();
});

describe('build-time stills', () => {
  it('renders every still under 40 KB with a viewBox', () => {
    expect(NAMES).toHaveLength(17);
    for (const n of NAMES) {
      const svg = readFileSync(join(PUB, 'stills', `${n}.svg`), 'utf8');
      expect(Buffer.byteLength(svg), n).toBeLessThan(40 * 1024);
      expect(svg, n).toMatch(/viewBox="[-\d. ]+"/);
      // phone band stills crop from the top, like the live band's phone framing
      expect(svg, n).toContain(n.startsWith('band-s') && n.endsWith('-phone') ? 'preserveAspectRatio="xMidYMin slice"' : 'preserveAspectRatio="xMidYMid slice"');
    }
  });

  it('band stills cover each live band page, desktop and phone, at the reference sizes', () => {
    expect(BAND_STILLS).toEqual([
      { stage: 1, time: 'night' },
      { stage: 2, time: 'morning' },
      { stage: 3, time: 'day' },
      { stage: 4, time: 'day' },
      { stage: 4, time: 'morning' },
    ]);
    for (const n of BAND_NAMES) {
      const svg = readFileSync(join(PUB, 'stills', `${n}.svg`), 'utf8');
      expect(svg, n).toContain(n.endsWith('-phone') ? 'viewBox="0 0 390 250"' : 'viewBox="0 0 1440 304"');
    }
  });

  it('og.png is 1200×630', async () => {
    const meta = await sharp(join(PUB, 'og.png')).metadata();
    expect([meta.width, meta.height]).toEqual([1200, 630]);
  });
});
