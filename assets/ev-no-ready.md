---
id: ev-no-ready
title: Dashboard is on but the bike will not go to ready
system: ev-drive
also_called: [no ready light, won't go into drive mode, P mode stuck, will not start electric]
urgency: do-not-ride
applies_to: [electric]
parts: [interlock_switches, side_stand, brake_light_switch, throttle_sensor, traction_battery, contactor, controller, aux_battery]
repairs: [ev-interlock-check, ev-error-read, ev-swap-contact-check, ev-aux-check, ev-controller-diagnosis, brake-switch-test]
related: [ev-error-code, ev-dash-dark, ev-ready-no-drive, ev-swap-not-recognised, start-blocked-interlock, throttle-sticks, ev-wont-charge]
sources:
  - {doc: "Gogoro Smart Battery and GoStation safety information", url: "https://gogoro.com/product-information"}
  - {doc: "SolarQuotes: Your EV has a 12 volt battery", url: "https://www.solarquotes.com.au/blog/ev-12-volt-battery/"}
---

# Dashboard is on but the bike will not go to ready

The dash lights up but the **ready** symbol (often a green "READY", a "P" that changes to a riding mode, or a motor symbol) never appears. "Ready" means the controller has checked the safety switches and the battery, closed the main contactor (the heavy switch that connects the battery to the controller), and is waiting for throttle. Most often a safety condition is not met: side stand down, no brake held during start, throttle not closed, or the battery not recognised. Less often, a fault code blocks it.

## Is it safe to ride?
It cannot drive. Do not try to bypass switches to make it go.

## Quick checks first
- Side stand fully up. Seat closed (some scooters).
- Follow the start steps in your manual exactly: many bikes need a brake held while you press the start or mode button.
- Hands off the throttle when switching on.
- Kill or run switch in the run position.
- Look for a warning symbol or code on the dash.

## Diagnose it step by step

**1. Is there an error code or warning symbol?**
- Yes: record and look it up: [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read). Follow what your manual says for that code. Then go to step 2 if it points to a switch, or [Error code or warning on the dashboard](/moto-zero/repair/problems/ev-error-code) for other codes.
- No: go to step 2.

**2. With the bike on its stand, do the stand and brake symbols change when you move the stand and pull each brake?**
- No: a switch is faulty or dirty: [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check).
- Yes: go to step 3.

**3. Does the throttle snap back fully when you let go?**
- No: a part-open throttle at start-up blocks ready on many bikes. See [Throttle sticks or does not snap shut](/moto-zero/repair/problems/throttle-sticks).
- Yes: go to step 4.

**4. Does the dash show the battery and a normal SoC?**
- No or shows zero: battery not recognised or empty. On a swap bike: [Swapped battery is not recognised](/moto-zero/repair/problems/ev-swap-not-recognised). Fixed battery: charge it and see [Battery will not charge](/moto-zero/repair/problems/ev-wont-charge) if needed.
- Yes: go to step 5.

**5. Is the dash dim, flickering, or does it reset when you press start?**
- Yes: low 12 V supply can stop the contactor closing (SolarQuotes). [Check the 12 V auxiliary system](/moto-zero/repair/repairs/ev-aux-check).
- No: go to step 6.

**6. Do you hear a click from the contactor when you press start, then nothing?**
- Click then no ready, or no click at all: a contactor, pre-charge or controller fault. This is workshop work: [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis). Call the dealer or fleet support line.

*What happens if you keep pressing start many times:* you may store more fault codes and drain a weak 12 V battery. Stop after two or three tries.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Side stand down or switch fault | Stand symbol stays on | [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check) |
| Start steps not followed (brake not held) | Works when done as manual says | Follow the manual |
| Brake switch fault | Brake light does not come on | [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test) |
| Throttle not closed or sensor fault | Throttle sticks, or code | [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check) |
| Battery not recognised | No SoC shown | [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check) |
| Low 12 V supply | Dim dash, low reading | [Check the 12 V auxiliary system](/moto-zero/repair/repairs/ev-aux-check) |
| Contactor, pre-charge or controller fault | Code; all switches good | [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis) |
