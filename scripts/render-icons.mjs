// Icon files, all drawn from the one mark (sun, mountain, the camino cut into the peak; the same drawing
// as src/components/BrandMark.tsx). Run by hand when the mark changes, and commit the output:
//
//   node scripts/render-icons.mjs
//
// Writes:
//   src/app/icon.svg        the tab icon: sun and mountain on a rounded Midnight tile, no trail (it turns
//                           to noise at 16 px)
//   src/app/favicon.ico     16, 32 and 48 px PNGs of that tile, for browsers that do not take an SVG icon
//   src/app/apple-icon.png  180 px, full-bleed Midnight with the whole mark (iOS rounds the corners itself)
//   public/icon-192.png     the same full-bleed tile for the web manifest, with the mark kept inside the
//   public/icon-512.png     safe zone so Android can mask it to a circle
//
// Unlike the stills, this is not part of the build: the files are committed, and nothing here depends on
// the machine (no fonts are read).
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIDNIGHT = '#0E1320';
const CREAM = '#F4EBDC';
const EMBER = '#FF7A3D';

// the tab icon: the mark's sun and mountain moved onto a 32 x 32 tile; feet and base sit on whole pixels at 16 px
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${MIDNIGHT}"/>
  <circle cx="16.5" cy="10.5" r="8.5" fill="${EMBER}"/>
  <path d="M4 28 L15 9.5 L19.5 17 L22.5 14.5 L28 28 Z" fill="${CREAM}" stroke="${MIDNIGHT}" stroke-width="2.8" stroke-linejoin="round" paint-order="stroke"/>
</svg>
`;

/**
 * The whole mark (26 x 30) centred on a full-bleed Midnight square of 180 units, `scale` units per mark unit.
 * 4.5 fills the tile as the Apple icon wants; 4 keeps every corner of the mark inside the central circle
 * (radius 40 percent of the side) that a maskable icon may be cut down to.
 */
const tileSvg = (scale) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${MIDNIGHT}"/>
  <g transform="translate(${90 - 13 * scale} ${90 - 15 * scale}) scale(${scale})" fill="none">
    <circle cx="13.5" cy="10.5" r="8.5" fill="${EMBER}"/>
    <path d="M1 28 L12 9.5 L16.5 17 L19.5 14.5 L25 28 Z" fill="${CREAM}" stroke="${MIDNIGHT}" stroke-width="2.4" stroke-linejoin="round" paint-order="stroke"/>
    <path d="M5.6 25.8 L20 23.2 L8.4 20.4 L14.4 17.6 L12 13.6" stroke="${MIDNIGHT}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`;

/** Rasterise an SVG at exactly `size` px square (drawn at that size, not scaled from another). */
const png = (svg, size, viewBox, opaque) => {
  const img = sharp(Buffer.from(svg), { density: (72 * size) / viewBox }).resize(size, size);
  return (opaque ? img.flatten({ background: MIDNIGHT }).removeAlpha() : img).png({ compressionLevel: 9 }).toBuffer();
};

/** An ICO file holding PNG images: a 6-byte header, one 16-byte directory entry per image, then the PNGs. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size, 0); // width (0 would mean 256)
    e.writeUInt8(size, 1); // height
    e.writeUInt8(0, 2); // palette colours: none
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const write = (path, data) => {
  writeFileSync(join(ROOT, path), data);
  console.log(path, data.length, 'bytes');
};

write('src/app/icon.svg', ICON_SVG);
write('src/app/favicon.ico', ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(ICON_SVG, size, 32, false) })))));
write('src/app/apple-icon.png', await png(tileSvg(4.5), 180, 180, true));
write('public/icon-192.png', await png(tileSvg(4), 192, 180, true));
write('public/icon-512.png', await png(tileSvg(4), 512, 180, true));
