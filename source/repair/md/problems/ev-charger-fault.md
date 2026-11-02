---
id: ev-charger-fault
title: Charger shows a fault light or stays off
system: ev-battery
also_called: [charger red light, charger dead, charger not working, charger fan not running]
urgency: ok-to-ride
applies_to: [electric]
parts: [charger, charge_port, fuse, wiring, bms]
repairs: [ev-charger-check, ev-port-inspect, ev-charge-diagnosis, ev-error-read]
related: [ev-wont-charge, ev-charger-cable-damage, ev-charge-stops, ev-port-hot]
sources:
  - {doc: "Ather Energy: Common electric scooter charging problems", url: "https://www.atherenergy.com/blog/fixing-common-charging-problems-in-electric-scooters"}
  - {doc: "London Fire Brigade: Spot the warning signs", url: "https://www.london-fire.gov.uk/safety/e-bikes-and-e-scooters/spot-the-warning-signs-could-your-e-bike-or-e-scooter-start-a-fire/"}
---

# Charger shows a fault light or stays off

The charger shows no light at all, or shows a fault light, or its lights never change to "charging". Each charger uses its own light codes. Ather, for example, says a blinking green light means charging and a solid red light means the charger is faulty; check your own manual. A charger can show a fault because of its own failure, because the mains supply is wrong, or because it cannot talk to the battery's BMS.

## Is it safe to ride?
Yes, the bike can be ridden on the charge left. Stop using the charger if it is damaged, smells burnt or gets very hot.

## Quick checks first
- Is the wall socket working and switched on?
- Is the mains plug and any fuse in the plug good (where plugs have fuses)?
- Does the charger case smell burnt or show damage?
- Are the charger vents blocked, or is it in the sun?

## Diagnose it step by step

**1. Is the charger damaged, smelling burnt, or very hot?**
- Yes: unplug at the wall and stop using it. [Charger cable or plug is damaged](/moto-zero/repair/problems/ev-charger-cable-damage). Never open the charger.
- No: go to step 2.

**2. Plug the charger into a working wall socket, not connected to the bike. Does any light come on?**
- No light: try a different socket. If still nothing, check the plug fuse if your plug type has one. Still nothing: the charger has failed. Replace with an approved charger.
- Light comes on: go to step 3.

**3. Connect to the bike. Does the light change to "charging"?**
- Yes: the charger works. If the battery still does not charge, see [Battery will not charge](/moto-zero/repair/problems/ev-wont-charge).
- Shows a fault: go to step 4.

**4. Are the plug and port clean, dry and undamaged?** [Inspect the charge port and plug](/moto-zero/repair/repairs/ev-port-inspect).
- No: clean and dry, then retry.
- Yes: go to step 5.

**5. Is the battery very hot or cold?**
- Yes: the charger may refuse until the battery is at a safe temperature. Wait and retry.
- No: go to step 6.

**6. Ather suggests: switch off the mains, wait, switch on again and retry; then try the charger on another bike of the same model. Does it work on the other bike?**
- Yes: the fault is in your bike or battery (port, wiring, BMS). [Diagnose a charging fault](/moto-zero/repair/repairs/ev-charge-diagnosis).
- No: the charger is faulty. Replace it.

**7. Charger fan runs but charging is slow or does not start?** Ather says this often means a communication fault between charger and vehicle. Dealer or fleet workshop.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| No mains power | Socket test | Use a working socket |
| Dirty or wet port | Visual | [Inspect the charge port and plug](/moto-zero/repair/repairs/ev-port-inspect) |
| Battery out of temperature range | Hot or cold battery | Wait |
| Charger failed | No light on two sockets; fails on other bike | Replace with approved charger |
| Communication fault with BMS | Fan runs, no charge | Dealer or fleet workshop |
