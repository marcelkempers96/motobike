---
id: ev-limp-mode
title: Bike is in reduced power or limp mode
system: ev-drive
also_called: [turtle mode, tortoise symbol, slow mode, low power warning, derate]
urgency: ride-with-care
applies_to: [electric]
parts: [traction_battery, bms, controller, motor, throttle_sensor, motor_sensor]
repairs: [ev-error-read, ev-pack-state, ev-thermal-check, ev-controller-diagnosis, ev-motor-diagnosis]
related: [ev-error-code, ev-cuts-out-accel, ev-controller-hot, ev-motor-hot, ev-cold-weather, ev-bms-cutoff, ev-pack-hot-smell, ev-insulation-warning]
sources:
  - {doc: "Upway: Electric bike overheating causes and fixes", url: "https://upway.co/blogs/news/electric-bike-overheating-causes-and-fixes"}
  - {doc: "Battery University BU-410: Charging at high and low temperatures", url: "https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures"}
---

# Bike is in reduced power or limp mode

The bike still moves but much more slowly, often with a tortoise or "limp" symbol on the dash. **Limp mode** (also called derating) is the controller or BMS deliberately limiting power to protect the battery, motor or controller, or because a sensor gives a doubtful reading. It lets you get home slowly instead of stopping dead. The common triggers are low battery, very hot or very cold battery, an overheated motor or controller, and sensor faults.

## Is it safe to ride?
Ride with care, slowly, to a safe place or straight home or to the workshop. Avoid fast roads, as you cannot keep up with traffic. If the warning is about battery temperature with heat, smell or smoke, stop at once: [Battery pack is hot, hissing or smells](/moto-zero/repair/problems/ev-pack-hot-smell).

## Quick checks first
- Check the SoC. Many bikes limit power when the battery is low.
- Did you select an eco or low-speed mode by mistake?
- Is it very hot or very cold? Has the bike just climbed a long hill?
- Read the symbol or code on the dash.

## Diagnose it step by step

**1. Is the riding mode set to eco, low speed or a learner mode?**
- Yes: change mode as your manual says. Done if power returns.
- No: go to step 2.

**2. Is the SoC low?**
- Yes: charge or swap. If limp mode appears at a higher SoC than before, see [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state).
- No: go to step 3.

**3. Did it start after a long climb, heavy load or hot weather, and does it clear after resting in the shade?**
- Yes: heat protection (Upway). [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check).
- No: go to step 4.

**4. Did it start on a cold morning and clear as you ride?**
- Yes: cold-battery protection. Cold cells have higher internal resistance (Battery University). See [Poor range or slow charging in the cold](/moto-zero/repair/problems/ev-cold-weather).
- No: go to step 5.

**5. Is there a code?** [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
- Battery code: [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state) and contact the dealer or fleet.
- Motor or Hall code: [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis).
- Throttle or controller code: [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).
- Insulation or HV warning: stop and see [Insulation or high-voltage warning](/moto-zero/repair/problems/ev-insulation-warning).

**6. Does limp mode stay on after a cool-down and a full charge?**
- Yes: a stored fault. Do not keep riding in limp mode for days. Book the dealer or fleet workshop.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Eco or low mode selected | Mode display | Change mode |
| Low SoC | Gauge low | Charge or swap |
| Motor or controller hot | After climbs; clears after rest | [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check) |
| Battery cold or hot | Weather pattern | Let battery reach normal temperature |
| Sensor fault (throttle, Hall, temperature) | Stored code | [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read) |
| Battery ageing or cell fault | Limp at higher SoC over time | [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state) |
