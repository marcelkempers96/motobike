/* Moto Zero: Module 02 lessons. Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "engine",
  "num": "02",
  "title": "The engine: four-stroke and two-stroke",
  "intro": "How a petrol engine turns burning fuel into crankshaft torque, how four-strokes and two-strokes are built, lubricated and cooled, and how a technician measures, diagnoses and repairs them.",
  "pdf": "moto-zero-module-2-engine.pdf",
  "chapters": [
    {
      "id": "m2-fundamentals",
      "title": "Engine fundamentals and key numbers",
      "lead": "A handful of numbers describe any engine: bore, stroke, compression ratio, torque and power. Learn to calculate them and you can compare a commuter single with a racing two-stroke on equal terms, and spot what a spec sheet is really telling you.",
      "lab": "overview/?mode=4t&part=engine",
      "blocks": [
        {
          "type": "h3",
          "text": "From fuel to force"
        },
        {
          "type": "p",
          "html": "A petrol engine is a <strong>heat engine</strong>: it burns air and fuel inside a sealed chamber whose volume changes as the piston moves. Petrol carries about <strong>43 MJ/kg</strong>, and burns cleanly at the stoichiometric ratio of <strong>14.7 kg of air per kg of fuel</strong>."
        },
        {
          "type": "model",
          "file": "engine_4t",
          "caption": "A horizontal single-cylinder four-stroke commuter engine with carburettor, starter motor, clutch cover and kickstart."
        },
        {
          "type": "p",
          "html": "When it burns, gas temperature jumps from about 600 K to a peak of 2,300–2,600 K and cylinder pressure from 1.5–2 MPa to <strong>4–7 MPa</strong>. That pressure pushes on the piston crown; the connecting rod and crank turn the push into <strong>torque</strong>."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Displacement",
              "v": "124 cm³",
              "p": "K-Light 125: bore 56.5 mm × stroke 49.5 mm, one cylinder"
            },
            {
              "l": "Compression ratio",
              "v": "9:1",
              "p": "Typical for an air-cooled commuter single (9–10:1)"
            },
            {
              "l": "Peak torque",
              "v": "8.9 N·m",
              "p": "at 7,500 rpm"
            },
            {
              "l": "Peak power",
              "v": "7.8 kW",
              "p": "at 9,000 rpm; idle 1,500 ± 100 rpm"
            }
          ]
        },
        {
          "type": "p",
          "html": "Combustion is <em>not</em> an explosion. The spark starts a flame that crosses the chamber at 15–40 m/s and needs 40–60° of crank rotation to finish. So the spark fires <strong>before TDC</strong> (15° BTDC at idle on the K-Light), aiming for peak pressure at about 10–15° after TDC, where the crank has leverage."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Too early, too late",
          "html": "Spark too early: the burning gas fights the rising piston and the unburnt end gas can self-ignite (<strong>detonation</strong>, heard as knock or pinking). Spark too late: the heat leaves through the exhaust instead of turning the crank."
        },
        {
          "type": "h3",
          "text": "The ideal Otto cycle"
        },
        {
          "type": "p",
          "html": "The air-standard Otto cycle is the idealised model: air as the working gas, no friction or heat loss, and instant heat addition at TDC. Its efficiency depends only on compression ratio <em>r</em> and the gas property γ: <strong>η = 1 − 1/r^(γ−1)</strong>."
        },
        {
          "type": "table",
          "head": [
            "K-Light 125, r = 9",
            "Efficiency"
          ],
          "rows": [
            [
              "Ideal, γ = 1.4 (cold air)",
              "58.5 %"
            ],
            [
              "Ideal, γ = 1.3 (hot mixture)",
              "48.3 %"
            ],
            [
              "Ideal, γ = 1.3, if r were 12",
              "52.5 %"
            ],
            [
              "Real small air-cooled engine (peak brake)",
              "about 28–32 %"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Why the gap? Heat lost to the walls, combustion that takes time, pumping work and friction. Why not just raise <em>r</em>? Higher compression also heats the end gas toward knock, so octane, chamber shape and cooling set the limit: commuter singles run 9–10:1, liquid-cooled four-valve sports engines 12–14:1."
        },
        {
          "type": "h3",
          "text": "Cylinder geometry"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Displacement",
              "html": "<strong>V = π/4 × B² × S × n</strong>. K-Light: 0.7854 × 5.65² × 4.95 = 124.1 cm³ (work in cm to get cm³)."
            },
            {
              "title": "Compression ratio",
              "html": "<strong>r = (Vs + Vc) / Vc</strong>, so Vc = Vs / (r − 1). K-Light: 124.1 / 8 = 15.5 cm³ of clearance volume."
            },
            {
              "title": "Bore/stroke ratio",
              "html": "B/S above 1 is over-square (short stroke). K-Light 56.5/49.5 = <strong>1.14</strong>; Yamaha YZ125 0.99 (square); superbike fours 1.4–1.6."
            },
            {
              "title": "Mean piston speed",
              "html": "<strong>cm = 2 × S × N / 60</strong>. K-Light at 9,000 rpm: 2 × 0.0495 × 9,000 / 60 = 14.9 m/s. Commuters run 13–16 m/s, sports engines 18–22, racers 24–26."
            }
          ]
        },
        {
          "type": "figure",
          "fig": "engine-params",
          "caption": "Set bore 56.5 mm and stroke 49.5 mm: you should get about 124 cm³. Now raise the bore to 62 mm (about 149 cm³), then move compression from 9:1 to 11:1 and watch the ideal efficiency rise from 48.3 % to 51.3 % (γ = 1.3)."
        },
        {
          "type": "p",
          "html": "Compression ratio is very sensitive to small changes. Skimming just <strong>0.10 mm</strong> off the head face takes 0.25 cm³ from Vc and lifts r from 9 to 9.13; a head gasket 0.20 mm thicker drops it to 8.76. Carbon deposits shrink Vc too, which is why the manual lists excess carbon as a cause of compression that is too high."
        },
        {
          "type": "table",
          "head": [
            "Property",
            "Over-square (short stroke)",
            "Under-square (long stroke)"
          ],
          "rows": [
            [
              "Piston speed at given rpm",
              "Lower, so higher rpm possible",
              "Higher, limits rpm"
            ],
            [
              "Valve area",
              "Room for bigger or more valves",
              "Smaller bore restricts valves"
            ],
            [
              "Combustion chamber",
              "Wide, flat, longer flame path",
              "Compact, tolerates higher compression"
            ],
            [
              "Character",
              "High-rpm power",
              "Low-rpm torque, part-load efficiency"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Open the <a href=\"../overview/?mode=4t&part=engine\">engine in the Overview</a>. Its sliders move in whole millimetres, so set bore 57 mm and stroke 50 mm (the nearest settings to the K-Light 125's 56.5 × 49.5 mm), calculate the displacement (π/4 × 5.7² × 5.0 ≈ 128 cm³) and compare it with the Outputs panel; the true K-Light figure is 124 cm³. Raise the bore to 62 mm with the stroke unchanged and recalculate (about 151 cm³). Move the compression ratio from 9:1 to 11:1 and work out the change in ideal Otto efficiency at γ = 1.3 (48.3 % to 51.3 %), then set a short and a long stroke at 9000 rpm and compare the mean piston speeds."
        },
        {
          "type": "h3",
          "text": "Try it: bore, stroke and the numbers they give"
        },
        {
          "type": "animation",
          "part": "piston",
          "mode": "4t",
          "caption": "Change bore, stroke and compression in the Parameters card and watch displacement, torque and power follow. The graphs compare your engine with the 125 cc reference and show how fast the piston moves through each turn."
        },
        {
          "type": "check",
          "q": "m2-02"
        },
        {
          "type": "h3",
          "text": "Torque, power and BMEP"
        },
        {
          "type": "p",
          "html": "Power is torque times speed: <strong>P (kW) = T (N·m) × N (rpm) / 9,549</strong>. K-Light: 8.9 N·m at 7,500 rpm = 6.99 kW; the 7.8 kW peak at 9,000 rpm implies 8.28 N·m there. Power peaks above the torque peak because torque falls more slowly than rpm rises."
        },
        {
          "type": "p",
          "html": "<strong>BMEP</strong> (brake mean effective pressure) lets you compare engines of any size: <strong>4π × T / Vd</strong> for a four-stroke, <strong>2π × T / Vd</strong> for a two-stroke. The K-Light makes 9.0 bar at peak torque. Typical: 8–10 bar for air-cooled two-valve road engines, 11–13 bar for liquid-cooled four-valve sports engines, 6–9 bar for carburetted road two-strokes."
        },
        {
          "type": "figure",
          "fig": "power-torque",
          "caption": "Enter 8.9 N·m at 7,500 rpm and confirm about 7.0 kW; then try 8.28 N·m at 9,000 rpm for the quoted 7.8 kW peak."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "With the <a href=\"../overview/?mode=4t&part=engine\">four-stroke engine</a> selected, set the RPM slider to 3000, 6000 and 9000 rpm in turn and calculate the mean piston speed (2 × stroke × rpm ÷ 60) and the number of power strokes per second (rpm ÷ 120). Switch to the <a href=\"../overview/?mode=2t&part=engine\">two-stroke engine</a> at the same speeds and confirm that the power-stroke frequency doubles (rpm ÷ 60). Use these numbers to explain why a 125 cm³ two-stroke can produce two to three times the power of a 125 cm³ commuter four-stroke."
        },
        {
          "type": "h3",
          "text": "Volumetric efficiency"
        },
        {
          "type": "p",
          "html": "Volumetric efficiency ηv compares the air actually drawn in with what would fill the swept volume: <strong>ηv = ṁair / (ρ × Vd × N / 120)</strong> for a four-stroke. At 7,500 rpm the K-Light could ideally draw 9.15 g/s; a measured 7.8 g/s gives ηv = 0.85. The torque curve follows ηv closely, so valve timing, ports and exhaust length shape the curve."
        },
        {
          "type": "p",
          "html": "Quick energy check: 7.8 g/s of air at 14.7:1 needs 0.53 g/s of fuel = 22.8 kW of chemical energy. With 7.0 kW at the crank, brake thermal efficiency is about <strong>31 %</strong>. Rear-wheel dyno figures are typically 8–15 % below quoted crankshaft power."
        },
        {
          "type": "check",
          "q": "m2-03"
        }
      ]
    },
    {
      "id": "m2-four-stroke",
      "title": "The four-stroke cycle",
      "lead": "A four-stroke needs two full turns of the crank, 720°, to complete one cycle. Knowing exactly what the piston and both valves are doing at every point is the key to valve timing, valve adjustment and half of engine diagnosis.",
      "lab": "overview/?mode=4t&part=engine",
      "blocks": [
        {
          "type": "p",
          "html": "Because one cycle takes <strong>720°</strong>, the camshaft turns at <strong>half crank speed</strong>: one cam lobe, one valve opening per cycle. A single fires only once every second revolution, so it relies on the flywheel effect of its alternator rotor and crank webs to coast through three non-power strokes."
        },
        {
          "type": "figure",
          "fig": "cycle-4t",
          "caption": "Step through all four strokes. Watch which valve is open in each, and confirm that after 720° of crank the cam has turned only 360°."
        },
        {
          "type": "engine",
          "shot": "07-valvetrain",
          "view": "top",
          "caption": "The valvetrain moving in time with the crank: cam chain, camshaft, rockers and valves. The dial shows where you are in the 720° cycle."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Intake (0–180°)",
              "html": "Piston descends, inlet valve open. Pressure falls to about 0.85–0.95 bar absolute at full throttle (much lower at part throttle). The air column moves at 50–100 m/s and its inertia keeps it flowing in after BDC."
            },
            {
              "title": "Compression (180–360°)",
              "html": "Inlet closes, piston rises and squeezes the charge. K-Light cranking compression: <strong>1.0–1.2 MPa</strong>. Spark fires 10–40° BTDC depending on speed and load."
            },
            {
              "title": "Power (360–540°)",
              "html": "The flame crosses the chamber, pressure peaks just after TDC and drives the piston down. Most useful work is done in the first 60–90°."
            },
            {
              "title": "Exhaust (540–720°)",
              "html": "Exhaust valve opens before BDC; the first rush (<strong>blowdown</strong>) leaves at near sonic speed. The rising piston pushes out most of the rest, leaving 5–15 % residual gas."
            }
          ]
        },
        {
          "type": "plate",
          "id": "F07",
          "caption": "The four-stroke cycle: valve positions, piston travel, crank angle and gas flow in each stroke."
        },
        {
          "type": "h3",
          "text": "Valve timing: open early, close late"
        },
        {
          "type": "p",
          "html": "Gas has inertia and valves take time to lift, so cams open each valve early and close it late. The four events are named after the valve and the nearest dead centre."
        },
        {
          "type": "table",
          "head": [
            "Event",
            "Commuter single",
            "Sports four (four-valve)"
          ],
          "rows": [
            [
              "IVO (inlet opens)",
              "5–15° BTDC",
              "25–40° BTDC"
            ],
            [
              "IVC (inlet closes)",
              "30–45° ABDC",
              "55–70° ABDC"
            ],
            [
              "EVO (exhaust opens)",
              "30–45° BBDC",
              "55–70° BBDC"
            ],
            [
              "EVC (exhaust closes)",
              "5–15° ATDC",
              "25–40° ATDC"
            ],
            [
              "Overlap (IVO + EVC)",
              "10–30°",
              "50–80°"
            ]
          ]
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Inlet duration",
              "v": "IVO + 180 + IVC",
              "p": "10° BTDC / 40° ABDC gives 230°"
            },
            {
              "l": "Overlap",
              "v": "IVO + EVC",
              "p": "both valves open around TDC"
            },
            {
              "l": "Inlet lobe centre",
              "v": "(IVC − IVO + 180)/2",
              "p": "(40 − 10 + 180)/2 = 105° ATDC"
            }
          ]
        },
        {
          "type": "p",
          "html": "<strong>Early exhaust opening</strong> loses a little expansion work, but blowdown empties the cylinder before the piston rises and saves far more pumping work. <strong>Late inlet closing</strong> uses the ramming air column at speed, but at low rpm it pushes charge back into the port. <strong>Long overlap</strong> helps scavenging at high rpm, but at idle exhaust flows back into the inlet: rough idle and high hydrocarbons. That is why emission-certified commuters use short overlap."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb: a hotter cam is a trade",
          "html": "More duration and overlap move peak power up the rev range but cost idle quality, cranking compression, low-speed torque and emissions. Variable valve timing (Honda HYPER VTEC, Ducati DVT, Yamaha VVA and others) exists to escape this compromise."
        },
        {
          "type": "h3",
          "text": "Try it: the four strokes, live"
        },
        {
          "type": "animation",
          "part": "engine",
          "mode": "4t",
          "caption": "Watch intake, compression, power and exhaust; use Step +30° to stop at each stroke. The timing strip shows where the crank is in its 720° cycle."
        },
        {
          "type": "check",
          "q": "m2-07"
        },
        {
          "type": "h3",
          "text": "Firing order and crank layouts"
        },
        {
          "type": "p",
          "html": "Even firing in a four-stroke needs an interval of <strong>720° divided by the number of cylinders</strong>. The crank layout sets the intervals, and the intervals set the feel and sound."
        },
        {
          "type": "table",
          "head": [
            "Layout",
            "Firing intervals",
            "Character"
          ],
          "rows": [
            [
              "Single",
              "720°",
              "Strong pulses, large flywheel effect"
            ],
            [
              "Parallel twin, 360°",
              "360°, 360°",
              "Even firing, strong primary shake"
            ],
            [
              "Parallel twin, 180°",
              "180°, 540°",
              "Primary forces cancel, rocking couple"
            ],
            [
              "Parallel twin, 270°",
              "270°, 450°",
              "Mimics a 90° V-twin (Yamaha MT-07)"
            ],
            [
              "90° V-twin",
              "270°, 450°",
              "Perfect primary balance (Ducati, SV650)"
            ],
            [
              "Inline triple",
              "240° even",
              "Balanced primary, end-to-end rocking couple"
            ],
            [
              "Inline four, flat-plane",
              "180° even (1-2-4-3)",
              "Primary balance, secondary vertical shake"
            ],
            [
              "Inline four, crossplane",
              "270°, 180°, 90°, 180°",
              "Inertial torque cancels (Yamaha R1)"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Run the <a href=\"../overview/?mode=4t&part=engine\">four-stroke engine</a> at a low RPM setting and pause it with the Space key where the inlet valve begins to lift and where the exhaust valve closes. Read the crank angle (θ) from the status line and calculate the overlap; the Overview's valve events are simplified, so compare your figure with the real timing given in this chapter. Then step through a full 720° cycle and explain why the camshaft, driven at half crankshaft speed, has turned through only 360°."
        },
        {
          "type": "check",
          "q": "m2-10"
        }
      ]
    },
    {
      "id": "m2-two-stroke",
      "title": "The two-stroke cycle",
      "lead": "A two-stroke does the whole job in one revolution, with no valves at all: the piston itself opens and closes ports in the cylinder wall. That makes it light and powerful, and also explains its smoke, its narrow powerband and its thirst.",
      "lab": "overview/?mode=2t&part=cylinder",
      "blocks": [
        {
          "type": "p",
          "html": "The motorcycle two-stroke uses the <strong>underside of the piston and a sealed crankcase</strong> as a pump, and replaces poppet valves with <strong>ports</strong> that the piston uncovers and covers. The full cycle takes <strong>360°</strong>, so it fires every revolution."
        },
        {
          "type": "photo",
          "src": "repair-photos/112_yamaha_yz_125_piston.jpg",
          "caption": "Two-stroke piston with ring pegs",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "photo",
          "src": "repair-photos/112_i_always_measure_old_piston_so.jpg",
          "caption": "Two-stroke cylinder bore and ports",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "model",
          "file": "engine_2t",
          "caption": "A 125 cc two-stroke single: finned cylinder with power-valve housing, reed-valve intake and carburettor, clutch and ignition covers."
        },
        {
          "type": "figure",
          "fig": "cycle-2t",
          "caption": "Run the cycle slowly. Pause when the exhaust port starts to open and again when the transfers open: the gap between them is the blowdown period."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Upstroke (BDC to TDC)",
              "html": "<strong>Above</strong> the piston: transfers close, then the exhaust; the trapped charge is compressed and fired near TDC. <strong>Below</strong>: crankcase pressure falls to about 0.6–0.8 bar absolute and fresh mixture is drawn in."
            },
            {
              "title": "Downstroke: power",
              "html": "Combustion drives the piston down. Below it, the inlet closes and the crankcase charge is squeezed to about 1.3–1.5 bar absolute."
            },
            {
              "title": "Exhaust port opens",
              "html": "At roughly 80–100° before BDC the crown uncovers the exhaust; blowdown drops cylinder pressure sharply."
            },
            {
              "title": "Transfers open: scavenging",
              "html": "A few degrees later the transfers open and the pressurised crankcase charge flows up, pushing burnt gas out of the exhaust."
            }
          ]
        },
        {
          "type": "plate",
          "id": "F08",
          "caption": "The two-stroke cycle: upstroke and downstroke, above and below the piston."
        },
        {
          "type": "photo",
          "src": "repair-photos/109_expansion_chambers.jpg",
          "caption": "Two-stroke expansion chambers. The returning pressure wave pushes escaping charge back into the cylinder, but only over a narrow rpm band.",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Port events are <strong>symmetrical about BDC</strong>, because the piston opens and closes each port at the same height. So an exhaust port opening 97° before BDC has a duration of 2 × 97 = 194°."
        },
        {
          "type": "table",
          "head": [
            "Engine type",
            "Exhaust duration",
            "Transfer duration",
            "Blowdown"
          ],
          "rows": [
            [
              "Moped or road commuter",
              "160–175°",
              "115–122°",
              "20–25°"
            ],
            [
              "Enduro or road sports",
              "180–190°",
              "122–128°",
              "26–30°"
            ],
            [
              "Motocross 125",
              "190–200°",
              "128–134°",
              "30–33°"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Try it: a two-stroke at work"
        },
        {
          "type": "animation",
          "part": "engine",
          "mode": "2t",
          "caption": "See the exhaust and transfer ports open as the piston uncovers them, and the charge fire every revolution."
        },
        {
          "type": "check",
          "q": "m2-11"
        },
        {
          "type": "h3",
          "text": "Induction: how mixture gets into the crankcase"
        },
        {
          "type": "table",
          "head": [
            "System",
            "How it works",
            "Notes"
          ],
          "rows": [
            [
              "Piston port",
              "Piston skirt opens an inlet port",
              "Simplest; symmetrical timing; blows back at low speed"
            ],
            [
              "Reed valve",
              "Flexible petals open only when crankcase pressure is low",
              "Automatic, asymmetric timing; almost all modern two-strokes (YZ125, KTM)"
            ],
            [
              "Rotary disc valve",
              "Cut-out disc on the crank uncovers a side port",
              "Asymmetric timing; GP racers (Aprilia RS125/250); wide engine"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Scavenging and the expansion chamber"
        },
        {
          "type": "p",
          "html": "Scavenging, swapping burnt gas for fresh charge while exhaust and transfers are open together, is the central difficulty. Modern engines use <strong>loop (Schnürle) scavenging</strong>: transfers aim the charge away from the exhaust, up the far wall, over the head and down toward the exhaust, sweeping burnt gas ahead. A <strong>boost port</strong> opposite the exhaust fills the region the main streams would leave stagnant."
        },
        {
          "type": "plate",
          "id": "PT03",
          "caption": "Two-stroke cylinder ports: exhaust, transfers and boost port."
        },
        {
          "type": "model",
          "file": "port_tr",
          "caption": "Cylinder cut away through the transfer passages: the channels lead from the crankcase to the windows in the liner."
        },
        {
          "type": "model",
          "file": "port_ex",
          "caption": "Cylinder cut away through the exhaust port, the window the piston uncovers first on the downstroke."
        },
        {
          "type": "p",
          "html": "Some charge always escapes straight out of the exhaust: <strong>20–40 %</strong> at full throttle in a carburetted engine. The <strong>expansion chamber</strong> fights back with pressure waves travelling at about 500–520 m/s: the diffuser sends a suction wave that helps scavenging, then the baffle cone sends a positive wave that pushes escaped charge back in just before the port closes."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Tuned length",
              "v": "L ≈ a × θex / (12 × N)",
              "p": "a ≈ 500 m/s, θex = exhaust duration, N = rpm"
            },
            {
              "l": "125 MX example",
              "v": "0.70 m",
              "p": "194° duration tuned for 11,500 rpm"
            }
          ]
        },
        {
          "type": "p",
          "html": "Because the wave timing is fixed in milliseconds, the pipe only works over a band of rpm: the reason for the narrow powerband. A <strong>power valve</strong> (Yamaha YPVS, KTM guillotine, Honda HPP, Kawasaki KIPS, Suzuki AETC) lowers the exhaust port roof at low rpm and opens it fully at high rpm."
        },
        {
          "type": "model",
          "file": "exhaust_2t",
          "caption": "A two-stroke expansion chamber built from welded cone segments, ending in the stinger and silencer."
        },
        {
          "type": "plate",
          "id": "PT02",
          "caption": "Exhaust systems in section, including the expansion chamber with diffuser, belly, baffle cone and stinger."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Power valves and oil supply",
          "html": "Carbon from burnt oil seizes power valves: <strong>stuck closed</strong> = will not rev; <strong>stuck open</strong> = no bottom-end torque. And on oil-injected engines, a failed pump or empty oil tank <strong>seizes the engine within minutes</strong>."
        },
        {
          "type": "check",
          "q": "m2-13"
        },
        {
          "type": "h3",
          "text": "Lubrication: premix or oil injection"
        },
        {
          "type": "p",
          "html": "The crankcase is part of the intake tract, so it cannot hold an oil bath. Oil arrives with the charge and is burnt. <strong>Premix</strong>: commonly 50:1 for modern synthetic oils, 32:1 to 40:1 for racing. 5 L at 50:1 needs 5,000 / 50 = <strong>100 mL</strong>; at 32:1, 156 mL. <strong>Oil injection</strong> pumps meter oil from about 100:1 at idle to 30:1 at full load. Oils are graded JASO M345 FA to FD."
        },
        {
          "type": "h3",
          "text": "Power versus pollution"
        },
        {
          "type": "p",
          "html": "Firing every revolution with no valve train, a two-stroke gives <strong>1.5 to 2 times</strong> the power of an equal-size four-stroke. The price: short-circuited fuel, burnt oil, unstable part-load combustion and hot pistons. Injecting fuel late, after the exhaust is nearly closed, means mostly <em>air</em> short-circuits. KTM introduced <strong>Transfer Port Injection (TPI)</strong> on its 250 and 300 EXC for 2018, and moved to Throttle Body Injection (TBI) from the 2023–2024 model years."
        },
        {
          "type": "photo",
          "src": "repair-photos/109_two_stroke_exhaust_pipes.jpg",
          "caption": "Two-stroke exhaust pipes",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Switch to the <a href=\"../overview/?mode=2t&part=engine\">two-stroke engine</a> and run the animation slowly. Pause when the exhaust port starts to open and when the transfer ports start to open, read both crank angles from the status line and calculate the blowdown period. Then raise the RPM slider and compare the number of power strokes per second with the <a href=\"../overview/?mode=4t&part=engine\">four-stroke</a> at the same speed."
        }
      ]
    },
    {
      "id": "m2-top-end",
      "title": "The top end",
      "lead": "The cylinder head is where breathing, combustion and most routine adjustment happen. Understanding valves, seats, springs and the valve train explains why clearances are checked so often, and what happens when they are not.",
      "lab": "overview/?mode=4t&part=cylinder",
      "blocks": [
        {
          "type": "p",
          "html": "The cylinder head closes the cylinder, carries valves, ports, spark plug and (on overhead-cam engines) the camshafts, and passes heat to the fins or water jacket. It is cast aluminium-silicon alloy with harder inserted seats and guides. The K-Light head face is allowed only <strong>0.05 mm</strong> out of flat."
        },
        {
          "type": "photo",
          "src": "repair-photos/111_b_24_valve_ct_90_valve.jpg",
          "caption": "Two valves of different sizes side by side",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "photo",
          "src": "repair-photos/111_cutting_valve_seat.jpg",
          "caption": "Cutting a valve seat with a seat cutter",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "photo",
          "src": "repair-photos/111_hose.jpg",
          "caption": "Lapping a valve with a hose on the stem",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "photo",
          "src": "repair-photos/131_ducati_250_over_head_cam_gear.jpg",
          "caption": "Gear-driven overhead camshafts in a cylinder head",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "photo",
          "src": "repair-photos/131_over_head_cam_gear_drive.jpg",
          "caption": "Overhead camshaft drive from a sprocket to the valves",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "model",
          "file": "cylinder",
          "caption": "Cylinder and head in quarter section: liner, combustion chamber, inlet valve and port, and the cooling fins."
        },
        {
          "type": "plate",
          "id": "F09",
          "caption": "Single-cylinder four-stroke in section: cam chain, camshaft, rockers, valves and springs, plug, piston, rod and crank."
        },
        {
          "type": "photo",
          "src": "repair-photos/110_feeler_gauge.jpg",
          "caption": "Checking valve clearance with a feeler gauge, piston at top dead centre on the compression stroke.",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Combustion chamber shapes"
        },
        {
          "type": "table",
          "head": [
            "Shape",
            "Where",
            "Why"
          ],
          "rows": [
            [
              "Hemispherical / spherical",
              "Two-valve singles (K-Light)",
              "Large valves, central plug"
            ],
            [
              "Pent-roof",
              "Four-valve heads",
              "Narrow valve angle (20–25°), compact, central plug"
            ],
            [
              "Squish band",
              "Edge of the chamber",
              "Piston comes within 0.8–1.5 mm of head: turbulence, cooler end gas, higher knock limit"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Two valves are cheap and keep port velocity high at low rpm. <strong>Four valves</strong> give about 30–40 % more curtain area in the same bore, lighter valves for higher rpm and a central plug."
        },
        {
          "type": "check",
          "q": "m2-16"
        },
        {
          "type": "h3",
          "text": "Valves, seats, guides and springs"
        },
        {
          "type": "p",
          "html": "Exhaust valve heads run at <strong>650–800 °C</strong>, so they use heat-resistant austenitic steel, nickel alloy or bimetallic construction; inlets are cooled by the incoming charge. Seats have a 45° sealing face with 32° and 60° correcting cuts. Twin concentric springs wound in opposite directions resist surge; weak springs let the follower leave the cam (<strong>valve float</strong>)."
        },
        {
          "type": "model",
          "file": "valve_ex",
          "caption": "An exhaust valve with a window cut in the stem to show the sodium filling that carries heat from the head to the guide."
        },
        {
          "type": "photo",
          "src": "render-valve.jpg",
          "caption": "A poppet valve with its spring set, assembled (left) and exploded along the stem (right): valve head with ground 45° seat face, spring seat washer, stem seal with garter spring, concentric outer and inner springs, top retainer and the two split collets that lock into the groove near the stem tip."
        },
        {
          "type": "model",
          "file": "valve_in",
          "caption": "An intake valve with its spring, retainer and collets: the larger head of the pair, running much cooler than the exhaust."
        },
        {
          "type": "table",
          "head": [
            "K-Light 125 item",
            "Standard",
            "Limit"
          ],
          "rows": [
            [
              "Seat contact width",
              "0.8–1.0 mm",
              "1.6 mm"
            ],
            [
              "Inlet stem diameter",
              "5.44–5.45 mm",
              "5.40 mm"
            ],
            [
              "Guide bore",
              "5.475–5.485 mm",
              "5.50 mm"
            ],
            [
              "Stem-to-guide clearance, inlet",
              "0.025–0.045 mm",
              "0.08 mm"
            ],
            [
              "Stem-to-guide clearance, exhaust",
              "0.03–0.05 mm",
              "0.10 mm"
            ],
            [
              "Spring free length, inner / outer",
              "33.5 / 40.9 mm",
              "30 / 39.5 mm"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Valve train types"
        },
        {
          "type": "table",
          "head": [
            "Type",
            "Layout",
            "Adjustment"
          ],
          "rows": [
            [
              "OHV push-rod",
              "Cam low in crankcase, gear-driven; tappets, push rods, rockers. K-Light 125 / Honda CG125",
              "Screw and locknut at rocker"
            ],
            [
              "SOHC rocker",
              "One chain-driven cam in the head, rockers",
              "Screw and locknut at rocker"
            ],
            [
              "DOHC",
              "Two cams acting on buckets or finger followers",
              "Shims under or on top of buckets"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Push-rod mass limits revs, but that does not matter for a commuter engine peaking at 9,000 rpm; it is cheap, compact and tolerant of neglect. Overhead cams are driven at half crank speed by a chain with a ratchet-type automatic tensioner. A rattling chain at idle means chain, guides, sprockets and tensioner are worn: <strong>renew them as a set</strong>."
        },
        {
          "type": "plate",
          "id": "F10",
          "caption": "Valvetrain and valve clearance: rocker adjuster with feeler gauge, and a DOHC bucket-and-shim inset."
        },
        {
          "type": "h3",
          "text": "Why valve clearance closes up"
        },
        {
          "type": "p",
          "html": "A small clearance (lash) is left so the valve can expand and still seat fully. The K-Light uses <strong>0.05–0.07 mm</strong> on both valves. On most modern engines the clearance <em>closes up</em> with wear: valve face and seat hammer into each other, the valve sinks into the head (<strong>valve recession</strong>) and its stem tip rises toward the rocker or bucket."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Zero clearance burns valves",
          "html": "A valve with no clearance never fully closes. The usual sequence: <strong>hard hot starting → low compression → burnt exhaust valve</strong>. Check clearances at every specified service."
        },
        {
          "type": "p",
          "html": "For shim-under-bucket engines: <strong>new shim = old shim + (measured − target clearance)</strong>. Shims usually come in 0.025 mm steps."
        },
        {
          "type": "check",
          "q": "m2-18"
        }
      ]
    },
    {
      "id": "m2-bottom-end",
      "title": "The bottom end",
      "lead": "Piston, rings, rod and crank turn gas pressure into rotation, and they do it while stopping and restarting the piston twice every revolution. This chapter is about how they are built, how they are balanced and how they wear.",
      "lab": "overview/?mode=4t&part=crankshaft",
      "blocks": [
        {
          "type": "h3",
          "text": "Piston and rings"
        },
        {
          "type": "photo",
          "src": "repair-photos/112_small_bore_71mm_long_stroke_82mm.jpg",
          "caption": "Piston with rings and pin bosses",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "photo",
          "src": "repair-photos/122_motorcycle_counter_balancers.jpg",
          "caption": "Counterbalancer weights moving opposite the piston",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Pistons are aluminium-silicon alloy: <strong>cast</strong> for most road engines, <strong>forged</strong> (stronger when hot, lighter) for sports and racing. They are <strong>cam-ground</strong> (slightly oval) and <strong>tapered</strong> (smaller at the hotter crown) so they become round and parallel when hot. That is why you always measure at 90° to the pin, at a set height: <strong>11 mm above the skirt bottom</strong> on the K-Light."
        },
        {
          "type": "model",
          "file": "piston",
          "caption": "A piston with its ring pack, gudgeon pin and circlips."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Top compression ring",
              "html": "Main gas seal; chrome- or nitride-faced; marked to show which side faces up."
            },
            {
              "title": "Second ring",
              "html": "Completes the gas seal and scrapes oil downward; often a taper-faced or Napier ring with the notch pointing down."
            },
            {
              "title": "Oil control ring",
              "html": "Two thin rails plus an expander; oil drains through holes to the inside of the piston. Expander ends must butt, never overlap."
            }
          ]
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Ring end gap",
              "v": "0.15–0.30 mm",
              "p": "K-Light compression rings; limit 0.5 mm"
            },
            {
              "l": "Ring side clearance",
              "v": "0.015–0.05 mm",
              "p": "limit 0.09 mm"
            },
            {
              "l": "Big-end radial clearance",
              "v": "0.008–0.018 mm",
              "p": "limit 0.05 mm"
            }
          ]
        },
        {
          "type": "p",
          "html": "Two-stroke pistons carry one or two rings, pinned so the ends cannot catch in a port. The <strong>gudgeon pin</strong> is a hollow hardened steel tube held by circlips. Four-stroke small ends run on the pin with splash oil; two-stroke small ends need a <strong>caged needle bearing</strong> because they get only oil mist."
        },
        {
          "type": "photo",
          "src": "repair-photos/112_honda_piston.jpg",
          "caption": "Four-stroke piston with ring grooves",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Connecting rods and crankshafts"
        },
        {
          "type": "photo",
          "src": "repair-photos/112_three_piece.jpg",
          "caption": "Three-piece oil ring",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "table",
          "head": [
            "Feature",
            "One-piece rod, roller big end",
            "Split rod, plain bearing"
          ],
          "rows": [
            [
              "Typical use",
              "Singles, twins, all two-strokes, K-Light 125",
              "Multis, larger four-stroke singles"
            ],
            [
              "Crankshaft",
              "Pressed-up from webs and crankpin",
              "One-piece forging"
            ],
            [
              "Lubrication",
              "Splash or modest pressure",
              "Full pressure feed at 3–6 bar, clean oil"
            ],
            [
              "Service",
              "Replace or rebuild crank assembly",
              "Replace shells"
            ]
          ]
        },
        {
          "type": "model",
          "file": "conrod",
          "caption": "A forged I-section connecting rod with a caged needle-roller big end and a bronze-bushed small end."
        },
        {
          "type": "model",
          "file": "crankshaft_single",
          "caption": "A built-up single-cylinder crankshaft: two flywheel webs joined by a pressed-in crankpin, as used with a one-piece rod."
        },
        {
          "type": "photo",
          "src": "render-crank.jpg",
          "caption": "Pressed-up single-cylinder crank assembly: two full-circle flywheel webs with balance holes drilled opposite the crankpin, a roller-bearing big end on a forged I-section connecting rod, bronze-bushed small end, and a slipper-skirt piston with two compression rings and a three-piece oil ring. The splined left shaft carries the primary drive gear; the right shaft carries the cam-chain sprocket, the keyed taper for the alternator rotor and the rotor nut thread."
        },
        {
          "type": "photo",
          "src": "repair-photos/122_gear_drive_counterbalancer.jpg",
          "caption": "Gear-driven counterbalancer. A single cylinder can only be part-balanced by the crank webs; a weight turning the opposite way cancels much of the rest of the shaking force.",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "engine",
          "shot": "01-whole-engine",
          "view": "overview",
          "caption": "Crank, rod and piston at the heart of the whole unit: generator on the left, clutch and gearbox on the right, all driven from one crankshaft."
        },
        {
          "type": "model",
          "file": "crankshaft",
          "caption": "A one-piece four-cylinder crankshaft with counterweights, crankpins, main journals and the flywheel flange; it needs split rods on plain bearings."
        },
        {
          "type": "plate",
          "id": "F09",
          "caption": "Find the piston, rings, gudgeon pin, connecting rod, crankshaft and balancer in the sectional view."
        },
        {
          "type": "check",
          "q": "m2-20"
        },
        {
          "type": "h3",
          "text": "Balance: why a single shakes"
        },
        {
          "type": "p",
          "html": "The reciprocating mass stops and restarts twice per revolution. Its <strong>primary force</strong> is <strong>Fp = m × r × ω² × cos θ</strong>. With an assumed 0.20 kg at r = 0.02475 m and 9,000 rpm (ω = 942 rad/s), the peak is about <strong>4.4 kN</strong>, reversing every revolution."
        },
        {
          "type": "p",
          "html": "A crank counterweight makes a <em>rotating</em> force, but the piston force acts only along the cylinder. So counterweighting a fraction of the mass, the <strong>balance factor</strong> (typically 50–70 % in singles), just trades vertical shake for horizontal. A geared, counter-rotating <strong>balancer shaft</strong> cancels the rest, which is why many 150–650 cm³ singles and twins have one. Secondary forces, at twice crank speed, are about r/l (0.25–0.3) of primary."
        },
        {
          "type": "check",
          "q": "m2-21"
        },
        {
          "type": "h3",
          "text": "Main bearings, crankcase and seals"
        },
        {
          "type": "photo",
          "src": "repair-photos/128_hole_tunnel_drilled_machined_two_piece.jpg",
          "caption": "Plain bearing bore in a two-piece crankcase half",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Singles and two-strokes run the crank in ball or roller mains; multis use plain shells. Crankcases split <strong>vertically</strong> (K-Light, CG125, nearly all singles) or <strong>horizontally</strong> (most Japanese fours). Two-strokes need lip seals on both mainshafts to keep the crankcase pressure-tight."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Workshop tip",
          "html": "A two-stroke with a <strong>high idle and hanging revs</strong> is often drawing air past a leaking crank seal or base gasket. And the K-Light manual warns that its thin-walled crankcase must never be struck heavily."
        }
      ]
    },
    {
      "id": "m2-lubrication-cooling",
      "title": "Lubrication and cooling",
      "lead": "Oil and coolant are what keep a running engine from welding itself together. Picking the right oil for a wet clutch and understanding the pressurised cooling system are everyday workshop skills, and one of them carries a real scald risk.",
      "lab": "overview/?mode=4t&part=engine",
      "blocks": [
        {
          "type": "h3",
          "text": "Wet and dry sump"
        },
        {
          "type": "p",
          "html": "In a <strong>wet sump</strong> the oil sits in the bottom of the crankcase, usually shared with the gearbox and wet clutch. A <strong>dry sump</strong> keeps oil in a separate tank, with a scavenge pump returning it; it allows a lower engine and avoids oil surge on steep slopes, at the cost of extra pumps and pipes."
        },
        {
          "type": "plate",
          "id": "F11",
          "caption": "Wet-sump circuit: strainer, trochoid pump, filter, crank and big end, head and cam, gearbox, back to the sump."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Strainer",
              "html": "Mesh screen before the pump (behind the drain plug on the K-Light)."
            },
            {
              "title": "Trochoid pump",
              "html": "Inner rotor with one lobe fewer than the outer; relief valve limits pressure (3–6 bar on multis)."
            },
            {
              "title": "Filter",
              "html": "Small singles: a strainer screen in the sump plus, on the Honda CG125 and similar engines, a <strong>centrifugal filter rotor</strong> on the crank that must be cleaned (the K-Light 125 manual calls for the strainer and filter to be cleaned at the specified intervals). Larger engines: spin-on or cartridge paper filter with bypass."
            },
            {
              "title": "Pressure feed",
              "html": "Crank drillings to the big end; a passage up a stud or pipe to cam and rockers."
            },
            {
              "title": "Splash",
              "html": "Gearbox, cylinder wall and gudgeon pin."
            }
          ]
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Oil capacity",
              "v": "1.1 ± 0.1 L",
              "p": "K-Light at a change; 1.2 L after overhaul"
            },
            {
              "l": "Change interval",
              "v": "3,000 km",
              "p": "K-Light; 6,000–12,000 km on liquid-cooled multis"
            },
            {
              "l": "Pump tip clearance",
              "v": "0.10–0.15 mm",
              "p": "limit 0.25 mm"
            }
          ]
        },
        {
          "type": "p",
          "html": "Check the level with the bike upright on level ground and the dipstick <strong>resting</strong> in the hole, not screwed in."
        },
        {
          "type": "h3",
          "text": "Choosing an oil"
        },
        {
          "type": "p",
          "html": "<strong>SAE J300</strong>: in 10W-40, the <strong>10W</strong> is the cold grade (cranking and pumping limits) and <strong>40</strong> the viscosity at 100 °C (12.5 to under 16.3 mm²/s). <strong>API</strong> (SL, SM, SN, SP) covers wear and deposits. Car oils marked \"Resource Conserving\" contain friction modifiers that make a wet clutch slip, hence <strong>JASO T903</strong>:"
        },
        {
          "type": "table",
          "head": [
            "Class",
            "Friction",
            "Use"
          ],
          "rows": [
            [
              "JASO MA",
              "High",
              "Four-strokes with oil-bathed wet clutch"
            ],
            [
              "JASO MA1",
              "High, lower band",
              "Wet clutch, less demanding"
            ],
            [
              "JASO MA2",
              "Highest band",
              "Wet clutch, often required with catalysts"
            ],
            [
              "JASO MB",
              "Low",
              "Scooters, dry or centrifugal clutches"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb",
          "html": "Wet clutch = <strong>JASO MA/MA2</strong>. Never put JASO MB or an energy-conserving car oil in a bike with a wet clutch."
        },
        {
          "type": "photo",
          "src": "honda-air-cooled.jpg",
          "caption": "An air-cooled single with deep horizontal fins on the cylinder and head, a radiator mounted ahead of it for the oil or coolant circuit, and the round generator and clutch covers on the crankcase below."
        },
        {
          "type": "check",
          "q": "m2-24"
        },
        {
          "type": "h3",
          "text": "Air cooling"
        },
        {
          "type": "p",
          "html": "Fins multiply surface area; they are deepest around the exhaust port and chamber. Air cooling is light and cheap, but temperatures swing with speed and weather, so clearances are larger and compression lower. Oil carries 20–30 % of the heat; mud-packed or broken fins lead to overheating, detonation and seizure."
        },
        {
          "type": "h3",
          "text": "Liquid cooling"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Water jackets",
              "html": "Cast around cylinder and chamber."
            },
            {
              "title": "Water pump",
              "html": "Centrifugal, driven by crank or cam, pushes coolant to the radiator."
            },
            {
              "title": "Thermostat",
              "html": "Wax element keeps coolant in the engine until about <strong>80–85 °C</strong>. Stuck open: runs cold. Stuck closed: overheats fast."
            },
            {
              "title": "Fan",
              "html": "Switched on at about <strong>95–105 °C</strong> when airflow is low."
            },
            {
              "title": "Pressure cap",
              "html": "Holds 0.9–1.4 bar. 50 % glycol boils at about 107 °C open, but not until <strong>125–130 °C</strong> under the cap (about 2.5–3 °C per 0.1 bar)."
            }
          ]
        },
        {
          "type": "p",
          "html": "Coolant is glycol with aluminium-safe inhibitors, 50:50 with deionised water (frost protection to about −35 °C), renewed every two to three years. Continuous bubbles in the header tank point to combustion gas leaking in through a failed head gasket or cracked head."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Hot cooling systems",
          "html": "Never open a radiator cap on a hot engine. The coolant is above its atmospheric boiling point and <strong>flashes to steam</strong> when the pressure is released, causing severe scalds. Wait until the engine is cold and release the cap slowly to its first stop."
        },
        {
          "type": "check",
          "q": "m2-26"
        }
      ]
    },
    {
      "id": "m2-diagnosis",
      "title": "Engine diagnosis and service",
      "lead": "Every engine needs three things: compression, a well-timed spark and the right mixture. Good diagnosis checks them from the least to the most invasive test, with numbers you can compare against the manual.",
      "lab": "overview/?mode=4t&part=spark_plug",
      "blocks": [
        {
          "type": "p",
          "html": "Before dismantling anything, confirm <strong>fuel, battery voltage, air filter and oil level</strong>. The MAVCC tune-up order (plugs, valve clearance, cam chain, ignition timing, air filter, crankcase ventilation, fuel adjustment, oil change) follows because each step depends on the ones before."
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
              "Hard hot starting only",
              "Valve clearance closing up; decompressor stuck; leaking injector",
              "Clearance; compression hot and cold"
            ],
            [
              "Low power, runs smoothly",
              "Blocked filter or exhaust; retarded timing; worn rings; slipping clutch",
              "Filter; timing light; compression"
            ],
            [
              "Blue smoke",
              "Oil burning: rings, bore, stem seals, guides; overfilled sump",
              "Wet compression; smoke on overrun (guides) or load (rings)"
            ],
            [
              "Black smoke",
              "Rich mixture: blocked filter, sensor, leaking injector, choke on",
              "Plug reading; fault codes"
            ],
            [
              "White smoke when warm",
              "Coolant burning: head gasket or cracked head",
              "Coolant level; combustion leak test"
            ],
            [
              "Pinking under load",
              "Detonation: low octane, carbon, lean, hot, over-advanced",
              "Fuel; timing; plug colour"
            ],
            [
              "Deep knock rising with load",
              "Big-end or main bearing wear",
              "Crank play, top end removed"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Compression test"
        },
        {
          "type": "photo",
          "src": "repair-photos/103_engine_compression_testing_2.jpg",
          "caption": "Screw-in compression gauge with hose and adapters",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Prepare",
              "html": "Warm engine, then stop. Clean around the plug before removing it. On EFI disconnect the injector and earth the lead or disconnect the coil."
            },
            {
              "title": "Fit the gauge",
              "html": "Screw the adapter in by hand until it seals: a leak reads falsely low."
            },
            {
              "title": "Crank",
              "html": "<strong>Throttle fully open</strong>, charged battery, crank until the needle stops (4–8 compression strokes). Record."
            },
            {
              "title": "Wet test",
              "html": "Add about 5 mL of oil through the plug hole, crank a few turns, repeat."
            },
            {
              "title": "Refit",
              "html": "Plug to 15 N·m, reconnect the injector."
            }
          ]
        },
        {
          "type": "table",
          "head": [
            "Result",
            "Meaning"
          ],
          "rows": [
            [
              "Dry 1.0–1.2 MPa (K-Light)",
              "Compression sound"
            ],
            [
              "Low dry, rises > 10–15 % wet",
              "Rings, piston or bore (oil sealed the gap)"
            ],
            [
              "Low dry, hardly changes wet",
              "Valves (tight clearance, burnt, bent, poor seat) or head gasket"
            ],
            [
              "Above specification",
              "Heavy carbon build-up"
            ],
            [
              "Multi: > 10 % between cylinders",
              "Significant even if each is in limits"
            ]
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/106_leak_down_testing.jpg",
          "caption": "Leak-down tester kit with two gauges",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "check",
          "q": "m2-28"
        },
        {
          "type": "h3",
          "text": "Leak-down test"
        },
        {
          "type": "p",
          "html": "Set the piston at <strong>TDC compression</strong>, feed regulated air into the cylinder and read the loss: <strong>leakage = (input − cylinder) / input × 100</strong>. Under 10 % is good, 10–20 % shows wear, over 20–30 % needs repair. Then listen: exhaust = exhaust valve; throttle body or airbox = inlet valve; oil filler or breather = rings; radiator bubbles = head gasket."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Lock the crank",
          "html": "Air at several bar on the piston will turn the engine <strong>violently</strong> if it is even a few degrees off TDC. Lock the crank (gear engaged with rear brake on, or a holding tool) and wear safety glasses."
        },
        {
          "type": "check",
          "q": "m2-29"
        },
        {
          "type": "h3",
          "text": "Valve clearance on a rocker-arm single"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Cold engine",
              "html": "Below 35 °C. Remove the valve inspection caps and the timing hole cap."
            },
            {
              "title": "Find TDC compression",
              "html": "Turn the crank the normal way; watch the inlet open and close, then align the <strong>T mark</strong>. Both rockers must have free play."
            },
            {
              "title": "Measure",
              "html": "The 0.05–0.07 mm feeler slides with light drag; one 0.01 mm thicker should not enter."
            },
            {
              "title": "Adjust",
              "html": "Hold the adjuster, slacken the locknut, set the gap, hold the adjuster still and tighten the locknut to 10–15 N·m. Exhaust first, then inlet."
            },
            {
              "title": "Recheck",
              "html": "Tightening can turn the adjuster. Rotate two turns, realign T and check both again."
            }
          ]
        },
        {
          "type": "plate",
          "id": "F10",
          "caption": "Rocker adjuster with screw, locknut and feeler gauge."
        },
        {
          "type": "h3",
          "text": "Cylinder and piston measurement"
        },
        {
          "type": "p",
          "html": "Measure the bore at three heights in two directions (X along the crank, Y across it): six readings. <strong>Out-of-round</strong> = X vs Y at one height; <strong>taper</strong> = top vs bottom in one direction. Wear is greatest at the top of ring travel in Y. <strong>Clearance</strong> = largest bore reading − piston diameter."
        },
        {
          "type": "table",
          "head": [
            "K-Light 125",
            "Standard",
            "Limit"
          ],
          "rows": [
            [
              "Bore",
              "56.500–56.505 mm",
              "56.6 mm"
            ],
            [
              "Out-of-round / taper",
              "–",
              "0.05 mm"
            ],
            [
              "Piston OD (11 mm above skirt bottom)",
              "56.470–56.485 mm",
              "56.43 mm"
            ],
            [
              "Piston-to-cylinder clearance",
              "0.015–0.035 mm",
              "0.17 mm"
            ],
            [
              "Ring end gap",
              "0.15–0.30 mm",
              "0.5 mm"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Worked example: top Y 56.592, bottom Y 56.538, piston 56.46. Taper = 0.054 mm (<strong>over</strong> the 0.05 limit) even though clearance is 0.132 mm (within 0.17). Decision: rebore to the next oversize with matching piston and rings."
        },
        {
          "type": "h3",
          "text": "Two-stroke top-end rebuild: key points"
        },
        {
          "type": "p",
          "html": "Remove head nuts in a cross pattern, lift the cylinder at TDC and <strong>stuff the crankcase mouth with rag</strong>. Never hammer the gudgeon pin (it bends the rod). Many modern bores are nickel-silicon carbide plated and cannot be rebored. Fit the piston arrow toward the exhaust, ring ends at their pins, and new clips fully seated: a clip that comes out destroys the cylinder. Run in for the specified period, often 1–2 hours."
        },
        {
          "type": "photo",
          "src": "repair-photos/113_move_hone_back_forth_cylinder_produce.jpg",
          "caption": "45 degree cross-hatch pattern in a honed bore",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Reading a spark plug"
        },
        {
          "type": "p",
          "html": "Read after steady load, not idling. K-Light plug: <strong>D7RTC, gap 0.7 ± 0.1 mm, 15 N·m</strong>. Set the gap by bending only the earth electrode."
        },
        {
          "type": "table",
          "head": [
            "Appearance",
            "Meaning"
          ],
          "rows": [
            [
              "Light grey or tan",
              "Normal combustion, correct heat range"
            ],
            [
              "Dry black soot",
              "Rich mixture, blocked filter, idling, plug too cold"
            ],
            [
              "Wet black oily",
              "Oil entering (rings, guides, seals; too much premix)"
            ],
            [
              "Chalk-white, blistered, eroded",
              "Overheating: lean, air leak, over-advanced, plug too hot"
            ],
            [
              "Small metal specks",
              "Detonation or piston damage beginning: stop and inspect"
            ]
          ]
        },
        {
          "type": "figure",
          "fig": "afr",
          "caption": "Slide from rich to lean and connect each zone with a plug colour: rich = dry black soot, lean = chalk-white and blistered."
        }
      ]
    }
  ]
};
