import { defineCollection, z } from 'astro:content';

const workCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.coerce.date(),
        featuredImage: z.string().optional(),
    }),
});

export const collections = {
    work: workCollection,
};
