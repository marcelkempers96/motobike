"""Stories: visits and collections, told through the engineering of the bikes.
Appends to the shared ARTICLES list (import after the arts chain)."""
from arts6 import ARTICLES

P = '../../assets/photos/blog/invercargill/'
L = '../../learn/#'
OV = '../../overview/?part='
R = '../../repair/repairs/'


def ph(name, alt, cap, cls=''):
    return f'''<figure{f' class="{cls}"' if cls else ''}>
  <img src="{P}{name}.webp" alt="{alt}" width="1050" height="1400" loading="lazy">
  <figcaption>{cap}</figcaption>
</figure>'''


def pair(a, b):
    return f'<div class="mz-art-pair">\n{a}\n{b}\n</div>'


BODY = f'''
<p>Invercargill sits at the bottom of New Zealand's South Island, a flat, windy town where the next stop south is Stewart Island and then the Southern Ocean. It is not where you would expect to find one of the finest motorcycle collections in the southern hemisphere. Yet in old brick buildings in the centre of town, Classic Motorcycle Mecca keeps around three hundred motorcycles on its wooden floors, from bicycles with engines bolted in to a six-cylinder Honda. Walk through it in order and you walk through the whole history of how a motorcycle is built.</p>
<p>This is a tour of that walk, bike by bike, with the engineering idea each one shows and where to learn more about it in Motopedia.</p>

<h2 id="before-the-motorcycle">Before it was a motorcycle</h2>
{pair(ph('motosacoche-1902', 'A black 1902 Motosacoche bicycle with a small engine mounted in the frame below a red fuel tank, under a framed poster', 'The 1902 Motosacoche, a 148 cc "motor in a bicycle" from Geneva, with the original poster above it.'),
      ph('indian-camelback-1907', 'A 1907 Indian Camelback with its fuel tank over the rear mudguard and a single cylinder forming part of the frame', 'The 1907 Indian Camelback, a 30 cubic inch single. The fuel tank sits over the rear wheel, giving it the hump.'))}
<p>The oldest machines in the collection are bicycles first. The <b>1902 Motosacoche</b> from Switzerland is exactly what its placard says: a 148 cc motor in a bicycle. The name means "motor in a bag", because the engine sat inside the frame triangle like a parcel. It still has pedals, a bicycle saddle on springs and rim-width tyres. The rider pedals away to start the engine and pedals again to help it up hills.</p>
<p>Five years later the <b>1907 Indian Camelback</b> shows the first step towards a real motorcycle frame. The single cylinder is no longer a passenger: it stands where the bicycle's seat tube would be and becomes part of the structure. The fuel tank is moved onto the rear mudguard, the "camel's back", and the drive has changed to a chain. Its 30 cubic inches are about 490 cc, more than three times the Swiss engine.</p>
<p>Both engines are simple four-strokes, and the basic cycle is the same one every petrol motorcycle still uses. <a href="../how-a-motorcycle-engine-works/">How a motorcycle engine works</a> follows it stroke by stroke, and the <a href="{L}m1-history-systems">course chapter on history and systems</a> explains why the compact engine, the pneumatic tyre and the roller chain had to arrive together before machines like these were possible.</p>

<h2 id="the-v-twin">Two cylinders in a V</h2>
{ph('harley-davidson-11f-1915', 'A grey 1915 Harley-Davidson 11F V-twin in front of a row of red and blue Indian motorcycles, beside tall factory windows', 'The 1915 Harley-Davidson 11F, a 1,000 cc inlet-over-exhaust V-twin, at the head of a row of Indians.', 'is-tall')}
<p>By the First World War the American makers had settled on the layout that still defines them: two cylinders set in a narrow V on one crankshaft. A V-twin doubles the capacity of a single without making the engine much longer or wider, and it fits neatly into a diamond frame. The row of red and blue <b>Indians</b> by the windows and the grey <b>1915 Harley-Davidson 11F</b> are the two sides of that rivalry.</p>
{pair(ph('flying-merkel-1912', 'A blue 1912 Flying Merkel V-twin with a large brass headlamp and a curved handlebar', 'The 1912 Flying Merkel, a 980 cc V-twin.'),
      ph('indian-row-1914', 'A weathered 1914 Indian V-twin with red rims and cream tyres at the front of a row of restored Indians', 'An unrestored 1914 Indian, with its exposed valve gear and oily patina, next to restored sisters.'))}
<p>Look closely at the Harley and the <b>1912 Flying Merkel</b> and you can see the valves at work. These are inlet-over-exhaust engines, often called F-heads: the exhaust valve sits in the side of the cylinder, worked from below, and the inlet valve sits above it in the head, worked by an exposed pushrod and rocker. Later engines moved both valves into the head, which lets the charge in and out more freely. The <a href="{L}m2-top-end">top end chapter</a> and the valves in <a href="../../engine/">Under the Engine</a> show the modern arrangement moving, and the <a href="{OV}valve_in">inlet valve</a> in the Overview lights up the part on a 3D bike. If you own anything with valves, the <a href="{R}valve-clearance/">valve clearance job</a> is the descendant of the adjustment these riders made by eye.</p>

<h2 id="four-in-a-row">Four in a row, in 1913</h2>
{pair(ph('henderson-model-b-1913', 'A dark blue and silver 1913 Henderson Model B with a long frame and an inline four-cylinder engine', 'The 1913 Henderson Model B, with four cylinders in a line along the frame.'),
      ph('henderson-detail', 'Close view of the Henderson four-cylinder engine with its magneto, copper leads and long hand-change lever', 'The Henderson close up: magneto and copper leads in front of the cylinders, and the long hand lever.'))}
<p>The bike that stops most visitors is the <b>1913 Henderson Model B</b>. Its engine has four cylinders in a straight line, front to back, along the length of the frame. That makes the motorcycle very long, but it was smooth in a way no single or twin could be, because with four cylinders one is always on a power stroke. Henderson fours became popular with American police and long-distance riders.</p>
<p>The close-up shows how the spark was made before batteries were common: a <b>magneto</b>, the brass and chrome box in front of the cylinders, generates its own high-voltage pulse as the engine turns, and the four copper leads carry it to the plugs. There is no battery to go flat. The <a href="{L}m3-ignition">ignition chapter</a> explains what replaced it, coils and electronic triggers, and <a href="../spark-plug-reading/">How to read a spark plug</a> shows what those plugs tell you about the engine.</p>

<h2 id="family-transport">The family car with one wheel at the side</h2>
{pair(ph('excelsior-wicker-sidecar-1903', 'Early motorcycles fitted with wicker sidecars with buttoned leather seats, including a 1903 Excelsior', 'A 1903 Excelsior with a wicker sidecar, and its neighbours. Wicker was light and comfortable.'),
      ph('ajs-sidecars-1929-1930', 'Two black AJS V-twins with sidecars: one with an enclosed passenger body and one with a wooden box for goods', 'A 1929 AJS M2 with a passenger sidecar and a 1930 AJS R2 with a wooden box, both 1,000 cc.'))}
<p>Before cheap cars, the sidecar outfit was how a family travelled and how a tradesman carried his tools. The <b>1903 Excelsior</b> and its neighbours carry wicker chairs with buttoned leather seats. By 1930 the <b>AJS</b> V-twins had become workhorses: one carries a passenger body, the other a plain wooden box for goods.</p>
<p>A sidecar changes how a motorcycle steers. The outfit cannot lean, so it is steered like a car, and the sidecar wheel pulls the machine to one side under power and the other under braking. The <a href="{L}m4-frame-steering">frame and steering chapter</a> explains trail and steering geometry, the ideas a sidecar fitter adjusts when setting up an outfit.</p>

<h2 id="the-big-hall">The big hall</h2>
{ph('hall-fn-bmw', 'A large hall with a wooden floor full of veteran and vintage motorcycles, with an FN in the foreground and BMW flat twins to the left', 'The main hall: an early FN from Belgium in the foreground and BMW flat twins on the left.')}
<p>In the main hall the bikes stand in rows across a wooden floor under a skylight. At the front is an <b>FN</b> from Belgium, a maker better known for firearms that also built some of the most advanced early motorcycles, including shaft-driven fours. To the left stand <b>BMW</b> flat twins, with their cylinders sticking out into the cooling air on each side and a shaft instead of a chain to the rear wheel. Chain, belt and shaft drive are compared in the <a href="{L}m4-final-drive">final drive chapter</a>, and <a href="../motorcycle-chain-maintenance/">Motorcycle chain maintenance</a> covers the one most riders live with.</p>

<h2 id="italian-red">Italian orange and red</h2>
{pair(ph('laverda-sfc-1974', 'An orange 1974 Laverda SFC race bike with race number 30 and a half fairing', 'The 1974 Laverda SFC, a 750 cc parallel twin built for endurance racing.'),
      ph('hall-bimota-row', 'A row of red, white and black Bimota sports motorcycles, with veteran machines on racks behind them', 'A row of Bimotas, from the 1977 SB2 to the 2000 SB8R, with vintage machines above.'))}
<p>The modern rooms are louder in colour. The orange <b>1974 Laverda SFC</b> was built in Breganze for endurance racing, and the letters stand for Super Freni Competizione, "super brakes, competition". It is a 750 cc parallel twin with its cylinders side by side across the frame, the layout most mid-size road bikes still use.</p>
<p>Next to it stands a whole row of <b>Bimotas</b>. Bimota, from Rimini, did not build engines. It took the engines of other makers, a Suzuki four in the 1977 SB2, Ducati twins in the DB models, a Suzuki V-twin in the 2000 SB8R, and built far stiffer, lighter frames and suspension around them. They are the best lesson in the collection that a motorcycle is a system: the same engine handles completely differently in a different chassis. The <a href="{L}m4-suspension">suspension chapter</a> and the <a href="../../build/">Bike builder</a>, where you can swap parts between bikes and watch the numbers change, explore that idea.</p>

<h2 id="japanese-multis">Six cylinders, and a police four</h2>
{pair(ph('honda-cbx', 'A silver Honda CBX with a wide six-cylinder engine on a lit turntable under a timber roof', 'The Honda CBX: six cylinders, 24 valves and twin overhead camshafts.'),
      ph('kawasaki-police-1000', 'A white Kawasaki Police 1000 with a windscreen, panniers and a star badge on the tank', 'A Kawasaki Police 1000 in California Highway Patrol livery.'))}
<p>The Japanese makers took the Henderson's idea of many cylinders and turned the engine sideways, so that a four or even a six sits across the frame instead of along it. The silver <b>Honda CBX</b> of 1978 is the extreme: six cylinders in a row, two overhead camshafts and four valves per cylinder, 24 in all, in an engine about as wide as the rider's knees. More, smaller cylinders let an engine rev higher and make more power from the same capacity, at the cost of complexity. The <a href="{L}m2-fundamentals">engine fundamentals chapter</a> shows why.</p>
<p>The white <b>Kawasaki Police 1000</b> is the same inline-four idea in working clothes, with a screen, panniers and a radio box, in the livery of the California Highway Patrol made famous on television. Fleet bikes like this are why the course spends so much time on <a href="{L}m4-maintenance">routine maintenance</a>: a bike that works every day needs a schedule, not just a repair.</p>

<h2 id="speedway">Spikes and no brakes</h2>
{ph('speedway-bruce-cribb', 'A stripped speedway motorcycle with a Jawa engine, gold handlebars and tyres covered in long steel spikes', 'The speedway bike of New Zealand rider Bruce Cribb, with spiked tyres of the kind used on ice.', 'is-tall')}
<p>In a darker room is the most purposeful machine in the building: the speedway bike of New Zealand rider <b>Bruce Cribb</b>, with a Jawa engine and tyres bristling with steel spikes of the kind used for ice racing. A speedway bike has one gear, no brakes and a very short wheelbase. It is steered as much with the throttle and the rider's weight as with the bars, and everything that does not make it faster has been removed. Compare it with the <a href="../../types/">types of motorcycle</a> and it is clear how far a single purpose can reshape the same basic parts.</p>

<h2 id="southland-custom">Made in the USA, perfected in Southland</h2>
{ph('custom-softail', 'A heavily customised Harley-Davidson with tall chrome handlebars, airbrushed paintwork, whitewall tyres and chrome engine covers', 'A local custom: a Harley-Davidson V-twin rebuilt with chrome, paint and very tall bars.', 'is-tall')}
<p>The last bike on the tour is a local one. A Harley-Davidson V-twin, the direct descendant of the grey 11F, has been rebuilt in Southland with tall chrome handlebars, airbrushed paint, whitewall tyres and polished covers. The plinth puts it simply: made in the USA, perfected in Southland, New Zealand. Under all the chrome the engine is still two cylinders in a V on one crankshaft, a century after the bikes by the windows.</p>

<h2 id="why-it-matters">What a museum teaches a mechanic</h2>
<p>Walking from the Motosacoche to the CBX is a lesson in how few ideas a motorcycle is really built from. Every machine in the building has a frame, two wheels, an engine that turns fuel into rotation, a way to get that rotation to the back wheel, a spark, and a way to stop. What changes is how each problem is solved: belt, chain or shaft; one cylinder or six; magneto or battery and coil; a bicycle fork or modern suspension. Learn the idea once and you can work on any of them.</p>
<p>Invercargill also has a famous motorcycle outside the museum: Burt Munro's record-breaking Indian Scout is kept in the town, and it is a reminder that a determined mechanic with simple tools can still teach the factories something.</p>
<h3>Go deeper</h3>
<ul>
<li><a href="../../history/">The history of the motorcycle</a>, from the first engines to electric bikes</li>
<li><a href="../../types/">Motorcycle types</a>, from cruisers and customs to speedway and sports bikes</li>
<li><a href="{L}m1-history-systems">Course chapter 1.1: history and the motorcycle as a system</a></li>
<li><a href="../../engine/">Under the Engine</a>: every gear and valve moving, in 3D</li>
<li><a href="../two-stroke-vs-four-stroke/">Two-stroke versus four-stroke engines</a></li>
</ul>
'''

ARTICLES.append(dict(
    slug='invercargill-classic-motorcycle-mecca',
    date='2026-11-07',
    title='A century of motorcycles in Invercargill: Classic Motorcycle Mecca',
    h1='A century of motorcycles in Invercargill',
    desc='A walk through Classic Motorcycle Mecca in Invercargill, New Zealand: from a 1902 motor in a bicycle to the six-cylinder Honda CBX, and the engineering each bike shows.',
    label='Story',
    lead='At the bottom of New Zealand, in old brick buildings, around three hundred motorcycles tell the whole story of how a motorcycle is built. We walked through them in order, from a 1902 bicycle with an engine to a six-cylinder Honda.',
    summary='From a 1902 motor in a bicycle to the six-cylinder Honda CBX: a walk through the collection, bike by bike.',
    hero=dict(src=P + 'hall-fn-bmw.webp', w=1050, h=1400,
              alt='The main hall of Classic Motorcycle Mecca, a wooden-floored room full of veteran and vintage motorcycles under a skylight',
              cap='The main hall at Classic Motorcycle Mecca, Invercargill. Photo: Transitions Lab.'),
    thumb=P + 'henderson-model-b-1913.webp',
    body=BODY,
    cta=dict(label='Explore', h='See how these machines work',
             p='Every bike in the museum is built from the same handful of ideas. Explore them on a 3D motorcycle, watch an engine run, or start the course from chapter 1.',
             links=[('../../overview/', 'Open the 3D Overview', True), ('../../history/', 'Read the history', False),
                    ('../../learn/#m1-history-systems', 'Start the course', False), ('../../types/', 'Motorcycle types', False)]),
    faq=[('Where is Classic Motorcycle Mecca?', 'In the centre of Invercargill, in Southland at the south of New Zealand\'s South Island. Check the museum\'s own website for opening hours and prices before you travel.'),
         ('What is an inlet-over-exhaust (F-head) engine?', 'An engine with the exhaust valve in the side of the cylinder and the inlet valve above it in the head. It was common on American V-twins and fours before about 1930, when both valves moved into the head.'),
         ('Why does the Henderson have such a long frame?', 'Its four cylinders sit in a line along the frame, front to back, so the engine is long. Later four-cylinder engines were turned sideways to make the motorcycle shorter.'),
         ('What is a magneto?', 'A generator that makes its own high-voltage spark as the engine turns, so the ignition needs no battery. It was the standard ignition on early motorcycles and is still used on some small engines.'),
         ('Why do speedway bikes have no brakes?', 'Speedway races are short, on a loose oval track, and riders slow down by sliding the bike and closing the throttle. Removing the brakes saves weight, and the rules do not allow them.')],
    related=['how-a-motorcycle-engine-works', 'types-of-motorcycles', 'two-stroke-vs-four-stroke'],
))
