---
id: injector-fault
title: Fuel injector suspected blocked or leaking
system: fuel
also_called: [blocked injector, dirty injector, leaking injector, clogged nozzle]
urgency: ride-with-care
applies_to: [fuel-injected]
parts: [injector, fuel_pump, fuel_filter, intake_manifold, o2_sensor, wiring, ecu]
repairs: [efi-code-read, fuel-pump-check, intake-leak-test, injector-check, o2-sensor-check, drain-fuel, spark-plug-reading]
related: [rough-idle, hesitation, misfire-under-load, runs-lean, runs-rich, hard-hot-start, flooded-engine, fuel-smell, stale-fuel, engine-warning-light]
sources:
  - {doc: "K-Light 125 manual", page: 22}
  - {doc: "K-Light 125 manual", page: 258}
  - {doc: "K-Light 125 manual", page: 275}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "K-Light 125 manual", page: 270}
---

# Fuel injector suspected blocked or leaking

The injector is a small electric valve that sprays fuel into the intake. If varnish or dirt **partly blocks** it, the spray is weak or uneven: the engine runs lean, hesitates, idles roughly and loses power. If it **leaks** (drips when closed), the engine runs rich, smells of fuel, is hard to start hot, and may flood. Injectors are often blamed for faults elsewhere, so rule out the cheaper causes first: fuel pressure, air leaks and wiring.

## Is it safe to ride?

With care, if it runs well enough. If you see or smell fuel outside the injector, **do not ride**: that is a leak next to a hot engine.

## Quick checks first

- Is the engine warning light on, with an injector code?
- Is there a fuel smell or wet spot around the injector?
- Has the bike stood for months with old fuel?
- Does the pump buzz normally at key-on?
- Is the spark plug black and wet (rich) or white (lean)?

## Diagnose it step by step

**1. Is fuel visible on the outside of the injector or its hose joint (key on, engine off)?**
- Yes: external leak. **Do not ride.** Workshop: [Check the fuel injector](/moto-zero/repair/repairs/injector-check).
- No: go to step 2.

**2. Is an injector code stored?**
- Yes (K-Light 125: P0201 open, P0261 or P0262 shorted): the coil or wiring has a fault. [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read), check the connector, then the workshop measures the coil.
- No: go to step 3.

**3. Does the pump prime normally, and has fuel pressure been checked?**
- Weak or silent pump: [Check the fuel pump](/moto-zero/repair/repairs/fuel-pump-check). Low pressure gives the same symptoms as a blocked injector; the K-Light 125 troubleshooting guide checks pressure before the injector.
- Pump fine: go to step 4.

**4. Do the symptoms point to lean (hesitation, popping, white plug) or rich (fuel smell, black plug, hard hot start)?**
- Lean: first [find an intake air leak](/moto-zero/repair/repairs/intake-leak-test). If there is none, a partly blocked injector is likely. Go to step 5.
- Rich: first check the oxygen sensor is tight and working: [Check the oxygen sensor](/moto-zero/repair/repairs/o2-sensor-check). The K-Light 125 manual says an O2 reading that stays above 500 mV when warm suggests a leaking injector. The K-Light 125 no-start chart also lists injector overflow for a wet plug.
- Use [Read a spark plug](/moto-zero/repair/repairs/spark-plug-reading) to help decide.

**5. Has the bike stood with old fuel, or had dirty fuel?**
- Yes: [drain the old fuel](/moto-zero/repair/repairs/drain-fuel), fill with fresh fuel and ride a full tank. Mild varnish sometimes clears. If not, go to step 6.

**6. Workshop injector service.** The workshop checks the coil resistance (K-Light 125: about 10 Ω), cleans the injector in an ultrasonic cleaner, tests its spray and leakage, and refits it with new O-rings. A leaking or failed injector is replaced with one of the same part number. See [Check the fuel injector](/moto-zero/repair/repairs/injector-check).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Low fuel pressure (not the injector) | Workshop pressure test | [Fuel pump check](/moto-zero/repair/repairs/fuel-pump-check) |
| Air leak (not the injector) | Water spray test | [Intake leak test](/moto-zero/repair/repairs/intake-leak-test) |
| Connector or wiring fault | Injector code | [Fault codes](/moto-zero/repair/repairs/efi-code-read) |
| Varnish from old fuel | Bike stood for months | [Injector check](/moto-zero/repair/repairs/injector-check) |
| Leaking injector | O2 high when warm, fuel smell | [Injector check](/moto-zero/repair/repairs/injector-check) |
