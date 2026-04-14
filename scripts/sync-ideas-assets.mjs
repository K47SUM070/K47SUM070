import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const ideasRoot = path.join(projectRoot, "ideasnuevas");
const imagesRoot = path.join(ideasRoot, "Imagenes");
const fontsRoot = path.join(ideasRoot, "fuentes");
const publicProductsRoot = path.join(projectRoot, "public", "productos");
const publicFontsRoot = path.join(projectRoot, "public", "fonts");
const manifestFile = path.join(projectRoot, "src", "data", "asset-manifest.ts");

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const fontExtensions = new Set([".ttf", ".woff", ".woff2", ".otf"]);
const ignoredImageDirs = new Set(["instagram-files"]);

function slugifySegment(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, " ")
    .replace(/_/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function titleCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function ensureCleanDir(dir) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
  }

  mkdirSync(dir, { recursive: true });
}

function walkFiles(rootDir, callback, relativeDir = "") {
  for (const entry of readdirSync(path.join(rootDir, relativeDir), { withFileTypes: true })) {
    const nextRelative = path.join(relativeDir, entry.name);

    if (entry.isDirectory()) {
      callback({ type: "dir", absolutePath: path.join(rootDir, nextRelative), relativePath: nextRelative });
      walkFiles(rootDir, callback, nextRelative);
      continue;
    }

    callback({ type: "file", absolutePath: path.join(rootDir, nextRelative), relativePath: nextRelative });
  }
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

if (!existsSync(imagesRoot) || !existsSync(fontsRoot)) {
  throw new Error("No se encontraron las carpetas ideasnuevas/Imagenes o ideasnuevas/fuentes.");
}

ensureCleanDir(publicProductsRoot);
ensureCleanDir(publicFontsRoot);

const copiedImages = [];
const copiedFonts = [];
const collectionMap = new Map();

walkFiles(imagesRoot, (entry) => {
  if (entry.type !== "file") {
    return;
  }

  const extension = path.extname(entry.absolutePath).toLowerCase();
  if (!imageExtensions.has(extension)) {
    return;
  }

  const originalSegments = entry.relativePath.split(path.sep);
  const directorySegments = originalSegments.slice(0, -1);
  if (directorySegments.some((segment) => ignoredImageDirs.has(slugifySegment(segment)))) {
    return;
  }

  const fileName = path.basename(entry.absolutePath, extension);
  const sanitizedSegments = directorySegments.map(slugifySegment).filter(Boolean);
  const sanitizedFileName = slugifySegment(fileName) || "imagen";
  const targetDir = path.join(publicProductsRoot, ...sanitizedSegments);
  const targetFile = path.join(targetDir, `${sanitizedFileName}${extension}`);
  mkdirSync(targetDir, { recursive: true });
  cpSync(entry.absolutePath, targetFile);

  const publicPath = toPosix(`/productos/${[...sanitizedSegments, `${sanitizedFileName}${extension}`].join("/")}`);
  copiedImages.push(publicPath);

  if (sanitizedSegments.length >= 1 && !sanitizedSegments.includes("ideas-para-fondo")) {
    const brand = sanitizedSegments[0];
    const collectionSlug = sanitizedSegments.at(-1);
    const key = sanitizedSegments.join("/");

    if (!collectionMap.has(key)) {
      collectionMap.set(key, {
        key,
        slug: collectionSlug,
        brand: titleCase(brand),
        title: directorySegments.at(-1) ?? collectionSlug,
        imageDir: toPosix(`/productos/${sanitizedSegments.join("/")}`),
        images: [],
      });
    }

    collectionMap.get(key).images.push(publicPath);
  }
});

walkFiles(fontsRoot, (entry) => {
  if (entry.type !== "file") {
    return;
  }

  const extension = path.extname(entry.absolutePath).toLowerCase();
  if (!fontExtensions.has(extension)) {
    return;
  }

  const originalSegments = entry.relativePath.split(path.sep);
  const directorySegments = originalSegments.slice(0, -1);
  const fileName = path.basename(entry.absolutePath);
  const sanitizedSegments = directorySegments.map(slugifySegment).filter(Boolean);
  const targetDir = path.join(publicFontsRoot, ...sanitizedSegments);
  const targetFile = path.join(targetDir, fileName);
  mkdirSync(targetDir, { recursive: true });
  cpSync(entry.absolutePath, targetFile);

  copiedFonts.push({
    name: path.basename(entry.absolutePath, extension),
    relativePath: toPosix(`/fonts/${[...sanitizedSegments, fileName].join("/")}`),
    format: extension.replace(".", ""),
  });
});

const productCollections = [...collectionMap.values()]
  .filter((collection) => collection.images.length >= 2)
  .sort((a, b) => a.slug.localeCompare(b.slug));

const backgroundImages = copiedImages.filter((image) => image.includes("/ideas-para-fondo/"));

const manifestSource = `export type ImportedProductCollection = {
  key: string;
  slug: string;
  brand: string;
  title: string;
  imageDir: string;
  images: string[];
};

export type ImportedFontAsset = {
  name: string;
  relativePath: string;
  format: string;
};

export const importedProductCollections = ${JSON.stringify(productCollections, null, 2)} satisfies ImportedProductCollection[];

export const importedBackgroundImages = ${JSON.stringify(backgroundImages, null, 2)} as const;

export const importedFonts = ${JSON.stringify(copiedFonts, null, 2)} satisfies ImportedFontAsset[];
`;

writeFileSync(manifestFile, manifestSource);

console.log(`Sincronizados ${productCollections.length} sets de producto y ${copiedFonts.length} fuentes.`);
