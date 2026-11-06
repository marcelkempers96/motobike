# Brand a bike: progress notes
- [x] DecalGeometry.js copied from three@0.160.0 npm pack to assets/vendor/three/examples/jsm/geometries/
- [x] brand/index.html, assets/brand.js, assets/brand.css, assets/brand-sample-logo.svg
- [x] docs/supabase-brand.sql
- [x] Playwright tests (scripts in the session scratchpad: brand-test.js = spots on every bike, flow.js <width> = logo upload, colours, tap to place, gate + download, form validation, mocked Supabase/FormSubmit). All pass at 390 and 1300 px, no console errors from the page.
Notes:
- Uses the shared viewer unchanged; own raycast for tap to place. Export renders at pixel ratio 2 and reads the canvas in the same call.
- Mesh "__left" parts sit at +Z; viewer side view looks from +Z. Nested GLB nodes carry a _1 suffix (names compared without it).
- Bike list follows MODES, which now has 10 bikes (vt, pi were added in parallel); REAL_LEN has values for both.
- Spots per bike come from raycasts that must hit the part first. 2T has no tank spot (shrouds cover it), scooter has no tank spot (under the seat), boda boda has no tail sides (rear mudguard hidden behind the carrier) but has the rear mudguard top.
- Download link has a download attribute, so gate.js asks visitors who are not signed in to make an account.
