---
id: accessory-wiring
title: Wire an accessory safely
level: home
time: 60 to 120 min
applies_to:
- all
tools:
- digital multimeter
- crimp tool
- wire stripper
- screwdrivers
- spanners
- heat gun
parts:
- wiring
- fuse
- battery
- earth_strap
consumables:
- wire of suitable thickness
- inline fuse holder and fuse
- relay and relay socket if needed
- insulated crimp terminals
- adhesive-lined heat-shrink
- split sleeve
- cable ties
fixes:
- accessory-wiring-fault
- burning-smell-wiring
- fuse-keeps-blowing
- horn-weak
- new-battery-dies
- no-power-key-on
- parasitic-drain
- battery-flat
- dim-lights-idle
---

# Wire an accessory safely

**Home mechanic (basic tools)** · Time: 60 to 120 min (estimate)


Phone chargers, extra lights, alarms, GPS trackers and heated grips are common add-ons. Badly fitted, they cause many electrical faults: blown fuses, flat batteries, melted switches, burnt wires and fires. The safe way is simple: a fuse close to the battery, the right wire, power switched by the ignition through a relay, a good earth, and no cutting into the factory wiring.

## Safety
- Disconnect the battery negative before you start. Reconnect it last.
- **Fit the fuse as close to the battery positive terminal as you can.** The fuse protects the wire between it and the accessory. An unfused wire from the battery that rubs through can start a fire.
- Do not cut, tap or splice into the factory harness on bikes with an ECU, ABS, CAN-bus dashboard or lighting control unit. Changing the current in their wires can set fault codes or switch off functions. Use the maker's accessory socket or a plug-in adapter made for that model.
- On an electric motorcycle, take power only from the 12 V system and only within what the maker allows. Never connect anything to the traction battery.

## You need
- The accessory maker's instructions: they give the current it draws and the fuse rating and wire size to use.
- **Wire** at least as thick as the maker asks for. Thicker is safe; thinner gets hot.
- An **inline fuse holder** with a fuse of the rating the accessory maker gives. The fuse must also be small enough to protect the wire you use.
- A **relay**, for anything that draws more than a small charger. The ignition-switched wire only turns the relay on; the relay takes the heavy current straight from the fused battery feed.
- An idea of how much spare power your bike has. Small commuter alternators have little to spare. The K-Light manual even gives two different alternator outputs in different places (PDF pp. 19 and 76), so ask your dealer for your model. Check that the system can carry the extra load before you add it (MAVCC PDF p. 294).

## Steps
1. **Plan the route.** Decide where the accessory, fuse, relay and wires will go. Keep wires away from the exhaust, the steering stops, the suspension and sharp edges.
2. **Choose a switched trigger.** Find a wire that is live only with the key on. The safest is a spare accessory plug in the harness, if your bike has one. Do not use the headlight or brake light wire.
3. **Fit the fused battery feed.** Ring terminal on battery positive, inline fuse holder within a short distance, then the wire to the relay or accessory.
4. **Fit the relay** (if used). Connect: fused battery feed to the relay switch input; relay switch output to the accessory; relay coil to the key-on trigger wire and to earth. Mount the relay where water cannot pool on it, terminals facing down.
5. **Earth.** Run the accessory earth wire back to the battery negative or a clean, bare frame earth point: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
6. **Make the joints.** Use crimp terminals with the correct crimp tool. Pull each one hard. Seal with adhesive-lined heat-shrink. Avoid tap-type "scotch lock" connectors: they cut wire strands and let water in. If you solder, support the wire on both sides with cable ties (splice methods: MAVCC PDF p. 318).
7. **Protect and fix the wires.** Sleeve them and tie them to the frame or harness. Check full steering lock both ways and full suspension travel.
8. **Reconnect the battery and test.** The accessory works with the key on and switches off with the key off.
9. **Check the drain.** Key off, meter on DC volts across the battery. Leave the bike overnight and check again. A big fall means something is still drawing current: [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test). Alarms and trackers draw current all the time by design: charge the battery more often or choose a low-drain model.
10. **Check the charging.** Run the engine at idle with the accessory and headlight on. If the lights go dim, the load is too high for the alternator: [Test the charging system](/moto-zero/repair/repairs/charging-system-test).

## Check your work
- The fuse is close to the battery and the right rating.
- No wire or joint is warm after 30 minutes of use.
- The battery stays charged after normal riding and overnight parking.
- No warning lamps on the dashboard.

## If it did not fix the problem
- Faults started after fitting: [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault).
- The accessory fuse blows: [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find).

## Problems this repair helps with

- [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault)
- [Burning smell from the wiring](/moto-zero/repair/problems/burning-smell-wiring)
- [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing)
- [Horn is weak or croaky](/moto-zero/repair/problems/horn-weak)
- [A new battery goes flat quickly](/moto-zero/repair/problems/new-battery-dies)
- [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on)
- [Something drains the battery with the key off](/moto-zero/repair/problems/parasitic-drain)
- [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat)
- [Lights go dim at idle](/moto-zero/repair/problems/dim-lights-idle)

## Parts for this job

| Part | Buy |
|---|---|
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |

## Sources

- MAVCC Motorcycle Mechanic, PDF p. 294
- MAVCC Motorcycle Mechanic, PDF p. 318
- K-Light 125 manual, PDF p. 76
- K-Light 125 manual, PDF p. 19
- [HELLA Tech World: CAN bus and vehicle lighting](https://www.hella.com/techworld/sg/lounge/can-bus-vehicle-lighting-bulb-replacement-workshop)
