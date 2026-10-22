# Compliance groundwork (Phase 2)

What the site does to stay on the right side of consumer protection, privacy
and unauthorized-practice rules, and what still needs a lawyer's sign-off.
**This is a working checklist, not legal advice.** Items marked ⚖️ need counsel.

## 1. Not a law firm

| Done | Item |
| --- | --- |
| ✅ | "Not a law firm / no legal advice" disclosure in the footer of every page, on the contact page, the consent notice, Disclaimer and Terms — all from one string in `src/config/compliance.ts` |
| ✅ | "No attorney–client relationship" statement on the contact page and Terms |
| ✅ | Legal topics (expungement, sealing, defamation) described only in general terms, always pointing to a licensed attorney |
| ✅ | Build fails if any page says "our attorneys", "law office", "legal services", "attorney at law", "Esq." or calls the company a law firm, or mentions an unrelated brand (`scripts/verify-site.mjs`) |
| ⚖️ | Confirm that the services as described (preparing and submitting removal requests on a client's behalf) do not amount to the practice of law in any state |

## 2. Advertising claims (FTC Act § 5 and state consumer protection laws)

| Done | Item |
| --- | --- |
| ✅ | No guarantees of removal, rankings or timelines; build fails on "guaranteed removal", "100% results" and similar |
| ✅ | No invented statistics, client counts, awards or press logos |
| ✅ | The homepage search-results illustration is labelled "Illustration only. Results vary by situation." |
| ✅ | Mugshot service FAQ and Terms tell consumers they can make free removal requests themselves where state law allows, so the service is never presented as the only route |
| ✅ | Build fails on offers to write, post or buy reviews |
| ⬜ | Testimonials: none yet. When added, only real clients, with written consent, typical results disclosed (FTC Endorsement Guides; 2024 Rule on Consumer Reviews and Testimonials, 16 CFR Part 465) |

## 3. State mugshot laws

Research for all 50 states is in `src/data/state-laws.ts`; the review copy is
`docs/STATE_LAW_REVIEW.md` (regenerate with `npm run report:state-laws`).
Summary: 18 states with a law identified, 8 unconfirmed, 24 none found — **0 reviewed**.

| Done | Item |
| --- | --- |
| ✅ | Research compiled with sources and open questions per state |
| ✅ | Every entry starts `reviewed: false`. State pages (Phase 3) show a "being reviewed" notice instead of unreviewed research, and stay `noindex` and out of the sitemap until the entry is reviewed |
| ⚖️ | Review each entry against the current official code and set `reviewed: true` |
| ⚖️ | Most laws regulate **publishers** that charge removal fees, or agencies releasing photos. Confirm how they apply to a third-party service that charges its clients, particularly Illinois and Ohio ("any person engaged in publishing…"), Louisiana (fee demands prosecutable as extortion) and Texas ch. 109 |
| ⚖️ | Operating rule to confirm: the company never pays a publisher's removal fee on a client's behalf in a state that prohibits charging it |

## 4. Privacy and messaging

| Done | Item |
| --- | --- |
| ✅ | Draft Privacy Policy and Terms of Service at `/legal/privacy/` and `/legal/terms/`, shown with a "Draft — under legal review" banner and kept `noindex` until approved |
| ✅ | Consent wording for the future consultation form (`formConsent` in `src/config/compliance.ts`, rendered by `ConsentNotice.astro`): unticked SMS checkbox, consent not a condition of service, STOP opt-out (TCPA); email contact limited to the request (CAN-SPAM for any marketing email) |
| ✅ | No analytics or advertising cookies are used, and the Privacy Policy says so. Update the policy before adding any |
| ⚖️ | Approve Privacy Policy and Terms text; fill in governing law and privacy contact; then set `legalDraft = false`, add `legalEffectiveDate`, and remove the pages from `site.noindexPaths` |
| ⚖️ | Confirm obligations under state privacy laws (e.g. CCPA/CPRA) given expected client volume and the sensitivity of criminal-record information |

## 5. Accessibility

| Done | Item |
| --- | --- |
| ✅ | Semantic headings (one `<h1>` per page, enforced), skip link, visible focus styles, labelled navigation, `aria-current` on active links |
| ✅ | Lighthouse accessibility 100 on every audited page type, including color contrast (see `docs/SEO.md`); legal disclaimers meet contrast minimums and the homepage illustration's disclaimer is exposed to screen readers |
| ⬜ | Full manual WCAG 2.2 AA audit (keyboard, screen reader) before launch (Phase 7) |
