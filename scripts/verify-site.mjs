/**
 * verify-site.mjs — fails the build on SEO and link regressions.
 *
 * Checks every built HTML page in dist/ for:
 *   - internal links that point at a page that does not exist
 *   - a missing or duplicated <title> or meta description
 *   - titles over 65 or descriptions over 165 characters (truncated in results)
 *   - exactly one <h1>
 *   - a canonical tag on every indexable page
 *   - placeholder pages (data-placeholder) that are not noindex
 *   - prohibited claims in visible text (see CLAIM_RULES / docs/COMPLIANCE.md)
 *   - indexable state pages whose main content is too similar to another
 *     state page (Google treats near-duplicate location pages as doorways)
 *
 * Set STATE_SIMILARITY_REPORT=1 to print similarity for every state page,
 * including unreviewed (noindex) ones, without failing the build.
 * Run with: npm run verify   (after a build)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

async function collectHtml(dir, found = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await collectHtml(full, found);
    else if (entry.name.endsWith('.html')) found.push(full);
  }
  return found;
}

const exists = (file) => fs.access(file).then(() => true, () => false);

async function resolves(href) {
  const clean = href.split(/[?#]/)[0].replace(/^\/+/, '').replace(/\/$/, '');
  if (clean === '') return exists(path.join(DIST, 'index.html'));
  if (path.extname(clean)) return exists(path.join(DIST, clean));
  return (await exists(path.join(DIST, clean, 'index.html'))) || exists(path.join(DIST, `${clean}.html`));
}

/**
 * Claims the site must never make. Each rule is checked against the visible
 * text of every page; `allow` lists the exact phrasings that are fine because
 * they deny the claim (e.g. "not a law firm").
 */
const CLAIM_RULES = [
  { name: 'guaranteed results', pattern: /\b(guaranteed?|100%)\b[^.]{0,40}\b(removal|removed|results?|deleted|success)\b/gi, allow: [/\bno guaranteed results\b/i, /never guaranteed/i, /not guaranteed/i, /cannot guarantee/i, /can guarantee that/i, /Do you guarantee results/i, /cannot and do not guarantee/i] },
  { name: 'presents as legal practice', pattern: /\b(our (attorneys|lawyers|legal team)|attorneys? at law|esq\.|legal services|law office)\b/gi, allow: [] },
  { name: 'law firm claim', pattern: /[^.?]{0,30}\blaw firm\b/gi, allow: [/\bnot a law firm\b/i, /Are you a law firm/i] },
  { name: 'unrelated brand', pattern: /\bhoffman\b/gi, allow: [] },
  { name: 'fake reviews offered', pattern: /\b(buy|purchase|write|post)\s+(positive\s+)?reviews\b/gi, allow: [/never post fake/i] },
];

const visibleText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<head[\s\S]*?<\/head>/, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' '),
  );

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

/** Maximum share of 5-word sequences two indexable state pages may have in common. */
const MAX_STATE_SIMILARITY = 0.6;

const shingles = (text) => {
  const words = text.toLowerCase().match(/[a-z0-9']+/g) ?? [];
  const set = new Set();
  for (let i = 0; i + 5 <= words.length; i++) set.add(words.slice(i, i + 5).join(' '));
  return set;
};

const jaccard = (a, b) => {
  let shared = 0;
  for (const s of a) if (b.has(s)) shared++;
  return shared / (a.size + b.size - shared || 1);
};

const errors = [];
const statePages = [];
const titles = new Map();
const descriptions = new Map();
const links = new Map();

for (const file of await collectHtml(DIST)) {
  const page = `/${path.relative(DIST, file)}`;
  const html = await fs.readFile(file, 'utf8');
  const is404 = page === '/404.html';
  const noindex = /<meta name="robots" content="noindex/.test(html);

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;

  if (!title) errors.push(`${page}: missing <title>`);
  else if (title.length > 65) errors.push(`${page}: title is ${title.length} chars (max 65): "${title}"`);
  if (!description) errors.push(`${page}: missing meta description`);
  else if (description.length > 165) errors.push(`${page}: description is ${description.length} chars (max 165)`);
  if (h1s !== 1) errors.push(`${page}: has ${h1s} <h1> elements (expected 1)`);
  if (!noindex && !is404 && !/<link rel="canonical"/.test(html)) errors.push(`${page}: indexable page has no canonical`);
  if (/data-placeholder=/.test(html) && !noindex) errors.push(`${page}: placeholder content on an indexable page`);

  const text = visibleText(html);
  for (const rule of CLAIM_RULES) {
    for (const { 0: match, index: start } of text.matchAll(rule.pattern)) {
      const context = text.slice(Math.max(0, start - 40), start + match.length + 40);
      if (!rule.allow.some((ok) => ok.test(context))) errors.push(`${page}: prohibited claim (${rule.name}): "…${context.trim()}…"`);
    }
  }

  if (/^\/states\/[a-z-]+\/index\.html$/.test(page)) {
    const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
    statePages.push({ page, noindex, shingles: shingles(visibleText(main)) });
  }

  if (!is404) {
    titles.set(title, [...(titles.get(title) ?? []), page]);
    descriptions.set(description, [...(descriptions.get(description) ?? []), page]);
  }

  for (const [, href] of html.matchAll(/\bhref="(\/[^"/][^"]*|\/)"/g)) {
    if (!links.has(href)) links.set(href, new Set());
    links.get(href).add(page);
  }
}

for (const [title, pages] of titles) if (pages.length > 1) errors.push(`duplicate title "${title}" on ${pages.join(', ')}`);
for (const [, pages] of descriptions) if (pages.length > 1) errors.push(`duplicate description on ${pages.join(', ')}`);
for (const [href, pages] of links) {
  if (!(await resolves(href))) errors.push(`broken link ${href} on ${[...pages].join(', ')}`);
}

const report = process.env.STATE_SIMILARITY_REPORT === '1';
const compared = report ? statePages : statePages.filter((p) => !p.noindex);
let highest = { score: 0, pair: '' };
for (let i = 0; i < compared.length; i++) {
  for (let j = i + 1; j < compared.length; j++) {
    const score = jaccard(compared[i].shingles, compared[j].shingles);
    if (score > highest.score) highest = { score, pair: `${compared[i].page} ~ ${compared[j].page}` };
    if (!report && score > MAX_STATE_SIMILARITY) {
      errors.push(
        `state pages too similar (${(score * 100).toFixed(0)}% > ${MAX_STATE_SIMILARITY * 100}%): ${compared[i].page} ~ ${compared[j].page} — add state-specific localContent in src/data/state-laws.ts`,
      );
    }
  }
}
if (report) console.log(`state similarity: ${compared.length} pages, highest ${(highest.score * 100).toFixed(0)}% (${highest.pair})`);

if (errors.length) {
  console.error(`verify-site: ${errors.length} problem(s)\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`verify-site: ${titles.size} pages, ${links.size} internal links — all OK`);
