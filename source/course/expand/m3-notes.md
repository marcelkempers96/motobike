# m3 expansion notes (2026-11-06)
Words (check_course count): 7514 before, 16139 after (2.15x). Per chapter (block JSON words):
mixture 1567 -> 3576, efi 1284 -> 3530, ignition 1358 -> 2827, battery 1651 -> 3019,
lighting 1789 -> 3050, diagnosis 1489 -> 2829. Mixture and EFI exceed 2x mainly because of
their eq blocks (EFI has five, about 460 words); prose alone is near 2x.
Equations added (22): m3-iso-octane-combustion, m3-stoich-afr, m3-lambda, m3-lambda-density;
m3-air-mass-cycle, m3-fuel-mass-cycle, m3-injector-pulse, m3-injector-duty, m3-sensor-ratio;
m3-turns-ratio, m3-coil-energy, m3-ohms-law, m3-crank-angle-time; m3-charge-current,
m3-charge-time, m3-terminal-voltage; m3-electric-power, m3-power-resistance, m3-wire-resistance,
m3-parallel-resistance, m3-led-resistor; m3-drain-time. Inline formulas in existing prose and
steps converted to \( \) maths (lambda, pulse width, coil energy, t = theta/6n, flasher load, V = IR).
Per chapter (all media/interactive blocks kept in order, videos last, Key points callout added):
- Mixture: combustion chemistry, E10/E20 worked case, altitude, filter element table, atomisation and air bleeds, CV diaphragm test, float, pilot, needle, jet numbering, enricher/choke/accelerator pump, jetting order, synchronisation, vacuum tap, venting, fault table. Checks m3-31, m3-32.
- EFI: why injection, regulator and prime, injector faults, throttle body cleaning, per-sensor sections, strategy blending, closed/open loop, idle stepper, fuel cut-off, freeze frame, more codes, diagnostic tool levels, catalyst construction, EVAP, Euro 5/5+ and BS VI, fault table. m3-33, m3-34.
- Ignition: ignition reserve, burn voltage, points (dwell, gap first), CDI detail, pulser, TCI/ECU map, wasted spark and stick coils, timing-light logic, plug construction, heat range, reach, D7RTC cross-reference, resistor plugs and caps, fault table. m3-35, m3-36.
- Battery: cell chemistry, flooded/AGM, Ah/CCA, sulphation, charging (smart charger stages), LiFePO4, alternator types table, regulator heat, stator interpretation, interlock tests, starter clutch, kickstarter, fault table. m3-37, m3-38.
- Lighting: halogen/LED detail, beam pattern and aim, horn, switch continuity tables, fuses, connector repair, earth return and K-Light colour code, ECU pinout, CAN levels and isolation, accessory load. m3-39, m3-40.
- Diagnosis: meter kit (clamp meter, peak-voltage adapter, back-probing), fault signatures, probe placement, worked voltage-drop cases, drain procedure, charging and starter job sheets as steps, trigger and TPS logic, extended troubleshooting table. m3-41, m3-42.
Repair links (../repair/repairs/<id>/) added throughout; all 50 targets verified to exist.
Glossary: 28 new terms in m3-glossary.json (none duplicate the existing m3 list).
Open questions:
- K-Light alternator output: manual says 160 W in the charging chapter but 100 W in the spec table (text tells the reader to confirm against the parts catalogue).
- Callout tone "warm" used for Key points (no "note" style exists in styles.css).
- Many of the source review questions were already in the bank, so the new questions cover other points; existing unused questions (e.g. m3-02, m3-04 to m3-06) still have no check block.
