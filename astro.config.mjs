import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), sitemap()],
	prefetch: {
		prefetchAll: true,
	},
	markdown: {
		shikiConfig: {
			themes: {
				dark: "rose-pine",
				light: "rose-pine-moon",
			},
		},
	},
	site: "https://josho.dev",
	vite: {
		plugins: [tailwindcss()],
	},
});

