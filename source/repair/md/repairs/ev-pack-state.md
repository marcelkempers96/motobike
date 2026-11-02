---
id: ev-pack-state
title: Check battery state and health
level: home
time: 15 to 30 min (estimate)
applies_to:
- electric
tools:
- the bike's app or dashboard menu
- notebook or phone
- torch
parts:
- traction_battery
- bms
- charge_port
consumables: []
fixes:
- ev-bms-cutoff
- ev-charge-jumps
- ev-charge-stops
- ev-cold-weather
- ev-cuts-out-accel
- ev-dash-dark
- ev-error-code
- ev-limp-mode
- ev-range-drop
---

# Check battery state and health

**Home mechanic (basic tools)** · Time: 15 to 30 min (estimate) (estimate)


The **traction battery** (the big battery that drives the motor) has a **battery management system** or BMS: a small computer that watches the cells, stops over-charging and over-draining, and estimates how full the battery is. This job checks what the BMS reports and whether the pack looks healthy from the outside. It does not open the pack.

**State of charge** (SoC) is how full the battery is now, usually shown as a percentage. **State of health** (SoH) is how much the battery can hold compared with when it was new. Not every bike shows SoH; some show it in the app, and fleets often see it in their own software.

## Safety
- Never open a battery pack or measure cells inside it. Ather tells owners never to open or repair the pack themselves.
- If the pack is swollen, cracked, leaking, very hot, hissing or smells of chemicals, stop and follow [Handle a damaged battery pack](/moto-zero/repair/repairs/ev-damaged-pack).

## You need
- The app or dashboard menu for your bike, or access to your fleet's battery report.
- A notebook to write down readings and dates.

## Steps
1. Look at the outside of the pack (or swap battery) in good light. Check for swelling, cracks, dents, melted plastic, leaks and corrosion on the contacts. Any of these: stop, see [Handle a damaged battery pack](/moto-zero/repair/repairs/ev-damaged-pack).
2. Turn the bike on. Write down the SoC shown on the dash and in the app if there is one.
3. If the app or menu shows SoH, battery temperature, charge cycle count or warnings, write them down. If you ride for a fleet, ask support for the battery's health report.
4. Charge to full with the correct charger. Note whether the charge reached 100% and how long it took. Compare with the time in your manual.
5. After charging, leave the bike off for a few hours, then turn it on again. Note whether the SoC has dropped by more than a few percent with no riding.
6. Ride a normal day and note any sudden jumps in SoC. The BMS often estimates SoC by counting charge in and out; this estimate can drift with age, temperature and heavy loads, so a jump near empty or after a cold night may be the estimate correcting itself, not a failed battery.
7. If the readings look wrong, do a controlled test: [Do a range test](/moto-zero/repair/repairs/ev-range-test).
8. Compare your notes with earlier months. A slow, steady fall in range over many months is normal ageing. A fast fall, big jumps, or a battery that will not take a full charge needs the dealer or fleet support.

## Check your work
- You have a dated record of SoC, any SoH reading, charge time and range.
- The pack has no visible damage.

## If it did not fix the problem
- Percentage jumps: [Battery percentage jumps or drops suddenly](/moto-zero/repair/problems/ev-charge-jumps).
- Will not reach full: [Charging stops before the battery is full](/moto-zero/repair/problems/ev-charge-stops).
- Battery cuts off: [Battery shuts off suddenly (BMS protection)](/moto-zero/repair/problems/ev-bms-cutoff).
- On a swap fleet, report the battery's ID number to the operator and swap it. Battery health is their job.

## Problems this repair helps with

- [Battery shuts off suddenly (BMS protection)](/moto-zero/repair/problems/ev-bms-cutoff)
- [Battery percentage jumps or drops suddenly](/moto-zero/repair/problems/ev-charge-jumps)
- [Charging stops before the battery is full](/moto-zero/repair/problems/ev-charge-stops)
- [Poor range or slow charging in the cold](/moto-zero/repair/problems/ev-cold-weather)
- [Power cuts out when accelerating hard](/moto-zero/repair/problems/ev-cuts-out-accel)
- [Dashboard is dark and the bike seems dead](/moto-zero/repair/problems/ev-dash-dark)
- [Error code or warning on the dashboard](/moto-zero/repair/problems/ev-error-code)
- [Bike is in reduced power or limp mode](/moto-zero/repair/problems/ev-limp-mode)
- [Range has dropped](/moto-zero/repair/problems/ev-range-drop)

## Parts for this job

| Part | Buy |
|---|---|
| [Traction battery pack](/moto-zero/repair/parts/traction_battery) | [Find this part](/spare-parts/traction-battery) |
| [Battery management system](/moto-zero/repair/parts/bms) | [Find this part](/spare-parts/bms) |
| [Charge port](/moto-zero/repair/parts/charge_port) | [Find this part](/spare-parts/charge-port) |

## Sources

- [Microchip Developer Help: Fundamental understanding of a battery management system](https://developerhelp.microchip.com/xwiki/bin/view/applications/power/fundamental-understanding-of-battery-management-system/)
- [Ather Energy: Common electric scooter charging problems](https://www.atherenergy.com/blog/fixing-common-charging-problems-in-electric-scooters)
- [London Fire Brigade: Spot the warning signs](https://www.london-fire.gov.uk/safety/e-bikes-and-e-scooters/spot-the-warning-signs-could-your-e-bike-or-e-scooter-start-a-fire/)
