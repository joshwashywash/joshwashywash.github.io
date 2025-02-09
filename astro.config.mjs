import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	integrations: [sitemap()],
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
		plugins: [
			tailwindcss()
		]
	}
});
