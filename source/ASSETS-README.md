# Motopedia: website asset package

Every file for the Transitions Lab motorcycle anatomy pages, grouped by category. Text, illustrations, 3D models and renders are CC BY-SA 4.0 (Transitions Lab); photographs from the Transitions Lab collection are excluded from that licence.

**Folders.** `pdf/` course modules · `pages/` download-page Markdown · `illustrations/<category>/` SVG plates (layered files carry `data-part` and `data-category` on each component group; `png/` holds previews) · `models/<category>/` GLB files for three.js, `models-compressed/` the same files with meshopt compression (about a quarter of the size; load with three.js GLTFLoader plus MeshoptDecoder, as in `interactive/viewer.html`) (object names follow `<category>__<component>` on bikes and `<part>__<subpart>` on parts, so click-to-highlight can match by name) · `renders/<category>/` transparent PNG renders of the same models · `interactive/` the controls simulator · `brand/` logo · `source/3d/` the Blender scripts that generate every model.

## Bikes

| Type | File | Description |
|---|---|---|
| GLB | `models/bikes/bike_classic_4t.glb` | Classic air-cooled four-stroke roadster |
| PNG | `renders/bikes/bike_classic_4t_side.png` | Classic air-cooled four-stroke roadster |
| PNG | `renders/bikes/bike_classic_4t_threeq.png` | Classic air-cooled four-stroke roadster |
| GLB | `models/bikes/bike_electric.glb` | Electric scrambler |
| PNG | `renders/bikes/bike_electric_side.png` | Electric scrambler |
| PNG | `renders/bikes/bike_electric_threeq.png` | Electric scrambler |
| GLB | `models/bikes/bike_mx_2t.glb` | Two-stroke motocross bike |
| PNG | `renders/bikes/bike_mx_2t_side.png` | Two-stroke motocross bike |
| PNG | `renders/bikes/bike_mx_2t_threeq.png` | Two-stroke motocross bike |

## Overview

| Type | File | Description |
|---|---|---|
| SVG | `illustrations/overview/F01.svg` | F01 Four-stroke standard road motorcycle, left side elevation, with principal parts labelled |
| SVG | `illustrations/overview/F02.svg` | F02 Two-stroke motocross motorcycle, right side elevation |
| SVG | `illustrations/overview/F03.svg` | F03 Electric motorcycle, left side elevation with battery pack cut away |
| SVG | `illustrations/overview/F04.svg` | F04 Automatic scooter, side elevation with the CVT cover cut away |
| SVG | `illustrations/overview/F06.svg` | F06 Exploded diagram of the four-stroke standard road motorcycle with numbered assemblies 1 to 30 and parts list |
| SVG | `illustrations/overview/F01-clean.svg` | F01 Four-stroke standard road motorcycle, left side elevation, unlabelled background |
| SVG | `illustrations/overview/F01-layered.svg` | F01 Four-stroke standard road motorcycle, left side elevation, layered by part and category |
| SVG | `illustrations/overview/F02-clean.svg` | F02 Two-stroke motocross motorcycle, right side elevation (unlabelled) |
| SVG | `illustrations/overview/F02-layered.svg` | F02 Two-stroke motocross motorcycle, right side elevation |
| SVG | `illustrations/overview/F03-clean.svg` | F03 Electric motorcycle, left side elevation with battery pack cut away (unlabelled) |
| SVG | `illustrations/overview/F03-layered.svg` | F03 Electric motorcycle, left side elevation with battery pack cut away |
| SVG | `illustrations/overview/F04-clean.svg` | F04 Automatic scooter, side elevation with the CVT cover cut away (unlabelled) |
| SVG | `illustrations/overview/F04-layered.svg` | F04 Automatic scooter, side elevation with the CVT cover cut away |
| SVG | `illustrations/overview/F06-layered.svg` | F06 Exploded diagram of the four-stroke standard road motorcycle, layered by part and category |

## Powertrain

| Type | File | Description |
|---|---|---|
| SVG | `illustrations/powertrain/F07.svg` | Four-stroke cycle |
| SVG | `illustrations/powertrain/F08.svg` | Two-stroke cycle |
| SVG | `illustrations/powertrain/F09.svg` | Single-cylinder four-stroke engine, sectional view |
| SVG | `illustrations/powertrain/F10.svg` | Valvetrain and valve clearance |
| SVG | `illustrations/powertrain/F11.svg` | Wet-sump lubrication circuit |
| SVG | `illustrations/powertrain/F12.svg` | F12 Electronic fuel injection system of a single-cylinder motorcycle engine |
| SVG | `illustrations/powertrain/PT01.svg` | Slide carburettor in section |
| SVG | `illustrations/powertrain/PT02.svg` | Exhaust systems in section |
| SVG | `illustrations/powertrain/PT03.svg` | Two-stroke cylinder ports |
| GLB | `models/powertrain/air_filter.glb` | Pleated panel air filter in airbox |
| PNG | `renders/powertrain/air_filter.png` | Pleated panel air filter in airbox |
| GLB | `models/powertrain/carb.glb` | Slide carburettor (half section) |
| PNG | `renders/powertrain/carb.png` | Slide carburettor (half section) |
| GLB | `models/powertrain/conrod.glb` | Connecting rod |
| PNG | `renders/powertrain/conrod.png` | Connecting rod |
| GLB | `models/powertrain/crankshaft.glb` | Four-cylinder crankshaft |
| PNG | `renders/powertrain/crankshaft.png` | Four-cylinder crankshaft |
| PNG | `renders/powertrain/crankshaft_single.png` | Four-cylinder crankshaft |
| GLB | `models/powertrain/crankshaft_single.glb` | Single-cylinder built-up crankshaft |
| PNG | `renders/powertrain/crankshaft_single.png` | Single-cylinder built-up crankshaft |
| GLB | `models/powertrain/cylinder.glb` | Cylinder and head (quarter cutaway) |
| PNG | `renders/powertrain/cylinder.png` | Cylinder and head (quarter cutaway) |
| GLB | `models/powertrain/engine_2t.glb` | 125 cc two-stroke single engine |
| PNG | `renders/powertrain/engine_2t.png` | 125 cc two-stroke single engine |
| GLB | `models/powertrain/engine_4t.glb` | Four-stroke horizontal single engine |
| PNG | `renders/powertrain/engine_4t.png` | Four-stroke horizontal single engine |
| GLB | `models/powertrain/exhaust_2t.glb` | Two-stroke expansion chamber and silencer |
| PNG | `renders/powertrain/exhaust_2t.png` | Two-stroke expansion chamber and silencer |
| GLB | `models/powertrain/exhaust_4t.glb` | Four-stroke exhaust: header, heat shield, muffler |
| PNG | `renders/powertrain/exhaust_4t.png` | Four-stroke exhaust: header, heat shield, muffler |
| GLB | `models/powertrain/motor.glb` | Electric motor (PMSM) cutaway |
| PNG | `renders/powertrain/motor.png` | Electric motor (PMSM) cutaway |
| GLB | `models/powertrain/piston.glb` | Piston with rings and gudgeon pin |
| PNG | `renders/powertrain/piston.png` | Piston with rings and gudgeon pin |
| GLB | `models/powertrain/port_ex.glb` | Two-stroke exhaust port (cutaway) |
| PNG | `renders/powertrain/port_ex.png` | Two-stroke exhaust port (cutaway) |
| GLB | `models/powertrain/port_tr.glb` | Two-stroke transfer ports (cutaway) |
| PNG | `renders/powertrain/port_tr.png` | Two-stroke transfer ports (cutaway) |
| GLB | `models/powertrain/spark_plug.glb` | Spark plug |
| PNG | `renders/powertrain/spark_plug.png` | Spark plug |
| GLB | `models/powertrain/throttle_body.glb` | EFI throttle body |
| PNG | `renders/powertrain/throttle_body.png` | EFI throttle body |
| GLB | `models/powertrain/valve_ex.glb` | Exhaust valve (sodium-filled) |
| PNG | `renders/powertrain/valve_ex.png` | Exhaust valve (sodium-filled) |
| GLB | `models/powertrain/valve_in.glb` | Intake valve and spring assembly |
| PNG | `renders/powertrain/valve_in.png` | Intake valve and spring assembly |

## Transmission

| Type | File | Description |
|---|---|---|
| SVG | `illustrations/transmission/F13.svg` | Wet multiplate clutch, exploded |
| SVG | `illustrations/transmission/F14.svg` | Constant-mesh gearbox |
| SVG | `illustrations/transmission/F15.svg` | Chain final drive and chain wear measurement |
| SVG | `illustrations/transmission/F16.svg` | Scooter CVT at low and high ratio |
| SVG | `illustrations/transmission/TR01.svg` | Gear shift mechanism |
| SVG | `illustrations/transmission/TR02.svg` | Final drive types |
| GLB | `models/transmission/chain_sprockets.glb` | Chain and sprockets (15T / 42T) |
| PNG | `renders/transmission/chain_sprockets.png` | Chain and sprockets (15T / 42T) |
| GLB | `models/transmission/clutch.glb` | Wet multiplate clutch |
| PNG | `renders/transmission/clutch.png` | Wet multiplate clutch |
| PNG | `renders/transmission/clutch_exploded.png` | Wet multiplate clutch |
| GLB | `models/transmission/clutch_exploded.glb` | Wet multiplate clutch (exploded) |
| PNG | `renders/transmission/clutch_exploded.png` | Wet multiplate clutch (exploded) |
| GLB | `models/transmission/rear_sprocket.glb` | Rear sprocket (42T) |
| PNG | `renders/transmission/rear_sprocket.png` | Rear sprocket (42T) |

## Chassis

| Type | File | Description |
|---|---|---|
| SVG | `illustrations/chassis/F17.svg` | Steering geometry: rake, trail, offset and wheelbase |
| SVG | `illustrations/chassis/F18.svg` | Telescopic fork, rear shock and sag measurement |
| SVG | `illustrations/chassis/F19.svg` | Hydraulic disc brake and drum brake |
| GLB | `models/chassis/brake.glb` | Disc brake (floating disc, 4-piston radial caliper) |
| PNG | `renders/chassis/brake.png` | Disc brake (floating disc, 4-piston radial caliper) |
| GLB | `models/chassis/forks.glb` | Front forks (conventional telescopic) |
| PNG | `renders/chassis/forks.png` | Front forks (conventional telescopic) |
| PNG | `renders/chassis/forks_usd.png` | Front forks (conventional telescopic) |
| GLB | `models/chassis/forks_usd.glb` | Front forks (inverted / USD) |
| PNG | `renders/chassis/forks_usd.png` | Front forks (inverted / USD) |
| GLB | `models/chassis/handlebar.glb` | Handlebar and controls, rider's view |
| PNG | `renders/chassis/handlebar.png` | Handlebar and controls, rider's view |
| GLB | `models/chassis/rear_shock.glb` | Rear shock absorber (monoshock with piggyback reservoir) |
| PNG | `renders/chassis/rear_shock.png` | Rear shock absorber (monoshock with piggyback reservoir) |
| PNG | `renders/chassis/rear_shock_twin.png` | Rear shock absorber (monoshock with piggyback reservoir) |
| GLB | `models/chassis/rear_shock_twin.glb` | Twin rear shocks (classic chrome) |
| PNG | `renders/chassis/rear_shock_twin.png` | Twin rear shocks (classic chrome) |
| GLB | `models/chassis/swingarm.glb` | Swingarm (aluminium box-section) |
| PNG | `renders/chassis/swingarm.png` | Swingarm (aluminium box-section) |

## Frame Body

| Type | File | Description |
|---|---|---|
| SVG | `illustrations/frame_body/FB01.svg` | Motorcycle frame types |
| SVG | `illustrations/frame_body/FB02.svg` | Motorcycle body parts |
| GLB | `models/frame_body/frame.glb` | Trellis frame (tubular steel) |
| PNG | `renders/frame_body/frame.png` | Trellis frame (tubular steel) |
| PNG | `renders/frame_body/frame_cradle.png` | Trellis frame (tubular steel) |
| GLB | `models/frame_body/frame_cradle.glb` | Double-cradle frame (tubular steel) |
| PNG | `renders/frame_body/frame_cradle.png` | Double-cradle frame (tubular steel) |
| GLB | `models/frame_body/fuel_tank.glb` | Steel teardrop fuel tank |
| PNG | `renders/frame_body/fuel_tank.png` | Steel teardrop fuel tank |
| GLB | `models/frame_body/seat_bench.glb` | Bench seat, classic ribbed |
| PNG | `renders/frame_body/seat_bench.png` | Bench seat, classic ribbed |
| GLB | `models/frame_body/seat_mx.glb` | Motocross seat, long and narrow |
| PNG | `renders/frame_body/seat_mx.png` | Motocross seat, long and narrow |
| GLB | `models/frame_body/seat_tracker.glb` | Flat-tracker seat with tail hump |
| PNG | `renders/frame_body/seat_tracker.png` | Flat-tracker seat with tail hump |

## Wheels

| Type | File | Description |
|---|---|---|
| SVG | `illustrations/wheels/F20.svg` | Tyre sidewall markings and tyre section |
| SVG | `illustrations/wheels/W01.svg` | Motorcycle wheel types |
| SVG | `illustrations/wheels/W02.svg` | Wheel hubs and bearings |
| GLB | `models/wheels/front_wheel_cast.glb` | Front wheel, cast alloy (17 in) |
| PNG | `renders/wheels/front_wheel_cast.png` | Front wheel, cast alloy (17 in) |
| GLB | `models/wheels/front_wheel_mx.glb` | Front wheel, motocross (21 in) |
| PNG | `renders/wheels/front_wheel_mx.png` | Front wheel, motocross (21 in) |
| GLB | `models/wheels/front_wheel_spoked.glb` | Front wheel, wire-spoked (19 in) |
| PNG | `renders/wheels/front_wheel_spoked.png` | Front wheel, wire-spoked (19 in) |
| GLB | `models/wheels/rear_wheel_cast.glb` | Rear wheel, cast alloy with cush drive (17 in) |
| PNG | `renders/wheels/rear_wheel_cast.png` | Rear wheel, cast alloy with cush drive (17 in) |
| GLB | `models/wheels/rear_wheel_mx.glb` | Rear wheel, motocross (19 in) |
| PNG | `renders/wheels/rear_wheel_mx.png` | Rear wheel, motocross (19 in) |
| GLB | `models/wheels/rear_wheel_spoked.glb` | Rear wheel, wire-spoked (18 in) |
| PNG | `renders/wheels/rear_wheel_spoked.png` | Rear wheel, wire-spoked (18 in) |

## Electrical

| Type | File | Description |
|---|---|---|
| SVG | `illustrations/electrical/F24.svg` | F24 Electric motor sections: outer-rotor hub BLDC motor and inner-rotor IPM PMSM |
| SVG | `illustrations/electrical/F25.svg` | F25 Electric motorcycle powertrain: battery, BMS, contactor and pre-charge, inverter, motor, VCU, DC-DC, charger and CAN bus |
| SVG | `illustrations/electrical/F26.svg` | F26 Battery pack construction: 20S10P module of 21700 cells with nickel strips, holders, BMS and cell section inset |
| SVG | `illustrations/electrical/EL01.svg` | Instruments and switchgear |
| SVG | `illustrations/electrical/EL02.svg` | Electrical component map |
| GLB | `models/electrical/battery_12v.glb` | 12 V AGM service battery |
| PNG | `renders/electrical/battery_12v.png` | 12 V AGM service battery |
| GLB | `models/electrical/battery_hv.glb` | HV lithium traction battery pack |
| PNG | `renders/electrical/battery_hv.png` | HV lithium traction battery pack |
| GLB | `models/electrical/charge_port.glb` | Charging inlet (Type 2 / CCS2 style) |
| PNG | `renders/electrical/charge_port.png` | Charging inlet (Type 2 / CCS2 style) |
| GLB | `models/electrical/controller.glb` | Motor controller (inverter), lid removed |
| PNG | `renders/electrical/controller.png` | Motor controller (inverter), lid removed |
| GLB | `models/electrical/headlight_led.glb` | Headlight, angular LED unit with DRL |
| PNG | `renders/electrical/headlight_led.png` | Headlight, angular LED unit with DRL |
| GLB | `models/electrical/headlight_mx.glb` | Headlight, motocross number-plate shroud |
| PNG | `renders/electrical/headlight_mx.png` | Headlight, motocross number-plate shroud |
| GLB | `models/electrical/headlight_round.glb` | Headlight, round chrome bucket (7 in) |
| PNG | `renders/electrical/headlight_round.png` | Headlight, round chrome bucket (7 in) |
| GLB | `models/electrical/instruments_analogue.glb` | Instruments, twin analogue clocks |
| PNG | `renders/electrical/instruments_analogue.png` | Instruments, twin analogue clocks |
| GLB | `models/electrical/instruments_lcd.glb` | Instruments, compact motocross LCD |
| PNG | `renders/electrical/instruments_lcd.png` | Instruments, compact motocross LCD |
| GLB | `models/electrical/instruments_tft.glb` | Instruments, 5 in colour TFT dash |
| PNG | `renders/electrical/instruments_tft.png` | Instruments, 5 in colour TFT dash |
| GLB | `models/electrical/tail_light.glb` | LED tail light with plate light |
| PNG | `renders/electrical/tail_light.png` | LED tail light with plate light |

## Wiring

| Type | File | Description |
|---|---|---|
| SVG | `illustrations/wiring/F21.svg` | F21 Charging circuit: permanent-magnet alternator, shunt regulator/rectifier, fuse, battery and loads |
| SVG | `illustrations/wiring/F22.svg` | F22 Ignition circuits: AC-CDI and DC-TCI/ECU inductive ignition |
| SVG | `illustrations/wiring/F23.svg` | F23 Electric starting circuit: battery, fuses, switches, interlocks, starter relay, starter motor and starter clutch |
| SVG | `illustrations/wiring/WR01.svg` | Main wiring harness laid flat |
| GLB | `models/wiring/wiring_harness.glb` | Main wiring harness with fuse box and relays |
| PNG | `renders/wiring/wiring_harness.png` | Main wiring harness with fuse box and relays |

## Controls

| Type | File | Description |
|---|---|---|
| SVG | `illustrations/controls/F05.svg` | F05 Handlebar and controls seen from the rider's seat, with magnified left and right switch clusters |
| HTML | `interactive/viewer.html` | Reference three.js viewer with category and part highlighting |
| HTML | `interactive/controls.html` | Interactive controls |
| SVG | `interactive/handlebar.svg` | Interactive controls |

## Brand

| Type | File | Description |
|---|---|---|
| BRAND | `lockup-reverse.svg` | Logo |
| BRAND | `mark.svg` | Logo |
| BRAND | `lockup.svg` | Logo |
| BRAND | `lockup.png` | Logo |
| BRAND | `mark.png` | Logo |

## Course

| Type | File | Description |
|---|---|---|
| PDF | `motopedia-module-1-foundations.pdf` | Course module PDF |
| PDF | `motopedia-module-2-engine.pdf` | Course module PDF |
| PDF | `motopedia-module-3-fuel-ignition-electrical.pdf` | Course module PDF |
| PDF | `motopedia-module-4-drivetrain-chassis.pdf` | Course module PDF |
| PDF | `motopedia-module-5-electric.pdf` | Course module PDF |
| JPG | `renders/course/render-battery.jpg` | Course render |
| JPG | `renders/course/render-brake.jpg` | Course render |
| JPG | `renders/course/render-chain.jpg` | Course render |
| JPG | `renders/course/render-crank.jpg` | Course render |
| JPG | `renders/course/render-engine-exploded.jpg` | Course render |
| JPG | `renders/course/render-engine-exterior.jpg` | Course render |
| JPG | `renders/course/render-engine-xray.jpg` | Course render |
| JPG | `renders/course/render-plug.jpg` | Course render |
| JPG | `renders/course/render-valve.jpg` | Course render |


## Added in the complete bundle

- `illustrations-png/`: every illustration rasterised to 2400 px transparent PNG (these are the versions used in the PDFs and open correctly in macOS Preview).
- `photos/`: the cover and in-text photographs and the studio renders placed in the PDFs.
- `interactive/previews/`: screenshots of the controls page (desktop, mobile, idle, riding).
- `source/content/`: the Markdown source of modules 1 to 5; `source/STYLE.md`: the illustration and writing style guide.
- `source/tools/`: the PDF build pipeline (`build.js`, `book.css`, rasteriser, packager).
- `source/3d/`: the Blender scripts that generate every GLB and render, plus `render3d/` for the course renders.
- `source/brand-old/`: the superseded Under the Engine logo, kept for reference only.
