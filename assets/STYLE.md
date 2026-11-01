# Under the Engine — production style guide

Series: **Under the Engine: a technical course on how motorcycles work**, published by **Transitions Lab** as an open educational programme. Companion interactive explorer: https://www.transitionslab.org/motorcycle-anatomy (four-stroke and two-stroke cross-section, animated engine cycle, sliders for bore, stroke, compression ratio and RPM, exploded motorcycle diagram with clickable parts).

Licence: text and illustrations CC BY-SA 4.0 (Transitions Lab).

Project root: /home/claude/mc
- content/  module Markdown (m1.md … m5.md)
- figs/     illustration SVGs (F01.svg …) and preview PNGs (figs/preview/)
- fonts/    fonts.css + woff2 (IBM Plex Sans, Sans Condensed, Mono, Serif)
- tools/render.js  `node /home/claude/mc/tools/render.js in.svg out.png 1600` renders an SVG onto the blueprint grid plate with the real fonts so you can LOOK at it with the Read tool.

Source PDFs (reference only; do not copy their figures or text verbatim):
- /mnt/user-data/attachments/f0987f0a-0fef-5b76-b4a0-47802e60f2d8/c531f17b-ED319915.pdf  MAVCC "Motorcycle Mechanic" teacher edition, 1988, 19 units (safety, tools, metric measurement, fasteners, engines, battery/electrical, carburetion, wheels/tyres, steering/suspension, brakes, clutches, starting, ignition tune-up, engine tune-up, chassis tune-up, pre-delivery, single-cylinder top end). Text extracted at /tmp/claude-0/eric.txt
- /mnt/user-data/attachments/f0987f0a-0fef-5b76-b4a0-47802e60f2d8/438bee2f-manuel-entretien-k-light125.pdf  KS/Qianjiang K-Light 125 maintenance manual: modern EFI single, CBS, catalytic converter, specs table p.18-19, fault-diagnosis trees p.20-46, inspection/adjustment p.47-71, electrical p.72-104, chassis p.105-189, engine p.190-250, EFI p.251-276, circuit diagram p.277.
- /mnt/user-data/attachments/f0987f0a-0fef-5b76-b4a0-47802e60f2d8/45191bc3-Unit-2.pdf  Hero Honda technician starter kit "Unit 2 The Motorcycle" (systems overview with SAQs).
- /mnt/user-data/attachments/f0987f0a-0fef-5b76-b4a0-47802e60f2d8/0dbd4246-artofmot00solo.pdf  Guggenheim "The Art of the Motorcycle" (history; Falco essay on technical evolution).
Use `pdftotext -f A -l B -layout file -` to read ranges.

---------------------------------------------------------------------
## 1. ILLUSTRATION STYLE (blueprint / patent plate)

Reference look: US patent drawings printed in navy on white grid paper; clean technical line art like the Triumph Bonneville anatomy diagram (light blue fills, black labels with leader lines). Hand-quality technical illustration, NOT clip-art, NOT primitive geometric shapes. Real proportions, real part shapes (finned cylinders, spoked or cast wheels with tyre tread profile, fork tubes with dust seals, calipers with mounting bolts, chain with individual links where scale allows, exhaust with heat shield, etc.).

Hard rules:
- Pure hand-authored SVG. `viewBox` set, no width/height attributes (they scale). No raster images, no external refs, no filters/blur/drop shadows, no gradients except none. No emoji.
- Background transparent (the page supplies the grid paper). Do NOT draw a grid.
- Palette (only these):
  - INK  `#1E2B5E`  all linework and text
  - TINT `#DCE4F2`  light blue fill for bodies/solids to give volume (like the Triumph diagram); use for most closed parts
  - TINT2 `#B9C7E3` slightly darker fill for shaded faces / sections / second tone
  - PAPER `#FFFFFF` occluding fill where a part sits in front of another
  - ACCENT `#C8502A` used ONLY for flow/energy (oil, fuel, current, force arrows) or to highlight the one subject part of a figure. Sparingly.
- Line weights (in viewBox units, design figures at roughly 1200–1600 units wide): silhouette/outer 2.2, internal edges 1.3, fine detail/threads/fins 0.8, hidden lines 1.0 dashed `6 4`, centre lines 0.8 dashed `14 4 2 4`. `stroke-linecap:round; stroke-linejoin:round`.
- Section cuts: 45° hatching via a `<pattern>` (lines 0.7 INK, spacing 6) over TINT2.
- Labels: font-family `'IBM Plex Sans Condensed','IBM Plex Sans',sans-serif`, 15–17 units, weight 500, INK, sentence case (e.g. "Front brake caliper"). Leader lines 0.9 INK ending in a 2.4-radius dot on the part. Keep labels outside the drawing, aligned in clean columns, leaders never crossing. Numbered patent-style callouts (italic IBM Plex Serif numerals, 15 units) are used for the exploded diagram.
- Dimension lines (geometry figures): thin 0.8 lines with small arrowheads, values in IBM Plex Mono 14.
- Every figure must render legibly when scaled to ~16 cm wide on an A4 page (so labels ≥ 15 units in a ~1400-wide viewBox).
- Put a `<title>` element inside each SVG.
- Use `<defs>`, `<g>`, `<use>` for repeated elements (spokes, fins, chain links, cells).
- Check your work: render with tools/render.js to figs/preview/Fxx.png and view it with the Read tool. Iterate until it looks like a professional technical illustration. Fix overlapping labels, wobbly proportions, gaps.

## 2. FIGURE CATALOGUE (ids are fixed; writers cite them as `![Caption](fig:F09)`)

Bikes and anatomy
- F01 Four-stroke standard road motorcycle (air-cooled 125–250 cc single, like the K-Light 125 / Honda CG / classic roadster), left side elevation, fully labelled with ~22 part labels.
- F02 Two-stroke motocross motorcycle, right side elevation (expansion chamber visible, long-travel fork, knobby tyres, radiator shroud), ~14 labels.
- F03 Electric motorcycle (mid-drive PMSM motor, belt or chain final drive, battery pack in frame, controller, charge port, DC-DC), left side elevation with battery and motor shown in dashed/hidden lines or cut-away, ~14 labels.
- F04 Automatic scooter (CVT unit-swing engine), side elevation with CVT cover cut away, ~12 labels.
- F05 Handlebar and controls viewed from rider's seat (clutch lever, front brake lever, throttle, switches with call-out circles for left and right switch clusters, instruments, ignition, tank, gear lever and rear brake pedal).
- F06 Exploded diagram of the F01 motorcycle with numbered callouts 1–30 (see list §4) and a parts legend table drawn inside the figure.

Engine
- F07 Four-stroke cycle: four panels (intake, compression, power, exhaust) of a single-cylinder OHC engine section, valves, piston positions, crank angle marked, flow arrows.
- F08 Two-stroke cycle: two panels (upstroke: compression above/induction below via reed valve; downstroke: power, exhaust port opens, transfer ports scavenge) with ports labelled.
- F09 Single-cylinder four-stroke engine sectional view (front section through the cylinder): cam chain, camshaft, rockers, valves, springs, spark plug, piston, rings, gudgeon pin, connecting rod, crankshaft, balancer, crankcase, oil sump, cylinder fins.
- F10 Valvetrain detail: SOHC rocker arm with screw-and-locknut adjuster and feeler gauge measuring valve clearance; plus small inset of DOHC bucket-and-shim.
- F11 Wet-sump lubrication circuit schematic (strainer, trochoid pump, filter, crankshaft, big end, cylinder head, cam, gearbox, return), oil flow in ACCENT.
- F13 Wet multiplate clutch exploded (basket, friction plates, steel plates, hub, pressure plate, springs, release mechanism).
- F14 Constant-mesh 5-speed gearbox with shift drum, forks and dogs (perspective or section).

Fuel, ignition, electrical
- F12 EFI system schematic: tank with in-tank pump and regulator, injector, throttle body with TPS and idle control, MAP/IAT sensor, engine temperature sensor, crank position sensor, O2 sensor, ECU, catalytic converter, warning lamp; signal lines vs actuation lines.
- F21 Charging circuit: permanent-magnet alternator (rotor/stator), regulator/rectifier (shunt type), battery, fuse, load; wiring style schematic with standard symbols.
- F22 Ignition circuit: CDI (AC) and DC-TCI/ECU variants, pickup (pulser) coil, ignition coil primary/secondary, spark plug, kill switch.
- F23 Electric starting circuit: battery, main fuse, ignition switch, start button, clutch/neutral/side-stand interlocks, starter relay, starter motor, starter clutch.

Chassis and drivetrain
- F15 Chain final drive: front and rear sprockets, O-ring chain section (pin, bushing, roller, plates, O-rings), measuring chain slack and 20-link wear length.
- F16 Scooter CVT: drive pulley (variator with rollers, ramp plate), V-belt, driven pulley with torque cam and centrifugal clutch, showing low ratio vs high ratio.
- F17 Steering geometry: rake angle, trail, wheelbase, fork offset, steering axis, contact patches, dimension lines.
- F18 Suspension: telescopic fork cutaway (spring, damper rod, oil level, seals, bushings) and rear monoshock/twin shock with sag measurement.
- F19 Brakes: hydraulic disc system (master cylinder, reservoir, line, caliper section with pistons, pads, disc) and a drum brake (shoes, cam, return springs) side by side.
- F20 Tyre: sidewall markings (e.g. 110/70-17 54H, DOT date code, TWI), section through a tyre (bead, carcass plies, belt, tread).

Electric drive
- F24 Electric motor sections: outer-rotor hub motor (BLDC) and inner-rotor IPM PMSM mid-drive, showing stator teeth, windings, magnets, Hall sensors, bearings.
- F25 EV powertrain block diagram: battery pack, BMS, main fuse, pre-charge circuit and contactor, motor controller (inverter, 6 MOSFETs), motor, position sensor, VCU, DC-DC converter to 12 V, charger/charge port, CAN bus, throttle and brake inputs, regen path in ACCENT.
- F26 Battery pack construction: 21700/18650 cylindrical cells in series-parallel (e.g. 20S10P concept), nickel strips/busbars, cell holders, BMS board with balance leads, thermistors, enclosure, connector; inset of one cell section.

## 3. LOGO
Owned by the lead (not by agents).

## 4. EXPLODED DIAGRAM PARTS (F06; also the vocabulary for the website explorer — writers use these exact names)
1 Fuel tank · 2 Seat · 3 Side cover · 4 Air filter box · 5 Frame · 6 Steering head and triple clamps · 7 Handlebar and controls · 8 Headlight · 9 Instrument cluster · 10 Front fork · 11 Front wheel and tyre · 12 Front brake disc and caliper · 13 Front mudguard · 14 Engine (cylinder head, cylinder, crankcase) · 15 Throttle body and injector · 16 Exhaust header and catalytic converter · 17 Silencer · 18 Swingarm · 19 Rear shock absorbers · 20 Rear wheel and tyre · 21 Rear brake disc and caliper · 22 Drive chain · 23 Front sprocket · 24 Rear sprocket · 25 Footpegs, gear lever and brake pedal · 26 Side stand · 27 Battery · 28 ECU · 29 Regulator/rectifier · 30 Tail light and indicators

---------------------------------------------------------------------
## 5. WRITING STYLE (module text)

Audience: a motivated learner (technician trainee, engineering student, researcher, rider) who wants to leave understanding (1) how the motorcycle works, (2) every component and sub-component, (3) how to inspect, diagnose and repair. Very technical, specific, comprehensive. Covers four-stroke, two-stroke and electric machines, all categories (mopeds, scooters, commuter, standard, sport, touring, off-road, cruiser, e-bikes/pedelecs where relevant).

Prose rules (strict):
- No em-dashes (—) anywhere. Use commas, colons, parentheses or full stops. En-dash only in numeric ranges (e.g. 0.10–0.14 mm).
- No throat-clearing openers ("In this chapter we will…", "Let's dive in"), no meta-labels, no AI jargon, no hype words ("crucial", "delve", "robust", "seamless", "game-changer", "landscape", "unlock").
- Dense, specific, evidence-forward. Prefer numbers, tolerances, typical values, mechanisms and causes. Explain WHY things are designed as they are.
- Avoid short standalone punchy sentences.
- British spelling (tyre, aluminium, colour), SI units first (imperial in brackets only where common, e.g. psi for tyre pressure).
- Use the K-Light 125 (air-cooled EFI 125 cc single, CBS) as the recurring worked example; cite its manual values as "K-Light 125 manual" where used. Use other real examples where helpful (Honda CG125, Bajaj Boxer, Yamaha YZ125 two-stroke, Honda PCX scooter, Zero, Energica, Roam Air, Ather, Gogoro swapping) without inventing specs you are unsure of; if unsure, give a typical range instead.

Markdown conventions (the build script depends on these exactly):
- File starts with YAML-free header lines:
  `% Module N`
  `% Title`
  `% One-sentence subtitle`
  then a blank line.
- Each chapter: `# N.M Chapter title` (e.g. `# 2.3 The two-stroke cycle`). Sections `##`, sub-sections `###`.
- Every chapter opens with a `> [!OBJECTIVES]` callout listing 3–6 outcomes as `> - ...`.
- Callouts: `> [!NOTE]`, `> [!WARNING]` (safety), `> [!SPEC]` (reference data, usually K-Light 125), `> [!TRY]` (exercise on the online explorer at transitionslab.org/motorcycle-anatomy: use sliders bore/stroke/compression/RPM, the cycle animation, the two-stroke/four-stroke toggle, or the exploded diagram by part name). Each callout: first line `> [!TYPE] Optional title`, following lines `> text`.
- Figures: on their own line `![Figure caption sentence.](fig:F09)`. Only ids from the catalogue. Each figure used once across the whole series; use those assigned to your module.
- Equations: fenced block with language `eq`, one equation per line, plain text with unicode (×, π, ², √, ≈, η). Follow with a "where" list if needed.
- Tables: GFM pipe tables with header row. Keep ≤ 6 columns.
- Job sheets (practical procedures): `## Job sheet N.M.k: Title`, then a short table `| Tools and materials | Reference values |` or a bullet list "Tools:", then a numbered procedure (1. 2. 3.), each step concrete (what to measure, with what, typical limit, what a bad reading means). End with `**Pass criteria:** ...`.
- Troubleshooting: tables `| Symptom | Likely cause | Check | Remedy |`.
- Each chapter ends with `## Review questions` containing 8–12 numbered questions mixing recall, calculation and diagnostic scenarios, then `## Answers` with the matching numbered answers (worked calculations shown). These answers stay in the chapter.
- Module ends with `# Glossary` (definition list as `**Term**: definition` lines, 25–50 terms) and `# Further reading` (real, verifiable references: manuals, textbooks like Gordon Jennings "Two-Stroke Tuner's Handbook", Tony Foale "Motorcycle Handling and Chassis Design", Vittore Cossalter "Motorcycle Dynamics", Heywood "Internal Combustion Engine Fundamentals", Bosch Automotive Handbook, Haynes manuals, UNECE regulations, standards; plus the four source PDFs).
- No HTML in the Markdown.
