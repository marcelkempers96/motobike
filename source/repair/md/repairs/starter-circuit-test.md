---
id: starter-circuit-test
title: Test the starter circuit
level: home
time: 30 to 60 min
applies_to:
- electric-start
tools:
- digital multimeter
- wiring diagram for your bike
- screwdriver
- spanner set
- torch
parts:
- battery
- fuse
- starter_relay
- starter
- interlock_switches
- handlebar_switches
- ignition_switch
- earth_strap
- wiring
consumables:
- contact cleaner
fixes:
- slow-cranking
- starter-clicks
- starter-keeps-running
- starter-silent
- start-blocked-interlock
---

# Test the starter circuit

**Home mechanic (basic tools)** · Time: 30 to 60 min (estimate)


The electric starter has two circuits. A small control circuit runs from the key, fuse, start button and safety switches to the coil of the starter relay. When the relay clicks, its heavy contacts connect the battery to the starter motor through thick cables. This job tests both circuits in order, from cheapest to most costly.

## Safety
- Neutral, bike on the stand, hands clear of the chain and wheel. If the relay is faulty the engine can turn as soon as you touch a wire.
- Never bridge the relay terminals with a screwdriver or wire to "test" the starter. The big spark can burn you, weld the tool, ignite fuel vapour and start the engine in gear. The K-Light 125 fault chart suggests this; it is not carried forward here.
- Key OFF and battery negative (−) disconnected before you unplug or remove anything.

## You need
- A multimeter on DC volts and on continuity.
- Your wiring diagram. K-Light 125 (PDF page 90): battery, main fuse, key switch, start button and engine stop switch feed the relay coil; the coil reaches earth through the clutch switch or, through a diode, the neutral switch.

## Steps
1. **Battery.** Measure battery voltage with the key off. If it is low, charge first: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge). Most "starter faults" are a flat battery or a loose terminal.
2. **Terminals and earth.** Check the battery terminals and the main earth cable to the engine are clean and tight: [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean).
3. **Fuses.** Check the main fuse and any starter fuse: [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
4. **Switches.** Key ON, engine stop switch on RUN, gearbox in neutral (neutral light on), clutch lever pulled, side stand up. Press start. On many bikes nothing happens if one of these is wrong.
5. **Listen.** Does the relay click when you press start?
   - No click: test the control circuit (steps 6 to 8).
   - Click, but the starter does not turn: test the heavy circuit (steps 9 to 11).
6. **Relay coil supply.** Unplug the relay's small connector. Key ON, clutch pulled. Measure from the coil feed wire to earth: you should read battery voltage when you press start (K-Light 125 manual uses the green/yellow wire; check your diagram, as the manual's colours are not consistent). No voltage: the fault is in the key switch, start button, engine stop switch or wiring. See [Test the engine stop switch](/moto-zero/repair/repairs/kill-switch-test) and [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
7. **Relay coil earth.** Check the coil's earth wire has continuity to earth when the clutch is pulled or the bike is in neutral. No continuity: [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test).
8. **Relay.** If supply and earth are good but the relay does not click: [Test the starter relay](/moto-zero/repair/repairs/starter-relay-test).
9. **Voltage at the starter.** Reconnect everything. Put the black probe on bare engine metal and the red probe on the starter motor terminal. Ask a helper to press start. You should see close to battery voltage. Zero: the relay contacts or the cable from relay to starter is bad.
10. **Voltage drop.** While a helper presses start, measure across each part of the heavy circuit in turn: battery + to relay input, relay input to relay output, battery − to engine. Each joint should show only a small reading. A large reading across one part shows where the current is lost. Your manual may give limits; if not, compare one cable with another. See [Do a voltage drop test](/moto-zero/repair/repairs/voltage-drop-test).
11. **Starter motor.** Good voltage at the starter but it does not turn, or turns slowly: [Remove and inspect the starter motor](/moto-zero/repair/repairs/starter-motor-service). Also make sure the engine itself turns freely by hand or with the kickstarter.

## Check your work
- The relay clicks and the starter cranks at normal speed only when the safety conditions are met.
- The starter stops the moment you release the button.

## If it did not fix the problem
- Starter whirs but the engine does not turn: [Starter motor whirs but the engine does not turn](/moto-zero/repair/problems/starter-spins-freely).
- Starter keeps running: [Starter keeps turning after I let go of the button](/moto-zero/repair/problems/starter-keeps-running).
- Faults that come and go: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

## Problems this repair helps with

- [Engine turns over slowly](/moto-zero/repair/problems/slow-cranking)
- [Starter relay clicks but the engine does not turn](/moto-zero/repair/problems/starter-clicks)
- [Starter keeps turning after I let go of the button](/moto-zero/repair/problems/starter-keeps-running)
- [Nothing happens when I press the starter button](/moto-zero/repair/problems/starter-silent)
- [Will not start in gear, on the side stand or without the clutch pulled](/moto-zero/repair/problems/start-blocked-interlock)

## Parts for this job

| Part | Buy |
|---|---|
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Starter relay](/moto-zero/repair/parts/starter_relay) | [Find this part](/spare-parts/starter-relay) |
| [Starter motor](/moto-zero/repair/parts/starter) | [Find this part](/spare-parts/starter) |
| [Side stand, clutch and neutral switches](/moto-zero/repair/parts/interlock_switches) | [Find this part](/spare-parts/interlock-switches) |
| [Handlebar switches](/moto-zero/repair/parts/handlebar_switches) | [Find this part](/spare-parts/handlebar-switches) |
| [Ignition switch](/moto-zero/repair/parts/ignition_switch) | [Find this part](/spare-parts/ignition-switch) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |

## Sources

- K-Light 125 manual, PDF p. 37
- K-Light 125 manual, PDF p. 39
- K-Light 125 manual, PDF p. 90
- K-Light 125 manual, PDF p. 92
- MAVCC Motorcycle Mechanic, PDF p. 292
