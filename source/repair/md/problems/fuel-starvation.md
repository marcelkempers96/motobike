---
id: fuel-starvation
title: Engine stops and only runs on reserve or after a rest
system: fuel
also_called: [fuel starvation, runs out of fuel with fuel in tank, only runs on reserve]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected]
parts: [fuel_tap, fuel_filter, fuel_cap, fuel_line, carb, fuel_pump, fuel_tank]
repairs: [tank-vent-check, fuel-tap-line-check, fuel-filter-replace, drain-fuel, carb-float-check, carburettor-clean, fuel-pump-check, tank-rust-treat]
related: [tank-vacuum, carb-no-fuel, rusty-tank, water-in-fuel, cuts-out-random, sudden-power-loss, fuel-gauge-wrong, fuel-pump-noisy]
sources:
  - {doc: "MAVCC Motorcycle Mechanic", page: 264}
  - {doc: "MAVCC Motorcycle Mechanic", page: 377}
  - {doc: "MAVCC Motorcycle Mechanic", page: 378}
  - {doc: "K-Light 125 manual", page: 22}
  - {doc: "K-Light 125 manual", page: 269}
  - {doc: "K-Light 125 manual", page: 275}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/gastank.htm"}
---

# Engine stops and only runs on reserve or after a rest

The engine slows and stops as if it ran out of fuel, though there is fuel in the tank. It runs again when you switch the tap to reserve, or after you wait a few minutes. The engine is getting less fuel than it uses. The timing tells you where: if reserve cures it, the main pickup in the tap is blocked; if a rest cures it, fuel is trickling in slowly past a blockage or a blocked vent.

## Is it safe to ride?

With care, and only for short distances until fixed. Avoid busy roads where a sudden stop is dangerous.

## Quick checks first

- How much fuel is really in the tank? Look in with a torch; the gauge may be wrong.
- Does opening the fuel cap make a hiss and cure it?
- Does it run normally on RES?
- Is the fuel hose kinked, or the inline filter dark with dirt?
- Fuel-injected: does the pump buzz strongly at key-on?
- On a standard tap, ON draws from a tube above the tank bottom. When the engine dies at a low level, turning to RES draws from the bottom of the tank.
- Bikes with a low or under-seat tank use an electric pump to send fuel up to the carburettor.
- On older tanks in two halves, a crossover tube joins them. A blocked or kinked tube leaves fuel in one half.


## Diagnose it step by step

**1. When it stops, open the fuel cap. Is there a hiss, and does it then restart and run?**
- Yes: the tank vent is blocked. Go to [Engine stops after a few kilometres and the cap hisses](/moto-zero/repair/problems/tank-vacuum).
- No: go to step 2.

**2. Carburettor bikes: does it run normally on RES but starve on ON, with fuel above the reserve level?**
- Yes: the ON pickup tube or its strainer in the tap is blocked. Drain the tank and clean the tap strainer: [Check the fuel tap, lines and flow](/moto-zero/repair/repairs/fuel-tap-line-check).
- Tank is actually low: fill up. If the gauge misled you, see [Fuel gauge reads wrong](/moto-zero/repair/problems/fuel-gauge-wrong).
- Starves on both ON and RES: go to step 3.

**3. Carburettor bikes: do the flow test into a jar. Is the flow weak on both ON and RES?**
- Yes: a blocked filter or strainer. [Replace the fuel filter](/moto-zero/repair/repairs/fuel-filter-replace). Rust flakes in the filter: [Rust or flakes inside the fuel tank](/moto-zero/repair/problems/rusty-tank).
- Vacuum tap: weak flow only while riding can mean a torn diaphragm in the tap or a split vacuum hose. Replace the tap.
- Flow is strong: go to step 4.

**4. Carburettor: with good flow to the carburettor, does the float bowl hold fuel (open the drain screw after a stall)?**
- Little or no fuel: the float needle is sticking shut or the bowl inlet is blocked with dirt. [Check the float and needle](/moto-zero/repair/repairs/carb-float-check) and [clean the carburettor](/moto-zero/repair/repairs/carburettor-clean).
- Fuel present: the fuel side is fine. Check the spark and see [Cuts out randomly](/moto-zero/repair/problems/cuts-out-random).

**5. Fuel-injected: does the pump buzz strongly, and does starvation happen mainly when the tank is low or the pump is hot?**
- The pump strainer in the tank may be blocked, or the pump weak. Keep the tank above a quarter full and [check the fuel pump](/moto-zero/repair/repairs/fuel-pump-check). A workshop checks pressure (K-Light 125: below 270 kPa is a fault, caused by a leak, a blocked filter or a reversed pump).

**6. Water or dirt in the fuel?** Drain a sample into a clear jar. If it is dirty: [Drain contaminated fuel](/moto-zero/repair/repairs/drain-fuel).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Blocked tank vent | Hiss when cap opened | [Tank vent](/moto-zero/repair/repairs/tank-vent-check) |
| Blocked tap strainer (ON pickup) | Runs on RES only | [Tap and lines](/moto-zero/repair/repairs/fuel-tap-line-check) |
| Blocked filter, often rust | Weak flow, dirty filter | [Fuel filter](/moto-zero/repair/repairs/fuel-filter-replace) |
| Vacuum tap diaphragm or hose | Weak flow when riding | Replace the tap |
| Sticking float needle | Empty bowl with good flow | [Float check](/moto-zero/repair/repairs/carb-float-check) |
| Weak pump or blocked pump strainer (injection) | Low pressure | [Fuel pump](/moto-zero/repair/repairs/fuel-pump-check) |
