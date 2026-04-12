import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [
		expressiveCode({
			themes: ["rose-pine", "rose-pine-dawn"],
		}),
		mdx({
			rehypePlugins: [rehypeKatex],
			remarkPlugins: [remarkMath],
		}),
		sitemap(),
		svelte(),
	],
	site: "https://josho.dev",
	vite: {
		plugins: [tailwindcss()],
	},
});
