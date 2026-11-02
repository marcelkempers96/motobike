---
id: ev-charge-diagnosis
title: Diagnose a charging fault
level: home
time: 20 to 45 min (estimate)
applies_to:
- electric
tools:
- owner's manual
- torch
- a known-good wall socket
- a known-good charger of the same model if available
parts:
- charger
- charge_port
- traction_battery
- bms
- fuse
- wiring
consumables: []
fixes:
- ev-charge-jumps
- ev-charge-stops
- ev-charger-cable-damage
- ev-charger-fault
- ev-cold-weather
- ev-dash-dark
- ev-error-code
- ev-port-hot
- ev-range-drop
- ev-wont-charge
---

# Diagnose a charging fault

**Home mechanic (basic tools)** · Time: 20 to 45 min (estimate) (estimate)


Charging needs four things to work together: mains power, the **charger** (the box that turns mains AC into DC for the battery), the cable and **charge port** (the socket on the bike or battery), and the **BMS**, which must agree to accept charge. This job checks them in that order, from cheap and easy to hard.

## Safety
- Charge on a hard, non-flammable floor, never on a bed, sofa or carpet, and keep the charger's vents clear (Ather).
- If the battery is swollen, cracked, leaking, very hot, hissing or smells, unplug at the wall and follow [Handle a damaged battery pack](/moto-zero/repair/repairs/ev-damaged-pack). Do not try to force a charge.
- Never open the charger or the battery. Never use a charger of another voltage or connector type.
- Do not use extension reels that are coiled up or damaged; they can overheat.

## You need
- The owner's manual, to read the charger light codes and the allowed charging temperature for your bike.
- A wall socket you know works (test it with a phone charger or lamp).

## Steps
1. Check the mains: is the wall socket switched on and working? Try a different socket. Is there a power cut?
2. Read the charger lights. Compare them with your manual. Ather, for example, uses blinking green for charging and solid red for a charger fault; your model may be different.
3. Inspect the charger and cable: [Check the charger and cable](/moto-zero/repair/repairs/ev-charger-check). Damaged cable or plug: stop using it.
4. Inspect the port and plug: [Inspect the charge port and plug](/moto-zero/repair/repairs/ev-port-inspect). Dirt, water or bent pins can stop the charger and bike talking to each other.
5. Check the battery temperature. A battery that is too hot after a long ride or too cold after a cold night may refuse charge. Battery University gives **0 to 45 °C** as the charge range for typical lithium-ion cells and says they must not be charged below freezing; Ather advises charging at **5 to 45 °C**. Your bike's manual has the real limits. Move the bike somewhere at room temperature, wait, and try again.
6. On a swap battery, check the battery is the right type for the charger or rack, and its contacts are clean: [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check).
7. If you have a known-good charger of the same model, try it. If it charges, your charger is faulty. If it does not, the problem is in the bike or battery.
8. Read any error code on the dash or app: [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
9. If the charger fan runs but charging is slow or does not start, Ather says the fault is often in the communication between charger and vehicle. This, and any BMS fault, is for the dealer or fleet workshop.

## Check your work
- The charger shows "charging" and the SoC rises steadily.
- The charge finishes at full and the charger shows "complete".
- The plug, socket and charger are only warm, not hot.

## If it did not fix the problem
- Plug or socket hot: [Charge plug or socket gets hot](/moto-zero/repair/problems/ev-port-hot).
- Charging stops early: [Charging stops before the battery is full](/moto-zero/repair/problems/ev-charge-stops).
- Charger stays dark or shows fault: [Charger shows a fault light or stays off](/moto-zero/repair/problems/ev-charger-fault).
- Still no charge: dealer or fleet workshop. Tell them the steps you tried.

## Reference values

| Item | Value | Source |
|---|---|---|
| Typical Li-ion charge temperature range | 0 to 45 °C; no charge below freezing | Battery University BU-410 |
| Ather recommended charging temperature | 5 to 45 °C | Ather Energy blog |

## Problems this repair helps with

- [Battery percentage jumps or drops suddenly](/moto-zero/repair/problems/ev-charge-jumps)
- [Charging stops before the battery is full](/moto-zero/repair/problems/ev-charge-stops)
- [Charger cable or plug is damaged](/moto-zero/repair/problems/ev-charger-cable-damage)
- [Charger shows a fault light or stays off](/moto-zero/repair/problems/ev-charger-fault)
- [Poor range or slow charging in the cold](/moto-zero/repair/problems/ev-cold-weather)
- [Dashboard is dark and the bike seems dead](/moto-zero/repair/problems/ev-dash-dark)
- [Error code or warning on the dashboard](/moto-zero/repair/problems/ev-error-code)
- [Charge plug or socket gets hot](/moto-zero/repair/problems/ev-port-hot)
- [Range has dropped](/moto-zero/repair/problems/ev-range-drop)
- [Battery will not charge](/moto-zero/repair/problems/ev-wont-charge)

## Parts for this job

| Part | Buy |
|---|---|
| [Charger](/moto-zero/repair/parts/charger) | [Find this part](/spare-parts/charger) |
| [Charge port](/moto-zero/repair/parts/charge_port) | [Find this part](/spare-parts/charge-port) |
| [Traction battery pack](/moto-zero/repair/parts/traction_battery) | [Find this part](/spare-parts/traction-battery) |
| [Battery management system](/moto-zero/repair/parts/bms) | [Find this part](/spare-parts/bms) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |

## Sources

- [Ather Energy: Common electric scooter charging problems](https://www.atherenergy.com/blog/fixing-common-charging-problems-in-electric-scooters)
- [Battery University BU-410: Charging at high and low temperatures](https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures)
- [London Fire Brigade: Spot the warning signs](https://www.london-fire.gov.uk/safety/e-bikes-and-e-scooters/spot-the-warning-signs-could-your-e-bike-or-e-scooter-start-a-fire/)
