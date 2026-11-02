/* ==========================================================================
   Moto Zero · Bike builder
   Guided 3D assembly of the three course bikes plus a configuration designer
   (wheel size, final drive, colours) with live gearing and geometry effects.
   Bike GLBs: assets/models/bike_*.glb, mesh names <category>__<component>[__sub].
   ========================================================================== */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as PG from './progress.js';

const RENDERS = '../assets/renders/';
const MODELS = '../assets/models/';
const ACC = new THREE.Color('#C8502A');
const GLOW = 0.32;
const G = 9.81, RHO = 1.2, CRR = 0.015;
const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------------------------------------
   Bikes. Numbers are illustrative but consistent with the cockpit sim
   (5-speed 125: ratios 2.77…0.96, primary 3.35, 15/44 final, 1.95 m tyre).
   -------------------------------------------------------------------------- */
const BIKES = {
  '4t': {
    file: 'bike_classic_4t', name: 'Four-stroke roadster', sub: '125 cc single, 5-speed', kind: 'ice',
    rim: { f: 19, r: 18 }, circ: 1.95, sprF: 15, sprR: 44, rangeF: [13, 17], rangeR: [36, 52],
    primary: 3.35, gears: [2.77, 1.88, 1.40, 1.13, 0.96], redline: 10000, rpk: 6500, tk: 1.2,
    bore: 56.5, stroke: 49.5, cr: 9.5, crRange: [8, 12], bmep: 10e5, strokes: 4, eta: 0.27,
    presets: [[100, 50.7, 49.5], [125, 56.5, 49.5], [250, 72, 61.2], [400, 85, 70.5]],
    mass: 150, cda: 0.60, rake: 27, trail: 100, speedo: 'front', drive: '428 chain',
    paint: ['tank_paint'], frameNames: ['frame_body__frame__tubes', 'frame_body__frame__head_tube'],
    stockLabel: 'Classic red',
  },
  '2t': {
    file: 'bike_mx_2t', name: 'Two-stroke MX', sub: '125 cc motocross, 6-speed', kind: 'ice',
    rim: { f: 21, r: 19 }, circ: 2.07, sprF: 13, sprR: 50, rangeF: [12, 15], rangeR: [44, 54],
    primary: 3.47, gears: [2.15, 1.73, 1.44, 1.24, 1.09, 0.96], redline: 12500, rpk: 10500, tk: 5,
    bore: 54, stroke: 54.5, cr: 12, crRange: [9, 14], bmep: 8e5, strokes: 2, eta: 0.2,
    presets: [[100, 50, 50.8], [125, 54, 54.5], [250, 66.4, 72], [400, 80, 79.5]],
    mass: 90, cda: 0.70, rake: 26.5, trail: 112, speedo: 'front', drive: '520 chain',
    paint: ['mx_red'], frameNames: ['frame_body__frame', 'frame_body__subframe'],
  },
  elec: {
    file: 'bike_electric', name: 'Electric scrambler', sub: '30 kW motor, belt drive', kind: 'elec',
    rim: { f: 17, r: 17 }, circ: 1.92, sprF: 30, sprR: 78, rangeF: [26, 34], rangeR: [66, 90],
    fixed: 2.5, motorMax: 6000, tmot: 60, pmot: 30000, kw: 30, kwh: 9,
    mass: 140, cda: 0.60, rake: 25, trail: 95, speedo: 'motor', drive: 'toothed belt',
    paint: ['ev_body'], frameNames: ['frame_body__frame', 'frame_body__subframe'],
  },
};
const RIDER = 75;

/* --------------------------------------------------------------------------
   Workshop order. Every mesh is grouped by its <category>__<component> prefix;
   parts or steps with no meshes on a bike are dropped for that bike.
   -------------------------------------------------------------------------- */
const per = (v, b) => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[b] !== undefined ? v[b] : v.def) : v;
const STEPS = [
  { id: 'frame', title: 'Frame', why: 'Everything bolts to the frame, so it goes on the stand first.', parts: [
    { key: 'frame', label: 'Frame', img: { '4t': 'frame_cradle', def: 'frame' }, comps: ['frame_body__frame', 'frame_body__subframe'],
      text: { def: 'The frame is the backbone. It carries the engine, rider and suspension and holds the steering head at the right angle.', '2t': 'The aluminium frame is the backbone, with a bolt-on subframe for the seat. It holds the steering head at the right angle and carries the engine.' } },
  ] },
  { id: 'swingarm', title: 'Swingarm', why: 'The swingarm pivots on a spindle through the frame, so the frame has to be in place.', parts: [
    { key: 'swingarm', label: 'Swingarm', img: 'swingarm', comps: ['chassis__swingarm'], text: 'The swingarm pivots behind the gearbox and carries the rear wheel, so the wheel can move up and down while staying in line.' },
  ] },
  { id: 'shock', title: 'Rear suspension', why: 'The shock joins the frame to the swingarm, so both have to be fitted first.', parts: [
    { key: 'shock', label: { '4t': 'Twin rear shocks', def: 'Rear shock' }, img: { '4t': 'rear_shock_twin', elec: 'rear_shock_twin', def: 'rear_shock' },
      comps: ['chassis__rear_shock', 'chassis__rear_shock_left', 'chassis__rear_shock_right', 'chassis__rear_suspension_linkage'],
      text: { def: 'The rear shock holds the swingarm up on a spring and damps its movement, so the tyre stays in contact with the road.', '2t': 'The monoshock works through a rising-rate linkage: soft over small bumps, firm when it lands from a jump.' } },
  ] },
  { id: 'fork', title: 'Front fork and steering', why: 'The fork goes through the steering head of the frame.', parts: [
    { key: 'fork', label: 'Front fork', img: { '4t': 'forks', def: 'forks_usd' }, comps: ['chassis__front_fork', 'chassis__steering'],
      text: 'The fork holds the front wheel, steers it on the head bearings and gives the front suspension its travel.' },
  ] },
  { id: 'front_wheel', title: 'Front wheel', why: 'The front wheel hangs between the fork legs, so the fork has to be fitted first.', parts: [
    { key: 'front_wheel', label: 'Front wheel', img: { '4t': 'front_wheel_spoked', '2t': 'front_wheel_mx', elec: 'front_wheel_cast' }, comps: ['wheels__front_wheel'],
      text: 'The front wheel turns on bearings around the axle through the fork legs. Its size changes ride height and steering feel.' },
  ] },
  { id: 'rear_wheel', title: 'Rear wheel', why: 'The rear wheel sits in the swingarm, and the shock has to be in to hold the swingarm up.', parts: [
    { key: 'rear_wheel', label: 'Rear wheel', img: { '4t': 'rear_wheel_spoked', '2t': 'rear_wheel_mx', elec: 'rear_wheel_cast' }, comps: ['wheels__rear_wheel'],
      text: 'The rear wheel is the driven wheel. Its rolling circumference sets how far the bike travels for each turn.' },
  ] },
  { id: 'brakes', title: 'Brakes', why: 'Calipers bolt to the fork and swingarm and grip discs on the wheel hubs, so the wheels come first.', parts: [
    { key: 'front_brake', label: 'Front brake', img: 'brake', comps: ['chassis__front_brake'],
      text: 'The front brake does most of the stopping: weight moves forward under braking, so the front disc is the larger one.' },
    { key: 'rear_brake', label: { '4t': 'Rear drum brake', def: 'Rear brake' }, img: { '4t': null, def: 'brake' }, comps: ['chassis__rear_brake'],
      text: { '4t': 'The rear drum brake is worked by the pedal and rod. It steadies the bike and helps at low speed.', def: 'The rear brake, worked by the right foot, steadies the bike and helps at low speed.' } },
  ] },
  { id: 'engine', title: 'Engine', why: 'With the rolling chassis on its wheels, the engine can be lifted into the frame and bolted to its mounts.', parts: [
    { key: 'engine', label: 'Engine', img: { '4t': 'engine_4t', '2t': 'engine_2t' },
      comps: ['powertrain__engine', 'powertrain__clutch', 'electrical__alternator', 'electrical__stator', 'electrical__starter_motor'],
      text: { '4t': 'The four-stroke single turns fuel into crankshaft rotation. The clutch, five-speed gearbox, alternator and starter share its crankcases.', def: 'The two-stroke single fires every revolution, so it is light and strong for its size. The clutch and six-speed gearbox share its crankcases.' } },
    { key: 'plug', label: 'Spark plug', img: 'spark_plug', comps: ['electrical__spark_plugs', 'electrical__spark_plug'],
      text: 'The spark plug lights the compressed mixture at exactly the right moment in each cycle.' },
  ] },
  { id: 'hv', title: 'Traction battery', why: 'The battery is the heaviest part and is lowered into the finished rolling chassis.', parts: [
    { key: 'hv', label: 'Traction battery', img: 'battery_hv', comps: ['powertrain__traction_battery'],
      text: 'The traction battery stores the energy in lithium cells. It is the heaviest single part, so it sits low and in the middle of the frame.' },
  ] },
  { id: 'motor', title: 'Motor', why: 'The motor bolts below the battery and needs the frame and swingarm in place.', parts: [
    { key: 'motor', label: 'Motor', img: 'motor', comps: ['powertrain__motor'],
      text: 'The permanent-magnet motor makes full torque from standstill, so the bike needs no clutch and no gearbox.' },
  ] },
  { id: 'controller', title: 'Controller', why: 'The controller sits between battery and motor, so both have to be in first.', parts: [
    { key: 'controller', label: 'Controller', img: 'controller', comps: ['powertrain__motor_controller', 'electrical__dc_dc_converter'],
      text: 'The controller (inverter) turns the battery’s direct current into three-phase current for the motor. The DC-DC converter feeds the 12 V system.' },
  ] },
  { id: 'cooling', title: 'Cooling', why: 'The radiators connect to the engine’s water pump by hoses, so the engine comes first.', parts: [
    { key: 'cooling', label: 'Radiators', img: null, comps: ['powertrain__cooling'],
      text: 'The radiators carry heat out of the coolant. Air flowing through the cores keeps the cylinder at a steady working temperature.' },
  ] },
  { id: 'drive', title: { elec: 'Belt drive', def: 'Final drive' }, why: { elec: 'The belt links the motor pulley to the rear wheel, so the motor and rear wheel must both be in.', def: 'The chain links the gearbox sprocket to the rear wheel, so the engine and rear wheel must both be in.' }, parts: [
    { key: 'spr_f', label: { elec: 'Motor pulley', def: 'Front sprocket' }, img: null, comps: ['transmission__front_sprocket', 'transmission__front_pulley'],
      text: { elec: 'The small pulley on the motor shaft. Fewer teeth here gives more pull and a lower top speed.', def: 'The small gearbox sprocket. One tooth here changes the gearing about as much as three teeth at the rear.' } },
    { key: 'spr_r', label: { elec: 'Rear pulley', def: 'Rear sprocket' }, img: { elec: null, def: 'rear_sprocket' }, comps: ['transmission__rear_sprocket', 'transmission__rear_pulley'],
      text: { elec: 'The large pulley on the wheel. Rear teeth divided by front teeth gives the belt ratio.', def: 'The large wheel sprocket. Rear teeth divided by front teeth gives the final drive ratio.' } },
    { key: 'chain', label: { elec: 'Drive belt', def: 'Chain' }, img: { elec: null, def: 'chain_sprockets' },
      comps: ['transmission__chain', 'transmission__chain_guard', 'transmission__chain_guide', 'transmission__chain_slider', 'transmission__belt', 'transmission__belt_guard', 'transmission__sprocket_cover'],
      text: { elec: 'The toothed belt is quiet, clean and needs no oil. It carries drive from the motor pulley to the rear wheel.', '2t': 'A 520 chain with guide and slider: on a motocross bike the swingarm moves a long way, so the chain needs guiding.', def: 'A 428 chain carries drive from the gearbox sprocket to the rear wheel. It needs oil and a little slack.' } },
  ] },
  { id: 'exhaust', title: 'Exhaust', why: 'The exhaust bolts to the cylinder’s exhaust port, so the engine has to be in first.', parts: [
    { key: 'exhaust', label: { '2t': 'Expansion chamber', def: 'Exhaust' }, img: { '4t': 'exhaust_4t', '2t': 'exhaust_2t' }, comps: ['powertrain__exhaust'],
      text: { '2t': 'The expansion chamber is tuned: its pressure waves push escaping mixture back into the cylinder, which is a large part of a two-stroke’s power.', def: 'The exhaust carries hot gas away from the cylinder head and quietens it in the silencer.' } },
  ] },
  { id: 'intake', title: 'Intake and fuel system', why: 'The carburettor fits between the engine inlet and the airbox.', parts: [
    { key: 'carb', label: 'Carburettor', img: 'carb', comps: ['powertrain__intake', 'powertrain__fuel_system'],
      text: 'The carburettor meters fuel into the air the engine breathes. The throttle slide sets how much mixture goes in.' },
    { key: 'airbox', label: 'Airbox', img: 'air_filter', comps: ['frame_body__airbox'],
      text: 'The airbox holds the air filter and calms the incoming air, so the engine breathes clean, steady air.' },
  ] },
  { id: 'tank', title: { elec: 'Tank cover', def: 'Fuel tank' }, why: { elec: 'The cover sits over the battery and controller, so they go in first.', def: 'The tank sits over the frame spine and feeds the carburettor, so the intake comes first.' }, parts: [
    { key: 'tank', label: { elec: 'Tank cover', def: 'Fuel tank' }, img: { elec: null, def: 'fuel_tank' }, comps: ['frame_body__fuel_tank', 'frame_body__tank_cover'],
      text: { elec: 'There is no fuel, so the tank is a cover. It keeps the familiar shape and knee grip and protects the electronics underneath.', def: 'The fuel tank sits high over the engine so fuel can flow down to the carburettor.' } },
  ] },
  { id: 'seat', title: 'Seat', why: 'The seat hooks under the back of the tank and bolts to the subframe.', parts: [
    { key: 'seat', label: 'Seat', img: { '4t': 'seat_bench', '2t': 'seat_mx', elec: 'seat_tracker' }, comps: ['frame_body__seat'],
      text: 'The seat carries the rider over the subframe. Its height decides whether your feet reach the ground.' },
  ] },
  { id: 'wiring', title: 'Battery and wiring', why: 'Wiring is routed once the big parts are in, so nothing pinches or chafes it.', parts: [
    { key: 'battery', label: '12 V battery', img: 'battery_12v', comps: ['electrical__battery', 'electrical__aux_battery_12v'],
      text: { elec: 'The small 12 V battery runs the lights, display and contactors. The DC-DC converter keeps it charged.', def: 'The 12 V battery powers the starter, lights and horn when the engine is not running.' } },
    { key: 'harness', label: 'Wiring harness', img: 'wiring_harness', comps: ['wiring__harness_main', 'wiring__harness_lv', 'wiring__hv_cables'],
      text: { elec: 'The harness links every 12 V part. The orange cables carry high voltage between battery, controller and motor.', def: 'The harness links every electrical part. It follows the frame and is clipped clear of heat and moving parts.' } },
    { key: 'ecu', label: 'Ignition and charging units', img: null, comps: ['electrical__regulator_rectifier', 'electrical__voltage_regulator', 'electrical__ignition_coils', 'electrical__ignition_coil', 'electrical__cdi_unit'],
      text: 'The coil and its control unit make the spark; the regulator keeps the charging voltage near 14 V.' },
    { key: 'charge', label: 'Charge port', img: 'charge_port', comps: ['electrical__charge_port'],
      text: 'The charging cable plugs in here. The on-board charger then fills the traction battery.' },
  ] },
  { id: 'lights', title: 'Lights and instruments', why: 'Lights and instruments plug into the harness, so it has to be in place.', parts: [
    { key: 'headlight', label: 'Headlight', img: { '4t': 'headlight_round', '2t': 'headlight_mx', elec: 'headlight_led' }, comps: ['electrical__headlight'],
      text: 'The headlight lets you see and be seen, with a dipped and a main beam.' },
    { key: 'instruments', label: 'Instruments', img: { '4t': 'instruments_analogue', '2t': 'instruments_lcd', elec: 'instruments_tft' }, comps: ['electrical__instruments', 'electrical__tft_dash'],
      text: 'The instruments show road speed, engine speed or battery charge, and the warning lights.' },
    { key: 'tail', label: 'Tail light', img: 'tail_light', comps: ['electrical__tail_light'],
      text: 'The tail light shows red to the rear and gets brighter when you brake.' },
    { key: 'indicators', label: 'Indicators and horn', img: null, comps: ['electrical__indicators', 'electrical__horn'],
      text: 'Indicators show where you are turning; the horn warns other road users.' },
  ] },
  { id: 'body', title: 'Bodywork', why: 'Bodywork goes on late so it is not scratched while the mechanical parts go in.', parts: [
    { key: 'mudguards', label: 'Mudguards', img: null, comps: ['frame_body__front_mudguard', 'frame_body__rear_mudguard', 'frame_body__rear_hugger'],
      text: 'Mudguards stop the tyres throwing water and dirt at the rider and the engine.' },
    { key: 'panels', label: { '2t': 'Shrouds and side panels', elec: 'Side scoops and tail', def: 'Side panels' }, img: null,
      comps: ['frame_body__side_panels', 'frame_body__radiator_shrouds', 'frame_body__side_scoops', 'frame_body__tail_cowl', 'frame_body__skid_plate'],
      text: { '2t': 'Shrouds guide air through the radiators; side panels and the skid plate protect the bike in a fall.', def: 'Panels cover the battery, wiring and electronics and give the bike its shape.' } },
    { key: 'plate', label: { '2t': 'Number plates', def: 'Number plate bracket' }, img: null, comps: ['frame_body__number_plate', 'frame_body__number_plate_bracket'],
      text: { '2t': 'Race number plates front and sides, so the officials can read your number.', def: 'The bracket holds the registration plate and its light at the rear.' } },
  ] },
  { id: 'controls', title: 'Controls', why: 'The controls connect to brakes, clutch, gearbox and wiring, which are all in place now.', parts: [
    { key: 'handlebar', label: 'Handlebar', img: 'handlebar', comps: ['chassis__handlebar', 'electrical__kill_switch'],
      text: 'The handlebar carries the throttle, the clutch and front brake levers and the switches: everything the hands do.' },
    { key: 'pegs', label: { '2t': 'Footpegs and gear lever', def: 'Footpegs, levers and stand' }, img: null, comps: ['chassis__footpegs', 'transmission__gear_lever', 'chassis__side_stand'],
      text: 'Footpegs carry your weight; the gear lever and brake pedal are worked by your feet, and the side stand holds the parked bike.' },
  ] },
];
/* Safety net: an unknown component falls back to a part by category */
const FALLBACK = { chassis: 'pegs', electrical: 'indicators', frame_body: 'panels', transmission: 'chain', wheels: 'front_wheel', wiring: 'harness' };

/* --------------------------------------------------------------------------
   DOM
   -------------------------------------------------------------------------- */
const $ = (id) => document.getElementById(id);
const stage = $('bb-stage');
const statusEl = $('bb-status');
const noteEl = $('bb-note');
const trayEl = $('bb-tray');
const msgEl = $('bb-msg');
const stepsEl = $('bb-steps');

/* --------------------------------------------------------------------------
   three.js scene
   -------------------------------------------------------------------------- */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false; // the shadow only changes when parts move, not when the camera orbits
renderer.setClearColor(0xffffff, 0);
const canvas = renderer.domElement;
canvas.setAttribute('aria-label', '3D bike: drag to orbit, scroll or pinch to zoom');
canvas.tabIndex = 0;
stage.insertBefore(canvas, stage.firstChild);

const WHITE = new THREE.Color(0xffffff);
const scene = new THREE.Scene();
scene.background = WHITE;
const pmrem = new THREE.PMREMGenerator(renderer);
const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
pmrem.dispose();
scene.environment = envTex;
scene.add(new THREE.HemisphereLight(0xffffff, 0xe6e6e6, 0.35));
const key = new THREE.DirectionalLight(0xffffff, 1.6);
key.position.set(1.4, 4.2, 2.4);
key.castShadow = true;
key.shadow.mapSize.set(1536, 1536);
Object.assign(key.shadow.camera, { left: -1.8, right: 1.8, top: 1.8, bottom: -1.8, near: 0.5, far: 10 });
key.shadow.bias = -0.0004;
key.shadow.normalBias = 0.02;
key.shadow.radius = 5;
scene.add(key, key.target);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.14 }));
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);
/* soft contact shadow under the bike */
const blobTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  gr.addColorStop(0, 'rgba(0,0,0,0.55)'); gr.addColorStop(0.55, 'rgba(0,0,0,0.18)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const blob = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false, opacity: 0.55 }));
blob.rotation.x = -Math.PI / 2;
blob.position.y = 0.002;
blob.renderOrder = -1;
scene.add(blob);

const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 60);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.09;
controls.maxPolarAngle = Math.PI * 0.495;
controls.minDistance = 0.6;
controls.maxDistance = 9;

/* Ghost materials (shared, never disposed with a bike) */
const ghostMat = new THREE.MeshBasicMaterial({ color: 0x9aa1a9, transparent: true, opacity: 0.075, depthWrite: false });
const ghostCurMat = new THREE.MeshBasicMaterial({ color: ACC, transparent: true, opacity: 0.16, depthWrite: false });
const ghostHotMat = new THREE.MeshBasicMaterial({ color: ACC, transparent: true, opacity: 0.42, depthWrite: false });
const compareMat = new THREE.MeshBasicMaterial({ color: ACC, transparent: true, opacity: 0.14, depthWrite: false });

/* Rig: rig (pitch about rear axle + lift) → inner (−pivot) → holder (cm→m, centred) → gltf scene */
const rig = new THREE.Group();
const inner = new THREE.Group();
const holder = new THREE.Group();
rig.add(inner); inner.add(holder); scene.add(rig);
const compareHolder = new THREE.Group();
scene.add(compareHolder);

let dirty = true, raf = 0, idle = 0, lastRenderMs = 0, shadowDirty = true;
const anims = [];
function wake(geom) { dirty = true; idle = 0; if (geom !== false) shadowDirty = true; if (!raf) raf = requestAnimationFrame(tick); }
function tick(now) {
  raf = 0;
  let busy = false;
  const geomBusy = anims.some((a) => !a.cam);
  for (let i = anims.length - 1; i >= 0; i--) {
    const a = anims[i];
    if (a.t0 == null) a.t0 = now + (a.delay || 0);
    const k = Math.min(1, Math.max(0, (now - a.t0) / a.dur));
    if (now >= a.t0) a.fn(k);
    if (k >= 1) { anims.splice(i, 1); a.done && a.done(); }
    busy = true;
  }
  const moved = controls.update();
  if (geomBusy || shadowDirty) { renderer.shadowMap.needsUpdate = true; shadowDirty = false; }
  if (dirty || moved || busy) { const t = performance.now(); renderer.render(scene, camera); lastRenderMs = performance.now() - t; dirty = false; idle = 0; } else idle++;
  if (idle < 30) raf = requestAnimationFrame(tick); // sleep when idle; woken by input or changes
}
controls.addEventListener('change', () => wake(false));
controls.addEventListener('start', () => wake(false));
function resize() {
  const r = stage.getBoundingClientRect();
  if (!r.width || !r.height) return;
  renderer.setSize(r.width, r.height, false);
  camera.aspect = r.width / r.height;
  camera.updateProjectionMatrix();
  wake(false);
}
new ResizeObserver(resize).observe(stage);

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);

/* --------------------------------------------------------------------------
   State
   -------------------------------------------------------------------------- */
let bikeId = '4t', B = BIKES['4t'];
let gltfRoot = null, meshes = [], steps = [], partsByKey = {}, placed = [], loadToken = 0;
let geo = null;              // measured geometry (scene units = cm)
let cfg = null;              // current configuration
let compareGroup = null;
let standGroup = null;
const thumbs = {};
const standMat = new THREE.MeshStandardMaterial({ color: 0x3b3e43, metalness: 0.35, roughness: 0.55 });
const standTopMat = new THREE.MeshStandardMaterial({ color: 0xC8502A, metalness: 0.1, roughness: 0.6 });

/* Workshop stand that holds the frame until both wheels are on (scene units, cm) */
function makeStand() {
  const fr = meshes.filter((m) => m.userData.part === 'frame');
  const b = boxOf(fr.length ? fr : meshes);
  const eng = meshes.filter((m) => /^powertrain__(engine|motor|traction_battery)/.test(m.name));
  const eb = eng.length ? boxOf(eng) : b;
  const top = Math.max(8, Math.min(b.min.y, eb.min.y) - geo.groundY - 1.5);
  const cx = (eb.min.x + eb.max.x) / 2;
  const g = new THREE.Group();
  const add = (w, h, d, y, mat) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(cx, geo.groundY + y, geo.center.z); m.castShadow = true; g.add(m); };
  add(52, 2.5, 40, 1.25, standMat);
  add(7, top - 5, 7, 2.5 + (top - 5) / 2, standMat);
  add(36, 2.5, 22, top - 1.25, standTopMat);
  return g;
}
function updateStand() {
  if (!standGroup) return;
  standGroup.visible = !(isPlaced('front_wheel') && isPlaced('rear_wheel'));
}

const ease = (k) => 1 - Math.pow(1 - k, 3);
const compOf = (n) => n.split('__').slice(0, 2).join('__');

function disposeBike() {
  anims.length = 0;
  if (compareGroup) { compareHolder.remove(compareGroup); compareGroup = null; }
  if (gltfRoot) {
    holder.remove(gltfRoot);
    gltfRoot.traverse((m) => {
      if (m.geometry) m.geometry.dispose();
      const mats = [m.userData.real, m.material].filter(Boolean);
      new Set(mats).forEach((mat) => { if (mat === ghostMat || mat === ghostCurMat || mat === ghostHotMat || mat === compareMat) return; for (const k in mat) { const v = mat[k]; if (v && v.isTexture) v.dispose(); } mat.dispose(); });
    });
  }
  if (standGroup) { holder.remove(standGroup); standGroup.traverse((m) => m.geometry && m.geometry.dispose()); standGroup = null; }
  Object.values(swapStore || {}).forEach((st) => st.orig.forEach((m) => { m.geometry?.dispose(); m.userData.real?.dispose?.(); }));
  swapStore = {}; swaps = {};
  gltfRoot = null; meshes = []; steps = []; partsByKey = {}; placed = [];
  renderer.renderLists.dispose();
}

function resolveSteps() {
  const byComp = new Map();
  const allParts = [];
  STEPS.forEach((s) => s.parts.forEach((p) => { p.comps.forEach((c) => byComp.set(c, p.key)); allParts.push(p); }));
  const groups = {};
  for (const m of meshes) {
    const c = compOf(m.name);
    let k = byComp.get(c);
    if (!k) k = (B.kind === 'elec' && c.startsWith('powertrain')) ? 'motor' : (FALLBACK[c.split('__')[0]] || 'panels');
    (groups[k] = groups[k] || []).push(m);
    m.userData.part = k;
  }
  const out = [];
  for (const s of STEPS) {
    const parts = [];
    for (const p of s.parts) {
      const ms = groups[p.key];
      if (!ms || !ms.length) continue;
      const part = {
        key: p.key, label: per(p.label, bikeId), img: per(p.img, bikeId), text: per(p.text, bikeId), meshes: ms, step: null,
      };
      parts.push(part); partsByKey[p.key] = part;
    }
    if (parts.length) {
      const st = { id: s.id, title: per(s.title, bikeId), why: per(s.why, bikeId), parts };
      parts.forEach((p) => { p.step = st; });
      out.push(st);
    }
  }
  out.forEach((s, i) => { s.index = i; });
  return out;
}

/* Matrix per mesh: T(anim) · cfgXf · home (scene space, flat hierarchy) */
const _m = new THREE.Matrix4();
function updateMesh(m) {
  const u = m.userData;
  m.matrix.copy(u.home);
  if (u.xf) m.matrix.premultiply(u.xf);
  if (u.anim) { _m.makeTranslation(u.anim.x, u.anim.y, u.anim.z); m.matrix.premultiply(_m); }
  m.matrixWorldNeedsUpdate = true;
}

function boxOf(ms) {
  const b = new THREE.Box3();
  for (const m of ms) { if (!m.geometry.boundingBox) m.geometry.computeBoundingBox(); b.union(m.geometry.boundingBox.clone().applyMatrix4(m.userData.home)); }
  return b;
}

function measure() {
  const pick = (pre) => meshes.filter((m) => m.name.startsWith(pre));
  const all = boxOf(meshes);
  const tyreF = boxOf(pick('wheels__front_wheel__tyre').length ? pick('wheels__front_wheel__tyre') : pick('wheels__front_wheel'));
  const tyreR = boxOf(pick('wheels__rear_wheel__tyre').length ? pick('wheels__rear_wheel__tyre') : pick('wheels__rear_wheel'));
  const cF = tyreF.getCenter(new THREE.Vector3()), cR = tyreR.getCenter(new THREE.Vector3());
  const RF = (tyreF.max.y - tyreF.min.y) / 2, RR = (tyreR.max.y - tyreR.min.y) / 2;
  const groundY = Math.min(tyreF.min.y, tyreR.min.y);
  const center = all.getCenter(new THREE.Vector3());
  const sprF = boxOf(pick('transmission__front_sprocket').concat(pick('transmission__front_pulley')));
  const sprR = boxOf(pick('transmission__rear_sprocket').concat(pick('transmission__rear_pulley')));
  const seat = boxOf(pick('frame_body__seat'));
  const seatPt = new THREE.Vector3((seat.min.x + seat.max.x) / 2, seat.max.y, 0);
  // lowest points of the sprung chassis for ground clearance
  const low = [];
  for (const m of meshes) {
    if (!/^(powertrain|frame_body)__/.test(m.name)) continue;
    const b = boxOf([m]);
    low.push(new THREE.Vector3((b.min.x + b.max.x) / 2, b.min.y, 0), new THREE.Vector3(b.min.x, b.min.y, 0), new THREE.Vector3(b.max.x, b.min.y, 0));
  }
  return {
    all, center, groundY, cF, cR, RF, RR,
    sprF: { c: sprF.getCenter(new THREE.Vector3()), r: (sprF.max.y - sprF.min.y) / 2 },
    sprR: { c: sprR.getCenter(new THREE.Vector3()), r: (sprR.max.y - sprR.min.y) / 2 },
    seatPt, low,
    eng: boxOf(meshes.filter((m) => /^powertrain__(engine|motor$|motor__)/.test(m.name))).getCenter(new THREE.Vector3()),
    batt: boxOf(pick('powertrain__traction_battery')).getCenter(new THREE.Vector3()),
  };
}

/* --------------------------------------------------------------------------
   Load a bike
   -------------------------------------------------------------------------- */
async function loadBike(id) {
  const token = ++loadToken;
  bikeId = id; B = BIKES[id];
  renderBikeButtons();
  statusEl.hidden = false;
  statusEl.textContent = 'Loading the ' + B.name.toLowerCase() + '…';
  trayEl.innerHTML = '';
  disposeBike();
  let gltf;
  try { gltf = await loader.loadAsync(MODELS + B.file + '.glb'); } catch (e) { statusEl.textContent = 'Could not load the 3D model.'; return; }
  if (token !== loadToken) { gltf.scene.traverse((m) => { if (m.geometry) m.geometry.dispose(); if (m.material) m.material.dispose(); }); return; }
  gltfRoot = gltf.scene;
  gltfRoot.updateMatrixWorld(true);
  // Multi-material nodes load as a Group of meshes: flatten them so every mesh
  // sits directly under the scene root and carries its node's name.
  const nested = [];
  gltfRoot.traverse((m) => { if (m.isMesh && m.parent !== gltfRoot) nested.push(m); });
  nested.forEach((m) => { const nm = m.parent.name || m.name; gltfRoot.attach(m); m.name = nm; });
  gltfRoot.traverse((m) => {
    if (!m.isMesh) return;
    if (!m.name && m.parent) m.name = m.parent.name;
    const mat = m.material.clone();
    m.material.dispose?.();
    if (mat.transmission) { mat.transmission = 0; mat.transparent = true; mat.opacity = Math.min(mat.opacity, 0.35); mat.depthWrite = false; }
    const u = m.userData;
    u.real = mat; u.matName = mat.name || '';
    u.o = { opacity: mat.opacity, transparent: mat.transparent, depthWrite: mat.depthWrite, color: mat.color ? mat.color.clone() : null,
      emissive: mat.emissive ? mat.emissive.clone() : null, ei: mat.emissiveIntensity };
    m.updateMatrix();
    u.home = m.matrix.clone();
    m.matrixAutoUpdate = false;
    m.castShadow = true; m.receiveShadow = false;
    m.material = mat;
    meshes.push(m);
  });
  holder.add(gltfRoot);
  geo = measure();
  holder.scale.setScalar(0.01);
  holder.position.set(-geo.center.x * 0.01, -geo.groundY * 0.01, -geo.center.z * 0.01);
  steps = resolveSteps();
  prepChain();
  standGroup = makeStand();
  holder.add(standGroup);
  standGroup.visible = false;
  await makeThumbs(token);
  if (token !== loadToken) return;
  cfg = stockCfg();
  applyCfg();
  blob.scale.set((geo.all.max.x - geo.all.min.x) * 0.0118, (geo.all.max.z - geo.all.min.z) * 0.02 + 0.25, 1);
  setupConfigUI();
  setupSwapUI();
  resetBuild(true);
  setView(window.innerWidth < 880 ? 'side' : 'threeq', true);
  statusEl.hidden = true;
  wake();
}

/* --------------------------------------------------------------------------
   Card thumbnails for parts without a studio render: render the part alone
   -------------------------------------------------------------------------- */
async function makeThumbs(token) {
  for (const k in thumbs) delete thumbs[k];
  const need = steps.flatMap((s) => s.parts).filter((p) => !p.img);
  if (!need.length) { try { renderer.compile(scene, camera); } catch (e) { /* lazily */ } return; }
  const w = 220, h = 150;
  const prevSize = renderer.getSize(new THREE.Vector2());
  const prevPR = renderer.getPixelRatio();
  const cam = new THREE.PerspectiveCamera(28, w / h, 0.01, 50);
  renderer.setPixelRatio(2);
  renderer.setSize(w, h, false);
  scene.background = null; ground.visible = false; blob.visible = false; compareHolder.visible = false;
  holder.updateMatrixWorld(true);
  for (const p of need) {
    if (token !== loadToken) break;
    meshes.forEach((m) => { m.visible = p.meshes.includes(m); m.material = m.userData.real; });
    const b = new THREE.Box3(); p.meshes.forEach((m) => b.expandByObject(m));
    const c = b.getCenter(new THREE.Vector3()), r = b.getSize(new THREE.Vector3()).length() / 2 || 0.1;
    const d = r / Math.sin(THREE.MathUtils.degToRad(14)) * 1.02;
    cam.position.copy(c).add(new THREE.Vector3(-0.55, 0.42, 0.75).normalize().multiplyScalar(d));
    cam.lookAt(c); cam.near = d / 50; cam.far = d * 4; cam.updateProjectionMatrix();
    renderer.render(scene, cam);
    const cv = document.createElement('canvas'); cv.width = w * 2; cv.height = h * 2;
    cv.getContext('2d').drawImage(canvas, 0, 0, cv.width, cv.height);
    thumbs[p.key] = cv.toDataURL('image/png');
    await new Promise((r2) => setTimeout(r2, 0));
  }
  meshes.forEach((m) => { m.visible = true; m.material = m.userData.real; });
  try { renderer.compile(scene, camera); } catch (e) { /* compiled lazily instead */ }
  scene.background = WHITE; ground.visible = true; blob.visible = true; compareHolder.visible = true;
  renderer.setPixelRatio(prevPR);
  renderer.setSize(prevSize.x, prevSize.y, false);
  resize();
}

/* --------------------------------------------------------------------------
   Assembly
   -------------------------------------------------------------------------- */
let hotPart = null;
const isPlaced = (k) => placed.includes(k);
function currentStep() { return steps.find((s) => s.parts.some((p) => !isPlaced(p.key))) || null; }

function setGhost(m, mat) {
  m.material = mat; m.castShadow = false; m.renderOrder = 2;
}
function setReal(m) {
  const u = m.userData, mat = u.real;
  m.material = mat; m.castShadow = true; m.renderOrder = 0;
  if (mat.emissive && u.o.emissive) { mat.emissive.copy(u.o.emissive); mat.emissiveIntensity = u.o.ei; }
}
function paintGhosts() {
  const cur = currentStep();
  for (const m of meshes) {
    const k = m.userData.part;
    if (isPlaced(k) || m.userData.flying) continue;
    const mat = k === hotPart ? ghostHotMat : (cur && cur.parts.some((p) => p.key === k) ? ghostCurMat : ghostMat);
    setGhost(m, mat);
  }
  wake();
}

function fitPart(part, opts = {}) {
  if (isPlaced(part.key)) return;
  placed.push(part.key);
  const c = geo.center;
  const pb = boxOf(part.meshes);
  const pc = pb.getCenter(new THREE.Vector3());
  const dir = new THREE.Vector3(pc.x - c.x, Math.max(0, pc.y - c.y), 0);
  if (dir.lengthSq() < 1) dir.set(0, 1, 0);
  dir.normalize().multiplyScalar(55).add(new THREE.Vector3(0, 55, 85));
  const dur = opts.fast ? 520 : (reduceMotion ? 1 : 850);
  part.meshes.forEach((m) => {
    setReal(m);
    m.userData.flying = true;
    m.userData.anim = dir.clone();
    updateMesh(m);
  });
  anims.push({ dur, delay: opts.delay || 0, fn: (k) => {
    const e = ease(k);
    part.meshes.forEach((m) => {
      const u = m.userData;
      if (!u.anim) return;
      u.anim.copy(dir).multiplyScalar(1 - e);
      if (m.material.emissive) { m.material.emissive.copy(ACC); m.material.emissiveIntensity = GLOW; }
      updateMesh(m);
    });
  }, done: () => {
    part.meshes.forEach((m) => {
      m.userData.anim = null; m.userData.flying = false;
      updateMesh(m);
    });
    // glow fades out after landing
    anims.push({ dur: opts.fast ? 300 : 900, fn: (k) => {
      part.meshes.forEach((m) => {
        const u = m.userData, mat = m.material;
        if (!mat.emissive || !u.o.emissive || mat !== u.real) return;
        mat.emissive.copy(ACC).lerp(u.o.emissive, k);
        mat.emissiveIntensity = GLOW * (1 - k) + u.o.ei * k;
      });
    } });
  } });
  if (!opts.silent) {
    note(`<b>${part.label} fitted</b>${part.text}`);
    say(`<b>${part.label}.</b> ${part.text}`);
  }
  refreshBuildUI();
  wake();
}

function unfit(key) {
  const p = partsByKey[key];
  placed = placed.filter((k) => k !== key);
  p.meshes.forEach((m) => { m.userData.anim = null; m.userData.flying = false; updateMesh(m); });
  refreshBuildUI();
}

function tryPlace(part) {
  if (!part || isPlaced(part.key)) return;
  const cur = currentStep();
  if (cur && part.step !== cur) {
    const msg = `<b>Not yet: the ${part.label.toLowerCase()} comes in step ${part.step.index + 1}.</b> ${part.step.why} Fit the ${cur.title.toLowerCase()} first.`;
    say(msg, 'warn');
    note(`<b>${part.label}: not yet</b>${part.step.why}`, true);
    return;
  }
  fitPart(part);
}

function resetBuild(quiet) {
  anims.length = 0;
  placed = [];
  meshes.forEach((m) => { m.userData.anim = null; m.userData.flying = false; updateMesh(m); });
  refreshBuildUI();
  if (!quiet) say('Back to a bare workshop stand. Start with the frame.');
  else say(`Start with the <b>frame</b>: drag its card onto the bike, or select it and press Enter. The faint outline shows where every part will go.`);
  noteEl.classList.remove('is-on');
}

let autoTimer = 0;
function autoBuild() {
  clearTimeout(autoTimer);
  const rest = steps.flatMap((s) => s.parts).filter((p) => !isPlaced(p.key));
  if (!rest.length) return;
  const gap = reduceMotion ? 0 : 160;
  rest.forEach((p, i) => fitPart(p, { fast: true, silent: true, delay: i * gap }));
  autoTimer = setTimeout(() => { if (!currentStep()) say('<b>All parts fitted.</b> Open Configure to change wheels, gearing and colours.', 'done'); }, rest.length * gap + 600);
}

/* --------------------------------------------------------------------------
   Build UI
   -------------------------------------------------------------------------- */
function say(html, kind) {
  msgEl.innerHTML = html;
  msgEl.className = 'bb-msg' + (kind ? ' is-' + kind : '');
}
let noteTimer = 0;
function note(html, warn) {
  noteEl.innerHTML = html.replace('</b>', '</b>');
  noteEl.classList.toggle('is-warn', !!warn);
  noteEl.classList.add('is-on');
  clearTimeout(noteTimer);
  noteTimer = setTimeout(() => noteEl.classList.remove('is-on'), warn ? 4500 : 6500);
}

function cardImg(part) {
  if (part.img) { const i = new Image(); i.src = RENDERS + part.img + '.webp'; i.alt = ''; i.decoding = 'async'; i.draggable = false; return i; }
  if (thumbs[part.key]) { const i = new Image(); i.src = thumbs[part.key]; i.alt = ''; i.draggable = false; return i; }
  const d = document.createElement('div'); d.className = 'bb-label-card'; d.textContent = part.label; return d;
}

function refreshBuildUI() {
  const cur = currentStep();
  const total = steps.reduce((a, s) => a + s.parts.length, 0);
  const pct = Math.round(placed.length / Math.max(1, total) * 100);
  $('bb-bar').style.width = pct + '%';
  $('bb-prog-n').textContent = pct + '%';
  $('bb-prog-t').textContent = cur ? `Step ${cur.index + 1} of ${steps.length}` : 'Complete';
  $('bb-step-t').textContent = cur ? cur.title : `${B.name} complete`;
  $('bb-step-why').textContent = cur ? cur.why : 'Every part is in place. Switch to Configure to change wheel sizes, gearing and colours and watch the effects.';
  // tray: current step, then the next step greyed
  trayEl.innerHTML = '';
  if (cur) {
    cur.parts.filter((p) => !isPlaced(p.key)).forEach((p) => trayEl.appendChild(makeCard(p, false)));
    const next = steps[cur.index + 1];
    if (next) {
      const h = document.createElement('p'); h.className = 'bb-tray-sub'; h.textContent = 'Next: ' + next.title; trayEl.appendChild(h);
      next.parts.forEach((p) => trayEl.appendChild(makeCard(p, true)));
    }
  }
  // checklist
  stepsEl.innerHTML = '';
  steps.forEach((s) => {
    const li = document.createElement('li');
    const done = s.parts.every((p) => isPlaced(p.key));
    li.className = done ? 'is-done' : (s === cur ? 'is-cur' : '');
    const n = s.parts.filter((p) => isPlaced(p.key)).length;
    li.innerHTML = `<span>${s.title}</span><small>${n}/${s.parts.length}</small>`;
    stepsEl.appendChild(li);
  });
  $('bb-undo').disabled = !placed.length;
  $('bb-reset').disabled = !placed.length;
  $('bb-auto').disabled = !cur;
  if (!cur && placed.length === total && total) {
    try { PG.recordTool('builder', { bike: bikeId, assembled: true }); } catch (e) { /* storage unavailable */ }
    say(`<b>The ${B.name.toLowerCase()} is complete.</b> Every part from the workshop order is in place. Open Configure to change wheels, gearing and colours.`, 'done');
  }
  paintGhosts();
  updateStand();
  window.__bb = debugState();
}

function makeCard(part, later) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'bb-card' + (later ? ' is-later' : '');
  b.dataset.part = part.key;
  b.setAttribute('aria-label', later ? `${part.label} (later step)` : `Fit ${part.label}`);
  b.appendChild(cardImg(part));
  const s = document.createElement('span'); s.textContent = part.label; b.appendChild(s);
  if (later) { const t = document.createElement('span'); t.className = 'bb-tag'; t.textContent = 'Later'; b.appendChild(t); }
  attachDrag(b, part);
  return b;
}

/* Drag and drop with pointer events (mouse, pen, touch); click or Enter fits too */
function attachDrag(el, part) {
  let start = null, ghost = null, moved = false, suppressClick = false;
  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    start = { x: e.clientX, y: e.clientY, id: e.pointerId };
    moved = false;
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', (e) => {
    if (!start || e.pointerId !== start.id) return;
    if (!moved && Math.hypot(e.clientX - start.x, e.clientY - start.y) < 7) return;
    if (!moved) {
      moved = true;
      ghost = document.createElement('div'); ghost.className = 'bb-drag';
      ghost.appendChild(cardImg(part));
      const s = document.createElement('div'); s.textContent = part.label; ghost.appendChild(s);
      document.body.appendChild(ghost);
      el.classList.add('is-dragging');
      if (part.step === currentStep()) { hotPart = null; }
    }
    ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px';
    const over = overStage(e);
    stage.classList.toggle('is-drop', over);
    const h = over && part.step === currentStep() ? part.key : null;
    if (h !== hotPart) { hotPart = h; paintGhosts(); }
  });
  const end = (e, cancel) => {
    if (!start || e.pointerId !== start.id) return;
    const wasMoved = moved;
    start = null;
    if (ghost) { ghost.remove(); ghost = null; }
    el.classList.remove('is-dragging');
    stage.classList.remove('is-drop');
    if (hotPart) { hotPart = null; paintGhosts(); }
    if (wasMoved) {
      suppressClick = true; setTimeout(() => { suppressClick = false; }, 50);
      if (!cancel && overStage(e)) tryPlace(part);
      else if (!cancel) say(`Drop the ${part.label.toLowerCase()} onto the bike on the left to fit it.`);
    }
  };
  el.addEventListener('pointerup', (e) => end(e, false));
  el.addEventListener('pointercancel', (e) => end(e, true));
  el.addEventListener('click', (e) => { if (suppressClick) { e.preventDefault(); return; } tryPlace(part); });
}
function overStage(e) {
  const r = stage.getBoundingClientRect();
  return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
}

$('bb-undo').addEventListener('click', () => {
  const k = placed[placed.length - 1];
  if (!k) return;
  unfit(k);
  say(`Removed the <b>${partsByKey[k].label.toLowerCase()}</b>.`);
});
$('bb-reset').addEventListener('click', () => resetBuild(false));
$('bb-auto').addEventListener('click', autoBuild);

/* --------------------------------------------------------------------------
   Camera
   -------------------------------------------------------------------------- */
const VIEWS = [['threeq', 'Three-quarter'], ['side', 'Side'], ['front', 'Front'], ['top', 'Top']];
let viewNow = 'threeq';
function setView(v, instant) {
  viewNow = v;
  const box = new THREE.Box3().setFromObject(rig);
  const size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
  const dirs = { side: [0, 0.1, 1], threeq: [-0.72, 0.36, 0.86], front: [1, 0.22, 0.12], top: [0.02, 1, 0.12] };
  const dir = new THREE.Vector3(...dirs[v]).normalize();
  const r = size.length() / 2;
  const fov = THREE.MathUtils.degToRad(camera.fov);
  const tv = Math.tan(fov / 2), th = tv * camera.aspect;
  let d;
  if (v === 'side' || v === 'front') {
    // exact fit of the box face seen from that side, with a margin
    const w = (v === 'side' ? size.x : size.z) / 2, h = size.y / 2, depth = (v === 'side' ? size.z : size.x) / 2;
    d = Math.max(h / tv, w / th) * 1.12 + depth;
  } else {
    const fitH = r / Math.sin(fov / 2), fitW = r / Math.sin(Math.atan(th));
    d = Math.max(fitH, fitW) * (camera.aspect < 1 ? 0.86 : v === 'top' ? 0.8 : 0.76);
  }
  const toPos = c.clone().add(dir.multiplyScalar(d));
  const fromPos = camera.position.clone(), fromT = controls.target.clone();
  key.target.position.copy(c); key.position.copy(c).add(new THREE.Vector3(1.4, 4.2, 2.4));
  if (instant || reduceMotion) { camera.position.copy(toPos); controls.target.copy(c); controls.update(); wake(); }
  else anims.push({ cam: true, dur: 650, fn: (k) => { const e = ease(k); camera.position.lerpVectors(fromPos, toPos, e); controls.target.lerpVectors(fromT, c, e); } });
  [...$('bb-views').children].forEach((b) => b.classList.toggle('is-on', b.dataset.v === v));
  wake();
}
VIEWS.forEach(([v, l]) => {
  const b = document.createElement('button'); b.type = 'button'; b.className = 'bb-pill'; b.dataset.v = v; b.textContent = l;
  b.addEventListener('click', () => setView(v));
  $('bb-views').appendChild(b);
});

/* --------------------------------------------------------------------------
   Configuration: wheels, final drive, colours
   -------------------------------------------------------------------------- */
const SW = {
  body: ['#C8502A', '#B3262E', '#1E2B5E', '#2F6B4F', '#E9E4D6', '#1B1B1B', '#E9B92F', '#7FA6C4'],
  frame: ['#1B1B1B', '#B9BDC2', '#C8502A', '#E9E4D6', '#1E2B5E', '#B3262E'],
  wheel: ['#1B1B1B', '#C9A227', '#B9BDC2', '#C8502A', '#E9E4D6', '#1E2B5E'],
};
function stockCfg() {
  return { rimF: B.rim.f, rimR: B.rim.r, sprF: B.sprF, sprR: B.sprR, bore: B.bore, stroke: B.stroke, cr: B.cr, kw: B.kw, kwh: B.kwh,
    body: null, frame: null, wheel: null, compare: cfg ? cfg.compare : false };
}
function wheelScale(which, c = cfg) {
  const R = which === 'f' ? geo.RF : geo.RR;
  const d = ((which === 'f' ? c.rimF - B.rim.f : c.rimR - B.rim.r) * 2.54) / 2; // cm of radius
  return { s: (R + d) / R, R, Rn: R + d };
}
/* Engine or battery grows a little with its size (within 10 %), so the change is visible */
function engScale(c = cfg) {
  if (!c) return 1;
  const r = B.kind === 'elec' ? c.kw / B.kw : ccOf(c.bore, c.stroke) / ccOf(B.bore, B.stroke);
  // a quarter power keeps the engine inside the frame but makes 100, 125, 250 and 400 cc clearly different
  return Math.round(Math.min(1.4, Math.max(0.85, Math.pow(r, 0.25))) * 1000) / 1000;
}
function battScale(c = cfg) {
  if (!c || B.kind !== 'elec') return 1;
  return Math.round(Math.min(1.1, Math.max(0.9, Math.cbrt(c.kwh / B.kwh))) * 1000) / 1000;
}
function scale3(c, s) {
  return new THREE.Matrix4().makeTranslation(c.x, c.y, c.z).multiply(new THREE.Matrix4().makeScale(s, s, s)).multiply(new THREE.Matrix4().makeTranslation(-c.x, -c.y, -c.z));
}
function scaleAbout(c, s) {
  return new THREE.Matrix4().makeTranslation(c.x, c.y, 0).multiply(new THREE.Matrix4().makeScale(s, s, 1)).multiply(new THREE.Matrix4().makeTranslation(-c.x, -c.y, 0));
}

/* Chain or belt: keep it wrapped around resized sprockets by moving vertices */
let chainMeshes = [];
function prepChain() {
  chainMeshes = meshes.filter((m) => /^transmission__(chain__|chain$|belt$)/.test(m.name));
  for (const m of chainMeshes) {
    const a = m.geometry.getAttribute('position');
    const src = new Float32Array(a.count * 3);
    for (let i = 0; i < a.count; i++) { src[i * 3] = a.getX(i); src[i * 3 + 1] = a.getY(i); src[i * 3 + 2] = a.getZ(i); }
    m.userData.src = src;
    m.geometry.setAttribute('position', new THREE.BufferAttribute(src.slice(), 3));
  }
}
function deformChain(sf, sr) {
  if (!chainMeshes.length) return;
  const Cf = geo.sprF.c, Cr = geo.sprR.c;
  const rf = geo.sprF.r, rr = geo.sprR.r;
  const dx = Cr.x - Cf.x, dy = Cr.y - Cf.y, L = Math.hypot(dx, dy);
  const ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const v = new THREE.Vector3();
  for (const m of chainMeshes) {
    const home = m.userData.home, inv = home.clone().invert();
    const src = m.userData.src, attr = m.geometry.getAttribute('position'), dst = attr.array;
    for (let i = 0; i < src.length; i += 3) {
      v.set(src[i], src[i + 1], src[i + 2]).applyMatrix4(home);
      const px = v.x - Cf.x, py = v.y - Cf.y;
      const t = (px * ux + py * uy) / L;
      if (t <= 0) { v.x = Cf.x + px * sf; v.y = Cf.y + py * sf; }
      else if (t >= 1) { v.x = Cr.x + (v.x - Cr.x) * sr; v.y = Cr.y + (v.y - Cr.y) * sr; }
      else {
        const off = px * nx + py * ny;
        const k = (rf * sf * (1 - t) + rr * sr * t) / (rf * (1 - t) + rr * t);
        const bx = Cf.x + ux * t * L, by = Cf.y + uy * t * L;
        v.x = bx + nx * off * k; v.y = by + ny * off * k;
      }
      v.applyMatrix4(inv);
      dst[i] = v.x; dst[i + 1] = v.y; dst[i + 2] = v.z;
    }
    attr.needsUpdate = true;
    m.geometry.computeBoundingSphere();
    m.geometry.computeBoundingBox();
  }
}

/* Pose of the whole bike on the new tyres: pitch about the rear axle and lift */
function pose(c = cfg) {
  const f = wheelScale('f', c), r = wheelScale('r', c);
  const A = geo.cR, Fa = geo.cF;
  const L = Fa.x - A.x, h = Fa.y - A.y;
  const target = h + (f.Rn - f.R) - (r.Rn - r.R);
  const D = Math.hypot(L, h);
  const theta = Math.asin(Math.max(-1, Math.min(1, target / D))) - Math.atan2(h, L);
  return { theta, lift: r.Rn - r.R, f, r };
}
function poseMatrix(p) {
  // scene-space (cm) transform equivalent to the rig: rotate about rear axle, then lift
  const A = geo.cR;
  return new THREE.Matrix4().makeTranslation(A.x, A.y + p.lift, 0).multiply(new THREE.Matrix4().makeRotationZ(p.theta)).multiply(new THREE.Matrix4().makeTranslation(-A.x, -A.y, 0));
}

function applyCfg() {
  if (!geo) return;
  const f = wheelScale('f'), r = wheelScale('r');
  const sf = cfg.sprF / B.sprF, sr = cfg.sprR / B.sprR;
  const xfF = scaleAbout(geo.cF, f.s), xfR = scaleAbout(geo.cR, r.s);
  for (const m of meshes) {
    const n = m.name;
    let xf = null;
    if (n.startsWith('wheels__front_wheel') || /^chassis__front_brake__disc/.test(n)) xf = xfF;
    else if (n.startsWith('wheels__rear_wheel') || /^chassis__rear_brake__disc/.test(n)) xf = xfR;
    else if (/^chassis__front_brake__caliper/.test(n) || /^chassis__rear_brake__caliper/.test(n)) {
      const front = n.includes('front'), s = front ? f.s : r.s, c = front ? geo.cF : geo.cR;
      const disc = meshes.find((d) => d.name === (front ? 'chassis__front_brake__disc' : 'chassis__rear_brake__disc'));
      if (disc) {
        const db = boxOf([disc]), dr = (db.max.y - db.min.y) / 2;
        const cb = boxOf([m]).getCenter(new THREE.Vector3());
        const dir = new THREE.Vector3(cb.x - c.x, cb.y - c.y, 0).normalize().multiplyScalar(dr * (s - 1));
        xf = new THREE.Matrix4().makeTranslation(dir.x, dir.y, 0);
      }
    } else if (/^transmission__(front_sprocket|front_pulley)/.test(n)) xf = scaleAbout(geo.sprF.c, sf);
    else if (/^transmission__(rear_sprocket|rear_pulley)/.test(n)) xf = scaleAbout(geo.sprR.c, sr);
    else if (engScale() !== 1 && /^(powertrain__(engine|clutch|motor$|motor__)|electrical__(alternator|stator|starter_motor))/.test(n)) xf = scale3(geo.eng, engScale());
    else if (battScale() !== 1 && /^powertrain__traction_battery/.test(n)) xf = scale3(geo.batt, battScale());
    m.userData.xf = xf;
    updateMesh(m);
  }
  deformChain(sf, sr);
  // pose
  const p = pose();
  const pv = new THREE.Vector3((geo.cR.x - geo.center.x) * 0.01, (geo.cR.y - geo.groundY) * 0.01, 0);
  rig.position.set(pv.x, pv.y + p.lift * 0.01, 0);
  rig.rotation.z = p.theta;
  inner.position.set(-pv.x, -pv.y, 0);
  // colours
  for (const m of meshes) {
    const u = m.userData, mat = u.real;
    if (!mat.color || !u.o.color) continue;
    const grp = colourGroup(m);
    const hex = grp ? cfg[grp] : null;
    if (hex) mat.color.set(hex); else mat.color.copy(u.o.color);
  }
  updateCompare();
  renderEffects();
  wake();
}
function colourGroup(m) {
  const n = m.name, mn = m.userData.matName;
  if (B.paint.includes(mn)) return 'body';
  if (B.frameNames.some((f) => n === f || n.startsWith(f + '__')) && !/chrome/.test(mn)) return 'frame';
  if (/^wheels__(front|rear)_wheel__(rim|cast_spokes)$/.test(n)) return 'wheel';
  return null;
}

function updateCompare() {
  const on = cfg.compare && isModified();
  if (on && !compareGroup) {
    compareGroup = new THREE.Group();
    for (const m of meshes) {
      if (chainMeshes.includes(m)) continue;
      const c = new THREE.Mesh(m.geometry, compareMat);
      c.matrixAutoUpdate = false; c.matrix.copy(m.userData.home); c.renderOrder = 3;
      compareGroup.add(c);
    }
    compareHolder.add(compareGroup);
  }
  if (compareGroup) compareGroup.visible = on;
  compareHolder.position.copy(holder.position); compareHolder.scale.copy(holder.scale);
}
function isModified() {
  return cfg.rimF !== B.rim.f || cfg.rimR !== B.rim.r || cfg.sprF !== B.sprF || cfg.sprR !== B.sprR || engScale() !== 1 || battScale() !== 1;
}


/* --------------------------------------------------------------------------
   Swap parts between bikes: load the donor bike, take its meshes for the slot,
   scale and place them in the box the original part filled.
   -------------------------------------------------------------------------- */
const SWAP = [
  { key: 'seat', label: 'Seat', comps: ['frame_body__seat'], fit: 'seat' },
  { key: 'tank', label: 'Tank', comps: ['frame_body__fuel_tank', 'frame_body__tank_cover'], fit: 'bottom' },
  { key: 'headlight', label: 'Headlight', comps: ['electrical__headlight'], fit: 'centre' },
  { key: 'instruments', label: 'Instruments', comps: ['electrical__instruments', 'electrical__tft_dash'], fit: 'centre' },
  { key: 'tail', label: 'Tail light', comps: ['electrical__tail_light'], fit: 'centre' },
  { key: 'front_wheel', label: 'Front wheel', comps: ['wheels__front_wheel'], fit: 'wheel' },
  { key: 'rear_wheel', label: 'Rear wheel', comps: ['wheels__rear_wheel'], fit: 'wheel' },
];
let swaps = {};            // slot key -> donor bike id
let swapStore = {};        // slot key -> { orig: [meshes], added: [meshes] }
const inSlot = (name, slot) => slot.comps.some((c) => name === c || name.startsWith(c + '__'));

async function donorMeshes(donorId, slot) {
  const g = await loader.loadAsync(MODELS + BIKES[donorId].file + '.glb');
  g.scene.updateMatrixWorld(true);
  const keep = [];
  g.scene.traverse((m) => {
    if (!m.isMesh) return;
    const nm = (m.parent && m.parent !== g.scene && m.parent.name) ? m.parent.name : m.name;
    if (inSlot(nm, slot)) { m.userData.donorName = nm; keep.push(m); }
  });
  g.scene.traverse((m) => { if (m.isMesh && !keep.includes(m)) { m.geometry.dispose(); m.material.dispose?.(); } });
  return keep;
}

async function applySwap(slotKey, donorId) {
  const slot = SWAP.find((s) => s.key === slotKey);
  const part = partsByKey[slotKey];
  if (!slot || !part) return;
  // put the original back first
  const st = swapStore[slotKey];
  if (st) {
    st.added.forEach((m) => { gltfRoot.remove(m); m.geometry.dispose(); m.userData.real.dispose(); meshes = meshes.filter((x) => x !== m); });
    st.orig.forEach((m) => { gltfRoot.add(m); meshes.push(m); });
    part.meshes = st.orig.slice();
    delete swapStore[slotKey];
  }
  delete swaps[slotKey];
  if (!donorId || donorId === bikeId) { applyCfg(); paintGhosts(); renderSwapUI(); return; }
  const token = loadToken;
  let donor;
  try { donor = await donorMeshes(donorId, slot); } catch (e) { note('Could not load that part.', true); return; }
  if (token !== loadToken || !donor.length) { if (!donor.length) note('That bike has no matching part.', true); renderSwapUI(); return; }
  const orig = part.meshes.slice();
  const ob = boxOf(orig), oc = ob.getCenter(new THREE.Vector3()), os = ob.getSize(new THREE.Vector3());
  const db = new THREE.Box3();
  donor.forEach((m) => { if (!m.geometry.boundingBox) m.geometry.computeBoundingBox(); db.union(m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld)); });
  const dc = db.getCenter(new THREE.Vector3()), ds = db.getSize(new THREE.Vector3());
  let s = slot.fit === 'wheel' ? os.y / ds.y : slot.fit === 'seat' ? os.x / ds.x : (os.x / ds.x + os.y / ds.y) / 2;
  s = Math.min(1.8, Math.max(0.5, s || 1));
  const target = oc.clone();
  if (slot.fit === 'seat' || slot.fit === 'bottom') target.y = ob.min.y + (ds.y * s) / 2;
  const place = new THREE.Matrix4().makeTranslation(target.x, target.y, target.z)
    .multiply(new THREE.Matrix4().makeScale(s, s, s))
    .multiply(new THREE.Matrix4().makeTranslation(-dc.x, -dc.y, -dc.z));
  const added = donor.map((m) => {
    const mat = m.material.clone(); m.material.dispose?.();
    if (mat.transmission) { mat.transmission = 0; mat.transparent = true; mat.opacity = Math.min(mat.opacity, 0.35); mat.depthWrite = false; }
    const n = new THREE.Mesh(m.geometry, mat);
    n.name = m.userData.donorName;
    const u = n.userData;
    u.real = mat; u.matName = mat.name || ''; u.part = slotKey; u.swapped = true;
    u.o = { opacity: mat.opacity, transparent: mat.transparent, depthWrite: mat.depthWrite, color: mat.color ? mat.color.clone() : null, emissive: mat.emissive ? mat.emissive.clone() : null, ei: mat.emissiveIntensity };
    u.home = place.clone().multiply(m.matrixWorld);
    n.matrixAutoUpdate = false; n.castShadow = true;
    return n;
  });
  orig.forEach((m) => { gltfRoot.remove(m); });
  meshes = meshes.filter((m) => !orig.includes(m)).concat(added);
  added.forEach((m) => { gltfRoot.add(m); if (isPlaced(slotKey)) setReal(m); });
  part.meshes = added;
  swapStore[slotKey] = { orig, added };
  swaps[slotKey] = donorId;
  applyCfg(); paintGhosts(); renderSwapUI();
  say(`<b>${slot.label} from the ${BIKES[donorId].name.toLowerCase()}</b> fitted. Scaled ${Math.round(s * 100)} % to fit.`);
}

function renderSwapUI() {
  const box = $('bb-swap');
  if (!box) return;
  const ids = Object.keys(BIKES);
  const short = { '4t': 'Roadster', '2t': 'MX', elec: 'Scrambler' };
  box.innerHTML = SWAP.filter((sl) => partsByKey[sl.key]).map((sl) => `<div class="bb-swap-row"><span>${sl.label}</span><div class="bb-seg">${ids.map((id) => {
    const on = (swaps[sl.key] || bikeId) === id;
    return `<button type="button" data-slot="${sl.key}" data-from="${id}" aria-pressed="${on}">${short[id]}${id === bikeId ? ' (own)' : ''}</button>`;
  }).join('')}</div></div>`).join('');
}
function setupSwapUI() {
  swaps = {}; swapStore = {};
  const box = $('bb-swap');
  if (box && !box.dataset.wired) {
    box.dataset.wired = '1';
    box.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-slot]'); if (!b) return;
      box.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      applySwap(b.dataset.slot, b.dataset.from).finally(() => renderSwapUI());
    });
  }
  renderSwapUI();
}

function setupConfigUI() {
  const elec = B.kind === 'elec';
  const rng = (id, min, max, val) => { const i = $(id); i.min = min; i.max = max; i.value = val; };
  rng('bb-wf', Math.max(14, B.rim.f - 4), B.rim.f + 3, cfg.rimF);
  rng('bb-wr', Math.max(14, B.rim.r - 4), B.rim.r + 3, cfg.rimR);
  rng('bb-sf', B.rangeF[0], B.rangeF[1], cfg.sprF);
  rng('bb-sr', B.rangeR[0], B.rangeR[1], cfg.sprR);
  $('bb-fd-t').textContent = elec ? 'Belt drive' : 'Final drive';
  $('bb-sf-l').textContent = elec ? 'Motor pulley' : 'Front sprocket';
  $('bb-sr-l').textContent = elec ? 'Rear pulley' : 'Rear sprocket';
  $('bb-fd-s').textContent = elec
    ? `Teeth on the motor pulley and the wheel pulley, after a fixed ${B.fixed}:1 gear reduction in the motor housing. Fewer front or more rear teeth: more pull, less top speed.`
    : `Teeth on the gearbox sprocket and the wheel sprocket (${B.drive}). Fewer front or more rear teeth means lower gearing: more pull, less top speed.`;
  $('bb-c-body-t').textContent = elec ? 'Tank cover and bodywork' : 'Tank and bodywork';
  swatches('bb-c-body', 'body'); swatches('bb-c-frame', 'frame'); swatches('bb-c-wheel', 'wheel');
  setupEngineUI();
  $('bb-compare').checked = !!cfg.compare;
  syncOutputs();
}
function setupEngineUI() {
  const el = $('bb-eng');
  const elec = B.kind === 'elec';
  const ctl = (id, label, min, max, step, val) => `<div class="bb-ctl"><label for="${id}">${label}</label><output id="${id}-o"></output><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"></div>`;
  if (elec) {
    el.innerHTML = `<h2>Motor and battery</h2><p class="bb-small">A stronger motor pulls harder and reaches a higher speed before drag wins. A bigger battery goes further but weighs about 6.5 kg per kWh.</p>
      ${ctl('bb-kw', 'Motor peak power', 5, 40, 1, cfg.kw)}${ctl('bb-kwh', 'Battery capacity', 3, 15, 0.5, cfg.kwh)}`;
  } else {
    el.innerHTML = `<h2>Engine size</h2><p class="bb-small">Displacement is bore area times stroke. More cubic centimetres give more torque; a longer stroke lowers the safe redline.</p>
      <div class="bb-presets" id="bb-pre" role="group" aria-label="Displacement presets">${B.presets.map(([cc, b, st]) => `<button type="button" data-b="${b}" data-s="${st}">${cc} cc</button>`).join('')}</div>
      ${ctl('bb-bore', 'Bore', 50, 90, 0.5, cfg.bore)}${ctl('bb-stroke', 'Stroke', 45, 80, 0.5, cfg.stroke)}${ctl('bb-cr', 'Compression ratio', B.crRange[0], B.crRange[1], 0.1, cfg.cr)}
      <a class="bb-link" id="bb-ov" href="#">Open this engine in the Overview</a>`;
    el.querySelectorAll('#bb-pre button').forEach((b) => b.addEventListener('click', () => {
      cfg.bore = +b.dataset.b; cfg.stroke = +b.dataset.s; $('bb-bore').value = cfg.bore; $('bb-stroke').value = cfg.stroke; userChange();
    }));
  }
  el.querySelectorAll('input[type=range]').forEach((i) => i.addEventListener('input', () => {
    const k = { 'bb-kw': 'kw', 'bb-kwh': 'kwh', 'bb-bore': 'bore', 'bb-stroke': 'stroke', 'bb-cr': 'cr' }[i.id];
    cfg[k] = +i.value; userChange();
  }));
}
function syncEngine() {
  if (!cfg) return;
  if (B.kind === 'elec') {
    if (!$('bb-kw')) return;
    $('bb-kw-o').innerHTML = `${cfg.kw} kW${cfg.kw === B.kw ? ' <small>stock</small>' : ''}`;
    $('bb-kwh-o').innerHTML = `${fmt(cfg.kwh, 1)} kWh${cfg.kwh === B.kwh ? ' <small>stock</small>' : ''}`;
    return;
  }
  if (!$('bb-bore')) return;
  const cc = ccOf(cfg.bore, cfg.stroke);
  $('bb-bore-o').innerHTML = `${fmt(cfg.bore, 1)} mm${cfg.bore === B.bore ? ' <small>stock</small>' : ''}`;
  $('bb-stroke-o').innerHTML = `${fmt(cfg.stroke, 1)} mm <small>${fmt(cc)} cc</small>`;
  $('bb-cr-o').innerHTML = `${fmt(cfg.cr, 1)} : 1${cfg.cr === B.cr ? ' <small>stock</small>' : ''}`;
  $('bb-pre').querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.b === cfg.bore && +b.dataset.s === cfg.stroke)));
  $('bb-ov').href = `../overview/?mode=${bikeId}&part=engine&bore=${cfg.bore}&stroke=${cfg.stroke}&cr=${cfg.cr}`;
}
let recorded = false;
function userChange() {
  syncOutputs(); applyCfg();
  if (!recorded) { recorded = true; try { PG.recordTool('builder', { configured: true }); } catch (e) { /* storage unavailable */ } }
}
function swatches(id, grp) {
  const el = $(id); el.innerHTML = '';
  const mk = (hex, label) => {
    const b = document.createElement('button'); b.type = 'button';
    if (hex) b.style.background = hex; else { b.className = 'is-stock'; b.textContent = ''; }
    b.title = label; b.setAttribute('aria-label', label);
    b.setAttribute('aria-pressed', String((cfg[grp] || null) === hex));
    b.addEventListener('click', () => { cfg[grp] = hex; userChange(); swatches(id, grp); });
    el.appendChild(b);
  };
  mk(null, 'Stock colour');
  SW[grp].forEach((h) => mk(h, 'Colour ' + h));
  const inp = document.createElement('input'); inp.type = 'color'; inp.title = 'Choose any colour'; inp.setAttribute('aria-label', 'Choose any colour');
  inp.value = cfg[grp] || '#888888';
  inp.addEventListener('input', () => { cfg[grp] = inp.value; userChange(); [...el.querySelectorAll('button')].forEach((b) => b.setAttribute('aria-pressed', 'false')); });
  el.appendChild(inp);
}
function syncOutputs() {
  const elec = B.kind === 'elec';
  const dia = (rim, which) => { const w = wheelScale(which); return Math.round(w.Rn * 2 * 10); };
  $('bb-wf-o').innerHTML = `${cfg.rimF} in <small>${dia(cfg.rimF, 'f')} mm tyre${cfg.rimF === B.rim.f ? ', stock' : ''}</small>`;
  $('bb-wr-o').innerHTML = `${cfg.rimR} in <small>${dia(cfg.rimR, 'r')} mm tyre${cfg.rimR === B.rim.r ? ', stock' : ''}</small>`;
  $('bb-sf-o').innerHTML = `${cfg.sprF} T${cfg.sprF === B.sprF ? ' <small>stock</small>' : ''}`;
  $('bb-sr-o').innerHTML = `${cfg.sprR} T${cfg.sprR === B.sprR ? ' <small>stock</small>' : ''}`;
  void elec;
  syncEngine();
}
[['bb-wf', 'rimF'], ['bb-wr', 'rimR'], ['bb-sf', 'sprF'], ['bb-sr', 'sprR']].forEach(([id, k]) => {
  $(id).addEventListener('input', (e) => { cfg[k] = +e.target.value; userChange(); });
});
$('bb-compare').addEventListener('change', (e) => { cfg.compare = e.target.checked; applyCfg(); });
$('bb-stock').addEventListener('click', async () => { const cmp = cfg.compare; cfg = stockCfg(); cfg.compare = cmp; for (const k of Object.keys(swaps)) await applySwap(k, null); setupConfigUI(); applyCfg(); syncOutputs(); });

/* Tabs */
/* Configure: click a part on the bike to jump to its options (swap or colour) */
const _ray = new THREE.Raycaster(), _ndc = new THREE.Vector2();
let _down = null;
canvas.addEventListener('pointerdown', (e) => { _down = [e.clientX, e.clientY]; });
canvas.addEventListener('pointerup', (e) => {
  if (!_down || Math.hypot(e.clientX - _down[0], e.clientY - _down[1]) > 6) return;
  if ($('bb-pc').hidden) return;
  const r = canvas.getBoundingClientRect();
  _ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  _ray.setFromCamera(_ndc, camera);
  const hit = _ray.intersectObjects(meshes.filter((m) => m.visible), false)[0];
  if (!hit) return;
  const m = hit.object, key = m.userData.part, grp = colourGroup(m);
  let target = document.querySelector(`#bb-swap button[data-slot="${key}"]`)?.closest('.bb-swap-row');
  if (!target && grp) target = $({ body: 'bb-c-body', frame: 'bb-c-frame', wheel: 'bb-c-wheel' }[grp]);
  if (!target) target = $('bb-colours');
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target.classList.remove('bb-flash'); void target.offsetWidth; target.classList.add('bb-flash');
  const part = partsByKey[key];
  note(`<b>${part ? part.label : 'Part'}</b> selected: its options are highlighted on the right.`);
});

function setTab(t) {
  const a = t === 'a';
  $('bb-tab-a').setAttribute('aria-selected', String(a)); $('bb-tab-c').setAttribute('aria-selected', String(!a));
  $('bb-pa').hidden = !a; $('bb-pc').hidden = a;
}
$('bb-tab-a').addEventListener('click', () => setTab('a'));
$('bb-tab-c').addEventListener('click', () => setTab('c'));
document.querySelector('.bb-tabs').addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  const to = $('bb-tab-a').getAttribute('aria-selected') === 'true' ? 'c' : 'a';
  setTab(to); $(to === 'a' ? 'bb-tab-a' : 'bb-tab-c').focus();
});

/* --------------------------------------------------------------------------
   Physics: gearing, top speed, thrust, speedometer, geometry
   -------------------------------------------------------------------------- */
const ccOf = (bore, stroke) => Math.PI / 4 * bore * bore * stroke / 1000;
function engineOf(c) {
  if (B.kind === 'elec') {
    const pmot = c.kw * 1000, tmot = B.tmot * c.kw / B.kw;
    return { elec: true, pmot, tmot, tpk: tmot, maxRpm: B.motorMax, mass: B.mass + (c.kwh - B.kwh) * 6.5 + (c.kw - B.kw) * 0.3, kwh: c.kwh, kw: c.kw };
  }
  const cc = ccOf(c.bore, c.stroke), cc0 = ccOf(B.bore, B.stroke);
  const crf = (1 - Math.pow(c.cr, -0.3)) / (1 - Math.pow(B.cr, -0.3));      // Otto efficiency relative to stock
  const tpk = B.bmep * cc * 1e-6 / (B.strokes === 4 ? 4 * Math.PI : 2 * Math.PI) * crf;
  const rs = Math.min(1.12, Math.max(0.82, B.stroke / c.stroke));             // same mean piston speed at the redline
  return { elec: false, cc, tpk, crf, rpk: B.rpk * rs, maxRpm: Math.round(B.redline * rs / 100) * 100, mass: B.mass + (cc - cc0) * 0.08, eta: B.eta * crf };
}
function engineT(rpm, e) {
  if (e.elec) { const w = rpm * Math.PI / 30; return Math.min(e.tmot, w > 0 ? e.pmot / w : e.tmot); }
  const x = (rpm - e.rpk) / e.rpk;
  return Math.max(e.tpk * 0.25, e.tpk * (1 - B.tk * x * x));
}
function analyse(c) {
  const sR = wheelScale('r', c).s, sF = wheelScale('f', c).s;
  const circ = B.circ * sR, rw = circ / (2 * Math.PI);
  const fd = c.sprR / c.sprF;
  const elec = B.kind === 'elec';
  const ratios = elec ? [B.fixed * fd] : B.gears.map((g) => g * B.primary * fd);
  const e = engineOf(c);
  const maxRpm = e.maxRpm;
  const eff = elec ? 0.95 : 0.9;
  const m = e.mass + RIDER;
  const res = (vk) => { const v = vk / 3.6; return 0.5 * RHO * B.cda * v * v + CRR * m * G; };
  const top = ratios[ratios.length - 1];
  const kmhPerRpm = (ratio) => circ * 60 / 1000 / ratio; // km/h per (rev/min)
  const vRedline = maxRpm * kmhPerRpm(top);
  const minRpm = elec ? 0 : 2000;
  const force = (vk) => {
    let best = 0, gi = -1;
    ratios.forEach((ratio, i) => {
      let rpm = vk / kmhPerRpm(ratio);
      if (rpm > maxRpm) return;
      rpm = Math.max(rpm, minRpm);
      const F = engineT(rpm, e) * ratio * eff / rw;
      if (F > best) { best = F; gi = i; }
    });
    return { F: best, gi };
  };
  let vTop = 0;
  for (let vk = 1; vk < 260; vk += 0.25) { if (force(vk).F >= res(vk)) vTop = vk; else break; }
  const rpmAtTop = vTop / kmhPerRpm(top);
  const limited = vTop < vRedline - 1 ? 'power' : 'rpm';
  const thrust1 = e.tpk * ratios[0] * eff / rw;
  // peak power
  let pPk = 0, pRpm = 0;
  for (let r = 1000; r <= maxRpm; r += 50) { const pw = engineT(r, e) * r * Math.PI / 30; if (pw > pPk) { pPk = pw; pRpm = r; } }
  // 0-100 km/h: full throttle, ideal shifts, grip and wheelie limit 0.8 g, 10 % rotating mass
  const accel = (target) => {
    let v = 0, t = 0; const dt = 0.02;
    while (v < target / 3.6 && t < 60) {
      const F = Math.min(force(v * 3.6).F, 0.8 * m * G);
      const acc = (F - res(v * 3.6)) / (m * 1.1);
      if (acc <= 0.02) return null;
      v += acc * dt; t += dt;
    }
    return t < 60 ? t + (elec ? 0 : 0.4) : null;
  };
  const t100 = accel(100), t60 = accel(60);
  // steady cruise at 80 km/h (or 90 % of top speed if slower)
  const vc = Math.min(80, vTop * 0.9), Pc = res(vc) * vc / 3.6;
  let use = null, range = null;
  if (elec) { const whkm = (Pc / 0.85 + 150) / vc; use = whkm; range = e.kwh * 1000 * 0.9 / whkm; }
  else { const load = Math.min(1, Pc / pPk); const eta = e.eta * (0.35 + 0.65 * load); use = (Pc / eta) * (1 / (vc / 3.6)) * 1000 * 100 / 32e6; }
  // speedometer: front-wheel sensor (stock calibration), or motor speed on the electric bike
  let speedo;
  if (B.speedo === 'front') speedo = 1 / sF;
  else { const stockRatio = B.fixed * (B.sprR / B.sprF); speedo = (ratios[0] / stockRatio) * (1 / sR); }
  // geometry
  const p = pose(c), M = poseMatrix(p);
  const seat = geo.seatPt.clone().applyMatrix4(M).y - geo.groundY;
  let clear = Infinity; for (const q of geo.low) clear = Math.min(clear, q.clone().applyMatrix4(M).y - geo.groundY);
  const rake = B.rake + THREE.MathUtils.radToDeg(p.theta);
  const rfStock = geo.RF / 100, rf = p.f.Rn / 100;
  const off = rfStock * Math.sin(THREE.MathUtils.degToRad(B.rake)) - (B.trail / 1000) * Math.cos(THREE.MathUtils.degToRad(B.rake));
  const trail = (rf * Math.sin(THREE.MathUtils.degToRad(rake)) - off) / Math.cos(THREE.MathUtils.degToRad(rake)) * 1000;
  return { e, m, pPk, pRpm, t100, t60, vc, use, range, circ, rw, fd, ratios, top, maxRpm, kmh1000: 1000 * kmhPerRpm(top), vRedline, vTop, rpmAtTop, limited, thrust1, speedo,
    seat: seat * 10, clear: clear * 10, rake, trail, theta: p.theta, kmhPerRpm, eff, res, minRpm };
}

/* --------------------------------------------------------------------------
   Effects panel and chart
   -------------------------------------------------------------------------- */
const fmt = (v, d = 0) => v.toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d });
function delta(now, stock, d, unit, goodUp, eps) {
  const x = now - stock;
  if (Math.abs(x) < (eps != null ? eps : Math.pow(10, -d) / 2)) return ['same', 'Same as stock'];
  const s = (x > 0 ? '+' : '−') + fmt(Math.abs(x), d) + (unit || '');
  return [goodUp == null ? 'same' : ((x > 0) === goodUp ? 'up' : 'down'), s + ' vs stock'];
}
function renderEffects() {
  if (!cfg || !geo) return;
  const a = analyse(cfg), s = analyse(stockCfg());
  const elec = B.kind === 'elec';
  const thrIdx = a.thrust1 / s.thrust1 * 100;
  const spErr = (a.speedo - 1) * 100;
  const tiles = [];
  const kw = (w) => fmt(w / 1000, 1);
  const p2w = (an) => an.pPk / 1000 / an.m * 1000; // kW per tonne, bike plus rider
  const tt = (t) => (t == null ? 'n/a' : fmt(t, 1));
  if (elec) {
    tiles.push({ l: 'Motor', v: `${kw(a.pPk)}<small> kW · ${fmt(a.e.tmot)} N m</small>`, d: delta(a.pPk / 1000, s.pPk / 1000, 1, ' kW', true),
      e: `Full torque from standstill up to ${fmt(Math.round(a.e.pmot / a.e.tmot * 30 / Math.PI / 50) * 50)} r/min, then constant power to ${fmt(B.motorMax)} r/min.` });
    tiles.push({ l: 'Range at a steady ' + fmt(a.vc) + ' km/h', v: `${fmt(a.range)}<small> km · ${fmt(a.use)} Wh/km</small>`, d: delta(a.range, s.range, 0, ' km', true),
      e: `${fmt(cfg.kwh, 1)} kWh battery, 90 % usable. Faster riding uses much more: drag grows with the square of speed.` });
  } else {
    tiles.push({ l: 'Displacement', v: `${fmt(a.e.cc)}<small> cc</small>`, d: delta(a.e.cc, s.e.cc, 0, ' cc', null),
      e: `π/4 × ${fmt(cfg.bore, 1)}² × ${fmt(cfg.stroke, 1)} mm. ${B.strokes === 4 ? 'Four-stroke' : 'Two-stroke'}, compression ${fmt(cfg.cr, 1)}:1.` });
    tiles.push({ l: 'Peak torque and power', v: `${fmt(a.e.tpk, 1)}<small> N m · ${kw(a.pPk)} kW</small>`, d: delta(a.pPk / 1000, s.pPk / 1000, 1, ' kW', true),
      e: `Torque = BMEP × volume ÷ ${B.strokes === 4 ? '4π' : '2π'} with BMEP ${B.bmep / 1e5} bar. Peak power at ${fmt(a.pRpm)} r/min, redline ${fmt(a.maxRpm)} r/min.` });
  }
  tiles.push({ l: 'Power to weight', v: `${fmt(p2w(a))}<small> kW per tonne</small>`, d: delta(p2w(a), p2w(s), 0, '', true),
    e: `${fmt(a.m)} kg with a ${RIDER} kg rider. This number decides acceleration more than anything else.` });
  tiles.push({ l: '0 to 100 km/h', v: a.t100 == null ? `n/a<small> · 0 to 60 in ${tt(a.t60)} s</small>` : `${tt(a.t100)}<small> s · 0 to 60 in ${tt(a.t60)} s</small>`,
    d: a.t100 == null || s.t100 == null ? ['same', a.t100 == null ? 'Does not reach 100 km/h' : 'Stock does not reach 100 km/h'] : delta(a.t100, s.t100, 1, ' s', false),
    e: 'Full throttle, perfect gear changes, limited by grip and wheelies at 0.8 g.' });
  if (!elec) tiles.push({ l: `Fuel use at ${fmt(a.vc)} km/h`, v: `${fmt(a.use, 1)}<small> l/100 km</small>`, d: delta(a.use, s.use, 1, ' l', false),
    e: 'A big engine loafing along wastes more fuel than a small one working hard; higher compression helps a little.' });
  if (elec) {
    tiles.push({ l: 'Motor reduction', v: `${fmt(a.top, 2)}<small> : 1</small>`, d: delta(a.top, s.top, 2, '', null),
      e: `Fixed ${B.fixed}:1 gears × belt ${cfg.sprR}/${cfg.sprF} (${fmt(a.fd, 2)}:1). The motor turns ${fmt(a.top, 1)} times for each turn of the wheel.` });
    tiles.push({ l: 'Speed per 1000 motor r/min', v: `${fmt(a.kmh1000, 1)}<small> km/h</small>`, d: delta(a.kmh1000, s.kmh1000, 1, ' km/h', null),
      e: `Rolling circumference ${fmt(a.circ, 2)} m. A taller ratio or bigger rear tyre covers more road per motor turn.` });
  } else {
    tiles.push({ l: 'Final drive ratio', v: `${fmt(a.fd, 2)}<small> : 1</small>`, d: delta(a.fd, s.fd, 2, '', null),
      e: `${cfg.sprR} ÷ ${cfg.sprF} teeth. The gearbox sprocket turns ${fmt(a.fd, 2)} times for each turn of the rear wheel.` });
    tiles.push({ l: 'Overall ratio in top gear', v: `${fmt(a.top, 2)}<small> : 1</small>`, d: delta(a.top, s.top, 2, '', null),
      e: `Primary ${B.primary} × top gear ${B.gears[B.gears.length - 1]} × final ${fmt(a.fd, 2)}: crankshaft turns per wheel turn.` });
    tiles.push({ l: 'Road speed per 1000 r/min (top)', v: `${fmt(a.kmh1000, 1)}<small> km/h</small>`, d: delta(a.kmh1000, s.kmh1000, 1, ' km/h', null),
      e: `Rolling circumference ${fmt(a.circ, 2)} m. Higher gearing means lower revs at a given speed.` });
  }
  const capTxt = a.limited === 'power'
    ? `Drag limits it to about ${fmt(a.vTop)} km/h before the ${elec ? 'motor reaches' : 'engine reaches'} ${fmt(a.maxRpm)} r/min (it is doing ${fmt(Math.round(a.rpmAtTop / 50) * 50)} r/min there): power-limited.${!elec ? ' Lower gearing would use more of the power band.' : ''}`
    : `The ${elec ? 'motor' : 'engine'} hits ${fmt(a.maxRpm)} r/min at ${fmt(a.vRedline)} km/h with power to spare: rev-limited. Taller gearing would let it go faster.`;
  tiles.push({ l: `Top speed at ${elec ? 'max motor speed' : 'redline'}`, v: `${fmt(a.vRedline)}<small> km/h</small>`, d: delta(a.vRedline, s.vRedline, 0, ' km/h', null), e: `Road speed with the ${elec ? 'motor at' : 'engine at'} ${fmt(a.maxRpm)} r/min${elec ? '' : ' in top gear'}. The bike only gets there if it has the power to beat the drag.` });
  tiles.push({ l: 'Likely top speed', v: `${fmt(a.vTop)}<small> km/h</small>`, d: delta(a.vTop, s.vTop, 0, ' km/h', true, 0.6), e: capTxt });
  tiles.push({ l: elec ? 'Wheel thrust at launch' : 'Wheel thrust in 1st gear', v: `${fmt(a.thrust1)}<small> N · index ${fmt(thrIdx)}</small>`, d: delta(thrIdx, 100, 0, '', true),
    e: `Peak ${elec ? 'motor' : 'engine'} torque × ${elec ? 'reduction' : 'overall 1st-gear ratio'} ÷ wheel radius. More thrust means harder acceleration, which is what lower gearing buys.` });
  tiles.push({ l: elec ? 'Speed reading error (motor sensor)' : 'Speedometer error (front wheel)', v: `${spErr >= 0 ? '+' : '−'}${fmt(Math.abs(spErr), 1)}<small> %</small>`,
    d: Math.abs(spErr) < 0.05 ? ['same', 'Calibrated'] : ['down', spErr > 0 ? 'Reads high' : 'Reads low'],
    e: elec ? 'The display works out speed from motor revs and the stock gearing and tyre, so a new pulley or rear wheel size throws it off.' : `The speed is measured at the front wheel and calibrated for the stock ${B.rim.f} in wheel. A bigger wheel turns slower, so it reads low.` });
  tiles.push({ l: 'Seat height', v: `${fmt(a.seat)}<small> mm</small>`, d: delta(a.seat, s.seat, 0, ' mm', null),
    e: 'Bigger wheels lift the whole bike. Taller is harder to reach the ground from.' });
  tiles.push({ l: 'Ground clearance', v: `${fmt(a.clear)}<small> mm</small>`, d: delta(a.clear, s.clear, 0, ' mm', true),
    e: 'Lowest point of the engine, exhaust or bodywork above the road.' });
  tiles.push({ l: 'Steering rake and trail', v: `${fmt(a.rake, 1)}°<small> · ${fmt(a.trail)} mm</small>`, d: delta(a.rake, s.rake, 1, '°', null),
    e: 'A higher front or a lower rear tips the fork back: more rake and trail, steadier but slower steering. The opposite quickens it.' });
  $('bb-tiles').innerHTML = tiles.map((t) => `<div class="bb-tile"><div class="l">${t.l}</div><div class="v">${t.v}</div><div class="d ${t.d[0]}">${t.d[1]}</div>${t.e ? `<div class="e">${t.e}</div>` : ''}</div>`).join('');
  $('bb-fx-sub').textContent = `${B.name}: ${elec ? `${cfg.kw} kW motor, ${fmt(cfg.kwh, 1)} kWh battery` : `${fmt(a.e.cc)} cc, ${B.gears.length}-speed gearbox, redline ${fmt(a.maxRpm)} r/min`}. Teaching approximations.`;
  drawChart(a, s);
}

const GEAR_COL = ['#7A2E16', '#A33D1E', '#C8502A', '#D9764F', '#E59B78', '#EDBBA2'];
function drawChart(a, s) {
  const svg = $('bb-chart');
  const W = 640, H = 260, L = 52, Rm = 14, T = 12, Bm = 36;
  const elec = B.kind === 'elec';
  const vMax = Math.ceil(Math.max(a.vRedline, s.vRedline, a.vTop) * 1.08 / 20) * 20;
  const curves = (an) => an.ratios.map((ratio) => {
    const pts = [];
    const rpm0 = elec ? 0 : an.minRpm;
    for (let i = 0; i <= 60; i++) {
      const rpm = rpm0 + (an.maxRpm - rpm0) * i / 60;
      const v = rpm * an.kmhPerRpm(ratio);
      pts.push([v, engineT(rpm, an.e) * ratio * an.eff]);
    }
    return pts;
  });
  const ca = curves(a), cs = curves(s);
  const tMax = Math.ceil(Math.max(...ca.flat().map((p) => p[1]), ...(cfg.compare ? cs.flat().map((p) => p[1]) : [0])) * 1.1 / 50) * 50;
  const x = (v) => L + (v / vMax) * (W - L - Rm);
  const y = (t) => T + (1 - t / tMax) * (H - T - Bm);
  const path = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + x(p[0]).toFixed(1) + ' ' + y(Math.min(p[1], tMax)).toFixed(1)).join(' ');
  let g = '';
  const stepT = tMax > 600 ? 200 : tMax > 300 ? 100 : 50;
  for (let t = 0; t <= tMax; t += stepT) g += `<line x1="${L}" x2="${W - Rm}" y1="${y(t)}" y2="${y(t)}" stroke="#EBEBEB"/><text x="${L - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#6B6B6B">${t}</text>`;
  for (let v = 0; v <= vMax; v += 20) g += `<line x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - Bm}" stroke="#F3F3F3"/><text x="${x(v)}" y="${H - Bm + 16}" text-anchor="middle" font-size="11" fill="#6B6B6B">${v}</text>`;
  g += `<text x="${W - Rm}" y="${H - 4}" text-anchor="end" font-size="11.5" fill="#444444">Road speed, km/h</text>`;
  g += `<text x="12" y="${T + (H - T - Bm) / 2}" font-size="11.5" fill="#444444" transform="rotate(-90 12 ${T + (H - T - Bm) / 2})" text-anchor="middle">Wheel torque, N m</text>`;
  // resistance as wheel torque
  const rp = []; for (let v = 0; v <= vMax; v += 2) rp.push([v, a.res(v) * a.rw]);
  g += `<path d="${path(rp)}" fill="none" stroke="#9A9A9A" stroke-width="2" stroke-dasharray="1 0"/>`;
  if (cfg.compare) cs.forEach((pts) => { g += `<path d="${path(pts)}" fill="none" stroke="#9A9A9A" stroke-width="1.5" stroke-dasharray="5 4"/>`; });
  ca.forEach((pts, i) => { g += `<path d="${path(pts)}" fill="none" stroke="${elec ? '#C8502A' : GEAR_COL[i]}" stroke-width="2.4" stroke-linejoin="round"/>`; });
  ca.forEach((pts, i) => {
    const pk = pts.reduce((m, p) => (p[1] > m[1] ? p : m), pts[0]);
    if (!elec) g += `<text x="${x(pk[0])}" y="${y(Math.min(pk[1], tMax)) - 6}" font-size="11" font-weight="600" text-anchor="middle" fill="${GEAR_COL[i]}">${i + 1}</text>`;
  });
  // top speed marker
  g += `<line x1="${x(a.vTop)}" x2="${x(a.vTop)}" y1="${T}" y2="${H - Bm}" stroke="#111" stroke-width="1" stroke-dasharray="3 3"/>`;
  g += `<text x="${Math.min(x(a.vTop) - 4, W - Rm - 4)}" y="${T + 12}" text-anchor="end" font-size="11.5" font-weight="600" fill="#111">${fmt(a.vTop)} km/h</text>`;
  g += `<line x1="${L}" x2="${W - Rm}" y1="${H - Bm}" y2="${H - Bm}" stroke="#111"/>`;
  svg.innerHTML = g;
  $('bb-chart-s').textContent = elec
    ? 'Torque at the rear wheel: flat while the motor is torque-limited, then falling as it reaches its power limit. Where it meets the grey resistance line, the bike cannot go faster.'
    : 'Torque at the rear wheel in each gear (numbered). Where the top-gear curve meets the grey resistance line, or the curve ends at the redline, is the top speed.';
  $('bb-legend').innerHTML = `<span><i style="border-color:#C8502A"></i>${elec ? 'Wheel torque' : 'Wheel torque per gear'}</span><span><i style="border-color:#9A9A9A"></i>Rolling and air resistance</span>${cfg.compare ? '<span><i style="border-color:#9A9A9A;border-top-style:dashed"></i>Stock gearing and wheels</span>' : ''}`;
}

/* --------------------------------------------------------------------------
   Bike chooser
   -------------------------------------------------------------------------- */
function renderBikeButtons() {
  const el = $('bb-bikes');
  if (!el.children.length) {
    Object.entries(BIKES).forEach(([id, b]) => {
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'bb-bike'; btn.dataset.id = id;
      btn.setAttribute('role', 'radio');
      btn.innerHTML = `<img src="${RENDERS}${b.file}_side.webp" alt=""><div><b>${b.name}</b><span>${b.sub}</span></div>`;
      btn.addEventListener('click', () => { if (id !== bikeId || !gltfRoot) { setTab('a'); loadBike(id); } });
      el.appendChild(btn);
    });
  }
  [...el.children].forEach((b) => b.setAttribute('aria-checked', String(b.dataset.id === bikeId)));
}

/* Test and debugging hook */
function debugState() {
  return {
    bike: bikeId, steps: steps.map((s) => ({ id: s.id, parts: s.parts.map((p) => p.key) })),
    total: meshes.length, assigned: meshes.filter((m) => m.userData.part && partsByKey[m.userData.part]).length,
    placed: placed.slice(), current: currentStep() ? currentStep().id : null,
    realVisible: meshes.filter((m) => m.material === m.userData.real && m.visible).length,
    renders: () => renderer.info.render, memory: () => ({ ...renderer.info.memory }),
    homeOk: () => { const bad = meshes.filter((m) => m.userData.anim || !m.visible || (!m.userData.xf && !m.matrix.equals(m.userData.home))).map((m) => m.name); return bad.length ? bad : true; },
    idle: () => raf === 0 && !anims.length, cfg: () => ({ ...cfg }), renderMs: () => lastRenderMs, gl: { renderer, scene, camera, key }, analyse: () => analyse(cfg),
  };
}

if (!(() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } })()) {
  statusEl.textContent = 'This builder needs WebGL, which this browser does not offer.';
} else {
  const want = new URLSearchParams(location.search).get('bike');
  loadBike(BIKES[want] ? want : '4t');
}
