/* Motopedia: Module 6 lessons. Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "electric",
  "num": "6",
  "title": "Electric motorcycles",
  "intro": "How electric two-wheelers turn stored electrochemical energy into traction, and how to inspect, diagnose and service their motors, controllers, batteries and chargers safely.",
  "pdf": "motopedia-module-5-electric.pdf",
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
          "html": "The word \"e-scooter\" covers two quite different machines. The seated step-through scooter is an L1e or L3e vehicle; the stand-up kick scooter is regulated nationally in most EU states as a personal light electric vehicle outside the L categories. This module deals with seated machines and motorcycles. The electrical principles apply equally to pedelecs and kick scooters, which simply run at lower voltage (24–48 V) and power."
        },
        {
          "type": "p",
          "html": "The thresholds shape the engineering. A pedelec gets by with a <strong>36 or 48 V</strong> system and a 0.4–0.8 kWh battery. A 45 km/h moped needs 1.5–3 kW and 1.5–3 kWh. An L3e-A1 commuter needs 3–11 kW continuous, 3–7 kWh, and usually <strong>60–96 V</strong>. Full-size motorcycles with 40–100 kW peak motors use <strong>100–400 V</strong> packs of 10–22 kWh."
        },
        {
          "type": "p",
          "html": "A pedelec motor must also be torque- or cadence-sensed, so that it assists only while the rider pedals. Most markets outside Europe use similar thresholds, often copied from the UNECE definitions, although India, China and the East African states each have national variations, so always check the rules where the machine is registered."
        },
        {
          "type": "check",
          "q": "m5-01"
        },
        {
          "type": "check",
          "q": "m5-02"
        },
        {
          "type": "h3",
          "text": "Why traction systems use high voltage"
        },
        {
          "type": "p",
          "html": "For the same power, current is inversely proportional to voltage, \\(I = P/V\\). A 60 kW drive at 48 V would draw about <strong>1,250 A</strong>; at 300 V it needs <strong>200 A</strong>. Since the \\(I^2 R\\) losses in cables, busbars, connectors and switches grow with the square of current, a low-voltage system needs very heavy conductors and very large switching devices to keep those losses and the heat they make acceptable."
        },
        {
          "type": "eq",
          "id": "m5-cable-loss",
          "name": "Conduction loss at a given power and voltage",
          "tex": "P_{\\mathrm{loss}} = I^2 R = \\left( \\frac{P}{V} \\right)^2 R",
          "where": [
            [
              "P_{\\mathrm{loss}}",
              "heat generated in the conductors and contacts",
              "W"
            ],
            [
              "P",
              "power delivered to the load",
              "W"
            ],
            [
              "V",
              "system voltage",
              "V"
            ],
            [
              "R",
              "total resistance of cables, connectors and switches in the current path",
              "Ω"
            ]
          ],
          "why": "It shows why traction voltage rises with power: for the same wiring, doubling the voltage cuts the conduction loss to a quarter, so full-size electric motorcycles use 100–400 V packs rather than 48–72 V.",
          "example": "For 60 kW through an illustrative path resistance of \\(R = 0.01\\ \\Omega\\): at 48 V, \\(P_{\\mathrm{loss}} = 1250^2 \\times 0.01 \\approx 15.6\\ \\mathrm{kW}\\); at 300 V, \\(P_{\\mathrm{loss}} = 200^2 \\times 0.01 = 400\\ \\mathrm{W}\\)."
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
          "type": "p",
          "html": "The petrol machine converts chemical energy into heat and then into work in the cylinder, with the second law of thermodynamics, throttling, friction and heat loss (Module 2) limiting the result. The electric machine delivers electrical energy directly from the battery, so the chain is a product of a few high efficiencies."
        },
        {
          "type": "eq",
          "id": "m5-battery-to-wheel",
          "name": "Battery-to-wheel efficiency",
          "tex": "\\eta_{\\mathrm{BTW}} = \\eta_{\\mathrm{batt}}\\, \\eta_{\\mathrm{ctrl}}\\, \\eta_{\\mathrm{mot}}\\, \\eta_{\\mathrm{tr}}",
          "where": [
            [
              "\\eta_{\\mathrm{BTW}}",
              "fraction of battery energy that reaches the rear tyre",
              "dimensionless"
            ],
            [
              "\\eta_{\\mathrm{batt}}",
              "battery discharge efficiency",
              "dimensionless"
            ],
            [
              "\\eta_{\\mathrm{ctrl}}",
              "controller (inverter) efficiency",
              "dimensionless"
            ],
            [
              "\\eta_{\\mathrm{mot}}",
              "motor efficiency averaged over the riding cycle",
              "dimensionless"
            ],
            [
              "\\eta_{\\mathrm{tr}}",
              "final drive efficiency (1 for a hub motor)",
              "dimensionless"
            ]
          ],
          "why": "It turns a measured energy at the wheel into the battery energy an electric machine needs, and shows which conversion step costs most. Compared with the 10–20 % urban tank-to-wheel efficiency of a petrol 125, it explains why an electric commuter uses five to six times less energy.",
          "example": "Typical values give \\(\\eta_{\\mathrm{BTW}} \\approx 0.96 \\times 0.97 \\times 0.90 \\times 0.96 \\approx 0.80\\)."
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
              "html": "Battery-to-wheel \\(\\eta \\approx 0.96 \\times 0.97 \\times 0.90 \\times 0.96 \\approx 0.80\\). Grid-to-battery (charger 0.90 × battery charge 0.97) \\(\\approx 0.87\\)."
            }
          ]
        },
        {
          "type": "eq",
          "id": "m5-grid-to-battery",
          "name": "Grid-to-battery (wall-plug) efficiency",
          "tex": "\\eta_{\\mathrm{GTB}} = \\eta_{\\mathrm{chg}}\\, \\eta_{\\mathrm{bc}}",
          "where": [
            [
              "\\eta_{\\mathrm{GTB}}",
              "fraction of energy taken from the socket that is stored in the battery",
              "dimensionless"
            ],
            [
              "\\eta_{\\mathrm{chg}}",
              "charger efficiency, AC to controlled DC",
              "dimensionless"
            ],
            [
              "\\eta_{\\mathrm{bc}}",
              "battery charge efficiency (resistive and coulombic loss)",
              "dimensionless"
            ]
          ],
          "why": "Running costs and solar sizing are based on energy from the grid, not energy in the battery. This factor converts one into the other.",
          "example": "With a 90 % charger and 97 % charge efficiency, \\(\\eta_{\\mathrm{GTB}} = 0.90 \\times 0.97 \\approx 0.87\\), so 3.6 kWh in the battery costs about \\(3.6 / 0.87 \\approx 4.1\\ \\mathrm{kWh}\\) from the socket."
        },
        {
          "type": "p",
          "html": "The motor term is an average over a real riding cycle. Motors reach 92–96 % at their best point but drop to 70–85 % at low speed and high torque, which is where an urban commuter spends much of its time. A chain or belt loses 2–5 %; a hub motor avoids this loss but usually runs at a less favourable point on its efficiency map, because it turns at wheel speed."
        },
        {
          "type": "h3",
          "text": "Worked comparison: petrol 125 against electric"
        },
        {
          "type": "p",
          "html": "A 125 cc EFI commuter such as the K-Light 125 or a Honda CG125 typically uses about 2.0–2.8 L/100 km in mixed riding. Take 2.5 L/100 km. Petrol has a lower heating value of about 32 MJ/L, or 8.9 kWh/L, and an urban tank-to-wheel efficiency of about 13 % is assumed."
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
          "html": "Measured consumption of 125-equivalent electric commuters, typically <strong>2–4 kWh/100 km</strong> at the battery terminals, agrees with this estimate. The spread depends on speed, payload and terrain: aerodynamic drag rises with the square of speed, so the same machine may use 2.5 kWh/100 km at 40 km/h and 5 kWh/100 km at 80 km/h. Regenerative braking (Chapter 6.3) also recovers some kinetic energy that the petrol bike turns into brake heat."
        },
        {
          "type": "p",
          "html": "So the electric machine needs about <strong>4 kWh</strong> from the grid where the petrol machine burns about <strong>22 kWh</strong> of fuel, a factor of five to six. A Nairobi boda boda covering 120 km a day burns about 3 L of petrol; the electric equivalent needs 4–5 kWh. The catch is storage: petrol holds about <strong>12,000 Wh/kg</strong>, a lithium-ion pack <strong>120–180 Wh/kg</strong>. That is why electric bikes carry less energy and are designed around swapping or fast charging."
        },
        {
          "type": "p",
          "html": "Mass makes the same point. 22 kWh of petrol weighs about 18 kg including a light tank, while 3.6 kWh of lithium-ion battery weighs 18–25 kg. The efficient electric drive recovers part of the storage gap, but not all of it."
        },
        {
          "type": "callout",
          "tone": "elec",
          "title": "Primary energy and emissions",
          "html": "Battery-to-wheel efficiency says nothing about how the electricity was generated. A well-to-wheel comparison must include power-station efficiency, transmission losses and the grid mix. In Kenya, where geothermal, hydro and wind supply roughly 85–90 % of grid electricity, an electric motorcycle has a far lower carbon intensity per kilometre than on a coal-heavy grid. Battery manufacture adds an embedded emission that is paid back over the first several thousand kilometres."
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
          "type": "p",
          "html": "The traction path carries tens to hundreds of amps between the battery and the motor. The control path is a low-voltage network of sensors and processors that decides how much of that current flows and when. Most faults on an electric machine are found by asking first which of the two paths has failed."
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
          "type": "h3",
          "text": "Contactors, fuse and the 12 V side"
        },
        {
          "type": "p",
          "html": "High-voltage packs switch <strong>both poles</strong> with separate contactors. A single-pole break would leave the other pole connected to the vehicle wiring, so an insulation fault on that side combined with a second fault could still expose a person to pack voltage. Two contactors also give redundancy if one welds closed."
        },
        {
          "type": "p",
          "html": "The main fuse must be DC-rated: an AC arc goes out at each current zero, a DC arc does not, so DC fuses use sand-filled bodies and longer elements. On the low-voltage side, some machines keep a small 12 V lead-acid or lithium battery so the electronics can wake up and close the contactor; others wake the DC-DC converter directly from the traction pack. On high-voltage machines the DC-DC converter is transformer-isolated, so the chassis-referenced 12 V system has no galvanic connection to the traction circuit."
        },
        {
          "type": "p",
          "html": "On simple machines the controller doubles as the vehicle brain. A separate VCU also blocks regeneration when the BMS reports a full or cold battery. Connected machines (Ather, Gogoro, Zero) add a telematics unit with a cellular modem that reports location, battery data and faults and receives over-the-air software updates, so the installed software version is part of the service record."
        },
        {
          "type": "p",
          "html": "Before the controller will drive, the vehicle checks its <strong>interlocks</strong>. An electric machine has no clutch and no engine noise to warn anyone nearby, so drive is blocked until the conditions are right: side stand up, kill or run switch on, throttle fully closed at start-up and, on many models, a brake held while the start button is pressed. Some scooters add a seat switch, and on many machines pulling a brake cuts drive."
        },
        {
          "type": "p",
          "html": "A bike that will not go to ready is therefore checked switch by switch, on a stand with the drive wheel off the ground, watching the dashboard symbol for each one before any high-voltage fault is suspected. A brake switch stuck on, a dirty run switch or a throttle wire stretched at full lock can each block or cut drive. Interlocks are never bridged: they stop the bike moving while someone stands next to it (<a href=\"../repair/repairs/ev-interlock-check/\">interlock check</a>)."
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
          "type": "eq",
          "id": "m5-rc-time-constant",
          "name": "RC time constant",
          "tex": "\\tau = R\\,C",
          "where": [
            [
              "\\tau",
              "time constant",
              "s"
            ],
            [
              "R",
              "resistance the capacitor charges or discharges through",
              "Ω"
            ],
            [
              "C",
              "capacitance",
              "F"
            ]
          ],
          "why": "It sets how fast the DC-link capacitors of a controller charge through the pre-charge resistor at key-on, and how fast they bleed down after the pack is disconnected.",
          "example": "100 Ω and 2,000 µF give \\(\\tau = 100 \\times 0.002 = 0.2\\ \\mathrm{s}\\)."
        },
        {
          "type": "eq",
          "id": "m5-rc-charging",
          "name": "Capacitor voltage while charging through a resistor",
          "tex": "V_C(t) = V_{\\mathrm{pack}} \\left( 1 - e^{-t/\\tau} \\right)",
          "where": [
            [
              "V_C",
              "DC-link capacitor voltage",
              "V"
            ],
            [
              "V_{\\mathrm{pack}}",
              "pack voltage applied through the pre-charge resistor",
              "V"
            ],
            [
              "t",
              "time since the pre-charge relay closed",
              "s"
            ],
            [
              "\\tau",
              "time constant RC",
              "s"
            ]
          ],
          "why": "The BMS or controller checks that the DC link reaches 90–95 % of pack voltage within a set time before closing the main contactor. This curve gives that time and shows what a slow pre-charge means.",
          "example": "At \\(t = 3\\tau\\), \\(V_C = V_{\\mathrm{pack}} (1 - e^{-3}) \\approx 0.95\\, V_{\\mathrm{pack}}\\); at \\(t = 5\\tau\\) it exceeds \\(0.99\\, V_{\\mathrm{pack}}\\)."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Time constant",
              "v": "\\(\\tau = RC\\)",
              "p": "\\(100\\ \\Omega \\times 2000\\ \\mu\\mathrm{F} = 0.2\\ \\mathrm{s}\\)"
            },
            {
              "l": "95 % charged",
              "v": "\\(3\\tau = 0.6\\ \\mathrm{s}\\)",
              "p": "over 99 % after \\(5\\tau = 1.0\\ \\mathrm{s}\\)"
            },
            {
              "l": "Resistor peak",
              "v": "≈ 52 W",
              "p": "\\(72^2 / 100\\), for a fraction of a second; energy \\(\\tfrac12 C V^2 \\approx 5.2\\ \\mathrm{J}\\)"
            }
          ]
        },
        {
          "type": "eq",
          "id": "m5-capacitor-energy",
          "name": "Energy stored in a capacitor",
          "tex": "E = \\tfrac{1}{2}\\, C\\, V^2",
          "where": [
            [
              "E",
              "stored energy",
              "J"
            ],
            [
              "C",
              "capacitance",
              "F"
            ],
            [
              "V",
              "capacitor voltage",
              "V"
            ]
          ],
          "why": "The pre-charge resistor absorbs this energy at every key-on, so it sizes the resistor. It is also the energy a charged DC link can dump into a spanner or a hand after the pack has been disconnected.",
          "example": "For 2,000 µF at 72 V, \\(E = 0.5 \\times 0.002 \\times 72^2 \\approx 5.2\\ \\mathrm{J}\\)."
        },
        {
          "type": "p",
          "html": "The resistor sees its peak power \\(V^2/R\\) only for a fraction of a second, so a 5–10 W wirewound resistor rated for pulse energy is adequate. The danger is a resistor that is asked to pre-charge into a short: it then dissipates full power continuously and burns open, which is why the controller times out and logs a fault."
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
          "type": "h3",
          "text": "CAN bus"
        },
        {
          "type": "p",
          "html": "The controller area network (ISO 11898) links the BMS, controller, VCU, charger, DC-DC converter and dashboard on one twisted pair. The BMS broadcasts cell voltages, temperatures, SOC and current limits; the controller broadcasts speed, torque, phase current, temperatures and faults. Many low-cost controllers use a UART or single-wire protocol to the dashboard instead, which limits diagnostic access to that maker's tool."
        },
        {
          "type": "p",
          "html": "The two 120 Ω terminators sit in parallel across the pair, so a healthy bus measures \\(R = \\frac{120 \\times 120}{120 + 120} = 60\\ \\Omega\\) between CAN-H and CAN-L with the power off."
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
              "Bajaj Chetak",
              "India",
              "Step-through scooter, frame-mounted motor, fixed pack of roughly 3 kWh class"
            ],
            [
              "Super Soco",
              "China, export",
              "48–72 V removable packs, rear hub motors on the smaller models"
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
          "type": "p",
          "html": "The business model shapes the engineering. A premium machine's fixed pack is its most expensive single part and is designed to last the life of the vehicle. A swap pack must survive thousands of insertions, rough handling, shared use by many riders and charging at high rates in the station, and its BMS must identify the pack and log its history for the operator. Model years change specifications, so always check current data for the machine being serviced."
        },
        {
          "type": "check",
          "q": "m5-05"
        },
        {
          "type": "check",
          "q": "m5-31"
        },
        {
          "type": "check",
          "q": "m5-32"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Regulatory limits are continuous 30-minute ratings; peak power can be two to three times higher.<br>Conduction loss scales with \\((P/V)^2\\), so higher-power machines use higher pack voltages.<br>Battery-to-wheel efficiency is about 80 %, against 10–20 % tank-to-wheel for a petrol 125 in town.<br>Pre-charge limits inrush into the DC-link capacitors; the time constant \\(\\tau = RC\\) sets how long it takes.<br>A healthy, correctly terminated CAN bus reads about 60 Ω between CAN-H and CAN-L with the power off."
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
          "html": "A conductor carrying current through a magnetic field feels a force at right angles to both, the <strong>Lorentz force</strong>. In a motor many conductors, arranged in coils on the stator, sit in the field of magnets on the rotor (or the reverse), and the forces at the air-gap radius \\(r\\) add up to torque. All the geometry and magnet strength fold into one number, the torque constant \\(K_t\\), so torque is proportional to current. That is why a controller regulates <em>current</em> when the rider asks for torque."
        },
        {
          "type": "eq",
          "id": "m5-lorentz-force",
          "name": "Force on a current-carrying conductor (Lorentz force)",
          "tex": "F = B\\,I\\,L",
          "where": [
            [
              "F",
              "force on the conductor, at right angles to field and current",
              "N"
            ],
            [
              "B",
              "magnetic flux density in the air gap",
              "T"
            ],
            [
              "I",
              "current in the conductor",
              "A"
            ],
            [
              "L",
              "active length of conductor inside the field",
              "m"
            ]
          ],
          "why": "It is where all electric-motor torque comes from. A stronger magnet, more current or more conductor length in the gap gives more force; multiplied by the air-gap radius it gives torque.",
          "example": "In a rare-earth motor \\(B\\) is typically 0.8–1.1 T. An illustrative single conductor with \\(B = 1.0\\ \\mathrm{T}\\), \\(I = 100\\ \\mathrm{A}\\) and \\(L = 0.05\\ \\mathrm{m}\\) feels \\(F = 1.0 \\times 100 \\times 0.05 = 5\\ \\mathrm{N}\\); a motor has hundreds of such conductors."
        },
        {
          "type": "eq",
          "id": "m5-torque-constant",
          "name": "Motor torque from current",
          "tex": "T = K_t\\, I",
          "where": [
            [
              "T",
              "motor shaft torque",
              "N·m"
            ],
            [
              "K_t",
              "torque constant: turns, magnet strength and geometry combined",
              "N·m/A"
            ],
            [
              "I",
              "phase current",
              "A"
            ]
          ],
          "why": "A controller sets torque by setting current. The same relation shows why a phase-current limit sets launch torque and why a weakened magnet (lower (K_t)) makes a motor pull less at the same current.",
          "example": "With \\(K_t = 0.19\\ \\mathrm{N\\,m/A}\\), 200 A gives \\(T = 0.19 \\times 200 \\approx 38\\ \\mathrm{N\\,m}\\)."
        },
        {
          "type": "h3",
          "text": "Back-EMF follows speed"
        },
        {
          "type": "p",
          "html": "A spinning motor is also a generator (Faraday's law). The voltage it induces, <strong>back-EMF</strong>, opposes the supply and rises in proportion to speed. The speed constant \\(K_v\\) (rpm per volt) is the no-load speed reached per volt of supply. For an ideal machine in SI units, \\(K_t \\approx 9.55 / K_v\\)."
        },
        {
          "type": "eq",
          "id": "m5-back-emf",
          "name": "Back-EMF",
          "tex": "E = K_e\\, \\omega",
          "where": [
            [
              "E",
              "back-EMF induced in the winding",
              "V"
            ],
            [
              "K_e",
              "back-EMF constant",
              "V·s/rad"
            ],
            [
              "\\omega",
              "rotor angular speed (Module 1)",
              "rad/s"
            ]
          ],
          "why": "Back-EMF sets top speed: as the motor speeds up, E approaches the voltage the controller can apply, the voltage left to push current falls to zero and torque collapses. Measuring it with the motor spun at a known speed also checks the magnets.",
          "example": "A motor with \\(K_e = 0.19\\ \\mathrm{V\\,s/rad}\\) at 3,000 rpm (\\(\\omega \\approx 314\\ \\mathrm{rad/s}\\)) generates \\(E \\approx 0.19 \\times 314 \\approx 60\\ \\mathrm{V}\\)."
        },
        {
          "type": "eq",
          "id": "m5-kt-kv",
          "name": "Torque constant from speed constant",
          "tex": "K_t = K_e = \\frac{60}{2\\pi K_v} \\approx \\frac{9.55}{K_v}",
          "where": [
            [
              "K_t",
              "torque constant",
              "N·m/A"
            ],
            [
              "K_e",
              "back-EMF constant",
              "V·s/rad"
            ],
            [
              "K_v",
              "speed constant, no-load speed per volt",
              "rpm/V"
            ]
          ],
          "why": "Motor sellers often quote only (K_v). This converts it into torque per amp, so a motor, a pack voltage and a controller current rating can be matched. It holds because the electrical power (E I) converted equals the mechanical power (T omega).",
          "example": "\\(K_v = 40\\ \\mathrm{rpm/V}\\) gives \\(K_t \\approx 9.55 / 40 \\approx 0.24\\ \\mathrm{N\\,m/A}\\), so 250 A gives about 60 N·m."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "\\(K_v = 50\\ \\mathrm{rpm/V}\\) on 72 V",
              "v": "≈ 3,600 rpm",
              "p": "no-load speed, less under load"
            },
            {
              "l": "\\(K_t\\)",
              "v": "≈ 0.19 N·m/A",
              "p": "\\(9.55 / 50\\)"
            },
            {
              "l": "At 200 A",
              "v": "≈ 38 N·m",
              "p": "\\(0.19 \\times 200\\)"
            }
          ]
        },
        {
          "type": "p",
          "html": "Fewer turns give higher \\(K_v\\) (faster) but lower \\(K_t\\) (less torque per amp): the same power, but more current for the same torque. Choosing a winding is a matching exercise between motor, pack voltage and controller current rating. Data sheets mix line-to-line, per-phase, peak and RMS values, so check the convention before comparing two motors."
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
          "html": "Mechanical power is torque times angular speed, \\(P = T\\,\\omega = T \\times 2\\pi n / 60\\) (Module 1). A mid-drive giving 190 N·m at 3,000 rpm makes about <strong>59.7 kW</strong>; at 6,000 rpm with 95 N·m it makes the same 59.7 kW (constant-power region). A hub motor giving 120 N·m at 600 rpm makes only <strong>7.5 kW</strong>, because it turns at wheel speed."
        },
        {
          "type": "figure",
          "fig": "power-torque",
          "caption": "Enter 190 N·m at 3,000 rpm, then 95 N·m at 6,000 rpm: same power. Then try a hub motor at 600 rpm."
        },
        {
          "type": "check",
          "q": "m5-07"
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
          "type": "p",
          "html": "A brushed motor is simple to control, because a single DC chopper sets its voltage, but the brushes also limit maximum speed. It survives on low-cost mobility scooters, some older e-bikes and early conversions. In a brushless machine the controller replaces the commutator, switching the stator coils from a rotor position sensor or an estimate of position."
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
          "html": "A permanent-magnet motor has several pairs of magnetic poles, so the controller must generate an electrical frequency equal to the mechanical speed times the pole-pair count. A hub motor with 23 pole pairs (46 magnets, a common moped design) at 600 rpm runs at <strong>230 Hz</strong>; a mid-drive with 5 pole pairs at 6,000 rpm at <strong>500 Hz</strong>. Many poles give torque at low speed; few poles keep frequency, iron loss and switching demands in check at high speed."
        },
        {
          "type": "eq",
          "id": "m5-electrical-frequency",
          "name": "Electrical frequency of a permanent-magnet motor",
          "tex": "f_e = \\frac{p\\, n}{60}",
          "where": [
            [
              "f_e",
              "electrical frequency the controller must generate",
              "Hz"
            ],
            [
              "p",
              "number of pole pairs",
              "dimensionless"
            ],
            [
              "n",
              "rotor speed",
              "rpm"
            ]
          ],
          "why": "It tells you how fast the controller must switch the phases, and why iron loss rises in high-speed motors. The pole-pair count is also a controller parameter that must match the motor.",
          "example": "23 pole pairs at 600 rpm: \\(f_e = 23 \\times 600 / 60 = 230\\ \\mathrm{Hz}\\)."
        },
        {
          "type": "check",
          "q": "m5-09"
        },
        {
          "type": "h3",
          "text": "Surface versus interior magnets"
        },
        {
          "type": "p",
          "html": "A <strong>surface PM (SPM)</strong> rotor has magnets bonded to its surface. It is magnetically round (\\(L_d = L_q\\)), so torque comes only from the magnets. It suits outer-rotor hub motors. An <strong>interior PM (IPM)</strong> rotor buries the magnets in slots, often in a V. Because magnets behave almost like air, \\(L_q\\) is 2–3 times \\(L_d\\), adding <strong>reluctance torque</strong> and allowing wide field weakening. IPM is the standard for frame-mounted mid-drives (the Zero Z-Force motor is one)."
        },
        {
          "type": "p",
          "html": "Each layout suits its rotor. On an outer-rotor hub motor, centrifugal force presses surface magnets outwards against the rotor ring, so they stay put; inner-rotor SPM machines need a carbon-fibre or glass-fibre sleeve to hold them. In an IPM rotor the iron bridges round each slot retain the magnets mechanically at high speed. Reluctance torque is the tendency of rotor iron to line up with the stator field, the same effect that makes a steel screwdriver snap onto a magnet."
        },
        {
          "type": "h3",
          "text": "Hub motor or mid-drive?"
        },
        {
          "type": "p",
          "html": "A hub motor places an outer-rotor machine inside the wheel. The stator is fixed to the axle, which is clamped in the swingarm and does not turn; the rotor forms the hub and carries the rim. Phase and Hall wires leave through a hollow axle, which is why water in the axle cable is a common Hall fault. Geared hub motors, common on pedelecs, add a planetary reduction so that a smaller, faster motor can be used."
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
          "html": "Unsprung mass matters because the rear suspension must control a much heavier wheel, which degrades grip and ride over bumps. Cooling matters because the stator sheds heat mainly through the axle and the air inside the drum, so a sustained climb at low speed, where current and copper loss are highest, drives winding temperature up quickly. A mid-drive's ratio can be changed with the pulley or sprocket size; most electric motorcycles use a single fixed ratio, because the motor's wide speed range removes the need for a gearbox."
        },
        {
          "type": "p",
          "html": "Road speed follows from the reduction ratio and tyre circumference, as for a petrol bike (Module 5): \\(n_{\\mathrm{wheel}} = n_{\\mathrm{motor}} / i\\) and \\(v = n_{\\mathrm{wheel}}\\, C_{\\mathrm{roll}} \\times 60 / 1000\\) km/h. At 5,000 rpm through a 22/132 belt (\\(i = 6.0\\)) and a 1.93 m tyre circumference: 833 rpm at the wheel, <strong>about 96 km/h</strong>. Wheel torque is multiplied by the ratio: \\(40 \\times 6.0 \\times 0.97 \\approx 233\\ \\mathrm{N\\,m}\\), a tractive force of about 760 N on a 0.307 m rolling radius."
        },
        {
          "type": "check",
          "q": "m5-08"
        },
        {
          "type": "h3",
          "text": "Axial-flux and induction motors"
        },
        {
          "type": "p",
          "html": "<strong>Axial-flux</strong> motors (Emrax, YASA) push flux across a flat disc gap, giving high torque in a pancake shape, but the gap must be held to a fraction of a millimetre against strong magnetic pull. <strong>Induction</strong> motors have no magnets: no rare-earth cost and no back-EMF when unpowered, but lower part-load efficiency and torque density, so they are rare on motorcycles."
        },
        {
          "type": "p",
          "html": "An induction motor's rotating stator field induces currents in a squirrel cage of aluminium or copper bars, and the rotor runs slightly slower than the field (<strong>slip</strong>, typically 2–5 % at rated load). With no magnets it freewheels with no drag and cannot generate a dangerous voltage if the controller fails, but it needs a field-oriented controller that estimates slip. It appears mainly in some industrial-derived conversions."
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
              "html": "The controller injects negative d-axis current to oppose the magnet flux. Torque falls roughly with \\(1/n\\), power stays roughly constant. SPM motors reach about 1.2–1.5× base speed; IPM motors 2.5–4×."
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
          "html": "The difference in field-weakening range explains a design choice. SPM motors have little inductance, so negative d-axis current has little effect; IPM motors with high saliency can keep producing power far above base speed. An IPM mid-drive therefore gives a motorcycle both strong low-speed torque and a usable top speed from one fixed ratio."
        },
        {
          "type": "p",
          "html": "The <strong>peak</strong> curve lasts perhaps 10–30 s and is set by controller current and magnet demagnetisation. The <strong>continuous</strong> curve is set by temperature and is typically <strong>40–60 %</strong> of peak torque. On an efficiency map the best island is <strong>93–96 %</strong> at medium speed and moderate torque; designers pick the ratio so the bike lives near that island."
        },
        {
          "type": "h3",
          "text": "Efficiency maps"
        },
        {
          "type": "p",
          "html": "An efficiency map plots contours of constant efficiency on the torque-speed plane. Efficiency falls at low speed and high torque, where copper loss dominates and little mechanical power is produced, and at high speed and low torque, where iron loss and field-weakening current dominate."
        },
        {
          "type": "p",
          "html": "The designer chooses the reduction ratio so the motor works near its best island in the riding the vehicle actually does: for a city taxi motorcycle, 30–50 km/h at moderate torque; for a touring motorcycle, a 90–120 km/h cruise. A hub motor has no ratio to choose, which is one reason its average efficiency is lower."
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
              "Copper (\\(I^2 R\\))",
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
              "Frequency and flux density, roughly \\(f\\,B^{1.6 \\ldots 2}\\)",
              "Low-loss silicon steel"
            ],
            [
              "Iron eddy current",
              "\\(f^2 B^2 t^2\\), where \\(t\\) is lamination thickness",
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
          "type": "eq",
          "id": "m5-winding-resistance-temperature",
          "name": "Winding resistance against temperature",
          "tex": "R_T = R_0 \\left[ 1 + \\alpha \\left( T - T_0 \\right) \\right]",
          "where": [
            [
              "R_T",
              "winding resistance at temperature T",
              "Ω"
            ],
            [
              "R_0",
              "resistance measured at the reference temperature",
              "Ω"
            ],
            [
              "\\alpha",
              "temperature coefficient of copper, about 0.0039 (0.39 % per kelvin)",
              "1/K"
            ],
            [
              "T, T_0",
              "winding and reference temperatures",
              "°C"
            ]
          ],
          "why": "A hot motor has more copper loss at the same current, so it heats faster still and the controller derates. Phase resistances must also be compared at the same temperature, or a hot winding looks faulty.",
          "example": "A pair reading 50 mΩ at 25 °C reads about \\(50 \\times (1 + 0.0039 \\times 95) \\approx 68.5\\ \\mathrm{m\\Omega}\\) at 120 °C, so copper loss at the same current is about 37 % higher."
        },
        {
          "type": "p",
          "html": "Heat flows from the windings, through the slot insulation and stator iron, to the housing. Hub motors and small mid-drives are air cooled by fins on the housing. Larger mid-drives use a liquid jacket with water-glycol shared with the controller (Energica uses liquid cooling) or oil sprayed onto the end windings. An NTC thermistor, KTY or PT1000 element embedded in the end windings lets the controller derate before the insulation limit."
        },
        {
          "type": "p",
          "html": "Class H insulation (<strong>180 °C</strong>) is common, and each <strong>10 K</strong> above rating roughly halves insulation life. NdFeB magnets lose about 0.11–0.12 % of flux per kelvin (about 11 % less at 120 °C than at 25 °C), and their resistance to demagnetisation falls faster still. A hot magnet hit by a strong opposing field can be <strong>permanently</strong> weakened: the motor then shows lower back-EMF when spun at a known speed."
        },
        {
          "type": "eq",
          "id": "m5-insulation-life",
          "name": "Insulation life against temperature (10 K rule)",
          "tex": "L \\approx L_{\\mathrm{rated}} \\times 2^{-(T - T_{\\mathrm{rated}})/10}",
          "where": [
            [
              "L",
              "expected insulation life",
              "h"
            ],
            [
              "L_{\\mathrm{rated}}",
              "life at the rated temperature of the insulation class",
              "h"
            ],
            [
              "T",
              "actual hot-spot winding temperature",
              "°C"
            ],
            [
              "T_{\\mathrm{rated}}",
              "rated temperature, for example 180 °C for class H",
              "°C"
            ]
          ],
          "why": "It is a rule of thumb, not an exact law, but it explains why persistent overheating shortens motor life even when nothing fails at once, and why derating thresholds sit below the class limit.",
          "example": "Running 20 K above rating gives \\(L \\approx L_{\\mathrm{rated}} \\times 2^{-2} = 0.25\\, L_{\\mathrm{rated}}\\): a quarter of the expected life."
        },
        {
          "type": "h3",
          "text": "Rare-earth magnets and demagnetisation"
        },
        {
          "type": "p",
          "html": "Neodymium-iron-boron (NdFeB) magnets give a <strong>remanence</strong> of 1.2–1.45 T and are the reason modern PM motors are compact. Their weakness is temperature: remanence falls with heat, reducing torque per amp and back-EMF, and <strong>coercivity</strong>, the resistance to demagnetisation, falls faster still, by about 0.5–0.6 % per kelvin."
        },
        {
          "type": "eq",
          "id": "m5-magnet-remanence",
          "name": "Magnet remanence against temperature",
          "tex": "B_r(T) \\approx B_{r,25} \\left[ 1 - \\alpha_B \\left( T - 25 \\right) \\right]",
          "where": [
            [
              "B_r(T)",
              "remanent flux density at magnet temperature T",
              "T"
            ],
            [
              "B_{r,25}",
              "remanence at 25 °C",
              "T"
            ],
            [
              "\\alpha_B",
              "reversible temperature coefficient, about 0.0011–0.0012 for NdFeB",
              "1/K"
            ],
            [
              "T",
              "magnet temperature",
              "°C"
            ]
          ],
          "why": "A hot motor makes less torque per amp and less back-EMF. This reversible loss returns on cooling; the permanent loss from a strong opposing field on a hot magnet does not.",
          "example": "At 120 °C, \\(1 - 0.0012 \\times 95 \\approx 0.89\\): about 11 % less flux than at 25 °C."
        },
        {
          "type": "table",
          "head": [
            "NdFeB grade",
            "Maximum working temperature (typical)"
          ],
          "rows": [
            [
              "N (standard)",
              "about 80 °C"
            ],
            [
              "M",
              "100 °C"
            ],
            [
              "H",
              "120 °C"
            ],
            [
              "SH",
              "150 °C"
            ],
            [
              "UH",
              "180 °C"
            ],
            [
              "EH",
              "200 °C"
            ]
          ]
        },
        {
          "type": "p",
          "html": "High-temperature grades add dysprosium or terbium, heavy rare earths that are costly and concentrated in a few supply chains, so grain-boundary diffusion that places them only at grain surfaces is now widespread. The <strong>Curie temperature</strong>, where magnetism is lost entirely, is 310–400 °C, but practical damage happens far below it. Ferrite magnets are cheaper and free of rare earths but have about a third of the remanence, so ferrite motors are larger and heavier for the same torque."
        },
        {
          "type": "p",
          "html": "A hot magnet hit by a strong opposing field, from high field-weakening current or a short-circuit fault, can lose strength for ever. Check by spinning the motor at a known speed with the phases open and measuring line-to-line back-EMF with an oscilloscope or true-RMS meter: a value below the maker's figure, or below an identical good motor, confirms magnet loss."
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
          "type": "p",
          "html": "Hall sensors need a 5 V (sometimes 12 V) supply and have open-collector outputs pulled up by the controller. Magnetic encoders (a diametric magnet on the shaft end read by a sensor chip) are compact and tolerate dirt. A resolver carries a 5–20 kHz excitation carrier modulated by the sine and cosine of rotor angle, and tolerates heat and vibration. The self-learning routine measures the <strong>Hall angle</strong>, the offset between sensor position and magnet position."
        },
        {
          "type": "check",
          "q": "m5-10"
        },
        {
          "type": "p",
          "html": "In the workshop: a scooter that judders at take-off but runs normally at speed points to the Hall sensors, because many controllers switch to back-EMF estimation above a threshold speed (<a href=\"../repair/repairs/ev-hall-sensor-check/\">check the Hall sensors</a>). Growling with low power points to a phase (<a href=\"../repair/repairs/ev-motor-diagnosis/\">diagnose a motor fault</a>); play or noise at the wheel to the hub bearings (<a href=\"../repair/repairs/ev-hub-motor-check/\">check hub motor bearings</a>); repeated derating to cooling (<a href=\"../repair/repairs/ev-thermal-check/\">check motor and controller cooling</a>)."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "A spinning motor is a generator",
          "html": "A permanent-magnet motor makes voltage whenever it turns, even with the battery disconnected. A hub motor spun by hand can produce tens of volts; a high-voltage IPM motor towed at road speed several hundred. Never connect or disconnect phase wires with the wheel turning, and do not tow with the rear wheel on the ground unless the manufacturer permits it."
        },
        {
          "type": "check",
          "q": "m5-33"
        },
        {
          "type": "check",
          "q": "m5-34"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Torque follows current (\\(T = K_t I\\)) and back-EMF follows speed (\\(E = K_e \\omega\\)); \\(K_t \\approx 9.55/K_v\\).<br>Back-EMF meeting the available voltage sets base speed; field weakening extends speed at roughly constant power, much further on IPM than SPM motors.<br>The controller must generate \\(f_e = p n / 60\\); many poles suit slow hub motors, few poles fast mid-drives.<br>Hub motors save the drive line but add unsprung mass and cool poorly; mid-drives run fast through a fixed reduction.<br>Heat raises copper loss, shortens insulation life (about half per 10 K) and weakens NdFeB magnets, sometimes permanently."
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
          "type": "p",
          "html": "On a MOSFET the freewheeling diode is the device's own body diode; an IGBT needs a separate co-packaged diode. The high-side gate driver floats with the phase node, so it is powered by a bootstrap or isolated supply. If both switches of one leg conduct at once (<strong>shoot-through</strong>) they short the DC link, so the controller inserts a dead time between turning one off and the other on."
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
          "type": "p",
          "html": "The DC-link capacitors are electrolytic in low-voltage controllers and film in high-voltage inverters. Their job is to supply the high-frequency ripple current locally, so that it does not have to come through the inductance of the battery cables; that ripple heats them, and rising equivalent series resistance is how they age. Accurate phase-current measurement is the basis of both torque control and overcurrent protection."
        },
        {
          "type": "h3",
          "text": "Pulse-width modulation"
        },
        {
          "type": "p",
          "html": "The battery voltage is fixed, so the controller switches at a fixed frequency (<strong>8–20 kHz</strong> for MOSFET drives, 5–10 kHz for large IGBT drives) and varies the duty cycle \\(D\\), the fraction of each period the high-side switch is on. Winding inductance smooths the current, so the motor responds to the average voltage. The faint whine of some scooters at low speed is the PWM frequency or its subharmonics exciting the laminations."
        },
        {
          "type": "eq",
          "id": "m5-pwm-average",
          "name": "Average phase voltage under PWM",
          "tex": "V_{\\mathrm{avg}} = D\\, V_{\\mathrm{DC}}",
          "where": [
            [
              "V_{\\mathrm{avg}}",
              "average voltage applied to the phase, relative to the negative rail",
              "V"
            ],
            [
              "D",
              "duty cycle, on-time divided by switching period",
              "dimensionless (0 to 1)"
            ],
            [
              "V_{\\mathrm{DC}}",
              "DC-link (battery) voltage",
              "V"
            ]
          ],
          "why": "It is how a controller with a fixed battery voltage gives the motor a variable voltage: low duty at low speed, rising towards full duty as back-EMF rises with speed.",
          "example": "A 72 V controller at 35 % duty applies \\(V_{\\mathrm{avg}} = 0.35 \\times 72 = 25.2\\ \\mathrm{V}\\)."
        },
        {
          "type": "p",
          "html": "The switching frequency is a compromise. A higher frequency gives smoother current and less acoustic noise but more switching loss in the transistors, which is why large IGBT drives switch more slowly than small MOSFET controllers."
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
          "type": "p",
          "html": "Six-step drive reads the three Hall sensors, which give six states per electrical cycle, and for each state switches on one high-side and one low-side transistor. It needs little processing, so it survives on cheap e-bike and moped controllers. Field-oriented control (FOC, or vector control) treats the three phase currents as one current vector rotating with the rotor and controls its two components separately."
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
          "type": "steps",
          "items": [
            {
              "title": "Clarke transform",
              "html": "The three measured phase currents \\(i_u, i_v, i_w\\) become two orthogonal stationary components \\(i_\\alpha, i_\\beta\\)."
            },
            {
              "title": "Park transform",
              "html": "Using the measured rotor angle, these are rotated into a frame fixed to the rotor: \\(i_d\\) along the magnet axis and \\(i_q\\) at 90° electrical to it. At steady state both are DC quantities, easy to regulate precisely."
            },
            {
              "title": "Regulate and modulate",
              "html": "Two PI regulators hold \\(i_d\\) and \\(i_q\\) at their set points. The outputs are transformed back and applied through space-vector PWM, which uses the DC-link voltage about 15 % more effectively than simple sinusoidal PWM."
            }
          ]
        },
        {
          "type": "p",
          "html": "FOC splits current into \\(i_q\\), which makes torque with the magnet flux, and \\(i_d\\), along the magnet axis, which strengthens or weakens the field. On a surface-magnet motor \\(i_d\\) is held at zero below base speed. On an IPM motor a negative \\(i_d\\) adds reluctance torque (maximum torque per ampere, MTPA) and, above base speed, weakens the field so the motor can run faster."
        },
        {
          "type": "eq",
          "id": "m5-foc-torque",
          "name": "Torque of a permanent-magnet synchronous motor in d-q terms",
          "tex": "T = \\frac{3}{2}\\, p \\left[ \\psi_m\\, i_q + \\left( L_d - L_q \\right) i_d\\, i_q \\right]",
          "where": [
            [
              "T",
              "motor torque",
              "N·m"
            ],
            [
              "p",
              "number of pole pairs",
              "dimensionless"
            ],
            [
              "\\psi_m",
              "magnet flux linkage",
              "V·s (Wb)"
            ],
            [
              "i_d, i_q",
              "d-axis (field) and q-axis (torque) current components",
              "A"
            ],
            [
              "L_d, L_q",
              "d-axis and q-axis inductances",
              "H"
            ]
          ],
          "why": "The first term is magnet torque, the second reluctance torque. It shows why an IPM motor (\\(L_q > L_d\\)) gains torque from negative \\(i_d\\) while a surface-magnet motor (\\(L_d = L_q\\)) does not, and why a controller must know the motor it drives.",
          "example": "For an SPM motor \\(L_d = L_q\\), the second term vanishes and \\(T = \\tfrac32 p\\, \\psi_m i_q\\), so torque is set by \\(i_q\\) alone."
        },
        {
          "type": "p",
          "html": "FOC gives smooth torque down to zero speed, quieter running and precise regenerative braking, and it is the standard on any modern motorcycle controller."
        },
        {
          "type": "h3",
          "text": "Phase current versus battery current"
        },
        {
          "type": "p",
          "html": "Two different limits, often confused. <strong>Phase current</strong> is in the windings and sets torque. <strong>Battery current</strong> is drawn from the pack. They are linked by power balance, not equality: the inverter behaves like a step-down converter, so at low speed, where the motor needs little voltage, phase current can be several times battery current."
        },
        {
          "type": "eq",
          "id": "m5-inverter-power-balance",
          "name": "Inverter power balance",
          "tex": "V_{\\mathrm{DC}}\\, I_{\\mathrm{batt}}\\, \\eta_{\\mathrm{inv}} \\approx P_{\\mathrm{mot,in}}",
          "where": [
            [
              "V_{\\mathrm{DC}}",
              "DC-link (battery) voltage",
              "V"
            ],
            [
              "I_{\\mathrm{batt}}",
              "current drawn from the battery",
              "A"
            ],
            [
              "\\eta_{\\mathrm{inv}}",
              "inverter efficiency",
              "dimensionless"
            ],
            [
              "P_{\\mathrm{mot,in}}",
              "electrical power delivered into the motor phases",
              "W"
            ]
          ],
          "why": "Battery current follows from the power the motor actually takes, not from its phase current. It is why the battery current limit sets peak power.",
          "example": "At a 120 A battery limit on 72 V, the input power is at most \\(72 \\times 120 \\approx 8.6\\ \\mathrm{kW}\\), less sag and losses."
        },
        {
          "type": "eq",
          "id": "m5-battery-phase-current",
          "name": "Battery current from phase current at low speed",
          "tex": "I_{\\mathrm{batt}} \\approx D_{\\mathrm{eff}}\\, I_{\\mathrm{phase}}",
          "where": [
            [
              "I_{\\mathrm{batt}}",
              "battery current",
              "A"
            ],
            [
              "D_{\\mathrm{eff}}",
              "effective duty cycle, the fraction of pack voltage the motor needs",
              "dimensionless"
            ],
            [
              "I_{\\mathrm{phase}}",
              "phase (winding) current",
              "A"
            ]
          ],
          "why": "An approximation for low speed that explains why full launch torque costs little battery current, and why the phase limit and battery limit govern different parts of the speed range.",
          "example": "At \\(D_{\\mathrm{eff}} = 0.25\\), 250 A of phase current draws about \\(0.25 \\times 250 = 62.5\\ \\mathrm{A}\\) from the battery."
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
              "html": "The battery limit governs: phase current and torque must fall. Peak power \\(\\approx 72\\ \\mathrm{V} \\times 120\\ \\mathrm{A} \\approx 8.6\\ \\mathrm{kW}\\), less sag."
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
          "type": "p",
          "html": "Ride modes are sets of these limits. An Eco mode might cap battery current at half the Sport value, limit top speed to 60 km/h and apply strong regen; a Rain mode softens the initial throttle curve and reduces maximum torque to limit wheelspin. Traction control on premium machines compares front and rear wheel speeds and cuts motor torque within milliseconds if the rear spins, faster and more finely than an engine management system cutting ignition."
        },
        {
          "type": "check",
          "q": "m5-15"
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
          "html": "Command negative \\(i_q\\) and the motor's torque opposes rotation: it becomes a generator and kinetic energy flows back through the inverter into the battery. Regen is triggered by closing the throttle (simulating engine braking), by the brake lever switch (often rear only) or by a separate control."
        },
        {
          "type": "p",
          "html": "The energy available is the kinetic energy \\(E_k = \\tfrac12 m v^2\\) (Module 5). Not all of it comes back: rolling resistance and drag absorb some during the stop, the friction brakes take a share in hard stops, and each conversion (tyre, transmission, motor as generator, inverter, battery charge) loses a little."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "250 kg at 50 km/h",
              "v": "≈ 6.7 Wh",
              "p": "\\(\\tfrac12 \\times 250 \\times 13.9^2 \\approx 24\\,100\\ \\mathrm{J}\\)"
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
          "type": "p",
          "html": "At 4 Wh per stop and one stop every 400 m, 100 km of city riding (250 stops) could return about 1 kWh against a consumption of 3–4 kWh/100 km. In practice many decelerations are partial and riders also use the friction brakes, so measured gains are lower. On long descents, such as the escarpment roads west of Nairobi, regen recovers much more and also reduces brake fade."
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
          "type": "p",
          "html": "A rider who charges to 100 % and immediately descends a hill therefore has no regen until some charge is used, and the bike feels as if a brake has failed. Stop-lamp logic must also account for regen: strong off-throttle regen slows the machine as hard as light braking. Car regulations switch the stop lamp on above a deceleration of the order of 1.3 m/s² and forbid it below about 0.7 m/s² for regen alone, and motorcycle makers apply similar logic in the VCU."
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
              "Stall protection",
              "High current at zero speed for a set time: current reduced to protect motor and transistors"
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
          "type": "p",
          "html": "A shorted switch is dangerous at speed: back-EMF drives current through the short and the body diodes of the other low-side switches, producing a sudden braking torque at the rear wheel. If the switch fails while the opposite switch in the same leg turns on, the shoot-through usually blows the main fuse. Phase connectors are high-current bullet or lug joints; a loose or corroded one heats, discolours the insulation and finally burns open. Hall sensors fail from heat (they sit near the windings), water ingress through the axle cable, or a 5 V supply shorted by a chafed cable."
        },
        {
          "type": "p",
          "html": "Other common failures are ageing capacitors (rising ripple, swollen cans, cut-outs under load), water at cable glands, solder joints cracked by vibration and thermal cycling, and burnt Anderson or XT90 battery connectors that have been unplugged under load. Many low-cost controllers flash a power-on self-test code on an LED or the dashboard; the code table in the service documentation is the first reference."
        },
        {
          "type": "check",
          "q": "m5-14"
        },
        {
          "type": "h3",
          "text": "Diagnosing a controller complaint"
        },
        {
          "type": "p",
          "html": "Many controller faults are really a sensor, a switch, a connector or heat. The controller reads the throttle, brakes, stand switch and Hall sensors and cuts or reduces power when something is wrong, so the diagnosis starts with what the controller saw, not with the controller itself. The rider's part is to observe and report; opening the controller or unplugging its power cables is workshop work after isolation, because it holds charged capacitors."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Record the code",
              "html": "Note the code and when it appears: pull-away, a long climb, a hot day, after rain (<a href=\"../repair/repairs/ev-error-read/\">reading error codes</a>)."
            },
            {
              "title": "Interlocks and inputs",
              "html": "Check the stand, brake and kill switches and the throttle return before anything else."
            },
            {
              "title": "Heat pattern",
              "html": "A fault that appears after long climbs, heavy loads or hot days and clears after a rest points to thermal protection, not a broken controller. The controller must not be covered by mud, a bag or a new panel that blocks its air flow."
            },
            {
              "title": "Look, do not touch",
              "html": "Look for melted connectors, burn marks or water near the controller. A burning smell means switch off and stop riding."
            },
            {
              "title": "Workshop: live data",
              "html": "With the manufacturer's tool, read the fault history and live data: throttle signal, temperatures, battery voltage and Hall states. Check the low-voltage supply and fuses to the controller, and the throttle, brake and stand inputs against the manufacturer's values; there is no universal throttle voltage."
            },
            {
              "title": "Workshop: high-voltage side",
              "html": "Isolate the HV system and inspect the power and phase connectors, then check the main contactor and pre-charge circuit by the manual's method."
            },
            {
              "title": "Controller or motor?",
              "html": "Check the Hall sensors and the motor before condemning the controller, and replace it only with the correct part with matching software and settings, followed by a test ride with a climb."
            }
          ]
        },
        {
          "type": "p",
          "html": "Phase connectors need particular care. A loose, corroded or pushed-back pin heats up, can melt, and causes judder, cut-outs and lost power, and it can look like a Hall sensor fault. After isolation, each pin and socket is inspected for heat marks, pitting, corrosion and loose fit and checked to be fully locked into its housing. Damaged connectors are replaced as a matched pair, crimped with the correct tool, never soldered over or taped. The phase order is restored from the manufacturer's diagram, because there is no universal colour code and the wrong order makes the motor judder, run backwards or overheat (<a href=\"../repair/repairs/ev-phase-connector-check/\">phase connector check</a>)."
        },
        {
          "type": "p",
          "html": "A Hall signal stuck high or low in every rotor position points to the sensor, its wire or its pin. Wire colours, pinouts, supply voltage and switching sequence differ between motors and controllers, so only the manufacturer's values are used, and the harness is checked end to end before the motor is opened. Some controllers need a learning step after a sensor or motor change (<a href=\"../repair/repairs/ev-hall-sensor-check/\">Hall sensor check</a>)."
        },
        {
          "type": "p",
          "html": "Missing regeneration is often not a fault at all. A battery at or near 100 % has no room to store energy, a cold battery cannot safely accept charge, and many bikes switch regeneration off in a menu, by riding mode or when any battery, motor or controller fault is logged. A brake switch that does not work stops brake-triggered regeneration, so the brake light is checked from each control (<a href=\"../repair/repairs/ev-regen-check/\">regeneration check</a>)."
        },
        {
          "type": "p",
          "html": "A repaired controller is not finished until the workshop records the code list and the live data that proved the fault, whether software was updated, and whether the controller or the motor was to blame. The final test ride includes a climb, and the result must be full power, normal temperatures and no stored code. If overheating returns, the cooling and the load are investigated; if it is the battery that cuts out rather than the controller, the cause is BMS protection, covered in chapter 6.4."
        },
        {
          "type": "h3",
          "text": "Parameter programming"
        },
        {
          "type": "p",
          "html": "Controllers for light electric motorcycles (Kelly, Sabvoton, Votol, Fardriver, ASI and others) are programmed by laptop software or a phone app over USB-to-serial, Bluetooth or CAN. Changing the parameters alters performance, legal category and reliability, so record the original values before any change."
        },
        {
          "type": "table",
          "head": [
            "Parameter",
            "Effect"
          ],
          "rows": [
            [
              "Battery current limit (A)",
              "Peak power from the pack; must not exceed BMS and cell ratings"
            ],
            [
              "Phase current limit (A)",
              "Launch torque; limited by transistor and motor ratings"
            ],
            [
              "Low- and high-voltage cut-off (V)",
              "Protects cells from over-discharge and the DC link from overvoltage"
            ],
            [
              "Pole pairs and Hall angle",
              "Must match the motor; set by self-learning after motor or sensor replacement"
            ],
            [
              "Throttle range and curve",
              "Closed and full voltages, response shape, ramp rate"
            ],
            [
              "Speed limit and ride modes",
              "Top speed and power per mode; may define the legal category"
            ],
            [
              "Regen current and voltage limits",
              "Regen strength and the highest voltage allowed during regen"
            ],
            [
              "Field-weakening current",
              "Speed above base speed; excessive values overheat or demagnetise the motor"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Fitting a controller to a different motor needs at least the pole-pair count, Hall angle or encoder offset, a phase limit matched to the motor, the motor temperature sensor type and thresholds, field-weakening current and direction of rotation. Practice: <a href=\"../repair/repairs/ev-error-read/\">read the error codes</a>, <a href=\"../repair/repairs/ev-controller-diagnosis/\">diagnose a controller fault</a>, <a href=\"../repair/repairs/ev-phase-connector-check/\">check the phase connectors</a>, <a href=\"../repair/repairs/ev-interlock-check/\">check the interlocks</a> and <a href=\"../repair/repairs/ev-regen-check/\">check regenerative braking</a>."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Derestricting changes the vehicle category",
          "html": "Raising the speed or continuous power limit of a type-approved moped or L3e-A1 machine changes its approval, invalidates insurance and may require a different licence. It also overloads parts: raising battery current from 60 A to 100 A can push each 21700 cell beyond its continuous rating."
        },
        {
          "type": "check",
          "q": "m5-35"
        },
        {
          "type": "check",
          "q": "m5-36"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Six switches in three legs turn DC into three-phase AC; PWM sets the average voltage, \\(V_{\\mathrm{avg}} = D V_{\\mathrm{DC}}\\).<br>FOC controls \\(i_q\\) for torque and \\(i_d\\) for the field; negative \\(i_d\\) gives reluctance torque and field weakening on IPM motors.<br>The phase-current limit sets launch torque; the battery-current limit sets peak power; neither sets top speed.<br>Regen is limited by a full or cold battery, charge-current ratings, rear-wheel grip and low speed.<br>A diode test reading near 0 V both ways on a phase is a shorted switch; illegal Hall states 000 or 111 mean a sensor or wiring fault."
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
          "type": "p",
          "html": "The electrolyte is a lithium salt, usually \\(\\mathrm{LiPF_6}\\), in organic carbonate solvents, held in a porous polymer separator; charging reverses the ion flow. The SEI passivates the graphite and allows stable cycling, but its growth consumes lithium and electrolyte for the whole life of the cell."
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
          "html": "LFP is spreading in commuter and swap packs because its cycle life suits fleets that cycle batteries daily, it contains no cobalt or nickel, and its cathode does not release oxygen in a thermal event, so failures are less violent. Its penalties are lower energy (more mass for the same range), poor performance below 0 °C and a voltage curve so flat between 20 % and 80 % SOC that voltage-based SOC estimation is almost useless. Sodium-ion cells are entering low-cost scooters, using abundant materials and tolerating cold and deep discharge."
        },
        {
          "type": "p",
          "html": "Holders, busbars, BMS and enclosure add mass: a cell-to-pack ratio of <strong>60–75 %</strong> turns 250 Wh/kg cells into 150–180 Wh/kg packs. <strong>21700</strong> cells (21 × 70 mm, 4.0–5.0 Ah, 65–70 g) are now the two-wheeler standard, with about 50 % more energy than an 18650. Cylindrical cells have a steel can, a vent and a current interrupt device, so failures are contained per cell."
        },
        {
          "type": "table",
          "head": [
            "Format",
            "Size",
            "Typical capacity",
            "Notes"
          ],
          "rows": [
            [
              "18650 cylindrical",
              "18 × 65 mm, 45–48 g",
              "2.5–3.5 Ah",
              "Mature and cheap; early Gogoro packs, many e-bike packs"
            ],
            [
              "21700 cylindrical",
              "21 × 70 mm, 65–70 g",
              "4.0–5.0 Ah",
              "The two-wheeler standard"
            ],
            [
              "4680 cylindrical",
              "46 × 80 mm, about 350 g",
              "about 20–25 Ah",
              "Emerging; fewer cells and welds per pack"
            ],
            [
              "Prismatic",
              "Rigid aluminium can, 0.5–5 kg",
              "20–300 Ah",
              "Few large cells, simple assembly, common for LFP"
            ],
            [
              "Pouch",
              "Laminated foil, 0.2–1 kg",
              "10–80 Ah",
              "Best packing; needs external compression and protection"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Energy density trades against power density: cells built for high discharge rates (thinner electrodes, more current collector) store less energy than energy cells of the same size. Many cylindrical cells also include a PTC element, and their round shape leaves gaps used for cooling and spacing. Prismatic and pouch cells reduce the number of cells and joints, but each cell failure releases more energy."
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
          "type": "eq",
          "id": "m5-pack-voltage",
          "name": "Pack voltage of a series string",
          "tex": "V_{\\mathrm{pack}} = S\\, V_{\\mathrm{cell}}",
          "where": [
            [
              "V_{\\mathrm{pack}}",
              "pack voltage",
              "V"
            ],
            [
              "S",
              "number of cell groups in series",
              "dimensionless"
            ],
            [
              "V_{\\mathrm{cell}}",
              "cell voltage: nominal, maximum or minimum",
              "V"
            ]
          ],
          "why": "With the maximum cell voltage it gives the working voltage that decides the high-voltage class and the charger set point; with the minimum it gives the low-voltage cut-off.",
          "example": "20S NMC: nominal \\(20 \\times 3.6 = 72\\ \\mathrm{V}\\), maximum \\(20 \\times 4.2 = 84\\ \\mathrm{V}\\), practical minimum \\(20 \\times 3.0 = 60\\ \\mathrm{V}\\)."
        },
        {
          "type": "eq",
          "id": "m5-pack-capacity",
          "name": "Pack capacity of parallel cells",
          "tex": "Q_{\\mathrm{pack}} = P\\, Q_{\\mathrm{cell}}",
          "where": [
            [
              "Q_{\\mathrm{pack}}",
              "pack capacity",
              "Ah"
            ],
            [
              "P",
              "number of cells in parallel in each group",
              "dimensionless"
            ],
            [
              "Q_{\\mathrm{cell}}",
              "capacity of one cell",
              "Ah"
            ]
          ],
          "why": "Parallel cells add capacity and share current, so P also sets how much current the pack can deliver within each cell’s rating.",
          "example": "10P of 5.0 Ah cells: \\(Q_{\\mathrm{pack}} = 10 \\times 5.0 = 50\\ \\mathrm{Ah}\\)."
        },
        {
          "type": "eq",
          "id": "m5-pack-energy",
          "name": "Pack energy",
          "tex": "E_{\\mathrm{pack}} = V_{\\mathrm{nom}}\\, Q_{\\mathrm{pack}}, \\qquad N_{\\mathrm{cells}} = S\\, P",
          "where": [
            [
              "E_{\\mathrm{pack}}",
              "stored energy",
              "Wh"
            ],
            [
              "V_{\\mathrm{nom}}",
              "nominal pack voltage",
              "V"
            ],
            [
              "Q_{\\mathrm{pack}}",
              "pack capacity",
              "Ah"
            ],
            [
              "N_{\\mathrm{cells}}",
              "total number of cells",
              "dimensionless"
            ]
          ],
          "why": "Energy, not capacity in Ah, sets range: dividing it by consumption in kWh/100 km gives the distance. The cell count sets cost and mass.",
          "example": "\\(72 \\times 50 = 3600\\ \\mathrm{Wh}\\); \\(N = 20 \\times 10 = 200\\) cells of 70 g, 14 kg of cells."
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
          "type": "p",
          "html": "At a 70 % cell-to-pack mass ratio the 14 kg of cells becomes a pack of about 20 kg, or 180 Wh/kg: the scale of a 125-equivalent commuter battery."
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
          "html": "Fully charged, a 20S NMC pack reaches <strong>84 V</strong>, above the <strong>60 V DC</strong> threshold of class B (Chapter 6.6), even though it is sold as 72 V."
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
          "html": "The C-rate expresses current relative to capacity: 1C empties the full capacity in one hour. For the 50 Ah pack, 150 A is <strong>3C</strong> and 15 A per cell, exactly the cell's continuous rating. A 3 kW motor at 72 V draws about 45 A (0.9C), while a 10 kW peak draws about 150 A even before sag. Charging at 10 A is C/5, about five hours."
        },
        {
          "type": "eq",
          "id": "m5-c-rate",
          "name": "C-rate",
          "tex": "C = \\frac{I}{Q}",
          "where": [
            [
              "C",
              "C-rate (1C empties or fills the pack in one hour)",
              "1/h"
            ],
            [
              "I",
              "pack current",
              "A"
            ],
            [
              "Q",
              "pack capacity",
              "Ah"
            ]
          ],
          "why": "Cell ratings, charge times and ageing are all stated as C-rates, so it lets the same limits be applied to packs of any size.",
          "example": "150 A from 50 Ah is \\(C = 150/50 = 3\\), each 10P cell carrying \\(150/10 = 15\\ \\mathrm{A}\\)."
        },
        {
          "type": "p",
          "html": "A 1C fast charge (50 A) would take about an hour to 80 % and needs cells rated for 1C charging; regen and fast-charge limits are therefore usually lower C-rates than discharge limits."
        },
        {
          "type": "p",
          "html": "Under load the terminal voltage sags by \\(\\Delta V = I R_{\\mathrm{pack}}\\) (Module 4) and the pack dissipates \\(I^2 R_{\\mathrm{pack}}\\) as heat. For the 20S10P pack, \\(R_{\\mathrm{pack}} = 0.040\\ \\Omega\\): at 150 A the pack sags by 6 V (72 V to about 66 V) and makes <strong>900 W</strong> of heat inside. A 20-minute climb at 100 A generates \\(100^2 \\times 0.04 \\times 1200 = 480\\ \\mathrm{kJ}\\), a potential rise of over 30 K, which is why sealed air-cooled packs derate on long hot hills. Resistance roughly doubles from 25 °C to 0 °C and rises with age."
        },
        {
          "type": "eq",
          "id": "m5-pack-resistance",
          "name": "Internal resistance of a series-parallel pack",
          "tex": "R_{\\mathrm{pack}} = \\frac{S}{P}\\, R_{\\mathrm{cell}} + R_{\\mathrm{ic}}",
          "where": [
            [
              "R_{\\mathrm{pack}}",
              "pack internal resistance",
              "Ω"
            ],
            [
              "S, P",
              "cells in series and in parallel",
              "dimensionless"
            ],
            [
              "R_{\\mathrm{cell}}",
              "internal resistance of one cell",
              "Ω"
            ],
            [
              "R_{\\mathrm{ic}}",
              "resistance of strips, busbars, fuse and connectors",
              "Ω"
            ]
          ],
          "why": "It predicts voltage sag, heat and the point at which hard acceleration trips the low-voltage cut-off. Series cells add resistance; parallel cells divide it.",
          "example": "20S10P of 15 mΩ cells with 10 mΩ of interconnects: \\(R_{\\mathrm{pack}} = (20/10) \\times 0.015 + 0.010 = 0.040\\ \\Omega\\)."
        },
        {
          "type": "p",
          "html": "Short bursts are harmless. A full 150 A demand for 60 s makes 54 kJ; with a cell thermal mass of about \\(14\\ \\mathrm{kg} \\times 1000\\ \\mathrm{J/(kg\\,K)} = 14\\ \\mathrm{kJ/K}\\), the cells warm by only about 3.9 K. Internal resistance itself has an ohmic part (electrodes, current collectors, electrolyte) and slower charge-transfer and diffusion parts, which is why sag keeps growing for some seconds under a steady load."
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
          "type": "p",
          "html": "State of charge is the remaining charge as a fraction of the present full capacity. It cannot be measured directly, so the BMS estimates it."
        },
        {
          "type": "eq",
          "id": "m5-coulomb-counting",
          "name": "State of charge by coulomb counting",
          "tex": "\\mathrm{SOC}(t) = \\mathrm{SOC}_0 - \\frac{1}{Q} \\int_0^t I \\, dt",
          "where": [
            [
              "\\mathrm{SOC}",
              "state of charge",
              "fraction (0 to 1)"
            ],
            [
              "\\mathrm{SOC}_0",
              "state of charge at the last reference point",
              "fraction"
            ],
            [
              "Q",
              "present full capacity of the pack",
              "Ah"
            ],
            [
              "I",
              "pack current, positive on discharge",
              "A"
            ],
            [
              "t",
              "time since the reference point",
              "h"
            ]
          ],
          "why": "It is how the fuel gauge works while riding. Any current-sensor offset integrates into a growing error, and an aged pack with a wrong Q reads optimistic, which is why the BMS re-anchors SOC at rest and at full charge.",
          "example": "A 0.5 A offset on 50 Ah adds \\(0.5 / 50 = 1\\ \\%\\) error per hour."
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
          "html": "For LFP the BMS relies on coulomb counting and corrects it at the steep ends of the curve, especially at full charge, where voltage rises sharply. This is why LFP machines ask for a regular full charge: without it the gauge drifts."
        },
        {
          "type": "p",
          "html": "<strong>SOH</strong> compares the present pack to its new condition, usually by capacity and sometimes by internal resistance. The conventional end of first life is <strong>80 %</strong>, a fifth less range; many battery warranties are written in these terms."
        },
        {
          "type": "eq",
          "id": "m5-state-of-health",
          "name": "State of health by capacity",
          "tex": "\\mathrm{SOH} = \\frac{Q_{\\mathrm{now}}}{Q_{\\mathrm{rated}}} \\times 100\\ \\%",
          "where": [
            [
              "\\mathrm{SOH}",
              "state of health",
              "%"
            ],
            [
              "Q_{\\mathrm{now}}",
              "capacity measured now, full to cut-off at C/3 to C/5",
              "Ah"
            ],
            [
              "Q_{\\mathrm{rated}}",
              "rated capacity when new",
              "Ah"
            ]
          ],
          "why": "It decides warranty claims, resale value and when a pack moves to second life. A bench capacity test (Chapter 6.6) gives the measured value.",
          "example": "A 50 Ah pack that now delivers 42 Ah has \\(\\mathrm{SOH} = 42/50 \\times 100 = 84\\ \\%\\)."
        },
        {
          "type": "p",
          "html": "Capacity is not the whole story. A pack at 96 % SOH by capacity whose resistance has risen by 60 % gives almost normal range at gentle speeds, but sags more on hills and hard acceleration, reaches the low-voltage cut-off earlier (especially when cold or nearly empty), runs hotter and may derate on long climbs."
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
          "html": "An analogue front-end chip measures each series group; one IC handles 12–18 cells, so larger packs daisy-chain several. Accuracy of a few millivolts matters because the decisions are fine: full charge at 4.20 V, an imbalance of 20 mV. NTC thermistors sit between cells, on busbars and on the BMS's own switches; a shunt or Hall sensor measures pack current."
        },
        {
          "type": "p",
          "html": "Cells in a series string drift apart in SOC through small differences in self-discharge, capacity and temperature. Because the whole string must stop charging when the highest group is full and stop discharging when the lowest is empty, imbalance costs usable capacity. <strong>Passive</strong> balancing bleeds high groups through resistors at 30–200 mA; removing a 1 Ah imbalance at 100 mA takes \\(t = \\Delta Q / I = 1 / 0.1 = 10\\) hours. <strong>Active</strong> balancing moves charge from high to low groups at up to a few amps with 80–90 % efficiency. Balancing cannot fix a cell with high self-discharge, which drifts low again within days."
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
              "Discharge overcurrent",
              "Set by cell and pack rating",
              "Reduce limit, then open switch"
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
          "type": "p",
          "html": "Low-voltage packs (up to about 72 V) usually switch with banks of MOSFETs in the negative path inside the BMS; high-voltage packs use contactors with a pre-charge relay and resistor (Chapter 6.1). The BMS logs cycles, energy throughput, temperature extremes, overcurrent events and faults in non-volatile memory; these logs settle warranty claims and tell a fleet operator which packs to retire."
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
          "type": "p",
          "html": "Cells perform and age best between about 15 °C and 35 °C. Two-wheeler packs are mostly passively air cooled through the enclosure, sometimes with aluminium heat spreaders or phase-change material between cells; premium packs use liquid cold plates. A pack parked in East African sun can reach 50–60 °C before it is ridden. <strong>Thermal runaway</strong> is a self-sustaining chain of heat-releasing reactions in a cell; in an NMC cell it runs as follows."
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
          "type": "p",
          "html": "Triggers are internal short circuits from manufacturing defects or lithium dendrites, mechanical damage (crash, penetration, crushing), overcharge, external short circuit and external heating. In a densely packed module one failed cell can heat its neighbours past their trigger temperature within tens of seconds. Fusible links in the nickel strip, or wire-bonded cells, disconnect an internally shorted cell from its parallel neighbours."
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
          "type": "eq",
          "id": "m5-calendar-ageing",
          "name": "Calendar ageing against temperature (Arrhenius rule of thumb)",
          "tex": "k(T) \\approx k_{\\mathrm{ref}} \\times 2^{(T - T_{\\mathrm{ref}})/10}",
          "where": [
            [
              "k(T)",
              "rate of capacity loss at storage temperature T",
              "% per month"
            ],
            [
              "k_{\\mathrm{ref}}",
              "rate at the reference temperature, at the same SOC",
              "% per month"
            ],
            [
              "T, T_{\\mathrm{ref}}",
              "storage and reference temperatures",
              "°C"
            ]
          ],
          "why": "It explains why where and how a bike is parked matters as much as how it is ridden: heat and high SOC age a pack even when it is not used.",
          "example": "A pack kept at 45 °C instead of 25 °C ages about \\(2^{(45-25)/10} = 4\\) times faster."
        },
        {
          "type": "p",
          "html": "Deep cycles (100 % depth of discharge) stress the electrode particles mechanically more than shallow ones. Plated lithium is lost from cycling and can grow dendrites that pierce the separator, creating an internal short-circuit risk."
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
          "type": "h3",
          "text": "Storage in practice"
        },
        {
          "type": "p",
          "html": "Storage applies the ageing rules above. A lithium pack left almost empty for a long time can be damaged and may refuse to charge, and on machines with a 12 V battery that battery can go flat and leave the bike unable to wake up even with a full traction pack. The owner's manual comes first; one maker's advice illustrates the principles."
        },
        {
          "type": "table",
          "head": [
            "Item",
            "Example: Zero Motorcycles advice"
          ],
          "rows": [
            [
              "Storage place",
              "10–35 °C, out of direct sun and rain; indoors, or outdoors under a breathable, weather-resistant cover"
            ],
            [
              "Plugged in",
              "Leave the bike on charge so the BMS manages the pack; it lowers the pack to about 80 % after 30 days"
            ],
            [
              "Not plugged in",
              "Charge if the state of charge falls below 30 %; turn the key every 30 days to check it"
            ],
            [
              "Before riding again",
              "Charge for 24 hours so the cells can balance, then do a pre-ride check and a short test ride"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The 12 V battery is kept on a suitable maintenance charger or disconnected as the manual says. Swap-battery riders tell the operator before a long lay-up: Gogoro, for example, asks riders to swap at least once every 30 days. The bike is cleaned and dried without a pressure washer near the motor, controller or battery, and a damaged, swollen or flooded pack is never stored at all."
        },
        {
          "type": "h3",
          "text": "Second life and recycling"
        },
        {
          "type": "p",
          "html": "Packs retired at 70–80 % SOH can serve years in stationary storage. At end of life, hydrometallurgical recycling recovers lithium, nickel, cobalt and manganese from black mass. EU Regulation 2023/1542 adds recycled-content rules, collection targets and a digital battery passport."
        },
        {
          "type": "p",
          "html": "Second-life use needs each module's capacity, resistance and self-discharge tested, a rebuild with a new BMS and certification of the new product; swap operators do this well because they own uniform packs with full histories. <strong>Pyrometallurgical</strong> recycling smelts cells and recovers cobalt, nickel and copper, losing lithium and aluminium to slag. <strong>Direct recycling</strong>, which recovers cathode material intact, is under development. LFP has lower material value per kilogram, so its recycling depends on lithium recovery and regulation."
        },
        {
          "type": "p",
          "html": "Practice: <a href=\"../repair/repairs/ev-pack-state/\">check battery state and health</a>, <a href=\"../repair/repairs/ev-storage/\">store an electric motorcycle</a>, <a href=\"../repair/repairs/ev-water-check/\">check a bike after water exposure</a> and <a href=\"../repair/repairs/ev-damaged-pack/\">handle a damaged battery pack</a>."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Damaged and swollen packs",
          "html": "A pack that has been dropped, crashed or submerged, or that shows swelling, a sweet solvent smell, hissing, smoke, heat without use or leakage must <strong>never be charged or reinstalled</strong>. If safe, move it outdoors away from buildings and vehicles and treat it as hazardous waste."
        },
        {
          "type": "check",
          "q": "m5-37"
        },
        {
          "type": "check",
          "q": "m5-38"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "An xSyP pack has \\(V = S V_{\\mathrm{cell}}\\), \\(Q = P Q_{\\mathrm{cell}}\\) and \\(E = V_{\\mathrm{nom}} Q\\); a \"72 V\" 20S NMC pack reaches 84 V.<br>C-rate \\(= I/Q\\); pack resistance \\(= (S/P) R_{\\mathrm{cell}} + R_{\\mathrm{ic}}\\) sets sag and heat.<br>SOC is estimated by coulomb counting corrected at rest and at full charge; OCV is poor for LFP.<br>The BMS measures every group, balances, enforces voltage, current and temperature limits and logs history.<br>Heat, high SOC, deep cycles and cold fast charging age a pack; runaway starts with SEI breakdown at 80–120 °C."
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
          "type": "p",
          "html": "Simple systems follow a fixed profile, and the BMS opens its charge MOSFETs if any cell reaches its limit. Communicating systems have the BMS send a requested voltage and current; the charger starts only on a valid message, which stops an incompatible charger from charging the pack. Removable packs are often carried indoors and charged on a desk-top charger, which makes the charging location a fire-safety question."
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
          "type": "p",
          "html": "The set-point voltage is the most important charger parameter. It is the pack-voltage equation with the maximum cell voltage, \\(V_{\\mathrm{set}} = S \\times V_{\\mathrm{cell,max}}\\) (Chapter 6.4). A charger set 0.05 V per cell too high adds only a few percent capacity but ages the pack much faster; one set for the wrong cell count is dangerous. Current tapers in the CV phase because the cells' internal voltage approaches the terminal voltage, leaving less voltage to drive current through their internal resistance."
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
              "html": "\\(P \\approx 80\\ \\mathrm{V} \\times 15\\ \\mathrm{A} = 1.2\\ \\mathrm{kW}\\) (average pack voltage during CC)"
            },
            {
              "title": "Energy into the battery",
              "html": "\\(0.9 \\times 3.6 = 3.24\\ \\mathrm{kWh}\\)"
            },
            {
              "title": "CC phase",
              "html": "\\((0.80 \\times 3.24) / 1.2 \\approx 2.2\\ \\mathrm{h}\\), then CV adds 0.6–1.0 h: about <strong>three hours</strong> in all"
            },
            {
              "title": "From the grid",
              "html": "\\(3.24 / (0.92 \\times 0.97) \\approx\\) <strong>3.6 kWh</strong>"
            }
          ]
        },
        {
          "type": "eq",
          "id": "m5-charge-time-cc",
          "name": "Constant-current charge time",
          "tex": "t_{\\mathrm{CC}} \\approx \\frac{f_{\\mathrm{CC}}\\, E_{\\mathrm{batt}}}{P_{\\mathrm{chg}}}, \\qquad t \\approx t_{\\mathrm{CC}} + t_{\\mathrm{CV}}",
          "where": [
            [
              "t_{\\mathrm{CC}}",
              "duration of the constant-current phase",
              "h"
            ],
            [
              "f_{\\mathrm{CC}}",
              "fraction of the energy delivered in CC, typically 0.70–0.85",
              "dimensionless"
            ],
            [
              "E_{\\mathrm{batt}}",
              "energy to be added to the battery",
              "kWh"
            ],
            [
              "P_{\\mathrm{chg}}",
              "charger output power, average pack voltage × charge current",
              "kW"
            ],
            [
              "t_{\\mathrm{CV}}",
              "duration of the constant-voltage taper",
              "h"
            ]
          ],
          "why": "It sets a realistic charge time for a customer or a fleet schedule, and shows why the CV taper makes the last 20 % slow and why fast-charge times are quoted to 80 %.",
          "example": "2.2 kWh pack from 20 % (1.76 kWh to add) with 8 A at 62 V: \\(P_{\\mathrm{chg}} \\approx 0.50\\ \\mathrm{kW}\\), \\(t_{\\mathrm{CC}} \\approx 0.8 \\times 1.76 / 0.50 \\approx 2.8\\ \\mathrm{h}\\); with 40 min of CV, about 3.5 h."
        },
        {
          "type": "eq",
          "id": "m5-grid-energy",
          "name": "Energy drawn from the grid for a charge",
          "tex": "E_{\\mathrm{grid}} = \\frac{E_{\\mathrm{batt}}}{\\eta_{\\mathrm{chg}}\\, \\eta_{\\mathrm{bc}}}",
          "where": [
            [
              "E_{\\mathrm{grid}}",
              "energy taken from the socket",
              "kWh"
            ],
            [
              "E_{\\mathrm{batt}}",
              "energy added to the battery",
              "kWh"
            ],
            [
              "\\eta_{\\mathrm{chg}}",
              "charger efficiency",
              "dimensionless"
            ],
            [
              "\\eta_{\\mathrm{bc}}",
              "battery charge efficiency",
              "dimensionless"
            ]
          ],
          "why": "Electricity bills, swap-station supply contracts and solar arrays are all sized on grid energy, which is always more than the energy the battery stores.",
          "example": "1.76 kWh with a 90 % charger and 97 % charge efficiency: \\(E_{\\mathrm{grid}} = 1.76 / (0.90 \\times 0.97) \\approx 2.02\\ \\mathrm{kWh}\\)."
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
          "type": "p",
          "html": "A DC fast charger bypasses the on-board charger: its output connects to the pack through the vehicle's contactors, and the BMS requests voltage and current in real time. The limits are the cells' charge rating, cooling and the connector. Fast charging makes heat (\\(I^2 R\\) in the cells plus entropic heat), and cold cells cannot take high current without lithium plating, so the BMS cuts current when cells are cold or hot."
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
          "type": "p",
          "html": "CCS2 suits large machines only: many car chargers have a minimum output of 150–200 V, above the 60–84 V of a 72 V pack, and they are built for currents and connector sizes far beyond two-wheeler needs. LECCS, based on the connector Ather opened to other makers, is used by Ather and Hero MotoCorp, whose networks became interoperable. China and Japan have their own light-vehicle charging work."
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
          "type": "p",
          "html": "Gogoro already ran about 1,700 sites in Taiwan by 2020, and licenses its battery and vehicle platform to other makers. Its GoStation shows the engineering a swap system needs: a pack that identifies and authenticates itself, a connector rated for thousands of insertions, and a station that controls charge rate and temperature to maximise pack life. A common pack, as in Japan's consortium, lets one network serve several makers' machines and avoids duplicated infrastructure."
        },
        {
          "type": "p",
          "html": "India's 2022 draft policy proposed interoperability standards for packs, connectors and the communication between pack, vehicle and station, and the Bureau of Indian Standards has since issued standards for swappable battery systems. The debate shows the tension between interoperability, which lowers infrastructure cost for riders, and proprietary packs, which let each maker optimise and protect its design. Rider surveys and press reports from Kenya show demand for more flexible networks, because a proprietary network ties the rider's daily income to one operator's station density and reliability."
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
          "type": "eq",
          "id": "m5-swap-throughput",
          "name": "Swap station supply power and throughput",
          "tex": "P_{\\mathrm{supply}} = n\\, P_{\\mathrm{slot}}, \\qquad N_{\\mathrm{packs/h}} \\approx \\frac{n\\, P_{\\mathrm{slot}}}{E_{\\mathrm{pack}}}",
          "where": [
            [
              "P_{\\mathrm{supply}}",
              "electrical supply the station needs, before station losses",
              "kW"
            ],
            [
              "n",
              "number of charging slots in use",
              "dimensionless"
            ],
            [
              "P_{\\mathrm{slot}}",
              "charging power per slot",
              "kW"
            ],
            [
              "N_{\\mathrm{packs/h}}",
              "packs fully recharged per hour, ignoring the CV taper",
              "1/h"
            ],
            [
              "E_{\\mathrm{pack}}",
              "energy per pack",
              "kWh"
            ]
          ],
          "why": "It sizes the grid connection of a swap station and checks whether it can keep up with the swaps of the fleet it serves.",
          "example": "30 slots at 0.8 kW need \\(P_{\\mathrm{supply}} = 24\\ \\mathrm{kW}\\) and recharge about \\(24 / 1.3 \\approx 18\\) packs of 1.3 kWh per hour."
        },
        {
          "type": "h3",
          "text": "Standards that matter in the workshop"
        },
        {
          "type": "p",
          "html": "Standards (ISO, IEC, EN, BIS) define test methods and requirements; regulations (UNECE, EU, national) make some of them mandatory for type approval or transport. UNECE R136 also tests fire resistance, overcharge, over-discharge, over-temperature and (since amendment) overcurrent protection; ISO 13063 has parts on energy storage, operational safety and shock protection. After the 2022 fires, AIS-156 also added higher ingress protection for the traction battery and BMS requirements."
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
          "type": "p",
          "html": "A damaged or defective battery needs special packaging and carrier approval before it can be returned under warranty, which a workshop should check before promising a customer a quick exchange."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Charging indoors and DC connectors",
          "html": "Most city battery fires start during charging, often with non-original chargers or damaged packs. Use the specified charger, on a non-combustible surface, away from escape routes, with a smoke alarm. XLR, Anderson and XT60/XT90 connectors are <strong>not rated to break DC current</strong>: the arc does not self-extinguish, so connect and disconnect them only with the charger off."
        },
        {
          "type": "h3",
          "text": "Connectors"
        },
        {
          "type": "table",
          "head": [
            "Connector",
            "Typical use",
            "Notes"
          ],
          "rows": [
            [
              "Domestic socket (Schuko, BS 1363, Type G) with cable to an on-board charger",
              "Scooters and motorcycles with on-board chargers",
              "About 2.3–3.6 kW; extension reels are a fire risk"
            ],
            [
              "IEC 62196 Type 2 inlet",
              "Premium motorcycles in Europe",
              "Single- or three-phase AC, Mode 3 with control pilot"
            ],
            [
              "CCS2 (Type 2 Combo)",
              "Large high-voltage motorcycles",
              "DC fast charging up to the vehicle limit"
            ],
            [
              "LECCS",
              "Indian scooters and motorcycles",
              "Combined AC and DC, compact"
            ],
            [
              "XLR, GX16, Anderson SB, XT60/XT90",
              "Off-board chargers and pack leads on light vehicles",
              "Not rated to break current; connect and disconnect with the charger off"
            ],
            [
              "Proprietary swap connectors",
              "Swap packs",
              "Sequenced pins (earth and communication first, power last), wiping contacts"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Unplugging a DC connector under load draws an arc that pits the contacts. Pitted contacts have higher resistance, so they run hot in later use, which is why a hot or discoloured charge plug points to the charging habit as well as to the part."
        },
        {
          "type": "model",
          "file": "charge_port",
          "caption": "A Type 2 / CCS2-style charging inlet with hinged cap."
        },
        {
          "type": "h3",
          "text": "Diagnosing a charging fault"
        },
        {
          "type": "p",
          "html": "Charging needs four things to work together: mains power, the charger, the cable and charge port, and the BMS, which must agree to accept charge. A charging complaint is diagnosed in that order, from the cheapest and easiest check to the hardest. The charger and the battery are never opened, and a charger of another voltage or connector type is never tried."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Mains",
              "html": "Confirm the wall socket works with a lamp or phone charger, or try another socket."
            },
            {
              "title": "Charger lights",
              "html": "Compare the charger's lights with the owner's manual. Codes differ between makers: Ather, for example, uses blinking green for charging and solid red for a charger fault."
            },
            {
              "title": "Charger and cable",
              "html": "Unplugged at both ends, read the label: output voltage and connector must match the bike or battery label. Inspect the mains lead, the output cable (especially where it enters the charger and the plug, where it bends most), the plug pins and the case for cuts, kinks, burn marks, cracks, swelling and blocked vents."
            },
            {
              "title": "Port and plug",
              "html": "Open the port cover, check its seal, and inspect each contact with a torch for dirt, water, corrosion, bent or pushed-back pins and discoloured plastic. Clean dry dirt with a soft brush or a short blow of compressed air, never with metal pushed into the port. A wet port is left open to dry fully before charging."
            },
            {
              "title": "Temperature",
              "html": "A pack too hot after a ride or too cold after a frosty night may refuse charge. Battery University gives 0–45 °C for typical lithium-ion cells, with no charging below freezing; Ather advises 5–45 °C. The bike's own limits apply."
            },
            {
              "title": "Swap packs",
              "html": "Check the pack is the right type for the charger or rack and that its contacts and latch are clean (<a href=\"../repair/repairs/ev-swap-contact-check/\">swap contact check</a>)."
            },
            {
              "title": "Substitute",
              "html": "Try a known-good charger of the same model. If it charges, the charger is faulty; if not, the fault is in the bike or battery, and the error codes are read next."
            }
          ]
        },
        {
          "type": "p",
          "html": "If the charger fan runs but charging is slow or does not start, Ather notes that the fault often lies in the communication between charger and vehicle; that, and any BMS fault, is work for the dealer or fleet workshop. A correct charge shows the charging pattern on the charger, a steadily rising state of charge, and a complete indication at full."
        },
        {
          "type": "h3",
          "text": "When charging stops early"
        },
        {
          "type": "p",
          "html": "A charge that ends at 80 or 90 %, or stops and restarts, is not always a fault. Many bikes stop below 100 % on purpose, because a charge limit has been set in the app or a storage mode is active; Zero's BMS, for example, lowers the pack to about 80 % when the bike is left plugged in for 30 days. That setting is checked first."
        },
        {
          "type": "p",
          "html": "If no limit is set, heat is the next suspect. A hot plug or socket means charging stops at once and the contacts are inspected. A pack or charger that is hot, after a long ride, in the sun or with blocked vents, is protected by the BMS or the charger itself, so the pack is allowed to cool and charged in the shade at room temperature. A cold pack charges slowly or not at all, and is brought indoors. Finally, an unstable supply from a generator, a weak solar system or a long extension lead can make the charger stop; a different socket or building shows whether the supply is the cause. A charge that still stops early after all of this points to the BMS or a weak cell group, which is dealer work."
        },
        {
          "type": "h3",
          "text": "Heat at the plug"
        },
        {
          "type": "p",
          "html": "After 10 to 15 minutes of charging, the plug, port and charger case should be only warm. Too hot to hold means a poor contact: dirt, a loose or pitted pin, or a socket worn by unplugging under load. Brown or black marks, melted plastic or a burnt smell on the port, plug or charger mean that charger and port are not used again until checked, and a damaged cable is replaced, never taped. Bent pins on a high-power port and any loose or damaged port are dealer work, because the contact must be checked for heat damage."
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "First checks"
          ],
          "rows": [
            [
              "Charger dark or showing a fault light",
              "Mains socket, charger label and light codes, then a known-good charger (<a href=\"../repair/repairs/ev-charger-check/\">charger check</a>)"
            ],
            [
              "Charger normal, battery not charging",
              "Port and plug, pack temperature, error codes (<a href=\"../repair/repairs/ev-charge-diagnosis/\">charging diagnosis</a>)"
            ],
            [
              "Charging stops before full",
              "Pack temperature and BMS protection; communication faults go to the dealer"
            ],
            [
              "Plug or socket hot",
              "Stop charging; inspect the contacts for dirt, pitting and discolouration (<a href=\"../repair/repairs/ev-port-inspect/\">port inspection</a>)"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A weekly look at the charger, its cables and the plug, done every time charging fails as well, finds most problems before they become a fire risk."
        },
        {
          "type": "h3",
          "text": "Grid and solar"
        },
        {
          "type": "p",
          "html": "One bike is a small load, but a swap station charging 40 packs at 1 kW draws 40 kW, comparable to a small commercial building, and needs a three-phase supply and, where the grid is unreliable, backup or storage. Kenya's energy regulator introduced a dedicated e-mobility charging tariff in 2023 to encourage off-peak charging. Solar is easy because daily needs are small: a boda boda doing 120 km at 3.5 kWh/100 km needs about 4.2 kWh at the battery, or about 4.8 kWh from the panels after charger and storage losses."
        },
        {
          "type": "eq",
          "id": "m5-pv-yield",
          "name": "Daily energy from a solar array",
          "tex": "E_{\\mathrm{PV}} = P_{\\mathrm{peak}}\\, H_{\\mathrm{peak}}\\, \\mathrm{PR}",
          "where": [
            [
              "E_{\\mathrm{PV}}",
              "usable daily energy from the array",
              "kWh/day"
            ],
            [
              "P_{\\mathrm{peak}}",
              "rated array power",
              "kWp"
            ],
            [
              "H_{\\mathrm{peak}}",
              "daily peak sun hours, about 5–6 in Nairobi and much of East Africa",
              "h/day"
            ],
            [
              "\\mathrm{PR}",
              "performance ratio for temperature, soiling, inverter and wiring losses, typically 0.7–0.8",
              "dimensionless"
            ]
          ],
          "why": "It sizes off-grid charging for a taxi rider, a delivery fleet or a rural swap point, starting from the energy the bike uses each day.",
          "example": "\\(1.5 \\times 5.0 \\times 0.75 \\approx 5.6\\ \\mathrm{kWh/day}\\), enough for the 4.8 kWh boda boda. For 3.0 kWh/day at the battery and 85 % chain efficiency: \\(P_{\\mathrm{peak}} = (3.0/0.85)/(5.5 \\times 0.75) \\approx 0.86\\ \\mathrm{kWp}\\)."
        },
        {
          "type": "p",
          "html": "A 1.5 kWp array is about four to five modules on 7–8 m². Charging during the day needs either a second pack, charged while the first is in use, or stationary storage, a natural use for second-life packs."
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
        },
        {
          "type": "p",
          "html": "Practice: <a href=\"../repair/repairs/ev-charge-diagnosis/\">diagnose a charging fault</a>, <a href=\"../repair/repairs/ev-charger-check/\">check the charger and cable</a>, <a href=\"../repair/repairs/ev-port-inspect/\">inspect the charge port and plug</a> and <a href=\"../repair/repairs/ev-swap-contact-check/\">check swap battery contacts and latch</a>."
        },
        {
          "type": "check",
          "q": "m5-39"
        },
        {
          "type": "check",
          "q": "m5-40"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Lithium-ion is charged CC/CV with no float; the set point is S × maximum cell voltage and must match the chemistry and cell count.<br>Charge time is roughly 80 % of the energy over charger power plus the CV taper; fast-charge times are quoted to 80 %.<br>Grid energy is battery energy divided by charger and charge efficiencies, about 0.87–0.89 in all.<br>Swapping trades pack size (lifting mass) for one-minute refuelling, and puts pack life under the operator’s control.<br>UN 38.3 is required to ship any lithium pack; XT90, Anderson and XLR connectors must never be unplugged under load."
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
          "html": "Class B circuits need protection against direct contact (insulation, barriers, enclosures to IP levels), protection against indirect contact (equipotential bonding of exposed conductive parts), orange cable insulation, high-voltage warning labels and isolation from chassis that is monitored or guaranteed by design."
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
          "type": "p",
          "html": "Class 0 gloves are rated for a maximum use voltage of 1,000 V AC and 1,500 V DC. Inspect them before every use by rolling the cuff to trap air and checking for leaks. Insulated tools carry the double-triangle mark and a 1,000 V rating, and no uninsulated metal should be able to bridge two potentials. Keep a CO2 or powder extinguisher for electrical fires in the surroundings, and water or an aqueous vermiculite dispersion (AVD) extinguisher for cooling a battery."
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
              "html": "Typically 5–10 minutes, or the maker's time, for the DC-link capacitors to bleed down. 2,000 µF with a 10 kΩ bleeder: \\(\\tau = 20\\ \\mathrm{s}\\), \\(5\\tau = 100\\ \\mathrm{s}\\). Don't turn the rear wheel meanwhile."
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
          "type": "eq",
          "id": "m5-capacitor-discharge",
          "name": "Capacitor discharge through a bleed resistor",
          "tex": "V(t) = V_0\\, e^{-t/\\tau}, \\qquad t = \\tau \\ln \\frac{V_0}{V}",
          "where": [
            [
              "V(t)",
              "capacitor voltage after time t",
              "V"
            ],
            [
              "V_0",
              "voltage when the pack was disconnected",
              "V"
            ],
            [
              "\\tau",
              "time constant RC of capacitor and bleed resistor",
              "s"
            ],
            [
              "t",
              "time since disconnection",
              "s"
            ]
          ],
          "why": "It gives the minimum wait before a DC link can be expected to be safe, and shows why the wait is never a substitute for measuring: a failed bleeder makes τ almost infinite.",
          "example": "4,700 µF with a 22 kΩ bleeder: \\(\\tau = 22\\,000 \\times 0.0047 \\approx 103\\ \\mathrm{s}\\). To fall below 1 % needs \\(t = \\tau \\ln 100 \\approx 4.6\\,\\tau \\approx 476\\ \\mathrm{s}\\), about 8 minutes."
        },
        {
          "type": "check",
          "q": "m5-27"
        },
        {
          "type": "h3",
          "text": "Job sheet 6.6.1: Safe isolation and zero-voltage verification"
        },
        {
          "type": "p",
          "html": "Tools: Class 0 gloves with leather protectors, safety glasses, insulated tools, CAT III 1,000 V multimeter, proving unit or known live source, lock-out device and tag, warning signs. Reference values: class B above 60 V DC; discharge wait to the maker's time, typically 5–10 min; zero-voltage acceptance below about 1 V DC between all tested points. Practice page: <a href=\"../repair/repairs/ev-safe-isolation/\">make an electric motorcycle safe to work on</a>."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Prepare",
              "html": "Rear wheel off the ground on a centre or paddock stand, level floor, barriered area with warning signs; remove jewellery and watches."
            },
            {
              "title": "Record and switch off",
              "html": "Read fault codes and SOC, then remove the key. Confirm the dashboard is dark and the contactor has opened (an audible click on most machines)."
            },
            {
              "title": "Disable the 12 V side",
              "html": "Disconnect the auxiliary battery negative or remove the 12 V main fuse, so no control unit can close the contactors."
            },
            {
              "title": "Remove the energy source",
              "html": "After an air-leak test, put on gloves and glasses. Remove the service disconnect, main pack connector or removable pack, and keep it on your person."
            },
            {
              "title": "Wait",
              "html": "Note the time and wait at least the maker’s discharge time without turning the rear wheel, which would recharge the DC link."
            },
            {
              "title": "Prove, test, prove",
              "html": "Prove the meter on a known live source. Measure controller B+ to B−, each to chassis, each motor phase pair and each phase to B−: all below about 1 V. A higher reading means stop, wait and look for a failed bleeder or a second source. Prove the meter again."
            },
            {
              "title": "Lock out and tag",
              "html": "Fit the lock or cover to the disconnect socket and a tag with your name, date and \"Do not energise\", and only then open any high-voltage component."
            },
            {
              "title": "Restore",
              "html": "Remove lock and tag only with all covers refitted and everyone clear; refit the disconnect, reconnect 12 V, switch on and check for codes."
            },
            {
              "title": "Pass criteria",
              "html": "All readings below about 1 V DC, meter proven before and after, disconnect under the technician’s control, lock-out and tag fitted before work."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Insulation resistance"
        },
        {
          "type": "p",
          "html": "Apply a DC test voltage between the isolated HV circuit and chassis, with control electronics disconnected (500 V can destroy semiconductors). Use 250 or 500 V for systems up to about 100 V, and 500 or 1,000 V for 300–400 V systems. A healthy system reads in the <strong>megaohms</strong>, usually above 1 MΩ and often above 100 MΩ, far above the regulatory floor. A value that falls with each test, or is far below a sister vehicle's, means moisture or damaged insulation."
        },
        {
          "type": "eq",
          "id": "m5-isolation-resistance",
          "name": "Minimum isolation resistance",
          "tex": "R_{\\mathrm{iso,min}} = 100\\ \\frac{\\Omega}{\\mathrm{V}} \\times V_{\\mathrm{max}}",
          "where": [
            [
              "R_{\\mathrm{iso,min}}",
              "lowest permitted resistance between live parts and chassis (DC circuits)",
              "Ω"
            ],
            [
              "V_{\\mathrm{max}}",
              "maximum working voltage of the circuit, full-charge pack voltage",
              "V"
            ]
          ],
          "why": "It is the type-approval floor (UNECE R100 and R136) for DC class B circuits; AC circuits need 500 Ω/V. A working vehicle should read hundreds of times higher, so the floor is a limit, not a target.",
          "example": "An 84 V pack needs at least \\(100 \\times 84 = 8.4\\ \\mathrm{k\\Omega}\\); a 116 V pack \\(11.6\\ \\mathrm{k\\Omega}\\). A healthy one reads well above 1 MΩ."
        },
        {
          "type": "p",
          "html": "An insulation fault from a chafed cable, water in a connector or a motor winding breaking down to its frame can be invisible until a second fault creates a shock path, which is why the test is part of every repair that opens the HV circuit (<a href=\"../repair/repairs/ev-insulation-check/\">check high-voltage insulation</a>)."
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
          "type": "p",
          "html": "The gases include carbon monoxide and hydrogen fluoride, which forms hydrofluoric acid on contact with moisture. A pack that has been submerged, particularly in salt water, may short internally and must be treated as damaged. After a fire or severe event, monitor the quarantined pack with a thermal camera or thermometer and hand it to a specialist recycler as damaged dangerous goods (<a href=\"../repair/repairs/ev-damaged-pack/\">handle a damaged battery pack</a>)."
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
          "html": "Phase resistances are so small that a normal multimeter's lead resistance (about 0.1–0.3 Ω) swamps them. Use a four-wire milliohm meter, or pass a known current (for example 10 A from a current-limited bench supply) and measure the drop at the terminals, \\(R = V/I\\) (Module 3). A low reading on one pair suggests shorted turns, often with overheating and a burnt smell."
        },
        {
          "type": "p",
          "html": "Compare the three phase readings as a percentage of their average, as below. For the battery, a cell group that drifts low again within days after balancing has high self-discharge, an internal soft short that can start a fire."
        },
        {
          "type": "eq",
          "id": "m5-phase-imbalance",
          "name": "Phase resistance imbalance",
          "tex": "\\mathrm{Imbalance} = \\frac{R_{\\mathrm{max}} - R_{\\mathrm{min}}}{R_{\\mathrm{avg}}} \\times 100\\ \\%",
          "where": [
            [
              "R_{\\mathrm{max}}, R_{\\mathrm{min}}",
              "highest and lowest of the three line-to-line readings",
              "mΩ"
            ],
            [
              "R_{\\mathrm{avg}}",
              "average of the three readings",
              "mΩ"
            ]
          ],
          "why": "Three equal windings read equal. More than about 5 % means a poor joint, damaged strands or shorted turns, and the pattern of which pairs are high points to the phase.",
          "example": "U-V 62, V-W 73, W-U 74 mΩ: \\(R_{\\mathrm{avg}} \\approx 69.7\\), imbalance \\(= (74 - 62)/69.7 \\times 100 \\approx 17\\ \\%\\). The two high pairs share phase W."
        },
        {
          "type": "p",
          "html": "<strong>Hall states.</strong> With 120° spacing a healthy set steps through six states per electrical cycle, for example 101, 100, 110, 010, 011, 001, with exactly one bit changing at each step (high about 4.5–5 V, low below 0.5 V). A slow or noisy edge on the oscilloscope means a weak sensor or interference. <strong>Contactor.</strong> Check the coil drive voltage at key-on and coil resistance with power off (tens to hundreds of ohms depending on coil voltage). The power lost in the contacts is \\(P = V I\\): 50–100 mV at 120 A is 6–12 W, while 0.35 V at 120 A is 42 W, enough to overheat them."
        },
        {
          "type": "table",
          "head": [
            "Group spread at rest (NMC)",
            "Interpretation"
          ],
          "rows": [
            [
              "Below 10–20 mV",
              "Normal"
            ],
            [
              "20–50 mV",
              "Drifting; allow full balance charges and recheck"
            ],
            [
              "50–100 mV",
              "Investigate the low group: high self-discharge, a failed parallel cell or a broken balance lead"
            ],
            [
              "Above 100 mV, or a group below 3.0 V",
              "Fault; remove from service for pack inspection"
            ]
          ]
        },
        {
          "type": "p",
          "html": "<strong>Capacity test.</strong> Charge fully and rest, then discharge at C/3 to C/5 into an electronic load or calibrated bench to the maker's cut-off, recording Ah and Wh; SOH is measured over rated capacity. A logged road test gives an approximate answer, but temperature, speed and payload make it far less repeatable (<a href=\"../repair/repairs/ev-range-test/\">do a range test</a>)."
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
          "text": "Job sheet 6.6.2: Testing motor phases and Hall sensors"
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
          "text": "Job sheet 6.6.3: Battery pack inspection and cell balance check"
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
          "text": "Job sheet 6.6.4: Controller and throttle fault diagnosis"
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
            ],
            [
              "Range has fallen sharply",
              "Capacity loss (low SOH), imbalance, cold weather, dragging brake, low tyre pressure"
            ],
            [
              "Charge port or connector hot",
              "Pitted or loose pins, corrosion, history of unplugging under load"
            ],
            [
              "Insulation fault warning",
              "Water ingress, chafed cable, motor winding breaking down to its casing"
            ],
            [
              "Controller overheats and derates",
              "Blocked fins, failed coolant pump, raised current limits, overloaded vehicle"
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
          "type": "p",
          "html": "Service intervals are longer and labour per year lower than for a petrol bike, but liquid-cooled machines still need controller and motor coolant, and suspension needs the same care. Record installed software versions at every service, apply contact protection only where the maker specifies it, and advise the owner on charging habits. Practice: <a href=\"../repair/repairs/service-schedule/\">service schedule</a>, <a href=\"../repair/repairs/ev-hub-motor-check/\">hub motor bearings</a>, <a href=\"../repair/repairs/drive-belt-check/\">drive belt</a>, <a href=\"../repair/repairs/chain-wear-check/\">chain wear</a> and <a href=\"../repair/repairs/ev-aux-check/\">12 V auxiliary system</a>."
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
          "type": "steps",
          "items": [
            {
              "title": "Mass and weight distribution",
              "html": "A 3.6 kWh pack (about 20 kg) and a motor (10–20 kg) replace an engine and fuel of similar mass, but battery position moves the centre of gravity and the front-rear split, which changes steering (Module 5) and braking."
            },
            {
              "title": "Structure",
              "html": "Where the engine was a stressed frame member, removing it reduces stiffness; battery mounts must take crash and vibration loads."
            },
            {
              "title": "Drive line",
              "html": "A mid-drive must line up with the original rear sprocket and chain line, and its low-speed torque may exceed what the original chain and sprockets were designed for."
            },
            {
              "title": "Brakes and suspension",
              "html": "Added or moved mass may need uprated springs; a hub motor’s unsprung mass needs damping changes."
            },
            {
              "title": "Electrical safety",
              "html": "Fusing at the battery, correctly rated cables, isolation from the frame for class B, IP protection, contactor and pre-charge, and an interlock that prevents drive while charging."
            },
            {
              "title": "12 V system",
              "html": "Lights, horn and indicators that ran from the alternator need a DC-DC converter."
            }
          ]
        },
        {
          "type": "check",
          "q": "m5-41"
        },
        {
          "type": "check",
          "q": "m5-42"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Class B starts above 60 V DC, so every charged 60 V (16S or 17S), 72 V and 96 V NMC pack is high voltage.<br>Isolate, wait, verify zero by live-dead-live, then lock out and tag; a wait alone is never proof of zero.<br>Insulation must exceed \\(100\\ \\Omega/\\mathrm{V} \\times V_{\\mathrm{max}}\\) by law, but a healthy system reads above 1 MΩ.<br>Phase resistances agree within 5 %, Hall sensors give six valid states, and contactor drops stay below about 100 mV.<br>Lithium-ion fires need cooling with large volumes of water, evacuation and 24–48 hours of quarantine."
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
  ],
  "gkey": "m5"
};
