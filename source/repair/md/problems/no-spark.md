---
id: no-spark
title: No spark at the spark plug
system: ignition
also_called: [no fire, dead ignition, no spark from coil, ignition not working]
urgency: do-not-ride
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [spark_plug, ignition_coil, handlebar_switches, ignition_switch, interlock_switches, pickup, cdi, ecu, wiring, battery, fuse, stator]
repairs: [spark-test, spark-plug-service, battery-test-charge, kill-switch-test, interlock-switch-test, ignition-coil-test, pickup-test, connector-clean, cdi-ecu-diagnosis, fuse-relay-check, stator-test]
related: [weak-spark, cranks-no-start, kill-switch-fault, cdi-ecu-suspect, no-start-after-rain, coil-fails-hot]
sources:
  - {doc: "K-Light 125 manual", page: 21}
  - {doc: "K-Light 125 manual", page: 85}
  - {doc: "K-Light 125 manual", page: 86}
  - {doc: "K-Light 125 manual", page: 87}
  - {doc: "K-Light 125 manual", page: 58}
  - {doc: "MAVCC Motorcycle Mechanic", page: 257}
  - {doc: "MAVCC Motorcycle Mechanic", page: 628}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/cdiignition.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/bat_coil_ign.htm"}
---

# No spark at the spark plug

A spark tester shows no spark while the engine cranks. The ignition chain is: power (battery or a source coil in the stator), switches, pick-up (timing signal), CDI or ECU, coil, cap and plug. A break anywhere gives no spark. Test in this order, the same order the K-Light 125 manual uses: battery, wiring and connectors, plug, coil, pick-up, then the ECU (PDF page 86). Expensive modules come last because they are rarely the cause.

## Is it safe to ride?
The engine will not run. When testing, never hold the plug lead by hand or touch it to the frame to make a spark; use an enclosed spark tester.

## Quick checks first
- Engine stop switch on RUN.
- Side stand up and bike in neutral (some bikes cut the spark in gear with the stand down).
- Plug cap pushed fully on, no water in it.
- Battery charged (needed for battery-powered CDI and all fuel-injected bikes).
- Fuel-injected: does the warning light come on at key ON?
- Do not pull the plug cap or unplug any ignition part with the engine running. The voltage is high and can damage the ignition.

## Diagnose it step by step

**1. Try a new, correctly gapped plug in the tester. Is there a spark now?**
- Yes: the old plug was faulty. [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service).
- No: go to step 2. Use [Check for a spark safely](/moto-zero/repair/repairs/spark-test).

**2. Is the battery charged and are the main fuse and ignition fuse good?**
- No: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) and [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
- Yes (or a magneto bike with no battery): go to step 3.

**3. Do the engine stop switch and key switch pass a continuity test?**
- No: [Test the engine stop switch](/moto-zero/repair/repairs/kill-switch-test).
- Yes: go to step 4.

**4. Do the side stand, neutral and clutch switches work? Does unplugging the side stand switch change anything?**
- Faulty switch: [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test).
- All fine: go to step 5.

**5. Are the coil connectors, CDI or ECU plug and stator connector clean, dry and tight?**
- No: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- Yes: go to step 6.

**6. Does the coil and cap pass the checks, or does a known good coil give a spark?**
- Coil faulty: replace it. [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test).
- Coil good: go to step 7.

**7. Is the pick-up resistance in range? K-Light 125: 150 ± 10 Ω at 20 °C.**
- No: [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test).
- Yes: go to step 8.

**8. Magneto (AC) CDI bikes: does the source coil in the stator test good?**
- No: [Test the stator (generator coils)](/moto-zero/repair/repairs/stator-test).
- Yes, or battery-powered: the CDI or ECU is now the suspect. [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Engine stop switch on STOP or dirty | Continuity test | [Test the engine stop switch](/moto-zero/repair/repairs/kill-switch-test) |
| Fouled or broken plug | New plug sparks | [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service) |
| Side stand or neutral switch | Spark returns with switch fixed | [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test) |
| Wet or corroded connector | Green pins; works when dried | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Faulty coil or cap | Open winding; swap test | [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test) |
| Faulty pick-up | Resistance out of range; crank sensor code | [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test) |
| CDI or ECU | All else tests good; swap test | [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis) |
| Worn or burnt contact points, or a failed condenser (older points ignition) | Pitted or blackened faces, heavy arcing; no spark even with clean, correctly gapped points | [Inspect, clean and replace contact breaker points](/moto-zero/repair/repairs/contact-points-replace), [Test an ignition condenser](/moto-zero/repair/repairs/condenser-test) |
| Battery too low for a battery-fed electronic ignition | Starter still turns, but voltage sags; spark returns after charging | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Pick-up resistance | 150 ± 10 Ω at 20 °C | 87 |
| Spark plug gap | 0.7 ± 0.1 mm | 58 |
