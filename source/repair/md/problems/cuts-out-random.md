---
id: cuts-out-random
title: Cuts out randomly, then restarts
system: running
also_called: [engine dies for no reason, intermittent cut-out, stops then starts again]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [fuel_cap, fuel_tank, fuel_filter, fuel_pump, ignition_coil, pickup, wiring, battery, earth_strap, ecu]
repairs: [road-test, tank-vent-check, fuel-tap-line-check, fuel-filter-replace, fuel-pump-check, spark-test, ignition-coil-test, battery-test-charge, charging-system-test, connector-clean, earth-clean, efi-code-read, drain-fuel]
related: [tank-vacuum, fuel-starvation, coil-fails-hot, cuts-out-bumps, sudden-power-loss, not-charging, intermittent-electrical, kill-switch-fault, water-in-fuel]
sources:
  - {doc: "K-Light 125 manual", page: 22}
  - {doc: "K-Light 125 manual", page: 255}
  - {doc: "K-Light 125 manual", page: 274}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "MAVCC Motorcycle Mechanic", page: 257}
---

# Cuts out randomly, then restarts

The engine stops while you ride, with no warning, and then starts again either at once or after a rest. A random cut-out has three main sources: fuel that stops flowing for a while, an ignition part that fails when hot, or an electrical supply that drops out. The pattern (how long before it restarts, what you did to make it restart) is the best clue, so note it each time.

## Is it safe to ride?

With care. Avoid fast roads and heavy traffic until fixed. If it cuts out, signal and move off the road before you investigate.

## Quick checks first

- Does opening the fuel cap make it restart? Do you hear air rush in?
- Does it restart at once, or only after 10 to 30 minutes?
- Do the dashboard and lights stay on when it cuts?
- Is the battery warning or engine warning light on?
- Did it start after a fuel stop or heavy rain?

## Diagnose it step by step

**1. When it cuts out, open the fuel cap. Do you hear a hiss, and does it then restart and run?**
- Yes: the tank vent is blocked. Go to [Engine stops after a few kilometres and the cap hisses](/moto-zero/repair/problems/tank-vacuum).
- No: go to step 2.

**2. Does it only restart after it has cooled for 10 to 30 minutes?**
- Yes: a heat-sensitive ignition part (coil, pick-up). Do a [spark test](/moto-zero/repair/repairs/spark-test) when it has just cut out. See [Ignition cuts out when hot](/moto-zero/repair/problems/coil-fails-hot).
- No, it restarts quickly: go to step 3.

**3. Do the lights and dashboard go out or flicker at the same moment?**
- Yes: the power supply is dropping. Check the battery and terminals: [Test and charge the battery](/moto-zero/repair/repairs/battery-test-charge). If the battery keeps going flat, [test the charging system](/moto-zero/repair/repairs/charging-system-test). On fuel-injected bikes a low battery stops the pump and ECU (the K-Light 125 ECU needs at least 9 V). Then see [Cuts out when riding over bumps](/moto-zero/repair/problems/cuts-out-bumps).
- No: go to step 4.

**4. Does it happen after a fuel stop, or do you find water or dirt in a fuel sample?**
- Yes: [Drain old or contaminated fuel](/moto-zero/repair/repairs/drain-fuel) and [replace the fuel filter](/moto-zero/repair/repairs/fuel-filter-replace).
- No: go to step 5.

**5. Carburettor: is fuel flow strong on ON and RES? Fuel-injected: does the pump prime strongly every time?**
- Weak flow: [Check the fuel tap, lines and flow](/moto-zero/repair/repairs/fuel-tap-line-check).
- Pump weak, silent at times or a code stored: [Check the fuel pump](/moto-zero/repair/repairs/fuel-pump-check) and [read fault codes](/moto-zero/repair/repairs/efi-code-read).
- All good: go to step 6.

**6. Still cutting out?** Clean and tighten the ignition and engine earth connections: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean), [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean). Test the [ignition coil and cap](/moto-zero/repair/repairs/ignition-coil-test). Use a [road test](/moto-zero/repair/repairs/road-test) to note exactly when it happens.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Blocked tank vent | Hiss when cap opened, restarts | [Tank vent check](/moto-zero/repair/repairs/tank-vent-check) |
| Coil or pick-up failing hot | No spark when hot, fine when cool | [Coil test](/moto-zero/repair/repairs/ignition-coil-test) |
| Loose or weak battery supply | Lights flicker with the cut | [Battery test](/moto-zero/repair/repairs/battery-test-charge) |
| Water or dirt in fuel | Sample in jar | [Drain fuel](/moto-zero/repair/repairs/drain-fuel) |
| Blocked filter or weak pump | Weak flow or prime | [Fuel pump check](/moto-zero/repair/repairs/fuel-pump-check) |
| Poor earth or connector | Corrosion, cut on wiggle | [Earth clean](/moto-zero/repair/repairs/earth-clean) |
