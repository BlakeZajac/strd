import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";

import sharp from "sharp";

const GALLERY_ROOT = join(process.cwd(), "public", "gallery");
const MANIFEST_PATH = join(GALLERY_ROOT, "manifest.json");
const THUMBS_DIR = "_thumbs";
const THUMB_MAX_WIDTH = 800;
const THUMB_QUALITY = 80;

const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

function isImageFile(name) {
  return IMAGE_EXTENSIONS.has(extname(name).toLowerCase());
}

function isGalleryTypeDir(name) {
  return !name.startsWith(".") && name !== THUMBS_DIR;
}

async function ensureThumb(sourcePath, thumbPath) {
  const sourceStat = statSync(sourcePath);
  const thumbExists = existsSync(thumbPath);
  const image = sharp(sourcePath);
  const metadata = await image.metadata();

  if (thumbExists) {
    const thumbStat = statSync(thumbPath);
    if (thumbStat.mtimeMs >= sourceStat.mtimeMs) {
      return metadata;
    }
  }

  mkdirSync(join(thumbPath, ".."), { recursive: true });

  await image
    .resize({
      width: THUMB_MAX_WIDTH,
      withoutEnlargement: true,
    })
    .webp({ quality: THUMB_QUALITY })
    .toFile(thumbPath);

  return metadata;
}

async function processGalleryType(type) {
  const typeDir = join(GALLERY_ROOT, type);
  const thumbsDir = join(typeDir, THUMBS_DIR);
  const entries = {};

  const filenames = readdirSync(typeDir).filter(
    (name) => isImageFile(name) && !name.startsWith("."),
  );

  for (const filename of filenames) {
    const sourcePath = join(typeDir, filename);
    const thumbFilename = `${basename(filename, extname(filename))}.webp`;
    const thumbPath = join(thumbsDir, thumbFilename);
    const metadata = await ensureThumb(sourcePath, thumbPath);

    entries[filename] = {
      width: metadata.width ?? 1,
      height: metadata.height ?? 1,
      thumbSrc: `/gallery/${type}/${THUMBS_DIR}/${thumbFilename}`,
    };
  }

  return entries;
}

async function main() {
  if (!existsSync(GALLERY_ROOT)) {
    console.log("No public/gallery directory found — skipping thumb generation.");
    return;
  }

  const types = readdirSync(GALLERY_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && isGalleryTypeDir(entry.name))
    .map((entry) => entry.name);

  const manifest = {};

  for (const type of types) {
    manifest[type] = await processGalleryType(type);
  }

  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf-8");

  const imageCount = Object.values(manifest).reduce(
    (total, typeEntries) => total + Object.keys(typeEntries).length,
    0,
  );

  console.log(`Gallery thumbs: processed ${imageCount} images across ${types.length} types.`);
}

main().catch((error) => {
  console.error("Gallery thumb generation failed:", error);
  process.exit(1);
});
