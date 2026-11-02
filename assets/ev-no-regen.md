---
id: ev-no-regen
title: Regenerative braking does not work
system: ev-drive
also_called: [no regen, engine braking missing electric, regen weak]
urgency: ok-to-ride
applies_to: [electric]
parts: [controller, brake_light_switch, throttle_sensor, traction_battery, bms]
repairs: [ev-regen-check, ev-error-read, ev-interlock-check, ev-controller-diagnosis, brake-switch-test]
related: [ev-cold-weather, ev-error-code, ev-range-drop, brake-light-dead]
sources:
  - {doc: "Harley-Davidson service information: Regenerative braking", url: "https://serviceinfo.harley-davidson.com/sip/service/procedure/2140462551782999685/BLAISE/2015105/en_US?nid=54502"}
  - {doc: "Battery University BU-410: Charging at high and low temperatures", url: "https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures"}
---

# Regenerative braking does not work

When you close the throttle or touch the brake, you no longer feel the gentle slowing you used to feel, or the regen bar on the dash does not move. **Regenerative braking** turns the motor into a generator that slows the bike and puts a little charge back in the battery. It is limited on purpose when the battery is full or cold (Harley-Davidson), so missing regen is often normal. If it is missing all the time, a setting, a switch or a fault code is usually the reason.

## Is it safe to ride?
Yes, the friction brakes still work. Remember regen never replaces the brakes. Expect the bike to roll further when you close the throttle, and brake earlier.

## Quick checks first
- Is the battery nearly full? Regen is reduced near 100%.
- Is it a cold morning?
- Is regen switched on in the mode or menu?
- Does your bike have regen at all? Check the manual.

## Diagnose it step by step

**1. Does your model have regen, and is it switched on?**
- No regen on this model: nothing to fix.
- Switched off: turn it on as the manual says. Done.
- Yes and on: go to step 2.

**2. Is the SoC near full (just charged or just swapped)?**
- Yes: ride until the SoC falls and test again. Normal behaviour.
- No: go to step 3.

**3. Is the battery cold (cold morning, bike parked outside)?**
- Yes: regen may be limited until the battery warms (Harley-Davidson). Cold lithium cells must not be charged hard (Battery University). Test again after riding.
- No: go to step 4.

**4. If your bike starts regen from the brake lever, does the brake light work with each lever?**
- No: a brake switch fault. [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test).
- Yes or not applicable: go to step 5.

**5. Does the throttle return fully closed?**
- No: [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check).
- Yes: go to step 6.

**6. Is there a code or warning?** [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read).
- Yes: many bikes turn off regen when there is a battery, motor or controller fault. Follow the code.
- No: full check: [Check regenerative braking](/moto-zero/repair/repairs/ev-regen-check), then the dealer or fleet workshop if still missing.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Battery full | SoC near 100% | Normal; ride and retest |
| Battery cold | Cold weather | Normal; retest when warm |
| Regen setting off | Menu or mode | Switch on |
| Brake switch fault | Brake light dead | [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test) |
| Fault code disables regen | Code shown | [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read) |
| Controller fault | All above good | [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis) |
