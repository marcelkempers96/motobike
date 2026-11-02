---
id: all-lights-out
title: All lights stop working
system: lighting
also_called: [no lights at all, lights and indicators dead, whole lighting system dead]
urgency: do-not-ride
applies_to: [all]
parts: [fuse, battery, ignition_switch, wiring, earth_strap, regulator, stator]
repairs: [fuse-relay-check, battery-test-charge, battery-terminal-clean, ignition-switch-test, short-circuit-find, earth-clean, wiring-fault-find, charging-system-test, lighting-circuit-test]
related: [no-power-key-on, fuse-keeps-blowing, battery-flat, not-charging, headlight-out, dim-lights-idle, ev-aux-battery-flat, burning-smell-wiring]
sources:
  - {doc: "K-Light 125 manual", page: 40}
  - {doc: "K-Light 125 manual", page: 41}
  - {doc: "K-Light 125 manual", page: 59}
  - {doc: "K-Light 125 manual", page: 76}
  - {doc: "K-Light 125 manual", page: 278}
  - {doc: "MAVCC Motorcycle Mechanic", page: 292}
---

# All lights stop working

The headlight, tail light, brake light and indicators are all dark at the same time. When everything fails together, the bulbs are rarely the cause. Look at what they share: the battery, the main fuse, the ignition switch, a main connector or the earth. On some older kickstart bikes the lights run straight from the alternator, so the charging coil or regulator can also be the cause.

## Is it safe to ride?
No. Without lights, brake light and indicators other road users cannot see you or know what you are doing. Do not ride until it is fixed, except to push or move the bike off the road.

## Quick checks first
- Does the horn work, and does the dashboard light up with the key on? If nothing works at all, go to [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on).
- Is the engine running? Some bikes light the headlight only with the engine on, and some older bikes power all lights from the alternator.
- Has anything been fitted recently: an alarm, tracker, phone charger or LED lights?
- Burning smell? Key off, then [Burning smell from the wiring](/moto-zero/repair/problems/burning-smell-wiring).
- Electric motorcycle: the lights run from the small 12 V system. Go to [Small 12 V battery is flat](/moto-zero/repair/problems/ev-aux-battery-flat).

## Diagnose it step by step

**1. With the key on, do the horn and indicators work?** (This is the first check in the K-Light fault chart, PDF p. 40.)
- Yes: the battery and main feed are fine. Go to step 5.
- Both are weak or dead: go to step 2.

**2. Is the battery charged?** Set a multimeter to DC volts (the V with a straight line), 20 V range. Put the red probe on the battery positive (+) terminal and the black probe on the negative (-) terminal.
- Low (K-Light 125: 12.3 V or less after an hour of rest needs charging, PDF p. 59): [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge), then [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat).
- Reading is good: go to step 3.

**3. Is the main fuse good?** Test it with the meter, not by eye: [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check). The K-Light 125 main fuse is 20 A (PDF p. 278).
- Blown: fit one new fuse of the same rating. If it blows again, do not fit another: go to [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing).
- Good: go to step 4.

**4. Does power come out of the ignition switch?** Key on. Meter on DC volts, black probe on battery negative, red probe back-probed into the switch output wire (push a thin pin into the back of the connector along the wire; do not pierce it).
- No voltage, but voltage on the feed wire: the switch has failed: [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test).
- No voltage on the feed wire either: the wire or connector between battery and switch is broken: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).
- Voltage present: go to step 5.

**5. Do the lights come on only when the engine runs, and are they still dead then?**
- Your bike has AC lighting fed by the alternator, or a headlight relay that waits for the engine to run. Test the lighting coil and regulator: [Test the charging system](/moto-zero/repair/repairs/charging-system-test).
- Lights are DC (battery) lights and still dead: go to step 6.

**6. Is the earth good?** Many lamps share one earth point near the headlight or under the seat. Meter on DC volts, headlight switched on: red probe on battery positive, black probe on a lamp earth wire. Close to battery voltage means the earth is good.
- Low or 0: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Good: the fault is in a shared lighting fuse, relay, controller or connector. Halve the circuit on the wiring diagram (MAVCC PDF p. 292): [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test).

**7. Still dead with power and earth present?** On bikes where a lighting control unit or CAN-bus dashboard (a data network linking the control units) switches the lamps, a dealer must read its fault codes.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Flat battery or loose battery terminal | Low voltage; terminal moves by hand | [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean), [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Blown main or lighting fuse | No voltage on one side of the fuse | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Short circuit blowing the fuse | New fuse blows | [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find) |
| Poor shared earth | Voltage drop on earth side | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Ignition switch contacts | Feed in, no output | [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test) |
| AC lighting coil or regulator (older bikes) | Lights dead with engine running | [Test the charging system](/moto-zero/repair/repairs/charging-system-test) |
| Lighting relay or control unit | Power and earth good, relay does not click | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check), then dealer |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Battery needs charging at or below (after 1 hour rest) | 12.3 V | PDF p. 59 |
| Main fuse | 20 A | PDF p. 278 |
