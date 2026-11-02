---
id: earth-clean
title: Clean and tighten earth connections
level: home
time: 20 to 45 min
applies_to:
- all
tools:
- spanners and sockets
- screwdrivers
- wire brush or fine abrasive paper
- digital multimeter
parts:
- earth_strap
- battery
- wiring
consumables:
- electrical contact cleaner
- dielectric grease or battery terminal grease
- new star washers if worn
fixes:
- all-lights-out
- battery-corrosion
- brake-light-dead
- bulbs-blow-often
- cdi-ecu-suspect
- cuts-out-bumps
- cuts-out-random
- dash-dead
- dim-lights-idle
- engine-warning-light
- fuel-gauge-wrong
- fuel-pump-silent
- headlight-dim
- headlight-flicker
- headlight-out
- horn-weak
- indicators-dead
- indicators-fast
- indicators-steady
- intermittent-electrical
- no-power-key-on
- not-charging
- overcharging
- regulator-hot
- slow-cranking
- starter-clicks
- tail-light-out
- warning-lights-flicker
- weak-spark
- wet-connectors
---

# Clean and tighten earth connections

**Home mechanic (basic tools)** · Time: 20 to 45 min (estimate)


Current flows out of the battery positive, through the part, and back to the battery negative. On a motorcycle much of the return path is the frame and engine, joined to the battery by earth (ground) wires and straps. A rusty, painted or loose earth point makes lamps dim or flicker, makes warning lights act strangely, makes the starter slow and can make an ECU report wrong fault codes. The K-Light manual lists poor connector and earth strap contact as a cause of weak lights (PDF p. 43), and a loose earth wire as a cause of fault codes that do not match the fault (PDF p. 276).

## Safety
- Remove the battery negative cable first and refit it last. If a spanner on the positive terminal touches the frame while the negative is connected, it makes a short circuit with sparks and heat.
- Battery terminals and lead dust are toxic. Wear gloves and wash your hands afterwards.
- On fuel-injected bikes, disconnecting the battery may reset idle learning. See [Unstable idle after cleaning or battery disconnection (fuel-injected)](/moto-zero/repair/problems/dirty-throttle-body) if the idle is poor afterwards.

## You need
- The wiring diagram, to find every earth point. Earth wires are usually black (B on the K-Light 125 colour key, PDF p. 278), sometimes green on older bikes. Look for ring terminals bolted to the frame or engine.
- Typical earth points: battery negative to frame; frame or battery negative to engine (needed for the starter); inside the headlight shell; under the fuel tank; near the tail light; at the ECU or CDI.

## Steps
1. Turn the key off. Remove the seat and side panels to reach the battery (K-Light 125: left side cover, PDF p. 58).
2. Disconnect the battery negative cable.
3. **Battery negative to frame.** Remove the bolt where the negative cable meets the frame or engine. Clean the ring terminal and the frame face back to bright metal with a wire brush or fine abrasive paper. Clean the bolt threads.
4. **Engine earth.** Find the earth wire or strap from the frame or battery negative to the engine. This carries the starter current back to the battery. Clean both ends the same way.
5. **Other earth points.** Find each earth ring terminal on the frame. Remove, clean to bright metal, and refit. Check the wire is not broken where it enters the terminal: pull on it gently.
6. Replace worn star washers. Refit each terminal flat against the clean metal. Tighten firmly, but do not strip threads in thin brackets.
7. Put a thin layer of grease over the finished joint, on the outside, to keep water out. Do not put grease between the terminal and the metal before tightening.
8. Reconnect the battery negative last.
9. **Prove it.** Turn on the headlight (engine running if needed). Meter on DC volts. Red probe on a clean bare spot on the frame, black probe on the battery negative terminal. The reading should be close to zero. Then repeat with the red probe on the engine casing. This is a voltage drop test of the earth path; see [Do a voltage drop test](/moto-zero/repair/repairs/voltage-drop-test).
10. On a fuel-injected bike that showed wrong fault codes: the K-Light manual says to refit the earth, then disconnect the battery for 3 minutes before starting again (PDF p. 276).

## Check your work
- Lights are steady and as bright at idle as with the engine off and fully charged.
- The voltage drop on the earth side is close to zero and does not change when you wiggle the wires.
- Warning lamps behave normally.

## If it did not fix the problem
- The fault is still intermittent: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).
- Terminals at the battery are corroded: [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean).
- Lights still dim: [Headlight is dim](/moto-zero/repair/problems/headlight-dim).

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Battery disconnection after refitting a loose earth (EFI fault code reset) | 3 min | PDF p. 276 |

## Problems this repair helps with

- [All lights stop working](/moto-zero/repair/problems/all-lights-out)
- [Battery terminals are corroded](/moto-zero/repair/problems/battery-corrosion)
- [Brake light does not work](/moto-zero/repair/problems/brake-light-dead)
- [Bulbs keep blowing](/moto-zero/repair/problems/bulbs-blow-often)
- [CDI or ECU suspected faulty](/moto-zero/repair/problems/cdi-ecu-suspect)
- [Cuts out when riding over bumps](/moto-zero/repair/problems/cuts-out-bumps)
- [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random)
- [Instruments or dashboard are dead](/moto-zero/repair/problems/dash-dead)
- [Lights go dim at idle](/moto-zero/repair/problems/dim-lights-idle)
- [Engine warning light (check engine, MIL) is on or flashing](/moto-zero/repair/problems/engine-warning-light)
- [Fuel gauge reads wrong or does not move](/moto-zero/repair/problems/fuel-gauge-wrong)
- [No buzz from the fuel pump when the key is turned on](/moto-zero/repair/problems/fuel-pump-silent)
- [Headlight is dim](/moto-zero/repair/problems/headlight-dim)
- [Headlight flickers](/moto-zero/repair/problems/headlight-flicker)
- [Headlight does not work](/moto-zero/repair/problems/headlight-out)
- [Horn is weak or croaky](/moto-zero/repair/problems/horn-weak)
- [Indicators do not work](/moto-zero/repair/problems/indicators-dead)
- [Indicators flash too fast](/moto-zero/repair/problems/indicators-fast)
- [Indicators stay on and do not flash](/moto-zero/repair/problems/indicators-steady)
- [Electrical faults come and go](/moto-zero/repair/problems/intermittent-electrical)
- [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on)
- [Battery is not charging while riding](/moto-zero/repair/problems/not-charging)
- [Battery overcharges and bulbs blow](/moto-zero/repair/problems/overcharging)
- [Regulator is very hot or the connector has melted](/moto-zero/repair/problems/regulator-hot)
- [Engine turns over slowly](/moto-zero/repair/problems/slow-cranking)
- [Starter relay clicks but the engine does not turn](/moto-zero/repair/problems/starter-clicks)
- [Tail light does not work](/moto-zero/repair/problems/tail-light-out)
- [Warning lights flicker or come on wrongly](/moto-zero/repair/problems/warning-lights-flicker)
- [Weak, thin or orange spark](/moto-zero/repair/problems/weak-spark)
- [Electrical faults after rain or washing](/moto-zero/repair/problems/wet-connectors)

## Parts for this job

| Part | Buy |
|---|---|
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |

## Sources

- K-Light 125 manual, PDF p. 43
- K-Light 125 manual, PDF p. 58
- K-Light 125 manual, PDF p. 276
- K-Light 125 manual, PDF p. 278
- MAVCC Motorcycle Mechanic, PDF p. 315
