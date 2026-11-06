/* Moto Zero: Module 03 lessons. Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "fuel-ignition",
  "num": "03",
  "title": "Fuel, ignition and electrical systems",
  "intro": "How a motorcycle meters air and fuel, times its spark, generates and stores electrical energy, and how a technician measures each circuit from battery to sensor.",
  "pdf": "moto-zero-module-3-fuel-ignition-electrical.pdf",
  "chapters": [
    {
      "id": "m3-mixture",
      "title": "Air, fuel and mixture",
      "lead": "An engine is a controlled fire, and a fire needs the right recipe: a set mass of air for every gram of fuel. Get the recipe wrong and you lose power, burn valves or foul plugs. This chapter explains that recipe, how we describe it with lambda, and how a carburettor tries to hold it across the whole throttle range.",
      "lab": "overview/?mode=4t&part=carb",
      "blocks": [
        {
          "type": "h3",
          "text": "The chemically correct mixture"
        },
        {
          "type": "p",
          "html": "Complete combustion turns all the carbon in fuel into CO<sub>2</sub> and all the hydrogen into water. Using iso-octane (C<sub>8</sub>H<sub>18</sub>) as a model fuel: 114 g of fuel needs 400 g of oxygen. Air is only 23.2 % oxygen by mass, so that is 400 / 0.232 &asymp; <strong>1724 g of air</strong>, a ratio of about <strong>15.1:1</strong>."
        },
        {
          "type": "p",
          "html": "Real pump petrol contains aromatics and olefins with less hydrogen per carbon, so it needs a little less oxygen: the accepted <strong>stoichiometric AFR for petrol is 14.7:1</strong> by mass. Ethanol carries some of its own oxygen (about 9.0:1), so E10 sits near 14.1:1 and E20 near 13.8:1."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Petrol stoich",
              "v": "14.7 : 1",
              "p": "kg of air per kg of fuel for complete combustion"
            },
            {
              "l": "E10 / E20",
              "v": "14.1 / 13.8",
              "p": "a carb jetted for petrol runs measurably lean on E20"
            },
            {
              "l": "Lambda",
              "v": "AFR / 14.7",
              "p": "below 1 = rich, above 1 = lean, whatever the fuel"
            }
          ]
        },
        {
          "type": "p",
          "html": "Engineers prefer <strong>lambda (&lambda;)</strong> = actual AFR / stoichiometric AFR, because it means the same thing on any fuel. An engine at 13.2:1 on petrol is at &lambda; = 13.2 / 14.7 &asymp; 0.90."
        },
        {
          "type": "figure",
          "fig": "afr",
          "caption": "Slide the air-fuel ratio from rich to lean and watch lambda, power and temperature change. Find the best-power band and the catalyst window at 14.7:1."
        },
        {
          "type": "h3",
          "text": "What each mixture is good for"
        },
        {
          "type": "table",
          "head": [
            "Lambda",
            "AFR (petrol)",
            "Typical use",
            "Consequence"
          ],
          "rows": [
            [
              "0.80&ndash;0.88",
              "11.8&ndash;12.9",
              "Full load, cold start",
              "Max power with charge cooling; high CO and HC; sooty plugs"
            ],
            [
              "0.88&ndash;0.95",
              "12.9&ndash;14.0",
              "Best-power region",
              "Fastest flame, highest torque"
            ],
            [
              "1.00",
              "14.7",
              "Idle and cruise with catalyst",
              "Only window where a three-way catalyst works"
            ],
            [
              "1.05&ndash;1.15",
              "15.4&ndash;16.9",
              "Lean cruise, older open-loop engines",
              "Best economy, peak NOx, hotter combustion"
            ],
            [
              "above 1.3",
              "above 19",
              "Over-lean fault",
              "Misfire, surging, popping, hot exhaust valve and piston"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Rich burns <em>cooler</em> (surplus fuel soaks up heat as it evaporates) but dirtier. Lean burns <em>slower</em>, so combustion is still going when the exhaust valve opens: on an air-cooled single like the K-Light 125 a persistently lean mixture leads to detonation, burned exhaust valves and piston seizure."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb: altitude",
          "html": "At 2000 m air is about 20 % less dense. A carburettor meters fuel by air <em>velocity</em>, not air mass, so it runs about 20 % richer up there. An injection system with MAP and intake-temperature sensors recalculates air mass and corrects itself."
        },
        {
          "type": "h3",
          "text": "Air intake and filter"
        },
        {
          "type": "p",
          "html": "The airbox holds the filter, gives each intake pulse a calm plenum to draw from, and acts as a resonator that tunes intake pressure waves and cuts noise. Road bikes mostly use pleated paper (replaced every 12 000&ndash;18 000 km, sooner on dusty roads); off-road and many small commuters, including the K-Light 125, use oiled foam that is washed, dried and re-oiled."
        },
        {
          "type": "p",
          "html": "A <strong>blocked filter</strong> raises the depression downstream of it. In a carburettor that depression pulls on every jet, so the engine runs <strong>rich at all openings</strong>. In a speed-density injection system the MAP sensor sees the lower pressure and the ECU cuts fuel, so the symptom is <strong>loss of power</strong> instead. An air leak after the carb (split boot, loose clamp) admits unmetered air and leans the mixture, mostly at idle."
        },
        {
          "type": "model",
          "file": "air_filter",
          "caption": "A pleated-paper panel filter seated in the lower half of an airbox."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Open the <a href=\"../overview/?mode=4t&part=engine\">engine in the Overview</a>, set bore 57 mm and stroke 50 mm (the nearest settings to the K-Light 125) and run it at 1500 and then 9000 rpm. Work out how the time available for the 180° intake stroke falls from 20 ms to 3.3 ms. Then open the <a href=\"../overview/?mode=4t&part=air_filter\">air filter</a> and the <a href=\"../overview/?mode=4t&part=carb\">carburettor</a>, and on the <a href=\"../overview/?mode=4t&view=diagram\">course plate</a> trace the air path from the airbox through the throttle body to the inlet valve."
        },
        {
          "type": "h3",
          "text": "How a carburettor meters fuel"
        },
        {
          "type": "p",
          "html": "Air speeds up through the venturi (or under the slide) and its pressure drops (Bernoulli). The float bowl is vented to atmosphere, so atmospheric pressure pushes fuel up through calibrated jets into the low-pressure airstream. The throttle regulates air; the jets regulate fuel."
        },
        {
          "type": "p",
          "html": "In a <strong>slide carburettor</strong> (Mikuni VM, Keihin PWK) the cable lifts the slide directly: instant response, but snap it open at low rpm and the engine bogs. In a <strong>constant-velocity (CV) carburettor</strong> (Keihin CVK) the cable turns a butterfly and venturi depression lifts a diaphragm piston, so the venturi only opens as fast as the engine can use the air. A torn diaphragm leaves the piston down: the engine runs but will not rev."
        },
        {
          "type": "model",
          "file": "carb",
          "caption": "The slide carburettor modelled in half section."
        },
        {
          "type": "photo",
          "src": "carburettor-fitting.jpg",
          "caption": "Refitting a constant-velocity carburettor between the intake rubber and the airbox on an air-cooled twin: the round diaphragm chamber sits on top, the pilot mixture screw and idle stop screw are on the side, and the float bowl is below."
        },
        {
          "type": "plate",
          "id": "PT01",
          "caption": "Slide carburettor in section: venturi, slide and needle, needle jet, main jet, pilot circuit and float bowl."
        },
        {
          "type": "h3",
          "text": "Circuits by throttle opening (not rpm)"
        },
        {
          "type": "table",
          "head": [
            "Throttle",
            "Dominant circuit",
            "Tuning part",
            "Change"
          ],
          "rows": [
            [
              "Closed to 1/8",
              "Pilot",
              "Pilot jet, fuel or air screw",
              "Larger pilot jet or fuel screw out: richer"
            ],
            [
              "1/8 to 1/4",
              "Transition",
              "Slide cutaway",
              "Higher cutaway: leaner"
            ],
            [
              "1/4 to 3/4",
              "Mid-range",
              "Needle taper and clip position",
              "Clip lowered (needle raised): richer"
            ],
            [
              "3/4 to full",
              "High-speed",
              "Main jet",
              "Larger number: richer"
            ],
            [
              "Cold start",
              "Enricher or choke",
              "Starter jet and plunger",
              "&lambda; around 0.5&ndash;0.7 for cranking"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The <strong>float</strong> sits under all of them: too high enriches every circuit, too low leans every circuit. A fuel screw (engine side of the slide) richens when turned out; an air screw (intake side) leans when turned out. Mikuni and Keihin main jet numbers do not mean the same size."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Main jet first",
              "html": "Full-throttle runs, plug chop or wideband AFR reading."
            },
            {
              "title": "Then the needle",
              "html": "Clip position and taper for 1/4 to 3/4 throttle."
            },
            {
              "title": "Then the cutaway",
              "html": "The 1/8 to 1/4 transition."
            },
            {
              "title": "Finally pilot and screw",
              "html": "Idle and off-idle; confirm everything with a road test across the range."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Try it: the carburettor"
        },
        {
          "type": "animation",
          "part": "carb",
          "mode": "4t",
          "caption": "Hold GAS to open the throttle plate. Air speeds up through the venturi and pulls fuel from the jet; the graph shows air and fuel flow staying near 14.7 : 1."
        },
        {
          "type": "check",
          "q": "m3-01"
        },
        {
          "type": "h3",
          "text": "Synchronising and fuel delivery"
        },
        {
          "type": "p",
          "html": "On a twin or four, every throttle must open together. Using vacuum gauges or an electronic balancer on each intake runner, with the engine warm at idle, adjust the linkage screws until all depressions agree within <strong>10&ndash;20 mmHg</strong>, then reset idle. A single like the K-Light needs no balancing."
        },
        {
          "type": "p",
          "html": "A manual fuel tap has OFF, ON and RES; reserve typically leaves 1&ndash;3 litres. A tank must breathe: a <strong>blocked vent</strong> lets the engine run for several kilometres, then starve and stop, and it restarts after the cap is opened with an audible hiss."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Fuel handling",
          "html": "Petrol vapour is heavier than air and ignites from a spark or hot exhaust. Drain bowls into a container, never onto a hot engine, work ventilated, and disconnect battery negative before opening a fuel line on an injected bike, whose line holds about 300 kPa."
        },
        {
          "type": "check",
          "q": "m3-03"
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "toVfvRhWbj8",
              "title": "How Does A Carburetor Work? | Transparent Carburetor at 28,546 fps Slow Mo - Smarter Every Day 259",
              "channel": "SmarterEveryDay",
              "channel_url": "http://www.youtube.com/@smartereveryday",
              "duration": "24:38",
              "role": "How it works",
              "note": "Slow-motion transparent carburettor shows how air and fuel mix; a science demo, not a service guide."
            },
            {
              "id": "ZRNfyz1Cgvg",
              "title": "Carburetor vs Fuel Injection - Why Motorcycle Riders Should Think Again",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "7:51",
              "role": "How it works",
              "note": "Carburettor against fuel injection compared; useful for deciding which diagnosis path applies."
            },
            {
              "id": "AwXRvgyFUG4",
              "title": "Carburetors vs. Electronic Fuel Injection—What’s Better? | MC Garage",
              "channel": "Motorcyclist Magazine",
              "channel_url": "http://www.youtube.com/@MotorcyclistMag",
              "duration": "3:41",
              "role": "How it works",
              "note": "Short side by side of carburettor and EFI, how each meters fuel."
            }
          ]
        }
      ]
    },
    {
      "id": "m3-efi",
      "title": "Electronic fuel injection and engine management",
      "lead": "A carburettor cannot hold the narrow lambda window a catalyst needs, cannot correct for air density or ethanol, and cannot report its own faults. Fuel injection can: it opens a valve for a calculated number of milliseconds and checks the result in the exhaust, many times a second.",
      "lab": "overview/?mode=4t&part=engine",
      "blocks": [
        {
          "type": "p",
          "html": "The K-Light 125 carries a complete small-engine system: one port injector, a throttle body with TPS, a combined pressure-and-temperature sensor, stepper-motor idle control, a head temperature sensor, a crank trigger on the flywheel, a heated oxygen sensor, an in-tank pump, a three-way catalyst, and an OBD system with an FI warning lamp. The ECU also controls ignition."
        },
        {
          "type": "plate",
          "id": "F12",
          "caption": "Electronic fuel injection on a single-cylinder engine: fuel delivery, sensors, ECU, actuators and catalyst."
        },
        {
          "type": "h3",
          "text": "Fuel delivery"
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Rail pressure",
              "v": "300 kPa",
              "p": "K-Light at idle; below 270 kPa look for a fault"
            },
            {
              "l": "Pump prime",
              "v": "~3 s",
              "p": "at key-on, then stops unless crank pulses arrive"
            },
            {
              "l": "Pump supply",
              "v": "12 &plusmn; 2 V",
              "p": "at the pump connector during prime and cranking"
            },
            {
              "l": "Fuel filter",
              "v": "7000&ndash;10 000 km",
              "p": "K-Light replacement interval"
            }
          ]
        },
        {
          "type": "p",
          "html": "A submerged turbine pump draws through a strainer; on a returnless system like the K-Light the regulator sits in the pump module and only one line runs to the injector. Low pressure means: a leak, a pump running backwards (reversed connector) or a blocked filter."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Residual pressure",
          "html": "An EFI line stays pressurised after the engine stops. Relieve pressure (pump fuse out and run until it stalls, or wrap the connector in a rag) before disconnecting. Injector O-rings and the pump flange gasket are single-use."
        },
        {
          "type": "h3",
          "text": "The injector and pulse width"
        },
        {
          "type": "p",
          "html": "The injector is a solenoid valve (about <strong>10 &Omega;</strong> on the K-Light). At fixed pressure its flow is constant, so the ECU controls fuel purely by <strong>pulse width</strong>: open time plus a voltage-dependent dead time of 0.6&ndash;1.2 ms."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Air per cycle",
              "html": "124 cm&sup3; &times; 1.18 kg/m&sup3; &times; 0.85 VE &asymp; 0.124 g"
            },
            {
              "title": "Fuel per cycle",
              "html": "0.124 g / 14.7 &asymp; 8.5 mg"
            },
            {
              "title": "Open time",
              "html": "8.5 mg / 1.67 mg/ms (100 g/min injector) &asymp; 5.1 ms"
            },
            {
              "title": "Pulse width",
              "html": "5.1 + 0.8 ms dead time &asymp; <strong>5.9 ms</strong>"
            }
          ]
        },
        {
          "type": "p",
          "html": "One injection per four-stroke cycle (two revolutions): at 9000 rpm a cycle lasts 2 &times; 60 / 9000 = 13.3 ms, so duty cycle is 5.9 / 13.3 &asymp; <strong>44 %</strong>. Injectors are sized to stay below about 80&ndash;85 % at peak power."
        },
        {
          "type": "check",
          "q": "m3-07"
        },
        {
          "type": "model",
          "file": "throttle_body",
          "caption": "An EFI throttle body with butterfly valve, injector and throttle position sensor."
        },
        {
          "type": "h3",
          "text": "Sensors"
        },
        {
          "type": "p",
          "html": "Most sensors run from a regulated <strong>5 V reference</strong> and share a sensor earth, so one shorted sensor can drag the reference down and set several codes at once. Temperature sensors are NTC thermistors: resistance and signal voltage fall as temperature rises."
        },
        {
          "type": "table",
          "head": [
            "Sensor",
            "Principle",
            "K-Light 125 value"
          ],
          "rows": [
            [
              "TPS",
              "Potentiometer on throttle spindle",
              "0.5&ndash;0.9 V closed, 3.5&ndash;4.0 V open; closed = 14 % &plusmn; 5 % of reference"
            ],
            [
              "MAP",
              "Piezoresistive diaphragm",
              "4.25&ndash;4.75 V at 100 kPa, engine stopped"
            ],
            [
              "Intake air temp",
              "NTC thermistor",
              "5.595 k&Omega; at 0 &deg;C, 2.000 k&Omega; at 25 &deg;C"
            ],
            [
              "Engine temp",
              "NTC in cylinder head",
              "1.9&ndash;2.1 k&Omega; at 25 &deg;C, 0.179&ndash;0.187 k&Omega; at 100 &deg;C"
            ],
            [
              "Crank position",
              "Variable reluctance pick-up",
              "150 &plusmn; 10 &Omega;; peak above 1.7 V when cranking"
            ],
            [
              "Oxygen",
              "Heated zirconia cell",
              "Rich above 750 mV, lean below 120 mV; heater 9.6 &plusmn; 1.5 &Omega;"
            ]
          ]
        },
        {
          "type": "p",
          "html": "An <strong>open</strong> engine-temperature circuit reads as extreme cold: the ECU over-fuels and floods a warm engine. A <strong>shorted</strong> one reads as extreme heat: lean, hard cold starts. Without a crank signal the engine neither sparks nor injects."
        },
        {
          "type": "p",
          "html": "The narrowband <strong>oxygen sensor</strong> switches abruptly at &lambda; = 1: about 0.8&ndash;0.9 V rich, 0.1&ndash;0.2 V lean. It says only <em>rich or lean</em>, never <em>how</em> rich, which is enough for closed-loop control at stoichiometric but useless for tuning full-throttle mixture (that needs a wideband sensor)."
        },
        {
          "type": "h3",
          "text": "How the ECU decides"
        },
        {
          "type": "table",
          "head": [
            "Strategy",
            "Air mass from",
            "Strength"
          ],
          "rows": [
            [
              "Speed-density",
              "MAP, rpm, intake temp, VE table",
              "Self-corrects for altitude, filter restriction, wear (K-Light main strategy)"
            ],
            [
              "Alpha-N",
              "Throttle angle and rpm",
              "Stable at wide throttle and with wild cams; blind to intake leaks"
            ]
          ]
        },
        {
          "type": "p",
          "html": "In <strong>closed loop</strong> the ECU nudges pulse width against the oxygen sensor so the mixture oscillates around &lambda; = 1 a few times a second. It drops to <strong>open loop</strong> with a cold sensor, during cranking and warm-up, at full load (enriching to &lambda; 0.85&ndash;0.92), during transients and fuel cut-off, and permanently if the sensor fails. The K-Light raises idle below 68 &deg;C and holds 1500 &plusmn; 100 rpm warm with a 50 &Omega;-per-coil stepper."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Starting an injected engine",
          "html": "Do not touch the throttle: the ECU calculates cranking fuel and idle air itself. The exception is a flooded engine, where holding the throttle wide open while cranking triggers clear-flood mode and cuts injection."
        },
        {
          "type": "h3",
          "text": "Fault codes"
        },
        {
          "type": "p",
          "html": "The ECU range-checks every sensor and output driver; a failed check stores a P-code and lights the MIL. A <strong>range code points to a circuit, not a sensor</strong>: P0118 (engine temperature above 4.9 V) is caused as often by a backed-out pin as by the thermistor."
        },
        {
          "type": "table",
          "head": [
            "Code",
            "Component",
            "Criterion"
          ],
          "rows": [
            [
              "P0122 / P0123",
              "TPS",
              "below 0.1 V / above 4.9 V"
            ],
            [
              "P0117 / P0118",
              "Engine temperature",
              "below 0.1 V / above 4.9 V"
            ],
            [
              "P0131 / P0132",
              "Oxygen sensor",
              "below 0.3 V / above 0.7 V for more than 15 s"
            ],
            [
              "P0134",
              "Oxygen sensor",
              "held between 0.35 and 0.55 V (no activity)"
            ],
            [
              "P0335",
              "Crank position",
              "signal high with engine stopped"
            ],
            [
              "P2300 / P2301",
              "Ignition coil primary",
              "no clamp voltage / over 8.6 A"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m3-09"
        },
        {
          "type": "h3",
          "text": "Emissions and the catalyst"
        },
        {
          "type": "p",
          "html": "<strong>CO</strong> comes from too little oxygen (rises steeply rich). <strong>HC</strong> is unburned fuel from crevices, cold walls and misfire. <strong>NOx</strong> forms above about 1800 &deg;C and peaks slightly lean, around &lambda; 1.05&ndash;1.1. A <strong>three-way catalyst</strong> oxidises CO and HC (platinum, palladium) and reduces NOx (rhodium), but both can only happen together within about &plusmn;0.5 % of stoichiometric AFR, which is why closed-loop control is a precondition. It lights off at about 250&ndash;300 &deg;C, so it sits close to the port."
        },
        {
          "type": "model",
          "file": "exhaust_4t",
          "caption": "A four-stroke exhaust: header pipe with heat shield and a slash-cut silencer; on Euro 5 bikes the catalyst sits in the header or silencer."
        },
        {
          "type": "table",
          "head": [
            "Pollutant",
            "Euro 5 limit (mg/km)"
          ],
          "rows": [
            [
              "CO",
              "1000"
            ],
            [
              "THC",
              "100"
            ],
            [
              "NMHC",
              "68"
            ],
            [
              "NOx",
              "60"
            ],
            [
              "PM (direct injection only)",
              "4.5"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Euro 5 (all new vehicles from 2021) brought OBD stage II. <strong>Euro 5+</strong> (all new registrations from 1 January 2025) adds catalyst monitoring with a second, downstream oxygen sensor: a healthy catalyst stores oxygen, so the downstream signal stays steady while the upstream one switches. India's BS VI (April 2020) uses aligned limits and is designed for E20."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "ZRNfyz1Cgvg",
              "title": "Carburetor vs Fuel Injection - Why Motorcycle Riders Should Think Again",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "7:51",
              "role": "How it works",
              "note": "Carburettor against fuel injection compared; useful for deciding which diagnosis path applies."
            },
            {
              "id": "AwXRvgyFUG4",
              "title": "Carburetors vs. Electronic Fuel Injection—What’s Better? | MC Garage",
              "channel": "Motorcyclist Magazine",
              "channel_url": "http://www.youtube.com/@MotorcyclistMag",
              "duration": "3:41",
              "role": "How it works",
              "note": "Short side by side of carburettor and EFI, how each meters fuel."
            }
          ]
        }
      ]
    },
    {
      "id": "m3-ignition",
      "title": "Ignition systems",
      "lead": "A 12 V battery cannot jump a spark plug gap; that needs thousands of volts, delivered at exactly the right crank angle, thousands of times a minute. The ignition system is a voltage multiplier and a precision clock in one.",
      "lab": "overview/?mode=4t&part=spark_plug",
      "blocks": [
        {
          "type": "h3",
          "text": "What the spark has to do"
        },
        {
          "type": "p",
          "html": "The spark must ionise the gas between the electrodes and start a self-sustaining flame. The voltage needed rises with a wider gap, denser charge (higher load and compression), worn rounded electrodes and lean mixture."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Plug needs",
              "v": "5&ndash;25 kV",
              "p": "5&ndash;10 kV at idle new, 15&ndash;25 kV at full load worn"
            },
            {
              "l": "K-Light coil gives",
              "v": "25&ndash;35 kV",
              "p": "from a 9&ndash;14 V supply: the gap is the ignition reserve"
            },
            {
              "l": "Spark energy",
              "v": "20&ndash;80 mJ",
              "p": "far above the &lt;1 mJ lab minimum, for lean or fouled conditions"
            }
          ]
        },
        {
          "type": "h3",
          "text": "The ignition coil"
        },
        {
          "type": "photo",
          "src": "repair-photos/021_low_tension_magneto.jpg",
          "caption": "Low-tension magneto with a separate ignition coil"
        },
        {
          "type": "photo",
          "src": "repair-photos/090_electronic_ignition.jpg",
          "caption": "Source and trigger coils of an electronic ignition"
        },
        {
          "type": "p",
          "html": "The coil is a step-up transformer: a primary of a few hundred thick turns and a secondary of <strong>15 000&ndash;25 000</strong> fine turns on one iron core. Primary current stores energy in the magnetic field, E = &frac12; L I&sup2;. When the current is interrupted, the collapsing field kicks the primary to 200&ndash;400 V and the ~100:1 turns ratio multiplies that to <strong>20&ndash;40 kV</strong>. Voltage rises only until the gap breaks down, then the arc burns at 1&ndash;2 kV for 1&ndash;2 ms."
        },
        {
          "type": "photo",
          "src": "repair-photos/021_find_out_what.jpg",
          "caption": "Flywheel magneto with the flywheel fitted"
        },
        {
          "type": "figure",
          "fig": "ignition-coil",
          "caption": "Change the primary voltage and the turns ratio and watch the secondary voltage. Try 300 V with a 100:1 ratio."
        },
        {
          "type": "engine",
          "shot": "05-generator-electric-start",
          "view": "gen",
          "caption": "The pick-up reads the flywheel and the CDI fires the coil. Start the engine and watch the spark follow the crank."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Primary current",
              "html": "12 V across the K-Light 4 &Omega; primary: I = V / R = 3 A."
            },
            {
              "title": "Stored energy",
              "html": "With L = 4 mH: E = &frac12; &times; 0.004 &times; 3&sup2; = 18 mJ."
            },
            {
              "title": "Secondary voltage",
              "html": "300 V kick &times; (20 000 / 200 turns) = 30 kV."
            }
          ]
        },
        {
          "type": "p",
          "html": "K-Light coil values: primary <strong>4 &Omega;</strong> &plusmn; 10&ndash;15 %, secondary <strong>18.6 k&Omega;</strong> through the plug cap and <strong>13.6 k&Omega;</strong> without, so the suppressor cap is about 5 k&Omega;."
        },
        {
          "type": "h3",
          "text": "Try it: charge the coil and fire the plug"
        },
        {
          "type": "animation",
          "part": "spark_plug",
          "mode": "4t",
          "caption": "Hold IGNITE to build the field in the coil, then release to fire. Release too early and it misfires. The graph shows how the voltage needed rises with the gap."
        },
        {
          "type": "check",
          "q": "m3-13"
        },
        {
          "type": "h3",
          "text": "Four ways to switch the coil"
        },
        {
          "type": "table",
          "head": [
            "System",
            "How it works",
            "Strength / weakness"
          ],
          "rows": [
            [
              "Contact breaker (points)",
              "Cam opens points; condenser 0.2&ndash;0.3 &micro;F stops arcing; gap 0.3&ndash;0.4 mm sets dwell",
              "Simple; wears, needs regular service, dwell too short at high rpm"
            ],
            [
              "AC-CDI",
              "Exciter coil on stator charges a capacitor to 100&ndash;400 V; SCR dumps it into the coil",
              "Needs no battery; weak spark at kickstart speed"
            ],
            [
              "DC-CDI",
              "Battery charges the capacitor through an inverter",
              "Spark independent of cranking speed; dead with a flat battery"
            ],
            [
              "TCI / ECU",
              "Transistor (IGBT) switches an inductive coil; ECU calculates dwell and advance",
              "Long spark (1&ndash;2 ms) for four-stroke part-load; no adjustment"
            ]
          ]
        },
        {
          "type": "p",
          "html": "CDI voltage rises in a few microseconds, ten times faster than an inductive system, so the spark fires before energy leaks across an oily insulator. That is why <strong>two-strokes favour CDI</strong>. The price is a short spark of 0.1&ndash;0.3 ms. On points, the spark happens when the points <em>open</em>; because gap and timing are linked, always gap first, time second."
        },
        {
          "type": "photo",
          "src": "repair-photos/088_centrifugal_advance.jpg",
          "caption": "Centrifugal advance weights and springs on the points cam"
        },
        {
          "type": "photo",
          "src": "repair-photos/088_points_condenser_cdi_box.jpg",
          "caption": "Points, condenser and CDI box side by side"
        },
        {
          "type": "plate",
          "id": "F22",
          "caption": "Ignition circuits: AC-CDI with exciter and pulser coils, and DC-TCI or ECU-controlled inductive ignition."
        },
        {
          "type": "photo",
          "src": "repair-photos/090_trigger_source_coils.jpg",
          "caption": "Source and trigger coils under a flywheel magneto: the source coil charges the CDI, the trigger coil tells it when to fire."
        },
        {
          "type": "photo",
          "src": "repair-photos/091_centrifugal_advance.jpg",
          "caption": "Centrifugal advance unit: weights fly out as rpm rises and turn the trigger earlier, so the spark fires further before top dead centre. Most engines reach full advance by about 3,000 rpm."
        },
        {
          "type": "wiring",
          "tab": "ignition",
          "caption": "Crank the engine and watch the primary current build in the coil and collapse at the trigger point, producing the secondary spark; compare the CDI and TCI/ECU variants and find where the kill switch interrupts each."
        },
        {
          "type": "h3",
          "text": "Timing and advance"
        },
        {
          "type": "p",
          "html": "The flame takes a roughly constant 1&ndash;3 ms to burn the charge, and peak pressure should arrive about 10&ndash;15&deg; after TDC. As rpm rises, the same burn time spans more crank angle, so the spark must start earlier. Time for a crank angle is <strong>t = &theta; / (6 &times; n)</strong>: at 9000 rpm, 30&deg; BTDC is only 0.56 ms."
        },
        {
          "type": "p",
          "html": "Typical advance runs from 5&ndash;15&deg; BTDC at idle to 30&ndash;40&deg; at mid and high rpm part load, with <em>less</em> at full load because the dense charge burns faster and is closer to detonation. Too much advance: pinking, hot head, holed pistons. Too little: lost power, hot exhaust valve and header."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Run the <a href=\"../overview/?mode=4t&part=engine\">four-stroke engine</a> and move the RPM slider from 1500 to 9000 rpm. The power stroke stays at 180° of crank angle but shrinks from 20 ms to 3.3 ms, while the flame needs roughly the same time to burn whatever the engine speed, which is why the spark must advance as revs rise. Then open the <a href=\"../overview/?mode=4t&part=spark_plug\">spark plug</a> panel, hold IGNITE to build current in the coil and release it to fire the plug."
        },
        {
          "type": "wiring",
          "tab": "ignition",
          "caption": "Raise the engine speed and watch the spark move earlier before TDC; then trigger the ignition faults and decide, from what the circuit shows, whether the coil, the pickup or the kill-switch wiring is to blame.",
          "preview": "ignition"
        },
        {
          "type": "h3",
          "text": "Spark plugs"
        },
        {
          "type": "model",
          "file": "spark_plug",
          "caption": "A spark plug: terminal, ceramic insulator, hex shell, sealing washer, centre and earth electrodes."
        },
        {
          "type": "photo",
          "src": "render-plug.jpg",
          "caption": "A 14 mm resistor spark plug of the D7RTC class: threaded shell with sealing gasket, 16 mm hex, ribbed alumina insulator to stop flashover, terminal nut, and the centre and earth electrodes that form the 0.6–0."
        },
        {
          "type": "p",
          "html": "The insulator tip must run between about <strong>450 &deg;C</strong> (below: carbon fouling) and <strong>850 &deg;C</strong> (above: glowing tip and pre-ignition). A hot plug has a long nose for low-load commuting; a cold plug has a short nose for sustained high load. In the NGK scheme <strong>higher number = colder</strong>; Bosch and Champion number the other way."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "K-Light plug",
              "v": "D7RTC",
              "p": "D = M12 &times; 1.25 thread, 7 = heat rating, R = resistor, C = copper core"
            },
            {
              "l": "Gap",
              "v": "0.7 &plusmn; 0.1 mm",
              "p": "set with a wire gauge, never a flat feeler"
            }
          ]
        },
        {
          "type": "table",
          "head": [
            "Plug looks",
            "Means",
            "Do"
          ],
          "rows": [
            [
              "Light tan to grey-brown",
              "Correct mixture and heat range",
              "Nothing"
            ],
            [
              "Black dry soot",
              "Rich, blocked filter, enricher on, plug too cold, weak spark",
              "Check filter, enricher, mixture, ignition"
            ],
            [
              "Black wet oily",
              "Oil past rings or guides; two-stroke excess premix",
              "Compression and leak-down test"
            ],
            [
              "White, blistered",
              "Lean, over-advanced, plug too hot, air leak",
              "Check mixture, timing, plug grade"
            ],
            [
              "Wet with fuel after cranking",
              "Flooding or no spark",
              "Spark test; leaking injector or high float"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m3-17"
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "High voltage",
          "html": "Ignition systems produce up to 35 kV. Use an insulated spark tester, never hold a lead or plug in bare hands, and never crank a CDI or ECU engine with the HT lead disconnected and unearthed: the unrestrained voltage can break down the coil or damage the ECU."
        },
        {
          "type": "p",
          "html": "A resistor plug or suppressor cap (about 5 k&Omega;) limits the radio-noise current pulse that can corrupt ECU signals. A cracked or damp cap tracks the spark to earth and gives a misfire in wet weather."
        }
      ]
    },
    {
      "id": "m3-battery-charging",
      "title": "Battery, charging and starting",
      "lead": "The battery is the motorcycle's energy savings account: the alternator pays in, lights and ECU draw out, and the starter makes one huge withdrawal every time you press the button. Know the numbers and you can tell a tired battery from a dead regulator in minutes.",
      "lab": "overview/?mode=4t&part=battery",
      "blocks": [
        {
          "type": "h3",
          "text": "Battery types"
        },
        {
          "type": "model",
          "file": "battery_12v",
          "caption": "A 12 V sealed AGM service battery with its terminals."
        },
        {
          "type": "p",
          "html": "A lead-acid cell gives a nominal 2.1 V, so a 12 V battery has six in series. <strong>Flooded</strong> batteries have cell caps and are topped up with distilled water; a hydrometer reading of 1.265 or more means fully charged. <strong>AGM (VRLA)</strong> batteries hold the acid in glass mat and are sealed: the K-Light 125 uses a <strong>12 V 6 Ah YTX7A-BS</strong> AGM and must not get a liquid-filled substitute. <strong>LiFePO4</strong> uses four 3.2 V cells (12.8 V), weighs about a third as much, but needs a BMS and must never be charged below about 0 &deg;C, above about 14.6 V or with a desulphation mode."
        },
        {
          "type": "photo",
          "src": "repair-photos/095_indeed_armour_light.jpg",
          "caption": "Battery state of charge compared with volts and gravity"
        },
        {
          "type": "photo",
          "src": "repair-photos/095_batteries_junk_anyway_but_might_get.jpg",
          "caption": "Small pencil hydrometer for a motorcycle battery"
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Ah",
              "v": "6 Ah",
              "p": "at the 10-hour rate: 0.6 A for 10 hours; how long it runs the loads"
            },
            {
              "l": "CCA",
              "v": "~100 A",
              "p": "at &minus;18 &deg;C for 30 s above 7.2 V; whether it cranks a cold engine"
            },
            {
              "l": "Storage",
              "v": "every 3 months",
              "p": "recharge interval in storage; life typically falls after 2&ndash;3 years"
            }
          ]
        },
        {
          "type": "h3",
          "text": "State of charge from rested voltage"
        },
        {
          "type": "p",
          "html": "Let the battery rest at least 1 hour (or apply a light load) to remove surface charge, then read open-circuit voltage."
        },
        {
          "type": "table",
          "head": [
            "State of charge",
            "Flooded (V)",
            "AGM (V)",
            "LiFePO4 (V)"
          ],
          "rows": [
            [
              "100 %",
              "12.65&ndash;12.7",
              "12.8&ndash;13.1",
              "13.3&ndash;13.4"
            ],
            [
              "75 %",
              "12.4",
              "12.6",
              "13.2"
            ],
            [
              "50 %",
              "12.2",
              "12.3",
              "13.1"
            ],
            [
              "25 %",
              "12.0",
              "12.0",
              "13.0"
            ],
            [
              "0 %",
              "11.8 or less",
              "11.8 or less",
              "12.0 or less"
            ]
          ]
        },
        {
          "type": "p",
          "html": "K-Light: <strong>13.1 V</strong> fully charged, <strong>12.3 V</strong> needs charging. Notice how flat the LiFePO4 column is: voltage is a poor gauge for lithium."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb: the 10 % rule",
          "html": "Charge lead-acid at no more than 10 % of its Ah rating. For the K-Light 6 Ah battery that is <strong>0.6 A for 10&ndash;15 hours</strong>. Charging is complete when the voltage 30 minutes later is 12.8 V or more. A 6 A quick charge for 30 minutes is for emergencies only, with the battery off the bike."
        },
        {
          "type": "check",
          "q": "m3-19"
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Battery safety",
          "html": "Charging releases explosive hydrogen: ventilate, switch the charger off before touching the clips, wear eye protection. When removing a battery take the negative off first; when fitting, connect the positive first, negative last, so a spanner touching the frame cannot short the live terminal."
        },
        {
          "type": "h3",
          "text": "Alternator and regulator"
        },
        {
          "type": "p",
          "html": "Most small bikes use a permanent-magnet alternator: magnets on a flywheel rotor spin around a wound stator. Output rises with rpm, a three-phase stator reaching <strong>50&ndash;80 V AC</strong> open-circuit at 5000 rpm, so regulation is essential. On a small single the output is only just above the load with the lights on, which is why long idling with the headlight on can drain the battery."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Charging voltage",
              "v": "14.5 &plusmn; 0.5 V",
              "p": "K-Light at 5000 rpm"
            },
            {
              "l": "Stator",
              "v": "0.8 &plusmn; 0.3 &Omega;",
              "p": "between each pair of the three white wires, 20 &deg;C"
            },
            {
              "l": "Flywheel nut",
              "v": "50&ndash;60 N&middot;m",
              "p": "K-Light torque"
            }
          ]
        },
        {
          "type": "table",
          "head": [
            "Regulator",
            "When the battery is full",
            "Result"
          ],
          "rows": [
            [
              "Shunt (SCR)",
              "Shorts the stator phases to earth",
              "Stator always makes full current; heat in stator and regulator"
            ],
            [
              "Series (MOSFET)",
              "Opens the circuit stator to battery",
              "Stator current falls with demand; runs much cooler"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Too low a voltage leaves the battery undercharged; too high boils electrolyte, dries AGM separators, blows bulbs and can damage the ECU."
        },
        {
          "type": "plate",
          "id": "F21",
          "caption": "Charging circuit: permanent-magnet alternator, shunt regulator/rectifier, fuse, battery and loads."
        },
        {
          "type": "engine",
          "shot": "05-generator-electric-start",
          "view": "gen",
          "caption": "The flywheel magneto and stator during an electric start: the starter turns the crank through a one-way roller clutch."
        },
        {
          "type": "wiring",
          "tab": "charging",
          "caption": "Start the engine and raise the revs: watch the stator AC, the rectified DC and the battery voltage settle at 14.5 ± 0.5 V, then switch on the headlight and see how the regulator shunts less current to earth."
        },
        {
          "type": "check",
          "q": "m3-21"
        },
        {
          "type": "h3",
          "text": "Electric starting"
        },
        {
          "type": "p",
          "html": "The starter draws tens to over a hundred amps, far too much for a handlebar switch. So the start button only carries a few hundred milliamps through a <strong>starter relay</strong> coil, and the relay switches the heavy cable. The K-Light circuit has a 20 A main fuse and two 10 A circuit fuses."
        },
        {
          "type": "photo",
          "src": "repair-photos/099_electric_starters_2.jpg",
          "caption": "Two starter motors"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Neutral switch",
              "html": "Allows starting with the gearbox in neutral."
            },
            {
              "title": "Clutch switch",
              "html": "Allows starting in gear with the lever pulled, isolated by a diode so the neutral lamp stays off."
            },
            {
              "title": "Side-stand switch",
              "html": "Stops the engine if a gear is selected with the stand down."
            },
            {
              "title": "Brake lever switch",
              "html": "Must be closed on the K-Light and many scooters (battery voltage at the relay green/yellow wire)."
            },
            {
              "title": "Engine stop switch",
              "html": "Usually also interrupts the relay supply."
            }
          ]
        },
        {
          "type": "p",
          "html": "The <strong>starter clutch</strong> (sprag or roller one-way clutch) drives the crank and freewheels once the engine fires. If it slips, the starter spins and whines without turning the engine. K-Light starter brushes: 12.5 mm new, service limit 8.5 mm."
        },
        {
          "type": "plate",
          "id": "F23",
          "caption": "Electric starting circuit: battery, fuses, switches, interlocks, starter relay, starter motor and starter clutch."
        },
        {
          "type": "wiring",
          "tab": "starting",
          "caption": "Switch the key on, select neutral and hold START: follow the control current through the interlocks to the relay coil and the heavy current from battery to starter motor, then pull in the clutch with a gear selected and fold the side stand down to see which interlock breaks the circuit."
        },
        {
          "type": "h3",
          "text": "Exercises in the Circuit Builder"
        },
        {
          "type": "p",
          "html": "Each exercise opens a circuit in the Circuit Builder on the Wiring Lab page. Press <strong>Test</strong> to connect the battery, take the readings, then press <strong>Note reading</strong> to keep them in the log. Part values are typical examples, not the figures of a particular bike."
        },
        {
          "type": "exercise",
          "title": "Battery voltage at rest and under load",
          "preset": "battery-load",
          "task": "Press Test with switch S1 open and read V1. Close S1 to switch on the headlight and horn, read V1 and A1 again. Then select B1 and raise its internal resistance to 250 mΩ, as in a worn or sulphated battery.",
          "measure": "Battery terminal voltage (V1) and load current (A1), with S1 open and closed, for 20 mΩ and 250 mΩ of internal resistance.",
          "expect": "With S1 open, V1 shows the full 12.6 V in both cases. Loaded, a good battery holds about 12.4 V at close to 8 A; the worn one falls below 11 V and the current drops to about 7 A.",
          "why": "Terminal voltage = EMF − I × internal resistance. No current flows at rest, so a resting voltage test cannot see a high internal resistance. Only a load test, at the battery or while cranking, shows it."
        },
        {
          "type": "exercise",
          "title": "Internal resistance from two readings",
          "preset": "battery-load",
          "task": "Use the readings of the previous exercise, or take them again: V1 with S1 open, then V1 and A1 with S1 closed.",
          "measure": "Open-circuit voltage, loaded voltage and load current.",
          "expect": "With the default battery: (12.60 − 12.44) / 7.8 ≈ 0.02 Ω, the 20 mΩ set on B1.",
          "why": "The voltage lost inside the battery divided by the current that caused it is the internal resistance. Testers that quote a battery's condition use the same principle with a known load."
        },
        {
          "type": "exercise",
          "title": "Charging voltage and lamp brightness",
          "preset": "bulb",
          "task": "Press Test and read the bulb current in the part panel of L1. Then select B1 and set its EMF to 14.2 V, the voltage a regulator holds with the engine running.",
          "measure": "Bulb current, power and light output at 12.6 V and at 14.2 V.",
          "expect": "About 1.8 A and 23 W at 12.6 V; about 2.1 A and 29 W at 14.2 V. Light output rises by roughly half.",
          "why": "The filament resistance stays roughly constant once hot, so current rises with voltage and power with its square. Light output of a filament rises faster still, roughly with the voltage to the power 3.4. Lamps blow early when a regulator fails and the voltage climbs."
        },
        {
          "type": "exercise",
          "title": "Parasitic drain with the ammeter",
          "preset": "drain",
          "task": "The ammeter A1 sits between the battery negative and the earth lead, as in a real drain test. Press Test with the light switch S1 open.",
          "measure": "Current in A1 with everything switched off.",
          "expect": "About 10 mA, through R1, which stands for a clock or ECU memory. Over a day that is 0.010 A × 24 h ≈ 0.25 Ah, a few percent of a small battery's capacity.",
          "why": "Every always-on load drains the battery while the bike stands. A drain of tens of milliamps flattens a small battery in a few weeks; pull fuses one at a time while watching the ammeter to find the circuit that draws it."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "qqSZWaWEe3s",
              "title": "How to Test Your Motorcycle’s Stator and Regulator Rectifier | The Shop Manual",
              "channel": "RevZilla",
              "channel_url": "http://www.youtube.com/@RevZilla",
              "duration": "7:07",
              "role": "How-to",
              "note": "Test the stator and regulator rectifier with a multimeter to tell charging faults from a weak battery; values are bike-specific."
            }
          ]
        }
      ]
    },
    {
      "id": "m3-lighting-wiring",
      "title": "Lighting, signalling and wiring",
      "lead": "Lights, indicators and the harness that feeds them are where most everyday electrical faults live. A few simple calculations explain LED hyper-flash, melted connectors and why the fuse must match the wire, not the lamp.",
      "lab": "overview/?mode=4t&part=wiring",
      "blocks": [
        {
          "type": "h3",
          "text": "Lamps"
        },
        {
          "type": "p",
          "html": "A filament bulb turns only about 2&ndash;3 % of its power into visible light. A <strong>halogen</strong> H4 (the K-Light headlight) has two filaments, typically 60 W main and 55 W dipped; never touch the quartz, because skin oil makes hot spots. An <strong>LED</strong> gives 80&ndash;150 lm/W and lasts tens of thousands of hours, but needs a heat sink and a constant-current driver, and it draws far less current than the bulb it replaces."
        },
        {
          "type": "photo",
          "src": "repair-photos/086_ground_wire_ground_frame_2.jpg",
          "caption": "Power source, hot wire, load and ground shown with a lamp"
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Headlight",
              "v": "H4",
              "p": "60 W main, 55 W dipped"
            },
            {
              "l": "Indicators",
              "v": "R10W",
              "p": "10 W each; flash at 90 &plusmn; 30 per minute (UNECE)"
            },
            {
              "l": "Tail / brake",
              "v": "P21/5W",
              "p": "plate light W5W, position lamp W3W"
            }
          ]
        },
        {
          "type": "p",
          "html": "LED retrofits in a halogen reflector cannot put their emitters exactly where the filament was, so light scatters above the dipped-beam cut-off and dazzles: they are generally not type-approved."
        },
        {
          "type": "model",
          "file": "headlight_round",
          "caption": "A seven-inch round chrome headlight with glass lens and reflector."
        },
        {
          "type": "photo",
          "src": "repair-photos/086_solid_wire.jpg",
          "caption": "Stranded wire used for heavy 12 V cables"
        },
        {
          "type": "models",
          "files": [
            "headlight_led",
            "headlight_mx"
          ],
          "caption": "Other headlight styles: an angular LED unit with daytime running light, and a motocross number-plate shroud."
        },
        {
          "type": "model",
          "file": "tail_light",
          "caption": "An LED tail light with number-plate light."
        },
        {
          "type": "h3",
          "text": "Flashers and LED hyper-flash"
        },
        {
          "type": "p",
          "html": "A thermal flasher's bimetal strip is heated by the lamp current, so when one bulb fails the current halves and the rate changes: a built-in failure warning. Many electronic flashers sense current too and hyper-flash when the load falls."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Bulb load per side",
              "html": "2 &times; 10 W / 12 V &asymp; 1.67 A"
            },
            {
              "title": "LED load per side",
              "html": "2 &times; 1.5 W / 12 V = 0.25 A, far below the design value"
            },
            {
              "title": "Load resistor per bulb",
              "html": "R = V&sup2; / P = 144 / 10 = 14.4 &Omega;, dissipating 10 W"
            }
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Better fix",
          "html": "Fit a load-independent electronic flasher designed for LEDs: it wastes no power. If you use load resistors, mount them on metal, because each one gets as hot as the bulb it replaces."
        },
        {
          "type": "check",
          "q": "m3-24"
        },
        {
          "type": "plate",
          "id": "EL01",
          "caption": "Instruments and switchgear: twin analogue clocks, a motocross LCD, a TFT dash, and the left and right switch cubes with every switch named."
        },
        {
          "type": "h3",
          "text": "Fuses, connectors and earths"
        },
        {
          "type": "photo",
          "src": "repair-photos/086_do_have_one_right.jpg",
          "caption": "Connector block on a bike wiring harness"
        },
        {
          "type": "p",
          "html": "<strong>A fuse protects the wiring, not the load.</strong> Rate it below the capacity of the smallest wire it protects and above the circuit's normal maximum current. A fuse that blows repeatedly means a short downstream, never a reason to fit a bigger one."
        },
        {
          "type": "figure",
          "fig": "ohms-law",
          "caption": "Pick a load in watts and the supply voltage to see the current, then the fuse rating that protects its wire."
        },
        {
          "type": "p",
          "html": "Water and vibration cause most connector faults: fretting corrosion, pins backed out by careless probing, chafing at the steering head. Electronic parts get dedicated earth wires because painted, plastic or rubber-mounted parts give an unreliable frame return, and a few tenths of a volt of earth offset corrupt sensor signals."
        },
        {
          "type": "model",
          "file": "wiring_harness",
          "caption": "A main wiring harness with its branches, multi-pin connectors, fuse box and relays."
        },
        {
          "type": "plate",
          "id": "WR01",
          "caption": "The main wiring harness laid flat: trunk, branches, connectors, fuse box, relays and earth points."
        },
        {
          "type": "h3",
          "text": "Reading a wiring diagram"
        },
        {
          "type": "p",
          "html": "On the K-Light diagram <strong>R</strong> is battery positive (unswitched), <strong>R/W</strong> is switched supply after the main switch, <strong>B</strong> is earth, and the three <strong>W</strong> wires are the alternator phases. The colour code on the diagram for that exact model is the only authority."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Find the load",
              "html": "Identify which of its wires is supply and which is earth."
            },
            {
              "title": "Trace the supply back",
              "html": "Through each switch, connector and fuse to the main switch and battery, noting every colour change."
            },
            {
              "title": "List circuits sharing the fuse",
              "html": "If horn and brake light fail together, the shared fuse is the first suspect."
            },
            {
              "title": "Trace the earth path",
              "html": "Back to battery negative or its earth point."
            },
            {
              "title": "Mark a mid-circuit test point",
              "html": "One voltage reading then splits the circuit in half."
            }
          ]
        },
        {
          "type": "wiring",
          "tab": "harness",
          "caption": "Trace the main harness from battery to each load: click a connector to see its wire colours, then follow one circuit (for example the brake light) from fuse to switch to lamp to earth, as in the five-step method above."
        },
        {
          "type": "check",
          "q": "m3-26"
        },
        {
          "type": "h3",
          "text": "CAN bus and accessories"
        },
        {
          "type": "p",
          "html": "Larger bikes link ECU, dash, ABS and switch gear over a two-wire <strong>CAN bus</strong> at typically 500 kbit/s. Each end has a 120 &Omega; terminator, so with the battery disconnected CAN-H to CAN-L should read about <strong>60 &Omega;</strong>; 120 &Omega; means one terminator or branch is open, near 0 &Omega; means the wires are shorted."
        },
        {
          "type": "p",
          "html": "A small machine may have only 50&ndash;100 W of alternator surplus. Two 35 W auxiliary lamps draw 70 / 12 &asymp; 5.8 A, likely more than that. Check charging voltage with all loads on, then feed accessories through their own fuse and an ignition-switched relay, never by tapping CAN or sensor wires."
        },
        {
          "type": "plate",
          "id": "EL02",
          "caption": "Where the electrical components sit on a road motorcycle."
        },
        {
          "type": "h3",
          "text": "Exercises in the Circuit Builder"
        },
        {
          "type": "p",
          "html": "Open each circuit in the Circuit Builder, press <strong>Test</strong> and compare your readings with the expected result. Use <strong>Note reading</strong> to keep a before and after pair in the log."
        },
        {
          "type": "exercise",
          "title": "Two bulbs in parallel on one fuse",
          "preset": "parallel-bulbs",
          "task": "Press Test. Select each bulb and the fuse to read their currents. Then select F1 and change it from 5 A to 3 A.",
          "measure": "Current in L1, L2 and F1, and the voltage across each bulb.",
          "expect": "Each 21 W bulb gets about 12.4 V and takes about 1.8 A; the fuse carries the sum, about 3.6 A. The 3 A fuse blows within a few seconds.",
          "why": "Parallel branches each see the full supply voltage, and their currents add in the shared feed. The fuse must be rated above the total, with some margin: about 1.25 to 2 times the normal current."
        },
        {
          "type": "exercise",
          "title": "Voltage drop along a long thin wire",
          "preset": "long-wire",
          "task": "Press Test. Place a voltmeter and wire its leads to the two ends of the long feed wire. Then select the wire and change its cross-section from 0.5 mm² to 1.5 mm².",
          "measure": "Voltmeter reading along the wire, and the lamp voltage, for both sizes.",
          "expect": "About 0.46 V lost along 3 m of 0.5 mm² at 4.6 A; about 0.15 V with 1.5 mm².",
          "why": "R = ρ L / A = 1.68e-8 × 3 / 0.5e-6 ≈ 0.10 Ω, and the drop is I × R. Three times the cross-section gives a third of the resistance. A voltage drop test with the circuit working finds bad wires that an ohm meter can miss."
        },
        {
          "type": "exercise",
          "title": "A relay drives the horn",
          "preset": "relay-horn",
          "task": "Press Test, then hold the push button P1 (press and hold it on the board or in its part panel).",
          "measure": "A2, the current through the button and relay coil, and A1, the horn current through the relay contact.",
          "expect": "About 0.15 A in the button circuit and about 3.1 A in the horn circuit.",
          "why": "The 85 Ω coil draws only 12.6 / 85 ≈ 0.15 A, while the contact switches the heavy current. The handlebar switch and its long thin wires carry only the coil current, so they stay cool and the full voltage reaches the horn."
        },
        {
          "type": "exercise",
          "title": "Why an LED needs a series resistor",
          "preset": "led-bare",
          "task": "Press Test and close S1. LED1 is wired straight across the supply; LED2 has a 560 Ω resistor in series.",
          "measure": "Current in each LED.",
          "expect": "LED1 burns out at once. LED2 runs at about 18 mA, inside its 20 mA rating.",
          "why": "An LED has an almost fixed forward voltage, about 2 V for red, so with no resistor nothing limits the current. The resistor sets it: R = (supply − forward voltage) / current = (12.6 − 2.0) / 0.018 ≈ 590 Ω. Try the LED challenge to find the value for 15 mA."
        }
      ]
    },
    {
      "id": "m3-diagnosis",
      "title": "Electrical diagnosis",
      "lead": "Electrical faults are invisible until you measure them. With a multimeter, Ohm's law and a handful of K-Light reference values you can find almost any fault by method rather than by swapping parts.",
      "lab": "overview/?mode=4t&part=wiring",
      "blocks": [
        {
          "type": "h3",
          "text": "Using the multimeter"
        },
        {
          "type": "photo",
          "src": "repair-photos/086_now_we_start_testing_2.jpg",
          "caption": "Multimeter used to trace a fault"
        },
        {
          "type": "photo",
          "src": "repair-photos/099_reverse.jpg",
          "caption": "Rectifier checked with reversed meter leads"
        },
        {
          "type": "table",
          "head": [
            "Measure",
            "How",
            "Watch out"
          ],
          "rows": [
            [
              "Voltage",
              "In parallel, circuit working",
              "DC for battery and sensors, AC for stator output"
            ],
            [
              "Resistance",
              "Unpowered, component disconnected",
              "Short the probes and use REL: 0.1&ndash;0.3 &Omega; matters on a 0.8 &Omega; stator"
            ],
            [
              "Continuity",
              "Buzzer, low current",
              "One surviving strand passes but drops volts under load"
            ],
            [
              "Current",
              "In series, start on 10 A range",
              "Never across a battery: it is a dead short"
            ],
            [
              "Diode test",
              "Shows forward voltage",
              "0.4&ndash;0.7 V one way, blocks the other (regulator diodes)"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A 10 M&Omega; digital meter is safe on ECU sensor lines; a test lamp is not. Back-probe connectors beside the wire seal; never pierce insulation."
        },
        {
          "type": "h3",
          "text": "Four kinds of fault"
        },
        {
          "type": "table",
          "head": [
            "Fault",
            "Effect",
            "Typical reading"
          ],
          "rows": [
            [
              "Open circuit",
              "No current, load dead",
              "Full supply voltage across the break; infinite resistance"
            ],
            [
              "Short to earth",
              "Excess current, fuse blows",
              "Near 0 &Omega; supply wire to earth with load disconnected"
            ],
            [
              "Short to supply",
              "Load runs when it should not",
              "Voltage on a wire that should be dead"
            ],
            [
              "High resistance",
              "Load weak or intermittent, connector hot",
              "Voltage drop across a connection under load"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Voltage-drop testing"
        },
        {
          "type": "p",
          "html": "Measure across one section of a circuit <em>while full current flows</em>. By Ohm's law V = I &times; R, so at 100 A of starter current even <strong>0.002 &Omega;</strong> drops 0.2 V. This finds the high resistance a resistance test misses."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Per connection or switch",
              "v": "&le; 0.2 V",
              "p": "including relay contacts"
            },
            {
              "l": "Starter positive side",
              "v": "&le; 0.5 V",
              "p": "battery post to starter terminal while cranking"
            },
            {
              "l": "Starter negative side",
              "v": "&le; 0.3 V",
              "p": "battery negative post to starter body"
            },
            {
              "l": "Electronic earths",
              "v": "&le; 0.1 V",
              "p": "sensors are referenced to earth"
            }
          ]
        },
        {
          "type": "figure",
          "fig": "ohms-law",
          "caption": "Use Ohm's law to see how a small resistance turns into a big voltage drop at high current."
        },
        {
          "type": "wiring",
          "tab": "starting",
          "caption": "Fault-finding exercise: trigger the poor starter-earth fault and hold START. The starter clicks or turns slowly although the battery is charged; locate the volts lost on the earth side as you would with a meter in job sheet 3.6.4.",
          "preview": "starting-noearth"
        },
        {
          "type": "check",
          "q": "m3-28"
        },
        {
          "type": "h3",
          "text": "Parasitic drain"
        },
        {
          "type": "p",
          "html": "With the ignition off, the K-Light allows a leakage current of <strong>no more than 1 mA</strong>. Disconnect battery negative, put the ammeter in series, start on 10 A, step down to mA once the ECU sleeps, then pull fuses one at a time until the drain drops. A stuck brake-light switch is a frequent cause. Time to flat is t = C / I: a 20 mA alarm takes a 6 Ah battery to 50 % in about six days."
        },
        {
          "type": "photo",
          "src": "repair-photos/099_ignition_coils.jpg",
          "caption": "Testing an ignition coil with a meter"
        },
        {
          "type": "h3",
          "text": "Job sheets in brief"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "3.6.1 Battery",
              "html": "Rest 1 h, read OCV (charge below 12.3 V), charge at 0.6 A for 10&ndash;15 h, recheck after 30 min (&ge; 12.8 V), cranking voltage above 9.6 V."
            },
            {
              "title": "3.6.2 Charging",
              "html": "Charged battery first. 14.5 &plusmn; 0.5 V at 5000 rpm; stator pairs 0.8 &plusmn; 0.3 &Omega; and isolated from earth; AC output balanced within about 10 %; diode-test the regulator."
            },
            {
              "title": "3.6.3 Ignition",
              "html": "Battery above 12.4 V, spark test at 6&ndash;8 mm, coil 4 &Omega; / 18.6 k&Omega;, trigger 150 &plusmn; 10 &Omega; and peak above 1.7 V cranking, coil to ECU pins 1 and 13."
            },
            {
              "title": "3.6.4 Starter",
              "html": "Listen for the relay click, then voltage-drop the positive side, relay contacts and negative side while cranking; brushes above 8.5 mm."
            },
            {
              "title": "3.6.5 EFI codes and TPS",
              "html": "FI lamp bulb check, read codes and freeze frame before clearing, TPS reference 5 &plusmn; 0.1 V, signal 0.5&ndash;0.9 V closed rising smoothly to 3.5&ndash;4.0 V."
            }
          ]
        },
        {
          "type": "callout",
          "tone": "elec",
          "title": "Always charge the battery first",
          "html": "A discharged battery pulls the charging voltage down and hides a bad regulator, and sags under cranking like a failing starter. Every reference value assumes a charged battery."
        },
        {
          "type": "wiring",
          "tab": "charging",
          "caption": "Fault-finding exercise: run the engine at 5000 rpm and compare a healthy shunt regulator with a failed one; decide from the battery voltage whether the fault is undercharging or overcharging, and which test from job sheet 3.6.2 confirms it.",
          "preview": "charging-shunt"
        },
        {
          "type": "h3",
          "text": "Quick troubleshooting"
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Likely cause",
            "Check"
          ],
          "rows": [
            [
              "Good spark, plug dry",
              "Tank vent blocked, pump or filter fault",
              "Pump runs 3 s at key-on; 300 kPa"
            ],
            [
              "Battery undercharged",
              "Brake switch stuck, drain above 1 mA, shorted stator",
              "Drain test; stator resistance"
            ],
            [
              "Voltage too high, bulbs blow",
              "Regulator not limiting, poor regulator earth",
              "Charging voltage at 5000 rpm; earth drop"
            ],
            [
              "No relay click",
              "Brake/clutch/neutral switch or diode, button, relay coil, fuse",
              "Relay coil voltage and earth"
            ],
            [
              "Relay clicks, starter dead",
              "Burned relay contacts, worn brushes",
              "Relay contact voltage drop"
            ],
            [
              "Horn silent",
              "Supply, button contact, horn",
              "Bridge button side to earth"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m3-30"
        },
        {
          "type": "h3",
          "text": "Exercises in the Circuit Builder"
        },
        {
          "type": "p",
          "html": "These exercises practise the meter work of this chapter on circuits with a fault built in. Press <strong>Test</strong> to connect the battery; press it again to disconnect it before any ohm reading."
        },
        {
          "type": "exercise",
          "title": "Voltage drop across a bad earth",
          "preset": "bad-earth",
          "task": "Press Test: the 55 W headlight is dim. Place a voltmeter and wire one lead to the lower terminal of the lamp, the other to a new clean earth point. Then select E2 and choose Clean.",
          "measure": "Voltage across the earth connection, voltage across the lamp and its light output, before and after cleaning.",
          "expect": "About 2.0 V across the corroded earth, so the lamp gets about 10.4 V and gives roughly 60 % of its light. Cleaned, the earth drops under 0.05 V and the lamp is at full brightness.",
          "why": "The earth is in series with the lamp: the same 4 A flows through 0.5 Ω and loses 2 V there. A good connection should drop no more than about 0.1 V to 0.2 V with the circuit working."
        },
        {
          "type": "exercise",
          "title": "Find the open filament with the ohm meter",
          "preset": "open-bulb",
          "task": "Press Test: L2 stays dark. Press Test again to disconnect the battery. Wire DMM1, set to ohms, across L2. Read it with S2 closed, then with S2 open.",
          "measure": "Resistance across L2 with its switch closed and open, and across a good bulb for comparison.",
          "expect": "With S2 closed the meter reads about 0.35 Ω through the other two lamps. With S2 open it reads OL: the filament is open. A good cold 21 W bulb reads about 0.7 Ω.",
          "why": "An ohm meter pushes its own small test current, so it needs a dead circuit, and any parallel path adds to the reading. Isolate the part first. A cold tungsten filament reads about a tenth of its hot resistance (144 / 21 ≈ 6.9 Ω)."
        },
        {
          "type": "exercise",
          "title": "A short circuit and the fuse",
          "preset": "short",
          "task": "Press Test: L1 lights. Close S2, which connects the feed straight to earth. Replace the fuse with S2 still closed, then open S2 and replace it again.",
          "measure": "Battery current at the moment of the short, and the state of F1.",
          "expect": "Over 200 A flows for an instant and the 10 A fuse blows at once. A new fuse blows again until the short is removed.",
          "why": "With almost no resistance in the path, only the battery's internal resistance and the wires limit the current. The fuse protects the wiring, not the load; a fuse that blows again on replacement means a short still in the circuit."
        },
        {
          "type": "exercise",
          "title": "Ammeter in the wrong place",
          "preset": "bulb",
          "task": "Press Test. Place a multimeter, set it to amps, and wire it across the bulb L1 instead of in series. Then remove it and put an ammeter in series between the switch and the bulb.",
          "measure": "What happens with the meter across the bulb, and the reading in series.",
          "expect": "Across the bulb the meter shorts the circuit: its 10 A fuse or the 3 A circuit fuse blows and the bulb goes out. In series it reads about 1.8 A and the bulb stays lit.",
          "why": "On the amps range a meter has almost no resistance, so it must replace a piece of wire in the path of the current. Voltage is measured across a part; current is measured through it."
        }
      ]
    }
  ]
};
