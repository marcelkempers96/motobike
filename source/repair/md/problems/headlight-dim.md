---
id: headlight-dim
title: Headlight is dim
system: lighting
also_called: [weak headlight, poor night vision, yellow headlight]
urgency: ride-with-care
applies_to: [all]
parts: [headlight, battery, earth_strap, wiring, handlebar_switches, regulator, stator]
repairs: [headlight-aim, bulb-replace, battery-test-charge, voltage-drop-test, earth-clean, connector-clean, switch-clean, charging-system-test]
related: [dim-lights-idle, not-charging, headlight-flicker, battery-flat, headlight-out]
sources:
  - {doc: "K-Light 125 manual", page: 43}
  - {doc: "K-Light 125 manual", page: 59}
  - {doc: "K-Light 125 manual", page: 78}
  - {doc: "K-Light 125 manual", page: 98}
  - {doc: "HELLA Tech World: CAN bus and vehicle lighting", url: "https://www.hella.com/techworld/sg/lounge/can-bus-vehicle-lighting-bulb-replacement-workshop"}
---

# Headlight is dim

The headlight works, but it does not light the road well. It may look yellow, or the beam may fall short. The cause is either the light itself (old bulb, wrong bulb, dirty or yellowed lens, beam aimed too low) or the electricity reaching it (low battery or charging voltage, a dirty switch, connector or earth that wastes voltage).

## Is it safe to ride?
By day, yes. At night, ride slowly and only if you can see clearly. Fix it soon: a dim light also makes you harder to see.

## Quick checks first
- Clean the lens. Look for yellowing, cracks, water or dirt inside.
- Is it dim all the time, or only at idle? Only at idle: see [Lights go dim at idle](/moto-zero/repair/problems/dim-lights-idle).
- Are the indicators and horn also weak? Then suspect the battery or charging first (K-Light fault chart, PDF p. 43).
- Has someone fitted an LED bulb in a lamp made for a halogen bulb? These often give a poor, scattered beam.
- Is the bike loaded heavily at the back or has the rear suspension been changed? The beam may point too low.

## Diagnose it step by step

**1. Is the beam pointing at the road correctly?** Check against a wall: [Aim the headlight](/moto-zero/repair/repairs/headlight-aim).
- Too low: adjust it. If it is now bright enough, you are done.
- Correct: go to step 2.

**2. Is the bulb old, blackened or the wrong type?** Remove it ([Replace a bulb](/moto-zero/repair/repairs/bulb-replace)). The K-Light fault chart lists a black or yellow-green bulb glass and a bulb of the wrong wattage (PDF p. 43). K-Light 125 bulb type: H4 (PDF p. 98).
- Glass dark, or wattage lower than specified, or a non-approved LED bulb: fit the correct new bulb.
- Bulb is correct and clear: go to step 3.

**3. Is the battery voltage good?** Engine off, headlight off. Set the multimeter to DC volts (V with a straight line), 20 V range. Red probe on battery positive (+), black probe on battery negative (-).
- Low (K-Light 125: 12.3 V or less after an hour of rest means it needs charging, PDF p. 59): [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Good: go to step 4.

**4. Is the charging voltage good?** Engine running, revs raised. Same meter connection.
- The voltage should rise above the resting battery voltage. K-Light 125: 14.5 ± 0.5 V at 5000 rpm (PDF p. 78). Other bikes: use your manual.
- Too low: go to [Test the charging system](/moto-zero/repair/repairs/charging-system-test) and [Battery is not charging while riding](/moto-zero/repair/problems/not-charging).
- Good: go to step 5.

**5. Does the headlight get the full voltage?** Engine running, headlight on. Meter on DC volts. Back-probe the headlight plug: red probe on the low beam pin, black probe on the earth pin. Compare with the reading across the battery.
- Much lower than at the battery: voltage is being lost in the wiring. Go to step 6.
- About the same: the bulb, reflector or lens is the problem. A burnt or peeling reflector, or a crazed lens, needs a new headlight unit.

**6. Where is the voltage lost?** Do [Do a voltage drop test](/moto-zero/repair/repairs/voltage-drop-test) on the power side and the earth side.
- Earth side loses most: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Power side loses most: test across the dip switch ([Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean)), the headlight relay and each connector ([Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean)).

**What about LED conversions?** An LED bulb in a halogen reflector puts the light in the wrong place, so the beam can be dim on the road and dazzling to others. In many countries this is not road legal. Go back to the approved bulb or fit a complete headlight approved for LED. On CAN-bus bikes, a non-approved LED may also cause flicker or warnings.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Beam aimed too low | Wall check | [Aim the headlight](/moto-zero/repair/repairs/headlight-aim) |
| Old, blackened or wrong bulb | Dark glass, wrong wattage or type | [Replace a bulb](/moto-zero/repair/repairs/bulb-replace) |
| Dirty, yellowed or cracked lens or reflector | Visual | Clean, or replace headlight unit |
| Low battery or low charging voltage | Meter at battery | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge), [Test the charging system](/moto-zero/repair/repairs/charging-system-test) |
| Voltage lost in earth, switch or connector | Voltage drop test | [Do a voltage drop test](/moto-zero/repair/repairs/voltage-drop-test) |
| LED bulb in halogen lamp | Scattered, patchy beam | Refit approved bulb |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Battery needs charging (after 1 hour rest) | 12.3 V | PDF p. 59 |
| Charging voltage | 14.5 ± 0.5 V at 5000 rpm | PDF p. 78 |
| Headlight bulb | H4 | PDF p. 98 |
