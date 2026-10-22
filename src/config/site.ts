/**
 * Single source of truth for brand and business facts.
 *
 * Import from here — never retype the company name, domain or a contact
 * detail into a component. Anything not yet confirmed by the client is
 * `null` and must stay that way until it is; see CONTENT_PENDING.md.
 */
export const site = {
  name: 'National Reputation Defense',
  shortName: 'NRD',
  tagline: 'Online reputation management, nationwide',
  description:
    'National Reputation Defense helps people and businesses in all 50 states remove or suppress mugshots, negative search results and exposed personal information.',

  /** PLACEHOLDER — replace once the domain is purchased. */
  url: 'https://www.nationalreputationdefense.com',
  urlConfirmed: false,

  serviceArea: 'All 50 U.S. states',

  /** Not yet provided. The contact page renders a placeholder while null. */
  contact: {
    email: null as string | null,
    phone: null as string | null,
  },

  /** Routes that are placeholders: rendered with noindex and left out of the sitemap. */
  noindexPaths: ['/contact/', '/legal/privacy/', '/legal/terms/'] as string[],
} as const;

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'How It Works', href: '/how-it-works/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
] as const;

export const cta = { label: 'Free Consultation', href: '/contact/' } as const;
