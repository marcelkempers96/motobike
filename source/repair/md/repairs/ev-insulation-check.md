---
id: ev-insulation-check
title: Check high-voltage insulation
level: workshop
time: 30 to 90 min (estimate)
applies_to:
- electric
tools:
- model service manual
- insulation tester rated for the system
- PPE rated for the system
- diagnostic tool
parts:
- traction_battery
- motor
- controller
- charger
- wiring
- dc_dc
consumables: []
fixes:
- ev-insulation-warning
- ev-water-exposure
---

# Check high-voltage insulation

**Workshop job (assessment and hand-off)** · Time: 30 to 90 min (estimate) (estimate)


On most electric vehicles the high-voltage system "floats": neither battery terminal is connected to the frame. Good **insulation** keeps it that way, so touching the frame or the charger is safe. An **insulation fault** is a leak path from the high-voltage system to the frame. Power Systems Design lists causes such as water or condensation, battery leakage, frayed cables, crash damage, faulty connectors and conductive dirt. Some bikes have an insulation monitor that warns the rider; many small bikes do not. This is an **assessment and hand-off**.

## Safety
- An insulation fault can make the frame or other parts dangerous to touch. If the bike shows an insulation or HV warning, do not touch bare metal parts near the battery, motor or controller, and do not charge.
- An insulation tester applies a test voltage that can damage electronics if used at the wrong points, and can shock the user. Only a trained technician should use it, on an isolated system, following the manufacturer's procedure.
- **There is no universal test voltage or pass value.** The manufacturer sets the test voltage, test points and acceptance limit for each part.

## Steps

**What the rider can do:**
1. Stop safely, switch off, and do not charge. Note the exact warning: [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
2. Think back: did the bike go through deep water, get washed with a pressure washer, fall over, or have new accessories fitted?
3. If the bike was in water, follow [Check a bike after water exposure](/moto-zero/repair/repairs/ev-water-check).
4. Arrange recovery to the dealer or fleet workshop. Do not ride it there with an active HV warning.

**What the workshop will do:**
5. Read the stored faults and any insulation monitor value.
6. Isolate the HV system and prove it dead: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
7. Split the system into parts (battery, controller, motor, charger, DC-DC converter, cables) by unplugging at the manufacturer's points.
8. Test each part from its HV terminals to the frame with a rated insulation tester at the manufacturer's test voltage, and compare with the manufacturer's limit. Letrigo notes that any continuity from a motor phase to the motor case means the insulation has failed.
9. Dry, clean or replace the part that fails. Do not dry a battery pack with heat; a wet pack is handled by the battery specialist.
10. Reassemble, re-energise, clear codes and test.

## What to ask for
- Which part failed the insulation test, and what was done.
- Whether water entered the battery.

## Check your work
- No insulation warning after a test ride and a full charge.

## If it did not fix the problem
- Warning returns: the workshop must retest each part; intermittent leaks often come from water that gets in when riding in rain.
- [Insulation or high-voltage warning](/moto-zero/repair/problems/ev-insulation-warning)

## Problems this repair helps with

- [Insulation or high-voltage warning](/moto-zero/repair/problems/ev-insulation-warning)
- [Bike has been in deep water or a flood](/moto-zero/repair/problems/ev-water-exposure)

## Parts for this job

| Part | Buy |
|---|---|
| [Traction battery pack](/moto-zero/repair/parts/traction_battery) | [Find this part](/spare-parts/traction-battery) |
| [Electric motor](/moto-zero/repair/parts/motor) | [Find this part](/spare-parts/motor) |
| [Motor controller](/moto-zero/repair/parts/controller) | [Find this part](/spare-parts/controller) |
| [Charger](/moto-zero/repair/parts/charger) | [Find this part](/spare-parts/charger) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [DC-DC converter](/moto-zero/repair/parts/dc_dc) | [Find this part](/spare-parts/dc-dc) |

## Sources

- [Power Systems Design: Detecting IT power system faults with insulation monitoring](https://www.powersystemsdesign.com/articles/detecting-it-power-system-resistive-and-capacitive-faults-with-insulation-monitoring-technology/22/22720)
- [IMI National Occupational Standard IMIEV04: Isolate and re-energise high voltage systems](https://www.ukstandards.org.uk/en/nos-finder/IMIEV04/isolate-and-re-energise-high-voltage-systems-in-an-electric-vehicle)
- [Letrigo: How to test an e-bike motor](https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor)
