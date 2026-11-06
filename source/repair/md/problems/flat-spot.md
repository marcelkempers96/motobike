---
id: flat-spot
title: Flat spot in the middle of the rev range
system: running
also_called: [dead spot, mid-range stumble, holes in the power]
urgency: ok-to-ride
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [carb, air_filter, throttle_body, efi_sensors, intake_manifold, spark_plug, exhaust]
repairs: [road-test, air-filter-service, carb-float-check, carburettor-clean, intake-leak-test, efi-code-read, efi-sensor-check, throttle-body-clean, spark-plug-service]
related: [hesitation, bogs-full-throttle, runs-lean, runs-rich, surging-cruise, misfire-under-load, exhaust-leak, exhaust-loud]
sources:
  - {doc: "MAVCC Motorcycle Mechanic", page: 352}
  - {doc: "MAVCC Motorcycle Mechanic", page: 356}
  - {doc: "MAVCC Motorcycle Mechanic", page: 350}
  - {doc: "K-Light 125 manual", page: 259}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/carb10.htm"}
---

# Flat spot in the middle of the rev range

The engine pulls at low revs and at high revs, but in one band in the middle (for example from a quarter to half throttle) it goes flat, stumbles or stops pulling, then picks up again. Carburettors meter fuel in overlapping ranges: the pilot circuit near closed throttle, the needle and needle jet from about a quarter to three quarters, and the main jet near full throttle. A flat spot in one band points to the part that controls that band. On injected bikes the cause is usually a sensor signal or an air leak.

## Is it safe to ride?

Yes. Avoid relying on that throttle range for overtaking until it is fixed.

## Quick checks first

- Note the throttle position (not just the speed) where it goes flat, on a [road test](/moto-zero/repair/repairs/road-test).
- Is the air filter clean and the airbox closed properly?
- Has anyone changed the jets, needle clip or exhaust?
- Fuel-injected: is the warning light on?
- Note where in the throttle range the flat spot is. Put tape on the grip and housing and mark closed, quarter, half, three quarter and full. Each jet and the needle work over one part of the range, so the position shows which part to look at.

## Diagnose it step by step

**1. Is the air filter clean, correctly fitted, and the airbox and intake rubber sealed?**
- No: [clean or replace the air filter](/moto-zero/repair/repairs/air-filter-service) and refit the airbox. A missing or oily filter upsets mid-range fuelling.
- Yes: go to step 2.

**2. Has the exhaust been changed, holed, or has a baffle been removed?**
- Yes: a changed exhaust changes the airflow and often causes mid-range flat spots. Refit the correct exhaust. See [Exhaust has become much louder](/moto-zero/repair/problems/exhaust-loud).
- No: go to step 3.

**3. Does the idle change when you spray water on the intake joints?**
- Yes: [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test).
- No: carburettor go to step 4; fuel-injected go to step 6.

**4. Carburettor: has the needle clip, needle or needle jet been changed or is the carburettor old and dirty?**
- Changed: refit the parts specified for your bike, with the clip in the standard groove. The needle and needle jet wear oval with time and can also cause a rich flat spot; replace them as a pair.
- Old or dirty: [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean), and on a CV (vacuum) carburettor check the diaphragm for holes.

**5. Carburettor: is the float level correct?**
- A low float level gives a lean flat spot as the jets draw harder. [Check the float](/moto-zero/repair/repairs/carb-float-check).

**6. Fuel-injected: is a code stored, or does the throttle position reading jump in live data?**
- [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read) and [check the engine sensors](/moto-zero/repair/repairs/efi-sensor-check). A worn throttle position sensor can have a dead spot in its track.
- No code: [clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean).

**7. Still flat?** Check ignition: [service the plug](/moto-zero/repair/repairs/spark-plug-service). Then see [Hesitates when opening the throttle](/moto-zero/repair/problems/hesitation).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Dirty, oily or badly fitted air filter | Visual check | [Air filter](/moto-zero/repair/repairs/air-filter-service) |
| Changed or damaged exhaust | Louder, baffle missing | Refit correct exhaust |
| Intake air leak | Water spray test | [Intake leak test](/moto-zero/repair/repairs/intake-leak-test) |
| Dirty or worn needle and needle jet, wrong clip | Parts history, inspection | [Clean carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Torn CV diaphragm | Pinholes against light | [Clean carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| TPS dead spot (injection) | Live data jumps | [Sensor check](/moto-zero/repair/repairs/efi-sensor-check) |
| Needle, needle jet or slide cutaway wrong for that throttle range | Fault matches one quarter of the throttle travel | [Read a plug and choose the jet](/moto-zero/repair/repairs/carb-jet-tune) |
