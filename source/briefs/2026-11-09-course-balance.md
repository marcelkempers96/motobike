# Brief: new chapters and balanced chapter lengths in the six-module course

Repo: /home/user/motobike. The course now has six modules (files in `assets/content/modules/`):
1 Foundations `m1.js`, 2 Engine `m2.js`, 3 Fuel, air and exhaust `m3.js` (id `fuel`),
4 Electrical systems `m3b.js` (id `electrics`), 5 Drivetrain and chassis `m4.js`, 6 Electric
motorcycles `m5.js`. Questions in `assets/content/questions/<same name>.js`.

Read `source/briefs/2026-11-06-course-expand.md` first: its formats, rules (eq blocks with KaTeX,
inline maths, Key points callout, quiz questions with check blocks, glossary json, voice, numbers,
no invented values, keep every existing block) and checks all apply. Sources: `source/course/m*.md`
(the full written course; Module 3 and 4 material is in `source/course/m3.md`), the repair pages
in `source/repair/md/` and `source/repair/new/`, and the repair course lessons in `source/dansmc/`
(paraphrase; facts and procedures only).

## Goal
Every chapter about the same length: **2,900 to 3,600 words** (as counted by
`node source/course/check_course.js`, per chapter: use the snippet below). Never remove or shorten
existing content. Add what teaches: explanations, worked examples, tables of typical values, job
sheets, fault finding, repair links (`../repair/repairs/<id>/` etc.; ids in
`assets/content/repair-index.js`), photos already on disk (`assets/repair-photos/`, `assets/renders/`,
plates via `plate` blocks), 3D models, Wiring Lab and Under the Engine links.

Per-chapter word count:
```
node -e "const m=process.argv[1];import('./assets/content/modules/'+m+'.js').then(x=>x.default.chapters.forEach(c=>console.log(c.id,JSON.stringify(c.blocks).replace(/<[^>]+>/g,' ').split(/\s+/).length)))" m3
```

## New chapters
A new chapter is an object `{ "id", "title", "lead", "blocks": [...] }` inserted in `chapters` at the
position given. Give each new chapter 2 quiz questions (next free ids in that questions file,
`module` field = that module's id) with check blocks, a Key points callout, and an image
(add its id to `CHAPTER_IMG` in `assets/learn.js` only by telling the coordinator in your notes;
do not edit learn.js).

## Groups
| group | files | work |
|---|---|---|
| fuel | m3.js, questions/m3.js | Module 3 has 2 chapters (3.1 mixture, then efi). Insert 4 new ones to reach this order: 3.1 `m3-mixture`; 3.2 `m3-fuel-supply` "Fuel supply: tank, tap, pump and filter"; 3.3 `m3-carburettor` "Carburettors"; 3.4 `m3-efi` (existing); 3.5 `m3-intake-exhaust` "Intake, exhaust and emissions"; 3.6 `m3-fuel-diagnosis` "Fuel system diagnosis". Move carburettor detail that already exists in 3.1 only by adding to 3.3, not by deleting. |
| electrics | m3b.js, questions/m3b.js | Module 4 has 4 chapters. Insert 2 new ones to reach: 4.1 `m3-electrical-basics` "Electrical fundamentals and measurement" (Ohm's law, series and parallel, voltage drop, using a multimeter, reading a wiring diagram); 4.2 `m3-battery-charging` (existing); 4.3 `m3-starting` "Starting systems" (starter motor, relay, sprag clutch, kickstart, interlocks, faults); 4.4 `m3-ignition`; 4.5 `m3-lighting-wiring`; 4.6 `m3-diagnosis`. Also split the shared glossary: `assets/content/glossary.js` keys `m3` (fuel) and `m3b` (electrics) currently hold the same list; leave each term only in the module it belongs to (a term used by both may stay in both). You may edit glossary.js for this. |
| core | m1.js, m2.js and their questions | Add 1 new chapter at the end of Module 1: `m1-fasteners` "Fasteners, threads and torque". Bring every Module 1 and 2 chapter under 2,900 words up to range. |
| chassis-ev | m4.js, m5.js and their questions | Bring every Module 5 and 6 chapter under 2,900 words up to range (notably frame and steering, maintenance, gearbox, charging, controllers). Chapters over 3,600 stay as they are. |

Chapter numbering in text: modules are now 1 to 6 as above (for example the brakes chapter is 5.7,
battery and charging 4.2, the BMS chapter 6.4). Use these numbers in any cross-reference.

## Output and checks
Write only your group's files (plus glossary.js for electrics) and
`source/course/expand/<group>-balance-notes.md` (at most 25 lines: words per chapter before and
after, new chapter ids, images to add to CHAPTER_IMG, open questions). New glossary terms go to
`source/course/expand/<group>-balance-glossary.json`. `node source/course/check_course.js <files>`
must print `all good`. Save often. Do not commit. Tool-call budget: 150. Reply in at most 8 lines.
