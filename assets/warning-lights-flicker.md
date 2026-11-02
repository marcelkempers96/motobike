---
id: warning-lights-flicker
title: Warning lights flicker or come on wrongly
system: lighting
also_called: [dash lights flicker, random warning lamps, ghost warnings, neutral light glows in gear]
urgency: ride-with-care
applies_to: [all]
parts: [battery, earth_strap, wiring, instruments, regulator, interlock_switches]
repairs: [battery-test-charge, battery-terminal-clean, earth-clean, connector-clean, charging-system-test, dash-power-check, efi-code-read, wiring-fault-find]
related: [engine-warning-light, oil-warning-light, abs-light, neutral-light-fault, temp-gauge-high, intermittent-electrical, overcharging, dash-dead, indicators-fast]
sources:
  - {doc: "K-Light 125 manual", page: 78}
  - {doc: "K-Light 125 manual", page: 269}
  - {doc: "K-Light 125 manual", page: 276}
  - {doc: "HELLA Tech World: CAN bus and vehicle lighting", url: "https://www.hella.com/techworld/sg/lounge/can-bus-vehicle-lighting-bulb-replacement-workshop"}
---

# Warning lights flicker or come on wrongly

Warning lamps on the dashboard flash, glow faintly, or come on when nothing seems wrong. Several lamps flickering together usually means low or unsteady voltage, or a poor earth shared by the dashboard and the sensors. One lamp acting up usually means a fault in that lamp's sensor, switch or wire. On fuel-injected and CAN-bus bikes, a loose earth can even make the ECU store fault codes that do not match any real fault: the K-Light manual names this exact case (PDF p. 276).

## Is it safe to ride?
**First decide whether the warning could be real.** If the **oil pressure** lamp or the **temperature** lamp comes on while riding, stop as soon as it is safe and turn the engine off: see [Oil pressure or oil level light is on](/moto-zero/repair/problems/oil-warning-light) and [Temperature gauge reads high or the warning light is on](/moto-zero/repair/problems/temp-gauge-high). If the **ABS** lamp stays on, ABS may not work: brake gently. Otherwise, ride with care to get it checked.

## Quick checks first
- Which lamps flicker: one, or several at once?
- Does it happen at idle, when you rev, over bumps, or after rain?
- Is the battery old, or are the terminals loose?
- Has anything been fitted recently: LED bulbs, an alarm, a USB charger?
- Lamps that glow very faintly with the key off can be normal on some LED dashboards fed by a leak from another circuit, but check for added accessories.

## Diagnose it step by step

**1. Do several lamps flicker together?**
- Yes: go to step 2.
- Only one lamp: go to step 6.

**2. Is the battery voltage good and steady?** Set the multimeter to DC volts (V with a straight line), 20 V range. Red probe on battery positive, black probe on battery negative. Read it with the engine off, then running with revs raised.
- Low with engine off: [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge).
- Jumps up and down, or goes too high with revs (K-Light 125 should be 14.5 ± 0.5 V at 5000 rpm, PDF p. 78): [Test the charging system](/moto-zero/repair/repairs/charging-system-test) and see [Battery overcharges and bulbs blow](/moto-zero/repair/problems/overcharging).
- Good and steady: go to step 3.

**3. Are the battery terminals and main earths tight and clean?** Wiggle each terminal while watching the dashboard.
- Flicker follows the wiggle: [Clean and tighten battery terminals](/moto-zero/repair/repairs/battery-terminal-clean) and [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean). On a fuel-injected bike, the K-Light manual then says to disconnect the battery for 3 minutes before restarting (PDF p. 276).
- No change: go to step 4.

**4. Is the dashboard supply good?** Follow [Check power to the instruments](/moto-zero/repair/repairs/dash-power-check): test the feed and earth at the dashboard plug, and look inside it for water.
- Poor earth or wet plug: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- Good: go to step 5.

**5. Does the flicker come with bumps or steering?** The harness may be broken at the steering head or chafed: [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

**6. One lamp only. Which one?**
- **Engine (FI or MIL) lamp:** on the K-Light 125 it lights at key on and goes out after starting (PDF p. 269). If it comes on while riding, read the fault code: [Read engine fault codes (fuel injection)](/moto-zero/repair/repairs/efi-code-read) and see [Engine warning light (check engine, MIL) is on or flashing](/moto-zero/repair/problems/engine-warning-light).
- **Neutral lamp** glowing in gear or flickering: see [Neutral light does not work or stays on in gear](/moto-zero/repair/problems/neutral-light-fault).
- **ABS lamp:** see [ABS warning light is on](/moto-zero/repair/problems/abs-light).
- **Oil or temperature lamp:** treat as real until proved otherwise: links above.
- **Indicator lamp flashing fast:** see [Indicators flash too fast](/moto-zero/repair/problems/indicators-fast).
- **Bulb or lamp warning on a CAN-bus bike:** a non-approved LED, a poor lamp earth or a loose holder can set it, as HELLA's workshop guide explains (see sources). Check those, then see a dealer.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Low or weak battery | Low resting voltage | [Test and charge a 12 V battery](/moto-zero/repair/repairs/battery-test-charge) |
| Loose battery terminal or main earth | Flicker follows wiggle | [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean) |
| Unsteady or high charging voltage | Voltage jumps or too high | [Test the charging system](/moto-zero/repair/repairs/charging-system-test) |
| Wet or loose dashboard plug | Visual | [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean) |
| One sensor or switch faulty | Only one lamp affected | Follow the link for that lamp |
| Broken harness at steering head | Flicker at full lock | [Find a wiring fault](/moto-zero/repair/repairs/wiring-fault-find) |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Charging voltage | 14.5 ± 0.5 V at 5000 rpm | PDF p. 78 |
| Battery disconnection after refitting a loose earth | 3 min | PDF p. 276 |
