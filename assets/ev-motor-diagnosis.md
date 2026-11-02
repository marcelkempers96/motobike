---
id: ev-motor-diagnosis
title: Diagnose a motor fault
level: workshop
time: 30 to 60 min first assessment (estimate)
applies_to:
- electric
tools:
- model service manual and diagnostic tool
- voltage tester and insulation tester rated for the system
- wheel stand
parts:
- motor
- motor_sensor
- controller
- wiring
- wheel_bearing
- rear_wheel
consumables: []
fixes:
- ev-error-code
- ev-judder
- ev-limp-mode
- ev-motor-hot
- ev-motor-noise
- ev-ready-no-drive
- ev-water-exposure
- ev-wheel-locked
---

# Diagnose a motor fault

**Workshop job (assessment and hand-off)** · Time: 30 to 60 min first assessment (estimate) (estimate)


Most commuter electric motorcycles use a **hub motor** (the motor is inside the rear wheel) or a **mid-drive motor** (the motor sits in the frame and drives the wheel by chain or belt). The motor has three thick **phase wires** from the controller and a thin cable for the **Hall sensors** (small sensors that tell the controller where the magnets are) and often a temperature sensor. This page is an **assessment and hand-off**: what a rider can check safely, and what the workshop will do.

## Safety
- Motor phase wires carry high voltage and large current. Do not unplug them, cut them or measure them with the bike powered. See [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
- A sharp burning smell from the motor or controller is a serious warning (Letrigo). Stop riding and switch off.
- Do not open a hub motor at home. Strong magnets can trap fingers and the parts are hard to refit.

## You need (rider)
- A safe place, a stand, a phone to record the noise and the dash code.

## Steps

**What the rider can check:**
1. Note exactly what happens: judder at pull-away, noise, loss of power, wheel hard to turn, heat. Note any code: [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
2. With the bike off and on its stand, spin the drive wheel by hand. Feel for rough spots, scraping or a wheel that is very hard to turn. See [Check hub motor bearings and play](/moto-zero/repair/repairs/ev-hub-motor-check).
3. Check that the brake is not dragging: [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check). On a mid-drive, check the chain or belt: [Check and adjust chain slack](/moto-zero/repair/repairs/chain-adjust).
4. Look (do not touch) at the motor cable where it leaves the axle: crushed, cut, rubbed through, or melted. Damage here is common after a fall or a loose axle.
5. Hand the bike to the dealer or fleet workshop with your notes.

**What the workshop will do:**
6. Read the full fault history with the manufacturer's tool.
7. Isolate the HV system following the manufacturer's procedure.
8. Inspect and test the phase connectors: [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check).
9. Test the Hall sensors and their wiring: [Check motor position (Hall) sensors](/moto-zero/repair/repairs/ev-hall-sensor-check).
10. Measure the windings and insulation with rated equipment and compare with the **manufacturer's** values: [Check high-voltage insulation](/moto-zero/repair/repairs/ev-insulation-check). There is no universal phase resistance or test voltage.
11. Check the bearings, axle and seals. If needed, replace bearings or the motor as a unit.

## What to ask for
- The fault codes found and their meaning for your model.
- Whether the fault is in the motor, the cable, the connectors or the controller, and how they proved it.
- Whether water got into the motor.

## Check your work
- Smooth pull-away, no noise, no code over a full test ride.

## If it did not fix the problem
- Motor tests good: [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).
- Motor hot on climbs: [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check).

## Problems this repair helps with

- [Error code or warning on the dashboard](/moto-zero/repair/problems/ev-error-code)
- [Bike judders or jerks when pulling away](/moto-zero/repair/problems/ev-judder)
- [Bike is in reduced power or limp mode](/moto-zero/repair/problems/ev-limp-mode)
- [Motor gets very hot or power drops after a long climb](/moto-zero/repair/problems/ev-motor-hot)
- [Grinding, clicking or growling from the motor](/moto-zero/repair/problems/ev-motor-noise)
- [Bike shows ready but will not move](/moto-zero/repair/problems/ev-ready-no-drive)
- [Bike has been in deep water or a flood](/moto-zero/repair/problems/ev-water-exposure)
- [Rear wheel is locked or very hard to push](/moto-zero/repair/problems/ev-wheel-locked)

## Parts for this job

| Part | Buy |
|---|---|
| [Electric motor](/moto-zero/repair/parts/motor) | [Find this part](/spare-parts/motor) |
| [Motor position sensor](/moto-zero/repair/parts/motor_sensor) | [Find this part](/spare-parts/motor-sensor) |
| [Motor controller](/moto-zero/repair/parts/controller) | [Find this part](/spare-parts/controller) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Wheel bearings](/moto-zero/repair/parts/wheel_bearing) | [Find this part](/spare-parts/wheel-bearing) |
| [Rear wheel](/moto-zero/repair/parts/rear_wheel) | [Find this part](/spare-parts/rear-wheel) |

## Sources

- [em3ev: How to test e-bike motor Hall sensors](https://em3ev.com/?p=43276)
- [Letrigo: How to test an e-bike motor](https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor)
- [IMI National Occupational Standard IMIEV04: Isolate and re-energise high voltage systems](https://www.ukstandards.org.uk/en/nos-finder/IMIEV04/isolate-and-re-energise-high-voltage-systems-in-an-electric-vehicle)
