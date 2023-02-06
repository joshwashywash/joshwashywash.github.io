import { defineCollection, z } from 'astro:content';

export const collections = {
	blog: defineCollection({
		schema: z.object({
			date: z.date().transform((s) => new Date(s)),
			draft: z.boolean().default(false),
			description: z.string(),
			title: z.string(),
		}),
	}),
};
