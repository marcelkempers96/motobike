# Brief: new part pages, more photos and more information from the repair course

Repo: /home/user/motobike. The owner of dansmc.com has given permission to use his photos and text.
Your group is given in the prompt: elec, engine, drive or chassis.

| group | your problem systems | your part categories | lessons to read |
|---|---|---|---|
| elec | ignition, charging, lighting, wiring, starting | electrical, ignition | 05_Electrical_Ignition (086 to 102), 01 (001 to 025) where electrical |
| engine | engine, smoke, oil, cooling, running, power, fuel | engine, fuel, cooling, exhaust | 06_Engine_Parts 103 to 114, 124 to 135 |
| drive | clutch, gearbox, chain, cvt | transmission | 06_Engine_Parts 115 to 123, 07 lessons on chains and sprockets |
| chassis | brakes, wheels, suspension, steering, controls, body | brakes, chassis, wheels, body | 07_Frame_Brakes_Wheels_Suspension (136 to 151) |

Lesson text: `source/dansmc/<section>/<lesson>/*.md`. Read the lessons for your group first.

## Read first
- `source/repair/WRITER_BRIEF.md`: writing rules (binding; the registry is
  `source/repair/briefs/existing-ids.md`; its logs/PDF paths do not apply).
- `source/repair/briefs/existing-ids.md`: all ids, including pass 1 new pages. Also list
  `source/repair/new/*/index.json` for pass 2 new pages (they are valid ids too).
- Part page example: `source/repair/md/parts/abs.md` and `source/repair/md/parts/piston.md`.
- `source/repair/briefs/photos3/catalogue.tsv`: every repair-course photo already on the site, with
  caption and where it is used. Any of these may be used again on another page (at most 3 places
  per photo in total). Unused photos: `source/repair/briefs/photos2/*.tsv` (most of these were
  rejected for good reason; use one only if it clearly shows a real part or fault).
- Contact sheets: `python3 /tmp/claude-0/-home-user-motobike/27dd250f-4e2c-5952-b90b-8fe4954c88c7/scratchpad/sheet2.py <out.jpg> <tsv> <start_row> 25`
  (first column of the tsv must be the file path; catalogue.tsv works). View with Read. Keep image
  views under 40.

## Task 1: new part pages (5 to 15)
Parts the course covers that have no part id yet, in your categories. Ideas (check the registry
first, skip if an id exists): elec: contact points, condenser, flywheel magneto, advance unit,
spark plug cap and HT lead, bulbs, connectors. engine: valve guides, valve seats, crankcase,
engine bearings, connecting rod, piston pin and circlips, head gasket, counterbalancer, reed valve,
expansion chamber, spark arrester, compression release. drive: primary drive, clutch basket,
clutch springs, shift drum and forks, gearbox gears and shafts, chain joining link, centrifugal
clutch. chassis: wheel rim, wheel hub, fork springs and bushes, swingarm bushes, shock bushes,
brake shoes if not covered, rim tape.
- New part ids: snake_case, not in the registry. Only parts a rider can name and buy or inspect.
- File `source/repair/new/parts-<group>/parts/<id>.md` in the part page format: frontmatter
  `id, name, category (one of your categories), aliases, applies_to, sources, photos` then
  `# Name`, intro, `## What it does`, `## Signs it is worn or failing`, `## When to replace it`,
  `## What to match when buying`, `## Fitting notes`. 200 to 450 words. Link to existing problems
  and repairs inline where they fit.
- `photos:` 2 to 6 photos that clearly show THAT part (same inline form as
  `source/repair/new/05_Electrical_Ignition/repairs/battery-dry-activate.md`).
- `source/repair/new/parts-<group>/index.json`:
  `{"parts":[{"id","name","category","aliases","applies_to","repairs":[...],"problems":[...],"sources":[...]}]}`
  `repairs` and `problems`: existing ids where this part is involved (3 to 10 when possible).

## Task 2: more photos on existing pages in your area
Write `source/repair/photos2/p3-<group>.json` (same shape as `photos2/frame.json`:
parts, repairs, problems, systems). Priority:
1. Problem pages in your systems: up to 4 photos each showing the fault, the part that causes it,
   or the check. Aim to give most problem pages in your systems at least one photo.
2. Part pages in your categories with fewer than 3 photos.
3. Repair pages that the problems in your systems link to and that have no photo.
Do not repeat a photo already on that page (check catalogue used_on). Captions: at most 12 words,
plain, say what is shown.

## Task 3: more information on existing pages in your area
Edit existing Markdown files ONLY for problem pages in your systems (`source/repair/md/problems/`)
and part pages in your categories (`source/repair/md/parts/`). Add what the course teaches that the
page lacks: a sign to look for, a check, a cause, a buying or fitting tip. Rules:
- Add, do not rewrite. Keep headings and structure. Usually 1 to 4 bullets or table rows per page.
  Only where the course really adds something; skip pages where it adds nothing.
- Same style: plain, short, calm, impersonal. No first person, anecdotes, humour, opinions, "Dan".
  Paraphrase. No model-specific numbers from the source; "use the value in your bike's manual".
  Never invent numbers. No em or en dashes.
- Add `- {doc: "Dan's Motorcycle Repair Course", url: "<page_url>"}` to the page's `sources:` if
  not already there.
- Do not touch pages outside your systems or categories (other workers edit them in parallel).

## Save as you go
The machine can restart. Write each new part page as soon as it is ready; update the json and
append finished items to `source/repair/photos2/p3-<group>-progress.md` regularly. At start, read
that file and resume if it exists.

## Check before finishing
Script check: every id in your json, index.json and frontmatter exists (registry, new/*/index.json
or your new files); every photo file exists on disk; no "—" or "–" in files you wrote or edited;
every part in index.json has a file and vice versa; frontmatter of edited pages still parses
(starts and ends with ---).
Report `source/repair/photos2/p3-<group>-notes.md` (at most 40 lines): new parts, photos placed by
kind, pages given new information (list), doubts.
Do not commit. Tool-call budget: 170. Reply in at most 8 lines with the notes path and counts.
