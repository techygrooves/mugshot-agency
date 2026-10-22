// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { site } from './src/config/site.ts';

/**
 * National Reputation Defense — Astro configuration.
 *
 * Static output: every route is pre-rendered to plain HTML, which is the
 * fastest thing a crawler can be served and drops onto any static host.
 *
 * `site.url` is a placeholder until the domain is purchased. Canonical tags
 * and the sitemap are only meaningful once it is real — see CONTENT_PENDING.md.
 */
export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Placeholder pages carry noindex; they must not be listed either.
      filter: (page) => !site.noindexPaths.includes(new URL(page).pathname),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
