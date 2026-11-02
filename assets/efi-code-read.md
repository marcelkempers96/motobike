---
id: efi-code-read
title: Read engine fault codes (fuel injection)
level: home
time: 15 to 30 min (estimate)
applies_to:
- fuel-injected
tools:
- diagnostic scan tool or adapter that fits your bike
- multimeter
- battery charger
- notebook or phone
parts:
- ecu
- efi_sensors
- o2_sensor
- injector
- fuel_pump
- wiring
- battery
- earth_strap
consumables: []
fixes:
- black-smoke
- bogs-full-throttle
- cdi-ecu-suspect
- choke-stuck
- cranks-no-start
- cuts-out-random
- dirty-throttle-body
- engine-warning-light
- exhaust-glowing
- exhaust-leak
- exhaust-popping
- fan-not-working
- flat-spot
- fuel-pump-noisy
- fuel-pump-silent
- hanging-revs
- hesitation
- high-fuel-use
- high-idle
- hunting-idle
- injector-fault
- low-power
- low-top-speed
- misfire-under-load
- overheating-air
- overheating-liquid
- plug-black-sooty
- power-fades-hot
- rough-idle
- runs-lean
- runs-rich
- stalls-at-idle
- stalls-when-hot
- starts-only-with-choke
- starts-then-dies
- sudden-power-loss
- surging-cruise
- temp-gauge-high
- warning-lights-flicker
---

# Read engine fault codes (fuel injection)

**Home mechanic (basic tools)** · Time: 15 to 30 min (estimate) (estimate)


The ECU (engine control unit) watches its sensors, injector, coil and pump. When it sees a reading out of range it stores a **fault code** and lights the engine warning light (MIL, often marked FI or with an engine symbol). Reading the code tells you which circuit to check. It does not prove which part has failed: a code for a sensor is often caused by its plug, wire or earth.

## Safety

- Read codes with the bike on its stand and the engine off, or idling outdoors only.
- Do not unplug ECU or sensor connectors with the key ON. The K-Light 125 manual warns this can damage the ECU.

## You need

- A scan tool that speaks to your bike, or the manufacturer's tool at a dealer. The K-Light 125 uses a 16-pin diagnostic connector. Other bikes use different plugs; some flash codes on the warning light instead (check your manual for a jumper or blink-code method).
- A charged battery. The K-Light 125 manual says the battery must not be below 8.5 V while using the tool.

## Steps

1. **Light check at key-on.** Turn the key ON in neutral. The warning light should come on: this proves the system has power. If it stays off, check fuses, the earth wire and the ECU plug first (K-Light 125 manual, PDF page 274), then the bulb or LED.
2. **Light after starting.** Start the engine. The light should go out. If it stays on or comes on while riding, a fault is stored. A flashing light on many bikes means a fault that can damage the catalytic converter: ride gently and get it checked soon.
3. **Connect the tool.** Find the diagnostic connector (often under the seat or a side cover). Key OFF, plug in, then key ON.
4. **Write down every code** and any freeze-frame data (engine speed, temperature at the moment the fault was set) before you clear anything.
5. Look up each code in your manual. The table below gives examples from the K-Light 125.
6. Check the circuit for the code: connector clean and fully clicked in, no broken or chafed wires, good earth. See [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) and [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
7. Clear the codes and test ride. If the same code returns, go to the part's own check page.
8. **Code that does not match the fault:** the K-Light 125 manual says an unstable earth wire can cause this. Fix the earth, disconnect the battery for 3 minutes, reconnect and start.
9. **Live data (if your tool shows it):** battery voltage, engine temperature, throttle position and intake pressure readings help a workshop judge sensors, charging and even valve clearance.

## Example codes (K-Light 125, PDF pages 269 to 271)

| Code | Circuit | Next page |
|---|---|---|
| P0122, P0123 | Throttle position sensor low or high | [Check the engine sensors](/moto-zero/repair/repairs/efi-sensor-check) |
| P0107, P0108 | Intake pressure (MAP) sensor low or high | [Check the engine sensors](/moto-zero/repair/repairs/efi-sensor-check) |
| P0112, P0113 | Intake air temperature low or high | [Check the engine sensors](/moto-zero/repair/repairs/efi-sensor-check) |
| P0117, P0118 | Engine (cylinder head) temperature low or high | [Check the engine sensors](/moto-zero/repair/repairs/efi-sensor-check) |
| P0131, P0132, P0134 | Oxygen sensor lean too long, rich too long, no activity | [Check the oxygen sensor](/moto-zero/repair/repairs/o2-sensor-check) |
| P0030 to P0032 | Oxygen sensor heater circuit | [Check the oxygen sensor](/moto-zero/repair/repairs/o2-sensor-check) |
| P0201, P0261, P0262 | Injector open or shorted | [Check the fuel injector](/moto-zero/repair/repairs/injector-check) |
| P0627, P0629 | Fuel pump open or shorted | [Check the fuel pump](/moto-zero/repair/repairs/fuel-pump-check) |
| P0505, P0508, P0509 | Idle stepper motor | [Reset the idle](/moto-zero/repair/repairs/idle-relearn) |
| P0335 | Crankshaft position sensor | [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test) |
| P2300, P2301 | Ignition coil | [Test the ignition coil](/moto-zero/repair/repairs/ignition-coil-test) |
| P0601 | ECU memory error | [Diagnose a suspected CDI or ECU fault](/moto-zero/repair/repairs/cdi-ecu-diagnosis) |

Code meanings on other bikes can differ. Always use your own manual's table.

## Check your work

- Light on at key-on, off after start, and no code returns after a full warm-up ride.

## If it did not fix the problem

- No tool will connect: check fuses, earth and the ECU plug, then try the tool on another bike. If it still fails, see [CDI or ECU suspected faulty](/moto-zero/repair/problems/cdi-ecu-suspect).

## Problems this repair helps with

- [Black smoke from the exhaust](/moto-zero/repair/problems/black-smoke)
- [Bogs down or chokes at full throttle](/moto-zero/repair/problems/bogs-full-throttle)
- [CDI or ECU suspected faulty](/moto-zero/repair/problems/cdi-ecu-suspect)
- [Choke is stuck on or will not work](/moto-zero/repair/problems/choke-stuck)
- [Engine turns over but will not start](/moto-zero/repair/problems/cranks-no-start)
- [Cuts out randomly, then restarts](/moto-zero/repair/problems/cuts-out-random)
- [Unstable idle after cleaning or battery disconnection (fuel-injected)](/moto-zero/repair/problems/dirty-throttle-body)
- [Engine warning light (check engine, MIL) is on or flashing](/moto-zero/repair/problems/engine-warning-light)
- [Exhaust pipe glows red or the catalytic converter overheats](/moto-zero/repair/problems/exhaust-glowing)
- [Ticking or puffing from an exhaust leak](/moto-zero/repair/problems/exhaust-leak)
- [Popping or banging from the exhaust when slowing down](/moto-zero/repair/problems/exhaust-popping)
- [Radiator fan does not switch on](/moto-zero/repair/problems/fan-not-working)
- [Flat spot in the middle of the rev range](/moto-zero/repair/problems/flat-spot)
- [Fuel pump whines loudly or runs all the time](/moto-zero/repair/problems/fuel-pump-noisy)
- [No buzz from the fuel pump when the key is turned on](/moto-zero/repair/problems/fuel-pump-silent)
- [Revs hang or drop slowly after closing the throttle](/moto-zero/repair/problems/hanging-revs)
- [Hesitates or stumbles when opening the throttle](/moto-zero/repair/problems/hesitation)
- [Uses more fuel than normal](/moto-zero/repair/problems/high-fuel-use)
- [Idle speed is too high](/moto-zero/repair/problems/high-idle)
- [Idle speed rises and falls on its own](/moto-zero/repair/problems/hunting-idle)
- [Fuel injector suspected blocked or leaking](/moto-zero/repair/problems/injector-fault)
- [Engine feels weak and down on power](/moto-zero/repair/problems/low-power)
- [Will not reach normal top speed](/moto-zero/repair/problems/low-top-speed)
- [Misfires or stutters when accelerating hard or climbing](/moto-zero/repair/problems/misfire-under-load)
- [Air-cooled engine overheats](/moto-zero/repair/problems/overheating-air)
- [Liquid-cooled engine overheats](/moto-zero/repair/problems/overheating-liquid)
- [Spark plug is black and sooty](/moto-zero/repair/problems/plug-black-sooty)
- [Power fades as the engine gets hot](/moto-zero/repair/problems/power-fades-hot)
- [Rough, lumpy or uneven idle](/moto-zero/repair/problems/rough-idle)
- [Engine runs hot and lean, pops and pinks](/moto-zero/repair/problems/runs-lean)
- [Engine runs rich, smells of fuel and smokes black](/moto-zero/repair/problems/runs-rich)
- [Engine stalls at idle or at junctions](/moto-zero/repair/problems/stalls-at-idle)
- [Engine stalls once it is fully warm](/moto-zero/repair/problems/stalls-when-hot)
- [Starts only with the choke on or the throttle held open](/moto-zero/repair/problems/starts-only-with-choke)
- [Engine starts, then dies after a few seconds](/moto-zero/repair/problems/starts-then-dies)
- [Sudden loss of power while riding](/moto-zero/repair/problems/sudden-power-loss)
- [Surges or jerks at steady cruising speed](/moto-zero/repair/problems/surging-cruise)
- [Temperature gauge reads high or the warning light is on](/moto-zero/repair/problems/temp-gauge-high)
- [Warning lights flicker or come on wrongly](/moto-zero/repair/problems/warning-lights-flicker)

## Parts for this job

| Part | Buy |
|---|---|
| [ECU](/moto-zero/repair/parts/ecu) | [Find this part](/spare-parts/ecu) |
| [Engine sensors (TPS, MAP, temperature)](/moto-zero/repair/parts/efi_sensors) | [Find this part](/spare-parts/efi-sensors) |
| [Oxygen sensor](/moto-zero/repair/parts/o2_sensor) | [Find this part](/spare-parts/o2-sensor) |
| [Fuel injector](/moto-zero/repair/parts/injector) | [Find this part](/spare-parts/injector) |
| [Fuel pump](/moto-zero/repair/parts/fuel_pump) | [Find this part](/spare-parts/fuel-pump) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |
| [Earth (ground) connections](/moto-zero/repair/parts/earth_strap) | [Find this part](/spare-parts/earth-strap) |

## Sources

- K-Light 125 manual, PDF p. 269
- K-Light 125 manual, PDF p. 270
- K-Light 125 manual, PDF p. 271
- K-Light 125 manual, PDF p. 272
- K-Light 125 manual, PDF p. 274
- K-Light 125 manual, PDF p. 276
