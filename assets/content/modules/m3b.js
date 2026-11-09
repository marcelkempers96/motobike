/* Motopedia: Module 4 lessons (electrical systems). Same block types as the other modules. */
export default {
  "id": "electrics",
  "num": "4",
  "title": "Electrical systems: ignition, battery, charging and lighting",
  "intro": "How the electrical system works and how to fault-find it: circuits and measurement, the battery, charging and starting, ignition, lighting, signalling and wiring, and a step-by-step method for electrical diagnosis.",
  "pdf": "motopedia-module-3-fuel-ignition-electrical.pdf",
  "chapters": [
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
          "html": "A lead-acid cell has a lead dioxide positive plate, a sponge lead negative plate and dilute sulphuric acid. On discharge both plates turn to lead sulphate and the acid weakens; charging reverses the reaction. Each cell gives a nominal 2.1 V, so a 12 V battery has six in series."
        },
        {
          "type": "p",
          "html": "<strong>Flooded</strong> batteries (for example the 12N12A-4A-1: 12 V, N for the Japanese standard, 12 Ah) have cell caps and a vent tube and are topped up with distilled water only. A hydrometer reading of 1.265 or more means full charge and below 1.200 needs charging, read at least 30 minutes after topping up. <strong>AGM (VRLA)</strong> batteries hold the acid in glass-fibre separators, recombine gas internally and vent only through a pressure valve, so they tolerate vibration and any mounting angle: the K-Light 125 uses a <strong>12 V 6 Ah YTX7A-BS</strong> AGM and must not get a liquid-filled substitute."
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
          "type": "p",
          "html": "<strong>Ah capacity</strong> decides how long the battery runs the lights and ECU without charge; <strong>CCA</strong> decides whether it turns the engine on a cold morning. <strong>Sulphation</strong>, the growth of hard lead sulphate crystals in a battery left partly discharged, permanently reduces both, which is why a stored battery needs charging about every 3 months."
        },
        {
          "type": "h3",
          "text": "State of charge from rested voltage"
        },
        {
          "type": "p",
          "html": "Open-circuit voltage indicates state of charge only after the battery has rested at least 1 hour (the K-Light manual condition) or a light load has removed the surface charge left by charging or riding."
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
          "html": "K-Light: <strong>13.1 V</strong> fully charged, <strong>12.3 V</strong> (about 50 %) needs charging. Notice how flat the LiFePO4 column is: voltage is a poor gauge for lithium, and its BMS or a dedicated tester says more."
        },
        {
          "type": "h3",
          "text": "Charging lead-acid batteries"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb: the 10 % rule",
          "html": "Charge lead-acid at no more than 10 % of its Ah rating. For the K-Light 6 Ah battery that is <strong>0.6 A for 10&ndash;15 hours</strong>. Charging is complete when the voltage 30 minutes later is 12.8 V or more. A 6 A quick charge for 30 minutes is for emergencies only, with the battery off the bike."
        },
        {
          "type": "eq",
          "id": "m3-charge-current",
          "name": "Safe charging current for lead-acid",
          "tex": "I_{ch} \\le 0.1\\,C",
          "where": [
            [
              "I_{ch}",
              "charging current",
              "A"
            ],
            [
              "C",
              "rated capacity at the 10-hour rate",
              "Ah"
            ]
          ],
          "why": "Charging faster than about a tenth of capacity heats the plates and gasses the electrolyte; small motorcycle batteries are easily overcharged by car chargers.",
          "example": "K-Light 6 Ah battery: \\(I_{ch} \\le 0.1 \\times 6 = 0.6\\ \\mathrm{A}\\)."
        },
        {
          "type": "eq",
          "id": "m3-charge-time",
          "name": "Charging time",
          "tex": "t = \\frac{\\Delta Q}{\\eta_{ch}\\,I_{ch}}",
          "where": [
            [
              "t",
              "charging time",
              "h"
            ],
            [
              "\\Delta Q",
              "charge to be replaced",
              "Ah"
            ],
            [
              "\\eta_{ch}",
              "charge efficiency (about 0.8 for lead-acid)",
              "none"
            ],
            [
              "I_{ch}",
              "charging current",
              "A"
            ]
          ],
          "why": "It estimates how long a battery must stay on the charger, and shows why a short top-up cannot recover a deeply discharged battery.",
          "example": "From 50 % on a 6 Ah battery: \\(\\Delta Q = 3\\ \\mathrm{Ah}\\), so \\(t = 3 / (0.8 \\times 0.6) \\approx 6.3\\ \\mathrm{h}\\)."
        },
        {
          "type": "p",
          "html": "Modern smart chargers apply constant current, then constant voltage at about 14.4&ndash;14.7 V (absorption), then a float at 13.5&ndash;13.8 V; some add a desulphation pulse mode. Car chargers without a low-current setting overcharge small batteries, and jump-starting from a running car exposes the motorcycle electronics to voltage transients. Practice: <a href=\"../repair/repairs/battery-test-charge/\">battery test and charge</a>, <a href=\"../repair/repairs/battery-terminal-clean/\">cleaning battery terminals</a>."
        },
        {
          "type": "check",
          "q": "m3-19"
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Battery safety",
          "html": "Charging releases explosive hydrogen: ventilate, switch the charger off before touching the clips, wear eye protection; flush acid from skin with water and neutralise spills with baking soda. When removing a battery take the negative off first; when fitting, connect the positive first, negative last, so a spanner touching the frame cannot short the live terminal."
        },
        {
          "type": "h3",
          "text": "Lithium iron phosphate batteries"
        },
        {
          "type": "p",
          "html": "LiFePO4 starter batteries use four 3.2 V cells (12.8 V), weigh about a third as much as an equivalent AGM, self-discharge very slowly and deliver high cranking current for their size. They need a built-in <strong>battery management system</strong> (BMS) for cell balancing and protection against over-discharge, overcharge and over-current."
        },
        {
          "type": "p",
          "html": "Never charge one below about 0 &deg;C (lithium plating on the anode permanently cuts capacity and risks an internal short), above about 14.6 V, or with a desulphation pulse mode. A battery whose BMS has disconnected after deep discharge can read near 0 V until reactivated. Fit one only when the charging system regulates within the battery maker's window, because its high charge acceptance is hard on a marginal regulator."
        },
        {
          "type": "h3",
          "text": "Alternator and regulator"
        },
        {
          "type": "p",
          "html": "Most small bikes use a permanent-magnet alternator: magnets on a flywheel rotor, bolted to the crankshaft taper, spin around a wound stator. Output frequency and voltage rise with rpm, a three-phase stator reaching <strong>50&ndash;80 V AC</strong> open-circuit at 5000 rpm, so regulation is essential. On a small single the output is only just above the load with the lights on, which is why long idling with the headlight on can drain the battery."
        },
        {
          "type": "table",
          "head": [
            "Alternator",
            "Construction",
            "Notes"
          ],
          "rows": [
            [
              "Single-phase",
              "One winding, often half-wave rectified",
              "Mopeds and older commuters; a separate lighting coil may feed the headlight with AC, so brightness varies with rpm"
            ],
            [
              "Three-phase",
              "Three windings at 120&deg;, three wires of one colour (white on the K-Light, yellow on many Japanese bikes)",
              "Smoother output, higher efficiency; six-diode full-wave rectifier"
            ],
            [
              "Field-coil",
              "Electromagnet rotor fed through slip rings",
              "Large tourers; the regulator varies field current, so the alternator makes only the power demanded"
            ]
          ]
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
          "type": "p",
          "html": "The K-Light charging chapter states the alternator as 160 W at 5000 rpm while the specification table gives 100 W; confirm against the parts catalogue for the build. Stator and cover bolts are 10&ndash;12 N&middot;m, the trigger 6&ndash;9 N&middot;m and the rectifier bolt 5.0 N&middot;m."
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
          "html": "The <strong>regulator/rectifier</strong> converts stator AC to DC through a diode bridge and holds battery voltage within the window, generally 13.5&ndash;15.0 V at 5000 rpm on lead-acid systems. A shunt regulator always runs the stator at full current, so the surplus becomes heat: that is why shunt units carry large fins, why stators on small bikes fail from overheating and why a regulator with corroded connectors cooks its plug. A MOSFET series regulator is a common upgrade for chronic failures, provided connector and fuse suit the current."
        },
        {
          "type": "p",
          "html": "Too low a voltage leaves the battery undercharged; too high boils electrolyte, dries AGM separators, blows bulbs and can damage the ECU. The K-Light fault trees use this pattern to separate regulator faults from battery faults: 16.2 V at 5000 rpm points to a failed regulator or a poor regulator earth, not a bad battery. Practice: <a href=\"../repair/repairs/charging-system-test/\">charging system test</a>, <a href=\"../repair/repairs/stator-test/\">stator test</a>, <a href=\"../repair/repairs/regulator-test/\">regulator test</a>."
        },
        {
          "type": "p",
          "html": "Stator readings are compared between pairs. Readings of 0.8, 0.8 and 0.2 \\(\\Omega\\) mean two pairs are within 0.8 \\(\\pm\\) 0.3 \\(\\Omega\\) and one pair has shorted turns, so output will be low; confirm with the AC output and short-to-earth tests. Any continuity from a stator wire to earth is a fault."
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
          "html": "The starter is a DC motor (permanent-magnet field on small machines) turning the crank through a reduction gear train and a one-way clutch. It draws tens to over a hundred amps, which would burn out a handlebar switch and need heavy cable to the bars. So the start button only carries a few hundred milliamps through a <strong>starter relay</strong> coil, and the relay, close to the battery, switches the heavy cable. The K-Light circuit has a 20 A main fuse and two 10 A circuit fuses."
        },
        {
          "type": "photo",
          "src": "repair-photos/099_electric_starters_2.jpg",
          "caption": "Two starter motors"
        },
        {
          "type": "p",
          "html": "The relay coil circuit runs through a chain of interlocks so the engine cannot start in a dangerous condition. The K-Light test checks for battery voltage at the relay green/yellow wire with the main switch on and the brake lever pulled, and for continuity from the relay black wire to earth with the start button pressed. Practice: <a href=\"../repair/repairs/starter-circuit-test/\">starter circuit test</a>, <a href=\"../repair/repairs/starter-relay-test/\">starter relay test</a>, <a href=\"../repair/repairs/interlock-switch-test/\">interlock switch test</a>."
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
          "html": "The <strong>starter clutch</strong> lets the starter drive the crank and freewheels once the engine overruns it. A roller type wedges spring-loaded rollers in tapered pockets; a sprag type uses figure-of-eight sprags. A slipping clutch lets the starter spin and whine without turning the engine, the commonest starter fault; a seized one drives the starter at engine speed and destroys it. K-Light starter brushes: 12.5 mm new, service limit <strong>8.5 mm</strong>. Practice: <a href=\"../repair/repairs/starter-clutch-check/\">starter clutch check</a>, <a href=\"../repair/repairs/starter-motor-service/\">starter motor service</a>."
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
          "text": "Kickstarter"
        },
        {
          "type": "p",
          "html": "The kickstarter survives on many small machines, the K-Light 125 included, as a backup. The pedal turns a pinion through a ratchet that engages only on the downstroke; a return spring pulls the pedal back and a ramp disengages the ratchet so it does not grind when the engine runs. Most kickstart faults come from assembling the ratchet with its alignment mark out of register with the return spring hole; worn ratchet teeth make the lever slip under load. Practice: <a href=\"../repair/repairs/kickstart-check/\">kickstart check</a>."
        },
        {
          "type": "h3",
          "text": "Battery, charging and starting faults"
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
              "Battery flat after standing",
              "Parasitic drain, sulphated battery",
              "Rested voltage; drain test (K-Light limit 1 mA)"
            ],
            [
              "Battery flat after riding",
              "Low charging output, shorted stator, regulator",
              "Charging voltage at 5000 rpm; stator pairs and earth"
            ],
            [
              "Bulbs blow, battery boils",
              "Regulator not limiting, poor regulator earth",
              "Charging voltage; regulator earth drop"
            ],
            [
              "Starts in neutral, not in gear with clutch pulled",
              "Clutch switch, its wiring or diode; side stand down",
              "Switch continuity; diode test"
            ],
            [
              "Starter spins and whines, engine still",
              "Slipping starter clutch",
              "Starter clutch freewheel and lock test"
            ]
          ]
        },
        {
          "type": "eq",
          "id": "m3-terminal-voltage",
          "name": "Battery terminal voltage under load",
          "tex": "V_t = E - I\\,r_i",
          "where": [
            [
              "V_t",
              "voltage at the battery terminals",
              "V"
            ],
            [
              "E",
              "open-circuit voltage (EMF)",
              "V"
            ],
            [
              "I",
              "load current",
              "A"
            ],
            [
              "r_i",
              "internal resistance",
              "Ω"
            ]
          ],
          "why": "A worn or sulphated battery has a high internal resistance that a resting-voltage test cannot see; only a load or cranking test reveals it.",
          "example": "Internal resistance from two readings: \\(r_i = (12.60 - 12.44) / 7.8 \\approx 0.02\\ \\Omega\\)."
        },
        {
          "type": "check",
          "q": "m3-37"
        },
        {
          "type": "check",
          "q": "m3-38"
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
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Ah capacity says how long a battery runs the loads; CCA says whether it cranks a cold engine.<br>Read state of charge from rested voltage only: the K-Light battery is full at 13.1 V and needs charging at 12.3 V.<br>Charge lead-acid at no more than a tenth of its capacity (0.6 A for 6 Ah); never charge LiFePO4 below 0 &deg;C or above 14.6 V.<br>A shunt regulator always runs the stator at full current, so stators and regulators fail from heat; a series regulator runs cooler.<br>The K-Light charges at 14.5 \\(\\pm\\) 0.5 V at 5000 rpm; check with a charged battery.<br>The start button switches only the relay coil, through neutral, clutch, side-stand and brake interlocks."
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
              "note": "Test the stator and regulator rectifier with a multimeter to tell charging faults from a weak battery; values are bike-specific. Shows the multimeter tests and what a good or bad reading means; values are for that bike."
            },
            {
              "id": "c5JB6HjKiF4",
              "title": "**Solved!** Starter relay problem! Works for most bikes/vehicles!",
              "channel": "MotoCos88",
              "channel_url": "http://www.youtube.com/@MotoCos88",
              "duration": "7:32",
              "role": "How-to",
              "note": "Test and replace a starter relay; check the battery and earth first, the 'most bikes' claim needs checking."
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
          "html": "The spark must ionise the gas between the electrodes and deliver enough energy to start a self-sustaining flame kernel. The <strong>breakdown voltage</strong> rises with a wider gap, with gas density at the moment of firing (so with compression ratio and load), with worn rounded electrodes and with lean mixture, and falls with temperature."
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
          "type": "p",
          "html": "The difference between what the coil can deliver and what the plug needs is the <strong>ignition reserve</strong>. The K-Light coil gives 25&ndash;35 kV from a 9&ndash;14 V supply, comfortably above the requirement of its 0.7 mm gap; as the plug wears the requirement climbs until, under full load, the reserve runs out and the engine misfires."
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
          "html": "The coil is a step-up transformer: a <strong>primary</strong> of a few hundred thick turns and a <strong>secondary</strong> of <strong>15 000&ndash;25 000</strong> fine turns on one laminated iron core. Current in the primary stores energy in the magnetic field. When that current is interrupted, the collapsing field induces an <strong>inductive kick</strong> of 200&ndash;400 V in the primary, and the turns ratio of about 100:1 multiplies it to <strong>20&ndash;40 kV</strong>."
        },
        {
          "type": "eq",
          "id": "m3-turns-ratio",
          "name": "Coil secondary voltage from the turns ratio",
          "tex": "V_s \\approx V_p\\,\\frac{N_s}{N_p}",
          "where": [
            [
              "V_s",
              "secondary (spark plug) voltage available",
              "V"
            ],
            [
              "V_p",
              "primary voltage at the inductive kick",
              "V"
            ],
            [
              "N_s",
              "secondary turns",
              ""
            ],
            [
              "N_p",
              "primary turns",
              ""
            ]
          ],
          "why": "It explains how a 12 V system makes tens of kilovolts, and why a coil with shorted secondary turns gives a weak spark although its primary tests good.",
          "example": "A \\(300\\ \\mathrm{V}\\) kick with 20 000 and 200 turns: \\(V_s \\approx 300 \\times 20\\,000 / 200 = 30\\ \\mathrm{kV}\\)."
        },
        {
          "type": "eq",
          "id": "m3-coil-energy",
          "name": "Energy stored in an ignition coil",
          "tex": "E = \\tfrac{1}{2}\\,L\\,I^2",
          "where": [
            [
              "E",
              "energy stored in the magnetic field",
              "J"
            ],
            [
              "L",
              "primary inductance",
              "H"
            ],
            [
              "I",
              "primary current at the moment it is interrupted",
              "A"
            ]
          ],
          "why": "Spark energy depends on the square of the current at the firing point, so low battery voltage or too short a dwell weakens the spark sharply.",
          "example": "\\(L = 4\\ \\mathrm{mH}\\) at \\(3\\ \\mathrm{A}\\): \\(E = \\tfrac{1}{2} \\times 0.004 \\times 3^2 = 0.018\\ \\mathrm{J} = 18\\ \\mathrm{mJ}\\)."
        },
        {
          "type": "p",
          "html": "The voltage rises only until the plug gap breaks down, then falls to a burn voltage of about 1&ndash;2 kV while the remaining energy discharges across the arc for 1&ndash;2 ms. The coil therefore never reaches its full output unless the gap is very wide or the HT circuit is open, which is why an open lead stresses the coil insulation."
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
          "type": "eq",
          "id": "m3-ohms-law",
          "name": "Ohm's law",
          "tex": "V = I\\,R",
          "where": [
            [
              "V",
              "voltage across the component or section",
              "V"
            ],
            [
              "I",
              "current through it",
              "A"
            ],
            [
              "R",
              "resistance",
              "Ω"
            ]
          ],
          "why": "The basis of every electrical check on a motorcycle: it gives coil and lamp currents from resistance, and turns a small resistance at high current into the voltage drop that a meter can find.",
          "example": "The K-Light coil primary is \\(4\\ \\Omega\\), so at 12 V it draws \\(I = V/R = 12/4 = 3\\ \\mathrm{A}\\); at 14 V, \\(3.5\\ \\mathrm{A}\\)."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Primary current",
              "html": "12 V across the K-Light \\(4\\ \\Omega\\) primary: \\(I = V/R = 3\\ \\mathrm{A}\\)."
            },
            {
              "title": "Stored energy",
              "html": "With \\(L = 4\\ \\mathrm{mH}\\): \\(E = \\tfrac{1}{2} \\times 0.004 \\times 3^2 = 18\\ \\mathrm{mJ}\\)."
            },
            {
              "title": "Secondary voltage",
              "html": "\\(300\\ \\mathrm{V}\\) kick \\(\\times\\ 20\\,000 / 200\\) turns \\(= 30\\ \\mathrm{kV}\\)."
            }
          ]
        },
        {
          "type": "p",
          "html": "K-Light coil values: primary <strong>4 &Omega;</strong> &plusmn; 10&ndash;15 %, secondary <strong>18.6 k&Omega;</strong> &plusmn; 15 % through the plug cap and <strong>13.6 k&Omega;</strong> without, so the suppressor cap is about 5 k&Omega;. A reading of 40 k&Omega; through the cap means a cap of about 26 k&Omega; (or a partly open secondary): measure the cap alone and replace it. Practice: <a href=\"../repair/repairs/ignition-coil-test/\">ignition coil test</a>, <a href=\"../repair/repairs/spark-test/\">spark test</a>."
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
          "type": "h3",
          "text": "Contact-breaker ignition"
        },
        {
          "type": "p",
          "html": "Until the late 1970s most motorcycles switched the coil primary with <strong>points</strong> opened by a cam. A <strong>condenser</strong> across them absorbs the inductive kick long enough for the contacts to separate without arcing. The point gap sets the <strong>dwell</strong>, the crank angle for which the points are closed and the field builds; a wider gap means the rubbing block meets the cam ramp earlier, so the points open earlier (more advance) and close later (less dwell)."
        },
        {
          "type": "p",
          "html": "Because gap and timing are linked, always gap first and time second: statically with a test lamp or buzzer at the F mark , then dynamically with a timing light. Points need service every few thousand kilometres, the rubbing block wears, and at high rpm the dwell becomes too short for the coil to saturate, which is why electronic switching replaced them. <strong>Energy-transfer</strong> magnetos on older off-road machines feed the ignition coil directly from a flywheel generator coil, without a battery."
        },
        {
          "type": "h3",
          "text": "Capacitor discharge and transistor ignition"
        },
        {
          "type": "p",
          "html": "In a CDI a capacitor (typically 0.5&ndash;2 \\(\\mu\\)F) is charged to 200&ndash;400 V and dumped into the coil primary through a thyristor (SCR) when the trigger pulse arrives. The coil then acts as a pulse transformer rather than an energy store, so CDI coils have a very low primary resistance (0.1&ndash;1 &Omega;). Secondary voltage rises in a few microseconds, ten times faster than an inductive system, so the spark fires before energy leaks across an oily insulator: that is why <strong>two-strokes favour CDI</strong>. The price is a short spark of 0.1&ndash;0.3 ms."
        },
        {
          "type": "p",
          "html": "CDI timing comes from a <strong>pulser coil</strong> facing a raised tab on the flywheel. Early units took their advance from the shape of the pulser waveform; later digital CDI units hold a stored advance curve in a microcontroller."
        },
        {
          "type": "p",
          "html": "A <strong>TCI</strong> keeps the inductive coil but switches it with a power transistor (usually an IGBT). The unit calculates dwell so the coil reaches target current just before the firing point and limits the current to protect the coil. On an injected engine the ECU drives the coil itself: the K-Light ignition is electronic automatic advance held in the ECU and needs no adjustment, and the primary driver is monitored (codes P2300 and P2301)."
        },
        {
          "type": "p",
          "html": "The ECU reads crank position from the CKP sensor, load from MAP and TPS, and temperature, and looks advance up in a three-dimensional <strong>ignition map</strong>. It retards for cold starts, trims advance quickly to hold idle speed, and retards for knock protection, quickshifter gear changes and traction-control intervention. Multi-cylinder engines use a <strong>wasted-spark</strong> coil per pair of cylinders (one on compression, its partner on exhaust) or a <strong>stick coil</strong> on each plug, which removes HT leads altogether."
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
          "type": "p",
          "html": "Practice: <a href=\"../repair/repairs/pickup-test/\">pick-up coil test</a>, <a href=\"../repair/repairs/cdi-ecu-diagnosis/\">CDI and ECU diagnosis</a>."
        },
        {
          "type": "h3",
          "text": "Timing and advance"
        },
        {
          "type": "p",
          "html": "The flame takes a roughly constant 1&ndash;3 ms to burn the charge, depending on mixture and turbulence, and peak pressure should arrive about 10&ndash;15&deg; after TDC for maximum work. As rpm rises, the same burn time spans more crank angle, so the spark must start earlier."
        },
        {
          "type": "eq",
          "id": "m3-crank-angle-time",
          "name": "Time for a crank angle",
          "tex": "t = \\frac{\\theta}{6\\,n}",
          "where": [
            [
              "t",
              "time taken to turn through the angle",
              "s"
            ],
            [
              "\\theta",
              "crank angle",
              "degrees"
            ],
            [
              "n",
              "engine speed (1 r/min is 6 degrees per second)",
              "r/min"
            ]
          ],
          "why": "It converts ignition advance, cam timing or injection windows from degrees into the milliseconds the flame, the valves or the injector actually have.",
          "example": "At 9000 rpm, 30 degrees before TDC is \\(t = 30 / (6 \\times 9000) = 0.56\\ \\mathrm{ms}\\); at 8000 rpm, 32 degrees is \\(0.67\\ \\mathrm{ms}\\)."
        },
        {
          "type": "p",
          "html": "Typical advance runs from 5&ndash;15&deg; BTDC at idle to 30&ndash;40&deg; at mid and high rpm part load, with <em>less</em> at full load because the dense charge burns faster and is closer to detonation. Too much advance: pinking, hot head, holed pistons. Too little: lost power, hot exhaust valve and header."
        },
        {
          "type": "p",
          "html": "The K-Light fault trees call for a timing-light check when the engine overheats or lacks power. On an ECU system there is no adjustment, so a wrong reading points to a loose flywheel, a sheared key or a loose trigger. Practice: <a href=\"../repair/repairs/ignition-timing-check/\">ignition timing check</a>."
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
          "html": "A plug is a steel <strong>shell</strong> with thread and sealing seat, an alumina ceramic <strong>insulator</strong>, a <strong>centre electrode</strong> (nickel alloy, often copper-cored, or fine-wire platinum or iridium) and an <strong>earth electrode</strong> welded to the shell. The <strong>heat range</strong> describes how fast the insulator nose passes heat to the shell and head: the tip must run between about <strong>450 &deg;C</strong> (below: carbon fouling) and <strong>850 &deg;C</strong> (above: glowing tip and pre-ignition)."
        },
        {
          "type": "p",
          "html": "A hot plug has a long nose for low-load commuting; a cold plug has a short nose for sustained high load. In the NGK scheme <strong>higher number = colder</strong>; Bosch and Champion number the other way, so always use a published cross-reference rather than matching digits. A city bike that fouls plugs needs a hotter plug (a 6 rather than a 7), after first checking for an over-rich mixture. <strong>Reach</strong> is the thread length: too long and the plug can strike the piston or valves, too short and carbon fills the exposed head threads."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "K-Light plug",
              "v": "D7RTC",
              "p": "D = \\(\\mathrm{M12} \\times 1.25\\) thread, 7 = heat rating, R = resistor, C = copper core"
            },
            {
              "l": "Gap",
              "v": "0.7 &plusmn; 0.1 mm",
              "p": "set with a wire gauge, never a flat feeler"
            }
          ]
        },
        {
          "type": "p",
          "html": "D7RTC is a Torch designation following the NGK scheme and is generally cross-referenced to the NGK DR7EA. Replace the plug if the electrodes are eroded or corroded, the insulator is cracked, or it is carbon-fouled. Practice: <a href=\"../repair/repairs/spark-plug-service/\">spark plug service</a>, <a href=\"../repair/repairs/spark-plug-reading/\">reading a spark plug</a>."
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
          "type": "h3",
          "text": "Resistor plugs and caps"
        },
        {
          "type": "p",
          "html": "The spark is a fast current pulse that radiates broadband radio interference and can corrupt ECU and instrument signals. A resistor plug, a suppressor cap (about 5 k&Omega;) or a resistive HT lead limits the peak current and damps the oscillation. A cracked or damp cap tracks the spark to earth and gives a misfire in wet weather."
        },
        {
          "type": "p",
          "html": "Fitting a non-resistor plug and a non-resistor cap to an ECU-controlled engine can cause erratic running or ECU resets; fitting both a resistor plug and a resistor cap where the designer intended one adds resistance and weakens the spark slightly."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "High voltage",
          "html": "Ignition systems produce up to 35 kV. Use an insulated spark tester, never hold a lead or plug in bare hands, and never crank a CDI or ECU engine with the HT lead disconnected and unearthed: the unrestrained voltage can break down the coil or damage the ECU."
        },
        {
          "type": "h3",
          "text": "Ignition fault diagnosis"
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
              "No spark",
              "Flat battery, connector, stop switch, side-stand or neutral logic, coil, pulser or ECU",
              "Battery; switch continuity; coil and pulser resistance; peak voltages"
            ],
            [
              "Weak spark at the plug, good at the lead",
              "Fouled plug or failed cap",
              "Spark test at the lead with the cap off; cap resistance"
            ],
            [
              "Misfire under load only",
              "Worn plug, tracked cap or coil, gap too large",
              "Plug gap; look for tracking on the coil in darkness"
            ],
            [
              "Misfire in wet weather",
              "Cracked cap, moisture in the coil connector",
              "Fine water mist over the HT parts with the engine running"
            ],
            [
              "Backfire when starting",
              "Loose coil earth, loose trigger or flywheel",
              "Coil mounting; flywheel nut 50&ndash;60 N&middot;m on the K-Light"
            ],
            [
              "Overheating, detonation",
              "Over-advanced timing, wrong plug grade",
              "Timing light; plug designation"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m3-35"
        },
        {
          "type": "check",
          "q": "m3-36"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "A plug needs 5&ndash;25 kV, rising with gap, load and wear; the coil must keep a reserve above that.<br>The coil stores \\(E = \\tfrac{1}{2} L I^2\\) and multiplies the primary kick by its turns ratio, about 100:1.<br>CDI rises fast and resists fouling but gives a short spark; inductive systems give a longer spark that suits four-stroke part load.<br>Advance rises with rpm because burn time is roughly fixed: \\(t = \\theta / (6n)\\).<br>Higher NGK numbers are colder plugs; read the insulator colour to judge mixture and heat range.<br>An ECU ignition has no adjustment: a wrong timing reading means a mechanical fault at the flywheel or trigger."
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
          "html": "A filament bulb heats a tungsten coil to around 2500&ndash;3000 K, and only about 2&ndash;3 % of its power appears as visible light. A <strong>halogen</strong> bulb fills the glass with a halogen gas that redeposits evaporated tungsten on the filament, allowing a hotter, whiter filament and longer life. Never touch the quartz, because skin oil makes hot spots; the K-Light manual advises wiping a contaminated bulb with alcohol."
        },
        {
          "type": "p",
          "html": "An H4 (the K-Light headlight) has two filaments, typically 60 W main and 55 W dipped, with a shield under the dipped filament that cuts off the upper half of the beam. An <strong>LED</strong> gives 80&ndash;150 lm/W and lasts tens of thousands of hours, but its output falls as junction temperature rises, so LED lamps carry heat sinks and a constant-current driver. LEDs are polarity-sensitive and draw far less current than the bulbs they replace, which upsets flashers and bulb-failure warnings."
        },
        {
          "type": "eq",
          "id": "m3-electric-power",
          "name": "Electrical power",
          "tex": "P = V\\,I",
          "where": [
            [
              "P",
              "power taken by the load",
              "W"
            ],
            [
              "V",
              "voltage across it",
              "V"
            ],
            [
              "I",
              "current through it",
              "A"
            ]
          ],
          "why": "Rearranged as \\(I = P/V\\), it gives the current any lamp or accessory draws from its wattage, the first step in choosing wire, fuse and relay.",
          "example": "An H4 main beam at 13.5 V: \\(I = 60 / 13.5 \\approx 4.4\\ \\mathrm{A}\\)."
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
          "type": "eq",
          "id": "m3-power-resistance",
          "name": "Power in a resistance",
          "tex": "P = I^2 R = \\frac{V^2}{R}",
          "where": [
            [
              "P",
              "power turned into heat (or light)",
              "W"
            ],
            [
              "I",
              "current",
              "A"
            ],
            [
              "R",
              "resistance",
              "Ω"
            ],
            [
              "V",
              "voltage across the resistance",
              "V"
            ]
          ],
          "why": "It shows how a corroded connector heats up and dims a lamp, and gives the value of a load resistor that mimics a bulb.",
          "example": "4.4 A through a \\(0.15\\ \\Omega\\) connector: \\(P = 4.4^2 \\times 0.15 \\approx 2.9\\ \\mathrm{W}\\) of heat, and a drop of \\(0.67\\ \\mathrm{V}\\)."
        },
        {
          "type": "p",
          "html": "The <strong>dipped beam</strong> must have a sharp horizontal cut-off (with a step on the near side in UNECE patterns); the <strong>main beam</strong> is a concentrated hot spot along the road axis. LED retrofits in a halogen reflector cannot put their emitters exactly where the filament was, so light scatters above the cut-off and dazzles: they are generally not type-approved."
        },
        {
          "type": "p",
          "html": "Beam height is set against a wall chart at the manufacturer's distance with the rider seated. K-Light lamps: front position W3W, plate light W5W; the flasher is a variable-frequency type. Practice: <a href=\"../repair/repairs/bulb-replace/\">bulb replacement</a>, <a href=\"../repair/repairs/headlight-aim/\">headlight aim</a>."
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
          "type": "variants",
          "title": "Headlight types",
          "intro": "From gas lamps to sealed LED units. Repair page: <a href=\"../repair/parts/headlight/\">headlight</a>.",
          "items": [
            {
              "model": "headlight_round",
              "name": "Round halogen, chrome bucket",
              "what": "A 7 in round reflector and glass lens, usually with an H4 halogen bulb holding dipped and main filaments.",
              "good_for": "Cheap, a standard size, and bulbs on sale almost everywhere.",
              "conditions": "General road riding.",
              "watch": "Blown filaments, corroded connectors and aim knocked off. An LED bulb in a halogen reflector scatters light and dazzles."
            },
            {
              "model": "headlight_led",
              "name": "LED unit with DRL",
              "what": "A sealed LED headlight with a daytime running light strip.",
              "good_for": "Bright, low power, long life, instant on.",
              "conditions": "Night riding and all weather.",
              "watch": "Usually not repairable: a failed LED means a new unit. Moisture inside the lens and a poor earth."
            },
            {
              "model": "bike_cruiser__headlight",
              "name": "Round LED, cruiser",
              "what": "A traditional round bucket with an LED face, on the modern cruiser.",
              "good_for": "A classic look with modern light output and low power draw.",
              "conditions": "Road riding at night and in all weather.",
              "watch": "As for any LED unit: water ingress and connector corrosion. Aim it after any change to suspension or load."
            },
            {
              "model": "headlight_mx",
              "name": "Motocross number-plate light",
              "what": "A small lamp set into the front number-plate shroud.",
              "good_for": "Light and tough; enough for trail riding and short road sections.",
              "conditions": "Off-road and short road links.",
              "watch": "A weak beam, not meant for fast night riding. Vibration breaks bulbs and loosens connectors."
            },
            {
              "model": "bike_vintage_vtwin__headlight",
              "name": "Acetylene lamp, vintage",
              "what": "Water drips onto calcium carbide in a separate generator, and the acetylene gas is piped to a burner in the lamp.",
              "good_for": "A bright flame in the years before reliable dynamos and batteries.",
              "conditions": "Display and period events.",
              "watch": "Acetylene is flammable: carbide is stored dry and the lamp is never lit near a fuel leak. The burner jet needs cleaning."
            },
            {
              "model": "bike_pioneer__headlight",
              "name": "Carbide lamp, about 1901",
              "what": "A compact brass lamp with the gas generator built into its body.",
              "good_for": "Light with no wiring at all.",
              "conditions": "Slow running at dusk; display.",
              "watch": "Dim by modern standards. The same carbide and flame care as the acetylene lamp."
            }
          ]
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
          "html": "UNECE rules require 90 &plusmn; 30 flashes per minute. A <strong>thermal flasher</strong>'s bimetal strip is heated by the lamp current and only reaches its switching temperature at the designed load, so when one bulb fails the current halves and the rate changes: a built-in failure warning. An <strong>electronic flasher</strong> uses a timer and a relay or MOSFET, and standard types also sense current and hyper-flash when the load falls."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Bulb load per side",
              "html": "\\(I = 2 \\times 10\\ \\mathrm{W} / 12\\ \\mathrm{V} \\approx 1.67\\ \\mathrm{A}\\)"
            },
            {
              "title": "LED load per side",
              "html": "\\(I = 2 \\times 1.5\\ \\mathrm{W} / 12\\ \\mathrm{V} = 0.25\\ \\mathrm{A}\\), far below the design value"
            },
            {
              "title": "Load resistor per bulb",
              "html": "\\(R = V^2 / P = 144 / 10 = 14.4\\ \\Omega\\), dissipating 10 W; or one \\(7.2\\ \\Omega\\), 20 W resistor per side"
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
          "type": "p",
          "html": "The <strong>horn</strong> is usually an electromagnetic diaphragm type with self-interrupting contacts; the K-Light manual tests it by connecting it straight to the battery. On many bikes the horn button switches the earth side, so bridging the button terminal to earth tells a button fault from a horn or supply fault. Practice: <a href=\"../repair/repairs/flasher-test/\">flasher test</a>, <a href=\"../repair/repairs/led-indicator-fit/\">fitting LED indicators</a>, <a href=\"../repair/repairs/horn-test/\">horn test</a>."
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
          "type": "p",
          "html": "Handlebar switches have sliding or rocker contacts that oxidise and wear, giving intermittent faults. Manuals give a <strong>continuity table</strong> for each switch showing which wire colours connect in each position (the K-Light ignition switch joins red to red/white at ON), so test continuity with the switch operated through every position. Practice: <a href=\"../repair/repairs/switch-clean/\">switch cleaning</a>, <a href=\"../repair/repairs/ignition-switch-test/\">ignition switch test</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/086_do_have_one_right.jpg",
          "caption": "Connector block on a bike wiring harness"
        },
        {
          "type": "p",
          "html": "<strong>A fuse protects the wiring, not the load.</strong> Rate it below the capacity of the smallest wire it protects and above the circuit's normal maximum current. Blade fuses (ATO or mini) of 10 A and 20 A are typical; the K-Light has a 20 A main fuse and two 10 A branch fuses. A fuse that blows repeatedly means a short downstream, never a reason to fit a bigger one, and a fuse corroded in its holder gives high resistance and heat."
        },
        {
          "type": "figure",
          "fig": "ohms-law",
          "caption": "Pick a load in watts and the supply voltage to see the current, then the fuse rating that protects its wire."
        },
        {
          "type": "p",
          "html": "Water and vibration cause most connector faults: fretting corrosion on tinned terminals, pins backed out by careless probing, chafing at the steering head. Sealed multi-pin housings have locking claws that must be released before separation. <strong>Dielectric grease</strong> on the seals slows corrosion but never replaces clean contact. Repairs use crimped terminals of the correct type and, for splices, a soldered and heat-shrunk joint staggered from its neighbours. Practice: <a href=\"../repair/repairs/connector-clean/\">connector cleaning</a>, <a href=\"../repair/repairs/fuse-relay-check/\">fuse and relay check</a>."
        },
        {
          "type": "eq",
          "id": "m3-wire-resistance",
          "name": "Resistance of a wire",
          "tex": "R = \\frac{\\rho\\,L}{A}",
          "where": [
            [
              "R",
              "resistance of the conductor",
              "Ω"
            ],
            [
              "\\rho",
              "resistivity (copper about 1.68 × 10⁻⁸ Ω·m)",
              "Ω·m"
            ],
            [
              "L",
              "length of the conductor",
              "m"
            ],
            [
              "A",
              "cross-sectional area",
              "m²"
            ]
          ],
          "why": "It explains why long thin feeds lose voltage under load and why heavy loads such as the starter or accessory lights need thicker cable.",
          "example": "3 m of 0.5 mm² copper: \\(R = 1.68 \\times 10^{-8} \\times 3 / (0.5 \\times 10^{-6}) \\approx 0.10\\ \\Omega\\), so 4.6 A loses about 0.46 V."
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
          "text": "Earth paths and wire colours"
        },
        {
          "type": "p",
          "html": "Most motorcycles use a <strong>single-wire earth-return</strong> system: battery negative connects to frame and engine, and each load returns current through the metal structure or a dedicated black earth wire to a common earth point. Electronic parts get dedicated earth wires because painted, plastic or rubber-mounted parts give an unreliable frame return, and a few tenths of a volt of earth offset corrupt sensor signals referenced to that earth. Practice: <a href=\"../repair/repairs/earth-clean/\">earth cleaning</a>."
        },
        {
          "type": "p",
          "html": "Wire colours follow the maker's code, with a stripe colour after a slash. The K-Light diagram uses B black, BL blue, LBL light blue, N brown, G green, O orange, Y yellow, R red, LR pink, W white, P purple, Gr grey and DG dark green; G/Y and O/R appear in the starter relay circuit. Japanese makers use similar abbreviations but not identical meanings."
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
          "type": "p",
          "html": "On the K-Light diagram the 34-pin ECU connector is numbered: pins 1 and 13 serve the ignition coil, pin 2 the fuel pump control, pin 29 the TPS signal, and pins 4, 10, 22 and 24 the stepper motor. Practice: <a href=\"../repair/repairs/lighting-circuit-test/\">lighting circuit test</a>, <a href=\"../repair/repairs/wiring-fault-find/\">wiring fault finding</a>."
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
          "html": "Larger bikes link ECU, dash, ABS, body control, keyless ignition and switch gear over a two-wire twisted-pair <strong>CAN bus</strong> (ISO 11898) at typically 500 kbit/s. At idle (recessive) both wires sit at about 2.5 V; dominant, CAN-H rises to about 3.5 V and CAN-L falls to about 1.5 V, so receivers read the difference and reject common-mode noise. Each end has a 120 \\(\\Omega\\) terminator."
        },
        {
          "type": "eq",
          "id": "m3-parallel-resistance",
          "name": "Two resistances in parallel",
          "tex": "R_{p} = \\frac{R_1\\,R_2}{R_1 + R_2}",
          "where": [
            [
              "R_p",
              "combined resistance",
              "Ω"
            ],
            [
              "R_1,\\ R_2",
              "the two resistances",
              "Ω"
            ]
          ],
          "why": "Parallel paths always read lower than either one alone: it explains the 60 Ω reading of a healthy CAN bus and why an ohm reading across a part still in circuit misleads.",
          "example": "Two \\(120\\ \\Omega\\) CAN terminators: \\(R_p = 120 \\times 120 / 240 = 60\\ \\Omega\\). One open terminator leaves \\(120\\ \\Omega\\)."
        },
        {
          "type": "p",
          "html": "With the battery disconnected CAN-H to CAN-L should read about <strong>60 \\(\\Omega\\)</strong>; 120 \\(\\Omega\\) means one terminator or branch is open, near 0 \\(\\Omega\\) means the wires are shorted. A single faulty module can hold the bus dominant and make every unit report communication faults, so unplug modules one at a time to isolate it. Electric motorcycles use CAN between battery management system, motor controller and vehicle control unit (module 5)."
        },
        {
          "type": "h3",
          "text": "Accessory power"
        },
        {
          "type": "p",
          "html": "Heated grips, navigation, USB chargers and auxiliary lamps add load to an alternator that may have only 50&ndash;100 W of surplus on a small machine. Two 35 W auxiliary lamps draw \\(I = 70/12 \\approx 5.8\\ \\mathrm{A}\\), likely more than that: measure charging voltage with all loads on at cruising rpm, and consider LED lamps of lower power. Feed accessories through their own fuse and an ignition-switched relay, never by tapping CAN or sensor wires, and on CAN machines use the manufacturer accessory connector, because some ECUs flag unexpected loads as faults. Practice: <a href=\"../repair/repairs/accessory-wiring/\">accessory wiring</a>."
        },
        {
          "type": "plate",
          "id": "EL02",
          "caption": "Where the electrical components sit on a road motorcycle."
        },
        {
          "type": "check",
          "q": "m3-39"
        },
        {
          "type": "check",
          "q": "m3-40"
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
          "type": "eq",
          "id": "m3-led-resistor",
          "name": "LED series resistor",
          "tex": "R = \\frac{V_s - V_f}{I_{LED}}",
          "where": [
            [
              "R",
              "series resistor",
              "Ω"
            ],
            [
              "V_s",
              "supply voltage",
              "V"
            ],
            [
              "V_f",
              "LED forward voltage (about 2 V for red)",
              "V"
            ],
            [
              "I_{LED}",
              "chosen LED current",
              "A"
            ]
          ],
          "why": "An LED has an almost fixed forward voltage, so without a resistor nothing limits its current; the resistor sets it for warning lamps and home-made indicators.",
          "example": "At 12.6 V and 18 mA: \\(R = (12.6 - 2.0) / 0.018 \\approx 590\\ \\Omega\\); the nearest standard value is 560 Ω."
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
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Current follows from \\(I = P/V\\): an H4 main beam takes about 4.4 A at 13.5 V.<br>LED indicators draw too little current for a standard flasher; fit a load-independent electronic flasher rather than hot load resistors.<br>A fuse protects the wire: rate it below the capacity of the smallest wire and above the normal load.<br>Electronic parts need dedicated earths; a few tenths of a volt of offset corrupts sensor signals.<br>Read a wiring diagram from the load back to the battery, list circuits sharing a fuse, and test at mid-circuit.<br>A healthy CAN bus reads about 60 \\(\\Omega\\) between CAN-H and CAN-L with the battery off."
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
          "html": "A digital multimeter with <strong>10 M\\(\\Omega\\)</strong> input impedance loads a circuit so lightly that it is safe on ECU sensor lines; an old analogue meter or a test lamp can draw enough current to disturb a 5 V reference. A test lamp still confirms quickly that voltage is present, but not how much, and it stays off ECU circuits."
        },
        {
          "type": "p",
          "html": "Two more tools complete the kit. A <strong>clamp meter</strong> measures starter and charging current without breaking the circuit. A <strong>peak-voltage adapter</strong> reads pulser, exciter and coil primary pulses, which last too short a time for a normal meter to register. Back-probe connectors beside the wire seal or with a purpose-made pin, never by piercing insulation, which admits water and starts corrosion inside the wire."
        },
        {
          "type": "p",
          "html": "Resistance readings need care at both ends of the scale. Probe and lead resistance of 0.1&ndash;0.3 \\(\\Omega\\) is a large share of a 0.8 \\(\\Omega\\) stator reading, so short the probes and use REL first. Any parallel path in the circuit lowers the reading, so disconnect the part being measured."
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
          "type": "p",
          "html": "Each fault leaves a signature: an open circuit shows the full supply voltage across the break because no current flows to drop it elsewhere, while a high resistance shows only part of the voltage, and only while current flows. A short to earth is found with the load disconnected and an ohm meter, or with a test lamp in place of the blown fuse. Practice: <a href=\"../repair/repairs/short-circuit-find/\">finding a short circuit</a>, <a href=\"../repair/repairs/wiring-fault-find/\">wiring fault finding</a>."
        },
        {
          "type": "h3",
          "text": "Voltage-drop testing"
        },
        {
          "type": "p",
          "html": "Measure across one section of a circuit <em>while full current flows</em>. By Ohm's law \\(V = I\\,R\\), so at 100 A of starter current even <strong>0.002 \\(\\Omega\\)</strong> drops 0.2 V, while at 3 A of coil current the same 0.2 V would need about 0.067 \\(\\Omega\\). This finds the high resistance a resistance test misses."
        },
        {
          "type": "p",
          "html": "Put the meter's positive probe on the end nearer battery positive and the negative probe on the end nearer the load (on the earth side, the end nearer the load and then battery negative), so a reading of a few tenths of a volt directly shows the voltage lost in that section. Practice: <a href=\"../repair/repairs/voltage-drop-test/\">voltage drop test</a>."
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
          "type": "p",
          "html": "Worked case: a brake-light circuit draws 1.75 A and loses 0.7 V between battery positive and the lamp terminal. The fault resistance is \\(R = 0.7 / 1.75 = 0.4\\ \\Omega\\), wasting \\(P = 0.7 \\times 1.75 \\approx 1.2\\ \\mathrm{W}\\) as heat, far beyond the 0.2 V limit. While cranking, 0.9 V on the starter positive side with only 0.15 V across the relay puts the remaining 0.75 V in the cables, fuse holder or terminals: move the probes section by section to find it."
        },
        {
          "type": "wiring",
          "tab": "starting",
          "caption": "Fault-finding exercise: trigger the poor starter-earth fault and hold START. The starter clicks or turns slowly although the battery is charged; locate the volts lost on the earth side as you would with a meter in job sheet 4.6.4.",
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
          "html": "With the ignition off, the ECU memory, clock, immobiliser or alarm draw current permanently; the K-Light allows <strong>no more than 1 mA</strong>. Disconnect battery negative and put the ammeter in series between the terminal and the lead, start on 10 A to survive any wake-up surge, and step down to mA once the reading settles; modern ECUs can take several minutes to sleep. Then pull fuses one at a time until the drain drops, which identifies the circuit. A stuck brake-light switch, the first check in the K-Light tree, is a frequent cause."
        },
        {
          "type": "eq",
          "id": "m3-drain-time",
          "name": "Time for a drain to discharge a battery",
          "tex": "t = \\frac{C}{I}",
          "where": [
            [
              "t",
              "time to discharge",
              "h"
            ],
            [
              "C",
              "charge available (full capacity, or the part used before the battery is too flat to start)",
              "Ah"
            ],
            [
              "I",
              "drain current",
              "A"
            ]
          ],
          "why": "It sets the limit for standing losses and explains why a few tens of milliamps of drain flattens a small motorcycle battery in about a week.",
          "example": "To 50 % of a 6 Ah battery with an 18 mA drain: \\(t = 3 / 0.018 \\approx 167\\ \\mathrm{h}\\), about 7 days. At the 1 mA limit, full discharge takes \\(6 / 0.001 = 6000\\ \\mathrm{h}\\), yet the battery falls below 50 % in about four months, hence charging every three months."
        },
        {
          "type": "p",
          "html": "Practice: <a href=\"../repair/repairs/parasitic-drain-test/\">parasitic drain test</a>."
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
          "type": "h3",
          "text": "Job sheet: charging system output"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Charged battery",
              "html": "Confirm the battery is fully charged; a flat battery pulls the voltage down and hides a regulator fault."
            },
            {
              "title": "Regulated voltage",
              "html": "Engine warm, DMM on DC volts across the battery, raise speed slowly to 5000 rpm: the voltage should rise to 14.0&ndash;15.0 V and stop. With the headlight on main it may fall slightly but should stay above 13.5 V."
            },
            {
              "title": "Interpret",
              "html": "Stuck at battery voltage: no charge (stator, regulator or wiring). Above 15.0 V: regulator not limiting, or a poor regulator earth or sense wire."
            },
            {
              "title": "Regulator wiring",
              "html": "Regulator unplugged: battery voltage on the red wire, continuity from the black wire to earth."
            },
            {
              "title": "Stator resistance and insulation",
              "html": "0.8 \\(\\pm\\) 0.3 \\(\\Omega\\) between each pair of whites; no continuity from any white to engine earth. A winding shorted to the core often shows darkened varnish."
            },
            {
              "title": "AC output",
              "html": "Stator unplugged, engine at a fixed speed: the three pair readings should agree within about 10 % (typically 50&ndash;80 V AC on a small three-phase stator)."
            },
            {
              "title": "Regulator diodes",
              "html": "Diode test red to each white and each white to black, then reverse: about 0.4&ndash;0.7 V one way, blocking the other. Readings vary between meters, so compare the three phases."
            }
          ]
        },
        {
          "type": "wiring",
          "tab": "charging",
          "caption": "Fault-finding exercise: run the engine at 5000 rpm and compare a healthy shunt regulator with a failed one; decide from the battery voltage whether the fault is undercharging or overcharging, and which test from job sheet 4.6.2 confirms it.",
          "preview": "charging-shunt"
        },
        {
          "type": "h3",
          "text": "Job sheet: starter circuit voltage drop"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Prepare",
              "html": "Charge the battery and disable the engine so it cranks without starting: remove the fuel pump fuse or earth the plug through a spark tester (not the stop switch, which may also cut the relay)."
            },
            {
              "title": "Relay click",
              "html": "No click: relay coil supply on the green/yellow wire with the brake lever pulled, earth through the black wire with the button pressed, then bench-test the relay: 12 V on the coil should click and give 0 &Omega; across the contacts."
            },
            {
              "title": "Cranking voltage",
              "html": "Above about 9.6 V. Lower with a good battery points to heavy mechanical drag or a shorted starter."
            },
            {
              "title": "Positive side",
              "html": "Battery positive post (not the clamp) to starter terminal while cranking: 0.5 V or less; then section by section to locate any excess."
            },
            {
              "title": "Relay contacts",
              "html": "Across the two heavy relay terminals while cranking: 0.2 V or less, otherwise the contacts are burned."
            },
            {
              "title": "Negative side",
              "html": "Battery negative post to starter body: 0.3 V or less, otherwise clean the engine earth strap and terminal."
            },
            {
              "title": "Starter itself",
              "html": "All drops good but cranking slow: brushes (limit 8.5 mm), commutator and springs. Starter spins without the engine: starter clutch."
            }
          ]
        },
        {
          "type": "p",
          "html": "In the ignition job sheet, a trigger that measures 152 &Omega; (in specification) but peaks at only 0.8 V when cranking has an intact winding: the cause is too large an air gap, a damaged reluctor or too low a cranking speed. A coil can pass its resistance tests and still break down under voltage, so substitution with a known good coil is the final test. Practice: <a href=\"../repair/repairs/battery-test-charge/\">battery test</a>, <a href=\"../repair/repairs/charging-system-test/\">charging test</a>, <a href=\"../repair/repairs/ignition-coil-test/\">coil test</a>, <a href=\"../repair/repairs/starter-circuit-test/\">starter circuit test</a>, <a href=\"../repair/repairs/efi-code-read/\">EFI codes</a>."
        },
        {
          "type": "p",
          "html": "For a TPS code, back-probe the sensor with the key on: reference 5 &plusmn; 0.1 V, and a low reference shared by several sensors means another sensor is shorting the 5 V supply. A TPS that reads 5.0 V at every opening sets P0123; the causes are an open sensor earth, the signal shorted to the reference, or a short inside the connector. Record codes and freeze frame before clearing, and road-test until the MIL stays off."
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
              "No spark or weak spark",
              "Carbon-bridged plug, cap, coil, trigger, ECU, ignition switch circuit",
              "Ignition job sheet in order"
            ],
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
            ],
            [
              "Good spark, plug wet",
              "Flooding, leaking injector",
              "Clear-flood crank; injector leak test"
            ],
            [
              "Good spark and fuel, low compression",
              "Tight valve clearance, seat leak, worn rings",
              "Compression test; valve clearance"
            ],
            [
              "Turn signals all out",
              "Flasher failed, supply open",
              "Bridge flasher terminals; supply voltage"
            ],
            [
              "All lights out",
              "Main fuse, flat battery, ignition switch",
              "Fuse; battery voltage; switch continuity table"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m3-30"
        },
        {
          "type": "check",
          "q": "m3-41"
        },
        {
          "type": "check",
          "q": "m3-42"
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
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Measure voltage in parallel with the circuit working, resistance with it dead and disconnected, current in series starting on 10 A.<br>A continuity buzzer proves a path exists, not that it carries current; a voltage-drop test under load does.<br>Limits: 0.2 V per connection, 0.5 V starter positive side, 0.3 V negative side, 0.1 V for electronic earths.<br>The K-Light allows 1 mA of drain; find a larger one by pulling fuses with the ammeter in series.<br>Charge the battery before any charging or starter test, because every reference value assumes it.<br>Work from the job sheet in order, and confirm a repair with a road test and a clear MIL."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "NB5F_Qu4ixE",
              "title": "OH NO! My motorcycle wont start. Now what?",
              "channel": "Srkcycles",
              "channel_url": "http://www.youtube.com/@Srkcycles",
              "duration": "4:34",
              "role": "How it works",
              "note": "Top reasons a modern bike will not start: kill switch, side stand, battery; quick first checks."
            }
          ]
        }
      ]
    }
  ],
  "gkey": "m3b"
};
