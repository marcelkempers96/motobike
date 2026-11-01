# Moto Zero: motorcycle types page

| File | Use |
|---|---|
| `motorcycle-types.md` | Web page text for the CMS: timeline table and 16 sections with photo, plate, history, defining parts, typical figures and landmark models. Image paths assume `/moto-zero/types/plates/`, `/moto-zero/types/media/`. |
| `motorcycle-types.html` | Interactive version: timeline, family filters, card grid that lifts and enlarges on hover, and a full-screen view per type with plate, photograph, render, history and figures. Self-contained (plates, thumbnails and course photos inline). Serve at `/moto-zero/types`; deep links `#boda-boda`, `#cafe-racer` etc. |
| `motorcycle-types.json` | All content as data, for building your own layout or translating. |
| `plates/` | 16 labelled plates as SVG and 2400 px PNG: F01 standard, F02 motocross, F03 electric, F04 scooter (from Module 1) and T01 to T12 (new). |
| `thumbs/`, `media/` | Card thumbnails, course 3D renders and Transitions Lab collection photos used on the page. |
| `photos.json` | The Wikimedia Commons photograph chosen for each type, with alternates. **Not yet verified**: author and licence could not be checked from the build environment. Open each `file_page`, confirm the licence allows reuse, and fill in `author`, `licence` and `licence_url`, then rebuild with `src/build.py`. Until then the page credits "see file page". |
| `src/` | `types_data.py` (all text), `template.html`, `build.py`. |

Photographs load from Wikimedia Commons via `Special:FilePath` links; if one fails, the page shows a link to the file page instead. Text and plates: CC BY-SA 4.0, Transitions Lab, Moto Zero.
