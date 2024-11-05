import { defineCollection, z } from 'astro:content';

const focusCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        short: z.string(),
    })
});

export const collections = {
    'focus': focusCollection
};