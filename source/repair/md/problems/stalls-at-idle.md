---
id: stalls-at-idle
title: Engine stalls at idle or at junctions
system: running
also_called: [dies at idle, cuts out at traffic lights, will not tick over]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected, semi-auto, scooter-cvt]
parts: [carb, throttle_body, air_filter, spark_plug, intake_manifold, efi_sensors, throttle_cable, clutch]
repairs: [carb-idle-adjust, air-filter-service, spark-plug-service, intake-leak-test, carburettor-clean, efi-code-read, throttle-body-clean, idle-relearn, valve-clearance, compression-test]
related: [rough-idle, hunting-idle, stalls-when-hot, starts-only-with-choke, dirty-throttle-body, clutch-drag, cvt-creeps, dies-side-stand, low-compression]
sources:
  - {doc: "K-Light 125 manual", page: 26}
  - {doc: "K-Light 125 manual", page: 49}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "MAVCC Motorcycle Mechanic", page: 659}
  - {doc: "MAVCC Motorcycle Mechanic", page: 349}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/carb8a.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/carb11.htm"}
---

# Engine stalls at idle or at junctions

The engine runs while you ride but dies when you close the throttle, slow down or stop at a junction. To idle, an engine needs a small, correct flow of air and fuel through the idle circuit, a good spark and enough compression. A low idle setting, a blocked pilot jet, a dirty throttle body or an air leak are the usual causes.

## Is it safe to ride?

Yes, with care. Stalling in traffic is dangerous: keep a finger on the throttle at junctions and fix it soon.

## Quick checks first

- Is the choke fully off once warm (carburettor bikes)?
- Is the engine warning light on (fuel-injected bikes)?
- Does the throttle close fully and have a little free play?
- When was the air filter last cleaned?
- Does it stall only when you pull the clutch or select first gear?

## Diagnose it step by step

**1. Does it stall only in the first few minutes from cold, then idle well?**
- Yes, carburettor: use the choke a little longer. If it needs the choke even when warm, go to [Starts only with the choke on](/moto-zero/repair/problems/starts-only-with-choke). Fuel-injected: go to step 6.
- No: go to step 2.

**2. Does it stall when you select a gear, or when you pull the clutch at a stop, but idle normally in neutral?**
- Yes, manual clutch: the clutch is dragging and pulling the engine down. Go to [Clutch drags](/moto-zero/repair/problems/clutch-drag). Scooter: see [Scooter creeps forward at idle](/moto-zero/repair/problems/cvt-creeps).
- It dies when the side stand moves: go to [Engine dies when the side stand moves](/moto-zero/repair/problems/dies-side-stand).
- No: go to step 3.

**3. Is the air filter clean and the spark plug in good condition?**
- No: [clean or replace the air filter](/moto-zero/repair/repairs/air-filter-service) and [service the spark plug](/moto-zero/repair/repairs/spark-plug-service). A black, wet plug means a rich idle.
- Yes: go to step 4.

**4. Carburettor bikes: when warm, is idle slower than your manual's figure?**
- Yes: set idle speed and mixture: [Adjust carburettor idle speed and mixture](/moto-zero/repair/repairs/carb-idle-adjust).
- The pilot screw makes no difference: the pilot jet is blocked. [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean).
- Idle is correct but it still dies: go to step 5.

**5. Does the idle change when you spray water on the intake rubber joints?**
- Yes: you have an air leak. [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test).
- No: carburettor bikes go to step 7; fuel-injected bikes go to step 6.

**6. Fuel-injected bikes: is the warning light on or a code stored?**
- Yes: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read) and follow the code.
- No: the throttle body or idle passage is probably dirty. [Clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean), then [reset the idle](/moto-zero/repair/repairs/idle-relearn) if it is still unstable.

**7. Still stalling?**
- Check the [valve clearance](/moto-zero/repair/repairs/valve-clearance). The K-Light 125 manual lists a too-small clearance as a cause of low idle. Then do a [compression test](/moto-zero/repair/repairs/compression-test). Low compression: see [Low compression](/moto-zero/repair/problems/low-compression).

What happens if you ignore it: the bike stalls at the worst moment in traffic, and repeated restarting flattens the battery.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Idle set too low (carburettor) | Warm idle below the manual figure | [Adjust idle](/moto-zero/repair/repairs/carb-idle-adjust) |
| Blocked pilot jet or old fuel varnish | Pilot screw has no effect; bike stood for weeks | [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Dirty throttle body or idle passage (injection) | Black film around the throttle plate | [Clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean) |
| Dirty air filter or fouled plug | Filter clogged; plug black or wet | [Air filter](/moto-zero/repair/repairs/air-filter-service), [spark plug](/moto-zero/repair/repairs/spark-plug-service) |
| Intake air leak | Idle changes with water spray | [Find an intake leak](/moto-zero/repair/repairs/intake-leak-test) |
| Clutch drag pulling the engine down | Stalls only in gear | [Clutch drags](/moto-zero/repair/problems/clutch-drag) |
| Valve clearance too small, low compression | Feeler gauge, compression gauge | [Valve clearance](/moto-zero/repair/repairs/valve-clearance) |
| Needle held off its seat by dirt (flooding) | Fuel smell, wet plug; tapping the carburettor sometimes cures it | [Replace the needle and seat](/moto-zero/repair/repairs/needle-seat-replace) |
| Starter plunger not fully closed | Engine stalls after warm-up with the plunger pressed home | [Starter plunger check](/moto-zero/repair/repairs/starter-plunger-check) |

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Idle speed | 1500 ± 100 rpm | 49 |
| ECU fast idle while cold | Below 68 °C | 276 |
