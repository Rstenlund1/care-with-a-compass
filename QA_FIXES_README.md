# Care with a Compass — QA corrections (2026-11-22)

## Changes
- Consequence Lab: explicit critical failure for supervision abandonment and unsafe transport departure; privacy and records errors are not automatically treated as abandonment.
- Sole-provider staffingGap retains the one qualified provider rather than dropping attendance to zero.
- Staffing controls cannot increase qualified adults above the session starting count; noncompliant adjustments cause critical failure.
- Embedded completion requires three complete 12-decision reports without critical failures, consistent with standalone completion.
- Canonical JSON synchronized with the current JavaScript question and branching sources (84 questions, 6 chapters, 36 scenes).
- Updated release QA scripts and learner-services version.
- Added tests/consequence-regression.cjs for actual JavaScript engine regression testing.

## Executed on the prepared source package
- python tools/qa_release.py — PASS
- python tools/qa_branching.py — PASS
- node tests/consequence-regression.cjs — 24 PASS

## Verification still required
- Browser/Playwright execution against the deployed site: attempted in the local environment but Chromium navigation was blocked by administrator policy.
- Independent clinical and regulatory review, particularly transport monitoring.
- Verify cross-tab and iframe completion behavior in an unrestricted browser.

Run the above checks from the repository root before releasing further updates.
