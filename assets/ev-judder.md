---
id: ev-judder
title: Bike judders or jerks when pulling away
system: ev-drive
also_called: [stutters from standstill, cogging, jerky start, shudder at low speed]
urgency: ride-with-care
applies_to: [electric]
parts: [motor_sensor, wiring, motor, controller, throttle_sensor, chain, rear_sprocket, cush_drive, axle]
repairs: [ev-hub-motor-check, ev-hall-sensor-check, ev-phase-connector-check, ev-error-read, ev-motor-diagnosis, ev-controller-diagnosis, cush-drive-check]
related: [ev-motor-noise, ev-throttle-dropout, ev-ready-no-drive, cush-drive-clunk, chain-tight-spots]
sources:
  - {doc: "em3ev: How to test e-bike motor Hall sensors", url: "https://em3ev.com/?p=43276"}
  - {doc: "Letrigo: How to test an e-bike motor", url: "https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor"}
---

# Bike judders or jerks when pulling away

When you pull away from a stop, the bike shakes, jerks or stutters instead of moving off smoothly. It may get better once you are moving. In an electric motor, the controller needs to know where the magnets are to push at the right moment. If a **Hall sensor** (position sensor), its cable, or a **phase connector** is faulty, the controller pushes at the wrong time and the motor jerks. em3ev lists jerking at start, stutter at low speed, growling, and starting only once the wheel is already moving as typical signs. Mechanical slack in the chain, belt, cush drive or a loose axle can feel similar.

## Is it safe to ride?
Ride with care, gently, to the workshop. Judder at junctions can make you stall in traffic. Stop if there is a burning smell.

## Quick checks first
- Is the throttle smooth, or does it catch?
- On a chain or belt bike: is the chain slack or tight in spots?
- Is the axle nut tight, and has the axle moved in its slot (hub motors)?
- Did it start after a fall, a puncture repair or riding through water?
- Any code?

## Diagnose it step by step

**1. Did it start right after the rear wheel was removed or the motor was unplugged?**
- Yes: the phase or Hall connectors may be loose, or joined in the wrong order. Workshop: [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check).
- No: go to step 2.

**2. Is the motor cable at the axle damaged, or is the axle loose?** Check with [Check hub motor bearings and play](/moto-zero/repair/repairs/ev-hub-motor-check).
- Yes: stop riding. A crushed cable or turning axle causes judder (em3ev). Workshop.
- No: go to step 3.

**3. On a chain or belt bike, is there slack, tight spots or a clunk when you rock the wheel?**
- Yes: see [Chain is tight in some places and slack in others](/moto-zero/repair/problems/chain-tight-spots) or [Clunk or snatch from the rear wheel](/moto-zero/repair/problems/cush-drive-clunk).
- No, or hub motor: go to step 4.

**4. Is there a Hall, position or motor code?** [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
- Yes: workshop: [Check motor position (Hall) sensors](/moto-zero/repair/repairs/ev-hall-sensor-check).
- No: go to step 5.

**5. Does the judder change when the motor cable or connector is moved gently (bike on stand, wheel free, workshop only)?**
- Yes: wiring or connector fault (em3ev).
- No: the sensor inside the motor, the motor, or the controller is suspect. A shorted controller switch can also cause notchy running (Letrigo). Workshop: [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis) and [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).

*What happens if you keep riding:* a loose phase connector heats up and can melt, damaging the controller as well.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Damaged motor cable at axle | Visible damage, loose axle | Workshop; [Check hub motor bearings and play](/moto-zero/repair/repairs/ev-hub-motor-check) |
| Loose or wrong-order phase connector | After wheel work; heat marks | [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check) |
| Hall sensor connector or wire | Code; changes when cable moves | [Check motor position (Hall) sensors](/moto-zero/repair/repairs/ev-hall-sensor-check) |
| Chain, belt or cush drive slack | Clunk, slack | [Check the cush drive rubbers](/moto-zero/repair/repairs/cush-drive-check) |
| Failed Hall sensor inside motor | Harness good, signal stuck | [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis) |
| Controller fault | Motor tests good | [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis) |
