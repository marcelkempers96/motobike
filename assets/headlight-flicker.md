---
id: headlight-flicker
title: Headlight flickers
system: lighting
also_called: [headlight goes on and off, light pulses with revs, light cuts out on bumps]
urgency: ride-with-care
applies_to: [all]
parts: [wiring, earth_strap, headlight, handlebar_switches, regulator, battery]
repairs: [connector-clean, earth-clean, bulb-replace, switch-clean, wiring-fault-find, charging-system-test, regulator-test, voltage-drop-test]
related: [intermittent-electrical, overcharging, dim-lights-idle, wet-connectors, headlight-dim, bulbs-blow-often]
sources:
  - {doc: "K-Light 125 manual", page: 40}
  - {doc: "K-Light 125 manual", page: 43}
  - {doc: "K-Light 125 manual", page: 76}
  - {doc: "K-Light 125 manual", page: 78}
  - {doc: "HELLA Tech World: CAN bus and vehicle lighting", url: "https://www.hella.com/techworld/sg/lounge/can-bus-vehicle-lighting-bulb-replacement-workshop"}
---

# Headlight flickers

The headlight goes dark and bright again, either over bumps, when you steer, or as the engine speed changes. A flicker on bumps or steering is almost always a loose connection: bulb holder, plug, switch or earth. A flicker that follows engine speed points to the charging system. A fast, even flicker that started after fitting an LED bulb is usually the LED itself.

## Is it safe to ride?
With care, by day. A light that goes out at night is dangerous, and a loose connection can get worse quickly. Fix it before riding in the dark.

## Quick checks first
- Does it flicker over bumps, when you turn the bars, or with engine speed?
- Do other lights flicker too? All of them: suspect a shared earth, battery terminal or charging fault.
- Wiggle the headlight plug and the left switch while the light is on.
- Has an LED bulb been fitted recently?
- Did it start after rain or washing? See [Electrical faults after rain or washing](/moto-zero/repair/problems/wet-connectors).

## Diagnose it step by step

**1. Does the flicker follow bumps or steering?**
- Yes: go to step 2.
- No, it follows engine speed: go to step 5.
- No, it is a fast steady flicker after an LED bulb was fitted: go to step 7.

**2. Does wiggling the headlight plug or bulb make it flicker?** Light on, engine off if your headlight works without the engine.
- Yes: pull the plug, look for loose, green or burnt pins and a loose bulb in its holder. Clean and tighten them: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean). Check the bulb filament is not hanging loose: [Replace a bulb](/moto-zero/repair/repairs/bulb-replace).
- No: go to step 3.

**3. Does working the dip switch or turning the bars make it flicker?**
- Yes, at the switch: [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
- Yes, at full lock: the harness is broken where it bends at the steering head: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).
- No: go to step 4.

**4. Is the earth good?** Set the multimeter to DC volts (V with a straight line). Light on. Red probe on battery positive, black probe back-probed into the headlight earth wire. It should read close to battery voltage and stay steady while you wiggle the wiring.
- Reading jumps or is low: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Steady: check the battery terminals and other connectors with [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find). The K-Light manual lists loose battery wires and lighting circuit contact faults as causes of power that comes and goes (PDF p. 76).

**5. Does the battery voltage jump around with the engine running?** Meter on DC volts across the battery. Raise the revs slowly.
- The voltage should rise smoothly and then stay steady. K-Light 125: 14.5 ± 0.5 V at 5000 rpm (PDF p. 78).
- It jumps up and down, or goes too high: [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test) and see [Battery overcharges and bulbs blow](/moto-zero/repair/problems/overcharging).
- Steady but low at idle: see [Lights go dim at idle](/moto-zero/repair/problems/dim-lights-idle).
- Steady and correct: go back to step 4.

**6. Older bike with AC lighting?** On some kickstart and older bikes, lights run straight from the alternator (the K-Light chart separates AC and DC lighting, PDF p. 40). Some brightening with revs is normal. A light that flickers hard or blows bulbs points to the regulator: [Test the charging system](/moto-zero/repair/repairs/charging-system-test).

**7. LED bulb or LED headlight?** Cheap LED bulbs can flicker because their electronics do not suit the bike's supply. On CAN-bus bikes the control unit may also pulse the power to check the bulb, which some LEDs show as flicker. Refit the original approved bulb. If the flicker stops, the LED was the cause.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Loose or corroded headlight plug or bulb holder | Flickers when wiggled | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Dirty dip switch | Flickers when switch touched | [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean) |
| Poor earth or battery terminal | Jumping voltage on earth side | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Broken wire at steering head | Flickers at full lock | [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find) |
| Faulty regulator | Battery voltage unsteady with revs | [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test) |
| Incompatible LED bulb | Stops with original bulb | Refit approved bulb |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Charging voltage | 14.5 ± 0.5 V at 5000 rpm | PDF p. 78 |
