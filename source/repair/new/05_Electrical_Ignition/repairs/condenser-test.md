---
id: condenser-test
title: Test an ignition condenser
level: home
time: 15 min
applies_to: [four-stroke, two-stroke, kickstart]
tools: [12 V battery with leads, insulated test wire, screwdriver, soldering iron if the condenser is soldered]
parts: [ignition_coil, stator]
consumables: [new condenser of the correct rating]
fixes: [points-wear-misfire, no-spark, weak-spark, misfire-high-rpm]
sources:
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/bat_coil_ign.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/magneto1.htm"}
photos: [{file: "source/dansmc/05_Electrical_Ignition/091/091_condensers.jpg", caption: "Ignition condensers"}, {file: "source/dansmc/05_Electrical_Ignition/091/091_points_condenser_cdi_box.jpg", caption: "Points, condenser and electronic ignition box compared"}]
---

# Test an ignition condenser

A condenser (capacitor) sits across the contact breaker points and stops them arcing when they open. A bad condenser makes the points burn and the engine miss. Condensers fail much less often than points, so test before you replace.

## Safety
- The condenser holds a charge. Touch the leads together only on the insulated wire, with eye protection on.
- Do not use a mains-voltage test. Use a 12 V battery only.
- Keep petrol away from sparks.

## You need
- A 12 V battery (or a 6 V battery for a 6 V bike).
- Two short insulated wires.
- A new condenser rated for your model, if the test fails.

## Steps
1. Find the condenser. It is often a small metal can near the points, but it may be on a wire further away, even under the tank.
2. Disconnect it from the points wire. If it is soldered to the points wire, unsolder it and join a temporary wire on.
3. Clip the battery negative (-) to the metal can of the condenser.
4. Touch the battery positive (+) to the pigtail wire for a few seconds. This charges the condenser.
5. Disconnect the pigtail from the battery, then touch it to the metal can.
6. A fat, sharp spark means the condenser holds a charge. A weak spark or none means it has failed.
7. If the condenser has two leads, one goes to earth and one to the points. Charge it across the two leads, then touch them together. If both leads are the same colour, either way works.
8. Reconnect or replace. Use the correct size: the size is matched to the points. If the build-up of metal is on the fixed contact, the condenser is too large; if it is on the moving contact, too small. These notes help you pick a replacement.

## Check your work
- A good condenser gives a clear spark on the discharge test.
- Wire joints are clean and tight, and nothing touches the frame.
- After refitting, the points faces stay clean after a test run.

## If it did not fix the problem
- Points burn again: [Inspect, clean and replace contact breaker points](/moto-zero/repair/repairs/contact-points-replace).
- Still weak spark: [Test the ignition coil and plug cap](/moto-zero/repair/repairs/ignition-coil-test).
