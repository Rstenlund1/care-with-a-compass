# Care with a Compass: The Director's Desk — v10.7.13 SOURCE REVIEW SNAPSHOT
Source commit on main: 0b8c4f18b58f05992b95f986f35119585e11152c
Public live site: https://rstenlund1.github.io/care-with-a-compass/?v=10.7.13
Original repository: https://github.com/Rstenlund1/care-with-a-compass
Audit snapshot branch: gemini-audit-source-v10.7.13-20261121

**This branch is an immutable-content review snapshot assembled from the source commit above.** It includes current HTML/JS/CSS files, six-chapter question data, simulation data, optional budget calculator, JSON data, all 14 current WebP images, testing scripts, and limited current documentation. Existing file bytes are preserved, not edited. The snapshot excludes an obsolete 3.5 MB standalone HTML export, V9 release notes, historical Gemini reviews, and old combined source dumps so reviewers don't confuse those with current runtime code.

**Start with index.html and chapters.html.** Also inspect consequence-lab.html, director-desk.html and Question_Editor.html (development-only). Main source: js/v92-app.js, js/budget-planner.js, js/learner-services.js, js/v92-data.js, js/v94-lessons.js, js/data.js, js/app.js, js/branching.js, js/question-followups.js, js/chapter-report-bridge.js, js/concepts.js, js/v96-references.js. Review related css/ styles, data/ sources, images/ assets, tools/ QA scripts.

**Do not treat data/california-budget-benchmarks.json as necessarily active.** Trace actual HTML/script imports and JavaScript uses. Likewise, internal module `version` fields and README historical sections may be stale; document mismatches rather than assuming these files determine the displayed release.

**Independent Gemini review prompt:** Upload the separate `Gemini_Care_with_a_Compass_v10.7.13_Exhaustive_Final_Audit_Prompt.txt` along with the ZIP. Follow the prompt's requirements for exhaustive question-by-question, branch-by-branch, copy, design, finance, accessibility, and factual validation. Do not claim browser tests if only source was read.

Current snapshot inventory (48 existing files):
- .gitignore (20 bytes)
- .nojekyll (0 bytes)
- COPYRIGHT.md (202 bytes)
- Question_Editor.html (8752 bytes)
- README.md (30591 bytes)
- REPORTING_SETUP.md (5083 bytes)
- chapters.html (4929 bytes)
- consequence-lab.html (155384 bytes)
- css/chapters-unified.css (7366 bytes)
- css/styles.css (38287 bytes)
- css/v92.css (51126 bytes)
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
- js/budget-planner.js (22210 bytes)
- js/chapter-report-bridge.js (3639 bytes)
- js/concepts.js (4578 bytes)
- js/data.js (209740 bytes)
- js/learner-services.js (17067 bytes)
- js/question-followups.js (28794 bytes)
- js/v92-app.js (59497 bytes)
- js/v92-data.js (57110 bytes)
- js/v94-lessons.js (18027 bytes)
- js/v96-references.js (4761 bytes)
- tools/build_branching_js.py (697 bytes)
- tools/build_data_js.py (498 bytes)
- tools/build_standalone.py (1223 bytes)
- tools/qa_branching.py (2812 bytes)
- tools/qa_release.py (4770 bytes)

**No changes to the main branch.** Audit suggestions should be delivered as a report or patch proposal, not silently pushed to the live app.
