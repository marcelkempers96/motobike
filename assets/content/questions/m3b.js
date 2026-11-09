const M = "electrics";

export default [
  // 3.1 Air, fuel and mixture
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
  // Added 2026-11: one or two more per chapter
  {
    id: "m3-35", module: M, chapter: "m3-ignition", kind: "calc",
    q: "A K-Light coil secondary measures 13.6 kohm without the plug cap and 40 kohm with it. What resistance is the cap, and what should be done?",
    options: [
      "About 5 kohm: normal, refit it",
      "About 26 kohm: far above the normal 5 kohm, measure the cap alone and replace it",
      "About 54 kohm: the coil is shorted",
      "About 13.6 kohm: the cap is open circuit",
    ],
    answer: 1,
    explain: "40 - 13.6 = 26.4 kohm. The normal total is 18.6 kohm, so a healthy cap is about 5 kohm. A cap this high weakens the spark; confirm by measuring it alone (or a partly open secondary) and replace it.",
  },
  {
    id: "m3-36", module: M, chapter: "m3-ignition", kind: "recall",
    q: "On a contact-breaker ignition the point gap is increased. What happens to timing and dwell?",
    options: [
      "Timing unchanged, dwell longer",
      "Points open earlier (more advance) and dwell becomes shorter",
      "Points open later (less advance) and dwell becomes longer",
      "Only the spark voltage changes",
    ],
    answer: 1,
    explain: "A wider gap means the rubbing block meets the cam ramp earlier, so the points open earlier and close later: more advance, less dwell. That is why points are always gapped first and timed second.",
  },
  {
    id: "m3-37", module: M, chapter: "m3-battery-charging", kind: "diagnosis",
    q: "A rider can start the engine in neutral, but not in gear with the clutch lever pulled and the side stand up. Which parts are suspect?",
    options: [
      "Starter relay and main fuse",
      "Clutch switch, its wiring or connector, or the diode that links it into the relay circuit",
      "Starter clutch",
      "Neutral switch",
    ],
    answer: 1,
    explain: "The neutral path works, so the relay, fuse, button and starter are fine. Starting in gear relies on the clutch switch, connected through a diode so the neutral lamp stays off; test the switch continuity and the diode.",
  },
  {
    id: "m3-38", module: M, chapter: "m3-battery-charging", kind: "recall",
    q: "Why must a LiFePO4 starter battery not be charged below about 0 degrees C, nor on a charger's desulphation mode?",
    options: [
      "Both make the battery sulphate",
      "Cold charging plates lithium on the anode, and desulphation pulses exceed the 14.6 V cell limit",
      "Both only slow the charge down",
      "Lithium batteries cannot be charged by a motorcycle alternator",
    ],
    answer: 1,
    explain: "Below about 0 degrees, metallic lithium plates on the anode, permanently cutting capacity and risking an internal short; many BMS units block cold charging. Desulphation pulses that a lead-acid battery tolerates go above the 14.6 V a lithium battery accepts.",
  },
  {
    id: "m3-39", module: M, chapter: "m3-lighting-wiring", kind: "calc",
    q: "An H4 main beam (60 W) runs at 13.5 V through a corroded connector of 0.15 ohm. About how much power is lost as heat in the connector?",
    options: ["About 0.7 W", "About 2.9 W", "About 9 W", "About 27 W"],
    answer: 1,
    explain: "I = P / V = 60 / 13.5 = 4.4 A. P = I squared x R = 4.4 x 4.4 x 0.15 = about 2.9 W, with a 0.67 V drop that dims the lamp and heats the connector until it melts.",
  },
  {
    id: "m3-40", module: M, chapter: "m3-lighting-wiring", kind: "recall",
    q: "Why does a thermal flasher change its flash rate when one indicator bulb fails?",
    options: [
      "The remaining bulb is brighter",
      "Its bimetal strip is heated by the lamp current, which halves, so it no longer reaches its switching temperature at the designed rate",
      "The battery voltage rises",
      "The indicator switch contacts open",
    ],
    answer: 1,
    explain: "A thermal flasher only switches at its designed rate with the designed load current. Half the current heats the bimetal more slowly, so the rate changes: a built-in bulb-failure warning, and the reason LED indicators upset it.",
  },
  {
    id: "m3-41", module: M, chapter: "m3-diagnosis", kind: "diagnosis",
    q: "With a charged battery the charging voltage stays at 12.6 V at 5000 rpm. Stator pairs read 0.8, 0.9 and 0.8 ohm and are isolated from earth. What is the next test?",
    options: [
      "Replace the stator",
      "AC output between each pair with the engine running, then the regulator wiring, then a diode test of the regulator",
      "A parasitic drain test",
      "Fit a larger main fuse",
    ],
    answer: 1,
    explain: "Resistance and insulation pass, so the windings are probably sound. Check that they actually produce balanced AC output, then the red and black wires at the regulator connector, and finally the regulator diodes.",
  },
  {
    id: "m3-42", module: M, chapter: "m3-diagnosis", kind: "diagnosis",
    q: "A K-Light trigger coil measures 152 ohm, but its peak voltage when cranking is only 0.8 V. What is the probable cause?",
    options: [
      "Open trigger winding",
      "Shorted trigger winding",
      "Air gap to the reluctor too large, a damaged reluctor or slow cranking",
      "A failed ignition coil secondary",
    ],
    answer: 2,
    explain: "150 +/- 10 ohm is in specification, so the winding is intact. The signal depends on how fast the reluctor flux changes, so a large gap, a damaged tab or low cranking speed gives a peak below the 1.7 V minimum.",
  },
  // 4.1 Electrical fundamentals and measurement
  {
    id: "m3b-01", module: M, chapter: "m3-electrical-basics", kind: "calc",
    q: "A brake-lamp circuit has a 6.9 ohm bulb in series with a corroded connector of 0.5 ohm, on a 12.4 V supply. Approximately what voltage reaches the bulb?",
    options: ["12.4 V", "11.6 V", "10.4 V", "6.2 V"],
    answer: 1,
    explain: "Series resistances add: 6.9 + 0.5 = 7.4 ohm, so I = 12.4 / 7.4 = 1.68 A. The bulb gets 1.68 x 6.9 = 11.6 V and the connector loses the other 0.84 V.",
  },
  {
    id: "m3b-02", module: M, chapter: "m3-electrical-basics", kind: "diagnosis",
    q: "A tail lamp does not light. With the switch on and the black probe on the frame, the lamp's feed terminal reads 12.5 V and its earth terminal also reads 12.5 V. What is the fault?",
    options: [
      "Blown bulb filament",
      "Open earth wire or earth connection",
      "Short circuit to earth",
      "Blown fuse",
    ],
    answer: 1,
    explain: "Voltage on both sides means the filament is intact and connects the feed through to the earth terminal, but no current flows, so the earth path is open. A blown filament would leave the earth side at 0 V; a blown fuse gives 0 V on both sides.",
  },
  // 4.3 Starting systems
  {
    id: "m3b-03", module: M, chapter: "m3-starting", kind: "diagnosis",
    q: "Pressing the start button gives a firm click from the relay, but the starter does not turn. The battery rests at 12.8 V. Which test comes next?",
    options: [
      "Replace the starter clutch",
      "Measure the voltage at the starter terminal and the drop across the relay contacts while pressing start",
      "Test the clutch and neutral switches",
      "Fit a larger main fuse",
    ],
    answer: 1,
    explain: "The click proves that the control circuit and interlocks work and the relay coil pulls in. The fault is in the heavy circuit: burnt relay contacts, a poor cable or terminal, or the starter itself. Voltage at the starter terminal and across the relay while cranking locates it.",
  },
  {
    id: "m3b-04", module: M, chapter: "m3-starting", kind: "calc",
    q: "A starter motor spins at 4200 r/min and drives the crank through a 14:1 reduction. At what speed is the engine cranked?",
    options: ["30 r/min", "300 r/min", "3000 r/min", "58 800 r/min"],
    answer: 1,
    explain: "Crank speed = motor speed / reduction = 4200 / 14 = 300 r/min. The same 14:1 multiplies the motor torque at the crank, less the gear losses.",
  },
];
