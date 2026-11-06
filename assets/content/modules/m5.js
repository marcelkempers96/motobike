/* Moto Zero: Module 5 lessons. Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "electric",
  "num": "5",
  "title": "Electric motorcycles",
  "intro": "How electric two-wheelers turn stored electrochemical energy into traction, and how to inspect, diagnose and service their motors, controllers, batteries and chargers safely.",
  "pdf": "moto-zero-module-5-electric.pdf",
  "chapters": [
    {
      "id": "m5-architecture",
      "title": "Architecture of an electric two-wheeler",
      "lead": "An electric motorcycle has fewer moving parts than a petrol one but more control units. Before you can fix one, you need the map: which category it belongs to, where the energy goes, and what every box between the battery and the tyre does.",
      "lab": "overview/?mode=elec&part=wiring",
      "blocks": [
        {
          "type": "h3",
          "text": "Categories and regulatory limits"
        },
        {
          "type": "p",
          "html": "Electric two-wheelers span more than two orders of magnitude in power, from a <strong>250 W</strong> bicycle hub motor to a <strong>100 kW</strong> sports motorcycle. The category decides whether the machine needs type approval, registration, insurance, a helmet and a licence. In Europe the framework is <strong>Regulation (EU) No 168/2013</strong> (the L categories), with <strong>EN 15194</strong> for pedelecs that sit outside it."
        },
        {
          "type": "table",
          "head": [
            "Category",
            "Examples",
            "Speed limit",
            "Power limit (continuous)"
          ],
          "rows": [
            [
              "Pedelec (EPAC, EN 15194)",
              "City and cargo e-bikes",
              "Assistance cuts off at 25 km/h",
              "250 W"
            ],
            [
              "Speed pedelec (L1e-B)",
              "45 km/h e-bikes",
              "45 km/h design speed",
              "4 kW"
            ],
            [
              "E-moped (L1e-B)",
              "Step-through e-scooters, NIU, Super Soco entry models",
              "45 km/h",
              "4 kW"
            ],
            [
              "E-motorcycle L3e-A1",
              "125-equivalent commuters, Roam Air, taxi machines",
              "Above 45 km/h",
              "11 kW, and at most 0.1 kW/kg"
            ],
            [
              "E-motorcycle L3e-A2 / A3",
              "Zero SR/F, Energica Ego, LiveWire",
              "Above 45 km/h",
              "A2 up to 35 kW; A3 unlimited"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "elec",
          "title": "Continuous, not peak",
          "html": "The limits are <strong>maximum continuous rated power</strong>: what the motor can sustain for <strong>30 minutes</strong> on a bench (UNECE R85 method). Motors and controllers can deliver two to three times that for a few seconds, so an 11 kW L3e-A1 machine may produce 20–25 kW peak and out-accelerate a 125 cc petrol bike."
        },
        {
          "type": "p",
          "html": "The thresholds shape the engineering. A pedelec gets by with a <strong>36 or 48 V</strong> system and a 0.4–0.8 kWh battery. A 45 km/h moped needs 1.5–3 kW and 1.5–3 kWh. An L3e-A1 commuter needs 3–11 kW continuous, 3–7 kWh, and usually <strong>60–96 V</strong>. Full-size motorcycles with 40–100 kW peak motors use <strong>100–400 V</strong> packs of 10–22 kWh."
        },
        {
          "type": "p",
          "html": "Why the high voltage? For the same power, current is inversely proportional to voltage (I = P / V). A 60 kW drive at 48 V would draw about <strong>1,250 A</strong>; at 300 V it needs <strong>200 A</strong>. Since I²R losses grow with the square of current, low voltage means heavy cables, busbars, connectors and switches."
        },
        {
          "type": "figure",
          "fig": "ohms-law",
          "caption": "Pick a load power and a system voltage and watch the current (and the fuse it needs) change. Try 6 kW at 48 V, then at 72 V and 96 V."
        },
        {
          "type": "h3",
          "text": "The energy chain"
        },
        {
          "type": "p",
          "html": "A small air-cooled petrol single reaches perhaps 28–32 % efficiency at its best point, but in town, at part throttle and idle, it averages only <strong>10–20 %</strong> tank-to-wheel. The electric machine skips the heat engine: each conversion loses only a few percent."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Battery (discharge)",
              "html": "about 96 %"
            },
            {
              "title": "Controller (DC to three-phase AC)",
              "html": "about 97 %"
            },
            {
              "title": "Motor (electrical to mechanical)",
              "html": "about 90 % averaged over a real ride; 92–96 % at its best point, 70–85 % at low speed and high torque"
            },
            {
              "title": "Final drive (chain or belt)",
              "html": "about 96 %; a hub motor has no transmission loss"
            },
            {
              "title": "Result",
              "html": "Battery-to-wheel η ≈ 0.96 × 0.97 × 0.90 × 0.96 ≈ <strong>0.80</strong>. Grid-to-battery (charger 0.90 × battery charge 0.97) ≈ <strong>0.87</strong>."
            }
          ]
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Petrol 125, urban",
              "v": "≈ 22 kWh/100 km",
              "p": "2.5 L/100 km × 8.9 kWh/L of fuel energy"
            },
            {
              "l": "At the rear wheel",
              "v": "≈ 2.9 kWh/100 km",
              "p": "22.3 kWh × 13 % tank-to-wheel"
            },
            {
              "l": "Electric, from the grid",
              "v": "≈ 4.1 kWh/100 km",
              "p": "2.9 / 0.80 = 3.6 kWh at the battery, / 0.87 at the socket"
            }
          ]
        },
        {
          "type": "p",
          "html": "So the electric machine needs about <strong>4 kWh</strong> from the grid where the petrol machine burns about <strong>22 kWh</strong> of fuel, a factor of five to six. A Nairobi boda boda covering 120 km a day burns about 3 L of petrol; the electric equivalent needs 4–5 kWh. The catch is storage: petrol holds about <strong>12,000 Wh/kg</strong>, a lithium-ion pack <strong>120–180 Wh/kg</strong>. That is why electric bikes carry less energy and are designed around swapping or fast charging."
        },
        {
          "type": "photo",
          "src": "electric-scrambler-render.jpg",
          "caption": "The course's electric scrambler. The battery pack fills the frame where a petrol engine would sit, with the motor and controller below it driving the rear wheel."
        },
        {
          "type": "check",
          "q": "m5-03"
        },
        {
          "type": "h3",
          "text": "Component map"
        },
        {
          "type": "plate",
          "id": "F25",
          "caption": "The electric powertrain: battery and BMS, contactor and pre-charge, inverter, motor, VCU, DC-DC converter, charger and CAN bus."
        },
        {
          "type": "plate",
          "id": "F03",
          "caption": "Electric motorcycle with the battery pack, mid-drive motor and controller shown inside the frame."
        },
        {
          "type": "table",
          "head": [
            "Component",
            "What it does"
          ],
          "rows": [
            [
              "Battery pack",
              "Cells in series (voltage) and parallel (capacity), holders, busbars, sensors, BMS, main fuse; IP67 enclosure with a vent path. Swap packs are kept to about 10–15 kg."
            ],
            [
              "BMS",
              "Measures every cell group, temperatures and current; estimates SOC and SOH; balances; opens the switches on a fault; sends current limits over CAN."
            ],
            [
              "Main fuse",
              "Protects against short circuits the BMS cannot stop in time. Must be DC-rated: a DC arc does not self-extinguish at a current zero."
            ],
            [
              "Contactor(s) and pre-charge",
              "Connect the pack to the controller at key-on. HV packs switch both poles; many 48–72 V packs use a MOSFET switch in the BMS."
            ],
            [
              "Motor controller (inverter)",
              "Turns battery DC into variable-frequency three-phase AC with six switches; regulates torque; runs regen."
            ],
            [
              "Motor",
              "Almost always a permanent-magnet synchronous machine, in the hub or frame-mounted."
            ],
            [
              "VCU and HMI",
              "Arbitrates rider inputs, BMS limits, controller and charger; enforces interlocks (no drive with side stand down or cable connected). The dash shows SOC, range, mode and faults."
            ],
            [
              "DC-DC converter",
              "Steps traction voltage down to 13.5–14.4 V (150–500 W) for lights, horn and electronics; isolated on HV machines."
            ],
            [
              "Charger and port",
              "On board, off board, or in a swap station; DC fast charging connects the pack directly to an external charger under BMS control."
            ],
            [
              "CAN bus (ISO 11898)",
              "Twisted pair CAN-H / CAN-L, 120 Ω at each end, 250 or 500 kbit/s."
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Compare the <a href=\"../overview/?mode=4t&view=diagram\">four-stroke</a> and <a href=\"../overview/?mode=elec&view=diagram\">electric</a> course plates. Using plate F06 (Module 1), list every assembly from Engine (14) to Drive chain (22) and from Battery (27) to Regulator/rectifier (29), and write for each whether an electric component replaces it, it remains unchanged, or it disappears. For example, the throttle body and injector have no electric equivalent, the battery becomes the auxiliary 12 V battery, and the regulator/rectifier is replaced by the <a href=\"../overview/?mode=elec&part=dc_dc\">DC-DC converter</a>."
        },
        {
          "type": "h3",
          "text": "Why pre-charge?"
        },
        {
          "type": "p",
          "html": "The controller has a large DC-link capacitor bank (typically <strong>1,000–5,000 µF</strong> on a 72 V controller). Close a contactor straight onto an empty capacitor and only milliohms of wiring limit the inrush: <strong>thousands of amps</strong> that pit or weld the contact tips. The pre-charge circuit first charges the capacitor through a resistor, then closes the main contactor."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Time constant",
              "v": "τ = R × C",
              "p": "100 Ω × 2,000 µF = 0.2 s"
            },
            {
              "l": "95 % charged",
              "v": "3τ = 0.6 s",
              "p": "over 99 % after 5τ = 1.0 s"
            },
            {
              "l": "Resistor peak",
              "v": "≈ 52 W",
              "p": "72² / 100, for a fraction of a second; energy ½CV² ≈ 5.2 J"
            }
          ]
        },
        {
          "type": "p",
          "html": "The controller or BMS checks that the DC link reaches <strong>90–95 %</strong> of pack voltage within a set time. If not, it logs a pre-charge fault, because a slow pre-charge points to a short or heavy leakage on the DC link."
        },
        {
          "type": "check",
          "q": "m5-04"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Healthy CAN reads 60 Ω",
          "html": "With the power off, measure between CAN-H and CAN-L. Two 120 Ω terminators in parallel give about <strong>60 Ω</strong>. A reading of <strong>120 Ω</strong> means one terminator is missing or one end of the bus is disconnected: expect reflections and intermittent communication faults."
        },
        {
          "type": "h3",
          "text": "Real platforms"
        },
        {
          "type": "p",
          "html": "Two families share the same architecture. <strong>Premium motorcycles</strong> (Zero, Energica) use fixed high-voltage packs of 13–22 kWh with on-board AC charging and sometimes DC fast charging. <strong>Mass-market commuters and taxis</strong> in Asia and Africa use low-voltage packs (48–72 V, 1.3–3.5 kWh each), often removable and swapped, so the battery becomes a fleet asset owned by the operator."
        },
        {
          "type": "table",
          "head": [
            "Platform",
            "Market",
            "Notes (manufacturer data at time of writing)"
          ],
          "rows": [
            [
              "Zero SR/F",
              "Europe, North America",
              "Frame-mounted IPM motor, belt drive, fixed 17.3 kWh pack, about 190 Nm peak"
            ],
            [
              "Energica Ego",
              "Europe",
              "Liquid-cooled PM motor, chain, about 21.5 kWh at around 300 V, CCS fast charging"
            ],
            [
              "Roam Air",
              "Kenya, East Africa",
              "Two removable 3.24 kWh packs, 3 kW nominal, 90 km/h, 180 km rated range"
            ],
            [
              "Ather 450",
              "India",
              "Frame-mounted PMSM, belt, fixed 2.9–3.7 kWh, LECCS fast charging"
            ],
            [
              "Gogoro",
              "Taiwan and partners",
              "Swap packs of about 1.3 kWh (first generation, 9 kg, 18650 cells), two per scooter"
            ],
            [
              "Spiro",
              "Kenya, Uganda, Rwanda, Nigeria, Benin, Togo",
              "Battery swap; over 50,000 machines and 1,000 stations reported in late 2025"
            ],
            [
              "Ampersand",
              "Rwanda, Kenya",
              "Battery swap; about 2 USD for roughly 80 km"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m5-05"
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "O2zlYpy6QCM",
              "title": "Why Electric Motorcycles are Failing",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "8:48",
              "role": "How it works",
              "note": "Opinion on why electric motorcycles struggle: pack cost, weight, range and charging; market claims are the creator's."
            },
            {
              "id": "dUYcdWJeAyo",
              "title": "Why Electric Motorcycles are Probably Cursed",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "12:19",
              "role": "How it works",
              "note": "Why electric bikes are hard: pack weight, cost and charging; an opinion piece, check claims."
            },
            {
              "id": "gYs_jYUyaoY",
              "title": "Building An Electric Motorcycle - DIY E-Moto!",
              "channel": "James Biggar",
              "channel_url": "http://www.youtube.com/@JamesBiggar",
              "duration": "32:23",
              "role": "Case study",
              "note": "DIY electric motorcycle build shows how motor, controller and pack fit a frame; high voltage work needs qualified review, not a DIY guide."
            }
          ]
        }
      ]
    },
    {
      "id": "m5-motors",
      "title": "Electric motors",
      "lead": "The traction motor is the part that replaces the whole engine. Two equations explain most of its behaviour: torque follows current, and back-EMF follows speed. Everything else, from top speed to why hub motors judder, falls out of those.",
      "lab": "overview/?mode=elec&part=motor",
      "blocks": [
        {
          "type": "h3",
          "text": "Torque follows current"
        },
        {
          "type": "p",
          "html": "A conductor carrying current through a magnetic field feels a force (the Lorentz force, <strong>F = B × I × L</strong>). Many conductors at the air-gap radius r add up to torque. All the geometry and magnet strength fold into one number, the torque constant <strong>Kt</strong>, so <strong>T = Kt × I</strong>. That is why a controller regulates <em>current</em> when the rider asks for torque."
        },
        {
          "type": "h3",
          "text": "Back-EMF follows speed"
        },
        {
          "type": "p",
          "html": "A spinning motor is also a generator. The voltage it induces, <strong>back-EMF</strong>, opposes the supply and rises in proportion to speed. The speed constant <strong>Kv</strong> (rpm per volt) tells you the no-load speed per volt. For an ideal machine in SI units: <strong>Kt ≈ 9.55 / Kv</strong>."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Kv = 50 rpm/V on 72 V",
              "v": "≈ 3,600 rpm",
              "p": "no-load speed, less under load"
            },
            {
              "l": "Kt",
              "v": "≈ 0.19 N·m/A",
              "p": "9.55 / 50"
            },
            {
              "l": "At 200 A",
              "v": "≈ 38 N·m",
              "p": "0.19 × 200"
            }
          ]
        },
        {
          "type": "p",
          "html": "Fewer turns give higher Kv (faster) but lower Kt (less torque per amp): the same power, but more current for the same torque. Choosing a winding is a matching exercise between motor, pack voltage and controller current rating. Data sheets mix line-to-line, per-phase, peak and RMS values, so check the convention before comparing two motors."
        },
        {
          "type": "h3",
          "text": "Try it: the electric motor"
        },
        {
          "type": "animation",
          "part": "motor",
          "mode": "elec",
          "caption": "Hold THROTTLE: the three-phase field rotates and the rotor magnets follow. The graph shows flat torque up to the base speed, then constant power."
        },
        {
          "type": "check",
          "q": "m5-06"
        },
        {
          "type": "h3",
          "text": "Power from torque and speed"
        },
        {
          "type": "p",
          "html": "<strong>P = T × ω = T × 2π × n / 60</strong>. A mid-drive giving 190 N·m at 3,000 rpm makes about <strong>59.7 kW</strong>; at 6,000 rpm with 95 N·m it makes the same 59.7 kW (constant-power region). A hub motor giving 120 N·m at 600 rpm makes only <strong>7.5 kW</strong>, because it turns at wheel speed."
        },
        {
          "type": "figure",
          "fig": "power-torque",
          "caption": "Enter 190 N·m at 3,000 rpm, then 95 N·m at 6,000 rpm: same power. Then try a hub motor at 600 rpm."
        },
        {
          "type": "h3",
          "text": "Motor types"
        },
        {
          "type": "p",
          "html": "<strong>Brushed DC</strong> motors switch their coils with a commutator and carbon brushes: simple to control, but the brushes wear, spark and cost 5–10 % in friction and contact loss. Serious two-wheelers now use <strong>brushless</strong> machines: windings on the stator (easy to cool), magnets on the rotor, commutation done electronically by the controller."
        },
        {
          "type": "table",
          "head": [
            "Property",
            "BLDC (trapezoidal)",
            "PMSM (sinusoidal)"
          ],
          "rows": [
            [
              "Back-EMF",
              "Trapezoidal, flat top for 120° electrical",
              "Sinusoidal"
            ],
            [
              "Ideal drive",
              "Six-step, two phases conducting",
              "Sinusoidal currents, field-oriented control"
            ],
            [
              "Position sensing",
              "Three Hall sensors (60° resolution)",
              "Encoder or resolver, or interpolated Halls"
            ],
            [
              "Torque ripple",
              "Higher, at each step",
              "Low"
            ],
            [
              "Typical use",
              "E-bikes, low-cost hub motors",
              "Ather, Zero, Energica, most modern motorcycles"
            ]
          ]
        },
        {
          "type": "p",
          "html": "In practice the line is blurred: most hub motors sold as BLDC have nearly sinusoidal back-EMF and are driven with sinusoidal control. The machine is the same; the drive strategy decides smoothness and efficiency."
        },
        {
          "type": "model",
          "file": "motor",
          "caption": "A permanent-magnet synchronous motor cut away: finned housing, 12-tooth stator with copper windings, rotor with alternating magnets, bearings and output shaft."
        },
        {
          "type": "plate",
          "id": "F24",
          "caption": "Left: outer-rotor hub motor with surface magnets and Hall sensors. Right: inner-rotor IPM motor with V-shaped buried magnets for mid-drive mounting."
        },
        {
          "type": "h3",
          "text": "Pole pairs and electrical frequency"
        },
        {
          "type": "p",
          "html": "The controller must generate <strong>f_e = p × n / 60</strong>. A hub motor with 23 pole pairs at 600 rpm runs at <strong>230 Hz</strong>; a mid-drive with 5 pole pairs at 6,000 rpm at <strong>500 Hz</strong>. Many poles give torque at low speed; few poles keep frequency (and iron loss) in check at high speed."
        },
        {
          "type": "h3",
          "text": "Surface versus interior magnets"
        },
        {
          "type": "p",
          "html": "A <strong>surface PM (SPM)</strong> rotor has magnets bonded to its surface. It is magnetically round (Ld = Lq), so torque comes only from the magnets. It suits outer-rotor hub motors. An <strong>interior PM (IPM)</strong> rotor buries the magnets in slots, often in a V. Because magnets behave almost like air, Lq is 2–3 times Ld, adding <strong>reluctance torque</strong> and allowing wide field weakening. IPM is the standard for frame-mounted mid-drives (the Zero Z-Force motor is one)."
        },
        {
          "type": "h3",
          "text": "Hub motor or mid-drive?"
        },
        {
          "type": "table",
          "head": [
            "",
            "Hub motor",
            "Mid-drive"
          ],
          "rows": [
            [
              "Drive line",
              "None: no chain, belt, gearbox or lubrication; almost silent",
              "Belt (Zero, Ather), chain (Energica) or gears; single fixed ratio"
            ],
            [
              "Unsprung mass",
              "High: a 3 kW hub weighs 10–15 kg against 3–5 kg for a normal hub and brake",
              "Same as a petrol bike"
            ],
            [
              "Cooling",
              "Poor; stator sealed in a drum, hill climbs at low speed heat it fast",
              "Air, oil or liquid cooled through its own housing"
            ],
            [
              "Motor speed",
              "Wheel speed",
              "3,000–12,000 rpm, so a small motor makes high power"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Road speed from motor speed: <strong>n_wheel = n_motor / i</strong>, <strong>v = n_wheel × C_roll × 60 / 1000</strong> km/h. At 5,000 rpm through a 22/132 belt (i = 6.0) and a 1.93 m tyre circumference: 833 rpm at the wheel, <strong>about 96 km/h</strong>. Wheel torque is multiplied by the ratio: 40 N·m × 6.0 × 0.97 ≈ <strong>233 N·m</strong>, a tractive force of about 760 N on a 0.307 m rolling radius."
        },
        {
          "type": "check",
          "q": "m5-08"
        },
        {
          "type": "p",
          "html": "<strong>Axial-flux</strong> motors (Emrax, YASA) push flux across a flat disc gap, giving high torque in a pancake shape, but the gap must be held to a fraction of a millimetre against strong magnetic pull. <strong>Induction</strong> motors have no magnets: no rare-earth cost and no back-EMF when unpowered, but lower part-load efficiency and torque density, so they are rare on motorcycles."
        },
        {
          "type": "h3",
          "text": "Torque-speed characteristics"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Constant-torque region (0 to base speed)",
              "html": "Back-EMF is well below the available voltage, so the controller can push full current. Torque is flat, power rises linearly with speed."
            },
            {
              "title": "Base speed",
              "html": "Back-EMF reaches the voltage limit. Base speed falls as the pack sags: from 84 V to 64 V cuts it by nearly a quarter, which is why bikes lose punch at low SOC."
            },
            {
              "title": "Field-weakening (constant-power) region",
              "html": "The controller injects negative d-axis current to oppose the magnet flux. Torque falls roughly with 1/speed, power stays roughly constant. SPM motors reach about 1.2–1.5× base speed; IPM motors 2.5–4×."
            }
          ]
        },
        {
          "type": "figure",
          "fig": "torque-curves",
          "caption": "Compare the flat-then-falling electric torque curve with a petrol engine's hump. Find base speed, where the electric power curve flattens."
        },
        {
          "type": "p",
          "html": "The <strong>peak</strong> curve lasts perhaps 10–30 s and is set by controller current and magnet demagnetisation. The <strong>continuous</strong> curve is set by temperature and is typically <strong>40–60 %</strong> of peak torque. On an efficiency map the best island is <strong>93–96 %</strong> at medium speed and moderate torque; designers pick the ratio so the bike lives near that island."
        },
        {
          "type": "h3",
          "text": "Losses, cooling and magnets"
        },
        {
          "type": "table",
          "head": [
            "Loss",
            "Grows with",
            "Mitigation"
          ],
          "rows": [
            [
              "Copper (I²R)",
              "Square of phase current; resistance +0.39 %/K",
              "More copper, cooling"
            ],
            [
              "AC copper (skin, proximity)",
              "Electrical frequency",
              "Stranded or Litz wire, hairpins"
            ],
            [
              "Iron hysteresis",
              "Frequency and flux density",
              "Low-loss silicon steel"
            ],
            [
              "Iron eddy current",
              "f² × B² × lamination thickness²",
              "Thin laminations (0.2–0.35 mm)"
            ],
            [
              "Magnet eddy current",
              "PWM and slot harmonics, speed",
              "Segmented magnets"
            ],
            [
              "Mechanical",
              "Speed",
              "Correct bearing preload and lubrication"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Class H insulation (<strong>180 °C</strong>) is common, and each <strong>10 K</strong> above rating roughly halves insulation life. NdFeB magnets lose about 0.11–0.12 % of flux per kelvin (about 11 % less at 120 °C than at 25 °C), and their resistance to demagnetisation falls faster still. A hot magnet hit by a strong opposing field can be <strong>permanently</strong> weakened: the motor then shows lower back-EMF when spun at a known speed."
        },
        {
          "type": "h3",
          "text": "Position sensing"
        },
        {
          "type": "p",
          "html": "<strong>Hall sensors</strong>: three cheap digital sensors, six states per electrical cycle, 60° resolution; heat, water and broken wires kill them. <strong>Encoders</strong> give hundreds or thousands of counts per revolution. <strong>Resolvers</strong> are rotary transformers with no electronics in the motor, standard on HV drives. <strong>Sensorless</strong> control works above perhaps 5–10 % of rated speed but struggles at standstill, so sensorless hub motors may judder at take-off. After replacing a motor or sensor, run the controller's self-learning routine with the wheel raised."
        },
        {
          "type": "check",
          "q": "m5-10"
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "A spinning motor is a generator",
          "html": "A permanent-magnet motor makes voltage whenever it turns, even with the battery disconnected. A hub motor spun by hand can produce tens of volts; a high-voltage IPM motor towed at road speed several hundred. Never connect or disconnect phase wires with the wheel turning, and do not tow with the rear wheel on the ground unless the manufacturer permits it."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "XaSngTcPw40",
              "title": "Building Insanely Fast Electric Motorcycle From Scratch / New @ridevoltic Build",
              "channel": "Build Studio",
              "channel_url": "http://www.youtube.com/@BuildStudioHQ",
              "duration": "19:46",
              "role": "Case study",
              "note": "Electric motorcycle built from scratch; shows motor and controller choices, high voltage needs qualified review."
            }
          ]
        }
      ]
    },
    {
      "id": "m5-controllers",
      "title": "Motor controllers and regenerative braking",
      "lead": "The controller is the electric bike's throttle body, ignition and engine brake rolled into one box of six switches. Understanding how it chops battery voltage, splits current into torque and field, and runs the motor backwards as a generator explains most of how the bike feels and most of how it fails.",
      "lab": "overview/?mode=elec&part=controller",
      "blocks": [
        {
          "type": "h3",
          "text": "The three-phase inverter"
        },
        {
          "type": "p",
          "html": "Three half-bridges (legs), one per phase. Each leg has a <strong>high-side</strong> switch to the positive rail (U+, V+, W+) and a <strong>low-side</strong> switch to the negative rail (U−, V−, W−), each with a freewheeling diode. Turning on U+ and V− drives current through windings U and V; changing which switches are on rotates the field."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "48–96 V controllers",
              "v": "100–150 V MOSFETs",
              "p": "12–36 devices in parallel, 1.5–4 mΩ each"
            },
            {
              "l": "300–400 V drives",
              "v": "IGBT or SiC",
              "p": "650–1,200 V rated switches"
            },
            {
              "l": "Dead time",
              "v": "≈ 0.1–2 µs",
              "p": "both switches of a leg off, to prevent shoot-through"
            }
          ]
        },
        {
          "type": "p",
          "html": "Gate drivers turn logic signals into 10–15 V gate pulses. The <strong>DC-link capacitors</strong> supply the switching ripple; electrolytic capacitors dry out with heat and age, a common cause of controller failure after several years. Current is sensed by shunts on cheap controllers and Hall-effect transducers on better ones."
        },
        {
          "type": "model",
          "file": "controller",
          "caption": "A motor controller with the lid removed: heat sink, six power switches, DC-link capacitors, copper busbars and gate-driver board."
        },
        {
          "type": "h3",
          "text": "Pulse-width modulation"
        },
        {
          "type": "p",
          "html": "The battery voltage is fixed, so the controller switches at a fixed frequency (<strong>8–20 kHz</strong> for MOSFET drives, 5–10 kHz for large IGBT drives) and varies the duty cycle D: <strong>V_avg = D × V_DC</strong>. Winding inductance smooths the current. The faint whine of some scooters at low speed is the PWM frequency exciting the laminations."
        },
        {
          "type": "h3",
          "text": "Try it: the controller switching"
        },
        {
          "type": "animation",
          "part": "controller",
          "mode": "elec",
          "caption": "Hold THROTTLE and watch the high-side and low-side MOSFETs of each phase take turns, turning the battery DC into three-phase AC."
        },
        {
          "type": "check",
          "q": "m5-11"
        },
        {
          "type": "h3",
          "text": "Six-step versus field-oriented control"
        },
        {
          "type": "table",
          "head": [
            "",
            "Six-step (block)",
            "Field-oriented control (FOC)"
          ],
          "rows": [
            [
              "Phases conducting",
              "Two, third floats",
              "All three, sinusoidal"
            ],
            [
              "Switching",
              "Abruptly every 60° electrical from Hall states",
              "Continuous, via Clarke and Park transforms and space-vector PWM"
            ],
            [
              "Torque ripple",
              "10–15 %, felt as graininess and buzz",
              "Low, smooth down to zero speed"
            ],
            [
              "Sensor needs",
              "Three Hall sensors",
              "Continuous angle: encoder, resolver, interpolated Halls or observer"
            ],
            [
              "Efficiency",
              "Baseline",
              "2–5 % better in practice"
            ]
          ]
        },
        {
          "type": "p",
          "html": "FOC splits current into <strong>iq</strong>, which makes torque with the magnet flux, and <strong>id</strong>, along the magnet axis, which strengthens or weakens the field. On a surface-magnet motor id is held at zero below base speed. On an IPM motor a negative id adds reluctance torque (maximum torque per ampere, MTPA) and, above base speed, weakens the field so the motor can run faster."
        },
        {
          "type": "h3",
          "text": "Phase current versus battery current"
        },
        {
          "type": "p",
          "html": "Two different limits, often confused. <strong>Phase current</strong> is in the windings and sets torque. <strong>Battery current</strong> is drawn from the pack. The inverter behaves like a step-down converter, so at low speed phase current can be several times battery current: <strong>I_batt ≈ D_eff × I_phase</strong>."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Pulling away (5 km/h)",
              "html": "72 V controller, 300 A phase limit, 120 A battery limit. Effective duty about 0.2, so 300 A phase draws only about 60 A from the pack while the motor delivers full torque."
            },
            {
              "title": "Accelerating",
              "html": "Duty and battery current rise. At about 40 % duty, 300 A phase would need 120 A from the battery."
            },
            {
              "title": "Above that speed",
              "html": "The battery limit governs: phase current and torque must fall. Peak power ≈ 72 V × 120 A ≈ 8.6 kW, less sag."
            }
          ]
        },
        {
          "type": "callout",
          "tone": "elec",
          "title": "Rule of thumb",
          "html": "The <strong>phase limit sets launch torque</strong>; the <strong>battery limit sets peak power</strong>. Raising the phase limit improves pull-away but heats motor and transistors; raising the battery limit stresses the pack and BMS. Neither raises top speed, which is set by back-EMF meeting pack voltage."
        },
        {
          "type": "check",
          "q": "m5-12"
        },
        {
          "type": "h3",
          "text": "Throttle maps and ride modes"
        },
        {
          "type": "p",
          "html": "A Hall throttle reads about <strong>0.8 V</strong> closed and <strong>4.2 V</strong> wide open on a 5 V supply. The dead bands let the controller treat anything below about 0.5 V or above 4.5 V as a broken wire, not a command. Torque-mode throttles feel like a petrol throttle; speed-mode throttles feel like cruise control. Ride modes change the map, torque and power ceilings, top speed and regen strength."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Instant torque",
          "html": "A 190 N·m mid-drive through a 6:1 reduction can put over <strong>1,100 N·m</strong> on the rear wheel within milliseconds, enough to spin it on a wet road or lift the front. Throttle maps deliberately rate-limit the rise, often 50–200 ms to full torque."
        },
        {
          "type": "model",
          "file": "instruments_tft",
          "caption": "A TFT dashboard showing ride mode, speed and battery state."
        },
        {
          "type": "h3",
          "text": "Regenerative braking"
        },
        {
          "type": "p",
          "html": "Command negative iq and the motor's torque opposes rotation: it becomes a generator and kinetic energy flows back into the battery. Regen is triggered by closing the throttle, by the brake lever switch (often rear only) or by a separate control."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "250 kg at 50 km/h",
              "v": "≈ 6.7 Wh",
              "p": "½ × 250 × 13.9² ≈ 24,100 J"
            },
            {
              "l": "Returned per stop",
              "v": "≈ 4 Wh",
              "p": "60–70 % round trip"
            },
            {
              "l": "Real urban range gain",
              "v": "5–15 %",
              "p": "more on long descents"
            }
          ]
        },
        {
          "type": "table",
          "head": [
            "Why regen may be weak or absent",
            "Reason"
          ],
          "rows": [
            [
              "Battery nearly full",
              "BMS charge limit near zero above about 90–95 % SOC"
            ],
            [
              "Cold cells",
              "Charging below about 0–10 °C risks lithium plating"
            ],
            [
              "Current limits",
              "Charge rating (often 0.5–1C) is lower than discharge (2–5C)"
            ],
            [
              "Traction",
              "Regen acts on the rear, which is unloaded under braking; reduced if slip is detected"
            ],
            [
              "Low speed",
              "Back-EMF fades below 5–10 km/h; the friction brakes finish the stop"
            ]
          ]
        },
        {
          "type": "figure",
          "fig": "weight-transfer",
          "caption": "Increase the deceleration and watch load leave the rear wheel: the wheel that does all the regen braking."
        },
        {
          "type": "check",
          "q": "m5-13"
        },
        {
          "type": "h3",
          "text": "Protections and failure modes"
        },
        {
          "type": "table",
          "head": [
            "Protection",
            "Typical action"
          ],
          "rows": [
            [
              "Phase overcurrent",
              "Hard trip within microseconds at 1.2–1.5× the phase limit"
            ],
            [
              "Overvoltage",
              "Regen reduced, shutdown above about 1.2× maximum pack voltage"
            ],
            [
              "Undervoltage",
              "Power foldback, then shutdown to protect cells"
            ],
            [
              "Controller temperature",
              "Derate from 80–90 °C heatsink, shutdown about 100–110 °C"
            ],
            [
              "Motor temperature",
              "Derate from 120–140 °C"
            ],
            [
              "Throttle fault",
              "Drive disabled; throttle must be closed at power-up"
            ],
            [
              "Position-sensor fault",
              "Illegal Hall states 000 or 111: fault code, limp mode or shutdown"
            ],
            [
              "Interlocks",
              "Side stand, brake, seat, charge cable: drive inhibited"
            ]
          ]
        },
        {
          "type": "p",
          "html": "<strong>Shorted switch:</strong> a shorted low-side switch makes the wheel notchy or lock when pushed. Diode test, controller isolated: a good leg reads about <strong>0.3–0.6 V</strong> one way and open the other; a shorted switch reads near <strong>0 V both ways</strong>. <strong>Phase loss:</strong> the motor growls, vibrates, may not start from rest. <strong>Hall failure:</strong> illegal states, rough running, high current."
        },
        {
          "type": "check",
          "q": "m5-14"
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Derestricting changes the vehicle category",
          "html": "Raising the speed or continuous power limit of a type-approved moped or L3e-A1 machine changes its approval, invalidates insurance and may require a different licence. It also overloads parts: raising battery current from 60 A to 100 A can push each 21700 cell beyond its continuous rating."
        }
      ]
    },
    {
      "id": "m5-batteries",
      "title": "Batteries and the BMS",
      "lead": "The battery is the heaviest, most expensive and most dangerous part of an electric motorcycle. A few lines of arithmetic tell you its voltage, energy, current and heat; the BMS is what keeps those numbers inside safe limits for years.",
      "lab": "overview/?mode=elec&part=battery",
      "blocks": [
        {
          "type": "h3",
          "text": "Cells and chemistries"
        },
        {
          "type": "p",
          "html": "Discharge moves lithium ions from the graphite anode through an electrolyte-soaked separator into the cathode, while electrons do work in the external circuit. A thin <strong>solid electrolyte interphase (SEI)</strong> forms on the anode on first charge; its slow growth is the main cause of ageing. The cathode material names the chemistry."
        },
        {
          "type": "table",
          "head": [
            "Chemistry",
            "Nominal / max / min (V)",
            "Energy (Wh/kg)",
            "Cycles to 80 %",
            "Notes"
          ],
          "rows": [
            [
              "NMC",
              "3.6–3.7 / 4.2 / 2.5–3.0",
              "200–270",
              "1,000–2,000",
              "Premium packs, most 21700 cells"
            ],
            [
              "NCA",
              "3.6 / 4.2 / 2.5",
              "220–280",
              "800–1,500",
              "Panasonic cylindrical"
            ],
            [
              "LFP",
              "3.2–3.3 / 3.65 / 2.5",
              "150–205",
              "2,000–6,000",
              "No cobalt or nickel, stable, flat curve, poorer in cold"
            ],
            [
              "LMFP",
              "about 3.7 / 4.3 / 2.5",
              "180–230",
              "1,500–3,000",
              "LFP with manganese"
            ],
            [
              "Sodium-ion",
              "3.0–3.1 / 3.9–4.0 / 1.5–2.0",
              "100–160",
              "2,000–5,000 (claimed)",
              "No lithium, good in cold, can ship at 0 V"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Holders, busbars, BMS and enclosure add mass: a cell-to-pack ratio of <strong>60–75 %</strong> turns 250 Wh/kg cells into 150–180 Wh/kg packs. <strong>21700</strong> cells (21 × 70 mm, 4.0–5.0 Ah, 65–70 g) are now the two-wheeler standard, with about 50 % more energy than an 18650. Cylindrical cells have a steel can, a vent and a current interrupt device, so failures are contained per cell."
        },
        {
          "type": "h3",
          "text": "Pack arithmetic: xSyP"
        },
        {
          "type": "p",
          "html": "<strong>S</strong> groups in series add voltage; <strong>P</strong> cells in parallel within each group add capacity and current capability."
        },
        {
          "type": "plate",
          "id": "F26",
          "caption": "A 20S10P module of 21700 cells with nickel strips, holders and BMS, and a section through one cell."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "20S10P voltage",
              "v": "72 V nominal",
              "p": "20 × 3.6 V; 84 V full, about 60 V practical empty"
            },
            {
              "l": "Capacity",
              "v": "50 Ah",
              "p": "10 × 5.0 Ah"
            },
            {
              "l": "Energy",
              "v": "3.6 kWh",
              "p": "72 V × 50 Ah; 200 cells, 14 kg of cells, about 20 kg pack"
            },
            {
              "l": "Range",
              "v": "≈ 100 km",
              "p": "at 3.6 kWh/100 km"
            }
          ]
        },
        {
          "type": "figure",
          "fig": "battery-pack",
          "caption": "Build a 20S10P pack from 3.6 V, 5.0 Ah cells and check 72 V, 50 Ah, 3.6 kWh. Then try 16S8P with 4.8 Ah cells."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "A '72 V' pack is high voltage",
          "html": "Fully charged, a 20S NMC pack reaches <strong>84 V</strong>, above the <strong>60 V DC</strong> threshold of class B (Chapter 5.6), even though it is sold as 72 V."
        },
        {
          "type": "check",
          "q": "m5-16"
        },
        {
          "type": "h3",
          "text": "C-rate, internal resistance and heat"
        },
        {
          "type": "p",
          "html": "<strong>C-rate = I / Q</strong>. For the 50 Ah pack, 150 A is <strong>3C</strong> and 15 A per cell, exactly the cell's continuous rating. A 3 kW motor at 72 V draws about 45 A (0.9C). Charging at 10 A is C/5, about five hours."
        },
        {
          "type": "p",
          "html": "<strong>R_pack = (S / P) × R_cell + R_interconnect</strong> = (20 / 10) × 0.015 + 0.010 = <strong>0.040 Ω</strong>. At 150 A the pack sags by 6 V (72 V to about 66 V) and makes <strong>900 W</strong> of heat inside. A 20-minute climb at 100 A generates 480 kJ, a potential rise of over 30 K, which is why sealed air-cooled packs derate on long hot hills. Resistance roughly doubles from 25 °C to 0 °C and rises with age."
        },
        {
          "type": "check",
          "q": "m5-17"
        },
        {
          "type": "h3",
          "text": "State of charge and state of health"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Coulomb counting",
              "html": "Integrate current over time. Responsive, but sensor offset accumulates: 0.5 A on a 50 Ah pack is 1 % error per hour."
            },
            {
              "title": "Open-circuit voltage",
              "html": "After 30 minutes to several hours of rest, look up SOC from cell voltage. Good for NMC (3.3 V empty to 4.2 V full); almost useless for LFP between 20 and 80 %, where voltage moves only tens of millivolts."
            },
            {
              "title": "Combined",
              "html": "Count coulombs while riding, correct at rest and at full charge; advanced BMSs use model-based estimators such as the extended Kalman filter."
            }
          ]
        },
        {
          "type": "p",
          "html": "<strong>SOH</strong> is present capacity divided by rated capacity (sometimes resistance). The conventional end of first life is <strong>80 %</strong>, a fifth less range."
        },
        {
          "type": "check",
          "q": "m5-18"
        },
        {
          "type": "h3",
          "text": "What the BMS does"
        },
        {
          "type": "p",
          "html": "It measures every series group to a few millivolts, temperatures at several points and pack current. It <strong>balances</strong> groups that drift apart: <strong>passive</strong> balancing bleeds high groups through resistors at 30–200 mA (a 1 Ah imbalance at 100 mA takes 10 hours); <strong>active</strong> balancing moves charge from high to low groups at up to a few amps with 80–90 % efficiency. Balancing cannot fix a cell with high self-discharge, which drifts low again within days."
        },
        {
          "type": "table",
          "head": [
            "Condition",
            "Typical NMC limit",
            "BMS action"
          ],
          "rows": [
            [
              "Cell overvoltage",
              "4.20–4.25 V",
              "Stop charge and regen"
            ],
            [
              "Cell undervoltage",
              "2.8–3.0 V under load, 2.5 V absolute",
              "Reduce, then stop discharge"
            ],
            [
              "Short circuit",
              "Several times rated current",
              "Open within 100–500 µs or rely on fuse"
            ],
            [
              "Charge temperature",
              "Typically 0–45 °C",
              "No charging outside range"
            ],
            [
              "Discharge temperature",
              "Typically −20 to 60 °C",
              "Derate, then stop"
            ],
            [
              "Insulation fault (HV)",
              "Below about 100 Ω/V",
              "Warning, then open contactor"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A <strong>common-port</strong> BMS charges and discharges through the same terminals and switches; a <strong>separate-port</strong> BMS has its own lower-rated charge path. Swap-pack BMSs authenticate with vehicle and station and log cycles, temperatures and faults. Stored packs need a deep-sleep BMS: 10 mA drains 1 Ah in 100 hours."
        },
        {
          "type": "check",
          "q": "m5-19"
        },
        {
          "type": "model",
          "file": "battery_hv",
          "caption": "An HV traction battery enclosure with cooling fins, HV connector, orange cable and service disconnect."
        },
        {
          "type": "photo",
          "src": "render-battery.jpg",
          "caption": "A 24-cell module of 21700 cylindrical cells: moulded cell holders top and bottom, spot-welded nickel strips joining each parallel group of six cells, a copper busbar and terminal, and balance leads running to the BMS board; two loose cells show the positive cap and the insulating ring."
        },
        {
          "type": "h3",
          "text": "Thermal runaway"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "80–120 °C",
              "html": "The SEI decomposes; exposed graphite reacts with electrolyte and makes more heat."
            },
            {
              "title": "About 130–170 °C",
              "html": "The separator melts and shrinks: internal short circuits."
            },
            {
              "title": "About 180–250 °C",
              "html": "The charged cathode releases oxygen, which burns the electrolyte. Temperature reaches 600–900 °C within seconds; the vent jet can exceed 1,000 °C."
            }
          ]
        },
        {
          "type": "p",
          "html": "Gases include hydrogen, carbon monoxide and hydrogen fluoride. LFP cells go into runaway at higher temperature and release much less heat, but still vent flammable gas. <strong>Propagation</strong> from cell to cell is slowed by spacing, mica or aerogel barriers, vent channels and per-cell fusing. AIS-156 and UNECE R136 test for it."
        },
        {
          "type": "h3",
          "text": "Ageing and how to slow it"
        },
        {
          "type": "p",
          "html": "<strong>Calendar ageing</strong> roughly doubles per 10 K and is faster at high SOC: a pack at 100 % and 40 °C may lose 10–20 % in a year; at 40–60 % and 15–25 °C, a few percent. <strong>Cycle ageing</strong> depends on depth, current and temperature: cycling 20–80 % can give two to three times as many equivalent full cycles as 0–100 %. Charging below about 10 °C or too fast promotes <strong>lithium plating</strong>."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Don't park at 100 %",
              "html": "Charge to 80–90 % for daily use where the system allows."
            },
            {
              "title": "Keep it cool",
              "html": "Store at 40–60 % SOC, out of direct sun."
            },
            {
              "title": "No fast charge when cold",
              "html": "Below about 0 °C fast charging plates lithium metal on the anode, which permanently costs capacity."
            },
            {
              "title": "Never store empty",
              "html": "Below about 2 V the copper current collector dissolves and the cell becomes unsafe to recharge."
            }
          ]
        },
        {
          "type": "check",
          "q": "m5-20"
        },
        {
          "type": "p",
          "html": "Packs retired at 70–80 % SOH can serve years in stationary storage. At end of life, hydrometallurgical recycling recovers lithium, nickel, cobalt and manganese from black mass. EU Regulation 2023/1542 adds recycled-content rules, collection targets and a digital battery passport."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Damaged and swollen packs",
          "html": "A pack that has been dropped, crashed or submerged, or that shows swelling, a sweet solvent smell, hissing, smoke, heat without use or leakage must <strong>never be charged or reinstalled</strong>. If safe, move it outdoors away from buildings and vehicles and treat it as hazardous waste."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "O2zlYpy6QCM",
              "title": "Why Electric Motorcycles are Failing",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "8:48",
              "role": "How it works",
              "note": "Opinion on why electric motorcycles struggle: pack cost, weight, range and charging; market claims are the creator's."
            },
            {
              "id": "dUYcdWJeAyo",
              "title": "Why Electric Motorcycles are Probably Cursed",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "12:19",
              "role": "How it works",
              "note": "Why electric bikes are hard: pack weight, cost and charging; an opinion piece, check claims."
            },
            {
              "id": "Oo2xAQ4ULw8",
              "title": "I Was NOT Expecting what’s Inside Harley's $100M Motorcycle Battery",
              "channel": "Bikes and Beards",
              "channel_url": "http://www.youtube.com/@BikesandBeards",
              "duration": "52:21",
              "role": "Case study",
              "note": "Opening a traction pack to see cells and BMS; high voltage, advanced case study, not a DIY guide."
            }
          ]
        }
      ]
    },
    {
      "id": "m5-charging",
      "title": "Charging, swapping and standards",
      "lead": "Refilling is where electric two-wheelers differ most from petrol ones. A plug takes hours, a fast charger tens of minutes, a swap station one minute. Knowing the charge profile, the arithmetic and the standards lets you set expectations, pick the right charger and spot a dangerous one.",
      "lab": "overview/?mode=elec&part=charge_port",
      "blocks": [
        {
          "type": "h3",
          "text": "On-board and off-board"
        },
        {
          "type": "p",
          "html": "A battery accepts only DC, so every charger contains a rectifier and a controlled DC-DC stage. An <strong>on-board</strong> charger (Zero, Energica) adds 2–6 kg and is limited to about <strong>0.6–6.6 kW</strong>. An <strong>off-board</strong> charger, from a 300–1,000 W brick to a wall unit, is normal for 48–72 V commuters and removable packs. Either way the charger is a slave to the BMS; communicating systems will not start until the BMS sends a valid request over CAN."
        },
        {
          "type": "h3",
          "text": "The CC/CV profile"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Pre-charge (deeply discharged only)",
              "html": "Small current, C/10 or less, until cells exceed about 3.0 V (NMC)."
            },
            {
              "title": "Constant current",
              "html": "Rated current while voltage rises; 70–85 % of the energy goes in here."
            },
            {
              "title": "Constant voltage",
              "html": "Hold the set point (4.20 V per cell NMC, 3.65 V per cell LFP); current tapers."
            },
            {
              "title": "Termination",
              "html": "Stop when current falls to about C/20–C/10. No float charge for lithium-ion."
            }
          ]
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "20S NMC set point",
              "v": "84.0 V",
              "p": "20 × 4.20 V"
            },
            {
              "l": "24S LFP set point",
              "v": "87.6 V",
              "p": "24 × 3.65 V; not interchangeable with the NMC charger"
            },
            {
              "l": "0.05 V/cell too high",
              "v": "4.25 V",
              "p": "a few % more capacity, much faster ageing"
            }
          ]
        },
        {
          "type": "check",
          "q": "m5-21"
        },
        {
          "type": "h3",
          "text": "Worked example: charge time"
        },
        {
          "type": "p",
          "html": "A 3.6 kWh, 72 V (20S10P) pack from 10 % to 100 % with a 15 A off-board charger."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Charger power",
              "html": "≈ 80 V × 15 A = 1.2 kW (average pack voltage during CC)"
            },
            {
              "title": "Energy into the battery",
              "html": "0.9 × 3.6 = 3.24 kWh"
            },
            {
              "title": "CC phase",
              "html": "(0.80 × 3.24) / 1.2 ≈ 2.2 h, then CV adds 0.6–1.0 h: about <strong>three hours</strong> in all"
            },
            {
              "title": "From the grid",
              "html": "3.24 / (0.92 × 0.97) ≈ <strong>3.6 kWh</strong>"
            }
          ]
        },
        {
          "type": "p",
          "html": "The slow CV taper is why fast-charge times are always quoted to <strong>80 %</strong>. A European 230 V, 16 A socket supports about 3.0–3.6 kW; a 13 A UK or Kenyan socket 2.5–3.0 kW. A 1.2 kW charger draws about 5 A at 230 V, less than a kettle."
        },
        {
          "type": "figure",
          "fig": "ohms-law",
          "caption": "Set 1.2 kW at 230 V to see the charger's mains current, then 1.2 kW at 80 V for the DC side."
        },
        {
          "type": "check",
          "q": "m5-22"
        },
        {
          "type": "h3",
          "text": "DC fast charging"
        },
        {
          "type": "p",
          "html": "The AC-to-DC stage moves into a stationary unit and the BMS controls the session in real time. Two-wheeler packs are small, so even 1C is only <strong>3–20 kW</strong>. A pack that charges 20–80 % in 40 minutes at 25 °C may take twice as long at 5 °C."
        },
        {
          "type": "table",
          "head": [
            "System",
            "Where",
            "Notes"
          ],
          "rows": [
            [
              "CCS2 (Type 2 Combo)",
              "Energica and other large HV machines",
              "Reuses car chargers, but many have a minimum output of 150–200 V and the inlet is big and heavy, so CCS bikes have packs of 300 V or more"
            ],
            [
              "LECCS",
              "Indian scooters and motorcycles (Ather, Hero MotoCorp)",
              "Compact combined AC/DC connector, based on Ather's opened design, approved by the Bureau of Indian Standards in 2023, suited to 50–100 V packs"
            ],
            [
              "Proprietary",
              "Many brands",
              "Lock riders to one network; IEC 61851-3 addresses light-vehicle DC charging"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m5-23"
        },
        {
          "type": "h3",
          "text": "Battery swapping"
        },
        {
          "type": "p",
          "html": "A depleted removable pack is exchanged for a charged one in under a minute. The operator owns the battery, the rider pays per swap or by subscription. <strong>Gogoro</strong> (Taiwan, from 2015) uses about 1.3 kWh, 9 kg packs, two per scooter, read and charged by automated GoStations. In Japan, Honda, Kawasaki, Suzuki and Yamaha formed a swappable-battery consortium in 2019; with ENEOS they created <strong>Gachaco</strong> in 2022, using the Honda Mobile Power Pack e: (about 1.3 kWh, 10 kg). India's NITI Aayog published a draft swapping policy in 2022. In East Africa, <strong>Spiro</strong> and <strong>Ampersand</strong> run swap networks for boda bodas covering 100–200 km a day; <strong>Roam</strong> sells bikes with two removable 3.24 kWh packs charged at home or at hubs."
        },
        {
          "type": "table",
          "head": [
            "Factor",
            "Swapping",
            "Plug-in (fixed pack)"
          ],
          "rows": [
            [
              "Refuelling time",
              "1–3 minutes",
              "1–5 h AC; 20–60 min DC to 80 %"
            ],
            [
              "Purchase price",
              "Lower (battery leased)",
              "Higher (battery included)"
            ],
            [
              "Infrastructure",
              "Stations with 1.5–3 packs per vehicle",
              "Sockets, wall boxes, fast chargers"
            ],
            [
              "Pack size",
              "Limited by lifting mass, about 1.3–3.5 kWh",
              "Free, 3–22 kWh"
            ],
            [
              "Pack life",
              "Operator controls charge rate, temperature and retirement",
              "Owner behaviour decides"
            ],
            [
              "Interoperability",
              "Within one network or consortium",
              "Standard connectors possible"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A swap pack must be liftable (roughly 10–15 kg), have a connector and latch rated for thousands of insertions with sequenced pins (earth and communication first, power last), identify and authenticate itself, log its history, and survive drops and rough handling."
        },
        {
          "type": "h3",
          "text": "Standards that matter in the workshop"
        },
        {
          "type": "table",
          "head": [
            "Document",
            "What it covers"
          ],
          "rows": [
            [
              "IEC 62133-2",
              "Safety tests for portable lithium cells and batteries"
            ],
            [
              "UN 38.3",
              "Tests T1 altitude, T2 thermal, T3 vibration, T4 shock, T5 external short, T6 impact/crush, T7 overcharge, T8 forced discharge; required before any lithium cell or pack is shipped"
            ],
            [
              "UNECE R136",
              "Electric safety of L-category vehicles: shock protection and battery (REESS) tests, including a drop test for removable packs"
            ],
            [
              "ISO 13063 / ISO 18243",
              "Safety specifications for electric mopeds and motorcycles and their lithium-ion packs"
            ],
            [
              "EN 50604-1 / EN 15194",
              "Light-electric-vehicle batteries / pedelecs"
            ],
            [
              "IEC 61851 / IEC 62196",
              "Charging systems and connectors (Type 2, CCS)"
            ],
            [
              "AIS-156 (India)",
              "India's counterpart of R136, amended after the 2022 scooter fires with cell tests and a thermal propagation test"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A lithium battery shipped alone is dangerous goods <strong>UN 3480</strong> (UN 3481 with or in equipment; a whole vehicle is UN 3171). A replacement pack without a UN 38.3 test summary is a warning sign."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Charging indoors and DC connectors",
          "html": "Most city battery fires start during charging, often with non-original chargers or damaged packs. Use the specified charger, on a non-combustible surface, away from escape routes, with a smoke alarm. XLR, Anderson and XT60/XT90 connectors are <strong>not rated to break DC current</strong>: the arc does not self-extinguish, so connect and disconnect them only with the charger off."
        },
        {
          "type": "model",
          "file": "charge_port",
          "caption": "A Type 2 / CCS2-style charging inlet with hinged cap."
        },
        {
          "type": "h3",
          "text": "Grid and solar"
        },
        {
          "type": "p",
          "html": "One bike is a small load, but a swap station charging 40 packs at 1 kW draws 40 kW and needs a three-phase supply. Solar is easy because daily needs are small: <strong>E_PV = P_peak × H_peak × PR</strong>. A boda boda doing 120 km at 3.5 kWh/100 km needs about 4.2 kWh at the battery (4.8 kWh from the panels); 1.5 kWp × 5.0 h × 0.75 ≈ <strong>5.6 kWh/day</strong>, from four to five modules on 7–8 m²."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Set the <a href=\"../overview/?mode=4t&part=engine\">four-stroke engine</a> to bore 52 mm and stroke 58 mm (close to a 52.4 × 57.8 mm 125 cc single) and confirm a displacement of about 123 cm³, then move the RPM slider to 7500 rpm. If this engine delivers 8 kW at 30 % thermal efficiency, it consumes fuel energy at about 27 kW. Compare that with the 1.2 kW drawn by the charger in the worked example above, and with a petrol pump delivering 30 L/min, which transfers fuel energy at about 16 MW (30 × 8.9 kWh per minute). Then open the <a href=\"../overview/?mode=elec&part=charge_port\">charge port</a> and <a href=\"../overview/?mode=elec&part=battery\">battery</a> in the Overview."
        },
        {
          "type": "check",
          "q": "m5-24"
        }
      ]
    },
    {
      "id": "m5-safety",
      "title": "Safety, diagnosis and service",
      "lead": "Many workshops treat 48–96 V scooters as low voltage because they look like e-bikes, but anything above 60 V DC is high voltage. Working on one safely depends on strict isolation rules, faults are found with a short list of electrical tests, and the service schedule is shorter than a petrol bike's but still covers bearings, final drive, brakes, tyres and connectors.",
      "blocks": [
        {
          "type": "h3",
          "text": "High-voltage classes"
        },
        {
          "type": "table",
          "head": [
            "Class (UNECE R100, R136)",
            "DC",
            "AC (RMS)"
          ],
          "rows": [
            [
              "A",
              "0–60 V",
              "0–30 V"
            ],
            [
              "B",
              "above 60 V, up to 1,500 V",
              "above 30 V, up to 1,000 V"
            ]
          ]
        },
        {
          "type": "p",
          "html": "What counts is the <strong>working voltage</strong>, the highest the circuit can reach, not the label. A 48 V NMC pack (13S, 54.6 V maximum) stays in class A. A 60 V pack (16S or 17S, 67.2–71.4 V) and every 72 V or 96 V pack is <strong>class B</strong> when charged. Class B needs orange cables, warning labels, protection against contact, and isolation of at least <strong>100 Ω/V</strong> DC (500 Ω/V AC) to chassis."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "What makes a two-wheeler pack dangerous",
          "html": "Even where a shock may not be fatal, three hazards remain: <strong>arc flash</strong> and molten metal from a short across terminals (a 72 V pack can deliver several thousand amps, enough to vaporise a spanner); <strong>heat and fire</strong> from damaged cells; and <strong>stored energy</strong> in DC-link capacitors and a spinning motor. Treat every pack as live until isolated and verified. Remove watches, rings and jewellery."
        },
        {
          "type": "check",
          "q": "m5-25"
        },
        {
          "type": "h3",
          "text": "PPE and instruments"
        },
        {
          "type": "p",
          "html": "Class 0 insulating gloves (IEC 60903) with leather over-gloves, air-tested before each use and electrically retested every six months; safety glasses (arc-rated face shield for exposed busbars); IEC 60900 insulated tools; insulating mat and barriers; a <strong>CAT III 1,000 V</strong> meter; a milliohm meter; an insulation tester (250, 500, 1,000 V); an oscilloscope; a CAN interface; a rescue hook."
        },
        {
          "type": "h3",
          "text": "Safe isolation"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Key off, 12 V off",
              "html": "Record fault codes and SOC, remove the key so the contactors open, then disconnect the 12 V auxiliary battery so nothing can re-close them."
            },
            {
              "title": "Remove the service disconnect",
              "html": "Or the pack or main connector, and keep it on your person."
            },
            {
              "title": "Wait",
              "html": "Typically 5–10 minutes, or the maker's time, for the DC-link capacitors to bleed down. 2,000 µF with a 10 kΩ bleeder: τ = 20 s, 5τ = 100 s. Don't turn the rear wheel meanwhile."
            },
            {
              "title": "Verify zero: live-dead-live",
              "html": "Prove the meter on a known live source, measure B+ to B−, each to chassis, and every motor phase pair, then prove the meter again. All below about <strong>1 V</strong>."
            },
            {
              "title": "Lock out, tag out",
              "html": "Cover or lock the disconnect socket, tag it with your name, date and 'Do not energise', and only then start work."
            }
          ]
        },
        {
          "type": "p",
          "html": "Why never skip verification? A failed bleed resistor can leave the capacitors charged for hours. And why prove the meter twice? A dead meter reads zero on a live circuit."
        },
        {
          "type": "check",
          "q": "m5-27"
        },
        {
          "type": "h3",
          "text": "Insulation resistance"
        },
        {
          "type": "p",
          "html": "Apply a DC test voltage between the isolated HV circuit and chassis, with control electronics disconnected (500 V can destroy semiconductors). Use 250 or 500 V for systems up to about 100 V. The regulatory floor is <strong>R_iso,min = 100 Ω/V × V_max</strong>, 8.4 kΩ for an 84 V pack, but a healthy system reads in the <strong>megaohms</strong>, usually above 1 MΩ and often above 100 MΩ. A value that falls with each test means moisture or damaged insulation."
        },
        {
          "type": "check",
          "q": "m5-26"
        },
        {
          "type": "h3",
          "text": "Fire response"
        },
        {
          "type": "p",
          "html": "Burning cells make their own heat and oxygen-containing products, so smothering fails, and cooled cells can re-ignite hours or days later. If smoke or venting begins: <strong>evacuate and call the fire service</strong>; do not open the pack. Large quantities of <strong>water</strong> cool cells best; an AVD extinguisher can handle a small pack. Class D powder and CO2 do not cool cells. Move a pack outdoors (5–10 m from buildings) only if it is not burning or venting, then quarantine it for 24–48 hours with temperature monitoring."
        },
        {
          "type": "h3",
          "text": "Diagnostic tests"
        },
        {
          "type": "p",
          "html": "Always start with fault codes, freeze-frame and live data (cell voltages, currents, temperatures, throttle voltage, Hall state, SOC). Record codes before clearing them."
        },
        {
          "type": "table",
          "head": [
            "Test",
            "Healthy result",
            "Fault signs"
          ],
          "rows": [
            [
              "Phase resistance U-V, V-W, W-U (four-wire or 10 A injection)",
              "20–200 mΩ hub, 5–30 mΩ mid-drive, within 5 %",
              "Two high pairs sharing one phase: bad joint in that phase; open: broken winding; one low: shorted turns"
            ],
            [
              "Hall states, wheel turned slowly",
              "Six valid states, one bit changing per step",
              "000 or 111, or a missing / repeated state"
            ],
            [
              "Throttle signal",
              "About 0.8 V closed to 4.2 V open, smooth",
              "Near 0 V or 5 V at rest: broken earth, signal or sensor"
            ],
            [
              "Contactor",
              "50–100 mV drop at rated current",
              "Higher drop: pitted contacts; closed without coil voltage: welded"
            ],
            [
              "Pre-charge",
              "DC link to 90–95 % in 0.2–2 s before the click",
              "Slow rise: failed resistor, leaky capacitor, short downstream"
            ],
            [
              "Cell group spread at rest (NMC)",
              "Below 10–20 mV",
              "20–50 mV drifting; 50–100 mV investigate; over 100 mV or a group below 3.0 V: remove from service"
            ],
            [
              "Capacity test",
              "Discharge at C/3–C/5 from full",
              "SOH = measured / rated capacity"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Imbalance (%) = (R_max − R_min) / R_avg × 100. A group that drifts low again within days after balancing has high self-discharge, an internal soft short that can start a fire."
        },
        {
          "type": "check",
          "q": "m5-28"
        },
        {
          "type": "check",
          "q": "m5-30"
        },
        {
          "type": "h3",
          "text": "Job sheet 5.6.2: Testing motor phases and Hall sensors"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Isolate",
              "html": "Follow the safe isolation steps above, then disconnect the three phase connectors and the Hall connector at the controller; record any heat discolouration or loose crimps."
            },
            {
              "title": "Phase resistance",
              "html": "Measure U-V, V-W and W-U with a milliohm meter or 10 A injection. Typical 20–200 mΩ (hub) or 5–30 mΩ (mid-drive); imbalance above <strong>5 %</strong> means a poor joint or winding damage, open means a broken phase."
            },
            {
              "title": "Insulation",
              "html": "Each phase to casing at 500 V with the Hall wires kept clear: below <strong>1 MΩ</strong> means moisture or failed winding insulation."
            },
            {
              "title": "Hall states",
              "html": "Supply 5 V and earth (with 1 kΩ pull-ups), turn the wheel slowly forward and record one electrical cycle: six valid states, one bit changing per step, never 000 or 111. If one is missing, check supply, wire continuity through the axle cable and water in the connector before condemning the sensor."
            },
            {
              "title": "Back-EMF (optional)",
              "html": "Spin the wheel steadily with phases open: three equal waveforms 120° apart on the oscilloscope."
            },
            {
              "title": "Reconnect",
              "html": "Run the controller’s Hall self-learning routine if a sensor or motor was replaced, then test on the stand."
            },
            {
              "title": "Pass criteria",
              "html": "Phases balanced within 5 %, none open, insulation above 1 MΩ, six valid Hall states in sequence, equal back-EMF."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Job sheet 5.6.3: Battery pack inspection and cell balance check"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Read the BMS",
              "html": "After at least 30 minutes at rest, record SOC, SOH, pack and group voltages, temperatures, cycle count and stored faults."
            },
            {
              "title": "Spread and sum",
              "html": "Group spread at rest should be below <strong>20 mV</strong> (NMC) with no group below <strong>3.0 V</strong>. The sum of groups should match pack voltage within about 0.5 %; a mismatch points to a faulty channel or balance lead."
            },
            {
              "title": "Inspect the enclosure",
              "html": "Isolate, remove the pack as the maker specifies and look for cracks, dents, swelling, corrosion, water marks, damaged seals, burnt pins and a blocked vent."
            },
            {
              "title": "Measure",
              "html": "Terminal voltage against the BMS reading; insulation from each terminal to the enclosure above <strong>1 MΩ</strong>. Never open a sealed pack unless trained, authorised and permitted by the manufacturer."
            },
            {
              "title": "Balance and recheck",
              "html": "If the spread exceeds 20 mV, fully charge and leave on the charger for the balancing period, rest and recheck. A group that falls again within 48–72 hours, or any group below 3.0 V, condemns the pack."
            },
            {
              "title": "Pass criteria",
              "html": "No damage or ingress, BMS and terminal voltages agree, spread below 20 mV after balancing, no group below 3.0 V, insulation above 1 MΩ, no critical stored faults."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Job sheet 5.6.4: Controller and throttle fault diagnosis"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Codes and live data first",
              "html": "Record fault codes, throttle voltage, brake and side-stand switch states and Hall state before any physical test."
            },
            {
              "title": "Throttle",
              "html": "Back-probe with the wheel raised: 5.0 ± 0.25 V supply, earth within 0.1 V of controller B−, signal rising smoothly from about 0.8 V to 4.2 V."
            },
            {
              "title": "Interlocks",
              "html": "Each brake switch must change state with its lever, and the side-stand switch must allow drive only with the stand up."
            },
            {
              "title": "Pre-charge",
              "html": "At key-on the DC-link voltage must reach <strong>90–95 %</strong> of pack voltage before the contactor clicks."
            },
            {
              "title": "Power stage",
              "html": "Isolate, disconnect phases and battery, then diode-test each phase to B+ and B− in both directions: about 0.3–0.6 V one way and open the other. Near 0 V both ways is a shorted switch. Look for swollen capacitors, burnt odour, water at the glands and loose terminals."
            },
            {
              "title": "Parameters and road test",
              "html": "If the hardware tests good, check programmed limits, cut-off voltage and pole pairs against the maker’s values, repeat Hall learning, then road test while logging currents and temperatures."
            },
            {
              "title": "Pass criteria",
              "html": "Throttle in range and smooth, interlocks working, pre-charge within limits, no shorted or open switches, correct parameters, no codes after the road test."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Troubleshooting at a glance"
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Likely cause"
          ],
          "rows": [
            [
              "No power, dash dark",
              "Flat 12 V battery, BMS asleep or tripped, blown main fuse, key switch"
            ],
            [
              "Dash on, no drive",
              "Side stand or brake switch, throttle fault, contactor not closing"
            ],
            [
              "Judder at take-off, fine at speed",
              "Hall sensor or wiring, wrong Hall angle after repair"
            ],
            [
              "Growls, vibrates, low power",
              "Open phase or high-resistance phase connector"
            ],
            [
              "Wheel notchy or locks when pushed",
              "Shorted controller switch or motor winding"
            ],
            [
              "Cut-out under hard acceleration",
              "Weak cell group, high pack resistance, BMS overcurrent"
            ],
            [
              "No regen",
              "Battery full or cold, ride-mode setting, brake switch fault"
            ],
            [
              "Charger won't start",
              "Pack too cold or hot, BMS fault, communication, wrong charger"
            ]
          ]
        },
        {
          "type": "plate",
          "id": "EL02",
          "caption": "Electrical component map: use it to trace a symptom back to the part to test."
        },
        {
          "type": "h3",
          "text": "Maintenance compared with petrol"
        },
        {
          "type": "p",
          "html": "No engine oil, filters, spark plugs, valve adjustment, exhaust or clutch. What still needs attention:"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Bearings and axle",
              "html": "Hub motors carry the wheel bearings; check play, axle nut torque and torque arms."
            },
            {
              "title": "Final drive",
              "html": "Belts: tension and cracked teeth, no lube. Chains wear faster under instant torque."
            },
            {
              "title": "Brakes",
              "html": "Regen saves rear pads, but little-used discs and calipers corrode; fluid every two years."
            },
            {
              "title": "Tyres",
              "html": "Heavier bikes and abrupt torque wear rears faster; check pressure weekly."
            },
            {
              "title": "Connectors and charge port",
              "html": "Look for discolouration, looseness, corrosion and burnt pins."
            },
            {
              "title": "12 V battery, software, battery health",
              "html": "A flat auxiliary battery stops the bike waking; record software versions; read SOH and imbalance."
            }
          ]
        },
        {
          "type": "check",
          "q": "m5-29"
        },
        {
          "type": "h3",
          "text": "Converting petrol bikes to electric"
        },
        {
          "type": "p",
          "html": "Attractive for large fleets of serviceable petrol frames such as East African boda bodas. <strong>Legal first:</strong> the original type approval no longer covers the vehicle; it needs inspection and individual approval or re-registration (the RDW in the Netherlands; AIS-123 for kits in India), and the insurer must be told. <strong>Engineering:</strong> battery placement changes weight distribution and steering; the engine may have been a stressed frame member; the chain must take the motor's low-speed torque; and the build needs fusing, isolation, contactor and pre-charge, a charging interlock and a DC-DC converter for the 12 V loads."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "yrrH1W4tgVg",
              "title": "I'm cutting into Harley's $100m motorcycle myself",
              "channel": "Bikes and Beards",
              "channel_url": "http://www.youtube.com/@BikesandBeards",
              "duration": "34:13",
              "role": "Case study",
              "note": "Cutting into a failed electric bike pack; high voltage risk, advanced case study, not a DIY guide."
            },
            {
              "id": "f6yDy2KcBlI",
              "title": "Attempting the Repair Harley Told me was Impossible. $100m Motorcycle",
              "channel": "Bikes and Beards",
              "channel_url": "http://www.youtube.com/@BikesandBeards",
              "duration": "35:53",
              "role": "Case study",
              "note": "Attempted repair of a failed electric bike pack; high voltage risk, advanced case study only."
            },
            {
              "id": "8j04GyMHxbg",
              "title": "Everyone was WRONG about why Harley $100m Motorcycle Failed",
              "channel": "Bikes and Beards",
              "channel_url": "http://www.youtube.com/@BikesandBeards",
              "duration": "1:10:48",
              "role": "Case study",
              "note": "Follow-up on why an electric bike pack failed; advanced diagnosis story, high voltage, not a DIY guide."
            }
          ]
        }
      ]
    }
  ]
};
