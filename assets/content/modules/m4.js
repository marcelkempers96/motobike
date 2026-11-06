/* Moto Zero: Module 4 lessons. Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "drivetrain-chassis",
  "num": "4",
  "title": "Drivetrain and chassis",
  "intro": "How engine torque is switched, multiplied and delivered to the rear tyre, and how the frame, steering, suspension, wheels and brakes turn that torque into controlled motion, with the checks and repairs for each.",
  "pdf": "moto-zero-module-4-drivetrain-chassis.pdf",
  "chapters": [
    {
      "id": "m4-clutch",
      "title": "Primary drive and clutch",
      "lead": "A 125 cc crankshaft spins at up to about 10,000 rpm, but at 90 km/h the rear wheel turns at roughly 800 rpm. The first step down happens right at the crank, in the primary drive, and the clutch sitting behind it lets the rider connect and disconnect all that torque by hand.",
      "lab": "overview/?mode=4t&part=engine",
      "blocks": [
        {
          "type": "h3",
          "text": "Three stages of reduction"
        },
        {
          "type": "p",
          "html": "The total reduction, about <strong>9:1 to 12:1 in top</strong> and <strong>25:1 to 30:1 in first</strong>, is split into three stages: <strong>primary drive</strong> (crank to clutch), <strong>gearbox</strong> and <strong>final drive</strong> (sprockets to rear wheel). Splitting it keeps each stage a sensible size."
        },
        {
          "type": "p",
          "html": "Putting the first reduction <em>ahead</em> of the clutch means the clutch and mainshaft spin at only a quarter to a third of crank speed. That cuts centrifugal load on the basket, oil churning losses, and the inertia that must be synchronised in a gear change."
        },
        {
          "type": "photo",
          "src": "repair-photos/121_i_will_try_add_more_time.jpg",
          "caption": "Centrifugal clutch parts: weights, sprag and outer housing"
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Primary ratio",
              "v": "68/20 = 3.40",
              "p": "i_p = z_basket / z_crank"
            },
            {
              "l": "Clutch speed",
              "v": "2,647 rpm",
              "p": "at 9,000 rpm crank speed"
            },
            {
              "l": "Clutch torque",
              "v": "about 30 N·m",
              "p": "8.9 N·m engine peak × 3.40"
            }
          ]
        },
        {
          "type": "p",
          "html": "Most singles use a <strong>gear primary</strong>: spur teeth are cheap and carry no axial thrust; helical teeth are quieter but push the basket sideways. Large multis often use a chain primary. <strong>Cushion springs</strong> between the primary gear and basket soak up firing pulses; when worn they show as play and a <em>clonk</em> on and off the throttle."
        },
        {
          "type": "h3",
          "text": "The wet multiplate clutch"
        },
        {
          "type": "plate",
          "id": "F13",
          "caption": "Wet multiplate clutch, exploded: basket, friction and steel plates, hub, pressure plate, springs and release mechanism."
        },
        {
          "type": "photo",
          "src": "repair-photos/120_centrifugal_clutch_shoes.jpg",
          "caption": "Centrifugal clutch shoes, as used on step-throughs and scooters: they fly out and grip the drum as engine speed rises."
        },
        {
          "type": "engine",
          "shot": "03-clutch-cutaway-pulled",
          "view": "clutch",
          "caption": "The clutch cut away with the lever pulled: the pressure plate lifts and the friction and steel plates separate. Hold the clutch and watch them part."
        },
        {
          "type": "engine",
          "shot": "06-kickstart",
          "view": "start",
          "caption": "Kick starting: the kick shaft turns the crank through the kick idle gear and the clutch basket."
        },
        {
          "type": "model",
          "file": "clutch",
          "caption": "The assembled wet multiplate clutch: basket with primary driven gear, pressure plate and springs."
        },
        {
          "type": "photo",
          "src": "render-engine-exploded.jpg",
          "caption": "The same clutch exploded along the mainshaft, in assembly order from the crankcase outward: driven gear and basket with its six slots, friction and steel plates, splined hub, pressure plate, the four springs and their bolts, the release bearing and lift rod, and finally the clutch cover. The friction plates lock to the basket by their outer tabs and turn with the engine; the steel plates lock to the hub by their inner teeth and turn with the gearbox."
        },
        {
          "type": "photo",
          "src": "render-engine-xray.jpg",
          "caption": "X-ray view of a horizontal single-cylinder commuter engine with the clutch cover rendered transparent. The small primary drive gear on the crankshaft meshes with the large driven gear riveted to the clutch basket; inside the basket the friction plates (brown) alternate with the steel plates, and four coil springs clamp the stack through the pressure plate."
        },
        {
          "type": "model",
          "file": "clutch_exploded",
          "caption": "The same clutch exploded along its axis: basket, alternating friction and steel plates, hub, pressure plate, springs and bolts."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Clutch basket",
              "html": "Slotted aluminium cup driven by the primary gear, turning freely on the mainshaft."
            },
            {
              "title": "Friction plates",
              "html": "Lined plates whose <strong>outer tabs</strong> lock into the basket slots: they turn with the engine. Four or five on a 125."
            },
            {
              "title": "Steel plates",
              "html": "Plain discs whose <strong>inner teeth</strong> lock onto the hub: they turn with the gearbox."
            },
            {
              "title": "Clutch hub",
              "html": "Splined to the mainshaft and held by a locknut (50–60 N·m on the K-Light 125)."
            },
            {
              "title": "Pressure plate and springs",
              "html": "Four to six coil springs (or a diaphragm spring) clamp the stack."
            },
            {
              "title": "Release mechanism",
              "html": "Lever pull compresses the springs; the stack opens by about 0.5–1.0 mm and the plates slide past each other in oil."
            }
          ]
        },
        {
          "type": "p",
          "html": "A <strong>cable</strong> release needs free play set at the lever (<strong>10–15 mm</strong> on the K-Light 125). Too little holds the clutch partly open and causes <em>slip</em>; too much prevents full release and causes <em>drag</em>. A <strong>hydraulic</strong> release compensates for plate wear automatically and is bled like a brake."
        },
        {
          "type": "photo",
          "src": "repair-photos/118_clutches_basically_round_baskets_filled_alternating.jpg",
          "caption": "Clutch engaged and disengaged by the lever"
        },
        {
          "type": "photo",
          "src": "repair-photos/118_some_activate_clutch_cover_some_use.jpg",
          "caption": "Cable-operated clutch release, shown in section"
        },
        {
          "type": "h3",
          "text": "How much torque can it carry?"
        },
        {
          "type": "p",
          "html": "Slip torque: <strong>T = μ × F × r_m × n</strong>, with r_m ≈ (r_o + r_i)/2 and n the number of friction <em>faces</em> (two per friction plate). Wet μ is only about 0.10–0.15."
        },
        {
          "type": "table",
          "head": [
            "Input",
            "Worked example"
          ],
          "rows": [
            [
              "Friction plates",
              "5, so n = 10 faces"
            ],
            [
              "Lining radii",
              "35–50 mm, r_m = 42.5 mm"
            ],
            [
              "Spring force",
              "4 × 240 N = 960 N"
            ],
            [
              "μ",
              "0.13"
            ],
            [
              "Slip torque",
              "0.13 × 960 × 0.0425 × 10 ≈ 53 N·m"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Against the 30 N·m it must carry, that is a margin of about <strong>1.75</strong>, covering firing peaks and spring fatigue. The same formula explains every slip fault: worn linings or short springs lower F; glazed linings or the wrong oil lower μ."
        },
        {
          "type": "check",
          "q": "m4-02"
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Oil and the wet clutch",
          "html": "Car oils labelled <em>Energy Conserving</em> or with friction modifiers lower μ and make the clutch slip. Use <strong>JASO MA or MA2</strong>; JASO MB is for dry-clutch scooters only. If a clutch slips after an oil change, change back to JASO MA oil before dismantling anything."
        },
        {
          "type": "h3",
          "text": "Slipper, assist and centrifugal clutches"
        },
        {
          "type": "p",
          "html": "An <strong>assist-and-slipper</strong> clutch puts ramps between hub and pressure plate. Under drive the ramps pull the plate into the stack, so lighter springs fit and lever effort falls by a quarter to a third. Under back-torque on a hard downshift they push it out, so the clutch slips instead of hopping the rear tyre."
        },
        {
          "type": "p",
          "html": "Twist-and-go scooters use a dry <strong>centrifugal shoe clutch</strong> on the driven pulley of the CVT: three shoes swing out against a bell, typically engaging at about 2,800–4,000 rpm."
        },
        {
          "type": "h3",
          "text": "Diagnosing clutch faults"
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Likely cause",
            "Remedy"
          ],
          "rows": [
            [
              "Revs rise, speed does not (slip)",
              "No free play; worn plates; weak springs; wrong oil",
              "Adjust to 10–15 mm; replace plates or springs as a set; JASO MA oil"
            ],
            [
              "Creeps with lever pulled (drag)",
              "Excess free play; warped steels; notched basket",
              "Adjust; replace plates; dress or replace basket"
            ],
            [
              "Judder on take-off",
              "Glazed or oily linings; warped plates; loose engine mount",
              "Replace plates; torque mounts"
            ],
            [
              "Clonk on throttle opening",
              "Worn cushion springs; loose hub nut",
              "Replace basket; re-torque and lock nut"
            ]
          ]
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Friction plate",
              "v": "2.9–3.0 mm",
              "p": "service limit 2.6 mm (K-Light 125)"
            },
            {
              "l": "Spring free length",
              "v": "35.45–36.5 mm",
              "p": "limit 34.2 mm; replace as a set"
            },
            {
              "l": "Steel plate warp",
              "v": "0.10–0.20 mm",
              "p": "typical limit, on a surface plate"
            }
          ]
        },
        {
          "type": "p",
          "html": "The <strong>kickstart</strong> ratchet rides a helical spline: pressing the lever lets it engage the kick gear; at the end of the stroke the return spring turns the shaft back and a tab on the ratchet rides up the fixed stopper plate, pulling it clear."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Open the <a href=\"../overview/?mode=4t&view=diagram\">four-stroke course plate</a> and click the clutch cover hotspot: the clutch sits behind the right-hand crankcase cover, on the gearbox input shaft. Then open the <a href=\"../overview/?mode=4t&part=engine\">engine</a>, set the RPM slider to 3000, 6000 and 9000 rpm and work out the clutch basket speed behind a 3.4:1 primary reduction (about 880, 1760 and 2650 rpm)."
        },
        {
          "type": "check",
          "q": "m4-04"
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "d3ju716gxOU",
              "title": "Cd70 motorbike pickup increase just 1 item | clutch setting | clutch problem solved",
              "channel": "Ustaad Abdul Ghafoor",
              "channel_url": "http://www.youtube.com/@UstaadAbdulGhafoor",
              "duration": "8:19",
              "role": "How-to",
              "note": "Set the clutch adjuster on a Honda CD70; the pickup claim is unverified, values for that model."
            },
            {
              "id": "JhTf7cBeGcs",
              "title": "Understanding Motorcycle Clutch",
              "channel": "TecknoMechanics",
              "channel_url": "http://www.youtube.com/@TecknoMechanics",
              "duration": "5:33",
              "role": "How it works",
              "note": "How a wet multi-plate clutch engages and frees, and why free play matters for slip and drag."
            },
            {
              "id": "jAZd_3o5TQ8",
              "title": "How a Motorcycle Clutch Works",
              "channel": "EMecha3D",
              "channel_url": "http://www.youtube.com/@EMecha3D",
              "duration": "4:20",
              "role": "How it works",
              "note": "Animation of a clutch: basket, plates, springs and lever; shows how drag and slip arise."
            }
          ]
        }
      ]
    },
    {
      "id": "m4-gearbox",
      "title": "Gearbox",
      "lead": "An engine only makes useful torque in a narrow speed band: the K-Light 125 peaks at 8.9 N·m at 7,500 rpm and 7.8 kW at 9,000 rpm. The gearbox keeps it in that band from walking pace to top speed, one positive click at a time.",
      "lab": "overview/?mode=4t&part=engine",
      "blocks": [
        {
          "type": "h3",
          "text": "Constant mesh: every gear always turning"
        },
        {
          "type": "p",
          "html": "Almost every motorcycle box is a <strong>constant-mesh, two-shaft, sequential</strong> type. The <strong>mainshaft</strong> carries the clutch; the <strong>countershaft</strong> carries the front sprocket. Every gear pair is always meshed; what changes is which pair is <em>locked</em> to its shaft."
        },
        {
          "type": "table",
          "head": [
            "Gear type",
            "How it sits on the shaft",
            "Job"
          ],
          "rows": [
            [
              "Fixed",
              "Integral with or pressed on the shaft",
              "Always drives"
            ],
            [
              "Free",
              "Turns on a bush or needle bearing",
              "Carries torque only when dogged to a neighbour"
            ],
            [
              "Sliding",
              "Splined: turns with the shaft, slides axially",
              "Moved by a fork to engage its dogs"
            ]
          ]
        },
        {
          "type": "plate",
          "id": "F14",
          "caption": "Constant-mesh five-speed gearbox: fixed, free and sliding gears, dogs, forks and shift drum."
        },
        {
          "type": "photo",
          "src": "repair-photos/115_broken_teeth.jpg",
          "caption": "Broken gear teeth: what shock loads and missed shifts do to a constant-mesh gearbox."
        },
        {
          "type": "engine",
          "shot": "02-gearbox-function-colours",
          "view": "gearbox",
          "caption": "The five-speed constant-mesh gearbox in function colours: red gears slide on splines, blue gears spin free, orange gears are fixed. Shift through 1-N-2-3-4-5."
        },
        {
          "type": "engine",
          "shot": "04-shift-drum-star-detent",
          "view": "shift",
          "caption": "The shift drum and star detent: each press of the gear pedal turns the drum one step and the forks slide the dog gears."
        },
        {
          "type": "h3",
          "text": "Dogs and why gears jump out"
        },
        {
          "type": "p",
          "html": "Dogs carry the full gear torque on a few square millimetres. Their driving faces are <strong>back-cut by 2–4°</strong> so torque pulls the gears <em>together</em>. Once the edges round off, the force reverses and pushes them apart: rounded dogs are the root cause of almost every case of <strong>jumping out of gear</strong>. Dogs are always replaced in pairs."
        },
        {
          "type": "photo",
          "src": "repair-photos/115_vertically_split.jpg",
          "caption": "Vertically split crankcase with gears in place"
        },
        {
          "type": "h3",
          "text": "From pedal to drum"
        },
        {
          "type": "plate",
          "id": "TR01",
          "caption": "Gear shift mechanism: drum with tracks, forks, shift shaft, ratchet, detent star, stopper arm and neutral switch."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Pedal stroke",
              "html": "The gearshift shaft turns a shift arm whose spring-loaded pawls rotate the drum one step."
            },
            {
              "title": "Drum tracks move forks",
              "html": "Each fork pin rides a groove; drum rotation slides its gear sideways at the right moment."
            },
            {
              "title": "Detent holds it",
              "html": "A spring-loaded stopper arm and roller drop into a notch on the star plate, snapping the drum fully into position."
            },
            {
              "title": "Return spring",
              "html": "Centres the shaft for the next stroke: one stroke, one gear."
            }
          ]
        },
        {
          "type": "p",
          "html": "Neutral sits at a <strong>half-step between first and second</strong>, so the rider can always find first by pressing fully down, and an emergency downshift ends in first, not neutral."
        },
        {
          "type": "photo",
          "src": "repair-photos/115_drum_shifters_drum_slider_forks_shaft.jpg",
          "caption": "Shift drum with shift forks"
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Fork claw",
              "v": "4.93–5.00 mm",
              "p": "limit 4.7 mm (K-Light 125)"
            },
            {
              "l": "Drum groove",
              "v": "7.05–7.15 mm",
              "p": "limit 7.3 mm"
            },
            {
              "l": "Fork shaft",
              "v": "11.97–12.00 mm",
              "p": "limit 11.95 mm"
            }
          ]
        },
        {
          "type": "p",
          "html": "A <strong>quickshifter</strong> senses pedal pre-load and the ECU cuts ignition or injection for about 80–100 ms at low rpm down to about 50 ms near the limiter. The dogs unload and the pre-loaded drum completes the shift. Kawasaki’s <strong>Positive Neutral Finder</strong> uses steel balls that block shifts past neutral when the countershaft is stationary."
        },
        {
          "type": "photo",
          "src": "repair-photos/115_gear_shifters.jpg",
          "caption": "Gear shift shaft on a modern engine"
        },
        {
          "type": "check",
          "q": "m4-05"
        },
        {
          "type": "h3",
          "text": "Ratios multiply"
        },
        {
          "type": "p",
          "html": "<strong>i_overall = i_p × i_gear × i_final</strong>, wheel rpm = engine rpm / i_overall, and speed (km/h) = wheel rpm × C × 60 / 1000, where C is the rolling circumference: geometric circumference less about <strong>3 %</strong>."
        },
        {
          "type": "p",
          "html": "Example rear tyre 130/90-15: sidewall 117 mm, diameter 615 mm, rolling C ≈ <strong>1.874 m</strong>. With a 68/20 primary and a 41/14 final drive (the 14T front is an assumed typical value):"
        },
        {
          "type": "table",
          "head": [
            "Gear",
            "Teeth",
            "Ratio",
            "Overall",
            "km/h at 9,000 rpm"
          ],
          "rows": [
            [
              "1",
              "33/12",
              "2.750",
              "27.38",
              "37.0"
            ],
            [
              "2",
              "25/14",
              "1.786",
              "17.78",
              "56.9"
            ],
            [
              "3",
              "26/19",
              "1.368",
              "13.63",
              "74.3"
            ],
            [
              "4",
              "24/22",
              "1.091",
              "10.86",
              "93.2"
            ],
            [
              "5",
              "18/20",
              "0.900",
              "8.96",
              "112.9"
            ]
          ]
        },
        {
          "type": "figure",
          "fig": "gearing",
          "caption": "Change front and rear sprocket teeth and watch the final ratio and road speed per 1000 rpm. Try 14T versus 13T at the front."
        },
        {
          "type": "p",
          "html": "The bike tops out at about 90 km/h, so fifth is an <em>overdrive</em> for quiet, frugal cruising. A 13T front sprocket raises i_final to 3.154 and drops the 9,000 rpm speed in fifth to 105 km/h, improving acceleration in every gear. Gear steps shrink towards top (1.54, 1.31, 1.25, 1.21), a roughly geometric progression."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Order of diagnosis",
          "html": "Many shifting complaints are clutch complaints. Before splitting the crankcase, confirm the clutch fully releases, the oil is the right grade and level, and the external linkage moves freely."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Set the <a href=\"../overview/?mode=4t&part=engine\">engine</a> to 7500 and then 9000 rpm and calculate the mean piston speed for the K-Light 125 stroke of 49.5 mm (12.4 and 14.9 m/s). Then open the <a href=\"../overview/?mode=4t&part=chain\">chain and final drive</a>, hold REV and read engine speed, wheel speed and road speed together, and compare them with the road speeds in the table above to see how much of the speed range each gear covers."
        },
        {
          "type": "check",
          "q": "m4-07"
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "g8xnIFf4id4",
              "title": "How a motorcycle transmission works (Animation)",
              "channel": "TecknoMechanics",
              "channel_url": "http://www.youtube.com/@TecknoMechanics",
              "duration": "6:08",
              "role": "How it works",
              "note": "Animation of a constant-mesh sequential gearbox: gears, dogs, shift drum and forks. Shows shift drum, forks and dogs, which explains false neutrals, jumping out and hard shifts."
            },
            {
              "id": "mlBhPZdVqb8",
              "title": "Motorcycle Quickshifters Explained | MC Garage",
              "channel": "Motorcyclist Magazine",
              "channel_url": "http://www.youtube.com/@MotorcyclistMag",
              "duration": "4:31",
              "role": "How it works",
              "note": "How a quickshifter cuts ignition or fuel for a clutchless change; only on bikes made or fitted for it."
            },
            {
              "id": "E2CybLSrN5Q",
              "title": "How a Motorcycle Transmission Works! (Animation)",
              "channel": "Thomas Schwenke",
              "channel_url": "http://www.youtube.com/@ThomasSchwenke-knowledge",
              "duration": "3:32",
              "role": "How it works",
              "note": "Animation of a sequential gearbox: dogs, forks and shift drum; helps explain why a bike jumps out of gear."
            }
          ]
        }
      ]
    },
    {
      "id": "m4-final-drive",
      "title": "Final drive and CVT",
      "lead": "The last stage carries torque from the gearbox to the rear wheel: by chain on most bikes, by belt or shaft on some, and on scooters by a belt running between two pulleys that change size as you ride.",
      "lab": "overview/?mode=4t&part=chain",
      "blocks": [
        {
          "type": "h3",
          "text": "Roller chain"
        },
        {
          "type": "photo",
          "src": "repair-photos/148_now_good_time_look_any_chain.jpg",
          "caption": "Chain breaker on the rear chain"
        },
        {
          "type": "photo",
          "src": "repair-photos/148_special_grooves.jpg",
          "caption": "X-ring chain cutaway showing sealing rings"
        },
        {
          "type": "p",
          "html": "A chain alternates <strong>inner links</strong> (plates, bushings, rollers) and <strong>outer links</strong> (plates and pins through the bushings). The pin-to-bushing joint is what wears, so every pitch lengthens: the chain “stretches”. <strong>O-ring</strong> and <strong>X-ring</strong> chains seal factory grease into each joint and last two to three times as long as plain chains."
        },
        {
          "type": "p",
          "html": "Size code: first digit = pitch in <strong>eighths</strong> of an inch; last two digits = roller width in <strong>eightieths</strong> of an inch."
        },
        {
          "type": "table",
          "head": [
            "Size",
            "Pitch",
            "Roller width",
            "Typical use"
          ],
          "rows": [
            [
              "415",
              "12.70 mm",
              "4.76 mm",
              "Mopeds, 50 cc racers"
            ],
            [
              "428",
              "12.70 mm",
              "7.94 mm",
              "100–200 cc commuters, K-Light 125"
            ],
            [
              "520",
              "15.875 mm",
              "6.35 mm",
              "250–700 cc, most off-road"
            ],
            [
              "525",
              "15.875 mm",
              "7.94 mm",
              "600–1,000 cc road"
            ],
            [
              "530",
              "15.875 mm",
              "9.53 mm",
              "Large road bikes"
            ]
          ]
        },
        {
          "type": "plate",
          "id": "F15",
          "caption": "Chain final drive: chain section, slack measured at the midpoint of the lower run, and a 20-link wear measurement."
        },
        {
          "type": "model",
          "file": "chain_sprockets",
          "caption": "Chain and sprockets: a 15-tooth gearbox sprocket and 42-tooth rear sprocket, a 2.8:1 final drive."
        },
        {
          "type": "photo",
          "src": "render-chain.jpg",
          "caption": "A 428 O-ring chain on a 42-tooth rear sprocket: the chain wraps half the sprocket, each roller sits in a tooth seat on the pitch circle, gold outer plates alternate with dark inner plates, and the sprocket is bolted to the hub carrier with six nuts."
        },
        {
          "type": "model",
          "file": "rear_sprocket",
          "caption": "A 42-tooth rear sprocket: check for hooked or thinned teeth whenever the chain is replaced."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Chain",
              "v": "428 × 134 links",
              "p": "K-Light 125, nominal 1,701.8 mm"
            },
            {
              "l": "Slack",
              "v": "20–40 mm",
              "p": "at the tightest point, lower run"
            },
            {
              "l": "Wear limit",
              "v": "1.5–2 %",
              "p": "about 129 mm over 10 pitches (new 127.0 mm)"
            },
            {
              "l": "Rear axle nut",
              "v": "100–113 N·m",
              "p": "K-Light 125"
            }
          ]
        },
        {
          "type": "p",
          "html": "A spring-clip master link fits with its <strong>open end facing away from the direction of travel</strong>. Small front sprockets wear fastest; a front below 13–14 teeth on 428 or 520 chain is avoided on road bikes. Because a stretched chain wears sprockets to its own pitch, <strong>chain and both sprockets are replaced together</strong>."
        },
        {
          "type": "photo",
          "src": "repair-photos/148_big_nut_lock_washer.jpg",
          "caption": "Front sprocket nut with bent lock tab"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Prepare",
              "html": "Ignition off, neutral, bike upright on level ground. Never turn the wheel by the chain with the engine running."
            },
            {
              "title": "Find the tight spot",
              "html": "Rotate the wheel; measure slack at the midpoint of the lower run at its tightest point. If slack varies by more than about 10 mm, the chain or sprockets are unevenly worn."
            },
            {
              "title": "Measure wear",
              "html": "Pull the chain taut and measure over 10 or 20 pitches in two or three places."
            },
            {
              "title": "Adjust",
              "html": "Loosen axle nut and locknuts, turn both adjusters equally, check alignment marks and sight down the chain. Torque the axle nut and recheck slack."
            },
            {
              "title": "Clean and lubricate",
              "html": "Neutral cleaner only (no petrol, solvent or steam on O-rings). Lube the inside of the lower run, warm, every 500–800 km or after rain."
            }
          ]
        },
        {
          "type": "photo",
          "src": "scooter-cvt-workshop.jpg",
          "caption": "A scooter unit-swing engine on the centre stand with the CVT cover removed: the finned fan of the drive pulley, the cogged V-belt and the driven pulley with its clutch bell sit directly in front of the rear wheel, and the swingarm pivot is visible at the front of the crankcase."
        },
        {
          "type": "h3",
          "text": "Try it: chain and sprockets"
        },
        {
          "type": "animation",
          "part": "chain",
          "mode": "4t",
          "caption": "Hold REV and watch the small front sprocket drive the big rear one 2.6 times slower. The graph gives road speed against engine speed in each gear."
        },
        {
          "type": "check",
          "q": "m4-09"
        },
        {
          "type": "gearing"
        },
        {
          "type": "h3",
          "text": "Belt and shaft"
        },
        {
          "type": "p",
          "html": "Toothed belts are quiet, clean and need no lube, and are common on electric bikes, but are wider and cannot be split. A <strong>shaft drive</strong> uses bevel gears in their own oil (typically 80W-90 hypoid) and loses about 2–4 % more power than a clean chain. Its reaction torque lifts the rear on acceleration (<strong>jacking</strong>); BMW’s Paralever and Moto Guzzi’s CARC add a torque arm to cancel it."
        },
        {
          "type": "photo",
          "src": "repair-photos/120_automatic_clutch.jpg",
          "caption": "Scooter belt drive in low and high ratio"
        },
        {
          "type": "plate",
          "id": "TR02",
          "caption": "Final drive types: chain and sprockets, toothed belt, and shaft with bevel gears."
        },
        {
          "type": "variants",
          "title": "Final drive types",
          "intro": "How the drive reaches the rear wheel on six machines. Shaft drive, described above, is not modelled here. Repair pages: <a href=\"../repair/parts/chain/\">chain</a>, <a href=\"../repair/parts/rear_sprocket/\">rear sprocket</a>, <a href=\"../repair/parts/cvt_belt/\">CVT belt</a>.",
          "items": [
            {
              "model": "bike_classic_4t__chain",
              "name": "Open roller chain",
              "what": "A chain from the gearbox sprocket to the rear sprocket, with a guard over the top run.",
              "good_for": "Light, efficient and cheap; gearing changes with a sprocket swap.",
              "conditions": "All road riding, when kept clean and lubricated.",
              "watch": "Slack, stretch, tight spots and hooked teeth. Lubricate after wet rides."
            },
            {
              "model": "bike_boda_boda__chain",
              "name": "Fully enclosed chain",
              "what": "The chain runs inside a full chain case on the boda boda.",
              "good_for": "The chain stays clean and lubricated far longer.",
              "conditions": "Dust, rain, mud and heavy daily use.",
              "watch": "The case hides wear, so slack is checked on schedule rather than by eye."
            },
            {
              "model": "bike_cruiser__chain",
              "name": "Toothed belt",
              "what": "A toothed rubber belt from the gearbox to a pulley on the rear hub, with a guard.",
              "good_for": "Quiet, clean, long life and no lubrication.",
              "conditions": "Paved roads.",
              "watch": "A stone between belt and pulley can crack or strip teeth. A belt cannot be split, so fitting one can mean removing the swingarm."
            },
            {
              "model": "bike_scooter__cvt",
              "name": "CVT belt drive",
              "what": "A V-belt between two variable pulleys, then a reduction gearbox to the rear axle, inside the swinging engine unit.",
              "good_for": "Automatic, smooth, no gear changes.",
              "conditions": "City traffic.",
              "watch": "Belt width wear, flat-spotted rollers and a slipping clutch. Dust and heat in the case."
            },
            {
              "model": "bike_vintage_vtwin__chain",
              "name": "Chains and a separate gearbox, vintage",
              "what": "An enclosed primary chain to a separate three-speed gearbox, then an open chain to a 36-tooth rear sprocket.",
              "good_for": "Each part can be removed and repaired on its own.",
              "conditions": "Period roads at steady speed.",
              "watch": "Primary and rear chains have separate adjustments. The open chain needs frequent oil."
            },
            {
              "model": "bike_pioneer__chain",
              "name": "Flat belt and pedal chain, about 1901",
              "what": "A flat leather belt from the engine to a belt rim on the rear wheel, and a pedal chain on the other side.",
              "good_for": "Smooth drive that slips rather than breaking parts.",
              "conditions": "Dry weather.",
              "watch": "Slips when wet or loose, and stretches. Pedalling helps on hills."
            }
          ]
        },
        {
          "type": "h3",
          "text": "The scooter CVT"
        },
        {
          "type": "plate",
          "id": "F16",
          "caption": "Scooter CVT at low ratio (pulling away) and high ratio (cruising)."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Idle",
              "html": "Drive pulley open (small belt radius), driven pulley closed (large radius): about <strong>2.4–2.8:1</strong>."
            },
            {
              "title": "Revs rise",
              "html": "Six rollers fly outwards on their ramps and squeeze the variator halves together, so the belt climbs."
            },
            {
              "title": "Belt sinks at the back",
              "html": "The fixed-length belt pulls deeper into the driven pulley, opening it against the contra spring."
            },
            {
              "title": "Full speed",
              "html": "About <strong>0.8–0.9:1</strong>, a total spread of about 3:1, while the engine holds nearly constant rpm."
            },
            {
              "title": "Kickdown",
              "html": "Open the throttle hard at speed and the torque cam squeezes the driven pulley, forcing a lower ratio."
            }
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb: roller weights",
          "html": "<strong>Lighter rollers</strong>: higher rpm, harder acceleration, more noise and fuel. <strong>Heavier rollers</strong>: calmer and more economical, weaker uphill. Typical 125 cc scooters use six rollers of about 13–20 g; 1–2 g per roller moves acceleration rpm by very roughly a few hundred rpm."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Belt dust",
          "html": "Clean CVT dust with a vacuum, never compressed air: dust from older belts and clutch linings is a respiratory hazard."
        },
        {
          "type": "check",
          "q": "m4-12"
        },
        {
          "type": "h3",
          "text": "Job sheet 4.3.2: CVT belt and roller inspection"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Open the case cold",
              "html": "Remove the CVT cover, noting any intake duct, and vacuum out the belt dust (never compressed air)."
            },
            {
              "title": "Strip the drive pulley",
              "html": "Hold the variator with the holding tool, remove the nut and fixed half, slip the belt off and withdraw the movable half with boss, rollers and ramp plate kept together."
            },
            {
              "title": "Measure the belt",
              "html": "Measure the width across the top face at several points; a belt below the limit (typically about 1 mm under new) rides low in the drive pulley and costs top speed. Replace it if cracked across the cogs, glazed, frayed or oily."
            },
            {
              "title": "Rollers, ramps and boss",
              "html": "Measure each roller diameter and look for flat spots; replace rollers only as a set. Check the ramp faces for grooving and that the movable half slides on the boss without rocking; grease the boss bore only."
            },
            {
              "title": "Driven pulley and clutch",
              "html": "Check guide pins and torque cam slots, contra spring free length, clutch lining (replace below about 1.5–2 mm or the manual limit) and the bell for scoring or ovality."
            },
            {
              "title": "Reassemble and test",
              "html": "Clean both pulley faces with brake cleaner, fit the belt with its arrow forward, press the driven pulley open so the belt sits deep, torque the variator nut, turn the engine over to seat the belt and road test, noting acceleration rpm and top speed."
            },
            {
              "title": "Pass criteria",
              "html": "Belt above the width limit with no cracks or glazing, rollers round and equal, variator free, clutch lining and bell within limits, no slip or judder on take-off."
            }
          ]
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "zB4DsHV8SAQ",
              "title": "Motorcycle Chain Adjustment Done Right",
              "channel": "CanyonChasers",
              "channel_url": "http://www.youtube.com/@CanyonChasers",
              "duration": "5:51",
              "role": "How-to",
              "note": "Adjust chain slack at the tightest spot and keep the wheel aligned; use your manual's slack figure."
            },
            {
              "id": "Tqu7WGELU5s",
              "title": "How To Adjust a Motorcycle Chain and Sprockets at RevZilla.com",
              "channel": "RevZilla",
              "channel_url": "http://www.youtube.com/@RevZilla",
              "duration": "14:15",
              "role": "How-to",
              "note": "Check wear, clean, lube and adjust a chain and inspect sprockets; use your manual's slack figure."
            },
            {
              "id": "9cKbzUgFdS0",
              "title": "How a Scooter Transmission works",
              "channel": "TecknoMechanics",
              "channel_url": "http://www.youtube.com/@TecknoMechanics",
              "duration": "3:33",
              "role": "How it works",
              "note": "How a scooter CVT works: belt, variator and clutch. Not the same as a geared motorcycle box."
            }
          ]
        }
      ]
    },
    {
      "id": "m4-frame-steering",
      "title": "Frame and steering geometry",
      "lead": "The frame holds the steering axis, swingarm pivot and engine in fixed relation under braking, cornering and bumps. A few degrees of rake and a few millimetres of trail decide whether the bike feels calm or nimble.",
      "lab": "overview/?mode=4t&part=frame",
      "blocks": [
        {
          "type": "h3",
          "text": "Frame types"
        },
        {
          "type": "plate",
          "id": "FB01",
          "caption": "Motorcycle frame types."
        },
        {
          "type": "model",
          "file": "frame_cradle",
          "caption": "A classic double-cradle steel frame, the layout of most air-cooled roadsters."
        },
        {
          "type": "table",
          "head": [
            "Frame",
            "Construction",
            "Where used"
          ],
          "rows": [
            [
              "Steel tube cradle",
              "Tubes run under the engine to the pivot; cheap, easy to weld, fatigue tolerant",
              "Commuters (Honda CG125, K-Light 125)"
            ],
            [
              "Backbone (spine)",
              "Single tube or pressed spine with engine hung below",
              "Step-throughs, small trail bikes"
            ],
            [
              "Aluminium twin-spar",
              "Large beams on the shortest path head-to-pivot; stiff and light",
              "Sports bikes, modern motocross"
            ],
            [
              "Trellis",
              "Triangulated lattice of short straight tubes",
              "Associated with Ducati, KTM"
            ],
            [
              "Stressed engine / monocoque",
              "Engine or battery case carries load",
              "Some sports and electric bikes"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Aluminium has about <strong>a third of the density and a third of the stiffness</strong> of steel, so beams are bigger with thicker walls and still weigh less. After a crash, measure head to pivot and head to rear axle on both sides: a few millimetres of difference means a twist that makes the bike pull or weave."
        },
        {
          "type": "h3",
          "text": "Rake, offset and trail"
        },
        {
          "type": "plate",
          "id": "F17",
          "caption": "Steering geometry: rake, trail, offset and wheelbase."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Rake",
              "v": "25–27°",
              "p": "commuters; sports 23–25°, cruisers 30–34°"
            },
            {
              "l": "Trail",
              "v": "90–110 mm",
              "p": "commuters; sports 85–100, cruisers 120–150"
            },
            {
              "l": "Wheelbase",
              "v": "1,440 mm",
              "p": "K-Light 125"
            }
          ]
        },
        {
          "type": "p",
          "html": "<strong>trail = (R × sin θ − d) / cos θ</strong>, where R is the front tyre radius, θ the rake and d the fork offset. For a 90/90-17 front (R ≈ 297 mm) with an assumed 26° rake and 30 mm offset: (297 × 0.4384 − 30) / 0.8988 ≈ <strong>111 mm</strong>."
        },
        {
          "type": "photo",
          "src": "repair-photos/143_align_front_wheel_2.jpg",
          "caption": "Loosened fork bolts while aligning the front wheel"
        },
        {
          "type": "figure",
          "fig": "steering-geometry",
          "caption": "Slide rake and offset and watch trail change. More offset cuts trail; more rake adds it."
        },
        {
          "type": "p",
          "html": "Trail makes the front <strong>self-centring</strong>, like a shopping-trolley caster. More rake and trail: stability, slower steering. Less: quicker steering but more risk of <em>wobble</em> (a 4–10 Hz oscillation) or <em>kickback</em>. Under braking the fork compresses, rake steepens and trail falls by <strong>10–20 mm</strong>, which is why bikes turn quicker on the brakes."
        },
        {
          "type": "check",
          "q": "m4-13"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "A damper treats the symptom",
          "html": "A steering damper resists fast steering movement. But a new wobble is first chased through tyres and pressures, wheel alignment, steering head bearings, fork alignment in the clamps and luggage loading."
        },
        {
          "type": "h3",
          "text": "Steering head bearings"
        },
        {
          "type": "p",
          "html": "Loose <strong>ball</strong> bearings (K-Light 125: 1/4 in balls) make point contact and are prone to <strong>brinelling</strong>: dents where the balls sit straight-ahead, felt as notchy steering at the centre. <strong>Taper rollers</strong> carry load on line contact and handle braking loads better. Too loose: clunk under braking and wobble. Too tight: heavy steering and a slow weave."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Check",
              "html": "Front brake on, rock the bike and feel the gap at the lower clamp. Lift the front: bars should fall from centre to lock with no notch."
            },
            {
              "title": "Release",
              "html": "Loosen the fork top-clamp pinch bolts and top clamp centre nut."
            },
            {
              "title": "Seat and set",
              "html": "Loosen the locknut, seat the bearings, turn lock to lock, then set the adjusting nut to <strong>2–2.5 N·m</strong> with the torque wrench at right angles to the steering nut wrench."
            },
            {
              "title": "Lock",
              "html": "Hold the adjusting nut and tighten the locknut to <strong>70 N·m</strong>; fork pinch bolts 22–29 N·m."
            },
            {
              "title": "Recheck and road test",
              "html": "No free play, no notch, no clunk or weave. Balls, races and seals are replaced as a set."
            }
          ]
        },
        {
          "type": "check",
          "q": "m4-15"
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "uDmn-zngFRY",
              "title": "How To Check Your Wheel Alignment | MC Garage",
              "channel": "Motorcyclist Magazine",
              "channel_url": "http://www.youtube.com/@MotorcyclistMag",
              "duration": "3:30",
              "role": "How-to",
              "note": "Check that the wheels line up with a straight edge or string, not only the adjuster marks."
            },
            {
              "id": "IzXE32thS1g",
              "title": "Tank Slappers and the Quest for Perfect Suspension",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "7:15",
              "role": "How it works",
              "note": "What causes a tank slapper and how geometry, damping and dampers control it; check bearings and tyres first on a real bike."
            },
            {
              "id": "vSZiKrtJ7Y0",
              "title": "Can a Flat-Tread Motorcycle Turn? How Motorbikes Steer",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "7:58",
              "role": "How it works",
              "note": "How a bike steers by leaning on a round tyre profile; a flat tread test shows why."
            }
          ]
        }
      ]
    },
    {
      "id": "m4-suspension",
      "title": "Suspension",
      "lead": "Springs hold the bike up; dampers stop it bouncing. Get sag right and the bike sits level, keeps its tyres on the road and uses its travel properly.",
      "lab": "overview/?mode=4t&part=forks",
      "blocks": [
        {
          "type": "h3",
          "text": "Sprung and unsprung mass"
        },
        {
          "type": "p",
          "html": "<strong>Sprung</strong> mass is everything on the springs (frame, engine, rider, fuel). <strong>Unsprung</strong> mass moves with the wheel (wheel, tyre, brake, fork lowers, about half the swingarm). Less unsprung mass means the tyre follows the road faster and less bump force reaches the chassis."
        },
        {
          "type": "model",
          "file": "forks",
          "caption": "Conventional telescopic fork with triple clamps, stanchions and sliders."
        },
        {
          "type": "photo",
          "src": "repair-photos/141_helps_lube_seal_really_good_grease.jpg",
          "caption": "Driving a fork seal home with a socket"
        },
        {
          "type": "model",
          "file": "forks_usd",
          "caption": "An inverted (USD) fork: the large outer tubes are clamped in the yokes and the slim stanchions carry the axle."
        },
        {
          "type": "h3",
          "text": "Spring rate and preload"
        },
        {
          "type": "photo",
          "src": "repair-photos/141_screw_driver.jpg",
          "caption": "Prising out a fork seal with a screwdriver"
        },
        {
          "type": "p",
          "html": "<strong>F = k × x</strong>: rate k is force per millimetre. A fork spring compressed 42 mm by 840 N has k = 20 N/mm. <strong>Preload does not change the rate</strong>; it sets the load at which the suspension starts to move, and so ride height and sag. If correct sag cannot be reached within the adjuster range, the spring rate is wrong."
        },
        {
          "type": "plate",
          "id": "F18",
          "caption": "Telescopic fork, rear shock and sag measurement points."
        },
        {
          "type": "h3",
          "text": "Sag"
        },
        {
          "type": "table",
          "head": [
            "Machine",
            "Front rider sag",
            "Rear rider sag",
            "Rear static sag"
          ],
          "rows": [
            [
              "Road and commuter",
              "25–35 % of travel",
              "25–33 % of travel",
              "5–15 mm"
            ],
            [
              "Sports, track",
              "25–30 mm",
              "25–30 mm",
              "0–10 mm"
            ],
            [
              "Motocross, enduro (300 mm)",
              "60–70 mm",
              "95–105 mm",
              "30–40 mm"
            ]
          ]
        },
        {
          "type": "figure",
          "fig": "sag",
          "caption": "Adjust preload and compare static sag against the target band."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "L1: fully extended",
              "html": "Rear wheel off the ground; measure axle centre to a fixed mark above it."
            },
            {
              "title": "Static sag",
              "html": "On its wheels, measure lifted-and-settled and pushed-and-settled; average them (stiction). Static sag = L1 − average."
            },
            {
              "title": "Rider sag",
              "html": "Rider in position, feet on pegs: L3. Rider sag = L1 − L3."
            },
            {
              "title": "Adjust",
              "html": "Too much sag calls for more preload and too little for less; set twin shocks to the same step."
            },
            {
              "title": "Check the spring",
              "html": "Correct rider sag with almost no static sag means the spring is too soft; excessive static sag means too stiff."
            }
          ]
        },
        {
          "type": "check",
          "q": "m4-17"
        },
        {
          "type": "h3",
          "text": "Damping"
        },
        {
          "type": "p",
          "html": "Without damping the sprung mass would bounce at about 1–2 Hz and the wheel at 10–15 Hz. <strong>Rebound</strong> damping is normally stronger than compression, because the spring releases stored energy. Too little rebound: pogo ride. Too much: the suspension <em>packs down</em> over repeated bumps."
        },
        {
          "type": "table",
          "head": [
            "Valving",
            "How it works",
            "Behaviour"
          ],
          "rows": [
            [
              "Orifice",
              "Oil through fixed holes",
              "Force rises with velocity squared: soft at low speed, harsh on sharp bumps"
            ],
            [
              "Shim stack",
              "Thin steel shims bend open over piston ports",
              "Firm at low speed, nearly linear at high; tunable"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The K-Light 125 uses a simple <strong>damper-rod fork</strong>. Cartridge forks use shim-stacked pistons; <strong>USD forks</strong> put the big tube in the clamps for stiffness and lower unsprung mass but expose the seals. Fork oil: <strong>46# (ISO VG 46), 285 ± 2 ml per leg</strong>. The air gap acts as a progressive air spring, so a higher oil level resists bottoming more. <strong>Milky oil</strong> means water past the seals."
        },
        {
          "type": "variants",
          "title": "Front fork types",
          "intro": "Six front ends from the library, from a rigid bicycle fork to an upside-down sport fork. Repair pages: <a href=\"../repair/parts/forks/\">forks</a>, <a href=\"../repair/parts/fork_seals/\">fork seals</a>, <a href=\"../repair/parts/fork_oil/\">fork oil</a>.",
          "items": [
            {
              "model": "bike_classic_4t__forks",
              "name": "Conventional telescopic",
              "what": "Slim stanchions held in the yokes slide inside larger lower legs that carry the axle, with oil damping inside. This one has rubber gaiters over the stanchions.",
              "good_for": "Simple, cheap and easy to service: the standard on roadsters and commuters.",
              "conditions": "Road riding at the speeds of a typical roadster.",
              "watch": "Oil weeping past the seals, pitted chrome, and soft or uneven action from old oil. Gaiters keep grit off the seals."
            },
            {
              "model": "bike_mx_2t__forks",
              "name": "Upside-down fork, long travel",
              "what": "The large outer tubes are clamped in the yokes and the slim stanchions carry the axle, with long travel for jumps.",
              "good_for": "Stiffness against twisting under braking and bumps, and less unsprung mass.",
              "conditions": "Off-road: jumps, ruts and whoops.",
              "watch": "The seals sit at the bottom and collect mud, so clean them after each ride. A scratched or dented stanchion ruins seals quickly."
            },
            {
              "model": "bike_superbike__forks",
              "name": "Upside-down sport fork",
              "what": "A large inverted fork with adjusters for preload and damping, and radial calipers bolted to the lower legs.",
              "good_for": "Precise feedback and stability under very hard braking.",
              "conditions": "Smooth tarmac and track.",
              "watch": "Stone chips on the stanchions, leaking seals, and settings changed without a record. Service intervals are shorter than for a simple fork."
            },
            {
              "model": "bike_scooter__forks",
              "name": "Scooter telescopic fork",
              "what": "A short telescopic fork sized for a small wheel, mostly hidden behind the front panels.",
              "good_for": "Light steering and low cost for town riding.",
              "conditions": "Smooth city streets.",
              "watch": "Limited travel bottoms out in deep holes, especially two-up. Leaks are hidden by the bodywork, so look at the lower legs."
            },
            {
              "model": "bike_vintage_vtwin__forks",
              "name": "Springer fork, vintage",
              "what": "A fixed rear pair of legs and a moving front pair joined by short links at the bottom, with coil springs at the top. The girder fork, its close relative, uses a parallelogram of links and a central spring.",
              "good_for": "A light, simple front end with a little travel, correct for the period.",
              "conditions": "Moderate speeds on period roads.",
              "watch": "Worn link pivots and bushes cause clunks and wobble, so grease them often. Travel is small and damping little or none."
            },
            {
              "model": "bike_pioneer__forks",
              "name": "Rigid bicycle fork, about 1901",
              "what": "Two straight blades from the crown to the axle, with no springs. Tyre and sprung saddle do all the cushioning.",
              "good_for": "Low weight and nothing to wear.",
              "conditions": "Smooth roads at low speed.",
              "watch": "Cracks at the crown and bent blades after a knock. Check alignment before riding."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Rear suspension"
        },
        {
          "type": "model",
          "file": "swingarm",
          "caption": "A tapered aluminium box-section swingarm with chain adjusters, pivot and linkage mounts."
        },
        {
          "type": "models",
          "files": [
            "rear_shock",
            "rear_shock_twin"
          ],
          "caption": "A monoshock with spring, preload collar, damper body and piggyback reservoir, and a classic pair of chrome twin shocks."
        },
        {
          "type": "p",
          "html": "Twin shocks (as on the K-Light 125) give a nearly linear ratio. A linkage monoshock gives a <strong>rising rate</strong>: soft on small bumps, firm near bottoming. With a motion ratio R, wheel rate ≈ k_shock / R², so a 50 N/mm spring at 2.5:1 gives about <strong>8 N/mm</strong> at the wheel."
        },
        {
          "type": "variants",
          "title": "Rear suspension types",
          "intro": "Five ways to hold up the back of a motorcycle, from none at all to a linkage monoshock. Repair pages: <a href=\"../repair/parts/rear_shock/\">rear shock</a>, <a href=\"../repair/parts/swingarm/\">swingarm</a>.",
          "items": [
            {
              "model": "bike_classic_4t__rear_shock",
              "name": "Twin rear shocks",
              "what": "Two spring and damper units, one each side, from the swingarm to the frame.",
              "good_for": "Simple, cheap and easy to reach, with a nearly linear ratio. Preload is set by a collar on each shock.",
              "conditions": "Road riding, solo or two-up with preload raised.",
              "watch": "Oil on the body, weak damping (the tail keeps bouncing) and worn bushes. Both sides need the same preload."
            },
            {
              "model": "bike_mx_2t__rear_shock",
              "name": "Monoshock with linkage",
              "what": "One shock with a gas reservoir, worked through a rocker and pull rod that give a rising rate.",
              "good_for": "Long travel, soft on small bumps and firm near bottoming, with the mass kept near the middle of the bike.",
              "conditions": "Off-road and sport riding.",
              "watch": "Linkage bearings wear and seize without grease: check for play with the wheel lifted. The gas-charged damper needs specialist service."
            },
            {
              "model": "bike_cruiser__rear_shock",
              "name": "Hidden softail monoshock",
              "what": "A monoshock hidden under the seat, so the triangulated swingarm looks like a rigid frame.",
              "good_for": "The look of a rigid frame with some comfort.",
              "conditions": "Smooth paved roads.",
              "watch": "Travel is short, so big bumps and heavy loads reach the stops. Preload must suit a passenger; the shock is hard to reach and often neglected."
            },
            {
              "model": "bike_scooter__rear_shock",
              "name": "Scooter swinging-engine unit",
              "what": "Engine, CVT and rear wheel pivot as one unit on a mounting link, held up by shocks (two on this scooter).",
              "good_for": "A compact, cheap layout with a short belt drive that never changes length.",
              "conditions": "City riding on fairly smooth roads.",
              "watch": "The heavy unsprung unit makes the rear harsh on sharp bumps. Worn engine mount bushes show as a knock and vague handling."
            },
            {
              "model": "bike_vintage_vtwin__frame",
              "name": "Rigid frame, vintage",
              "what": "The rear axle is fixed in the frame. Only the tyre and the sprung saddle absorb bumps.",
              "good_for": "Simplicity and low weight, with nothing to wear out.",
              "conditions": "Smooth roads at moderate speed.",
              "watch": "Every bump reaches the frame and rider, so check frame joints and saddle springs. Tyre pressure matters even more, as the tyre is the only suspension."
            }
          ]
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Gas-charged shocks",
          "html": "Many shocks hold nitrogen at 1–2 MPa. Never heat, puncture or dismantle one without first releasing the gas through the Schrader valve or following the maker’s procedure. Never straighten a bent damper rod: replace it."
        },
        {
          "type": "check",
          "q": "m4-18"
        },
        {
          "type": "h3",
          "text": "Job sheet 4.5.2: Fork oil change and seal replacement"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Strip the front end",
              "html": "Raise the front wheel, remove the wheel, caliper (hang it on a tie, never by the hose) and mudguard. Crack the fork cap while the top clamp still holds the tube, then release the pinch bolts and remove the leg."
            },
            {
              "title": "Drain and read the oil",
              "html": "Remove the cap (it is under spring preload), spacer and spring, then pump the inverted leg over a tray. Milky oil means water past the seals; metallic grey oil means bush wear."
            },
            {
              "title": "Separate tube and slider",
              "html": "Remove dust seal and clip, hold the damper rod with the T-handle tool and remove the bottom damper rod bolt, then pull the tube out sharply so the upper bush drives the old seal out."
            },
            {
              "title": "Inspect",
              "html": "Inner tube for pitting, scoring or bend (V-blocks and dial gauge); bushes worn through to copper; damper rod straight (never straighten one); spring free length 300 mm, limit <strong>295 mm</strong> (K-Light 125 manual)."
            },
            {
              "title": "Rebuild",
              "html": "Damper rod bolt <strong>15–20 N·m</strong> with thread lock and a new washer. Oil the new seal lip, protect it with film over the tube end and drive it square until the clip groove shows; fit clip and dust seal."
            },
            {
              "title": "Fill and close",
              "html": "With the spring out and the leg compressed, add <strong>285 ± 2 ml</strong> of 46# oil from a measuring cylinder and pump slowly to purge air. Refit spring, spacer and cap with a new O-ring, started by hand, at <strong>12–18 N·m</strong>."
            },
            {
              "title": "Refit",
              "html": "Set both tubes flush with the top clamp, torque the pinch bolts, refit wheel, caliper and mudguard, and pump the brake before riding."
            },
            {
              "title": "Pass criteria",
              "html": "Equal oil in both legs, no leaks after repeated compression, smooth travel, legs at equal height, fasteners at torque and a firm brake lever."
            }
          ]
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "mm2F08Ys_zU",
              "title": "Delboy's Garage, USD Fork Seal Replacement",
              "channel": "Delboy's Garage",
              "channel_url": "http://www.youtube.com/@Moonfleet41",
              "duration": "45:21",
              "role": "How-to",
              "note": "Replace seals on an inverted fork, set oil level and refit; long real workshop video, values for that fork only."
            },
            {
              "id": "k884DfM2LsU",
              "title": "Motorcycle Suspension Tech and Maintenance: How To Rebuild Your Fork | MC GARAGE",
              "channel": "Motorcyclist Magazine",
              "channel_url": "http://www.youtube.com/@MotorcyclistMag",
              "duration": "10:10",
              "role": "How-to",
              "note": "Strip a fork, renew seals, bushes and oil, set the oil level; use your manual's oil grade and level."
            },
            {
              "id": "vrmYJgcGX30",
              "title": "Delboy's Garage, How-To replace regular type fork seals.",
              "channel": "Delboy's Garage",
              "channel_url": "http://www.youtube.com/@Moonfleet41",
              "duration": "30:00",
              "role": "How-to",
              "note": "Replace seals on a conventional fork, including the damper bolt; long and thorough, values for that fork only."
            }
          ]
        }
      ]
    },
    {
      "id": "m4-wheels-tyres",
      "title": "Wheels and tyres",
      "lead": "Two contact patches the size of a palm carry everything. Wheels have to run true on good bearings, and tyres have to be the right size, age, pressure and condition.",
      "lab": "overview/?mode=4t&part=front_wheel",
      "blocks": [
        {
          "type": "h3",
          "text": "Spoked versus cast"
        },
        {
          "type": "p",
          "html": "<strong>Spoked</strong> wheels (32–40 spokes in tension) absorb impacts and can be repaired, but need truing and usually a tube. <strong>Cast</strong> wheels are stiff, run tubeless and need no truing, but crack or bend and cannot be repaired. The K-Light 125 uses aluminium alloy wheels, 1.85 × 17 front and 3.00 × 15 rear (rim width in inches × diameter), with tubeless 90/90-17 and 130/90-15 tyres."
        },
        {
          "type": "plate",
          "id": "W01",
          "caption": "Wheel types: wire-spoked, motocross with rim lock, and cast alloy."
        },
        {
          "type": "photo",
          "src": "repair-photos/147_spoke_tightening_pattern.jpg",
          "caption": "Spoke tightening pattern: work round the wheel in small, even steps so the rim stays true."
        },
        {
          "type": "photo",
          "src": "repair-photos/048_do_not_loosen_castle_nut_make.jpg",
          "caption": "Castle nut with a cotter pin on a rear axle",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "plate",
          "id": "W02",
          "caption": "Hubs and bearings: exploded front hub with axle, spacers, sealed bearings and seals, and the rear hub with cush drive and sprocket carrier."
        },
        {
          "type": "photo",
          "src": "repair-photos/048_if_happens_just_lever_two_pin.jpg",
          "caption": "Slip pin on a rear brake rod",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "model",
          "file": "rear_wheel_cast",
          "caption": "A cast alloy rear wheel with cush-drive hub and sprocket carrier."
        },
        {
          "type": "models",
          "files": [
            "front_wheel_spoked",
            "front_wheel_cast",
            "front_wheel_mx"
          ],
          "caption": "Front wheels: a 19 in wire-spoked roadster wheel, a 17 in cast alloy wheel and a 21 in motocross wheel."
        },
        {
          "type": "models",
          "files": [
            "rear_wheel_spoked",
            "rear_wheel_mx"
          ],
          "caption": "Rear wheels: an 18 in wire-spoked roadster wheel and a 19 in motocross wheel."
        },
        {
          "type": "variants",
          "title": "Wheel types",
          "intro": "Seven wheels from the model library, from a bicycle-type rim of about 1901 to a cast sport wheel. Sizes are those given for each model. Repair pages: <a href=\"../repair/parts/front_wheel/\">front wheel</a>, <a href=\"../repair/parts/spokes/\">spokes</a>, <a href=\"../repair/parts/wheel_rim/\">wheel rim</a>.",
          "items": [
            {
              "model": "bike_cafe_racer__front_wheel",
              "name": "Wire-spoked road wheel",
              "what": "An alloy rim laced to the hub with 40 tensioned steel spokes: 19 in at the front of the 1960s cafe racer, 18 in at the rear.",
              "good_for": "Road bikes that need a light wheel which flexes a little over bumps and can be rebuilt.",
              "conditions": "Mixed roads, including rough and broken surfaces.",
              "watch": "Loose or broken spokes (a dull note when tapped), rim run-out and rust at the nipples. Most need an inner tube, so a puncture can deflate the tyre quickly."
            },
            {
              "model": "bike_step_through__front_wheel",
              "name": "Steel-rim spoked commuter wheel",
              "what": "A plain steel rim on spokes: 17 in on the step-through, with 2.25-17 front and 2.50-17 rear tyres.",
              "good_for": "Cheap, tough daily transport. Bent rims and spokes can be trued or replaced in any small workshop.",
              "conditions": "Poor roads, potholes and loads at moderate speed.",
              "watch": "Rust on rim and spokes, spokes loosened by heavy loads, and dents that pinch the tube or make the brake pulse."
            },
            {
              "model": "front_wheel_mx",
              "name": "Motocross wheel, 21 in front",
              "what": "A tall, narrow spoked wheel with a strong alloy rim and a rim lock. Off-road front wheels are usually 21 in and rears 18 or 19 in.",
              "good_for": "Rolling over ruts, rocks and roots: a large wheel meets an obstacle at a shallower angle.",
              "conditions": "Dirt, mud and sand, at low tyre pressure.",
              "watch": "Spoke tension after every few rides, rim dents from rocks, and a loose rim lock, which lets the tyre creep and tear the valve out of the tube."
            },
            {
              "model": "bike_superbike__front_wheel",
              "name": "Cast alloy sport wheel",
              "what": "One-piece cast aluminium with 12 thin split spokes, 17 in front and rear on the superbike, with tubeless 120/70 ZR17 and 190/50 ZR17 tyres.",
              "good_for": "High speed and hard braking: stiff, true, and wide enough for a modern radial tyre. No truing.",
              "conditions": "Good tarmac and track days.",
              "watch": "Cracks near the spokes and bead seat after a pothole strike, a bent rim edge that leaks air, corrosion under chipped paint. A cracked cast wheel is replaced, not repaired."
            },
            {
              "model": "bike_cruiser__front_wheel",
              "name": "Cast cruiser wheel",
              "what": "Polished five split-spoke cast wheels: 19 in front with a 100/90-19 tyre and 16 in rear with a 150/80B16.",
              "good_for": "Tubeless tyres, easy cleaning and a long, low stance. The tall, narrow front steers slowly and steadily.",
              "conditions": "Paved roads and long steady runs.",
              "watch": "Kerb damage and corrosion under the polished finish. A heavy bike needs the correct pressure for the load."
            },
            {
              "model": "bike_scooter__front_wheel",
              "name": "Small cast scooter wheel",
              "what": "Compact cast alloy wheels, 14 in front and 13 in rear, with 110/70-14 and 130/70-13 road tyres.",
              "good_for": "A low floor, light steering and quick turns in traffic.",
              "conditions": "Smooth city streets.",
              "watch": "A small wheel drops into potholes and hits edges hard, so rims dent more easily. Its tyres turn more times per kilometre and wear sooner."
            },
            {
              "model": "bike_pioneer__front_wheel",
              "name": "Bicycle-type wheel, about 1901",
              "what": "Light 28-spoke nickel wire wheels with 26 x 2 in clincher tyres, close to a heavy bicycle wheel.",
              "good_for": "Low weight on a machine that is also pedalled.",
              "conditions": "Dry, smooth roads at low speed.",
              "watch": "Thin spokes and rims are not built for modern speeds or braking. Old rubber cracks, and a soft clincher can roll off the rim."
            }
          ]
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Rim runout",
              "v": "≤ 1.0 mm",
              "p": "standard; 2.0 mm limit, radial and axial"
            },
            {
              "l": "Axle bend",
              "v": "0.2 mm",
              "p": "limit; never straighten an axle"
            },
            {
              "l": "Bearings",
              "v": "6202 / 6303",
              "p": "2RS sealed, front / rear"
            }
          ]
        },
        {
          "type": "p",
          "html": "<strong>Truing:</strong> tightening a spoke pulls the rim towards the flange it comes from. For a lateral high spot to the left, tighten the spokes to the right flange and loosen those to the left, a quarter to half a turn over several spokes. Wheel bearings are pressed in on the <strong>outer race only</strong>, sealed side out, with the spacer fitted; removed bearings are not reused."
        },
        {
          "type": "photo",
          "src": "repair-photos/149_bearing_spacer_2.jpg",
          "caption": "Driving a wheel bearing out with a drift"
        },
        {
          "type": "h3",
          "text": "Reading a tyre"
        },
        {
          "type": "photo",
          "src": "repair-photos/147_but_if_only_doing_one_wheel.jpg",
          "caption": "Dial gauge reading rim run-out"
        },
        {
          "type": "plate",
          "id": "F20",
          "caption": "Tyre sidewall markings and tyre section."
        },
        {
          "type": "table",
          "head": [
            "110/70-17 54H",
            "Meaning"
          ],
          "rows": [
            [
              "110",
              "Section width 110 mm"
            ],
            [
              "70",
              "Aspect ratio 70 %: sidewall 77 mm"
            ],
            [
              "-",
              "Bias construction (R radial, B bias-belted)"
            ],
            [
              "17",
              "Rim diameter 17 in"
            ],
            [
              "54",
              "Load index: 212 kg per tyre"
            ],
            [
              "H",
              "Speed symbol: 210 km/h"
            ]
          ]
        },
        {
          "type": "p",
          "html": "<strong>Bias</strong> plies cross at 30–40°: stiff, tough, but hotter running. <strong>Radial</strong> plies run at about 90° with a belt under the tread: flatter, cooler contact patch, standard above about 400 cc. The DOT code ends in week and year: <strong>2324 = week 23 of 2024</strong>. Inspect from five years, replace at ten regardless of tread."
        },
        {
          "type": "variants",
          "title": "Tyre types",
          "intro": "Tread pattern and carcass are chosen for the surface. Tube or tubeless matters as much: a tubeless tyre seals on the rim and usually loses air slowly when punctured, while a tubed tyre on a spoked rim can go flat at once. Repair pages: <a href=\"../repair/parts/front_tyre/\">front tyre</a>, <a href=\"../repair/parts/rear_tyre/\">rear tyre</a>, <a href=\"../repair/parts/inner_tube/\">inner tube</a>.",
          "items": [
            {
              "model": "bike_boda_boda__front_wheel",
              "name": "Ribbed road front",
              "what": "Circumferential ribs and no blocks: 2.75-17 on the boda boda front.",
              "good_for": "Precise steering and long life on a tyre that steers and brakes but does not drive.",
              "conditions": "Tarmac and hard gravel, wet or dry.",
              "watch": "Ribs can follow grooves in the road. Look for cracks between the ribs and uneven wear from low pressure."
            },
            {
              "model": "bike_boda_boda__rear_wheel",
              "name": "Block-tread commuter rear",
              "what": "Square blocks across the crown: 3.00-17 on the boda boda rear, which carries rider, passenger and goods.",
              "good_for": "Drive grip on mixed surfaces: tarmac, gravel and dirt roads.",
              "conditions": "Mixed roads, dry or lightly muddy.",
              "watch": "A squared-off centre from heavy loads and straight running, which reduces grip when leaning. Under-inflation for the load overheats the carcass."
            },
            {
              "model": "bike_mx_2t__rear_wheel",
              "name": "Knobby off-road",
              "what": "Tall, widely spaced knobs that dig into loose ground and let mud clear between them.",
              "good_for": "Traction for drive, braking and steering in dirt.",
              "conditions": "Soft to intermediate soil, mud and sand, at low pressure.",
              "watch": "Knobs squirm on tarmac and wear fast there. Rounded or torn knobs mean lost grip; check the rim lock and tube as well."
            },
            {
              "model": "bike_superbike__rear_wheel",
              "name": "Sport radial",
              "what": "A radial carcass with a belt under a rounded, mostly slick tread: 120/70 ZR17 front and 190/50 ZR17 rear on the superbike. ZR marks a tyre rated above 240 km/h.",
              "good_for": "A large, flat contact patch at deep lean angles, high speed and hard braking.",
              "conditions": "Warm, dry tarmac. Grip is lower until the tyre is warm, and in the cold and wet.",
              "watch": "Fast wear, mostly in the centre of the rear; cold tyres; age cracks. Pressures exactly to the maker’s figure."
            },
            {
              "model": "bike_cruiser__rear_wheel",
              "name": "Belted bias cruiser rear",
              "what": "A wide, tall tyre with a bias carcass and a belt under the tread: 150/80B16 on the cruiser, where B means belted bias.",
              "good_for": "Load capacity, comfort and long life on a heavy machine.",
              "conditions": "Paved roads, steady cruising, two-up.",
              "watch": "Squaring off from long straight runs, and pressure: raise it for a passenger as the maker specifies."
            },
            {
              "model": "bike_scooter__rear_wheel",
              "name": "Scooter tyre",
              "what": "A small, wide, low-profile tubeless road tyre: 130/70-13 on the scooter rear.",
              "good_for": "Stable grip for a short, low machine in town.",
              "conditions": "City streets, dry and wet.",
              "watch": "The rear carries most of the weight and all of the drive, so it wears much faster than the front. A small tyre holds little air: check pressure often."
            },
            {
              "model": "bike_vintage_vtwin__front_wheel",
              "name": "Beaded-edge clincher, period",
              "what": "A tyre with hooked beads that lock into a beaded-edge rim, with an inner tube: 28 x 3 in with a ribbed tread on the vintage V-twin.",
              "good_for": "Correct restoration of machines from before the well-base rim became common in the late 1920s.",
              "conditions": "Dry roads at modest speed.",
              "watch": "Air pressure holds the beads in the rim, so an under-inflated tyre can come off. Check old rubber for cracks and fit security bolts where the rim has them."
            }
          ]
        },
        {
          "type": "check",
          "q": "m4-21"
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Front pressure",
              "v": "190 kPa",
              "p": "≈ 27.5 psi cold (K-Light 125, solo)"
            },
            {
              "l": "Rear pressure",
              "v": "210 kPa",
              "p": "≈ 30.5 psi cold"
            },
            {
              "l": "Tread limit",
              "v": "1 mm",
              "p": "K-Light 125 manual; TWI blocks show about 0.8–1 mm"
            }
          ]
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Puncture repairs",
          "html": "A permanent tubeless repair is a <strong>combined plug-patch fitted from inside</strong>, in the central tread, for injuries up to about 6 mm. External string plugs are get-you-home only. Never fit a tube to cure a leak in a damaged tubeless tyre."
        },
        {
          "type": "p",
          "html": "<strong>Balancing:</strong> on a stand the heavy spot settles at the bottom; add weight opposite until the wheel stays wherever it is placed. An unbalanced wheel is often felt as a shake in the bars at 80–110 km/h."
        },
        {
          "type": "h3",
          "text": "Job sheet 4.6.1: Removing and fitting a tubeless tyre and balancing"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Remove and deflate",
              "html": "Support the bike securely, remove the wheel, note the rotation arrow and never lay the wheel on its disc. Remove the valve core and break both beads, keeping the breaker clear of the rim flange and disc."
            },
            {
              "title": "Lever off in small bites",
              "html": "Push the bead opposite the valve into the rim well, lubricate and lever over near the valve with rim protectors; repeat for the second bead."
            },
            {
              "title": "Inspect",
              "html": "Check the rim bead seat for dents, cracks and corrosion, fit a new rubber valve and find the cause of any puncture inside the old tyre."
            },
            {
              "title": "Fit the new tyre",
              "html": "Lubricate both beads, check the rotation arrow and align the balance dot with the valve. Fit the lower then the upper bead using the well."
            },
            {
              "title": "Seat and inflate",
              "html": "Inflate without the core until both beads pop on with the moulded rim line concentric, never above the maker’s seating pressure; fit the core and set <strong>190 kPa front, 210 kPa rear</strong> (K-Light 125, cold, solo)."
            },
            {
              "title": "Balance",
              "html": "On the stand mark the lowest point, add trial weight opposite and repeat until the wheel stays in any position; clean the rim before bonding the final weights."
            },
            {
              "title": "Refit",
              "html": "Axle nuts to <strong>75–88 N·m front, 100–113 N·m rear</strong> (K-Light 125) and check the brakes."
            },
            {
              "title": "Pass criteria",
              "html": "Beads evenly seated, no leaks at bead or valve (soap test), wheel balanced, correct rotation, pressures and axle torques correct."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Job sheet 4.6.2: Checking wheel runout and bearings"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Spin and look",
              "html": "With the wheel raised and axle tight, spin it slowly past a fixed pointer; check the tyre separately, as tyre runout is not rim runout."
            },
            {
              "title": "Measure the rim",
              "html": "Dial gauge on the bead seat (radial) and then the rim side face (axial), one full turn. K-Light 125: within <strong>1.0 mm</strong> standard, replace the rim above <strong>2.0 mm</strong>."
            },
            {
              "title": "Feel the bearings",
              "html": "Rock the wheel at top and bottom; play with the axle tight means worn bearings. Off the bike, turn each inner race by finger and feel for roughness."
            },
            {
              "title": "Check the axle",
              "html": "Roll it on V-blocks with the gauge at its centre; replace above <strong>0.2 mm</strong> and never straighten it."
            },
            {
              "title": "Replace bearings",
              "html": "Pull seals and bearings, inspect the hub bores, drive new bearings in on the outer race only, sealed side out, with the spacer fitted (K-Light 125: 6202-2RS front, 6303-2RS rear), and fit greased new seals."
            },
            {
              "title": "Pass criteria",
              "html": "Runout within limits, axle straight within 0.2 mm, bearings smooth with no play, seals fitted and axle nut at torque."
            }
          ]
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "5Zf6bZLkhKA",
              "title": "How to Repair a Tubeless Tire Puncture (Motorcycle)",
              "channel": "199Xray",
              "channel_url": "http://www.youtube.com/@199Xray",
              "duration": "6:54",
              "role": "How-to",
              "note": "Plug a tubeless tyre puncture step by step; a plug is a get-home repair, check tyre maker limits and fit a new tyre if in doubt."
            },
            {
              "id": "dAKIuSjPXxA",
              "title": "How To Change & Balance Your Own Motorcycle Tires | MC GARAGE",
              "channel": "Motorcyclist Magazine",
              "channel_url": "http://www.youtube.com/@MotorcyclistMag",
              "duration": "10:24",
              "role": "How-to",
              "note": "Change a tyre with levers and rim protectors, seat the bead and balance the wheel; check direction arrows and pressures after."
            },
            {
              "id": "Qm6fTWaj3QE",
              "title": "This Tire Plug Can Kill You – How to Best Fix a Flat",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "9:14",
              "role": "How-to",
              "note": "Compares puncture plug types and which ones hold; any plug is temporary, replace the tyre when you can."
            }
          ]
        }
      ]
    },
    {
      "id": "m4-brakes",
      "title": "Brakes",
      "lead": "A brake is a heat machine: it turns motion into heat in seconds. Hydraulics multiply a 100 N squeeze into thousands of newtons of clamp, and the fluid has to stay liquid when the disc is hot.",
      "lab": "overview/?mode=4t&part=brake",
      "blocks": [
        {
          "type": "h3",
          "text": "Energy goes up with speed squared"
        },
        {
          "type": "p",
          "html": "<strong>E = ½ m v²</strong>: double the speed, four times the heat. A K-Light 125 (145 kg) with an 80 kg rider stopping from 90 km/h (25 m/s) sheds about <strong>70 kJ</strong>. The front does about 70 % of the work in a hard stop; if 90 % of that enters a 0.9 kg steel disc, it heats by about <strong>106 K</strong> in one stop."
        },
        {
          "type": "figure",
          "fig": "weight-transfer",
          "caption": "Increase braking deceleration and watch load move onto the front tyre: this is why the front brake does most of the work."
        },
        {
          "type": "h3",
          "text": "Drum brakes"
        },
        {
          "type": "photo",
          "src": "repair-photos/140_twin_dual_leading_shoe.jpg",
          "caption": "Twin leading shoe drum brake layout"
        },
        {
          "type": "photo",
          "src": "repair-photos/138_pads_worn_different_rates.jpg",
          "caption": "Disc brake pad worn unevenly"
        },
        {
          "type": "p",
          "html": "In a <strong>single leading shoe</strong> drum, only the leading shoe self-servos into the drum. A <strong>twin leading shoe</strong> drum applies both shoes at their leading ends, so both self-servo and forward braking is much stronger. Drums resist water and mud but fade as the hot drum expands away from the shoes."
        },
        {
          "type": "photo",
          "src": "repair-photos/140_single_leading_shoe.jpg",
          "caption": "Single leading shoe drum brake layout"
        },
        {
          "type": "plate",
          "id": "F19",
          "caption": "Hydraulic disc brake and drum brake."
        },
        {
          "type": "h3",
          "text": "Hydraulic multiplication"
        },
        {
          "type": "p",
          "html": "Pressure is equal throughout a confined fluid, so a small master piston drives large caliper pistons with force multiplied by the <strong>area ratio</strong>, and the lever ratio multiplies the hand force again before it reaches the master piston."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Lever",
              "html": "100 N hand force × 4:1 lever = 400 N on the 11 mm master piston."
            },
            {
              "title": "Pressure",
              "html": "400 / 95.0 mm² = 4.21 MPa."
            },
            {
              "title": "Clamp",
              "html": "Two 27 mm pistons (1,145 mm²): 4.21 × 1,145 ≈ 4,820 N."
            },
            {
              "title": "Friction",
              "html": "Two pad faces, μ 0.40: 2 × 0.40 × 4,820 ≈ 3,860 N."
            },
            {
              "title": "Torque",
              "html": "At r_eff 120 mm: about 463 N·m, roughly 0.71 g from the front brake alone."
            }
          ]
        },
        {
          "type": "figure",
          "fig": "brake-hydraulics",
          "caption": "Change master cylinder and caliper piston sizes and see how clamp force and lever travel trade off."
        },
        {
          "type": "p",
          "html": "The hydraulic ratio here is about 12, and 48:1 from hand to clamp. The price is travel: a <strong>smaller master cylinder</strong> gives a more powerful but softer lever with more travel."
        },
        {
          "type": "h3",
          "text": "Try it: squeeze the pads"
        },
        {
          "type": "animation",
          "part": "brake",
          "mode": "4t",
          "caption": "Hold BRAKE: line pressure rises, the pistons push the pads onto the disc and the disc heats up. Brake repeatedly to see the temperature climb towards fade and the pads wear towards the 3 mm limit."
        },
        {
          "type": "check",
          "q": "m4-23"
        },
        {
          "type": "model",
          "file": "brake",
          "caption": "A floating disc gripped by a four-piston radial caliper, with pads visible in the caliper window."
        },
        {
          "type": "photo",
          "src": "render-brake.jpg",
          "caption": "A floating front disc with drilled friction ring, dark carrier and riveted floating buttons, gripped by a two-piston sliding caliper with its mounting bolts, bleed nipple and banjo-fitted brake hose."
        },
        {
          "type": "h3",
          "text": "Calipers, pads and fluid"
        },
        {
          "type": "p",
          "html": "A <strong>floating</strong> caliper (K-Light 125) has pistons on one side and slides on pins; seized pins cause uneven pad wear. A <strong>fixed</strong> caliper has opposed pistons. Square-section piston seals roll the piston back and make discs self-adjusting. <strong>Organic</strong> pads bite well cold but fade hot; <strong>sintered</strong> pads work wet and hot but wear discs faster."
        },
        {
          "type": "variants",
          "title": "Brake types",
          "intro": "From a spoon on the tyre to twin floating discs. On all of them the front brake does most of the stopping on a dry road. Repair pages: <a href=\"../repair/parts/drum_brake/\">drum brake</a>, <a href=\"../repair/parts/brake_pads/\">brake pads</a>, <a href=\"../repair/parts/brake_disc/\">brake disc</a>.",
          "items": [
            {
              "model": "bike_pioneer__brake",
              "name": "Spoon brake, about 1901",
              "what": "A shaped shoe pressed onto the top of the front tyre by a lever, as on early bicycles.",
              "good_for": "A light, simple way to slow at low speed.",
              "conditions": "Dry roads at gentle speed.",
              "watch": "Weak, weaker still in the wet, and it wears the tyre. Long stopping distances must be allowed for."
            },
            {
              "model": "bike_vintage_vtwin__rear_brake",
              "name": "External band brake, vintage",
              "what": "A lined steel band that tightens around a drum on the rear hub. The vintage V-twin has no front brake, which was normal for its time.",
              "good_for": "Simple to make and to adjust.",
              "conditions": "Dry roads at period speeds.",
              "watch": "Water and grit on the band, worn lining and stretched linkage. With a rear brake only, stops are planned early."
            },
            {
              "model": "bike_boda_boda__brake",
              "name": "Single leading shoe drum",
              "what": "Two shoes inside a drum in the hub, of which only the leading shoe self-servos. Cable-worked at the front and rod-worked at the rear on the boda boda.",
              "good_for": "Cheap, enclosed, long-lasting linings that stand up to dust and mud.",
              "conditions": "Commuting at moderate speed on rough or dusty roads.",
              "watch": "Fade on long descents, stretched cables, worn shoes (the wear indicator on the arm) and water in the drum after washing."
            },
            {
              "model": "bike_cafe_racer__brake",
              "name": "Twin leading shoe drum",
              "what": "Each shoe has its own cam, linked together, so both self-servo when going forwards. The cafe racer’s has an air scoop for cooling.",
              "good_for": "Much stronger forward braking than a single leading shoe drum of the same size.",
              "conditions": "Dry roads and moderate braking, without long steep descents.",
              "watch": "Both cams must be set to touch at the same moment, or only one shoe works. Fades when hot."
            },
            {
              "model": "bike_cruiser__brake",
              "name": "Single disc, two-piston caliper",
              "what": "One 300 mm front disc with a two-piston caliper, on the cruiser.",
              "good_for": "Strong, consistent braking that copes with heat and water far better than a drum.",
              "conditions": "Road riding in all weather.",
              "watch": "Pad and disc thickness, disc run-out and fluid age. One disc on a heavy bike heats quickly in repeated hard stops."
            },
            {
              "model": "bike_superbike__brake",
              "name": "Twin floating discs, radial calipers",
              "what": "Two 320 mm floating discs, each gripped by a radially mounted four-piston caliper.",
              "good_for": "Maximum stopping power with fine control at high speed. The floating ring can expand without warping its carrier.",
              "conditions": "Fast roads and track.",
              "watch": "Seized or rattling floating buttons, pad wear and fluid boiled by hard use. Applied progressively, as the bite is very strong."
            }
          ]
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Front disc",
              "v": "4.0 → 3.0 mm",
              "p": "new → limit; rear 5.0 → 4.0 mm"
            },
            {
              "l": "Pads",
              "v": "6.0 → 3 mm",
              "p": "replace both pads in the caliper together"
            },
            {
              "l": "Disc runout",
              "v": "0.15 mm",
              "p": "limit, stylus 5–10 mm inside edge"
            },
            {
              "l": "Banjo bolts",
              "v": "30 N·m",
              "p": "always with new sealing washers"
            }
          ]
        },
        {
          "type": "table",
          "head": [
            "Fluid",
            "Base",
            "Dry boil",
            "Wet boil"
          ],
          "rows": [
            [
              "DOT 3",
              "Glycol ether",
              "205 °C",
              "140 °C"
            ],
            [
              "DOT 4",
              "Glycol ether, borate ester",
              "230 °C",
              "155 °C"
            ],
            [
              "DOT 5.1",
              "Glycol ether, borate ester",
              "260 °C",
              "180 °C"
            ],
            [
              "DOT 5",
              "Silicone: never mix with glycol",
              "260 °C",
              "180 °C"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Old fluid boils",
          "html": "Glycol fluid absorbs water (1–3 % in a year or two) and its boiling point falls. Vapour bubbles compress, so a hot brake with old fluid can suddenly go spongy or to the bar. Replace every two years, never reuse fluid, and never mix DOT 5 with DOT 3/4/5.1."
        },
        {
          "type": "h3",
          "text": "CBS and ABS"
        },
        {
          "type": "p",
          "html": "On the K-Light 125 the rear pedal also feeds one piston circuit of the front caliper through a <strong>CBS pump</strong>. If the front caliper leaks, fully screwing in the CBS adjusting bolt lets the rear brake work alone until repair."
        },
        {
          "type": "p",
          "html": "<strong>ABS</strong> reads toothed tone rings with wheel speed sensors. When slip exceeds roughly 10–30 %, the modulator closes the inlet valve to hold pressure, opens the outlet to dump fluid to an accumulator, and the pump returns it, cycling several times a second. <strong>Cornering ABS</strong> adds an IMU for lean and pitch."
        },
        {
          "type": "table",
          "head": [
            "Region",
            "Up to 125 cc",
            "Above 125 cc"
          ],
          "rows": [
            [
              "EU (Reg. 168/2013)",
              "L3e-A1: ABS or CBS",
              "ABS (all new registrations from 1 Jan 2017)"
            ],
            [
              "India (CMVR 2016)",
              "CBS or ABS",
              "ABS (all new vehicles from April 2019)"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m4-25"
        },
        {
          "type": "h3",
          "text": "Job sheet 4.7.1: Replacing pads and measuring disc thickness and runout"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Remove the caliper",
              "html": "Cover paintwork, loosen the pad pin while the caliper is still bolted on, then remove the mounting bolts and lift the caliper off."
            },
            {
              "title": "Measure the pads",
              "html": "At the thinnest point; at or below <strong>3 mm</strong> replace both pads in the caliper together. Uneven wear points to seized slide pins or a sticking piston."
            },
            {
              "title": "Service the caliper",
              "html": "Clean with brake cleaner (no compressed air on brake dust), check dust seals and leaks, regrease slide pins with silicone grease and renew torn boots. Push the piston back squarely, watching the reservoir (both reservoirs on CBS)."
            },
            {
              "title": "Measure the disc",
              "html": "Micrometer round the swept area: front limit <strong>3.0 mm</strong>, rear <strong>4.0 mm</strong>. Dial gauge 5–10 mm inside the outer edge with the wheel fitted: runout limit <strong>0.15 mm</strong>, after confirming good wheel bearings and clean disc seats. Disc bolts 10–12 N·m with thread lock, in a diagonal pattern."
            },
            {
              "title": "Refit",
              "html": "New pads and spring, pad pin, caliper bolts <strong>22–29 N·m</strong>. Pump the lever or pedal firm <em>before</em> moving the machine, set the fluid level and bed the pads in with moderate stops from 50 km/h."
            },
            {
              "title": "Pass criteria",
              "html": "Pads above limit and evenly worn, discs within thickness and runout limits, slide pins free, bolts at torque, firm lever, no drag, brake light working."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Job sheet 4.7.2: Bleeding a hydraulic brake"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Prepare",
              "html": "Reservoir level, paintwork covered, cap and diaphragm off. Clear tube from the bleed nipple into a bottle holding a little fresh fluid so air cannot be drawn back."
            },
            {
              "title": "Lever method",
              "html": "Squeeze and hold, open the nipple a quarter turn, close it before the lever reaches the bar, release. Top up so the reservoir never falls below one-third."
            },
            {
              "title": "Vacuum method",
              "html": "Draw fluid through with the vacuum bleeder while topping up, until clear, bubble-free new DOT 4 flows (K-Light 125 manual). On CBS bleed each circuit in the order the manual gives."
            },
            {
              "title": "Stubborn air",
              "html": "Tie the lever back overnight or tap hose and caliper to free bubbles; on ABS models use the diagnostic tool’s bleed routine if specified."
            },
            {
              "title": "Close up and test",
              "html": "Tighten the nipple, fit its cap, set fluid to the upper mark and refit diaphragm and cap. The lever must be firm and must not sink under steady pressure; a spongy lever almost always means air."
            },
            {
              "title": "Pass criteria",
              "html": "Firm lever and pedal, no leaks at nipple or banjos (30 N·m, new washers), correct level, waste fluid kept for approved disposal, brake and ABS lamps normal."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Job sheet 4.7.3: Drum brake shoe inspection and adjustment"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Wear indicator first",
              "html": "With the brake applied, a pointer beyond the mark on the cam lever means worn shoes or drum."
            },
            {
              "title": "Strip safely",
              "html": "Remove the wheel and backplate, wear a dust mask and wet-clean the dust; never blow it out with compressed air."
            },
            {
              "title": "Measure",
              "html": "Lining at the thinnest point (typical limit 1.5–2.0 mm) and drum diameter in several directions. Replace shoes in pairs if worn, oily or cracked; replace the hub if the drum is oversize, oval or heat-cracked; remove light glazing with emery cloth."
            },
            {
              "title": "Cam and springs",
              "html": "Clean the cam and anchor pin, grease them lightly with high-temperature grease, and check the cam bush and return springs."
            },
            {
              "title": "Refit and adjust",
              "html": "Cam lever close to 90° to the rod or cable with the brake applied, torque arm secure, pedal free play <strong>20–30 mm</strong> on many commuters. Recheck after any chain adjustment."
            },
            {
              "title": "Pass criteria",
              "html": "Linings and drum within limits, no contamination, free cam, correct free play, no drag, brake light on before the brake bites, and a confident stop on the road test."
            }
          ]
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "fUWO0SQX6-U",
              "title": "How To Bleed Your Motorcycle Brakes | MC Garage",
              "channel": "Motorcyclist Magazine",
              "channel_url": "http://www.youtube.com/@MotorcyclistMag",
              "duration": "5:06",
              "role": "How-to",
              "note": "Replace and bleed brake fluid so the lever feels firm; check the fluid type on your master cylinder."
            },
            {
              "id": "1xITumgvvS4",
              "title": "How To Change Motorcycle Brake Pads at RevZilla.com",
              "channel": "RevZilla",
              "channel_url": "http://www.youtube.com/@RevZilla",
              "duration": "19:44",
              "role": "How-to",
              "note": "Check pad wear and fit new pads, clean pins and pistons; pump the lever before riding."
            },
            {
              "id": "kb0ox9Ue6fw",
              "title": "How to Clean, Repair and Rebuild Motorcycle Brake Calipers",
              "channel": "TheRideAdvice",
              "channel_url": "http://www.youtube.com/@Therideadviceonline",
              "duration": "3:01",
              "role": "How-to",
              "note": "Strip, clean and reseal a brake caliper; short overview, bleed the brakes and test before riding."
            }
          ]
        }
      ]
    },
    {
      "id": "m4-maintenance",
      "title": "Periodic maintenance and pre-delivery inspection",
      "lead": "Most chassis faults are found, not fixed: by a schedule followed on time, a quick check before every ride, and a careful inspection before a new bike leaves the shop.",
      "blocks": [
        {
          "type": "h3",
          "text": "Distance or time, whichever comes first"
        },
        {
          "type": "p",
          "html": "Oils, fluids and rubber age even when a bike stands still, so intervals are set by distance <em>or</em> time. The K-Light 125 schedule assumes 1,000 km per month and codes each task <strong>I</strong> inspect, <strong>A</strong> adjust, <strong>C</strong> clean, <strong>R</strong> replace, <strong>L</strong> lubricate."
        },
        {
          "type": "table",
          "head": [
            "Item",
            "Interval / spec"
          ],
          "rows": [
            [
              "Engine oil",
              "Replace at 300 km, then every 3,000 km / 3 months"
            ],
            [
              "Drive chain",
              "Inspect and lubricate; slack 20–40 mm; lube every 500–800 km"
            ],
            [
              "Clutch free play",
              "10–15 mm"
            ],
            [
              "Brake fluid",
              "Inspect each service; replace every 2 years"
            ],
            [
              "Fork oil",
              "Typically 12,000–24,000 km or 2 years"
            ],
            [
              "Steering head",
              "Inspect; regrease every 2 years typical"
            ]
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/048_parts_tray.jpg",
          "caption": "Parts tray holding bolts from one assembly",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "check",
          "q": "m4-27"
        },
        {
          "type": "h3",
          "text": "Pre-ride check: T-CLOCS"
        },
        {
          "type": "photo",
          "src": "repair-photos/048_plastic_bags.jpg",
          "caption": "Freezer bag labelled with its contents",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "T: Tyres and wheels",
              "html": "Cold pressure, tread, damage, spokes or cracks, bearings."
            },
            {
              "title": "C: Controls",
              "html": "Lever and pedal free play, cables free, throttle snaps shut in every bar position."
            },
            {
              "title": "L: Lights and electrics",
              "html": "Headlight beams, tail and brake light from both controls, indicators, horn."
            },
            {
              "title": "O: Oil and fluids",
              "html": "Engine oil, brake and clutch fluid, coolant, fuel, leaks underneath."
            },
            {
              "title": "C: Chassis",
              "html": "Frame, suspension, chain or belt tension and lube, fasteners."
            },
            {
              "title": "S: Stands",
              "html": "Stands spring back; side-stand switch cuts the engine in gear."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Chassis tune-up"
        },
        {
          "type": "photo",
          "src": "repair-photos/048_there_several_ways_do_quickly.jpg",
          "caption": "Cardboard template with each screw in its own hole",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Lubricate and adjust cables, set clutch, brake and throttle free play, check fasteners, chain, wheels, tyres, fluids and lights, and aim the headlight (dipped cut-off typically about 1 % below lamp centre height). With the engine idling, turn the bars lock to lock: <strong>idle must not rise</strong>, or a cable is being pulled by the steering. Lay a new cable alongside the old before removal so it follows the same route."
        },
        {
          "type": "h3",
          "text": "Pre-delivery inspection"
        },
        {
          "type": "photo",
          "src": "repair-photos/051_oil_filter_cartridge_tools.jpg",
          "caption": "Spin-on filter with a T-handle filter wrench",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Unpack and verify",
              "html": "Frame and engine numbers against paperwork; record transit damage."
            },
            {
              "title": "Assemble",
              "html": "Fit loose parts to manual torque; route cables and hoses as shown."
            },
            {
              "title": "Battery",
              "html": "Fill and charge, or check open-circuit voltage (above about 12.6 V). Connect <strong>positive first, negative last</strong>."
            },
            {
              "title": "Fluids and fuel",
              "html": "Oil, final-drive oil, coolant, brake and clutch fluid; fuel and leak check."
            },
            {
              "title": "Adjust",
              "html": "Tyre pressures, axle torques, free plays, chain slack and alignment."
            },
            {
              "title": "Electrics and engine",
              "html": "Lights, horn, interlocks, ABS self-check; warm up, check idle, read ECU codes."
            },
            {
              "title": "Road test and hand-over",
              "html": "Brakes (and CBS), clutch, all gears, steering, suspension, speedo. Remove transit wax from the exhaust, record the PDI and brief the first service at 300 km."
            }
          ]
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Torque and road tests",
          "html": "A PDI is complete only when every fastener the dealer touched has been torqued to the manual’s figure and the bike has been road-tested in a safe place. Record the values: they are evidence if a fault is later disputed."
        },
        {
          "type": "photo",
          "src": "repair-photos/052_oil_level_plug_2.jpg",
          "caption": "Oil level plug in the side of a crankcase",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Open the <a href=\"../overview/?mode=4t&view=diagram\">four-stroke course plate</a> and work through its hotspots from the front tyre to the tail light, using plate F06 (Module 1) for the full list of 30 assemblies from Fuel tank to Tail light and indicators. For each, name the inspection from this chapter that applies, for example Drive chain: slack, wear length, lubrication; Front fork: leaks, oil level, clamp bolt torque."
        },
        {
          "type": "check",
          "q": "m4-28"
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "u74jYkItdD8",
              "title": "How to Break In Your New Motorcycle",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "6:16",
              "role": "How-to",
              "note": "How to run in a new bike: vary revs, avoid long full load, first oil change; follow your manual's limits."
            },
            {
              "id": "eIXDDj1MSLE",
              "title": "How To Wash Your Motorcycle | MC Garage",
              "channel": "Motorcyclist Magazine",
              "channel_url": "http://www.youtube.com/@MotorcyclistMag",
              "duration": "3:44",
              "role": "How-to",
              "note": "How to wash a bike without forcing water into bearings and electrics; good time to inspect."
            },
            {
              "id": "hnNN6c7lb8c",
              "title": "How to Change Motorcycle Oil at RevZilla.com",
              "channel": "RevZilla",
              "channel_url": "http://www.youtube.com/@RevZilla",
              "duration": "16:38",
              "role": "How-to",
              "note": "Change oil and filter, new washer, torque the drain bolt; use your manual's grade and quantity."
            }
          ]
        }
      ]
    }
  ]
};
