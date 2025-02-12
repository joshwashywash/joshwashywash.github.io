import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const schema = z.object({
	description: z.string(),
	draft: z.boolean().default(false),
	published_date: z.date().transform((s) => new Date(s)),
	title: z.string(),
});

const loader = glob({
	base: "./src/blog",
	pattern: "**/*.{md,mdx}",
});

const blog = defineCollection({
	loader,
	schema,
});

export const collections = {
	blog,
};
