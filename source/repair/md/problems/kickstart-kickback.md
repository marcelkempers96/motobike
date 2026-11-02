---
id: kickstart-kickback
title: Kickstarter kicks back against my foot
system: starting
also_called: [kick back, kickstart throws foot, kick recoil, engine kicks back]
urgency: ride-with-care
applies_to: [kickstart]
parts: [spark_plug, pickup, cdi, ecu, battery, stator, valves]
repairs: [ignition-timing-check, pickup-test, battery-test-charge, cdi-ecu-diagnosis, valve-clearance, kickstart-check]
related: [backfire-on-start, ignition-timing-suspect, cdi-ecu-suspect, starter-grinding]
sources:
  - {doc: "K-Light 125 manual", page: 49}
  - {doc: "K-Light 125 manual", page: 85}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "MAVCC Motorcycle Mechanic", page: 628}
---

# Kickstarter kicks back against my foot

When you kick, the pedal suddenly kicks back up hard against your foot. This happens when the engine fires before the piston reaches the top of its compression stroke, so the explosion pushes the crankshaft backwards. Poor kicking technique causes most kickbacks; a timing fault causes the rest. A kickback can injure your ankle, knee or shin.

## Is it safe to ride?
The bike is usually fine to ride once started, but kicking it is risky. Use the electric starter if fitted, wear boots, and get the cause checked.

## Quick checks first
- Technique: push the pedal down slowly until you feel resistance (compression), let it return, then give one full, firm kick all the way down. Half kicks invite kickback.
- Kick with the ball of your foot, ankle in line with the pedal.
- Throttle closed or barely open, as your manual says.
- Is the battery charged? On some bikes a weak battery upsets the ignition at cranking speed.
- Did it start after engine or electrical work, or after fitting a new CDI?

## Diagnose it step by step

**1. Does it still kick back when you use the correct technique (find compression, then a full kick)?**
- No: it was technique. Practise the method above.
- Yes: go to step 2.

**2. Is the battery charged?**
- No: charge it. [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Yes: go to step 3.

**3. Was the CDI or ECU recently replaced, or was the flywheel or left cover removed?**
- Yes: a wrong unit, a loose flywheel or a sheared flywheel key can move the timing. [Check the ignition timing](/moto-zero/repair/repairs/ignition-timing-check).
- No: go to step 4.

**4. Does the engine also pink (rattle) under load, run hot or lack power?**
- Yes: timing may be too far advanced. [Check the ignition timing](/moto-zero/repair/repairs/ignition-timing-check). **K-Light 125: 15° ± 1° before top dead centre at idle, fixed by the ECU.**
- No: go to step 5.

**5. Does the pick-up test good (resistance and mounting)?**
- No: [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test).
- Yes: the CDI or ECU advance may be faulty. [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis).

**6. If timing is correct, are the valve clearances correct?**
- Have them checked: [Check and adjust valve clearance](/moto-zero/repair/repairs/valve-clearance). Some engines use a decompressor that works on a valve; tight clearances or a faulty decompressor make the engine harder to kick and more likely to kick back.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Kicking technique (half kick) | No kickback with a full kick from compression | Practise the method |
| Weak battery (battery-powered ignition) | Low voltage | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Sheared flywheel key or loose flywheel | Timing marks wrong; after left-side work | [Check the ignition timing](/moto-zero/repair/repairs/ignition-timing-check) |
| Wrong or faulty CDI/ECU | After replacement; timing wrong | [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis) |
| Loose pick-up or reluctor | Timing jumps; poor peak voltage | [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test) |
| Valve clearance or decompressor fault | Clearance out of range | [Check and adjust valve clearance](/moto-zero/repair/repairs/valve-clearance) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Ignition timing | 15° ± 1° BTDC at 1500 ± 100 rpm | 49 |
