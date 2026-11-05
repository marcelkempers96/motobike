---
id: spongy-brake
title: Brake lever or pedal feels spongy
system: brakes
also_called: [soft brake lever, squishy brake, brake feels like rubber, lever goes far before braking]
urgency: do-not-ride
applies_to: [disc-brake, drum-brake]
parts: [brake_fluid, brake_hose, brake_pads, master_cylinder, brake_caliper, cbs_unit, abs, brake_cable]
repairs: [brake-fluid-check, brake-hose-check, brake-pad-check, brake-bleed, master-cylinder-check, caliper-rebuild, cbs-check, abs-check, drum-brake-adjust]
related: [lever-to-bar, lever-sinks, brake-fluid-leak, brake-fade, brake-fluid-dark, drum-brake-weak]
sources:
  - {doc: "K-Light 125 manual", page: 33}
  - {doc: "K-Light 125 manual", page: 61}
  - {doc: "K-Light 125 manual", page: 64}
  - {doc: "MAVCC Motorcycle Mechanic", page: 541}
  - {doc: "Dan's Motorcycle Repair Course", url: "https://www.dansmc.com/hydraulics.htm"}
---

# Brake lever or pedal feels spongy

The lever or pedal feels soft, like squeezing a rubber ball, instead of firm. It moves further than normal before the brake bites, and you can push it further still. On a hydraulic (disc) brake this almost always means air in the fluid, old fluid that has boiled, or a hose that swells. On a cable drum brake a soft feel comes from a stretched cable or worn shoes.

## Is it safe to ride?
No. A spongy brake can go all the way to the bar in an emergency stop. Do not ride until the lever is firm.

## Quick checks first
- Is this a hydraulic brake (reservoir on the bar, hose to the wheel) or a cable or rod brake?
- Look at the fluid level in each reservoir. Below LOWER?
- Look for wet fluid at the caliper, hoses and lever.
- Did someone just change pads, open a hose or bleed the brakes?
- Pump the lever several times: does it get firmer?
- If pumping the lever does nothing, air may be trapped at a fitting. Bleed at every fitting on the line, including where the hose meets the master cylinder, and tap the fittings lightly to free bubbles.
- Some systems fill more easily from the bleed screw upward, using a pump and a catch jar.

## Diagnose it step by step

**1. Is the brake hydraulic?**
- No (cable or rod drum brake): the cable may be stretched or sticky, or the shoes worn. Go to [Adjust a drum brake](/moto-zero/repair/repairs/drum-brake-adjust) and then [Drum brake is weak](/moto-zero/repair/problems/drum-brake-weak).
- Yes: go to step 2.

**2. Is the fluid level above LOWER in every reservoir (including the CBS reservoir if fitted)?**
- No: do not just top up. A low level means worn pads or a leak. Do [Check brake pad wear](/moto-zero/repair/repairs/brake-pad-check) and go to [Brake fluid is leaking](/moto-zero/repair/problems/brake-fluid-leak). If the level fell so far that air got in, the brake must be bled.
- Yes: go to step 3.

**3. Were the pads just changed or pushed back?**
- Yes: pump the lever 5 to 10 times with the bike still. If it becomes firm and stays firm, the pistons had moved back and there is no fault.
- No, or still soft after pumping: go to step 4.

**4. Do any hoses bulge, crack or leak when you squeeze hard?**
- Yes: replace the hose and bleed. See [Check brake hoses and banjo bolts](/moto-zero/repair/repairs/brake-hose-check).
- No: go to step 5.

**5. Is the fluid dark, or did the sponginess start after hard or long braking (a hill)?**
- Yes: old fluid holds water and boils when hot, making vapour bubbles. Replace it: [Replace brake fluid and bleed the brakes](/moto-zero/repair/repairs/brake-bleed). Also see [Brakes get weaker when hot](/moto-zero/repair/problems/brake-fade).
- No: go to step 6.

**6. Does the bike have CBS or ABS?**
- Yes: a simple bleed may not reach all circuits. Go to [Check a combined braking system (CBS)](/moto-zero/repair/repairs/cbs-check) or [Diagnose an ABS warning light](/moto-zero/repair/repairs/abs-check). Workshop.
- No: bleed the brake carefully with [Replace brake fluid and bleed the brakes](/moto-zero/repair/repairs/brake-bleed). Go to step 7.

**7. Is the lever still soft after a careful bleed?**
- Yes, and it also sinks when held: worn master cylinder cups. Go to [Check the brake master cylinder](/moto-zero/repair/repairs/master-cylinder-check). If fluid shows at a caliper piston: [Rebuild a brake caliper](/moto-zero/repair/repairs/caliper-rebuild). Workshop.
- No: fixed. Test at walking speed before riding.

What happens if you keep riding: the air bubbles grow when the brake gets hot, and the lever can reach the bar without stopping the bike.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Air in the system | Soft lever that firms a little with pumping; recent work | [Replace brake fluid and bleed the brakes](/moto-zero/repair/repairs/brake-bleed) |
| Old fluid boiling | Dark fluid; soft after hard use | [Replace brake fluid and bleed the brakes](/moto-zero/repair/repairs/brake-bleed) |
| Low fluid from wear or leak | Level below LOWER; wet fitting | [Check brake pad wear](/moto-zero/repair/repairs/brake-pad-check), [Check brake hoses and banjo bolts](/moto-zero/repair/repairs/brake-hose-check) |
| Swelling hose | Hose bulges when lever squeezed | Replace hose, then bleed |
| CBS or ABS circuit not bled | CBS or ABS bike, recent hydraulic work | [Check a combined braking system (CBS)](/moto-zero/repair/repairs/cbs-check) |
| Worn master cylinder cups | Lever also sinks; no outside leak | [Check the brake master cylinder](/moto-zero/repair/repairs/master-cylinder-check) |
| Stretched cable, worn shoes (drum) | Cable brake; adjuster near its end | [Adjust a drum brake](/moto-zero/repair/repairs/drum-brake-adjust) |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Front lever free play at the tip | 10 to 20 mm | K-Light 125 manual, PDF p. 61 |
| Brake fluid | DOT4 | K-Light 125 manual, PDF p. 65 |
