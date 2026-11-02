---
id: flasher-test
title: Test the indicator flasher relay
level: home
time: 15 to 30 min
applies_to:
- all
tools:
- digital multimeter
- fused jumper lead
- thin pin for back-probing
- wiring diagram
parts:
- flasher
- indicators
- handlebar_switches
- fuse
consumables: []
fixes:
- indicators-dead
- indicators-fast
- indicators-steady
---

# Test the indicator flasher relay

**Home mechanic (basic tools)** · Time: 15 to 30 min (estimate)


The flasher relay (also called the blinker relay or flasher unit) switches the indicator power on and off to make the lamps flash. If it fails, all indicators stop, stay on, or flash at the wrong speed. This test tells you whether the flasher, the switch or the wiring is at fault. The K-Light 125 has its flasher under the seat with the other relays (PDF p. 74).

## Safety
- Key off before you unplug the flasher.
- Any jumper wire must have an inline fuse. Never connect a battery feed straight to earth.
- Some modern bikes have no separate flasher. The dashboard or a body control unit flashes the indicators over the CAN-bus (a data network that links the control units). Do not jumper or cut wires on those bikes; see the last section.

## You need
- The wiring diagram, to identify the flasher terminals. Common flashers have two pins (power in, power out to the switch) or three pins (power in, power out, earth). Pin letters vary: on many units **B** or **+** is power in and **L** is the lamp output.
- A replacement flasher of the correct type if the old one fails. Bulb indicators need a flasher made for bulbs. LED indicators need an LED-type or load-independent flasher (one that flashes at the same speed whatever the load).

## Steps
1. **Check bulbs first.** One dead bulb on a side makes that side flash fast or stay on. Check all four lamps: [Replace a bulb](/moto-zero/repair/repairs/bulb-replace).
2. **Check the fuse** that feeds the flasher: [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
3. **Find the flasher.** Use the diagram or follow the indicator switch wires. It is often a small square or round can, sometimes clipped into a rubber holder.
4. **Test power in.** Key on. Set the meter to DC volts (V with a straight line, 20 V range). Black probe on frame metal. Red probe on the flasher input pin (back-probe the connector with a thin pin). You should read close to battery voltage. If 0: the feed wire, the ignition switch or the fuse is at fault. Trace back with [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test) step 5.
5. **Test the earth (three-pin flashers only).** Key off, flasher unplugged. Continuity (beep setting) from the earth pin of the plug to the frame. It should beep.
6. **Bypass the flasher.** Key on, indicator switch to one side. Join the input and output pins in the plug with a fused jumper lead.
   - Indicators on that side light steadily: the wiring, switch and bulbs are good, so **the flasher is faulty**. Replace it.
   - Indicators stay off: the fault is after the flasher. Go to step 7.
7. **Test the switch.** Key off, unplug the switch connector. On continuity, check from the switch input wire to the left output wire with the switch to the left, and to the right output with the switch to the right. On the K-Light 125 the left pod has the left indicator contacts (black to blue/red) and the right pod has a separate right indicator button (orange to green/white) (PDF p. 105). No beep: [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
8. **Test the wire to each lamp.** Key on, switch on, flasher bypassed: check for power at each indicator plug, then check its earth, as in [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test) steps 3 and 4.
9. Remove the jumper, plug in the flasher (old or new) and test both sides and the hazard switch if fitted.

## Check your work
- Both sides flash at the same normal speed, with the dashboard indicator lamp flashing too.
- Flash speed does not change much between idle and higher revs.

## If it did not fix the problem
- Fast flashing after fitting LED indicators: [Fit LED indicators correctly](/moto-zero/repair/repairs/led-indicator-fit).
- Flasher works on the bench but fails on the bike now and then: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) and [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- **CAN-bus bikes:** if the indicators are controlled by a body control unit or the dashboard, check fuses, bulbs or LED units and connectors only. Then go to a dealer with the correct diagnostic tool. Lamp monitoring on these bikes can show a lamp fault even when the problem is a poor earth or a non-approved lamp.

## Problems this repair helps with

- [Indicators do not work](/moto-zero/repair/problems/indicators-dead)
- [Indicators flash too fast](/moto-zero/repair/problems/indicators-fast)
- [Indicators stay on and do not flash](/moto-zero/repair/problems/indicators-steady)

## Parts for this job

| Part | Buy |
|---|---|
| [Indicator flasher relay](/moto-zero/repair/parts/flasher) | [Find this part](/spare-parts/flasher) |
| [Indicators](/moto-zero/repair/parts/indicators) | [Find this part](/spare-parts/indicators) |
| [Handlebar switches](/moto-zero/repair/parts/handlebar_switches) | [Find this part](/spare-parts/handlebar-switches) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |

## Sources

- K-Light 125 manual, PDF p. 44
- K-Light 125 manual, PDF p. 45
- K-Light 125 manual, PDF p. 74
- K-Light 125 manual, PDF p. 105
- [Kellermann flasher relays](https://www.kellermann-online.com/en/electronic/elektronik/blinkrelais/)
