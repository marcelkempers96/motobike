---
id: ev-wheel-locked
title: Rear wheel is locked or very hard to push
system: ev-drive
also_called: [hub motor won't turn, wheel stuck, heavy to push electric, motor brakes itself]
urgency: do-not-ride
applies_to: [electric]
parts: [rear_brake, motor, controller, wheel_bearing, axle, wiring, chain]
repairs: [brake-drag-check, ev-hub-motor-check, ev-safe-isolation, ev-controller-diagnosis, ev-motor-diagnosis, chain-adjust]
related: [brake-drag, ev-ready-no-drive, ev-motor-noise, caliper-sticking, chain-tight-spots, ev-pack-hot-smell, chain-jumps]
sources:
  - {doc: "Letrigo: How to test an e-bike motor", url: "https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor"}
  - {doc: "em3ev: How to test e-bike motor Hall sensors", url: "https://em3ev.com/?p=43276"}
---

# Rear wheel is locked or very hard to push

The bike is very hard to push or the rear wheel will not turn at all. There are two very different kinds of cause. **Mechanical**: a seized brake, a jammed chain, broken bearings or something caught in the wheel. **Electrical**: in a hub or direct-drive motor, if two or three phase wires are shorted together (for example by a failed controller switch, a crushed cable or a melted connector), the motor acts as a brake and resists turning. Some bikes also hold the wheel on purpose (hill hold or park mode). This page keeps these separate, because the fixes and dangers differ.

## Is it safe to ride?
No. A wheel that locks or drags heavily can throw you off, and an electrical short can overheat and start a fire. Do not tow or push the bike fast.

## Quick checks first
- Switch off and remove the key. Is park, hill hold or an alarm lock active? Check the manual.
- Is the brake lever or pedal stuck on? Is the brake disc or drum hot?
- Is anything caught in the wheel, chain or belt?
- Any burning smell, smoke or melted plastic near the motor cable or controller?

## Diagnose it step by step

**1. Is there smoke, a burning smell or melted plastic?**
- Yes: switch off, move away, keep people away. If it smokes from the battery area: [Battery pack is hot, hissing or smells](/moto-zero/repair/problems/ev-pack-hot-smell). Otherwise call the workshop and do not power it on again.
- No: go to step 2.

**2. With the bike off, is a lock, park or hill-hold feature on?**
- Yes: release it as your manual says.
- No: go to step 3.

**3. Is the brake dragging?** Pull and release the lever, check the disc or drum is not hot. [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check).
- Yes: see [Brake drags and the wheel does not spin freely](/moto-zero/repair/problems/brake-drag).
- No: go to step 4.

**4. On a chain or belt bike, is the chain jammed, off the sprocket, or far too tight?**
- Yes: see [Chain jumps teeth or comes off the sprockets](/moto-zero/repair/problems/chain-jumps).
- No: go to step 5.

**5. Does the wheel grind or feel rough, or is there wheel play?** [Check hub motor bearings and play](/moto-zero/repair/repairs/ev-hub-motor-check).
- Yes: failed bearings or internal motor damage. Workshop.
- No, it turns smoothly but very stiffly or "cogs" strongly: go to step 6.

**6. Workshop test: with the HV system isolated and the motor phase wires unplugged from the controller, does the wheel turn freely?**
This test must be done by a trained technician after [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
- Turns freely when unplugged: the controller or phase cable has a short. [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).
- Still stiff: shorted windings or mechanical damage inside the motor. Letrigo notes that a near-zero reading between phases points to a winding short. [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Park, hill hold or alarm lock | Symbol on dash; manual | Release as manual says |
| Brake dragging or seized | Disc or drum hot; lever stiff | [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check) |
| Chain or belt jammed | Visible | [Check and adjust chain slack](/moto-zero/repair/repairs/chain-adjust) |
| Seized bearings | Grinding, play | [Check hub motor bearings and play](/moto-zero/repair/repairs/ev-hub-motor-check) |
| Shorted controller output or phase cable | Wheel frees when phases unplugged (workshop) | [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis) |
| Shorted motor winding | Still stiff when unplugged | [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis) |
