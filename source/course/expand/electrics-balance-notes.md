# Electrics balance notes (Module 4, m3b.js)

Words per chapter (brief snippet), before → after:
- 4.1 `m3-electrical-basics` (new) → 3536
- 4.2 `m3-battery-charging` 2514 → 3201 (rested-vs-cranking test and battery job sheet, fitting/commissioning/storage, LiFePO4 charging, stator AC output and rectifier diode tests, pointer to 4.3)
- 4.3 `m3-starting` (new) → 3351
- 4.4 `m3-ignition` 2364 → 3001 (coil test ranges table, exciter/peak-voltage, wasted-spark polarity, timing-light and plug-service job sheets, no-spark order)
- 4.5 `m3-lighting-wiring` 2536 → 3040 (lamp current table, lighting load, headlight-aim steps, brake switches, instruments/warning lamps, fuse sizing example)
- 4.6 `m3-diagnosis` 2384 → 2979 (general method, intermittent faults, short-circuit job sheet, charging-voltage table, clamp meter)

New chapters: `m3-electrical-basics` (position 1), `m3-starting` (position 3). New eqs: m3-series-resistance, m3-kvl, m3-kcl, m3-parallel-reciprocal (4.1); m3-starter-current, m3-starter-reduction (4.3).
Moved (not removed): eq `m3-ohms-law` from 4.4 and eq `m3-electric-power` from 4.5 to 4.1, where they are now first taught; each old place has a short paragraph pointing back to 4.1.
Number fixes: diagnosis job sheet titles 3.6.x → 4.6.x; CAN paragraph "module 5" → "Module 6".

Quiz: m3b-01, m3b-02 (4.1), m3b-03, m3b-04 (4.3), with check blocks. Prefix `m3b-` used instead of m3-43+ because the fuel group adds m3-ids at the same time and both files share the m3- prefix.

Glossary: glossary.js `m3` and `m3b` split (m3: 43 terms, m3b: 39). Kept in both: Back-probing, CKP, Fault code (DTC), Freeze frame, MAP sensor, MIL, OBD, TPS, Voltage drop. Reading lists left identical. New terms: electrics-balance-glossary.json (25).

CHAPTER_IMG to add in assets/learn.js:
- 'm3-electrical-basics': 'repair-photos/086_simplest_wiring_system.jpg'
- 'm3-starting': 'interactive/wiring/preview/starting-cranking.png'

Open questions:
- 4.2 keeps its title "Battery, charging and starting" and its starting/kickstart sections (no content removed); rename to "Battery and charging" if wanted.
- 4.3 has no `lab` link (the Overview has no starter part); the Wiring Lab and Under the Engine links are in the chapter.
- Ignition (3001) and diagnosis (2979) sit near the 2,900 floor.
