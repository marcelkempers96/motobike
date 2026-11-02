# Repair data

Data for the Repair section: `problems.js` (symptoms, `SYSTEMS`, `PROBLEMS`), `procedures.js` (`PROCEDURES`) and `parts.js` (`REPAIR_PARTS`, the index by part). All three are plain ES modules with no imports between them.

## Page number conventions

- **K-Light 125 manual** (`inbox/manuel-entretien-k-light125.pdf`): the page number **printed in the footer** ("- 46 -"). The printed number is the PDF page index minus 1 (PDF page 47 is printed page 46). The circuit diagram has no footer; it is cited as p. 277, the number given in the manual's contents.
- **MAVCC Motorcycle Mechanic** (`inbox/ED319915.pdf`): the **PDF page index**, because the scan has no consistent footer (it carries both "MM-xxx" and bottom numbers). Spec labels say "MAVCC PDF p. ...".
- **Moto Zero course** (`source/course/m1.md` to `m5.md`): the section or job sheet number. These source entries have `page: null` and a `section` field.

Extra fields used beyond the brief's shapes: `note` on a spec (explains a conflict), `section` on a course source, `video: null` on every procedure, `danger: true` on problems where the bike must not be ridden.

## Taxonomy

Started from these systems and symptoms, then merged duplicates:

- **Starting:** no crank, relay clicks only, slow crank, starter spins free, cranks but no start, hard cold start, hard hot start, starts then dies, kickstarter slips.
- **Idle and running:** rough idle, stalls at idle, high idle, low idle, hunting idle, misfire, hesitation, flat spot, surging, popping, backfire.
- **Power:** low power, no top speed, poor economy, cuts out while riding, revs but no drive.
- **Overheating:** overheating, pinking, seizure.
- **Smoke and exhaust:** blue, white, black smoke, loud or blowing exhaust, exhaust rattle.
- **Noises:** top end tick, cam chain rattle, bottom end knock, piston slap, clutch rattle, gearbox whine.
- **Oil and leaks:** oil leak, oil use, milky oil, low oil pressure lamp, fuel leak.
- **Clutch:** slips, drags, stiff lever, judder.
- **Gearbox:** hard to shift, jumps out, false neutral, cannot find neutral, broken lever.
- **Chain:** noisy, jumps, stretches fast, tight spots, sprocket wear.
- **Brakes:** spongy, weak, squeal, grind, drag, judder, fluid leak, brake light.
- **Steering and suspension:** heavy or notchy, wobble or weave, front clunk, fork leak, bouncy or harsh, sag wrong.
- **Wheels and tyres:** losing pressure, worn or uneven wear, cracked, wheel play or rumble, buckled rim, broken spokes.
- **Electrical:** flat battery, no charge, overcharge, dim lights, no lights, bulbs blow, indicators, horn, instruments dead, fuse blows, FI lamp.
- **Ignition:** no spark, weak spark, plug fouling.
- **Fuel:** starvation, flooding, tank vent, pump fault, leak.
- **Electric drive:** dead, no drive, judder, cut-out, range loss, will not charge, hot port, damaged pack, insulation fault, no regen.

Result: 18 systems, 63 problems (17 with `danger: true`), 58 procedures, 39 parts indexed. This is slightly above the 40 to 60 problem target and the 35 to 50 procedure target; the extra entries are small electric and electrical checks that several problems link to.

## What was cut and why

- **Merged:** low idle and hunting idle into "Idle is rough or engine stalls at idle"; surging into misfire; white smoke into "Blue or white smoke" (the K-Light fault tree treats them together, and an air-cooled engine has no coolant to burn); fuel starvation into "Engine cuts out while riding"; brake fluid leak into "spongy brakes"; buckled rim and broken spokes into "Wheel has play or rumbles"; cannot find neutral into "Clutch does not free" and "Gears are hard to change".
- **Cut:** kickstarter slip, piston slap, clutch rattle, gearbox whine, milky oil, low oil pressure lamp, seizure, instruments dead, no regen, false neutral. Each is rare on 100 to 150 cc commuters or is covered by a merged problem. Liquid-cooling faults are cut because the reference bike is air-cooled; the overheating problem mentions the radiator cap only as a safety line.
- **Spoke truing and CVT belt service** are not separate procedures: neither is on the K-Light, and the course has CVT in job sheet 4.3.2.
- **Workshop jobs:** crankshaft, gearbox internals, top end rebuild, starter clutch and HV pack opening point to `engine-overhaul-workshop` or the electric procedures, which say who may do them, and do not give a full home procedure.

## missing_part_ids

Parts that procedures needed but `assets/content/parts.js` has no 3D Overview id for. The nearest existing id is used meanwhile (in brackets).

- `throttle_body` (carb)
- `fuel_injector` (carb)
- `fuel_pump` (fuel_tank)
- `fuel_tap` (fuel_tank)
- `ignition_coil` (spark_plug)
- `ecu` (wiring)
- `regulator_rectifier` (charging)
- `starter_relay` (starter)
- `fuse_box` (wiring)
- `steering_head` (frame)
- `wheel_bearing` (front_wheel, rear_wheel)
- `front_sprocket` (rear_sprocket)
- `cam_chain` (engine)
- `oil_filter` (engine)
- `brake_master_cylinder` and `cbs_unit` (brake, rear_brake)
- `drum_brake` (rear_brake)
- `throttle_cable`, `clutch_cable` (handlebar, clutch)
- `kill_switch`, `brake_light_switch` (handlebar, tail_light)
- `flasher_relay` (indicators)
- `bms`, `contactor`, `hall_sensor`, `throttle_sensor` (battery, controller, motor)

## Values that could not be verified, and conflicts in the manual

Please review these before publishing.

1. **Chain wear limit.** The K-Light manual (p. 174) gives "the length limit of 10 links is 127 mm". For a 428 chain (12.7 mm pitch) 127 mm is the length of 10 pitches when **new**, so it cannot be a wear limit as printed. The data shows the printed figure with a note and tells the reader to use the chain maker's limit. The course (job sheet 4.3.1) suggests about 1.5 to 2 % elongation, but that is not from a manual, so it is not used.
2. **Rear axle nut.** 100 to 113 N·m on pp. 48, 71, 108, 157 and 160; 85 to 98 N·m on pp. 105 and 165. Data uses 100 to 113 with a note.
3. **Rear shock top nut.** 45 to 50 N·m on pp. 160 and 167; 37 to 44 N·m on p. 105. Data uses 45 to 50 with a note.
4. **Swingarm pivot nut.** 85 to 98 N·m on pp. 160 and 170; 70 to 83 N·m on p. 105. Data uses 85 to 98 with a note.
5. **Steering adjusting nut.** 2 N·m on p. 134; 2.5 N·m on p. 149. Both given.
6. **Lower fork clamp bolts.** 45 to 50 N·m on p. 134; 10 to 12 N·m on p. 149. Too far apart to choose; **left out** of the data. Only the upper clamp (22 to 29 N·m, pp. 134 and 149) is given.
7. **Steering head ball count.** p. 132: upper 21, lower 17; p. 149: lower 21, upper 19 (or 17). Left out; the procedure says to replace balls and races as a set.
8. **Clutch lever free play.** 10 to 15 mm on p. 68 (the adjustment page, used); 10 to 20 mm in the fault trees on pp. 27, 29, 30.
9. **Spark plug torque.** 15 N·m on p. 57 (used); 15 to 26 N·m in the engine torque table on p. 193.
10. **Ignition coil primary tolerance.** 4 Ω ± 15 % on p. 84; ± 10 % on p. 87. Both shown.
11. **Fuel filter interval.** 7000 to 10,000 km on p. 273; 7000 to 18,000 km on p. 274. Both shown.
12. **Drain cap torque.** p. 193 lists "Filter spring screw cap 15 to 30 N·m". p. 53 shows that the drain cap holds the oil screen and spring, so this is read as the drain cap torque. Interpretation, please confirm.
13. **Fork oil 285 ± 2 ml** (p. 155) is read as per leg, because the procedure there is for one leg; the manual does not say "per leg".
14. **Rear brake pushrod clearance** "0 to 0.2" on p. 115 has no unit; left out. The procedure says only that the plunger must not be pre-loaded.
15. **Tyre tread "wear limit: 1 mm"** (p. 70) is used as printed; local legal minimums may be higher.
16. **Engine oil grade** is not in the manual; the data says "the grade in your owner manual".
17. **Not used because of internal conflicts** (only matter for the workshop job): bore limit 56.505 mm (p. 212) against 56.6 mm (p. 216); piston limit 56.470 mm (p. 212) against 56.43 mm (p. 216); piston pin limit 12.96 mm (p. 212) against 13.04 mm (p. 216); crank runout 0.1 mm (p. 235) against 0.01 mm (p. 240); exhaust valve guide clearance 0.10 mm (p. 201) against 1.0 mm (p. 207); alternator 100 W (p. 18) against 160 W (p. 75).
18. **Generic fault trees.** Several K-Light fault trees (pp. 20 to 46) are generic: they mention carburettors, CDI, belts and liquid cooling that the K-Light does not have. Their logic is used; their "strike the wire to see a spark" tests are not, because they are unsafe.
19. **Course and MAVCC general rules** (no K-Light value exists): cranking voltage about 8 to 9 V (MAVCC PDF p. 310); charge rate 10 % of Ah, hydrometer 1.265 and 1.2 (MAVCC PDF pp. 290, 291); 40 psi tyre seating caution (MAVCC PDF p. 408); voltage-drop limits 0.2 V and 0.1 V (course 3.6); rider sag 25 to 33 % (course job sheet 4.5.1); all electric values (course 5.1, 5.5, 5.6 and job sheets 5.6.1 to 5.6.4). These are not model-specific and carry no "K-Light 125:" label.

Also noticed in `assets/content/parts.js` (not changed): the chain note "clean and lubricate every 500 to 800 km" is attributed to the K-Light 125, but the manual has no such interval.

## Source page for every number

K-Light 125 (printed page): idle 1500 ± 100 rpm (48); lever free play 10 to 20 mm (48, 60); pedal free play 20 to 30 mm (48, 61); tyre pressures 190 and 210 ± 10 kPa (48, 70); front axle 75 to 88 N·m (48, 71, 108, 134, 139); oil change every 3000 km (50); oil capacity 1.1 and 1.2 ± 0.1 L, wait 2 to 3 min (52); throttle free play 3 to 5 mm (54); plug D7RTC, gap 0.7 ± 0.1 mm, torque 15 N·m (57, 88); battery 13.1, 12.3, 12.8 V, 0.6 A 10 to 15 h, 6 A 30 min (58, 76, 77); YTX7A-BS 12 V 6 Ah (75); compression 1.0 to 1.2 MPa (59); chain slack 20 to 40 mm (60); banjo bolt 30 N·m (63, 108, 114); DOT 4 (64); pads 6.0 mm new, 3 mm limit (65, 108); brake light at about 15 mm (66); clutch free play 10 to 15 mm (68); tread limit 1 mm (70); key-off drain 1 mA (35); charging 14.5 ± 0.5 V at 5000 rpm (75, 77); stator 0.8 ± 0.3 Ω (75, 79); regulator bolts 5.0 N·m (75); coil 4 Ω, 18.6 and 13.6 kΩ ± 15 %, pick-up 150 ± 10 Ω, above 1.7 V (84, 86, 87); coil screw 5 to 7 N·m (87); starter brushes 12.5 and 8.5 mm (90); starter bolts 10 to 12 N·m (91); relay test (93); bulbs H4, W3W (97), R10W, P21/5W (98), W5W (99); horn bolt 10 to 12 N·m (102); muffler 22 to 29 and 5 to 9 N·m (105); discs 4.0/3.0 and 5.0/4.0 mm, caliper 22 to 29 N·m (108); disc bolts 10 to 12 N·m (110); disc runout 0.15 mm (111); bleeding, reservoir at least 1/3 (123); bearings 6202-2RS (129), 6303-2RS (158); rim runout 2.0 mm (134, 137); axle bend 0.2 mm (137); steering 2 N·m (134), 2.5 N·m and 70 N·m, upper fork clamp 22 to 29 N·m (149); fork spring 300 and 295 mm (153); damper rod 15 to 20 N·m (154); fork oil 285 ± 2 ml 46# (155); cap bolt 12 to 18 N·m (156); chain 428HO 134 links, sprocket 41T (157); shock nuts 45 to 50 and 22 to 29 N·m (167); pivot shaft 0.2 mm, nut 85 to 98 N·m (170); 10 links 127 mm (174); sprocket nuts 45 to 50 N·m (176); element sponge, tank 11.8 L (18); drain cap 15 to 30 N·m, valve locknut 10 to 15 N·m, front sprocket bolt 10 to 16 N·m, clutch push disc 10 to 16 N·m (193); valve clearance 0.05 to 0.07 mm (201); head flatness 0.05 mm (206); ring gap 0.5 mm, side clearance 0.09 mm (215); piston clearance 0.17 mm (216); clutch plates 2.9 to 3.0 / 2.6 mm, springs 35.45 to 36.5 / 34.2 mm (221); clutch locknut 50 to 60 N·m, tool numbers (222); TPS 5 ± 0.1 V, 14 ± 5 %, 70 to 80 % (258); pump about 3 s (267); pump 12 ± 2 V, 300 kPa, 270 kPa (268); diagnostic tool 8.5 V, throttle body every 10,000 km or 1 year, fuel filter interval (273, 274); fuses 10 A and 20 A (277).
