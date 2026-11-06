# Circuit builder progress (agent notes)

Plan
1. wiring.html decks: "Parameters" group per tab (starting/charging/ignition) + what-changed line. [ ]
2. wiring/index.html load budget: extra params (battery Rint, connector ohms, custom load W), rho 1.68e-8, what-changed. [ ]
3. assets/circuit-builder.js + .css, section #builder on wiring/index.html; hash #build=<preset> not forwarded to iframe. [ ]
4. learn.js `exercise` block + styles.css append; m3.js exercises (lighting-wiring, battery-charging, diagnosis). [ ]
5. Playwright tests: scratchpad script, 1300 + 390, all challenges solvable. [ ]

Status log
- [x] 3. circuit-builder.js/.css written, section #builder added to wiring/index.html, hash #build=<preset> scrolls to builder (not forwarded to iframe).
  Test scripts: scratchpad t1.js (presets), t2.js (all 10 challenges pass programmatically). Next: UI pointer test, screenshots, then items 1, 2, 4.
- UI test t3.js (mouse desktop + touch phone) passes; wires follow dragged parts; palette 2 columns. Builder DONE apart from final regression.
- Now: item 1 wiring.html params (startModel/chModel/ignModel + "what changed" line), then item 2, then 4.
- [x] 1 wiring.html params done (t5/t6). [x] 2 load budget done (t7). [x] 4 exercises (12 blocks) + learn.js exercise + styles append (t8 verifies numbers).
- Remaining: final regression at 1300/390, screenshot learn-ex.png check.
- FINAL: all items done; regression t2/t3/t5/t8/t9 pass at 1300 and 390, no console errors. Not committed (per brief).
