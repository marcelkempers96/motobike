---
id: contactor
name: Main contactor and pre-charge
category: ev
aliases: [main relay, HV relay, pre-charge resistor]
applies_to: [electric]
sources:
  - {doc: "Electronic Design: pre-charge circuits", url: "https://www.electronicdesign.com/technologies/power/article/21280232/electronic-design-pre-charge-circuits-lead-to-safer-evs"}
---

# Main contactor and pre-charge

The main contactor is a heavy-duty relay (an electrically operated switch) between the traction battery and the controller. It may be inside the battery pack, in a junction box, or near the controller. Next to it is a small pre-charge circuit: a resistor and a smaller relay.

## What it does
When you switch on, the system first closes the pre-charge path. Current flows slowly through the resistor and charges the controller's capacitors. When their voltage is close to the battery voltage, the main contactor closes and full power is available; the bike shows ready. Without pre-charge, closing the contactor would cause a huge surge that pits the contacts and stresses the capacitors. When you switch off or there is a fault, the contactor opens to cut high voltage. Pitted or welded contacts, a burnt pre-charge resistor or a weak 12 V supply to the coil stop the bike going to ready.

## Signs it is worn or failing
- Dash on, click or no click, but never ready: [Will not go to ready](/moto-zero/repair/problems/ev-no-ready).
- Error code for pre-charge or contactor: [Error code on the dashboard](/moto-zero/repair/problems/ev-error-code).
- Bike cuts out when hitting bumps: [Power cuts in and out](/moto-zero/repair/problems/ev-throttle-dropout).
- Dead dash: check the 12 V supply first: [Dashboard is dark](/moto-zero/repair/problems/ev-dash-dark).

## When to replace it
After a workshop confirms the fault with the maker's tool and a rated meter. A contactor that has welded shut is a safety fault: high voltage may stay on after key-off.

## What to match when buying
- Exact part for your bike: voltage and current rating, coil voltage, mounting and connector. A contactor rated too low can weld shut.
- Pre-charge resistors must match the value and power rating in the maker's parts list.
- Not a rider or home part.

## Fitting notes
- High-voltage work: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
- Check the 12 V system first: [Check the 12 V auxiliary system](/moto-zero/repair/repairs/ev-aux-check).
- See [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).
