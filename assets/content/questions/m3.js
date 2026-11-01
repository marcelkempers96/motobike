const M = "fuel-ignition";

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
      "Any open circuit between the 5 V pull-up and ground, such as a backed-out pin, gives the same voltage",
      "P0118 means the engine is genuinely overheating",
      "A short to ground in the signal wire produces P0118",
    ],
    answer: 1,
    explain: "P0118 is a circuit range check. A backed-out terminal, broken wire, corroded connector or open sensor ground all read like an open thermistor. A short to ground gives the low code, P0117.",
  },

  // 3.3 Ignition
  {
    id: "m3-13", module: M, chapter: "m3-ignition", kind: "calc",
    q: "A coil has 200 primary turns and 20 000 secondary turns. What secondary voltage is available from a 300 V primary kick, ignoring losses?",
    options: ["3 kV", "6 kV", "30 kV", "60 kV"],
    answer: 2,
    explain: "Turns ratio = 20 000 / 200 = 100. Secondary voltage = 300 V x 100 = 30 kV.",
  },
  {
    id: "m3-14", module: M, chapter: "m3-ignition", kind: "calc",
    q: "A 4 ohm coil primary with 4 mH inductance runs at 12.0 V. What energy is stored when the current is interrupted?",
    options: ["6 mJ", "18 mJ", "36 mJ", "72 mJ"],
    answer: 1,
    explain: "I = 12 / 4 = 3.0 A. E = 1/2 x L x I^2 = 0.5 x 0.004 x 9 = 0.018 J = 18 mJ. Forgetting the 1/2 gives 36 mJ.",
  },
  {
    id: "m3-15", module: M, chapter: "m3-ignition", kind: "recall",
    q: "Which ignition system still produces a spark with a completely dead battery?",
    options: ["AC-CDI", "DC-CDI", "Transistorised (TCI)", "ECU-mapped inductive ignition"],
    answer: 0,
    explain: "AC-CDI charges its capacitor from an exciter coil on the alternator stator, so it needs no battery. DC-CDI, TCI and ECU systems all run from the battery.",
  },
  {
    id: "m3-16", module: M, chapter: "m3-ignition", kind: "calc",
    q: "How much time passes between a spark at 32 degrees BTDC and TDC at 8000 rpm?",
    options: ["About 0.27 ms", "About 0.67 ms", "About 1.3 ms", "About 4.0 ms"],
    answer: 1,
    explain: "t = angle / (6 x rpm) = 32 / (6 x 8000) = 0.00067 s = 0.67 ms. One rpm is 6 degrees per second.",
  },
  {
    id: "m3-17", module: M, chapter: "m3-ignition", kind: "diagnosis",
    q: "A city commuter on D7RTC plugs keeps fouling them. The mixture checks out. Which plug change makes sense?",
    options: [
      "D8RTC, because a higher number runs hotter",
      "D6RTC, because a lower number is hotter in this scheme",
      "D8RTC, because a colder plug burns off deposits",
      "A non-resistor D7TC to strengthen the spark",
    ],
    answer: 1,
    explain: "In the NGK-style scheme a higher number is colder. An 8 would foul even faster; a low-load city bike needs a hotter plug (6). Dropping the resistor risks ECU interference.",
  },
  {
    id: "m3-18", module: M, chapter: "m3-ignition", kind: "diagnosis",
    q: "A plug comes out with a white, blistered insulator and eroded electrodes. Which is a likely cause?",
    options: ["Over-advanced ignition timing", "Over-rich mixture", "Oil passing the rings", "Plug heat range too cold"],
    answer: 0,
    explain: "White and blistered means too hot: lean mixture or air leak, over-advanced timing, too hot a plug, or overheating. Rich mixture and too cold a plug give black soot; oil gives wet black deposits.",
  },

  // 3.4 Battery, charging and starting
  {
    id: "m3-19", module: M, chapter: "m3-battery-charging", kind: "calc",
    q: "A 6 Ah battery at 50 % is charged by the 10 % rule with 80 % charge efficiency. Roughly how long does it take?",
    options: ["About 3.8 h", "About 5 h", "About 6.3 h", "About 10 h"],
    answer: 2,
    explain: "Current = 10 % of 6 Ah = 0.6 A. Charge needed = 3 Ah; at 80 % efficiency input = 3 / 0.8 = 3.75 Ah. Time = 3.75 / 0.6 = about 6.3 h.",
  },
  {
    id: "m3-20", module: M, chapter: "m3-battery-charging", kind: "recall",
    q: "A K-Light AGM battery reads 12.3 V after resting 1 hour. What does this mean?",
    options: [
      "Fully charged, no action",
      "About 75 %, ride to top it up",
      "About 50 %, the manual says it must be charged",
      "A dead cell, replace immediately",
    ],
    answer: 2,
    explain: "12.3 V rested is about 50 % for AGM, and the K-Light manual says a battery at 12.3 V after 1 hour without running must be charged. Fully charged is 13.1 V.",
  },
  {
    id: "m3-21", module: M, chapter: "m3-battery-charging", kind: "diagnosis",
    q: "A K-Light three-phase stator reads 0.8, 0.8 and 0.2 ohm between its three pairs of white wires. What does this show?",
    options: [
      "All within spec; look at the regulator",
      "An open winding on one pair",
      "Shorted turns on the low pair, so low output",
      "A winding shorted to the stator core",
    ],
    answer: 2,
    explain: "Spec is 0.8 +/- 0.3 ohm. 0.2 ohm is below that, suggesting shorted turns and low output. An open winding reads infinite; a short to the core is found by testing each white wire to earth.",
  },
  {
    id: "m3-22", module: M, chapter: "m3-battery-charging", kind: "diagnosis",
    q: "The K-Light charging voltage reads 16.2 V at 5000 rpm. What is the likely fault?",
    options: [
      "Shorted stator turns",
      "Regulator not limiting, or a poor regulator earth",
      "Sulphated battery",
      "Starter relay contacts burned",
    ],
    answer: 1,
    explain: "Spec is 14.5 +/- 0.5 V. Above 15 V the regulator is not limiting (failed regulator or poor earth or sense wire). Left alone it dries the battery, blows bulbs and can damage the ECU.",
  },
  {
    id: "m3-23", module: M, chapter: "m3-battery-charging", kind: "diagnosis",
    q: "The starter spins freely and whines, but the engine does not turn over. Which part is faulty?",
    options: ["Starter relay", "Starter brushes", "Neutral switch", "Starter (one-way) clutch"],
    answer: 3,
    explain: "If the motor spins but the crank does not, the drive is not being transmitted: the one-way starter clutch is slipping. Relay or interlock faults stop the motor turning at all; worn brushes make it turn slowly.",
  },

  // 3.5 Lighting, signalling and wiring
  {
    id: "m3-24", module: M, chapter: "m3-lighting-wiring", kind: "calc",
    q: "A 10 W R10W indicator bulb is replaced by a 1.5 W LED. What parallel load resistor restores the original load at 12 V?",
    options: ["1.2 ohm, 1 W", "7.2 ohm, 5 W", "14.4 ohm, 10 W", "96 ohm, 1.5 W"],
    answer: 2,
    explain: "R = V^2 / P = 144 / 10 = 14.4 ohm, and it must dissipate 10 W, as much heat as the bulb, so mount it on metal. A load-independent LED flasher is the better fix.",
  },
  {
    id: "m3-25", module: M, chapter: "m3-lighting-wiring", kind: "diagnosis",
    q: "With the battery disconnected you measure 120 ohm between CAN-H and CAN-L. What does it indicate?",
    options: [
      "A healthy bus",
      "CAN-H and CAN-L shorted together",
      "One terminator or one end of the bus open",
      "A module holding the bus dominant",
    ],
    answer: 2,
    explain: "Two 120 ohm terminators in parallel give about 60 ohm. Reading 120 ohm means only one is in circuit: a terminator is missing or open, or the wiring to one end is broken. Near 0 ohm would be a short.",
  },
  {
    id: "m3-26", module: M, chapter: "m3-lighting-wiring", kind: "diagnosis",
    q: "The horn and the brake light are both dead; everything else works. Using the wiring-diagram method, what is the first check?",
    options: [
      "Check whether they share a fuse and test that fuse",
      "Replace the horn and the brake bulb",
      "Test the charging voltage",
      "Measure CAN bus resistance",
    ],
    answer: 0,
    explain: "Two loads failing together point to something they share. Identify every circuit on the fuse; if both are on one, test that fuse first.",
  },

  // 3.6 Electrical diagnosis
  {
    id: "m3-27", module: M, chapter: "m3-diagnosis", kind: "calc",
    q: "A brake-light circuit draws 1.75 A and you measure 0.7 V between battery positive and the lamp supply terminal. What resistance causes it, and what power is wasted?",
    options: ["0.4 ohm, about 1.2 W", "2.5 ohm, about 0.4 W", "0.4 ohm, about 0.3 W", "1.2 ohm, about 2.1 W"],
    answer: 0,
    explain: "R = V / I = 0.7 / 1.75 = 0.4 ohm. P = V x I = 0.7 x 1.75 = about 1.2 W. That drop is far above the 0.2 V per-connection limit.",
  },
  {
    id: "m3-28", module: M, chapter: "m3-diagnosis", kind: "diagnosis",
    q: "While cranking you read 0.9 V from battery positive post to starter terminal, and 0.15 V across the relay heavy terminals. Where is the fault?",
    options: [
      "Burned relay contacts",
      "In the cables, fuse holder or terminals on the positive side",
      "In the negative earth strap",
      "Nowhere; both readings are within limits",
    ],
    answer: 1,
    explain: "The positive side limit is 0.5 V, so 0.9 V fails. The relay (0.15 V) is within its 0.2 V limit, leaving about 0.75 V in cables, fuse holder or terminals. Move the probes section by section to find it.",
  },
  {
    id: "m3-29", module: M, chapter: "m3-diagnosis", kind: "calc",
    q: "A bike with a 6 Ah battery has an 18 mA parasitic drain. Roughly how long until the battery is at 50 %?",
    options: ["About 17 hours", "About 7 days", "About 14 days", "About 4 months"],
    answer: 1,
    explain: "50 % of 6 Ah = 3 Ah. t = 3 / 0.018 = about 167 h, about 7 days. The K-Light limit is 1 mA; find the circuit by pulling fuses one at a time.",
  },
  {
    id: "m3-30", module: M, chapter: "m3-diagnosis", kind: "diagnosis",
    q: "A continuity test says a wire is fine, yet the lamp it feeds is dim. What is the correct next test?",
    options: [
      "Resistance test with the circuit powered",
      "Replace the fuse with a higher rating",
      "Diode test across the lamp",
      "Voltage-drop test with the circuit operating",
    ],
    answer: 3,
    explain: "Continuity needs only a tiny current, so a wire with one strand left or a corroded terminal passes but drops volts at load current. Measure voltage drop with the circuit working. Resistance tests must never be done powered.",
  },
];
