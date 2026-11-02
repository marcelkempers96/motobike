---
id: ev-swap-not-recognised
title: Swapped battery is not recognised
system: ev-battery
also_called: [battery not detected, swap battery error, new battery not working, battery authentication failed]
urgency: do-not-ride
applies_to: [electric]
parts: [traction_battery, bms, charge_port, wiring, fuse, aux_battery]
repairs: [ev-swap-contact-check, ev-error-read, ev-aux-check, ev-damaged-pack]
related: [ev-dash-dark, ev-no-ready, ev-pack-damaged, ev-error-code]
sources:
  - {doc: "Gogoro Smart Battery and GoStation safety information", url: "https://gogoro.com/product-information"}
  - {doc: "Gogoro Support: What should I do if the battery level is low?", url: "https://support.gogoro.com/en/articles/115008416788"}
  - {doc: "Spiro: Energy ecosystem", url: "https://www.spironet.com/energy-ecosystem"}
---

# Swapped battery is not recognised

You fit a freshly swapped battery but the bike shows no battery, no charge, an error, or will not go to ready. On swap networks, the bike and battery talk to each other through signal pins, and often check that the battery belongs to the network and to your account or subscription. A battery that is not fully home, has dirty contacts, has been switched to sleep, is blocked by the network, or is faulty will not be accepted. In most swap networks the battery belongs to the operator (Gogoro), so the fix is usually at the station, not in the bike.

## Is it safe to ride?
The bike will not drive without a recognised battery. Do not force the battery in or tamper with the contacts.

## Quick checks first
- Is the battery pushed fully in and the latch locked? Some systems make a sound when the battery locks.
- Is your account, subscription or payment up to date in the operator's app?
- Is it the right battery type for your bike (some networks have more than one type)?
- Any damage, heat or smell from the battery?

## Diagnose it step by step

**1. Is the battery damaged, hot, swollen, wet or smelling?**
- Yes: do not fit it. Hand it back to station staff. See [Handle a damaged battery pack](/moto-zero/repair/repairs/ev-damaged-pack).
- No: go to step 2.

**2. Is the battery fully seated with the latch locked and the cover closed?**
- No: remove and refit firmly. [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check).
- Yes: go to step 3.

**3. Are the contacts on the battery and in the bay clean, dry and undamaged?**
- No: brush off dry dirt; do not use water, solvent or metal tools. Burnt or bent contacts: report to the operator.
- Yes: go to step 4.

**4. Is your account or subscription active?** Check the operator's app or ask station staff.
- No: renew it. Many networks block batteries for inactive accounts.
- Yes: go to step 5.

**5. Does a different battery from the station work?**
- Yes: the first battery is faulty. Give it back and tell staff its ID number. Spiro, for example, runs manned stations where staff can help.
- No: the problem is in the bike. Go to step 6.

**6. Is the dash dim or dead even with a good battery?**
- Yes: the bike may be in hibernation or its 12 V supply is low. On Gogoro scooters, holding the GO button for 3 seconds wakes a hibernating scooter; check your manual. On bikes with a 12 V battery: [Check the 12 V auxiliary system](/moto-zero/repair/repairs/ev-aux-check).
- No: read the error: [Read electric drive error codes](/moto-zero/repair/repairs/ev-error-read), and call the operator's support line. Gogoro, for example, directs riders with battery detection problems to its call centre.

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Battery not fully seated | Latch not locked | [Check swap battery contacts and latch](/moto-zero/repair/repairs/ev-swap-contact-check) |
| Dirty or wet contacts | Visual | Brush clean, dry |
| Account or subscription inactive | App shows status | Renew |
| Faulty battery | Another battery works | Return to station with ID |
| Bike asleep or low 12 V | Dash dim or dead | Wake as manual says; [Check the 12 V auxiliary system](/moto-zero/repair/repairs/ev-aux-check) |
| Damaged contacts or bike fault | No battery works | Operator workshop |
