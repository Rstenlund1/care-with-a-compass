# Care with a Compass v9.5.0: One Linear Learning Journey

## The issue corrected
In the previous version, the original chapter lesson displayed two competing buttons: **"Try a supervisory situation"** and **"Practice the longer supervisor case."** The second button let learners leave the foundations before completing the chapter decisions and capstone. The sidebar and direct URLs also permitted jumping ahead.

## The v9.5 learner path
1. The public homepage offers **one primary Start Training** button, renamed **Continue Training** when learner progress is detected.
2. Each of the **five existing leadership chapters** begins with its original learning lesson. The learner follows one sequence: lesson, applied questions and the chapter's two-stage branching lab, reflection, and the next chapter. No longer-form case button interrupts the chapter.
3. After the original **four-stage capstone**, the integrated chapter view offers **one next step** into the first long-form case.
4. The three long-form cases are presented in order, each with its own substantive lesson, connected decisions, after-action review, privacy-conscious real-world reveal, and **one Continue button**:
   - *The Pickup That Became a Crisis*
   - *After the Ambulance Leaves*
   - *A Schedule That Cannot Bend*
5. The learner proceeds to the **Staffing Resilience Lab**, which requires interacting with a plan or disruption before its Continue button is enabled.
6. The learner then completes the **Evidence Journal**. After all six facts are classified and reviewed, the journal displays one Continue action to the next lesson.
7. The final learning stage is the **Competency Assessment** (20-point diagnostics, 70-point applied capstone, and 10-point facilitator-reviewed transfer plan). Submission proceeds to the Facilitator Review lesson and human scoring.

## How navigation works
- The sidebar is now a **progress indicator**, not a set of shortcuts. Future sections are shown as unavailable until prerequisites are completed.
- Completed sections may be revisited, and the underlying chapter, case, and assessment records remain stored under their original local keys.
- An old bookmark such as `?page=cases&case=hospital` cannot skip unfinished lessons or earlier cases.
- Optional case replays, downloads, and lesson reviews are grouped separately from the primary Continue action.
- The redundant inner Home/Start Over toolbar is hidden when the original chapter engine is embedded in the unified program.
- The chapter reflection step now displays **Compare with a director response** first, then replaces it with **Save and continue** once feedback is reviewed, rather than presenting two competing buttons.

## Features preserved
The original 72 supervisory questions, 36 follow-ups, five chapter labs, adaptive scaffolding, contextual vocabulary help, and four-stage capstone are unchanged in substance. The v9.4 serious pre-module lessons, 23 definitions, real-case disclosures after completing scenarios, three long-form simulations, staffing and evidence labs, and demonstration-only facilitator scoring are preserved.

This is **one training program for new and aspiring child care supervisors and directors**, not separate caregiver and supervisor tracks.

## QA
- Both JavaScript applications pass syntax checking.
- 26 targeted interactive-flow checks passed, covering first entry, blocked shortcuts, preserved chapter completion, ordered cases and real-world notes, the staffing prerequisite, the evidence review gate, and the assessment lesson.
- The public homepage, data bank, CSS, and embedded chapter application were versioned for cache refresh.
- Manual cross-browser/screen-reader testing, expert California legal review, and real-pilot validation remain outstanding.

## Recovery
The previous published version remains on `backup/v9.4-before-linear-flow-20261113`. The source release was assembled and tested on `feature/v9.5-linear-flow` before publication.
