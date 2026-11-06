---
id: stator-test
title: Test the stator (generator coils)
level: home
time: 20 to 30 min to test; replacement is workshop work
applies_to:
- electric-start
- kickstart
- fuel-injected
- carburettor
tools:
- digital multimeter
- wiring diagram for your bike
- torch
parts:
- stator
- wiring
- regulator
consumables:
- contact cleaner
fixes:
- dim-lights-idle
- no-spark
- not-charging
- regulator-hot
- stator-burnt
- weak-spark
- battery-flat
---

# Test the stator (generator coils)

**Home mechanic (basic tools)** · Time: 20 to 30 min to test; replacement is workshop work (estimate)


The stator is a ring of copper coils fixed inside the engine side cover. Magnets in the flywheel spin around it and make AC power. A burnt or broken coil gives low or no charging. You can test it from its connector without opening the engine.

## Safety
- Key OFF and battery negative (−) disconnected before you unplug any connector.
- Let the engine cool. The connector is often near the exhaust or engine.

## You need
- A multimeter on the lowest ohms range.
- The wire colours. K-Light 125: three white wires for the charging coils. The same connector may also carry the ignition pick-up wires; do not mix them up (PDF page 80).

## Steps
1. Find the stator connector. Follow the thick bundle of wires from the left engine cover. On the K-Light 125 it plugs into the regulator.
2. Unplug it. Look at the pins and wire ends. Dark brown, burnt or melted pins are a sign of overheating. Note it, and clean or replace the terminals later.
3. Touch the meter probes together and note the meter's own lead resistance. Subtract it from the readings that follow.
4. Measure between each pair of white wires: 1 to 2, 2 to 3, 1 to 3. **K-Light 125: 0.8 ± 0.3 Ω at 20 °C.** All three pairs should read about the same.
5. Read the result:
   - All pairs in range and equal: coils are probably fine.
   - One pair reads open (no reading, infinity): a broken coil or wire.
   - One pair much lower than the others: a shorted coil (K-Light 125 manual fault chart).
6. Measure from each white wire to bare engine metal. There must be no continuity. Continuity means a coil is shorted to earth: the stator needs replacing.
7. Low resistance numbers can be hard to read on a cheap meter. A resistance test also cannot prove a coil works under load. If the resistance looks right but charging is low, the workshop can measure the stator's AC output with the engine running, using your manual's value.
8. Check the wires from the connector back into the engine for chafing on the frame or chain.

## Replacing a stator (workshop)
On most bikes the stator sits behind the flywheel. Replacement needs a flywheel holder and puller, a new cover gasket, and correct torque values for the flywheel nut and stator bolts. The K-Light 125 manual gives different values on different pages for some of these fasteners, so this page does not publish them. Ask the workshop to use the confirmed values for your engine and to check the flywheel key and magnets for damage.
- Some replacement coil sets come with short leads, so the old leads must be joined on. Use crimp connectors and heat shrink sleeve, not solder alone: the joint sits close to the hot engine and soldered wires can separate when hot. Insulate and tie the joint so it cannot touch the case or the flywheel.

## Check your work
- After repair, [Test the charging system](/moto-zero/repair/repairs/charging-system-test) gives a reading in range.

## If it did not fix the problem
- Stator tests good: [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test).
- Burnt smell or dark engine oil near the stator: [Burnt smell from the generator or a dark stator connector](/moto-zero/repair/problems/stator-burnt).

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Charging coil resistance, white to white | 0.8 ± 0.3 Ω at 20 °C | 80 |
| Charging coil to earth | no continuity | 79 |

## Problems this repair helps with

- [Lights go dim at idle](/moto-zero/repair/problems/dim-lights-idle)
- [No spark at the spark plug](/moto-zero/repair/problems/no-spark)
- [Battery is not charging while riding](/moto-zero/repair/problems/not-charging)
- [Regulator is very hot or the connector has melted](/moto-zero/repair/problems/regulator-hot)
- [Burnt smell from the generator or a dark stator connector](/moto-zero/repair/problems/stator-burnt)
- [Weak, thin or orange spark](/moto-zero/repair/problems/weak-spark)
- [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat)

## Parts for this job

| Part | Buy |
|---|---|
| [Stator and flywheel](/moto-zero/repair/parts/stator) | [Find this part](/spare-parts/stator) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Regulator rectifier](/moto-zero/repair/parts/regulator) | [Find this part](/spare-parts/regulator) |

## Sources

- K-Light 125 manual, PDF p. 34
- K-Light 125 manual, PDF p. 76
- K-Light 125 manual, PDF p. 79
- K-Light 125 manual, PDF p. 80
- K-Light 125 manual, PDF p. 82
