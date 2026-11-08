/* Motopedia: Module 4 lessons. Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "drivetrain-chassis",
  "num": "4",
  "title": "Drivetrain and chassis",
  "intro": "How engine torque is switched, multiplied and delivered to the rear tyre, and how the frame, steering, suspension, wheels and brakes turn that torque into controlled motion, with the checks and repairs for each.",
  "pdf": "motopedia-module-4-drivetrain-chassis.pdf",
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
          "html": "A 125 cc crankshaft turns at about 1,500 rpm at idle and up to about 10,000 rpm at full power, while the rear wheel at 90 km/h turns at roughly 800 rpm. No single pair of gears or sprockets could make that reduction in a sensible space, so it is shared out between three stages."
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
          "type": "h3",
          "text": [
            "The primary gears"
          ]
        },
        {
          "type": "p",
          "html": "Most singles use a <strong>gear primary</strong>: spur teeth are cheap and carry no axial thrust; helical teeth are quieter but push the basket sideways. Large multis often use a chain primary. <strong>Cushion springs</strong> between the primary gear and basket soak up firing pulses; when worn they show as play and a <em>clonk</em> on and off the throttle."
        },
        {
          "type": "p",
          "html": "Because the crank pinion and the basket gear are permanently in mesh, any backlash between them rattles at idle as each firing stroke snaps the teeth across the gap. Some engines use a split <strong>scissors gear</strong>, in which a spring-loaded second half of the gear takes up the backlash. Engines with long crank-to-mainshaft centres use a duplex roller chain or an inverted-tooth (Hy-Vo) chain with a tensioner instead; older British twins ran a duplex primary chain in an oil bath."
        },
        {
          "type": "p",
          "html": "The cushion springs (four to six short coil springs or rubber blocks in windows in the gear web) let the gear turn a few degrees relative to the basket. They absorb the torque pulse of each firing stroke of a single and the shock of a snatched gear change before it reaches the plates and the gearbox. Rotational play between gear and basket is checked by hand with the clutch out of the engine (see <a href=\"../repair/repairs/cush-drive-check/\">cush drive checks</a>)."
        },
        {
          "type": "eq",
          "id": "m4-primary-ratio",
          "name": "Primary drive ratio",
          "tex": "i_p = \\frac{z_\\mathrm{basket}}{z_\\mathrm{crank}}",
          "where": [
            [
              "i_p",
              "primary reduction ratio",
              ""
            ],
            [
              "z_\\mathrm{basket}",
              "teeth on the clutch basket gear",
              "teeth"
            ],
            [
              "z_\\mathrm{crank}",
              "teeth on the crankshaft pinion",
              "teeth"
            ]
          ],
          "why": "The first of the three reductions between crankshaft and rear wheel. It sets how fast the clutch and gearbox mainshaft turn, and it multiplies the torque the clutch has to carry.",
          "example": "A 20-tooth crank pinion driving a 68-tooth basket gear gives \\(i_p = 68/20 = 3.40\\)."
        },
        {
          "type": "eq",
          "id": "m4-clutch-speed-torque",
          "name": "Clutch speed and torque behind the primary drive",
          "tex": "n_\\mathrm{clutch} = \\frac{n_\\mathrm{crank}}{i_p}, \\qquad T_\\mathrm{clutch} = T_e\\, i_p\\, \\eta_p",
          "where": [
            [
              "n_\\mathrm{clutch}",
              "clutch and mainshaft speed",
              "rpm"
            ],
            [
              "n_\\mathrm{crank}",
              "crankshaft speed",
              "rpm"
            ],
            [
              "T_\\mathrm{clutch}",
              "torque the clutch must carry",
              "N·m"
            ],
            [
              "T_e",
              "engine torque at the crankshaft",
              "N·m"
            ],
            [
              "\\eta_p",
              "efficiency of the primary gears, about 0.98 to 0.99",
              ""
            ]
          ],
          "why": "A reduction lowers speed and raises torque in the same proportion, less a small gear loss. The clutch is therefore sized for engine torque times the primary ratio, not for engine torque alone.",
          "example": "K-Light 125: at 9,000 rpm the clutch turns at \\(9000/3.40 \\approx 2647\\ \\mathrm{rpm}\\); the 8.9 N·m engine peak becomes \\(T_\\mathrm{clutch} \\approx 8.9 \\times 3.40 \\times 0.985 \\approx 30\\ \\mathrm{N\\,m}\\)."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Primary ratio",
              "v": "68/20 = 3.40",
              "p": "\\(i_p = z_\\mathrm{basket} / z_\\mathrm{crank}\\)"
            },
            {
              "l": "Clutch speed",
              "v": "2,647 rpm",
              "p": "at 9,000 rpm crank speed"
            },
            {
              "l": "Clutch torque",
              "v": "about 30 N·m",
              "p": "8.9 N·m engine peak \\(\\times\\) 3.40"
            }
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "K-Light 125 clutch data",
          "html": "Wet multi-plate clutch (K-Light 125 manual). Friction plate thickness 2.9–3.0 mm, service limit <strong>2.6 mm</strong>. Spring free length 35.45–36.5 mm, limit <strong>34.2 mm</strong>. Clutch centre locknut 50–60 N·m, held with the four-claw socket and holder. Cable free play at the lever <strong>10–15 mm</strong>. Engine oil 1.1 ± 0.1 L at an oil change."
        },
        {
          "type": "h3",
          "text": "The wet multiplate clutch"
        },
        {
          "type": "p",
          "html": "The clutch lets the rider start from rest, change gear and stop without stalling, and it limits the torque that can reach the drivetrain in a shock. It must carry full engine torque in a package small enough to sit inside the crankcase cover, so it uses many small friction faces in parallel instead of one large disc as in a car."
        },
        {
          "type": "p",
          "html": "Running the plates in engine oil (a <strong>wet clutch</strong>) carries heat away from the faces and makes engagement smooth. The price is some drag when released and a friction coefficient only about a third of a dry clutch, which is why the stack needs so many faces."
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
          "type": "h3",
          "text": [
            "Torque path and release path"
          ]
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
          "html": "With the lever released, the springs squeeze the stack so that the friction plates (turning with the basket) and the steel plates (turning with the hub) lock together, and torque flows basket, friction plates, steel plates, hub, mainshaft. Pulling the lever compresses the springs and the stack opens; the plates then slide past each other in a film of oil while the engine runs and the mainshaft can stop."
        },
        {
          "type": "p",
          "html": "On most singles the cable turns a lever on the right-hand crankcase cover whose cam or quick-thread pushes on a release bearing in the centre of the pressure plate. Many larger engines instead run a pushrod through the hollow mainshaft from a lever or slave cylinder on the left-hand side."
        },
        {
          "type": "h3",
          "text": [
            "Cable and hydraulic release"
          ]
        },
        {
          "type": "p",
          "html": "A <strong>cable</strong> release needs free play set at the lever (<strong>10–15 mm</strong> on the K-Light 125). Too little holds the clutch partly open and causes <em>slip</em>; too much prevents full release and causes <em>drag</em>. A <strong>hydraulic</strong> release compensates for plate wear automatically and is bled like a brake."
        },
        {
          "type": "p",
          "html": "Cable friction rises as the inner wire corrodes or the outer is routed in tight bends, and free play changes as the plates wear and as the engine (and so the cable) warms. Free play is set with the in-line adjuster at the lever, using the lower adjuster at the crankcase when the upper one runs out of thread (<a href=\"../repair/repairs/clutch-cable-adjust/\">clutch cable adjustment</a>)."
        },
        {
          "type": "p",
          "html": "A hydraulic release has a master cylinder on the bar and a slave cylinder at the engine. The fluid takes up the clearance at the slave piston, so there is no free play to set. It is normally DOT 4; some European makers specify mineral oil, and the two must never be mixed (<a href=\"../repair/repairs/clutch-bleed/\">bleeding a hydraulic clutch</a>)."
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
          "type": "photo",
          "src": "repair-photos/138_can_read_here_hydraulic_clutch_handled.jpg",
          "caption": "Hydraulic clutch slave cylinder on the engine case. Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "How much torque can it carry?"
        },
        {
          "type": "p",
          "html": "The torque a plate clutch can carry before it slips is the friction force on each face, times the effective radius of the lining, times the number of faces in contact. Each friction plate has two faces, so five plates give ten."
        },
        {
          "type": "eq",
          "id": "m4-clutch-torque",
          "name": "Slip torque of a plate clutch",
          "tex": "T = \\mu\\, F\\, r_m\\, n",
          "where": [
            [
              "T",
              "torque at which the clutch starts to slip",
              "N·m"
            ],
            [
              "\\mu",
              "coefficient of friction, about 0.10–0.15 wet, 0.3–0.4 dry",
              ""
            ],
            [
              "F",
              "total spring force on the pressure plate",
              "N"
            ],
            [
              "r_m",
              "mean friction radius of the lining",
              "m"
            ],
            [
              "n",
              "number of friction faces (two per friction plate)",
              ""
            ]
          ],
          "why": "Sets how much torque a clutch can pass. Every slip fault lowers one term: worn linings and tired springs lower (F), glazed linings or the wrong oil lower (mu).",
          "example": "Five plates, \\(r_m = 42.5\\ \\mathrm{mm}\\), four springs of 240 N, \\(\\mu = 0.13\\): \\(T = 0.13 \\times 960 \\times 0.0425 \\times 10 \\approx 53\\ \\mathrm{N\\,m}\\)."
        },
        {
          "type": "eq",
          "id": "m4-clutch-mean-radius",
          "name": "Mean friction radius",
          "tex": "r_m \\approx \\frac{r_o + r_i}{2}",
          "where": [
            [
              "r_m",
              "mean friction radius",
              "m"
            ],
            [
              "r_o",
              "outer radius of the friction lining",
              "m"
            ],
            [
              "r_i",
              "inner radius of the friction lining",
              "m"
            ]
          ],
          "why": "Friction acts all across the lining; once the lining has bedded in (uniform wear), its effect is the same as if it all acted at the mean of the inner and outer radii.",
          "example": "Lining from 35 to 50 mm: \\(r_m = (35 + 50)/2 = 42.5\\ \\mathrm{mm} = 0.0425\\ \\mathrm{m}\\)."
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
              "5, so \\(n = 10\\) faces"
            ],
            [
              "Lining radii",
              "35–50 mm, \\(r_m = 42.5\\) mm"
            ],
            [
              "Spring force",
              "\\(4 \\times 240\\ \\mathrm{N} = 960\\ \\mathrm{N}\\)"
            ],
            [
              "\\(\\mu\\)",
              "0.13"
            ],
            [
              "Slip torque",
              "\\(0.13 \\times 960 \\times 0.0425 \\times 10 \\approx 53\\ \\mathrm{N\\,m}\\)"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Against the 30 N·m it must carry, that is a margin of about <strong>1.75</strong>, covering firing peaks and spring fatigue. The same formula explains every slip fault: worn linings or short springs lower \\(F\\); glazed linings or the wrong oil lower \\(\\mu\\)."
        },
        {
          "type": "p",
          "html": "Because slip torque is proportional to spring force, tired springs show directly in the capacity. If the five 280 N springs of a six-plate clutch (93.7 N·m) fatigue to 230 N each, the capacity falls to \\(0.12 \\times 1150 \\times 0.0465 \\times 12 \\approx 77\\ \\mathrm{N\\,m}\\), the same 18 % fall as the spring force."
        },
        {
          "type": "check",
          "q": "m4-02"
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Oil and the wet clutch",
          "html": "Car oils labelled <em>Energy Conserving</em> or with friction modifiers lower \\(\\mu\\) and make the clutch slip. Use <strong>JASO MA or MA2</strong>; JASO MB is for dry-clutch scooters only. If a clutch slips after an oil change, change back to JASO MA oil before dismantling anything."
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
          "html": "Step-through machines such as the Honda Super Cub use an <strong>automatic centrifugal clutch</strong> on the crankshaft: weighted shoes or a ball-and-ramp plate engage the plate stack as engine speed rises above idle, and a linkage from the gear pedal releases it while the pedal moves, so there is no lever (<a href=\"../repair/repairs/auto-clutch-check/\">automatic clutch checks</a>)."
        },
        {
          "type": "p",
          "html": "Twist-and-go scooters use a dry <strong>centrifugal shoe clutch</strong> on the driven pulley of the CVT: three shoes swing out against a bell, typically engaging at about 2,800–4,000 rpm."
        },
        {
          "type": "p",
          "html": "The engagement speed of a scooter clutch depends on the shoe spring rate. Stiffer springs raise it, which lets the engine reach more torque before the bike moves; worn or glazed shoes, or oil on the bell, cause slip and judder on take-off (<a href=\"../repair/repairs/cvt-clutch-check/\">CVT clutch checks</a>)."
        },
        {
          "type": "h3",
          "text": "Diagnosing clutch faults"
        },
        {
          "type": "p",
          "html": "<strong>Slip</strong> shows as engine speed rising without a matching rise in road speed, most clearly in top gear at wide throttle. <strong>Drag</strong> is incomplete release: the bike creeps with the lever pulled, neutral is hard to find at rest and first engages with a clunk. <strong>Judder</strong> is a shudder on take-off. Check in the order of the cheapest and most likely cause first: free play, oil grade, then the plates and springs."
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
          "type": "h3",
          "text": [
            "Inspecting plates, springs and basket"
          ]
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Free play and oil first",
              "html": "Set free play to 10–15 mm and confirm the oil is JASO MA or MA2 at the right level. Many slip complaints end here."
            },
            {
              "title": "Friction plates",
              "html": "Measure each lining with a vernier at several points round the plate. Replace all of them if any is below the limit (2.6 mm on the K-Light 125). The wear on one plate is small, but over eight or ten faces it shortens the spring installed height noticeably."
            },
            {
              "title": "Steel plates",
              "html": "Lay each on a surface plate and try a feeler gauge under it; a typical limit is 0.10–0.20 mm. Steel plates rarely wear in thickness but distort from heat. Blued plates have been overheated."
            },
            {
              "title": "Springs",
              "html": "Measure free length. If any one is below the limit, replace all as a set: uneven force tilts the pressure plate, causing judder and local slip."
            },
            {
              "title": "Basket and hub",
              "html": "Inspect the basket slots and hub splines for notches worn by the plate tabs. Light notches can be dressed with a fine file; deep notches stop the plates sliding and mean a new basket."
            },
            {
              "title": "Reassembly",
              "html": "Soak new friction plates in engine oil before fitting, fit plates in their original order, torque the hub locknut (50–60 N·m on the K-Light 125) and lock it with its washer or stake."
            }
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
          "html": "The full workshop procedure is on the <a href=\"../repair/repairs/clutch-plate-service/\">clutch plate service</a> page; plates that have stuck together after storage are freed as on <a href=\"../repair/repairs/clutch-plates-stuck-free/\">freeing stuck clutch plates</a>."
        },
        {
          "type": "h3",
          "text": [
            "The kickstart mechanism"
          ]
        },
        {
          "type": "p",
          "html": "The kick lever is splined to a shaft carrying a <strong>ratchet</strong> on a helical spline and a free-turning <strong>kick gear</strong> that meshes with a gear on the gearbox. At rest, a tab on the ratchet bears on a fixed <strong>stopper plate</strong> that holds it away from the kick gear."
        },
        {
          "type": "p",
          "html": "The <strong>kickstart</strong> ratchet rides a helical spline: pressing the lever lets it engage the kick gear; at the end of the stroke the return spring turns the shaft back and a tab on the ratchet rides up the fixed stopper plate, pulling it clear."
        },
        {
          "type": "p",
          "html": "When the engine fires and overruns the kick gear, the angled ratchet teeth ride over each other. A <strong>primary kickstart</strong> drives the clutch basket directly and starts the engine in any gear with the lever pulled; a non-primary type needs neutral."
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Likely cause"
          ],
          "rows": [
            [
              "Lever slips under load",
              "Worn ratchet teeth or weak ratchet spring"
            ],
            [
              "Lever does not return",
              "Broken or unhooked return spring"
            ],
            [
              "Grinding while riding",
              "Worn stopper, so the ratchet does not fully disengage"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Checks are on the <a href=\"../repair/repairs/kickstart-check/\">kickstart check</a> page."
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
          "type": "check",
          "q": "m4-29"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "The primary drive is the first of three reductions; the clutch turns at \\(n_\\mathrm{crank}/i_p\\) and carries about \\(T_e\\, i_p\\).<br>Friction plates lock to the basket and turn with the engine; steel plates lock to the hub and turn with the gearbox.<br>Slip torque is \\(T = \\mu F r_m n\\), with two faces per friction plate.<br>Slip comes from too little free play, wrong oil, worn plates or weak springs; drag from too much free play, warped steels or a notched basket.<br>Use JASO MA or MA2 oil in a wet clutch, and replace springs and plates as sets."
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
          "text": [
            "Why a gearbox is needed"
          ]
        },
        {
          "type": "p",
          "html": "An engine makes useful torque over a limited speed band; the K-Light 125 makes 8.9 N·m at 7,500 rpm and 7.8 kW at 9,000 rpm and runs out of breath not far beyond. The gearbox picks a ratio that keeps the engine inside that band from walking pace to top speed, and multiplies torque at low road speed so the machine can start on a hill with a passenger."
        },
        {
          "type": "p",
          "html": "Five or six ratios are normal on road motorcycles. Motocross bikes use five closely spaced ratios, trials bikes six with a very low first gear, and scooters replace the gearbox with a continuously variable transmission (chapter 4.3)."
        },
        {
          "type": "h3",
          "text": "Constant mesh: every gear always turning"
        },
        {
          "type": "p",
          "html": "Almost every motorcycle box is a <strong>constant-mesh, two-shaft, sequential</strong> type. The <strong>mainshaft</strong> carries the clutch; the <strong>countershaft</strong> carries the front sprocket. Every gear pair is always meshed; what changes is which pair is <em>locked</em> to its shaft."
        },
        {
          "type": "p",
          "html": "The box is built into the crankcase (unit construction) and lubricated by engine oil. The mainshaft is also called the input or primary shaft; the countershaft is also called the output shaft or layshaft and lies parallel to and behind the mainshaft."
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
          "type": "p",
          "html": "A sliding gear has <strong>dogs</strong> (projecting lugs) on one or both faces that engage <strong>dog slots</strong> or matching dogs on the neighbouring free gear. When a fork slides it across, the dogs lock the free gear to the shaft and that ratio carries the torque; every other pair merely idles. The sliding gears are also gears in their own right, which keeps the box short: a five-speed box typically has three sliding members serving five ratios."
        },
        {
          "type": "p",
          "html": "Because the gears are always in mesh, they can use strong, quiet helical or spur teeth, and a shift only needs the dogs to line up, not the teeth. The price is an abrupt engagement and no synchromesh, so the rider must unload the dogs for a moment with the clutch or a throttle lift."
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
          "type": "p",
          "html": "Road boxes commonly use three to six dogs per face. Race boxes use fewer, wider dogs with large clearances (for example three dogs into six slots), so engagement is faster at the cost of more backlash. The K-Light 125 manual lists dog edges worn to round corners as the first cause of the gear disengaging by itself."
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
          "type": "p",
          "html": "The <strong>shift drum</strong> is a cylinder with grooves (cam tracks) machined around it. Each <strong>shift fork</strong> has a guide pin in one groove and two prongs in a groove on a sliding gear, so the drum position defines the gear. Two forks usually run on a separate fork shaft and a third on the other side."
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
          "type": "p",
          "html": "A <strong>neutral switch</strong> in the crankcase is earthed by a contact on the drum in neutral. It lights the green lamp and, on bikes with starter interlocks, lets the starter turn with the clutch engaged (module 3; <a href=\"../repair/repairs/neutral-switch-test/\">neutral switch test</a>). The half-step to neutral also explains why a hurried shift from first to second can stop in neutral."
        },
        {
          "type": "photo",
          "src": "repair-photos/115_drum_shifters_drum_slider_forks_shaft.jpg",
          "caption": "Shift drum with shift forks"
        },
        {
          "type": "p",
          "html": "Fork prongs rub against the side of the gear groove whenever a loaded gear sits slightly askew, so they wear thin or turn blue from heat. A thin prong, a wide drum groove or a bent fork shortens the distance the dog is pushed into engagement, which leads straight to jumping out of gear."
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
          "type": "table",
          "head": [
            "Part (K-Light 125 manual)",
            "New",
            "Service limit"
          ],
          "rows": [
            [
              "Fork shaft outside diameter",
              "11.97–12.00 mm",
              "11.95 mm"
            ],
            [
              "Fork bore",
              "12.000–12.018 mm",
              "12.05 mm"
            ],
            [
              "Fork claw thickness",
              "4.93–5.00 mm",
              "4.7 mm"
            ],
            [
              "Shift drum outside diameter",
              "35.8–36.0 mm",
              "35.75 mm"
            ],
            [
              "Drum groove width",
              "7.05–7.15 mm",
              "7.3 mm"
            ]
          ]
        },
        {
          "type": "h3",
          "text": [
            "Neutral finders and quickshifters"
          ]
        },
        {
          "type": "p",
          "html": "A <strong>quickshifter</strong> senses pedal pre-load and the ECU cuts ignition or injection for about 80–100 ms at low rpm down to about 50 ms near the limiter. The dogs unload and the pre-loaded drum completes the shift. Kawasaki’s <strong>Positive Neutral Finder</strong> uses steel balls that block shifts past neutral when the countershaft is stationary."
        },
        {
          "type": "p",
          "html": "The neutral finder balls sit in radial holes in a countershaft gear. With the shaft stationary they drop into a groove and block the gear from sliding past neutral towards second; once the shaft turns, centrifugal force throws them out and shifting is normal."
        },
        {
          "type": "p",
          "html": "A <strong>bidirectional</strong> quickshifter also blips the throttle by ride-by-wire on downshifts to match revs. Both types need positive dog engagement and correct linkage free play: a sloppy linkage or worn detent gives missed shifts and false neutrals."
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
          "html": "Each gear ratio is the driven gear's tooth count divided by the driving gear's. Power passes through three stages in series, so the ratios multiply; the result, with the tyre size, gives road speed at any engine speed."
        },
        {
          "type": "eq",
          "id": "m4-gear-ratio",
          "name": "Gear ratio from tooth counts",
          "tex": "i = \\frac{z_\\mathrm{driven}}{z_\\mathrm{driving}}",
          "where": [
            [
              "i",
              "ratio of the gear pair (speed in over speed out)",
              ""
            ],
            [
              "z_\\mathrm{driven}",
              "teeth on the driven gear or sprocket",
              "teeth"
            ],
            [
              "z_\\mathrm{driving}",
              "teeth on the driving gear or sprocket",
              "teeth"
            ]
          ],
          "why": "The same rule gives every ratio on a motorcycle: each gearbox pair (countershaft gear over mainshaft gear), the primary drive and the final drive (rear sprocket over front sprocket).",
          "example": "First gear 33/12: \\(i_1 = 33/12 = 2.750\\). Final drive 41/14: \\(i_f = 41/14 = 2.929\\)."
        },
        {
          "type": "eq",
          "id": "m4-overall-ratio",
          "name": "Overall reduction ratio",
          "tex": "i_\\mathrm{overall} = i_p\\, i_\\mathrm{gear}\\, i_f",
          "where": [
            [
              "i_\\mathrm{overall}",
              "total reduction, crankshaft to rear wheel",
              ""
            ],
            [
              "i_p",
              "primary ratio",
              ""
            ],
            [
              "i_\\mathrm{gear}",
              "ratio of the selected gear",
              ""
            ],
            [
              "i_f",
              "final drive ratio",
              ""
            ]
          ],
          "why": "Stages in series multiply. The overall ratio sets how hard the bike pulls in each gear and how fast the engine turns at a given road speed.",
          "example": "Fifth gear: \\(i_\\mathrm{overall} = 3.400 \\times 0.900 \\times 2.929 = 8.96\\)."
        },
        {
          "type": "eq",
          "id": "m4-road-speed",
          "name": "Road speed from engine speed",
          "tex": "v = \\frac{n_e}{i_\\mathrm{overall}} \\times C \\times \\frac{60}{1000}",
          "where": [
            [
              "v",
              "road speed",
              "km/h"
            ],
            [
              "n_e",
              "engine speed",
              "rpm"
            ],
            [
              "i_\\mathrm{overall}",
              "overall reduction ratio",
              ""
            ],
            [
              "C",
              "rolling circumference of the rear tyre",
              "m"
            ]
          ],
          "why": "\\(n_e / i_\\mathrm{overall}\\) is the wheel speed in rpm; times the circumference it is metres per minute, and \\(60/1000\\) turns that into km/h. Used for gearing choices and for checking a speedometer.",
          "example": "Fifth at 9,000 rpm: wheel \\(9000/8.96 = 1004\\ \\mathrm{rpm}\\), \\(v = 1004 \\times 1.874 \\times 60/1000 = 112.9\\ \\mathrm{km/h}\\)."
        },
        {
          "type": "eq",
          "id": "m4-rolling-circumference",
          "name": "Rolling circumference of a tyre",
          "tex": "C \\approx 0.97\\,\\pi \\left( d_\\mathrm{rim} + 2\\, w\\, a \\right)",
          "where": [
            [
              "C",
              "rolling circumference",
              "m"
            ],
            [
              "d_\\mathrm{rim}",
              "rim diameter (inches × 0.0254)",
              "m"
            ],
            [
              "w",
              "nominal section width",
              "m"
            ],
            [
              "a",
              "aspect ratio as a fraction (90 series = 0.90)",
              ""
            ]
          ],
          "why": "The geometric diameter is the rim plus two sidewalls; a loaded tyre rolls on a slightly smaller radius, and about 3 % less is a working allowance.",
          "example": "130/90-15: \\(C \\approx 0.97 \\times \\pi \\times (0.381 + 2 \\times 0.130 \\times 0.90) = 0.97 \\times \\pi \\times 0.615 \\approx 1.874\\ \\mathrm{m}\\)."
        },
        {
          "type": "p",
          "html": "The K-Light 125 manual gives the rear sprocket (41 teeth), the 428 chain with 134 links and the 130/90-15 rear tyre, but not the primary, internal ratios or front sprocket. The table below therefore uses a representative set typical of air-cooled 125 cc singles with an assumed 14-tooth front sprocket; the method is the same with the real figures from the parts book or from counting teeth."
        },
        {
          "type": "p",
          "html": "Rear tyre 130/90-15: sidewall \\(130 \\times 0.90 = 117\\) mm, diameter 615 mm, rolling \\(C \\approx 1.874\\) m. Primary 68/20, final drive 41/14:"
        },
        {
          "type": "table",
          "head": [
            "Gear",
            "Teeth",
            "Ratio",
            "Overall",
            "km/h at 7,500 rpm",
            "km/h at 9,000 rpm"
          ],
          "rows": [
            [
              "1",
              "33/12",
              "2.750",
              "27.38",
              "30.8",
              "37.0"
            ],
            [
              "2",
              "25/14",
              "1.786",
              "17.78",
              "47.4",
              "56.9"
            ],
            [
              "3",
              "26/19",
              "1.368",
              "13.63",
              "61.9",
              "74.3"
            ],
            [
              "4",
              "24/22",
              "1.091",
              "10.86",
              "77.6",
              "93.2"
            ],
            [
              "5",
              "18/20",
              "0.900",
              "8.96",
              "94.1",
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
          "html": "The manual quotes a maximum speed of 90 km/h. With these ratios the engine would reach its power peak in fifth only at 113 km/h, which drag at 7.8 kW will not allow, so the bike tops out at about 7,200 rpm in fifth: fifth is an <em>overdrive</em> that lowers cruising rpm, noise and fuel use at the price of top speed."
        },
        {
          "type": "p",
          "html": "A 13T front sprocket raises \\(i_f\\) to 3.154 and drops the 9,000 rpm speed in fifth to 105 km/h, bringing the power peak closer to the speed the bike can reach and improving acceleration in every gear (<a href=\"../repair/repairs/sprocket-gearing-change/\">changing sprocket gearing</a>)."
        },
        {
          "type": "eq",
          "id": "m4-gear-step",
          "name": "Step between adjacent gears",
          "tex": "\\phi = \\frac{i_k}{i_{k+1}}",
          "where": [
            [
              "\\phi",
              "gear step (ratio of adjacent gear ratios)",
              ""
            ],
            [
              "i_k",
              "ratio of the lower gear",
              ""
            ],
            [
              "i_{k+1}",
              "ratio of the next gear up",
              ""
            ]
          ],
          "why": "Shows how far engine speed falls on each upshift. Steps shrink towards top because the power needed rises steeply with speed, so the engine must drop fewer revs to stay near its power band.",
          "example": "First to second: \\(\\phi = 2.750/1.786 = 1.54\\); then 1.31, 1.25 and 1.21. On an upshift from 9,000 rpm in first the engine falls to \\(9000/1.54 \\approx 5840\\ \\mathrm{rpm}\\)."
        },
        {
          "type": "h3",
          "text": [
            "Gearbox faults"
          ]
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Likely cause",
            "Check",
            "Remedy"
          ],
          "rows": [
            [
              "Jumps out of one gear under load or on the overrun",
              "Rounded dogs and slots on that pair; worn or bent fork; worn drum groove; weak stopper spring",
              "Dogs for rounding; fork claw (limit 4.7 mm); drum groove (limit 7.3 mm); stopper spring",
              "Replace both gears of the dog pair, the fork and if needed the drum"
            ],
            [
              "Hard shifting, stiff pedal",
              "Clutch drag; bent shift shaft; fork binding on its shaft; burr on drum",
              "Clutch release first; shaft straightness; fork bore and shaft diameter",
              "Correct clutch; replace shaft or forks"
            ],
            [
              "Pedal does not return",
              "Broken or unhooked return spring; bent shaft rubbing the case",
              "Remove clutch cover and watch the spring",
              "Replace spring or shaft"
            ],
            [
              "False neutrals between gears",
              "Short pedal travel (boot fouling, linkage); worn detent plate or stopper roller; weak pawl springs",
              "Linkage free play and pedal height; detent notch edges",
              "Adjust linkage; replace detent parts or pawl springs"
            ],
            [
              "No gear engages",
              "Broken fork pin or pawl; sheared drum pin",
              "Shift arm and drum end under the clutch cover",
              "Repair; inspect gears for debris"
            ],
            [
              "Whine in one gear only",
              "Pitted or chipped teeth on that pair",
              "Teeth after case split",
              "Replace the gear pair"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A gear that jumps out has usually been damaging its dogs for some time, and holding the lever up with a boot to stop it speeds the wear. Dogs are <strong>always</strong> replaced in pairs (sliding gear and partner free gear), because a new gear against a rounded partner soon wears to the same shape."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "External checks first",
              "html": "Clutch release (free play, drag), oil grade and level, pedal height and linkage free play. The K-Light 125 manual lists incomplete clutch release as the first cause of difficult shifting."
            },
            {
              "title": "Under the clutch cover",
              "html": "Check that the shift plate returns freely, the return spring is not weak or unhooked, the pawls and their springs are intact and the stopper arm snaps the drum into each notch."
            },
            {
              "title": "Case split",
              "html": "Measure fork claws, fork bores, fork shaft, drum diameter and grooves against the limits, inspect every dog pair for rounding and every tooth for pitting, and check the shift shaft for bending."
            }
          ]
        },
        {
          "type": "p",
          "html": "Practice: <a href=\"../repair/repairs/gearshift-check/\">gearshift checks</a>, <a href=\"../repair/repairs/gearbox-assessment/\">gearbox assessment</a>, <a href=\"../repair/repairs/shift-drum-inspect/\">shift drum inspection</a> and the <a href=\"../repair/repairs/gearbox-strip-order/\">gearbox strip order</a>."
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
          "type": "check",
          "q": "m4-30"
        },
        {
          "type": "check",
          "q": "m4-31"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "A constant-mesh box keeps every pair in mesh; sliding gears and their dogs choose which pair carries torque.<br>Back-cut dogs pull gears together; once rounded they push them apart, so the gear jumps out. Replace dogs in pairs.<br>The drum, forks, pawls and detent star make each pedal stroke one gear; neutral is a half-step between first and second.<br>Ratios multiply: \\(i_\\mathrm{overall} = i_p\\, i_\\mathrm{gear}\\, i_f\\), and road speed follows from the rolling circumference.<br>Check the clutch, oil and linkage before splitting the crankcase."
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
          "html": "An O-ring chain traps grease with rubber rings between the inner and outer plates. An X-ring (or similar quad-lip) chain uses a ring of X-shaped section that touches the plates on four smaller lips, which lowers friction while sealing at least as well. A plain chain has only what the rider sprays on, so grit and water reach the joint freely."
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
            "Typical use",
            "Typical tensile strength"
          ],
          "rows": [
            [
              "415",
              "12.70 mm (1/2 in)",
              "4.76 mm (3/16 in)",
              "Mopeds, 50 cc racers",
              "10–15 kN"
            ],
            [
              "428",
              "12.70 mm",
              "7.94 mm (5/16 in)",
              "100–200 cc commuters, K-Light 125",
              "17–22 kN"
            ],
            [
              "520",
              "15.875 mm (5/8 in)",
              "6.35 mm (1/4 in)",
              "250–700 cc, most off-road",
              "30–40 kN"
            ],
            [
              "525",
              "15.875 mm",
              "7.94 mm",
              "600–1,000 cc road",
              "35–45 kN"
            ],
            [
              "530",
              "15.875 mm",
              "9.53 mm (3/8 in)",
              "Large road bikes",
              "40–50 kN"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Tensile values vary by maker and grade, so the chain's catalogue figure is the one to use (<a href=\"../repair/repairs/chain-size-identify/\">identifying chain size</a>)."
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
          "type": "eq",
          "id": "m4-chain-length",
          "name": "Nominal chain length",
          "tex": "L = N\\, p",
          "where": [
            [
              "L",
              "nominal length of the chain laid straight",
              "mm"
            ],
            [
              "N",
              "number of links (pitches)",
              ""
            ],
            [
              "p",
              "chain pitch (12.70 mm for 4xx, 15.875 mm for 5xx)",
              "mm"
            ]
          ],
          "why": "Gives the new length of any run of pitches, which is the reference for every wear measurement and for working out how many links a new chain needs.",
          "example": "K-Light 125 chain, 428 with 134 links: \\(L = 134 \\times 12.70 = 1701.8\\ \\mathrm{mm}\\); ten pitches new measure \\(10 \\times 12.70 = 127.0\\ \\mathrm{mm}\\)."
        },
        {
          "type": "eq",
          "id": "m4-chain-elongation",
          "name": "Chain elongation",
          "tex": "e = \\frac{L_\\mathrm{meas} - N\\,p}{N\\,p} \\times 100\\,\\%",
          "where": [
            [
              "e",
              "elongation (wear)",
              "%"
            ],
            [
              "L_\\mathrm{meas}",
              "measured length over N pitches, chain pulled taut",
              "mm"
            ],
            [
              "N",
              "number of pitches measured (10 or 20)",
              ""
            ],
            [
              "p",
              "chain pitch",
              "mm"
            ]
          ],
          "why": "Chain wear is joint wear, which shows as extra length. A typical replacement limit is 1.5–2 %; beyond that the chain rides high on the sprocket teeth and wears them to its own pitch.",
          "example": "A 428 chain measuring 258.4 mm over 20 pitches: \\(e = (258.4 - 254.0)/254.0 \\times 100 = 1.73\\,\\%\\), so replacement is due."
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
          "type": "h3",
          "text": [
            "Joining the chain"
          ]
        },
        {
          "type": "p",
          "html": "Chains are joined either by a <strong>spring-clip</strong> master link or by a <strong>rivet link</strong> peened with a press tool. Sealed chains on larger bikes are riveted because a clip can come off at high speed, and the master link is usually the point of failure (<a href=\"../repair/repairs/chain-join/\">joining a chain</a>)."
        },
        {
          "type": "h3",
          "text": [
            "Sprockets and ratio"
          ]
        },
        {
          "type": "p",
          "html": "Final-drive ratio is rear sprocket teeth over front sprocket teeth (equation <em>Gear ratio from tooth counts</em> in chapter 4.2). Small front sprockets wear fastest: each tooth engages more often, the chain bends through a larger angle at each link, and the <strong>polygon effect</strong> (speed pulsing as the chain rises and falls over the flats) grows."
        },
        {
          "type": "p",
          "html": "For a given ratio, larger sprockets run longer and smoother but cost weight and ground clearance. A worn sprocket shows hooked or pointed teeth leaning against the direction of rotation; the K-Light 125 manual calls for replacement when about a quarter of the tooth form is worn (<a href=\"../repair/repairs/sprocket-inspect/\">sprocket inspection</a>)."
        },
        {
          "type": "p",
          "html": "Gearing changes are compared as a percentage: a change from 15/45 (3.000) to 14/47 (3.357) lowers the gearing by \\((3.357 - 3.000)/3.000 = 11.9\\,\\%\\), so the bike pulls harder but runs about 11 % slower at a given engine speed."
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
          "type": "h3",
          "text": [
            "Job sheet 4.3.1: Chain and sprocket inspection, adjustment and lubrication"
          ]
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Slack",
              "v": "20–40 mm",
              "p": "K-Light 125, tightest point"
            },
            {
              "l": "Rear sprocket",
              "v": "41 teeth",
              "p": "nuts 45–50 N·m"
            },
            {
              "l": "Axle nut",
              "v": "100–113 N·m",
              "p": "K-Light 125 manual"
            }
          ]
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
          "type": "table",
          "head": [
            "Finding",
            "Meaning",
            "Action"
          ],
          "rows": [
            [
              "Slack below 20 mm",
              "Overloads the chain and gearbox output bearing as the suspension compresses",
              "Adjust at the tight spot"
            ],
            [
              "Slack above 40 mm",
              "Chain whips and can jump teeth",
              "Adjust, then check wear"
            ],
            [
              "Slack varies by more than about 10 mm",
              "Uneven chain or sprocket wear (tight spots)",
              "Adjusting will not cure it; plan chain and sprockets"
            ],
            [
              "Stiff (kinked) links that cleaning does not free",
              "Seized joints, seals failed",
              "Replace the chain"
            ],
            [
              "Hooked or pointed teeth",
              "Sprocket worn to an old chain's pitch",
              "Replace chain and both sprockets"
            ],
            [
              "Sprocket carrier moves more than a few mm against the wheel",
              "Worn cush drive rubbers",
              "Replace rubbers (${rep('cush-drive-check')}cush drive check</a>)"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Moving chain",
          "html": "Never turn the rear wheel by pulling the chain, and never check the chain with the engine running in gear: fingers are drawn into the sprocket. Support the machine upright (the K-Light 125 manual specifies upright, not on the side stand)."
        },
        {
          "type": "p",
          "html": "After adjusting the axle on a drum-braked machine, recheck the rear brake pedal free play, because moving the axle changes the brake rod geometry. On a disc, check that the caliper bracket is located and the wheel spins freely. Practice pages: <a href=\"../repair/repairs/chain-wear-check/\">chain wear</a>, <a href=\"../repair/repairs/chain-adjust/\">chain adjustment</a>, <a href=\"../repair/repairs/chain-clean-lube/\">cleaning and lubrication</a>, <a href=\"../repair/repairs/chain-sprocket-replace/\">chain and sprocket replacement</a>."
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
          "type": "p",
          "html": "Toothed belts with carbon or aramid tensile cords have been used on Harley-Davidson models since 1980. A belt is wider than a chain for the same load and cannot be split, so the swingarm must be removable or open on one side. It is inspected for missing or cracked teeth, frayed edges and stone damage, and its tension is set with a gauge at a specified force and deflection, not by feel; a stretched belt usually comes from overtightening or misalignment (<a href=\"../repair/repairs/drive-belt-check/\">drive belt check</a>)."
        },
        {
          "type": "p",
          "html": "A shaft drive has a bevel set at the gearbox (unless the crankshaft lies along the frame, as on BMW boxers and Moto Guzzi V-twins), a shaft with a universal joint at the swingarm pivot and a sliding spline for the length change, and a crown-wheel-and-pinion at the wheel. The reaction torque at that rear housing tries to turn it around the axle, which lifts the rear on acceleration and lets it squat on a closed throttle. The torque arm of the Paralever (from the 1987 R80GS and R100GS) forms a parallelogram with the swingarm, so the housing cannot rotate relative to the frame."
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
          "type": "p",
          "html": "A twist-and-go scooter has two variable-diameter V-belt pulleys in the left side of its swinging engine unit, a dry centrifugal clutch on the rear pulley, and a fixed two-stage reduction gearbox (typically about 9:1 to 11:1, in an oil bath) to the rear wheel."
        },
        {
          "type": "plate",
          "id": "F16",
          "caption": "Scooter CVT at low ratio (pulling away) and high ratio (cruising)."
        },
        {
          "type": "table",
          "head": [
            "Part",
            "Where",
            "What it does"
          ],
          "rows": [
            [
              "Drive pulley (variator)",
              "Crankshaft",
              "Fixed half faces a movable half with ramps on its back; six rollers between the ramps and a fixed ramp plate push the halves together as rpm rises"
            ],
            [
              "Belt",
              "Between the pulleys",
              "Cogged, aramid-corded rubber V-belt of fixed length: as it climbs one pulley it must sink into the other"
            ],
            [
              "Driven pulley",
              "Gearbox input",
              "Movable half pushed closed by the contra (torque) spring and guided by a helical torque cam with guide pins"
            ],
            [
              "Centrifugal clutch",
              "On the driven pulley",
              "Shoes engage the bell on the gearbox input shaft as speed rises"
            ]
          ]
        },
        {
          "type": "eq",
          "id": "m4-cvt-ratio",
          "name": "Belt ratio of a CVT",
          "tex": "i_\\mathrm{belt} = \\frac{r_\\mathrm{driven}}{r_\\mathrm{drive}}",
          "where": [
            [
              "i_\\mathrm{belt}",
              "ratio across the belt",
              ""
            ],
            [
              "r_\\mathrm{driven}",
              "belt running radius in the driven (rear) pulley",
              "mm"
            ],
            [
              "r_\\mathrm{drive}",
              "belt running radius in the drive pulley (variator)",
              "mm"
            ]
          ],
          "why": "The belt behaves like a chain on two sprockets whose sizes change while riding. Its ratio falls from about 2.4–2.8 at take-off to about 0.8–0.9 at full speed, and the fixed reduction gearbox multiplies it.",
          "example": "If the belt runs at 30 mm in the variator and 78 mm in the driven pulley, \\(i_\\mathrm{belt} = 78/30 = 2.6\\); at 75 mm and 63 mm it is \\(63/75 = 0.84\\), a spread of about \\(2.6/0.84 \\approx 3.1\\)."
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
          "type": "p",
          "html": "Because the variator sets the ratio from engine speed, the engine runs at a nearly constant rpm while the scooter accelerates, fixed by the balance between roller centrifugal force and the belt and contra-spring forces. The kickdown works because the torque cam turns extra drive torque into extra axial force on the driven pulley, closing it and pulling the belt inward on the variator."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb: roller weights",
          "html": "<strong>Lighter rollers</strong>: higher rpm, harder acceleration, more noise and fuel. <strong>Heavier rollers</strong>: calmer and more economical, weaker uphill. Typical 125 cc scooters use six rollers of about 13–20 g; 1–2 g per roller moves acceleration rpm by very roughly a few hundred rpm."
        },
        {
          "type": "p",
          "html": "Rollers come in sizes such as 16 × 13 mm or 20 × 15 mm. A stiffer contra spring raises the rpm at which the belt can move on the driven pulley, so it has a similar effect at the top of the range. Rollers worn with flat spots slide instead of rolling, which shows as a ratio that changes in steps and lost top speed (<a href=\"../repair/repairs/cvt-roller-check/\">CVT roller check</a>)."
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
          "type": "p",
          "html": "After reassembly, fit the belt with any direction arrow forward, press the driven pulley open by hand so the belt sits deep in it before tightening the variator nut, turn the engine over several times to seat the belt, then road test and note full-throttle rpm and top speed (<a href=\"../repair/repairs/cvt-belt-replace/\">CVT belt replacement</a>). Clutch shoes with less than about 1.5–2 mm of lining, or the manual limit, are replaced."
        },
        {
          "type": "check",
          "q": "m4-32"
        },
        {
          "type": "check",
          "q": "m4-33"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Chain wear is pin-to-bushing wear; measure it as elongation over 10 or 20 pitches, with a typical limit of 1.5–2 %.<br>Set slack (20–40 mm on the K-Light 125) at the tightest point; more than about 10 mm variation means uneven wear.<br>Replace chain and both sprockets together, and use only neutral cleaners on O-ring and X-ring chains.<br>Shaft drives jack the rear on acceleration unless a torque arm (Paralever, CARC) feeds the reaction into the frame.<br>A CVT's ratio \\(r_\\mathrm{driven}/r_\\mathrm{drive}\\) is set by roller weight and contra spring: lighter rollers mean higher rpm."
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
          "text": [
            "What a frame has to do"
          ]
        },
        {
          "type": "p",
          "html": "The frame locates the steering axis, the swingarm pivot and the engine relative to one another and must hold that relationship under braking, cornering and bump loads. The quantities that matter are <strong>torsional stiffness</strong> between steering head and swingarm pivot (resistance to twisting, typically several kN·m per degree on a road machine), <strong>lateral stiffness</strong>, and mass."
        },
        {
          "type": "p",
          "html": "Lateral stiffness is deliberately limited on sports bikes: when the bike is leaned over, the suspension works at an angle to the bumps, and a frame that can flex a little sideways absorbs what the suspension cannot."
        },
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
          "html": "In a cradle frame one or two tubes run from the head under the engine (single or double cradle) to the pivot, and the engine is a hung load. The backbone of a step-through such as the Super Cub is a pressed-steel spine. Twin-spar beams follow straight lines from head to pivot around the engine, the shortest load path, for high torsional stiffness at low mass. Electric motorcycles often use the battery enclosure as a structural member."
        },
        {
          "type": "p",
          "html": "Aluminium has about <strong>a third of the density and a third of the stiffness</strong> of steel, so beams are bigger with thicker walls and still weigh less. After a crash, measure head to pivot and head to rear axle on both sides: a few millimetres of difference means a twist that makes the bike pull or weave."
        },
        {
          "type": "p",
          "html": "Aluminium also has no fatigue endurance limit and is harder to repair than steel, which tolerates fatigue and is easily welded. A crashed frame is checked on a jig or by measuring both sides (<a href=\"../repair/repairs/frame-crash-inspect/\">frame inspection after a crash</a>); the swingarm and its pivot bearings are checked at the same time (<a href=\"../repair/repairs/swingarm-check/\">swingarm check</a>)."
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
          "type": "table",
          "head": [
            "Term",
            "Definition"
          ],
          "rows": [
            [
              "Rake (caster angle)",
              "Angle of the steering axis from vertical"
            ],
            [
              "Fork offset",
              "Perpendicular distance from the steering axis to the front spindle, set by the triple clamps and sometimes an offset spindle at the fork foot"
            ],
            [
              "Trail",
              "Ground distance from where the steering axis meets the ground back to the centre of the front contact patch"
            ],
            [
              "Wheelbase",
              "Distance between the wheel spindles"
            ]
          ]
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
          "type": "eq",
          "id": "m4-trail",
          "name": "Trail from rake, offset and wheel radius",
          "tex": "a = \\frac{R\\,\\sin\\theta - d}{\\cos\\theta}",
          "where": [
            [
              "a",
              "trail, measured along the ground",
              "mm"
            ],
            [
              "R",
              "loaded front tyre radius",
              "mm"
            ],
            [
              "\\theta",
              "rake: steering axis angle from vertical",
              "degrees"
            ],
            [
              "d",
              "fork offset",
              "mm"
            ]
          ],
          "why": "Trail sets how strongly the front wheel self-centres and how heavy the steering feels. More rake or less offset adds trail and stability; less trail quickens the steering.",
          "example": "90/90-17 front, \\(R \\approx 297\\ \\mathrm{mm}\\), with an assumed \\(\\theta = 26^\\circ\\) and \\(d = 30\\ \\mathrm{mm}\\): \\(a = (297 \\times 0.4384 - 30)/0.8988 \\approx 111\\ \\mathrm{mm}\\)."
        },
        {
          "type": "p",
          "html": "The front tyre radius comes from the rim diameter plus two sidewalls: \\(431.8 + 2 \\times 81 = 593.8\\ \\mathrm{mm}\\), so \\(R \\approx 297\\) mm unloaded and a few millimetres less loaded. The K-Light 125 manual does not state rake or offset, so 26° and 30 mm are typical values for a 125 cc road bike, not the factory figures."
        },
        {
          "type": "p",
          "html": "A second example with sports-bike values: \\(R = 310\\) mm, \\(\\theta = 24.5^\\circ\\), \\(d = 32\\) mm gives \\(a = (310 \\times 0.4147 - 32)/0.9100 \\approx 106\\) mm. Increasing the offset by 10 mm at the same rake would cut trail by \\(10/0.91 \\approx 11\\) mm."
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
          "type": "photo",
          "src": "repair-photos/150_steering_bearings.jpg",
          "caption": "Steering stem and yokes with the bearings fitted. Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "photo",
          "src": "repair-photos/150_leading_link_front_end.jpg",
          "caption": "Leading link front end on an older bike. Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": [
            "Stability against agility"
          ]
        },
        {
          "type": "p",
          "html": "Trail makes the front <strong>self-centring</strong>, like a shopping-trolley caster. More rake and trail: stability, slower steering. Less: quicker steering but more risk of <em>wobble</em> (a 4–10 Hz oscillation) or <em>kickback</em>. Under braking the fork compresses, rake steepens and trail falls by <strong>10–20 mm</strong>, which is why bikes turn quicker on the brakes."
        },
        {
          "type": "p",
          "html": "The trail works as a lever: the tyre's side force acts behind the steering axis and turns the wheel back into line. <strong>Kickback</strong> (a tank-slapper) happens when the front lands askew after a bump under acceleration. A longer wheelbase adds stability and reduces load transfer (less wheelie and stoppie tendency) but needs more steering input and a larger turning circle."
        },
        {
          "type": "p",
          "html": "Fitting a taller rear shock or sliding the fork tubes up in the clamps steepens the rake and reduces trail in the same way as fork dive, so ride-height changes are geometry changes and are made in small steps."
        },
        {
          "type": "check",
          "q": "m4-13"
        },
        {
          "type": "p",
          "html": "A <strong>steering damper</strong> is a small hydraulic damper (linear or rotary) between frame and lower clamp. It resists rapid steering movement while having little effect at the slow rates of normal steering, which suppresses kickback on sports bikes and off-road machines hitting rocks; electronic dampers vary their damping with speed and acceleration."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "A damper treats the symptom",
          "html": "A steering damper resists fast steering movement. But a new wobble is first chased through tyres and pressures, wheel alignment, steering head bearings, fork alignment in the clamps and luggage loading."
        },
        {
          "type": "table",
          "head": [
            "Check before fitting a damper",
            "Why"
          ],
          "rows": [
            [
              "Tyres and pressures",
              "Worn, cupped or underinflated front tyres are the commonest cause of a new wobble"
            ],
            [
              "Wheel alignment, runout and bearings",
              "A misaligned or wobbling wheel steers the bike (${rep('front-end-align')}front end alignment</a>)"
            ],
            [
              "Steering head bearings",
              "Loose bearings allow wobble; tight ones cause weave"
            ],
            [
              "Fork alignment and height in the clamps",
              "Twisted or uneven legs change geometry"
            ],
            [
              "Luggage and loading",
              "A heavy top box far behind the axle lowers wobble resistance"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Steering head bearings"
        },
        {
          "type": "p",
          "html": "The steering stem, welded or pressed into the lower clamp, turns in two bearings in the frame's head tube. The K-Light 125 uses 1/4 in balls, 21 in one race and 17 to 19 in the other according to the manual's tables. Cartridge angular-contact ball bearings are used on some modern machines."
        },
        {
          "type": "p",
          "html": "Loose <strong>ball</strong> bearings (K-Light 125: 1/4 in balls) make point contact and are prone to <strong>brinelling</strong>: dents where the balls sit straight-ahead, felt as notchy steering at the centre. <strong>Taper rollers</strong> carry load on line contact and handle braking loads better. Too loose: clunk under braking and wobble. Too tight: heavy steering and a slow weave."
        },
        {
          "type": "p",
          "html": "A tight head makes the bike weave because the pre-load resists the small self-correcting movements that trail and gyroscopic effects produce; the rider has to correct consciously, over-corrects and sets up a slow weave. A brinelled race shows as a notch at the centre that no adjustment can cure. Taper-roller pre-load is set precisely by the torque on the adjusting nut."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "K-Light 125 steering head",
          "html": "Adjusting nut <strong>2–2.5 N·m</strong> after seating the bearings lock to lock. Locknut <strong>70 N·m</strong>. Top clamp (top yoke) centre bolt 37–44 N·m. Fork upper clamp bolts 22–29 N·m. Steel balls 1/4 in (K-Light 125 manual)."
        },
        {
          "type": "h3",
          "text": [
            "Job sheet 4.4.1: Checking and adjusting steering head bearings"
          ]
        },
        {
          "type": "p",
          "html": "Support the bike with the front wheel clear of the ground and the engine supported, as well as with it on the ground. Worn fork bushes feel similar to loose head bearings, so play felt at the clamp is confirmed by checking for movement at the fork legs."
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
          "type": "p",
          "html": "The adjusting-nut torque is small: the aim is zero free play with no pre-load felt as stiffness. The torque wrench must be at right angles to the steering nut wrench, because at any other angle the effective lever length changes and the applied torque is wrong. A new lower race is driven onto the stem square; the K-Light 125 manual warns that a race fitted obliquely wears the stem. Practice: <a href=\"../repair/repairs/steering-bearing-check/\">steering bearing check</a> and <a href=\"../repair/repairs/steering-bearing-adjust/\">steering bearing adjustment</a>."
        },
        {
          "type": "p",
          "html": "<strong>Pass criteria:</strong> no fore-aft free play at the fork legs, bars swing freely and without notches from lock to lock, nuts and clamp bolts at specified torque, and no clunk, weave or wobble on a road test at low speed and over bumps under braking."
        },
        {
          "type": "check",
          "q": "m4-15"
        },
        {
          "type": "check",
          "q": "m4-34"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "The frame must keep head, pivot and engine aligned; torsional stiffness matters most, and some lateral flex is deliberate.<br>Aluminium needs larger sections than steel for the same stiffness but still weighs less.<br>Trail \\(a = (R \\sin\\theta - d)/\\cos\\theta\\) makes the front self-centre; more trail means more stability and slower steering.<br>Fork dive under braking steepens rake and cuts trail by 10–20 mm.<br>Loose head bearings clunk and allow wobble, tight ones cause weave, brinelled ones feel notchy; replace balls, races and seals as a set."
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
          "type": "p",
          "html": "Unsprung mass also includes the brake disc and caliper, the shock and the chain. This is why sports machines use cast aluminium wheels, light discs and USD forks with the heavy outer tube on top: every kilogram taken off the wheel lets the tyre keep a steadier load on a broken surface."
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
          "html": "The spring supports the sprung mass and stores bump energy. Its <strong>spring rate</strong> \\(k\\) is the force needed per millimetre of compression."
        },
        {
          "type": "eq",
          "id": "m4-spring-force",
          "name": "Spring force (Hooke's law)",
          "tex": "F = k\\, x",
          "where": [
            [
              "F",
              "force in the spring",
              "N"
            ],
            [
              "k",
              "spring rate",
              "N/mm"
            ],
            [
              "x",
              "compression of the spring from its free length",
              "mm"
            ]
          ],
          "why": "Relates load to compression in every fork and shock spring. It gives the spring rate from a bench test and the extra compression a passenger or luggage will cause.",
          "example": "A fork spring compressed 42 mm by 840 N has \\(k = 840/42 = 20\\ \\mathrm{N/mm}\\); an extra 300 N of load compresses it a further \\(300/20 = 15\\ \\mathrm{mm}\\)."
        },
        {
          "type": "p",
          "html": "<strong>Preload</strong> is compression applied to the spring with the suspension fully extended, by a threaded collar, a stepped cam ring (common on twin shocks) or a spacer under the fork cap. Preload does <strong>not</strong> change the rate; it sets the load at which the suspension starts to move, and so ride height and sag. A passenger needs more preload to restore sag; if correct sag cannot be reached within the adjuster range, the spring rate is wrong."
        },
        {
          "type": "p",
          "html": "Progressive (variable-pitch) fork springs have closely wound coils that become coil-bound early, so the rate rises with travel."
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
          "type": "p",
          "html": "<strong>Sag</strong> is how far the suspension compresses from fully extended under load. <strong>Static sag</strong> (free sag) is with the bike alone; <strong>rider sag</strong> (race sag) is with the rider in riding position. Sag puts the wheel part-way into its travel so that it can drop into hollows as well as rise over bumps."
        },
        {
          "type": "eq",
          "id": "m4-sag",
          "name": "Static and rider sag",
          "tex": "s_\\mathrm{static} = L_1 - \\frac{L_{2a} + L_{2b}}{2}, \\qquad s_\\mathrm{rider} = L_1 - L_3",
          "where": [
            [
              "L_1",
              "axle to fixed mark, suspension fully extended",
              "mm"
            ],
            [
              "L_{2a}, L_{2b}",
              "same distance on the wheels, lifted-and-settled and pushed-and-settled",
              "mm"
            ],
            [
              "L_3",
              "same distance with the rider in riding position",
              "mm"
            ],
            [
              "s_\\mathrm{static}, s_\\mathrm{rider}",
              "static sag and rider sag",
              "mm"
            ]
          ],
          "why": "Sag is the first suspension setting to get right: it sets ride height, how much travel is left for bumps and hollows, and whether the spring rate suits the rider.",
          "example": "120 mm of rear travel, \\(L_1 = 610\\ \\mathrm{mm}\\), \\(L_3 = 575\\ \\mathrm{mm}\\): \\(s_\\mathrm{rider} = 35\\ \\mathrm{mm}\\), which is \\(35/120 = 29\\,\\%\\) of travel, inside the 25–33 % road target."
        },
        {
          "type": "p",
          "html": "The two settled readings differ because seal and bush friction (stiction) stops the bike short of its true position both ways; their average is the true value."
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
          "type": "h3",
          "text": [
            "Job sheet 4.5.1: Measuring and setting sag"
          ]
        },
        {
          "type": "p",
          "html": "Set tyre pressures and fill fuel to the usual level first. Measure vertically from the axle centre to a fixed mark on the subframe directly above it, using a steel tape or sag tool and a helper to steady the bike."
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
          "type": "p",
          "html": "At the front, measure from the dust seal to the lower clamp or slider, extended and then loaded. A cable tie round a fork tube, pushed against the seal, records the maximum travel used on a ride. Record settings, adjuster positions and rider mass (<a href=\"../repair/repairs/sag-measure/\">sag measurement</a>, <a href=\"../repair/repairs/rear-preload-adjust/\">rear preload adjustment</a>)."
        },
        {
          "type": "p",
          "html": "<strong>Pass criteria:</strong> rider and static sag within target at both ends with the preload adjusters inside their range, front and rear balanced so the bike sits level, and both twin shocks set identically."
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
          "type": "p",
          "html": "<strong>Compression damping</strong> resists the wheel moving up; <strong>rebound damping</strong> resists the spring pushing it back down. Compression damping must stay light enough to let the wheel rise over a bump without harshness; rebound must control the energy the spring gives back, or the chassis and wheel overshoot and oscillate."
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
          "html": "Adjusters on shim-stack dampers vary a bleed (bypass) needle that controls low-speed flow, and sometimes the preload on the shim stack for high-speed flow. Changes are made one or two clicks at a time, from a recorded baseline."
        },
        {
          "type": "h3",
          "text": [
            "Fork types and fork oil"
          ]
        },
        {
          "type": "table",
          "head": [
            "Fork",
            "Construction",
            "Notes"
          ],
          "rows": [
            [
              "Damper-rod",
              "A tube bolted to the bottom of the slider, with holes that meter oil and a piston ring at the top sliding in the fork tube",
              "Simple and cheap: K-Light 125 and most commuters; orifice damping"
            ],
            [
              "Cartridge",
              "A sealed internal tube with shim-stacked compression and rebound pistons",
              "Far better control and adjustment; closed cartridges are pressurised against cavitation; some forks damp in one leg and spring in the other"
            ],
            [
              "Upside-down (USD)",
              "Large tube in the clamps, slim tube at the axle",
              "More bending stiffness where the bending moment is highest and less unsprung mass, but the seals are exposed to stones and dirt"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The K-Light 125 uses a simple <strong>damper-rod fork</strong>. Cartridge forks use shim-stacked pistons; <strong>USD forks</strong> put the big tube in the clamps for stiffness and lower unsprung mass but expose the seals. Fork oil: <strong>46# (ISO VG 46), 285 ± 2 ml per leg</strong>. The air gap acts as a progressive air spring, so a higher oil level resists bottoming more. <strong>Milky oil</strong> means water past the seals."
        },
        {
          "type": "p",
          "html": "Fork oil viscosity sets damping force, and the \"W\" numbers of fork oils are not standardised between brands, so oils are compared by kinematic viscosity in mm²/s (cSt) at 40 °C. A 46# oil is ISO VG 46, about 46 mm²/s at 40 °C. A higher oil level leaves less air, which reaches high pressure sooner and so resists bottoming more."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "K-Light 125 front and rear suspension",
          "html": "Damper-rod fork, oil seal 37 × 50 × 11 mm. Spring free length <strong>300 mm, minimum 295 mm</strong>. Oil 46#, <strong>285 ± 2 ml per leg</strong>. Damper rod bolt 15–20 N·m with thread lock; fork cap 12–18 N·m; lower clamp bolts 45–50 N·m; upper clamp bolts 22–29 N·m. Rear shock upper nut 45–50 N·m, lower bolt 22–29 N·m; swingarm pivot nut 85–98 N·m (K-Light 125 manual)."
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
          "html": "A monoshock may mount directly to the swingarm (as on many small road bikes) or work through a <strong>linkage</strong> of rocker and pull rod. The linkage makes the shock move little per millimetre of wheel travel near full extension and more near full compression, so the effective wheel rate rises through the stroke: compliant on small bumps, resistant to bottoming."
        },
        {
          "type": "eq",
          "id": "m4-wheel-rate",
          "name": "Wheel rate from shock spring rate",
          "tex": "k_w \\approx \\frac{k_s}{R^2}, \\qquad R = \\frac{\\Delta x_\\mathrm{wheel}}{\\Delta x_\\mathrm{shock}}",
          "where": [
            [
              "k_w",
              "effective spring rate at the wheel",
              "N/mm"
            ],
            [
              "k_s",
              "rate of the shock spring",
              "N/mm"
            ],
            [
              "R",
              "motion ratio: wheel travel per unit of shock travel, typically 2–3",
              ""
            ]
          ],
          "why": "The lever of the swingarm reduces the shock spring's effect at the wheel by the square of the motion ratio (once for force, once for travel). It is why monoshock springs are several times stiffer than the wheel rate they give.",
          "example": "A 50 N/mm spring at a motion ratio of 2.5 gives \\(k_w \\approx 50/2.5^2 = 50/6.25 = 8\\ \\mathrm{N/mm}\\) at the wheel."
        },
        {
          "type": "p",
          "html": "Twin shocks (as on the K-Light 125) give a nearly linear ratio, so \\(R\\) is close to constant through the travel; on a rising-rate linkage \\(R\\) falls as the wheel rises, and the formula applies at each point of the stroke."
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
          "type": "h3",
          "text": [
            "Rear suspension checks"
          ]
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Shock damping",
              "html": "Push the rear down hard and release: it should return once and stop. Bouncing more than once means fading damping (<a href=\"../repair/repairs/rear-shock-check/\">rear shock check</a>)."
            },
            {
              "title": "Shock body and mounts",
              "html": "Look for oil at the shaft seal, a bent shaft and worn mounting bushes. Most OEM shocks on small bikes are sealed and replaced as a unit, as the K-Light 125 manual directs for a bent rod or fatigued spring."
            },
            {
              "title": "Swingarm and linkage",
              "html": "With the rear wheel lifted, push the wheel sideways for pivot play. Linkage needle bearings and bushes are greased at about 10,000–20,000 km on road bikes and after a few wet rides off-road; a seized linkage makes the rear harsh and wears the shock."
            }
          ]
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
          "type": "callout",
          "tone": "safety",
          "title": "Before stripping a fork",
          "html": "Hang the caliper from a tie, <strong>never</strong> by its hose. Crack the fork cap while the top clamp still holds the tube, and keep pressure on the cap as it comes free: it is under spring preload. Never straighten a bent damper rod; it can crack or bind, so it is replaced."
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
          "type": "p",
          "html": "If a manual specifies an oil <em>level</em> instead of a volume, measure it from the top of the tube with the spring removed and the fork fully compressed. Refit the legs at the same height in the clamps (flush with the top clamp on the K-Light 125) and pump the front brake before riding. Practice: <a href=\"../repair/repairs/fork-oil-seals/\">fork oil seals</a>, <a href=\"../repair/repairs/fork-oil-level-set/\">setting fork oil level</a>, <a href=\"../repair/repairs/fork-inspect/\">fork inspection</a>."
        },
        {
          "type": "p",
          "html": "<strong>Pass criteria:</strong> equal oil volume in both legs, no leaks after compressing the fork several times, smooth travel without notches, legs at equal height, all fasteners at specified torque and a firm brake lever before the road test."
        },
        {
          "type": "check",
          "q": "m4-35"
        },
        {
          "type": "check",
          "q": "m4-36"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Low unsprung mass keeps the tyre on the road and the chassis calm.<br>\\(F = k x\\): preload changes ride height and sag, never the spring rate.<br>Set rider sag to about 25–33 % of travel on a road bike, then read static sag to judge the spring.<br>Rebound damping is normally stronger than compression; damping is set by oil viscosity, level and valving.<br>At the wheel a shock spring is worth \\(k_s/R^2\\); linkages make that rate rise through the stroke."
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
          "type": "p",
          "html": "Spokes are usually laced crossing each other (tangential lacing), so drive and brake torque is carried by spokes pulling on the hub. Spoked wheels need a tube unless the rim is sealed, as with cross-spoke rims that anchor the spokes outside the air chamber. Cast wheels (aluminium alloy, sometimes magnesium) crack or bend instead of deforming gracefully, and they pass more of each impact to the chassis."
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
          "type": "h3",
          "text": [
            "Runout"
          ]
        },
        {
          "type": "p",
          "html": "<strong>Runout</strong> is measured with a dial gauge as the wheel turns on its own bearings or in a truing stand. <strong>Radial</strong> runout is up-and-down movement of the rim; <strong>axial</strong> (lateral) runout is side-to-side. Many manufacturers specify tighter limits for spoked rims than the K-Light 125 figures below, typically 0.5–1.0 mm radial and 0.5–0.8 mm axial in service."
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
          "type": "h3",
          "text": [
            "Truing a spoked wheel"
          ]
        },
        {
          "type": "p",
          "html": "<strong>Truing:</strong> tightening a spoke pulls the rim towards the flange it comes from. For a lateral high spot to the left, tighten the spokes to the right flange and loosen those to the left, a quarter to half a turn over several spokes. Wheel bearings are pressed in on the <strong>outer race only</strong>, sealed side out, with the spacer fitted; removed bearings are not reused."
        },
        {
          "type": "p",
          "html": "For radial runout, tighten the spokes at the high spot and loosen those opposite. Work gradually round the wheel, checking the rim's offset from the hub (dish) with a ruler against the hub face, and finish with all spokes at similar tension: an even ring when tapped, or a tension meter. File any spoke ends that protrude through the nipples and fit a sound rim band before the tube (<a href=\"../repair/repairs/spoke-wheel-true/\">truing a spoked wheel</a>, <a href=\"../repair/repairs/spoke-tension/\">spoke tension</a>, <a href=\"../repair/repairs/spoke-replace/\">replacing a spoke</a>)."
        },
        {
          "type": "h3",
          "text": [
            "Wheel bearings"
          ]
        },
        {
          "type": "p",
          "html": "Wheel bearings are sealed deep-groove ball bearings separated by a spacer tube that the axle clamps. Pressing on the inner race would push the force through the balls into the outer race and dent (brinell) the tracks, which is why a new bearing is pressed on its outer race only. The K-Light 125 manual states that removed bearings <strong>must not be reused</strong> (<a href=\"../repair/repairs/wheel-bearing-check/\">wheel bearing check</a>, <a href=\"../repair/repairs/wheel-bearing-replace/\">wheel bearing replacement</a>)."
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
          "type": "h3",
          "text": [
            "Tyre construction"
          ]
        },
        {
          "type": "table",
          "head": [
            "Construction",
            "Plies",
            "Character"
          ],
          "rows": [
            [
              "Bias (cross-ply)",
              "Two or more nylon or polyester plies at about 30–40° to the circumference, each crossing the last",
              "Sidewall and tread work together: stiff, damage-resistant, for heavy loads, small machines, off-road and cruisers; runs hotter and the patch distorts in corners"
            ],
            [
              "Bias-belted",
              "Bias carcass with an aramid or glass belt under the tread",
              "Tread stabilised at speed"
            ],
            [
              "Radial",
              "One or two plies at close to 90°, with a belt (often a zero-degree spiral-wound steel or aramid belt) under the tread",
              "Sidewall and tread work independently: flatter, cooler, lighter; needs wider rims"
            ]
          ]
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
          "html": "A load index of 54 means <strong>212 kg</strong> per tyre at the reference pressure; for comparison 49 is 185 kg, 59 is 243 kg, 62 is 265 kg and 73 is 365 kg. Older sizes use inch markings such as 3.00-18, and some commuter tyres carry no load and speed suffix."
        },
        {
          "type": "table",
          "head": [
            "Speed symbol",
            "J",
            "K",
            "L",
            "M",
            "N",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "H",
            "V",
            "W"
          ],
          "rows": [
            [
              "km/h",
              "100",
              "110",
              "120",
              "130",
              "140",
              "150",
              "160",
              "170",
              "180",
              "190",
              "210",
              "240",
              "270"
            ]
          ]
        },
        {
          "type": "p",
          "html": "<strong>Bias</strong> plies cross at 30–40°: stiff, tough, but hotter running. <strong>Radial</strong> plies run at about 90° with a belt under the tread: flatter, cooler contact patch, standard above about 400 cc. The DOT code ends in week and year: <strong>2324 = week 23 of 2024</strong>. Inspect from five years, replace at ten regardless of tread."
        },
        {
          "type": "p",
          "html": "\"TL\" means tubeless and \"TT\" tube type; a directional arrow shows rotation; a coloured dot often marks the light spot, aligned with the valve on fitting (<a href=\"../repair/repairs/tyre-age-check/\">tyre age check</a>, <a href=\"../repair/repairs/tyre-inspect/\">tyre inspection</a>)."
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
          "type": "h3",
          "text": [
            "Tread and pressures"
          ]
        },
        {
          "type": "p",
          "html": "<strong>Tread wear indicators</strong> (TWI) are small raised blocks in the main grooves, located by a triangle or \"TWI\" mark on the shoulder. The K-Light 125 limit of 1 mm is also the legal minimum in the UK for machines over 50 cc and in many other countries; check national rules. A rear tyre worn square by straight-line commuting makes the bike drop suddenly into corners and is replaced before the legal limit."
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
          "type": "eq",
          "id": "m4-pressure-units",
          "name": "Tyre pressure: kilopascals and psi",
          "tex": "p_\\mathrm{psi} = \\frac{p_\\mathrm{kPa}}{6.895}",
          "where": [
            [
              "p_\\mathrm{psi}",
              "pressure in pounds per square inch",
              "psi"
            ],
            [
              "p_\\mathrm{kPa}",
              "pressure in kilopascals",
              "kPa"
            ]
          ],
          "why": "Manuals give pressures in kPa (or bar, 1 bar = 100 kPa) while many forecourt gauges read psi. Pressures are always gauge pressures, set cold.",
          "example": "K-Light 125 front: \\(190/6.895 \\approx 27.5\\ \\mathrm{psi}\\); rear \\(210/6.895 \\approx 30.5\\ \\mathrm{psi}\\)."
        },
        {
          "type": "p",
          "html": "Set pressures cold with an accurate gauge; the K-Light 125 tolerance is ± 10 kPa. Under-inflation makes the tyre flex and overheat, wears the shoulders and makes steering heavy and vague (the manual lists low pressure as a cause of heavy steering and instability). Over-inflation shrinks the contact patch, cutting grip and comfort. Raise rear pressure for a passenger or heavy load when the handbook says so (<a href=\"../repair/repairs/tyre-pressure-check/\">tyre pressure check</a>)."
        },
        {
          "type": "h3",
          "text": [
            "Tube, tubeless and puncture repair"
          ]
        },
        {
          "type": "p",
          "html": "A tubeless tyre seals on the bead and rim, and a puncture usually deflates slowly because the rubber grips the object. A tube-type tyre can deflate suddenly when the tube splits."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Remove and inspect",
              "html": "Take the tyre off the rim and inspect the inside for hidden damage; find and remove the object."
            },
            {
              "title": "Check the limits",
              "html": "Most tyre makers permit repairs only in the central tread, for injuries up to about 6 mm, with no repair nearby and no sidewall or shoulder damage. Some limit later speed or forbid motorcycle tyre repair entirely."
            },
            {
              "title": "Clean and ream",
              "html": "Clean and ream the injury from inside."
            },
            {
              "title": "Fit the plug-patch",
              "html": "Pull the plug-patch stem through to fill the hole and bond the patch over the inner liner with vulcanising solution."
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
          "html": "An external string plug goes in without anyone inspecting the inside of the tyre or sealing the liner, so air can migrate into the carcass and the plug can work loose. A tube is repaired with a vulcanised patch, and the tyre is checked inside for the cause (<a href=\"../repair/repairs/tubeless-plug/\">tubeless plug</a>, <a href=\"../repair/repairs/tube-puncture-repair/\">tube puncture repair</a>)."
        },
        {
          "type": "h3",
          "text": [
            "Balancing"
          ]
        },
        {
          "type": "p",
          "html": "<strong>Balancing:</strong> on a stand the heavy spot settles at the bottom; add weight opposite until the wheel stays wherever it is placed. An unbalanced wheel is often felt as a shake in the bars at 80–110 km/h."
        },
        {
          "type": "p",
          "html": "Stick-on weights (5–10 g segments) go on the rim centre; spoke weights clip to the nipples. Narrow motorcycle wheels are usually balanced statically, on their own bearings or a low-friction arbor; dynamic (two-plane) balancing on a machine is used for wide rear tyres (<a href=\"../repair/repairs/wheel-balance/\">wheel balancing</a>)."
        },
        {
          "type": "h3",
          "text": "Job sheet 4.6.1: Removing and fitting a tubeless tyre and balancing"
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Tyres",
              "v": "90/90-17, 130/90-15",
              "p": "tubeless, K-Light 125"
            },
            {
              "l": "Axle nuts",
              "v": "75–88 / 100–113 N·m",
              "p": "front / rear"
            },
            {
              "l": "Seating pressure",
              "v": "per tyre maker",
              "p": "never above the sidewall maximum"
            }
          ]
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Supporting the bike and seating beads",
          "html": "Support the bike securely before removing a wheel; the K-Light 125 manual warns against leaving the front floating unsupported. Never lay a wheel on its disc. When seating beads, wear safety glasses and never exceed the tyre maker's seating pressure."
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
          "type": "p",
          "html": "<strong>Pass criteria:</strong> beads evenly seated with the rim line concentric, no leaks at valve or bead (soap test), wheel stays in any position on the balance stand, correct rotation direction, pressures and axle torques correct (<a href=\"../repair/repairs/tyre-replace/\">tyre replacement</a>, <a href=\"../repair/repairs/tyre-bead-seat/\">seating a bead</a>)."
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
          "type": "p",
          "html": "<strong>Pass criteria:</strong> radial and axial runout within limits, axle straight within 0.2 mm, bearings smooth with no play, seals fitted, axle nut at specified torque (<a href=\"../repair/repairs/wheel-runout-check/\">wheel runout check</a>)."
        },
        {
          "type": "h3",
          "text": [
            "Wheel and tyre faults"
          ]
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Likely cause",
            "Check",
            "Remedy"
          ],
          "rows": [
            [
              "Shake in the bars at 80–110 km/h",
              "Wheel out of balance or bead not seated concentrically",
              "Rim line on both sides; balance on the stand",
              "Reseat the bead; rebalance"
            ],
            [
              "Heavy, vague steering",
              "Low pressure; worn front tyre; tight steering head",
              "Cold pressure; tread profile; head bearings",
              "Set 190/210 kPa (K-Light 125); replace tyre; adjust bearings"
            ],
            [
              "Bike drops suddenly into corners",
              "Rear tyre worn square",
              "Tread profile across the crown",
              "Replace before the wear limit"
            ],
            [
              "Shoulder wear on both edges",
              "Running under-inflated",
              "Pressure history, gauge accuracy",
              "Correct pressure; replace if near limit"
            ],
            [
              "Knock or play felt at the wheel",
              "Worn wheel bearings or loose axle",
              "Rock the wheel with the axle tight",
              "Replace the bearings (never reuse a removed one); torque the axle"
            ],
            [
              "Wobble from the rim",
              "Runout above limit, loose or broken spokes",
              "Dial gauge; tap the spokes",
              "True the wheel or replace the rim"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m4-37"
        },
        {
          "type": "check",
          "q": "m4-22"
        },
        {
          "type": "check",
          "q": "m4-38"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Spoked wheels flex and can be rebuilt; cast wheels run tubeless and stay true but cannot be repaired.<br>Measure radial and axial runout with a dial gauge: K-Light 125 within 1.0 mm, limit 2.0 mm.<br>Press bearings on the outer race only and never reuse a removed bearing.<br>Decode size, construction, load index, speed symbol and DOT date; replace tyres at ten years regardless of tread.<br>Set pressures cold (190/210 kPa on the K-Light 125); a permanent tubeless repair is a plug-patch from inside."
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
          "html": "A brake converts the machine's kinetic energy into heat at the friction faces. Energy depends on the square of speed, so doubling the speed quadruples the heat the brakes must absorb and shed."
        },
        {
          "type": "eq",
          "id": "m4-kinetic-energy",
          "name": "Kinetic energy to be absorbed in a stop",
          "tex": "E = \\tfrac{1}{2}\\, m\\, v^2",
          "where": [
            [
              "E",
              "kinetic energy",
              "J"
            ],
            [
              "m",
              "mass of machine and rider",
              "kg"
            ],
            [
              "v",
              "speed",
              "m/s"
            ]
          ],
          "why": "Tells how much heat the brakes must take in one stop, and why a stop from twice the speed heats them four times as much.",
          "example": "K-Light 125 (145 kg) with an 80 kg rider from 90 km/h (25 m/s): \\(E = 0.5 \\times 225 \\times 25^2 = 70\\,300\\ \\mathrm{J} \\approx 70\\ \\mathrm{kJ}\\)."
        },
        {
          "type": "eq",
          "id": "m4-disc-temperature",
          "name": "Disc temperature rise in one stop",
          "tex": "\\Delta T = \\frac{E_\\mathrm{disc}}{m_\\mathrm{disc}\\, c}",
          "where": [
            [
              "\\Delta T",
              "temperature rise of the disc",
              "K"
            ],
            [
              "E_\\mathrm{disc}",
              "share of the energy that enters this disc",
              "J"
            ],
            [
              "m_\\mathrm{disc}",
              "disc mass",
              "kg"
            ],
            [
              "c",
              "specific heat capacity, about 460 for steel",
              "J/(kg·K)"
            ]
          ],
          "why": "A light disc gets hot fast. Repeated hard stops or a long descent take discs to 300–400 °C and push heat into calipers and fluid, which is why pad fade resistance and fluid boiling point matter.",
          "example": "Front does 70 % of the work and 90 % of that enters a 0.9 kg disc: \\(E_\\mathrm{disc} \\approx 0.7 \\times 0.9 \\times 70.3 \\approx 44\\ \\mathrm{kJ}\\), so \\(\\Delta T = 44\\,000/(0.9 \\times 460) \\approx 106\\ \\mathrm{K}\\)."
        },
        {
          "type": "p",
          "html": "Speed must be in m/s: divide km/h by 3.6. A 300 kg machine and rider at 120 km/h (33.3 m/s) carries about 167 kJ; forgetting the conversion gives a figure more than ten times too large."
        },
        {
          "type": "check",
          "q": "m4-26"
        },
        {
          "type": "figure",
          "fig": "weight-transfer",
          "caption": "Increase braking deceleration and watch load move onto the front tyre: this is why the front brake does most of the work."
        },
        {
          "type": "p",
          "html": "Deceleration moves load onto the front tyre, so in a hard stop on a dry road the front brake does about 70 % of the work and the rear tyre is close to lifting. This is why front brakes are bigger and why a rider who uses only the rear pedal stops in a much longer distance."
        },
        {
          "type": "h3",
          "text": "Drum brakes"
        },
        {
          "type": "p",
          "html": "A drum brake has two curved shoes with bonded linings on a backplate, pivoted at one end on an anchor pin and pushed apart at the other by a flat <strong>cam</strong> turned by a lever, cable or rod; <strong>return springs</strong> pull them back. The drum is part of the hub."
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
          "type": "p",
          "html": "In a single leading shoe brake the leading shoe gives roughly two-thirds of the braking. The twin leading shoe drum has two cams linked by an adjustable rod; it brakes weakly in reverse, and it was fitted to sporting front wheels until discs replaced it in the 1970s. Many commuter and scooter rear brakes (Honda CG125, most 110 cc step-throughs) are still drums."
        },
        {
          "type": "photo",
          "src": "repair-photos/140_single_leading_shoe.jpg",
          "caption": "Single leading shoe drum brake layout"
        },
        {
          "type": "table",
          "head": [
            "Drum wear sign",
            "Meaning"
          ],
          "rows": [
            [
              "Lip on the open edge of the drum",
              "The original diameter: the friction surface has worn; measure the bore"
            ],
            [
              "Hairline heat cracks",
              "Hub weakened: replace it"
            ],
            [
              "Glazing (blue, burnished surface)",
              "Overheated; can be sanded off"
            ],
            [
              "Cam-lever pointer beyond the mark",
              "Shoes or drum near the limit"
            ]
          ]
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
          "type": "eq",
          "id": "m4-line-pressure",
          "name": "Hydraulic line pressure",
          "tex": "p = \\frac{F_\\mathrm{mc}}{A_\\mathrm{mc}}",
          "where": [
            [
              "p",
              "fluid pressure, the same everywhere in the circuit",
              "MPa (N/mm²)"
            ],
            [
              "F_\\mathrm{mc}",
              "force on the master cylinder piston (hand force × lever ratio)",
              "N"
            ],
            [
              "A_\\mathrm{mc}",
              "master cylinder piston area",
              "mm²"
            ]
          ],
          "why": "Pascal's principle: a small master piston creates a pressure that acts equally on every caliper piston. A smaller master cylinder gives more pressure for the same squeeze.",
          "example": "100 N on a 4:1 lever gives 400 N on an 11 mm piston: \\(A_\\mathrm{mc} = \\pi \\times 5.5^2 = 95.0\\ \\mathrm{mm^2}\\), \\(p = 400/95.0 = 4.21\\ \\mathrm{MPa}\\)."
        },
        {
          "type": "eq",
          "id": "m4-clamp-force",
          "name": "Caliper clamp force",
          "tex": "F_\\mathrm{clamp} = p\\, A_\\mathrm{cal}",
          "where": [
            [
              "F_\\mathrm{clamp}",
              "force pressing each pad onto the disc",
              "N"
            ],
            [
              "p",
              "line pressure",
              "MPa (N/mm²)"
            ],
            [
              "A_\\mathrm{cal}",
              "total piston area on one side of the disc",
              "mm²"
            ]
          ],
          "why": "The area ratio \\(A_\\mathrm{cal}/A_\\mathrm{mc}\\) is the hydraulic ratio. Only the pistons on one side count: on a fixed caliper the opposed pistons react against each other, and on a floating caliper the body slides to supply the reaction.",
          "example": "Two 27 mm pistons: \\(A_\\mathrm{cal} = 2 \\times \\pi \\times 13.5^2 = 1145\\ \\mathrm{mm^2}\\), \\(F_\\mathrm{clamp} = 4.21 \\times 1145 \\approx 4820\\ \\mathrm{N}\\); hydraulic ratio \\(1145/95.0 \\approx 12\\)."
        },
        {
          "type": "eq",
          "id": "m4-brake-torque",
          "name": "Brake torque at the disc",
          "tex": "T_b = 2\\, \\mu\\, F_\\mathrm{clamp}\\, r_\\mathrm{eff}",
          "where": [
            [
              "T_b",
              "braking torque on the wheel",
              "N·m"
            ],
            [
              "\\mu",
              "pad friction coefficient, about 0.35–0.50",
              ""
            ],
            [
              "F_\\mathrm{clamp}",
              "clamp force on each pad",
              "N"
            ],
            [
              "r_\\mathrm{eff}",
              "effective radius at the pad centres",
              "m"
            ],
            [
              "2",
              "two pad faces per disc",
              ""
            ]
          ],
          "why": "Both pads grip the disc, so the friction force is twice (mu) times the clamp force; acting at the pad radius, it gives the torque that slows the wheel. Larger discs raise the radius and so the torque.",
          "example": "\\(T_b = 2 \\times 0.40 \\times 4820 \\times 0.120 \\approx 463\\ \\mathrm{N\\,m}\\)."
        },
        {
          "type": "eq",
          "id": "m4-braking-deceleration",
          "name": "Deceleration from brake torque",
          "tex": "a = \\frac{T_b}{r_t\\, m}",
          "where": [
            [
              "a",
              "deceleration",
              "m/s²"
            ],
            [
              "T_b",
              "brake torque on the wheel",
              "N·m"
            ],
            [
              "r_t",
              "rolling radius of the tyre",
              "m"
            ],
            [
              "m",
              "mass of machine and rider",
              "kg"
            ]
          ],
          "why": "Brake torque divided by tyre radius is the braking force at the road; divided by mass it is the deceleration. Dividing by \\(9.81\\) expresses it in g.",
          "example": "\\(a = 463/(0.297 \\times 225) \\approx 6.9\\ \\mathrm{m/s^2}\\), about 0.71 g from the front brake alone."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Lever",
              "html": "100 N hand force \\(\\times\\) 4:1 lever = 400 N on the 11 mm master piston."
            },
            {
              "title": "Pressure",
              "html": "\\(400/95.0\\ \\mathrm{mm^2} = 4.21\\ \\mathrm{MPa}\\)."
            },
            {
              "title": "Clamp",
              "html": "Two 27 mm pistons (1,145 mm²): \\(4.21 \\times 1145 \\approx 4820\\ \\mathrm{N}\\)."
            },
            {
              "title": "Friction",
              "html": "Two pad faces, \\(\\mu = 0.40\\): \\(2 \\times 0.40 \\times 4820 \\approx 3860\\ \\mathrm{N}\\)."
            },
            {
              "title": "Torque",
              "html": "At \\(r_\\mathrm{eff} = 120\\ \\mathrm{mm}\\) on the 280 mm disc: about 463 N·m, roughly 0.71 g from the front brake alone."
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
          "type": "p",
          "html": "The travel cost is fixed by the same ratio: the master cylinder must displace twelve times the fluid volume of the pad clearance taken up. A larger master cylinder gives a harder, less powerful lever; a smaller one a softer, more powerful lever with more travel."
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
          "type": "p",
          "html": "A <strong>radial mount</strong> bolts the caliper to the fork leg with bolts parallel to the disc's radius instead of across it, loading the bracket in a stiffer direction and reducing flex under braking. Discs are solid or drilled stainless steel, fixed to the hub or <strong>floating</strong> on bobbins so they can expand radially without warping."
        },
        {
          "type": "p",
          "html": "The square-section seal distorts as the piston moves out and pulls it back slightly when pressure is released (rollback); as the pads wear the piston slides further through it, so a disc brake adjusts itself. Sintered pads are used only on discs approved for them; semi-metallic and ceramic compounds lie between organic and sintered."
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
          "type": "callout",
          "tone": "warm",
          "title": "K-Light 125 brakes",
          "html": "Front disc 280 mm, 4.0 mm new, 3.0 mm limit; rear disc 240 mm, 5.0 mm new, 4.0 mm limit; runout limit 0.15 mm. Pads 6.0 mm new, 3 mm limit. Fluid DOT 4. Lever free play 10–20 mm, pedal 20–30 mm. Caliper bolts 22–29 N·m; disc bolts 10–12 N·m with thread lock; banjo bolts 30 N·m with new washers; brake light on at about 15 mm lever travel (K-Light 125 manual)."
        },
        {
          "type": "h3",
          "text": [
            "Brake fluid"
          ]
        },
        {
          "type": "p",
          "html": "Glycol-ether fluids (DOT 3, 4 and 5.1) are <strong>hygroscopic</strong>: they absorb water through seals and the reservoir vent. FMVSS 116 sets the minimum boiling points below; the wet figure is at 3.7 % water. DOT 3, 4 and 5.1 mix with each other; silicone DOT 5 never mixes with them."
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
          "type": "p",
          "html": "Glycol fluid strips paint, so cover painted parts. The K-Light 125 manual also warns against fluid from a container that has stood open for a long time, mixing brands or types, and changing fluid in rain or strong wind. Clean brake parts only with brake fluid, isopropyl alcohol or ethanol: petrol and mineral oils swell the rubber seals (<a href=\"../repair/repairs/brake-fluid-check/\">brake fluid check</a>)."
        },
        {
          "type": "check",
          "q": "m4-24"
        },
        {
          "type": "h3",
          "text": "CBS and ABS"
        },
        {
          "type": "p",
          "html": "A <strong>combined braking system</strong> applies both brakes from one control, so a rider who uses only the rear pedal (common among commuter riders) still gets front braking. On the K-Light 125 the handlebar lever works the front brake alone; the pedal feeds the rear caliper and, through the CBS pump (a secondary master cylinder with its own reservoir, adjusting valve and plunger), one piston circuit of the front caliper."
        },
        {
          "type": "p",
          "html": "On the K-Light 125 the rear pedal also feeds one piston circuit of the front caliper through a <strong>CBS pump</strong>. If the front caliper leaks, fully screwing in the CBS adjusting bolt lets the rear brake work alone until repair."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Internal leak test",
              "html": "Hold the pedal down and screw in the CBS adjusting bolt by hand. If it turns, the CBS pump leaks internally and is replaced (K-Light 125 manual; <a href=\"../repair/repairs/cbs-check/\">CBS check</a>)."
            },
            {
              "title": "Pushrod clearance",
              "html": "Set the pedal pushrod clearance to 0–0.2 mm so the plunger is not pre-loaded and the brake cannot drag."
            }
          ]
        },
        {
          "type": "p",
          "html": "Mechanical CBS on scooters (Honda, Hero, TVS) uses an equaliser link on the left lever that pulls both brake cables. Moto Guzzi fitted linked \"integral\" brakes from 1975 (850 T3), and Honda's Dual-CBS links both controls to several caliper pistons on larger machines."
        },
        {
          "type": "p",
          "html": "<strong>ABS</strong> reads toothed tone rings with wheel speed sensors. When slip exceeds roughly 10–30 %, the modulator closes the inlet valve to hold pressure, opens the outlet to dump fluid to an accumulator, and the pump returns it, cycling several times a second. <strong>Cornering ABS</strong> adds an IMU for lean and pitch."
        },
        {
          "type": "p",
          "html": "The rider feels ABS working as pulsing at the lever. BMW offered the first production motorcycle ABS on the K100 in 1988, and modern units weigh well under 1 kg. Cornering ABS (first fitted as Bosch Motorcycle Stability Control on the 2013 KTM 1190 Adventure) reduces pressure build-up and slip thresholds at lean; rear-lift mitigation cuts front pressure when the rear wheel slows faster than the front, a sign of a stoppie."
        },
        {
          "type": "table",
          "head": [
            "ABS warning lamp: common cause",
            "Check"
          ],
          "rows": [
            [
              "Damaged or dirty tone ring",
              "Inspect teeth, clean"
            ],
            [
              "Sensor air gap out of specification",
              "Typically 0.4–1.2 mm; measure with feelers"
            ],
            [
              "Mismatched tyre sizes",
              "Fit the specified sizes"
            ],
            [
              "Low battery voltage",
              "Test and charge the battery"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Faults are read with a diagnostic tool, and bleeding an ABS modulator may need the tool to cycle its valves (<a href=\"../repair/repairs/abs-check/\">ABS check</a>)."
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
          "type": "p",
          "html": "In the EU the ABS rule above 125 cc applied to new types from 1 January 2016. In India, CBS or ABS at or below 125 cc and ABS above applied to new models from April 2018. A June 2025 Indian draft proposed ABS on all new L2 two-wheelers from January 2026 but was contested; check the current notified text before relying on it."
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
          "type": "p",
          "html": "Practice: <a href=\"../repair/repairs/brake-pad-check/\">pad check</a>, <a href=\"../repair/repairs/brake-pad-replace/\">pad replacement</a>, <a href=\"../repair/repairs/brake-disc-check/\">disc check</a>, <a href=\"../repair/repairs/caliper-clean/\">caliper cleaning</a> and <a href=\"../repair/repairs/caliper-rebuild/\">caliper rebuild</a>."
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
          "type": "p",
          "html": "Practice: <a href=\"../repair/repairs/brake-bleed/\">bleeding</a>, <a href=\"../repair/repairs/brake-hose-check/\">hose check</a>, <a href=\"../repair/repairs/master-cylinder-check/\">master cylinder check</a>."
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
          "type": "p",
          "html": "Practice: <a href=\"../repair/repairs/drum-brake-service/\">drum brake service</a>, <a href=\"../repair/repairs/drum-brake-adjust/\">drum adjustment</a>, <a href=\"../repair/repairs/brake-drag-check/\">brake drag check</a>."
        },
        {
          "type": "check",
          "q": "m4-39"
        },
        {
          "type": "check",
          "q": "m4-40"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Brakes turn \\(\\tfrac{1}{2} m v^2\\) into heat; the disc temperature rise is \\(E_\\mathrm{disc}/(m_\\mathrm{disc} c)\\).<br>Hydraulics multiply force by the area ratio \\(A_\\mathrm{cal}/A_\\mathrm{mc}\\) and the lever ratio, at the cost of lever travel.<br>Brake torque is \\(2 \\mu F_\\mathrm{clamp} r_\\mathrm{eff}\\), counting the pistons on one side only.<br>Glycol fluid absorbs water and its boiling point falls: replace DOT 4 every two years and never mix DOT 5.<br>CBS links the pedal to the front brake; ABS releases and reapplies pressure when wheel slip exceeds about 10–30 %."
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
          "type": "p",
          "html": "The I code means inspect, and clean, adjust or replace as needed. Emission-related items are marked in the schedule and must be serviced on time to keep the machine legal. The manual asks for shorter intervals for dusty roads, high-speed use and high mileage."
        },
        {
          "type": "p",
          "html": "The table combines the chassis and drivetrain entries of the K-Light 125 schedule with typical OEM practice for items the schedule does not list separately (I inspect, C clean, R replace, L lubricate)."
        },
        {
          "type": "table",
          "head": [
            "Item",
            "300 km (first)",
            "Every 3,000 km / 3 months",
            "Every 6,000 km / 6 months",
            "Every 12,000 km / 12 months",
            "Notes"
          ],
          "rows": [
            [
              "Engine oil",
              "R",
              "R",
              "R",
              "R",
              "Oil filter cleaned at 300, 6,000 and 12,000 km (K-Light 125)"
            ],
            [
              "Air filter",
              "I",
              "C",
              "C",
              "R",
              "Clean more often in dust"
            ],
            [
              "Drive chain",
              "I (adjust)",
              "I, L",
              "I, L",
              "I, L",
              "Slack 20–40 mm; lubricate every 500–800 km"
            ],
            [
              "Clutch free play",
              "I",
              "I",
              "I",
              "I",
              "10–15 mm"
            ],
            [
              "Brakes: pads, discs, free play, hoses",
              "I",
              "I",
              "I",
              "I",
              "Pads to 3 mm limit; fluid replaced every 2 years (typical OEM)"
            ],
            [
              "Tyres and pressures",
              "I",
              "I",
              "I",
              "I",
              "Also monthly and before long trips"
            ],
            [
              "Steering head bearings",
              "I",
              "",
              "I",
              "I",
              "Regrease every 2 years typical"
            ],
            [
              "Suspension, fork oil",
              "I",
              "",
              "I",
              "I",
              "Fork oil typically 12,000–24,000 km or 2 years"
            ],
            [
              "Wheels, runout, bearings",
              "I",
              "",
              "I",
              "I",
              ""
            ],
            [
              "Fasteners, stands, footpegs",
              "I",
              "I",
              "I",
              "I",
              "Torque wrench to specification"
            ],
            [
              "Lights, horn, switches, interlocks",
              "I",
              "I",
              "I",
              "I",
              ""
            ],
            [
              "Chassis lubrication (pivots, cables)",
              "",
              "",
              "L",
              "L",
              "Manual: lubrication of parts of body"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Engine items such as valve clearance, spark plug and throttle body follow the same schedule and are covered in modules 2 and 3 (<a href=\"../repair/repairs/service-schedule/\">service schedule</a>)."
        },
        {
          "type": "photo",
          "src": "repair-photos/048_parts_tray.jpg",
          "caption": "Parts tray holding bolts from one assembly",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "eq",
          "id": "m4-service-due",
          "name": "Service due: distance or time, whichever first",
          "tex": "t_\\mathrm{due} = \\min\\!\\left( \\frac{D}{d_m},\\; t_\\mathrm{max} \\right)",
          "where": [
            [
              "t_\\mathrm{due}",
              "time until the service is due",
              "months"
            ],
            [
              "D",
              "distance interval of the task",
              "km"
            ],
            [
              "d_m",
              "the owner's distance ridden per month",
              "km/month"
            ],
            [
              "t_\\mathrm{max}",
              "time interval of the task",
              "months"
            ]
          ],
          "why": "Turns a schedule written in kilometres and months into a date for one owner. High-mileage riders are governed by distance, low-mileage riders by time.",
          "example": "Oil every 3,000 km or 3 months at 800 km a month: \\(\\min(3000/800,\\ 3) = \\min(3.75,\\ 3) = 3\\) months, so about \\(3 \\times 800 = 2400\\ \\mathrm{km}\\) after the last change. At 500 km a year the time limit governs every time."
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
          "type": "p",
          "html": "The Motorcycle Safety Foundation's <strong>T-CLOCS</strong> checklist covers what a rider checks before every ride. It takes a few minutes and catches the faults that cause most roadside failures: low tyres, slack chains, dead bulbs and leaks (<a href=\"../repair/repairs/pre-ride-check/\">pre-ride check</a>)."
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
          "type": "p",
          "html": "Under controls, hoses are checked for cracks and cables for kinks and fraying. Under lights, battery terminals are checked for security. Under tyres, the brakes are operated and the wheel turned to feel for drag."
        },
        {
          "type": "h3",
          "text": "Chassis tune-up"
        },
        {
          "type": "p",
          "html": "A chassis tune-up complements the engine tune-up of module 2: it inspects and lubricates every control cable, sets clutch, brake and throttle free play, checks every fastener, services the chain and sprockets, checks horn, lights and safety equipment, checks wheels for damage and loose spokes, sets tyre pressures and fluid levels, aims the headlight, lubricates the chassis to the manual and finishes with a wipe-down."
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
          "type": "steps",
          "items": [
            {
              "title": "Cables",
              "html": "Lubricate the inner wire and pivots with a pressure luber or by drip (Teflon-lined cables need no oil). Route away from hot surfaces and tight bends; remove the fuel tank if a new cable passes under it (<a href=\"../repair/repairs/cable-lube/\">cable lubrication</a>)."
            },
            {
              "title": "Free play",
              "html": "Clutch 10–15 mm, front brake lever 10–20 mm, rear pedal 20–30 mm on the K-Light 125; throttle to the manual (<a href=\"../repair/repairs/throttle-cable-adjust/\">throttle cable adjustment</a>)."
            },
            {
              "title": "Fasteners",
              "html": "Fork clamps, steering stem nut, axle nuts, caliper and disc bolts, swingarm pivot, shock mounts, footpeg brackets and stands, with a torque wrench to specification (<a href=\"../repair/repairs/fastener-check/\">fastener check</a>)."
            },
            {
              "title": "Headlight aim",
              "html": "On level ground with the rider seated, against a wall chart or beam setter (<a href=\"../repair/repairs/headlight-aim/\">headlight aim</a>)."
            },
            {
              "title": "Detailing",
              "html": "No silicone dressing on seats, grips or tyres, since it makes them slippery; no wax on matt finishes."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Pre-delivery inspection"
        },
        {
          "type": "p",
          "html": "The pre-delivery inspection (PDI) is the dealer's legal and safety responsibility. Modern machines arrive more complete than they once did, but every assembly step and fluid still has to be checked by a technician before the bike is handed over (<a href=\"../repair/repairs/pre-delivery-inspection/\">pre-delivery inspection</a>)."
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
          "type": "table",
          "head": [
            "PDI check",
            "Detail"
          ],
          "rows": [
            [
              "Battery",
              "Above about 12.6 V open-circuit for a fully charged 12 V lead-acid battery; dry-charged batteries are filled and charged first"
            ],
            [
              "Fluids",
              "Engine oil, final-drive oil on shaft machines, coolant, brake and clutch fluid, all to the specified grades"
            ],
            [
              "Fuel",
              "Check for leaks at the tank, pump, hoses and injector"
            ],
            [
              "Interlocks",
              "Side stand, clutch and neutral switches, kill switch, ABS lamp self-check"
            ],
            [
              "Fasteners",
              "Fork clamps, steering stem nut, caliper bolts, swingarm pivot, shock mounts, footpeg brackets"
            ],
            [
              "Hand-over",
              "Toolkit, manual and keys; running-in advice; first service at 300 km (K-Light 125)"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Anti-corrosion wax on the exhaust smokes when first heated, so it is removed before the road test. The road test covers each brake separately and, on CBS machines, the combined function from the pedal."
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
          "type": "check",
          "q": "m4-41"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Service intervals run on distance or time, whichever comes first; low-mileage bikes are governed by time.<br>The K-Light 125 schedule assumes 1,000 km a month and codes tasks I, A, C, R and L.<br>T-CLOCS: tyres and wheels, controls, lights, oil and fluids, chassis, stands.<br>A chassis tune-up covers cables, free play, fasteners, chain, wheels, tyres, fluids and headlight aim; idle must not rise as the bars turn.<br>A PDI ends only after every touched fastener is torqued, the bike is road-tested and the results are recorded."
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
