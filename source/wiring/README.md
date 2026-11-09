# Motopedia Wiring Lab

Interactive version of the Module 4 wiring plates: WR01 main harness, F23 starting circuit, F21 charging circuit and F22 ignition circuits (AC-CDI and DC-TCI/ECU).

## Files

| File | Use |
|---|---|
| `wiring.html` | The complete tool as one self-contained page (drawings, data and script inline). Upload it and serve it at `/moto-zero/wiring`, or embed it with an iframe. Only external request: IBM Plex from Google Fonts, with system fallbacks. |
| `wiring-data.json` | All text as data: 7 systems, 12 wire colours, 30 harness parts with pin functions, and the components of the three circuits, each with `name`, `does`, `test` and `fault` (harness parts also `sys` and `wires`). Use it to build your own pages or translate the tool. |
| `svg/WR01-harness-interactive.svg` | Harness plate. Every connector is a `<g id="WR01-<key>" data-part="…" data-category="…">` group, and its label is `WR01-<key>-label`. Keys match `harness` in the JSON. |
| `svg/F23-starting-interactive.svg` | Starting circuit. Each wire run carries `class="seg" data-seg="…"` (feed, heavyB, heavyM, ctl1 to ctl5, coilret, neu1 to neu3, cl1 to cl3, earthB, earthM). Switches are `<g class="swg" data-sw="ign|stop|start|neutral|clutch|stand">`. Clickable areas are `<rect class="hot" data-k="…">` with keys matching `starting` in the JSON. |
| `svg/F21-charging-interactive.svg` | Charging circuit. Segments for the three phases, bridge columns, SCR shunts, B+ output, battery, loads and earths; `#rotor21` rotates; `#lamp` and `#fuse15` change state. Keys match `charging`. |
| `svg/F22-ignition-interactive.svg` | Ignition circuits. Segments for source coil, kill switch, capacitor charge and discharge, ECU supply, dwell and IGBT; `#flyA`, `#lobeA`, `#flyB`, `#lobeB` rotate; `#sparkA`, `#sparkB`, `#htA`, `#htB` flash. Keys match `ignition`. |
| `preview/*.png` | Screenshots for the web page or social cards. |

## Embed

```html
<iframe src="/moto-zero/wiring.html" title="Motopedia Wiring Lab" style="width:100%;height:1400px;border:0" loading="lazy"></iframe>
```

Deep links open a view directly: `#harness`, `#starting`, `#charging`, `#ignition`.

## Behaviour

Wires show three states: animated orange where current flows, pale orange where voltage is present without current, navy where there is no voltage. Values are typical of a small road machine (125 to 400 cc) and are teaching approximations, not a service manual.

- **Harness:** filter by system or wire colour; hover traces a branch; click shows pins, tests and faults.
- **Starting:** ignition, stop switch, gear, clutch, side-stand and a hold-to-start button. Faults: blown 10 A fuse, burnt relay contacts, weak battery (relay chatter), failed neutral switch.
- **Charging:** rpm slider and presets, loads switch, run down or fully charge the battery. The model rectifies three-phase output and shunts the excess above 14.5 V. Faults: open stator phase, failed regulator (overcharging), blown 15 A fuse.
- **Ignition:** slow-motion engine speed, stop switch and ignition switch. Panel A charges and dumps the CDI capacitor; panel B builds dwell current and advances timing with rpm. Faults: open pulser coil, fouled plug.

Source: `src/build.py` regenerates everything from the course plates in `figs/`, `src/data.py` (text) and `src/template.html` (page and script).

Licence: CC BY-SA 4.0, Transitions Lab, Motopedia.
