# Brief: use the new repair course lessons (general repairs, lubrication, fuel and carburettors)

Repo: /home/user/motobike. The owner of dansmc.com has given permission to use his photos and text.
Your group is in the prompt: general, lube, fuel-a or fuel-b.

| group | lessons (folder `source/dansmc/...`) | photo list | your problem systems | your part categories |
|---|---|---|---|---|
| general | `02_General_Repairs/026` to `048` | `briefs/photos5/general.tsv` | engine, smoke, power, body, controls | engine, body, chassis |
| lube | `03_Lubrication_Oil/049` to `055` | `briefs/photos5/lube.tsv` | oil, cooling | (oil, lubrication and cooling parts: engine_oil, oil_filter, oil_pump, drain_plug, oil_seals, gaskets, crankcase_breather, coolant, radiator, thermostat, water_pump, gear_oil) |
| fuel-a | `04_Fuel_Carburetors/060` to `072` | `briefs/photos5/fuel-a.tsv` | fuel, starting | fuel (carb, fuel_*, choke_cable, air_filter, intake_manifold, injector, throttle_body) |
| fuel-b | `04_Fuel_Carburetors/073` to `085` | `briefs/photos5/fuel-b.tsv` | running | fuel and exhaust |
(paths under `source/repair/` unless they start with `source/dansmc`). fuel-a and fuel-b share the fuel
parts: fuel-a writes new fuel PART pages; fuel-b only adds photos to fuel parts and writes repairs.

Read each lesson's `.md` file in your range first (text plus image list). Then:

## Read first
- `source/repair/WRITER_BRIEF.md` (formats and writing rules; binding except: registry below, its
  logs/PDF paths do not apply).
- Valid ids: `assets/content/repair-index.js` (generated list of every problem `p`, repair `r` and
  part `t`, including all earlier new pages) and course chapter ids in
  `source/repair/briefs/existing-ids.md` ("Course chapters").
- Examples: `source/repair/md/repairs/chain-adjust.md`, `source/repair/md/problems/cranks-no-start.md`,
  `source/repair/new/05_Electrical_Ignition/repairs/battery-dry-activate.md` (photos frontmatter),
  `source/repair/new/parts-elec/parts/contact_points.md` (new part page).
- Photos already on the site: `source/repair/briefs/photos3/catalogue.tsv` (file, caption, where used).
- Contact sheets: `python3 /tmp/claude-0/-home-user-motobike/27dd250f-4e2c-5952-b90b-8fe4954c88c7/scratchpad/sheet2.py <out.jpg> <tsv> <start_row> 25`
  into `/tmp/claude-0/-workspace/27dd250f-4e2c-5952-b90b-8fe4954c88c7/scratchpad/cs5/` (create it),
  view with Read. View every row of your tsv once. Up to 45 image views.

## Tasks
1. **New pages** (where the lessons teach something no page covers yet; check repair-index.js titles):
   repairs (5 to 15), problems (0 to 6), parts (0 to 8, only parts a rider can name and buy). Files
   in `source/repair/new/<group>-p5/{repairs,problems,parts}/<id>.md` with `photos:` frontmatter
   (2 to 6 photos each, inline form `{file: "...", caption: "..."}`), and
   `source/repair/new/<group>-p5/index.json` with `repairs`, `problems` and `parts` lists in the
   earlier shapes (see `source/repair/new/parts-engine/index.json` and
   `source/repair/new/05_Electrical_Ignition/index.json`).
2. **Photos on existing pages** in `source/repair/photos2/p5-<group>.json`
   (`{"problems": {...}, "repairs": {...}, "parts": {...}, "systems": {...}, "course": [{"chapter","file","caption"}]}`):
   **problem pages first**: every problem page in your systems should get the fault, the part that
   causes it and the check (up to 6 per page, fewest photos first; current count = number of
   `<figure` inside `<section class="r-photos"` in `repair/problems/<id>/index.html`). Then
   repairs your problems link to, then part pages, then course chapters (up to 3 per chapter,
   chapters such as m3-mixture, m2-lubrication-cooling, m2-diagnosis).
3. **More information** on existing problem pages in your systems and part pages in your categories
   (`source/repair/md/problems/*.md`, `source/repair/md/parts/*.md`): add 1 to 4 bullets or table
   rows where the lessons add a sign, check, cause or tip; add the lesson URL to `sources:`. Add, do
   not rewrite. Do not touch pages outside your systems or categories.

## Rules
Plain, short, calm, impersonal. No first person, no anecdotes, no humour, no opinions, no "Dan".
Paraphrase. Numbers only when general (not model-specific); otherwise "use the value in your
bike's manual". Never invent numbers. No em or en dashes. Captions at most 12 words. Skip manual
scans, adverts, history and joke photos, people as subject. Ids kebab-case (repairs, problems) and
snake_case (parts), not already used.

## Save as you go (the machine can restart)
Write files as you finish them; keep `source/repair/photos2/p5-<group>-progress.md` updated; resume
from it if it exists.

## Check before finishing
Every id in your files exists (repair-index.js, chapter list, or your new files); every photo file
exists; no dashes; index.json matches the files; edited frontmatter still parses. Notes:
`source/repair/photos2/p5-<group>-notes.md` (at most 40 lines). Do not commit. Tool-call budget: 200.
Reply in at most 8 lines with counts.
