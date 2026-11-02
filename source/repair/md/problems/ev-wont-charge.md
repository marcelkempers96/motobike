---
id: ev-wont-charge
title: Battery will not charge
system: ev-battery
also_called: [not charging, charger does nothing, battery stuck at 0, no charge electric]
urgency: do-not-ride
applies_to: [electric]
parts: [charger, charge_port, traction_battery, bms, fuse, wiring]
repairs: [ev-charger-check, ev-port-inspect, ev-charge-diagnosis, ev-swap-contact-check, ev-error-read, ev-damaged-pack]
related: [ev-charger-fault, ev-charge-stops, ev-port-hot, ev-cold-weather, ev-pack-damaged, ev-charger-cable-damage]
sources:
  - {doc: "Ather Energy: Common electric scooter charging problems", url: "https://www.atherenergy.com/blog/fixing-common-charging-problems-in-electric-scooters"}
  - {doc: "Battery University BU-410: Charging at high and low temperatures", url: "https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures"}
---

# Battery will not charge

You plug in the charger but the percentage does not rise, the charger shows no "charging" light, or the bike says it is not charging. The fault can be anywhere in the chain: mains power, the charger, the cable and plug, the charge port, the battery temperature, or the BMS refusing charge. Work through them in order: the first checks are free and take minutes.

## Is it safe to ride?
You can ride on the charge that is left, but plan for running out. If the battery or charger is hot, swollen, smelly or damaged, stop using it.

## Quick checks first
- Does the wall socket work? Try a lamp or phone charger.
- Is the charger plug fully in at both ends?
- What do the charger lights show? Compare with your manual.
- Is the battery very hot (just after a ride) or very cold?
- Any damage, swelling or smell on battery or charger?

## Diagnose it step by step

**1. Is the battery or charger swollen, cracked, leaking, very hot or smelling?**
- Yes: unplug at the wall and stop. [Handle a damaged battery pack](/moto-zero/repair/repairs/ev-damaged-pack).
- No: go to step 2.

**2. Does the charger show any light when plugged into a working wall socket (not connected to the bike)?**
- No light: go to [Charger shows a fault light or stays off](/moto-zero/repair/problems/ev-charger-fault).
- Normal standby light: go to step 3.

**3. Are the cable, plug and charge port clean, dry and undamaged?** [Check the charger and cable](/moto-zero/repair/repairs/ev-charger-check), [Inspect the charge port and plug](/moto-zero/repair/repairs/ev-port-inspect).
- No: clean and dry, or stop using a damaged cable: [Charger cable or plug is damaged](/moto-zero/repair/problems/ev-charger-cable-damage).
- Yes: go to step 4.

**4. Is the battery too hot or too cold?** Battery University says typical lithium-ion cells must not be charged below freezing, and gives 0 to 45 °C as the charge range; Ather advises 5 to 45 °C. Your manual has the real limits.
- Yes: let the battery reach room temperature, then try again. Ather advises letting the battery cool after a long ride before charging.
- No: go to step 5.

**5. On a swap or removable battery, is the battery seated properly in the charger or bike?** [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check).
- Not seated: refit.
- Seated: go to step 6.

**6. Was the battery run completely flat or stored empty for a long time?**
- Yes: the BMS may have locked the battery to protect it. Do not try to "force" charge it with another charger. Contact the dealer or fleet.
- No: go to step 7.

**7. Does a known-good charger of the same model charge it?**
- Yes: your charger is faulty: replace it with an approved one.
- No: battery, BMS or bike wiring. Read codes ([Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read)) and hand to the dealer. Never open the pack (Ather).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| No mains power | Socket dead | Use a working socket |
| Plug not fully in, dirty port | Visual | [Inspect the charge port and plug](/moto-zero/repair/repairs/ev-port-inspect) |
| Battery too hot or cold | After ride or cold night | Wait for room temperature |
| Faulty charger | Known-good charger works | Replace with approved charger |
| Battery locked by BMS after deep discharge | Ran fully flat | Dealer or fleet |
| BMS or battery fault | All else good | [Diagnose a charging fault](/moto-zero/repair/repairs/ev-charge-diagnosis), then dealer |

## Reference values

| Item | Value | Source |
|---|---|---|
| Typical Li-ion charge range | 0 to 45 °C; no charge below freezing | Battery University BU-410 |
| Ather recommended charging temperature | 5 to 45 °C | Ather Energy blog |
