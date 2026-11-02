---
id: injector-check
title: Check the fuel injector
level: workshop
time: 10 min for home checks; 1 to 2 h at a workshop (estimate)
applies_to:
- fuel-injected
tools:
- long screwdriver or mechanic's stethoscope
- torch
- multimeter (workshop)
- scan tool (workshop)
parts:
- injector
- fuel_pump
- fuel_filter
- wiring
- ecu
- intake_manifold
consumables:
- new injector O-rings (workshop)
fixes:
- black-smoke
- engine-warning-light
- flooded-engine
- fuel-leak
- fuel-smell
- hesitation
- high-fuel-use
- injector-fault
- misfire-under-load
- oil-smells-fuel
- runs-lean
- runs-rich
- stale-fuel
- water-in-fuel
- cranks-no-start
- rough-idle
---

# Check the fuel injector

**Workshop job (assessment and hand-off)** · Time: 10 min for home checks; 1 to 2 h at a workshop (estimate) (estimate)


The injector is an electric valve. When the ECU switches it on, a coil lifts a small valve and pressurised fuel sprays as a fine mist into the intake. It clicks many times a second while the engine runs. A **blocked** injector (varnish from old fuel, dirt past a damaged filter) gives too little fuel: lean running, hesitation, poor power. A **leaking** injector drips fuel: rich running, black smoke, fuel smell, hard hot starts and flooding. This page covers the checks a rider can do and what the workshop does.

## Safety

- The injector sits in a pressurised fuel line next to a hot engine. **Do not remove it at home.** The K-Light 125 manual requires releasing fuel pressure, disconnecting the battery and fitting new O-rings; a small O-ring fault can cause a fuel leak and fire.
- Never clean an injector by applying battery power to it with jump wires.

## What you can check safely

1. **Click test:** with the engine idling, touch the tip of a long screwdriver to the injector body and put the handle to your ear (or use a stethoscope). A steady, fast clicking means the ECU is driving it. On a bike that cranks but will not start, have a helper crank while you listen: no clicking points to the injector circuit, the crank sensor or the ECU.
2. **Connector:** key OFF, unplug and inspect the injector connector for corrosion and loose pins; refit it until it clicks. Do not twist the injector while doing this; the K-Light 125 manual warns it can shift the spray direction.
3. **Fuel smell or wet spot** around the injector with the key ON (pump primed) and engine off: an external leak. Do not ride. Workshop.
4. **Codes:** read the ECU's codes. Injector open or short codes (K-Light 125: P0201, P0261, P0262) point to the coil or wiring. See [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read).
5. **Fuel quality:** if the bike stood for months with old fuel, drain it first: [Drain old or contaminated fuel](/moto-zero/repair/repairs/drain-fuel).

## What the workshop will do

- Measure the injector coil resistance. K-Light 125: about 10 Ω; infinite means an open coil.
- Check fuel pressure first, because low pressure looks like a blocked injector (K-Light 125: about 300 kPa; fault below 270 kPa).
- Check the oxygen sensor reading when warm. The K-Light 125 manual says a reading always above 500 mV at normal temperature suggests a leaking injector.
- Remove the injector with the pressure released, clean it with an ultrasonic cleaner and the right fluid, and test the spray and leak-down on a bench.
- Refit with new O-rings, lubricated only on the seals (never on the nozzle plate), in the original direction. Turn the key ON without starting and check for leaks before running.
- Replace a leaking or failed injector with one of the **same part number**.

## What to ask for

- "Please check fuel pressure and injector resistance, then clean and flow-test the injector, and fit new O-rings."

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Injector coil resistance (workshop) | About 10 Ω | 258 |
| System fuel pressure | About 300 kPa | 255 |
| O2 reading suggesting a leaking injector | Always above 500 mV when warm | 276 |

## Problems this repair helps with

- [Black smoke from the exhaust](/moto-zero/repair/problems/black-smoke)
- [Engine warning light (check engine, MIL) is on or flashing](/moto-zero/repair/problems/engine-warning-light)
- [Engine is flooded and smells of fuel](/moto-zero/repair/problems/flooded-engine)
- [Fuel is leaking or dripping](/moto-zero/repair/problems/fuel-leak)
- [Strong smell of fuel around the bike](/moto-zero/repair/problems/fuel-smell)
- [Hesitates or stumbles when opening the throttle](/moto-zero/repair/problems/hesitation)
- [Uses more fuel than normal](/moto-zero/repair/problems/high-fuel-use)
- [Fuel injector suspected blocked or leaking](/moto-zero/repair/problems/injector-fault)
- [Misfires or stutters when accelerating hard or climbing](/moto-zero/repair/problems/misfire-under-load)
- [Oil smells of petrol or the level rises](/moto-zero/repair/problems/oil-smells-fuel)
- [Engine runs hot and lean, pops and pinks](/moto-zero/repair/problems/runs-lean)
- [Engine runs rich, smells of fuel and smokes black](/moto-zero/repair/problems/runs-rich)
- [Old or stale fuel in the tank](/moto-zero/repair/problems/stale-fuel)
- [Water or dirt in the fuel](/moto-zero/repair/problems/water-in-fuel)
- [Engine turns over but will not start](/moto-zero/repair/problems/cranks-no-start)
- [Rough, lumpy or uneven idle](/moto-zero/repair/problems/rough-idle)

## Parts for this job

| Part | Buy |
|---|---|
| [Fuel injector](/moto-zero/repair/parts/injector) | [Find this part](/spare-parts/injector) |
| [Fuel pump](/moto-zero/repair/parts/fuel_pump) | [Find this part](/spare-parts/fuel-pump) |
| [Fuel filter](/moto-zero/repair/parts/fuel_filter) | [Find this part](/spare-parts/fuel-filter) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [ECU](/moto-zero/repair/parts/ecu) | [Find this part](/spare-parts/ecu) |
| [Intake manifold and rubber](/moto-zero/repair/parts/intake_manifold) | [Find this part](/spare-parts/intake-manifold) |

## Sources

- K-Light 125 manual, PDF p. 255
- K-Light 125 manual, PDF p. 257
- K-Light 125 manual, PDF p. 258
- K-Light 125 manual, PDF p. 270
- K-Light 125 manual, PDF p. 275
- K-Light 125 manual, PDF p. 276
