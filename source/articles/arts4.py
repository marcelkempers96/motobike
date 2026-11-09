from links import EN, WL, CB, MD, QZ, EQ, BUILD, COCKPIT, VID, REP, PRB, PRT, OM, try_box, lfig, deeper
from arts3 import A, OV, L, ARTICLES
T = '../../types/#'
TH = '../../types/thumbs/'

def tfig(id, w, h, alt, cap):
    return f'''<figure>
  <img src="{TH}{id}.jpg" alt="{alt}" width="{w}" height="{h}" loading="lazy">
  <figcaption>{cap}</figcaption>
</figure>'''

# ---------------------------------------------------------------- 7
ARTICLES.append(dict(
slug='types-of-motorcycles',
title='Types of motorcycles: 16 kinds explained',
h1='Types of motorcycles',
desc='The main types of motorcycle explained: standard, sport and touring bikes, scooters, motocross, boda bodas and electric models, and what defines each.',
label='Motorcycle types',
lead='Motorcycle types are defined less by style than by what the machine is built to do: carry goods through a city, cross a continent, climb a rock or lap a circuit. The frame, engine, wheels and riding position follow from that job.',
summary='Sixteen types in five families, from the 1885 Reitwagen to the electric boda, and the parts that define each.',
hero=dict(src=TH+'standard.jpg', w=720, h=486, alt='Labelled line plate of a standard roadster motorcycle in side view with upright handlebars, flat seat, visible engine and twin rear shocks', cap='The standard roadster, the all-rounder most riders learn on. Plate from the Motopedia motorcycle types collection.'),
thumb=TH+'standard.jpg',
body=f'''
<p>The Motopedia <a href="../../types/">motorcycle types</a> page groups sixteen types into five families: pioneers, road, off-road, urban and work, and electric. This guide walks through each family, explains what sets each type apart, and links to the full entry with its labelled plate, history and typical specifications.</p>

<h2 id="pioneers">Pioneers</h2>
<p>The <a href="{T}pioneer">pioneer motor-bicycle</a> was a bicycle with an engine bolted in. Gottlieb Daimler and Wilhelm Maybach's wooden Reitwagen of 1885 was the first petrol-engined two-wheeler, and the Hildebrand &amp; Wolfmüller of 1894 was the first offered for sale. These machines used a diamond bicycle frame, a single-cylinder engine of 200 to 500 cc, a belt drive with no clutch or gearbox, and pedals for starting and climbing.</p>
<p>Within two decades the <a href="{T}vintage-vtwin">vintage V-twin</a> had arrived: a loop frame, a 45-degree V-twin of 1,000 to 1,200 cc, a hand gear-change on the tank and chain drive. Machines such as the Indian Powerplus and the Brough Superior SS100 were the first true motorcycles rather than motorised bicycles. Our <a href="../../history/">history of the motorcycle</a> follows the story in more detail.</p>

{try_box(MD+"bike_superbike", "renders/bike_superbike_side.webp", "Side render of a 1000 cc superbike with full fairing", "Compare the bikes in 3D.", "The model library has eleven complete motorcycles, from a 1901 pioneer to a superbike and an electric scrambler.", "Open the model library")}

<h2 id="road">Road motorcycles</h2>
<h3 id="standard">Standard roadster</h3>
<p>The <a href="{T}standard">standard roadster</a> has an upright seat, no fairing and the engine in plain view. It uses a steel cradle or backbone frame, a telescopic fork and chain final drive, with engines from 125 to 1,000 cc. The Triumph Bonneville T120 and the Honda CB750 Four are classic examples, and most riders learn on a machine of this kind.</p>
<h3 id="cafe-racer">Café racer</h3>
<p>The <a href="{T}cafe-racer">café racer</a> is a road bike stripped and tuned for speed in the 1960s style: clip-on handlebars mounted low on the fork legs, rear-set footrests for a racing crouch, a long tank and a humped single seat.</p>
<h3 id="cruiser">Cruiser and chopper</h3>
<p>The <a href="{T}cruiser">cruiser</a> has a low stepped seat, a raked fork, forward foot controls and usually a large air-cooled V-twin built for torque at low revs. The long wheelbase gives stability in a straight line rather than quick steering.</p>
<h3 id="superbike">Superbike and sport bike</h3>
<p>The <a href="{T}superbike">superbike</a> is a road machine built like a racing bike: an aluminium twin-spar frame, a liquid-cooled engine that revs past 14,000 rpm, an upside-down fork, radial brake calipers, a full fairing and a tucked riding position. The Honda CB750 Four of 1969 started the line, and the CBR900RR Fireblade of 1992 set the pattern of light weight over outright power.</p>
{tfig('superbike', 720, 405, 'Labelled line plate of a sport bike in side view with full fairing, clip-on bars, upside-down fork and three-spoke cast wheels', 'The superbike: full fairing, twin-spar frame and racing brakes. Motopedia types collection.')}
<h3 id="naked">Naked and streetfighter</h3>
<p>The <a href="{T}naked">naked</a> takes a sport bike's engine and chassis and removes the fairing, adding wide flat bars and an upright, slightly forward riding position. Engines are usually tuned for mid-range torque rather than peak power.</p>
<h3 id="touring">Touring</h3>
<p>The <a href="{T}touring">touring</a> motorcycle is made to cross continents two-up: a frame-mounted fairing with an adjustable screen, built-in luggage, and often a flat-four or flat-six engine mounted low with shaft final drive, so there is no chain to adjust on a long trip. The Honda Gold Wing is the reference machine.</p>

<h2 id="off-road">Off-road motorcycles</h2>
<h3 id="motocross">Motocross</h3>
<p>The <a href="{T}motocross">motocross</a> machine is built to race over jumps and ruts. It has about 300 mm of suspension travel, a 21 in front wheel and an 18 or 19 in rear wheel with knobbly tyres, a liquid-cooled single of 125 to 450 cc, either <a href="../two-stroke-vs-four-stroke/">two-stroke or four-stroke</a>, and no lights, mirrors or stand.</p>
{tfig('motocross', 720, 356, 'Labelled line plate of a motocross motorcycle in side view with long-travel fork, high front mudguard, knobbly tyres and expansion chamber', 'Motocross: long-travel suspension, knobbly tyres and no road equipment. Motopedia types collection.')}
<h3 id="trials">Trials</h3>
<p>The <a href="{T}trials">trials</a> bike climbs rocks at walking pace and is ridden standing up, so it has almost no seat, a tiny tank, a very short wheelbase and soft tyres run at about 0.3 to 0.5 bar. A complete machine weighs only 65 to 75 kg.</p>
<h3 id="adventure">Adventure</h3>
<p>The <a href="{T}adventure">adventure</a> motorcycle is a road tourer that keeps going when the tarmac ends: tall, upright, with long-travel suspension, a 19 or 21 in front wheel, a large fuel tank, crash bars and panniers. The BMW R80G/S of 1980 created the type.</p>

{try_box(OM("bb"), "renders/bike_boda_boda_threeq.webp", "Three-quarter render of a boda boda commuter motorcycle with long seat and luggage rack", "Explore a boda boda.", "Open the boda boda in the 3D Overview and select any of its parts to see what it does and how it is serviced.", "Open the boda boda")}

<h2 id="urban-work">Urban and work motorcycles</h2>
<h3 id="scooter">Scooter</h3>
<p>The <a href="{T}scooter">scooter</a> has a step-through floor, small 10 to 14 in wheels and a unit-swing engine in which engine, CVT and final drive form one assembly that also acts as the rear swingarm. There is no clutch lever or gear pedal: a variator with roller weights, a V-belt and a centrifugal clutch do the work.</p>
<h3 id="step-through">Step-through underbone</h3>
<p>The <a href="{T}step-through">step-through underbone</a>, led by the Honda Super Cub of 1958, has a pressed-steel backbone frame, leg shields, 17 in wheels and a horizontal single under the backbone with a semi-automatic gearbox: the rider changes gear with the foot but has no clutch lever. More than 100 million have been built.</p>
<h3 id="boda-boda">Boda boda commuter</h3>
<p>The <a href="{T}boda-boda">boda boda</a> is the motorcycle taxi and light truck of East Africa: a rugged air-cooled single of 100 to 150 cc with kick and electric start, a long flat dual seat, a heavy rear carrier, crash guards, drum brakes, a full chain case and a centre stand. The Bajaj Boxer and TVS HLX are common examples. Our <a href="../boda-boda-maintenance-checklist/">boda boda maintenance checklist</a> covers the daily and weekly checks these machines need.</p>
{tfig('boda-boda', 720, 405, 'Labelled line plate of a boda boda commuter motorcycle with round headlight, fork gaiters, air-cooled single, long dual seat, rear carrier, crash guards and full chain case', 'The boda boda commuter, built to carry passengers and loads every day. Motopedia types collection.')}

<h2 id="electric">Electric motorcycles</h2>
<p>The <a href="{T}electric-motorcycle">electric motorcycle</a> puts a lithium-ion battery where the engine was, with a controller and a permanent-magnet motor driving the rear wheel through a single-speed belt or chain. There is no clutch or gearbox, and regenerative braking returns energy to the battery. The <a href="{T}electric-scooter">electric moped and e-boda</a> goes further, with a hub motor in the rear wheel and a removable battery that can be carried or swapped. Our guide to <a href="../how-electric-motorcycles-work/">how electric motorcycles work</a> explains each part.</p>

{try_box(BUILD, "photos/home-builder.webp", "Screenshot of the Motopedia Bike builder with engine, frame and wheel options", "Build your own.", "The Bike builder lets you choose engine, frame, wheels and seat and see the type of machine they add up to.", "Open the Bike builder")}

<h2 id="choosing">What the types have in common</h2>
<p>Every type shares the same systems: an engine or motor, a drivetrain, a frame with suspension and steering, wheels and brakes, and an electrical system. What changes is the balance between them. A trials bike gives up seat and fuel range for low weight; a touring bike gives up agility for comfort and luggage; a boda boda gives up speed for strength and low running cost. Chapter 1.2 of the course, <a href="{L}m1-types">Types and configurations</a>, adds the legal categories and licence classes that apply to each.</p>

{deeper([
  (L+"m1-types", "Chapter 1.2: Types and configurations", "legal categories and licence classes"),
  (L+"m1-anatomy", "Chapter 1.3: Anatomy and controls", "the parts every type shares"),
  ("../../history/", "History of the motorcycle", "how each type appeared"),
  (QZ+"foundations", "Foundations quiz", "test yourself on Module 1"),
  (VID+"how-it-works", "Videos: how it works", ""),
 ])}

''',
cta=dict(label='Explore', h='Browse all sixteen types', p='The types page has a timeline from 1885 to today, family filters, and a labelled plate, history and typical specifications for every type. Then build your own machine in the Bike builder.', links=[('../../types/', 'Open motorcycle types', True), ('../../build/', 'Open the Bike builder', False), (L+'m1-types', 'Read chapter 1.2', False)]),
faq=[
 ('What are the main types of motorcycle?', 'The main families are road machines (standard, café racer, cruiser, sport, naked and touring), off-road machines (motocross, trials and adventure), urban and work machines (scooter, step-through and commuter) and electric machines.'),
 ('What is the difference between a scooter and a motorcycle?', 'A scooter has a step-through floor, small wheels and an automatic CVT with no clutch lever or gear pedal, usually in a unit-swing engine. A motorcycle has the engine in the frame, larger wheels and usually a manual gearbox.'),
 ('What is a boda boda?', 'A boda boda is a motorcycle taxi in East Africa, typically a rugged 100 to 150 cc air-cooled single with a long seat, rear carrier, crash guards and drum brakes. Electric boda bodas are growing in number.'),
 ('What type of motorcycle is best for beginners?', 'A standard roadster or a small commuter of about 125 cc is the usual starting point, because it has an upright riding position, light controls and predictable power.'),
],
related=['two-stroke-vs-four-stroke', 'how-electric-motorcycles-work', 'boda-boda-maintenance-checklist'],
))

# ---------------------------------------------------------------- 8
ARTICLES.append(dict(
slug='boda-boda-maintenance-checklist',
title='Boda boda maintenance checklist: daily and weekly',
h1='Boda boda maintenance checklist',
desc='Daily, weekly and monthly maintenance checks for boda boda and motorcycle taxi riders in East Africa: tyres, brakes, chain, oil, lights and electrics.',
label='Maintenance',
lead='A boda boda works harder than almost any other motorcycle: long days, a passenger or a heavy load, dust, rain and rough roads. A few minutes of checks each morning and a longer session each week prevent most breakdowns and keep the rider and passenger safe.',
summary='Daily, weekly and monthly checks for motorcycle taxi riders: tyres, brakes, chain, oil, lights and electrics.',
hero=dict(src=TH+'boda-boda.jpg', w=720, h=405, alt='Labelled line plate of a boda boda commuter motorcycle with round headlight, fork gaiters, air-cooled single, long dual seat, rear carrier, crash guards, drum brakes and full chain case', cap='The parts a boda boda rider checks every day: tyres, drum brakes, chain case, carrier, crash guards and stands. Plate from the Motopedia motorcycle types collection.'),
thumb=TH+'boda-boda.jpg',
body=f'''
<h2 id="why">Why a commercial motorcycle needs more care</h2>
<p>Service schedules are written for average riders. The K-Light 125 manual, used as the worked example in the Motopedia course, bases its schedule on about 1,000 km a month and asks for shorter intervals on dusty roads and at high mileage. A boda boda rider covering 120 km a day reaches 1,000 km in little more than a week, often two-up or loaded, on roads that are dusty in the dry season and muddy in the wet. Every interval in the manual therefore arrives several times sooner than it would for a private rider.</p>
<figure class="is-portrait">
  <img src="{A}photos/kenya-flag-ride.jpg" alt="Rider seen from behind on a black dual-purpose motorcycle in a wide green field in Kenya, with a Kenyan flag fixed to the rear and parked vehicles in the distance" width="1125" height="1500" loading="lazy">
  <figcaption>A ride out in Kenya, where motorcycle taxis carry a large share of urban trips. Photograph: Transitions Lab collection.</figcaption>
</figure>
<p>Most boda bodas are rugged 100 to 150 cc air-cooled singles with drum brakes, spoked wheels and a full chain case, such as the Bajaj Boxer and TVS HLX described in the <a href="../../types/#boda-boda">boda boda type</a>. The checks below suit those machines; electric bodas are covered at the end.</p>

<h2 id="daily">Daily checks before the first ride</h2>
<p>This list follows the T-CLOCS pre-ride check (tyres, controls, lights, oil, chassis, stands) and takes about five minutes.</p>
<h3 id="tyres">Tyres and wheels</h3>
<ul>
  <li>Look at both tyres for cuts, bulges, nails and objects in the tread. Spin each wheel and look along the rim for dents.</li>
  <li>Press each tyre with your thumb. If one feels softer than usual, check it with a gauge before riding.</li>
  <li>Run a hand over the spokes. A loose spoke rings dull when tapped and should be tightened before it breaks.</li>
</ul>
<h3 id="controls">Controls and brakes</h3>
<ul>
  <li>Squeeze the front brake lever and press the rear pedal. Each should feel firm and stop well short of its limit. On many commuters the rear pedal has 20 to 30 mm of free play before the brake bites.</li>
  <li>Twist the throttle and let go in every handlebar position, from full left lock to full right lock. It must snap shut every time.</li>
  <li>Pull the clutch lever and check the cable moves freely, with no fraying at the ends.</li>
</ul>
<h3 id="lights">Lights and electrics</h3>
<ul>
  <li>Check the headlight on dipped and main beam, the tail light, the brake light from both the lever and the pedal, the indicators and the horn.</li>
  <li>If the starter turns slowly in the morning, the battery or its terminals need attention before the bike leaves you stranded. Our guide to <a href="../motorcycle-battery-keeps-dying/">a battery that keeps going flat</a> explains the tests.</li>
</ul>
<h3 id="oil">Oil and leaks</h3>
<ul>
  <li>Check the engine oil level with the motorcycle upright on level ground. On many engines, including the K-Light 125, the dipstick is read resting in the hole, not screwed in.</li>
  <li>Look under the motorcycle for fresh drips of oil or fuel.</li>
</ul>
<h3 id="chassis">Chain, chassis and stands</h3>
<ul>
  <li>Push the chain up and down at the middle of the lower run. On many commuters the total movement should be 20 to 40 mm. Our <a href="../motorcycle-chain-maintenance/">chain maintenance guide</a> explains how to measure and adjust it.</li>
  <li>Check that the centre stand and side stand spring back fully, and that the rear carrier and crash guards are tight.</li>
</ul>

{try_box(OM("bb", "chain"), "renders/bike_boda_boda__chain.webp", "The chain highlighted on the rendered boda boda commuter", "See each check on the bike.", "Select the chain, brakes or tyres of the boda boda in the 3D Overview to see where each daily and weekly check is made.", "Open the boda boda chain")}

<h2 id="weekly">Weekly checks</h2>
<figure>
  <img src="{A}illustrations/chassis/F19.png" alt="Technical plate of motorcycle brakes: a hydraulic disc system with master cylinder, reservoir, line, caliper and disc beside a drum brake with shoes, cam and return springs" width="2400" height="1620" loading="lazy">
  <figcaption>Disc and drum brakes side by side. Most boda bodas use drums front and rear. Plate F19, Motopedia Module 4.</figcaption>
</figure>
<ul>
  <li><strong>Tyre pressures.</strong> Set them cold with a gauge, to the figure for the load you carry. The K-Light 125's solo figures are 190 kPa (27.5 psi) front and 210 kPa (30.5 psi) rear; manuals give higher figures for a passenger and load. Under-inflation makes a loaded tyre overheat and wear its shoulders. Our <a href="../motorcycle-tyre-pressure-and-wear/">tyre pressure and wear guide</a> has the details.</li>
  <li><strong>Tread.</strong> Replace a tyre when the tread is level with the wear indicator bars in the grooves, at about 1 mm. Check the four-digit date code on the sidewall too: 2324 means week 23 of 2024.</li>
  <li><strong>Chain.</strong> Clean and lubricate it. The usual interval of 500 to 800 km means at least once a week at 120 km a day, and more often after rain. Lubricate the inside of the lower run while the chain is warm.</li>
  <li><strong>Drum brake wear.</strong> Look at the wear indicator on the brake cam lever with the brake applied. If the pointer is beyond the mark, the shoes or the drum are worn out. On disc brakes, check the pads as described in our <a href="../how-to-check-motorcycle-brake-pads/">brake pad guide</a>.</li>
  <li><strong>Air filter.</strong> In the dry season, dust clogs the filter quickly and robs the engine of power and economy. Inspect it and clean or replace it as the manual directs, more often on dusty roads.</li>
  <li><strong>Battery terminals.</strong> Check that both are tight and free of white or green corrosion. When removing a battery, disconnect the negative first and reconnect it last.</li>
  <li><strong>Nuts and bolts.</strong> Check the axle nuts, the rear sprocket nuts, the engine mounts, the footpegs, the carrier and the mirrors. Vibration on rough roads loosens them.</li>
</ul>

{try_box(OM("bb", "brake"), "renders/bike_boda_boda__brake.webp", "The front brake highlighted on the rendered boda boda commuter", "Check the brakes.", "The brake part view shows the caliper or drum, cable or hose and the wear points to look at.", "Select the boda boda brakes")}

<h2 id="monthly">Monthly or by distance</h2>
<ul>
  <li><strong>Engine oil.</strong> The K-Light 125 changes its 1.1 litres of oil every 3,000 km, which at 120 km a day is less than a month. Use oil rated JASO MA or MA2, because the same oil lubricates the wet clutch; car oils with friction modifiers make it slip. Our guide to <a href="../how-to-change-motorcycle-oil/">changing motorcycle oil</a> gives the steps.</li>
  <li><strong>Clutch free play.</strong> Set 10 to 15 mm at the lever tip on the K-Light 125, or the figure for your model. Our article on <a href="../how-a-motorcycle-clutch-works/">how a motorcycle clutch works</a> explains why slip and drag follow from wrong free play.</li>
  <li><strong>Chain wear and sprockets.</strong> Measure chain length over 10 or 20 links and look for hooked sprocket teeth. Replace chain and sprockets together.</li>
  <li><strong>Spark plug, valve clearance and idle.</strong> Follow the manual's intervals, shortened for high mileage.</li>
  <li><strong>Brake shoes.</strong> Remove the wheels, measure the linings (a typical limit is 1.5 to 2.0 mm), and clean the dust out with a damp cloth, never with compressed air. Grease the brake cam lightly with high-temperature grease.</li>
  <li><strong>Charging check.</strong> With a multimeter across the battery and the engine at about 5,000 rpm, a healthy charging system reads within the specified window, typically 13.5 to 15.0 V. Our <a href="../motorcycle-wiring-basics/">wiring basics guide</a> explains the test.</li>
</ul>

<h2 id="electric-boda">Electric bodas</h2>
<p>Electric boda bodas need no oil changes, spark plugs, valve adjustment or air filter. Tyres, brakes, wheel bearings and the chain or belt still need the same daily and weekly checks, and chains wear faster than on a petrol machine because of the motor's instant torque. Check the battery and charge connectors for looseness, burning or corrosion, and never open a traction battery or controller: packs above 60 V DC need trained technicians with insulated tools. Our guide to <a href="../how-electric-motorcycles-work/">how electric motorcycles work</a> explains the parts, and our <a href="../electric-motorcycle-battery-care/">battery care guide</a> covers charging and storage.</p>
<div class="mz-art-note"><p>The rider and passenger depend on the tyres and brakes more than on anything else. If a brake feels soft, a tyre is damaged or the chain is badly worn, fix it before carrying a passenger.</p></div>
<p>Chapter 5.8 of the course, <a href="{L}m4-maintenance">Periodic maintenance and pre-delivery inspection</a>, gives the full schedule, the T-CLOCS checklist and the chassis tune-up. When a check turns up a fault, the <a href="../../repair/problems/">Repair section</a> lists common problems with their causes, and has pages for the <a href="../../repair/parts/#brake">brakes</a>, <a href="../../repair/parts/#chain">chain</a> and <a href="../../repair/parts/rear_tyre/">rear wheel</a>.</p>

{deeper([
  (L+"m4-maintenance", "Chapter 5.8: Periodic maintenance and pre-delivery inspection", "the full service schedule"),
  (QZ+"drivetrain-chassis", "Drivetrain and chassis quiz", "test yourself on Module 5"),
  (REP+"oil-level-check/", "Oil level check", ""),
  (REP+"chain-adjust/", "Chain adjustment", ""),
  (REP+"brake-pad-check/", "Brake pad check", ""),
  (REP+"tyre-pressure-check/", "Tyre pressure check", ""),
  (VID+"maintenance", "Videos: maintenance", ""),
 ])}

''',
cta=dict(label='Learn more', h='Train your eye on the real parts', p='Select the brake, chain or tyres in the Overview to see each part in 3D, then test what you know with the Quiz. Workshops and fleet operators can use the course modules for free under CC BY-SA 4.0.', links=[(OV+'brake', 'Explore the brakes', True), ('../../quiz/', 'Take the quiz', False), (L+'m4-maintenance', 'Read chapter 5.8', False), ('../../repair/problems/', 'Find a fault', False)]),
faq=[
 ('How often should a boda boda have its oil changed?', 'Follow the manual and shorten the interval for heavy use. The K-Light 125 changes its oil every 3,000 km, which at 120 km a day is less than a month. Use JASO MA or MA2 oil.'),
 ('How often should I oil my motorcycle chain?', 'Every 500 to 800 km and after rain. For a rider covering 120 km a day that means at least once a week.'),
 ('What should I check on my motorcycle every day?', 'Tyres and wheels, brakes, throttle and clutch, lights and horn, engine oil level and leaks, chain slack and the stands. This is the T-CLOCS pre-ride check.'),
 ('Do electric boda bodas need maintenance?', 'Yes, but less. They need no oil, spark plugs or air filter, but tyres, brakes, bearings, the chain or belt and the connectors still need regular checks.'),
],
related=['motorcycle-chain-maintenance', 'how-a-motorcycle-clutch-works', 'motorcycle-wiring-basics'],
))
