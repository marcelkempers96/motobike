---
id: battery-hydrometer-test
title: Test a battery with a hydrometer and a load check
level: home
time: 30 min
applies_to: [all]
tools: [small hydrometer for motorcycle batteries, multimeter, load tester if available, gloves, eye protection]
parts: [battery]
consumables: [distilled water]
fixes: [battery-flat, new-battery-dies, slow-cranking, battery-volts-ok-fails-load]
sources:
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/batteries.htm"}
photos: [{file: "source/dansmc/05_Electrical_Ignition/095/095_lead_sulfate.jpg", caption: "White lead sulfate seen on battery plates"}, {file: "source/dansmc/05_Electrical_Ignition/095/095_tester.jpg", caption: "Battery tester"}, {file: "source/dansmc/05_Electrical_Ignition/095/095_battery_tester.jpg", caption: "Load tester on a battery"}]
---

# Test a battery with a hydrometer and a load check

A battery can show a good voltage and still fail, because voltage only says part of the story. A hydrometer reads the strength of the acid in each cell. A load check shows whether the battery can deliver current. Used together with a voltage reading, they give the fuller picture. This works only on flooded batteries with filler caps. Sealed batteries need a voltage reading and a load or internal resistance check.

## Safety
- Wear gloves and eye protection. Acid burns.
- Keep a mix of baking soda and water close. It neutralises acid spills.
- Do not smoke or use flames near a battery. It gives off explosive gas.

## You need
- A hydrometer small enough to draw from a motorcycle battery cell. A large car one will not work. A small type that draws a small sample is best.
- A multimeter.
- Distilled water.

## Steps
1. Look through the case, if you can. White material on the plates is lead sulfate. A lot of it means the battery is wearing out.
2. Measure battery voltage: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
3. Open the filler caps. Check the acid level covers the plates. If low, top up with distilled water only, then charge so the water mixes in.
4. Draw acid from the first cell into the hydrometer. Read the float. A fully charged cell reads between about 1.26 and 1.28 (specific gravity). Use the chart on your hydrometer for the exact number.
5. Return the acid. Repeat on every cell. Keep a note of each reading.
6. A cell that is clearly lower than the rest means a bad cell. A battery with one dead cell should be replaced.
7. If all cells read low, charge the battery and test again: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
8. Load check: use a load tester made for the battery. Or watch the voltage on the multimeter while the engine is cranked and compare with the value in your bike's manual. If the manual gives none, a voltage that collapses at once on cranking points to a weak battery.
9. Rinse the hydrometer in clean water. Refit the caps firmly.

## Check your work
- You have a voltage reading, a reading for each cell and a load result.
- All caps are tight and the case is dry.

## If it did not fix the problem
- Voltage good, acid good, and the battery still will not crank: the battery may be badly sulfated. Replace it: [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace).
- Battery tests fine but goes flat: [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test).
- Battery does not charge on the bike: [Test the charging system](/moto-zero/repair/repairs/charging-system-test).
