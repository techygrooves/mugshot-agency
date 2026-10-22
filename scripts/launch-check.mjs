/**
 * launch-check.mjs — is the site ready to go live? Reads the project's own
 * configuration and the built site, and reports:
 *
 *   BLOCKER  must be fixed before launch
 *   WARN     launch is possible, but fix soon
 *   OK       done
 *
 *   npm run launch-check            (after npm run build)
 *
 * Exits 1 if there are blockers, so it can gate a deploy.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/config/site.ts';
import { legalDraft, legalEffectiveDate } from '../src/config/compliance.ts';
import { stateLaws } from '../src/data/state-laws.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const read = (p) => fs.readFile(path.join(DIST, p), 'utf8').catch(() => null);

const results = [];
const check = (level, label, detail = '') => results.push({ level, label, detail });

// Domain
if (site.urlConfirmed) check('OK', `Production domain confirmed: ${site.url}`);
else
  check(
    'BLOCKER',
    'Production domain not confirmed',
    `site.url is the placeholder ${site.url}. Set the real domain and urlConfirmed: true in src/config/site.ts — until then robots.txt blocks all search engines and canonical URLs point at the placeholder.`,
  );

// Legal pages
if (!legalDraft && legalEffectiveDate) check('OK', `Privacy Policy and Terms final (effective ${legalEffectiveDate})`);
else
  check(
    'BLOCKER',
    'Privacy Policy and Terms are still drafts',
    'The consultation form collects personal information. Have counsel approve both, fill in governing law and the privacy contact, then set legalDraft = false and legalEffectiveDate in src/config/compliance.ts and remove them from site.noindexPaths.',
  );

// Form
if (/^https:\/\/formspree\.io\/f\/\w+$/.test(site.forms.consultation)) check('OK', `Consultation form endpoint set (${site.forms.consultation})`);
else check('BLOCKER', 'Consultation form endpoint missing or invalid');
check('WARN', 'Send one real test submission after upload', 'Formspree sends the account owner a one-time confirmation email for a new form; confirm it, then check the submission arrives.');

// Contact details
if (site.contact.email || site.contact.phone) check('OK', 'Business contact details published');
else check('WARN', 'No business email or phone on the site', 'The form is the only way to reach you. Optional, but a phone number or email builds trust.');

// Search engines
if (site.verification.google) check('OK', 'Google Search Console verification tag set');
else check('WARN', 'Google Search Console not verified yet', 'After launch, add the property and paste the verification code into site.verification.google (or verify by DNS in Hostinger).');

// States
const reviewed = stateLaws.filter((s) => s.reviewed).length;
if (reviewed === 50) check('OK', 'All 50 state pages reviewed and published');
else check('WARN', `${reviewed}/50 state pages reviewed`, 'Unreviewed state pages are live but noindex, with a "being reviewed" notice. Fine to launch; publish states as counsel approves them.');

// Built output
const robots = await read('robots.txt');
if (robots === null) check('BLOCKER', 'No build found', 'Run npm run build (or npm run package:hostinger) first.');
else {
  const blocked = /Disallow: \/\s*$/m.test(robots);
  if (site.urlConfirmed && blocked) check('BLOCKER', 'robots.txt still blocks crawlers', 'Rebuild after setting urlConfirmed.');
  else if (!blocked) check('OK', 'robots.txt allows crawling and lists the sitemap');
  const sitemap = await read('sitemap-0.xml');
  const urls = sitemap?.match(/<loc>/g)?.length ?? 0;
  if (urls) check('OK', `Sitemap lists ${urls} pages`);
  const home = await read('index.html');
  if (home && !home.includes(`<link rel="canonical" href="${new URL('/', site.url).href}">`)) check('BLOCKER', 'Home page canonical does not match site.url');
  const htaccess = await read('.htaccess');
  if (htaccess) {
    check('OK', 'Hostinger .htaccess present (HTTPS, headers, caching, 404)');
    if (site.urlConfirmed && !htaccess.includes('One canonical host')) check('BLOCKER', '.htaccess has no canonical host redirect', 'Re-run npm run package:hostinger after setting urlConfirmed.');
  } else check('WARN', 'No .htaccess in dist/', 'For Hostinger, build with npm run package:hostinger.');
}

const order = { BLOCKER: 0, WARN: 1, OK: 2 };
const icon = { BLOCKER: '✗ BLOCKER', WARN: '! WARN   ', OK: '✓ OK     ' };
results.sort((a, b) => order[a.level] - order[b.level]);
for (const r of results) {
  console.log(`${icon[r.level]} ${r.label}`);
  if (r.detail) console.log(`            ${r.detail}`);
}
const blockers = results.filter((r) => r.level === 'BLOCKER').length;
console.log(blockers ? `\nNot ready to launch: ${blockers} blocker(s).` : '\nReady to launch.');
process.exitCode = blockers ? 1 : 0;
