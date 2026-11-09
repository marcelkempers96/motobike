# Brief: legal pages complete, and remove the founder's name and face from the site

Repo: /home/user/motobike (static site). Owner: Transitions Lab (transitionslab.org), Netherlands-based
open educational programme; the site is Motopedia (new brand name Motopedia, domain motopedia.org).
Data processing on the site now (read the code to be exact):
- Optional accounts, comments with photo uploads, saved course progress, members-only content,
  messages with the team, brand requests: Supabase (`assets/community.js`, `account/`,
  `assets/brand.js`, `docs/*.sql`).
- Email sign-ups (Supabase `subscribers` table) and form-to-email via FormSubmit (contact form,
  sign-up notices, brand requests).
- Google Translate when a visitor picks a language (`assets/translate.js`), YouTube thumbnails and
  embeds on play (`assets/videos.js`), browser speech for Listen (`assets/speech.js`), Google Fonts,
  Vercel hosting, jsdelivr CDN for supabase-js, localStorage keys (see `cookies/`).
- Download prompt for account holders (`assets/gate.js`).

## Task 1: legal pages (EU/GDPR level, plain language, matching the existing page style)
Review and update `privacy/`, `cookies/`, `terms/` so they are complete and correct for the above
(controller identity: Transitions Lab with the email `hello@transitionslab.org`? NO: keep the
existing contact address used on the site unless it contains the founder's name, see Task 2;
legal bases; processors and international transfers; retention; rights incl. complaint to the
Dutch Autoriteit Persoonsgegevens; children: accounts for 16+ or with parental consent; cookies
and storage table complete incl. Supabase auth token, language choice `mz-lang` and `googtrans`
cookie, circuit builder, progress; no tracking or ads; user content licence and moderation;
downloads; repair safety disclaimer and limitation of liability; brand requests; changes;
governing law Netherlands). Add new pages in the same style:
- `community/` Community guidelines (comments and photo uploads: be safe and kind, no personal
  data of others, no spam, only photos you own, how moderation and reporting work).
- `disclaimer/` Safety and liability disclaimer for repair content (work at your own risk, use the
  manual, when to go to a workshop, values marked K-Light 125 are examples).
- `accessibility/` Accessibility statement (what was done: text alternatives, keyboard, contrast,
  Listen button, language picker; known limits: 3D views; how to report problems).
- `legal/` Legal notice / imprint (publisher Transitions Lab, contact, licence CC BY-SA 4.0 for
  text, plates and models; third-party content credited: repair course photos used with
  permission, Wikimedia Commons, YouTube videos embedded; trademarks belong to their owners; how to
  request removal of content, takedown contact).
Each new page: copy the head/header/footer structure of `privacy/index.html`, canonical URL on
https://motobike-five.vercel.app/<path>/, `<meta name="robots" content="index, follow">`.
Link all legal pages to each other at the bottom of each. Do not invent a company registration
number or street address: write "available on request" where an imprint normally lists them.

## Task 2: remove the founder's name and face
- Remove every occurrence of the founder's name (full name and first name) from
  visible text, meta tags, JSON-LD and alt texts in the published site (HTML, JS under `assets/`
  except vendored libraries). Replace with "Transitions Lab" or "the team". Exclude `source/`,
  `docs/` and `inbox/` (not published). The email address `marcel@transitionslab.org` is used by
  the contact form: keep it working, but do not show it as a person's name in text (write "email
  the team at ..." if you show the address at all).
- Find photos of the founder (people/portrait photos on `about/`, `contact/`, the home page,
  `assets/photos/`, `assets/` images referenced by those pages; look at them with the Read tool).
  Remove photos where a person's face is the subject (remove the `<img>`/figure and any layout
  left empty; keep workshop/bike photos without recognisable faces). Do not delete image files
  that other pages still use; list removed references in your notes.

## Do not
Edit `assets/site.js`, `account/`, `assets/community.js` (others edit them now); I will add the
new legal links to the footer myself. Commit.

## Test
Playwright (pre-installed), local server http://localhost:8765/ (start
`python3 -m http.server 8765 --directory /home/user/motobike` only if not running). Load every page
you changed at 1300 and 390 px, no console errors, no broken links. Run a final
`grep -rIi "kempers"` over published files (exclude source/, docs/, inbox/, node_modules) and
report the result. Notes in `source/briefs/legal-progress.md`. Reply in at most 10 lines.
