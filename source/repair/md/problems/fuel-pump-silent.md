---
id: fuel-pump-silent
title: No buzz from the fuel pump when the key is turned on
system: fuel
also_called: [fuel pump not priming, no pump sound, pump dead]
urgency: do-not-ride
applies_to: [fuel-injected]
parts: [fuel_pump, fuse, wiring, battery, handlebar_switches, ecu, pickup, earth_strap]
repairs: [fuel-pump-check, battery-test-charge, fuse-relay-check, kill-switch-test, connector-clean, earth-clean, efi-code-read, wiring-fault-find, pickup-test]
related: [cranks-no-start, engine-warning-light, no-power-key-on, battery-flat, kill-switch-fault, cdi-ecu-suspect, fuel-pump-noisy]
sources:
  - {doc: "K-Light 125 manual", page: 268}
  - {doc: "K-Light 125 manual", page: 269}
  - {doc: "K-Light 125 manual", page: 274}
  - {doc: "K-Light 125 manual", page: 275}
  - {doc: "K-Light 125 manual", page: 278}
---

# No buzz from the fuel pump when the key is turned on

On a fuel-injected bike you normally hear a short buzz or whine from the tank for about 2 to 3 seconds when you turn the key on. That is the pump filling the fuel line. If you hear nothing, and the engine cranks but will not start, the pump is not running. The cause is more often its power supply (battery, fuse, relay, switch, connector) than the pump itself.

## Is it safe to ride?

The engine will not start or run without the pump. Do not try to bypass the pump's wiring or power it directly from the battery.

## Quick checks first

- Is the kill switch on RUN?
- Does the engine warning light come on at key-on?
- Is the battery strong (bright lights, normal horn)?
- Is there enough fuel in the tank?
- Listen in a quiet place with your ear near the tank.

## Diagnose it step by step

**1. Is the kill switch on RUN, and did you listen in a quiet place for the first 3 seconds after key-on?**
- Fix the switch position and listen again. Some bikes only run the pump with the kill switch on RUN. If it now buzzes, the pump is fine.
- Still silent: go to step 2.

**2. Does the engine warning light (FI) come on at key-on?**
- No: the injection system has no power at all. Check fuses, the earth wire and the ECU plug: [Check fuses and relays](/moto-zero/repair/repairs/fuse-relay-check), [Clean and tighten earth connections](/moto-zero/repair/repairs/earth-clean). See also [Nothing happens when the key is turned on](/moto-zero/repair/problems/no-power-key-on).
- Yes: go to step 3.

**3. Is the battery well charged?**
- No, or the starter turns slowly: [Test and charge the battery](/moto-zero/repair/repairs/battery-test-charge). A weak battery can light the dash but not run the pump.
- Yes: go to step 4.

**4. Is a fuel pump fuse or relay blown or faulty?**
- Check every fuse (K-Light 125: 20 A main and two 10 A). Swap the pump relay with an identical one if your bike has a separate relay.
- Fuses and relay fine: go to step 5.

**5. Is the pump connector on the tank clean and fully clicked in?**
- No: [Clean and seal electrical connectors](/moto-zero/repair/repairs/connector-clean).
- Yes: go to step 6.

**6. With a multimeter on the harness side of the pump connector, is there battery voltage during the first seconds after key-on?**
- Yes (K-Light 125: 12 ± 2 V), but the pump is silent: the pump has failed or is stuck. Workshop replacement. See [Check the fuel pump](/moto-zero/repair/repairs/fuel-pump-check).
- No voltage: the fault is in the relay, wiring or ECU control. [Read fault codes](/moto-zero/repair/repairs/efi-code-read) (K-Light 125: P0627 pump circuit open), then [find the wiring fault](/moto-zero/repair/repairs/wiring-fault-find).

**7. Pump silent at key-on but the engine also has no spark?** On some bikes the ECU only runs the pump once it sees a crankshaft signal. The K-Light 125 manual lists the crankshaft position sensor as a check when the pump does not work. [Test the ignition pick-up](/moto-zero/repair/repairs/pickup-test) and see [CDI or ECU suspected faulty](/moto-zero/repair/problems/cdi-ecu-suspect).

## Causes, most likely first

| Cause | How to confirm | Fix |
|---|---|---|
| Kill switch on STOP | Switch position | Set to RUN |
| Flat or weak battery | Voltage, slow cranking | [Battery test](/moto-zero/repair/repairs/battery-test-charge) |
| Blown fuse or failed relay | Fuse check, relay swap | [Fuses and relays](/moto-zero/repair/repairs/fuse-relay-check) |
| Loose or corroded pump connector | Visual | [Connector clean](/moto-zero/repair/repairs/connector-clean) |
| Failed pump | Voltage present, no run | [Fuel pump check](/moto-zero/repair/repairs/fuel-pump-check) |
| Wiring, ECU or crank sensor fault | No voltage, codes | [Wiring fault find](/moto-zero/repair/repairs/wiring-fault-find) |
