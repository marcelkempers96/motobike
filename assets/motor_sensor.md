---
id: motor_sensor
name: Motor position sensor
category: ev
aliases: [Hall sensor, rotor position sensor, resolver]
applies_to: [electric]
sources:
  - {doc: "Microchip: Hall effect sensors in BLDC motors", url: "https://onlinedocs.microchip.com/oxy/GUID-0607E6C7-3E40-4169-A33F-0462792573CC-en-US-7/GUID-A9C9E99B-6C79-47B8-A57C-25636DE6BD8C.html"}
  - {doc: "Grin Technologies (ebikes.ca): hub motors", url: "https://www.ebikes.ca/learn/hub-motors.html"}
---

# Motor position sensor

The motor position sensor tells the controller where the motor's magnets are. In most commuter hub motors it is a set of small Hall effect sensors glued into the stator inside the motor. Some motors use a resolver or encoder instead. A thin multi-wire cable runs with the phase wires out through the axle.

## What it does
Each Hall sensor switches its output high or low as a magnet passes. From these signals the controller knows which winding to power next, so the motor starts smoothly and turns in the right direction. If one sensor fails or a sensor wire breaks, the controller gets the timing wrong. The motor may judder, growl, pull weakly, run only after a push, or not start, and the controller may show a sensor error.

## Signs it is worn or failing
- Judder or shake when pulling away: [Bike judders when pulling away](/moto-zero/repair/problems/ev-judder).
- Growling or rough motor: [Noise from the motor](/moto-zero/repair/problems/ev-motor-noise).
- Ready but no drive, or drive only after a push: [Bike shows ready but will not move](/moto-zero/repair/problems/ev-ready-no-drive).
- Sensor fault code: [Error code on the dashboard](/moto-zero/repair/problems/ev-error-code).
- After water: [Bike has been in a flood](/moto-zero/repair/problems/ev-water-exposure).

## When to replace it
Check the sensor connector and cable first; damage where the cable leaves the axle is common. Sensors inside the motor are replaced only by a workshop that can open the motor safely; the magnets are very strong.

## What to match when buying
- The exact sensor type for the motor (Hall sensor part code, or resolver model). Sensor spacing in the motor must match what the controller expects.
- Buy as part of a motor service kit from the maker where possible.

## Fitting notes
- Workshop job: [Check motor position (Hall) sensors](/moto-zero/repair/repairs/ev-hall-sensor-check).
- Also check phase connectors: [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check).
- Isolate first: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
