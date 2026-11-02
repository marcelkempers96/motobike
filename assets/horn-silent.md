---
id: horn-silent
title: Horn does not work
system: lighting
also_called: [no horn, horn dead, hooter not working]
urgency: ride-with-care
applies_to: [all]
parts: [horn, handlebar_switches, fuse, wiring, battery]
repairs: [horn-test, battery-test-charge, fuse-relay-check, switch-clean, connector-clean, short-circuit-find, lighting-circuit-test]
related: [horn-weak, battery-flat, switch-fault, indicators-dead, fuse-keeps-blowing]
sources:
  - {doc: "K-Light 125 manual", page: 46}
  - {doc: "K-Light 125 manual", page: 104}
  - {doc: "K-Light 125 manual", page: 105}
---

# Horn does not work

Nothing happens when you press the horn button. The horn may have failed (water and rust inside are common), or the problem is the button, the fuse, the battery or a broken wire. On many bikes, including the K-Light 125, the horn has power whenever the key is on, and the button connects its second terminal to earth (PDF p. 46). Knowing this makes the fault easy to find.

## Is it safe to ride?
With care. In many places the horn is a legal requirement and a key way to warn others. Fix it soon, and ride more defensively until then.

## Quick checks first
- Key on? Most horns only work with the key on.
- Do the indicators work and are they bright? The K-Light chart uses this to check the battery first (PDF p. 46).
- Do other items on the same fuse work?
- Has the bike been washed with a pressure washer, or ridden through deep water?
- Has the horn been changed for a louder one? A bigger horn may need a relay.

## Diagnose it step by step

**1. Are the indicators bright and is the battery good?**
- No: charge and test the battery: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Yes: go to step 2.

**2. Does the horn sound when connected straight to the battery?** Unplug both horn wires. Use fused jumper leads to connect the horn's terminals to battery positive and negative (the K-Light method, PDF p. 104). Protect your ears.
- Silent: the horn has failed. Try its adjusting screw (see [Test the horn](/moto-zero/repair/repairs/horn-test)); if it stays silent, replace it.
- Sounds: the horn is good. Go to step 3.

**3. Is there power at the horn plug?** Key on. Set the multimeter to DC volts (V with a straight line, 20 V range). Black probe on frame metal, red probe on each horn wire in turn.
- One wire shows close to battery voltage: power is reaching the horn. Go to step 4.
- Neither: check the fuse ([Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check)). If the fuse is good, the feed wire from the ignition switch is broken.

**4. Does the horn sound when its button wire is earthed?** Reconnect the horn. With the key on, join the horn's other terminal (the one going to the button) to bare frame metal with a fused jumper lead.
- Horn sounds: the button or its wire is faulty. Go to step 5.
- Silent: the horn plug or terminals are corroded. Clean them: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).

**5. Does the horn button close?** Key off. Unplug the left switch connector. Meter on continuity (beep). Probe the horn button wires and press the button. On the K-Light 125 these are red/white and brown (PDF p. 105).
- No beep, or only sometimes: [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
- Beeps: the wire between the button and the horn is broken. Follow it with [Test a lighting circuit](/moto-zero/repair/repairs/lighting-circuit-test) step 8.

**6. Fuse blows when you press the horn?** The horn or its wire is shorted. Do not keep replacing fuses: [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Horn failed (water, rust, burnt coil) | Silent on direct battery test | [Test the horn](/moto-zero/repair/repairs/horn-test) |
| Corroded horn terminals | Horn works on bench, not on bike | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Dirty horn button | No continuity when pressed | [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean) |
| Blown fuse | Meter test | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Flat battery | Indicators dim | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Broken wire or failed horn relay | No power at horn or button | [Test the horn](/moto-zero/repair/repairs/horn-test) |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Horn button wires | red/white and brown | PDF p. 105 |
