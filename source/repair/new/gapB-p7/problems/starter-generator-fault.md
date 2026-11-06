---
id: starter-generator-fault
title: Starter-generator bike will not start on the button or will not charge
system: charging
also_called: [dynamo not charging, starter dynamo dead, dynastart fault, generator starter problem]
urgency: ride-with-care
applies_to: [electric-start, two-stroke, four-stroke]
parts: [battery, starter_brushes, starter_generator, regulator, wiring, earth_strap]
repairs: [battery-test-charge, earth-clean, starter-generator-test, voltage-drop-test]
related: [not-charging, starter-silent, slow-cranking, overcharging, battery-flat]
sources:
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/genstarter.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/electric_starters.htm"}
---

# Starter-generator bike will not start on the button or will not charge

Some older small bikes (mostly 100 to 185 cc models from the 1960s and 1970s) have a starter-generator on the end of the crankshaft instead of a separate starter and alternator. The same unit turns the engine and then charges the battery, controlled by a mechanical regulator box. When it fails, the button does nothing, the engine turns weakly, or the battery goes flat while riding. Most faults are a weak battery, dirty connections or worn brushes, which are cheap to fix.

## Is it safe to ride?
If the bike kick starts and runs, it can be ridden short distances in daylight. The battery will slowly go flat, and on these bikes the ignition may need the battery, so the engine can stop. Do not ride at night if the lights depend on a battery that is not charging.

## Quick checks first
- Is the battery fully charged? These units need a full battery to turn the engine.
- Are the battery terminals and the main earth tight and clean?
- Is the kill switch on RUN and the fuse good?
- Is there a smell of burning or a hot regulator box? Stop and disconnect the battery.

## Diagnose it step by step

**1. Does the battery read full and pass a load test?**
- No: charge or replace it: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge). Then try again.
- Yes: go to step 2.

**2. Press the button. Does the relay click?**
- No click: the button, fuse, relay or its wiring has a fault. Trace it with a test light: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).
- Click, but the engine does not turn or turns slowly: go to step 3.
- The engine turns normally but the battery goes flat while riding: go to step 4.

**3. Are the cables and earth sound under load?**
- Check with [Do a voltage drop test](/moto-zero/repair/repairs/voltage-drop-test). A high drop: clean or replace the cable or earth.
- No drop, still weak: open the cover and check the brushes and commutator: [Test a starter-generator (dynamo) on an older small bike](/moto-zero/repair/repairs/starter-generator-test).

**4. With the engine running above idle, does battery voltage rise above the resting value?**
- Yes, and it stays steady: charging works. Look for a drain or a worn battery: [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat).
- Yes, and it keeps climbing with revs, bulbs blow: the regulator is not controlling output. See [Battery overcharges and bulbs blow](/moto-zero/repair/problems/overcharging) and have the regulator checked.
- No: go to step 5.

**5. Does the generator make voltage when tested apart from the regulator?**
- Use the generator output test in [Test a starter-generator (dynamo) on an older small bike](/moto-zero/repair/repairs/starter-generator-test).
- Good output: the regulator box is faulty or out of adjustment. A workshop with the manual values can clean and set it, or replace it.
- No output: brushes, field coils or armature are faulty. Test each part in the same repair.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Weak or flat battery | Low resting voltage, fails load test | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Dirty or loose connections and earth | Voltage drop high, terminals corroded | [Clean an earth connection](/moto-zero/repair/repairs/earth-clean) |
| Worn or sticking brushes | Short brushes, carbon dust, weak spring | [Test a starter-generator (dynamo) on an older small bike](/moto-zero/repair/repairs/starter-generator-test) |
| Dirty commutator | Dark, burnt or smeared segments | Clean and undercut, same repair |
| Regulator contacts or setting | Generator good on its own, no charge or overcharge with regulator | Workshop: clean, set or replace |
| Shorted field coil or armature | Continuity to the body | Rewind or replace the unit |
