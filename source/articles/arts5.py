from arts4 import A, OV, L, ARTICLES
R = '../../repair/'
RP = '../../repair/parts/#'

def fig(src, w, h, alt, cap):
    return f'''<figure>
  <img src="{A}{src}" alt="{alt}" width="{w}" height="{h}" loading="lazy">
  <figcaption>{cap}</figcaption>
</figure>'''

# ---------------------------------------------------------------- 9
ARTICLES.append(dict(
slug='motorcycle-will-not-start',
title='Motorcycle will not start: a diagnosis order that works',
h1='Why your motorcycle will not start',
desc='A step-by-step order for diagnosing a motorcycle that will not start: battery, interlocks, starter, spark, fuel and compression, with test values.',
label='Diagnosis',
lead='A motorcycle that will not start is missing one of a short list of things: enough battery to turn it over, a spark at the right moment, fuel in the right amount, or compression to squeeze it. Checking them in a fixed order, from the quickest to the most involved, finds the fault without guesswork or wasted parts.',
summary='A fixed diagnosis order for a non-starting bike: cranking, interlocks, spark, fuel and compression, with test values.',
hero=dict(src=A+'photos/workshop-garage.jpg', w=1600, h=1200, alt='Two riders bent over a blue motorcycle outside a home garage, one with his hands on the engine below the fuel tank', cap='Most no-start faults are found with a multimeter, a spark tester and a methodical order of checks. Photograph: Transitions Lab collection.'),
thumb=A+'photos/workshop-garage.jpg',
body=f'''
<h2 id="short-answer">The short answer</h2>
<p>An engine needs <strong>compression, a correctly timed spark and the right mixture</strong>, and the MAVCC Motorcycle Mechanic course teaches diagnosis from the least invasive check to the most invasive. Before dismantling anything, confirm the simple things: there is fuel in the tank, the battery is charged, the air filter is not blocked and the engine has oil. Then split the problem in two by asking one question: does the engine turn over when you press the starter?</p>

<h2 id="does-it-crank">Step 1: does the engine turn over?</h2>
<p>If the starter does not turn the engine, the fault is in the battery or the starting circuit, not in the fuel or ignition. If the engine turns over at a normal speed but does not fire, the battery and starter are fine and the search moves to spark, fuel and compression.</p>

<h2 id="no-crank">Step 2: the starter does not turn the engine</h2>
<h3 id="battery">Check the battery first</h3>
<p>Measure the battery voltage with a multimeter after the machine has stood for at least an hour. The K-Light 125 manual, the commuter used as the worked example in the Moto Zero course, gives 13.1 V for a fully charged battery and 12.3 V as the point where it needs charging. While cranking, a healthy battery should not drop below about 9.6 V. If the horn is weak and the starter does nothing, a flat battery or a loose terminal is the usual cause. Our guide to <a href="../motorcycle-battery-keeps-dying/">a battery that keeps going flat</a> covers the full battery and charging tests.</p>
<h3 id="interlocks">Then the interlocks</h3>
<p>The starter relay will only operate when the safety switches allow it. The neutral switch permits starting in neutral, the clutch switch permits starting in gear with the lever pulled, and the engine stop switch usually cuts the relay supply as well. On many scooters and on the K-Light 125, the brake lever must also be pulled. Check every switch before reaching for tools.</p>
<h3 id="relay">Listen for the relay</h3>
<p>The start button carries only a small current to the relay coil; the relay then switches the heavy current to the starter motor. If there is no click, the fault is on the control side: a switch, the start button, the fuse or the relay coil. If the relay clicks but the starter does not turn, the relay contacts are burned or the starter itself has failed. A voltage-drop test while cranking separates them. On the positive side, from the battery post to the starter terminal, the drop should be 0.5 V or less; across the relay contacts, 0.2 V or less; and on the earth side, 0.3 V or less.</p>
{fig('illustrations/wiring/F23.png', 2400, 1350, 'Wiring plate of an electric starting circuit showing battery, main fuse, ignition switch, start button, clutch, neutral and side-stand interlocks, starter relay, starter motor and starter clutch', 'The starting circuit. The start button only switches the relay; the relay switches the heavy starter current. Plate F23, Moto Zero Module 3.')}
<p>If the starter spins freely with a whirring noise but the engine does not turn, the one-way starter clutch is slipping. The Motorcycle Mechanic course names this as the commonest starter fault.</p>

<h2 id="cranks-no-start">Step 3: it cranks but will not fire</h2>
<p>The K-Light 125 fault trees follow a fixed order, and it works for most four-strokes.</p>
<h3 id="spark">Check for spark</h3>
<p>Remove the plug and look at it. Fit it, or a new plug, into an insulated spark tester set to a gap of about 6 to 8 mm, earth the tester and crank. A strong blue-violet spark is good; a weak orange spark or none means the ignition system needs testing: the plug cap, the coil, the crankshaft sensor and the switches. Our article on <a href="../spark-plug-reading/">reading a spark plug</a> explains what the plug's colour says about the engine.</p>
<div class="mz-art-note"><p>Ignition systems produce up to 35 kV. Never hold a plug or lead with bare hands during a spark test, and do not crank an engine with electronic ignition while the plug lead is disconnected and not earthed, because the unrestrained voltage can damage the coil or the control unit.</p></div>
<h3 id="fuel">Good spark: is fuel arriving?</h3>
<p>After cranking, look at the plug again. A <strong>dry plug</strong> means no fuel is reaching the cylinder. On an injected bike, listen for the fuel pump running for about 3 seconds when the key is turned on; the K-Light system holds a fuel pressure of about 300 kPa. On any bike, check the tank vent: a blocked vent lets the engine run for a few kilometres, then starve, and it restarts after the filler cap is opened with a hiss. On a carburetted bike, check that the fuel tap is on (or on reserve if the tank is low), that a vacuum tap is not stuck, and that the bowl fills. A <strong>wet plug</strong> means the engine is flooded, from repeated cranking, a leaking injector or a carburettor float stuck open.</p>
<h3 id="compression">Spark and fuel: check compression</h3>
<p>With spark and fuel confirmed, measure compression with the engine warm, the throttle fully open and a fully charged battery. A healthy K-Light 125 reads 1.0 to 1.2 MPa. Low compression comes from valve clearances that have closed up, leaking valve seats, worn or stuck rings, or an intake leak. Valve clearance is the cheaper fix, so check it before planning a top-end repair.</p>
<h3 id="starts-then-stops">It starts, then stops</h3>
<p>If the engine fires and then dies, the K-Light tree points first to a blocked air filter and a blocked by-pass passage in the throttle body. On a carburetted bike, a partly blocked pilot jet gives the same symptom; our <a href="../carburettor-cleaning-basics/">carburettor cleaning guide</a> explains how to tell.</p>

<h2 id="summary-table">Quick reference</h2>
<div class="mz-art-table"><table>
  <thead><tr><th>What happens</th><th>Likely cause</th><th>First check</th></tr></thead>
  <tbody>
    <tr><td>Nothing, horn weak</td><td>Flat battery, loose terminal</td><td>Battery voltage and terminals</td></tr>
    <tr><td>Nothing, no relay click</td><td>Interlock switch, start button, fuse, relay coil</td><td>Stop switch, brake or clutch lever, neutral, fuse</td></tr>
    <tr><td>Relay clicks, starter silent</td><td>Burned relay contacts, worn starter brushes</td><td>Voltage drop across the relay while cranking</td></tr>
    <tr><td>Starter spins, engine still</td><td>Starter clutch slipping</td><td>Inspect the starter clutch</td></tr>
    <tr><td>Cranks, no spark</td><td>Plug, cap, coil, crankshaft sensor, switches</td><td>Spark test, then each part in turn</td></tr>
    <tr><td>Cranks, spark, plug dry</td><td>No fuel: vent, tap, pump, filter</td><td>Tank vent, pump or tap, fuel at the bowl</td></tr>
    <tr><td>Cranks, spark, plug wet</td><td>Flooding, leaking injector, float stuck</td><td>Dry the plug and retry</td></tr>
    <tr><td>Spark and fuel, still no start</td><td>Low compression</td><td>Compression test, valve clearance</td></tr>
  </tbody>
</table></div>

<h2 id="electric">Electric motorcycles</h2>
<p>An electric motorcycle has no spark, fuel or compression, but the same logic applies: confirm the battery's state of charge, then the interlocks (side stand, kill switch and often a brake lever), then look for a fault message from the battery management system or controller. Never open a traction battery or controller; packs above 60 V DC need trained technicians. Our guide to <a href="../how-electric-motorcycles-work/">how electric motorcycles work</a> describes the parts involved.</p>
<p>For symptom-by-symptom help, the <a href="{R}problems/">Repair section's problem finder</a> lists common faults with their causes, and the parts pages for the <a href="{RP}battery">battery</a>, <a href="{RP}spark_plug">spark plug</a>, <a href="{RP}carb">carburettor</a> and <a href="{RP}wiring">wiring</a> collect the related checks. Chapter 3.6 of the course, <a href="{L}m3-diagnosis">Electrical diagnosis</a>, gives the full ignition and starter job sheets.</p>
''',
cta=dict(label='Fix it', h='Find the fault in the Repair section', p='The Repair section groups common motorcycle faults by symptom and by part, with the checks to carry out in order. Use it alongside the Wiring Lab, where you can follow the starting and ignition circuits on an interactive diagram.', links=[(R+'problems/', 'Browse problems', True), ('../../wiring/', 'Open the Wiring Lab', False), (L+'m3-diagnosis', 'Read chapter 3.6', False)]),
faq=[
 ('Why does my motorcycle click but not start?', 'A single click from the relay with no starter movement usually means a flat battery, a loose terminal, burned relay contacts or a worn starter. Check battery voltage first, then measure the voltage drop across the relay and cables while cranking.'),
 ('Why will my motorcycle turn over but not start?', 'The engine is missing spark, fuel or compression. Do a spark test with an insulated tester, look at whether the plug is dry or wet after cranking, and then do a compression test if both spark and fuel are present.'),
 ('Can a blocked fuel tank vent stop a motorcycle?', 'Yes. Fuel drawn from a sealed tank creates a vacuum that eventually stops the flow. The engine runs for a while, then stops, and restarts after the filler cap is opened.'),
 ('Why does my motorcycle only start with the brake lever pulled?', 'Many scooters and some motorcycles, including the K-Light 125, have a brake lever switch in the starter relay circuit as a safety interlock, so the starter only works with the brake applied.'),
],
related=['motorcycle-battery-keeps-dying', 'spark-plug-reading', 'carburettor-cleaning-basics'],
))

# ---------------------------------------------------------------- 10
ARTICLES.append(dict(
slug='how-to-change-motorcycle-oil',
title='How to change motorcycle oil: steps, grade and intervals',
h1='How to change your motorcycle oil',
desc='How to change motorcycle engine oil step by step: when to change it, which grade to buy (JASO MA or MA2), how much to fit and how to check the level.',
label='Maintenance',
lead='Changing the engine oil is the most frequent job on a petrol motorcycle and one of the easiest to do at home. Done on time with the right oil, it protects the engine, the gearbox and the clutch, which on most motorcycles all share the same oil.',
summary='When to change the oil, which grade to buy and the drain, clean, refill and check sequence for a typical single.',
hero=dict(src=A+'renders/photo/render-engine-exterior.jpg', w=1602, h=1111, alt='Rendered horizontal single-cylinder commuter engine with finned cylinder pointing forward, carburettor on top, starter behind the cylinder, large clutch cover and kickstart lever', cap='On an engine like this, the oil in the crankcase lubricates the crankshaft, the valve gear, the gearbox and the wet clutch. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/photo/render-engine-exterior.jpg',
body=f'''
<h2 id="why">Why motorcycle oil matters more than car oil</h2>
<p>In a <strong>wet sump</strong> engine the oil is stored in the bottom of the crankcase, which on most motorcycles also houses the gearbox and the clutch, so one oil serves all three. It lubricates the crankshaft bearings and the valve gear, carries away heat (on an air-cooled engine the oil can carry 20 to 30 per cent of the heat the engine rejects), and must also let the clutch plates grip. That last job is why the grade matters as much as the change interval.</p>

<h2 id="which-oil">Which oil to buy</h2>
<p>Two labels on the bottle matter. The <strong>SAE viscosity grade</strong>, such as 10W-40, describes how the oil behaves cold (the number before the W) and hot (the number after it, measured at 100 °C). Typical motorcycle grades are 10W-30, 10W-40 and 15W-50; use the one in your handbook.</p>
<p>The <strong>JASO rating</strong> describes how the oil treats a wet clutch. Car oils marked as energy conserving contain friction modifiers that make a wet clutch slip, so a motorcycle with a wet clutch needs oil rated <strong>JASO MA, MA1 or MA2</strong>. JASO MB is a low-friction oil for scooters with a dry centrifugal clutch and must not be used in a wet clutch. If a clutch starts to slip straight after an oil change, the course's first advice is to change back to a JASO MA oil before dismantling anything; our guide to <a href="../how-a-motorcycle-clutch-works/">how a motorcycle clutch works</a> explains why.</p>

<h2 id="how-often">How often to change it</h2>
<p>Follow the maintenance schedule in your handbook, by distance or by time, whichever comes first, because oil ages even when the bike is parked. The K-Light 125, the commuter single used throughout the Moto Zero course, changes its oil every 3,000 km, with the first service at 300 km. Its schedule assumes about 1,000 km a month and asks for shorter intervals on dusty roads, at sustained high speed and at high mileage. Liquid-cooled multi-cylinder engines with paper filters typically go 6,000 to 12,000 km between changes.</p>
<p>A rider covering 6,000 km a year reaches the 3,000 km change every six months; a rider covering 500 km a year must still change the oil at the time limit in the schedule.</p>

<h2 id="tools">What you need</h2>
<ul>
  <li>The correct grade and quantity of oil: 1.1 ± 0.1 litres at an oil change on the K-Light 125, or the figure in your handbook.</li>
  <li>A spanner or socket for the drain plug, a drain pan large enough for the whole quantity, rags and gloves.</li>
  <li>A new sealing washer or O-ring for the drain plug if the manual specifies one, and a new filter if your engine uses a paper filter.</li>
  <li>A container to take the used oil to a collection point. Never pour it on the ground or into a drain.</li>
</ul>

<h2 id="steps">Step by step</h2>
<ol>
  <li><strong>Warm the engine.</strong> Warm oil flows out faster and carries more suspended dirt with it. Take care: the exhaust and the oil itself can burn.</li>
  <li><strong>Position the bike.</strong> The K-Light 125 manual has the oil drained with the bike on its side stand, so that the drain point is low and the oil drains completely. Place the pan under the drain plug.</li>
  <li><strong>Remove the drain plug.</strong> On the K-Light, as on the Honda CG125 family, a strainer screen and spring sit behind the drain plug and can pop out with it, so be ready to catch them.</li>
  <li><strong>Let it drain fully,</strong> then clean the strainer screen and check that the screen, spring, drain plug and O-ring are intact before refitting.</li>
  <li><strong>Deal with the filter.</strong> Small singles of the CG125 family use a centrifugal filter rotor on the crankshaft, which spins sludge to its outer wall and is cleaned at the intervals in the schedule (300, 6,000 and 12,000 km on the K-Light). Larger engines use a spin-on or cartridge paper filter that is replaced at the intervals in the handbook.</li>
  <li><strong>Refit and tighten the drain plug</strong> to the torque in your manual. Overtightening strips the thread in the crankcase, which is far more expensive than the oil change.</li>
  <li><strong>Fill with fresh oil</strong> through the filler, slightly under the full quantity at first.</li>
  <li><strong>Run and recheck.</strong> Start the engine and let it idle for 2 to 3 minutes, stop it, wait a few minutes, and check the level.</li>
  <li><strong>Check for leaks</strong> around the drain plug and filter.</li>
</ol>
{fig('illustrations/powertrain/F11.png', 2400, 1696, 'Technical plate of a wet-sump lubrication circuit with oil strainer, trochoid pump, filter, crankshaft and big end, cylinder head and camshaft, gearbox and return to the sump, oil flow in orange', 'Oil leaves the sump through a strainer, is pumped through the filter to the crankshaft and the head, and splashes the gearbox on its way back. Plate F11, Moto Zero Module 2.')}

<h2 id="level">Checking the level correctly</h2>
<p>Check the level with the bike upright on level ground, not on the side stand. On a dipstick that screws into the filler, the K-Light manual has the dipstick rested in the hole, not screwed in, and the level read between the upper and lower marks. Top up to the upper mark if it is near the lower one.</p>
<p>Both too little and too much oil cause problems. Too little leads to overheating and serious wear. Too much can upset the running of the engine and the clutch, and an overfilled sump is listed among the causes of blue smoke.</p>
<div class="mz-art-note"><p>Between changes, check the level weekly. An engine that steadily uses oil is telling you something: worn rings, valve guides or seals, or an external leak. The course's diagnosis chapter explains how to tell them apart.</p></div>

<h2 id="two-strokes-and-scooters">Two-strokes, scooters and electric bikes</h2>
<p>A two-stroke burns its lubricating oil with the fuel, mixed in the tank or injected by a pump, and keeps a separate gearbox oil that is changed on its own schedule. Scooters with a CVT and a dry centrifugal clutch can use JASO MB oil, because there is no oil-bathed clutch to slip. Electric motorcycles need no engine oil at all.</p>
<p>For other routine jobs, our <a href="../boda-boda-maintenance-checklist/">daily, weekly and monthly maintenance checklist</a> puts the oil change in context, and the <a href="{RP}clutch">clutch page in the Repair section</a> covers slip after an oil change. Chapter 2.6 of the course, <a href="{L}m2-lubrication-cooling">Lubrication and cooling</a>, explains the oil pump, filters and the full JASO and SAE classifications.</p>
''',
cta=dict(label='Learn more', h='Follow the oil through the engine', p='Select the engine in the Overview to see the parts the oil reaches, then search the Repair section for leaks, smoke and clutch slip. Chapter 2.6 has the full lubrication data for the K-Light 125.', links=[(OV+'engine', 'Explore the engine', True), (R, 'Search the Repair section', False), (L+'m2-lubrication-cooling', 'Read chapter 2.6', False)]),
faq=[
 ('How often should I change my motorcycle oil?', 'Follow the handbook, by distance or time, whichever comes first. A small air-cooled single such as the K-Light 125 changes its oil every 3,000 km; liquid-cooled multis with paper filters typically go 6,000 to 12,000 km.'),
 ('Can I use car oil in my motorcycle?', 'Not if the motorcycle has a wet clutch. Energy-conserving car oils contain friction modifiers that make the clutch slip. Use oil rated JASO MA, MA1 or MA2.'),
 ('How much oil does a 125 cc motorcycle take?', 'It depends on the model. The K-Light 125 takes 1.1 ± 0.1 litres at an oil change and 1.2 ± 0.1 litres after an engine rebuild. Always check the handbook for your machine.'),
 ('Should I check the oil level on the side stand?', 'No. Hold the bike upright on level ground, let the oil settle for a few minutes after running, and on a screw-in dipstick rest it in the hole without screwing it in.'),
],
related=['boda-boda-maintenance-checklist', 'how-a-motorcycle-clutch-works', 'how-a-motorcycle-engine-works'],
))

# ---------------------------------------------------------------- 11
ARTICLES.append(dict(
slug='motorcycle-battery-keeps-dying',
title='Motorcycle battery keeps dying? How to find the cause',
h1='Why your motorcycle battery keeps dying',
desc='A motorcycle battery that keeps going flat has one of three causes: a worn battery, a charging fault or a parasitic drain. How to test each with a multimeter.',
label='Electrical',
lead='A motorcycle battery that keeps going flat is rarely bad luck. There are only three possible causes: the battery can no longer hold a charge, the charging system is not putting charge back in, or something is drawing current while the bike is parked. A multimeter and an hour of methodical testing will tell you which.',
summary='Three causes of a flat battery and how to test each: battery condition, charging output and parasitic drain.',
hero=dict(src=A+'renders/battery_12v.webp', w=1000, h=800, alt='Rendered 12 V sealed AGM motorcycle battery with red positive terminal cover, marked maintenance free and VRLA', cap='A sealed AGM (VRLA) 12 V battery, the type fitted to most current motorcycles. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/battery_12v.webp',
body=f'''
<h2 id="three-causes">Three causes, three tests</h2>
<p>Test in this order, because each test depends on the one before. A charging test on a flat battery gives a misleading result, and a drain test is pointless if the battery cannot hold charge anyway.</p>
<ol>
  <li><strong>The battery:</strong> is it sulphated, damaged or simply worn out?</li>
  <li><strong>The charging system:</strong> do the alternator and regulator/rectifier put charge back in while you ride?</li>
  <li><strong>Parasitic drain:</strong> is something drawing current with the key off?</li>
</ol>

<h2 id="test-battery">Test 1: the battery</h2>
<p>Look at the case first. A swollen AGM battery has been overcharged and must be replaced. Then measure the open-circuit voltage after the battery has rested for at least an hour, so that the surface charge left by riding or charging has gone.</p>
<div class="mz-art-table"><table>
  <thead><tr><th>State of charge</th><th>Flooded lead-acid</th><th>AGM</th></tr></thead>
  <tbody>
    <tr><td>100 %</td><td>12.65 to 12.7 V</td><td>12.8 to 13.1 V</td></tr>
    <tr><td>75 %</td><td>12.4 V</td><td>12.6 V</td></tr>
    <tr><td>50 %</td><td>12.2 V</td><td>12.3 V</td></tr>
    <tr><td>25 %</td><td>12.0 V</td><td>12.0 V</td></tr>
    <tr><td>Flat</td><td>11.8 V or less</td><td>11.8 V or less</td></tr>
  </tbody>
</table></div>
<p>The K-Light 125 manual, used as the worked example in the Moto Zero course, gives 13.1 V for its 6 Ah AGM battery fully charged and 12.3 V as the point where it needs charging. Charge at no more than 10 per cent of the ampere-hour rating: 0.6 A for 10 to 15 hours for a 6 Ah battery. Wait 30 minutes after charging and measure again: 12.8 V or more means the charge is complete.</p>
<p>Then check whether it holds. A good battery loses less than about 0.1 V over 24 hours of rest, and during cranking it should stay above about 9.6 V. A battery that reads below about 11.8 V even after a full charge has a failed cell. A battery left partly discharged grows hard sulphate crystals on its plates, which permanently reduce capacity; the K-Light manual notes that capacity typically declines after 2 to 3 years.</p>
<div class="mz-art-note"><p>Charging releases hydrogen, which is explosive. Charge in a ventilated area, switch the charger off before connecting or disconnecting the clips, and wear eye protection. When removing a battery, disconnect the negative first; when refitting, connect the positive first and the negative last.</p></div>

<h2 id="test-charging">Test 2: the charging system</h2>
<p>With a fully charged battery, warm the engine, connect the multimeter on DC volts across the battery terminals and raise the engine speed slowly to 5,000 rpm. The voltage should rise to <strong>14.0 to 15.0 V</strong> and then stop rising. Switch the headlight to main beam: the reading may fall slightly but should stay above 13.5 V. The K-Light 125 specification is 14.5 ± 0.5 V at 5,000 rpm.</p>
<ul>
  <li><strong>Voltage stays at battery voltage:</strong> no charge is reaching the battery. Suspect the stator, the regulator/rectifier or the wiring between them.</li>
  <li><strong>Voltage rises above 15.0 V:</strong> the regulator is not limiting, or its earth is poor. Overcharging dries out AGM batteries and blows bulbs.</li>
</ul>
{fig('illustrations/wiring/F21.png', 2400, 1171, 'Wiring plate of a motorcycle charging circuit with a three-phase permanent-magnet alternator, shunt-type regulator/rectifier, main fuse, battery and electrical load', 'The charging circuit: three-phase alternator, regulator/rectifier, fuse and battery. Plate F21, Moto Zero Module 3.')}
<p>To go further, stop the engine and unplug the stator connector. On the K-Light, each pair of the three white stator wires should measure 0.8 ± 0.3 ohms, and there must be no continuity from any white wire to the engine. With the engine running and the connector still unplugged, the AC voltage between each pair should be equal within about 10 per cent, typically 50 to 80 V AC on a small three-phase stator. One low pair confirms a stator fault.</p>
<p>Most small motorcycles use a <strong>shunt regulator</strong>, which dumps surplus current as heat. Shunt regulators and stators run hot, and a corroded regulator connector overheats and melts, so look for discoloured plugs. On a small single the alternator output is only just larger than the load with the lights on, which is why long periods of idling with the headlight on can drain a healthy battery.</p>

<h2 id="test-drain">Test 3: parasitic drain</h2>
<p>With the key off, the ECU memory, a clock or an alarm may draw a small current permanently. The K-Light fault tree allows <strong>no more than 1 mA</strong>. To measure it, disconnect the battery negative and connect an ammeter in series between the negative terminal and the negative lead. Start on the 10 A range to survive any wake-up surge, then step down to the milliamp range once the reading settles; modern ECUs can take several minutes to go to sleep. Never connect an ammeter directly across the battery terminals.</p>
<p>If the drain is too high, pull the fuses one at a time until it drops, which identifies the circuit. The K-Light tree checks the brake light switch first, because a switch stuck on is a frequent cause. The size of the drain matters: the course calculates that a 20 mA accessory alarm would take a 6 Ah battery to half charge in about six days.</p>

<h2 id="lithium">Lithium batteries</h2>
<p>Lithium iron phosphate (LiFePO4) starter batteries are light and hold their charge well in storage, but they need different care. They must never be charged on a desulphation or pulse mode, must not be held above about 14.6 V, and must not be charged below about 0 °C. Their voltage barely changes between 20 and 80 per cent charge, so the voltage table above does not apply. Fit one only when the charging system regulates within the battery maker's window.</p>

<h2 id="storage">Storage and prevention</h2>
<p>A stored battery discharges itself. The K-Light manual asks for a charge about every three months in storage; a smart charger with a float stage at about 13.5 to 13.8 V can stay connected. Keep the terminals tight and lightly coated with petroleum jelly, and avoid jump-starting from a running car, which exposes the motorcycle's electronics to voltage spikes.</p>
<p>The <a href="{RP}battery">battery page in the Repair section</a> collects these tests with the related faults, and the <a href="{RP}wiring">wiring page</a> covers the connectors and earths that cause many charging problems. Our <a href="../motorcycle-wiring-basics/">wiring basics guide</a> explains how to read the circuit, and chapter 3.4 of the course, <a href="{L}m3-battery-charging">Battery, charging and starting</a>, gives the full job sheets.</p>
''',
cta=dict(label='Fix it', h='Trace the charging circuit', p='Follow current from the alternator through the regulator to the battery in the Wiring Lab, then use the Repair section to work through battery and charging faults part by part.', links=[('../../wiring/', 'Open the Wiring Lab', True), (RP+'battery', 'Battery repairs', False), (L+'m3-battery-charging', 'Read chapter 3.4', False)]),
faq=[
 ('Why does my motorcycle battery die overnight?', 'Usually a parasitic drain: a brake light switch stuck on, an accessory or alarm, or a faulty circuit. Measure the current with the key off; the K-Light 125 allows no more than 1 mA.'),
 ('What voltage should a motorcycle charging system show?', 'Typically 14.0 to 15.0 V across the battery at 5,000 rpm, staying above 13.5 V with the headlight on. The K-Light 125 specification is 14.5 ± 0.5 V.'),
 ('How do I know if my motorcycle battery is bad?', 'Charge it fully, let it rest, and measure: below about 11.8 V after charging means a failed cell, and a loss of more than about 0.1 V in 24 hours or cranking voltage below about 9.6 V means it no longer holds charge.'),
 ('What charging current should I use for a motorcycle battery?', 'No more than 10 per cent of the ampere-hour rating. A 6 Ah battery is charged at 0.6 A for 10 to 15 hours.'),
],
related=['motorcycle-wiring-basics', 'motorcycle-will-not-start', 'boda-boda-maintenance-checklist'],
))

# ---------------------------------------------------------------- 12
ARTICLES.append(dict(
slug='how-to-check-motorcycle-brake-pads',
title='How to check motorcycle brake pads and discs',
h1='How to check motorcycle brake pads',
desc='How to check motorcycle brake pads and discs: wear limits, what uneven wear means, when to replace pads, and how to check brake fluid and drum brakes.',
label='Maintenance',
lead='Brake pads wear every time you stop, and they give little warning before they reach the metal backing plate. Checking them takes a few minutes, and the same inspection tells you about the condition of the discs, the caliper and the brake fluid.',
summary='Pad and disc wear limits, what uneven wear tells you, brake fluid checks and drum brake wear indicators.',
hero=dict(src=A+'renders/photo/render-brake.jpg', w=1225, h=1115, alt='Rendered floating front brake disc with drilled friction ring and dark carrier, gripped by a two-piston sliding caliper with mounting bolts, bleed nipple and brake hose', cap='A floating disc with a two-piston sliding caliper, the type fitted to most small and mid-size motorcycles. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/photo/render-brake.jpg',
body=f'''
<h2 id="how-pads-work">How disc brakes wear</h2>
<p>When you pull the lever, the master cylinder pushes fluid to the caliper, whose pistons clamp the pads against the disc. Friction turns the bike's movement into heat, and both pads and disc slowly wear away. The caliper adjusts itself: as the pads wear, the pistons slide further out through their seals, so the lever feel does not change much. That is why worn pads are easy to miss.</p>
<p>Most small machines, including the K-Light 125 used as the worked example in the Moto Zero course, use a <strong>floating caliper</strong>: pistons on one side only, with the caliper body sliding on greased pins so that the outer pad is pulled onto the disc. Larger bikes often use fixed calipers with pistons on both sides.</p>
{fig('illustrations/chassis/F19.png', 2400, 1620, 'Technical plate of a hydraulic disc brake with master cylinder, reservoir, brake hose and caliper section with pistons, seals and pads, beside a drum brake with shoes, cam, anchor pin and return springs', 'A hydraulic disc brake and a drum brake side by side. Plate F19, Moto Zero Module 4.')}

<h2 id="pad-limits">Pad wear limits</h2>
<p>Pad wear is measured on the friction material only, not the steel backing plate. On the K-Light 125, new pads have <strong>6.0 mm</strong> of friction material front and rear, and the service limit is <strong>3 mm</strong>. If either pad in a caliper is at or below the limit, the manual requires <strong>both pads in that caliper to be replaced together</strong>, so that they clamp the disc evenly. Other models have their own figures in the handbook.</p>
<p>On many calipers you can see the pad edges with a torch through the caliper window or from below, which is enough for a quick weekly check. For an accurate measurement the manual has the pads removed and measured at their thinnest point.</p>

<h2 id="uneven">What uneven wear tells you</h2>
<ul>
  <li><strong>One pad much thinner than the other:</strong> on a floating caliper, the slide pins have seized or a piston is sticking, so one pad drags. Clean and regrease the pins with silicone grease and renew their rubber boots if they are damaged.</li>
  <li><strong>Pad tapered from end to end:</strong> the caliper is not sliding square, again usually the pins.</li>
  <li><strong>Glazed, shiny or contaminated pads:</strong> fluid or oil on the pads ruins them; find the leak and replace the pads.</li>
  <li><strong>Wheel drags when spun:</strong> a sticking piston or seized pins; the brake is also running hot.</li>
</ul>

<h2 id="discs">Check the discs too</h2>
<p>Measure disc thickness with a micrometer at several points round the swept area. The K-Light 125 front disc is 280 mm in diameter, <strong>4.0 mm thick new with a 3.0 mm limit</strong>; the rear disc is 240 mm, <strong>5.0 mm new with a 4.0 mm limit</strong>. A deeply scored disc is replaced even if it is above the limit. A pulsing lever can mean a disc with too much runout: the K-Light limit is 0.15 mm, measured with a dial gauge as the wheel turns, after checking that the wheel bearings are good.</p>

<h2 id="replacing">Replacing pads: the key points</h2>
<ol>
  <li>Cover painted parts: brake fluid strips paint.</li>
  <li>Remove the caliper, the pad pin and the pads. Clean the caliper with brake cleaner. Never blow brake dust out with compressed air.</li>
  <li>Push the pistons back squarely. The fluid level in the reservoir rises as they go back; on machines with combined braking (CBS), such as the K-Light, check both reservoirs.</li>
  <li>Fit the new pads and pin, refit the caliper and tighten the bolts to the specified torque (22 to 29 N·m for the K-Light caliper bolts).</li>
  <li><strong>Pump the lever or pedal until it is firm before moving the bike.</strong> The first pull after fitting new pads goes to the bar.</li>
  <li>Bed the pads in with a series of moderate stops from about 50 km/h and avoid heavy stops for the first 100 to 200 km.</li>
</ol>
<p><strong>Organic</strong> pads are quiet and bite well cold but fade at high temperature; <strong>sintered</strong> pads last longer and work well wet and hot but wear discs faster, and must only be used on discs approved for them. Fit the type the manufacturer specifies.</p>

<h2 id="fluid">Brake fluid and lever feel</h2>
<p>Most motorcycles use DOT 4 fluid, which absorbs water from the air and loses boiling point as it does. Replace it every two years, a typical manufacturer interval, and never mix silicone DOT 5 fluid with glycol-based fluids. Check the level in the reservoir window: it falls slowly as the pads wear, so a low level with worn pads is normal, but a falling level with new pads means a leak.</p>
<p>A <strong>spongy lever</strong> almost always means air in the system, which is cured by bleeding. A lever that goes soft after a long descent and recovers when cool means old fluid has boiled. On the K-Light 125, lever free play should be 10 to 20 mm and pedal free play 20 to 30 mm.</p>

<h2 id="drums">Drum brakes</h2>
<p>Many commuters still have a rear drum brake, and the check is simpler. Apply the brake and look at the <strong>wear indicator</strong> on the brake cam lever: if the pointer is beyond the mark, the shoes or the drum are worn out. With the wheel out, a typical lining limit is 1.5 to 2.0 mm. Wet-clean the brake dust rather than blowing it out, and replace both shoes if they are contaminated with oil or grease.</p>
<div class="mz-art-note"><p>If a brake feels soft, pulls to one side, or the pads are at the limit, fix it before riding. The front brake does about 70 per cent of the work in a hard stop.</p></div>
<p>The <a href="{RP}brake">brake page in the Repair section</a> lists common brake faults with their checks, and our <a href="../boda-boda-maintenance-checklist/">maintenance checklist</a> puts the brake check into a daily and weekly routine. Chapter 4.7 of the course, <a href="{L}m4-brakes">Brakes</a>, includes the full pad, bleeding and drum brake job sheets.</p>
''',
cta=dict(label='Fix it', h='See the brake parts and their faults', p='Select the front brake in the Overview to see the disc, caliper and pads in 3D, then open the brake page in the Repair section for faults such as a spongy lever, drag and squeal.', links=[(RP+'brake', 'Brake repairs', True), (OV+'brake', 'Explore the brakes', False), (L+'m4-brakes', 'Read chapter 4.7', False)]),
faq=[
 ('How thick should motorcycle brake pads be?', 'It varies by model. On the K-Light 125, new pads have 6.0 mm of friction material and the service limit is 3 mm. Check the handbook for other models.'),
 ('Should I replace both brake pads at the same time?', 'Yes. If either pad in a caliper reaches the limit, replace both pads in that caliper together so they clamp the disc evenly.'),
 ('Why is one brake pad worn more than the other?', 'On a floating caliper, uneven wear usually means the slide pins have seized or a piston is sticking. Clean and regrease the pins and check the pistons.'),
 ('How often should motorcycle brake fluid be changed?', 'Every two years is a typical manufacturer interval, because glycol-based fluids such as DOT 4 absorb water and their boiling point falls.'),
],
related=['motorcycle-tyre-pressure-and-wear', 'boda-boda-maintenance-checklist', 'motorcycle-chain-maintenance'],
))
