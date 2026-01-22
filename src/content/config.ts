import { defineCollection, z } from 'astro:content';

// const workCollection = defineCollection({
//     type: 'content',
//     schema: z.object({
//         title: z.string(),
//         description: z.string().optional(),
//         date: z.coerce.date(),
//         featuredImage: z.string().optional(),
//     }),
// });

// const newsCollection = defineCollection({
//     type: 'content',
//     schema: z.object({
//         title: z.string(),
//         date: z.coerce.date(),
//         excerpt: z.string(),
//         featuredImage: z.string().optional(),
//     }),
// });

const experienceCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().optional(),
        items: z.array(z.object({
            dates: z.string(),
            company: z.string(),
            role: z.string(),
            url: z.string().optional(),
        })),
    }),
});

// const educationCollection = defineCollection({
//     type: 'data',
//     schema: z.object({
//         title: z.string().optional(),
//         items: z.array(z.object({
//             year: z.string(),
//             institution: z.string(),
//             qualification: z.string(),
//         })),
//     }),
// });

// const socialCollection = defineCollection({
//     type: 'data',
//     schema: z.object({
//         title: z.string().optional(),
//         items: z.array(z.object({
//             platform: z.string(),
//             handle: z.string(),
//             url: z.string(),
//         })),
//     }),
// });

// const readingCollection = defineCollection({
//     type: 'data',
//     schema: z.object({
//         title: z.string().optional(),
//         sections: z.array(z.object({
//             year: z.union([z.number(), z.string()]),
//             items: z.array(z.object({
//                 title: z.string(),
//                 author: z.string(),
//             })),
//         })),
//     }),
// });

export const collections = {
    // work: workCollection,
    // news: newsCollection,
    experience: experienceCollection,
    // education: educationCollection,
    // social: socialCollection,
    // reading: readingCollection,
};
