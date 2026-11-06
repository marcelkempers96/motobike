# m2 (The engine): expansion notes, 2026-11-06

Words (check_course count): 5,981 before, 15,757 after (2.6x). Without the 28 eq blocks (whose JSON fields inflate the count) prose is about 13,600 (2.3x); top end, lubrication and diagnosis run highest (about 2.4–2.5x) because the source job sheets and spec tables were mostly cut before.
Per chapter (all / excl. eq): fundamentals 1186 → 3278 / 2501; four-stroke 732 → 1865 / 1588; two-stroke 1011 → 2349 / 2103; top end 723 → 1994 / 1829; bottom end 752 → 1841 / 1602; lubrication-cooling 685 → 1749 / 1644; diagnosis 892 → 2681 / 2257.

Equations added (28, all prefixed m2-): otto-efficiency, displacement, compression-ratio (with Vc form), bore-stroke-ratio, mean-piston-speed, power-kw (P = TN/9549; m1 keeps P = Tω), bmep (4T and 2T), power-stroke-rate, volumetric-efficiency, brake-thermal-efficiency, valve-duration, valve-overlap, lobe-centre, firing-interval, port-timing (duration and blowdown), expansion-chamber-length, premix-oil, stem-guide-clearance, shim-selection, primary-force, secondary-force, balance-factor, boiling-point-pressure, wet-test-rise, leakage, bore-wear (out-of-round and taper), piston-clearance, ring-gap-taper.
Inline formulas in prose, tables and Try-it callouts were converted to \( \); keys blocks that only held formulas were replaced by eq blocks.

Added per chapter (every chapter ends with a "Key points" callout before the videos, and gets 2 new check blocks, m2-31 to m2-44):
- Fundamentals: K-Light engine context, spark advance logic, Otto assumptions and loss breakdown, clearance-volume make-up, table of skim/gasket effects, thin-gasket pinking callout, dynamic CR, mean piston speed table, why BMEP uses 4π/2π, BMEP table and two-stroke example, VE and energy check, new section on reading torque and power curves.
- Four-stroke: stroke-by-stroke pressure and valve table, pumping work at idle, two TDCs and link to TDC finding, steps explaining each valve event, hot-cam worked consequences, VVT examples, crossplane and 270° twin explanations.
- Two-stroke: crankcase sealing, port timing and porting trade-off, full induction prose (piston port, reed, rotary), cross-flow history and port count, wave sequence, new Power valves section, oil injection, JASO M345, emissions and injection (Orbital, TPI, TBI).
- Top end: head flatness check, chamber shapes, valve materials, seat cuts, guides and stem seals, springs and float, OHV/SOHC/DOHC detail, new section on cam chain, tensioner and decompressor, shim selection.
- Bottom end: piston alloys, ring functions and fitting, keystone rings, new gudgeon pin section with K-Light table, rod and bearing types, crank truing and K-Light crank limits, balance factor worked example, crankcase splits.
- Lubrication-cooling: dry sump, trochoid pump and K-Light pump limits table, centrifugal filter, SAE J300 grade table, JASO 2023 revision, change intervals, oil coolers, pressure cap and thermostat faults.
- Diagnosis: full 4-column symptom table, compression and wet test logic, leak-down procedure steps and location table, valve clearance tools and spec, bore measurement method, two-stroke rebuild steps, circlip safety callout, extended plug table.
Practice links: about 45 links to ../repair/repairs/<id>/ (all ids checked to exist).

Glossary: 32 new terms in m2-glossary.json (none duplicate the existing m2 glossary).

Open questions:
- Boiling-point rule (25–30 °C per bar, from the source's 2.5–3 °C per 0.1 bar) gives about 130 °C at 0.9 bar but over 140 °C at 1.4 bar, while the source quotes 125–130 °C; the eq is labelled a rule of thumb.
- Key points callouts use tone "warm" (there is no neutral tone); a dedicated style may be wanted course-wide.
- Yamaha Genesis five-valve mention was dropped from the top end during trimming.
