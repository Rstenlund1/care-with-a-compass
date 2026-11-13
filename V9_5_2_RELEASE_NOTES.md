# Care with a Compass v9.5.2 — Open Navigation, Guided Learning

## What changed
All seven sidebar sections are now available immediately: Program overview, Learning chapters, Applied simulations, Staffing Lab, Evidence Journal, Competency assessment, and Facilitator review.

This corrects v9.5's over-restrictive navigation for instructors and academic reviewers. Reviewers such as Dr. Hannah can preview the full instructional design without completing the preceding chapters first.

## What stays guided
- The homepage still shows one Start Training / Continue Training action.
- This action uses the existing progress checks to resume the next required learning activity.
- Every new applied simulation, lab, and assessment still starts with its own substantial introductory lesson, complete with contextual terminology help.
- The three long-form cases still offer the natural Continue progression and an after-action real-world note.
- Home and Start Over remain persistently available in the header.

## Preview integrity
- Opening a sidebar section does **not** automatically mark chapters, cases, evidence, or assessment work complete.
- The Facilitator Review page can be previewed before a learner submits an assessment. It first presents the learning lesson and then a **read-only** display of the scoring rubric and three proposed mastery gates. Live transfer scoring remains unavailable until assessment submission.
- Direct URLs to later modules also work for demonstrations, and the lesson-first behavior is retained.
- The normal assessment remains a proposed pilot competency demonstration, not a credential or validated instrument.

## Technical notes
- `js/v92-app.js` removes section-gating logic in `canOpen()` and case-gating logic in `canOpenCase()`, while keeping `nextRequired()` for the optional guided progression.
- Navigational links now render as accessible buttons with correct current-page labels and no disabled states.
- `index.html` cache strings were advanced to v9.5.2.
- The original five-chapter questions, 36 follow-ups, existing state keys, case content, evidence lab, and assessment criteria remain unchanged.

## Tests
Automated interaction checks confirmed access to all seven sidebar pages with no prerequisites; navigation without completion side effects; the facilitator rubric preview; case and assessment deep links; and the original guided Start Training route.
JavaScript syntax passed. Manual browser, mobile accessibility, and screen reader testing remain outstanding.

## Recovery
`backup/v9.5.1-before-open-navigation-20261113` is the pre-change snapshot.
