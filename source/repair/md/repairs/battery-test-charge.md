---
id: battery-test-charge
title: Test and charge a 12 V battery
level: home
time: 15 min to test; charging takes many hours
applies_to:
- electric-start
- kickstart
- fuel-injected
- carburettor
tools:
- digital multimeter
- battery charger that matches the battery type
- screwdriver or spanner for the side cover and terminals
- safety glasses
- gloves
parts:
- battery
consumables:
- distilled water (flooded batteries only)
- baking soda
- terminal grease
fixes:
- abs-light
- all-lights-out
- battery-corrosion
- battery-flat
- battery-swollen
- bulbs-blow-often
- cdi-ecu-suspect
- cuts-out-random
- dash-dead
- dim-lights-idle
- engine-warning-light
- ev-aux-battery-flat
- fuel-pump-noisy
- fuel-pump-silent
- hard-cold-start
- headlight-dim
- horn-silent
- horn-weak
- indicators-dead
- indicators-steady
- kickstart-kickback
- new-battery-dies
- no-power-key-on
- no-spark
- no-start-after-storage
- not-charging
- overcharging
- regulator-hot
- slow-cranking
- starter-clicks
- starter-keeps-running
- starter-silent
- starter-spins-freely
- stator-burnt
- warning-lights-flicker
- weak-spark
---

# Test and charge a 12 V battery

**Home mechanic (basic tools)** · Time: 15 min to test; charging takes many hours (estimate)


This job tells you whether the starter battery is just flat or is worn out, and charges it safely. Do it first whenever the starter is slow or silent, the lights are weak, or the bike has stood for a while. A battery that reads well with no load can still fail when the starter pulls on it, so a good voltage reading is a screening check, not proof.

## Safety
- Wear glasses and gloves. Acid burns. If it gets in your eyes, rinse with clean water for a long time and get medical help.
- A charging battery gives off hydrogen gas, which explodes. Charge in open air, away from flames, cigarettes and sparks. Do not lean over the battery.
- Switch the charger off at the wall before you connect or disconnect the clips.
- Stop at once if the battery gets hot, hisses, swells or smells. Go to [Battery is boiling, swollen or leaking](/moto-zero/repair/problems/battery-swollen).
- A lithium starter battery needs a charger made for lithium. Never use a "repair" or desulphation mode on it.

## You need
- A multimeter on DC volts.
- A charger that matches the battery type (lead acid or lithium). A small smart charger is best; a car charger on a high setting can ruin a small battery.
- The battery label, which shows voltage, capacity in Ah (amp hours) and often the charge rate. K-Light 125: YTX7A-BS, 12 V 6 Ah.

## Steps
1. Switch the key OFF. Leave the bike for **1 hour (K-Light 125)** after riding or charging so the reading settles.
2. Remove the side cover or seat to reach the battery. K-Light 125: left side cover.
3. Put the red meter probe on the positive (+) terminal and the black probe on the negative (−) terminal. Read the voltage.
4. Compare: **fully charged about 13.1 V; needs charging at 12.3 V or below (K-Light 125, at 20 °C)**. Other batteries: use the value on the battery or in your manual.
5. Look at the case. If it is swollen, cracked or leaking, do not charge it. Replace it with [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace).
6. Flooded battery with filler caps only: check each cell is above the lower line. Top up with distilled water only, never tap water or acid.
7. To charge, remove the battery from the bike: undo the negative (−) cable first, then the positive (+). This stops a spanner touching the frame from making a short circuit.
8. Connect the charger red clip to + and black clip to −, then switch the charger on.
9. Charge at the rate on the label. **K-Light 125: 0.6 A for 10 to 15 hours.** The manual allows **6 A for 30 minutes** only in an emergency, with the battery off the bike. Feel the case now and then; if it gets hot, stop.
10. Switch off the charger, remove the clips, and wait **30 minutes (K-Light 125)**.
11. Measure again. **The charge is complete at 12.8 V or more (K-Light 125).**
12. Refit: positive (+) first, negative (−) last. Tighten both terminals and put a thin film of grease on them.

## Check your work
- The voltage stays at or above the "charged" value the next morning.
- The engine cranks at normal speed and the terminals cannot be turned by hand.

## If it did not fix the problem
- Voltage falls again overnight with the key off: [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test).
- Battery charges but goes flat while riding: [Test the charging system](/moto-zero/repair/repairs/charging-system-test).
- Battery will not reach the charged value, or goes flat within a day on the bench: it is worn out (lead acid batteries often last only 2 to 3 years, K-Light 125 manual). Use [Replace a 12 V battery](/moto-zero/repair/repairs/battery-replace).
- Cranking still slow with a good battery: [Engine turns over slowly](/moto-zero/repair/problems/slow-cranking).
- Want to know how full the battery is, not only "good" or "bad": [Read a battery's state of charge from a chart](/moto-zero/repair/repairs/battery-charge-state-read).

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Battery | YTX7A-BS, 12 V 6 Ah | 19, 76 |
| Rest before reading | 1 hour | 59 |
| Fully charged (20 °C) | 13.1 V | 59, 76 |
| Needs charging (20 °C) | 12.3 V | 59, 76 |
| Standard charge | 0.6 A for 10 to 15 h | 59, 76 |
| Quick charge (emergency, off the bike) | 6 A for 30 min | 59, 76 |
| Charge complete, 30 min after charging | 12.8 V or more | 59 |
| Charge a stored battery | about every 3 months | 76 |

## Problems this repair helps with

- [ABS warning light is on](/moto-zero/repair/problems/abs-light)
- [All lights stop working](/moto-zero/repair/problems/all-lights-out)
- [Battery terminals are corroded](/moto-zero/repair/problems/battery-corrosion)
- [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat)
- [Battery is boiling, swollen or leaking](/moto-zero/repair/problems/battery-swollen)
- [Bulbs keep blowing](/moto-zero/repair/problems/bulbs-blow-often)
- [CDI or ECU suspected faulty](/moto-zero/repair/problems/cdi-ecu-suspect)
- [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random)
- [Instruments or dashboard are dead](/moto-zero/repair/problems/dash-dead)
- [Lights go dim at idle](/moto-zero/repair/problems/dim-lights-idle)
- [Engine warning light (check engine, MIL) is on or flashing](/moto-zero/repair/problems/engine-warning-light)
- [Small 12 V battery is flat](/moto-zero/repair/problems/ev-aux-battery-flat)
- [Fuel pump whines loudly or runs all the time](/moto-zero/repair/problems/fuel-pump-noisy)
- [No buzz from the fuel pump when the key is turned on](/moto-zero/repair/problems/fuel-pump-silent)
- [Hard to start when the engine is cold](/moto-zero/repair/problems/hard-cold-start)
- [Headlight is dim](/moto-zero/repair/problems/headlight-dim)
- [Horn does not work](/moto-zero/repair/problems/horn-silent)
- [Horn is weak or croaky](/moto-zero/repair/problems/horn-weak)
- [Indicators do not work](/moto-zero/repair/problems/indicators-dead)
- [Indicators stay on and do not flash](/moto-zero/repair/problems/indicators-steady)
- [Kickstarter kicks back against my foot](/moto-zero/repair/problems/kickstart-kickback)
- [A new battery goes flat quickly](/moto-zero/repair/problems/new-battery-dies)
- [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on)
- [No spark at the spark plug](/moto-zero/repair/problems/no-spark)
- [Will not start after standing for weeks or months](/moto-zero/repair/problems/no-start-after-storage)
- [Battery is not charging while riding](/moto-zero/repair/problems/not-charging)
- [Battery overcharges and bulbs blow](/moto-zero/repair/problems/overcharging)
- [Regulator is very hot or the connector has melted](/moto-zero/repair/problems/regulator-hot)
- [Engine turns over slowly](/moto-zero/repair/problems/slow-cranking)
- [Starter relay clicks but the engine does not turn](/moto-zero/repair/problems/starter-clicks)
- [Starter keeps turning after I let go of the button](/moto-zero/repair/problems/starter-keeps-running)
- [Nothing happens when I press the starter button](/moto-zero/repair/problems/starter-silent)
- [Starter motor whirs but the engine does not turn](/moto-zero/repair/problems/starter-spins-freely)
- [Burnt smell from the generator or a dark stator connector](/moto-zero/repair/problems/stator-burnt)
- [Warning lights flicker or come on wrongly](/moto-zero/repair/problems/warning-lights-flicker)
- [Weak, thin or orange spark](/moto-zero/repair/problems/weak-spark)

## Parts for this job

| Part | Buy |
|---|---|
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |

## Sources

- K-Light 125 manual, PDF p. 19
- K-Light 125 manual, PDF p. 59
- K-Light 125 manual, PDF p. 76
- MAVCC Motorcycle Mechanic, PDF p. 289
- MAVCC Motorcycle Mechanic, PDF p. 290
