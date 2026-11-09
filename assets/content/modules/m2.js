/* Motopedia: Module 2 lessons. Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "engine",
  "num": "2",
  "title": "The engine: four-stroke and two-stroke",
  "intro": "How a petrol engine turns burning fuel into crankshaft torque, how four-strokes and two-strokes are built, lubricated and cooled, and how a technician measures, diagnoses and repairs them.",
  "pdf": "motopedia-module-2-engine.pdf",
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
          "html": "A petrol engine is a <strong>heat engine</strong>: it burns air and fuel inside a sealed chamber whose volume changes as the piston moves. Petrol has a lower heating value of about <strong>43 MJ/kg</strong>, and it burns completely at the chemically correct (<strong>stoichiometric</strong>) ratio of <strong>14.7 kg of air per kg of fuel</strong>. Every number later in this chapter, from compression ratio to volumetric efficiency, describes how much of that air the engine traps and how well it turns the heat into work."
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
          "type": "p",
          "html": "The recurring example in this module is the K-Light 125. Its QJ157FMI engine is an air-cooled, two-valve single with a spherical combustion chamber, electronic fuel injection through a 30 mm throttle body, and pressure and splash lubrication from a 1.1 L wet sump (K-Light 125 manual). It uses the same 56.5 × 49.5 mm bore and stroke as the Honda CG125, from which the 157FMI family is derived, so most of what follows also applies to the many CG-type engines in service worldwide."
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
          "type": "p",
          "html": "Timing the spark is therefore a compromise that changes with speed and load. At higher rpm the flame needs the same time but the crank turns further in that time, so the ECU advances the spark; at high load the denser charge burns faster and is closer to knock, so less advance is used. The aim at every operating point is to place peak pressure where the crank has leverage, about 10–15° after TDC."
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
          "html": "The air-standard <strong>Otto cycle</strong> is the idealised model of a spark-ignition engine. It makes four simplifying assumptions: the working gas is air with constant specific heats; compression and expansion are reversible and adiabatic (no friction, no heat loss); heat is added instantly at constant volume at TDC; and heat is rejected at constant volume at BDC, standing in for the exhaust and intake strokes. Under those assumptions the efficiency depends on only two quantities."
        },
        {
          "type": "eq",
          "id": "m2-otto-efficiency",
          "name": "Ideal Otto cycle efficiency",
          "tex": "\\eta = 1 - \\frac{1}{r^{\\gamma - 1}}",
          "where": [
            [
              "\\eta",
              "ideal thermal efficiency, the fraction of fuel energy turned into work",
              "–"
            ],
            [
              "r",
              "compression ratio",
              "–"
            ],
            [
              "\\gamma",
              "ratio of specific heats of the gas: 1.4 for cold air, about 1.25–1.3 for a hot fuel-air mixture",
              "–"
            ]
          ],
          "why": "Shows why a higher compression ratio gives a more efficient engine, and why that gain shrinks as the ratio rises. It sets the upper bound that friction, heat loss and slow combustion then pull a real engine down from.",
          "example": "K-Light 125 at \\(r = 9\\), \\(\\gamma = 1.3\\): \\(\\eta = 1 - 9^{-0.3} = 1 - 0.517 = 0.483\\), or 48.3 %."
        },
        {
          "type": "p",
          "html": "The physical reason is that a higher compression ratio also gives a higher <strong>expansion ratio</strong>. The burnt gas is expanded further before the exhaust opens, so it gives up more of its energy to the piston and leaves cooler. The curve flattens as \\(r\\) rises: each extra unit of compression buys less efficiency than the one before."
        },
        {
          "type": "table",
          "head": [
            "K-Light 125, \\(r = 9\\)",
            "Efficiency"
          ],
          "rows": [
            [
              "Ideal, \\(\\gamma = 1.4\\) (cold air)",
              "58.5 %"
            ],
            [
              "Ideal, \\(\\gamma = 1.3\\) (hot mixture)",
              "48.3 %"
            ],
            [
              "Ideal, \\(\\gamma = 1.3\\), if \\(r\\) were 12",
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
          "html": "The gap between 48 % and about 30 % has four main causes. Heat flows from the hot gas into the head, cylinder and piston; the charge burns over 40–60° of crank angle instead of instantly at TDC; the piston does <strong>pumping work</strong> drawing charge in and pushing exhaust out; and friction in rings, bearings and valve train takes 10–20 % of the indicated work at full load and much more at part load, which is why small engines are least efficient when cruising gently."
        },
        {
          "type": "p",
          "html": "The Otto formula also explains why compression ratio is capped. Raising \\(r\\) from 9 to 12 lifts the ideal efficiency from 48.3 % to 52.5 %, but the hotter, denser end gas comes closer to knock. Fuel octane, chamber shape, bore size, cooling and knock-sensor timing control set the usable limit, so air-cooled commuter singles typically run 9–10:1 and liquid-cooled four-valve sports engines 12–14:1."
        },
        {
          "type": "h3",
          "text": "Displacement and compression ratio"
        },
        {
          "type": "p",
          "html": "<strong>Swept volume</strong> (displacement) is the volume the piston crown sweeps between bottom dead centre (BDC) and top dead centre (TDC), multiplied by the number of cylinders. The stroke is the piston travel from TDC to BDC, which equals twice the crank throw."
        },
        {
          "type": "eq",
          "id": "m2-displacement",
          "name": "Engine displacement (swept volume)",
          "tex": "V = \\frac{\\pi}{4}\\,B^2\\,S\\,n",
          "where": [
            [
              "V",
              "displacement (swept volume)",
              "cm³ if B and S are in cm"
            ],
            [
              "B",
              "bore, the cylinder diameter",
              "cm"
            ],
            [
              "S",
              "stroke, piston travel from TDC to BDC",
              "cm"
            ],
            [
              "n",
              "number of cylinders",
              "–"
            ]
          ],
          "why": "Turns the bore and stroke on a spec sheet into the engine size used for licensing, tax and comparison, and shows that bore counts twice (squared) while stroke counts once.",
          "example": "K-Light 125: \\(V = 0.7854 \\times 5.65^2 \\times 4.95 \\times 1 = 124.1\\ \\mathrm{cm^3}\\), which the manual rounds to 124 cm³."
        },
        {
          "type": "p",
          "html": "Working in centimetres gives the answer directly in cm³; working in millimetres gives mm³, which must be divided by 1,000. Because bore is squared, a bore increase of 10 % raises displacement by 21 %, which is why big-bore kits are the common way to enlarge a single."
        },
        {
          "type": "eq",
          "id": "m2-compression-ratio",
          "name": "Compression ratio and clearance volume",
          "tex": "r = \\frac{V_s + V_c}{V_c} \\qquad V_c = \\frac{V_s}{r - 1}",
          "where": [
            [
              "r",
              "geometric compression ratio",
              "–"
            ],
            [
              "V_s",
              "swept volume of one cylinder",
              "cm³"
            ],
            [
              "V_c",
              "clearance volume left above the piston at TDC",
              "cm³"
            ]
          ],
          "why": "Links the compression ratio on a spec sheet to the small volume above the piston at TDC, so the effect of skimming a head, changing a gasket or carbon build-up can be predicted before it causes knock or low compression.",
          "example": "K-Light 125 at \\(r = 9\\): \\(V_c = 124.1 / 8 = 15.5\\ \\mathrm{cm^3}\\)."
        },
        {
          "type": "p",
          "html": "The <strong>clearance volume</strong> is not just the chamber in the head. It also includes any dish in the piston crown, the volume of the compressed head gasket and the small annular space above the top ring land. Because it is only about 15 cm³ on a 125, small changes to any of these move the compression ratio noticeably."
        },
        {
          "type": "figure",
          "fig": "engine-params",
          "caption": "Set bore 56.5 mm and stroke 49.5 mm: you should get about 124 cm³. Now raise the bore to 62 mm (about 149 cm³), then move compression from 9:1 to 11:1 and watch the ideal efficiency rise from 48.3 % to 51.3 % (γ = 1.3)."
        },
        {
          "type": "p",
          "html": "Skimming <strong>0.10 mm</strong> off the head face removes \\(\\frac{\\pi}{4} \\times 5.65^2 \\times 0.010 = 0.25\\ \\mathrm{cm^3}\\) from \\(V_c\\) and lifts \\(r\\) from 9 to 9.13; a head gasket 0.20 mm thicker adds 0.50 cm³ and drops it to 8.76. Carbon deposits shrink \\(V_c\\) too, which is why the K-Light 125 manual lists excessive carbon among the causes of compression pressure that is too high."
        },
        {
          "type": "table",
          "head": [
            "K-Light 125 change",
            "New \\(V_c\\)",
            "New \\(r\\)"
          ],
          "rows": [
            [
              "As built",
              "15.5 cm³",
              "9.0:1"
            ],
            [
              "Head face skimmed 0.10 mm",
              "15.26 cm³",
              "9.13:1"
            ],
            [
              "Head face skimmed 0.25 mm",
              "14.88 cm³",
              "9.34:1"
            ],
            [
              "Head gasket 0.20 mm thicker",
              "16.0 cm³",
              "8.76:1"
            ],
            [
              "Carbon build-up on crown and chamber",
              "smaller",
              "higher, toward knock"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Workshop consequence: the thin head gasket",
          "html": "A thinner aftermarket head gasket reduces \\(V_c\\) and raises the compression ratio, so the end gas is hotter and at higher pressure when the flame arrives. With unchanged timing and fuel it can auto-ignite, heard as pinking under load on hills. Fit the specified gasket thickness and check the chamber for carbon. Heavy head resurfacing beyond the 0.05 mm flatness limit is a sign the head should be replaced rather than machined."
        },
        {
          "type": "p",
          "html": "The geometric ratio differs from the <strong>effective (dynamic) compression ratio</strong>. The four-stroke inlet valve and the two-stroke exhaust port both close well after BDC, and real compression starts only then. Two-stroke makers therefore often quote a trapped ratio: Yamaha lists the YZ125 at 8.2–10.1:1, the range reflecting the power-valve position."
        },
        {
          "type": "h3",
          "text": "Bore/stroke ratio and mean piston speed"
        },
        {
          "type": "eq",
          "id": "m2-bore-stroke-ratio",
          "name": "Bore/stroke ratio",
          "tex": "\\text{B/S} = \\frac{B}{S}",
          "where": [
            [
              "B",
              "bore",
              "mm"
            ],
            [
              "S",
              "stroke",
              "mm"
            ]
          ],
          "why": "Describes the shape of the cylinder and so the likely character of the engine: over-square engines (above 1) favour high rpm, under-square engines (below 1) favour low-speed torque.",
          "example": "K-Light 125: \\(56.5 / 49.5 = 1.14\\), moderately over-square."
        },
        {
          "type": "p",
          "html": "Above 1 the engine is <strong>over-square</strong> (short-stroke), at 1 it is square, and below 1 it is <strong>under-square</strong> (long-stroke). The K-Light 125 at 1.14 is moderately over-square, the Yamaha YZ125 at 54.0 × 54.5 mm (0.99) is essentially square, and a modern 1,000 cm³ superbike four runs about 1.4–1.6. The trade-offs follow from geometry and piston speed."
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
            ],
            [
              "Crank throw and rod loads",
              "Shorter throw, lower inertia loads per rpm",
              "Longer throw, higher inertia loads"
            ]
          ]
        },
        {
          "type": "eq",
          "id": "m2-mean-piston-speed",
          "name": "Mean piston speed",
          "tex": "c_m = \\frac{2\\,S\\,N}{60}",
          "where": [
            [
              "c_m",
              "mean piston speed",
              "m/s"
            ],
            [
              "S",
              "stroke",
              "m"
            ],
            [
              "N",
              "crankshaft speed",
              "rev/min"
            ]
          ],
          "why": "The piston covers two strokes per revolution, so this gives its average speed. It indexes stress and wear better than rpm alone, because inertia forces grow with the square of speed and ring friction with sliding speed.",
          "example": "K-Light 125 at peak power: \\(c_m = 2 \\times 0.0495 \\times 9000 / 60 = 14.9\\ \\mathrm{m/s}\\)."
        },
        {
          "type": "table",
          "head": [
            "Engine",
            "Stroke",
            "Speed",
            "Mean piston speed"
          ],
          "rows": [
            [
              "K-Light 125 at peak torque",
              "49.5 mm",
              "7,500 rpm",
              "12.4 m/s"
            ],
            [
              "K-Light 125 at peak power",
              "49.5 mm",
              "9,000 rpm",
              "14.9 m/s"
            ],
            [
              "Yamaha YZ125 two-stroke",
              "54.5 mm",
              "about 11,500 rpm",
              "20.9 m/s"
            ],
            [
              "Typical long-life commuter at peak power",
              "–",
              "–",
              "13–16 m/s"
            ],
            [
              "Typical sports road engine",
              "–",
              "–",
              "18–22 m/s"
            ],
            [
              "Typical racing engine (special materials)",
              "–",
              "–",
              "24–26 m/s"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Mean piston speed explains why short-stroke engines rev higher: at the same \\(c_m\\), halving the stroke doubles the permissible rpm. Racing engines that run 24–26 m/s pay for it with special materials and short service intervals, while a commuter engine kept near 15 m/s can run tens of thousands of kilometres between top-end overhauls."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Open the <a href=\"../overview/?mode=4t&part=engine\">engine in the Overview</a>. Its sliders move in whole millimetres, so set bore 57 mm and stroke 50 mm (the nearest settings to the K-Light 125's 56.5 × 49.5 mm), calculate the displacement (\\(\\frac{\\pi}{4} \\times 5.7^2 \\times 5.0 \\approx 128\\ \\mathrm{cm^3}\\)) and compare it with the Outputs panel; the true K-Light figure is 124 cm³. Raise the bore to 62 mm with the stroke unchanged and recalculate (about 151 cm³). Move the compression ratio from 9:1 to 11:1 and work out the change in ideal Otto efficiency at \\(\\gamma = 1.3\\) (48.3 % to 51.3 %), then set a short and a long stroke at 9000 rpm and compare the mean piston speeds."
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
          "html": "<strong>Torque</strong> is the turning moment at the crankshaft, measured on a dynamometer in N·m. <strong>Power</strong> is torque multiplied by angular speed, \\(P = T\\,\\omega\\) (module 1). Workshop data give speed in rev/min and power in kW, so a version with the conversion built in is used more often."
        },
        {
          "type": "eq",
          "id": "m2-power-kw",
          "name": "Power in kilowatts from torque and rpm",
          "tex": "P = \\frac{T\\,N}{9549}",
          "where": [
            [
              "P",
              "power",
              "kW"
            ],
            [
              "T",
              "torque",
              "N·m"
            ],
            [
              "N",
              "crankshaft speed",
              "rev/min"
            ]
          ],
          "why": "The everyday form of \\(P = T\\,\\omega\\): the constant 9549 is \\(60000 / 2\\pi\\), combining rev/min to rad/s and W to kW. It converts between the torque and power figures on a spec sheet or dyno chart.",
          "example": "K-Light 125: \\(P = 8.9 \\times 7500 / 9549 = 6.99\\ \\mathrm{kW}\\) at peak torque; the 7.8 kW peak at 9000 rpm implies \\(T = 7.8 \\times 9549 / 9000 = 8.28\\ \\mathrm{N\\,m}\\)."
        },
        {
          "type": "p",
          "html": "Power peaks above the torque peak because, beyond the torque peak, torque falls more slowly than rpm rises. Power keeps climbing until the percentage fall in torque per extra rpm equals the percentage rise in speed; above that point it falls too."
        },
        {
          "type": "figure",
          "fig": "power-torque",
          "caption": "Enter 8.9 N·m at 7,500 rpm and confirm about 7.0 kW; then try 8.28 N·m at 9,000 rpm for the quoted 7.8 kW peak."
        },
        {
          "type": "p",
          "html": "Torque alone cannot compare a 125 with a 1,000 cm³ engine, because bigger engines make more torque simply by being bigger. <strong>Brake mean effective pressure (BMEP)</strong> removes size: it is the constant pressure that, acting on the piston over each power stroke, would produce the measured brake torque."
        },
        {
          "type": "eq",
          "id": "m2-bmep",
          "name": "Brake mean effective pressure (BMEP)",
          "tex": "\\mathrm{BMEP}_{4T} = \\frac{4\\pi\\,T}{V_d} \\qquad \\mathrm{BMEP}_{2T} = \\frac{2\\pi\\,T}{V_d}",
          "where": [
            [
              "\\mathrm{BMEP}",
              "brake mean effective pressure",
              "Pa (divide by 100,000 for bar)"
            ],
            [
              "T",
              "brake torque",
              "N·m"
            ],
            [
              "V_d",
              "total displacement",
              "m³"
            ]
          ],
          "why": "Measures how well an engine breathes and burns per litre, independent of size, so a commuter single, a superbike and a two-stroke can be compared on equal terms. A low figure on a healthy-looking engine points to breathing or combustion losses.",
          "example": "K-Light 125 at peak torque: \\(\\mathrm{BMEP} = 4\\pi \\times 8.9 / (124.1 \\times 10^{-6}) = 9.01 \\times 10^5\\ \\mathrm{Pa}\\), or 9.0 bar."
        },
        {
          "type": "p",
          "html": "The factor comes from the work per cycle. Torque \\(T\\) acting through one revolution does \\(2\\pi T\\) of work; a four-stroke cycle takes two revolutions, so the work per cycle is \\(4\\pi T\\), while a two-stroke completes its cycle in one revolution, giving \\(2\\pi T\\). Dividing work per cycle by swept volume gives a pressure. At peak power the K-Light's 8.28 N·m gives 8.4 bar."
        },
        {
          "type": "table",
          "head": [
            "Engine type (typical, at the torque peak)",
            "BMEP"
          ],
          "rows": [
            [
              "Naturally aspirated two-valve air-cooled road four-stroke",
              "8–10 bar"
            ],
            [
              "Liquid-cooled four-valve sports four-stroke",
              "11–13 bar"
            ],
            [
              "Carburetted road two-stroke",
              "6–9 bar"
            ],
            [
              "K-Light 125 (calculated)",
              "9.0 bar"
            ]
          ]
        },
        {
          "type": "p",
          "html": "BMEP is proportional to the air trapped per cycle and the efficiency with which it burns, so it is the cleanest single measure of breathing and combustion quality. A 250 cm³ two-stroke making 38 N·m has \\(\\mathrm{BMEP} = 2\\pi \\times 38 / (250 \\times 10^{-6}) = 9.6\\ \\mathrm{bar}\\): similar to the K-Light, even though its torque per litre (152 N·m/L against about 72) is twice as high, because it fires twice as often while trapping less charge per firing."
        },
        {
          "type": "eq",
          "id": "m2-power-stroke-rate",
          "name": "Power strokes per second",
          "tex": "f_{4T} = \\frac{N}{120} \\qquad f_{2T} = \\frac{N}{60}",
          "where": [
            [
              "f",
              "power strokes per second, per cylinder",
              "1/s"
            ],
            [
              "N",
              "crankshaft speed",
              "rev/min"
            ]
          ],
          "why": "A four-stroke fires once every two revolutions and a two-stroke every revolution. This explains much of the two-stroke power advantage and why a single needs a heavy flywheel to coast between widely spaced firings.",
          "example": "At 9000 rpm a four-stroke single fires \\(9000 / 120 = 75\\) times a second; a two-stroke at the same speed fires 150 times."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "With the <a href=\"../overview/?mode=4t&part=engine\">four-stroke engine</a> selected, set the RPM slider to 3000, 6000 and 9000 rpm in turn and calculate the mean piston speed (\\(2 \\times S \\times N / 60\\)) and the number of power strokes per second (\\(N / 120\\)). Switch to the <a href=\"../overview/?mode=2t&part=engine\">two-stroke engine</a> at the same speeds and confirm that the power-stroke frequency doubles (\\(N / 60\\)). Use these numbers to explain why a 125 cm³ two-stroke can produce two to three times the power of a 125 cm³ commuter four-stroke."
        },
        {
          "type": "h3",
          "text": "Volumetric efficiency"
        },
        {
          "type": "p",
          "html": "<strong>Volumetric efficiency</strong> \\(\\eta_v\\) is the mass of fresh air actually drawn in per cycle divided by the mass that would fill the swept volume at reference (usually ambient) density. It is the main reason two engines of the same size make different torque."
        },
        {
          "type": "eq",
          "id": "m2-volumetric-efficiency",
          "name": "Volumetric efficiency (four-stroke)",
          "tex": "\\eta_v = \\frac{\\dot m_{air}}{\\rho_{air}\\,V_d\\,N / 120}",
          "where": [
            [
              "\\eta_v",
              "volumetric efficiency",
              "–"
            ],
            [
              "\\dot m_{air}",
              "measured air mass flow",
              "kg/s"
            ],
            [
              "\\rho_{air}",
              "air density, about 1.18 kg/m³ at 25 °C and sea level",
              "kg/m³"
            ],
            [
              "V_d",
              "displacement",
              "m³"
            ],
            [
              "N",
              "crankshaft speed",
              "rev/min"
            ]
          ],
          "why": "Shows how well the engine fills its cylinders. The torque curve follows volumetric efficiency closely, so it is the number that valve timing, port design, intake and exhaust tuning and a clean air filter all work on.",
          "example": "K-Light 125 at 7500 rpm: ideal flow \\(= 1.18 \\times 124.1 \\times 10^{-6} \\times 7500 / 120 = 9.15\\ \\mathrm{g/s}\\); a measured 7.8 g/s gives \\(\\eta_v = 7.8 / 9.15 = 0.85\\)."
        },
        {
          "type": "p",
          "html": "The divisor 120 converts rev/min into intake strokes per second for a four-stroke (60 seconds, one intake stroke every two revolutions). The two-stroke equivalent, the <strong>delivery ratio</strong>, uses \\(N / 60\\) because it inducts every revolution."
        },
        {
          "type": "p",
          "html": "Small two-valve road engines reach 80–90 % at their torque peak. Tuned four-valve engines exceed 100 % over a narrow band, because intake and exhaust pressure waves push extra charge in, and fall well below 100 % elsewhere. A blocked air filter, a restrictive exhaust or wrong valve clearance all show up as lost volumetric efficiency, and so as lost torque."
        },
        {
          "type": "eq",
          "id": "m2-brake-thermal-efficiency",
          "name": "Brake thermal efficiency",
          "tex": "\\eta_b = \\frac{P}{\\dot m_f\\,Q_{LHV}} \\qquad \\dot m_f = \\frac{\\dot m_{air}}{\\mathrm{AFR}}",
          "where": [
            [
              "\\eta_b",
              "brake thermal efficiency",
              "–"
            ],
            [
              "P",
              "brake power at the crankshaft",
              "kW"
            ],
            [
              "\\dot m_f",
              "fuel mass flow",
              "g/s"
            ],
            [
              "Q_{LHV}",
              "lower heating value of the fuel, about 43 MJ/kg (43 kJ/g) for petrol",
              "kJ/g"
            ],
            [
              "\\dot m_{air}",
              "air mass flow",
              "g/s"
            ],
            [
              "\\mathrm{AFR}",
              "air-fuel ratio by mass, 14.7 at stoichiometric",
              "–"
            ]
          ],
          "why": "Compares the work delivered with the chemical energy supplied, as a quick check that measured airflow, power and fuel figures are consistent. Real small engines reach about 28–32 % at best.",
          "example": "K-Light 125: \\(\\dot m_f = 7.8 / 14.7 = 0.53\\ \\mathrm{g/s}\\), carrying \\(0.53 \\times 43 = 22.8\\ \\mathrm{kW}\\); with 7.0 kW at the crank, \\(\\eta_b = 7.0 / 22.8 \\approx 0.31\\)."
        },
        {
          "type": "p",
          "html": "That 31 % agrees with the real-engine figure from the Otto cycle section: about two thirds of the fuel energy leaves as heat in the exhaust and through the fins. Working the same check in reverse gives a realistic fuel flow for an injector or carburettor jet when only power is known."
        },
        {
          "type": "check",
          "q": "m2-03"
        },
        {
          "type": "h3",
          "text": "Reading torque and power curves"
        },
        {
          "type": "p",
          "html": "On a full-throttle dyno plot, the rpm of peak torque marks the speed of highest volumetric efficiency, set by cam timing and intake and exhaust tuning. The K-Light 125 (torque peak 7,500 rpm, power peak 9,000 rpm) is tuned for a broad curve that pulls from 3,000–4,000 rpm, while a tuned two-stroke with an expansion chamber gives high power in a band perhaps 2,000–3,000 rpm wide."
        },
        {
          "type": "p",
          "html": "Dips in the curve usually come from pressure waves arriving at the wrong moment, and the fall above peak power from flow limits and rising friction. Manufacturers quote crankshaft power corrected to standard conditions (for example under UN Regulation No. 85); rear-wheel figures from a chassis dynamometer are typically <strong>8–15 % lower</strong> because of losses in the primary drive, gearbox, chain and tyre. A customer's rear-wheel figure 10 % below the brochure is therefore normal, not a fault."
        },
        {
          "type": "check",
          "q": "m2-31"
        },
        {
          "type": "check",
          "q": "m2-32"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Ideal Otto efficiency depends only on compression ratio and \\(\\gamma\\); real small engines reach about 28–32 % because of heat loss, slow combustion, pumping and friction.<br>Displacement is \\(\\frac{\\pi}{4} B^2 S n\\), and compression ratio is so sensitive to the 15 cm³ clearance volume of a 125 that head skimming, gasket thickness and carbon all change it.<br>Bore/stroke ratio and mean piston speed explain why short-stroke engines rev higher and how hard a piston is worked.<br>BMEP compares engines of any size or cycle; 8–10 bar is typical of an air-cooled two-valve road engine such as the K-Light 125 at 9.0 bar.<br>The torque curve follows volumetric efficiency, so breathing (valve timing, ports, filter, exhaust) shapes how an engine pulls."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "aOTz0Ol8fLA",
              "title": "The Pros and Cons of Every Motorcycle Engine Type",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "15:23",
              "role": "How it works",
              "note": "Compares single, twin, triple, four and V engine layouts with pros and cons."
            },
            {
              "id": "-ooue7i73zo",
              "title": "How Indian Makes 43% More Power than Harley-Davidson",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "10:59",
              "role": "How it works",
              "note": "Compares two big V-twin designs and where the power comes from; power figures are the creator's claim."
            },
            {
              "id": "zhUI7MWE_Fc",
              "title": "Motorcycle Riders: You're Using the Wrong RPM",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "5:36",
              "role": "How it works",
              "note": "Why engine load and rpm choice affect wear and feel; not a universal rpm rule."
            }
          ]
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
          "type": "h3",
          "text": "The cycle in 720 degrees"
        },
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
          "type": "p",
          "html": "The pressure figures explain how a throttle controls a petrol engine. At full throttle the cylinder fills to only slightly below atmospheric pressure, limited by the ports and valves. At idle the throttle plate is nearly closed and manifold pressure is perhaps 0.3–0.4 bar absolute, so only a small mass of charge enters; that is what lets the engine idle at low power, but the piston then does <strong>pumping work</strong> against the vacuum on every intake stroke, one reason part-load efficiency is poor."
        },
        {
          "type": "table",
          "head": [
            "Stroke",
            "Crank angle",
            "Inlet valve",
            "Exhaust valve",
            "Cylinder pressure (typical)"
          ],
          "rows": [
            [
              "Intake",
              "0–180°",
              "Open (opened just before TDC)",
              "Closing just after TDC",
              "0.85–0.95 bar absolute at full throttle"
            ],
            [
              "Compression",
              "180–360°",
              "Closes after BDC",
              "Closed",
              "Rising; 1.0–1.2 MPa when cranking (K-Light 125 manual)"
            ],
            [
              "Power",
              "360–540°",
              "Closed",
              "Opens before BDC",
              "Peak 4–7 MPa just after TDC, then falling"
            ],
            [
              "Exhaust",
              "540–720°",
              "Opens just before TDC",
              "Open",
              "Blowdown, then a little above atmospheric"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Most of the useful work is done in the first 60–90° of the power stroke, while pressure is still high and the crank has leverage. By the end of the stroke the gas pressure has fallen and the crank is near BDC, where it has almost no leverage, so releasing the gas early costs little, as the valve timing section shows."
        },
        {
          "type": "plate",
          "id": "F07",
          "caption": "The four-stroke cycle: valve positions, piston travel, crank angle and gas flow in each stroke."
        },
        {
          "type": "p",
          "html": "The piston passes TDC twice in every cycle: once at the end of compression, with both valves closed, and once at the end of exhaust, in the overlap period with both valves slightly open. The timing mark on the rotor lines up at both, so the technician must know which TDC it is. Valve clearance can be measured only at <strong>TDC compression</strong>, recognised by both rockers having free play; the methods are in <a href=\"../repair/repairs/tdc-find/\">finding TDC</a>."
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
          "type": "p",
          "html": "These ranges are typical, not specifications. Service data usually quote timing at a defined lift such as 1 mm, because the cam ramps are gradual and timings measured from the first movement of the valve are much longer. Three numbers summarise a camshaft: duration, overlap and lobe centre."
        },
        {
          "type": "eq",
          "id": "m2-valve-duration",
          "name": "Valve duration",
          "tex": "\\theta_{in} = \\mathrm{IVO} + 180^\\circ + \\mathrm{IVC} \\qquad \\theta_{ex} = \\mathrm{EVO} + 180^\\circ + \\mathrm{EVC}",
          "where": [
            [
              "\\theta_{in}",
              "inlet duration, crank degrees the inlet valve is open",
              "°"
            ],
            [
              "\\theta_{ex}",
              "exhaust duration",
              "°"
            ],
            [
              "\\mathrm{IVO},\\ \\mathrm{IVC}",
              "inlet opens before TDC, inlet closes after BDC",
              "°"
            ],
            [
              "\\mathrm{EVO},\\ \\mathrm{EVC}",
              "exhaust opens before BDC, exhaust closes after TDC",
              "°"
            ]
          ],
          "why": "Duration is the first figure used to compare camshafts. Longer duration lets the engine breathe at high rpm but loses low-speed torque and cranking compression.",
          "example": "Commuter cam, IVO 10° BTDC and IVC 40° ABDC: \\(\\theta_{in} = 10 + 180 + 40 = 230^\\circ\\)."
        },
        {
          "type": "eq",
          "id": "m2-valve-overlap",
          "name": "Valve overlap",
          "tex": "\\theta_{ov} = \\mathrm{IVO} + \\mathrm{EVC}",
          "where": [
            [
              "\\theta_{ov}",
              "overlap, crank degrees around TDC with both valves open",
              "°"
            ],
            [
              "\\mathrm{IVO}",
              "inlet opening before TDC",
              "°"
            ],
            [
              "\\mathrm{EVC}",
              "exhaust closing after TDC",
              "°"
            ]
          ],
          "why": "Overlap sets idle quality and emissions against high-rpm scavenging. Emission-certified commuter engines keep it short; sports engines use long overlap with tuned intake and exhaust lengths.",
          "example": "IVO 12° BTDC and EVC 10° ATDC: \\(\\theta_{ov} = 12 + 10 = 22^\\circ\\)."
        },
        {
          "type": "eq",
          "id": "m2-lobe-centre",
          "name": "Inlet lobe centre angle",
          "tex": "\\theta_{LC} = \\frac{\\mathrm{IVC} - \\mathrm{IVO} + 180^\\circ}{2}",
          "where": [
            [
              "\\theta_{LC}",
              "inlet lobe centre, the point of maximum lift, after TDC",
              "°"
            ],
            [
              "\\mathrm{IVO}",
              "inlet opening before TDC",
              "°"
            ],
            [
              "\\mathrm{IVC}",
              "inlet closing after BDC",
              "°"
            ]
          ],
          "why": "Engine builders \"degree\" a camshaft by checking that the measured lobe centre matches the specification; a chain that has jumped a tooth or a wrongly assembled sprocket shows up as a lobe centre several degrees out.",
          "example": "IVO 10° BTDC, IVC 40° ABDC: \\(\\theta_{LC} = (40 - 10 + 180) / 2 = 105^\\circ\\) ATDC."
        },
        {
          "type": "p",
          "html": "With EVO 40° BBDC and EVC 10° ATDC the exhaust duration of the commuter cam is likewise 230°. Setting a camshaft to its timing marks is covered in <a href=\"../repair/repairs/cam-timing-set/\">setting cam timing</a>; on the K-Light 125's OHV engine the cam is gear-driven in the crankcase and its timing is fixed by gear marks at assembly."
        },
        {
          "type": "h3",
          "text": "Why each valve event is placed where it is"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Inlet opens before TDC",
              "html": "The valve needs 20–40° to reach useful lift, so opening early means it is well open when the piston starts down, and the departing exhaust helps start the inlet flow."
            },
            {
              "title": "Inlet closes after BDC",
              "html": "At speed the inlet air column, moving at 50–100 m/s, keeps ramming in after BDC. At low speed the rising piston pushes charge back into the port instead, so a late-closing cam loses low-speed torque and cranking compression."
            },
            {
              "title": "Exhaust opens before BDC",
              "html": "This sacrifices a little expansion work, but blowdown empties the cylinder before the piston rises, saving far more pumping work on the exhaust stroke, especially at high speed."
            },
            {
              "title": "Exhaust closes after TDC",
              "html": "The outgoing gas has momentum and continues to draw residual gas out of the chamber after TDC."
            },
            {
              "title": "Overlap",
              "html": "With both valves open around TDC, an exhaust pressure wave can scavenge the chamber and pull in fresh charge at high rpm. At idle, exhaust flows back into the inlet instead, giving rough idle and high hydrocarbon emissions."
            }
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb: a hotter cam is a trade",
          "html": "More duration and overlap move peak power up the rev range but cost idle quality, cranking compression, low-speed torque and emissions. Variable valve timing (Honda HYPER VTEC, Ducati DVT, Yamaha VVA and others) exists to escape this compromise."
        },
        {
          "type": "p",
          "html": "A longer-duration, higher-overlap cam fitted to a commuter 125 shows the trade clearly. Idle becomes rough and needs a higher idle speed because exhaust dilutes the inlet charge; cranking compression falls because the later inlet closing pushes charge back at low speed; low-speed torque falls; peak power rises and moves up the rev range, provided the intake and exhaust can support it. Emissions rise and the engine may no longer meet its type approval."
        },
        {
          "type": "p",
          "html": "<strong>Variable valve timing</strong> systems move or switch the cam events with speed. Honda's HYPER VTEC on the VFR800 and CB400 switches from two to four valves per cylinder at a set rpm; Kawasaki varies inlet cam timing on the 1400GTR; Suzuki uses a centrifugal inlet cam phaser on the GSX-R1000; Ducati's DVT phases both inlet and exhaust camshafts; Yamaha's VVA on the 155 cm³ R15 and MT-15 switches the inlet valve between two cam lobes."
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
          "html": "In a multi-cylinder engine the <strong>firing order</strong> and the <strong>firing interval</strong> between firings shape smoothness, vibration and the torque pulses felt at the rear tyre. The crank layout sets the intervals, and the intervals set the feel and sound."
        },
        {
          "type": "eq",
          "id": "m2-firing-interval",
          "name": "Even firing interval (four-stroke)",
          "tex": "\\theta_f = \\frac{720^\\circ}{n}",
          "where": [
            [
              "\\theta_f",
              "crank angle between successive firings for even firing",
              "°"
            ],
            [
              "n",
              "number of cylinders",
              "–"
            ]
          ],
          "why": "Gives the crank spacing an engine needs for evenly spaced power pulses. Layouts that depart from it (180° twins, 270° twins, V-twins, crossplane fours) do so deliberately for balance or character.",
          "example": "Inline triple: \\(\\theta_f = 720 / 3 = 240^\\circ\\); inline four: \\(720 / 4 = 180^\\circ\\)."
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
          "type": "p",
          "html": "In a flat-plane four, pistons 1 and 4 move together, as do 2 and 3, so the primary forces cancel but a secondary vertical shake at twice crank speed remains. Yamaha's <strong>crossplane</strong> R1 crank places the pins at 90° intervals so that the inertial torque of the accelerating and decelerating pistons cancels across the four cylinders, leaving the rear tyre to feel mainly combustion torque. The penalty is a primary rocking couple that needs a balancer shaft, and a heavier crank to smooth the uneven firing."
        },
        {
          "type": "p",
          "html": "A 270° parallel twin gives firing intervals of 270° and 450°, exactly those of a 90° V-twin with a shared crankpin. Its pistons also never stop at the same moment, which reduces primary shake compared with a 360° twin, so its exhaust note and the torque pulses at the tyre resemble the V-twin's. This is why the layout is used on the Yamaha MT-07 and several Triumph and Honda twins."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Run the <a href=\"../overview/?mode=4t&part=engine\">four-stroke engine</a> at a low RPM setting and pause it with the Space key where the inlet valve begins to lift and where the exhaust valve closes. Read the crank angle (θ) from the status line and calculate the overlap; the Overview's valve events are simplified, so compare your figure with the real timing given in this chapter. Then step through a full 720° cycle and explain why the camshaft, driven at half crankshaft speed, has turned through only 360°."
        },
        {
          "type": "h3",
          "text": "Finding TDC on the compression stroke"
        },
        {
          "type": "p",
          "html": "Valve clearance checks, cam timing and ignition timing all start from the same position: the piston at top dead centre at the end of the compression stroke. The piston passes TDC twice per cycle, so the position alone is not enough; the valves tell the two apart."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Remove the inspection plugs",
              "html": "Take out the spark plug, the timing-hole plug on the generator cover and the cap over the crankshaft nut, so the crank can be turned by hand and the flywheel marks seen."
            },
            {
              "title": "Turn forwards and watch the inlet",
              "html": "Turn the crank in its normal direction and watch the inlet valve (or its rocker) open and close. Compression follows."
            },
            {
              "title": "Align the T mark",
              "html": "Keep turning until the T mark on the flywheel lines up with the index mark on the crankcase."
            },
            {
              "title": "Confirm with the rockers",
              "html": "At compression TDC both rockers have a little free play and both valves are closed. If both rockers are tight and the valves are moving (the overlap rock), the piston is at exhaust TDC: turn one more full revolution."
            }
          ]
        },
        {
          "type": "p",
          "html": "If the crankshaft nut cannot be reached, raise the rear wheel, select top gear and turn the wheel to turn the engine. If the flywheel has no visible marks, a long, thin screwdriver or plastic rod resting lightly on the piston through the plug hole shows the moment the piston stops rising; it must never be allowed to jam between piston and head. Full procedure: <a href=\"../repair/repairs/tdc-find/\">Find top dead centre</a>."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Which TDC? The rock test",
          "html": "At exhaust TDC the exhaust valve is just closing while the inlet is just opening, so rocking the crank a few degrees either way moves both valves: the overlap described above. At compression TDC the same rock moves neither valve. One look at the rockers saves setting a whole engine 360&deg; out."
        },
        {
          "type": "h3",
          "text": "Job sheet 2.2.1: Setting cam timing on a single"
        },
        {
          "type": "p",
          "html": "Every time a four-stroke top end is reassembled the valve timing has to be set again. Reproducing the factory timing is simple if the rules are followed in order; most mistakes come from a crank that moved, a tensioner fitted too early or a mark misread."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Record before dismantling",
              "html": "Before the cam is removed, set compression TDC and check that the cam sprocket marks line up as the manual says. If they do not, or if non-original sprockets are fitted, mark sprocket and head with white paint and photograph them: the manual can be wrong, the engine in front of you cannot."
            },
            {
              "title": "Set the crank",
              "html": "With the T mark aligned at TDC, fit the camshaft with the lobes pointing away from the followers, so no valve is open."
            },
            {
              "title": "Fit the chain",
              "html": "Loop the cam chain over the sprocket and move it tooth by tooth until the sprocket mark aligns: a circle or line level with the top of the head, or a dot or arrow against a mark on the cam cap, depending on make. Keep the chain tight on the front (non-tensioner) run."
            },
            {
              "title": "Torque the caps",
              "html": "Tighten the cam bearing caps a little at a time in the manual's pattern, so the cam is pulled down evenly. Check that each rocker sits on the centre of its valve stem."
            },
            {
              "title": "Fit the tensioner last",
              "html": "Fit the tensioner in its fully retracted position, then release it. Recheck the T mark and the cam marks; the crank can move a little during assembly."
            },
            {
              "title": "Turn by hand",
              "html": "Turn the engine slowly forwards two full revolutions by hand and check the marks again at TDC. If anything binds, stop at once: a valve touching the piston is felt as a hard stop."
            }
          ]
        },
        {
          "type": "p",
          "html": "A chain that is not new may not let the marks align exactly, because a worn chain is longer; choose the sprocket tooth that brings the marks closest. Twin-camshaft engines also have the number of chain pins (or rollers) between the exhaust and inlet marks specified in the manual, usually somewhere between 18 and 31 depending on the engine; count them, since one pin out is one tooth out. See <a href=\"../repair/repairs/cam-timing-set/\">Record and set cam timing marks</a> and <a href=\"../repair/repairs/manual-cross-check/\">Check a shop manual's steps against the engine</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/130_timing_mark.jpg",
          "caption": "Cam sprocket timing mark aligned with the cylinder head",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "photo",
          "src": "repair-photos/130_most_hondas_yamahas_marks_dots_lines.jpg",
          "caption": "Timing marks on camshafts aligned with marks on the bearing caps",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "On an OHV push-rod engine such as the K-Light 125, the camshaft sits in the crankcase and is driven by a gear from the crankshaft, not by a chain. Its timing is set once, when the engine is assembled, by aligning punch marks on the crankshaft gear and the cam gear; it cannot slip in service, but a cam gear fitted one tooth out during a rebuild produces exactly the errors described below. Old British push-rod twins and singles are timed the same way, by marks on their cam and crank gears."
        },
        {
          "type": "h3",
          "text": "What one tooth out does"
        },
        {
          "type": "p",
          "html": "The cam sprocket has twice as many teeth as the crankshaft sprocket, because it turns at half speed. A chain that is fitted one tooth out, or that jumps a tooth when it is badly worn, moves every valve event by the same crank angle."
        },
        {
          "type": "eq",
          "id": "m2-cam-tooth-error",
          "name": "Timing error per cam sprocket tooth",
          "tex": "\\Delta\\theta = \\frac{720^{\\circ}}{z_c}",
          "where": [
            [
              "\\Delta\\theta",
              "shift of every valve event, in crankshaft degrees",
              "degrees"
            ],
            [
              "z_c",
              "number of teeth on the camshaft sprocket",
              ""
            ]
          ],
          "why": "Shows how large an error one tooth makes: far more than any normal tolerance, which is why marks are checked twice before the engine is turned.",
          "example": "For an example cam sprocket of 36 teeth, one tooth moves every event by \\(720 / 36 = 20^{\\circ}\\) of crank rotation, close to the whole overlap of a commuter cam."
        },
        {
          "type": "p",
          "html": "Timing that is one tooth retarded opens and closes every valve late: low-speed torque and compression fall, starting becomes hard, and the engine may still run well enough to hide the fault. One tooth advanced does the reverse and brings the valves closer to the piston near TDC. In an interference engine, two or more teeth, or a chain that jumps under load, lets the piston hit an open valve and bend it."
        },
        {
          "type": "photo",
          "src": "repair-photos/130_bent.jpg",
          "caption": "A valve bent by contact with the piston",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "table",
          "head": [
            "Symptom after a top-end job",
            "Likely cause",
            "First check"
          ],
          "rows": [
            [
              "Low compression, engine weak and hard to start",
              "Cam timing one tooth out, or valve clearance set too tight",
              "Marks at compression TDC; clearances cold"
            ],
            [
              "Low compression on one cylinder, air at the inlet or exhaust on a leak-down test",
              "A valve bent by contact with the piston",
              "Leak-down test (Chapter 2.7): <a href=\"../repair/repairs/leak-down-test/\">Do a leak-down test</a>"
            ],
            [
              "No compression after assembly on an engine with hydraulic tappets",
              "Tappets pumped up and holding valves open",
              "Wait for them to bleed down and recheck before dismantling"
            ],
            [
              "Rattle from the cam chain area, worst when starting",
              "Worn chain or a tensioner that is not taking up slack",
              "<a href=\"../repair/repairs/cam-chain-check/\">Check the cam chain and tensioner</a>"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Performance camshafts are set more precisely with a <strong>degree wheel</strong> bolted to the crankshaft and a dial gauge on the valve, so that the actual opening and closing angles can be compared with the cam maker's card. Reproducing the factory timing on a standard engine needs only the marks."
        },
        {
          "type": "check",
          "q": "m2-10"
        },
        {
          "type": "check",
          "q": "m2-33"
        },
        {
          "type": "check",
          "q": "m2-34"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "A four-stroke cycle takes 720° of crank rotation, so the camshaft turns at half crank speed and a single fires once every two revolutions.<br>Valves open early and close late because gas has inertia and valves take time to lift; duration, overlap and lobe centre summarise any camshaft.<br>Long duration and overlap favour high-rpm power at the cost of idle quality, cranking compression, low-speed torque and emissions.<br>Valve clearance is checked only at TDC compression, where both rockers have free play.<br>Even firing needs \\(720^\\circ / n\\) between firings; crank layout and firing intervals set the balance, sound and feel of a multi."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "eKUEZY3R3cI",
              "title": "The Only Video You'll Ever Need to Watch to Know how 4 Stroke and 2 Stroke Engines Work and Differ",
              "channel": "driving 4 answers",
              "channel_url": "http://www.youtube.com/@d4a",
              "duration": "28:42",
              "role": "How it works",
              "note": "Long animated comparison of four-stroke and two-stroke engines and why they differ."
            },
            {
              "id": "Nt-dAN6qFWI",
              "title": "2 STROKE VS 4 STROKE | Which is Better for YOU!?",
              "channel": "Ride With The Knights",
              "channel_url": "http://www.youtube.com/@ridewiththeknights",
              "duration": "12:20",
              "role": "How it works",
              "note": "Two-stroke against four-stroke: power delivery, maintenance and use; a fair summary for choosing a bike."
            },
            {
              "id": "t1G1VWd9B90",
              "title": "4-Stroke Motor Cycle Animation",
              "channel": "Lubrizol360",
              "channel_url": "http://www.youtube.com/@LubrizolAdditives360",
              "duration": "2:51",
              "role": "How it works",
              "note": "Four-stroke animation showing engine, clutch and gearbox sharing one oil supply."
            }
          ]
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
          "type": "h3",
          "text": "One power stroke per revolution"
        },
        {
          "type": "p",
          "html": "The motorcycle two-stroke uses the <strong>underside of the piston and a sealed crankcase</strong> as a pump, and replaces poppet valves with <strong>ports</strong> that the piston uncovers and covers. The full cycle takes <strong>360°</strong>, so it fires every revolution."
        },
        {
          "type": "p",
          "html": "Because the crankcase is the pump, it must be <strong>pressure-tight</strong>. Every joint that seals it, the crank seals on both mainshafts, the base gasket and the reed block or inlet flange, is part of the induction system. A leak lets air in that the carburettor or injection never metered, so the engine runs lean, idles high and may seize; <a href=\"../repair/repairs/two-stroke-crankcase-test/\">the crankcase pressure test</a> finds such leaks before they do damage."
        },
        {
          "type": "photo",
          "src": "repair-photos/112_yamaha_yz_125_piston.jpg",
          "caption": "Two-stroke piston with ring pegs"
        },
        {
          "type": "photo",
          "src": "repair-photos/112_i_always_measure_old_piston_so.jpg",
          "caption": "Two-stroke cylinder bore and ports"
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
          "type": "photo",
          "src": "repair-photos/084_reed_valve_cylinder_2.jpg",
          "caption": "Reed cage, reed stop and reed petal labelled",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "plate",
          "id": "F08",
          "caption": "The two-stroke cycle: upstroke and downstroke, above and below the piston."
        },
        {
          "type": "photo",
          "src": "repair-photos/109_expansion_chambers.jpg",
          "caption": "Two-stroke expansion chambers. The returning pressure wave pushes escaping charge back into the cylinder, but only over a narrow rpm band."
        },
        {
          "type": "p",
          "html": "Port events are <strong>symmetrical about BDC</strong>, because the piston uncovers each port at a certain height on the way down and covers it at the same height on the way up. The angle at which the exhaust opens before BDC therefore fixes its whole duration, and the gap between exhaust and transfer opening is the <strong>blowdown</strong> period, when cylinder pressure must fall below crankcase pressure before the transfers open."
        },
        {
          "type": "eq",
          "id": "m2-port-timing",
          "name": "Two-stroke port duration and blowdown",
          "tex": "\\theta_{ex} = 2\\,\\theta_{EO} \\qquad \\theta_{bd} = \\theta_{EO} - \\theta_{TO}",
          "where": [
            [
              "\\theta_{ex}",
              "exhaust port duration",
              "°"
            ],
            [
              "\\theta_{EO}",
              "exhaust opening angle before BDC",
              "°"
            ],
            [
              "\\theta_{bd}",
              "blowdown period (exhaust lead)",
              "°"
            ],
            [
              "\\theta_{TO}",
              "transfer opening angle before BDC",
              "°"
            ]
          ],
          "why": "Port timing is how two-stroke tuning is described. Longer exhaust duration and more blowdown let the engine rev higher; too little blowdown lets burnt gas flow back down the transfers into the crankcase.",
          "example": "Exhaust opens 97° and transfers 64° before BDC: \\(\\theta_{ex} = 2 \\times 97 = 194^\\circ\\), \\(\\theta_{bd} = 97 - 64 = 33^\\circ\\), typical of a motocross 125."
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
          "type": "p",
          "html": "Longer durations and more blowdown time favour high rpm, as long as the exhaust system can recover the charge that escapes. Raising the exhaust port roof by filing or machining lengthens duration and is a common tuning step, but it shortens the effective power stroke and lowers the trapped compression ratio, so low-speed torque falls; the work cannot be undone without a new cylinder."
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
          "type": "p",
          "html": "With a <strong>piston port</strong>, the piston skirt opens and closes an inlet port in the cylinder wall, so the inlet timing is symmetrical about TDC. It is the simplest arrangement (old Jawa, CZ and many mopeds), but a long inlet duration that suits high rpm lets charge blow back out of the inlet at low speed."
        },
        {
          "type": "p",
          "html": "A <strong>reed valve</strong> is a wedge-shaped reed block between the carburettor or throttle body and the crankcase, carrying flexible petals of spring steel or fibre composite. The petals open only when crankcase pressure is below inlet pressure, so inlet timing becomes automatic and asymmetrical. Almost all modern two-strokes, including the Yamaha YZ125 and KTM models, use reeds. A chipped or warped petal costs low-speed torque and makes the engine spit fuel back through the inlet; inspection is covered in <a href=\"../repair/repairs/reed-valve-check/\">checking a reed valve</a>."
        },
        {
          "type": "p",
          "html": "A <strong>rotary (disc) valve</strong> is a thin disc on the crankshaft with a cut-out sector that uncovers an inlet port in the side of the crankcase. Timing is fixed by the cut-out and can be asymmetric, typically opening 130–145° BTDC and closing 60–80° ATDC, because the disc is independent of piston position. Rotary valves were common in Grand Prix racing (Aprilia RS125/250, Rotax tandem twins), but they widen the engine because the carburettor sits on the side of the crankcase."
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
          "type": "p",
          "html": "Early engines used <strong>cross-flow</strong> scavenging with a deflector on the piston crown to turn the charge upward, at the cost of a heavy, hot piston and a poor chamber shape. Schnürle's loop scheme, patented in the 1920s, removed the deflector. Modern cylinders have five to seven ports: a main exhaust (often with auxiliary exhaust ports either side), two pairs of transfers and the boost port."
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
          "type": "p",
          "html": "The sequence is precise. When the exhaust port opens, a positive pressure pulse runs down the pipe. In the divergent cone (diffuser) it is reflected back as a <strong>negative (suction) wave</strong> that reaches the port during the transfer phase and helps draw burnt gas out and fresh charge up the transfers. The convergent baffle cone at the end reflects it again as a <strong>positive wave</strong> that arrives just before the exhaust port closes and pushes the charge that has escaped into the header back into the cylinder."
        },
        {
          "type": "eq",
          "id": "m2-expansion-chamber-length",
          "name": "Expansion chamber tuned length",
          "tex": "L \\approx \\frac{a\\,\\theta_{ex}}{12\\,N}",
          "where": [
            [
              "L",
              "tuned length, exhaust port to the middle of the baffle cone",
              "m"
            ],
            [
              "a",
              "speed of sound in the hot exhaust gas, about 500 m/s",
              "m/s"
            ],
            [
              "\\theta_{ex}",
              "exhaust port duration",
              "°"
            ],
            [
              "N",
              "engine speed the pipe is tuned for",
              "rev/min"
            ]
          ],
          "why": "A first estimate of where the reflected wave returns in time to plug the port. It shows why a pipe works only over a band of rpm and why a longer pipe moves the powerband down.",
          "example": "125 motocross engine, 194° exhaust duration, tuned for 11500 rpm: \\(L \\approx 500 \\times 194 / (12 \\times 11500) = 0.70\\ \\mathrm{m}\\)."
        },
        {
          "type": "p",
          "html": "The factor 12 combines the \\(6N\\) crank degrees turned per second with the out-and-back travel of the wave. Because the reflection timing is fixed in milliseconds while the port timing is fixed in degrees, the pipe helps only near its tuned speed, which is the main reason for the narrow powerband of a tuned two-stroke. A dented pipe or a leaking exhaust joint weakens the waves and costs power in exactly that band."
        },
        {
          "type": "h3",
          "text": "Power valves"
        },
        {
          "type": "p",
          "html": "A <strong>power valve</strong> changes the effective height, and so the timing, of the exhaust port, or the volume of the exhaust system, with rpm. It widens the narrow band in which the pipe works. Yamaha's YPVS uses a rotating spool in the port roof; KTM and others use sliding guillotine blades; Honda's HPP, Kawasaki's KIPS and Suzuki's AETC are other variants."
        },
        {
          "type": "p",
          "html": "At low rpm the power valve lowers the port roof, giving a shorter exhaust duration, a higher trapped compression ratio and less charge loss; at high rpm it opens fully for maximum duration. Burnt oil cakes carbon onto the valve, so it needs regular cleaning: a valve stuck closed gives an engine that will not rev, one stuck open gives no bottom-end torque. Procedures are in <a href=\"../repair/repairs/power-valve-service/\">power valve service</a> and <a href=\"../repair/repairs/two-stroke-decoke/\">decarbonising a two-stroke</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/083_power_valve_open.jpg",
          "caption": "Power valve open at high revs",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
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
          "html": "The crankcase is part of the intake tract, so it cannot hold an oil bath. Bearings and cylinder wall are lubricated by oil carried in with the charge, which then burns or leaves through the exhaust. With <strong>premix</strong>, oil is mixed into the fuel at a fixed ratio, commonly <strong>50:1</strong> for modern synthetic oils in road and enduro engines and 32:1 to 40:1 for racing."
        },
        {
          "type": "eq",
          "id": "m2-premix-oil",
          "name": "Premix oil quantity",
          "tex": "V_{oil} = \\frac{V_{fuel}}{R}",
          "where": [
            [
              "V_{oil}",
              "volume of two-stroke oil to add",
              "mL"
            ],
            [
              "V_{fuel}",
              "volume of petrol",
              "mL"
            ],
            [
              "R",
              "mixing ratio, for example 50 for 50:1",
              "–"
            ]
          ],
          "why": "Mixing at the wrong ratio is a common cause of two-stroke trouble: too little oil scores the piston and seizes bearings, too much oils plugs and cokes the exhaust and power valve.",
          "example": "5 L at 50:1: \\(V_{oil} = 5000 / 50 = 100\\ \\mathrm{mL}\\); the same fuel at 32:1 needs \\(5000 / 32 = 156\\ \\mathrm{mL}\\)."
        },
        {
          "type": "p",
          "html": "<strong>Oil injection</strong> uses a separate tank and a small metering pump (Yamaha Autolube, Suzuki CCI, Kawasaki Superlube, and electronically controlled pumps on KTM's injected engines). The pump delivers oil to the inlet tract or directly to the main bearings in proportion to engine speed and throttle opening, typically from about 100:1 at idle to 30:1 at full load. After any work on the pump or lines it must be bled and its cable set, as in <a href=\"../repair/repairs/two-stroke-oil-pump/\">checking a two-stroke oil pump</a>."
        },
        {
          "type": "p",
          "html": "Two-stroke oils are classified by <strong>JASO M345</strong> (grades FA, FB, FC and FD, increasing in detergency and reduced smoke) and by ISO-L-EGB, EGC and EGD. Four-stroke engine oil is not a substitute: it is not formulated to burn cleanly and leaves heavy deposits. Mixing practice is in <a href=\"../repair/repairs/two-stroke-premix/\">mixing two-stroke premix</a>."
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
          "type": "p",
          "html": "The weaknesses follow from the same features as the strengths. Short-circuited charge, burnt oil (blue smoke and particulates), unstable part-load combustion, where the engine misfires every other cycle (\"four-stroking\"), and hot pistons that never get a cooling gas-exchange stroke all raise fuel use and <strong>hydrocarbon (HC)</strong> emissions. Under Euro emission rules carburetted two-strokes largely left road use from the early 2000s, surviving in competition, enduro and older commuter fleets in Asia and Africa."
        },
        {
          "type": "p",
          "html": "Injection after the exhaust port has nearly closed means mostly air short-circuits. Air-assisted direct injection derived from Orbital's system was used in scooters such as the Aprilia DiTech and Peugeot TSDI. KTM's TPI places injectors in the rear transfer ports, spraying fuel into the scavenging flow far from the exhaust port, while the ECU reads throttle, crankcase pressure and temperature sensors and an electronically controlled pump meters oil from a separate tank. TBI places the injectors in the throttle body and was introduced to give a more carburettor-like response at low rpm."
        },
        {
          "type": "photo",
          "src": "repair-photos/109_two_stroke_exhaust_pipes.jpg",
          "caption": "Two-stroke exhaust pipes"
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Switch to the <a href=\"../overview/?mode=2t&part=engine\">two-stroke engine</a> and run the animation slowly. Pause when the exhaust port starts to open and when the transfer ports start to open, read both crank angles from the status line and calculate the blowdown period. Then raise the RPM slider and compare the number of power strokes per second with the <a href=\"../overview/?mode=4t&part=engine\">four-stroke</a> at the same speed."
        },
        {
          "type": "h3",
          "text": "Setting and bleeding an oil-injection pump"
        },
        {
          "type": "p",
          "html": "An oil-injection pump is driven by the engine and linked by a cable to the throttle, so its delivery rises with both engine speed and throttle opening. A typical pump meters oil from about 120:1 at idle to about 20:1 at high speed and full throttle, which is why injected two-strokes foul fewer plugs and carbon their exhausts less than premix engines."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Synchronise with the throttle",
              "html": "Open the throttle to the position the manual specifies (on many engines fully open) and check that the pump's reference marks line up: two lines on a Mikuni pump, a pin and a dot on a Yamaha pump. Adjust the pump cable, not the throttle cable."
            },
            {
              "title": "Check the stop",
              "html": "With the throttle closed, check the cable has a little free play so the pump returns to its minimum stroke."
            },
            {
              "title": "Bleed after air has entered",
              "html": "If the tank has run dry or a line was disconnected, loosen the bleed screw on the pump until oil flows without bubbles, then tighten it. Some pumps have no bleed screw: loosen the delivery line at the pump instead."
            },
            {
              "title": "Prove the delivery",
              "html": "Run the engine on premix at the manual's ratio while checking that oil moves down the delivery line, or measure output against the manual's figure: <a href=\"../repair/repairs/two-stroke-pump-output-test/\">Test two-stroke oil pump output</a>."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/053_mikuni_align_two_lines.jpg",
          "caption": "Mikuni oil pump with its two alignment marks",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A pump set too lean, a split delivery line or an air-locked pump seizes the engine without warning; set too rich, it only fouls plugs and smokes. When there is any doubt about a pump, premix at the manual's ratio protects the engine until the pump is checked: <a href=\"../repair/repairs/two-stroke-pump-cable-set/\">Set the two-stroke oil pump cable</a>, <a href=\"../repair/repairs/two-stroke-pump-bleed/\">Bleed a two-stroke oil pump</a> and <a href=\"../repair/repairs/two-stroke-premix/\">Mix two-stroke premix correctly</a>."
        },
        {
          "type": "h3",
          "text": "Crankcase pressure and vacuum test"
        },
        {
          "type": "p",
          "html": "The two-stroke crankcase must hold pressure on the downstroke and vacuum on the upstroke. A leak at a crank seal or a joint lets mixture escape when the case is compressed and lets air in when it is under vacuum, which leans out the mixture and weakens transfer flow. The test proves the bottom end without dismantling it."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Seal the engine",
              "html": "Remove carburettor and exhaust and fit blanking plates to the inlet and exhaust ports. Fit an adapter with a gauge in the spark plug hole, and put the piston at BDC so the case is connected to the cylinder."
            },
            {
              "title": "Pressure test",
              "html": "Pressurise to the manufacturer's value, usually about 40&ndash;100 kPa (6&ndash;15 psi), and watch the gauge for five or six minutes; it should hold."
            },
            {
              "title": "Vacuum test",
              "html": "Apply a vacuum of about 5&ndash;7 inHg (17&ndash;24 kPa) and watch for the same period. A seal that holds pressure can still leak under vacuum, because pressure pushes its lip against the shaft while vacuum pulls it away."
            },
            {
              "title": "Find the leak",
              "html": "Brush soapy water over seals, joints and the cylinder base under pressure; bubbles show the leak."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/107_vacuum_tester.jpg",
          "caption": "Hand vacuum and pressure tester used for crankcase testing",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Old crank seals harden: the engine is hard to start cold, then runs normally once the seal warms and softens. A leak on the generator side draws air and leans the mixture, which can raise the idle, make the revs hang and overheat the piston. The cure is new crank seals; where the manual specifies a liquid sealant on the case joint, do not add a gasket, and where it specifies a gasket, do not replace it with sealant, because either change alters the side clearances of the crank and gearbox shafts: <a href=\"../repair/repairs/two-stroke-crankcase-test/\">Test a two-stroke crankcase for leaks</a>."
        },
        {
          "type": "h3",
          "text": "Carbon, steady throttle and other two-stroke faults"
        },
        {
          "type": "p",
          "html": "Burnt oil leaves carbon in the exhaust port, the power valve and the silencer. A two-stroke with a blocked exhaust starts easily but will not rev, because the expansion chamber can no longer return the charge. Silencers with removable baffles or fibreglass packing can be cleaned and repacked; caustic cleaning solutions are dangerous to use and best avoided: <a href=\"../repair/repairs/two-stroke-decoke/\">Decoke a two-stroke</a> and <a href=\"../repair/repairs/spark-arrester-clean/\">Clean a spark arrester</a>."
        },
        {
          "type": "p",
          "html": "A loop-scavenged engine built for on-off use, such as a motocross engine, can seize when held at a steady, moderate throttle for a long time, even without being pushed hard. Opening and closing the throttle mixes cool fresh charge across the hot area above the exhaust port; at a steady setting that area keeps heating until the piston crown or skirt on the exhaust side melts. Vary the throttle when such a machine has to be ridden on the road."
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Likely cause",
            "First check"
          ],
          "rows": [
            [
              "Starts easily, will not rev",
              "Carbon in exhaust or silencer, or power valve stuck closed",
              "Exhaust and power valve: <a href=\"../repair/repairs/power-valve-service/\">Service a power valve</a>"
            ],
            [
              "High idle, revs hang, hard cold start",
              "Air leak at a crank seal or the base gasket",
              "Pressure and vacuum test"
            ],
            [
              "Piston crown pitted as if chewed",
              "Bottom-end bearing breaking up and passing debris",
              "Big-end and main bearings before fitting a new piston"
            ],
            [
              "Seizure at steady throttle on the road",
              "Local overheating on the exhaust side",
              "Piston and port; jetting and oil supply"
            ],
            [
              "Heavy smoke from an old engine",
              "Worn engine, or gearbox oil passing a hard crank seal",
              "Crank seals before reducing the oil ratio"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m2-35"
        },
        {
          "type": "check",
          "q": "m2-36"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "A two-stroke uses its sealed crankcase as a pump and fires every revolution, so crank seals and base gasket are part of the induction system.<br>Piston-controlled ports are symmetrical about BDC: \\(\\theta_{ex} = 2\\,\\theta_{EO}\\), and blowdown is the gap between exhaust and transfer opening.<br>Reed valves give automatic, asymmetric inlet timing; rotary discs give fixed asymmetric timing; piston ports are simplest but blow back at low speed.<br>The expansion chamber uses reflected pressure waves to scavenge and then plug the port, so it works over a narrow band; power valves widen that band and need regular decarbonising.<br>Oil arrives with the charge (premix or injection) and is burnt, so a wrong ratio or an empty oil tank quickly damages the engine."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "eKUEZY3R3cI",
              "title": "The Only Video You'll Ever Need to Watch to Know how 4 Stroke and 2 Stroke Engines Work and Differ",
              "channel": "driving 4 answers",
              "channel_url": "http://www.youtube.com/@d4a",
              "duration": "28:42",
              "role": "How it works",
              "note": "Long animated comparison of four-stroke and two-stroke engines and why they differ."
            },
            {
              "id": "Nt-dAN6qFWI",
              "title": "2 STROKE VS 4 STROKE | Which is Better for YOU!?",
              "channel": "Ride With The Knights",
              "channel_url": "http://www.youtube.com/@ridewiththeknights",
              "duration": "12:20",
              "role": "How it works",
              "note": "Two-stroke against four-stroke: power delivery, maintenance and use; a fair summary for choosing a bike."
            },
            {
              "id": "_v9gnC5PiWk",
              "title": "How 2-stroke exhaust pipes work | Offroad Engineered",
              "channel": "Steps to Podium",
              "channel_url": "http://www.youtube.com/@StepstoPodium",
              "duration": "4:44",
              "role": "How it works",
              "note": "How a two-stroke expansion chamber pushes mixture back into the cylinder; a short clear animation."
            }
          ]
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
          "type": "h3",
          "text": "The cylinder head"
        },
        {
          "type": "p",
          "html": "The cylinder head closes the cylinder, carries valves, ports, spark plug and (on overhead-cam engines) the camshafts, and passes heat to the fins or water jacket. It is cast aluminium-silicon alloy with harder inserted seats and guides. The K-Light head face is allowed only <strong>0.05 mm</strong> out of flat."
        },
        {
          "type": "p",
          "html": "Aluminium alloy conducts heat well and is light, but it is too soft to survive a valve hammering onto it thousands of times a minute, which is why the seats and guides are separate, harder parts shrunk or pressed into the casting. The K-Light 125 manual gives 0.03 mm as the standard flatness of the head face and 0.05 mm as the limit; flatness is checked with a straightedge laid across the face in several directions and a feeler gauge slid under it. A head that is warped beyond the limit will not seal its gasket and leaks compression or, on liquid-cooled engines, combustion gas into the coolant."
        },
        {
          "type": "photo",
          "src": "repair-photos/111_b_24_valve_ct_90_valve.jpg",
          "caption": "Two valves of different sizes side by side"
        },
        {
          "type": "photo",
          "src": "repair-photos/111_cutting_valve_seat.jpg",
          "caption": "Cutting a valve seat with a seat cutter"
        },
        {
          "type": "photo",
          "src": "repair-photos/111_hose.jpg",
          "caption": "Lapping a valve with a hose on the stem"
        },
        {
          "type": "photo",
          "src": "repair-photos/131_ducati_250_over_head_cam_gear.jpg",
          "caption": "Gear-driven overhead camshafts in a cylinder head"
        },
        {
          "type": "photo",
          "src": "repair-photos/131_over_head_cam_gear_drive.jpg",
          "caption": "Overhead camshaft drive from a sprocket to the valves"
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
          "caption": "Checking valve clearance with a feeler gauge, piston at top dead centre on the compression stroke."
        },
        {
          "type": "h3",
          "text": "Combustion chamber shapes"
        },
        {
          "type": "p",
          "html": "The <strong>combustion chamber</strong> shape determines how far the flame must travel, how much turbulence speeds it, how much surface area takes heat from the gas, and so how close the engine runs to knock. A compact chamber with a central plug burns quickly and tolerates a higher compression ratio."
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
          "html": "The pent-roof chamber, standard in four-valve heads, uses two flat inclined faces meeting at a ridge. It accommodates four valves at a narrow included angle (20–25° in modern sports engines against 60–90° in older two-valve designs), which keeps the chamber compact and the plug central. The K-Light 125 manual lists its chamber as spherical, the common choice in two-valve singles. Squish clearance is also a key two-stroke tuning dimension, checked by squeezing solder wire between piston and head."
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
          "html": "Inlet valves are usually martensitic or austenitic steel, cooled on every cycle by the incoming charge. Exhaust valve heads run at <strong>650–800 °C</strong> and must resist creep, oxidation and corrosion by hot gas, so they use austenitic steel (for example 21-4N), nickel alloy or a bimetallic construction; high-performance engines use coated titanium valves. Some exhaust valves have a hollow stem part-filled with sodium, which melts and carries heat from the head up to the guide."
        },
        {
          "type": "model",
          "file": "valve_ex",
          "caption": "An exhaust valve with a window cut in the stem to show the sodium filling that carries heat from the head to the guide."
        },
        {
          "type": "p",
          "html": "Each valve closes onto a <strong>valve seat</strong> ring of sintered iron or bronze alloy. The seat has a 45° sealing face flanked by 30–32° and 60° correcting cuts that set the width and position of the contact band; the K-Light 125 manual specifies a contact width of 0.8–1.0 mm with a 1.6 mm limit, and describes recutting with 45°, 32° and 60° cutters."
        },
        {
          "type": "p",
          "html": "The <strong>valve guide</strong> is a bronze or cast-iron tube pressed into the head that keeps the valve concentric with its seat. A <strong>valve stem seal</strong> on top of the guide meters a little oil to the stem and stops manifold vacuum drawing oil down the inlet guide, which would show as blue smoke on the overrun."
        },
        {
          "type": "photo",
          "src": "render-valve.jpg",
          "caption": "A poppet valve with its spring set, assembled (left) and exploded along the stem (right): valve head with ground 45° seat face, spring seat washer, stem seal with garter spring, concentric outer and inner springs, top retainer and the two split collets that lock into the groove near the stem tip."
        },
        {
          "type": "p",
          "html": "<strong>Valve springs</strong> close the valve and keep the follower on the cam. Most engines fit two concentric springs wound in opposite directions, which reduces coil surge and gives a margin if one breaks; progressively wound springs are fitted with the close coils toward the head (K-Light 125 manual). The springs are held by a top collar and two split <strong>collets</strong> (cotters) in a groove in the stem. If spring force is inadequate at high speed the follower leaves the cam (<strong>valve float</strong>): the valve closes late, bounces on its seat, power falls away and in an interference engine the valve can touch the piston."
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
          "type": "eq",
          "id": "m2-stem-guide-clearance",
          "name": "Valve stem-to-guide clearance",
          "tex": "c = d_{guide} - d_{stem}",
          "where": [
            [
              "c",
              "stem-to-guide clearance",
              "mm"
            ],
            [
              "d_{guide}",
              "guide bore, measured with a small-hole gauge",
              "mm"
            ],
            [
              "d_{stem}",
              "valve stem diameter, measured with a micrometer",
              "mm"
            ]
          ],
          "why": "A worn guide lets the valve rock, so it seats off-centre, leaks and wears its seat, and lets oil down the stem. Each part and the clearance between them must all be within their limits.",
          "example": "K-Light 125 inlet: stem 5.42 mm, guide 5.49 mm gives \\(c = 5.49 - 5.42 = 0.07\\ \\mathrm{mm}\\), inside the 0.08 mm limit, but both parts are close to their own limits."
        },
        {
          "type": "p",
          "html": "In that example the stem (5.42 mm against a 5.40 mm limit) and the guide (5.49 mm against 5.50 mm) may both be reused, but the margin is small and renewal is advisable during a full overhaul. Valve removal, inspection and seat lapping are covered in <a href=\"../repair/repairs/valve-remove-refit/\">removing and refitting valves</a>, <a href=\"../repair/repairs/valve-check/\">checking valves</a> and <a href=\"../repair/repairs/valve-seat-lap/\">lapping valve seats</a>."
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
          "html": "In an <strong>OHV</strong> engine the camshaft sits low in the crankcase, gear-driven from the crankshaft, and operates tappets (cam followers) that push long rods up to rocker arms in the head. The Honda CG125 and its derivatives use this layout, including the K-Light 125's QJ157FMI: its manual describes a cam gear and cam followers in the crankcase and cylinder block, push rods, and rockers on shafts in the head (rocker shaft 11.98–11.988 mm, limit 11.95 mm). Push-rod mass and flexibility limit revs, which does not matter in a commuter engine peaking at 9,000 rpm; the layout is cheap, compact in height and tolerant of poor maintenance."
        },
        {
          "type": "p",
          "html": "A <strong>single overhead camshaft (SOHC)</strong> in the head, driven by a chain, operates the valves through rockers with screw-and-locknut adjusters; it is the common layout in modern 100–250 cm³ singles and many scooters. In a <strong>double overhead camshaft (DOHC)</strong> engine two camshafts act on the valves either directly through inverted buckets, with a shim under or on top of the bucket for adjustment, or through short finger followers pivoting on a shaft, which reduce moving mass and allow more aggressive lobe profiles. Almost all high-performance four-valve engines use DOHC."
        },
        {
          "type": "plate",
          "id": "F10",
          "caption": "Valvetrain and valve clearance: rocker adjuster with feeler gauge, and a DOHC bucket-and-shim inset."
        },
        {
          "type": "h3",
          "text": "Cam chain, tensioner and decompression"
        },
        {
          "type": "p",
          "html": "Overhead camshafts are driven at half crank speed by a roller or inverted-tooth <strong>cam chain</strong> running in a tunnel in the cylinder and head, with a fixed guide on one side and a slipper blade pressed by a <strong>tensioner</strong> on the other. Automatic tensioners use a spring-loaded ratchet or wedge plunger that can advance but not retreat. A worn chain or tensioner rattles at idle and on closing the throttle, retards cam timing and can jump teeth."
        },
        {
          "type": "p",
          "html": "Chain, tensioner, guides and sprockets wear together and are renewed as a set; fitting a new chain on worn sprockets shortens its life. Inspection and adjustment are in <a href=\"../repair/repairs/cam-chain-check/\">checking the cam chain</a> and <a href=\"../repair/repairs/cam-chain-adjust/\">adjusting a manual cam chain tensioner</a>."
        },
        {
          "type": "p",
          "html": "Large singles often have a <strong>decompressor</strong>: a lever, or a centrifugal flyweight on the camshaft, that holds the exhaust valve slightly open at cranking speed so the starter or kick can turn the engine over, and retracts once it runs. A stuck decompressor gives low compression readings and hard hot starting; see <a href=\"../repair/repairs/compression-release-check/\">checking a compression release</a>."
        },
        {
          "type": "check",
          "q": "m2-38"
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
          "type": "p",
          "html": "A valve with zero clearance no longer closes fully. It loses compression, leaks hot gas across its face and burns the face and seat within a short time, starting with the exhaust valve, which runs hottest. Wear at the rocker tip, adjuster or cam lobe works the other way, opening the clearance and causing a ticking valve train, which is more typical of OHV and older SOHC engines."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Zero clearance burns valves",
          "html": "A valve with no clearance never fully closes. The usual sequence: <strong>hard hot starting → low compression → burnt exhaust valve</strong>. Check clearances at every specified service."
        },
        {
          "type": "p",
          "html": "Screw-and-locknut adjusters are set with a feeler gauge in a few minutes (<a href=\"../repair/repairs/valve-clearance/\">adjusting valve clearance</a>, and job sheet 2.7.3 in the diagnosis chapter). Bucket engines are adjusted by changing a hardened shim of a different thickness, worked out from the measured clearance."
        },
        {
          "type": "eq",
          "id": "m2-shim-selection",
          "name": "Valve shim selection",
          "tex": "t_{new} = t_{old} + \\left( c_{meas} - c_{target} \\right)",
          "where": [
            [
              "t_{new}",
              "thickness of the shim to fit",
              "mm"
            ],
            [
              "t_{old}",
              "thickness of the shim now fitted",
              "mm"
            ],
            [
              "c_{meas}",
              "measured valve clearance",
              "mm"
            ],
            [
              "c_{target}",
              "target clearance, usually the middle of the specified range",
              "mm"
            ]
          ],
          "why": "On shim-and-bucket valve trains this turns a feeler-gauge reading into the shim to order. A clearance that is too small needs a thinner shim, which is how valve recession is corrected.",
          "example": "Exhaust valve 0.12 mm, specification 0.22–0.27 mm, 2.60 mm shim: \\(t_{new} = 2.60 + (0.12 - 0.245) = 2.475\\ \\mathrm{mm}\\)."
        },
        {
          "type": "p",
          "html": "Shims are normally supplied in 0.025 mm steps, so the result usually lands on an available size; if it falls between two, the one that gives a clearance nearer the middle of the range is chosen. The procedure is in <a href=\"../repair/repairs/valve-shim-adjust/\">adjusting valve shims</a>."
        },
        {
          "type": "h3",
          "text": "Cam drives compared"
        },
        {
          "type": "p",
          "html": "Something has to turn the camshafts at exactly half crank speed. The method decides the service work: chains stretch, belts age, gears and shafts last but cost more to make."
        },
        {
          "type": "table",
          "head": [
            "Drive",
            "Where it is used",
            "Service"
          ],
          "rows": [
            [
              "Single-row roller chain",
              "Most singles and many multis",
              "Wears longer; renew with its sprockets, guides and tensioner"
            ],
            [
              "Inverted-tooth (Hy-Vo) chain",
              "Many multis",
              "Same as roller chain; no master link, so it is fitted endless"
            ],
            [
              "Toothed belt",
              "Honda Gold Wing (GL), many Ducati twins",
              "Renew by the maker's age and distance, even if it looks good"
            ],
            [
              "Bevel shaft",
              "Older British machines and older Ducatis",
              "Little wear while oil changes and levels are kept up"
            ],
            [
              "Gear train",
              "Racing engines and a few road machines such as the Honda VFR750R",
              "Very durable; marks must align on assembly"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A chain lengthens as its pins and bushes wear, and every millimetre of extra length retards the camshaft. The change in length between a new chain and a badly worn one is so small that it is hard to measure, yet a worn chain can slap hard enough to wear through a guide and even into the crankcase. For that reason many mechanics renew the cam chain and its sprockets at every top-end rebuild instead of trusting a length check. A cam chain or belt that breaks while the engine is running lets the valves stop open, and the piston hits them."
        },
        {
          "type": "photo",
          "src": "repair-photos/131_hi_vo_chain.jpg",
          "caption": "Inverted-tooth (Hy-Vo) cam chain",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "photo",
          "src": "repair-photos/131_over_head_cam_chain_drive.jpg",
          "caption": "Overhead camshaft driven by a roller chain",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Cam chain tensioners: automatic and manual"
        },
        {
          "type": "p",
          "html": "The tensioner pushes a sprocket, roller or rubber-faced blade against the slack run of the chain. Its spring lets the chain wear and stay at the right tension, and lets it be slack enough to fit over the sprockets during assembly."
        },
        {
          "type": "p",
          "html": "Most engines from the early 1980s on use an <strong>automatic</strong> tensioner with a one-way lock: it takes up slack as the chain wears and cannot be adjusted. When the chain becomes noisy, the chain is worn out. Older engines use a <strong>manual</strong> tensioner held by a pinch bolt or locknut, adjusted at a position given in the manual so that all the slack is on the tensioner side."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Set the position",
              "html": "Turn the engine to the flywheel mark the manual gives for adjustment; some engines are adjusted at idle instead."
            },
            {
              "title": "Release the lock",
              "html": "Loosen the pinch bolt or locknut. The spring pushes the tensioner in; on a worn chain a muffled pop is often heard as the slack is taken up."
            },
            {
              "title": "Lock it",
              "html": "Tighten the pinch bolt or locknut without moving the tensioner."
            },
            {
              "title": "Listen",
              "html": "If the chain is still noisy after correct adjustment, it is worn out: renew chain, sprockets and guides."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/132_pinch_bolt.jpg",
          "caption": "Manual cam chain tensioner with its pinch bolt",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Any tensioner must be fitted in its <strong>fully retracted</strong> (loosest) position and then released. Fitted extended, it over-tightens the chain, wears it and the guides quickly and can break the tensioner itself. Some crankshaft cam sprockets are machined as part of the crank, and others are pressed on, so a worn crank sprocket may mean a new crankshaft or a press job. See <a href=\"../repair/repairs/cam-chain-adjust/\">Adjust a manual cam chain tensioner</a> and <a href=\"../repair/repairs/cam-chain-replace/\">Replace a cam chain</a>."
        },
        {
          "type": "h3",
          "text": "Worked example: changing a valve shim"
        },
        {
          "type": "p",
          "html": "On a shim-under-bucket engine the clearance is changed by changing a hardened shim, using the shim selection equation above. Shims are stamped with their thickness in hundredths of a millimetre: a shim marked 270 is 2.70 mm."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Measure",
              "html": "At compression TDC, cold, the inlet clearance reads 0.05 mm with feeler gauges. The specification for this example engine is 0.10 mm."
            },
            {
              "title": "Read the old shim",
              "html": "Remove the shim with the holding tool and read its marking: 270. If the marking is worn, measure the shim with a micrometer."
            },
            {
              "title": "Calculate",
              "html": "The clearance must grow by \\(0.10 - 0.05 = 0.05\\ \\mathrm{mm}\\), so the new shim is thinner by the same amount: \\(2.70 - 0.05 = 2.65\\ \\mathrm{mm}\\), a shim marked 265."
            },
            {
              "title": "Fit and check",
              "html": "Fit the shim with its marking facing down, away from the cam, so the cam does not wear the number off. Turn the engine several times by hand and measure again; a tilted shim or oil under it changes the reading."
            }
          ]
        },
        {
          "type": "p",
          "html": "Shims rarely wear, so one that is too thick for one valve can often be used on another valve that needs a thicker one. On a few engines the shim sits under the bucket and the camshafts must be removed to change it. Always use the special holding tool correctly and never force it: a slipped tool can break a cam cap, and on many engines the caps are machined with the head and not sold separately. See <a href=\"../repair/repairs/valve-shim-adjust/\">Adjust valve clearance with shims</a> and <a href=\"../repair/repairs/valve-clearance/\">Check and adjust valve clearance</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/110_shim_type_adjusters_valve_shims.jpg",
          "caption": "Valve shims and buckets from a shim-type valve train",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "On a push-rod engine the clearance is set at the rocker with a screw and locknut, as on a SOHC head. With the correct feeler gauge in place, the push rod should still spin freely between the fingers but have no up-and-down play. After tightening the locknut, check again: tightening it often moves the adjuster. If a clearance has to err, it should err slightly loose. A loose valve ticks and wears the valve train a little; a tight valve does not close fully and burns."
        },
        {
          "type": "h3",
          "text": "Camshafts in plain bearings"
        },
        {
          "type": "p",
          "html": "Most overhead camshafts run directly in machined bores in the aluminium head, with no bearing shells, under caps machined together with the head. While pressurised oil reaches them they hardly wear. Run once with too little oil, the bores score; the repair is to line-bore the head and fit bushes, or to replace the head, which is why oil level and oil delivery to the head matter so much on these engines. Camshafts in ball bearings survive an oil failure better, because a ruined bearing can be replaced."
        },
        {
          "type": "p",
          "html": "On strip-down, rock the camshaft in its bearings: a dry, clean camshaft should show only a slight clearance, and visible wear on the journals means the bores are worn too. Bearing clearance is measured with Plastigauge under the torqued caps (Chapter 2.5): <a href=\"../repair/repairs/plain-bearing-clearance-check/\">Check plain bearing clearance</a>."
        },
        {
          "type": "check",
          "q": "m2-18"
        },
        {
          "type": "check",
          "q": "m2-37"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "The aluminium head carries harder inserted seats and guides; on the K-Light 125 its face must be flat within 0.05 mm.<br>Compact chambers with a central plug and a squish band burn fast and resist knock; four valves add 30–40 % curtain area over two.<br>Exhaust valves run at 650–800 °C and need heat-resistant materials; worn guides, tired springs and wide seats all have measurable limits.<br>The K-Light 125 is OHV with push rods and rockers; SOHC uses rockers in the head, DOHC uses buckets with shims or finger followers.<br>Valve clearance usually closes up as valves recede, leading to hard hot starting, low compression and a burnt exhaust valve unless checked at every service."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "1lrH1U4FnRY",
              "title": "How To Adjust Valves on a Motorcycle or ATV - Shim Type",
              "channel": "Rocky Mountain ATV MC",
              "channel_url": "http://www.youtube.com/@rmatvmc",
              "duration": "13:54",
              "role": "How-to",
              "note": "Measure valve clearance with feeler gauges and swap shims; clearances and cam timing marks are model specific."
            },
            {
              "id": "6yIRpy8eI7Y",
              "title": "Why ONLY Ducati Uses This Part To Go Fast",
              "channel": "Donut",
              "channel_url": "http://www.youtube.com/@Donut",
              "duration": "14:58",
              "role": "How it works",
              "note": "Why Ducati closes its valves with a cam instead of springs; valve train idea, not an adjustment guide."
            },
            {
              "id": "3NFB7jnsAMc",
              "title": "New Cylinder kit vs Reboring",
              "channel": "Self Repair GURUji",
              "channel_url": "http://www.youtube.com/@selfrepairguruji",
              "duration": "23:59",
              "role": "How it works",
              "note": "Rebore or new cylinder kit: cost, fit and when each makes sense; decide by measuring the bore."
            }
          ]
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
          "caption": "Piston with rings and pin bosses"
        },
        {
          "type": "photo",
          "src": "repair-photos/122_motorcycle_counter_balancers.jpg",
          "caption": "Counterbalancer weights moving opposite the piston"
        },
        {
          "type": "p",
          "html": "Pistons are aluminium-silicon alloy: <strong>cast</strong> for most road engines, <strong>forged</strong> (stronger when hot, lighter) for sports and racing. They are <strong>cam-ground</strong> (slightly oval) and <strong>tapered</strong> (smaller at the hotter crown) so they become round and parallel when hot. That is why you always measure at 90° to the pin, at a set height: <strong>11 mm above the skirt bottom</strong> on the K-Light."
        },
        {
          "type": "p",
          "html": "Cast pistons use alloys of around 12 % silicon, or hypereutectic alloys of 16–18 % silicon for lower thermal expansion; forged pistons use 2618 or 4032-type alloys and can be made thinner and lighter for the same strength. Skirts are short, often slipper-cut and coated to reduce friction. Measuring and inspecting pistons is covered in <a href=\"../repair/repairs/piston-inspect/\">inspecting a piston</a> and <a href=\"../repair/repairs/piston-clearance-measure/\">measuring piston clearance</a>."
        },
        {
          "type": "model",
          "file": "piston",
          "caption": "A piston with its ring pack, gudgeon pin and circlips."
        },
        {
          "type": "p",
          "html": "A four-stroke <strong>ring pack</strong> has three rings, each with a distinct job. Combustion pressure gets behind the top ring and pushes it down against its groove and outward against the wall, so the harder the engine works, the harder the ring seals."
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
          "type": "p",
          "html": "The second ring is commonly a taper-faced or Napier (hooked) cast-iron ring, dark in colour, with its notch pointing down so it scrapes oil toward the crankcase on the downstroke. Rings are marked to show which side faces up, and fitting one upside down pumps oil into the chamber. Identification and fitting are in <a href=\"../repair/repairs/piston-ring-identify/\">identifying piston rings</a> and <a href=\"../repair/repairs/piston-ring-fit/\">fitting piston rings</a>."
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
          "type": "p",
          "html": "Two-stroke rings are often of keystone (tapered) section, which flexes in its groove and resists sticking with carbon. <strong>Ring end gaps</strong> allow for thermal expansion: too small a gap and the ends butt when hot, scuffing the bore; too large and gas blows past. The K-Light 125 manual gives 0.15–0.30 mm for both compression rings with a 0.5 mm limit."
        },
        {
          "type": "photo",
          "src": "repair-photos/112_honda_piston.jpg",
          "caption": "Four-stroke piston with ring grooves"
        },
        {
          "type": "h3",
          "text": "Gudgeon pin and small end"
        },
        {
          "type": "p",
          "html": "The <strong>gudgeon pin</strong> (piston pin) is a hollow case-hardened steel tube joining piston and small end, retained by circlips or wire clips. Four-stroke small ends usually run directly on the pin in a plain bush or bare steel bore lubricated by splash. A two-stroke small end receives only the oil mist carried by the charge and runs hot, so it uses a caged needle roller bearing, which has low friction and needs little oil."
        },
        {
          "type": "table",
          "head": [
            "K-Light 125 item (K-Light 125 manual)",
            "Standard",
            "Limit"
          ],
          "rows": [
            [
              "Gudgeon pin diameter",
              "12.994–13.000 mm",
              "12.96 mm"
            ],
            [
              "Piston pin bore",
              "13.002–13.008 mm",
              "13.04 mm"
            ],
            [
              "Connecting rod small end bore",
              "13.010–13.018 mm",
              "13.06 mm"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Connecting rods and crankshafts"
        },
        {
          "type": "p",
          "html": "<strong>Connecting rods</strong> are forged steel (titanium in some racing engines) with an H- or I-section shank, which gives the most stiffness for the least mass. Two construction arrangements dominate, and the choice of rod decides the crankshaft and its lubrication."
        },
        {
          "type": "photo",
          "src": "repair-photos/112_three_piece.jpg",
          "caption": "Three-piece oil ring"
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
              "Bearing",
              "Caged needle or crowded roller on hardened crankpin",
              "Steel-backed bimetal or trimetal shell bearing"
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
          "type": "p",
          "html": "A roller big end tolerates low oil pressure and dirty oil, which suits singles and every two-stroke. A plain shell bearing runs on a film of oil fed at pressure; it is compact and quiet but is destroyed quickly by low oil pressure or debris, which is why multis need good filtration. Shell clearances are checked with plastic gauge, as in <a href=\"../repair/repairs/plain-bearing-clearance-check/\">checking plain bearing clearance</a>."
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
          "type": "p",
          "html": "A <strong>pressed-up crankshaft</strong> consists of two flywheel webs with counterweights joined by a pressed-in crankpin, and must be trued after assembly to within about 0.02–0.05 mm runout, checked in V-blocks with a dial gauge. A <strong>one-piece crankshaft</strong> is forged alloy steel with hardened journals. K-Light 125 crank values (K-Light 125 manual): big-end radial clearance 0.008–0.018 mm (limit 0.05 mm), side clearance 0.10–0.35 mm (limit 0.55 mm) and runout limit 0.10 mm. The manual specifies replacing the crankshaft assembly if the main bearings are noisy or loose."
        },
        {
          "type": "photo",
          "src": "repair-photos/122_gear_drive_counterbalancer.jpg",
          "caption": "Gear-driven counterbalancer. A single cylinder can only be part-balanced by the crank webs; a weight turning the opposite way cancels much of the rest of the shaking force."
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
          "html": "The <strong>reciprocating mass</strong> (piston, rings, pin, clips and the upper part of the rod) stops and restarts twice per revolution. The force needed to accelerate it acts along the cylinder axis and has two parts: a primary force at crank frequency and a smaller secondary force at twice crank frequency, which arises because the rod is not infinitely long."
        },
        {
          "type": "eq",
          "id": "m2-primary-force",
          "name": "Primary inertia force of a single",
          "tex": "F_p = m\\,r\\,\\omega^2 \\cos\\theta",
          "where": [
            [
              "F_p",
              "primary inertia force along the cylinder axis",
              "N"
            ],
            [
              "m",
              "reciprocating mass",
              "kg"
            ],
            [
              "r",
              "crank radius, half the stroke",
              "m"
            ],
            [
              "\\omega",
              "crank angular speed",
              "rad/s"
            ],
            [
              "\\theta",
              "crank angle from TDC",
              "rad"
            ]
          ],
          "why": "Gives the size of the shaking force a single must resist through its mounts and frame. Because it grows with the square of speed, vibration that is mild at idle becomes severe near peak rpm.",
          "example": "An assumed 0.20 kg at \\(r = 0.02475\\ \\mathrm{m}\\) and 9000 rpm (\\(\\omega = 942\\ \\mathrm{rad/s}\\)): peak \\(F_p = 0.20 \\times 0.02475 \\times 942^2 = 4.4\\ \\mathrm{kN}\\)."
        },
        {
          "type": "eq",
          "id": "m2-secondary-force",
          "name": "Secondary inertia force",
          "tex": "F_s = m\\,r\\,\\omega^2\\,\\frac{r}{l} \\cos 2\\theta",
          "where": [
            [
              "F_s",
              "secondary inertia force along the cylinder axis",
              "N"
            ],
            [
              "m",
              "reciprocating mass",
              "kg"
            ],
            [
              "r",
              "crank radius",
              "m"
            ],
            [
              "l",
              "connecting rod length, centre to centre",
              "m"
            ],
            [
              "\\omega",
              "crank angular speed",
              "rad/s"
            ],
            [
              "\\theta",
              "crank angle from TDC",
              "rad"
            ]
          ],
          "why": "The shorter the rod relative to the crank radius, the larger this twice-per-revolution shake. It is what remains in a flat-plane four and what second-order balancers on some large twins and fours cancel.",
          "example": "With \\(r/l = 0.25\\), the peak secondary force is a quarter of the primary: \\(0.25 \\times 4.4 = 1.1\\ \\mathrm{kN}\\) at twice crank speed."
        },
        {
          "type": "p",
          "html": "The 0.20 kg figure is a typical value for a 125 cm³ single, not a K-Light specification, but it shows the scale: a force of over 4 kN reversing 150 times a second at 9,000 rpm. Secondary forces are about \\(r/l\\), roughly 0.25–0.3, of primary."
        },
        {
          "type": "p",
          "html": "A crank counterweight produces a force of constant size that <em>rotates</em> with the crank, while the piston force acts only along the cylinder and varies as \\(\\cos\\theta\\). Any counterweight that cancels the axial force therefore adds an equal force at 90° to it, so a single can never be fully balanced by its crank webs alone."
        },
        {
          "type": "eq",
          "id": "m2-balance-factor",
          "name": "Balance factor",
          "tex": "\\mathrm{BF} = \\frac{m_{cw}}{m_{rec}} \\times 100\\,\\%",
          "where": [
            [
              "\\mathrm{BF}",
              "balance factor",
              "%"
            ],
            [
              "m_{cw}",
              "counterweight mass, referred to crank radius",
              "kg"
            ],
            [
              "m_{rec}",
              "reciprocating mass",
              "kg"
            ]
          ],
          "why": "Sets how the primary shake of a single is shared between the cylinder axis and the direction at right angles to it. Designers pick it to suit how the engine is mounted in the frame.",
          "example": "At 60 %, the 4.4 kN example leaves \\(0.4 \\times 4.4 = 1.8\\ \\mathrm{kN}\\) along the cylinder and adds \\(0.6 \\times 4.4 = 2.6\\ \\mathrm{kN}\\) at right angles."
        },
        {
          "type": "p",
          "html": "Singles typically use a balance factor of 50–70 %. At 100 % the force along the cylinder is cancelled but an equal force appears at right angles, so the engine shakes fore-and-aft instead. A geared, counter-rotating <strong>balancer shaft</strong> with an eccentric weight cancels the remaining component, which is why many 150–650 cm³ singles and parallel twins carry one. Its gear marks must be aligned on assembly or it adds vibration instead of removing it (<a href=\"../repair/repairs/balancer-marks-set/\">setting balancer marks</a>)."
        },
        {
          "type": "check",
          "q": "m2-21"
        },
        {
          "type": "check",
          "q": "m2-40"
        },
        {
          "type": "h3",
          "text": "Main bearings, crankcase and seals"
        },
        {
          "type": "photo",
          "src": "repair-photos/128_hole_tunnel_drilled_machined_two_piece.jpg",
          "caption": "Plain bearing bore in a two-piece crankcase half"
        },
        {
          "type": "p",
          "html": "Singles and two-strokes run the crank in ball or roller mains; multis use plain shells. Crankcases split <strong>vertically</strong> (K-Light, CG125, nearly all singles) or <strong>horizontally</strong> (most Japanese fours). Two-strokes need lip seals on both mainshafts to keep the crankcase pressure-tight."
        },
        {
          "type": "p",
          "html": "Horizontal splitting lets the crank and gearbox shafts drop into the lower half, which simplifies assembly of a multi, while nearly all singles and two-strokes, including the K-Light 125, use vertical halves. In a two-stroke the crank seals keep the crankcase pressure-tight, so a leaking seal admits air the throttle does not control. Bearings are checked for roughness and play as in <a href=\"../repair/repairs/engine-bearing-check/\">checking engine bearings</a>, and the cases are parted with the methods in <a href=\"../repair/repairs/crankcase-split/\">splitting a crankcase</a>."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Workshop tip",
          "html": "A two-stroke with a <strong>high idle and hanging revs</strong> is often drawing air past a leaking crank seal or base gasket. And the K-Light manual warns that its thin-walled crankcase must never be struck heavily."
        },
        {
          "type": "h3",
          "text": "Oversizes, boring and honing"
        },
        {
          "type": "p",
          "html": "A cylinder wears most at the top, where the rings reverse under full combustion pressure, and most on the front and back walls, where the piston thrust acts. It wears least at the bottom, where the original hone marks can often still be seen. The result is a bore that is tapered and out of round, often with a ridge at the top of the ring travel."
        },
        {
          "type": "p",
          "html": "If the measured piston clearance is within the manual's limits, the cylinder only needs a light hone to break the glaze before new rings are fitted. If it is beyond the limit, the cylinder is bored to the next <strong>oversize</strong>; factory oversizes usually come in 0.25 mm steps (0.25, 0.50, 0.75, 1.00 mm). Rust pits where the rings stood during storage also call for a bore to the size that removes them."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Buy the piston first",
              "html": "Never bore a cylinder without the new piston in hand: the machinist measures that piston and bores to fit it with the specified clearance."
            },
            {
              "title": "Bore on a machine",
              "html": "A boring machine holds taper and roundness far better than a hone; honing a cylinder more than slightly oversize takes hours and rarely stays round."
            },
            {
              "title": "Finish with a hone",
              "html": "Hone with plenty of honing oil, moving the hone up and down at a steady rate to leave an even crosshatch of about 45&deg;, which holds oil while the new rings bed in."
            },
            {
              "title": "Treat ports and plating",
              "html": "On a two-stroke, chamfer the port edges so rings cannot catch, and check that a power valve does not now protrude into the bore. A plated cylinder is only lightly honed, with stones made for its plating, or not at all if the maker says so."
            },
            {
              "title": "Clean it properly",
              "html": "Wash the bore in hot soapy water, dry it and wipe it with an oiled rag; repeat until the rag stays clean. Honing grit left in the bore wears the new rings in minutes."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/113_hone_cylinder.jpg",
          "caption": "Honing a cylinder to break the glaze",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A cylinder that has overheated badly, for example after a seizure, can lose the temper of its surface; new rings in it may never seal and the engine keeps smoking. Check the head for flatness after any severe overheat. Seized aluminium smeared on a cast-iron liner must be removed before the bore is measured: <a href=\"../repair/repairs/cylinder-hone/\">Hone a cylinder</a> and <a href=\"../repair/repairs/piston-clearance-measure/\">Measure piston-to-cylinder clearance</a>."
        },
        {
          "type": "h3",
          "text": "Job sheet 2.5.1: Fitting rings and piston"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Check the end gap",
              "html": "Push each ring into its working area of the bore with the piston crown, so it sits square, and measure the gap with feeler gauges against the manual. Too small a gap closes up when hot and can break the ring; file the ends only with a ring file and only if the manual allows."
            },
            {
              "title": "Check the side clearance",
              "html": "With an old piston being reused, measure the clearance between ring and groove with a feeler gauge; typical values are about 0.025&ndash;0.076 mm, but use the manual's figure. A groove too wide even with a new ring means a new piston."
            },
            {
              "title": "Fit the rings",
              "html": "Fit oil ring first, then second, then top, with markings facing up, using a ring expander or careful fingers: rings are hard and break if spread too far. Never fit an oversize ring in a smaller bore; it will not contact the wall correctly."
            },
            {
              "title": "Stagger the gaps",
              "html": "Turn the ring gaps about a third to a half of the way round from each other, so they do not line up; stagger the rails of a three-piece oil ring the same way."
            },
            {
              "title": "Orient the piston",
              "html": "An arrow or mark on the crown faces the front or exhaust side; an IN mark in a valve pocket faces the inlet. Fit new circlips with their gaps away from the cut-out in the piston."
            },
            {
              "title": "Oil and assemble",
              "html": "Oil piston, rings, pin and bore generously, compress the rings with a ring compressor or by hand, and slide the cylinder down without forcing it."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/112_stagger.jpg",
          "caption": "Ring end gaps staggered around the piston",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Ring tension alone does not seal combustion pressure: the gas gets behind the top ring and presses it against the bore and the bottom of its groove. That is why a correctly sized, correctly gapped ring in a round bore matters more than a stiffer ring: <a href=\"../repair/repairs/piston-ring-fit/\">Fit piston rings</a> and <a href=\"../repair/repairs/piston-inspect/\">Inspect a piston and read its size marks</a>."
        },
        {
          "type": "h3",
          "text": "Plain and rolling bearings"
        },
        {
          "type": "p",
          "html": "A plain bearing works by hydrodynamic lubrication: the turning shaft drags oil into a wedge-shaped gap and rides on that film without touching the shell, much as a tyre aquaplanes on a wet road. As long as oil pressure and clean oil are maintained, a plain bearing hardly wears; most of its wear happens at start-up, before the film has formed. Low-stress shafts such as camshafts run directly in the aluminium; highly loaded crank mains and big ends run in replaceable shells."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Clean and dry",
              "html": "Clean the journal and the shell of all oil; Plastigauge reads wrongly on an oily surface."
            },
            {
              "title": "Lay the thread",
              "html": "Lay a length of Plastigauge across the journal, along its axis, clear of the oil hole."
            },
            {
              "title": "Torque the cap",
              "html": "Fit the cap and tighten its bolts to the manual's torque. Do not turn the shaft."
            },
            {
              "title": "Read the width",
              "html": "Remove the cap and compare the width of the flattened thread with the scale on the packet; the widest point gives the clearance."
            },
            {
              "title": "Decide",
              "html": "Within limit, reuse the shells. Over limit, fit thicker shells or have the crank ground undersize where undersize shells are available; otherwise the crank is replaced."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/128_plastigauge_crankpin.jpg",
          "caption": "Plastigauge flattened on a crankpin to read the bearing clearance",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Rolling bearings (ball, roller and needle) need little oil and suit singles and two-strokes. Unshielded ball bearings run in oil mist in two-stroke crankcases and gearboxes; shielded ones, prefilled with grease, are used in wheels; caged needle rollers are used at both ends of most two-stroke rods. When a bearing is an interference fit, press only on the race that is tight: on the inner race when pressing onto a shaft, on the outer race when pressing into a housing. A bearing pulled off by its loose race is damaged and must be replaced. Interference-fit bearings are fitted by heating the outer part, a case or a bearing, to about 120 &deg;C and cooling the inner part in a freezer: <a href=\"../repair/repairs/heat-cool-fit/\">Fit parts using heat and cold</a> and <a href=\"../repair/repairs/engine-bearing-check/\">Check engine bearings</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/129_roller_bearings.jpg",
          "caption": "Ball and roller bearings of different types",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A failing ball bearing can lock the shaft and then seem to free itself when the shaft is rocked back and forth. Do not be fooled: balls are breaking up, and running the engine again will destroy the shaft as well."
        },
        {
          "type": "h3",
          "text": "Splitting and closing the crankcase"
        },
        {
          "type": "p",
          "html": "On a vertically split single, the crankshaft is usually an interference fit in its main bearings, while the gearbox shafts, selector drum and kickstart shaft are a sliding fit. A crankcase splitting tool bolted to the case pushes the crank out of one bearing while the case halves are tapped apart evenly with a soft-faced dead-blow hammer on a strong area."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Remove everything outside",
              "html": "Engine out of the frame; clutch, selector linkage, generator rotor and every case bolt removed. Check the manual for hidden screws under covers and labels."
            },
            {
              "title": "Split gently",
              "html": "Use the splitting tool or tap evenly with a dead-blow hammer. Do not lever between the joint faces with a screwdriver: steel tools ruin aluminium faces and an air leak on a two-stroke follows."
            },
            {
              "title": "Reassemble from one half",
              "html": "Build the gearbox and crank into the half that holds them; heat the other half to about 120 &deg;C so its bearing slides over the shaft, or pull the crank through with an assembly tool that acts on the inner race."
            },
            {
              "title": "Seal as specified",
              "html": "Apply a thin, even film of the sealant the manual names, or fit the gasket it specifies. Never change one for the other: the gasket thickness sets the end float of the crank and gearbox shafts."
            },
            {
              "title": "Check before going on",
              "html": "Turn the crank and shift through every gear before fitting seals, clutch and top end."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/134_dead_blow_hammer.jpg",
          "caption": "Dead-blow hammer used to tap crankcase halves apart",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Full procedure: <a href=\"../repair/repairs/crankcase-split/\">Split and close the crankcase</a>. Balancer shafts are timed to the crankshaft by marks on their gears or sprockets, and must be set to them on reassembly; a balancer a few teeth out makes the engine vibrate far worse than with none: <a href=\"../repair/repairs/balancer-marks-set/\">Check and set counterbalancer timing marks</a>."
        },
        {
          "type": "h3",
          "text": "Fitting oil seals"
        },
        {
          "type": "p",
          "html": "An oil seal keeps oil in, or on a two-stroke keeps crankcase pressure in, around a turning shaft. Its rubber lip is held against the shaft by a garter spring; as the lip wears flat, it stops sealing even though the outside of the seal looks good. The size is moulded on the seal as inside diameter, outside diameter and width, so a generic seal of the same size can replace an unavailable original."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Remove",
              "html": "Lever the old seal out, protecting the case edge with wood or soft metal, without scratching the shaft or the bore."
            },
            {
              "title": "Inspect the shaft",
              "html": "Look for a groove where the old lip ran. Polish light marks with very fine abrasive paper; if the manual allows, set the new lip slightly in front of or behind the groove."
            },
            {
              "title": "Protect the lip",
              "html": "Grease the lip and cover any keyway or thread with thin plastic film so the lip is not cut as it slides on."
            },
            {
              "title": "Drive it square",
              "html": "Fit the seal printed side out, unless the manual says otherwise, with a driver or socket that bears on its outer steel edge. Tap it in evenly until it is flush or at the depth the manual gives."
            }
          ]
        },
        {
          "type": "p",
          "html": "See <a href=\"../repair/repairs/oil-seal-fit/\">Fit an oil seal</a> and <a href=\"../repair/repairs/bearing-seal-install-care/\">Install bearings and seals with care</a>."
        },
        {
          "type": "check",
          "q": "m2-39"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Pistons are cam-ground and tapered so they are round and parallel when hot, and are measured at 90° to the pin at a set height (11 mm above the skirt on the K-Light 125).<br>The top ring seals gas, the second ring seals and scrapes, the oil ring returns oil; end gaps and side clearances have limits.<br>Singles and two-strokes use one-piece rods with roller big ends on pressed-up cranks; multis use split rods on pressure-fed shell bearings.<br>Primary inertia force \\(m\\,r\\,\\omega^2 \\cos\\theta\\) reaches several kilonewtons in a 125 at peak rpm; counterweights only move it, balancer shafts cancel it.<br>A two-stroke crankcase must be airtight: a leaking crank seal gives a high idle and hanging revs."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "uM-ycHS9uvw",
              "title": "CROSSPLANE inline 4 EXPLAINED in detail - How the YAMAHA R1 i4 differs from all other INLINE FOURS",
              "channel": "driving 4 answers",
              "channel_url": "http://www.youtube.com/@d4a",
              "duration": "26:30",
              "role": "How it works",
              "note": "Why the crossplane crankshaft changes firing order and feel; engine design depth."
            },
            {
              "id": "gwtZkHoVMso",
              "title": "Cylinder Offset Changes Everything",
              "channel": "driving 4 answers",
              "channel_url": "http://www.youtube.com/@d4a",
              "duration": "23:45",
              "role": "How it works",
              "note": "Why offsetting the cylinder from the crank line changes piston side force and friction."
            },
            {
              "id": "Qn9JrN1JERI",
              "title": "Why the 270 Degree “Crossplane Twin” is Suddenly So Popular",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "9:39",
              "role": "How it works",
              "note": "Why the 270 degree parallel twin feels and sounds like a V-twin; read with the crossplane correction video."
            }
          ]
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
          "type": "p",
          "html": "Dry sumps are found on many enduro singles, where the oil tank is often inside the frame tubes, and on Harley-Davidson twins. A <strong>scavenge pump</strong> returns oil from the crankcase to the tank and a pressure pump feeds the engine. Oil supply is maintained when the machine is steeply inclined or braking hard, the engine can be made lower because no deep sump is needed, and churning losses are lower. The level must be checked by the maker's method, often hot and after running, as in <a href=\"../repair/repairs/oil-level-dry-sump/\">checking a dry-sump oil level</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/051_dry_sump_oil_tank.jpg",
          "caption": "Separate oil tank of a dry-sump engine",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "plate",
          "id": "F11",
          "caption": "Wet-sump circuit: strainer, trochoid pump, filter, crank and big end, head and cam, gearbox, back to the sump."
        },
        {
          "type": "photo",
          "src": "repair-photos/051_cartridge_oil_filter.jpg",
          "caption": "Spin-on cartridge oil filter",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "The pump is usually a <strong>trochoid</strong> (rotor) type: an inner rotor with one lobe fewer turns inside an outer rotor, so the chambers between them grow on the suction side and shrink on the delivery side. A <strong>relief valve</strong> limits pressure, typically to 3–6 bar on multis. Oil passes a mesh strainer before the pump and then a filter, and is fed under pressure to the big end and valve train, while the gearbox, cylinder wall and gudgeon pin rely on spray and splash."
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
            }
          ]
        },
        {
          "type": "table",
          "head": [
            "K-Light 125 oil pump (K-Light 125 manual)",
            "Standard",
            "Limit"
          ],
          "rows": [
            [
              "Inner rotor tip clearance",
              "0.10–0.15 mm",
              "0.25 mm"
            ],
            [
              "Outer rotor to pump body",
              "0.10–0.15 mm",
              "0.25 mm"
            ],
            [
              "Rotor end clearance",
              "0.07–0.12 mm",
              "0.15 mm"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A pump worn beyond these limits leaks internally, so delivery and pressure at the head fall, especially when the oil is hot and thin. The result is rocker and cam wear, a noisy valve train and possible big-end distress; a K-Light pump with 0.28 mm tip clearance must be replaced. Checking that oil actually reaches the head is described in <a href=\"../repair/repairs/oil-flow-to-head-check/\">checking oil flow to the head</a>."
        },
        {
          "type": "p",
          "html": "The centrifugal filter rotor on CG-type engines spins sludge to its outer wall, where it builds up as a hard layer until the rotor is opened and scraped clean; the strainer screen behind the drain plug catches larger debris. Both are cleaned at service intervals, as in <a href=\"../repair/repairs/oil-centrifugal-clean/\">cleaning a centrifugal oil filter</a> and <a href=\"../repair/repairs/oil-screen-clean/\">cleaning the oil strainer</a>. The full change is in <a href=\"../repair/repairs/engine-oil-service/\">engine oil service</a>."
        },
        {
          "type": "p",
          "html": "Check the level with the bike upright on level ground and the dipstick <strong>resting</strong> in the hole, not screwed in."
        },
        {
          "type": "p",
          "html": "The K-Light 125 takes 1.1 ± 0.1 L at a change and 1.2 ± 0.1 L after an overhaul, because a rebuilt engine starts with dry passages and an empty filter rotor. On an air-cooled engine the oil also carries a large share of the heat, so a low level causes overheating as well as wear (<a href=\"../repair/repairs/oil-level-check/\">checking the oil level</a>)."
        },
        {
          "type": "photo",
          "src": "repair-photos/052_high_low_marks.jpg",
          "caption": "Dipstick with high and low marks",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Choosing an oil"
        },
        {
          "type": "p",
          "html": "<strong>SAE J300</strong> defines viscosity grades. The number after the W is the high-temperature grade, defined by kinematic viscosity at 100 °C, with minimum high-temperature high-shear (HTHS) values at 150 °C. The W (winter) number is defined by cold-cranking and pumping viscosity limits at low temperature, so a 10W-40 behaves like a 10W oil when cold and a 40 grade when hot. Typical motorcycle choices are 10W-30, 10W-40 and 15W-50."
        },
        {
          "type": "table",
          "head": [
            "SAE high-temperature grade",
            "Kinematic viscosity at 100 °C"
          ],
          "rows": [
            [
              "30",
              "9.3 to under 12.5 mm²/s"
            ],
            [
              "40",
              "12.5 to under 16.3 mm²/s"
            ],
            [
              "50",
              "16.3 to under 21.9 mm²/s"
            ],
            [
              "60",
              "21.9 to under 26.1 mm²/s"
            ]
          ]
        },
        {
          "type": "p",
          "html": "<strong>API</strong> service categories (SL, SM, SN, SP for petrol engines) define wear protection, deposit control and oxidation resistance. Car oils marked \"Resource Conserving\" contain friction modifiers that reduce the friction between clutch plates, so a wet clutch running in them slips, overheats and wears. Motorcycle oils are therefore also classified by <strong>JASO T903</strong>, which guarantees a friction level suited to the clutch:"
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
          "type": "p",
          "html": "The 2023 revision of JASO T903 aligned its crankcase performance requirements with current API categories, updated the SAE No. 2 clutch friction test to current friction materials and reference oils, and revised physical-chemical limits to protect three-way catalysts. A CVT scooter with a dry centrifugal clutch has no oil-bathed clutch to slip, so a JASO MB oil is appropriate and its lower friction reduces engine losses."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb",
          "html": "Wet clutch = <strong>JASO MA/MA2</strong>. Never put JASO MB or an energy-conserving car oil in a bike with a wet clutch."
        },
        {
          "type": "p",
          "html": "Change intervals range from <strong>3,000 km</strong> on small air-cooled singles such as the K-Light 125 to 6,000–12,000 km on liquid-cooled multis with paper filters. Dust, heat, heavy loads and short trips that never warm the oil fully justify shorter intervals. Choosing an oil for a given machine is covered in <a href=\"../repair/repairs/oil-choose-four-stroke/\">choosing four-stroke oil</a>."
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
          "type": "p",
          "html": "Many larger engines add an <strong>oil cooler</strong> or, like Suzuki's SACS engines, route a large oil flow through the head to carry heat away. Because air-cooled engines run larger clearances and wider temperature swings, they are more sensitive to lean mixture, dirty fins and low oil than liquid-cooled ones. Fins should be kept clean and checked for cracks and missing sections, as in <a href=\"../repair/repairs/air-cooling-check/\">checking an air-cooled engine</a>."
        },
        {
          "type": "h3",
          "text": "Liquid cooling"
        },
        {
          "type": "p",
          "html": "A liquid-cooled engine has water jackets cast around the cylinder and combustion chamber, so metal temperatures stay nearly constant whatever the speed or weather. That allows tighter clearances and higher compression ratios than air cooling, at the cost of weight, complexity and parts that can fail."
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
          "html": "The <strong>pressure cap</strong> keeps the coolant liquid well above its open boiling point, so the metal surfaces can run hot without local boiling, which would form a steam layer and stop heat transfer."
        },
        {
          "type": "eq",
          "id": "m2-boiling-point-pressure",
          "name": "Coolant boiling point under a pressure cap",
          "tex": "T_b \\approx T_{b0} + k\\,\\Delta p",
          "where": [
            [
              "T_b",
              "boiling point under the cap",
              "°C"
            ],
            [
              "T_{b0}",
              "boiling point at atmospheric pressure, about 107 °C for 50 % ethylene glycol",
              "°C"
            ],
            [
              "k",
              "rise per bar of pressure, about 20 °C/bar over the usual cap range (2 °C per 0.1 bar), a rule of thumb",
              "°C/bar"
            ],
            [
              "\\Delta p",
              "cap pressure above atmospheric, typically 0.9–1.4 bar",
              "bar"
            ]
          ],
          "why": "Explains why a weak cap lets a healthy engine boil over, and why a hot system must never be opened: releasing the pressure drops the boiling point below the coolant temperature.",
          "example": "A 0.9 bar cap on 50 % glycol: \\(T_b \\approx 107 + 20 \\times 0.9 \\approx 125\\,{}^\\circ\\mathrm{C}\\); a 1.4 bar cap gives about 135 °C. Both match published boiling tables for 50 % glycol."
        },
        {
          "type": "p",
          "html": "A cap with a weak seal or spring lets coolant boil, foam and escape to the overflow tank, and a failed head gasket pressurises the system with combustion gas. A thermostat stuck open makes the engine run cold, with poor economy and high wear; stuck closed, coolant cannot reach the radiator and the engine overheats quickly. Tests are in <a href=\"../repair/repairs/coolant-check/\">checking coolant</a>, <a href=\"../repair/repairs/thermostat-test/\">testing a thermostat</a>, <a href=\"../repair/repairs/fan-test/\">testing the fan</a>, <a href=\"../repair/repairs/cooling-leak-test/\">pressure testing the cooling system</a> and <a href=\"../repair/repairs/water-pump-inspect/\">inspecting the water pump</a>."
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
          "type": "h3",
          "text": "Checking the oil level correctly"
        },
        {
          "type": "p",
          "html": "Too little oil starves the bearings and the camshafts in the head. Too much fills the air space the crankcase needs, raises the pressure inside it and pushes oil out through the breather and seals, or into the airbox where it is burnt and smokes. Every check is made with the machine upright on level ground, normally on the centre stand, after the oil has had a few minutes to drain back."
        },
        {
          "type": "table",
          "head": [
            "Method",
            "How to read it",
            "Watch for"
          ],
          "rows": [
            [
              "Dipstick",
              "Wipe it, rest it in the hole without screwing it in unless the manual says otherwise, withdraw and read between the marks",
              "A screw-in and a rest-in reading differ"
            ],
            [
              "Level plug",
              "Remove the plug and add oil until it just runs out of the hole",
              "Common on small engines and racing machines"
            ],
            [
              "Sight window",
              "Read the level between the marks on the window",
              "A discoloured window, or very clean oil that is hard to see"
            ],
            [
              "Dry-sump tank",
              "Run the engine for a few minutes first, stop, then read the tank dipstick",
              "Oil drains from the tank into the sump while standing, so a cold reading is false"
            ]
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/052_oil_level_sight_window.jpg",
          "caption": "Oil level sight window with high and low marks",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A dry-sump engine that has stood for some time may show a low tank and a full crankcase: the oil has drained through the pump. Topping up the tank before running the engine overfills the system. See <a href=\"../repair/repairs/oil-level-check/\">Check the engine oil level</a>, <a href=\"../repair/repairs/oil-level-dry-sump/\">Check the oil level on a dry-sump engine</a> and <a href=\"../repair/repairs/oil-level-window-plug/\">Read an oil level window or level plug</a>."
        },
        {
          "type": "h3",
          "text": "Job sheet 2.6.1: Oil and filter change"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Warm, not hot",
              "html": "Run the engine briefly so the oil is warm and mixed and drains well; hot oil and exhaust burn. Place a container large enough for the whole capacity under the drain plug."
            },
            {
              "title": "Find the right plug",
              "html": "Some engines have two drain plugs, and some have a gearshift return-spring bolt next to the drain plug; removing that bolt by mistake means a major strip-down. Check the manual."
            },
            {
              "title": "Read the drain plug",
              "html": "Many drain plugs carry a magnet. A fine grey paste is normal; flakes or chips of metal call for an engine inspection."
            },
            {
              "title": "Filter and screen",
              "html": "Renew a paper element or spin-on filter; fit cartridge springs and washers exactly as they came out. Clean the strainer screen or centrifugal rotor where fitted."
            },
            {
              "title": "Refit the drain plug",
              "html": "New sealing washer, clean threads, the manual's torque with a torque wrench. Drain threads strip easily, and many cases have too little metal around the hole for a thread insert."
            },
            {
              "title": "Fill and check",
              "html": "Fill with the change quantity of the specified oil, run for about a minute, stop, wait a few minutes and check again; the filter will have taken some oil."
            },
            {
              "title": "Confirm oil reaches the head",
              "html": "On an engine with no oil pressure lamp, an oil check bolt on the head should weep oil when loosened briefly at idle."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/051_oil_drain_bolt.jpg",
          "caption": "Engine oil drain bolt",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "<strong>Pass criteria:</strong> correct oil and quantity, new sealing washer, drain plug at torque, level correct after running, no leak, and oil delivery to the head confirmed. See <a href=\"../repair/repairs/engine-oil-service/\">Change the engine oil</a>, <a href=\"../repair/repairs/oil-filter-change/\">Change the oil filter</a>, <a href=\"../repair/repairs/drain-bolt-tighten/\">Tighten an oil drain bolt correctly</a> and <a href=\"../repair/repairs/oil-flow-to-head-check/\">Check that oil reaches the cylinder head</a>."
        },
        {
          "type": "h3",
          "text": "Coolant, pressure cap and recovery tank"
        },
        {
          "type": "p",
          "html": "Use coolant made for motorcycles, or an automotive coolant without silicates, which can accelerate water pump wear. Plain water without antifreeze can freeze and crack a cylinder or head, and has none of the inhibitors that protect aluminium."
        },
        {
          "type": "p",
          "html": "As the coolant heats it expands, and the pressure cap lets the excess pass into the <strong>recovery tank</strong>; as it cools, the vacuum draws it back. The tank level is therefore checked cold, at its mark: enough to supply the radiator when cold, with room for the expansion when hot. After refilling, run the engine to working temperature, let it cool completely, and check both radiator and recovery tank again, since air trapped in the jackets works its way out on the first heat cycle: <a href=\"../repair/repairs/coolant-check/\">Check the coolant</a> and <a href=\"../repair/repairs/coolant-replace/\">Replace the coolant</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/125_coolant_reservoir.jpg",
          "caption": "Coolant recovery tank with its level mark",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Cooling system fault finding"
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Likely cause",
            "Test"
          ],
          "rows": [
            [
              "Overheats while riding, level correct",
              "Thermostat stuck closed, or pump not circulating",
              "Thermostat in a pan of water with a thermometer: it must open at its marked temperature. Then remove the radiator cap only with the engine cold, start it and watch for coolant moving at the filler as it warms"
            ],
            [
              "Overheats only at idle or in traffic",
              "Fan not running",
              "Bridge the fan switch or feed the fan directly from the battery; if it runs, replace the switch: <a href=\"../repair/repairs/fan-test/\">Test the cooling fan</a>"
            ],
            [
              "Coolant pushed out of the filler, bubbles, white exhaust",
              "Combustion gas entering the coolant: head gasket or cracked head",
              "<a href=\"../repair/repairs/cooling-leak-test/\">Pressure-test the cooling system</a>"
            ],
            [
              "Coolant drip from a small hole on the pump body",
              "Weep hole showing a failing pump seal or bearing",
              "<a href=\"../repair/repairs/water-pump-inspect/\">Inspect the water pump</a>"
            ],
            [
              "Takes a long time to warm up",
              "Thermostat stuck open",
              "Thermostat test: <a href=\"../repair/repairs/thermostat-test/\">Test a thermostat</a>"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A cold engine pushed hard can seize even when the cooling system is perfect: the piston heats and expands faster than the cylinder, and cold oil flows poorly. Ride gently until the engine is warm, whether it is liquid- or air-cooled. A thermostat should not be removed to cure overheating; it controls the flow, and without it the engine may never reach its working temperature."
        },
        {
          "type": "h3",
          "text": "Reading the drained oil"
        },
        {
          "type": "p",
          "html": "Old oil carries evidence from inside the engine. A few minutes of looking during every oil change can give early warning of a failing bearing, a fuel or coolant leak or a worn clutch. What the oil shows is a clue, not proof: confirm it with other tests before opening the engine."
        },
        {
          "type": "table",
          "head": [
            "What you find",
            "Possible meaning",
            "Next step"
          ],
          "rows": [
            [
              "Milky or creamy oil, water droplets",
              "Condensation from short trips, or coolant leaking in",
              "Cooling system pressure test; head gasket"
            ],
            [
              "Strong petrol smell, thin oil, level was high",
              "Fuel passing the rings, or a flooding carburettor",
              "Carburettor float and fuel tap (Chapter 3.3)"
            ],
            [
              "Steel flakes or chips on the magnet",
              "Bearing, gear or cam chain wear",
              "Do not run the engine: <a href=\"../repair/repairs/engine-internal-assessment/\">Assess internal engine damage</a>"
            ],
            [
              "Shiny flakes that a magnet does not pick up",
              "Aluminium or bronze wear: piston, bushes, thrust washers",
              "Top-end and bearing inspection"
            ],
            [
              "Brown fibre or grit",
              "Clutch friction material",
              "Clutch inspection"
            ],
            [
              "Black very soon after a change",
              "Blow-by past worn rings, or overdue changes",
              "Compression and leak-down tests (Chapter 2.7)"
            ],
            [
              "Pieces of plastic or rubber",
              "Cam chain guide or tensioner wear",
              "Cam chain and guides"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Catch some of the first oil in a clean glass jar, hold it to the light and let it stand for an hour: water sinks to the bottom as droplets or a layer. Very fine grey paste on the drain magnet is normal wear; visible flakes, slivers or chips are not. Note what was found and the odometer reading on the job card, so the next change can be compared: <a href=\"../repair/repairs/oil-inspect/\">Inspect drained oil for clues</a>."
        },
        {
          "type": "h3",
          "text": "Keeping an air-cooled engine cool"
        },
        {
          "type": "p",
          "html": "An air-cooled engine depends on clean fins, moving air, a correct mixture and enough oil. It overheats in slow traffic more than at road speed, and any of the following can tip it over the edge."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Oil level",
              "html": "Oil carries a large share of the heat on an air-cooled engine; low or old oil makes it run hotter."
            },
            {
              "title": "Fins",
              "html": "Look between the fins with a torch for packed mud, sand, oil-soaked dust or debris; the K-Light 125 fault chart lists fins clogged with sand and oil as a cause of overheating. Clean a cold engine with a soft brush, plastic scraper and detergent; never spray cold water on a hot cylinder."
            },
            {
              "title": "Airflow",
              "html": "Remove anything that blocks air in front of the engine. On a fan-cooled scooter, check that the fan and its cowling are complete and the inlet grille is clear."
            },
            {
              "title": "Mixture",
              "html": "Read the spark plug: white or blistered means lean and hot (look for an intake air leak); the K-Light 125 should show light grey."
            },
            {
              "title": "Extra load",
              "html": "A choked exhaust, dragging brakes or a slipping clutch all make the engine work harder and run hotter."
            }
          ]
        },
        {
          "type": "p",
          "html": "Full check: <a href=\"../repair/repairs/air-cooling-check/\">Check air cooling (fins, airflow, mixture)</a>. If the engine still runs hot with clean fins and a normal plug, check ignition timing, oil delivery to the head and compression."
        },
        {
          "type": "check",
          "q": "m2-26"
        },
        {
          "type": "check",
          "q": "m2-41"
        },
        {
          "type": "check",
          "q": "m2-42"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "A wet sump shares one oil between engine, gearbox and wet clutch; a dry sump stores it in a tank and uses a scavenge pump.<br>The trochoid pump, strainer and filter (a centrifugal rotor on CG-type engines such as the K-Light 125) all have service limits or cleaning intervals.<br>In 10W-40, 10W is the cold grade and 40 the viscosity at 100 °C; a wet clutch needs JASO MA, MA1 or MA2, never MB or an energy-conserving car oil.<br>Air cooling is light and simple but sensitive to dirty fins, low oil and lean mixture.<br>A pressure cap raises the coolant boiling point by roughly 25–30 °C per bar, so a hot system must never be opened."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "hnNN6c7lb8c",
              "title": "How to Change Motorcycle Oil at RevZilla.com",
              "channel": "RevZilla",
              "channel_url": "http://www.youtube.com/@RevZilla",
              "duration": "16:38",
              "role": "How-to",
              "note": "Change oil and filter, new washer, torque the drain bolt; use your manual's grade and quantity."
            },
            {
              "id": "Bt2eYZMlTFI",
              "title": "How To Flush And Service Your Motorcycle's Radiator And Cooling System | MC GARAGE",
              "channel": "Motorcyclist Magazine",
              "channel_url": "http://www.youtube.com/@MotorcyclistMag",
              "duration": "3:15",
              "role": "How-to",
              "note": "Flush and refill the cooling system; bleeding and coolant type differ per bike."
            },
            {
              "id": "t1G1VWd9B90",
              "title": "4-Stroke Motor Cycle Animation",
              "channel": "Lubrizol360",
              "channel_url": "http://www.youtube.com/@LubrizolAdditives360",
              "duration": "2:51",
              "role": "How it works",
              "note": "Four-stroke animation showing engine, clutch and gearbox sharing one oil supply."
            }
          ]
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
          "type": "h3",
          "text": "Diagnostic approach"
        },
        {
          "type": "p",
          "html": "Before dismantling anything, confirm <strong>fuel, battery voltage, air filter and oil level</strong>. The MAVCC tune-up order (plugs, valve clearance, cam chain, ignition timing, air filter, crankcase ventilation, fuel adjustment, oil change) follows because each step depends on the ones before."
        },
        {
          "type": "p",
          "html": "Diagnosis proceeds from the least to the most invasive check, because the cheap checks find most faults and dismantling an engine to find a blocked air filter wastes hours. Each symptom points to one or more of the three essentials, and the table narrows the field before any tool touches the engine. The general method is set out in <a href=\"../repair/repairs/diagnosis-method/\">a diagnosis method</a>."
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
              "Hard starting, cranks normally",
              "No or weak spark; fuel not delivered; low compression; valve clearance too small",
              "Spark test; fuel pressure or injector pulse; compression test; valve clearance",
              "Repair ignition or fuel fault; adjust valves; overhaul top end"
            ],
            [
              "Hard hot starting only",
              "Valve clearance closing up; decompressor stuck; leaking injector",
              "Clearance; compression hot and cold",
              "Adjust; repair decompressor; replace injector"
            ],
            [
              "Low power, runs smoothly",
              "Blocked filter or exhaust (catalyst); retarded timing; worn rings; slipping clutch",
              "Filter; back-pressure; timing light; compression; clutch test in top gear",
              "Clean or replace; repair"
            ],
            [
              "Blue smoke",
              "Oil burning: rings, bore, stem seals, guides; overfilled sump",
              "Wet compression; smoke on overrun (guides) or under load (rings)",
              "Rings, rebore, seals or guides; correct level"
            ],
            [
              "Black smoke",
              "Rich mixture: blocked filter, faulty sensor, leaking injector, choke on",
              "Plug reading; fault codes; injector test",
              "Replace or repair"
            ],
            [
              "White smoke that persists when warm",
              "Coolant burning: head gasket or cracked head",
              "Coolant level; combustion leak test",
              "Gasket or head"
            ],
            [
              "Pinking under load",
              "Detonation: low octane, carbon, lean, overheating, over-advanced",
              "Fuel; timing; plug colour; carbon",
              "Correct fuel; decarbonise; repair cause"
            ],
            [
              "Deep knock rising with load",
              "Big-end or main bearing wear",
              "Crank play with top end removed",
              "Crank assembly"
            ],
            [
              "Overheating",
              "Low oil (air-cooled); low coolant, failed fan, stuck thermostat, blocked radiator; lean mixture",
              "Levels; fan switch; thermostat test; plug colour",
              "Repair cause"
            ],
            [
              "High oil consumption",
              "Rings, bores, guides, seals; external leaks; breather carrying oil",
              "Compression and leak-down; look for leaks and an oily air box",
              "Overhaul; renew seals or breather"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Smoke colour is often the first clue a rider reports; separating blue, black and white smoke and noting when it appears is covered in <a href=\"../repair/repairs/smoke-diagnosis/\">diagnosing exhaust smoke</a>."
        },
        {
          "type": "h3",
          "text": "Compression test"
        },
        {
          "type": "p",
          "html": "A compression test measures the peak pressure the cylinder reaches while cranking, which depends on how well the rings, valves and head gasket seal. The throttle must be fully open so the cylinder fills completely, and the battery fully charged so cranking speed stays up; a closed throttle or slow cranking gives a low and misleading reading. The reference for the K-Light 125 is <strong>1.0–1.2 MPa</strong> (145–174 psi) (K-Light 125 manual)."
        },
        {
          "type": "photo",
          "src": "repair-photos/103_engine_compression_testing_2.jpg",
          "caption": "Screw-in compression gauge with hose and adapters"
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
          "type": "p",
          "html": "The wet test separates ring and valve faults. A little oil temporarily seals the gap between rings and bore, so if the rings are the leak the reading rises; it cannot seal a valve or gasket, so a valve fault barely changes."
        },
        {
          "type": "eq",
          "id": "m2-wet-test-rise",
          "name": "Wet compression test rise",
          "tex": "\\Delta_{wet} = \\frac{p_{wet} - p_{dry}}{p_{dry}} \\times 100\\,\\%",
          "where": [
            [
              "\\Delta_{wet}",
              "rise in compression with oil added",
              "%"
            ],
            [
              "p_{wet}",
              "reading with about 5 mL of oil in the cylinder",
              "MPa"
            ],
            [
              "p_{dry}",
              "reading without oil",
              "MPa"
            ]
          ],
          "why": "Decides between a ring or bore fault and a valve or head-gasket fault from two quick readings. A rise of more than about 10–15 % points to rings, piston or bore.",
          "example": "K-Light 125 reading 0.75 MPa dry and 0.95 MPa wet: \\(\\Delta_{wet} = (0.95 - 0.75) / 0.75 \\times 100 = 27\\ \\%\\), so the rings, piston or bore are worn."
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
          "type": "p",
          "html": "Full procedures are in <a href=\"../repair/repairs/compression-test/\">compression test</a>; where no gauge is available, <a href=\"../repair/repairs/thumb-compression-check/\">a thumb compression check</a> gives a rough comparison. A reading above specification on a K-Light 125 suggests carbon build-up reducing the clearance volume, as the fundamentals chapter shows."
        },
        {
          "type": "photo",
          "src": "repair-photos/106_leak_down_testing.jpg",
          "caption": "Leak-down tester kit with two gauges"
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
          "html": "A leak-down test complements the compression test. Instead of a dynamic peak while cranking, it pressurises the cylinder with regulated compressed air through a calibrated restrictor, with the piston stopped at TDC on the compression stroke, and measures how much escapes. The escaping air can be heard, so the test shows <em>where</em> the leak is as well as how big it is."
        },
        {
          "type": "eq",
          "id": "m2-leakage",
          "name": "Cylinder leakage percentage",
          "tex": "L = \\frac{p_{in} - p_{cyl}}{p_{in}} \\times 100\\,\\%",
          "where": [
            [
              "L",
              "cylinder leakage",
              "%"
            ],
            [
              "p_{in}",
              "regulated input pressure on the first gauge",
              "psi or bar"
            ],
            [
              "p_{cyl}",
              "pressure held in the cylinder on the second gauge",
              "psi or bar"
            ]
          ],
          "why": "Expresses how well a cylinder holds pressure, independent of cranking speed. As a general guide under 10 % is good, 10–20 % shows wear and over 20–30 % indicates a fault needing repair.",
          "example": "MAVCC setting of 60 psi in with 40 psi held: \\(L = (60 - 40) / 60 \\times 100 = 33\\ \\%\\), a fault to locate."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Set TDC compression",
              "html": "Warm the engine, remove the plug and set the piston at TDC on the compression stroke, both valves closed: watch the inlet open and close, then align the T mark."
            },
            {
              "title": "Lock the crank",
              "html": "Engage a gear with the rear brake applied, or fit a crank holding tool."
            },
            {
              "title": "Connect and pressurise",
              "html": "Fit the adapter, connect the tester with its regulator wound fully out, then connect the air (4–7 bar supply) and set the input gauge to the tester's calibration pressure, typically 100 psi or 7 bar."
            },
            {
              "title": "Read and listen",
              "html": "Read the leakage percentage, then listen at the exhaust, the throttle body or air box, the oil filler and the head joint or radiator."
            }
          ]
        },
        {
          "type": "table",
          "head": [
            "Air heard or seen at",
            "Leak through"
          ],
          "rows": [
            [
              "Exhaust",
              "Exhaust valve"
            ],
            [
              "Throttle body or air box",
              "Inlet valve"
            ],
            [
              "Oil filler or breather",
              "Piston rings"
            ],
            [
              "Bubbles in the radiator, or air at the head joint",
              "Head gasket"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Readings are comparable only on the same tester, because restrictor sizes differ between makes; the manual's guidance takes precedence over the general guide. The step-by-step method is in <a href=\"../repair/repairs/leak-down-test/\">leak-down test</a>."
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
          "type": "p",
          "html": "The procedure applies to SOHC rocker engines and to OHV push-rod engines such as the K-Light 125, since both use a screw-and-locknut adjuster at the rocker tip. The K-Light 125 manual specifies <strong>0.05–0.07 mm</strong> for inlet and exhaust with the engine cold (below 35 °C) and a locknut torque of 10–15 N·m. Tools are a set of feeler gauges (0.05, 0.06 and 0.07 mm), a ring spanner for the locknut, an adjuster tool or screwdriver, a 14 mm socket to turn the crank and new cover O-rings."
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
          "type": "p",
          "html": "The crank is turned in its normal direction, which the manual gives as anticlockwise on the K-Light flywheel nut, and the manual instructs adjusting the exhaust valve first, then the inlet. A clearance found too small at the previous service, especially on the exhaust, indicates valve recession and suggests a compression test. The full method is in <a href=\"../repair/repairs/valve-clearance/\">adjusting valve clearance</a>."
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
          "html": "Tools are a dial bore gauge, or a telescopic gauge with a 50–75 mm outside micrometer, a 50–75 mm micrometer for the piston, feeler gauges and a straightedge. Clean the cylinder and piston, remove carbon from the crown and ring grooves (a broken old ring makes a good groove scraper), and inspect for scoring, seizure marks and cracks first: a visibly scored cylinder needs reboring regardless of dimensions."
        },
        {
          "type": "p",
          "html": "Measure the bore at three heights (top, about 10 mm below the deck; middle; bottom, just above the area swept by the skirt) and in two directions at each height: X along the crankshaft and Y across it, the direction of piston thrust. That gives six readings. Wear is greatest at the top of ring travel in the Y direction."
        },
        {
          "type": "eq",
          "id": "m2-bore-wear",
          "name": "Cylinder out-of-round and taper",
          "tex": "\\mathrm{OOR} = \\left| D_Y - D_X \\right| \\qquad \\mathrm{taper} = D_{top} - D_{bottom}",
          "where": [
            [
              "\\mathrm{OOR}",
              "out-of-round at one height",
              "mm"
            ],
            [
              "D_X,\\ D_Y",
              "bore diameters along and across the crankshaft at that height",
              "mm"
            ],
            [
              "\\mathrm{taper}",
              "change in diameter from top to bottom, in one direction",
              "mm"
            ],
            [
              "D_{top},\\ D_{bottom}",
              "largest and smallest readings in that direction",
              "mm"
            ]
          ],
          "why": "A bore can be within its diameter limit and still be too oval or too tapered for new rings to seal. Both are compared with the K-Light 125 limit of 0.05 mm.",
          "example": "Top \\(D_Y = 56.592\\), top \\(D_X = 56.560\\): \\(\\mathrm{OOR} = 0.032\\ \\mathrm{mm}\\); taper in Y \\(= 56.592 - 56.538 = 0.054\\ \\mathrm{mm}\\), over the limit."
        },
        {
          "type": "eq",
          "id": "m2-piston-clearance",
          "name": "Piston-to-cylinder clearance",
          "tex": "c = D_{max} - d_p",
          "where": [
            [
              "c",
              "piston-to-cylinder clearance",
              "mm"
            ],
            [
              "D_{max}",
              "largest bore reading",
              "mm"
            ],
            [
              "d_p",
              "piston diameter at 90° to the pin, 11 mm above the skirt bottom on the K-Light 125",
              "mm"
            ]
          ],
          "why": "Too much clearance lets the piston rock and slap in the bore and the rings seal poorly; the K-Light 125 limit is 0.17 mm.",
          "example": "New K-Light parts give \\(56.500 - 56.485 = 0.015\\ \\mathrm{mm}\\) to \\(56.505 - 56.470 = 0.035\\ \\mathrm{mm}\\)."
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
            ],
            [
              "Ring side clearance",
              "0.015–0.05 mm",
              "0.09 mm"
            ],
            [
              "Cylinder top face flatness",
              "–",
              "0.05 mm"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Worked example: readings top Y 56.592, top X 56.560, bottom Y 56.538, bottom X 56.534, piston 56.46. Out-of-round at the top is 0.032 mm (within 0.05) and clearance is \\(56.592 - 56.46 = 0.132\\ \\mathrm{mm}\\) (within 0.17), but taper in Y is 0.054 mm, <strong>over</strong> the 0.05 mm limit. Decision: rebore to the next oversize and fit a matching piston and rings. Every limit must be checked, because any one of them can condemn the part."
        },
        {
          "type": "p",
          "html": "Ring end gap is measured with each compression ring pushed squarely into the bore by the piston crown to about 10–20 mm below the top, and again at the least-worn bottom of the bore when assessing a rebore. A gap over 0.5 mm means new rings. Because the gap grows by \\(\\pi\\) times any increase in diameter, gaps at the top and bottom give a quick taper check."
        },
        {
          "type": "eq",
          "id": "m2-ring-gap-taper",
          "name": "Bore taper from ring end gaps",
          "tex": "\\Delta D \\approx \\frac{g_{top} - g_{bottom}}{\\pi}",
          "where": [
            [
              "\\Delta D",
              "difference in bore diameter between the two positions",
              "mm"
            ],
            [
              "g_{top}",
              "ring end gap measured near the top of the bore",
              "mm"
            ],
            [
              "g_{bottom}",
              "ring end gap measured at the bottom of the bore",
              "mm"
            ]
          ],
          "why": "The circumference of the bore is (pi D), so a ring gap is a sensitive measure of diameter. Comparing gaps gives a taper estimate with only feeler gauges.",
          "example": "Gaps of 0.42 mm at the top and 0.25 mm at the bottom: \\(\\Delta D \\approx 0.17 / \\pi = 0.054\\ \\mathrm{mm}\\), over the 0.05 mm limit."
        },
        {
          "type": "p",
          "html": "Ring side clearance in the groove is measured with a feeler gauge with the ring fitted to the piston; over 0.09 mm means a worn groove and a new piston. Measurement methods are in <a href=\"../repair/repairs/piston-clearance-measure/\">measuring piston clearance</a>, and finishing a bore for new rings in <a href=\"../repair/repairs/cylinder-hone/\">honing a cylinder</a>."
        },
        {
          "type": "h3",
          "text": "Two-stroke top-end rebuild: key points"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Strip",
              "html": "Clean the machine, remove the tank, carburettor or throttle body, exhaust and coolant. Disconnect any power-valve linkage and remove the head nuts in a cross pattern, smallest first. Never prise on fins."
            },
            {
              "title": "Lift the cylinder",
              "html": "Lift it with the piston at TDC, tilting so ring fragments fall outside the crankcase, and <strong>stuff the crankcase mouth with clean rag</strong> at once."
            },
            {
              "title": "Remove the piston",
              "html": "Remove one clip and push the pin out, with an extractor if tight. Never hammer the pin: it bends the rod."
            },
            {
              "title": "Check the rod and clean",
              "html": "Up-and-down play at the big end means a worn big-end bearing and a crank overhaul; some side play is normal. Clean carbon from crown, head and exhaust port (not the transfers, which may be coated), remove gasket material without gouging, and clean the power valve."
            },
            {
              "title": "Measure",
              "html": "Six bore readings, the middle ones close to the ports. Many modern bores are nickel-silicon carbide plated and cannot be rebored: replating or a new cylinder is needed."
            },
            {
              "title": "Assemble",
              "html": "Check new ring gaps in the bore, fit rings with markings up and ends at the locating pins, fit a new oiled small-end bearing, the piston with its arrow toward the exhaust, and new clips with gaps away from the removal notch."
            },
            {
              "title": "Close up and run in",
              "html": "New base gasket, oiled bore, cylinder on, head torqued in a cross pattern. Check squish clearance if specified (solder squeezed between piston and head), then run in for the specified period, often 1–2 hours, varying speed and avoiding sustained full throttle."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/113_move_hone_back_forth_cylinder_produce.jpg",
          "caption": "45 degree cross-hatch pattern in a honed bore"
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Seat every clip",
          "html": "A gudgeon pin clip that comes out lets the pin slide into the bore and destroys the cylinder. Use new clips, turn each until it is fully in its groove, and check both before the cylinder goes on (<a href=\"../repair/repairs/circlip-fit/\">fitting circlips</a>). Running in is covered in <a href=\"../repair/repairs/engine-break-in/\">engine break-in</a>."
        },
        {
          "type": "h3",
          "text": "Reading a spark plug"
        },
        {
          "type": "photo",
          "src": "repair-photos/085_spark_plug.jpg",
          "caption": "Spark plug fouled with black soot",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A plug records the combustion of the last few minutes of running. Read it after a run at steady load, not after idling, which leaves soot on any plug; for a precise reading, stop the engine under load (a \"plug chop\"). K-Light plug: <strong>D7RTC, gap 0.7 ± 0.1 mm, 15 N·m</strong> (K-Light 125 manual)."
        },
        {
          "type": "table",
          "head": [
            "Appearance",
            "Meaning",
            "Action"
          ],
          "rows": [
            [
              "Light grey or tan",
              "Normal combustion, correct heat range",
              "None"
            ],
            [
              "Dry black soot",
              "Rich mixture, blocked filter, idling, plug too cold",
              "Check filter, EFI sensors, injector"
            ],
            [
              "Wet black oily",
              "Oil entering (rings, guides, seals; too much premix or pump over-delivery)",
              "Compression and leak-down test"
            ],
            [
              "Chalk-white, blistered, eroded",
              "Overheating: lean, air leak, over-advanced, plug too hot",
              "Find cause before running further"
            ],
            [
              "Small metal specks",
              "Detonation or piston damage beginning",
              "Stop and inspect"
            ],
            [
              "Glazed yellow-brown deposits",
              "High-speed running after deposits built up, fuel additives",
              "Replace plug"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Set the gap with a wire gauge by bending only the earth electrode; never lever against the centre electrode. Fit by hand to avoid cross-threading, then torque. On a two-stroke, a wet black plug after a ride can mean too much oil in the premix or pump over-delivery, rich jetting or a blocked air filter, a worn gearbox-side crank seal drawing in gearbox oil, or a plug too cold for the use. Methods are in <a href=\"../repair/repairs/spark-plug-reading/\">reading a spark plug</a> and <a href=\"../repair/repairs/spark-plug-heat-range/\">choosing a plug heat range</a>."
        },
        {
          "type": "figure",
          "fig": "afr",
          "caption": "Slide from rich to lean and connect each zone with a plug colour: rich = dry black soot, lean = chalk-white and blistered."
        },
        {
          "type": "h3",
          "text": "Running in a rebuilt engine"
        },
        {
          "type": "p",
          "html": "New rings and a freshly honed bore must wear into each other before they seal fully. Too gentle a running-in can leave the bore glazed so the rings never seat; too hard a running-in overheats the new parts and can seize the piston. Follow the manual's running-in instructions first; within them, the practice below balances the two risks."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Warm up fully",
              "html": "Never load a cold, newly built engine. Watch for leaks and listen for noises during the first warm-up."
            },
            {
              "title": "Vary the load",
              "html": "Accelerate briskly through the lower gears to well below the red line, then close the throttle and let the engine slow in gear, which draws oil onto the cylinder walls and cools the piston. Repeat at intervals."
            },
            {
              "title": "Avoid steady speeds",
              "html": "Do not hold one throttle opening for long periods in the early distance; close and reopen the throttle every few kilometres on a long road."
            },
            {
              "title": "Increase gradually",
              "html": "Ride gently for the first few hundred kilometres, then use progressively more of the rev range."
            },
            {
              "title": "Change the oil early",
              "html": "Change oil and filter after the first short distance to remove the metal released as the parts bed in, then follow the schedule."
            }
          ]
        },
        {
          "type": "p",
          "html": "See <a href=\"../repair/repairs/engine-break-in/\">Run in a new or rebuilt engine</a>. If a rebuilt engine still smokes or lacks compression after running-in, return to the compression and leak-down tests above before blaming the rings: valve timing, clearances and the head gasket are all common causes."
        },
        {
          "type": "p",
          "html": "When an engine has seized or failed, read the parts before ordering new ones. Scuffing concentrated on the exhaust side of a two-stroke piston points to overheating or lean running; a pin welded to the rod points to lubrication failure; a piston crown pitted by debris points to a breaking bearing. A new piston fitted without curing the cause fails the same way: <a href=\"../repair/repairs/engine-failure-read/\">Read why an engine failed</a>."
        },
        {
          "type": "check",
          "q": "m2-43"
        },
        {
          "type": "check",
          "q": "m2-44"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Every engine needs compression, a correctly timed spark and the right mixture; check them from the least to the most invasive test.<br>A K-Light 125 should read 1.0–1.2 MPa dry; a rise of more than 10–15 % on the wet test points to rings, a small rise to valves or gasket.<br>Leak-down at locked TDC compression gives a percentage and, by listening, the location of the leak.<br>Valve clearance is set cold at TDC compression and rechecked after the locknut is tightened.<br>Six bore readings give out-of-round, taper and clearance; any one over its limit condemns the part."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "r3Q0_yYeG3c",
              "title": "Old Motorcycle Won’t Start? Cheap Checks and Easy Fixes",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "5:01",
              "role": "How-to",
              "note": "Cheap checks for an old bike that will not start: fuel, spark, air and kill switch, in order."
            },
            {
              "id": "SHsNIfQr7d4",
              "title": "इंजन का काम कैसे करवाना चाहिए // कितना खर्च पड़ जाता है // Best Engine Service Hero Splendor /QA",
              "channel": "QASIM AUTO",
              "channel_url": "http://www.youtube.com/@QASIMAUTO",
              "duration": "15:06",
              "role": "How it works",
              "note": "Hindi talk on engine work, service choices and cost; costs depend on place and date."
            },
            {
              "id": "-D81UzH-hTw",
              "title": "Will this Honda Motorcycle Run and Not Catch On Fire?",
              "channel": "The Bearded Mechanic",
              "channel_url": "http://www.youtube.com/@The_Bearded_Mechanic",
              "duration": "26:50",
              "role": "Case study",
              "note": "Will-it-run revival of an old Honda; shows a check order and fire risk from fuel leaks, values for that bike only."
            }
          ]
        }
      ]
    }
  ],
  "gkey": "m2"
};
