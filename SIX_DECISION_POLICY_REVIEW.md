> Historical v10.8.0 review. For the current v10.9.1 version, see [SCENARIO_AUDIT_v10.9.1.md](SCENARIO_AUDIT_v10.9.1.md).

# Consequence Lab v10.8.0 — six-decision policy and QA brief

## Implemented
- Six decisions per case across all 11 scenarios (18 process points per case; 54 per three-case session).
- Operational substitute and resource-network decision for all non-transport cases.
- Existing transportation scenarios retain transport-specific contingency decisions.
- No staffing credit is awarded merely for a phone call, referral, social-media lead, or expected substitute.
- LocalStorage completion requires all three cases to finish six decisions without critical failure. Prior 12-step progress is not silently counted.
- The emergency-contact guidance includes a suggested two-contact policy, documented follow-up and no automatic disenrollment.

## Regulatory boundaries for review
1. California clearance/exemption, required facility association or approved transfer, role qualifications, and training must be verified before assigning or counting substitute personnel. A school substitute or Facebook recommendation is not automatically eligible. CDSS: https://www.cdss.ca.gov/inforesources/community-care/caregiver-background-check/background-check-process
2. Local child care resource-and-referral agencies may offer possible substitute leads, but a referral does not guarantee a qualified, available person on site. The program must independently verify eligibility, required clearances and actual arrival before relying on a substitute.
3. A nearby center cannot simply accept children or loan counted adults without licensing, authorization, staffing, and site-specific checks.
4. Two approved emergency contacts are a recommended provider policy, not claimed as a universal legal minimum. Unreachable parents never justify delaying emergency care. Contract termination/disenrollment must consider subsidy agreements, notice, disability accommodations, and civil-rights obligations; no automatic removal for one missed call.
5. Head Start bus-monitor requirements should not be presented as universal requirements for all California child care transportation programs.

## QA results and limitations
- Run: `node tests/six-decision-regression.cjs` — 14 tests passing in the build environment.
- Run: `python tools/qa_release.py` and `python tools/qa_branching.py` for unchanged curriculum data.
- Browser tests could not run: localhost navigation is blocked by the execution environment. Real browser testing, regulatory review and usability testing remain necessary before public operational release.
- The new six-decision flow selects six pivotal stages from each original 12-stage scenario; it is not a complete narrative rewrite of all 11 scenarios. Review continuity of each shortened story and transport case before pilot use.