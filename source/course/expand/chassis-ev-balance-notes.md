# chassis-ev balance notes (m4.js = Module 5, m5.js = Module 6)

Words per chapter (brief snippet), before -> after:
- m4-clutch 2731 -> 3092 (Job sheet 5.1.1 clutch cable free play)
- m4-gearbox 2233 -> 3159 (Job sheet 5.2.1 gear lever and linkage, neutral switch test, workshop internal checks, shifter linkage photo)
- m4-final-drive 2700 -> 3030 (cush drive check)
- m4-frame-steering 1630 -> 3031 (crash inspection, Job sheet 5.4.2 front end alignment, swingarm pivot and engine mounts with K-Light mount torques, handling fault table)
- m4-suspension 2876 -> 3082 (stepped preload collar adjustment)
- m4-wheels-tyres 3128, m4-brakes 3171 unchanged
- m4-maintenance 1346 -> 2961 (reading a real schedule, schedule additions by machine type, fastener checks, Job sheet 5.8.1 cable lubrication with Bowden cable photo, recommissioning after storage, road test)
- m5-architecture 2867 -> 3019 (interlocks and ready)
- m5-motors 3043, m5-safety 3153 unchanged
- m5-controllers 2408 -> 3022 (controller diagnosis steps, phase connectors, Hall sensors, missing regen)
- m5-batteries 2799 -> 3009 (storage in practice, Zero example values)
- m5-charging 2247 -> 3016 (charging fault diagnosis, early stop, heat at the plug, symptom table)

No new chapters, so no new quiz questions or CHAPTER_IMG entries. Only existing blocks kept; new content inserted around them.
Sources: repair pages in source/repair/md/repairs (frame-crash-inspect, front-end-align, swingarm-check, engine-mount-check,
gearshift-check, neutral-switch-test, gearbox-assessment, clutch-cable-adjust, cush-drive-check, rear-preload-adjust,
service-schedule, fastener-check, cable-lube, recommission-after-storage, road-test, ev-* pages); all repair links checked against repair-index.js.
Glossary: source/course/expand/chassis-ev-balance-glossary.json (6 terms).

Open questions:
- Gearbox and maintenance text cross-reference chapter 4.3 (Starting systems) and 6.4; these depend on the electrics group's renumbering.
- K-Light 125 manual gives two values for lower fork clamp bolts and swingarm pivot nut torque; text says to confirm, no value given.
- m4-maintenance (2961) and m5-controllers (3022) sit near the lower bound.
