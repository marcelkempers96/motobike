---
id: cdi
name: CDI unit
category: ignition
aliases: [CDI box, capacitor discharge ignition, ignition unit, spark unit]
applies_to: [carburettor, two-stroke]
sources:
  - {doc: "Unit 2 The Motorcycle", page: 34}
  - {doc: "MAVCC Motorcycle Mechanic", page: 627}
  - {doc: "K-Light 125 manual", page: 21}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/cdiignition.htm"}
---

# CDI unit

The CDI unit is a small sealed box, usually under the seat or side cover, with a multi-pin plug. Most carburettor commuter bikes and scooters use one. Fuel-injected bikes such as the K-Light 125 do not; their [ECU](/moto-zero/repair/parts/ecu) does this job. Some CDIs run on AC from a coil in the stator (AC-CDI); others run on battery power (DC-CDI).

## What it does
The CDI charges a capacitor to a few hundred volts. When the [pick-up](/moto-zero/repair/parts/pickup) pulse arrives, it dumps that charge into the [ignition coil](/moto-zero/repair/parts/ignition_coil), which makes the spark. It also sets the timing and moves it earlier as revs rise, and on many bikes sets a rev limit. CDIs fail from heat, water and vibration, but they are a less common cause of no spark than plugs, caps, wiring and switches.

## Signs it is worn or failing
- [No spark](/moto-zero/repair/problems/no-spark) with good coil, pick-up, switches and wiring.
- [Cuts out randomly](/moto-zero/repair/problems/cuts-out-random) or when hot.
- [Misfires at high revs](/moto-zero/repair/problems/misfire-high-rpm) or will not rev past a point.
- [CDI or ECU suspected faulty](/moto-zero/repair/problems/cdi-ecu-suspect).

## When to replace it
Only when every other part of the ignition has been checked good, ideally by trying a known-good CDI of the same part number. Swapping in a wrong unit can damage it or the engine.

## What to match when buying
- Match the part number on the label, and AC or DC type. Plugs that fit are not proof of a match: the timing curve and rev limit differ.
- "Racing" or unlimited CDIs change timing and can cause pinking and engine damage.
- Cheap copies are common. Buy from a dealer or a known ignition maker, and keep the receipt in case it fails early.
- Magneto CDI (no battery) and battery-fed CDI are different units. A battery-fed one needs a well-charged battery for a good spark.

## Fitting notes
- Workshop job to diagnose: [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis).
- Key off before unplugging. Check the earth wire and plug pins first: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- Mount it where it was, away from heat and water spray.
- Never unplug the CDI, coil or plug cap with the engine running. These systems make very high voltage and it can damage the ignition.
