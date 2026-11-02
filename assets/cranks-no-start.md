---
id: cranks-no-start
title: Engine turns over but will not start
system: starting
also_called: [turns over but won't fire, no start, cranks but no fire, engine spins but won't catch]
urgency: do-not-ride
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected, kickstart, electric-start]
parts: [spark_plug, ignition_coil, fuel_pump, fuel_tap, carb, injector, air_filter, pickup]
repairs: [spark-test, spark-plug-service, clear-flooded-engine, fuel-tap-line-check, fuel-pump-check, efi-code-read, compression-test, carburettor-clean, air-filter-service]
related: [no-spark, flooded-engine, hard-cold-start, fuel-pump-silent, carb-no-fuel, low-compression, start-blocked-interlock, weak-spark, ignition-timing-suspect]
sources:
  - {doc: "K-Light 125 manual", page: 21}
  - {doc: "K-Light 125 manual", page: 22}
  - {doc: "K-Light 125 manual", page: 60}
  - {doc: "K-Light 125 manual", page: 268}
  - {doc: "K-Light 125 manual", page: 275}
  - {doc: "MAVCC Motorcycle Mechanic", page: 257}
  - {doc: "MAVCC Motorcycle Mechanic", page: 264}
---

# Engine turns over but will not start

The engine spins at normal speed but does not fire, or only coughs. An engine needs fuel, a spark, compression and air at the right time. This check finds which one is missing, starting with the quickest and cheapest checks.

## Is it safe to ride?
It will not run. Do not crank for long: you flatten the battery, overheat the starter and flood the engine.

## Quick checks first
- Fuel in the tank? Look in with a torch; gauges can be wrong.
- Engine stop switch on RUN; side stand up; neutral.
- Carburettor: fuel tap ON or RES; choke ON when cold.
- Fuel injection: does the pump buzz for about 3 seconds at key ON? Is the warning light on?
- Strong smell of petrol? The engine may be flooded.

## Diagnose it step by step

**1. Is there fuel in the tank, the tap ON (carburettor), or does the pump buzz at key ON (fuel injection)?**
- No fuel: fill up. Tap OFF: turn it ON or RES. No pump buzz: go to [No buzz from the fuel pump when the key is turned on](/moto-zero/repair/problems/fuel-pump-silent).
- Yes: go to step 2.

**2. Is there a strong smell of fuel, or is the plug wet with petrol?**
- Yes: the engine is flooded. [Clear a flooded engine](/moto-zero/repair/repairs/clear-flooded-engine).
- No: go to step 3.

**3. Is there a strong blue-white spark with a spark tester?**
- No spark: go to [No spark at the spark plug](/moto-zero/repair/problems/no-spark).
- Weak, orange spark: go to [Weak, thin or orange spark](/moto-zero/repair/problems/weak-spark).
- Strong spark: go to step 4. Use [Check for a spark safely](/moto-zero/repair/repairs/spark-test).

**4. Is the plug in good condition and correctly gapped?**
- No: [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service).
- Yes: go to step 5.

**5. Is fuel reaching the engine? Carburettor: does fuel come out of the float bowl drain screw? Fuel injection: is the plug damp after cranking, and are there no fault codes?**
- Carburettor, no fuel at the drain: [No fuel reaching the carburettor](/moto-zero/repair/problems/carb-no-fuel) and [Check the fuel tap, lines and flow](/moto-zero/repair/repairs/fuel-tap-line-check).
- Carburettor, fuel at the drain but plug stays dry: jets are blocked. [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean).
- Fuel injection, fault code or dry plug: [Read engine fault codes (fuel injection)](/moto-zero/repair/repairs/efi-code-read) and [Check the fuel pump (fuel injection)](/moto-zero/repair/repairs/fuel-pump-check).
- Fuel arrives: go to step 6.

**6. Is the air filter clean and the air box free of rags, nests or water?**
- No: [Clean or replace the air filter](/moto-zero/repair/repairs/air-filter-service).
- Yes: go to step 7.

**7. Is the compression normal? K-Light 125: 1.0 to 1.2 MPa.**
- Low: go to [Low compression](/moto-zero/repair/problems/low-compression). Use [Test engine compression](/moto-zero/repair/repairs/compression-test).
- Normal: suspect timing or, on fuel injection, a crank sensor gap that is too large (K-Light 125 manual). See [Ignition timing suspected wrong](/moto-zero/repair/problems/ignition-timing-suspect).

Do not pour or spray petrol into the plug hole. It is a fire risk and hides the real fault.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| No fuel, tap off, stop switch on STOP | Look and listen | Fill up; tap ON; switch to RUN |
| Flooded engine | Wet plug, smell of fuel | [Clear a flooded engine](/moto-zero/repair/repairs/clear-flooded-engine) |
| Fouled or worn plug | Plug black, wet or electrodes rounded | [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service) |
| No spark | Spark tester shows nothing | [Check for a spark safely](/moto-zero/repair/repairs/spark-test) |
| Blocked carburettor jets | Fuel at drain, plug dry | [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Fuel pump or injector fault | No buzz; fault code | [Check the fuel pump (fuel injection)](/moto-zero/repair/repairs/fuel-pump-check) |
| Low compression | Gauge reading low | [Test engine compression](/moto-zero/repair/repairs/compression-test) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Fuel pump run at key ON | about 3 s | 268 |
| Compression pressure | 1.0 to 1.2 MPa | 60 |
