/* Motopedia: Module 3 lessons (fuel, air and exhaust). Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "fuel",
  "num": "3",
  "title": "Fuel, air and exhaust",
  "intro": "How a motorcycle mixes air and fuel and gets rid of the exhaust: mixture and combustion, fuel supply, carburettors, fuel injection and engine management, intake, exhaust and emissions, and how to diagnose fuel faults.",
  "pdf": "motopedia-module-3-fuel-ignition-electrical.pdf",
  "chapters": [
    {
      "id": "m3-mixture",
      "title": "Air, fuel and mixture",
      "lead": "An engine is a controlled fire, and a fire needs the right recipe: a set mass of air for every gram of fuel. Get the recipe wrong and you lose power, burn valves or foul plugs. This chapter explains that recipe, how we describe it with lambda, and how a carburettor tries to hold it across the whole throttle range.",
      "lab": "overview/?mode=4t&part=carb",
      "blocks": [
        {
          "type": "h3",
          "text": "The chemically correct mixture"
        },
        {
          "type": "p",
          "html": "A spark-ignition engine releases chemical energy by oxidising a hydrocarbon fuel with the oxygen in air. Petrol is a blend of several hundred hydrocarbons in the C4 to C12 range, with an average composition close to \\(\\mathrm{CH_{1.87}}\\) by atom count, so iso-octane (\\(\\mathrm{C_8H_{18}}\\)) is used as a convenient model compound. Complete combustion turns all the carbon into \\(\\mathrm{CO_2}\\) and all the hydrogen into water."
        },
        {
          "type": "eq",
          "id": "m3-iso-octane-combustion",
          "name": "Complete combustion of iso-octane",
          "tex": "\\mathrm{C_8H_{18}} + 12.5\\,\\mathrm{O_2} \\rightarrow 8\\,\\mathrm{CO_2} + 9\\,\\mathrm{H_2O}",
          "where": [
            [
              "\\mathrm{C_8H_{18}}",
              "iso-octane, the model compound for petrol",
              ""
            ],
            [
              "\\mathrm{O_2}",
              "oxygen from the air",
              ""
            ],
            [
              "\\mathrm{CO_2},\\ \\mathrm{H_2O}",
              "carbon dioxide and water, the products of complete combustion",
              ""
            ]
          ],
          "why": "It fixes how much oxygen, and therefore how much air, each gram of fuel needs, which is the starting point for every jetting and injection calculation.",
          "example": "One mole of fuel is \\(8 \\times 12 + 18 \\times 1 = 114\\ \\mathrm{g}\\) and needs \\(12.5 \\times 32 = 400\\ \\mathrm{g}\\) of oxygen."
        },
        {
          "type": "eq",
          "id": "m3-stoich-afr",
          "name": "Stoichiometric air-fuel ratio",
          "tex": "\\mathrm{AFR}_{st} = \\frac{m_{air}}{m_{fuel}} = \\frac{m_{O_2} / 0.232}{m_{fuel}}",
          "where": [
            [
              "\\mathrm{AFR}_{st}",
              "stoichiometric air-fuel ratio, by mass",
              "kg air per kg fuel"
            ],
            [
              "m_{O_2}",
              "mass of oxygen needed for complete combustion",
              "g"
            ],
            [
              "m_{fuel}",
              "mass of fuel burned",
              "g"
            ],
            [
              "0.232",
              "mass fraction of oxygen in dry air",
              ""
            ]
          ],
          "why": "It gives the chemically correct mixture for a fuel: 14.7:1 for pump petrol, lower for ethanol blends, and every mixture setting is judged against it.",
          "example": "For iso-octane \\(\\mathrm{AFR}_{st} = \\dfrac{400 / 0.232}{114} = \\dfrac{1724}{114} \\approx 15.1\\)."
        },
        {
          "type": "p",
          "html": "Real pump petrol contains aromatics and olefins with less hydrogen per carbon than iso-octane, which lowers the oxygen demand per kilogram: the accepted <strong>stoichiometric AFR for petrol is 14.7:1</strong> by mass. Oxygenates lower it further because the fuel carries some of its own oxygen. Ethanol is about 9.0:1, so E10 sits near 14.1:1 and E20 near 13.8:1."
        },
        {
          "type": "p",
          "html": "This is why a carburettor jetted for pure petrol runs measurably lean on E20, while a closed-loop injection system corrects the difference through its oxygen sensor. Older texts, including the MAVCC carburetion unit, quote AFR by weight in the form \"12:1\", meaning 12 kg of air for every kilogram of fuel."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Petrol stoich",
              "v": "14.7 : 1",
              "p": "kg of air per kg of fuel for complete combustion"
            },
            {
              "l": "E10 / E20",
              "v": "14.1 / 13.8",
              "p": "a carb jetted for petrol runs measurably lean on E20"
            },
            {
              "l": "Lambda",
              "v": "\\(\\mathrm{AFR}/14.7\\)",
              "p": "below 1 = rich, above 1 = lean, whatever the fuel"
            }
          ]
        },
        {
          "type": "p",
          "html": "Engineers prefer <strong>lambda (\\(\\lambda\\))</strong>, the ratio of actual AFR to stoichiometric AFR, because it means the same thing on any fuel: \\(\\lambda = 1\\) is chemically correct whether the tank holds petrol, E10 or E20."
        },
        {
          "type": "eq",
          "id": "m3-lambda",
          "name": "Lambda (excess-air ratio)",
          "tex": "\\lambda = \\frac{\\mathrm{AFR}}{\\mathrm{AFR}_{st}}",
          "where": [
            [
              "\\lambda",
              "lambda, the excess-air ratio",
              "none"
            ],
            [
              "\\mathrm{AFR}",
              "actual air-fuel ratio by mass",
              "kg/kg"
            ],
            [
              "\\mathrm{AFR}_{st}",
              "stoichiometric ratio of the fuel in use (14.7 for petrol)",
              "kg/kg"
            ]
          ],
          "why": "Below 1 the mixture is rich (excess fuel), above 1 it is lean (excess air). Wideband meters, oxygen sensors and ECU maps all work in lambda, so readings compare across fuels.",
          "example": "An engine at 13.2:1 on petrol runs at \\(\\lambda = 13.2 / 14.7 \\approx 0.90\\), rich and inside the best-power band."
        },
        {
          "type": "p",
          "html": "A worked case shows why fuel matters. A carburettor that delivers 14.1:1 runs at \\(\\lambda = 14.1 / 14.7 \\approx 0.96\\) on pure petrol. On E10 the same ratio gives \\(\\lambda = 14.1 / 14.1 = 1.0\\), about 4 % leaner, and a carburettor that was already jetted lean moves further towards the over-lean zone."
        },
        {
          "type": "figure",
          "fig": "afr",
          "caption": "Slide the air-fuel ratio from rich to lean and watch lambda, power and temperature change. Find the best-power band and the catalyst window at 14.7:1."
        },
        {
          "type": "h3",
          "text": "What each mixture is good for"
        },
        {
          "type": "p",
          "html": "Mixture strength is always a compromise between power, efficiency, temperature and emissions, and each operating condition favours a different value. An injection system can move between these targets every few milliseconds; a carburettor can only approximate them with fixed jets."
        },
        {
          "type": "table",
          "head": [
            "Lambda",
            "AFR (petrol)",
            "Typical use",
            "Consequence"
          ],
          "rows": [
            [
              "0.80&ndash;0.88",
              "11.8&ndash;12.9",
              "Full load, cold start",
              "Max power with charge cooling; high CO and HC; sooty plugs"
            ],
            [
              "0.88&ndash;0.95",
              "12.9&ndash;14.0",
              "Best-power region on most engines",
              "Fastest flame, highest torque"
            ],
            [
              "1.00",
              "14.7",
              "Idle and cruise with catalyst",
              "Only window where a three-way catalyst converts CO, HC and NOx together"
            ],
            [
              "1.05&ndash;1.15",
              "15.4&ndash;16.9",
              "Lean cruise, older open-loop engines",
              "Best economy, peak NOx, hotter combustion"
            ],
            [
              "above 1.3",
              "above 19",
              "Over-lean fault",
              "Misfire, surging, popping, hot exhaust valve and piston"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A rich mixture burns <em>cooler</em> because the surplus fuel absorbs heat as it evaporates and there is not enough oxygen to oxidise all of it; the price is high carbon monoxide, unburned hydrocarbons, carbon deposits and fouled plugs. A lean mixture burns <em>slower</em>, so combustion is still going when the exhaust valve opens and exhaust and head temperatures climb."
        },
        {
          "type": "p",
          "html": "On an air-cooled single like the K-Light 125 a <strong>persistently lean mixture</strong> leads to detonation, burned exhaust valves and piston seizure. The MAVCC text notes that a ratio near 12:1 gives more power than 14.7:1, which agrees with the best-power band in the table."
        },
        {
          "type": "photo",
          "src": "repair-photos/063_fuel_level_2.jpg",
          "caption": "Floats: two plastic, all metal, plastic and metal, all plastic",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Air density and altitude"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb: altitude",
          "html": "At 2000 m air is about 20 % less dense. A carburettor meters fuel by air <em>velocity</em>, not air mass, so it runs about 20 % richer up there. An injection system with MAP and intake-temperature sensors recalculates air mass and corrects itself."
        },
        {
          "type": "eq",
          "id": "m3-lambda-density",
          "name": "Carburettor mixture change with air density",
          "tex": "\\lambda_{2} \\approx \\lambda_{1} \\, \\frac{\\rho_{2}}{\\rho_{1}}",
          "where": [
            [
              "\\lambda_1",
              "lambda where the carburettor was jetted",
              "none"
            ],
            [
              "\\lambda_2",
              "lambda at the new altitude or temperature",
              "none"
            ],
            [
              "\\rho_1,\\ \\rho_2",
              "air density at the two conditions",
              "kg/m³"
            ]
          ],
          "why": "A carburettor keeps roughly the same fuel flow while the air mass falls with density, so the mixture richens in proportion; it explains why mountain riding needs smaller jets.",
          "example": "Jetted at \\(\\lambda = 0.95\\) at sea level, at 2000 m with 20 % less dense air: \\(\\lambda_2 \\approx 0.95 \\times 0.8 = 0.76\\), very rich."
        },
        {
          "type": "h3",
          "text": "Air intake and filter"
        },
        {
          "type": "p",
          "html": "Air enters through a snorkel or duct into the airbox, which has three jobs: it holds the filter, gives each intake pulse a calm plenum to draw from, and acts as a <strong>Helmholtz resonator</strong> that tunes the intake pressure wave and cuts intake noise to meet the type-approval sound limit. From the box a rubber boot leads to the carburettor or throttle body, then to the inlet port."
        },
        {
          "type": "table",
          "head": [
            "Element",
            "Where used",
            "Service"
          ],
          "rows": [
            [
              "Pleated paper (cellulose or synthetic)",
              "Most road machines",
              "Traps fine dust, needs no oil; replaced, typically every 12 000&ndash;18 000 km, far sooner on dusty roads"
            ],
            [
              "Oiled polyurethane foam, often two densities",
              "Off-road machines, many small commuters (the K-Light 125 lists a sponge type)",
              "Washed in solvent or detergent, dried, oiled with filter oil and squeezed out"
            ],
            [
              "Oiled cotton gauze",
              "Performance replacements",
              "Flows well but passes more fine dust"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A <strong>blocked filter</strong> raises the depression downstream of it. In a carburettor that depression pulls on every jet, so the engine runs <strong>rich at all openings</strong>; the K-Light fault tree lists a blocked air filter as the first check for an over-rich mixture. In a speed-density injection system the MAP sensor sees the lower pressure and the ECU cuts fuel, so the mixture stays near target and the symptom is <strong>loss of power</strong> instead."
        },
        {
          "type": "p",
          "html": "An <strong>air leak</strong> after the carburettor or throttle body (a split boot, a loose clamp, a cracked heat insulator) admits unmetered air and leans the mixture, mostly at idle where the metered flow is small. Practice: <a href=\"../repair/repairs/air-filter-service/\">air filter service</a> and <a href=\"../repair/repairs/intake-leak-test/\">intake leak test</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/075_carburetor_jets.jpg",
          "caption": "Carburettor cutaway with jets and passages labelled",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "model",
          "file": "air_filter",
          "caption": "A pleated-paper panel filter seated in the lower half of an airbox."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Open the <a href=\"../overview/?mode=4t&part=engine\">engine in the Overview</a>, set bore 57 mm and stroke 50 mm (the nearest settings to the K-Light 125) and run it at 1500 and then 9000 rpm. Work out how the time available for the 180° intake stroke falls from 20 ms to 3.3 ms. Then open the <a href=\"../overview/?mode=4t&part=air_filter\">air filter</a> and the <a href=\"../overview/?mode=4t&part=carb\">carburettor</a>, and on the <a href=\"../overview/?mode=4t&view=diagram\">course plate</a> trace the air path from the airbox through the throttle body to the inlet valve."
        },
        {
          "type": "h3",
          "text": "How a carburettor meters fuel"
        },
        {
          "type": "p",
          "html": "As the piston descends on the intake stroke, atmospheric pressure pushes air through the bore. At the venturi, or at the gap under the throttle slide, velocity rises and static pressure falls (<strong>the Bernoulli principle</strong>). The float bowl is vented to atmosphere, so atmospheric pressure pushes fuel up through calibrated jets into the low-pressure airstream. The throttle regulates air; the jets regulate fuel."
        },
        {
          "type": "p",
          "html": "The fuel leaves the nozzle as droplets (<strong>atomisation</strong>) and evaporates on the way to and inside the cylinder (<strong>vaporisation</strong>). The fundamental difficulty is that air and fuel do not respond to depression in the same way: air is compressible and its flow through the venturi follows a different curve from liquid fuel through a small orifice, so a single jet would give a mixture that richens as airflow rises."
        },
        {
          "type": "p",
          "html": "Carburettors therefore use several overlapping circuits, plus <strong>air bleeds</strong> that emulsify the fuel with air before it reaches the nozzle, to hold the mixture close to target across the throttle range."
        },
        {
          "type": "photo",
          "src": "repair-photos/075_jet_ranges_1.jpg",
          "caption": "Chart of the throttle range each jet controls",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Slide and constant-velocity carburettors"
        },
        {
          "type": "p",
          "html": "In a <strong>slide carburettor</strong> (Mikuni VM, Keihin PWK) the cable lifts the slide directly, so the rider sets the venturi size: instant response, which is why two-stroke off-road machines such as the Yamaha YZ125 use this type. Snap a large slide open at low rpm, though, and air velocity collapses, fuel stops being drawn and the engine bogs."
        },
        {
          "type": "p",
          "html": "In a <strong>constant-velocity (CV) carburettor</strong> (Keihin CVK, fitted to many commuters including Honda CG125 variants) the cable turns a butterfly downstream of a piston. The piston hangs from a rubber diaphragm whose upper chamber connects through a small hole to the venturi, while the lower chamber is vented to the air filter side. Opening the butterfly raises venturi depression, the diaphragm lifts the piston, and the venturi enlarges only as fast as the engine can use the air, so air speed across the needle jet stays roughly constant."
        },
        {
          "type": "p",
          "html": "A torn diaphragm or blocked piston vent hole leaves the piston down: the engine idles well but will not rev beyond a moderate speed under load, with no misfire. To confirm, remove the top cover, lift the piston by hand and check it falls smoothly, then hold the diaphragm up to a light to look for pinholes. The K-Light power-loss tree lists a damaged vacuum diaphragm of the plunger valve as a check."
        },
        {
          "type": "photo",
          "src": "repair-photos/063_carb_venturi.jpg",
          "caption": "Venturi, the narrow throat of a carburettor",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "model",
          "file": "carb",
          "caption": "The slide carburettor modelled in half section."
        },
        {
          "type": "photo",
          "src": "carburettor-fitting.jpg",
          "caption": "Refitting a constant-velocity carburettor between the intake rubber and the airbox on an air-cooled twin: the round diaphragm chamber sits on top, the pilot mixture screw and idle stop screw are on the side, and the float bowl is below."
        },
        {
          "type": "plate",
          "id": "PT01",
          "caption": "Slide carburettor in section: venturi, slide and needle, needle jet, main jet, pilot circuit and float bowl."
        },
        {
          "type": "h3",
          "text": "Circuits by throttle opening (not rpm)"
        },
        {
          "type": "photo",
          "src": "repair-photos/063_carb_jet_range.jpg",
          "caption": "Diagram showing which jet controls which throttle opening",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "table",
          "head": [
            "Throttle",
            "Dominant circuit",
            "Tuning part",
            "Change"
          ],
          "rows": [
            [
              "Closed to 1/8",
              "Pilot",
              "Pilot jet, fuel or air screw",
              "Larger pilot jet or fuel screw out: richer"
            ],
            [
              "1/8 to 1/4",
              "Transition",
              "Slide cutaway",
              "Higher cutaway: leaner"
            ],
            [
              "1/4 to 3/4",
              "Mid-range",
              "Needle taper and clip position",
              "Clip lowered (needle raised): richer"
            ],
            [
              "3/4 to full",
              "High-speed",
              "Main jet",
              "Larger number: richer"
            ],
            [
              "Cold start",
              "Enricher or choke",
              "Starter jet and plunger",
              "&lambda; around 0.5&ndash;0.7 for cranking"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The <strong>float circuit</strong> sits under all of them. A float on a pivot closes a tapered needle against its seat when fuel reaches a set height, so the head of fuel below the nozzles stays constant. Set too high, it enriches every circuit, and a sticking needle overflows the bowl through the overflow tube; set too low, it leans every circuit and causes high-speed surging."
        },
        {
          "type": "p",
          "html": "Float height is measured with the carburettor inverted, the float tang just resting on the needle, from the gasket face to the float bottom, against the manual figure. Practice: <a href=\"../repair/repairs/carb-float-check/\">carburettor float check</a>."
        },
        {
          "type": "p",
          "html": "The <strong>pilot circuit</strong> draws fuel through a small pilot jet (typically numbered 15&ndash;42 on Keihin and Mikuni), mixes it with air from a pilot air jet, and delivers it through an outlet downstream of the throttle and through by-pass holes just upstream of the closed throttle edge. A screw on the engine side of the slide is a <strong>fuel screw</strong> (out = richer); on the intake side it is an <strong>air screw</strong> (out = leaner). Many CV carburettors built since the 1980s have the fuel screw sealed with a plug for emissions reasons."
        },
        {
          "type": "p",
          "html": "The <strong>jet needle</strong> hangs from the slide or piston into the needle jet. Fuel flow through the annulus between them depends on needle diameter at the height reached, so the taper profile sets mid-range mixture; most needles have five clip grooves. The <strong>main jet</strong> is in series with all the fuel reaching the needle jet, and once the annulus area exceeds the main jet area (about 3/4 open) the main jet becomes the restriction."
        },
        {
          "type": "p",
          "html": "Mikuni hex main jet numbers are proportional to flow, while Keihin main jet numbers are roughly the orifice diameter in hundredths of a millimetre, so the same number does not mean the same size between brands."
        },
        {
          "type": "p",
          "html": "The <strong>enricher</strong> is a separate plunger circuit that draws fuel through a starter jet and discharges it downstream of the slide. It relies on the depression behind a closed throttle, so it works best with the throttle shut and is weakened by opening the throttle during a cold start. A <strong>choke plate</strong> upstream of the venturi enriches by raising venturi depression instead. Some CV carburettors add an <strong>accelerator pump</strong>, a throttle-linked diaphragm pump that squirts fuel into the bore on a snap opening to cover the lean stumble caused by fuel lag."
        },
        {
          "type": "h3",
          "text": "Jetting method"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Main jet first",
              "html": "Full-throttle runs, plug chop or wideband AFR reading."
            },
            {
              "title": "Then the needle",
              "html": "Clip position and taper for 1/4 to 3/4 throttle."
            },
            {
              "title": "Then the cutaway",
              "html": "The 1/8 to 1/4 transition."
            },
            {
              "title": "Finally pilot and screw",
              "html": "Idle and off-idle; confirm everything with a road test across the range."
            }
          ]
        },
        {
          "type": "p",
          "html": "Because the circuits overlap, the order of work matters: a change to the main jet shifts the top of the needle range, and a needle change shifts the transition. A change of altitude, a free-flowing exhaust or a different filter alters airflow at all openings, so jetting is always confirmed by a road test across the range, never at idle alone. Practice: <a href=\"../repair/repairs/carburettor-clean/\">carburettor clean</a> and <a href=\"../repair/repairs/carb-idle-adjust/\">idle adjustment</a>."
        },
        {
          "type": "p",
          "html": "Chapter 3.3 opens the carburettor circuit by circuit: the venturi physics, float bowl, pilot, slide, needle and main jet, cold-start devices, the constant-velocity design, cleaning and fault-finding."
        },
        {
          "type": "h3",
          "text": "Try it: the carburettor"
        },
        {
          "type": "animation",
          "part": "carb",
          "mode": "4t",
          "caption": "Hold GAS to open the throttle plate. Air speeds up through the venturi and pulls fuel from the jet; the graph shows air and fuel flow staying near 14.7 : 1."
        },
        {
          "type": "check",
          "q": "m3-01"
        },
        {
          "type": "h3",
          "text": "Synchronising and fuel delivery"
        },
        {
          "type": "p",
          "html": "A twin or four with one carburettor or throttle body per cylinder must open all throttles together, or one cylinder does more work than the others: vibration at low speed, rough idle and uneven plug colour, often with one header visibly cooler than the other at idle."
        },
        {
          "type": "p",
          "html": "<strong>Synchronisation (balancing)</strong> uses vacuum gauges, a mercury-free manometer or an electronic balancer on the vacuum port of each intake runner. With the engine at operating temperature and at the specified idle speed, adjust the linkage screws until all depressions agree within <strong>10&ndash;20 mmHg (1.3&ndash;2.7 kPa)</strong>, then reset idle. Injected engines use the throttle-body balance or by-pass screws, and some need the ECU in a service mode so the idle air control does not move during adjustment. A single like the K-Light needs no balancing."
        },
        {
          "type": "h3",
          "text": "Fuel tap, tank venting and fuel delivery"
        },
        {
          "type": "p",
          "html": "A gravity-fed carburettor engine draws from the tank through a <strong>fuel tap</strong> with a filter gauze on its standpipe. The ON pick-up stands higher than the RES pick-up, so when fuel falls below the ON pipe the engine starves and the rider switches to reserve, which typically leaves 1&ndash;3 litres."
        },
        {
          "type": "p",
          "html": "A <strong>vacuum-operated tap</strong> has a diaphragm connected to the intake manifold, so fuel flows only while the engine turns; a PRI position bypasses the diaphragm to fill an empty bowl. A split diaphragm lets fuel flow continuously, and if the float needle also leaks, petrol can fill the crankcase and dilute the oil: check the oil level and smell before starting a bike that has stood with this fault."
        },
        {
          "type": "p",
          "html": "The tank must breathe as fuel is drawn out, or a vacuum forms above the fuel and flow stops. Older caps have a simple vent hole; modern tanks are sealed and vent through a one-way valve and a rollover valve into the evaporative emission canister. A <strong>blocked vent</strong> lets the engine run for several kilometres, then starve and stop, and it restarts after the cap is opened with an audible hiss. On an injected bike the in-tank pump can even collapse a plastic tank slightly. Practice: <a href=\"../repair/repairs/tank-vent-check/\">tank vent check</a>, <a href=\"../repair/repairs/fuel-tap-line-check/\">fuel tap and line check</a>, <a href=\"../repair/repairs/drain-fuel/\">drain fuel</a>."
        },
        {
          "type": "p",
          "html": "Chapter 3.2 follows the whole supply in detail: the fuel itself, tank, vent, tap, hoses, filters, pump and level sender, with a flow-test job sheet and a fault table."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Fuel handling",
          "html": "Petrol vapour is heavier than air and ignites from a spark or hot exhaust. Drain bowls into a container, never onto a hot engine, work ventilated, and disconnect battery negative before opening a fuel line on an injected bike, whose line holds about 300 kPa."
        },
        {
          "type": "check",
          "q": "m3-03"
        },
        {
          "type": "h3",
          "text": "Mixture fault-finding"
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
              "Black smoke, sooty plug, rich at all openings",
              "Blocked air filter, float level high, enricher left on",
              "Filter, float height, enricher plunger seating"
            ],
            [
              "Surging and heat at half throttle, fine at full",
              "Lean mid-range",
              "Lower the needle clip one groove (needle up)"
            ],
            [
              "Idles well, will not rev under load, no misfire (CV)",
              "Torn diaphragm or blocked piston vent",
              "Lift piston by hand, check diaphragm against a light"
            ],
            [
              "Hunting idle, popping on overrun",
              "Air leak after the carburettor, pilot circuit lean",
              "Intake boots and clamps, pilot jet"
            ],
            [
              "Stops after 10&ndash;20 km, restarts with the cap open",
              "Blocked tank vent",
              "Run with cap loosened; clear vent or valve"
            ],
            [
              "Vibration at idle, one header cooler (twin)",
              "Throttles out of balance",
              "Vacuum gauges, 10&ndash;20 mmHg"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m3-31"
        },
        {
          "type": "check",
          "q": "m3-32"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Petrol needs 14.7 kg of air per kilogram for complete combustion; ethanol blends need less, so they run a petrol-jetted carburettor lean.<br>Lambda, \\(\\lambda = \\mathrm{AFR}/\\mathrm{AFR}_{st}\\), describes mixture on any fuel: below 1 rich, above 1 lean.<br>Rich burns cool but dirty; persistent lean overheats valves and pistons on an air-cooled single.<br>Carburettor circuits follow throttle opening, not rpm: pilot, cutaway, needle, main jet, with the float level under all of them.<br>A carburettor richens with altitude or a blocked filter; a speed-density EFI system loses power instead.<br>Jet main first, then needle, cutaway and pilot, and confirm with a road test across the range."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "OK8_r7Ge2k4",
              "title": "How to increase mileage of motorcycle | 70cc Air fuel ratio setting for best performance",
              "channel": "Technology Expert",
              "channel_url": "http://www.youtube.com/@TechnologyExpertAsif",
              "duration": "3:20",
              "role": "How-to",
              "note": "Set the idle mixture screw on a 70 cc carb; mileage claims are unverified, start from the manual setting."
            },
            {
              "id": "QOnHVExumjY",
              "title": "Bike or Scooter carburetor tuning for mileage, carburetor setting. TVS Jupiter, Wego. #carburetor",
              "channel": "AUTOBOT GEEKS E",
              "channel_url": "http://www.youtube.com/@autobotgeekse",
              "duration": "8:03",
              "role": "How-to",
              "note": "Set idle speed and mixture on a scooter carb (TVS Jupiter, Wego); mileage claims are unverified, values for those scooters."
            },
            {
              "id": "I_uH72wDTL0",
              "title": "S&S Cycle - Carb Jetting and Tuning - S&S Super E & G Carburetor",
              "channel": "S&S Cycle, Inc",
              "channel_url": "http://www.youtube.com/@SSCycleInc",
              "duration": "17:31",
              "role": "How-to",
              "note": "Maker guide to jetting S&S carbs; jet sizes are for those carbs only, but the method transfers."
            }
          ]
        }
      ]
    },
    {
      "id": "m3-fuel-supply",
      "title": "Fuel supply: tank, tap, pump and filter",
      "lead": "Before any carburettor or injector can meter fuel, the fuel has to reach it: clean, free of water and at a steady head or pressure. This chapter follows petrol from the tank through the vent, tap, hose, filter and pump, and shows how each part fails.",
      "blocks": [
        {
          "type": "h3",
          "text": "What the fuel supply has to do"
        },
        {
          "type": "p",
          "html": "Every litre of petrol a motorcycle burns passes through the same short chain: tank, outlet, filter, hose, and then a carburettor float bowl or an injector. The chain has four jobs. It must store fuel safely, let air in as fuel leaves, keep dirt and water away from the metering parts, and deliver fuel at a steady head or pressure whatever the throttle, the lean angle or the fuel level."
        },
        {
          "type": "p",
          "html": "Two layouts cover almost every machine. A <strong>gravity-fed</strong> system, used with carburettors, places the tank above the carburettor and lets the weight of the fuel push it through a tap and hose into the float bowl. A <strong>pumped</strong> system, used with fuel injection, places an electric pump in the tank and drives fuel to the injector at a regulated pressure. Carburetted machines with the tank under the seat, below the carburettor, also need an electric or vacuum-driven pump to lift the fuel."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "K-Light tank",
              "v": "11.8 &plusmn; 0.5 L",
              "p": "unleaded petrol, 92 or 95 octane"
            },
            {
              "l": "Injector supply",
              "v": "300 kPa",
              "p": "at idle; below 270 kPa is a fault"
            },
            {
              "l": "Pump prime",
              "v": "about 3 s",
              "p": "at key-on, then only while the crank turns"
            }
          ]
        },
        {
          "type": "table",
          "head": [
            "",
            "Gravity feed (carburettor)",
            "Pumped (fuel injection)"
          ],
          "rows": [
            [
              "Parts in the tank",
              "Tap with ON and reserve pick-up tubes and strainers",
              "Pump module: motor, impeller, strainer sock, regulator, often the filter"
            ],
            [
              "Pressure at the outlet",
              "A head of fuel: a few kilopascals at most",
              "Regulated, about 300 kPa on the K-Light 125"
            ],
            [
              "Shut-off when parked",
              "Manual tap, or a vacuum tap that closes when the engine stops",
              "Pump stops unless the ECU sees crankshaft pulses"
            ],
            [
              "Typical faults",
              "Blocked vent or strainer, split vacuum diaphragm, kinked hose",
              "Pump, relay or wiring fault, blocked filter, low pressure"
            ],
            [
              "Opened at home?",
              "Yes, with care",
              "Hoses inspected only; pressure work is for a workshop"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "The fuel itself"
        },
        {
          "type": "p",
          "html": "Petrol is a blend of several hundred hydrocarbons, and it does not keep for ever. Its lighter parts evaporate and the rest oxidises into gum and varnish, which block the small passages of a carburettor first. A small quantity, such as the fuel left in a float bowl, goes stale far faster than a full tank, which is why a machine that stands for a season so often refuses to idle afterwards."
        },
        {
          "type": "p",
          "html": "The cure is prevention: a fuel stabiliser added to the tank before storage, used as its maker directs, and fresh fuel once a year on a machine that is rarely used. Stale fuel is drained, not burned off: see <a href=\"../repair/repairs/drain-fuel/\">Drain old or contaminated fuel</a> and <a href=\"../repair/repairs/fuel-stabiliser-use/\">Use a fuel stabiliser</a>."
        },
        {
          "type": "p",
          "html": "The <strong>octane rating</strong> measures resistance to knock: the higher the number, the harder the mixture is to ignite by compression heat and hot spots before the spark. Use the grade the manufacturer specifies; the K-Light 125 manual calls for good unleaded 92 or 95. A higher grade than specified gives no extra power, but a lower one can make a high-compression engine pink under load, and persistent pinking damages the piston."
        },
        {
          "type": "p",
          "html": "<strong>Ethanol blends</strong> (E10, E20) carry some of their own oxygen, so their stoichiometric ratio is lower (chapter 3.1) and a carburettor jetted for petrol runs lean on them. Ethanol also absorbs water and attacks some older rubber parts, carburettor bodies and fibreglass tanks. A machine built for E20, as Bharat Stage VI machines are, handles it through closed-loop fuel trims."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Petrol safety",
          "html": "Never wash hands or parts in petrol: static from clothing can ignite the vapour. Petrol vapour is heavier than air, flows along the floor to a pilot light or grinder, and a small cupful holds a great deal of energy. Work outdoors or in good ventilation, keep an ABC dry-powder extinguisher within reach, catch fuel in a proper container and wipe spills at once."
        },
        {
          "type": "h3",
          "text": "The tank"
        },
        {
          "type": "p",
          "html": "Tanks are made of steel, plastic or, on some older off-road machines, fibreglass. <strong>Steel</strong> is strong and repairable but rusts inside when water sits in it, and rust flakes then block strainers, jets and pumps. <strong>Plastic</strong> does not rust but becomes brittle and cracks with age and sunlight; plastic tank glues are not trusted for fuel. <strong>Fibreglass</strong> may not tolerate ethanol blends."
        },
        {
          "type": "photo",
          "src": "repair-photos/062_steel_gas_tank_yamaha_plastic_gas.jpg",
          "caption": "A painted fibreglass tank on an older off-road machine",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "The tank sits on rubber mounts that isolate it from vibration and is held by a bolt or strap; the K-Light 125 tank mounting screw is tightened to 10 to 12 N&middot;m. On most machines the tank sits on the frame above the engine, which puts its mass high. Some machines carry the tank under the seat to lower the centre of gravity, and then need a pump. Older machines and some with two-piece tanks join the halves with a <strong>crossover tube</strong>, which must be drained before the tank can be lifted off."
        },
        {
          "type": "photo",
          "src": "repair-photos/062_some_crossover_tubes_front_gas_tank.jpg",
          "caption": "A crossover tube joining the two halves of a tank at the front",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "model",
          "file": "fuel_tank",
          "caption": "A steel teardrop fuel tank: filler and cap on top, tap or pump opening underneath."
        },
        {
          "type": "p",
          "html": "Capacity sets range. A fill-to-fill test, the only reliable way to measure consumption, gives a figure that can be compared before and after a repair, or between two machines of the same model: see <a href=\"../repair/repairs/fuel-economy-test/\">Measure fuel consumption</a>."
        },
        {
          "type": "eq",
          "id": "m3-fuel-consumption",
          "name": "Fuel consumption and range",
          "tex": "\\mathrm{FC} = \\frac{V}{d} \\times 100 \\qquad R = \\frac{V_{tank}}{\\mathrm{FC}} \\times 100",
          "where": [
            [
              "\\mathrm{FC}",
              "fuel consumption",
              "L/100 km"
            ],
            [
              "V",
              "fuel added at the second fill",
              "L"
            ],
            [
              "d",
              "distance between the two fills",
              "km"
            ],
            [
              "R",
              "range on a full tank",
              "km"
            ],
            [
              "V_{tank}",
              "usable tank capacity",
              "L"
            ]
          ],
          "why": "A fill-to-fill test turns a rider's impression of a thirsty bike into a number. A large, steady rise with unchanged riding points to a fault such as a dragging brake, a blocked air filter or a leaking float needle.",
          "example": "For example, 4.0 L added after 180 km gives \\(\\mathrm{FC} = 4.0/180 \\times 100 \\approx 2.2\\ \\mathrm{L/100\\,km}\\), or 45 km/L. At that rate the K-Light's 11.8 L would last about \\(11.8/2.2 \\times 100 \\approx 536\\ \\mathrm{km}\\), less the fuel below the pick-up."
        },
        {
          "type": "h3",
          "text": "Head of fuel in a gravity system"
        },
        {
          "type": "p",
          "html": "In a gravity system the only force driving fuel to the carburettor is the weight of the fuel standing above it. That pressure is small, which explains why a gravity system is so easily stopped by a partly blocked vent, strainer or hose."
        },
        {
          "type": "eq",
          "id": "m3-fuel-head",
          "name": "Pressure from a head of fuel",
          "tex": "p = \\rho\\, g\\, h",
          "where": [
            [
              "p",
              "pressure at the outlet above that in the float bowl",
              "Pa"
            ],
            [
              "\\rho",
              "fuel density (petrol typically about 740)",
              "kg/m³"
            ],
            [
              "g",
              "gravitational acceleration, 9.81",
              "m/s²"
            ],
            [
              "h",
              "height of the fuel surface above the float bowl",
              "m"
            ]
          ],
          "why": "Shows how little pressure pushes fuel to a carburettor, and therefore how small a vacuum in a sealed tank is enough to stop the flow.",
          "example": "With the fuel surface 0.3 m above the bowl, \\(p = 740 \\times 9.81 \\times 0.3 \\approx 2.2\\ \\mathrm{kPa}\\). An injection pump delivers about 300 kPa, more than 100 times as much. A tank vacuum of about 2 kPa therefore stops a gravity feed completely."
        },
        {
          "type": "h3",
          "text": "Venting, the rollover valve and the canister"
        },
        {
          "type": "p",
          "html": "As fuel leaves, air must enter to take its place, or a vacuum forms above the fuel. Once that vacuum equals the head of fuel, flow stops. Older caps carry a simple vent hole; others carry a one-way valve, and tanks built for evaporative emission control are sealed and vent through a pipe, a <strong>rollover valve</strong> that closes if the machine falls over, and an activated-charcoal canister (chapter 3.4)."
        },
        {
          "type": "p",
          "html": "A blocked vent gives a fault with a clear pattern: the engine runs normally for several kilometres, loses power and stops, then restarts after the cap is opened with an audible hiss of air. Never block a vent to stop a smell or a weep of fuel; a tank with no vent starves the engine, and an injection pump can even pull a plastic tank slightly out of shape. The check is <a href=\"../repair/repairs/tank-vent-check/\">Check the fuel tank vent</a>."
        },
        {
          "type": "h3",
          "text": "The fuel tap"
        },
        {
          "type": "p",
          "html": "A carburetted machine draws fuel through a <strong>fuel tap</strong> (petcock) under the tank. A <strong>manual tap</strong> has OFF, ON and RES. The ON pick-up tube stands higher in the tank than the reserve pick-up, so when the level falls below the ON tube the engine starves and the rider turns to RES, which typically leaves 1 to 3 litres. Racing taps have only ON and OFF."
        },
        {
          "type": "p",
          "html": "A <strong>vacuum-operated tap</strong> has a diaphragm connected by a thin hose to the intake, so fuel flows only while the engine turns. Its positions are ON (sometimes MAIN), RES and PRI. PRI by-passes the diaphragm to refill a drained float bowl, and the lever must go back to ON afterwards, or fuel flows with the engine stopped."
        },
        {
          "type": "photo",
          "src": "repair-photos/062_res_pri.jpg",
          "caption": "A vacuum tap with ON, RES and PRI positions",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Most taps carry at least one fine wire screen: on each pick-up tube in the tank, inside the tap body, or in a sediment bowl. A tap held together with small screws can often be opened and its diaphragm renewed; a riveted tap is replaced. A tap that flows but will no longer shut off can be backed up with an <a href=\"../repair/repairs/inline-fuel-valve-fit/\">inline shut-off valve</a> in the hose."
        },
        {
          "type": "photo",
          "src": "repair-photos/062_fine_wire_filter_screens.jpg",
          "caption": "Fuel tap strainers: the in-tank screen on the pick-up tube and the screen in the tap body",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A vacuum tap with a split diaphragm lets fuel flow with the engine stopped. If the float needle also leaks, fuel overflows into the intake and can fill the crankcase, diluting the oil: a full tank in the evening that is half empty in the morning is a reason to check the oil level and smell the oil. The test is <a href=\"../repair/repairs/vacuum-fuel-tap-check/\">Check a vacuum fuel tap and use the prime position</a>."
        },
        {
          "type": "h3",
          "text": "Job sheet: fuel flow test (carburettor)"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Prepare",
              "html": "Engine and exhaust cold, outdoors, extinguisher at hand, safety glasses on. Have a clean glass jar and a fuel can ready."
            },
            {
              "title": "Inspect",
              "html": "Follow every hose with a torch. Replace any hose that is cracked, hard, swollen, sticky or kinked; check every clip and joint is dry."
            },
            {
              "title": "Flow on ON",
              "html": "Tap OFF, hose off the carburettor and into the jar. Turn to ON: fuel should run in a steady stream. On a vacuum tap use PRI, or apply vacuum to the diaphragm."
            },
            {
              "title": "Flow on RES",
              "html": "Turn to RES; it should also flow. Turn OFF and look at the jar for water drops or grit at the bottom."
            },
            {
              "title": "Vent check",
              "html": "If flow is weak on both, open the filler cap and test again. Better flow with the cap open means a blocked vent."
            },
            {
              "title": "Strainer check",
              "html": "Still weak: drain the tank, remove the tap, clean its screens from the inside out, and fit a new seal or O-ring."
            },
            {
              "title": "Refit",
              "html": "Refit the hose and clip, turn ON and check every joint for drips for five minutes before starting."
            }
          ]
        },
        {
          "type": "p",
          "html": "The full procedure, with what to do if it does not cure the fault, is <a href=\"../repair/repairs/fuel-tap-line-check/\">Check the fuel tap, lines and flow</a>."
        },
        {
          "type": "h3",
          "text": "Hoses and clips"
        },
        {
          "type": "p",
          "html": "Fuel hose must carry petrol without leaking, kinking or softening near the engine. Rubber hardens and cracks with heat and fuel, faster with ethanol blends, and can shed fragments from inside that block jets. Match the inside diameter to the spigot: a hose that is too large leaks and one that is too small splits. Use hose marked for fuel, and never clear plastic tubing, which hardens and cracks."
        },
        {
          "type": "p",
          "html": "Route hoses away from the exhaust and sharp edges, and push each one fully onto its spigot with a clip, as the K-Light manual advises. A hose or carburettor close to a hot engine in hot weather can boil the fuel in it, a <strong>vapour lock</strong> that stalls the engine until it cools. Injection hoses are reinforced for system pressure and use quick connectors; they are inspected from outside, not opened at home."
        },
        {
          "type": "h3",
          "text": "Filters"
        },
        {
          "type": "p",
          "html": "Fine dirt blocks carburettor jets and sticks injector needles, so every system filters fuel at least once. A carburetted machine relies on the tap screens and, on many machines, a small see-through inline filter. An injected machine has a strainer sock on the pump and a fine filter, often inside the pump module; the K-Light 125 has its petrol filter in the tank assembly."
        },
        {
          "type": "p",
          "html": "A filling filter shows itself as a machine that idles well but starves at full throttle or uphill, where flow demand is highest. The K-Light schedule inspects the petrol filter at 300 km and 6000 km and replaces it at 12 000 km, and the filter is also changed at once whenever rust or dirt has been found in the tank. Fit a new filter with its arrow towards the engine; on an injected machine use only a filter rated for system pressure, because a carburettor filter can burst. See <a href=\"../repair/repairs/fuel-filter-replace/\">Replace the fuel filter</a>."
        },
        {
          "type": "h3",
          "text": "The electric fuel pump"
        },
        {
          "type": "p",
          "html": "On an injected machine the <strong>pump module</strong> sits in the bottom of the tank, submerged so that fuel cools the motor. A small permanent-magnet motor drives an impeller that draws through the strainer sock; a regulator in the module holds the pressure and spills the excess back into the tank, so a single hose runs to the injector (chapter 3.4)."
        },
        {
          "type": "p",
          "html": "At key-on the ECU runs the pump for about 3 seconds to prime the line, then stops it unless it sees crankshaft pulses, so a broken line after a crash is not pumped dry. Running the tank very low makes the pump draw air and run hot, and rust from the tank wears it and blocks its strainer. On the K-Light the module is fitted with its regulator facing the rear and its bolts are tightened evenly in sequence to 3 to 4 N&middot;m."
        },
        {
          "type": "table",
          "head": [
            "K-Light 125 item",
            "Value"
          ],
          "rows": [
            [
              "Tank capacity",
              "11.8 &plusmn; 0.5 L"
            ],
            [
              "Fuel",
              "Unleaded, 92 or 95 octane"
            ],
            [
              "Tank mounting screw",
              "10 to 12 N&middot;m"
            ],
            [
              "Pump prime at key-on",
              "about 3 s"
            ],
            [
              "Supply at the pump connector",
              "12 &plusmn; 2 V during prime and cranking"
            ],
            [
              "Fuel pressure at idle",
              "about 300 kPa; below 270 kPa is a fault"
            ],
            [
              "Pump module bolts",
              "3 to 4 N&middot;m, in sequence"
            ],
            [
              "Fuel level sender nut",
              "5 to 9 N&middot;m"
            ],
            [
              "Petrol filter",
              "inspect at 300 km and 6000 km, replace at 12 000 km"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The home check is limited to the prime buzz, the fuse and relay and the supply at the connector: <a href=\"../repair/repairs/fuel-pump-check/\">Check the fuel pump</a>. Pressure testing needs a 0 to 600 kPa gauge and the model's procedure, and residual pressure must be relieved before any line is opened."
        },
        {
          "type": "h3",
          "text": "The fuel level sender"
        },
        {
          "type": "p",
          "html": "The <strong>fuel level sender</strong> is a float on an arm that moves a wiper along a resistor track; the gauge reads the change in resistance. Some machines have only a low-fuel warning lamp switched by a sensor near the bottom of the tank. On many injected machines the sender is part of the pump module; on the K-Light 125 it is a separate unit held by a nut with a rubber washer."
        },
        {
          "type": "p",
          "html": "A worn track or dirty wiper makes the reading jump or stick, and a float with fuel inside reads low for ever. Check the plug and wiring before blaming the sender, and match a replacement exactly, because senders differ in arm length and resistance range: see <a href=\"../repair/repairs/fuel-sender-test/\">Test the fuel level sender</a>."
        },
        {
          "type": "h3",
          "text": "Water, rust and dirt"
        },
        {
          "type": "p",
          "html": "Water is heavier than petrol, so it collects at the bottom of the tank and the float bowl and reaches the engine first. It comes from rain past a hard cap seal, from condensation in a half-empty tank standing in changing temperatures, and from poor fuel. It makes an engine cough, stall or refuse to start."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Sample",
              "html": "Tap OFF; drain a good amount from the bowl drain or tap outlet into a clear glass jar."
            },
            {
              "title": "Look",
              "html": "Let it stand a minute against the light. Water forms clear drops or a layer under the petrol; rust and dirt show as grit."
            },
            {
              "title": "Rag test",
              "html": "Drip fuel on a cotton rag: petrol soaks in, water beads on the surface."
            },
            {
              "title": "Clean",
              "html": "If water is present, drain tank and line, clean the carburettor or change the filter, and refill with fresh fuel."
            },
            {
              "title": "Cure the cause",
              "html": "Find how the water entered: cap seal, cap lock, storage habits or the fuel source."
            }
          ]
        },
        {
          "type": "p",
          "html": "The test is <a href=\"../repair/repairs/fuel-water-test/\">Test fuel for water</a>. Light rust inside a steel tank can be loosened, flushed out and treated (<a href=\"../repair/repairs/tank-rust-treat/\">Remove rust from a fuel tank</a>), and a see-through inline filter then protects the carburettor and is changed when it fills. A pinhole means the metal is rusted through from inside and the tank is normally replaced. Tank coatings give mixed results and can peel off later."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Never heat a fuel tank",
          "html": "Never weld, braze or solder a fuel tank at home. An &ldquo;empty&rdquo; tank holds vapour that explodes when heated, and filling it with water does not make it safe. Repairs by heat are left to a specialist who purges the tank with an inert gas; small leaks can be sealed temporarily with an epoxy made for fuel tanks. See <a href=\"../repair/repairs/fuel-tank-leak-repair/\">Repair a leaking fuel tank</a> and <a href=\"../repair/repairs/fuel-tank-remove/\">Remove and refit a fuel tank safely</a>."
        },
        {
          "type": "h3",
          "text": "Fault-finding the supply"
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
              "Stops after several kilometres, restarts after the cap is opened",
              "Blocked vent, cap valve or canister",
              "Hiss when the cap opens; <a href=\"../repair/repairs/tank-vent-check/\">vent check</a>"
            ],
            [
              "Runs on RES but starves on ON with fuel above reserve",
              "Blocked ON pick-up or its screen",
              "Drain tank, clean tap screens"
            ],
            [
              "Weak flow on ON and RES",
              "Blocked strainer or inline filter, kinked hose",
              "Flow test into a jar"
            ],
            [
              "Fuel flows with the engine stopped",
              "Split vacuum-tap diaphragm or lever left on PRI",
              "Fuel in the vacuum hose; lever position"
            ],
            [
              "Engine coughs and stalls after rain or storage",
              "Water in the fuel",
              "Jar and rag test"
            ],
            [
              "Stalls in hot weather, restarts once cool",
              "Vapour lock in a hose near the engine",
              "Hose routing, heat shields"
            ],
            [
              "No pump buzz at key-on (injection)",
              "Fuse, relay, wiring or pump",
              "12 &plusmn; 2 V at the connector in the first 3 s"
            ],
            [
              "Gauge wrong or stuck",
              "Sender float, track or wiring",
              "<a href=\"../repair/repairs/fuel-sender-test/\">Sender test</a>"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Starvation that appears only at full throttle or uphill points to a restriction: filter, strainer or vent. Starvation that appears after a set distance points to the vent. The symptom pages <a href=\"../repair/problems/fuel-starvation/\">Engine stops and only runs on reserve</a> and <a href=\"../repair/problems/tank-vacuum/\">Engine stops and the cap hisses</a> take each case step by step, and chapter 3.6 puts these checks into a complete diagnosis."
        },
        {
          "type": "check",
          "q": "m3-51"
        },
        {
          "type": "check",
          "q": "m3-52"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "A gravity feed relies on a head of fuel of only a few kilopascals, so a blocked vent, strainer or hose stops it easily; an injection pump supplies about 300 kPa.<br>The tank must breathe: a blocked vent stops the engine after a few kilometres, and opening the cap releases a hiss and cures it.<br>A manual tap has OFF, ON and RES; a vacuum tap has ON, RES and PRI and must not be left on PRI.<br>Filters sit in the tap, in the hose and in the pump module; a filling filter starves the engine first at full throttle and uphill.<br>Water sinks to the bottom of the tank and bowl, and stale fuel turns to varnish; test with a jar, drain, and use a stabiliser for storage.<br>Never open an injection line before relieving pressure, and never heat a fuel tank."
        }
      ]
    },
    {
      "id": "m3-carburettor",
      "title": "Carburettors",
      "lead": "A carburettor meters fuel with nothing but air speed, calibrated holes and a float. This chapter opens it up circuit by circuit: the physics of the venturi, the float bowl, pilot, slide, needle and main jet, cold-start devices and the constant-velocity design, then how to clean, set and diagnose one.",
      "blocks": [
        {
          "type": "h3",
          "text": "What a carburettor has to do"
        },
        {
          "type": "p",
          "html": "Chapter 3.1 showed the principle: air speeding through a restriction loses pressure, and atmospheric pressure on the float bowl pushes fuel into the low-pressure stream. This chapter looks inside the instrument itself, circuit by circuit, and then at how it is cleaned, set and diagnosed. Most carburetted commuters in use today carry a slide or constant-velocity carburettor with a float bowl underneath; the K-Light 125 itself is injected and uses a throttle body instead (chapter 3.4)."
        },
        {
          "type": "p",
          "html": "A carburettor has three tasks. It must <strong>meter</strong> fuel in proportion to the air the engine draws, <strong>atomise</strong> it into fine droplets that evaporate before ignition, and <strong>control</strong> the quantity of mixture through the throttle. It does all three with no electronics and no feedback, using nothing but pressure differences, calibrated holes and a float."
        },
        {
          "type": "h3",
          "text": "The physics of the venturi"
        },
        {
          "type": "p",
          "html": "The engine draws a fixed volume of air for each intake stroke. Where the bore narrows, the same flow has to pass through a smaller area, so the air must speed up. Faster air has lower static pressure, and that pressure drop is the signal that draws fuel."
        },
        {
          "type": "eq",
          "id": "m3-continuity",
          "name": "Continuity of flow through a venturi",
          "tex": "A_1\\, v_1 = A_2\\, v_2",
          "where": [
            [
              "A_1",
              "cross-section area at the intake bell",
              "m²"
            ],
            [
              "v_1",
              "air speed at the bell",
              "m/s"
            ],
            [
              "A_2",
              "cross-section area at the venturi throat or under the slide",
              "m²"
            ],
            [
              "v_2",
              "air speed in the throat",
              "m/s"
            ]
          ],
          "why": "Explains why the air speeds up where a carburettor narrows, and why a slide carburettor opened too far at low engine speed loses its signal: a larger area means a slower stream.",
          "example": "If the throat has half the area of the bell, \\(v_2 = v_1 \\times A_1/A_2 = 2\\,v_1\\): air entering at 40 m/s crosses the throat at about 80 m/s. Treating air as incompressible is a fair approximation at these speeds."
        },
        {
          "type": "eq",
          "id": "m3-bernoulli",
          "name": "Venturi pressure drop (Bernoulli)",
          "tex": "\\Delta p = \\tfrac{1}{2}\\,\\rho_{air} \\left( v_2^2 - v_1^2 \\right)",
          "where": [
            [
              "\\Delta p",
              "fall in static pressure from bell to throat",
              "Pa"
            ],
            [
              "\\rho_{air}",
              "air density",
              "kg/m³"
            ],
            [
              "v_1",
              "air speed at the bell",
              "m/s"
            ],
            [
              "v_2",
              "air speed in the throat",
              "m/s"
            ]
          ],
          "why": "The depression at the fuel nozzle grows with the square of air speed. This is the signal every carburettor circuit relies on, and it is why a carburettor meters by air speed rather than by air mass.",
          "example": "With \\(\\rho_{air} = 1.2\\ \\mathrm{kg/m^3}\\), \\(v_1 = 40\\ \\mathrm{m/s}\\) and \\(v_2 = 80\\ \\mathrm{m/s}\\): \\(\\Delta p = 0.5 \\times 1.2 \\times (6400 - 1600) \\approx 2.9\\ \\mathrm{kPa}\\). Doubling the throat speed multiplies the depression by four."
        },
        {
          "type": "p",
          "html": "Before any fuel flows, the depression must first lift the fuel from the float-bowl level to the nozzle exit, a head given by \\(\\rho g h\\) as in chapter 3.2. With petrol standing 5 mm below the nozzle that is only \\(740 \\times 9.81 \\times 0.005 \\approx 36\\ \\mathrm{Pa}\\), but at idle the whole signal is small, so float height matters most at small openings."
        },
        {
          "type": "eq",
          "id": "m3-jet-flow",
          "name": "Fuel flow through a jet",
          "tex": "\\dot m_{f} = C_d\\, A_j \\sqrt{2\\,\\rho_f\\, \\Delta p_j}",
          "where": [
            [
              "\\dot m_{f}",
              "fuel mass flow through the jet",
              "kg/s"
            ],
            [
              "C_d",
              "discharge coefficient of the orifice (below 1)",
              "-"
            ],
            [
              "A_j",
              "jet orifice area",
              "m²"
            ],
            [
              "\\rho_f",
              "fuel density",
              "kg/m³"
            ],
            [
              "\\Delta p_j",
              "pressure difference across the jet (venturi depression less the fuel head)",
              "Pa"
            ]
          ],
          "why": "Shows why a jet change is a coarse tool: flow rises with the orifice area but only with the square root of the depression. Comparing it with the venturi equation shows why one jet alone cannot hold the mixture constant.",
          "example": "Doubling the depression raises jet flow by \\(\\sqrt{2} \\approx 1.41\\), and a jet 10 % larger in diameter has \\(1.1^2 = 1.21\\) times the area, so it flows about 21 % more fuel at the same signal."
        },
        {
          "type": "p",
          "html": "Since depression grows with the square of air speed and fuel flow with its square root, fuel flow ideally rises in step with air speed. In practice the fuel head offsets the start of flow, air density falls slightly in the throat at high flow, and fuel droplets lag behind the air. A plain jet therefore gives a mixture that is lean at low flow and richens as flow rises. Real carburettors correct this with <strong>air bleeds</strong>, which emulsify the fuel with air before it reaches the nozzle, and with several overlapping circuits."
        },
        {
          "type": "photo",
          "src": "repair-photos/068_throttle_slide_cutaway.jpg",
          "caption": "A slide carburettor sectioned through the slide, jet needle and needle jet",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "The float bowl"
        },
        {
          "type": "p",
          "html": "Every circuit draws from the float bowl, so its fuel level is the reference for all of them. A float on a pivot pin presses a tapered <strong>float needle</strong> (fuel inlet valve) into its seat when the fuel reaches the set height. As fuel is used the float drops and the needle opens. A level that is too high takes less depression to lift fuel and richens every circuit; one that is too low leans every circuit."
        },
        {
          "type": "p",
          "html": "Floats are made of metal (brass), plastic or both, as one piece or two linked pieces; two-piece floats help hold the level when accelerating, braking and cornering. A metal <strong>tang</strong> presses on the needle and is bent very slightly to set the height. All-plastic floats are normally not adjustable, so a wrong height means a worn needle or the wrong float. Needle tips are steel or rubber; a ring or groove worn into the tapered face means the needle no longer seals and is replaced together with its seat."
        },
        {
          "type": "photo",
          "src": "repair-photos/072_one_piece_float_two_piece_float.jpg",
          "caption": "Brass floats with the tang that presses on the float needle",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Float height is measured with the carburettor inverted, the tang just resting on the needle without compressing its spring, from the gasket face to the float, with or without the gasket as the manual specifies. There is no universal value. An overflow tube at the bottom of the bowl drains any excess; a bowl that overflows when the tap is turned on has a needle held open by dirt, a worn needle or a sinking float. A light tap on the bowl with a plastic handle sometimes frees dirt from the seat."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Fuel in the crankcase",
          "html": "If a float needle sticks open with the tap on, the bowl overflows into the intake and fuel can run into the crankcase. On a four-stroke it thins the oil until bearings fail; on a two-stroke it can fill the crankcase and lock the engine hydraulically. Turn the tap off whenever the machine stands, and after any overflow check the oil level and smell before starting."
        },
        {
          "type": "h3",
          "text": "The pilot (idle) circuit in detail"
        },
        {
          "type": "p",
          "html": "At idle the throttle is almost shut and there is little air speed in the venturi, but a strong depression behind the throttle. The pilot circuit uses that depression. Fuel passes the <strong>pilot jet</strong>, mixes with air from a pilot air jet or a passage from the intake bell, and leaves through a small <strong>idle port</strong> downstream of the throttle. As the throttle opens it uncovers one or more <strong>by-pass ports</strong> just upstream of its edge, which feed extra mixture through the transition. Slide carburettors commonly have two; some constant-velocity carburettors have three."
        },
        {
          "type": "photo",
          "src": "repair-photos/067_three_idle_ports.jpg",
          "caption": "Idle ports in the bore of a constant-velocity carburettor, beside the closed throttle butterfly",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "The adjusting screw tells which design is fitted. A screw on the intake side of the slide meters the air into the pilot circuit: it is an <strong>air screw</strong>, and turning it out leans the mixture. A screw on the engine side meters the emulsified fuel: it is a <strong>fuel (mixture) screw</strong>, and turning it out richens. The air screw is the coarser adjustment of the two. Many carburettors built for emission limits have the fuel screw sealed under a plug, and removing it may be illegal on a road machine."
        },
        {
          "type": "p",
          "html": "Pilot jets mostly screw in, but some are pressed in and cannot be removed. They are the smallest jets in the carburettor and the first to block with varnish after storage, giving the classic symptom: the engine starts and runs only with the choke on, and stalls when it is pushed off. The <a href=\"../repair/repairs/idle-jet-change/\">idle jet</a> and <a href=\"../repair/repairs/idle-screw-set/\">idle screws</a> repair pages cover changing and setting them."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Warm up",
              "html": "Run the engine to normal temperature; cold or overheated engines run unevenly."
            },
            {
              "title": "Set idle speed",
              "html": "Use the throttle stop screw to bring the idle to the specified speed."
            },
            {
              "title": "Find the best mixture",
              "html": "Turn the air or fuel screw slowly in until the idle falls or stumbles, then out until it falls again, and set it between the two, or at the point of fastest, smoothest idle."
            },
            {
              "title": "Reset idle speed",
              "html": "Lower the idle again with the stop screw and repeat the mixture search once."
            },
            {
              "title": "Confirm",
              "html": "Blip the throttle: the engine should return cleanly to idle without hanging or dying."
            }
          ]
        },
        {
          "type": "p",
          "html": "If the manual setting is lost, count the turns to seat the screw lightly before removing it, and refit it to the same count. If the idle hangs high and then dies, look for an intake air leak before touching the screw (<a href=\"../repair/repairs/intake-leak-test/\">Find an intake air leak</a>); tight valve clearances also upset idle."
        },
        {
          "type": "h3",
          "text": "The slide and its cutaway"
        },
        {
          "type": "p",
          "html": "On a slide carburettor the slide is the throttle. Its intake-side face carries a bevel, the <strong>cutaway</strong>, which sets how much air passes under the slide at small openings and so governs roughly 1/8 to 1/4 throttle, where the pilot circuit hands over to the needle. A larger cutaway admits more air and leans the transition; a smaller one richens it. Cutaways are marked by number, and the slides are expensive, so they are rarely changed outside tuning work."
        },
        {
          "type": "p",
          "html": "A peg or slot positions the slide so the cutaway faces the intake. A slide fitted backwards can jam the throttle wide open, so the orientation is checked before the top is refitted and the throttle is tested for free return before the engine is started. Spitting back through the carburettor as the throttle opens from idle is the sign of a weak transition; heavy, lumpy running there means rich."
        },
        {
          "type": "h3",
          "text": "Needle jet and jet needle"
        },
        {
          "type": "p",
          "html": "The <strong>needle jet</strong> sits in the centre of the carburettor with the main jet screwed into its base and the jet needle entering from the top. On many Mikuni designs it drops in from the throat, is located by a pin in a slot and is locked by the main jet and a washer; Keihin needle jets screw into the body. Many needle jets have air-bleed holes or a primary choke tube that emulsify the fuel. When refitting, the locating pin must engage its slot."
        },
        {
          "type": "photo",
          "src": "repair-photos/069_needle_jet_locating_pin_mikuni_bleed.jpg",
          "caption": "A Keihin-style needle jet, which screws into the carburettor body",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "The <strong>jet needle</strong> hangs from the slide or piston. Fuel flows through the annulus between needle and needle jet, so the taper sets the mid-range mixture. Needles have one taper or several stages, and the top usually carries five clip grooves. Moving the clip down a groove raises the needle and richens about 1/4 to 3/4 throttle; moving it up lowers the needle and leans. A thin washer under the clip gives a half step richer."
        },
        {
          "type": "photo",
          "src": "repair-photos/070_jet_needle_clip.jpg",
          "caption": "Two jet needles: the clip grooves at the top set the needle height in the slide",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Needle and needle jet wear against each other with vibration and mileage, enlarging the annulus. The result is a rich mid-range that no change of main jet will cure; the fix is a new needle and needle jet together (<a href=\"../repair/repairs/needle-jet-remove-refit/\">Remove and refit a needle jet</a>). Engines also change with wear: as compression falls, the venturi signal weakens and the mixture tends to lean slightly."
        },
        {
          "type": "h3",
          "text": "The main jet"
        },
        {
          "type": "p",
          "html": "The main jet is in series with all the fuel that reaches the needle jet. Once the slide is high enough that the annulus around the needle is larger than the main jet orifice, at about 3/4 throttle, the main jet becomes the restriction and sets the full-throttle mixture. A larger number is richer, but numbering differs between makers, so the same number does not mean the same flow across brands."
        },
        {
          "type": "p",
          "html": "Use the carburettor maker's own jets: genuine jets carry the maker's mark, such as a K for Keihin or a square within a square for Mikuni, and copies often have wrong hole sizes. Change one size at a time and test after each change, as <a href=\"../repair/repairs/carb-jet-tune/\">Read a spark plug and choose the jet by throttle position</a> describes."
        },
        {
          "type": "table",
          "head": [
            "Part",
            "Approximate throttle opening it affects",
            "Richer by"
          ],
          "rows": [
            [
              "Pilot jet and screw",
              "0 to about 25 %",
              "Larger pilot jet; fuel screw out or air screw in"
            ],
            [
              "Slide cutaway",
              "0 to about 35 %",
              "Smaller cutaway"
            ],
            [
              "Needle jet",
              "about 15 to 60 %",
              "Larger bore (or worn)"
            ],
            [
              "Jet needle",
              "about 20 to 80 %",
              "Clip lower (needle raised), or thinner taper"
            ],
            [
              "Main jet",
              "about 60 to 100 %",
              "Larger number"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The ranges overlap like runners handing over a baton in a relay race, so a change to one part is felt on either side of its range. That is why jetting follows a fixed order (chapter 3.1) and why each change is confirmed by a road test at the throttle opening concerned. Tape marks on the throttle grip and housing, in quarters from closed to full, show the rider which part to look at."
        },
        {
          "type": "photo",
          "src": "repair-photos/075_throttle_marks_1.jpg",
          "caption": "Tape marks on the throttle grip and housing, used to see which part of the throttle range a fault occurs in",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Cold-start devices"
        },
        {
          "type": "p",
          "html": "A cold engine evaporates fuel poorly, and liquid fuel does not burn, so a cold start needs a much richer mixture, around \\(\\lambda\\) 0.5 to 0.7 for cranking, of which only part evaporates. Carburettors provide it in three main ways."
        },
        {
          "type": "p",
          "html": "The <strong>enricher</strong> (starter circuit) is a separate small carburettor. Lifting a plunger by lever, knob or cable uncovers a passage that draws fuel through a <strong>starter jet</strong>, often pressed into the bottom of the float bowl, and discharges it behind the slide. It depends on the high depression behind a closed throttle, so it works best with the throttle shut; opening the throttle during a cold start weakens it. The starter jet is small and blocks easily, and then the choke does nothing."
        },
        {
          "type": "photo",
          "src": "repair-photos/076_plunger_knob_plunger_lever_plunger_cable.jpg",
          "caption": "A slide carburettor with its enricher plunger on top of the body beside the slide",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A <strong>choke plate</strong> is a butterfly or guillotine plate upstream of the venturi that restricts the air, so the engine's suction draws more fuel. Some plates carry a small spring-loaded flap that opens if the depression grows too high. A spring-loaded plate with a broken spring does not close properly, and the symptom is easy to miss: endless cranking and an overheated starter."
        },
        {
          "type": "photo",
          "src": "repair-photos/077_guillotine_style_plate_style.jpg",
          "caption": "A carburettor with a choke lever and plate choke in the intake",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Scooters often have an <strong>automatic enricher</strong>: a plunger driven by a wax element or an electric heater, which closes progressively as the engine warms (<a href=\"../repair/repairs/auto-enrichener-check/\">Check an automatic enricher</a>). Older British machines used a <strong>tickler</strong>, a button that pushes the float down to flood the bowl before kicking. Whatever the device, a choke left partly on gives black smoke and fouled plugs once the engine is warm: see <a href=\"../repair/repairs/choke-check/\">Check the choke or starter valve</a>."
        },
        {
          "type": "h3",
          "text": "Constant-velocity carburettors in detail"
        },
        {
          "type": "p",
          "html": "Snapping a slide carburettor wide open at low engine speed collapses the air speed, so fuel stops flowing and the engine stumbles or dies. The <strong>constant-velocity (CV)</strong> or constant-depression carburettor removes the problem by taking the slide away from the rider. The cable turns a butterfly downstream; the slide, or piston, is lifted by engine vacuum, so it opens only as fast as the airflow allows."
        },
        {
          "type": "p",
          "html": "Vacuum from the throat reaches the chamber above the piston through a hole in its base, while atmospheric pressure from the intake side acts below it. There are two types. A <strong>piston type</strong> has a solid piston sealed in its bore by a labyrinth seal and closes under its own weight. A <strong>diaphragm type</strong> lifts the slide with a rubber diaphragm whose bead seals in a groove in the body, and a light spring closes it. A peg keeps the cutaway facing the intake."
        },
        {
          "type": "photo",
          "src": "repair-photos/081_piston_slide_diaphragm_slide.jpg",
          "caption": "Constant-velocity carburettor in section: vacuum above the piston, atmospheric pressure below it",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A torn or perished diaphragm, or a blocked piston vent, leaves the piston down. The engine starts and idles well but has little power and revs up very slowly, or will not exceed a moderate speed. Remove the top, lift the piston by hand and check that it falls smoothly, and hold the diaphragm against a light to look for pinholes (<a href=\"../repair/repairs/carb-diaphragm-check/\">Check the carburettor diaphragm</a>, <a href=\"../repair/repairs/cv-carb-check/\">Check a CV carburettor</a>)."
        },
        {
          "type": "p",
          "html": "Some CV carburettors carry further diaphragms. A <strong>coasting enricher</strong> on the side of the body briefly closes the pilot air passage on a closed throttle, richening the mixture to reduce backfiring as the machine slows. An <strong>accelerator pump</strong> at the bottom squirts fuel into the bore when the throttle snaps open; on a multi-cylinder machine one pump often feeds all the carburettors through passages. Carburettor cleaner destroys all of these diaphragms, so they are removed before any cleaning."
        },
        {
          "type": "h3",
          "text": "Other designs"
        },
        {
          "type": "p",
          "html": "Diaphragm (pumper) carburettors, which use engine pulses to pump fuel and have no float bowl, work in any position and are fitted to chain saws and some small two-strokes, but rarely to motorcycles. Two-stroke intakes often carry a <strong>reed valve</strong> between carburettor and crankcase to stop blow-back; its petals and their effect on induction are covered in chapter 2.3. A broken or stuck reed makes the engine very hard to start."
        },
        {
          "type": "photo",
          "src": "repair-photos/084_motorcycle_reed_valves.jpg",
          "caption": "A two-stroke reed valve block lifted from the cylinder intake",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Job sheet: cleaning a carburettor"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Prepare",
              "html": "Fuel tap OFF, engine cold, outdoors, extinguisher beside the bike, goggles on. Clean the outside of the engine and carburettor before opening anything."
            },
            {
              "title": "Remove",
              "html": "Drain the bowl into a container, release cables and hoses, and lift the carburettor from stiff rubbers carefully: the body is soft alloy and breaks easily. Leave multiple carburettors bolted together so their linkage settings are kept."
            },
            {
              "title": "Rubber out first",
              "html": "Remove the top, diaphragm, O-rings, bowl gasket and the small O-ring and washer under the air or fuel screw. Count the screw's turns in to its seat first."
            },
            {
              "title": "Jets out",
              "html": "Remove the bowl, main jet, needle jet (note its locating pin), pilot jet and starter jet where removable. Use a screwdriver that fits the jet slot exactly."
            },
            {
              "title": "Clean",
              "html": "Soak metal parts in carburettor cleaner, then blow every passage through with compressed air, holding small parts in a rag. Never push wire through a jet; it enlarges the calibrated hole."
            },
            {
              "title": "Inspect",
              "html": "Float needle tip, seat, float for fuel inside, float pin, needle and needle jet wear, diaphragm pinholes, slide bore."
            },
            {
              "title": "Reassemble",
              "html": "New gaskets and O-rings, float height to the manual figure, a drop of light oil on the float needle, slide facing the right way, screw back to its counted turns."
            },
            {
              "title": "Refit and test",
              "html": "Turn the tap on and watch the overflow for ten minutes, check for intake leaks, then set idle speed and mixture warm."
            }
          ]
        },
        {
          "type": "p",
          "html": "The full jobs are <a href=\"../repair/repairs/carburettor-clean/\">Clean the carburettor</a>, <a href=\"../repair/repairs/carb-float-check/\">Check the carburettor float and needle valve</a> and <a href=\"../repair/repairs/carb-remove-refit/\">Remove and refit a carburettor with stiff rubber boots</a>. Strip only as far as the cleaning needs: some throttle-shaft seals are not supplied as spare parts and are ruined by soaking, and a spring lost in the workshop can end the job."
        },
        {
          "type": "photo",
          "src": "repair-photos/064_dirty_carburetor_exploded_carburetor.jpg",
          "caption": "A float bowl opened after storage, full of dried fuel deposits",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "h3",
          "text": "Carburettor fault-finding"
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Circuit or part",
            "Check"
          ],
          "rows": [
            [
              "Runs only with the choke on, stalls when it is off",
              "Pilot jet or idle passages blocked",
              "Clean pilot circuit; <a href=\"../repair/repairs/carb-jet-clear/\">clear the jets</a>"
            ],
            [
              "Fuel from the overflow with the tap on",
              "Float needle held open, worn, or float sinking",
              "Tap the bowl; <a href=\"../repair/repairs/carb-float-check/\">float and needle check</a>"
            ],
            [
              "Starts, idles, but revs slowly with no power (CV)",
              "Torn diaphragm or blocked piston vent",
              "Lift the piston; light test on the diaphragm"
            ],
            [
              "Spits back as the throttle opens from idle",
              "Weak transition: pilot or cutaway",
              "Pilot screw, intake leak, cutaway"
            ],
            [
              "Rich or lumpy at half throttle, fine at full",
              "Needle too high, or worn needle and needle jet",
              "Clip position; needle and needle jet wear"
            ],
            [
              "Heavy and sooty at full throttle",
              "Main jet too large, air filter blocked, float high",
              "Filter, float height, main jet"
            ],
            [
              "Pinks or surges at part throttle",
              "Lean mid-range",
              "Raise the needle one groove (clip lower)"
            ],
            [
              "Choke has no effect on a cold start",
              "Starter jet blocked, plunger not lifting, throttle opened",
              "Clear starter jet; <a href=\"../repair/repairs/choke-circuit-clear/\">choke circuit</a>"
            ],
            [
              "Idle hangs high, then dies",
              "Air leak at the manifold or a vacuum hose",
              "<a href=\"../repair/repairs/intake-leak-test/\">Spray test with water</a>"
            ]
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "The choke test for rich or weak",
          "html": "At the throttle opening where the fault appears, close the choke a little. If the engine runs better, the mixture there is weak; if it runs worse, it is rich. Open the choke fully again before going on, and confirm with a plug reading after a clean cut at that opening."
        },
        {
          "type": "check",
          "q": "m3-53"
        },
        {
          "type": "check",
          "q": "m3-54"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "A carburettor meters by air speed: the venturi depression grows with the square of the speed, and jet flow with the square root of the depression.<br>The float level is the reference for every circuit: high richens, low leans, and a leaking float needle can fill the crankcase with fuel.<br>The pilot circuit runs idle; an air screw out leans, a fuel screw out richens; a blocked pilot jet makes the engine run only on the choke.<br>Needle clip lower raises the needle and richens the mid-range; worn needles and needle jets richen it too.<br>Enrichers work only with the throttle closed; CV carburettors lift their piston by vacuum, so a torn diaphragm leaves an engine that idles but will not rev.<br>Clean with cleaner and air, never wire, with every rubber part removed, and use the carburettor maker's own jets."
        }
      ]
    },
    {
      "id": "m3-efi",
      "title": "Electronic fuel injection and engine management",
      "lead": "A carburettor cannot hold the narrow lambda window a catalyst needs, cannot correct for air density or ethanol, and cannot report its own faults. Fuel injection can: it opens a valve for a calculated number of milliseconds and checks the result in the exhaust, many times a second.",
      "lab": "overview/?mode=4t&part=engine",
      "blocks": [
        {
          "type": "h3",
          "text": "Why injection replaced the carburettor"
        },
        {
          "type": "p",
          "html": "The K-Light 125 carries a complete small-engine system: one port injector, a throttle body with TPS, a combined pressure-and-temperature sensor, stepper-motor idle control, a head temperature sensor, a crank trigger on the flywheel, a heated oxygen sensor, an in-tank pump, a three-way catalyst, and an OBD system with an FI warning lamp. The ECU also controls ignition."
        },
        {
          "type": "p",
          "html": "<strong>Electronic fuel injection (EFI)</strong> meters fuel by holding an electrically opened valve open for a calculated time under constant fuel pressure, and corrects that time continuously from an oxygen sensor in the exhaust. Once Euro 3 and then Euro 4 limits made catalyst-equipped closed-loop control the practical route to type approval, injection spread from large machines to 125 cc commuters."
        },
        {
          "type": "plate",
          "id": "F12",
          "caption": "Electronic fuel injection on a single-cylinder engine: fuel delivery, sensors, ECU, actuators and catalyst."
        },
        {
          "type": "h3",
          "text": "Fuel delivery"
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Rail pressure",
              "v": "300 kPa",
              "p": "K-Light at idle; below 270 kPa look for a fault"
            },
            {
              "l": "Pump prime",
              "v": "~3 s",
              "p": "at key-on, then stops unless crank pulses arrive"
            },
            {
              "l": "Pump supply",
              "v": "12 &plusmn; 2 V",
              "p": "at the pump connector during prime and cranking"
            },
            {
              "l": "Fuel filter",
              "v": "7000&ndash;10 000 km",
              "p": "K-Light replacement interval"
            }
          ]
        },
        {
          "type": "p",
          "html": "A submerged turbine pump (a small permanent-magnet DC motor driving a regenerative impeller) draws through a strainer sock; being submerged cools the motor and suppresses vapour lock. On a returnless system like the K-Light the regulator sits in the pump module and spills excess fuel straight back into the tank, so only one line runs to the injector."
        },
        {
          "type": "p",
          "html": "Low pressure on the K-Light (below 270 kPa) points to a leak, a pump running backwards because of a reversed connector, or a blocked filter: check for leaks first, then the pump connector, then the filter, and only then replace the pump module, which includes the regulator."
        },
        {
          "type": "p",
          "html": "At key-on the ECU runs the pump for about 3 seconds to prime the line, then stops it unless crankshaft pulses arrive, so a pump cannot empty the tank through a broken line after a crash. The K-Light manual sets 7000&ndash;10 000 km for the fuel filter and every 10 000 km or one year for throttle-body cleaning. Practice: <a href=\"../repair/repairs/fuel-pump-check/\">fuel pump check</a>, <a href=\"../repair/repairs/fuel-filter-replace/\">fuel filter replacement</a>."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Residual pressure",
          "html": "An EFI line stays pressurised after the engine stops. Relieve pressure (pump fuse out and run until it stalls, or wrap the connector in a rag) before disconnecting. Injector O-rings and the pump flange gasket are single-use."
        },
        {
          "type": "h3",
          "text": "The injector and pulse width"
        },
        {
          "type": "p",
          "html": "The injector is a solenoid valve: energising its coil lifts a ball or pintle off its seat against a return spring and the fuel pressure, and fuel sprays through a multi-hole director plate as a cone aimed at the back of the inlet valve. The K-Light injector is a high-impedance type of about <strong>10 \\(\\Omega\\)</strong>, driven directly by a transistor in the ECU; an infinite reading means an open coil."
        },
        {
          "type": "p",
          "html": "At fixed pressure the flow through the open valve is constant, so the ECU controls fuel purely by <strong>pulse width</strong>, the time in milliseconds for which the injector is held open. The calculation runs from the air in the cylinder to the fuel it needs, then to the time the valve must stay open."
        },
        {
          "type": "eq",
          "id": "m3-air-mass-cycle",
          "name": "Air mass trapped per cycle",
          "tex": "m_{air} = V_d\\,\\rho_{air}\\,\\eta_v",
          "where": [
            [
              "m_{air}",
              "air mass per cylinder per cycle",
              "kg"
            ],
            [
              "V_d",
              "swept volume of the cylinder",
              "m³"
            ],
            [
              "\\rho_{air}",
              "intake air density",
              "kg/m³"
            ],
            [
              "\\eta_v",
              "volumetric efficiency",
              "none"
            ]
          ],
          "why": "It is the load estimate every speed-density ECU makes before it can calculate fuel; it also shows why air density and breathing set the power of an engine.",
          "example": "K-Light 125: \\(m_{air} = 124 \\times 10^{-6} \\times 1.18 \\times 0.85 \\approx 0.124\\ \\mathrm{g}\\)."
        },
        {
          "type": "eq",
          "id": "m3-fuel-mass-cycle",
          "name": "Fuel mass per cycle",
          "tex": "m_{fuel} = \\frac{m_{air}}{\\mathrm{AFR}} = \\frac{m_{air}}{\\lambda\\,\\mathrm{AFR}_{st}}",
          "where": [
            [
              "m_{fuel}",
              "fuel mass to inject per cycle",
              "kg"
            ],
            [
              "m_{air}",
              "air mass per cycle",
              "kg"
            ],
            [
              "\\mathrm{AFR}",
              "target air-fuel ratio",
              "kg/kg"
            ],
            [
              "\\lambda",
              "target lambda",
              "none"
            ]
          ],
          "why": "It turns the air estimate into the fuel the injector must deliver for a chosen mixture target, such as lambda 1 at cruise or lambda 0.9 at full load.",
          "example": "At \\(\\lambda = 1\\) on petrol: \\(m_{fuel} = 0.124 / 14.7 \\approx 8.5\\ \\mathrm{mg}\\)."
        },
        {
          "type": "eq",
          "id": "m3-injector-pulse",
          "name": "Injector pulse width",
          "tex": "PW = \\frac{m_{fuel}}{q} + t_{dead}",
          "where": [
            [
              "PW",
              "pulse width the ECU commands",
              "ms"
            ],
            [
              "m_{fuel}",
              "fuel mass per injection",
              "mg"
            ],
            [
              "q",
              "injector static flow at rail pressure",
              "mg/ms"
            ],
            [
              "t_{dead}",
              "opening delay, longer at low battery voltage (typically 0.6–1.2 ms)",
              "ms"
            ]
          ],
          "why": "It is the number the ECU actually controls. Dead time is why a weak battery or charging fault leans the mixture unless the ECU corrects for voltage.",
          "example": "A 100 g/min injector flows \\(1.67\\ \\mathrm{mg/ms}\\): \\(PW = 8.5 / 1.67 + 0.8 \\approx 5.1 + 0.8 = 5.9\\ \\mathrm{ms}\\)."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Air per cycle",
              "html": "\\(124\\ \\mathrm{cm^3} \\times 1.18\\ \\mathrm{kg/m^3} \\times 0.85\\) VE \\(\\approx 0.124\\ \\mathrm{g}\\)"
            },
            {
              "title": "Fuel per cycle",
              "html": "\\(0.124\\ \\mathrm{g} / 14.7 \\approx 8.5\\ \\mathrm{mg}\\)"
            },
            {
              "title": "Open time",
              "html": "\\(8.5\\ \\mathrm{mg} / 1.67\\ \\mathrm{mg/ms}\\) (100 g/min injector) \\(\\approx 5.1\\ \\mathrm{ms}\\)"
            },
            {
              "title": "Pulse width",
              "html": "\\(5.1 + 0.8\\ \\mathrm{ms}\\) dead time \\(\\approx\\) <strong>5.9 ms</strong>"
            }
          ]
        },
        {
          "type": "eq",
          "id": "m3-injector-duty",
          "name": "Injector duty cycle (four-stroke)",
          "tex": "D = \\frac{PW}{t_{cycle}} = \\frac{PW\\,n}{120}",
          "where": [
            [
              "D",
              "fraction of the cycle the injector is open",
              "none"
            ],
            [
              "PW",
              "pulse width",
              "s"
            ],
            [
              "t_{cycle}",
              "time for one four-stroke cycle (two revolutions)",
              "s"
            ],
            [
              "n",
              "engine speed",
              "r/min"
            ]
          ],
          "why": "Injectors are sized so that duty stays below about 80–85 % at peak power; above that the valve no longer closes cleanly between pulses and fuelling becomes unpredictable.",
          "example": "At 9000 rpm \\(t_{cycle} = 2 \\times 60 / 9000 = 13.3\\ \\mathrm{ms}\\), so \\(D = 5.9 / 13.3 \\approx 0.44\\), or 44 %."
        },
        {
          "type": "p",
          "html": "One injection occurs per four-stroke cycle, every two revolutions. At 9000 rpm a cycle lasts 13.3 ms, so the 5.9 ms pulse uses about <strong>44 %</strong> of the available time; at 6000 rpm the cycle is 20 ms and the same pulse would be about 30 %."
        },
        {
          "type": "p",
          "html": "Common injector faults are varnish clogging (lean running, hesitation), leakage (rich running, hard hot starting, high consumption; the K-Light manual suggests a leaking injector if the oxygen sensor stays above 500 mV warm) and a disturbed spray angle if the injector body is turned with the connector fitted. Ultrasonic cleaning on a flow bench restores clogged injectors. Practice: <a href=\"../repair/repairs/injector-check/\">injector check</a>."
        },
        {
          "type": "check",
          "q": "m3-07"
        },
        {
          "type": "h3",
          "text": "Throttle body"
        },
        {
          "type": "model",
          "file": "throttle_body",
          "caption": "An EFI throttle body with butterfly valve, injector and throttle position sensor."
        },
        {
          "type": "p",
          "html": "The throttle body carries the butterfly, the TPS, a by-pass passage for the idle stepper and, on the K-Light, the combined MAP and intake temperature sensor; the idle stop screw is factory-set and not adjusted. Carbon round the butterfly edge is part of the calibrated idle airflow. Clean with carburettor cleaner sprayed into the bore with the butterfly opened by the cable (never by forcing a tool into the bore), keep the spray off the TPS, and expect many ECUs to need an idle relearn afterwards. Practice: <a href=\"../repair/repairs/throttle-body-clean/\">throttle body clean</a>, <a href=\"../repair/repairs/idle-relearn/\">idle relearn</a>."
        },
        {
          "type": "h3",
          "text": "Sensors"
        },
        {
          "type": "p",
          "html": "Most sensors run from a regulated <strong>5 V reference</strong> and share a sensor earth, so one shorted sensor can drag the reference down and set several codes at once. Temperature sensors are NTC (negative temperature coefficient) thermistors in a voltage divider with a pull-up resistor inside the ECU: resistance and signal voltage fall as temperature rises."
        },
        {
          "type": "table",
          "head": [
            "Sensor",
            "Principle",
            "K-Light 125 value"
          ],
          "rows": [
            [
              "TPS",
              "Potentiometer on throttle spindle",
              "0.5&ndash;0.9 V closed, 3.5&ndash;4.0 V open; closed = 14 % &plusmn; 5 % of reference"
            ],
            [
              "MAP",
              "Piezoresistive diaphragm",
              "4.25&ndash;4.75 V at 100 kPa, engine stopped"
            ],
            [
              "Intake air temp",
              "NTC thermistor",
              "5.595 k&Omega; at 0 &deg;C, 2.000 k&Omega; at 25 &deg;C"
            ],
            [
              "Engine temp",
              "NTC in cylinder head",
              "1.9&ndash;2.1 k&Omega; at 25 &deg;C, 0.179&ndash;0.187 k&Omega; at 100 &deg;C"
            ],
            [
              "Crank position",
              "Variable reluctance pick-up",
              "150 \\(\\pm\\) 10 &Omega;; peak above 1.7 V when cranking"
            ],
            [
              "Oxygen",
              "Heated zirconia cell",
              "Rich above 750 mV, lean below 120 mV; heater 9.6 &plusmn; 1.5 &Omega;"
            ]
          ]
        },
        {
          "type": "eq",
          "id": "m3-sensor-ratio",
          "name": "Sensor output as a fraction of reference",
          "tex": "x = \\frac{V_{out}}{V_{ref}} \\times 100\\,\\%",
          "where": [
            [
              "x",
              "sensor output as a percentage of reference",
              "%"
            ],
            [
              "V_{out}",
              "signal voltage at the ECU pin",
              "V"
            ],
            [
              "V_{ref}",
              "sensor reference supply (nominally 5 V)",
              "V"
            ]
          ],
          "why": "Ratiometric sensors such as the TPS are specified as a share of their reference, so a reading stays valid even when the reference is a little high or low.",
          "example": "A TPS at \\(0.70\\ \\mathrm{V}\\) on a \\(5.00\\ \\mathrm{V}\\) reference gives \\(x = 0.70 / 5.00 = 14\\,\\%\\), the K-Light nominal closed value."
        },
        {
          "type": "h3",
          "text": "How each sensor works"
        },
        {
          "type": "p",
          "html": "The <strong>TPS</strong> is a three-wire potentiometer: reference, earth and wiper. The ECU uses it to recognise idle, to calculate load on alpha-N systems and to detect the rate of opening for acceleration enrichment. A worn track gives dropouts and a stumble at one opening, visible as a jagged trace when the throttle is swept slowly with a meter in bar-graph mode or an oscilloscope; the K-Light quotes a measuring range of 7 % to 93 % of travel."
        },
        {
          "type": "p",
          "html": "The <strong>MAP</strong> sensor reads absolute pressure behind the throttle. On a single it pulsates with each intake stroke, so the ECU samples it at a fixed crank angle; with the engine stopped it reads atmospheric pressure, used at key-on as a barometric correction. A persistently high idle MAP points to an intake leak, a too-small valve clearance or a blocked exhaust. The <strong>IAT</strong> corrects for temperature: air at 40 &deg;C is about 6 % less dense than at 20 &deg;C."
        },
        {
          "type": "p",
          "html": "An <strong>open</strong> engine-temperature circuit reads as extreme cold: the ECU over-fuels and floods a warm engine. A <strong>shorted</strong> one reads as extreme heat: lean, hard cold starts. Without a crank signal the engine neither sparks nor injects."
        },
        {
          "type": "p",
          "html": "The <strong>crank position sensor</strong> is a coil on a magnet facing reluctor tabs on the flywheel (on the K-Light it sits on the stator). Each passing tab induces an AC pulse, and a missing tooth or long tab marks a reference near TDC. A four-stroke single often cannot tell compression TDC from overlap TDC, so it fires a wasted spark every revolution. Too large an air gap gives too small a signal at cranking speed."
        },
        {
          "type": "p",
          "html": "The narrowband <strong>oxygen sensor</strong> is a zirconia thimble with porous platinum electrodes, exhaust outside and reference air inside. Hot enough (the K-Light specifies 260&ndash;850 &deg;C) it conducts oxygen ions and switches abruptly at \\(\\lambda = 1\\): about 0.8&ndash;0.9 V rich, 0.1&ndash;0.2 V lean. It says only <em>rich or lean</em>, never <em>how</em> rich, which is enough for closed-loop control at stoichiometric but useless for tuning full-throttle mixture."
        },
        {
          "type": "p",
          "html": "The K-Light test calls for continuous variation between 0 and 1 V after more than 2 minutes at 3000&ndash;5000 rpm with the engine at 80 &deg;C. Lead, silicone sealant vapour and burning oil poison the electrodes and slow the response. Large machines increasingly use five-wire <strong>wideband</strong> sensors that pump oxygen ions to hold a measuring cell at \\(\\lambda = 1\\) and report the pump current, giving a proportional reading from about 0.7 to lean infinity. Practice: <a href=\"../repair/repairs/efi-sensor-check/\">EFI sensor check</a>, <a href=\"../repair/repairs/o2-sensor-check/\">oxygen sensor check</a>."
        },
        {
          "type": "h3",
          "text": "How the ECU decides"
        },
        {
          "type": "p",
          "html": "The ECU must know the air mass entering the cylinder each cycle. Motorcycles rarely use a mass airflow meter, because the pulsating flow of one or two cylinders makes it inaccurate, so two indirect strategies dominate."
        },
        {
          "type": "table",
          "head": [
            "Strategy",
            "Air mass from",
            "Strength"
          ],
          "rows": [
            [
              "Speed-density",
              "MAP, rpm, intake temp, VE table",
              "Self-corrects for altitude, filter restriction, wear (K-Light main strategy)"
            ],
            [
              "Alpha-N",
              "Throttle angle and rpm",
              "Stable at wide throttle and with wild cams; blind to intake leaks"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Many ECUs blend both, MAP at small openings and TPS at large ones, and add the TPS rate of change for acceleration enrichment because manifold pressure lags a sudden opening. Base fuel and advance come from three-dimensional maps, corrected for temperatures, battery voltage and the closed-loop trim."
        },
        {
          "type": "p",
          "html": "In <strong>closed loop</strong> the ECU nudges pulse width against the oxygen sensor: rich, it lean-shifts until the sensor reads lean, then reverses, so the mixture oscillates around \\(\\lambda = 1\\) a few times a second. That oscillation suits the catalyst, whose oxygen storage alternately fills and empties. Long-term adaptive values (<strong>self-learning</strong>) are stored for each load region so the short-term correction stays near zero."
        },
        {
          "type": "p",
          "html": "The ECU drops to <strong>open loop</strong> with a cold sensor, during cranking and warm-up, at full load (enriching to \\(\\lambda\\) 0.85&ndash;0.92 to protect valves and catalyst and to make power), during transients and fuel cut-off, and permanently if the sensor fails, which also sets a code."
        },
        {
          "type": "h3",
          "text": "Cold start, idle control and cut-off"
        },
        {
          "type": "p",
          "html": "At cranking the ECU injects a quantity from a temperature-based table and raises idle while the engine is cold: the K-Light raises idle below 68 &deg;C and holds 1500 \\(\\pm\\) 100 rpm warm. Idle air comes through a bipolar stepper motor (two coils, 50 &Omega; \\(\\pm\\) 10 % each) moving a pintle in the by-pass. The ECU counts steps from a reference position, so a stepper that loses its reference after a battery disconnection may give an erratic idle until it relearns. Ride-by-wire bikes position the main butterfly and need no separate stepper."
        },
        {
          "type": "p",
          "html": "With the throttle closed above a threshold speed (typically 1800&ndash;2500 rpm warm) the ECU stops injecting entirely (<strong>deceleration fuel cut-off</strong>) and resumes near idle. This saves fuel and stops HC on the overrun, but contributes to snatchy response at small openings. The <strong>rev limiter</strong> cuts fuel, spark or both; a soft limiter retards ignition first."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Starting an injected engine",
          "html": "Do not touch the throttle: the ECU calculates cranking fuel and idle air itself. The exception is a flooded engine, where holding the throttle wide open while cranking triggers clear-flood mode and cuts injection."
        },
        {
          "type": "h3",
          "text": "Fault codes"
        },
        {
          "type": "p",
          "html": "The ECU range-checks every sensor and output driver; a failed check stores a P-code and lights the MIL. A <strong>range code points to a circuit, not a sensor</strong>: P0118 (engine temperature above 4.9 V) is caused as often by a backed-out pin as by the thermistor."
        },
        {
          "type": "p",
          "html": "Faults are steady-state (present every time) or intermittent (often a connector or harness chafe), and most systems store a <strong>freeze frame</strong> of rpm, temperature and load at the moment of the fault. At key-on the K-Light FI lamp lights as a bulb check; if it stays dark, check fuse, earth and ECU connector first. After starting it should go out."
        },
        {
          "type": "table",
          "head": [
            "Code",
            "Component",
            "Criterion"
          ],
          "rows": [
            [
              "P0122 / P0123",
              "TPS",
              "below 0.1 V / above 4.9 V"
            ],
            [
              "P0117 / P0118",
              "Engine temperature",
              "below 0.1 V / above 4.9 V"
            ],
            [
              "P0131 / P0132",
              "Oxygen sensor",
              "below 0.3 V / above 0.7 V for more than 15 s"
            ],
            [
              "P0134",
              "Oxygen sensor",
              "held between 0.35 and 0.55 V (no activity)"
            ],
            [
              "P0335",
              "Crank position",
              "signal high with engine stopped"
            ],
            [
              "P2300 / P2301",
              "Ignition coil primary",
              "no clamp voltage / over 8.6 A"
            ],
            [
              "P0107 / P0108",
              "MAP",
              "below 0.1 V / above 4.9 V"
            ],
            [
              "P0201 / P0261 / P0262",
              "Injector",
              "open / short to earth / over 5 A"
            ],
            [
              "P0627 / P0629",
              "Fuel pump",
              "below 0.4 A / over 8.4 A"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m3-09"
        },
        {
          "type": "p",
          "html": "Diagnostic tools come in three levels. <strong>Blink codes</strong> need no tool: shorting a service connector makes the MIL flash the code as long and short pulses (one long and two short for code 12). <strong>Generic scan tools</strong> read P-codes and live data through the 16-pin OBD connector over K-line or CAN; the K-Light has a 16-port interface. <strong>Manufacturer tools</strong> add actuator tests, idle and TPS relearns and reflashing. Keep battery voltage above 8.5 V while a tool is connected. Practice: <a href=\"../repair/repairs/efi-code-read/\">reading EFI codes</a>."
        },
        {
          "type": "h3",
          "text": "Emissions and the catalyst"
        },
        {
          "type": "p",
          "html": "<strong>CO</strong> comes from too little oxygen, so it rises steeply rich of \\(\\lambda = 1\\) and is almost absent lean. <strong>HC</strong> is unburned fuel from crevices above the top ring and round the plug thread, the quench layer on cold walls, oil films, misfire and, on a two-stroke, fresh charge short-circuiting out of the exhaust port. <strong>NOx</strong> forms above about 1800 &deg;C and peaks slightly lean, around \\(\\lambda\\) 1.05&ndash;1.1, where temperature and free oxygen are both high; it rises with advance and compression ratio."
        },
        {
          "type": "p",
          "html": "A <strong>three-way catalyst</strong> is a honeycomb (on motorcycles usually wound metal foil, which tolerates vibration and heats quickly), a washcoat of alumina and ceria that multiplies surface area and stores oxygen, and a thin layer of platinum, palladium and rhodium. Platinum and palladium oxidise CO and HC; rhodium reduces NOx to \\(\\mathrm{N_2}\\) using CO and hydrogen. Both can only happen together within about \\(\\pm\\)0.5 % of stoichiometric AFR, so closed-loop control is a precondition. It lights off at about 250&ndash;300 &deg;C, so it sits close to the port."
        },
        {
          "type": "model",
          "file": "exhaust_4t",
          "caption": "A four-stroke exhaust: header pipe with heat shield and a slash-cut silencer; on Euro 5 bikes the catalyst sits in the header or silencer."
        },
        {
          "type": "table",
          "head": [
            "Pollutant",
            "Euro 5 limit (mg/km)"
          ],
          "rows": [
            [
              "CO",
              "1000"
            ],
            [
              "THC",
              "100"
            ],
            [
              "NMHC",
              "68"
            ],
            [
              "NOx",
              "60"
            ],
            [
              "PM (direct injection only)",
              "4.5"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Chapter 3.5 continues with what destroys a catalyst, secondary air injection, the OBD stages, Euro 5+ durability and Bharat Stage VI, and chapter 3.6 turns the fault tables into a complete diagnostic method."
        },
        {
          "type": "h3",
          "text": "Evaporative emission control"
        },
        {
          "type": "p",
          "html": "Fuel vapour is HC even when the bike is parked: Euro 5 limits L3e evaporative emission to 1.5 g per SHED test. A sealed tank vents through a rollover valve into an <strong>activated-charcoal canister</strong>, and with the engine running a purge line draws the vapour into the throttle body to be burned (on the K-Light, where fitted, through an ECU-driven solenoid valve). A blocked canister vent or stuck-closed purge valve mimics a blocked tank vent; a stuck-open purge valve gives a rich idle after refuelling."
        },
        {
          "type": "p",
          "html": "Euro 5 (new types from 1 January 2020, all new vehicles from 1 January 2021) uses the WMTC test cycle and requires the limits to hold for 20 000 km (L3e below 130 km/h) or 35 000 km (above 130 km/h). It brought OBD stage II. <strong>Euro 5+</strong> (new types from 1 January 2024, all new registrations from 1 January 2025) keeps the limits but adds catalyst monitoring with a second, downstream oxygen sensor: a healthy catalyst stores oxygen, so the downstream signal stays steady while the upstream one switches."
        },
        {
          "type": "h3",
          "text": "EFI fault diagnosis"
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
              "FI lamp dark at key-on, no start",
              "Fuse, ECU earth, ECU connector",
              "Fuse; voltage at ECU supply pin; earth drop"
            ],
            [
              "Pump runs, no start, plug dry",
              "Low pressure, blocked filter, injector not opening",
              "300 kPa (min 270); injector 10 &Omega;; noid light"
            ],
            [
              "No start, plug wet",
              "Flooding, leaking injector, engine temperature sensor open",
              "Clear-flood crank; injector leak-down; sensor resistance"
            ],
            [
              "Idle too high warm",
              "Air leak at throttle body, stepper fault, excess exhaust valve clearance",
              "Spray test at joints; stepper 50 &Omega;; MAP at idle"
            ],
            [
              "High consumption, black exhaust",
              "Loose or failed oxygen sensor, leaking injector",
              "Sensor above 500 mV warm; sensor seal"
            ],
            [
              "Loss of top speed",
              "Blocked catalyst, low pressure, restricted filter",
              "High idle MAP; pressure under load"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m3-33"
        },
        {
          "type": "check",
          "q": "m3-34"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "EFI meters fuel by pulse width at constant pressure (300 kPa on the K-Light) and checks the result with an oxygen sensor.<br>Pulse width follows from air mass, target mixture and injector flow, plus a voltage-dependent dead time.<br>Speed-density uses MAP, rpm and air temperature; alpha-N uses throttle angle and rpm.<br>Closed loop holds \\(\\lambda = 1\\) for the catalyst; cold start, full load, transients and sensor faults force open loop.<br>A range code points to a circuit, not a sensor: check pins, wires and earths before replacing parts.<br>Euro 5+ adds catalyst monitoring with a downstream oxygen sensor."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "ZRNfyz1Cgvg",
              "title": "Carburetor vs Fuel Injection - Why Motorcycle Riders Should Think Again",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "7:51",
              "role": "How it works",
              "note": "Carburettor against fuel injection compared; useful for deciding which diagnosis path applies."
            },
            {
              "id": "AwXRvgyFUG4",
              "title": "Carburetors vs. Electronic Fuel Injection—What’s Better? | MC Garage",
              "channel": "Motorcyclist Magazine",
              "channel_url": "http://www.youtube.com/@MotorcyclistMag",
              "duration": "3:41",
              "role": "How it works",
              "note": "Short side by side of carburettor and EFI, how each meters fuel."
            },
            {
              "id": "mJ5Ovg6ADpI",
              "title": "Why Motorcycle Ride Modes are Mostly Useless",
              "channel": "FortNine",
              "channel_url": "http://www.youtube.com/@FortNine",
              "duration": "8:59",
              "role": "How it works",
              "note": "What ride modes change in throttle map and power; mostly software, not a repair topic."
            }
          ]
        }
      ]
    },
    {
      "id": "m3-intake-exhaust",
      "title": "Intake, exhaust and emissions",
      "lead": "An engine can burn only the air it can draw in and push out. This chapter follows that air from the snorkel to the tailpipe: airbox and filter, manifold and air leaks, intake tuning, the exhaust and its silencer, the catalyst and secondary air, and the type-approval rules that shape them.",
      "blocks": [
        {
          "type": "h3",
          "text": "One path from snorkel to tailpipe"
        },
        {
          "type": "p",
          "html": "An engine is an air pump before it is anything else. Every gram of fuel needs about 14.7 g of air (chapter 3.1), and all of that air enters through the intake and leaves, burned, through the exhaust. Whatever restricts either end, a clogged filter, a crushed silencer or a melted catalyst, reduces the air the engine can trap and therefore its power."
        },
        {
          "type": "p",
          "html": "The path is short but crowded: snorkel, airbox, filter, rubber boot, carburettor or throttle body, intake manifold, inlet port and valve; then exhaust valve, port, gasket, header, catalyst, silencer and tailpipe. Each part also has a second job, damping noise, cleaning air or cleaning exhaust, and each can upset the mixture when it fails. The time available is small: at 9000 rpm a 180&deg; intake stroke lasts only 3.3 ms."
        },
        {
          "type": "h3",
          "text": "The airbox"
        },
        {
          "type": "p",
          "html": "Air enters through a snorkel or duct into the <strong>airbox</strong>. The box holds the filter, gives each intake pulse a calm volume of still air to draw from, and acts as a resonator that tunes the intake pressure wave and suppresses intake noise to meet the type-approval sound limit. Its shape and snorkel are chosen together with the carburettor jets or the fuel map."
        },
        {
          "type": "eq",
          "id": "m3-helmholtz",
          "name": "Helmholtz resonance of an airbox",
          "tex": "f = \\frac{c}{2\\pi} \\sqrt{\\frac{A}{V\\,L}}",
          "where": [
            [
              "f",
              "resonant frequency",
              "Hz"
            ],
            [
              "c",
              "speed of sound in the intake air, about 343 at 20 °C",
              "m/s"
            ],
            [
              "A",
              "cross-section area of the snorkel",
              "m²"
            ],
            [
              "V",
              "airbox volume",
              "m³"
            ],
            [
              "L",
              "effective length of the snorkel",
              "m"
            ]
          ],
          "why": "An airbox with a snorkel behaves like a bottle with a neck: the air in the snorkel bounces on the spring of the air in the box. Designers place this resonance to damp intake noise and to help filling at a chosen engine speed.",
          "example": "For illustration only, a 5 L box (\\(V = 0.005\\ \\mathrm{m^3}\\)) with a snorkel of \\(A = 0.001\\ \\mathrm{m^2}\\) and \\(L = 0.1\\ \\mathrm{m}\\) gives \\(f = 54.6 \\times \\sqrt{0.001/0.0005} \\approx 77\\ \\mathrm{Hz}\\). A longer or narrower snorkel lowers the frequency."
        },
        {
          "type": "p",
          "html": "Because the jets or map assume the standard box, changing it changes the mixture. A machine that barely runs with the filter removed but idles well with it in place was jetted for the filter. A split or cracked airbox admits extra air, and a machine with one may miss and pop until the box is replaced. A cloth stuffed under the seat against the inlet, or a nest built inside the box, has the opposite effect and makes the engine run rich. See <a href=\"../repair/repairs/airbox-change-check/\">Check the mixture after an airbox or filter change</a> and <a href=\"../repair/repairs/airbox-blockage-check/\">Check the airbox for blockage</a>."
        },
        {
          "type": "h3",
          "text": "Filter elements and their service"
        },
        {
          "type": "p",
          "html": "The filter decides how long the engine lives. Dirt that passes it is abrasive dust that embeds in the soft aluminium of the piston and wears rings and bore, quickly on unpaved roads. Three element types are common, and each needs a different service."
        },
        {
          "type": "table",
          "head": [
            "Element",
            "Where used",
            "Service"
          ],
          "rows": [
            [
              "Pleated paper (dry)",
              "Most road machines",
              "Replaced, not cleaned; typically every 12 000 to 18 000 km on road bikes, far sooner in dust"
            ],
            [
              "Oiled polyurethane foam",
              "Off-road machines, many small commuters (the K-Light uses a sponge type)",
              "Washed in solvent or detergent, dried, oiled and squeezed out"
            ],
            [
              "Oiled cotton gauze (fabric)",
              "Performance replacements",
              "Cleaned with the maker's cleaner or soap and water, dried, re-oiled with the maker's oil"
            ]
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/085_oiled_foam_oiled_fabric_dry_paper.jpg",
          "caption": "An oiled foam element: the oil, not the foam, catches the dust",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "A foam filter works because of its oil; the foam is only the skeleton that holds it. A dry foam passes dirt straight into the engine, and a foam left dripping with oil restricts the air and makes the engine run rich until the excess is drawn in."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Remove",
              "html": "Take the element out; never start the engine with the cover off."
            },
            {
              "title": "Wash",
              "html": "Rinse in solvent or detergent several times, working it until the liquid comes out clean, including any outer coarse layer."
            },
            {
              "title": "Inspect",
              "html": "Foam that tears easily or crumbles has aged; replace it."
            },
            {
              "title": "Dry",
              "html": "Squeeze out the solvent, without wringing, and let the foam dry fully."
            },
            {
              "title": "Oil",
              "html": "Work filter oil, or the oil the manual allows, into every part of the foam with the fingers, then squeeze out the excess."
            },
            {
              "title": "Refit",
              "html": "Seat the element with its seal flat all round, so no air can by-pass it."
            }
          ]
        },
        {
          "type": "p",
          "html": "The full jobs are <a href=\"../repair/repairs/air-filter-service/\">Clean or replace the air filter</a> and <a href=\"../repair/repairs/air-filter-foam-service/\">Service a foam air filter</a>. A blocked filter richens a carburetted engine at every opening and costs a speed-density injected engine power instead (chapter 3.1)."
        },
        {
          "type": "photo",
          "src": "renders/air_filter.webp",
          "caption": "A pleated panel filter seated in its airbox"
        },
        {
          "type": "h3",
          "text": "Intake manifold and air leaks"
        },
        {
          "type": "p",
          "html": "Between the carburettor or throttle body and the cylinder head sits the <strong>intake manifold</strong>, usually a rubber insulator that also keeps engine heat away from the fuel. Air that enters here, through a crack, a loose clamp or a disconnected vacuum pipe, has not passed the jets or been measured by the sensors. It leans the mixture, mostly at idle where the metered flow is smallest."
        },
        {
          "type": "p",
          "html": "The symptoms are a high or hanging idle, popping on the overrun, hesitation and a hot-running engine. Small vacuum pipes on the manifold, for a vacuum tap, a MAP sensor, an emission valve or a blanking cap, are leaks too when they split or fall off. Old rubber hardens and cracks on the underside and at bends, where it cannot be seen without bending it."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Look",
              "html": "Engine cold: bend the rubber gently, look for cracks, check clamps and the seating of carburettor or throttle body, and check every small vacuum pipe and cap."
            },
            {
              "title": "Warm and idle",
              "html": "Warm the engine and note the idle speed."
            },
            {
              "title": "Spray",
              "html": "Mist plain water at one joint at a time. A change in idle speed or a stumble while spraying one place shows the leak."
            },
            {
              "title": "Repair",
              "html": "Replace the cracked part or tighten the clamp; fit new O-rings where the manifold bolts to the head."
            }
          ]
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Spray test safety",
          "html": "Use plain water for the spray test. Never spray carburettor cleaner, brake cleaner or starting fluid on a hot engine: they can ignite. On a two-stroke, air can also enter through a worn crankshaft seal or a leaking crankcase joint, giving a high, hanging idle that can seize the engine; that needs a crankcase pressure test, not a spray. See <a href=\"../repair/repairs/intake-leak-test/\">Find an intake air leak</a>."
        },
        {
          "type": "h3",
          "text": "Intake tuning and reed valves"
        },
        {
          "type": "p",
          "html": "The intake is not a steady stream but a series of pulses, one per intake stroke. A pressure wave reflected from the open end of the intake can arrive at the valve just before it closes and push in a little extra charge; intake length, valve timing and overlap are matched to place this effect where the engine needs torque (chapter 2.2). At other speeds the same wave can push mixture back out of the intake, a reversion that shows as fuel mist standing in front of the carburettor."
        },
        {
          "type": "p",
          "html": "Two-stroke engines usually fit a <strong>reed valve</strong> between carburettor and crankcase: petals of spring steel or composite that open when crankcase pressure falls below intake pressure and close to stop blow-back (chapter 2.3). A few four-strokes have used reeds to reduce reversion. Motorcycle reed blocks usually have four or six petals, held by a curved stop plate that limits their travel. A broken or stuck petal makes the engine hard or impossible to start."
        },
        {
          "type": "h3",
          "text": "The exhaust system"
        },
        {
          "type": "p",
          "html": "The exhaust begins at the <strong>port gasket</strong>, a soft metal ring of copper, steel or a graphite sandwich that crushes under the header flange to seal the hot, pulsing gas. The <strong>header pipe</strong> carries the gas away from the head, usually with a heat shield; on Euro 5 machines it often holds the catalyst and the oxygen sensor. The <strong>silencer</strong> at the rear reduces noise and carries the approval marks."
        },
        {
          "type": "model",
          "file": "exhaust_4t",
          "caption": "A four-stroke exhaust: header with heat shield and a slash-cut silencer."
        },
        {
          "type": "p",
          "html": "Pressure waves matter in the exhaust too. When the exhaust valve opens, a pressure pulse runs down the pipe and reflects from changes of section as a suction wave; arriving during valve overlap, it helps empty the chamber and draw in fresh charge. A four-stroke header length and collector are chosen with the cam for this effect. A two-stroke uses it far more strongly in its tuned expansion chamber, whose length sets the speed of peak power (chapter 2.3)."
        },
        {
          "type": "plate",
          "id": "PT02",
          "caption": "Exhaust systems in section: four-stroke header, catalyst and silencer, and the two-stroke expansion chamber with diffuser, belly, baffle cone and stinger."
        },
        {
          "type": "p",
          "html": "Many two-strokes also carry an exhaust <strong>power valve</strong> in the port, which changes the port height with engine speed. Oily carbon makes it stick, and the engine then goes flat at one end of the rev range (<a href=\"../repair/problems/powervalve-stuck/\">Two-stroke is weak at one end of the rev range</a>). Two-stroke silencers carbon up internally and may need a <a href=\"../repair/repairs/two-stroke-decoke/\">decoke</a>."
        },
        {
          "type": "h3",
          "text": "Silencers, noise and the law"
        },
        {
          "type": "p",
          "html": "A silencer reduces noise by passing the gas through perforated tubes, chambers and absorbent packing that break up and absorb the pressure pulses. Every road machine is type-approved to a sound limit, and its silencer carries approval marks; the K-Light 125 silencer is marked, and many countries require a marked silencer on the road. Loud &ldquo;free-flow&rdquo; silencers and removed baffles are often illegal, and on a carburetted engine they can make the mixture lean and the engine run hot; on an injected engine the fuel map may need matching."
        },
        {
          "type": "p",
          "html": "Off-road two-strokes often have a <strong>spark arrester</strong>, a perforated tube or baffle in the outlet that stops glowing carbon leaving the pipe. Oil and carbon glue it in place and block the flow, costing power; it is freed with penetrating oil and a gentle puller, never left out with the silencer blocked (<a href=\"../repair/repairs/spark-arrester-clean/\">Clean a two-stroke spark arrester</a>)."
        },
        {
          "type": "p",
          "html": "Water vapour from combustion condenses inside a cold pipe, which is why a little white vapour and dripping water on a cold start are normal. The same water rusts silencers from the inside, and chrome can hide the holes until the silencer fails. Mounts crack from vibration, so the brackets and rubbers are checked at every service (<a href=\"../repair/repairs/exhaust-mount-check/\">Check exhaust mounts and heat shields</a>)."
        },
        {
          "type": "h3",
          "text": "Exhaust leaks"
        },
        {
          "type": "p",
          "html": "A leak at the head joint gives a ticking or puffing that follows engine speed, loudest when cold, and black soot streaks or a grey crust round the flange. It does more than make noise. On the overrun the leak draws air into the pipe, where it burns with unburned fuel and pops. On an injected machine that air reaches the oxygen sensor, which then reads lean, so the ECU adds fuel and consumption rises."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Find it",
              "html": "Cold engine: look for soot along every joint. Start it outside and hold a strip of paper near each joint, not touching; a leak flutters it in time with the engine."
            },
            {
              "title": "Tighten",
              "html": "Once cold, tighten loose port nuts evenly, a little at a time. K-Light 125: header flange bolts 5 to 9 N&middot;m, silencer mounting bolt 22 to 29 N&middot;m."
            },
            {
              "title": "Renew the gasket",
              "html": "If the nuts were tight, slide the pipe back, pick out the old gasket and clean the port face. A crushed gasket never seals twice."
            },
            {
              "title": "Refit",
              "html": "New gasket held by a dab of grease (no sealant), all fasteners started by hand, port nuts tightened first, then the silencer mount."
            },
            {
              "title": "Recheck",
              "html": "Run the engine and check again; recheck the nuts cold after the first ride."
            }
          ]
        },
        {
          "type": "p",
          "html": "The full job is <a href=\"../repair/repairs/exhaust-leak-check/\">Find and fix an exhaust leak</a>. Rusted header studs snap easily, so penetrating oil and patience come before force."
        },
        {
          "type": "h3",
          "text": "Cleaning the exhaust gas"
        },
        {
          "type": "p",
          "html": "Chapter 3.4 explained how CO, HC and NOx form and how a three-way catalyst converts them within a narrow window around \\(\\lambda = 1\\). What matters in the workshop is how well the catalyst is still doing its work, and what destroys it."
        },
        {
          "type": "eq",
          "id": "m3-catalyst-efficiency",
          "name": "Catalyst conversion efficiency",
          "tex": "\\eta_{cat} = \\frac{c_{in} - c_{out}}{c_{in}} \\times 100\\,\\%",
          "where": [
            [
              "\\eta_{cat}",
              "conversion efficiency for one pollutant",
              "%"
            ],
            [
              "c_{in}",
              "concentration or mass flow entering the catalyst",
              "ppm or mg/km"
            ],
            [
              "c_{out}",
              "concentration or mass flow leaving it",
              "ppm or mg/km"
            ]
          ],
          "why": "Rates how much of a pollutant a catalyst removes. Euro 5+ catalyst monitoring estimates the same thing indirectly from the oxygen stored, by comparing the oxygen sensors before and after the catalyst.",
          "example": "For example, if 2000 mg/km of CO enters and 300 mg/km leaves, \\(\\eta_{cat} = (2000 - 300)/2000 \\times 100\\,\\% = 85\\,\\%\\). The engine-out figure is far above the Euro 5 limit of 1000 mg/km; only the catalyst brings the tailpipe figure under it."
        },
        {
          "type": "p",
          "html": "A catalyst is poisoned by leaded fuel and by some oil additives, and melted by misfire: unburned mixture that reaches it burns inside the substrate. An exhaust valve that does not seal has the same effect, and the K-Light manual warns that too small an exhaust valve clearance raises exhaust temperature and shortens catalyst and oxygen-sensor life. A partly melted catalyst raises back pressure, giving a high MAP reading at idle and a loss of top speed."
        },
        {
          "type": "p",
          "html": "Any restriction downstream has the same effect as a melted catalyst. A silencer packed with carbon, a blocked spark arrester, a crushed pipe or a nest in the tailpipe of a machine left standing all trap exhaust in the cylinder, so less fresh charge can enter. The engine starts and idles but feels weak, will not rev out and may run hot; a two-stroke is especially sensitive (<a href=\"../repair/problems/exhaust-blocked/\">Two-stroke exhaust is blocked</a>). Check the outlet with a torch before suspecting the engine, and compare top speed and idle MAP with a known good machine."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "A glowing header",
          "html": "A header pipe that glows red, especially at idle or soon after starting, means far too much heat is reaching the exhaust: misfire, a very lean mixture, late ignition or a blocked catalyst. Stop the engine at once, away from dry grass and fuel, let it cool fully, and do not ride until the cause is found (<a href=\"../repair/problems/exhaust-glowing/\">Exhaust pipe glows red</a>)."
        },
        {
          "type": "h3",
          "text": "Secondary air injection"
        },
        {
          "type": "p",
          "html": "<strong>Secondary air injection</strong> admits fresh air into the exhaust port just behind the exhaust valve, where the hot gas burns the remaining CO and HC. Most motorcycle systems are pulse-type (Honda and Suzuki call theirs PAIR): negative exhaust pulses draw air through a reed valve from the airbox, positive pulses close the reed, and a cut valve worked by vacuum or a solenoid closes on deceleration to stop popping."
        },
        {
          "type": "p",
          "html": "Because the extra oxygen passes the oxygen sensor, the ECU must ignore or compensate for it, and many closed-loop designs do without secondary air. A leaking reed or a cracked hose causes loud popping on the overrun, a fault easily mistaken for an exhaust leak or a lean mixture."
        },
        {
          "type": "h3",
          "text": "Type approval and on-board diagnostics"
        },
        {
          "type": "p",
          "html": "Emission limits are met by the whole machine, and the law also demands that they are still met as it ages and that faults are reported. In the EU, L-category vehicles are approved under Regulation (EU) No 168/2013; the limits themselves are in chapter 3.4. Three further requirements shape the hardware."
        },
        {
          "type": "table",
          "head": [
            "Requirement",
            "Euro 5",
            "Euro 5+"
          ],
          "rows": [
            [
              "Dates",
              "New types 1 January 2020; all new vehicles 1 January 2021",
              "New types 1 January 2024; all new registrations 1 January 2025"
            ],
            [
              "Tailpipe limits and test cycle",
              "WMTC; CO 1000, THC 100, NMHC 68, NOx 60 mg/km",
              "Unchanged"
            ],
            [
              "Durability",
              "20 000 km (L3e below 130 km/h) or 35 000 km; a deterioration-factor shortcut allowed",
              "Full or partial mileage accumulation, or bench ageing of the catalyst"
            ],
            [
              "OBD",
              "Stage II: circuit faults and degradation of emission control against threshold limits",
              "Adds catalyst-efficiency monitoring, tighter thresholds and minimum in-use performance ratios (IUPR)"
            ],
            [
              "Limp-home",
              "&ndash;",
              "The MIL or a warning must show when a torque-reducing mode is active"
            ]
          ]
        },
        {
          "type": "p",
          "html": "<strong>OBD stage I</strong>, from Euro 4, detects electrical faults: open circuits, shorts and out-of-range signals of the kind in the K-Light code table. <strong>OBD stage II</strong> adds monitoring of degradation, such as a slow oxygen sensor or a misfire that raises emissions, and lights the MIL when a threshold would be exceeded. In-use performance ratios require each monitor to run often enough in normal riding. The cost of a second oxygen sensor and larger catalysts for full-life durability led some low-volume models to be withdrawn from the EU at the end of 2024."
        },
        {
          "type": "p",
          "html": "India moved directly from BS IV to <strong>Bharat Stage VI</strong> on 1 April 2020, with two-wheeler limits aligned with Euro 5. Phase 2 from 1 April 2023 brought OBD II, with misfire detection from the crankshaft signal, oxygen-sensor monitoring and a standard 16-pin connector; catalyst monitoring was deferred to 1 April 2025 after trials produced false MIL warnings. BS VI machines are also designed for E20 petrol."
        },
        {
          "type": "h3",
          "text": "Two-stroke exhaust emissions"
        },
        {
          "type": "p",
          "html": "A carburetted two-stroke has a built-in emission problem. While the transfer ports deliver fresh mixture, the exhaust port is still open, so part of the charge short-circuits straight into the pipe unburned. Add the oil that every two-stroke burns with its fuel, and the result is high HC and visible smoke that no tuning removes."
        },
        {
          "type": "p",
          "html": "Injecting the fuel after the exhaust port has nearly closed, through the transfer ports or directly into the cylinder, means that only air short-circuits, which removes most of the HC penalty (chapter 2.3). That technology, rather than the carburettor, is what allows two-strokes to meet current limits; a carburetted two-stroke road machine is now mostly a used or off-road machine."
        },
        {
          "type": "table",
          "head": [
            "K-Light 125 intake and exhaust item",
            "Value or interval"
          ],
          "rows": [
            [
              "Air filter element",
              "Sponge (oiled foam) type"
            ],
            [
              "Catalyst position",
              "In the exhaust header (exploded-diagram part 16, exhaust header and catalytic converter)"
            ],
            [
              "Exhaust system",
              "Inspected at every service"
            ],
            [
              "Header joint (connector) bolts",
              "5 to 9 N&middot;m"
            ],
            [
              "Silencer mounting bolt",
              "22 to 29 N&middot;m"
            ],
            [
              "Silencer",
              "Carries approval marks; replace only with a marked part"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Reading the exhaust: smoke colour"
        },
        {
          "type": "p",
          "html": "Smoke colour is the quickest clue to what the engine is burning, though colour alone proves nothing until the plug, oil level and compression agree. Watch from cold, then warm at idle, then while a helper opens the throttle smartly and lets it close."
        },
        {
          "type": "table",
          "head": [
            "What is seen",
            "Most likely",
            "First check"
          ],
          "rows": [
            [
              "Thin white vapour on a cold start that clears and drips water",
              "Normal condensation",
              "None"
            ],
            [
              "Black smoke, dry soot on a white card",
              "Rich mixture",
              "Choke, air filter, float needle or injector"
            ],
            [
              "Blue or grey smoke on opening the throttle",
              "Oil past rings and bore, or rich mixture",
              "Oil level, compression"
            ],
            [
              "Blue smoke after idling or on a closed throttle downhill",
              "Valve stem seals or guides",
              "Compression, valve guides"
            ],
            [
              "Thick white smoke that stays and smells sweet",
              "Coolant burning (liquid-cooled)",
              "Coolant level, oil colour"
            ],
            [
              "Light blue smoke on a two-stroke",
              "Normal oil burning; heavy if the oil ratio or pump is too rich",
              "Premix ratio, pump setting"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The procedure is <a href=\"../repair/repairs/smoke-diagnosis/\">Diagnose exhaust smoke by colour</a>. Do it outside: exhaust carries carbon monoxide, which can kill in a closed room."
        },
        {
          "type": "check",
          "q": "m3-55"
        },
        {
          "type": "check",
          "q": "m3-56"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Intake and exhaust form one air path; any restriction in it, filter, silencer or catalyst, costs power.<br>The airbox tunes intake noise and filling, and the jets or map assume it: a changed, cracked or blocked box upsets the mixture.<br>An oiled foam filter works only when evenly oiled; unmetered air at the manifold leans the idle and is found with a water spray, never a solvent.<br>An exhaust leak pops on the overrun and makes an oxygen sensor read lean; renew the port gasket whenever the header is removed.<br>Misfire, lean running, oil additives and tight exhaust valves destroy catalysts; a glowing header means stop at once.<br>Euro 5 and BS VI require durable emission control and on-board diagnostics; Euro 5+ adds catalyst monitoring with a second oxygen sensor."
        }
      ]
    },
    {
      "id": "m3-fuel-diagnosis",
      "title": "Fuel system diagnosis",
      "lead": "Fuel faults hide behind symptoms that look like ignition, compression or electrical faults. This chapter gives a method that finds them: prove the basics, split the system with simple tests, decide rich or lean from the evidence, and use the ECU's own knowledge on an injected machine.",
      "blocks": [
        {
          "type": "h3",
          "text": "Where fuel faults hide"
        },
        {
          "type": "p",
          "html": "A petrol engine needs four things: fuel and air in the right ratio, a spark at the right moment, and compression to hold the charge. A fuel fault looks like many other faults, so the first rule of fuel diagnosis is to prove that the other three are present before taking a carburettor apart. Many carburettors have been cleaned for a fault that was a broken pick-up, an air leak or tight valves."
        },
        {
          "type": "p",
          "html": "The fuel system itself has three places for a fault: the <strong>supply</strong> (tank, vent, tap, filter, hose, pump; chapter 3.2), the <strong>metering</strong> (carburettor or injection; chapters 3.3 and 3.4), and the <strong>air path</strong> that the metering assumes (filter, airbox, manifold, exhaust; chapter 3.5). Each leaves a different signature: how the engine starts, where in the throttle range it misbehaves, what the plug and the smoke look like, and whether the fault changes with temperature, fuel level or distance."
        },
        {
          "type": "h3",
          "text": "A method that finds the fault"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Confirm the complaint",
              "html": "Ride or run the machine and experience the fault yourself. Note when it happens: cold or hot, at which throttle opening, after how far, at what fuel level."
            },
            {
              "title": "Ask for the history",
              "html": "Has it stood unused? Was it refuelled somewhere new? What work was done last: filter, exhaust, carburettor, battery disconnection?"
            },
            {
              "title": "Check the basics",
              "html": "Fuel really in the tank (look with a torch; gauges lie), tap on, choke position, engine stop switch, oil level, battery voltage."
            },
            {
              "title": "Look and smell",
              "html": "Wet joints, fuel smell, cracked intake rubber, soot at exhaust joints, fuel from the overflow, the colour of the smoke."
            },
            {
              "title": "Test, do not guess",
              "html": "Use one test that splits the system in two: fuel shot, flow test, plug reading, spray test, pressure or code reading."
            },
            {
              "title": "Repair the cause",
              "html": "Fix what the tests point to, and find why it happened: the rust that blocked the filter, the vent that caused the vacuum."
            },
            {
              "title": "Verify",
              "html": "Repeat the conditions that caused the fault: road test across the throttle range, hot and cold, and a fill-to-fill test if consumption was the complaint."
            }
          ]
        },
        {
          "type": "p",
          "html": "Write each result down. Four facts together, for example smoke colour, when it appears, oil level and plug colour, point to a cause far more reliably than any one of them. The general method is <a href=\"../repair/repairs/diagnosis-method/\">Find a fault step by step</a>."
        },
        {
          "type": "h3",
          "text": "Fuel or not fuel"
        },
        {
          "type": "p",
          "html": "When an engine cranks but will not start, one test separates a fuel fault from everything else. A few drops of fresh fuel put straight into the intake should make a healthy engine fire, run for a moment and die. If it does, spark and compression are present and the fault is in the fuel path. If it does not fire at all, more fuel will not help: look at spark, compression, timing and air leaks."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Prove spark and compression first",
              "html": "<a href=\"../repair/repairs/spark-test/\">Check for a spark safely</a> and <a href=\"../repair/repairs/compression-test/\">Test engine compression</a>."
            },
            {
              "title": "Add a little fuel",
              "html": "A few drops of fresh fuel into the carburettor throat, or through the plug hole with the plug refitted before cranking."
            },
            {
              "title": "Crank once or twice",
              "html": "Key on, finger near the stop switch. A good engine fires, revs briefly and dies."
            },
            {
              "title": "Repeat once only",
              "html": "A few more drops, once. Never keep feeding fuel or starting fluid into an engine that will not fire."
            },
            {
              "title": "Read the result",
              "html": "Fires: supply or carburettor. Fires and runs only on the choke: idle circuit blocked. No fire: not a fuel fault."
            }
          ]
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Fuel shot safety",
          "html": "Use only a little fuel, outdoors, with an extinguisher in reach. Raw fuel that reaches a hot exhaust can ignite or blow a silencer apart, and starting fluid used freely can damage an engine. Do not use the test on an engine that already smells strongly of fuel: it is probably flooded. See <a href=\"../repair/repairs/fuel-shot-test/\">Test fuel supply with a small shot of fuel</a>."
        },
        {
          "type": "h3",
          "text": "Is fuel arriving, and enough of it?"
        },
        {
          "type": "p",
          "html": "On a carburettor, open the float-bowl drain screw over a container: fuel running out proves fuel has reached the bowl. Then do the flow test into a jar on ON and RES (chapter 3.2). Weak flow on both points to the vent, a strainer or the filter; flow that improves with the cap open points to the vent. On an injected machine, listen for the pump's 3-second prime at key-on, and leave pressure testing to a workshop with a 0 to 600 kPa gauge."
        },
        {
          "type": "p",
          "html": "How much flow is enough? The engine's demand at full power is surprisingly small, which is why a partly blocked filter often shows only at full throttle or uphill, when demand peaks."
        },
        {
          "type": "eq",
          "id": "m3-fuel-demand",
          "name": "Fuel demand at a given power",
          "tex": "\\dot V_f = \\frac{P}{\\eta_b\\, Q_{LHV}\\, \\rho_f}",
          "where": [
            [
              "\\dot V_f",
              "volume flow of fuel the engine burns",
              "L/s"
            ],
            [
              "P",
              "brake power at the crankshaft",
              "kW"
            ],
            [
              "\\eta_b",
              "brake thermal efficiency (small air-cooled engines typically 0.28 to 0.32 at best)",
              "-"
            ],
            [
              "Q_{LHV}",
              "lower heating value of petrol, about 43 000",
              "kJ/kg"
            ],
            [
              "\\rho_f",
              "fuel density, about 0.74",
              "kg/L"
            ]
          ],
          "why": "Sets the yardstick for a flow test: the supply must deliver at least the full-power demand with a margin to spare, and a test that falls near that figure explains starvation at full throttle.",
          "example": "For the K-Light 125 at its 7.8 kW peak with \\(\\eta_b = 0.30\\): \\(\\dot V_f = 7.8/(0.30 \\times 43\\,000 \\times 0.74) \\approx 8.2 \\times 10^{-4}\\ \\mathrm{L/s}\\), about 2.9 L/h or 49 mL per minute. A healthy gravity flow test fills a jar many times faster."
        },
        {
          "type": "h3",
          "text": "Rich or lean?"
        },
        {
          "type": "p",
          "html": "Most running faults come down to a mixture that is too rich or too lean somewhere in the range. The evidence for each is different, and gathering two or three pieces before changing anything prevents the most common error: correcting one fault with the wrong part, such as fitting a smaller main jet to cure a rich mid-range."
        },
        {
          "type": "table",
          "head": [
            "Evidence",
            "Rich",
            "Lean"
          ],
          "rows": [
            [
              "Spark plug after a clean cut",
              "Black, dry and sooty",
              "White, chalky or blistered"
            ],
            [
              "Exhaust",
              "Black smoke, fuel smell, soot on a white card",
              "Popping on the overrun, hot pipe"
            ],
            [
              "Engine behaviour",
              "Heavy, lumpy running, misfire under load, worse when hot",
              "Hesitation, surging, pinking, high or hunting idle, runs hot"
            ],
            [
              "Choke test at the fault opening",
              "Runs worse with a little choke",
              "Runs better with a little choke"
            ],
            [
              "Carburettor",
              "Spits fuel from the intake mouth",
              "Spits back through the carburettor"
            ],
            [
              "Fuel consumption",
              "Rises",
              "Usually unchanged or falls"
            ]
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/085_spark_plug.jpg",
          "caption": "A plug insulator coated in dry black soot: the sign of a rich mixture",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "Plug reading needs a clean plug, an engine at working temperature and a run of a mile or two at the throttle opening under test, then ignition off and throttle shut together, so idle does not spoil the colour. A normal plug is light tan to grey. See <a href=\"../repair/repairs/spark-plug-reading/\">Read a spark plug</a>."
        },
        {
          "type": "p",
          "html": "On a carburettor, the throttle opening at which the fault appears names the part to look at: pilot below 1/8, cutaway from 1/8 to 1/4, needle from 1/4 to 3/4, main jet above 3/4 (chapter 3.3). The faults that change the mixture everywhere at once come first, because no jet change cures them: float height, air filter, choke and air leaks."
        },
        {
          "type": "h3",
          "text": "Causes that richen or lean everything"
        },
        {
          "type": "table",
          "head": [
            "Cause",
            "Effect on mixture",
            "Typical sign"
          ],
          "rows": [
            [
              "Blocked or over-oiled air filter",
              "Rich at all openings (carburettor)",
              "Black smoke, high consumption; better with the filter out briefly"
            ],
            [
              "Choke or enricher partly on",
              "Rich, mostly at small openings",
              "Black smoke and fouled plug once warm"
            ],
            [
              "Float needle leaking, float sinking or set high",
              "Rich",
              "Fuel from the overflow, fuel in the oil"
            ],
            [
              "Float set low, partly blocked supply",
              "Lean, worst at full throttle",
              "Starves on long climbs and at high speed"
            ],
            [
              "Intake air leak",
              "Lean, worst at idle",
              "High hanging idle, popping, idle changes with a water spray"
            ],
            [
              "Altitude or very hot air",
              "Rich (carburettor)",
              "Black smoke at height; injection corrects"
            ],
            [
              "Ethanol blend in a petrol-jetted carburettor",
              "Lean, about 4 % on E10",
              "Hesitation, hotter running"
            ],
            [
              "Exhaust leak before the oxygen sensor",
              "Sensor reads lean, ECU richens (injection)",
              "Popping, soot at the joint, high consumption"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Injection: let the ECU help"
        },
        {
          "type": "p",
          "html": "An injected machine watches its own sensors, so diagnosis starts with what the ECU knows. At key-on the K-Light FI lamp lights as a bulb check and then goes out after starting; a lamp that never lights means the ECU has no power or earth, so the fuse, earth and ECU connector come first. Stored codes are then read by blink code, generic scan tool or manufacturer tool (<a href=\"../repair/repairs/efi-code-read/\">Read engine fault codes</a>); the K-Light manual requires more than 8.5 V at the battery while a tool is connected."
        },
        {
          "type": "p",
          "html": "A code points to a circuit, not a part: a temperature-sensor code is caused as often by a backed-out connector pin as by the thermistor. The K-Light manual also warns that an unstable earth can set codes that do not match the fault; the remedy it gives is to remake the earth, disconnect the battery for 3 minutes and restart. Live data then checks plausibility: engine temperature that rises from ambient, a throttle signal that sweeps smoothly, an oxygen sensor that switches when warm."
        },
        {
          "type": "table",
          "head": [
            "Test",
            "K-Light 125 value",
            "Fault if"
          ],
          "rows": [
            [
              "Pump supply in the first 3 s and while cranking",
              "12 &plusmn; 2 V at the connector",
              "No voltage: fuse, relay, wiring or no crank signal"
            ],
            [
              "Fuel pressure at idle",
              "about 300 kPa",
              "Below 270 kPa: leak, blocked filter, weak or reversed pump"
            ],
            [
              "Injector winding",
              "about 10 &Omega;",
              "Open or shorted; check pulses with a noid light"
            ],
            [
              "Idle stepper winding",
              "about 50 &Omega;",
              "Open or shorted"
            ],
            [
              "Oxygen sensor, warm",
              "Switching either side of 500 mV",
              "Always above 500 mV: rich or loose sensor; stuck mid-range: inactive"
            ]
          ]
        },
        {
          "type": "p",
          "html": "After throttle-body cleaning, a battery disconnection or a part change, many systems must relearn idle before they run properly (<a href=\"../repair/repairs/idle-relearn/\">Reset the idle after throttle body work</a>). The full EFI symptom table is in chapter 3.4."
        },
        {
          "type": "h3",
          "text": "Symptom guide"
        },
        {
          "type": "table",
          "head": [
            "Symptom",
            "Most likely fuel causes",
            "First test"
          ],
          "rows": [
            [
              "Cranks, no start, plug dry",
              "No fuel: tap, vent, blocked pilot jet; injection pump or pressure",
              "Fuel shot; bowl drain; pump prime"
            ],
            [
              "Cranks, no start, plug wet",
              "Flooding: choke left on, float needle stuck, leaking injector, temperature sensor open",
              "Clear the flood; check overflow and sensor"
            ],
            [
              "Starts on the choke, dies without it",
              "Blocked pilot jet or idle passages",
              "Clean the pilot circuit"
            ],
            [
              "Stalls at idle when hot",
              "Idle set cold, dirty throttle body, vapour lock",
              "Set idle warm; check hose routing"
            ],
            [
              "Stops after several kilometres, cap hisses",
              "Blocked tank vent or canister",
              "Vent check"
            ],
            [
              "Hesitates when the throttle opens",
              "Lean transition, air leak, CV diaphragm, too much cable free play",
              "Spray test; choke test; free play 3 to 5 mm on the K-Light"
            ],
            [
              "Pops on the overrun",
              "Exhaust leak, lean idle, air leak, secondary-air reed",
              "Soot at joints; spray test"
            ],
            [
              "Black smoke, high consumption",
              "Filter, choke, float needle, leaking injector, failed oxygen sensor",
              "Smoke and plug; overflow; codes"
            ],
            [
              "Loses power at high speed",
              "Restricted filter or supply, blocked catalyst or silencer",
              "Flow test; outlet check; pressure under load"
            ],
            [
              "Oil level rising, oil smells of petrol",
              "Float needle leaking with a split vacuum tap or tap left on",
              "Overflow; vacuum-tap check; change the oil"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Each line has its own step-by-step page in the repair section, for example <a href=\"../repair/problems/cranks-no-start/\">Engine turns over but will not start</a>, <a href=\"../repair/problems/hesitation/\">Hesitation</a>, <a href=\"../repair/problems/runs-lean/\">Engine runs hot and lean</a>, <a href=\"../repair/problems/runs-rich/\">Engine runs rich</a>, <a href=\"../repair/problems/high-fuel-use/\">Uses more fuel than normal</a> and <a href=\"../repair/problems/oil-smells-fuel/\">Oil smells of petrol</a>."
        },
        {
          "type": "h3",
          "text": "Job sheet: a carburetted engine that will not start after storage"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Basics",
              "html": "Fresh fuel in the tank, battery charged, stop switch on, choke on, throttle closed for an enricher-type choke."
            },
            {
              "title": "Is fuel arriving?",
              "html": "Drain a sample from the bowl into a clear jar. Stale fuel smells of varnish and looks dark; water lies in a layer at the bottom."
            },
            {
              "title": "Drain and refill",
              "html": "If the sample is stale or wet, drain tank, hose and bowl and refill with fresh fuel: <a href=\"../repair/repairs/drain-fuel/\">Drain old or contaminated fuel</a>."
            },
            {
              "title": "Fuel shot",
              "html": "With spark and compression proven, a few drops in the intake. Fires and dies: the carburettor is not delivering."
            },
            {
              "title": "Clean the carburettor",
              "html": "Pilot jet, starter jet and idle passages are the usual blockages after storage: <a href=\"../repair/repairs/carburettor-clean/\">Clean the carburettor</a>."
            },
            {
              "title": "Check the float",
              "html": "Needle seals, float height correct, no overflow with the tap on."
            },
            {
              "title": "Restart and set",
              "html": "Warm up, set idle speed and mixture, check for intake leaks, road test across the range."
            }
          ]
        },
        {
          "type": "photo",
          "src": "repair-photos/060_however_good_take_moisture_water_out.jpg",
          "caption": "A fuel sample in a glass jar: water has settled in a clear layer under the petrol",
          "credit": "Photo: Dan's Motorcycle Repair Course (dansmc.com), used with permission."
        },
        {
          "type": "p",
          "html": "The same sequence, with the battery, tyres and brakes added, is <a href=\"../repair/repairs/recommission-after-storage/\">Bring a bike back into use after storage</a>. To prevent a repeat, add a stabiliser before the next lay-up and turn the tap off, or drain the float bowl."
        },
        {
          "type": "h3",
          "text": "Job sheet: an engine that dies after a few kilometres"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Note the pattern",
              "html": "How far, or how long, before it dies? Does it restart at once, after a wait, or only on reserve? Is the fuel level low?"
            },
            {
              "title": "Cap test",
              "html": "When it dies, open the filler cap slowly. A hiss and a clean restart point to a blocked vent or canister: <a href=\"../repair/repairs/tank-vent-check/\">Check the fuel tank vent</a>."
            },
            {
              "title": "Reserve test",
              "html": "Runs on RES but not on ON with fuel above reserve: blocked ON pick-up or screen. Dies on both: go on."
            },
            {
              "title": "Flow test",
              "html": "Measure flow into a jar on both positions. Weak flow: strainer, inline filter or kinked hose; rust in the filter means the tank needs attention."
            },
            {
              "title": "Heat test",
              "html": "Dies only in hot weather or traffic and restarts once cool: look for a hose or carburettor near the exhaust (vapour lock), then at ignition parts that fail when hot."
            },
            {
              "title": "Injection",
              "html": "Pump buzz at key-on, codes, and a pressure test under load by a workshop."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Worked example: a thirsty commuter"
        },
        {
          "type": "p",
          "html": "A rider reports that a carburetted 125 now covers far fewer kilometres per tank. The first step is a number, not an impression: a fill-to-fill test over two tanks confirms consumption up by about a third against the rider's earlier records, with the same commute and the same rider."
        },
        {
          "type": "p",
          "html": "The K-Light manual's checklist for high consumption starts outside the fuel system: riding style, load and gear choice, dragging wheels or brakes, tyre pressure and fuel leaks. Here the wheels spin freely, the tyres are at pressure and no joint is wet. The plug is dry black soot and a white card held at the outlet collects soot: the mixture is rich at idle and low openings."
        },
        {
          "type": "p",
          "html": "The causes that richen everything come next. The choke cable has free play and the plunger seats fully. The foam air filter, however, is clogged with dust and old oil. Cleaned and correctly oiled, it restores a tan plug, and a repeat fill-to-fill test brings consumption back to the old figure. No jet was changed, and none should have been."
        },
        {
          "type": "h3",
          "text": "Multi-cylinder engines and intermittent faults"
        },
        {
          "type": "p",
          "html": "On a twin or four, a fault may sit in one cylinder only. A header that stays cooler than its neighbour at idle, an uneven plug colour or vibration at low speed points to one carburettor or throttle body out of balance, a blocked jet in one carburettor, or one intake rubber leaking. Compare the plugs side by side, then synchronise with vacuum gauges (chapter 3.1) after the individual fault is fixed, never before."
        },
        {
          "type": "p",
          "html": "Faults that come and go are usually connections: a harness chafing on the frame, a connector pin backing out, an earth that loosens with heat. The ECU classes faults as steady-state or intermittent, and most systems store a freeze frame of speed, temperature and load at the moment the fault was set, which tells the technician the conditions to recreate. Wiggling the harness and connectors while watching live data often reproduces the fault in the workshop."
        },
        {
          "type": "h3",
          "text": "Flooding and fuel in the oil"
        },
        {
          "type": "p",
          "html": "A flooded engine has more fuel in the cylinder than the spark can light: the plug is wet and the machine smells of fuel. Turn the fuel off, wait, then crank with the throttle held fully open to clear the cylinder, and dry or change the plug. On many injected engines, cranking with the throttle held wide open selects a clear-flood mode that cuts or reduces injection; the manual confirms whether yours has one. See <a href=\"../repair/repairs/clear-flooded-engine/\">Clear a flooded engine</a>."
        },
        {
          "type": "p",
          "html": "Flooding that recurs after standing is a float-needle fault, and it has a hidden cost: fuel that overflows into the intake runs down into the crankcase. A rising oil level and a petrol smell on the dipstick mean the oil has lost much of its strength. Repair the needle, and the vacuum tap if it was flowing, then change the oil and filter before running the engine again."
        },
        {
          "type": "h3",
          "text": "Fuel smell and leaks"
        },
        {
          "type": "p",
          "html": "A smell of fuel around the machine always has a source, and it is found before the machine is ridden. Look in order at the hose joints and clips, the tap and its tank seal, the carburettor overflow and bowl gasket, the pump or sender seal under the tank, the filler cap seal and, on machines with evaporative control, the canister hoses. Fuel leaking near a hot engine or exhaust can start a fire: a machine with a wet fuel joint is not ridden until it is repaired (<a href=\"../repair/problems/fuel-smell/\">Strong smell of fuel</a>, <a href=\"../repair/problems/fuel-leak/\">Fuel is leaking or dripping</a>)."
        },
        {
          "type": "h3",
          "text": "Two-stroke specifics"
        },
        {
          "type": "p",
          "html": "A two-stroke adds two fuel-related risks. Its oil arrives with the fuel, so a wrong premix ratio or a faulty oil pump starves the bearings or fills the exhaust with smoke. Water in the tank is worse than on a four-stroke: an ethanol blend can carry water through the carburettor ahead of the oiled fuel, and the big-end bearing then runs without lubrication."
        },
        {
          "type": "p",
          "html": "An air leak through a crankshaft seal or crankcase joint gives a high, hanging idle and a lean mixture that can seize the piston, and it cannot be found with a spray at the intake. Any two-stroke that idles high and runs hot is stopped and pressure-tested before it is ridden again."
        },
        {
          "type": "h3",
          "text": "Instruments for fuel diagnosis"
        },
        {
          "type": "table",
          "head": [
            "Tool",
            "Used for"
          ],
          "rows": [
            [
              "Clear glass jar and fuel can",
              "Flow tests and fuel samples: water, rust, stale fuel"
            ],
            [
              "Spray bottle of plain water",
              "Finding intake air leaks"
            ],
            [
              "White card and torch",
              "Smoke colour and soot; looking into tanks and outlets"
            ],
            [
              "Plug spanner and spare plugs",
              "Plug reading after a clean cut"
            ],
            [
              "Digital multimeter with buzzer",
              "Pump, injector, sensor and wiring checks"
            ],
            [
              "0 to 600 kPa fuel pressure gauge",
              "Injection pressure (workshop job)"
            ],
            [
              "Vacuum gauges or electronic balancer",
              "Synchronising multi-cylinder carburettors or throttle bodies"
            ],
            [
              "Scan tool or blink-code jumper",
              "Codes, live data, actuator tests, relearns"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Verifying the repair"
        },
        {
          "type": "p",
          "html": "A fuel repair is finished only when the fault has been reproduced and has failed to appear. Ride at the throttle openings and temperatures where the fault lived, from cold and fully hot, and on a long climb if it was starvation. Read the plug once more after a clean cut, and on an injected machine clear the codes and confirm that none return and the oxygen sensor switches."
        },
        {
          "type": "p",
          "html": "Where consumption was the complaint, repeat the fill-to-fill test over two or three tanks and compare with the figure before the repair. Write down jet sizes, needle clip position and screw settings in the service record, so the next technician starts from facts."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Working safely on fuel faults",
          "html": "Fuel diagnosis means open fuel, hot engines and sparks in the same place. Work outdoors, keep an extinguisher within reach, wipe spills at once and never leave fuel draining unattended. Relieve injection pressure before opening a line, never spray solvents on a hot engine, and run engines only in the open air: exhaust carbon monoxide kills in a closed room."
        },
        {
          "type": "check",
          "q": "m3-57"
        },
        {
          "type": "check",
          "q": "m3-58"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Prove spark and compression first; a fuel shot then shows in one test whether the fault is in the fuel path.<br>Fuel demand at full power is small (about 49 mL per minute for the K-Light at 7.8 kW), so a partial blockage shows first at full throttle or uphill.<br>Decide rich or lean from two or three pieces of evidence: plug, smoke, behaviour and the choke test.<br>Fix the causes that affect every opening first, filter, choke, float and air leaks, before changing any jet.<br>On injection, read the codes and live data, but treat a code as a circuit to test, not a part to replace.<br>Verify every repair under the conditions that caused the fault, and record the settings."
        }
      ]
    }
  ],
  "gkey": "m3"
};
