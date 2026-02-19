import { defineCollection, z } from "astro:content";

const workCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		featuredImage: z.string().optional(),
		featuredVideo: z.string().optional(),
		link: z.string().optional(),
		role: z.array(z.string()).optional(),
		stack: z.array(z.string()).optional(),
		overview: z.string().optional(),
		challenge: z.string().optional(),
		solution: z.string().optional(),
		highlights: z.array(z.string()).optional(),
		impact: z.string().optional(),
	}),
});

const servicesCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		heroKicker: z.string().optional(),
		heroHeading: z.string(),
		heroSubheading: z.string().optional(),
		summary: z.string(),
		audience: z.string(),
		servicesList: z
			.array(
				z.object({
					title: z.string(),
					description: z.string(),
				}),
			)
			.optional(),
		featuredWorkSlugs: z.array(z.string()).optional(),
		faqs: z
			.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				}),
			)
			.optional(),
		schemaType: z.literal("Service").optional(),
	}),
});

const serviceLocationsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		metaDescription: z.string(),
		serviceSlug: z.string(),
		locationSlug: z.string(),
		locationName: z.string(),
		primaryKeyword: z.string(),
		secondaryKeywords: z.array(z.string()).optional(),
		heroKicker: z.string().optional(),
		heroHeading: z.string(),
		heroSubheading: z.string().optional(),
		offerSummary: z.string(),
		audience: z.string(),
		servicesList: z
			.array(
				z.object({
					title: z.string(),
					description: z.string(),
				}),
			)
			.optional(),
		locationContext: z.string(),
		featuredWorkSlugs: z.array(z.string()).optional(),
		faqs: z
			.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				}),
			)
			.optional(),
		schema: z
			.object({
				areaServedOverride: z.string().optional(),
			})
			.optional(),
	}),
});

export const collections = {
	work: workCollection,
	services: servicesCollection,
	"service-locations": serviceLocationsCollection,
};
