# Care with a Compass v7.2 — Test and release notes

**Release:** 2026-11-10. Baseline: audited v7.1. Tests were run on the newly generated v7.2 files, not inferred from v7.1.

## Automated source validation

- 72 assessed questions across five chapters: 12/14/18/14/14; 8 select-all questions.
- Original question keys and qualitative feedback are unchanged from v7.1. Python schema tests confirm unique IDs, answer/feedback parity, valid sources, forbidden retired subsidy language absent, and editable data parity.
- `data/branching.json` contains 20 distinct lab branches and 12 distinct later-stage capstone branches. Every one of the 32 paths has distinct context and graded choices. Every scene has 4 answers graded 0, 0, 1, 2. The new runtime grades from the selected scene's embedded option score, avoiding a separate grading matrix.
- JavaScript syntax passed for the app, question data, and new branching data.
- Standalone HTML contains all 14 inline WebP photographs, all scripts and CSS, and no external application dependencies.

## Actual Chromium browser exercise

Ran Chromium using an inline copy of the generated standalone HTML, since the managed test environment blocks local `file://` navigation (`net::ERR_BLOCKED_BY_ADMINISTRATOR`). This test **does not prove that the modular folder version loaded over `file://`**, though file names and syntax are checked separately.

- For every chapter lab, the four distinct initial choices revealed four **different** follow-up situations and sets of options; stage-two answer click produced feedback.
- For the capstone at stages 2–4, each of four incoming prior-choice states revealed a different scenario, choices, and clickable graded feedback.
- Exhaustively evaluated all **256 possible four-choice capstone decision sequences**, ensuring each selected branch offers four choices, grades to 0/1/2, and generates four retrospective cards.
- Completed the full best-choice capstone route (step 1 C, then 2 A, then 3 A, then 4 A). The correct mandated report leads to an unexpected unverified complaint, and the completed retrospective reflects all four actual scenes.
- Verified 72 original items still yield score 2 for their correct key. Eight select-all items were preserved.
- Mobile 390×844 viewport displayed without horizontal page overflow, and no uncaught JavaScript page errors were logged in the test sessions.
- Tested switching a chapter lab's first decision after selecting a follow-up: the previous follow-up selection correctly resets.

## Limitations / remaining human review

- A professional should still review all newly drafted branching narratives and current California reporting/licensing law before offering the academy as authoritative staff training. Automated tests cannot certify legal correctness or pedagogical validity.
- Native OS print dialogs, assistive technology on actual user devices, and all combinations of browser versions were not tested. Certificate printing behavior retains the v7.1 implementation.
- Branches are **authored decision trees**. The next situation depends on the previous selected choice, and different choices can eventually converge. The course does not invent novel scenes using an AI model, does not continuously simulate time, and does not model all possible real-world consequences.
