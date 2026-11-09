# Moto Zero — SEO keyword research and traffic growth plan

**Prepared for Transitions Lab · 5 November 2026**  
**Website:** https://motobike-five.vercel.app/  
**Scope:** Global audience, English-language search first. Audit and recommendations only; no website changes made.

## 1. Recommended direction

Build Moto Zero around three connected search journeys: **understand a motorcycle part → diagnose a symptom → follow the appropriate repair or maintenance guide**. Use the free course and interactive diagrams to bring visitors back. Model-specific parts pages become a second growth layer once year, variant, market and compatibility evidence are reliable.

The first investment should be improving and connecting existing content, not producing hundreds more pages. The current sitemap contains **887 URL entries**. This is a sitemap count, not a count of indexed pages, unique topics, or pages passing a quality review.

The practical starting portfolio is 15–20 strong pages on starting problems, battery problems, chain maintenance, oil changes and parts identification. These topics closely match the site's existing purpose. Priority numbers below reflect editorial fit and readiness, **not measured search volume or keyword difficulty**.

No one can guarantee first position. This research did not have access to Search Console, analytics, paid keyword databases or country-specific Google Ads volume exports. Monthly search volumes, current positions, traffic and conversion baselines remain unmeasured. Public search results were used to check intent and competition, not to invent forecasts.

## 2. Current website audit

Initial checks on 4 November covered 15 content URLs, robots.txt, sitemap.xml and a deliberately missing URL. On 5 November, the homepage, overview, three repair directories, robots and sitemap were fetched again. This is a sample audit, not an exhaustive crawl of all 887 URLs. The site appears to be changing actively; repeat checks after deployment.

| Observation | Evidence | Implication / action | Priority |
|---|---|---|---|
| Crawling is allowed | robots.txt returns HTTP 200, `User-agent: *`, `Allow: /`, with sitemap URL | Preserve this configuration; inspect production response after changes | Keep |
| Sitemap exists | sitemap.xml returns HTTP 200; 887 `<loc>` entries on 5 November | Validate each entry is canonical, indexable and HTTP 200; submission is not proof of indexing | P0 |
| Useful static repair content exists | Initial sampled repair pages contained substantial HTML text and canonical URLs | Improve clarity, evidence and internal links; rebuilding the entire site is unnecessary | P1 |
| Interactive overview is an HTML shell | `/overview/` contains an empty `ute-root` container, an app.js module and no HTML H1 | Add server-delivered introduction, H1, labelled components and crawlable links; keep interactive view | P1 |
| Directory headings are too generic | Initial H1s: “By part”, “By problem”, “By repair” | Replace with descriptive headings in section 5 | P1 |
| Some detail titles omit motorcycle context | Initial chain title starts “Drive chain”; no-start title starts “Engine turns over…” | Add motorcycle context and specific intent where accurate | P1 |
| Current canonical host is Vercel | Homepage and overview canonical use motobike-five.vercel.app | Decide stable public domain before major outreach; migration is optional, not an automatic ranking boost | P1 |
| Missing-page handling worked in sample | Deliberately nonexistent path returned HTTP 404 | Preserve proper 404 behaviour; check random invalid nested paths too | Keep |
| Article and repair routes overlap in topic | Sitemap includes chain-maintenance article plus chain procedures; spark-plug-reading article plus procedure | Differentiate intent or consolidate genuinely redundant pages after reviewing content and search data | P1 |
| Broad model names combine variants | Sitemap paths include Honda Shine 100/125, Boxer BM150/X125, TVS HLX 125/150 | Do not present combined families as verified interchangeable parts | P1 |
| Search visibility is unconfirmed | Earlier public site/brand queries did not surface Moto Zero | This is not evidence of zero indexed pages; verify through Search Console | P0 |
| Performance remains unmeasured | No field Core Web Vitals or Lighthouse report collected | Test homepage, overview, diagnostic tool and representative content on mobile | P1 |

Direct inspection links: [robots.txt](https://motobike-five.vercel.app/robots.txt), [sitemap.xml](https://motobike-five.vercel.app/sitemap.xml), [overview](https://motobike-five.vercel.app/overview/), [parts](https://motobike-five.vercel.app/repair/parts/), [problems](https://motobike-five.vercel.app/repair/problems/), [repairs](https://motobike-five.vercel.app/repair/repairs/).

### Sitemap structure observed

The counts below are URL-prefix groups, including any directory URLs, rather than verified counts of individual guides. The listed groups are a subset of the 887 entries.

| Prefix | Entries |
|---|---:|
| `/repair/problems/` | 288 |
| `/repair/repairs/` | 243 |
| `/repair/parts/` | 136 |
| `/repair/systems/` | 24 |
| `/parts/honda/` | 55 |
| `/parts/part/` | 28 |
| `/parts/tvs/` | 20 |
| `/parts/bajaj/` | 18 |
| `/parts/yamaha/` | 11 |
| `/parts/hero/` | 9 |

## 3. Search landscape and keyword method

Public searches covered motorcycle troubleshooting, cranks-but-will-not-start, starts-then-dies, chain adjustment, parts names/diagrams, battery discharge and free mechanic/maintenance courses. These searches are not a controlled rank tracker: results vary by country, device, date and engine. A returned competitor demonstrates competing content, not its exact Google position or market share.

| Search theme | Examples surfaced | What Moto Zero should learn |
|---|---|---|
| Motorcycle won't start | [Harley-Davidson troubleshooting](https://www.harley-davidson.com/us/en/content/expert-advice/motorcycle-wont-start.html) | Manufacturers compete on trust; separate no-crank, cranks and starts-then-stalls clearly |
| Chain adjustment | [aid.motorcycles guide](https://aid.motorcycles/guides/chain-adjustment) | Task-focused steps and an understandable sequence matter; add original photos and exact applicability |
| Parts names / diagram | [MSF numbered diagram](https://msf-usa.org/wp-content/uploads/2021/07/MO-6-pdf.pdf) | Labelled diagrams are a strong format; supply an accessible HTML explanation alongside visuals |
| Free maintenance course | [Alison beginner course](https://alison.com/course/motorbike-maintenance-for-beginners) and [maintenance course](https://alison.com/course/bike-maintenance-a-step-by-step-guide) | Explain curriculum and level; distinguish self-study education from accredited mechanic certification |
| Battery keeps dying | [MotorcycleRepair article](https://www.motorcyclerepair.com/blog/motorcycle-battery-keeps-dying) | Recurring discharge is a distinct intent from a one-off flat battery |
| Parts identification | [MotoKnow](https://motoknow.org/en) | Parts searches may require OEM numbers, exploded diagrams and fitment, beyond educational descriptions |

**Selection method:** start with observed search themes; expand using the website's actual symptoms, procedures and component taxonomy; map each intent to an existing destination; prioritise relevance and ability to add credible evidence. “SERP theme checked” means the query family was researched. “Expanded candidate” means a sensible proposed phrase, not independently validated demand. Validate demand by country before committing a large production budget.

For global English, use motorcycle as the default, with motorbike naturally where appropriate. Explain carburetor/carburettor and tire/tyre synonyms on one page. Do not create near-duplicate pages solely for spellings. Avoid targeting “repair near me” unless the site genuinely offers a local repair service. Avoid broad “buy motorcycle parts” claims if there is no shop, stock, delivery or verified supplier information.

## 4. Keyword-to-page map

Priority 1 = first optimisation wave; 2 = expansion after the first wave; 3 = requires model/fitment verification before promotion. All figures are qualitative priorities. Every phrase has one proposed primary destination; related variants belong on the same page when intent matches. Listed in sitemap does not mean the page is indexed or that its complete content was audited.


| Priority | Primary keyword | Target page | Intent | Content action | Research status |
|---|---|---|---|---|---|
| 1 | free motorcycle maintenance course | [/learn/](https://motobike-five.vercel.app/learn/) | Learn | Show curriculum, level, learning outcomes and free access. | SERP theme checked; Listed in current sitemap |
| 1 | motorcycle parts names and functions | [/repair/parts/](https://motobike-five.vercel.app/repair/parts/) | Learn | Add labelled overview and plain-language part descriptions. | SERP theme checked; Listed in current sitemap |
| 1 | motorcycle parts diagram | [/overview/](https://motobike-five.vercel.app/overview/) | Learn | Add HTML labels and links beside the interactive model. | SERP theme checked; Listed in current sitemap |
| 1 | motorcycle troubleshooting | [/repair/](https://motobike-five.vercel.app/repair/) | Diagnose | Explain symptom-to-check-to-repair journey. | SERP theme checked; Listed in current sitemap |
| 1 | motorcycle cranks but won’t start | [/repair/problems/cranks-no-start/](https://motobike-five.vercel.app/repair/problems/cranks-no-start/) | Diagnose | Separate cranking from no-crank; organise checks by evidence. | SERP theme checked; Listed in current sitemap |
| 1 | motorcycle battery keeps dying | [/articles/motorcycle-battery-keeps-dying/](https://motobike-five.vercel.app/articles/motorcycle-battery-keeps-dying/) | Diagnose | Own recurring discharge intent; link to flat-battery symptom page. | SERP theme checked; Listed in current sitemap |
| 1 | how to adjust motorcycle chain | [/repair/repairs/chain-adjust/](https://motobike-five.vercel.app/repair/repairs/chain-adjust/) | Maintain | Photo sequence; manual-specific slack and tightening instructions. | SERP theme checked; Listed in current sitemap |
| 1 | motorcycle starts then dies | [/repair/problems/starts-then-dies/](https://motobike-five.vercel.app/repair/problems/starts-then-dies/) | Diagnose | Separate cold start, idle and throttle scenarios. | SERP theme checked; Listed in current sitemap |
| 1 | motorcycle starter clicks but won’t start | [/repair/problems/starter-clicks/](https://motobike-five.vercel.app/repair/problems/starter-clicks/) | Diagnose | Distinguish single click and repeated clicking. | Expanded candidate; Listed in current sitemap |
| 1 | motorcycle won’t idle | [/repair/problems/stalls-at-idle/](https://motobike-five.vercel.app/repair/problems/stalls-at-idle/) | Diagnose | Separate fuel injection and carburettor branches. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle rough idle | [/repair/problems/rough-idle/](https://motobike-five.vercel.app/repair/problems/rough-idle/) | Diagnose | Explain uneven running versus stalling. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle bogs at full throttle | [/repair/problems/bogs-full-throttle/](https://motobike-five.vercel.app/repair/problems/bogs-full-throttle/) | Diagnose | Describe load and throttle conditions. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle has no spark | [/repair/problems/no-spark/](https://motobike-five.vercel.app/repair/problems/no-spark/) | Diagnose | Use safe, model-appropriate diagnostic references. | Expanded candidate; Listed in current sitemap |
| 1 | motorcycle chain noise | [/repair/problems/chain-noise/](https://motobike-five.vercel.app/repair/problems/chain-noise/) | Diagnose | Compare loose chain, tight spots and worn components. | Expanded candidate; Listed in current sitemap |
| 1 | motorcycle clutch slipping | [/repair/problems/clutch-slip/](https://motobike-five.vercel.app/repair/problems/clutch-slip/) | Diagnose | Explain symptoms before recommending parts. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle clutch dragging | [/repair/problems/clutch-drag/](https://motobike-five.vercel.app/repair/problems/clutch-drag/) | Diagnose | Distinguish drag from slip. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle brakes feel spongy | [/repair/problems/spongy-brake/](https://motobike-five.vercel.app/repair/problems/spongy-brake/) | Diagnose | Highlight stop-riding conditions and expert checks. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle brake squeal | [/repair/problems/brake-squeal/](https://motobike-five.vercel.app/repair/problems/brake-squeal/) | Diagnose | Distinguish sound from actual loss of braking. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle fork oil leak | [/repair/problems/fork-leak/](https://motobike-five.vercel.app/repair/problems/fork-leak/) | Diagnose | Show leak location and inspection photos. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle blue smoke | [/repair/problems/blue-smoke/](https://motobike-five.vercel.app/repair/problems/blue-smoke/) | Diagnose | Separate startup, acceleration and overrun symptoms. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle black smoke | [/repair/problems/black-smoke/](https://motobike-five.vercel.app/repair/problems/black-smoke/) | Diagnose | Explain diagnosis by fuel system. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle oil leak | [/repair/problems/oil-leak/](https://motobike-five.vercel.app/repair/problems/oil-leak/) | Diagnose | Add annotated leak-location guide. | Expanded candidate; Listed in current sitemap |
| 2 | air cooled motorcycle overheating | [/repair/problems/overheating-air/](https://motobike-five.vercel.app/repair/problems/overheating-air/) | Diagnose | Keep distinct from liquid-cooling failures. | Expanded candidate; Listed in current sitemap |
| 2 | electric motorcycle won’t charge | [/repair/problems/ev-wont-charge/](https://motobike-five.vercel.app/repair/problems/ev-wont-charge/) | Diagnose | Distinguish traction battery from 12 V systems; no pack-opening DIY. | Expanded candidate; Listed in current sitemap |
| 1 | how to change motorcycle oil | [/repair/repairs/engine-oil-service/](https://motobike-five.vercel.app/repair/repairs/engine-oil-service/) | Maintain | Separate strainer, cartridge and spin-on filter designs. | Expanded candidate; Listed in current sitemap |
| 1 | how to clean and lube motorcycle chain | [/repair/repairs/chain-clean-lube/](https://motobike-five.vercel.app/repair/repairs/chain-clean-lube/) | Maintain | Use seal-compatible guidance and original photos. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle chain replacement | [/repair/repairs/chain-sprocket-replace/](https://motobike-five.vercel.app/repair/repairs/chain-sprocket-replace/) | Maintain | Show wear, matching components and required tools. | Expanded candidate; Listed in current sitemap |
| 1 | motorcycle maintenance checklist | [/repair/repairs/service-schedule/](https://motobike-five.vercel.app/repair/repairs/service-schedule/) | Maintain | Offer printable checklist; model manual owns intervals. | Expanded candidate; Listed in current sitemap |
| 1 | motorcycle pre ride checklist | [/repair/repairs/pre-ride-check/](https://motobike-five.vercel.app/repair/repairs/pre-ride-check/) | Maintain | Provide mobile checklist and printable version. | Expanded candidate; Listed in current sitemap |
| 2 | how to clean motorcycle carburetor | [/repair/repairs/carburettor-clean/](https://motobike-five.vercel.app/repair/repairs/carburettor-clean/) | Maintain | Include carburetor/carburettor spelling naturally. | Expanded candidate; Listed in current sitemap |
| 2 | how to change motorcycle spark plugs | [/repair/repairs/spark-plug-service/](https://motobike-five.vercel.app/repair/repairs/spark-plug-service/) | Maintain | Scope thread, gap and torque by exact model. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle air filter cleaning | [/repair/repairs/air-filter-service/](https://motobike-five.vercel.app/repair/repairs/air-filter-service/) | Maintain | Separate foam, paper and reusable elements. | Expanded candidate; Listed in current sitemap |
| 2 | how to test motorcycle battery | [/repair/repairs/battery-test-charge/](https://motobike-five.vercel.app/repair/repairs/battery-test-charge/) | Maintain | Separate battery types and resting/load tests. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle charging system test | [/repair/repairs/charging-system-test/](https://motobike-five.vercel.app/repair/repairs/charging-system-test/) | Maintain | Explain regulator/stator test sequence and manual limits. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle brake pad replacement | [/repair/repairs/brake-pad-replace/](https://motobike-five.vercel.app/repair/repairs/brake-pad-replace/) | Maintain | Include fitment and professional-review boundary. | Expanded candidate; Listed in current sitemap |
| 2 | how to bleed motorcycle brakes | [/repair/repairs/brake-bleed/](https://motobike-five.vercel.app/repair/repairs/brake-bleed/) | Maintain | Explicit ABS and linked-brake applicability. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle tyre pressure check | [/repair/repairs/tyre-pressure-check/](https://motobike-five.vercel.app/repair/repairs/tyre-pressure-check/) | Maintain | Use tyre/tire variants; no universal pressure figure. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle valve clearance adjustment | [/repair/repairs/valve-clearance/](https://motobike-five.vercel.app/repair/repairs/valve-clearance/) | Maintain | Distinguish screw adjusters from shim systems. | Expanded candidate; Listed in current sitemap |
| 2 | scooter CVT belt replacement | [/repair/repairs/cvt-belt-replace/](https://motobike-five.vercel.app/repair/repairs/cvt-belt-replace/) | Maintain | Identify tools and model-specific interval references. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle drive chain explained | [/repair/parts/chain/](https://motobike-five.vercel.app/repair/parts/chain/) | Identify / learn | Function and failure symptoms; link to separate adjustment guide. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle brake pads explained | [/repair/parts/brake_pads/](https://motobike-five.vercel.app/repair/parts/brake_pads/) | Identify / learn | Function, wear and selection; do not claim universal fitment. | Expanded candidate; Listed in current sitemap |
| 2 | how a motorcycle clutch works | [/articles/how-a-motorcycle-clutch-works/](https://motobike-five.vercel.app/articles/how-a-motorcycle-clutch-works/) | Identify / learn | Animated explanation with readable text equivalent. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle wiring diagram explained | [/wiring/](https://motobike-five.vercel.app/wiring/) | Identify / learn | Explain symbols and circuits; distinguish educational diagram from model wiring. | Expanded candidate; Listed in current sitemap |
| 2 | how a motorcycle engine works | [/engine/](https://motobike-five.vercel.app/engine/) | Identify / learn | Combine visual explanation with crawlable text. | Expanded candidate; Route requires verification |
| 2 | motorcycle spare parts guide | [/parts/](https://motobike-five.vercel.app/parts/) | Identify / learn | Explain identification, compatibility and purchasing intent. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle spark plug reading | [/repair/repairs/spark-plug-reading/](https://motobike-five.vercel.app/repair/repairs/spark-plug-reading/) | Identify / learn | Resolve overlap with article before choosing permanent primary page. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle chain maintenance | [/articles/motorcycle-chain-maintenance/](https://motobike-five.vercel.app/articles/motorcycle-chain-maintenance/) | Identify / learn | Overview linking cleaning, adjustment and wear procedures. | Expanded candidate; Listed in current sitemap |
| 2 | electric motorcycle battery care | [/articles/electric-motorcycle-battery-care/](https://motobike-five.vercel.app/articles/electric-motorcycle-battery-care/) | Identify / learn | Reference manufacturer charging/storage guidance. | Expanded candidate; Listed in current sitemap |
| 2 | motorcycle models and specifications | [/models/](https://motobike-five.vercel.app/models/) | Identify / learn | Model discovery directory with year and market filters. | Expanded candidate; Listed in current sitemap |
| 3 | Honda Shine spark plug | [/parts/honda/honda-shine-100-125/spark-plug/](https://motobike-five.vercel.app/parts/honda/honda-shine-100-125/spark-plug/) | Identify / learn | Split or clearly distinguish 100/125, year and market before promotion. | Expanded candidate; Listed in current sitemap |
| 3 | Bajaj Boxer chain sprocket kit | [/parts/bajaj/bajaj-boxer-bm150-x125/chain-sprocket-kit/](https://motobike-five.vercel.app/parts/bajaj/bajaj-boxer-bm150-x125/chain-sprocket-kit/) | Identify / learn | Verify BM150 versus X125 fitment; add OEM cross references. | Expanded candidate; Listed in current sitemap |
| 3 | TVS HLX air filter | [/parts/tvs/tvs-hlx-125-150/air-filter/](https://motobike-five.vercel.app/parts/tvs/tvs-hlx-125-150/air-filter/) | Identify / learn | Verify variant-specific applicability. | Expanded candidate; Listed in current sitemap |
| 3 | Yamaha NMAX 155 battery | [/parts/yamaha/yamaha-nmax-155/battery/](https://motobike-five.vercel.app/parts/yamaha/yamaha-nmax-155/battery/) | Identify / learn | Verify generation, market and battery dimensions. | Expanded candidate; Listed in current sitemap |


### Keyword validation workflow

1. Export 90 days of Search Console query/page/country/device data once available; use longer periods for seasonality.
2. In Keyword Planner or a comparable keyword database, compare priority groups separately for India, Indonesia, Philippines, Kenya, Nigeria, UK and US. These are proposed research markets, not proven top traffic sources.
3. Record tool, date, country, language, monthly volume or range and competition definition. Ads competition is not organic SEO difficulty.
4. Review actual search results for the highest-value phrases. Record dominant format: tutorial, video, shop, forum, model manual or local service.
5. Promote phrases with strong intent fit and existing relevant content. Use real impressions to refine wording after launch.
6. Keep a single primary page per intent. If two URLs appear for the same query, inspect content and performance before assuming harmful cannibalisation.

## 5. Exact proposed titles, headings and descriptions

These are drafts for implementation, not changes already made. Keep the existing URL unless there is a concrete reason to migrate. Titles and descriptions are suggestions for search engines, which may display other text. There is no need to repeat an exact phrase unnaturally. Guidance: [Google title links](https://developers.google.com/search/docs/appearance/title-link).

| Page | Proposed title | Proposed H1 |
|---|---|---|
| `/` | Motorcycle Maintenance & Repair Learning \| Moto Zero | Learn how motorcycles work—and how to maintain them |
| `/learn/` | Free Motorcycle Maintenance Course \| Moto Zero | Free motorcycle maintenance course |
| `/repair/` | Motorcycle Troubleshooting & Repair Guides \| Moto Zero | Motorcycle troubleshooting and repair guides |
| `/repair/parts/` | Motorcycle Parts: Names & Functions \| Moto Zero | Motorcycle parts: names, functions and common faults |
| `/repair/problems/` | Motorcycle Problems & Diagnostic Guides \| Moto Zero | Find a motorcycle problem by symptom |
| `/repair/repairs/` | Motorcycle Maintenance & Repair Tutorials \| Moto Zero | Motorcycle maintenance and repair tutorials |
| `/overview/` | Interactive Motorcycle Parts Diagram \| Moto Zero | Explore a motorcycle parts diagram |
| `/repair/problems/cranks-no-start/` | Motorcycle Cranks but Won’t Start? \| Moto Zero | Motorcycle cranks but won’t start: what to check |
| `/repair/problems/ev-wont-charge/` | Electric Motorcycle Won’t Charge? \| Moto Zero | Electric motorcycle won’t charge: checks and next steps |
| `/repair/repairs/chain-adjust/` | How to Adjust Motorcycle Chain Slack \| Moto Zero | How to check and adjust motorcycle chain slack |
| `/repair/repairs/engine-oil-service/` | How to Change Motorcycle Engine Oil \| Moto Zero | How to change motorcycle engine oil |
| `/repair/parts/brake_pads/` | Motorcycle Brake Pads Explained \| Moto Zero | Motorcycle brake pads: function, wear and replacement |

Draft descriptions:

- **Homepage:** Learn motorcycle parts, maintenance and troubleshooting with free lessons, interactive diagrams and repair guides from Moto Zero.
- **Course:** Learn motorcycle maintenance at your own pace. Explore parts, engines, electrical systems and practical checks with Moto Zero’s free lessons.
- **Parts directory:** Explore motorcycle parts by system. Learn what each part does, signs of failure and the related diagnostic and repair guides.
- **No-start:** Motorcycle cranks but won’t start? Follow a structured guide to starting checks, fuel, ignition and compression, with model-specific cautions.
- **Chain adjustment:** Learn how to check motorcycle chain slack and understand adjustment, alignment and wear checks. Use your model’s manual for specifications.
- **Oil change:** Follow a motorcycle oil-change guide covering preparation, draining, strainers and filters, with clear notes on model-specific requirements.
- **EV charging:** Electric motorcycle not charging? Check external connections and manufacturer guidance, and learn when a qualified technician is needed.

## 6. Implementation backlog

### P0 — establish measurement and indexing facts

- Verify ownership in Google Search Console. Verify the current Vercel URL-prefix property if staying there; use a domain property when an owned domain is available. Submit the current sitemap.
- Inspect homepage, course, overview and 10 priority repair pages. Record discovered URL, indexed status, Google-selected canonical and rendered content.
- Establish analytics with privacy-appropriate configuration. Measure course starts, diagnostic starts/completions, related-guide clicks and parts-link clicks. Do not treat an outbound supplier click as a sale.
- Crawl all sitemap entries and compare them to internal links. Export HTTP status, canonical, robots directives, H1, title, description, inbound links and template type. A sitemap entry alone does not ensure discovery or quality.
- Record baseline before changing titles. Review Search Console indexing explanations individually; do not assume every excluded duplicate should be indexed.

### P1 — improve discovery and page usefulness

- Give `/overview/` a meaningful HTML H1, introduction, system list and links to key component pages before JavaScript runs. The interactive view can enhance that content. Do not hide a keyword block from human readers.
- Keep primary navigation and important contextual links as normal `<a href>` links. Ensure JavaScript failures do not remove the entire path to core learning and repair pages.
- Implement the first-wave title and heading drafts. Add concise page introductions that answer the actual search question.
- Create a consistent visible article footer: author, qualified reviewer where applicable, last substantive review date, sources and correction/report link. Name reviewers only with their agreement and actual review.
- Add original, accurate photos and diagrams. Use descriptive alt text for informative images; retain empty alt for decorative images. Include dimensions and captions; optimise image files. Do not use synthetic imagery as proof a repair was performed.
- Make each repair page state which engine/transmission/brake designs it applies to. Avoid treating one manual's torque, oil volume, chain slack or battery voltage as universal.
- Review overlap between `/articles/` and `/repair/`. Keep broad explanations separate from procedures if both are useful. If redundant, merge useful material into the stronger destination and use a permanent redirect from the retired URL.
- Place contextual internal links where the reader needs them. Example: cranks-no-start → spark-test → spark-plug-service → relevant parts identification. Link back from parts to symptoms and suitable procedures.

### P1 — stable domain and technical checks

An owned memorable domain would help branding and outreach. A Vercel subdomain is not by itself evidence of a ranking penalty. If migrating, map old URLs one-to-one, use permanent redirects, update canonicals/internal links/sitemap, verify both properties and monitor Search Console. Avoid combining a domain move with an unnecessary URL reorganisation. See [Google site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

Test four representative templates in PageSpeed Insights and inspect actual mobile behaviour. Use field data when available; a lab score is not the same as user experience. Target good Core Web Vitals at the 75th percentile: LCP ≤2.5 seconds, INP ≤200 ms, CLS ≤0.1. The interactive 3D route deserves particular testing. Defer expensive interactions, reserve image space and load large assets when needed. These are proposed checks, not measured failures. Source: [Web Vitals](https://web.dev/articles/vitals).

Use structured data only where it accurately describes visible content. Evaluate BreadcrumbList and appropriate article/organisation markup against current documentation; validate before deployment. Do not invent reviews, star ratings, products, prices or course credentials. Do not build the business case around FAQ or HowTo rich-result eligibility; search features change and markup does not guarantee a result enhancement.

### P2 — strengthen content and expand globally

- Improve 20 pages with original illustrations, test cases and qualified technical review before increasing publication rate.
- Publish a useful HTML maintenance checklist with a downloadable version. Keep HTML as the explanatory landing page.
- Add short demonstrations with descriptive titles, captions and transcripts. Embed on the matching guide rather than creating a competing thin video page.
- Use model-specific pages only where year, market, engine code and parts evidence can be verified. Family-level compatibility assumptions are insufficient.
- Select translation pilots from observed traffic and research. Bahasa Indonesia, Spanish, Portuguese, Hindi, French and Swahili are candidates, not a fixed rollout order. Have technical translations reviewed. Use language-specific URLs and reciprocal hreflang for equivalent pages; avoid automatic IP-based redirects.

## 7. Content briefs for the first growth wave

| Asset | What must make it useful | Connections | Completion test |
|---|---|---|---|
| Cranks but won’t start guide | Clear distinction between no-crank and no-fire; basic checks; architecture-specific branches; escalation points | Starting hub, battery test, spark test, fuel guides | Reviewer can trace each claim to a source; novice can identify the correct branch |
| Chain adjustment guide | Original close-up images; how to find correct manual specifications; alignment and wear checks | Chain component, chain noise, chain cleaning, replacement | No universal slack or torque claim; steps match photographed model |
| Parts names and functions | Labelled illustration, short descriptions, synonyms, system categories | Overview, component pages, learning modules | Every label has a usable text equivalent and relevant destination |
| Free maintenance course landing page | Clear syllabus, audience, prerequisites, progress path and scope | Lessons, quizzes, printable checklists | Free access and any credential claims are accurate |
| Battery keeps dying article | Recurring fault framework, charging vs discharge vs battery condition; chemistry distinctions | Flat battery, charging test, battery identification | Distinct intent from one-off battery-flat page; technical review completed |
| Oil-change procedure | Filter/strainer distinctions, waste handling, model manual lookup, original sequence | Oil-system explanation, service schedule, relevant parts | Oil specification, quantity and tightening data are explicitly model-bound |
| Motorcycle maintenance checklist | Daily/pre-ride and manual-scheduled categories, printable layout | Service schedule, tyres, chain, brakes, lights | Intervals are not falsely universal; mobile and print both usable |
| Electric motorcycle charging guide | External checks and correct manufacturer support route; distinction from auxiliary battery issues | Electric lessons, charging-system explanations | No unsafe traction-pack disassembly advice or unsupported charger compatibility |

These are editorial briefs, not instructions for performing the repairs. The technical content itself requires appropriate source and reviewer checks.

## 8. Model database SEO strategy

Do not turn every model–part combination into an indexable page automatically. A page should earn its place by answering a distinct question with useful, verified information. The proposed 500-model database is valuable as structured research, but generic model descriptions repeated across thousands of combinations would add little search value.

Start with a small set chosen from search impressions, model prevalence evidence and available documentation. Candidate families already represented in the sitemap include Honda Shine, Bajaj Boxer, TVS HLX and Yamaha NMAX. This is a readiness-based pilot list, not a global best-seller ranking.

Every promoted model page should contain:

- Exact make, model, generation, year range, market and important aliases.
- Engine/transmission architecture and verified specifications with source links.
- A correct, licensed photo of the relevant generation, with attribution where required.
- Suitable maintenance topics and diagnostic paths, clearly distinguished from statistically proven “common faults”.
- Parts identifiers and variant restrictions where verified; unknown fitment explicitly left unresolved.
- Links to manufacturer manuals/support, related component explanations and repair procedures.
- Review date, responsible editor and correction mechanism.

A model/part family page can remain useful as an identification guide, but should not imply all variants use the same part. Do not claim “top repairs” or failure frequency without a dataset. Google's [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) address scaled content created primarily to manipulate search; the editorial aim should be unique reader value.

## 9. Internal links and earned visibility

Use a coherent reader journey rather than a fixed quota of links. Each symptom page should point to relevant checks and procedures; each procedure should point to the part explanation and model-specific references; each model page should offer only applicable links. Breadcrumbs provide context. Hub pages should help people choose, not merely repeat huge undifferentiated lists.

Potential outreach assets: a printable pre-ride checklist, a labelled motorcycle-parts teaching sheet, a well-reviewed no-start decision tree and short practical demonstrations. Offer these to training centres, rider groups, motorcycle educators and relevant newsletters. Ask for feedback and, where useful, a reference link. Do not buy links or mass-post promotional comments.

Transitions Lab can provide a clear parent-project explanation and a relevant link to Moto Zero. Do not imply manufacturer endorsement or accreditation. For forums and communities, answer actual questions and disclose your connection; link only when the resource directly helps. No outreach messages have been sent as part of this task.

Clear authorship, transparent sourcing and original expertise are especially valuable for repair content. See [Google's people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). Technical accuracy and usefulness should drive the content, not a target word count or keyword density.

## 10. A 90-day execution plan

This is a proposed workload, not a traffic forecast. Assign an editor, developer and technical reviewer; one person can hold multiple roles if qualified.

| Period | Work | Suggested owner | Evidence of completion |
|---|---|---|---|
| Days 1–7 | Search Console and analytics baseline; full crawl; confirm stable domain decision | Developer + project owner | Baseline export, sitemap submitted, issue list, domain decision recorded |
| Days 8–14 | Overview HTML content; clear hub H1s; first 12 metadata changes; fix detected indexing blockers | Developer + editor | Live HTML checks; URL Inspection samples; deployment/change log |
| Days 15–30 | Upgrade 8 first-wave guides; reviewer/source blocks; original images; contextual links | Editor + technical reviewer | Eight reviewed pages with clear applicability and linked journeys |
| Days 31–45 | Upgrade next 8–12 pages; publish checklist; resolve proven redundant pages | Editor + developer | Review logs, working links, redirects checked where used |
| Days 46–60 | Pilot 5 thoroughly verified model pages or improve existing equivalents; 3 demonstrations | Researcher + reviewer | Variant-level sources, image rights and fitment status recorded |
| Days 61–75 | Share useful teaching assets with selected relevant organisations; evaluate first queries | Project owner | Outreach log; genuine referrals; Search Console page/query comparison |
| Days 76–90 | Improve pages gaining impressions; decide next cluster and language pilot from evidence | Editor + analyst | Documented decisions based on country/query/page performance |

Check indexing and errors weekly. Review query and engagement performance every 28 days; avoid reacting to small daily fluctuations. Search improvements may take time and differ sharply by topic and country. If pages are not indexed, resolve discovery, canonical and quality questions before producing more pages. If indexed pages get impressions but few clicks, inspect relevance and snippet presentation. If clicks do not lead to useful actions, improve the page journey.

## 11. Measurement and blank implementation worksheet

Track relevant non-branded traffic and successful learning/diagnostic journeys, not just visits. Keep brand searches separate from new audience discovery. Compare equivalent date ranges and watch for seasonality. Average position is a diagnostic metric, not a single fixed rank.

| Metric | Baseline | Day 30 | Day 60 | Day 90 | Source |
|---|---|---|---|---|---|
| Search impressions, non-branded | — | — | — | — | Search Console |
| Search clicks, non-branded | — | — | — | — | Search Console |
| CTR by priority page/query group | — | — | — | — | Search Console |
| Intended canonical pages indexed | — | — | — | — | Search Console |
| Organic entrances to priority guides | — | — | — | — | Analytics |
| Course starts from organic visits | — | — | — | — | Defined analytics event |
| Diagnostic completions from organic visits | — | — | — | — | Defined analytics event |
| Relevant parts-link clicks | — | — | — | — | Defined outbound/internal event |
| Field Core Web Vitals status | — | — | — | — | Search Console / PSI where available |
| Referring education / rider websites | — | — | — | — | Referral analytics / link research |

Blank fields are intentionally unmeasured, not zero. Set numeric traffic goals only after establishing the baseline and country-level demand. Operational targets can be set now: finish the crawl, assign every first-wave page an owner, and publish only reviewed improvements.

### Reusable keyword research record

- Keyword / query family:
- Target country and language:
- Search intent:
- Volume tool, date and reported range:
- Observed search-result formats:
- Existing primary URL:
- Related pages / overlap to resolve:
- Evidence or original material needed:
- Proposed title and H1:
- Author / technical reviewer:
- Publication or update date:
- Baseline clicks / impressions:
- Follow-up date and result:

### Reusable implementation ticket

- Task:
- Priority:
- Exact URL(s):
- Current observed behaviour:
- Required change:
- Owner:
- Acceptance criteria:
- Evidence / sources:
- Dependencies:
- Deployment date:
- Validation result:

## 12. Sources and limitations

Site findings come from direct HTTP/HTML inspection on 4–5 November 2026. Search themes and example competitors come from public searches during the same research. Technical SEO guidance is linked beside the relevant recommendation. Search results are examples, not a complete competitor census.

Additional source links for implementation:

- [Google title-link guidance](https://developers.google.com/search/docs/appearance/title-link)
- [Google helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google site migrations](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Web Vitals definitions](https://web.dev/articles/vitals)

Not measured: monthly keyword volume, organic difficulty, current Google positions, backlink profile, complete crawl health, Search Console coverage, analytics traffic, field performance, conversion rates and competitor traffic. The report deliberately makes no numeric traffic promise or first-place guarantee. No domain, code, analytics configuration or live page was changed.
