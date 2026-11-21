# Care with a Compass — The Director’s Desk · v10.4.0

**Live program:** https://rstenlund1.github.io/care-with-a-compass/?v=10.4.0

**v10.4.0 simulation and usability correction:** Independent static review found that the three expanded Director's Desk cases used repeated feedback, some harmful staffing decisions did not update live counts, and transportation cases inherited irrelevant medical-escort questions. This release adds individualized reasoning across all 36 original-Desk decision sets, connects leave/admission choices to live staffing or attendance, adds scenario-specific transportation questions for the remaining 22 transport steps, and removes a generic distractor-changing function that could overwrite safety effects. It places the primary decision before optional reference and staffing tools, collapses those tools, and puts coverage alerts with the focused decision. Eight foundational questions and selected branching alternatives now use more credible near-misses. The workplace transfer plan has a live character counter.

**Validation:** Syntax checks and programmatic scenario/variant generation checks passed. This is still an academic prototype; browser-based mobile and assistive-technology tests, child-care regulatory and clinical specialist validation, live Formspree delivery testing, and a learner pilot remain outstanding. This release does not establish certification validity.

---

# Care with a Compass — The Director's Desk · v10.2.0

**Live program:** https://rstenlund1.github.io/care-with-a-compass/

**Assessment-quality revision (v10.2.0):** The unified Consequence Lab draws three cases per session from eleven scenarios, including the three original Director's Desk stories reconstructed as 12-decision cases. Both answer order and case sequence vary automatically; randomization is not described to the learner. Case questions and choices were programmatically audited across 564 scenario/variant combinations. This release replaces repeated template distractors in the three expanded stories, adds realistic near-miss choices, removes arbitrary answer-length padding, and rewrites one weak distractor in applicable core decision sets. All choices retain decision-specific grading and explanatory feedback. Head Start-inspired topics remain attributed, separately from California child care licensing guidance.

**Validation:** All 564 scenario/variant combinations generated answer sets in a programmatic audit with no exceptions, and the updated script passed a syntax check. This is not a substitute for independent specialist review or a complete live-browser, accessibility, or learner pilot. Existing historical release documentation follows.

---

**v10.0.1 instructional enhancement:** The five existing foundation lessons now include extra director-level reasoning sections on safeguarding, reporting, staffing, emergencies and verifying transfer. All 72 applied questions retain individualized feedback; a correct response additionally displays the chosen option's explanation. The 36 connected follow-ups now show the original governing principle, why a selected path succeeds or needs correction, and a transfer question. The original Consequence Lab included eight case-specific prebrief lessons and a twelve-part decision-coaching framework. After every choice, the lab explains the relevant duty, compares a plausible alternative, and separates process quality from fictional outcome.

**Validation status:** Changes were reviewed against the source and the original backup was preserved. These new changes have NOT yet received a complete browser-based regression test, real learner pilot, independent clinical/legal content review, or validation of instructor email reports. The external GitHub Pages deployment cannot be confirmed merely by the existence of a repository commit; confirm the published page and inspect cached assets before presenting. Do not describe the educational simulations as validated professional certification or legally authoritative protocols.

**Preserved baseline:** backup/v9.9.1-before-consequence-lab-20261120

---

# Care with a Compass — The Director's Desk · v9.9.1

An interactive, consequential leadership-development **academic prototype** created for EDACE 830 at Kansas State University.

**Try the program:** https://rstenlund1.github.io/care-with-a-compass/?v=9.9.1

## What this release includes

- Five guided foundation chapters using 72 applied questions, 36 follow-ups, and the original chapter capstone.
- Three long-form applied case simulations, plus a staffing-resilience lab and evidence journal.
- A **five-stage adaptive final capstone**. The preceding decision changes the facts and available responses in the next stage, including twelve modeled conditional scenarios across stages two through five. Learners may review their decision trail and revise prior selections before submitting the local demonstration.
- A structured diagnostic assessment and a proposed, human-scored 30-day workplace transfer plan.
- A single guided Continue Training flow, open sidebar navigation, and clear Home / Start Over controls.

## Staffing budget clarification (v9.9.1)

The staffing lab separates **base teacher labor**, **additional teacher coverage**, and **total modeled teacher labor**. It assumes eight paid hours per scheduled teacher per day, plus 0/3/6/9 extra paid hours for no extra teacher, a 3-hour busy-period teacher, a 6-hour backup teacher, or both. Dollar totals respond to the number of teachers, reserve plan, and fully loaded hourly cost; the wage slider updates totals while being moved. These are instructional cost projections, not actual operating budgets. Additional cost is correctly $0 when no extra teacher is scheduled, but baseline labor still costs money. The 3-hour teacher is counted only during their extra shift; this classroom model assumes the 6-hour backup teacher is on shift during the selected incident.

## Responsive embedded learning chapters (v9.9.1)

The five-chapter iframe now reports its intrinsic content height rather than the full iframe viewport height. The outer page resizes the frame up or down with a small fixed margin, avoiding the accumulating blank white area between lesson screens. The measurement uses element bounds and a resize observer, including updates after images load. No lesson or question content was changed.

## Learner enrollment, reports, and completion certificate (v9.9.1)

- **Learner full name is required** on the main opening page beneath the introductory program description; there is no separate registration splash screen. Company, center, or organization is optional; participants acknowledge that their scores and progress may be shared with the program instructor. The instructor's identity appears on the program landing page.
- When learners complete each of the five foundational chapters, the embedded chapter engine supplies the **first-attempt and final response summary**, question/objective IDs, remedial attempts and live-coaching flag. The parent program also queues the final competency-assessment results and facilitator-review updates.
- Reports are stored locally pending email delivery. Their browser-side destination is in `index.html`: `window.CWC_REPORT_ENDPOINT=""`. **Email is NOT operational until the instructor configures a verified Formspree endpoint.** Never enter Outlook passwords or private service API keys into public site code. After a successful provider response, the local report is marked as sent. This is a demonstration, not a guaranteed tamperproof academic records system.
- A **printable completion certificate** is available after the five foundation chapters and original capstone, all three applied simulations, the staffing and evidence labs, and final competency assessment submission. It recognizes completion **regardless of the separate proposed 90/100 mastery gates**. The existing foundation-only certificate implementation remains in the independent chapter engine, but the integrated program uses the full-program completion check.
- A **Switch Learner** control clears local progress and identity on shared devices. Start Over preserves the enrolled learner's identity but clears program progress, reports and completion date for a new attempt.

For current enrollment and email setup details, see [REPORTING_SETUP.md](REPORTING_SETUP.md).

## Instructor reports with answer-level evidence (v9.9.1)

Chapter reporting now includes the **full wording of every initially missed question**, the learner's first response, the preferred response, the reasoning/feedback, the final response after practice, and a concise outcome line for every question. This is critical for instructors who prepare live coaching based on first-attempt gaps. Chapter reports are submitted explicitly; report submissions have unique learner-session IDs. Earlier-format pending chapter reports are archived locally without automatic replay, limiting duplicate emails. Successful service responses mark reports sent; ambiguous network failures disclose that delivery may already have occurred, and provide the actual validation error when available.

## Chapter submission and case variation (v9.9.1)

Each foundational chapter now ends with a **Review and Submit Chapter** checkpoint, displaying initial and final preferred-response counts. A deliberate **Submit Chapter Results to Instructor** button sends the learner's report to the configured Formspree service and displays success only after the service responds successfully. An independent **Continue to Next Chapter (testing)** button remains available during testing. Older completed chapters are preserved, with a reminder to submit any that do not yet have a successful local delivery record.

The surrounding chapter count updates from secure same-origin messages from the embedded lesson engine; it no longer remains stuck at 0/5 when a learner completes Chapter 1. Reporting events use distinct `chapter-submit-request` and `chapter-submit-status` messages so a chapter is not emailed merely by navigating onward.

The seven applied-case starting conditions now select **25 scenario adjustments** across the three long-form simulations. The variant changes actual question wording, situation details, and relevant response wording while preserving consistent scoring and essential safety duties.

Seven editorial photo banners reuse pictures already included in `images/` across applied cases, the staffing simulation, the evidence journal, the competency assessment and facilitator review.

## Final glossary polish (v9.9.1)

The legacy green/teal glossary popovers used in the embedded five-chapter curriculum now match the deep-purple instructor-guide definitions throughout the unified platform. The override is restricted to glossary buttons, hint symbols and open definition panels; assessment feedback colors and learning/scoring behavior are unchanged. Keyboard focus, Escape-to-close, and mobile positioning remain in the existing chapter engine.

## Final academic demonstration release (v9.9.1)

The completed prototype is prepared for an instructor-facing presentation. The five-stage final assessment has 243 decision sequences with consistent 70-point capstone weights and separate critical-safety gates. The five foundational chapters preserve first-attempt learner answer history, and chapter reports include the missed question, original selection, preferred choice, and subsequent improvement. Browser-side reports and progress are not tamperproof or authenticated.

The final facilitator rubric now requires an explicit **Enable facilitator scoring simulation** action. This is a teaching demonstration, NOT a secure reviewer login or independent verification. Any resulting score is provisional simulated performance, not an accredited award. The personalized completion certificate acknowledges completion of activities, not proof of mastery or professional qualification.

This release does not claim validated learning outcomes, a formally approved credential, or legally approved curriculum.

## Pilot scoring model

| Part | Points | Description |
|---|---:|---|
| Diagnostic classification and structural analysis | 20 | Five vignettes with two separate judgments each |
| Five-stage adaptive capstone | 70 | Safety 25, emergency handoff/coverage 15, reporting 10, evidence 10, downstream consequences 10 |
| Facilitator-reviewed workplace plan | 10 | Human scoring is demonstrated locally |
| **Total** | **100** | |

Proposed pilot competency gates: at least 90/100, at least four of five correct on each diagnostic objective, and **no designated critical safety failures**. A high numerical score cannot override a missed safety gate.

The scoring threshold is a program design choice, not a California regulatory or validated certification standard.

## Development and evidence

- `index.html` loads the modular application, data, lesson, and citation assets.
- `js/v92-app.js` contains navigation, stage selection, branch-sensitive scoring, and browser-local output.
- `js/v92-data.js` contains the case and assessment data, including conditional assessment scenarios.
- `js/v94-lessons.js` supplies guided instruction and vocabulary.
- `js/v96-references.js` supplies supporting legal, regulatory, and adult-learning references.
- `css/v92.css` includes responsive layouts.

The current release was compilation-checked and programmatically exercised on all **243** possible five-stage option sequences, with 12 distinct decision-dependent follow-up conditions and zero automated assessment-rendering errors.

## Limitations and pre-pilot work

This is a **working demonstration, not an accredited course, verified credentialing platform, or evidence of measured learning outcomes**. Its local browser storage cannot verify participants or independent facilitators; there is no cloud synchronization or multi-learner dashboard. The current practice assessment allows pre-submission revision and is not a secure first-attempt examination.

Before a real pilot, the program requires independent California regulatory and child-protection review, live usability/accessibility testing, authenticated facilitator scoring, controlled assessment administration, and genuinely equivalent reassessment forms. Source citations illustrate decision frameworks; the prototype is not legal advice or a replacement for current law.

All instructional case material is fictionalized and deidentified. The project does not claim approval, funding, partnership, or endorsement from Kansas State University, Pathways LA, or California credentialing agencies.

## Protected historical baseline

The previous release is preserved on branch `backup/v9.6.1-before-branching-capstone-20261113`.
