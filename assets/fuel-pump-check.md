---
id: fuel-pump-check
title: Check the fuel pump (fuel injection)
level: home
time: 15 to 45 min for the home checks (estimate)
applies_to:
- fuel-injected
tools:
- multimeter
- torch
- fuse puller
- battery charger
- rags
parts:
- fuel_pump
- fuse
- wiring
- battery
- fuel_filter
- fuel_tank
- ecu
consumables: []
fixes:
- bogs-full-throttle
- coil-fails-hot
- cranks-no-start
- cuts-out-random
- engine-warning-light
- fuel-leak
- fuel-pump-noisy
- fuel-pump-silent
- fuel-smell
- fuel-starvation
- injector-fault
- low-power
- low-top-speed
- misfire-high-rpm
- misfire-under-load
- no-start-after-storage
- plug-white
- runs-lean
- rusty-tank
- starts-then-dies
- sudden-power-loss
- water-in-fuel
---

# Check the fuel pump (fuel injection)

**Home mechanic (basic tools)** · Time: 15 to 45 min for the home checks (estimate) (estimate)


On a fuel-injected bike an electric pump, usually inside the tank, pushes fuel to the injector under pressure. A **pressure regulator** keeps that pressure steady. When you turn the key on, the ECU runs the pump for a few seconds to fill the line; you hear a short buzz or whine from the tank. No buzz, a weak buzz, or a pump that runs all the time points to the pump, its power supply or its control. This page covers the checks you can do safely at home and what to ask a workshop.

## Safety

- Fuel lines on injected bikes hold pressure even with the engine off. **Do not open a fuel hose or connector at home.** Fuel can spray onto hot parts or into your eyes.
- Do not run the pump with an empty or nearly empty tank. Fuel cools the pump; running it dry damages it (K-Light 125 manual, PDF page 269).
- Do not power the pump directly from a battery with jump leads. A spark near fuel vapour can start a fire, and a wrong connection can damage the ECU.

## Steps

1. **Fuel level.** Make sure there are at least a few litres in the tank. A pump sitting above the fuel cannot pick up. A fuel gauge can read wrong: look in through the filler.
2. **Battery.** A weak battery may run the dash but not the pump. Check it is well charged: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
3. **Listen.** In a quiet place, put your ear near the tank and turn the key to ON with the kill switch on RUN. You should hear the pump run for about 3 seconds (K-Light 125), then stop.
4. **Warning light.** At key-on the engine warning light (often marked FI) should come on. If the light does not come on at all, the injection system has no power: check fuses and earth before blaming the pump. See [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read).
5. **Fuses and relay.** Find the fuse box (K-Light 125: main 20 A fuse and two 10 A fuses). Check every fuse; see [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check). Some bikes have a separate pump relay; swapping it with an identical relay is a quick test.
6. **Connector.** With the key OFF, find the pump connector on top of the tank. Unplug it, look for green corrosion, bent or pushed-back pins, and plug it back firmly until it clicks. Do not twist the pump body.
7. **Kill switch and side stand.** On some bikes the pump will not prime with the kill switch on STOP or, once cranking, if an interlock cuts the ignition. Check them: [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test).
8. **Voltage at the connector (careful home mechanic).** With the connector unplugged and the multimeter on DC volts, put the probes on the two harness-side terminals and have a helper turn the key ON. Read during the priming seconds. The K-Light 125 manual expects 12 ± 2 V. Your bike's manual gives its own pins and value.
   - Voltage present but the pump is silent: the pump is faulty or stuck. Workshop.
   - No voltage: the fault is in the fuse, relay, wiring or ECU control. See [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).
9. **Pump runs but the engine starves.** The pump may be weak, the in-tank strainer blocked, or the connector reversed (the K-Light 125 manual notes a reversed plug makes the pump run backwards and give no pressure). This needs a pressure test.

## What the workshop will do

- Fit a fuel pressure gauge in the line with the correct adapter and read pressure at idle. K-Light 125: about 300 kPa; below 270 kPa means a leak, a blocked filter or a weak or reversed pump.
- Remove the tank and pump assembly, clean or replace the strainer, and fit a new pump seal ring.
- Replace the pump assembly if it fails, using the part number for your bike.

## Check your work

- A clear 2 to 3 second buzz at every key-on, and the engine starts and pulls cleanly to full throttle.

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Pump priming time at key-on | About 3 s | 268 |
| Supply at pump connector during priming | 12 ± 2 V | 269 |
| Fuel pressure at injector, idle (workshop) | About 300 kPa; fault below 270 kPa | 266, 269 |
| Fuses | 20 A main, two 10 A | 278 |

## Problems this repair helps with

- [Bogs down or chokes at full throttle](/moto-zero/repair/problems/bogs-full-throttle)
- [Ignition cuts out when hot and returns when cool](/moto-zero/repair/problems/coil-fails-hot)
- [Engine turns over but will not start](/moto-zero/repair/problems/cranks-no-start)
- [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random)
- [Engine warning light (check engine, MIL) is on or flashing](/moto-zero/repair/problems/engine-warning-light)
- [Fuel is leaking or dripping](/moto-zero/repair/problems/fuel-leak)
- [Fuel pump whines loudly or runs all the time](/moto-zero/repair/problems/fuel-pump-noisy)
- [No buzz from the fuel pump when the key is turned on](/moto-zero/repair/problems/fuel-pump-silent)
- [Strong smell of fuel around the bike](/moto-zero/repair/problems/fuel-smell)
- [Engine stops and only runs on reserve or after a rest](/moto-zero/repair/problems/fuel-starvation)
- [Fuel injector suspected blocked or leaking](/moto-zero/repair/problems/injector-fault)
- [Engine feels weak and down on power](/moto-zero/repair/problems/low-power)
- [Will not reach normal top speed](/moto-zero/repair/problems/low-top-speed)
- [Misfires only at high revs](/moto-zero/repair/problems/misfire-high-rpm)
- [Misfires or stutters when accelerating hard or climbing](/moto-zero/repair/problems/misfire-under-load)
- [Will not start after standing for weeks or months](/moto-zero/repair/problems/no-start-after-storage)
- [Spark plug is white or blistered](/moto-zero/repair/problems/plug-white)
- [Engine runs hot and lean, pops and pinks](/moto-zero/repair/problems/runs-lean)
- [Rust or flakes inside the fuel tank](/moto-zero/repair/problems/rusty-tank)
- [Engine starts, then dies after a few seconds](/moto-zero/repair/problems/starts-then-dies)
- [Sudden loss of power while riding](/moto-zero/repair/problems/sudden-power-loss)
- [Water or dirt in the fuel](/moto-zero/repair/problems/water-in-fuel)

## Parts for this job

| Part | Buy |
|---|---|
| [Fuel pump](/moto-zero/repair/parts/fuel_pump) | [Find this part](/spare-parts/fuel-pump) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |
| [Fuel filter](/moto-zero/repair/parts/fuel_filter) | [Find this part](/spare-parts/fuel-filter) |
| [Fuel tank](/moto-zero/repair/parts/fuel_tank) | [Find this part](/spare-parts/fuel-tank) |
| [ECU](/moto-zero/repair/parts/ecu) | [Find this part](/spare-parts/ecu) |

## Sources

- K-Light 125 manual, PDF p. 266
- K-Light 125 manual, PDF p. 268
- K-Light 125 manual, PDF p. 269
- K-Light 125 manual, PDF p. 274
- K-Light 125 manual, PDF p. 275
- K-Light 125 manual, PDF p. 278
