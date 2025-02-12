import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
	integrations: [
		expressiveCode({
			themes: ["rose-pine", "rose-pine-dawn"],
		}),
		mdx(),
		sitemap(),
	],
	site: "https://josho.dev",
	vite: {
		plugins: [tailwindcss()],
	},
});
