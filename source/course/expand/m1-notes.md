# m1 (Foundations) expansion notes, 2026-11-06

Words (prose only, videos excluded; check_course total 5652 -> 13629):
history-systems 870 -> 2240 (2.6x), types 1480 -> 3160 (2.1x), anatomy 1618 -> 3091 (1.9x),
physics 1075 -> 2962 (2.8x), workshop 931 -> 2462 (2.6x).
Physics and workshop run over the target because of the new eq blocks, about 70 words each (physics has
17 new ones). History was the most condensed chapter on the site compared with source/course/m1.md.

Equations: 3 -> 27 (24 new, all m1- ids): tank-energy, efficiency-chain, power-to-mass, firing-interval,
overall-ratio, wheel-torque, tyre-diameter, tractive-force, rolling-resistance, aero-drag,
gradient-resistance, power-balance, wheel-speed, acceleration, climb, load-transfer, rear-lift,
friction-circle, gyro-torque, lean-angle, max-lean, bolt-torque, micrometer, runout.
HTML-entity formulas in physics and workshop prose, tables and keys are now inline KaTeX.

Per chapter (all existing media and interactive blocks kept; videos stay last; Key points callout added):
- 1.1: steam velocipedes, Reitwagen, Hildebrand & Wolfmüller and the Werner layouts, interwar to Super Cub,
  why a three-way catalyst needs closed-loop EFI, the electric transition, a fault-finding table at system
  boundaries, steps for diagnosing from facts (paraphrased from dansmc), and an energy balance. Q m1-31, m1-32.
- 1.2: the why behind each category, L2e to L7e table, Euro 5/5+, licences, steps to classify a machine,
  primary/secondary forces, inline-four secondary shake, why the K-Light 125 is air-cooled, a cooling safety
  callout, two-stroke efficiency, frame construction, crash inspection, running-cost factors. Q m1-33, m1-34.
- 1.3: table of sub-components and materials (30 rows), assemblies grouped by system, symptom/assembly/check/
  remedy table, kill switch, MIL codes, why free play matters, false neutral, a daily walk-round with
  K-Light 125 values (tyre pressures taken from the repair page). Q m1-35, m1-36.
- 1.4: K-Light spec callout, unit pitfalls, dyno reading, re-gearing, drag-area table, rotating-mass factor,
  brake sizing and CBS, friction circles changing with load transfer, trail. Q m1-37, m1-38.
- 1.5: CO, fuel, sparks and fire, a first-aid callout, a hot/cold table (from dansmc), property class rule,
  bolt yield and waisted bolts, tightening sequence, K-Light torque table (from repair fastener-check),
  multimeter rules, micrometer method, standard/limit decision steps, TIR, full thread-insert steps. Q m1-39, m1-40.
Glossary: 25 new terms in m1-glossary.json. Repair links use ../repair/repairs/<id>/ (each id checked to exist).

Open questions:
- Chain wear: the site callout (kept as it was) and the course source give 127 mm over 10 links as the limit,
  but repair/chain-wear-check says the K-Light manual's 127 mm is the length of a new chain, not a wear limit.
  This needs a decision and a correction in both places. Question m1-14 depends on it too.
- No lambda equation was added: m1 only mentions lambda = 1 in prose. Module 3 probably teaches it.
- 20 existing quiz questions are not used by any check block. They were left as they are.
