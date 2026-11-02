---
id: ev-cuts-out-accel
title: Power cuts out when accelerating hard
system: ev-drive
also_called: [cuts out on hills, shuts off under load, power dies at full throttle]
urgency: ride-with-care
applies_to: [electric]
parts: [traction_battery, bms, controller, motor, wiring, contactor]
repairs: [ev-pack-state, ev-thermal-check, ev-error-read, ev-swap-contact-check, ev-phase-connector-check, ev-controller-diagnosis]
related: [ev-bms-cutoff, ev-limp-mode, ev-controller-hot, ev-motor-hot, ev-cold-weather, ev-throttle-dropout]
sources:
  - {doc: "Upway: Electric bike overheating causes and fixes", url: "https://upway.co/blogs/news/electric-bike-overheating-causes-and-fixes"}
  - {doc: "Microchip Developer Help: Fundamental understanding of a battery management system", url: "https://developerhelp.microchip.com/xwiki/bin/view/applications/power/fundamental-understanding-of-battery-management-system/"}
  - {doc: "Battery University BU-410: Charging at high and low temperatures", url: "https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures"}
---

# Power cuts out when accelerating hard

The bike rides normally at gentle throttle, but when you open it fully, climb a hill or carry a passenger, power stops or the whole bike switches off. Hard acceleration pulls the most current from the battery. If the battery is low, cold or ageing, its voltage sags under load and the **BMS** (the battery's protection computer) or the controller cuts power to protect the cells. Heat in the controller or motor and a loose high-current connection can do the same.

## Is it safe to ride?
Ride with care and avoid situations where you need full power (overtaking, steep hills with traffic behind). Losing power in the middle of a junction is dangerous.

## Quick checks first
- What was the SoC when it cut? Does it happen only when the battery is low?
- Was it a cold morning, or a hot day after a long climb?
- Does the bike come back after switching off and on, or after a rest?
- Any code or temperature symbol?
- Load: passenger, cargo, steep hill?

## Diagnose it step by step

**1. Does it happen only when the SoC is low (for example below a quarter)?**
- Yes: low battery voltage sags under load. This is normal protection on many bikes. Charge or swap earlier. If the cut-out SoC is rising over months, the battery is ageing: [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state).
- No: go to step 2.

**2. Does it happen mostly on cold mornings and stop once the bike has been ridden a while?**
- Yes: cold cells have higher internal resistance (Battery University), so the voltage sags more. See [Poor range or slow charging in the cold](/moto-zero/repair/problems/ev-cold-weather).
- No: go to step 3.

**3. Does it happen after long climbs or heavy loads, and come back after a rest?**
- Yes: heat protection. Upway describes bikes that cut power, rest a few minutes, then work again once cool. See [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check), [Controller overheats or shuts down](/moto-zero/repair/problems/ev-controller-hot) and [Motor gets very hot or power drops after a long climb](/moto-zero/repair/problems/ev-motor-hot).
- No: go to step 4.

**4. Does the whole bike switch off (dash goes dark), not just lose drive?**
- Yes: the BMS has opened the battery output. Go to [Battery shuts off suddenly (BMS protection)](/moto-zero/repair/problems/ev-bms-cutoff). On a swap bike, check the battery contacts first: [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check).
- No, dash stays on: go to step 5.

**5. Is there a code?** [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
- Over-current, under-voltage or controller code: workshop: [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).
- Burnt smell or heat marks at connectors: [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check).
- No code: workshop, with your notes on SoC, temperature and load.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Low SoC, voltage sag | Only below a certain SoC | Charge earlier; [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state) |
| Cold battery | Cold mornings only | Ride gently until warm |
| Heat protection | After climbs; recovers after rest | [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check) |
| Ageing battery or weak cell group | Cut-out SoC rising over months | Dealer or fleet battery check |
| Loose swap battery contacts | Dash goes dark | [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check) |
| Loose high-current connector | Heat marks, smell | [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check) |
| Controller fault | Code | [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis) |
