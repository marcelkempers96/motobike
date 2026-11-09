from links import EN, WL, CB, MD, QZ, EQ, BUILD, COCKPIT, VID, REP, PRB, PRT, OM, try_box, lfig, deeper
from arts1 import A, OV, L, ARTICLES

# ---------------------------------------------------------------- 3
ARTICLES.append(dict(
slug='how-a-motorcycle-clutch-works',
title='How a motorcycle clutch works: plates, springs, faults',
h1='How a motorcycle clutch works',
desc='How a wet multiplate motorcycle clutch connects engine and gearbox, how lever free play is set, and how to diagnose slip, drag and judder.',
label='Drivetrain',
lead='The clutch lets a rider pull away from rest, change gear and stop without stalling. On most motorcycles it is a stack of thin plates running in engine oil, clamped together by springs and separated when the lever is pulled.',
summary='The wet multiplate clutch explained: basket, plates, springs, free play, and how to diagnose slip, drag and judder.',
hero=dict(src=A+'renders/clutch_exploded.webp', w=1000, h=800, alt='Rendered motorcycle clutch exploded along its shaft: basket, alternating friction and steel plates, hub, pressure plate and springs', cap='A wet multiplate clutch pulled apart in assembly order. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/clutch_exploded.webp',
body=f'''
<h2 id="what-it-does">What the clutch does</h2>
<p>An engine cannot run below its idle speed, yet the motorcycle has to start from a standstill and stop at junctions. The <a href="{OV}clutch">clutch</a> sits between the engine and the <a href="{OV}gearbox">gearbox</a> and lets the rider disconnect the two, then reconnect them gradually so that the wheel picks up speed without stalling the engine. It also lets the rider change gear without the gear teeth carrying load, and it limits the torque that a sudden shock can send through the drivetrain.</p>
<p>A car uses one large friction disc. A motorcycle clutch has to fit inside the crankcase cover, so it uses many small plates working in parallel. On almost every motorcycle those plates run in the engine oil, which is why it is called a <strong>wet multiplate clutch</strong>. The oil carries heat away and makes engagement smooth, at the cost of a little drag and a lower friction coefficient than a dry clutch.</p>

<h2 id="parts">The parts, in the order torque passes through them</h2>
<figure>
  <img src="{A}illustrations/transmission/F13.png" alt="Exploded technical plate of a wet multiplate clutch: basket with primary driven gear and cushion springs, alternating friction and steel plates, hub, pressure plate, coil springs and release mechanism" width="2400" height="1500" loading="lazy">
  <figcaption>The wet multiplate clutch exploded. Plate F13, Motopedia Module 4.</figcaption>
</figure>
<ul>
  <li><strong>Primary drive.</strong> A small gear on the crankshaft drives a large gear on the back of the clutch basket. This first reduction means the clutch turns at only a quarter to a third of crankshaft speed. A 20-tooth pinion driving a 68-tooth gear gives a ratio of 3.40, so at 9,000 rpm the clutch turns at about 2,650 rpm.</li>
  <li><strong>Clutch basket.</strong> An aluminium cup with slots around its rim, turning freely on the gearbox mainshaft. Cushion springs between the gear and the basket soak up the pulses of a single-cylinder engine.</li>
  <li><strong>Friction plates.</strong> Discs faced with cork, paper-based or sintered material, with tabs on the outside that lock into the basket slots. A 125 cc engine typically has four or five; a 1,000 cc sports engine eight to ten.</li>
  <li><strong>Steel plates.</strong> Plain steel discs with teeth on the inside that lock onto the clutch hub. They sit between the friction plates.</li>
  <li><strong>Clutch hub.</strong> Splined to the gearbox mainshaft and held by a locknut.</li>
  <li><strong>Pressure plate and springs.</strong> Four to six coil springs, or one diaphragm spring, clamp the whole stack against the hub.</li>
  <li><strong>Release mechanism.</strong> When the lever is pulled, a cable or hydraulic cylinder pushes the pressure plate away from the stack against the springs.</li>
</ul>

{try_box(EN+"clutch", "engine/shots/03-clutch-cutaway-pulled.webp", "Cutaway of the 3D clutch with the lever pulled and the plates separated", "Pull the lever in 3D.", "The clutch view in Under the Engine cuts the basket open so you can watch the plates separate as the lever is pulled.", "Open the clutch view")}

<h2 id="engaged-released">Engaged and released</h2>
<p>With the lever out, the springs squeeze the stack so that the friction plates, turning with the basket and the engine, lock to the steel plates, turning with the hub and the gearbox. Torque flows from the basket to the hub to the mainshaft. Pulling the lever compresses the springs and lets the stack open by a total of only about 0.5 to 1.0 mm. The plates then slide past each other in a film of oil, and the engine can keep running while the gearbox stops.</p>
<p>Between those two states is the friction point, where the plates slip partly. Riders use it to pull away smoothly, and it is also where most clutch wear happens, which is why heavy stop-start work such as taxi riding wears clutches quickly.</p>
<figure>
  <img src="{A}renders/photo/render-engine-xray.jpg" alt="X-ray render of a horizontal single-cylinder engine with a transparent clutch cover, showing the primary drive gear, clutch basket, brown friction plates between steel plates and four coil springs" width="1602" height="1005" loading="lazy">
  <figcaption>The clutch inside a commuter engine, with the cover made transparent: primary gear, basket, plate stack and springs. Render: Transitions Lab, CC BY-SA 4.0.</figcaption>
</figure>

<h2 id="capacity">How much torque a clutch can carry</h2>
<p>The slip torque of a plate clutch is the friction coefficient multiplied by the total spring force, the mean radius of the friction lining and the number of friction faces. Each friction plate has two faces, so five plates give ten. For a 125 cc clutch with five plates, a mean radius of 42.5 mm, four springs giving 960 N in total and a wet friction coefficient of 0.13, the slip torque is about 53 N·m. The K-Light 125 engine delivers about 30 N·m at the clutch once its peak torque of 8.9 N·m is multiplied by the primary ratio, so the clutch has a margin of about 1.75 to cover firing pulses and the gradual weakening of the springs.</p>
<p>The same calculation explains every slipping clutch. Worn linings let the springs extend, so their force falls; tired springs give less force; and the wrong oil lowers the friction coefficient.</p>
<div class="mz-art-note"><p>Car oils labelled "Energy Conserving", or containing friction modifiers, make a wet clutch slip. Use oil meeting JASO MA or MA2. JASO MB oil is for scooters with dry clutches and must not be used in a wet clutch.</p></div>

{try_box(OM("4t", "clutch"), "renders/clutch.webp", "Rendered wet multiplate clutch with basket, plates and pressure plate", "Find the clutch on the bike.", "Select the clutch in the 3D Overview to see where it sits behind the right-hand crankcase cover and how it links to the gearbox.", "Select the clutch")}

<h2 id="free-play">Cable free play</h2>
<p>A cable clutch needs a small amount of slack, measured as free play at the lever tip before the clutch starts to release. The K-Light 125 specifies 10 to 15 mm. Too little free play holds the release mechanism against the pressure plate, so the clutch slips; too much prevents it from releasing fully, so it drags. Free play changes as the plates wear and as the cable stretches, so it is set with the in-line adjuster at the lever and, when that runs out of thread, with the lower adjuster at the engine. A hydraulic clutch adjusts itself and has no free play to set.</p>

<h2 id="faults">Slip, drag and judder</h2>
<div class="mz-art-table"><table>
  <thead><tr><th>Symptom</th><th>Likely cause</th><th>Check</th></tr></thead>
  <tbody>
    <tr><td>Revs rise but speed does not (slip)</td><td>No free play, wrong oil, worn plates, weak springs</td><td>Free play, oil grade, plate thickness, spring length</td></tr>
    <tr><td>Bike creeps with lever pulled, neutral hard to find (drag)</td><td>Too much free play, warped steel plates, notched basket</td><td>Free play, plate flatness, basket slots</td></tr>
    <tr><td>Shudder when pulling away (judder)</td><td>Glazed or oily linings, warped plates, loose engine mounts</td><td>Lining surface, plate flatness, mount bolts</td></tr>
    <tr><td>Heavy lever</td><td>Dry or kinked cable, seized release lever</td><td>Operate the release lever with the cable off</td></tr>
  </tbody>
</table></div>
<p>When the clutch is opened up, friction plates are measured across the lining with a vernier caliper; the K-Light 125 plates are 2.9 to 3.0 mm new with a service limit of 2.6 mm. Steel plates rarely wear thinner but distort from heat, and any plate that admits a 0.10 to 0.20 mm feeler gauge on a flat surface plate is replaced. Springs are measured for free length and replaced as a set, because one short spring tilts the pressure plate and causes judder. Basket slots worn into notches stop the plates sliding apart cleanly; light notches can be dressed with a file, deep ones mean a new basket.</p>

{lfig(OM("sc", "cvt"), "illustrations/transmission/F16.png", "Technical plate of a scooter CVT at low and high ratio, showing variator rollers, belt, driven pulley and centrifugal clutch", "A scooter CVT at low and high ratio, with the centrifugal clutch on the rear pulley. Plate F16, Motopedia Module 4.", "Select the CVT on the scooter in the Overview.")}

<h2 id="other-types">Slipper, assist and centrifugal clutches</h2>
<p>A <strong>slipper clutch</strong> has ramps between the hub and the pressure plate. When a fast downshift makes the rear wheel drive the engine, the ramps push the pressure plate outwards and let the clutch slip, which stops the rear tyre hopping. An <strong>assist</strong> design uses the same ramps under drive to pull the plates tighter, so softer springs and a lighter lever can be used.</p>
<p>Step-through motorcycles such as the Honda Super Cub use an automatic <strong>centrifugal clutch</strong>, linked to the gear pedal, so the rider never needs a lever. Twist-and-go scooters have a dry centrifugal shoe clutch on the rear pulley of the CVT that engages as engine speed rises, typically between about 2,800 and 4,000 rpm. Electric motorcycles need no clutch at all, because the motor produces torque from standstill.</p>
<p>The <a href="../../repair/parts/#clutch">clutch page in the Repair section</a> collects slip, drag and judder with their checks. Chapter 5.1 of the course, <a href="{L}m4-clutch">Primary drive and clutch</a>, includes the full torque calculation and the kickstart mechanism.</p>

{deeper([
  (L+"m4-clutch", "Chapter 5.1: Primary drive and clutch", "torque capacity, slip, drag and the kickstart"),
  (EQ, "Equations summary", "clutch torque capacity and mean friction radius"),
  (QZ+"drivetrain-chassis", "Drivetrain and chassis quiz", "test yourself on Module 5"),
  (PRB+"clutch-slip/", "Clutch slips", "checks in order"),
  (REP+"clutch-cable-adjust/", "Clutch cable adjustment", "setting free play at the lever"),
  (REP+"clutch-plate-service/", "Clutch plate service", "measuring plates and springs"),
  ("../how-a-motorcycle-gearbox-works/", "How a motorcycle gearbox works", "what the clutch feeds"),
 ])}

''',
cta=dict(label='Try it', h='Feel the clutch in the Cockpit', p='In the Cockpit you pull the clutch, select a gear and find the friction point yourself, with the rev counter showing what the engine does. The Overview shows the clutch stack moving inside the engine.', links=[('../../cockpit/', 'Open the Cockpit', True), (OV+'clutch', 'Explore the clutch', False), (L+'m4-clutch', 'Read chapter 5.1', False), ('../../repair/parts/#clutch', 'Clutch repairs', False)]),
faq=[
 ('Why is a motorcycle clutch called a wet clutch?', 'Because its plates run in the engine oil. The oil cools the plates and smooths engagement, which is why the oil must meet the JASO MA or MA2 friction standard.'),
 ('How do I know if my motorcycle clutch is slipping?', 'The engine revs rise when you open the throttle but the road speed does not follow, most noticeably in a high gear at wide throttle. Check lever free play and oil grade before replacing plates.'),
 ('How much free play should a clutch lever have?', 'Follow the manual for your model. Many commuter bikes, including the K-Light 125, specify 10 to 15 mm at the lever tip.'),
 ('Do electric motorcycles have a clutch?', 'Most do not. An electric motor delivers torque from zero speed, so it can stay connected to the wheel through a single fixed ratio.'),
],
related=['how-a-motorcycle-engine-works', 'motorcycle-chain-maintenance', 'boda-boda-maintenance-checklist'],
))

# ---------------------------------------------------------------- 4
ARTICLES.append(dict(
slug='motorcycle-wiring-basics',
title='Motorcycle wiring basics: harness, colours, charging',
h1='Motorcycle wiring basics',
desc='How a motorcycle wiring harness works: earth return, fuses, wire colour codes, the charging circuit, the starter relay and how to trace a fault.',
label='Electrics',
lead='A motorcycle electrical system is a handful of simple circuits sharing one battery and one harness. Once you know how the earth return, the fuses, the colour code and the charging and starting circuits work, most wiring faults can be traced with a multimeter.',
summary='Harness, earth return, fuses, colour codes, charging and starting circuits, and a method for tracing faults.',
hero=dict(src=A+'renders/wiring_harness.webp', w=1000, h=800, alt='Rendered motorcycle main wiring harness with branches, multi-pin connectors, fuse box and relays', cap='A main wiring harness with its branches, connectors, fuse box and relays. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/wiring_harness.webp',
body=f'''
<h2 id="harness">What the harness is</h2>
<p>The <a href="{OV}wiring">wiring harness</a> is a bundle of colour-coded wires, wrapped together into a trunk that runs along the frame, with branches to every electrical component. It connects the <a href="{OV}battery">battery</a>, the charging system, the starter, the ignition and engine management, the lights, the horn and the instruments. Each branch ends in a multi-pin connector, and the fuse box and relays are usually plugged into the harness near the battery.</p>
<figure>
  <img src="{A}illustrations/wiring/WR01.png" alt="Technical plate of a motorcycle main harness laid flat, showing the trunk, branches to each component, connectors, fuse box, relays, earth points and wire colour codes" width="2400" height="1665" loading="lazy">
  <figcaption>The main harness laid flat: trunk, branches, connectors, fuses, relays and earth points. Plate WR01, Motopedia Module 3.</figcaption>
</figure>

{try_box(WL+"harness", "interactive/wiring/preview/harness.png", "Wiring Lab harness tab showing the main loom with its branches to lights, switches, battery and ignition", "Trace the harness.", "The Harness tab of the Wiring Lab lays out every branch of a commuter loom; tap a wire to follow it from end to end.", "Open the harness")}

<h2 id="earth-return">Single-wire earth return</h2>
<p>Most motorcycles use a <strong>single-wire earth-return</strong> system. The battery negative terminal is connected to the frame and engine, and each load returns its current either through the metal structure or through a black earth wire to a common earth point. Modern machines run dedicated earth wires to electronic parts, because painted, plastic and rubber-mounted parts do not give a reliable path, and because a few tenths of a volt of difference between earth points corrupts sensor signals. A corroded earth is one of the most common causes of dim lights and strange intermittent faults.</p>

{try_box(CB+"short", "photos/home-wiring-3.webp", "Circuit Builder screenshot with battery, fuse, relay, horn and meters on a breadboard", "Blow a fuse safely.", "The Circuit Builder preset Short circuit after the fuse shows the current rise and the fuse open, with a meter on every branch.", "Load the short circuit")}

<h2 id="fuses">Fuses protect the wiring</h2>
<p>A fuse protects the wire, not the component. It must be rated below the current that the smallest wire in its circuit can carry. Blade fuses of 10 A and 20 A are typical: the K-Light 125 used as the course example has a 20 A main fuse and two 10 A branch fuses. A fuse that blows repeatedly means there is a short circuit downstream. Fitting a larger fuse never fixes that and can set the harness alight.</p>

<h2 id="colour-codes">Wire colour codes</h2>
<p>Wire colours follow the manufacturer's code, with a stripe colour written after a slash. On the K-Light 125 diagram, R (red) is battery positive, R/W (red with a white stripe) is the switched supply after the ignition switch, B (black) is earth, and the three white wires are the alternator phases. Japanese makers use similar abbreviations, but they do not always mean the same thing, and many use yellow for the alternator phases. The colour key printed on the wiring diagram for the exact model is the only reliable authority.</p>
<div class="mz-art-table"><table>
  <thead><tr><th>Code</th><th>Colour</th><th>Code</th><th>Colour</th></tr></thead>
  <tbody>
    <tr><td>B</td><td>Black</td><td>R</td><td>Red</td></tr>
    <tr><td>BL</td><td>Blue</td><td>LR</td><td>Pink</td></tr>
    <tr><td>LBL</td><td>Light blue</td><td>W</td><td>White</td></tr>
    <tr><td>N</td><td>Brown</td><td>P</td><td>Purple</td></tr>
    <tr><td>G</td><td>Green</td><td>Gr</td><td>Grey</td></tr>
    <tr><td>O</td><td>Orange</td><td>DG</td><td>Dark green</td></tr>
    <tr><td>Y</td><td>Yellow</td><td></td><td></td></tr>
  </tbody>
</table></div>

{try_box(WL+"charging", "interactive/wiring/preview/charging.png", "Wiring Lab charging tab with alternator, regulator rectifier and battery", "Follow the charge.", "The Charging tab animates the alternator output through the regulator rectifier to the battery.", "Open the charging circuit")}

<h2 id="charging">The charging circuit</h2>
<p>An <a href="{OV}charging">alternator</a> on the end of the crankshaft makes alternating current. On almost all small motorcycles it is a permanent-magnet type: a rotor carrying magnets spins around a stator of copper coils. Its output rises with engine speed, and a typical three-phase stator can produce 50 to 80 V AC at 5,000 rpm with no load, so it must be controlled.</p>
<p>The <strong>regulator/rectifier</strong> turns that AC into DC through a diode bridge and holds battery voltage in a safe window, generally 13.5 to 15.0 V at 5,000 rpm on a lead-acid system. The K-Light 125 specifies 14.5 ± 0.5 V. Too low and the battery slowly goes flat; too high and the battery dries out and bulbs blow. Traditional shunt regulators short the surplus current to earth as heat, which is why they carry large fins and why stators on small bikes can fail from overheating. Series (MOSFET) regulators disconnect the stator instead and run much cooler.</p>
<figure>
  <img src="{A}illustrations/wiring/F21.png" alt="Charging circuit schematic: three-phase permanent-magnet alternator, shunt-type regulator/rectifier, main fuse, battery and electrical load" width="2400" height="1171" loading="lazy">
  <figcaption>The charging circuit: alternator, regulator/rectifier, fuse, battery and load. Plate F21, Motopedia Module 3.</figcaption>
</figure>
<p>A quick health check needs only a multimeter. A rested flooded lead-acid battery reading about 12.7 V is fully charged and one reading 12.2 V is half charged; sealed AGM batteries read a little higher, about 12.8 to 13.1 V when full. With the engine held at about 5,000 rpm, the voltage across the battery should rise into the specified charging window.</p>

{try_box(WL+"starting", "interactive/wiring/preview/starting-cranking.png", "Wiring Lab starting tab with the starter relay energised and the starter motor cranking", "Crank the starter.", "The Starting tab shows the small control current through the interlocks and the heavy current through the relay.", "Open the starting circuit")}

<h2 id="starting">The starting circuit</h2>
<p>An electric <a href="{OV}starter">starter motor</a> draws tens to over a hundred amps, far more than a handlebar switch can carry. So the start button only energises the coil of a <strong>starter relay</strong>, which uses a few hundred milliamps and switches the heavy cable from battery to motor. The relay coil circuit runs through a chain of safety interlocks: the neutral switch, the clutch switch, the side-stand switch, the engine stop switch and, on many scooters and on the K-Light 125, a brake lever switch. If any of them is open, the starter will not turn, which is the first thing to check when the starter is silent.</p>
<figure>
  <img src="{A}illustrations/wiring/F23.png" alt="Electric starting circuit schematic with battery, main fuse, ignition switch, start button, clutch, neutral and side-stand interlocks, starter relay, starter motor and starter clutch" width="2400" height="1350" loading="lazy">
  <figcaption>The starting circuit, with the interlocks that must all be closed before the relay can work. Plate F23, Motopedia Module 3.</figcaption>
</figure>

<h2 id="tracing">How to trace a wiring fault</h2>
<ol>
  <li>Find the component that does not work, for example the brake light, and identify which of its wires is supply and which is earth.</li>
  <li>Trace the supply back on the diagram through each switch, connector and fuse to the ignition switch and battery, writing down every colour change.</li>
  <li>List every other circuit that shares the same fuse. If the horn and the brake light fail together, the shared fuse is the first suspect.</li>
  <li>Trace the earth path back to the battery negative or its earth point.</li>
  <li>Choose a test point near the middle of the circuit, so one voltage reading tells you which half the fault is in, and repeat.</li>
</ol>
<p>Most faults are mechanical rather than electrical: corroded or loose terminals, pins pushed back out of a connector by careless probing, and wires chafed where the harness passes the steering head. Repairs should use crimped terminals of the right type, or a soldered and heat-shrunk splice. Larger modern machines also link their control units over a two-wire CAN bus, which is tested differently; chapter 4.5 of the course, <a href="{L}m3-lighting-wiring">Lighting, signalling and wiring</a>, covers it, and chapter 4.2, <a href="{L}m3-battery-charging">Battery, charging and starting</a>, gives the full charging and starting tests. For a battery that keeps going flat, our guide to <a href="../motorcycle-battery-keeps-dying/">battery, charging and drain tests</a> takes you through them in order, and the Repair section's <a href="../../repair/parts/#wiring">wiring</a> and <a href="../../repair/parts/#battery">battery</a> pages list common electrical faults.</p>

{deeper([
  (L+"m3-lighting-wiring", "Chapter 4.5: Lighting, signalling and wiring", "colour codes, loads and wire sizes"),
  (EQ, "Equations summary", "Ohm's law, power and wire resistance"),
  (CB+"bad-earth", "Circuit Builder: a corroded earth", "measure the drop that dims a headlight"),
  (QZ+"fuel-ignition", "Fuel, ignition and electrical quiz", "test yourself on Module 3"),
  (REP+"wiring-diagram-read/", "Reading a wiring diagram", "symbols and colour codes"),
  (REP+"wiring-fault-find/", "Wiring fault finding", "open circuits, shorts and bad earths"),
  (PRB+"fuse-keeps-blowing/", "Fuse keeps blowing", "finding the short"),
 ])}

''',
cta=dict(label='Try it', h='Build circuits in the Wiring Lab', p='The Wiring Lab lets you follow the harness, the starting circuit, the charging circuit and the ignition circuit on an interactive diagram, and the circuit workbench lets you blow a fuse safely.', links=[('../../wiring/', 'Open the Wiring Lab', True), (OV+'wiring', 'See the harness in 3D', False), (L+'m3-lighting-wiring', 'Read chapter 4.5', False), ('../../repair/parts/#wiring', 'Wiring repairs', False)]),
faq=[
 ('What voltage should a motorcycle battery read?', 'A rested 12 V flooded lead-acid battery reads about 12.7 V when fully charged and about 12.2 V at half charge; a sealed AGM battery reads about 12.8 to 13.1 V when full. With the engine at about 5,000 rpm the charging voltage is usually 13.5 to 15.0 V.'),
 ('What colour is the earth wire on a motorcycle?', 'Black is the usual earth colour, including on the K-Light 125 diagram. Always confirm with the colour key on the wiring diagram for your model.'),
 ('Why does my motorcycle starter not turn when I press the button?', 'Check the interlocks first: neutral, clutch lever, side stand, engine stop switch and, on many bikes, the brake lever. Then check the battery voltage, the main fuse and the starter relay.'),
 ('Can I fit a bigger fuse if mine keeps blowing?', 'No. A fuse that keeps blowing shows a short circuit downstream. A larger fuse lets the wiring overheat instead of protecting it.'),
],
related=['how-electric-motorcycles-work', 'boda-boda-maintenance-checklist', 'how-a-motorcycle-engine-works'],
))
