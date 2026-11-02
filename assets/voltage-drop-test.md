---
id: voltage-drop-test
title: Do a voltage drop test
level: home
time: 20 to 40 min
applies_to:
- all
tools:
- digital multimeter
- long test lead or extension wire for the meter
- thin pins for back-probing
parts:
- wiring
- earth_strap
- battery
- ignition_switch
- handlebar_switches
- starter_relay
consumables: []
fixes:
- burning-smell-wiring
- headlight-dim
- headlight-flicker
- horn-weak
- ignition-switch-fault
- intermittent-electrical
- dim-lights-idle
- slow-cranking
---

# Do a voltage drop test

**Home mechanic (basic tools)** · Time: 20 to 40 min (estimate)


A dirty connector, a loose earth or a worn switch contact may still let a little current through, so a continuity test beeps "good". But under real load, the bad joint resists the current: some of the battery voltage is used up there, and the lamp, horn or starter gets less. A voltage drop test finds these bad joints while the circuit is working. It is the best test for dim lights, a weak horn, slow starting and connectors that get hot.

## Safety
- The circuit must be ON for this test. Keep hands, hair and leads away from moving parts if the engine or starter runs.
- If you test the starter circuit, the engine must not start: follow the method in [Test the starter circuit](/moto-zero/repair/repairs/starter-circuit-test).
- A connector that is hot to touch is already damaged. Stop the test and repair it.

## You need
- A digital multimeter on **DC volts** (V with a straight line). Use the lowest range that still shows the reading; on auto-range meters just choose DC volts.
- Your bike's limit if the manual gives one. **This page gives no universal limit**, because it depends on the circuit and the current it carries. Without a manual figure, compare: a good wire or closed switch reads close to zero, and a bad one reads clearly more than the same test on a good circuit of the same bike.
- A charged battery (K-Light PDF p. 97).

## How it works
In a voltage drop test both probes go on the same side of the load (the lamp, horn or motor), at the two ends of the part you are testing: for example both ends of one wire, or both sides of a switch. With the circuit working, the meter shows the voltage lost in that part. Zero means no loss. A large reading means resistance.

## Steps
1. **Switch the circuit on and keep it working.** For a headlight: key on, headlight on (engine running if your bike only lights the headlight with the engine on). For a horn: a helper holds the button.
2. **Test the power side as a whole.** Red probe on the **battery positive** terminal (use a long lead). Black probe back-probed into the **power wire at the load**. The reading is the total loss in fuse, switch, relay, connectors and wire on the feed side.
3. **Test the earth side as a whole.** Red probe back-probed into the **earth wire at the load**. Black probe on the **battery negative** terminal. The reading is the total loss in earth wires and earth points.
4. **Judge the result.** Compare with your manual. If no figure is given, compare with the same test on another circuit that works well. The side with the larger reading has the problem.
5. **Narrow it down.** Move the probes closer together along the bad side: across the fuse, across each connector, across the switch, across the earth bolt. The part that shows most of the loss is the bad one.
6. **Fix the bad part.**
   - Connector: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
   - Earth point: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
   - Handlebar switch: [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
   - Ignition switch: [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test).
   - Battery terminals: [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean).
7. **Repeat the test** after the repair to prove the loss has gone.

## Check your work
- The voltage drop on both sides is now low and similar to a good circuit on the same bike.
- The lamp is brighter, the horn louder or the starter faster.
- No connector or switch gets warm after 10 minutes of use.

## If it did not fix the problem
- Both sides read low but the lights are still dim: the supply itself is low. Go to [Lights go dim at idle](/moto-zero/repair/problems/dim-lights-idle) or [Test the charging system](/moto-zero/repair/repairs/charging-system-test).
- The K-Light manual's weak-light chart also lists a blackened bulb and a bulb of the wrong wattage (PDF p. 43): [Replace a bulb](/moto-zero/repair/repairs/bulb-replace).

## Problems this repair helps with

- [Burning smell from the wiring](/moto-zero/repair/problems/burning-smell-wiring)
- [Headlight is dim](/moto-zero/repair/problems/headlight-dim)
- [Headlight flickers](/moto-zero/repair/problems/headlight-flicker)
- [Horn is weak or croaky](/moto-zero/repair/problems/horn-weak)
- [Ignition switch is stiff or cuts power](/moto-zero/repair/problems/ignition-switch-fault)
- [Electrical faults come and go](/moto-zero/repair/problems/intermittent-electrical)
- [Lights go dim at idle](/moto-zero/repair/problems/dim-lights-idle)
- [Engine turns over slowly](/moto-zero/repair/problems/slow-cranking)

## Parts for this job

| Part | Buy |
|---|---|
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |
| [Ignition switch](/moto-zero/repair/parts/ignition_switch) | [Find this part](/spare-parts/ignition-switch) |
| [Handlebar switches](/moto-zero/repair/parts/handlebar_switches) | [Find this part](/spare-parts/handlebar-switches) |
| [Starter relay](/moto-zero/repair/parts/starter_relay) | [Find this part](/spare-parts/starter-relay) |

## Sources

- MAVCC Motorcycle Mechanic, PDF p. 293
- K-Light 125 manual, PDF p. 43
- K-Light 125 manual, PDF p. 97
