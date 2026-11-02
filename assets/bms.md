---
id: bms
name: Battery management system
category: ev
aliases: [BMS, battery controller, protection board]
applies_to: [electric]
sources:
  - {doc: "Microchip: fundamentals of battery management systems", url: "https://developerhelp.microchip.com/xwiki/bin/view/applications/power/fundamental-understanding-of-battery-management-system/"}
  - {doc: "NFCC: E-bikes and e-scooters fire safety guidance", url: "https://nfcc.org.uk/wp-content/uploads/2023/09/NFCC_Guidance_E-bikes_and_Scooters_.pdf"}
---

# Battery management system

The battery management system (BMS) is a circuit board inside the traction battery pack. Thin wires connect it to every group of cells and to temperature sensors in the pack.

## What it does
The BMS measures cell voltages, pack current and temperature. It stops charging when cells are full (overcharge), stops discharge when they are empty (over-discharge), and cuts power if current is too high, there is a short circuit, or the pack is too hot or cold. It balances cells so they stay at the same charge level, works out the percentage shown on the dash (state of charge) and battery health, and talks to the controller, charger and dashboard. When it cuts power, it is protecting the pack; the cause is often a weak cell, a cold pack or a charger fault.

## Signs it is worn or failing
- Power cuts suddenly, often under hard acceleration or at low charge: [Battery shuts off suddenly (BMS protection)](/moto-zero/repair/problems/ev-bms-cutoff), [Power cuts out when accelerating hard](/moto-zero/repair/problems/ev-cuts-out-accel).
- Percentage jumps or drops: [Battery percentage jumps](/moto-zero/repair/problems/ev-charge-jumps).
- Charging stops early: [Charging stops before full](/moto-zero/repair/problems/ev-charge-stops).
- Bike or charger does not recognise the pack: [Swapped battery is not recognised](/moto-zero/repair/problems/ev-swap-not-recognised), [Error code on the dashboard](/moto-zero/repair/problems/ev-error-code).

## When to replace it
Only after a dealer with the maker's software confirms a BMS fault. The BMS is usually replaced or repaired with the pack by the maker. A BMS cut-out is a warning, not a fault to bypass.

## What to match when buying
- Not a rider part. A BMS must be programmed for the exact cell type, number of cells and pack design. A wrong or generic BMS can let cells overcharge and catch fire.
- Never fit a "bypass" or remove the BMS to get more power.

## Fitting notes
- Read codes first: [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
- Check pack health: [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state).
- Work inside the pack is for trained technicians only: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
