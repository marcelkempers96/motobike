---
id: ev-regen-check
title: Check regenerative braking
level: home
time: 15 to 30 min (estimate)
applies_to:
- electric
tools:
- owner's manual or app
parts:
- controller
- brake_light_switch
- throttle_sensor
- traction_battery
- motor
consumables: []
fixes:
- ev-no-regen
- ev-range-drop
---

# Check regenerative braking

**Home mechanic (basic tools)** · Time: 15 to 30 min (estimate) (estimate)


**Regenerative braking** ("regen") uses the motor as a generator when you close the throttle or touch the brake. It slows the bike and sends a little energy back into the battery. Not every electric motorcycle has it, and on many it is set in a menu or by riding mode. Regen is controlled by the controller and BMS together, so it changes with conditions. Harley-Davidson service information says regen may be limited when the battery is cold or the state of charge is too high, and is not available when the powertrain is disabled.

## Safety
- Regen does not replace the friction brakes. Keep your hands ready on the brake levers (Harley-Davidson). Never ride relying on regen to stop.
- Test only on a quiet, straight road with no traffic behind you.

## Steps
1. Check your manual: does your bike have regen, and how is it set (mode, menu, app, brake switch)?
2. Check the setting is on and at the level you expect.
3. Check the state of charge. If the battery is at or near 100%, there is no space to store energy and regen is reduced or off. Ride until the SoC has dropped, then test again.
4. Check the temperature. After a cold night, regen may be limited until the battery warms. Cold lithium cells cannot safely take charge (Battery University), and regen is a form of charging.
5. If your bike starts regen when you touch the brake, check the brake switches work: the brake light should come on with each lever. See [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test).
6. If regen starts when you close the throttle, check the throttle returns fully: [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check).
7. Look for any warning code: [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read). Many bikes switch regen off when there is a battery, motor or controller fault.
8. Test ride at a steady speed on a flat road, close the throttle, and feel for the slowing effect. Compare with what you felt before the problem.

## Check your work
- Regen returns once the battery is below full and warm, with the setting on.
- No warning code.

## If it did not fix the problem
- Regen missing with a fault code, or missing in all conditions: dealer or fleet workshop. See [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).
- [Regenerative braking does not work](/moto-zero/repair/problems/ev-no-regen)

## Problems this repair helps with

- [Regenerative braking does not work](/moto-zero/repair/problems/ev-no-regen)
- [Range has dropped](/moto-zero/repair/problems/ev-range-drop)

## Parts for this job

| Part | Buy |
|---|---|
| [Motor controller](/moto-zero/repair/parts/controller) | [Find this part](/spare-parts/controller) |
| [Brake light switches](/moto-zero/repair/parts/brake_light_switch) | [Find this part](/spare-parts/brake-light-switch) |
| [Electric throttle sensor](/moto-zero/repair/parts/throttle_sensor) | [Find this part](/spare-parts/throttle-sensor) |
| [Traction battery pack](/moto-zero/repair/parts/traction_battery) | [Find this part](/spare-parts/traction-battery) |
| [Electric motor](/moto-zero/repair/parts/motor) | [Find this part](/spare-parts/motor) |

## Sources

- [Harley-Davidson service information: Regenerative braking](https://serviceinfo.harley-davidson.com/sip/service/procedure/2140462551782999685/BLAISE/2015105/en_US?nid=54502)
- [Battery University BU-410: Charging at high and low temperatures](https://batteryuniversity.com/article/bu-410-charging-at-high-and-low-temperatures)
