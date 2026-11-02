---
id: headlight-out
title: Headlight does not work
system: lighting
also_called: [headlamp out, no headlight, low beam dead]
urgency: ride-with-care
applies_to: [all]
parts: [headlight, fuse, handlebar_switches, wiring, earth_strap]
repairs: [bulb-replace, fuse-relay-check, lighting-circuit-test, switch-clean, connector-clean, earth-clean, headlight-aim]
related: [high-beam-fault, all-lights-out, headlight-dim, bulbs-blow-often, headlight-flicker, fuse-keeps-blowing]
sources:
  - {doc: "K-Light 125 manual", page: 41}
  - {doc: "K-Light 125 manual", page: 68}
  - {doc: "K-Light 125 manual", page: 98}
  - {doc: "K-Light 125 manual", page: 105}
  - {doc: "K-Light 125 manual", page: 278}
---

# Headlight does not work

The headlight stays dark, but other lights such as the tail light and indicators still work. The usual cause is a blown bulb. If the bulb is good, the fault is in the switch, a fuse or relay, a connector inside the headlight shell, or the earth. Many modern bikes switch the headlight on only after the engine starts, and some have sealed LED headlights with no bulb to change.

## Is it safe to ride?
By day, with care, only if the law where you ride allows riding without a headlight. Do not ride at night or in rain or fog: you cannot see and others cannot see you.

## Quick checks first
- Start the engine. Does the headlight come on now? On many bikes, including those with a headlight relay like the K-Light 125 (PDF p. 278), this is normal.
- Try low beam, high beam and the flash (pass) button. If only one works, go to [High beam or flash does not work](/moto-zero/repair/problems/high-beam-fault).
- Is the front position light (small parking light) on? If yes, power reaches the headlight shell.
- Has the bike been dropped, washed with a pressure washer, or had the headlight removed recently?

## Diagnose it step by step

**1. Is the bulb broken?** Remove the bulb ([Replace a bulb](/moto-zero/repair/repairs/bulb-replace)). Look for a broken filament (the thin wire inside) or a black glass. The K-Light 125 uses an H4 bulb (PDF p. 98).
- Broken or black: fit a new bulb of the same type and wattage. If it works, also check [Aim the headlight](/moto-zero/repair/repairs/headlight-aim). If bulbs keep failing, see [Bulbs keep blowing](/moto-zero/repair/problems/bulbs-blow-often).
- Not sure: set the multimeter to continuity (beep symbol). Touch the probes to the bulb's pins for each filament. No beep means that filament is broken.
- Bulb is good: go to step 2.

**2. Is there power at the headlight plug?** Plug off the bulb. Key on, engine running if needed, low beam selected. Meter on DC volts (V with a straight line, 20 V range). Black probe on bare frame metal. Red probe on each pin in the plug.
- Close to battery voltage on the low beam pin: power is arriving. Go to step 3.
- 0 on all pins: go to step 4.

**3. Is the earth good?** Red probe on the battery positive, black probe on the earth pin of the headlight plug (usually the black wire).
- Close to battery voltage: earth is good. The bulb holder contacts are bad: clean or replace them with [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- Low or 0: the earth wire or earth point is bad: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).

**4. Is the headlight fuse or relay good?** Use [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
- Fuse blown: replace once. If it blows again, see [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing).
- Relay does not click: test or swap it as on that page.
- Both good: go to step 5.

**5. Does the light switch work?** Key off. Unplug the left switch connector. Meter on continuity. On the K-Light 125, low beam joins light blue and yellow (PDF p. 105). Select low beam and probe those two wires.
- No beep: [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
- Beep: the wire between switch and lamp is broken, often inside the headlight shell. Use [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test). The K-Light fault chart uses the same order: power into the switch, through the switch, then switch to lamp (PDF p. 41).

**6. LED headlight unit with power and earth good?** The LED unit or its driver has failed. Replace the unit. On CAN-bus bikes, a dealer can read whether the lighting control unit has switched it off.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Blown bulb filament | Broken filament, no continuity | [Replace a bulb](/moto-zero/repair/repairs/bulb-replace) |
| Headlight only works with engine running (normal on some bikes) | Comes on after starting | None needed |
| Corroded bulb holder or connector | Power at plug but bad contact | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Blown fuse or failed relay | Meter test | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Dirty light or dip switch | No continuity in switch position | [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean) |
| Poor earth | Voltage drop on earth side | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Failed LED unit or control unit | Power and earth good, still dark | Replace unit, or dealer diagnosis |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Headlight bulb | H4 | PDF p. 98 |
| Low beam switch contacts | light blue to yellow | PDF p. 105 |
