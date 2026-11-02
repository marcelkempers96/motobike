---
id: lighting-circuit-test
title: Test a lighting circuit
level: home
time: 20 to 45 min
applies_to:
- all
tools:
- digital multimeter
- thin pin or back-probe for connectors
- fused jumper lead
- wiring diagram for your bike
- screwdrivers
parts:
- headlight
- tail_light
- wiring
- handlebar_switches
- earth_strap
- fuse
consumables: []
fixes:
- all-lights-out
- brake-light-dead
- brake-light-stuck-on
- crash-check
- dim-lights-idle
- headlight-out
- high-beam-fault
- horn-silent
- indicators-dead
- switch-fault
- tail-light-out
---

# Test a lighting circuit

**Home mechanic (basic tools)** · Time: 20 to 45 min (estimate)


Every lamp needs power coming in on one wire and a path back to the battery through the earth (ground) wire or frame. This test finds which is missing, and where. Use it when a new bulb does not light, or a lamp is dim or flickers. For indicators, use [Test the indicator flasher relay](/moto-zero/repair/repairs/flasher-test).

## Safety
- Never join a power wire straight to the frame or battery negative: a short circuit can melt wires and start a fire. Any jumper wire must have an inline fuse.
- Do not use an old-style bulb test light on circuits that go to an ECU, a CAN-bus dashboard or a lighting control unit. It can draw enough current to damage them. Use a digital multimeter.
- On an electric motorcycle, test only the 12 V lighting wires. Never open orange high-voltage cables or the battery pack.

## You need
- A digital multimeter. You will use two settings:
  - **DC volts**: the V with a straight line (often marked DCV). Choose the 20 V range if your meter has ranges.
  - **Continuity**: the beep symbol, or the lowest ohms (Ω) range. Use this only with the key off and the part unplugged.
- The wiring diagram for your bike (K-Light 125: PDF p. 278).
- A charged battery, checked first (K-Light 125 manual, PDF p. 97): [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).

## Steps
1. **Know your feed.** Some bikes light the headlight only with the engine running (the K-Light 125 diagram shows a headlamp controller and relay). Older kickstart bikes may run lights straight from the alternator (AC lighting) and need the engine running to test.
2. **Check the bulb or lamp first.** A broken filament is the most common fault: [Replace a bulb](/moto-zero/repair/repairs/bulb-replace).
3. **Test for power at the lamp.** Key on, switch set for that lamp (for example low beam). Set the meter to DC volts. Put the black probe on clean bare metal on the frame or on the battery negative. Push a thin pin into the back of the lamp connector along the power wire, and touch the red probe to it. Do not pierce wire insulation.
   - Reading close to battery voltage: power is reaching the lamp. Go to step 4.
   - Reading of 0: power is not arriving. Go to step 5.
   - Reading well below battery voltage: there is a bad joint upstream. Do [Do a voltage drop test](/moto-zero/repair/repairs/voltage-drop-test).
4. **Test the earth at the lamp.** Leave the lamp plugged in and switched on. Move the red probe to the battery positive and the black probe to the lamp's earth wire at its connector. You should read close to battery voltage. If the reading is low or 0, the earth path is broken: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean). If both power and earth are good, the bulb holder or LED unit itself is faulty.
5. **Work back towards the battery.** Use the wiring diagram to list the parts between battery and lamp: fuse, ignition switch, relay or controller, handlebar switch, connectors. Test for power halfway along. If power is there, the fault is between that point and the lamp. If not, it is between the battery and that point. Keep halving the circuit until you find the break (MAVCC PDF p. 292).
6. **Check the fuse** for that circuit with the meter, not by eye: [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
7. **Check the switch.** Unplug the handlebar switch connector, key off. On continuity, put one probe on the switch's input wire and one on its output wire for that lamp. Operate the switch. It should beep in the ON position only. If not: [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
8. **Check the wire.** Key off, both ends unplugged, continuity from one end of the wire to the other. Then check from the wire to the frame: it must NOT beep. A beep means a short to earth: [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find).
9. Repair, reconnect and test the lamp in all switch positions.

## Check your work
- The lamp lights at full brightness with the engine at idle and at higher revs.
- Wiggling the harness at the steering head and under the seat does not make it flicker.

## If it did not fix the problem
- Power and earth good but an LED lamp stays dark: replace the LED unit.
- On a bike with a CAN-bus dashboard or lighting control unit, the unit switches the lamp: take it to a dealer with the correct diagnostic tool.
- The fault comes and goes: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

## Problems this repair helps with

- [All lights stop working](/moto-zero/repair/problems/all-lights-out)
- [Brake light does not work](/moto-zero/repair/problems/brake-light-dead)
- [Brake light stays on](/moto-zero/repair/problems/brake-light-stuck-on)
- [The bike has been dropped or crashed](/moto-zero/repair/problems/crash-check)
- [Lights go dim at idle](/moto-zero/repair/problems/dim-lights-idle)
- [Headlight does not work](/moto-zero/repair/problems/headlight-out)
- [High beam or flash does not work](/moto-zero/repair/problems/high-beam-fault)
- [Horn does not work](/moto-zero/repair/problems/horn-silent)
- [Indicators do not work](/moto-zero/repair/problems/indicators-dead)
- [Handlebar switch does not work properly](/moto-zero/repair/problems/switch-fault)
- [Tail light does not work](/moto-zero/repair/problems/tail-light-out)

## Parts for this job

| Part | Buy |
|---|---|
| [Headlight and bulb](/moto-zero/repair/parts/headlight) | [Find this part](/spare-parts/headlight) |
| [Tail and brake light](/moto-zero/repair/parts/tail_light) | [Find this part](/spare-parts/tail-light) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Handlebar switches](/moto-zero/repair/parts/handlebar_switches) | [Find this part](/spare-parts/handlebar-switches) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |

## Sources

- K-Light 125 manual, PDF p. 40
- K-Light 125 manual, PDF p. 41
- K-Light 125 manual, PDF p. 43
- K-Light 125 manual, PDF p. 97
- K-Light 125 manual, PDF p. 278
- MAVCC Motorcycle Mechanic, PDF p. 292
- MAVCC Motorcycle Mechanic, PDF p. 293
- MAVCC Motorcycle Mechanic, PDF p. 312
