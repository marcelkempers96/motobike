---
id: ev-error-code
title: Error code or warning on the dashboard
system: ev-drive
also_called: [fault code, E code, warning symbol, spanner light, service light electric]
urgency: ride-with-care
applies_to: [electric]
parts: [controller, bms, traction_battery, motor_sensor, throttle_sensor, interlock_switches, instruments, charger]
repairs: [ev-error-read, ev-interlock-check, ev-swap-contact-check, ev-pack-state, ev-controller-diagnosis, ev-motor-diagnosis, ev-charge-diagnosis, ev-thermal-check]
related: [ev-no-ready, ev-limp-mode, ev-insulation-warning, ev-pack-hot-smell, ev-bms-cutoff, warning-lights-flicker, ev-cold-weather]
sources:
  - {doc: "em3ev: How to test e-bike motor Hall sensors", url: "https://em3ev.com/?p=43276"}
  - {doc: "Ather Energy: Common electric scooter charging problems", url: "https://www.atherenergy.com/blog/fixing-common-charging-problems-in-electric-scooters"}
  - {doc: "London Fire Brigade: Spot the warning signs", url: "https://www.london-fire.gov.uk/safety/e-bikes-and-e-scooters/spot-the-warning-signs-could-your-e-bike-or-e-scooter-start-a-fire/"}
---

# Error code or warning on the dashboard

A code (for example letters and numbers), a warning symbol or a flashing pattern appears on the dash or in the app. Electric motorcycles use codes to report problems found by the controller, the BMS or the charger. **Each manufacturer uses its own codes.** The same code can mean different things on different bikes (em3ev), so the meaning must come from your model's manual, app, dealer or fleet support line, never from a generic list. This page helps you decide how urgent it is and what to check first.

## Is it safe to ride?
It depends on the warning. Battery temperature, insulation or high-voltage warnings, or any heat, smoke or smell: stop at once. Other codes: ride with care only after you know what the code means.

## Quick checks first
- Photograph the dash.
- Battery hot, swollen, hissing or smelling? Stop and keep away.
- Side stand up, brakes released, throttle closed, battery latched?
- Did it appear while charging, starting, riding or after rain?

## Diagnose it step by step

**1. Is the warning about battery temperature, insulation, high voltage or "stop", or is there heat, smoke, hissing or a chemical smell?**
- Yes: stop safely, switch off, step away. London Fire Brigade lists heat, swelling, leaking, hissing and strong chemical smells as warning signs. See [Battery pack is hot, hissing or smells](/moto-zero/repair/problems/ev-pack-hot-smell) or [Insulation or high-voltage warning](/moto-zero/repair/problems/ev-insulation-warning).
- No: go to step 2.

**2. Do you know the code's meaning from the official manual, app or support line?** [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
- No: contact the dealer or fleet support line with the photo. Do not guess.
- Yes: go to step 3.

**3. Does the code point to a switch or the rider (stand, brake, throttle, battery not latched, charger connected)?**
- Yes: [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check) or [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check).
- No: go to step 4.

**4. Does the code point to battery level, temperature or BMS?**
- Yes: [Check battery state and health](/moto-zero/repair/repairs/ev-pack-state); see [Battery shuts off suddenly (BMS protection)](/moto-zero/repair/problems/ev-bms-cutoff) or [Poor range or slow charging in the cold](/moto-zero/repair/problems/ev-cold-weather).
- No: go to step 5.

**5. Does the code point to the motor, Hall sensor, controller or throttle sensor?**
- Yes: workshop: [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis) or [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).
- No (charging code): [Diagnose a charging fault](/moto-zero/repair/repairs/ev-charge-diagnosis).

**6. After the fix, switch off and on once. Does the code come back?**
- No: done. Keep your notes.
- Yes: do not keep clearing it. Hand the bike and your notes to the workshop. Ather, for example, suggests a reset by holding the power button before visiting service; use your manual's reset only once.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Interlock (stand, brake, throttle) | Code meaning; symbol | [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check) |
| Battery not seated, low or out of temperature | Code meaning; SoC | [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check) |
| Overheating | After climbs | [Check cooling of the motor and controller](/moto-zero/repair/repairs/ev-thermal-check) |
| Sensor or wiring fault | Motor or throttle code | [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis) |
| BMS or battery fault | Battery code, returns | Dealer or fleet battery check |
