/**
 * Compliance copy, stored once so every page says the same thing.
 *
 * Changing any of these strings changes a legal disclosure. Check
 * docs/COMPLIANCE.md and get counsel's sign-off first.
 */
import { site } from './site';

/** Draft status of the legal pages. Flip to false only after counsel review. */
export const legalDraft = true;

/** Effective date shown on the legal pages once they are final. */
export const legalEffectiveDate: string | null = null;

export const disclosures = {
  notLawFirm: `${site.name} is not a law firm and does not provide legal advice.`,
  noAttorneyClient: 'Contacting us or using our services does not create an attorney–client relationship.',
  noGuarantee:
    'Results vary and are never guaranteed; removal decisions rest with third-party websites and search engines.',
  freeRights:
    'Some states give you the right to request removal of a booking photo from certain websites free of charge. You can always make these requests yourself.',
} as const;

/**
 * Consent language for the consultation form (Phase 7). Checkbox must be
 * unticked by default, and consent to calls/texts must not be a condition of
 * service. Written to support TCPA and CAN-SPAM requirements; counsel to confirm.
 */
export const formConsent = {
  contact:
    `By submitting this form, you agree that ${site.name} may contact you by email or phone about your request. ` +
    'We use what you share only to respond to your request and provide services you ask for.',
  sms:
    `I agree to receive calls and text messages from ${site.name} about my request at the number provided, ` +
    'including by automated means. Consent is not a condition of service. Message and data rates may apply. ' +
    'Reply STOP to opt out.',
  privacyLink: '/legal/privacy/',
  termsLink: '/legal/terms/',
} as const;
