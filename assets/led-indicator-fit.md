---
id: led-indicator-fit
title: Fit LED indicators correctly
level: home
time: 45 to 90 min
applies_to:
- all
tools:
- digital multimeter
- crimp tool
- wire stripper
- heat gun or lighter for heat-shrink
- screwdrivers
- spanners
parts:
- indicators
- flasher
- wiring
- fuse
consumables:
- insulated crimp connectors
- adhesive-lined heat-shrink tube
- cable ties
- dielectric grease
fixes:
- accessory-wiring-fault
- indicators-fast
- indicators-steady
---

# Fit LED indicators correctly

**Home mechanic (basic tools)** · Time: 45 to 90 min (estimate)


LED indicators draw much less current than bulbs. A flasher made for bulbs senses current, so with LEDs it thinks a bulb has blown and flashes too fast (often called hyperflash), or does not flash at all. Bikes with a CAN-bus dashboard or lamp monitoring may also show a warning. This page shows the two safe fixes: a flasher made for LEDs, or load resistors. It also covers wiring the new lamps so they last.

## Safety
- Disconnect the battery negative (-) terminal before cutting or joining wires.
- **Load resistors get very hot** in use: they turn the power a bulb would have used into heat. Mount them on bare metal, away from plastic, fuel lines and wires.
- On a bike with CAN-bus lighting or lamp monitoring, do not cut, splice or tap into the factory harness. Use plug-in adapters made for that model, or ask a dealer. Wrong parts can set fault codes or disable functions.
- Indicators must be legal where you ride: check approval marks, colour, spacing and flash rate rules in your country.

## You need
- LED indicators with an approval mark for road use. Note their wires: usually two (power and earth). Some have three (indicator, running light and earth).
- **Either** an LED-compatible or load-independent flasher with the same plug and pin layout as yours, **or** one load resistor per indicator matched to the bulb it replaces. Resistor sellers list values by bulb wattage (for example, one maker lists different resistors for 10 W and 21 W bulbs). Check the old bulb: the K-Light 125 uses **R10W** indicator bulbs (PDF p. 99).
- On bikes with the flasher built into the dashboard or a control unit, there is no flasher to swap. Use the indicator maker's adapter for your model, or load resistors if the maker says that is correct for your bike.

## Steps
1. Test the old indicators work, so you know the switch and wiring are good.
2. Disconnect the battery negative.
3. Remove one old indicator. Note which wire is power (often the colour from the switch side) and which is earth (often black, or the indicator bolts to the frame for earth). On bulb indicators that earth through their metal stalk, the LED unit will need an earth wire.
4. Fit the new indicator. Route its wire away from sharp edges, hot exhaust and moving suspension. Use the factory grommets.
5. Join the wires with insulated crimp connectors, or the plug adapter. Pull each crimp firmly to test it. Cover joins with adhesive-lined heat-shrink so water cannot enter. If you solder, support the wire with a cable tie close to the joint: vibration cracks stiff soldered wire next to the joint (splicing method: MAVCC PDF p. 319).
6. Repeat for the other indicators.
7. **Fix the flash rate. Choose one:**
   - **Option A, new flasher.** Unplug the old flasher. Check the new one has the same pins in the same places; check its earth if it has three pins. Plug it in.
   - **Option B, load resistors.** Wire one resistor across each LED indicator: one resistor lead to the indicator power wire, the other to earth. Bolt the resistor to bare metal frame with clearance from plastic.
8. Reconnect the battery. Test left, right and hazard. Check the dashboard indicator lamp.
9. Tidy the wires with cable ties and refit any panels.

## Check your work
- Both sides flash at normal speed and the dash lamp flashes with them.
- Only one side flashes at a time; no faint glow on the side that should be off (some flashers need both sides connected to stop this).
- After 5 minutes of flashing, the resistors are hot but nothing near them is melting.
- No warning message on the dashboard.

## If it did not fix the problem
- Still fast or steady: [Indicators flash too fast](/moto-zero/repair/problems/indicators-fast) or [Indicators stay on and do not flash](/moto-zero/repair/problems/indicators-steady).
- Dashboard warning on a CAN-bus bike: refit the original lamps and check whether the warning clears. If it does, the new lamps are not accepted by that bike; ask a dealer for approved parts.
- Other faults began after this job: [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault).

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Original indicator bulb | R10W | PDF p. 99 |

## Problems this repair helps with

- [Problems after fitting accessories or an alarm](/moto-zero/repair/problems/accessory-wiring-fault)
- [Indicators flash too fast](/moto-zero/repair/problems/indicators-fast)
- [Indicators stay on and do not flash](/moto-zero/repair/problems/indicators-steady)

## Parts for this job

| Part | Buy |
|---|---|
| [Indicators](/moto-zero/repair/parts/indicators) | [Find this part](/spare-parts/indicators) |
| [Indicator flasher relay](/moto-zero/repair/parts/flasher) | [Find this part](/spare-parts/flasher) |
| [Wiring harness and connectors](/moto-zero/repair/parts/wiring) | [Find this part](/spare-parts/wiring) |
| [Fuses](/moto-zero/repair/parts/fuse) | [Find this part](/spare-parts/fuse) |

## Sources

- [Kellermann i.LOAD load resistors](https://www.kellermann-online.com/en/shop/electronic-accessories/i.load/)
- [Kellermann flasher relays](https://www.kellermann-online.com/en/electronic/elektronik/blinkrelais/)
- [HELLA Tech World: CAN bus and vehicle lighting](https://www.hella.com/techworld/sg/lounge/can-bus-vehicle-lighting-bulb-replacement-workshop)
- K-Light 125 manual, PDF p. 99
- MAVCC Motorcycle Mechanic, PDF p. 319
