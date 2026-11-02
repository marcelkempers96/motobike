---
id: high-idle
title: Idle speed is too high
system: running
also_called: [fast idle, idles too fast, revs high at standstill]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected, semi-auto, scooter-cvt]
parts: [throttle_cable, carb, throttle_body, intake_manifold, choke_cable, efi_sensors, valves]
repairs: [throttle-cable-adjust, choke-check, carb-idle-adjust, intake-leak-test, throttle-body-clean, idle-relearn, efi-code-read, valve-clearance, engine-internal-assessment]
related: [hanging-revs, hunting-idle, throttle-sticks, throttle-free-play, choke-stuck, runs-lean, cvt-creeps, hard-gear-change]
sources:
  - {doc: "K-Light 125 manual", page: 26}
  - {doc: "K-Light 125 manual", page: 49}
  - {doc: "K-Light 125 manual", page: 55}
  - {doc: "K-Light 125 manual", page: 258}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "MAVCC Motorcycle Mechanic", page: 659}
---

# Idle speed is too high

The engine idles faster than normal when warm. It wastes fuel, makes gear changes clunky, and on scooters and step-throughs the bike may creep forward at a stop. The engine is getting more air than it should at closed throttle: the throttle is not closing, the choke is on, the idle is set too high, or air is leaking in.

## Is it safe to ride?

With care, as long as the throttle snaps shut when you let go. If the throttle sticks open, **do not ride**: see [Throttle sticks](/moto-zero/repair/problems/throttle-sticks).

## Quick checks first

- Is the engine fully warm? A fast idle when cold is normal.
- Is the choke lever or knob fully off?
- Let go of the throttle: does it snap shut by itself?
- Turn the bars fully left and right at idle: does the idle rise?
- Fuel-injected: is the warning light on?

## Diagnose it step by step

**1. Is the engine fully warm?**
- No: wait. A carburettor with choke, or the ECU on an injected bike, idles fast when cold (K-Light 125: until 68 °C).
- Yes: go to step 2.

**2. Is the choke fully off, and does the idle drop when you work the choke lever back and forth?**
- Choke stuck partly on: [Check the choke or starter valve](/moto-zero/repair/repairs/choke-check).
- Choke fine or none fitted: go to step 3.

**3. Does the throttle have free play and snap shut, with no change in idle when you turn the bars?**
- No free play, or idle rises when you turn the bars: the cable is too tight or badly routed. [Adjust throttle free play](/moto-zero/repair/repairs/throttle-cable-adjust) (K-Light 125: 3 to 5 mm).
- Throttle slow to close: go to [Throttle sticks](/moto-zero/repair/problems/throttle-sticks).
- All fine: go to step 4.

**4. Does the idle change when you spray water on the intake rubber and vacuum pipes?**
- Yes: air leak. [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test).
- No: go to step 5.

**5. Carburettor bikes: has someone turned the idle screw up?**
- Set it correctly when warm: [Adjust carburettor idle speed and mixture](/moto-zero/repair/repairs/carb-idle-adjust).
- Fuel-injected: do not turn the idle screw. Go to step 6.

**6. Fuel-injected: is a code stored?**
- Yes: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read). Temperature sensor or idle motor codes are common causes.
- No: [clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean) and [reset the idle](/moto-zero/repair/repairs/idle-relearn). The K-Light 125 manual also lists a leaking idle stepper motor and too large an exhaust valve clearance: [check valve clearance](/moto-zero/repair/repairs/valve-clearance).

**7. Two-strokes: high idle that hangs, with everything above correct?**
- A worn crankshaft seal can let air into the crankcase. It can lead to seizure. Workshop: [Assess bottom end and internal engine damage](/moto-zero/repair/repairs/engine-internal-assessment).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Engine not yet warm | Idle drops as it warms | None needed |
| Choke partly on | Idle drops when choke is pushed fully off | [Choke check](/moto-zero/repair/repairs/choke-check) |
| Throttle cable too tight or misrouted | No free play; idle rises with steering | [Adjust free play](/moto-zero/repair/repairs/throttle-cable-adjust) |
| Air leak | Water spray changes idle | [Intake leak test](/moto-zero/repair/repairs/intake-leak-test) |
| Idle screw set too high (carburettor) | Warm idle above manual figure | [Adjust idle](/moto-zero/repair/repairs/carb-idle-adjust) |
| Idle control or throttle body fault (injection) | Code, dirty bypass | [Throttle body](/moto-zero/repair/repairs/throttle-body-clean) |

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Idle speed, warm | 1500 ± 100 rpm | 49 |
| Throttle free play | 3 to 5 mm | 55 |
| ECU fast idle | Below 68 °C | 276 |
