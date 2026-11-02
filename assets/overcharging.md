---
id: overcharging
title: Battery overcharges and bulbs blow
system: charging
also_called: [overcharging, voltage too high, bulbs keep blowing, battery boiling, regulator failed high]
urgency: do-not-ride
applies_to: [electric-start, kickstart, fuel-injected, carburettor]
parts: [regulator, battery, earth_strap, wiring, stator]
repairs: [charging-system-test, regulator-test, earth-clean, connector-clean, battery-test-charge, battery-replace]
related: [bulbs-blow-often, battery-swollen, regulator-hot, headlight-flicker, battery-corrosion]
sources:
  - {doc: "K-Light 125 manual", page: 42}
  - {doc: "K-Light 125 manual", page: 76}
  - {doc: "K-Light 125 manual", page: 78}
  - {doc: "K-Light 125 manual", page: 79}
---

# Battery overcharges and bulbs blow

Bulbs blow often, lights get brighter as you rev, the battery gets hot, smells or loses water, or the voltage at the battery climbs above the manual's range. The regulator should hold the charging voltage steady. When it fails, or when its earth or sensing wire is poor, the full stator output reaches the battery and every bulb. The K-Light 125 manual names a regulator fault as the cause of high voltage (PDF pages 42 and 76).

## Is it safe to ride?
No. Overcharging boils the battery (acid and explosive gas), can damage the ECU and other electronics, and can leave you without lights at night.

## Quick checks first
- Do the lights get much brighter when you rev the engine?
- Is the battery hot, swollen or smelling of acid? If so, see [Battery is boiling, swollen or leaking](/moto-zero/repair/problems/battery-swollen).
- Look at the regulator: loose bolts, cracked case, burnt connector?
- Have accessories or LED bulbs been fitted recently?

## Diagnose it step by step

**1. Is the battery swollen, very hot or leaking?**
- Yes: switch off, do not charge it, let it cool outdoors and replace it. [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace). Then carry on to find the cause before fitting the new one, or it will be damaged too.
- No: go to step 2.

**2. With a charged battery, does the voltage go above the manual's range as you raise the revs? (K-Light 125: 14.5 ± 0.5 V at 5000 rpm)**
- Yes: overcharging confirmed. Go to step 3. Use [Test the charging system](/moto-zero/repair/repairs/charging-system-test).
- No: voltage is normal. Frequent bulb failure has another cause: vibration, wrong bulb type, loose connections. See [Bulbs keep blowing](/moto-zero/repair/problems/bulbs-blow-often).

**3. Is the regulator earth good (black wire to earth, regulator body bolted to clean metal)?**
- No: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean). A poor regulator earth can make it read the voltage wrongly.
- Yes: go to step 4.

**4. Is the regulator connector clean and tight, and does battery voltage reach its battery wire with the key ON?**
- No: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- Yes: go to step 5.

**5. Does the regulator fail its diode check, or does a known good regulator bring the voltage into range?**
- Yes: replace the regulator with the correct type for your bike. [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test).
- No: check whether a non-standard regulator or stator has been fitted, and have a workshop check the stator output.

**6. After the repair, test the battery.** Overcharging often ruins it. [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Failed regulator | Voltage rises above range with revs | [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test) |
| Poor regulator earth | Black wire or mounting poor | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Poor connector at regulator | Burnt or loose pins | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Wrong regulator fitted | Part number differs | Fit the correct part |
| Damaged battery (result, not cause) | Swollen, hot, low electrolyte | [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Charging voltage | 14.5 ± 0.5 V at 5000 rpm | 78 |
