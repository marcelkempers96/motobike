---
id: starts-then-dies
title: Engine starts, then dies after a few seconds
system: starting
also_called: [starts and stalls, fires then cuts, runs a few seconds then stops, won't keep running]
urgency: do-not-ride
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [fuel_cap, fuel_tap, fuel_filter, carb, fuel_pump, throttle_body, intake_manifold, interlock_switches, efi_sensors]
repairs: [tank-vent-check, fuel-tap-line-check, choke-check, carburettor-clean, carb-float-check, fuel-pump-check, efi-code-read, throttle-body-clean, intake-leak-test, interlock-switch-test]
related: [tank-vacuum, stalls-at-idle, dies-side-stand, fuel-starvation, starts-only-with-choke, dirty-throttle-body, carb-no-fuel]
sources:
  - {doc: "K-Light 125 manual", page: 21}
  - {doc: "K-Light 125 manual", page: 26}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "MAVCC Motorcycle Mechanic", page: 264}
---

# Engine starts, then dies after a few seconds

The engine fires and runs for a moment, then stops. It can start, so the spark and compression are probably fine. The usual causes are fuel that runs out after the first burst (blocked tap, filter or tank vent, a float bowl that does not refill), an idle circuit that is blocked so the engine cannot run without throttle, an air leak, or a safety switch that stops the engine. The K-Light 125 fault chart lists a blocked throttle passage for "dies after a short run" (PDF page 21).

## Is it safe to ride?
No. An engine that may stop at any moment is dangerous in traffic.

## Quick checks first
- Is the side stand up? Is the bike in neutral? Many bikes stop if you engage a gear with the stand down.
- Carburettor: is the fuel tap ON? Try RES.
- Open the fuel cap: do you hear a hiss of air rushing in?
- Does it keep running if you hold the throttle a little open, or with the choke ON?
- Fuel-injected: is the engine warning light on?

## Diagnose it step by step

**1. Does it die only when you select a gear or move the side stand?**
- Yes: a safety switch is working or faulty. See [Engine dies when the side stand moves or the bike is put in gear](/moto-zero/repair/problems/dies-side-stand) and [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test).
- No: go to step 2.

**2. Does it keep running with the fuel cap open?**
- Yes: the tank vent is blocked and a vacuum stops the fuel. [Check the fuel tank vent](/moto-zero/repair/repairs/tank-vent-check).
- No: go to step 3.

**3. Carburettor: does fuel flow freely from the tap when you pull the hose off (into a container)?**
- No or only a trickle: [Check the fuel tap, lines and flow](/moto-zero/repair/repairs/fuel-tap-line-check). Vacuum taps need engine vacuum or the PRIME position.
- Yes: go to step 4.

**4. Does it keep running with the choke ON or the throttle held slightly open, and die when you let go?**
- Yes: the idle circuit is blocked or the idle is set too low. Carburettor: [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean). Fuel-injected: [Clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean). See also [Starts only with the choke on or the throttle held open](/moto-zero/repair/problems/starts-only-with-choke).
- No: go to step 5.

**5. Fuel-injected: is there a fault code, or does the pump stop running?**
- Yes: [Read engine fault codes (fuel injection)](/moto-zero/repair/repairs/efi-code-read) and [Check the fuel pump (fuel injection)](/moto-zero/repair/repairs/fuel-pump-check).
- No: go to step 6.

**6. Spray a little water (not fuel) around the intake rubber with the engine running. Does the idle change?**
- Yes: an air leak. [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test).
- No: check the float level and needle valve, a float bowl that does not refill dries out in seconds: [Check the carburettor float and needle valve](/moto-zero/repair/repairs/carb-float-check). If the bike has an immobiliser and runs for only a moment, the key may not be recognised: that needs the dealer.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Side stand or gear interlock | Dies only with stand down in gear | [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test) |
| Blocked tank vent | Runs with cap open; hiss on opening | [Check the fuel tank vent](/moto-zero/repair/repairs/tank-vent-check) |
| Tap or filter blocked | Weak flow from tap | [Check the fuel tap, lines and flow](/moto-zero/repair/repairs/fuel-tap-line-check) |
| Blocked idle jet or dirty throttle body | Runs only with choke or throttle | [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Air leak at intake | Idle changes when you spray water | [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test) |
| Fuel pump or sensor fault (EFI) | Warning light; code stored | [Read engine fault codes (fuel injection)](/moto-zero/repair/repairs/efi-code-read) |
