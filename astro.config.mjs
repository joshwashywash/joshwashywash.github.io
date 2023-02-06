import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), sitemap(), svelte(), tailwind()],
	markdown: {
		shikiConfig: {
			theme: 'rose-pine-moon',
		},
	},
	site: 'https://josho.dev',
});
