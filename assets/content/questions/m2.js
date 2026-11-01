export default [
  // ---------------------------------------------------------------- 2.1 fundamentals
  {
    id: 'm2-01', module: 'engine', chapter: 'm2-fundamentals', kind: 'calc',
    q: 'What is the ideal Otto efficiency at a compression ratio of 10.5 with γ = 1.3?',
    options: ['48.3 %', '50.6 %', '61.0 %', '39.0 %'],
    answer: 1,
    explain: 'η = 1 − 10.5^(−0.3) = 1 − 0.494 = 0.506, or 50.6 %. With γ = 1.4 the figure would be 61.0 %; a real small engine reaches only about 28–32 %.',
  },
  {
    id: 'm2-02', module: 'engine', chapter: 'm2-fundamentals', kind: 'calc',
    q: 'A single has a bore of 52.4 mm and a stroke of 57.8 mm. What are its displacement and cylinder shape?',
    options: ['124.6 cm³, under-square (long stroke)', '124.6 cm³, over-square (short stroke)', '138.2 cm³, under-square (long stroke)', '112.4 cm³, square'],
    answer: 0,
    explain: 'V = 0.7854 × 5.24² × 5.78 = 124.6 cm³ (work in cm). B/S = 52.4 / 57.8 = 0.91, below 1, so it is under-square.',
  },
  {
    id: 'm2-03', module: 'engine', chapter: 'm2-fundamentals', kind: 'calc',
    q: 'A 150 cm³ four-stroke single makes 12.8 N·m at 6,500 rpm. What are its power and BMEP at that speed?',
    options: ['6.99 kW and 9.0 bar', '8.71 kW and 5.4 bar', '8.71 kW and 10.7 bar', '12.2 kW and 10.7 bar'],
    answer: 2,
    explain: 'P = 12.8 × 6,500 / 9,549 = 8.71 kW. BMEP (four-stroke) = 4π × 12.8 / 150 × 10⁻⁶ = 1.07 × 10⁶ Pa = 10.7 bar. Using 2π (the two-stroke formula) gives the wrong 5.4 bar.',
  },
  {
    id: 'm2-04', module: 'engine', chapter: 'm2-fundamentals', kind: 'calc',
    q: 'At 6,000 rpm a 124 cm³ four-stroke draws 5.6 g/s of air (air density 1.18 kg/m³). What is its volumetric efficiency?',
    options: ['38 %', '85 %', '100 %', '77 %'],
    answer: 3,
    explain: 'Ideal flow = 1.18 × 124 × 10⁻⁶ × 6,000 / 120 = 7.32 g/s; ηv = 5.6 / 7.32 = 0.77. Dividing by 60 instead of 120 (the two-stroke delivery ratio) would halve the answer.',
  },
  {
    id: 'm2-05', module: 'engine', chapter: 'm2-fundamentals', kind: 'diagnosis',
    q: 'After a top-end rebuild with a thinner aftermarket head gasket, the engine pinks under load on hills. What is the likely mechanism?',
    options: ['The thinner gasket lowers compression, so the mixture burns too slowly', 'Clearance volume falls, compression ratio rises and the end gas detonates', 'The gasket blocks an oilway, so the piston overheats and pre-ignites', 'Valve clearance opens up, so the valves close late and knock'],
    answer: 1,
    explain: 'A thinner gasket reduces clearance volume and raises the compression ratio, heating the end gas until it auto-ignites before the flame reaches it. Fit the correct gasket thickness and check the chamber for carbon.',
  },

  // ---------------------------------------------------------------- 2.2 four-stroke
  {
    id: 'm2-06', module: 'engine', chapter: 'm2-four-stroke', kind: 'recall',
    q: 'Why does the camshaft of a four-stroke turn at half crankshaft speed?',
    options: ['To reduce wear on the cam chain at high rpm', 'Because each valve must open twice per crank revolution', 'Because one cycle takes 720° of crank, and each valve opens once per cycle', 'To give the valves time to cool between openings'],
    answer: 2,
    explain: 'The cycle takes two crank revolutions (720°). A cam at half speed turns 360° per cycle, so one lobe gives exactly one opening per cycle.',
  },
  {
    id: 'm2-07', module: 'engine', chapter: 'm2-four-stroke', kind: 'calc',
    q: 'A cam has IVO 12° BTDC, IVC 44° ABDC, EVO 46° BBDC and EVC 10° ATDC. What are the inlet duration and the overlap?',
    options: ['236° duration, 22° overlap', '236° duration, 56° overlap', '224° duration, 22° overlap', '256° duration, 34° overlap'],
    answer: 0,
    explain: 'Inlet duration = IVO + 180 + IVC = 12 + 180 + 44 = 236°. Overlap = IVO + EVC = 12 + 10 = 22°. (Inlet lobe centre = (44 − 12 + 180)/2 = 106° ATDC.)',
  },
  {
    id: 'm2-08', module: 'engine', chapter: 'm2-four-stroke', kind: 'diagnosis',
    q: 'A tuner fits a longer-duration, more-overlap camshaft to a commuter 125. What should you expect?',
    options: ['Smoother idle, higher cranking compression, more low-speed torque', 'No change at low rpm, more peak power at the same rpm', 'Lower peak power but better fuel economy', 'Rougher idle, lower cranking compression, less low-speed torque, more peak power higher up'],
    answer: 3,
    explain: 'Overlap lets exhaust dilute the inlet charge at idle, and late inlet closing pushes charge back at low speed. Peak power rises and moves up the rev range if intake and exhaust support it; emissions also rise.',
  },
  {
    id: 'm2-09', module: 'engine', chapter: 'm2-four-stroke', kind: 'recall',
    q: 'Why does a 270° parallel twin sound and feel like a 90° V-twin?',
    options: ['Its pistons rise and fall together, like a V-twin', 'It fires at 270° and 450° intervals, the same as a 90° V-twin', 'It fires every 360°, exactly like a V-twin', 'It uses a shared crankpin like a V-twin'],
    answer: 1,
    explain: 'The 270° crank gives firing intervals of 270° and 450°, exactly those of a 90° V-twin with a shared crankpin, so the exhaust note and torque pulses match.',
  },
  {
    id: 'm2-10', module: 'engine', chapter: 'm2-four-stroke', kind: 'diagnosis',
    q: 'A single is set at TDC and both rockers are loose. Which stroke is it on, and why does it matter?',
    options: ['End of compression; this is the only TDC where valve clearance can be measured', 'End of exhaust; both valves are in overlap and clearance is greatest', 'End of compression; the spark must be checked before the valves', 'It could be either; rotating the crank makes no difference to the reading'],
    answer: 0,
    explain: 'Both valves closed with free play means TDC at the end of compression. At TDC on the exhaust stroke the valves are in overlap and partly open, so clearance cannot be measured there.',
  },

  // ---------------------------------------------------------------- 2.3 two-stroke
  {
    id: 'm2-11', module: 'engine', chapter: 'm2-two-stroke', kind: 'calc',
    q: 'A two-stroke exhaust port opens 97° before BDC and the transfers open 64° before BDC. What are the exhaust duration and blowdown?',
    options: ['97° and 64°', '161° and 33°', '194° and 33°', '194° and 64°'],
    answer: 2,
    explain: 'Piston-port events are symmetrical about BDC, so exhaust duration = 2 × 97 = 194°. Blowdown = 97 − 64 = 33°, typical of a motocross 125.',
  },
  {
    id: 'm2-12', module: 'engine', chapter: 'm2-two-stroke', kind: 'calc',
    q: 'How much two-stroke oil do you need to make 12 L of premix at 40:1?',
    options: ['240 mL', '480 mL', '120 mL', '300 mL'],
    answer: 3,
    explain: '12,000 mL / 40 = 300 mL. At 50:1 the same 12 L would need 12,000 / 50 = 240 mL.',
  },
  {
    id: 'm2-13', module: 'engine', chapter: 'm2-two-stroke', kind: 'diagnosis',
    q: 'After a rebuild a YZ125 revs but has no low-speed pull, then "comes on with a bang" at 9,000 rpm. Which is a likely cause?',
    options: ['Power valve stuck closed', 'Power valve stuck open or wrongly assembled', 'Premix ratio too rich in oil', 'Squish clearance too large'],
    answer: 1,
    explain: 'A power valve stuck open keeps the exhaust port at full height, which kills bottom-end torque. Chipped reed petals or a leaking exhaust joint are other causes. A valve stuck closed gives the opposite: an engine that will not rev.',
  },
  {
    id: 'm2-14', module: 'engine', chapter: 'm2-two-stroke', kind: 'recall',
    q: 'How does transfer-port injection (KTM TPI) reduce hydrocarbon emissions compared with a carburettor?',
    options: ['Fuel is sprayed into the transfer flow away from the exhaust, so mostly air short-circuits', 'It injects oil directly into the exhaust to burn unburnt fuel', 'It closes the exhaust port earlier with a power valve', 'It runs the engine much leaner at all loads'],
    answer: 0,
    explain: 'In a carburetted engine the escaping charge already contains fuel. Injecting late into the transfer streams, aimed away from the exhaust, means what short-circuits is mostly air.',
  },
  {
    id: 'm2-15', module: 'engine', chapter: 'm2-two-stroke', kind: 'recall',
    q: 'In loop (Schnürle) scavenging, why is a boost port placed opposite the exhaust?',
    options: ['To let exhaust gas escape faster during blowdown', 'To feed oil to the small end', 'To add flow up the rear wall and fill the region the main transfers leave stagnant', 'To cool the exhaust port bridge'],
    answer: 2,
    explain: 'The main transfers aim charge away from the exhaust, up the far wall and back down to the exhaust in a loop. The boost port sends extra flow up the rear wall so no pocket of burnt gas is left behind.',
  },

  // ---------------------------------------------------------------- 2.4 top end
  {
    id: 'm2-16', module: 'engine', chapter: 'm2-top-end', kind: 'recall',
    q: 'What does a squish band do, and what is its typical clearance?',
    options: ['Seals the head gasket; 0.05 mm', 'Holds the valve seat insert; 0.8–1.0 mm', 'Reduces compression for easier starting; 3–5 mm', 'Pushes gas to the centre for turbulence and cools the end gas; 0.8–1.5 mm'],
    answer: 3,
    explain: 'As the piston nears TDC the squish band forces gas toward the centre, speeding the flame and cooling the end gas, which raises the knock limit. Typical clearance is 0.8–1.5 mm.',
  },
  {
    id: 'm2-17', module: 'engine', chapter: 'm2-top-end', kind: 'calc',
    q: 'A K-Light 125 inlet stem measures 5.42 mm and its guide 5.49 mm (limits: stem 5.40, guide 5.50, clearance 0.08 mm). What is the verdict?',
    options: ['Clearance 0.07 mm: both parts within limits, but little margin left', 'Clearance 0.07 mm: guide over its limit, replace the guide', 'Clearance 0.09 mm: over limit, replace both', 'Clearance 0.02 mm: too tight, ream the guide'],
    answer: 0,
    explain: '5.49 − 5.42 = 0.07 mm, under the 0.08 mm limit. The stem is above 5.40 and the guide below 5.50, so both may be reused, though replacement is advisable during a full overhaul.',
  },
  {
    id: 'm2-18', module: 'engine', chapter: 'm2-top-end', kind: 'calc',
    q: 'A shim-under-bucket exhaust valve measures 0.12 mm (spec 0.22–0.27 mm) with a 2.60 mm shim. Which shim reaches mid-range?',
    options: ['2.725 mm', '2.475 mm', '2.500 mm', '2.600 mm'],
    answer: 1,
    explain: 'New shim = old + (measured − target) = 2.60 + (0.12 − 0.245) = 2.475 mm. Clearance is too small, so the shim must get thinner, not thicker.',
  },
  {
    id: 'm2-19', module: 'engine', chapter: 'm2-top-end', kind: 'diagnosis',
    q: 'Why does valve clearance usually close up as a modern engine wears, and what happens if it is ignored?',
    options: ['The cam lobe wears; the valve ticks loudly but is unharmed', 'The rocker tip wears; the engine loses top-end power only', 'The valve recedes into its seat; it stops closing fully, loses compression and burns', 'The spring weakens; the valve floats at idle'],
    answer: 2,
    explain: 'Face and seat wear let the valve sink (recession), raising its stem tip toward the rocker or bucket. At zero clearance hot gas leaks past, compression falls and the exhaust valve burns. Rocker or cam wear does the opposite and opens clearance.',
  },

  // ---------------------------------------------------------------- 2.5 bottom end
  {
    id: 'm2-20', module: 'engine', chapter: 'm2-bottom-end', kind: 'diagnosis',
    q: 'A K-Light 125 big end shows 0.06 mm radial clearance (standard 0.008–0.018, limit 0.05 mm). What is required?',
    options: ['Nothing: it is within the standard range', 'Fit oversize big-end shells', 'Change to a thicker oil to take up the play', 'Replace the crankshaft assembly (or rod, pin and rollers if rebuildable)'],
    answer: 3,
    explain: '0.06 mm exceeds the 0.05 mm limit. The K-Light uses a one-piece rod with a roller big end on a pressed-up crank, so it has no shells: the crank assembly is replaced or rebuilt.',
  },
  {
    id: 'm2-21', module: 'engine', chapter: 'm2-bottom-end', kind: 'calc',
    q: 'What is the peak primary inertia force of a single with 0.32 kg reciprocating mass and 60 mm stroke at 7,000 rpm?',
    options: ['About 10.3 kN', 'About 2.6 kN', 'About 5.2 kN', 'About 0.7 kN'],
    answer: 2,
    explain: 'r = half the stroke = 0.030 m; ω = 7,000 × 2π / 60 = 733 rad/s. F = 0.32 × 0.030 × 733² ≈ 5,160 N. Using the full stroke as r doubles it to the wrong 10.3 kN.',
  },
  {
    id: 'm2-22', module: 'engine', chapter: 'm2-bottom-end', kind: 'recall',
    q: 'What happens if a single-cylinder crank is given a balance factor of 100 %?',
    options: ['Vertical primary force cancels, but an equal horizontal force appears', 'The engine becomes perfectly smooth', 'Secondary forces are cancelled as well', 'The big-end load is halved'],
    answer: 0,
    explain: 'A counterweight makes a rotating force, while piston force acts only along the cylinder. Cancelling all of it vertically adds an equal force at 90°, so the engine shakes fore-and-aft instead. Singles typically use 50–70 % plus a balancer shaft.',
  },
  {
    id: 'm2-23', module: 'engine', chapter: 'm2-bottom-end', kind: 'diagnosis',
    q: 'A two-stroke idles high and its revs hang when the throttle is closed. Which bottom-end part is a likely cause?',
    options: ['Worn small-end needle bearing', 'Leaking crankshaft seal admitting air', 'Worn second compression ring', 'Excess big-end side clearance'],
    answer: 1,
    explain: 'The two-stroke crankcase must be pressure-tight. A leaking crank seal (or base gasket) lets in air the throttle does not control, weakening the mixture and holding the revs up.',
  },

  // ---------------------------------------------------------------- 2.6 lubrication and cooling
  {
    id: 'm2-24', module: 'engine', chapter: 'm2-lubrication-cooling', kind: 'recall',
    q: 'Which JASO oil class suits a CVT scooter with a dry centrifugal clutch?',
    options: ['JASO MA2', 'JASO FD', 'JASO MA', 'JASO MB'],
    answer: 3,
    explain: 'With no oil-bathed clutch to slip, low-friction JASO MB reduces engine friction and fuel use. MA and MA2 are for wet clutches; FD is a two-stroke oil grade.',
  },
  {
    id: 'm2-25', module: 'engine', chapter: 'm2-lubrication-cooling', kind: 'recall',
    q: 'What do the two numbers of a 10W-40 oil describe?',
    options: ['10W the cold cranking/pumping grade; 40 the viscosity at 100 °C', '10W the viscosity at 40 °C; 40 the maximum operating temperature', '10W the winter flash point; 40 the API category', '10W the viscosity at 10 °C; 40 the viscosity at 40 °C'],
    answer: 0,
    explain: 'Under SAE J300, the W number is defined by low-temperature cranking and pumping limits, and 40 means 12.5 to under 16.3 mm²/s at 100 °C.',
  },
  {
    id: 'm2-26', module: 'engine', chapter: 'm2-lubrication-cooling', kind: 'diagnosis',
    q: 'Bubbles appear continuously in the radiator header tank at idle. What is the likely cause and how would you confirm it?',
    options: ['Air trapped after a coolant change; bleed the system', 'Thermostat stuck closed; feel the radiator hose', 'Failed head gasket or cracked head; use a combustion leak (block) tester', 'Weak pressure cap; replace the cap'],
    answer: 2,
    explain: 'Continuous bubbles mean combustion gas is entering the coolant. A block tester detects CO₂ in the header tank; a leak-down test showing bubbles in the coolant also confirms it.',
  },
  {
    id: 'm2-27', module: 'engine', chapter: 'm2-lubrication-cooling', kind: 'diagnosis',
    q: 'A K-Light 125 oil pump shows 0.28 mm rotor tip clearance. What should you do?',
    options: ['Reuse it: 0.28 mm is within the 0.30 mm limit', 'Replace it: the limit is 0.25 mm, and wear reduces oil delivery to the head', 'Shim the pump cover to restore end clearance', 'Reuse it but change to a thicker oil'],
    answer: 1,
    explain: 'Standard is 0.10–0.15 mm with a 0.25 mm limit. A worn pump delivers less oil and pressure, especially hot, causing rocker and cam wear, a noisy valve train and possible big-end distress.',
  },

  // ---------------------------------------------------------------- 2.7 diagnosis and service
  {
    id: 'm2-28', module: 'engine', chapter: 'm2-diagnosis', kind: 'diagnosis',
    q: 'A K-Light 125 reads 0.75 MPa dry and 0.95 MPa wet (spec 1.0–1.2 MPa). What does this show?',
    options: ['Heavy carbon build-up in the chamber', 'A burnt or tight valve', 'Worn rings, piston or bore', 'A healthy engine: the wet reading is what counts'],
    answer: 2,
    explain: 'The dry reading is low and rises about 27 % with oil, well over the 10–15 % guide. The oil temporarily sealed the ring gap, pointing to rings, piston or bore. A valve fault would barely change with oil.',
  },
  {
    id: 'm2-29', module: 'engine', chapter: 'm2-diagnosis', kind: 'calc',
    q: 'A leak-down tester shows 100 psi in and 78 psi in the cylinder. What is the leakage and is it acceptable?',
    options: ['78 %, engine is scrap', '22 %, within normal wear', '12 %, good', '22 %, over the 20 % guide: a fault to diagnose'],
    answer: 3,
    explain: 'Leakage = (100 − 78) / 100 × 100 = 22 %. As a general guide under 10 % is good, 10–20 % shows wear and over 20 % indicates a fault; listen at the exhaust, intake and breather to find it.',
  },
  {
    id: 'm2-30', module: 'engine', chapter: 'm2-diagnosis', kind: 'diagnosis',
    q: 'A spark plug comes out with a chalk-white, blistered insulator and eroded electrodes. What does it indicate?',
    options: ['Overheating: lean mixture, air leak, over-advanced timing or plug too hot', 'Rich mixture or a blocked air filter', 'Oil entering past the rings or guides', 'Normal combustion with the correct heat range'],
    answer: 0,
    explain: 'Chalk-white and blistered means the plug ran too hot. Find the cause before running further. Dry black soot means rich; wet black means oil; light grey or tan is normal.',
  },
];
