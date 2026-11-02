---
id: neutral-light-fault
title: Neutral light does not work or stays on in gear
system: gearbox
also_called: [N light not working, green light stays on, neutral indicator fault]
urgency: ok-to-ride
applies_to: [four-stroke, two-stroke, semi-auto]
parts: [interlock_switches, wiring, instruments, fuse]
repairs: [neutral-switch-test, dash-power-check, bulb-replace, connector-clean, wiring-fault-find, interlock-switch-test]
related: [start-blocked-interlock, dies-side-stand, dash-dead, intermittent-electrical, wet-connectors, hard-to-find-neutral]
sources:
  - {doc: "K-Light 125 manual", page: 90}
  - {doc: "K-Light 125 manual", page: 237}
  - {doc: "K-Light 125 manual", page: 254}
  - {doc: "K-Light 125 manual", page: 278}
---

# Neutral light does not work or stays on in gear

The green "N" light should come on only in neutral with the key on. If it never comes on, you cannot be sure you are in neutral. If it stays on in gear, the bike may think it is in neutral. That matters because on many bikes, including the K-Light 125, the neutral switch also feeds the start safety system and the engine computer (ECU). A faulty switch or wire can stop the bike starting, or make the engine cut out when you put it in gear with the side stand down.

## Is it safe to ride?
Yes, if the bike starts and runs normally. Check by rocking the bike that it really is in neutral before you start it, and keep the clutch pulled when starting.

## Quick checks first
- Key on: do the other dash lights work?
- Rock the bike with the clutch out. If it rolls freely, it is in neutral.
- Look at the wire going to the switch on the engine for damage or a loose connector.
- Did the problem start after washing or rain?

## Diagnose it step by step

**1. Key on: are all dash lights dead?**
- Yes: the dash has no power. Go to [Instruments or dashboard are dead](/moto-zero/repair/problems/dash-dead).
- No: go to step 2.

**2. Light never comes on, even when the bike rolls freely in neutral?**
- Yes: on bulb-type dashes, check the bulb first ([Replace a bulb](/moto-zero/repair/repairs/bulb-replace)). Then [Test the neutral switch](/moto-zero/repair/repairs/neutral-switch-test).
- No, it comes on in gear: go to step 3.

**3. Light stays on in gear?**
- Unplug the switch wire at the engine with the key on. Light goes out: the switch is shorted inside; replace it ([Test the neutral switch](/moto-zero/repair/repairs/neutral-switch-test)).
- Light stays on with the wire unplugged: the wire is touching metal somewhere between switch and dash. [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

**4. Light flickers or works only sometimes, especially after rain?**
- [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean); see [Electrical faults come and go](/moto-zero/repair/problems/intermittent-electrical) and [Electrical faults after rain or washing](/moto-zero/repair/problems/wet-connectors).

**5. After the repair, does the start safety system work correctly?**
- Check the bike starts in neutral and does not start in gear without the clutch pulled (if your bike has that feature): [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test).
- If the engine dies when you select a gear: [Engine dies when the side stand moves or the bike is put in gear](/moto-zero/repair/problems/dies-side-stand).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Dirty or wet connector | Fault comes and goes, after rain | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Blown bulb (older dashes) | Bulb dark, others work | [Replace a bulb](/moto-zero/repair/repairs/bulb-replace) |
| Faulty neutral switch | Meter test fails | [Test the neutral switch](/moto-zero/repair/repairs/neutral-switch-test) |
| Chafed wire touching metal | Light on with switch unplugged | [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find) |
| Dash or fuse fault | No dash lights at all | [Check power to the instruments](/moto-zero/repair/repairs/dash-power-check) |
