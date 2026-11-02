---
id: fuse-keeps-blowing
title: Fuse keeps blowing
system: wiring
also_called: [fuse blows again, main fuse burns out, repeated blown fuse]
urgency: do-not-ride
applies_to: [all]
parts: [fuse, wiring, regulator, tail_light, brake_light_switch, horn, starter_relay]
repairs: [fuse-relay-check, short-circuit-find, accessory-wiring, wiring-fault-find, regulator-test, connector-clean]
related: [burning-smell-wiring, accessory-wiring-fault, all-lights-out, no-power-key-on, regulator-hot, battery-swollen]
sources:
  - {doc: "K-Light 125 manual", page: 74}
  - {doc: "K-Light 125 manual", page: 278}
  - {doc: "MAVCC Motorcycle Mechanic", page: 292}
  - {doc: "MAVCC Motorcycle Mechanic", page: 313}
  - {doc: "Unit 2 The Motorcycle", page: 33}
---

# Fuse keeps blowing

You fit a new fuse and it blows again, at once or after a while. A fuse is a thin metal link that melts when too much current flows, to stop the wire overheating (Unit 2, PDF p. 33). So a fuse that keeps blowing is doing its job: something is drawing too much current. Usually a wire has rubbed through to the frame, an accessory was wired badly, a lamp or horn has shorted inside, or the wrong fuse rating was fitted.

## Is it safe to ride?
No. A short circuit can burn the harness and start a fire. Depending on which fuse it is, you may also lose lights, ignition or the fuel pump while riding. Never fit a bigger fuse, a wire, foil or a nail to stop it blowing.

## Quick checks first
- Which fuse? Read the label on the fuse box. The K-Light 125 has a 20 A main fuse and two 10 A fuses (PDF pp. 74 and 278).
- Is the new fuse the same rating and type as the label says?
- When does it blow: at key on, when you use one item (brake, horn, indicators, headlight), over bumps, or at full steering lock?
- Has anything been fitted, repaired or moved recently: accessories, alarm, seat, panels, battery?
- Is there a burning smell or melted plastic? If so, see [Burning smell from the wiring](/moto-zero/repair/problems/burning-smell-wiring).

## Diagnose it step by step

**1. Is the fuse the correct rating?**
- A lower rating than specified was fitted: fit the correct one and test. If it holds, you are done.
- Correct rating: go to step 2.

**2. Does it blow at the moment you use one item?**
- Yes: that item or its wire is shorted. For example, it blows when braking: the brake light switch wire or tail light holder. Go to step 4 and start with that branch.
- No, it blows at key on: go to step 3.
- Only over bumps or at full lock: a wire touches the frame sometimes. Go to step 5.

**3. Was an accessory fitted on this circuit?** Unplug or disconnect it, fit a new fuse and test.
- Fuse now holds: the accessory or its wiring is faulty: [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault) and [Wire an accessory safely](/moto-zero/repair/repairs/accessory-wiring).
- Still blows: go to step 4.

**4. Is there a short to earth on the load side?** Remove the blown fuse. Key off. Set the multimeter to continuity (the beep symbol). Put one probe in the fuse holder on the side that goes to the circuit (not the battery side), the other on bare frame metal.
- Beeps: there is a short. Unplug connectors and items along the circuit one at a time, starting halfway along (MAVCC half-split method, PDF p. 292), until the beep stops. Full method: [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find).
- No beep: the short only appears with a switch on or the engine running. Turn the key to ON with the battery still disconnected and work each switch while watching the meter.

**5. Does wiggling the harness make the meter beep?** With the probes in place as in step 4, turn the bars lock to lock and press on the harness under the seat, tank and rear mudguard.
- Beep comes and goes: the insulation has rubbed through at that point. Repair and protect it: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

**6. The main fuse blows only with the engine running?** A shorted regulator rectifier can blow the main fuse. Unplug the regulator, fit a new fuse, and start the engine briefly. If the fuse now holds, test the regulator: [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test).

**What happens if you keep fitting fuses?** MAVCC's brake light job warns that fuses do not just burn out: assume a pinched, bare or shorted wire (PDF p. 313). Each blow heats the fuse holder, and a bigger fuse moves the heat into the harness.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Wrong (lower) fuse rating | Compare with label | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Badly fitted accessory | Fuse holds with accessory unplugged | [Wire an accessory safely](/moto-zero/repair/repairs/accessory-wiring) |
| Wire rubbed through to frame | Continuity to frame, changes with wiggle | [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find) |
| Shorted lamp holder, horn or switch | Blows when that item is used | [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find) |
| Water in a connector | Green pins, blows after rain | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Shorted regulator (main fuse) | Holds with regulator unplugged | [Test the regulator rectifier](/moto-zero/repair/repairs/regulator-test) |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Main fuse | 20 A | PDF pp. 74, 278 |
| Other fuses on wiring diagram | two of 10 A | PDF p. 278 |
