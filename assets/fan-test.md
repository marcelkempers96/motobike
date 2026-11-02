---
id: fan-test
title: Test the radiator fan and its switch
level: home
time: 30 to 45 min (estimate)
applies_to:
- liquid-cooled
tools:
- multimeter
- fused jumper lead
- torch
- wiring diagram for your bike
parts:
- cooling_fan
- fuse
- wiring
- efi_sensors
- radiator
consumables: []
fixes:
- fan-not-working
- overheating-liquid
- radiator-damage
- temp-gauge-high
---

# Test the radiator fan and its switch

**Home mechanic (basic tools)** · Time: 30 to 45 min (estimate) (estimate)


At speed, air flows through the radiator by itself. In traffic the electric fan behind the radiator must switch on. On older bikes a thermostatic switch (a switch that closes when the coolant gets hot) screwed into the radiator or engine turns the fan on through a fuse, sometimes with a relay. On fuel-injected bikes the ECU usually reads a temperature sensor and switches the fan relay. This test finds whether the fan motor, the fuse, the switch or the wiring has failed.

## Safety
- The fan can start by itself with the key on, even when the engine is off. Keep fingers clear of the blades.
- Do not touch the radiator or hoses on a hot engine.
- Always use a fused jumper lead. A direct wire from the battery can melt wiring if there is a short.

## You need
- A multimeter, a jumper lead with an inline fuse, a torch and the wiring diagram.

## Steps
1. Check the coolant level when cold with [Check and top up coolant](/moto-zero/repair/repairs/coolant-check). A low level can leave the switch or sensor in air so it never sees hot coolant.
2. Check the fan fuse with [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check). A blown fuse often means a seized fan or a short.
3. With the key off, spin the fan by hand. It should turn freely. A stiff or gritty fan has a worn motor.
4. Warm the engine at idle on the stand, watching the temperature gauge. The fan should come on before the gauge reaches the red zone. If it comes on, the system works; the fault is elsewhere.
5. If it does not come on, stop the engine before it overheats.
6. Unplug the fan motor connector. Using the fused jumper, feed battery voltage to the fan connector pins (check polarity on the diagram). The fan should spin.
   - Fan does not spin: the fan motor is faulty. Replace the fan.
   - Fan spins: the motor is good; the fault is in the switch, relay or wiring.
7. Thermostatic switch type: unplug the switch. With the key on, bridge the switch wire to earth with the fused jumper (or across the two switch wires as the diagram shows). If the fan now runs, the switch is faulty.
8. Relay or ECU type: check the relay with [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check), then read fault codes with [Read engine fault codes (fuel injection)](/moto-zero/repair/repairs/efi-code-read). A faulty temperature sensor can stop the fan.
9. Look for broken wires, corroded connectors and chafed insulation along the fan wiring: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

## Check your work
- Fan switches on as the gauge rises at idle and off again as it cools.
- Fuse stays intact.

## If it did not fix the problem
- Fan works but engine still overheats: [Check the thermostat](/moto-zero/repair/repairs/thermostat-check) and [Radiator is damaged, bent or blocked](/moto-zero/repair/problems/radiator-damage).
- Gauge reads high with a cool engine: [Temperature gauge reads high or the warning light is on](/moto-zero/repair/problems/temp-gauge-high).

## Problems this repair helps with

- [Radiator fan does not switch on](/moto-zero/repair/problems/fan-not-working)
- [Liquid-cooled engine overheats](/moto-zero/repair/problems/overheating-liquid)
- [Radiator is damaged, bent or blocked](/moto-zero/repair/problems/radiator-damage)
- [Temperature gauge reads high or the warning light is on](/moto-zero/repair/problems/temp-gauge-high)

## Parts for this job

| Part | Buy |
|---|---|
| [Radiator fan](/moto-zero/repair/parts/cooling_fan) | [Find this part](/spare-parts/cooling-fan) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Engine sensors (TPS, MAP, temperature)](/moto-zero/repair/parts/efi_sensors) | [Find this part](/spare-parts/efi-sensors) |
| [Radiator](/moto-zero/repair/parts/radiator) | [Find this part](/spare-parts/radiator) |

## Sources

- Unit 2 The Motorcycle, PDF p. 19
- MAVCC Motorcycle Mechanic, PDF p. 290
