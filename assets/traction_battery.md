---
id: traction_battery
name: Traction battery pack
category: ev
aliases: [HV battery, main battery, battery pack, swap battery]
applies_to: [electric]
sources:
  - {doc: "NFCC: E-bikes and e-scooters fire safety guidance", url: "https://nfcc.org.uk/wp-content/uploads/2023/09/NFCC_Guidance_E-bikes_and_Scooters_.pdf"}
  - {doc: "London Fire Brigade: charging e-bike and e-scooter batteries", url: "https://www.london-fire.gov.uk/safety/lithium-batteries/charging-electric-bike-and-electric-scooter-lithium-batteries"}
  - {doc: "Microchip: fundamentals of battery management systems", url: "https://developerhelp.microchip.com/xwiki/bin/view/applications/power/fundamental-understanding-of-battery-management-system/"}
---

# Traction battery pack

The traction battery is the large battery that drives the motor of an electric motorcycle or scooter. It sits under the seat, in the floor or in the frame, and on swap systems it lifts out. Inside a sealed case are many lithium cells joined together, a [Battery management system](/moto-zero/repair/parts/bms), fuses, wiring and a connector.

## What it does
The cells store energy and give it to the [Motor controller](/moto-zero/repair/parts/controller) at a voltage much higher than a 12 V battery. That voltage can give a dangerous shock. The BMS watches each cell and cuts power if something is wrong. Every charge and discharge wears the cells a little, so range slowly falls. Heat, deep discharge, charging when very cold, water and knocks speed up wear and can damage cells. A damaged lithium cell can overheat and burn without warning, and these fires are very hard to put out.

## Signs it is worn or failing
- Range falls: [Range has dropped](/moto-zero/repair/problems/ev-range-drop), worse in cold: [Poor range in the cold](/moto-zero/repair/problems/ev-cold-weather).
- Percentage jumps: [Battery percentage jumps](/moto-zero/repair/problems/ev-charge-jumps).
- Sudden cut-out: [Battery shuts off suddenly](/moto-zero/repair/problems/ev-bms-cutoff).
- Will not charge: [Battery will not charge](/moto-zero/repair/problems/ev-wont-charge).
- Dropped, dented, swollen or wet: [Battery pack is damaged](/moto-zero/repair/problems/ev-pack-damaged). Hot, hissing or smelly: [Battery pack is hot or smells](/moto-zero/repair/problems/ev-pack-hot-smell). **Move away, do not charge or ride, and call the fire service if there is smoke.**

## When to replace it
When the maker's health check shows it is below their replacement level, or after any damage. Packs are not home repair items. Never open a pack, replace cells yourself, or fit a used pack of unknown history.

## What to match when buying
- The exact pack model and part number for your bike: voltage, capacity (Ah or kWh), connector, BMS communication and size must all match.
- Chemistry (for example LFP or NMC) must suit the charger and controller.
- Buy from the bike maker or an approved dealer. Counterfeit packs and chargers are a major fire risk. Register the pack for recall notices.
- Swap batteries belong to the swap network; report faults to the operator.

## Fitting notes
- Only trained staff with insulated tools and the maker's procedure should disconnect a pack: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
- Check health: [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state). Damage: [Handle a damaged battery pack](/moto-zero/repair/repairs/ev-damaged-pack). Storage: [Store an electric motorcycle](/moto-zero/repair/repairs/ev-storage).
- Recycle old packs through the maker or an approved battery recycler, never in normal waste.
