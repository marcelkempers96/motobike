---
id: ev-error-read
title: Read electric drive error codes
level: home
time: 10 to 20 min (estimate)
applies_to:
- electric
tools:
- phone camera
- owner's manual or official app
- notebook
parts:
- instruments
- controller
- bms
- motor_sensor
- throttle_sensor
consumables: []
fixes:
- ev-bms-cutoff
- ev-charge-jumps
- ev-charge-stops
- ev-charger-fault
- ev-controller-hot
- ev-cuts-out-accel
- ev-error-code
- ev-insulation-warning
- ev-judder
- ev-limp-mode
- ev-motor-hot
- ev-motor-noise
- ev-no-ready
- ev-no-regen
- ev-ready-no-drive
- ev-swap-not-recognised
- ev-throttle-dropout
- ev-wont-charge
---

# Read electric drive error codes

**Home mechanic (basic tools)** · Time: 10 to 20 min (estimate) (estimate)


When the controller, BMS or charger finds a problem, most electric motorcycles show a code, a symbol or a flashing pattern on the dashboard or in the app. This job is about reading and recording the code correctly so that you, the dealer or the fleet support line can find its meaning. **Codes are different on every make and model.** The same number can mean a throttle fault on one bike and a battery fault on another. Never guess a code's meaning from another brand or a generic list on the internet.

## Safety
- If the warning is about battery temperature, insulation or high voltage, or the pack is hot, swollen or smells, stop and see [Battery pack is hot, hissing or smells](/moto-zero/repair/problems/ev-pack-hot-smell) or [Insulation or high-voltage warning](/moto-zero/repair/problems/ev-insulation-warning).
- Stop somewhere safe before reading the dash. Do not read codes while riding.

## You need
- The owner's manual, the official app, or the fleet support number.
- A phone to photograph the dash.

## Steps
1. Stop safely and leave the bike switched on. Photograph the dash with the code or symbol visible.
2. Write down: the code exactly as shown (letters and numbers), the symbol colour, whether it flashes, the SoC, and what you were doing (starting, climbing, braking, charging, riding through water).
3. Look up the code in your manual or the official app. If you ride for a fleet or a swap network, call or message their support line with the photo and notes.
4. If the manual allows it, switch the bike off, wait, and switch it on once. Note whether the code returns at once, returns when you ride, or does not return.
5. Check the simple causes the manual lists for that code first: side stand, brake lever, kill switch, battery seated, charger plugged in. See [Check the throttle, brake and stand interlocks](/moto-zero/repair/repairs/ev-interlock-check) and [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check).
6. Some workshops and fleets read codes with a laptop or diagnostic tool. Ask for the full fault list with times, not just the current code.
7. Do not clear codes again and again to keep riding. A fault that keeps returning is the controller or BMS protecting the bike.

## Check your work
- You have a photo, the exact code, and notes of when it appears.
- You found its meaning in the official source for your model, not a guess.
- After the fix, the code does not return over a full ride.

## If it did not fix the problem
- Code points to the motor or its sensors: [Diagnose a motor fault](/moto-zero/repair/repairs/ev-motor-diagnosis).
- Code points to the controller: [Diagnose a controller fault](/moto-zero/repair/repairs/ev-controller-diagnosis).
- Code points to the battery or charging: [Diagnose a charging fault](/moto-zero/repair/repairs/ev-charge-diagnosis).
- Unknown code and no manual: hand the bike to the dealer or fleet workshop with your notes.

## Problems this repair helps with

- [Battery shuts off suddenly (BMS protection)](/moto-zero/repair/problems/ev-bms-cutoff)
- [Battery percentage jumps or drops suddenly](/moto-zero/repair/problems/ev-charge-jumps)
- [Charging stops before the battery is full](/moto-zero/repair/problems/ev-charge-stops)
- [Charger shows a fault light or stays off](/moto-zero/repair/problems/ev-charger-fault)
- [Controller overheats or shuts down](/moto-zero/repair/problems/ev-controller-hot)
- [Power cuts out when accelerating hard](/moto-zero/repair/problems/ev-cuts-out-accel)
- [Error code or warning on the dashboard](/moto-zero/repair/problems/ev-error-code)
- [Insulation or high-voltage warning](/moto-zero/repair/problems/ev-insulation-warning)
- [Bike judders or jerks when pulling away](/moto-zero/repair/problems/ev-judder)
- [Bike is in reduced power or limp mode](/moto-zero/repair/problems/ev-limp-mode)
- [Motor gets very hot or power drops after a long climb](/moto-zero/repair/problems/ev-motor-hot)
- [Grinding, clicking or growling from the motor](/moto-zero/repair/problems/ev-motor-noise)
- [Dashboard is on but the bike will not go to ready](/moto-zero/repair/problems/ev-no-ready)
- [Regenerative braking does not work](/moto-zero/repair/problems/ev-no-regen)
- [Bike shows ready but will not move](/moto-zero/repair/problems/ev-ready-no-drive)
- [Swapped battery is not recognised](/moto-zero/repair/problems/ev-swap-not-recognised)
- [Power cuts in and out with the throttle](/moto-zero/repair/problems/ev-throttle-dropout)
- [Battery will not charge](/moto-zero/repair/problems/ev-wont-charge)

## Parts for this job

| Part | Buy |
|---|---|
| [Instruments](/moto-zero/repair/parts/instruments) | [Find this part](/spare-parts/instruments) |
| [Motor controller](/moto-zero/repair/parts/controller) | [Find this part](/spare-parts/controller) |
| [Battery management system](/moto-zero/repair/parts/bms) | [Find this part](/spare-parts/bms) |
| [Motor position sensor](/moto-zero/repair/parts/motor_sensor) | [Find this part](/spare-parts/motor-sensor) |
| [Electric throttle sensor](/moto-zero/repair/parts/throttle_sensor) | [Find this part](/spare-parts/throttle-sensor) |

## Sources

- [em3ev: How to test e-bike motor Hall sensors](https://em3ev.com/?p=43276)
- [Ather Energy: Common electric scooter charging problems](https://www.atherenergy.com/blog/fixing-common-charging-problems-in-electric-scooters)
