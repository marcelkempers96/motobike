# Brief: make one course module more extensive, and teach every equation in maths typesetting

Repo: /home/user/motobike. Your module is given in the prompt (m1 to m5). The course is free and open
now, and is meant to become a premium course later, so it must be thorough, accurate and well taught.

## The files
- Your module: `assets/content/modules/<m>.js`. It is `export default { ...JSON... };` (keep that
  shape, 2-space JSON). Chapters hold `blocks`. Block types and their fields: read `block()` in
  `assets/learn.js`, and look at existing chapters for examples (p, h3, keys, steps, table, callout,
  figure, plate, model/models, photo, wiring, animation, variants, check, exercise, engine, gearing,
  videos, eq).
- The full written course this module was condensed from: `source/course/<m>.md` (about twice as
  long as what is on the site). This is your main source. Also useful: `source/STYLE.md` (writing
  rules, section "writing" and below), the repair pages `source/repair/md/` (practical links), and the
  repair-course lessons `source/dansmc/` (practical workshop facts; paraphrase, never copy).
- Quiz bank: `assets/content/questions/<m>.js` (`check` blocks reference these ids).

## Task 1: equations in maths typesetting (KaTeX)
Every equation the module teaches becomes an `eq` block, rendered in proper maths fonts:
```json
{"type": "eq", "id": "torque", "name": "Torque", "tex": "T = F\\,r",
 "where": [["T", "torque", "N·m"], ["F", "force at right angles to the lever", "N"], ["r", "lever length", "m"]],
 "why": "What it is for on a real motorcycle, one or two sentences.",
 "example": "A worked line, with inline maths \\(T = 150 \\times 0.25 = 37.5\\ \\mathrm{N\\,m}\\)."}
```
- See the three finished examples in chapter `m1-physics` (torque, angular-speed, power-torque).
- `id` must be unique across the whole course: prefix it with your module, e.g. `m3-ohms-law`
  (m1 keeps its three existing ids).
- Inside prose, any symbol, variable or short formula goes in inline maths `\( ... \)` (in JSON:
  `\\( ... \\)`), e.g. `\\(F\\)`, `\\(v^2\\)`, `\\(C_d A\\)`. Replace HTML entities like `&omega;`,
  `<sub>`, `&times;` in formulas with LaTeX (`\\omega`, `_d`, `\\times`).
- Units inside maths: `\\mathrm{N\\,m}`, `\\mathrm{kW}`, `\\mathrm{m/s^2}`. Never put `·`, `–` or other
  unicode punctuation inside maths. Units in the `where` third column are plain text.
- Fractions `\\frac{}{}`, brackets `\\left( \\right)`, Greek letters, `\\approx`, `\\Delta`, subscripts.
- Every real equation gets an `eq` block once, where it is first taught. The course "Equations
  summary" page (`learn/#equations`) is built automatically from these blocks, so the `name` and
  `why` must make sense on their own. Add the equations the source teaches that the site lacks.

## Task 2: more extensive chapters
For every chapter, compare with `source/course/<m>.md` and add what was cut: explanations, the
"why", worked examples, tables of typical values, step-by-step procedures, fault-finding logic,
safety callouts, and links to practice (repair pages: `../repair/repairs/<id>/`). Target roughly
1.8 to 2 times the current words per chapter, without padding: every addition should teach.
- Structure each chapter with `h3` sections; keep paragraphs short (2 to 4 sentences).
- Keep all existing interactive and media blocks (figure, plate, model, photo, wiring, animation,
  variants, engine, gearing, exercise, check). Do not remove or rewrite them; place new content
  around them in teaching order. Keep any `videos` block as the last block of its chapter.
- Add a short `callout` at the end of each chapter titled "Key points" (4 to 6 bullet-style
  sentences in `html`, separated by `<br>`), unless one already exists.
- Add 1 or 2 new quiz questions per chapter to `assets/content/questions/<m>.js` (same format,
  next free ids, kinds recall/apply as existing) and a `check` block for each, near the end.
- Language: follow the existing course voice (clear, technical, impersonal, British spelling).
  Values: keep the K-Light 125 reference values already used; never invent numbers; label typical
  ranges as typical. No first person.
- New glossary terms for your module: write them to `source/course/expand/<m>-glossary.json` as
  `[["Term", "definition"], ...]` (do not edit `assets/content/glossary.js`; it is merged later).

## Checks and output
- `node source/course/check_course.js <m>` must print `all good` (JSON parses, every maths
  fragment renders in KaTeX, eq blocks complete, ids unique). Run it often.
- Optional visual check: the site is served at http://localhost:8765 (start it with
  `python3 -m http.server 8765 --directory /home/user/motobike` in the background if it is not up);
  open `learn/#<chapter id>` with Playwright (`require('playwright')`, `chromium.launch()`).
- Write only: your module file, your questions file, `source/course/expand/<m>-glossary.json`, and
  notes `source/course/expand/<m>-notes.md` (at most 30 lines: words before/after, equations added,
  what you added per chapter, open questions).
- Do not commit. Save often (the module file is valid JSON after every save). Tool-call budget: 150.
  Reply in at most 8 lines.
