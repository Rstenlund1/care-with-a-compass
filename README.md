# Care with a Compass — The Director's Desk · v10.7.17

**Optional calculator:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.17&page=staff

**UI compactness:** Removed standalone “Children (over age 2)” heading; the two columns now directly read “Full-time Children (over age 2)” and “Part-time Children (over age 2).” Both count fields retain accessible names from their headings. Infant heading layout remains unchanged.

**California small-home conditional capacity:** Refined status messaging so seven or eight children never receive an unqualified “no numerical coverage gap” reassurance. Instead, a conditional-capacity warning names the kindergarten/elementary school child, a second child age 6 or older, maximum 2 infants, parent notification and written property-owner consent if renting. Adding staff does not increase licensed capacity or override age-mix restrictions. Legal basis: California HSC 1597.44 and 22 CCR 102416.5. The budget still conservatively autofills additional 40-hour staff at seven or eight children as a finance assumption; this does not imply a second staff member is mandatory in all lawful 7-8-child cases.

**QA:** current JavaScript parses; separate full/part-time older and infant counts, price estimates and persistent training state unchanged. Additional browser screenshots and professional compliance review should be included in the Gemini final audit.

---

# Care with a Compass — The Director's Desk · v10.7.16

**Planner:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.16&page=staff

**Enrollment-heading and icon-alignment polish:** The older-child counts now show “Full-time children” and “Part-time children” on one line, with a numerical input immediately beneath each heading. This matches the infant layout without duplicating the word “Children.” All info icons use fixed 22-pixel circles and explicit flex centering for the “i” glyph, including tooltips within financial result cards where generic span rules previously added margins. Count fields remain accessible with aria-labelledby; no calculations or values changed.

---

# Care with a Compass — The Director’s Desk · v10.7.15

**Live optional calculator:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.15&page=staff

**Final spacing and labeling tweaks:** "Program type" and "California county" share one row on desktop and stack on narrow screens. The non-infant section now reads "Children (over age 2)" with no far-right duplicate note. The infant count inputs now sit immediately below "Full-time infants" and "Part-time infants" without a redundant "Infants" label; the visible headings still provide accessible names to screen readers. No calculations, financial defaults, licensing assumptions, or saved values were changed. All changes are on main; the independent Gemini audit source snapshot should be refreshed to this release before the final review.

---

# Care with a Compass — The Director’s Desk · v10.7.14

**Live optional planner:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.14&page=staff

**Infant and licensed-program financial modeling:** Added Small Family Child Care Home, Large Family Child Care Home, and Preschool Center as selectable program types. Full-time and part-time infants are now separate enrollment categories with their own editable monthly tuition rates, alongside full-time and part-time non-infant children. The appropriate county's 2026 modeled median family-home or center rates for infants and preschool-age children automatically prefill tuition; part-time rates start at 75%. Rates are PayByTown's October 2026 DOL-2022-based BLS-adjusted medians, not actual quotes or a legal reimbursement schedule.

**Staffing behavior:** The director remains the first staff member in the simplified budget. A conservative staffing estimate auto-populates additional staff FTE and 40 paid hours/week when enrollment or program type changes; the learner may override it. Small family home: six normally, special requirements for seven–eight and family-home infant composition rules (including four infants only, or up to six with no more than three infants). Large family home: standard twelve with a qualified assistant, conditional thirteen–fourteen and reduced infant maximum. Preschool center: illustrative one teacher per twelve preschool-age children and one separate qualified infant-care person per four infants; the director is counted once, only when suitably qualified and supervising that group. Two-year-old toddler groups may have different rules. The app warns about the selected license's infant/capacity constraints even if additional staff have been budgeted. As with the earlier tool, these are educational budget and planning assumptions, not proof of legal compliance. Infants are counted separately from older children to avoid double counting. The optional planner continues to have no effect on course completion or certificates.

**QA:** JS syntax and 18 unit-style model/interaction scenarios passed, including 8-child assistant auto-budget, 4 infants alone vs. mixed with another child, home 12/14 thresholds, center separate infant+preschool staffing groups, county pricing and 75%-linked infant part-time rates. Interactive graphical browser QA remains necessary.

---

# Care with a Compass — The Director’s Desk · v10.7.13

**Optional planner:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.13&page=staff

**Tooltip interaction improvement:** All help icons in the optional budget planner now reveal explanations automatically on mouse hover, with no click required. Keyboard focus and touch focus can also display the explanation. Previous click-to-open details/summary controls have been replaced with accessible non-toggle help markers, including input labels, county selection, financial results, and expense breakdown lines. No calculator assumptions, progress data, or calculations were changed.

---

# Care with a Compass — The Director’s Desk · v10.7.12

**Optional budget planner:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.12&page=staff

**Final budget usability adjustments:** The optional planner has contextual help icons for financial inputs, result cards, and expense breakdowns. Removed the unnecessary “Go to Evidence Journal” shortcut at the bottom of the page. The rent tooltip is now concise without an extended home-rent explanation. Restored a live illustrative 1:12 staffing-coverage warning based on full-time plus part-time daytime children, one director, whole additional-staff FTEs, and temporary absence. This warning is not a substitute for California age-specific, facility-type, or licensed-capacity rules. The default is 1 full-time child, 0 part-time, 0 additional staff, 0 temporarily unavailable, so it starts with no illustrated coverage gap. The default student count is applied to new or untouched planner sessions while preserving previously edited values. Financial calculations continue to treat director salary separately from staff payroll. Source syntax and example calculations checked; live graphical browser review outstanding.

---

# Care with a Compass — The Director’s Desk · v10.7.11

**Live optional planner:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.11&page=staff

**Home-based care rent clarification:** The rent field now reads "Commercial facility rent ($/month)" and explains that home-based providers should enter $0 instead of their household rent or mortgage. This does not change any calculations, stored values, or existing zero-dollar rent default. The simplified model intentionally excludes household housing costs, so it is not a comprehensive accounting or tax expense model.

---

# Care with a Compass — The Director’s Desk · v10.7.10

**Optional calculator:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.10&page=staff

**Single-page optional budget tool:** Removed the separate Staffing Coverage section, its cost duplicate, and the two jump buttons. Replaced them with one “Staff temporarily unavailable” dropdown next to additional classroom staffing in the budget. The director is always included as one staff member in the simplified scenario, so additional classroom staff still default to 0. Available staff = max(0, 1 director + whole additional staff FTEs − temporarily unavailable persons). This is an illustrative headcount, not a legal staffing ratio or guarantee of director eligibility. Temporary absence does not alter payroll automatically, since paid shifts remain incurred. Previously saved main-course progress and budget entries remain intact; staff unavailability defaults to none. Optional planner still never contributes to core training progress or certificate eligibility. The interface now has one financial editor with live financial results and a brief staff-availability status. Source-level logic and syntax validation performed; live graphical/browser testing remains necessary.

---

# Care with a Compass — The Director’s Desk · v10.7.9

**Live planner:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.9&page=staff

**Financial planner clarification:** “Director monthly salary ($)” now appears above “Additional classroom staff (FTE, excluding director)” rather than alongside it in the same grid row. Additional classroom staff default to 0 FTE for new or untouched planner sessions, while previously entered values remain saved until reset. This avoids automatically counting a classroom employee in addition to the director. Calculations and licensing-specific staffing caveat remain unchanged.

---

# Care with a Compass — The Director’s Desk · v10.7.8

**Optional planner:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.8&page=staff

**County tuition estimates added:** Reintroduced a compact dropdown covering all 58 California counties above the full-time/part-time enrollment controls. Selecting a county prefills monthly full-time tuition from that county's estimated 2026 median preschool center rate; prices are from PayByTown, https://paybytown.com/childcare/california/, which adjusts U.S. Department of Labor 2022 county median preschool center weekly prices by 23.3% to 2026. Monthly values are rounded weekly ×52/12. Unavailable counties use a California statewide median center-preschool reference of $1,202/month, derived from $225/week in 2022 and the same publisher's 23.3% estimate adjustment, https://scrillischool.net/guides/preschool-and-daycare-cost/. These values are estimated medians, not observed 2026 provider quotes or all-age averages. Selected county tuition remains editable; manually edited tuition is preserved across page visits, but selecting a new county resets the suggested full-time rate. Linked part-time tuition remains 75% until manually overridden. Existing edited values from v10.7.7 remain saved. Financial controls stay compact; no rent/insurance defaults are reintroduced.

---

# Care with a Compass — The Director’s Desk · v10.7.7

**Optional planner:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.7&page=staff

**Budget simplification:** Full-time and part-time enrollment/tuition inputs are adjacent. Part-time tuition defaults to 75% of the full-time rate and follows it until manually overridden. Overnight stays default to zero, and rent, utilities, and insurance default to $0 in a fresh/untouched planner. Removed the profit-goal field, respite settings, payroll taxes/benefits setting, overnight staffing-hours input, backup coverage-days input and its checkbox. Break-even tuition now covers the explicitly listed expenses plus director salary, without an added profit goal. Previously edited planner amounts remain saved unless reset. Financial assumptions exclude food, meals, payroll taxes and benefits, and unmodeled overnight labor. Source arithmetic/syntax tested; live graphic layout should still be inspected.

---

# Care with a Compass — The Director’s Desk · v10.7.6

**Live version:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.6&page=staff

**Optional planner redesign:** Replaced sprawling and repetitive tuition/expense screens with a compact, side-by-side live calculator. Essential inputs: enrollment, tuition, combined classroom staff pay and hours, rent, utilities, insurance, director salary and desired profit. Collapsed optional part-time, overnight, respite and payroll assumptions. Removed licensed-capacity input, county dropdown, food/meal expenses and income, vague miscellaneous expenses, and separate teacher/aide categories. Breakdown lists only explicit named cost components. The coverage simulator uses generic staff terminology, removes interpretive supervision dropdown, adds paid hours/week slider (40 default), moves cost inputs higher, and displays live coverage and weekly/monthly costs alongside inputs. Optional module still does not affect course progress or completion. Static source and arithmetic validation completed; independent graphical browser review outstanding.

---

# Care with a Compass — The Director’s Desk · v10.7.5

**Live preview:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.5

**Optional operations tool:** The Staffing & Tuition Planner is now clearly marked OPTIONAL at the bottom of the main navigation, with its explanatory lesson integrated into an expandable section on the same page. The former separate “What you will practice” lesson is not shown. The planner no longer contributes to the overall progress meter and is not required in the guided journey or certificate eligibility. Complete core progress now reaches 100% from six chapters, foundation capstone, simulations, evidence journal, and assessment. New clean defaults: one child attending and zero staff removed by interruption; saved planner selections are retained for learners who interacted with the tool. Learner reports accept Chapter 6, and the certificate lists all six chapters without treating optional staffing as required. Static JavaScript syntax and source consistency were checked; graphical browser verification remains necessary.

---

# Care with a Compass — The Director’s Desk · v10.7.4

**Live review:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.4

**Scenario-placement correction:** The parent inspection/recording scenario now appears in Chapter 3 (Licensing, Ratios & Daily Operations), rather than Chapter 6 (Fairness, Bias & Belonging). The unauthorized pickup scenario now belongs to Chapter 4; the fairness chapter has a new relevant case about selective surveillance of a Black child. The multiple-perspective exercises are explicitly mapped to their matching chapters, and the former Chapter 5 extra-lens rendering path was removed. Includes v10.7.3 single-navigation and concise progress-notice corrections. This is a source-level correction; independent live-browser and expert validation are still required.

---

# Care with a Compass — The Director’s Desk · v10.7.3

**Live preview:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.3

**Navigation cleanup:** Removed the redundant sidebar chapter submenu, upper chapter shortcut cards, and historical progress notice. The existing six-chapter navigation row inside the lesson area remains the single chapter selector, with keyboard-accessible direct navigation and no completion credit granted by opening a chapter. Other v10.7.2 fixes remain in place. JavaScript syntax checked; final visual and learner-pilot audits remain necessary.

---

# Care with a Compass — The Director’s Desk · v10.7.2

**Live preview:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.2

**Navigation and Chapter 6 fixes:** The main program and embedded course now expose direct links to all six chapters for testing; choosing a chapter does not mark it complete. Fixed the sixth chapter's undefined lesson symbol, removed an empty Director's field-guide card, and added an existing classroom photograph showing two children playing. Improved the awkward learning-chapters introduction, corrected the main displayed version and chapter-progress/report limits from five to six, and refreshed asset cache versions. Source syntax and navigation wiring were checked; live graphical/browser testing remains outstanding.

---

# Care with a Compass — The Director’s Desk · v10.7.0

**Live preview:** https://rstenlund1.github.io/care-with-a-compass/?v=10.7.0

**New in v10.7.0:** A sixth foundational chapter, **Fairness, Bias & Belonging**, examines racialized behavior labels, socioeconomic judgments, family language access, disability-related exclusion, consistent child-safety decisions, and disproportionality in incident reports. It includes 12 original questions, eight conditional question follow-ups, and a four-path, two-stage leadership scenario. Sources include the U.S. Department of Education Civil Rights Data Collection, Yale Child Study Center, Head Start 45 CFR §1302.17, California CDSS exclusion guidance, and DOJ disability-access guidance. The foundation now contains **six chapters, 84 applied questions, and 44 follow-ups**; earlier five-chapter progress is preserved, but Chapter 6 is required for current completion.

**One unified operations page:** The director's desired salary and separate business-profit goal appear first. Staffing decisions, coverage consequences, labor costs, county/area/actual rent overrides, overnight and respite revenue, expenses, break-even enrollment, and required tuition then appear in one scrollable page with no separate staffing-versus-budget tabs. Selected extra backup coverage can affect the monthly financial model without counting it twice if the director confirms it is already in regular payroll.

**Validation boundary:** Source data and JavaScript syntax have been checked, but no cohort, clinical or regulatory expert validation, screen-reader audit, full graphical browser regression, live forms check, or measured financial outcomes are claimed. Benchmarks are dated regional retail rent proxies, and the statewide fallback is an illustrative unweighted average, not a true child care lease survey. Verify current laws, rates, staffing, and learner outcomes before use.

**Adversarial review:** [docs/GEMINI_REVIEW_v10.7.0.txt](docs/GEMINI_REVIEW_v10.7.0.txt)

---

# Care with a Compass — The Director’s Desk · v10.6.0

**Live program:** https://rstenlund1.github.io/care-with-a-compass/?v=10.6.0

**New in v10.6.0:** A persistent overall training progress bar and integrated Staffing & Tuition Planner. The existing staffing-safety exercise remains intact. The financial tool separately models paid teachers, aides, desired director salary, and a business profit target; full-time, part-time, overnight-only and respite income; staffing taxes and benefits, rent, utilities, insurance, food and incidentals; target tuition and estimated break-even enrollment. Learners can use examples or retain their real scenario independently, select any California county, use square-footage rent estimates and a source-dated eight-region retail rent proxy, or override with their actual rent. **Financial data are examples, not audited facility averages or guaranteed tuition recommendations.** The statewide fallback is an unweighted regional planning estimate, not a published state series. The page reads the current JSON benchmark file at each load; external publisher updates currently require source verification and a JSON update. The calculator does not automatically scrape brokerage websites. Overnight supervision requirements vary by child care license type; the model assumes no extra overnight payroll only if appropriate paid coverage is already separately included.

**Testing completed:** Syntax, arithmetic, scenario switching, director salary separation, 58-county options, offline rent fallback, and guided control logic were programmatically checked. A real mobile/browser, screen-reader, live Formspree, and user usability test remain necessary before deployment.

**Independent review prompt:** [docs/GEMINI_REVIEW_v10.6.0.txt](docs/GEMINI_REVIEW_v10.6.0.txt)

---

# Care with a Compass — The Director’s Desk · v10.5.0

**Live program:** https://rstenlund1.github.io/care-with-a-compass/?v=10.5.0

**v10.5.0 correction release:** Safe-intake actions now actually reduce admitted children when an opening teacher calls out; coverage breaches are recorded once per uninterrupted episode, with explicit recovery when qualified staffing returns. Conditional branch answers are no longer uniformly identified by length (highest-scoring longest in 9 of 32). The full Consequence Lab can be completed in a separate browser tab and recognized by the main course through validated saved session results. Refined bruise/pickup handoffs, embedded display, runtime version labels and export names. **Academic prototype only:** regulatory/clinical review and human usability testing are still required.

---

## Historical release notes (v10.4.0 and earlier)

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
