---
id: battery-volts-ok-fails-load
title: Battery reads good voltage but will not start the bike
system: charging
also_called: [battery shows 12 volts but will not crank, battery tests ok but is dead, voltage ok no cranking]
urgency: do-not-ride
applies_to: [electric-start, all]
parts: [battery, wiring, starter_relay, earth_strap]
repairs: [battery-hydrometer-test, battery-test-charge, voltage-drop-test, battery-terminal-clean, battery-replace]
related: [slow-cranking, battery-flat, starter-clicks, new-battery-dies, weak-battery-no-fire]
sources:
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/batteries.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "http://www.dansmc.com/electricaltesting.htm"}
photos: [{file: "source/dansmc/05_Electrical_Ignition/095/095_lead_sulfate.jpg", caption: "White lead sulfate seen on battery plates"}, {file: "source/dansmc/05_Electrical_Ignition/095/095_tester.jpg", caption: "Battery tester"}]
---

# Battery reads good voltage but will not start the bike

The meter says the battery is fine, yet the starter is weak or the lights die when you press start. Voltage with no load only shows the pressure in the battery, not how much current it can deliver. A worn or sulfated battery can show a good surface voltage and collapse under load.

## Is it safe to ride?
Do not ride if the bike will not start. A battery that fails under load can also fail on the road and take out the lights.

## Quick checks first
- Are the terminals clean, tight and free of white or green crust?
- Is the earth strap from the battery to the frame tight?
- Did the lights dim at once when you pressed start?
- How old is the battery?

## Diagnose it step by step

**1. Watch the voltage while cranking.**
- Meter on the battery terminals, press start.
- Voltage falls to a very low value at once: the battery cannot supply the current. Go to step 2.
- Voltage stays up but the starter is weak: the fault is in the cables, relay or starter. Go to step 4.

**2. Test the acid and the plates (flooded battery).**
- Use a hydrometer on each cell: [Test a battery with a hydrometer and a load check](/moto-zero/repair/repairs/battery-hydrometer-test).
- White powder on the plates seen through the case also points to sulfation.

**3. Charge and test again.**
- Fully charge the battery slowly: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Still fails: replace it: [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace).

**4. Test for lost voltage in the cables.**
- Put the meter between the battery positive and the starter terminal, press start. The reading should be close to zero. A higher reading shows resistance in the cable or joint.
- Do the same on the earth side, between battery negative and the starter body.
- High reading: [Do a voltage drop test](/moto-zero/repair/repairs/voltage-drop-test) and [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean).

**5. Starter relay and starter.**
- [Test the starter relay](/moto-zero/repair/repairs/starter-relay-test) and [Test the starter circuit](/moto-zero/repair/repairs/starter-circuit-test).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Worn or sulfated battery | Good rest voltage, collapses on cranking | [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace) |
| Dirty or loose terminals | Warm joint, reading across the joint | [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean) |
| Weak earth connection | Reading between battery negative and the starter body | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Faulty starter relay or starter | Clicks, or full voltage but no turn | [Test the starter relay](/moto-zero/repair/repairs/starter-relay-test) |
