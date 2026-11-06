---
id: starts-only-with-choke
title: Starts only with the choke on or the throttle held open
system: starting
also_called: [needs choke all the time, won't idle without choke, must hold throttle, dies when choke off]
urgency: ride-with-care
applies_to: [carburettor, fuel-injected, four-stroke, two-stroke]
parts: [carb, intake_manifold, air_filter, fuel_filter, throttle_body, efi_sensors, choke_cable]
repairs: [intake-leak-test, carburettor-clean, carb-float-check, carb-idle-adjust, fuel-tap-line-check, throttle-body-clean, idle-relearn, efi-sensor-check, efi-code-read]
related: [stalls-at-idle, runs-lean, choke-stuck, hard-cold-start, dirty-throttle-body, stale-fuel]
sources:
  - {doc: "K-Light 125 manual", page: 26}
  - {doc: "K-Light 125 manual", page: 49}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "Unit 2 The Motorcycle", page: 29}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/carbs.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/carb3.htm"}
---

# Starts only with the choke on or the throttle held open

The engine starts and runs only with the choke on, or only if you hold the throttle open. When you push the choke off or let the throttle close, it dies. The choke adds extra fuel, so the engine is getting too little fuel or too much air at idle (a lean mixture). On a carburettor this is usually a blocked pilot (idle) jet after old fuel, or an air leak at the intake rubber. On fuel injection, the cause is usually a dirty throttle body or idle air valve, an air leak, or a sensor fault.

## Is it safe to ride?
With care, for a short way only. An engine that dies when you close the throttle can stop as you slow for a junction. A lean engine also runs hot.

## Quick checks first
- Is the air filter fitted and the air box closed? A missing filter or open box lets in extra air.
- Look at the rubber between the carburettor or throttle body and the engine for cracks and loose clamps.
- Has the bike stood with fuel in it for weeks?
- Is the idle speed screw (carburettor) turned right down?
- Fuel-injected: is the warning light on?
- Try starting with the throttle fully closed. Starter circuits stop working as soon as the throttle opens a little.
- If the engine runs only with the choke on, one or more jets are probably blocked. See [Clear carburettor jets and passages](/moto-zero/repair/repairs/carb-jet-clear) and [Clear a blocked starter circuit](/moto-zero/repair/repairs/choke-circuit-clear).
- An old, hard intake rubber can leak air. A leaking boot makes the idle rise and fall, then die.


## Diagnose it step by step

**1. With the engine running on choke, spray a little water around the intake rubber and its clamps. Does the engine speed change?**
- Yes: there is an air leak. [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test).
- No: go to step 2.

**2. Carburettor: has the bike stood for weeks, or was the fuel old?**
- Yes: the pilot jet is probably blocked. [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean), and drain old fuel ([Old or stale fuel in the tank](/moto-zero/repair/problems/stale-fuel)).
- No: go to step 3.

**3. Carburettor: is the fuel flow from the tap strong and the float level correct?**
- No: [Check the fuel tap, lines and flow](/moto-zero/repair/repairs/fuel-tap-line-check) and [Check the carburettor float and needle valve](/moto-zero/repair/repairs/carb-float-check).
- Yes: go to step 4.

**4. Carburettor: once warm, does it idle if you raise the idle screw a little?**
- Yes: set idle and mixture as your manual describes: [Adjust carburettor idle speed and mixture](/moto-zero/repair/repairs/carb-idle-adjust). If it needs a very high idle to run, the jet is still partly blocked.
- No: clean the carburettor again, including the pilot air passages.

**5. Fuel-injected: is there a fault code?**
- Yes: follow the code. [Read engine fault codes (fuel injection)](/moto-zero/repair/repairs/efi-code-read). Sensor faults: [Check the engine sensors (TPS, MAP, temperature)](/moto-zero/repair/repairs/efi-sensor-check).
- No: go to step 6.

**6. Fuel-injected: is the throttle body dirty inside, or was the battery recently disconnected?**
- Yes: [Clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean), then [Reset the idle after throttle body work](/moto-zero/repair/repairs/idle-relearn). The K-Light 125 manual lists a dirty idle bypass and throttle body for unstable idle (PDF page 276).
- No: have a workshop check the fuel pressure and idle air valve.

Note: on a fuel-injected engine, a high idle when cold is normal. **K-Light 125: the ECU raises idle below 68 °C, and the target warm idle is 1500 ± 100 rpm.**

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Air leak at intake rubber or clamp | Spray test changes idle | [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test) |
| Blocked pilot jet (after storage or old fuel) | Dies when choke goes off | [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Low float level or weak fuel flow | Flow test; float check | [Check the carburettor float and needle valve](/moto-zero/repair/repairs/carb-float-check) |
| Idle set too low | Runs once idle screw raised | [Adjust carburettor idle speed and mixture](/moto-zero/repair/repairs/carb-idle-adjust) |
| Dirty throttle body or idle valve (EFI) | Dirt in bore; after battery disconnect | [Clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean) |
| Sensor fault (EFI) | Fault code | [Check the engine sensors (TPS, MAP, temperature)](/moto-zero/repair/repairs/efi-sensor-check) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Idle speed (warm) | 1500 ± 100 rpm | 49 |
| Fast idle active below | 68 °C engine temperature | 276 |
