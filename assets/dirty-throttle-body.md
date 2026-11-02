---
id: dirty-throttle-body
title: Unstable idle after cleaning or battery disconnection (fuel-injected)
system: fuel
also_called: [idle problems after throttle body cleaning, idle hunts after battery change, ECU lost idle]
urgency: ride-with-care
applies_to: [fuel-injected]
parts: [throttle_body, efi_sensors, intake_manifold, air_filter, battery, ecu]
repairs: [idle-relearn, throttle-body-clean, intake-leak-test, efi-code-read, efi-sensor-check, connector-clean, throttle-cable-adjust]
related: [hunting-idle, high-idle, stalls-at-idle, rough-idle, engine-warning-light, hanging-revs]
sources:
  - {doc: "K-Light 125 manual", page: 258}
  - {doc: "K-Light 125 manual", page: 259}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "K-Light 125 manual", page: 266}
---

# Unstable idle after cleaning or battery disconnection (fuel-injected)

The bike idled well before, but after the throttle body was cleaned, the battery was disconnected or changed, or the intake was taken apart, the idle hunts, is too high, or the engine stalls when you close the throttle. Two things usually cause this. The ECU has lost the small corrections it had learned, and needs to relearn them; or something was disturbed during the work: a hose not refitted, a connector left off, cleaner sprayed into a sensor, or the idle screw turned.

## Is it safe to ride?

With care. Stalling at junctions is dangerous; keep a finger on the throttle until it settles.

## Quick checks first

- Is the engine warning light on?
- Are the air box hose and its clip fully back on the throttle body?
- Are all sensor connectors (throttle position, intake pressure, idle motor) plugged in and clicked?
- Was the idle stop screw turned during the work?
- Was the battery disconnected or flat?

## Diagnose it step by step

**1. Is a fault code stored or the warning light on?**
- Yes: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read). A sensor or idle motor code after work usually means a connector left off or damaged: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- No: go to step 2.

**2. Are all hoses and clips back on, and does the idle change when you spray water around the throttle body joints?**
- Hose off or leak found: refit or fix it. [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test).
- No leak: go to step 3.

**3. Does the throttle close fully with a little free play?**
- No: a cable refitted too tight keeps the throttle open. [Adjust throttle free play](/moto-zero/repair/repairs/throttle-cable-adjust).
- Yes: go to step 4.

**4. Was the idle stop screw on the throttle body turned?**
- Yes: this upsets the closed-throttle position the ECU expects. The K-Light 125 manual says idle is controlled by the ECU and the screw should not be adjusted. A workshop must reset it to the factory position and run a reset: [Reset the idle after throttle body work](/moto-zero/repair/repairs/idle-relearn).
- No: go to step 5.

**5. Let the ECU relearn.** Turn the key ON and wait a few seconds before starting. Start cold and let the engine warm up fully at idle without touching the throttle (it idles fast while cold; on the K-Light 125, until 68 °C). Then ride for 10 to 20 minutes with some stops.
- Idle now steady: done.
- Still unstable: go to step 6.

**6. Is the throttle body still dirty, or was cleaner sprayed into the idle motor or sensor?**
- Still dirty, especially the idle bypass passage: [Clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean) properly, without spraying into sensors.
- Cleaner went into a sensor or the idle motor: a workshop checks them: [Check the engine sensors](/moto-zero/repair/repairs/efi-sensor-check) (the K-Light 125 idle stepper motor has its own resistance check).
- All fine: workshop [idle reset](/moto-zero/repair/repairs/idle-relearn) with a scan tool.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| ECU has lost learned idle values | Started after battery work | Warm-up and ride; [idle reset](/moto-zero/repair/repairs/idle-relearn) |
| Air box hose or clip not refitted | Visual, water spray | [Intake leak test](/moto-zero/repair/repairs/intake-leak-test) |
| Connector left off | Code | [Connector clean](/moto-zero/repair/repairs/connector-clean) |
| Idle stop screw turned | Paint mark moved | Workshop [idle reset](/moto-zero/repair/repairs/idle-relearn) |
| Throttle body not fully cleaned | Deposits in bypass | [Throttle body clean](/moto-zero/repair/repairs/throttle-body-clean) |
| Sensor damaged by cleaner | Code, live data | [Sensor check](/moto-zero/repair/repairs/efi-sensor-check) |
