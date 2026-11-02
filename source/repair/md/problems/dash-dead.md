---
id: dash-dead
title: Instruments or dashboard are dead
system: lighting
also_called: [dashboard blank, meter not working, display dark, clocks dead]
urgency: ride-with-care
applies_to: [all]
parts: [instruments, fuse, battery, wiring, earth_strap, ignition_switch]
repairs: [battery-test-charge, fuse-relay-check, dash-power-check, connector-clean, earth-clean, ignition-switch-test]
related: [no-power-key-on, warning-lights-flicker, speedo-dead, engine-warning-light, ev-dash-dark, fuse-keeps-blowing]
sources:
  - {doc: "K-Light 125 manual", page: 97}
  - {doc: "K-Light 125 manual", page: 100}
  - {doc: "K-Light 125 manual", page: 269}
  - {doc: "K-Light 125 manual", page: 274}
  - {doc: "HELLA Tech World: CAN bus and vehicle lighting", url: "https://www.hella.com/techworld/sg/lounge/can-bus-vehicle-lighting-bulb-replacement-workshop"}
---

# Instruments or dashboard are dead

The dashboard stays dark when you turn the key: no lights, no needles moving, or a blank digital display. Other things such as lights and horn may still work. The dashboard needs a key-on feed, an earth and, on digital dashboards, a permanent battery feed. On modern bikes it may also need data from the ECU over the CAN-bus, a network that lets the control units share information. Supply faults are far more common than a failed dashboard.

## Is it safe to ride?
With care, if the engine runs normally. Without a dashboard you have no speedometer and, more importantly, no oil, temperature, ABS or engine warning lamps. Ride slowly to a place where it can be fixed. On some bikes the dashboard is part of the immobiliser, so the engine will not start.

## Quick checks first
- Do the lights, horn and indicators work with the key on? If nothing works, go to [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on).
- Is only the backlight dead (display readable in daylight), or the whole dashboard?
- Did it die after rain, washing, a fall, or battery work?
- Electric motorcycle: go to [Dashboard is dark and the bike seems dead](/moto-zero/repair/problems/ev-dash-dark).

## Diagnose it step by step

**1. Is the battery good?** Set the multimeter to DC volts (V with a straight line), 20 V range. Red probe on battery positive (+), black on battery negative (-). The K-Light manual says to check battery voltage before any lighting or meter test (PDF p. 97).
- Low: charge it: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge). Digital dashboards often go blank or reset at low voltage.
- Good: go to step 2.

**2. Do the warning lamps come on at key on?** On the K-Light 125, the FI lamp lights at key on to show the injection system has power (PDF p. 269).
- Some lamps work but the display or needles do not: the dashboard has partial power. Go to step 4.
- Nothing on the dashboard at all: go to step 3.

**3. Is the dashboard fuse good?** [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check).
- Blown: replace once. If it blows again: [Fuse keeps blowing](/moto-zero/repair/problems/fuse-keeps-blowing).
- Good: go to step 4.

**4. Is power and earth reaching the dashboard plug?** Follow [Check power to the instruments](/moto-zero/repair/repairs/dash-power-check). In short: back-probe the dashboard plug with the meter on DC volts and look for battery voltage on the key-on feed and the permanent feed, then test the earth wire against battery positive.
- No feed: the wire or ignition switch is at fault: [Test the ignition switch](/moto-zero/repair/repairs/ignition-switch-test).
- Poor earth: [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean).
- All good: go to step 5.

**5. Is the dashboard plug clean and fully home?** Key off. Unplug it (K-Light 125 meter removal, PDF p. 100). Look for water, green pins or a pin pushed back.
- Yes: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- Clean and tight: go to step 6.

**6. Feeds, earth and plug all good, still dark?** The dashboard has failed, or on CAN-bus bikes it is not receiving data. Do not probe the CAN-bus wires or try a test light on them. A dealer can check the network with the correct diagnostic tool (the K-Light tool needs a battery of at least 8.5 V, PDF p. 274). Dashboard repair or replacement, and coding a new one to the bike, is workshop work.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Low battery or loose terminal | Low voltage | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Blown dashboard fuse | Meter test | [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Wet or loose dashboard plug | Visual | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| Poor dashboard earth | Earth test low | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Broken feed or ignition switch fault | No voltage at plug | [Check power to the instruments](/moto-zero/repair/repairs/dash-power-check) |
| Failed dashboard or CAN-bus fault | All supplies good | Dealer with diagnostic tool |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Minimum battery voltage for diagnostic tool | 8.5 V | PDF p. 274 |
