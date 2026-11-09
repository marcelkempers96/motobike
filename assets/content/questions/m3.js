const M = "fuel";

export default [
  // 3.1 Air, fuel and mixture
  {
    id: "m3-01", module: M, chapter: "m3-mixture", kind: "calc",
    q: "A wideband sensor reads AFR 12.5 on petrol at full throttle. What is lambda, and is the mixture rich or lean?",
    options: ["About 1.18, lean", "About 0.85, rich", "About 0.85, lean", "About 1.18, rich"],
    answer: 1,
    explain: "Lambda = 12.5 / 14.7 = 0.85. Below 1 means excess fuel, so rich: the normal full-load enrichment range. Dividing the wrong way (14.7 / 12.5) gives the 1.18 distractor.",
  },
  {
    id: "m3-02", module: M, chapter: "m3-mixture", kind: "recall",
    q: "On a slide carburettor, which throttle range does the jet needle (taper and clip position) mainly govern?",
    options: ["Closed to 1/8", "1/8 to 1/4", "1/4 to 3/4", "3/4 to full"],
    answer: 2,
    explain: "Pilot jet: closed to 1/8. Slide cutaway: 1/8 to 1/4. Jet needle: 1/4 to 3/4. Main jet: 3/4 to full. The circuits follow throttle opening, not rpm.",
  },
  {
    id: "m3-03", module: M, chapter: "m3-mixture", kind: "diagnosis",
    q: "A slide carburettor runs well at full throttle but surges and runs hot at half throttle. What is the right adjustment?",
    options: [
      "Fit a larger main jet",
      "Lower the needle clip one groove to raise the needle",
      "Raise the needle clip one groove to lower the needle",
      "Turn the pilot fuel screw in half a turn",
    ],
    answer: 1,
    explain: "Half throttle is jet-needle territory, and surging plus heat means lean. Lowering the clip raises the needle and richens 1/4 to 3/4. The main jet only matters from about 3/4 open, and full throttle is already fine.",
  },
  {
    id: "m3-04", module: M, chapter: "m3-mixture", kind: "diagnosis",
    q: "A blocked air filter makes a carburetted engine run rich. What is the main symptom on a speed-density injected engine?",
    options: [
      "Black smoke from the mixture going rich",
      "A lean misfire at idle only",
      "Loss of power, with mixture staying near target",
      "No change, because the ECU ignores the filter",
    ],
    answer: 2,
    explain: "The MAP sensor reads the lower manifold pressure, so the ECU calculates less air and injects less fuel. Mixture stays near target but the engine is short of air, so it loses power. In a carb the extra depression pulls more fuel from every jet instead.",
  },
  {
    id: "m3-05", module: M, chapter: "m3-mixture", kind: "diagnosis",
    q: "A carburetted bike stops after about 15 km and restarts after the filler cap is opened (with a hiss). What is the fault?",
    options: ["Float level set too high", "Torn CV diaphragm", "Pilot jet blocked", "Blocked tank vent"],
    answer: 3,
    explain: "Fuel drawn from a sealed tank builds a vacuum above the fuel until flow stops. Opening the cap admits air and cures it until the vacuum builds again.",
  },
  {
    id: "m3-06", module: M, chapter: "m3-mixture", kind: "calc",
    q: "A carburettor gives lambda 0.95 at sea level. At 2000 m the air is 20 % less dense and fuel flow is unchanged. Estimate lambda at 2000 m.",
    options: ["About 1.14", "About 0.95", "About 0.86", "About 0.76"],
    answer: 3,
    explain: "Air mass falls to 0.8 of sea level with the same fuel, so lambda = 0.95 x 0.8 = 0.76: very rich. The bike would need smaller jets. A carb meters by air velocity, not air mass.",
  },

  // 3.2 EFI
  {
    id: "m3-07", module: M, chapter: "m3-efi", kind: "calc",
    q: "A four-stroke single uses a 5.9 ms injector pulse width. What is the injector duty cycle at 6000 rpm?",
    options: ["About 15 %", "About 30 %", "About 44 %", "About 59 %"],
    answer: 1,
    explain: "One injection every two revolutions: cycle time = 2 x 60 / 6000 = 20 ms. Duty cycle = 5.9 / 20 = about 30 %. (At 9000 rpm the same pulse gives about 44 %.)",
  },
  {
    id: "m3-08", module: M, chapter: "m3-efi", kind: "calc",
    q: "A K-Light TPS reads 0.70 V at closed throttle with a 5.00 V reference. Is it within the 14 % +/- 5 % specification?",
    options: [
      "Yes, it is 14 %, exactly nominal",
      "No, it is 7 %, too low",
      "No, it is 20 %, too high",
      "Yes, it is 10 %, at the lower limit",
    ],
    answer: 0,
    explain: "0.70 / 5.00 = 0.14 = 14 %, exactly the nominal value, and inside the 0.5-0.9 V closed-throttle range.",
  },
  {
    id: "m3-09", module: M, chapter: "m3-efi", kind: "diagnosis",
    q: "On a warm K-Light at 4000 rpm the oxygen sensor reads a steady 0.45 V. Which code is likely, and what is one possible cause?",
    options: [
      "P0132, injector leaking",
      "P0131, blocked fuel filter",
      "P0134, sensor heater circuit open",
      "P0123, TPS signal shorted to 5 V",
    ],
    answer: 2,
    explain: "P0134 is set when the signal sits between 0.35 and 0.55 V: no activity. Causes include an open heater (check 9.6 ohm), a poisoned or aged sensor, an open signal wire, or an exhaust leak ahead of the sensor.",
  },
  {
    id: "m3-10", module: M, chapter: "m3-efi", kind: "recall",
    q: "Why does a three-way catalyst need the mixture held at lambda = 1 by closed-loop control?",
    options: [
      "Below lambda 1 the substrate melts immediately",
      "Oxidising CO and HC needs oxygen while reducing NOx needs its absence; both only work together near stoichiometric",
      "The catalyst only reaches light-off temperature at lambda 1",
      "The oxygen sensor only produces a voltage at lambda 1",
    ],
    answer: 1,
    explain: "Platinum and palladium oxidise CO and HC (needing oxygen); rhodium reduces NOx (needing CO and H2 and little free oxygen). Both happen together only within about +/-0.5 % of stoichiometric AFR, and only closed-loop feedback can hold that band.",
  },
  {
    id: "m3-11", module: M, chapter: "m3-efi", kind: "recall",
    q: "What fuel pressure does the K-Light manual specify at the injector rail at idle, and below what value is it a fault?",
    options: ["300 kPa, fault below 270 kPa", "250 kPa, fault below 200 kPa", "350 kPa, fault below 300 kPa", "100 kPa, fault below 85 kPa"],
    answer: 0,
    explain: "300 kPa at idle with a fault threshold of 270 kPa. Below it, check for leaks, a pump running in reverse (reversed connector) and a blocked filter.",
  },
  {
    id: "m3-12", module: M, chapter: "m3-efi", kind: "diagnosis",
    q: "A K-Light stores P0118 (engine temperature signal above 4.9 V). Why might the thermistor itself be fine?",
    options: [
      "P0118 is only set by a failing ECU",
      "Any open circuit between the 5 V pull-up and earth, such as a backed-out pin, gives the same voltage",
      "P0118 means the engine is genuinely overheating",
      "A short to earth in the signal wire produces P0118",
    ],
    answer: 1,
    explain: "P0118 is a circuit range check. A backed-out terminal, broken wire, corroded connector or open sensor earth all read like an open thermistor. A short to earth gives the low code, P0117.",
  },

  // 3.3 Ignition
  {
    id: "m3-31", module: M, chapter: "m3-mixture", kind: "calc",
    q: "A carburettor delivers an AFR of 14.1:1. What is lambda on pure petrol (stoichiometric 14.7:1), and what happens on E10 (stoichiometric about 14.1:1)?",
    options: ["0.96 on petrol, about 1.0 on E10: leaner", "1.04 on petrol, about 1.0 on E10: richer", "0.96 on petrol, about 0.92 on E10: richer", "1.00 on both, because lambda ignores the fuel"],
    answer: 0,
    explain: "Lambda = 14.1 / 14.7 = 0.96 on petrol. On E10 the same ratio is 14.1 / 14.1 = 1.0, about 4 % leaner, because ethanol carries some of its own oxygen.",
  },
  {
    id: "m3-32", module: M, chapter: "m3-mixture", kind: "diagnosis",
    q: "A carburetted bike with a vacuum-operated fuel tap has stood for a week. The oil level is above the maximum mark and the oil smells of petrol. What is the most likely cause?",
    options: [
      "A blocked tank vent",
      "A split tap diaphragm together with a leaking float needle",
      "A main jet that is too large",
      "A torn CV piston diaphragm",
    ],
    answer: 1,
    explain: "A split vacuum diaphragm lets fuel flow with the engine stopped; if the float needle also leaks, the bowl overflows into the inlet and petrol reaches the crankcase, diluting the oil. Change the oil after repairing both.",
  },
  {
    id: "m3-33", module: M, chapter: "m3-efi", kind: "calc",
    q: "A 250 cm3 single runs at volumetric efficiency 0.90, air density 1.18 kg/m3 and lambda 1 on petrol. Its injector flows 150 g/min. About how long must the injector stay open, before dead time?",
    options: ["About 2.5 ms", "About 4.8 ms", "About 7.2 ms", "About 18 ms"],
    answer: 2,
    explain: "Air = 250e-6 x 1.18 x 0.90 = 0.2655 g. Fuel = 0.2655 / 14.7 = 18.1 mg. 150 g/min = 2.5 mg/ms, so open time = 18.1 / 2.5 = about 7.2 ms, plus a dead time of typically 0.6 to 1.2 ms.",
  },
  {
    id: "m3-34", module: M, chapter: "m3-efi", kind: "diagnosis",
    q: "A K-Light engine temperature sensor reads 2.0 kohm in a 25 degree workshop, and still 2.0 kohm after a 20-minute ride. What driveability fault follows?",
    options: [
      "Lean running and a hard cold start",
      "Rich running, high idle and high fuel consumption when hot",
      "No effect, because the oxygen sensor corrects everything",
      "The engine will not crank",
    ],
    answer: 1,
    explain: "Hot, the sensor should fall towards 0.18 kohm at 100 degrees. A fixed 2.0 kohm tells the ECU the engine is at 25 degrees for ever, so it keeps cold enrichment and raised idle: rich, high idle, high consumption. Check the sensor seating as well as the sensor.",
  },
  // 3.2 Fuel supply
  {
    id: "m3-51", module: M, chapter: "m3-fuel-supply", kind: "calc",
    q: "In a gravity-fed system the fuel surface stands 0.4 m above the float bowl. Petrol density is about 740 kg/m3. Roughly what pressure pushes fuel to the carburettor?",
    options: ["About 0.29 kPa", "About 2.9 kPa", "About 29 kPa", "About 300 kPa"],
    answer: 1,
    explain: "p = rho g h = 740 x 9.81 x 0.4 = about 2900 Pa, or 2.9 kPa: about one hundredth of the 300 kPa an injection pump delivers. That is why a small vacuum in a tank with a blocked vent stops a gravity feed.",
  },
  {
    id: "m3-52", module: M, chapter: "m3-fuel-supply", kind: "diagnosis",
    q: "A carburetted bike with a manual tap starves and stops on ON with the tank half full, but runs normally as soon as the tap is turned to RES. What is the most likely cause?",
    options: [
      "A blocked ON pick-up tube or its strainer in the tap",
      "A blocked tank vent",
      "A main jet that is too small",
      "A split vacuum-tap diaphragm",
    ],
    answer: 0,
    explain: "RES draws through a separate, lower pick-up. If RES flows and ON does not with fuel above the ON tube, the ON pick-up or its screen is blocked. A blocked vent or a small main jet would affect both positions; a manual tap has no diaphragm.",
  },
  // 3.3 Carburettors
  {
    id: "m3-53", module: M, chapter: "m3-carburettor", kind: "calc",
    q: "Air speed through a venturi throat doubles while the speed at the bell stays negligible. By roughly what factors do the venturi depression and the ideal jet flow rise?",
    options: ["Depression x2, jet flow x2", "Depression x4, jet flow x4", "Depression x2, jet flow x1.41", "Depression x4, jet flow x2"],
    answer: 3,
    explain: "Depression = 0.5 rho v^2, so doubling v multiplies it by 4. Jet flow rises with the square root of the depression: sqrt(4) = 2. Ideally fuel flow follows air speed, which is the basis of carburettor metering.",
  },
  {
    id: "m3-54", module: M, chapter: "m3-carburettor", kind: "diagnosis",
    q: "After six months in storage a carburetted engine starts and runs only with the choke on, and stalls as soon as the choke is pushed off. Spark and compression are good. What is the most likely cause?",
    options: [
      "A main jet blocked with varnish",
      "A float level set too high",
      "A pilot jet or idle passage blocked with varnish",
      "A torn CV diaphragm",
    ],
    answer: 2,
    explain: "The choke (enricher) circuit supplies its own fuel, so the engine runs on it. Without it, idle depends on the pilot jet and idle ports, the smallest passages and the first to block when fuel turns to varnish. A main jet fault shows at full throttle; a torn diaphragm stops the engine revving, not idling.",
  },
  // 3.5 Intake, exhaust and emissions
  {
    id: "m3-55", module: M, chapter: "m3-intake-exhaust", kind: "calc",
    q: "1500 mg/km of CO enters a catalyst and 225 mg/km leaves it. What is the catalyst's conversion efficiency for CO?",
    options: ["15 %", "85 %", "87 %", "6.7 %"],
    answer: 1,
    explain: "Efficiency = (in - out) / in x 100 % = (1500 - 225) / 1500 x 100 % = 85 %. The 15 % distractor is the fraction that passes through; 6.7 is in / out.",
  },
  {
    id: "m3-56", module: M, chapter: "m3-intake-exhaust", kind: "diagnosis",
    q: "An injected single pops on the overrun, uses more fuel than before and has black soot streaks round the header flange at the head. What is the most likely cause and its effect?",
    options: [
      "A blocked catalyst raising back pressure",
      "A blocked air filter making the mixture rich",
      "A split intake rubber letting unmetered air in",
      "A leaking port gasket letting air reach the oxygen sensor, which reads lean so the ECU adds fuel",
    ],
    answer: 3,
    explain: "Soot at the flange shows gas escaping there. On the overrun the leak draws air into the pipe, where it burns with unburned fuel and pops; the oxygen sensor sees the extra oxygen as a lean mixture and the ECU richens, so consumption rises. Fit a new gasket: a crushed one never seals twice.",
  },
  // 3.6 Fuel system diagnosis
  {
    id: "m3-57", module: M, chapter: "m3-fuel-diagnosis", kind: "calc",
    q: "An engine produces 10 kW at a brake thermal efficiency of 0.30. Petrol has a lower heating value of 43 MJ/kg and a density of 0.74 kg/L. About how much fuel does it burn per minute?",
    options: ["About 6 mL", "About 630 mL", "About 63 mL", "About 3.8 L"],
    answer: 2,
    explain: "V = P / (eta x Q x rho) = 10 / (0.30 x 43 000 x 0.74) = about 0.00105 L/s, or 3.8 L/h, which is about 63 mL per minute. A healthy gravity supply flows far more, so a supply fault that shows only at full power is a restriction close to this demand.",
  },
  {
    id: "m3-58", module: M, chapter: "m3-fuel-diagnosis", kind: "diagnosis",
    q: "A carburetted engine cranks but will not start. Spark and compression are good. A few drops of fresh fuel in the intake make it fire, run for a moment and die. What does this show?",
    options: [
      "The fault is in the fuel path: supply or carburettor",
      "The ignition timing is wrong",
      "The engine is flooded",
      "The fuel in the tank has too high an octane rating",
    ],
    answer: 0,
    explain: "With spark and compression proven, an engine that runs on a fuel shot is simply not receiving fuel from its own system. Check the vent, tap, filter and hose with a flow test, then the bowl and jets. A flooded engine would not fire better with more fuel.",
  },
];
