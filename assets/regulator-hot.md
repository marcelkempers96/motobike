---
id: regulator-hot
title: Regulator is very hot or the connector has melted
system: charging
also_called: [regulator overheating, melted regulator plug, burnt rectifier connector, rectifier too hot]
urgency: do-not-ride
applies_to: [electric-start, kickstart, fuel-injected, carburettor]
parts: [regulator, wiring, stator, battery, earth_strap]
repairs: [regulator-test, connector-clean, charging-system-test, stator-test, earth-clean, battery-test-charge]
related: [burning-smell-wiring, overcharging, not-charging, stator-burnt, battery-flat]
sources:
  - {doc: "K-Light 125 manual", page: 73}
  - {doc: "K-Light 125 manual", page: 76}
  - {doc: "K-Light 125 manual", page: 79}
  - {doc: "K-Light 125 manual", page: 78}
---

# Regulator is very hot or the connector has melted

The regulator rectifier (the finned box that controls charging) is too hot to touch, or its plug is brown, melted or smells burnt. Many regulators get warm in normal use because they turn spare generator power into heat. Very high heat or a melted plug means too much current through a poor contact, a failing regulator, a missing air flow, or a fault in the stator or battery. A loose pin heats up, gets worse and can melt the connector. The K-Light 125 manual warns that unplugging connectors while current flows damages the regulator (PDF page 76).

## Is it safe to ride?
No. A melted connector can catch fire and will soon stop the charging. Repair it first.

## Quick checks first
- Key OFF. Let it cool before touching.
- Is the regulator bolted tight to clean metal, with its fins clear of mud and bags?
- Look at each pin in the plug: which ones are brown or melted? Often it is the three stator (AC) pins.
- Smell for burning from the left engine cover too.
- Has the battery been swollen or hot?

## Diagnose it step by step

**1. Is the connector melted or are the pins brown or loose?**
- Yes: the terminals must be replaced, not just cleaned. Cut back to clean copper and fit new terminals of the correct size, or a new connector, crimped properly. [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean). If you cannot crimp properly, ask a workshop. Then go to step 2.
- No, only the body is hot: go to step 3.

**2. Is the matching connector on the stator side also burnt, or are the stator wires dark?**
- Yes: check the stator. [Test the stator (generator coils)](/moto-zero/repair/repairs/stator-test) and [Burnt smell from the generator or a dark stator connector](/moto-zero/repair/problems/stator-burnt).
- No: go to step 3.

**3. Is the regulator bolted firmly, with air reaching its fins, and is its earth (black wire) good?**
- No: clean the mounting face and fins, tighten its bolts (K-Light 125: 5.0 N·m), and repair the earth. [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Yes: go to step 4.

**4. Does the regulator pass the diode check, and is the charging voltage in range? (K-Light 125: 14.5 ± 0.5 V at 5000 rpm)**
- No: replace the regulator with the correct type. [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test), [Test the charging system](/moto-zero/repair/repairs/charging-system-test).
- Yes: go to step 5.

**5. Is the battery good?**
- A shorted or worn battery makes the regulator work harder. [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Loose or corroded connector pin | Brown or melted pin | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Poor mounting or blocked fins | Loose bolts, mud on fins | Clean and tighten |
| Poor regulator earth | Black wire continuity poor | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Failing regulator | Diode test fails; voltage out of range | [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test) |
| Faulty stator or battery | Stator test; battery test | [Test the stator (generator coils)](/moto-zero/repair/repairs/stator-test) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Regulator bolt | 5.0 N·m | 73 |
| Charging voltage | 14.5 ± 0.5 V at 5000 rpm | 78 |
