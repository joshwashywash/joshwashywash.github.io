import { defineCollection, z } from "astro:content";

const schema = z.object({
	description: z.string(),
	draft: z.boolean().default(false),
	published_at: z.date().transform((s) => new Date(s)),
	title: z.string(),
});

const blog = defineCollection({
	schema,
});

export const collections = { blog };
