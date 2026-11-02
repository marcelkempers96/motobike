---
id: ev-dash-dark
title: Dashboard is dark and the bike seems dead
system: ev-drive
also_called: [electric bike won't turn on, no power, scooter dead, nothing lights up]
urgency: do-not-ride
applies_to: [electric]
parts: [traction_battery, aux_battery, fuse, ignition_switch, bms, dc_dc, wiring, instruments]
repairs: [ev-swap-contact-check, ev-aux-check, ev-pack-state, ev-charge-diagnosis, ev-damaged-pack, fuse-relay-check, ignition-switch-test]
related: [ev-swap-not-recognised, ev-aux-battery-flat, ev-bms-cutoff, ev-wont-charge, no-power-key-on, ev-pack-damaged, fuse-keeps-blowing, ignition-switch-fault]
sources:
  - {doc: "SolarQuotes: Your EV has a 12 volt battery", url: "https://www.solarquotes.com.au/blog/ev-12-volt-battery/"}
  - {doc: "Gogoro Support: What should I do if the battery level is low?", url: "https://support.gogoro.com/en/articles/115008416788"}
  - {doc: "Ather Energy: Common electric scooter charging problems", url: "https://www.atherenergy.com/blog/fixing-common-charging-problems-in-electric-scooters"}
---

# Dashboard is dark and the bike seems dead

You turn the key or press the power button and nothing lights up. On an electric motorcycle this usually means the dashboard and controller get no low-voltage power, or the battery has switched itself off. Common causes are a flat or badly seated battery, a BMS that has shut the battery down to protect it, a flat 12 V auxiliary battery (on bikes that have one), a blown fuse, or a key switch fault. A bike with a flat 12 V battery can stay dead even with a full traction battery, because the computers and main contactor cannot wake up (SolarQuotes).

## Is it safe to ride?
It cannot be ridden. If the battery is hot, swollen, smells or hisses, stop and follow [Handle a damaged battery pack](/moto-zero/repair/repairs/ev-damaged-pack).

## Quick checks first
- Is the battery fitted and the latch locked? Is the battery cover closed?
- Did you run the battery very low last time? Is the charger still plugged in (many bikes will not power up while charging)?
- Is the kill or run switch in the run position?
- Check the battery: hot, swollen, wet, smelly? If yes, stop.
- On some bikes, the battery itself has a power button or switch. Is it on?

## Diagnose it step by step

**1. Does the battery show any sign of damage, heat, swelling or smell?**
- Yes: stop. Go to [Battery pack is dropped, dented, swollen or wet](/moto-zero/repair/problems/ev-pack-damaged).
- No: go to step 2.

**2. Is it a swap or removable battery?**
- Yes: take it out and refit it fully, then check contacts: [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check). Try a different charged battery. If a second battery works, the first is faulty: report it to the operator. If no battery works, go to step 4.
- No (fixed battery): go to step 3.

**3. Was the battery run nearly empty, or has the bike stood unused for weeks?**
- Yes: the BMS may have switched the battery off to protect it. Plug in the correct charger and watch the charger lights: [Diagnose a charging fault](/moto-zero/repair/repairs/ev-charge-diagnosis). Some bikes wake once charging starts. If it will not charge, see [Battery will not charge](/moto-zero/repair/problems/ev-wont-charge).
- No: go to step 4.

**4. Does your bike have a 12 V auxiliary battery?** (Check the manual.)
- Yes: check it: [Check the 12 V auxiliary system](/moto-zero/repair/repairs/ev-aux-check). If it is flat, see [Small 12 V battery is flat](/moto-zero/repair/problems/ev-aux-battery-flat).
- No, or it is good: go to step 5.

**5. Are the low-voltage fuses good?** Check with [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
- A fuse is blown: replace it with the same rating. If it blows again, stop and see [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing).
- All good: go to step 6.

**6. Does the bike have a sleep or hibernation mode?** Some scooters go to sleep to save power. Gogoro, for example, wakes a hibernating scooter by holding the GO button for 3 seconds.
- Yes, and it wakes: done. Charge it.
- Still dead: go to step 7.

**7. Is the key switch or power button working?** See [Ignition switch is stiff or cuts power](/moto-zero/repair/problems/ignition-switch-fault).
- Faulty: repair or replace the switch.
- Good, or you cannot tell: hand over to the dealer or fleet support line. The fault may be the BMS, DC-DC converter or main harness. Ather suggests a reset (holding the power button) before calling service; use your own manual's reset if it has one.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Battery not seated or latch open | Refit battery, dash wakes | [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check) |
| Battery empty, BMS shut down | Was run very low; wakes on charger | [Diagnose a charging fault](/moto-zero/repair/repairs/ev-charge-diagnosis) |
| Flat 12 V auxiliary battery | Low reading on 12 V battery | [Check the 12 V auxiliary system](/moto-zero/repair/repairs/ev-aux-check) |
| Blown fuse | Fuse wire broken | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Key switch or button fault | No power past the switch | [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test) |
| BMS, DC-DC or harness fault | All above good | Dealer or fleet workshop |
