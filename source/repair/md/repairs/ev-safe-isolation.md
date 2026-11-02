---
id: ev-safe-isolation
title: Make an electric motorcycle safe to work on
level: workshop
time: 10 to 20 min for the rider steps; workshop isolation time depends on the model (estimate)
applies_to:
- electric
tools:
- model service manual
- insulated gloves and tools rated for the pack voltage
- voltage tester rated for the pack voltage
- lock or tag for the key and pack
parts:
- traction_battery
- contactor
- controller
- charger
- aux_battery
consumables: []
fixes:
- ev-insulation-warning
- ev-pack-damaged
- ev-pack-hot-smell
- ev-water-exposure
- ev-wheel-locked
---

# Make an electric motorcycle safe to work on

**Workshop job (assessment and hand-off)** · Time: 10 to 20 min for the rider steps; workshop isolation time depends on the model (estimate) (estimate)


Before anyone touches the motor, controller, phase cables or the inside of the battery area, the high-voltage system must be switched off, disconnected and proven dead. This page explains what a rider or fundi can do safely, and what a trained technician does in the workshop. Isolating the high-voltage system itself is **workshop work**.

## Safety
- **High voltage** (HV) means the big battery circuit. UNECE rules, used in the IMI standard, call more than **60 V DC** high voltage. Many commuter packs are close to this or above it; for example the Super Soco CPx Pro is listed with a **60 V** battery. Check the label on your pack.
- Even a lower-voltage pack can push very large currents. A spanner across two terminals can melt, spark and burn you.
- Capacitors in the controller can stay charged after the key is off. Waiting a few minutes never proves the circuit is dead. Only a test with the right meter, at the points the manufacturer names, proves it.
- If the pack is dented, swollen, wet, hot, hissing or smells, do not isolate it yourself. Follow [Handle a damaged battery pack](/moto-zero/repair/repairs/ev-damaged-pack).
- Training in first response does not make you competent to repair HV parts (IMI EV02). Work only within your training.

## You need
- The service manual for your exact model, with its isolation steps, test points and the voltage it accepts as "safe".
- Gloves, tools and a voltage tester rated for the pack voltage. A cheap multimeter with worn leads is not enough.
- A way to stop someone switching the bike back on: take the key, tag the bike, keep the removed battery with you.

## Steps

**Rider or fundi (no tools needed):**
1. Park on level ground on the centre stand or a stable stand. A falling bike can crush a hand.
2. Unplug the charger from the wall first, then from the bike.
3. Turn the key or power button off. Put the key in your pocket.
4. On a swap-battery bike, remove the battery as the operator shows you and put it on a dry, non-flammable surface away from metal objects. Do not touch the battery contacts.
5. If the battery is fixed inside the frame, stop here. Tell the workshop or fleet support line what you have done.

**Workshop (trained technician only):**
6. Tell everyone nearby that HV work is starting and mark off the work area.
7. Put on the PPE the manufacturer requires and check the tester on a known source before use.
8. Follow the manufacturer's isolation steps in order: this may include a service disconnect, a fuse, a main switch or unplugging the pack connector.
9. Wait the time the manual gives, then test at the named points. Confirm the reading is below the manufacturer's limit.
10. Test the tester again on a known source, so you know it did not fail during the test.
11. Lock or tag the isolation point and keep the key or service plug with you.
12. When the job is done, re-energise using the manufacturer's steps and test that the system works before the bike goes back to the rider. Write down what was done.

## Check your work
- The key and any removed battery or service plug are with the person doing the work.
- The tester proved the circuit dead at the manufacturer's points, and the tester itself was proven working before and after.
- A written note says who isolated the bike and when.

## If it did not fix the problem
- Isolation is a safety step, not a repair. Go back to the problem you were diagnosing, for example [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis) or [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).
- If the bike shows an insulation warning, see [Insulation or high-voltage warning](/moto-zero/repair/problems/ev-insulation-warning).

## Reference values

| Item | Value | Source |
|---|---|---|
| High-voltage threshold (UNECE definition) | more than 60 V DC or 30 V AC | IMI EV02 |
| Example commuter pack | Super Soco CPx Pro: 60 V | Super Soco CPx Pro specification sheet |

## Problems this repair helps with

- [Insulation or high-voltage warning](/moto-zero/repair/problems/ev-insulation-warning)
- [Battery pack is dropped, dented, swollen or wet](/moto-zero/repair/problems/ev-pack-damaged)
- [Battery pack is hot, hissing or smells](/moto-zero/repair/problems/ev-pack-hot-smell)
- [Bike has been in deep water or a flood](/moto-zero/repair/problems/ev-water-exposure)
- [Rear wheel is locked or very hard to push](/moto-zero/repair/problems/ev-wheel-locked)

## Parts for this job

| Part | Buy |
|---|---|
| [Traction battery pack](/moto-zero/repair/parts/traction_battery) | [Find this part](/spare-parts/traction-battery) |
| [Main contactor and pre-charge](/moto-zero/repair/parts/contactor) | [Find this part](/spare-parts/contactor) |
| [Motor controller](/moto-zero/repair/parts/controller) | [Find this part](/spare-parts/controller) |
| [Charger](/moto-zero/repair/parts/charger) | [Find this part](/spare-parts/charger) |
| [12 V auxiliary battery (electric)](/moto-zero/repair/parts/aux_battery) | [Find this part](/spare-parts/aux-battery) |

## Sources

- [IMI National Occupational Standard IMIEV04: Isolate and re-energise high voltage systems](https://www.ukstandards.org.uk/en/nos-finder/IMIEV04/isolate-and-re-energise-high-voltage-systems-in-an-electric-vehicle)
- [IMI National Occupational Standard IMIEV02: First response to a damaged electric vehicle](https://www.ukstandards.org.uk/en/nos-finder/IMIEV02/provide-a-first-response-to-a-broken-down-or-damaged-electric-vehicle)
- [Super Soco CPx Pro specification sheet](https://en.vmotosoco.com/wp-content/uploads/2023/04/CPXPRO_SuperSoco_20230426.pdf)
- [Gogoro Smart Battery and GoStation safety information](https://gogoro.com/product-information)
