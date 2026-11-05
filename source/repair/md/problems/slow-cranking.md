---
id: slow-cranking
title: Engine turns over slowly
system: starting
also_called: [weak cranking, starter sluggish, lazy starter, cranks slow]
urgency: ride-with-care
applies_to: [electric-start]
parts: [battery, earth_strap, starter, starter_relay, engine_oil, wiring]
repairs: [battery-test-charge, battery-terminal-clean, starter-circuit-test, starter-motor-service, oil-level-check, compression-test, earth-clean, battery-replace, engine-oil-service]
related: [battery-flat, not-charging, starter-clicks, hard-cold-start, engine-seized, battery-corrosion]
sources:
  - {doc: "K-Light 125 manual", page: 39}
  - {doc: "K-Light 125 manual", page: 76}
  - {doc: "K-Light 125 manual", page: 91}
  - {doc: "K-Light 125 manual", page: 92}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/electric_starters.htm"}
---

# Engine turns over slowly

The starter turns the engine, but slowly, and the engine may not start. The starter needs a large current, so anything that weakens it (a tired battery, a dirty joint, worn starter brushes) or anything that makes the engine harder to turn (thick cold oil, a tight engine) slows the cranking. The K-Light 125 fault chart lists low battery power, poor wiring and a foreign body caught in the starter gear (PDF page 92).

## Is it safe to ride?
Yes, if it starts. But the battery may soon fail to start the bike at all, and a fuel-injected bike needs a healthy battery to run its pump and ECU.

## Quick checks first
- Do the lights dim a lot while cranking?
- Is it worse on cold mornings?
- When was the battery fitted? Lead acid batteries often weaken after 2 to 3 years (K-Light 125 manual).
- Are the terminals tight and clean?
- Is the oil the grade your manual asks for?
- Starter cables are thick for a reason. A thin, damaged or loose starter cable or lug can starve the starter even with a good battery.

## Diagnose it step by step

**1. Is the battery charged when rested (K-Light 125: about 13.1 V full, charge at 12.3 V)?**
- No: charge it with [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge). If it will not hold charge, replace it. If it goes flat after riding, see [Battery is not charging while riding](/moto-zero/repair/problems/not-charging).
- Yes: go to step 2.

**2. Does the battery voltage fall a lot while cranking?**
- Yes, and the battery is charged: the battery may be worn out. A good voltage at rest does not prove a battery is healthy. Have it load tested or try a known good battery.
- No, it stays fairly steady: go to step 3.

**3. Are all heavy cable joints clean and tight (battery posts, relay, starter, earth to engine)?**
- No: [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean) and [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Yes: go to step 4.

**4. Does a voltage drop test while cranking show a large loss across any one cable or the relay?**
- Yes: replace that cable or relay. [Test the starter circuit](/moto-zero/repair/repairs/starter-circuit-test).
- No: go to step 5.

**5. With the plug out (cap on a spark tester), does the engine now spin fast and easily?**
- Yes: the starter and battery are fine; the engine is harder to turn than normal. Check oil grade and level ([Check the engine oil level](/moto-zero/repair/repairs/oil-level-check)) and compression ([Test engine compression](/moto-zero/repair/repairs/compression-test)). Very high compression can come from heavy carbon.
- No, still slow: go to step 6.

**6. Does the engine turn freely by hand or with the kickstarter?**
- No: it may be tight or damaged. See [Engine has seized or locked up](/moto-zero/repair/problems/engine-seized).
- Yes: the starter motor is weak. [Remove and inspect the starter motor](/moto-zero/repair/repairs/starter-motor-service).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Partly flat battery | Low rested voltage | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Worn battery | Charged, but voltage collapses when cranking | [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace) |
| Dirty or loose terminal or earth | Voltage drop across the joint; warm terminal | [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean) |
| Thick or wrong oil in cold weather | Slow only when cold | [Change the engine oil and clean the strainer](/moto-zero/repair/repairs/engine-oil-service) |
| Worn starter brushes | Full voltage at starter, still slow | [Remove and inspect the starter motor](/moto-zero/repair/repairs/starter-motor-service) |
| Tight engine or heavy carbon | Slow even with plug out; high compression | [Test engine compression](/moto-zero/repair/repairs/compression-test) |
| Dirty brush holder or commutator in the starter | Black carbon dust inside the end cover; worn brushes | [Check starter brushes, commutator and armature on the bench](/moto-zero/repair/repairs/starter-armature-test) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Battery fully charged (20 °C) | 13.1 V | 76 |
| Battery needs charging (20 °C, after 1 h rest) | 12.3 V | 76 |
| Starter brush limit | 8.5 mm | 91 |
