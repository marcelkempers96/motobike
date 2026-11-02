---
id: ignition-coil-test
title: Test the ignition coil and plug cap
level: home
time: 30 to 60 min (fuel tank may need removing)
applies_to:
- four-stroke
- two-stroke
tools:
- digital multimeter
- screwdriver
- spanner set
- spark tester
- wiring diagram
parts:
- ignition_coil
- spark_plug
- wiring
consumables:
- contact cleaner
- dielectric grease
fixes:
- backfire-on-start
- cdi-ecu-suspect
- coil-fails-hot
- cuts-out-random
- dies-in-rain
- hard-hot-start
- misfire-high-rpm
- misfire-under-load
- no-spark
- no-start-after-rain
- power-fades-hot
- stalls-when-hot
- sudden-power-loss
- weak-spark
---

# Test the ignition coil and plug cap

**Home mechanic (basic tools)** · Time: 30 to 60 min (fuel tank may need removing) (estimate)


The ignition coil turns a low voltage pulse into the very high voltage that jumps the plug gap. The plug cap connects the coil lead to the plug and often contains a resistor. A cracked cap, a corroded lead end or a failing coil gives a weak or missing spark, often worse in wet weather or when hot.

## Safety
- Key OFF and battery negative disconnected when you unplug the coil.
- Do not touch the plug lead while the engine is cranking or running.
- K-Light 125: the fuel tank must come off to reach the coil (PDF page 88). Drain or support the tank, keep fuel away from sparks, and plug the fuel line. Fuel-injected tanks hold pressure in the line: see your manual before disconnecting it.

## You need
- A multimeter on ohms.
- The wiring diagram. K-Light 125: the coil primary has two wires, black/red (power) and black/white (switched to earth by the ECU) (PDF page 83).

## Steps
1. **Look first.** Check the cap and lead for cracks, burn tracks, green corrosion and water inside the cap. Check that the lead is firmly in the coil. Check that the coil body is not cracked and that its mounting is tight; the coil often earths through its mount.
2. **Small wires.** Check the two primary wire connectors are clean and tight. The K-Light 125 manual says most ignition faults are poor connectors (PDF page 85).
3. **Plug cap.** Unscrew the cap from the lead if it is the screw-on type. Measure across the cap from the plug end to the lead end. A reading that jumps about or reads open means a bad cap: replace it. Use the cap resistance in your manual if it gives one.
4. **Primary winding.** Unplug the small wires. Measure across the two primary terminals. You should get a low resistance reading. An open reading (infinity) means a broken winding: the coil is faulty (K-Light 125 manual). The K-Light 125 manual gives two different tolerances for this value, so this page does not give a pass or fail number. Use your coil maker's exact value.
5. **Secondary winding.** Measure from the plug lead end (cap removed) to one primary terminal or to earth, as your manual describes. Open means a broken winding.
6. **Swap test.** The best simple test is to fit a known good coil from the same model and see whether the spark returns. The K-Light 125 fuel injection troubleshooting uses this method (PDF page 275).
7. **Hot fault.** A coil can pass every resistance test cold and still fail when hot or under load. If the fault comes when the engine is hot, test for a spark straight after it cuts out: [Check for a spark safely](/moto-zero/repair/repairs/spark-test).
8. **Refit.** Clean the connectors, add a little dielectric grease, refit the coil firmly to clean metal, push the cap on until it clicks. The K-Light 125 manual gives different torque values for the coil mounting on different pages, so tighten firmly and use your manual's confirmed value.

## Check your work
- A strong spark on the tester, and the engine starts and revs cleanly.
- The cap seals well on the plug.

## If it did not fix the problem
- Coil and cap good, still no spark: [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test), then [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis).
- No power reaches the coil with the key ON: [Test the engine stop switch](/moto-zero/repair/repairs/kill-switch-test).

## Problems this repair helps with

- [Pops or bangs when trying to start](/moto-zero/repair/problems/backfire-on-start)
- [CDI or ECU suspected faulty](/moto-zero/repair/problems/cdi-ecu-suspect)
- [Ignition cuts out when hot and returns when cool](/moto-zero/repair/problems/coil-fails-hot)
- [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random)
- [Misfires or dies in heavy rain](/moto-zero/repair/problems/dies-in-rain)
- [Hard to start when the engine is hot](/moto-zero/repair/problems/hard-hot-start)
- [Misfires only at high revs](/moto-zero/repair/problems/misfire-high-rpm)
- [Misfires or stutters when accelerating hard or climbing](/moto-zero/repair/problems/misfire-under-load)
- [No spark at the spark plug](/moto-zero/repair/problems/no-spark)
- [Will not start after rain or washing](/moto-zero/repair/problems/no-start-after-rain)
- [Power fades as the engine gets hot](/moto-zero/repair/problems/power-fades-hot)
- [Engine stalls once it is fully warm](/moto-zero/repair/problems/stalls-when-hot)
- [Sudden loss of power while riding](/moto-zero/repair/problems/sudden-power-loss)
- [Weak, thin or orange spark](/moto-zero/repair/problems/weak-spark)

## Parts for this job

| Part | Buy |
|---|---|
| [Ignition coil and plug cap](/moto-zero/repair/parts/ignition_coil) | [Find this part](/spare-parts/ignition-coil) |
| [Spark plug](/moto-zero/repair/parts/spark_plug) | [Find this part](/spare-parts/spark-plug) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |

## Sources

- K-Light 125 manual, PDF p. 83
- K-Light 125 manual, PDF p. 85
- K-Light 125 manual, PDF p. 86
- K-Light 125 manual, PDF p. 88
- K-Light 125 manual, PDF p. 275
