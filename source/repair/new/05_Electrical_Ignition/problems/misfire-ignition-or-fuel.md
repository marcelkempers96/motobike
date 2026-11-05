---
id: misfire-ignition-or-fuel
title: "Misfire: ignition or fuel?"
system: running
also_called: [engine missing, stutters, cuts under load, coughs and splutters]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [spark_plug, ignition_coil, carb, injector, fuel_filter, air_filter]
repairs: [misfire-light-test, spark-plug-service, ignition-coil-test, carburettor-clean, fuel-tap-line-check]
related: [misfire-under-load, misfire-high-rpm, hesitation, flat-spot, cuts-out-random]
sources:
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/cdiignition.htm"}
photos: [{file: "source/dansmc/05_Electrical_Ignition/090/090_plug_caps.jpg", caption: "Plug cap fitted with a light"}, {file: "source/dansmc/05_Electrical_Ignition/090/090_ignition_test.jpg", caption: "Watching the spark with a tester"}]
---

# Misfire: ignition or fuel?

The engine misses, stutters or loses power at some speed or load. A fuel fault (lean or rich mixture) and an ignition fault (no spark at some moments) feel the same on the road. Finding which one it is saves parts and time, because the repair is completely different.

## Is it safe to ride?
A mild miss can be ridden slowly to a workshop. Stop if the engine stalls in traffic or smells strongly of fuel.

## Quick checks first
- Does it happen cold, hot, or both?
- Does it happen at one throttle opening or rev range?
- Is the plug cap pushed on firmly and the plug clean?
- Is there enough fuel, and is the tap on?

## Diagnose it step by step

**1. Does the miss happen in the same place every time (a certain speed or load)?**
- Yes: note it and go to step 2.
- No, random: check the connections: [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random).

**2. Clean and check the plug.**
- Remove it, look at it, set the gap and refit: [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service). A fouled or worn plug causes many misfires.
- Still misses: go to step 3.

**3. See the spark during the miss.**
- Use a timing light on the plug lead, taped where you can see it, and ride to the fault: [Tell an ignition misfire from a fuel misfire with a timing light](/moto-zero/repair/repairs/misfire-light-test).
- Flash stays bright and steady at the miss: spark is fine, so the fault is fuel or air. Go to step 4.
- Flash drops out at the miss: the fault is ignition. Go to step 5.

**4. Fuel and air fault.**
- Carburettor: [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean), [Check the fuel tap, lines and flow](/moto-zero/repair/repairs/fuel-tap-line-check), [Clean or replace the air filter](/moto-zero/repair/repairs/air-filter-service).
- Fuel injection: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read) and [Check the fuel injector](/moto-zero/repair/repairs/injector-check).

**5. Ignition fault.**
- [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test), then [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test).
- Old bike with points: [Points ignition runs rough or misses](/moto-zero/repair/problems/points-wear-misfire).
- Misses only when hot, then returns when cool: [Ignition cuts out when hot](/moto-zero/repair/problems/coil-fails-hot).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Worn or fouled plug | Plug looks wrong, or the gap is wide | [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service) |
| Blocked carb jet or dirty fuel | Light stays steady at the miss | [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Weak coil or plug cap | Light drops at the miss | [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test) |
| Pick-up or CDI fault | Light drops, coil tests ok | [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test) |
