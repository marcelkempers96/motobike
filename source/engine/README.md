# Under the Engine (Moto Zero)

This is an interactive 3D model of a 125 cc air-cooled single-cylinder four-stroke motorcycle engine, built with Three.js. Every gear, chain, fork, roller and valve moves in sync with the crank. It covers the crank and piston, the cam chain and valvetrain, the magneto, stator, pickup, CDI and ignition coil, kick and electric starting with the roller one-way clutch, the balancer, the wet multi-plate clutch with its cable lifter and push rod, the five-speed constant-mesh gearbox with its dog clutches, the shift drum, forks, star detent, ratchet and gear pedal, and the front sprocket and chain.

## Files

| Path | What it is |
|---|---|
| `index.html` | Standalone page, identical to the published artifact. Open it in a browser to see the reference behaviour. |
| `src/engine.js` | The full model: geometry builders, part registry, simulation, kinematics, picking, labels, camera views, UI wiring and data tables. ES module. |
| `src/engine.css` | Page styles. All colours and fonts are tokens on `:root`, so swapping the tokens re-themes everything. |
| `src/markup.html` | Page markup. Every id and `data-*` attribute in it is read by `engine.js`. |
| `src/importmap.json` | Import map for `three@0.160.0` and its addons from jsDelivr. |
| `data/engine-spec.json` | Engine specification: gearbox pairs, all gear trains, overall ratios, road speeds, drum positions, valve timing, ignition values and the sources used. |
| `data/model-geometry.json` | Exported from the running model: all 52 parts (id, name, system, description, specs, explode vector, label offset, base position), the shaft layout, fork keyframes, chain data, mesh phase offsets and star detent geometry. |
| `data/gear-and-parts-data.xlsx` | The same data as a workbook with live formulas: Inputs, Gearbox ratios, Other gear trains, Shift drum sequence, Fork keyframes, Valve timing, Shaft layout and Parts catalogue. Change a tooth count in a blue cell and the ratios recalculate. |
| `docs/MECHANICS.md` | Every equation and simulation rule, with the function name that implements it. |
| `docs/CLAUDE_CODE_PROMPT.md` | A ready prompt for Claude Code to fit this into the Transitions Lab site theme. |
| `renders/` | Nine screenshots of the model: whole engine, gearbox in function colours, clutch cutaway, shift drum and star, generator during electric start, kickstart, valvetrain, exploded view, phone width. |
| `reference/screenshots/` | The 16 reference frames supplied for this build (`ref-a01` to `a05` from the first message, `ref-b01` to `b11` from the second). |
| `reference/video/` | The video transcripts (original .docx and plain text). Video 4 is unusable auto-captioning and was not used. |

## Running it

There is no build step. Serve the folder from any static server (for example `npx serve .`) and open `index.html`. Three.js loads from `cdn.jsdelivr.net` through the import map. To self-host it, install `three@0.160.0` and point the import map at your copy. A real GPU is expected; the page has only been checked under software rendering.

## Putting it on the website

1. Take the markup from `src/markup.html` and drop it into a page template, keeping every id. The header block (`header.top`) and footer can be replaced with the site's own header and footer.
2. Load `src/engine.css`, then replace the `:root` tokens with the site's tokens. Component rules only read tokens: `--bg --card --ink --text --muted --line --line2 --accent --accent-soft --accent-line --btn --btn-h --on-bg --on-fg --ok --view-a --view-b --label-bg`, the role colours `--c-spl --c-free --c-fix --c-shaft`, and the fonts `--sans --cond --mono`. Delete the two dark-mode blocks if the site handles dark mode itself.
3. Add the import map and then `<script type="module" src="engine.js">`. The import map has to appear before any module script.
4. Inside the 3D view, the materials use fixed hex colours (`MAT` and `ROLE` near the top of `engine.js`, and the accent glow `accentC = 0xC8502A`). Change them there if the site palette needs different metal or highlight colours.

### DOM contract

`engine.js` expects these elements:

- **View:** `#view` (canvas host, the renderer prepends its canvas), `#tags`, `#tip`, `#focusPill` with an inner `span` and `#showAll`, and the stroke dial: `#strokeArc`, `#strokeHand`, `#strokeName`, `#strokeDeg`.
- **Camera buttons:** any element with `data-cam` set to `overview`, `gearbox`, `clutch`, `shift`, `top`, `gen`, `start` or `final`.
- **Readouts:** `#roRpm`, `#roGear`, `#roClutch`, `#roMain`, `#roCounter`, `#roSpeed`, plus `#msgbar` and `#msg`.
- **Controls:** `#bKick`, `#bElec`, `#bKill`, `#throttle`, `#throttleOut`, `#bClutch`, `#clutchLatch`, `#gearChips` (filled by the script), `#bDown`, `#bUp`, `#speedBtns` with buttons carrying `data-ts`, `#explode`, `#explodeOut`, `#optCut`, `#optShell`, `#optPath`, `#optFunc`, `#optTags`, `#funcLegend`.
- **Panel:** `#info` (part card, rewritten on selection) and `#plist` (parts list, built by the script).
- **Tables:** `#tRatio`, `#tShift`, `#tTrains` (filled by the script).

Keyboard: the up and down arrow keys shift gears when focus is not in an input. `window.__tick(n, dt)` advances the simulation n steps without real time passing, which is useful for automated screenshots.

## How the code is organised (engine.js)

1. Renderer, camera, OrbitControls, RoomEnvironment lighting.
2. Materials (`MAT`) and function colours (`ROLE`).
3. Geometry helpers: `gearShape`, `gearGeo`, `ringGeo`, `cylX`, `helixGeo`, `bearing`, `splines`, `rod`, `tube`.
4. Layout constants: shaft positions, gear columns, crank and cam dimensions.
5. Part registry: `part(id, meta, object)` registers each assembly with its system, description, spec function, explode vector, label offset and function role. It clones materials per part so highlighting, fading and cutaway clipping work independently.
6. The assemblies in order: crankshaft, piston, rod, cylinder shell, camshaft, rockers, valves, spark plug, cam chain, rotor, stator, pickup, CDI, coil, wiring, starter clutch, reduction gear, starter motor, kickstarter, kick idle, balancer, primary gear, clutch basket, hub, plates, pressure plate, springs, push rod, lifter, mainshaft, countershaft, ten gearbox gears, shift drum with channels, star and stopper, three forks, fork shafts, shift spindle and ratchet, neutral switch, sprocket, drive chain.
7. Simulation: `step()` covers engine state, kick and electric start sequences, clutch, mainshaft and countershaft, the starter clutch, shifting and spark. `apply()` writes every angle and offset to the scene. `paint()` handles highlight, power path glow, function colours, isolation and cutaway.
8. UI: buttons, gear chips, camera views with system isolation, parts list, picking and hover, labels, stroke dial, readouts, data tables.

## Caveats

- Tooth counts and dimensions are representative of 125 cc commuter engines and are not copied from one manufacturer.
- Clutch lift (drawn 5 mm, about 2 mm in reality) and dog travel are exaggerated so the movement is visible.
- The rear wheel is treated as if the bike is on a stand, so in gear with the clutch engaged the countershaft simply follows the engine.
- Electric cranking is shown at a fixed readable speed rather than at true cranking rpm.
