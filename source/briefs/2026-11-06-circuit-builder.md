# Brief: Wiring Lab, more interaction (Circuit Builder, parameters, measurements, exercises)

Repo: /home/user/motobike (static site, vanilla HTML/CSS/ES modules, no build step).

## Current state (read first)
- `wiring/index.html`: the Wiring Lab page. It embeds `assets/interactive/wiring/wiring.html`
  (iframe: harness, starting, charging, ignition tabs with faults) and has an "Experiment · change the
  circuit" section (inline script: a load budget with LOADS).
- `assets/interactive/wiring/wiring.html` and `wiring-data.json`: the interactive diagrams.
- Course chapters: `assets/content/modules/m3.js` (chapters m3-battery-charging, m3-lighting-wiring,
  m3-diagnosis, m3-ignition). Block types are rendered by `assets/learn.js` (look at `function block`).
- Site styles: `assets/styles.css`; shared shell `assets/site.js`. Keep the site's look (see
  existing `.ute-*` and `.mz-*` classes). No external libraries except what is already vendored.

## What to build
1. **More parameters on the preset circuits.** In the Wiring Lab tabs (starting, charging, ignition)
   and the load-budget experiment, add sliders or steppers for real electrical parameters, with the
   readings updating live and a short "what changed" line. Examples (use correct physics):
   battery open-circuit voltage and internal resistance (state of charge, cold), cable length and
   cross-section (resistance from copper resistivity), a corroded connector or bad earth (added
   ohms), starter current draw, alternator/stator output vs rpm, regulator set point, load wattage,
   coil primary resistance and dwell. Show voltage drop, current, power, cranking voltage,
   charging balance. Keep the existing faults working.
2. **Circuit Builder** (new tab or section on `wiring/`, own module `assets/circuit-builder.js`,
   CSS in its own file `assets/circuit-builder.css`). A simple breadboard where the user places
   components on a grid, connects terminals with wires, and presses "Test":
   - Components: 12 V battery (EMF and internal resistance editable), fuse (rating; blows when
     exceeded), switch, push button, resistor (value editable), variable resistor (slider),
     bulb (rated W at 12 V, brightness shown, resistance from rating), LED with forward voltage
     (with warning or burn-out without a series resistor), diode, relay (coil plus contact),
     horn or motor load, wire, earth/chassis point, and instruments: **ammeter** (in series) and
     **voltmeter** (across), plus a simple multimeter mode with an ohm check on a dead circuit.
   - Solve the DC circuit properly (modified nodal analysis; diodes and LEDs by iterating a
     piecewise model; relay by coil current threshold). Show current on each wire (animated dots,
     speed by current), node voltages on hover, power per part, fuse blowing, short-circuit
     warning, open-circuit message.
   - **Readings log**: a "Note reading" button that adds the instruments' values and the circuit
     state to a table the user can keep, compare and export as CSV. Persist the circuit and log in
     localStorage (try/catch).
   - **Challenges**: 8 to 12 goals with a checker, e.g. "Light two 21 W bulbs in parallel from one
     fuse without blowing it", "Find the resistor that sets an LED to 15 mA", "Wire a relay so a
     small switch drives the horn", "Measure the voltage drop across a bad earth", "Show why a
     dim headlight gets brighter when the earth is cleaned". Each shows target indicators and a
     pass/fail with the measured values.
   - Presets loadable by URL hash (e.g. `wiring/#build=relay-horn`) so the course can link to them.
   - Works with mouse and touch (tap terminal, tap terminal to wire). Phone width usable.
3. **Course exercises.** In `m3.js` add exercise blocks to m3-lighting-wiring, m3-battery-charging
   and m3-diagnosis (3 to 5 each): a short task, what to measure, what result to expect and why,
   with a link button to the matching Circuit Builder preset. Use an existing block type if one fits
   (look at learn.js); otherwise add a small `exercise` block type to learn.js with matching CSS.
   Keep the course writing style: plain, short, impersonal, no em or en dashes, no invented specs
   (use general physics, label bike-specific values as examples).

## Rules
- Correct physics only (Ohm's law, power, series/parallel, copper resistivity 1.68e-8 ohm m).
  Typical values may be shown as examples and labelled as such.
- Do not edit other pages or shared files beyond: `wiring/index.html`,
  `assets/interactive/wiring/*`, new `assets/circuit-builder.*`, `assets/content/modules/m3.js`,
  `assets/learn.js` (exercise block only) and `assets/styles.css` (append only).
  Other people edit other files in parallel (repair pages, site shell). Leave the page footer and
  `<footer data-mz-footer>` alone.
- Test in Chromium with Playwright (pre-installed: `require('playwright')`; local server already
  running on http://localhost:8765/ , start `python3 -m http.server 8765` from the repo root only if
  it is not). Check desktop 1300 px and phone 390 px, no console errors, every challenge solvable.
- Do not commit. Save work often (the machine can restart); keep notes in
  `source/briefs/circuit-builder-progress.md` so you can resume.
- Reply in at most 10 lines: what was built, presets and challenges list, test result.
