# Care with a Compass: Consequence Lab v10.9.1
## Corrections to the independent all-answer audit · November 22, 2026

### Scope and outcome

All **12 scenarios × six visible decisions × five answers** remain active in both preschool-center and small-family-home atlas modes. The full engine sweep exercises **400 complete six-decision playthroughs** across eight facility/age-mix configurations and **12,000 answer applications**. The regenerated `SCENARIO_ANSWER_ATLAS_v10.9.1.csv` separately reports each answer's static flag **and the critical-failure result produced by actually executing the decision in JavaScript**. In the two exported configurations, 116 of 720 evaluated answers trigger a modeled critical failure, and no 3-point preferred answer causes one.

The 2026 six-decision score remains **18 per case, 54 across three cases**. Three cases must be completed without critical failure for credit; the current storage key is `cwc-consequence-lab-v10.9.1`.

### Defect ledger and disposition

| Audit finding | v10.9.1 disposition |
| --- | --- |
| Substitute D5 accepts an unverified sole caregiver without critical failure | **Fixed.** The answer explicitly places children in that person's care, and the engine triggers a critical failure. |
| Fight/bruise D4 assigns a child or room to an unverified visitor | **Fixed.** Explicit sole supervision by an unverified visitor now triggers a critical failure, even if total adult headcount appears sufficient. |
| Arm D4 sends a counted teacher to the hospital without checking coverage | **Condition-based fix.** A teacher's departure changes actual staffing. If it causes a staffing breach, the case ends immediately. If the remaining qualified teacher can still safely cover the licensed group (for example, 12 preschool children with 2 adults dropping to 1), the response scores 0 but is not falsely labeled an automatic loss of supervision. The instructor should also check sight-and-sound supervision and individual needs, which a simple ratio cannot establish. |
| Impaired pickup D1/D3 permits dangerous departure but not critical failure | **Fixed and clarified.** The zero-point choices now explicitly *encourage* an apparently impaired adult to drive off with the child **without taking available protective steps**; these trigger modeled critical failure. The preferred choice offers safe transport/authorized alternatives, de-escalates, and seeks law-enforcement help for imminent danger. It does **not** instruct staff to physically detain a legal parent or assume that suspicion nullifies custody rights. |
| Singular/plural `1 adults` / `1 qualified supervising adults` | **Fixed.** The visible prompts and model alerts conditionally use `adult` and `teacher` for singular values. |
| Solo-provider home references a separate director/employee | **Fixed.** Selected answers now tell the sole provider to remain with the children, speak directly with families, vet prospective relief, and use delayed admission or verified pickups. No nonexistent employee is assigned. |
| Substitute D2 combines center and home legal requirements in one unusually long preferred answer | **Fixed.** Home mode cites HSC §1597.63 and center mode separately explains teacher qualifications, clearance/association and arrival. |
| Double spaces in small-home scene transitions | **Fixed** in scenario composition. |
| Preferred answers are usually the longest in the substitute scenario | **Reduced cueing.** Wording was tightened without removing the staff-verification, authorized handoff or family-policy safeguards. The longest answer is now preferred in 6/12 home/center substitute decision blocks rather than 12/12 in the pre-fix source. |
| Parent course links to old 12-decision lab | **New defect fixed.** `js/v92-app.js` now embeds `consequence-lab.html?v=10.9.1`, not the archived v10.7.21 simulator. The pop-out link uses the current file. |
| Prior-version `random=true` completion flag may grant credit without current completion | **New defect fixed.** The main course reconciles cached random-lab credit against the **current** version's finished, nonfailed three-case record. Guided-simulation completion remains a separate alternative pathway. |

### Legal and educational guardrails

**Family child care substitutes.** California HSC §1597.63, enacted and amended in 2026, governs occasional temporary licensee absences: an eligible substitute adult; clearance or exemption; requisite health-and-safety training including pediatric CPR, first aid and preventive health; immunizations; written notice to parents in advance or by the next business day if an emergency prevents advance notice; documentation; and ordinarily no more than **20% of the home's care hours in a calendar month**, unless CDSS determines otherwise. Older 22 CCR §102417(a) material still states **20% per day**, so use the newer statute and check current CDSS guidance before making an operational staffing decision. Neither approval as a resource/foster parent nor a school substitute certificate alone proves current child care role eligibility.

**Child care centers.** Center personnel and background-association requirements differ from family-home substitute provisions. Staff qualifications, actual presence, ratios and sight-and-sound supervision all matter. A staffing-agency promise, Facebook referral or subsidizing-agency lead is never an adult physically at the facility. The numerical model cannot determine licensing compliance by itself.

**Impaired pickup.** Staff should offer a safe alternative, calmly intervene, document observations and contact law enforcement when imminent danger warrants it. They should not physically restrain or automatically refuse a legal parent without considering actual custody authority, applicable law and the immediate facts. The scenario reserves terminal failure for *affirmatively encouraging dangerous driving without a protective response*, not for an adult's refusal to cooperate with staff.

**Emergency contacts and enrollment.** Two approved emergency contacts are a provider-policy recommendation, not a universal numeric legal minimum. A single unanswered call never justifies automatic disenrollment, and later contract decisions may implicate subsidies, disability accommodation, civil rights, written notice, and individual family circumstances.

**Transport monitor.** Required-monitor decisions are framed as the written program/contract rule, not a universal California requirement for every child care route.

Key publicly available references:
- [California HSC §1597.63 (2026)](https://gocodebook.com/library/us/ca/ca-hsc/sections/1597.63)
- [CDSS Child Care Provider Information Notices (including PIN 26-11-CCP)](https://cdss.ca.gov/inforesources/community-care-licensing/policy/provider-information-notices/child-care)
- [22 CCR §102417 (older 20%-per-day text)](https://regulations.justia.com/states/california/title-22/division-12/chapter-3/article-6/section-102417/)
- [22 CCR §101216: center personnel](https://www.law.cornell.edu/regulations/california/22-CCR-101216)
- [Child Care Law Center: who may pick up a child](https://www.childcarelaw.org/content/know-the-law-about-who-may-pick-up-a-child-from-child-care-in-california/)

### Executed checks

| Command | Result |
| --- | --- |
| `node tests/six-decision-regression.cjs` | PASS: 400 six-decision playthroughs, 12,000 option evaluations, 11 original targeted tests, and 15 new targeted tests |
| `python tests/browser_six_decisions.py` | PASS: 96 real Chromium DOM checks, including 90 clicked decisions, full three-case scoring, critical-failure display, and responsive 1440/768/390/320-pixel layouts |
| `python tools/qa_release.py` | PASS: 84 assessment questions, six chapters, branching JSON/JS parity, JavaScript syntax |
| `node tools/export_scenario_answer_atlas.cjs` | PASS: 720 current answer rows, each independently applied to the actual JavaScript engine and recorded with its observed critical-failure outcome |
| Main-course iframe source and completion keys | PASS: static/integration assertions in `tests/audit-fixes-regression.cjs` |
| `python tests/browser_course_integration.py` | **NOT EXECUTED SUCCESSFULLY HERE**: the sandbox blocks localhost navigation with `net::ERR_BLOCKED_BY_ADMINISTRATOR`; the script is included for a normal local/browser test environment |

### Release limitations

The Chromium lab tests use the *actual lab HTML/JavaScript/CSS* with in-memory page rendering; they are not a deployed GitHub Pages or live cross-frame test. Formspree delivery, live-storage syncing across separate tabs, screen-reader workflows, and real operating-license compliance have not been independently certified. For a supervised academic demonstration the version is mechanically well tested; for unsupervised practice with real providers, independent California licensing and pediatric/safeguarding review is still warranted.

**Deployment:** This packaged source is the reviewed v10.9.1 candidate. The live site has not been updated by these local fixes.