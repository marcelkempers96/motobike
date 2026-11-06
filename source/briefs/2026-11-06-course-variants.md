# Brief: "Compare the types" sections in the course, using the part models

Repo: /home/user/motobike. The model library has many versions of the same part, cut out of 11
different bikes plus separate component models: list them with
`node -e "import('./assets/content/assets-map.js').then(m=>console.log(JSON.stringify(m.MODELS)))"`
(key -> [category, title]). Each has a thumbnail render `assets/renders/<key>.webp` (bike parts:
`bike_<bike>__<part>.webp`; components: `front_wheel_spoked.webp`, `forks_usd.webp`, ...) and a 3D
view at `models/#<key>`. The bikes: classic 4T roadster, 2T motocross, electric scrambler,
automatic scooter, step-through, boda boda, 1960s cafe racer, 1000 cc superbike, 1920 V-twin, 1901
pioneer, modern V-twin cruiser (metadata with exact specs in `source/models/*.json`: read them, they
describe wheel sizes, tyres, brakes, forks, engines).

## Goal
Teach the differences between the types of a part, with a close-up of each: what it is, what it is
good for, the ideal conditions, what to watch for. Use the models as the pictures.

## Build
1. A new course block type `variants` in `assets/learn.js` (see `function block`), with CSS
   appended to `assets/styles.css`:
   `{type: 'variants', title, intro, items: [{model: '<key>', name, what, good_for, conditions, watch}]}`
   renders a responsive grid of cards: the render image (click opens `models/#<key>` in the 3D
   library, label "View in 3D"), the name, and four short labelled lines. Phone friendly.
2. Content in the course modules (`assets/content/modules/m1.js` to `m5.js`, JSON after
   `export default`; keep the formatting and every other block): add one variants block to each
   fitting chapter, placed after the text it illustrates, for example:
   - **m4-wheels-tyres**: wheel types (wire-spoked, cast, motocross 21 in, scooter small cast,
     pioneer bicycle-type) and tyre types (ribbed road front, block/knobby off-road, sport radial,
     scooter, block-tread rear of the boda boda, period beaded-edge), with sizes from the model
     metadata where given; tube vs tubeless; ideal surfaces and weather; what wears and why.
   - **m4-suspension**: conventional vs upside-down forks, springer and girder forks (vintage),
     twin rear shocks vs monoshock with linkage, scooter swinging-engine unit.
   - **m4-frame-steering** or **m1-anatomy**: handlebars (clip-ons on cafe racer and superbike,
     wide motocross bar, cruiser pull-back, step-through and scooter bars, pioneer bicycle bar):
     riding position, control, comfort.
   - **m2-fundamentals** or **m1-types**: engine layouts (single, parallel twin, V-twin, inline
     four, two-stroke single, pioneer atmospheric-valve single, electric motor).
   - **m4-brakes**: drum vs single disc vs twin floating discs with radial calipers.
   - **m3-lighting-wiring**: headlights (round halogen, LED, motocross number-board light, carbide
     and acetylene lamps on the old bikes).
   - Optional where it adds value: exhausts (megaphones, 4-into-1, expansion chamber), seats,
     instruments (analogue, LCD, TFT), final drive (chain, belt, shaft not modelled, CVT).
   6 to 9 sections in total, 4 to 8 items each.
3. Writing: plain, short, calm, impersonal; correct general engineering; no invented model-specific
   numbers (sizes and specs only from `source/models/*.json` or as clearly general ranges such as
   "off-road front wheels are usually 21 in"). No em or en dashes. Link to the matching repair part
   page where useful (`/moto-zero/repair/parts/<id>` style is not used in modules: use plain text
   or the existing link style in the modules, check how other blocks link).

## Do not
Edit other files (other people work on repair pages in parallel). Commit.

## Test
Playwright (`require('playwright')`), local server http://localhost:8765/ (start
`python3 -m http.server 8765 --directory /home/user/motobike` only if not running). Open each
chapter you changed (`/learn/#<chapter-id>`), check images load, links work, no console errors,
1300 and 390 px. Save notes in `source/briefs/course-variants-progress.md`. Reply in at most 8
lines.
