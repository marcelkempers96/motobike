---
id: ev-cold-weather
title: Poor range or slow charging in the cold
system: ev-battery
also_called: [winter range loss, battery weak in cold, won't charge when cold, cold morning low power]
urgency: ok-to-ride
applies_to: [electric]
parts: [traction_battery, bms, charger, rear_tyre, front_tyre]
repairs: [ev-range-test, ev-charge-diagnosis, ev-pack-state, ev-storage, tyre-pressure-check]
related: [ev-range-drop, ev-charge-stops, ev-wont-charge, ev-no-regen, ev-limp-mode, ev-charge-jumps]
sources:
  - {doc: "Battery University BU-410: Charging at high and low temperatures", url: "https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures"}
  - {doc: "Ather Energy: Common electric scooter charging problems", url: "https://www.atherenergy.com/blog/fixing-common-charging-problems-in-electric-scooters"}
  - {doc: "Harley-Davidson service information: Regenerative braking", url: "https://serviceinfo.harley-davidson.com/sip/service/procedure/2140462551782999685/BLAISE/2015105/en_US?nid=54502"}
---

# Poor range or slow charging in the cold

On cold mornings, in highlands or in winter, the bike goes less far, feels weaker, the percentage drops faster, charging is slow or will not start, and regen may be missing. This is mostly the chemistry of lithium batteries, not a fault. Battery University explains that cold raises the internal resistance of the cells, which makes charging slower and weakens discharge. It also says typical lithium-ion cells must not be charged below freezing, because metallic lithium can plate onto the anode and cause lasting damage. Most BMS units slow or block charging in the cold to prevent this.

## Is it safe to ride?
Yes. Expect less power and range until the battery warms. Plan shorter trips and charge earlier.

## Quick checks first
- What is the air temperature? Was the bike parked outside overnight?
- Does range and power improve after 15 to 30 minutes of riding?
- Tyre pressures (they drop in the cold)?
- Is regen weaker? (Harley-Davidson notes regen may be limited when the battery is cold.)

## Diagnose it step by step

**1. Was the bike or battery parked outside in the cold?**
- Yes: park and charge indoors or in a sheltered place where possible. On a swap bike, take the battery from the station rack, which is often warmer. Go to step 2.
- No, it was kept warm: go to step 4.

**2. Is charging slow or refused when the battery is cold?**
- Yes: normal protection. Bring the battery to room temperature, then charge. Ather advises charging at 5 to 45 °C; Battery University gives 0 to 45 °C as the typical lithium-ion charge range. Your manual gives the real limits. Never try to warm a battery with a heater, fire or hair dryer.
- No: go to step 3.

**3. Does range or power improve after riding a while, or on warmer days?**
- Yes: normal cold effect. Ride gently at first; avoid full throttle until the battery warms.
- No: go to step 4.

**4. Are tyres at the correct pressure?** [Check tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check).
- No: inflate.
- Yes: go to step 5.

**5. Do a range test on a mild day and compare:** [Do a range test](/moto-zero/repair/repairs/ev-range-test).
- Range normal when warm: cold is the cause. Nothing is broken.
- Range low even when warm: the battery is ageing or faulty. See [Range has dropped](/moto-zero/repair/problems/ev-range-drop) and [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state).

*What happens if you force a charge below freezing:* lithium plating can damage the cells permanently and make them less safe (Battery University).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Cold cells (higher resistance) | Improves when warm | Ride gently, store warmer |
| BMS blocking cold charging | Will not charge cold, charges warm | Charge at room temperature |
| Low tyre pressure in cold | Gauge | [Check tyre pressure](/moto-zero/repair/repairs/tyre-pressure-check) |
| Ageing battery | Low range even when warm | [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state) |

## Reference values

| Item | Value | Source |
|---|---|---|
| Typical Li-ion charge range | 0 to 45 °C; no charge below freezing | Battery University BU-410 |
| Ather recommended charging temperature | 5 to 45 °C | Ather Energy blog |
