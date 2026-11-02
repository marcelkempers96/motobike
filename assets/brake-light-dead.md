---
id: brake-light-dead
title: Brake light does not work
system: lighting
also_called: [stop light not working, no brake light]
urgency: do-not-ride
applies_to: [all]
parts: [tail_light, brake_light_switch, fuse, wiring, earth_strap]
repairs: [bulb-replace, brake-switch-test, fuse-relay-check, lighting-circuit-test, earth-clean, connector-clean]
related: [tail-light-out, brake-light-stuck-on, all-lights-out, fuse-keeps-blowing]
sources:
  - {doc: "K-Light 125 manual", page: 47}
  - {doc: "K-Light 125 manual", page: 67}
  - {doc: "K-Light 125 manual", page: 99}
  - {doc: "MAVCC Motorcycle Mechanic", page: 295}
  - {doc: "MAVCC Motorcycle Mechanic", page: 312}
  - {doc: "MAVCC Motorcycle Mechanic", page: 315}
  - {doc: "MAVCC Motorcycle Mechanic", page: 316}
---

# Brake light does not work

The brake light stays off when you pull the front lever or press the rear pedal. Drivers behind you get no warning that you are slowing, so this is a common cause of rear-end crashes. The fault is usually a blown bulb filament, a faulty or badly adjusted switch, a blown fuse, or a broken wire or earth near the tail light.

## Is it safe to ride?
No, not in traffic. If you must move the bike, ride slowly, by day, keep well clear of traffic behind and use hand signals. Fix it first. The brakes themselves may be fine: this is a lighting fault.

## Quick checks first
- Does the brake light fail with **both** the lever and the pedal, or only with one?
- Does the tail light (the dimmer running light) work?
- Key on? Most brake lights only work with the key on.
- Is the lens cracked or full of water?
- Do the horn and indicators work? If they share a dead fuse, they fail too (MAVCC brake-light tracing exercise, PDF p. 295).

## Diagnose it step by step

**1. Does it fail with only one control?**
- Only the lever or only the pedal: the bulb and wiring to the lamp are good. The switch for that control is at fault. Go to [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test).
- Both: go to step 2.

**2. Is the brake filament broken?** Remove the lens and bulb ([Replace a bulb](/moto-zero/repair/repairs/bulb-replace)). The K-Light fault chart starts here (PDF p. 47). K-Light 125 bulb: P21/5W, a twin-filament bulb (PDF p. 99). Set the multimeter to continuity (beep) and probe the base and each contact on the bottom.
- Brake filament (the thicker one) broken: replace the bulb, fitting it the correct way round.
- LED tail light unit: no bulb to test. Go to step 3.
- Bulb good: go to step 3.

**3. Does power reach the lamp when you brake?** Bulb out. Key on. Meter on DC volts (V with a straight line), black probe on frame metal, red probe on the brake contact in the holder. Helper holds the lever.
- Close to battery voltage: power arrives, so the lamp earth is bad. Move the black probe to the lamp housing or earth wire and test again. If the reading drops to 0, the earth is broken: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean). (Same logic as MAVCC JS4, PDF p. 315.)
- 0: go to step 4.

**4. Is the fuse good?** Test it with the meter, not by eye (MAVCC PDF p. 312): [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
- Blown: replace once. If it blows again: [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing).
- Good: go to step 5.

**5. Is power going into and out of each switch?** Meter on DC volts. Back-probe both wires at the rear switch, then the front switch, while a helper brakes.
- Power in, no power out: the switch has failed or is out of adjustment: [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test).
- Power in and out at a switch, but none at the lamp: the wire from the switches to the lamp is broken, often under the rear mudguard or seat: [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test).
- No power into either switch: the feed from the fuse is broken. Check connectors between the fuse and the switches, starting at the fuse (MAVCC PDF p. 316): [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).

**6. Switch works but light comes on late?** The K-Light manual says the brake light should come on at about 15 mm of front lever travel (PDF p. 67). Adjust the rear switch so it comes on as the brake starts to work.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Brake filament broken | No continuity | [Replace a bulb](/moto-zero/repair/repairs/bulb-replace) |
| Switch faulty or out of adjustment (fails with one control) | No continuity when operated | [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test) |
| Poor lamp earth or corroded holder | Power at holder, no light | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Blown fuse | Meter test | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Broken wire under mudguard or seat | Power at switch, none at lamp | [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test) |
| Failed LED tail unit | Power and earth good | Replace unit |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Brake light comes on at front lever travel of | about 15 mm | PDF p. 67 |
| Tail and brake bulb | P21/5W | PDF p. 99 |
