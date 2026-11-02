---
id: ecu
name: ECU
category: ignition
aliases: [engine control unit, ECM, EFI computer]
applies_to: [fuel-injected]
sources:
  - {doc: "K-Light 125 manual", page: 85}
  - {doc: "K-Light 125 manual", page: 252}
  - {doc: "K-Light 125 manual", page: 255}
  - {doc: "K-Light 125 manual", page: 270}
  - {doc: "K-Light 125 manual", page: 275}
  - {doc: "K-Light 125 manual", page: 266}
  - {doc: "K-Light 125 manual", page: 49}
  - {doc: "K-Light 125 manual", page: 272}
---

# ECU

The ECU (engine control unit) is the computer of a fuel-injected bike. It is a sealed box with one large multi-pin plug, usually under the seat or a side cover. On the K-Light 125 it controls both fuel injection and ignition, through a 34-pin connector.

## What it does
The ECU reads the [crank sensor](/moto-zero/repair/parts/pickup), [throttle, pressure and temperature sensors](/moto-zero/repair/parts/efi_sensors) and the [oxygen sensor](/moto-zero/repair/parts/o2_sensor). It then sets injector opening time, spark timing and idle air. It runs the [fuel pump](/moto-zero/repair/parts/fuel_pump) and lights the engine warning light when it sees a fault, storing a code. True ECU failure is rare; most faults are in sensors, wiring, plugs and earths. Voltage spikes, jump starts from a car, reverse polarity and water can damage it.

## Signs it is worn or failing
- [Engine warning light](/moto-zero/repair/problems/engine-warning-light) on, or not lighting at all at key on.
- [No spark](/moto-zero/repair/problems/no-spark) and no pump prime, with good fuses, power and earth.
- [CDI or ECU suspected faulty](/moto-zero/repair/problems/cdi-ecu-suspect).
- Diagnostic tool cannot talk to the ECU.

## When to replace it
Only after a workshop has checked power, earth, sensors and wiring with the model's diagnostic tool, and a known-good unit cures the fault. A new or used ECU may need coding or matching to the bike and immobiliser.

## What to match when buying
- Match the part number and software version on the label. ECUs that fit the same plug can have different fuel maps.
- Used ECUs from another bike may not work if the bike has an immobiliser.
- Avoid "remapped" or tuning ECUs on a commuter; they can raise fuel use and engine heat.

## Fitting notes
- Workshop job: [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis), [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read).
- Key off before unplugging any connector or the battery; the K-Light manual warns this can damage the ECU.
- After fitting, the idle may need to relearn: [Reset the idle](/moto-zero/repair/repairs/idle-relearn).

## Reference (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Connector | 34 pin | 266 |
| Supply range | 9 to 16 V DC | 255 |
| Ignition timing | 15° ± 1° BTDC at idle, fixed in ECU | 49 |
| Diagnostic tool | 16-pin port; battery at least 8.5 V | 272 |
