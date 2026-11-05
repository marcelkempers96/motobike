# Photo map notes (2026-11-05)

Output: `source/repair/photo-map.json` (paths relative to /home/user/motobike).

## Counts
- Parts: 42 of 134 have photos (73 photos in total, 1 to 3 each).
- Repairs: 40 of 185 have photos (79 photos in total, 1 to 4 each).
- Only .jpg files used; no gifs (the surviving gifs are site buttons).
- 13 contact sheets (about 150 images) viewed, well under the 60-view limit. All files exist on disk.

## Why coverage is low
Uploaded lessons are 001-025 and 086-151 only. The course lessons on carburettors, fuel,
lights, tyres-and-tubes detail, cables, controls and oil were not uploaded. Nothing in the
upload covers electric motorcycles, scooter CVT (only line drawings), or most lighting/wiring jobs.

## Parts with no photo (92)
See the complete list: every part id not a key in `parts`. Main groups: all EV parts (aux_battery,
bms, charge_port, charger, contactor, controller, dc_dc, motor, motor_sensor, throttle_sensor,
traction_battery), fuel system (carb, fuel_*, injector, throttle_body, intake_manifold, air_filter),
lighting and electrics (headlight, horn, fuse, flasher, indicators, instruments, tail_light, wiring,
switches), cables and controls, oil and gear oil parts, frame/bodywork/stands, CVT parts, sensors.

## Repairs with no photo (145)
Every repair id not a key in `repairs`. Mostly electrical tests, EV jobs, fuel and carb jobs, cable
adjustments, chain adjust/lube, tyre pressure and routine rider checks.

## Doubtful or weak picks
- drum_brake: only a hub photo showing shoes, spring and cable (144/inside). The shoe drawings in lesson 140 were skipped as diagrams.
- regulator / regulator-test: photo shows a rectifier box on an ohmmeter test, not a regulator-rectifier unit.
- stator-test, leak-down-test, chain-adjust, cvt-*: no usable photo. Leak-down tester image is a 3 KB thumbnail, skipped.
- 115/broken_teeth and 147/adusting_spokes were chosen from captions and text without being opened.
- Several picks are adjacent rather than exact: 146/cut_outs (rim protector during tyre levering),
  143/aline_front_wheel (whole bike, not a close-up), 145/rear_wheel (wheel fitted, before removal).
- 138/little_rubber and 138/plunger_shaft are from a rear master cylinder, shown for the master cylinder parts.
- 125 cooling photos are labelled bikes (radiator cap, reservoir), not close-ups.
- Lesson 098 spark plug reading shots (sp01-sp28) are numbered with no text; 097 close-ups used instead.
- Same file reused across parts and repairs where it fits both (for example 138/large_c_clamp).
- Many lessons have duplicate copies (for example 089 repeats 021, 116 repeats 115); the first page URL found was used.
