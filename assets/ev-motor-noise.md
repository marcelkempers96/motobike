---
id: ev-motor-noise
title: Grinding, clicking or growling from the motor
system: ev-drive
also_called: [hub motor noise, motor whine, clicking wheel, rumbling motor]
urgency: ride-with-care
applies_to: [electric]
parts: [wheel_bearing, motor, motor_sensor, axle, rear_brake, chain, rear_sprocket, controller]
repairs: [ev-hub-motor-check, brake-drag-check, ev-hall-sensor-check, ev-motor-diagnosis, ev-error-read, chain-wear-check]
related: [ev-judder, ev-wheel-locked, wheel-bearing-noise, brake-grinding, chain-noise]
sources:
  - {doc: "Letrigo: How to test an e-bike motor", url: "https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor"}
  - {doc: "em3ev: How to test e-bike motor Hall sensors", url: "https://em3ev.com/?p=43276"}
---

# Grinding, clicking or growling from the motor

A new noise comes from the motor area: grinding, rumbling, clicking, scraping or a growl. Electric motors are normally quiet, with a soft whine under power. The key question is whether the noise follows **wheel speed** (heard even when coasting with the power off) or **motor power** (only when you open the throttle). Noise that follows wheel speed is usually mechanical: bearings, brake, chain or something rubbing. Noise only under power is often electrical: a Hall sensor or phase fault makes the motor growl (em3ev).

## Is it safe to ride?
Ride with care to the workshop if the noise is mild. Stop riding if you hear loud grinding, the wheel wobbles, or you smell burning.

## Quick checks first
- Coast with the throttle closed: does the noise continue?
- Is anything caught in the wheel (string, wire, plastic bag)?
- Is the brake dragging? Is the wheel hot near the brake?
- On a chain bike: is the chain dry or slack?

## Diagnose it step by step

**1. Do you still hear the noise when coasting with the throttle closed (or pushing the bike with power off)?**
- Yes: mechanical. Go to step 2.
- No, only under power: go to step 5.

**2. Is something rubbing: brake, mudguard, tyre, debris?** Spin the wheel by hand on the stand.
- Yes: remove debris; for brakes see [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check).
- No: go to step 3.

**3. Is there play when you rock the wheel, or a rumble that rises with speed?** [Check hub motor bearings and play](/moto-zero/repair/repairs/ev-hub-motor-check).
- Yes: worn bearings (Letrigo). Hub motor bearings are a workshop job. Compare [Rumbling or grinding from a wheel](/moto-zero/repair/problems/wheel-bearing-noise).
- No: go to step 4.

**4. On a chain or belt drive, is the chain dry, rusty, slack or the sprocket worn?**
- Yes: see [Chain is noisy, clattering or slapping](/moto-zero/repair/problems/chain-noise).
- No: workshop. A geared hub motor can have worn internal gears or clutch; this needs opening by the dealer.

**5. Does the motor growl or stutter mainly when starting from a stop?**
- Yes: Hall sensor or phase fault (em3ev). Go to [Bike judders or jerks when pulling away](/moto-zero/repair/problems/ev-judder).
- No: go to step 6.

**6. Is it a high whine or buzzing that is new or much louder than before?**
- Yes: can be a controller setting, a failing controller or a motor winding fault. Read codes: [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read), then workshop: [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis).

*What happens if you keep riding with bad bearings:* the motor shell can rub on the stator and destroy the motor, which costs far more than bearings.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Debris or rubbing part | Visible when spinning wheel | Remove it |
| Brake dragging | Wheel slows quickly, brake warm | [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check) |
| Worn wheel or motor bearings | Rumble with speed; play | [Check hub motor bearings and play](/moto-zero/repair/repairs/ev-hub-motor-check) |
| Chain or sprocket wear | Noise from drive side | [Check the chain for wear](/moto-zero/repair/repairs/chain-wear-check) |
| Hall or phase fault | Growl under power at start | [Check motor position (Hall) sensors](/moto-zero/repair/repairs/ev-hall-sensor-check) |
| Internal motor damage | All above good | [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis) |
