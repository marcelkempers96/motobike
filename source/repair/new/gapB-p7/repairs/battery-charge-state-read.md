---
id: battery-charge-state-read
title: Read a battery's state of charge from a chart
level: home
time: 1 hour 15 min (mostly waiting for the battery to rest)
applies_to: [all]
tools: [digital multimeter, small battery hydrometer for flooded batteries, state-of-charge chart from the battery maker, gloves, eye protection]
parts: [battery, battery_charger]
consumables: [distilled water (flooded batteries only)]
fixes: [battery-flat, new-battery-dies, slow-cranking, no-start-after-storage, battery-volts-ok-fails-load]
sources:
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/batteries.htm"}
  - {doc: "K-Light 125 manual", page: 59}
---

# Read a battery's state of charge from a chart

A state-of-charge chart turns a voltage reading (or a hydrometer reading) into "how full is this battery". It is a quick way to decide whether a battery only needs charging, or whether it is being left flat often enough to damage it. Battery makers print these charts in their hand-outs. The chart only works if the battery has rested with no load and no charge, and if you use the chart for your battery type.

## Safety
- Wear gloves and eye protection. Acid burns.
- Do not smoke or make sparks near a battery that has just been charged. It gives off gas that can explode.
- Do not charge or test a battery that is frozen, swollen or cracked.

## You need
- A digital multimeter on DC volts. A needle meter is not exact enough; the steps on the chart are small.
- The state-of-charge chart for your battery type: flooded (with filler caps), sealed AGM or gel, or lithium. They are different.
- A small hydrometer for flooded batteries only.

## Steps
1. Switch off the key and leave the battery to rest. Wait at least **1 hour (K-Light 125)** after riding or charging. Readings taken straight after charging are too high.
2. Measure across the terminals: red probe on +, black probe on −. Write down the reading to two decimal places.
3. Find the row on the chart closest to your reading. Read across to the state of charge in percent.
4. Read the chart as steps, not as a cliff. On a typical flooded battery chart, each drop of about 0.2 V at rest means about a quarter of the charge has gone. A battery that has lost only a few tenths of a volt can be half empty.
5. **Flooded battery:** check with the hydrometer as well, cell by cell: [Test a battery with a hydrometer and a load check](/moto-zero/repair/repairs/battery-hydrometer-test). The same chart usually gives a specific gravity column. The voltage and the specific gravity should point to the same row. If one cell is much lower than the others, that cell is failing.
6. **Sealed or lithium battery:** use the voltage only, with that maker's chart. A sealed battery reads higher when full than a flooded one. K-Light 125 (sealed YTX7A-BS): **full about 13.1 V, needs charging at 12.3 V or below**.
7. Decide:
   - Above about three quarters: the battery is fine. If it still will not crank, do a load test.
   - About half or below: charge it now: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
   - At the bottom of the chart: charge it, then test again the next day. A battery that is left flat grows hard lead sulfate on its plates and may never recover.
8. Look at the freeze column if the chart has one. A flat battery freezes at a much warmer temperature than a full one. A frozen battery can crack. In cold weather keep stored batteries charged.
9. Write the date and reading on a label on the battery. Comparing readings week by week shows a drain or a weak battery early.

## Check your work
- The reading was taken after a proper rest, with the right chart for the battery type.
- Voltage and hydrometer (if used) agree within one row.

## If it did not fix the problem
- Battery reads full but cranks slowly: [Battery shows good volts but fails under load](/moto-zero/repair/problems/battery-volts-ok-fails-load).
- Reading falls again a day after charging: [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test).
- Reading is low after every ride: [Test the charging system](/moto-zero/repair/repairs/charging-system-test).

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Rest before reading | 1 hour | 59 |
| Fully charged (20 °C) | 13.1 V | 59 |
| Needs charging (20 °C) | 12.3 V | 59 |
