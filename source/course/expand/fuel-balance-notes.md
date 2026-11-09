# Fuel group: course balance notes (Module 3, `m3.js`)
Words per chapter (brief's snippet), before -> after:
- 3.1 `m3-mixture` 3012 -> 3066 (one pointer paragraph to 3.3 and one to 3.2 added; nothing removed)
- 3.2 `m3-fuel-supply` NEW -> 3045
- 3.3 `m3-carburettor` NEW -> 3504
- 3.4 `m3-efi` 2977 -> 3009 (one pointer paragraph to 3.5/3.6 added)
- 3.5 `m3-intake-exhaust` NEW -> 3085
- 3.6 `m3-fuel-diagnosis` NEW -> 3161
New eq blocks: m3-fuel-consumption, m3-fuel-head (3.2); m3-continuity, m3-bernoulli, m3-jet-flow (3.3);
m3-helmholtz, m3-catalyst-efficiency (3.5); m3-fuel-demand (3.6). Module now 17 equations.
New questions m3-51 to m3-58 (two per new chapter, check blocks placed before Key points).
Ids m3-35..m3-42 are taken by questions/m3b.js, so 51+ was used to avoid clashing with the electrics group (likely 43+).
Glossary: 20 new terms in `source/course/expand/fuel-balance-glossary.json`.
CHAPTER_IMG to add in assets/learn.js:
- 'm3-fuel-supply': 'renders/fuel_tank.webp'
- 'm3-carburettor': 'renders/carb.webp'
- 'm3-intake-exhaust': 'renders/exhaust_4t.webp'
- 'm3-fuel-diagnosis': 'repair-photos/060_however_good_take_moisture_water_out.jpg' (water layer in a fuel jar; not matched by isPhoto(), so maybe add 'repair-photos/' there)
Open questions:
- Source conflict: dansmc suggests clearing jets with a brush wire; the repair pages say never use wire. The course follows the repair pages.
- Worked examples using illustrative inputs (Helmholtz airbox dimensions, catalyst in/out figures, the "thirsty commuter" case) are labelled as examples, not K-Light data.
- Module intro and the six-module numbering were already correct; cross-references in new text use 2.2, 2.3, 3.1 to 3.6.
- `node source/course/check_course.js m3` prints all good; Playwright render of the four new chapters showed no page errors.
