---
id: low-power
title: Engine feels weak and down on power
system: power
also_called: [no power, sluggish, weak engine, poor acceleration]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected, chain, scooter-cvt, semi-auto]
parts: [air_filter, spark_plug, fuel_filter, carb, fuel_pump, exhaust, valves, piston_rings, clutch]
repairs: [road-test, brake-drag-check, tyre-pressure-check, air-filter-service, spark-plug-service, fuel-tap-line-check, fuel-filter-replace, fuel-pump-check, efi-code-read, compression-test, valve-clearance, two-stroke-decoke]
related: [revs-without-speed, bike-feels-held-back, poor-hill-climbing, low-top-speed, power-fades-hot, bogs-full-throttle, misfire-under-load, low-compression, exhaust-blocked, clutch-slip, runs-rich, runs-lean]
sources:
  - {doc: "K-Light 125 manual", page: 25}
  - {doc: "K-Light 125 manual", page: 60}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "MAVCC Motorcycle Mechanic", page: 257}
  - {doc: "MAVCC Motorcycle Mechanic", page: 664}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/engine_breakin.htm"}
  - {doc: "Dan's Motorcycle Repair Course (Briggs and Stratton troubleshooting flow chart)", url: "https://www.dansmc.com/miscellaneous/BS/bs_fail_flowchart/bs_flow.htm"}
---

# Engine feels weak and down on power

The bike accelerates slowly and feels weaker than it used to, but it runs and does not misfire badly. Low power has many causes, and some are not in the engine at all: a dragging brake or a soft tyre feels exactly like a weak engine. The order below follows the K-Light 125 power fault chart: first the wheels, then the engine's breathing, spark and fuel, then compression.

## Is it safe to ride?

Yes, with care. Allow more distance for overtaking and joining traffic.

## Quick checks first

- Do both wheels spin freely by hand with the bike on its stand?
- Are the tyre pressures correct?
- Is the choke fully off and the air filter clean?
- Do the revs rise without the bike speeding up (slip)?
- Fuel-injected: is the warning light on?
- After a rebuild or on a new engine, power rises slowly while the rings seat. See [Break in a new or rebuilt engine](/moto-zero/repair/repairs/engine-break-in).

## Diagnose it step by step

**1. When you open the throttle, do the revs rise but the speed hardly changes?**
- Yes: the power is being lost in the clutch or drive. Go to [Engine revs rise but the bike does not speed up](/moto-zero/repair/problems/revs-without-speed).
- No, the engine itself feels weak: go to step 2.

**2. On the stand, do both wheels spin freely and keep turning when you give them a push?**
- No: something is dragging. Go to [Bike feels held back](/moto-zero/repair/problems/bike-feels-held-back).
- Yes: go to step 3.

**3. Are tyre pressures correct?**
- No: [Check tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check). Look for a slow puncture.
- Yes: go to step 4.

**4. Is the air filter clean and the choke fully off?**
- No: [Clean or replace the air filter](/moto-zero/repair/repairs/air-filter-service).
- Yes: go to step 5.

**5. Is the spark plug in good condition and the correct type?**
- No: [Spark plug service](/moto-zero/repair/repairs/spark-plug-service). A black plug: see [Engine runs rich](/moto-zero/repair/problems/runs-rich). A white plug: see [Engine runs hot and lean](/moto-zero/repair/problems/runs-lean).
- Yes: go to step 6.

**6. Fuel-injected: is a code stored?**
- Yes: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read). Many bikes reduce power when a sensor fails.
- No, or carburettor: go to step 7.

**7. Does it lose power mainly at full throttle, or is fuel flow weak?**
- Yes: see [Bogs down or chokes at full throttle](/moto-zero/repair/problems/bogs-full-throttle). Check [the tap and lines](/moto-zero/repair/repairs/fuel-tap-line-check), [the filter](/moto-zero/repair/repairs/fuel-filter-replace) or [the fuel pump](/moto-zero/repair/repairs/fuel-pump-check).
- No: go to step 8.

**8. Is the exhaust blocked?** Two-strokes build carbon in the exhaust and port: [Exhaust blocked with carbon](/moto-zero/repair/problems/exhaust-blocked). On four-strokes the K-Light 125 manual lists a catalytic converter blocked by burnt oil.
- Clear: go to step 9.

**9. Is compression correct?**
- Do a [compression test](/moto-zero/repair/repairs/compression-test) with a gauge (K-Light 125: 1.0 to 1.2 MPa). Low: check [valve clearance](/moto-zero/repair/repairs/valve-clearance) first, since wrong clearance is the most common compression fault on small engines, then see [Low compression](/moto-zero/repair/problems/low-compression).

Confirm the fix with a [road test](/moto-zero/repair/repairs/road-test).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Brake or bearing drag | Wheel stops quickly when spun | [Brake drag check](/moto-zero/repair/repairs/brake-drag-check) |
| Low tyre pressure | Gauge | [Tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check) |
| Dirty air filter | Visual | [Air filter](/moto-zero/repair/repairs/air-filter-service) |
| Worn plug | Plug condition | [Spark plug](/moto-zero/repair/repairs/spark-plug-service) |
| Clutch or CVT slip | Revs rise without speed | [Revs without speed](/moto-zero/repair/problems/revs-without-speed) |
| Fuel restriction | Weak flow, bogs at full throttle | [Tap and lines](/moto-zero/repair/repairs/fuel-tap-line-check) |
| Blocked exhaust or catalyst | Carbon, rattle, back-pressure | [Two-stroke decoke](/moto-zero/repair/repairs/two-stroke-decoke) |
| Wrong valve clearance or worn engine | Compression test | [Compression test](/moto-zero/repair/repairs/compression-test) |
| Throttle cable does not open fully | Twist grip fully open, carburettor slide or butterfly not fully open | [Throttle cable adjust](/moto-zero/repair/repairs/throttle-cable-adjust) |
| Mixture lean | Runs better with the choke partly on | [Engine runs hot and lean](/moto-zero/repair/problems/runs-lean) |

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Compression | 1.0 to 1.2 MPa | 60 |
