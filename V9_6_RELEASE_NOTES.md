# Care with a Compass v9.6.0: Consistency, Judgment, and Real-World Learning

## Instructional purpose
Version 9.6 remains one integrated professional-development program for **new and aspiring child care supervisors and directors**. The program continues to use five learning chapters, 72 original supervisory questions, 36 follow-ups, chapter decision labs, longer cascading simulations, operational practice, evidence review, and the 20/70/10 competency demonstration.

## 1. Unified visual design
- Added `css/chapters-unified.css` to apply the same plum/cream palette, serif headings, button treatments, cards, and feedback conventions to the original embedded five-chapter learning engine.
- Improved styling of the new modules' reference panels, real-world afterwords, interactive answer choices, and expanded Staffing Lab.
- Existing Home, Start Over, Continue Training, seven open sidebar sections, and local saved-progress keys are unchanged.
- Styles are responsive; visual/browser and screen-reader checks remain to be completed before a real pilot.

## 2. Vocabulary without lowering expectations
- The original chapter glossary retains hover definitions and click-to-open accessible details.
- The newer module's 23 contextual terms now show definitions on hover, keyboard focus, and click, including terms in decision feedback, case descriptions, the Staffing Lab, Evidence Journal, assessment, and facilitator-facing explanations.
- Fixed a bug in the new answer-term regular expression, and avoided nested keyboard-focus controls in answer buttons.
- Technical terminology such as *conceptual skill*, *operational resilience*, *qualified coverage*, and *reasonable suspicion* remains in the instructional text.

## 3. Better answer-choice quality
- Rewrote all **21** question sets in the newer long-form cases and scored capstone with shorter preferred answers and plausible, substantive alternatives.
- The best answer is now the longest in only **3 of 21** new question sets, rather than all 21.
- Added deterministic, participant-specific shuffling to case and assessment options. Order stays stable when the screen rerenders; scoring continues to use option IDs.
- Tightened 10 conspicuously verbose preferred responses in the original 72-question bank without changing the answer keys, feedback standards, or intended safeguarding principles.
- The original course still contains **72 questions** and continues its established option-position shuffling.

## 4. Sources with the feedback
- Added `js/v96-references.js`, a human-authored, 12-source catalog covering California center supervision (22 CCR § 101229), preschool teacher-child ratio (22 CCR § 101216.3), child personal rights (22 CCR § 101223), parent access (HSC § 1596.857), mandated reporting (Penal Code § 11166), licensing incident reports (22 CCR § 101212), medication handling (22 CCR § 101226), federal disability rights, and relevant professional standards.
- After each decision in a long-form case, the feedback includes relevant linked sources and notes explaining legal requirements versus professional recommendations.
- The separate assessment reveals stage-specific references in the post-submission decision audit. The Evidence Journal and Staffing Lab likewise show sources.
- Original chapter questions already include choice feedback and `citeQ()` references.
- These sources were checked for existence and relevance, but each full scenario still needs specialist review before professional deployment.

## 5. Staffing Lab expansion
The laboratory now lets directors change:
- Attendance (6–36 preschool children)
- Qualified teachers actually scheduled (1–4)
- Relief plan (none, overlapping shift, qualified relief employee, or both)
- Whether an interruption falls inside or outside the overlapping-shift window
- Restroom breaks, sick calls, simultaneous emergencies, or medical transport
- Total hourly employer cost ($18–$45)
- A child's individualized support needs

It models the simplified preschool 1:12 teacher-child floor, the number of teachers remaining after the disruption, the gap if any, and illustrative day/week/22-day relief costs. It does **not** certify compliance. Other ages, permitted aide arrangements, room configuration, funded-program requirements, and individual child needs must be assessed separately.

## 6. Real-life afterwords that teach preparedness
- *The Pickup That Became a Crisis* remains an anonymized case based on an actual parent confrontation, with alleged parental coaching explicitly unverified.
- *After the Ambulance Leaves* now explains the administrator's account of **a four-year-old nonspeaking child with Level 3 autism and severe allergies**, the administrator's decision to accompany him in the ambulance while retaining qualified facility coverage, and what followed at the hospital.
- Crucially, the case discloses that **the child's mother refused to leave work to collect him after emergency treatment**, according to the administrator's account. It also recounts the report of suspected abuse or neglect and the second medical emergency the following morning. These reported actions are not portrayed as official findings against a family.
- The training explicitly notes that the medication-storage complication, hypothetical transportation barrier, and some later branches were added or combined for instruction rather than necessarily occurring to the real child.
- No real names, exact dates, hospital, or identifying facility names are included in the new afterwords. A leadership-reflection prompt asks how the learner would respond after seeing the real outcome.

## Validation completed
- 17 of 17 source and structural checks passed.
- 22 of 22 simulated interaction checks passed, including glossary/answer rendering, per-choice source feedback, case completion, the anonymized hospital reveal, staffing model calculations, Evidence Journal, assessment, open navigation, and Home/Start Over.
- Two JavaScript application syntax checks passed, and the data schemas and original question count remained valid.
- **Not yet completed:** manual browser screenshot review, screen-reader and keyboard walkthrough, real learner usability testing, California licensing specialist legal approval, and psychometric validation of the mastery cutoff.

## Recovery
- v9.5.2 before design pass: `backup/v9.5.2-before-design-review-20261113`
- Working release branch: `feature/v9.6-design-clarity-staffing`

The program remains a prototype for academic learning design. No validated professional credential is represented by its local assessment result.
