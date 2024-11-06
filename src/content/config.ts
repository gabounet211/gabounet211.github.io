import { defineCollection, z } from 'astro:content';

const postCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        short: z.string(),
    })
});

export const collections = {
    'focus': postCollection
};