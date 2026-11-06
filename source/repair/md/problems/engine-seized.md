---
id: engine-seized
title: Engine has seized or locked up
system: engine
also_called: [engine locked, engine jammed, piston seized, engine will not turn]
urgency: stop-now
applies_to: [four-stroke, two-stroke]
parts: [piston, cylinder, crankshaft, engine_oil, two_stroke_oil_pump, starter_clutch, kickstarter]
repairs: [oil-level-check, two-stroke-oil-pump, compression-test, top-end-assessment, engine-internal-assessment, air-cooling-check]
related: [overheating-air, overheating-liquid, two-stroke-oil-not-used, deep-knock, kickstart-jammed, starter-clicks, oil-warning-light, brake-drag, chain-snapped]
sources:
  - {doc: "K-Light 125 manual", page: 196}
  - {doc: "K-Light 125 manual", page: 191}
  - {doc: "Unit 2 The Motorcycle", page: 19}
  - {doc: "MAVCC Motorcycle Mechanic", page: 782}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/pistons.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/seizure.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/engine_breakin.htm"}
---

# Engine has seized or locked up

A seized engine is one where the piston has welded itself to the cylinder wall from heat and lack of oil, or a bearing has locked. While riding, the engine suddenly loses power, may squeal, and the rear wheel can lock. After stopping, the kickstart or starter will not turn the engine. The K-Light manual lists no or low oil pressure and blocked oil passages as causes of seizure. On two-strokes, an empty oil tank, a failed oil pump or a lean mixture are the usual causes.

## Is it safe to ride?
No. If it happens while riding, pull the clutch lever in at once (or let the scooter coast), steer to the side and stop. Pulling the clutch stops the rear wheel locking.

## Quick checks first
- Pull the clutch in and get off the road safely before anything else.
- Did the engine overheat, lose power or squeal first?
- Oil level (four-stroke) or oil tank level (two-stroke)?
- Is it the engine that is locked, or the gearbox, chain or rear brake?
- On a two-stroke, long steady running at one throttle setting can seize it even when it is not pushed hard. See [Two-stroke seizes after long steady running](/moto-zero/repair/problems/two-stroke-steady-seizure).
- A new or rebuilt engine run hard before it is broken in can also seize: [Break in a new or rebuilt engine](/moto-zero/repair/repairs/engine-break-in).

## Diagnose it step by step

**1. In neutral, can you push the bike freely?**
- No, the rear wheel is locked even in neutral: the problem is the wheel, brake or chain. See [Brake drags and the wheel does not spin freely](/moto-zero/repair/problems/brake-drag) or [Chain has snapped](/moto-zero/repair/problems/chain-snapped).
- Yes: go to step 2.

**2. Let the engine cool for at least an hour. Remove the spark plug. In top gear, rock the rear wheel gently. Does the engine turn at all?**
- Yes, it turns after cooling: the piston "nipped" (partly seized) and freed as it cooled. Go to step 3.
- No: go to step 5.

**3. Check the oil level ([Check the engine oil level](/moto-zero/repair/repairs/oil-level-check)) or the two-stroke oil tank. Was it low or empty?**
- Yes: refill. On a two-stroke, also do [Check the two-stroke oil pump and lines](/moto-zero/repair/repairs/two-stroke-oil-pump). Go to step 4.
- No: suspect overheating or lean running. See [Air-cooled engine overheats](/moto-zero/repair/problems/overheating-air) or [Liquid-cooled engine overheats](/moto-zero/repair/problems/overheating-liquid). Go to step 4.

**4. Do [Test engine compression](/moto-zero/repair/repairs/compression-test). Is it within the manual range?**
- Yes: the damage may be light. Ride very gently on a short test only after the cause is fixed. Recheck compression after 100 km.
- No: the piston and cylinder are scored. Go to [Assess the top end (cylinder, piston, valves)](/moto-zero/repair/repairs/top-end-assessment).

**5. Engine still locked solid when cold.**
- Do not force it with the starter, a long lever or bump starting. You can break the crank or the starter clutch.
- Ask the workshop for [Assess the top end (cylinder, piston, valves)](/moto-zero/repair/repairs/top-end-assessment) first, then [Assess bottom end and internal engine damage](/moto-zero/repair/repairs/engine-internal-assessment) if the piston is free and the crank is still locked.

**6. Is the kickstart jammed but the engine turns by the wheel?**
- Yes: the fault is in the kickstart, not the engine: [Kickstarter will not move or does not spring back](/moto-zero/repair/problems/kickstart-jammed).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Low or no engine oil | Dipstick empty, oil light | [Assess the top end (cylinder, piston, valves)](/moto-zero/repair/repairs/top-end-assessment) |
| Two-stroke oil not delivered | Tank level unchanged | [Check the two-stroke oil pump and lines](/moto-zero/repair/repairs/two-stroke-oil-pump) |
| Overheating, lean mixture | White plug, blocked fins or low coolant | [Check air cooling (fins, airflow, mixture)](/moto-zero/repair/repairs/air-cooling-check) |
| Bearing seizure | Crank locked with piston free | [Assess bottom end and internal engine damage](/moto-zero/repair/repairs/engine-internal-assessment) |
| Hard riding on a new rebuild | Seized soon after rebuild | [Assess the top end (cylinder, piston, valves)](/moto-zero/repair/repairs/top-end-assessment) |
| Overheated cylinder and melted piston | Smeared aluminium on the bore, blued or discoloured wall | Workshop: new cylinder or liner, and check the head for flatness |
| Long steady throttle on a two-stroke | Piston scored or melted over the exhaust port after a steady-speed ride | Rebuild the top end; vary the throttle in future |

