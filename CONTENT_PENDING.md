# CONTENT_PENDING.md

Items needed before launch. Nothing here may be filled in with invented text.

| Item | Status | Where it goes |
| --- | --- | --- |
| Domain name | Placeholder `nationalreputationdefense.com` — confirm or replace | `src/config/site.ts` → `url`, then set `urlConfirmed: true` |
| Business email / phone | Not provided | `src/config/site.ts` → `contact` |
| Consultation form | Placeholder (to be implemented later) | `src/pages/contact.astro` — remove from `noindexPaths` when live |
| Privacy Policy | Placeholder — needs counsel-reviewed text | `src/pages/legal/privacy.astro` |
| Terms of Service | Placeholder — needs counsel-reviewed text | `src/pages/legal/terms.astro` |
| State mugshot-law review | Confirm with counsel how state laws on charging for mugshot removal apply to a third-party service | Before launch / state pages |
| Testimonials | None — only real clients with written consent | Not yet on site |

## Next build phases

1. 50 state pages (`/states/<state>/`) with researched, reviewed state data
2. Resources / blog with 10–15 launch articles
3. Consultation form + consent language (TCPA), analytics, Search Console
