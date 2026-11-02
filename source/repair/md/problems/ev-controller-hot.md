---
id: ev-controller-hot
title: Controller overheats or shuts down
system: ev-drive
also_called: [controller temperature warning, inverter overheating, power cut after hills]
urgency: ride-with-care
applies_to: [electric]
parts: [controller, wiring, motor, traction_battery, bodywork]
repairs: [ev-thermal-check, ev-error-read, ev-phase-connector-check, ev-controller-diagnosis]
related: [ev-motor-hot, ev-limp-mode, ev-cuts-out-accel, burning-smell-wiring]
sources:
  - {doc: "Upway: Electric bike overheating causes and fixes", url: "https://upway.co/blogs/news/electric-bike-overheating-causes-and-fixes"}
  - {doc: "Letrigo: How to test an e-bike motor", url: "https://letrigo.com/blogs/knowledge/how-to-test-ebike-motor"}
---

# Controller overheats or shuts down

The dash shows a controller temperature warning, or the bike loses power and comes back after a few minutes' rest. The **controller** switches large currents to the motor and makes heat while doing it. Upway names sustained load, poor air flow and high air temperature as the main causes. Bikes protect the controller by reducing power or shutting down, then recovering once it cools. Repeated shutdowns under load are a reason to stop riding and get the bike checked (Upway).

## Is it safe to ride?
Ride with care. A sudden cut-out in traffic is dangerous. Rest the bike when it warns you. Do not ride if there is a burning smell.

## Quick checks first
- Is the controller area covered by a bag, sack, extra panel or packed mud?
- Was it a long climb, heavy load or very hot day?
- Has anything changed recently: new accessories, panels, a different controller or "tuning"?
- Burning smell or melted plastic?

## Diagnose it step by step

**1. Is there a burning smell, smoke or melted plastic near the controller?**
- Yes: switch off, do not ride. Burning smell from the controller is a serious warning (Letrigo). Workshop: [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).
- No: go to step 2.

**2. Is air flow to the controller blocked?**
- Yes: clear it: [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check).
- No: go to step 3.

**3. Does it happen only on long climbs, with heavy loads, or in very hot weather?**
- Yes: likely normal protection. Use a lower mode on climbs, reduce load, rest in shade.
- No: go to step 4.

**4. Is the motor also hot, or does the bike judder?**
- Yes: a motor or phase fault is making the controller work harder. [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check) and [Motor gets very hot or power drops after a long climb](/moto-zero/repair/problems/ev-motor-hot).
- No: go to step 5.

**5. Has the controller been changed, re-programmed or "unlocked" for more speed?**
- Yes: higher current settings make more heat and can damage the motor and battery. Ask the dealer to restore the manufacturer's settings.
- No: go to step 6.

**6. Is there a stored code?** [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
- Yes or no, if overheating happens on your normal route: workshop. The controller's temperature sensor, fan (if fitted), mounting or internal parts may be faulty: [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Blocked air flow | Bag, mud, panel over controller | [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check) |
| Heavy load, long climbs, heat | Only in those conditions | Lower mode, rest |
| Phase connector or motor fault | Motor hot, judder | [Check motor phase connectors](/moto-zero/repair/repairs/ev-phase-connector-check) |
| Modified controller settings | History of tuning | Restore manufacturer settings |
| Controller fault or poor mounting | Overheats on normal route | [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis) |
