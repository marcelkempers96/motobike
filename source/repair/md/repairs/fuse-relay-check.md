---
id: fuse-relay-check
title: Check fuses and relays
level: rider
time: 10 to 30 min
applies_to:
- all
tools:
- digital multimeter
- fuse puller or small pliers
- spare fuses of the correct ratings
- fused jumper leads
- screwdriver
parts:
- fuse
- starter_relay
- flasher
- wiring
- battery
consumables: []
fixes:
- abs-light
- accessory-wiring-fault
- all-lights-out
- brake-light-dead
- burning-smell-wiring
- cuts-out-bumps
- dash-dead
- ev-dash-dark
- fan-not-working
- fuel-gauge-wrong
- fuel-pump-noisy
- fuel-pump-silent
- fuse-keeps-blowing
- headlight-out
- high-beam-fault
- horn-silent
- ignition-switch-fault
- indicators-dead
- intermittent-electrical
- no-power-key-on
- no-spark
- not-charging
- starter-silent
- tail-light-out
- ev-aux-battery-flat
---

# Check fuses and relays

**Rider job (no special tools)** · Time: 10 to 30 min (estimate)


A fuse is a thin metal link that melts when too much current flows, so the wire does not overheat (Unit 2, PDF p. 33). A relay is an electric switch: a small current through its coil pulls in a contact that switches a larger current, for example to the starter, headlight or fuel pump. When a whole circuit is dead, check these first.

## Safety
- Turn the key off before pulling fuses or relays.
- **Never replace a fuse with a higher rating, a wire, foil or a nail.** The fuse protects the wire. Without it, a short can melt the harness and set the bike on fire.
- A fuse that blows again straight away means there is a fault. Fuses blow for a reason (MAVCC PDF p. 313). Go to [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find).
- Any jumper lead you use to power a relay coil must have its own inline fuse.

## You need
- The fuse box and its label. Fuse boxes are often under the seat, near the battery or behind a side panel; some bikes also have an inline fuse holder near the battery.
- Spare fuses of exactly the same ratings and type (blade, mini blade or glass tube). The K-Light 125 wiring diagram shows a 20 A main fuse and two 10 A fuses (PDF pp. 74 and 278). The manual we used does not give a full fuse-to-circuit list, so check the label on your fuse holder.

## Steps
1. **Look first, then measure.** Pull the fuse and look at it. A broken link or a dark, burnt window means it blew. But a fuse can look good and still be open inside, so always test it with the meter (MAVCC PDF p. 312).
2. **Test with the meter, fuse in place.** Key on. Meter on DC volts (V with a straight line, 20 V range). Black probe on battery negative. Blade fuses have two tiny metal test points on top: touch the red probe to each one.
   - Battery voltage on both sides: the fuse is good.
   - Battery voltage on one side only: the fuse has blown.
   - 0 on both sides: no power is reaching the fuse. Check the main fuse, the battery and the ignition switch.
3. **Or test the fuse out of the bike.** Key off. Meter on continuity (beep or lowest Ω). Probe both legs of the fuse. A beep means good. No beep means blown.
4. **Replace a blown fuse** with one of the same rating. Turn the key on and use the circuit. If it blows again, stop and go to [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find).
5. **Check the fuse holder.** Green corrosion or loose clips cause faults that come and go: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean). Melted plastic means a bad connection was heating: replace the holder.
6. **Find the relay.** Use the diagram. Relays are small plastic cubes, often next to the fuse box. The K-Light 125 has a starter relay, a main relay, a headlight relay and the flasher under the seat and side panels (PDF pp. 74 and 278).
7. **Swap test.** If two relays in the box are the same part, swap the suspect relay with one from a circuit that works. If the fault moves to the other circuit, the relay is bad.
8. **Click test.** Key on, operate the circuit (press the start button, switch on the headlight). Touch the relay. A click means the coil is getting power and earth. No click: check the coil feed and earth with the meter, or the control switch (for the starter: [Test the starter relay](/moto-zero/repair/repairs/starter-relay-test)).
9. **Bench test.** Relay out. Find the coil pins and the switch pins on its label or in the manual. Meter on continuity across the switch pins: normally no beep. Connect 12 V across the coil pins with fused jumper leads: it should click and the switch pins should now beep (K-Light starter relay method, PDF p. 94). If not, replace it.

## Check your work
- The circuit works and keeps working after a 10 minute ride.
- No fuse or holder is warm after the ride.
- You have a spare fuse of each rating stored on the bike.

## If it did not fix the problem
- The fuse blows again: [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing).
- Fuse and relay good but the circuit is still dead: [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test) or [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Main fuse | 20 A | PDF pp. 74, 278 |
| Other fuses on wiring diagram | two of 10 A | PDF p. 278 |

## Problems this repair helps with

- [ABS warning light is on](/moto-zero/repair/problems/abs-light)
- [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault)
- [All lights stop working](/moto-zero/repair/problems/all-lights-out)
- [Brake light does not work](/moto-zero/repair/problems/brake-light-dead)
- [Burning smell from the wiring](/moto-zero/repair/problems/burning-smell-wiring)
- [Cuts out when riding over bumps](/moto-zero/repair/problems/cuts-out-bumps)
- [Instruments or dashboard are dead](/moto-zero/repair/problems/dash-dead)
- [Dashboard is dark and the bike seems dead](/moto-zero/repair/problems/ev-dash-dark)
- [Radiator fan does not switch on](/moto-zero/repair/problems/fan-not-working)
- [Fuel gauge reads wrong or does not move](/moto-zero/repair/problems/fuel-gauge-wrong)
- [Fuel pump whines loudly or runs all the time](/moto-zero/repair/problems/fuel-pump-noisy)
- [No buzz from the fuel pump when the key is turned on](/moto-zero/repair/problems/fuel-pump-silent)
- [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing)
- [Headlight does not work](/moto-zero/repair/problems/headlight-out)
- [High beam or flash does not work](/moto-zero/repair/problems/high-beam-fault)
- [Horn does not work](/moto-zero/repair/problems/horn-silent)
- [Ignition switch is stiff or cuts power](/moto-zero/repair/problems/ignition-switch-fault)
- [Indicators do not work](/moto-zero/repair/problems/indicators-dead)
- [Electrical faults come and go](/moto-zero/repair/problems/intermittent-electrical)
- [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on)
- [No spark at the spark plug](/moto-zero/repair/problems/no-spark)
- [Battery is not charging while riding](/moto-zero/repair/problems/not-charging)
- [Nothing happens when I press the starter button](/moto-zero/repair/problems/starter-silent)
- [Tail light does not work](/moto-zero/repair/problems/tail-light-out)
- [Small 12 V battery is flat](/moto-zero/repair/problems/ev-aux-battery-flat)

## Parts for this job

| Part | Buy |
|---|---|
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Starter relay](/moto-zero/repair/parts/starter_relay) | [Find this part](/spare-parts/starter-relay) |
| [Indicator flasher relay](/moto-zero/repair/parts/flasher) | [Find this part](/spare-parts/flasher) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |

## Sources

- K-Light 125 manual, PDF p. 74
- K-Light 125 manual, PDF p. 93
- K-Light 125 manual, PDF p. 94
- K-Light 125 manual, PDF p. 278
- MAVCC Motorcycle Mechanic, PDF p. 312
- MAVCC Motorcycle Mechanic, PDF p. 313
- Unit 2 The Motorcycle, PDF p. 33
