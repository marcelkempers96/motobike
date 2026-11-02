---
id: ev-hall-sensor-check
title: Check motor position (Hall) sensors
level: workshop
time: 30 to 60 min (estimate)
applies_to:
- electric
tools:
- model service manual with pinout
- multimeter
- stand to lift drive wheel
- diagnostic tool if available
parts:
- motor_sensor
- motor
- wiring
- controller
consumables: []
fixes:
- ev-judder
- ev-motor-noise
- ev-ready-no-drive
- ev-error-code
---

# Check motor position (Hall) sensors

**Workshop job (assessment and hand-off)** · Time: 30 to 60 min (estimate) (estimate)


**Hall sensors** are three small magnetic sensors inside the motor. As the magnets pass, each sensor switches on and off. The controller uses these signals to know where the rotor is, so it can switch current to the right phase at the right time. When a sensor, its wire or its pin fails, the motor jerks instead of starting smoothly, stutters at low speed, growls, or only starts once the wheel is already moving (em3ev). This is a **workshop check**.

## Safety
- The Hall cable is low voltage, but it runs next to the high-voltage phase wires. Only trained people should test with the system powered, following the manufacturer's procedure.
- Lift the drive wheel off the ground. Do not command the motor (do not open the throttle) while probing.
- Keep hands away from the wheel and chain or belt.

## Why this is not a home job
- Wire colours, pinouts, supply voltage, signal levels, the switching sequence and the meaning of error codes **differ between motors and controllers** (em3ev). Using values from another bike can give a wrong result or damage the controller.
- A stuck signal does not prove the sensor inside the motor has failed (em3ev). The fault is often the cable or a pin, and the harness must be checked before the motor is opened.

## Steps (workshop)
1. Read the fault history. Many controllers log a Hall or position fault.
2. Power down and inspect the Hall connector and cable: corrosion, pushed-back pins, crushed cable near the axle, rubbed insulation, sharp bends (em3ev).
3. Find the pinout and expected values in the manufacturer's documentation.
4. Power up as the manual says, motor not commanded. Measure the Hall supply against Hall ground and compare with the manual.
5. Turn the wheel slowly by hand in the drive direction and watch each signal switch between low and high. A geared hub may freewheel one way and not turn the rotor (em3ev).
6. A signal stuck high or low on every position points to the sensor, wire or pin. Check the harness end to end before blaming the sensor.
7. If the controller has live data, compare the Hall states it reports with your meter.
8. Repair the harness or connector, or replace the sensor set or motor as the manufacturer allows. Some controllers need a learning or calibration step after a sensor or motor change.
9. Test ride: smooth start from rest, no growl, no code.

## What to ask for
- Which channel failed, and whether it was the sensor, cable or connector.
- Whether a learning step was done after the repair.

## Check your work
- Smooth pull-away from standstill, no judder, and no Hall or position code on a test ride.

## If it did not fix the problem
- [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check): phase faults cause similar symptoms (em3ev).
- [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis)

## Problems this repair helps with

- [Bike judders or jerks when pulling away](/moto-zero/repair/problems/ev-judder)
- [Grinding, clicking or growling from the motor](/moto-zero/repair/problems/ev-motor-noise)
- [Bike shows ready but will not move](/moto-zero/repair/problems/ev-ready-no-drive)
- [Error code or warning on the dashboard](/moto-zero/repair/problems/ev-error-code)

## Parts for this job

| Part | Buy |
|---|---|
| [Motor position sensor](/moto-zero/repair/parts/motor_sensor) | [Find this part](/spare-parts/motor-sensor) |
| [Electric motor](/moto-zero/repair/parts/motor) | [Find this part](/spare-parts/motor) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Motor controller](/moto-zero/repair/parts/controller) | [Find this part](/spare-parts/controller) |

## Sources

- [em3ev: How to test e-bike motor Hall sensors](https://em3ev.com/?p=43276)
- [Letrigo: How to test an e-bike motor](https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor)
