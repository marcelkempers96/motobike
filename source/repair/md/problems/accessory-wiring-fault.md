---
id: accessory-wiring-fault
title: Problems after fitting accessories or an alarm
system: wiring
also_called: [faults after fitting alarm, USB charger drains battery, tracker problems, LED kit problems]
urgency: ride-with-care
applies_to: [all]
parts: [wiring, fuse, battery, earth_strap, indicators, flasher]
repairs: [accessory-wiring, parasitic-drain-test, short-circuit-find, led-indicator-fit, fuse-relay-check, wiring-fault-find, charging-system-test]
related: [parasitic-drain, fuse-keeps-blowing, indicators-fast, battery-flat, warning-lights-flicker, dim-lights-idle, no-power-key-on]
sources:
  - {doc: "MAVCC Motorcycle Mechanic", page: 294}
  - {doc: "K-Light 125 manual", page: 19}
  - {doc: "K-Light 125 manual", page: 76}
  - {doc: "K-Light 125 manual", page: 278}
  - {doc: "HELLA Tech World: CAN bus and vehicle lighting", url: "https://www.hella.com/techworld/sg/lounge/can-bus-vehicle-lighting-bulb-replacement-workshop"}
  - {doc: "Kellermann i.LOAD load resistors", url: "https://www.kellermann-online.com/en/shop/electronic-accessories/i.load/"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/dc_switches.htm"}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/wiring_diagram.htm"}
---

# Problems after fitting accessories or an alarm

New faults started soon after something was added: an alarm, GPS tracker, phone charger, extra lights, LED indicators, heated grips or a louder horn. Typical results are a battery that goes flat overnight, fuses that blow, indicators that flash fast, dashboard warnings, a bike that will not start, or lights that dim at idle. Most come from four mistakes: no fuse or the wrong fuse, power taken from the wrong wire, an accessory that draws current with the key off, or more load than the alternator can supply.

## Is it safe to ride?
With care, if the bike starts and lights work. If a fuse blows, wires get hot, or there is a burning smell, stop and see [Burning smell from the wiring](/moto-zero/repair/problems/burning-smell-wiring).

## Quick checks first
- What was fitted, and where does it take its power? Find every added wire.
- Is there an inline fuse close to the battery on the accessory feed?
- Are there tap-type ("scotch lock") connectors cut into factory wires?
- Does the accessory stay on, or keep a light glowing, with the key off?
- Does the problem disappear when you unplug or disconnect the accessory? This is the fastest test.

## Diagnose it step by step

**1. Does the fault stop with the accessory disconnected?** Remove its fuse or unplug it, and test the bike.
- Yes: the accessory or its wiring is the cause. Go to step 2.
- No: the fitting may have damaged factory wiring (cut strands, pierced insulation, a moved connector). Go to step 6.

**2. Does the battery go flat when the bike is parked?** Alarms and trackers draw current all the time, by design; a charger left on draws current too. Set the multimeter to DC volts (V with a straight line), 20 V range. Measure across the battery after a full charge, then again the next morning with the key off.
- A big fall overnight: [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test). Rewire the charger through an ignition-switched relay, or choose a low-drain alarm or tracker: [Wire an accessory safely](/moto-zero/repair/repairs/accessory-wiring).
- No big fall: go to step 3.

**3. Does a fuse blow?**
- Yes: the accessory wire is shorted or the accessory draws too much for that fuse. Never fit a bigger factory fuse to suit an accessory. Give the accessory its own fused feed from the battery: [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find) and [Wire an accessory safely](/moto-zero/repair/repairs/accessory-wiring).
- No: go to step 4.

**4. Did the fault start after LED indicators or LED bulbs were fitted?**
- Fast or steady flashing: [Fit LED indicators correctly](/moto-zero/repair/repairs/led-indicator-fit). Kellermann notes flash rate can rise after new indicators are fitted (see sources).
- Dashboard or lamp warnings on a CAN-bus bike: these bikes check lamp current, so non-approved LEDs can set warnings, as HELLA's workshop guide explains. Refit original lamps, or use parts approved for your model.
- No: go to step 5.

**5. Do the lights dim at idle with the accessory on?** Small commuter alternators have little spare power. The K-Light manual gives two different alternator outputs in different places (PDF pp. 19 and 76), so ask a dealer for your figure, and check the system can carry the extra load before adding it (MAVCC PDF p. 294).
- Dim at idle: reduce the load (smaller lamps, switch accessories off at idle) and check charging: [Test the charging system](/moto-zero/repair/repairs/charging-system-test).

**6. Was factory wiring damaged during fitting?** Remove tap connectors and check the wire under them for cut strands and green corrosion. Repair with crimp joints and heat-shrink: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find). If an alarm or immobiliser cuts the ignition feed and the bike is dead, have the installer remove or repair it: see [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Accessory draws current with key off | Overnight battery fall | [Find what is draining the battery](/moto-zero/repair/repairs/parasitic-drain-test) |
| No fuse or wrong fuse on accessory feed | Visual | [Wire an accessory safely](/moto-zero/repair/repairs/accessory-wiring) |
| Tap connector damaging factory wire | Cut strands under connector | [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find) |
| LED lamps with bulb-type flasher or lamp monitoring | Fast flash or warnings | [Fit LED indicators correctly](/moto-zero/repair/repairs/led-indicator-fit) |
| Short in accessory wiring | Fuse blows | [Find a short circuit](/moto-zero/repair/repairs/short-circuit-find) |
| Too much load for alternator | Lights dim at idle | [Test the charging system](/moto-zero/repair/repairs/charging-system-test) |
| AC-rated or small switch used for a DC accessory | Switch hot or burnt contacts | [Choose the right switch for a 12 V circuit](/moto-zero/repair/repairs/dc-switch-select) |
| Wire too thin for the load | Wire warm to touch; fuse blows | [Choose the right wire](/moto-zero/repair/repairs/wire-type-choose) |
