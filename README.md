# Motopedia — interactive motorcycle course

An interactive companion to the **Motopedia** open course by Transitions Lab (CC BY-SA 4.0).

| Page | What it is |
|---|---|
| `/` **Lab** | Click any part of a four-stroke, two-stroke or electric bike. Interactive close-ups (engine, carb, ignition, chain, brake, motor, controller, wiring), a rider's-eye handlebar and a live dyno. |
| `/learn/` **Learn** | The course modules re-told teaching-style, with interactive figures. |
| `/quiz/` **Quiz** | Click-to-answer questions per module with instant feedback. No login. |

## Stack

Plain HTML + CSS + ES modules + inline SVG. **No build step.** Fonts: IBM Plex via Google Fonts.

```
index.html            Lab
learn/index.html      Learn
quiz/index.html       Quiz
assets/
  styles.css          design tokens + all components
  core.js             SVG helpers, physics, engine cross-section (shared)
  app.js              the Lab
  figures.js          14 interactive teaching figures (Learn)
  learn.js / quiz.js / quizkit.js
  content/
    parts.js          Lab part names, categories, copy
    modules/m1–m5.js  lessons per course module (edit text here)
    questions/m1–m5.js  148 multiple-choice questions
  pdf/                the five course modules (downloadable from Learn)
  brand/              Motopedia logo files
  models/manifest.json  map part keys → render images
inbox/                drop zone for raw uploads (not deployed)
moto-spec/            product spec, design system, behaviour spec
```

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy (Vercel)

Import the repo. Framework preset **Other**, no build command, output directory = root.

## Editing content

Lessons and questions are plain data files in `assets/content/` — see the block types at the
top of any `modules/mN.js`. Illustration blocks point at `assets/illustrations/<category>/<file>.svg`
from the asset package; they stay hidden until those files are added.
