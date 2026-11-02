---
id: charging-system-test
title: Test the charging system
level: home
time: 20 to 30 min
applies_to:
- electric-start
- kickstart
- fuel-injected
- carburettor
tools:
- digital multimeter
- tachometer or rev counter on the dashboard
- safety glasses
parts:
- battery
- regulator
- stator
- fuse
- wiring
consumables: []
fixes:
- accessory-wiring-fault
- all-lights-out
- battery-corrosion
- battery-flat
- battery-swollen
- bulbs-blow-often
- cuts-out-random
- dim-lights-idle
- headlight-dim
- headlight-flicker
- new-battery-dies
- not-charging
- overcharging
- regulator-hot
- stator-burnt
- warning-lights-flicker
---

# Test the charging system

**Home mechanic (basic tools)** · Time: 20 to 30 min (estimate)


While the engine runs, the stator (the generator coils behind the flywheel) makes AC power. The regulator rectifier turns it into DC and holds the voltage at a safe level to charge the battery. This test measures that voltage at the battery and tells you whether the system charges too little, too much, or correctly.

## Safety
- Run the engine outdoors only. Exhaust gas kills.
- Keep hands, leads and clothes away from the chain, wheel and hot exhaust.
- Put the bike on the centre stand in neutral, or ask a helper to hold it.
- Do not unplug the battery or any connector while the engine runs. This can destroy the regulator and the ECU (K-Light 125 manual).

## You need
- A digital multimeter on DC volts (20 V range on a manual meter).
- A rev counter. If the bike has none, a workshop can measure engine speed.
- A fully charged battery. A flat battery gives a false low reading. Charge it first with [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).

## Steps
1. Check the main fuse first. K-Light 125: **20 A main fuse** between the regulator and the battery. A blown main fuse means no charging at all. See [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
2. Warm the engine to normal temperature.
3. Connect the red probe to battery + and the black probe to battery −. Note the reading with the engine off.
4. Start the engine and let it idle. The voltage should be a little higher than with the engine off.
5. Raise the engine speed slowly to the test speed in your manual. **K-Light 125: 5000 rpm.**
6. Read the voltage. **K-Light 125: 14.5 ± 0.5 V at 5000 rpm.** Other bikes: use your manual's value and test speed.
7. Switch the headlight on and read again. The voltage may fall a little with the lights on; that is normal (K-Light 125 manual).
8. Let the engine return to idle and switch it off.

## What the result means
| Reading at test speed | Meaning | Next step |
|---|---|---|
| Within the manual range | Charging system works | If the battery still goes flat, look for a drain: [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test), or replace a worn battery |
| No rise above the engine-off reading | Not charging | Check fuse and connectors, then [Test the stator](/moto-zero/repair/repairs/stator-test) and [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test) |
| Rises a little but stays below range | Weak charging | Check the regulator connector and earth, then test stator and regulator |
| Above range and still rising with revs | Overcharging, usually the regulator or its earth | Stop riding. [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test) and [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Jumps up and down | Loose connection or failing regulator | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |

The old MAVCC course used "about 15 V" as a pass value for all bikes. Do not use one number for every bike: use your model's value.

## Check your work
- After a repair, repeat the test and get a reading inside the range.
- Ride for a few days and confirm the battery stays charged.

## If it did not fix the problem
- Not charging and the regulator connector is brown or melted: [Regulator is very hot or the connector has melted](/moto-zero/repair/problems/regulator-hot).
- Burnt smell from the engine side cover: [Burnt smell from the generator or a dark stator connector](/moto-zero/repair/problems/stator-burnt).

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Charging voltage | 14.5 ± 0.5 V at 5000 rpm | 78 |
| Main fuse | 20 A | 74 |
| Regulator type | Three-phase full-wave regulator rectifier | 76 |

## Problems this repair helps with

- [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault)
- [All lights stop working](/moto-zero/repair/problems/all-lights-out)
- [Battery terminals are corroded](/moto-zero/repair/problems/battery-corrosion)
- [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat)
- [Battery is boiling, swollen or leaking](/moto-zero/repair/problems/battery-swollen)
- [Bulbs keep blowing](/moto-zero/repair/problems/bulbs-blow-often)
- [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random)
- [Lights go dim at idle](/moto-zero/repair/problems/dim-lights-idle)
- [Headlight is dim](/moto-zero/repair/problems/headlight-dim)
- [Headlight flickers](/moto-zero/repair/problems/headlight-flicker)
- [A new battery goes flat quickly](/moto-zero/repair/problems/new-battery-dies)
- [Battery is not charging while riding](/moto-zero/repair/problems/not-charging)
- [Battery overcharges and bulbs blow](/moto-zero/repair/problems/overcharging)
- [Regulator is very hot or the connector has melted](/moto-zero/repair/problems/regulator-hot)
- [Burnt smell from the generator or a dark stator connector](/moto-zero/repair/problems/stator-burnt)
- [Warning lights flicker or come on wrongly](/moto-zero/repair/problems/warning-lights-flicker)

## Parts for this job

| Part | Buy |
|---|---|
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |
| [Regulator rectifier](/moto-zero/repair/parts/regulator) | [Find this part](/spare-parts/regulator) |
| [Stator and flywheel](/moto-zero/repair/parts/stator) | [Find this part](/spare-parts/stator) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |

## Sources

- K-Light 125 manual, PDF p. 34
- K-Light 125 manual, PDF p. 74
- K-Light 125 manual, PDF p. 76
- K-Light 125 manual, PDF p. 78
- MAVCC Motorcycle Mechanic, PDF p. 309
