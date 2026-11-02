---
id: rough-idle
title: Rough, lumpy or uneven idle
system: running
also_called: [lumpy idle, shaking at idle, misfire at idle, uneven tickover]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [spark_plug, ignition_coil, air_filter, carb, throttle_body, intake_manifold, injector, valves]
repairs: [spark-plug-service, spark-plug-reading, spark-test, air-filter-service, carb-idle-adjust, carburettor-clean, intake-leak-test, efi-code-read, throttle-body-clean, valve-clearance, compression-test]
related: [stalls-at-idle, hunting-idle, weak-spark, plug-black-sooty, plug-oily, low-compression, tappet-tick, runs-rich, misfire-under-load, injector-fault]
sources:
  - {doc: "K-Light 125 manual", page: 26}
  - {doc: "K-Light 125 manual", page: 57}
  - {doc: "K-Light 125 manual", page: 58}
  - {doc: "K-Light 125 manual", page: 89}
  - {doc: "K-Light 125 manual", page: 60}
  - {doc: "K-Light 125 manual", page: 202}
  - {doc: "MAVCC Motorcycle Mechanic", page: 656}
---

# Rough, lumpy or uneven idle

At idle the engine shakes, misses beats or sounds uneven, though it may run well on the move. At idle each fault shows clearly because the engine is turning slowly with little fuel. A tired spark plug, wrong idle mixture, an air leak or wrong valve clearance are the usual causes. On two-strokes, an oily plug is common.

## Is it safe to ride?

Yes, with care. If it also misfires on the move or loses power, read [Misfires when accelerating hard](/moto-zero/repair/problems/misfire-under-load).

## Quick checks first

- Is the engine fully warm? Many engines are rough for the first minute.
- Is the plug cap pushed fully onto the plug?
- When was the plug last changed?
- Is the air filter clean?
- Is there a ticking noise from the top of the engine?

## Diagnose it step by step

**1. Remove the spark plug. Is it black and sooty, wet with oil or fuel, or white?**
- Black and dry: rich idle. See [Spark plug is black and sooty](/moto-zero/repair/problems/plug-black-sooty).
- Wet with oil: see [Spark plug is wet with oil](/moto-zero/repair/problems/plug-oily).
- White or blistered: lean. Go to step 4.
- Light grey or tan, but the electrode is worn or the gap is wrong: [service or replace the plug](/moto-zero/repair/repairs/spark-plug-service) (K-Light 125: gap 0.7 ± 0.1 mm). Use [Read a spark plug](/moto-zero/repair/repairs/spark-plug-reading) for help.

**2. With a new plug fitted, is the spark strong and blue in a spark tester?**
- No: [Check for a spark safely](/moto-zero/repair/repairs/spark-test) and go to [Weak, thin or orange spark](/moto-zero/repair/problems/weak-spark).
- Yes: go to step 3.

**3. Is the air filter clean?**
- No: [clean or replace it](/moto-zero/repair/repairs/air-filter-service).
- Yes: go to step 4.

**4. Does the idle change when you spray water on the intake joints?**
- Yes: [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test).
- No: carburettor bikes go to step 5; fuel-injected go to step 6.

**5. Carburettor: does the pilot screw smooth the idle?**
- Yes: [adjust idle speed and mixture](/moto-zero/repair/repairs/carb-idle-adjust).
- No effect: [clean the carburettor](/moto-zero/repair/repairs/carburettor-clean). Go to step 7 if still rough.

**6. Fuel-injected: is a code stored?**
- Yes: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read).
- No: [clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean). If still rough, the injector may be dirty: [Fuel injector suspected blocked or leaking](/moto-zero/repair/problems/injector-fault).

**7. Still rough with good spark and fuel?**
- [Check valve clearance](/moto-zero/repair/repairs/valve-clearance) on a cold engine (K-Light 125: 0.05 to 0.07 mm, inlet and exhaust). Then a [compression test](/moto-zero/repair/repairs/compression-test). Low reading: [Low compression](/moto-zero/repair/problems/low-compression).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Worn, fouled or wrongly gapped plug | Plug condition and gap | [Spark plug service](/moto-zero/repair/repairs/spark-plug-service) |
| Loose plug cap or weak coil | Weak spark in tester | [Spark test](/moto-zero/repair/repairs/spark-test) |
| Dirty air filter | Filter clogged | [Air filter](/moto-zero/repair/repairs/air-filter-service) |
| Air leak | Water spray changes idle | [Intake leak test](/moto-zero/repair/repairs/intake-leak-test) |
| Idle mixture wrong or pilot jet blocked | Pilot screw no effect | [Clean carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Dirty throttle body or injector | Deposits, codes | [Throttle body](/moto-zero/repair/repairs/throttle-body-clean) |
| Wrong valve clearance, low compression | Feeler gauge, gauge reading | [Valve clearance](/moto-zero/repair/repairs/valve-clearance) |

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Spark plug type | D7RTC | 89 |
| Spark plug gap | 0.7 ± 0.1 mm | 58 |
| Valve clearance (cold) | 0.05 to 0.07 mm inlet and exhaust | 202 |
| Compression | 1.0 to 1.2 MPa | 60 |
