---
id: ev-aux-check
title: Check the 12 V auxiliary system
level: home
time: 20 to 40 min (estimate)
applies_to:
- electric
tools:
- multimeter
- small spanner or screwdriver set
- battery charger that matches the 12 V battery type
parts:
- aux_battery
- dc_dc
- fuse
- wiring
- earth_strap
consumables:
- contact cleaner
fixes:
- ev-aux-battery-flat
- ev-dash-dark
- ev-no-ready
- ev-swap-not-recognised
---

# Check the 12 V auxiliary system

**Home mechanic (basic tools)** · Time: 20 to 40 min (estimate) (estimate)


Many electric motorcycles have a small low-voltage system that runs the lights, horn, dashboard and the computers that switch on the big battery. Some have a small **12 V auxiliary battery**; others take 12 V straight from the traction battery through a **DC-DC converter** (a box that steps the high voltage down to 12 V). If this low-voltage side fails, the bike can look completely dead even with a full traction battery, because the computers and the main contactor (the heavy switch that connects the big battery) cannot wake up.

## Safety
- Work only on the 12 V side. Do not open the traction battery, the DC-DC converter or the controller. See [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
- Turn the bike off and unplug the charger before you touch any 12 V wiring.
- A 12 V lithium battery needs a charger made for lithium. A lead-acid charger can damage it.
- Never jump-start an electric motorcycle from a running car or another bike unless the manufacturer's manual says how.

## You need
- Multimeter set to DC volts.
- The owner's manual, to find where the 12 V battery and fuses are, and whether your model has a 12 V battery at all.
- A charger that matches the battery type (lead-acid/AGM or lithium).

## Steps
1. Find out from the manual whether your bike has a 12 V battery. If it does not, skip to step 7.
2. Remove the seat or cover and find the 12 V battery. Look for loose, corroded or green terminals.
3. With the bike off, measure across the 12 V battery terminals. Write down the reading. Compare it with the value in your bike's manual; for a lead-acid battery, also see [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
4. If the terminals are dirty or loose, clean and tighten them: [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean).
5. If the reading is low, charge the battery with the right charger, then try to power the bike on.
6. If the bike wakes up, measure the 12 V battery again with the bike switched on and in ready mode. On many bikes the reading should rise because the DC-DC converter is now charging it. If it does not rise, the converter or its fuse may be faulty: this is workshop work.
7. Check the low-voltage fuses: [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check). Replace a blown fuse only with the same rating. If it blows again, stop and see [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing).
8. Check the earth (ground) wires near the battery and frame: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
9. If the 12 V battery goes flat again after a few days parked, look for a drain: [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test). Alarms, GPS trackers and fleet telematics units can drain a small battery.

## Check your work
- The dashboard lights up at key on and the bike goes to ready.
- The 12 V reading rises when the bike is on (where the manual says it should).
- The battery holds its charge after the bike is parked for a few days.

## If it did not fix the problem
- 12 V is good but the dash stays dark: [Dashboard is dark and the bike seems dead](/moto-zero/repair/problems/ev-dash-dark).
- Dash is on but no ready: [Dashboard is on but the bike will not go to ready](/moto-zero/repair/problems/ev-no-ready).
- 12 V battery keeps going flat with no drain found: the DC-DC converter needs a workshop check.
- Before long parking, see [Store an electric motorcycle](/moto-zero/repair/repairs/ev-storage).

## Problems this repair helps with

- [Small 12 V battery is flat](/moto-zero/repair/problems/ev-aux-battery-flat)
- [Dashboard is dark and the bike seems dead](/moto-zero/repair/problems/ev-dash-dark)
- [Dashboard is on but the bike will not go to ready](/moto-zero/repair/problems/ev-no-ready)
- [Swapped battery is not recognised](/moto-zero/repair/problems/ev-swap-not-recognised)

## Parts for this job

| Part | Buy |
|---|---|
| [12 V auxiliary battery (electric)](/moto-zero/repair/parts/aux_battery) | [Find this part](/spare-parts/aux-battery) |
| [DC-DC converter](/moto-zero/repair/parts/dc_dc) | [Find this part](/spare-parts/dc-dc) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |

## Sources

- [SolarQuotes: Your EV has a 12 volt battery](https://www.solarquotes.com.au/blog/ev-12-volt-battery/)
- [Zero Motorcycles: Long-term storage](https://zeromotorcycles.com/stories/long-term-storage)
