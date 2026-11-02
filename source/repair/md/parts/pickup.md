---
id: pickup
name: Ignition pick-up
category: ignition
aliases: [pulser coil, crank sensor, trigger coil, CKP sensor]
applies_to: [four-stroke, two-stroke]
sources:
  - {doc: "K-Light 125 manual", page: 80}
  - {doc: "K-Light 125 manual", page: 85}
  - {doc: "K-Light 125 manual", page: 87}
  - {doc: "K-Light 125 manual", page: 82}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "Unit 2 The Motorcycle", page: 34}
---

# Ignition pick-up

The pick-up (also called pulser coil or crank sensor) is a small coil next to the flywheel, under the left engine cover. A bump on the flywheel (the reluctor) passes it once every turn. On the K-Light 125 it is part of the [stator](/moto-zero/repair/parts/stator) and its two wires run in the same plug.

## What it does
Each time the bump passes, the pick-up makes a small voltage pulse. The [CDI](/moto-zero/repair/parts/cdi) or [ECU](/moto-zero/repair/parts/ecu) uses this pulse to know where the piston is and when to fire the spark (and, on injection, when to inject). Without a pulse there is no spark at all. Heat, oil, a damaged wire or metal dirt on the magnet can weaken the signal; a large gap to the flywheel makes it too weak at cranking speed.

## Signs it is worn or failing
- [No spark](/moto-zero/repair/problems/no-spark) and [cranks but will not start](/moto-zero/repair/problems/cranks-no-start).
- [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random).
- [Coil fails when hot](/moto-zero/repair/problems/coil-fails-hot)-type symptoms that are really the pick-up.
- [Backfire on start](/moto-zero/repair/problems/backfire-on-start) if the reluctor or flywheel is loose.
- [Engine warning light](/moto-zero/repair/problems/engine-warning-light) with a crank sensor code.

## When to replace it
When its resistance is open, shorted or out of range, or its peak voltage at cranking is too low, after checking the plug and wiring. Follow your bike's manual.

## What to match when buying
- Match the part number or make and model. On many bikes the pick-up is sold only with the stator plate.
- Match the plug, wire length and mounting holes. Air gap to the flywheel matters; keep any shims.

## Fitting notes
- Home job to test: [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test). Fitting a stator or pick-up means removing the left cover: workshop if a flywheel puller is needed.
- Clean all metal dust off the flywheel magnets before refitting.
- Use the K-Light pick-up bolt torque only on the K-Light.

## Reference (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Resistance (blue/white to green/white) | 150 ± 10 Ω at 20 °C | 87 |
| Peak voltage at cranking | above 1.7 V | 85 |
| Pick-up bolts | 6 to 9 N·m | 82 |
