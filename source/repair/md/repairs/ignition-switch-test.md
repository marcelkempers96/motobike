---
id: ignition-switch-test
title: Test the ignition switch
level: home
time: 20 to 40 min
applies_to:
- all
tools:
- digital multimeter
- thin pins for back-probing
- screwdrivers
- sockets
- wiring diagram
parts:
- ignition_switch
- fuse
- wiring
- battery
consumables:
- lock lubricant (graphite or a product made for locks)
- electrical contact cleaner
fixes:
- all-lights-out
- cuts-out-bumps
- dash-dead
- ev-dash-dark
- ignition-switch-fault
- intermittent-electrical
- kill-switch-fault
- no-power-key-on
- parasitic-drain
- cuts-out-random
---

# Test the ignition switch

**Home mechanic (basic tools)** · Time: 20 to 40 min (estimate)


The ignition switch (key switch) connects the battery to the bike's main circuits when you turn the key. Inside are a lock barrel and an electrical switch. The lock can wear and stick, and the switch contacts can burn, so power cuts out when you ride over bumps or touch the key. Test the switch when the bike is dead with the key on, or cuts out and comes back.

## Safety
- If the engine cuts out while riding because of the ignition switch, stop riding. Losing power in traffic is dangerous.
- Many modern bikes have an **immobiliser**: a chip in the key and an antenna ring around the lock. A new switch or key may need coding with a dealer tool. Do not replace the switch until you know whether yours has one.
- Disconnect the battery negative before removing the switch.

## You need
- The switch table for your bike. On the K-Light 125 the switch connector has four wires: red/white 1, red, red/white and orange/blue. In the ON position, red/white 1 connects to red, and red/white connects to orange/blue. In OFF and LOCK there is no connection (PDF p. 102).
- A multimeter: continuity (beep or lowest Ω) and DC volts (V with a straight line, 20 V range).

## Steps
1. **Feel the key.** Does it turn smoothly, or does it catch? Does the power flicker if you wiggle the key in the ON position? Wiggling that changes the power points to a worn switch or a loose connector behind it.
2. **Lubricate a stiff lock.** Use lock lubricant in the key slot and work the key several times. Do not use thick grease or engine oil: they collect dust and make it worse.
3. **Find the switch connector.** Follow the wires from the bottom of the switch, usually to a connector inside the headlight shell or under the tank.
4. **Test the supply.** Key off. Back-probe the battery feed wire at the switch connector (the K-Light 125 diagram shows a red wire coming from the battery side, PDF p. 278; confirm on your diagram). Meter on DC volts, black probe on battery negative. It should show close to battery voltage even with the key off. If not, the main fuse or the wire from the battery is at fault: [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
5. **Test the output under load.** Key on. Back-probe each output wire. Each should show close to battery voltage. Then do a voltage drop test across the switch with the headlight or other loads on: red probe on the feed wire, black probe on the output wire. A reading close to zero is good. A clear reading means the contacts are worn: [Do a voltage drop test](/moto-zero/repair/repairs/voltage-drop-test).
6. **Test continuity.** Key off, battery negative off, switch unplugged. Meter on continuity. Turn the key through each position and check against your switch table. Each pair should beep only in its correct position. While probing ON, wiggle the key: the beep must not drop out.
7. **Check the connector.** Look for corrosion, a loose pin or melted plastic: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
8. **Replace if faulty.** On the K-Light 125 the switch is held by a mounting bolt (PDF p. 102). Many switches use security bolts that must be drilled or cut out: that is workshop work. If your bike has an immobiliser, buy the switch and keys through a dealer who can code them.

## Check your work
- Power comes on at the first turn of the key and stays on when you wiggle the key and ride over bumps.
- The steering lock locks and unlocks easily.
- All items fed by the switch work: lights, dashboard, horn, ignition.

## If it did not fix the problem
- Still no power: [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on).
- Cuts out with a good switch: [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random).

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| ON position connections | red/white 1 to red; red/white to orange/blue | PDF p. 102 |
| OFF and LOCK | no connection | PDF p. 102 |

## Problems this repair helps with

- [All lights stop working](/moto-zero/repair/problems/all-lights-out)
- [Cuts out when riding over bumps](/moto-zero/repair/problems/cuts-out-bumps)
- [Instruments or dashboard are dead](/moto-zero/repair/problems/dash-dead)
- [Dashboard is dark and the bike seems dead](/moto-zero/repair/problems/ev-dash-dark)
- [Ignition switch is stiff or cuts power](/moto-zero/repair/problems/ignition-switch-fault)
- [Electrical faults come and go](/moto-zero/repair/problems/intermittent-electrical)
- [Engine stop switch fault](/moto-zero/repair/problems/kill-switch-fault)
- [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on)
- [Something drains the battery with the key off](/moto-zero/repair/problems/parasitic-drain)
- [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random)

## Parts for this job

| Part | Buy |
|---|---|
| [Ignition switch](/moto-zero/repair/parts/ignition_switch) | [Find this part](/spare-parts/ignition-switch) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |

## Sources

- K-Light 125 manual, PDF p. 101
- K-Light 125 manual, PDF p. 102
- K-Light 125 manual, PDF p. 278
