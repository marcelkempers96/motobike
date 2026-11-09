/* Motopedia: Module 4 lessons (electrical systems). Same block types as the other modules. */
export default {
  "id": "electrics",
  "num": "4",
  "title": "Electrical systems: ignition, battery, charging and lighting",
  "intro": "How the electrical system works and how to fault-find it: circuits and measurement, the battery, charging and starting, ignition, lighting, signalling and wiring, and a step-by-step method for electrical diagnosis.",
  "pdf": "motopedia-module-3-fuel-ignition-electrical.pdf",
  "chapters": [
    {
      "id": "m3-electrical-basics",
      "title": "Electrical fundamentals and measurement",
      "lead": "Every electrical fault on a motorcycle, from a dim headlight to a starter that only clicks, obeys the same few rules: current needs a complete loop, resistance turns current into heat and lost voltage, and a meter tells the truth only when it is connected the right way. Learn them once and the rest of this module becomes a matter of applying them.",
      "lab": "overview/?mode=4t&part=wiring",
      "blocks": [
        {
          "type": "h3",
          "text": "Voltage, current and resistance"
        },
        {
          "type": "p",
          "html": "Three quantities describe every circuit on a motorcycle. <strong>Voltage</strong> (volts, V) is the electrical pressure difference between two points: a rested battery holds its positive terminal about 12.6 V above its negative terminal. <strong>Current</strong> (amperes, A) is the rate at which charge flows through a wire or component. <strong>Resistance</strong> (ohms, &Omega;) is the opposition a component offers to that flow, and it decides how much current a given voltage can push through it."
        },
        {
          "type": "p",
          "html": "A water analogy helps at first: voltage is the pressure in a hose, current the volume flowing, and resistance the narrowness of the nozzle. The two ends of the ignition system show the difference. The HT lead carries tens of kilovolts but almost no current, so it has a thin conductor inside thick insulation; the starter cable carries only 12 V but up to and beyond a hundred amps, so it has a thick conductor and thin insulation."
        },
        {
          "type": "p",
          "html": "Current is drawn in diagrams and manuals as flowing from positive, through the load, to negative (<strong>conventional current</strong>). Electrons actually move the other way, but every motorcycle wiring diagram, diode symbol and meter polarity uses the conventional direction, and so does this course."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Voltage",
              "v": "V",
              "p": "pressure difference; measured across a part with the circuit working"
            },
            {
              "l": "Current",
              "v": "A",
              "p": "rate of flow; measured through a part, with the meter in series"
            },
            {
              "l": "Resistance",
              "v": "&Omega;",
              "p": "opposition to flow; measured on a part that is dead and disconnected"
            }
          ]
        },
        {
          "type": "p",
          "html": "The motorcycle system is nominally 12 V. A charged lead-acid battery rests at about 12.6&ndash;13.1 V, and with the engine running the regulator holds 13.5&ndash;15.0 V so that the battery charges; the K-Light 125 specification is 14.5 &plusmn; 0.5 V at 5000 rpm. Older and smaller machines used 6 V systems, and some older British machines were wired with the positive terminal to the frame (positive earth), so polarity is checked before connecting a charger, a meter or a replacement electronic part."
        },
        {
          "type": "p",
          "html": "The battery and nearly all loads use <strong>direct current</strong> (DC), which flows one way. The alternator stator produces <strong>alternating current</strong> (AC), whose direction reverses many times a second and whose voltage and frequency rise with engine speed; the regulator/rectifier turns it into DC (chapter 4.2). A meter must be set to match: DC volts at the battery and the loads, AC volts at the stator wires."
        },
        {
          "type": "h3",
          "text": "The complete circuit"
        },
        {
          "type": "photo",
          "src": "repair-photos/086_simplest_wiring_system.jpg",
          "caption": "The simplest circuit: a power source, a feed (hot) wire, a load (here a test lamp) and an earth wire back to the source."
        },
        {
          "type": "p",
          "html": "Every working circuit has four parts: a <strong>source</strong> (the battery, or generating coils under the flywheel on a machine without one), a <strong>feed</strong> wire, a <strong>load</strong> that turns electrical energy into light, heat, motion or a signal, and a <strong>return</strong> path to the source. Current flows only while the loop is unbroken. A switch, a fuse or a relay contact is simply a deliberate break that can be closed, or that opens itself when something goes wrong."
        },
        {
          "type": "p",
          "html": "On a motorcycle the return path is usually the frame and engine: battery negative is bolted to them and each load is earthed to them (the <strong>earth return</strong>, chapter 4.5). Switches can sit on either side of the load. Most lighting switches interrupt the feed, while many horn buttons and the K-Light starter relay coil are switched on the earth side; the relay coil reaches earth through the clutch switch or, through a diode, the neutral switch."
        },
        {
          "type": "p",
          "html": "A load that does not work therefore has one of three faults: no supply reaching it, no earth path from it, or a break inside it. Two voltage readings at the load, with the circuit switched on and the black probe on clean bare metal of the frame, tell them apart."
        },
        {
          "type": "table",
          "head": [
            "Feed terminal",
            "Earth terminal",
            "Meaning"
          ],
          "rows": [
            [
              "Battery voltage",
              "Near 0 V",
              "Supply and earth are good; if the load still does not work, it is open inside (filament, winding) or not making contact in its holder"
            ],
            [
              "0 V",
              "0 V",
              "No supply: fuse, switch, connector or feed wire"
            ],
            [
              "Battery voltage",
              "Battery voltage",
              "Earth path open: no current flows, so nothing drops the voltage across the load and its earth side floats up to supply voltage"
            ],
            [
              "Battery voltage",
              "1&ndash;2 V",
              "High-resistance earth: current flows, but part of the voltage is lost in the earth connection and the load works weakly"
            ],
            [
              "Well below battery voltage",
              "Near 0 V",
              "High resistance on the feed side: a corroded connector, worn switch contact or damaged wire"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The third row surprises many beginners: full battery voltage on the earth side of a dead lamp does not mean a short circuit, it means the return path is broken. Practice: <a href=\"../repair/repairs/lighting-circuit-test/\">lighting circuit test</a>, <a href=\"../repair/repairs/earth-clean/\">earth cleaning</a>, <a href=\"../repair/problems/all-lights-out/\">all lights out</a>."
        },
        {
          "type": "h3",
          "text": "Ohm's law"
        },
        {
          "type": "p",
          "html": "Voltage, current and resistance are tied together by Ohm's law. Once two of them are known the third follows, which is why a manual can give a resistance specification for a coil, a lamp or a winding and expect the mechanic to predict the current and the voltage drop from it."
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
              "title": "Relay coil",
              "html": "An \\(85\\ \\Omega\\) relay coil on 12.6 V: \\(I = V/R = 12.6 / 85 \\approx 0.15\\ \\mathrm{A}\\), small enough for a handlebar button and thin wiring."
            },
            {
              "title": "Brake lamp",
              "html": "A 21 W bulb draws \\(I = 21 / 12 = 1.75\\ \\mathrm{A}\\) at 12 V, so its hot filament is \\(R = V/I = 12 / 1.75 \\approx 6.9\\ \\Omega\\)."
            },
            {
              "title": "Starter terminal",
              "html": "At 100 A of cranking current, a terminal of only \\(0.002\\ \\Omega\\) loses \\(V = I\\,R = 100 \\times 0.002 = 0.2\\ \\mathrm{V}\\)."
            }
          ]
        },
        {
          "type": "p",
          "html": "Resistance is not always constant. A tungsten filament reads about a tenth of its hot resistance when cold, so a 21 W bulb that runs at about \\(6.9\\ \\Omega\\) measures only about \\(0.7\\ \\Omega\\) on a meter and takes a brief surge of current at switch-on, which is when old bulbs usually fail. Copper windings rise in resistance as they warm, which is why manuals quote coil and stator values at 20 &deg;C and why a hot coil reads high. Diodes and LEDs do not follow Ohm's law at all; they are described later in this chapter."
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
          "type": "p",
          "html": "Combined with Ohm's law, power gives \\(P = I^2 R\\), the heat produced in any resistance, which chapter 4.5 uses to show why a corroded connector melts its housing."
        },
        {
          "type": "figure",
          "fig": "ohms-law",
          "caption": "Pick a load in watts and the supply voltage: read off the current, then see how the fuse and wire are chosen from it."
        },
        {
          "type": "h3",
          "text": "Series circuits"
        },
        {
          "type": "p",
          "html": "In a <strong>series</strong> circuit the parts are connected end to end, so the same current flows through every one of them and a break in any one stops it everywhere. Their resistances add, and the supply voltage is shared between them in proportion to their resistance."
        },
        {
          "type": "eq",
          "id": "m3-series-resistance",
          "name": "Resistances in series",
          "tex": "R_s = R_1 + R_2 + \\cdots + R_n",
          "where": [
            [
              "R_s",
              "total resistance of the series chain",
              "Ω"
            ],
            [
              "R_1,\\ R_2,\\ \\ldots,\\ R_n",
              "resistances connected end to end",
              "Ω"
            ]
          ],
          "why": "Any unwanted resistance in a circuit, such as a corroded connector or a loose earth, is in series with the load: it adds to the total, reduces the current and takes a share of the voltage.",
          "example": "A 55 W headlight running at \\(2.6\\ \\Omega\\) with a \\(0.5\\ \\Omega\\) corroded earth: \\(R_s = 2.6 + 0.5 = 3.1\\ \\Omega\\), so on 12.4 V the current is \\(12.4 / 3.1 = 4.0\\ \\mathrm{A}\\)."
        },
        {
          "type": "eq",
          "id": "m3-kvl",
          "name": "Kirchhoff's voltage law",
          "tex": "V_s = V_1 + V_2 + \\cdots + V_n",
          "where": [
            [
              "V_s",
              "supply voltage around the loop",
              "V"
            ],
            [
              "V_1,\\ V_2,\\ \\ldots,\\ V_n",
              "voltage across each part of the loop",
              "V"
            ]
          ],
          "why": "The voltage drops around a loop always add up to the supply. Voltage lost in wires, switches and connections is voltage the load does not get, which is the principle of every voltage-drop test.",
          "example": "The headlight above: \\(V_1 = 4.0 \\times 2.6 = 10.4\\ \\mathrm{V}\\) across the lamp and \\(V_2 = 4.0 \\times 0.5 = 2.0\\ \\mathrm{V}\\) across the earth, and \\(10.4 + 2.0 = 12.4\\ \\mathrm{V}\\)."
        },
        {
          "type": "p",
          "html": "Power varies with the square of voltage, so a lamp that loses a sixth of its voltage loses nearly a third of its power; the same arithmetic explains a slow starter on a corroded cable."
        },
        {
          "type": "p",
          "html": "Series connections also appear by design. The six 2.1 V cells of a lead-acid battery are in series to make 12.6 V, and two 12 V batteries joined positive to negative make 24 V, which is why only a 12 V source may be used for a jump start. The interlocks in the starter relay circuit are in series too, so every one of them must be closed before the relay can operate (chapter 4.3)."
        },
        {
          "type": "exercise",
          "title": "Two bulbs in series",
          "preset": "series-bulbs",
          "task": "Press Test. Read the voltmeter V1 across L2, then select each bulb to read its current and power. Then open S1 and watch both lamps.",
          "measure": "Current through L1 and L2, the voltage across L2, and the power of each bulb.",
          "expect": "About 0.9 A flows through both bulbs and each gets about 6.3 V, so each makes about 6 W instead of 21 W and both glow dimly. Opening S1 puts both out at once.",
          "why": "The resistances add (6.9 + 6.9 ≈ 13.7 Ω), so the current is about half that of one bulb, and each bulb gets half the voltage. Power varies with voltage squared, so half the voltage gives a quarter of the power. One break anywhere in a series loop stops the current everywhere."
        },
        {
          "type": "h3",
          "text": "Parallel circuits"
        },
        {
          "type": "p",
          "html": "In a <strong>parallel</strong> circuit each load has its own branch across the same two supply points, so every branch receives the full voltage and works independently: a blown indicator bulb does not put out the headlight. Nearly every load on a motorcycle is connected this way, between a fused feed and earth, and the branch currents add up in the shared feed wire, fuse and switch."
        },
        {
          "type": "eq",
          "id": "m3-kcl",
          "name": "Kirchhoff's current law",
          "tex": "I_{total} = I_1 + I_2 + \\cdots + I_n",
          "where": [
            [
              "I_{total}",
              "current in the shared feed, fuse or switch",
              "A"
            ],
            [
              "I_1,\\ I_2,\\ \\ldots,\\ I_n",
              "current in each branch",
              "A"
            ]
          ],
          "why": "The current flowing into a junction equals the current flowing out. A shared fuse, switch or feed wire carries the sum of its branches, so it must be sized for all the loads it feeds at once.",
          "example": "A feed supplying the H4 main beam at 4.4 A and a 21 W brake lamp at 1.75 A carries \\(I_{total} = 4.4 + 1.75 \\approx 6.2\\ \\mathrm{A}\\)."
        },
        {
          "type": "eq",
          "id": "m3-parallel-reciprocal",
          "name": "Resistances in parallel",
          "tex": "\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots + \\frac{1}{R_n}",
          "where": [
            [
              "R_p",
              "combined resistance of the parallel branches",
              "Ω"
            ],
            [
              "R_1,\\ R_2,\\ \\ldots,\\ R_n",
              "resistance of each branch",
              "Ω"
            ]
          ],
          "why": "Each extra branch is another path for current, so the combined resistance falls below that of the smallest branch. It explains why an ohm reading across a part still connected to the harness reads low; for two branches it simplifies to the product over the sum used for the CAN bus in chapter 4.5.",
          "example": "Two 21 W bulbs of \\(6.9\\ \\Omega\\) each: \\(1/R_p = 1/6.9 + 1/6.9\\), so \\(R_p \\approx 3.4\\ \\Omega\\), and on 12.4 V they draw \\(12.4 / 3.4 \\approx 3.6\\ \\mathrm{A}\\) together."
        },
        {
          "type": "p",
          "html": "Batteries can also be connected in parallel, positive to positive and negative to negative: the voltage stays at 12 V and the capacity adds, which is what jump leads do. A workshop powering a bike from a substitute battery therefore removes the flat one first, or it draws heavy current from the good one."
        },
        {
          "type": "h3",
          "text": "Voltage drop and the quality of connections"
        },
        {
          "type": "p",
          "html": "Every wire, switch contact, fuse clip and connector has a small resistance, so each drops a little voltage while current flows. Because the drop is \\(V = I\\,R\\), a corroded joint is invisible at low current, serious at high current and gone when the circuit is off. That is why a continuity buzzer, which pushes a few milliamps, cannot prove a connection good, while a <strong>voltage-drop test</strong> across a section carrying the full working current can (limits in chapter 4.6). Practice: <a href=\"../repair/repairs/voltage-drop-test/\">voltage drop test</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/086_why_big_thick_battery_cables_have.jpg",
          "caption": "Single-strand (solid) wire: stiff, and prone to fatigue cracks under vibration, so motorcycle harnesses and battery cables use many fine strands instead. A wire is never replaced with a thinner one, which heats up and drops more voltage."
        },
        {
          "type": "h3",
          "text": "Diodes, relays and switches"
        },
        {
          "type": "p",
          "html": "A <strong>diode</strong> passes current in one direction only, from anode to cathode (the bar on the symbol), and blocks it the other way. A silicon diode drops about 0.4&ndash;0.7 V while conducting, which is what a meter shows on its diode-test range. Motorcycles use diodes in the regulator/rectifier bridge, in the starter interlocks to keep the neutral lamp separate from the clutch switch, and across relay coils to absorb the voltage spike when the coil is switched off. An <strong>LED</strong> is a diode that emits light, with a forward voltage of about 2 V for red, so it always needs something to limit its current."
        },
        {
          "type": "exercise",
          "title": "A diode lets current through one way only",
          "preset": "diode",
          "task": "Press Test. Note which lamp lights. Then place a voltmeter across each diode in turn and read it.",
          "measure": "Which lamp lights, the current through it, and the voltage across each diode.",
          "expect": "Only the lamp whose diode points from the supply towards earth lights, taking about 0.4 A. Its diode shows about 0.7 V; the reversed diode blocks, shows nearly the full supply voltage across it, and its lamp stays dark.",
          "why": "A forward-biased silicon diode conducts with an almost fixed drop of about 0.7 V; reversed, it behaves as an open circuit, so the whole supply voltage appears across it. The meter's diode range uses the same behaviour to check a rectifier or an interlock diode on the bench."
        },
        {
          "type": "p",
          "html": "A <strong>relay</strong> uses a small current through a coil to close heavy contacts, so a handlebar switch and thin wiring can control a big load close to the battery. The common four-pin automotive relay numbers its coil terminals 85 and 86 and its contacts 30 (supply) and 87 (load). The starter relay switches tens to over a hundred amps this way (chapter 4.3)."
        },
        {
          "type": "p",
          "html": "Switches must suit DC. When a contact opens a direct current, the arc that forms has no zero crossing to put it out, as an AC arc has many times a second, so it keeps burning and eroding the contact. Switches made for 12 V DC therefore have contacts several times larger than household AC switches of a similar size, and a household switch fitted to a motorcycle accessory soon pits, heats and fails."
        },
        {
          "type": "photo",
          "src": "repair-photos/096_dc_ac_switch_bodies.jpg",
          "caption": "Contact points from an AC switch and a 12 V DC switch: the DC contact is much larger, to survive the arc drawn when it breaks a direct current."
        },
        {
          "type": "h3",
          "text": "Using a multimeter"
        },
        {
          "type": "photo",
          "src": "repair-photos/086_now_we_start_testing.jpg",
          "caption": "A test lamp: a probe, a bulb in the handle and an earth lead with a clip. It shows that voltage is present, but not how much."
        },
        {
          "type": "p",
          "html": "A digital multimeter does three different jobs, and each connects differently. As a <strong>voltmeter</strong> it has a very high internal resistance (typically 10 M&Omega;), takes almost no current and is connected across the part or section being measured, with the circuit working. As an <strong>ammeter</strong> it has almost no resistance and must replace a piece of wire in the path of the current, in series. As an <strong>ohmmeter</strong> it pushes its own small test current through the part and measures the voltage this produces, so the part must be dead and disconnected, or the reading is meaningless and the meter can be damaged."
        },
        {
          "type": "table",
          "head": [
            "Check",
            "Meter setting",
            "Connection",
            "Reference (K-Light 125 or typical)"
          ],
          "rows": [
            [
              "Battery at rest",
              "DC volts (20 V range)",
              "Across the terminals, after 1 h rest",
              "13.1 V full; 12.3 V needs charging"
            ],
            [
              "Charging voltage",
              "DC volts",
              "Across the battery, engine at 5000 rpm",
              "14.5 &plusmn; 0.5 V"
            ],
            [
              "Stator output",
              "AC volts",
              "Between each pair of white wires, regulator unplugged",
              "Typically 50&ndash;80 V AC at 5000 rpm, balanced between pairs"
            ],
            [
              "Stator winding",
              "Ohms",
              "Between each pair of white wires, unplugged",
              "0.8 &plusmn; 0.3 &Omega;; no continuity to earth"
            ],
            [
              "Ignition coil primary",
              "Ohms",
              "Across the primary terminals",
              "4 &Omega;"
            ],
            [
              "Trigger (pick-up) coil",
              "Ohms",
              "Across its two wires",
              "150 &plusmn; 10 &Omega;"
            ],
            [
              "Parasitic drain",
              "DC amps, then mA",
              "In series between battery negative and its lead",
              "1 mA or less"
            ],
            [
              "Rectifier or interlock diode",
              "Diode test",
              "Across the diode, both ways round",
              "0.4&ndash;0.7 V one way, open the other"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Good habits make the readings trustworthy: start on a range above the expected value, return the red lead from the 10 A socket to the volts socket after any current measurement (or the next voltage reading shorts the circuit through the meter), measure resistance near 20 &deg;C where the manual specifies it, and compare identical parts, such as the three stator pairs, with each other as well as with the book. A <strong>test lamp</strong> proves quickly that a supply is present, but not how much voltage there is, and it draws enough current to disturb ECU and sensor circuits, so it is kept off them. Practice: <a href=\"../repair/repairs/wiring-fault-find/\">wiring fault finding</a>."
        },
        {
          "type": "h3",
          "text": "Reading a wiring diagram"
        },
        {
          "type": "p",
          "html": "A wiring diagram is a map of the circuits, not a picture of the harness: it shows what connects to what, not where the parts sit on the bike. Makers draw them in several styles. Some draw each wire in its real colour, some print letter codes beside plain lines, and some split the full diagram into separate starting and charging, lighting and accessory diagrams, which are much easier to follow when only one system has failed."
        },
        {
          "type": "photo",
          "src": "repair-photos/086_colored_marked.jpg",
          "caption": "A wiring diagram with each wire drawn in its colours and a key to the symbols for connectors, earths, joined and unjoined crossings and diodes."
        },
        {
          "type": "table",
          "head": [
            "Symbol",
            "Meaning",
            "Reading it"
          ],
          "rows": [
            [
              "Long and short parallel lines",
              "Battery or cell",
              "The long line is positive"
            ],
            [
              "Short horizontal lines or a rake",
              "Earth (frame or engine)",
              "Every earth symbol is the same point electrically"
            ],
            [
              "Small rectangle or S-shape in a wire",
              "Fuse",
              "The rating is printed beside it"
            ],
            [
              "Circle with a cross",
              "Lamp",
              "A twin-filament bulb is drawn with two filaments in one circle"
            ],
            [
              "Triangle against a bar",
              "Diode",
              "Current flows in the direction the triangle points, towards the bar"
            ],
            [
              "Coil beside a switch, linked",
              "Relay",
              "The coil side and the contact side are separate circuits"
            ],
            [
              "Dot where lines meet",
              "Joined (splice or junction)",
              "Lines that cross without a dot are not connected"
            ],
            [
              "Grid of wire colours with linked circles",
              "Switch continuity table",
              "Circles joined by a line are connected in that switch position"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Switches are normally drawn in their rest position, with the key off and the levers released. Colour codes give the main colour first and the stripe after a slash, so G/Y is green with a yellow tracer. Each maker has its own abbreviations, and even within one manual the text and the drawing can disagree (the K-Light starter relay wires are an example), so the diagram for the exact model, checked against the wires on the bike, is the authority. Chapter 4.5 gives the K-Light colour code and a five-step method for tracing a circuit through the diagram."
        },
        {
          "type": "wiring",
          "tab": "harness",
          "caption": "Open the main harness in the Wiring Lab: find the battery, the main fuse, an earth point and a relay, then follow one circuit from its fuse through its switch and load back to earth."
        },
        {
          "type": "h3",
          "text": "Joining and repairing wires"
        },
        {
          "type": "p",
          "html": "Wiring itself rarely wears out. Faults come from crash damage, chafing, heat and above all corrosion at the ends, where wires enter terminals and connectors. Unplugging and refitting a connector often restores contact for a while, but a lasting repair cleans or replaces the terminal and seals it against water."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Isolate",
              "html": "Key off and battery negative disconnected; find the wire colour on the diagram and confirm it on the bike."
            },
            {
              "title": "Cut back",
              "html": "Cut out the damaged section to bright, uncorroded copper: corroded strands will not take solder and keep a high resistance."
            },
            {
              "title": "Insulation first",
              "html": "Slide adhesive-lined heat-shrink sleeve onto the wire before joining, and stagger joints in a bundle so they do not form one hard lump."
            },
            {
              "title": "Join",
              "html": "Crimp with a terminal of the correct size and a proper crimping tool, or twist the strands together, apply flux, heat the wire (not the solder) and feed solder until it flows smoothly into the strands without balling."
            },
            {
              "title": "Seal and support",
              "html": "Shrink the sleeve over the joint and tie the harness so the joint cannot flex: solder stiffens the wire, and it can crack beside the joint under vibration."
            },
            {
              "title": "Test",
              "html": "Reconnect, operate the circuit and measure the voltage drop across the repair: it should read no more than the same length of good wire."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/094_special_pliers.jpg",
          "caption": "Crimping pliers for wire terminals. Crimps are preferred near the engine and on stator leads, where heat can soften a soldered joint."
        },
        {
          "type": "p",
          "html": "Practice: <a href=\"../repair/repairs/connector-clean/\">connector cleaning</a>, <a href=\"../repair/repairs/accessory-wiring/\">accessory wiring</a>."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Working safely on 12 V",
          "html": "A 12 V battery cannot give a shock through dry skin, but it can deliver hundreds of amps into a short circuit: enough to weld a spanner, melt a ring or watch strap and start a fire. Remove jewellery, disconnect the negative terminal before working on wiring and refit it last, and never bridge relay or battery terminals with a tool. Ignition systems, by contrast, produce tens of kilovolts."
        },
        {
          "type": "check",
          "q": "m3b-01"
        },
        {
          "type": "check",
          "q": "m3b-02"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Voltage is measured across a part with the circuit working, current through it in series, resistance on a dead, disconnected part.<br>Ohm's law \\(V = I\\,R\\) and power \\(P = V\\,I\\) predict currents, voltage drops and heat from manual values.<br>Series resistances add and share the supply voltage; any corrosion is a series resistance that steals voltage from the load.<br>Parallel branches each get the full voltage, and their currents add in the shared fuse and feed.<br>A dead load with full voltage on its earth side has an open earth, not a short.<br>Use the diagram for the exact model: switches at rest, colour codes with the stripe after the slash, and a dot for every join."
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
          "type": "p",
          "html": "Rested voltage shows charge, not condition. A battery with high internal resistance, from sulphation or a failing cell, can rest at 12.8 V and still collapse under the starter. The K-Light battery job sheet therefore adds a cranking test: with the engine disabled so that it cannot start, the voltage at the terminals must stay above 9.6 V while cranking. A lower figure from a fully charged battery means a worn battery, or a starter or engine that takes too much current (chapter 4.3). On a flooded battery, hydrometer readings that differ clearly between cells point to a failing cell that no amount of charging will recover."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Rest",
              "html": "Leave the battery at least 1 h without charging or running, then read the open-circuit voltage on the posts, not the cable clamps."
            },
            {
              "title": "Decide",
              "html": "K-Light: 13.1 V is full; at 12.3 V or below, charge it before any other electrical test."
            },
            {
              "title": "Charge",
              "html": "Disconnect or remove the battery and charge at 0.6 A for 10&ndash;15 h, or with a smart charger set for its type, in a ventilated place."
            },
            {
              "title": "Recheck",
              "html": "30 minutes after charging the voltage must be 12.8 V or more; lower means the battery no longer holds its charge."
            },
            {
              "title": "Cranking test",
              "html": "Refit, disable the engine and crank for a few seconds: the voltage must stay above 9.6 V."
            },
            {
              "title": "Drain",
              "html": "If it goes flat again while standing, test for parasitic drain (limit 1 mA, chapter 4.6)."
            }
          ]
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
          "text": "Fitting, commissioning and storing a battery"
        },
        {
          "type": "p",
          "html": "A replacement battery must match the original in type, voltage, terminal layout and size, and the K-Light manual warns against fitting a liquid-filled battery where an AGM is specified. Some AGM batteries are supplied dry with a separate sealed acid pack: they are filled exactly as the maker instructs and charged before fitting, because a newly filled battery is not fully charged. A flooded battery's vent tube is routed as the manual shows, clear of the chain, frame and exhaust, since acid mist corrodes whatever it reaches."
        },
        {
          "type": "p",
          "html": "Terminals are cleaned to bright metal, the bolts tightened firmly and the terminal covers refitted; a light film of petroleum jelly or dielectric grease over the finished joint slows corrosion. The positive lead goes on first and the negative last, and the hold-down strap is fitted so that the battery cannot move and chafe its cables. A machine laid up for the winter has its battery charged every 3 months, or kept on a maintainer suited to its chemistry, because a lead-acid battery left partly discharged sulphates. Practice: <a href=\"../repair/repairs/battery-replace/\">battery replacement</a>, <a href=\"../repair/repairs/recommission-after-storage/\">recommissioning after storage</a>, <a href=\"../repair/problems/new-battery-dies/\">new battery dies</a>."
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
          "type": "p",
          "html": "A lithium battery is charged with a charger that has a LiFePO4 mode: constant current, then constant voltage to no more than about 14.6 V, with no desulphation pulses. The bike's own charging system must hold within the same window, so the charging voltage is checked at 5000 rpm before a lithium battery is fitted to an older machine whose regulator may be marginal."
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
          "type": "p",
          "html": "Resistance tests prove continuity, not output. The charging job sheet therefore also measures the <strong>AC output</strong>: regulator unplugged, meter on AC volts between each pair of stator wires, engine at 5000 rpm. The three readings should be roughly equal, within about 10 % of each other, and typically 50&ndash;80 V AC on a three-phase stator. One low pair with good resistance points to a winding that shorts only when hot or under load; all three low together point to the rotor or to an engine speed lower than intended."
        },
        {
          "type": "p",
          "html": "The regulator/rectifier is then checked with the meter's diode range between each stator terminal and the output and earth terminals: each diode should conduct one way (about 0.4&ndash;0.7 V) and block the other. A diode that conducts both ways is shorted and lets battery current flow back to earth, which can flatten the battery overnight or blow the main fuse; one that blocks both ways is open and reduces the output. Readings vary between makes, so the manual's table, where one is given, takes precedence."
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
          "type": "p",
          "html": "Chapter 4.3 takes the starting system further: the starter motor and its back-EMF, the reduction gears, the failure modes of the relay, the diode in the interlock chain, the kickstarter and a step-by-step job sheet for an engine that will not crank."
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
      "id": "m3-starting",
      "title": "Starting systems",
      "lead": "Starting asks more of the electrical system than anything else on the motorcycle: tens to over a hundred amps for a few seconds, delivered through a relay, a chain of safety switches, a reduction gear and a one-way clutch. Each link fails in its own recognisable way, and the order of the tests follows the order of the links.",
      "blocks": [
        {
          "type": "h3",
          "text": "What the starting system must do"
        },
        {
          "type": "p",
          "html": "To start, an engine must be turned fast enough for the carburettor or injection to deliver a combustible mixture, for compression to heat it and for the ignition to give a full spark: typically a few hundred rpm. The effort is uneven, light on the exhaust and induction strokes and heavy against compression, and it is greatest on a cold morning, when the oil is thick and the battery at its weakest. The starting system therefore has to supply a large, short burst of torque, then get out of the way the instant the engine fires and accelerates past it."
        },
        {
          "type": "p",
          "html": "Two systems do this on motorcycles. The <strong>electric starter</strong>, now fitted to almost every road machine, uses a DC motor, a relay and the battery. The <strong>kickstarter</strong> uses the rider's leg through a ratchet, and survives on off-road machines and on many small commuters, the K-Light 125 included, as a backup for a flat battery. Chapter 4.2 introduced both; this chapter follows each through in detail, with its faults and test order."
        },
        {
          "type": "photo",
          "src": "repair-photos/099_starter_wiring.jpg",
          "caption": "A typical electric starting circuit: battery, fuse, main switch, starter button, relay coil and contacts, the diode linking the clutch and neutral switches, and the starter motor with its field coils, armature and brushes."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Starter current",
              "v": "tens to 100+ A",
              "p": "while cranking; the start button carries only a few hundred milliamps"
            },
            {
              "l": "Reduction",
              "v": "about 14:1",
              "p": "typical overall gearing from starter motor to crankshaft"
            },
            {
              "l": "Cranking voltage",
              "v": "above 9.6 V",
              "p": "K-Light battery test with the engine cranking"
            }
          ]
        },
        {
          "type": "h3",
          "text": "The starter motor"
        },
        {
          "type": "p",
          "html": "The starter is a brushed DC motor built for very high torque for a few seconds at a time. A steel yoke carries the field: permanent magnets on most small machines, or field coils (also called pole coils) on older and larger ones. Inside it the <strong>armature</strong> carries many coils whose ends are joined to the copper bars of a <strong>commutator</strong>. Carbon <strong>brushes</strong>, pressed against the commutator by springs, feed current into whichever armature coils are in position to be pushed round by the field, so the torque continues as the armature turns."
        },
        {
          "type": "photo",
          "src": "repair-photos/099_four_brushes.jpg",
          "caption": "The brush plate of a starter motor: four carbon brushes in their holders with springs and braided leads, and the insulated terminal bolt for the heavy cable."
        },
        {
          "type": "p",
          "html": "Most starters have four poles and four brushes; two-brush designs load their brushes more heavily. Some sparking at the brushes while running is normal, heavy sparking is not. The brushes wear with every start, and once they are short their springs press them too lightly, contact resistance rises and the starter slows. The K-Light 125 brush length is 12.5 mm new with a service limit of <strong>8.5 mm</strong>; the motor is held to the crankcase by two bolts at 10&ndash;12 N&middot;m and sealed into the case by an O-ring."
        },
        {
          "type": "photo",
          "src": "repair-photos/099_commutator_segments.jpg",
          "caption": "Checking an armature: there should be continuity between all the commutator segments, and none between any segment and the armature shaft."
        },
        {
          "type": "p",
          "html": "Inside the motor the meter checks are simple. Every pair of commutator segments should show continuity, because they are joined through the armature coils; any segment showing continuity to the armature shaft means a winding is shorted to earth. The field coils, where fitted, must show continuity from the terminal bolt to their brush and none to the yoke. A dull or burnt commutator can be cleaned with fine abrasive paper, but a scored one, worn brushes or a shorted armature normally means a rebuilt or new starter. When reassembling, the alignment marks on the yoke and end covers must line up: an end cover turned to the wrong position puts the brushes in the wrong place and the motor will not run. Practice: <a href=\"../repair/repairs/starter-motor-service/\">starter motor service</a>."
        },
        {
          "type": "p",
          "html": "A DC motor turned by an outside force becomes a generator, and some older two-strokes used one unit as both starter and charging generator (the <strong>starter-generator</strong> or dynastarter). On every starter the same effect matters while it runs: the spinning armature generates a <strong>back-EMF</strong> that opposes the battery, so the current is highest when the armature is stalled and falls as it speeds up."
        },
        {
          "type": "eq",
          "id": "m3-starter-current",
          "name": "Starter motor current",
          "tex": "I = \\frac{V - E_b}{R_a}",
          "where": [
            [
              "I",
              "current drawn by the starter",
              "A"
            ],
            [
              "V",
              "voltage at the starter terminal while cranking",
              "V"
            ],
            [
              "E_b",
              "back-EMF generated by the turning armature, rising with its speed",
              "V"
            ],
            [
              "R_a",
              "resistance of the armature, brushes and field windings",
              "Ω"
            ]
          ],
          "why": "A starter draws its largest current when it cannot turn (a seized or hydraulically locked engine, or a tight engine in the cold) and least when it spins freely. Heavy current with slow cranking points to mechanical drag; slow cranking on low current points to resistance in the cables, relay contacts or brushes.",
          "example": "For illustration, with the armature stalled \\(E_b = 0\\), so at \\(V = 10\\ \\mathrm{V}\\) and \\(R_a = 0.1\\ \\Omega\\) the current is limited only by resistance: \\(10 / 0.1 = 100\\ \\mathrm{A}\\). Once the armature turns and \\(E_b\\) rises to \\(5\\ \\mathrm{V}\\), the current falls to \\((10 - 5) / 0.1 = 50\\ \\mathrm{A}\\)."
        },
        {
          "type": "p",
          "html": "The torque of a DC motor is proportional to its current (the same relation, \\(T = K_t\\,I\\), as for the traction motors of chapter 6.2), so the high stall current is exactly what gives the break-away torque needed against compression. It also makes the starter the heaviest load in the system. Its voltage is pulled down by the battery's internal resistance and by every cable and terminal in the heavy circuit, so cranking voltage tests the whole circuit, not only the battery."
        },
        {
          "type": "h3",
          "text": "Reduction gearing and engagement"
        },
        {
          "type": "p",
          "html": "Even at stall the starter cannot turn the crank directly, so it is geared down, typically about 14:1 overall, through one or two idle (reduction) gears to a driven gear behind the flywheel. Some starters add a planetary gear set inside the motor body. Some older engines drive through a short chain and sprockets, which means the side cover must come off to refit the starter, because the sprocket falls off its shaft when the motor is withdrawn."
        },
        {
          "type": "photo",
          "src": "repair-photos/099_other_safety_cut_out_switches_can_3.jpg",
          "caption": "A chain-driven starter reduction with the side cover off: the small sprocket on the starter shaft drives the starter clutch behind the flywheel rotor."
        },
        {
          "type": "eq",
          "id": "m3-starter-reduction",
          "name": "Cranking speed and torque through the starter reduction",
          "tex": "n_c = \\frac{n_m}{i} \\qquad T_c = T_m\\, i\\, \\eta",
          "where": [
            [
              "n_c",
              "crankshaft speed while cranking",
              "r/min"
            ],
            [
              "n_m",
              "starter motor speed",
              "r/min"
            ],
            [
              "i",
              "overall reduction ratio, starter to crank",
              "none"
            ],
            [
              "T_c",
              "torque delivered to the crankshaft",
              "N·m"
            ],
            [
              "T_m",
              "starter motor torque",
              "N·m"
            ],
            [
              "\\eta",
              "efficiency of the reduction gears",
              "none"
            ]
          ],
          "why": "The reduction trades speed for torque so that a small, fast motor can turn the engine against compression. A broken idle gear or slipping starter clutch changes nothing in the motor, but stops the torque reaching the crank.",
          "example": "With a 14:1 reduction, a starter spinning at \\(4200\\ \\mathrm{r/min}\\) turns the crank at \\(4200 / 14 = 300\\ \\mathrm{r/min}\\), and \\(1\\ \\mathrm{N\\,m}\\) at the motor becomes about \\(1 \\times 14 \\times 0.9 \\approx 12.6\\ \\mathrm{N\\,m}\\) at the crank through a 90 % efficient train."
        },
        {
          "type": "p",
          "html": "The starter must also be disconnected from the engine once it fires, or the engine would drive it to destructive speed. Three methods exist. Most Japanese engines, and many others, use a one-way <strong>starter clutch</strong> on the flywheel. Harley-Davidson, many European machines and almost all cars use a solenoid that both closes the motor contacts and levers the pinion into a ring gear (a pre-engaged starter). A third type, the inertia (Bendix) drive, throws the pinion along a helical thread into mesh as the motor spins up; it is common on small garden engines but rare on motorcycles."
        },
        {
          "type": "photo",
          "src": "repair-photos/099_planetary_gears.jpg",
          "caption": "A planetary reduction gear set inside a starter motor body, between the armature and the output pinion."
        },
        {
          "type": "h3",
          "text": "The starter clutch"
        },
        {
          "type": "photo",
          "src": "repair-photos/099_starter_clutch.jpg",
          "caption": "A roller-type overrunning clutch: spring-loaded rollers wedge between the inner and outer races in one direction (lock) and roll free in the other."
        },
        {
          "type": "p",
          "html": "The <strong>starter clutch</strong> (one-way, overrunning or sprag clutch) sits between the starter driven gear and the flywheel. In the roller type each roller sits in a tapered pocket, pushed towards the narrow end by a spring and push piece. When the starter drives, the rollers wedge between the races and lock them together; once the engine runs faster than the starter gear, the rollers are carried back to the wide end of their pockets and the gear freewheels. A sprag type does the same with figure-of-eight sprags tilted between two plain races."
        },
        {
          "type": "p",
          "html": "Its failures are characteristic. Worn rollers, flattened races or a broken spring let the clutch slip, so the starter whirs at high speed while the engine stays still or jerks round; the MAVCC course names this as the commonest starter fault. A clutch that sticks lets the engine drive the starter, screeches after starting and can destroy the motor. A weak battery or a starter wired to run backwards can also make a sound clutch appear to slip, so both are checked before the engine is opened. With the flywheel off, the driven gear must turn freely one way and lock the other, and the rollers, races and gear hub must be free of flats, pitting and wear marks. K-Light 125 service limits for the reduction gear are 8.3 mm for the idle gear bush bore and 7.94 mm for the idle shaft diameter. Practice: <a href=\"../repair/repairs/starter-clutch-check/\">starter clutch check</a>, <a href=\"../repair/problems/starter-spins-freely/\">starter whirs, engine still</a>."
        },
        {
          "type": "engine",
          "shot": "05-generator-electric-start",
          "view": "gen",
          "caption": "Press the starter in Under the Engine: the motor turns the crank through the reduction gears and the one-way clutch behind the flywheel, which freewheels the moment the engine fires."
        },
        {
          "type": "h3",
          "text": "The starter relay"
        },
        {
          "type": "p",
          "html": "Starter current cannot pass through the handlebar switches: the contacts would burn, and the cables to the bars would have to be as thick as the battery leads. A <strong>starter relay</strong> (often called the solenoid or starter magnetic switch) is therefore mounted close to the battery. Its coil draws a few hundred milliamps through the start button and interlocks, and its magnetic pull closes a heavy contact plate across two large terminals, connecting the battery cable to the starter cable. On many machines the main fuse is built into the relay body; the K-Light circuit has a 20 A main fuse and two 10 A circuit fuses."
        },
        {
          "type": "table",
          "head": [
            "Relay failure",
            "Symptom",
            "Test"
          ],
          "rows": [
            [
              "Coil open, or no coil supply or earth",
              "No click, starter silent",
              "Coil supply with the button pressed; coil earth through the interlocks; coil continuity on the bench"
            ],
            [
              "Contacts burnt",
              "Click, but the starter does not turn or turns slowly",
              "Voltage drop across the two heavy terminals while cranking; bench test: near 0 &Omega; across the contacts with 12 V on the coil"
            ],
            [
              "Contacts welded",
              "Starter keeps running after the button is released",
              "Near 0 &Omega; across the heavy terminals with no power on the coil; disconnect the battery at once"
            ],
            [
              "Loose or corroded heavy terminal",
              "Slow cranking, hot terminal",
              "Voltage drop across each terminal and cable end"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The K-Light bench test puts the meter across the two heavy terminals and 12 V across the coil terminals: the relay must click and read close to 0 &Omega;, then return to open when the coil is disconnected. Some relays contain a diode and must be powered the right way round. The heavy terminals are never bridged with a screwdriver on the bike to test the starter: the arc can burn the hand, weld the tool, ignite fuel vapour and start the engine in gear with nobody holding the clutch. Practice: <a href=\"../repair/repairs/starter-relay-test/\">starter relay test</a>, <a href=\"../repair/repairs/fuse-relay-check/\">fuse and relay check</a>, <a href=\"../repair/problems/starter-keeps-running/\">starter keeps running</a>."
        },
        {
          "type": "h3",
          "text": "Interlocks and the control circuit"
        },
        {
          "type": "p",
          "html": "The relay coil circuit is a series chain: the key switch, engine stop switch, start button and interlocks must all be closed before current can flow. Modern machines combine the switches so that the engine can be started in neutral, or in gear with the clutch pulled, but cannot be ridden off with the side stand down. On the K-Light 125 the relay coil is fed through the main fuse, key switch, start button and engine stop switch, and reaches earth through the clutch switch or, through a diode, the neutral switch; the ECU also reads the clutch, neutral and side-stand switches. Scooters and the K-Light also need a brake lever pulled."
        },
        {
          "type": "p",
          "html": "The diode lets two switches share one earth path without interfering. The neutral switch earths both the neutral lamp and, through the diode, the relay coil. The clutch switch earths the relay coil directly, and the diode stops that earth from reaching the neutral lamp, which would otherwise light whenever the clutch was pulled in gear. A diode that fails open stops starting in neutral without the clutch pulled; one that fails short lights the neutral lamp whenever the clutch is pulled."
        },
        {
          "type": "table",
          "head": [
            "Condition (typical; check the manual)",
            "Starter",
            "Engine already running"
          ],
          "rows": [
            [
              "Neutral, side stand up or down",
              "Cranks",
              "Keeps running"
            ],
            [
              "In gear, clutch pulled, side stand up",
              "Cranks",
              "Keeps running"
            ],
            [
              "In gear, clutch released",
              "Does not crank",
              "Keeps running if the stand is up"
            ],
            [
              "In gear, side stand down",
              "Blocked on many models",
              "Stops: side-stand cut-out through the ECU or ignition unit"
            ],
            [
              "Engine stop switch at OFF",
              "Does not crank on most models",
              "Stops"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Interlocks fail through dirt, water and mechanical damage: a side-stand switch packed with mud, a bent stand bracket, a clutch switch that the lever no longer reaches because of excess free play, or a connector that loses contact over bumps and cuts the engine. Each is tested with the meter on continuity, and the reading must change as the switch is operated. They are never bridged out permanently: a bike that starts in gear can jump forward, and a stand left down can dig into the road in a left-hand corner. Practice: <a href=\"../repair/repairs/interlock-switch-test/\">interlock switch test</a>, <a href=\"../repair/repairs/neutral-switch-test/\">neutral switch test</a>, <a href=\"../repair/repairs/side-stand-check/\">side stand check</a>, <a href=\"../repair/repairs/kill-switch-test/\">engine stop switch test</a>, <a href=\"../repair/problems/start-blocked-interlock/\">will not start in gear or on the stand</a>."
        },
        {
          "type": "wiring",
          "tab": "starting",
          "caption": "Hold START in neutral and follow the two circuits: the small control current through the button and interlocks to the relay coil, and the heavy current through the relay contacts to the starter. Then select a gear without the clutch and see which switch breaks the chain."
        },
        {
          "type": "h3",
          "text": "The kickstarter"
        },
        {
          "type": "p",
          "html": "A kickstarter turns the crank through the gearbox or the primary drive. The pedal is splined to a shaft carrying a ratchet; on the downstroke the ratchet engages a gear that drives the crank, usually through the clutch, so on most machines the gearbox must be in neutral and the clutch must grip. Some engines have a primary kickstart that drives the clutch outer directly and can be kicked in gear with the clutch pulled. At the bottom of the stroke a stopper ramp lifts the ratchet out of engagement, and the return spring brings the pedal back up, so the ratchet does not rattle against the gear while the engine runs."
        },
        {
          "type": "engine",
          "shot": "06-kickstart",
          "view": "start",
          "caption": "Kick starting in Under the Engine: the kick shaft turns the crank through the kick idle gear and the clutch basket, then disengages at the end of the stroke."
        },
        {
          "type": "p",
          "html": "Kickstart faults are mostly mechanical. A pedal that slips without turning the engine has worn ratchet teeth, a weak ratchet spring or a slipping clutch; one that stays down has a broken or unhooked return spring; one that grinds while riding has a ratchet that is not disengaging. The MAVCC unit traces most kickstart assembly faults to a ratchet fitted with its alignment mark out of register with the return-spring hole. A <strong>kickback</strong>, the engine firing early and throwing the pedal back up, points to ignition timing that has moved, for example a loose flywheel or trigger, so the pedal is pushed with the ball of the foot and the ankle in line with it. Practice: <a href=\"../repair/repairs/kickstart-check/\">kickstart check</a>, <a href=\"../repair/problems/kickstart-slips/\">kickstart slips</a>, <a href=\"../repair/problems/kickstart-kickback/\">kickstart kicks back</a>."
        },
        {
          "type": "h3",
          "text": "Using the starter well"
        },
        {
          "type": "p",
          "html": "A starter is rated for short bursts. Cranking for long periods overheats the windings and can burn out a coil, so the starter is run for no more than about five seconds at a time, followed by about a minute to cool, and the reason the engine will not start is found rather than the battery flattened. On an injected machine it pays to check first that the fuel pump primes at key-on (for about 3 s on the K-Light) and that no fault lamp is lit."
        },
        {
          "type": "p",
          "html": "Laid-up machines cause most starter failures today: a gummed carburettor or stale fuel makes the rider crank on and on, and the starter burns out from heat long before its brushes wear. Bench testing has its own rule. A starter running without load races to high speed, so it is run for only a second or two, clamped firmly in a vice, because it kicks hard as it starts."
        },
        {
          "type": "p",
          "html": "A battery that cannot crank the engine can be helped with a motorcycle jump pack or another 12 V motorcycle battery: connect positive to positive, then donor negative, and make the last connection to bare metal on the frame or engine of the flat bike, away from the battery. A car may be used as donor only with its engine off, so that its charging system cannot push high voltage into the motorcycle electronics, and a lithium battery is jumped only as its maker allows. A jump start gets the bike home; it does not cure the cause. Practice: <a href=\"../repair/repairs/jump-start/\">jump start</a>."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Before cranking",
          "html": "Neutral selected and the bike on its stand, hands, leads and clothing clear of the chain, wheel and fan. When the engine must crank without starting for a test, remove the fuel pump fuse or earth the plug through a spark tester; do not use the engine stop switch, which may also cut the relay."
        },
        {
          "type": "h3",
          "text": "Starting system faults"
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
              "No click, nothing happens",
              "Flat battery, main fuse, key or stop switch, interlock, start button, relay coil",
              "Battery voltage; fuses; coil supply and earth at the relay"
            ],
            [
              "Relay clicks, starter silent",
              "Burnt relay contacts, open cable or terminal, worn brushes, open armature",
              "Voltage at the starter terminal while cranking; drop across the relay"
            ],
            [
              "Rapid clicking",
              "Battery too weak to hold the relay in under load, loose battery terminal",
              "Rested and cranking voltage; terminal tightness"
            ],
            [
              "Slow cranking",
              "Discharged or worn battery, high resistance on the positive or earth side, worn brushes, thick oil or a tight engine",
              "Cranking voltage above 9.6 V; drops of 0.5 V or less positive side and 0.3 V or less earth side; brushes 8.5 mm or more"
            ],
            [
              "Starter whirs, engine still",
              "Slipping starter clutch, broken idle gear",
              "Starter clutch lock and freewheel test; idle gear teeth"
            ],
            [
              "Grinding or screech on starting or after",
              "Damaged gear teeth, sticking starter clutch",
              "Reduction gears; clutch freewheel"
            ],
            [
              "Starter keeps running after release",
              "Welded relay contacts, stuck button, wire shorted into the coil circuit",
              "Disconnect the battery; relay contacts open with no coil power"
            ],
            [
              "Starts in neutral only, not in gear with the clutch pulled",
              "Clutch switch, its adjustment or its wiring; side stand down",
              "Clutch switch continuity; lever free play"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Job sheet: engine does not crank"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Battery",
              "html": "Rested voltage at least 12.3 V on the K-Light (charge it below that), terminals clean and tight, main earth cable to the engine secure."
            },
            {
              "title": "Conditions",
              "html": "Key on, stop switch at RUN, neutral lamp on, clutch lever and (on the K-Light and scooters) brake lever pulled, side stand up."
            },
            {
              "title": "Listen",
              "html": "No click: test the control circuit. A click: test the heavy circuit and the starter."
            },
            {
              "title": "Control circuit",
              "html": "Battery voltage on the relay coil feed (green/yellow on the K-Light) with the button pressed; continuity from the coil earth wire to earth through the clutch or neutral switch; then bench-test the relay."
            },
            {
              "title": "Heavy circuit",
              "html": "Close to battery voltage at the starter terminal while cranking; locate any loss with voltage drops across the positive cable, the relay contacts and the earth side (job sheet 4.6.4)."
            },
            {
              "title": "Starter and engine",
              "html": "Good voltage but slow or no rotation: the engine must turn freely by hand or with the kickstarter; then remove the starter and check brushes, commutator and armature."
            }
          ]
        },
        {
          "type": "p",
          "html": "The order matters because each step costs more than the one before: most reported starter faults turn out to be a flat battery or a loose terminal. Practice: <a href=\"../repair/repairs/starter-circuit-test/\">starter circuit test</a>, <a href=\"../repair/problems/starter-clicks/\">starter clicks but the engine does not turn</a>, <a href=\"../repair/problems/starter-silent/\">nothing happens at the button</a>, <a href=\"../repair/problems/slow-cranking/\">slow cranking</a>."
        },
        {
          "type": "check",
          "q": "m3b-03"
        },
        {
          "type": "check",
          "q": "m3b-04"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "The start button switches only the relay coil; the relay switches tens to over a hundred amps close to the battery.<br>Starter current is highest at stall, \\(I = (V - E_b)/R_a\\), and a reduction of about 14:1 multiplies the motor torque at the crank.<br>The one-way starter clutch locks to crank and freewheels once the engine fires; a slipping one lets the starter whir with the engine still.<br>The K-Light relay coil earths through the clutch switch or, through a diode, the neutral switch; the diode keeps the neutral lamp off when the clutch is pulled in gear.<br>Crank for no more than about five seconds, then let the starter cool; never bridge relay terminals on the bike.<br>Test in order: battery, then the control circuit if the relay is silent, the heavy circuit if it clicks, and the starter clutch if the starter whirs."
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
          "type": "p",
          "html": "The primary obeys Ohm's law (chapter 4.1): the K-Light coil's \\(4\\ \\Omega\\) primary on 12 V draws \\(I = V/R = 12/4 = 3\\ \\mathrm{A}\\), and at 14 V it draws \\(3.5\\ \\mathrm{A}\\). The three steps below chain the coil equations together."
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
          "type": "p",
          "html": "Coil resistances vary widely with design. Coils for CDI systems, which work as pulse transformers, typically read about 0.5&ndash;1.5 &Omega; on the primary, and secondaries typically read several thousand ohms, so the cap is removed or measured separately. A coil can pass both tests cold and still fail when hot or at full voltage, so an intermittent misfire is tested straight after it occurs, with a coil tester under load, or by substituting a known good coil. On many machines the coil mounting bar is the earth for both windings, and a corroded mount gives the same symptoms as a failed coil."
        },
        {
          "type": "table",
          "head": [
            "Part",
            "K-Light 125",
            "Typical range, other designs"
          ],
          "rows": [
            [
              "Coil primary",
              "4 &Omega; &plusmn; 10&ndash;15 %",
              "0.5&ndash;1.5 &Omega; for CDI coils"
            ],
            [
              "Coil secondary, cap off",
              "13.6 k&Omega; &plusmn; 15 %",
              "about 6&ndash;13 k&Omega;"
            ],
            [
              "Suppressor cap",
              "about 5 k&Omega;",
              "resistor caps of several k&Omega;"
            ],
            [
              "Trigger (pick-up) coil",
              "150 &plusmn; 10 &Omega;; over 1.7 V peak cranking",
              "varies widely: use the manual"
            ],
            [
              "Exciter (source) coil, AC-CDI",
              "not fitted (ECU ignition)",
              "about 300&ndash;500 &Omega; to earth"
            ]
          ]
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
          "html": "On an AC-CDI the stator carries a separate <strong>exciter</strong> (source) coil that charges the capacitor; on some mopeds and small European machines the ignition coil itself sits under the flywheel, combined with the generating coil. Pulser and exciter both produce pulses too short for an ordinary meter to register, so their output is read with a <strong>peak-voltage adapter</strong> while cranking: the K-Light trigger must give more than 1.7 V peak. A trigger with the correct resistance but a low peak has too large an air gap, a damaged reluctor or too low a cranking speed."
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
          "type": "p",
          "html": "In a wasted-spark system the two plugs of a pair are in series across one secondary winding, so the spark jumps from centre to earth electrode in one plug and from earth to centre electrode in the other. The plug firing in the reversed direction needs a little more voltage, and both plugs fire every revolution, one on compression and one, to no effect, at the end of the exhaust stroke. Stick coils sit directly on the plug, removing HT lead losses and leakage, and let the ECU time each cylinder separately."
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
          "type": "steps",
          "items": [
            {
              "title": "Prepare",
              "html": "Engine warm and idling correctly; timing hole cap removed from the left cover; the F (firing) mark on the flywheel picked out with chalk. T marks top dead centre."
            },
            {
              "title": "Connect",
              "html": "Clip the inductive pick-up of the timing light round the HT lead and its supply leads to the battery, all clear of the fan, chain and wheel."
            },
            {
              "title": "Read at idle",
              "html": "K-Light 125: 15&deg; &plusmn; 1&deg; before TDC at 1500 &plusmn; 100 rpm. The F mark should line up with the index line on the cover."
            },
            {
              "title": "Read the advance",
              "html": "Raise the engine speed: on engines with advance marks the index moves into the advance range."
            },
            {
              "title": "Interpret",
              "html": "On a fixed-timing ECU or CDI engine a wrong reading is a fault to find, not an adjustment: a sheared flywheel key, a loose flywheel or trigger, or a wrong or faulty CDI or ECU."
            }
          ]
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
          "type": "steps",
          "items": [
            {
              "title": "Remove",
              "html": "Engine cold: pull the cap straight off, blow dirt out of the plug well, then unscrew the plug with the spanner kept square."
            },
            {
              "title": "Inspect",
              "html": "Read the insulator colour (table below); replace a plug with a cracked insulator, eroded electrodes or heavy fouling."
            },
            {
              "title": "Gap",
              "html": "Check with a wire gauge: 0.7 &plusmn; 0.1 mm on the K-Light. Set a new plain plug by bending only the earth electrode; the K-Light manual replaces a used plug whose gap is out of range."
            },
            {
              "title": "Fit",
              "html": "Start the thread by hand until it seats, then tighten to 15 N&middot;m on the K-Light, and push the cap on until it clicks."
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
          "type": "p",
          "html": "A no-spark fault is followed in a fixed order, cheapest checks first: battery above 12.4 V, the engine stop switch, the side-stand and neutral logic (the ECU or CDI may cut the spark), then the spark test with a tester gap of 6&ndash;8 mm, coil primary and secondary resistances, pick-up resistance and peak voltage, and finally the wiring from the coil to ECU pins 1 and 13. Only when all of these pass is the CDI or ECU suspected, ideally confirmed by substituting a known good unit. Practice: <a href=\"../repair/problems/no-spark/\">no spark</a>, <a href=\"../repair/problems/weak-spark/\">weak spark</a>, <a href=\"../repair/problems/backfire-on-start/\">backfire on starting</a>."
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
          "type": "p",
          "html": "The current any lamp draws follows from its wattage, \\(I = P/V\\) (chapter 4.1): an H4 main beam at 13.5 V takes about \\(60 / 13.5 \\approx 4.4\\ \\mathrm{A}\\), the first step in choosing its wire, fuse and switch."
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
          "type": "table",
          "head": [
            "Lamp",
            "Bulb",
            "Rating",
            "Current at 13.5 V"
          ],
          "rows": [
            [
              "Headlight, main beam",
              "H4",
              "60 W",
              "4.4 A"
            ],
            [
              "Headlight, dipped beam",
              "H4",
              "55 W",
              "4.1 A"
            ],
            [
              "Indicator, each",
              "R10W",
              "10 W",
              "0.74 A"
            ],
            [
              "Brake",
              "P21/5W",
              "21 W",
              "1.6 A"
            ],
            [
              "Tail",
              "P21/5W",
              "5 W",
              "0.37 A"
            ],
            [
              "Number plate",
              "W5W",
              "5 W",
              "0.37 A"
            ],
            [
              "Front position",
              "W3W",
              "3 W",
              "0.22 A"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Adding the lamps that are on together gives the load the alternator must cover. Dipped beam, tail, plate and position lamps alone come to about 5 A, close to 70 W at 13.5 V, before the ECU, fuel pump and ignition take their share, which is why the charging balance of a small single is tight with the lights on at idle."
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
          "type": "steps",
          "items": [
            {
              "title": "Tyres and position",
              "html": "Tyre pressures normal; bike on level ground facing a wall at the distance the manual or testing rules give, pointing straight at it."
            },
            {
              "title": "Rider seated",
              "html": "Off the stand, with the rider (or someone of similar weight) in the normal riding position and the handlebar straight."
            },
            {
              "title": "Mark the height",
              "html": "Measure the height of the headlight centre and mark it on the wall straight ahead of the lamp."
            },
            {
              "title": "Read the cut-off",
              "html": "On dipped beam the bright top edge should sit below the mark by the drop the manual gives; adjust a little at a time, re-checking with the rider seated."
            },
            {
              "title": "Lock and check",
              "html": "Tighten what was loosened (K-Light: headlight mounting bolts 10&ndash;12 N&middot;m, bracket locknut 37&ndash;44 N&middot;m), then check that main beam reaches further along the road, not upwards."
            }
          ]
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
          "type": "p",
          "html": "The brake lamp has two switches in parallel, one on the front lever and one on the rear pedal, so either control lights it. On the K-Light the lamp should come on when the front lever has moved about 15 mm, and in general it should light just as the brake starts to work. Front switches are usually plunger types that cannot be adjusted; rear switches are spring-operated and adjusted by moving the switch body on its thread or bracket, never by twisting the body with its wires attached. A switch stuck closed keeps the lamp lit and flattens the battery while the bike stands, which is why it is the first check in the K-Light drain tree. Practice: <a href=\"../repair/repairs/brake-switch-test/\">brake light switch test</a>, <a href=\"../repair/problems/brake-light-stuck-on/\">brake light stays on</a>."
        },
        {
          "type": "plate",
          "id": "EL01",
          "caption": "Instruments and switchgear: twin analogue clocks, a motocross LCD, a TFT dash, and the left and right switch cubes with every switch named."
        },
        {
          "type": "p",
          "html": "The instrument panel needs a permanent feed for its clock and memory, a switched feed and a good earth; when a dash goes dark or resets, those three are checked before the panel itself. Warning lamps are mostly switched on the earth side: the neutral lamp lights when the neutral switch earths its wire, an oil-pressure lamp (where fitted) when its pressure switch closes, and the FI lamp when the ECU earths it, which it does briefly at key-on as a bulb check. Practice: <a href=\"../repair/repairs/dash-power-check/\">dash power check</a>, <a href=\"../repair/repairs/neutral-switch-test/\">neutral switch test</a>, <a href=\"../repair/repairs/speed-sensor-check/\">speed sensor check</a>."
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
          "html": "Worked example: a feed carrying only the H4 main beam takes 4.4 A, so a fuse of 1.25 to 2 times that, 5.5&ndash;8.8 A, points to a 7.5 A blade, provided the wire is rated above it. A branch fuse that feeds several loads, such as the K-Light's 10 A fuses, is sized on their combined current, and every wire on that branch must carry more than the fuse rating, because the fuse protects the thinnest wire behind it. Wire repairs and splices follow the method in chapter 4.1."
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
          "html": "With the battery disconnected CAN-H to CAN-L should read about <strong>60 \\(\\Omega\\)</strong>; 120 \\(\\Omega\\) means one terminator or branch is open, near 0 \\(\\Omega\\) means the wires are shorted. A single faulty module can hold the bus dominant and make every unit report communication faults, so unplug modules one at a time to isolate it. Electric motorcycles use CAN between battery management system, motor controller and vehicle control unit (Module 6)."
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
          "text": "A method for any electrical fault"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Confirm the complaint",
              "html": "Operate the circuit and note exactly what fails, when, and what still works: hot or cold, wet or dry, over bumps or at full lock."
            },
            {
              "title": "Battery first",
              "html": "Rested voltage and clean, tight terminals; every reference value assumes a charged battery."
            },
            {
              "title": "Read the diagram",
              "html": "Find the failed load, its fuse, switch, connectors and earth, and every other load that shares them. Several dead loads with one thing in common point to that shared part."
            },
            {
              "title": "Simple things",
              "html": "Fuse (tested in its holder with a meter, not judged by eye), bulb, connector seated and clean."
            },
            {
              "title": "Split the circuit",
              "html": "Measure at a mid-point with the circuit switched on. Voltage present: the fault is further on; absent: it is behind. Halve the remaining section each time."
            },
            {
              "title": "Repair and verify",
              "html": "Repair the cause, not only the symptom (a blown fuse means a short somewhere), then test every function on that fuse and road-test."
            }
          ]
        },
        {
          "type": "p",
          "html": "Intermittent faults need the condition that causes them. Flex the harness at the steering head and under the tank while watching a meter or lamp (a wiggle test), mist water over connectors and the coil to find tracking, test straight after a fault that only appears when hot, and on an ECU machine read the freeze frame, which records the conditions at the moment a code was set. Practice: <a href=\"../repair/problems/intermittent-electrical/\">intermittent electrical faults</a>."
        },
        {
          "type": "h3",
          "text": "Finding a short circuit"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "When does it blow?",
              "html": "At key-on, only when one item is used, over bumps or at full steering lock: the answer points to the circuit and often the place."
            },
            {
              "title": "Look",
              "html": "Battery disconnected: check the steering head, behind the headlight, under the tank and seat, under the rear mudguard, near the battery and exhaust, and any accessory wiring for bare copper, melted insulation or burn marks."
            },
            {
              "title": "Meter search",
              "html": "Blown fuse out, meter on continuity between the load side of the fuse holder and the frame. A beep is a short to earth; if there is none, operate each switch on that circuit (battery still disconnected) until it beeps."
            },
            {
              "title": "Half-split",
              "html": "Unplug connectors along the circuit, starting halfway; when the beep stops, the short is in the section just unplugged. Then unplug its items one by one."
            },
            {
              "title": "Wiggle and repair",
              "html": "Flex the suspect section to find the exact spot, cut back to clean copper, join wire at least as thick with crimps and adhesive heat-shrink, and protect the harness so that it cannot rub there again."
            },
            {
              "title": "Prove it",
              "html": "Fit a fuse of the correct rating and work every item on the circuit, at full lock both ways."
            }
          ]
        },
        {
          "type": "p",
          "html": "A test lamp or a purpose-made short finder fitted in place of the fuse does the same job with the battery connected: it lights or buzzes while the short is present and goes out when the shorted section is unplugged. It limits the current, so it is safe where a new fuse would simply blow again. Practice: <a href=\"../repair/problems/fuse-keeps-blowing/\">fuse keeps blowing</a>, <a href=\"../repair/problems/burning-smell-wiring/\">burning smell from the wiring</a>."
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
              "title": "4.6.1 Battery",
              "html": "Rest 1 h, read OCV (charge below 12.3 V), charge at 0.6 A for 10&ndash;15 h, recheck after 30 min (&ge; 12.8 V), cranking voltage above 9.6 V."
            },
            {
              "title": "4.6.2 Charging",
              "html": "Charged battery first. 14.5 &plusmn; 0.5 V at 5000 rpm; stator pairs 0.8 &plusmn; 0.3 &Omega; and isolated from earth; AC output balanced within about 10 %; diode-test the regulator."
            },
            {
              "title": "4.6.3 Ignition",
              "html": "Battery above 12.4 V, spark test at 6&ndash;8 mm, coil 4 &Omega; / 18.6 k&Omega;, trigger 150 &plusmn; 10 &Omega; and peak above 1.7 V cranking, coil to ECU pins 1 and 13."
            },
            {
              "title": "4.6.4 Starter",
              "html": "Listen for the relay click, then voltage-drop the positive side, relay contacts and negative side while cranking; brushes above 8.5 mm."
            },
            {
              "title": "4.6.5 EFI codes and TPS",
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
          "type": "p",
          "html": "Before any part is replaced, the charging voltage is read against this table, always with a charged battery. A DC clamp meter round the battery lead adds the direction of the current: with the engine at 5000 rpm and the headlight on, current should flow into the battery; current flowing out means the loads exceed the alternator output at that speed."
        },
        {
          "type": "table",
          "head": [
            "Voltage at 5000 rpm (charged battery)",
            "Meaning",
            "Next test"
          ],
          "rows": [
            [
              "Stays at battery voltage",
              "No charge",
              "Stator AC output, regulator red and black wires, regulator diodes"
            ],
            [
              "Rises, but stays below 14.0 V",
              "Undercharging",
              "AC output balance between pairs; one weak phase or one open rectifier diode"
            ],
            [
              "14.0&ndash;15.0 V, above 13.5 V with the headlight on",
              "Normal (K-Light 14.5 &plusmn; 0.5 V)",
              "None: look elsewhere for the flat battery (drain test)"
            ],
            [
              "Above 15.0 V",
              "Regulator not limiting",
              "Regulator earth and sense wire; then replace the regulator"
            ]
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
