---
id: efi-sensor-check
title: Check the engine sensors (TPS, MAP, temperature)
level: workshop
time: 10 min for home checks; 30 to 90 min at a workshop (estimate)
applies_to:
- fuel-injected
tools:
- torch
- contact cleaner
- scan tool (workshop)
- multimeter with fine probes (workshop)
parts:
- efi_sensors
- throttle_body
- wiring
- earth_strap
- ecu
- pickup
consumables:
- electrical contact cleaner
- dielectric grease if the maker allows
fixes:
- black-smoke
- choke-stuck
- dirty-throttle-body
- engine-warning-light
- flat-spot
- hard-cold-start
- hard-hot-start
- hesitation
- hunting-idle
- runs-rich
- stalls-when-hot
- starts-only-with-choke
- temp-gauge-high
- high-idle
- runs-lean
- high-fuel-use
---

# Check the engine sensors (TPS, MAP, temperature)

**Workshop job (assessment and hand-off)** · Time: 10 min for home checks; 30 to 90 min at a workshop (estimate) (estimate)


The ECU decides how much fuel to inject from a few sensors:

- **Throttle position sensor (TPS):** on the throttle body; tells the ECU how far the throttle is open.
- **Intake pressure sensor (MAP)**, often combined with the **intake air temperature sensor**: measures the vacuum and air temperature in the intake, which tells the ECU how much air the engine is taking in.
- **Engine temperature sensor:** in the cylinder head on air-cooled bikes, in the coolant on liquid-cooled bikes. Cold engines get more fuel and a faster idle.
- **Crankshaft position sensor** (pick-up): engine speed and position; covered in [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test).

A faulty sensor or its wiring gives wrong fuelling: hard cold starts, high idle, hesitation, a flat spot, poor economy. Most faults are in connectors and wires, not the sensor. Sensors are sealed parts; they are replaced, not repaired. This page is an **assessment and hand-off**.

## Safety

- Key OFF before unplugging any sensor or ECU connector.
- Do not push meter probes into the front of connectors; it spreads the terminals and makes new faults. A workshop uses back-probe pins.

## What you can check safely

1. **Read codes** first: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read). "High" codes often mean an open circuit or broken earth; "low" codes often mean a short to earth.
2. **Look at each connector:** fully clicked in, no green corrosion, no water, no pulled wires. Clean with contact cleaner: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
3. **MAP sensor pipe** (if it has one): not split, kinked or off. A leak here reads like a big throttle opening.
4. **Temperature sensor wire** near the hot engine: not melted or chafed.
5. **Earths:** a poor engine or ECU earth upsets every sensor reading at once. See [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
6. **Throttle cable:** must let the throttle close fully, or the TPS never reads "closed". See [Adjust throttle free play](/moto-zero/repair/repairs/throttle-cable-adjust).

## What the workshop will do

- Watch live data on a scan tool: does the TPS read smoothly from closed to wide open with no jumps? Does engine temperature rise steadily as the engine warms? Does intake pressure make sense at idle and when stopped?
- Measure supply voltage, signal and sensor resistance at the right pins against the model's table (examples below).
- Check each wire from sensor to ECU for continuity.
- Replace a sensor only after the wiring and supply are proved good, then run any reset needed: [Reset the idle after throttle body work](/moto-zero/repair/repairs/idle-relearn).

## What to ask for

- "Please show me the live data for TPS, MAP and engine temperature, and check the connectors and earth before replacing a sensor."

## Reference values (K-Light 125, for the workshop)

| Item | Value | PDF page |
|---|---|---|
| TPS and MAP reference supply | 5 ± 0.1 V | 259, 263 |
| TPS output, throttle closed | 14 ± 5 % of the reference voltage | 259 |
| TPS output, throttle fully open | 70 to 80 % of the reference voltage | 259 |
| Engine (head) temperature sensor | 1.9 to 2.1 kΩ at 25 °C; 0.179 to 0.187 kΩ at 100 °C | 262 |
| Intake air temperature sensor | 2.0 kΩ at 25 °C | 262 |
| MAP signal, engine stopped, 100 kPa air pressure | 4.25 to 4.75 V | 263 |
| Sensor "high" / "low" fault limits | Above 4.9 V / below 0.1 V | 269 |

## Problems this repair helps with

- [Black smoke from the exhaust](/moto-zero/repair/problems/black-smoke)
- [Choke is stuck on or will not work](/moto-zero/repair/problems/choke-stuck)
- [Unstable idle after cleaning or battery disconnection (fuel-injected)](/moto-zero/repair/problems/dirty-throttle-body)
- [Engine warning light (check engine, MIL) is on or flashing](/moto-zero/repair/problems/engine-warning-light)
- [Flat spot in the middle of the rev range](/moto-zero/repair/problems/flat-spot)
- [Hard to start when the engine is cold](/moto-zero/repair/problems/hard-cold-start)
- [Hard to start when the engine is hot](/moto-zero/repair/problems/hard-hot-start)
- [Hesitates or stumbles when opening the throttle](/moto-zero/repair/problems/hesitation)
- [Idle speed rises and falls on its own](/moto-zero/repair/problems/hunting-idle)
- [Engine runs rich, smells of fuel and smokes black](/moto-zero/repair/problems/runs-rich)
- [Engine stalls once it is fully warm](/moto-zero/repair/problems/stalls-when-hot)
- [Starts only with the choke on or the throttle held open](/moto-zero/repair/problems/starts-only-with-choke)
- [Temperature gauge reads high or the warning light is on](/moto-zero/repair/problems/temp-gauge-high)
- [Idle speed is too high](/moto-zero/repair/problems/high-idle)
- [Engine runs hot and lean, pops and pinks](/moto-zero/repair/problems/runs-lean)
- [Uses more fuel than normal](/moto-zero/repair/problems/high-fuel-use)

## Parts for this job

| Part | Buy |
|---|---|
| [Engine sensors (TPS, MAP, temperature)](/moto-zero/repair/parts/efi_sensors) | [Find this part](/spare-parts/efi-sensors) |
| [Throttle body](/moto-zero/repair/parts/throttle_body) | [Find this part](/spare-parts/throttle-body) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |
| [ECU](/moto-zero/repair/parts/ecu) | [Find this part](/spare-parts/ecu) |
| [Ignition pick-up](/moto-zero/repair/parts/pickup) | [Find this part](/spare-parts/pickup) |

## Sources

- K-Light 125 manual, PDF p. 259
- K-Light 125 manual, PDF p. 260
- K-Light 125 manual, PDF p. 261
- K-Light 125 manual, PDF p. 262
- K-Light 125 manual, PDF p. 263
- K-Light 125 manual, PDF p. 269
- K-Light 125 manual, PDF p. 274
