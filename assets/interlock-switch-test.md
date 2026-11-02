---
id: interlock-switch-test
title: Test the side stand, clutch and neutral switches
level: home
time: 20 to 40 min
applies_to:
- electric-start
- fuel-injected
- carburettor
- semi-auto
- scooter-cvt
tools:
- digital multimeter
- wiring diagram for your bike
- screwdriver
- spanner set
- torch
parts:
- interlock_switches
- side_stand
- levers
- wiring
consumables:
- contact cleaner
- dielectric grease
fixes:
- cdi-ecu-suspect
- cuts-out-bumps
- dies-in-rain
- dies-side-stand
- neutral-light-fault
- no-spark
- side-stand-weak
- start-blocked-interlock
- starter-silent
- starts-then-dies
---

# Test the side stand, clutch and neutral switches

**Home mechanic (basic tools)** · Time: 20 to 40 min (estimate)


Safety switches (interlocks) stop the bike starting or running in a dangerous state. Typical rules: the starter works only in neutral or with the clutch pulled; the engine stops if you select a gear with the side stand down. Scooters usually need a brake lever pulled to start. On the K-Light 125, the starter relay coil reaches earth through the clutch switch or, through a diode, the neutral switch, and the ECU also reads the clutch, neutral and side stand switches (PDF pages 90 and 254). When a switch or its wire fails, the bike will not start, or it cuts out when you engage a gear.

## Safety
- Never cut out or permanently bypass a safety switch. A bike that starts in gear can jump forward, and a stand left down can catch in a corner.
- Key OFF and battery negative disconnected before unplugging switches.
- Put the bike on the centre stand or have a helper hold it while you move the side stand.

## You need
- A multimeter on continuity.
- The wiring diagram showing each switch's wire colours and which way each one works (closed when the stand is up, or closed when it is down; this differs between bikes).

## Steps
1. **Check you are using it right.** Neutral light on, clutch lever pulled fully, side stand up, brake lever pulled on a scooter. Press start. If it now works, the bike is normal.
2. **Clutch switch.** Find the small switch under the clutch lever. Unplug it. Measure across its two terminals: the reading must change between lever pulled and lever released. If not, clean it or replace it. Check the lever's free play too; too much play can stop the lever reaching the switch. See [Adjust clutch lever free play](/moto-zero/repair/repairs/clutch-cable-adjust).
3. **Neutral switch.** It sits on the gearbox, often under the front sprocket cover or on the crankcase. In neutral it should connect its wire to earth; in gear it should not. If the neutral light does not work, see [Test the neutral switch](/moto-zero/repair/repairs/neutral-switch-test).
4. **Side stand switch.** It is on the stand pivot. Clean off mud. Unplug its connector. Measure across the terminals with the stand up and down: the reading must change. A broken or bent stand bracket can stop the switch working. See [Check the side stand](/moto-zero/repair/repairs/side-stand-check).
5. **Wiring.** Look along each switch wire for chafing on the frame or chain, and for wet, green connectors. Clean them: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
6. **Diode (if fitted).** Some bikes have a small diode in the starter circuit, sometimes plugged into the fuse box. Test it with the meter's diode setting: it should conduct one way only.
7. Reconnect, fit any covers, and test again with the key on.

## Check your work
- The starter works in neutral, and in gear only with the clutch pulled (if your bike is made that way).
- With the engine running in neutral and the stand down, selecting first gear stops the engine (if your bike has a side stand cut-out).
- With the stand up, the engine keeps running in gear.

## If it did not fix the problem
- Switches all work but the relay still does not click: [Test the starter relay](/moto-zero/repair/repairs/starter-relay-test).
- Bike cuts out over bumps: a loose side stand switch connector is a common cause. See [Cuts out when riding over bumps](/moto-zero/repair/problems/cuts-out-bumps).

## Problems this repair helps with

- [CDI or ECU suspected faulty](/moto-zero/repair/problems/cdi-ecu-suspect)
- [Cuts out when riding over bumps](/moto-zero/repair/problems/cuts-out-bumps)
- [Misfires or dies in heavy rain](/moto-zero/repair/problems/dies-in-rain)
- [Engine dies when the side stand moves or the bike is put in gear](/moto-zero/repair/problems/dies-side-stand)
- [Neutral light does not work or stays on in gear](/moto-zero/repair/problems/neutral-light-fault)
- [No spark at the spark plug](/moto-zero/repair/problems/no-spark)
- [Side stand spring is weak or the stand is loose](/moto-zero/repair/problems/side-stand-weak)
- [Will not start in gear, on the side stand or without the clutch pulled](/moto-zero/repair/problems/start-blocked-interlock)
- [Nothing happens when I press the starter button](/moto-zero/repair/problems/starter-silent)
- [Engine starts, then dies after a few seconds](/moto-zero/repair/problems/starts-then-dies)

## Parts for this job

| Part | Buy |
|---|---|
| [Side stand, clutch and neutral switches](/moto-zero/repair/parts/interlock_switches) | [Find this part](/spare-parts/interlock-switches) |
| [Side stand and spring](/moto-zero/repair/parts/side_stand) | [Find this part](/spare-parts/side-stand) |
| [Brake and clutch levers](/moto-zero/repair/parts/levers) | [Find this part](/spare-parts/levers) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |

## Sources

- K-Light 125 manual, PDF p. 90
- K-Light 125 manual, PDF p. 93
- K-Light 125 manual, PDF p. 254
