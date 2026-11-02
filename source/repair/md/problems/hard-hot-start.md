---
id: hard-hot-start
title: Hard to start when the engine is hot
system: starting
also_called: [hot start problem, won't restart when warm, hard to start after a ride, heat soak no start]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected, kickstart, electric-start]
parts: [spark_plug, ignition_coil, pickup, carb, injector, efi_sensors, valves, choke_cable]
repairs: [clear-flooded-engine, ignition-coil-test, pickup-test, carb-float-check, efi-sensor-check, valve-clearance, compression-test, spark-plug-service, choke-check, air-cooling-check]
related: [coil-fails-hot, flooded-engine, stalls-when-hot, overheating-air, choke-stuck, injector-fault]
sources:
  - {doc: "K-Light 125 manual", page: 21}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "K-Light 125 manual", page: 277}
  - {doc: "MAVCC Motorcycle Mechanic", page: 656}
---

# Hard to start when the engine is hot

The engine starts well from cold but is hard to restart after a ride, for example after stopping for fuel. A hot engine needs only a little extra fuel. Too much fuel (choke left on, a float that leaks, a dripping injector) floods it. Heat also exposes weak electrical parts: a coil or pick-up with a cracked winding can stop working when hot and recover when cool. A third group is mechanical: valves set too tight can close less well once the engine expands.

## Is it safe to ride?
Yes, with care. If the engine also cuts out while riding when hot, do not ride in traffic until it is fixed: see [Ignition cuts out when hot and returns when cool](/moto-zero/repair/problems/coil-fails-hot).

## Quick checks first
- Carburettor: is the choke fully OFF? Do not use the choke on a hot engine.
- Fuel-injected: do not open the throttle while starting unless your manual says so (K-Light 125 manual, PDF page 277).
- Is there a strong smell of fuel after a failed start?
- Does it start normally once the engine has cooled down?
- Has the engine been overheating?

## Diagnose it step by step

**1. Is the choke fully OFF on a carburettor bike?**
- No: push it off. If it will not go off, see [Choke is stuck on or will not work](/moto-zero/repair/problems/choke-stuck).
- Yes, or fuel-injected: go to step 2.

**2. After a failed hot start, is the plug wet and smelling of fuel?**
- Yes: it is flooding. [Clear a flooded engine](/moto-zero/repair/repairs/clear-flooded-engine). Then find why: a leaking float needle ([Check the carburettor float and needle valve](/moto-zero/repair/repairs/carb-float-check)) or a dripping injector ([Fuel injector suspected blocked or leaking](/moto-zero/repair/problems/injector-fault)).
- No, the plug is dry: go to step 3.

**3. Straight after a failed hot start, is there a strong spark on a spark tester?**
- No, but it returns when cold: the coil or pick-up fails when hot. [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test) and [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test). Test them while hot.
- Yes: go to step 4.

**4. Fuel-injected: is there a temperature sensor fault code, or does the engine start if you open the throttle a little?**
- Yes: [Check the engine sensors (TPS, MAP, temperature)](/moto-zero/repair/repairs/efi-sensor-check). A wrong temperature reading makes the ECU add cold-start fuel to a hot engine.
- No, or carburettor: go to step 5.

**5. Is the engine running very hot (fins blocked, low oil, lean mixture)?**
- Yes: [Air-cooled engine overheats](/moto-zero/repair/problems/overheating-air).
- No: go to step 6.

**6. Are valve clearances and compression correct?**
- Have them checked: [Check and adjust valve clearance](/moto-zero/repair/repairs/valve-clearance), [Test engine compression](/moto-zero/repair/repairs/compression-test). Do the compression test warm.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Choke left on or sticking | Choke lever or plunger not fully off | [Check the choke or starter valve](/moto-zero/repair/repairs/choke-check) |
| Flooding from float or injector | Wet plug, fuel smell | [Clear a flooded engine](/moto-zero/repair/repairs/clear-flooded-engine) |
| Coil or cap failing when hot | No spark hot, spark cold | [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test) |
| Pick-up failing when hot | Resistance changes a lot when hot | [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test) |
| Temperature sensor fault (EFI) | Fault code or wrong reading | [Check the engine sensors (TPS, MAP, temperature)](/moto-zero/repair/repairs/efi-sensor-check) |
| Engine overheating | Hot smell, pinking, fins blocked | [Check air cooling (fins, airflow, mixture)](/moto-zero/repair/repairs/air-cooling-check) |
| Valve clearance too tight | Feeler gauge check | [Check and adjust valve clearance](/moto-zero/repair/repairs/valve-clearance) |
