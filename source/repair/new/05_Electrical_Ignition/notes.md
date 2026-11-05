# Notes: 05_Electrical_Ignition

## Result
done (14 repairs, 4 problems; checked: ids and links valid, no dashes, index.json matches files, photo files exist)

## Lessons
- 086 wiring diagrams: wiring-diagram-read; wire gauge and fuse rules folded into wire-solder-join. Honda colour list skipped (model-specific)
- 087 wiring diagram links list: not repair content, skip
- 088 / 091 ignition timing theory: existing ignition-timing-check; advance-on-worn-engine method NOT turned into a page (unsafe, opinion); theory to course
- 089 flywheel magneto: magneto-points-timing, flywheel-remove, contact-points-replace (shared)
- 090 electronic ignition: spark-tester-make, misfire-light-test; trigger gap and coil tests already in pickup-test, ignition-coil-test
- 091 battery-coil points: points-timing-set, contact-points-replace, condenser-test, points-wear-misfire
- 092, 093: no lesson text (images only / missing), skip
- 094 soldering: wire-solder-join, wire-crimp-join. Anecdote and scripture skipped
- 095 / 099 batteries: battery-dry-activate, battery-hydrometer-test, weak-battery-no-fire, battery-volts-ok-fails-load. Epsom salt and acid-swap tricks, 25 V revival, reversed-polarity story skipped (unsafe or unproven)
- 096 DC switches: dc-switch-select. Non-repair political and religious text skipped
- 097 / 098 spark plugs and catalog (30 image-only pages): covered by spark-plug-reading, spark-plug-service, skip
- 099 electric starters: starter-armature-test; solenoid screwdriver bypass skipped (sparks, unsafe)
- 099 electrical testing: coil, stator, rectifier, regulator, voltage drop, interlocks already covered; zener and capacitor tests skipped (old British bikes)
- 100 exploded starter views: images only, skip
- 101 starter-generator (dynamo): niche, skipped; see Open
- 102 Virago starter noise: model-specific, skip

## Images
- wire-solder-join: 094/094_soldering.jpg, 094_twist.jpg, 094_types_insulation.jpg
- wire-crimp-join: 094/094_wire_ends_crimping.jpg, 094_special_pliers.jpg, 099/099_wire_fitting.jpg
- wiring-diagram-read: 086/086_reading_wiring_diagrams.jpg, 086_simplest_wiring_system.jpg, 086_colored_marked.jpg
- dc-switch-select: 096/096_dc_ac_switch_bodies.jpg, 096_dc_switch.jpg, 096_ac_switch.jpg
- spark-tester-make: 090/090_ignition_test.jpg, 090_plug_caps.jpg
- misfire-light-test: 090/090_plug_caps.jpg, 090_ignition_test.jpg
- contact-points-replace: 089/089_points.jpg, 089_points_cam_follower_heel.jpg, 089_points_lubricating_felt.jpg, 091/091_points_pits.jpg
- condenser-test: 091/091_condensers.jpg, 091_points_condenser_cdi_box.jpg
- points-timing-set: 091/091_timing_marks.jpg, 091_set_point_gap.jpg, 091_elongated_holes.jpg, 091_timing_plugs.jpg
- magneto-points-timing: 089/089_buzz_box.jpg, 089_stator_plate.jpg, 089_flywheel_magneto_timing.jpg, 089_dial_indicator.jpg
- flywheel-remove: 089/089_flywheel_puller.jpg, 089_flywheel.jpg
- battery-dry-activate: 095/095_strange_looking_bottle.jpg, 095_fill_them_up.jpg, 095_yuasa_gyz_battery.jpg
- battery-hydrometer-test: 095/095_lead_sulfate.jpg, 095_tester.jpg, 095_battery_tester.jpg
- starter-armature-test: 099/099_brushes.jpg, 099_commutator_segments.jpg, 099_starter_alignment_marks.jpg, 099_pole_core_armature.jpg
- weak-battery-no-fire: 095/095_battery_tester.jpg, 090/090_ignition_test.jpg
- misfire-ignition-or-fuel: 090/090_plug_caps.jpg, 090_ignition_test.jpg
- points-wear-misfire: 091/091_points_pits.jpg, 089_points_cam_follower_heel.jpg
- battery-volts-ok-fails-load: 095/095_lead_sulfate.jpg, 095_tester.jpg
(all under source/dansmc/05_Electrical_Ignition/<lesson>/; also in page frontmatter `photos`)

## Course
- Ignition timing: combustion takes time, so spark must fire earlier (BTDC) as rpm rises; centrifugal advance reaches full around 3000 rpm; lower compression needs more advance (088/088_ignitiontiming.md; diagrams 091_centrifugal_advance.jpg, 091_vacuum_advance.jpg)
- Wiring basics: power source, feed, load, return; AC lights and rectified DC for battery (086/086_wiring_diagram.md)
- Volts are pressure, amps are volume: starter needs amps, CDI needs volts (090/090_cdiignition.md)
- Four parts of electronic ignition: trigger coil, source coil, CDI box, ignition coil (090)
- Voltage drop idea (099/099_electricaltesting.md)
- Battery self-discharge about 1% per day; charge no more than 1/10 of capacity; full flooded SG 1.26 to 1.28 (095). Conflict: K-Light manual says charge stored battery every 3 months (existing page), source says monthly
- Starter motor parts, gear reduction about 14 to 1, starter clutch vs solenoid pivot engagement (099/099_electric_starters.md)
- DC vs AC switch contact size (096)

## Open
1. Add a part id for contact breaker points, condenser and flywheel? Pages use stator/ignition_coil.
2. Want a dynamo (starter-generator) test page for old small bikes (101)?
3. Add a battery-storage page (monthly top-up) or keep to existing K-Light 3 month value?
4. Should the 6 mm spark gap rule be labelled as source rule of thumb in site pages?
5. Is a points-ignition applies_to tag needed (none exists)?
