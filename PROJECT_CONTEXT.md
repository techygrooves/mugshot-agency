# PROJECT_CONTEXT.md

Permanent rules for the National Reputation Defense website.

## Identity

- Company name: **National Reputation Defense**
- Business: online reputation management, serving **all 50 U.S. states**
- **Not a law firm.** The site must never present the company, its staff or
  its services as legal, never use attorney titles, and never give legal
  advice. It has no connection to, and must not reference, any law practice.
- Inspiration for structure only: reputationdefender.com. Do not copy its
  text, imagery, trademarks or claims.

## Copy rules

1. **No guarantees.** Never promise removal, rankings or timelines.
   Removal decisions rest with third-party sites and search engines.
2. **No invented facts.** No made-up statistics, client counts, reviews,
   testimonials, awards, press logos or years in business. Testimonials only
   from real clients with written consent (FTC rules on reviews and
   endorsements).
3. **No fake reviews or deceptive content** — the company does not offer it,
   and the site must say so where relevant.
4. Legal topics (expungement, sealing, defamation) are described generally
   and always point the reader to a licensed attorney.
5. No pricing is published. Quotes follow a consultation.
6. Disclosure wording lives in `src/config/compliance.ts` — import it, never
   retype it. The build rejects prohibited claims (see `docs/COMPLIANCE.md`).
7. State law content comes only from `src/data/state-laws.ts` entries marked
   `reviewed: true`.

## SEO rules

- One `<h1>` per page; unique title (≤ 65 chars including the brand suffix)
  and meta description (≤ 165 chars) on every page — enforced by the build.
- Placeholder pages are listed in `site.noindexPaths`: they render `noindex`
  and are excluded from the sitemap until finished.
- Structured data: Organization (every page), Service + FAQPage +
  BreadcrumbList (service pages). **Never** add LocalBusiness entries with
  addresses the company does not actually have.
- State pages (planned) must carry real, state-specific content — not
  name-swapped copies — to avoid Google's doorway/scaled-content penalties.
