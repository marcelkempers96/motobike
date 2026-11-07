# Motopedia Spare Parts Pages: Build Guide

This guide turns `motorcycle-spare-parts-research.xlsx` (41 models, 28 part types, 767 model-part pages) into a spare parts section on transitionslab.org that ranks for searches such as "Honda BeAT CVT drive belt" or "Bajaj Boxer brake shoes", sends buyers to shops through affiliate links in phase 1, and is structured so Transitions Lab's own components can replace third-party offers in phase 2. Every parts page links to the matching Motopedia repair guide, and every repair guide links back to the parts it needs, so the two sections reinforce each other in search and for the reader.

## 1. Site structure and URLs

Three page types cover the whole catalogue, and the URLs mirror the `Shop page URL` and `Repair guide URL` columns in the workbook (both built from the base URLs in the README sheet, so changing those two cells updates all 767 rows).

| Page type | URL pattern | Example | Count |
|---|---|---|---|
| Parts hub | `/moto-zero/parts` | index of brands, models and part categories | 1 |
| Model hub | `/moto-zero/parts/{brand}/{model-id}` | `/moto-zero/parts/honda/honda-beat` | 41 |
| Model-part page | `/moto-zero/parts/{brand}/{model-id}/{part-id}` | `/moto-zero/parts/bajaj/bajaj-boxer-bm150-x125/brake-shoes` | 767 |
| Repair guide | `/moto-zero/repair/{repair-slug}` | `/moto-zero/repair/drum-brake-shoe-replacement` | 26 |
| Component (existing) | `/motorcycle-anatomy` | interactive anatomy explorer | 1 |

Repair guides are written once per job (drum brake shoes are replaced the same way on a Boxer and a Splendor) and receive model context through a query parameter or a model-specific section, which avoids 767 near-duplicate repair pages. If the live Motopedia repair pages already use other paths, edit `README!B6` and keep a single mapping from `Parts!L` (repair slug) to the real path.

For Indonesian-language pages (BeAT, Vario, Scoopy, NMAX, Aerox, Mio, Satria), add a locale prefix `/id/moto-zero/parts/...` with the `Local-language variant` column as the H1 and `hreflang="id"` / `hreflang="en"` alternates on both versions.

## 2. Data pipeline

Keep the workbook (or its Google Sheets copy) as the single source of truth and generate JSON at build time, so editors change data in the sheet and never in templates.

```python
# scripts/export_parts.py  -> writes data/parts.json for the static site build
import json, openpyxl
wb = openpyxl.load_workbook("motorcycle-spare-parts-research.xlsx", data_only=True)

def rows(name):
    ws = wb[name]
    head = [c.value for c in ws[1]]
    out = []
    for r in ws.iter_rows(min_row=2):
        rec = {}
        for h, c in zip(head, r):
            rec[h] = c.hyperlink.target if c.hyperlink else c.value
        out.append(rec)
    return out

data = {
    "models": rows("Models"),
    "parts": rows("Parts"),
    "pages": rows("Model x Part"),
    "shops": rows("Shops"),
}
json.dump(data, open("data/parts.json", "w"), indent=1, ensure_ascii=False)
```

Add three columns to `Model x Part` before going live and fill them per page: `OEM part number` (from Partzilla, CMSNL, hgpmart.com or the Bajaj Genuine Parts app), `Offer links` (fitment-checked affiliate deep links that replace the generic `search` links) and `Status` (`draft`, `ready`, `live`). The generator only builds rows with `Status = live`, which lets you publish in priority order.

Any static generator works (Astro, Eleventy, Hugo or Next.js static export). The page needs no client-side state, so plain HTML with one small script for outbound click tracking is enough and keeps pages fast on the low-end Android phones most commuter and boda-boda riders use.

## 3. Model-part page template

Each model-part page must stand on its own as useful content, because 767 templated pages with only a product list read as thin content to Google and get filtered out. The fields below come straight from the workbook, so the uniqueness is real rather than spun.

```
<title>  {Primary keyword}: fitment, price and where to buy | Motopedia
<meta description>  {Part} for the {Brand} {Model}: replacement interval {interval},
                    typical price {price range}, and how to fit it yourself.
H1       {Brand} {Model} {part}
Block 1  Fitment: engine cc, drivetrain, brake type, OEM part number, years covered
Block 2  When to replace: interval from Parts!G, wear symptoms, safety-critical flag
Block 3  Where to buy: 2-4 offers from the Shops sheet for the model's primary market
         (genuine OEM first, then aftermarket), each with rel="sponsored nofollow"
Block 4  Fit it yourself: DIY difficulty (Parts!J), tools, time, and a prominent link
         to the repair guide (see section 4)
Block 5  How this part works: link into /motorcycle-anatomy at the matching component
Block 6  Related parts for this model (same model hub, sorted by priority score)
Block 7  FAQ (2-3 questions taken from the long-tail variants column)
Footer   Affiliate disclosure, last-checked date
```

The `Long-tail variants` column supplies the FAQ questions and secondary headings, so the page answers "price", "replacement" and "best brand" searches without separate pages. The `Priority score` column (model tier weight x part demand weight, max 15) sets publishing order: the 84 rows scoring 12 or more (chain kits, brake shoes and pads, CVT belts, tyres and engine oil on the tier-1 commuters and scooters) go first, then score 9, then the rest.

## 4. Linking parts pages and repair guides

The link between the shop and the repair section is the main thing that separates these pages from a generic parts directory, and it should run in both directions with consistent anchor text.

**Parts page to repair guide.** Block 4 of every model-part page carries a card built from `Repair guide URL` with anchor text in the pattern "How to replace the {part} on a {Brand} {Model}", plus the DIY difficulty, estimated time and tool list. Link to the model-specific section of the guide where one exists:

```html
<a class="repair-card"
   href="/moto-zero/repair/drum-brake-shoe-replacement?model=bajaj-boxer-bm150-x125#steps">
  How to replace the drum brake shoes on a Bajaj Boxer
  <span>Difficulty 2/5 · 45 min · 10 mm and 12 mm spanners, pliers</span>
</a>
```

**Repair guide to parts pages.** Every repair guide gets a "Parts for this job" box that lists the model-part pages sharing its repair slug. Build it from the workbook by filtering `Model x Part` on the repair slug (via `Parts!L`), so a new model added to the sheet appears in the box automatically. When the guide is opened with `?model=...`, show that model's part page first and the rest below.

```js
// in the repair-guide template, at build time
const pagesForJob = data.pages.filter(p =>
  data.parts.find(x => x["Part ID"] === p["Part ID"])["Repair guide slug"] === repairSlug);
```

**Inline step links.** Inside the repair steps, the first mention of each part ("fit the new brake shoes") links to the parts page for the model in context. Limit this to one link per part per guide to keep the steps readable.

**Anatomy explorer.** Both the parts page (Block 5) and the repair guide link to the matching component in `/motorcycle-anatomy` using a stable anchor per component (for example `#brakes-drum`, `#cvt-belt`). Keep a small mapping table from `Part ID` to anatomy anchor in the workbook so the three sections stay in sync.

**Hub pages.** Each model hub lists all parts for that model grouped by `Parts!C` (category) and links to a "Service schedule for the {Model}" section that combines the interval column with links to every relevant repair guide. That section is the natural landing page for "{model} service" searches.

**Breadcrumbs.** Parts > {Brand} > {Model} > {Part} on parts pages and Motopedia > Repair > {Job} on repair pages, each emitted as `BreadcrumbList` structured data.

## 5. Structured data and on-page SEO

Use `BreadcrumbList` and `FAQPage` on every model-part page and `HowTo`-style markup (or plain well-structured steps) on repair guides. Add `Product` with `offers` only when a page shows a real, current price from a feed; markup with stale or invented prices risks a manual action, and Amazon's terms restrict displaying cached prices. Once Transitions Lab sells its own components, those pages get full `Product` and `Offer` markup with GTIN or MPN.

Other on-page rules that matter at this scale: one H1 per page matching the primary keyword; the OEM part number in the body copy and in an `<h2>` on high-priority pages (people search exact numbers); image alt text naming model and part; canonical URL on every page; a separate XML sitemap for `/moto-zero/parts/` submitted in Search Console so indexing of the parts section can be tracked on its own.

Internal link equity matters more than external links early on. Link the parts hub from the main Motopedia navigation and from the anatomy explorer, and link each model hub from the repair guides that mention that model.

## 6. Monetisation in phase 1

Order of implementation, matching the "Ad & widget options" sheet:

1. Plain affiliate deep links in Block 3. Apply first to Amazon Associates (4.5% automotive in the US), eBay Partner Network (3-4% on parts and accessories, 24-hour cookie) and FC-Moto via Webgains (4-8%, 30-day cookie), which cover most EU, US and consumables pages. Twisted Throttle (9%, 30-day cookie) and RevZilla (3-7%, 14-day cookie) cover US big bikes.
2. For India, Indonesia and Kenya, where the volume pages are, affiliate coverage is thinner. Link to OEM genuine-parts stores (hgpmart.com for Hero, Bajaj Genuine Parts, TVS Genuine Parts) without commission for trust, and apply to Flipkart, Shopee/Lazada and Jumia programmes for commission. Terms for these are marked `Verify` in the Shops sheet.
3. A price-comparison box on the 84 priority pages, fed by retailer datafeeds or APIs and refreshed daily.
4. An auto-affiliate script for the long tail of shops without direct programmes, and contextual display ads on repair guides only, kept away from the step-by-step instructions.
5. Direct sponsorship from regional distributors (Car & General for TVS in Kenya, Bajaj distributors, Muthuri Motoparts) for a branded "where to buy" slot on boda-boda pages, which also opens supply relationships for phase 2.

Every outbound shop link carries `rel="sponsored nofollow"`, a `data-shop` and `data-page` attribute for click tracking (Plausible or GA4 outbound event), and a visible affiliate disclosure near the offers and in the footer. Dutch consumer law (ACM guidelines) and the FTC both require the disclosure to be clear at the point of the link.

## 7. Phase 2: own components

Design the offer block so a Transitions Lab product is just another shop row with `Shop = Transitions Lab`, `Type = Own product` and a priority flag that pins it first. The data model then needs no change when own parts arrive. The workbook already shows where to start: high demand weight, low DIY difficulty and simple fitment (brake shoes, CVT belts, chain kits, levers and mirrors for the Boxer, HLX, Splendor and BeAT), plus the EV controller and charger for Roam and Spiro bikes, where third-party supply is thin.

## 8. Launch checklist

- Replace placeholder base URLs in `README!B5:B7` with the live Motopedia paths.
- Verify brake and drivetrain flags for the rows marked "verify" (Haojue, Roam Air, Spiro Ekon).
- Add OEM part numbers and fitment-checked affiliate deep links for the 84 priority rows; set them to `live`.
- Build the 26 repair-slug pages or map them to existing Motopedia repair content; every slug in `Parts!L` must resolve.
- Add the Part ID to anatomy anchor mapping and test links from both directions.
- Publish priority 12+ pages, submit the parts sitemap, then add the score-9 batch after Search Console shows the first batch indexed.
- Review clicks per shop and per region monthly and move under-performing shops down the offer block.
