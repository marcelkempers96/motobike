/* ==========================================================================
   Asset map: ties every part key to the course's real assets:
   3D models (assets/models/*.glb), course plates (assets/illustrations/**.png),
   bike mesh names and diagram hotspots.
   ========================================================================== */

export const BIKE_MODEL = { '4t': 'bike_classic_4t', '2t': 'bike_mx_2t', sc: 'bike_scooter', st: 'bike_step_through', elec: 'bike_electric' };
export const MODES = ['4t', '2t', 'sc', 'st', 'elec'];
/* Scooter and step-through are four-stroke petrol bikes: they borrow the 4T data where they have none of their own. */
export const baseMode = (m) => (m === 'sc' || m === 'st' ? '4t' : m);
export const MODE_PARTS = {
  sc: ['headlight', 'indicators', 'instruments', 'handlebar', 'bodywork', 'seat', 'fuel_tank', 'battery', 'tail_light', 'frame', 'forks', 'brake', 'rear_brake', 'front_wheel', 'rear_wheel', 'engine', 'carb', 'exhaust', 'cvt', 'rear_shock', 'swingarm', 'spark_plug', 'starter', 'footpegs', 'side_stand', 'wiring'],
  st: ['headlight', 'indicators', 'instruments', 'horn', 'handlebar', 'bodywork', 'seat', 'fuel_tank', 'battery', 'charging', 'tail_light', 'frame', 'forks', 'brake', 'rear_brake', 'front_wheel', 'rear_wheel', 'engine', 'carb', 'exhaust', 'clutch', 'gearbox', 'chain', 'rear_sprocket', 'rear_shock', 'swingarm', 'spark_plug', 'footpegs', 'side_stand', 'wiring'],
};
export const OVERVIEW_PLATE = { '4t': 'overview/F01.png', '2t': 'overview/F02.png', sc: 'overview/F04.png', st: 'overview/F01.png', elec: 'overview/F03.png' };
export const PLATE_RATIO = { '4t': 2400 / 1620, '2t': 2400 / 1185, sc: 2400 / 1620, st: 2400 / 1620, elec: 2400 / 1185 };

/* All course plates (id → category/title) */
export const PLATES = {
  F01: ['overview', 'Four-stroke road motorcycle, principal parts'],
  F02: ['overview', 'Two-stroke motocross motorcycle'],
  F03: ['overview', 'Electric motorcycle, battery pack cut away'],
  F04: ['overview', 'Automatic scooter, CVT cover cut away'],
  F05: ['controls', 'Handlebar and controls from the rider’s seat'],
  F06: ['overview', 'Exploded four-stroke motorcycle, 30 assemblies'],
  F07: ['powertrain', 'Four-stroke cycle'],
  F08: ['powertrain', 'Two-stroke cycle'],
  F09: ['powertrain', 'Single-cylinder four-stroke engine, section'],
  F10: ['powertrain', 'Valvetrain and valve clearance'],
  F11: ['powertrain', 'Wet-sump lubrication circuit'],
  F12: ['powertrain', 'Electronic fuel injection system'],
  F13: ['transmission', 'Wet multiplate clutch, exploded'],
  F14: ['transmission', 'Constant-mesh gearbox'],
  F15: ['transmission', 'Chain final drive and wear measurement'],
  F16: ['transmission', 'Scooter CVT at low and high ratio'],
  F17: ['chassis', 'Steering geometry: rake, trail, offset, wheelbase'],
  F18: ['chassis', 'Fork, rear shock and sag measurement'],
  F19: ['chassis', 'Hydraulic disc brake and drum brake'],
  F20: ['wheels', 'Tyre sidewall markings and section'],
  F21: ['wiring', 'Charging circuit'],
  F22: ['wiring', 'Ignition circuits: CDI and TCI/ECU'],
  F23: ['wiring', 'Electric starting circuit'],
  F24: ['electrical', 'Electric motor sections: hub BLDC and IPM PMSM'],
  F25: ['electrical', 'Electric powertrain: battery, BMS, inverter, VCU, DC-DC'],
  F26: ['electrical', 'Battery pack construction, 20S10P module'],
  EL01: ['electrical', 'Instruments and switchgear'],
  EL02: ['electrical', 'Electrical component map'],
  FB01: ['frame_body', 'Motorcycle frame types'],
  FB02: ['frame_body', 'Motorcycle body parts'],
  PT01: ['powertrain', 'Slide carburettor in section'],
  PT02: ['powertrain', 'Exhaust systems in section'],
  PT03: ['powertrain', 'Two-stroke cylinder ports'],
  TR01: ['transmission', 'Gear shift mechanism'],
  TR02: ['transmission', 'Final drive types'],
  W01: ['wheels', 'Motorcycle wheel types'],
  W02: ['wheels', 'Wheel hubs and bearings'],
  WR01: ['wiring', 'Main wiring harness laid flat'],
};
export const plateSrc = (id) => PLATES[id] ? `${PLATES[id][0]}/${id}.png` : null;

/* Every 3D model with a human title (all 56 files in assets/models). */
export const MODELS = {
  bike_classic_4t: ['bikes', 'Classic air-cooled four-stroke roadster'],
  bike_mx_2t: ['bikes', 'Two-stroke motocross bike'],
  bike_electric: ['bikes', 'Electric scrambler'],
  bike_scooter: ['bikes', 'Automatic 125 cc scooter'],
  bike_step_through: ['bikes', 'Step-through underbone 110'],
  engine_4t: ['powertrain', 'Four-stroke horizontal single engine'],
  engine_2t: ['powertrain', '125 cc two-stroke single engine'],
  cylinder: ['powertrain', 'Cylinder and head (quarter cutaway)'],
  piston: ['powertrain', 'Piston with rings and gudgeon pin'],
  conrod: ['powertrain', 'Connecting rod'],
  crankshaft_single: ['powertrain', 'Single-cylinder built-up crankshaft'],
  crankshaft: ['powertrain', 'Four-cylinder crankshaft'],
  valve_in: ['powertrain', 'Intake valve and spring assembly'],
  valve_ex: ['powertrain', 'Exhaust valve (sodium-filled)'],
  spark_plug: ['powertrain', 'Spark plug'],
  carb: ['powertrain', 'Slide carburettor (half section)'],
  throttle_body: ['powertrain', 'EFI throttle body'],
  air_filter: ['powertrain', 'Pleated panel air filter in airbox'],
  exhaust_4t: ['powertrain', 'Four-stroke exhaust: header, heat shield, muffler'],
  exhaust_2t: ['powertrain', 'Two-stroke expansion chamber and silencer'],
  port_ex: ['powertrain', 'Two-stroke exhaust port (cutaway)'],
  port_tr: ['powertrain', 'Two-stroke transfer ports (cutaway)'],
  motor: ['powertrain', 'Electric motor (PMSM) cutaway'],
  clutch: ['transmission', 'Wet multiplate clutch'],
  clutch_exploded: ['transmission', 'Wet multiplate clutch (exploded)'],
  chain_sprockets: ['transmission', 'Chain and sprockets (15T / 42T)'],
  rear_sprocket: ['transmission', 'Rear sprocket (42T)'],
  brake: ['chassis', 'Disc brake: floating disc, 4-piston radial caliper'],
  forks: ['chassis', 'Front forks (conventional telescopic)'],
  forks_usd: ['chassis', 'Front forks (inverted / USD)'],
  handlebar: ['chassis', 'Handlebar and controls'],
  rear_shock: ['chassis', 'Monoshock with piggyback reservoir'],
  rear_shock_twin: ['chassis', 'Twin rear shocks (classic chrome)'],
  swingarm: ['chassis', 'Swingarm (aluminium box-section)'],
  frame: ['frame_body', 'Trellis frame (tubular steel)'],
  frame_cradle: ['frame_body', 'Double-cradle frame (tubular steel)'],
  fuel_tank: ['frame_body', 'Steel teardrop fuel tank'],
  seat_bench: ['frame_body', 'Bench seat, classic ribbed'],
  seat_mx: ['frame_body', 'Motocross seat'],
  seat_tracker: ['frame_body', 'Flat-tracker seat with tail hump'],
  front_wheel_spoked: ['wheels', 'Front wheel, wire-spoked (19 in)'],
  front_wheel_cast: ['wheels', 'Front wheel, cast alloy (17 in)'],
  front_wheel_mx: ['wheels', 'Front wheel, motocross (21 in)'],
  rear_wheel_spoked: ['wheels', 'Rear wheel, wire-spoked (18 in)'],
  rear_wheel_cast: ['wheels', 'Rear wheel, cast alloy with cush drive (17 in)'],
  rear_wheel_mx: ['wheels', 'Rear wheel, motocross (19 in)'],
  battery_12v: ['electrical', '12 V AGM service battery'],
  battery_hv: ['electrical', 'HV lithium traction battery pack'],
  charge_port: ['electrical', 'Charging inlet (Type 2 / CCS2 style)'],
  controller: ['electrical', 'Motor controller (inverter), lid removed'],
  headlight_round: ['electrical', 'Headlight, round chrome bucket (7 in)'],
  headlight_mx: ['electrical', 'Headlight, motocross number-plate shroud'],
  headlight_led: ['electrical', 'Headlight, angular LED unit with DRL'],
  instruments_analogue: ['electrical', 'Instruments, twin analogue clocks'],
  instruments_lcd: ['electrical', 'Instruments, compact motocross LCD'],
  instruments_tft: ['electrical', 'Instruments, colour TFT'],
  tail_light: ['electrical', 'LED tail light and plate light'],
  wiring_harness: ['wiring', 'Main wiring harness'],
};

/* Part key → models. A string, a per-mode object, or an array of variants. */
const PM = {
  engine: { '4t': ['engine_4t'], '2t': ['engine_2t'], elec: ['motor'] },
  cylinder: { '4t': ['cylinder'], '2t': ['engine_2t', 'port_tr'] },
  piston: ['piston'], conrod: ['conrod'], crankshaft: ['crankshaft_single', 'crankshaft'],
  valve_in: ['valve_in', 'valve_ex'], valve_ex: ['valve_ex', 'valve_in'],
  port_ex: ['port_ex', 'port_tr'], port_tr: ['port_tr', 'port_ex'],
  spark_plug: ['spark_plug'],
  carb: { '4t': ['carb', 'throttle_body'], '2t': ['carb', 'throttle_body'], elec: ['throttle_body'] },
  air_filter: ['air_filter'],
  exhaust: { '4t': ['exhaust_4t', 'exhaust_2t'], '2t': ['exhaust_2t', 'exhaust_4t'] },
  motor: ['motor'], controller: ['controller'], charge_port: ['charge_port'],
  battery: { '4t': ['battery_12v'], '2t': ['battery_12v'], elec: ['battery_hv', 'battery_12v'] },
  wiring: ['wiring_harness'],
  instruments: { '4t': ['instruments_analogue', 'instruments_lcd', 'instruments_tft'], '2t': ['instruments_lcd', 'instruments_analogue', 'instruments_tft'], elec: ['instruments_tft', 'instruments_analogue', 'instruments_lcd'] },
  headlight: { '4t': ['headlight_round', 'headlight_mx', 'headlight_led'], '2t': ['headlight_mx', 'headlight_round', 'headlight_led'], elec: ['headlight_led', 'headlight_round', 'headlight_mx'] },
  tail_light: ['tail_light'],
  frame: { '4t': ['frame_cradle', 'frame'], '2t': ['frame', 'frame_cradle'], elec: ['frame', 'frame_cradle'] },
  seat: { '4t': ['seat_bench', 'seat_mx', 'seat_tracker'], '2t': ['seat_mx', 'seat_bench', 'seat_tracker'], elec: ['seat_tracker', 'seat_bench', 'seat_mx'] },
  fuel_tank: ['fuel_tank'],
  forks: { '4t': ['forks', 'forks_usd'], '2t': ['forks_usd', 'forks'], elec: ['forks_usd', 'forks'] },
  rear_shock: { '4t': ['rear_shock_twin', 'rear_shock'], '2t': ['rear_shock', 'rear_shock_twin'], elec: ['rear_shock_twin', 'rear_shock'] },
  swingarm: ['swingarm'],
  brake: ['brake'], rear_brake: ['brake'],
  chain: ['chain_sprockets', 'rear_sprocket'], rear_sprocket: ['rear_sprocket', 'chain_sprockets'],
  front_wheel: { '4t': ['front_wheel_spoked', 'front_wheel_cast', 'front_wheel_mx'], '2t': ['front_wheel_mx', 'front_wheel_spoked', 'front_wheel_cast'], elec: ['front_wheel_cast', 'front_wheel_spoked', 'front_wheel_mx'] },
  rear_wheel: { '4t': ['rear_wheel_spoked', 'rear_wheel_cast', 'rear_wheel_mx'], '2t': ['rear_wheel_mx', 'rear_wheel_spoked', 'rear_wheel_cast'], elec: ['rear_wheel_cast', 'rear_wheel_spoked', 'rear_wheel_mx'] },
  cvt: ['clutch', 'chain_sprockets'], cooling: { '4t': ['engine_2t'] },
  clutch: ['clutch', 'clutch_exploded'], gearbox: ['clutch_exploded', 'clutch'],
  handlebar: ['handlebar'],
};
export function modelsFor(key, mode) {
  const v = PM[key];
  if (!v) return [];
  if (Array.isArray(v)) return v;
  return v[mode] || v[baseMode(mode)] || v['4t'] || [];
}

/* Part key → course plates */
const PP = {
  engine: { '4t': ['F09', 'F07', 'F11'], '2t': ['F08', 'PT03'], elec: ['F24', 'F25'] },
  cylinder: { '4t': ['F09', 'F10'], '2t': ['PT03', 'F08'] }, piston: ['F09', 'F07'], conrod: ['F09'], crankshaft: ['F09', 'F11'],
  valve_in: ['F10'], valve_ex: ['F10'], port_ex: ['PT03', 'F08'], port_tr: ['PT03', 'F08'],
  spark_plug: ['F22'], carb: ['PT01', 'F12'], air_filter: ['F12'], exhaust: ['PT02'], cooling: ['F11'],
  motor: ['F24'], controller: ['F25'], charge_port: ['F25'], dc_dc: ['F25'],
  battery: { '4t': ['F21', 'F23'], '2t': ['F21'], elec: ['F26', 'F25'] },
  charging: ['F21'], starter: ['F23'], wiring: { '4t': ['WR01', 'EL02'], '2t': ['WR01', 'F22'], elec: ['F25', 'EL02'] },
  instruments: ['EL01', 'F05'], headlight: ['EL02'], tail_light: ['EL02'], indicators: ['EL01'], horn: ['EL01'],
  handlebar: ['F05', 'EL01'],
  frame: ['FB01', 'F17'], seat: ['FB02'], fuel_tank: ['FB02', 'F06'], bodywork: ['FB02', 'F06'],
  forks: ['F18', 'F17'], rear_shock: ['F18'], swingarm: ['F18'], brake: ['F19'], rear_brake: ['F19'],
  chain: ['F15', 'TR02'], rear_sprocket: ['F15', 'TR02'], cvt: ['F16', 'F04'], clutch: ['F13'], gearbox: ['F14', 'TR01'],
  front_wheel: ['W01', 'F20', 'W02'], rear_wheel: ['W01', 'F20', 'W02'], footpegs: ['F06'], side_stand: ['F06'],
};
export function platesFor(key, mode) {
  const v = PP[key];
  if (!v) return [];
  if (Array.isArray(v)) return v;
  return v[mode] || v[baseMode(mode)] || v['4t'] || [];
}

/* Better Learn targets per part */
export const PART_CHAPTER = {
  piston: 'm2-top-end', cylinder: 'm2-top-end', valve_in: 'm2-top-end', valve_ex: 'm2-top-end', conrod: 'm2-bottom-end', crankshaft: 'm2-bottom-end',
  port_ex: 'm2-two-stroke', port_tr: 'm2-two-stroke', engine: 'm2-four-stroke', exhaust: 'm2-top-end', cooling: 'm2-lubrication-cooling',
  spark_plug: 'm3-ignition', carb: 'm3-mixture', air_filter: 'm3-mixture', fuel_tank: 'm3-efi', battery: 'm3-battery-charging', charging: 'm3-battery-charging',
  starter: 'm3-battery-charging', wiring: 'm3-lighting-wiring', headlight: 'm3-lighting-wiring', tail_light: 'm3-lighting-wiring', indicators: 'm3-lighting-wiring', horn: 'm3-lighting-wiring', instruments: 'm1-anatomy',
  clutch: 'm4-clutch', gearbox: 'm4-gearbox', cvt: 'm4-final-drive', chain: 'm4-final-drive', rear_sprocket: 'm4-final-drive', frame: 'm4-frame-steering', forks: 'm4-suspension', rear_shock: 'm4-suspension',
  swingarm: 'm4-suspension', brake: 'm4-brakes', rear_brake: 'm4-brakes', front_wheel: 'm4-wheels-tyres', rear_wheel: 'm4-wheels-tyres',
  motor: 'm5-motors', controller: 'm5-controllers', charge_port: 'm5-charging', dc_dc: 'm5-architecture',
  handlebar: 'm1-anatomy', seat: 'm1-anatomy', bodywork: 'm1-anatomy', footpegs: 'm1-anatomy', side_stand: 'm1-anatomy',
};

/* Bike mesh component (<category>__<component>) → part key */
const MESH_PART = {
  chassis__footpegs: 'footpegs', chassis__front_brake: 'brake', chassis__front_fork: 'forks', chassis__handlebar: 'handlebar',
  chassis__rear_brake: 'rear_brake', chassis__rear_shock: 'rear_shock', chassis__rear_shock_left: 'rear_shock', chassis__rear_shock_right: 'rear_shock',
  chassis__rear_suspension_linkage: 'rear_shock', chassis__side_stand: 'side_stand', chassis__steering: 'forks', chassis__swingarm: 'swingarm',
  electrical__alternator: 'charging', electrical__stator: 'charging', electrical__regulator_rectifier: 'charging', electrical__voltage_regulator: 'charging',
  electrical__battery: 'battery', electrical__aux_battery_12v: 'battery', electrical__headlight: 'headlight', electrical__horn: 'horn',
  electrical__ignition_coils: 'spark_plug', electrical__ignition_coil: 'spark_plug', electrical__spark_plugs: 'spark_plug', electrical__spark_plug: 'spark_plug',
  electrical__cdi_unit: 'spark_plug', electrical__kill_switch: 'handlebar', electrical__indicators: 'indicators', electrical__instruments: 'instruments',
  electrical__tft_dash: 'instruments', electrical__starter_motor: 'starter', electrical__tail_light: 'tail_light', electrical__charge_port: 'charge_port',
  electrical__dc_dc_converter: 'dc_dc', electrical__generator: 'charging', electrical__spark_plug_cap: 'spark_plug', electrical__number_plate_light: 'tail_light',
  chassis__centre_stand: 'side_stand', chassis__engine_mount_link: 'swingarm', chassis__passenger_footpegs: 'footpegs', chassis__rear_shocks: 'rear_shock',
  powertrain__cvt: 'cvt', powertrain__kick_start: 'engine', transmission__cvt_belt: 'cvt', transmission__drive_pulley: 'cvt', transmission__driven_pulley: 'cvt',
  transmission__final_gearbox: 'cvt', transmission__chain_case: 'chain', transmission__gear_pedal: 'gearbox', wiring__throttle_cables: 'handlebar',
  frame_body__frame: 'frame', frame_body__subframe: 'frame', frame_body__fuel_tank: 'fuel_tank', frame_body__tank_cover: 'bodywork', frame_body__seat: 'seat',
  frame_body__airbox: 'air_filter',
  powertrain__clutch: 'clutch', powertrain__engine: 'engine', powertrain__exhaust: 'exhaust', powertrain__fuel_system: 'carb', powertrain__intake: 'carb',
  powertrain__cooling: 'cooling', powertrain__motor: 'motor', powertrain__motor_controller: 'controller', powertrain__traction_battery: 'battery',
  transmission__chain: 'chain', transmission__chain_guard: 'chain', transmission__chain_guide: 'chain', transmission__chain_slider: 'chain',
  transmission__belt: 'chain', transmission__belt_guard: 'chain', transmission__front_sprocket: 'chain', transmission__front_pulley: 'chain', transmission__sprocket_cover: 'chain',
  transmission__rear_sprocket: 'rear_sprocket', transmission__rear_pulley: 'rear_sprocket', transmission__gear_lever: 'gearbox',
  wheels__front_wheel: 'front_wheel', wheels__rear_wheel: 'rear_wheel',
  wiring__harness_main: 'wiring', wiring__harness_lv: 'wiring', wiring__hv_cables: 'wiring',
};
export function partForMesh(name) {
  if (!name) return null;
  const comp = name.split('__').slice(0, 2).join('__');
  if (MESH_PART[comp]) return MESH_PART[comp];
  if (comp.startsWith('frame_body__')) return 'bodywork';
  return null;
}
export function meshMatchesPart(name, key) { return partForMesh(name) === key; }

/* Wheel groups to spin on the bikes (disc and sprocket turn with their wheel) */
export const BIKE_WHEELS = [
  { prefixes: ['wheels__front_wheel', 'chassis__front_brake__disc'] },
  { prefixes: ['wheels__rear_wheel', 'transmission__rear_sprocket', 'transmission__rear_pulley', 'chassis__rear_brake__disc'] },
];

/* Diagram hotspots on the course plates: [part, x%, y%, label] */
export const HOTSPOTS = {
  '4t': [
    ['headlight', 24.5, 31.1, 'Headlight'], ['indicators', 28.8, 32.6, 'Front indicator'], ['instruments', 32.0, 27.4, 'Instrument cluster'],
    ['handlebar', 39.0, 25.2, 'Clutch lever / handlebar'], ['carb', 45.3, 45.2, 'Throttle body'], ['fuel_tank', 45.0, 33.3, 'Fuel tank'],
    ['battery', 54.8, 48.1, 'Side cover (battery)'], ['seat', 57.0, 36.3, 'Seat'], ['rear_shock', 72.5, 51.9, 'Rear shock absorber'],
    ['tail_light', 76.5, 38.1, 'Tail light'], ['bodywork', 7.8, 57.0, 'Front mudguard'], ['front_wheel', 10.5, 74.8, 'Front tyre'],
    ['brake', 16.3, 62.2, 'Brake disc'], ['forks', 26.5, 50.4, 'Front fork'], ['exhaust', 35.5, 62.6, 'Exhaust header'],
    ['cylinder', 39.3, 53.3, 'Cylinder'], ['spark_plug', 41.0, 44.4, 'Cylinder head / spark plug'], ['clutch', 43.3, 63.7, 'Clutch cover'],
    ['engine', 50.0, 66.0, 'Crankcase'], ['gearbox', 45.8, 67.8, 'Gear lever'], ['side_stand', 50.0, 80.0, 'Side stand'],
    ['exhaust', 66.5, 73.7, 'Silencer'], ['swingarm', 68.8, 63.3, 'Swingarm'], ['chain', 73.3, 61.5, 'Drive chain'],
    ['rear_sprocket', 79.8, 65.2, 'Rear sprocket'], ['rear_wheel', 88.0, 78.5, 'Rear tyre'], ['frame', 62.5, 47.4, 'Frame'],
    ['indicators', 90.0, 51.1, 'Rear indicator'],
  ],
  '2t': [
    ['bodywork', 81.3, 38.3, 'High front mudguard'], ['forks', 67.3, 38.0, 'USD fork'], ['cooling', 58.3, 44.0, 'Radiator'],
    ['bodywork', 60.5, 36.9, 'Radiator shroud'], ['frame', 52.0, 29.9, 'Aluminium perimeter frame'], ['exhaust', 33.8, 34.4, 'Silencer'],
    ['rear_shock', 43.0, 49.6, 'Linkage monoshock'], ['swingarm', 36.5, 62.8, 'Aluminium swingarm'], ['rear_brake', 31.3, 69.8, 'Rear wave disc'],
    ['rear_wheel', 20.5, 76.9, '19 in rear wheel'], ['carb', 49.0, 47.6, 'Carburettor'], ['port_tr', 50.6, 45.0, 'Reed-valve intake'],
    ['cylinder', 54.0, 41.5, 'Cylinder, exhaust port'], ['port_ex', 55.5, 47.6, 'Power-valve housing'], ['exhaust', 59.3, 61.7, 'Expansion chamber'],
    ['brake', 70.8, 59.7, 'Front wave disc and caliper'], ['front_wheel', 83.3, 75.4, '21 in front wheel'], ['engine', 51.0, 60.0, 'Crankcase'],
    ['seat', 40.0, 25.8, 'Seat'], ['handlebar', 57.5, 12.1, 'Handlebar'], ['headlight', 63.8, 20.2, 'Number plate / lamp'],
  ],
  elec: [
    ['instruments', 38.8, 17.7, 'TFT display'], ['battery', 43.0, 37.4, 'Battery management system'], ['charge_port', 45.8, 24.3, 'Charge port'],
    ['wiring', 51.5, 41.5, 'Main contactor and fuse'], ['controller', 61.8, 37.4, 'Motor controller'], ['dc_dc', 62.8, 45.0, 'DC-DC converter'],
    ['rear_shock', 69.8, 52.6, 'Twin rear shocks'], ['rear_sprocket', 75.8, 58.2, 'Rear belt pulley'], ['chain', 65.0, 72.4, 'Toothed belt drive'],
    ['wiring', 55.8, 53.1, 'Phase cables U, V, W'], ['motor', 49.3, 71.4, 'Mid-mounted PMSM motor'], ['battery', 44.5, 50.1, 'Battery pack, cylindrical cells'],
    ['brake', 24.3, 72.9, 'Front disc brake'], ['front_wheel', 21.5, 62.8, '17 in cast wheel'], ['forks', 34.5, 38.5, 'Telescopic fork'],
    ['headlight', 32.5, 25.8, 'LED headlight'], ['seat', 62.5, 32.9, 'Seat'], ['swingarm', 60.0, 64.8, 'Swingarm'],
    ['rear_wheel', 79.0, 81.0, 'Rear wheel'], ['frame', 55.0, 44.5, 'Frame'], ['handlebar', 43.0, 16.2, 'Handlebar'],
  ],
};
