---
id: ev-bms-cutoff
title: Battery shuts off suddenly (BMS protection)
system: ev-battery
also_called: [battery cuts out, bike switches off while riding, BMS trip, battery protection mode]
urgency: do-not-ride
applies_to: [electric]
parts: [bms, traction_battery, contactor, controller, wiring, charge_port]
repairs: [ev-pack-state, ev-swap-contact-check, ev-error-read, ev-thermal-check, ev-damaged-pack, ev-controller-diagnosis]
related: [ev-cuts-out-accel, ev-charge-jumps, ev-dash-dark, ev-cold-weather, ev-pack-hot-smell, ev-limp-mode]
sources:
  - {doc: "Microchip Developer Help: Fundamental understanding of a battery management system", url: "https://developerhelp.microchip.com/xwiki/bin/view/applications/power/fundamental-understanding-of-battery-management-system/"}
  - {doc: "UN Regulation No. 136 summary (batterydesign.net)", url: "https://www.batterydesign.net/legislation-rules-and-regulations/ece-r136/"}
  - {doc: "Battery University BU-410: Charging at high and low temperatures", url: "https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures"}
---

# Battery shuts off suddenly (BMS protection)

While riding (or charging), the whole bike goes dead: dash off, no drive. After a short wait or a restart it may come back. This is usually the **BMS** opening the battery's output to protect the cells. The BMS prevents over-charging, over-discharging and overheating (Microchip), and UN Regulation 136 tests battery protection against over-discharge, over-temperature, over-current and short circuit. So a cut-off means the BMS saw something it did not like: a cell voltage too low under load, too much current, too high or too low a temperature, or a fault. A loose swap battery can look the same.

## Is it safe to ride?
Do not ride until you know the cause. Cutting out in traffic is dangerous. If the battery is hot, hissing or smells, stop and see [Battery pack is hot, hissing or smells](/moto-zero/repair/problems/ev-pack-hot-smell).

## Quick checks first
- What was the SoC when it cut? Was it low?
- Hard acceleration, steep hill or heavy load at the moment it cut?
- Hot day after a long climb, or a cold morning?
- Bump or pothole at the moment it cut (swap battery loose)?
- Battery hot, smelling or damaged?

## Diagnose it step by step

**1. Is the battery hot, swollen, smelling or hissing?**
- Yes: stop. [Handle a damaged battery pack](/moto-zero/repair/repairs/ev-damaged-pack).
- No: go to step 2.

**2. Did it cut on a bump, and is it a swap battery?**
- Yes: [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check).
- No: go to step 3.

**3. Was the SoC low, and did it cut under hard load?**
- Yes: under-voltage protection. Charge earlier and ride gently when low. If this happens at a higher SoC than before, the battery is ageing or has a weak cell group: go to step 6.
- No: go to step 4.

**4. Was the battery very hot (long climb, hot day, charging straight after riding) or very cold?**
- Yes: temperature protection. Let the battery reach normal temperature. Cold cells sag more under load (Battery University). See [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check) and [Poor range or slow charging in the cold](/moto-zero/repair/problems/ev-cold-weather).
- No: go to step 5.

**5. Is there a code?** [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
- Over-current or short-circuit code: something in the controller, motor or wiring draws too much. Workshop. Do not keep restarting.
- Cell or BMS code: go to step 6.
- No code: go to step 6.

**6. Check the battery's record:** [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state). Hand the bike or battery to the dealer or fleet battery team with your notes (SoC, load, temperature, time). On swap networks, report the battery ID and swap it.

*What happens if you keep restarting after repeated cut-offs:* you force a battery that is protecting itself, and you may be cut off again in a dangerous place.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Loose swap battery | Cuts on bumps | [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check) |
| Low SoC under hard load | Low SoC at cut | Charge earlier |
| Battery too hot or cold | Weather, climbs | Let battery reach normal temperature |
| Weak cell group or ageing pack | Cuts at rising SoC | Dealer or fleet battery check |
| Over-current from motor or controller fault | Over-current code | [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis) |
| BMS fault | BMS code | Dealer or fleet |
