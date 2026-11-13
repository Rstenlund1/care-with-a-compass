# Care with a Compass v9.3.0 — Unified Supervisor Leadership Program

## Release scope
Version 9.3 consolidates the five-chapter leadership course and v9.2 applied simulation studio into **one public homepage, one supervisor/director audience, and one navigation system**. It does **not** add a separate caregiver course.

**Main entry point:** `index.html`  
**Chapter component:** `chapters.html`  
**Applied-simulation engine:** `js/v92-app.js` and `js/v92-data.js` (reused, upgraded to v9.3 product metadata)  
**Learning-chapter engine:** `js/app.js`, `js/data.js`, `js/branching.js`, `js/question-followups.js`, and `js/concepts.js`

## Integrated learning path
1. **Five learning chapters:** The existing 72-question supervisory course, 36 anchored question follow-ups, five two-stage chapter decision labs, adaptive practice supports, and original four-stage reflection capstone.
2. **Long-form application:** Three connected Director's Day cases totaling 16 decisions and seven authored starting-condition variants, plus staffing resilience and evidence classification labs.
3. **Competency-assessment demonstration:** Five diagnostic vignettes (20 points), a new five-stage cascading assessment case (70 points), and a facilitator-scored 30-day workplace transfer plan (10 points). The three proposed mastery gates remain 90/100, at least 4/5 on each diagnostic objective, and no unresolved critical safety errors.

The same case can illustrate a caregiver's actions and a director's additional responsibilities, but the **learner role is always an aspiring or practicing supervisor/director**.

## Technical integration
- `index.html` is the primary page for all navigation.
- The existing five-chapter course is displayed within a same-origin, titled embedded chapter component. This is an engineering boundary to avoid destabilizing an already working question/remediation engine, not a separate program or audience.
- The new program dashboard reads the existing chapter progress record from the original localStorage key and displays completed chapters.
- Both engines retain their existing localStorage keys, so upgrading does not erase chapter questions, reflections, scenario choices, or assessment work.
- The embedded chapter view reports its height to its parent so it can expand without imposing an independent miniature scroll area. The parent verifies the message source.
- Chapter-level links to longer case simulations return to the unified homepage using `target="_top"` and scenario deep links.
- Prior `director-desk.html?case=...` URLs now redirect to the unified homepage, preserving case and tab query parameters.
- The original standalone offline file remains an archived older edition, not the v9.3 release.

## Reviewed against Gemini's v9.2 observations
- The original v9.2 deterministic cases, stateful decision consequences, human-entered transfer-plan review, staffing lab, evidence journal, and three-gate assessment structure remain available.
- New version labels and deep-link destinations have been aligned with the unified homepage.
- The simulator's case scripts remain authored content. There is no live AI-generated legal advice.
- The Facilitator Review screen remains **an unauthenticated local prototype**, not a secure multi-user instructor portal. Browser-entered facilitator scores are for demonstration only and must not be treated as verified independent review.
- The new assessment remains a **proposed** pilot instrument requiring expert regulatory review, scoring validation, and controlled administration before any official competency award.

## QA performed
- Both JavaScript applications pass syntax compilation.
- Automated mock-browser checks verify that the unified homepage loads, the single navigation offers all sections, historical chapter progress is visible, the chapter iframe is present, and chapter/case deep links work.
- Scenario choices persist in local state; the assessment still loads; legacy case URLs redirect correctly.
- The integration passed 14 of 14 targeted navigation and backward-compatibility checks.
- **Not yet verified:** Manual browser rendering/accessibility, screen-reader behavior across the embedded chapter frame, cross-browser support, specialist California regulatory review, and real pilot efficacy.

## Recovery
- v8.6.0 baseline: `backup/v8.6.0-before-v9.2-20261113`
- v9.2.0 baseline: `backup/v9.2-before-unified-tracks-20261113`
- v9.3 development branch: `feature/v9.3-one-supervisor-program`

The v9.3 release updates only the public learning portal and the associated curriculum wiring. No learner progress data was migrated off-device or uploaded to a server.
