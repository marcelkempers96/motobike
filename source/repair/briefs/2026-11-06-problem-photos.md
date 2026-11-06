# Brief: final photo pass for problem (diagnosis) pages

Repo: /home/user/motobike. The owner of dansmc.com has given permission to use his photos.
Your group is in the prompt (a, b or c). Your list: `source/repair/briefs/photos4/problems-<group>.tsv`
(id, title, system, photos_now, parts), sorted with the pages that have fewest photos first.

## Goal
Give every problem page in your list real photos from the repair course: the broken, worn, burnt,
leaking or damaged part, the part that causes the fault, and the check that finds it. Aim for 3 to 6
photos per page. Pages with 0 photos first. Skip a page only when the course has nothing that fits
(for example most electric-bike pages), and list those in the notes.

## Photo sources
- `source/repair/briefs/photos3/catalogue.tsv`: photos already on the site, with captions and where
  used. You may reuse any of these (a photo may now appear on up to 5 pages in total).
- Unused photos: `source/repair/briefs/photos2/{basics,elec,engine-a,engine-b,frame}.tsv`. Earlier
  passes skipped many fault photos. Search them first by keyword (grep -i on file, caption and text:
  broken, worn, wear, crack, burn, bent, rust, corrod, leak, damage, bad, fail, scored, pitted,
  stretched, blown, melted, stripped, seized, glazed, fouled, varnish, gum). Keep real photos of
  parts and faults; still skip manufacturer manual scans, adverts, history photos, jokes, people.
- Look at candidates with contact sheets (first tsv column must be the file path):
  `python3 /tmp/claude-0/-home-user-motobike/27dd250f-4e2c-5952-b90b-8fe4954c88c7/scratchpad/sheet2.py <out.jpg> <tsv> <start_row> 25`
  Write sheets to `/tmp/claude-0/-workspace/27dd250f-4e2c-5952-b90b-8fe4954c88c7/scratchpad/cs4/`.
  To make a sheet of chosen rows, write a small tsv of just those rows (with a header line).
  View with Read. Up to 45 image views.
- Read the problem page (`source/repair/md/problems/<id>.md`, or for new pages
  `source/repair/new/*/problems/<id>.md`) so each photo fits what the page says.

## Captions
At most 12 words, plain, impersonal, say what is shown and why it matters, for example
"Worn clutch plates, glazed and thin: the cause of slipping". No em or en dashes.

## Output (write only this)
`source/repair/photos2/p4-<group>.json`: `{"problems": {"<id>": [{"file": "...", "caption": "..."}]}}`
Only photos not already on that page (check catalogue used_on). Order: the fault first, then the check.
Notes: `source/repair/photos2/p4-<group>-notes.md` (at most 30 lines): pages done, photos added,
pages with no fitting photo, doubts.

## Save as you go
Rewrite the json after every 5 pages; at start, resume from it if it exists.
Check before finishing: every id is in your tsv, every file exists, no dashes, json parses.
Do not commit. Tool-call budget: 150. Reply in at most 6 lines with counts and the notes path.
