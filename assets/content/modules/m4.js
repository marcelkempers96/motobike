/* Moto Zero — Module 04 lessons. Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "drivetrain-chassis",
  "num": "04",
  "title": "Drivetrain and chassis",
  "intro": "How engine torque is switched, multiplied and delivered to the rear tyre, and how the frame, steering, suspension, wheels and brakes turn that torque into controlled motion, with the checks and repairs for each.",
  "pdf": "moto-zero-module-4-drivetrain-chassis.pdf",
  "chapters": [
    {
      "id": "m4-clutch",
      "title": "Primary drive and clutch",
      "lead": "A 125 cc crankshaft spins at up to about 10,000 rpm, but at 90 km/h the rear wheel turns at roughly 800 rpm. The first step down happens right at the crank, in the primary drive, and the clutch sitting behind it lets the rider connect and disconnect all that torque by hand.",
      "lab": "?mode=4t&part=engine",
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
          "type": "check",
          "q": "m4-04"
        }
      ]
    },
    {
      "id": "m4-gearbox",
      "title": "Gearbox",
      "lead": "An engine only makes useful torque in a narrow speed band: the K-Light 125 peaks at 8.9 N·m at 7,500 rpm and 7.8 kW at 9,000 rpm. The gearbox keeps it in that band from walking pace to top speed, one positive click at a time.",
      "lab": "?mode=4t&part=engine",
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
          "type": "h3",
          "text": "Dogs and why gears jump out"
        },
        {
          "type": "p",
          "html": "Dogs carry the full gear torque on a few square millimetres. Their driving faces are <strong>back-cut by 2–4°</strong> so torque pulls the gears <em>together</em>. Once the edges round off, the force reverses and pushes them apart: rounded dogs are the root cause of almost every case of <strong>jumping out of gear</strong>. Dogs are always replaced in pairs."
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
          "type": "check",
          "q": "m4-07"
        }
      ]
    },
    {
      "id": "m4-final-drive",
      "title": "Final drive and CVT",
      "lead": "The last stage carries torque from the gearbox to the rear wheel: by chain on most bikes, by belt or shaft on some, and on scooters by a belt running between two pulleys that change size as you ride.",
      "lab": "?mode=4t&part=chain",
      "blocks": [
        {
          "type": "h3",
          "text": "Roller chain"
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
          "type": "check",
          "q": "m4-09"
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
          "type": "plate",
          "id": "TR02",
          "caption": "Final drive types: chain and sprockets, toothed belt, and shaft with bevel gears."
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
        }
      ]
    },
    {
      "id": "m4-frame-steering",
      "title": "Frame and steering geometry",
      "lead": "The frame holds the steering axis, swingarm pivot and engine in fixed relation under braking, cornering and bumps. A few degrees of rake and a few millimetres of trail decide whether the bike feels calm or nimble.",
      "lab": "?mode=4t&part=frame",
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
        }
      ]
    },
    {
      "id": "m4-suspension",
      "title": "Suspension",
      "lead": "Springs hold the bike up; dampers stop it bouncing. Get sag right and the bike sits level, keeps its tyres on the road and uses its travel properly.",
      "lab": "?mode=4t&part=forks",
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
          "type": "model",
          "file": "forks_usd",
          "caption": "An inverted (USD) fork: the large outer tubes are clamped in the yokes and the slim stanchions carry the axle."
        },
        {
          "type": "h3",
          "text": "Spring rate and preload"
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
              "html": "Too much sag: add preload. Too little: reduce it. Set twin shocks to the same step."
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
          "type": "callout",
          "tone": "safety",
          "title": "Gas-charged shocks",
          "html": "Many shocks hold nitrogen at 1–2 MPa. Never heat, puncture or dismantle one without first releasing the gas through the Schrader valve or following the maker’s procedure. Never straighten a bent damper rod: replace it."
        },
        {
          "type": "check",
          "q": "m4-18"
        }
      ]
    },
    {
      "id": "m4-wheels-tyres",
      "title": "Wheels and tyres",
      "lead": "Two contact patches the size of a palm carry everything. Wheels have to run true on good bearings, and tyres have to be the right size, age, pressure and condition.",
      "lab": "?mode=4t&part=front_wheel",
      "blocks": [
        {
          "type": "h3",
          "text": "Spoked versus cast"
        },
        {
          "type": "p",
          "html": "<strong>Spoked</strong> wheels (32–40 spokes in tension) absorb impacts and can be repaired, but need truing and usually a tube. <strong>Cast</strong> wheels are stiff, run tubeless and need no truing, but crack or bend and cannot be repaired. The K-Light 125 has alloy wheels: 1.85 × 17 front, 3.00 × 15 rear."
        },
        {
          "type": "plate",
          "id": "W01",
          "caption": "Wheel types: wire-spoked, motocross with rim lock, and cast alloy."
        },
        {
          "type": "plate",
          "id": "W02",
          "caption": "Hubs and bearings: exploded front hub with axle, spacers, sealed bearings and seals, and the rear hub with cush drive and sprocket carrier."
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
          "type": "h3",
          "text": "Reading a tyre"
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
        }
      ]
    },
    {
      "id": "m4-brakes",
      "title": "Brakes",
      "lead": "A brake is a heat machine: it turns motion into heat in seconds. Hydraulics multiply a 100 N squeeze into thousands of newtons of clamp, and the fluid has to stay liquid when the disc is hot.",
      "lab": "?mode=4t&part=brake",
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
          "type": "p",
          "html": "In a <strong>single leading shoe</strong> drum, only the leading shoe self-servos into the drum. A <strong>twin leading shoe</strong> drum applies both shoes at their leading ends, so both self-servo and forward braking is much stronger. Drums resist water and mud but fade as the hot drum expands away from the shoes."
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
          "html": "Pressure is equal throughout a confined fluid, so a small master piston drives large caliper pistons with force multiplied by the <strong>area ratio</strong>. The lever multiplies again."
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
          "type": "check",
          "q": "m4-27"
        },
        {
          "type": "h3",
          "text": "Pre-ride check: T-CLOCS"
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
          "type": "p",
          "html": "Lubricate and adjust cables, set clutch, brake and throttle free play, check fasteners, chain, wheels, tyres, fluids and lights, and aim the headlight (dipped cut-off typically about 1 % below lamp centre height). With the engine idling, turn the bars lock to lock: <strong>idle must not rise</strong>, or a cable is being pulled by the steering. Lay a new cable alongside the old before removal so it follows the same route."
        },
        {
          "type": "h3",
          "text": "Pre-delivery inspection"
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
          "type": "check",
          "q": "m4-28"
        }
      ]
    }
  ]
};
