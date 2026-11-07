# Motopedia repair pages: writer brief

You are writing pages for the **repair section** of the Motopedia website (Transitions Lab, published under CC BY-SA 4.0). Readers are riders, informal mechanics (fundis), technician trainees and students, many in East Africa and South Asia, many reading English as a second language. The site has three ways in: **by problem** (what the rider notices), **by repair** (a job you do) and **by part** (each part links to the spare parts shop).

Every problem page is a **diagnosis**: it walks the reader from the symptom, through yes/no checks ("if this, then that; if you do this, this happens"), to the cause, the repair and the part to buy.

## Files you must read first

1. `/home/claude/repair-build/registry.json`: the ONLY valid IDs for problems, repairs and parts. You may link only to IDs in it. Each problem and repair has a `group`; you write the ones in your group.
2. `/home/claude/repair-build/prior-README.md`: the earlier, smaller version of this dataset. Its "Verified numerical values", "Conflicts and values not verified" and "Merges, cuts and scope boundaries" sections are binding rules. Do not use any value it rejects.
3. Source logs in `/home/claude/logs/` (read the ones relevant to your systems, in full):
   - `klight_p001-140.md` and `klight_p141-279.md`: K-Light 125 manual (the reference bike: EFI, air-cooled 124 cc pushrod single, disc brakes with CBS, YTX7A-BS battery). All numbers come from here.
   - `mavcc_p001-245.md`, `mavcc_p246-483.md`, `mavcc_p484-650.md`, `mavcc_p651-878.md`: MAVCC Motorcycle Mechanic (1988). Use it for procedures, diagnosis logic and job-sheet structure. It is dated: modernise (EFI, sealed batteries, tubeless tyres, LED, ABS/CBS) and never copy its known errors listed in the logs.
   - `unit2.md`: Hero Honda/IGNOU Unit 2, for commuter-bike terms and how parts work.
   - Art of the Motorcycle logs are history only; do not use them for repair.
   If you need to confirm a value, the original PDFs are in `/mnt/user-data/attachments/239d5b80-4e05-5df6-a2d3-a1c264523435/` (render a page with `pdftoppm -f N -l N -r 80 -png` into `/tmp/claude-0/-home-claude/239d5b80-4e05-5df6-a2d3-a1c264523435/scratchpad` and view it with Read). For electric topics (group H) and modern systems you may also use web research (WebSearch/WebFetch) on reputable sources, and cite them by URL.

## Writing rules

- Plain, clear English. Short words. One action per step. Explain any technical word the first time in a few words.
- No em dashes and no en dashes anywhere (use commas, colons, "to" for ranges: "20 to 40 mm"). No hype, no filler, no "In this guide we will".
- Paraphrase sources. Do not copy text from the manuals.
- **Numbers:** only use a number if it is in the K-Light logs (and not rejected by prior-README) or comes from a cited source. Label it: "K-Light 125: 20 to 40 mm". For any other bike say "use the value in your bike's manual". Never invent a torque, clearance, voltage or limit. Never average conflicting values.
- Safety first and specific: say when to stop riding, when a job needs a workshop, and what can hurt you (hot exhaust, fuel, battery acid, brake fluid, high voltage, a bike falling).
- Cover the whole commuter world, not just the K-Light: carburettor and fuel-injected, four-stroke and two-stroke, kickstart and electric start, drum and disc brakes, chain bikes, step-throughs with semi-automatic clutches, scooters with CVT, and electric bikes. Use `applies_to` to say which.
- Keep pages tight: problem pages about 300 to 650 words, repair pages about 250 to 700 words.

## Links

Write internal links as site paths:
- problem: `/moto-zero/repair/problems/<id>`
- repair: `/moto-zero/repair/repairs/<id>`
- part: `/moto-zero/repair/parts/<id>`

Do NOT write a "Parts you may need", "Repairs" or "Related problems" section, and do not write shop links. The build script generates those sections, with spare-part shop links, from your frontmatter. Inline links inside steps and tables are welcome.

## Problem page format: `out/problems/<id>.md`

```markdown
---
id: cranks-no-start
title: Engine turns over but will not start
system: starting
also_called: [turns over but won't fire, no start]
urgency: do-not-ride        # one of: ok-to-ride | ride-with-care | do-not-ride | stop-now
applies_to: [all]           # any of: all, four-stroke, two-stroke, carburettor, fuel-injected, kickstart, electric-start, drum-brake, disc-brake, chain, scooter-cvt, semi-auto, liquid-cooled, air-cooled, electric
parts: [spark_plug, ignition_coil, fuel_pump, fuel_tap, carb, air_filter]   # part IDs, most likely first
repairs: [spark-test, spark-plug-service, fuel-tap-line-check, fuel-pump-check, compression-test]  # repair IDs, in the order used
related: [no-spark, flooded-engine, hard-cold-start]   # problem IDs
sources:
  - {doc: "K-Light 125 manual", page: 21}
  - {doc: "MAVCC Motorcycle Mechanic", page: 664}
---

# Engine turns over but will not start

One short paragraph: what the rider notices, and what it usually means (an engine needs fuel, spark, compression and air at the right time; this check finds which is missing).

## Is it safe to ride?
One or two sentences.

## Quick checks first
- 3 to 6 bullets a rider can do in two minutes with no tools (fuel in tank, kill switch on RUN, side stand, fuel smell, warning light).

## Diagnose it step by step

**1. Is there fuel in the tank, and is the tap on (carburettor bikes) or does the pump buzz for 2 to 3 seconds at key on (fuel-injected bikes)?**
- No: fill up, turn the tap to ON or RES. No buzz: go to [Fuel pump is silent](/moto-zero/repair/problems/fuel-pump-silent).
- Yes: go to step 2.

**2. ...?**
- Yes: ...
- No: ...

(Typically 4 to 8 steps. Each step is one question with a yes/no or "if you see X / if you see Y" branch, ending at a repair link, another problem link, or a workshop hand-off. Add "What happens if..." notes where useful, for example: "If you keep cranking, you flood the engine and flatten the battery.")

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Fouled or worn spark plug | Plug black, wet or electrode rounded | [Spark plug service](/moto-zero/repair/repairs/spark-plug-service) |
| ... | ... | ... |

(Rank by "common, cheap and easy to check" first; the prior-README explains these are teaching priorities, not statistics.)

## Reference values (K-Light 125)
Only if the problem uses numbers. Table: item, value, source page. Omit this section if there are none.
```

## Repair page format: `out/repairs/<id>.md`

```markdown
---
id: spark-plug-service
title: Remove, check, gap and fit a spark plug
level: rider               # rider | home | workshop (from registry)
time: 15 to 20 min         # labelled estimate
applies_to: [four-stroke, two-stroke]
tools: [plug spanner, feeler gauge or gap tool, torque wrench, wire brush]
parts: [spark_plug, ignition_coil]          # parts used or inspected
consumables: []
fixes: [cranks-no-start, plug-black-sooty]  # problem IDs this repair resolves or diagnoses
sources:
  - {doc: "K-Light 125 manual", page: 58}
---

# Remove, check, gap and fit a spark plug

One short paragraph: what the job does and when to do it.

## Safety
Bullets.

## You need
Bullets (tools, parts, consumables). Name what to check before buying (thread, reach, heat range).

## Steps
1. One action per step, with the check in the same line if short.
2. Put the spec in bold where used: set the gap to **0.7 ± 0.1 mm (K-Light 125)**.

## Check your work
Bullets: how you know it is done right.

## If it did not fix the problem
Bullets linking to the next problem or repair.

## Reference values (K-Light 125)
Table if any numbers (item, value, PDF page). Omit if none.
```

For workshop-level jobs, write the page as an **assessment and hand-off**: what to check safely, what the workshop will measure or replace, what to ask for, what it should roughly involve, and what not to attempt at home (prior-README "scope boundaries").

## Sources

`sources` lists `{doc, page}` where page is the **one-based PDF page** (as in the logs and prior-README). Valid `doc` names: "K-Light 125 manual", "MAVCC Motorcycle Mechanic", "Unit 2 The Motorcycle", or a web source as `{doc: "<site or title>", url: "<url>"}`. Cite what you actually used.

## Notes file

Write `notes/<group>.md` with: values you could not verify, conflicts found, IDs you wished existed (with suggested id and title), and any page you thought should be merged or split. Do not invent new IDs in pages.

## Before you finish

- Check every ID in frontmatter and every internal link exists in registry.json (write a small script).
- Search your files for "—" and "–" and remove them.
- Make sure every problem and repair assigned to your group has a file.
