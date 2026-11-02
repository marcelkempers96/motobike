---
id: short-circuit-find
title: Find a short circuit
level: home
time: 30 to 120 min
applies_to:
- all
tools:
- digital multimeter
- wiring diagram
- spare fuses of the correct rating
- fused test lead or a short-circuit tester (fuse saver)
- screwdrivers
- torch
parts:
- fuse
- wiring
- earth_strap
- handlebar_switches
- brake_light_switch
- tail_light
- headlight
consumables:
- insulated crimp connectors
- adhesive-lined heat-shrink
- harness tape or split sleeve
- cable ties
fixes:
- accessory-wiring-fault
- all-lights-out
- burning-smell-wiring
- fuse-keeps-blowing
- horn-silent
- no-power-key-on
- parasitic-drain
- starter-keeps-running
---

# Find a short circuit

**Home mechanic (basic tools)** · Time: 30 to 120 min (estimate)


A short circuit is a path where current goes straight from a power wire to earth without passing through a lamp, horn or motor. The fuse blows, or, if the fuse is wrong or missing, the wire gets red hot and burns. Usually a wire has rubbed through on the frame, been pinched by a panel, chewed by an animal, or badly joined for an accessory. This job finds it without blowing a box of fuses.

## Safety
- **A burning smell or smoke from the wiring: turn the key off and disconnect the battery negative at once.** Keep a fire extinguisher close while you work.
- Never fit a bigger fuse, a wire or foil to "hold" a short. The harness can catch fire.
- On an electric motorcycle, find shorts only on the 12 V system. High-voltage faults are workshop work: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).

## You need
- The wiring diagram, to see every item fed by the blown fuse.
- A multimeter on continuity (beep or lowest Ω).
- Optional: a short-circuit tester or "fuse saver", a resettable breaker or buzzer made to plug into the fuse holder in place of the fuse. It limits the current so you can search with the circuit powered.

## Steps
1. **Note when it blows.** At key on? Only when you use one item, such as the brake, horn or indicators? Only over bumps or at full steering lock? The answer points to the circuit and often the place.
2. **List what the fuse feeds.** Use the diagram. Fuses blow for a reason, so assume a pinched, bare or shorted wire somewhere along that circuit (MAVCC PDF p. 313).
3. **Look first.** Battery disconnected, check the steering head, behind the headlight, under the tank and seat, under the rear mudguard, near the battery and exhaust, and any accessory wiring. Look for shiny copper, melted insulation, burn marks or chewed wires.
4. **Meter search, power off.** Remove the blown fuse. Key off. Meter on continuity. Put one probe in the fuse holder on the **load side** (the side that goes to the circuit, not the battery side). Put the other probe on the frame.
   - Beep: there is a short to earth. Go to step 5.
   - No beep: the short only happens when a switch is on. Turn the key on (battery still disconnected so no current flows) and operate each switch on that circuit while you watch the meter. When it beeps, you know which branch is shorted.
5. **Split the circuit.** Keep the probes in place. Unplug connectors along the circuit, one at a time, starting halfway (MAVCC half-split method, PDF p. 292). When the beep stops, the short is in the section you just unplugged. Unplug the items on that section one by one: lamps, switches, horn. If unplugging an item stops the beep, the item itself is shorted. If not, the wire is.
6. **Wiggle the suspect section.** Bend the harness and turn the bars while watching the meter. A beep that comes and goes shows exactly where the insulation is damaged.
7. **With a short tester (optional).** Fit it in the fuse holder, reconnect the battery, key on. It buzzes or clicks while the short is there. Unplug sections as in step 5 until it stops.
8. **Repair.** Cut out burnt wire back to clean copper. Join new wire of at least the same thickness with crimp connectors and adhesive heat-shrink. Wrap or sleeve the harness, and add a rubber grommet or extra cable tie so it cannot rub the same spot again. Replace any item that was shorted inside.
9. **Fit a new fuse of the correct rating**, reconnect the battery and test every item on the circuit at full lock both ways.

## Check your work
- The fuse does not blow at key on, with each switch used, over bumps or at full steering lock.
- No hot wires or smell after a 15 minute ride.
- The repaired harness cannot touch sharp edges, the exhaust or moving parts.

## If it did not fix the problem
- The main fuse blows when you connect the battery: check the battery cables and the regulator connector first. The K-Light manual links intermittent loss of power to loose battery cables and lighting circuit shorts (PDF p. 76). Then [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test).
- Wiring burnt in several places: the harness may need replacing. That is a workshop job.
- Battery goes flat but no fuse blows: [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test).

## Problems this repair helps with

- [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault)
- [All lights stop working](/moto-zero/repair/problems/all-lights-out)
- [Burning smell from the wiring](/moto-zero/repair/problems/burning-smell-wiring)
- [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing)
- [Horn does not work](/moto-zero/repair/problems/horn-silent)
- [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on)
- [Something drains the battery with the key off](/moto-zero/repair/problems/parasitic-drain)
- [Starter keeps turning after I let go of the button](/moto-zero/repair/problems/starter-keeps-running)

## Parts for this job

| Part | Buy |
|---|---|
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |
| [Handlebar switches](/moto-zero/repair/parts/handlebar_switches) | [Find this part](/spare-parts/handlebar-switches) |
| [Brake light switches](/moto-zero/repair/parts/brake_light_switch) | [Find this part](/spare-parts/brake-light-switch) |
| [Tail and brake light](/moto-zero/repair/parts/tail_light) | [Find this part](/spare-parts/tail-light) |
| [Headlight and bulb](/moto-zero/repair/parts/headlight) | [Find this part](/spare-parts/headlight) |

## Sources

- MAVCC Motorcycle Mechanic, PDF p. 292
- MAVCC Motorcycle Mechanic, PDF p. 313
- K-Light 125 manual, PDF p. 76
- K-Light 125 manual, PDF p. 278
