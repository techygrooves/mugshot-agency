# Design system (Phase 5)

The visual rules behind the site, so new pages look like they belong.
Tokens live in `src/styles/global.css`; components in `src/components/`.

## Brand

| Token | Value | Use |
| --- | --- | --- |
| `ink` / `navy-900` | `#0b1b33` | Headings, dark sections, logo |
| `navy-950` | `#071226` | Footer |
| `navy-50` / `navy-100` | `#f4f7fb` / `#e6ecf5` | Alternating section backgrounds, borders |
| `accent-700` | `#0b7a75` | Primary buttons, links, eyebrows — passes 4.5:1 with white text |
| `accent-800` | `#08605c` | Primary button hover |
| `accent-500` | `#14b8a6` | Accents **on dark backgrounds only**, icons |
| `accent-100` | `#d5f5f1` | Icon tiles |
| `gold-400` | `#e5b85c` | Draft / "coming soon" badges only |

Navy conveys stability and discretion; teal reads as protection without the
alarm of red. Red appears only in the homepage illustration's "Removed" tag.

**Type:** Plus Jakarta Sans (headings, `font-display`) and Inter (body),
self-hosted via Fontsource; Inter's latin subset is preloaded. Headings use
`text-balance`, paragraphs `text-wrap: pretty`, so lines don't end on a lone word.

## Layout

- Content width: `.container-x` (max 72rem, 16/24/32px gutters).
- Sections alternate white and `navy-50`; each page ends with `CtaBand`.
- Spacing rhythm: sections `py-16 md:py-20` (inner) or `py-20 md:py-24` (home).
- Breakpoints: phone < 640px, full navigation from 1024px (`lg`).

## Components

| Component | Notes |
| --- | --- |
| `Header` | Sticky; shadow once scrolled; underline on the active link. Below 1024px a menu button (icon swaps to ✕, Escape closes, focus returns to the button). Below 640px a **sticky consultation bar** slides in after the first screen, hides while the menu is open, and is omitted on `/contact/`. |
| `PageHero` | Dark banner for inner pages. Pass `slot="aside"` (e.g. `AssuranceCard`) to fill the right column; otherwise a faint shield mark balances it. |
| `AssuranceCard` | Four commitments about *how we work* — never claims about results. |
| `ServiceCard` | Compact row on phones, tall card from 640px. |
| `CtaBand`, `FaqList`, `SectionHeading`, `Breadcrumbs`, `Icon`, `Logo` | As named. Icons are inline 24px line icons in `Icon.astro`. |
| `.btn-primary` / `.btn-secondary` / `.btn-on-dark` | The only three button styles. |

## Accessibility rules

- Text contrast ≥ 4.5:1 — including disclaimers and fine print, which are
  legal text, not decoration. Lighthouse accessibility is 100 on every page
  type (see `docs/SEO.md`).
- One `<h1>` per page and no skipped heading levels.
- Decorative visuals are `aria-hidden`; any disclaimer attached to them is not.
- Motion is subtle and switched off under `prefers-reduced-motion`.
- No inline scripts or styles (the CSP in `public/_headers` forbids them).

## Imagery

No stock photography of people: it would read as invented clients. The site
uses the brand mark, icons and the illustrative search-results card instead.
If real photography is added later, it must not imply client outcomes.
