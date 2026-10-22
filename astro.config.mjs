// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { site } from './src/config/site.ts';
import { stateLaws, isPublishable } from './src/data/state-laws.ts';

const unpublishedStatePaths = stateLaws.filter((s) => !isPublishable(s)).map((s) => `/states/${s.slug}/`);

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
      // Placeholder pages and unreviewed state pages carry noindex; they must not be listed either.
      filter: (page) => {
        const { pathname } = new URL(page);
        return !site.noindexPaths.includes(pathname) && !unpublishedStatePaths.includes(pathname);
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Emit every script as a file, never inline, so the Content-Security-Policy
    // in public/_headers can use script-src 'self' without 'unsafe-inline'.
    build: { assetsInlineLimit: 0 },
  },
});
