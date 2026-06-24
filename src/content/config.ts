import { defineCollection, z } from "astro:content";

const galleryTypesCollection = defineCollection({
	type: "data",
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		heroImage: z.string(),
		order: z.number().optional(),
		photoOrder: z.array(z.string()).optional(),
	}),
});

export const collections = {
	"gallery-types": galleryTypesCollection,
};
