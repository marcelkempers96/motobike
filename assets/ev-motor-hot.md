---
id: ev-motor-hot
title: Motor gets very hot or power drops after a long climb
system: ev-drive
also_called: [hub motor overheating, motor temperature warning, power fades on hills]
urgency: ride-with-care
applies_to: [electric]
parts: [motor, controller, rear_brake, rear_tyre, motor_sensor, wiring, chain]
repairs: [ev-thermal-check, brake-drag-check, tyre-pressure-check, ev-phase-connector-check, ev-motor-diagnosis, ev-error-read]
related: [ev-controller-hot, ev-limp-mode, ev-cuts-out-accel, brake-drag, power-fades-hot]
sources:
  - {doc: "Upway: Electric bike overheating causes and fixes", url: "https://upway.co/blogs/news/electric-bike-overheating-causes-and-fixes"}
  - {doc: "Letrigo: How to test an e-bike motor", url: "https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor"}
---

# Motor gets very hot or power drops after a long climb

After a long hill, a heavy load or a hot day, the motor is too hot to touch, a temperature warning appears, or power drops until the bike rests. Hub motors can build heat faster than they can lose it on steep, slow climbs with a heavy load (Upway). Most bikes protect the motor by reducing power, so the drop is a warning, not the fault itself. The goal is to find what is adding load or blocking cooling, and to check for an electrical fault that makes extra heat.

## Is it safe to ride?
Ride with care. Stop in a safe place, let the motor cool, then continue gently. Stop riding if you smell burning: a sharp burning smell can mean overheated winding insulation (Letrigo).

## Quick checks first
- Load: passenger plus cargo on steep hills?
- Tyre pressure low?
- Brake dragging (wheel hot near the brake)?
- Riding at full throttle at low speed up long hills?
- Motor covered in packed mud?

## Diagnose it step by step

**1. Is there a burning smell or smoke?**
- Yes: stop, switch off, let cool, do not ride. Workshop: [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis).
- No: go to step 2.

**2. Is the brake dragging?** [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check).
- Yes: fix the brake. A dragging brake makes the motor work hard and heats the hub.
- No: go to step 3.

**3. Are the tyres soft?** [Check tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check).
- Yes: pump to the correct pressure.
- No: go to step 4.

**4. Is the load or the route much harder than normal (heavy cargo, passenger, long steep climbs, very hot weather)?**
- Yes: this may be normal protection. Reduce load, use a lower power mode on long climbs, rest in shade. [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check).
- No, it happens on your normal route: go to step 5.

**5. Is the controller also hot, or is there a code?** [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
- Controller hot: see [Controller overheats or shuts down](/moto-zero/repair/problems/ev-controller-hot).
- Code or judder: a phase or Hall fault makes the motor work out of step and heat up. [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check).
- No: go to step 6.

**6. Did the problem start recently with no change in use?**
- Yes: workshop: [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis). Letrigo notes a winding imbalance can cause weak power and overheating.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Heavy load on long climbs | Only on hills with load | Lower mode, less load, rest |
| Brake dragging | Hub and brake hot | [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check) |
| Low tyre pressure | Gauge | [Check tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check) |
| Blocked cooling, mud packed | Visible | [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check) |
| Phase connector or Hall fault | Code, judder | [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check) |
| Winding fault | Workshop test | [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis) |
