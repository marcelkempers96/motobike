---
id: idle-relearn
title: Reset the idle after throttle body work
level: workshop
time: 15 to 45 min at a workshop with the right tool (estimate)
applies_to:
- fuel-injected
tools:
- diagnostic scan tool for your bike
- battery charger
parts:
- throttle_body
- efi_sensors
- ecu
- battery
consumables: []
fixes:
- cvt-creeps
- dirty-throttle-body
- hanging-revs
- high-idle
- hunting-idle
- stalls-at-idle
- starts-only-with-choke
- rough-idle
---

# Reset the idle after throttle body work

**Workshop job (assessment and hand-off)** · Time: 15 to 45 min at a workshop with the right tool (estimate) (estimate)


The ECU (engine control unit) learns small corrections over time: how far to open the idle air passage, what the throttle position sensor reads with the throttle closed, and how much fuel to trim. When you clean a dirty throttle body, replace a throttle position sensor, or disconnect the battery, those learned values no longer fit. The engine may idle too high, hunt, or stall when you close the throttle. Many bikes relearn on their own; some need a set procedure or a scan tool. This page is an **assessment and hand-off**.

## Safety

- Run the engine outdoors only; exhaust gas contains carbon monoxide.
- Keep the bike on its stand in neutral while it idles, and keep hands clear of the hot exhaust.
- Key OFF before touching any connector on the throttle body.

## What you can check safely

1. Make sure the basics are right first: no air leaks, throttle cable with free play so the plate closes fully, clean air filter, battery fully charged. See [Find an intake air leak](/moto-zero/repair/repairs/intake-leak-test) and [Adjust throttle free play](/moto-zero/repair/repairs/throttle-cable-adjust).
2. Turn the key ON and wait a few seconds before starting, so the idle motor can move to its start position.
3. Start from cold and let the engine warm up fully at idle without touching the throttle. A higher idle while cold is normal (K-Light 125: below 68 °C).
4. Ride normally for 10 to 20 minutes, including some stops at idle. Many bikes settle during this ride.
5. Read codes: an idle motor or throttle sensor code means a circuit fault, not a learning problem. See [Read engine fault codes](/moto-zero/repair/repairs/efi-code-read).

## What not to do

- Do not turn the idle stop screw on the throttle body to "fix" idle. The K-Light 125 manual says idle is controlled by the ECU and the screw should not be forced. Turning it changes the closed-throttle reading the ECU expects and can make things worse.
- Do not loosen and twist the throttle position sensor unless your manual gives a procedure and a reading to set it to.

## What the workshop will do

- Connect a scan tool and run the bike's own idle or throttle reset routine, if it has one. Some bikes use a key-on and throttle sequence instead; the workshop follows the model manual.
- Check live data: closed-throttle sensor reading, idle motor steps, engine temperature and idle speed against the target.
- On the K-Light 125, measure the idle stepper motor windings (50 ± 10 % Ω between each pair at 20 to 30 °C) and its wiring if it does not respond.
- If the ECU software is suspect, refresh it with the manufacturer's tool. The K-Light 125 manual says the ECU itself cannot be repaired.

## What to ask for

- "Please read codes and live data, run the idle or throttle reset for this model, and show me the idle speed when warm."

## Check your work

- Warm idle at the manual speed (K-Light 125: 1500 ± 100 rpm), steady, and clean return to idle after blipping the throttle.

## Reference values (K-Light 125)

| Item | Value | PDF page |
|---|---|---|
| Idle speed | 1500 ± 100 rpm | 49 |
| ECU fast idle | Below 68 °C | 276 |
| Idle stepper winding resistance (workshop) | 50 ± 10 % Ω at 20 to 30 °C | 266 |

## Problems this repair helps with

- [Scooter creeps forward at idle or the rear wheel turns on the stand](/moto-zero/repair/problems/cvt-creeps)
- [Unstable idle after cleaning or battery disconnection (fuel-injected)](/moto-zero/repair/problems/dirty-throttle-body)
- [Revs hang or drop slowly after closing the throttle](/moto-zero/repair/problems/hanging-revs)
- [Idle speed is too high](/moto-zero/repair/problems/high-idle)
- [Idle speed rises and falls on its own](/moto-zero/repair/problems/hunting-idle)
- [Engine stalls at idle or at junctions](/moto-zero/repair/problems/stalls-at-idle)
- [Starts only with the choke on or the throttle held open](/moto-zero/repair/problems/starts-only-with-choke)
- [Rough, lumpy or uneven idle](/moto-zero/repair/problems/rough-idle)

## Parts for this job

| Part | Buy |
|---|---|
| [Throttle body](/moto-zero/repair/parts/throttle_body) | [Find this part](/spare-parts/throttle-body) |
| [Engine sensors (TPS, MAP, temperature)](/moto-zero/repair/parts/efi_sensors) | [Find this part](/spare-parts/efi-sensors) |
| [ECU](/moto-zero/repair/parts/ecu) | [Find this part](/spare-parts/ecu) |
| [12 V battery](/moto-zero/repair/parts/battery) | [Find this part](/spare-parts/battery) |

## Sources

- K-Light 125 manual, PDF p. 49
- K-Light 125 manual, PDF p. 258
- K-Light 125 manual, PDF p. 266
- K-Light 125 manual, PDF p. 274
- K-Light 125 manual, PDF p. 276
