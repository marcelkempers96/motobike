# Editor notes from the writers

Raw notes from each writer: values left out because the K-Light manual contradicts itself, values that need a second check, and IDs the writers wished existed. Group A: starting, ignition, charging. B: running, power, fuel. C: engine, smoke, oil, cooling. D: clutch, gearbox, chain, CVT. E: brakes, steering, suspension. F: wheels, controls, body. G: lighting, wiring. H: electric. Parts 1 and 2: part pages.


---

## Notes: A


Files written: 39 problem pages in `out/problems/` and 24 repair pages in `out/repairs/`, all IDs from registry group A. Every frontmatter ID and every inline link was checked against `registry.json` with a script; no em or en dashes remain. No web sources were used: every number comes from the K-Light 125 logs (labelled "K-Light 125") and is not on the prior-README reject list.

## Values not published, or published with a caution

| Item | Evidence | What the pages do |
|---|---|---|
| Ignition coil primary resistance | PDF p85 gives 4 Ω ± 15 %, p88 gives 4 Ω ± 10 % | No pass or fail number. Pages say an open reading means a broken winding and point to the coil maker's value and a swap test (prior-README rule) |
| Coil secondary resistance | PDF p85: 13.6 kΩ without cap, 18.6 kΩ with cap, ± 15 % | Not published, because it is also a coil rejection limit and the coil rows on that page are mislabelled "impedance of trigger" |
| Coil primary peak voltage | PDF p85: "15 V, maximum voltage in one measurement", meaning unclear | Not published |
| Ignition coil mounting torque | 9.0 N·m (p73, p76), 5 to 7 N·m (p88), 8.8 to 11.8 N·m (p265) | Not published. Pages say "tighten firmly to your manual's confirmed value" |
| Flywheel nut torque | 50 to 60 N·m (p73, p82) vs 55 to 60 N·m (p194) | Not published; stator and starter clutch pages say to ask the workshop to confirm it |
| Stator and pick-up bolt torques | Stator 10 to 12 N·m (p82) and pick-up 6 to 9 N·m (p82) vs "coil screw (stator/pickup)" 9.8 to 11 N·m (p194) | Not published |
| Spark plug torque | 15 N·m (p58) vs 15 to 26 N·m (p194) | 15 N·m used, as prior-README decided |
| Spark plug re-gapping | p58 gives the gap; p89 says replace a plug whose gap is wrong | Pages give the gap, say to set it on a new plain plug, and note the p89 advice for used plugs |
| Alternator output | 100 W at 5000 rpm (p19) vs 160 W at 5000 rpm (p76) | Not published |
| Starter relay coil wire colours | Text p93 to 94 says black and green/yellow; drawing p90 says green/yellow and orange/red | Pages name green/yellow only and tell readers to follow their own diagram |
| Pick-up wire colours | Drawing p83 says white/blue; text p87 says blue/white | Pages say "blue/white and green/white" and to follow the wires on the bike |
| Starter relay voltage test | p93 says "pull the brake lever", carried over from scooters; the K-Light interlock uses the clutch or neutral switch (p90) | Pages say clutch pulled, or brake lever on a scooter |
| Fault-chart "bridge relay contacts" and "jumper relay main terminals" (p37 to 38) | Unsafe, rejected by prior-README | Not used. Starter pages say never to bridge relay terminals. The relay function test is done on the bench (p94 method) |
| "Prime a dry plug with fuel" (p21 to 22) | Unsafe, rejected | Not used. The flooding page says never to pour fuel into the cylinder |
| MAVCC charging check (p310): about 8 to 9 V while cranking, 15 V charging | Generic textbook values, rejected | Not used. The charging page says not to use one number for every bike |
| MAVCC voltmeter limits (p293): 10.5 V lights on, 8.5 V cranking | Generic | Not used. The 8.5 V on the CDI/ECU pages is the K-Light diagnostic tool's minimum battery voltage (p274), not a cranking limit |
| MAVCC "never jump from a car" (p290) | Dated, oversimplified | Updated in `jump-start`: use a motorcycle jump pack or another bike; if a car is the only donor, keep its engine off; follow lithium makers' rules |
| Leakage current | K-Light p36 gives 1 mA or less | Published, labelled K-Light 125 only. Prior-README says parasitic-draw limits vary by model, so pages tell readers to use their own manual's limit, and note that bikes with alarms or clocks may draw more |
| Fuel pump prime | About 3 s at key on (p268) | Published, labelled |
| ECU supply 9 to 16 V (p255); fast idle below 68 °C (p276); head temperature sensor 1.9 to 2.1 kΩ at 25 °C (p261) | K-Light values | Published, labelled. No pin-level EFI tests (prior-README rule) |
| Fault code P0335 (crank position sensor) | p270 | Published as a K-Light example only |
| Kick-start and starter cranking time limits | Not in any source | No numbers given. Pages say "short bursts" and "follow your manual's limit" |

All time values in repair frontmatter are editorial estimates. Workshop pages estimate assessment time only.

## Other conflicts and source issues noticed
- The K-Light no-start flowchart (p21 to 22) and the starter flowchart (p37) are generic multi-model charts. Carburettor, CDI and scooter brake-switch branches were kept only where they fit the wider commuter fleet, never as K-Light facts.
- The K-Light ignition fault chart (p86) mentions a camshaft position sensor, but none appears in the wiring diagram. Not used.
- The K-Light camshaft has a decompressor-type spring (p238). The kickback page mentions decompressors in general terms only, because no K-Light decompressor check or setting exists.
- The K-Light troubleshooting says cranking at full throttle clears a flooded engine (p275), and also says not to touch the throttle when starting normally (p277). Both are used, and both are labelled as K-Light behaviour that readers should check against their own manual.
- MAVCC (p601) says the starter clutch is the "most common" electric-start fault. The ranking tables keep battery and terminals first, because they are cheap to check. As prior-README says, the rankings are teaching priorities, not failure statistics.

## IDs I wished existed (not used in pages)

| Suggested ID | Type | Title | Why |
|---|---|---|---|
| `starter-gear-check` | repair (workshop) | Check the starter reduction and idle gears | Grinding and spinning-starter pages currently send gear checks to `starter-motor-service` or `starter-clutch-check` |
| `stator-replace` | repair (workshop) | Replace the stator and pick-up | `stator-test` holds a short hand-off section for this |
| `regulator-replace` | repair (home) | Replace the regulator rectifier and its connector | Melted connectors are common. Re-terminating them is now covered only under `connector-clean`, which is a weak fit |
| `immobiliser-fault` | problem | Engine starts then stops; key not recognised | Mentioned in `starts-then-dies` and the CDI/ECU pages as a dealer job. Scope was deferred in prior-README |
| `decompressor-check` | repair (workshop) | Check the automatic decompressor | For hard kick starting and kickback on engines that have one |
| `rev-limiter-normal` | problem | Engine cuts at the same high revs every time | Now covered by a note in `misfire-high-rpm` |
| `battery_cable` | part | Battery and starter cables | Now mapped to `wiring` and `earth_strap` |
| `flywheel_key` or `flywheel` | part | Flywheel and Woodruff key | Timing and backfire pages point to a sheared key, but the part maps only to `stator` |
| `starter_diode` | part | Starter interlock diode | The K-Light starter circuit has one (p90). It now maps to `interlock_switches` |

## Merge or split suggestions
- `no-start-after-rain` (A), `wet-connectors` (G) and `dies-in-rain` (B) overlap strongly. Consider making `wet-connectors` the repair-focused page and linking it from the other two, which my pages already do.
- `kill-switch-fault` (A) and `switch-fault` (G) overlap. My page links to `switch-clean` and `switch-fault`.
- `plug-black-sooty` (A), `runs-rich` (B) and `black-smoke` (C) form a triangle. My page treats the plug as the entry point and links on to the other two.
- `new-battery-dies` mostly routes to `battery-flat`, `parasitic-drain` and `not-charging`. It is worth keeping because riders search for it, but it could be shortened to a router.
- `starter-spins-freely` and `starter-grinding` both end at the starter clutch. They are kept separate because their first checks differ: battery and direction for the first, mounting bolts and timing kickback for the second.

## Editorial choices to review
- Urgency: `starter-keeps-running` and `battery-swollen` are `stop-now`. The do-not-ride pages are `cranks-no-start`, `flooded-engine`, `starts-then-dies`, `no-start-after-storage`, `no-spark`, `coil-fails-hot`, `kill-switch-fault`, `overcharging`, `regulator-hot` and `stator-burnt`. These are editorial judgements.
- A few problem pages run 650 to 690 words of prose (`hard-cold-start`, `starter-silent`, `starts-only-with-choke`, `cranks-no-start`), slightly over the 650-word guide, because of their branch count.


---

## Notes: B


Written: 43 problem pages in `out/problems/`, 22 repair pages in `out/repairs/`. All IDs and internal links checked against `registry.json` by script; no em or en dashes.

Sources read: both K-Light logs in full; MAVCC logs pp. 246-483 and 651-878 in full; MAVCC pp. 1-245 (Unit II safety) and pp. 484-650 (Unit XV ignition) for the relevant sections; Unit 2 log. K-Light EFI values and MAVCC page numbers were checked against the PDFs with `pdftotext`. No web sources were used.

## Values used that are not in the prior-README verified table

All are labelled "K-Light 125" and cited by PDF page. Please review before publishing.

| Value | PDF page | Where used | Note |
|---|---|---|---|
| Idle 1500 ± 100 rpm | 49 | stalls-at-idle, high-idle, idle-relearn | EFI bike; no carburettor idle speed given anywhere |
| ECU fast idle below 68 °C | 276 | choke-check, high-idle, idle-relearn, dirty-throttle-body | Manual says "water temperature" (generic text); the K-Light is air-cooled with a head temperature sensor |
| Fuel pump primes about 3 s at key-on | 268 | fuel-pump-check, fuel-pump-silent, fuel-pump-noisy | |
| Pump supply 12 ± 2 V during priming | 269 | fuel-pump-check, fuel-pump-silent | Measured at the pump plug; no ECU pin numbers published |
| Fuel pressure about 300 kPa; fault below 270 kPa | 255, 266, 269 | fuel-pump-check, injector-check, fuel-starvation, fuel-pump-noisy | Given only as what the workshop measures. Prior README rejects a universal EFI pressure and any home opening of pressurised lines; neither is done. Remove if the editor reads that rule as covering model-labelled values too |
| Injector coil about 10 Ω | 258 | injector-check, injector-fault | Workshop reference |
| O2: rich above 750 mV, lean below 120 mV, heater 9.6 ± 1.5 Ω at 21 °C, swings 0 to 1 V warm | 264 | o2-sensor-check | Workshop reference |
| O2 always above 500 mV warm suggests a leaking injector | 276 | injector-check, injector-fault | |
| TPS, MAP, IAT and head-temperature values; 4.9 V / 0.1 V code limits | 259, 262, 263, 269 | efi-sensor-check | Workshop reference; no pin numbers |
| Idle stepper 50 ± 10 % Ω at 20 to 30 °C | 266 | idle-relearn | Workshop reference |
| Example P-codes | 269 to 271 | efi-code-read and several problem pages | Labelled as K-Light; other bikes differ |
| Diagnostic tool needs battery of at least 8.5 V | 274 | efi-code-read | |
| ECU supply range 9 to 16 V | 255 | cuts-out-random ("at least 9 V") | |
| Throttle body cleaning every 10,000 km or 1 year | 274 | throttle-body-clean | |
| Air filter: clean every 3000 km, replace at 12,000 km | 51 | air-filter-service | Schedule table has an odd 15,000 km column; only the 3000 and 12,000 entries are used |
| Tank 11.8 ± 0.5 L; fuel unleaded 92 or 95 | 181, 274 | drain-fuel, water-in-fuel, pinking, high-fuel-use | |
| Max speed 90 km/h in fifth | 19 | low-top-speed | |
| Fuel level sensor nut 5 to 9 N·m | 187 | fuel-sender-test | Same value on PDF 180, 181 and 187 |
| Rear sprocket 41 teeth | 158 | poor-hill-climbing | |
| Rear brake pedal free play 20 to 30 mm; rear pushrod clearance 0 to 0.2 mm | 62, 116 | bike-feels-held-back | Brake values are group E's area; please check they agree with group E pages |

## Conflicts found and values left out

- **Fuel filter interval:** PDF 51 schedule (inspect at 6000 km, replace at 12,000 km), PDF 274 (7000 to 10,000 km) and PDF 275 (7000 to 18,000 km) disagree. No interval is published; fuel-filter-replace says to follow the bike's schedule.
- **Fuel tank mounting bolt:** 10 to 12 N·m (PDF 181, 187) against 5 to 9 N·m (chassis table, PDF 106). Not published.
- **Fuel pump mounting bolts 3 to 4 N·m (PDF 181, 268):** not used, because pump removal is treated as a workshop job.
- **Injector O-ring lubricant:** PDF 257 recommends ISO 10 mineral oil and then says it is "not recommended". Not used; the page only says lubricate the seals, never the nozzle.
- **Unsafe K-Light advice not carried forward:** bench-powering the pump from an external battery (PDF 269, step c); dripping petrol into the cylinder (PDF 22). Pages say not to power the pump with jump leads.
- **MAVCC values not used:** carburettor idle "about 1,200 rpm" (p. 375) and sync idle 1,000 rpm (pp. 692 to 693). The prior README rejects a generic carburettor idle speed, pilot turns, jet sizes and float height, so the carburettor pages say "use your manual".
- **Not carried over:** the K-Light flowcharts' carburettor, float and reed-valve branches (PDF 22, 25, 26), and the CVT branches (PDF 25, 27). They are generic text copied in from other models.
- Wrong MAVCC page numbers for the "poor performance" and plug-reading passages were fixed during writing: they are pp. 257 and 656, not 255 and 655.

## IDs I wished existed (none used in pages)

| Kind | Suggested id | Title |
|---|---|---|
| repair | `vacuum-tap-test` | Test a vacuum fuel tap (diaphragm and vacuum hose) |
| repair | `cv-diaphragm-check` | Check a CV carburettor slide and diaphragm |
| repair | `fuel-pressure-test` | Measure fuel pressure (workshop), separate from the pump power checks |
| repair | `crankcase-pressure-test` | Pressure-test a two-stroke crankcase for air leaks |
| repair | `petrol-bike-storage` | Store a petrol motorcycle (only `ev-storage` and `recommission-after-storage` exist) |
| problem | `two-stroke-air-leak` | Two-stroke idles high and hangs (crankcase seal leak); now routed to `engine-internal-assessment` |
| problem | `vacuum-tap-fault` | Vacuum fuel tap does not flow or lets fuel through when parked |
| part | `fuel_pump_relay` | Fuel pump relay (pages use `fuse` and `wiring`) |
| part | `evap_canister` | Rollover valve and charcoal canister (pages use `fuel_tank`) |
| part | `idle_control_valve` | Idle stepper or idle air control (pages use `throttle_body` and `efi_sensors`) |
| part | `auto_choke` | Scooter automatic choke (pages use `carb`) |
| part | `carb_rebuild_kit` | Jets, float needle and gaskets (pages use `carb`) |

## Merge or split suggestions

- `tank-vacuum` largely duplicates the vent branch of `fuel-starvation`, and overlaps `fuel-cap-fault`. Consider merging `tank-vacuum` into `fuel-starvation`.
- The ID `dirty-throttle-body` does not match its registry title ("Unstable idle after cleaning or battery disconnection"). The page follows the title. Consider renaming the ID (for example `idle-unstable-after-service`) or changing the title.
- `revs-without-speed` is a router page to the clutch and CVT pages, as the prior README merge rule ("revs rising without acceleration is clutch slip") asks. It could become a redirect to `clutch-slip`.
- `hunting-idle` and `high-idle` share most of their checks. They are kept apart because their first checks differ.
- `idle-relearn` is a workshop job in the registry, but some bikes relearn with a key-on sequence at home. The page is written as an assessment and hand-off with safe rider checks.


---

## Notes: C


Written: 39 problem pages in `out/problems/` and 26 repair pages in `out/repairs/`. All IDs and internal links checked against `registry.json` by script; no em or en dashes in group C files; every inline problem or repair link also appears in the page's `related` or `repairs` frontmatter.

## Numbers used (all K-Light 125, labelled)

Oil change 1.1 ± 0.1 L (p53), after rebuild 1.2 ± 0.1 L (p196), idle and settle 2 to 3 min (p53), oil change every 3000 km (p51), filter spring screw cap 15 to 30 N·m with the prior-README identity caveat (p194), crankcase cover bolts 9.8 to 11 N·m (p194), head cover bolt 9.8 to 11 N·m (p194), front sprocket bolt 10 to 16 N·m (p194), compression 1.0 to 1.2 MPa (p60), valve clearance 0.05 to 0.07 mm cold (p202) and locknut 10 to 15 N·m (p194), engine mounts 45 to 50 / 22 to 29 / 45 to 50 N·m (p191), muffler mount 22 to 29 and header flange 5 to 9 N·m (p106), chain slack 20 to 40 mm (p61), head temperature sensor 1.9 to 2.1 kΩ at 25 °C and 0.179 to 0.187 kΩ at 100 °C (p261 to 262), codes P0118/P0117 (p269), fuel 92# or 95# unleaded (p274). Workshop reference limits only on assessment pages: head flatness 0.05 mm, spring free length 30 / 39.5 mm, seat width 1.6 mm (p202); ring end gap 0.5 mm, roundness and taper 0.05 mm (p213); piston to cylinder clearance 0.17 mm (p217); big-end side 0.55 mm and radial 0.05 mm (p236); oil pump rotor 0.25 mm and end 0.15 mm (p196).

## Values not verified or deliberately not used

- Cylinder head nut torque: table p194 says 25 to 28 N·m, Ch. XII intro p202 says 50 N·m. Not published; pages say to use the manual sequence and torque.
- Crankshaft runout limit: table 0.1 mm vs text 0.01 mm (p236, p241). Not published.
- Cylinder ID and piston OD limits: table and text disagree (p213 vs p217). Not published. Piston to cylinder clearance 0.17 mm comes from the text only (p217); the table has no value. Flag for review.
- Valve clearance temperature: p202 does not say "cold"; "cold" is taken from the prior-README and MAVCC p671.
- Engine oil grade: not in the K-Light manual. Pages say "grade in your manual", wet-clutch motorcycle oil, no viscosity given.
- Oil pressure: no value in any source. Oil warning light page hands pressure testing to a workshop with the model manual. K-Light p53 "oil sensor alarm" is generic text.
- Oil filter cover screw 4 to 7 N·m (p194) not used: centrifugal filter access left model-specific per prior-README.
- Turning direction for TDC (p60): the log says "counter-clockwise" without a viewpoint; page tells the reader to check the arrow or manual.
- Liquid cooling: K-Light is air-cooled; no coolant type, capacity, thermostat temperature, fan switch temperature or cap pressure anywhere. Cooling pages give procedures only. Reserve-tank check procedure cited to a Honda CB500F owner's manual page (bike-parts.fr PDF).
- Two-stroke: no premix ratio, pump output or pump cable setting in any source. Pages say "use the manual", and give emergency premix only "at the ratio your manual gives".
- K-Light p29 and p213 call oil smoke "white". Pages explain this and treat it as blue/grey oil smoke.
- Editorial time estimates are labelled. One extra editorial number: milky-oil suggests a 20 to 30 minute warm-up ride, labelled as an estimate.
- MAVCC leak-down arithmetic (p670) corrected on `leak-down-test`.
- K-Light p53 suggests cranking on the starter to purge oil; `engine-oil-service` tells readers to skip this unless their own manual includes it.

## IDs I wished existed (not used in pages)

Parts:
- `oil_pressure_switch`: Oil pressure or oil level switch (oil-warning-light).
- `coolant_hose`: Radiator hoses and clips (coolant-leak, overheating-liquid).
- `fan_switch`: Thermostatic fan switch (fan-not-working on non-ECU bikes; currently mapped to `efi_sensors`).
- `catalytic_converter`: Catalyst (exhaust-glowing; currently `exhaust`).
- `valve_stem_seals`: Valve stem seals (blue-smoke, oil-level-falling; currently `valves`).
- `balancer`: Balancer shaft and gears (new-vibration).
- `silencer_packing`: Silencer packing (exhaust-loud on packed silencers).

Repairs:
- `oil-pressure-test` (workshop): Measure oil pressure with a gauge.
- `radiator-clean` (rider): Clean and straighten radiator fins.
- `shaft-seal-replace` (workshop): Replace gear lever, kickstart or clutch shaft seals. Needed by oil-leak-cover and oil-leak-sprocket.
- `valve-cap-seal` (rider): Replace valve inspection cap O-rings and head cover gasket.
- `silencer-repair` (workshop): Repack or replace a silencer.
- `water-pump-check` (workshop): Check water pump seal and bearing. Now spread over `cooling-leak-test` and `thermostat-check`.

## Merge or split suggestions

- `exhaust-loud` and `exhaust-rattle` overlap a lot; consider merging, or keep both and accept cross-links.
- `temp-gauge-high` partly repeats `overheating-air` and `overheating-liquid`; it works as a router page.
- `whine-from-engine` mostly routes to `gearbox-whine`, `clutch-noise` and `cvt-noise` (other groups).
- `oil-leak` is a hub page for the four specific leak pages; keep it that way.
- `cam-chain-check` and `cam-chain-rattle` apply only to OHC engines; both pages say so and send pushrod engines (K-Light) to `tappet-tick`.


---

## Notes: D


Written: 33 problem pages and 20 repair pages. All IDs and internal links were checked against registry.json with a script. No em or en dashes.

## Values used that are not in the prior README's verified table

All come from the K-Light logs and are not rejected by the prior README. Each one is labelled "K-Light 125" and cited.

| Value | Where used | Source | Note |
|---|---|---|---|
| Idle 1500 ± 100 rpm | clutch-drag, hard-gear-change, clunk-into-first, gearbox-assessment | PDF p. 49 (also p. 19) | |
| Friction plate standard 2.9 to 3 mm; spring standard 35.45 to 36.5 mm | clutch-plate-service | PDF p. 222 | Limits 2.6 and 34.2 mm are the verified values |
| Chain 428HO-1, 134 links; rear sprocket 41 T | chain-wear-check, chain-sprocket-replace, sprocket-inspect, sprocket-worn | PDF p. 158 | Front sprocket tooth count is not given in the manual |
| Sprocket replacement at about a quarter tooth worn, or bent | sprocket-inspect, sprocket-worn | PDF p. 177 | Qualitative |
| Rear sprocket nuts 45 to 50 N·m, two or three criss-cross passes | chain-sprocket-replace, cush-drive-check, chain-tight-spots | PDF p. 177 (also p. 158, 161) | |
| Front (drive) sprocket bolt 10 to 16 N·m | chain-sprocket-replace | PDF p. 194 | |
| Chain adjuster nut (M8) 22 to 29 N·m | chain-adjust | PDF p. 160 | From the rear suspension exploded view (item 16, nut M8). Please confirm this is the adjuster locknut and not another M8 nut before publishing |
| Chain cover bolt (M6) 10 to 12 N·m | chain-guide-check | PDF p. 160 | |
| Shift fork shaft, fork bore, fork claw, drum diameter and groove limits | gearbox-assessment | PDF pp. 230 to 233 | |

## Conflicts found and how they were handled

- **Clutch free play:** 10 to 15 mm (PDF p. 69, model service instruction) versus 10 to 20 mm (generic fault charts, PDF pp. 28, 30, 31). Used 10 to 15 mm everywhere and noted the conflict on clutch-cable-adjust.
- **Rear axle torque:** 100 to 113 N·m (PDF pp. 49, 72, 109, 158) versus 85 to 98 N·m (PDF pp. 106, 166). Not published. chain-adjust and chain-stretches-fast tell the reader to confirm the value with a dealer.
- **Chain 10-link limit of 127 mm** (PDF p. 175): this is the nominal new length for a 428 chain. Not used. chain-wear-check tells the reader to use the chain maker's limit.
- **Swingarm pivot nut** 70 to 83 N·m (p. 106) versus 85 to 98 N·m (pp. 160, 171): not needed by group D and not used.
- **K-Light generic charts:** the power-loss chart (p. 25) and clutch-slip chart (p. 28) include scooter CVT and dry centrifugal-shoe branches that do not apply to the K-Light. They are cited only as generic guidance on the CVT pages. The "under 70% shoe contact" rule from p. 28 is quoted on cvt-clutch-check as "a generic fault chart in the K-Light manual".
- **K-Light p. 222** says the clutch forms a "stepless transmission". This is scooter text carried over and was ignored.
- **MAVCC errors not carried forward:** the 0.05 mm disc wear figure (p. 577), the advice to set a new chain tighter than spec (JS4, pp. 509 to 512), and the spring-clip direction rule (p. 488, not inferred for an unknown chain). The MAVCC bleeding order (open the bleeder, then squeeze, pp. 557 to 560) was corrected to squeeze, open, close, release on clutch-bleed.

## Values not verified, so left to "follow your manual"

- Steel clutch plate warp limit (not in the K-Light manual), clutch nut and lifter bolt torques (left out on purpose under the prior README's rule of no complete clutch reassembly).
- Gear lever clamp bolt torque, neutral switch values and gear position sensor tables.
- Hydraulic clutch fluid type, bleed nipple torque.
- Semi-automatic clutch external adjuster procedure and setting.
- **All CVT numbers:** belt minimum width, roller diameter and weight, variator and clutch nut torques, clutch lining and bell limits, gear oil type and quantity, idle speed. The K-Light manual has no CVT data. Web sources: Louis (louis-moto.co.uk, "Scooter variator and clutch") and Motorcycle & Powersports News ("Tech Tips: Scooter Repair & Maintenance", no author or date). Louis gives a belt interval of roughly 10,000 to 30,000 km by engine size; this is quoted once, labelled, on cvt-belt-replace. Louis also gives "linings under 2 mm" and "about 40 to 50 Nm" for the variator nut; neither was used because both are model-specific and Louis itself refers readers to a dealer.

## IDs I wished existed (not used in pages)

| Suggested ID | Type | Title | Why |
|---|---|---|---|
| `manual-clutch` | applies_to tag | Bikes with a hand clutch lever | Clutch pages had to use `[four-stroke, two-stroke]`, which also matches scooters and step-throughs |
| `clutch-release-check` | repair (workshop) | Check the clutch release arm, lifter and bearing | Heavy lever, no-resistance and clutch-noise all end at the release mechanism; now routed to clutch-plate-service |
| `semi-auto-clutch-adjust` | repair (home) | Adjust a semi-automatic clutch | The external adjuster on step-throughs is a home job but sits inside the workshop page auto-clutch-check |
| `scooter-gear-seal` | repair (workshop) | Replace scooter final drive seals | cvt-gear-oil-leak ends at "workshop seal replacement"; sprocket-shaft-seal is for motorcycles |
| `cvt-duct-check` | repair (rider) | Check the scooter drive case cooling duct and filter | Blocked ducts overheat belts (cvt-belt-broken) |
| `chain-join-link` | repair (workshop) | Fit a chain joining link | chain-snapped and chain-sprocket-replace both rely on it |
| `cvt_pulley` | part | Variator and driven pulley (faces, boss, torque spring) | Grooved faces and the torque spring have no part ID; cvt_rollers and cvt_clutch were used instead |
| `gear_position_sensor` | part | Neutral switch or gear position sensor | Currently folded into interlock_switches |
| `clutch_release_bearing` | part | Clutch lifter and release bearing | Currently folded into clutch |

## Merge or split suggestions

- `clunk-into-first` overlaps heavily with `clutch-drag` (same first checks). Keep as a search entry but consider merging the diagnosis.
- `hard-to-find-neutral` is mostly a routing page to `clutch-drag`, `gearshift-check` and `neutral-switch-test`; the prior README had merged it. It works as a short router.
- `gear-lever-replace` and `gearshift-check` overlap on lever removal; acceptable, as one is a check and one a job.

## Other

- Several of my problem files had extra IDs added to `related` and `repairs` by another process while I worked (for example `low-power`, `lever-damaged`, `exhaust-rattle`, `chain-snapped`, `chain-clean-lube`). They are valid registry IDs that match inline links, so I kept them.


---

## Notes: E


Written: 38 problem pages and 25 repair pages. All IDs, links, enums, levels, titles and source page bounds validated against `registry.json` by script. No em or en dashes.

## K-Light values used (all labelled "K-Light 125" in pages)

Already in the prior README verified table: pad limit 3 mm (new 6.0 mm), PDF 66 and 109; DOT4, PDF 65; tyre pressures 190 / 210 ± 10 kPa, PDF 71; fork oil 285 ± 2 ml of 46#, PDF 156; chain slack 20 to 40 mm, PDF 61.

Used but NOT in the prior verified table (consistent in the logs, not rejected; editor should confirm and add them to the table):

| Value | Pages | Note |
|---|---|---|
| Front brake lever free play 10 to 20 mm at the tip | PDF 49, 61 | Large for a hydraulic lever, but it is printed twice |
| Rear pedal free play 20 to 30 mm | PDF 49, 62 | Hydraulic rear (pedal to master cylinder) |
| Rear pushrod to master piston clearance 0 to 0.2 mm, piston free | PDF 116 | Manual prints "0~0.2" with no unit; mm assumed |
| Rear reservoir cap: hand tight then 1/6 turn | PDF 65 | |
| Brake hose banjo bolt 30 N·m | PDF 64, 109, 115 | Same value on all three pages |
| Rear caliper joint bolt 30 N·m | PDF 121 | Only shown as a workshop reference in caliper-rebuild |
| Disc thickness: front 4.0 / limit 3.0 mm; rear 5.0 / limit 4.0 mm; runout limit 0.15 mm | PDF 109, 112, 114 | The prior README says "disc replacement and runout limits are left to the exact model". I read that as "no generic limit". So the K-Light values appear only with a K-Light label. Disc bolt torque (10 to 12 N·m) is not published because the bolt count conflicts (PDF 111). Editor: remove these if the README rule was meant as a total ban |
| Front axle nut 75 to 88 N·m | PDF 49, 72, 109 and others | The same value appears on every page. Used in front-end-align, headshake and front-clunk-braking |
| Fork spring free length 300 mm, limit 295 mm | PDF 154 | |
| Fork oil seal size 37 x 50 x 11 mm | PDF 151 | |
| Swingarm pivot shaft runout limit 0.2 mm (never straighten) | PDF 171 | |
| Front master cylinder bore 12.7 mm; front caliper 3 pistons with CBS feeding the middle one | PDF 107 | Description only |
| Hero Honda Splendor Plus rear shock 5-step preload (example) | Unit 2 PDF 50 | |

## Conflicts found: no number published

- **Front caliper mounting bolt:** 22 to 29 N·m (PDF 106, 109, 135) and 10 to 12 N·m (PDF 150). This conflict was already in the prior README. No caliper torque is given on any page, front or rear, so the pages never suggest a value can be carried from one fastener to another.
- **Rear shock upper nut:** 37 to 44 N·m (PDF 106) and 45 to 50 N·m (PDF 160, 161, 168). The lower bolt is 22 to 29 N·m on every page, but neither value is published.
- **Swingarm pivot nut:** 70 to 83 N·m (PDF 106) and 85 to 98 N·m (PDF 160, 161, 171). Not published.
- **Fork lower clamp bolt:** 45 to 50 N·m (PDF 133, 135) and 10 to 12 N·m (PDF 150). The PDF 106 "handlebar mounting bolt 40 to 60" and "front shock bolt 40 to 60" entries are ambiguous next to the handlebar clamp value of 22 to 29 N·m (PDF 133, 135, 145). No fork clamp or handlebar torques are published.
- **Steering:** the adjusting nut is 2 N·m (PDF 135) or 2.5 N·m (PDF 150), and the upper ball count is 21 or 19. As the README says, the pages only inspect and hand off.
- **CBS fail-safe (PDF 67):** with a leaking front caliper, the CBS adjusting bolt can be screwed fully in so the rear brake works alone. The pages present this only as a workshop measure for moving the bike, never as a rider fix.

## Not verifiable, written without numbers

- Drum brake shoe limit, drum maximum diameter, cable free play and torque-arm torque. These are model-specific, and the prior README forbids generic values.
- Brake fluid change interval. The K-Light schedule says "inspect" only. The pages say "your manual's interval" and do not give "two years".
- Bleed nipple and pad pin torques. Not established.
- Sag targets. No source gives any, so sag-measure gives the method and comparisons only.
- ABS. The K-Light has CBS, and no source in the set covers ABS. abs-light and abs-check are written qualitatively (normal start-up lamp pattern, sensor, ring, wiring, fuse, battery, tyre size) with no numbers and no web sources.
- Shock eye-to-eye lengths, spring rates and fork oil equivalents to "46#". Not given.

## IDs I wished existed (not used in pages)

Repairs:
- `brake-hose-replace`: Replace a brake hose (home, or workshop on CBS/ABS). Pages currently route to brake-hose-check plus brake-bleed.
- `brake-disc-replace`: Replace a brake disc. Currently brake-disc-check says "replace" with no procedure page.
- `rear-shock-replace`: Replace rear shock absorbers (home). Many pages end at "replace the shock(s)".
- `fork-oil-change`: Change fork oil (home, drain-plug forks, as in MAVCC job sheet 1). It is currently folded into the workshop-level fork-oil-seals.
- `swingarm-bush-replace`: Replace swingarm pivot bushes (workshop).
- `handlebar-replace`: Replace a bent handlebar.

Parts:
- `fork_bushes`: fork slider and guide bushes.
- `shock_bushes`: rubber bushes in the shock eyes.
- `pad_pin`: pad pin, clip and spring plate.
- `abs_sensor` / `tone_ring`: currently all under `abs`.

applies_to tags: `cbs` and `abs` would help, because there is currently no way to target CBS or ABS pages except through `disc-brake` and `drum-brake`.

## Merge or split suggestions

- `fork-harsh` and `fork-sticky` overlap heavily. They could be merged, with harsh routed to sticky or bottoming.
- `caliper-sticking` is a subset of `brake-drag`. Both are kept, and brake-drag hands off to caliper-sticking at the bleed-nipple test.
- `brake-fluid-dark` (problem) and `brake-fluid-check` (repair) are close, but both are useful.
- `headshake` overlaps with group F `speed-vibration` and `wheel-buckled`. Cross-linked rather than duplicated.
- `rear-clunk` sends throttle-related clunks to group D `cush-drive-clunk`.

## Cross-group links used

Group F: tyre-pressure-check, tyre-inspect, wheel-bearing-check, wheel-runout-check, wheel-balance, wheel-remove-front/rear, lever-service, cable-lube, pedal-peg-service, fastener-check, frame-crash-inspect, and problems crash-check, wheel-buckled, wheel-bearing-play, wheel-bearing-noise, loose-spokes, slow-puncture, speed-vibration, pedal-stiff, cable-frayed, throttle-sticks, bodywork-rattle.

Group D: chain-adjust, cush-drive-check, and problems chain-dry-rusty, cush-drive-clunk.

Group G: brake-switch-test, fuse-relay-check, connector-clean, headlight-aim.

Group A: battery-test-charge.

Group C: exhaust-mount-check, and problem oil-leak.

Group B: problem bike-feels-held-back.

Group H: problem ev-wheel-locked.


---

## Notes: F


Written: 29 problem pages and 29 repair pages, all IDs from registry.json. Validation script (frontmatter IDs, part IDs, applies_to and urgency enums, system and level against the registry, titles, every internal link, forbidden sections, em and en dashes) passes with no errors.

## Values used that are not in the prior-README verified table

All come from the K-Light logs, are labelled "K-Light 125" in the pages, and are not rejected by the prior-README. An editor may want to confirm them against the PDF before publishing.

| Value | Where used | K-Light PDF page |
|---|---|---|
| Tread wear limit 1 mm | tyre-inspect, tyre-centre-wear | 71 (labelled as K-Light only; pages say local law may require more; prior-README rejects only a *universal* tread threshold) |
| Rim runout limit 2.0 mm lateral and radial | wheel-runout-check, wheel-buckled, rim-damage, spoke-tension, speed-vibration, crash-check | 135, 137, 161 |
| Axle bend limit 0.2 mm | wheel-remove-front, wheel-runout-check, wheel-buckled, crash-check | 135, 164 |
| Front axle nut 75 to 88 N·m | wheel-remove-front, wheel-bearing-check, wheel-bearing-play, fastener-check | 49, 109, 135, 140 (consistent everywhere) |
| Wheel bearings 6202-2RS front, 6303-2RS rear; snap-in valve Z2-01-1 | wheel-bearing-*, valve-check | 130, 159 |
| Side stand bolt 45 to 50; footrest bolt 45 to 50; pedal M8 22 to 29; M6 10 to 12 N·m | side-stand-*, pedal-*, fastener-check | 190 (single source) |
| Mirror bolt 22 to 29; bar-end weight screw 10 to 12; left lever assembly bolt 10 to 12 N·m | mirror-*, lever-* | 131, 135, 145 |
| Front brake lever pivot bolt 1.0 N·m, locknut 5.9 N·m | lever-service, lever-damaged | 117 |
| Brake light on at about 15 mm lever travel | lever-service, lever-damaged | 67 |
| Seat bolts M8 22 to 29, M6 10 to 12; rear sprocket nuts 45 to 50; chain adjuster nut 22 to 29; body cover bolt 9.0 N·m | fastener-check, seat-loose, rattle-fix, bodywork-rattle | 179, 181, 158, 177, 160, 73 |
| Front brake lever free play 10 to 20 mm; rear pedal free play 20 to 30 mm | pre-ride-check, pedal-peg-service, pedal-stiff | 61, 62 |
| ECU fast idle below 68 °C | choke-cable-adjust (context only) | 276 |

## Conflicts found and values deliberately not published

| Item | Evidence | Decision |
|---|---|---|
| Rear axle nut | 100 to 113 N·m (PDF 49, 109) vs 85 to 98 N·m (PDF 106, 166) | Already in prior-README. wheel-remove-rear and fastener-check state the conflict and say to obtain a confirmed value; never averaged |
| Swingarm pivot nut | 85 to 98 N·m (PDF 160, 161, 171) vs 70 to 83 N·m (PDF 106) | Not published in fastener-check |
| Rear shock top nut | 45 to 50 N·m (PDF 160, 161, 168) vs 37 to 44 N·m (PDF 106) | Not published |
| Front master cylinder clamp bolt | 10 to 12 N·m (PDF 145) vs 5 to 9 N·m (PDF 106, 109) | Not published in lever-service |
| Fuel tank mounting bolt | 5 to 9 N·m (PDF 106) vs M6 × 35 10 to 12 N·m (PDF 180, 181) | Not published |
| Handlebar mounting | 40 to 60 N·m "handlebar mounting bolt" (PDF 106) vs clamp bolts 22 to 29 N·m (PDF 133, 135, 145) | Not published (probably different fasteners; unclear) |
| Fuel filter interval | 7000 to 10000 km (PDF 274) vs 7000 to 18000 km (PDF 275) | service-schedule follows the p51 table and notes the conflict |
| Schedule last column | "Every 15000 km / fifteen months" sits after 12000 km on PDF p51 (checked on page image) | Reproduced as printed, with a caution note |
| MAVCC 40 psi bead-seating ceiling (PDF 408) | Dated; modern tyres print their own bead-seat maximum | Pages say "never exceed the bead-seating pressure printed on the tyre"; no number |
| MAVCC "never patch a tube" (PDF 405) | US dealer liability rule | Presented as a choice: patch acceptable with care, new tube better |
| MAVCC spoke inner/outer bend angles | Contradict between info sheet and job sheet (log) | Not used |
| Unit 2 Hero Honda tyre pressures (PDF 50) | Model-specific to other bikes | Not used |

## Web sources used

- Pirelli, "Tyre DOT code: what is it and how to read it": https://www.pirelli.com/tyres/en-gb/car/driving-and-tyre-tips/how-to-read/tyre-dot-code (week then year date code). Used in tyre-inspect, tyre-cracked.
- Blackcircles help centre, "Can motorcycle tyres be plugged?": https://www.blackcircles.com/helpcentre/tyres/can-motorcycle-tyres-be-plugged (outside plugs are temporary; tread centre only; BS AU 159). This is a UK tyre retailer, not a tyre maker or the standard itself; an editor may prefer to replace it with a tyre maker's repair policy. The retailer's "usually no more than 6 mm" hole size was deliberately not quoted; pages say "small (nail sized)".

## Source page refinements

- MAVCC welding rule (never weld a frame with the tank fitted) confirmed on PDF p66 by text search; cited there rather than the unit objective page.
- MAVCC tubeless plug-patch rules and tube-in-tubeless warning confirmed on PDF p404; tyre markings and balance mark on p403.
- Group F pages cite MAVCC information-sheet start pages (p398 Unit X, p730 Unit XVII, p752 Unit XVIII) where the log gives only a range.

## IDs I wished existed (not used in pages)

Problems:
- `tyre-uneven-wear`: "Tyre wears more on one side" (currently routed through tyre-inspect and pulls-to-side).
- `grip-loose`: "Handlebar grip slips or turns on the bar" (left grip; currently not covered).
- `throttle-too-tight`: or retitle throttle-free-play to "Throttle free play is wrong", because too little play is a common fault (currently routed to high-idle).

Repairs:
- `bead-reseat`: "Clean the bead seat and reseat a tubeless tyre" (workshop), the main fix for bead-leak.
- `wheel-alignment-check`: "Check front and rear wheel alignment with a string line" (home); used after crashes and for pulls-to-side. front-end-align covers only the front.
- `seat-lock-service`: "Service the seat latch and release cable".
- `grip-replace`: "Replace handlebar grips".

Parts:
- `rim_tape` (puncture-tube, loose-spokes), `brake_pedal` (pages use rear_brake and footpegs), `balance_weights`, `bar_end_weights`, `seat_lock`.

## Merge or split suggestions

- speedo-cable-fault (F) and speedo-dead (G) overlap; F routes "cable turns, needle dead" to speedo-dead. Keep both, cross-linked.
- choke-cable-fault (F) and choke-stuck (B) overlap; F covers lever and cable, routes carburettor plunger faults to choke-check and choke-stuck.
- valve-leak could merge into slow-puncture, but a separate card helps riders who hear the hiss. Kept.

## Length notes

- service-schedule (about 1130 words) and pre-delivery-inspection (about 940 words) exceed the 700-word guide on purpose, as asked ("thorough").
- tube-puncture-repair is about 750 words because it covers both removal routes and the cause search.


---

## Notes: G


Written: 25 problem pages (`out/problems/`) and 18 repair pages (`out/repairs/`). All frontmatter IDs and internal links were checked against `registry.json` by script; link text was set to the registry title; no em or en dashes; every page number cited in a body appears in that page's `sources`.

## Values used (all labelled K-Light 125 in the pages)

| Value | Source | Notes |
|---|---|---|
| Bulb types H4, W3W, R10W, P21/5W, W5W | PDF pp. 98 to 100 | Types only; the manual gives no headlight wattage |
| Brake light on at about 15 mm front lever travel | PDF p. 67 | Front only; no rear pedal figure |
| Fuses: 20 A main, two 10 A | PDF pp. 74, 278 | From the circuit diagram; fuse-to-circuit allocation not legible, so pages tell readers to use the fuse box label. A fourth inline fuse near the main switch on p. 278 has no readable rating |
| Horn bolt 10 to 12 N·m; horn test by direct battery connection | PDF pp. 103 to 104 | |
| Meter holder screw 10 to 12 N·m | PDF p. 101 | |
| Headlight mounting bolt 10 to 12 N·m; headlight bracket locknut 37 to 44 N·m | PDF pp. 136, 135 | Different fasteners, not a conflict; both named explicitly |
| Ignition switch conduction (ON: red/white 1 to red; red/white to orange/blue; OFF/LOCK none) | PDF p. 102 | |
| Handlebar switch conduction (dip, horn, indicators, start, stop, front brake) | PDF p. 105 | |
| FI lamp lights at key on and goes out after start | PDF p. 269 | |
| Diagnostic tool needs battery at least 8.5 V | PDF p. 274 | |
| Loose earth gives wrong fault codes: refit earth, disconnect battery 3 min | PDF p. 276 | |
| Rear brake push rod to piston clearance 0 to 0.2 mm | PDF p. 116 | Used only to explain a brake light stuck on |
| Charging 14.5 ± 0.5 V at 5000 rpm; battery 12.3 V needs charge | PDF pp. 78, 59 | Already in the prior-README verified list |

## Values not verified, so not published

- Headlight wattage (K-Light), flasher rate and flasher pinout, horn current, fuse ratings per circuit for other bikes.
- Voltage drop limits: none given; pages tell readers to use the manual or compare against a known good circuit (per prior-README "Electrical tests").
- Headlight aim distance and drop: not in the K-Light or MAVCC logs; page defers to owner's manual or local testing rules.
- Speed sensor air gap and Hall sensor supply voltage: not in the logs.
- Load resistor values: only cited in general terms (Kellermann lists different resistors for 10 W and 21 W bulbs); no ohm values given in pages.
- Parasitic drain limit (K-Light 1 mA, PDF p. 36) not used; that belongs to group A and is on the prior-README "vary by model" list.
- Unit 2 appendix values (7 A fuse, 25/25 W or 35/35 W headlamp, 5/10 W tail) not used: different bikes, dated.
- MAVCC voltmeter thresholds (10.5 V lights on, 8.5 V cranking, about 15 V charging) not used: dated generic values.

## Conflicts and source problems found

1. **Alternator output** 100 W at 5000 rpm (spec table PDF p. 19) vs 160 W (PDF p. 76). Relevant to accessory load; pages say ask a dealer and cite both pages rather than choose.
2. **Speedometer drive:** the circuit diagram shows an electronic speed sensor wired to the meter (PDF p. 278), but the front wheel exploded view lists a speedometer gear housing and p. 140 says to check the "speedometer drive shaft" turns. Pages tell readers to check which their bike has.
3. **Rear brake light switch type:** the K-Light rear caliper text mentions a "rear brake switch" near the banjo bolt (rear caliper section, PDF pp. 119 to 121, per the reading log), which may be a hydraulic pressure switch. Not confirmed; the switch page warns generally that pressure switches need a brake bleed after removal.
4. **Ignition switch feed colour:** the conduction table (p. 102) does not label which wire is the battery feed; the page infers red from the diagram (p. 278) and tells readers to confirm.
5. **Headlight controller and headlight relay** appear on the diagram (p. 278) with no text; pages say "on many bikes, including those with a headlight relay like the K-Light 125, the headlight may come on only with the engine running" and tell readers to check.
6. **Unsafe K-Light fault-chart methods** (PDF pp. 40, 42, 46, 47): "strike the wire on the battery or frame and look for a spark" and bridging switch terminals with a screwdriver. Replaced with multimeter tests and fused jumper leads, per the prior-README rule.
7. **MAVCC dated practice:** incandescent test light as main tool, solder and tape splices (PDF pp. 292 to 294, 318 to 323). Pages use a digital multimeter, warn against test lights on ECU and CAN-bus circuits, and prefer crimp joints with adhesive heat-shrink.

## Web sources used (modern systems, general level only)

- HELLA Tech World, CAN bus and vehicle lighting: lamp current monitoring, LED warnings, poor earth reported as bulb fault. https://www.hella.com/techworld/sg/lounge/can-bus-vehicle-lighting-bulb-replacement-workshop
- Kellermann flasher relays (load-independent relays for LED indicators). https://www.kellermann-online.com/en/electronic/elektronik/blinkrelais/
- Kellermann i.LOAD (flash rate may rise after new indicators; resistors by replaced bulb wattage). https://www.kellermann-online.com/en/shop/electronic-accessories/i.load/

Both Kellermann pages are maker product pages; they support the general mechanism only.

## IDs I wished existed (not used in pages)

| Suggested id | Type | Title | Why |
|---|---|---|---|
| `relay` | part | Relays (main, headlight, fuel pump, horn) | Only `starter_relay` and `flasher` exist; headlight, main and horn relays have no part to link |
| `lighting_control_unit` | part | Lighting or body control unit (CAN-bus) | CAN-bus bikes switch lamps through a module; no part ID |
| `led-headlight-unit-replace` | repair | Replace a sealed LED headlight or tail light unit | Many modern lamps have no bulb |
| `can-bus-diagnosis` | repair (workshop) | Dealer diagnosis of dashboard and lighting network faults | Several pages end at "dealer with diagnostic tool" with nothing to link |
| `harness-replace` | repair (workshop) | Replace a wiring harness | Hand-off target for burnt or chewed harnesses |
| `rodent-damage` | problem | Wires chewed by rats or other animals | Common on parked bikes in our regions; currently folded into wiring pages |

## Merge or split suggestions

- `headlight-dim` (G) and `dim-lights-idle` (A) overlap; keep both but cross-linked (done).
- `indicators-fast` and `indicators-steady` share most checks; could merge as "Indicators flash wrongly".
- `horn-silent` and `horn-weak` could merge into one horn page with two branches.
- `intermittent-electrical` and `wet-connectors` overlap; kept separate because the rain trigger has a distinct first check.
- `voltage-drop-test` overlaps with group A starter and charging tests; worth a shared multimeter primer page if the site has a learn section.


---

## Notes: H


28 problem pages and 21 repair pages written. All IDs and internal links validated against registry.json; no em or en dashes.

## Sources used (web; the PDFs and logs have almost no electric content)

- Zero Motorcycles, Long-term storage: https://zeromotorcycles.com/stories/long-term-storage
- Ather Energy, Common electric scooter charging problems: https://www.atherenergy.com/blog/fixing-common-charging-problems-in-electric-scooters
- Gogoro Smart Battery and GoStation safety information: https://gogoro.com/product-information
- Gogoro Support, low battery / hibernation: https://support.gogoro.com/en/articles/115008416788
- Spiro, Energy ecosystem (manned and automated swap stations): https://www.spironet.com/energy-ecosystem
- Super Soco CPx Pro specification sheet (60 V battery, range test conditions): https://en.vmotosoco.com/wp-content/uploads/2023/04/CPXPRO_SuperSoco_20230426.pdf
- IMI National Occupational Standards IMIEV02 and IMIEV04 (UK): https://www.ukstandards.org.uk/en/nos-finder/IMIEV02/provide-a-first-response-to-a-broken-down-or-damaged-electric-vehicle and https://www.ukstandards.org.uk/en/nos-finder/IMIEV04/isolate-and-re-energise-high-voltage-systems-in-an-electric-vehicle
- UN Regulation No. 136 summary: https://www.batterydesign.net/legislation-rules-and-regulations/ece-r136/
- UN dangerous goods rules for damaged/defective lithium batteries (SP 376 context): https://www.thecompliancecenter.com/how-to-ship-damaged-or-defective-lithium-batteries/
- London Fire Brigade, warning signs and lithium batteries: https://www.london-fire.gov.uk/safety/e-bikes-and-e-scooters/spot-the-warning-signs-could-your-e-bike-or-e-scooter-start-a-fire/ and https://www.london-fire.gov.uk/safety/lithium-batteries/
- Consumers' Federation of Australia, flood safety for e-mobility devices: https://consumersfederation.org.au/flood-and-high-rainfall-safety-for-e-mobility-devices/
- Florida CFO consumer alert on submerged EVs: https://www.myfloridacfo.com/news/patronis-archives/patronis-press-releases/details/2023/09/20/consumer-alert-cfo-patronis-encourages-ev-owners-to-protect-themselves-from-fires-post-hurricane-ian
- Battery University BU-410: https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures
- Microchip Developer Help, BMS fundamentals: https://developerhelp.microchip.com/xwiki/bin/view/applications/power/fundamental-understanding-of-battery-management-system/
- Harley-Davidson service information, regenerative braking: https://serviceinfo.harley-davidson.com/sip/service/procedure/2140462551782999685/BLAISE/2015105/en_US?nid=54502
- em3ev, Hall sensor testing: https://em3ev.com/?p=43276
- Letrigo, how to test an e-bike motor: https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor
- Upway, e-bike overheating: https://upway.co/blogs/news/electric-bike-overheating-causes-and-fixes
- SolarQuotes, EV 12 V battery: https://www.solarquotes.com.au/blog/ev-12-volt-battery/
- Power Systems Design, insulation monitoring: https://www.powersystemsdesign.com/articles/detecting-it-power-system-resistive-and-capacitive-faults-with-insulation-monitoring-technology/22/22720

Source quality: em3ev, Letrigo and Upway are retailer/maker explainers (e-bike scale), used only for qualitative symptom logic, never for values. Harley-Davidson regen page does not name the model (likely LiveWire). The Spiro page has no rider troubleshooting content; it only supports "manned stations give help". No usable owner manual was retrievable for NIU, Super Soco (only spec sheet), Ola, Roam or Ampersand.

## Numbers used (all labelled with their source on the page)

- HV threshold more than 60 V DC / 30 V AC (UNECE definition via IMI EV02).
- Super Soco CPx Pro: 60 V battery; 100 km range at 45 km/h average, 75 kg rider, two batteries.
- Charge temperature: Battery University 0 to 45 °C, no charge below freezing (typical consumer Li-ion); Ather 5 to 45 °C. Both shown side by side, not merged.
- Zero storage: 10 to 35 °C; BMS holds about 80% after 30 days plugged in; charge if below 30% unplugged; check every 30 days; 24 h charge before first ride.
- Gogoro: battery over 9 kg; swap at least once every 30 days; GO button 3 s to wake from hibernation.

## Values deliberately not used (unverifiable or banned by prior-README)

- No insulation-test voltage or pass value. Power Systems Design quotes a 100 ohm per volt industry minimum; not used, because prior-README forbids a universal insulation acceptance value and this is a car-industry figure.
- No phase resistance: Letrigo gives "typically under 1 ohm, roughly 0.4 to 0.9 ohm" for e-bike hub motors; rejected.
- No Hall supply or signal voltages: em3ev says "often around 5 V"; Letrigo gives 0 to 0.5 V low, 4.5 to 5 V high; rejected (prior-README: no universal Hall values).
- No cell voltage, pack charge voltage, imbalance threshold, pre-charge percentage, throttle voltage or fault-code meanings.
- No isolation wait time (Module 05 "5 to 10 min" is rejected by prior-README; pages say waiting never proves dead).
- No safe stand-off distance for a burning or damaged pack: none of the fire-service sources gives one.
- Ather "hold power button about 10 seconds" reset mentioned only qualitatively (model-specific).

## Conflicts found

- Charging temperature lower limit: Battery University 0 °C versus Ather 5 °C. Not a true conflict (general cell limit versus one maker's recommendation) but kept separate and labelled.
- Gogoro product page says "DO NOT dispose smart batteries to fire, heat or water", likely a typo for "expose"; paraphrased as "keep away from fire, heat and water" only in spirit; pages cite the clear parts (do not drop, strike, disassemble; no metal on contacts).

## IDs I wished existed (not used in pages)

| Suggested id | Type | Title |
|---|---|---|
| `ev-belt-drive-check` | repair | Check the belt or chain drive on an electric motorcycle (mid-drive bikes; currently routed to chain pages) |
| `ev-firmware-update` | repair | Update controller, BMS or dashboard software |
| `ev-reset` | repair | Reset or wake an electric bike (hibernation, soft reset) |
| `ev-fleet-report` | repair | Report a fault to a fleet or swap operator (what to record: battery ID, photo, code, conditions) |
| `ev-battery-fire` | problem | Battery is smoking or on fire (currently folded into ev-pack-hot-smell) |
| `ev-speed-limited` | problem | Top speed lower than normal (currently under ev-limp-mode) |
| `ev-reverse-park-fault` | problem | Reverse or park assist does not work |
| `ev-throttle-sensor-test` | repair | Test the electric throttle sensor (workshop) |
| `belt` / `drive_belt` | part | Toothed drive belt for electric motorcycles (cvt_belt is the wrong part) |
| `service_disconnect` | part | Service plug or main HV fuse |
| `swap_battery_bay` | part | Swap battery bay, latch and contacts (currently traction_battery / charge_port) |

## Merge or split suggestions

- `ev-cuts-out-accel` and `ev-bms-cutoff` overlap heavily (both are mostly BMS under-voltage protection under load). Kept separate by symptom: drive cut with dash on versus whole bike dead. Consider merging if the index feels repetitive.
- `ev-pack-damaged` and `ev-pack-hot-smell` both route to `ev-damaged-pack`; keep separate because the hot/hissing case is an immediate fire response.
- `ev-phase-connector-check` and `ev-hall-sensor-check` could merge into one workshop "motor connections" assessment.
- Several problem pages run slightly long (ev-dash-dark about 780 words including table); trim if layout requires.

## Memory or scope notes

- No K-Light, MAVCC or Unit 2 page was cited: their EV content is only comparator notes in the logs (klight_p141-279 log line on "05 Electric", mavcc logs on lithium hazard gaps), not usable procedures.


---

## Notes: parts-1


68 pages written to `out/parts/<id>.md`. All IDs and internal links checked against `registry.json` by script; no em or en dashes; every page has a problem link and a repair link.

## Values left out because the logs conflict (prior-README rules applied)

| Item | Conflict | Decision |
|---|---|---|
| Ignition coil primary tolerance | 4 Ω ± 15 % (PDF 85) vs ± 10 % (PDF 88) | No coil resistance values published, primary or secondary (secondary 13.6 / 18.6 kΩ also left out, as a coil rejection limit) |
| Coil fixing torque | 9.0 N·m (PDF 73) vs 5 to 7 N·m (PDF 88) vs 8.8 to 11.8 N·m (PDF 265) | No coil torque; page says use your manual and notes the K-Light gives two values |
| Flywheel nut torque | 50 to 60 N·m (PDF 73, 82) vs flywheel locknut 55 to 60 N·m (PDF 194) | Not published (workshop job) |
| Alternator output | 100 W (PDF 19) vs 160 W (PDF 76) | Not published |
| Fuel filter interval | 7000 to 10000 km (PDF 274) vs 7000 to 18000 km (PDF 275) | Used only the maintenance schedule (replace at 12000 km, PDF 51), labelled K-Light |
| Cylinder bore limit, piston OD limit, pin OD limit, crank runout, head nut torque | Table vs text disagree (PDF 213/217, 236/241, 194/202) | Not published; only consistent values used (taper/out-of-round 0.05 mm, big end clearances, ring gap) |
| Cam lobe height standard | "32.6 to 32.8478" (implausible precision) | Only the 32.5 mm limit used |

## Values used that a reviewer may want to confirm

- **Fuel pressure** (about 300 kPa at idle, below 270 kPa a fault, PDF 255/266/269) is on `fuel_pump` as a K-Light reference "workshop gauge only". prior-README forbids a universal pressure test; the page gives no home pressure procedure. Remove the row if the rule is read as banning the K-Light figure too.
- **EFI sensor values** (TPS 5 V ref and 0.5 to 0.9 V idle, head temp sensor 1.9 to 2.1 kΩ at 25 °C, MAP 4.25 to 4.75 V, O2 rich/lean thresholds and heater 9.6 ± 1.5 Ω, injector about 10 Ω, idle stepper 50 Ω ± 10 %) are in reference tables as K-Light only, with the fitting notes sending the reader to a workshop. Same caveat as above (prior-README "no universal EFI-pin test").
- **Strainer cap torque** 15 to 30 N·m (PDF 194) is on `drain_plug` with the prior-README caveat "confirm it is the same cap on your bike". Drain plug torque itself is not in the logs.
- **Coil supply 9 to 14 V and output 25 to 35 kV** (PDF 265) used on `ignition_coil` as descriptive, not as a test limit.
- **Exhaust torques** 22 to 29 N·m (muffler) and 5 to 9 N·m (header joint) from the chassis torque table (PDF 106), single source, no conflict found.
- Valve clearance "cold": the K-Light table (PDF 202) gives 0.05 to 0.07 mm without stating temperature; prior-README calls it cold, so "cold" was kept.

## Values not in the logs (left as "follow your bike's manual")

- Engine oil grade or viscosity (not stated in the K-Light logs). Buying guidance uses JASO MA/MB from Lubrizol (cited by URL) and API letters from Unit 2.
- Headlight wattage (H4 type only, PDF 98).
- Drain plug torque, fuel level sender resistance range, speed sensor test values, fan and thermostat temperatures, coolant interval and ratio.
- Two-stroke oil grade codes (JASO FC/FD etc.) not sourced, so not named.
- The D7RTC plug maker and its cross-reference to NGK/Denso were not verified; the page tells readers to use the plug maker's chart instead of naming an equivalent. Code reading (thread letter, heat range direction, R = resistor) cited to Cyclepedia; fake-plug signs cited to NGK.
- The "7A" in YTX7A-BS is not decoded by the cited source (baterias.com explains Y, T, X and BS only), so it is not decoded on the page.

## Uncertain readings of the K-Light manual

- Speed sensor type: the wiring diagram (PDF 278) shows a speed sensor, but the front wheel exploded view (PDF 130) shows a "gear housing" (mechanical speedometer drive style). The page describes both types without saying which the K-Light uses.
- Rear brake light switch: the rear caliper section (PDF 121) mentions a "rear brake switch" at the banjo, possibly a hydraulic pressure switch. The page covers both pedal and pressure switches without assigning one to the K-Light.
- Possible oil cooler: covers list (PDF 128) and frame list (PDF 188) mention "oil cooler" / "fuel cooler" parts. Not mentioned on any page.
- Cooling parts (`radiator`, `coolant`, `cooling_fan`, `thermostat`, `water_pump`): the K-Light is air-cooled and the logs have almost nothing on liquid cooling. Pages are written without numbers, using Unit 2 p19 and a Honda CBF500 owner's manual page (coolant type, no silicates, no tap water) cited by URL.

## IDs I wished existed (not used in pages)

| Suggested id | Title | Current parent page |
|---|---|---|
| `evap_canister` | EVAP canister, purge valve and rollover valve | `fuel_tank`, `fuel_cap` |
| `catalytic_converter` | Catalytic converter | `exhaust` |
| `idle_air_valve` | Idle air stepper motor (EFI) | `throttle_body` |
| `relays` | Main, fuel pump and headlight relays | `fuse`, `wiring` |
| `tip_over_sensor` | Tip-over (bank angle) sensor | `interlock_switches`, `ecu` |
| `radiator_cap` | Radiator pressure cap and expansion tank | `radiator` |
| `coolant_hoses` | Coolant hoses and clips | `radiator` |
| `valve_guides_seals` | Valve guides and stem seals | `valves` |
| `crank_bearings` | Crankshaft main bearings | `crankshaft` |
| `choke` | Choke or starter valve and cable | `carb` |
| `reed_valve` | Two-stroke reed valve | `intake_manifold` |
| `oil_cooler` | Engine oil cooler and lines | none |
| `plate_light` | Number plate light | `tail_light` |

## Merge or split suggestions

- `efi_sensors` covers TPS, MAP, intake air and engine temperature sensors. They are bought separately and have separate codes; consider splitting at least `tps` from the rest.
- `throttle_body` has overview `wiring`; overview `carb` may be a closer picture for readers.
- `cam_chain` and `cam_tensioner` do not apply to the reference K-Light (pushrod engine); both pages say so. If an OHC reference manual is added later, they need model values.
- `fuel_tap` is carburettor only; `fuel_pump` is EFI only. Some carburettor scooters have a vacuum fuel pump that has no ID; currently mentioned on `fuel_pump` as "a different part".

## Web sources used

- https://baterias.com/gb/battery-glossary/jis (battery code letters)
- https://www.cyclepedia.com/manuals/online/free/electrical-systems/spark-plugs/spark-plug-codes/ (plug codes, heat range direction)
- https://ngkntk.com/newsroom/blog/emea/fake-or-not (fake plug signs)
- https://360.lubrizol.com/2016/Understanding-JASO-MA-and-MB-Specific-Performance-for-the-Right-Applications (JASO MA/MB, wet clutch)
- https://www.philips.co.uk/c-e/automotive-articles/technology/good-bulbs-bad-bulbs (E-marked bulbs and conformity of production)
- https://www.bike-parts.fr/thumbs/pdf_url/img/owner_manuals/CBF500A5_E/2500_2500/0035.pdf (Honda owner's manual coolant page)


---

## Notes: parts-2


66 part pages written to `out/parts/`. All IDs and internal links validated against `registry.json` with a script; no em or en dashes.

## Values not used, and why

| Item | Evidence | Decision |
|---|---|---|
| Rear axle nut torque | 100 to 113 N·m (PDF 49, 72, 109, 158, 161) vs 85 to 98 N·m (PDF 106, 166) | Not published (prior-README rule). `rear_wheel` and `axle` tell the reader to confirm. |
| Swingarm pivot nut torque | 70 to 83 N·m (chassis table PDF 106) vs 85 to 98 N·m (PDF 160, 161, 171) | New conflict, not in prior-README. Not published; `swingarm` says to use the manual value and points here. |
| Rear shock top nut torque | 37 to 44 N·m (PDF 106) vs 45 to 50 N·m (PDF 160, 161, 168) | New conflict. Only the lower bolt (22 to 29 N·m, consistent) is published. |
| Front caliper bolt torque | 22 to 29 N·m (PDF 106, 109, 135) vs 10 to 12 N·m (PDF 150) | Not published (prior-README rule). |
| Steering head torques and ball counts | 2 vs 2.5 N·m; 21/17 vs 21/19 balls | Not published. `steering_bearings` gives only the bearing type (loose 1/4 inch balls, PDF 133). |
| Chain 10-link wear limit 127 mm | Equals nominal new length for 428 | Not published. `chain` says to use the chain maker's or manual's limit. |
| Handlebar "mounting bolt" 40 to 60 N·m (PDF 106) | Different fastener from the upper clamp screws (22 to 29 N·m, PDF 133, 145) | Only the clamp screw value is published, named by fastener. |
| Disc runout limit 0.15 mm (PDF 109) | prior-README: disc replacement and runout limits left to the exact model | Not published. Disc thickness standard and limit (PDF 109) **are** published as labelled K-Light reference values; please confirm this reading of the rule, or remove the thickness rows from `brake_disc`. |
| Tread wear limit 1 mm (PDF 71) | prior-README: no universal tread-depth threshold | Published on `front_tyre` and `rear_tyre` only as "Tread wear limit in manual", with "local law may require more". Remove if the rule is meant to cover model values too. |
| Fork oil 46# | No confirmed equivalence to a W grade | `fork_oil` says not to assume an equivalent. |
| CBS fail-safe (screw adjusting bolt fully in, PDF 67) | Model-specific, risky as rider advice | Left out. The internal leak test is mentioned as a workshop test only. |
| Electric throttle voltages | Levy Electric gives about 1 V rest and 4.2 to 4.5 V full on a 5 V supply | Not published, because prior-README bans universal throttle voltages. The source is cited for how the sensor works. |
| Scooter belt width, roller weights, clutch lining limits, gear oil grade and volume | No K-Light data (manual gearbox bike). Louis gives a 2 mm lining figure as general guidance | No numbers published; pages say to use the scooter's manual. |

## Values used that are not in the prior-README verified list

All come from the K-Light logs and are labelled "K-Light 125" with PDF page: front lever free play 10 to 20 mm (61), rear pedal free play 20 to 30 mm (62), rear pushrod clearance 0 to 0.2 mm (116), banjo bolt 30 N·m (64, 115), brake light at about 15 mm lever travel (67), lever pivot 1.0 / 5.9 N·m (117), master cylinder bores 12.7 / 14 mm and caliper pistons (107), reservoir volumes (107), disc sizes and thickness (109), disc bolts 10 to 12 N·m (109, 130), rims 1.85×17 and 3.00×15 (72), rim runout 2.0 mm (130, 158), axle bend 0.2 mm (130, 164), front axle nut 75 to 88 N·m (consistent on every page), bearings 6202-2RS / 6303-2RS (130, 158), valve Z2-01-1, chain 428HO-1 × 134 and 41T rear sprocket (158), sprocket nuts 45 to 50 N·m (158, 177), front sprocket bolt 10 to 16 N·m (194), fork spring 300 / 295 mm (154), fork seal 37×50×11 (151), swingarm shaft runout 0.2 mm (171), friction plate and spring standard values (222), shift fork and drum limits (230), side stand and footrest bolts 45 to 50 N·m (190), seat bolts (179), body cover bolt 9.0 N·m (73), mirror bolt 22 to 29 N·m and E-mark (131, 49), engine mounts (191).

## Other observations

- The K-Light rear wheel sheet and swingarm sheet repeat 85 to 98 N·m for different fasteners; the chassis table on PDF 106 looks like a different revision. Worth one check of the original PDF before any torque goes into a repair page.
- `speedo_cable`: the K-Light has an electronic speed sensor in the wiring diagram (PDF 278) but a "gear housing" in the front hub drawing (PDF 130). The page treats the cable as a generic part and links `speed_sensor`.
- The ABS page cites one general web source only; no K-Light or course data exists for ABS.
- Web sources were limited to pages that could be fetched. Battery and charger safety relies on UK fire service guidance (NFCC, London Fire Brigade); BMS on Microchip; pre-charge on Electronic Design; motor on Grin Technologies (ebikes.ca) and Levy Electric; tyre codes on Michelin; brake fluid on Wikipedia; pad compounds on Motorcyclist; chain numbering on Cyclepedia; fake parts on webBikeWorld. A manufacturer source for electric motorcycle traction packs (LFP vs NMC) could not be fetched; the page names the chemistries without comparing them.

## IDs I wished existed (not used in pages)

| Suggested id | Kind | Title |
|---|---|---|
| `tone_ring` | part | ABS tone ring (now inside `abs`) |
| `pre_charge_resistor` | part | Pre-charge resistor (now inside `contactor`) |
| `rim_tape` | part | Rim tape for tube wheels |
| `wheel_spacers` | part | Wheel spacers (now inside `axle`) |
| `chain_adjusters` | part | Chain adjusters and axle blocks |
| `brake_pedal` | part | Rear brake pedal and return spring (now inside `footpegs` and `brake_cable`) |
| `ev-pack-transport` | repair | Transport a damaged battery pack safely |
| `fork-spring-replace` | repair | Replace fork springs |

## Merge or split suggestions

- `brake` (front disc brake) and `rear_brake` overlap with the component pages; they work as hub pages. Consider renaming `brake` to "Front brake (disc)" so drum-front bikes are not left out.
- `speedo_cable` sits in chassis but its problems are in lighting and controls; fine as is.
- `cvt_clutch` and `auto-clutch-fault` (semi-auto step-through clutch) are different parts; a separate `semi_auto_clutch` part may help step-through owners.
