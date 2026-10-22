/**
 * make-preview.mjs — turns a finished build in dist/ into a preview that can
 * be hosted under a subpath, such as GitHub Pages
 * (https://<user>.github.io/<repo>/).
 *
 *   node scripts/make-preview.mjs --base=/mugshot-agency
 *
 * 1. Prefixes every root-absolute URL (/services/, /_astro/…) in HTML, CSS
 *    and the web manifest with the base path. Absolute URLs (canonical,
 *    og:url, structured data) keep pointing at the real domain.
 * 2. Marks every page noindex, nofollow. A project site's robots.txt lives
 *    under the subpath, where crawlers never look, so the meta tag is the only
 *    thing keeping a preview out of search results.
 *
 * Run it only on a copy meant for preview — it edits dist/ in place.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const baseArg = process.argv.find((a) => a.startsWith('--base='));
const BASE = `/${(baseArg?.slice('--base='.length) ?? '').replace(/^\/+|\/+$/g, '')}`.replace(/^\/$/, '');
if (!BASE) {
  console.error('Usage: node scripts/make-preview.mjs --base=/repo-name');
  process.exit(1);
}

async function collect(dir, extensions, found = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await collect(full, extensions, found);
    else if (extensions.includes(path.extname(entry.name))) found.push(full);
  }
  return found;
}

/** href/src/action="/…" but never protocol-relative "//host". */
const HTML_ATTR = /\b(href|src|action)=("|')\/(?!\/)([^"']*)\2/g;
const CSS_URL = /url\((["']?)\/(?!\/)([^"')]*)\1\)/g;
const MANIFEST_SRC = /("src":\s*")\/(?!\/)/g;
const ROBOTS_META = /<meta name="robots" content="[^"]*">/;
const NOINDEX = '<meta name="robots" content="noindex, nofollow">';

async function edit(file, transform) {
  const before = await fs.readFile(file, 'utf8');
  const after = transform(before);
  if (after !== before) await fs.writeFile(file, after);
}

const html = await collect(DIST, ['.html']);
const css = await collect(DIST, ['.css']);
const manifests = await collect(DIST, ['.webmanifest']);

await Promise.all([
  ...html.map((file) =>
    edit(file, (s) => {
      s = s.replace(HTML_ATTR, (_m, attr, q, rest) => `${attr}=${q}${BASE}/${rest}${q}`);
      return ROBOTS_META.test(s) ? s.replace(ROBOTS_META, NOINDEX) : s.replace('<head>', `<head>${NOINDEX}`);
    }),
  ),
  ...css.map((file) => edit(file, (s) => s.replace(CSS_URL, (_m, q, rest) => `url(${q}${BASE}/${rest}${q})`))),
  ...manifests.map((file) => edit(file, (s) => s.replace(MANIFEST_SRC, `$1${BASE}/`))),
]);

// The site's own robots.txt would sit at <base>/robots.txt, which crawlers
// ignore; make it say what the meta tags say anyway.
await fs.writeFile(path.join(DIST, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

console.log(`make-preview: ${html.length} HTML, ${css.length} CSS, ${manifests.length} manifest file(s) rebased under "${BASE}", all pages noindex.`);
