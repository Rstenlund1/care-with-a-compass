# CARE WITH A COMPASS: THE DIRECTOR'S DESK
## GEMINI FINAL SOURCE REVIEW — v10.7.14

**Immutable source commit:** 65671ee8d5420e71127a479db3d1c14e743ec29f
**Live demo:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.14&page=staff
**Review source branch:** gemini-audit-source-v10.7.14-20261121
**Repository:** https://github.com/Rstenlund1/care-with-a-compass

This source-only review package was created using the exact Git tree blobs at the immutable source commit above. Original directory hierarchy, source byte contents, HTML, JSON, WebP image assets, tools, and selected current documentation are preserved. It is a copy for independent inspection, not an update to main.

**Important exclusions:** The 3.5 MB older standalone HTML export; obsolete V9.x release notes; previous Gemini review answers, legacy combined source dumps and historical documentation. These may not describe what the live v10.7.14 program runs. Do not audit them as active source. Refer to the actual HTML imports and runtime references.

**Use alongside the separate Gemini final-audit TXT prompt.** Inspect actual current source and, where tools permit, interact with the live website. Never infer successful browser tests from source code alone.

### Release-specific review hot spots
- One optional financial planner, no second staffing-coverage simulator or duplicate navigation jump buttons
- Three licensed program types: small family home, large family home, preschool center
- Four distinct enrollment categories: full-time and part-time non-infants, full-time and part-time infants under 24 months
- Separate county median tuition presets for infant vs preschool and family home vs center; 58 counties; independently editable fees and linked default part-time prices
- Director always included as first staff in the illustrative budget, excluding additional classroom staff; automatic staffing suggestion with 40 paid hours/week, not an actual shift schedule
- Correct small/large home infant limits, special school-age/parent-notification conditions, and center infant 1:4 vs preschool 1:12
- Warning of out-of-capacity child mixes even if extra staff are budgeted; preschool toddler group distinctions
- Reset, saved state, zero/negative/decimals, changing county/program type mid-entry, and no accidental double counting
- All 84 questions, 44 follow-ups, six chapter branching exercises, eight perspective cases, and active main simulations; verify counts rather than assume
- Hover/focus tooltip behavior, output language and visual layout
- No credit or certificate dependency on optional budget tool

### Snapshot inventory (48 source files)
- .gitignore (20 bytes)
- .nojekyll (0 bytes)
- COPYRIGHT.md (202 bytes)
- Question_Editor.html (8752 bytes)
- README.md (32978 bytes)
- REPORTING_SETUP.md (5083 bytes)
- chapters.html (4929 bytes)
- consequence-lab.html (155384 bytes)
- css/chapters-unified.css (7366 bytes)
- css/styles.css (38287 bytes)
- css/v92.css (51949 bytes)
- data/branching.json (58632 bytes)
- data/california-budget-benchmarks.json (4289 bytes)
- data/questions.json (245716 bytes)
- director-desk.html (732 bytes)
- docs/SOURCE_VERIFICATION_NOTES.md (1839 bytes)
- images/ch1a.webp (229296 bytes)
- images/ch1b.webp (199884 bytes)
- images/ch2a.webp (192424 bytes)
- images/ch2b.webp (110860 bytes)
- images/ch3a.webp (294374 bytes)
- images/ch3b.webp (154040 bytes)
- images/ch4a.webp (150142 bytes)
- images/ch4b.webp (165220 bytes)
- images/ch5a.webp (156432 bytes)
- images/ch5b.webp (12222 bytes)
- images/welcomeHero.webp (267134 bytes)
- images/welcomeQuirky.webp (154040 bytes)
- images/welcomeSecondary.webp (150142 bytes)
- images/welcomeTertiary.webp (156432 bytes)
- index.html (1803 bytes)
- js/app.js (120147 bytes)
- js/branching.js (47164 bytes)
- js/budget-planner.js (31378 bytes)
- js/chapter-report-bridge.js (3639 bytes)
- js/concepts.js (4578 bytes)
- js/data.js (209740 bytes)
- js/learner-services.js (17067 bytes)
- js/question-followups.js (28794 bytes)
- js/v92-app.js (59497 bytes)
- js/v92-data.js (57111 bytes)
- js/v94-lessons.js (18027 bytes)
- js/v96-references.js (4761 bytes)
- tools/build_branching_js.py (697 bytes)
- tools/build_data_js.py (498 bytes)
- tools/build_standalone.py (1223 bytes)
- tools/qa_branching.py (2812 bytes)
- tools/qa_release.py (4770 bytes)

**Audit deliverables:** a prioritized evidence-grounded bug ledger, complete editing list, design suggestions and photo inventory, per-question coverage, branching-path test coverage, regulatory and financial model validation, exact proposed code patches and regression acceptance test plan. Do not alter the deployed program without explicit approval.
