/**
 * State-by-state mugshot law research (Phase 2).
 *
 * ⚠️  UNVERIFIED RESEARCH — NOT FOR PUBLICATION AS-IS.
 * Compiled from web research in October 2026 without access to every official
 * statute database. Each entry must be checked against the current official
 * code by counsel and marked `reviewed: true` before any page publishes it.
 * The state pages planned for Phase 3 will refuse to render an entry that is
 * not reviewed.
 *
 * status:
 *   'identified'  — a mugshot-specific law was found in an official or
 *                   reliable source; citation and summary still need review.
 *   'unconfirmed' — bills or conflicting secondary sources were found, but
 *                   enactment or current text could not be confirmed.
 *   'none-found'  — our research did not identify a mugshot-specific law.
 *                   This is NOT a statement that none exists.
 *
 * Almost all of these laws regulate PUBLISHERS that charge to remove photos
 * (or agencies that release them). How each applies to a third-party
 * reputation service is one of the open questions in docs/COMPLIANCE.md.
 */
export type LawStatus = 'identified' | 'unconfirmed' | 'none-found';

export type StateLaw = {
  name: string;
  abbr: string;
  slug: string;
  status: LawStatus;
  /** Statute or bill as found. "(to be confirmed)" marks a known gap. */
  citation?: string;
  year?: number;
  /** Plain-language summary of what the research found. */
  summary?: string;
  /** Open questions for the reviewer. */
  notes?: string;
  /**
   * State-specific paragraphs written for the state page (Phase 6): local
   * record-relief process, how arrests are published there, common sources.
   * Required in practice: the build rejects indexable state pages that are
   * too similar to each other.
   */
  localContent?: string[];
  sources: string[];
  reviewed: boolean;
};

const NCSL = 'https://www.ncsl.org/technology-and-communication/mug-shots-and-booking-photo-websites';

const s = (
  name: string,
  abbr: string,
  status: LawStatus,
  rest: Partial<Omit<StateLaw, 'name' | 'abbr' | 'slug' | 'status' | 'reviewed'>> = {},
): StateLaw => ({
  name,
  abbr,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  status,
  sources: [],
  ...rest,
  reviewed: false,
});

export const stateLaws: StateLaw[] = [
  s('Alabama', 'AL', 'none-found'),
  s('Alaska', 'AK', 'none-found'),
  s('Arizona', 'AZ', 'none-found', {
    notes: 'One secondary source cites a 2019 bill (HB 2191) on pay-to-remove schemes; another describes it as a data-broker measure. Not confirmed.',
  }),
  s('Arkansas', 'AR', 'identified', {
    citation: '2021 Act (citation to be confirmed)',
    year: 2021,
    summary:
      'Privately owned mugshot websites that request or accept a fee must remove a booking photograph within five business days of a written request.',
    sources: [NCSL],
  }),
  s('California', 'CA', 'identified', {
    citation: 'Cal. Civ. Code § 1798.91.1 (SB 1027)',
    year: 2014,
    summary:
      'Publishers of booking photographs may not solicit or accept payment to remove, correct or modify a photo, or to refrain from publishing it. The person pictured may recover the greater of actual damages or $1,000 per violation.',
    notes: 'Separate, more recent laws reportedly limit when law enforcement may post booking photos on social media (Penal Code § 13665); confirm bill numbers and effective dates.',
    sources: ['https://www.leginfo.ca.gov/pub/13-14/bill/sen/sb_1001-1050/sb_1027_bill_20140815_chaptered.htm'],
  }),
  s('Colorado', 'CO', 'identified', {
    citation: 'C.R.S. § 24-72-305.5 (HB 14-1047)',
    year: 2014,
    summary:
      'It is unlawful to obtain a booking photograph knowing it will be published where removal requires a fee. People requesting booking photos must sign a statement that they will not use them that way.',
    notes: 'Penalty subsection not retrieved. A source also cites a law-enforcement removal duty after acquittal, dismissal or sealing; confirm.',
    sources: ['https://colorado.public.law/statutes/crs_24-72-305.5', 'https://www.aclu-co.org/legislation/hb14-1047-remove-booking-photographs-internet/'],
  }),
  s('Connecticut', 'CT', 'unconfirmed', {
    notes: 'Secondary sources cite a free-removal duty after dismissal or acquittal; no statute text found. Connecticut erasure law (C.G.S. § 54-142a) is relevant context.',
    sources: ['https://law.justia.com/codes/connecticut/title-54/chapter-961a/'],
  }),
  s('Delaware', 'DE', 'none-found'),
  s('Florida', 'FL', 'identified', {
    citation: 'Fla. Stat. § 901.43',
    year: 2017,
    summary:
      'Anyone in the business of publishing arrest booking photographs may not solicit or accept a fee to remove them. After a written request to the publisher’s registered agent, the photo must be removed free of charge within 10 calendar days and not republished. Courts may order removal and impose a civil penalty of $1,000 per day for noncompliance.',
    notes: 'A 2021 bill (HB 755) proposed widening coverage to ad-funded publishers; confirm whether enacted.',
    sources: ['https://www.flsenate.gov/Laws/Statutes/2024/901.43'],
  }),
  s('Georgia', 'GA', 'identified', {
    citation: 'O.C.G.A. Title 35, ch. 1 (§ 35-1-18 or § 35-1-19 — to be confirmed)',
    year: 2013,
    summary:
      'Law enforcement agencies may not release booking photographs for publication on websites that charge to remove them, and requesters must affirm how photos will be used. Sources also describe free removal on request when a case ended without conviction.',
    notes: 'Section numbering conflicts between sources; a 2025–26 bill (HB 10) on remove-for-pay sites is pending or recent — confirm status.',
    sources: [NCSL, 'https://codes.findlaw.com/ga/title-35-law-enforcement-officers-and-agencies/ga-code-sect-35-1-19/'],
  }),
  s('Hawaii', 'HI', 'none-found'),
  s('Idaho', 'ID', 'none-found'),
  s('Illinois', 'IL', 'identified', {
    citation: '815 ILCS 505/2QQQ',
    year: 2013,
    summary:
      'It is an unlawful practice under the Consumer Fraud Act for anyone publishing criminal record information, including booking photos, to solicit or accept a fee to remove, correct or modify it. Amended in 2019 (Public Act 101-0431) to add a duty to correct errors within five business days.',
    sources: ['https://ilga.gov/Documents/legislation/ilcs/documents/081505050K2QQQ.htm'],
  }),
  s('Indiana', 'IN', 'none-found'),
  s('Iowa', 'IA', 'unconfirmed', {
    notes: 'House File 47 (2025) would delay law-enforcement release of booking photos until conviction; advanced in subcommittee. Enactment not confirmed.',
  }),
  s('Kansas', 'KS', 'none-found'),
  s('Kentucky', 'KY', 'identified', {
    citation: '2016 Act (KRS citation to be confirmed)',
    year: 2016,
    summary:
      'Prohibits commercial use of booking photographs and creates a right of action for people whose removal requests are not honored.',
    notes: 'Summary is from NCSL only; earlier bills (2014 HB 51, 2015 HB 350) died. Confirm bill number and KRS section.',
    sources: [NCSL],
  }),
  s('Louisiana', 'LA', 'identified', {
    citation: 'Act 281 of 2022 (SB 24) (codified section to be confirmed)',
    year: 2022,
    summary:
      'Remove-for-pay websites must remove and destroy a booking photo within seven days of a request, without a fee, when the person was acquitted, not prosecuted, or had the charge expunged, vacated or pardoned and provides proof. Demanding payment can be prosecuted as extortion. Law enforcement may release booking photos only in listed circumstances (expanded by Act 303 of 2023).',
    sources: [NCSL, 'https://legis.la.gov/Legis/ViewDocument.aspx?d=1262041'],
  }),
  s('Maine', 'ME', 'none-found'),
  s('Maryland', 'MD', 'identified', {
    citation: 'Md. Code, Com. Law § 14-1324 (HB 744)',
    year: 2015,
    summary:
      'Websites that charge to remove arrest photos must remove a photo within 30 days of a request, without a fee, when the related record was expunged or shielded or the judgment vacated. Violations are unfair or deceptive trade practices under the Maryland Consumer Protection Act.',
    sources: ['https://mgaleg.maryland.gov/2015RS/fnotes/bil_0004/hb0744.pdf'],
  }),
  s('Massachusetts', 'MA', 'none-found'),
  s('Michigan', 'MI', 'none-found'),
  s('Minnesota', 'MN', 'unconfirmed', {
    notes: '2014 bills (HF 1940, HF 1933) would have created civil liability for mugshot websites; enactment not confirmed.',
    sources: ['https://www.revisor.mn.gov/bills/88/2014/0/HF/1940/versions/latest'],
  }),
  s('Mississippi', 'MS', 'none-found'),
  s('Missouri', 'MO', 'unconfirmed', {
    notes: 'NCSL entries conflict: one lists a removal-on-request law, another lists the 2014 bill as failed. Check RSMo chapters 407 and 610.',
    sources: [NCSL],
  }),
  s('Montana', 'MT', 'none-found'),
  s('Nebraska', 'NE', 'none-found'),
  s('Nevada', 'NV', 'none-found'),
  s('New Hampshire', 'NH', 'none-found'),
  s('New Jersey', 'NJ', 'identified', {
    citation: 'P.L. 2017 (S-1840/A-2085) (N.J.S.A. citation to be confirmed)',
    year: 2017,
    summary:
      'Online publishers of mugshots and arrest information may not charge a fee to remove it. Affected people may sue for damages, attorney fees and, for willful or reckless violations, punitive damages.',
    sources: ['https://lsnjlaw.org/Criminal-Charges-and-Convictions/Prisoner-Reentry/Other-Legal-Rights/Pages/Mugshot-Extortion-Publishers.aspx'],
  }),
  s('New Mexico', 'NM', 'none-found'),
  s('New York', 'NY', 'unconfirmed', {
    notes: 'Reported 2019 amendment to the Freedom of Information Law gives agencies discretion to withhold booking photos absent a law-enforcement purpose. Confirm citation (Public Officers Law § 89).',
    sources: ['https://www.nyclu.org/resources/policy/legislations/legislative-memo-mugshot-and-booking-information-ban'],
  }),
  s('North Carolina', 'NC', 'unconfirmed', {
    notes: 'H 778 (2023) — free removal within seven business days after dismissal, acquittal or expunction, $100/day damages — passed the House; final enactment not confirmed.',
    sources: ['https://lrs.sog.unc.edu/node/538405'],
  }),
  s('North Dakota', 'ND', 'none-found'),
  s('Ohio', 'OH', 'identified', {
    citation: 'Ohio Rev. Code § 2927.22 (HB 6)',
    year: 2018,
    summary:
      'Anyone publishing criminal record information, including booking photos, may not solicit or accept payment to remove, correct or stop publishing it. A violation is a first-degree misdemeanor, and the person harmed may recover $10,000 or actual and punitive damages, whichever is greater.',
    sources: ['https://codes.ohio.gov/ohio-revised-code/section-2927.22'],
  }),
  s('Oklahoma', 'OK', 'unconfirmed', {
    notes: 'SB 379 (2025) would require free removal on written request; enactment not confirmed.',
    sources: ['https://oklegislature.gov/cf_pdf/2025-26%20INT/SB/SB379%20INT.PDF'],
  }),
  s('Oregon', 'OR', 'identified', {
    citation: 'ORS 646A.806',
    year: 2013,
    summary:
      'Websites that charge to remove arrest photos must remove the photo and personal information free of charge within 30 days of a written request with proof that charges were dismissed, the person was acquitted, the charge was reduced to a violation, or the conviction was set aside. Violations are unlawful trade practices.',
    notes: 'A 2021 bill (HB 3273) reportedly expanded removal rights and limited agency releases; confirm the enacted text.',
    sources: ['https://www.oregonlaws.org/ors/646A.806'],
  }),
  s('Pennsylvania', 'PA', 'none-found'),
  s('Rhode Island', 'RI', 'none-found'),
  s('South Carolina', 'SC', 'identified', {
    citation: '2016 Act (S.C. Code Title 17, section to be confirmed)',
    year: 2016,
    summary:
      'It is unlawful to require payment to remove arrest and booking records from a website. Publishers must remove records without a fee within a set period when charges were dismissed or discharged or the person was found not guilty.',
    sources: [NCSL, 'https://www.scstatehouse.gov/sess121_2015-2016/prever/255_20150512.htm'],
  }),
  s('South Dakota', 'SD', 'none-found'),
  s('Tennessee', 'TN', 'none-found'),
  s('Texas', 'TX', 'identified', {
    citation: 'Tex. Bus. & Com. Code ch. 109 (SB 1289)',
    year: 2013,
    summary:
      'Regulates businesses that publish criminal record information and charge $150 or more to remove it, or any fee to correct it, including duties to correct inaccurate information.',
    notes: 'A 2023 law (SB 509) reportedly made booking photos confidential by default until conviction; confirm.',
    sources: ['https://texas.public.law/statutes/tex._bus._&_com._code_section_109.002'],
  }),
  s('Utah', 'UT', 'identified', {
    citation: 'Utah Code § 17-22-30 (renumbered 2025 — new section to be confirmed)',
    year: 2013,
    summary:
      'Sheriffs may not provide booking photos for publish-for-pay websites. Those sites must remove photos on request within set deadlines, with limits on removal fees and faster free removal after dismissal, acquittal or expungement (amended 2021).',
    sources: ['https://le.utah.gov/xcode/Title17/Chapter22/C17-22-S30_2024050120240501.pdf', 'https://le.utah.gov/~2021/bills/hbillenr/HB0228.pdf'],
  }),
  s('Vermont', 'VT', 'identified', {
    citation: '9 V.S.A. § 4191 (Act 62)',
    year: 2015,
    summary:
      'A person who posts a booking photograph online may not solicit or accept a fee to remove, correct or stop posting it when the person pictured asks.',
    sources: ['https://legislature.vermont.gov/statutes/section/09/117/04191'],
  }),
  s('Virginia', 'VA', 'identified', {
    citation: 'Va. Code § 8.01-40.3',
    year: 2015,
    summary:
      'Anyone who publishes a person’s arrest or charge record and solicits or accepts payment to remove it is liable for the greater of actual damages or $500, plus attorney fees and costs.',
    sources: ['https://rulesofcivilprocedure.com/va/8-01/40-3/'],
  }),
  s('Washington', 'WA', 'none-found'),
  s('West Virginia', 'WV', 'unconfirmed', {
    notes: 'HB 4621 (2024) would make booking photos non-public with exceptions and require free removal by fee-charging sites; passed the House 54–46. Enactment not confirmed.',
    sources: ['https://www.wvlegislature.gov/Bill_Text_HTML/2024_SESSIONS/RS/bills/hb4621%20sub%20rev.pdf'],
  }),
  s('Wisconsin', 'WI', 'none-found'),
  s('Wyoming', 'WY', 'identified', {
    citation: 'Wyo. Stat. § 40-12-601 (SF 53)',
    year: 2015,
    summary:
      'Website operators who charge to remove arrest photos must remove the photo, name and personal information free of charge within 30 days of a written request.',
    sources: ['https://wyomingdigitalcollections.ptfs.com/aw-server/rest/product/purl/WSL/s/693aad86-0b13-43cc-beee-da7932510cd5'],
  }),
];

export const getStateLaw = (slug: string) => stateLaws.find((st) => st.slug === slug);

/**
 * A state page is indexable only once counsel has reviewed its entry. Until
 * then it renders noindex, stays out of the sitemap, and its law section shows
 * a "being reviewed" notice instead of unverified research.
 */
export const isPublishable = (law: StateLaw) => law.reviewed;
