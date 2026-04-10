// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Multi-target build: select via DEPLOY_TARGET env var (defaults to github)
//   github  -- current GitHub Pages deploy (han-s-kl.github.io/schoterpoort)
//   transip -- future TransIP root deploy (schoterpoort.com, no base path)
//   staging -- TransIP submap /staging/ for testing before cutover
const target = process.env.DEPLOY_TARGET || 'github';
const targets = {
  github:  { site: 'https://han-s-kl.github.io', base: '/schoterpoort' },
  transip: { site: 'https://schoterpoort.com',   base: '/' },
  staging: { site: 'https://schoterpoort.com',   base: '/staging' },
};
if (!targets[target]) {
  throw new Error(`Unknown DEPLOY_TARGET "${target}". Valid: ${Object.keys(targets).join(', ')}`);
}

export default defineConfig({
  site: targets[target].site,
  base: targets[target].base,
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});