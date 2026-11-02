---
id: ev-interlock-check
title: Check the throttle, brake and stand interlocks
level: home
time: 15 to 30 min (estimate)
applies_to:
- electric
tools:
- owner's manual
- multimeter
- small screwdriver set
parts:
- interlock_switches
- brake_light_switch
- throttle_sensor
- handlebar_switches
- side_stand
- wiring
consumables:
- contact cleaner
fixes:
- ev-error-code
- ev-no-ready
- ev-no-regen
- ev-ready-no-drive
- ev-throttle-dropout
---

# Check the throttle, brake and stand interlocks

**Home mechanic (basic tools)** · Time: 15 to 30 min (estimate) (estimate)


An **interlock** is a safety switch that stops the motor driving when it is not safe. Electric bikes have no clutch or engine noise to warn you, so the controller blocks drive until the right conditions are met. Common interlocks are the **side stand switch** (no drive with the stand down), **brake switches** (on many bikes you must hold a brake while pressing start to go to ready, and pulling a brake cuts drive), the **kill or run switch**, a **seat switch** on some scooters, and the **throttle sensor**, which must read "closed" at start-up. The exact rules differ by model: check your manual.

## Safety
- Put the bike on the centre stand or a paddock stand with the drive wheel off the ground before testing whether it drives. An electric motor gives full torque at once and can throw the bike off the stand.
- Keep hands, clothes and tools away from the rear wheel and chain or belt.
- Do not bypass or bridge any interlock switch. They stop the bike moving while you stand next to it.

## You need
- The owner's manual, which says what you must do to reach ready and what symbol shows each interlock.
- A multimeter for checking switches (low-voltage side only).

## Steps
1. Read the manual's start-up steps: which brake to hold, which button to press, where the side stand must be.
2. Put the bike on its stand with the drive wheel free. Switch on and follow the start steps exactly. Watch the dash for a stand, brake or ready symbol.
3. Side stand: move the stand up and down. Watch the symbol change. If it does not, check the switch is not loose, bent or full of mud, and see [Test the side stand, clutch and neutral switches](/moto-zero/repair/repairs/interlock-switch-test).
4. Brakes: pull each lever or press the pedal. The brake light should come on each time. If not, see [Test and adjust the brake light switches](/moto-zero/repair/repairs/brake-switch-test). A brake switch stuck "on" can block drive.
5. Kill/run switch and mode buttons: work them a few times. A dirty switch can cut drive: see [Clean a handlebar switch](/moto-zero/repair/repairs/switch-clean).
6. Throttle: with the bike off, twist and release. It must snap back by itself and not stick. A throttle that is not fully closed at start-up blocks ready on many bikes. A sticking twist grip: see [Throttle sticks or does not snap shut](/moto-zero/repair/problems/throttle-sticks).
7. Check the throttle cable or wire at the handlebar: pinched, stretched when you turn the bars full lock, or rubbing. Turn the bars lock to lock with the bike on and wheel free: if drive cuts or surges, the wire is damaged.
8. Seat switch (some scooters): close the seat firmly and check the symbol.
9. If all switches work but the bike still will not drive, read the error code: [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read). Testing throttle sensor output voltages needs the manufacturer's values: this is workshop work.

## Check your work
- Each interlock changes the dash symbol as the manual says.
- The bike goes to ready only when the conditions are met, and drive stops when the stand goes down or the brake is pulled (where the model does this).
- Throttle snaps shut and drive is smooth with the bars at full lock both ways.

## If it did not fix the problem
- Still no ready: [Dashboard is on but the bike will not go to ready](/moto-zero/repair/problems/ev-no-ready).
- Ready but no drive: [Bike shows ready but will not move](/moto-zero/repair/problems/ev-ready-no-drive).
- Throttle sensor or wiring suspected: [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).

## Problems this repair helps with

- [Error code or warning on the dashboard](/moto-zero/repair/problems/ev-error-code)
- [Dashboard is on but the bike will not go to ready](/moto-zero/repair/problems/ev-no-ready)
- [Regenerative braking does not work](/moto-zero/repair/problems/ev-no-regen)
- [Bike shows ready but will not move](/moto-zero/repair/problems/ev-ready-no-drive)
- [Power cuts in and out with the throttle](/moto-zero/repair/problems/ev-throttle-dropout)

## Parts for this job

| Part | Buy |
|---|---|
| [Side stand, clutch and neutral switches](/moto-zero/repair/parts/interlock_switches) | [Find this part](/spare-parts/interlock-switches) |
| [Brake light switches](/moto-zero/repair/parts/brake_light_switch) | [Find this part](/spare-parts/brake-light-switch) |
| [Electric throttle sensor](/moto-zero/repair/parts/throttle_sensor) | [Find this part](/spare-parts/throttle-sensor) |
| [Handlebar switches](/moto-zero/repair/parts/handlebar_switches) | [Find this part](/spare-parts/handlebar-switches) |
| [Side stand and spring](/moto-zero/repair/parts/side_stand) | [Find this part](/spare-parts/side-stand) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |

## Sources

- [Gogoro Smart Battery and GoStation safety information](https://gogoro.com/product-information)
- [Harley-Davidson service information: Regenerative braking](https://serviceinfo.harley-davidson.com/sip/service/procedure/2140462551782999685/BLAISE/2015105/en_US?nid=54502)
