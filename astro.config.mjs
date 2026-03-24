// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://han-s-kl.github.io',
  base: '/schoterpoort',
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});