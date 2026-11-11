# Gemini v7.0 defects reconciled in v7.1

1. The capstone had arbitrary score codes assigning partial credit to abandoning children unsupervised, public accusations, and mass firing. Replaced all four capstone sets; every option now carries its own explicit level and response feedback, with varied key placement.
2. C1Q11 accidentally retained `multi: true` and `answerSet` from its previous incarnation. Replaced it with a coherent four-answer multi-select and correct feedback.
3. Chapter 3 contained a retired subsidy/50% paragraph. Replaced with continuity-of-operations content and removed the residual CHS link.
4. Two lens items used wrong keys. They now use `showLens()` and the data-provided `employee`/`supervisor` fields.
5. Generic feedback in the four reworked questions and 12 new questions was replaced with response-specific explanations.
6. Dynamic UI question counts and non-clickable academic citations are restored.
7. Additional regression prevention: version-scoped local progress, riskier pickup option no longer marked acceptable, capstone branches reflect prior decision quality, and a shipped QA regression test.

This is still a supervisor-training demonstration. Relevant real-world decisions require current CDSS/CCL procedures and a human review.
