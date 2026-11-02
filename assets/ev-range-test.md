---
id: ev-range-test
title: Do a range test
level: rider
time: one full charge and ride, about one day
applies_to:
- electric
tools:
- notebook or phone
- tyre pressure gauge
parts:
- traction_battery
- bms
- charger
- rear_tyre
- front_tyre
- rear_brake
consumables: []
fixes:
- ev-charge-jumps
- ev-cold-weather
- ev-range-drop
---

# Do a range test

**Rider job (no special tools)** · Time: one full charge and ride, about one day (estimate)


A **range test** measures how far your bike really goes on one charge, under conditions you can repeat. It tells you if range has truly dropped, or if it only looks lower because of the weather, load, riding or the battery gauge. Makers' range figures come from set test conditions. For example, Super Soco gives 100 km for the CPx Pro measured at an average 45 km/h with a 75 kg rider and two batteries, and notes that real use varies with riding style, weather and load. Your result will differ; what matters is comparing your own tests over time.

## Safety
- Do not run the battery to zero on a busy road or far from help. Plan the route so you can finish near home, a charger or a swap station.
- Many bikes reduce power at low charge. Ride with care in the last part of the test.

## You need
- A notebook or phone.
- The same route each time, ideally your normal daily route.

## Steps
1. Check tyre pressures: [Check tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check). Spin each wheel to check the brakes do not drag.
2. Charge to 100% with the correct charger. On a swap bike, take a battery showing full.
3. Write down: date, air temperature, odometer, SoC, riding mode, rider plus load weight, any passenger.
4. Ride your normal route in your normal mode. Do not change mode during the test.
5. Every 10 to 20 km, or at each stop, note odometer and SoC.
6. Stop when the SoC reaches a low level you choose (for example the level where your bike warns you). Note odometer and SoC.
7. Work out km per percent: distance divided by SoC used. Multiply by 100 for an estimated full range.
8. Look at your notes: did the SoC fall evenly, or did it jump? Jumps suggest the gauge is re-estimating or a weak cell group (see the BMS explanation in [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state)).
9. Compare with your earlier tests in similar weather. Cold reduces range: lithium cells have higher internal resistance when cold (Battery University).
10. Fleet riders: send the result and battery ID to the operator.

## Check your work
- You have a repeatable number (km per percent) with conditions written down.

## If it did not fix the problem
- Range lower than your earlier tests in the same conditions: [Range has dropped](/moto-zero/repair/problems/ev-range-drop).
- SoC jumps: [Battery percentage jumps or drops suddenly](/moto-zero/repair/problems/ev-charge-jumps).
- Range lower only in cold weather: [Poor range or slow charging in the cold](/moto-zero/repair/problems/ev-cold-weather).

## Reference values

| Item | Value | Source |
|---|---|---|
| Super Soco CPx Pro rated range and test conditions | 100 km at 45 km/h average, 75 kg rider, two batteries | Super Soco CPx Pro specification sheet |

## Problems this repair helps with

- [Battery percentage jumps or drops suddenly](/moto-zero/repair/problems/ev-charge-jumps)
- [Poor range or slow charging in the cold](/moto-zero/repair/problems/ev-cold-weather)
- [Range has dropped](/moto-zero/repair/problems/ev-range-drop)

## Parts for this job

| Part | Buy |
|---|---|
| [Traction battery pack](/moto-zero/repair/parts/traction_battery) | [Find this part](/spare-parts/traction-battery) |
| [Battery management system](/moto-zero/repair/parts/bms) | [Find this part](/spare-parts/bms) |
| [Charger](/moto-zero/repair/parts/charger) | [Find this part](/spare-parts/charger) |
| [Rear tyre](/moto-zero/repair/parts/rear_tyre) | [Find this part](/spare-parts/rear-tyre) |
| [Front tyre](/moto-zero/repair/parts/front_tyre) | [Find this part](/spare-parts/front-tyre) |
| [Rear brake](/moto-zero/repair/parts/rear_brake) | [Find this part](/spare-parts/rear-brake) |

## Sources

- [Super Soco CPx Pro specification sheet](https://en.vmotosoco.com/wp-content/uploads/2023/04/CPXPRO_SuperSoco_20230426.pdf)
- [Microchip Developer Help: Fundamental understanding of a battery management system](https://developerhelp.microchip.com/xwiki/bin/view/applications/power/fundamental-understanding-of-battery-management-system/)
- [Battery University BU-410: Charging at high and low temperatures](https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures)
