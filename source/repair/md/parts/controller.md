---
id: controller
name: Motor controller
category: ev
aliases: [inverter, motor controller, ESC, drive controller]
applies_to: [electric]
sources:
  - {doc: "Levy Electric: how electric bike motors work", url: "https://www.levyelectric.com/resources/understanding-the-mechanics-how-electric-bike-motors-power-your-ride"}
  - {doc: "Electronic Design: pre-charge circuits", url: "https://www.electronicdesign.com/technologies/power/article/21280232/electronic-design-pre-charge-circuits-lead-to-safer-evs"}
---

# Motor controller

The controller is a sealed metal box, often with cooling fins, under the seat or in the frame. Thick cables connect it to the traction battery and three phase wires go to the motor. Smaller plugs connect it to the throttle, brake switches, side stand switch, motor sensors and dashboard.

## What it does
The controller is the bike's power brain. It reads the throttle and turns the battery's DC power into timed three-phase current for the motor, switching large transistors on and off very fast. It also limits current to protect the battery and motor, cuts power when you brake or the side stand is down, reduces power if it or the motor gets too hot (limp mode), controls regenerative braking, and reports error codes. Inside are large capacitors that can stay charged after the bike is switched off. Heat, water and loose connectors cause most failures.

## Signs it is worn or failing
- Ready but will not move: [Bike shows ready but will not move](/moto-zero/repair/problems/ev-ready-no-drive).
- Overheats or shuts down: [Controller overheats](/moto-zero/repair/problems/ev-controller-hot).
- Reduced power: [Limp mode](/moto-zero/repair/problems/ev-limp-mode).
- Power cuts in and out: [Power cuts in and out with the throttle](/moto-zero/repair/problems/ev-throttle-dropout).
- No regen: [Regenerative braking does not work](/moto-zero/repair/problems/ev-no-regen).
- Codes: [Error code on the dashboard](/moto-zero/repair/problems/ev-error-code).

## When to replace it
Only after a workshop has checked the throttle, interlocks, connectors, motor sensors and phase wires, and the maker's tool confirms a controller fault. Many "controller faults" are a wet or loose plug.

## What to match when buying
- Exact controller for your bike: battery voltage, current rating, motor type, sensor type, connectors and software. A wrong or generic controller can overheat the motor or battery.
- Some controllers must be programmed for the bike; buy through the maker or dealer.

## Fitting notes
- The capacitors can hold a dangerous charge. Isolate and confirm zero voltage with a rated meter, following the maker's procedure: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
- Keep fins clean and airflow clear: [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check).
- See [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis), [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
