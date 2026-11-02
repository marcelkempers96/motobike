---
id: no-power-key-on
title: Nothing happens when the key is turned on
system: wiring
also_called: [bike completely dead, no power at all, no dashboard no lights, key does nothing]
urgency: do-not-ride
applies_to: [all]
parts: [battery, fuse, ignition_switch, wiring, earth_strap]
repairs: [battery-test-charge, battery-terminal-clean, fuse-relay-check, ignition-switch-test, earth-clean, wiring-fault-find, short-circuit-find, accessory-wiring]
related: [battery-flat, all-lights-out, dash-dead, starter-silent, fuse-keeps-blowing, accessory-wiring-fault, ev-dash-dark, burning-smell-wiring]
sources:
  - {doc: "K-Light 125 manual", page: 76}
  - {doc: "K-Light 125 manual", page: 97}
  - {doc: "K-Light 125 manual", page: 102}
  - {doc: "K-Light 125 manual", page: 269}
  - {doc: "K-Light 125 manual", page: 278}
---

# Nothing happens when the key is turned on

You turn the key and nothing happens: no dashboard lamps, no fuel pump hum, no lights, no horn. When everything is dead, the fault sits before the point where the circuits split: the battery, the battery cables, the main fuse, the ignition switch, or the main earth. The K-Light manual lists exactly these for "no power": an over-discharged battery, a battery wire not connected, a broken fuse and a defective power switch (PDF p. 76).

## Is it safe to ride?
The bike cannot run. Do not try to push-start a fuel-injected bike with no power. Push it off the road.

## Quick checks first
- Are the battery cables connected and tight? Try to turn each terminal by hand.
- Is there an alarm or immobiliser that cuts power? Try its remote or the spare key.
- Electric motorcycle: go to [Dashboard is dark and the bike seems dead](/moto-zero/repair/problems/ev-dash-dark).
- Was the bike parked for a long time, or was something left on?
- Is there a burning smell? If so, keep the key off and see [Burning smell from the wiring](/moto-zero/repair/problems/burning-smell-wiring).

## Diagnose it step by step

**1. What does the battery read?** Set the multimeter to DC volts (V with a straight line), 20 V range. Red probe on the battery positive (+) terminal, black probe on the negative (-) terminal. Touch the lead posts themselves, not the cable clamps.
- Very low or 0: the battery is flat or dead: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge). Then find out why: [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat).
- Good: go to step 2.

**2. Does the voltage reach the cables?** Move the probes from the posts to the cable clamps.
- Lower than on the posts, or it changes when you wiggle the clamp: the terminal is loose or corroded: [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean).
- Same: go to step 3.

**3. Is the main fuse good?** Test it with the meter: [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check). K-Light 125 main fuse: 20 A, near the battery (PDF p. 278).
- Blown: fit one new fuse of the same rating. If it blows again, stop: [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing).
- Good: go to step 4.

**4. Does battery power reach the ignition switch?** Key off. Find the ignition switch connector. Meter on DC volts, black probe on battery negative, red probe back-probed into the feed wire (push a thin pin into the back of the connector along the wire).
- 0: the wire from the main fuse to the switch, or a connector on it, is broken: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).
- Battery voltage: go to step 5.

**5. Does power come out of the switch with the key on?** Key on, back-probe the output wire. The K-Light 125 switch connects red/white 1 to red, and red/white to orange/blue, in the ON position (PDF p. 102).
- 0 on the output: the switch has failed: [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test).
- Battery voltage: go to step 6.

**6. Is the main earth good?** Red probe on battery positive, black probe on bare frame metal, key on. The reading should be close to battery voltage.
- Low or 0: the battery negative cable to frame is loose or corroded: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Good: power and earth are present, so the fault is in a shared connector or relay after the switch. On the K-Light 125, the FI lamp should light at key on if the injection system has power (PDF p. 269). Follow [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

**7. Alarm, tracker or immobiliser fitted?** Many aftermarket alarms cut the ignition feed. If the bike works with the alarm bypassed by its installer, the alarm is faulty: [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Flat or dead battery | Low voltage at posts | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Loose or corroded battery terminal | Lower voltage at clamp than post | [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean) |
| Blown main fuse | Meter test | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Failed ignition switch | Feed in, no output | [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test) |
| Main earth loose | Low voltage to frame | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Alarm or immobiliser cutting power | Works with alarm bypassed | [Wire an accessory safely](/moto-zero/repair/repairs/accessory-wiring) |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Main fuse | 20 A | PDF p. 278 |
| Ignition switch ON connections | red/white 1 to red; red/white to orange/blue | PDF p. 102 |
