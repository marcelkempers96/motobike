---
id: parasitic-drain
title: Something drains the battery with the key off
system: charging
also_called: [parasitic drain, key off drain, battery leakage current, current draw when parked]
urgency: ride-with-care
applies_to: [electric-start, kickstart, fuel-injected, carburettor]
parts: [battery, wiring, regulator, ignition_switch, brake_light_switch, fuse]
repairs: [parasitic-drain-test, brake-switch-test, ignition-switch-test, regulator-test, accessory-wiring, short-circuit-find]
related: [battery-flat, new-battery-dies, accessory-wiring-fault, brake-light-stuck-on, ignition-switch-fault]
sources:
  - {doc: "K-Light 125 manual", page: 36}
  - {doc: "MAVCC Motorcycle Mechanic", page: 292}
---

# Something drains the battery with the key off

The battery is good and charges while riding, but it goes flat when the bike is parked for a few days. Something keeps taking current with the key off. A clock, alarm or ECU memory takes a tiny amount by design. More than that means a fault: a stuck brake light switch, a faulty key switch, a leaking regulator diode, an accessory wired straight to the battery, or a damaged wire touching metal. The K-Light 125 manual allows a key-off leakage of 1 mA or less, and names the brake light, the regulator, the battery and the ignition switch wiring (PDF page 36).

## Is it safe to ride?
With care. The bike may not start after parking. A damaged wire that drains the battery can also overheat.

## Quick checks first
- Brake light lit with the key OFF?
- Any accessory (alarm, tracker, USB socket, extra light) wired directly to the battery?
- Does the key turn fully to OFF? Is any dashboard light on?
- Any warm wire, burnt smell or melted insulation?
- Is the battery itself good (holds charge off the bike for a day)?

## Diagnose it step by step

**1. Does the battery hold its charge for a day when disconnected from the bike?**
- No: the battery is faulty, not the bike. [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Yes: go to step 2.

**2. Is the brake light on with the key OFF?**
- Yes: [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test).
- No: go to step 3.

**3. Measure the key-off current. Is it above the limit? (K-Light 125: 1 mA or less)**
- No: there is no drain. Look at short trips or charging instead: [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat).
- Yes: go to step 4. Use [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test).

**4. Does the current drop when you disconnect an accessory?**
- Yes: rewire it through a switched, fused feed. [Wire an accessory safely](/moto-zero/repair/repairs/accessory-wiring).
- No: go to step 5.

**5. Does pulling one fuse drop the current?**
- Yes: follow that circuit with the wiring diagram, halving it until you find the fault. [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find).
- No: go to step 6.

**6. Does unplugging the regulator drop the current?**
- Yes: the regulator leaks current. [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test).
- No: test the key switch ([Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test)) and the unfused wires from the battery to the starter relay.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Brake light switch stuck on | Brake light lit with key off | [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test) |
| Accessory wired straight to battery | Current drops when unplugged | [Wire an accessory safely](/moto-zero/repair/repairs/accessory-wiring) |
| Leaking regulator | Current drops with regulator unplugged | [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test) |
| Faulty key switch | Continuity in OFF | [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test) |
| Damaged wire touching metal | Current drops on one fuse; chafed wire | [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Key-off leakage current | 1 mA or less | 36 |
