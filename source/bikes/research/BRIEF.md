# Brief: research facts, numbers and a photo for each motorcycle in your batch

Repo: /home/user/motobike. Your batch file is given in the prompt:
`source/bikes/research/batch-<n>.txt` (tab-separated: id, title, category).
Context: `source/bikes/bikes.json` has each model's existing record (category, countries, aliases,
39 have manufacturer facts). These pages become "By bike" pages in the Repair section.

## For each model find (only from sources you actually read)
Use WebSearch and WebFetch (Wikipedia article first; then the manufacturer page). Do NOT use curl
for wikipedia.org or wikimedia.org (blocked or rate limited on this machine).
- `summary`: 2 to 4 sentences, plain and interesting: what it is, who it is for, what makes it
  notable (history, records, where it is popular, a design feature). No hype, no first person,
  no em or en dashes. Paraphrase; do not copy sentences.
- `specs` (numbers, each with the source URL): `years` (production years, e.g. "2004 to 2018"),
  `displacement_cc`, `engine` (e.g. "air-cooled SOHC single"), `power_hp` and `power_rpm`,
  `torque_nm` and `torque_rpm`, `weight_kg` with `weight_type` ("wet"/"dry"/"kerb"), `fuel_l`,
  `seat_mm`, `top_speed_kmh`, `gearbox` (e.g. "5-speed"), `final_drive` ("chain"/"belt"/"shaft"/"CVT"),
  `fuel_system` ("carburettor"/"fuel injection"), `starting` ("kick"/"electric"/"both"),
  `brakes` (e.g. "disc front, drum rear"), `battery_kwh` and `range_km` for electric.
  Leave out any field you cannot source. Never estimate. Never average. If a source covers one
  generation only, say which in `spec_scope` (e.g. "2018 to 2022 generation").
- `highlights`: 2 to 4 short facts with a number where possible (e.g. "Over 10 million sold in
  India by 2020"). Each needs a source.
- `photo`: the Wikimedia Commons file used in the Wikipedia article's infobox (or another Commons
  photo of this model found on the article), as `{"file": "File:....jpg", "caption": "<model, year
  if known>"}`. Only if it clearly shows this model. Skip if none.
- `wikipedia`: the article URL if one exists for this exact model (not just the brand).
- `notes`: anything that makes the model different for repair (e.g. "shaft drive", "liquid-cooled",
  "fuel-injected from 2017", "air-oil cooled"). Short.
Many smaller models (Indian, Indonesian, Chinese brands) have no Wikipedia page: use the
manufacturer site or a reputable review site (bikewale, zigwheels, motorcyclenews, cycle world).
If nothing reliable is found in 2 searches, record `{"id": "...", "found": false}` and move on.

## Output
`source/bikes/research/batch-<n>.json`: a JSON list of objects
`{"id", "found": true, "summary", "specs": {...}, "spec_scope", "highlights": [{"text","source"}],
"photo", "wikipedia", "notes", "sources": [urls]}` where each spec is
`{"value": <number or text>, "source": "<url>"}`.

## Save as you go (the machine can restart)
Rewrite the json file after every 3 models. At start, read the json if it exists and skip ids already
in it. Work in the batch order (the list is grouped by make).

## Budget
At most 2 web calls per model on average; total tool calls up to 260. If you run out, stop cleanly
with the json saved. Reply in at most 6 lines: models done, found, with photo, file path.
