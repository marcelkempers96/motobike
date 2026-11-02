---
id: fuel-gauge-wrong
title: Fuel gauge reads wrong or does not move
system: fuel
also_called: [fuel gauge stuck, gauge always full, gauge always empty, low fuel light faulty]
urgency: ok-to-ride
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [fuel_sender, instruments, wiring, earth_strap, fuse]
repairs: [fuel-sender-test, fuse-relay-check, connector-clean, earth-clean, dash-power-check, wiring-fault-find, fuel-economy-test]
related: [dash-dead, warning-lights-flicker, intermittent-electrical, fuel-starvation, wet-connectors]
sources:
  - {doc: "K-Light 125 manual", page: 180}
  - {doc: "K-Light 125 manual", page: 183}
  - {doc: "K-Light 125 manual", page: 278}
---

# Fuel gauge reads wrong or does not move

The fuel gauge stays on full, stays on empty, jumps about, or does not match how much fuel is really in the tank. Most gauges are worked by a float on an arm inside the tank (the sender), which changes a resistance as the level changes. A wrong reading is usually the sender, its connector, the earth, or the dashboard's power. It is not dangerous in itself, but it can leave you stranded.

## Is it safe to ride?

Yes. Until it is fixed, use the trip meter: reset it at every fill-up and refill well before the distance you normally get from a tank.

## Quick checks first

- Look into the tank with a torch. How much fuel is really there?
- Do the other instruments and warning lights work normally?
- Did the gauge go wrong after the tank was removed, after a crash, or after washing?
- Is the fuel gauge connector on the tank plugged in?

## Diagnose it step by step

**1. Is the rest of the dashboard working normally?**
- No, several instruments are dead or flicker: the problem is power or earth to the dashboard. See [Instruments or dashboard are dead](/moto-zero/repair/problems/dash-dead) and [Check power to the instruments](/moto-zero/repair/repairs/dash-power-check).
- Yes: go to step 2.

**2. Is the sender connector on the tank plugged in, clean and dry?**
- No: refit it. Clean any corrosion: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean). On the K-Light 125 the level sensor is unplugged whenever the tank is removed, so check it after any tank work.
- Yes: go to step 3.

**3. Key ON, sender unplugged. Then join the two harness terminals briefly. Does the gauge move from one end to the other?**
- Yes: the gauge and wiring work. The sender is faulty. [Test the fuel level sender](/moto-zero/repair/repairs/fuel-sender-test).
- No: go to step 4. Check your manual first; some electronic dashboards show a fault code instead.

**4. Is the fuse good and the earth wire from the sender or dashboard clean and tight?**
- [Check fuses](/moto-zero/repair/repairs/fuse-relay-check) and [clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Still no movement: follow the wire from the sender to the dashboard: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

**5. Does the gauge read correctly when full but sticks part way down, or jumps?**
- The float arm may be bent or rubbing on the tank, the float may be leaking and sinking, or the resistor track worn. Remove and test the sender: [Test the fuel level sender](/moto-zero/repair/repairs/fuel-sender-test).

**6. Gauge reads correctly but fuel seems to run out too soon?** Then the bike may really be using more fuel. [Measure fuel consumption](/moto-zero/repair/repairs/fuel-economy-test) and see [Uses more fuel than normal](/moto-zero/repair/problems/high-fuel-use).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Sender connector off, dirty or wet | Visual | [Connector clean](/moto-zero/repair/repairs/connector-clean) |
| Faulty sender (worn track, bent arm, sunk float) | Gauge works with test wire | [Sender test](/moto-zero/repair/repairs/fuel-sender-test) |
| Poor earth | Earth wire loose or corroded | [Earth clean](/moto-zero/repair/repairs/earth-clean) |
| Dashboard power fault | Other gauges also wrong | [Dash power check](/moto-zero/repair/repairs/dash-power-check) |
| Broken wire | Continuity test | [Wiring fault find](/moto-zero/repair/repairs/wiring-fault-find) |
