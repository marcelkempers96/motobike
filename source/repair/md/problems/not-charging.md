---
id: not-charging
title: Battery is not charging while riding
system: charging
also_called: [no charge, charging system dead, alternator not charging, battery light on, voltage stays low]
urgency: ride-with-care
applies_to: [electric-start, kickstart, fuel-injected, carburettor]
parts: [regulator, stator, battery, fuse, wiring, earth_strap]
repairs: [charging-system-test, battery-test-charge, fuse-relay-check, connector-clean, regulator-test, stator-test, earth-clean]
related: [battery-flat, dim-lights-idle, regulator-hot, stator-burnt, overcharging, all-lights-out]
sources:
  - {doc: "K-Light 125 manual", page: 34}
  - {doc: "K-Light 125 manual", page: 35}
  - {doc: "K-Light 125 manual", page: 74}
  - {doc: "K-Light 125 manual", page: 78}
  - {doc: "K-Light 125 manual", page: 79}
  - {doc: "K-Light 125 manual", page: 80}
---

# Battery is not charging while riding

You ride, but the battery does not recover: it is flat again after a day or two, lights dim, and the voltage at the battery does not rise when the engine runs. The charging system has three parts: the stator (coils behind the flywheel that make AC power), the regulator rectifier (turns it into DC and limits the voltage), and the wiring and fuse to the battery. The K-Light 125 fault chart tests the stator coil at its connector, then checks the wiring to the battery, then the regulator (PDF pages 34 and 35).

## Is it safe to ride?
With care, for a short way. A fuel-injected bike will stop when the battery voltage drops too low, and lights and indicators fade. Ride in daylight and get it fixed.

## Quick checks first
- Is the main fuse good? K-Light 125: 20 A main fuse.
- Are the battery terminals and the main earth tight?
- Look at the regulator connector and the stator connector: any brown, melted or green pins?
- Any warning light for battery or charging on the dashboard?

## Diagnose it step by step

**1. Is the battery able to hold a charge (charge it, then check it reaches the charged value)?**
- No: the battery is worn. Replace it, then test charging again. [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Yes: go to step 2.

**2. With a charged battery, does the voltage rise into the manual's range at test speed? (K-Light 125: 14.5 ± 0.5 V at 5000 rpm)**
- Yes: charging works. The battery goes flat for another reason: [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat).
- No: go to step 3. Use [Test the charging system](/moto-zero/repair/repairs/charging-system-test).

**3. Is the main fuse good, and is there battery voltage on the regulator's battery wire (red on the K-Light 125)?**
- No: replace the fuse or repair the wire. [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
- Yes: go to step 4.

**4. Are the regulator and stator connectors clean and tight, with no burnt pins?**
- No: repair the terminals. [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean). Melted pins: [Regulator is very hot or the connector has melted](/moto-zero/repair/problems/regulator-hot).
- Yes: go to step 5.

**5. Is the regulator earth (black wire) connected to earth with good continuity?**
- No: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Yes: go to step 6.

**6. Does the stator read in range between its wires and show no continuity to earth? (K-Light 125: 0.8 ± 0.3 Ω at 20 °C)**
- No: the stator is faulty. [Test the stator (generator coils)](/moto-zero/repair/repairs/stator-test).
- Yes: the regulator is the likely fault. [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Worn battery that will not take charge | Fails after full charge | [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace) |
| Blown main fuse | No voltage on regulator battery wire | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Loose or burnt connector | Brown pins; voltage jumps | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Poor regulator earth | No continuity on black wire | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Faulty regulator | Diode test fails; stator good | [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test) |
| Faulty stator | Resistance out of range or shorted to earth | [Test the stator (generator coils)](/moto-zero/repair/repairs/stator-test) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Charging voltage | 14.5 ± 0.5 V at 5000 rpm | 78 |
| Stator charging coil | 0.8 ± 0.3 Ω at 20 °C | 80 |
| Main fuse | 20 A | 74 |
