---
id: ev-charge-jumps
title: Battery percentage jumps or drops suddenly
system: ev-battery
also_called: [battery gauge wrong, SoC drops fast, percentage jumps, inaccurate battery meter]
urgency: ride-with-care
applies_to: [electric]
parts: [bms, traction_battery, instruments, wiring]
repairs: [ev-pack-state, ev-range-test, ev-swap-contact-check, ev-charge-diagnosis, ev-error-read]
related: [ev-range-drop, ev-bms-cutoff, ev-cold-weather, ev-cuts-out-accel]
sources:
  - {doc: "Microchip Developer Help: Fundamental understanding of a battery management system", url: "https://developerhelp.microchip.com/xwiki/bin/view/applications/power/fundamental-understanding-of-battery-management-system/"}
  - {doc: "Zero Motorcycles: Long-term storage", url: "https://zeromotorcycles.com/stories/long-term-storage"}
  - {doc: "Battery University BU-410: Charging at high and low temperatures", url: "https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures"}
---

# Battery percentage jumps or drops suddenly

The battery percentage falls quickly or jumps, for example from 40% to 20% in a moment, or drops sharply on a hill and rises again when you stop. The percentage is an **estimate** made by the BMS. It is worked out from voltage, from counting charge in and out, or both. Microchip explains that voltage readings are thrown off by load and internal resistance, and charge counting drifts with temperature, current and age. So some movement is normal. Big, repeated jumps, especially near empty, can mean a weak group of cells or a battery that needs balancing.

## Is it safe to ride?
Ride with care. Do not trust the gauge near empty until this is fixed. A battery that suddenly reads very low can cut out soon after. Plan to charge or swap early.

## Quick checks first
- Does the drop happen only under hard acceleration or on hills, and recover at rest?
- Is it a cold day?
- On a swap bike, does it happen with every battery or only one?
- Has the battery been stored for a long time without a full charge?

## Diagnose it step by step

**1. Does the percentage drop under load and come back when you stop?**
- Yes: this is voltage sag under load, more on an old or cold battery. If it is mild, it is normal. If it is getting worse, go to step 5.
- No, it drops and stays down: go to step 2.

**2. On a swap bike, does it happen with only one battery?**
- Yes: that battery is suspect. Note its ID and report it to the operator.
- With every battery, or fixed battery: go to step 3.

**3. Has the battery stood for weeks, or has it not had a full charge for a long time?**
- Yes: give it a full charge and leave it on the charger until it ends. Some makers advise a long charge so the cells can balance; Zero, for example, advises 24 hours before riding after storage. Then retest.
- No: go to step 4.

**4. Is the weather cold?**
- Yes: cold raises internal resistance (Battery University), so the gauge sags more. See [Poor range or slow charging in the cold](/moto-zero/repair/problems/ev-cold-weather).
- No: go to step 5.

**5. Do a range test and record SoC every 10 to 20 km:** [Do a range test](/moto-zero/repair/repairs/ev-range-test). Do the jumps happen at the same SoC each time?
- Yes, or the bike cuts out after a jump: a weak cell group or BMS fault is likely. [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state) and hand to the dealer or fleet battery team. Do not open the pack.
- No clear pattern: check contacts ([Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check)) and read codes ([Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read)).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Normal voltage sag under load | Recovers at rest | Normal; ride smoothly |
| Cells out of balance after storage | Improves after long full charge | Full charge as manual says |
| Cold battery | Cold days only | Charge and store warmer |
| One weak swap battery | Only with one battery ID | Report to operator |
| Ageing pack or weak cell group | Repeated jump at same SoC | Dealer or fleet battery check |
| BMS or gauge fault | Code, erratic readings | [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read) |
