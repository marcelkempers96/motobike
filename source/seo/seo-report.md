# SEO pass, 2026-11-09 (20 checks)

Measured with `python3 source/seo/audit.py` before and after (2,344 HTML pages), images with
`source/seo/images.py`, mobile with `source/seo/mobile_check.py` (needs the local server on :8765).
Machine-readable result for the dashboard: `source/seo/seo-report.json`.

| # | Check | Before | After | Status |
|---|---|---|---|---|
| 1 | Sitemap | 1,284 URLs, 3 dupes, 2 non-indexable | 2,341 URLs, 0 dupes, 0 bad | fixed |
| 2 | robots.txt | allow all + sitemap | unchanged | ok |
| 3 | Stray noindex | 1,062 pages | 0 (only account, progress, repair/fix redirect) | fixed |
| 4 | Canonical = own URL | 0 wrong | 0 wrong | ok |
| 5 | Title 30-70, unique | 79 out of range | 0 | fixed |
| 6 | Description 70-165, unique | 6 too long | 0 | fixed |
| 7 | One H1 | learn/ had none | all pages 1 | fixed |
| 8 | Heading order | 1 page | 0 | fixed |
| 9 | Photos/renders with empty alt | 8,926 | 0 | fixed |
| 10 | Schema | no Course, 685 repair pages without TechArticle, 28 pages without breadcrumbs | all present, 0 JSON errors | fixed |
| 11 | Orphan pages | 4 (24 "classic" bikes missing from lists) | 0 | fixed |
| 12 | Broken internal links/images | 0 | 0 | ok |
| 13 | Images without width/height / not lazy | 21,190 / 339 | 0 / 5 (home hero icons, on purpose) | fixed |
| 14 | Render-blocking scripts, font preconnect | 0, all pages preconnect | same | ok |
| 15 | Overflow at 390 px (12 pages) | - | 0 | ok |
| 16 | http:// self links / HSTS | 0 / missing | 0 / added | fixed |
| 17 | Underscore slugs | 150 (repair/parts ids) | 150, not renamed | todo |
| 18 | og:image + twitter card | ok | ok | ok |
| 19 | Search Console tag | none given | none added | todo |
| 20 | llms.txt | missing | added | fixed |

## What changed
- Builders: repair (titles, alt text, TechArticle, width/height/lazy, no noindex on bike pages, sitemap regex
  from `SITE`), parts (all pages indexed, alt text, title length, width/height), videos (og/twitter tags and
  breadcrumbs now in the builder), articles (sitemap no longer lists progress/ or repair/fix/, breadcrumbs on
  the listing, two descriptions shortened). Shared helper `source/seo/seohelp.py` adds image sizes.
- `source/bikes/bikedata.py`: added the missing "classic" category so 24 bikes appear in the bike lists.
- Hand-made pages: titles, descriptions, breadcrumbs, alt text, sizes; learn/ gets a static H1, module list
  and Course schema; brand/ gets FAQPage; engine/ heading order. `assets/site.js` menu: Types, History,
  updated problem and repair counts. `assets/styles.css`: images with width/height keep their aspect ratio.
- `vercel.json`: Strict-Transport-Security for all paths; X-Robots-Tag noindex for types/standalone.html.
- Images: triumph-engine.jpg and workshop-garage.jpg recompressed in place (max 1600 px); four cockpit
  screenshots served as WebP on sources/. The 30 largest images still in use are technical plates (PNG,
  2400 px, 475 KB to 1.27 MB); see `source/seo/largest-images.json`.
- `/llms.txt` added.

## Search Console (owner)
Add the site in Google Search Console. With "HTML tag", send us the `content` value and we add
`<meta name="google-site-verification" content="...">` to index.html only. With "HTML file", put the
`googleXXXX.html` file Google gives you in the site root. Then submit `sitemap.xml`.

## Not measurable here
Real Core Web Vitals (LCP, CLS, INP) need field data or PageSpeed Insights on the live site.

## Base URL
Each builder keeps it in one constant (`SITE` or `BASE`); robots.txt, llms.txt and hand-made pages hold
`https://www.motopedia.org` too and must be switched together when www.motopedia.org goes live.
