/**
 * preview-headers.mjs — serves dist/ with the rules from public/_headers
 * applied, so security headers (especially the CSP) can be tested in a real
 * browser before deploy. `astro preview` ignores _headers.
 *
 * Run with: npm run build && npm run preview:headers   (http://localhost:4322)
 */
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT ?? 4322);

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json',
};

/** Parses the Netlify/Cloudflare _headers format into [{ pattern, headers }]. */
function parseHeaders(text) {
  const rules = [];
  for (const line of text.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!/^\s/.test(line)) rules.push({ pattern: line.trim(), headers: {} });
    else {
      const i = line.indexOf(':');
      rules.at(-1).headers[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return rules;
}

const rules = parseHeaders(await fs.readFile(path.join(DIST, '_headers'), 'utf8'));
const matches = (pattern, url) => new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`).test(url);

http
  .createServer(async (req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(DIST, url);
    if (!file.startsWith(DIST)) return res.writeHead(403).end();
    try {
      if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    } catch {}
    let status = 200;
    let body;
    try {
      body = await fs.readFile(file);
    } catch {
      status = 404;
      file = path.join(DIST, '404.html');
      body = await fs.readFile(file);
    }
    for (const rule of rules) if (matches(rule.pattern, url)) for (const [k, v] of Object.entries(rule.headers)) res.setHeader(k, v);
    res.setHeader('Content-Type', TYPES[path.extname(file)] ?? 'application/octet-stream');
    res.writeHead(status).end(body);
  })
  .listen(PORT, () => console.log(`Serving dist/ with _headers at http://localhost:${PORT}`));
