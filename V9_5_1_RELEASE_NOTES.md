# Care with a Compass v9.5.1: Home and Start Over restored

## Correction
Version 9.5 consolidated training into one forward progression but accidentally hid the original chapter-engine **Home** and **Start Over** controls without replacing them in the surrounding program. This patch restores both controls prominently in the unified program header, across every section and on narrow screens.

## Behavior
- **Home** returns the learner to the program overview, saving all chapter, simulation, lesson, journal, and assessment progress. The single Start/Continue Training button resumes the next incomplete activity.
- **Start Over** presents a detailed confirmation **before** resetting anything. Cancel leaves all progress unchanged.
- Confirmed reset clears the current program's browser-local chapter record (`care-with-a-compass-supervisor-v72-72q`) and the applied simulation/assessment record (`cwc-v92-directors-day-state`) from localStorage and sessionStorage. It also replaces current in-memory state and shows the fresh overview with **Start Training**.
- If browser storage cannot be cleared, the control reports that the reset failed instead of displaying a false success.
- These controls are **utilities**, not competing lesson-path options; the chapter exercise still exposes only one primary Continue action. The integrated `chapters.html` component intentionally keeps its redundant internal toolbar hidden.
- A confirmed Start Over affects only this device/browser's saved training records. It does not delete exported reports or progress stored elsewhere.

## Verification
- The interactive program JavaScript passes syntax parsing.
- Functional simulated-browser checks verified persistent controls, Home progress preservation, cancel/no-op, confirmed chapter and simulation reset, fresh Start Training, blocked shortcuts after reset, and storage-failure messaging.
- Responsive CSS restores visibility of the utility controls on tablets and phones. Manual visual and screen-reader tests remain to be performed.
- The preceding sequential learning path, factual case afterwords, and accessible terminology explanations remain unchanged.

## Recovery
The pre-fix published state is preserved as `backup/v9.5-before-home-reset-restoration-20261113`.

No learner data was accessed or modified in the repository; the user controls act only in their own browser when clicked.
