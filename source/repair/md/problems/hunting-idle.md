---
id: hunting-idle
title: Idle speed rises and falls on its own
system: running
also_called: [surging idle, idle goes up and down, revs hunt at idle]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [intake_manifold, carb, throttle_body, efi_sensors, o2_sensor, throttle_cable, air_filter]
repairs: [intake-leak-test, throttle-cable-adjust, carb-idle-adjust, carburettor-clean, efi-code-read, throttle-body-clean, idle-relearn, efi-sensor-check, o2-sensor-check]
related: [high-idle, hanging-revs, rough-idle, runs-lean, dirty-throttle-body, stalls-at-idle, surging-cruise]
sources:
  - {doc: "K-Light 125 manual", page: 26}
  - {doc: "K-Light 125 manual", page: 274}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "MAVCC Motorcycle Mechanic", page: 349}
---

# Idle speed rises and falls on its own

At a standstill the engine speed goes up, drops, goes up again, in a slow rhythm. On a carburettor bike this almost always means a lean idle mixture, usually from an air leak or a partly blocked pilot jet. Lean mixtures burn unevenly and cause surging. On a fuel-injected bike the ECU is fighting a false signal: an air leak, a dirty idle passage or a sensor error.

## Is it safe to ride?

Yes, with care. If the idle surges high enough to make the bike creep or the clutch hard to use, fix it before riding in traffic.

## Quick checks first

- Is the engine fully warm? Hunting during warm-up can be normal on injected bikes.
- Does the throttle have free play?
- Is the air filter clean and fitted?
- Is any vacuum pipe on the intake loose or missing its cap?
- Fuel-injected: is the warning light on? Was the battery recently disconnected or the throttle body cleaned?

## Diagnose it step by step

**1. Does it hunt only during the first minutes from cold?**
- Yes, fuel-injected: often normal as the ECU lowers its fast idle. Wait until fully warm.
- No, or it continues when warm: go to step 2.

**2. Spray water at each intake joint and vacuum pipe while idling. Does the hunting stop or change?**
- Yes: you have found an air leak. [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test).
- No: go to step 3.

**3. Is there free play at the throttle, and does idle stay the same when you turn the bars?**
- No: [Adjust throttle free play](/moto-zero/repair/repairs/throttle-cable-adjust).
- Yes: carburettor bikes go to step 4; fuel-injected bikes go to step 5.

**4. Carburettor: does a quarter turn of the pilot screw change the idle?**
- Yes: [set the idle mixture](/moto-zero/repair/repairs/carb-idle-adjust) using the highest-smooth-idle method.
- No effect, or it needs the screw far out: the pilot jet is partly blocked. [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean).

**5. Fuel-injected: is a code stored?**
- Yes: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read). Temperature, MAP or oxygen sensor codes point to [Check the engine sensors](/moto-zero/repair/repairs/efi-sensor-check) or [Check the oxygen sensor](/moto-zero/repair/repairs/o2-sensor-check).
- No: go to step 6.

**6. Fuel-injected: did it start after cleaning or a battery disconnection?**
- Yes: see [Unstable idle after cleaning or battery disconnection](/moto-zero/repair/problems/dirty-throttle-body).
- No: [clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean) and its idle passage. The K-Light 125 manual lists a dirty bypass and wrong valve clearance for unstable idle. Then [reset the idle](/moto-zero/repair/repairs/idle-relearn).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Intake air leak | Water spray changes idle | [Intake leak test](/moto-zero/repair/repairs/intake-leak-test) |
| Lean idle mixture or blocked pilot jet (carburettor) | Pilot screw has little effect | [Clean carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Throttle cable too tight | No free play | [Adjust free play](/moto-zero/repair/repairs/throttle-cable-adjust) |
| Dirty idle passage, idle not relearned (injection) | Black deposits; after cleaning or battery work | [Throttle body](/moto-zero/repair/repairs/throttle-body-clean), [idle reset](/moto-zero/repair/repairs/idle-relearn) |
| Sensor or O2 fault (injection) | Stored code, odd live data | [Sensor check](/moto-zero/repair/repairs/efi-sensor-check) |
