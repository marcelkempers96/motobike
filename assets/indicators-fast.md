---
id: indicators-fast
title: Indicators flash too fast
system: lighting
also_called: [hyperflash, fast blinking, rapid flashing one side]
urgency: ride-with-care
applies_to: [all]
parts: [indicators, flasher, earth_strap, wiring]
repairs: [bulb-replace, flasher-test, led-indicator-fit, earth-clean, connector-clean]
related: [indicators-dead, indicators-steady, accessory-wiring-fault, overcharging]
sources:
  - {doc: "K-Light 125 manual", page: 99}
  - {doc: "Kellermann i.LOAD load resistors", url: "https://www.kellermann-online.com/en/shop/electronic-accessories/i.load/"}
  - {doc: "Kellermann flasher relays", url: "https://www.kellermann-online.com/en/electronic/elektronik/blinkrelais/"}
  - {doc: "HELLA Tech World: CAN bus and vehicle lighting", url: "https://www.hella.com/techworld/sg/lounge/can-bus-vehicle-lighting-bulb-replacement-workshop"}
---

# Indicators flash too fast

The indicators blink much faster than normal, on one side or both. Most bulb-type flasher relays measure the current through the lamps. If the current is too low, they flash fast on purpose, to warn you that a bulb has failed. So fast flashing usually means one lamp on that side is not drawing its normal current: a blown bulb, a poor earth, a lower-wattage bulb, or an LED indicator.

## Is it safe to ride?
Yes, with care. Check that every indicator still lights, because one may be out. Riders behind you may not see a dark lamp.

## Quick checks first
- Fast on one side only, or on both sides?
- Walk round the bike with the indicators on. Is one lamp dark or dim?
- Have LED indicators, or bulbs of a different wattage, been fitted?
- Fast only at higher revs? The supply voltage may be high: see step 5.

## Diagnose it step by step

**1. Is one lamp on the fast side dark or dim?**
- Dark: [Replace a bulb](/moto-zero/repair/repairs/bulb-replace). K-Light 125 indicator bulb: R10W (PDF p. 99). Use the same wattage as the other indicators.
- Dim: go to step 3.
- All lamps light normally: go to step 2.

**2. Are any indicators LED, or are bulbs of a lower wattage fitted?**
- Yes: this is the cause. LEDs draw far less current than bulbs, so a bulb-type flasher flashes fast. Kellermann, an indicator maker, notes that flash rate may rise after new indicators are fitted (see sources). Fix it properly with [Fit LED indicators correctly](/moto-zero/repair/repairs/led-indicator-fit): fit an LED-type or load-independent flasher, or a load resistor per LED lamp.
- No: go to step 3.

**3. Does a dim or flashing lamp have a poor earth?** Indicators that earth through their stalk or mounting bolt often rust there. Set the multimeter to DC volts (V with a straight line). Indicators on. Red probe on battery positive, black probe on the lamp's earth wire or metal body. The reading should pulse to close to battery voltage.
- Low or nothing: clean the earth: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Good: go to step 4.

**4. Is the bulb holder or plug corroded?** Look for green powder, a loose bulb or a pushed-back pin.
- Yes: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- No: go to step 5.

**5. Is the flasher itself faulty?** Fast on both sides with all lamps correct often means a failing flasher. Test it with [Test the indicator flasher relay](/moto-zero/repair/repairs/flasher-test), or swap in a known good flasher of the correct type.
- Normal with a new flasher: the old one was faulty.
- Still fast only at high revs: check the charging voltage is not too high, see [Battery overcharges and bulbs blow](/moto-zero/repair/problems/overcharging).

**6. CAN-bus bike?** On bikes where the dashboard or a control unit flashes the indicators, fast flashing or a lamp warning can come from a non-approved LED, a poor earth or a bad holder. HELLA notes that a faulty earth can be reported as a bulb fault. Check those first, then see a dealer.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| One bulb blown on that side | Lamp dark | [Replace a bulb](/moto-zero/repair/repairs/bulb-replace) |
| LED indicators with bulb-type flasher | LEDs fitted | [Fit LED indicators correctly](/moto-zero/repair/repairs/led-indicator-fit) |
| Lower-wattage bulb fitted | Check bulb marking | [Replace a bulb](/moto-zero/repair/repairs/bulb-replace) |
| Poor lamp earth | Low voltage on earth test | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Corroded holder or plug | Visual | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Faulty flasher | Normal with known good flasher | [Test the indicator flasher relay](/moto-zero/repair/repairs/flasher-test) |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Indicator bulb | R10W | PDF p. 99 |
