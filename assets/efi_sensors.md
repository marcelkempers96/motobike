---
id: efi_sensors
name: Engine sensors (TPS, MAP, temperature)
category: fuel
aliases: [throttle position sensor, TPS, MAP sensor, TMAP, engine temperature sensor, intake air temperature sensor]
applies_to: [fuel-injected]
sources:
  - {doc: "K-Light 125 manual", page: 259}
  - {doc: "K-Light 125 manual", page: 260}
  - {doc: "K-Light 125 manual", page: 261}
  - {doc: "K-Light 125 manual", page: 262}
  - {doc: "K-Light 125 manual", page: 263}
  - {doc: "K-Light 125 manual", page: 270}
---

# Engine sensors (TPS, MAP, temperature)

A fuel-injected engine has small sensors that tell the [ECU](/moto-zero/repair/parts/ecu) what is happening. On a commuter single they are usually: a **throttle position sensor (TPS)** on the throttle body spindle; a **MAP sensor** (manifold pressure) on the intake, often combined with an **intake air temperature sensor** in one unit (TMAP); and an **engine temperature sensor** in the cylinder head or coolant. The [crank sensor](/moto-zero/repair/parts/pickup) and [oxygen sensor](/moto-zero/repair/parts/o2_sensor) have their own pages.

## What it does
The ECU sends 5 V to most sensors and reads the voltage that comes back. TPS shows how far the throttle is open; MAP shows engine load; the temperature sensors show how cold the engine and air are, so the ECU can add fuel and raise idle when cold. Faults usually come from wet or loose plugs and broken wires, less often from the sensor itself.

## Signs it is worn or failing
- [Engine warning light](/moto-zero/repair/problems/engine-warning-light) with a sensor code.
- [Hard cold start](/moto-zero/repair/problems/hard-cold-start) or [hard hot start](/moto-zero/repair/problems/hard-hot-start): temperature sensor.
- [Hesitation](/moto-zero/repair/problems/hesitation), [flat spot](/moto-zero/repair/problems/flat-spot), [high idle](/moto-zero/repair/problems/high-idle): TPS.
- [Runs rich](/moto-zero/repair/problems/runs-rich) or [high fuel use](/moto-zero/repair/problems/high-fuel-use): MAP or temperature sensor.

## When to replace it
When a code points to the sensor and the wiring, plug and 5 V supply have been checked good, and the reading is outside the model's table. Follow your bike's manual and diagnostic tool.

## What to match when buying
- Match the part number on the sensor. Sensors that look the same have different curves; a wrong one gives wrong fuelling with no code.
- Match the plug shape and pin count.
- Some TPS units must be set to a voltage or reset with a tool after fitting.

## Fitting notes
- Workshop job: [Check the engine sensors](/moto-zero/repair/repairs/efi-sensor-check). Read codes first: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read).
- Turn the key off before unplugging sensors; the K-Light manual warns this can damage the ECU.
- Clean and seal plugs: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).

## Reference (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Sensor reference supply | 5 ± 0.1 V | 259 |
| TPS output, key on | idle 0.5 to 0.9 V; full throttle about 3.5 to 4 V | 260 |
| Head temperature sensor | 1.9 to 2.1 kΩ at 25 °C | 261 |
| MAP output, engine off at 100 kPa | 4.25 to 4.75 V | 263 |
