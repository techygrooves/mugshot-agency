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
npm run preview    # serve the built site
```

`npm run build` fails if any page has a missing, duplicated or over-long title
or description, more than one `<h1>`, a broken internal link, or placeholder
content on an indexable page, or a prohibited claim such as a guaranteed
result or presenting the company as a law firm (`scripts/verify-site.mjs`).

## Where things live

| What | Where |
| --- | --- |
| Brand name, domain, contact details, nav | `src/config/site.ts` |
| The six services (all copy, FAQs, SEO text) | `src/data/services.ts` |
| General FAQs / process steps | `src/data/faqs.ts`, `src/data/process.ts` |
| Page layout, SEO tags, structured data | `src/layouts/BaseLayout.astro` |
| Brand colours and fonts | `src/styles/global.css` |
| Legal disclosures and form consent text | `src/config/compliance.ts` |
| State mugshot law research | `src/data/state-laws.ts` → `docs/STATE_LAW_REVIEW.md` |

Read `PROJECT_CONTEXT.md` before editing content, `docs/COMPLIANCE.md` for
the compliance checklist, and `CONTENT_PENDING.md` for what is still needed
before launch.
