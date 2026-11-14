# Care with a Compass — The Director's Desk · v9.8.2

An interactive, consequential leadership-development **academic prototype** created for EDACE 830 at Kansas State University.

**Try the program:** https://rstenlund1.github.io/care-with-a-compass/?v=9.8.2

## What this release includes

- Five guided foundation chapters using 72 applied questions, 36 follow-ups, and the original chapter capstone.
- Three long-form applied case simulations, plus a staffing-resilience lab and evidence journal.
- A **five-stage adaptive final capstone**. The preceding decision changes the facts and available responses in the next stage, including twelve modeled conditional scenarios across stages two through five. Learners may review their decision trail and revise prior selections before submitting the local demonstration.
- A structured diagnostic assessment and a proposed, human-scored 30-day workplace transfer plan.
- A single guided Continue Training flow, open sidebar navigation, and clear Home / Start Over controls.

## Staffing budget clarification (v9.8.2)

The staffing lab separates **base teacher labor**, **additional teacher coverage**, and **total modeled teacher labor**. It assumes eight paid hours per scheduled teacher per day, plus 0/3/6/9 extra paid hours for no extra teacher, a 3-hour busy-period teacher, a 6-hour backup teacher, or both. Dollar totals respond to the number of teachers, reserve plan, and fully loaded hourly cost; the wage slider updates totals while being moved. These are instructional cost projections, not actual operating budgets. Additional cost is correctly $0 when no extra teacher is scheduled, but baseline labor still costs money. The 3-hour teacher is counted only during their extra shift; this classroom model assumes the 6-hour backup teacher is on shift during the selected incident.

## Responsive embedded learning chapters (v9.8.2)

The five-chapter iframe now reports its intrinsic content height rather than the full iframe viewport height. The outer page resizes the frame up or down with a small fixed margin, avoiding the accumulating blank white area between lesson screens. The measurement uses element bounds and a resize observer, including updates after images load. No lesson or question content was changed.

## Learner enrollment, reports, and completion certificate (v9.8.2)

- **Learner full name is required** on the main opening page beneath the introductory program description; there is no separate registration splash screen. Company, center, or organization is optional; participants acknowledge that their scores and progress may be shared with the program instructor. The instructor's identity appears on the program landing page.
- When learners complete each of the five foundational chapters, the embedded chapter engine supplies the **first-attempt and final response summary**, question/objective IDs, remedial attempts and live-coaching flag. The parent program also queues the final competency-assessment results and facilitator-review updates.
- Reports are stored locally pending email delivery. Their browser-side destination is in `index.html`: `window.CWC_REPORT_ENDPOINT=""`. **Email is NOT operational until the instructor configures a verified Formspree endpoint.** Never enter Outlook passwords or private service API keys into public site code. After a successful provider response, the local report is marked as sent. This is a demonstration, not a guaranteed tamperproof academic records system.
- A **printable completion certificate** is available after the five foundation chapters and original capstone, all three applied simulations, the staffing and evidence labs, and final competency assessment submission. It recognizes completion **regardless of the separate proposed 90/100 mastery gates**. The existing foundation-only certificate implementation remains in the independent chapter engine, but the integrated program uses the full-program completion check.
- A **Switch Learner** control clears local progress and identity on shared devices. Start Over preserves the enrolled learner's identity but clears program progress, reports and completion date for a new attempt.

For current enrollment and email setup details, see [REPORTING_SETUP.md](REPORTING_SETUP.md).

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
