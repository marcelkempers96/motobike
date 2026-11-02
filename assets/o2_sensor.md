---
id: o2_sensor
name: Oxygen sensor
category: fuel
aliases: [lambda sensor, O2 sensor]
applies_to: [fuel-injected]
sources:
  - {doc: "K-Light 125 manual", page: 245}
  - {doc: "K-Light 125 manual", page: 264}
  - {doc: "K-Light 125 manual", page: 270}
  - {doc: "K-Light 125 manual", page: 276}
---

# Oxygen sensor

The oxygen sensor is a spark-plug-sized sensor screwed into the exhaust header pipe, near the engine, with a wire running to the loom. Most fuel-injected commuter bikes have one; carburettor bikes do not.

## What it does
The sensor measures how much oxygen is left in the exhaust. High voltage means a rich mix (too much fuel), low voltage means lean. The [ECU](/moto-zero/repair/parts/ecu) reads this and trims the fuel to keep the mix close to the ideal, which keeps the catalytic converter working and fuel use low. A heater inside gets it to working temperature quickly. Oil smoke, leaded fuel, silicone sealant and long rich running coat the tip and make it slow or dead.

## Signs it is worn or failing
- [Engine warning light](/moto-zero/repair/problems/engine-warning-light) with an O2 or heater code.
- [High fuel use](/moto-zero/repair/problems/high-fuel-use) and [runs rich](/moto-zero/repair/problems/runs-rich).
- [Surging at steady cruise](/moto-zero/repair/problems/surging-cruise).
- An exhaust leak before the sensor makes it read lean: [Exhaust leak](/moto-zero/repair/problems/exhaust-leak).

## When to replace it
When it does not switch between rich and lean on a warm engine, or the heater is open circuit, after checking for exhaust leaks and wiring faults. Follow your bike's manual and diagnostic tool.

## What to match when buying
- Match the part number, thread, number of wires (heated sensors have three or four) and plug.
- Wire length matters; do not cut and splice sensor wires unless the maker allows it.
- New sensors often come with anti-seize on the thread; do not let it touch the tip.

## Fitting notes
- Workshop job: [Check the oxygen sensor](/moto-zero/repair/repairs/o2-sensor-check).
- Remove with the exhaust warm but not hot, using a slotted sensor socket. The header burns skin.
- Route the wire away from the pipe and do not twist it while tightening.

## Reference (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Signal | rich above 750 mV, lean below 120 mV | 264 |
| Heater resistance | 9.6 ± 1.5 Ω at 21 °C | 264 |
