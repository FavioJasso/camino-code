import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const imagesDir = path.join(repoRoot, "public", "assets", "images");
const overridesPath = path.join(repoRoot, "src", "config", "partners.overrides.json");
const outPath = path.join(repoRoot, "src", "config", "partners.generated.json");

function readOverrides() {
  try {
    const raw = fs.readFileSync(overridesPath, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function main() {
  if (!fs.existsSync(imagesDir)) {
    console.error(`[generate-partners] Missing directory: ${imagesDir}`);
    process.exit(1);
  }

  const overrides = readOverrides();
  const files = fs
    .readdirSync(imagesDir)
    .filter((f) => /^partner_(\d+)\.(webp|png|jpe?g|svg)$/i.test(f))
    .map((file) => {
      const match = file.match(/^partner_(\d+)\./i);
      const num = match ? Number(match[1]) : Number.POSITIVE_INFINITY;
      return { file, num };
    })
    .sort((a, b) => a.num - b.num);

  const partners = files.map(({ file, num }) => {
    const numLabel = Number.isFinite(num) ? String(num).padStart(2, "0") : "";
    return {
      src: `/assets/images/${file}`,
      alt: overrides[file] ?? (numLabel ? `Partner ${numLabel}` : "Partner"),
    };
  });

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(partners, null, 2) + "\n", "utf8");
  console.log(`[generate-partners] Wrote ${partners.length} partners -> ${path.relative(repoRoot, outPath)}`);
}

main();

