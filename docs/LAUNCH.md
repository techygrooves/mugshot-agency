# Launching on Hostinger (Phase 8)

Step-by-step guide to putting the site live on Hostinger web hosting, and
the checks to run before and after. Run `npm run launch-check` at any time
to see what is still blocking launch.

## Readiness (as of Phase 8)

| Area | Status |
| --- | --- |
| Build, links, SEO tags, structured data, claims checks | ✅ pass (78 pages) |
| Hostinger package (`.htaccess`: HTTPS, security headers, caching, 404, compression) | ✅ tested on Apache over HTTPS |
| All 89 URLs and assets in a real browser under the live security headers | ✅ no errors |
| Consultation form → Formspree | ✅ wired and tested (mocked); send one real test after upload |
| Lighthouse (Apache, HTTPS) | ✅ performance 99–100, accessibility 100, best practices 100; SEO 100 once the domain is confirmed |
| **Production domain** | ⛔ not set — `site.url` is a placeholder |
| **Privacy Policy and Terms** | ⛔ drafts — must be finalized now that the form collects data |
| State pages | ⚠️ 0/50 reviewed — live but hidden from search until reviewed (fine to launch) |
| Business email / phone | ⚠️ optional |

## 1. Before you upload (in the code)

1. **Set the domain** in `src/config/site.ts`:
   ```ts
   url: 'https://www.yourdomain.com',   // exactly as you want it to appear
   urlConfirmed: true,
   ```
   This switches robots.txt from "block all" to "allow" with the sitemap,
   points canonical URLs and share images at the real domain, and adds a
   redirect so `yourdomain.com` → `https://www.yourdomain.com`.
   Prefer the bare domain? Use `https://yourdomain.com` instead; the redirect
   follows whichever you choose.
2. **Finalize the legal pages** with counsel: fill in governing law and the
   privacy contact in `src/pages/legal/`, then in `src/config/compliance.ts`
   set `legalDraft = false` and `legalEffectiveDate`, and remove
   `/legal/privacy/` and `/legal/terms/` from `site.noindexPaths`.
3. Optional: add `site.contact.email` / `phone`.
4. Merge to `main`, then confirm: `npm run launch-check` shows **Ready to launch**.

## 2. Get the upload package

Either:

- **From GitHub (no tools needed):** Actions → **Hostinger package** → latest
  run on `main` → **Artifacts** → download `hostinger-site`. It is a zip of
  the site, `.htaccess` included.
- **Locally:** `npm ci && npm run package:hostinger` → `hostinger-site.zip`.

## 3. Upload in Hostinger (hPanel)

1. **Websites → Manage → Files → File Manager**, open `public_html`.
2. Delete Hostinger's placeholder files (e.g. `default.php`, `index.php`)
   if present. Keep `.well-known` if it exists.
3. **Upload** the zip into `public_html`, right-click it → **Extract** into
   `public_html` itself (not a subfolder). Then delete the zip.
4. Check that `public_html` now contains `index.html`, `_astro/`, `about/`, …
   and the hidden file `.htaccess` (File Manager → settings → show hidden files).

## 4. Domain and SSL

1. **Domain:** if the domain is registered elsewhere, point its nameservers
   (or A record) to Hostinger as hPanel instructs. Make sure both
   `yourdomain.com` and `www.yourdomain.com` resolve.
2. **SSL:** hPanel → **Security → SSL** → install the free SSL certificate
   for the domain (and `www`). Wait until it shows *Active*.
3. HTTPS and the www redirect are handled by `.htaccess`; no Hostinger
   "Force HTTPS" toggle is needed (enabling it as well is harmless).

Before the domain is connected you can preview on Hostinger's temporary
domain (`*.hostingersite.com`); the site works there and stays hidden from
search engines while `urlConfirmed` is false.

## 5. Check the live site

- [ ] `https://www.yourdomain.com/` loads; `http://` and the non-www domain redirect to it
- [ ] Click through Services, States, Resources, About, FAQ, Contact
- [ ] `https://www.yourdomain.com/nope/` shows the site's "Page not found" page
- [ ] `https://www.yourdomain.com/robots.txt` says `Allow: /` and lists the sitemap
- [ ] Submit the consultation form once with your own details. Formspree
      emails the account owner a one-time confirmation for a new form —
      confirm it, then check the submission arrives
- [ ] Security headers: https://securityheaders.com — expect an A grade
- [ ] Share a page link in a messaging app and check the preview image

## 6. Search engines

1. **Google Search Console** → Add property → **Domain** → verify with the
   DNS TXT record (hPanel → **Domains → DNS / Nameservers**). Or choose
   *URL prefix* → *HTML tag* and paste the code into
   `site.verification.google`, then redeploy.
2. **Sitemaps** → submit `https://www.yourdomain.com/sitemap-index.xml`.
3. **Bing Webmaster Tools** → import the site from Search Console (or use
   `site.verification.bing`).
4. Expect indexing to take days to weeks. State pages appear as each is
   reviewed and published.

## 7. Updating the site later

Merge changes to `main`, download the new `hostinger-site` artifact, and
upload/extract it over `public_html` the same way. Pages always revalidate,
so visitors see updates immediately; build files have unique names, so old
ones can be deleted from `_astro/` at any time.

## After launch

- The GitHub Pages preview keeps working and stays `noindex`; disable its
  workflow if it is no longer useful.
- Analytics are not installed. If you add a provider, choose a
  privacy-friendly one, update the Privacy Policy first, and allow only that
  provider in the CSP (`public/_headers`, regenerated into `.htaccess`).
