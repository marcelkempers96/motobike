from arts5 import A, OV, L, R, RP, fig, ARTICLES

# ---------------------------------------------------------------- 13
ARTICLES.append(dict(
slug='carburettor-cleaning-basics',
title='Carburettor cleaning basics: symptoms and when to clean',
h1='Carburettor cleaning basics',
desc='How to tell when a motorcycle carburettor needs cleaning, what to check first, and how to clean and inspect jets, float, needle and slide safely.',
label='Fuel system',
lead='A dirty carburettor is blamed for many running faults that it did not cause. Knowing which part of the carburettor controls which part of the throttle range lets you match the symptom to the circuit, rule out the simpler causes, and clean only when the evidence points there.',
summary='Match the symptom to the carburettor circuit, rule out the simple causes, then clean and inspect it properly.',
hero=dict(src=A+'photos/carburettor-work.jpg', w=1600, h=1066, alt='A mechanic working on the carburettor of an air-cooled single-cylinder trail motorcycle in a workshop, with the fuel tank removed', cap='Working on the carburettor of an air-cooled trail bike. Photograph: Transitions Lab collection.'),
thumb=A+'photos/carburettor-work.jpg',
body=f'''
<h2 id="how-it-meters">How a carburettor meters fuel</h2>
<p>As the piston descends on the intake stroke, air rushes through the carburettor. Where the passage narrows, at the venturi or under the throttle slide, the air speeds up and its pressure falls. A fuel nozzle opens into this low-pressure zone, while the float bowl above the fuel is vented to the atmosphere, so fuel is pushed up through calibrated jets into the airstream. The float and its needle valve keep the fuel in the bowl at a constant height, so that the jets always draw from the same level.</p>
<p>Because a single jet cannot hold the mixture right from idle to full throttle, a carburettor has several overlapping circuits. Each one dominates a portion of the <strong>throttle opening</strong>, not of engine speed, and that is the key to diagnosis.</p>
{fig('illustrations/powertrain/PT01.png', 2400, 1395, 'Technical section of a slide carburettor showing venturi, throttle slide and jet needle, needle jet, main jet, pilot circuit, float bowl, float and float needle, with fuel shaded', 'A slide carburettor in section, with the pilot circuit, jet needle, main jet and float. Plate PT01, Motopedia Module 3.')}

<h2 id="symptoms">Match the symptom to the circuit</h2>
<div class="mz-art-table"><table>
  <thead><tr><th>Throttle opening</th><th>Circuit in charge</th><th>Typical symptom when blocked or wrong</th></tr></thead>
  <tbody>
    <tr><td>Closed to 1/8</td><td>Pilot jet and pilot (mixture) screw</td><td>Poor idle, stalling, hard starting, stumble just off idle</td></tr>
    <tr><td>1/8 to 1/4</td><td>Slide cutaway and by-pass holes</td><td>Hesitation as the throttle starts to open</td></tr>
    <tr><td>1/4 to 3/4</td><td>Jet needle and needle jet</td><td>Surging or running hot at part throttle</td></tr>
    <tr><td>3/4 to full</td><td>Main jet</td><td>Power falls away or engine cuts at full throttle</td></tr>
    <tr><td>Cold start</td><td>Enricher (starter) circuit</td><td>Will not start cold, starts fine warm</td></tr>
  </tbody>
</table></div>
<p>The pilot jet has the smallest passages and is usually the first to block, and a partly blocked pilot jet is the classic cause of a bike that will not idle without the choke. The enricher on most modern carburettors works best with the throttle shut, and opening the throttle during a cold start weakens it.</p>

<h2 id="check-first">Check these before blaming the carburettor</h2>
<ul>
  <li><strong>Air filter.</strong> A blocked filter increases the depression on every jet and makes the mixture rich at all openings. It is the first check for an over-rich mixture in the K-Light 125 fault trees, the manual used as the worked example in the Motopedia course.</li>
  <li><strong>Air leaks.</strong> A split intake rubber, a loose clamp or a cracked heat insulator lets in unmetered air and leans the mixture, mostly at idle.</li>
  <li><strong>Tank vent.</strong> A blocked vent lets the engine run for a few kilometres, then stop; it restarts after the filler cap is opened with a hiss.</li>
  <li><strong>Fuel tap.</strong> Check the filter gauze on the tap's standpipe, the ON and reserve positions, and on a vacuum-operated tap the diaphragm and its vacuum hose.</li>
  <li><strong>CV diaphragm.</strong> On a constant-velocity carburettor, a torn diaphragm leaves the piston down, so the engine idles and runs but will not rev beyond a moderate speed. Lift the piston by hand and check that it falls smoothly, and hold the diaphragm up to a light to look for pinholes.</li>
  <li><strong>Spark plug.</strong> A dry black sooty plug points to a rich mixture; a white blistered plug points to a lean one. Our guide to <a href="../spark-plug-reading/">reading a spark plug</a> shows how.</li>
</ul>
<p>Also check the float level. A float set too high enriches every circuit, and if the needle sticks open the bowl overflows through its overflow tube. A float set too low leans every circuit and causes surging at high speed.</p>

<h2 id="when-to-clean">When to clean</h2>
<p>Clean the carburettor when the symptom matches a circuit and the simpler causes above have been ruled out, when fuel has been left to stand in the bowl and the bike now runs only on the choke, or when you find dirt or water in the float bowl. Cleaning is not a cure for wrong jetting: a change of altitude, exhaust or air filter alters the airflow, and the course's jetting chapter explains how to correct the mixture in the right order, main jet first.</p>

<h2 id="how-to-clean">How to clean and inspect</h2>
<p>The MAVCC Motorcycle Mechanic course, one of the sources for the Motopedia modules, sets out a workshop procedure for a full clean in a dip tank. The main points apply to any method.</p>
<ol>
  <li><strong>Drain and remove.</strong> Drain the float bowl into a container, never onto a hot engine, and work in a ventilated area away from sparks and flames.</li>
  <li><strong>Strip it.</strong> Note the pilot screw position by counting the turns to lightly seated before removing it. Remove the float, needle, jets, slide or piston and the enricher.</li>
  <li><strong>Keep rubber out of the cleaner.</strong> Remove all O-rings, the diaphragm and gaskets. Carburettor cleaner destroys rubber parts.</li>
  <li><strong>Soak, rinse and dry.</strong> Lower the metal parts in a basket into the cleaner for the time on the cleaner's directions (the MAVCC job sheet gives fifteen to thirty minutes), drain, rinse thoroughly in cold water, then blow out every passage and dry the parts with compressed air.</li>
  <li><strong>Check the jets against the light.</strong> Look through each jet. Clear a blockage with compressed air or aerosol cleaner, <strong>never with a wire or drill bit</strong>, which enlarges the calibrated hole. Replace any jet that will not clear.</li>
  <li><strong>Inspect the wear parts.</strong> A worn float needle shows a ring round its tapered seating face; replace the needle and seat together. Check the float pin for wear, and shake the float near your ear: fuel inside means it is leaking. Check the slide for deep scratches, the slide guide pin for damage, and the jet needle for straightness and wear at the clip.</li>
  <li><strong>Reassemble</strong> with new O-rings and gaskets, set the float height to the manual figure, and return the pilot screw to its counted position.</li>
</ol>
<div class="mz-art-note"><p>Carburettor cleaner is a toxic chemical. Wear a face shield and rubber gloves, take care when lifting the basket and rinsing, and beware of residue blowing back when drying with compressed air. Wash any splash off skin with plenty of water and soap. Do not wash carburettor parts in a parts-washer solvent tank, which contaminates the solvent.</p></div>

<h2 id="adjusting">Screws, jets and numbers</h2>
<p>On a carburettor whose adjusting screw sits on the engine side of the slide, it is a <strong>fuel screw</strong> and turning it out richens the idle mixture; on the intake side it is an <strong>air screw</strong> and turning it out leans it. Many constant-velocity carburettors built since the 1980s have the fuel screw sealed for emissions reasons. Main jet numbers are not the same between brands: on Mikuni hex mains the number is proportional to flow, while on Keihin mains it approximates the hole diameter in hundredths of a millimetre.</p>

<h2 id="injection">Fuel-injected bikes</h2>
<p>Most new motorcycles, including the K-Light 125, use fuel injection instead. The throttle body still collects carbon round the butterfly, but it is cleaned differently: spray carburettor cleaner into the bore with the butterfly opened by the cable, never by forcing a tool into the bore, and keep the cleaner off the throttle position sensor. Many ECUs then need an idle relearn.</p>
<p>The <a href="{RP}carb">carburettor page</a> and the <a href="{RP}air_filter">air filter page</a> in the Repair section collect the related faults and checks. Chapter 3.1 of the course, <a href="{L}m3-mixture">Air, fuel and mixture</a>, covers every circuit, the jetting method and carburettor synchronising.</p>
''',
cta=dict(label='Fix it', h='Explore the carburettor and its faults', p='Select the carburettor in the Overview to see where it sits between the air filter and the engine, then open the Repair section for running faults by symptom and by part.', links=[(RP+'carb', 'Carburettor repairs', True), (OV+'carb', 'Explore the carburettor', False), (L+'m3-mixture', 'Read chapter 3.1', False)]),
faq=[
 ('How do I know if my motorcycle carburettor needs cleaning?', 'Typical signs are an engine that will only idle on the choke, stalls or stumbles just off idle, or loses power at a particular throttle opening, after the air filter, tank vent, fuel tap and air leaks have been checked.'),
 ('Can I clean carburettor jets with a wire?', 'No. A wire or drill bit enlarges the calibrated hole and changes the mixture. Use compressed air or aerosol cleaner, and replace a jet that will not clear.'),
 ('Why does my motorcycle only run with the choke on?', 'The engine is running lean at small throttle openings. The usual causes are a partly blocked pilot jet or an air leak between the carburettor and the engine.'),
 ('Should rubber parts go in carburettor cleaner?', 'No. Remove all O-rings, gaskets and the diaphragm first, because carburettor cleaner destroys rubber.'),
],
related=['motorcycle-will-not-start', 'spark-plug-reading', 'how-a-motorcycle-engine-works'],
))

# ---------------------------------------------------------------- 14
ARTICLES.append(dict(
slug='spark-plug-reading',
title='Spark plug reading: colours, gap and heat range explained',
h1='How to read a spark plug',
desc='How to read a motorcycle spark plug: what tan, black, oily and white deposits mean, how to set the gap, and how heat range and plug codes work.',
label='Ignition',
lead='A spark plug is a small window into the combustion chamber. The colour and condition of its insulator and electrodes show whether the mixture is right, whether oil is getting in and whether the engine is running too hot, which makes it one of the cheapest diagnostic tools in the workshop.',
summary='What each plug colour means, how to set the gap correctly, and how heat range and plug codes work.',
hero=dict(src=A+'renders/spark_plug.webp', w=1000, h=800, alt='Rendered motorcycle spark plug with white ribbed ceramic insulator, hex and threaded steel shell, and a second plug showing the electrodes', cap='A resistor spark plug: ceramic insulator, steel shell with thread and hex, and the centre and earth electrodes that form the gap. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/spark_plug.webp',
body=f'''
<h2 id="anatomy">What a spark plug is made of</h2>
<p>A spark plug has a steel <strong>shell</strong> with a thread and a sealing seat, an aluminium-oxide ceramic <strong>insulator</strong>, a <strong>centre electrode</strong> (nickel alloy, often with a copper core, or fine platinum or iridium wire), and an <strong>earth electrode</strong> welded to the shell. The gap between the two electrodes is where the spark jumps. Resistor plugs also contain a resistor of about 5 kΩ that limits radio interference.</p>

<h2 id="heat-range">Heat range: why plugs run at a set temperature</h2>
<p>The insulator nose must run between about <strong>450 °C</strong>, below which carbon and oil deposits build up and the plug fouls, and about <strong>850 °C</strong>, above which the tip glows and can ignite the mixture before the spark. The <strong>heat range</strong> describes how quickly the insulator passes heat to the shell and the cylinder head. A hot plug has a long insulator nose and suits low-load commuting; a cold plug has a short nose and suits sustained high load.</p>
<p>Plug codes encode heat range, and the direction varies by brand. In the NGK system, and the brands that follow it, a higher number means a colder plug; Bosch and Champion number heat ranges the other way. The K-Light 125, the commuter used as the worked example in the Motopedia course, uses a <strong>D7RTC</strong>: D for the M12 × 1.25 thread family, 7 for the heat rating, R for a built-in resistor and C for a copper-cored centre electrode. Always confirm an equivalent from a published cross-reference rather than by matching digits.</p>

<h2 id="when-to-read">When to read a plug</h2>
<p>Read the plug after a run at steady load, not after idling, which leaves soot on any plug. For a precise reading of the full-throttle mixture, mechanics use a <strong>plug chop</strong>: the engine is stopped while running under load at the throttle opening being tested, so that it never idles before the plug comes out. Clean round the plug before removing it so that dirt cannot fall into the cylinder.</p>

<h2 id="colours">What the colours mean</h2>
<div class="mz-art-table"><table>
  <thead><tr><th>Appearance</th><th>Meaning</th><th>Next step</th></tr></thead>
  <tbody>
    <tr><td>Light grey or tan insulator, little deposit</td><td>Normal combustion, correct heat range</td><td>None</td></tr>
    <tr><td>Dry black soot</td><td>Rich mixture, blocked air filter, choke or enricher left on, too much idling, plug too cold, weak spark</td><td>Check the filter, enricher, mixture and ignition</td></tr>
    <tr><td>Wet black oily deposit</td><td>Oil entering past rings or valve guides; on a two-stroke, too much oil or flooding</td><td>Compression and leak-down test</td></tr>
    <tr><td>Chalk-white blistered insulator, eroded electrodes</td><td>Overheating: lean mixture, air leak, ignition too far advanced, plug too hot</td><td>Find the cause before riding further</td></tr>
    <tr><td>Small metal specks on the insulator</td><td>Detonation or piston damage beginning</td><td>Stop and inspect</td></tr>
    <tr><td>Glazed yellow-brown deposits</td><td>High-speed running after deposits built up, fuel additives</td><td>Replace the plug</td></tr>
    <tr><td>Wet with fuel after cranking</td><td>Flooding or no spark</td><td>Spark test</td></tr>
  </tbody>
</table></div>
<p>A white plug is the one to act on quickly, because the lean mixture or over-advanced timing that causes it can hole a piston. A dry sooty plug on a city bike that fouls regularly needs the mixture checked first; if the mixture is right, a hotter plug (one number lower in the NGK system) may help.</p>

<h2 id="gap">Setting the gap</h2>
<p>The spark needs more voltage to jump a wider gap, and the requirement rises as the electrodes wear round. The K-Light 125 gap is <strong>0.7 ± 0.1 mm</strong>. Measure it with a <strong>wire-type gauge</strong>, not a flat feeler gauge, which reads wrongly on worn, rounded electrodes. Adjust by bending only the earth electrode, and never lever against the centre electrode or the insulator.</p>
<p>Fit the plug by hand first so that it cannot cross-thread, then tighten it to the specified torque: 15 N·m on the K-Light. A plug with too long a reach can strike the piston or valves; one with too short a reach leaves carbon in the exposed head threads.</p>
<p>Replace a plug whose electrodes are eroded or corroded, whose insulator is cracked, or which is carbon-fouled.</p>

<h2 id="caps">Caps, resistors and misfires</h2>
<p>The spark is a fast current pulse that radiates interference and can upset ECUs and instruments, so a resistor plug, a suppressor cap (typically 5 kΩ) or a resistive lead limits it. Fitting a non-resistor plug and a non-resistor cap to an ECU-controlled engine can cause erratic running. A cap that has cracked or absorbed water lets the spark track to earth, causing a misfire in wet weather.</p>
{fig('illustrations/wiring/F22.png', 2400, 1530, 'Wiring plate of motorcycle ignition circuits showing a capacitor discharge ignition with exciter and pulser coils and an ECU-controlled inductive ignition, each with ignition coil, spark plug and engine stop switch', 'Two ignition systems: capacitor discharge (CDI) and ECU-controlled inductive ignition. Plate F22, Motopedia Module 3.')}
<p>Two-strokes usually use capacitor discharge ignition (CDI), whose voltage rises so fast that the spark fires before it can leak away across an oily insulator. That suits engines whose plugs foul with oil, but the spark is short, so a two-stroke's plug colour also depends heavily on its oil ratio.</p>

<h2 id="spark-test">Testing for a spark</h2>
<p>If the engine will not start, fit the plug into an insulated spark tester set to about 6 to 8 mm, earth it and crank. A strong blue-violet spark is good; a weak orange spark or none points to the plug, the cap, the coil or the trigger. Our guide to <a href="../motorcycle-will-not-start/">diagnosing a motorcycle that will not start</a> continues from there.</p>
<div class="mz-art-note"><p>Ignition systems produce up to 35 kV. Never hold a plug or lead with bare hands during a spark test, and use an insulated tester rather than holding a plug against the cylinder head.</p></div>
<p>The <a href="{RP}spark_plug">spark plug page in the Repair section</a> collects the related faults. Chapter 3.3 of the course, <a href="{L}m3-ignition">Ignition systems</a>, explains coils, CDI and ignition timing, and our <a href="../carburettor-cleaning-basics/">carburettor cleaning guide</a> covers the mixture faults that plugs reveal.</p>
''',
cta=dict(label='Try it', h='See the spark plug in its engine', p='Select the spark plug in the Overview to see where it sits in the cylinder head, then use the Repair section to follow a misfire or a no-start back to its cause.', links=[(RP+'spark_plug', 'Spark plug repairs', True), (OV+'spark_plug', 'Explore the spark plug', False), (L+'m3-ignition', 'Read chapter 3.3', False)]),
faq=[
 ('What colour should a motorcycle spark plug be?', 'A light grey or tan insulator with little deposit means normal combustion and the correct heat range. Black soot means rich, wet oil means oil entry, and chalk white means overheating.'),
 ('What should the spark plug gap be on a 125 cc motorcycle?', 'Use the figure for your model. The K-Light 125 specifies 0.7 ± 0.1 mm with a D7RTC plug. Measure with a wire-type gauge.'),
 ('Is a higher spark plug number hotter or colder?', 'In the NGK system a higher number is colder. Bosch and Champion number the other way, so always use a published cross-reference.'),
 ('Why is my spark plug black?', 'A dry black sooty plug usually means a rich mixture: a blocked air filter, the choke left on, a fault in the fuel system, a lot of idling, or too cold a plug. A wet black oily plug means oil is getting in.'),
],
related=['motorcycle-will-not-start', 'carburettor-cleaning-basics', 'how-a-motorcycle-engine-works'],
))

# ---------------------------------------------------------------- 15
ARTICLES.append(dict(
slug='motorcycle-tyre-pressure-and-wear',
title='Motorcycle tyre pressure and wear: how to check them',
h1='Motorcycle tyre pressure and wear',
desc='How to set motorcycle tyre pressure, read tread wear indicators and sidewall markings, judge tyre age, and know when a puncture can be repaired.',
label='Tyres',
lead='Every force that accelerates, steers or stops a motorcycle passes through two contact patches, each roughly the size of a palm. Correct pressure and sound tread keep those patches working, and the checks take a gauge, a torch and five minutes.',
summary='Setting pressures cold, reading wear indicators and sidewall codes, tyre age and safe puncture repair.',
hero=dict(src=A+'renders/front_wheel_cast.webp', w=1000, h=800, alt='Rendered motorcycle front wheel with a five-spoke cast alloy rim and a road tyre with tread grooves', cap='A cast alloy wheel with a tubeless road tyre. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/front_wheel_cast.webp',
body=f'''
<h2 id="why">Why it matters</h2>
<p>All the propulsive, cornering and braking forces finally act at the tyre <strong>contact patch</strong>, roughly 20 to 40 cm² on a commuter tyre. Its friction limits every acceleration, every corner and every stop. Pressure sets the size and shape of that patch, and the tread clears water from it.</p>

<h2 id="pressure">Setting the pressure</h2>
<p>Set pressures <strong>cold</strong>, before riding, with an accurate gauge, to the figures in the handbook. Riding warms the air in the tyre and raises the reading, so a pressure set warm will be too low once the tyre cools. The K-Light 125, the commuter used as the worked example in the Motopedia course, runs <strong>190 ± 10 kPa (27.5 psi) front and 210 ± 10 kPa (30.5 psi) rear</strong> solo. Many handbooks give a higher rear pressure for a passenger or a heavy load.</p>
<ul>
  <li><strong>Under-inflation</strong> makes the tyre flex and overheat, wears the shoulders, and makes the steering heavy and vague. The K-Light manual lists low pressure as a cause of heavy steering and instability.</li>
  <li><strong>Over-inflation</strong> shrinks the contact patch, reducing grip and comfort.</li>
</ul>
<p>Check pressures at least monthly and before long trips; a weekly check is better for a working motorcycle. A tyre that needs air every week has a slow puncture, a leaking valve or a damaged bead seat.</p>

<h2 id="tread">Tread depth and wear indicators</h2>
<p>Look for small raised blocks in the main grooves, marked by a triangle or the letters TWI on the shoulder. These <strong>tread wear indicators</strong> leave about 0.8 to 1 mm of tread when the surface is level with them. The K-Light 125 wear limit is <strong>1 mm</strong>, which is also the legal minimum in the UK for machines over 50 cc; check the rules in your country.</p>
<p>Wear pattern matters as well as depth. A rear tyre used mostly in a straight line wears flat in the centre, and a <strong>square-worn</strong> tyre makes the bike drop suddenly into corners; replace it before it reaches the legal limit. Also look for cracks, nails, cuts and bulges on the tread and the sidewalls, and note any directional arrow, which must point in the direction of rotation.</p>
{fig('illustrations/wheels/F20.png', 2400, 1530, 'Technical plate of a motorcycle tyre showing sidewall markings with size 110/70-17 54H, DOT date code and tread wear indicator position, and a section through bead, bead wire, carcass plies, belt, sidewall and tread', 'Tyre sidewall markings and construction. Plate F20, Motopedia Module 4.')}

<h2 id="markings">Reading the sidewall</h2>
<p>A size of <strong>110/70-17 54H</strong> reads: section width 110 mm; aspect ratio 70 per cent, so the sidewall is 77 mm high; a dash for bias construction (R would mean radial, B bias-belted); a 17 inch rim; load index 54; and speed symbol H.</p>
<p>The <strong>load index</strong> is the maximum load per tyre at the reference pressure: 49 means 185 kg, 54 means 212 kg, 59 means 243 kg and 73 means 365 kg. The <strong>speed symbol</strong> is the maximum speed the tyre is rated for: J is 100 km/h, L 120 km/h, P 150 km/h, H 210 km/h and V 240 km/h.</p>
<p>Older commuter sizes such as 90/90-17 or 3.00-18 sometimes have no load and speed suffix. The K-Light 125 runs a 90/90-17 front and a 130/90-15 rear. Replacement tyres should match the size, load index and speed rating in the handbook. TL on the sidewall means tubeless and TT means tube type.</p>

<h2 id="age">How old is too old?</h2>
<p>The <strong>DOT code</strong> ends in four digits that give the week and year of manufacture: 2324 means week 23 of 2024. Rubber hardens with age even when a tyre is not used, so most makers recommend inspection from five years old and replacement at ten years regardless of tread. A low-mileage motorcycle can have plenty of tread on tyres that no longer grip.</p>

<h2 id="punctures">Punctures and repairs</h2>
<p>A tubeless tyre usually deflates slowly, because the rubber grips the object; a tube can split and deflate suddenly. A proper tubeless repair is a <strong>combined plug-patch</strong> fitted from inside after removing the tyre from the rim. Most tyre makers allow repairs only in the central part of the tread, for injuries no larger than about 6 mm, with no previous repair nearby and no sidewall or shoulder damage, and some do not allow motorcycle tyre repairs at all. An external string plug is a temporary get-you-home measure only, and a tube must never be fitted to cure a leak in a damaged tubeless tyre.</p>

<h2 id="wheels">Wheels, balance and bearings</h2>
<p>While you are at the wheel, spin it and watch the rim. The K-Light manual gives a runout standard within 1.0 mm and a limit of 2.0 mm, measured with a dial gauge. A shake through the handlebar at around 80 to 110 km/h usually means the wheel needs balancing. Lift the wheel and rock it at top and bottom: any play or roughness points to worn wheel bearings, which on the K-Light must not be reused once removed.</p>
<div class="mz-art-note"><p>Tyres and brakes keep a rider upright more than any other part. If a tyre has a bulge, a deep cut or exposed cords, replace it before riding again.</p></div>
<p>The Repair section's pages for the <a href="{RP}front_wheel">front wheel</a> and <a href="{RP}rear_wheel">rear wheel</a> collect wheel and tyre faults with their checks. Our <a href="../how-to-check-motorcycle-brake-pads/">brake pad guide</a> covers the other half of the stopping system, and chapter 4.6 of the course, <a href="{L}m4-wheels-tyres">Wheels and tyres</a>, includes the full tyre-fitting and balancing job sheet.</p>
''',
cta=dict(label='Fix it', h='Check the wheels and tyres', p='Select a wheel in the Overview to see the rim, tyre and hub in 3D, then use the Repair section for wheel, tyre and bearing faults part by part.', links=[(RP+'front_wheel', 'Wheel and tyre repairs', True), (OV+'front_wheel', 'Explore the front wheel', False), (L+'m4-wheels-tyres', 'Read chapter 4.6', False)]),
faq=[
 ('What should my motorcycle tyre pressure be?', 'Use the figures in your handbook, set cold. The K-Light 125 runs 190 ± 10 kPa (27.5 psi) front and 210 ± 10 kPa (30.5 psi) rear solo; many handbooks give a higher rear pressure with a passenger.'),
 ('What is the minimum tread depth for a motorcycle tyre?', 'In the UK it is 1 mm for machines over 50 cc, which is also the K-Light 125 wear limit. Rules vary by country. Tread wear indicators leave about 0.8 to 1 mm.'),
 ('How old can a motorcycle tyre be?', 'Rubber hardens with age. Most makers recommend inspection from five years old and replacement at ten years regardless of tread. The last four digits of the DOT code give the week and year of manufacture.'),
 ('Can a motorcycle tyre puncture be repaired?', 'Sometimes. A tubeless tyre can be repaired with a combined plug-patch from inside if the hole is in the central tread, no larger than about 6 mm and away from other repairs, but some makers forbid motorcycle tyre repairs. String plugs are temporary only.'),
],
related=['how-to-check-motorcycle-brake-pads', 'boda-boda-maintenance-checklist', 'types-of-motorcycles'],
))

# ---------------------------------------------------------------- 16
ARTICLES.append(dict(
slug='electric-motorcycle-battery-care',
title='Electric motorcycle battery care: charging and storage',
h1='Electric motorcycle battery care',
desc='How to make an electric motorcycle battery last: charging habits, heat and cold, storage, what the BMS does, battery swapping, and when a pack is unsafe.',
label='Electric',
lead='The traction battery is the most expensive part of an electric motorcycle, and how it is charged, stored and kept cool decides how long it lasts. The rules are few and grounded in how lithium-ion cells age, and most of them cost nothing to follow.',
summary='Charging habits, temperature, storage, the BMS and swapping, plus the signs of a pack that must not be charged.',
hero=dict(src=A+'renders/photo/render-battery.jpg', w=1529, h=1190, alt='Rendered battery module of cylindrical lithium-ion cells in moulded holders, joined by nickel strips with a copper busbar and a small BMS board, with two loose cells beside it', cap='A module of 21700 cylindrical cells with nickel strips, busbar and balance leads running to the BMS board. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/photo/render-battery.jpg',
body=f'''
<h2 id="how-batteries-age">How a battery wears out</h2>
<p>A lithium-ion pack loses capacity in two ways. <strong>Calendar ageing</strong> happens with time, whether or not the bike is ridden, and speeds up with heat and with a high state of charge: the rate roughly doubles for each 10 °C rise. <strong>Cycle ageing</strong> depends on how many charge cycles the pack does, how deep they are, the current and the temperature. The usual end of a pack's first life is <strong>80 per cent of its rated capacity</strong>, when the range has fallen by a fifth, and many battery warranties are written in those terms.</p>

<h2 id="charging-habits">Charging habits that extend life</h2>
<ul>
  <li><strong>Avoid sitting at 100 per cent.</strong> A highly charged cell ages faster. Where the motorcycle or charger allows it, charge to 80 to 90 per cent for daily use and to full only before a long ride.</li>
  <li><strong>Use the middle of the range.</strong> Cycling between 20 and 80 per cent can give two to three times as many equivalent full cycles as running from 0 to 100 per cent.</li>
  <li><strong>Do not leave it empty.</strong> If cell voltage falls below about 2 V, the copper current collector starts to dissolve and the cell becomes unsafe to recharge. Recharge soon after a long ride.</li>
  <li><strong>Use the right charger.</strong> A charger's set voltage must match the pack chemistry and cell count. A 72 V NMC pack charges to 84.0 V, while a 72 V LFP pack typically charges to 87.6 V, and the two chargers are not interchangeable. Many chargers will only start when the pack's management system authorises them, which prevents the wrong charger being used.</li>
</ul>
<p>Lithium-ion cells are charged in two stages: constant current until the pack reaches its set voltage, then constant voltage while the current tapers. About 70 to 85 per cent of the energy goes in during the first stage, which is why the last 20 per cent is slow and why fast-charging times are quoted to 80 per cent.</p>

<h2 id="temperature">Heat and cold</h2>
<p>Cells perform and age best between about 15 °C and 35 °C. A pack parked in East African sun can reach 50 to 60 °C before it is ridden, so park in the shade and keep a removable pack indoors. Most battery management systems block charging outside about <strong>0 to 45 °C</strong>, because charging a cold cell deposits metallic lithium on the anode. That lithium plating permanently reduces capacity and can grow dendrites that pierce the separator. Never fast charge a cold pack; a charge that takes 40 minutes at 25 °C can take twice as long at 5 °C as the system protects the cells.</p>
<p>A cold pack also sags more under load, because its internal resistance roughly doubles between 25 °C and 0 °C, so expect less power and an earlier low-battery cut-off on cold mornings.</p>

<h2 id="storage">Storing an electric motorcycle</h2>
<p>For storage of weeks or months, leave the pack at <strong>40 to 60 per cent</strong> charge in a cool, dry place out of direct sun. The difference is large: the course gives a capacity loss of 10 to 20 per cent in a year for a pack stored full at 40 °C, against a few per cent for one stored half charged at 15 to 25 °C. Check the charge every few weeks. Many packs put their management system into a deep sleep in storage, because an always-on system drawing 10 mA would drain 1 Ah in 100 hours and could empty a stored pack over months.</p>

<h2 id="bms">What the BMS does for you</h2>
<p>The <strong>battery management system</strong> measures the voltage of every series group of cells, the temperatures and the current. It estimates the state of charge shown on the dashboard, sets the maximum charge and discharge currents, and opens the circuit if a cell goes over or under voltage, overheats or sees a short circuit. It also <strong>balances</strong> the cells: near the top of a charge it bleeds a small current from any group that is higher than the rest, typically 30 to 200 mA, so a badly drifted pack can need several long charges to recover. Leaving the charger connected for the full balancing period after a full charge helps.</p>
{fig('illustrations/electrical/F26.png', 2400, 1500, 'Technical plate of an electric motorcycle battery pack: 21700 cylindrical cells in holders arranged in series-parallel groups, nickel strips and busbars, BMS board with balance leads and thermistors, enclosure and main connector, with a section through one cell', 'Battery pack construction: cells in series-parallel groups, busbars, BMS with balance leads and thermistors. Plate F26, Motopedia Module 5.')}
<p>Workshops read the group voltages from the BMS with diagnostic software. On an NMC pack at rest, a spread below 10 to 20 mV between the highest and lowest group is normal; a group that keeps falling within a few days of a balance charge points to a cell with high self-discharge, which balancing cannot cure.</p>

<h2 id="swapping">Swapping instead of charging</h2>
<p>With <strong>battery swapping</strong>, the rider exchanges an empty removable pack for a charged one in a minute or two, and the operator owns the batteries. Gogoro in Taiwan, the Gachaco service in Tokyo, and networks such as Spiro and Ampersand in East Africa work this way. The station reads each pack's identity and history and controls its charging rate and temperature, so the battery-care rules above become the operator's job. Riders of bikes with removable packs that they charge themselves, such as the Roam Air with its two 3.24 kWh packs, should follow them directly.</p>

<h2 id="safety">When a pack is unsafe</h2>
<div class="mz-art-note"><p>A pack that has been dropped, crashed or submerged, or that shows swelling, a sweet solvent smell, hissing, smoke, heat without use or leaking electrolyte must never be charged or refitted. If it can be done safely, move it outdoors to a non-combustible area away from buildings and vehicles, and treat it as hazardous waste for specialist handling.</p></div>
<p>A damaged lithium-ion cell can go into <strong>thermal runaway</strong>, a self-sustaining reaction that reaches 600 to 900 °C within seconds and releases flammable and toxic gases, and it can spread to neighbouring cells. Never open a traction pack or controller yourself: a nominal 72 V pack reaches 84 V when full, which is above the 60 V DC threshold for high-voltage work, and requires trained technicians with insulated tools. Inspect the charge port and connectors for looseness, burning or corrosion, and stop using a charger whose plug or lead gets hot.</p>
<p>The Repair section's pages for the <a href="{RP}battery">battery</a>, <a href="{RP}charge_port">charge port</a> and <a href="{RP}controller">controller</a> collect electric drive faults and checks. Our guide to <a href="../how-electric-motorcycles-work/">how electric motorcycles work</a> explains the full drivetrain, and chapters 5.4 and 5.5 of the course, <a href="{L}m5-batteries">Batteries and the BMS</a> and <a href="{L}m5-charging">Charging, swapping and standards</a>, go into cell chemistry, charging standards and swap networks.</p>
''',
cta=dict(label='Learn more', h='Take the battery apart in 3D', p='Select the battery, charge port and controller of the electric scrambler in the Overview, then use the Repair section for electric drive faults such as reduced range, a charger that will not start or a pack warning.', links=[(OV+'battery', 'Explore the battery', True), (RP+'battery', 'Battery repairs', False), (L+'m5-batteries', 'Read chapter 5.4', False)]),
faq=[
 ('Should I charge my electric motorcycle to 100 per cent?', 'For daily use, charging to 80 to 90 per cent where the system allows it slows ageing. Charge to full before a long ride, and avoid leaving the pack at 100 per cent for long periods.'),
 ('How should I store an electric motorcycle battery?', 'At 40 to 60 per cent charge in a cool, dry place out of direct sun, checking the charge every few weeks. Never store a pack empty.'),
 ('Can I charge an electric motorcycle in the cold?', 'Most battery management systems block charging below about 0 °C, because charging cold cells plates lithium on the anode. Let the pack warm up first and avoid fast charging when it is cold.'),
 ('Can I use a different charger on my electric motorcycle?', 'Only one made for that pack. The charger voltage must match the cell chemistry and cell count; a 72 V NMC pack and a 72 V LFP pack need different chargers.'),
],
related=['how-electric-motorcycles-work', 'motorcycle-battery-keeps-dying', 'boda-boda-maintenance-checklist'],
))
