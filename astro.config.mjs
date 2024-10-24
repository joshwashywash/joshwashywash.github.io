// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],
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
});
