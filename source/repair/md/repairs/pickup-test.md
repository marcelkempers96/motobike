---
id: pickup-test
title: Test the ignition pick-up
level: home
time: 20 to 30 min
applies_to:
- four-stroke
- two-stroke
tools:
- digital multimeter
- peak-voltage adaptor for the meter (optional)
- wiring diagram
- torch
parts:
- pickup
- stator
- wiring
consumables:
- contact cleaner
fixes:
- backfire-on-start
- cdi-ecu-suspect
- coil-fails-hot
- fuel-pump-silent
- hard-hot-start
- ignition-timing-suspect
- kickstart-kickback
- misfire-high-rpm
- no-spark
- weak-spark
- cuts-out-random
---

# Test the ignition pick-up

**Home mechanic (basic tools)** · Time: 20 to 30 min (estimate)


The pick-up (also called pulser coil, trigger or crank position sensor) sits next to the flywheel. A bump on the flywheel passes it once each turn and makes a small pulse that tells the CDI or ECU when to fire the plug. On fuel-injected bikes the ECU also uses it to run the fuel pump and injector. If the pick-up fails, there is no spark and often no fuel pump either.

## Safety
- Key OFF and battery negative disconnected before unplugging connectors.
- Keep fingers clear of the flywheel when cranking for the peak voltage test.

## You need
- A multimeter on ohms. For the running test, a peak-voltage adaptor (the pulse is too short for an ordinary meter).
- The wire colours. K-Light 125: blue/white and green/white at the stator connector. The manual's drawing says white/blue; follow the wires on your bike.

## Steps
1. Find the pick-up wires. On the K-Light 125 the pick-up is built into the stator and its wires come out in the same bundle as the charging coils (PDF page 87).
2. Unplug the connector and check the pins for corrosion, bent pins or water.
3. **Resistance.** Measure between the two pick-up wires. **K-Light 125: 150 ± 10 Ω at 20 °C.** Higher or open means a broken coil; lower means a shorted coil. Either way, replace it (K-Light 125 manual). Other bikes: use your manual's value. A hot engine reads a little higher than a cold one.
4. **Short to earth.** Measure from each pick-up wire to engine metal. There should be no continuity.
5. **Peak voltage (if you have the adaptor).** Reconnect where the manual says, crank the engine and read the peak. **K-Light 125: above 1.7 V.** A low reading can also come from a large gap between the pick-up and the flywheel, or a loose flywheel (K-Light 125 troubleshooting, PDF page 275).
6. **Fault code.** On fuel-injected bikes, a crank position sensor code (K-Light 125: P0335) points to this circuit. See [Read engine fault codes (fuel injection)](/moto-zero/repair/repairs/efi-code-read).
7. **Wiring.** Check the wires from the engine to the CDI or ECU for chafing, especially where they pass the frame and near the chain.
8. Replacing a pick-up that is built into the stator, or setting its air gap, means removing the side cover. Many owners hand this to a workshop.

## Check your work
- After repair, a strong spark at every turn: [Check for a spark safely](/moto-zero/repair/repairs/spark-test).
- On fuel-injected bikes, the fuel pump runs while cranking.

## If it did not fix the problem
- Pick-up, coil and wiring all good: [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis).
- Fault only when hot: test the resistance again straight after the fault appears, and compare.

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Pick-up resistance | 150 ± 10 Ω at 20 °C | 87 |
| Pick-up peak voltage | above 1.7 V | 85 |
| Crank position sensor fault code | P0335 | 270 |

## Problems this repair helps with

- [Pops or bangs when trying to start](/moto-zero/repair/problems/backfire-on-start)
- [CDI or ECU suspected faulty](/moto-zero/repair/problems/cdi-ecu-suspect)
- [Ignition cuts out when hot and returns when cool](/moto-zero/repair/problems/coil-fails-hot)
- [No buzz from the fuel pump when the key is turned on](/moto-zero/repair/problems/fuel-pump-silent)
- [Hard to start when the engine is hot](/moto-zero/repair/problems/hard-hot-start)
- [Ignition timing suspected wrong](/moto-zero/repair/problems/ignition-timing-suspect)
- [Kickstarter kicks back against my foot](/moto-zero/repair/problems/kickstart-kickback)
- [Misfires only at high revs](/moto-zero/repair/problems/misfire-high-rpm)
- [No spark at the spark plug](/moto-zero/repair/problems/no-spark)
- [Weak, thin or orange spark](/moto-zero/repair/problems/weak-spark)
- [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random)

## Parts for this job

| Part | Buy |
|---|---|
| [Ignition pick-up](/moto-zero/repair/parts/pickup) | [Find this part](/spare-parts/pickup) |
| [Stator and flywheel](/moto-zero/repair/parts/stator) | [Find this part](/spare-parts/stator) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |

## Sources

- K-Light 125 manual, PDF p. 85
- K-Light 125 manual, PDF p. 86
- K-Light 125 manual, PDF p. 87
- K-Light 125 manual, PDF p. 270
- K-Light 125 manual, PDF p. 275
