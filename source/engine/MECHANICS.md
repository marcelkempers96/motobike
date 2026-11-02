# Under the Engine: mechanics, equations and simulation rules

Every number below is implemented in `src/engine.js`; function names are given so each rule can be found in the code.

## 1. Coordinate system and units

All geometry is in millimetres. The x axis runs across the bike with +x on the right (clutch, kickstarter) side and -x on the left (flywheel, cam chain, sprocket, gear pedal) side; +y is up and +z is forward. Every shaft runs parallel to x, so each shaft is fully described by a point in the y-z plane (`layout_yz_mm` in `data/model-geometry.json`).

Angles in the y-z plane are measured as `a = atan2(z, y)`, so a = 0 points up and a = +90° points forward. A rotation of a part about +x by angle t adds t to every point's plane angle, which is the convention `mesh.rotation.x` uses in Three.js. Positive crank rotation therefore moves the top of the crank forward, the same direction the wheels turn.

The helper `sp(a, r)` converts a plane angle and radius into 2D shape coordinates `(-r sin a, r cos a)`. After `ExtrudeGeometry` and `rotateY(π/2)` (function `finish`), shape coordinates map to world `(y, z)` correctly and the extrusion depth becomes the x thickness.

## 2. Shaft layout

| Axis | Rule used to place it |
|---|---|
| Crank | Origin (0, 0) |
| Mainshaft | 74.375 mm from the crank (primary centre distance = 1.75 × (18 + 67) / 2) towards rear-down |
| Countershaft | 49 mm from the mainshaft (2.0 × 49 / 2) towards the rear |
| Kick spindle | 52 mm from the mainshaft (2.0 × (30 + 22) / 2) towards front-down |
| Balancer | 49 mm from the crank (1.75 × 28) towards front-down |
| Starter reduction | Intersection of a 37.5 mm circle round the crank and a 32.5 mm circle round the motor axis (`circInt`) |
| Fork shafts | Main fork shaft 34 mm from the mainshaft towards the drum; counter fork shaft 45 mm from the countershaft and 25 mm from the drum (circle intersection) |

Gear columns along x (mm): col 1 at +36, col 5 at +18, col 3 at 0, col 4 at -18, col 2 at -36.

## 3. Gear geometry

Pitch radius `rp = m z / 2`, tip radius `ra = rp + m`, root radius `rf = rp - 1.25 m`. Tooth flanks are approximated per tooth with a half-thickness that shrinks with height, `half(t) = p (0.30 - 0.05 t - 0.10 t²)` where `p = 2π / z` and `t = 0` at the root and 1 at the tip (function `gearShape`). Sprockets use `half(t) = p (0.33 - 0.10 t - 0.12 t²)` with a rounded root, and chain sprocket pitch radius is `R = pitch / (2 sin(π / z))`.

Freewheeling gears get four arc windows (52° wide) cut through the web; sliders carry four dog teeth (22° wide, 4.5 mm long) on the faces that point at their target gears.

## 4. Meshing and phase

Two gears in mesh turn in opposite directions with `ωB = -ωA zA / zB`. To keep teeth interleaved, the driven angle is derived rather than integrated:

```
θB = -θA · zA / zB + c
c  = pB · δ / pA + δ + π - pB / 2
```

where `δ` is the plane angle from A's axis to B's axis and `pA = 2π / zA`, `pB = 2π / zB` (function `phase`). With this offset a tooth of A sits exactly in a gap of B along the line of centres at all times.

## 5. Crank, piston and connecting rod (slider-crank)

With crank angle φ (0 = piston at top), throw r = 24.75 mm and rod length L = 100 mm:

```
pin       = (y, z) = (r cos φ, r sin φ)
piston y  = r cos φ + √(L² - (r sin φ)²)
rod angle = atan2(-r sin φ, pistonY - r cos φ)
```

## 6. Four-stroke cycle and valves

Cycle angle `c = φ mod 720°`, 0 to 180 intake, 180 to 360 compression, 360 to 540 power, 540 to 720 exhaust. The camshaft turns at φ / 2.

Valve lift uses a cos² window of 240° crank and 6.5 mm peak (function `liftAt`):

```
lift(c) = 6.5 · cos²(π (c - centre) / 240)   when |c - centre| < 120, else 0
intake centre 110°, exhaust centre 610°
```

The cam lobe profile is generated from the same function so the drawn lobe and the valve motion agree: lobe radius at cam-local angle β is `13 + lift(-2β)`. Each rocker turns by `lift / 18.5` rad about its shaft, and the valve spring is scaled to `(24 - lift) / 24` of its free length.

The spark fires when the cycle passes 345° (15° before top dead centre on compression) and only while the engine is running. The pickup reluctor sits 15° ahead of the pickup coil angle, so it passes the coil at the same moment.

## 7. Drive chain and cam chain

Both chains are rows of instanced side plates and rollers laid along a path of straight runs and arcs (`chainPath`, `driveChainPath`, `layChain`). Chain travel equals sprocket angle × sprocket pitch radius, so links move exactly with the sprocket teeth. The cam chain moves up the rear run and down the front run, and the drive chain's top run moves forward.

## 8. Engine speed and time scale

Engine speed is simulated in real time. When running, target rpm is `1400 + throttle × 7100` and speed approaches it with rate `2.4 s⁻¹`. The kill switch ramps speed down at `max(900, 1.2 × rpm)` rpm per second. Angles are integrated as `θ += rpm / 60 × 2π × dt × timeScale`, where time scale is 1/50, 1/20 (default), 1/5 or 1.

## 9. Clutch model

Clutch engagement is `e = 1 - lever` with the lever moving at 4 per second.

- If `e > 0.96` the hub is locked to the basket: the mainshaft angle advances exactly with the basket angle.
- Otherwise `dωmain/dt = k e (ωbasket - ωmain) - drag ωmain`, with `k = 3, drag = 0.22` in gear (rear wheel inertia, bike on a stand) and `k = 7, drag = 1.1` in neutral.

Pressure plate lift is drawn as `5 × lever` mm. Plate i of the 9-plate stack moves by `lift × (i + 1) / 10`, and each spring shortens by the lift because the bolt heads stay fixed.

## 10. Gearbox kinematics

Splined and fixed gears turn with their shafts. Free gears take their angle from their mesh partner using the phase rule in section 4:

```
C1 = -main · 13/36   C2 = -main · 17/32   C3 = -main · 20/29
M4 = -counter · 26/23   M5 = -counter · 24/25
```

When a dog is engaged (fork offset beyond 3.4 mm), the countershaft advances by `-Δmain / R` where R is the gear ratio. When no dog is engaged, the countershaft coasts with `ω ← ω · e^(-0.45 dt)`.

## 11. Shift drum, forks and star detent

Drum positions: 1st 0°, N 30°, 2nd 60°, 3rd 120°, 4th 180°, 5th 240°. Each fork's offset is a function of drum angle, interpolated with smoothstep between keyframes (function `kf`):

| Fork | Keyframes (drum angle °, offset mm) |
|---|---|
| C5 | (-30, +5) (2, +5) (28, 0) (300, 0) |
| C4 | (-30, 0) (32, 0) (58, -5) (64, -5) (90, 0) (116, +5) (124, +5) (150, 0) (300, 0) |
| M3 | (-30, 0) (150, 0) (176, -5) (184, -5) (210, 0) (236, +5) (300, +5) |

The drum channel for each fork is drawn as a tube following `x = column + offset(α_pin - a)` round the drum surface, where `a` is the drum-local angle and `α_pin` is the plane angle at which that fork's pin meets the drum. This makes the drawn channel and the fork motion the same curve.

Star cam radius at local angle a:

```
l = a - γ
u = (1 - cos 6l) / 2
r = 12.5 + 6.5 · u^1.4
r = min(r, 16.2) within ±14° of the neutral ridge (γ - 30°)
```

Valleys sit at each gear position and ridges halfway between them. The ridge between 1st and 2nd is ground flat at 16.2 mm, which is the only place the roller can rest between gears: that rest is neutral. The stopper arm angle is solved each frame so that the roller centre sits at `starRadius + 4.5 mm` from the drum axis.

A shift animates the drum over 0.55 s with ease-in-out. The ratchet arm and pedal swing by `0.26 · sin` on the push and return on the release. Up from 1st goes to 2nd, down from 2nd goes to 1st, and the half step from 1st or 2nd selects neutral.

## 12. Starting

Kickstart lasts 1.2 s. The kick gear slides into mesh during the first 0.14 s, the spindle rotates 105° with an ease-in over the next 0.48 s, then it returns over 0.58 s while the gear slides out. While engaged, `Δcrank = Δspindle × (30/22) × (67/18)`, which gives about 1.48 crank turns per kick.

Electric start cranks for 1.7 s at about 1.1 visual revolutions per second, with the one-way clutch locked so the starter driven gear angle equals the crank angle. When the engine fires, the rollers release and the driven gear coasts down with `ω ← ω · e^(-2.2 dt)`. The reduction gear is `-starter · 46/14` and the pinion is derived from it at 42/10.

## 13. Road speed

```
wheel rpm = countershaft rpm / (43 / 14)
km/h      = wheel rpm × 1.95 m × 60 / 1000
overall   = (67/18) × gear ratio × (43/14)
```
