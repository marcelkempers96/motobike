---
id: starter-generator-test
title: Test a starter-generator (dynamo) on an older small bike
level: workshop
time: 1 to 2 h (estimate)
applies_to: [electric-start, two-stroke, four-stroke]
tools: [multimeter (volts and ohms), test light, jumper wire with clips, fine abrasive paper, hacksaw blade for undercutting, shop manual with wiring diagram]
parts: [starter_generator, starter_brushes, regulator, battery, wiring]
consumables: [contact cleaner]
fixes: [starter-generator-fault, not-charging, starter-silent, slow-cranking, overcharging]
sources:
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/genstarter.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/electricaltesting.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/electric_starters.htm"}
---

# Test a starter-generator (dynamo) on an older small bike

Some small two-stroke and four-stroke bikes from the 1960s and 1970s have one unit on the end of the crankshaft that is both the electric starter and the generator. It is called a starter-generator, starter-dynamo or dynamo. It makes direct current, so there is no rectifier; a mechanical regulator box with contact points controls the output and switches the unit between starting and charging. The ignition points are often mounted on the same unit. This page gives the general test order. The terminal letters, wire colours and test values differ by maker, so you need the manual and wiring diagram for your bike.

## Safety
- Disconnect the battery before you touch the regulator box or remove the unit cover. Never adjust the regulator with the battery connected.
- The output test runs the engine. Keep hands, leads and clothing away from the spinning armature. Keep the revs moderate and the test short: a generator working without its regulator can make enough voltage to burn coils and bulbs.
- Carbon dust from the brushes is a conductor. Do not blow it into your face; wipe it out.

## You need
- The shop manual: wiring diagram, terminal names on the regulator, field coil resistance and output values.
- A fully charged battery. This system will not start or test properly with a weak one.
- A multimeter, a jumper wire and a test light.

## Steps
1. **Battery and wires first.** Charge the battery and test it: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge). Clean and tighten every connection and the earth points: [Clean an earth connection](/moto-zero/repair/repairs/earth-clean).
2. **Starting does not work.** Listen for the relay (often inside the regulator box) when you press the button. No click: check the button, fuse and wiring with a test light. Click but no turn: go to the brushes (step 5).
3. **Decide: generator or regulator?** Following the manual, disconnect the generator output and field wires from the regulator. Connect the field terminal to earth (or as the manual shows), so the generator works at full output. Connect a voltmeter from the output wire to earth.
4. Start the engine (kick if needed) and raise the revs a little, to the speed the manual names, for a few seconds only. The voltage should rise clearly above battery voltage. If it does, the generator is good and the regulator is suspect. If it stays low or at zero, the generator is at fault. Stop the engine and reconnect the wires.
5. **Brushes.** Remove the cover. Clean out carbon dust. Each brush must move freely in its holder, press firmly on the commutator, and touch at least most of its face. Replace brushes that are short, chipped or oil-soaked: see [Starter motor brushes](/moto-zero/repair/parts/starter_brushes). Check the insulated brush holder is not shorted to earth.
6. **Commutator.** Clean a dull or burnt commutator with fine abrasive paper while turning the engine by hand. If the insulation between segments is level with the copper, scrape it slightly below the surface with a ground-down hacksaw blade, then clean the dust out. A deeply worn or out of round commutator needs turning in a lathe by a workshop.
7. **Field coils.** There are two windings: a series winding for starting and a shunt (parallel) winding for charging. Measure each one between its terminals and compare with the manual. Then measure from each terminal to the body on the highest ohms range: there must be no continuity. A reading to the body means a shorted winding.
8. **Armature.** Check continuity between commutator segments (all should connect) and from the segments to the shaft (none should). Continuity to the shaft means a shorted armature.
9. **Regulator.** If the generator passed step 4, look at the regulator contact points. Clean light pitting with a contact file or paper and contact cleaner. The voltage setting is changed by bending a spring arm; only do this with the manual's values and test method.
10. Reconnect everything, refit the cover and run the engine with a voltmeter across the battery. The voltage should rise with revs and then stay steady, not keep climbing.

## Check your work
- The engine starts on the button and the battery voltage rises when the engine runs above idle.
- Voltage does not keep rising with revs (no overcharging).
- No wire was left disconnected or shorting on the case.

## If it did not fix the problem
- Parts are often scarce for these bikes. Weigh the cost against the value of the bike. On some models the kickstart magneto version used the same crankshaft, so a magneto conversion from a donor bike is an option a workshop may suggest.
- Battery charges but goes flat while parked: [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test).
- Back to the symptom page: [Starter-generator bike will not start on the button or will not charge](/moto-zero/repair/problems/starter-generator-fault).
