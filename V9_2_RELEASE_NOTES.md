# Care with a Compass · Director's Desk v9.2.0

## Entry points
- **New v9.2 simulation:** [director-desk.html](director-desk.html)
- **Original five-chapter course (v8.6.0):** [index.html](index.html)
- The original course has chapter-level links to relevant v9.2 practice cases. Both experiences retain their own local progress.

## Features implemented in v9.2
1. **Director's Day:** Three authored, multi-stage leadership simulations totaling 16 consecutive decisions.
   - *The Pickup That Became a Crisis* (6 stages, 3 starting-condition variations)
   - *After the Ambulance Leaves* (5 stages, 2 variations)
   - *A Schedule That Cannot Bend* (5 stages, 2 variations)
   - All seven variations use human-authored scripts. The engine records the actual options selected, applies persistent facility-condition changes, retains critical safety warnings, and presents an after-action decision trail.
2. **Director's Desk overview and timeline:** Scenario status, incident history, current facility conditions, and after-action review.
3. **Evidence journal:** Six items classifying first-hand observation, recorded information, allegations, inference, or prediction, with explanatory feedback.
4. **Staffing resilience lab:** Illustrative options for minimum-only coverage, overlapping qualified shifts, qualified relief, and both; disruption tests include breaks, sickness, and simultaneous demands; hourly employer cost is adjustable. This is **not** a calculation of legally required ratios.
5. **Pilot competency-assessment demonstration:** Five diagnostic vignettes for two objectives (20 points), a separate five-stage case (70 points), and a 30-day transfer plan requiring human scoring (10 points). All three proposed gates apply: 90/100, 4/5 for each diagnostic objective, and no unresolved critical safety errors.
6. **Facilitator Desk:** Human rubric for scoring the transfer plan, feedback entry, report export (JSON and CSV), and print view. A facilitator must enter a score before a full result is displayed.
7. **Case export:** Downloadable JSON decision history for each completed long-form simulation.
8. **Original curriculum integration:** Each existing chapter links to a relevant new simulation, without changing the established 72 applied questions, 36 anchored follow-ups, concept cards, or chapter progress.

## Data and privacy
- The new simulator stores practice progress in the current browser's **localStorage** only. It has no server account system, cloud database, or synchronization.
- The optional participant name should be a pseudonym or code for early testing. Do not enter real identifying details of children or families.
- All scenarios are fictional instructional composites. The software is not a mandated-reporter certification, legal service, or accredited training credential.
- A local facilitator score is not authenticated as having come from a qualified independent reviewer. These features demonstrate a **proposed** pilot workflow.

## Verification performed
- Verified files are present in the development branch.
- JavaScript syntax checks passed for the original course and the new simulator.
- Scenario data integrity checks passed: unique option IDs; all branching references valid; five diagnostic vignettes; 70-point capstone.
- Programmatic interactive checks passed for navigation, scenario selection, branch persistence, critical safety flags, staffing parameters, evidence classification, facilitator review, and JSON/CSV report generation.
- A complete best-response practice assessment produced 100/100 and all three proposed gates satisfied.
- **Not yet completed:** A manual cross-browser accessibility review, professional California regulatory review of every scenario, and field testing with actual participants.

## Instructional design choices
- **No live generative legal guidance.** Scenario events, consequences, and feedback use deterministic authored content to permit specialist review and consistent comparison across learners.
- Existing v8.6 progressive scaffolding and guided recovery remain part of the five-chapter course; the v9.2 simulation builds a second, longer-form applied environment.
- The 90/100 standard is a proposed instructional threshold, not a California credential or validated cut score. An official pilot also needs equivalent reassessment items, trained raters, appropriate consent and data management, and validity/reliability work.

## Recovery
The pre-upgrade baseline is preserved in GitHub branch `backup/v8.6.0-before-v9.2-20261113`. The work was constructed and tested on `feature/v9.2-directors-day` before being published to the repository default branch.
