---
id: dash-power-check
title: Check power to the instruments
level: home
time: 20 to 40 min
applies_to:
- all
tools:
- digital multimeter
- thin pin for back-probing
- screwdrivers
- Allen keys
- wiring diagram
parts:
- instruments
- fuse
- wiring
- earth_strap
- battery
- ignition_switch
consumables:
- electrical contact cleaner
fixes:
- dash-dead
- fuel-gauge-wrong
- neutral-light-fault
- speedo-dead
- warning-lights-flicker
---

# Check power to the instruments

**Home mechanic (basic tools)** · Time: 20 to 40 min (estimate)


The instrument panel (dashboard or meter) needs a power feed when the key is on, an earth, and on most digital dashboards a second, permanent feed from the battery that keeps the clock and trip memory alive. Modern dashboards may also talk to the ECU and other units over a data network called the CAN-bus. This check finds out whether the dashboard is getting what it needs before you blame the dashboard itself, which is usually an expensive part.

## Safety
- Key off before unplugging the dashboard. Unplugging units with the power on can damage them (the K-Light manual warns of this for the ECU).
- Use a digital multimeter only. Never use a bulb test light or a jumper wire on dashboard or CAN-bus wires: you can damage the units.
- On an electric motorcycle, the dashboard runs from the 12 V system. Do not open high-voltage parts. If the whole bike is dead, start at [Dashboard is dark and the bike seems dead](/moto-zero/repair/problems/ev-dash-dark).

## You need
- The wiring diagram, to find the dashboard feed, permanent feed, earth and signal wires. On the K-Light 125 the meter is shown at top left of the diagram (PDF p. 278).
- A charged battery. Check this first, as the K-Light manual advises for all lighting and meter faults (PDF p. 97): [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).

## Steps
1. **Watch the key-on test.** Turn the key on. Most dashboards sweep the needles or light all segments, and warning lamps glow for a few seconds. On the K-Light 125 the FI (engine) lamp lights at key on to show the injection system has power, then goes out once the engine runs (PDF p. 269). If none of this happens, go on.
2. **Check other key-on items.** Do the indicators, horn or fuel pump prime work? If nothing works at all, the fault is before the dashboard: go to [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on).
3. **Check the fuses** for the dashboard and the ignition feed: [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
4. **Reach the dashboard plug.** Remove the covers. On the K-Light 125, the meter comes out after removing the upper cover screw, the holder and the rear cover (PDF p. 100). Do not unplug yet.
5. **Test the switched feed.** Key on. Meter on DC volts (V with a straight line, 20 V range). Black probe on the battery negative. Back-probe the switched feed wire in the dashboard plug with a thin pin and touch the red probe to it. It should read close to battery voltage. Do not pierce the insulation.
6. **Test the permanent feed** (digital dashboards). Key off. Same test on the permanent feed wire: close to battery voltage.
7. **Test the earth.** Key on. Red probe on battery positive, black probe on the dashboard earth wire (back-probed). It should read close to battery voltage. A low reading means a poor earth: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
8. **Check the plug.** Key off. Unplug the dashboard. Look for green corrosion, water, bent or pushed-back pins. Clean and refit: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
9. **If feeds and earth are good** but the dashboard stays dark, the dashboard itself, or (on CAN-bus bikes) the network, is at fault. On CAN-bus bikes a dashboard may stay dark or show errors if the ECU or another unit is not talking to it. Take it to a dealer with the correct diagnostic tool. The K-Light manual notes its diagnostic tool needs a battery of at least 8.5 V (PDF p. 274), so charge the battery before the visit.
10. Refit the dashboard. K-Light 125 meter holder screw: **10 to 12 N·m** (PDF p. 101).

## Check your work
- The key-on sweep or lamp test works every time.
- The dashboard stays on over bumps and with the handlebar at full lock both ways.
- Clock and trip memory survive a night with the key off.

## If it did not fix the problem
- Only the speedometer is wrong: [Check the speed sensor](/moto-zero/repair/repairs/speed-sensor-check).
- Warning lamps flicker or come on wrongly: [Warning lights flicker or come on wrongly](/moto-zero/repair/problems/warning-lights-flicker).
- Only the fuel gauge is wrong: [Fuel gauge reads wrong or does not move](/moto-zero/repair/problems/fuel-gauge-wrong).

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Meter holder mounting screw | 10 to 12 N·m | PDF p. 101 |
| Minimum battery voltage for diagnostic tool | 8.5 V | PDF p. 274 |

## Problems this repair helps with

- [Instruments or dashboard are dead](/moto-zero/repair/problems/dash-dead)
- [Fuel gauge reads wrong or does not move](/moto-zero/repair/problems/fuel-gauge-wrong)
- [Neutral light does not work or stays on in gear](/moto-zero/repair/problems/neutral-light-fault)
- [Speedometer or odometer does not work](/moto-zero/repair/problems/speedo-dead)
- [Warning lights flicker or come on wrongly](/moto-zero/repair/problems/warning-lights-flicker)

## Parts for this job

| Part | Buy |
|---|---|
| [Instruments](/moto-zero/repair/parts/instruments) | [Find this part](/spare-parts/instruments) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |
| [Ignition switch](/moto-zero/repair/parts/ignition_switch) | [Find this part](/spare-parts/ignition-switch) |

## Sources

- K-Light 125 manual, PDF p. 97
- K-Light 125 manual, PDF p. 100
- K-Light 125 manual, PDF p. 101
- K-Light 125 manual, PDF p. 269
- K-Light 125 manual, PDF p. 274
- K-Light 125 manual, PDF p. 278
- [HELLA Tech World: CAN bus and vehicle lighting](https://www.hella.com/techworld/sg/lounge/can-bus-vehicle-lighting-bulb-replacement-workshop)
