---
id: intermittent-electrical
title: Electrical faults come and go
system: wiring
also_called: [random electrical faults, things work sometimes, electrics cut in and out]
urgency: ride-with-care
applies_to: [all]
parts: [wiring, earth_strap, battery, ignition_switch, handlebar_switches, fuse]
repairs: [battery-terminal-clean, earth-clean, connector-clean, wiring-fault-find, voltage-drop-test, ignition-switch-test, fuse-relay-check]
related: [cuts-out-random, cuts-out-bumps, wet-connectors, headlight-flicker, warning-lights-flicker, ignition-switch-fault]
sources:
  - {doc: "K-Light 125 manual", page: 76}
  - {doc: "K-Light 125 manual", page: 84}
  - {doc: "MAVCC Motorcycle Mechanic", page: 291}
  - {doc: "MAVCC Motorcycle Mechanic", page: 292}
---

# Electrical faults come and go

Something electrical works, then stops, then works again: lights, horn, dashboard, indicators, or even the engine. These faults are hard to find because the bike may work perfectly when you look at it. Almost always the cause is a poor contact that opens under vibration, heat, steering movement or water: a battery terminal, an earth, a connector, a fuse holder, a switch, or a wire broken inside its insulation. The K-Light manual lists loose battery wires and poor contacts as causes of power that comes and goes (PDF p. 76), and poor connectors as the main cause of ignition faults (PDF p. 84).

## Is it safe to ride?
With care, if only minor items are affected. If the engine, headlight or brake light cuts out, do not ride in traffic or at night until it is found.

## Quick checks first
- Write down what fails, and when: bumps, full lock, heat, rain, idle, high revs, after a long ride.
- Do several items fail together? Look for what they share on the wiring diagram.
- Try each battery terminal by hand: any movement?
- Has anything been fitted or repaired recently?
- Does the fault appear when you touch the key? See [Ignition switch is stiff or cuts power](/moto-zero/repair/problems/ignition-switch-fault).

## Diagnose it step by step

**1. Do the items that fail share something?** Use the wiring diagram to find a common fuse, connector, switch or earth. Understanding the complaint and having the diagram are the first steps of systematic fault finding (MAVCC PDF p. 291).
- Many unrelated items: start at the battery terminals and main earth (step 2).
- Items on one circuit: start at that circuit's fuse and connectors (step 4).

**2. Are the battery terminals and main earth tight and clean?** Turn the headlight on. Set the multimeter to DC volts (V with a straight line), 20 V range, with the probes on the battery terminal clamps (not the posts). Wiggle each clamp and the earth cable.
- The reading jumps or the light flickers: [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean) and [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- Steady: go to step 3.

**3. Does the fault appear when you wiggle the key or turn the bars?**
- With the key: [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test).
- At full lock: the harness is broken where it bends at the steering head: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).
- Neither: go to step 4.

**4. Wiggle test.** Turn on the circuit that fails. Gently bend and pull each connector and section of harness on that circuit, one at a time: in the headlight shell, under the tank, under the seat, at the fuse box, at the rear mudguard.
- Fault appears at one place: open that connector and clean it ([Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean)), or repair the wire.
- Nothing found: go to step 5.

**5. Is the fault linked to rain or washing?** See [Electrical faults after rain or washing](/moto-zero/repair/problems/wet-connectors).

**6. Is the fault linked to heat?** A part that fails only when hot (for example after 20 minutes of riding) may be a failing component, such as an ignition coil or relay. Try the fault with the engine hot and use the meter on that part while it fails. Engine cut-outs: [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random).

**7. Still not found?** Measure under load with [Do a voltage drop test](/moto-zero/repair/repairs/voltage-drop-test). A connection that reads fine on continuity can still lose voltage when current flows. Then split the circuit in half and test each half (MAVCC PDF p. 292).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Loose or corroded battery terminal | Reading jumps when wiggled | [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean) |
| Poor earth point | Voltage drop on earth side | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Corroded or loose connector | Fault follows wiggle | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Harness broken at steering head | Fault at full lock | [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find) |
| Worn ignition switch | Fault when key is touched | [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test) |
| Loose fuse in holder | Warm or loose fuse | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
