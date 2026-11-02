---
id: speed-sensor-check
title: Check the speed sensor
level: home
time: 20 to 40 min
applies_to:
- all
tools:
- digital multimeter
- thin pin for back-probing
- screwdrivers
- spanners
- torch
- clean cloth
parts:
- speed_sensor
- instruments
- speedo_cable
- wiring
- abs
consumables:
- electrical contact cleaner
fixes:
- speedo-cable-fault
- speedo-dead
---

# Check the speed sensor

**Home mechanic (basic tools)** · Time: 20 to 40 min (estimate)


The speedometer and odometer get their signal in one of three ways: a **cable** turned by a gear at the front wheel or gearbox; an **electronic speed sensor** that reads a toothed ring, magnet or gearbox shaft; or, on many ABS bikes, the **ABS wheel speed sensor**, with the dashboard getting the speed over the CAN-bus. This page checks the electronic sensor. Cable speedometers are covered in [Replace the speedometer cable](/moto-zero/repair/repairs/speedo-cable-replace).

## Safety
- A wrong or dead speedometer means you cannot judge your speed. Ride with extra care until it is fixed.
- On an ABS bike, the same sensor may tell the ABS unit wheel speed. If the ABS lamp is also on, assume ABS may not work and see [ABS warning light is on](/moto-zero/repair/problems/abs-light).
- Support the bike so the wheel you test can turn freely and the bike cannot fall.

## You need
- To know which system you have. Look at the back of the speedometer for a cable, and at the front hub, rear hub or gearbox sprocket cover for a sensor with a wire. The K-Light 125 wiring diagram shows a speed sensor wired to the meter (PDF p. 278), but its front wheel drawing also shows a speedometer gear housing in the hub (PDF p. 130). Check your own bike.
- A multimeter: DC volts (V with a straight line, 20 V range), AC volts (V with a wavy line), and continuity (beep).

## Steps
1. **Look at the sensor.** Follow the wire from the sensor. Check that the sensor is tight in its mount, that the wire is not cut or chafed by the wheel or chain, and that the plug is fully pushed in.
2. **Clean the tip and the ring.** Metal dust, mud and chain grease on the sensor tip or the toothed ring or magnet weaken the signal. Wipe both clean. Check the ring for bent or missing teeth.
3. **Check the gap.** The sensor tip sits close to the ring. If the sensor has been knocked, or the wheel was refitted wrongly, the gap may be too wide. Use the gap in your manual; this page does not give one.
4. **Check the drive after wheel work.** If the speedometer stopped after the front wheel was removed, the speedometer drive may not be engaged. The K-Light manual warns that the speedometer drive housing is bent if it is not located correctly when the axle goes in, and says to turn the wheel after fitting the axle to check the drive shaft turns (PDF p. 140). Refit the wheel: [Remove and refit the front wheel](/moto-zero/repair/repairs/wheel-remove-front).
5. **Count the wires.**
   - **Three wires (Hall-type sensor):** power, earth and signal. Key on. Meter on DC volts, black probe on battery negative. Back-probe the power wire: it should show a supply voltage (check your manual for the value). Back-probe the earth wire with red probe on battery positive and black on the earth wire: close to battery voltage means a good earth. Back-probe the signal wire and turn the wheel slowly by hand: the reading should switch between a low and a high value as each tooth or magnet passes.
   - **Two wires (magnetic pickup):** unplug the sensor. Meter on AC volts on the sensor's two pins. Spin the wheel by hand: you should see a small reading that rises with speed. No reading: the sensor or its gap is faulty.
6. **Check the wires to the dashboard.** Key off, sensor and dashboard unplugged. Continuity along each wire. Then check each wire to the frame: there should be no beep.
7. **ABS bikes.** If the speed comes from the ABS sensor and the ABS lamp is on, go to [Diagnose an ABS warning light](/moto-zero/repair/repairs/abs-check). A dealer tool can show the speed reading each sensor gives.
8. If the sensor, gap and wires are good, the dashboard input may be faulty: [Check power to the instruments](/moto-zero/repair/repairs/dash-power-check), then a dealer.

## Check your work
- On a test ride the speedometer reads smoothly from walking pace upwards, with no jumping.
- The odometer counts.
- No ABS or engine warning lamps are on.

## If it did not fix the problem
- Cable type: [Speedometer cable is noisy or broken](/moto-zero/repair/problems/speedo-cable-fault).
- The reading drops out over bumps: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

## Problems this repair helps with

- [Speedometer cable is noisy or broken](/moto-zero/repair/problems/speedo-cable-fault)
- [Speedometer or odometer does not work](/moto-zero/repair/problems/speedo-dead)

## Parts for this job

| Part | Buy |
|---|---|
| [Speed sensor](/moto-zero/repair/parts/speed_sensor) | [Find this part](/spare-parts/speed-sensor) |
| [Instruments](/moto-zero/repair/parts/instruments) | [Find this part](/spare-parts/instruments) |
| [Speedometer cable](/moto-zero/repair/parts/speedo_cable) | [Find this part](/spare-parts/speedo-cable) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [ABS sensor and unit](/moto-zero/repair/parts/abs) | [Find this part](/spare-parts/abs) |

## Sources

- K-Light 125 manual, PDF p. 130
- K-Light 125 manual, PDF p. 140
- K-Light 125 manual, PDF p. 278
