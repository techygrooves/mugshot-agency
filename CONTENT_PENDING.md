# CONTENT_PENDING.md

Items needed before launch. Nothing here may be filled in with invented text.

| Item | Status | Where it goes |
| --- | --- | --- |
| Domain name | Placeholder `nationalreputationdefense.com` — confirm or replace | `src/config/site.ts` → `url`, then set `urlConfirmed: true` (robots.txt blocks all crawlers until then — see `docs/SEO.md`) |
| Business email / phone | Not provided | `src/config/site.ts` → `contact` |
| Consultation form | **Live** — Formspree endpoint `xeaajnjj`, on `/contact/` and the home page | `src/components/ConsultationForm.astro`, `site.forms` |
| Privacy Policy | Drafted — needs counsel review and a privacy contact | `src/pages/legal/privacy.astro`; then `legalDraft` in `src/config/compliance.ts` |
| Terms of Service | Drafted — needs counsel review and governing law | `src/pages/legal/terms.astro` |
| State mugshot-law review | Research done for all 50 states, 0 reviewed | `docs/STATE_LAW_REVIEW.md`, then `reviewed: true` in `src/data/state-laws.ts` |
| Open legal questions | See the ⚖️ items | `docs/COMPLIANCE.md` |
| Testimonials | None — only real clients with written consent | Not yet on site |
| State page local content | Drafted for all 50 states — review together with each state's law entry | `src/data/state-local-content.ts`; included in `docs/STATE_LAW_REVIEW.md` |

## Next build phases

1. ~~50 state pages~~ built (Phase 3); publish each after review + local content
2. ~~Resources~~: 11 guides (3 in Phase 3, 8 in Phase 6) — every service links at least one
3. ~~Consultation form~~ (Phase 7)
4. ~~Launch tooling~~ (Phase 8): Hostinger package, launch check, `docs/LAUNCH.md`. Remaining: domain, legal pages, Search Console
