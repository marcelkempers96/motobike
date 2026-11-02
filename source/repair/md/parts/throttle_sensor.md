---
id: throttle_sensor
name: Electric throttle sensor
category: ev
aliases: [twist grip sensor, Hall throttle, throttle position sensor]
applies_to: [electric]
sources:
  - {doc: "Levy Electric: how to test an electric scooter throttle", url: "https://www.levyelectric.com/resources/how-to-test-your-electric-scooter-throttle-a-step-by-step-guide"}
---

# Electric throttle sensor

On an electric bike, the twist grip has no cable. A sensor inside the grip housing reads how far you turn it and sends a signal to the [Motor controller](/moto-zero/repair/parts/controller) through a thin three-wire cable.

## What it does
Most use a Hall effect sensor: a small magnet in the grip moves past a sensor chip, and the chip's output voltage changes with grip position. The three wires are a supply from the controller, a ground and the signal back. The controller turns the signal into motor current. A spring returns the grip to closed. Water, a cracked housing, a broken wire in the bars or a loose magnet give a jumpy or missing signal. A signal stuck high is dangerous because the motor can keep driving.

## Signs it is worn or failing
- Power cuts in and out: [Power cuts in and out with the throttle](/moto-zero/repair/problems/ev-throttle-dropout).
- Ready but no drive: [Bike shows ready but will not move](/moto-zero/repair/problems/ev-ready-no-drive).
- Jerky pull-away: [Bike judders](/moto-zero/repair/problems/ev-judder).
- Grip does not snap back, or the bike keeps driving after you close it: switch off at once and do not ride.
- Throttle error code: [Error code on the dashboard](/moto-zero/repair/problems/ev-error-code).

## When to replace it
Clean and dry the connector first and check the wiring. Replace the sensor or grip unit if the signal is still erratic or does not return to idle, the housing is cracked, or the spring is weak.

## What to match when buying
- Exact part for your bike. Supply voltage, signal range, connector and wire order differ between makers. A wrong throttle can give full power at rest.
- Check the connector shape and the number of pins; some grips include switches.
- Buy from the maker or dealer; cheap universal throttles often use a different signal range.

## Fitting notes
- Switch off and lift the drive wheel off the ground before testing.
- Route the cable so it is not pulled at full steering lock.
- See [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check).
