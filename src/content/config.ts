import { defineCollection, z } from 'astro:content';

const workCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        featuredImage: z.string().optional(),
    }),
});

export const collections = {
    work: workCollection,
};
