---
id: horn-test
title: Test the horn
level: home
time: 15 to 30 min
applies_to:
- all
tools:
- digital multimeter
- fused jumper leads
- spanner or socket for horn bolt
- screwdriver
parts:
- horn
- handlebar_switches
- fuse
- wiring
- battery
consumables:
- electrical contact cleaner
fixes:
- horn-silent
- horn-weak
---

# Test the horn

**Home mechanic (basic tools)** · Time: 15 to 30 min (estimate)


The horn is a safety part: in busy traffic it is how other road users know you are there. This test tells you whether the horn itself, its button, its feed or its earth has failed. On many bikes, including the K-Light 125, the horn has a power feed whenever the key is on, and the horn button completes the circuit to earth (PDF p. 46). Some bikes, and most bikes with louder add-on horns, use a horn relay.

## Safety
- The horn is loud. Warn people nearby and protect your ears during bench tests.
- Use jumper leads with an inline fuse. A failed horn can draw a lot of current or short inside.
- Do not ride in traffic without a working horn where the law requires one.

## You need
- A charged battery. A weak battery is the first cause of a weak horn: the K-Light manual uses the indicators as a quick battery check before horn tests (PDF p. 46).
- A multimeter: DC volts (V with a straight line, 20 V range) and continuity (beep or lowest Ω).
- If replacing: a horn of the same voltage (12 V on most bikes) and similar current. A much more powerful horn needs its own relay and fuse; see [Wire an accessory safely](/moto-zero/repair/repairs/accessory-wiring).

## Steps
1. **Quick battery check.** Key on and switch on the indicators. If they are dim or slow, charge the battery first: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
2. **Find the horn.** It is usually behind the front mudguard, under the headlight or on the frame down tube. It has two terminals.
3. **Bench test the horn.** Unplug both wires. Connect one terminal to battery positive and the other to battery negative with fused jumper leads (K-Light 125 method, PDF p. 104).
   - Loud, clear sound: the horn is good. Go to step 5.
   - Weak or croaky sound: go to step 4.
   - Silent: the horn has failed. Replace it.
4. **Adjust or replace.** Many horns have a small adjusting screw at the back, sometimes under a seal. With the horn connected, turn it a little at a time until the sound is clear (K-Light 125, PDF p. 46). If it never sounds clean, or water has got inside, replace it.
5. **Test the feed.** Reconnect nothing yet. Key on. Black probe on frame metal, red probe on each horn wire in the plug. One should show battery voltage.
   - No voltage on either wire: check the fuse ([Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check)), then the wire back to the ignition switch.
   - Voltage present: go to step 6.
6. **Test the button side.** With the key on and the wires plugged back on the horn, join the horn's other (button) terminal to frame metal with a fused jumper. If the horn sounds, the horn and feed are good, and the fault is in the button or the wire to it.
7. **Test the button.** Key off, unplug the left switch connector. On continuity, probe the two horn button wires and press the button: it should beep only while pressed. On the K-Light 125 these are red/white and brown (PDF p. 105). No beep: [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
8. **Horn relay (if fitted).** Follow [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) for the relay test.
9. Refit the horn with its terminals pointing down so water drains out. Tighten the bracket: K-Light 125 horn bolt **10 to 12 N·m** (PDF p. 103).

## Check your work
- The horn sounds loud and clear at idle and with the engine off.
- It stops the moment you release the button.
- The bracket is tight and the horn does not touch the mudguard or forks at full steering lock.

## If it did not fix the problem
- The horn and the indicators are both weak: [Battery goes flat after the bike is parked](/moto-zero/repair/problems/battery-flat).
- The horn works sometimes: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find) and [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- The fuse blows when you press the horn: [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find).

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Horn mounting bolt | 10 to 12 N·m | PDF p. 103 |
| Horn button wires | red/white and brown | PDF p. 105 |

## Problems this repair helps with

- [Horn does not work](/moto-zero/repair/problems/horn-silent)
- [Horn is weak or croaky](/moto-zero/repair/problems/horn-weak)

## Parts for this job

| Part | Buy |
|---|---|
| [Horn](/moto-zero/repair/parts/horn) | [Find this part](/spare-parts/horn) |
| [Handlebar switches](/moto-zero/repair/parts/handlebar_switches) | [Find this part](/spare-parts/handlebar-switches) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |

## Sources

- K-Light 125 manual, PDF p. 46
- K-Light 125 manual, PDF p. 103
- K-Light 125 manual, PDF p. 104
- K-Light 125 manual, PDF p. 105
