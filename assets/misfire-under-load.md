---
id: misfire-under-load
title: Misfires or stutters when accelerating hard or climbing
system: running
also_called: [stutters under load, misses when climbing, jerks at full throttle, breaks up under load]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [spark_plug, ignition_coil, fuel_filter, fuel_pump, carb, injector, fuel_tap, air_filter]
repairs: [road-test, spark-plug-service, spark-test, ignition-coil-test, fuel-tap-line-check, fuel-filter-replace, tank-vent-check, carb-float-check, carburettor-clean, fuel-pump-check, efi-code-read, injector-check, drain-fuel]
related: [misfire-high-rpm, weak-spark, coil-fails-hot, fuel-starvation, bogs-full-throttle, dies-in-rain, pinking, clutch-slip, water-in-fuel, injector-fault]
sources:
  - {doc: "K-Light 125 manual", page: 58}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "K-Light 125 manual", page: 269}
  - {doc: "MAVCC Motorcycle Mechanic", page: 257}
  - {doc: "MAVCC Motorcycle Mechanic", page: 350}
---

# Misfires or stutters when accelerating hard or climbing

The engine is fine at idle and cruising, but when you open the throttle wide, climb a hill or carry a passenger it stutters, jerks or misses. Under load, the cylinder pressure is high, so a weak spark is the first to fail; and the engine needs the most fuel, so a restricted fuel supply shows up here first. Find out which with the steps below.

## Is it safe to ride?

Yes, with care. Avoid overtaking and steep climbs until it is fixed; the engine may not respond when you need it.

## Quick checks first

- Does the engine **misfire** (jerky, popping), or do the revs rise smoothly without the bike speeding up? Rising revs is clutch slip: see [Clutch slips](/moto-zero/repair/problems/clutch-slip).
- Is the plug cap tight and the lead uncracked?
- Did it start after a fuel stop (bad fuel, water)?
- Is it worse in rain or after washing?
- Is it worse when the tank is low?

## Diagnose it step by step

**1. Fit a new spark plug of the correct type and gap. Is the misfire gone?**
- Yes: the old plug was worn. A worn plug needs more voltage to spark under pressure. [Spark plug service](/moto-zero/repair/repairs/spark-plug-service) (K-Light 125: gap 0.7 ± 0.1 mm; its manual lists this check for misfire).
- No: go to step 2.

**2. Is the misfire worse in wet weather, or is the plug lead or cap cracked or damp?**
- Yes: high voltage is leaking to earth. Go to [Misfires or dies in heavy rain](/moto-zero/repair/problems/dies-in-rain) and [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test).
- No: go to step 3.

**3. Does it only happen when the engine is hot, or only at high revs?**
- Only hot: see [Ignition cuts out when hot](/moto-zero/repair/problems/coil-fails-hot).
- Only at high revs, even unloaded: see [Misfires only at high revs](/moto-zero/repair/problems/misfire-high-rpm).
- Neither: go to step 4.

**4. Does the misfire go away for a while after you open the fuel cap, or is it worse when the tank is low?**
- Opening the cap helps: [Check the fuel tank vent](/moto-zero/repair/repairs/tank-vent-check).
- Worse on low fuel: fill up and retest. Then go to step 5.

**5. Carburettor bikes: does fuel flow strongly from the tap (ON and RES), with a clean filter?**
- No: [Check the fuel tap, lines and flow](/moto-zero/repair/repairs/fuel-tap-line-check) and [replace the fuel filter](/moto-zero/repair/repairs/fuel-filter-replace).
- Yes: a low float level or partly blocked main jet starves the engine at full throttle. [Check the float](/moto-zero/repair/repairs/carb-float-check) and [clean the carburettor](/moto-zero/repair/repairs/carburettor-clean).

**6. Fuel-injected bikes: is a code stored, and does the pump buzz strongly at key-on?**
- Code: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read).
- Weak or no buzz: [Check the fuel pump](/moto-zero/repair/repairs/fuel-pump-check). A workshop pressure test shows a weak pump or blocked filter.
- All normal: see [Fuel injector suspected blocked or leaking](/moto-zero/repair/problems/injector-fault).

**7. Is there water in the fuel?** Drain a sample into a clear jar. Water: [Water or dirt in the fuel](/moto-zero/repair/problems/water-in-fuel).

Use a [road test](/moto-zero/repair/repairs/road-test) to confirm the fix in the same conditions.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Worn plug or gap too wide | New plug cures it | [Spark plug](/moto-zero/repair/repairs/spark-plug-service) |
| Cracked lead, loose or damp cap | Worse when wet; sparks visible in the dark | [Coil and cap test](/moto-zero/repair/repairs/ignition-coil-test) |
| Fuel restriction (vent, tap, filter) | Weak flow, better with cap open | [Tap and lines](/moto-zero/repair/repairs/fuel-tap-line-check) |
| Low float level or dirty main jet | Flow good but starves at full throttle | [Clean carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Weak pump or blocked in-tank strainer (injection) | Low pressure at workshop | [Fuel pump check](/moto-zero/repair/repairs/fuel-pump-check) |
| Water in fuel | Layer in jar | [Drain fuel](/moto-zero/repair/repairs/drain-fuel) |
| Coil failing under load or heat | Weak spark when hot | [Coil test](/moto-zero/repair/repairs/ignition-coil-test) |
