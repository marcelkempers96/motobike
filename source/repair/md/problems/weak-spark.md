---
id: weak-spark
title: Weak, thin or orange spark
system: ignition
also_called: [weak spark, yellow spark, thin spark, poor spark, spark misses]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [spark_plug, ignition_coil, battery, earth_strap, wiring, pickup, cdi, stator]
repairs: [spark-test, spark-plug-service, battery-test-charge, ignition-coil-test, earth-clean, connector-clean, pickup-test, cdi-ecu-diagnosis, spark-plug-reading, stator-test]
related: [no-spark, misfire-high-rpm, coil-fails-hot, hard-cold-start, misfire-under-load, plug-black-sooty]
sources:
  - {doc: "K-Light 125 manual", page: 21}
  - {doc: "K-Light 125 manual", page: 85}
  - {doc: "K-Light 125 manual", page: 86}
  - {doc: "K-Light 125 manual", page: 87}
  - {doc: "MAVCC Motorcycle Mechanic", page: 257}
---

# Weak, thin or orange spark

The spark tester shows a spark, but it is thin, orange or red instead of bright blue-white, or it misses some turns. A weak spark may start the engine when conditions are easy but fail under load, at high revs, in rain or when cold. Colour is only a rough guide: a spark that looks fine in open air can still fail under compression. The K-Light 125 fault chart lists coil supply, ignition switch, CDI or ECU, trigger coil, battery charge and low-voltage wiring (PDF page 21).

## Is it safe to ride?
With care. A weak spark can cause misfires and sudden loss of power. Avoid busy roads until it is fixed.

## Quick checks first
- Is the battery fully charged? A weak battery gives a weak spark on battery-powered systems.
- Is the plug cap tight on the plug and lead, and dry inside?
- Is the coil firmly mounted to clean metal?
- How old is the plug?

## Diagnose it step by step

**1. Is the battery charged, and does its voltage stay up while cranking?**
- No: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Yes, or magneto bike: go to step 2.

**2. With a new, correctly gapped plug, is the spark now strong?**
- Yes: the old plug was worn or fouled. [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service). Find why it fouled: [Read a spark plug](/moto-zero/repair/repairs/spark-plug-reading).
- No: go to step 3.

**3. Are the plug cap and lead free of cracks, burn tracks and corrosion, and does the cap test good?**
- No: replace the cap, or the coil if the lead is part of it. [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test).
- Yes: go to step 4.

**4. Are the coil earth, the main earth and the coil supply connectors clean and tight?**
- No: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) and [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- Yes: go to step 5.

**5. Does a known good coil give a strong spark?**
- Yes: the old coil is weak. Replace it.
- No: go to step 6.

**6. Does the pick-up pass its resistance and peak voltage tests? (K-Light 125: 150 ± 10 Ω at 20 °C; peak above 1.7 V)**
- No: [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test).
- Yes: go to step 7.

**7. Magneto CDI: does the source coil in the stator test good?**
- No: [Test the stator (generator coils)](/moto-zero/repair/repairs/stator-test).
- Yes, or battery-powered: [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Worn or fouled plug | New plug gives a strong spark | [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service) |
| Low battery voltage | Voltage drops a lot when cranking | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Cracked or wet plug cap or lead | Tracking marks; cap test | [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test) |
| Poor coil earth or connector | Corrosion; loose mount | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Weak coil | Swap test | [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test) |
| Weak pick-up or source coil | Low peak voltage | [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test) |
| CDI or ECU | All else good | [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Pick-up resistance | 150 ± 10 Ω at 20 °C | 87 |
| Pick-up peak voltage | above 1.7 V | 85 |
