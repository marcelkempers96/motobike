---
id: hesitation
title: Hesitates or stumbles when opening the throttle
system: running
also_called: [stumble, bog on take-off, lag, coughs when accelerating]
urgency: ride-with-care
applies_to: [four-stroke, two-stroke, carburettor, fuel-injected, scooter-cvt]
parts: [carb, throttle_body, efi_sensors, intake_manifold, air_filter, spark_plug, throttle_cable, injector]
repairs: [throttle-cable-adjust, air-filter-service, intake-leak-test, carburettor-clean, carb-float-check, efi-code-read, efi-sensor-check, throttle-body-clean, injector-check, spark-plug-service, road-test, choke-check]
related: [flat-spot, bogs-full-throttle, runs-lean, runs-rich, choke-stuck, throttle-free-play, misfire-under-load, cvt-judder]
sources:
  - {doc: "MAVCC Motorcycle Mechanic", page: 351}
  - {doc: "MAVCC Motorcycle Mechanic", page: 349}
  - {doc: "K-Light 125 manual", page: 259}
  - {doc: "K-Light 125 manual", page: 274}
  - {doc: "K-Light 125 manual", page: 55}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/cv_carb.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/carb10.htm"}
---

# Hesitates or stumbles when opening the throttle

You open the throttle from idle or a steady speed, and for a moment the engine stumbles, coughs or goes flat before it picks up. When the throttle opens suddenly, air rushes in faster than fuel can follow, so the mixture goes lean for an instant. Carburettors use a transition circuit (and the shape of the slide) to cover this; injected bikes read the throttle position sensor and add fuel. A blocked circuit, an air leak or a wrong sensor reading lets the gap show.

## Is it safe to ride?

Yes, with care. A stumble when pulling out at a junction can leave you in the path of traffic; open the throttle gently until it is fixed.

## Quick checks first

- Is the engine fully warm? Many bikes hesitate when cold.
- Is the choke fully off (if warm), or still on (if cold)?
- Does the throttle have only a little free play (K-Light 125: 3 to 5 mm)? A lot of slack feels like a delay.
- Is the air filter clean?
- Did it start after the bike stood unused, or after a fuel stop?
- CV (vacuum slide) carburettor: engine suction lifts the slide, not the cable. A stumble then points to the slide, diaphragm or an air leak, not the cable.

## Diagnose it step by step

**1. Does it hesitate only when cold?**
- Yes: carburettor bikes, use the choke a little longer; if it persists, [check the choke](/moto-zero/repair/repairs/choke-check). Fuel-injected, go to step 5.
- No: go to step 2.

**2. Is there too much free play in the throttle, or a stiff cable?**
- Yes: [Adjust throttle free play](/moto-zero/repair/repairs/throttle-cable-adjust).
- No: go to step 3.

**3. Does the engine pop back through the intake, or does the idle change when you spray water on the intake joints?**
- Yes: lean. [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test), then see [Engine runs hot and lean](/moto-zero/repair/problems/runs-lean).
- Black smoke on opening, fuel smell, sooty plug: rich. Check the [air filter](/moto-zero/repair/repairs/air-filter-service) and see [Engine runs rich](/moto-zero/repair/problems/runs-rich).
- Neither: carburettor bikes go to step 4; fuel-injected go to step 5.

**4. Carburettor: has the bike stood for weeks, or has the carburettor not been cleaned for a long time?**
- Yes: the pilot and transition passages are probably partly blocked. [Clean the carburettor](/moto-zero/repair/repairs/carburettor-clean) and [check the float level](/moto-zero/repair/repairs/carb-float-check).
- CV (vacuum) carburettor: check the rubber diaphragm on the slide for pinholes or tears. A torn diaphragm makes the slide lift slowly or not at all.

**5. Fuel-injected: is a code stored?**
- Yes: [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read). A throttle position sensor code is a common cause.
- No: go to step 6.

**6. Fuel-injected: is the throttle body dirty or the throttle position reading uneven?**
- [Clean the throttle body](/moto-zero/repair/repairs/throttle-body-clean).
- Still hesitating: a workshop checks the throttle position sensor reading for dead spots: [Check the engine sensors](/moto-zero/repair/repairs/efi-sensor-check). Then the injector: [Check the fuel injector](/moto-zero/repair/repairs/injector-check).

**7. Still there after fuel checks?** [Service the spark plug](/moto-zero/repair/repairs/spark-plug-service) and do a [road test](/moto-zero/repair/repairs/road-test) to note exactly when it happens.

Scooters: a judder or stumble only when pulling away can be the drive clutch, not the engine. See [Scooter judders when pulling away](/moto-zero/repair/problems/cvt-judder).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Too much throttle free play | Grip turns before the engine responds | [Adjust free play](/moto-zero/repair/repairs/throttle-cable-adjust) |
| Air leak (lean) | Water spray test, popping | [Intake leak test](/moto-zero/repair/repairs/intake-leak-test) |
| Partly blocked pilot or transition circuit | Bike stood with fuel in it | [Clean carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Torn CV diaphragm | Pinholes when held to light | [Clean carburettor](/moto-zero/repair/repairs/carburettor-clean) |
| Dirty air filter (rich) | Black smoke, clogged filter | [Air filter](/moto-zero/repair/repairs/air-filter-service) |
| TPS fault or dirty throttle body (injection) | Code, uneven live data | [Sensor check](/moto-zero/repair/repairs/efi-sensor-check) |
| CV slide sticking or diaphragm torn | Slide does not lift or drop freely | [CV carburettor check](/moto-zero/repair/repairs/cv-carb-check) |
