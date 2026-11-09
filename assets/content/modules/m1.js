/* Motopedia: Module 1 lessons. Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "foundations",
  "num": "1",
  "title": "Foundations: the machine, its anatomy and the workshop",
  "intro": "How the motorcycle evolved, how its systems divide and connect, the physics that governs it, and the safe working methods, tools and measurements every later module depends on.",
  "pdf": "motopedia-module-1-foundations.pdf",
  "chapters": [
    {
      "id": "m1-history-systems",
      "title": "A short history and the motorcycle as a system",
      "lead": "Every part on a modern motorcycle is an answer to a problem someone hit along the way: a bike that could not idle, a front wheel that slid, exhaust that broke the emission rules. Knowing that story, and seeing the machine as a set of connected systems, is what lets you diagnose it later.",
      "lab": "overview/?mode=4t&part=engine",
      "blocks": [
        {
          "type": "h3",
          "text": "Four inventions had to meet"
        },
        {
          "type": "p",
          "html": "A practical motorcycle needed four things to exist at roughly the same time: a <strong>compact engine</strong> (practical petrol engines from about 1885), the <strong>pneumatic tyre</strong> (Dunlop 1888, Michelin 1895), the <strong>bush roller chain</strong> (Renold 1880) and a <strong>frame geometry</strong> able to carry rider and engine (the Starley safety bicycle, 1886)."
        },
        {
          "type": "p",
          "html": "The first powered two-wheelers used steam. Louis Guillaume Perreaux patented a small steam engine on 26 December 1868, fitted by 1871 to a Michaux iron-framed velocipede with a pulley drive to the rear wheel, and Sylvester Roper built a comparable machine in the United States around 1867&ndash;69. Steam needed a boiler, fuel and water on board, which is why the compact petrol engine, not steam, made the motorcycle practical."
        },
        {
          "type": "table",
          "head": [
            "Year",
            "Milestone",
            "What it solved (or showed)"
          ],
          "rows": [
            [
              "1868",
              "Perreaux steam engine patent, fitted to a Michaux velocipede",
              "First powered two-wheelers used steam"
            ],
            [
              "1876",
              "Otto runs a four-stroke engine",
              "The basis of almost every later petrol engine"
            ],
            [
              "1885",
              "Daimler and Maybach Reitwagen",
              "Small high-speed petrol engine in a frame, built as a test bed"
            ],
            [
              "1894",
              "Hildebrand &amp; Wolfm&uuml;ller, first series &ldquo;motorrad&rdquo;",
              "About 1,000 built; no flywheel or gearbox, so it could not idle or pull away cleanly"
            ],
            [
              "1901",
              "New Werner",
              "Engine moved low between the wheels: the layout standard by about 1903"
            ],
            [
              "1937",
              "Triumph Speed Twin",
              "Parallel twin copied for half a century"
            ],
            [
              "1958",
              "Honda C100 Super Cub",
              "49 cc OHV four-stroke step-through; passed 100 million units in 2017"
            ],
            [
              "1969",
              "Honda CB750",
              "OHC inline-four and front disc brake for the mass market"
            ],
            [
              "2015",
              "Gogoro battery swapping (Taiwan)",
              "Two-minute stop replaces hours of charging"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Nikolaus Otto ran a four-stroke engine in 1876, and in 1885 Gottlieb Daimler and Wilhelm Maybach mounted a small high-speed petrol engine in a wooden frame with outrigger wheels. Their <em>Reitwagen</em> was built to test the engine rather than to sell, but it showed that a petrol engine could be light enough to carry on two wheels."
        },
        {
          "type": "p",
          "html": "The <strong>Hildebrand &amp; Wolfm&uuml;ller of 1894</strong> was a water-cooled 1,489 cc twin whose connecting rods drove cranks on the rear wheel directly, as on a locomotive. With no flywheel, clutch or gearbox it could not idle with the machine stationary, torque reached the wheel in large pulses, and engine speed could not be matched to road speed. About a thousand were built before the company failed in 1897: proof of demand, and proof that direct drive was a dead end."
        },
        {
          "type": "p",
          "html": "The 1897 Werner carried its engine above the front wheel, which raised the centre of mass and made the front wheel prone to slide. The <strong>1901 New Werner</strong> moved the engine down to the bottom-bracket position between the wheels, lowering the centre of mass, loading the driven rear wheel and leaving room for the tank above. By about 1903 that layout was established practice, and it is still the layout of the K-Light 125."
        },
        {
          "type": "plate",
          "id": "F01",
          "caption": "The layout that won: engine low and central, tank above it, chain to the rear wheel."
        },
        {
          "type": "photo",
          "src": "curtiss-1907.jpg",
          "caption": "An early Curtiss racing motorcycle with an air-cooled multi-cylinder engine slung low in a bicycle-derived diamond frame, belt-free direct drive and a sprung saddle: the layout that the first decade of motorcycling inherited from the safety bicycle."
        },
        {
          "type": "h3",
          "text": "From the interwar years to mass production"
        },
        {
          "type": "p",
          "html": "Indian (1901) and Harley-Davidson (1903) were the two American makers to survive the 1930s. The interwar years brought overhead valves, chain final drive and Edward Turner's 1937 Triumph Speed Twin. Alfred Scott's water-cooled two-stroke twins won the Isle of Man Senior TT in 1912 and 1913, and DKW's loop-scavenged RT125, copied after 1945 as the BSA Bantam, the Harley-Davidson Hummer and Yamaha's first product, the YA-1, became the template for cheap motorised transport."
        },
        {
          "type": "p",
          "html": "The hydraulically damped telescopic fork became general just after the Second World War. From the late 1950s Japanese mass production changed the economics of the motorcycle: the Honda Super Cub of 1958 used a 49 cc overhead-valve four-stroke with an automatic centrifugal clutch and is generally described as the most-produced motor vehicle in history, and the CB750 of 1969 brought an overhead-camshaft inline-four and a front disc brake to the mass market."
        },
        {
          "type": "check",
          "q": "m1-01"
        },
        {
          "type": "h3",
          "text": "Why two-strokes and carburettors disappeared"
        },
        {
          "type": "p",
          "html": "A ported two-stroke lets fresh charge in while the exhaust port is still open, so some fuel short-circuits straight out, and it burns its lubricating oil. Its hydrocarbon emissions are <strong>many times</strong> those of a four-stroke, and rules from the US EPA (late 1970s) to Euro 3 (2006) and Bharat Stage II/III (2005&ndash;2010) pushed road two-strokes out."
        },
        {
          "type": "p",
          "html": "Euro 4 (2016), Euro 5 (2020) and BS-VI (April 2020) then require the mixture to sit at <strong>stoichiometric, 14.7:1</strong>, so a three-way catalyst can work. That means electronic fuel injection with an oxygen sensor, now even on 100&ndash;125 cc commuters like the K-Light 125."
        },
        {
          "type": "photo",
          "src": "repair-photos/155_translation_english_yes_right.jpg",
          "caption": "Replica of the 1885 Daimler riding car, an early motorcycle. Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "photo",
          "src": "repair-photos/155_translation_english_yes_right_2.jpg",
          "caption": "Single-cylinder engine of the 1885 Daimler riding car. Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "photo",
          "src": "repair-photos/155_translation_english_yes_right_4.jpg",
          "caption": "Drawing from Daimler's 1885 engine patent. Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A three-way catalyst converts HC, CO and NOx together only in a narrow window around \\(\\lambda = 1\\), the stoichiometric mixture. Holding that window at every load and temperature means measuring exhaust oxygen and correcting the fuel quantity every few engine cycles. An ECU-controlled injector can do this in closed loop; a fixed-jet carburettor, which meters fuel from air flow alone, cannot. Road two-strokes survive only in off-road competition, some direct-injection designs and older fleets."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Braking rules at a glance",
          "html": "EU (Reg. 168/2013): <strong>ABS above 125 cc</strong> (new types 2016, all new registrations 2017); ABS or CBS in the 125 cc class. India: ABS above 125 cc, CBS at or below 125 cc (new models April 2018, all models April 2019)."
        },
        {
          "type": "h3",
          "text": "The electric transition"
        },
        {
          "type": "p",
          "html": "China's fleet of electric two-wheelers is commonly estimated at more than 300 million, and India's electric two-wheeler sales passed one million a year in the mid-2020s. In East Africa, where motorcycle taxis (boda bodas in Kenya and Uganda, motos in Rwanda) carry a large share of urban trips, firms such as Roam, Spiro and Ampersand build or import electric motorcycles and run battery-swapping networks, a model taken to scale by Gogoro in Taiwan from 2015."
        },
        {
          "type": "p",
          "html": "Swapping separates battery cost from vehicle cost. In the workshop an electric machine has no oil, valves or exhaust, but its high-voltage pack needs its own safe working method (Chapter 1.5)."
        },
        {
          "type": "h3",
          "text": "The motorcycle as a set of systems"
        },
        {
          "type": "p",
          "html": "Divide the machine into systems, each with an input, an output and its own failure modes. A misfire can start in the plug, cap, coil, pickup coil, ECU, ignition switch or wiring; if you see ignition as a <em>chain from trigger to spark</em>, you can test the links in order."
        },
        {
          "type": "table",
          "head": [
            "System",
            "Function",
            "Internal-combustion parts",
            "Electric equivalent"
          ],
          "rows": [
            [
              "Power unit",
              "Stored energy to shaft torque",
              "Head, valves, cylinder, piston, conrod, crank, crankcase, lubrication, cooling",
              "Motor (stator, rotor, magnets, bearings), inverter"
            ],
            [
              "Fuel and air",
              "Meters fuel and air, expels exhaust",
              "Tank, pump, injector or carb, throttle body, airbox, header, catalyst, silencer",
              "Battery pack and BMS"
            ],
            [
              "Ignition and electrical",
              "Fires the charge on time, supplies all loads",
              "Pickup coil, ECU or CDI, coil, plug, alternator, reg/rec, battery, starter, lights",
              "Traction pack, DC-DC to 12 V, VCU, CAN bus"
            ],
            [
              "Transmission",
              "Matches engine speed and torque to road",
              "Primary drive, clutch, gearbox, chain/belt/shaft; CVT on scooters",
              "Usually one fixed reduction"
            ],
            [
              "Chassis",
              "Carries loads, steers, absorbs bumps, brakes",
              "Frame, steering head, fork, swingarm, shocks, wheels, tyres, brakes",
              "Same; battery often structural"
            ],
            [
              "Controls and instruments",
              "Rider commands and monitors",
              "Throttle, levers, gear lever, pedal, switches, instruments",
              "Throttle, regen control, ride modes, SoC display"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Many faults sit at the <strong>boundaries</strong>. A loose engine bolt on a stressed-engine frame feels like wheel imbalance; a failing regulator/rectifier starves the fuel pump and injector and looks like a fuelling fault."
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Systems involved",
            "First check"
          ],
          "rows": [
            [
              "Vibration that feels like wheel imbalance",
              "Chassis and power unit",
              "Engine mounting bolts on a stressed-engine frame (<a href=\"../repair/repairs/engine-mount-check/\">Check engine mounting bolts</a>)"
            ],
            [
              "Hesitation, stalling or poor idle on an EFI bike",
              "Electrical and fuel",
              "Charging voltage before the injector: a weak regulator/rectifier starves pump and injector (<a href=\"../repair/repairs/charging-system-test/\">Test the charging system</a>)"
            ],
            [
              "Headlight and idle erratic at the same time",
              "Electrical (shared supply)",
              "Regulator/rectifier, battery and earth connections, because both loads share the supply voltage"
            ],
            [
              "Misfire",
              "Ignition chain",
              "Plug, cap, coil, pickup coil, ECU, ignition switch and wiring, tested in order from trigger to spark"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Diagnosing from facts"
        },
        {
          "type": "p",
          "html": "A system view only helps if the diagnosis rests on evidence. A fault that appears at the same engine speed every time is a repeatable fact; a rider's account of a fault that comes and goes is a witness fact to be confirmed; a machine that stood unused for years before the fault appeared carries a history that makes stale fuel, flat batteries and seized brakes likely."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Collect the facts",
              "html": "Ask when the fault started, whether it was sudden or gradual, what changed recently, and in what conditions it appears. Confirm it yourself where it is safe to do so."
            },
            {
              "title": "Name the systems involved",
              "html": "Use the system table: a no-start involves fuel, ignition, compression and the starting circuit; a vibration involves the chassis and the power unit."
            },
            {
              "title": "Rank the possible causes",
              "html": "Form several explanations and rank them by how well they fit the facts and how common they are on that type of machine."
            },
            {
              "title": "Test the cheapest likely link first",
              "html": "A quick check that rules out a whole system (spark present, battery voltage correct) is worth more than replacing a part on a guess."
            },
            {
              "title": "Re-rank after every result",
              "html": "Each test result raises or lowers the likelihood of each explanation. Stop repeating a test that has already given its answer, such as kicking an engine that has not started after a handful of kicks."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Where the energy goes"
        },
        {
          "type": "p",
          "html": "An energy balance shows where the fuel goes and where the losses can be cut. It starts with how much energy the tank holds, then multiplies the efficiency of each stage between the fuel and the road."
        },
        {
          "type": "eq",
          "id": "m1-tank-energy",
          "name": "Chemical energy in a tank of fuel",
          "tex": "E = V\\, e_V",
          "where": [
            [
              "E",
              "chemical energy stored",
              "MJ"
            ],
            [
              "V",
              "volume of fuel",
              "L"
            ],
            [
              "e_V",
              "energy per litre (about 32 for petrol)",
              "MJ/L"
            ]
          ],
          "why": "Gives the energy a full tank carries, for comparing petrol and battery machines and for estimating range. Divide by 3.6 to convert MJ to kWh.",
          "example": "The K-Light 125's 11.8 L tank: \\(E = 11.8 \\times 32 = 377.6\\ \\mathrm{MJ}\\), and \\(377.6 / 3.6 = 104.9\\ \\mathrm{kWh}\\)."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Petrol",
              "v": "43 MJ/kg",
              "p": "32 MJ per litre"
            },
            {
              "l": "K-Light tank",
              "v": "&asymp; 105 kWh",
              "p": "\\(11.8\\ \\mathrm{L} \\times 32\\ \\mathrm{MJ/L} = 378\\ \\mathrm{MJ}\\)"
            },
            {
              "l": "Tank to road",
              "v": "&asymp; 22 %",
              "p": "about a fifth reaches the road"
            },
            {
              "l": "Battery to wheel",
              "v": "80&ndash;88 %",
              "p": "electric drive, plus regen"
            }
          ]
        },
        {
          "type": "eq",
          "id": "m1-efficiency-chain",
          "name": "Efficiency chain from tank to road",
          "tex": "\\eta_{total} = \\eta_{engine}\\,\\eta_{primary}\\,\\eta_{gearbox}\\,\\eta_{chain}\\,\\eta_{tyre}",
          "where": [
            [
              "\\eta_{total}",
              "fraction of fuel energy that becomes propulsive work",
              ""
            ],
            [
              "\\eta_{engine}",
              "brake thermal efficiency averaged over a ride",
              ""
            ],
            [
              "\\eta_{primary}",
              "primary drive efficiency",
              ""
            ],
            [
              "\\eta_{gearbox}",
              "gearbox efficiency (two gear pairs per ratio)",
              ""
            ],
            [
              "\\eta_{chain}",
              "final-drive chain efficiency",
              ""
            ],
            [
              "\\eta_{tyre}",
              "tyre efficiency (rolling and slip losses)",
              ""
            ]
          ],
          "why": "Shows that the engine is by far the largest loss, and that a dry or rusty chain is the largest loss the owner can fix. The same product, with battery, inverter, motor and reduction factors, gives the battery-to-wheel figure for an electric machine.",
          "example": "\\(\\eta_{total} \\approx 0.25 \\times 0.98 \\times 0.96 \\times 0.96 \\times 0.97 \\approx 0.22\\): roughly a fifth of the fuel energy reaches the road."
        },
        {
          "type": "table",
          "head": [
            "Stage",
            "Efficiency"
          ],
          "rows": [
            [
              "Engine (averaged over a ride)",
              "0.25 (best 28&ndash;32 %, stop-start 15&ndash;22 %)"
            ],
            [
              "Primary drive",
              "0.98"
            ],
            [
              "Gearbox (two gear pairs)",
              "0.96"
            ],
            [
              "Chain (clean, lubed, tensioned)",
              "0.96 (95&ndash;98 %; far less when dry or rusty)"
            ],
            [
              "Tyre",
              "0.97"
            ],
            [
              "<strong>Total</strong>",
              "\\(0.25 \\times 0.98 \\times 0.96 \\times 0.96 \\times 0.97 \\approx 0.22\\)"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The engine loses most because a small air-cooled four-stroke turns at best about 28&ndash;32 % of the fuel energy into crankshaft work, and nearer 15&ndash;22 % in stop-start riding, where pumping losses at part throttle are high. The rest leaves as heat in the exhaust, through the fins and in the oil. Primary drive, gearbox and chain together give a transmission efficiency of 85&ndash;92 %, and the tyre loses a little more in rolling resistance and slip."
        },
        {
          "type": "p",
          "html": "Electric drive swaps the engine factor for battery (95&ndash;98 %), inverter (95&ndash;98 %), motor (90&ndash;95 %) and reduction (95&ndash;98 %). The catch is storage: a lithium pack holds <strong>0.12&ndash;0.20 kWh/kg</strong> against about 12 kWh/kg for petrol, which is why electric two-wheelers won first on short urban trips and why swapping suits high-mileage taxi work."
        },
        {
          "type": "p",
          "html": "Even with roughly four times the efficiency, an electric motorcycle therefore carries several times more energy-storage mass per kilometre of range. That one fact explains why electric two-wheelers succeeded first on short urban trips, and why a fleet that needs long daily distances swaps batteries instead of carrying a larger one."
        },
        {
          "type": "callout",
          "tone": "elec",
          "title": "Why swapping suits taxi fleets",
          "html": "A swap takes one to two minutes so the bike keeps earning; the rider pays per swap instead of financing a battery worth a third or more of the vehicle; the operator manages battery health centrally; and stations need only modest grid capacity spread over the day."
        },
        {
          "type": "p",
          "html": "In the end every force acts through the rear tyre contact patch, only about <strong>20&ndash;40 cm&sup2;</strong> on a commuter tyre. Its friction limits all acceleration, cornering and braking (Chapter 1.4)."
        },
        {
          "type": "h3",
          "text": "Reading a machine's age in the workshop"
        },
        {
          "type": "p",
          "html": "The history above is also a workshop tool. Every machine that comes in carries the technology of the years it was built, and recognising that technology tells you which manual, tools and tests the job needs before a single fastener is turned."
        },
        {
          "type": "table",
          "head": [
            "What you see",
            "What it tells you",
            "Workshop consequence"
          ],
          "rows": [
            [
              "Contact points and a condenser under a cover on the crankshaft end",
              "Battery-coil or magneto ignition, from before electronic ignition became general",
              "Points gap and ignition timing need periodic setting (Chapter 4.4)"
            ],
            [
              "Carburettor with a float bowl, no oxygen sensor in the exhaust",
              "Built before Euro 4, Euro 5 and BS-VI pushed injection onto small engines",
              "Jetting, float height and idle settings are adjustments, not faults (Chapter 3.3)"
            ],
            [
              "Throttle body, injector and an oxygen sensor in the header",
              "Closed-loop fuel control for a three-way catalyst",
              "Read fault codes and test sensors before adjusting anything (Chapter 3.4)"
            ],
            [
              "Two-stroke with an oil tank and a cable to an oil pump, or a premix label",
              "Two-stroke lubricated by oil injection or by oil in the fuel",
              "Pump setting and bleeding, or the correct premix ratio (Chapter 2.3)"
            ],
            [
              "Toothed ABS ring on a hub, or a lever that applies both brakes",
              "ABS or CBS, required on new machines from 2016&ndash;2019 depending on market",
              "ABS and CBS checks and warning-lamp diagnosis (Chapter 5.7)"
            ],
            [
              "Orange cables and a service disconnect",
              "Electric drive with a high-voltage pack",
              "Isolate and prove absence of voltage before any work (Chapter 1.5, Module 6)"
            ],
            [
              "Inch or Whitworth bolt heads",
              "Older British or American machine",
              "Different spanners and thread standards (Chapter 1.6)"
            ],
            [
              "Cross-head screws, some with a small dot on the head",
              "Japanese JIS screws",
              "Use a JIS bit, not a Phillips bit (Chapter 1.6)"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Confirm what you see from the numbers on the machine. The frame number is stamped on the steering head (on newer machines it is the 17-character VIN) and the engine number on a pad on the crankcase. Parts catalogues and specification tables are organised by model code and year, and models often change partway through a year, so the number decides which row of the table applies: <a href=\"../repair/repairs/frame-engine-number-find/\">Find and read the frame and engine numbers</a>, then <a href=\"../repair/repairs/spec-sheet-read/\">Read a specification table for your bike</a>."
        },
        {
          "type": "h3",
          "text": "Worked example: one tank, two machines"
        },
        {
          "type": "p",
          "html": "The energy figures above become concrete when followed through one full tank of the K-Light 125 and compared with an electric machine that delivers the same work to the road. Every number comes from this chapter; only the arithmetic is new."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Energy in the tank",
              "html": "\\(11.8\\ \\mathrm{L} \\times 32\\ \\mathrm{MJ/L} = 378\\ \\mathrm{MJ}\\), about 105 kWh. Since petrol holds 43 MJ/kg and 32 MJ/L, a litre weighs about \\(32 / 43 \\approx 0.74\\ \\mathrm{kg}\\), so the full tank of fuel weighs only about 8.8 kg."
            },
            {
              "title": "Work at the crankshaft",
              "html": "At an average engine efficiency of 0.25, about \\(105 \\times 0.25 \\approx 26\\ \\mathrm{kWh}\\) becomes crankshaft work. The other 79 kWh or so leave as heat through the exhaust, the fins and the oil."
            },
            {
              "title": "Work at the road",
              "html": "Primary drive, gearbox, chain and tyre together pass \\(0.98 \\times 0.96 \\times 0.96 \\times 0.97 \\approx 0.88\\) of it, so about 23 kWh drives the machine. Roughly 3 kWh is lost as heat in gears, chain and tyre."
            },
            {
              "title": "The electric equivalent",
              "html": "To put the same 23 kWh on the road at 80&ndash;88 % battery to wheel, a pack must store about 26&ndash;29 kWh. At 0.12&ndash;0.20 kWh/kg that pack weighs roughly 130&ndash;240 kg, against 8.8 kg of petrol."
            },
            {
              "title": "What it means",
              "html": "No commuter can carry a pack of that mass, so electric two-wheelers carry a fraction of the energy, accept a shorter range and recharge or swap often. Their efficiency advantage is real, but it cannot close a gap in storage density of this size."
            }
          ]
        },
        {
          "type": "p",
          "html": "The example also shows what maintenance is worth. Every percentage point lost in a dry chain, a dragging brake or an under-inflated tyre comes straight off the 23 kWh at the road, and appears as heat and wear in the part that wastes it."
        },
        {
          "type": "h3",
          "text": "A worked fault through the system view"
        },
        {
          "type": "p",
          "html": "A fuel-injected commuter is brought in because it hesitates and sometimes stalls at idle, mostly at night. The system view turns that complaint into an ordered set of tests instead of a guess at the most expensive part."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Collect the facts",
              "html": "The fault is worse with the headlight on and at low engine speed, and it began gradually. Confirm it on a short, safe test: with the lights on, the idle is uneven."
            },
            {
              "title": "Name the systems involved",
              "html": "Fuel (pump and injector) and electrical (battery, charging). Both injector and fuel pump depend on supply voltage, so the fault may sit at the boundary between the two systems."
            },
            {
              "title": "Test the cheapest likely link first",
              "html": "Measure the charging voltage at the battery at 5,000 rpm with the lights on. The K-Light 125 expects 14.5 &plusmn; 0.5 V: <a href=\"../repair/repairs/charging-system-test/\">Test the charging system</a>."
            },
            {
              "title": "Follow the result",
              "html": "Below the range, test the regulator/rectifier, stator and connectors (Chapter 4.2): <a href=\"../repair/repairs/regulator-test/\">Test the regulator/rectifier</a>. Within the range, move to fuel pressure and the injector (Chapter 3.4)."
            },
            {
              "title": "Prove the repair",
              "html": "Repeat the test under the conditions that produced the fault: lights on, idle, after dark. A fault that cannot be reproduced after the repair is a fault that has been found."
            }
          ]
        },
        {
          "type": "p",
          "html": "The order matters as much as the tests. A new injector fitted on a hunch would not have cured a low charging voltage, the fault would have returned, and the battery would have gone on discharging. The general method is in <a href=\"../repair/repairs/diagnosis-method/\">Diagnose methodically</a>."
        },
        {
          "type": "check",
          "q": "m1-05"
        },
        {
          "type": "check",
          "q": "m1-31"
        },
        {
          "type": "check",
          "q": "m1-32"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "A practical motorcycle needed a compact engine, the pneumatic tyre, the bush roller chain and the safety-bicycle frame; the New Werner layout of 1901 set the pattern still used.<br>Emission limits ended road two-strokes and carburettors: a three-way catalyst needs \\(\\lambda = 1\\), which needs closed-loop fuel injection with an oxygen sensor.<br>EU and Indian rules require ABS above 125 cc and ABS or CBS at or below 125 cc.<br>Dividing a machine into systems, and diagnosing from facts, lets each link be tested in order; many faults sit at system boundaries.<br>Only about 22 % of the fuel energy reaches the road, against 80&ndash;88 % battery to wheel, but a lithium pack stores far less energy per kilogram than petrol."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "mdOJ717PKRc",
              "title": "How Motorcycles Work - The Basics",
              "channel": "TecknoMechanics",
              "channel_url": "http://www.youtube.com/@TecknoMechanics",
              "duration": "4:29",
              "role": "How it works",
              "note": "Short animated tour of the main systems of a four-stroke motorcycle."
            }
          ]
        }
      ]
    },
    {
      "id": "m1-types",
      "title": "Types and configurations",
      "lead": "A pedelec, a Super Cub, a boda boda commuter and a 450 cc motocross bike all have two wheels, but they answer different jobs and fall into different legal classes. This chapter sorts them by use, by law, by engine layout and by frame.",
      "lab": "overview/?mode=2t&part=frame",
      "blocks": [
        {
          "type": "h3",
          "text": "Categories by use"
        },
        {
          "type": "table",
          "head": [
            "Type",
            "What defines it"
          ],
          "rows": [
            [
              "Pedelec / e-bike",
              "Assists only while pedalling; up to 250 W and 25 km/h is legally a bicycle (EN 15194). 45 km/h speed pedelecs are L1e-B mopeds."
            ],
            [
              "Moped",
              "Up to 45 km/h, 50 cc or 4 kW electric"
            ],
            [
              "Step-through / underbone",
              "Spine frame, near-horizontal 50&ndash;125 cc single, 17-inch wheels, semi-automatic gearbox with centrifugal clutch, leg shields"
            ],
            [
              "Scooter",
              "10&ndash;14 inch wheels, floorboard, unit-swing engine with CVT; high unsprung mass is the main compromise"
            ],
            [
              "Commuter / standard",
              "Air-cooled two-valve 100&ndash;150 cc single, 4&ndash;5 speeds, chain, steel frame, twin shocks; 1.5&ndash;2.5 L/100 km"
            ],
            [
              "Sport, touring, adventure, cruiser",
              "Sport: high-revving 600/1000 cc, twin-spar frame. Adventure: 19 or 21 in front. Cruiser: low seat, raked-out front, slow-revving V-twin"
            ],
            [
              "Motocross / enduro / trials",
              "MX: 90&ndash;105 kg (YZ125), about 300 mm travel, 21/19 in knobbies, no lights. Enduro adds lights; trials has very low gearing"
            ],
            [
              "Electric",
              "2&ndash;5 kW hub-motor commuters, 7&ndash;15 kW mid-drives (Roam Air), 80&ndash;110 kW performance bikes; 2&ndash;15 kWh pack"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The boundaries in the table are legal as much as technical. A <strong>pedelec</strong> assists only while the rider pedals, with no more than 250 W continuous rated power and assistance ending at 25 km/h, and is tested to EN 15194 as a bicycle. More power, a throttle that works without pedalling, or assistance above 25 km/h makes it a moped, with registration, insurance and a licence."
        },
        {
          "type": "p",
          "html": "<strong>Step-throughs and underbones</strong> such as the Super Cub hang a near-horizontal single beneath a low pressed-steel or tubular spine, so the rider mounts without lifting a leg over a tank and can carry heavy loads on a rack. The semi-automatic gearbox with centrifugal clutch lets a novice ride in traffic without mastering a clutch lever."
        },
        {
          "type": "models",
          "files": [
            "bike_classic_4t",
            "bike_mx_2t",
            "bike_electric"
          ],
          "caption": "The three reference machines modelled for this course: a classic air-cooled four-stroke roadster with twin shocks and wire wheels, a two-stroke motocross bike with USD fork, linkage monoshock and expansion chamber, and an electric scrambler whose battery pack fills the space of tank and engine."
        },
        {
          "type": "plate",
          "id": "F04",
          "caption": "Automatic scooter with the CVT cover cut away: engine, variator, belt and rear wheel all swing together."
        },
        {
          "type": "p",
          "html": "On a unit-swing scooter the engine, CVT and wheel pivot as one, so <strong>20&ndash;35 kg</strong> moves with the wheel instead of being isolated by the shock. The wheel follows bumps less closely, ride is harsher and grip on broken surfaces falls. A mid-drive electric keeps the motor in the frame for the same reason; a hub motor is simpler but adds several kilograms to the wheel."
        },
        {
          "type": "p",
          "html": "In a <strong>scooter</strong> the CVT runs a rubber V-belt between two variable pulleys, so the rider only twists the throttle. The Honda PCX (125&ndash;160 cc) is typical of the modern form, with 10&ndash;14 inch wheels, a flat floorboard and enclosing bodywork. Belt, rollers and clutch in the CVT are wear parts with their own service intervals (<a href=\"../repair/repairs/cvt-belt-replace/\">Replace the CVT belt</a>)."
        },
        {
          "type": "plate",
          "id": "F16",
          "caption": "Inside the scooter CVT: at low ratio the belt rides deep in the drive pulley for pulling away; at high ratio it climbs outward for cruising."
        },
        {
          "type": "p",
          "html": "The <strong>commuter</strong> class (Honda CG125, Bajaj Boxer, Hero Splendor, K-Light 125) dominates world sales and the taxi trade because it is cheap to buy, uses 1.5&ndash;2.5 L/100 km and can be repaired with hand tools. Its air-cooled two-valve single, four- or five-speed gearbox with manual wet clutch, chain drive, tubular steel frame, telescopic fork and twin rear shocks are the parts this course uses as its reference. Larger standards and naked bikes (300&ndash;1000 cc) keep the upright position with more power."
        },
        {
          "type": "p",
          "html": "<strong>Sport</strong> bikes place the rider forward over a high-revving engine in an aluminium twin-spar frame, with steep steering geometry, adjustable suspension, four-piston radial calipers and a full fairing. <strong>Touring</strong> machines prioritise load, comfort, range and weather protection, often with shaft drive. <strong>Adventure</strong> bikes add long-travel suspension, a 19- or 21-inch front wheel and high ground clearance for unpaved roads. <strong>Cruisers</strong> have a low seat, forward footpegs, a long raked-out front end and usually a slow-revving V-twin tuned for low-speed torque."
        },
        {
          "type": "p",
          "html": "<strong>Off-road</strong> machines split by event. Motocross bikes are closed-circuit competition machines with a 125 cc two-stroke or a 250/450 cc four-stroke and no lights; enduro bikes add lights, quieter exhausts and wider gear ratios for road-legal events; trials bikes have almost no seat, very low gearing and soft low-pressure tyres for climbing obstacles at walking pace."
        },
        {
          "type": "p",
          "html": "<strong>Electric</strong> machines differ mainly in where the motor sits. A <strong>mid-drive</strong> places a permanent-magnet synchronous motor (PMSM) in the frame and drives the rear wheel by belt or chain, keeping unsprung mass low; a <strong>hub motor</strong> is simpler and cheaper but adds several kilograms to the wheel. Performance machines from Zero and Energica reach 80&ndash;110 kW, while the 2&ndash;15 kWh pack occupies the space of tank and engine."
        },
        {
          "type": "h3",
          "text": "Legal classes and licences (EU)"
        },
        {
          "type": "p",
          "html": "The EU classifies two- and three-wheeled vehicles and quadricycles as <strong>L-category</strong> under Regulation (EU) No 168/2013, which also sets the emission stage: Euro 5 from 2020, with Euro 5+ durability and diagnostic requirements phased in from 2024&ndash;2025. Many UNECE countries share the same definitions."
        },
        {
          "type": "table",
          "head": [
            "Class",
            "Description",
            "Main limits",
            "Licence"
          ],
          "rows": [
            [
              "L1e-A",
              "Powered cycle",
              "Assistance to 25 km/h, up to 1 kW",
              "&ndash;"
            ],
            [
              "L1e-B",
              "Two-wheel moped",
              "45 km/h; 50 cc or 4 kW electric",
              "AM (14&ndash;16)"
            ],
            [
              "L3e-A1",
              "Low-performance motorcycle",
              "125 cc, 11 kW, 0.1 kW/kg",
              "A1 (from 16)"
            ],
            [
              "L3e-A2",
              "Medium-performance",
              "35 kW, 0.2 kW/kg, not derived from more than double the power",
              "A2 (from 18)"
            ],
            [
              "L3e-A3",
              "High-performance",
              "Any L3e above A2",
              "A (24, or 20 after 2 years on A2)"
            ]
          ]
        },
        {
          "type": "table",
          "head": [
            "Class",
            "Description",
            "Main limits"
          ],
          "rows": [
            [
              "L2e",
              "Three-wheel moped",
              "Moped limits on three wheels"
            ],
            [
              "L4e",
              "Motorcycle with sidecar",
              "L3e base vehicle plus one sidecar"
            ],
            [
              "L5e",
              "Powered tricycle",
              "Three wheels, up to 1,000 kg in running order"
            ],
            [
              "L6e",
              "Light quadricycle",
              "Up to 45 km/h, 425 kg, 4 kW (6 kW enclosed)"
            ],
            [
              "L7e",
              "Heavy quadricycle",
              "Up to 450 kg (passenger) or 600 kg (goods), 15 kW on road"
            ]
          ]
        },
        {
          "type": "eq",
          "id": "m1-power-to-mass",
          "name": "Power-to-mass ratio",
          "tex": "\\frac{P}{m}",
          "where": [
            [
              "P",
              "maximum rated power",
              "kW"
            ],
            [
              "m",
              "mass of the machine (kerb mass in the examples here)",
              "kg"
            ]
          ],
          "why": "EU licence classes limit power-to-mass as well as power and displacement: at most 0.1 kW/kg for A1 and 0.2 kW/kg for A2. It is also a first guide to how briskly a machine accelerates.",
          "example": "K-Light 125: \\(7.8 / 145 = 0.054\\ \\mathrm{kW/kg}\\), well inside the A1 limit. A 300 cc twin of 30 kW and 165 kg gives \\(30 / 165 = 0.18\\ \\mathrm{kW/kg}\\), inside the A2 limit of 0.2."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "K-Light 125",
              "v": "124 cc",
              "p": "under the 125 cc A1 limit"
            },
            {
              "l": "Power",
              "v": "7.8 kW",
              "p": "under 11 kW"
            },
            {
              "l": "Power-to-mass",
              "v": "0.054 kW/kg",
              "p": "7.8 / 145 kg, under 0.1"
            }
          ]
        },
        {
          "type": "p",
          "html": "So the K-Light 125 is an <strong>L3e-A1</strong> machine for an <strong>A1</strong> licence. India uses L1 (up to 50 cc and 45 km/h) and L2, with e-scooters of 250 W and 25 km/h or less exempt from registration."
        },
        {
          "type": "p",
          "html": "Directive 2006/126/EC sets the matching licences: <strong>AM</strong> for mopeds (minimum age 14&ndash;16 nationally), <strong>A1</strong> for L3e-A1 machines (from 16), <strong>A2</strong> up to 35 kW and 0.2 kW/kg (from 18), and <strong>A</strong> unrestricted (from 24, or 20 after two years on A2). Kenya's 2016 licence rules separate mopeds, motorcycles and commercial motorcycle taxis; its boda boda fleet is mostly 100&ndash;150 cc commuter singles plus a growing number of electric machines."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Displacement",
              "html": "Read the engine capacity: 125 cc or less is the first condition for L3e-A1."
            },
            {
              "title": "Power",
              "html": "Read the maximum rated power: 11 kW or less for A1, 35 kW or less for A2."
            },
            {
              "title": "Power-to-mass",
              "html": "Divide power by mass: at most 0.1 kW/kg for A1, at most 0.2 kW/kg for A2."
            },
            {
              "title": "Derivation",
              "html": "An A2 machine must not be derived from a version of more than double its power, so a 30 kW machine qualifies only if it is not derived from one of more than 70 kW."
            },
            {
              "title": "Licence",
              "html": "The class that every limit satisfies gives the licence: the K-Light 125 is L3e-A1 and needs an A1 licence."
            }
          ]
        },
        {
          "type": "photo",
          "src": "render-engine-exterior.jpg",
          "caption": "A horizontal single-cylinder engine of the type fitted to step-throughs and commuter motorcycles across Asia and Africa: finned cylinder and head pointing forward, carburettor and intake on top, electric starter behind the cylinder, the large clutch cover on the right and the kickstart lever at the rear."
        },
        {
          "type": "check",
          "q": "m1-08"
        },
        {
          "type": "h3",
          "text": "Engine layouts and balance"
        },
        {
          "type": "p",
          "html": "A piston makes a <strong>primary</strong> shaking force at crank frequency and a smaller <strong>secondary</strong> force at twice crank frequency (from conrod angularity). Counterweights on a single only move part of the primary force from vertical to horizontal, so bigger singles add a balance shaft; multis arrange cylinders to cancel forces."
        },
        {
          "type": "p",
          "html": "The primary force comes from accelerating the piston and small end up and down once per revolution. The secondary force exists because the connecting rod is angled for most of the stroke, so the piston moves faster near the top than near the bottom; that unevenness repeats twice per revolution. Engine layout is chosen partly to make these forces from different cylinders cancel."
        },
        {
          "type": "eq",
          "id": "m1-firing-interval",
          "name": "Firing interval of an evenly fired four-stroke",
          "tex": "\\varphi = \\frac{720^\\circ}{z}",
          "where": [
            [
              "\\varphi",
              "crank angle between successive power strokes",
              "degrees"
            ],
            [
              "z",
              "number of cylinders",
              ""
            ]
          ],
          "why": "A four-stroke fires each cylinder once every two revolutions, so evenly spaced firing divides 720° by the number of cylinders. Uneven layouts such as the 180° and 270° twins depart from it, which gives them their character.",
          "example": "Single: \\(720^\\circ\\). Inline triple: \\(720^\\circ / 3 = 240^\\circ\\). Inline four: \\(720^\\circ / 4 = 180^\\circ\\). A 360° twin fires evenly at \\(720^\\circ / 2 = 360^\\circ\\)."
        },
        {
          "type": "table",
          "head": [
            "Layout",
            "Firing interval (4T)",
            "Balance",
            "Character"
          ],
          "rows": [
            [
              "Single",
              "720&deg;",
              "Primary partly countered; balancer above about 200 cc",
              "Narrow, light, cheap; commuters, off-road"
            ],
            [
              "Parallel twin 360&deg;",
              "360&deg;, 360&deg;",
              "Pistons together: shakes like a big single",
              "Even firing; classic British twins"
            ],
            [
              "Parallel twin 180&deg;",
              "180&deg;, 540&deg;",
              "Primary cancels; rocking couple",
              "Higher-revving 250&ndash;500 cc"
            ],
            [
              "Parallel twin 270&deg;",
              "270&deg;, 450&deg;",
              "Partly cancelled; couple shaft-balanced",
              "V-twin feel, narrow package"
            ],
            [
              "V-twin 90&deg;",
              "270&deg;, 450&deg;",
              "Perfect primary with shared crankpin",
              "Cruisers, Ducati"
            ],
            [
              "Boxer twin",
              "360&deg;, 360&deg;",
              "Primary cancels; small couple",
              "Low centre of mass; BMW"
            ],
            [
              "Inline triple",
              "240&deg;",
              "Primary and secondary balanced; couple shaft-balanced",
              "Torque of a twin, revs of a four"
            ],
            [
              "Inline four",
              "180&deg;",
              "Primary balanced; secondary unbalanced",
              "Smooth, high-revving; sport and touring"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb",
          "html": "Same firing intervals means same pulse rhythm: a 270&deg; parallel twin fires at 270&deg; then 450&deg;, exactly like a 90&deg; V-twin, so it sounds and pulls like one."
        },
        {
          "type": "p",
          "html": "A flat-plane inline four has its primary forces cancelled, but the secondary forces of all four pistons act in the same direction at the same moment. The result is a vertical shake at twice crankshaft frequency, which large fours counter with a balance shaft turning at twice engine speed or isolate with rubber mounts. A single uses counterweights and, above about 200 cc, a balance shaft at engine speed."
        },
        {
          "type": "variants",
          "title": "Engine layouts",
          "intro": "Eight engines from the library. The layout sets the firing rhythm, balance, width and character of the bike. Repair page: <a href=\"../repair/parts/engine/\">engine</a>.",
          "items": [
            {
              "model": "bike_classic_4t__engine",
              "name": "Air-cooled four-stroke single",
              "what": "One upright finned cylinder, firing once every two turns of the crank.",
              "good_for": "Light, narrow and simple, with good pull at low revs and easy repairs.",
              "conditions": "Commuting and touring at moderate speed.",
              "watch": "Vibration at high revs, oil level and valve clearances."
            },
            {
              "model": "bike_mx_2t__engine",
              "name": "Two-stroke single",
              "what": "Fires every turn of the crank. Ports in the cylinder wall replace valves, and an expansion chamber tunes the exhaust.",
              "good_for": "High power for its size and weight, with few moving parts.",
              "conditions": "Off-road competition.",
              "watch": "The right oil mix, piston and ring wear, and plug fouling. The top end needs work much more often than on a four-stroke."
            },
            {
              "model": "bike_cafe_racer__engine",
              "name": "Vertical parallel twin",
              "what": "A 650 cc air-cooled OHV twin with the cylinders side by side, a separate gearbox and magneto ignition.",
              "good_for": "More power and smoother running than a big single in a compact width.",
              "conditions": "Road riding.",
              "watch": "Vibration at high revs (twins of this period usually have a 360 degree crank), oil leaks from old joints, and twin carburettors that must be balanced."
            },
            {
              "model": "bike_vintage_vtwin__engine",
              "name": "F-head V-twin, 1915 to 1925",
              "what": "About 1,000 cc, 45 degree V-twin with the inlet valves above the exhaust valves (inlet over exhaust).",
              "good_for": "Strong pull at low revs from an engine that is narrow across the frame.",
              "conditions": "Steady speeds on period roads.",
              "watch": "Exposed valve springs and rockers need regular oil and adjustment."
            },
            {
              "model": "bike_cruiser__engine",
              "name": "Modern big V-twin",
              "what": "About 1,750 cc, air-cooled 45 degree pushrod V-twin with an oil cooler.",
              "good_for": "Very high torque at low revs and a strong, uneven pulse.",
              "conditions": "Cruising and touring.",
              "watch": "Heat from the rear cylinder in slow traffic, oil level and leaks."
            },
            {
              "model": "bike_superbike__engine",
              "name": "Inline four",
              "what": "A 1000 cc liquid-cooled DOHC four with the cylinders inclined 30 degrees forward.",
              "good_for": "Smooth, high-revving and very powerful.",
              "conditions": "Fast roads and track.",
              "watch": "Coolant level and hoses. Valve clearance checks are long jobs with many parts to remove."
            },
            {
              "model": "bike_pioneer__engine",
              "name": "Atmospheric-valve single, about 1901",
              "what": "About 250 cc. Suction from the falling piston opens the inlet valve against a light spring; only the exhaust valve is worked by a pushrod.",
              "good_for": "Simplicity. The layout that put the first motor-bicycles on the road.",
              "conditions": "Gentle runs at low speed.",
              "watch": "A weak or sticking inlet valve spring stops it running. Ignition is by trembler coil and battery, so the battery must be charged."
            },
            {
              "model": "bike_electric__motor",
              "name": "Electric motor",
              "what": "A permanent-magnet motor fed from the battery by a controller. No combustion and very few moving parts.",
              "good_for": "Full torque from standstill, quiet running, and no oil changes or exhaust.",
              "conditions": "Town and trail riding within the battery range.",
              "watch": "Heat on long climbs, cable and connector condition, and water at the seals. High voltage: work on it only with the system made safe."
            }
          ]
        },
        {
          "type": "check",
          "q": "m1-10"
        },
        {
          "type": "h3",
          "text": "Air or liquid cooling"
        },
        {
          "type": "p",
          "html": "About a third of the fuel energy leaves through cylinder walls and head. Air cooling sheds it from fins with nothing to leak or fail, but temperatures swing more, so clearances are larger and compression lower: <strong>9:1</strong> on the K-Light 125. Liquid cooling holds the engine at about <strong>80&ndash;100 &deg;C</strong>, allowing 11&ndash;13:1 and more output at the cost of pump, radiator, thermostat and hoses."
        },
        {
          "type": "p",
          "html": "Air cooling suits the K-Light 125 for several reasons: 7.8 kW of heat can be shed by fins; with no pump, radiator, hoses or coolant there is less cost, mass and fewer failure points; it is easier to repair where parts are scarce; and a 9:1 compression ratio and two-valve head do not need tight temperature control. Oil-air cooling, with oil sprayed or circulated through hot areas and an oil cooler, is an intermediate solution."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Working on a cooling system",
          "html": "On a liquid-cooled engine, read the coolant level in the overflow reservoir with the engine warm, but open the radiator cap only when the engine is cold: a hot system is pressurised and sprays boiling coolant. On an air-cooled engine, keep the fins clear of mud and oil, since a clogged fin area runs hot (<a href=\"../repair/repairs/coolant-check/\">Check the coolant</a>, <a href=\"../repair/repairs/air-cooling-check/\">Check an air-cooled engine</a>)."
        },
        {
          "type": "plate",
          "id": "F01",
          "caption": "Four-stroke standard road motorcycle with an air-cooled single-cylinder engine, left side elevation."
        },
        {
          "type": "h3",
          "text": "Four-stroke, two-stroke, electric"
        },
        {
          "type": "table",
          "head": [
            "Property",
            "Four-stroke",
            "Two-stroke",
            "Electric"
          ],
          "rows": [
            [
              "Power strokes",
              "One per two revolutions",
              "One per revolution",
              "Continuous torque from zero speed"
            ],
            [
              "Specific power",
              "50&ndash;70 kW/L commuter; 130&ndash;170 sport",
              "100&ndash;200 kW/L",
              "Motor 2&ndash;5 kW/kg"
            ],
            [
              "Peak efficiency",
              "28&ndash;35 %",
              "20&ndash;28 % carburetted",
              "85&ndash;92 %"
            ],
            [
              "Tailpipe emissions",
              "Low with EFI + 3-way cat",
              "High HC and smoke",
              "None at the vehicle"
            ],
            [
              "Maintenance",
              "Oil, valves, plug, filter, cam chain",
              "Frequent piston and rings, decarbonising",
              "Brakes, tyres, chain/belt, battery health"
            ],
            [
              "Cost",
              "Moderate / moderate",
              "Low purchase; high fuel and wear",
              "High purchase (battery 30&ndash;50 %) unless swapped; low running"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A two-stroke reaches roughly twice the specific power of a four-stroke because it fires every revolution instead of every second one. It is no more efficient, and often less, because part of the fresh charge escapes during scavenging, the ports shorten the effective compression and expansion strokes, and residual exhaust dilutes the charge. Electric drive avoids combustion losses altogether, but its specific power is limited by battery mass and by heat in the motor and controller."
        },
        {
          "type": "plate",
          "id": "F02",
          "caption": "Two-stroke motocross motorcycle, showing the expansion chamber and long-travel suspension."
        },
        {
          "type": "plate",
          "id": "F03",
          "caption": "Electric motorcycle with the battery pack, mid-drive motor and controller shown in hidden lines inside the frame."
        },
        {
          "type": "h3",
          "text": "Frame types"
        },
        {
          "type": "p",
          "html": "The frame locates steering head, swingarm pivot and engine; its <strong>torsional stiffness between steering head and pivot</strong> matters more for handling than anything else."
        },
        {
          "type": "plate",
          "id": "FB01",
          "caption": "Underbone, single cradle, double cradle, trellis and twin-spar perimeter compared."
        },
        {
          "type": "model",
          "file": "frame",
          "caption": "A bare tubular steel trellis frame: triangulated tubes from steering head to swingarm pivot plates, with the bolted rear subframe."
        },
        {
          "type": "table",
          "head": [
            "Frame",
            "Strengths",
            "Typical use"
          ],
          "rows": [
            [
              "Backbone / underbone",
              "Cheap; step-through mounting",
              "Super Cub derivatives"
            ],
            [
              "Single cradle",
              "Simple, tough, easy engine removal",
              "Commuter singles (K-Light 125), trail bikes"
            ],
            [
              "Double cradle",
              "Stiffer, carries heavier engines",
              "Classic standards, cruisers"
            ],
            [
              "Perimeter (twin spar)",
              "Highest torsional stiffness for its mass",
              "Sport bikes, modern mid-size"
            ],
            [
              "Trellis",
              "Stiff, light, tunable",
              "Ducati, KTM"
            ],
            [
              "Monocoque / stressed engine",
              "Fewest parts, least mass",
              "Scooters, racing and electric bikes"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Construction follows from the job. An <strong>underbone</strong> is a single large tube or pressed-steel spine with the engine hung below, cheap to mass produce. A <strong>single cradle</strong> has one downtube that splits under the engine, plus a top tube and seat rails, which tolerates rough use and lets the engine drop out easily. A <strong>double cradle</strong> runs two downtubes and lower rails around the engine. A <strong>twin-spar perimeter</strong> frame takes two large beams from the steering head around the engine to the pivot, the stiffest direct path for the least mass. A <strong>trellis</strong> triangulates short straight steel tubes, often with the engine stressed, and is tuned by tube size."
        },
        {
          "type": "p",
          "html": "Whatever its type, a frame that has been crashed or overloaded is inspected before the machine goes back on the road: look for cracked welds near the steering head and engine mounts, kinks in tubes, and a rear wheel that no longer lines up with the front (<a href=\"../repair/repairs/frame-crash-inspect/\">Inspect a frame after a crash</a>)."
        },
        {
          "type": "h3",
          "text": "Comparing running cost: petrol or electric"
        },
        {
          "type": "p",
          "html": "A taxi operator choosing between a 125 cc four-stroke and an electric machine on swapped batteries must compare cost per kilometre over the vehicle's life, not purchase price alone. The factors below are those that usually decide it at high daily mileage."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Purchase and finance",
              "html": "Vehicle price, and for the electric machine whether the battery is bought or rented by subscription."
            },
            {
              "title": "Energy per kilometre",
              "html": "Fuel at about 1.5&ndash;2.5 L/100 km for a commuter single, against swap fees or charging cost per kilometre."
            },
            {
              "title": "Service and parts",
              "html": "Oil, filters, valve adjustment and plugs for the four-stroke; brakes, tyres, chain or belt and bearings for both."
            },
            {
              "title": "Downtime",
              "html": "Daily time lost to refuelling or swapping, and the distance to the nearest swap station."
            },
            {
              "title": "Routes and load",
              "html": "Payload and gradient performance on the actual routes, and grid reliability for charging."
            },
            {
              "title": "Life and resale",
              "html": "Vehicle life, resale value, tax and import duty."
            }
          ]
        },
        {
          "type": "check",
          "q": "m1-33"
        },
        {
          "type": "check",
          "q": "m1-34"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Categories by use (pedelec, moped, step-through, scooter, commuter, sport, touring, adventure, cruiser, off-road, electric) each answer a different job.<br>EU L-categories and licences limit displacement, power and power-to-mass: the K-Light 125 at \\(0.054\\ \\mathrm{kW/kg}\\) is L3e-A1 for an A1 licence.<br>An evenly fired four-stroke fires every \\(720^\\circ / z\\); the 270° twin shares the rhythm of a 90° V-twin.<br>Singles shake at crank frequency and inline fours at twice crank frequency; balance shafts and layout choice reduce both.<br>Air cooling is cheap and simple; liquid cooling allows higher compression and output; two-strokes give power without efficiency.<br>The frame type follows the job, from the cheap underbone to the stiff twin-spar perimeter."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "-3HBAvkc4a0",
              "title": "The Rare Engine that Kills Everything it Touches",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "10:02",
              "role": "How it works",
              "note": "Why the Wankel rotary engine never took off in motorcycles; design history, not service information."
            },
            {
              "id": "aOTz0Ol8fLA",
              "title": "The Pros and Cons of Every Motorcycle Engine Type",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "15:23",
              "role": "How it works",
              "note": "Compares single, twin, triple, four and V engine layouts with pros and cons."
            },
            {
              "id": "Nt-dAN6qFWI",
              "title": "2 STROKE VS 4 STROKE | Which is Better for YOU!?",
              "channel": "Ride With The Knights",
              "channel_url": "http://www.youtube.com/@ridewiththeknights",
              "duration": "12:20",
              "role": "How it works",
              "note": "Two-stroke against four-stroke: power delivery, maintenance and use; a fair summary for choosing a bike."
            }
          ]
        }
      ]
    },
    {
      "id": "m1-anatomy",
      "title": "Anatomy and controls",
      "lead": "A road motorcycle breaks down into 30 named assemblies, and every one has a job, typical materials and a typical way of failing. Learn the names once here and every later module, and every workshop conversation, gets easier.",
      "lab": "overview/?mode=4t&part=chain",
      "blocks": [
        {
          "type": "plate",
          "id": "F06",
          "caption": "Exploded K-Light 125-type road motorcycle with assemblies numbered 1 to 30."
        },
        {
          "type": "h3",
          "text": "The 30 assemblies"
        },
        {
          "type": "p",
          "html": "The exploded diagram separates a fuel-injected single-cylinder road motorcycle of the K-Light 125 type into 30 assemblies, numbered as in plate F06 and named as on the explorer. The same names are used in every later module, in the repair pages and in the quiz, so learning them once saves confusion later."
        },
        {
          "type": "table",
          "head": [
            "No.",
            "Assembly",
            "Function",
            "Typical failure"
          ],
          "rows": [
            [
              "1",
              "Fuel tank",
              "Stores fuel; houses pump (EFI)",
              "Rust blocking pump strainer; blocked vent"
            ],
            [
              "2",
              "Seat",
              "Supports rider; covers battery",
              "Torn cover soaking foam; broken catch"
            ],
            [
              "3",
              "Side cover",
              "Encloses battery and electrics",
              "Broken tabs; lost grommets"
            ],
            [
              "4",
              "Air filter box",
              "Filters and silences intake",
              "Clogged element (rich, power loss)"
            ],
            [
              "5",
              "Frame",
              "Carries loads, locates head, engine, pivot",
              "Weld cracks; crash damage"
            ],
            [
              "6",
              "Steering head and triple clamps",
              "Hold fork, let it steer",
              "Notched bearings; wrong preload"
            ],
            [
              "7",
              "Handlebar and controls",
              "Steering leverage, hand controls",
              "Bent bar; frayed cables"
            ],
            [
              "8",
              "Headlight",
              "Lights road, makes bike visible",
              "Failed bulb; water; misaim"
            ],
            [
              "9",
              "Instrument cluster",
              "Speed, revs, fuel, warning lamps",
              "Water ingress; broken sensor wire"
            ],
            [
              "10",
              "Front fork",
              "Steers, suspends, damps",
              "Leaking seals; bent stanchions"
            ],
            [
              "11",
              "Front wheel and tyre",
              "Steering and braking grip (90/90-17)",
              "Low pressure; rim runout over 2.0 mm"
            ],
            [
              "12",
              "Front brake disc and caliper",
              "Kinetic energy to heat (280 mm, 4.0 mm)",
              "Disc under 3.0 mm; runout over 0.15 mm; pads under 3 mm"
            ],
            [
              "13",
              "Front mudguard",
              "Stops spray and stones",
              "Cracked mounts"
            ],
            [
              "14",
              "Engine",
              "Crankshaft torque; houses clutch and gearbox",
              "Worn rings; valve clearance drift; gasket leaks"
            ],
            [
              "15",
              "Throttle body and injector",
              "Meters air and fuel for the ECU",
              "Carbon (poor idle); clogged injector; faulty TPS"
            ],
            [
              "16",
              "Exhaust header and catalyst",
              "Carries exhaust, converts HC, CO, NOx",
              "Cracked header; poisoned catalyst"
            ],
            [
              "17",
              "Silencer",
              "Reduces noise",
              "Internal corrosion; blown packing"
            ],
            [
              "18",
              "Swingarm",
              "Locates rear wheel",
              "Worn pivot bushes (rear play)"
            ],
            [
              "19",
              "Rear shock absorbers",
              "Support and damp the rear",
              "Oil leak, lost damping"
            ],
            [
              "20",
              "Rear wheel and tyre",
              "Carries most load; drive (130/90-15)",
              "Squared tread; worn cush rubbers"
            ],
            [
              "21",
              "Rear brake disc and caliper",
              "Rear braking (240 mm); CBS link",
              "Seized slide pins"
            ],
            [
              "22",
              "Drive chain",
              "Torque between sprockets",
              "10 links past the chain maker's limit (new: 127 mm); slack outside 20&ndash;40 mm"
            ],
            [
              "23",
              "Front sprocket",
              "Drives chain from gearbox",
              "Hooked teeth"
            ],
            [
              "24",
              "Rear sprocket",
              "Turns rear wheel (41 teeth)",
              "Tooth wear; loose nuts (45&ndash;50 N&middot;m)"
            ],
            [
              "25",
              "Footpegs, gear lever, brake pedal",
              "Foot controls",
              "Bent lever; weak spring"
            ],
            [
              "26",
              "Side stand",
              "Supports parked bike; interlock switch",
              "Weak spring; failed switch"
            ],
            [
              "27",
              "Battery",
              "12 V 6 Ah AGM: starting, ECU, pump, lights",
              "Sulphation after deep discharge"
            ],
            [
              "28",
              "ECU",
              "Injection and ignition timing; fault codes",
              "Corroded pins; reversed polarity"
            ],
            [
              "29",
              "Regulator/rectifier",
              "Alternator AC to DC, limits voltage",
              "Overheating, then overcharge or no charge"
            ],
            [
              "30",
              "Tail light and indicators",
              "Position, braking, turning",
              "Failed bulbs; misadjusted brake switch"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "What each assembly is made of"
        },
        {
          "type": "p",
          "html": "Knowing the sub-components and materials explains the typical failures: steel rusts, aluminium corrodes and strips threads, rubber hardens and splits, and plastic mouldings break at their mounting tabs."
        },
        {
          "type": "table",
          "head": [
            "No.",
            "Assembly",
            "Sub-components and materials"
          ],
          "rows": [
            [
              "1",
              "Fuel tank",
              "Pressed steel or HDPE shell, vented cap, in-tank pump, level sender"
            ],
            [
              "2",
              "Seat",
              "Polypropylene or steel base, foam, vinyl cover, lock catch"
            ],
            [
              "3",
              "Side cover",
              "ABS or polypropylene moulding, rubber grommets"
            ],
            [
              "4",
              "Air filter box",
              "Polypropylene housing, sponge element on the K-Light 125, intake duct, crankcase breather"
            ],
            [
              "5",
              "Frame",
              "Welded steel tube (single cradle on the K-Light 125), engine mounts, VIN stamp"
            ],
            [
              "6",
              "Steering head and triple clamps",
              "Upper and lower clamps, stem, cup-and-cone or taper roller bearings, adjusting nuts"
            ],
            [
              "7",
              "Handlebar and controls",
              "Steel or aluminium bar, grips, levers, switch housings, cables, master cylinder"
            ],
            [
              "8",
              "Headlight",
              "Reflector, lens, LED module or H4 halogen bulb, beam adjuster"
            ],
            [
              "9",
              "Instrument cluster",
              "LCD or analogue gauges, speed sensor, LEDs"
            ],
            [
              "10",
              "Front fork",
              "Chromed steel stanchions, aluminium sliders, springs, damper rods, oil, seals, bushes"
            ],
            [
              "11",
              "Front wheel and tyre",
              "Cast aluminium 1.85 &times; 17 rim, 90/90-17 tubeless tyre, axle, sealed bearings"
            ],
            [
              "12",
              "Front brake disc and caliper",
              "280 mm stainless disc, caliper, pistons, seals, pads"
            ],
            [
              "13",
              "Front mudguard",
              "Polypropylene moulding, fork brackets"
            ],
            [
              "14",
              "Engine",
              "Aluminium head with valves, cam and rockers; cylinder with iron liner; split crankcase with crank, balancer, clutch and gears"
            ],
            [
              "15",
              "Throttle body and injector",
              "Aluminium body, butterfly, TPS, idle air control, MAP and IAT sensor, injector"
            ],
            [
              "16",
              "Exhaust header and catalyst",
              "Steel header, oxygen sensor boss, metallic catalyst substrate with platinum-group coating"
            ],
            [
              "17",
              "Silencer",
              "Steel shell, baffles, perforated tubes, fibre packing, heat shield"
            ],
            [
              "18",
              "Swingarm",
              "Steel box or tube, pivot spindle, bushes or needle bearings, chain adjusters"
            ],
            [
              "19",
              "Rear shock absorbers",
              "Coil springs, hydraulic dampers, preload adjusters, bushes (twin shocks on the K-Light 125)"
            ],
            [
              "20",
              "Rear wheel and tyre",
              "Cast rim, 130/90-15 tyre, sprocket carrier with cush drive rubbers, bearings"
            ],
            [
              "21",
              "Rear brake disc and caliper",
              "240 mm disc, single-piston sliding caliper, pads, master cylinder"
            ],
            [
              "22",
              "Drive chain",
              "Side plates, pins, bushings, rollers; O-ring or plain"
            ],
            [
              "23",
              "Front sprocket",
              "Hardened steel, splined, retaining plate"
            ],
            [
              "24",
              "Rear sprocket",
              "Steel, 41 teeth on the K-Light 125, bolted to the carrier (nuts 45&ndash;50 N&middot;m)"
            ],
            [
              "25",
              "Footpegs, gear lever and brake pedal",
              "Pegs, gear lever and linkage, pedal with return spring"
            ],
            [
              "26",
              "Side stand",
              "Steel leg, pivot bolt, return springs, side-stand switch"
            ],
            [
              "27",
              "Battery",
              "12 V 6 Ah AGM (YTX7A-BS): lead plates, glass mat, sulphuric acid"
            ],
            [
              "28",
              "ECU",
              "Microcontroller, injector, coil and pump drivers, sealed housing"
            ],
            [
              "29",
              "Regulator/rectifier",
              "Diode bridge, thyristor shunt regulator, finned heat sink"
            ],
            [
              "30",
              "Tail light and indicators",
              "LED or bulb units, lenses, flasher relay, brake light switches"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Grouped by the systems of Chapter 1.1, the power unit is the engine (14); fuel and air are the tank, filter box, throttle body, header and silencer (1, 4, 15, 16, 17); the electrical system is the lights, instruments, battery, ECU and regulator/rectifier (8, 9, 27, 28, 29, 30); the transmission outside the engine is chain and sprockets (22, 23, 24); and the chassis is everything from frame and steering to wheels, brakes and suspension (5, 6, 10 to 13, 18 to 21). Controls and bodywork make up the rest."
        },
        {
          "type": "p",
          "html": "Follow the torque: <strong>engine (14) &rarr; front sprocket (23) &rarr; drive chain (22) &rarr; rear sprocket (24) &rarr; rear wheel (20)</strong> through its cush drive, with the swingarm (18) locating the axle and adjusters."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Worn chain? Think in sets",
          "html": "Ten links of a new 12.7 mm pitch chain measure exactly <strong>127 mm</strong> (\\(10 \\times 12.7\\)), so that figure is the starting length, not the limit. Compare the measurement with the wear limit published by the chain maker; once it is reached, replace the chain and inspect both sprockets for hooked teeth. Normally replace them together: mixing new and worn parts accelerates wear."
        },
        {
          "type": "h3",
          "text": "Fault-finding by assembly"
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Likely assembly",
            "Check",
            "Remedy"
          ],
          "rows": [
            [
              "Battery boils, bulbs blow",
              "Regulator/rectifier (29)",
              "Battery voltage at 5,000 rpm: 14.5 &plusmn; 0.5 V on the K-Light 125; above about 15 V the regulator has failed",
              "Replace the regulator/rectifier (<a href=\"../repair/repairs/regulator-test/\">Test the regulator/rectifier</a>)"
            ],
            [
              "Rear weaves under power over bumps",
              "Rear shocks (19), swingarm (18)",
              "Shock oil leaks and rear bouncing more than once when pushed down; swingarm play when the wheel is levered sideways",
              "Renew shocks or pivot bushes (<a href=\"../repair/repairs/rear-shock-check/\">Check the rear shocks</a>, <a href=\"../repair/repairs/swingarm-check/\">Check the swingarm</a>)"
            ],
            [
              "Engine cuts out when the side stand is lowered in gear",
              "Side stand (26)",
              "Normal: the side-stand switch is an interlock that stops the bike being ridden away with the stand down",
              "None if it works only then; test the switch if the engine cuts out with the stand up"
            ],
            [
              "Front brake judders",
              "Front disc and caliper (12)",
              "Runout (limit 0.15 mm) and thickness (limit 3.0 mm) at four points",
              "Check disc bolts and hub face, then renew the disc and pads (<a href=\"../repair/repairs/brake-disc-check/\">Check a brake disc</a>)"
            ],
            [
              "Snatch when opening and closing the throttle",
              "Rear wheel (20), chain (22)",
              "Cush drive rubbers and chain slack",
              "Renew worn cush rubbers; adjust or renew the chain"
            ],
            [
              "Engine starves at speed, runs again after stopping",
              "Fuel tank (1)",
              "Tank vent and pump strainer",
              "Clear the vent; clean the tank and strainer"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m1-14"
        },
        {
          "type": "plate",
          "id": "FB02",
          "caption": "Body parts by type: bench, motocross and flat-tracker seats; round, number-plate and LED headlights; tail light, mudguards and side panel."
        },
        {
          "type": "engine",
          "shot": "08-exploded",
          "view": "overview",
          "caption": "The engine of a 125 cc commuter, pulled apart on the stand: every part in its place. Open it, drag the Exploded view slider and click any part."
        },
        {
          "type": "models",
          "files": [
            "seat_bench",
            "seat_mx",
            "seat_tracker"
          ],
          "caption": "Three seats for three jobs: a ribbed bench for two-up road use, a long flat motocross seat for moving around, and a flat-tracker seat with tail hump."
        },
        {
          "type": "model",
          "file": "fuel_tank",
          "caption": "A steel teardrop fuel tank: filler cap on top, tap or pump outlet underneath, rubber mounts at front and rear."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Open the <a href=\"../overview/?mode=4t&view=diagram\">four-stroke course plate</a> and click, in order, the drive chain, rear sprocket, swingarm and rear tyre hotspots, and write down the order in which drive torque passes through them from the gearbox output to the road. Then find the throttle body, the side cover over the battery and the instrument cluster, and sketch the connections you expect between throttle body and injector, ECU, battery and regulator/rectifier before checking against Module 3. Plate F06 above numbers all 30 assemblies by name."
        },
        {
          "type": "h3",
          "text": "The primary controls"
        },
        {
          "type": "p",
          "html": "Standard since the 1970s (US rule FMVSS 123): <strong>right hand</strong> throttle (twist towards you to open) and front brake, <strong>left hand</strong> clutch, <strong>left foot</strong> gear lever, <strong>right foot</strong> rear brake. On a CVT scooter there is no clutch or gear lever, so the left lever works the rear brake."
        },
        {
          "type": "p",
          "html": "The layout became standard after US rule FMVSS 123 fixed it in the 1970s and other markets converged on it, so a rider can move between machines without relearning the controls. On CBS scooters the left lever works the rear brake and also part of the front."
        },
        {
          "type": "plate",
          "id": "F05",
          "caption": "Handlebar from the rider's seat with the left and right switch clusters magnified."
        },
        {
          "type": "model",
          "file": "handlebar",
          "caption": "The handlebar assembly from the rider’s seat: grips, throttle, clutch and brake levers with perches, switch cubes, twin clocks and mirrors."
        },
        {
          "type": "table",
          "head": [
            "Where",
            "What it carries"
          ],
          "rows": [
            [
              "Right switch cluster",
              "Start button, engine stop (kill) switch, often headlight switch"
            ],
            [
              "Left switch cluster",
              "Dip/main beam, flasher, horn, indicator (push to cancel)"
            ],
            [
              "Top yoke",
              "Ignition switch and steering lock"
            ],
            [
              "Instruments",
              "Speed, odometer, fuel, neutral, indicator and main-beam lamps; MIL on EFI bikes"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The <strong>engine stop switch</strong> on the right cluster cuts the ignition without the rider taking a hand off the bar, which is why it is the first control to use after a fall or a stuck throttle. It is also the first thing to check when an engine turns over but will not fire, since a switch left at OFF is a common cause (<a href=\"../repair/repairs/kill-switch-test/\">Test the engine stop switch</a>)."
        },
        {
          "type": "variants",
          "title": "Handlebar types",
          "intro": "The bar sets where the hands sit, so it decides the riding position, the leverage on the steering and the comfort over a long day. Repair page: <a href=\"../repair/parts/handlebar/\">handlebar</a>.",
          "items": [
            {
              "model": "bike_cafe_racer__handlebar",
              "name": "Clip-ons, cafe racer",
              "what": "Two short bars clamped to the fork legs, low and forward of the rider.",
              "good_for": "Weight on the front tyre and a tucked position at speed.",
              "conditions": "Fast roads and short to medium rides.",
              "watch": "Strain on wrists and neck in town, and little lock or leverage at walking pace. Cables must not pull tight at full lock."
            },
            {
              "model": "bike_superbike__handlebar",
              "name": "Clip-ons, superbike",
              "what": "Clip-ons on a modern sport bike, carrying levers, switch cubes and throttle.",
              "good_for": "Track and fast road: the rider can move weight forward and down.",
              "conditions": "Smooth, fast roads and track.",
              "watch": "Clip-ons and levers bend or break in a fall. Check them after any drop."
            },
            {
              "model": "bike_mx_2t__handlebar",
              "name": "Wide motocross bar",
              "what": "A wide, tall bar, usually aluminium, often with a crossbar or a pad.",
              "good_for": "Leverage to steer through ruts and control while standing on the pegs.",
              "conditions": "Off-road, riding standing up.",
              "watch": "Bends in falls. A bent bar or a slipped clamp changes the lever angles and steering feel."
            },
            {
              "model": "bike_classic_4t__handlebar",
              "name": "Roadster bar",
              "what": "A one-piece tube bar with a gentle rise and pull-back.",
              "good_for": "An upright, relaxed position with easy control in traffic.",
              "conditions": "General road riding.",
              "watch": "Worn grips, loose clamps and cables that bind at full lock."
            },
            {
              "model": "bike_cruiser__handlebar",
              "name": "Pull-back cruiser bar",
              "what": "Mini ape-hanger bars that rise high and sweep back towards the rider.",
              "good_for": "A relaxed, upright position with the feet forward.",
              "conditions": "Steady cruising.",
              "watch": "Raised arms tire on long rides and catch the wind. Longer cables and wiring must be routed so they do not stretch at full lock; local rules may limit bar height."
            },
            {
              "model": "bike_step_through__handlebar",
              "name": "Step-through bar",
              "what": "A short, narrow bar inside a plastic cowl.",
              "good_for": "Easy upright control at low speed, and a narrow width for traffic.",
              "conditions": "Town and village roads.",
              "watch": "Little leverage with heavy loads. Notchy steering points to worn steering head bearings."
            },
            {
              "model": "bike_scooter__handlebar",
              "name": "Scooter bar",
              "what": "A bar enclosed in a cowl with a brake lever on each side and no clutch.",
              "good_for": "Twist-and-go riding with both hands on the brakes.",
              "conditions": "City traffic.",
              "watch": "On most scooters the left lever is the rear brake, not a clutch, which can surprise a motorcycle rider."
            },
            {
              "model": "bike_pioneer__handlebar",
              "name": "Bicycle bar, about 1901",
              "what": "A swept bicycle-style bar with small levers for the engine controls.",
              "good_for": "Light steering on a machine that is also pedalled.",
              "conditions": "Slow roads.",
              "watch": "The controls work nothing like modern ones; machines this old had no standard layout."
            }
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Try every control in the Cockpit",
          "html": "Turn the key, flick the stop switch to RUN, pull the clutch, press the starter and twist the throttle: every control on this page works in the <a href=\"../cockpit/\">Cockpit</a>, with live instruments, engine sound and a dyno. <a href=\"../cockpit/\">Open the Cockpit →</a>"
        },
        {
          "type": "p",
          "html": "The <strong>MIL</strong> (malfunction indicator lamp) lights briefly at key-on as a bulb check and stays lit when the ECU stores a fault."
        },
        {
          "type": "p",
          "html": "A MIL that stays lit after start-up means the ECU has stored a fault code. Read the code before replacing anything: the code names the circuit that failed a self-test, not necessarily the part, and a corroded connector or broken wire gives the same code as a failed sensor (<a href=\"../repair/repairs/efi-code-read/\">Read EFI fault codes</a>)."
        },
        {
          "type": "models",
          "files": [
            "instruments_analogue",
            "instruments_lcd"
          ],
          "caption": "Instrument clusters: twin analogue clocks with warning lamps on a roadster, and a compact LCD on a motocross bike."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Front lever play",
              "v": "10&ndash;20 mm",
              "p": "at the lever tip"
            },
            {
              "l": "Rear pedal play",
              "v": "20&ndash;30 mm",
              "p": "K-Light 125 manual"
            },
            {
              "l": "Throttle cable play",
              "v": "3&ndash;5 mm",
              "p": "K-Light 125 manual"
            }
          ]
        },
        {
          "type": "p",
          "html": "Free play exists for a reason. A brake lever or pedal with no free play can hold the master cylinder piston off its rest, so the brake drags and heats; too much play leaves too little travel for a firm stop. Throttle cable play lets the throttle close fully at every steering angle, so the idle does not rise when the bar is turned. Check each against the manual at every service (<a href=\"../repair/repairs/throttle-cable-adjust/\">Adjust the throttle cable</a>, <a href=\"../repair/repairs/rear-pedal-adjust/\">Adjust the rear brake pedal</a>)."
        },
        {
          "type": "h3",
          "text": "Shifting gear: one down, four up"
        },
        {
          "type": "p",
          "html": "From neutral, press the lever <strong>down once</strong> for first; each lift selects the next gear. Neutral is a <strong>half-lift</strong> from first (or a half-press from second)."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Upshift: close the throttle",
              "html": "The gear dogs only slide apart cleanly when they are unloaded; loaded dogs are locked together by friction."
            },
            {
              "title": "Clutch in briskly",
              "html": "Pull the clutch lever fully."
            },
            {
              "title": "Lift the lever",
              "html": "Lift the gear lever firmly through its full travel so the drum indexes cleanly into the next gear."
            },
            {
              "title": "Release and reopen",
              "html": "Let the clutch out while reopening the throttle."
            }
          ]
        },
        {
          "type": "p",
          "html": "<strong>Downshift:</strong> clutch in, press the lever down, <em>blip</em> the throttle to raise engine speed for the lower gear, then release the clutch smoothly. An abrupt release at low engine speed can lock the rear wheel."
        },
        {
          "type": "p",
          "html": "Practise the shift pattern and a rev-matched downshift in the <a href=\"../cockpit/\">Cockpit</a>: hold C for the clutch, use the arrow keys for the gear lever and T for the throttle (or tap the on-screen controls on a phone)."
        },
        {
          "type": "p",
          "html": "A lever that is not moved through its full travel can leave the selector drum between gears, a <strong>false neutral</strong>: the engine revs freely and the gearbox drops in hard when the lever is next touched. Missed shifts that persist with a firm full-travel action point to the linkage, the lever adjustment or the selector mechanism (<a href=\"../repair/repairs/gearshift-check/\">Check the gearshift</a>)."
        },
        {
          "type": "h3",
          "text": "Emergency stop"
        },
        {
          "type": "p",
          "html": "A stop from speed uses both brakes, with the front doing most of the work because load transfers forwards as the machine slows (Chapter 1.4)."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Close the throttle",
              "html": "Engine braking begins and you are ready to brake."
            },
            {
              "title": "Squeeze the front progressively",
              "html": "Over about half a second, so the fork compresses and front tyre load builds before maximum force."
            },
            {
              "title": "Add the rear, more gently",
              "html": "Load has moved forward; the rear can do less."
            },
            {
              "title": "Clutch in below 15&ndash;20 km/h",
              "html": "Disengage the clutch as the speed falls below about 15–20 km/h so the engine does not stall."
            },
            {
              "title": "Select first, left foot down",
              "html": "Ready to move off again."
            }
          ]
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "ABS and CBS",
          "html": "With ABS you can hold full lever force; without it you must modulate just below wheel lock. CBS lowers the risk of a locked rear by sending part of the pedal effort to the front caliper. Even with ABS, a snatched lever makes the stop longer and unsettles the chassis."
        },
        {
          "type": "h3",
          "text": "A daily walk-round using the anatomy"
        },
        {
          "type": "p",
          "html": "A short check before riding uses the same assembly names and catches most of the faults that cause breakdowns and crashes. The values given are those of the K-Light 125 manual; other machines have their own."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Tyres and wheels (11, 20)",
              "html": "Pressures cold: 190 &plusmn; 10 kPa front and 210 &plusmn; 10 kPa rear. Look for cuts, embedded objects and worn tread (<a href=\"../repair/repairs/tyre-pressure-check/\">Check tyre pressure</a>)."
            },
            {
              "title": "Brakes (7, 12, 21, 25)",
              "html": "Front lever free play 10&ndash;20 mm and rear pedal 20&ndash;30 mm; both firm, with no fluid leaks at the master cylinders or calipers."
            },
            {
              "title": "Chain and sprockets (22, 23, 24)",
              "html": "Slack 20&ndash;40 mm at the tightest point, chain lubricated, no stiff links or hooked teeth."
            },
            {
              "title": "Controls (7)",
              "html": "Throttle free play 3&ndash;5 mm and snapping shut at full left and full right lock; clutch lever and cables free."
            },
            {
              "title": "Lights and electrics (8, 9, 30)",
              "html": "Headlight main and dip, tail and brake lights from both controls, indicators, horn, MIL off after start."
            },
            {
              "title": "Stand and leaks (26, 14)",
              "html": "Side stand springs back and the interlock works; no oil or fuel under the bike (<a href=\"../repair/repairs/pre-ride-check/\">Pre-ride check</a>)."
            }
          ]
        },
        {
          "type": "h3",
          "text": "From assemblies to a service schedule"
        },
        {
          "type": "p",
          "html": "The 30 assemblies are also the structure of every service schedule. A manufacturer's schedule lists each assembly with an interval in distance or time and an action: inspect, clean, adjust, lubricate or replace. Reading it assembly by assembly makes sure nothing is forgotten, and a job card laid out in the same order becomes a record of what was done: <a href=\"../repair/repairs/service-schedule/\">Follow the service schedule</a>."
        },
        {
          "type": "p",
          "html": "Use the correct part name and the frame number when ordering parts. Two machines with the same name and engine size can use different parts, and a parts seller who has the frame number can find the right version even when the model changed partway through a year: <a href=\"../repair/repairs/parts-source-choose/\">Choose where to buy motorcycle parts</a>."
        },
        {
          "type": "check",
          "q": "m1-16"
        },
        {
          "type": "check",
          "q": "m1-35"
        },
        {
          "type": "check",
          "q": "m1-36"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "A road motorcycle divides into 30 named assemblies; the same names are used on the explorer, in every module and in the repair pages.<br>Drive torque passes from engine (14) to front sprocket (23), chain (22), rear sprocket (24) and rear wheel (20); chain and sprockets wear as a set.<br>Each assembly has typical materials and a typical failure; matching symptom to assembly is the first step of fault-finding.<br>Right hand throttle and front brake, left hand clutch, left foot gears, right foot rear brake; free play on each control has a purpose.<br>Upshift with the throttle closed so the dogs unload; blip the throttle on a downshift; in an emergency stop, squeeze the front progressively."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "mdOJ717PKRc",
              "title": "How Motorcycles Work - The Basics",
              "channel": "TecknoMechanics",
              "channel_url": "http://www.youtube.com/@TecknoMechanics",
              "duration": "4:29",
              "role": "How it works",
              "note": "Short animated tour of the main systems of a four-stroke motorcycle."
            },
            {
              "id": "rL6O-jHjSp8",
              "title": "7 Minute Motorcycle Teardown – Mechanic Crash Course",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "7:07",
              "role": "How it works",
              "note": "Fast teardown naming the main parts; a map of the bike, not a procedure."
            },
            {
              "id": "D-Wr2hkc-RM",
              "title": "Honda Africa Twin Production Motorcycles In Japan",
              "channel": "Automotive garage",
              "channel_url": "http://www.youtube.com/@Automotivegarage",
              "duration": "13:29",
              "role": "Case study",
              "note": "Africa Twin factory line shows assembly stages and checks; production methods are not repair methods."
            }
          ]
        }
      ]
    },
    {
      "id": "m1-physics",
      "title": "Physics of riding",
      "lead": "A 7.8 kW commuter tops out at 90 km/h, climbs a 31 % hill and needs its front brake for three quarters of a hard stop. All of that comes from a handful of equations you can do on a phone calculator, using the K-Light 125 as the worked example.",
      "blocks": [
        {
          "type": "h3",
          "text": "Force, torque and power"
        },
        {
          "type": "p",
          "html": "A force \\(F\\) pushing at a radius \\(r\\) from a shaft turns it with a torque. Power is how fast that torque does work, so it needs the shaft speed as well. One metric horsepower (PS) is 0.7355 kW."
        },
        {
          "type": "eq",
          "id": "torque",
          "name": "Torque",
          "tex": "T = F\\,r",
          "where": [
            [
              "T",
              "torque",
              "N·m"
            ],
            [
              "F",
              "force at right angles to the lever",
              "N"
            ],
            [
              "r",
              "lever length, axis to the force",
              "m"
            ]
          ],
          "why": "Every bolt, crank, sprocket and wheel turns by torque. It is why a longer spanner loosens a tight nut and why a torque wrench reads N·m.",
          "example": "A 150 N pull on a 0.25 m spanner gives \\(T = 150 \\times 0.25 = 37.5\\ \\mathrm{N\\,m}\\)."
        },
        {
          "type": "eq",
          "id": "angular-speed",
          "name": "Engine speed in radians per second",
          "tex": "\\omega = \\frac{2\\pi\\,n}{60}",
          "where": [
            [
              "\\omega",
              "angular speed",
              "rad/s"
            ],
            [
              "n",
              "engine or shaft speed",
              "rev/min"
            ]
          ],
          "why": "Power and torque equations work in rad/s, while rev counters read rev/min. This converts one to the other.",
          "example": "At \\(n = 9000\\) rev/min, \\(\\omega = 2\\pi \\times 9000 / 60 = 942.5\\ \\mathrm{rad/s}\\)."
        },
        {
          "type": "eq",
          "id": "power-torque",
          "name": "Power from torque and speed",
          "tex": "P = T\\,\\omega",
          "where": [
            [
              "P",
              "power",
              "W"
            ],
            [
              "T",
              "torque",
              "N·m"
            ],
            [
              "\\omega",
              "angular speed",
              "rad/s"
            ]
          ],
          "why": "Explains why peak power comes at higher revs than peak torque, and lets you read a dyno chart or compare engines.",
          "example": "7.8 kW at 942.5 rad/s means \\(T = 7800 / 942.5 = 8.28\\ \\mathrm{N\\,m}\\)."
        },
        {
          "type": "p",
          "html": "Rearranged, \\(T = P / \\omega\\) gives the torque behind any point on a power curve. The units must be consistent: power in watts rather than kilowatts and speed in rad/s rather than rev/min. Mixing them is the commonest error in these calculations, and it produces answers wrong by a factor of 1,000 or of about 10."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "K-Light 125 performance data (K-Light 125 manual)",
          "html": "Engine QJ157FMI: single cylinder, air-cooled, bore and stroke 56.5 &times; 49.5 mm, 124 cm&sup3;, compression ratio 9:1. Maximum power 7.8 kW at 9,000 rpm; maximum torque 8.9 N&middot;m at 7,500 rpm; maximum speed 90 km/h. Kerb mass 145 kg (69 kg front, 76 kg rear); wheelbase 1,440 mm. Five-speed gearbox, chain drive, 41-tooth rear sprocket; tyres 90/90-17 front and 130/90-15 rear."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Peak power",
              "v": "7.8 kW",
              "p": "at 9,000 rpm"
            },
            {
              "l": "Peak torque",
              "v": "8.9 N&middot;m",
              "p": "at 7,500 rpm"
            },
            {
              "l": "Kerb mass",
              "v": "145 kg",
              "p": "69 kg front, 76 kg rear"
            },
            {
              "l": "Top speed",
              "v": "90 km/h",
              "p": "K-Light 125 manual"
            }
          ]
        },
        {
          "type": "p",
          "html": "At 9,000 rpm, \\(\\omega = 942.5\\ \\mathrm{rad/s}\\), so the torque there is \\(7800 / 942.5 = 8.28\\ \\mathrm{N\\,m}\\), below the peak. At 7,500 rpm, \\(\\omega = 785.4\\ \\mathrm{rad/s}\\) and the power is \\(8.9 \\times 785.4 = 6990\\ \\mathrm{W} \\approx 6.99\\ \\mathrm{kW}\\). Peak power comes above peak torque because power keeps rising with speed until torque falls faster than speed rises, once the valves and ports can no longer fill the cylinder in the shorter time per cycle."
        },
        {
          "type": "p",
          "html": "The span between the two peaks, here 7,500 to 9,000 rpm, is where the engine pulls hardest for its speed; a rider who changes up just past the power peak lands in the next gear close to the torque peak. In metric horsepower the K-Light 125 makes \\(7.8 / 0.7355 = 10.6\\) PS. A dyno chart is read the same way: torque shows how well the engine fills its cylinder at each speed, and power shows how much work it can do per second there."
        },
        {
          "type": "figure",
          "fig": "power-torque",
          "caption": "Enter 8.9 N&middot;m at 7,500 rpm, then 8.28 N&middot;m at 9,000 rpm, and watch power rise even as torque falls."
        },
        {
          "type": "check",
          "q": "m1-19"
        },
        {
          "type": "h3",
          "text": "Gearing and wheel torque"
        },
        {
          "type": "p",
          "html": "The transmission multiplies torque and divides speed by the overall ratio \\(i\\), the product of the primary reduction, the selected gear ratio and the final drive (rear teeth divided by front teeth). The manual gives only the 41-tooth rear sprocket, so the example assumes typical values for this class: primary 3.40, first 2.75, fifth 1.10 and a 15-tooth front sprocket (\\(41/15 = 2.733\\))."
        },
        {
          "type": "eq",
          "id": "m1-overall-ratio",
          "name": "Overall gear ratio",
          "tex": "i = i_p \\, i_g \\, \\frac{z_r}{z_f}",
          "where": [
            [
              "i",
              "overall ratio, engine turns per wheel turn",
              ""
            ],
            [
              "i_p",
              "primary reduction (crank to clutch)",
              ""
            ],
            [
              "i_g",
              "ratio of the selected gear",
              ""
            ],
            [
              "z_r",
              "teeth on the rear sprocket",
              ""
            ],
            [
              "z_f",
              "teeth on the front sprocket",
              ""
            ]
          ],
          "why": "Sets how many times the engine turns for each turn of the rear wheel, and so the wheel torque and road speed in every gear. A one-tooth change of sprocket changes every gear at once.",
          "example": "Typical 125 values: \\(i_1 = 3.40 \\times 2.75 \\times 2.733 = 25.56\\) in first and \\(i_5 = 3.40 \\times 1.10 \\times 2.733 = 10.22\\) in fifth."
        },
        {
          "type": "eq",
          "id": "m1-wheel-torque",
          "name": "Torque at the rear wheel",
          "tex": "T_w = T_e \\, i \\, \\eta_t",
          "where": [
            [
              "T_w",
              "torque at the rear axle",
              "N·m"
            ],
            [
              "T_e",
              "engine torque",
              "N·m"
            ],
            [
              "i",
              "overall ratio",
              ""
            ],
            [
              "\\eta_t",
              "transmission efficiency (about 0.90)",
              ""
            ]
          ],
          "why": "Gives the twisting effort at the rear axle in each gear: the load that the cush drive, sprocket, wheel and tyre must carry, and the starting point for tractive force.",
          "example": "First gear at peak torque: \\(T_w = 8.9 \\times 25.56 \\times 0.90 = 204.7\\ \\mathrm{N\\,m}\\), about 205 N·m."
        },
        {
          "type": "eq",
          "id": "m1-tyre-diameter",
          "name": "Tyre diameter from its size marking",
          "tex": "D = 25.4\\,d_r + 2\\,\\frac{a}{100}\\,W",
          "where": [
            [
              "D",
              "unloaded outside diameter",
              "mm"
            ],
            [
              "d_r",
              "rim diameter",
              "inch"
            ],
            [
              "a",
              "aspect ratio (section height as a percentage of width)",
              "%"
            ],
            [
              "W",
              "section width",
              "mm"
            ]
          ],
          "why": "Turns a size such as 130/90-15 into a diameter, which sets rolling radius, gearing and speedometer reading when a different tyre size is fitted.",
          "example": "130/90-15: section height \\(0.90 \\times 130 = 117\\ \\mathrm{mm}\\), so \\(D = 15 \\times 25.4 + 2 \\times 117 = 615\\ \\mathrm{mm}\\). Under load the rolling radius is about 0.30 m, less than half of 615 mm because the tyre flattens at the contact patch."
        },
        {
          "type": "eq",
          "id": "m1-tractive-force",
          "name": "Tractive force at the contact patch",
          "tex": "F_t = \\frac{T_w}{r_w}",
          "where": [
            [
              "F_t",
              "driving force at the rear contact patch",
              "N"
            ],
            [
              "T_w",
              "rear-wheel torque",
              "N·m"
            ],
            [
              "r_w",
              "loaded rolling radius of the rear tyre",
              "m"
            ]
          ],
          "why": "Converts wheel torque into the push that accelerates the machine and climbs hills; it is compared with the resistance forces to find acceleration, climbing ability and top speed.",
          "example": "First gear at peak torque: \\(F_t = 204.7 / 0.30 \\approx 682\\ \\mathrm{N}\\)."
        },
        {
          "type": "table",
          "head": [
            "Quantity",
            "Formula",
            "K-Light 125 (first gear)"
          ],
          "rows": [
            [
              "Overall ratio",
              "\\(3.40 \\times 2.75 \\times 2.733\\)",
              "\\(i_1 = 25.56\\) (fifth: 10.22)"
            ],
            [
              "Wheel torque",
              "\\(T_e \\times i \\times 0.90\\)",
              "\\(8.9 \\times 25.56 \\times 0.90 = 205\\ \\mathrm{N\\,m}\\)"
            ],
            [
              "Rolling radius",
              "130/90-15 tyre, 615 mm unloaded",
              "about 0.30 m under load"
            ],
            [
              "Tractive force",
              "\\(T_w / r_w\\)",
              "\\(205 / 0.30 = 682\\ \\mathrm{N}\\)"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A larger rear sprocket raises \\(z_r\\) and so every overall ratio: more tractive force and acceleration, but lower road speed per 1,000 rpm and more engine speed at a given cruise. Taxi motorcycles in hilly towns are often re-geared this way. Chain and sprockets wear as a set, so a gearing change is the moment to renew all three (<a href=\"../repair/repairs/chain-sprocket-replace/\">Replace the chain and sprockets</a>)."
        },
        {
          "type": "figure",
          "fig": "gearing",
          "caption": "Start at 15/41 teeth, then fit a larger rear sprocket: more pull per rpm, less speed per 1000 rpm."
        },
        {
          "type": "gearing",
          "caption": "Gears trade engine speed for wheel torque. Change the sprockets and see the speed in each gear. For torque, wheel size and top speed together, open the <a href=\"../build/\">Bike builder</a>."
        },
        {
          "type": "h3",
          "text": "Resistance to motion"
        },
        {
          "type": "p",
          "html": "Three forces oppose the tractive force: rolling resistance from tyre deformation, aerodynamic drag, and the component of weight acting down a slope. Each has its own equation, and each depends on a different thing the rider or mechanic can change: tyre pressure and load, riding position and speed, and the route."
        },
        {
          "type": "eq",
          "id": "m1-rolling-resistance",
          "name": "Rolling resistance",
          "tex": "F_{roll} = C_{rr}\\, m\\, g",
          "where": [
            [
              "F_{roll}",
              "rolling resistance force",
              "N"
            ],
            [
              "C_{rr}",
              "rolling resistance coefficient (typically 0.015 to 0.025 on asphalt)",
              ""
            ],
            [
              "m",
              "total mass of machine, rider and load",
              "kg"
            ],
            [
              "g",
              "gravitational acceleration, 9.81",
              "m/s²"
            ]
          ],
          "why": "The resistance that is present at every speed. It rises when tyres are under-inflated, which is one reason pressures are checked cold at every service.",
          "example": "K-Light 125 with a 75 kg rider, \\(C_{rr} = 0.02\\): \\(F_{roll} = 0.02 \\times 220 \\times 9.81 = 43\\ \\mathrm{N}\\)."
        },
        {
          "type": "eq",
          "id": "m1-aero-drag",
          "name": "Aerodynamic drag",
          "tex": "F_{aero} = \\tfrac{1}{2}\\,\\rho\\, C_d A\\, v^2",
          "where": [
            [
              "F_{aero}",
              "drag force",
              "N"
            ],
            [
              "\\rho",
              "air density, about 1.2 at sea level and 20 °C",
              "kg/m³"
            ],
            [
              "C_d A",
              "drag area: drag coefficient times frontal area",
              "m²"
            ],
            [
              "v",
              "speed through the air",
              "m/s"
            ]
          ],
          "why": "Drag grows with the square of speed and dominates above town speeds, so it sets top speed and cruising fuel use. A tucked rider or a fairing lowers the drag area.",
          "example": "At 90 km/h (25 m/s) with \\(C_d A = 0.60\\ \\mathrm{m^2}\\): \\(F_{aero} = 0.5 \\times 1.2 \\times 0.60 \\times 25^2 = 225\\ \\mathrm{N}\\), five times the rolling resistance."
        },
        {
          "type": "eq",
          "id": "m1-gradient-resistance",
          "name": "Gradient resistance",
          "tex": "F_{grade} = m\\, g \\sin\\theta",
          "where": [
            [
              "F_{grade}",
              "component of weight acting down the slope",
              "N"
            ],
            [
              "m",
              "total mass",
              "kg"
            ],
            [
              "g",
              "gravitational acceleration",
              "m/s²"
            ],
            [
              "\\theta",
              "road angle from horizontal",
              "degrees"
            ]
          ],
          "why": "Sets how much tractive force a hill takes, and so which gear a loaded machine needs. Road signs give gradient in per cent, which is \\(100 \\tan\\theta\\), not the angle.",
          "example": "A 10 % hill: \\(\\theta = \\arctan 0.10 = 5.71^\\circ\\), so for 220 kg \\(F_{grade} = 220 \\times 9.81 \\times \\sin 5.71^\\circ \\approx 215\\ \\mathrm{N}\\)."
        },
        {
          "type": "table",
          "head": [
            "Force",
            "Formula",
            "K-Light + 75 kg rider (220 kg)"
          ],
          "rows": [
            [
              "Rolling",
              "\\(C_{rr}\\,m\\,g\\) (\\(C_{rr}\\) 0.015 to 0.025)",
              "\\(0.02 \\times 220 \\times 9.81 = 43\\ \\mathrm{N}\\)"
            ],
            [
              "Aerodynamic",
              "\\(\\tfrac{1}{2}\\rho\\,C_d A\\,v^2\\) (\\(\\rho = 1.2\\), \\(C_d A\\) 0.5 to 0.7 m² upright)",
              "at 90 km/h: \\(0.5 \\times 1.2 \\times 0.60 \\times 625 = 225\\ \\mathrm{N}\\)"
            ],
            [
              "Gradient",
              "\\(m\\,g \\sin\\theta\\)",
              "depends on the hill"
            ]
          ]
        },
        {
          "type": "table",
          "head": [
            "Riding position or machine",
            "Typical drag area \\(C_d A\\)"
          ],
          "rows": [
            [
              "Unfaired commuter, upright rider",
              "0.5&ndash;0.7 m&sup2;"
            ],
            [
              "Faired sport bike, rider tucked",
              "0.3&ndash;0.4 m&sup2;"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb: the cube law",
          "html": "Drag grows with the <strong>square</strong> of speed and the power to beat it with the <strong>cube</strong>. Doubling power raises top speed only by about the cube root of two, roughly <strong>26 %</strong>."
        },
        {
          "type": "h3",
          "text": "Top speed, acceleration and climbing"
        },
        {
          "type": "p",
          "html": "Top speed is reached where the power available at the wheel equals the power absorbed by resistance. Below that speed there is a surplus that accelerates the machine; at it, every watt goes into pushing air and flexing tyres."
        },
        {
          "type": "eq",
          "id": "m1-power-balance",
          "name": "Power balance at top speed",
          "tex": "P_w = \\left(F_{roll} + F_{aero}\\right) v",
          "where": [
            [
              "P_w",
              "power at the rear wheel (engine power times transmission efficiency)",
              "W"
            ],
            [
              "F_{roll}",
              "rolling resistance",
              "N"
            ],
            [
              "F_{aero}",
              "aerodynamic drag",
              "N"
            ],
            [
              "v",
              "road speed",
              "m/s"
            ]
          ],
          "why": "Predicts top speed from engine power and drag, and shows why extra power buys little speed: drag power rises with the cube of speed.",
          "example": "\\(P_w = 7.8 \\times 0.90 = 7.02\\ \\mathrm{kW}\\), so \\(0.36\\,v^3 + 43\\,v = 7020\\), which solves by trial to \\(v \\approx 25.4\\ \\mathrm{m/s} \\approx 91\\ \\mathrm{km/h}\\), matching the manual's 90 km/h."
        },
        {
          "type": "eq",
          "id": "m1-wheel-speed",
          "name": "Wheel and engine speed from road speed",
          "tex": "n_w = \\frac{60\\,v}{2\\pi\\, r_w}, \\qquad n_e = i\\, n_w",
          "where": [
            [
              "n_w",
              "rear-wheel speed",
              "rev/min"
            ],
            [
              "n_e",
              "engine speed",
              "rev/min"
            ],
            [
              "v",
              "road speed",
              "m/s"
            ],
            [
              "r_w",
              "rolling radius",
              "m"
            ],
            [
              "i",
              "overall ratio in the gear used",
              ""
            ]
          ],
          "why": "Shows where the engine sits on its power curve at a given road speed, and so whether a machine is over- or under-geared for its top speed.",
          "example": "At 25.4 m/s: \\(n_w = 60 \\times 25.4 / (2\\pi \\times 0.30) = 809\\) rev/min, so in fifth \\(n_e = 10.22 \\times 809 \\approx 8270\\) rev/min, just below the 9,000 rpm power peak."
        },
        {
          "type": "eq",
          "id": "m1-acceleration",
          "name": "Acceleration from tractive force",
          "tex": "a = \\frac{F_t - F_{roll}}{k\\, m}",
          "where": [
            [
              "a",
              "acceleration",
              "m/s²"
            ],
            [
              "F_t",
              "tractive force",
              "N"
            ],
            [
              "F_{roll}",
              "rolling resistance",
              "N"
            ],
            [
              "k",
              "rotating-mass factor, about 1.1 to 1.2 in first gear",
              ""
            ],
            [
              "m",
              "total mass",
              "kg"
            ]
          ],
          "why": "Predicts how quickly a machine gathers speed in each gear. The factor k accounts for the force spent spinning up the crankshaft, flywheel, gears and wheels.",
          "example": "First gear, low speed: \\(a = (682 - 43) / (1.15 \\times 220) = 2.5\\ \\mathrm{m/s^2}\\), about 0.26 g."
        },
        {
          "type": "eq",
          "id": "m1-climb",
          "name": "Steepest climbable gradient",
          "tex": "\\sin\\theta_{max} = \\frac{F_t - F_{roll}}{m\\,g}",
          "where": [
            [
              "\\theta_{max}",
              "steepest road angle that can be climbed at steady low speed",
              "degrees"
            ],
            [
              "F_t",
              "tractive force in first gear",
              "N"
            ],
            [
              "F_{roll}",
              "rolling resistance",
              "N"
            ],
            [
              "m",
              "total mass",
              "kg"
            ],
            [
              "g",
              "gravitational acceleration",
              "m/s²"
            ]
          ],
          "why": "Tells whether a loaded machine can climb a given hill in first gear, and is the reason hill-town taxis fit a larger rear sprocket.",
          "example": "\\(\\sin\\theta_{max} = 639 / 2158 = 0.296\\), so \\(\\theta_{max} = 17.2^\\circ\\) and the gradient is \\(100 \\tan 17.2^\\circ \\approx 31\\) %."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Top speed",
              "html": "Wheel power \\(7.8 \\times 0.90 = 7.02\\ \\mathrm{kW}\\). Solve \\(0.36\\,v^3 + 43\\,v = 7020\\): \\(v \\approx 25.4\\ \\mathrm{m/s}\\), about <strong>91 km/h</strong>, matching the manual. Engine speed in fifth is then about 8,270 rpm."
            },
            {
              "title": "Acceleration in first",
              "html": "\\(a = (F_t - F_{roll}) / (k\\,m)\\), with \\(k \\approx 1.15\\) for rotating parts: \\((682 - 43) / (1.15 \\times 220) = 2.5\\ \\mathrm{m/s^2}\\), about <strong>0.26 g</strong>."
            },
            {
              "title": "Steepest climb",
              "html": "\\(\\sin\\theta = 639 / 2158 = 0.296\\), \\(\\theta = 17.2^\\circ\\): about <strong>31 %</strong>. With passenger and load it drops to roughly 22 %, which is why hill-town taxis fit a larger rear sprocket."
            }
          ]
        },
        {
          "type": "p",
          "html": "The rotating-mass factor is largest in first gear because the engine parts spin fastest relative to road speed there, so more of the tractive force goes into spinning them up; in top gear \\(k\\) falls towards 1. Shorter gearing would trade top speed for acceleration and climbing, and taller gearing the reverse, which is why the engine speed at top speed (8,270 rpm, just under the power peak) is the check for whether a machine is correctly geared."
        },
        {
          "type": "h3",
          "text": "Load transfer under braking"
        },
        {
          "type": "p",
          "html": "When the machine decelerates at \\(a\\), an inertial force \\(m\\,a\\) acts at the centre of mass at height \\(h\\), and its moment about the contact patches shifts load from the rear tyre to the front. Take the K-Light 125 with rider: static loads 971 N front and 1,187 N rear (machine 69/76 kg, rider 30/45 kg), \\(h = 0.65\\ \\mathrm{m}\\), \\(L = 1.44\\ \\mathrm{m}\\)."
        },
        {
          "type": "eq",
          "id": "m1-load-transfer",
          "name": "Load transfer under braking or acceleration",
          "tex": "\\Delta N = \\frac{m\\,a\\,h}{L}",
          "where": [
            [
              "\\Delta N",
              "load moved from one tyre to the other",
              "N"
            ],
            [
              "m",
              "total mass",
              "kg"
            ],
            [
              "a",
              "deceleration or acceleration",
              "m/s²"
            ],
            [
              "h",
              "height of the centre of mass",
              "m"
            ],
            [
              "L",
              "wheelbase",
              "m"
            ]
          ],
          "why": "Explains why the front brake does most of the stopping, why the rear locks so easily in a hard stop, and why powerful bikes wheelie under acceleration.",
          "example": "At 0.8 g (7.85 m/s²): \\(\\Delta N = 220 \\times 7.85 \\times 0.65 / 1.44 = 780\\ \\mathrm{N}\\), so the front carries \\(971 + 780 = 1751\\ \\mathrm{N}\\) and the rear only \\(1187 - 780 = 407\\ \\mathrm{N}\\)."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "At 0.8 g",
              "v": "\\(\\Delta N = 780\\ \\mathrm{N}\\)",
              "p": "\\(220 \\times 7.85 \\times 0.65 / 1.44\\)"
            },
            {
              "l": "Front load",
              "v": "1,751 N (81 %)",
              "p": "rear only 407 N"
            },
            {
              "l": "Rear lift-off",
              "v": "1.22 g",
              "p": "\\(a = g\\,b / h\\), \\(b = 0.79\\ \\mathrm{m}\\)"
            }
          ]
        },
        {
          "type": "eq",
          "id": "m1-rear-lift",
          "name": "Deceleration at which the rear wheel lifts",
          "tex": "a_{lift} = g\\,\\frac{b}{h}",
          "where": [
            [
              "a_{lift}",
              "deceleration at which the rear tyre load reaches zero",
              "m/s²"
            ],
            [
              "g",
              "gravitational acceleration",
              "m/s²"
            ],
            [
              "b",
              "horizontal distance from the centre of mass to the front contact patch",
              "m"
            ],
            [
              "h",
              "height of the centre of mass",
              "m"
            ]
          ],
          "why": "Sets the absolute braking limit of a machine on a grippy surface. Short, tall bikes reach it near 1 g, so a stoppie rather than a front-tyre slide becomes the limit.",
          "example": "\\(b = 1.44 \\times 1187 / 2158 = 0.79\\ \\mathrm{m}\\), so \\(a_{lift} = 9.81 \\times 0.79 / 0.65 = 11.9\\ \\mathrm{m/s^2}\\), about 1.22 g."
        },
        {
          "type": "p",
          "html": "With \\(\\mu \\approx 1.0\\), the rear can give at most 407 N of the 1,727 N needed, so the <strong>front must do at least three quarters</strong> of the braking. On a short, tall sport bike the lift-off limit falls close to 1 g. Under acceleration the transfer reverses and loads the rear tyre, so a powerful bike is limited by wheelie tendency rather than by rear grip."
        },
        {
          "type": "p",
          "html": "The same arithmetic explains brake design. The K-Light 125 has a 280 mm front disc against a 240 mm rear because the front must absorb most of the energy, and CBS sends part of the pedal effort forward because the lightly loaded rear tyre locks first. When a rear wheel locks repeatedly in normal stops, check the rear brake adjustment and the CBS linkage (<a href=\"../repair/repairs/cbs-check/\">Check a combined braking system</a>) before blaming the rider."
        },
        {
          "type": "figure",
          "fig": "weight-transfer",
          "caption": "Slide deceleration from 0.3 g to 1.0 g and watch the rear tyre's share collapse."
        },
        {
          "type": "check",
          "q": "m1-22"
        },
        {
          "type": "h3",
          "text": "The friction circle"
        },
        {
          "type": "p",
          "html": "A tyre's braking (or driving) force and its cornering force share one budget: the combined horizontal force must stay inside the friction circle of radius \\(\\mu N\\). Using 0.6 g of cornering with \\(\\mu = 1.0\\) leaves \\(\\sqrt{1 - 0.6^2} = 0.8\\) g for braking."
        },
        {
          "type": "eq",
          "id": "m1-friction-circle",
          "name": "Friction circle",
          "tex": "\\sqrt{F_x^2 + F_y^2} \\le \\mu\\, N",
          "where": [
            [
              "F_x",
              "braking or driving force",
              "N"
            ],
            [
              "F_y",
              "cornering force",
              "N"
            ],
            [
              "\\mu",
              "tyre to road friction coefficient",
              ""
            ],
            [
              "N",
              "vertical load on the tyre",
              "N"
            ]
          ],
          "why": "Shows that grip spent on cornering cannot also be spent on braking, which is why hard braking in a bend needs the lean reduced first.",
          "example": "Cornering at 0.6 g with \\(\\mu = 1.0\\): braking available \\(= \\sqrt{1.0^2 - 0.6^2} = 0.8\\) g."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Grip is not constant",
          "html": "Dry asphalt \\(\\mu \\approx 1.0\\); wet asphalt 0.5&ndash;0.7; painted lines, metal covers or gravel 0.2&ndash;0.4. To brake hard in a corner, reduce lean first."
        },
        {
          "type": "p",
          "html": "Because \\(N\\) itself changes with load transfer, the two friction circles change size during a stop: the front circle grows and the rear shrinks. A rear tyre that was gripping well at a steady speed can therefore lock under modest pedal force once the front brake is on hard, and a tyre at the wrong pressure or worn square has a smaller circle than its new value (<a href=\"../repair/repairs/tyre-inspect/\">Inspect tyres</a>)."
        },
        {
          "type": "h3",
          "text": "Gyroscopes, countersteering and lean"
        },
        {
          "type": "eq",
          "id": "m1-gyro-torque",
          "name": "Gyroscopic steering torque",
          "tex": "T_g = I\\,\\omega_w\\,\\Omega",
          "where": [
            [
              "T_g",
              "steering torque from precession",
              "N·m"
            ],
            [
              "I",
              "moment of inertia of the wheel about its axle",
              "kg·m²"
            ],
            [
              "\\omega_w",
              "wheel angular speed",
              "rad/s"
            ],
            [
              "\\Omega",
              "roll rate of the motorcycle",
              "rad/s"
            ]
          ],
          "why": "Explains why a rolling motorcycle steers itself into a lean, and shows that the effect is real but small beside tyre and trail forces.",
          "example": "Front wheel \\(I \\approx 0.4\\ \\mathrm{kg\\,m^2}\\) at 50 km/h (\\(\\omega_w \\approx 48\\ \\mathrm{rad/s}\\)) rolled at 0.5 rad/s: \\(T_g = 0.4 \\times 48 \\times 0.5 = 9.6\\ \\mathrm{N\\,m}\\)."
        },
        {
          "type": "p",
          "html": "Rolling a spinning wheel makes it precess, steering it into the lean. For \\(I \\approx 0.4\\ \\mathrm{kg\\,m^2}\\) at 50 km/h and a 0.5 rad/s roll rate the torque is only about <strong>9.6 N&middot;m</strong>: helpful, but small beside tyre and trail forces."
        },
        {
          "type": "p",
          "html": "<strong>Countersteering:</strong> a brief push on the <em>right</em> bar steers the wheel slightly left, the contact patches move left from under the centre of mass, and the bike rolls <em>right</em>. Then the steering settles into the turn."
        },
        {
          "type": "eq",
          "id": "m1-lean-angle",
          "name": "Lean angle in a steady turn",
          "tex": "\\tan\\theta = \\frac{v^2}{g\\,r}",
          "where": [
            [
              "\\theta",
              "lean angle from vertical",
              "degrees"
            ],
            [
              "v",
              "speed",
              "m/s"
            ],
            [
              "g",
              "gravitational acceleration",
              "m/s²"
            ],
            [
              "r",
              "turn radius",
              "m"
            ]
          ],
          "why": "Gives the lean a corner needs at a given speed; the resultant of weight and centrifugal force must pass through the contact patches. A wide tyre needs a few degrees more.",
          "example": "At 50 km/h (13.9 m/s) on a 40 m radius: \\(\\tan\\theta = 193 / 392 = 0.49\\), so \\(\\theta = 26^\\circ\\)."
        },
        {
          "type": "p",
          "html": "At 50 km/h on a 40 m radius the bike leans about <strong>26&deg;</strong>. A wide tyre needs a few degrees more than this ideal value because the contact patch moves across its profile, and the limit is set by friction or by ground clearance, whichever comes first."
        },
        {
          "type": "eq",
          "id": "m1-max-lean",
          "name": "Maximum lean angle set by grip",
          "tex": "\\tan\\theta_{max} = \\mu",
          "where": [
            [
              "\\theta_{max}",
              "greatest lean before the tyres slide",
              "degrees"
            ],
            [
              "\\mu",
              "tyre to road friction coefficient",
              ""
            ]
          ],
          "why": "Shows how much less lean, and so how much more speed reduction, a wet or dusty road demands before a bend.",
          "example": "Dry asphalt, \\(\\mu = 1.0\\): \\(\\theta_{max} = 45^\\circ\\). Wet asphalt, \\(\\mu = 0.5\\) to 0.7: \\(\\theta_{max}\\) about 27° to 35°."
        },
        {
          "type": "p",
          "html": "Stability comes mainly from <strong>trail</strong>: commuters typically have 25&ndash;28&deg; rake and 90&ndash;110 mm trail (Module 5)."
        },
        {
          "type": "figure",
          "fig": "steering-geometry",
          "caption": "Try rake 25&ndash;28&deg; and see where trail lands against the 90&ndash;110 mm commuter range."
        },
        {
          "type": "p",
          "html": "Trail is the distance on the ground by which the front contact patch lies behind the point where the steering axis meets the road. Because the tyre's side force acts at the contact patch, behind the axis, it turns the wheel in the direction the bike is leaning and straightens it again as the bike comes upright. Worn steering head bearings or a bent fork change how the front settles, so wobble or heavy steering after a knock is a reason to check them (<a href=\"../repair/repairs/steering-bearing-check/\">Check the steering head bearings</a>, <a href=\"../repair/repairs/fork-inspect/\">Inspect the front fork</a>)."
        },
        {
          "type": "check",
          "q": "m1-37"
        },
        {
          "type": "check",
          "q": "m1-38"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Power is torque times angular speed, \\(P = T\\,\\omega\\), with \\(\\omega\\) in rad/s; peak power comes above peak torque.<br>The overall ratio multiplies engine torque at the wheel; tractive force is wheel torque divided by rolling radius.<br>Rolling resistance is constant with speed, drag rises with \\(v^2\\) and drag power with \\(v^3\\), so top speed rises only slowly with power.<br>Load transfer \\(\\Delta N = m\\,a\\,h / L\\) puts at least three quarters of a hard stop on the front tyre.<br>Braking and cornering share one friction circle; reduce lean before braking hard, and expect far less grip in the wet.<br>Countersteering starts a turn; lean angle follows \\(\\tan\\theta = v^2 / (g\\,r)\\), and trail keeps the machine stable."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "YdrR9EFNdqo",
              "title": "Front or Rear Brake - which one is Safer?",
              "channel": "Moto Control",
              "channel_url": "http://www.youtube.com/@MotoControlEn",
              "duration": "12:45",
              "role": "How it works",
              "note": "Why the front brake does most of the stopping and how to use both; riding technique, not a repair."
            },
            {
              "id": "vSZiKrtJ7Y0",
              "title": "Can a Flat-Tread Motorcycle Turn? How Motorbikes Steer",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "7:58",
              "role": "How it works",
              "note": "How a bike steers by leaning on a round tyre profile; a flat tread test shows why."
            }
          ]
        }
      ]
    },
    {
      "id": "m1-workshop",
      "title": "Workshop safety, tools and measurement",
      "lead": "Good workshop practice is about not getting hurt, not damaging the machine and making decisions from numbers instead of guesses. That means controlling a few specific hazards, using fasteners correctly and reading precision instruments against the manual's limits.",
      "blocks": [
        {
          "type": "h3",
          "text": "Hazards and their controls"
        },
        {
          "type": "table",
          "head": [
            "Hazard",
            "Why it matters",
            "Control"
          ],
          "rows": [
            [
              "Carbon monoxide",
              "Odourless; binds haemoglobin ~200&times; more than oxygen; dangerous in minutes",
              "Never run an engine indoors without an extraction hose vented outside"
            ],
            [
              "Petrol vapour",
              "Heavier than air, pools in pits; ignites from ~1.4 %",
              "Approved containers, CO&#8322; or dry-powder extinguisher, disconnect battery first"
            ],
            [
              "Battery acid and hydrogen",
              "Hydrogen explosive at 4&ndash;75 % in air",
              "Ventilate; connect charger before switching on; negative off first, on last"
            ],
            [
              "Hot parts",
              "Headers reach 300&ndash;600 &deg;C, hot for half an hour",
              "Let it cool"
            ],
            [
              "Brake and clutch dust",
              "Respirable; older pads contained asbestos",
              "Clean wet or with brake cleaner, never compressed air"
            ],
            [
              "Lifting",
              "Falling bikes and back injury",
              "Centre stand, paddock stand or strapped lift; straight back or help"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Carbon monoxide is colourless as well as odourless, and a small engine idling in a closed garage can reach dangerous levels within minutes, so the extraction hose is not optional. Petrol vapour collects in pits and drains, and any spark ignites it: unplugging a connector, a starter test and static all produce one. Removing the battery negative first and refitting it last means a spanner that touches the frame while on the positive terminal cannot short the battery."
        },
        {
          "type": "p",
          "html": "A backfire can set an air filter box alight, and a fire that is nearly out is still burning the machine while someone fetches an extinguisher from across the room. Keep a CO&#8322; or dry-powder extinguisher within reach of the job, not merely in the workshop, and wear a helmet, gloves and jacket for every test ride on an unfamiliar machine, whose brakes or chain may be in worse condition than its owner reported (<a href=\"../repair/repairs/road-test/\">Road test after a repair</a>)."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "First aid at the bench",
          "html": "Wash even a small cut at once with soap and water and cover it: a neglected cut can become infected. Flood acid on skin or in the eyes with plenty of clean water; baking soda kept with the battery tools neutralises acid spills. Cool a burn under cool running water, and get medical help for any burn deeper than a blister. Keep a first-aid kit in the workshop and restock it when it is used."
        },
        {
          "type": "p",
          "html": "General PPE: <strong>safety glasses, nitrile gloves and safety footwear</strong>."
        },
        {
          "type": "photo",
          "src": "repair-photos/017_micro_fiche_reader.jpg",
          "caption": "Microfiche reader used to look up parts diagrams"
        },
        {
          "type": "photo",
          "src": "repair-photos/032_chemicals.jpg",
          "caption": "Shelf of sprays and chemicals in a workshop",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "High-voltage electric motorcycles",
          "html": "Packs run at 48&ndash;120 V, up to about 400 V DC on larger bikes. Anything <strong>above 60 V DC</strong> is high voltage, can kill, and cannot be switched off inside the pack. Only trained technicians open orange-cabled circuits: remove and lock out the service disconnect, wait for capacitors to discharge, verify absence of voltage with a rated meter, and use tools insulated to IEC 60900 (1,000 V)."
        },
        {
          "type": "photo",
          "src": "repair-photos/034_air_impact_wrenches.jpg",
          "caption": "Air impact wrenches",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "check",
          "q": "m1-26"
        },
        {
          "type": "h3",
          "text": "Hot and cold"
        },
        {
          "type": "p",
          "html": "Metal expands as it warms, and aluminium expands more than steel. That loosens fasteners in service, but it also helps in the workshop: an aluminium case heated evenly releases a steel bearing, and a bearing chilled in a freezer drops into a warm housing. Many checks are only valid at one temperature."
        },
        {
          "type": "table",
          "head": [
            "Job",
            "Do it",
            "Why"
          ],
          "rows": [
            [
              "Tyre pressure",
              "Cold",
              "Air in a tyre warmed by riding reads high"
            ],
            [
              "Valve clearance",
              "Cold",
              "Clearances in the manual are cold values; the head and valves grow as they heat"
            ],
            [
              "Radiator cap",
              "Open only cold",
              "A hot cooling system is pressurised and sprays boiling coolant"
            ],
            [
              "Coolant level",
              "Warm, at the overflow reservoir",
              "The reservoir marks allow for expansion"
            ],
            [
              "Oil change",
              "Warm",
              "Warm oil drains faster and carries its suspended dirt out with it"
            ],
            [
              "Chain lubrication",
              "After a ride, chain warm",
              "The lubricant penetrates the rollers better"
            ],
            [
              "Bearing in an aluminium case",
              "Heat the case evenly; chill the new bearing",
              "The case grows away from the bearing; heat only one spot and it can warp"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Heat with care",
          "html": "Start with a hot-air gun and move it so the whole part warms evenly. A flame is a last resort: localised heat warps castings, and steel heated too far loses its temper and becomes soft. Never heat near fuel, brake fluid lines or a battery."
        },
        {
          "type": "h3",
          "text": "Fasteners and torque"
        },
        {
          "type": "p",
          "html": "A metric thread is diameter &times; pitch: <strong>M8 &times; 1.25</strong> coarse, M8 &times; 1.0 fine. Use six-point sockets or ring spanners on tight fasteners; an open-ender grips two flats and rounds the head."
        },
        {
          "type": "table",
          "head": [
            "Property class",
            "Tensile strength",
            "Yield strength"
          ],
          "rows": [
            [
              "8.8",
              "800 MPa",
              "640 MPa"
            ],
            [
              "10.9",
              "1,000 MPa",
              "900 MPa"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The <strong>property class</strong> on a bolt head gives its strength: the first number times 100 is the tensile strength in MPa, and the product of the two numbers times 10 is the yield strength (8.8: 800 and 640 MPa). A replacement must be of at least the original class, and bolts removed during a strip-down are kept and labelled, since a cylinder head or cam sprocket bolt has a strength that a general-purpose bolt from the bin may not match."
        },
        {
          "type": "p",
          "html": "A tightened bolt is a stiff spring: its stretch is the clamp load. Because 80&ndash;90 % of the applied torque is lost to friction under the head and in the thread, the relation between torque and clamp load is only approximate, with a nut factor \\(K \\approx 0.20\\) dry and 0.15 oiled."
        },
        {
          "type": "eq",
          "id": "m1-bolt-torque",
          "name": "Bolt torque and clamp load",
          "tex": "T = K\\,d\\,F",
          "where": [
            [
              "T",
              "tightening torque",
              "N·m"
            ],
            [
              "K",
              "nut factor: about 0.20 dry, 0.15 oiled",
              ""
            ],
            [
              "d",
              "nominal bolt diameter",
              "m"
            ],
            [
              "F",
              "clamp load (bolt tension)",
              "N"
            ]
          ],
          "why": "Shows why the manual says whether to oil a thread: the same torque on an oiled thread gives about a third more clamp load, which can take a bolt close to its proof load.",
          "example": "M8 at 25 N·m dry: \\(F = 25 / (0.20 \\times 0.008) = 15.6\\ \\mathrm{kN}\\). Oiled, \\(F = 25 / (0.15 \\times 0.008) = 20.8\\ \\mathrm{kN}\\), close to the 22 kN proof load of a class 8.8 M8 bolt."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "M8, 25 N&middot;m, dry",
              "v": "15.6 kN",
              "p": "\\(25 / (0.20 \\times 0.008)\\)"
            },
            {
              "l": "Same bolt, oiled",
              "v": "20.8 kN",
              "p": "close to 22 kN proof load (8.8)"
            },
            {
              "l": "Head nuts",
              "v": "25&ndash;28 N&middot;m",
              "p": "K-Light 125, crisscross in stages"
            },
            {
              "l": "Disc bolts",
              "v": "10&ndash;12 N&middot;m",
              "p": "K-Light 125 manual"
            }
          ]
        },
        {
          "type": "p",
          "html": "A bolt that keeps turning while the torque stops rising has yielded: it has stretched beyond its elastic range and will not hold its clamp load. Stop, and replace it. Cylinder head bolts and studs are often <em>waisted</em>, with a shank thinner than the thread, so that they stretch evenly along their length under the high load they carry."
        },
        {
          "type": "p",
          "html": "Multi-fastener joints are tightened in a crisscross <strong>tightening sequence</strong> in two or three stages, so the part is pulled down evenly. Tightening one nut fully first tilts a cylinder head, compresses the gasket unevenly and leaves leak paths or a distorted head."
        },
        {
          "type": "table",
          "head": [
            "Fastener (K-Light 125 manual)",
            "Torque"
          ],
          "rows": [
            [
              "Front axle nut",
              "75&ndash;88 N&middot;m"
            ],
            [
              "Rear sprocket nuts M10 &times; 1.25",
              "45&ndash;50 N&middot;m, crisscross in 2 to 3 passes"
            ],
            [
              "Side stand bolt and footrest bolts M10 &times; 1.25",
              "45&ndash;50 N&middot;m"
            ],
            [
              "Mirror bolt (Allen M8)",
              "22&ndash;29 N&middot;m"
            ],
            [
              "Cylinder head nuts",
              "25&ndash;28 N&middot;m, crisscross in stages"
            ],
            [
              "Brake disc bolts",
              "10&ndash;12 N&middot;m"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rules of thumb",
          "html": "Follow the manual on whether to oil a thread. Replace a bolt with at least the original class. Blue threadlocker comes out with hand tools; red needs about 250 &deg;C. Pull a click wrench smoothly at right angles, never loosen with it, store it at its lowest setting. Use a JIS driver on screws marked with a dot: a Phillips tip cams out and strips them."
        },
        {
          "type": "p",
          "html": "A click-type torque wrench has a typical accuracy of about &plusmn;4 % and is calibrated at intervals. Checking every chassis fastener with it at a service, and marking each with a paint line, shows any that move later (<a href=\"../repair/repairs/fastener-check/\">Check chassis fasteners</a>)."
        },
        {
          "type": "h3",
          "text": "Precision measuring tools"
        },
        {
          "type": "photo",
          "src": "repair-photos/017_brand.jpg",
          "caption": "Dial caliper for measuring shafts and widths"
        },
        {
          "type": "photo",
          "src": "repair-photos/016_my_tool_board.jpg",
          "caption": "Tools hung on a workshop board"
        },
        {
          "type": "table",
          "head": [
            "Tool",
            "Resolution",
            "Used for"
          ],
          "rows": [
            [
              "Vernier / dial caliper",
              "0.02 or 0.05 mm",
              "Spring and chain length, pad and disc thickness"
            ],
            [
              "Outside micrometer",
              "0.01 mm",
              "Pins, shafts, bores via a transfer gauge"
            ],
            [
              "Dial gauge on magnetic base",
              "0.01 mm",
              "Movement and runout (total indicator reading)"
            ],
            [
              "Telescopic / small hole / dial bore gauge",
              "via micrometer",
              "Bores"
            ],
            [
              "Feeler gauges",
              "&ndash;",
              "Valve clearance, ring end gap"
            ],
            [
              "Plastigauge",
              "&ndash;",
              "Bearing oil clearance from squashed width"
            ],
            [
              "Multimeter",
              "&ndash;",
              "Volts in parallel; amps in series; ohms only de-energised"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The multimeter rules protect both the circuit and the meter: voltage is measured in parallel on a live circuit, current in series within the meter's fuse rating, and resistance or continuity only with the circuit switched off and the part disconnected. The K-Light 125 charging test, for example, expects 14.5 &plusmn; 0.5 V at the battery at 5,000 rpm (<a href=\"../repair/repairs/charging-system-test/\">Test the charging system</a>)."
        },
        {
          "type": "h3",
          "text": "Reading a micrometer"
        },
        {
          "type": "p",
          "html": "An outside micrometer has 1 mm divisions above the index line on the sleeve and 0.5 mm divisions below it; the thimble has 50 divisions of 0.01 mm, so one turn moves the spindle 0.5 mm. The reading is the sum of four parts."
        },
        {
          "type": "eq",
          "id": "m1-micrometer",
          "name": "Reading an outside micrometer",
          "tex": "L = L_0 + s + 0.5\\,h + 0.01\\,t",
          "where": [
            [
              "L",
              "measured size",
              "mm"
            ],
            [
              "L_0",
              "base of the range (0, 25, 50 and so on)",
              "mm"
            ],
            [
              "s",
              "whole millimetres visible on the sleeve above the line",
              "mm"
            ],
            [
              "h",
              "1 if a half-millimetre line shows below the line, otherwise 0",
              ""
            ],
            [
              "t",
              "thimble division on the index line (0 to 49)",
              ""
            ]
          ],
          "why": "Turns the sleeve and thimble markings into a size to 0.01 mm. Forgetting the base of the range on a 25 to 50 mm micrometer is the classic error.",
          "example": "0 to 25 mm micrometer, 12 mm on the sleeve, half line showing, thimble 49: \\(L = 0 + 12 + 0.5 + 0.49 = 12.99\\ \\mathrm{mm}\\)."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Check zero",
              "html": "Clean anvil and spindle, close with the ratchet: thimble zero must align with the index line."
            },
            {
              "title": "Let the part reach room temperature",
              "html": "A pin warmed in the hand expands measurably."
            },
            {
              "title": "Close with the ratchet",
              "html": "Let it slip two or three times for constant force, rock slightly, lock the spindle."
            },
            {
              "title": "Add it up",
              "html": "Whole mm on the sleeve (12) + 0.5 if the lower line shows + thimble (49 = 0.49): <strong>12 + 0.5 + 0.49 = 12.99 mm</strong>. On a 25&ndash;50 mm micrometer, add 25."
            },
            {
              "title": "Measure six places",
              "html": "Both piston bosses and the small end, two orientations 90&deg; apart; a step shows local wear."
            }
          ]
        },
        {
          "type": "p",
          "html": "<strong>Pass criteria (job sheet 1.5.1):</strong> zero checked, six readings within 0.002 mm of the instructor's, and a correct decision to replace the pin if any reading is below the 12.96 mm limit."
        },
        {
          "type": "check",
          "q": "m1-28"
        },
        {
          "type": "h3",
          "text": "Standard value vs service limit"
        },
        {
          "type": "p",
          "html": "The <strong>standard value</strong> is the size of a new part; the <strong>service limit</strong> is the worn size at which it must be replaced. K-Light 125 piston pin: standard <strong>12.994&ndash;13.000 mm</strong>, limit <strong>12.96 mm</strong>; piston bore 13.002&ndash;13.008 mm, limit 13.04 mm. A part near its limit at a major service is often replaced anyway, since the labour to reach it again costs more. Record every reading on the job card."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Within the standard value",
              "html": "The part is as new: refit it."
            },
            {
              "title": "Between standard value and service limit",
              "html": "Serviceable, but worn. Record the reading; if the part is unlikely to stay within limit until it is next accessible, replace it now."
            },
            {
              "title": "Beyond the service limit",
              "html": "Replace or recondition the part, and look for the cause of the wear before reassembly."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Measuring disc runout (job sheet 1.5.2)"
        },
        {
          "type": "p",
          "html": "A dial gauge reads movement, so runout is the difference between the highest and lowest readings over one full turn, the <strong>total indicator reading</strong>. Zeroing at the lowest point simply makes the highest reading equal to the runout."
        },
        {
          "type": "eq",
          "id": "m1-runout",
          "name": "Runout as total indicator reading",
          "tex": "\\mathrm{TIR} = x_{max} - x_{min}",
          "where": [
            [
              "\\mathrm{TIR}",
              "total indicator reading (runout)",
              "mm"
            ],
            [
              "x_{max}",
              "highest dial reading over one turn",
              "mm"
            ],
            [
              "x_{min}",
              "lowest dial reading over one turn",
              "mm"
            ]
          ],
          "why": "Gives the runout of a disc, wheel rim or axle, compared with the service limit to decide whether the part is true enough to use.",
          "example": "Zeroed at the lowest point, the needle peaks at 0.11 mm: \\(\\mathrm{TIR} = 0.11 - 0 = 0.11\\ \\mathrm{mm}\\), within the K-Light 125 disc limit of 0.15 mm."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Check bearing play first",
              "html": "Raise the wheel and rock it; play makes runout readings meaningless."
            },
            {
              "title": "Set up the gauge",
              "html": "Plunger square to the disc, 5&ndash;10 mm inside the edge, preloaded about half a needle turn."
            },
            {
              "title": "Zero at the lowest reading",
              "html": "Turn one full revolution; the highest reading is the runout. Over <strong>0.15 mm</strong>, check disc bolts (10&ndash;12 N&middot;m) and hub face before condemning the disc."
            },
            {
              "title": "Measure thickness at four points",
              "html": "Standard 4.0 mm, limit 3.0 mm; variation over about 0.015 mm causes judder."
            },
            {
              "title": "Check the axle",
              "html": "On V-blocks, gauge at the centre; replace above 0.2 mm bend."
            }
          ]
        },
        {
          "type": "p",
          "html": "<strong>Pass criteria (job sheet 1.5.2):</strong> gauge preloaded and zeroed, runout and thickness recorded at the correct positions, and a correct decision with the cause of any excess identified. The same method checks a wheel rim (<a href=\"../repair/repairs/wheel-runout-check/\">Check wheel runout</a>); the disc procedure in full is at <a href=\"../repair/repairs/brake-disc-check/\">Check a brake disc</a>."
        },
        {
          "type": "h3",
          "text": "Thread repair and broken bolts"
        },
        {
          "type": "p",
          "html": "<strong>Thread insert (1.5.3):</strong> use the kit's oversize drill and tap (never a standard tap), back off half a turn every turn, wind the insert in tang first to 0.25&ndash;0.5 turn below the surface, then break off the tang."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Check the material",
              "html": "Wear safety glasses, identify thread size and depth, and check there is at least about 2 mm of material around the hole for the larger drill."
            },
            {
              "title": "Drill square",
              "html": "Drill out the old thread with the kit drill, square to the surface and on the original centreline, to full depth of a blind hole or right through an open one."
            },
            {
              "title": "Tap and clear",
              "html": "Tap with the kit tap and cutting fluid, backing off half a turn every turn to break the chips, then blow the hole clear, never towards yourself."
            },
            {
              "title": "Fit and test",
              "html": "Wind the insert in, remove the tang, run the original bolt in by hand and tighten it to specification. Pass: insert just below the surface, hole square, and the bolt reaches its torque without the insert turning."
            }
          ]
        },
        {
          "type": "p",
          "html": "<strong>Broken bolt (1.5.4):</strong> soak at least 15 minutes in penetrating oil, punch the exact centre, drill along the axis (typically 4&ndash;5 mm for M8), turn the extractor anticlockwise with steady force. If stuck, heat the <em>casting</em> (not the bolt) to 100&ndash;150 &deg;C. Extractors are brittle: a broken one needs spark erosion (EDM), shattering or carbide burrs, then an insert."
        },
        {
          "type": "h3",
          "text": "Reading a service manual and its specification tables"
        },
        {
          "type": "p",
          "html": "A specification table often covers several models on one page, so the commonest mistake is not a wrong measurement but a value read from the wrong row or in the wrong unit. A few habits prevent it."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Match the full model code",
              "html": "Find the model code and year from the frame number, and match the whole code, not only the engine size."
            },
            {
              "title": "Read the heading and units",
              "html": "Check whether a column is in mm or inches, N&middot;m, kgf&middot;m or lbf&middot;ft, litres or quarts, kPa or psi. Converting torque is covered in Chapter 1.6."
            },
            {
              "title": "Follow the row with a ruler",
              "html": "Lay a ruler or a strip of paper under the row so the eye cannot slip to the next model."
            },
            {
              "title": "Read the footnotes",
              "html": "A small mark next to a value points to a note: how a float height is measured, which way a needle clip position is counted, or a value that applies to one version only. A dash usually means not applicable."
            },
            {
              "title": "Know which quantity applies",
              "html": "Oil and fork oil tables often give one quantity for an oil change and a larger one for a dry, rebuilt unit. Use the right one and then check the level."
            },
            {
              "title": "Cross-check a value you can see",
              "html": "The spark plug listed should match the plug in the engine, and the chain size should match the number on the side plates. If not, the row may be wrong or the machine modified."
            }
          ]
        },
        {
          "type": "p",
          "html": "Manuals can also be wrong. Before stripping an engine, set cylinder one at top dead centre on the compression stroke and check that the timing marks line up as the manual describes; if they do not, record the marks that are actually used before anything is removed: <a href=\"../repair/repairs/manual-cross-check/\">Check a shop manual's steps against the engine</a>."
        },
        {
          "type": "h3",
          "text": "Organising a strip-down"
        },
        {
          "type": "p",
          "html": "Most rebuild errors come from parts that go back in the wrong place or the wrong way round. Parts that wear together, such as valves and their seats or push rods and their rockers, should go back where they came from, even when they would fit elsewhere."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Photograph first",
              "html": "Take photographs as the machine comes apart: clutch plate order, cable and wiring routes, the position of marks. They help most when the job waits for weeks."
            },
            {
              "title": "One tray per assembly",
              "html": "Keep the bolts, nuts and washers of each assembly in their own tray or tin, never in one pile."
            },
            {
              "title": "Mark the parts",
              "html": "Write on parts with a felt-tip marker: left inlet, right exhaust, rear top. Mark push rods and valves with their position."
            },
            {
              "title": "Keep screw lengths in order",
              "html": "For a cover with screws of mixed length, draw the hole pattern on card, punch a hole for each screw and push it in. If they are mixed up, set each screw in a hole: one that stands out much more or less than the rest is in the wrong place."
            },
            {
              "title": "Bag and label",
              "html": "If the job will wait, put each tray in a labelled bag to keep out oil and dust and to keep shims and small parts with their assembly."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/048_parts_tray.jpg",
          "caption": "A parts tray keeping the fasteners of one assembly together",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "The full method is in <a href=\"../repair/repairs/teardown-organise/\">Keep parts in order during a strip-down</a>."
        },
        {
          "type": "h3",
          "text": "Cleaning parts and workshop chemicals"
        },
        {
          "type": "p",
          "html": "Dirty parts hide cracks, scores and wear, so parts are cleaned before they are inspected or measured. <strong>Never clean parts with petrol</strong>: its vapour ignites from any spark. Use a petroleum parts-cleaning solvent with gloves and eye protection, scrub with a stiff brush, let the part drain, and oil bare steel at once so that it does not rust. Do not spin a dry bearing with compressed air: it overspeeds and is damaged."
        },
        {
          "type": "table",
          "head": [
            "Product",
            "Used for",
            "Watch out for"
          ],
          "rows": [
            [
              "Penetrating oil",
              "Rusted fasteners and seized parts; spray, wait, then work the part back and forth",
              "Evaporates in a day or two: oil the part afterwards"
            ],
            [
              "Contact cleaner",
              "Corroded or damp electrical contacts and switches",
              "Flammable; work the switch between sprays"
            ],
            [
              "Brake cleaner",
              "Removing oil from brake parts",
              "Flammable; use it with good airflow, away from flames"
            ],
            [
              "Carburettor cleaner",
              "Soaking small carburettor parts and clearing jets and passages",
              "Eye protection: spray can rebound from a blocked passage"
            ],
            [
              "Anti-seize compound",
              "Exposed threads, spark plug threads, axle and wheel fittings",
              "Only where the manual allows: it changes the torque-to-clamp relation"
            ],
            [
              "Gasket remover",
              "Softening old gaskets before scraping",
              "Leave it to work; scrape aluminium faces with care"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Keep each product labelled, closed and away from heat, and put oily rags in a metal bin with a lid: oily rags can heat up and catch fire by themselves. See <a href=\"../repair/repairs/parts-solvent-clean/\">Clean engine parts safely with solvent</a> and <a href=\"../repair/repairs/workshop-chemicals-choose/\">Choose the right workshop chemicals</a>."
        },
        {
          "type": "check",
          "q": "m1-39"
        },
        {
          "type": "check",
          "q": "m1-40"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Never run an engine indoors without extraction; keep an extinguisher within reach; disconnect the battery negative first and refit it last.<br>Treat any electric pack above 60 V DC as lethal: isolate, wait, and prove absence of voltage before touching it.<br>Clamp load follows \\(T = K\\,d\\,F\\) only roughly; oiling a thread raises clamp load for the same torque, so follow the manual.<br>Tighten joints in a crisscross sequence in stages, replace any bolt that yields, and replace bolts with at least the original property class.<br>Read instruments correctly (micrometer to 0.01 mm, runout as total indicator reading) and compare every reading with the standard value and service limit."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "JKZVc4JRY4A",
              "title": "Special Tools Every Motorcyclist Should Own",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "10:48",
              "role": "How-to",
              "note": "Which specialist tools are worth owning; ties tools to tasks, check price and need first."
            },
            {
              "id": "Y0c1rVgTg5g",
              "title": "10 Time-Saving Motorcycle Tools",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "10:05",
              "role": "How-to",
              "note": "Tools that save time in the workshop; weigh cost against how often you use them."
            }
          ]
        }
      ]
    },
    {
      "id": "m1-fasteners",
      "title": "Fasteners, threads and torque",
      "lead": "A motorcycle is held together by a few hundred threaded fasteners, and most of them are loaded every time the engine fires or the wheel hits a bump. Knowing how a bolt clamps a joint, how to identify its thread and strength, how to lock it and how to tighten it correctly is the skill behind almost every job in the rest of the course.",
      "blocks": [
        {
          "type": "h3",
          "text": "What a tightened bolt really does"
        },
        {
          "type": "p",
          "html": "A bolt is a stiff spring. As the nut is turned, the bolt stretches by a small amount and pulls the parts together with a force called the <strong>clamp load</strong> (or preload). The joint then holds by friction between the clamped faces and by that steady tension, not by the bolt shank bearing on the sides of its hole."
        },
        {
          "type": "p",
          "html": "A joint stays tight as long as the clamp load is greater than the forces trying to separate or slide the parts. If the clamp load is too low, the parts move against each other with every load cycle, the bolt is bent back and forth, and it works loose or breaks in fatigue. If it is too high, the bolt yields or the thread strips. Torque is only the way the clamp load is set, and since 80&ndash;90 % of the applied torque is lost to friction under the head and in the thread (Chapter 1.5), the condition of the thread matters as much as the number on the wrench."
        },
        {
          "type": "photo",
          "src": "repair-photos/039_if_torqueing_bolt_engine_feel_yield.jpg",
          "caption": "Bolt heads with different strength markings",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "eq",
          "id": "m1-bolt-stress",
          "name": "Tensile stress in a bolt",
          "tex": "\\sigma = \\frac{F}{A_s}",
          "where": [
            [
              "\\sigma",
              "tensile stress in the threaded part of the bolt",
              "MPa (N/mm²)"
            ],
            [
              "F",
              "clamp load (bolt tension)",
              "N"
            ],
            [
              "A_s",
              "tensile stress area of the thread, from thread tables",
              "mm²"
            ]
          ],
          "why": "Compares the load a bolt carries with the yield strength of its property class, which shows how close a tightened bolt is to taking a permanent set.",
          "example": "The M8 bolt of Chapter 1.5 clamps with 15.6 kN; its stress area is 36.6 mm², so \\(\\sigma = 15\\,600 / 36.6 \\approx 426\\ \\mathrm{MPa}\\), two thirds of the 640 MPa yield strength of class 8.8."
        },
        {
          "type": "eq",
          "id": "m1-bolt-stretch",
          "name": "Bolt stretch under load",
          "tex": "\\Delta L = \\frac{F\\,L_g}{E\\,A_s}",
          "where": [
            [
              "\\Delta L",
              "elastic stretch of the bolt",
              "mm"
            ],
            [
              "F",
              "clamp load",
              "N"
            ],
            [
              "L_g",
              "grip length: the length of bolt between the head and the nut or thread engagement",
              "mm"
            ],
            [
              "E",
              "modulus of elasticity, about 200,000 N/mm² for steel",
              "N/mm²"
            ],
            [
              "A_s",
              "tensile stress area",
              "mm²"
            ]
          ],
          "why": "Shows how little a correctly tightened bolt stretches, why stretch can be measured with a micrometer on bolts the manual specifies by length, and why a bolt that stays longer after loosening has yielded.",
          "example": "The same M8 bolt with a 40 mm grip: \\(\\Delta L = \\frac{15\\,600 \\times 40}{200\\,000 \\times 36.6} \\approx 0.085\\ \\mathrm{mm}\\), less than a tenth of a millimetre."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Clamp load, M8 at 25 N&middot;m dry",
              "v": "15.6 kN",
              "p": "from \\(T = K\\,d\\,F\\), Chapter 1.5"
            },
            {
              "l": "Stress area, M8 coarse",
              "v": "36.6 mm²",
              "p": "from thread tables"
            },
            {
              "l": "Stress in the bolt",
              "v": "&asymp; 426 MPa",
              "p": "class 8.8 yields at 640 MPa"
            },
            {
              "l": "Stretch over a 40 mm grip",
              "v": "&asymp; 0.085 mm",
              "p": "returns to zero when loosened"
            }
          ]
        },
        {
          "type": "p",
          "html": "Because the stretch is so small, anything that lets the clamped parts settle steals a large share of it. Paint, dirt or a burr under a head, or a gasket that compresses as it heats, can shorten the clamped stack by a few hundredths of a millimetre and lose much of the clamp load. That is why seats are cleaned before assembly, and why some manuals call for a re-check after the first heat cycle."
        },
        {
          "type": "p",
          "html": "A bolt that has been taken past its yield point does not spring back: it stays longer, is thinner in the waist and will not hold its clamp load again. If a bolt keeps turning while the force on the wrench stops rising, it has yielded and must be replaced. Rod bolts, cylinder head bolts and studs are the most highly stressed fasteners in the engine; some rod bolts are set by measured stretch instead of torque, and the manual says so where it applies: <a href=\"../repair/repairs/bolt-stretch-measure/\">Measure bolt stretch and learn what a failed bolt looks like</a>."
        },
        {
          "type": "h3",
          "text": "Threads: size, pitch and standard"
        },
        {
          "type": "p",
          "html": "A metric thread is named by its nominal diameter and its <strong>pitch</strong>, the distance from one thread crest to the next: M8 &times; 1.25 is 8 mm across with 1.25 mm pitch. Each diameter has a standard coarse pitch, which is usually left out of the name (a plain M8 is 1.25), and one or more fine pitches, which are always stated."
        },
        {
          "type": "table",
          "head": [
            "Thread",
            "ISO coarse pitch",
            "Fine pitches you will meet",
            "Examples on the K-Light 125"
          ],
          "rows": [
            [
              "M5",
              "0.8 mm",
              "&ndash;",
              "Small covers and clamps"
            ],
            [
              "M6",
              "1.0 mm",
              "&ndash;",
              "Covers and brackets"
            ],
            [
              "M8",
              "1.25 mm",
              "1.0 mm",
              "Mirror bolt (Allen M8), 22&ndash;29 N&middot;m"
            ],
            [
              "M10",
              "1.5 mm",
              "1.25 mm",
              "Rear sprocket nuts, side stand and footrest bolts, M10 &times; 1.25, 45&ndash;50 N&middot;m"
            ],
            [
              "M12",
              "1.75 mm",
              "1.25 or 1.5 mm",
              "Larger chassis and axle fittings on many machines"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The rule for choosing between them is about the weaker of the two threads. A bolt that screws into a casting normally has a <strong>coarse</strong> thread, because deep, widely spaced threads hold better in soft aluminium. A bolt or stud that takes a steel nut is normally <strong>fine</strong>, which gives finer adjustment and resists loosening. Many machines break the rule, so measure rather than assume. Male threads on good bolts are <strong>rolled</strong>, which leaves the grain of the steel unbroken and is stronger than a cut thread; avoid cutting extra thread on a bolt unless there is no alternative."
        },
        {
          "type": "table",
          "head": [
            "Standard",
            "Where it is found",
            "How to recognise it"
          ],
          "rows": [
            [
              "ISO metric (JIS on Japanese machines)",
              "Almost every modern motorcycle",
              "60&deg; thread, pitch in millimetres"
            ],
            [
              "Unified (UNC coarse, UNF fine)",
              "American machines and parts made for them",
              "60&deg; thread, pitch given as threads per inch"
            ],
            [
              "British Standard Whitworth and Fine (BSW, BSF)",
              "Older British machines",
              "55&deg; thread with rounded crests and roots; spanners sized by bolt, not across flats"
            ],
            [
              "British Association (BA)",
              "Small screws on older British machines and instruments",
              "Small screws with a rounded thread"
            ],
            [
              "Cycle thread (CEI, BSC)",
              "Older British machines and bicycles",
              "Very fine pitch, to resist shaking loose"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Threads of different standards do not mix even when the sizes look the same. A metric bolt can start into an inch hole, or the reverse, for a turn or two and then jam; if a bolt goes stiff after a few turns, stop and identify both threads before the hole is ruined. Some shafts carry a <strong>left-hand thread</strong> so that rotation tends to tighten the nut. The manual normally lists them, but not always: if a nut will not turn the usual way and is not corroded, try the other way before applying more force."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Clean the thread",
              "html": "Brush the thread clean so the gauge can sit fully in it."
            },
            {
              "title": "Measure the diameter",
              "html": "Measure the outside diameter of the thread with a caliper."
            },
            {
              "title": "Find the pitch",
              "html": "Try metric and inch pitch gauges. The right leaf sits in the thread along its whole length with no light showing."
            },
            {
              "title": "Note the marks",
              "html": "Look for a strength mark on the head and a left-hand mark (a notch or an L)."
            },
            {
              "title": "Write it down",
              "html": "Record diameter, pitch and standard, for example metric 6 mm, 1.0 pitch, and take the old bolt when buying a new one."
            }
          ]
        },
        {
          "type": "p",
          "html": "Full procedure: <a href=\"../repair/repairs/thread-standard-identify/\">Identify a thread standard and pitch</a>."
        },
        {
          "type": "h3",
          "text": "Strength grades and head markings"
        },
        {
          "type": "p",
          "html": "The strength of a metric bolt is given by its <strong>property class</strong>, stamped on the head. The first number times 100 is the minimum tensile strength in MPa, and the second number divided by 10 is the fraction of that strength at which the bolt yields. Class 8.8 is therefore \\(8 \\times 100 = 800\\ \\mathrm{MPa}\\) tensile and \\(0.8 \\times 800 = 640\\ \\mathrm{MPa}\\) yield; class 10.9 is 1,000 MPa and 900 MPa. The higher the class, the more clamp load the bolt can carry before it yields."
        },
        {
          "type": "p",
          "html": "Many bolts on a motorcycle carry no class mark at all, or only a maker's mark or a single number, so the safe habit is to keep fasteners from different places apart and refit each where it came from. A replacement must be of at least the original class; a weaker bolt in a cylinder head, cam sprocket or engine mount can destroy an engine or cause a crash. High-stress bolts and studs are often <strong>waisted</strong>, with a shank thinner than the thread so that the stretch is spread along the length; replace like with like."
        },
        {
          "type": "photo",
          "src": "repair-photos/039_hurts_seeing_how_these_bolts_don.jpg",
          "caption": "Waisted studs used on a high-stress joint",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Fasteners do not wear out in normal use, and a full set of special bolts for a top end can cost more than the job. Save every bolt, nut and washer during a strip-down: <a href=\"../repair/repairs/fastener-types-identify/\">Identify bolt strength, thread and locking types before you reuse them</a>."
        },
        {
          "type": "h3",
          "text": "Locking methods"
        },
        {
          "type": "p",
          "html": "Vibration can loosen a fastener whose clamp load has fallen, so many joints add a locking method. Each has its own rule for reuse."
        },
        {
          "type": "table",
          "head": [
            "Method",
            "How it works",
            "Reuse"
          ],
          "rows": [
            [
              "Spring, wave or toothed lock washer (over a plain washer)",
              "Bites into or springs against the nut and the part",
              "Replace if flattened or the teeth are worn"
            ],
            [
              "Nylon-collar or metal-collar locknut",
              "The collar grips the thread and resists turning",
              "Can usually be reused a number of times while it still grips"
            ],
            [
              "Tab washer or key nut",
              "Part of the washer or nut is bent against a flat or into a groove",
              "Renew once it has been bent and straightened"
            ],
            [
              "Castle nut with a split (cotter) pin",
              "The pin passes through the nut slots and a hole in the shaft",
              "Always fit a new pin"
            ],
            [
              "Threadlocker",
              "An adhesive that cures in the thread",
              "Clean the old compound out; blue comes apart with hand tools, red needs about 250 &deg;C"
            ],
            [
              "Safety wire",
              "Wire twisted between fasteners so each pulls the other tight",
              "Fit new wire every time"
            ]
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/039_obviously_lock_washer_fighting_keep_nut.jpg",
          "caption": "A nut scraped by the lock washer that held it: the washer was doing its job",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A <strong>castle nut</strong> on an axle is tightened to its torque first. If the slots do not line up with the hole, tighten it slightly further until they do; never loosen it to line them up. Fit a new split pin with its closed end facing forward, bend the legs as the manual shows, and check it after the first ride. A missing pin on an axle nut can let a wheel come off: <a href=\"../repair/repairs/cotter-pin-fit/\">Fit and remove cotter pins, slip pins and castle nuts</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/048_say_bend_cotter_pin_all_around.jpg",
          "caption": "Right and wrong ways to fit a split pin",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A <strong>circlip</strong> is stamped, so one edge is rounded and the other sharp. Fit it with the sharp edge away from the thrust load, so the load pushes on the rounded side and cannot lever the clip out of its groove. Use pliers made for the type (internal or external), wear eye protection, and fit a new clip on a piston pin: <a href=\"../repair/repairs/circlip-fit/\">Fit a circlip the right way round</a>."
        },
        {
          "type": "h3",
          "text": "Torque units and the torque wrench"
        },
        {
          "type": "p",
          "html": "Manuals give torque in newton metres, kilogram-force metres or pound-force feet, sometimes all three. Set the wrench in the unit it is marked in, convert once with a calculator, write the converted value down, and never round a torque upwards."
        },
        {
          "type": "eq",
          "id": "m1-torque-units",
          "name": "Converting torque units",
          "tex": "T_{\\mathrm{N\\,m}} = 9.81\\,T_{\\mathrm{kgf\\,m}} = 1.356\\,T_{\\mathrm{lbf\\,ft}}",
          "where": [
            [
              "T_{\\mathrm{N\\,m}}",
              "torque in newton metres",
              "N·m"
            ],
            [
              "T_{\\mathrm{kgf\\,m}}",
              "the same torque in kilogram-force metres",
              "kgf·m"
            ],
            [
              "T_{\\mathrm{lbf\\,ft}}",
              "the same torque in pound-force feet",
              "lbf·ft"
            ]
          ],
          "why": "Lets a torque from any manual be set on any wrench; older Japanese manuals use kgf·m and American tools are marked in lbf·ft.",
          "example": "The K-Light 125 front axle nut takes 75 to 88 N·m: \\(75 / 1.356 \\approx 55\\) to \\(88 / 1.356 \\approx 65\\ \\mathrm{lbf\\,ft}\\), or \\(75 / 9.81 \\approx 7.6\\) to \\(88 / 9.81 \\approx 9.0\\ \\mathrm{kgf\\,m}\\)."
        },
        {
          "type": "p",
          "html": "A click wrench measures the torque at its own drive square. When an extension adapter such as a crowfoot spanner is fitted in line with the handle, the lever is longer and the fastener receives more torque than the wrench shows, so the setting must be reduced. An adapter fitted at right angles to the handle adds no length and needs no correction."
        },
        {
          "type": "eq",
          "id": "m1-torque-adapter",
          "name": "Torque wrench setting with an in-line adapter",
          "tex": "T_{set} = T\\,\\frac{L}{L + E}",
          "where": [
            [
              "T_{set}",
              "value to set on the wrench",
              "N·m"
            ],
            [
              "T",
              "torque required at the fastener",
              "N·m"
            ],
            [
              "L",
              "wrench length from the hand grip centre to the drive square",
              "m"
            ],
            [
              "E",
              "adapter length from the drive square to the fastener centre, measured in line with the handle",
              "m"
            ]
          ],
          "why": "Corrects the wrench setting when a crowfoot or extension adapter reaches a fastener that a socket cannot, such as a fuel line or a nut behind a frame tube.",
          "example": "Target 48 N·m on a sprocket nut, wrench length 0.40 m, adapter 0.05 m in line: \\(T_{set} = 48 \\times \\frac{0.40}{0.45} \\approx 42.7\\ \\mathrm{N\\,m}\\)."
        },
        {
          "type": "p",
          "html": "A typical click wrench is accurate to about &plusmn;4 % within its range, and is least reliable at the very bottom of its scale; use a smaller wrench for small fasteners rather than a large one at its lowest setting. Pull smoothly at the centre of the grip, stop at the first click, never use the wrench to loosen, store a click wrench at its lowest setting and have it calibrated: <a href=\"../repair/repairs/torque-wrench-use/\">Use a torque wrench correctly</a>."
        },
        {
          "type": "h3",
          "text": "Job sheet 1.6.1: Tightening a multi-fastener joint"
        },
        {
          "type": "p",
          "html": "A cylinder head, a cover, a sprocket or a brake disc is held by several fasteners that must pull the parts down evenly. Tightening one fully before the others tilts the part, leaves gaps for leaks and can distort or crack a casting."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Prepare",
              "html": "Find the torque, the tightening order and any instruction on oil or threadlocker in the manual. Clean every thread and seat; a dirty thread uses up torque in friction and gives a low clamp load."
            },
            {
              "title": "Run in by hand",
              "html": "Start every fastener by hand for several turns, so a crossed thread is felt before it is forced."
            },
            {
              "title": "Snug in sequence",
              "html": "Bring each fastener just into contact in the manual's order, usually a crisscross pattern from the centre outwards, so the part seats evenly."
            },
            {
              "title": "Tighten in stages",
              "html": "Tighten to a first stage well below the final value in the same order, then to the full value in two or three passes. K-Light 125 head nuts go to 25&ndash;28 N&middot;m crisscross in stages; rear sprocket nuts to 45&ndash;50 N&middot;m crisscross in two to three passes."
            },
            {
              "title": "Mark and record",
              "html": "Draw a paint line across each safety-critical fastener and its part, so later movement can be seen at a glance. Note on the job card any fastener the manual says to re-check."
            }
          ]
        },
        {
          "type": "p",
          "html": "<strong>Pass criteria:</strong> correct order and stages, every fastener clicked at its value, no crossed or stretched thread, and paint marks on axle, caliper, disc and engine mount fasteners."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Safety-critical fasteners",
          "html": "Axle nuts, brake caliper and disc bolts, steering and fork clamp bolts and engine mounting bolts are always tightened with a torque wrench to the manual's value, never by feel. Fit new split pins and new self-locking nuts where the manual calls for them, and check these fasteners again after the first ride: <a href=\"../repair/repairs/fastener-check/\">Check chassis fasteners</a> and <a href=\"../repair/repairs/engine-mount-check/\">Check engine mounting bolts</a>."
        },
        {
          "type": "h3",
          "text": "Learning the feel of torque"
        },
        {
          "type": "p",
          "html": "A torque wrench measures torque but does not teach how a correct joint feels. Most small fasteners on a motorcycle, such as cover screws, are tightened without one, so a mechanic needs a trained hand. The safe place to train it is a scrap casting held in a vice."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Set up on scrap",
              "html": "Wear eye protection. Screw a small bolt with a flat washer into a threaded hole in a scrap crankcase or casting."
            },
            {
              "title": "Feel the correct value",
              "html": "Tighten it with the torque wrench at a low setting for that size, and notice how little force it takes."
            },
            {
              "title": "Repeat by hand",
              "html": "Loosen it, tighten it again with a plain spanner by feel, then check with the torque wrench. Repeat until the feel is close."
            },
            {
              "title": "Find the limit",
              "html": "With a nut on a test bolt in the vice, raise the setting in small steps until the thread strips or the bolt yields. The feel just before it gives, when the wrench turns on without the force rising, is the warning to remember on a real engine."
            },
            {
              "title": "Measure the stretch",
              "html": "Measure a bolt's length before tightening, at torque and after loosening. A good bolt returns to its first length; one that stays longer has yielded."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/024_we_do_junk_crankcase_so_don.jpg",
          "caption": "Practising torque on a test bolt in a scrap crankcase",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "The exercise is in <a href=\"../repair/repairs/torque-feel-practice/\">Learn the feel of correct bolt torque on a junk part</a>. Small steel screws in aluminium strip easily: stop at the first sign of the screw turning on without a firm stop."
        },
        {
          "type": "h3",
          "text": "Screwdrivers, JIS screws and the impact driver"
        },
        {
          "type": "p",
          "html": "Most cross-head screws on Japanese engines are <strong>JIS</strong> type, not Phillips. The recess is shaped differently, so a Phillips bit sits loosely, cams out under load and rounds both the screw and the bit. Some JIS screws carry a small dot on the head, but many do not, so test the bit on a good screw: it must sit snugly with no rock. Ask for a JIS bit by size; a No. 2 often suits small screws and a No. 3 larger ones, and press hard into the screw as it turns: <a href=\"../repair/repairs/jis-screwdriver-fit/\">Choose the right bit for JIS screws</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/044_good_fit_bad_fit.jpg",
          "caption": "A bit that fills the screw recess, and one that does not",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Steel screws in aluminium cases often seize over the years. A hand <strong>impact driver</strong> converts a hammer blow into a sharp turn while pressing the bit into the head, which frees a seized screw without chewing it. Set the driver's direction, hold it square, press firmly and strike once, hard; support the casting behind the screw, and on a thin or fragile cover drill the head off instead of hammering: <a href=\"../repair/repairs/impact-driver-use/\">Loosen a tight screw with an impact driver</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/022_impact_driver.jpg",
          "caption": "Hand impact driver with interchangeable bits",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Seized, rounded and broken fasteners"
        },
        {
          "type": "p",
          "html": "Work from the gentlest method to the hardest, and stop as soon as the part itself is at risk. Never use these methods on a brake line fitting, or on a fastener that holds a wheel or the steering on a road machine, without the skill and tools to finish the repair properly."
        },
        {
          "type": "table",
          "head": [
            "Problem",
            "Method",
            "Stop if"
          ],
          "rows": [
            [
              "Seized thread",
              "Brush clean, soak with penetrating oil for at least 15 minutes, tap the head lightly to help the oil in, try again; repeat",
              "The fastener starts to twist instead of turn"
            ],
            [
              "Rounded screw recess",
              "Grinding paste or fine sand in the recess, a bit that fills it, then the impact driver",
              "The bit still slips: drill the head off"
            ],
            [
              "Rounded hex head",
              "A slightly smaller six-point socket tapped on, or locking pliers clamped tight",
              "The head shears"
            ],
            [
              "Bolt sheared off in the hole",
              "File flat, centre punch, drill a pilot hole along the axis, then the extractor drill size; turn the extractor anticlockwise with steady force",
              "The extractor will not turn: a hardened extractor that breaks cannot be drilled with ordinary bits"
            ],
            [
              "Still seized",
              "Heat the casting, not the bolt, to about 100&ndash;150 &deg;C so it expands away from the bolt, and try again",
              "Fuel, brake fluid or wiring are near"
            ]
          ]
        },
        {
          "type": "p",
          "html": "When the fastener is out, clean the thread with a tap of the original size, or fit a thread insert if the thread is damaged (job sheet in Chapter 1.5): <a href=\"../repair/repairs/stuck-fastener-removal/\">Remove a rounded, seized or broken fastener</a> and <a href=\"../repair/repairs/stripped-thread-repair/\">Repair a stripped thread in a bolt hole</a>."
        },
        {
          "type": "h3",
          "text": "Fault finding: fasteners"
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Likely cause",
            "Action"
          ],
          "rows": [
            [
              "Bolts keep working loose",
              "Low clamp load from a dirty or damaged thread, a missing washer or lock, or a settled joint",
              "Clean, check the lock method, tighten to the manual's value, paint-mark and re-check after a ride"
            ],
            [
              "Thread strips as it is tightened",
              "Bolt too long and bottoming, wrong pitch, or over-torque into aluminium",
              "Check length and pitch; repair with a tap or a thread insert"
            ],
            [
              "Oil weeps from a cover after tightening",
              "Uneven tightening distorted the cover, or a screw was over-tightened",
              "New gasket, tighten in sequence in stages to the manual's value"
            ],
            [
              "Drain plug will not seal or turns without tightening",
              "Stripped thread from over-torque, or a crushed washer reused",
              "New sealing washer, correct torque; a stripped hole needs a repair: <a href=\"../repair/repairs/drain-bolt-tighten/\">Tighten an oil drain bolt correctly</a>"
            ],
            [
              "Bolt snapped while tightening",
              "Bolt had yielded earlier, wrong class, or the thread was oiled where the manual says dry",
              "Remove the stub, fit a new bolt of the correct class, follow the oil instruction"
            ],
            [
              "Axle nut found loose after a ride",
              "Not tightened to torque, or split pin missing",
              "Do not ride; set chain adjustment and torque, fit a new pin: <a href=\"../repair/repairs/fastener-check/\">Check chassis fasteners</a>"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m1-41"
        },
        {
          "type": "check",
          "q": "m1-42"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "A tightened bolt is a stretched spring; its clamp load holds the joint, and torque is only the way that load is set.<br>Most of the applied torque is lost to friction, so clean threads and the manual's instruction on oil decide the clamp load as much as the wrench setting.<br>Identify thread diameter, pitch and standard before fitting a bolt, tap or insert; coarse threads go into castings, fine threads take nuts.<br>Replace fasteners with at least the original property class, and replace any bolt that has yielded.<br>Tighten multi-fastener joints by hand first, then crisscross in stages; tighten a castle nut further to align its slot, never back.<br>Work from the gentlest to the hardest method on a seized fastener, and stop before the part itself is damaged."
        }
      ]
    }
  ],
  "gkey": "m1"
};
