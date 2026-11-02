---
id: brake-switch-test
title: Test and adjust the brake light switches
level: home
time: 15 to 30 min
applies_to:
- all
tools:
- digital multimeter
- screwdrivers
- small spanners
- fused jumper lead
parts:
- brake_light_switch
- tail_light
- levers
- wiring
- fuse
consumables:
- electrical contact cleaner
fixes:
- battery-flat
- brake-light-dead
- brake-light-stuck-on
- ev-no-ready
- ev-no-regen
- ev-ready-no-drive
- lever-damaged
- parasitic-drain
- pedal-stiff
---

# Test and adjust the brake light switches

**Home mechanic (basic tools)** · Time: 15 to 30 min (estimate)


Most bikes have two brake light switches: one at the front lever and one worked by the rear pedal. Either should turn the brake light on. A switch that does not close leaves traffic behind without warning; one that stays closed keeps the light on and can flatten the battery. This job tests both and adjusts the rear one.

## Safety
- Test brakes, not just the light, before you ride. If the lever or pedal feels wrong, stop and see [Brake lever or pedal feels spongy](/moto-zero/repair/problems/spongy-brake).
- Put the bike on its centre stand so it cannot roll or fall.
- Some rear switches are **hydraulic pressure switches** screwed into the brake line or a brake union. They cannot be adjusted. Removing one opens the brake system and lets air in, so the brakes must be bled afterwards ([Replace brake fluid and bleed the brakes](/moto-zero/repair/repairs/brake-bleed)). If you are not sure how to bleed, leave this to a workshop.
- Any jumper wire must have an inline fuse.

## You need
- A multimeter set to continuity (beep or lowest Ω) and DC volts (V with a straight line, 20 V range).
- If a switch is broken: the replacement switch for your model. Front lever switches are often a small plunger switch clipped or screwed under the lever. Rear switches on most pedal-operated systems have a spring linked to the pedal.

## Steps
1. **Check the lamp works.** Turn the key on. Pull the front lever, then press the rear pedal. If the tail light works but the brake light does not come on with either, check the bulb first: [Replace a bulb](/moto-zero/repair/repairs/bulb-replace). The brake filament is the brighter one in a twin bulb.
2. **Check the switch point (K-Light 125).** The K-Light manual says the brake light should come on when the front lever has moved about **15 mm** (PDF p. 67). Other bikes: check your manual. As a general rule the light should come on just as the brake starts to work, before the brake bites hard.
3. **Test each switch with the meter.** Key off. Unplug the switch (usually two wires). Set the meter to continuity and touch one probe to each switch terminal.
   - Lever or pedal released: no beep (open).
   - Lever pulled or pedal pressed: beep (closed).
   - Beeps all the time: the switch is stuck closed, or (for the front) the lever is not returning fully. This is the usual cause of a brake light that stays on.
   - Never beeps: the switch has failed or is out of adjustment.
   On the K-Light 125 the front switch wires are purple and red/white (PDF p. 105).
4. **Test for power at the switch.** Plug the switch back in. Key on. Meter on DC volts, black probe on frame metal, red probe back-probed into each switch wire. One wire should show battery voltage all the time with the key on (the feed). The other should show battery voltage only while the brake is applied. No feed at all: the fuse or feed wire is at fault; see [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
5. **Adjust a rear mechanical switch.** Hold the switch body and turn its adjusting nut (or move its bracket) so the switch body moves up or down. Moving it so the spring pulls sooner makes the light come on earlier. Do not turn the whole switch with the wires attached, or the wires twist and break.
6. **Front switch.** Most are not adjustable. Clean the plunger and the lever where it touches the plunger. Check the lever returns fully on its own; a bent or sticky lever holds the switch closed: [Service brake and clutch lever pivots](/moto-zero/repair/repairs/lever-service). Replace a faulty switch.
7. **Bypass test if still unsure.** Key on, switch unplugged, join its two plug terminals with a fused jumper. The brake light should come on. If it does, the switch is bad. If not, the fault is in the wire from the switch to the lamp or in the lamp earth: see [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test).

## Check your work
- The light comes on with each control on its own, just as the brake starts to work.
- It goes off as soon as you release the lever and pedal.
- Brakes work normally and the rear brake does not drag after adjustment.

## If it did not fix the problem
- Brake light dead with good switches: [Brake light does not work](/moto-zero/repair/problems/brake-light-dead).
- Light stays on with switches open: [Brake light stays on](/moto-zero/repair/problems/brake-light-stuck-on).

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Brake light comes on at front lever travel of | about 15 mm | PDF p. 67 |

## Problems this repair helps with

- [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat)
- [Brake light does not work](/moto-zero/repair/problems/brake-light-dead)
- [Brake light stays on](/moto-zero/repair/problems/brake-light-stuck-on)
- [Dashboard is on but the bike will not go to ready](/moto-zero/repair/problems/ev-no-ready)
- [Regenerative braking does not work](/moto-zero/repair/problems/ev-no-regen)
- [Bike shows ready but will not move](/moto-zero/repair/problems/ev-ready-no-drive)
- [Brake or clutch lever is loose, bent or broken](/moto-zero/repair/problems/lever-damaged)
- [Something drains the battery with the key off](/moto-zero/repair/problems/parasitic-drain)
- [Foot pedal or footpeg is stiff, bent or loose](/moto-zero/repair/problems/pedal-stiff)

## Parts for this job

| Part | Buy |
|---|---|
| [Brake light switches](/moto-zero/repair/parts/brake_light_switch) | [Find this part](/spare-parts/brake-light-switch) |
| [Tail and brake light](/moto-zero/repair/parts/tail_light) | [Find this part](/spare-parts/tail-light) |
| [Brake and clutch levers](/moto-zero/repair/parts/levers) | [Find this part](/spare-parts/levers) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |

## Sources

- K-Light 125 manual, PDF p. 47
- K-Light 125 manual, PDF p. 67
- K-Light 125 manual, PDF p. 105
- MAVCC Motorcycle Mechanic, PDF p. 295
- MAVCC Motorcycle Mechanic, PDF p. 315
- MAVCC Motorcycle Mechanic, PDF p. 316
