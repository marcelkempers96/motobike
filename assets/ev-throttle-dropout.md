---
id: ev-throttle-dropout
title: Power cuts in and out with the throttle
system: ev-drive
also_called: [power cuts on bumps, on-off power, throttle not smooth, intermittent drive]
urgency: ride-with-care
applies_to: [electric]
parts: [throttle_sensor, wiring, traction_battery, interlock_switches, brake_light_switch, side_stand, controller, motor_sensor]
repairs: [ev-swap-contact-check, ev-interlock-check, ev-error-read, ev-phase-connector-check, ev-controller-diagnosis, connector-clean]
related: [ev-cuts-out-accel, ev-bms-cutoff, ev-judder, intermittent-electrical, wet-connectors, side-stand-weak]
sources:
  - {doc: "em3ev: How to test e-bike motor Hall sensors", url: "https://em3ev.com/?p=43276"}
  - {doc: "Gogoro Smart Battery and GoStation safety information", url: "https://gogoro.com/product-information"}
---

# Power cuts in and out with the throttle

While riding, drive power stops and starts by itself, even with the throttle held steady. It may happen over bumps, when you turn the handlebar, in rain, or randomly. An on-off fault like this is usually a loose connection somewhere in the chain from battery to motor: battery contacts, throttle wire, a brake or stand switch, or a connector. em3ev notes that a fault that changes when the cable moves points to wiring.

## Is it safe to ride?
Ride with care only to get off the road. Losing drive in traffic is dangerous. Do not carry passengers or ride on fast roads until fixed.

## Quick checks first
- Is the battery fully home and latched? A loose swap battery can lose contact over bumps.
- Does the brake light flicker while riding? A brake switch touching on and off cuts drive on many bikes.
- Is the side stand fully up and its spring strong?
- Does it happen when you turn the bars? Note it.
- Any code or symbol when it cuts?

## Diagnose it step by step

**1. Does it cut mainly over bumps or potholes?**
- Yes: check the battery contacts and latch: [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check). On a fixed battery, the main connector may be loose: workshop.
- No: go to step 2.

**2. Does it cut when you turn the handlebar to one side?**
- Yes: the throttle or switch wiring is pinched or stretched at the steering head. See step 7 of [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check).
- No: go to step 3.

**3. Does the brake light or stand symbol flicker when it cuts?**
- Yes: the switch is touching on and off. [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check). See also [Side stand spring is weak or the stand is loose](/moto-zero/repair/problems/side-stand-weak).
- No: go to step 4.

**4. Does it happen only in rain or after washing?**
- Yes: water in a connector. See [Electrical faults after rain or washing](/moto-zero/repair/problems/wet-connectors). Do not pressure-wash the bike.
- No: go to step 5.

**5. Does it cut when you accelerate hard or climb, and the SoC also drops sharply?**
- Yes: this is battery or controller protection, not a loose wire. Go to [Power cuts out when accelerating hard](/moto-zero/repair/problems/ev-cuts-out-accel).
- No: go to step 6.

**6. Is a code stored?** [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
- Throttle code: throttle sensor or its wire. Workshop: [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).
- Hall or motor code, or judder: [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check).
- No code: workshop, with notes of when it happens.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Swap battery loose or dirty contacts | Cuts on bumps | [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check) |
| Brake or stand switch intermittent | Brake light or symbol flickers | [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check) |
| Throttle wire pinched at steering | Cuts at full lock | [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check) |
| Wet connector | Only in rain | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Loose phase or main connector | Judder, code, heat marks | [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check) |
| Throttle sensor or controller fault | Throttle code | [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis) |
