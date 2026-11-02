---
id: engine-warning-light
title: Engine warning light (check engine, MIL) is on or flashing
system: fuel
also_called: [check engine light, FI light, MIL, engine light on]
urgency: ride-with-care
applies_to: [fuel-injected]
parts: [ecu, efi_sensors, o2_sensor, injector, fuel_pump, ignition_coil, pickup, wiring, earth_strap, battery]
repairs: [efi-code-read, connector-clean, earth-clean, efi-sensor-check, o2-sensor-check, injector-check, fuel-pump-check, battery-test-charge, cdi-ecu-diagnosis]
related: [cdi-ecu-suspect, injector-fault, dirty-throttle-body, warning-lights-flicker, rough-idle, low-power, oil-warning-light, temp-gauge-high, abs-light]
sources:
  - {doc: "K-Light 125 manual", page: 269}
  - {doc: "K-Light 125 manual", page: 270}
  - {doc: "K-Light 125 manual", page: 271}
  - {doc: "K-Light 125 manual", page: 274}
  - {doc: "K-Light 125 manual", page: 276}
---

# Engine warning light (check engine, MIL) is on or flashing

The engine warning light, often marked **FI** or shown as an engine symbol, is the ECU's way of telling you it has found a fault in the fuel injection or ignition system and stored a code. It is not the same as the oil, temperature or ABS lights. On most bikes it should light for a moment at key-on as a bulb check, then go out once the engine runs. If it stays on, comes on while riding, or flashes, read the code.

## Is it safe to ride?

With care, if the engine runs normally: ride gently to where the code can be read. If the light **flashes**, or the engine misfires, loses power or runs hot, stop and get it checked: a flashing light on many bikes means misfiring that can damage the catalytic converter.

## Quick checks first

- Is it really the engine light, not the oil, temperature, battery or ABS light?
- Does it come on at key-on and go out after starting? That is normal.
- Did it come on after washing, rain, or work on the bike (a connector left off)?
- Is the battery in good condition?
- Does the engine run differently?

## Diagnose it step by step

**1. At key-on, before starting, does the light come on?**
- No, never: the system may have no power, or the bulb or LED has failed. The K-Light 125 manual says to check the fuse, earth wire and ECU plug first. See [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) and [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Yes: go to step 2.

**2. After starting, does it go out within a few seconds?**
- Yes: normal. No fault stored.
- No, or it comes on while riding: go to step 3.

**3. Is it flashing, or is the engine misfiring, losing power or overheating?**
- Yes: stop riding hard. Ride slowly to safety or have it collected. Go to step 4.
- No: go to step 4 when convenient.

**4. Read the stored codes.**
- [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read). Write every code down before clearing.

**5. What does the code point to?**
- Sensor (throttle, intake pressure, temperature): [Check the engine sensors](/moto-zero/repair/repairs/efi-sensor-check).
- Oxygen sensor or its heater: [Check the oxygen sensor](/moto-zero/repair/repairs/o2-sensor-check).
- Injector: [Check the fuel injector](/moto-zero/repair/repairs/injector-check).
- Fuel pump: [Check the fuel pump](/moto-zero/repair/repairs/fuel-pump-check).
- Ignition coil or crank sensor: [Ignition coil test](/moto-zero/repair/repairs/ignition-coil-test), [Pick-up test](/moto-zero/repair/repairs/pickup-test).
- ECU internal error: [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis).

**6. Before replacing any part, clean and check its connector and earth.** Most "sensor" codes are caused by connectors, water and earths: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).

**7. Does the code not match the symptoms, or keep changing?** The K-Light 125 manual says an unstable earth wire can cause this. Fix the earth, disconnect the battery for 3 minutes, reconnect and start. Check the battery: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge). Low voltage gives false codes.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Connector left off or wet | Code for one sensor, after work or washing | [Connector clean](/moto-zero/repair/repairs/connector-clean) |
| Poor earth or low battery | Codes change, low voltage | [Earth clean](/moto-zero/repair/repairs/earth-clean) |
| Sensor or O2 fault | Code, live data | [Sensor check](/moto-zero/repair/repairs/efi-sensor-check) |
| Injector or pump circuit | Code | [Injector check](/moto-zero/repair/repairs/injector-check) |
| Ignition coil or crank sensor | Code, misfire | [Coil test](/moto-zero/repair/repairs/ignition-coil-test) |
| ECU fault | Code, after all else is checked | [ECU diagnosis](/moto-zero/repair/repairs/cdi-ecu-diagnosis) |
