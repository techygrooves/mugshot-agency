# Technical SEO (Phase 4)

How the site is set up for search engines and social sharing, what the build
enforces, and the switches to flip at launch.

## On every page

| What | Where |
| --- | --- |
| Unique `<title>` (≤ 65 chars) and meta description (≤ 165) | `BaseLayout.astro`; enforced by `scripts/verify-site.mjs` |
| Canonical URL, or `noindex` for placeholder and unreviewed pages | `BaseLayout.astro`, `site.noindexPaths`, `isPublishable()` |
| Open Graph + Twitter `summary_large_image` tags with a 1200×630 share image and alt text | `BaseLayout.astro` (`image` prop to override), `public/og-default.png` |
| Favicon (SVG), Apple touch icon, web app manifest | `public/` |
| Organization structured data with logo; WebSite on the home page | `BaseLayout.astro` |
| Body font preloaded; all scripts and styles are same-origin files | `BaseLayout.astro`, `astro.config.mjs` |

Page-type structured data: **Service + BreadcrumbList + FAQPage** (service and
state pages), **Article + BreadcrumbList** (resources), **FAQPage** (home, FAQ).

## What the build checks

`npm run build` fails on: missing/duplicate/over-long titles and descriptions;
more than one `<h1>`; broken internal links; an indexable page without a
canonical; placeholder content on an indexable page; prohibited claims;
structured data that doesn't parse or lacks the fields Google needs for its
type; missing share-image tags; and indexable state pages that are
near-copies of each other.

## Crawl controls

- **Sitemap:** `/sitemap-index.xml`, generated at build. Placeholder pages and
  unreviewed state pages are excluded automatically.
- **robots.txt:** while `site.urlConfirmed` is `false`, it **blocks all
  crawlers** so preview and staging deploys can never be indexed. At launch it
  switches to allow-all with the sitemap URL.
- **RSS:** `/resources/rss.xml` for the guides.

## Hosting headers

`public/_headers` (Netlify and Cloudflare Pages format) sets a strict
Content-Security-Policy, HSTS, `nosniff`, `X-Frame-Options`, Referrer-Policy
and Permissions-Policy, and caches fingerprinted `/_astro/*` files for a year.
Test it locally with `npm run build && npm run preview:headers`. On Vercel or
another host, port these rules to that host's config.

The consultation form posts to Formspree, so `https://formspree.io` is allowed
in `form-action` and `connect-src` only. When analytics are added, widen the
CSP only for that provider.

## Lighthouse (October 2026, local build, mobile unless noted)

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home (mobile / desktop) | 100 / 100 | 100 / 100 | 100 / 100 | 100* |
| Mugshot removal service | 100 | 100 | 100 | 100* |
| States index | 100 | 100 | 100 | 100* |
| Resource article | 99 | 100 | 100 | 100* |
| FAQ | 100 | 100 | 100 | 100* |

\* SEO measured with `urlConfirmed: true`. With the pre-launch robots.txt
block in place it reads 66, which is intended.

## Launch switches

1. Buy the domain; set `site.url` and `urlConfirmed: true` in `src/config/site.ts`.
   This enables crawling in robots.txt and makes canonicals and the sitemap
   point at the real domain.
2. If the domain or brand changes, run `npm run assets:brand` to regenerate the
   share image and icons.
3. Submit `/sitemap-index.xml` in Google Search Console and Bing Webmaster
   Tools (Phase 8).
