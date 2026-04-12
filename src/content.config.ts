import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const schema = z.object({
	description: z.string(),
	image_url: z.string().default("/me.jpg"),
	uses_katex: z.boolean().default(false),
	is_draft: z.boolean().default(false),
	published_date: z.date().transform((s) => new Date(s)),
	title: z.string(),
});

type T = z.infer<typeof schema>;

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
