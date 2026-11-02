---
id: starter-silent
title: Nothing happens when I press the starter button
system: starting
also_called: [starter dead, no crank no click, self start not working, button does nothing]
urgency: ride-with-care
applies_to: [electric-start]
parts: [battery, fuse, interlock_switches, handlebar_switches, starter_relay, ignition_switch, earth_strap, wiring, starter]
repairs: [battery-test-charge, battery-terminal-clean, fuse-relay-check, interlock-switch-test, kill-switch-test, starter-relay-test, starter-circuit-test, starter-motor-service, switch-clean]
related: [starter-clicks, start-blocked-interlock, no-power-key-on, battery-flat, kill-switch-fault, slow-cranking, fuse-keeps-blowing]
sources:
  - {doc: "K-Light 125 manual", page: 37}
  - {doc: "K-Light 125 manual", page: 90}
  - {doc: "K-Light 125 manual", page: 92}
  - {doc: "K-Light 125 manual", page: 93}
---

# Nothing happens when I press the starter button

You press the start button and there is no click and no sound. The starter circuit has a small control side (key, fuse, start button, engine stop switch, safety switches, relay coil) and a heavy side (battery, relay contacts, starter motor). Total silence usually means the control side never reached the relay, or the battery is completely flat. Check the free and simple things first.

## Is it safe to ride?
The fault itself is not dangerous. If the bike has a kickstarter and starts with it, you can ride, but get the fault checked: a fuel-injected bike with a flat battery may stop on the road.

## Quick checks first
- Key ON: do the dashboard lights come on?
- Engine stop switch on RUN.
- Gearbox in neutral (neutral light on), or clutch lever pulled fully.
- Side stand up. Scooters: pull a brake lever while pressing start.
- Press the horn: is it loud or weak?

## Diagnose it step by step

**1. With the key ON, do the dashboard lights come on?**
- No: the bike has no power. Go to [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on).
- Yes: go to step 2.

**2. Is the engine stop switch on RUN, the bike in neutral or the clutch pulled, the side stand up (and the brake pulled on a scooter)?**
- No: set them and try again. These are normal safety rules, see [Will not start in gear, on the side stand or without the clutch pulled](/moto-zero/repair/problems/start-blocked-interlock).
- Yes, still silent: go to step 3.

**3. Are the horn and headlight strong, and does the battery read at or above the charged value?**
- No: charge or replace the battery with [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge), and clean the terminals with [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean).
- Yes: go to step 4.

**4. Are the starter fuse and main fuse good?**
- No: replace with the same rating and find why it blew. See [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check). A fuse that blows again: [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing).
- Yes: go to step 5.

**5. Put a finger on the starter relay and press start. Can you feel or hear a click?**
- Yes: the control side works. Go to [Starter relay clicks but the engine does not turn](/moto-zero/repair/problems/starter-clicks).
- No: go to step 6.

**6. Does battery voltage reach the relay coil wire when you press start (clutch pulled, key ON)?**
- No: the fault is in the start button, engine stop switch, key switch or wiring. Use [Test the engine stop switch](/moto-zero/repair/repairs/kill-switch-test) and [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
- Yes: go to step 7.

**7. Does the relay coil have a path to earth through the clutch or neutral switch?**
- No: [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test).
- Yes: the relay coil is faulty. [Test the starter relay](/moto-zero/repair/repairs/starter-relay-test).

Never bridge the relay terminals with a screwdriver to test it. The spark can burn you or light fuel vapour, and the bike can start in gear.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Not in neutral, clutch not pulled, side stand down, stop switch on STOP | Starts once set correctly | [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test) if a switch is faulty |
| Very flat battery or loose terminal | Dim or no dash lights; low voltage | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Blown fuse | Fuse wire broken | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Dirty start button or stop switch | No voltage at relay coil when pressed | [Test the engine stop switch](/moto-zero/repair/repairs/kill-switch-test) |
| Faulty clutch or neutral switch | No earth on relay coil | [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test) |
| Relay coil open | Coil reads open on the meter | [Test the starter relay](/moto-zero/repair/repairs/starter-relay-test) |
| Broken wire or connector | Voltage lost between two points | [Test the starter circuit](/moto-zero/repair/repairs/starter-circuit-test) |
