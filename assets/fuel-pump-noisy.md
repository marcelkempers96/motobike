---
id: fuel-pump-noisy
title: Fuel pump whines loudly or runs all the time
system: fuel
also_called: [noisy fuel pump, pump keeps running, pump whine]
urgency: ride-with-care
applies_to: [fuel-injected]
parts: [fuel_pump, fuel_filter, fuel_tank, fuse, wiring, ecu, battery]
repairs: [fuel-pump-check, fuse-relay-check, drain-fuel, efi-code-read, wiring-fault-find, battery-test-charge]
related: [fuel-pump-silent, fuel-starvation, rusty-tank, water-in-fuel, battery-flat, parasitic-drain, cuts-out-random]
sources:
  - {doc: "K-Light 125 manual", page: 268}
  - {doc: "K-Light 125 manual", page: 269}
  - {doc: "K-Light 125 manual", page: 275}
---

# Fuel pump whines loudly or runs all the time

The in-tank pump normally makes a short, quiet buzz at key-on and a faint hum while running. A loud whine, a rising or rattling note, or a pump that keeps running after the priming seconds with the engine off, means something is wrong. A pump that works hard is often starving: the tank is low or its strainer is blocked. A pump that never stops is being kept on by a stuck relay or a wiring or ECU fault, and it will flatten the battery.

## Is it safe to ride?

With care, for short distances, and keep the tank well filled. A starving pump can fail and stop the engine without warning.

## Quick checks first

- How much fuel is in the tank? Pumps get louder and hotter on a low tank, because fuel cools them.
- Is the noise only at key-on, or all the time the engine runs?
- With the key on and the engine off, does the pump stop after a few seconds?
- Has the bike had dirty or rusty fuel?

## Diagnose it step by step

**1. Fill the tank to at least half. Is the noise now normal?**
- Yes: the pump was running near-dry. Do not run the tank low. The K-Light 125 manual warns that running the pump with little or no fuel can burn it out.
- No: go to step 2.

**2. Key ON, engine off. Does the pump stop after its priming seconds (K-Light 125: about 3 s)?**
- No, it keeps running: the pump is being held on. A stuck relay or a wiring or ECU fault. Turn the key off. [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) (swap the relay with an identical one), then [read fault codes](/moto-zero/repair/repairs/efi-code-read) (K-Light 125: P0629 pump circuit shorted). See [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find). Check the battery has not been drained: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Yes, it stops normally: go to step 3.

**3. Has the bike had dirty, rusty or watery fuel, or a long time since the fuel filter was changed?**
- Yes: the pump strainer or filter is probably blocked and the pump is straining. [Drain the fuel](/moto-zero/repair/repairs/drain-fuel) and ask a workshop to clean or replace the in-tank strainer and filter. See [Rust or flakes inside the fuel tank](/moto-zero/repair/problems/rusty-tank).
- No: go to step 4.

**4. Does the engine also lose power, hesitate, or cut out?**
- Yes: the pump may be wearing out, or a pressure fault. A workshop measures fuel pressure (K-Light 125: about 300 kPa; below 270 kPa is a fault). The K-Light 125 manual also notes that a reversed pump connector makes the pump run backwards with no pressure. [Check the fuel pump](/moto-zero/repair/repairs/fuel-pump-check).
- No, it runs well but is noisy: monitor it. Note whether the noise grows. Replace the pump assembly when it starts to affect running.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Low fuel level | Quieter after filling | Keep tank above a quarter |
| Blocked strainer or filter | Dirty fuel history, low pressure | [Fuel pump check](/moto-zero/repair/repairs/fuel-pump-check) |
| Stuck relay or wiring fault | Pump runs with key on, engine off | [Fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Worn pump | Loud and low pressure | Workshop replacement |
| Reversed connector after repair | Runs, no pressure | Workshop |
