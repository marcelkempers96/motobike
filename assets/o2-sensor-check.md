---
id: o2-sensor-check
title: Check the oxygen sensor
level: workshop
time: 10 min for home checks; 30 to 60 min at a workshop (estimate)
applies_to:
- fuel-injected
tools:
- torch
- spanner for checking tightness (cold engine)
- scan tool (workshop)
- multimeter (workshop)
parts:
- o2_sensor
- exhaust
- exhaust_gasket
- wiring
- injector
- ecu
consumables:
- anti-seize suitable for oxygen sensors (workshop
- if the maker allows)
fixes:
- engine-warning-light
- exhaust-leak
- high-fuel-use
- hunting-idle
- injector-fault
- plug-black-sooty
- runs-lean
- runs-rich
- surging-cruise
- black-smoke
---

# Check the oxygen sensor

**Workshop job (assessment and hand-off)** · Time: 10 min for home checks; 30 to 60 min at a workshop (estimate) (estimate)


The oxygen sensor (O2 or lambda sensor) screws into the exhaust pipe near the engine. It measures how much oxygen is left in the exhaust. The ECU uses it to keep the mixture close to the ideal ratio of 14.7 parts air to 1 part fuel by weight. When the sensor works, its signal swings quickly between low (lean, less than about 0.1 V) and high (rich, more than about 0.75 V). A dead, loose or poisoned sensor makes the ECU guess: fuel use rises, idle may hunt and the warning light may come on. Most commuter sensors have a small heater so they work soon after a cold start.

## Safety

- The exhaust and sensor are extremely hot after running. Check them cold.
- Do not ride for long with a known exhaust leak near the sensor; it also blows hot gas onto wiring.

## What you can check safely

1. **Codes:** read the ECU. K-Light 125 codes P0131 (lean too long), P0132 (rich too long), P0134 (no activity) and P0030 to P0032 (heater circuit) point here. See [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read).
2. **Tightness:** with the exhaust cold, check the sensor is fully screwed in. The K-Light 125 manual says a loose sensor reads air as "lean", so the ECU adds fuel and consumption becomes very high.
3. **Exhaust leaks:** a leak at the header gasket before the sensor lets outside air in and gives the same false lean reading. Look for black soot marks at the joint and listen for ticking. See [Find and fix an exhaust leak](/moto-zero/repair/repairs/exhaust-leak-check).
4. **Wiring:** follow the sensor lead. It runs near the hot exhaust; look for melted insulation, chafing and a loose or wet connector.
5. **Oil burning:** blue smoke and oil use can coat ("poison") the sensor and block the catalytic converter. Fix the cause first: [Diagnose exhaust smoke by colour](/moto-zero/repair/repairs/smoke-diagnosis).

## What the workshop will do

- With the engine fully warm and running steadily, watch the sensor signal on a scan tool or meter. K-Light 125 test: engine at about 80 °C, idle or steady 3000 to 5000 rpm for more than 2 minutes; the voltage must keep changing between 0 and 1 V. A flat signal means the sensor has failed or something upstream is wrong.
- Measure the heater resistance with the sensor unplugged. K-Light 125: 9.6 ± 1.5 Ω at 21 °C.
- If the signal stays high (rich) when warm, check for a leaking injector or high fuel pressure before changing the sensor. The K-Light 125 manual links a reading always above 500 mV to injector leakage.
- Replace the sensor with the correct part, using a special socket that clears the wire.

## What to ask for

- "Please check the O2 signal and heater, look for exhaust leaks before the sensor, and confirm the injector is not leaking before replacing the sensor."

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Target air-fuel ratio | 14.7 : 1 | 264 |
| Rich limit / lean limit | Above 750 mV / below 120 mV | 264 |
| Heater resistance | 9.6 ± 1.5 Ω at 21 °C | 264 |
| Live test | Swings 0 to 1 V, warm engine, over 2 min | 264 |

## Problems this repair helps with

- [Engine warning light (check engine, MIL) is on or flashing](/moto-zero/repair/problems/engine-warning-light)
- [Ticking or puffing from an exhaust leak](/moto-zero/repair/problems/exhaust-leak)
- [Uses more fuel than normal](/moto-zero/repair/problems/high-fuel-use)
- [Idle speed rises and falls on its own](/moto-zero/repair/problems/hunting-idle)
- [Fuel injector suspected blocked or leaking](/moto-zero/repair/problems/injector-fault)
- [Spark plug is black and sooty](/moto-zero/repair/problems/plug-black-sooty)
- [Engine runs hot and lean, pops and pinks](/moto-zero/repair/problems/runs-lean)
- [Engine runs rich, smells of fuel and smokes black](/moto-zero/repair/problems/runs-rich)
- [Surges or jerks at steady cruising speed](/moto-zero/repair/problems/surging-cruise)
- [Black smoke from the exhaust](/moto-zero/repair/problems/black-smoke)

## Parts for this job

| Part | Buy |
|---|---|
| [Oxygen sensor](/moto-zero/repair/parts/o2_sensor) | [Find this part](/spare-parts/o2-sensor) |
| [Exhaust and silencer](/moto-zero/repair/parts/exhaust) | [Find this part](/spare-parts/exhaust) |
| [Exhaust gasket](/moto-zero/repair/parts/exhaust_gasket) | [Find this part](/spare-parts/exhaust-gasket) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Fuel injector](/moto-zero/repair/parts/injector) | [Find this part](/spare-parts/injector) |
| [ECU](/moto-zero/repair/parts/ecu) | [Find this part](/spare-parts/ecu) |

## Sources

- K-Light 125 manual, PDF p. 264
- K-Light 125 manual, PDF p. 270
- K-Light 125 manual, PDF p. 274
- K-Light 125 manual, PDF p. 276
