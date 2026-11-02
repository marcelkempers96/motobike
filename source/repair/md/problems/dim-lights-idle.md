---
id: dim-lights-idle
title: Lights go dim at idle
system: charging
also_called: [headlight dims at idle, lights fade at low revs, lights brighten with revs, weak lights when stopped]
urgency: ride-with-care
applies_to: [electric-start, kickstart, fuel-injected, carburettor]
parts: [battery, regulator, stator, headlight, earth_strap, wiring]
repairs: [battery-test-charge, charging-system-test, earth-clean, stator-test, regulator-test, lighting-circuit-test, carb-idle-adjust]
related: [headlight-dim, not-charging, battery-flat, headlight-flicker, stalls-at-idle]
sources:
  - {doc: "K-Light 125 manual", page: 43}
  - {doc: "K-Light 125 manual", page: 49}
  - {doc: "K-Light 125 manual", page: 78}
  - {doc: "K-Light 125 manual", page: 80}
---

# Lights go dim at idle

At traffic lights the headlight and dashboard go dim, then brighten as you open the throttle. The generator makes less power at low engine speed, so at idle the battery supplies some of the load. A small dimming is normal on many small bikes, especially older ones whose lights run straight from the generator (AC lighting). Strong dimming with a battery-powered (DC) system means the battery is weak, the charging output is low, the idle is too slow, or a poor earth is wasting voltage. The K-Light 125 fault chart for weak lights lists low charging coil output, low regulated voltage, wiring shorts, wrong bulb wattage, blackened bulbs and poor switch, connector and earth contacts (PDF page 43).

## Is it safe to ride?
With care. Being seen matters most at junctions, which is exactly where the lights dim. Fix it before riding at night.

## Quick checks first
- Is the idle speed correct? K-Light 125: 1500 ± 100 rpm.
- Have brighter or extra lamps been fitted? Is the bulb wattage the one your manual names?
- Is the bulb glass blackened inside?
- Are the battery terminals tight?

## Diagnose it step by step

**1. Is the idle speed correct?**
- No, too low: set it. Carburettor: [Adjust carburettor idle speed and mixture](/moto-zero/repair/repairs/carb-idle-adjust). Fuel-injected idle is set by the ECU: see [Engine stalls at idle or at junctions](/moto-zero/repair/problems/stalls-at-idle).
- Yes: go to step 2.

**2. Have extra lamps or higher wattage bulbs been fitted?**
- Yes: the generator may not supply them at idle. Refit the standard bulbs, or change to LED bulbs made for your bike.
- No: go to step 3.

**3. Is the battery charged and in good condition?**
- No: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Yes: go to step 4.

**4. Does the charging voltage reach the manual's range at test speed? (K-Light 125: 14.5 ± 0.5 V at 5000 rpm; a small drop with lights on is normal)**
- No: [Battery is not charging while riding](/moto-zero/repair/problems/not-charging).
- Yes: go to step 5. Use [Test the charging system](/moto-zero/repair/repairs/charging-system-test).

**5. Is the voltage at the headlight connector much lower than at the battery?**
- Yes: a poor earth, switch or connector. [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean), [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test).
- No: go to step 6.

**6. Does the stator read evenly on all three pairs? (K-Light 125: 0.8 ± 0.3 Ω at 20 °C)**
- No: one weak coil lowers output at idle. [Test the stator (generator coils)](/moto-zero/repair/repairs/stator-test).
- Yes: the dimming is probably normal for the bike. Compare with another bike of the same model.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Idle too low | Rev counter below spec | [Adjust carburettor idle speed and mixture](/moto-zero/repair/repairs/carb-idle-adjust) |
| Extra or higher wattage lamps | Non-standard bulbs or accessories | Refit standard bulbs |
| Weak battery | Low voltage; slow cranking | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Poor earth or connector | Voltage lost before the lamp | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Low charging output | Voltage below range | [Test the charging system](/moto-zero/repair/repairs/charging-system-test) |
| Weak stator coil | Uneven resistance | [Test the stator (generator coils)](/moto-zero/repair/repairs/stator-test) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Idle speed | 1500 ± 100 rpm | 49 |
| Charging voltage | 14.5 ± 0.5 V at 5000 rpm | 78 |
| Stator charging coil | 0.8 ± 0.3 Ω at 20 °C | 80 |
