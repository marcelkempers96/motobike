---
id: starter-keeps-running
title: Starter keeps turning after I let go of the button
system: starting
also_called: [starter stuck on, starter will not stop, relay stuck, starter runs on]
urgency: stop-now
applies_to: [electric-start]
parts: [starter_relay, handlebar_switches, wiring, battery, starter]
repairs: [starter-relay-test, starter-circuit-test, switch-clean, short-circuit-find, starter-motor-service, battery-test-charge]
related: [starter-grinding, burning-smell-wiring, switch-fault, starter-silent]
sources:
  - {doc: "K-Light 125 manual", page: 90}
  - {doc: "K-Light 125 manual", page: 94}
  - {doc: "K-Light 125 manual", page: 58}
---

# Starter keeps turning after I let go of the button

The starter keeps spinning after you release the button, often with a whine or grinding once the engine runs. The starter motor is meant to run for seconds only. Left running, it overheats within a short time, its cables can melt and catch fire, the battery is drained and the starter gears can be damaged. The usual cause is relay contacts that have welded shut, a start button that sticks, or a wire shorting to the relay coil.

## Is it safe to ride?
No. Stop now. A starter that will not switch off is a fire risk.

## Quick checks first
- Turn the key OFF at once. On most bikes this cuts the relay coil.
- If the starter still runs with the key OFF, the relay contacts are welded. Disconnect the battery negative (−) cable. Use gloves; the cables may be hot. Do not touch the positive terminal and the frame with the same tool.
- Smell for burning and look for smoke. If there is fire, move away and use an extinguisher, not water on fuel.
- Press and release the start button several times: does it spring back?

## Diagnose it step by step

**1. Did the starter stop when you turned the key OFF?**
- Yes: the relay coil is being fed by the button or a wire. Go to step 2.
- No: the relay's heavy contacts are welded together, or the heavy cable is shorting to the starter feed. Go to step 4.

**2. Does the start button spring back freely and does the switch housing stay dry and clean?**
- No: clean or replace the switch. [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
- Yes: go to step 3.

**3. With the relay's small connector unplugged and the key ON, is there voltage on the coil feed wire when the button is NOT pressed?**
- Yes: a wire is shorting to the feed, or the button contacts are stuck. [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find).
- No: the fault is inside the relay. Go to step 4.

**4. Off the bike, do the relay's heavy terminals show continuity with no power on the coil?**
- Yes: the contacts are welded. Replace the relay. [Test the starter relay](/moto-zero/repair/repairs/starter-relay-test).
- No: check the thick cables for damaged insulation where the relay output could touch battery positive. [Test the starter circuit](/moto-zero/repair/repairs/starter-circuit-test).

**5. After the repair, does the starter turn freely and quietly, and the engine crank normally?**
- No: the starter may have overheated or its gears are damaged. [Remove and inspect the starter motor](/moto-zero/repair/repairs/starter-motor-service).
- Yes: charge the battery, it will be very low. See [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).

Why relays weld: long cranking with a weak battery, or a poor connection that makes the contacts arc. Fix the cause or the new relay will fail too.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Welded relay contacts | Starter runs even with key OFF | [Test the starter relay](/moto-zero/repair/repairs/starter-relay-test) |
| Sticking start button | Button stays in; starter stops with key OFF | [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean) |
| Shorted wire to relay coil | Voltage on coil feed with button released | [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find) |
| Damaged heavy cable touching battery feed | Burnt insulation; continuity to positive | [Test the starter circuit](/moto-zero/repair/repairs/starter-circuit-test) |
