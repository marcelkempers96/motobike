---
id: ev-aux-battery-flat
title: Small 12 V battery is flat
system: ev-battery
also_called: [12V battery dead electric, auxiliary battery flat, accessory battery low]
urgency: do-not-ride
applies_to: [electric]
parts: [aux_battery, dc_dc, fuse, wiring, earth_strap]
repairs: [ev-aux-check, battery-test-charge, battery-terminal-clean, parasitic-drain-test, ev-storage, battery-replace]
related: [ev-dash-dark, ev-no-ready, battery-flat, parasitic-drain, new-battery-dies]
sources:
  - {doc: "SolarQuotes: Your EV has a 12 volt battery", url: "https://www.solarquotes.com.au/blog/ev-12-volt-battery/"}
  - {doc: "Zero Motorcycles: Long-term storage", url: "https://zeromotorcycles.com/stories/long-term-storage"}
---

# Small 12 V battery is flat

Some electric motorcycles have a small **12 V auxiliary battery** besides the big traction battery. It powers the dashboard, lights, horn, alarm and the computers that switch on the main battery. When the bike is on, a **DC-DC converter** recharges it from the traction battery. If the 12 V battery goes flat, the bike can stay dead or refuse to go to ready, even with a full traction battery (SolarQuotes). Many small commuter bikes have no 12 V battery at all; check your manual first.

## Is it safe to ride?
The bike usually cannot be ridden. If it does wake but the 12 V battery is low, lights, horn and indicators may fail, which is unsafe in traffic.

## Quick checks first
- Does your bike have a 12 V battery? (Manual.)
- Has the bike stood for weeks? SolarQuotes describes a 12 V battery going flat after about two weeks parked.
- Was anything left on: lights, a USB charger, an alarm, a GPS or fleet tracker?
- Are the 12 V terminals loose or corroded?

## Diagnose it step by step

**1. Does your model have a separate 12 V battery?**
- No: the low-voltage supply comes from the DC-DC converter. See [Dashboard is dark and the bike seems dead](/moto-zero/repair/problems/ev-dash-dark).
- Yes: go to step 2.

**2. Are the terminals clean and tight?** [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean).
- No: clean, tighten, retry.
- Yes: go to step 3.

**3. Measure and charge the 12 V battery:** [Check the 12 V auxiliary system](/moto-zero/repair/repairs/ev-aux-check). Use a charger that matches its type (lead-acid/AGM or lithium). For lead-acid, see [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge). Does the bike wake after charging?
- No: check fuses and the main harness, then the dealer.
- Yes: go to step 4.

**4. With the bike on and in ready, does the 12 V reading rise (where the manual says it should)?**
- No: the DC-DC converter or its fuse is not charging the battery. Workshop.
- Yes: go to step 5.

**5. Does it go flat again after parking for a few days?**
- Yes: something drains it with the bike off. [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test). Trackers, alarms and added accessories are common causes. If no drain is found, the battery itself may be worn: replace it.
- No: it went flat from standing. Before long parking, follow [Store an electric motorcycle](/moto-zero/repair/repairs/ev-storage); Zero, for example, advises a trickle charger on the 12 V battery for most of its models.

*What happens if you jump-start from a car or another bike:* you may damage the bike's electronics. Only do it if your manual describes how.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Stood for weeks | History | Charge; [Store an electric motorcycle](/moto-zero/repair/repairs/ev-storage) |
| Loose or corroded terminals | Visual | [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean) |
| Accessory or tracker drain | Goes flat when parked | [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test) |
| DC-DC converter not charging | Voltage does not rise when on | Workshop |
| Worn 12 V battery | Will not hold charge | [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace) |
