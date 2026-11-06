# Brief: YouTube videos for diagnosis (problem pages)

Repo: /home/user/motobike. Files: `source/videos/videos.json` (100 videos), `source/videos/video-map.json`
(current placements: role, repairs, problems, parts, course, note), the research document
`source/videos/Moto_Zero_Top_100_YouTube_Research.md`. Problem ids and titles:
`assets/content/repair-index.js` (`p` list: id, title, also-called, system, urgency, ...). Problem
page text: `source/repair/md/problems/<id>.md` or `source/repair/new/*/problems/<id>.md`.

## Goal
Problem (diagnosis) pages should show videos that help someone find the cause: how the system
works, how to test the part, what the fault looks or sounds like, how to fix it. Go through every
problem page (all 287) and, for each, pick up to 3 videos from the 100 that genuinely help with
that problem. Many pages will have none; that is fine. Electric-bike pages: only if a video fits.
Typical good matches: carburettor cleaning, pilot jets, how a carburettor works, fuel injection vs
carburettor, charging system tests (stator, regulator), battery checks, chain wear and adjustment,
clutch function, transmission and CVT animations, brake system explainers, compression, oil
change, suspension terms, engine noise explainers.

## Edit `source/videos/video-map.json` only
- Add problem ids to the `problems` list of the right videos. If a video's role is `skip` but it
  helps diagnosis, change the role to `tutorial` or `explainer` and give it a `note`.
- Keep other lists unchanged. Max 3 videos per problem page (diagnostic value first: test or
  fix > how it works > case study). Do not put restoration time-lapses on problem pages.
- Update `note` where it would help a person with a fault ("shows how to test the stator with a
  multimeter; values are for that bike").
Check: every id exists, json parses, no page over 3. Write a short report
`source/videos/diagnosis-notes.md` (at most 30 lines): problem pages with videos before and after,
gaps where a good video would be worth finding later (name the search phrase). Do not commit.
Tool-call budget: 70. Reply in at most 6 lines.
