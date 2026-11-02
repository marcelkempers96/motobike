---
id: low-top-speed
title: Will not reach normal top speed
system: power
also_called: [slow top end, lost top speed, will not go above]
urgency: ok-to-ride
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected, chain, scooter-cvt]
parts: [air_filter, exhaust, carb, fuel_filter, spark_plug, clutch_plates, cvt_belt, cvt_rollers, front_tyre, rear_tyre]
repairs: [road-test, tyre-pressure-check, brake-drag-check, air-filter-service, fuel-tap-line-check, fuel-filter-replace, carburettor-clean, fuel-pump-check, efi-code-read, spark-plug-service, two-stroke-decoke]
related: [bogs-full-throttle, low-power, cvt-low-top-speed, clutch-slip, exhaust-blocked, bike-feels-held-back, speedo-dead, misfire-high-rpm]
sources:
  - {doc: "K-Light 125 manual", page: 19}
  - {doc: "K-Light 125 manual", page: 25}
  - {doc: "K-Light 125 manual", page: 276}
---

# Will not reach normal top speed

The bike accelerates normally through the lower gears but runs out of speed earlier than it used to, or than similar bikes. At top speed the engine needs its full breathing and fuel flow, and the drive must not slip or drag. Before you start, make sure the speed is really lower: a different tyre size or sprocket makes the speedometer read wrong.

## Is it safe to ride?

Yes. Do not hold full throttle for long periods while the cause is unknown, in case the engine is running lean.

## Quick checks first

- Is the speedometer reading true? Compare with a phone GPS app (passenger use, or fixed mount).
- Has the tyre size, sprocket or exhaust been changed?
- Are tyre pressures correct, and do the wheels spin freely?
- Is the air filter clean?
- Scooter: when was the drive belt last checked?

## Diagnose it step by step

**1. Does a GPS speed check confirm the bike really is slower?**
- No, only the speedometer reads low: the speedometer or its drive is wrong, not the engine. See [Speedometer does not work](/moto-zero/repair/problems/speedo-dead).
- Yes: go to step 2.

**2. At top speed in top gear, do the revs keep rising without more speed?**
- Yes: slip. Manual: [Clutch slips](/moto-zero/repair/problems/clutch-slip). Scooter: [Scooter will not reach top speed](/moto-zero/repair/problems/cvt-low-top-speed).
- No, the revs stop rising too: go to step 3.

**3. Do the wheels spin freely, and are tyre pressures correct?**
- No: [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check) and [tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check).
- Yes: go to step 4.

**4. Does the engine choke or bog at full throttle, or pull better with slightly less throttle?**
- Yes: fuel or air restriction. Go to [Bogs down or chokes at full throttle](/moto-zero/repair/problems/bogs-full-throttle). Start with the [air filter](/moto-zero/repair/repairs/air-filter-service), then [fuel flow](/moto-zero/repair/repairs/fuel-tap-line-check), [filter](/moto-zero/repair/repairs/fuel-filter-replace) and [carburettor](/moto-zero/repair/repairs/carburettor-clean) or [fuel pump](/moto-zero/repair/repairs/fuel-pump-check).
- It misfires at high revs: see [Misfires only at high revs](/moto-zero/repair/problems/misfire-high-rpm).
- Neither: go to step 5.

**5. Fuel-injected: is a code stored?**
- Yes: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read). Many bikes limit power or revs when a sensor fails.
- No: go to step 6.

**6. Is the exhaust restricted?** Two-strokes: carbon in the port and silencer is the usual cause. See [Exhaust blocked with carbon](/moto-zero/repair/problems/exhaust-blocked). Four-strokes: the K-Light 125 manual lists a blocked catalytic converter. Workshop.

**7. Still slow?** Go to [Engine feels weak and down on power](/moto-zero/repair/problems/low-power) and check compression.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Speedometer error after tyre or sprocket change | GPS check | [Speedometer](/moto-zero/repair/problems/speedo-dead) |
| Clutch or CVT slip | Revs rise without speed | [Clutch slips](/moto-zero/repair/problems/clutch-slip) |
| Dragging brake, low tyre | Spin test, gauge | [Brake drag check](/moto-zero/repair/repairs/brake-drag-check) |
| Dirty air filter | Visual | [Air filter](/moto-zero/repair/repairs/air-filter-service) |
| Fuel restriction at full throttle | Bogs, weak flow | [Fuel filter](/moto-zero/repair/repairs/fuel-filter-replace) |
| Blocked exhaust or catalyst | Carbon, back-pressure | [Two-stroke decoke](/moto-zero/repair/repairs/two-stroke-decoke) |

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Maximum speed | 90 km/h in fifth gear | 19 |
