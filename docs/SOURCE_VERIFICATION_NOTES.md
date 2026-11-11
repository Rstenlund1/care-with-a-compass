# Source verification notes — release candidate

## Pathways LA subsidy co-payments
The user's reported newer process is that Pathways LA collects parent co-payments and passes funds through to providers. As of the review on 2026-11-10, the agency’s publicly accessible provider-payments and parent FAQ pages still state that co-payments (the difference above the Regional Market Rate ceiling) are paid directly to the provider, while **family fees** are a distinct category. This claim has **not** been incorporated as a course fact pending current written confirmation from Pathways LA.

Official sources: https://pathwaysla.org/for-providers/provider-payments/ and https://pathwaysla.org/for-parents/faq-forms/

## Infant ratio correction
22 CCR § 101416.5(b)(1) permits qualified aides as substitutions only with a fully qualified teacher supervising no more than 12 infants AND each aide directly supervising no more than four infants. The review's claim that one teacher plus one aide may cover 12 infants is incorrect. Subsection (c) concerns directors counting in ratio; subsection (d) has a separate sleeping-infant provision.
Source: https://www.law.cornell.edu/regulations/california/22-CCR-101416.5

## Scope
This release incorporates a technical and content audit but is not a legal opinion. The source map is provided for additional verification of fact-specific reporting duties.

## v7.1 Gemini reconciliation
The retired 50% reimbursement paragraph was removed from Chapter 3, the unpublished exceptional-needs URL removed, and academic references in the Sources drawer are non-clickable. C1Q11 is again a genuine multiple-select item, and capstone score levels are embedded in each exact response. Branch consequences now vary with the previous decision. The complete release is verified with `tools/qa_release.py`.
