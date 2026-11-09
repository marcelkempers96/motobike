# Core group: course balance notes (Modules 1 and 2)
Words per chapter, before -> after (node snippet from the brief):
- 1.1 m1-history-systems 2187 -> 3062 (machine age table, tank-to-road worked example, worked charging/fuel fault)
- 1.2 m1-types 2988 -> 2988 (already in range, unchanged)
- 1.3 m1-anatomy 2816 -> 2939 (assemblies and service schedule, ordering parts)
- 1.4 m1-physics 3119 -> 3119 (unchanged)
- 1.5 m1-workshop 2338 -> 3073 (reading spec tables, strip-down organisation, cleaning and chemicals)
- 1.6 m1-fasteners NEW -> 3325
- 2.1 m2-fundamentals 3214 -> 3214 (unchanged)
- 2.2 m2-four-stroke 1828 -> 2979 (finding TDC, job sheet 2.2.1 cam timing, one-tooth error, OHV gear timing)
- 2.3 m2-two-stroke 2294 -> 3125 (oil pump setting/bleeding, crankcase pressure/vacuum test, fault table)
- 2.4 m2-top-end 1946 -> 2947 (cam drives, tensioners, shim worked example, push-rod clearance, plain cam bearings)
- 2.5 m2-bottom-end 1794 -> 3378 (oversizes/boring/honing, job sheet 2.5.1 rings, Plastigauge, case splitting, seals)
- 2.6 m2-lubrication-cooling 1723 -> 3051 (oil level methods, job sheet 2.6.1, coolant/recovery tank, fault table, oil reading, air cooling)
- 2.7 m2-diagnosis 2630 -> 2925 (running in, reading a failed engine)
New chapter: `m1-fasteners` "Fasteners, threads and torque" (end of Module 1), questions m1-41, m1-42 with check blocks, Key points callout.
New equations: m1-bolt-stress, m1-bolt-stretch, m1-torque-units, m1-torque-adapter, m2-cam-tooth-error.
CHAPTER_IMG to add in assets/learn.js: 'm1-fasteners': 'repair-photos/039_if_torqueing_bolt_engine_feel_yield.jpg'
Glossary: 20 terms in source/course/expand/core-balance-glossary.json.
`node source/course/check_course.js m1 m2` prints all good.
- Open: cross-references in text use the new numbering (1.6 fasteners, 3.3 carburettors, 3.4 EFI, 4.2, 4.4, 5.7).
- Open: example values not from the K-Light manual are labelled as examples or typical (36-tooth cam sprocket, 0.10 mm shim spec, crankcase test pressures from dansmc).
- Open: existing chapters gained no new quiz questions (only the new chapter has them).
