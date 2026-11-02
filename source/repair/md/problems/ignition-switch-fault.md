---
id: ignition-switch-fault
title: Ignition switch is stiff or cuts power
system: wiring
also_called: [key switch fault, key hard to turn, power cuts when key is touched, steering lock stuck]
urgency: do-not-ride
applies_to: [all]
parts: [ignition_switch, wiring, fuse, battery]
repairs: [ignition-switch-test, voltage-drop-test, connector-clean, fuse-relay-check, wiring-fault-find]
related: [no-power-key-on, cuts-out-random, cuts-out-bumps, intermittent-electrical, dash-dead]
sources:
  - {doc: "K-Light 125 manual", page: 101}
  - {doc: "K-Light 125 manual", page: 102}
  - {doc: "K-Light 125 manual", page: 278}
---

# Ignition switch is stiff or cuts power

The key is hard to turn or to remove, the steering lock sticks, or the power cuts out when you touch the key, hang a heavy keyring on it, or ride over bumps. The ignition switch has two parts: a mechanical lock and an electrical switch. Dust and rust make the lock stiff. Worn or burnt contacts in the switch, or a loose connector behind it, make the power cut out.

## Is it safe to ride?
If the power cuts out, **no**: the engine, lights and brake light can all stop in traffic. If the key is only stiff and power is steady, you can ride with care, but do not force the key or it may break in the lock.

## Quick checks first
- Is the key bent or worn? Try the spare key.
- Remove heavy keyrings: their weight can turn a worn switch out of the ON position.
- Does the power cut when you wiggle the key in ON?
- Does the power cut when you turn the bars, rather than the key? Then the harness near the steering head is more likely: see [Electrical faults come and go](/moto-zero/repair/problems/intermittent-electrical).
- Does your bike have an immobiliser (a chip key)? Replacement parts may need coding by a dealer.

## Diagnose it step by step

**1. Is the problem only a stiff key or lock?**
- Yes: clean the key and put lock lubricant (graphite or a product made for locks) into the key slot; work the key several times. Do not use oil or grease. If it is still stiff, the lock is worn: replace the switch or have a locksmith service it.
- Power also cuts: go to step 2.

**2. Does the power cut when you wiggle the key?** Turn the headlight on (engine off if your headlight works without the engine). Wiggle the key gently in ON.
- Light flickers or goes out: go to step 3.
- Steady: the fault is elsewhere. Check the switch connector (step 4) and then [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

**3. Does the switch lose voltage?** Find the switch connector, often in the headlight shell or under the tank. Set the multimeter to DC volts (V with a straight line), 20 V range. With the headlight on, put the red probe on the switch feed wire and the black probe on the switch output wire (back-probe both with thin pins). This is a voltage drop test across the switch.
- Close to zero and steady while wiggling the key: the switch is good. Go to step 4.
- A clear reading, or it jumps when you wiggle the key: the contacts are worn or burnt. Replace the switch: [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test).

**4. Is the switch connector loose, wet or burnt?** Key off. Unplug and inspect it.
- Loose pin, corrosion or brown plastic: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean). Brown, melted plastic means the joint was heating: replace the connector.
- Good: go to step 5.

**5. Does the switch pass a continuity test?** Battery negative off, switch unplugged. Meter on continuity (beep). On the K-Light 125, in ON, red/white 1 connects to red, and red/white connects to orange/blue; in OFF and LOCK nothing connects (PDF p. 102). Wiggle the key while probing ON.
- Beep drops out, or connects in the wrong position: replace the switch.
- Good: the cut-out is not the switch. See [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random).

**6. Replacing the switch.** On the K-Light 125 it is held by a mounting bolt (PDF p. 102). On many bikes the switch is fixed with shear-head security bolts that must be drilled out: a workshop job. Bikes with immobilisers need the new switch and keys coded by a dealer.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Dry or dirty lock barrel | Key stiff, power steady | Lock lubricant |
| Worn or burnt switch contacts | Voltage drop across switch, jumps with key | [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test) |
| Loose or corroded switch connector | Visual, flicker when plug moved | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Heavy keyring turning a worn switch | Fault stops without keyring | Remove keyring; replace switch if worn |
| Harness fault near steering head | Fault with bar movement, not key | [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find) |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| ON position connections | red/white 1 to red; red/white to orange/blue | PDF p. 102 |
| OFF and LOCK | no connection | PDF p. 102 |
