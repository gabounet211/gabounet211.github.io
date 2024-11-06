// @ts-check
import { defineConfig } from 'astro/config';

import icon from "astro-icon";

import vue from "@astrojs/vue";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://marc-antoine.desrochers.space',

  i18n: {
      defaultLocale: "fr",
      locales: ["fr", "en"],
      routing: {
          prefixDefaultLocale: true
      }
  },

  integrations: [icon(), vue(), mdx()],
});