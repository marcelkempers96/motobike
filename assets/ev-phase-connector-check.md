---
id: ev-phase-connector-check
title: Check motor phase connectors
level: workshop
time: 20 to 40 min after isolation (estimate)
applies_to:
- electric
tools:
- model service manual
- PPE and voltage tester rated for the system
- torch
parts:
- wiring
- motor
- controller
consumables:
- manufacturer-approved connector seal or grease
fixes:
- ev-controller-hot
- ev-cuts-out-accel
- ev-judder
- ev-motor-hot
- ev-throttle-dropout
---

# Check motor phase connectors

**Workshop job (assessment and hand-off)** · Time: 20 to 40 min after isolation (estimate) (estimate)


The three **phase wires** carry the main motor current from the controller to the motor. Their connectors carry large currents. A loose, corroded or pushed-back pin heats up, can melt, and causes judder, cut-outs and loss of power. em3ev notes that loose phase connections can look like a Hall sensor fault. This is an **assessment and hand-off**: the rider looks, the workshop opens.

## Safety
- Phase wires are part of the high-voltage system. Do not unplug, cut or probe them unless you are trained and the system has been isolated and proven dead: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
- Never join phase wires with tape, twisted wires or household connectors. They will overheat.
- Melted connectors or heat damage are a reason to stop and get qualified help (em3ev).

## Steps

**What the rider can check (bike off, nothing unplugged):**
1. Switch off and remove the key and any swap battery.
2. Find where the motor cable meets the controller cable. The manual or a dealer can show you.
3. Look for brown, black or melted plastic, a burnt smell, green corrosion, water inside a connector boot, or a connector that has slipped apart.
4. Gently feel along the cable for cuts, crushing or chafing on the frame or swingarm. Do not pull the connector.
5. If you see heat damage or water, do not ride. Hand the bike to the workshop.

**What the workshop will do:**
6. Isolate the HV system and prove it dead by the manufacturer's procedure.
7. Separate the phase connectors and inspect each pin and socket for heat marks, pitting, corrosion and loose fit.
8. Check that pins are fully locked into the housing (not pushed back).
9. Replace damaged connectors as a matched pair with the correct part, crimped with the correct tool. Do not solder over a burnt connector.
10. Check the cable for damage along its full length, especially at the axle on a hub motor.
11. Reconnect with the correct phase order. The order matters: wrong order makes the motor judder, run backwards or overheat. Follow the manufacturer's diagram; there is no universal colour code.
12. Seal against water as the manufacturer says, re-energise and test ride.

## What to ask for
- Photos of the pins before and after, and what was replaced.
- Whether the controller or motor was checked for heat damage too.

## Check your work
- Clean, tight connectors, correctly routed cable, no judder or cut-out on the test ride.

## If it did not fix the problem
- [Check motor position (Hall) sensors](/moto-zero/repair/repairs/ev-hall-sensor-check)
- [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis)

## Problems this repair helps with

- [Controller overheats or shuts down](/moto-zero/repair/problems/ev-controller-hot)
- [Power cuts out when accelerating hard](/moto-zero/repair/problems/ev-cuts-out-accel)
- [Bike judders or jerks when pulling away](/moto-zero/repair/problems/ev-judder)
- [Motor gets very hot or power drops after a long climb](/moto-zero/repair/problems/ev-motor-hot)
- [Power cuts in and out with the throttle](/moto-zero/repair/problems/ev-throttle-dropout)

## Parts for this job

| Part | Buy |
|---|---|
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Electric motor](/moto-zero/repair/parts/motor) | [Find this part](/spare-parts/motor) |
| [Motor controller](/moto-zero/repair/parts/controller) | [Find this part](/spare-parts/controller) |

## Sources

- [em3ev: How to test e-bike motor Hall sensors](https://em3ev.com/?p=43276)
- [Letrigo: How to test an e-bike motor](https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor)
- [IMI National Occupational Standard IMIEV04: Isolate and re-energise high voltage systems](https://www.ukstandards.org.uk/en/nos-finder/IMIEV04/isolate-and-re-energise-high-voltage-systems-in-an-electric-vehicle)
