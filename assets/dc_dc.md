---
id: dc_dc
name: DC-DC converter
category: ev
aliases: [DC converter, step-down converter]
applies_to: [electric]
sources:
  - {doc: "Auto Training Centre: DC-DC converter basics", url: "https://www.autotrainingcentre.com/blog/dc-dc-converter-basics-ev-mechanics/"}
  - {doc: "Battery Design: DC-DC converters", url: "https://www.batterydesign.net/electrical/dc-dc/"}
---

# DC-DC converter

The DC-DC converter is a small sealed box, often with fins, near the controller or battery. It takes power from the high-voltage traction battery and turns it down to about 12 V.

## What it does
An electric bike has no alternator. The DC-DC converter does that job: it powers the lights, horn, dashboard and control electronics and keeps the [12 V auxiliary battery](/moto-zero/repair/parts/aux_battery) charged while the bike is on. In good designs the high-voltage side is isolated from the 12 V side inside the box. If it fails, the bike runs on the 12 V battery alone until that goes flat, and then lights, dash and the ready system stop.

## Signs it is worn or failing
- Small battery keeps going flat: [Small 12 V battery is flat](/moto-zero/repair/problems/ev-aux-battery-flat).
- Lights dim, dashboard resets or warnings flicker while riding.
- Bike dies and will not go to ready: [Will not go to ready](/moto-zero/repair/problems/ev-no-ready), [Dashboard is dark](/moto-zero/repair/problems/ev-dash-dark).
- These signs can look like a traction battery fault; test before replacing parts.

## When to replace it
After testing confirms the 12 V output is missing or wrong with the bike on and the inputs and fuses are good. Check its fuse and connectors first.

## What to match when buying
- Exact part for your bike: input voltage range, output voltage and current, connectors and mounting.
- A generic converter may not be isolated or may not suit the pack voltage. Buy through the maker or dealer.

## Fitting notes
- Its input side is high voltage: [Make an electric motorcycle safe to work on](/moto-zero/repair/repairs/ev-safe-isolation).
- Test: [Check the 12 V auxiliary system](/moto-zero/repair/repairs/ev-aux-check).
