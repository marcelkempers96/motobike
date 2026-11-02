---
id: sudden-power-loss
title: Sudden loss of power while riding
system: power
also_called: [power cut, engine goes weak suddenly, limp mode, lost drive]
urgency: do-not-ride
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected, chain, scooter-cvt, semi-auto]
parts: [fuel_tank, fuel_cap, fuel_tap, fuel_pump, chain, clutch, cvt_belt, throttle_cable, spark_plug, ignition_coil, engine]
repairs: [tank-vent-check, fuel-tap-line-check, fuel-pump-check, efi-code-read, spark-test, ignition-coil-test, throttle-cable-service, oil-level-check, road-test]
related: [engine-seized, overheating-air, fuel-starvation, tank-vacuum, coil-fails-hot, chain-snapped, cvt-belt-broken, clutch-slip, cable-frayed, cuts-out-random, engine-warning-light, revs-without-speed]
sources:
  - {doc: "K-Light 125 manual", page: 269}
  - {doc: "K-Light 125 manual", page: 274}
  - {doc: "MAVCC Motorcycle Mechanic", page: 264}
  - {doc: "MAVCC Motorcycle Mechanic", page: 257}
---

# Sudden loss of power while riding

The bike was running normally and then, within a second or two, lost most of its power: the engine still runs weakly, revs with no drive, or stops. A sudden change has a sudden cause. Some are harmless (the tank ran onto reserve), others need you to stop at once (an engine starting to seize, a broken chain). Work through the questions in order, starting with the dangerous ones.

## Is it safe to ride?

No, not until you know the cause. Signal, move off the road and stop the engine. Continue only if the cause was fuel running low and the bike now runs normally.

## Quick checks first

- Did you hear a knock, squeal or bang, or smell burning?
- Is any warning light on (engine, oil, temperature)?
- Is there still fuel in the tank?
- Does the engine rev when you twist the grip, and does the rear wheel turn in gear?
- Does the throttle grip feel normal, or loose and floppy?

## Diagnose it step by step

**1. Did the engine slow sharply, squeal, knock, or does it now feel stiff to turn over?**
- Yes: **stop. Do not restart.** It may be seizing from overheating or lack of oil. See [Engine has seized](/moto-zero/repair/problems/engine-seized) and [Check the engine oil level](/moto-zero/repair/repairs/oil-level-check) once it is cool.
- No: go to step 2.

**2. Does the engine rev freely, but the bike does not move (or barely moves)?**
- Clatter from the chain, chain hanging loose: [Chain has snapped](/moto-zero/repair/problems/chain-snapped). Do not ride.
- Scooter, no drive at all: [Scooter drive belt has broken](/moto-zero/repair/problems/cvt-belt-broken).
- Revs rise with a little drive: [Engine revs rise but the bike does not speed up](/moto-zero/repair/problems/revs-without-speed).
- Engine does not respond to the grip at all: go to step 3.
- Engine itself is weak or stopped: go to step 4.

**3. Does the throttle grip turn loosely with no return spring feel?**
- Yes: the throttle cable has broken or come off. Do not ride. See [A control cable is frayed or stiff](/moto-zero/repair/problems/cable-frayed) and [Lubricate or replace the throttle cable](/moto-zero/repair/repairs/throttle-cable-service).
- No: go to step 4.

**4. Is there fuel in the tank, and does the engine pick up after switching the tap to RES or opening the fuel cap?**
- Picks up on RES: you ran onto reserve. Refuel soon.
- Picks up after opening the cap (hiss of air): [Check the fuel tank vent](/moto-zero/repair/repairs/tank-vent-check) and see [Engine stops after a few kilometres and the cap hisses](/moto-zero/repair/problems/tank-vacuum).
- No change: go to step 5.

**5. Fuel-injected: is the engine warning light on?**
- Yes: the ECU may have reduced power because of a fault. [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read). Check that the pump primes at key-on: [Check the fuel pump](/moto-zero/repair/repairs/fuel-pump-check).
- No, or carburettor: go to step 6.

**6. Does it misfire badly, or did it cut out and only restart after cooling?**
- Check the plug cap is on, then [do a spark test](/moto-zero/repair/repairs/spark-test). Failing when hot: [Ignition cuts out when hot](/moto-zero/repair/problems/coil-fails-hot).
- Strong spark: check fuel flow: [Check the fuel tap, lines and flow](/moto-zero/repair/repairs/fuel-tap-line-check), and see [Engine stops and only runs on reserve](/moto-zero/repair/problems/fuel-starvation).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Fuel on reserve or empty | Picks up on RES, tank level | Refuel |
| Blocked tank vent | Hiss when cap opened | [Tank vent](/moto-zero/repair/repairs/tank-vent-check) |
| Plug cap off, coil failing hot | Spark test | [Coil test](/moto-zero/repair/repairs/ignition-coil-test) |
| ECU reduced power (injection) | Warning light, code | [Fault codes](/moto-zero/repair/repairs/efi-code-read) |
| Clutch, belt or chain failure | Engine revs, no drive | [Revs without speed](/moto-zero/repair/problems/revs-without-speed) |
| Broken throttle cable | Grip floppy | [Throttle cable](/moto-zero/repair/repairs/throttle-cable-service) |
| Engine seizing | Knock, squeal, stiff | [Engine seized](/moto-zero/repair/problems/engine-seized) |
