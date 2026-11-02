---
id: coil-fails-hot
title: Ignition cuts out when hot and returns when cool
system: ignition
also_called: [dies when hot, cuts out when warm, restarts after cooling, heat related cut out]
urgency: do-not-ride
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [ignition_coil, pickup, cdi, ecu, wiring, fuel_cap, fuel_pump]
repairs: [spark-test, ignition-coil-test, pickup-test, connector-clean, tank-vent-check, fuel-pump-check, cdi-ecu-diagnosis]
related: [cuts-out-random, stalls-when-hot, hard-hot-start, tank-vacuum, power-fades-hot, overheating-air, intermittent-electrical]
sources:
  - {doc: "K-Light 125 manual", page: 85}
  - {doc: "K-Light 125 manual", page: 87}
  - {doc: "K-Light 125 manual", page: 88}
  - {doc: "K-Light 125 manual", page: 268}
---

# Ignition cuts out when hot and returns when cool

After riding for a while the engine stops, or misfires badly, then starts again after it has cooled for a time. Heat makes metal and plastic expand. A coil, pick-up or CDI with a hairline crack in its winding or circuit board can open up when hot and close again when cold. A coil can pass a cold resistance test and still fail when hot or under load. But fuel faults behave the same way: a blocked tank vent or a tired fuel pump also lets the engine run, stop, and recover after a rest. So test at the moment it fails.

## Is it safe to ride?
No, not in traffic. A sudden cut-out can leave you stopped in the road. Ride only to test it, in a safe place.

## Quick checks first
- When it stops, open the fuel cap: does air hiss in? If so, see [Engine stops after a few kilometres and the cap hisses when opened](/moto-zero/repair/problems/tank-vacuum).
- Fuel-injected: when it stops, turn the key OFF and ON. Does the pump run for its usual few seconds?
- Is the engine overheating (very hot smell, pinking, oil low)?
- Does the dashboard stay lit when it cuts? If everything goes dark, the fault is power supply, not ignition.

## Diagnose it step by step

**1. When it cuts out, does the dashboard and every light go dark too?**
- Yes: the main power supply is breaking: key switch, fuse, battery connection or main wire. See [Electrical faults come and go](/moto-zero/repair/problems/intermittent-electrical).
- No: go to step 2.

**2. Does it restart at once if you open the fuel cap?**
- Yes: blocked tank vent. [Check the fuel tank vent](/moto-zero/repair/repairs/tank-vent-check).
- No: go to step 3.

**3. Straight after it cuts out, is there a spark on a spark tester?**
- No spark when hot, spark when cold: an ignition part fails with heat. Go to step 4. Use [Check for a spark safely](/moto-zero/repair/repairs/spark-test).
- Good spark: the fault is fuel or overheating. Fuel-injected: [Check the fuel pump (fuel injection)](/moto-zero/repair/repairs/fuel-pump-check). Overheating: [Air-cooled engine overheats](/moto-zero/repair/problems/overheating-air).

**4. While hot and failing, measure the pick-up resistance. Is it open or far from its cold value? (K-Light 125 cold value: 150 ± 10 Ω at 20 °C)**
- Yes: replace the pick-up. [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test).
- No: go to step 5.

**5. While hot and failing, does the coil primary or secondary read open, or does a known good coil keep it running?**
- Yes: replace the coil. [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test).
- No: go to step 6.

**6. Are the connectors near the engine and under the seat tight and clean, or does wiggling them stop the engine?**
- Faulty: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- All good: the CDI or ECU is the suspect. Keep it shaded and check its mounting; then [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Blocked fuel tank vent | Hiss on opening cap; restarts at once | [Check the fuel tank vent](/moto-zero/repair/repairs/tank-vent-check) |
| Ignition coil failing hot | No spark hot; swap test | [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test) |
| Pick-up failing hot | Resistance open or far off when hot | [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test) |
| Loose connector expanding with heat | Cut-out when wiggled | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Fuel pump weak when hot (EFI) | Good spark; no pump run | [Check the fuel pump (fuel injection)](/moto-zero/repair/repairs/fuel-pump-check) |
| CDI or ECU failing hot | All else good; swap test | [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Pick-up resistance | 150 ± 10 Ω at 20 °C | 87 |
