# Course variants: progress notes (2026-11-06)

Brief: `source/briefs/2026-11-06-course-variants.md`.

## Done
- `assets/learn.js`: new block type `variants` (`variantsHTML`), rendered as a "Compare the types"
  section: label, title, intro, then a grid of cards. Each card: render `assets/renders/<key>.webp`
  linking to `models/#<key>` with a "View in 3D" badge, the name, and the four labelled lines
  (What it is, Good for, Ideal conditions, Watch for). Items whose `model` is not in `MODELS` are
  skipped; missing lines are left out.
- `assets/styles.css`: `.mz-vt*` rules appended at the end (grid `minmax(min(100%, 250px), 1fr)`,
  4:3 image box with `object-fit: contain`, 16:10 under 540 px). The existing `.mz-variants` class
  (3D model switcher) is not reused.
- Content, 9 sections, 59 cards, all blocks inserted, nothing else in the modules changed
  (the files are re-serialised with the same 2-space JSON; the diff is additions only):

| Module | Chapter | Section | Cards | Placed after |
|---|---|---|---|---|
| m4 | m4-wheels-tyres | Wheel types | 7 | the front and rear wheel 3D models |
| m4 | m4-wheels-tyres | Tyre types | 7 | the bias / radial paragraph |
| m4 | m4-suspension | Front fork types | 6 | the damper-rod / USD paragraph |
| m4 | m4-suspension | Rear suspension types | 5 | the twin shock / linkage paragraph |
| m4 | m4-brakes | Brake types | 6 | the calipers and pads paragraph |
| m4 | m4-final-drive | Final drive types | 6 | the final drive types plate |
| m1 | m1-anatomy | Handlebar types | 8 | the controls table |
| m1 | m1-types | Engine layouts | 8 | the firing interval callout |
| m3 | m3-lighting-wiring | Headlight types | 6 | the other headlight styles models |

- Sizes and specs only from `source/models/*.json` (boda boda, cafe racer, cruiser, pioneer,
  scooter, step-through, superbike, vintage V-twin) or from model titles (headlight 7 in, MX wheel
  21 in). No metadata exists for the classic 4T, MX 2T and electric bikes, so their cards carry no
  numbers. General ranges are marked as general ("off-road front wheels are usually 21 in").
- Links: each intro links to the matching repair part pages as `../repair/parts/<id>/` (relative,
  like the other module links). No em or en dashes in the new text.
- Renders not used because they read poorly: `bike_superbike__headlight` (thin patches),
  `bike_scooter__headlight`. Girder forks and shaft drive are not modelled: mentioned in text only.

## Test (Playwright, http://localhost:8765, 1300 and 390 px)
- All 7 changed chapters: every variants image loads (59 per width, 0 broken), no horizontal
  scroll, no page errors. The only console errors are `ERR_TUNNEL_CONNECTION_FAILED` for external
  resources (YouTube thumbnails / fonts through the sandbox proxy), not from the new blocks.
- 20 repair links return 200; all 59 "View in 3D" links open the model detail in `models/`.
- Note: several brake renders (cut from whole bikes) include the long cable, so the brake itself is
  small in the card; a tighter render would read better. `learn/index.html` loads
  `styles.css?v=20261106a`; the version was not bumped (file outside this brief), so cached
  browsers may need a reload to get the new CSS.
