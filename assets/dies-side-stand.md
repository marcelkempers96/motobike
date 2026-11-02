---
id: dies-side-stand
title: Engine dies when the side stand moves or the bike is put in gear
system: running
also_called: [kickstand cut-out, dies when selecting first, side stand switch fault]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected, scooter-cvt, semi-auto]
parts: [interlock_switches, side_stand, wiring, clutch_cable, gearbox, ecu, cdi]
repairs: [side-stand-check, interlock-switch-test, neutral-switch-test, clutch-cable-adjust, connector-clean, wiring-fault-find]
related: [start-blocked-interlock, side-stand-weak, neutral-light-fault, cuts-out-bumps, wet-connectors, clutch-drag, stalls-at-idle]
sources:
  - {doc: "K-Light 125 manual", page: 90}
  - {doc: "K-Light 125 manual", page: 254}
  - {doc: "K-Light 125 manual", page: 278}
---

# Engine dies when the side stand moves or the bike is put in gear

Many bikes have a **side stand switch**: a small switch at the stand pivot that tells the ignition (CDI or ECU) whether the stand is up or down. Together with the **neutral switch** and the **clutch switch** it stops you riding off with the stand down. On most bikes, the engine is meant to stop if you select a gear while the stand is down. A fault in this circuit, or a stand that does not fully retract, makes the engine die when it should not, or at random when the switch is jolted.

## Is it safe to ride?

With care. If the stand does not stay fully up, **do not ride**: a stand that drops while cornering can throw the bike over. Never remove or permanently bypass the switch.

## Quick checks first

- Is the side stand fully up, pulled tight against its stop by the spring?
- Is the switch at the pivot covered in mud or loose on its bolt?
- Does it die only when you select a gear, or also in neutral when you touch the stand?
- Is the clutch cable adjusted so the clutch switch closes when you pull the lever?
- Did it start after washing or rain?

## Diagnose it step by step

**1. Does the engine die only when you select a gear with the side stand down?**
- Yes: this is normal. Lift the stand before selecting gear.
- No: go to step 2.

**2. With the stand up, is it held firmly against its stop, and does the stand spring pull it up with force?**
- No: a weak or broken spring, or a worn pivot, lets the stand sag and the switch open. [Check the side stand](/moto-zero/repair/repairs/side-stand-check) and see [Side stand spring is weak](/moto-zero/repair/problems/side-stand-weak).
- Yes: go to step 3.

**3. With the stand up and the engine idling in neutral, tap the switch lightly with a screwdriver handle. Does the engine stutter or stop?**
- Yes: the switch or its connector is faulty. [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test). Clean the connector: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- No: go to step 4.

**4. With the stand up, does it die when you select a gear with the clutch lever pulled?**
- Yes: the ignition believes the stand is down, or the clutch switch is not closing. Check clutch free play first: [Adjust clutch lever free play](/moto-zero/repair/repairs/clutch-cable-adjust). Then test the clutch and stand switches.
- It dies only once you release the clutch: the engine is being pulled down, not cut. See [Clutch drags](/moto-zero/repair/problems/clutch-drag) and [Engine stalls at idle](/moto-zero/repair/problems/stalls-at-idle).
- No: go to step 5.

**5. Does the neutral light work correctly?**
- No, or it flickers in gear: the neutral switch may be confusing the interlock. [Test the neutral switch](/moto-zero/repair/repairs/neutral-switch-test).
- Yes: go to step 6.

**6. Still dying?** Follow the wires from the stand switch along the frame for chafing or a pinched section near the stand and swingarm: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find). On fuel-injected bikes the ECU reads these switches (the K-Light 125 ECU has inputs for clutch, neutral and side stand or tip-over); a workshop can check the live switch states with a scan tool.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Normal interlock (stand down, gear selected) | Only happens with stand down | Lift the stand first |
| Weak stand spring or worn pivot | Stand sags or rattles | [Side stand check](/moto-zero/repair/repairs/side-stand-check) |
| Dirty, wet or loose stand switch | Dies when switch is tapped | [Interlock test](/moto-zero/repair/repairs/interlock-switch-test) |
| Clutch switch not closing | Clutch lever free play too large | [Clutch free play](/moto-zero/repair/repairs/clutch-cable-adjust) |
| Faulty neutral switch | Neutral light wrong | [Neutral switch test](/moto-zero/repair/repairs/neutral-switch-test) |
| Chafed wire near the stand | Visual check, continuity | [Wiring fault find](/moto-zero/repair/repairs/wiring-fault-find) |
