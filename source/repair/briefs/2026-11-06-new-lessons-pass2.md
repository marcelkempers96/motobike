# Brief: second pass on the new lessons (repairs and parts first), and photo order

Same groups, lessons and photo lists as `source/repair/briefs/2026-11-06-new-lessons.md` (read it:
its "Read first" and "Rules" sections still apply). Your group is in the prompt.
Pass 1 output to build on: `source/repair/new/<group>-p5/`, `source/repair/photos2/p5-<group>.json`
and `p5-<group>-notes.md` (what was done and what was skipped). Photos placed anywhere so far:
`source/repair/briefs/photos3/catalogue.tsv` (refreshed).

## This pass
1. **Repair and part pages** (pass 1 focused on problems). For every repair and part page your
   lessons relate to (existing and pass 1 new ones), add photos that show the job step by step or
   the part clearly: up to 8 per repair page, 6 per part page. Write them to
   `source/repair/photos2/p6-<group>.json` (same shape as p5).
2. **More from the lessons**: re-read your lessons for content not used yet (procedures, checks,
   tools, special tools to make, measurements without model values, buying tips). Add new repair,
   problem or part pages in `source/repair/new/<group>-p6/` (with index.json) where something is
   still missing, and add bullets or table rows to existing pages in your systems/categories
   (repairs in `source/repair/md/repairs/` that clearly belong to your systems too this time:
   e.g. carburettor, fuel, oil, lubrication, starting, fasteners, cleaning). Add, do not rewrite.
3. **Photo order** ("arrange"): for each repair page in your area, write the photo order you want
   in `p6-<group>.json` under `"order": {"repairs": {"<id>": ["file", "file", ...]}}`, in job order
   (preparation and tools, then each step, then the finished check). For problems: the fault first,
   then the cause, then the check. You may include photos already on the page (from any earlier
   pass); files you do not list keep their current relative order after the listed ones.
4. Fix anything wrong you notice in pass 1 pages of your group (captions that do not match the
   photo, a photo on the wrong page): remove or recaption in your own pass 1 files.

## Output and checks
Only: `source/repair/photos2/p6-<group>.json`, `source/repair/new/<group>-p6/**`, edits to your own
pass 1 files, and additive edits to md pages in your area. Notes `source/repair/photos2/p6-<group>-notes.md`
(at most 30 lines). Checks as in the first brief. Save as you go
(`p6-<group>-progress.md`). Do not commit. Tool-call budget: 170. Reply in at most 6 lines.
