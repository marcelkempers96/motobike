---
id: wiring-fault-find
title: Find a wiring fault
level: home
time: 30 to 90 min
applies_to:
- all
tools:
- digital multimeter
- thin pins for back-probing
- wiring diagram for your bike
- torch
- screwdrivers
- crimp tool
- wire stripper
parts:
- wiring
- earth_strap
- fuse
- handlebar_switches
- ignition_switch
consumables:
- insulated crimp connectors
- adhesive-lined heat-shrink tube
- cable ties
- electrical tape
- dielectric grease
fixes:
- accessory-wiring-fault
- all-lights-out
- burning-smell-wiring
- cuts-out-bumps
- dies-side-stand
- fan-not-working
- fuel-gauge-wrong
- fuel-pump-noisy
- fuel-pump-silent
- fuse-keeps-blowing
- headlight-flicker
- ignition-switch-fault
- intermittent-electrical
- kill-switch-fault
- neutral-light-fault
- no-power-key-on
- no-start-after-storage
- oil-warning-light
- start-blocked-interlock
- switch-fault
- tail-light-out
- temp-gauge-high
- warning-lights-flicker
- wet-connectors
- cuts-out-random
---

# Find a wiring fault

**Home mechanic (basic tools)** · Time: 30 to 90 min (estimate)


The wiring harness (loom) carries power and signals around the bike. Wires break inside their insulation, connectors corrode and earths come loose, often so the fault comes and goes with bumps, heat, rain or steering. The method works on any bike: read the diagram, split the circuit in half, test, and repeat (MAVCC PDF p. 292).

## Safety
- Disconnect the battery negative before you cut, strip or join any wire.
- Do not probe ECU, ABS or CAN-bus wires with a bulb test light or jumper wire: you can damage the units. Use a digital multimeter, back-probing only.
- Rats often chew harnesses on parked bikes. Wear gloves when you clean out nests and droppings.
- On an electric motorcycle, work only on the 12 V wiring. Orange cables are high voltage: leave them to a trained technician, see [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).

## You need
- The **wiring diagram** for your exact model, and its colour key. Colour codes on most diagrams use letters, for example on the K-Light 125: B black, BL blue, G green, R red, W white, Y yellow, and two letters such as R/W for a red wire with a white stripe (PDF p. 278).
- A charged battery: check it first (K-Light PDF p. 97).

## Steps
1. **Describe the fault exactly.** Which items fail? When: on bumps, at full lock, when hot, in rain? Which items still work? Understanding the complaint is the first step (MAVCC PDF p. 291).
2. **Find what the dead items share.** On the diagram, mark the circuits that fail. A fuse, a connector, a switch or an earth point they all use is your first suspect. If both brake light and horn fail, for example, look for the fuse or connector they share (MAVCC PDF p. 295).
3. **Look at the likely places.** Check these by eye and by hand before you measure:
   - Where the harness bends at the steering head. Turn the bars lock to lock while watching it.
   - Inside the headlight shell, where many connectors sit together.
   - Under the seat and around the battery and fuse box.
   - Where wires pass under the rear mudguard to the tail light and number plate.
   - Where the harness touches the frame, engine or exhaust, and anywhere an accessory was added.
4. **Wiggle test.** Turn on the failing circuit (key on, headlight on). Bend and pull gently at each connector and harness section, one at a time. When the fault appears or disappears, you have found the area.
5. **Split the circuit.** If the wiggle test does not find it, measure. Meter on DC volts (V with a straight line, 20 V range), black probe on battery negative. Back-probe a connector about halfway between the battery and the dead item. Power present: the fault is between there and the item. No power: it is between the battery and there. Go halfway again, and repeat.
6. **Test wires one by one.** Key off, both ends unplugged. Meter on continuity (beep). Probe each end of the wire: it should beep. While probing, bend and pull the wire along its length: a beep that comes and goes means a broken core inside the insulation.
7. **Check earths.** Many intermittent faults are earth faults: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
8. **Repair the wire.**
   - Cut out the damaged section. Use wire of the same thickness or thicker.
   - Strip the ends, join with insulated crimp connectors, and pull each joint hard to test it.
   - Cover with adhesive-lined heat-shrink. If you solder, slide the heat-shrink on before joining, and support the wire on both sides with cable ties so vibration does not crack it (splice method: MAVCC PDF p. 318).
9. **Protect the harness.** Sleeve it and tie it away from sharp edges, hot parts and moving parts, with enough slack to steer.

## Check your work
- The fault does not return when you repeat the wiggle test and turn the bars lock to lock.
- Ride over rough road and in the wet: everything keeps working.
- No new chafe points: nothing pulls tight at full steering lock.

## If it did not fix the problem
- Faults only after rain or washing: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- A fuse blows: [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find).
- Wiring good but a part is weak or warm: [Do a voltage drop test](/moto-zero/repair/repairs/voltage-drop-test).
- Harness badly burnt or chewed in many places: a new harness is a workshop job. Ask for a harness for your exact model and year.

## Problems this repair helps with

- [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault)
- [All lights stop working](/moto-zero/repair/problems/all-lights-out)
- [Burning smell from the wiring](/moto-zero/repair/problems/burning-smell-wiring)
- [Cuts out when riding over bumps](/moto-zero/repair/problems/cuts-out-bumps)
- [Engine dies when the side stand moves or the bike is put in gear](/moto-zero/repair/problems/dies-side-stand)
- [Radiator fan does not switch on](/moto-zero/repair/problems/fan-not-working)
- [Fuel gauge reads wrong or does not move](/moto-zero/repair/problems/fuel-gauge-wrong)
- [Fuel pump whines loudly or runs all the time](/moto-zero/repair/problems/fuel-pump-noisy)
- [No buzz from the fuel pump when the key is turned on](/moto-zero/repair/problems/fuel-pump-silent)
- [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing)
- [Headlight flickers](/moto-zero/repair/problems/headlight-flicker)
- [Ignition switch is stiff or cuts power](/moto-zero/repair/problems/ignition-switch-fault)
- [Electrical faults come and go](/moto-zero/repair/problems/intermittent-electrical)
- [Engine stop switch fault](/moto-zero/repair/problems/kill-switch-fault)
- [Neutral light does not work or stays on in gear](/moto-zero/repair/problems/neutral-light-fault)
- [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on)
- [Will not start after standing for weeks or months](/moto-zero/repair/problems/no-start-after-storage)
- [Oil pressure or oil level light is on](/moto-zero/repair/problems/oil-warning-light)
- [Will not start in gear, on the side stand or without the clutch pulled](/moto-zero/repair/problems/start-blocked-interlock)
- [Handlebar switch does not work properly](/moto-zero/repair/problems/switch-fault)
- [Tail light does not work](/moto-zero/repair/problems/tail-light-out)
- [Temperature gauge reads high or the warning light is on](/moto-zero/repair/problems/temp-gauge-high)
- [Warning lights flicker or come on wrongly](/moto-zero/repair/problems/warning-lights-flicker)
- [Electrical faults after rain or washing](/moto-zero/repair/problems/wet-connectors)
- [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random)

## Parts for this job

| Part | Buy |
|---|---|
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Handlebar switches](/moto-zero/repair/parts/handlebar_switches) | [Find this part](/spare-parts/handlebar-switches) |
| [Ignition switch](/moto-zero/repair/parts/ignition_switch) | [Find this part](/spare-parts/ignition-switch) |

## Sources

- MAVCC Motorcycle Mechanic, PDF p. 291
- MAVCC Motorcycle Mechanic, PDF p. 292
- MAVCC Motorcycle Mechanic, PDF p. 293
- MAVCC Motorcycle Mechanic, PDF p. 295
- MAVCC Motorcycle Mechanic, PDF p. 318
- K-Light 125 manual, PDF p. 97
- K-Light 125 manual, PDF p. 278
