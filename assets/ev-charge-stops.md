---
id: ev-charge-stops
title: Charging stops before the battery is full
system: ev-battery
also_called: [charge stops at 80, won't reach 100, charging interrupted, charger turns off early]
urgency: ok-to-ride
applies_to: [electric]
parts: [charger, charge_port, bms, traction_battery, wiring]
repairs: [ev-charge-diagnosis, ev-port-inspect, ev-charger-check, ev-pack-state, ev-error-read]
related: [ev-wont-charge, ev-charger-fault, ev-port-hot, ev-cold-weather, ev-range-drop]
sources:
  - {doc: "Ather Energy: Common electric scooter charging problems", url: "https://www.atherenergy.com/blog/fixing-common-charging-problems-in-electric-scooters"}
  - {doc: "Zero Motorcycles: Long-term storage", url: "https://zeromotorcycles.com/stories/long-term-storage"}
  - {doc: "Battery University BU-410: Charging at high and low temperatures", url: "https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures"}
---

# Charging stops before the battery is full

Charging starts normally but ends early, for example at 80% or 90%, or stops and restarts. Some bikes stop below 100% on purpose: a charge limit set in the app to protect the battery, or a storage mode. Zero, for example, says its BMS lowers the battery to about 80% when the bike is left plugged in for 30 days. Other causes are a battery that gets too hot while charging, a poor connection at the plug, unstable mains power, or a BMS stopping because one cell group is full before the others.

## Is it safe to ride?
Yes, on the charge you have. If the plug or socket gets hot, stop charging: see [Charge plug or socket gets hot](/moto-zero/repair/problems/ev-port-hot).

## Quick checks first
- Is a charge limit or storage mode set in the app or menu?
- Is the plug or socket warm or hot when charging stops?
- Is the charger in a hot place, in sun, or with blocked vents?
- Does the mains power drop or flicker (generator, solar, weak supply)?

## Diagnose it step by step

**1. Is a charge limit, eco charge or storage mode set?**
- Yes: change it if you need full charge for a trip. Done.
- No: go to step 2.

**2. Are the plug or socket hot when it stops?**
- Yes: stop. [Charge plug or socket gets hot](/moto-zero/repair/problems/ev-port-hot).
- No: go to step 3.

**3. Is the battery or charger hot (charging after a long ride, in sun, vents blocked)?**
- Yes: the BMS or charger stops to protect itself. Let the battery cool before charging (Ather), charge in shade at room temperature, keep vents clear. Retry.
- No: go to step 4.

**4. Is the battery cold?**
- Yes: charging slows or stops in the cold; Battery University says lithium-ion must not be charged below freezing. Charge indoors. See [Poor range or slow charging in the cold](/moto-zero/repair/problems/ev-cold-weather).
- No: go to step 5.

**5. Is the mains supply unstable?** Try a different socket or building. Generators and long extension leads can make the charger stop.
- Stable now and it charges: supply problem.
- Still stops: go to step 6.

**6. Does a known-good charger of the same model finish the charge?** [Check the charger and cable](/moto-zero/repair/repairs/ev-charger-check).
- Yes: your charger is faulty.
- No: go to step 7.

**7. Leave it on the charger after it stops. Does it creep up slowly over a few hours?**
- Yes: the BMS is balancing the cells. Some makers advise a long charge after storage for this; Zero advises 24 hours. If it happens every time, ask the dealer to check balance.
- No, it stays stuck: BMS or battery fault. Read codes ([Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read)) and contact the dealer or fleet.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Charge limit or storage mode | Setting in app or menu | Change setting |
| Battery or charger hot | After riding; sun | Cool first; shade |
| Cold battery | Cold weather | Charge indoors |
| Poor connection at plug | Plug warm, stops and restarts | [Inspect the charge port and plug](/moto-zero/repair/repairs/ev-port-inspect) |
| Unstable mains | Works elsewhere | Use a stable socket |
| Cells out of balance | Creeps up slowly | Long charge, dealer check |
| Charger or BMS fault | Known-good charger test | [Diagnose a charging fault](/moto-zero/repair/repairs/ev-charge-diagnosis) |
