// Make the three files every case-study image needs, in public/work/<slug>/:
//   <name>.webp       1920x1280
//   <name>-1280.webp  1280x853  (what a density-3 phone picks for a full-width image)
//   <name>-960.webp    960x640
// The pages build the 1280w and 960w names from the 1920w path and assume 3:2 at these sizes,
// so all three files must exist (see src/app/work/WorkImage.tsx).
//
// usage: node scripts/work-images.mjs <slug> <name> <source-file> [--force]
//   <slug>  the case study's folder, for example victorias-painting
//   <name>  card, or gallery-01, gallery-02, ...
//   --force replace files that already exist (off by default, so a typo cannot overwrite a study)
//
// A source that is already a 1920x1280 WebP is copied byte for byte, with no second
// lossy pass. Anything else is cropped to 3:2 from the centre and encoded.
//
// The two studies carried over from the old site were made from its images
// (branch main, public/assets/images/case_studies/):
//   victorias-painting  card        victorias_work.webp
//                       gallery-01  victorias_gallery02.webp   services
//                       gallery-02  victorias_gallery03.webp   areas served
//                       gallery-03  victorias_gallery04.webp   free-estimate form
//                       gallery-04  victorias_gallery01.webp   statistics band
//   daniel-avila        card        danielavila_work.webp
//                       gallery-01  danielavila_gallery01.webp projects
//                       gallery-02  danielavila_gallery03.webp about
//                       gallery-03  danielavila_gallery02.webp experience
//   danielavila_gallery04.webp is left out on purpose: it shows a personal phone number and email address.
import { access, copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const FULL = { width: 1920, height: 1280 };
const MID = { width: 1280, height: 853 };
const HALF = { width: 960, height: 640 };
const QUALITY = 80;

const USAGE = 'usage: node scripts/work-images.mjs <slug> <name> <source-file> [--force]';

const args = process.argv.slice(2);
const force = args.includes('--force');
const [slug, name, source] = args.filter((a) => a !== '--force');

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!slug || !name || !source) fail(USAGE);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(`"${slug}" is not a folder name: use lower-case letters, digits and hyphens.`);
if (!/^(card|gallery-\d{2})$/.test(name)) fail(`"${name}" is not an image name: use card or gallery-01, gallery-02, ...`);

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(repoRoot, 'public', 'work', slug);
const fullPath = path.join(outDir, `${name}.webp`);
const midPath = path.join(outDir, `${name}-1280.webp`);
const halfPath = path.join(outDir, `${name}-960.webp`);

const exists = (file) => access(file).then(() => true, () => false);
const shown = (file) => path.relative(repoRoot, file).replaceAll('\\', '/');

if (!(await exists(source))) fail(`Source file not found: ${source}`);
if (!force) {
  for (const file of [fullPath, midPath, halfPath]) {
    if (await exists(file)) fail(`${shown(file)} already exists. Pass --force to replace it.`);
  }
}

const meta = await sharp(source).metadata();
if (!meta.width || !meta.height) fail(`Could not read the size of ${source}`);
if (meta.width < FULL.width || meta.height < FULL.height) {
  fail(`${source} is ${meta.width}x${meta.height}. It must be at least ${FULL.width}x${FULL.height}, so nothing is enlarged.`);
}

await mkdir(outDir, { recursive: true });

const alreadySized = meta.format === 'webp' && meta.width === FULL.width && meta.height === FULL.height && !(meta.pages > 1);
if (alreadySized) {
  await copyFile(source, fullPath);
} else {
  await sharp(source).rotate().resize({ ...FULL, fit: 'cover', position: 'centre' }).webp({ quality: QUALITY, effort: 6 }).toFile(fullPath);
}
await sharp(source).rotate().resize({ ...MID, fit: 'cover', position: 'centre' }).webp({ quality: QUALITY, effort: 6 }).toFile(midPath);
await sharp(source).rotate().resize({ ...HALF, fit: 'cover', position: 'centre' }).webp({ quality: QUALITY, effort: 6 }).toFile(halfPath);

for (const file of [fullPath, midPath, halfPath]) {
  const { width, height } = await sharp(file).metadata();
  const { size } = await stat(file);
  console.log(`${shown(file)}  ${width}x${height}  ${size} bytes${file === fullPath && alreadySized ? '  (copied unchanged)' : ''}`);
}
