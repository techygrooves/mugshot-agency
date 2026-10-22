import type { APIRoute } from 'astro';
import { site } from '@config/site';

/**
 * Until the production domain is confirmed (site.urlConfirmed), every crawler
 * is turned away so a preview or staging deploy can never be indexed — or
 * compete with the real site later. Flip urlConfirmed at launch.
 */
export const GET: APIRoute = ({ site: siteUrl }) =>
  new Response(
    site.urlConfirmed
      ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', siteUrl).href}\n`
      : `# Pre-launch: crawling disabled until the production domain is confirmed.\nUser-agent: *\nDisallow: /\n`,
  );
