---
id: cdi-ecu-diagnosis
title: Diagnose a suspected CDI or ECU fault
level: workshop
time: 1 to 2 h assessment (estimate)
applies_to:
- carburettor
- fuel-injected
- four-stroke
- two-stroke
tools:
- digital multimeter
- wiring diagram
- diagnostic tool for your bike (fuel injection)
- spark tester
- a known good unit of the same part number if available
parts:
- cdi
- ecu
- pickup
- ignition_coil
- wiring
- earth_strap
- fuse
- battery
consumables:
- contact cleaner
- dielectric grease
fixes:
- cdi-ecu-suspect
- coil-fails-hot
- engine-warning-light
- ignition-timing-suspect
- kickstart-kickback
- no-spark
- weak-spark
- cuts-out-random
---

# Diagnose a suspected CDI or ECU fault

**Workshop job (assessment and hand-off)** · Time: 1 to 2 h assessment (estimate) (estimate)


The CDI (capacitor discharge ignition unit) on carburettor bikes, or the ECU (engine control unit) on fuel-injected bikes, decides when to fire the spark. These units are expensive and rarely the real fault. Most "dead CDI" bikes have a bad connector, earth, switch, pick-up or coil. This page lists the checks to finish first, then what a workshop does to prove the unit is faulty. Test the module last.

## Safety
- Key OFF before unplugging the CDI or ECU. Unplugging with power on can damage it (K-Light 125 manual).
- Never use a test lamp on ECU sensor wires; it can draw too much current. Use a digital meter.
- Never probe the back of an ECU connector with a sharp pin that can spread the terminal.

## Checks to finish first (home)
1. **Battery.** Charged and terminals tight. A low battery gives weak spark and confuses an ECU. **K-Light 125: the ECU works from 9 to 16 V; a diagnostic tool needs at least 8.5 V at the battery.** See [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
2. **Fuses and earths.** All fuses, the main earth and the ECU or CDI earth wire clean and tight: [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check), [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
3. **Switches.** Key switch and engine stop switch: [Test the engine stop switch](/moto-zero/repair/repairs/kill-switch-test). Side stand and neutral switches: [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test).
4. **Connectors.** Unplug the CDI or ECU connector (key OFF). Look for green corrosion, water, pushed-back pins. MAVCC notes dirty connections are a common electronic ignition fault.
5. **Pick-up.** [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test).
6. **Coil and cap.** [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test).
7. **Fault codes (fuel injection).** Key ON: the engine warning lamp (MIL) should light briefly. If it never lights, check its fuse, earth and the ECU plug (K-Light 125 manual). Read codes: [Read engine fault codes (fuel injection)](/moto-zero/repair/repairs/efi-code-read).
8. **Battery-powered CDI (DC-CDI).** Check that battery voltage reaches the CDI power wire with the key ON.
9. **Magneto CDI (AC-CDI, many two-strokes and kickstart bikes).** The CDI is charged by a source (exciter) coil in the stator. Test that coil's resistance to your manual's value: [Test the stator (generator coils)](/moto-zero/repair/repairs/stator-test).

## What the workshop will do
- Check power and earth at the unit's connector pins with the wiring diagram and the correct pin chart. This page gives no universal pin values: each bike differs.
- Read live data (engine speed while cranking, battery voltage) on a fuel-injected bike. No engine speed signal while cranking points to the pick-up circuit.
- Fit a known good unit with the **same part number** and test. The K-Light 125 troubleshooting uses this swap method. Some ECUs are coded to the key (immobiliser) and need dealer programming; ask before buying a second-hand unit.
- Check ignition timing if the unit works but the engine runs badly: [Check the ignition timing](/moto-zero/repair/repairs/ignition-timing-check).

Ask for: what was tested before the unit was condemned, and whether the old unit can be returned if the new one does not fix it.

## Check your work
- Strong spark on every turn, steady idle, no warning lamp after the repair.

## If it did not fix the problem
- Faults that come and go with vibration or rain: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| ECU working supply voltage | 9 to 16 V DC | 255 |
| Minimum battery voltage for the diagnostic tool | 8.5 V | 274 |

## Problems this repair helps with

- [CDI or ECU suspected faulty](/moto-zero/repair/problems/cdi-ecu-suspect)
- [Ignition cuts out when hot and returns when cool](/moto-zero/repair/problems/coil-fails-hot)
- [Engine warning light (check engine, MIL) is on or flashing](/moto-zero/repair/problems/engine-warning-light)
- [Ignition timing suspected wrong](/moto-zero/repair/problems/ignition-timing-suspect)
- [Kickstarter kicks back against my foot](/moto-zero/repair/problems/kickstart-kickback)
- [No spark at the spark plug](/moto-zero/repair/problems/no-spark)
- [Weak, thin or orange spark](/moto-zero/repair/problems/weak-spark)
- [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random)

## Parts for this job

| Part | Buy |
|---|---|
| [CDI unit](/moto-zero/repair/parts/cdi) | [Find this part](/spare-parts/cdi) |
| [ECU](/moto-zero/repair/parts/ecu) | [Find this part](/spare-parts/ecu) |
| [Ignition pick-up](/moto-zero/repair/parts/pickup) | [Find this part](/spare-parts/pickup) |
| [Ignition coil and plug cap](/moto-zero/repair/parts/ignition_coil) | [Find this part](/spare-parts/ignition-coil) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |

## Sources

- K-Light 125 manual, PDF p. 85
- K-Light 125 manual, PDF p. 86
- K-Light 125 manual, PDF p. 255
- K-Light 125 manual, PDF p. 274
- K-Light 125 manual, PDF p. 275
- MAVCC Motorcycle Mechanic, PDF p. 628
