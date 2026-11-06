A = '../../assets/'
OV = '../../overview/?part='
L = '../../learn/#'

ARTICLES = []

# ---------------------------------------------------------------- 1
ARTICLES.append(dict(
slug='how-a-motorcycle-engine-works',
title='How a motorcycle engine works: the four-stroke cycle',
h1='How a motorcycle engine works',
desc='How a four-stroke motorcycle engine turns petrol into motion: intake, compression, power and exhaust, valve timing, displacement and compression ratio.',
label='Engine basics',
lead='A motorcycle engine burns a small charge of air and petrol above a piston, and the pressure of that burning gas pushes the piston down and turns the crankshaft. This guide follows one cylinder through the four-stroke cycle and explains the numbers that describe it.',
summary='The four-stroke cycle step by step: intake, compression, power and exhaust, with valve timing and compression ratio.',
hero=dict(src=A+'renders/engine_4t.webp', w=1000, h=800, alt='Rendered single-cylinder four-stroke commuter engine with finned cylinder, carburettor, starter motor, clutch cover and kickstart lever', cap='A horizontal-crankcase single-cylinder four-stroke of the kind fitted to most 100 to 150 cc commuter motorcycles. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/engine_4t.webp',
body=f'''
<h2 id="short-answer">The short answer</h2>
<p>Almost every petrol motorcycle on the road uses a four-stroke engine. Inside it, a <a href="{OV}piston">piston</a> slides up and down a <a href="{OV}cylinder">cylinder</a>. A <a href="{OV}conrod">connecting rod</a> links the piston to the <a href="{OV}crankshaft">crankshaft</a>, which converts the piston's straight-line motion into rotation, in the same way that a cyclist's legs turn the pedal cranks. Two valves in the cylinder head let fresh mixture in and burnt gas out, and a <a href="{OV}spark_plug">spark plug</a> lights the charge at the right moment.</p>
<p>The engine repeats the same sequence of four piston strokes, two up and two down, thousands of times a minute. Because each cylinder fires only once in every two revolutions of the crankshaft, a single-cylinder engine relies on the weight of its crank webs and alternator rotor to carry it through the three strokes that do not produce power.</p>

<h2 id="where-the-force-comes-from">Where the force comes from</h2>
<p>Petrol burned with the right amount of air releases a large amount of heat. At the chemically correct ratio of about 14.7 kg of air for each kilogram of fuel, the gas temperature in the combustion chamber climbs to roughly 2,300 to 2,600 K and the pressure peaks at around 4 to 7 MPa in a typical road engine. That pressure acting on the piston crown is the source of all the engine's work.</p>
<p>Combustion is not an explosion. The spark starts a small flame kernel, and a turbulent flame front crosses the chamber over roughly 40 to 60 degrees of crank rotation. For that reason the spark fires before the piston reaches the top of its stroke, so that peak pressure arrives just after top dead centre, when the crank has leverage. The K-Light 125 commuter used as the worked example in the Moto Zero course fires at 15 degrees before top dead centre at idle, and its engine management advances the timing as speed rises.</p>

<h2 id="the-four-strokes">The four-stroke cycle, one stroke at a time</h2>
<p>A full cycle takes two crankshaft revolutions, or 720 degrees. The camshaft that opens the valves is driven at half crankshaft speed, so each valve opens once per cycle.</p>
<figure>
  <img src="{A}illustrations/powertrain/F07.png" alt="Four-panel technical plate of a single-cylinder overhead-camshaft engine in section, showing valve positions, piston travel and gas flow during the intake, compression, power and exhaust strokes" width="2400" height="1515" loading="lazy">
  <figcaption>The four strokes of a single-cylinder overhead-camshaft engine, with crank angle and gas flow for each. Plate F07, Moto Zero Module 2.</figcaption>
</figure>
<h3 id="intake">1. Intake</h3>
<p>The piston moves down from top dead centre with the inlet valve open. The volume above it grows faster than air can follow, so cylinder pressure drops slightly below atmospheric, and air and fuel are drawn in through the throttle body or carburettor. At full throttle the incoming air moves at 50 to 100 m/s, and its momentum keeps it flowing into the cylinder even after the piston has passed bottom dead centre.</p>
<h3 id="compression">2. Compression</h3>
<p>The inlet valve closes and the rising piston squeezes the trapped charge into the small space left in the cylinder head. Compression heats the mixture and finishes evaporating the fuel. A healthy K-Light 125 shows a cranking compression of 1.0 to 1.2 MPa on a gauge, which is one of the first numbers a technician checks on a tired engine.</p>
<h3 id="power">3. Power</h3>
<p>The spark plug fires near the end of compression. Pressure peaks shortly after top dead centre and drives the piston down. Most of the useful work is done in the first 60 to 90 degrees of this stroke, while the pressure is still high.</p>
<h3 id="exhaust">4. Exhaust</h3>
<p>The exhaust valve opens before the piston reaches the bottom. The first rush of high-pressure gas, called blowdown, leaves at close to the speed of sound, and the rising piston pushes out most of the rest. A small amount of burnt gas, typically 5 to 15 per cent, always stays behind in the combustion chamber and mixes with the next charge.</p>

<h2 id="valve-timing">Why the valves open early and close late</h2>
<p>If each valve opened and closed exactly at the dead centres, the engine would breathe poorly, because gas has inertia and a valve needs time to lift. Camshafts are therefore ground so that the inlet valve opens a few degrees before top dead centre and closes well after bottom dead centre, and the exhaust valve opens before bottom dead centre and closes after top dead centre. The short period around top dead centre when both valves are open is called <strong>valve overlap</strong>.</p>
<p>A commuter single typically has 10 to 30 degrees of overlap, which gives a steady idle and low emissions. A sports four-valve engine may have 50 to 80 degrees, which helps it breathe at high revs but makes idle rough. Chapter 2.2 of the course, <a href="{L}m2-four-stroke">The four-stroke cycle</a>, shows how to calculate valve duration and lobe centre from a timing diagram.</p>

<h2 id="displacement">Displacement and compression ratio</h2>
<p><strong>Displacement</strong> is the volume the piston sweeps in one stroke, multiplied by the number of cylinders. It is calculated from the bore (cylinder diameter) and the stroke (piston travel): bore × bore × stroke × 0.785. The K-Light 125 has a bore of 56.5 mm and a stroke of 49.5 mm, the same as the Honda CG125, which works out at 124 cm³.</p>
<p>The <strong>compression ratio</strong> compares the total volume above the piston at the bottom of its stroke with the small clearance volume left at the top. The K-Light runs 9:1, typical of an air-cooled commuter single; liquid-cooled four-valve sports engines run 12 to 14:1. A higher ratio extracts more work from each charge, but it also brings the engine closer to knock, so fuel octane, cooling and combustion chamber shape set the practical limit.</p>
<div class="mz-art-note"><p>A real small air-cooled engine converts only about 28 to 32 per cent of the fuel's energy into work at its best operating point, and much less in town at part throttle. The rest leaves as heat through the exhaust, the cylinder fins and the oil.</p></div>

<h2 id="engine-parts">The main parts, top to bottom</h2>
<figure>
  <img src="{A}illustrations/powertrain/F09.png" alt="Sectional plate through a single-cylinder four-stroke engine showing cam chain, camshaft, rockers, valves and springs, spark plug, piston with rings, connecting rod, crankshaft, balancer and oil sump" width="2400" height="2368" loading="lazy">
  <figcaption>A single-cylinder four-stroke in section, from the camshaft at the top to the oil sump at the bottom. Plate F09, Moto Zero Module 2.</figcaption>
</figure>
<ul>
  <li><strong>Cylinder head.</strong> Holds the inlet and exhaust valves (<a href="{OV}valve_in">inlet valve</a>, <a href="{OV}valve_ex">exhaust valve</a>), their springs, the camshaft and the spark plug. On most commuter singles a chain from the crankshaft drives a single overhead camshaft, which opens the valves through rocker arms.</li>
  <li><strong>Cylinder.</strong> The bore the piston runs in. On an air-cooled engine its fins shed heat into the passing air.</li>
  <li><strong>Piston and rings.</strong> The rings seal the piston against the cylinder wall so that compression and combustion pressure cannot leak into the crankcase, and they scrape excess oil back down.</li>
  <li><strong>Connecting rod and crankshaft.</strong> Turn the up-and-down motion into rotation. Counterweights on the crank webs, and often a balancer shaft, reduce vibration.</li>
  <li><strong>Crankcase and sump.</strong> On most motorcycles the crankcase also houses the gearbox and the wet clutch, so one oil lubricates all three. That is why a motorcycle needs oil rated JASO MA or MA2 rather than an energy-conserving car oil.</li>
</ul>

<h2 id="cylinders">Singles, twins and fours</h2>
<p>A single-cylinder engine fires once every 720 degrees, which gives strong pulses and a simple, cheap, economical engine; that is why it dominates commuter and taxi motorcycles. Adding cylinders shortens the gap between power strokes. A 270-degree parallel twin fires at intervals of 270 and 450 degrees, the same rhythm as a 90-degree V-twin, while a flat-plane inline four fires every 180 degrees and runs very smoothly at high revs. More cylinders mean smaller pistons that can rev higher, at the cost of more parts and more weight.</p>
<p>The same four strokes happen in every one of these engines. The two-stroke engine, which completes its cycle in a single revolution, works differently, and our article on <a href="../two-stroke-vs-four-stroke/">two-stroke versus four-stroke engines</a> explains how.</p>
<p>When an engine will not start or runs badly, the same three needs (compression, a timed spark and the right mixture) give the order of diagnosis. Our guide to <a href="../motorcycle-will-not-start/">a motorcycle that will not start</a> works through them, and the <a href="../../repair/problems/">Repair section's problem finder</a> lists common engine faults by symptom.</p>
''',
cta=dict(label='Try it', h='Watch the cycle run in the Cockpit', p='The Cockpit puts you on a running engine: open the throttle, change gear and watch the rev counter and temperatures respond. The Overview lets you select the engine and see each part move inside it.', links=[('../../cockpit/', 'Open the Cockpit', True), (OV+'engine', 'Explore the engine', False), (L+'m2-four-stroke', 'Read chapter 2.2', False), ('../../repair/problems/', 'Find a fault', False)]),
faq=[
 ('How many strokes does a motorcycle engine have?', 'Most modern motorcycle engines are four-strokes: intake, compression, power and exhaust, completed over two crankshaft revolutions. Two-stroke engines, still used in some off-road and older commuter machines, complete the cycle in one revolution.'),
 ('Why does a four-stroke engine need valves?', 'Valves open and close the passages for fresh mixture and exhaust gas at the right moments in the cycle. A camshaft turning at half crankshaft speed opens each valve once per cycle and springs close it again.'),
 ('What does 125 cc mean on a motorcycle?', 'It is the swept volume, or displacement, of the engine in cubic centimetres: the volume the piston sweeps between the bottom and the top of its stroke. A 56.5 mm bore and 49.5 mm stroke give 124 cm³, which is sold as a 125.'),
 ('Why do motorcycles need special engine oil?', 'On most motorcycles the engine oil also lubricates the gearbox and the wet clutch. Car oils with friction modifiers make the clutch slip, so motorcycle oils are tested to the JASO MA or MA2 friction standard.'),
],
related=['two-stroke-vs-four-stroke', 'how-a-motorcycle-clutch-works', 'how-electric-motorcycles-work'],
))

# ---------------------------------------------------------------- 2
ARTICLES.append(dict(
slug='two-stroke-vs-four-stroke',
title='Two-stroke vs four-stroke engines: the differences',
h1='Two-stroke versus four-stroke engines',
desc='How two-stroke and four-stroke motorcycle engines differ: ports versus valves, power per cc, lubrication, emissions, maintenance and where each is used.',
label='Engine basics',
lead='A two-stroke completes its cycle in one crankshaft revolution and a four-stroke needs two. That single difference explains why two-strokes are light and powerful for their size, and why four-strokes now power almost every road motorcycle.',
summary='Ports versus valves, power per cc, premix oil, emissions and maintenance compared side by side.',
hero=dict(src=A+'renders/engine_2t.webp', w=1000, h=800, alt='Rendered 125 cc two-stroke single-cylinder engine with finned cylinder, power-valve housing, reed-valve intake and carburettor', cap='A 125 cc two-stroke single with power-valve housing and reed-valve intake. There are no valves, camshaft or cam chain in the head. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/engine_2t.webp',
body=f'''
<h2 id="one-difference">The one difference that explains the rest</h2>
<p>Both engines burn air and petrol above a piston and turn a crankshaft through a connecting rod. A <a href="../how-a-motorcycle-engine-works/">four-stroke</a> uses one stroke each for intake, compression, power and exhaust, so each cylinder fires once every two revolutions. A two-stroke combines these jobs into two strokes and fires every revolution. To do that, it uses the underside of the piston and a sealed crankcase as a small pump, and it replaces poppet valves with ports in the cylinder wall that the piston itself uncovers and covers.</p>

<h2 id="how-two-stroke-works">How the two-stroke cycle works</h2>
<figure>
  <img src="{A}illustrations/powertrain/F08.png" alt="Two-panel technical plate of the two-stroke cycle: on the upstroke the charge above the piston is compressed while fresh mixture enters the crankcase through a reed valve; on the downstroke the exhaust port opens and then the transfer ports scavenge the cylinder" width="2400" height="1410" loading="lazy">
  <figcaption>The two-stroke cycle in two panels: upstroke and downstroke. Plate F08, Moto Zero Module 2.</figcaption>
</figure>
<h3 id="upstroke">Upstroke</h3>
<p>As the piston rises, its crown covers the transfer ports and then the exhaust port, and the charge trapped above it is compressed and ignited near top dead centre. At the same time, the volume of the crankcase below the piston grows, its pressure falls to about 0.6 to 0.8 bar absolute, and fresh mixture is drawn into the crankcase through a reed valve.</p>
<h3 id="downstroke">Downstroke</h3>
<p>Combustion drives the piston down. Below it, the reed valve closes and the crankcase charge is compressed to about 1.3 to 1.5 bar absolute. Above it, the crown uncovers the <a href="{OV}port_ex">exhaust port</a> at roughly 80 to 100 degrees before bottom dead centre, and the burnt gas rushes out. A few degrees later the <a href="{OV}port_tr">transfer ports</a> open, and the pressurised charge from the crankcase flows up into the cylinder, pushing the remaining exhaust gas ahead of it. This exchange is called <strong>scavenging</strong>.</p>
<p>Modern two-strokes use loop scavenging, in which the transfer ports aim the fresh charge away from the exhaust so that it sweeps up the far wall, turns at the head and pushes the burnt gas out. Even so, some fresh charge always escapes straight out of the exhaust. In a carburetted engine that charge already contains fuel, and losses of 20 to 40 per cent at full throttle are common.</p>

<h2 id="comparison">Side-by-side comparison</h2>
<div class="mz-art-table"><table>
  <thead><tr><th>Feature</th><th>Two-stroke</th><th>Four-stroke</th></tr></thead>
  <tbody>
    <tr><td>Power strokes</td><td>One every revolution</td><td>One every two revolutions</td></tr>
    <tr><td>Gas exchange</td><td>Ports in the cylinder wall, reed valve</td><td>Poppet valves, camshaft, cam chain</td></tr>
    <tr><td>Power for the same size</td><td>About 1.5 to 2 times higher</td><td>Lower, but broader and more tractable</td></tr>
    <tr><td>Lubrication</td><td>Oil mixed with the fuel or injected, burnt in use</td><td>Oil kept in the sump and recirculated</td></tr>
    <tr><td>Emissions</td><td>High unburnt hydrocarbons and blue smoke</td><td>Much lower; meets current road rules with fuel injection and a catalyst</td></tr>
    <tr><td>Parts count and weight</td><td>Fewer parts, lighter</td><td>More parts, heavier</td></tr>
    <tr><td>Typical use today</td><td>Motocross, enduro, trials, older commuters and mopeds</td><td>Almost every road motorcycle and scooter</td></tr>
  </tbody>
</table></div>

<h2 id="power">Why two-strokes make more power for their size</h2>
<p>Firing every revolution means twice as many power strokes as a four-stroke at the same engine speed, and the absence of a valve train removes a limit on revs. At equal displacement a two-stroke can therefore produce 1.5 to 2 times the power of a four-stroke, with fewer parts and less weight. That is why a 125 cc two-stroke motocross bike competes against 250 cc four-strokes.</p>
<p>The exhaust plays a large part. A tuned <a href="{OV}exhaust">expansion chamber</a> sends pressure waves back to the exhaust port: a suction wave helps pull fresh charge up the transfers, and a later positive wave pushes escaped charge back into the cylinder just before the port closes. Because the waves are timed in milliseconds, the pipe only helps over a band of engine speed, which is why a tuned two-stroke has a narrow, sudden powerband. A power valve, which lowers the exhaust port roof at low revs, widens that band.</p>
<figure>
  <img src="{A}renders/exhaust_2t.webp" alt="Rendered two-stroke expansion chamber built from welded cone sections, with a narrow stinger and silencer at the end" width="1000" height="800" loading="lazy">
  <figcaption>A two-stroke expansion chamber: diffuser cone, belly, baffle cone and stinger. Render: Transitions Lab, CC BY-SA 4.0.</figcaption>
</figure>

<h2 id="lubrication">Lubrication: premix and oil injection</h2>
<p>A four-stroke keeps its oil in the sump and pumps it round the engine. A two-stroke cannot, because its crankcase is part of the intake path. Its bearings and cylinder wall are lubricated by oil carried in with the fuel, which then burns or leaves through the exhaust. Riders either mix oil into the fuel (premix), commonly at 50:1 for modern synthetic oils in road and enduro engines, or rely on a small pump that meters oil from a separate tank. To make 5 litres of 50:1 premix you add 100 mL of oil. An oil-injected two-stroke with an empty oil tank will seize within minutes.</p>

<h2 id="emissions">Emissions and why road two-strokes disappeared</h2>
<p>The same features that give the two-stroke its power cause its pollution: fresh charge escaping through the exhaust, oil burnt as blue smoke, unstable combustion at part throttle and hot pistons that never get a cooling exhaust stroke. Under the European emission rules, carburetted two-strokes largely left road use from the early 2000s. They survive in competition, enduro and in older commuter fleets in Asia and Africa.</p>
<p>Direct and transfer-port injection have narrowed the gap. KTM's Transfer Port Injection, introduced on its 250 and 300 EXC enduro models for 2018, sprays fuel into the transfer flow late in scavenging, so that mostly air, rather than fuel, escapes through the exhaust.</p>

<h2 id="maintenance">Maintenance differences</h2>
<p>A two-stroke has no valves to adjust and no cam chain to wear, and its top end (piston, rings and small-end bearing) can be rebuilt quickly with basic tools. It needs that rebuild more often, however, especially on a competition machine, and its power valve must be cleaned of carbon regularly: a valve stuck closed stops the engine revving, and one stuck open costs low-speed pulling power. A four-stroke needs oil changes, valve clearance checks and cam chain adjustment, but its intervals are long; the K-Light 125 changes its oil every 3,000 km.</p>
<p>Chapter 2.3 of the course, <a href="{L}m2-two-stroke">The two-stroke cycle</a>, covers port timing, expansion chamber length and power valves in detail, with worked calculations.</p>
''',
cta=dict(label='Try it', h='Compare the two engines in 3D', p='The Overview has a four-stroke road bike and a two-stroke motocross bike. Select the exhaust or transfer port and watch the gas flow, then build your own machine and switch engine types in the Bike builder.', links=[(OV+'port_tr', 'See the transfer ports', True), ('../../build/', 'Open the Bike builder', False), (L+'m2-two-stroke', 'Read chapter 2.3', False)]),
faq=[
 ('Is a two-stroke faster than a four-stroke?', 'At the same displacement a two-stroke typically makes 1.5 to 2 times the power, so it is usually faster for its size. A four-stroke of larger displacement can match it with a broader spread of power.'),
 ('Why do two-strokes need oil in the fuel?', 'The crankcase of a two-stroke is part of the intake path, so it cannot hold an oil bath. Oil mixed with the fuel, or injected by a pump, lubricates the bearings and cylinder wall before it burns.'),
 ('Are two-stroke motorcycles still made?', 'Yes, mainly for motocross, enduro and trials. Some enduro models now use fuel injection to cut emissions, but carburetted two-strokes have largely left road use under emission rules.'),
 ('Which lasts longer, a two-stroke or a four-stroke?', 'A four-stroke usually runs much longer between major repairs. A two-stroke needs top-end rebuilds more often, but each rebuild is simpler and cheaper.'),
],
related=['how-a-motorcycle-engine-works', 'types-of-motorcycles', 'how-a-motorcycle-clutch-works'],
))
