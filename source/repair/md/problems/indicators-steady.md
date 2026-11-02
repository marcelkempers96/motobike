---
id: indicators-steady
title: Indicators stay on and do not flash
system: lighting
also_called: [indicators stuck on, blinkers do not blink, indicator light steady]
urgency: ride-with-care
applies_to: [all]
parts: [flasher, indicators, wiring, earth_strap, battery]
repairs: [flasher-test, led-indicator-fit, bulb-replace, earth-clean, battery-test-charge, connector-clean]
related: [indicators-fast, indicators-dead, accessory-wiring-fault, battery-flat]
sources:
  - {doc: "K-Light 125 manual", page: 44}
  - {doc: "K-Light 125 manual", page: 45}
  - {doc: "Kellermann flasher relays", url: "https://www.kellermann-online.com/en/electronic/elektronik/blinkrelais/"}
---

# Indicators stay on and do not flash

When you switch on an indicator, the lamps light but stay on instead of flashing, or they flash once and then stay on. The flasher relay is not switching. Usually the flasher has failed, the wrong type of flasher is fitted (for example a bulb-type flasher with LED lamps), a lamp on that side is out, or the battery voltage is too low for the flasher to work.

## Is it safe to ride?
With care. A steady indicator is easy to miss, and other road users may think you have forgotten to cancel it. Use hand signals until it is fixed.

## Quick checks first
- Both sides steady, or only one?
- Has the flasher or any indicator been changed recently, especially to LED?
- Is one lamp on the steady side dark?
- Are the lights and horn weak? Low battery voltage can stop some flashers working.
- Do the lamps flicker or glow faintly on the opposite side? That suggests a wiring or earth fault.

## Diagnose it step by step

**1. Is one lamp on the steady side dark?**
- Yes: replace the bulb ([Replace a bulb](/moto-zero/repair/repairs/bulb-replace)). Some flashers stay on, rather than flash fast, when a bulb is out. If flashing returns, you are done.
- No: go to step 2.

**2. Are LED indicators fitted with the original flasher?**
- Yes: some older bulb-type flashers (especially heat-type ones) need the bulb current to heat up and switch. With LEDs, they never switch. Fit an LED-type or load-independent flasher, or load resistors: [Fit LED indicators correctly](/moto-zero/repair/repairs/led-indicator-fit).
- No: go to step 3.

**3. Is the battery voltage good?** Set the multimeter to DC volts (V with a straight line), 20 V range. Red probe on battery positive, black probe on battery negative.
- Low: charge and test: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Good: go to step 4.

**4. Is the flasher faulty?** Follow [Test the indicator flasher relay](/moto-zero/repair/repairs/flasher-test). On a three-pin flasher, also check its earth pin.
- Earth pin has no continuity to the frame: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Feed and earth good, still steady: the flasher has failed with its contacts closed. Replace it with the same type and pin layout.
- New flasher still steady: go to step 5.

**5. Is there a feed going round the flasher?** If the lamps stay on with the flasher unplugged, power is reaching them some other way: a pinched wire, a bad accessory connection, or a wrongly wired LED indicator with a running light. Key on, flasher unplugged, indicators switched on: set the meter to DC volts and back-probe the lamp wire.
- Voltage present with flasher out: trace the wire for a short to another live wire: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean), and see [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault).

**6. CAN-bus bikes:** if the dashboard or a control unit flashes the indicators, there is no separate flasher to change. Check lamps, fuses and connectors, then see a dealer.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Failed flasher | Steady with good feed and earth | [Test the indicator flasher relay](/moto-zero/repair/repairs/flasher-test) |
| LED indicators with bulb-type flasher | LEDs fitted | [Fit LED indicators correctly](/moto-zero/repair/repairs/led-indicator-fit) |
| One lamp blown | Lamp dark | [Replace a bulb](/moto-zero/repair/repairs/bulb-replace) |
| Low battery voltage | Meter at battery | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Poor flasher earth | No continuity earth pin to frame | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Wiring feed bypassing flasher | Lamps lit with flasher removed | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
