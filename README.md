# Care with a Compass — The Director's Desk · v9.7.1

An interactive, consequential leadership-development **academic prototype** created for EDACE 830 at Kansas State University.

**Try the program:** https://rstenlund1.github.io/care-with-a-compass/?v=9.7.1

## What this release includes

- Five guided foundation chapters using 72 applied questions, 36 follow-ups, and the original chapter capstone.
- Three long-form applied case simulations, plus a staffing-resilience lab and evidence journal.
- A **five-stage adaptive final capstone**. The preceding decision changes the facts and available responses in the next stage, including twelve modeled conditional scenarios across stages two through five. Learners may review their decision trail and revise prior selections before submitting the local demonstration.
- A structured diagnostic assessment and a proposed, human-scored 30-day workplace transfer plan.
- A single guided Continue Training flow, open sidebar navigation, and clear Home / Start Over controls.

## Staffing budget clarification (v9.7.1)

The staffing lab now separates **baseline labor**, **incremental qualified relief labor**, and **total modeled labor**. It assumes eight paid hours per scheduled teacher per day, plus 0/3/6/9 example extra paid hours depending on the reserve staffing plan. Dollar totals respond to the number of teachers, reserve plan, and fully loaded hourly cost; the wage slider updates totals while being moved. These are instructional cost projections, not actual operating budgets. The additional relief amount correctly remains $0 under the minimum-only design, but the total labor is still nonzero.

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
