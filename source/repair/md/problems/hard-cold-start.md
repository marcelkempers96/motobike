---
id: hard-cold-start
title: Hard to start when the engine is cold
system: starting
also_called: [cold start problem, won't start in the morning, needs many kicks when cold, slow to start cold]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected, kickstart, electric-start]
parts: [battery, choke_cable, spark_plug, carb, efi_sensors, air_filter, engine_oil, intake_manifold]
repairs: [battery-test-charge, choke-check, spark-plug-service, carburettor-clean, efi-sensor-check, intake-leak-test, valve-clearance, compression-test]
related: [starts-only-with-choke, choke-stuck, stale-fuel, slow-cranking, hard-hot-start, cranks-no-start]
sources:
  - {doc: "K-Light 125 manual", page: 21}
  - {doc: "K-Light 125 manual", page: 261}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "K-Light 125 manual", page: 277}
  - {doc: "Unit 2 The Motorcycle", page: 29}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/carbs2.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/gasohol.htm"}
---

# Hard to start when the engine is cold

The engine starts easily once warm, but on a cold morning it takes many tries. A cold engine needs a richer mixture because fuel does not evaporate well on cold metal. A carburettor bike gets this from the choke. A fuel-injected bike gets it from the ECU, which reads an engine temperature sensor. A cold engine also has thicker oil and a battery that gives less power. So the usual causes are the choke system, the battery, a weak spark, a small blocked jet, or a wrong temperature reading.

## Is it safe to ride?
Yes once it is running and warmed up. Let it idle briefly before riding off.

## Quick checks first
- Carburettor: are you using the choke? Does the choke lever move freely and return?
- Fuel-injected: K-Light 125 manual says not to touch the throttle when starting (PDF page 277). The ECU raises idle by itself on a cold engine.
- Does the starter turn the engine at normal speed?
- Has the bike stood for weeks with old fuel?
- A cold engine does not vaporise fuel well. Liquid fuel does not burn, so the choke gives a very rich mixture so that part of it vaporises.
- Fuel with a high alcohol share vaporises poorly in the cold. See [Problems after using ethanol blend fuel](/moto-zero/repair/problems/alcohol-fuel-trouble).


## Diagnose it step by step

**1. Does the engine crank at normal speed when cold?**
- No: cold weakens the battery and thickens the oil. Go to [Engine turns over slowly](/moto-zero/repair/problems/slow-cranking).
- Yes: go to step 2.

**2. Carburettor: does the choke work (lever moves the plunger or flap, and the engine runs faster with it on once started)?**
- No: [Check the choke or starter valve](/moto-zero/repair/repairs/choke-check) and [Choke is stuck on or will not work](/moto-zero/repair/problems/choke-stuck).
- Yes, or fuel-injected: go to step 3.

**3. Is the spark plug clean, dry and correctly gapped?**
- No: [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service). A sooty plug fires poorly when cold.
- Yes: go to step 4.

**4. Is the fuel fresh (no sour or varnish smell, not left for months)?**
- No: see [Old or stale fuel in the tank](/moto-zero/repair/problems/stale-fuel).
- Yes: go to step 5.

**5. Carburettor: does it start on the choke but stall when you push the choke off?**
- Yes: the pilot (idle) jet is partly blocked. [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean) and see [Starts only with the choke on or the throttle held open](/moto-zero/repair/problems/starts-only-with-choke).
- No: go to step 6.

**6. Fuel-injected: is there a fault code for the temperature sensor, or does the idle not rise when cold?**
- Yes: [Check the engine sensors (TPS, MAP, temperature)](/moto-zero/repair/repairs/efi-sensor-check). **K-Light 125: the ECU raises idle below 68 °C engine temperature; the head temperature sensor reads 1.9 to 2.1 kΩ at 25 °C.**
- No: go to step 7.

**7. Are the valve clearances and compression correct?**
- Have them checked: [Check and adjust valve clearance](/moto-zero/repair/repairs/valve-clearance), [Test engine compression](/moto-zero/repair/repairs/compression-test). Valves set too tight may not close fully, which loses compression and makes cold starting hard.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Choke not used or not working | Starts with choke working | [Check the choke or starter valve](/moto-zero/repair/repairs/choke-check) |
| Weak battery or thick oil | Slow cranking when cold | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Fouled or worn plug | Plug sooty or worn | [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service) |
| Stale fuel or part-blocked pilot jet | Dies when choke goes off | [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Air leak at the intake rubber | Hissing; idle changes when sprayed | [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test) |
| Engine temperature sensor fault (EFI) | Fault code; wrong reading | [Check the engine sensors (TPS, MAP, temperature)](/moto-zero/repair/repairs/efi-sensor-check) |
| Valve clearance too tight, low compression | Gauge and feeler checks | [Check and adjust valve clearance](/moto-zero/repair/repairs/valve-clearance) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Fast idle active below | 68 °C engine temperature | 276 |
| Head temperature sensor | 1.9 to 2.1 kΩ at 25 °C | 261 |
