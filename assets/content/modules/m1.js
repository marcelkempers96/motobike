/* Moto Zero: Module 01 lessons. Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "foundations",
  "num": "01",
  "title": "Foundations: the machine, its anatomy and the workshop",
  "intro": "How the motorcycle evolved, how its systems divide and connect, the physics that governs it, and the safe working methods, tools and measurements every later module depends on.",
  "pdf": "moto-zero-module-1-foundations.pdf",
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
          "type": "callout",
          "tone": "warm",
          "title": "Braking rules at a glance",
          "html": "EU (Reg. 168/2013): <strong>ABS above 125 cc</strong> (new types 2016, all new registrations 2017); ABS or CBS in the 125 cc class. India: ABS above 125 cc, CBS at or below 125 cc (new models April 2018, all models April 2019)."
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
          "type": "h3",
          "text": "Where the energy goes"
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
              "p": "11.8 L &times; 32 MJ/L = 378 MJ"
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
              "<strong>0.25 &times; 0.98 &times; 0.96 &times; 0.96 &times; 0.97 &asymp; 0.22</strong>"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Electric drive swaps the engine factor for battery (95&ndash;98 %), inverter (95&ndash;98 %), motor (90&ndash;95 %) and reduction (95&ndash;98 %). The catch is storage: a lithium pack holds <strong>0.12&ndash;0.20 kWh/kg</strong> against about 12 kWh/kg for petrol, which is why electric two-wheelers won first on short urban trips and why swapping suits high-mileage taxi work."
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
          "type": "check",
          "q": "m1-05"
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
          "type": "plate",
          "id": "F16",
          "caption": "Inside the scooter CVT: at low ratio the belt rides deep in the drive pulley for pulling away; at high ratio it climbs outward for cruising."
        },
        {
          "type": "h3",
          "text": "Legal classes and licences (EU)"
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
          "type": "videos",
          "title": "Watch",
          "items": [
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
              "id": "XjwTPY_fwKM",
              "title": "Logic Defying V5 Engine - Honda's RC211V Explained Like Never Before",
              "channel": "driving 4 answers",
              "channel_url": "http://www.youtube.com/@d4a",
              "duration": "16:59",
              "role": "How it works",
              "note": "Honda RC211V V5 explained; advanced engine layout idea."
            },
            {
              "id": "uA-kglFSq5I",
              "title": "Ducati's Brilliant V4 Engine — Putting Supercars To Shame!",
              "channel": "Engineering Explained",
              "channel_url": "http://www.youtube.com/@EngineeringExplained",
              "duration": "12:48",
              "role": "How it works",
              "note": "Ducati V4 engine layout and design ideas."
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
              "10 links over 127 mm; slack outside 20&ndash;40 mm"
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
          "type": "p",
          "html": "Follow the torque: <strong>engine (14) &rarr; front sprocket (23) &rarr; drive chain (22) &rarr; rear sprocket (24) &rarr; rear wheel (20)</strong> through its cush drive, with the swingarm (18) locating the axle and adjusters."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Worn chain? Think in sets",
          "html": "If ten links measure more than <strong>127 mm</strong>, replace the chain and inspect both sprockets for hooked teeth. Normally replace them together: mixing new and worn parts accelerates wear."
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
          "html": "Open the <a href=\"../overview/?mode=4t&view=diagram\">four-stroke course plate</a> and click, in order, the drive chain, rear sprocket, swingarm and rear tyre hotspots, and write down the order in which drive torque passes through them from the gearbox output to the road. Then find the throttle body, the side cover over the battery and the instrument cluster, and sketch the connections you expect between throttle body and injector, ECU, battery and regulator/rectifier before checking against Module 03. Plate F06 above numbers all 30 assemblies by name."
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
          "type": "h3",
          "text": "Emergency stop"
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
          "type": "check",
          "q": "m1-16"
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
          "html": "A force F at radius r gives torque <strong>T = F &middot; r</strong> (N&middot;m). Power is torque times angular speed: <strong>P = T &times; &omega;</strong>, with <strong>&omega; = 2&pi; &times; n / 60</strong> to convert rev/min to rad/s. One metric horsepower (PS) is 0.7355 kW."
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
          "html": "At 9,000 rpm, &omega; = 942.5 rad/s, so torque there is 7,800 / 942.5 = <strong>8.28 N&middot;m</strong>, below the peak. At 7,500 rpm the power is 8.9 &times; 785.4 = <strong>6.99 kW</strong>. Peak power comes above peak torque because power keeps rising with speed until torque falls faster than speed rises, once the valves and ports can no longer fill the cylinder."
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
          "html": "The overall ratio <strong>i</strong> = primary &times; gear &times; final drive (rear teeth / front teeth). The manual gives only the 41-tooth rear sprocket; the example assumes typical values: primary 3.40, first 2.75, fifth 1.10, 15-tooth front (41/15 = 2.733)."
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
              "3.40 &times; 2.75 &times; 2.733",
              "i<sub>1</sub> = 25.56 (fifth: 10.22)"
            ],
            [
              "Wheel torque",
              "T<sub>engine</sub> &times; i &times; 0.90",
              "8.9 &times; 25.56 &times; 0.90 = 205 N&middot;m"
            ],
            [
              "Rolling radius",
              "130/90-15 tyre, 615 mm unloaded",
              "about 0.30 m under load"
            ],
            [
              "Tractive force",
              "T<sub>wheel</sub> / r<sub>w</sub>",
              "205 / 0.30 = 682 N"
            ]
          ]
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
          "type": "table",
          "head": [
            "Force",
            "Formula",
            "K-Light + 75 kg rider (220 kg)"
          ],
          "rows": [
            [
              "Rolling",
              "C<sub>rr</sub> &times; m &times; g (C<sub>rr</sub> 0.015&ndash;0.025)",
              "0.02 &times; 220 &times; 9.81 = 43 N"
            ],
            [
              "Aerodynamic",
              "&frac12; &times; &rho; &times; C<sub>d</sub>A &times; v&sup2; (&rho; = 1.2, C<sub>d</sub>A 0.5&ndash;0.7 m&sup2; upright)",
              "at 90 km/h: 0.5 &times; 1.2 &times; 0.60 &times; 625 = 225 N"
            ],
            [
              "Gradient",
              "m &times; g &times; sin &theta;",
              "depends on the hill"
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
          "type": "steps",
          "items": [
            {
              "title": "Top speed",
              "html": "Wheel power 7.8 &times; 0.90 = 7.02 kW. Solve 0.36 v&sup3; + 43 v = 7,020: v &asymp; 25.4 m/s &asymp; <strong>91 km/h</strong>, matching the manual. Engine speed in fifth is then about 8,270 rpm."
            },
            {
              "title": "Acceleration in first",
              "html": "a = (F<sub>t</sub> &minus; F<sub>roll</sub>) / (m &times; k), with k &asymp; 1.15 for rotating parts: (682 &minus; 43) / (220 &times; 1.15) = <strong>2.5 m/s&sup2;</strong>, about 0.26 g."
            },
            {
              "title": "Steepest climb",
              "html": "sin &theta; = 639 / 2,158 = 0.296, &theta; = 17.2&deg;: about <strong>31 %</strong>. With passenger and load it drops to roughly 22 %, which is why hill-town taxis fit a larger rear sprocket."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Load transfer under braking"
        },
        {
          "type": "p",
          "html": "Braking at deceleration a puts an inertial force m&middot;a at the centre of mass (height h), shifting load forward by <strong>&Delta;N = m &times; a &times; h / L</strong>. K-Light with rider: static 971 N front, 1,187 N rear, h = 0.65 m, L = 1.44 m."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "At 0.8 g",
              "v": "&Delta;N = 780 N",
              "p": "220 &times; 7.85 &times; 0.65 / 1.44"
            },
            {
              "l": "Front load",
              "v": "1,751 N (81 %)",
              "p": "rear only 407 N"
            },
            {
              "l": "Rear lift-off",
              "v": "1.22 g",
              "p": "a = g &times; b / h, b = 0.79 m"
            }
          ]
        },
        {
          "type": "p",
          "html": "With &mu; &asymp; 1.0, the rear can give at most 407 N of the 1,727 N needed, so the <strong>front must do at least three quarters</strong> of the braking. On a short, tall sport bike the lift-off limit falls close to 1 g. Under acceleration the transfer reverses, so powerful bikes are wheelie-limited."
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
          "html": "A tyre's braking (or driving) force and cornering force share one budget: <strong>&radic;(F<sub>x</sub>&sup2; + F<sub>y</sub>&sup2;) &le; &mu; &times; N</strong>. Using 0.6 g cornering with &mu; = 1.0 leaves &radic;(1 &minus; 0.36) = <strong>0.8 g</strong> for braking."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Grip is not constant",
          "html": "Dry asphalt &mu; &asymp; 1.0; wet asphalt 0.5&ndash;0.7; painted lines, metal covers or gravel 0.2&ndash;0.4. To brake hard in a corner, reduce lean first."
        },
        {
          "type": "h3",
          "text": "Gyroscopes, countersteering and lean"
        },
        {
          "type": "p",
          "html": "Rolling a spinning wheel makes it precess, steering it into the lean. For I &asymp; 0.4 kg&middot;m&sup2; at 50 km/h and 0.5 rad/s roll rate the torque is only about <strong>9.6 N&middot;m</strong>: helpful but small beside tyre and trail forces."
        },
        {
          "type": "p",
          "html": "<strong>Countersteering:</strong> a brief push on the <em>right</em> bar steers the wheel slightly left, the contact patches move left from under the centre of mass, and the bike rolls <em>right</em>. Then the steering settles into the turn."
        },
        {
          "type": "p",
          "html": "Steady-turn lean: <strong>tan &theta; = v&sup2; / (g &times; r)</strong>. At 50 km/h on a 40 m radius, tan &theta; = 193 / 392 = 0.49, so &theta; = <strong>26&deg;</strong>. Wide tyres need a few degrees more; the limit is friction (about 45&deg; for &mu; = 1.0) or ground clearance."
        },
        {
          "type": "p",
          "html": "Stability comes mainly from <strong>trail</strong>: commuters typically have 25&ndash;28&deg; rake and 90&ndash;110 mm trail (Module 4)."
        },
        {
          "type": "figure",
          "fig": "steering-geometry",
          "caption": "Try rake 25&ndash;28&deg; and see where trail lands against the 90&ndash;110 mm commuter range."
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
          "html": "General PPE: <strong>safety glasses, nitrile gloves and safety footwear</strong>."
        },
        {
          "type": "photo",
          "src": "repair-photos/017_micro_fiche_reader.jpg",
          "caption": "Microfiche reader used to look up parts diagrams"
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "High-voltage electric motorcycles",
          "html": "Packs run at 48&ndash;120 V, up to about 400 V DC on larger bikes. Anything <strong>above 60 V DC</strong> is high voltage, can kill, and cannot be switched off inside the pack. Only trained technicians open orange-cabled circuits: remove and lock out the service disconnect, wait for capacitors to discharge, verify absence of voltage with a rated meter, and use tools insulated to IEC 60900 (1,000 V)."
        },
        {
          "type": "check",
          "q": "m1-26"
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
          "html": "A tightened bolt is a stiff spring; its stretch is the clamp load. Because 80&ndash;90 % of torque is lost to friction, <strong>F = T / (K &times; d)</strong> is only approximate, with K &asymp; 0.20 dry and 0.15 oiled."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "M8, 25 N&middot;m, dry",
              "v": "15.6 kN",
              "p": "25 / (0.20 &times; 0.008)"
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
          "type": "callout",
          "tone": "warm",
          "title": "Rules of thumb",
          "html": "Follow the manual on whether to oil a thread. Replace a bolt with at least the original class. Blue threadlocker comes out with hand tools; red needs about 250 &deg;C. Pull a click wrench smoothly at right angles, never loosen with it, store it at its lowest setting. Use a JIS driver on screws marked with a dot: a Phillips tip cams out and strips them."
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
          "type": "h3",
          "text": "Reading a micrometer"
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
          "type": "h3",
          "text": "Measuring disc runout (job sheet 1.5.2)"
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
          "type": "h3",
          "text": "Thread repair and broken bolts"
        },
        {
          "type": "p",
          "html": "<strong>Thread insert (1.5.3):</strong> use the kit's oversize drill and tap (never a standard tap), back off half a turn every turn, wind the insert in tang first to 0.25&ndash;0.5 turn below the surface, then break off the tang."
        },
        {
          "type": "p",
          "html": "<strong>Broken bolt (1.5.4):</strong> soak at least 15 minutes in penetrating oil, punch the exact centre, drill along the axis (typically 4&ndash;5 mm for M8), turn the extractor anticlockwise with steady force. If stuck, heat the <em>casting</em> (not the bolt) to 100&ndash;150 &deg;C. Extractors are brittle: a broken one needs spark erosion (EDM), shattering or carbide burrs, then an insert."
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
    }
  ]
};
