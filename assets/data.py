# Content for the Moto Zero Wiring Lab. Single source for the page and wiring-data.json.

SYSTEMS = {
    "power": "Power and earths",
    "start": "Starting",
    "charge": "Charging",
    "ign": "Ignition",
    "fuel": "Fuel injection and sensors",
    "light": "Lighting and signals",
    "inst": "Controls and instruments",
}

COLOURS = {
    "B": ("Black", "#1d1d1f"), "Br": ("Brown", "#7a4a24"), "R": ("Red", "#c62828"),
    "O": ("Orange", "#ef7d1a"), "Y": ("Yellow", "#f2c200"), "G": ("Green", "#2e8b3d"),
    "Lg": ("Light green", "#93d48c"), "Bl": ("Blue", "#1f5fbf"), "Lb": ("Light blue", "#86c8f2"),
    "P": ("Pink", "#f29bc0"), "W": ("White", "#ffffff"), "Gr": ("Grey", "#8a8f98"),
}

# ---------------------------------------------------------------- harness (WR01)
H = {}
def h(k, name, sys, wires, does, test, fault):
    H[k] = dict(name=name, sys=sys, wires=wires, does=does, test=test, fault=fault)

h("headlight", "Headlight connector (H4)", ["light"],
  [["W", "Low beam feed"], ["Bl", "High beam feed"], ["G", "Earth"]],
  "Three-pin H4 socket behind the headlight shell. A 60/55 W bulb draws about 4.6 A on high beam, the largest steady load on a small machine, so these pins run warm.",
  ["With low beam selected and the key on, 12 V between W and G at the socket.", "Bulb filament resistance under 1 Ω cold."],
  ["Overheated socket: brown, melted plastic and loose pins cause flicker and a dim beam."])
h("ind-front", "Front indicator connectors", ["light"],
  [["O", "Left indicator"], ["Lb", "Right indicator"], ["G", "Earth"]],
  "Feeds the two front turn signals from the left switch cube via the turn relay.",
  ["Switch to left: 12 V pulses on O at about 85 flashes per minute."],
  ["Fast flashing on one side means a blown bulb or a bad earth on that side."])
h("clocks", "Instrument connector, 16-pin", ["inst", "light"],
  [["Bl", "High beam pilot lamp"], ["Y", "Tachometer signal from the ECU"], ["G", "Earth"]],
  "Carries every input the dash needs: switched and permanent feeds, speed and rpm signals, indicator and neutral pilots, fuel level and warning lamps. Only the three main wires are shown on the plate.",
  ["Permanent feed present with the key off (keeps the clock running).", "Switched feed present only with the key on."],
  ["Water ingress at the back of the dash: random warning lamps and a dead odometer."])
h("lsw", "Left switch cube", ["light", "inst"],
  [["Bl/W", "Feed into the dip switch"], ["W", "Low beam out"], ["Lg", "Horn button out"]],
  "Dip switch, indicator switch, horn button and often the pass button. Each is a pair of sprung brass contacts inside the cube.",
  ["Continuity checks across each switch position with the connector unplugged."],
  ["Dirty contacts give intermittent horn or indicators; clean with contact cleaner."])
h("rsw", "Right switch cube", ["start", "ign", "inst"],
  [["B", "Switched feed in from the ignition switch"], ["B/W", "Engine stop switch out (run feed)"], ["Y/R", "Start button out to the starter relay coil"]],
  "Engine stop switch and start button, plus the light switch on some models. Everything needed to start passes through it.",
  ["12 V on B/W only with the key on and the stop switch in RUN.", "12 V on Y/R only while the start button is held."],
  ["Stop switch left in OFF: the most common no-start of all."])
h("ignsw", "Ignition switch connector", ["power", "start", "ign"],
  [["R", "Permanent battery feed from the main fuse"], ["B", "Switched output to the fuse box"]],
  "The key switch connects the permanent battery feed to everything that should only work with the key on.",
  ["Continuity between R and B with the key on, none with the key off."],
  ["Worn contacts cause cut-outs over bumps; the dash flickers at the same moment."])
h("coil", "Ignition coil connector", ["ign"],
  [["B/Y", "Run feed from the engine stop switch"], ["Bl", "Primary earth, switched by the ECU"]],
  "Two-pin primary connector. The coil gets constant 12 V on one side; the ECU earths the other side for the dwell time and then releases it to fire the plug.",
  ["Primary resistance across the two pins: 2 to 5 Ω.", "12 V on B/Y with the key on and RUN selected."],
  ["Cracked coil body leaks high voltage when wet: misfire in rain."])
h("tps", "Throttle position sensor, 3-pin", ["fuel"],
  [["Y/R", "5 V reference from the ECU"], ["Lb", "Position signal"], ["G/O", "Sensor earth"]],
  "A potentiometer on the throttle body shaft. The ECU reads the signal voltage to know how far the throttle is open.",
  ["Reference: 4.9 to 5.1 V.", "Signal: 0.4 to 0.7 V closed, rising smoothly to 4.2 to 4.8 V wide open with no dropouts."],
  ["Worn track gives a stumble at one throttle position."])
h("inj", "Injector connector", ["fuel"],
  [["Bl", "Switched 12 V feed"], ["P/B", "Injector drive, earthed by the ECU"]],
  "The injector sees 12 V permanently while running; the ECU opens it by earthing the P/B wire for the pulse width it calculates, typically 2 to 10 ms.",
  ["Injector resistance: 11 to 13 Ω (high-impedance type).", "A noid light on the connector flickers while cranking."],
  ["Varnished injector after storage: hard starting, uneven idle."])
h("map", "MAP / IAT sensor", ["fuel"],
  [["Y/R", "5 V reference"], ["G/O", "Sensor earth"], ["Lg", "Manifold pressure signal"]],
  "Measures intake manifold pressure (engine load) and often intake air temperature in the same body.",
  ["Key on, engine off: about 2.5 to 3.0 V on the pressure signal (atmospheric)."],
  ["Split vacuum hose to the sensor: rich running and poor idle."])
h("ecu", "ECU connector, 22-pin", ["fuel", "ign"],
  [["Y/R", "5 V sensor reference out"], ["G/O", "Sensor earth"], ["Bl", "Switched 12 V feed in"], ["P/B", "Injector drive out"]],
  "The engine control unit reads crank, throttle, pressure, temperature and oxygen sensors and drives the injector, ignition coil, fuel pump relay and tachometer. Only four of the 22 wires are drawn.",
  ["Check feeds and earths first: 12 V on the feed pin, under 0.1 V drop on each earth pin.", "Read fault codes before replacing any sensor."],
  ["Green corrosion on connector pins causes more ECU faults than the ECU itself."])
h("tail", "Tail and stop light connector", ["light"],
  [["Br", "Tail (position) lamp"], ["G/Y", "Stop lamp"], ["G", "Earth"]],
  "Rear light: a dim tail filament or LED row, and a bright stop filament switched by the brake light switches.",
  ["12 V on G/Y only with either brake applied."],
  ["Corroded earth makes the tail light glow when the indicators flash."])
h("ind-rear", "Rear indicator connectors", ["light"],
  [["O", "Left indicator"], ["Lb", "Right indicator"], ["G", "Earth"]],
  "Feeds the two rear turn signals.",
  ["Same test as the front pair; both sides should flash at the same rate."],
  ["LED indicators fitted to a thermal relay flash too fast: fit an LED relay or load resistors."])
h("horn", "Horn connector", ["light"],
  [["Lg", "From the horn button"], ["G", "Earth"]],
  "The horn draws 2 to 3 A. On many machines the button switches the earth side instead of the feed.",
  ["Bridge the horn straight to the battery: it should sound strongly."],
  ["Seized diaphragm after washing; adjust the screw on the back."])
h("fbs", "Front brake light switch", ["light"],
  [["Bl", "Switched feed in"], ["G/Y", "Stop lamp out"]],
  "A plunger switch under the front brake lever, closed when the lever is pulled.",
  ["Continuity across the switch only with the lever pulled."],
  ["Stuck switch: stop lamp on permanently, flat battery."])
h("ckp", "Crank position sensor", ["ign", "fuel"],
  [["Bl/Y", "Sensor signal"], ["G/W", "Signal return"]],
  "A magnetic pickup reading teeth or lobes on the rotor. The ECU uses it for engine speed and to time both spark and injection.",
  ["Resistance: 100 to 500 Ω.", "Peak voltage while cranking: above 0.7 V."],
  ["No signal means no spark and no injection, with everything else working."])
h("o2", "Oxygen sensor, 4-pin", ["fuel"],
  [["W", "Sensor signal"], ["G", "Sensor earth"], ["Bl", "Heater feed"]],
  "Measures oxygen left in the exhaust. The ECU trims fuelling to hold the mixture near 14.7:1 at cruise. The fourth pin is the heater return.",
  ["Heater resistance: 6 to 20 Ω.", "Warm engine: signal switches between about 0.1 and 0.9 V."],
  ["Lead fuel or silicone sealant kills the sensor: fault code and rich running."])
h("ects", "Engine temperature sensor", ["fuel", "inst"],
  [["G/Bl", "Temperature signal"], ["G/O", "Sensor earth"]],
  "A thermistor in the coolant or cylinder head. Resistance falls as it warms; the ECU uses it for cold-start enrichment and fan control.",
  ["About 2.5 kΩ at 20 °C, about 0.3 kΩ at 80 °C."],
  ["Open circuit reads as very cold: rich running and black plug."])
h("alt", "Alternator connector, 3-phase", ["charge"],
  [["Y", "Phase 1"], ["Y", "Phase 2"], ["Y", "Phase 3"]],
  "Joins the stator to the regulator/rectifier. It carries the full charging current as AC, so it is a common hot spot.",
  ["Unplug and measure 0.2 to 1.0 Ω between each pair of yellow wires on the stator side."],
  ["Browned or melted connector: cut it out and solder the three wires."])
h("neutral", "Neutral switch lead", ["start", "inst"],
  [["Lg/R", "Neutral lamp and starter interlock"]],
  "A single wire to a switch in the gearbox that earths in neutral. It lights the N lamp and lets the starter work without pulling the clutch.",
  ["Continuity to earth only in neutral."],
  ["No N lamp and the bike starts only with the clutch pulled."])
h("earth-front", "Earth point", ["power"],
  [["G", "Earth eyelet bolted to the frame"]],
  "Several earth wires share one eyelet on the frame. Every circuit returns to the battery through points like this.",
  ["Voltage drop from the eyelet to battery negative with the lights on: under 0.1 V."],
  ["Paint under the eyelet or corrosion: dim lights, odd gauge readings, indicators affecting other lamps."])
h("trunk", "Main harness trunk", ["power"],
  [],
  "The bundled trunk of the loom, wrapped in half-lapped PVC tape and clipped to the frame. Branches leave it for each component.",
  ["Look for chafing where the trunk passes the steering head and the frame rails."],
  ["Wire rubbed through at the steering head: fuse blows on full lock."])
h("fusebox", "Fuse box, 10/10/15/5 A", ["power"],
  [],
  "Splits the switched feed into separate fused circuits (ignition and ECU, lights, fan, instruments) with a spare. Each blade fuse protects its own wires.",
  ["With the key on, 12 V on both test points on top of each fuse."],
  ["A fuse that blows again at once means a short to earth in that circuit."])
h("mainfuse", "Main fuse 30 A", ["power", "start", "charge"],
  [["R", "Battery feed"]],
  "Protects everything downstream of the battery except the starter cable. Usually on the starter relay.",
  ["Continuity across the fuse; 12 V on both sides with the battery connected."],
  ["Blown: no dash, no horn, no crank."])
h("srelay", "Starter relay", ["start"],
  [["R", "Battery stud"], ["Y/R", "Coil feed from the start button"], ["G/R", "Coil earth through the interlocks"]],
  "A solenoid switch. Under 1 A through its coil lets 80 to 150 A flow from the battery to the starter motor.",
  ["Coil resistance: 3 to 5 Ω.", "Voltage across the two big studs while cranking: under 0.2 V."],
  ["Click but no crank: burnt contacts or a loose battery cable."])
h("trelay", "Turn signal relay", ["light"],
  [],
  "Switches the indicator feed on and off at 60 to 120 flashes per minute.",
  ["Bridge its input and output terminals: the selected indicators should light steadily."],
  ["Thermal relays flash too fast with LED indicators."])
h("battery", "Battery 12 V", ["power", "start", "charge"],
  [],
  "Stores energy for starting and supplies all loads when the engine is off or idling.",
  ["Rest voltage: 12.6 to 12.8 V (lead-acid), 13.2 to 13.4 V (lithium iron phosphate)."],
  ["Left unused for a month without a maintainer, a small battery can go flat beyond recovery."])
h("bplus", "Battery positive feed", ["power", "start", "charge"],
  [["R", "Battery positive to the starter relay and main fuse"]],
  "The heavy red cable from the battery positive terminal. It is unfused between the battery and the relay, so it must be routed away from sharp edges.",
  ["Terminal bolts tight; no green corrosion under the boot."],
  ["Loose terminal: relay chatters when start is pressed."])
h("startercable", "Starter motor cable", ["start"],
  [],
  "Heavy cable from the relay M stud to the starter motor terminal. It only carries current while the starter turns.",
  ["Voltage drop along the cable while cranking: under 0.3 V."],
  ["Corroded lug at the motor end: slow cranking that gets worse as the cable warms."])
h("bminus", "Battery earth", ["power"],
  [["G", "Battery negative to the engine or frame"]],
  "The return path for every circuit, including the starter. It must be as heavy as the positive cable.",
  ["Voltage drop from battery negative to the engine case while cranking: under 0.2 V."],
  ["Painted or loose mounting: starter turns slowly and the lights dim heavily when cranking."])

# ---------------------------------------------------------------- circuits
def c(name, does, test, fault):
    return dict(name=name, does=does, test=test, fault=fault)

STARTING = {
 "battery": c("Battery 12 V", "Supplies 80 to 150 A to the starter for a few seconds. Cranking is the heaviest load the electrical system ever sees, so a battery that lights the dash can still fail to crank.",
   ["Rest voltage after an hour off charge: 12.6 to 12.8 V (lead-acid).", "While cranking the voltage must stay above 9.6 V; lower means a weak battery or a bad connection."],
   ["Sulphated cells after storage: rest voltage looks fine, then collapses under load."]),
 "mainfuse": c("Main fuse 30 A", "Protects the whole loom from a short to earth. On most machines it sits on the starter relay body.",
   ["Measure 12 V on both sides of the fuse with the key on."], ["A blown main fuse kills everything at once. Find the short before fitting a new one."]),
 "relay": c("Starter relay", "A solenoid switch. A coil drawing under 1 A pulls a copper disc across two heavy studs, connecting battery cable B to motor cable M. The start button never carries the motor current.",
   ["Coil resistance across the two small terminals: 3 to 5 Ω.", "Voltmeter across B and M while pressing start: the reading falls from 12 V to under 0.2 V when the relay closes."],
   ["Burnt contact disc: a click but no crank, with 12 V still across B and M."]),
 "motor": c("Starter motor", "A permanent-magnet DC motor. Brushes feed the commutator, which switches current through the armature windings so it keeps turning between the magnets. A reduction gear and one-way clutch link it to the crankshaft.",
   ["In neutral, bridge the battery straight to the motor terminal with a heavy jumper: it should spin briskly.", "Brush length above the service limit, typically 6 to 7 mm."],
   ["Worn brushes: slow or intermittent cranking.", "Water inside after washing: corroded commutator, seized bushes."]),
 "ign": c("Ignition switch", "Switches the battery feed to the control circuit and fuse box.",
   ["Continuity across the switch with the key on, none with it off."], ["Worn contacts: intermittent cut-out over bumps."]),
 "fuse10": c("Fuse 10 A", "Protects the switched feed to the start button, engine stop switch, ignition and ECU.",
   ["12 V on both sides of the fuse with the key on."], ["Blown: no click when pressing start, and no spark either."]),
 "stop": c("Engine stop switch", "In RUN it passes the switched feed to the start button and ignition. In OFF it cuts both, so the engine can neither start nor keep running.",
   ["Continuity in RUN, open in OFF."], ["Left in OFF by the rider: the most common no-start call-out."]),
 "start": c("Start button", "Momentary button. Holding it sends feed to the starter relay coil.",
   ["Continuity only while pressed.", "12 V on the wire to the relay while pressed."], ["Corroded contacts in the switch cube: works only when pressed hard."]),
 "diode": c("Interlock diode", "Lets the relay coil earth through the neutral switch, but stops the neutral lamp earthing back through the relay coil and side-stand circuit.",
   ["Diode mode: about 0.5 V one way, open the other."], ["Shorted diode: the N lamp glows when the clutch is pulled in gear."]),
 "neutral": c("Neutral switch", "Earths when the gearbox is in neutral. Lights the N lamp and gives the relay coil an earth so the engine can start.",
   ["Continuity to earth only in neutral."], ["Oily or broken contact: no N lamp, starts only with the clutch pulled."]),
 "clutch": c("Clutch lever switch", "Closed while the clutch lever is pulled. Together with the side-stand switch it allows starting in gear.",
   ["Continuity only with the lever pulled."], ["Lever adjuster moved: the switch never closes, so it only starts in neutral."]),
 "stand": c("Side-stand switch", "Closed only with the side-stand up. Stops a start in gear with the stand down; the ECU also cuts the engine if a gear is selected with the stand down.",
   ["Continuity with the stand up, open with it down."], ["Mud and corrosion: engine dies when first gear is selected."]),
 "sclutch": c("Starter drive and one-way clutch", "The pinion drives a reduction gear, which drives the starter driven gear on the crankshaft. Rollers wedge the driven gear to the clutch housing while the starter turns it, and free off once the engine runs faster than the starter.",
   ["Turn the driven gear by hand: it locks one way and spins freely the other."], ["Worn rollers or weak springs: the starter whirs and the engine does not turn."]),
}

CHARGING = {
 "rotor": c("Flywheel rotor", "Bolted to the crankshaft taper. Twelve magnets of alternating polarity sweep past the stator, so the stator windings see a changing magnetic field whenever the engine turns.",
   ["Inspect for cracked or loose magnets after a backfire or crash."], ["A loose magnet rubs the stator and wrecks the windings."]),
 "stator": c("Stator", "Eighteen laminated iron poles wound with copper and connected as three phases. Output rises with engine speed, roughly 15 to 20 V AC per 1000 rpm unloaded on a small machine.",
   ["Resistance between each pair of yellow leads: 0.2 to 1.0 Ω, all within 10% of each other.", "No continuity from any lead to earth.", "Unloaded AC between each pair at 5000 rpm: 50 to 80 V, balanced."],
   ["Burnt winding: dark varnish, one phase low or open."]),
 "leads": c("Stator leads", "Three AC wires, usually all yellow, carry stator output to the regulator/rectifier.",
   ["Inspect the connector for browning; measure resistance through it."], ["Melted connector: high resistance and heat, then a dead phase."]),
 "regrec": c("Regulator/rectifier", "Turns three-phase AC into DC and limits system voltage. A shunt type limits it by short-circuiting the stator to earth once the battery is full, which is why the unit has cooling fins and runs hot.",
   ["Charging voltage at 4000 to 5000 rpm: 13.8 to 14.6 V at the battery."], ["Regulation failure: over 15 V, boiling battery, blown bulbs.", "Rectifier failure: battery goes flat while riding."]),
 "bridge": c("Bridge diodes D1 to D6", "A three-phase full-wave bridge. The upper diodes pass the most positive phase to B+, the lower diodes return current from earth to the most negative phase, so current reaches the battery in one direction only.",
   ["Diode mode, red probe on a yellow input and black on B+: 0.4 to 0.6 V; reversed: open.", "Red probe on earth and black on a yellow input: 0.4 to 0.6 V; reversed: open."],
   ["Shorted diode: the battery drains overnight through the stator."]),
 "scr": c("SCR shunts G1 to G3", "Thyristors across the lower diodes. When the sense circuit fires their gates, each SCR shorts its phase to earth for the rest of that half-cycle, so output beyond what the system needs is dumped as heat.",
   ["Not meter-testable; judge by charging voltage."], ["SCR that never fires: overcharging."]),
 "sense": c("Sense and trigger circuit", "Watches the B+ voltage and fires the SCR gates once it passes about 14.5 V.",
   ["Charging voltage that rises steadily with rpm past 15 V points here."], ["Failed sense circuit: no regulation at all."]),
 "fuse": c("Main fuse 15 A", "Protects the charging output and the loads from a short.",
   ["12 V on both sides of the fuse."], ["Blown: the alternator can no longer reach the battery or loads."]),
 "battery": c("Battery 12 V 5 Ah", "Stores energy and buffers the system voltage. At idle a small machine can run a deficit that the battery covers until the revs rise.",
   ["Engine at 5000 rpm: 13.8 to 14.6 V across the terminals.", "Engine off after riding: 12.8 V or more."], ["Overcharged: acid smell, bulging case."]),
 "ignsw": c("Ignition switch", "Connects the loads to the charging bus.", ["Continuity with the key on."], ["Worn contacts drop the loads over bumps."]),
 "loads": c("Loads", "Headlight, tail light, ignition, fuel pump, ECU and instruments. A 125 cc machine draws about 6 to 8 A with lights on, close to what its alternator makes at idle.",
   ["Measure total draw with a DC clamp meter."], ["Heated grips and spotlights push the balance negative in town."]),
}

IGNITION = {
 "srcA": c("Source coil", "A high-turn winding on the stator that makes 100 to 400 V AC to charge the CDI capacitor. It needs no battery, so kick-start and off-road machines can run with none fitted.",
   ["Resistance to earth: 50 to 800 Ω depending on model.", "Peak voltage while cranking, with a peak adapter: above 100 V."], ["Weak source coil: starts cold, dies when hot."]),
 "flyA": c("Flywheel rotor and reluctor", "The raised reluctor lobe on the rotor rim passes the pulser once per revolution, marking the crank position at which the spark is due.",
   ["Lobe edge clean and undamaged."], ["Damaged lobe gives a weak or wrongly timed pulse."]),
 "pulserA": c("Pulser coil", "A magnetic pickup. The lobe passing its pole induces a short pulse that tells the CDI where the crankshaft is.",
   ["Resistance: 100 to 500 Ω.", "Peak voltage while cranking: above 0.7 V.", "Air gap to the rotor: 0.5 to 0.9 mm."], ["Open coil or broken lead: no spark at all, everything else normal."]),
 "stopA": c("Engine stop switch (CDI)", "Works the opposite way to a battery system. In STOP it shorts the source coil to earth, so the capacitor never charges. In RUN its contacts are open.",
   ["Continuity to earth in STOP only."], ["Chafed kill wire touching the frame: no spark, same symptom as STOP."]),
 "cdi": c("CDI unit", "Diode D charges capacitor C to 150 to 300 V from the source coil. When the pulser signal arrives, the trigger circuit fires the SCR, which dumps C into the coil primary within microseconds.",
   ["Test the source coil, pulser and coil first; then substitute a known good unit."], ["Cracked solder joints inside the potting: cuts out when hot."]),
 "coilA": c("Ignition coil (CDI)", "A step-up transformer. A pulse in the primary (few turns, thick wire) induces 20 to 40 kV in the secondary (thousands of turns, fine wire) around a laminated iron core.",
   ["Primary: 0.2 to 1.0 Ω.", "Secondary with the cap removed: 5 to 15 kΩ."], ["Cracked case leaks high voltage when wet: misfire in rain."]),
 "plugA": c("HT lead, cap and spark plug", "The HT lead carries the high voltage to the cap, which usually holds a 5 kΩ suppressor. The voltage jumps the plug gap and lights the mixture.",
   ["Gap: 0.6 to 0.9 mm.", "Cap resistance about 5 kΩ.", "Light tan insulator is healthy; black soot is rich; white is lean or too hot."], ["Fouled plug: carbon lets the spark leak to earth instead of jumping the gap."]),
 "batB": c("Battery 12 V", "Powers the inductive ignition and the ECU. With a flat battery there is no spark, even with a kick-start.",
   ["At least 12 V with the key on; above 9.6 V while cranking."], ["Low battery voltage during cranking resets the ECU: no spark until the starter is released."]),
 "fuseB": c("Ignition fuse", "Protects the switched feed to the ECU and coil.", ["12 V on both sides with the key on."], ["Blown: dead ECU, no spark, no injection."]),
 "ignB": c("Ignition switch", "Connects the battery to the ignition circuit.", ["Continuity with the key on."], ["Intermittent contact: engine cuts out over bumps."]),
 "stopB": c("Engine stop switch", "In RUN it closes the feed to the coil and ECU; in OFF it opens it.", ["12 V after the switch in RUN only."], ["Corroded contacts: misfire that comes and goes with switch movement."]),
 "ecu": c("ECU with inductive ignition", "The microcontroller reads crank position from the pulser and looks up advance and dwell in its map. Its IGBT earths the coil primary so current builds for the dwell time (2 to 4 ms). When the IGBT switches off, the collapsing field induces the high voltage.",
   ["12 V at +B with the key on; under 0.1 V drop on each earth.", "Read fault codes before replacing parts."], ["Corroded connector pins cause more faults than the ECU itself."]),
 "pulserB": c("Crank position pulser", "Gives the ECU a pulse once per revolution; the ECU times dwell and spark from it, adding advance as rpm rises.",
   ["Resistance: 100 to 500 Ω.", "Peak voltage while cranking: above 0.7 V."], ["No pulse: no spark and no injection."]),
 "coilB": c("Ignition coil (inductive)", "Primary fed with 12 V on its + terminal and earthed by the ECU on its − terminal. Current stores energy in the core; breaking the circuit releases it into the secondary.",
   ["Primary: 2 to 5 Ω.", "Secondary with the cap removed: 8 to 15 kΩ."], ["Shorted turns: weak spark under load, misfire at high rpm."]),
 "plugB": c("HT lead, cap and spark plug", "Same as panel A: the high voltage jumps the plug gap and lights the mixture.",
   ["Gap: 0.6 to 0.9 mm.", "Cap resistance about 5 kΩ."], ["Worn electrodes need more voltage to fire; a weak coil then misfires under load."]),
}
