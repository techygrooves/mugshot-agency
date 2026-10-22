# CONTENT_PENDING.md

Items needed before launch. Nothing here may be filled in with invented text.

| Item | Status | Where it goes |
| --- | --- | --- |
| Domain name | Placeholder `nationalreputationdefense.com` — confirm or replace | `src/config/site.ts` → `url`, then set `urlConfirmed: true` |
| Business email / phone | Not provided | `src/config/site.ts` → `contact` |
| Consultation form | Placeholder (to be implemented later) | `src/pages/contact.astro` — remove from `noindexPaths` when live |
| Privacy Policy | Drafted — needs counsel review and a privacy contact | `src/pages/legal/privacy.astro`; then `legalDraft` in `src/config/compliance.ts` |
| Terms of Service | Drafted — needs counsel review and governing law | `src/pages/legal/terms.astro` |
| State mugshot-law review | Research done for all 50 states, 0 reviewed | `docs/STATE_LAW_REVIEW.md`, then `reviewed: true` in `src/data/state-laws.ts` |
| Open legal questions | See the ⚖️ items | `docs/COMPLIANCE.md` |
| Testimonials | None — only real clients with written consent | Not yet on site |

## Next build phases

1. 50 state pages (`/states/<state>/`) with researched, reviewed state data
2. Resources / blog with 10–15 launch articles
3. Consultation form + consent language (TCPA), analytics, Search Console
