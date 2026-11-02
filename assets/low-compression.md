---
id: low-compression
title: Low compression
system: engine
also_called: [weak compression, no compression, kickstart goes down too easily, engine turns too easily]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke]
parts: [piston_rings, valves, gaskets, cylinder, piston, cylinder_head, spark_plug]
repairs: [spark-plug-service, compression-test, valve-clearance, leak-down-test, top-end-assessment, two-stroke-decoke]
related: [cranks-no-start, low-power, blue-smoke, hard-cold-start, tappet-tick, engine-seized]
sources:
  - {doc: "K-Light 125 manual", page: 60}
  - {doc: "K-Light 125 manual", page: 191}
  - {doc: "K-Light 125 manual", page: 203}
  - {doc: "K-Light 125 manual", page: 202}
  - {doc: "MAVCC Motorcycle Mechanic", page: 254}
  - {doc: "MAVCC Motorcycle Mechanic", page: 664}
---

# Low compression

Compression is the squeeze the piston puts on the air in the cylinder. If rings, valves, the head gasket or the spark plug seal leak, the engine is hard to start, weak, and the kickstart goes down with little effort. MAVCC notes that wrong valve clearance is the most common compression fault on small engines (125 cc and below), so check that before anything expensive. The K-Light manual lists wrong valve clearance, a burnt or bent valve, a poor seat, a head gasket leak and a plug not seated as head causes, and worn, burnt or broken pistons and rings as cylinder causes.

## Is it safe to ride?
Yes with care if it runs. Expect poor power on hills. Do not ride if compression is very low after a seizure or overheating.

## Quick checks first
- Is the spark plug tight and its washer present?
- Any hiss at the plug or head joint when you kick or crank?
- When were the valves last adjusted?
- Any blue smoke, or a recent overheat?

## Diagnose it step by step

**1. Is the spark plug tight, with a sealing washer?**
- No: fit it correctly with [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service), then retest.
- Yes: go to step 2.

**2. Measure with [Test engine compression](/moto-zero/repair/repairs/compression-test). Is it within the manual range? (K-Light 125: 1.0 to 1.2 MPa.)**
- Yes: compression is not the problem. Go to [Engine feels weak and down on power](/moto-zero/repair/problems/low-power) or [Engine turns over but will not start](/moto-zero/repair/problems/cranks-no-start).
- No, low: go to step 3.

**3. Four-stroke: check valve clearance cold with [Check and adjust valve clearance](/moto-zero/repair/repairs/valve-clearance). Was a gap too small or zero?**
- Yes: set it and retest. If compression is now correct, the job is done.
- No: go to step 4.
- Two-stroke: go to step 4.

**4. Do the wet test (a little oil in the plug hole). Does compression rise clearly?**
- Yes: the rings or cylinder are worn or the rings are stuck with carbon. Two-stroke with a choked exhaust and carbon: see [Decarbonise a two-stroke exhaust and port](/moto-zero/repair/repairs/two-stroke-decoke). Otherwise go to step 6.
- No, little change: valves or head gasket. Go to step 5.

**5. Ask for [Do a leak-down test](/moto-zero/repair/repairs/leak-down-test). Where does air escape?**
- Exhaust pipe or intake: valve not sealing (burnt, bent or carbon on the seat).
- Round the head joint: head gasket.
- Crankcase breather: rings. In all cases go to step 6.

**6. Workshop: [Assess the top end (cylinder, piston, valves)](/moto-zero/repair/repairs/top-end-assessment).** If compression is low after a valve job or timing work on an overhead cam engine, ask the workshop to check valve timing first.

**What happens if you ignore it:** the engine becomes harder to start, uses more fuel, burns oil and can overheat as hot gas leaks past the rings.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Valve clearance too small | Feeler gauge cold | [Check and adjust valve clearance](/moto-zero/repair/repairs/valve-clearance) |
| Loose plug or missing washer | Plug turns by hand | [Remove, check, gap and fit a spark plug](/moto-zero/repair/repairs/spark-plug-service) |
| Worn or stuck rings | Wet test rises | [Assess the top end (cylinder, piston, valves)](/moto-zero/repair/repairs/top-end-assessment) |
| Burnt or bent valve, carbon on seat | No wet rise, air at exhaust or intake | [Do a leak-down test](/moto-zero/repair/repairs/leak-down-test) |
| Head gasket leak | Air or soot at head joint | [Do a leak-down test](/moto-zero/repair/repairs/leak-down-test) |

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Compression pressure | 1.0 to 1.2 MPa | 60 |
| Valve clearance, cold | 0.05 to 0.07 mm | 202 |
