---
id: auto-enrichener-check
title: Check an automatic starter (thermowax or bimetal enrichener)
level: home
time: 30 to 60 min
applies_to: ["carburettor", "scooter", "electric-start"]
tools: ["multimeter", "screwdrivers", "scooter manual"]
parts: ["carb", "choke_cable"]
consumables: []
fixes: ["hard-cold-start", "runs-rich", "high-idle"]
sources:
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/carb11.htm"}
photos: [{"file": "source/dansmc/04_Fuel_Carburetors/076/076_learn_more_about_them_check_scooter.jpg", "caption": "Drawing of a thermowax starter with heater"}, {"file": "source/dansmc/04_Fuel_Carburetors/076/076_mixture_enrichener_thermowax_type.jpg", "caption": "Drawing of a bimetal starter"}, {"file": "source/dansmc/04_Fuel_Carburetors/076/076_start_mixture_enrichment_circuit.jpg", "caption": "Drawing of the starter fuel and air circuit"}]
---

# Check an automatic starter (thermowax or bimetal enrichener)

Some carburettors, mostly on scooters, have no choke lever or cable. A small device on the carburettor opens the starter circuit by itself when the engine is cold and closes it as the engine warms. Two kinds are common. A thermowax type has an electric heater that warms a wax element. A bimetal type has a metal strip that bends with heat. The details differ by model, so use the manual for values.

## Safety
- Work on a cool engine and keep fuel and sparks apart.
- Disconnect the battery before unplugging any wiring.

## Steps
1. Find the device on the carburettor. A thermowax type has a wire connector. Note how the valve or plunger sits when cold.
2. Cold engine, key off: the valve is retracted, so the starter circuit is open and the engine can get extra fuel for starting.
3. Look at the connector for corrosion or a loose pin. A broken heater feed keeps the starter circuit open and the engine runs rich when warm.
4. With the key on, check that the heater gets power, and read its resistance with the multimeter. Compare with the value in the scooter manual.
5. Start the engine and let it warm. On a thermowax type the heater warms the wax, the wax expands and the valve slowly closes the starter jet.
6. After warm-up the idle should drop and settle. If it stays fast or rich, the starter circuit is still open.
7. If the heater reads out of range or the valve does not move, replace the device as the manual says.

## Check your work
- Easy cold start, idle drops as the engine warms, and no black smoke or rich smell when warm.

## If it did not fix the problem
- [Check the choke or starter valve](/moto-zero/repair/repairs/choke-check).
- [Check a starter plunger and its jet](/moto-zero/repair/repairs/starter-plunger-check).
- [Engine is hard to start cold](/moto-zero/repair/problems/hard-cold-start).
