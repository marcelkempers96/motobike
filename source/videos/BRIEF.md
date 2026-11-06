# Brief: map the 100 YouTube videos to Moto Zero pages, and write SEO notes

Repo: /home/user/motobike. Input: `source/videos/videos.json` (100 records: id, title, channel, views,
category, topic, description, learning, keywords, captions, best_use) and the full research
document `source/videos/Moto_Zero_Top_100_YouTube_Research.md` (read its findings and guidance).

Valid page ids: `assets/content/repair-index.js` (generated: `p` problems [id, title, ...],
`r` repairs [id, title, level], `t` parts [id, name, aliases]) and course chapter ids in
`source/repair/briefs/existing-ids.md` (section "Course chapters", ids like `m4-clutch`).

## Task 1: `source/videos/video-map.json`
For each video: `{"<video id>": {"role": "tutorial" | "explainer" | "case-study" | "skip",
"repairs": [...], "problems": [...], "parts": [...], "course": [...], "note": "<one line>"}}`
- **tutorial**: shows how to do a job (chain adjust, carb clean, oil change, stator test).
  Goes on the matching repair pages, and on problem pages whose fix it shows.
- **explainer**: how something works (clutch, CVT, carburettor, engine types). Goes on part
  pages and course chapters, and on a problem page only if it helps the diagnosis.
- **case-study**: restorations, factory assembly, time-lapse builds, custom engineering. Use
  sparingly: on a part page or a course chapter only where it clearly shows that part or system
  (for example an engine assembly film on the engine or crankshaft part page). Never on repair
  pages as instruction.
- **skip**: pure mods for speed, legality stunts, entertainment with no learning value.
- Only map to pages where the video truly fits the page's topic. Typical: 1 to 6 pages per
  video. Max 3 videos per page overall (choose the best: instructional first, then most viewed).
- `note`: what the viewer learns, in plain words, and any caution (for example "time-lapse,
  no measurements" or "values are for that bike only").

## Task 2: `source/videos/what-the-videos-teach.md` (at most 120 lines)
For the team: per category, what these videos teach, what formats work (animation, cutaway,
step-by-step, comparison test, numbered list), common gaps (missing measurements, model-specific
values), and how Moto Zero pages should pair with them (part, problem, repair, course).

## Task 3: `source/videos/seo-notes.md` (at most 80 lines)
Keyword and title lessons from the titles, uploader keywords and view counts: the phrases people
search ("how does a ... work", "how to clean ...", "... not charging", Hindi and Indonesian
queries), title patterns, which Moto Zero pages should target which phrases (give page paths and
a suggested title or H1 for 15 to 25 pages), and how embedded videos plus VideoObject structured
data can help (honestly: no guarantees). Plain text, no em or en dashes.

Do not edit any other file. Do not commit. Tool-call budget: 80. Check: every id in the map exists
in repair-index.js or the chapter list; json parses. Reply in at most 8 lines with counts.
