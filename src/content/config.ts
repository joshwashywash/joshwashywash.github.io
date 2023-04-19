import { defineCollection, z } from 'astro:content';

export const collections = {
	blog: defineCollection({
		schema: z.object({
			date: z.date().transform((s) => new Date(s)),
			description: z.string(),
			draft: z.boolean().default(false),
			title: z.string(),
		}),
	}),
};
