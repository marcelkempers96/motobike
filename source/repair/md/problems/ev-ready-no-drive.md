---
id: ev-ready-no-drive
title: Bike shows ready but will not move
system: ev-drive
also_called: [ready but no power, motor won't turn, throttle does nothing]
urgency: do-not-ride
applies_to: [electric]
parts: [throttle_sensor, brake_light_switch, interlock_switches, controller, motor, motor_sensor, wiring, rear_brake]
repairs: [ev-interlock-check, ev-error-read, ev-hub-motor-check, ev-controller-diagnosis, ev-motor-diagnosis, ev-hall-sensor-check, brake-switch-test]
related: [ev-no-ready, ev-wheel-locked, ev-error-code, ev-judder, brake-drag, brake-light-stuck-on, chain-snapped]
sources:
  - {doc: "em3ev: How to test e-bike motor Hall sensors", url: "https://em3ev.com/?p=43276"}
  - {doc: "Letrigo: How to test an e-bike motor", url: "https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor"}
---

# Bike shows ready but will not move

The dash shows ready, but when you open the throttle nothing happens, or the motor hums without turning the wheel. The controller is awake but is not sending power to the motor. Often a brake switch stuck on, a throttle signal fault, or a protection mode is blocking drive. Less often the motor, its sensors, the chain or belt, or the controller is at fault.

## Is it safe to ride?
No. A bike that suddenly starts driving when a loose wire touches can jump forward. Switch off before checking anything near the wheel.

## Quick checks first
- Let go of both brakes fully. Check the brake light goes off.
- Is a riding mode selected (not park, neutral or reverse)?
- Is the throttle grip turning the sensor, or does it spin loosely?
- Any warning symbol or code?
- On a chain or belt bike, is the chain or belt in place?

## Diagnose it step by step

**1. Does the brake light stay on with both brakes released?**
- Yes: a brake switch is stuck on, and many controllers cut drive while braking. See [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test) and [Brake light stays on](/moto-zero/repair/problems/brake-light-stuck-on).
- No: go to step 2.

**2. Is there a fault code?**
- Yes: [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read) and follow the manual for that code. Throttle, Hall, motor and controller codes go to the workshop.
- No: go to step 3.

**3. With the bike off and on its stand, does the drive wheel turn freely by hand?**
- No, very hard or locked: go to [Rear wheel is locked or very hard to push](/moto-zero/repair/problems/ev-wheel-locked).
- Yes: go to step 4.

**4. With the wheel off the ground and the bike in ready, does the motor hum, click or jerk when you open the throttle a little?**
- Hum or jerk with no turning: the controller is trying but the motor cannot find its position. Likely a Hall sensor, phase connector or cable fault (em3ev). Workshop: [Check motor position (Hall) sensors](/moto-zero/repair/repairs/ev-hall-sensor-check).
- Motor turns but the wheel does not (chain or belt drive): the chain, belt or sprocket has failed. See [Chain has snapped](/moto-zero/repair/problems/chain-snapped).
- No sound at all: go to step 5.

**5. Does the throttle feel normal, and do the stand and kill switch symbols change correctly?**
- No: [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check).
- Yes: the throttle sensor, its wiring or the controller is likely at fault. Hand to the workshop: [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).

**6. Is there a burning smell from the motor or controller?**
- Yes: switch off and do not try again. A sharp burning smell is a serious warning (Letrigo). Workshop: [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Brake switch stuck on | Brake light on with levers released | [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test) |
| Wrong mode or protection mode | Mode symbol, code | Follow the manual |
| Throttle sensor or wiring | Throttle feels loose; code | [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check) |
| Wheel or brake locked | Wheel hard to turn by hand | [Check hub motor bearings and play](/moto-zero/repair/repairs/ev-hub-motor-check) |
| Hall sensor or phase fault | Motor hums or jerks | [Check motor position (Hall) sensors](/moto-zero/repair/repairs/ev-hall-sensor-check) |
| Controller fault | All else good | [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis) |
