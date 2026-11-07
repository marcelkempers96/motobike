/* Motopedia: Module 3 lessons. Edit freely: block types are p, h3, keys, steps, table, callout,
   figure (interactive), plate (course plate id), model/models (3D GLB), photo (render), check (question id). */
export default {
  "id": "fuel-ignition",
  "num": "3",
  "title": "Fuel, ignition and electrical systems",
  "intro": "How a motorcycle meters air and fuel, times its spark, generates and stores electrical energy, and how a technician measures each circuit from battery to sensor.",
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
    },
    {
      "id": "m3-ignition",
      "title": "Ignition systems",
      "lead": "A 12 V battery cannot jump a spark plug gap; that needs thousands of volts, delivered at exactly the right crank angle, thousands of times a minute. The ignition system is a voltage multiplier and a precision clock in one.",
      "lab": "overview/?mode=4t&part=spark_plug",
      "blocks": [
        {
          "type": "h3",
          "text": "What the spark has to do"
        },
        {
          "type": "p",
          "html": "The spark must ionise the gas between the electrodes and deliver enough energy to start a self-sustaining flame kernel. The <strong>breakdown voltage</strong> rises with a wider gap, with gas density at the moment of firing (so with compression ratio and load), with worn rounded electrodes and with lean mixture, and falls with temperature."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Plug needs",
              "v": "5&ndash;25 kV",
              "p": "5&ndash;10 kV at idle new, 15&ndash;25 kV at full load worn"
            },
            {
              "l": "K-Light coil gives",
              "v": "25&ndash;35 kV",
              "p": "from a 9&ndash;14 V supply: the gap is the ignition reserve"
            },
            {
              "l": "Spark energy",
              "v": "20&ndash;80 mJ",
              "p": "far above the &lt;1 mJ lab minimum, for lean or fouled conditions"
            }
          ]
        },
        {
          "type": "p",
          "html": "The difference between what the coil can deliver and what the plug needs is the <strong>ignition reserve</strong>. The K-Light coil gives 25&ndash;35 kV from a 9&ndash;14 V supply, comfortably above the requirement of its 0.7 mm gap; as the plug wears the requirement climbs until, under full load, the reserve runs out and the engine misfires."
        },
        {
          "type": "h3",
          "text": "The ignition coil"
        },
        {
          "type": "photo",
          "src": "repair-photos/021_low_tension_magneto.jpg",
          "caption": "Low-tension magneto with a separate ignition coil"
        },
        {
          "type": "photo",
          "src": "repair-photos/090_electronic_ignition.jpg",
          "caption": "Source and trigger coils of an electronic ignition"
        },
        {
          "type": "p",
          "html": "The coil is a step-up transformer: a <strong>primary</strong> of a few hundred thick turns and a <strong>secondary</strong> of <strong>15 000&ndash;25 000</strong> fine turns on one laminated iron core. Current in the primary stores energy in the magnetic field. When that current is interrupted, the collapsing field induces an <strong>inductive kick</strong> of 200&ndash;400 V in the primary, and the turns ratio of about 100:1 multiplies it to <strong>20&ndash;40 kV</strong>."
        },
        {
          "type": "eq",
          "id": "m3-turns-ratio",
          "name": "Coil secondary voltage from the turns ratio",
          "tex": "V_s \\approx V_p\\,\\frac{N_s}{N_p}",
          "where": [
            [
              "V_s",
              "secondary (spark plug) voltage available",
              "V"
            ],
            [
              "V_p",
              "primary voltage at the inductive kick",
              "V"
            ],
            [
              "N_s",
              "secondary turns",
              ""
            ],
            [
              "N_p",
              "primary turns",
              ""
            ]
          ],
          "why": "It explains how a 12 V system makes tens of kilovolts, and why a coil with shorted secondary turns gives a weak spark although its primary tests good.",
          "example": "A \\(300\\ \\mathrm{V}\\) kick with 20 000 and 200 turns: \\(V_s \\approx 300 \\times 20\\,000 / 200 = 30\\ \\mathrm{kV}\\)."
        },
        {
          "type": "eq",
          "id": "m3-coil-energy",
          "name": "Energy stored in an ignition coil",
          "tex": "E = \\tfrac{1}{2}\\,L\\,I^2",
          "where": [
            [
              "E",
              "energy stored in the magnetic field",
              "J"
            ],
            [
              "L",
              "primary inductance",
              "H"
            ],
            [
              "I",
              "primary current at the moment it is interrupted",
              "A"
            ]
          ],
          "why": "Spark energy depends on the square of the current at the firing point, so low battery voltage or too short a dwell weakens the spark sharply.",
          "example": "\\(L = 4\\ \\mathrm{mH}\\) at \\(3\\ \\mathrm{A}\\): \\(E = \\tfrac{1}{2} \\times 0.004 \\times 3^2 = 0.018\\ \\mathrm{J} = 18\\ \\mathrm{mJ}\\)."
        },
        {
          "type": "p",
          "html": "The voltage rises only until the plug gap breaks down, then falls to a burn voltage of about 1&ndash;2 kV while the remaining energy discharges across the arc for 1&ndash;2 ms. The coil therefore never reaches its full output unless the gap is very wide or the HT circuit is open, which is why an open lead stresses the coil insulation."
        },
        {
          "type": "photo",
          "src": "repair-photos/021_find_out_what.jpg",
          "caption": "Flywheel magneto with the flywheel fitted"
        },
        {
          "type": "figure",
          "fig": "ignition-coil",
          "caption": "Change the primary voltage and the turns ratio and watch the secondary voltage. Try 300 V with a 100:1 ratio."
        },
        {
          "type": "engine",
          "shot": "05-generator-electric-start",
          "view": "gen",
          "caption": "The pick-up reads the flywheel and the CDI fires the coil. Start the engine and watch the spark follow the crank."
        },
        {
          "type": "eq",
          "id": "m3-ohms-law",
          "name": "Ohm's law",
          "tex": "V = I\\,R",
          "where": [
            [
              "V",
              "voltage across the component or section",
              "V"
            ],
            [
              "I",
              "current through it",
              "A"
            ],
            [
              "R",
              "resistance",
              "Ω"
            ]
          ],
          "why": "The basis of every electrical check on a motorcycle: it gives coil and lamp currents from resistance, and turns a small resistance at high current into the voltage drop that a meter can find.",
          "example": "The K-Light coil primary is \\(4\\ \\Omega\\), so at 12 V it draws \\(I = V/R = 12/4 = 3\\ \\mathrm{A}\\); at 14 V, \\(3.5\\ \\mathrm{A}\\)."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Primary current",
              "html": "12 V across the K-Light \\(4\\ \\Omega\\) primary: \\(I = V/R = 3\\ \\mathrm{A}\\)."
            },
            {
              "title": "Stored energy",
              "html": "With \\(L = 4\\ \\mathrm{mH}\\): \\(E = \\tfrac{1}{2} \\times 0.004 \\times 3^2 = 18\\ \\mathrm{mJ}\\)."
            },
            {
              "title": "Secondary voltage",
              "html": "\\(300\\ \\mathrm{V}\\) kick \\(\\times\\ 20\\,000 / 200\\) turns \\(= 30\\ \\mathrm{kV}\\)."
            }
          ]
        },
        {
          "type": "p",
          "html": "K-Light coil values: primary <strong>4 &Omega;</strong> &plusmn; 10&ndash;15 %, secondary <strong>18.6 k&Omega;</strong> &plusmn; 15 % through the plug cap and <strong>13.6 k&Omega;</strong> without, so the suppressor cap is about 5 k&Omega;. A reading of 40 k&Omega; through the cap means a cap of about 26 k&Omega; (or a partly open secondary): measure the cap alone and replace it. Practice: <a href=\"../repair/repairs/ignition-coil-test/\">ignition coil test</a>, <a href=\"../repair/repairs/spark-test/\">spark test</a>."
        },
        {
          "type": "h3",
          "text": "Try it: charge the coil and fire the plug"
        },
        {
          "type": "animation",
          "part": "spark_plug",
          "mode": "4t",
          "caption": "Hold IGNITE to build the field in the coil, then release to fire. Release too early and it misfires. The graph shows how the voltage needed rises with the gap."
        },
        {
          "type": "check",
          "q": "m3-13"
        },
        {
          "type": "h3",
          "text": "Four ways to switch the coil"
        },
        {
          "type": "table",
          "head": [
            "System",
            "How it works",
            "Strength / weakness"
          ],
          "rows": [
            [
              "Contact breaker (points)",
              "Cam opens points; condenser 0.2&ndash;0.3 &micro;F stops arcing; gap 0.3&ndash;0.4 mm sets dwell",
              "Simple; wears, needs regular service, dwell too short at high rpm"
            ],
            [
              "AC-CDI",
              "Exciter coil on stator charges a capacitor to 100&ndash;400 V; SCR dumps it into the coil",
              "Needs no battery; weak spark at kickstart speed"
            ],
            [
              "DC-CDI",
              "Battery charges the capacitor through an inverter",
              "Spark independent of cranking speed; dead with a flat battery"
            ],
            [
              "TCI / ECU",
              "Transistor (IGBT) switches an inductive coil; ECU calculates dwell and advance",
              "Long spark (1&ndash;2 ms) for four-stroke part-load; no adjustment"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Contact-breaker ignition"
        },
        {
          "type": "p",
          "html": "Until the late 1970s most motorcycles switched the coil primary with <strong>points</strong> opened by a cam. A <strong>condenser</strong> across them absorbs the inductive kick long enough for the contacts to separate without arcing. The point gap sets the <strong>dwell</strong>, the crank angle for which the points are closed and the field builds; a wider gap means the rubbing block meets the cam ramp earlier, so the points open earlier (more advance) and close later (less dwell)."
        },
        {
          "type": "p",
          "html": "Because gap and timing are linked, always gap first and time second: statically with a test lamp or buzzer at the F mark , then dynamically with a timing light. Points need service every few thousand kilometres, the rubbing block wears, and at high rpm the dwell becomes too short for the coil to saturate, which is why electronic switching replaced them. <strong>Energy-transfer</strong> magnetos on older off-road machines feed the ignition coil directly from a flywheel generator coil, without a battery."
        },
        {
          "type": "h3",
          "text": "Capacitor discharge and transistor ignition"
        },
        {
          "type": "p",
          "html": "In a CDI a capacitor (typically 0.5&ndash;2 \\(\\mu\\)F) is charged to 200&ndash;400 V and dumped into the coil primary through a thyristor (SCR) when the trigger pulse arrives. The coil then acts as a pulse transformer rather than an energy store, so CDI coils have a very low primary resistance (0.1&ndash;1 &Omega;). Secondary voltage rises in a few microseconds, ten times faster than an inductive system, so the spark fires before energy leaks across an oily insulator: that is why <strong>two-strokes favour CDI</strong>. The price is a short spark of 0.1&ndash;0.3 ms."
        },
        {
          "type": "p",
          "html": "CDI timing comes from a <strong>pulser coil</strong> facing a raised tab on the flywheel. Early units took their advance from the shape of the pulser waveform; later digital CDI units hold a stored advance curve in a microcontroller."
        },
        {
          "type": "p",
          "html": "A <strong>TCI</strong> keeps the inductive coil but switches it with a power transistor (usually an IGBT). The unit calculates dwell so the coil reaches target current just before the firing point and limits the current to protect the coil. On an injected engine the ECU drives the coil itself: the K-Light ignition is electronic automatic advance held in the ECU and needs no adjustment, and the primary driver is monitored (codes P2300 and P2301)."
        },
        {
          "type": "p",
          "html": "The ECU reads crank position from the CKP sensor, load from MAP and TPS, and temperature, and looks advance up in a three-dimensional <strong>ignition map</strong>. It retards for cold starts, trims advance quickly to hold idle speed, and retards for knock protection, quickshifter gear changes and traction-control intervention. Multi-cylinder engines use a <strong>wasted-spark</strong> coil per pair of cylinders (one on compression, its partner on exhaust) or a <strong>stick coil</strong> on each plug, which removes HT leads altogether."
        },
        {
          "type": "photo",
          "src": "repair-photos/088_centrifugal_advance.jpg",
          "caption": "Centrifugal advance weights and springs on the points cam"
        },
        {
          "type": "photo",
          "src": "repair-photos/088_points_condenser_cdi_box.jpg",
          "caption": "Points, condenser and CDI box side by side"
        },
        {
          "type": "plate",
          "id": "F22",
          "caption": "Ignition circuits: AC-CDI with exciter and pulser coils, and DC-TCI or ECU-controlled inductive ignition."
        },
        {
          "type": "photo",
          "src": "repair-photos/090_trigger_source_coils.jpg",
          "caption": "Source and trigger coils under a flywheel magneto: the source coil charges the CDI, the trigger coil tells it when to fire."
        },
        {
          "type": "photo",
          "src": "repair-photos/091_centrifugal_advance.jpg",
          "caption": "Centrifugal advance unit: weights fly out as rpm rises and turn the trigger earlier, so the spark fires further before top dead centre. Most engines reach full advance by about 3,000 rpm."
        },
        {
          "type": "wiring",
          "tab": "ignition",
          "caption": "Crank the engine and watch the primary current build in the coil and collapse at the trigger point, producing the secondary spark; compare the CDI and TCI/ECU variants and find where the kill switch interrupts each."
        },
        {
          "type": "p",
          "html": "Practice: <a href=\"../repair/repairs/pickup-test/\">pick-up coil test</a>, <a href=\"../repair/repairs/cdi-ecu-diagnosis/\">CDI and ECU diagnosis</a>."
        },
        {
          "type": "h3",
          "text": "Timing and advance"
        },
        {
          "type": "p",
          "html": "The flame takes a roughly constant 1&ndash;3 ms to burn the charge, depending on mixture and turbulence, and peak pressure should arrive about 10&ndash;15&deg; after TDC for maximum work. As rpm rises, the same burn time spans more crank angle, so the spark must start earlier."
        },
        {
          "type": "eq",
          "id": "m3-crank-angle-time",
          "name": "Time for a crank angle",
          "tex": "t = \\frac{\\theta}{6\\,n}",
          "where": [
            [
              "t",
              "time taken to turn through the angle",
              "s"
            ],
            [
              "\\theta",
              "crank angle",
              "degrees"
            ],
            [
              "n",
              "engine speed (1 r/min is 6 degrees per second)",
              "r/min"
            ]
          ],
          "why": "It converts ignition advance, cam timing or injection windows from degrees into the milliseconds the flame, the valves or the injector actually have.",
          "example": "At 9000 rpm, 30 degrees before TDC is \\(t = 30 / (6 \\times 9000) = 0.56\\ \\mathrm{ms}\\); at 8000 rpm, 32 degrees is \\(0.67\\ \\mathrm{ms}\\)."
        },
        {
          "type": "p",
          "html": "Typical advance runs from 5&ndash;15&deg; BTDC at idle to 30&ndash;40&deg; at mid and high rpm part load, with <em>less</em> at full load because the dense charge burns faster and is closer to detonation. Too much advance: pinking, hot head, holed pistons. Too little: lost power, hot exhaust valve and header."
        },
        {
          "type": "p",
          "html": "The K-Light fault trees call for a timing-light check when the engine overheats or lacks power. On an ECU system there is no adjustment, so a wrong reading points to a loose flywheel, a sheared key or a loose trigger. Practice: <a href=\"../repair/repairs/ignition-timing-check/\">ignition timing check</a>."
        },
        {
          "type": "callout",
          "tone": "try",
          "title": "Try it in the Overview",
          "html": "Run the <a href=\"../overview/?mode=4t&part=engine\">four-stroke engine</a> and move the RPM slider from 1500 to 9000 rpm. The power stroke stays at 180° of crank angle but shrinks from 20 ms to 3.3 ms, while the flame needs roughly the same time to burn whatever the engine speed, which is why the spark must advance as revs rise. Then open the <a href=\"../overview/?mode=4t&part=spark_plug\">spark plug</a> panel, hold IGNITE to build current in the coil and release it to fire the plug."
        },
        {
          "type": "wiring",
          "tab": "ignition",
          "caption": "Raise the engine speed and watch the spark move earlier before TDC; then trigger the ignition faults and decide, from what the circuit shows, whether the coil, the pickup or the kill-switch wiring is to blame.",
          "preview": "ignition"
        },
        {
          "type": "h3",
          "text": "Spark plugs"
        },
        {
          "type": "model",
          "file": "spark_plug",
          "caption": "A spark plug: terminal, ceramic insulator, hex shell, sealing washer, centre and earth electrodes."
        },
        {
          "type": "photo",
          "src": "render-plug.jpg",
          "caption": "A 14 mm resistor spark plug of the D7RTC class: threaded shell with sealing gasket, 16 mm hex, ribbed alumina insulator to stop flashover, terminal nut, and the centre and earth electrodes that form the 0.6–0."
        },
        {
          "type": "p",
          "html": "A plug is a steel <strong>shell</strong> with thread and sealing seat, an alumina ceramic <strong>insulator</strong>, a <strong>centre electrode</strong> (nickel alloy, often copper-cored, or fine-wire platinum or iridium) and an <strong>earth electrode</strong> welded to the shell. The <strong>heat range</strong> describes how fast the insulator nose passes heat to the shell and head: the tip must run between about <strong>450 &deg;C</strong> (below: carbon fouling) and <strong>850 &deg;C</strong> (above: glowing tip and pre-ignition)."
        },
        {
          "type": "p",
          "html": "A hot plug has a long nose for low-load commuting; a cold plug has a short nose for sustained high load. In the NGK scheme <strong>higher number = colder</strong>; Bosch and Champion number the other way, so always use a published cross-reference rather than matching digits. A city bike that fouls plugs needs a hotter plug (a 6 rather than a 7), after first checking for an over-rich mixture. <strong>Reach</strong> is the thread length: too long and the plug can strike the piston or valves, too short and carbon fills the exposed head threads."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "K-Light plug",
              "v": "D7RTC",
              "p": "D = \\(\\mathrm{M12} \\times 1.25\\) thread, 7 = heat rating, R = resistor, C = copper core"
            },
            {
              "l": "Gap",
              "v": "0.7 &plusmn; 0.1 mm",
              "p": "set with a wire gauge, never a flat feeler"
            }
          ]
        },
        {
          "type": "p",
          "html": "D7RTC is a Torch designation following the NGK scheme and is generally cross-referenced to the NGK DR7EA. Replace the plug if the electrodes are eroded or corroded, the insulator is cracked, or it is carbon-fouled. Practice: <a href=\"../repair/repairs/spark-plug-service/\">spark plug service</a>, <a href=\"../repair/repairs/spark-plug-reading/\">reading a spark plug</a>."
        },
        {
          "type": "table",
          "head": [
            "Plug looks",
            "Means",
            "Do"
          ],
          "rows": [
            [
              "Light tan to grey-brown",
              "Correct mixture and heat range",
              "Nothing"
            ],
            [
              "Black dry soot",
              "Rich, blocked filter, enricher on, plug too cold, weak spark",
              "Check filter, enricher, mixture, ignition"
            ],
            [
              "Black wet oily",
              "Oil past rings or guides; two-stroke excess premix",
              "Compression and leak-down test"
            ],
            [
              "White, blistered",
              "Lean, over-advanced, plug too hot, air leak",
              "Check mixture, timing, plug grade"
            ],
            [
              "Wet with fuel after cranking",
              "Flooding or no spark",
              "Spark test; leaking injector or high float"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m3-17"
        },
        {
          "type": "h3",
          "text": "Resistor plugs and caps"
        },
        {
          "type": "p",
          "html": "The spark is a fast current pulse that radiates broadband radio interference and can corrupt ECU and instrument signals. A resistor plug, a suppressor cap (about 5 k&Omega;) or a resistive HT lead limits the peak current and damps the oscillation. A cracked or damp cap tracks the spark to earth and gives a misfire in wet weather."
        },
        {
          "type": "p",
          "html": "Fitting a non-resistor plug and a non-resistor cap to an ECU-controlled engine can cause erratic running or ECU resets; fitting both a resistor plug and a resistor cap where the designer intended one adds resistance and weakens the spark slightly."
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "High voltage",
          "html": "Ignition systems produce up to 35 kV. Use an insulated spark tester, never hold a lead or plug in bare hands, and never crank a CDI or ECU engine with the HT lead disconnected and unearthed: the unrestrained voltage can break down the coil or damage the ECU."
        },
        {
          "type": "h3",
          "text": "Ignition fault diagnosis"
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
              "No spark",
              "Flat battery, connector, stop switch, side-stand or neutral logic, coil, pulser or ECU",
              "Battery; switch continuity; coil and pulser resistance; peak voltages"
            ],
            [
              "Weak spark at the plug, good at the lead",
              "Fouled plug or failed cap",
              "Spark test at the lead with the cap off; cap resistance"
            ],
            [
              "Misfire under load only",
              "Worn plug, tracked cap or coil, gap too large",
              "Plug gap; look for tracking on the coil in darkness"
            ],
            [
              "Misfire in wet weather",
              "Cracked cap, moisture in the coil connector",
              "Fine water mist over the HT parts with the engine running"
            ],
            [
              "Backfire when starting",
              "Loose coil earth, loose trigger or flywheel",
              "Coil mounting; flywheel nut 50&ndash;60 N&middot;m on the K-Light"
            ],
            [
              "Overheating, detonation",
              "Over-advanced timing, wrong plug grade",
              "Timing light; plug designation"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m3-35"
        },
        {
          "type": "check",
          "q": "m3-36"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "A plug needs 5&ndash;25 kV, rising with gap, load and wear; the coil must keep a reserve above that.<br>The coil stores \\(E = \\tfrac{1}{2} L I^2\\) and multiplies the primary kick by its turns ratio, about 100:1.<br>CDI rises fast and resists fouling but gives a short spark; inductive systems give a longer spark that suits four-stroke part load.<br>Advance rises with rpm because burn time is roughly fixed: \\(t = \\theta / (6n)\\).<br>Higher NGK numbers are colder plugs; read the insulator colour to judge mixture and heat range.<br>An ECU ignition has no adjustment: a wrong timing reading means a mechanical fault at the flywheel or trigger."
        }
      ]
    },
    {
      "id": "m3-battery-charging",
      "title": "Battery, charging and starting",
      "lead": "The battery is the motorcycle's energy savings account: the alternator pays in, lights and ECU draw out, and the starter makes one huge withdrawal every time you press the button. Know the numbers and you can tell a tired battery from a dead regulator in minutes.",
      "lab": "overview/?mode=4t&part=battery",
      "blocks": [
        {
          "type": "h3",
          "text": "Battery types"
        },
        {
          "type": "model",
          "file": "battery_12v",
          "caption": "A 12 V sealed AGM service battery with its terminals."
        },
        {
          "type": "p",
          "html": "A lead-acid cell has a lead dioxide positive plate, a sponge lead negative plate and dilute sulphuric acid. On discharge both plates turn to lead sulphate and the acid weakens; charging reverses the reaction. Each cell gives a nominal 2.1 V, so a 12 V battery has six in series."
        },
        {
          "type": "p",
          "html": "<strong>Flooded</strong> batteries (for example the 12N12A-4A-1: 12 V, N for the Japanese standard, 12 Ah) have cell caps and a vent tube and are topped up with distilled water only. A hydrometer reading of 1.265 or more means full charge and below 1.200 needs charging, read at least 30 minutes after topping up. <strong>AGM (VRLA)</strong> batteries hold the acid in glass-fibre separators, recombine gas internally and vent only through a pressure valve, so they tolerate vibration and any mounting angle: the K-Light 125 uses a <strong>12 V 6 Ah YTX7A-BS</strong> AGM and must not get a liquid-filled substitute."
        },
        {
          "type": "photo",
          "src": "repair-photos/095_indeed_armour_light.jpg",
          "caption": "Battery state of charge compared with volts and gravity"
        },
        {
          "type": "photo",
          "src": "repair-photos/095_batteries_junk_anyway_but_might_get.jpg",
          "caption": "Small pencil hydrometer for a motorcycle battery"
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Ah",
              "v": "6 Ah",
              "p": "at the 10-hour rate: 0.6 A for 10 hours; how long it runs the loads"
            },
            {
              "l": "CCA",
              "v": "~100 A",
              "p": "at &minus;18 &deg;C for 30 s above 7.2 V; whether it cranks a cold engine"
            },
            {
              "l": "Storage",
              "v": "every 3 months",
              "p": "recharge interval in storage; life typically falls after 2&ndash;3 years"
            }
          ]
        },
        {
          "type": "p",
          "html": "<strong>Ah capacity</strong> decides how long the battery runs the lights and ECU without charge; <strong>CCA</strong> decides whether it turns the engine on a cold morning. <strong>Sulphation</strong>, the growth of hard lead sulphate crystals in a battery left partly discharged, permanently reduces both, which is why a stored battery needs charging about every 3 months."
        },
        {
          "type": "h3",
          "text": "State of charge from rested voltage"
        },
        {
          "type": "p",
          "html": "Open-circuit voltage indicates state of charge only after the battery has rested at least 1 hour (the K-Light manual condition) or a light load has removed the surface charge left by charging or riding."
        },
        {
          "type": "table",
          "head": [
            "State of charge",
            "Flooded (V)",
            "AGM (V)",
            "LiFePO4 (V)"
          ],
          "rows": [
            [
              "100 %",
              "12.65&ndash;12.7",
              "12.8&ndash;13.1",
              "13.3&ndash;13.4"
            ],
            [
              "75 %",
              "12.4",
              "12.6",
              "13.2"
            ],
            [
              "50 %",
              "12.2",
              "12.3",
              "13.1"
            ],
            [
              "25 %",
              "12.0",
              "12.0",
              "13.0"
            ],
            [
              "0 %",
              "11.8 or less",
              "11.8 or less",
              "12.0 or less"
            ]
          ]
        },
        {
          "type": "p",
          "html": "K-Light: <strong>13.1 V</strong> fully charged, <strong>12.3 V</strong> (about 50 %) needs charging. Notice how flat the LiFePO4 column is: voltage is a poor gauge for lithium, and its BMS or a dedicated tester says more."
        },
        {
          "type": "h3",
          "text": "Charging lead-acid batteries"
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Rule of thumb: the 10 % rule",
          "html": "Charge lead-acid at no more than 10 % of its Ah rating. For the K-Light 6 Ah battery that is <strong>0.6 A for 10&ndash;15 hours</strong>. Charging is complete when the voltage 30 minutes later is 12.8 V or more. A 6 A quick charge for 30 minutes is for emergencies only, with the battery off the bike."
        },
        {
          "type": "eq",
          "id": "m3-charge-current",
          "name": "Safe charging current for lead-acid",
          "tex": "I_{ch} \\le 0.1\\,C",
          "where": [
            [
              "I_{ch}",
              "charging current",
              "A"
            ],
            [
              "C",
              "rated capacity at the 10-hour rate",
              "Ah"
            ]
          ],
          "why": "Charging faster than about a tenth of capacity heats the plates and gasses the electrolyte; small motorcycle batteries are easily overcharged by car chargers.",
          "example": "K-Light 6 Ah battery: \\(I_{ch} \\le 0.1 \\times 6 = 0.6\\ \\mathrm{A}\\)."
        },
        {
          "type": "eq",
          "id": "m3-charge-time",
          "name": "Charging time",
          "tex": "t = \\frac{\\Delta Q}{\\eta_{ch}\\,I_{ch}}",
          "where": [
            [
              "t",
              "charging time",
              "h"
            ],
            [
              "\\Delta Q",
              "charge to be replaced",
              "Ah"
            ],
            [
              "\\eta_{ch}",
              "charge efficiency (about 0.8 for lead-acid)",
              "none"
            ],
            [
              "I_{ch}",
              "charging current",
              "A"
            ]
          ],
          "why": "It estimates how long a battery must stay on the charger, and shows why a short top-up cannot recover a deeply discharged battery.",
          "example": "From 50 % on a 6 Ah battery: \\(\\Delta Q = 3\\ \\mathrm{Ah}\\), so \\(t = 3 / (0.8 \\times 0.6) \\approx 6.3\\ \\mathrm{h}\\)."
        },
        {
          "type": "p",
          "html": "Modern smart chargers apply constant current, then constant voltage at about 14.4&ndash;14.7 V (absorption), then a float at 13.5&ndash;13.8 V; some add a desulphation pulse mode. Car chargers without a low-current setting overcharge small batteries, and jump-starting from a running car exposes the motorcycle electronics to voltage transients. Practice: <a href=\"../repair/repairs/battery-test-charge/\">battery test and charge</a>, <a href=\"../repair/repairs/battery-terminal-clean/\">cleaning battery terminals</a>."
        },
        {
          "type": "check",
          "q": "m3-19"
        },
        {
          "type": "callout",
          "tone": "safety",
          "title": "Battery safety",
          "html": "Charging releases explosive hydrogen: ventilate, switch the charger off before touching the clips, wear eye protection; flush acid from skin with water and neutralise spills with baking soda. When removing a battery take the negative off first; when fitting, connect the positive first, negative last, so a spanner touching the frame cannot short the live terminal."
        },
        {
          "type": "h3",
          "text": "Lithium iron phosphate batteries"
        },
        {
          "type": "p",
          "html": "LiFePO4 starter batteries use four 3.2 V cells (12.8 V), weigh about a third as much as an equivalent AGM, self-discharge very slowly and deliver high cranking current for their size. They need a built-in <strong>battery management system</strong> (BMS) for cell balancing and protection against over-discharge, overcharge and over-current."
        },
        {
          "type": "p",
          "html": "Never charge one below about 0 &deg;C (lithium plating on the anode permanently cuts capacity and risks an internal short), above about 14.6 V, or with a desulphation pulse mode. A battery whose BMS has disconnected after deep discharge can read near 0 V until reactivated. Fit one only when the charging system regulates within the battery maker's window, because its high charge acceptance is hard on a marginal regulator."
        },
        {
          "type": "h3",
          "text": "Alternator and regulator"
        },
        {
          "type": "p",
          "html": "Most small bikes use a permanent-magnet alternator: magnets on a flywheel rotor, bolted to the crankshaft taper, spin around a wound stator. Output frequency and voltage rise with rpm, a three-phase stator reaching <strong>50&ndash;80 V AC</strong> open-circuit at 5000 rpm, so regulation is essential. On a small single the output is only just above the load with the lights on, which is why long idling with the headlight on can drain the battery."
        },
        {
          "type": "table",
          "head": [
            "Alternator",
            "Construction",
            "Notes"
          ],
          "rows": [
            [
              "Single-phase",
              "One winding, often half-wave rectified",
              "Mopeds and older commuters; a separate lighting coil may feed the headlight with AC, so brightness varies with rpm"
            ],
            [
              "Three-phase",
              "Three windings at 120&deg;, three wires of one colour (white on the K-Light, yellow on many Japanese bikes)",
              "Smoother output, higher efficiency; six-diode full-wave rectifier"
            ],
            [
              "Field-coil",
              "Electromagnet rotor fed through slip rings",
              "Large tourers; the regulator varies field current, so the alternator makes only the power demanded"
            ]
          ]
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Charging voltage",
              "v": "14.5 &plusmn; 0.5 V",
              "p": "K-Light at 5000 rpm"
            },
            {
              "l": "Stator",
              "v": "0.8 &plusmn; 0.3 &Omega;",
              "p": "between each pair of the three white wires, 20 &deg;C"
            },
            {
              "l": "Flywheel nut",
              "v": "50&ndash;60 N&middot;m",
              "p": "K-Light torque"
            }
          ]
        },
        {
          "type": "p",
          "html": "The K-Light charging chapter states the alternator as 160 W at 5000 rpm while the specification table gives 100 W; confirm against the parts catalogue for the build. Stator and cover bolts are 10&ndash;12 N&middot;m, the trigger 6&ndash;9 N&middot;m and the rectifier bolt 5.0 N&middot;m."
        },
        {
          "type": "table",
          "head": [
            "Regulator",
            "When the battery is full",
            "Result"
          ],
          "rows": [
            [
              "Shunt (SCR)",
              "Shorts the stator phases to earth",
              "Stator always makes full current; heat in stator and regulator"
            ],
            [
              "Series (MOSFET)",
              "Opens the circuit stator to battery",
              "Stator current falls with demand; runs much cooler"
            ]
          ]
        },
        {
          "type": "p",
          "html": "The <strong>regulator/rectifier</strong> converts stator AC to DC through a diode bridge and holds battery voltage within the window, generally 13.5&ndash;15.0 V at 5000 rpm on lead-acid systems. A shunt regulator always runs the stator at full current, so the surplus becomes heat: that is why shunt units carry large fins, why stators on small bikes fail from overheating and why a regulator with corroded connectors cooks its plug. A MOSFET series regulator is a common upgrade for chronic failures, provided connector and fuse suit the current."
        },
        {
          "type": "p",
          "html": "Too low a voltage leaves the battery undercharged; too high boils electrolyte, dries AGM separators, blows bulbs and can damage the ECU. The K-Light fault trees use this pattern to separate regulator faults from battery faults: 16.2 V at 5000 rpm points to a failed regulator or a poor regulator earth, not a bad battery. Practice: <a href=\"../repair/repairs/charging-system-test/\">charging system test</a>, <a href=\"../repair/repairs/stator-test/\">stator test</a>, <a href=\"../repair/repairs/regulator-test/\">regulator test</a>."
        },
        {
          "type": "p",
          "html": "Stator readings are compared between pairs. Readings of 0.8, 0.8 and 0.2 \\(\\Omega\\) mean two pairs are within 0.8 \\(\\pm\\) 0.3 \\(\\Omega\\) and one pair has shorted turns, so output will be low; confirm with the AC output and short-to-earth tests. Any continuity from a stator wire to earth is a fault."
        },
        {
          "type": "plate",
          "id": "F21",
          "caption": "Charging circuit: permanent-magnet alternator, shunt regulator/rectifier, fuse, battery and loads."
        },
        {
          "type": "engine",
          "shot": "05-generator-electric-start",
          "view": "gen",
          "caption": "The flywheel magneto and stator during an electric start: the starter turns the crank through a one-way roller clutch."
        },
        {
          "type": "wiring",
          "tab": "charging",
          "caption": "Start the engine and raise the revs: watch the stator AC, the rectified DC and the battery voltage settle at 14.5 ± 0.5 V, then switch on the headlight and see how the regulator shunts less current to earth."
        },
        {
          "type": "check",
          "q": "m3-21"
        },
        {
          "type": "h3",
          "text": "Electric starting"
        },
        {
          "type": "p",
          "html": "The starter is a DC motor (permanent-magnet field on small machines) turning the crank through a reduction gear train and a one-way clutch. It draws tens to over a hundred amps, which would burn out a handlebar switch and need heavy cable to the bars. So the start button only carries a few hundred milliamps through a <strong>starter relay</strong> coil, and the relay, close to the battery, switches the heavy cable. The K-Light circuit has a 20 A main fuse and two 10 A circuit fuses."
        },
        {
          "type": "photo",
          "src": "repair-photos/099_electric_starters_2.jpg",
          "caption": "Two starter motors"
        },
        {
          "type": "p",
          "html": "The relay coil circuit runs through a chain of interlocks so the engine cannot start in a dangerous condition. The K-Light test checks for battery voltage at the relay green/yellow wire with the main switch on and the brake lever pulled, and for continuity from the relay black wire to earth with the start button pressed. Practice: <a href=\"../repair/repairs/starter-circuit-test/\">starter circuit test</a>, <a href=\"../repair/repairs/starter-relay-test/\">starter relay test</a>, <a href=\"../repair/repairs/interlock-switch-test/\">interlock switch test</a>."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Neutral switch",
              "html": "Allows starting with the gearbox in neutral."
            },
            {
              "title": "Clutch switch",
              "html": "Allows starting in gear with the lever pulled, isolated by a diode so the neutral lamp stays off."
            },
            {
              "title": "Side-stand switch",
              "html": "Stops the engine if a gear is selected with the stand down."
            },
            {
              "title": "Brake lever switch",
              "html": "Must be closed on the K-Light and many scooters (battery voltage at the relay green/yellow wire)."
            },
            {
              "title": "Engine stop switch",
              "html": "Usually also interrupts the relay supply."
            }
          ]
        },
        {
          "type": "p",
          "html": "The <strong>starter clutch</strong> lets the starter drive the crank and freewheels once the engine overruns it. A roller type wedges spring-loaded rollers in tapered pockets; a sprag type uses figure-of-eight sprags. A slipping clutch lets the starter spin and whine without turning the engine, the commonest starter fault; a seized one drives the starter at engine speed and destroys it. K-Light starter brushes: 12.5 mm new, service limit <strong>8.5 mm</strong>. Practice: <a href=\"../repair/repairs/starter-clutch-check/\">starter clutch check</a>, <a href=\"../repair/repairs/starter-motor-service/\">starter motor service</a>."
        },
        {
          "type": "plate",
          "id": "F23",
          "caption": "Electric starting circuit: battery, fuses, switches, interlocks, starter relay, starter motor and starter clutch."
        },
        {
          "type": "wiring",
          "tab": "starting",
          "caption": "Switch the key on, select neutral and hold START: follow the control current through the interlocks to the relay coil and the heavy current from battery to starter motor, then pull in the clutch with a gear selected and fold the side stand down to see which interlock breaks the circuit."
        },
        {
          "type": "h3",
          "text": "Kickstarter"
        },
        {
          "type": "p",
          "html": "The kickstarter survives on many small machines, the K-Light 125 included, as a backup. The pedal turns a pinion through a ratchet that engages only on the downstroke; a return spring pulls the pedal back and a ramp disengages the ratchet so it does not grind when the engine runs. Most kickstart faults come from assembling the ratchet with its alignment mark out of register with the return spring hole; worn ratchet teeth make the lever slip under load. Practice: <a href=\"../repair/repairs/kickstart-check/\">kickstart check</a>."
        },
        {
          "type": "h3",
          "text": "Battery, charging and starting faults"
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
              "Battery flat after standing",
              "Parasitic drain, sulphated battery",
              "Rested voltage; drain test (K-Light limit 1 mA)"
            ],
            [
              "Battery flat after riding",
              "Low charging output, shorted stator, regulator",
              "Charging voltage at 5000 rpm; stator pairs and earth"
            ],
            [
              "Bulbs blow, battery boils",
              "Regulator not limiting, poor regulator earth",
              "Charging voltage; regulator earth drop"
            ],
            [
              "Starts in neutral, not in gear with clutch pulled",
              "Clutch switch, its wiring or diode; side stand down",
              "Switch continuity; diode test"
            ],
            [
              "Starter spins and whines, engine still",
              "Slipping starter clutch",
              "Starter clutch freewheel and lock test"
            ]
          ]
        },
        {
          "type": "eq",
          "id": "m3-terminal-voltage",
          "name": "Battery terminal voltage under load",
          "tex": "V_t = E - I\\,r_i",
          "where": [
            [
              "V_t",
              "voltage at the battery terminals",
              "V"
            ],
            [
              "E",
              "open-circuit voltage (EMF)",
              "V"
            ],
            [
              "I",
              "load current",
              "A"
            ],
            [
              "r_i",
              "internal resistance",
              "Ω"
            ]
          ],
          "why": "A worn or sulphated battery has a high internal resistance that a resting-voltage test cannot see; only a load or cranking test reveals it.",
          "example": "Internal resistance from two readings: \\(r_i = (12.60 - 12.44) / 7.8 \\approx 0.02\\ \\Omega\\)."
        },
        {
          "type": "check",
          "q": "m3-37"
        },
        {
          "type": "check",
          "q": "m3-38"
        },
        {
          "type": "h3",
          "text": "Exercises in the Circuit Builder"
        },
        {
          "type": "p",
          "html": "Each exercise opens a circuit in the Circuit Builder on the Wiring Lab page. Press <strong>Test</strong> to connect the battery, take the readings, then press <strong>Note reading</strong> to keep them in the log. Part values are typical examples, not the figures of a particular bike."
        },
        {
          "type": "exercise",
          "title": "Battery voltage at rest and under load",
          "preset": "battery-load",
          "task": "Press Test with switch S1 open and read V1. Close S1 to switch on the headlight and horn, read V1 and A1 again. Then select B1 and raise its internal resistance to 250 mΩ, as in a worn or sulphated battery.",
          "measure": "Battery terminal voltage (V1) and load current (A1), with S1 open and closed, for 20 mΩ and 250 mΩ of internal resistance.",
          "expect": "With S1 open, V1 shows the full 12.6 V in both cases. Loaded, a good battery holds about 12.4 V at close to 8 A; the worn one falls below 11 V and the current drops to about 7 A.",
          "why": "Terminal voltage = EMF − I × internal resistance. No current flows at rest, so a resting voltage test cannot see a high internal resistance. Only a load test, at the battery or while cranking, shows it."
        },
        {
          "type": "exercise",
          "title": "Internal resistance from two readings",
          "preset": "battery-load",
          "task": "Use the readings of the previous exercise, or take them again: V1 with S1 open, then V1 and A1 with S1 closed.",
          "measure": "Open-circuit voltage, loaded voltage and load current.",
          "expect": "With the default battery: (12.60 − 12.44) / 7.8 ≈ 0.02 Ω, the 20 mΩ set on B1.",
          "why": "The voltage lost inside the battery divided by the current that caused it is the internal resistance. Testers that quote a battery's condition use the same principle with a known load."
        },
        {
          "type": "exercise",
          "title": "Charging voltage and lamp brightness",
          "preset": "bulb",
          "task": "Press Test and read the bulb current in the part panel of L1. Then select B1 and set its EMF to 14.2 V, the voltage a regulator holds with the engine running.",
          "measure": "Bulb current, power and light output at 12.6 V and at 14.2 V.",
          "expect": "About 1.8 A and 23 W at 12.6 V; about 2.1 A and 29 W at 14.2 V. Light output rises by roughly half.",
          "why": "The filament resistance stays roughly constant once hot, so current rises with voltage and power with its square. Light output of a filament rises faster still, roughly with the voltage to the power 3.4. Lamps blow early when a regulator fails and the voltage climbs."
        },
        {
          "type": "exercise",
          "title": "Parasitic drain with the ammeter",
          "preset": "drain",
          "task": "The ammeter A1 sits between the battery negative and the earth lead, as in a real drain test. Press Test with the light switch S1 open.",
          "measure": "Current in A1 with everything switched off.",
          "expect": "About 10 mA, through R1, which stands for a clock or ECU memory. Over a day that is 0.010 A × 24 h ≈ 0.25 Ah, a few percent of a small battery's capacity.",
          "why": "Every always-on load drains the battery while the bike stands. A drain of tens of milliamps flattens a small battery in a few weeks; pull fuses one at a time while watching the ammeter to find the circuit that draws it."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Ah capacity says how long a battery runs the loads; CCA says whether it cranks a cold engine.<br>Read state of charge from rested voltage only: the K-Light battery is full at 13.1 V and needs charging at 12.3 V.<br>Charge lead-acid at no more than a tenth of its capacity (0.6 A for 6 Ah); never charge LiFePO4 below 0 &deg;C or above 14.6 V.<br>A shunt regulator always runs the stator at full current, so stators and regulators fail from heat; a series regulator runs cooler.<br>The K-Light charges at 14.5 \\(\\pm\\) 0.5 V at 5000 rpm; check with a charged battery.<br>The start button switches only the relay coil, through neutral, clutch, side-stand and brake interlocks."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "qqSZWaWEe3s",
              "title": "How to Test Your Motorcycle’s Stator and Regulator Rectifier | The Shop Manual",
              "channel": "RevZilla",
              "channel_url": "http://www.youtube.com/@RevZilla",
              "duration": "7:07",
              "role": "How-to",
              "note": "Test the stator and regulator rectifier with a multimeter to tell charging faults from a weak battery; values are bike-specific. Shows the multimeter tests and what a good or bad reading means; values are for that bike."
            },
            {
              "id": "c5JB6HjKiF4",
              "title": "**Solved!** Starter relay problem! Works for most bikes/vehicles!",
              "channel": "MotoCos88",
              "channel_url": "http://www.youtube.com/@MotoCos88",
              "duration": "7:32",
              "role": "How-to",
              "note": "Test and replace a starter relay; check the battery and earth first, the 'most bikes' claim needs checking."
            }
          ]
        }
      ]
    },
    {
      "id": "m3-lighting-wiring",
      "title": "Lighting, signalling and wiring",
      "lead": "Lights, indicators and the harness that feeds them are where most everyday electrical faults live. A few simple calculations explain LED hyper-flash, melted connectors and why the fuse must match the wire, not the lamp.",
      "lab": "overview/?mode=4t&part=wiring",
      "blocks": [
        {
          "type": "h3",
          "text": "Lamps"
        },
        {
          "type": "p",
          "html": "A filament bulb heats a tungsten coil to around 2500&ndash;3000 K, and only about 2&ndash;3 % of its power appears as visible light. A <strong>halogen</strong> bulb fills the glass with a halogen gas that redeposits evaporated tungsten on the filament, allowing a hotter, whiter filament and longer life. Never touch the quartz, because skin oil makes hot spots; the K-Light manual advises wiping a contaminated bulb with alcohol."
        },
        {
          "type": "p",
          "html": "An H4 (the K-Light headlight) has two filaments, typically 60 W main and 55 W dipped, with a shield under the dipped filament that cuts off the upper half of the beam. An <strong>LED</strong> gives 80&ndash;150 lm/W and lasts tens of thousands of hours, but its output falls as junction temperature rises, so LED lamps carry heat sinks and a constant-current driver. LEDs are polarity-sensitive and draw far less current than the bulbs they replace, which upsets flashers and bulb-failure warnings."
        },
        {
          "type": "eq",
          "id": "m3-electric-power",
          "name": "Electrical power",
          "tex": "P = V\\,I",
          "where": [
            [
              "P",
              "power taken by the load",
              "W"
            ],
            [
              "V",
              "voltage across it",
              "V"
            ],
            [
              "I",
              "current through it",
              "A"
            ]
          ],
          "why": "Rearranged as \\(I = P/V\\), it gives the current any lamp or accessory draws from its wattage, the first step in choosing wire, fuse and relay.",
          "example": "An H4 main beam at 13.5 V: \\(I = 60 / 13.5 \\approx 4.4\\ \\mathrm{A}\\)."
        },
        {
          "type": "photo",
          "src": "repair-photos/086_ground_wire_ground_frame_2.jpg",
          "caption": "Power source, hot wire, load and ground shown with a lamp"
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Headlight",
              "v": "H4",
              "p": "60 W main, 55 W dipped"
            },
            {
              "l": "Indicators",
              "v": "R10W",
              "p": "10 W each; flash at 90 &plusmn; 30 per minute (UNECE)"
            },
            {
              "l": "Tail / brake",
              "v": "P21/5W",
              "p": "plate light W5W, position lamp W3W"
            }
          ]
        },
        {
          "type": "eq",
          "id": "m3-power-resistance",
          "name": "Power in a resistance",
          "tex": "P = I^2 R = \\frac{V^2}{R}",
          "where": [
            [
              "P",
              "power turned into heat (or light)",
              "W"
            ],
            [
              "I",
              "current",
              "A"
            ],
            [
              "R",
              "resistance",
              "Ω"
            ],
            [
              "V",
              "voltage across the resistance",
              "V"
            ]
          ],
          "why": "It shows how a corroded connector heats up and dims a lamp, and gives the value of a load resistor that mimics a bulb.",
          "example": "4.4 A through a \\(0.15\\ \\Omega\\) connector: \\(P = 4.4^2 \\times 0.15 \\approx 2.9\\ \\mathrm{W}\\) of heat, and a drop of \\(0.67\\ \\mathrm{V}\\)."
        },
        {
          "type": "p",
          "html": "The <strong>dipped beam</strong> must have a sharp horizontal cut-off (with a step on the near side in UNECE patterns); the <strong>main beam</strong> is a concentrated hot spot along the road axis. LED retrofits in a halogen reflector cannot put their emitters exactly where the filament was, so light scatters above the cut-off and dazzles: they are generally not type-approved."
        },
        {
          "type": "p",
          "html": "Beam height is set against a wall chart at the manufacturer's distance with the rider seated. K-Light lamps: front position W3W, plate light W5W; the flasher is a variable-frequency type. Practice: <a href=\"../repair/repairs/bulb-replace/\">bulb replacement</a>, <a href=\"../repair/repairs/headlight-aim/\">headlight aim</a>."
        },
        {
          "type": "model",
          "file": "headlight_round",
          "caption": "A seven-inch round chrome headlight with glass lens and reflector."
        },
        {
          "type": "photo",
          "src": "repair-photos/086_solid_wire.jpg",
          "caption": "Stranded wire used for heavy 12 V cables"
        },
        {
          "type": "models",
          "files": [
            "headlight_led",
            "headlight_mx"
          ],
          "caption": "Other headlight styles: an angular LED unit with daytime running light, and a motocross number-plate shroud."
        },
        {
          "type": "variants",
          "title": "Headlight types",
          "intro": "From gas lamps to sealed LED units. Repair page: <a href=\"../repair/parts/headlight/\">headlight</a>.",
          "items": [
            {
              "model": "headlight_round",
              "name": "Round halogen, chrome bucket",
              "what": "A 7 in round reflector and glass lens, usually with an H4 halogen bulb holding dipped and main filaments.",
              "good_for": "Cheap, a standard size, and bulbs on sale almost everywhere.",
              "conditions": "General road riding.",
              "watch": "Blown filaments, corroded connectors and aim knocked off. An LED bulb in a halogen reflector scatters light and dazzles."
            },
            {
              "model": "headlight_led",
              "name": "LED unit with DRL",
              "what": "A sealed LED headlight with a daytime running light strip.",
              "good_for": "Bright, low power, long life, instant on.",
              "conditions": "Night riding and all weather.",
              "watch": "Usually not repairable: a failed LED means a new unit. Moisture inside the lens and a poor earth."
            },
            {
              "model": "bike_cruiser__headlight",
              "name": "Round LED, cruiser",
              "what": "A traditional round bucket with an LED face, on the modern cruiser.",
              "good_for": "A classic look with modern light output and low power draw.",
              "conditions": "Road riding at night and in all weather.",
              "watch": "As for any LED unit: water ingress and connector corrosion. Aim it after any change to suspension or load."
            },
            {
              "model": "headlight_mx",
              "name": "Motocross number-plate light",
              "what": "A small lamp set into the front number-plate shroud.",
              "good_for": "Light and tough; enough for trail riding and short road sections.",
              "conditions": "Off-road and short road links.",
              "watch": "A weak beam, not meant for fast night riding. Vibration breaks bulbs and loosens connectors."
            },
            {
              "model": "bike_vintage_vtwin__headlight",
              "name": "Acetylene lamp, vintage",
              "what": "Water drips onto calcium carbide in a separate generator, and the acetylene gas is piped to a burner in the lamp.",
              "good_for": "A bright flame in the years before reliable dynamos and batteries.",
              "conditions": "Display and period events.",
              "watch": "Acetylene is flammable: carbide is stored dry and the lamp is never lit near a fuel leak. The burner jet needs cleaning."
            },
            {
              "model": "bike_pioneer__headlight",
              "name": "Carbide lamp, about 1901",
              "what": "A compact brass lamp with the gas generator built into its body.",
              "good_for": "Light with no wiring at all.",
              "conditions": "Slow running at dusk; display.",
              "watch": "Dim by modern standards. The same carbide and flame care as the acetylene lamp."
            }
          ]
        },
        {
          "type": "model",
          "file": "tail_light",
          "caption": "An LED tail light with number-plate light."
        },
        {
          "type": "h3",
          "text": "Flashers and LED hyper-flash"
        },
        {
          "type": "p",
          "html": "UNECE rules require 90 &plusmn; 30 flashes per minute. A <strong>thermal flasher</strong>'s bimetal strip is heated by the lamp current and only reaches its switching temperature at the designed load, so when one bulb fails the current halves and the rate changes: a built-in failure warning. An <strong>electronic flasher</strong> uses a timer and a relay or MOSFET, and standard types also sense current and hyper-flash when the load falls."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Bulb load per side",
              "html": "\\(I = 2 \\times 10\\ \\mathrm{W} / 12\\ \\mathrm{V} \\approx 1.67\\ \\mathrm{A}\\)"
            },
            {
              "title": "LED load per side",
              "html": "\\(I = 2 \\times 1.5\\ \\mathrm{W} / 12\\ \\mathrm{V} = 0.25\\ \\mathrm{A}\\), far below the design value"
            },
            {
              "title": "Load resistor per bulb",
              "html": "\\(R = V^2 / P = 144 / 10 = 14.4\\ \\Omega\\), dissipating 10 W; or one \\(7.2\\ \\Omega\\), 20 W resistor per side"
            }
          ]
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Better fix",
          "html": "Fit a load-independent electronic flasher designed for LEDs: it wastes no power. If you use load resistors, mount them on metal, because each one gets as hot as the bulb it replaces."
        },
        {
          "type": "p",
          "html": "The <strong>horn</strong> is usually an electromagnetic diaphragm type with self-interrupting contacts; the K-Light manual tests it by connecting it straight to the battery. On many bikes the horn button switches the earth side, so bridging the button terminal to earth tells a button fault from a horn or supply fault. Practice: <a href=\"../repair/repairs/flasher-test/\">flasher test</a>, <a href=\"../repair/repairs/led-indicator-fit/\">fitting LED indicators</a>, <a href=\"../repair/repairs/horn-test/\">horn test</a>."
        },
        {
          "type": "check",
          "q": "m3-24"
        },
        {
          "type": "plate",
          "id": "EL01",
          "caption": "Instruments and switchgear: twin analogue clocks, a motocross LCD, a TFT dash, and the left and right switch cubes with every switch named."
        },
        {
          "type": "h3",
          "text": "Fuses, connectors and earths"
        },
        {
          "type": "p",
          "html": "Handlebar switches have sliding or rocker contacts that oxidise and wear, giving intermittent faults. Manuals give a <strong>continuity table</strong> for each switch showing which wire colours connect in each position (the K-Light ignition switch joins red to red/white at ON), so test continuity with the switch operated through every position. Practice: <a href=\"../repair/repairs/switch-clean/\">switch cleaning</a>, <a href=\"../repair/repairs/ignition-switch-test/\">ignition switch test</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/086_do_have_one_right.jpg",
          "caption": "Connector block on a bike wiring harness"
        },
        {
          "type": "p",
          "html": "<strong>A fuse protects the wiring, not the load.</strong> Rate it below the capacity of the smallest wire it protects and above the circuit's normal maximum current. Blade fuses (ATO or mini) of 10 A and 20 A are typical; the K-Light has a 20 A main fuse and two 10 A branch fuses. A fuse that blows repeatedly means a short downstream, never a reason to fit a bigger one, and a fuse corroded in its holder gives high resistance and heat."
        },
        {
          "type": "figure",
          "fig": "ohms-law",
          "caption": "Pick a load in watts and the supply voltage to see the current, then the fuse rating that protects its wire."
        },
        {
          "type": "p",
          "html": "Water and vibration cause most connector faults: fretting corrosion on tinned terminals, pins backed out by careless probing, chafing at the steering head. Sealed multi-pin housings have locking claws that must be released before separation. <strong>Dielectric grease</strong> on the seals slows corrosion but never replaces clean contact. Repairs use crimped terminals of the correct type and, for splices, a soldered and heat-shrunk joint staggered from its neighbours. Practice: <a href=\"../repair/repairs/connector-clean/\">connector cleaning</a>, <a href=\"../repair/repairs/fuse-relay-check/\">fuse and relay check</a>."
        },
        {
          "type": "eq",
          "id": "m3-wire-resistance",
          "name": "Resistance of a wire",
          "tex": "R = \\frac{\\rho\\,L}{A}",
          "where": [
            [
              "R",
              "resistance of the conductor",
              "Ω"
            ],
            [
              "\\rho",
              "resistivity (copper about 1.68 × 10⁻⁸ Ω·m)",
              "Ω·m"
            ],
            [
              "L",
              "length of the conductor",
              "m"
            ],
            [
              "A",
              "cross-sectional area",
              "m²"
            ]
          ],
          "why": "It explains why long thin feeds lose voltage under load and why heavy loads such as the starter or accessory lights need thicker cable.",
          "example": "3 m of 0.5 mm² copper: \\(R = 1.68 \\times 10^{-8} \\times 3 / (0.5 \\times 10^{-6}) \\approx 0.10\\ \\Omega\\), so 4.6 A loses about 0.46 V."
        },
        {
          "type": "model",
          "file": "wiring_harness",
          "caption": "A main wiring harness with its branches, multi-pin connectors, fuse box and relays."
        },
        {
          "type": "plate",
          "id": "WR01",
          "caption": "The main wiring harness laid flat: trunk, branches, connectors, fuse box, relays and earth points."
        },
        {
          "type": "h3",
          "text": "Earth paths and wire colours"
        },
        {
          "type": "p",
          "html": "Most motorcycles use a <strong>single-wire earth-return</strong> system: battery negative connects to frame and engine, and each load returns current through the metal structure or a dedicated black earth wire to a common earth point. Electronic parts get dedicated earth wires because painted, plastic or rubber-mounted parts give an unreliable frame return, and a few tenths of a volt of earth offset corrupt sensor signals referenced to that earth. Practice: <a href=\"../repair/repairs/earth-clean/\">earth cleaning</a>."
        },
        {
          "type": "p",
          "html": "Wire colours follow the maker's code, with a stripe colour after a slash. The K-Light diagram uses B black, BL blue, LBL light blue, N brown, G green, O orange, Y yellow, R red, LR pink, W white, P purple, Gr grey and DG dark green; G/Y and O/R appear in the starter relay circuit. Japanese makers use similar abbreviations but not identical meanings."
        },
        {
          "type": "h3",
          "text": "Reading a wiring diagram"
        },
        {
          "type": "p",
          "html": "On the K-Light diagram <strong>R</strong> is battery positive (unswitched), <strong>R/W</strong> is switched supply after the main switch, <strong>B</strong> is earth, and the three <strong>W</strong> wires are the alternator phases. The colour code on the diagram for that exact model is the only authority."
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Find the load",
              "html": "Identify which of its wires is supply and which is earth."
            },
            {
              "title": "Trace the supply back",
              "html": "Through each switch, connector and fuse to the main switch and battery, noting every colour change."
            },
            {
              "title": "List circuits sharing the fuse",
              "html": "If horn and brake light fail together, the shared fuse is the first suspect."
            },
            {
              "title": "Trace the earth path",
              "html": "Back to battery negative or its earth point."
            },
            {
              "title": "Mark a mid-circuit test point",
              "html": "One voltage reading then splits the circuit in half."
            }
          ]
        },
        {
          "type": "p",
          "html": "On the K-Light diagram the 34-pin ECU connector is numbered: pins 1 and 13 serve the ignition coil, pin 2 the fuel pump control, pin 29 the TPS signal, and pins 4, 10, 22 and 24 the stepper motor. Practice: <a href=\"../repair/repairs/lighting-circuit-test/\">lighting circuit test</a>, <a href=\"../repair/repairs/wiring-fault-find/\">wiring fault finding</a>."
        },
        {
          "type": "wiring",
          "tab": "harness",
          "caption": "Trace the main harness from battery to each load: click a connector to see its wire colours, then follow one circuit (for example the brake light) from fuse to switch to lamp to earth, as in the five-step method above."
        },
        {
          "type": "check",
          "q": "m3-26"
        },
        {
          "type": "h3",
          "text": "CAN bus and accessories"
        },
        {
          "type": "p",
          "html": "Larger bikes link ECU, dash, ABS, body control, keyless ignition and switch gear over a two-wire twisted-pair <strong>CAN bus</strong> (ISO 11898) at typically 500 kbit/s. At idle (recessive) both wires sit at about 2.5 V; dominant, CAN-H rises to about 3.5 V and CAN-L falls to about 1.5 V, so receivers read the difference and reject common-mode noise. Each end has a 120 \\(\\Omega\\) terminator."
        },
        {
          "type": "eq",
          "id": "m3-parallel-resistance",
          "name": "Two resistances in parallel",
          "tex": "R_{p} = \\frac{R_1\\,R_2}{R_1 + R_2}",
          "where": [
            [
              "R_p",
              "combined resistance",
              "Ω"
            ],
            [
              "R_1,\\ R_2",
              "the two resistances",
              "Ω"
            ]
          ],
          "why": "Parallel paths always read lower than either one alone: it explains the 60 Ω reading of a healthy CAN bus and why an ohm reading across a part still in circuit misleads.",
          "example": "Two \\(120\\ \\Omega\\) CAN terminators: \\(R_p = 120 \\times 120 / 240 = 60\\ \\Omega\\). One open terminator leaves \\(120\\ \\Omega\\)."
        },
        {
          "type": "p",
          "html": "With the battery disconnected CAN-H to CAN-L should read about <strong>60 \\(\\Omega\\)</strong>; 120 \\(\\Omega\\) means one terminator or branch is open, near 0 \\(\\Omega\\) means the wires are shorted. A single faulty module can hold the bus dominant and make every unit report communication faults, so unplug modules one at a time to isolate it. Electric motorcycles use CAN between battery management system, motor controller and vehicle control unit (module 4)."
        },
        {
          "type": "h3",
          "text": "Accessory power"
        },
        {
          "type": "p",
          "html": "Heated grips, navigation, USB chargers and auxiliary lamps add load to an alternator that may have only 50&ndash;100 W of surplus on a small machine. Two 35 W auxiliary lamps draw \\(I = 70/12 \\approx 5.8\\ \\mathrm{A}\\), likely more than that: measure charging voltage with all loads on at cruising rpm, and consider LED lamps of lower power. Feed accessories through their own fuse and an ignition-switched relay, never by tapping CAN or sensor wires, and on CAN machines use the manufacturer accessory connector, because some ECUs flag unexpected loads as faults. Practice: <a href=\"../repair/repairs/accessory-wiring/\">accessory wiring</a>."
        },
        {
          "type": "plate",
          "id": "EL02",
          "caption": "Where the electrical components sit on a road motorcycle."
        },
        {
          "type": "check",
          "q": "m3-39"
        },
        {
          "type": "check",
          "q": "m3-40"
        },
        {
          "type": "h3",
          "text": "Exercises in the Circuit Builder"
        },
        {
          "type": "p",
          "html": "Open each circuit in the Circuit Builder, press <strong>Test</strong> and compare your readings with the expected result. Use <strong>Note reading</strong> to keep a before and after pair in the log."
        },
        {
          "type": "eq",
          "id": "m3-led-resistor",
          "name": "LED series resistor",
          "tex": "R = \\frac{V_s - V_f}{I_{LED}}",
          "where": [
            [
              "R",
              "series resistor",
              "Ω"
            ],
            [
              "V_s",
              "supply voltage",
              "V"
            ],
            [
              "V_f",
              "LED forward voltage (about 2 V for red)",
              "V"
            ],
            [
              "I_{LED}",
              "chosen LED current",
              "A"
            ]
          ],
          "why": "An LED has an almost fixed forward voltage, so without a resistor nothing limits its current; the resistor sets it for warning lamps and home-made indicators.",
          "example": "At 12.6 V and 18 mA: \\(R = (12.6 - 2.0) / 0.018 \\approx 590\\ \\Omega\\); the nearest standard value is 560 Ω."
        },
        {
          "type": "exercise",
          "title": "Two bulbs in parallel on one fuse",
          "preset": "parallel-bulbs",
          "task": "Press Test. Select each bulb and the fuse to read their currents. Then select F1 and change it from 5 A to 3 A.",
          "measure": "Current in L1, L2 and F1, and the voltage across each bulb.",
          "expect": "Each 21 W bulb gets about 12.4 V and takes about 1.8 A; the fuse carries the sum, about 3.6 A. The 3 A fuse blows within a few seconds.",
          "why": "Parallel branches each see the full supply voltage, and their currents add in the shared feed. The fuse must be rated above the total, with some margin: about 1.25 to 2 times the normal current."
        },
        {
          "type": "exercise",
          "title": "Voltage drop along a long thin wire",
          "preset": "long-wire",
          "task": "Press Test. Place a voltmeter and wire its leads to the two ends of the long feed wire. Then select the wire and change its cross-section from 0.5 mm² to 1.5 mm².",
          "measure": "Voltmeter reading along the wire, and the lamp voltage, for both sizes.",
          "expect": "About 0.46 V lost along 3 m of 0.5 mm² at 4.6 A; about 0.15 V with 1.5 mm².",
          "why": "R = ρ L / A = 1.68e-8 × 3 / 0.5e-6 ≈ 0.10 Ω, and the drop is I × R. Three times the cross-section gives a third of the resistance. A voltage drop test with the circuit working finds bad wires that an ohm meter can miss."
        },
        {
          "type": "exercise",
          "title": "A relay drives the horn",
          "preset": "relay-horn",
          "task": "Press Test, then hold the push button P1 (press and hold it on the board or in its part panel).",
          "measure": "A2, the current through the button and relay coil, and A1, the horn current through the relay contact.",
          "expect": "About 0.15 A in the button circuit and about 3.1 A in the horn circuit.",
          "why": "The 85 Ω coil draws only 12.6 / 85 ≈ 0.15 A, while the contact switches the heavy current. The handlebar switch and its long thin wires carry only the coil current, so they stay cool and the full voltage reaches the horn."
        },
        {
          "type": "exercise",
          "title": "Why an LED needs a series resistor",
          "preset": "led-bare",
          "task": "Press Test and close S1. LED1 is wired straight across the supply; LED2 has a 560 Ω resistor in series.",
          "measure": "Current in each LED.",
          "expect": "LED1 burns out at once. LED2 runs at about 18 mA, inside its 20 mA rating.",
          "why": "An LED has an almost fixed forward voltage, about 2 V for red, so with no resistor nothing limits the current. The resistor sets it: R = (supply − forward voltage) / current = (12.6 − 2.0) / 0.018 ≈ 590 Ω. Try the LED challenge to find the value for 15 mA."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Current follows from \\(I = P/V\\): an H4 main beam takes about 4.4 A at 13.5 V.<br>LED indicators draw too little current for a standard flasher; fit a load-independent electronic flasher rather than hot load resistors.<br>A fuse protects the wire: rate it below the capacity of the smallest wire and above the normal load.<br>Electronic parts need dedicated earths; a few tenths of a volt of offset corrupts sensor signals.<br>Read a wiring diagram from the load back to the battery, list circuits sharing a fuse, and test at mid-circuit.<br>A healthy CAN bus reads about 60 \\(\\Omega\\) between CAN-H and CAN-L with the battery off."
        }
      ]
    },
    {
      "id": "m3-diagnosis",
      "title": "Electrical diagnosis",
      "lead": "Electrical faults are invisible until you measure them. With a multimeter, Ohm's law and a handful of K-Light reference values you can find almost any fault by method rather than by swapping parts.",
      "lab": "overview/?mode=4t&part=wiring",
      "blocks": [
        {
          "type": "h3",
          "text": "Using the multimeter"
        },
        {
          "type": "photo",
          "src": "repair-photos/086_now_we_start_testing_2.jpg",
          "caption": "Multimeter used to trace a fault"
        },
        {
          "type": "photo",
          "src": "repair-photos/099_reverse.jpg",
          "caption": "Rectifier checked with reversed meter leads"
        },
        {
          "type": "table",
          "head": [
            "Measure",
            "How",
            "Watch out"
          ],
          "rows": [
            [
              "Voltage",
              "In parallel, circuit working",
              "DC for battery and sensors, AC for stator output"
            ],
            [
              "Resistance",
              "Unpowered, component disconnected",
              "Short the probes and use REL: 0.1&ndash;0.3 &Omega; matters on a 0.8 &Omega; stator"
            ],
            [
              "Continuity",
              "Buzzer, low current",
              "One surviving strand passes but drops volts under load"
            ],
            [
              "Current",
              "In series, start on 10 A range",
              "Never across a battery: it is a dead short"
            ],
            [
              "Diode test",
              "Shows forward voltage",
              "0.4&ndash;0.7 V one way, blocks the other (regulator diodes)"
            ]
          ]
        },
        {
          "type": "p",
          "html": "A digital multimeter with <strong>10 M\\(\\Omega\\)</strong> input impedance loads a circuit so lightly that it is safe on ECU sensor lines; an old analogue meter or a test lamp can draw enough current to disturb a 5 V reference. A test lamp still confirms quickly that voltage is present, but not how much, and it stays off ECU circuits."
        },
        {
          "type": "p",
          "html": "Two more tools complete the kit. A <strong>clamp meter</strong> measures starter and charging current without breaking the circuit. A <strong>peak-voltage adapter</strong> reads pulser, exciter and coil primary pulses, which last too short a time for a normal meter to register. Back-probe connectors beside the wire seal or with a purpose-made pin, never by piercing insulation, which admits water and starts corrosion inside the wire."
        },
        {
          "type": "p",
          "html": "Resistance readings need care at both ends of the scale. Probe and lead resistance of 0.1&ndash;0.3 \\(\\Omega\\) is a large share of a 0.8 \\(\\Omega\\) stator reading, so short the probes and use REL first. Any parallel path in the circuit lowers the reading, so disconnect the part being measured."
        },
        {
          "type": "h3",
          "text": "Four kinds of fault"
        },
        {
          "type": "table",
          "head": [
            "Fault",
            "Effect",
            "Typical reading"
          ],
          "rows": [
            [
              "Open circuit",
              "No current, load dead",
              "Full supply voltage across the break; infinite resistance"
            ],
            [
              "Short to earth",
              "Excess current, fuse blows",
              "Near 0 &Omega; supply wire to earth with load disconnected"
            ],
            [
              "Short to supply",
              "Load runs when it should not",
              "Voltage on a wire that should be dead"
            ],
            [
              "High resistance",
              "Load weak or intermittent, connector hot",
              "Voltage drop across a connection under load"
            ]
          ]
        },
        {
          "type": "p",
          "html": "Each fault leaves a signature: an open circuit shows the full supply voltage across the break because no current flows to drop it elsewhere, while a high resistance shows only part of the voltage, and only while current flows. A short to earth is found with the load disconnected and an ohm meter, or with a test lamp in place of the blown fuse. Practice: <a href=\"../repair/repairs/short-circuit-find/\">finding a short circuit</a>, <a href=\"../repair/repairs/wiring-fault-find/\">wiring fault finding</a>."
        },
        {
          "type": "h3",
          "text": "Voltage-drop testing"
        },
        {
          "type": "p",
          "html": "Measure across one section of a circuit <em>while full current flows</em>. By Ohm's law \\(V = I\\,R\\), so at 100 A of starter current even <strong>0.002 \\(\\Omega\\)</strong> drops 0.2 V, while at 3 A of coil current the same 0.2 V would need about 0.067 \\(\\Omega\\). This finds the high resistance a resistance test misses."
        },
        {
          "type": "p",
          "html": "Put the meter's positive probe on the end nearer battery positive and the negative probe on the end nearer the load (on the earth side, the end nearer the load and then battery negative), so a reading of a few tenths of a volt directly shows the voltage lost in that section. Practice: <a href=\"../repair/repairs/voltage-drop-test/\">voltage drop test</a>."
        },
        {
          "type": "keys",
          "items": [
            {
              "l": "Per connection or switch",
              "v": "&le; 0.2 V",
              "p": "including relay contacts"
            },
            {
              "l": "Starter positive side",
              "v": "&le; 0.5 V",
              "p": "battery post to starter terminal while cranking"
            },
            {
              "l": "Starter negative side",
              "v": "&le; 0.3 V",
              "p": "battery negative post to starter body"
            },
            {
              "l": "Electronic earths",
              "v": "&le; 0.1 V",
              "p": "sensors are referenced to earth"
            }
          ]
        },
        {
          "type": "figure",
          "fig": "ohms-law",
          "caption": "Use Ohm's law to see how a small resistance turns into a big voltage drop at high current."
        },
        {
          "type": "p",
          "html": "Worked case: a brake-light circuit draws 1.75 A and loses 0.7 V between battery positive and the lamp terminal. The fault resistance is \\(R = 0.7 / 1.75 = 0.4\\ \\Omega\\), wasting \\(P = 0.7 \\times 1.75 \\approx 1.2\\ \\mathrm{W}\\) as heat, far beyond the 0.2 V limit. While cranking, 0.9 V on the starter positive side with only 0.15 V across the relay puts the remaining 0.75 V in the cables, fuse holder or terminals: move the probes section by section to find it."
        },
        {
          "type": "wiring",
          "tab": "starting",
          "caption": "Fault-finding exercise: trigger the poor starter-earth fault and hold START. The starter clicks or turns slowly although the battery is charged; locate the volts lost on the earth side as you would with a meter in job sheet 3.6.4.",
          "preview": "starting-noearth"
        },
        {
          "type": "check",
          "q": "m3-28"
        },
        {
          "type": "h3",
          "text": "Parasitic drain"
        },
        {
          "type": "p",
          "html": "With the ignition off, the ECU memory, clock, immobiliser or alarm draw current permanently; the K-Light allows <strong>no more than 1 mA</strong>. Disconnect battery negative and put the ammeter in series between the terminal and the lead, start on 10 A to survive any wake-up surge, and step down to mA once the reading settles; modern ECUs can take several minutes to sleep. Then pull fuses one at a time until the drain drops, which identifies the circuit. A stuck brake-light switch, the first check in the K-Light tree, is a frequent cause."
        },
        {
          "type": "eq",
          "id": "m3-drain-time",
          "name": "Time for a drain to discharge a battery",
          "tex": "t = \\frac{C}{I}",
          "where": [
            [
              "t",
              "time to discharge",
              "h"
            ],
            [
              "C",
              "charge available (full capacity, or the part used before the battery is too flat to start)",
              "Ah"
            ],
            [
              "I",
              "drain current",
              "A"
            ]
          ],
          "why": "It sets the limit for standing losses and explains why a few tens of milliamps of drain flattens a small motorcycle battery in about a week.",
          "example": "To 50 % of a 6 Ah battery with an 18 mA drain: \\(t = 3 / 0.018 \\approx 167\\ \\mathrm{h}\\), about 7 days. At the 1 mA limit, full discharge takes \\(6 / 0.001 = 6000\\ \\mathrm{h}\\), yet the battery falls below 50 % in about four months, hence charging every three months."
        },
        {
          "type": "p",
          "html": "Practice: <a href=\"../repair/repairs/parasitic-drain-test/\">parasitic drain test</a>."
        },
        {
          "type": "photo",
          "src": "repair-photos/099_ignition_coils.jpg",
          "caption": "Testing an ignition coil with a meter"
        },
        {
          "type": "h3",
          "text": "Job sheets in brief"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "3.6.1 Battery",
              "html": "Rest 1 h, read OCV (charge below 12.3 V), charge at 0.6 A for 10&ndash;15 h, recheck after 30 min (&ge; 12.8 V), cranking voltage above 9.6 V."
            },
            {
              "title": "3.6.2 Charging",
              "html": "Charged battery first. 14.5 &plusmn; 0.5 V at 5000 rpm; stator pairs 0.8 &plusmn; 0.3 &Omega; and isolated from earth; AC output balanced within about 10 %; diode-test the regulator."
            },
            {
              "title": "3.6.3 Ignition",
              "html": "Battery above 12.4 V, spark test at 6&ndash;8 mm, coil 4 &Omega; / 18.6 k&Omega;, trigger 150 &plusmn; 10 &Omega; and peak above 1.7 V cranking, coil to ECU pins 1 and 13."
            },
            {
              "title": "3.6.4 Starter",
              "html": "Listen for the relay click, then voltage-drop the positive side, relay contacts and negative side while cranking; brushes above 8.5 mm."
            },
            {
              "title": "3.6.5 EFI codes and TPS",
              "html": "FI lamp bulb check, read codes and freeze frame before clearing, TPS reference 5 &plusmn; 0.1 V, signal 0.5&ndash;0.9 V closed rising smoothly to 3.5&ndash;4.0 V."
            }
          ]
        },
        {
          "type": "callout",
          "tone": "elec",
          "title": "Always charge the battery first",
          "html": "A discharged battery pulls the charging voltage down and hides a bad regulator, and sags under cranking like a failing starter. Every reference value assumes a charged battery."
        },
        {
          "type": "h3",
          "text": "Job sheet: charging system output"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Charged battery",
              "html": "Confirm the battery is fully charged; a flat battery pulls the voltage down and hides a regulator fault."
            },
            {
              "title": "Regulated voltage",
              "html": "Engine warm, DMM on DC volts across the battery, raise speed slowly to 5000 rpm: the voltage should rise to 14.0&ndash;15.0 V and stop. With the headlight on main it may fall slightly but should stay above 13.5 V."
            },
            {
              "title": "Interpret",
              "html": "Stuck at battery voltage: no charge (stator, regulator or wiring). Above 15.0 V: regulator not limiting, or a poor regulator earth or sense wire."
            },
            {
              "title": "Regulator wiring",
              "html": "Regulator unplugged: battery voltage on the red wire, continuity from the black wire to earth."
            },
            {
              "title": "Stator resistance and insulation",
              "html": "0.8 \\(\\pm\\) 0.3 \\(\\Omega\\) between each pair of whites; no continuity from any white to engine earth. A winding shorted to the core often shows darkened varnish."
            },
            {
              "title": "AC output",
              "html": "Stator unplugged, engine at a fixed speed: the three pair readings should agree within about 10 % (typically 50&ndash;80 V AC on a small three-phase stator)."
            },
            {
              "title": "Regulator diodes",
              "html": "Diode test red to each white and each white to black, then reverse: about 0.4&ndash;0.7 V one way, blocking the other. Readings vary between meters, so compare the three phases."
            }
          ]
        },
        {
          "type": "wiring",
          "tab": "charging",
          "caption": "Fault-finding exercise: run the engine at 5000 rpm and compare a healthy shunt regulator with a failed one; decide from the battery voltage whether the fault is undercharging or overcharging, and which test from job sheet 3.6.2 confirms it.",
          "preview": "charging-shunt"
        },
        {
          "type": "h3",
          "text": "Job sheet: starter circuit voltage drop"
        },
        {
          "type": "steps",
          "items": [
            {
              "title": "Prepare",
              "html": "Charge the battery and disable the engine so it cranks without starting: remove the fuel pump fuse or earth the plug through a spark tester (not the stop switch, which may also cut the relay)."
            },
            {
              "title": "Relay click",
              "html": "No click: relay coil supply on the green/yellow wire with the brake lever pulled, earth through the black wire with the button pressed, then bench-test the relay: 12 V on the coil should click and give 0 &Omega; across the contacts."
            },
            {
              "title": "Cranking voltage",
              "html": "Above about 9.6 V. Lower with a good battery points to heavy mechanical drag or a shorted starter."
            },
            {
              "title": "Positive side",
              "html": "Battery positive post (not the clamp) to starter terminal while cranking: 0.5 V or less; then section by section to locate any excess."
            },
            {
              "title": "Relay contacts",
              "html": "Across the two heavy relay terminals while cranking: 0.2 V or less, otherwise the contacts are burned."
            },
            {
              "title": "Negative side",
              "html": "Battery negative post to starter body: 0.3 V or less, otherwise clean the engine earth strap and terminal."
            },
            {
              "title": "Starter itself",
              "html": "All drops good but cranking slow: brushes (limit 8.5 mm), commutator and springs. Starter spins without the engine: starter clutch."
            }
          ]
        },
        {
          "type": "p",
          "html": "In the ignition job sheet, a trigger that measures 152 &Omega; (in specification) but peaks at only 0.8 V when cranking has an intact winding: the cause is too large an air gap, a damaged reluctor or too low a cranking speed. A coil can pass its resistance tests and still break down under voltage, so substitution with a known good coil is the final test. Practice: <a href=\"../repair/repairs/battery-test-charge/\">battery test</a>, <a href=\"../repair/repairs/charging-system-test/\">charging test</a>, <a href=\"../repair/repairs/ignition-coil-test/\">coil test</a>, <a href=\"../repair/repairs/starter-circuit-test/\">starter circuit test</a>, <a href=\"../repair/repairs/efi-code-read/\">EFI codes</a>."
        },
        {
          "type": "p",
          "html": "For a TPS code, back-probe the sensor with the key on: reference 5 &plusmn; 0.1 V, and a low reference shared by several sensors means another sensor is shorting the 5 V supply. A TPS that reads 5.0 V at every opening sets P0123; the causes are an open sensor earth, the signal shorted to the reference, or a short inside the connector. Record codes and freeze frame before clearing, and road-test until the MIL stays off."
        },
        {
          "type": "h3",
          "text": "Quick troubleshooting"
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
              "No spark or weak spark",
              "Carbon-bridged plug, cap, coil, trigger, ECU, ignition switch circuit",
              "Ignition job sheet in order"
            ],
            [
              "Good spark, plug dry",
              "Tank vent blocked, pump or filter fault",
              "Pump runs 3 s at key-on; 300 kPa"
            ],
            [
              "Battery undercharged",
              "Brake switch stuck, drain above 1 mA, shorted stator",
              "Drain test; stator resistance"
            ],
            [
              "Voltage too high, bulbs blow",
              "Regulator not limiting, poor regulator earth",
              "Charging voltage at 5000 rpm; earth drop"
            ],
            [
              "No relay click",
              "Brake/clutch/neutral switch or diode, button, relay coil, fuse",
              "Relay coil voltage and earth"
            ],
            [
              "Relay clicks, starter dead",
              "Burned relay contacts, worn brushes",
              "Relay contact voltage drop"
            ],
            [
              "Horn silent",
              "Supply, button contact, horn",
              "Bridge button side to earth"
            ],
            [
              "Good spark, plug wet",
              "Flooding, leaking injector",
              "Clear-flood crank; injector leak test"
            ],
            [
              "Good spark and fuel, low compression",
              "Tight valve clearance, seat leak, worn rings",
              "Compression test; valve clearance"
            ],
            [
              "Turn signals all out",
              "Flasher failed, supply open",
              "Bridge flasher terminals; supply voltage"
            ],
            [
              "All lights out",
              "Main fuse, flat battery, ignition switch",
              "Fuse; battery voltage; switch continuity table"
            ]
          ]
        },
        {
          "type": "check",
          "q": "m3-30"
        },
        {
          "type": "check",
          "q": "m3-41"
        },
        {
          "type": "check",
          "q": "m3-42"
        },
        {
          "type": "h3",
          "text": "Exercises in the Circuit Builder"
        },
        {
          "type": "p",
          "html": "These exercises practise the meter work of this chapter on circuits with a fault built in. Press <strong>Test</strong> to connect the battery; press it again to disconnect it before any ohm reading."
        },
        {
          "type": "exercise",
          "title": "Voltage drop across a bad earth",
          "preset": "bad-earth",
          "task": "Press Test: the 55 W headlight is dim. Place a voltmeter and wire one lead to the lower terminal of the lamp, the other to a new clean earth point. Then select E2 and choose Clean.",
          "measure": "Voltage across the earth connection, voltage across the lamp and its light output, before and after cleaning.",
          "expect": "About 2.0 V across the corroded earth, so the lamp gets about 10.4 V and gives roughly 60 % of its light. Cleaned, the earth drops under 0.05 V and the lamp is at full brightness.",
          "why": "The earth is in series with the lamp: the same 4 A flows through 0.5 Ω and loses 2 V there. A good connection should drop no more than about 0.1 V to 0.2 V with the circuit working."
        },
        {
          "type": "exercise",
          "title": "Find the open filament with the ohm meter",
          "preset": "open-bulb",
          "task": "Press Test: L2 stays dark. Press Test again to disconnect the battery. Wire DMM1, set to ohms, across L2. Read it with S2 closed, then with S2 open.",
          "measure": "Resistance across L2 with its switch closed and open, and across a good bulb for comparison.",
          "expect": "With S2 closed the meter reads about 0.35 Ω through the other two lamps. With S2 open it reads OL: the filament is open. A good cold 21 W bulb reads about 0.7 Ω.",
          "why": "An ohm meter pushes its own small test current, so it needs a dead circuit, and any parallel path adds to the reading. Isolate the part first. A cold tungsten filament reads about a tenth of its hot resistance (144 / 21 ≈ 6.9 Ω)."
        },
        {
          "type": "exercise",
          "title": "A short circuit and the fuse",
          "preset": "short",
          "task": "Press Test: L1 lights. Close S2, which connects the feed straight to earth. Replace the fuse with S2 still closed, then open S2 and replace it again.",
          "measure": "Battery current at the moment of the short, and the state of F1.",
          "expect": "Over 200 A flows for an instant and the 10 A fuse blows at once. A new fuse blows again until the short is removed.",
          "why": "With almost no resistance in the path, only the battery's internal resistance and the wires limit the current. The fuse protects the wiring, not the load; a fuse that blows again on replacement means a short still in the circuit."
        },
        {
          "type": "exercise",
          "title": "Ammeter in the wrong place",
          "preset": "bulb",
          "task": "Press Test. Place a multimeter, set it to amps, and wire it across the bulb L1 instead of in series. Then remove it and put an ammeter in series between the switch and the bulb.",
          "measure": "What happens with the meter across the bulb, and the reading in series.",
          "expect": "Across the bulb the meter shorts the circuit: its 10 A fuse or the 3 A circuit fuse blows and the bulb goes out. In series it reads about 1.8 A and the bulb stays lit.",
          "why": "On the amps range a meter has almost no resistance, so it must replace a piece of wire in the path of the current. Voltage is measured across a part; current is measured through it."
        },
        {
          "type": "callout",
          "tone": "warm",
          "title": "Key points",
          "html": "Measure voltage in parallel with the circuit working, resistance with it dead and disconnected, current in series starting on 10 A.<br>A continuity buzzer proves a path exists, not that it carries current; a voltage-drop test under load does.<br>Limits: 0.2 V per connection, 0.5 V starter positive side, 0.3 V negative side, 0.1 V for electronic earths.<br>The K-Light allows 1 mA of drain; find a larger one by pulling fuses with the ammeter in series.<br>Charge the battery before any charging or starter test, because every reference value assumes it.<br>Work from the job sheet in order, and confirm a repair with a road test and a clear MIL."
        },
        {
          "type": "videos",
          "title": "Watch",
          "items": [
            {
              "id": "NB5F_Qu4ixE",
              "title": "OH NO! My motorcycle wont start. Now what?",
              "channel": "Srkcycles",
              "channel_url": "http://www.youtube.com/@Srkcycles",
              "duration": "4:34",
              "role": "How it works",
              "note": "Top reasons a modern bike will not start: kill switch, side stand, battery; quick first checks."
            }
          ]
        }
      ]
    }
  ]
};
