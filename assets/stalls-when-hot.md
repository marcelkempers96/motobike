---
id: stalls-when-hot
title: Engine stalls once it is fully warm
system: running
also_called: [dies when hot, cuts out after a long ride, stalls in traffic when hot]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected, air-cooled, liquid-cooled]
parts: [ignition_coil, pickup, carb, fuel_line, efi_sensors, throttle_body, valves, engine_oil]
repairs: [spark-test, ignition-coil-test, carb-idle-adjust, carb-float-check, efi-code-read, efi-sensor-check, throttle-body-clean, valve-clearance, intake-leak-test, air-cooling-check]
related: [coil-fails-hot, overheating-air, overheating-liquid, engine-seized, runs-lean, stalls-at-idle, hard-hot-start, power-fades-hot]
sources:
  - {doc: "K-Light 125 manual", page: 23}
  - {doc: "K-Light 125 manual", page: 26}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "MAVCC Motorcycle Mechanic", page: 349}
  - {doc: "MAVCC Motorcycle Mechanic", page: 68}
---

# Engine stalls once it is fully warm

The engine starts and runs well when cold, but once it is fully hot it stalls at idle, or cuts out while riding. Heat changes many things: idle speed drops, electrical parts that are failing stop working, fuel can boil in a line near a hot engine, and tight valves stop sealing. How the engine stops tells you which.

## Is it safe to ride?

With care, and only if the engine is not overheating. If the engine slowed, tightened, knocked or squealed before it stopped, **stop riding** and let it cool: it may be close to seizing.

## Quick checks first

- Engine oil level correct (low oil makes engines run hot)?
- Cooling fins clean (air-cooled), or coolant level and fan working (liquid-cooled)?
- Does it stop suddenly, as if switched off, or slow down and die?
- Will it restart at once, or only after it cools?
- Is any fuel hose touching the engine or exhaust?

## Diagnose it step by step

**1. Did the engine lose power, knock, squeal or tighten before stopping, or is it stiff to turn when hot?**
- Yes: **stop**. Let it cool fully. See [Air-cooled engine overheats](/moto-zero/repair/problems/overheating-air), [Liquid-cooled engine overheats](/moto-zero/repair/problems/overheating-liquid) or [Engine has seized](/moto-zero/repair/problems/engine-seized).
- No: go to step 2.

**2. Does it stop suddenly, like the key was turned off, and refuse to restart until it has cooled for 10 to 30 minutes?**
- Yes: an ignition part is failing with heat, usually the coil or pick-up. Do a [spark test](/moto-zero/repair/repairs/spark-test) while hot. Go to [Ignition cuts out when hot](/moto-zero/repair/problems/coil-fails-hot).
- No, it restarts at once: go to step 3.

**3. Does it only stall at idle when hot, while running well on the move?**
- Yes, carburettor: idle set while cold drops when hot. Warm the engine fully and [adjust the idle](/moto-zero/repair/repairs/carb-idle-adjust).
- Yes, fuel-injected: [read fault codes](/moto-zero/repair/repairs/efi-code-read), then [check the engine temperature sensor](/moto-zero/repair/repairs/efi-sensor-check) and [clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean).
- No, it cuts out while riding: go to step 4.

**4. Carburettor bikes: is a fuel hose or the carburettor close to the hot engine or exhaust, or is the weather very hot?**
- Yes: fuel may be boiling in the line (vapour lock). Reroute the hose away from heat and refit any heat shield. Then [check the float level](/moto-zero/repair/repairs/carb-float-check).
- No: go to step 5.

**5. Does it also pink (rattle) under load, or pop on the overrun?**
- Yes: it is running lean, which makes heat. Go to [Engine runs hot and lean](/moto-zero/repair/problems/runs-lean) and [find an intake air leak](/moto-zero/repair/repairs/intake-leak-test).
- No: go to step 6.

**6. Still stalling hot?**
- [Check valve clearance](/moto-zero/repair/repairs/valve-clearance) on a cold engine. Valves set too tight can hold open when hot. Then follow [Hard to start when hot](/moto-zero/repair/problems/hard-hot-start).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Idle too low when hot | Stalls only at idle, restarts at once | [Adjust idle](/moto-zero/repair/repairs/carb-idle-adjust) or [throttle body](/moto-zero/repair/repairs/throttle-body-clean) |
| Coil or pick-up failing hot | Sudden cut, no spark when hot, works when cool | [Test the coil](/moto-zero/repair/repairs/ignition-coil-test) |
| Lean mixture or air leak | Pinking, popping, white plug | [Intake leak](/moto-zero/repair/repairs/intake-leak-test) |
| Fuel boiling in the line (carburettor) | Hose near heat; worse on hot days | Reroute hose; [float check](/moto-zero/repair/repairs/carb-float-check) |
| Temperature sensor fault (injection) | Code, or wrong temperature in live data | [Sensor check](/moto-zero/repair/repairs/efi-sensor-check) |
| Tight valves | Feeler gauge on a cold engine | [Valve clearance](/moto-zero/repair/repairs/valve-clearance) |
| Overheating | Fins blocked, low oil or coolant | [Air cooling check](/moto-zero/repair/repairs/air-cooling-check) |
