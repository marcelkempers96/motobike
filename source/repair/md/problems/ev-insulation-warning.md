---
id: ev-insulation-warning
title: Insulation or high-voltage warning
system: ev-drive
also_called: [isolation fault, HV fault, ground fault warning, leakage warning]
urgency: stop-now
applies_to: [electric]
parts: [traction_battery, wiring, motor, controller, charger, charge_port, dc_dc]
repairs: [ev-error-read, ev-water-check, ev-safe-isolation, ev-insulation-check]
related: [ev-water-exposure, ev-pack-damaged, ev-error-code, wet-connectors, ev-pack-hot-smell]
sources:
  - {doc: "Power Systems Design: Detecting IT power system faults with insulation monitoring", url: "https://www.powersystemsdesign.com/articles/detecting-it-power-system-resistive-and-capacitive-faults-with-insulation-monitoring-technology/22/22720"}
  - {doc: "IMI National Occupational Standard IMIEV02: First response to a damaged electric vehicle", url: "https://www.ukstandards.org.uk/en/nos-finder/IMIEV02/provide-a-first-response-to-a-broken-down-or-damaged-electric-vehicle"}
---

# Insulation or high-voltage warning

The dash shows an insulation, isolation, HV or leakage warning. On most electric vehicles, the high-voltage battery circuit is kept fully separate from the frame. An **insulation monitor** checks this all the time. A warning means it has found a leak path from the high-voltage circuit to the frame. Causes include water or condensation, battery leakage, frayed or crushed cables, crash damage, faulty connectors and conductive dirt (Power Systems Design). Even a single fault can be a shock hazard (Power Systems Design). Not every small electric bike has this monitor; if yours shows this warning, take it seriously.

## Is it safe to ride?
**Stop now.** Park safely, switch off and do not charge. Do not touch bare metal parts near the battery, motor or controller.

## Quick checks first
- Is there smoke, heat, hissing or a chemical smell from the battery? If yes, move away and call for help.
- Has the bike been through deep water, a flood, or been pressure-washed?
- Has it fallen or crashed recently?
- Have accessories been wired in recently?

## Diagnose it step by step

**1. Is there smoke, heat, hissing or a chemical smell?**
- Yes: move away, keep people away, call the fire service if it smokes. See [Battery pack is hot, hissing or smells](/moto-zero/repair/problems/ev-pack-hot-smell).
- No: go to step 2.

**2. Has the bike been in deep water, a flood, or heavy washing?**
- Yes: go to [Bike has been in deep water or a flood](/moto-zero/repair/problems/ev-water-exposure). Do not switch on or charge.
- No: go to step 3.

**3. Has the bike crashed or fallen, or is any orange or thick cable visibly damaged?**
- Yes: treat the battery as possibly damaged: [Battery pack is dropped, dented, swollen or wet](/moto-zero/repair/problems/ev-pack-damaged).
- No: go to step 4.

**4. Did the warning appear only while charging?**
- Yes: unplug at the wall. The charger, its cable or the charge port may be the leak path. Do not use that charger again until tested. Try nothing else; go to step 5.
- No: go to step 5.

**5. Record the warning and call for recovery.** [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read). Call the dealer, fleet or swap operator support line. Ask for the bike to be collected, not ridden in.

**6. Workshop:** the technician isolates the HV system ([Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation)) and tests each part to find the leak: [Check high-voltage insulation](/moto-zero/repair/repairs/ev-insulation-check). The test voltage and pass value come from the manufacturer only. Training in first response does not make someone competent to repair HV parts (IMI EV02).

*What happens if you keep riding:* the leak can get worse with vibration and water, and a second fault can make the frame live.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Water in a connector or part | After rain, washing, flood | [Check a bike after water exposure](/moto-zero/repair/repairs/ev-water-check) |
| Damaged HV cable | Visible crush or chafe | Workshop replacement |
| Charger or charge port fault | Only while charging | Workshop test of charger |
| Motor winding to case fault | Workshop insulation test | [Check high-voltage insulation](/moto-zero/repair/repairs/ev-insulation-check) |
| Battery internal fault or leakage | Workshop insulation test | Battery specialist |
