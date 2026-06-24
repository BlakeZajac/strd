import { readdirSync } from "node:fs";
import { join } from "node:path";

import { getCollection, type CollectionEntry } from "astro:content";

import { url } from "./site";

const PERSON_ID = url("");
const GALLERY_ROOT = join(process.cwd(), "public", "gallery");
const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

export type GalleryTypeEntry = CollectionEntry<"gallery-types">;
export type GalleryPhoto = {
  src: string;
};

export async function getGalleryTypes(): Promise<GalleryTypeEntry[]> {
  const types = await getCollection("gallery-types");
  return types.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

export async function getGalleryType(
  slug: string,
): Promise<GalleryTypeEntry | undefined> {
  const types = await getGalleryTypes();
  return types.find((type) => type.id === slug);
}

function isImageFile(name: string): boolean {
  const extension = name.slice(name.lastIndexOf(".")).toLowerCase();
  return IMAGE_EXTENSIONS.has(extension);
}

function toGalleryPath(type: string, value: string): string {
  const trimmed = value.trim().replace(/\\/g, "/");

  if (trimmed.startsWith("/gallery/")) {
    return trimmed;
  }

  if (trimmed.includes("/")) {
    return `/gallery/${trimmed.replace(/^\/+/, "")}`;
  }

  return `/gallery/${type}/${trimmed}`;
}

function sortGalleryPhotos(
  photos: string[],
  type: string,
  photoOrder?: string[],
): string[] {
  if (!photoOrder?.length) {
    return [...photos].sort((a, b) => a.localeCompare(b));
  }

  const orderIndex = new Map(
    photoOrder.map((path, index) => [toGalleryPath(type, path), index]),
  );

  return [...photos].sort((a, b) => {
    const aIndex = orderIndex.get(a);
    const bIndex = orderIndex.get(b);

    if (aIndex !== undefined && bIndex !== undefined) {
      return aIndex - bIndex;
    }

    if (aIndex !== undefined) {
      return -1;
    }

    if (bIndex !== undefined) {
      return 1;
    }

    return a.localeCompare(b);
  });
}

export function getGalleryPhotosByType(
  galleryType: GalleryTypeEntry,
): GalleryPhoto[] {
  const type = galleryType.id;
  const directory = join(GALLERY_ROOT, type);

  let filenames: string[];

  try {
    filenames = readdirSync(directory).filter(
      (name) => isImageFile(name) && !name.startsWith("."),
    );
  } catch {
    return [];
  }

  const heroImage = galleryType.data.heroImage;
  const photos = filenames
    .map((filename) => `/gallery/${type}/${filename}`)
    .filter((src) => src !== heroImage);

  return sortGalleryPhotos(photos, type, galleryType.data.photoOrder).map(
    (src) => ({ src }),
  );
}

export function getGalleryTypePath(slug: string): string {
  return `/${slug}/`;
}

export function getGalleryTypeTitle(title: string): string {
  return `${title} photography | Blake Zajac`;
}

export function getGalleryTypeDescription(
  title: string,
  description?: string,
): string {
  if (description) {
    return description;
  }

  return `Photography by Blake Zajac — ${title.toLowerCase()} gallery.`;
}

export function getGalleryTypeSchema(
  galleryType: GalleryTypeEntry,
  photos: GalleryPhoto[],
) {
  const path = galleryType.id;
  const name = getGalleryTypeTitle(galleryType.data.title);
  const description = getGalleryTypeDescription(
    galleryType.data.title,
    galleryType.data.description,
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name,
        description,
        url: url(path),
        about: { "@id": PERSON_ID },
      },
      {
        "@type": "ImageGallery",
        name: galleryType.data.title,
        description,
        url: url(path),
        image: photos.map((photo) => url(photo.src)),
      },
    ],
  };
}
