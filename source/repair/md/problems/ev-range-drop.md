---
id: ev-range-drop
title: Range has dropped
system: ev-battery
also_called: [battery doesn't last, fewer kilometres per charge, poor range electric]
urgency: ok-to-ride
applies_to: [electric]
parts: [traction_battery, bms, charger, rear_tyre, front_tyre, rear_brake, motor]
repairs: [ev-range-test, tyre-pressure-check, brake-drag-check, ev-pack-state, ev-charge-diagnosis, ev-thermal-check]
related: [ev-cold-weather, ev-charge-stops, ev-charge-jumps, ev-motor-hot, brake-drag, bike-feels-held-back]
sources:
  - {doc: "Super Soco CPx Pro specification sheet", url: "https://en.vmotosoco.com/wp-content/uploads/2023/04/CPXPRO_SuperSoco_20230426.pdf"}
  - {doc: "Ather Energy: Common electric scooter charging problems", url: "https://www.atherenergy.com/blog/fixing-common-charging-problems-in-electric-scooters"}
  - {doc: "Battery University BU-410: Charging at high and low temperatures", url: "https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures"}
---

# Range has dropped

You get fewer kilometres from a full charge than before. Range depends on many things besides the battery: riding style, speed, load, hills, wind, tyre pressure, dragging brakes, temperature and riding mode. Super Soco, for example, says real consumption varies with riding style, weather and load. Lithium batteries also lose capacity slowly with age and use. This page separates the easy outside causes from a real battery problem.

## Is it safe to ride?
Yes, but plan shorter trips until you know your real range. Running out far from a charger or swap station can leave you stranded.

## Quick checks first
- Tyre pressures correct?
- Brakes not dragging (wheel spins freely)?
- Riding mode: are you in a sport or high-power mode?
- More load, passenger, hills or headwind than usual?
- Cold weather?
- Did the last charge actually reach 100%?

## Diagnose it step by step

**1. Did the last charge reach full?**
- No: go to [Charging stops before the battery is full](/moto-zero/repair/problems/ev-charge-stops).
- Yes: go to step 2.

**2. Are tyres soft or brakes dragging?** [Check tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check), [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check).
- Yes: fix them and test again.
- No: go to step 3.

**3. Has your riding changed: faster roads, more load, sport mode, more hills, cold weather?**
- Yes: this explains much of the drop. In the cold, see [Poor range or slow charging in the cold](/moto-zero/repair/problems/ev-cold-weather).
- No: go to step 4.

**4. Do a controlled test:** [Do a range test](/moto-zero/repair/repairs/ev-range-test). Is the result clearly lower than your earlier tests in the same conditions?
- No: the battery is fine; the drop came from conditions.
- Yes: go to step 5.

**5. Does the SoC fall evenly, or does it drop in jumps?**
- Jumps: see [Battery percentage jumps or drops suddenly](/moto-zero/repair/problems/ev-charge-jumps).
- Even: go to step 6.

**6. Is the motor or controller hotter than before, or does the bike feel held back?**
- Yes: extra drag or a motor fault uses more energy. See [Motor gets very hot or power drops after a long climb](/moto-zero/repair/problems/ev-motor-hot).
- No: the battery has likely lost capacity. [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state). Ather lists fast draining after showing full as a sign of ageing. Take your range test results to the dealer or fleet. On a swap network, report the battery IDs; batteries are rotated, so one weak battery should not follow you.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Riding conditions changed | Speed, load, hills, mode | Adjust, retest |
| Low tyre pressure | Gauge | [Check tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check) |
| Dragging brake | Wheel slows quickly | [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check) |
| Cold weather | Seasonal | Ride gently; charge indoors |
| Not charging to full | Charge ends early | [Diagnose a charging fault](/moto-zero/repair/repairs/ev-charge-diagnosis) |
| Battery ageing | Range test lower in same conditions | [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state) |
