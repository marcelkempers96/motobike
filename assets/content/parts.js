/* Parts data, categories and mode info. Edit copy here — no code changes needed.
   `chapter` links a part to its Learn chapter / Quiz topic. */

export const MODE_INFO = {
  '4t': { short: '4-Stroke', name: 'Classic four-stroke', blurb: 'Air-cooled single, carburettor, chain drive. Click any part to look inside.' },
  '2t': { short: '2-Stroke', name: 'Two-stroke motocross', blurb: 'Ports instead of valves, a power stroke every revolution. Click any part to look inside.' },
  elec: { short: 'Electric', name: 'Electric scrambler', blurb: 'Battery, controller, motor — one moving part in the powertrain. Click any part to look inside.' },
};

export const PARTS = {
  engine:      { name: 'Engine', tag: 'Combustion', chapter: 'engine', desc: 'Turns the chemical energy in fuel into rotation at the crankshaft. Air and fuel burn above a piston; the pressure pushes it down.', notes: 'A typical 125 cc single makes about 10 kW.' },
  cylinder:    { name: 'Cylinder', tag: 'Combustion', chapter: 'engine', desc: 'The bore the piston slides in. Fins shed heat to the passing air.', notes: 'Bore × bore × stroke × 0.785 gives displacement.' },
  piston:      { name: 'Piston', tag: 'Combustion', chapter: 'engine', desc: 'Takes the push of the burning gas and passes it to the con-rod. Rings seal it against the cylinder wall.', notes: 'Mean piston speed above 25 m/s is motorsport territory.' },
  conrod:      { name: 'Connecting rod', tag: 'Combustion', chapter: 'engine', desc: 'Links the piston to the crankshaft and turns up-and-down into round-and-round.', notes: 'Rod length / stroke ratio around 1.75 is a sweet spot.' },
  crankshaft:  { name: 'Crankshaft', tag: 'Combustion', chapter: 'engine', desc: 'Converts the reciprocating piston motion into rotation. Counterweights balance the forces.', notes: 'A parallel-twin uses two throws 360° apart for a smoother firing order.' },
  spark_plug:  { name: 'Spark plug', tag: 'Ignition', chapter: 'fuel-ignition', desc: 'Makes the spark that lights the compressed charge. About 25 000 V jumps a gap under a millimetre wide.', notes: 'Electrode colour tells you how the engine is running: tan is healthy.' },
  valve_in:    { name: 'Intake valve', tag: 'Valvetrain', chapter: 'engine', desc: 'Opens to let the fresh charge in. Bigger than the exhaust valve because filling the cylinder is harder.', notes: 'Valve clearance is checked cold with a feeler gauge.' },
  valve_ex:    { name: 'Exhaust valve', tag: 'Valvetrain', chapter: 'engine', desc: 'Opens to let burnt gas out. Runs red hot, so it is often sodium-filled to move heat.', notes: 'Tight exhaust clearance burns valves.' },
  port_ex:     { name: 'Exhaust port', tag: 'Two-stroke', chapter: 'engine', desc: 'A window in the cylinder wall. The piston uncovers it on the way down.', notes: 'Port height sets the power band.' },
  port_tr:     { name: 'Transfer ports', tag: 'Two-stroke', chapter: 'engine', desc: 'Channels from crankcase to cylinder that carry the fresh charge up.', notes: 'Their angle shapes the scavenging loop.' },
  carb:        { name: 'Carburettor', tag: 'Fuel', chapter: 'fuel-ignition', desc: 'Mixes fuel into the air using the low pressure in a venturi. The throttle controls how much mixture flows.', notes: 'Modern bikes use fuel injection; the principle of metering is the same.' },
  air_filter:  { name: 'Air filter', tag: 'Intake', chapter: 'fuel-ignition', desc: 'Stops dust reaching the cylinder, where it would wear the rings and bore. Sits in the airbox.', notes: 'A clogged filter makes the mixture rich.' },
  fuel_tank:   { name: 'Fuel tank', tag: 'Fuel', chapter: 'fuel-ignition', desc: 'Stores petrol above the engine. Gravity or a pump feeds the carb or injector.', notes: '1 litre of petrol holds about 9 kWh of chemical energy.' },
  exhaust:     { name: 'Exhaust', tag: 'Exhaust', chapter: 'engine', desc: 'Carries hot gas away, quiets it and — on a two-stroke — uses pressure waves to stuff charge back in.', notes: 'A catalyst cleans CO, HC and NOx on modern bikes.' },
  motor:       { name: 'Electric motor', tag: 'Electric', chapter: 'electric', desc: 'Turns electrical power into rotation with magnets. Full torque from standstill.', notes: 'About 90 % efficient versus about 30 % for a petrol engine.' },
  controller:  { name: 'Controller', tag: 'Electric', chapter: 'electric', desc: 'The inverter: turns battery DC into three-phase AC for the motor, following your throttle.', notes: 'Switches about 16 000 times a second.' },
  charge_port: { name: 'Charge port', tag: 'Electric', chapter: 'electric', desc: 'Where you plug in. AC for home charging, DC for fast charging.', notes: 'The bike will not move while plugged in.' },
  battery:     { name: 'Battery', tag: 'Electrical', chapter: 'fuel-ignition', desc: 'Stores electrical energy. A 12 V starter battery on a petrol bike; a 400 V traction pack on an electric.', notes: 'Never short the terminals — a 12 V battery can deliver hundreds of amps.' },
  wiring:      { name: 'Wiring loom', tag: 'Electrical', chapter: 'fuel-ignition', desc: 'Connects every electrical part. Colours and fuses keep it safe and traceable.', notes: 'Most electrical faults are bad grounds or corroded connectors.' },
  instruments: { name: 'Instruments', tag: 'Electrical', chapter: 'anatomy', desc: 'Speedometer, tachometer and warning lamps tell you what the bike is doing.', notes: 'The green N lamp confirms neutral.' },
  headlight:   { name: 'Headlight', tag: 'Electrical', chapter: 'fuel-ignition', desc: 'Lights the road and makes you visible. Halogen bulb or LED.', notes: 'A 55 W bulb draws 4.6 A at 12 V.' },
  tail_light:  { name: 'Tail / brake light', tag: 'Electrical', chapter: 'fuel-ignition', desc: 'Red light at the back; it brightens when either brake is used.', notes: 'Twin-filament bulb: 5 W tail, 21 W brake.' },
  frame:       { name: 'Frame', tag: 'Frame', chapter: 'chassis', desc: 'The skeleton. Holds the steering head, engine and swingarm pivot in exact positions.', notes: 'Stiffness matters more than strength for handling.' },
  seat:        { name: 'Seat', tag: 'Body', chapter: 'anatomy', desc: 'Where the rider sits. Its height and shape decide comfort and control.', notes: 'Seat height is measured unladen.' },
  forks:       { name: 'Front forks', tag: 'Suspension', chapter: 'chassis', desc: 'Telescopic tubes that steer and suspend the front wheel. Springs carry the load; oil damping controls the motion.', notes: 'Rake and trail set how stable the steering feels.' },
  swingarm:    { name: 'Swingarm', tag: 'Suspension', chapter: 'chassis', desc: 'Pivots at the frame and carries the rear wheel up and down.', notes: 'Chain tension changes as the swingarm moves.' },
  rear_shock:  { name: 'Rear shock', tag: 'Suspension', chapter: 'chassis', desc: 'Spring plus damper between swingarm and frame. Twin shocks on a classic, a monoshock on modern bikes.', notes: 'Set sag to about one third of travel.' },
  brake:       { name: 'Front brake', tag: 'Brakes', chapter: 'chassis', desc: 'A hydraulic disc brake. The front does most of the stopping because weight shifts forward.', notes: 'Pads below 1.5 mm must be replaced.' },
  chain:       { name: 'Chain', tag: 'Final drive', chapter: 'drivetrain', desc: 'Carries drive from the gearbox sprocket to the rear wheel. Light, efficient and adjustable.', notes: 'Check slack every 500 km; clean and lube it.' },
  rear_sprocket: { name: 'Rear sprocket', tag: 'Final drive', chapter: 'drivetrain', desc: 'The big toothed wheel bolted to the rear hub. Its tooth count sets the final ratio.', notes: 'Replace chain and sprockets together.' },
  front_wheel: { name: 'Front wheel', tag: 'Wheels', chapter: 'chassis', desc: 'Steers, brakes and carries the front tyre. Spoked, cast or motocross-size.', notes: 'Tyre pressure is the cheapest handling upgrade.' },
  rear_wheel:  { name: 'Rear wheel', tag: 'Wheels', chapter: 'chassis', desc: 'Puts the power on the road. Carries the sprocket and often a cush drive.', notes: 'Rear tyres usually wear twice as fast as fronts.' },
};

export const PART_CATEGORY = {
  engine: 'powertrain', cylinder: 'powertrain', piston: 'powertrain', conrod: 'powertrain', crankshaft: 'powertrain',
  spark_plug: 'powertrain', valve_in: 'powertrain', valve_ex: 'powertrain', port_ex: 'powertrain', port_tr: 'powertrain',
  carb: 'powertrain', air_filter: 'powertrain', fuel_tank: 'powertrain', exhaust: 'powertrain',
  motor: 'powertrain', controller: 'powertrain', charge_port: 'powertrain',
  battery: 'electrical', wiring: 'electrical', instruments: 'electrical', headlight: 'electrical', tail_light: 'electrical',
  frame: 'frame', seat: 'frame',
  forks: 'chassis', swingarm: 'chassis', rear_shock: 'chassis', brake: 'chassis',
  chain: 'transmission', rear_sprocket: 'transmission',
  front_wheel: 'wheels', rear_wheel: 'wheels',
};

export const CATEGORIES = [
  { k: 'all', label: 'All' },
  { k: 'powertrain', label: 'Powertrain' },
  { k: 'electrical', label: 'Electrical' },
  { k: 'chassis', label: 'Chassis' },
  { k: 'transmission', label: 'Transmission' },
  { k: 'frame', label: 'Frame + Body' },
  { k: 'wheels', label: 'Wheels' },
];

export const INTERACTIVE_PARTS = new Set([
  'engine', 'cylinder', 'piston', 'crankshaft', 'spark_plug', 'carb',
  'brake', 'chain', 'rear_sprocket', 'motor', 'controller', 'battery', 'wiring',
]);
