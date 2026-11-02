---
id: cbs-fault
title: Combined braking (CBS) does not work as it should
system: brakes
also_called: [linked brakes fault, CBS not working, front brake comes on with rear pedal, combi brake problem]
urgency: do-not-ride
applies_to: [disc-brake, drum-brake]
parts: [cbs_unit, rear_brake, brake, master_cylinder, brake_hose, brake_fluid, brake_cable, brake_caliper]
repairs: [brake-fluid-check, brake-hose-check, rear-pedal-adjust, brake-drag-check, cbs-check, cable-lube]
related: [brake-drag, rear-pedal-travel, lever-sinks, brake-fluid-leak, wheel-locks, drum-brake-weak]
sources:
  - {doc: "K-Light 125 manual", page: 66}
  - {doc: "K-Light 125 manual", page: 67}
  - {doc: "K-Light 125 manual", page: 107}
  - {doc: "K-Light 125 manual", page: 116}
---

# Combined braking (CBS) does not work as it should

A combined braking system (CBS) links the brakes, so one control also applies part of the other brake. On the K-Light 125 the rear pedal also works the middle piston of the front caliper through a small CBS unit. On many scooters the left lever pulls both drum brakes through an equaliser. A fault shows as: the linked brake does nothing, one brake drags after use, the pedal sinks or travels far, or the bike pitches or skids when you use one control.

## Is it safe to ride?
No. A CBS fault changes how the bike stops and can make a wheel drag or lock.

## Quick checks first
- Check all reservoirs, including the CBS reservoir, are above LOWER.
- Look for fluid on the CBS unit, its pipes and the front caliper.
- Spin both wheels on the stand after pressing the rear pedal (or CBS lever) and releasing it.
- Scooter cable CBS: are both cables attached and free?

## Diagnose it step by step

**1. Is the system hydraulic (CBS unit with reservoir and pipes) or cable?**
- Cable: go to step 6.
- Hydraulic: go to step 2.

**2. Is any reservoir low, or is there a leak?**
- Yes: go to [Brake fluid is leaking](/moto-zero/repair/problems/brake-fluid-leak) and [Check brake hoses and banjo bolts](/moto-zero/repair/repairs/brake-hose-check).
- No: go to step 3.

**3. After you press and release the pedal, does either wheel stay braked?**
- Yes: the rear pushrod may be too long and holding the pistons. [Adjust the rear brake pedal](/moto-zero/repair/repairs/rear-pedal-adjust) (K-Light 125: 0 to 0.2 mm gap, piston free). If it still drags, [Check for brake drag](/moto-zero/repair/repairs/brake-drag-check).
- No: go to step 4.

**4. With the bike on its stand, does the front wheel slow a little when only the pedal is pressed?**
- No: the CBS circuit has air, a blocked line or an internal fault. Workshop: [Check a combined braking system (CBS)](/moto-zero/repair/repairs/cbs-check).
- Yes: go to step 5.

**5. Does the pedal sink slowly when held?**
- Yes: the workshop does the K-Light internal leak test (adjusting bolt turns by hand while the pedal is held means an internal leak; the CBS unit or plunger is replaced). See [Check a combined braking system (CBS)](/moto-zero/repair/repairs/cbs-check).
- No: have the workshop bleed all circuits in the maker's order. A simple one-circuit bleed misses the CBS circuit.

**6. Cable CBS: do both cables and the equaliser move freely and return?**
- No: [Lubricate control cables](/moto-zero/repair/repairs/cable-lube) or replace a frayed cable, then adjust both brakes to the manual.
- Yes: adjust each brake to its own free play first, then the linked lever. Check the drum shoes if a brake is still weak: [Drum brake is weak](/moto-zero/repair/problems/drum-brake-weak).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Pushrod or pedal set wrong | Drag after pedal use; free play off | [Adjust the rear brake pedal](/moto-zero/repair/repairs/rear-pedal-adjust) |
| Low fluid or leak | Low reservoir; wet pipes | [Check brake hoses and banjo bolts](/moto-zero/repair/repairs/brake-hose-check) |
| Sticky cable or equaliser (cable CBS) | Stiff lever; one brake drags | [Lubricate control cables](/moto-zero/repair/repairs/cable-lube) |
| Air in CBS circuit | Front does not respond to pedal | [Check a combined braking system (CBS)](/moto-zero/repair/repairs/cbs-check) |
| CBS unit internal leak | Pedal sinks; leak test fails | [Check a combined braking system (CBS)](/moto-zero/repair/repairs/cbs-check) |

## Reference values (K-Light 125)

| Item | Value | Source |
|---|---|---|
| Rear pedal free play | 20 to 30 mm | K-Light 125 manual, PDF p. 62 |
| Pushrod to rear master piston clearance | 0 to 0.2 mm | K-Light 125 manual, PDF p. 116 |
