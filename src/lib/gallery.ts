import { getCollection, type CollectionEntry } from "astro:content";

import { url } from "./site";

const PERSON_ID = url("");

export type GalleryTypeEntry = CollectionEntry<"gallery-types">;
export type GalleryPhotoEntry = CollectionEntry<"gallery">;

export type GalleryLightboxPhoto = {
  title: string;
  alt: string;
  fullImage: string;
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

export async function getGalleryPhotosByType(
  type: string,
): Promise<GalleryPhotoEntry[]> {
  const photos = await getCollection("gallery");
  return photos
    .filter((photo) => photo.data.type === type)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
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
  photos: GalleryPhotoEntry[],
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
        image: photos.map((photo) => url(photo.data.fullImage)),
      },
    ],
  };
}

export function getGalleryPhotoAlt(photo: GalleryPhotoEntry): string {
  return photo.data.alt ?? photo.data.title ?? "";
}

export function toLightboxPhotos(
  photos: GalleryPhotoEntry[],
): GalleryLightboxPhoto[] {
  return photos.map((photo) => ({
    title: photo.data.title,
    alt: getGalleryPhotoAlt(photo),
    fullImage: photo.data.fullImage,
  }));
}
