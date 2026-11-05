---
id: engine-stuck-check
title: Find out why the engine will not turn over
level: home
time: 30 to 60 min
applies_to: [four-stroke, two-stroke, kickstart, electric-start]
tools: [socket or spanner for the crank end nut, penetrating oil, plug spanner, battery charger or good battery]
parts: [starter, starter_clutch, kickstarter, gearbox, piston, piston_rings, cylinder, engine]
consumables: [penetrating oil]
fixes: [engine-seized, starter-silent, kickstart-jammed, starter-spins-freely, starter-clicks]
photos: [{file: "source/dansmc/01_Basics_Tools_Manuals/013/013_compression_gauge.jpg", caption: "Compression gauge fitted in the plug hole"}]
sources:
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/troubleshooting2.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/troubleshooting.htm"}
---

# Find out why the engine will not turn over

When the starter does nothing, or the kickstarter will not move, the cause is one of four: the battery or starter circuit, the starter drive gears, the gearbox, or the engine itself. These checks separate them without taking the engine apart.

## Safety
- Engine off, key out, plug lead off while you turn the engine by hand.
- Do not force a seized engine with the starter. You can burn the starter or break gears.
- Disconnect a faulty battery. Use a separate charged battery of the same voltage if you must test.

## You need
- Spanner or socket to fit the nut or bolt on the end of the crankshaft (under the flywheel cover on many bikes). Check the size on your bike.
- Penetrating oil.
- A charged battery and jump leads, for the electric-start check.
- Plug spanner.

## Steps
1. **Electric start: click only.** The starter relay clicks but the starter does not turn. Check the battery is charged: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge). If it is charged, continue with [Test the starter circuit](/moto-zero/repair/repairs/starter-circuit-test). A bypass of the relay with a thick lead is a workshop test. It makes a large spark.
2. **Starter turns but the engine does not.** The starter drive gears or the starter clutch is at fault: [Check the starter clutch](/moto-zero/repair/repairs/starter-clutch-check).
3. **Kickstarter will not move.** Put the gearbox in neutral. If it has a high gear, select it and push the bike gently on its wheels. If the engine turns when pushed, the kickstart gears are at fault: [Check the kickstart mechanism](/moto-zero/repair/repairs/kickstart-check).
4. **Check by hand at the crank.** Remove the plug and the flywheel cover. Put a spanner on the crank end nut. With the gearbox in neutral, turn the crank slowly.
   - Turns: the problem is in the gears or starter, not the engine. Go back to steps 1 to 3.
   - Does not turn, even by hand: the engine is stuck. Go to step 5.
5. **Stuck engine.** The common cause is rust between the piston, rings and cylinder after long standing. Pour a little penetrating oil through the plug hole and leave it for some hours, or overnight. Turn the crank with the spanner gently, back and forth. Do not use the starter.
6. **If it comes free,** turn it over by hand many times, with the plug out and the lead off, until it moves easily. Then check compression: [Test engine compression](/moto-zero/repair/repairs/compression-test).
7. **If it will not come free,** or it frees but feels rough, the engine needs the top end opened: [Assess the top end (cylinder, piston, valves)](/moto-zero/repair/repairs/top-end-assessment). A worn bore will need a new piston and rings, and often boring. A four-stroke also needs the valves checked.

## Check your work
- You know which of the four causes it is and have written it down.
- If the engine turns by hand, it turns freely with no tight spot. If you freed it with oil, compression is acceptable.

## If it did not fix the problem
- Engine locked after running, with a bang or a squeal: [Engine has seized or locked up](/moto-zero/repair/problems/engine-seized) and [Assess bottom end and internal engine damage](/moto-zero/repair/repairs/engine-internal-assessment).
