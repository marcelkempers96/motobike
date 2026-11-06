# What the 100 videos teach, and how Moto Zero pages should use them

Source: videos.json (100 videos, 42 channels, 506k to 35.5M views). Descriptions are editorial summaries, not
transcript-verified, so check each video before embedding. video-map.json holds the page mapping.

## Role split in the map
- 20 tutorials, 37 explainers, 24 case-studies, 19 skips (pure mods, turbo stunts, one-off engine showpieces).
- Only about 60 videos reach a page. The rest are inspiration. Max 3 videos per page was enforced,
  best instructional first, then most viewed.

## Maintenance (17 videos)
- Teaches: chain clean, lube, slack and replacement; oil and filter; clutch free play; brake bleeding; coolant flush;
  storage and winterising; washing; beginner checklists; tool choice.
- Formats that work: short numbered steps on camera (3 to 7 minutes), comparison tests (chain lube and cleaner),
  "N jobs every rider should learn" lists. Chain care alone has 7 videos.
- Gaps: slack, free play, torque, oil grade and coolant type are rarely stated, or given only for one bike. Several
  are US or Western market, with no commuter or underbone bikes. Storage advice depends on climate.
- Pairing: repair page is the procedure (chain-adjust, chain-clean-lube, engine-oil-service, brake-bleed,
  clutch-cable-adjust, coolant-replace). Put the video as "see it done", then our own numbers box with
  "check your manual". Link the part page (chain, engine_oil) and course m4-maintenance.

## How it works (14 videos)
- Teaches: whole bike systems, clutch, gearbox, scooter CVT, disc brakes, carburettor and EFI, four-stroke
  lubrication, a real engine cut through (SR250).
- Formats that work: animation and cutaway (2 to 6 minutes), slow-motion demo (transparent carburettor),
  real engine on a bench, side by side comparison (carb against EFI).
- Gaps: animations show one generic design, so they skip wear, adjustment and symptoms. CVT is often confused with
  a geared box. Brake animations skip bleeding and pad wear.
- Pairing: part page first (what it does, parts list, symptoms), course chapter for depth, problem page only when
  the animation explains the symptom (clutch slip, CVT slip). Never replace our diagrams, add the video under them.

## Diagnostics (7 videos)
- Teaches: carburettor cleaning and its common faults, pilot jet blockage, stator and regulator tests, a
  will-it-run investigation on an old Suzuki.
- Formats that work: symptom led titles ("clogged pilot jet"), top 5 problem lists, test sequence with a multimeter.
- Gaps: resistance and AC voltage readings are for that bike only. Rarely say what a pass or fail looks like on other
  models. Stator videos mix single phase and three phase.
- Pairing: problem page (not-charging, rough-idle, hard-cold-start) with the matching repair page
  (stator-test, carburettor-clean). Our pages must give the decision, "if reading is X, do Y", or point to the service manual.

## Engine engineering (13 videos)
- Teaches: layouts, crossplane and V engines, bore against stroke, cylinder offset, redline, RPM, Honda V3, RC211V,
  Ducati V4, a twin balance correction.
- Formats that work: animation with narration, "myth" or "everything you need to know" titles, debates between creators.
- Gaps: mostly sport bikes, little on 100 to 150 cc commuters. One video exists only to correct another, a reminder
  that views do not equal correctness.
- Pairing: course chapters m1-types, m2-fundamentals and m2-bottom-end; part pages crankshaft and cylinder. Not for
  problem pages.

## Restoration (13), Custom builds (8), Custom engineering (8), Manufacturing (2)
- Teach: order of work, how parts fit together, how an engine is built from nothing. Strong view counts (35M for a
  70 cc factory assembly), but time-lapse hides measurements, inspection decisions and failed attempts.
- Formats: before and after, ASMR, 18 minute time-lapse, factory line, "from trash".
- Gaps: no torque, clearance or test results. Visual finish is not proof of safety.
- Pairing: case-study only, on engine, crankshaft, crankcase, piston and cylinder part pages and m2-bottom-end.
  Never on repair pages. Label them "build film, not a procedure".

## Engine repair (6 videos)
- Teaches: strip and rebuild of Honda SS50, XL175, CG125 era engines, KX250 two-stroke, plus Hindi videos on 100 cc
  commuter engines (Splendor, Passion, CD100).
- Formats: long real workshop footage (13 to 50 minutes), ASMR style, narration in Hindi.
- Gaps: model variants matter and are not flagged. No captions exposed on some. Costs quoted have no place or date.
- Pairing: m2-top-end and m2-bottom-end plus engine and piston part pages. Our pages should add model ID checks and
  a Hindi term list.

## Modifications (6), Workshop tools (2), Chassis engineering (4)
- Mods: all skipped. List formats ("5 mods", "under $50") get views but teach no repair. Legality claims differ by country.
- Tools: task to tool lists work. Pair with basic-tool-kit and special-tool-choice, and m1-workshop.
- Chassis: suspension terms, geometry, axial against radial brakes, ABS test. Good glossary material. Pair with m4-suspension,
  m4-frame-steering, m4-brakes and parts rear_shock, forks, brake_caliper.

## Format lessons for our own pages
- Lead with one sentence of why, then steps. Short videos (under 8 minutes) dominate the maintenance list.
- Name the tool and the number on screen. Videos that skip numbers are the ones we must fill.
- Comparison tests only work with stated criteria; do not copy a "winner" into our pages.
- Always show the symptom first (revs rise, bike creeps), then the part. Matches our problem to part to repair flow.
- Embed after our text answer, not before; keep the video optional.

## Second collection (V101 to V300)
- Mapped 200 more: 27 tutorials, 48 explainers, 94 case studies, 31 skips (speed builds, styling time-lapses, product lists).
- New tutorial topics: fork seals and full fork rebuilds (conventional and inverted, plus a home-made seal driver), tyre
  change and balance, tubeless plugs and roadside puncture repair, tyre replacement signs, wheel bearing check and
  replacement, brake pads and caliper rebuild, shim-type valve clearance, chain adjust and sprockets, wheel alignment,
  rider sag, oil and filter change, starter relay test, engine break-in, and two Indian carb idle and mixture videos.
- New explainers: ABS (three), quickshifter, gearbox animation, clutch animations, Yamaha EFI training film, octane,
  fuel stabiliser test, oil and filter tests, forks RSU against USD, chain against belt against shaft, two-stroke
  expansion chambers, desmodromic valves, rotary engines, frame metals.
- Case studies: about 15 will-it-run revivals now sit on m2-diagnosis (fault-led journeys; extract the real check
  order before quoting them). 11 electric videos are case studies on motor, controller, traction_battery, bms and
  m5-architecture, m5-batteries, m5-safety: high voltage, not DIY instructions.
- Hindi Splendor top-end videos and Jawa, Vespa and BMW engine films go on piston, cylinder, crankcase and m2 chapters.
- Gaps that remain: no tutorial for any EV repair or problem page; nothing on m3-ignition, m3-lighting-wiring,
  m5-controllers or m5-charging; no compression test, plug reading or coil test, no-spark, smoke diagnosis (blue, white),
  drum brakes, CVT belt and roller service, cooling (coolant, thermostat, fan), battery test and charge, cam chain.
- Pages that most need a video still: compression-test, battery-test-charge, ignition-coil-test and no-spark,
  cvt-belt-replace and cvt-roller-check, drum-brake-service, coolant-check and thermostat-test, blue-smoke and
  white-smoke, wiring-fault-find, air-filter-service, steering-bearing-check, and the ev-no-ready and ev-wont-charge
  problem pages.
- Caution for editors: many tutorials quote one model's values (fork oil level, valve clearance, chain slack). Our
  pages must give the method and send readers to their own manual for numbers.
