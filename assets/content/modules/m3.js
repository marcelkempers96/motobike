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
    }
  ],
  "gkey": "m3"
};
