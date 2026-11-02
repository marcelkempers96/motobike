from arts2 import A, OV, L, ARTICLES

# ---------------------------------------------------------------- 5
ARTICLES.append(dict(
slug='how-electric-motorcycles-work',
title='How electric motorcycles work: motor, battery, BMS',
h1='How electric motorcycles work',
desc='How an electric motorcycle works: battery pack and BMS, motor controller, PMSM and hub motors, regenerative braking, DC-DC converter and charging.',
label='Electric',
lead='An electric motorcycle replaces the tank, engine, clutch and gearbox with a battery, a controller and a motor. Each part is simple to describe, and together they turn about four-fifths of the battery\'s energy into motion at the wheel.',
summary='Battery pack, BMS, controller, motor and regenerative braking, with the efficiency numbers that set range.',
hero=dict(src=A+'renders/bike_electric_side.webp', w=1600, h=1200, alt='Rendered electric scrambler motorcycle in side view with battery pack in the frame, mid-mounted motor and chain final drive', cap='An electric scrambler: the battery sits where the engine would be, with the motor and controller below it. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/bike_electric_side.webp',
body=f'''
<h2 id="energy-chain">The energy chain</h2>
<p>A petrol motorcycle turns chemical energy into heat and then into work in the cylinder, and a small air-cooled engine manages only 12 to 20 per cent of that in town riding. An electric motorcycle skips the heat engine. The battery delivers electricity directly, and each step loses only a few per cent: roughly 96 per cent in the battery, 97 per cent in the controller, around 90 per cent in the motor averaged over a real ride, and 96 per cent in the chain or belt. Multiplied together, about 80 per cent of the battery's energy reaches the rear wheel.</p>
<p>In practice, a 125-equivalent electric commuter uses about 2 to 4 kWh per 100 km at the battery terminals, depending on speed, load and hills. A 125 cc petrol commuter burning 2.5 litres per 100 km uses about 22 kWh of fuel energy for the same distance.</p>
<figure>
  <img src="{A}illustrations/electrical/F25.png" alt="Block diagram of an electric motorcycle powertrain: battery pack with BMS, main fuse, pre-charge circuit and contactor, motor controller, motor with position sensor, vehicle control unit, DC-DC converter, charge port, CAN bus, throttle and brake inputs and regenerative path" width="2400" height="1500" loading="lazy">
  <figcaption>The electric powertrain as a block diagram, with the regenerative braking path. Plate F25, Moto Zero Module 05.</figcaption>
</figure>

<h2 id="battery">The battery pack</h2>
<p>The <a href="{OV}battery">traction battery</a> is built from lithium-ion cells joined in series to raise the voltage and in parallel to raise the capacity. A pack described as 20S10P has 20 groups in series, each made of 10 cells in parallel. With common 21700 cells of 3.6 V and 5.0 Ah, that gives 72 V nominal, 50 Ah and 3.6 kWh from 200 cells weighing about 14 kg, or about 20 kg once holders, busbars, electronics and the case are added. At 3.6 kWh per 100 km that is roughly 100 km of range, which is the scale of a 125-equivalent commuter.</p>
<p>The cell chemistry matters. Nickel manganese cobalt (NMC) cells store the most energy for their weight. Lithium iron phosphate (LFP) cells are heavier for the same range but last many more charge cycles, contain no cobalt or nickel and are more stable if damaged, so they are spreading in commuter and battery-swap fleets.</p>
<figure>
  <img src="{A}illustrations/electrical/F26.png" alt="Technical plate of battery pack construction: cylindrical cells in holders arranged in series-parallel groups, nickel strips and busbars, BMS board with balance leads and thermistors, enclosure and connector, with an inset section through one cell" width="2400" height="1500" loading="lazy">
  <figcaption>Battery pack construction on the 20S10P pattern, with a section through one cylindrical cell. Plate F26, Moto Zero Module 05.</figcaption>
</figure>

<h2 id="bms">The battery management system</h2>
<p>Every lithium pack has a <strong>battery management system (BMS)</strong>. It measures the voltage of every series group, several temperatures and the pack current. From these it estimates the state of charge shown on the dashboard and the state of health of the pack, it balances cells that have drifted apart, and it protects the pack by cutting the current if any cell goes too high, too low, too hot or too cold. It also tells the controller and charger how much current they may draw or deliver, which is why an electric motorcycle gives less power when the battery is cold, hot or nearly empty.</p>

<h2 id="controller">The motor controller</h2>
<p>The battery supplies direct current, but the motor needs three-phase alternating current whose frequency follows the wheel speed. The <a href="{OV}controller">motor controller</a>, also called the inverter, makes that current with six fast power switches: MOSFETs on low-voltage machines, IGBTs or silicon-carbide devices on high-voltage ones. It reads the throttle, the rotor position and the phase currents, and it regulates the motor's torque. Throttle maps and ride modes are simply different instructions to this unit.</p>
<p>Before the main contactor connects the battery, a <strong>pre-charge circuit</strong> charges the controller's capacitors gently through a resistor. Without it, closing the contactor onto empty capacitors would cause an inrush of thousands of amps that could weld the contactor tips.</p>

<h2 id="motor">The motor</h2>
<p>The traction <a href="{OV}motor">motor</a> is almost always a brushless permanent-magnet machine. The copper windings are on the stationary stator, where they can be cooled, and the magnets are on the rotor. Two layouts dominate.</p>
<ul>
  <li><strong>Hub motor.</strong> The motor is built into the rear wheel. There is no chain, belt or gearbox to maintain. Hub motors suit electric mopeds and e-bodas such as the machines in the <a href="../../types/#electric-scooter">electric moped and e-boda</a> type.</li>
  <li><strong>Mid-drive motor.</strong> The motor sits in the frame and drives the wheel through a chain, belt or gear reduction. It keeps weight off the wheel, which helps the suspension, and lets the motor spin faster and smaller. Most full-size <a href="../../types/#electric-motorcycle">electric motorcycles</a> use this layout.</li>
</ul>
<figure>
  <img src="{A}renders/motor.webp" alt="Rendered permanent-magnet synchronous motor cut away to show the finned housing, stator teeth with copper windings, rotor magnets, bearings and output shaft" width="1000" height="800" loading="lazy">
  <figcaption>A permanent-magnet motor cut away: stator with copper windings, rotor with magnets, bearings and shaft. Render: Transitions Lab, CC BY-SA 4.0.</figcaption>
</figure>
<p>An electric motor produces full torque from zero speed and keeps a useful spread of torque across a wide speed range, so a single fixed ratio is enough. That is why an electric motorcycle has no clutch and no gearbox.</p>

<h2 id="regen">Regenerative braking</h2>
<p>When the rider closes the throttle or touches the brake, the controller can reverse the motor's torque so that it works as a generator, sending energy back into the battery. A 250 kg machine and rider at 50 km/h carry about 6.7 Wh of kinetic energy, and perhaps 4 Wh of it comes back after losses in the tyre, drivetrain, motor, controller and battery. In stop-start city riding that adds up to a useful saving and less brake pad wear, but the friction brakes still do the hard stops.</p>

<h2 id="low-voltage">The 12 V system and charging</h2>
<p>Lights, horn, indicators and the dashboard still run at 12 V, as on a petrol motorcycle. A <strong>DC-DC converter</strong> steps the traction voltage down to about 13.5 to 14.4 V. Charging happens through an on-board charger with a mains inlet, an off-board charger brick, a DC fast-charge port on larger machines, or by swapping the battery. Battery swapping, used by Gogoro in Taiwan and by several operators in East Africa, replaces hours of charging with a stop of a couple of minutes, and separates the cost of the battery from the cost of the motorcycle.</p>
<div class="mz-art-note"><p>Packs above 60 V DC count as high voltage, and a so-called 72 V pack reaches 84 V when full. Work on traction circuits needs safe isolation, insulated tools and training. Orange cables mark the high-voltage circuit on electric motorcycles.</p></div>

<h2 id="maintenance">What still needs maintenance</h2>
<p>An electric motorcycle needs no engine oil, spark plugs, valve adjustment, air filter or exhaust work. Brakes, tyres, wheel and motor bearings, the final drive and the connectors still need regular checks. Chains wear faster than on a petrol machine of similar power because of the motor's instant torque, so slack and wear length are checked as described in our <a href="../motorcycle-chain-maintenance/">chain maintenance guide</a>. Module 05 of the course starts with <a href="{L}m5-architecture">the architecture of an electric two-wheeler</a> and continues with <a href="{L}m5-batteries">batteries and the BMS</a>.</p>
<p>How the pack is charged and stored decides how long it lasts; our guide to <a href="../electric-motorcycle-battery-care/">electric motorcycle battery care</a> sets out the habits that matter. For faults, the Repair section has pages for the <a href="../../repair/parts/#battery">battery</a>, <a href="../../repair/parts/#controller">controller</a>, <a href="../../repair/parts/#motor">motor</a> and <a href="../../repair/parts/#charge_port">charge port</a>.</p>
''',
cta=dict(label='Try it', h='Take an electric motorcycle apart in 3D', p='The Overview has an electric scrambler with its battery, controller, motor and charge port. Select each part to see what it does, then try an electric drivetrain in the Bike builder.', links=[(OV+'battery', 'Explore the battery', True), ('../../repair/parts/#controller', 'Electric drive repairs', False), ('../../build/', 'Open the Bike builder', False), (L+'m5-architecture', 'Read Module 05', False)]),
faq=[
 ('Do electric motorcycles have gears?', 'Almost all use a single fixed ratio with no gearbox or clutch. The motor gives full torque from standstill and works across a wide speed range, so gears are not needed.'),
 ('What does a BMS do on an electric motorcycle?', 'It measures every cell group\'s voltage, the temperatures and the current, estimates state of charge, balances the cells and cuts the current if any limit is exceeded. It also tells the controller and charger how much current they may use.'),
 ('How efficient is an electric motorcycle?', 'About 80 per cent of the battery\'s energy reaches the rear wheel. A small petrol engine in town riding converts only about 12 to 20 per cent of its fuel energy into work.'),
 ('What is the difference between a hub motor and a mid-drive motor?', 'A hub motor is built into the wheel and needs no chain or belt. A mid-drive motor sits in the frame and drives the wheel through a chain, belt or gears, keeping weight off the wheel.'),
],
related=['motorcycle-wiring-basics', 'types-of-motorcycles', 'boda-boda-maintenance-checklist'],
))

# ---------------------------------------------------------------- 6
ARTICLES.append(dict(
slug='motorcycle-chain-maintenance',
title='Motorcycle chain maintenance: slack, wear, sprockets',
h1='Motorcycle chain maintenance',
desc='How to check motorcycle chain slack, measure wear over 10 or 20 links, inspect sprockets, adjust the rear axle and lubricate an O-ring chain.',
label='Maintenance',
lead='A roller chain is cheap, efficient and easy to service, but it wears quickly if it is left dry or badly adjusted. These checks take a few minutes and tell you when to adjust, when to lubricate and when to replace the chain and sprockets.',
summary='Measure slack and wear, read sprocket teeth, adjust the axle and lubricate an O-ring chain correctly.',
hero=dict(src=A+'renders/chain_sprockets.webp', w=1000, h=800, alt='Rendered motorcycle drive chain with gold outer plates running between a small front sprocket and a large rear sprocket with six bolt holes', cap='A final drive: front sprocket, chain and rear sprocket. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/chain_sprockets.webp',
body=f'''
<h2 id="how-a-chain-wears">How a chain wears</h2>
<p>A <a href="{OV}chain">roller chain</a> is built from alternating inner links and outer links. Each inner link has two plates pressed onto two bushings, with a roller turning on each bushing. Each outer link has two plates pressed onto two pins that pass through those bushings. The joint between pin and bushing is where the wear happens: as it wears, every link lengthens slightly and the chain appears to stretch. A stretched chain rides higher on the sprocket teeth and wears them to match its own pitch, which is why chain and sprockets are replaced together.</p>
<p>A plain chain is lubricated only by what you spray on it. An <strong>O-ring chain</strong> traps factory grease in each joint behind rubber rings, and an <strong>X-ring</strong> chain uses a ring with four smaller sealing lips to reduce friction. Sealed chains typically last two to three times as long as plain chains on road machines.</p>
<figure>
  <img src="{A}illustrations/transmission/F15.png" alt="Technical plate of a chain final drive: front and rear sprockets with the chain run, a section through an O-ring chain showing pin, bushing, roller, plates and O-rings, slack measured at the midpoint of the lower run, and a 20-link length measurement" width="2400" height="1632" loading="lazy">
  <figcaption>Chain final drive: O-ring chain section, slack measurement and 20-link wear length. Plate F15, Moto Zero Module 04.</figcaption>
</figure>

<h2 id="chain-sizes">Chain sizes</h2>
<p>The three-digit code on the side plates gives the pitch and roller width. The first digit is the pitch in eighths of an inch, and the last two are the roller width in eightieths of an inch. A 428 chain has a 12.70 mm (half-inch) pitch and is used on most 100 to 200 cc commuters. A 520 chain has a 15.875 mm pitch and is common from 250 to 700 cc and on most off-road machines; 525 and 530 chains are used on larger road bikes. The K-Light 125 uses a 428 chain with 134 links.</p>

<h2 id="slack">Check the slack</h2>
<ol>
  <li>Switch off the engine, select neutral and stand the motorcycle upright on level ground. Many manuals, including the K-Light 125's, specify upright rather than on the side stand.</li>
  <li>Turn the rear wheel slowly by hand and find the tightest point of the chain, because chains and sprockets wear unevenly.</li>
  <li>At that point, push the lower run up and down at its midpoint and measure the total movement with a steel rule. The K-Light 125 specifies 20 to 40 mm; check the figure for your machine.</li>
  <li>Check the slack at several points around the chain. If it varies by more than about 10 mm, the chain or sprockets are unevenly worn and adjustment will not correct it.</li>
</ol>
<div class="mz-art-note"><p>Never turn the wheel by pulling the chain with the engine running, and keep fingers away from the sprockets. A chain draws fingers into the sprocket faster than you can let go.</p></div>
<p>Too little slack is as harmful as too much. As the rear suspension compresses, the distance between the sprockets changes, and a tight chain then overloads the gearbox output bearing and the chain itself. A loose chain whips, wears the chain guides and can jump the sprocket teeth.</p>

<h2 id="wear">Measure the wear</h2>
<p>Slack tells you when to adjust; length tells you when to replace. Pull the chain taut and measure across 10 pitches, from the far side of one roller to the near side of the eleventh, or across 20 pitches. For a 12.70 mm pitch chain, the new 10-pitch length is 127.0 mm and the 20-pitch length is 254.0 mm. Most chain makers set the limit at about 1.5 to 2 per cent elongation, which is about 129 mm over 10 pitches or 258 to 259 mm over 20. Measure in two or three places and use the chain maker's own limit where you have it.</p>
<p>While you are there, look for stiff links that do not straighten as they leave the sprocket, cracked plates, missing rollers, rust and damaged O-rings. A chain with seized joints that cleaning and lubrication do not free needs replacing.</p>

<h2 id="sprockets">Read the sprockets</h2>
<p>A worn <a href="{OV}rear_sprocket">rear sprocket</a> shows hooked or pointed teeth leaning against the direction of rotation. The K-Light 125 manual calls for replacement when about a quarter of the tooth form has worn away. The small front sprocket wears fastest, because each of its teeth engages far more often. Check the rear sprocket nuts for tightness and the cush drive rubbers in the hub for cracks and free play.</p>
<figure>
  <img src="{A}renders/rear_sprocket.webp" alt="Rendered rear sprocket with evenly shaped teeth and six mounting holes around the centre" width="1000" height="800" loading="lazy">
  <figcaption>A rear sprocket with healthy, symmetrical teeth. Worn teeth become hooked on the driving side. Render: Transitions Lab, CC BY-SA 4.0.</figcaption>
</figure>

<h2 id="adjust">Adjust the chain</h2>
<ol>
  <li>Loosen the rear axle nut and the locknuts on the chain adjusters.</li>
  <li>Turn both adjusters by the same amount until the slack is within the specified range at the tightest point.</li>
  <li>Check that the marks on both swingarm adjusters show the same position, and sight along the chain from behind the rear sprocket to confirm it runs straight. A misaligned wheel wears the chain and sprockets quickly and affects handling.</li>
  <li>Tighten the axle nut to the specified torque (100 to 113 N·m on the K-Light 125), then the locknuts, and check the slack again; it often changes slightly as the nut tightens.</li>
  <li>On a drum-braked machine, moving the axle changes the rear brake adjustment, so recheck pedal free play afterwards.</li>
</ol>

<h2 id="lubricate">Clean and lubricate</h2>
<p>Clean the chain with a neutral chain cleaner and a soft brush. Do not use steam, petrol or strong solvents on an O-ring chain, because they swell or dissolve the rings. Dry it, then apply chain lubricant to the inside of the lower run where the plates overlap, so that the chain's own movement carries it into the joints, and wipe off the excess. Lubricate when the chain is warm after a ride, every 500 to 800 km, and after riding in rain.</p>
<p>Chain drive is not the only option. Toothed belts, common on electric motorcycles and some cruisers, need no lubrication, and shaft drives are sealed but heavier. Chapter 4.3 of the course, <a href="{L}m4-final-drive">Final drive and CVT</a>, compares them and includes the full job sheet. The <a href="../../repair/parts/#chain">chain page in the Repair section</a> collects chain and sprocket faults such as noise, jumping and tight spots.</p>
''',
cta=dict(label='Try it', h='See the final drive in 3D', p='Select the chain or the rear sprocket in the Overview to see the final drive turning, then check your knowledge with the Module 04 questions in the Quiz.', links=[(OV+'chain', 'Explore the chain', True), ('../../quiz/', 'Take the quiz', False), (L+'m4-final-drive', 'Read chapter 4.3', False), ('../../repair/parts/#chain', 'Chain repairs', False)]),
faq=[
 ('How much slack should a motorcycle chain have?', 'Use the figure in your owner\'s manual. Many commuter motorcycles, including the K-Light 125, specify 20 to 40 mm of total up-and-down movement at the midpoint of the lower run, measured at the tightest point.'),
 ('How do I know when to replace my chain?', 'Measure the length over 10 or 20 pitches. For a 12.70 mm pitch chain, replace it when 10 pitches measure about 129 mm or 20 pitches about 258 to 259 mm, or at the chain maker\'s limit.'),
 ('Should I replace the sprockets with the chain?', 'Yes. A worn chain wears the sprockets to its own pitch, and a new chain on worn sprockets wears out quickly. Replace the chain and both sprockets together.'),
 ('How often should I lubricate my motorcycle chain?', 'Every 500 to 800 km and after riding in rain, ideally when the chain is warm after a ride.'),
],
related=['boda-boda-maintenance-checklist', 'how-a-motorcycle-clutch-works', 'how-electric-motorcycles-work'],
))
