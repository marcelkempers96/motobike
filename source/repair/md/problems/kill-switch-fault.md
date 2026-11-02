---
id: kill-switch-fault
title: Engine stop switch fault
system: ignition
also_called: [kill switch not working, run stop switch fault, engine won't stop with switch, cut off switch faulty]
urgency: do-not-ride
applies_to: [all]
parts: [handlebar_switches, wiring, ignition_switch]
repairs: [kill-switch-test, switch-clean, connector-clean, wiring-fault-find, ignition-switch-test]
related: [no-spark, starter-silent, cuts-out-bumps, switch-fault, ignition-switch-fault]
sources:
  - {doc: "K-Light 125 manual", page: 86}
  - {doc: "K-Light 125 manual", page: 90}
  - {doc: "K-Light 125 manual", page: 105}
---

# Engine stop switch fault

The engine stop switch (kill switch) is the red rocker or slide on the right handlebar marked RUN and STOP. It lets you stop the engine without taking your hand off the bar, for example after a fall. There are two kinds of fault: the switch is on RUN but the engine will not start, has no spark or cuts out over bumps; or the switch is on STOP but the engine keeps running. On the K-Light 125 the switch is also in the starter circuit, so a fault can stop the starter too (PDF page 90).

## Is it safe to ride?
No, if the switch does not stop the engine: you cannot shut it down quickly in an emergency. Use the key to stop it and repair the switch first. If it cuts out over bumps, do not ride in traffic.

## Quick checks first
- Is the switch really in RUN? It can be knocked to STOP by a jacket sleeve or a fall.
- Flick it between STOP and RUN several times.
- Was the bike washed or ridden in heavy rain recently?
- Has the handlebar or switch housing been knocked or removed?

## Diagnose it step by step

**1. Does the engine keep running when you put the switch to STOP?**
- Yes: the switch contacts are stuck or a wire bypasses the switch. Stop the engine with the key. Go to step 5.
- No: go to step 2.

**2. With the switch on RUN, does the engine start (or is there a spark)?**
- No: go to step 3.
- Yes, but it cuts out over bumps or when you turn the bars: go to step 4.

**3. Does the switch show continuity in RUN and none in STOP? (K-Light 125: green to dark green)**
- No: clean or replace the switch. [Test the engine stop switch](/moto-zero/repair/repairs/kill-switch-test), [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
- Yes: the switch is fine. Check the key switch ([Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test)) and go to [No spark at the spark plug](/moto-zero/repair/problems/no-spark).

**4. Watching a meter across the switch wires, does the reading flicker when you wiggle the switch or turn the handlebar?**
- Yes: a broken wire near the bar or a loose connector. [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) and [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).
- No: the cut-out is elsewhere. See [Cuts out when riding over bumps](/moto-zero/repair/problems/cuts-out-bumps).

**5. With the switch on STOP, does the switch still show continuity?**
- Yes: the switch is stuck. Replace it.
- No: a wire is shorted around the switch, or the ignition does not use this switch circuit on your bike. Check the wiring diagram. [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Switch left on STOP | Look at the switch | Set to RUN |
| Dirty or wet contacts | Reading flickers; works after cleaning | [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean) |
| Broken wire at the handlebar | Reading changes when the bar turns | [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find) |
| Corroded connector | Green pins | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Broken switch | No continuity in RUN or stuck closed | [Test the engine stop switch](/moto-zero/repair/repairs/kill-switch-test) |

## Reference values (K-Light 125)
| Item | Value | PDF page |
|---|---|---|
| Stop switch, RUN | green to dark green: continuity | 105 |
| Stop switch, STOP | open | 105 |
