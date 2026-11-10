import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { writeStills } from './render-stills';

const NAMES = ['hero-desktop', 'hero-phone', 'dawn-desktop', 'dawn-phone', 'band-night', 'band-morning', 'band-day'];
const PUB = join(__dirname, '..', 'public');

beforeAll(async () => {
  await writeStills();
});

describe('build-time stills', () => {
  it('renders seven stills under 40 KB each with a viewBox', () => {
    for (const n of NAMES) {
      const svg = readFileSync(join(PUB, 'stills', `${n}.svg`), 'utf8');
      expect(Buffer.byteLength(svg), n).toBeLessThan(40 * 1024);
      expect(svg, n).toMatch(/viewBox="[-\d. ]+"/);
      expect(svg, n).toContain('preserveAspectRatio="xMidYMid slice"');
    }
  });

  it('og.png is 1200×630', async () => {
    const meta = await sharp(join(PUB, 'og.png')).metadata();
    expect([meta.width, meta.height]).toEqual([1200, 630]);
  });
});
