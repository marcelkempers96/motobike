---
id: parasitic-drain-test
title: Find what is draining the battery
level: home
time: 30 to 60 min
applies_to:
- electric-start
- kickstart
- fuel-injected
- carburettor
tools:
- digital multimeter that can measure DC current
- wiring diagram
- fuse puller
- spanner for the battery terminal
parts:
- battery
- wiring
- regulator
- ignition_switch
- brake_light_switch
- fuse
consumables: []
fixes:
- accessory-wiring-fault
- battery-flat
- ev-aux-battery-flat
- new-battery-dies
- parasitic-drain
---

# Find what is draining the battery

**Home mechanic (basic tools)** · Time: 30 to 60 min (estimate)


Some current flows even with the key off: a clock, an alarm or the ECU memory. If something else stays on, the battery goes flat in a few days. This test measures the current with the key off and then finds which circuit takes it.

## Safety
- Key OFF for the whole test. Do not press the starter or turn the key ON while the meter is in the circuit. The starter current will blow the meter's fuse or damage the meter.
- Glasses on when working at the battery.

## You need
- A multimeter with a DC current (A or mA) range. Start on the highest current range, then switch down.
- A charged battery.
- The fuse layout for your bike.

## Steps
1. Quick check first: with the key OFF, look at the brake light. If it is lit, the brake light switch is stuck on. The K-Light 125 manual names this first. See [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test).
2. Check that the key is fully OFF and that no accessory (USB charger, alarm, phone holder light, extra lamp) is wired straight to the battery.
3. Undo the battery negative (−) cable.
4. Set the meter to its highest DC current range. Put the red probe in the current socket of the meter (often marked A or 10A).
5. Connect one meter probe to the battery negative (−) post and the other to the loose negative cable. The current now flows through the meter.
6. Wait a minute: some ECUs and alarms draw more for a short time after the key goes off.
7. Read the current. Switch down to a lower range for a clearer reading if it is small. **K-Light 125 limit: 1 mA or less.** Other bikes: use your manual's limit. Bikes with an alarm or clock may draw more by design.
8. If the reading is above the limit, pull one fuse at a time and watch the meter. When the current drops, that fuse feeds the drain. Refit each fuse before pulling the next.
9. If no fuse changes the reading, the drain is on an unfused wire: often the regulator, the starter relay wiring or the ignition switch. The K-Light 125 manual lists a short in the regulator, battery or ignition switch wiring. Unplug the regulator connector and watch the reading. If it drops, see [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test).
10. Follow the circuit you found with the wiring diagram. Split it in half and test the middle, then keep halving (MAVCC method). See [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find).
11. Remove the meter and reconnect the negative cable.

## Check your work
- The key-off current is at or below the manual's limit.
- The battery keeps its charged voltage after several days parked.

## If it did not fix the problem
- Current is normal but the battery still goes flat: the battery itself may self-discharge. [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge), and check charging with [Test the charging system](/moto-zero/repair/repairs/charging-system-test).
- Drain comes from added accessories: [Wire an accessory safely](/moto-zero/repair/repairs/accessory-wiring).
- Drain comes from the key switch: [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test).

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Leakage current, key off | 1 mA or less | 36 |

## Problems this repair helps with

- [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault)
- [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat)
- [Small 12 V battery is flat](/moto-zero/repair/problems/ev-aux-battery-flat)
- [A new battery goes flat quickly](/moto-zero/repair/problems/new-battery-dies)
- [Something drains the battery with the key off](/moto-zero/repair/problems/parasitic-drain)

## Parts for this job

| Part | Buy |
|---|---|
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Regulator rectifier](/moto-zero/repair/parts/regulator) | [Find this part](/spare-parts/regulator) |
| [Ignition switch](/moto-zero/repair/parts/ignition_switch) | [Find this part](/spare-parts/ignition-switch) |
| [Brake light switches](/moto-zero/repair/parts/brake_light_switch) | [Find this part](/spare-parts/brake-light-switch) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |

## Sources

- K-Light 125 manual, PDF p. 36
- K-Light 125 manual, PDF p. 76
- MAVCC Motorcycle Mechanic, PDF p. 292
