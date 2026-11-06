# Brief: "Brand a bike" page (put your logo on a 3D motorcycle)

Repo: /home/user/motobike (static site, vanilla HTML/CSS/ES modules, three.js r160 vendored in
`assets/vendor/three/`, import map as in `overview/index.html`). Example of the idea:
https://brandmymac.com/ (pick a product, upload a logo, see it on the product, order).

## Build `/brand/` (new page `brand/index.html`, module `assets/brand.js`, CSS `assets/brand.css`)
1. **Pick a bike**: the 8 bikes in `assets/content/assets-map.js` (`BIKE_MODEL`, `MODE_INFO` in
   `assets/content/parts.js`). Load with the shared viewer `assets/viewer3d.js` (`createViewer`), or
   your own small three.js scene if the viewer lacks what you need (reuse its GLB loading: meshopt
   decoder, see `viewer3d.js`). Mesh names are `<category>__<component>__...`; bodywork and tank
   meshes are `frame_body__*` (fuel_tank, side_panels, fairing, tail_unit, leg_shield, ...).
2. **Upload a logo** (PNG, JPG, SVG, WebP; read locally with FileReader, nothing uploaded yet).
   Show it on the bike as a decal: use three.js `DecalGeometry`
   (three/examples/jsm/geometries/DecalGeometry.js). It is not vendored: get it from the npm
   package (`cd /tmp/claude-0/-workspace/27dd250f-4e2c-5952-b90b-8fe4954c88c7/scratchpad && npm pack three@0.160.0`,
   extract, copy `examples/jsm/geometries/DecalGeometry.js` to
   `assets/vendor/three/examples/jsm/geometries/`). Placement: preset spots per bike (tank left,
   tank right, fairing or side panel left/right, front mudguard, tail) found from the mesh
   bounding boxes, plus "click on the bike to place". Controls: size, rotation, mirror to both
   sides, remove; up to 3 logos.
3. **Style**: bodywork colour picker (recolour frame_body materials of the chosen bike, keep the
   originals for reset), a few preset colour schemes, background light or dark, camera presets
   (side, 3/4, front) and orbit.
4. **Export**: "Download image" (PNG at 2x of the view, white or transparent background; the
   renderer needs `preserveDrawingBuffer: true` or render-then-toDataURL in the same frame).
   Note `assets/gate.js`: any link with a `download` attribute asks visitors who are not signed in
   to create an account first. That is intended here too.
5. **Advertise with us** form under the viewer: company, name, email, country, bikes/fleet size,
   message, consent checkbox. On submit: upload the logo and the snapshot PNG to Supabase storage
   bucket `brand-requests` (path `<uuid>/logo.<ext>`, `<uuid>/preview.png`) and insert a row in
   table `brand_requests`; then POST a JSON copy (with the two public file URLs) to
   `https://formsubmit.co/ajax/marcel@transitionslab.org` (header `Accept: application/json`) so the
   team gets an email. Supabase config: `assets/community-config.js` (URL + publishable key; use
   supabase-js from `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.3/+esm` like
   `assets/community.js`, or plain fetch to the REST and storage APIs with only the `apikey` header).
   Show clear success and error messages; never lose the user's input on error.
6. **Write `docs/supabase-brand.sql`** (safe to run twice): table `public.brand_requests` (id uuid
   default gen_random_uuid(), created_at, company, name, email with a format check, country,
   fleet, message, logo_path, preview_path, consent boolean not null, status text default 'new'),
   RLS on, insert for anon and authenticated with checks on lengths and consent = true, no select
   for them (admins read in the dashboard; also allow select/update for `public.is_admin()`, which
   exists). Storage bucket `brand-requests`, not public... but the email needs links: make it
   public read, insert allowed for anon/authenticated into any `<uuid>/` folder, 5 MB limit, image
   MIME types only.
7. **Page copy**: plain, short, like the rest of the site. Title "Brand a motorcycle with your logo |
   Moto Zero", H1, a short intro (for fleets, delivery companies, boda boda groups, schools,
   sponsors), how it works in 3 steps, FAQ (formats, what happens next, privacy: files are only used
   to reply to the request). Use the header/footer pattern of other pages (`<header class="ute-top">`
   with the logo markup used across the site, `<nav data-mz-nav>`, `<footer data-mz-footer>`,
   `assets/site.js`). No em or en dashes.
8. Works on phone (390 px) and desktop; touch to place and orbit.

## Do not
Edit other existing files (I add the nav link and sitemap entry myself). Commit. Use real logos of
companies in examples (make a simple sample logo SVG in `assets/brand-sample-logo.svg` if needed).

## Test
Playwright (pre-installed, `require('playwright')`), local server http://localhost:8765/ (start
`python3 -m http.server 8765 --directory /home/user/motobike` only if it is not running), launch
chromium with `--use-gl=swiftshader --enable-unsafe-swiftshader`. Check: logo appears on each of
the 8 bikes at the preset spots, colour change, download produces a PNG, form validation, no
console errors, 390 and 1300 px. The Supabase and formsubmit calls cannot be reached from this
sandbox: test them with Playwright route mocks.
Save notes in `source/briefs/brand-progress.md` as you go (the machine can restart). Reply in at
most 8 lines.
