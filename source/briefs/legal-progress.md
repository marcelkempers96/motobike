# Legal and privacy: progress notes (2026-11-06)

Brief: `source/briefs/2026-11-06-legal-and-privacy.md`.

## Task 1: legal pages
- Rewritten: `privacy/`, `cookies/`, `terms/`. New: `community/`, `disclaimer/`, `accessibility/`, `legal/`.
  All share the head/header/footer of `privacy/index.html`, canonical on motobike-five.vercel.app,
  `robots: index, follow`, and a "Legal pages" link list at the bottom (current page marked).
- Privacy: controller Transitions Lab (NL); table of data, purpose and GDPR legal basis per feature
  (account, profile, progress, comments/photos, member messages, sign-ups, contact form, brand
  requests, moderation, hosting logs); what is public; processors (Supabase, Vercel, FormSubmit,
  email provider, jsDelivr, Google Fonts) and on-demand third parties (Google Translate, YouTube,
  Listen); transfers (DPF / SCCs); retention table; children (16+ or parental consent); security;
  rights incl. complaint to the Autoriteit Persoonsgegevens; changes.
  The old text "the contact page opens your own email app; the site sends nothing" was wrong (the
  form posts to FormSubmit) and is gone.
- Cookies: `googtrans` cookie, Google/YouTube storage only on demand, full localStorage table
  (`mz-progress-v1`, `mz-rep-…`, `mz-circuit-builder-v1`, `mz-build`, `mz-sound`, `mz-split`,
  `mz-types-look`, `mz-lang`, `sb-…-auth-token`, `mz-role`), sessionStorage `mz-next-done`.
  Removed `mz-best` (no code sets it any more). No-banner reasoning cites Telecommunicatiewet 11.7a.
- Terms: accounts (16+), user content licence and moderation, downloads, workshop/HV, tools, brand
  requests, fair use, liability, links (no commission), changes, Dutch law.
- Contact address: the only existing address is `marcel@transitionslab.org`; no other mailbox was
  invented. It is shown only as "email the team at ...".
- `sitemap.xml`: the four new pages added. Footer links are left to the coordinator (site.js untouched).

## Task 2: founder's name and face
- Name removed from `about/` (story text, "Who made it" incl. personal background, "contact me").
  `contact/`, `sources/` and the legal pages now say "email the team at ...". The FormSubmit endpoints
  are unchanged (`contact/`, `assets/brand.js`, `assets/site.js`, `account/`), so the form still works.
- Photos checked: `kenya-crew.jpg` is a group portrait with faces as the subject (founder in it), so it
  is removed. Kept: `kenya-ride-helicopter.jpg` (riders small, faces not recognisable), `kenya-flag-ride.jpg`
  (backs), `workshop-garage.jpg`, `carburettor-*.jpg` and the video posters (stock workshop shots of other
  people, where the work is the subject and not the face).
- References removed: `about/` main story figure (kenya-crew); `contact/` photo strip (kenya-crew,
  now kenya-flag-ride, so the strip stays complete).
- NOT done on purpose: the home page gallery still uses `kenya-crew.jpg`, because the coordinator is
  replacing that section. The file `assets/photos/kenya-crew.jpg` was kept for that reason. Delete it once
  the home section is gone (no other page uses it).
- Final search for the founder’s surname over published files (excluding source/, docs/, inbox/, node_modules):
  no matches. No "Marcel" in visible text either; only the email address remains.

## Tests
Playwright at 1300 and 390 px on all changed pages: no console errors, no horizontal scroll, 58 internal
links all return 200. The only network note is the existing `about/` video preload (`bikes.mp4`) being
aborted by the local python server. That is not a console error and was there before.

## For the owner to confirm
Retention periods (30 days for account deletion, 2 years for mail, 12 months for brand requests), the
FormSubmit/jsDelivr transfer wording, and whether a role address (e.g. hello@) should replace the
personal address.
