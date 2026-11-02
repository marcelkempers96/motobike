---
id: hanging-revs
title: Revs hang or drop slowly after closing the throttle
system: running
also_called: [slow return to idle, revs stay up, engine hangs on revs]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [throttle_cable, carb, throttle_body, intake_manifold, choke_cable, efi_sensors]
repairs: [throttle-cable-adjust, throttle-cable-service, intake-leak-test, choke-check, carb-idle-adjust, carburettor-clean, throttle-body-clean, idle-relearn, efi-code-read, engine-internal-assessment]
related: [throttle-sticks, throttle-free-play, high-idle, hunting-idle, runs-lean, exhaust-popping]
sources:
  - {doc: "K-Light 125 manual", page: 26}
  - {doc: "K-Light 125 manual", page: 55}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "MAVCC Motorcycle Mechanic", page: 349}
  - {doc: "MAVCC Motorcycle Mechanic", page: 374}
---

# Revs hang or drop slowly after closing the throttle

You blip the throttle or pull in the clutch, and the engine speed stays up for a few seconds before it slowly falls to idle. It makes slowing down and gear changes harder. Either the throttle is not closing fully and quickly, or the engine is running lean (too much air) at closed throttle, so it keeps burning and holds speed.

## Is it safe to ride?

Only if the throttle grip snaps shut by itself in every steering position. If the grip is slow to return or sticks, **do not ride**: a stuck throttle can cause a crash.

## Quick checks first

- Twist the grip open and let go with the bars straight, full left and full right. Does it snap shut every time?
- Is there a little free play at the grip?
- Is the choke fully off?
- Does the exhaust pop when you close the throttle?

## Diagnose it step by step

**1. Does the grip snap shut by itself in all steering positions?**
- No: stop riding. Go to [Throttle sticks or does not snap shut](/moto-zero/repair/problems/throttle-sticks) and [lubricate or replace the throttle cable](/moto-zero/repair/repairs/throttle-cable-service).
- Yes: go to step 2.

**2. Is there free play at the grip (K-Light 125: 3 to 5 mm) and no rise in idle when you turn the bars?**
- No: [Adjust throttle free play](/moto-zero/repair/repairs/throttle-cable-adjust).
- Yes: go to step 3.

**3. Is the choke fully off and the idle normal?**
- Choke stuck or idle high: [Check the choke](/moto-zero/repair/repairs/choke-check), then see [Idle speed is too high](/moto-zero/repair/problems/high-idle).
- Fine: go to step 4.

**4. Do the revs drop normally when you spray water on the intake joints and vacuum pipes?**
- Revs change during the spray: air leak. [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test).
- No change: go to step 5.

**5. Carburettor bikes: watch the slide or throttle linkage with the air filter cover off (engine off). Does it close fully and quickly?**
- Slow or sticky: varnish or wear in the bore. [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean).
- Closes well: the idle mixture may be lean. [Adjust idle speed and mixture](/moto-zero/repair/repairs/carb-idle-adjust).

**6. Fuel-injected bikes: is a code stored, or is the throttle body dirty?**
- Code: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read).
- No code: [Clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean), then [reset the idle](/moto-zero/repair/repairs/idle-relearn).

**7. Two-strokes with all of the above correct:**
- A leaking crankshaft seal can cause hanging revs and then seizure. Workshop: [Assess bottom end and internal engine damage](/moto-zero/repair/repairs/engine-internal-assessment).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Throttle cable dry, kinked or too tight | Slow grip return, no free play | [Cable service](/moto-zero/repair/repairs/throttle-cable-service), [free play](/moto-zero/repair/repairs/throttle-cable-adjust) |
| Choke partly on | Revs fall when choke pushed fully off | [Choke check](/moto-zero/repair/repairs/choke-check) |
| Intake air leak | Water spray changes revs | [Intake leak test](/moto-zero/repair/repairs/intake-leak-test) |
| Sticky slide or lean idle mixture | Slide slow to drop; popping on overrun | [Clean carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Dirty throttle body or idle control (injection) | Black deposits, idle codes | [Throttle body](/moto-zero/repair/repairs/throttle-body-clean) |

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Throttle free play | 3 to 5 mm | 55 |
