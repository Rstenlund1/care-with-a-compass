# Care with a Compass v7.2 — consequence-driven branching design

The two source files for branch data are `data/branching.json` (authoritative, human-readable) and `js/branching.js` (browser-readable, generated from the JSON by `tools/build_branching_js.py`). Branch data loads before `js/app.js` and is embedded in the fully offline single-file build.

## Branch behavior

**Chapter decision labs:** For every Chapter 1–5 lab, each of its **four initial decisions** leads to a different second-stage scenario, question, four answer choices, and feedback. There are **20 distinct follow-up situations**, including consequences of the preferred decision. A first decision can be changed while exploring the lab; its second-stage selection resets correctly.

**Four-stage capstone:** The opening emergency question has four options. At stages 2, 3, and 4, the learner receives one of **four complete, different scenarios and option sets** based on the exact prior choice, for **12 distinct later-stage scenes**. Responses are scored from the actual selected branch options rather than a separate matrix. The retrospective reconstructs the actual sequence and individual feedback for the route the learner took. This is a branching DAG, not an open-ended generative simulation; paths can converge by design.

## Instructional challenge

The successful Stage 3 mandated-reporting path deliberately leads to an **unverified counter-allegation** in Stage 4. This does not imply retaliation always occurs, and it does not undermine the original reporting obligation. Learners must document, cooperate with licensing, protect confidentiality, maintain interim child safeguards, and support staff who report in good faith.

## Invariants

- The 72-question bank, original chapter lessons, course citations, scoring schema, images, and question editor are unchanged from v7.1.
- The application stores progress under a new v7.2 storage key, so incomplete v7.1 capstone selections cannot be interpreted against new branch choices.
- Every branch has four graded options with exactly one `2` (strongest), one `1` (defensible with conditions), and two `0` (review). No unsafe choice receives partial credit.
- The script is offline and does not use AI inference or network requests.
- A certificate records completion of guided practice, *not* an independent competence credential.

## Editing

Update `data/branching.json`, run `python tools/build_branching_js.py` and `python tools/build_standalone.py`, then `python tools/qa_release.py`. Branches are stored outside the question editor: that editor still manages only the 72 question-bank items, not branch scenarios.
