---
id: weak-battery-no-fire
title: Starter turns the engine but the engine will not fire (weak battery)
system: starting
also_called: [cranks but no start, turns over but no spark, battery looks ok but no start]
urgency: do-not-ride
applies_to: [electric-start, four-stroke, two-stroke, carburettor, fuel-injected]
parts: [battery, spark_plug, ignition_coil, wiring]
repairs: [battery-test-charge, battery-hydrometer-test, spark-tester-make, spark-test, jump-start]
related: [cranks-no-start, no-spark, weak-spark, slow-cranking, battery-flat]
sources:
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/batteries.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/cdiignition.htm"}
photos: [{file: "source/dansmc/05_Electrical_Ignition/095/095_battery_tester.jpg", caption: "Load tester on a battery"}, {file: "source/dansmc/05_Electrical_Ignition/090/090_ignition_test.jpg", caption: "Spark tester clipped to the cylinder head"}]
---

# Starter turns the engine but the engine will not fire (weak battery)

The starter spins the engine at a fair speed, but the engine does not start and the spark is weak or missing. Many ignition systems need close to full battery voltage to make a good spark. A tired battery can still turn the starter, which needs current, but not feed the ignition enough voltage. So the battery is a likely cause even when the engine cranks.

## Is it safe to ride?
It will not run. Do not keep cranking: you will flatten the battery further and may flood the engine.

## Quick checks first
- Does the starter sound strong and even, or slow and tired?
- Do the headlight and horn work well, or are they dim?
- Is the engine stop switch on RUN, and are the stand, clutch and neutral switches in the right positions?
- Is the battery old, or has the bike stood for weeks?

## Diagnose it step by step

**1. Measure the battery voltage with the multimeter, key off.**
- A fully charged 12 V battery reads about 12.6 V or more at rest. Lower, and the battery is weak.
- Low: charge it and try again. Go to [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Good: go to step 2.

**2. Does the voltage drop sharply when you press the starter?**
- Yes, it collapses to a low value: the battery has little reserve. Go to step 3.
- No, it holds up: go to step 4.

**3. Test the battery properly.**
- Flooded battery: [Test a battery with a hydrometer and a load check](/moto-zero/repair/repairs/battery-hydrometer-test).
- Sealed battery: take it to a seller with a load tester.
- Weak or failed: charge or replace it: [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace). A jump start from a healthy battery shows if the battery is the cause: [Jump start a motorcycle safely](/moto-zero/repair/repairs/jump-start).

**4. Check for a spark with a tester.**
- Make or use a tester: [Make a simple spark tester](/moto-zero/repair/repairs/spark-tester-make), then [Check for a spark safely](/moto-zero/repair/repairs/spark-test).
- Strong spark: the ignition is fine. The battery is not the cause. Go to [Engine turns over but will not start](/moto-zero/repair/problems/cranks-no-start).
- Weak, orange or no spark: go to step 5.

**5. Check the connections.**
- Battery terminals, earth strap and starter cable ends: clean and tight. See [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean) and [Do a voltage drop test](/moto-zero/repair/repairs/voltage-drop-test).
- Still weak: [Weak, thin or orange spark](/moto-zero/repair/problems/weak-spark).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Flat or weak battery | Low voltage at rest or collapses when cranking | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Worn-out battery | Charges, but fails the hydrometer or load check | [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace) |
| Dirty or loose terminals and earths | Warm terminal, voltage lost across a joint | [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean) |
| Faulty ignition | Weak spark even with a good battery | [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test) |
