import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { BAND_LAYOUTS, BAND_STILLS, bandStillName, writeStills } from './render-stills';

const BAND_NAMES = BAND_STILLS.flatMap(({ stage, time }) => BAND_LAYOUTS.map((layout) => bandStillName(stage, time, layout)));
const NAMES = ['hero-desktop', 'hero-phone', 'dawn-desktop', 'dawn-phone', 'band-night', 'band-morning', 'band-day', ...BAND_NAMES];
const PUB = join(__dirname, '..', 'public');

beforeAll(async () => {
  await writeStills();
});

describe('build-time stills', () => {
  it('renders every still under 40 KB with a viewBox', () => {
    expect(NAMES).toHaveLength(22);
    for (const n of NAMES) {
      const svg = readFileSync(join(PUB, 'stills', `${n}.svg`), 'utf8');
      expect(Buffer.byteLength(svg), n).toBeLessThan(40 * 1024);
      expect(svg, n).toMatch(/viewBox="[-\d. ]+"/);
      // phone and tablet band stills crop from the top, like the live band's strip framing
      expect(svg, n).toContain(n.startsWith('band-s') && !n.endsWith('-desktop') ? 'preserveAspectRatio="xMidYMin slice"' : 'preserveAspectRatio="xMidYMid slice"');
    }
  });

  it('band stills cover each live band page, at each layout, at the reference sizes', () => {
    expect(BAND_STILLS).toEqual([
      { stage: 1, time: 'night' },
      { stage: 2, time: 'morning' },
      { stage: 3, time: 'day' },
      { stage: 4, time: 'day' },
      { stage: 4, time: 'morning' },
    ]);
    for (const n of BAND_NAMES) {
      const svg = readFileSync(join(PUB, 'stills', `${n}.svg`), 'utf8');
      const size = n.endsWith('-phone') ? '390 250' : n.endsWith('-tablet') ? '768 236' : '1440 304';
      expect(svg, n).toContain(`viewBox="0 0 ${size}"`);
    }
  });

  it('morning and day stills differ (morning is the earlier sunrise, with a lower sun)', () => {
    for (const layout of BAND_LAYOUTS) {
      const day = readFileSync(join(PUB, 'stills', `${bandStillName(4, 'day', layout)}.svg`), 'utf8');
      const morning = readFileSync(join(PUB, 'stills', `${bandStillName(4, 'morning', layout)}.svg`), 'utf8');
      expect(morning, layout).not.toEqual(day);
    }
  });

  it('og.png is 1200×630', async () => {
    const meta = await sharp(join(PUB, 'og.png')).metadata();
    expect([meta.width, meta.height]).toEqual([1200, 630]);
  });
});
