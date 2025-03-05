import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
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
		mdx(),
		sitemap(),
		svelte(),
	],
	site: "https://josho.dev",
	vite: {
		plugins: [tailwindcss()],
	},
});
