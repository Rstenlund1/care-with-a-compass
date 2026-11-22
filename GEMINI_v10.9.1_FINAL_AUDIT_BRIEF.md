# Gemini adversarial QA brief: Care with a Compass v10.9.1

Read `SCENARIO_AUDIT_v10.9.1.md` and `SCENARIO_ANSWER_ATLAS_v10.9.1.csv`, then independently inspect the *current* `consequence-lab.html` and `js/v92-app.js`.

## Mandatory verification

1. Execute `node tests/six-decision-regression.cjs` and `python tools/qa_release.py`; do not present a Python port as though it ran the JavaScript engine.
2. Execute `python tests/browser_six_decisions.py` in an environment with Chromium and Playwright. If possible, also run `python tests/browser_course_integration.py` against its ephemeral local HTTP server; disclose blocked navigation honestly.
3. Re-examine **all 12 scenarios × six decisions × five answers**, including both center and home license modes. Check that feedback matches the option, clinical/supervisory stakes are plausible, and no step references an unvisited earlier decision.
4. Apply adversarial choices to test exact critical-failure semantics: visitor left alone with a child; unverified foster/resource parent; qualified teacher departure at both 12:2 and 18:2 preschool counts; authorized but visibly impaired parent; no reachable emergency contacts; and failed cases not earning lab completion.
5. Verify the updated 2026 HSC §1597.63 and CDSS PIN 26-11-CCP against any older Title 22 §102417 20%-per-day text. Do not collapse center and family-home staffing rules or assume school/foster background clearance is automatic qualification.
6. Inspect `js/v92-app.js` iframe path, completion storage/version key, cross-tab events and retired saved progress. Observe whether the current course, not just the standalone lab, really presents six decisions.
7. Check small-home singular/plural wording, sole-provider options, answer-length cueing and live first-aid/privacy links.

Report every reproducible defect with scenario, license mode, decision number, selected choice, actual result, expected result, and regulation/source when applicable. Distinguish a confirmed bug from a design preference or a question that requires a lawyer/CCL reviewer. Do not claim a browser test passed unless a browser was actually used.