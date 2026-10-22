# National Reputation Defense — website

Marketing website for **National Reputation Defense**, a nationwide online
reputation management company (mugshot removal, search suppression, personal
and business reputation, personal information removal, brand monitoring).

Built with [Astro](https://astro.build) + Tailwind CSS. Every page is
pre-rendered to static HTML for speed and SEO.

## Getting started

Requires Node.js **22.23.4 or newer** (see `.nvmrc`).

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # type check + tests + build + SEO/link/claims verification
npm test           # data tests only
npm run report:state-laws   # regenerate docs/STATE_LAW_REVIEW.md
npm run preview:headers     # serve dist/ with public/_headers applied (CSP etc.)
npm run assets:brand        # regenerate share image + icons (needs Chromium)
npm run package:hostinger   # build + .htaccess + hostinger-site.zip for upload
npm run launch-check        # what still blocks launch
npm run preview    # serve the built site
```

`npm run build` fails if any page has a missing, duplicated or over-long title
or description, more than one `<h1>`, a broken internal link, or placeholder
content on an indexable page, or a prohibited claim such as a guaranteed
result or presenting the company as a law firm, or published state pages
that are near-copies of each other (`scripts/verify-site.mjs`).

## Going live on Hostinger

See **`docs/LAUNCH.md`** for the step-by-step guide. Every push to `main`
also builds a ready-to-upload package: Actions → **Hostinger package** →
Artifacts → `hostinger-site`.

## Preview on GitHub Pages

Every push to `main` builds the site (with all checks) and publishes a
preview at **https://techygrooves.github.io/mugshot-agency/**
(`.github/workflows/pages.yml`). `scripts/make-preview.mjs` prefixes links
with `/mugshot-agency` and marks every page `noindex`, so the preview never
appears in search results.

- One-time setup: **Settings → Pages → Build and deployment → Source: GitHub
  Actions**.
- Redeploy by hand: **Actions → Preview on GitHub Pages → Run workflow**.
- Same build locally: `npm run build:preview -- --base=/mugshot-agency`.

## Publishing a state page

All 50 state pages exist but are `noindex` and left out of the sitemap until
counsel reviews that state. To publish one:

1. Have counsel confirm its entry in `src/data/state-laws.ts` (citation,
   summary, sources) and set `reviewed: true`.
   Review the drafted page copy for that state at the same time
   (`src/data/state-local-content.ts`, shown in the review document); it
   renders only once the entry is reviewed.
2. `npm run report:state-laws` and `npm run build`.

The build fails if a published state page shares more than 60% of its text
with another. To measure that before any review, render every state as if
reviewed (never for a deploy):

```sh
STATE_PUBLISH_ALL=1 npx astro build && STATE_SIMILARITY_REPORT=1 npm run verify
```

With the drafted copy, the most similar pair is 54%.

## Where things live

| What | Where |
| --- | --- |
| Brand name, domain, contact details, nav | `src/config/site.ts` |
| The six services (all copy, FAQs, SEO text) | `src/data/services.ts` |
| General FAQs / process steps | `src/data/faqs.ts`, `src/data/process.ts` |
| Page layout, SEO tags, structured data | `src/layouts/BaseLayout.astro` |
| Brand colours and fonts | `src/styles/global.css` — rules in `docs/DESIGN.md` |
| Legal disclosures and form consent text | `src/config/compliance.ts` |
| State mugshot law research + per-state content | `src/data/state-laws.ts` → `docs/STATE_LAW_REVIEW.md` |
| State pages | `src/pages/states/` (bordering states in `src/data/state-neighbors.ts`) |
| Resource articles (Markdown) | `src/content/resources/` — schema in `src/content.config.ts` |

Read `PROJECT_CONTEXT.md` before editing content, `docs/COMPLIANCE.md` for
the compliance checklist, `docs/SEO.md` for the technical SEO setup and
launch switches, `docs/DESIGN.md` for the design system, `docs/LAUNCH.md` for
going live, and `CONTENT_PENDING.md` for what is still needed
before launch.
