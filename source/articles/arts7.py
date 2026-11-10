from arts6 import A, OV, L, R, RP, fig, ARTICLES
from links import EN, WL, CB, MD, QZ, EQ, BUILD, COCKPIT, VID, REP, PRB, PRT, OM, try_box, lfig, deeper

NEW = '2026-11-07'

# ---------------------------------------------------------------- 17
ARTICLES.append(dict(
slug='how-a-motorcycle-gearbox-works',
date=NEW,
title='How a motorcycle gearbox works: dogs, shift drum and ratios',
h1='How a motorcycle gearbox works',
desc='How a sequential motorcycle gearbox works: constant-mesh gears, dogs, the shift drum and forks, why neutral sits between first and second, and gear ratios.',
label='Drivetrain',
lead='A motorcycle gearbox keeps every gear in mesh all the time and locks one pair at a time to its shaft with sliding dogs. A rotating shift drum moves those dogs, one step for each press of the pedal, which is why a motorcycle box is sequential and why neutral sits half a step between first and second.',
summary='Constant-mesh gears, dogs, shift drum and forks, the neutral half-step, quickshifters and how ratios set road speed.',
hero=dict(src=A+'illustrations/transmission/F14.png', w=2400, h=1477, alt='Technical plate of a constant-mesh five-speed motorcycle gearbox showing mainshaft and countershaft, fixed, free and sliding gears, dogs and slots, three shift forks and the shift drum', cap='A constant-mesh five-speed gearbox: two shafts, gears that are always in mesh, dogs, forks and the shift drum. Plate F14, Motopedia Module 5.'),
thumb=A+'illustrations/transmission/F14.png',
body=f'''
<h2 id="why">Why a motorcycle needs a gearbox</h2>
<p>An engine only produces useful torque over a limited band of speed. The K-Light 125 commuter, the worked example used throughout the Motopedia course, makes its peak torque of 8.9 N·m at 7,500 rpm and its peak power of 7.8 kW at 9,000 rpm, and it runs out of breath not far beyond. The gearbox chooses a ratio that keeps the engine inside that band from walking pace to top speed, and it multiplies torque at low road speed so the machine can pull away on a hill with a passenger.</p>
<p>Five or six ratios are normal on road motorcycles. Motocross bikes use five closely spaced ratios, trials bikes have six with a very low first gear, and twist-and-go scooters use a continuously variable transmission instead.</p>

<h2 id="constant-mesh">Constant mesh: every gear is always turning</h2>
<p>Almost every motorcycle gearbox is a <strong>constant-mesh, two-shaft, sequential</strong> type built into the crankcase and lubricated by the engine oil. The <strong>mainshaft</strong> (input shaft) carries the clutch and receives power from it. The <strong>countershaft</strong> (output shaft) lies parallel to it and carries the gearbox sprocket on its outer end. Each gear on one shaft is permanently meshed with a partner on the other; what changes from gear to gear is which pair is locked to its shaft.</p>
<p>On each shaft there are three kinds of gear:</p>
<ul>
  <li><strong>Fixed gears</strong> are machined as part of the shaft or pressed on, and always turn with it.</li>
  <li><strong>Free gears</strong> spin on a bush or needle bearing and do nothing until something locks them to the shaft.</li>
  <li><strong>Sliding gears</strong> are splined to the shaft, so they always turn with it, but can move along it. Their faces carry <strong>dogs</strong>, short projecting lugs that drop into slots in the face of the neighbouring free gear.</li>
</ul>
<p>When a sliding gear moves across and its dogs engage a free gear, that free gear is locked to the shaft and its pair carries the drive. All the other pairs simply idle.</p>
{try_box(EN+"gearbox", "engine/shots/02-gearbox-function-colours.webp", "3D engine view of the five-speed gearbox in function colours: sliding gears red, free gears blue, fixed gears orange", "Shift through the gears in 3D.", "The gearbox view in Under the Engine colours each gear by its job: red gears slide on splines, blue gears spin free and orange gears are fixed. Step through 1, N, 2, 3, 4 and 5 and watch which pair locks.", "Open the gearbox view")}
<p>There is no synchromesh: the dogs engage abruptly, so the rider unloads them for a moment with the clutch or a short throttle lift to let them slide in or out cleanly.</p>

<h2 id="dogs">Dogs, and why gears jump out</h2>
<p>The dogs carry the full torque of the gear across a few square millimetres of contact. Road gearboxes commonly use three to six dogs per face, with their driving faces <strong>back-cut</strong> by 2 to 4 degrees so that the drive torque pulls the two gears together. As the edges wear and round off, the back-cut is lost and the force reverses: under load, the gears are pushed apart. Rounded dogs are the root cause of almost every case of a gearbox <strong>jumping out of gear</strong>, and the K-Light 125 manual lists dog edges worn to round corners as the first cause.</p>
<p>Dogs are always replaced in pairs, the sliding gear together with its free partner, because a new gear running against a rounded one soon wears to the same shape.</p>

<h2 id="shift-drum">The shift drum and forks</h2>
{lfig(EN+"shift", "illustrations/transmission/TR01.png", "Technical plate of a motorcycle gear shift mechanism: shift drum with cam tracks, forks, gearshift shaft, ratchet pawls, star detent, stopper arm and neutral switch", "The gear shift mechanism, from the pedal shaft and ratchet to the drum, forks, star detent and neutral switch. Plate TR01, Motopedia Module 5.", "See the drum turn in Under the Engine.")}
<p>The <strong>shift drum</strong> is a cylinder with grooves machined around it. Each <strong>shift fork</strong> has a guide pin that runs in one groove and two prongs that sit in a groove on a sliding gear. As the drum turns, each groove moves its fork, and so its sliding gear, sideways by a set amount at the right moment. The angle of the drum defines the gear.</p>
<p>The gear pedal is splined to a <strong>gearshift shaft</strong> that runs through the crankcase. Inside, a shift arm with spring-loaded pawls catches pins on the end of the drum, so each stroke of the pedal turns the drum by one step, and a return spring brings the pedal back to centre for the next stroke. This is what makes the box <strong>sequential</strong>: each press can only move one gear up or down.</p>
<p>Between shifts the drum is held by a <strong>stopper arm</strong>, a spring-loaded roller that sits in the notches of a star-shaped plate on the drum. The notch profile pulls the drum fully into position at the end of each shift, so a half-finished pedal movement either completes or falls back.</p>

<h2 id="neutral">Why neutral sits between first and second</h2>
<p>On a typical pattern of one down and the rest up, neutral is a <strong>half-step</strong> between first and second. That is why the pedal moves only half as far from first to neutral, and why a hurried shift from first to second can stop in neutral. A <strong>neutral switch</strong> in the crankcase is earthed by a contact on the drum in neutral; it lights the green lamp and, on bikes with starter interlocks, lets the starter turn with the clutch engaged.</p>
{try_box(EN+"shift", "engine/shots/04-shift-drum-star-detent.webp", "3D engine view of the shift drum, forks and star detent with the stopper arm", "Watch the detent hold the drum.", "The shift view in Under the Engine isolates the drum, forks and star detent, so you can see the half-step for neutral and how the stopper roller seats in each notch.", "Open the shift drum view")}

<h2 id="quickshifters">Quickshifters</h2>
<p>A <strong>quickshifter</strong> allows full-throttle upshifts without the clutch. A sensor in the gear linkage detects pressure on the pedal, and the engine management cuts ignition or injection for a very short time, typically about 80 to 100 ms at low engine speed and about 50 ms near the limiter. That brief loss of drive unloads the dogs so the drum can complete the shift.</p>

<h2 id="ratios">Gear ratios and road speed</h2>
<p>Each gear ratio is the tooth count of the driven gear divided by that of the driving gear. Power passes through three stages in series, the primary drive from crank to clutch, the gearbox and the chain final drive, so the ratios multiply to give the <strong>overall ratio</strong>. Engine speed divided by the overall ratio gives wheel speed, and wheel speed multiplied by the rolling circumference of the rear tyre gives road speed.</p>
<p>Chapter 5.2 of the course works the method with ratios typical of an air-cooled 125 cc single, since the K-Light manual gives only its 41-tooth rear sprocket: a primary ratio of 3.400, a final drive of 41/14 (2.929), a first gear of 2.750 and a fifth of 0.900. With those figures fifth gear has an overall ratio of 8.96, and at 9,000 rpm the bike would do about 113 km/h. The manual quotes a top speed of 90 km/h, so in practice the engine never reaches its power peak in fifth. That is deliberate on a commuter: a tall top gear lowers cruising revs, noise and fuel use.</p>
<p>The <a href="{EQ}">equations summary</a> collects the gear, overall ratio and road-speed formulas.</p>
{try_box(COCKPIT, "renders/instruments_analogue.webp", "Rendered twin analogue instruments with speedometer and rev counter", "Change gear in the Cockpit.", "Ride the four-stroke in the Cockpit, change up through the box and watch the revs drop at each shift and the road speed rise.", "Open the Cockpit")}

<h2 id="faults">Common gearbox faults</h2>
<div class="mz-art-table"><table>
  <thead><tr><th>Symptom</th><th>Likely cause</th><th>First check</th></tr></thead>
  <tbody>
    <tr><td>Jumps out of one gear under load</td><td>Rounded dogs on that pair, worn or bent fork, worn drum groove</td><td>Dog edges; fork prong thickness (K-Light limit 4.7 mm); drum groove width (limit 7.3 mm)</td></tr>
    <tr><td>Hard shifting, stiff pedal</td><td>Clutch not fully releasing, bent gearshift shaft, seized fork</td><td>Clutch free play and release first</td></tr>
    <tr><td>Pedal does not return</td><td>Broken or unhooked return spring</td><td>Remove the clutch cover and watch the spring</td></tr>
    <tr><td>False neutrals between gears</td><td>Short pedal travel, worn detent plate or stopper roller</td><td>Linkage free play, pedal height, detent notches</td></tr>
    <tr><td>Whine in one gear only</td><td>Pitted or chipped teeth on that pair</td><td>Inspect the teeth when the cases are split</td></tr>
  </tbody>
</table></div>
<div class="mz-art-note"><p>Many shifting complaints are really clutch complaints. Before splitting the crankcase, confirm that the clutch releases fully, that the oil is the right grade and level, and that the external linkage moves freely. The K-Light 125 manual lists a clutch that does not fully disengage as the first cause of difficult shifting.</p></div>
<p>Our guide to <a href="../how-a-motorcycle-clutch-works/">how a motorcycle clutch works</a> covers drag and free play, the most common reasons for a box that is hard to shift.</p>

{deeper([
  (L+"m4-gearbox", "Chapter 5.2: Gearbox", "the full selector mechanism, worked ratio table and fault chart"),
  (EQ, "Equations summary", "gear ratio, overall ratio, road speed and gear step"),
  (OM("4t", "gearbox"), "The gearbox in the 3D Overview", "where it sits behind the clutch"),
  (QZ+"drivetrain-chassis", "Drivetrain and chassis quiz", "test yourself on Module 5"),
  (PRB+"jumps-out-of-gear/", "Jumps out of gear", "causes and checks"),
  (PRB+"false-neutral/", "False neutrals", ""),
  (REP+"gearshift-check/", "Gearshift mechanism check", ""),
  (REP+"shift-drum-inspect/", "Shift drum inspection", "measuring forks and grooves"),
  (PRT+"gearbox/", "Gearbox parts", "every gearbox fault and repair in one list"),
 ])}
''',
cta=dict(label='Try it', h='Shift the gearbox yourself', p='Under the Engine lets you step through every gear and watch the drum, forks and dogs move. Then ride the bike in the Cockpit and feel what each ratio does to the revs.', links=[(EN+'gearbox', 'Open the gearbox view', True), (EN+'shift', 'See the shift drum', False), (COCKPIT, 'Open the Cockpit', False), (L+'m4-gearbox', 'Read chapter 5.2', False)]),
faq=[
 ('Why is neutral between first and second on a motorcycle?', 'The shift drum has a half-step between first and second, and the neutral position sits there. It keeps first gear at the end of the pattern where a downward press always finds it, and it is why a hurried shift from first to second can stop in neutral.'),
 ('Why can I not skip gears on a motorcycle?', 'Each press of the pedal turns the shift drum by one step through a ratchet, so the box is sequential. To go from fifth to second you press the pedal three times, passing through fourth and third.'),
 ('What causes a motorcycle to jump out of gear?', 'Almost always worn dogs: once their back-cut edges round off, the drive torque pushes the gears apart instead of pulling them together. A worn or bent fork, a worn drum groove or a weak stopper spring can add to it. The worn gears are replaced in pairs.'),
 ('Do I need the clutch to change up a gear?', 'The dogs must be unloaded for a moment to slide out and in. A clutch pull does this, and so does a quick throttle lift. A quickshifter does the same job electronically by cutting ignition or injection for a few tens of milliseconds.'),
],
related=['how-a-motorcycle-clutch-works', 'motorcycle-chain-maintenance', 'how-a-motorcycle-engine-works'],
))

# ---------------------------------------------------------------- 18
ARTICLES.append(dict(
slug='how-motorcycle-brakes-work',
date=NEW,
title='How motorcycle brakes work: discs, drums, CBS and ABS',
h1='How motorcycle brakes work',
desc='How motorcycle brakes turn speed into heat: drum and disc brakes, hydraulic force multiplication, brake fluid, combined braking (CBS), ABS and brake fade.',
label='Chassis',
lead='A brake turns the kinetic energy of the moving motorcycle into heat. Drum brakes do it with shoes pressed outwards inside the hub, and disc brakes with pads clamped onto a spinning disc by hydraulic pressure. Combined braking and ABS then help the rider use that grip without locking a wheel.',
summary='Drum and disc brakes, hydraulic force multiplication, fluid and fade, combined braking and ABS.',
hero=dict(src=A+'renders/brake.webp', w=1000, h=800, alt='Rendered floating front brake disc gripped by a four-piston radial-mount caliper', cap='A floating disc with a four-piston radial-mount caliper. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/brake.webp',
body=f'''
<h2 id="energy">Braking is turning speed into heat</h2>
<p>A moving motorcycle carries kinetic energy, and the brakes must turn all of it into heat. The energy rises with the square of speed, so doubling your speed quadruples the heat the brakes have to absorb. The course works this through for a K-Light 125 commuter (145 kg) with an 80 kg rider stopping from 90 km/h: about 70 kJ of energy has to go somewhere in a few seconds.</p>
<p>In a hard stop the front brake does roughly 70 per cent of the work, because weight transfers forwards onto the front tyre. If most of that heat goes into a 0.9 kg steel disc before it can escape, the disc warms by about 100 K in a single stop. Repeated stops from high speed, or a long mountain descent, take discs to 300 to 400 °C and push heat into the calipers and fluid. That is why pad compound and brake fluid boiling point matter so much.</p>

<h2 id="drums">Drum brakes</h2>
<p>A <strong>drum brake</strong> has two curved shoes with bonded linings mounted on a backplate. Each shoe pivots on an anchor pin at one end; at the other, a flat cam turned by a cable or rod pushes the shoes apart against the inside of the drum, which is part of the wheel hub, and return springs pull them back when you let go.</p>
<p>In a <strong>single leading shoe</strong> brake, the leading shoe faces the direction of rotation, so friction drags it harder into the drum. This self-servo effect means that one shoe does roughly two-thirds of the braking. A <strong>twin leading shoe</strong> brake has two cams so that both shoes self-servo, which gives much stronger forward braking; it was fitted to sporting machines until discs replaced it in the 1970s. Drums are enclosed, cheap and resist water and mud, so the rear brake of many commuters and step-throughs is still a drum. Their weakness is heat: the drum expands away from the shoes as it gets hot, and the brake fades.</p>
{lfig(OM("4t", "brake"), "illustrations/chassis/F19.png", "Technical plate of a hydraulic disc brake system with master cylinder, reservoir, hose and caliper section, beside a leading and trailing shoe drum brake", "A hydraulic disc brake beside a leading and trailing shoe drum brake. Plate F19, Motopedia Module 5.", "Select the front brake in the Overview.")}

<h2 id="hydraulics">How a hydraulic disc brake multiplies force</h2>
<p>A disc brake clamps a pair of pads onto a disc that turns with the wheel. The force comes from hydraulics. Pressure in a confined fluid is equal everywhere, so a small piston in the <strong>master cylinder</strong> at the lever creates the same pressure on the much larger pistons in the <strong>caliper</strong>. Force is multiplied in the ratio of their areas, and the lever multiplies it again.</p>
<p>Chapter 5.7 of the course gives a worked example: an 11 mm master cylinder, a lever ratio of 4:1, a 100 N squeeze and a floating caliper with two 27 mm pistons acting on a 280 mm disc, the size fitted to the K-Light 125. The hydraulic ratio is about 12 and the total ratio from hand to pads about 48:1, giving a clamp force of around 4,800 N and, from the front brake alone, a deceleration of about 0.7 g.</p>
<p>The price of multiplication is movement. The master cylinder has to push twelve times the volume of fluid that the pads take up, so a larger master cylinder gives a harder, less powerful lever and a smaller one a softer, more powerful lever with more travel. As the pads wear, the caliper pistons simply slide further out through their square-section seals, so a disc brake adjusts itself.</p>
{try_box(OM("4t", "brake"), "renders/bike_classic_4t__brake.webp", "The front brake highlighted on the rendered classic four-stroke roadster", "Select the brake on a bike.", "Select the front brake in the 3D Overview for the disc, caliper, pads and hose, with notes on what wears and how it is checked.", "Select the front brake")}

<h2 id="calipers-pads">Calipers, discs and pads</h2>
<ul>
  <li><strong>Floating (sliding) calipers</strong> have pistons on one side only; the body slides on greased pins so the reaction pulls the outer pad onto the disc. They are light and cheap and fitted to most small machines, including the K-Light 125. Seized slide pins cause uneven pad wear and drag.</li>
  <li><strong>Fixed (opposed-piston) calipers</strong> have two, four or six pistons on both sides of a rigid body, giving more even pad pressure and higher stiffness. A <strong>radial mount</strong> bolts the caliper on in a stiffer direction so it flexes less under hard braking.</li>
  <li><strong>Floating discs</strong> ride on bobbins so the friction ring can expand with heat without warping.</li>
  <li><strong>Organic pads</strong> are quiet, kind to discs and bite well when cold, but fade at high temperature and wear quickly. <strong>Sintered pads</strong> work well wet and hot and last longer, but wear discs faster and must only be used on discs approved for them.</li>
</ul>
<p>Our guide to <a href="../how-to-check-motorcycle-brake-pads/">checking brake pads and discs</a> gives the K-Light wear limits: 3 mm of pad friction material and a front disc thickness of 3.0 mm.</p>

<h2 id="fluid-fade">Brake fluid and brake fade</h2>
<p>Most brake fluids (DOT 3, DOT 4 and DOT 5.1) are glycol-based and <strong>hygroscopic</strong>: they absorb water from the air through the seals and reservoir vent, and their boiling point falls sharply as they do. DOT 4, the fluid the K-Light uses, must boil no lower than 230 °C when new but only 155 °C once it has absorbed 3.7 per cent water. Silicone DOT 5 must never be mixed with the glycol fluids.</p>
<p><strong>Fade</strong> is the loss of braking as the system overheats, and it comes in two kinds. Pad fade happens when the friction material passes its working temperature and the lever stays firm but the bike stops slowing. Fluid fade happens when old, wet fluid boils in a hot caliper: vapour bubbles compress, and the lever can suddenly travel to the bar. Replacing glycol fluid every two years, the usual maker's interval, is the cheapest protection against it.</p>

<h2 id="cbs">Combined braking (CBS)</h2>
<p>A <strong>combined braking system</strong> applies both brakes from one control, so a rider who uses only the rear pedal, which is common on commuters, still gets some front braking. On the K-Light 125 the system is hydraulic: the rear pedal feeds the rear caliper and, through a small secondary master cylinder called the CBS pump, one piston circuit of the front caliper. The handlebar lever works the front brake alone. Many scooters use a mechanical CBS instead, with an equaliser link on the left lever that pulls both brake cables.</p>

<h2 id="abs">ABS: stopping without locking a wheel</h2>
<p>An <strong>anti-lock braking system</strong> watches each wheel through a speed sensor reading a toothed tone ring on the hub or disc carrier. When the ECU sees a wheel slowing much faster than the motorcycle, it closes a valve in the hydraulic modulator to hold the pressure, opens another to release a little fluid, and a pump returns that fluid, cycling several times a second until the tyre grips again. The rider feels it as pulsing at the lever. BMW offered the first production motorcycle ABS on the K100 in 1988. <strong>Cornering ABS</strong> adds an inertial measurement unit that measures lean angle, so the system builds pressure more gently when the bike is leaned over.</p>
<p>Rules now require these systems on new machines. In the European Union, motorcycles above 125 cc must have ABS, and 125 cc models must have ABS or CBS. India requires ABS above 125 cc and CBS or ABS at or below 125 cc on all new two-wheelers from April 2019. When an ABS warning light stays on, the usual causes are a damaged tone ring, a sensor gap out of specification, a dirty sensor, mismatched tyre sizes or low battery voltage.</p>

{deeper([
  (L+"m4-brakes", "Chapter 5.7: Brakes", "energy, hydraulics, CBS, ABS and the job sheets"),
  (EQ, "Equations summary", "kinetic energy, disc temperature, line pressure, clamp force and brake torque"),
  (MD+"brake", "3D model: disc brake with radial caliper", "turn it round in the model library"),
  (QZ+"drivetrain-chassis", "Drivetrain and chassis quiz", "test yourself on Module 5"),
  (REP+"brake-bleed/", "Bleeding a hydraulic brake", ""),
  (REP+"brake-fluid-check/", "Brake fluid check", ""),
  (REP+"cbs-check/", "Combined brake check", ""),
  (PRB+"brake-fade/", "Brakes fade when hot", ""),
  (PRB+"abs-light/", "ABS warning light on", ""),
 ])}
''',
cta=dict(label='Try it', h='Look inside the brakes', p='Select the front and rear brakes in the 3D Overview, turn the disc and caliper model round in the library, and then work through the brakes chapter with its worked hydraulic example.', links=[(OM('4t', 'brake'), 'Select the front brake', True), (MD+'brake', 'Open the brake model', False), (L+'m4-brakes', 'Read chapter 5.7', False), (PRT+'brake/', 'Brake faults', False)]),
faq=[
 ('What is the difference between disc and drum brakes on a motorcycle?', 'A drum brake pushes two shoes outwards against the inside of a drum in the wheel hub; a disc brake clamps pads onto a disc using hydraulic pressure. Discs shed heat better and fade less, while drums are cheap, enclosed and still common on the rear of commuters.'),
 ('What is brake fade?', 'Fade is a loss of braking as the brakes overheat. Pads can pass their working temperature, a drum can expand away from its shoes, and old brake fluid can boil so that the lever goes soft. Fresh fluid and the right pads reduce it.'),
 ('How often should motorcycle brake fluid be changed?', 'Glycol fluids such as DOT 4 absorb water and lose boiling point over time, so the usual interval is every two years. Never reuse fluid or use fluid from a container that has stood open for a long time.'),
 ('What is CBS on a motorcycle?', 'A combined braking system works both brakes from one control. On the K-Light 125 the rear pedal also operates part of the front caliper through a small CBS pump, so a rider who uses only the pedal still gets front braking.'),
 ('How does motorcycle ABS work?', 'Wheel speed sensors tell the ECU when a wheel is about to lock. The ABS modulator then holds and releases brake pressure several times a second until the tyre grips again, which the rider feels as pulsing at the lever.'),
],
related=['how-to-check-motorcycle-brake-pads', 'how-motorcycle-suspension-works', 'motorcycle-tyre-pressure-and-wear'],
))

# ---------------------------------------------------------------- 19
ARTICLES.append(dict(
slug='how-motorcycle-suspension-works',
date=NEW,
title='How motorcycle suspension works: forks, shocks and sag',
h1='How motorcycle suspension works',
desc='How motorcycle suspension works: springs, preload and damping, damper-rod, cartridge and upside-down forks, twin shocks and monoshocks, and how to set sag.',
label='Chassis',
lead='Motorcycle suspension does two jobs at once: springs carry the weight of the bike and rider and soak up bumps, and dampers control how fast the springs move so the tyres stay pressed onto the road. Setting the sag is the one adjustment every owner can make.',
summary='Springs, preload and damping, fork types, twin shocks and monoshocks, and how to measure and set sag.',
hero=dict(src=A+'renders/forks_usd.webp', w=1000, h=800, alt='Rendered upside-down front fork with large outer tubes clamped in the yokes and slim stanchions carrying the axle', cap='An upside-down (inverted) front fork: the large tubes sit in the yokes and the slim stanchions carry the wheel. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/forks_usd.webp',
body=f'''
<h2 id="jobs">What suspension is for</h2>
<p>A tyre can only steer, drive and brake while it is pressed onto the road. Suspension lets the wheel follow bumps while the rest of the motorcycle travels more smoothly above them. Engineers split the machine into two parts. The <strong>sprung mass</strong> is everything carried by the springs: frame, engine, fuel and rider. The <strong>unsprung mass</strong> is everything that moves with the wheel: the wheel and tyre, brake disc and caliper, the fork lower legs and part of the swingarm, shock and chain.</p>
<p>The lighter the unsprung mass compared with the sprung mass, the less a bump disturbs the chassis and the faster the tyre can follow the surface. That is why sports machines use cast aluminium wheels, light discs and upside-down forks.</p>

<h2 id="springs">Springs and preload</h2>
<p>The spring holds the bike up and stores the energy of each bump. Its <strong>spring rate</strong> is the force needed to compress it by one millimetre, in N/mm, so the force it gives is the rate multiplied by how far it is compressed.</p>
<p><strong>Preload</strong> is compression put into the spring before the suspension moves at all, set by a threaded collar, a stepped cam ring on many twin shocks, or a spacer under the fork cap. Preload does <strong>not</strong> make the spring stiffer. It changes the load at which the suspension starts to move, and so the ride height and the sag. A heavier rider or a passenger needs more preload to restore the sag; if the right sag cannot be reached within the adjuster's range, the spring rate itself is wrong. Progressive fork springs have closely wound coils that close up early, so their rate rises with travel.</p>
{lfig(OM("4t", "forks"), "illustrations/chassis/F18.png", "Technical plate of a cutaway damper-rod fork with spring, damper rod, oil level, bushings and seals, a rear monoshock with rising-rate linkage, a twin shock and sag measurement points", "A damper-rod fork in section, a linkage monoshock, a twin shock and the points used to measure sag. Plate F18, Motopedia Module 5.", "Select the forks in the Overview.")}

<h2 id="damping">Damping: controlling the spring</h2>
<p>A spring on its own would let the bike bounce at its natural frequency, about 1 to 2 times a second for the sprung mass. The <strong>damper</strong> stops this by forcing oil through small passages, turning motion into heat. <strong>Compression damping</strong> resists the wheel moving up into a bump; <strong>rebound damping</strong> resists the spring pushing it back down, and is normally the stronger of the two, because the spring has stored energy that must be released in a controlled way.</p>
<p>Too little rebound damping gives a pogo or wallowing ride. Too much makes the suspension <strong>pack down</strong>: it cannot extend fully before the next bump, so it loses travel and grip over a series of bumps.</p>
<p>The simplest dampers push oil through fixed holes. Their resistance rises with the square of speed, so they are soft over gentle undulations and harsh on sharp edges. Better dampers use <strong>shim stacks</strong>, thin spring-steel washers over ports in a piston that bend open as pressure rises, which lets the maker shape the damping curve. Clickers on adjustable suspension usually vary a small bleed passage alongside the shims.</p>

<h2 id="forks">Types of front fork</h2>
<ul>
  <li><strong>Damper-rod forks</strong> have a tube with holes bolted to the bottom of the slider; oil is metered through the holes. They are simple and cheap, and fitted to the K-Light 125 and most commuters.</li>
  <li><strong>Cartridge forks</strong> use a sealed inner tube with shim-stacked compression and rebound pistons, giving much better control and adjustment. Many modern designs put the damping in one leg and the spring in the other.</li>
  <li><strong>Upside-down (inverted) forks</strong> clamp the large tube at the top and put the slim tube at the bottom. This is stiffer where the bending load is highest and lowers unsprung mass, but leaves the seals exposed to stones and dirt.</li>
</ul>
<p>Fork oil does the damping, so its viscosity and level set the fork's behaviour. The K-Light 125 manual specifies 46# shock absorber oil at 285 ± 2 ml per leg. The air gap above the oil acts as a progressive air spring at the end of travel, so a higher level resists bottoming more. Milky fork oil means water has got in past failed seals.</p>
{try_box(OM("4t", "forks"), "renders/bike_classic_4t__forks.webp", "The front forks highlighted on the rendered classic four-stroke roadster", "Compare the forks.", "Select the forks in the 3D Overview, then switch to the motocross bike to compare a conventional fork with an upside-down one.", "Select the forks")}

<h2 id="rear">Rear suspension: twin shocks and monoshocks</h2>
<p><strong>Twin shocks</strong> run from the swingarm near the axle up to the frame rails. They are simple and cheap, and the shock moves almost in step with the wheel. The K-Light 125 uses twin shocks with adjustable preload. A <strong>monoshock</strong> uses a single shock on the centreline, mounted either straight to the swingarm or through a <strong>linkage</strong> of rocker and pull rod.</p>
<p>A linkage gives a <strong>rising rate</strong>: the shock moves little for each millimetre of wheel travel near full extension and more near full compression. The rear is soft over small bumps and still resists bottoming on large ones. Because the wheel moves two to three times as far as the shock, the shock spring is several times stiffer than the rate felt at the wheel.</p>
{try_box(MD+"rear_shock", "renders/rear_shock.webp", "Rendered monoshock with spring, preload collar, damper body and piggyback reservoir", "Turn a monoshock round.", "The 3D model library has a monoshock with piggyback reservoir, a pair of classic twin shocks, both fork types and the swingarm.", "Open the shock model")}

<h2 id="sag">Sag: the one setting to get right</h2>
<p><strong>Sag</strong> is how far the suspension compresses from fully extended under load. <strong>Static sag</strong> is with the bike alone on its wheels; <strong>rider sag</strong> is with you sitting in your normal riding position. Course figures for a road or commuter bike are a front rider sag of 25 to 35 per cent of travel and a rear rider sag of 25 to 33 per cent, with 5 to 15 mm of rear static sag.</p>
<ol>
  <li>Lift the rear until the wheel is just off the ground and measure from the axle to a fixed point on the frame or bodywork directly above it.</li>
  <li>Put the bike on its wheels, bounce it gently and measure again: the difference is static sag.</li>
  <li>Sit on the bike in your riding gear, feet on the pegs, with a helper steadying it, and measure a third time: the difference from fully extended is rider sag.</li>
  <li>Adjust preload until rider sag is in range, then check static sag.</li>
</ol>
<p>Static sag tells you whether the spring is right. With correct rider sag, very little static sag means the spring is too soft and has been preloaded hard to compensate; too much static sag means it is too stiff.</p>
<div class="mz-art-note"><p>Many rear shocks hold nitrogen at 1 to 2 MPa behind a floating piston. Never heat, puncture or dismantle a gas shock without first releasing the gas as the maker directs. Most small-bike shocks are sealed and replaced as a unit.</p></div>

<h2 id="checks">Simple suspension checks</h2>
<p>Push down hard on the seat and let go: a healthy rear should rise once and settle, not bounce. Look for oil on the shock shaft and fork stanchions, which means a seal has failed, and for a bent shock shaft or worn mounting bushes. Linkage bearings on monoshock bikes need grease every 10,000 to 20,000 km on the road and much more often off-road; a seized linkage makes the rear harsh and wears the shock. Worn steering head bearings also upset the front end, and our article on <a href="../motorcycle-tyre-pressure-and-wear/">tyre pressure and wear</a> explains how pressure changes the way the suspension feels.</p>

{deeper([
  (L+"m4-suspension", "Chapter 5.5: Suspension", "spring force, damping, fork types and the sag and fork-oil job sheets"),
  (L+"m4-frame-steering", "Chapter 5.4: Frame and steering geometry", "rake, trail and steering bearings"),
  (EQ, "Equations summary", "spring force, sag and wheel rate"),
  (QZ+"drivetrain-chassis", "Drivetrain and chassis quiz", "test yourself on Module 5"),
  (REP+"sag-measure/", "Measuring sag", ""),
  (REP+"fork-oil-level-set/", "Setting fork oil level", ""),
  (REP+"fork-oil-seals/", "Fork oil seal replacement", ""),
  (REP+"rear-shock-check/", "Rear shock check", ""),
  (PRB+"fork-leak/", "Fork leaking oil", ""),
  (PRB+"rear-sagging/", "Rear sags too far", ""),
 ])}
''',
cta=dict(label='Try it', h='See the suspension in 3D', p='Select the forks and rear shocks in the 3D Overview, compare fork and shock types in the model library, and try a different frame and suspension in the Bike builder.', links=[(OM('4t', 'forks'), 'Select the forks', True), (OM('4t', 'rear_shock'), 'Select the rear shocks', False), (BUILD, 'Open the Bike builder', False), (L+'m4-suspension', 'Read chapter 5.5', False)]),
faq=[
 ('What is sag on a motorcycle?', 'Sag is how far the suspension compresses from fully extended under load. Static sag is with the bike alone and rider sag is with you on board. A road bike typically runs a rider sag of about a quarter to a third of its travel.'),
 ('Does adding preload make the suspension stiffer?', 'No. Preload changes the load at which the spring starts to compress, so it changes ride height and sag, but the spring rate stays the same. If you cannot reach the right sag with the adjuster, you need a different spring.'),
 ('What does rebound damping do?', 'Rebound damping slows the spring as it pushes the wheel back down after a bump. Too little and the bike bounces or wallows; too much and the suspension packs down over a series of bumps and loses grip.'),
 ('What is the difference between a conventional and an upside-down fork?', 'A conventional fork has the slim tubes at the top in the yokes and the large sliders at the bottom. An upside-down fork reverses this, which is stiffer and lowers unsprung mass, but leaves the seals more exposed to dirt.'),
 ('Why is my fork oil milky?', 'Milky fork oil means water has got in, usually past worn or damaged fork seals. Replace the seals and the oil, filling each leg to the volume or level in the manual.'),
],
related=['how-motorcycle-brakes-work', 'motorcycle-tyre-pressure-and-wear', 'types-of-motorcycles'],
))

# ---------------------------------------------------------------- 20
ARTICLES.append(dict(
slug='carburettor-vs-fuel-injection',
date=NEW,
title='Carburettor or fuel injection: motorcycle fuel systems',
h1='Carburettor or fuel injection: how motorcycle fuel systems work',
desc='How motorcycle carburettors and electronic fuel injection meter fuel, why injection replaced the carburettor, and what each means for starting, emissions and repair.',
label='Fuel systems',
lead='Every petrol engine needs the right amount of fuel for the air it breathes. A carburettor uses the suction of the air rushing through it to draw fuel through calibrated jets; fuel injection uses sensors and a small computer to open an electric valve for exactly the right time. Here is how each works and why injection has taken over.',
summary='How a carburettor and EFI meter fuel, why injection took over, and what each means for starting, emissions and repair.',
hero=dict(src=A+'renders/carb.webp', w=1000, h=800, alt='Rendered motorcycle slide carburettor in half section showing the slide, needle, jets and float bowl', cap='A slide carburettor in half section: the slide and needle above, the jets and float bowl below. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/carb.webp',
body=f'''
<h2 id="the-job">The job both systems do</h2>
<p>Petrol burns completely with air at a ratio of about 14.7 kg of air to 1 kg of fuel, which engineers call a lambda of 1. A cold engine needs a richer mixture to start, full throttle runs slightly rich to make power and protect the valves, and a modern catalytic converter only works well when the mixture is held very close to lambda 1. A fuel system therefore has to measure the air the engine is taking in and add fuel in proportion, from idle to full throttle, hot or cold, at sea level or on a mountain.</p>

<h2 id="carburettor">How a carburettor meters fuel</h2>
<p>A carburettor uses the pressure drop of air speeding up through a narrow passage. As air rushes through the <strong>venturi</strong> or under the throttle slide, its pressure falls. A fuel nozzle opens into that low-pressure zone, while the <strong>float bowl</strong> underneath is vented to the atmosphere, so atmospheric pressure pushes fuel up through calibrated <strong>jets</strong> into the airstream, where it breaks into droplets and evaporates.</p>
<p>Air and fuel do not respond to suction in the same way, so a single jet would give a mixture that richens as airflow rises. A carburettor therefore uses several overlapping circuits, each dominating a range of <strong>throttle opening</strong>, not of engine speed:</p>
<div class="mz-art-table"><table>
  <thead><tr><th>Throttle opening</th><th>Main circuit</th><th>Part that sets it</th></tr></thead>
  <tbody>
    <tr><td>Closed to 1/8</td><td>Pilot (low-speed) circuit</td><td>Pilot jet and pilot screw</td></tr>
    <tr><td>1/8 to 1/4</td><td>Transition</td><td>Slide cutaway</td></tr>
    <tr><td>1/4 to 3/4</td><td>Mid-range</td><td>Jet needle taper and clip position</td></tr>
    <tr><td>3/4 to full</td><td>High speed</td><td>Main jet</td></tr>
    <tr><td>Cold start</td><td>Enricher or choke</td><td>Starter jet and plunger, or choke plate</td></tr>
  </tbody>
</table></div>
<p>A float on a pivot closes a needle valve when the fuel reaches a set height, so the head of fuel under the jets stays constant. A float level set too high richens every circuit, and a sticking needle lets the bowl overflow.</p>
{lfig(OM("4t", "carb"), "illustrations/powertrain/PT01.png", "Technical plate of a slide carburettor in section with venturi, slide and needle, needle jet, main jet, pilot circuit, float bowl, float and float needle", "A slide carburettor in section, with the fuel shown tinted. Plate PT01, Motopedia Module 3.", "Select the carburettor in the Overview.")}

<h3 id="slide-cv">Slide and constant-velocity carburettors</h3>
<p>In a <strong>slide carburettor</strong> the throttle cable lifts the slide directly, so the rider controls the size of the venturi. Response is instant, which suits two-stroke off-road machines, but a large slide snapped open at low revs can make the engine bog. In a <strong>constant-velocity (CV) carburettor</strong>, used on many four-stroke commuters, the cable turns a butterfly and a piston on a rubber diaphragm rises only as fast as the engine's airflow allows. A torn diaphragm leaves the piston down, so the engine runs but will not rev beyond a moderate speed.</p>

<h2 id="why-efi">Why fuel injection replaced the carburettor</h2>
<p>A carburettor cannot hold the mixture inside the narrow window a three-way catalyst needs, cannot correct accurately for air density, temperature or the ethanol in the fuel, and cannot report its own faults. <strong>Electronic fuel injection (EFI)</strong> meters fuel by holding an electric valve open for a calculated time under constant pressure, and corrects that time continuously from an oxygen sensor in the exhaust. Once European emission limits made a catalyst with closed-loop control the practical route to approval, injection spread from large machines down to 125 cc commuters. In India the same change came with Bharat Stage VI in April 2020.</p>

<h2 id="how-efi-works">How a motorcycle fuel injection system works</h2>
{lfig(MD+"throttle_body", "illustrations/powertrain/F12.png", "Technical plate of a single-cylinder motorcycle fuel injection system: tank and pump, injector, throttle body, sensors, ECU, oxygen sensor and catalyst", "Fuel injection on a single: fuel delivery, sensors, ECU, actuators and catalyst. Plate F12, Motopedia Module 3.", "Open the throttle body model.")}
<p>The K-Light 125 used in the course has a typical small-engine system:</p>
<ul>
  <li>An <strong>in-tank fuel pump</strong> with a built-in regulator holds about 300 kPa at the injector. At key-on the ECU runs the pump for about 3 seconds to prime the line, then stops it unless the engine is turning, so a broken line after a crash cannot empty the tank.</li>
  <li>A <strong>throttle body</strong> carries the butterfly, a throttle position sensor, a combined intake pressure and temperature sensor and a stepper-motor idle control.</li>
  <li>A <strong>port injector</strong>, a solenoid valve of about 10 Ω, sprays fuel at the back of the inlet valve.</li>
  <li>A <strong>crankshaft trigger</strong>, a <strong>cylinder-head temperature sensor</strong> and a heated <strong>oxygen sensor</strong> feed the ECU, which also controls the ignition, and a <strong>malfunction lamp</strong> marked FI reports faults.</li>
</ul>
<p>The ECU works out the air mass entering the cylinder from manifold pressure, engine speed and air temperature, then sets the <strong>pulse width</strong>, the time the injector is held open. The course's worked example for a 124 cm³ single gives about 6 ms per cycle. Once the engine is warm the ECU runs in <strong>closed loop</strong>, nudging the pulse width up and down against the oxygen sensor so the mixture oscillates around lambda 1, which also suits the catalyst. When cold, at full load and during sharp throttle changes it runs <strong>open loop</strong> from its stored maps.</p>
{try_box(MD+"throttle_body", "renders/throttle_body.webp", "Rendered EFI throttle body with butterfly valve, injector and throttle position sensor", "Compare the two in 3D.", "The model library has the EFI throttle body and the slide carburettor side by side, and the Overview shows where each sits on the bike.", "Open the throttle body")}

<h2 id="compared">Carburettor and injection compared</h2>
<div class="mz-art-table"><table>
  <thead><tr><th></th><th>Carburettor</th><th>Fuel injection</th></tr></thead>
  <tbody>
    <tr><td>How fuel is metered</td><td>Suction of the airflow through fixed jets</td><td>ECU opens an injector for a calculated time</td></tr>
    <tr><td>Cold starting</td><td>Rider uses the choke or enricher</td><td>Automatic; do not touch the throttle</td></tr>
    <tr><td>Altitude and temperature</td><td>Mixture drifts; rejet for big changes</td><td>Corrected by sensors</td></tr>
    <tr><td>Emissions</td><td>Cannot hold lambda for a three-way catalyst</td><td>Closed loop with a catalyst meets current rules</td></tr>
    <tr><td>Electrics needed</td><td>None for fuel; gravity feed from the tap</td><td>Battery voltage for the pump, ECU and injector</td></tr>
    <tr><td>Fault finding</td><td>Jets, float, diaphragm and air leaks by inspection</td><td>Fault codes, sensor checks and fuel pressure test</td></tr>
  </tbody>
</table></div>

<h2 id="living-with">Living with each system</h2>
<p>A carburettor's commonest troubles come from stale fuel: petrol left in the float bowl evaporates and leaves varnish that blocks the tiny pilot jet, so the bike starts only on choke or will not idle. Our <a href="../carburettor-cleaning-basics/">carburettor cleaning guide</a> covers the order of checks and the cleaning method. Twins and fours with one carburettor per cylinder also need balancing so every throttle opens together.</p>
<p>Injection systems need less routine attention, but they have their own rules. Do not open the throttle while starting an injected engine, because the ECU calculates the cranking fuel itself; the exception is a flooded engine, where holding the throttle wide open triggers a clear-flood mode. The fuel line stays under pressure after the engine stops, so relieve it before disconnecting anything. The K-Light manual gives 7,000 to 10,000 km for the fuel filter and cleaning the throttle body every 10,000 km or one year, after which many ECUs need an idle relearn. A weak battery can upset injection too: the pump needs 12 ± 2 V at its connector while priming and cranking.</p>

{deeper([
  (L+"m3-mixture", "Chapter 3.1: Air, fuel and mixture", "carburettor circuits, jetting order and synchronising"),
  (L+"m3-efi", "Chapter 3.4: Electronic fuel injection and engine management", "sensors, ECU strategy, emissions and fault codes"),
  (EQ, "Equations summary", "air-fuel ratio, lambda, injector pulse width and duty cycle"),
  (QZ+"fuel", "Fuel, air and exhaust quiz", "test yourself on Module 3"),
  (VID+"fuel-systems", "Videos: fuel systems", ""),
  (REP+"carb-tune-order/", "Carburettor tuning order", ""),
  (REP+"throttle-body-clean/", "Throttle body cleaning", ""),
  (REP+"efi-code-read/", "Reading fuel injection fault codes", ""),
  (REP+"fuel-pump-check/", "Fuel pump check", ""),
  (PRB+"engine-warning-light/", "Engine warning light on", ""),
 ])}
''',
cta=dict(label='Try it', h='Open both fuel systems in 3D', p='Select the carburettor in the 3D Overview, turn the throttle body round in the model library, and read the two fuel chapters with their worked examples.', links=[(OM('4t', 'carb'), 'Select the carburettor', True), (MD+'throttle_body', 'Open the throttle body', False), (L+'m3-efi', 'Read chapter 3.4', False), (PRT+'injector/', 'Injector faults', False)]),
faq=[
 ('Is fuel injection better than a carburettor on a motorcycle?', 'For most road riding, yes: injection starts easily, corrects for altitude and temperature, uses fuel more precisely and works with a catalytic converter to meet emission rules. A carburettor is simpler, needs no electrics to deliver fuel and can be repaired with basic tools.'),
 ('Why do new motorcycles not have carburettors?', 'A carburettor cannot hold the mixture inside the narrow window a three-way catalyst needs, so it cannot meet current emission limits. Injection with an oxygen sensor can, which is why even 125 cc commuters now use it.'),
 ('Should I open the throttle when starting a fuel-injected motorcycle?', 'No. The ECU calculates the fuel and idle air for starting itself. The only exception is a flooded engine, where holding the throttle fully open while cranking puts most ECUs into a clear-flood mode that stops injection.'),
 ('What does the choke do on a carburettor?', 'It richens the mixture for a cold start. Most modern carburettors use an enricher plunger that adds fuel through a starter jet and works best with the throttle closed; older ones use a choke plate that restricts the air.'),
 ('Can a flat battery stop a fuel-injected motorcycle running?', 'Yes. The pump, ECU and injector all need battery voltage, and the K-Light manual expects 12 ± 2 V at the pump while it primes and cranks.'),
],
related=['carburettor-cleaning-basics', 'spark-plug-reading', 'how-a-motorcycle-engine-works'],
))

# ---------------------------------------------------------------- 21
ARTICLES.append(dict(
slug='air-oil-and-liquid-cooling',
date=NEW,
title='Air, oil and liquid cooling on motorcycles explained',
h1='Air cooling, oil cooling and liquid cooling on motorcycles',
desc='How motorcycle engines get rid of heat: air-cooled fins, oil coolers and oil-air cooling, and liquid cooling with pump, radiator, thermostat and pressure cap.',
label='Engine basics',
lead='About a third of the energy in a motorcycle\'s fuel leaves as heat through the cylinder and head, and the engine has to get rid of it without overheating. Air-cooled engines shed it from fins, oil-cooled engines also carry it away in the oil, and liquid-cooled engines pump coolant through a radiator.',
summary='Fins, oil coolers and liquid cooling compared: how each sheds heat, what it allows and what goes wrong.',
hero=dict(src=A+'renders/cylinder.webp', w=1000, h=800, alt='Quarter-cutaway render of an air-cooled cylinder and head with deep cooling fins, combustion chamber, valve and spring', cap='An air-cooled cylinder and head in quarter section: the fins carry heat from the combustion chamber and bore into the passing air. Render: Transitions Lab, CC BY-SA 4.0.'),
thumb=A+'renders/cylinder.webp',
body=f'''
<h2 id="why">Why an engine needs cooling</h2>
<p>A small air-cooled four-stroke turns at best about 28 to 32 per cent of its fuel's energy into work. Much of the rest leaves through the exhaust, and about a third leaves through the cylinder walls and head. If that heat is not carried away, the oil thins and breaks down, the piston expands until it scuffs the bore, and the mixture starts to detonate. Every engine therefore needs a way to move heat from the hot metal around the combustion chamber into the air. The three common answers are fins, oil and coolant.</p>

<h2 id="air">Air cooling: fins and airflow</h2>
<p>An air-cooled cylinder and head carry <strong>fins</strong>, which multiply the surface area exposed to the passing air. The fins are deepest around the exhaust port and combustion chamber, where the heat flow is highest. There is no pump, radiator, hose or coolant to fail, which makes air cooling light, cheap and easy to repair where parts are scarce. It suits the K-Light 125 and almost every commuter single.</p>
<p>The drawback is that the engine's temperature varies more with speed, load and weather. Its working clearances must be larger and its compression lower: the air-cooled K-Light runs 9:1. Mud packed between the fins or broken fins cut the cooling, and the result is overheating, detonation and in the end seizure. Riding slowly in heavy traffic on a hot day is the hardest test an air-cooled engine faces, because the airflow that cools it depends on road speed.</p>
{try_box(MD+"cylinder", "renders/cylinder.webp", "Quarter-cutaway render of an air-cooled cylinder and head with deep cooling fins", "Turn the cylinder round.", "The model library has the air-cooled cylinder and head in quarter section, so you can see how close the fins sit to the combustion chamber and valve seats.", "Open the cylinder model")}

<h2 id="oil">Oil cooling and oil-air cooling</h2>
<p>Every four-stroke's oil carries some heat away from the parts it lubricates: the piston underside, the big end, the cam and the valve gear. On an air-cooled engine the oil may carry 20 to 30 per cent of the heat the engine rejects. Many larger air-cooled engines take advantage of this by adding an <strong>oil cooler</strong>, a small radiator through which the oil is pumped before it returns to the engine. Others go further and spray or route oil through passages in the cylinder head, as Suzuki did on its SACS engines.</p>
<p>The course describes oil-air cooling as an intermediate solution: it keeps the simplicity of an engine without water jackets, pump or coolant, while holding the head and oil at a steadier temperature than fins alone. It makes the oil level and grade even more important, because the oil is now part of the cooling system. On any air-cooled or oil-cooled engine, low oil is one of the first things to check when it overheats.</p>
{lfig(OM("4t", "engine"), "illustrations/powertrain/F11.png", "Technical plate of the wet-sump lubrication circuit of a single-cylinder four-stroke, from strainer and pump through filter to crank, head and gearbox", "Oil flow through a wet-sump single: the same oil that lubricates the crank, cam and gearbox also carries heat away from them. Plate F11, Motopedia Module 2.", "Select the engine in the Overview.")}

<h2 id="liquid">Liquid cooling: pump, radiator, thermostat and cap</h2>
<p>A liquid-cooled engine has <strong>water jackets</strong> cast around the cylinder and combustion chamber. A centrifugal <strong>water pump</strong>, driven by the crankshaft or camshaft, circulates coolant through the jackets to a <strong>radiator</strong> at the front of the motorcycle, where the passing air carries the heat away.</p>
<ul>
  <li>A wax-element <strong>thermostat</strong> keeps the coolant inside the engine until it reaches about 80 to 85 °C, then opens progressively, so the engine warms up quickly and runs at a steady temperature.</li>
  <li>An electric <strong>fan</strong>, switched by a thermo-switch or the ECU at about 95 to 105 °C, pulls air through the radiator when the bike is moving slowly or standing in traffic.</li>
  <li>The <strong>pressure cap</strong> holds the system at typically 0.9 to 1.4 bar above atmospheric. Boiling point rises with pressure, so a 50 per cent glycol mixture that boils at about 107 °C in an open pan will not boil until about 125 to 130 °C under the cap.</li>
</ul>
<p>Holding the cylinder and head at about 80 to 100 °C lets the designer use tighter clearances, compression ratios of 11 to 13:1 and much higher power for the size, which is why liquid cooling is normal on sports bikes, larger twins and multis. The cost is the extra weight and parts: pump, radiator, thermostat, hoses and coolant, all of which can leak or fail.</p>
{try_box(OM("sb", "cooling"), "renders/bike_superbike__cooling.webp", "The radiator, fan and hoses highlighted on the rendered 1000 cc superbike", "Find the radiator.", "Select the cooling system on the superbike in the 3D Overview to see the radiator, fan, header tank and hoses.", "Select the superbike cooling")}

<h2 id="coolant">Coolant and the pressure cap</h2>
<p>Motorcycle coolant is glycol with aluminium-safe corrosion inhibitors, mixed 50:50 with deionised water, which protects against frost down to about −35 °C. The inhibitors wear out, so the coolant is replaced every two to three years. A cap with a weak seal or spring lets coolant boil, foam and escape to the overflow tank. Bubbles rising steadily in the header tank at idle point to a failed head gasket or cracked head pushing combustion gas into the coolant; a combustion leak tester that detects CO₂ confirms it.</p>
<div class="mz-art-note"><p>Never open a radiator cap on a hot engine. The coolant is above its atmospheric boiling point and flashes to steam the moment the pressure is released, causing severe scalds. Wait until the engine is cold, then release the cap slowly to its first stop.</p></div>

<h2 id="compared">The three systems compared</h2>
<div class="mz-art-table"><table>
  <thead><tr><th></th><th>Air-cooled</th><th>Oil-air cooled</th><th>Liquid-cooled</th></tr></thead>
  <tbody>
    <tr><td>How heat leaves</td><td>Fins on cylinder and head</td><td>Fins plus oil through a cooler or the head</td><td>Coolant through jackets and a radiator</td></tr>
    <tr><td>Extra parts</td><td>None</td><td>Oil cooler and lines</td><td>Pump, radiator, thermostat, fan, hoses, coolant</td></tr>
    <tr><td>Temperature control</td><td>Varies with speed and weather</td><td>Steadier</td><td>Held by the thermostat</td></tr>
    <tr><td>Typical compression</td><td>Lower (9:1 on the K-Light 125)</td><td>In between</td><td>11 to 13:1</td></tr>
    <tr><td>Typical use</td><td>Commuters, classics, many cruisers</td><td>Larger air-cooled engines</td><td>Sports bikes, larger twins and multis</td></tr>
  </tbody>
</table></div>

<h2 id="overheating">When an engine overheats</h2>
<p>On an air-cooled engine, check the oil level first, then look for blocked or broken fins and a lean mixture, which burns hotter. On a liquid-cooled engine, check the coolant level when cold, then the fan, the thermostat and the radiator: a thermostat stuck shut stops coolant reaching the radiator and the engine overheats quickly, while one stuck open makes it run cold, with poor economy and more wear. A blocked radiator, full of mud or bent fins, has the same effect as a failed fan.</p>
<p>Electric motorcycles need cooling too. Hub motors and small mid-drive motors are air cooled by fins on their housings, while larger mid-drives use a liquid jacket shared with the controller. Our article on <a href="../how-electric-motorcycles-work/">how electric motorcycles work</a> explains where that heat comes from.</p>

{deeper([
  (L+"m2-lubrication-cooling", "Chapter 2.6: Lubrication and cooling", "oil circuits, oil grades, air and liquid cooling"),
  (L+"m1-types", "Chapter 1.2: Types and configurations", "air versus liquid cooling in the choice of engine"),
  (EQ, "Equations summary", "boiling point against cap pressure"),
  (QZ+"engine", "Engine quiz", "test yourself on Module 2"),
  (REP+"air-cooling-check/", "Air cooling check", "fins, oil and airflow"),
  (REP+"coolant-check/", "Coolant check", ""),
  (REP+"thermostat-test/", "Thermostat test", ""),
  (REP+"fan-test/", "Cooling fan test", ""),
  (PRB+"overheating-air/", "Air-cooled engine overheats", ""),
  (PRB+"overheating-liquid/", "Liquid-cooled engine overheats", ""),
 ])}
''',
cta=dict(label='Try it', h='See the cooling systems in 3D', p='Turn the finned cylinder round in the model library, select the radiator on the superbike in the Overview, and ride the Cockpit to watch the engine temperature respond.', links=[(OM('sb', 'cooling'), 'Select the radiator', True), (MD+'cylinder', 'Open the cylinder model', False), (COCKPIT, 'Open the Cockpit', False), (L+'m2-lubrication-cooling', 'Read chapter 2.6', False)]),
faq=[
 ('Is liquid cooling better than air cooling on a motorcycle?', 'Liquid cooling holds the engine at a steady temperature, which allows tighter clearances, higher compression and more power for the size. Air cooling is lighter, cheaper and has nothing to leak, which is why it still suits commuters and classic designs.'),
 ('What is an oil-cooled motorcycle engine?', 'It is an air-cooled engine that also uses its oil to carry heat away, usually through an oil cooler and sometimes through passages in the cylinder head. It sits between air and liquid cooling in complexity and temperature control.'),
 ('Can an air-cooled motorcycle overheat in traffic?', 'Yes. Its cooling depends on airflow, so long periods at walking pace on a hot day are its hardest test. Low oil, packed or broken fins and a lean mixture all make it worse.'),
 ('Why should I never open a hot radiator cap?', 'The coolant is under pressure and above its normal boiling point. Releasing the cap lets it flash to steam and spray out, which can cause severe scalds. Wait until the engine is cold.'),
 ('How often should motorcycle coolant be changed?', 'Every two to three years, because the corrosion inhibitors wear out. Use an aluminium-safe glycol coolant mixed 50:50 with deionised water, or a premixed coolant to the maker\'s specification.'),
],
related=['how-a-motorcycle-engine-works', 'how-to-change-motorcycle-oil', 'how-electric-motorcycles-work'],
))
