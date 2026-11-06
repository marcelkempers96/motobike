# m5 expansion notes (2026-11-06)

Words (check_course count, includes eq-block fields): 7,683 -> 16,870 (x2.2).
Per chapter: architecture 1346->2927, motors 1318->3110, controllers 998->2464, batteries 1214->2865, charging 1074->2295, safety 1733->3209.
Equations: 0 -> 33 eq blocks, all ids prefixed m5-. Existing prose formulas converted to inline KaTeX.
Not duplicated as eq blocks (taught elsewhere, referenced inline): P = T omega and omega = 2 pi n/60 (m1), road speed and wheel torque, E_k = 1/2 m v^2, Delta T = Q/(mc) (m4), V = IR, P = VI, t = C/I (m3).

5.1 Architecture: e-scooter definition, high-voltage rationale + cable-loss eq, battery-to-wheel and grid-to-battery eqs, worked petrol/electric comparison, emissions note, both-pole contactors, DC fuse, 12 V/DC-DC, VCU/telematics, RC time constant, RC charging and capacitor energy eqs, CAN section with 60 ohm calculation, Bajaj Chetak and Super Soco rows. Checks m5-01, m5-02 (previously unused), m5-31, m5-32.
5.2 Motors: Lorentz, T = Kt I, back-EMF, Kt-Kv, electrical frequency, winding resistance vs temperature, insulation 10 K rule, magnet remanence eqs; brushed motor, SPM/IPM retention, hub layout, unsprung mass, axial-flux/induction h3, field-weakening range, efficiency maps, NdFeB grades table, demagnetisation check, repair links. Checks m5-07, m5-09 (previously unused), m5-33, m5-34.
5.3 Controllers: shoot-through/body diodes, capacitors, PWM eq, Clarke/Park/SVPWM steps, FOC torque eq, power balance and battery/phase current eqs, ride modes and traction control, regen energy and stop-lamp logic, stall protection row, failure modes, parameter programming table, repair links. Checks m5-15 (previously unused), m5-35, m5-36.
5.4 Batteries: electrolyte, LFP/sodium-ion, cell formats table, pack voltage/capacity/energy, C-rate, pack resistance, coulomb counting, SOH and calendar-ageing eqs, heat worked example, resistance-based SOH, cell monitoring, balancing time, discharge overcurrent row, thermal management, runaway triggers, second life and recycling h3, repair links. Checks m5-37, m5-38.
5.5 Charging: communicating chargers, set-point rule, CC charge time, grid energy, swap throughput and PV yield eqs, CCS2/LECCS detail, Gogoro/India/Kenya context, standards detail, connectors table, arc pitting, grid tariff, repair links. Checks m5-39, m5-40.
5.6 Safety: class B requirements, PPE detail, capacitor discharge eq, full Job sheet 5.6.1 (was missing), isolation-resistance and phase-imbalance eqs, fire detail, four-wire method, Hall/contactor tests, cell-spread table, capacity test, 4 troubleshooting rows, maintenance links, conversion engineering steps. Checks m5-41, m5-42.
Every chapter ends with a "Key points" callout (before the videos block where present). All media/interactive blocks kept unchanged; videos stay last.
Questions: m5-31 to m5-42 added (2 per chapter). Glossary: 34 new terms in m5-glossary.json.

Open questions:
- Controllers and motors exceed the 2x target (x2.4) partly because eq blocks add many words; trim if needed.
- Example numbers marked "illustrative" (conductor force, 0.01 ohm path, 50 Ah pack at 42 Ah) are calculations, not specs.
- The 10 K insulation rule and 2^(dT/10) ageing rule are written as rules of thumb from the source text.
