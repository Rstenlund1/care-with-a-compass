# Care with a Compass — v7.2 consequence-driven academy

**To launch:** Open `index.html` with folders intact, or use `Care_with_a_Compass_Standalone_Offline.html` as a single-file offline course. This is a K-State adult-learning project, not an accredited certification.

**What's new in v7.2:** The five two-stage chapter labs now have 20 genuinely different follow-up situations: each initial choice changes the next scenario, available decisions, and feedback. The four-stage capstone now has 12 alternate later-stage scenes determined by the exact prior decision, and a personalized decision-trail retrospective. A correct child-protection report can lead to an unverified subsequent complaint, teaching leadership beyond the initial correct answer. Perspective labels are also clarified.

**Source of truth:** `data/questions.json` for the 72 assessed questions; `data/branching.json` for the dynamic decision labs and capstone; `js/app.js` for application logic; `css/styles.css` for styling. `js/data.js` and `js/branching.js` are generated browser assets. Do not edit the generated copies independently.

**Editable:** `Question_Editor.html` can import and edit the 72 question-bank items and export replacement `questions.json`/`data.js`. It does **not** edit branching scenes, lessons, or the capstone. See `docs/BRANCHING_V72_MAP.md` for editing branch data.

**Build and verify:** Run `python tools/build_data_js.py`, `python tools/build_branching_js.py`, `python tools/build_standalone.py`, and `python tools/qa_release.py`. Use `node --check js/app.js` as an extra syntax check. The standalone and modular versions should be rebuilt together.

**Safety and scope:** Fictionalized California child care center scenarios; reporting obligations, facility policies, and professional discretion should be reviewed against current authoritative law. Academic references may be non-clickable. Child-protection reporting and Community Care Licensing notices are separate processes. This course is not mandated-reporter certification, legal advice, or proof of competence.
