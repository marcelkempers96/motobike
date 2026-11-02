---
id: fuel-sender-test
title: Test the fuel level sender
level: home
time: 20 to 30 min for checks on the bike; 1 to 2 h if the sender is removed (estimate)
applies_to:
- four-stroke
- two-stroke
- carburettor
- fuel-injected
tools:
- multimeter
- screwdrivers
- torch
- fuel can
- rags
- safety glasses
- fire extinguisher
parts:
- fuel_sender
- instruments
- wiring
- earth_strap
- fuse
- fuel_tank
consumables:
- new sender rubber seal if removed
fixes:
- fuel-gauge-wrong
---

# Test the fuel level sender

**Home mechanic (basic tools)** · Time: 20 to 30 min for checks on the bike; 1 to 2 h if the sender is removed (estimate) (estimate)


Most fuel gauges are worked by a **sender** inside the tank: a float on an arm moves a contact across a resistor, so the resistance changes with the fuel level. The gauge on the dashboard reads that resistance. Some small bikes have only a low-fuel warning light worked by a level switch, and many have no gauge at all, just a reserve tap. A gauge that reads wrong is a nuisance, but it can leave you stranded.

## Safety

- Removing the sender opens the tank. Work outdoors, engine cold, no flames, extinguisher near you, and drain the fuel first.
- Key OFF before unplugging anything.

## You need

- Your manual's sender resistance at empty and full, and the wiring diagram. Values differ between bikes.
- A new rubber seal for the sender if you remove it.

## Steps

1. **Check the fuel level for real.** Look into the tank with a torch. Fill a known amount and see if the gauge moves.
2. **Check other instruments.** If the whole dashboard is dead or flickers, the problem is power to the instruments, not the sender: see [Instruments or dashboard are dead](/moto-zero/repair/problems/dash-dead).
3. **Fuse:** check the fuse for the instruments: [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
4. **Connector:** find the sender plug on top of or under the tank (K-Light 125: on the tank, unplugged when removing the tank). Look for corrosion or a pulled wire; clean and refit it.
5. **Gauge test:** key ON, unplug the sender. Most gauges then go to one end of the scale. Join the two harness-side terminals with a short wire: most gauges go to the other end. If the needle or bars move fully both ways, the gauge and wiring work and the sender is at fault. If nothing moves, check the wiring and earth back to the dashboard: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find). Check your manual first; some electronic dashboards show a fault instead.
6. **Sender resistance on the bike:** key OFF, sender unplugged. Measure across its two terminals with the multimeter on ohms. Compare with your manual at the current fuel level. An open circuit (no reading) or a reading that jumps means a worn or broken sender.
7. **Remove and test (home, careful):** drain the tank, remove the tank if needed, then undo the sender nuts and lift it out without bending the float arm. Move the float slowly from bottom to top while watching the meter: the reading should change smoothly with no gaps. Shake the float: fuel inside means it sinks; replace the sender.
8. Refit with a new rubber seal, tighten the nuts evenly (K-Light 125: 5 to 9 N·m), refill and check for leaks around the sender.

## Check your work

- The gauge follows the fuel level from full to low, and no fuel smell or wet mark at the sender.

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Fuel level sensor mounting nut | 5 to 9 N·m | 187 |

## Problems this repair helps with

- [Fuel gauge reads wrong or does not move](/moto-zero/repair/problems/fuel-gauge-wrong)

## Parts for this job

| Part | Buy |
|---|---|
| [Fuel level sender](/moto-zero/repair/parts/fuel_sender) | [Find this part](/spare-parts/fuel-sender) |
| [Instruments](/moto-zero/repair/parts/instruments) | [Find this part](/spare-parts/instruments) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Fuel tank](/moto-zero/repair/parts/fuel_tank) | [Find this part](/spare-parts/fuel-tank) |

## Sources

- K-Light 125 manual, PDF p. 180
- K-Light 125 manual, PDF p. 183
- K-Light 125 manual, PDF p. 187
- K-Light 125 manual, PDF p. 278
