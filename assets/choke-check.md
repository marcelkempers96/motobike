---
id: choke-check
title: Check the choke or starter valve
level: home
time: 20 to 45 min (estimate)
applies_to:
- carburettor
- fuel-injected
- four-stroke
- two-stroke
- scooter-cvt
tools:
- screwdrivers
- spanners
- torch
- multimeter (automatic chokes)
- rags
parts:
- carb
- choke_cable
- throttle_body
- efi_sensors
consumables:
- cable lubricant
- carburettor cleaner
fixes:
- black-smoke
- bogs-full-throttle
- choke-cable-fault
- choke-stuck
- flooded-engine
- fuel-smell
- hanging-revs
- hard-cold-start
- hard-hot-start
- hesitation
- high-fuel-use
- high-idle
- plug-black-sooty
- runs-rich
- starts-then-dies
- starts-only-with-choke
---

# Check the choke or starter valve

**Home mechanic (basic tools)** · Time: 20 to 45 min (estimate) (estimate)


A cold engine needs a richer mixture to start, because cold fuel does not turn to vapour easily. The choke gives this extra fuel. If it sticks ON, the warm engine runs rich, smokes black, wastes fuel and may stall. If it never works, the engine is hard to start cold. There are four common types:

| Type | Where | How it works |
|---|---|---|
| Butterfly choke | Older carburettors, many small commuters | A flap closes the carburettor inlet so the engine sucks harder on the jets |
| Starter plunger (enrichener) | Most modern carburettors | A plunger opens its own small jet and air passage; works only with the throttle closed |
| Automatic choke | Many carburettor scooters | An electric heater or wax element closes the plunger as the engine warms |
| ECU fast idle | Fuel-injected bikes | No choke. The ECU adds fuel and raises idle while cold |

## Safety

- Engine cold before you touch the carburettor; run engine tests outdoors.
- Do not hold the throttle open while using a starter plunger: it stops working.

## Steps

**Lever or knob choke (butterfly or plunger)**

1. Work the choke lever from OFF to ON. It should move smoothly and stay where you leave it.
2. Remove the air filter cover if needed and watch the butterfly or the plunger at the carburettor. In OFF the flap must be fully open, or the plunger fully seated (all the way down).
3. If the plunger does not seat, check the cable has a little free play at OFF. Adjust it, or see [Adjust the choke cable](/moto-zero/repair/repairs/choke-cable-adjust).
4. Unscrew the plunger nut and pull the plunger out. Clean varnish from the plunger and its bore with carburettor cleaner. Replace the plunger if its rubber tip is damaged.
5. A stiff, frayed or kinked cable: see [Choke lever or cable does not work](/moto-zero/repair/problems/choke-cable-fault).

**Automatic choke (scooters)**

6. Cold engine: the plunger should be out (rich). After a few minutes of running it should move in. If idle stays fast and black smoke continues when warm, the automatic choke is not closing.
7. Check its two-pin connector is clean and tight. With a multimeter, a workshop can check the heater resistance and its power supply with the engine running against your manual's values. A failed automatic choke is replaced as a unit.

**Fuel-injected bikes**

8. A raised idle when cold is normal. The K-Light 125 ECU raises idle until the engine reaches 68 °C. If the idle stays high when fully warm, or starting cold is hard, the cause is usually the temperature sensor or idle air control. See [Check the engine sensors](/moto-zero/repair/repairs/efi-sensor-check) and [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read).

## Check your work

- Cold: the engine starts with the choke ON and idles fast.
- Warm, choke OFF: normal idle, no black smoke, no fuel smell at the exhaust.

## If it did not fix the problem

- Starts only with the choke even when warm: the pilot circuit is blocked or there is an air leak. See [Starts only with the choke on](/moto-zero/repair/problems/starts-only-with-choke).
- Hard cold start with a working choke: see [Hard to start when cold](/moto-zero/repair/problems/hard-cold-start).

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| ECU fast idle | Active below 68 °C engine temperature | 276 |

## Problems this repair helps with

- [Black smoke from the exhaust](/moto-zero/repair/problems/black-smoke)
- [Bogs down or chokes at full throttle](/moto-zero/repair/problems/bogs-full-throttle)
- [Choke lever or cable does not work](/moto-zero/repair/problems/choke-cable-fault)
- [Choke is stuck on or will not work](/moto-zero/repair/problems/choke-stuck)
- [Engine is flooded and smells of fuel](/moto-zero/repair/problems/flooded-engine)
- [Strong smell of fuel around the bike](/moto-zero/repair/problems/fuel-smell)
- [Revs hang or drop slowly after closing the throttle](/moto-zero/repair/problems/hanging-revs)
- [Hard to start when the engine is cold](/moto-zero/repair/problems/hard-cold-start)
- [Hard to start when the engine is hot](/moto-zero/repair/problems/hard-hot-start)
- [Hesitates or stumbles when opening the throttle](/moto-zero/repair/problems/hesitation)
- [Uses more fuel than normal](/moto-zero/repair/problems/high-fuel-use)
- [Idle speed is too high](/moto-zero/repair/problems/high-idle)
- [Spark plug is black and sooty](/moto-zero/repair/problems/plug-black-sooty)
- [Engine runs rich, smells of fuel and smokes black](/moto-zero/repair/problems/runs-rich)
- [Engine starts, then dies after a few seconds](/moto-zero/repair/problems/starts-then-dies)
- [Starts only with the choke on or the throttle held open](/moto-zero/repair/problems/starts-only-with-choke)

## Parts for this job

| Part | Buy |
|---|---|
| [Carburettor](/moto-zero/repair/parts/carb) | [Find this part](/spare-parts/carb) |
| [Choke cable](/moto-zero/repair/parts/choke_cable) | [Find this part](/spare-parts/choke-cable) |
| [Throttle body](/moto-zero/repair/parts/throttle_body) | [Find this part](/spare-parts/throttle-body) |
| [Engine sensors (TPS, MAP, temperature)](/moto-zero/repair/parts/efi_sensors) | [Find this part](/spare-parts/efi-sensors) |

## Sources

- MAVCC Motorcycle Mechanic, PDF p. 353
- MAVCC Motorcycle Mechanic, PDF p. 349
- Unit 2 The Motorcycle, PDF p. 29
- K-Light 125 manual, PDF p. 276
- K-Light 125 manual, PDF p. 266
