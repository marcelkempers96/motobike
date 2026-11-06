# SEO notes from the 100 video titles

Basis: titles, uploader keywords and view counts in videos.json. Views are cumulative on YouTube, not Google demand
for our pages. Treat everything below as a hypothesis to test in Search Console.

## Phrases the titles and keywords repeat
- "how does a ... work" / "how a ... works" / "explained": carburettor, clutch, transmission, scooter transmission,
  four stroke, ABS, disc brake. Uploader keywords add "how does a scooter gearbox work", "does scooty have gears".
- "how to clean / check / adjust / test / change / bleed ...": chain (7 videos), carburettor, stator and regulator,
  oil and filter, clutch, brakes, radiator.
- Symptom and fault: "clogged pilot jet", "most common carburetor problem", "top 5 carburetor problems", "can I get
  this old bike running". "Not charging" is implied by the stator and regulator tests (stator keywords).
- Tests and myths: "comparison test", "best", "the truth about", "myth", "you are using the wrong ...".
- Lists: "4 jobs", "5 jobs", "7 best", "10 tools". Numbered titles are common in all mod and tool videos.
- Hindi and Hinglish: "bike engine ka kaam", "engine fitting", "full engine repair", model names (Splendor, Passion,
  CD 100). Mixed Devanagari and Latin titles. Hindi uploads in this set reach about 1.0M to 2.5M views.
- Indonesian and Southeast Asian: Honda Win 100, Supra X, Wave, "restorasi" style restoration titles. Query terms
  to test: "cara setel rantai", "cara bersihkan karburator", "aki tekor", "motor tidak mau hidup".
- Brand and model names carry views (Honda, Yamaha, Harley, CB750, CG125, Splendor). Use model names in page titles only
  where we really cover that model.

## Title patterns that work
- Question or "how to" plus the object, under about 60 characters.
- One promise per video: "Check and Adjust Chain", not "Maintenance Basics".
- A number or a payoff word ("easy", "right way", "step by step") on instruction pages.
- Symptom in rider words ("clutch slipping", "won't start after rain") beats part names for fix queries.
- Avoid copying clickbait, all caps and "only video you will ever need". Plain wording suits a repair library.

## Suggested page targets (path, query, H1)
Repair pages (/repair/repairs/...):
1. chain-adjust: "how to adjust motorcycle chain slack" / H1 How to check and adjust chain slack
2. chain-clean-lube: "how to clean and lube a motorcycle chain" / H1 How to clean and lube your chain
3. carburettor-clean: "how to clean a motorcycle carburettor" / H1 How to clean a carburettor, step by step
4. engine-oil-service: "how to change motorcycle oil and filter" / H1 How to change the engine oil and filter
5. brake-bleed: "how to bleed motorcycle brakes" / H1 How to change brake fluid and bleed the brakes
6. clutch-cable-adjust: "motorcycle clutch adjustment free play" / H1 How to adjust clutch lever free play
7. stator-test: "how to test a stator" / H1 How to test a stator with a multimeter
8. charging-system-test: "battery not charging test" / H1 How to test the charging system
9. coolant-replace: "how to flush motorcycle coolant" / H1 How to replace the coolant
10. chain-sprocket-replace: "how to replace chain and sprockets" / H1 How to replace a chain and sprockets
Problem pages (/repair/problems/...):
11. not-charging: "motorcycle battery not charging" / H1 Battery is not charging while riding: what to check
12. hard-cold-start: "bike hard to start cold" / H1 Hard to start when cold: causes and checks
13. rough-idle: "motorcycle rough idle carburetor" / H1 Rough or lumpy idle: jets, air leaks and plugs
14. clutch-slip: "clutch slipping revs rise" / H1 Clutch slips: revs rise but the bike does not pull
15. cvt-slip: "scooter slow acceleration belt" / H1 Scooter revs but accelerates slowly
16. spongy-brake: "spongy brake lever" / H1 Spongy brake lever: air, fluid and hose checks
17. no-start-after-storage: "bike will not start after sitting" / H1 Will not start after standing for weeks
Part pages (/repair/parts/...):
18. clutch: "how does a motorcycle clutch work" / H1 Clutch: how it works, wear signs and checks
19. carb: "how does a carburetor work" / H1 Carburettor: how it works and what goes wrong
20. gearbox: "how a motorcycle gearbox works" / H1 Gearbox: gears, shift drum and common faults
21. cvt_belt (or cvt_clutch): "how a scooter transmission works" / H1 Scooter CVT: belt, variator and clutch
22. brake_caliper: "how disc brakes work" / H1 Disc brake caliper: how it works and when to service
23. stator: "what does a stator do" / H1 Stator: what it does and how to test it
Course and hubs (use the course chapter pages):
24. m3-mixture: "carburetor vs fuel injection" / H1 Carburettor or fuel injection: how each works
25. m2-four-stroke and m2-two-stroke: "two stroke vs four stroke difference" / H1 Two-stroke and four-stroke engines compared

## Embedded videos and VideoObject
- Embedding a relevant video can raise time on page and answers "show me" intent. It does not guarantee rankings
  or rich results.
- VideoObject structured data (name, description, thumbnailUrl, uploadDate, embedUrl, duration) makes a page eligible for video
  features in Google, with no promise. It must describe a video that is really on the page. Use the creator's
  own metadata and link to the source.
- Use YouTube's own embed (no re-upload). Check each video is still public and embeddable. Use the youtube-nocookie
  domain if privacy rules ask for it. Lazy load with a click-to-play facade so page speed holds.
- Add our own transcript summary, steps and numbers box near the video. Google ranks the page text, and the
  gap-filling (spec, tools, what to check next) is our edge, since most videos skip numbers.
- Add captions or text for Hindi pages. Several Hindi and Indonesian videos expose no caption track.
- Do not embed more than three videos per page, and do not embed skip or restoration films on repair pages.

## Cautions
- Do not copy titles of single creators. Match the search phrase, not the video.
- Re-check demand yearly. View counts are a snapshot taken once.
- Test Hindi and Indonesian titles with native readers before publishing.
