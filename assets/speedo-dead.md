---
id: speedo-dead
title: Speedometer or odometer does not work
system: lighting
also_called: [speedo not working, odometer stopped, speed reading jumps, km counter stuck]
urgency: ride-with-care
applies_to: [all]
parts: [speed_sensor, speedo_cable, instruments, wiring, abs, front_wheel]
repairs: [speedo-cable-replace, speed-sensor-check, wheel-remove-front, dash-power-check, connector-clean, abs-check]
related: [speedo-cable-fault, abs-light, dash-dead, intermittent-electrical]
sources:
  - {doc: "K-Light 125 manual", page: 130}
  - {doc: "K-Light 125 manual", page: 140}
  - {doc: "K-Light 125 manual", page: 278}
---

# Speedometer or odometer does not work

The speed reading stays at zero, jumps around, or the odometer (distance counter) stops counting, while the rest of the dashboard works. Older and many low-cost bikes drive the speedometer with a cable from a small gearbox on the front wheel. Newer bikes use an electronic speed sensor, and many ABS bikes take the speed from the ABS wheel sensor. The fix depends on which you have.

## Is it safe to ride?
With care. You cannot judge your speed, and service intervals based on distance will be missed. If the ABS warning lamp is also on, assume ABS may not work and brake gently.

## Quick checks first
- Look behind the speedometer: is there a cable going into it, or only a wire plug?
- Did it stop after the front wheel was removed or a tyre changed?
- Is the ABS lamp on as well?
- Does the reading jump over bumps? That suggests a loose wire or cable.
- Is the rest of the dashboard dead too? Then see [Instruments or dashboard are dead](/moto-zero/repair/problems/dash-dead).

## Diagnose it step by step

**1. Does your bike use a speedometer cable?**
- Yes: go to step 2.
- No (wire plug only): go to step 4.

**2. Does the cable inner turn when you turn the front wheel?** Unscrew the cable at the speedometer end. Lift the front wheel and turn it by hand. Watch the square tip of the inner cable.
- It turns: the cable is good, so the speedometer head is faulty. Replace or repair the head.
- It does not turn: go to step 3.

**3. Is the cable broken, or is the drive at the wheel not turning?** Pull the inner cable out from the top. If it comes out in two pieces, it is broken: [Replace the speedometer cable](/moto-zero/repair/repairs/speedo-cable-replace). If it is whole, the drive at the wheel is not turning it. The drive gearbox has tabs that must sit in slots in the hub when the wheel is fitted; the K-Light manual warns that it is damaged if not located correctly, and says to turn the wheel after fitting the axle to check the drive turns (PDF p. 140). Refit the wheel correctly: [Remove and refit the front wheel](/moto-zero/repair/repairs/wheel-remove-front). See also [Speedometer cable is noisy or broken](/moto-zero/repair/problems/speedo-cable-fault).

**4. Is the ABS lamp on?**
- Yes: the speed may come from the ABS sensor. Go to [Diagnose an ABS warning light](/moto-zero/repair/repairs/abs-check) and [ABS warning light is on](/moto-zero/repair/problems/abs-light).
- No: go to step 5.

**5. Is the speed sensor clean, tight and plugged in?** Follow the sensor wire from the wheel or gearbox. The K-Light 125 wiring diagram shows a speed sensor wired to the meter (PDF p. 278); its front wheel drawing also shows a drive housing in the hub (PDF p. 130), so check what your bike has. Clean metal dust from the sensor tip and toothed ring, check the plug and look for a cut wire.
- Dirty, loose or cut: clean, refit or repair: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- All good: go to step 6.

**6. Does the sensor give a signal?** Use a multimeter as in [Check the speed sensor](/moto-zero/repair/repairs/speed-sensor-check). In short: for a three-wire sensor, set DC volts (V with a straight line), check power and earth at the plug, then back-probe the signal wire and turn the wheel slowly: the reading should switch between low and high. For a two-wire sensor, set AC volts (V with a wavy line) on its pins and spin the wheel: a small reading should appear.
- No signal with good power and earth: replace the sensor.
- Signal good: the wire to the dashboard or the dashboard input is faulty. Check the wire for continuity, then [Check power to the instruments](/moto-zero/repair/repairs/dash-power-check). If all good, the dashboard needs dealer diagnosis.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Broken speedometer cable | Inner cable in two pieces | [Replace the speedometer cable](/moto-zero/repair/repairs/speedo-cable-replace) |
| Speedo drive not engaged after wheel refit | Cable does not turn, drive tabs out of slots | [Remove and refit the front wheel](/moto-zero/repair/repairs/wheel-remove-front) |
| Dirty, loose or damaged speed sensor or plug | Visual, no signal | [Check the speed sensor](/moto-zero/repair/repairs/speed-sensor-check) |
| ABS sensor fault (ABS bikes) | ABS lamp on | [Diagnose an ABS warning light](/moto-zero/repair/repairs/abs-check) |
| Broken wire to dashboard | No continuity | [Check the speed sensor](/moto-zero/repair/repairs/speed-sensor-check) |
| Faulty speedometer head or dashboard | Good input, no reading | Replace head, or dealer |
