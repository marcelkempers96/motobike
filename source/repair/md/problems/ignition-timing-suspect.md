---
id: ignition-timing-suspect
title: Ignition timing suspected wrong
system: ignition
also_called: [timing out, timing advanced, timing retarded, spark timing wrong]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [pickup, stator, cdi, ecu, spark_plug]
repairs: [spark-plug-reading, pickup-test, ignition-timing-check, cdi-ecu-diagnosis, compression-test, valve-clearance]
related: [pinking, kickstart-kickback, backfire-on-start, overheating-air, low-power, cdi-ecu-suspect]
sources:
  - {doc: "K-Light 125 manual", page: 23}
  - {doc: "K-Light 125 manual", page: 25}
  - {doc: "K-Light 125 manual", page: 49}
  - {doc: "K-Light 125 manual", page: 85}
  - {doc: "MAVCC Motorcycle Mechanic", page: 628}
  - {doc: "MAVCC Motorcycle Mechanic", page: 679}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/bat_coil_ign.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/magneto1.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/ignitiontiming.htm"}
---

# Ignition timing suspected wrong

The spark must fire a little before the piston reaches the top, earlier at high revs. Too early (advanced) causes pinking (a metallic rattle under load), kickback, overheating and, in bad cases, piston damage. Too late (retarded) causes low power, a hot exhaust and high fuel use. On modern CDI and ECU bikes the timing is set by the electronics and cannot be adjusted (K-Light 125 manual, PDF page 85). So if timing is wrong, something has moved or failed: a sheared flywheel key, a loose flywheel or pick-up, or a wrong or faulty CDI. The K-Light 125 fault charts list a loose flywheel or trigger for overheating and power loss (PDF pages 23 and 25).

## Is it safe to ride?
With care. If the engine pinks under load, ease off at once: pinking can damage the piston. Do not ride hard until the timing is checked.

## Quick checks first
- Did the problem start after work on the left engine side (flywheel, stator, pick-up) or after fitting a new CDI?
- Do you hear pinking under load, or does the kickstarter kick back?
- Is the fuel the grade your manual asks for? Poor fuel also causes pinking.
- Is the engine running hot?
- Is the spark plug colour normal? See [Read a spark plug](/moto-zero/repair/repairs/spark-plug-reading).

## Diagnose it step by step

**1. Is the fuel the correct grade, and is the plug the correct type?**
- No: use the right fuel and plug, then re-test. Pinking that stops with good fuel is not a timing fault.
- Yes: go to step 2.

**2. Was the flywheel, stator, pick-up or CDI/ECU recently removed or replaced?**
- Yes: the most likely causes are a sheared or missing flywheel key, a pick-up fitted out of place, or a wrong CDI. Go to step 4.
- No: go to step 3.

**3. Does the pick-up test good and is its mounting tight?**
- No: [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test).
- Yes: go to step 4.

**4. With a timing light, does the "F" mark line up at the stated speed? (K-Light 125: 15° ± 1° before top dead centre at 1500 ± 100 rpm)**
- No: the workshop finds the cause (key, flywheel, pick-up, CDI). [Check the ignition timing](/moto-zero/repair/repairs/ignition-timing-check).
- Yes: timing is correct. Go to step 5.

**5. Is the advance working (the mark moves into the advance range at higher revs)?**
- No: the CDI or ECU advance has failed. [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis).
- Yes: the symptom has another cause. Check valve clearance and compression ([Check and adjust valve clearance](/moto-zero/repair/repairs/valve-clearance), [Test engine compression](/moto-zero/repair/repairs/compression-test)), or see [Pinging or rattling sound when accelerating (pinking)](/moto-zero/repair/problems/pinking) and [Engine feels weak and down on power](/moto-zero/repair/problems/low-power).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Poor fuel or wrong plug (not timing) | Pinking stops with correct fuel and plug | Use correct fuel and plug |
| Loose pick-up | Pick-up moves; erratic spark | [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test) |
| Sheared flywheel key or loose flywheel | Marks wrong; after left-side work | [Check the ignition timing](/moto-zero/repair/repairs/ignition-timing-check) |
| Wrong or faulty CDI/ECU | After replacement; advance not working | [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis) |
| Worn points heel, loose points plate or sticking advance weights (points ignition) | Timing moves when the plate screws are tightened; marks drift between checks | [Set points gap and ignition timing](/moto-zero/repair/repairs/points-timing-set), [Check spark advance](/moto-zero/repair/repairs/spark-advance-check) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Ignition timing | 15° ± 1° BTDC at 1500 ± 100 rpm | 49 |
