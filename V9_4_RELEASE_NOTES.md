# Care with a Compass v9.4.0 — One Guided Supervisor and Director Program

## Instructional purpose
This is a **single** five-week leadership-development curriculum for new or aspiring child care supervisors and directors. It does not create a second caregiver-training track. Caregiver experiences appear as case evidence through which the learner exercises **supervisory judgment**.

## Learner journey
1. **One Start Training button** on the program's initial landing page enters the existing five-chapter learning sequence. The original chapter engine launches the first lesson directly when embedded, so participants do not encounter a second introductory start button.
2. **Each chapter begins with its original learning lesson**, including worked examples, contextual glossary help, and progressive support. The original 72 applied questions, 36 follow-ups, five chapter labs, four-stage capstone, and learner progress remain intact.
3. On completing the chapter capstone, the integrated edition offers **Continue to applied supervisor simulations**. The original course's early completion certificate is not offered at that intermediate stage, because completion of the five foundational chapters is not equivalent to the entire program's competency standard. The archived standalone source remains available separately.
4. **Each long-form case and new practice module begins with a substantial instructional lesson** before decisions are shown. Modules include three long-form cases (*The Pickup That Became a Crisis*, *After the Ambulance Leaves*, *A Schedule That Cannot Bend*), the Staffing Resilience Lab, the Evidence Journal, the competency demonstration, and the Facilitator Review.
5. A **Continue** action links each completed case to the next case's introductory lesson, then leads from the staffing lab to the evidence journal and from reviewed evidence to the competency assessment. Direct sidebar and URL navigation remain available for teaching demonstrations; every new module still opens its own lesson before the activity.
6. The original five-chapter completion artifact remains distinct from the proposed final 20/70/10 competency framework, which still requires a human facilitator score and all three mastery gates.

## Keeping the intellectually demanding language
- Twenty-three professional terms have contextual definitions, including *conceptual skill*, *operational resilience*, *reasonable suspicion*, *second-order consequence*, *qualified coverage*, *inference*, *scaffolding*, and *critical safety indicator*.
- Professional terminology is **retained in the lessons** rather than removed. Learners can reveal definitions directly at the point of use with underlined terms, accessible buttons, keyboard focus, and hover text. Escape closes open definitions.
- Explanations support the learner without implying that they should already know the vocabulary.

## Real-world case reveal after learning
- After finishing the pickup-confrontation case, the program states that it is **adapted from a real child care incident**, with names and identifying details withheld or changed. The alleged parental direction of peer mistreatment is explicitly described as unverified; later decision branches are fictionalized.
- After the medical emergency case, the program explains that the scenario draws from **actual caregiving experiences**, with chronology and decisions adapted or combined for instruction.
- The staffing case states that it reflects **recurring real administrative challenges**, not a claim that all its events occurred to one family or program.
- These notes are deliberately revealed **after the learner's decisions**, not before. They are educational disclosures, not findings about real people.

## Technical preservation
- Main public entry remains `index.html`.
- Original five-chapter course remains `chapters.html`, with its existing storage key, question logic, and in-browser state preserved.
- Integrated simulator source remains `js/v92-app.js` for backward compatibility, powered by `js/v92-data.js` (scenario bank version 9.4.0).
- New authored learning content and glossary definitions are in `js/v94-lessons.js`.
- Module introductions use the previously established local state key with a new `introSeen` field; earlier learner records are not erased.
- Case decisions and the original course's reflection and chapter progress remain separate **technical components** of the same instructional program.
- Older `director-desk.html` links continue redirecting to the unified homepage.
- No live AI-generated legal advice is used. All consequences and regulatory content remain authored and require specialist review before a live professional pilot.

## Quality checks
- JavaScript syntax checks passed on the original chapter engine and integrated simulator.
- 27 targeted integration tests passed: single start, chapter entry, lesson gates, vocabulary tooltips, scenario completion, factual afterwords, case continuation, staffing and evidence module intros, assessment intro, and preserved original assets.
- Additional source scans found **no real case participant names** in the new lessons and no banned or hidden formatting in the authored instructional text.
- **Still required before real cohort delivery:** full browser and screen-reader testing, regulatory specialist review, facilitator training and assessment validation, and an appropriate learner-data management plan. The current evaluation is an unauthenticated local demonstration, not a state-issued credential or validated assessment.

## Recovery branches
- `backup/v8.6.0-before-v9.2-20261113`
- `backup/v9.2-before-unified-tracks-20261113`
- `backup/v9.3-before-guided-sequence-20261113`

*Prepared for academic prototyping. The program has not been evaluated for effectiveness with a participant cohort.*
