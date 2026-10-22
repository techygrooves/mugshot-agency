/**
 * make-brand-assets.mjs — renders the raster brand assets into public/:
 *
 *   og-default.png        1200×630  default social share image
 *   logo.png               512×512  Organization logo for structured data
 *   apple-touch-icon.png   180×180  iOS home screen
 *   icon-192.png / icon-512.png    web app manifest
 *
 * Rendered in Chromium so the share image uses the site's own fonts. The
 * outputs are committed; re-run only when the brand changes:
 *
 *   npm run assets:brand
 *
 * Needs a Chromium binary: set CHROMIUM_PATH, or it falls back to the
 * Playwright-managed one.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import { site } from '../src/config/site.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const font = (pkg, file) => pathToFileURL(path.join(ROOT, 'node_modules', '@fontsource-variable', pkg, 'files', file)).href;

const INK = '#0b1b33';
const ACCENT = '#14b8a6';

/** The shield mark from Logo.astro, at any size. */
const shield = (size, { dark = false } = {}) => `
  <svg viewBox="0 0 32 36" width="${size}" height="${(size * 36) / 32}" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 1 2 6.5v10.2C2 26 8 32.6 16 35c8-2.4 14-9 14-18.3V6.5L16 1Z" fill="${dark ? ACCENT : INK}"/>
    <path d="M16 6.2 7 9.8v6.9c0 6.1 3.8 10.6 9 12.4V6.2Z" fill="${dark ? INK : ACCENT}" opacity=".9"/>
    <path d="m11 18 3.6 3.6L22 14" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const page = (body, width, height) => `<!doctype html><html><head><style>
  @font-face { font-family: Jakarta; src: url(${font('plus-jakarta-sans', 'plus-jakarta-sans-latin-wght-normal.woff2')}); font-weight: 200 800; }
  @font-face { font-family: Inter; src: url(${font('inter', 'inter-latin-wght-normal.woff2')}); font-weight: 100 900; }
  html, body { margin: 0; width: ${width}px; height: ${height}px; overflow: hidden; }
</style></head><body>${body}</body></html>`;

const icon = (size, padding) => ({
  width: size,
  height: size,
  html: `<div style="width:${size}px;height:${size}px;display:grid;place-items:center;background:${INK}">${shield(size - padding * 2, { dark: true })}</div>`,
});

const assets = {
  'og-default.png': {
    width: 1200,
    height: 630,
    html: `
      <div style="position:relative;width:1200px;height:630px;background:${INK};color:#fff;font-family:Inter;overflow:hidden">
        <div style="position:absolute;inset:0;background:radial-gradient(900px 500px at 95% -10%, rgba(20,184,166,.35), transparent)"></div>
        <div style="position:relative;padding:72px 80px;height:100%;box-sizing:border-box;display:flex;flex-direction:column">
          <div style="display:flex;align-items:center;gap:20px">
            ${shield(56, { dark: true })}
            <div style="line-height:1">
              <div style="font-family:Jakarta;font-weight:800;font-size:26px;letter-spacing:.08em;text-transform:uppercase">National Reputation</div>
              <div style="margin-top:6px;font-weight:600;font-size:17px;letter-spacing:.42em;text-transform:uppercase;color:${ACCENT}">Defense</div>
            </div>
          </div>
          <div style="margin-top:auto">
            <div style="font-family:Jakarta;font-weight:800;font-size:72px;line-height:1.05;letter-spacing:-.02em;max-width:900px">Your past shouldn’t be the first thing people find.</div>
            <div style="margin-top:28px;font-size:28px;color:#cbd5e1">Mugshot removal &amp; online reputation management · All 50 states</div>
          </div>
        </div>
      </div>`,
  },
  'logo.png': icon(512, 96),
  'apple-touch-icon.png': icon(180, 30),
  'icon-192.png': icon(192, 32),
  'icon-512.png': icon(512, 96),
};

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
for (const [file, { width, height, html }] of Object.entries(assets)) {
  const tab = await browser.newPage({ viewport: { width, height } });
  // Write to a temp file so file:// font URLs are allowed to load.
  const tmp = path.join(PUBLIC, `.render-${file}.html`);
  await fs.writeFile(tmp, page(html, width, height));
  await tab.goto(pathToFileURL(tmp).href);
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: path.join(PUBLIC, file), clip: { x: 0, y: 0, width, height } });
  await fs.rm(tmp);
  await tab.close();
  console.log(`public/${file} (${width}×${height})`);
}
await browser.close();

await fs.writeFile(
  path.join(PUBLIC, 'site.webmanifest'),
  JSON.stringify(
    {
      name: site.name,
      short_name: site.shortName,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: INK,
      background_color: INK,
      display: 'browser',
    },
    null,
    2,
  ) + '\n',
);
console.log('public/site.webmanifest');
