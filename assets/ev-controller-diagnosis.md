---
id: ev-controller-diagnosis
title: Diagnose a controller fault
level: workshop
time: 30 to 60 min first assessment (estimate)
applies_to:
- electric
tools:
- model service manual and diagnostic tool
- rated voltage tester
- PPE rated for the system
parts:
- controller
- contactor
- throttle_sensor
- motor_sensor
- wiring
- fuse
consumables: []
fixes:
- ev-bms-cutoff
- ev-controller-hot
- ev-cuts-out-accel
- ev-error-code
- ev-judder
- ev-limp-mode
- ev-no-ready
- ev-no-regen
- ev-ready-no-drive
- ev-throttle-dropout
- ev-wheel-locked
---

# Diagnose a controller fault

**Workshop job (assessment and hand-off)** · Time: 30 to 60 min first assessment (estimate) (estimate)


The **controller** (sometimes called the inverter) is the box that takes DC from the battery and feeds the motor in timed pulses. It reads the throttle, brakes, stand switch and Hall sensors, and protects itself and the motor by cutting or reducing power when something is wrong. Many controller "faults" are really a sensor, a switch, a connector or heat. This page is an **assessment and hand-off**.

## Safety
- The controller holds charged capacitors and connects to the battery and motor phases. Do not open it or unplug its power cables. Isolation is workshop work: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
- A burning smell from the controller is a serious warning (Letrigo). Switch off and stop riding.
- Do not fit a "universal" controller from another bike. Wrong settings can overheat the motor or battery and remove safety cut-outs.

## Steps

**What the rider can check:**
1. Record the code and when it happens: [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
2. Check the interlocks first: [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check).
3. Check the controller's air flow: is it covered by mud, a bag, or a new panel? Upway lists sustained load, poor air flow and high air temperature as the main causes of controller heat. See [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check).
4. Note whether the problem comes after long climbs, heavy loads or hot days and goes away after a rest. That pattern points to heat protection, not a broken controller.
5. Look (do not touch) for melted connectors, burnt marks or water near the controller.
6. Hand the bike to the dealer or fleet workshop.

**What the workshop will do:**
7. Read the full fault history and live data (throttle signal, temperatures, battery voltage, Hall states) with the manufacturer's tool.
8. Check the low-voltage supply and fuses to the controller.
9. Check throttle sensor, brake and stand inputs against the manufacturer's values. There is no universal throttle voltage.
10. Isolate the HV system and inspect the power connectors and phase connectors: [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check).
11. Check the main contactor and pre-charge circuit (the circuit that charges the controller's capacitors gently before the contactor closes) using the manual's method.
12. Separate controller from motor faults: [Check motor position (Hall) sensors](/moto-zero/repair/repairs/ev-hall-sensor-check) and [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis).
13. Replace the controller only with the correct part, with matching software and settings, and test ride.

## What to ask for
- The code list, live data that proved the fault, and whether software was updated.
- Whether the controller or the motor was at fault.

## Check your work
- No code, full power, and normal temperature over a test ride with a climb.

## If it did not fix the problem
- Overheating returns: [Controller overheats or shuts down](/moto-zero/repair/problems/ev-controller-hot).
- Battery cuts out rather than the controller: [Battery shuts off suddenly (BMS protection)](/moto-zero/repair/problems/ev-bms-cutoff).

## Problems this repair helps with

- [Battery shuts off suddenly (BMS protection)](/moto-zero/repair/problems/ev-bms-cutoff)
- [Controller overheats or shuts down](/moto-zero/repair/problems/ev-controller-hot)
- [Power cuts out when accelerating hard](/moto-zero/repair/problems/ev-cuts-out-accel)
- [Error code or warning on the dashboard](/moto-zero/repair/problems/ev-error-code)
- [Bike judders or jerks when pulling away](/moto-zero/repair/problems/ev-judder)
- [Bike is in reduced power or limp mode](/moto-zero/repair/problems/ev-limp-mode)
- [Dashboard is on but the bike will not go to ready](/moto-zero/repair/problems/ev-no-ready)
- [Regenerative braking does not work](/moto-zero/repair/problems/ev-no-regen)
- [Bike shows ready but will not move](/moto-zero/repair/problems/ev-ready-no-drive)
- [Power cuts in and out with the throttle](/moto-zero/repair/problems/ev-throttle-dropout)
- [Rear wheel is locked or very hard to push](/moto-zero/repair/problems/ev-wheel-locked)

## Parts for this job

| Part | Buy |
|---|---|
| [Motor controller](/moto-zero/repair/parts/controller) | [Find this part](/spare-parts/controller) |
| [Main contactor and pre-charge](/moto-zero/repair/parts/contactor) | [Find this part](/spare-parts/contactor) |
| [Electric throttle sensor](/moto-zero/repair/parts/throttle_sensor) | [Find this part](/spare-parts/throttle-sensor) |
| [Motor position sensor](/moto-zero/repair/parts/motor_sensor) | [Find this part](/spare-parts/motor-sensor) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |

## Sources

- [Upway: Electric bike overheating causes and fixes](https://upway.co/blogs/news/electric-bike-overheating-causes-and-fixes)
- [Letrigo: How to test an e-bike motor](https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor)
- [IMI National Occupational Standard IMIEV04: Isolate and re-energise high voltage systems](https://www.ukstandards.org.uk/en/nos-finder/IMIEV04/isolate-and-re-energise-high-voltage-systems-in-an-electric-vehicle)
