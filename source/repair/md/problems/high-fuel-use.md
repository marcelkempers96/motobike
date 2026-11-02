---
id: high-fuel-use
title: Uses more fuel than normal
system: power
also_called: [poor fuel economy, drinks fuel, bad mileage, high consumption]
urgency: ok-to-ride
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [air_filter, choke_cable, carb, fuel_line, fuel_tap, injector, o2_sensor, front_tyre, rear_tyre, spark_plug]
repairs: [fuel-economy-test, tyre-pressure-check, brake-drag-check, fuel-tap-line-check, air-filter-service, choke-check, carb-float-check, carb-idle-adjust, efi-code-read, o2-sensor-check, injector-check, spark-plug-service]
related: [runs-rich, black-smoke, fuel-leak, choke-stuck, bike-feels-held-back, clutch-slip, high-idle, carb-overflowing, fuel-smell, fuel-gauge-wrong]
sources:
  - {doc: "K-Light 125 manual", page: 27}
  - {doc: "K-Light 125 manual", page: 274}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "MAVCC Motorcycle Mechanic", page: 349}
---

# Uses more fuel than normal

The bike needs filling more often than before. First prove it with a real measurement, because a fuel gauge, a change of route or a different filling level can mislead you. If the bike truly uses more, the K-Light 125 fault chart starts with how it is ridden and loaded, then looks for drag, leaks and a rich mixture.

## Is it safe to ride?

Yes. If you smell fuel or see a leak, stop and fix it first: see [Fuel is leaking or dripping](/moto-zero/repair/problems/fuel-leak).

## Quick checks first

- Has the riding changed: more traffic, more passengers or cargo, more time in low gears, more short trips?
- Is the fuel grade correct (K-Light 125: unleaded 92 or 95)?
- Are tyre pressures correct?
- Is there any fuel smell or wet patch under the bike?
- Is the choke fully off when warm?

## Diagnose it step by step

**1. Measure it: do a [fill-to-fill fuel test](/moto-zero/repair/repairs/fuel-economy-test) over two or three tanks. Is consumption really higher than before for the same riding?**
- No: the gauge or the riding changed. If the gauge is the problem, see [Fuel gauge reads wrong](/moto-zero/repair/problems/fuel-gauge-wrong).
- Yes: go to step 2.

**2. Is there a leak, a fuel smell, or fuel dripping from the carburettor overflow?**
- Yes: [Check the fuel tap, lines and flow](/moto-zero/repair/repairs/fuel-tap-line-check) and see [Fuel is leaking](/moto-zero/repair/problems/fuel-leak) or [Fuel pours out of the overflow pipe](/moto-zero/repair/problems/carb-overflowing).
- No: go to step 3.

**3. Do both wheels spin freely, and are tyre pressures correct?**
- No: [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check) and [tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check). See [Bike feels held back](/moto-zero/repair/problems/bike-feels-held-back).
- Yes: go to step 4.

**4. Is there black smoke, a sooty plug or a fuel smell from the exhaust?**
- Yes: rich mixture. Check the [air filter](/moto-zero/repair/repairs/air-filter-service) and [choke](/moto-zero/repair/repairs/choke-check), then see [Engine runs rich](/moto-zero/repair/problems/runs-rich).
- No: go to step 5.

**5. Is the idle too high, or do the revs rise without speed (slip)?**
- High idle: see [Idle speed is too high](/moto-zero/repair/problems/high-idle).
- Slip: see [Clutch slips](/moto-zero/repair/problems/clutch-slip).
- Neither: go to step 6.

**6. Fuel-injected: is the oxygen sensor tight, and is a code stored?**
- The K-Light 125 manual names a loose oxygen sensor as a cause of very high consumption. [Check the oxygen sensor](/moto-zero/repair/repairs/o2-sensor-check) and [read fault codes](/moto-zero/repair/repairs/efi-code-read).
- Sensor fine: ask a workshop to [check the injector](/moto-zero/repair/repairs/injector-check) for leakage.

**7. Carburettor with no smoke:** [Check the float level](/moto-zero/repair/repairs/carb-float-check). A high float level wastes fuel without much smoke.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Riding style, load, traffic, low gears | Compare like with like | Change riding, reduce load |
| Low tyre pressure or dragging brake | Gauge, spin test | [Tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check) |
| Fuel leak | Smell, wet patch | [Tap and lines](/moto-zero/repair/repairs/fuel-tap-line-check) |
| Dirty air filter or choke on (rich) | Black smoke, sooty plug | [Air filter](/moto-zero/repair/repairs/air-filter-service) |
| High float level or leaking needle | Overflow drips | [Float check](/moto-zero/repair/repairs/carb-float-check) |
| Clutch slip or high idle | Revs rise without speed | [Clutch slips](/moto-zero/repair/problems/clutch-slip) |
| Loose O2 sensor or leaking injector | Workshop live data | [O2 check](/moto-zero/repair/repairs/o2-sensor-check) |
