# Brief: map the 200 new YouTube videos (V101 to V300) to Motopedia pages

Repo: /home/user/motobike. Same task and rules as `source/videos/BRIEF.md` Task 1 (read it), for the
records in `source/videos/videos.json` with `rank` 101 to 300. Background and the editors' own
priorities: `source/videos/Moto_Zero_200_More_YouTube_Videos.md` (sections "Main learning and
editorial opportunities" and "Suggested first 15").

- Add one entry per new video to `source/videos/video-map.json`. Do not change the existing 100
  entries. Keep the file's format (2-space indent JSON object).
- Valid ids: `assets/content/repair-index.js` (`p` problems, `r` repairs, `t` parts) and the course
  chapter ids in `source/repair/briefs/existing-ids.md`.
- The builder keeps at most 3 videos per page, tutorials first, then explainers, then case studies,
  then by views. So map freely to every page a video truly fits; a strong new tutorial (forks,
  tyres, wheel bearings, brake calipers, valve clearance, carburettor, charging tests, chain) should
  go on its repair page even if that page already has videos.
- Restorations, custom builds, timelapses, stunts: mostly `case-study` on one or two part pages or a
  course chapter where they clearly show that part, or `skip`. Speed mods with no learning value: `skip`.
- `note`: one plain line on what the viewer learns, plus a caution where needed. No em or en dashes.
- Electric motorcycle videos: map to electric parts, problems and module 5 chapters where they fit.

Then append a short section "## Second collection (V101 to V300)" (at most 25 lines) to
`source/videos/what-the-videos-teach.md`: new topics covered, gaps that remain, pages that most
need a video still.

Do not edit any other file. Do not commit. Tool-call budget: 60. Check: json parses, every id in
the new entries exists. Reply in at most 6 lines with counts (per role, pages touched).
