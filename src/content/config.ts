import { defineCollection, z } from "astro:content";

const galleryTypeSlugs = z.enum(["automotive", "landscape", "lifestyle"]);

const galleryTypesCollection = defineCollection({
	type: "data",
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		heroImage: z.string(),
		order: z.number().optional(),
	}),
});

const galleryCollection = defineCollection({
	type: "data",
	schema: z.object({
		title: z.string(),
		alt: z.string().optional(),
		type: galleryTypeSlugs,
		fullImage: z.string(),
		order: z.number().optional(),
	}),
});

export const collections = {
	"gallery-types": galleryTypesCollection,
	gallery: galleryCollection,
};
