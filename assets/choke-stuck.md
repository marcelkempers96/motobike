---
id: choke-stuck
title: Choke is stuck on or will not work
system: fuel
also_called: [choke stuck, enrichener stuck, cold start lever not working, auto choke fault]
urgency: ride-with-care
applies_to: [carburettor, fuel-injected, four-stroke, two-stroke, scooter-cvt]
parts: [choke_cable, carb, throttle_body, efi_sensors]
repairs: [choke-check, choke-cable-adjust, cable-lube, carburettor-clean, efi-code-read, efi-sensor-check]
related: [choke-cable-fault, hard-cold-start, starts-only-with-choke, runs-rich, high-idle, black-smoke, high-fuel-use]
sources:
  - {doc: "MAVCC Motorcycle Mechanic", page: 353}
  - {doc: "MAVCC Motorcycle Mechanic", page: 349}
  - {doc: "Unit 2 The Motorcycle", page: 29}
  - {doc: "K-Light 125 manual", page: 276}
---

# Choke is stuck on or will not work

The choke (also called the starter or enrichener) adds extra fuel for cold starting. If it **sticks on**, the warm engine idles fast, smokes black, smells of fuel and uses more fuel. If it **does not work**, the engine is hard to start from cold and dies until it warms up. The fault is usually the lever or cable, a plunger gummed in its bore, or on scooters an automatic choke that has failed. Fuel-injected bikes have no choke: the ECU does this job.

## Is it safe to ride?

With care. A choke stuck on makes the bike idle fast and pull at junctions, and fouls the plug. Fix it soon.

## Quick checks first

- Does the choke lever or knob move freely and stay where you put it?
- With the lever OFF, does the cable have a little slack at the carburettor end?
- Scooter: is the automatic choke connector plugged in and clean?
- Fuel-injected: does the engine idle fast when cold and then settle? That is normal.

## Diagnose it step by step

**1. Is it a fuel-injected bike?**
- Yes: there is no choke. A high idle that will not come down when warm, or hard cold starting, comes from the ECU's temperature reading or idle control. [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read) and [check the engine temperature sensor](/moto-zero/repair/repairs/efi-sensor-check). The K-Light 125 ECU raises idle until the engine reaches 68 °C; that is normal.
- No: go to step 2.

**2. Does the choke lever or knob move freely through its full travel?**
- No, stiff or stuck: the cable is dry, frayed or kinked. See [Choke lever or cable does not work](/moto-zero/repair/problems/choke-cable-fault) and [Lubricate control cables](/moto-zero/repair/repairs/cable-lube).
- Yes: go to step 3.

**3. With the lever OFF, is the plunger fully down (or the butterfly fully open) at the carburettor?**
- No: the cable has no slack or the plunger is gummed. [Adjust the choke cable](/moto-zero/repair/repairs/choke-cable-adjust), then [check the choke](/moto-zero/repair/repairs/choke-check) and clean the plunger.
- Yes: go to step 4.

**4. With the lever ON, does the plunger lift fully (or the butterfly close)?**
- No: adjust the cable or free the plunger, as in step 3.
- Yes, but the engine still will not start cold: the starter jet may be blocked. [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean). Remember the starter circuit only works with the throttle closed.

**5. Scooter with an automatic choke: does the idle stay fast and smoky once warm?**
- Yes: the automatic choke is not closing. Check its connector and wiring. A workshop tests the heater and its supply with the engine running; a failed unit is replaced. See [Check the choke or starter valve](/moto-zero/repair/repairs/choke-check).

**6. Choke works but the engine needs it even when warm?** That is not a choke fault. See [Starts only with the choke on](/moto-zero/repair/problems/starts-only-with-choke).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Choke left on or lever not fully off | Lever position | Push fully off |
| Cable with no slack at OFF | Plunger not seated | [Choke cable adjust](/moto-zero/repair/repairs/choke-cable-adjust) |
| Dry, frayed or kinked cable | Stiff lever | [Cable lube](/moto-zero/repair/repairs/cable-lube) |
| Gummed plunger | Plunger sticks in bore | [Choke check](/moto-zero/repair/repairs/choke-check) |
| Failed automatic choke (scooter) | Fast smoky idle when warm | [Choke check](/moto-zero/repair/repairs/choke-check) |
| Temperature sensor fault (injection) | Code or wrong live data | [Sensor check](/moto-zero/repair/repairs/efi-sensor-check) |
