# Moto Zero repair section

Complete Markdown content for the repair pages of the Moto Zero site: 274 problem pages written as step-by-step diagnoses, 185 repair pages and 134 part pages, plus index pages for every way in (by problem, by system, by repair, by part). It supersedes the earlier 60-problem dataset (`problems.js`, `procedures.js`, `parts.js`); the verified values, conflict decisions and scope rules from that dataset's README were carried over as binding rules for every page.

## Folder layout

| Path | Contents | Site URL |
|---|---|---|
| `repair/index.md` | Repair home: three ways in, start-here jobs, systems, safety basics | `/moto-zero/repair` |
| `repair/problems/index.md` | All problems grouped by system | `/moto-zero/repair/problems` |
| `repair/problems/<id>.md` | One diagnosis page per problem | `/moto-zero/repair/problems/<id>` |
| `repair/systems/<system>.md` | 24 system pages: problems, repairs and parts for one system | `/moto-zero/repair/systems/<system>` |
| `repair/repairs/index.md` | All repairs grouped by level (rider, home, workshop) | `/moto-zero/repair/repairs` |
| `repair/repairs/<id>.md` | One page per repair job | `/moto-zero/repair/repairs/<id>` |
| `repair/parts/index.md` | All parts grouped by category, each with a shop link | `/moto-zero/repair/parts` |
| `repair/parts/<id>.md` | One page per part | `/moto-zero/repair/parts/<id>` |
| `repair/repair-data.json` | Every page's metadata and all cross-links as one JSON file, for search, filters and widgets | |
| `PHOTO-SHOT-LIST.md` | File name and slot for every part photo | |
| `EDITOR-NOTES.md` | Writers' notes: conflicts, values to confirm, suggested new IDs | |

Every page starts with YAML frontmatter followed by plain Markdown. Upload the `repair/` folder as it is if the site renders Markdown with frontmatter; otherwise read `repair-data.json` and the page bodies.

## How a problem page works

Each problem page opens with the system and an urgency label (`ok-to-ride`, `ride-with-care`, `do-not-ride`, `stop-now`), then "Is it safe to ride?", two-minute quick checks, and a numbered diagnosis in which every step is a yes/no question whose branches end at a repair, another problem or a workshop hand-off. A causes table ranks causes with how to confirm each and the fix, followed by K-Light 125 reference values where numbers apply. The build then appends "Repairs for this problem", "Parts you may need" (each part with a **Find this part** shop link), "Related problems" and sources. Ranking means "common, cheap and easy to check first", an editorial teaching order and not a failure statistic.

Repair pages carry `level` (`rider`, `home`, `workshop`), an estimated time, tools, parts and the problems they fix. Workshop jobs are written as an assessment and hand-off: what to check safely, what the workshop measures or replaces, and what not to attempt at home.

## Links to the spare parts shop and the Overview

- Shop: every part links to `/spare-parts/<part-slug>`, where the slug is the part ID with underscores turned into hyphens (`brake_pads` becomes `/spare-parts/brake-pads`). The same URL is in each part's `shop` field and in every "Find this part" link on problem and repair pages. If the shop uses another path, change `SHOP` at the top of `build.py` and rebuild, or find and replace `/spare-parts/` across the folder.
- The shop page for a part can link back with `/moto-zero/repair/parts/<id>`, which lists every problem and repair involving that part (also in `repair-data.json` under `parts[].problems` and `parts[].repairs`).
- Overview: each part has `overview: /overview/?part=<id>` pointing at the existing Overview parts ID, or at its parent assembly where the Overview has no separate entry (for example `brake_pads` points to `brake`, `cam_chain` to `engine`). The parent mapping follows the earlier `missing_part_ids` table.

## Photos

The workspace could not reach Wikimedia Commons or any photo library, and none of the manual illustrations may be reused, so no photos are placed yet. Every part page has a `photo_slot` (for example `/moto-zero/repair/img/parts/brake-pads.jpg`) and an HTML comment where the image goes; `PHOTO-SHOT-LIST.md` lists all 134 file names. Fill the `photo` field (`image_url`, `file_page`, `author`, `licence`) and the build inserts the image with its credit line; the course's 3D part renders can stand in until real photos exist.

## Numbers and sources

The reference bike is the K-Light 125 (QJ157FMI, 124 cc air-cooled pushrod single with EFI, disc brakes with CBS). Every number is labelled "K-Light 125" with its one-based PDF page, and pages tell readers to use their own manual for other bikes. Where the manual contradicts itself (rear axle, swingarm pivot, rear shock, caliper and steering torques; coil resistance; alternator output; fuel filter interval; several engine wear limits) no value is published and the page says so. Unsafe manual advice (making sparks to test circuits, bridging starter contacts, priming a cylinder with petrol, powering the fuel pump straight from the battery) was replaced with meter tests and fused jumpers. Sources: K-Light 125 maintenance manual, MAVCC Motorcycle Mechanic (1988, modernised, its known errors not copied), IGNOU/Hero Honda Unit 2, and cited web sources for scooter CVT, electric motorcycles, tyre and battery codes and buying guidance. All text is paraphrased.

## Decisions for you before publishing

1. **K-Light EFI workshop values.** Fuel pressure (about 300 kPa, fault below 270 kPa), pump supply, injector resistance and sensor values appear as K-Light-labelled workshop readings on the fuel pump, injector and sensor pages. The earlier README barred a universal fuel pressure for an unspecified commuter; keep these as model values or remove them (pages listed in `EDITOR-NOTES.md`, group B and parts 1).
2. **Brake disc limits and tread depth.** K-Light disc thickness limits (front 3.0 mm, rear 4.0 mm), 0.15 mm runout and the 1 mm tread limit are published as labelled model values; remove them if the earlier rule was meant as a total ban.
3. **Merges the writers suggest:** `tank-vacuum` into `fuel-starvation`, `clunk-into-first` into `clutch-drag`, `fork-harsh` with `fork-sticky`, `exhaust-loud` with `exhaust-rattle`, `ev-cuts-out-accel` with `ev-bms-cutoff`. All pages exist and cross-link, so merging is optional.
4. **New IDs** the writers asked for (for example `relay`, `catalytic_converter`, `tone_ring`, `rim_tape`, `oil-pressure-test`, `brake-disc-replace`, `ev-battery-fire`) are listed in `EDITOR-NOTES.md`; none is used in the pages.

## Rebuilding

`source/` holds the writer pages before linking (`out/`), the ID registry (`registry.json`, generated from `registry.py`) and `build.py`. Set `ROOT` at the top of `build.py` to the `source/` folder, then `python3 build.py` regenerates the linked pages, checks every frontmatter ID and inline link, and writes `build-report.md`. The current build reports no missing pages, no broken links and no dashes. To add a problem, repair or part, add its ID to `registry.py`, write its page in `out/`, and rebuild.

Text released under CC BY-SA 4.0 by Transitions Lab, Moto Zero. Citing a manual does not relicense its text or figures.
