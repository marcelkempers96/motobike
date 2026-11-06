---
id: powervalve-stuck
title: Two-stroke is weak at one end of the rev range (power valve)
system: running
also_called: ["powervalve stuck", "exhaust valve stuck", "no top end power", "flat at low revs"]
urgency: ride-with-care
applies_to: ["two-stroke"]
parts: ["power_valve", "exhaust", "cylinder", "piston"]
repairs: ["power-valve-service", "two-stroke-decoke", "compression-test"]
related: ["low-power", "power-fades-hot", "exhaust-blocked"]
sources:
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/powervalve.htm"}
photos: [{file: "source/dansmc/04_Fuel_Carburetors/083/083_power_valve_closed.jpg", caption: "Power valve closed, narrowing the exhaust port"}, {file: "source/dansmc/04_Fuel_Carburetors/083/083_power_valve_open.jpg", caption: "Power valve open at high revs"}, {file: "source/dansmc/04_Fuel_Carburetors/083/083_dirty_power_valve_linkage.jpg", caption: "Carbon in the power valve linkage housing"}, {file: "source/dansmc/04_Fuel_Carburetors/083/083_yamaha_yz125_governor.jpg", caption: "Governor with centrifugal weights on the valve shaft"}]
---

# Two-stroke is weak at one end of the rev range (power valve)

Many modern two-stroke engines have a power valve in the exhaust port. It should be closed at low revs, to keep more of the mixture in the cylinder, and open at high revs, to give the full port. If it sticks closed, the engine runs out of breath at high revs. If it sticks open, the engine is weak and flat at low revs. Carbon in the valve and linkage is the usual reason.

## Is it safe to ride?
Ride with care. The bike is usable but down on power in the affected range.

## Quick checks first
- Is the exhaust blocked with carbon or is the exhaust pipe damaged? See [Exhaust blocked or choked with carbon](/moto-zero/repair/problems/exhaust-blocked).
- Does the engine have a power valve at all? Check your manual.
- How many hours has the engine run since its last power valve clean?

## Diagnose it step by step

**1. Where is the engine weak?**
- High revs only: the valve may be stuck closed. Go to step 2.
- Low revs only: the valve may be stuck open. Go to step 2.
- Everywhere: check [Engine feels weak and down on power](/moto-zero/repair/problems/low-power) first.

**2. Is the engine well maintained, with carbon removed on schedule?**
- No or unknown: carbon is likely. Have it cleaned and reset: [Assess and service a two-stroke power valve](/moto-zero/repair/repairs/power-valve-service).
- Yes: go to step 3.

**3. With the cover removed (workshop), does the linkage move freely and does the valve close when the engine is stopped?**
- Stiff or stuck: clean, check the spring and reset the linkage.
- Moves freely: check the governor and its settings in the manual.

**4. Is the exhaust or piston at fault?** [Decarbonise a two-stroke exhaust and port](/moto-zero/repair/repairs/two-stroke-decoke) and [test compression](/moto-zero/repair/repairs/compression-test).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Carbon in valve or linkage | Sticky, hard to move | [Power valve service](/moto-zero/repair/repairs/power-valve-service) |
| Linkage set wrongly | Valve not closed with engine stopped | [Power valve service](/moto-zero/repair/repairs/power-valve-service) |
| Governor dirty or worn | Weights do not move or return | Workshop, per manual |
| Spring weak or broken | Valve does not close at low revs | Replace spring |
