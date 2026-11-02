---
id: wet-connectors
title: Electrical faults after rain or washing
system: wiring
also_called: [electrics fail in rain, faults after pressure washing, water in connectors]
urgency: ride-with-care
applies_to: [all]
parts: [wiring, handlebar_switches, earth_strap, ignition_coil, spark_plug, ecu]
repairs: [connector-clean, switch-clean, earth-clean, wiring-fault-find, spark-plug-service]
related: [no-start-after-rain, dies-in-rain, intermittent-electrical, switch-fault, headlight-flicker, ev-water-exposure]
sources:
  - {doc: "K-Light 125 manual", page: 84}
  - {doc: "K-Light 125 manual", page: 97}
  - {doc: "K-Light 125 manual", page: 100}
  - {doc: "MAVCC Motorcycle Mechanic", page: 737}
---

# Electrical faults after rain or washing

Lights, horn, indicators, dashboard or the engine misbehave after riding in rain or after a wash, then often recover once the bike dries out. Water has got into a connector, a switch, a lamp or the plug cap, and is making a poor contact or a path where current should not flow. Each time it happens, corrosion grows, so the fault gets worse. Pressure washers are a common cause: the MAVCC detailing job warns against spraying high-pressure water at parts that should stay dry (PDF p. 737).

## Is it safe to ride?
With care in dry weather. If the engine misfires or cuts out in rain, or lights fail, do not ride in the wet until it is fixed. Electric motorcycles that have been in deep water need a check before use: see [Bike has been in deep water or a flood](/moto-zero/repair/problems/ev-water-exposure).

## Quick checks first
- Which items fail: one lamp, one switch, the dashboard, or the engine?
- Do they recover when the bike dries, or after a day in the sun?
- Was a pressure washer used near the headlight, switches, under the seat or near the engine?
- Is there water inside a lens or the dashboard?
- Are any connector covers, rubber boots or seals missing?

## Diagnose it step by step

**1. Is the engine affected (misfire, cut-out, no start)?**
- Yes: the plug cap, coil and ignition connectors are the usual suspects. See [Will not start after rain or washing](/moto-zero/repair/problems/no-start-after-rain) and [Misfires or dies in heavy rain](/moto-zero/repair/problems/dies-in-rain). The K-Light manual says poor connector contact is the main cause of ignition faults (PDF p. 84).
- No, only lights, horn, switches or dashboard: go to step 2.

**2. Is there water inside a lamp or the dashboard?**
- Yes: dry it, check and refit the lens seal (the K-Light manual stresses the tail light lens seal, PDF p. 100), and clean the holder: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean). A dashboard with water inside often needs replacing.
- No: go to step 3.

**3. Does one handlebar switch misbehave?** Test it with the multimeter set to continuity (the beep symbol), key off and switch unplugged: the right pair of wires should beep only in the right position.
- Fails or is unsteady: [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
- Good: go to step 4.

**4. Which connectors are wet?** Key off. Open the connectors on the circuit that fails, starting with the most exposed ones: inside the headlight shell, under the front of the tank, under the seat, near the rear wheel. Release each latch before pulling (K-Light 125, PDF p. 97).
- Water, green or white powder: clean, dry, grease the seals and refit: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- Missing seals or covers: replace them.

**5. Are the earth points rusty?** Wet earth points rust quickly. Set the multimeter to DC volts (V with a straight line), switch on the failing item, put the red probe on battery positive and the black probe on that item's earth wire. Close to battery voltage is good.
- Low: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).

**6. Still failing when wet?** Spray a fine mist of water on one area at a time with the circuit on, to find where the fault starts. Then repair that area: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find). Wires with green copper under the insulation must be cut back to clean copper.

**To prevent it:** wash with low pressure, keep water away from switches, connectors and the ECU, dry the bike after washing, and run the engine and lights for a few minutes.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Water in a connector | Water or green pins | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Water in a handlebar switch | Unsteady continuity | [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean) |
| Water in plug cap or coil (engine faults) | Misfire in wet | [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service) |
| Leaking lamp seal | Water in lens | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Rusty earth point | Low earth test | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Damaged wire letting water in | Green copper under insulation | [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find) |
