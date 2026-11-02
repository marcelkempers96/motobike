---
id: neutral-switch-test
title: Test the neutral switch
level: home
time: 20 to 45 min
applies_to:
- four-stroke
- two-stroke
- semi-auto
tools:
- multimeter
- screwdrivers
- spanners
- drain pan if the switch sits below the oil level
parts:
- interlock_switches
- wiring
- instruments
- fuse
- engine_oil
consumables:
- new sealing washer or O-ring for the switch
- contact cleaner
fixes:
- dies-side-stand
- hard-to-find-neutral
- neutral-light-fault
- start-blocked-interlock
---

# Test the neutral switch

**Home mechanic (basic tools)** · Time: 20 to 45 min (estimate)


The neutral switch sits in the engine case and touches the shift drum. In neutral it connects its wire to the engine metal (earth), which turns on the green "N" light. On many bikes the same signal also lets the starter work and tells the engine computer (ECU) the gearbox is in neutral, for example so the engine is allowed to run with the side stand down. On the K-Light 125 the starter relay can be earthed through the neutral switch, and the ECU has a neutral input. Some bikes have a gear position sensor with several wires instead of a single switch; test those only with your manual's table.

## Safety
- Key off before unplugging anything.
- If the switch is below the oil level, drain the oil first, or oil runs out when you remove the switch. Hot oil burns.
- Do not connect the switch wire straight to the battery. Use the meter.

## You need
- A multimeter set to continuity (beep) or the lowest resistance range.
- Tools to remove the sprocket cover or left side cover, if the switch is behind it. On the K-Light the gear position switch is on the left crankcase, under the front cover behind the flywheel area.
- A new sealing washer or O-ring if you remove the switch.

## Steps
1. Key on. Do the other dash lights work? If none work, the fault is power to the dash: [Check power to the instruments](/moto-zero/repair/repairs/dash-power-check).
2. Find neutral by rocking the bike with the clutch out: the bike should roll freely. Note what the light does.
3. Key off. Find the switch (follow the thin wire from the engine case) and unplug its wire.
4. Put one meter probe on the switch terminal and the other on clean bare engine metal.
5. Select neutral (turn the rear wheel by hand to help): the meter should show continuity.
6. Select first gear: the meter should show no continuity (open).
7. **Both results correct:** the switch is good. Check the wire and connector from the switch to the dash and ECU: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) and [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).
8. **No continuity in neutral:** clean the terminal and retest. If still open, the switch or its contact is faulty.
9. **Continuity in every gear:** the switch is shorted inside, or the wire is rubbing through to the engine or frame. Check the wire for bare spots before buying a switch.
10. To replace the switch, drain the oil if needed, remove the switch screws or unscrew the switch, fit the new one with a new seal, refill the oil ([Check the engine oil level](/moto-zero/repair/repairs/oil-level-check)).

## Check your work
- The N light comes on only in neutral and goes out in every gear.
- The bike starts in neutral as normal, and the start safety system still blocks starting in gear without the clutch pulled (if your bike has one): [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test).
- No oil leak around the switch after a short ride.

## If it did not fix the problem
- Light comes and goes while riding: [Electrical faults come and go](/moto-zero/repair/problems/intermittent-electrical).
- Bike dies when you put it in gear: [Engine dies when the side stand moves or the bike is put in gear](/moto-zero/repair/problems/dies-side-stand).
- Light correct but the bike will not start in neutral: [Will not start in gear, on the side stand or without the clutch pulled](/moto-zero/repair/problems/start-blocked-interlock).

## Problems this repair helps with

- [Engine dies when the side stand moves or the bike is put in gear](/moto-zero/repair/problems/dies-side-stand)
- [Hard to find neutral](/moto-zero/repair/problems/hard-to-find-neutral)
- [Neutral light does not work or stays on in gear](/moto-zero/repair/problems/neutral-light-fault)
- [Will not start in gear, on the side stand or without the clutch pulled](/moto-zero/repair/problems/start-blocked-interlock)

## Parts for this job

| Part | Buy |
|---|---|
| [Side stand, clutch and neutral switches](/moto-zero/repair/parts/interlock_switches) | [Find this part](/spare-parts/interlock-switches) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Instruments](/moto-zero/repair/parts/instruments) | [Find this part](/spare-parts/instruments) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Engine oil](/moto-zero/repair/parts/engine_oil) | [Find this part](/spare-parts/engine-oil) |

## Sources

- K-Light 125 manual, PDF p. 90
- K-Light 125 manual, PDF p. 237
- K-Light 125 manual, PDF p. 254
- K-Light 125 manual, PDF p. 278
