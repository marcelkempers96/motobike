"""Stories: visits and collections, told through the engineering of the bikes.
Appends to the shared ARTICLES list (import after the arts chain)."""
from arts7 import ARTICLES

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
      ph('indian-camelback-close', 'A 1907 Indian Camelback with its fuel tank over the rear mudguard and a single cylinder forming part of the frame', 'The 1907 Indian Camelback, a 30 cubic inch single. The fuel tank sits over the rear wheel, giving it the hump.'))}
<p>The oldest machines in the collection are bicycles first. The <b>1902 Motosacoche</b> from Switzerland is exactly what its placard says: a 148 cc motor in a bicycle. The name means "motor in a bag", because the engine sat inside the frame triangle like a parcel. It still has pedals, a bicycle saddle on springs and rim-width tyres. The rider pedals away to start the engine and pedals again to help it up hills.</p>
{ph('peugeot-perfecta-1902', 'An unrestored 1902 Peugeot Perfecta, a bicycle frame with a small single-cylinder engine driving a belt', 'The 1902 Peugeot Perfecta, a 200 cc side-valve single from France, unrestored.')}
<p>Next to it, the unrestored <b>1902 Peugeot Perfecta</b> from France does the same job with a 200 cc side-valve engine low in the frame and a flat leather belt to the rear wheel. Belts were quiet and simple, but they slipped in the wet, which is one reason chains took over. The <a href="{L}m4-final-drive">final drive chapter</a> compares belt, chain and shaft.</p>
<p>Five years later the <b>1907 Indian Camelback</b> shows the first step towards a real motorcycle frame. The single cylinder is no longer a passenger: it stands where the bicycle's seat tube would be and becomes part of the structure. The fuel tank is moved onto the rear mudguard, the "camel's back", and the drive has changed to a chain. Its 30 cubic inches are about 490 cc, more than three times the Swiss engine.</p>
{pair(ph('triumph-1908-roadster', 'A 1908 Triumph Roadster with a silver and green tank between the frame tubes and a single side-valve cylinder', 'The 1908 Triumph Roadster, a 475 cc side-valve single, at the head of a row of early Triumphs.'),
      ph('triumph-row-1908', 'A row of early Triumph motorcycles from 1908 to 1914 in a long hall with arched windows', 'Early Triumphs in a row, 1908 to 1914, each a little more refined than the last.'))}
<p>In Britain, Triumph took the same path. The <b>1908 Triumph Roadster</b> has a 475 cc side-valve single sitting upright in a proper diamond frame, the fuel tank hung between the top tubes, and a belt to the rear wheel. Behind it a row of Triumphs to 1914 shows how quickly the design settled: bigger engines, better carburettors, sprung forks. Most commuter motorcycles today still have a single cylinder in roughly this position.</p>
<p>Both engines are simple four-strokes, and the basic cycle is the same one every petrol motorcycle still uses. <a href="../how-a-motorcycle-engine-works/">How a motorcycle engine works</a> follows it stroke by stroke, and the <a href="{L}m1-history-systems">course chapter on history and systems</a> explains why the compact engine, the pneumatic tyre and the roller chain had to arrive together before machines like these were possible.</p>

<h2 id="the-v-twin">Two cylinders in a V</h2>
{ph('harley-davidson-11f-1915', 'A grey 1915 Harley-Davidson 11F V-twin in front of a row of red and blue Indian motorcycles, beside tall factory windows', 'The 1915 Harley-Davidson 11F, a 1,000 cc inlet-over-exhaust V-twin, at the head of a row of Indians.', 'is-tall')}
<p>By the First World War the American makers had settled on the layout that still defines them: two cylinders set in a narrow V on one crankshaft. A V-twin doubles the capacity of a single without making the engine much longer or wider, and it fits neatly into a diamond frame. The row of red and blue <b>Indians</b> by the windows and the grey <b>1915 Harley-Davidson 11F</b> are the two sides of that rivalry.</p>
{pair(ph('flying-merkel-1912', 'A blue 1912 Flying Merkel V-twin with a large brass headlamp and a curved handlebar', 'The 1912 Flying Merkel, a 980 cc V-twin.'),
      ph('indian-row-1914', 'A weathered 1914 Indian V-twin with red rims and cream tyres at the front of a row of restored Indians', 'An unrestored 1914 Indian, with its exposed valve gear and oily patina, next to restored sisters.'))}
{pair(ph('thor-1916-bmw-r35', 'A bright blue 1916 Thor Model U V-twin on a plinth, with a black 1950 BMW R35 single on the rack above it', 'The 1916 Thor Model U, a 1,000 cc inlet-over-exhaust V-twin, with a 1950 BMW R35 above.'),
      ph('indian-row-red', 'Red and black Indian V-twins with leather saddles and saddlebags in the main hall', 'Indian V-twins of the 1920s, with leather saddlebags for touring.'))}
<p>Look closely at the Harley, the blue <b>1916 Thor Model U</b> and the <b>1912 Flying Merkel</b> and you can see the valves at work. These are inlet-over-exhaust engines, often called F-heads: the exhaust valve sits in the side of the cylinder, worked from below, and the inlet valve sits above it in the head, worked by an exposed pushrod and rocker. Later engines moved both valves into the head, which lets the charge in and out more freely. The <a href="{L}m2-top-end">top end chapter</a> and the valves in <a href="../../engine/">Under the Engine</a> show the modern arrangement moving, and the <a href="{OV}valve_in">inlet valve</a> in the Overview lights up the part on a 3D bike. If you own anything with valves, the <a href="{R}valve-clearance/">valve clearance job</a> is the descendant of the adjustment these riders made by eye.</p>

{ph('harley-davidson-1926-racer', 'A yellow 1926 Harley-Davidson stock racer with no mudguards, no brakes, white tyres and a low handlebar', 'A 1926 Harley-Davidson 1,000 cc striped stock racer: no brakes, no gearbox and nothing that does not make it faster.')}
<p>The yellow <b>1926 Harley-Davidson stock racer</b> shows what the same V-twin became when it went racing. There are no mudguards, no lights and no front brake, and the chain runs straight from the engine to a large rear sprocket. Racers like this ran on dirt ovals and wooden board tracks. Changing the size of the rear sprocket was how a team suited the bike to the track, the same gearing choice you can try in the course's <a href="{L}m4-final-drive">final drive chapter</a> today.</p>

<h2 id="four-in-a-row">Four in a row, in 1913</h2>
{pair(ph('henderson-model-b-1913', 'A dark blue and silver 1913 Henderson Model B with a long frame and an inline four-cylinder engine', 'The 1913 Henderson Model B, with four cylinders in a line along the frame.'),
      ph('henderson-detail', 'Close view of the Henderson four-cylinder engine with its magneto, copper leads and long hand-change lever', 'The Henderson close up: magneto and copper leads in front of the cylinders, and the long hand lever.'))}
<p>The bike that stops most visitors is the <b>1913 Henderson Model B</b>. Its engine has four cylinders in a straight line, front to back, along the length of the frame. That makes the motorcycle very long, but it was smooth in a way no single or twin could be, because with four cylinders one is always on a power stroke. Henderson fours became popular with American police and long-distance riders.</p>
{ph('henderson-g-row', 'A dark green Henderson Model G four-cylinder at the head of a row of Excelsior-Henderson and Indian motorcycles', 'A later Henderson Model G four, leading a row of Excelsior-Hendersons. A Velocette sign hangs on the far wall.')}
<p>A later <b>Henderson Model G</b> leads a row of its successors. The layout stayed the same for years: four cylinders in line, a magneto in front, footboards instead of footrests, and a long, low frame built for distance rather than corners.</p>
{ph('nimbus-stovepipe-1924', 'A black 1924 Nimbus Stovepipe with an inline four-cylinder engine and a single thick frame tube that doubles as the fuel tank, under a Rudge poster', 'The 1924 Nimbus Stovepipe from Denmark, a 746 cc inline four.')}
<p>Denmark answered with the <b>1924 Nimbus</b>, another inline four. Its nickname, Stovepipe, comes from the single large tube running from the steering head to the rear: it is both the backbone of the frame and the fuel tank. Using one part for two jobs saves weight and parts, an idea that returns again and again in motorcycle design.</p>
<p>The close-up shows how the spark was made before batteries were common: a <b>magneto</b>, the brass and chrome box in front of the cylinders, generates its own high-voltage pulse as the engine turns, and the four copper leads carry it to the plugs. There is no battery to go flat. The <a href="{L}m3-ignition">ignition chapter</a> explains what replaced it, coils and electronic triggers, and <a href="../spark-plug-reading/">How to read a spark plug</a> shows what those plugs tell you about the engine.</p>

<h2 id="british-singles">The British single, and the overhead camshaft</h2>
{pair(ph('velocette-kss-1932', 'A black 1932 Velocette KSS Mark I with gold tank lining and a vertical bevel-drive tube to the cylinder head', 'The 1932 Velocette KSS Mark I, a 350 cc overhead-camshaft single. The tube up the side of the cylinder carries the camshaft drive.'),
      ph('norton-inter-parilla', 'A 1938 Norton International 30 above a 1957 Moto Parilla GS 250, both single-cylinder sports machines', 'A 1938 Norton International 30, 490 cc, above a 1957 Moto Parilla GS 250. Both have overhead camshafts.'))}
<p>Between the wars, British factories built the motorcycle that won races and carried commuters: the big single. The <b>1932 Velocette KSS</b> and the <b>1938 Norton International</b> show its best form. Look for the vertical tube on the right of each cylinder: it carries a shaft with bevel gears at each end, turning an <b>overhead camshaft</b> right above the valves. Putting the camshaft in the head lets the valves follow the cam accurately at high revs, which is why nearly every modern engine does it, with a chain or belt instead of the shaft. The <b>1957 Moto Parilla GS 250</b> below the Norton is the same idea in a smaller Italian engine.</p>
{pair(ph('norton-raleigh', 'A Norton single on a rack above a black Raleigh V-twin with leather tool bags', 'A Norton single above a Raleigh V-twin, both British.'),
      ph('bsa-l25-1924', 'A 1924 BSA L25 above a red early American single on a two-level rack', 'A 1924 BSA L25 above an early red American single.'))}
<p>The rest of the British rooms fill in the story: Norton, Raleigh, BSA and many others, most with one cylinder, a chain to the back wheel and a hand or foot gear change. Compare them with the overhead-camshaft Velocette and you can see how much simpler the valve gear of most engines of the period was. The <a href="{L}m2-top-end">top end chapter</a> and <a href="{R}cam-chain-check/">checking a cam chain</a> follow the modern version.</p>
{ph('sunbeam-model-2-1924', 'A black 1924 Sunbeam Model 2 with gold lining, a brass horn and a fully enclosed chain case marked Little Oil Bath', 'The 1924 Sunbeam Model 2, a 347 cc side-valve single. The black case behind the engine is the Little Oil Bath chain case.')}
<p>The <b>1924 Sunbeam Model 2</b> was known as one of the best-made British motorcycles of its day, and it shows why in one detail: the chain runs inside a sealed case filled with oil, the "Little Oil Bath" written on the side. An enclosed, oiled chain lasts many times longer than an open one, which is still true. Modern step-throughs and scooters often use the same idea. <a href="../motorcycle-chain-maintenance/">Motorcycle chain maintenance</a> and <a href="{R}chain-adjust/">adjusting chain slack</a> cover the open chain that most bikes have now.</p>
{pair(ph('velocette-row', 'A group of black Velocette singles, including racing machines with number boards, in front of a large photo of a racing motorcycle', 'Velocettes, from overhead-camshaft racers with number boards to the Venom and MAC road singles.'),
      ph('norton-dominator-row', 'A row of British motorcycles with a 1951 Norton Dominator 7 at the front, a Triumph behind it and many more beyond', 'A 1951 Norton Dominator 7, a 497 cc overhead-valve parallel twin, leading a row of British machines.'))}
<p>After the war the big single gave way to the <b>parallel twin</b>: two cylinders side by side, sharing one crankshaft. The <b>1951 Norton Dominator 7</b> at the head of this row is a 497 cc twin with overhead valves, and the Triumph twins behind it are the same layout. A twin of the same capacity is smoother and revs more freely than a single. It is the layout of the Laverda further on, and of many mid-size road bikes today.</p>

<h2 id="family-transport">The family car with one wheel at the side</h2>
{pair(ph('excelsior-wicker-sidecar-1903', 'Early motorcycles fitted with wicker sidecars with buttoned leather seats, including a 1903 Excelsior', 'A 1903 Excelsior with a wicker sidecar, and its neighbours. Wicker was light and comfortable.'),
      ph('ajs-sidecars-1929-1930', 'Two black AJS V-twins with sidecars: one with an enclosed passenger body and one with a wooden box for goods', 'A 1929 AJS M2 with a passenger sidecar and a 1930 AJS R2 with a wooden box, both 1,000 cc.'))}
<p>Before cheap cars, the sidecar outfit was how a family travelled and how a tradesman carried his tools. The <b>1903 Excelsior</b> and its neighbours carry wicker chairs with buttoned leather seats. By 1930 the <b>AJS</b> V-twins had become workhorses: one carries a passenger body, the other a plain wooden box for goods.</p>
<p>A sidecar changes how a motorcycle steers. The outfit cannot lean, so it is steered like a car, and the sidecar wheel pulls the machine to one side under power and the other under braking. The <a href="{L}m4-frame-steering">frame and steering chapter</a> explains trail and steering geometry, the ideas a sidecar fitter adjusts when setting up an outfit.</p>

<h2 id="the-big-hall">The big hall</h2>
{pair(ph('hall-fn-bmw', 'A large hall with a wooden floor full of veteran and vintage motorcycles, with an FN in the foreground and BMW flat twins to the left', 'The main hall: an early FN from Belgium in the foreground and BMW flat twins on the left.'),
      ph('fn-four-row', 'A row of veteran motorcycles led by an FN with a black and gold tank, with BMW flat twins and many more bikes beyond', 'The veteran row, led by an FN, with BMW flat twins behind.'))}
<p>In the main hall the bikes stand in rows across a wooden floor under a skylight. At the front is an <b>FN</b> from Belgium, a maker better known for firearms that also built some of the most advanced early motorcycles, including shaft-driven fours. To the left stand <b>BMW</b> flat twins, with their cylinders sticking out into the cooling air on each side and a shaft instead of a chain to the rear wheel. Chain, belt and shaft drive are compared in the <a href="{L}m4-final-drive">final drive chapter</a>, and <a href="../motorcycle-chain-maintenance/">Motorcycle chain maintenance</a> covers the one most riders live with.</p>

<h2 id="american-heavyweights">The American heavyweight</h2>
{ph('indian-chief-1948', 'A pale green 1948 Indian Roadmaster Chief with deeply skirted mudguards and a fringed leather saddle, with Harley-Davidsons behind', 'A 1948 Indian Roadmaster Chief, a 1,200 cc side-valve V-twin, with Harley-Davidsons behind.', 'is-tall')}
<p>By 1948 the American V-twin had grown into the heavyweight cruiser. The <b>Indian Roadmaster Chief</b> has a 1,200 cc side-valve engine, with both valves beside the cylinder and no valve gear in the head at all, deep skirted mudguards and a sprung saddle. Side valves are simple, quiet and easy to maintain, but they cannot breathe as well as overhead valves, which is why the Chief makes its power slowly. The <a href="../types-of-motorcycles/">types of motorcycle</a> article traces the cruiser from here to today.</p>

<h2 id="italian-red">Italian orange and red</h2>
{pair(ph('laverda-sfc-1974', 'An orange 1974 Laverda SFC race bike with race number 30 and a half fairing', 'The 1974 Laverda SFC, a 750 cc parallel twin built for endurance racing.'),
      ph('hall-bimota-row', 'A row of red, white and black Bimota sports motorcycles, with veteran machines on racks behind them', 'A row of Bimotas, from the 1977 SB2 to the 2000 SB8R, with vintage machines above.'))}
<p>The modern rooms are louder in colour. The orange <b>1974 Laverda SFC</b> was built in Breganze for endurance racing, and the letters stand for Super Freni Competizione, "super brakes, competition". It is a 750 cc parallel twin with its cylinders side by side across the frame, the layout most mid-size road bikes still use.</p>
<p>Next to it stands a whole row of <b>Bimotas</b>. Bimota, from Rimini, did not build engines. It took the engines of other makers, a Suzuki four in the 1977 SB2, Ducati twins in the DB models, a Suzuki V-twin in the 2000 SB8R, and built far stiffer, lighter frames and suspension around them. They are the best lesson in the collection that a motorcycle is a system: the same engine handles completely differently in a different chassis. The <a href="{L}m4-suspension">suspension chapter</a> and the <a href="../../build/">Bike builder</a>, where you can swap parts between bikes and watch the numbers change, explore that idea.</p>
{pair(ph('bimota-row-sb2', 'A row of red and white Bimotas, with a Bimota Honda at the front and an SB2 behind it, under vintage posters', 'Bimotas in a row: a Bimota Honda at the front, the SB2 behind it, and later models beyond.'),
      ph('bimota-sb8r-bsa', 'A red, white and carbon Bimota SB8R on a paddock stand, with a BSA Gold Star on a rack above', 'The 2000 Bimota SB8R with carbon bodywork, and a BSA competition single above it.'))}

<h2 id="japanese-multis">Six cylinders, and a police four</h2>
{pair(ph('honda-cbx', 'A silver Honda CBX with a wide six-cylinder engine on a lit turntable under a timber roof', 'The Honda CBX: six cylinders, 24 valves and twin overhead camshafts.'),
      ph('kawasaki-police-1000', 'A white Kawasaki Police 1000 with a windscreen, panniers and a star badge on the tank', 'A Kawasaki Police 1000 in California Highway Patrol livery.'))}
<p>The Japanese makers took the Henderson's idea of many cylinders and turned the engine sideways, so that a four or even a six sits across the frame instead of along it. The silver <b>Honda CBX</b> of 1978 is the extreme: six cylinders in a row, two overhead camshafts and four valves per cylinder, 24 in all, in an engine about as wide as the rider's knees. More, smaller cylinders let an engine rev higher and make more power from the same capacity, at the cost of complexity. The <a href="{L}m2-fundamentals">engine fundamentals chapter</a> shows why.</p>
<p>The white <b>Kawasaki Police 1000</b> is the same inline-four idea in working clothes, with a screen, panniers and a radio box, in the livery of the California Highway Patrol made famous on television. Fleet bikes like this are why the course spends so much time on <a href="{L}m4-maintenance">routine maintenance</a>: a bike that works every day needs a schedule, not just a repair.</p>

<h2 id="speedway">Spikes and no brakes</h2>
{ph('speedway-bruce-cribb', 'A stripped speedway motorcycle with a Jawa engine, gold handlebars and tyres covered in long steel spikes', 'The speedway bike of New Zealand rider Bruce Cribb, with spiked tyres of the kind used on ice.', 'is-tall')}
<p>In a darker room is the most purposeful machine in the building: the speedway bike of New Zealand rider <b>Bruce Cribb</b>, with a Jawa engine and tyres bristling with steel spikes of the kind used for ice racing. A speedway bike has one gear, no brakes and a very short wheelbase. It is steered as much with the throttle and the rider's weight as with the bars, and everything that does not make it faster has been removed. Compare it with the <a href="../../types/">types of motorcycle</a> and it is clear how far a single purpose can reshape the same basic parts.</p>

<h2 id="scooters">Scooters</h2>
{ph('ducati-brio', 'A white Ducati Brio scooter with a flat floor, leg shield, chrome luggage racks and a black seat', 'A Ducati Brio scooter, with the engine hidden under the bodywork behind the rider.')}
<p>In the scooter corner a white <b>Ducati Brio</b> shows the other way to build a two-wheeler: a flat floor, a leg shield, small wheels and the engine hidden under the bodywork beside the rear wheel. Scooters were built for riders in ordinary clothes on city streets, and the layout has hardly changed. Most modern scooters add an automatic belt drive, the CVT, explained in the <a href="{L}m4-final-drive">final drive chapter</a> and the <a href="../types-of-motorcycles/">types of motorcycle</a> article.</p>

<h2 id="electric">A New Zealand electric</h2>
{ph('yikebike', 'A black carbon YikeBike, a folding electric vehicle with a large front wheel, a small rear wheel and handlebars beside the seat', 'The YikeBike Carbon, a folding electric vehicle designed in Christchurch and launched in 2009.')}
<p>Not every machine in the collection burns petrol. The <b>YikeBike</b>, designed in Christchurch and launched at the Eurobike trade fair in 2009, is a folding electric vehicle that weighs about 11 kg. It turns the penny-farthing around: a large front wheel driven by a hub motor, a tiny rear wheel, and handlebars beside the rider's hips. Its museum label gives a lithium iron phosphate battery that charges to 80 % in about 20 minutes, a top speed of 23 km/h and a range of about 20 km. Small as it is, it has the same three main parts as any electric motorcycle: battery, controller and motor. <a href="../how-electric-motorcycles-work/">How electric motorcycles work</a> and <a href="{L}m5-architecture">module 6</a> explain each one.</p>

<h2 id="southland-custom">Made in the USA, perfected in Southland</h2>
{pair(ph('custom-softail', 'A heavily customised Harley-Davidson with tall chrome handlebars, airbrushed paintwork, whitewall tyres and chrome engine covers', 'A local custom: a Harley-Davidson V-twin rebuilt with chrome, paint and very tall bars.'),
      ph('custom-tank-art', 'Top view of a custom motorcycle tank painted with a sunset beach scene, palm trees and a small car, with chrome handlebars', 'Painted tank art seen from above: a beach, palm trees and a building, in airbrushed colour.'))}
<p>The last bike on the tour is a local one. A Harley-Davidson V-twin, the direct descendant of the grey 11F, has been rebuilt in Southland with tall chrome handlebars, airbrushed paint, whitewall tyres and polished covers. The plinth puts it simply: made in the USA, perfected in Southland, New Zealand. Under all the chrome the engine is still two cylinders in a V on one crankshaft, a century after the bikes by the windows.</p>

<h2 id="why-it-matters">What a museum teaches a mechanic</h2>
<p>Walking from the Motosacoche to the CBX is a lesson in how few ideas a motorcycle is really built from. Every machine in the building has a frame, two wheels, an engine that turns fuel into rotation, a way to get that rotation to the back wheel, a spark, and a way to stop. What changes is how each problem is solved: belt, chain or shaft; one cylinder or six; magneto or battery and coil; a bicycle fork or modern suspension. Learn the idea once and you can work on any of them.</p>
<h3 id="burt-munro">The World's Fastest Indian</h3>
{ph('worlds-fastest-indian', 'A long, low streamlined Indian land-speed motorcycle with an aluminium tail and exposed engine, behind a chain barrier', 'One of the motorcycles built for the film The World\'s Fastest Indian, on display in the museum.')}
<p>No visit to Invercargill is complete without Burt Munro, the local mechanic who rebuilt a 1920 Indian Scout in his shed and set an under-1,000 cc speed record on the Bonneville Salt Flats in 1967, at the age of 68. His story became the film <i>The World's Fastest Indian</i>. The museum shows motorcycles made for that film, and Burt's original machine is kept elsewhere in the town. He made many of his own parts, including pistons he cast himself, which is the best reminder in the building that a determined mechanic with simple tools can still teach the factories something.</p>
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
    lead='At the bottom of New Zealand, in old brick buildings, around three hundred motorcycles tell the whole story of how a motorcycle is built. We walked through them in order, from a 1902 bicycle with an engine to a six-cylinder Honda and a folding electric.',
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
