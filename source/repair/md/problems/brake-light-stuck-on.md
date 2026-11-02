---
id: brake-light-stuck-on
title: Brake light stays on
system: lighting
also_called: [stop light always on, brake light on without braking]
urgency: ride-with-care
applies_to: [all]
parts: [brake_light_switch, levers, rear_brake, tail_light, wiring]
repairs: [brake-switch-test, lever-service, rear-pedal-adjust, brake-drag-check, bulb-replace, lighting-circuit-test]
related: [battery-flat, brake-drag, brake-light-dead, parasitic-drain, lever-damaged]
sources:
  - {doc: "K-Light 125 manual", page: 36}
  - {doc: "K-Light 125 manual", page: 67}
  - {doc: "K-Light 125 manual", page: 99}
  - {doc: "K-Light 125 manual", page: 116}
---

# Brake light stays on

The brake light is on even though you are not braking. Drivers behind cannot tell when you really slow down, and the light drains the battery: the K-Light manual lists a brake light stuck on as a cause of an undercharged battery (PDF p. 36). Usually the front lever or rear pedal is not returning fully, a switch is stuck closed, or the rear switch is adjusted too tight. Sometimes the brake itself is dragging.

## Is it safe to ride?
With care, for a short trip to fix it. First make sure the brake is not dragging: spin each wheel by hand on the stand. If a wheel is hard to turn or the brake is hot after a short ride, do not ride: see [Brake drags and the wheel does not spin freely](/moto-zero/repair/problems/brake-drag).

## Quick checks first
- Push the front lever and rear pedal fully back to rest by hand. Does the light go off?
- Unplug the front switch, then the rear switch, one at a time. Which one turns the light off?
- Is the light only faint (not full brightness)? Then it may be a tail light that looks bright, a twin bulb fitted the wrong way, or an LED unit.
- Was the rear brake pedal or chain adjusted recently? Moving the wheel or pedal can pull the switch spring.

## Diagnose it step by step

**1. Does the light go off when you unplug the front switch?**
- Yes: the front switch is stuck closed, or the lever is not returning. Go to step 2.
- No: plug it back and go to step 3.

**2. Does the front lever return fully?** Check for a bent lever, a dry pivot, a sticky master cylinder or a lever adjuster set too far out.
- Lever sticky or bent: [Service brake and clutch lever pivots](/moto-zero/repair/repairs/lever-service), and see [Brake or clutch lever is loose, bent or broken](/moto-zero/repair/problems/lever-damaged).
- Lever returns well: the switch is faulty. Set the multimeter to continuity (beep). Switch unplugged, lever released: it must not beep. If it beeps, replace the switch: [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test).

**3. Does the light go off when you unplug the rear switch?**
- Yes: go to step 4.
- No: go to step 5.

**4. Is the rear pedal resting in its normal position?** Check the pedal return spring and the pedal height. On a disc brake, the pedal push rod must not hold the master cylinder piston in (on the K-Light 125, the manual sets a 0 to 0.2 mm gap between push rod and piston, PDF p. 116).
- Pedal sits low or spring is weak: [Adjust the rear brake pedal](/moto-zero/repair/repairs/rear-pedal-adjust).
- Pedal is correct: the switch is adjusted too tight or stuck. Adjust or replace it: [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test).

**5. Light stays on with both switches unplugged?** Then power reaches the brake filament another way.
- Check the bulb. A twin bulb (K-Light 125: P21/5W, PDF p. 99) has offset pins so it fits one way only; if forced in wrongly, the brake filament lights with the tail light. Refit it correctly: [Replace a bulb](/moto-zero/repair/repairs/bulb-replace).
- Check for melted insulation joining the tail light wire and the brake light wire, often near the lamp or under the seat: [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test).
- Check any accessory, alarm or LED kit wired into the brake light circuit.

**6. Is the brake dragging?** If the light was on because the brake was applied, check the brake: [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Front lever not returning | Light goes off when lever is pushed home | [Service brake and clutch lever pivots](/moto-zero/repair/repairs/lever-service) |
| Rear switch adjusted too tight | Light goes off when rear switch unplugged | [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test) |
| Switch stuck closed | Beeps with control released | [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test) |
| Pedal not returning or set low | Pedal rests low | [Adjust the rear brake pedal](/moto-zero/repair/repairs/rear-pedal-adjust) |
| Twin bulb fitted wrongly | Light on with both switches unplugged | [Replace a bulb](/moto-zero/repair/repairs/bulb-replace) |
| Tail and brake wires shorted together | Melted insulation | [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test) |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Rear brake push rod to master cylinder piston clearance | 0 to 0.2 mm | PDF p. 116 |
| Tail and brake bulb | P21/5W | PDF p. 99 |
