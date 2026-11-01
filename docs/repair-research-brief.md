# Research brief: Moto Zero Repair section

Copy this whole file into a new agent session that has the `marcelkempers96/motobike` repo checked out.

## 1. Context

Moto Zero is an open, free motorcycle course by Transitions Lab (CC BY-SA 4.0). It's a static website: plain HTML, CSS and ES modules, no build step, deployed on Vercel. Its readers are mechanics in training (many in East Africa, working on 100 to 150 cc boda bodas), students, fleet operators and riders.

The site is adding a **Repair** section with two ways in:

1. **Search by part.** Pick a part (clutch, chain, spark plug, battery and so on) and see its common problems and the repair procedures for it.
2. **Search by problem.** Pick a symptom ("engine will not start", "brakes feel spongy", "battery keeps going flat") and see the likely causes, most likely first. Each cause has a quick check and a link to the fix.

Every procedure is a precise, numbered, step-by-step job. It links to the 3D Overview page where that part is shown working (`/overview/?part=<id>`) and to the course chapter that explains the theory.

Your job is research and content, not page design. You produce accurate, structured repair data that the site renders.

## 2. Sources (in the repo)

| File | What it is | Use it for |
|---|---|---|
| `inbox/manuel-entretien-k-light125.pdf` | KS Motorcycles K-Light 125 maintenance manual, 278 pages. Every chapter has a "Fault diagnosis" table and step-by-step removal, inspection and installation. | **Primary source** for procedures, specifications, torque values, service limits and fault tables. The course's reference bike is a 125 cc air-cooled single like this. |
| `inbox/ED319915.pdf` | *Motorcycle Mechanic, Teacher Edition*, Mid-America Vocational Curriculum Consortium, 1988, 877 pages. Units on troubleshooting, tune-up, each system, job sheets and safety. | Diagnostic logic, troubleshooting trees, job-sheet structure, safety rules, tools. |
| `inbox/Unit-2.pdf` | "Unit 2: The Motorcycle", 50-page teaching unit on parts and systems. | Plain-language system descriptions and parts naming. |
| `inbox/artofmot00solo.pdf` | Guggenheim *The Art of the Motorcycle*, 1998. | History only. **Do not use for repair.** |
| `source/course/m1.md` to `m5.md` | The course text (Modules 01 to 05), including job sheets, safety callouts and electric-motorcycle service. | Matching terms, existing job sheets, and electric procedures (Module 05) such as high-voltage isolation, BMS faults and charging faults. |
| `assets/content/parts.js` | Part IDs used by the 3D Overview, for example `clutch`, `chain`, `spark_plug`, `carb`, `battery`, `wiring`, `brake`, `forks`, `rear_shock`, `motor`, `controller`, `charge_port`. | Every part reference must use one of these IDs. If a needed part has no ID, list it under `missing_part_ids`. |
| `assets/content/modules/m1.js` to `m5.js` | Chapter IDs such as `m2-four-stroke`, `m3-ignition`, `m4-clutch`, `m4-final-drive`, `m4-brakes`, `m5-batteries`. | The `learn` link for each procedure. |
| `assets/renders/*.webp`, `assets/renders/photo/*.jpg`, `assets/illustrations/**/*.png`, `assets/photos/*.jpg`, `types/plates/*` | Existing course images: 3D renders, labelled plates (F01 to F26, PT, TR, W, FB, EL, WR series), workshop photos. | Pick the image that best shows the part or step. Use exact repo paths. Do not invent paths. |

Use PyMuPDF (`pip install pymupdf`; `import pymupdf`) or `pdftotext` to read the PDFs. `ED319915.pdf` is a scan, so its OCR text is noisy: read carefully and cross-check.

## 3. What to produce

### 3.1 Problem taxonomy (think first, then boil down)

1. List **every** problem a motorcycle can have, grouped by system: starting, idle and running, power and performance, overheating, smoke and exhaust, noises, oil and leaks, clutch, gearbox, chain and sprockets, brakes, steering and suspension, wheels and tyres, electrical (charging, battery, lighting, horn, indicators, instruments), ignition, fuel, and electric drive (motor, controller, battery pack, BMS, charger).
2. Merge duplicates. Keep the symptoms a rider or mechanic would actually describe ("hard to start when cold", "chain jumps on the sprocket").
3. Boil the list down to the set the site shows. Aim for about **40 to 60 problems**, prioritised for 100 to 150 cc commuter bikes and small electric motorcycles.

### 3.2 Data files

Write ES modules in `assets/content/repair/`, exporting plain data in exactly these shapes.

```js
// problems.js
export const SYSTEMS = [ { id: 'starting', name: 'Starting' }, ... ];
export const PROBLEMS = [{
  id: 'no-start-no-crank',                 // kebab-case, unique
  title: 'Engine does not turn over',      // the symptom, short, sentence case
  system: 'starting',
  also: ['starter silent', 'nothing when I press start'],   // search synonyms
  first: 'Check the kill switch is at RUN and the side stand is up.',  // the one first check, optional
  causes: [{                               // most likely first
    cause: 'Flat or weak battery',
    likely: 'common',                      // 'common' | 'possible' | 'rare'
    check: 'Battery voltage below 12.4 V with key off.',     // one quick test, with numbers
    procedure: 'battery-test-charge',      // id in procedures.js, or null
    parts: ['battery']                     // ids from parts.js
  }],
  safety: '...',                           // optional, one sentence
  sources: [{ doc: 'K-Light 125 manual', page: 97 }]
}];
```

```js
// procedures.js
export const PROCEDURES = [{
  id: 'chain-adjust',
  title: 'Adjust chain slack',
  parts: ['chain', 'rear_sprocket'],
  overview: 'chain',                       // part id for /overview/?part=
  learn: 'm4-final-drive',                 // chapter id
  level: 'basic',                          // 'basic' | 'intermediate' | 'advanced'
  time: '15 min',
  tools: ['17 mm and 24 mm spanners', 'ruler'],
  supplies: ['chain lubricant'],
  specs: [ { label: 'Chain slack', value: '10 to 20 mm', src: 'K-Light p. 46' } ],
  safety: ['Engine off, key out, bike on the centre stand.'],
  steps: [
    { do: 'Put the bike on the centre stand, in neutral.' },
    { do: 'Measure slack midway on the lower run.', spec: '10 to 20 mm', img: 'assets/illustrations/transmission/F15.png' },
    ...
  ],
  done: 'Slack within spec at the tightest point; wheel aligned; axle nut torqued.',
  img: 'assets/renders/chain_sprockets.webp',   // the main image
  sources: [{ doc: 'K-Light 125 manual', page: 46 }]
}];
```

```js
// parts.js (repair index by part)
export const REPAIR_PARTS = [{
  part: 'chain', name: 'Drive chain', group: 'Drivetrain',
  also: ['roller chain'],
  img: 'assets/renders/chain_sprockets.webp',
  problems: ['chain-noise', 'chain-jumps'],
  procedures: ['chain-adjust', 'chain-wear-check', 'chain-sprocket-replace']
}];
```

Also write `assets/content/repair/README.md`. It should cover:
- the taxonomy you started from;
- what you cut and why;
- `missing_part_ids` (parts that need a 3D Overview ID);
- every value you could not verify;
- a source page for every number.

## 4. Rules (accuracy first)

- **Never invent a number.** Every torque, gap, clearance, voltage, slack, pressure or capacity must come from a source page you cite. If the K-Light manual gives it, use that and say it is for a 125 cc air-cooled single. Otherwise give the general rule from ED319915 or the course, or leave the value out and tell the reader to check the manual for their model.
- **Mark the model.** Where a spec is model-specific, write "K-Light 125:" before the value.
- **Safety in every procedure** that needs it: fuel and fire, battery gases and acid, hot exhaust, the bike falling, brake fluid, compressed springs, and, for electric bikes, high voltage (isolate the pack and wait as Module 05 says; only trained people open HV parts).
- **Steps:** one action per step, imperative verb first, at most about 20 words. Give the spec in the step where it is used.
- **Diagnosis order:** cheapest and most likely checks first (fuel, kill switch, fuses, connections) before costly ones (compression, timing, internal engine).
- **When to stop:** when a job needs special tools or training (crankshaft, internal gearbox, HV pack), say "workshop job", explain why and don't give a full home procedure.
- **Writing style** (from `source/STYLE.md`): British spelling, plain words, sentence case, no em dashes or en dashes, no hype words, and as few words as possible.
- **Images:** only paths that exist in the repo. Check each one with `ls`.

## 5. Scope target

- Problems: 40 to 60.
- Procedures: about 35 to 50, covering at least these:
  - **Routine service:** engine oil and filter, air filter, spark plug, valve clearance, idle and carburettor adjustment, throttle and clutch cable free play.
  - **Chain and brakes:** chain slack, chain wear and replacement, brake pads, brake fluid and bleeding, drum brake shoes.
  - **Tyres and steering:** tyre pressure and wear, wheel bearings, steering head bearings, fork oil and seals, rear shock.
  - **Battery and electrics:** battery test and charge, charging system test (regulator and stator), fuse and relay checks, bulbs and indicators, horn, starter motor and relay, ignition coil and pick-up tests, CDI/ECU basics, wiring fault finding (continuity and voltage drop).
  - **Fuel and engine:** fuel tap and line, carburettor clean, compression test, cam chain tension, clutch plates, gear shift, exhaust leaks, smoke diagnosis.
  - **Electric bikes:** HV safety isolation, battery pack state check, charger and charge port faults, motor and controller fault codes (general), throttle and brake cut-off switches.
- Parts: every part in `assets/content/parts.js` that has repairs.

## 6. Hand-back

When the data is done:
1. Validate the files: `node -e "import('./assets/content/repair/problems.js').then(m=>console.log(m.PROBLEMS.length))"`. Do the same for the other two files.
2. Check every cross-reference: every `procedure`, `problems` and `procedures` id exists, every `parts` id is in `assets/content/parts.js`, and every `learn` chapter exists.
3. Check every image path exists.
4. Commit on the working branch with a clear message. Don't change pages, CSS or navigation.
