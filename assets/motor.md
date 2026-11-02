---
id: motor
name: Electric motor
category: ev
aliases: [hub motor, mid-drive motor, BLDC motor, traction motor]
applies_to: [electric]
sources:
  - {doc: "Grin Technologies (ebikes.ca): hub motors", url: "https://www.ebikes.ca/learn/hub-motors.html"}
  - {doc: "Levy Electric: how electric bike motors work", url: "https://www.levyelectric.com/resources/understanding-the-mechanics-how-electric-bike-motors-power-your-ride"}
  - {doc: "Microchip: Hall effect sensors in BLDC motors", url: "https://onlinedocs.microchip.com/oxy/GUID-0607E6C7-3E40-4169-A33F-0462792573CC-en-US-7/GUID-A9C9E99B-6C79-47B8-A57C-25636DE6BD8C.html"}
---

# Electric motor

The motor drives the rear wheel. Most electric commuter bikes and scooters use a hub motor built into the rear wheel. Others use a mid-drive motor mounted in the frame that drives the wheel by chain or belt. Three thick phase wires connect it to the [Motor controller](/moto-zero/repair/parts/controller), and a thin cable carries signals from the [Motor position sensor](/moto-zero/repair/parts/motor_sensor) and a temperature sensor.

## What it does
Most are brushless permanent magnet motors. Copper windings (the stator) and strong magnets (the rotor) sit close together. The controller sends current through the windings in turn, which makes a turning magnetic field that pulls the magnets round. In a direct-drive hub the windings are fixed on the axle and the magnet ring turns with the wheel. Geared hubs add a small reduction gearbox inside. With no brushes, the main wearing parts are the bearings, the gears (in geared hubs) and the cables where they leave the axle. Heat is the enemy: long climbs and overloading can overheat windings and weaken magnets.

## Signs it is worn or failing
- Grinding, clicking or growling: [Noise from the motor](/moto-zero/repair/problems/ev-motor-noise).
- Judder when pulling away: [Bike judders](/moto-zero/repair/problems/ev-judder), often a phase wire or sensor fault.
- Wheel locked or very hard to push: [Rear wheel is locked](/moto-zero/repair/problems/ev-wheel-locked).
- Power drops on long climbs: [Motor gets very hot](/moto-zero/repair/problems/ev-motor-hot).
- Insulation warning: [Insulation or high-voltage warning](/moto-zero/repair/problems/ev-insulation-warning). Stop and get it checked.
- After deep water: [Bike has been in a flood](/moto-zero/repair/problems/ev-water-exposure).

## When to replace it
Replace bearings, seals or cables when worn. Replace the motor if windings are burnt or shorted, magnets are damaged, or the case is cracked, after a workshop diagnosis.

## What to match when buying
- Exact motor for your bike: voltage, power, wheel size, axle size, cable connector, sensor type and controller compatibility. A motor not matched to the controller may judder or overheat.
- Hub motor bearings: the code printed on the bearing.
- Buy from the bike maker or approved dealer.

## Fitting notes
- Isolate the high-voltage system first: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
- Do not twist or pinch the axle cable; it is a common failure point.
- See [Check hub motor bearings and play](/moto-zero/repair/repairs/ev-hub-motor-check), [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis), [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check).
