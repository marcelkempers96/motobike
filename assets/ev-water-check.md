---
id: ev-water-check
title: Check a bike after water exposure
level: workshop
time: rider steps 15 min; workshop assessment 1 to 2 hours (estimate)
applies_to:
- electric
tools:
- model service manual
- PPE and testers rated for the system
- diagnostic tool
parts:
- traction_battery
- bms
- controller
- motor
- charge_port
- charger
- wiring
- aux_battery
- dc_dc
consumables: []
fixes:
- ev-insulation-warning
- ev-pack-damaged
- ev-pack-hot-smell
- ev-water-exposure
---

# Check a bike after water exposure

**Workshop job (assessment and hand-off)** · Time: rider steps 15 min; workshop assessment 1 to 2 hours (estimate) (estimate)


Electric motorcycles are built to survive rain and normal wet roads; UN Regulation 136 includes a water resistance test for high-voltage parts in normal use. They are **not** built to sit in a flood. When water, and especially salt or dirty water, gets inside the battery, controller or connectors, it can cause short circuits, corrosion and insulation faults. A battery may seem to work after flooding but still have hidden damage that causes a fire later (Consumers' Federation of Australia). This page tells the rider what to do at once and what the workshop will check.

## Safety
- **Do not switch on, charge, or plug or unplug** a bike that has been submerged (Florida CFO). Charging or reconnecting can start a fire.
- Do not touch a battery that is swollen, leaking or corroded. Wear gloves and eye protection if you must move a battery (Consumers' Federation of Australia).
- Saltwater flooding is the highest risk. Florida's fire officials report that submerged EVs can catch fire days later and reignite after the fire is put out.
- If the bike or battery smokes, hisses or burns: move away, keep others away, and call the fire service. Do not fight a battery fire yourself.

## Steps

**Rider, at once:**
1. Do not try to ride, start or charge the bike. Push it out of the water only if it is safe to do so.
2. If the battery is a removable swap battery and it is safe, take it out and put it outdoors on a non-flammable surface (bare ground, concrete), away from buildings, vehicles and anything that burns. Move it to a dry, ventilated place away from flammable materials (Consumers' Federation of Australia).
3. Park the bike outdoors, away from buildings and other vehicles, not in a house, shop or closed garage.
4. Note how deep the water was (up to the axle, the footboards, the seat), how long, and whether it was salt or flood water.
5. Call the dealer, fleet or swap operator support line. Report the battery ID if it is a swap battery. Ask for recovery; do not ride it in.
6. Watch the bike and battery for smoke, hissing, heat or a chemical smell for the next days.

**Workshop:**
7. Assess the battery first. A battery that was submerged is treated as damaged until a battery specialist says otherwise. See [Handle a damaged battery pack](/moto-zero/repair/repairs/ev-damaged-pack).
8. Isolate the HV system: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
9. Open and inspect the controller, connectors, charge port and motor cable for water, mud and corrosion. Dry and clean as the manufacturer allows; replace corroded connectors.
10. Test insulation of each part: [Check high-voltage insulation](/moto-zero/repair/repairs/ev-insulation-check).
11. Check the 12 V system and DC-DC converter: [Check the 12 V auxiliary system](/moto-zero/repair/repairs/ev-aux-check).
12. Check hub motor bearings and seals; water inside a hub motor causes rust and Hall sensor faults.
13. Re-energise only when all parts pass, then test with a short supervised charge and ride.

## What to ask for
- A written result for the battery (keep, monitor, or retire), and which parts were replaced.

## Check your work
- No warnings, normal charge and ride, no heat or smell from the battery over the next days.

## If it did not fix the problem
- Insulation warning: [Insulation or high-voltage warning](/moto-zero/repair/problems/ev-insulation-warning).
- Battery damaged: [Battery pack is dropped, dented, swollen or wet](/moto-zero/repair/problems/ev-pack-damaged).

## Problems this repair helps with

- [Insulation or high-voltage warning](/moto-zero/repair/problems/ev-insulation-warning)
- [Battery pack is dropped, dented, swollen or wet](/moto-zero/repair/problems/ev-pack-damaged)
- [Battery pack is hot, hissing or smells](/moto-zero/repair/problems/ev-pack-hot-smell)
- [Bike has been in deep water or a flood](/moto-zero/repair/problems/ev-water-exposure)

## Parts for this job

| Part | Buy |
|---|---|
| [Traction battery pack](/moto-zero/repair/parts/traction_battery) | [Find this part](/spare-parts/traction-battery) |
| [Battery management system](/moto-zero/repair/parts/bms) | [Find this part](/spare-parts/bms) |
| [Motor controller](/moto-zero/repair/parts/controller) | [Find this part](/spare-parts/controller) |
| [Electric motor](/moto-zero/repair/parts/motor) | [Find this part](/spare-parts/motor) |
| [Charge port](/moto-zero/repair/parts/charge_port) | [Find this part](/spare-parts/charge-port) |
| [Charger](/moto-zero/repair/parts/charger) | [Find this part](/spare-parts/charger) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [12 V auxiliary battery (electric)](/moto-zero/repair/parts/aux_battery) | [Find this part](/spare-parts/aux-battery) |
| [DC-DC converter](/moto-zero/repair/parts/dc_dc) | [Find this part](/spare-parts/dc-dc) |

## Sources

- [Consumers' Federation of Australia: Flood and high rainfall safety for e-mobility devices](https://consumersfederation.org.au/flood-and-high-rainfall-safety-for-e-mobility-devices/)
- [Florida CFO consumer alert on submerged EVs](https://www.myfloridacfo.com/news/patronis-archives/patronis-press-releases/details/2023/09/20/consumer-alert-cfo-patronis-encourages-ev-owners-to-protect-themselves-from-fires-post-hurricane-ian)
- [UN Regulation No. 136 summary (batterydesign.net)](https://www.batterydesign.net/legislation-rules-and-regulations/ece-r136/)
