Care with a Compass v7.2 — Gemini-Readable Source Code and Curriculum
=====================================================================================

AUDIT INSTRUCTIONS: The text below provides complete current-source files for the v7.2 branching release.
Evaluate current files as v7.2, not older versions. Prior v6.7, v6.8, and v7.0 findings do NOT automatically carry forward.
Confirm that scenario branches are genuinely state-dependent, that answer ratings match the actual text, and that current California legal requirements are distinguished from facility procedures.
Photos are omitted as binary files; all photo keys are in app.js and physical assets are included in the modular ZIP.
Do not restore the retired 50% subsidy-adjustment material.


================================== BEGIN README.md ==================================
# Care with a Compass — v7.2 consequence-driven academy

**To launch:** Open `index.html` with folders intact, or use `Care_with_a_Compass_Standalone_Offline.html` as a single-file offline course. This is a K-State adult-learning project, not an accredited certification.

**What's new in v7.2:** The five two-stage chapter labs now have 20 genuinely different follow-up situations: each initial choice changes the next scenario, available decisions, and feedback. The four-stage capstone now has 12 alternate later-stage scenes determined by the exact prior decision, and a personalized decision-trail retrospective. A correct child-protection report can lead to an unverified subsequent complaint, teaching leadership beyond the initial correct answer. Perspective labels are also clarified.

**Source of truth:** `data/questions.json` for the 72 assessed questions; `data/branching.json` for the dynamic decision labs and capstone; `js/app.js` for application logic; `css/styles.css` for styling. `js/data.js` and `js/branching.js` are generated browser assets. Do not edit the generated copies independently.

**Editable:** `Question_Editor.html` can import and edit the 72 question-bank items and export replacement `questions.json`/`data.js`. It does **not** edit branching scenes, lessons, or the capstone. See `docs/BRANCHING_V72_MAP.md` for editing branch data.

**Build and verify:** Run `python tools/build_data_js.py`, `python tools/build_branching_js.py`, `python tools/build_standalone.py`, and `python tools/qa_release.py`. Use `node --check js/app.js` as an extra syntax check. The standalone and modular versions should be rebuilt together.

**Safety and scope:** Fictionalized California child care center scenarios; reporting obligations, facility policies, and professional discretion should be reviewed against current authoritative law. Academic references may be non-clickable. Child-protection reporting and Community Care Licensing notices are separate processes. This course is not mandated-reporter certification, legal advice, or proof of competence.

================================== END README.md ==================================

================================== BEGIN docs/BRANCHING_V72_MAP.md ==================================
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

================================== END docs/BRANCHING_V72_MAP.md ==================================

================================== BEGIN docs/QA_V72_RELEASE.md ==================================
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

================================== END docs/QA_V72_RELEASE.md ==================================

================================== BEGIN docs/SOURCE_VERIFICATION_NOTES.md ==================================
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

================================== END docs/SOURCE_VERIFICATION_NOTES.md ==================================

================================== BEGIN data/questions.json ==================================
{
  "questions": [
    {
      "id": "C1Q01",
      "chapter": 1,
      "objective": 1,
      "scenario": "You overhear a caregiver saying, “I hate that child. I cannot stand when she is here.” There is no known allegation of mistreatment. As director, what do you do first?",
      "choices": [
        "Arrange safe coverage while you promptly assess the statement, the employee’s conduct and the child’s experience.",
        "Meet privately after the shift to explore possible burnout, while allowing current assignments to continue.",
        "Remove the employee from this classroom immediately and send a final disciplinary notice before hearing their account.",
        "Increase random classroom observations and address the comment only if an additional complaint appears.",
        "Ask the employee to apologize to the group, then document the apology as evidence that the issue is resolved."
      ],
      "answer": "A",
      "rationale": "A concerning statement calls for an immediate safety assessment and fair, documented follow-up. A statement is not automatically proof of mistreatment; inability or unwillingness to provide respectful care may justify further action.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "A concerning statement calls for an immediate safety assessment and fair, documented follow-up. A statement is not automatically proof of mistreatment; inability or unwillingness to provide respectful care may justify further action."
        },
        "B": {
          "type": "review",
          "text": "Waiting until the shift ends leaves the child with an adult whose immediate fitness for this assignment has not been assessed."
        },
        "C": {
          "type": "review",
          "text": "Temporary reassignment can be appropriate, but final discipline without an informed review bypasses basic fairness."
        },
        "D": {
          "type": "review",
          "text": "Indirect monitoring does not replace responding to a concrete statement about a child."
        },
        "E": {
          "type": "review",
          "text": "An apology does not establish whether current supervision is safe or whether there has been mistreatment."
        }
      },
      "family": "c1-o1",
      "acceptable": {},
      "refs": [
        "naeyc",
        "employment"
      ]
    },
    {
      "id": "C1Q02",
      "chapter": 1,
      "objective": 1,
      "scenario": "A newly hired aide has recorded inaccurate arrival times on three mornings. The lead teacher blames carelessness, but the aide says different staff taught different procedures. Which actions belong in the director’s response? Select ALL that apply.",
      "choices": [
        "Correct the attendance records using verified times, and establish whether required supervision was actually maintained.",
        "Keep the entries unchanged until the monthly audit, when staff can consider the errors together.",
        "Observe the check-in process, demonstrate the approved steps, and have the aide practice an accurate entry.",
        "Assign the lead teacher to maintain every attendance record permanently, without revisiting the aide’s training.",
        "Record the coaching, name a follow-up reviewer, and check the next entries for accuracy and consistency."
      ],
      "answer": "A|C|E",
      "answerSet": [
        "A",
        "C",
        "E"
      ],
      "multi": true,
      "rationale": "Accurate attendance records, verified supervision, and teach-back belong together. A supervisor should correct the immediate documentation problem while checking whether inconsistent instruction contributed to the error.",
      "feedback": {
        "A": {
          "type": "preferred",
          "tag": "c1-o1",
          "text": "Records should reflect verified attendance, not assumptions. Check actual coverage as well as the form."
        },
        "B": {
          "type": "review",
          "tag": "c1-o1",
          "text": "Leaving known inaccurate records unchanged can conceal a supervision or compliance problem. Make supported corrections promptly."
        },
        "C": {
          "type": "preferred",
          "tag": "c1-o1",
          "text": "Observing the actual process and using teach-back reveals whether the aide understands one consistent procedure."
        },
        "D": {
          "type": "review",
          "tag": "c1-o1",
          "text": "Permanent reassignment may disguise the training gap instead of helping the aide learn their assigned task."
        },
        "E": {
          "type": "preferred",
          "tag": "c1-o1",
          "text": "Follow-up checks establish whether coaching transferred to the next real attendance handoffs."
        }
      },
      "family": "c1-o1",
      "acceptable": {},
      "refs": [
        "ratio",
        "daffron",
        "knowles"
      ]
    },
    {
      "id": "C1Q03",
      "chapter": 1,
      "objective": 2,
      "scenario": "Two senior caregivers refuse to speak to one another after a disagreement about classroom routines. The handoff log is missing medication updates. How do you intervene?",
      "choices": [
        "Temporarily move medication responsibilities to the senior worker and revisit the communication procedure next month.",
        "Tell each shift to keep separate medication logs so neither worker has to communicate directly with the other.",
        "Secure medication information now, then establish a verified handoff and address the staff conflict privately.",
        "Assign a neutral colleague to relay medication details for a week while you schedule a mediation session.",
        "Meet with both employees at the next team meeting and require them to agree on how to exchange information."
      ],
      "answer": "C",
      "rationale": "Secure the child-critical task first, then address the conflict through a structured, fair performance response.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Seniority is not an adequate basis for assigning medication responsibility or tolerating an unresolved handoff."
        },
        "B": {
          "type": "review",
          "text": "Separate logs increase the risk of inconsistent instructions and do not repair continuity of care."
        },
        "C": {
          "type": "preferred",
          "text": "Secure the child-critical task first, then address the conflict through a structured, fair performance response."
        },
        "D": {
          "type": "acceptable",
          "text": "A relay can help temporarily, but it is not a verified clinical handoff with clear accountability."
        },
        "E": {
          "type": "review",
          "text": "Waiting allows a known medication-safety gap to continue; personnel disputes should be addressed confidentially."
        }
      },
      "family": "c1-o2",
      "acceptable": {
        "D": "A relay can help temporarily, but it is not a verified clinical handoff with clear accountability."
      },
      "refs": [
        "naeyc",
        "daffron"
      ]
    },
    {
      "id": "C1Q04",
      "chapter": 1,
      "objective": 2,
      "scenario": "A high-performing employee complains that a colleague is always “lazy.” The colleague reports they have been assigned the most intensive one-to-one support without relief.",
      "choices": [
        "Ask both employees to keep detailed task logs for two weeks before making any change to assignments.",
        "Temporarily assign the high performer to the intensive role so you can compare how each employee handles it.",
        "Give the colleague additional coaching first, then change staffing only if the complaint is confirmed.",
        "Review observed workload and the child’s plan, rebalance relief coverage, and then evaluate staff performance fairly.",
        "Meet with the complainant first and let them recommend a permanent reallocation of the difficult assignments."
      ],
      "answer": "D",
      "rationale": "Performance problems and structural workload problems can look alike. A director needs observations and workable staffing before deciding.",
      "feedback": {
        "A": {
          "type": "acceptable",
          "text": "Documentation may help, but current fatigue and workload concerns should not remain unmanaged."
        },
        "B": {
          "type": "review",
          "text": "A comparison may be unfair to the child and staff unless the support plan and staffing capacity are secured."
        },
        "C": {
          "type": "review",
          "text": "This treats a potentially structural workload problem as an individual skill failure before examining evidence."
        },
        "D": {
          "type": "preferred",
          "text": "Performance problems and structural workload problems can look alike. A director needs observations and workable staffing before deciding."
        },
        "E": {
          "type": "review",
          "text": "One worker should not control assignments based on a label about a colleague or child."
        }
      },
      "family": "c1-o2",
      "acceptable": {
        "A": "Documentation may help, but current fatigue and workload concerns should not remain unmanaged."
      },
      "refs": [
        "daffron",
        "naeyc"
      ]
    },
    {
      "id": "C1Q05",
      "chapter": 1,
      "objective": 3,
      "scenario": "A reliable educator requests an early departure on Tuesdays to attend a college course. A qualified floater can cover, but the floater also supports two other rooms during transitions. What is the best supervisory response?",
      "choices": [
        "Approve the departure for the semester, and ask the room team to absorb the coverage during its normal routine.",
        "Decline the request for the term, explaining that established schedules should not change during enrollment.",
        "Reassign the floater every Tuesday, and review any effect on the other rooms after the semester ends.",
        "Verify qualified coverage and predictable child handoffs, pilot the change, and review the impact across rooms.",
        "Approve a coworker swap when both employees agree, and record the revised assignment after the first week."
      ],
      "answer": "D",
      "rationale": "Supporting staff development is compatible with child safety when a supervisor confirms qualified coverage, checks the effect on other classrooms, and monitors continuity during the trial.",
      "feedback": {
        "A": {
          "type": "review",
          "tag": "c1-o3",
          "text": "A standing exception can be workable, but the room team should not be expected to improvise qualified coverage."
        },
        "B": {
          "type": "review",
          "tag": "c1-o3",
          "text": "A blanket refusal overlooks a feasible development opportunity; the coverage constraints deserve examination."
        },
        "C": {
          "type": "review",
          "tag": "c1-o3",
          "text": "A floater supports multiple rooms. Reassignment without checking those transitions may create new gaps."
        },
        "D": {
          "type": "preferred",
          "tag": "c1-o3",
          "text": "A trial with verified coverage and follow-up supports the educator while protecting children across the program."
        },
        "E": {
          "type": "review",
          "tag": "c1-o3",
          "text": "Employee agreement is not enough. The supervisor must approve the schedule and verify coverage before the change."
        }
      },
      "family": "c1-o3",
      "acceptable": {},
      "refs": [
        "ratio",
        "daffron",
        "knowles"
      ]
    },
    {
      "id": "C1Q06",
      "chapter": 1,
      "objective": 3,
      "scenario": "An employee arrives visibly distressed after a personal crisis, says they have slept only one hour, and asks to be alone with toddlers to “stay busy.”",
      "choices": [
        "Assess fitness for care privately, arrange coverage and consider appropriate leave or adjusted duties.",
        "Contact the person’s emergency contact to discuss their private crisis before considering schedule changes.",
        "Offer a quiet classroom and a second caregiver nearby, then review the situation after the morning session.",
        "Ask for a signed statement that the employee feels able to work, then retain their scheduled solo assignment.",
        "Let the employee assist in a non-supervisory task while arranging a private conversation and coverage check."
      ],
      "answer": "A",
      "rationale": "A caring response includes safeguarding children and treating staff with dignity, not guessing fitness from either sympathy or frustration.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "A caring response includes safeguarding children and treating staff with dignity, not guessing fitness from either sympathy or frustration."
        },
        "B": {
          "type": "review",
          "text": "Disclosure of personal circumstances requires an appropriate basis, not mere curiosity or scheduling convenience."
        },
        "C": {
          "type": "review",
          "text": "An exhausted employee may still be unable to give safe care; assess ability before assigning any responsibility."
        },
        "D": {
          "type": "review",
          "text": "A signature cannot substitute for the director’s assessment of safe supervision."
        },
        "E": {
          "type": "acceptable",
          "text": "This may be reasonable after determining which tasks are safe, but it should not sidestep a current fitness assessment."
        }
      },
      "family": "c1-o3",
      "acceptable": {
        "E": "This may be reasonable after determining which tasks are safe, but it should not sidestep a current fitness assessment."
      },
      "refs": [
        "naeyc",
        "daffron"
      ]
    },
    {
      "id": "C1Q07",
      "chapter": 1,
      "objective": 1,
      "scenario": "A veteran caregiver asks to post a classroom video showing several children in a private staff group. One child's family has not authorized sharing. What should the supervisor do?",
      "choices": [
        "Share the clip only with verified staff through their private group because the educational purpose is legitimate.",
        "Pause the upload, check each child’s release and program privacy rules, then use an authorized alternative.",
        "Crop the child without a release and post the rest after confirming no identifiers remain visible.",
        "Request the missing family’s permission today and hold the video until an approved response is documented.",
        "Move the recording to an encrypted account accessible only to leadership, then allow staff to link to it later."
      ],
      "answer": "B",
      "rationale": "Check consent and organizational controls before sharing identifiable child images; privacy protection is a supervisory responsibility.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "A private group does not override missing permissions or the program’s authorized sharing policy."
        },
        "B": {
          "type": "preferred",
          "text": "Check consent and organizational controls before sharing identifiable child images; privacy protection is a supervisory responsibility."
        },
        "C": {
          "type": "review",
          "text": "Cropping might work, but permissions and metadata must be verified before an approved sharing method is used."
        },
        "D": {
          "type": "acceptable",
          "text": "Seeking permission is sensible, but other children’s permissions and platform safeguards still need verification."
        },
        "E": {
          "type": "review",
          "text": "Storage security does not by itself authorize disclosure or onward sharing."
        }
      },
      "family": "c1-o1",
      "acceptable": {
        "D": "Seeking permission is sensible, but other children’s permissions and platform safeguards still need verification."
      },
      "refs": [
        "naeyc",
        "secure2026"
      ]
    },
    {
      "id": "C1Q08",
      "chapter": 1,
      "objective": 1,
      "scenario": "A respected senior teacher says, “Come on, don’t go corporate on me,” when you ask her to document repeated late handoffs. Other staff are watching. What is your first response?",
      "choices": [
        "Explain privately that documentation protects children and staff, ask what makes the process difficult, and set a clear expectation.",
        "Let it pass publicly but quietly begin documenting every minor mistake she makes.",
        "Ask the staff group to vote on whether handoff documentation is worth the time.",
        "Suspend the teacher immediately for questioning the supervisor in front of others.",
        "Offer to waive the records requirement if she agrees to mentor newer staff."
      ],
      "answer": "A",
      "rationale": "Peer influence matters, but the director must maintain a consistent safety standard while learning what is blocking compliance.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "Peer influence matters, but the director must maintain a consistent safety standard while learning what is blocking compliance."
        },
        "B": {
          "type": "review",
          "text": "Private surveillance after publicly avoiding the issue feels retaliatory and leaves the handoff requirement unclear to the whole team."
        },
        "C": {
          "type": "review",
          "text": "A vote cannot waive accurate handoff documentation. Safety obligations are not optional when colleagues find them inconvenient."
        },
        "D": {
          "type": "review",
          "text": "Immediate suspension over a challenge to authority skips fact-finding and may turn a teachable boundary issue into an unnecessary conflict."
        },
        "E": {
          "type": "review",
          "text": "Trading record compliance for mentoring privileges leaves the underlying supervision and documentation gap untouched."
        }
      },
      "family": "c1-o1",
      "acceptable": {},
      "refs": [
        "naeyc",
        "daffron"
      ]
    },
    {
      "id": "C1Q09",
      "chapter": 1,
      "objective": 2,
      "scenario": "A substitute arrives just before opening. Staff say the person has worked in child care for years, but the director cannot confirm the required background-clearance status or applicable qualifications. What should happen?",
      "choices": [
        "Keep the substitute in the office temporarily while a qualified employee covers the classroom.",
        "Have the substitute assist alongside a cleared teacher while the director calls licensing about the pending record.",
        "Let the substitute handle activities without being counted in ratio until the personnel file is checked.",
        "Verify clearance and qualifications for the intended duties before counting the substitute in coverage.",
        "Ask the agency for written assurance that screening is complete and schedule a records audit later."
      ],
      "answer": "D",
      "rationale": "Confirm required clearance and qualifications before assigning regulated work; prevent a staffing crisis from becoming a compliance violation.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "The office may be licensed premises; confirm clearance requirements before allowing any presence."
        },
        "B": {
          "type": "review",
          "text": "Even supervised presence may be restricted by clearance rules; verify allowable presence before placement."
        },
        "C": {
          "type": "review",
          "text": "Not counting the person in ratios does not automatically make an uncleared presence permissible."
        },
        "D": {
          "type": "preferred",
          "text": "Confirm required clearance and qualifications before assigning regulated work; prevent a staffing crisis from becoming a compliance violation."
        },
        "E": {
          "type": "review",
          "text": "An agency assurance may be useful evidence, but the director must verify required clearance status before assignment."
        }
      },
      "family": "c1-o2",
      "acceptable": {},
      "refs": [
        "cdsslaw",
        "ratio",
        "clearance"
      ]
    },
    {
      "id": "C1Q10",
      "chapter": 1,
      "objective": 2,
      "scenario": "A teacher repeatedly describes an autistic preschooler’s distress as “bad behavior,” but the notes omit triggers, communication attempts and staff responses. What coaching is strongest?",
      "choices": [
        "Require staff to count episodes and send weekly totals to the family before changing the response plan.",
        "Adopt a uniform consequence for every child whose behavior interrupts activities, then track compliance.",
        "Have the most experienced educator write neutral notes while newer staff observe for a few weeks.",
        "Schedule a family meeting to discuss behavior at home before reviewing what happened at the program.",
        "Coach staff to record observable antecedents, behavior and supports, then review the individualized plan."
      ],
      "answer": "E",
      "rationale": "Coach staff to separate the child from the behavior, record observable facts, and use those facts to improve supports.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Frequency data alone lacks context about triggers, communication, environmental conditions, and staff response."
        },
        "B": {
          "type": "review",
          "text": "A one-size-fits-all consequence can ignore disability-related supports and the function of the behavior."
        },
        "C": {
          "type": "review",
          "text": "Demonstration may help, but all supervising staff need a reliable way to document and respond."
        },
        "D": {
          "type": "review",
          "text": "Family input matters, but supervisors must examine their own environment and practices, too."
        },
        "E": {
          "type": "preferred",
          "text": "Coach staff to separate the child from the behavior, record observable facts, and use those facts to improve supports."
        }
      },
      "family": "c1-o2",
      "acceptable": {},
      "refs": [
        "naeyc",
        "ada",
        "supervision"
      ]
    },
    {
      "id": "C1Q11",
      "chapter": 1,
      "objective": 3,
      "scenario": "Two family boundary concerns arise this week. One parent encourages her daughter to call a male caregiver “Daddy,” making him uncomfortable. Another parent asks staff to sign a private agreement promising custody if the parent is detained or deported. Which responses should the director take? Select ALL that apply.",
      "choices": [
        "Support the caregiver by meeting with the first parent to set respectful expectations about staff titles and professional roles.",
        "Decline informal custody promises that staff are not authorized or qualified to undertake.",
        "Tell willing staff they may sign a private standby-guardianship promise if the agreement is kept outside the enrollment file.",
        "Connect the second family with qualified legal-aid or family-preparedness resources and review formal emergency-pickup arrangements.",
        "Document the discussions and coach staff to maintain warm relationships with appropriate professional boundaries."
      ],
      "answer": "A|B|D|E",
      "rationale": "Directors should support staff boundaries and family dignity, avoid unauthorized custody promises, refer legal planning to qualified professionals, and document practical emergency-pickup arrangements. This is supervisory best practice, not a ruling about any family’s immigration or custody status.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "Respecting the employee’s discomfort while explaining professional roles to the parent protects a healthy caregiver-family relationship."
        },
        "B": {
          "type": "preferred",
          "text": "An informal private promise cannot substitute for legally effective guardianship documents, professional legal advice, or verified custody authority."
        },
        "C": {
          "type": "review",
          "text": "A secret agreement does not create reliable legal custody authority and could expose staff and the child to serious confusion during an emergency."
        },
        "D": {
          "type": "preferred",
          "text": "Legal-aid referrals and verified emergency-contact procedures provide practical support without turning staff into unauthorized legal guardians."
        },
        "E": {
          "type": "preferred",
          "text": "Documented boundaries and coaching help employees remain compassionate without taking on obligations outside their roles."
        }
      },
      "family": "c1-o3",
      "acceptable": {},
      "refs": [
        "naeyc",
        "daffron",
        "signout"
      ],
      "answerSet": [
        "A",
        "B",
        "D",
        "E"
      ],
      "multi": true
    },
    {
      "id": "C1Q12",
      "chapter": 1,
      "objective": 3,
      "scenario": "A parent speaks harshly to a caregiver during pickup. The caregiver demands that the director ban the family immediately. The parent has not threatened anyone, but the behavior is recurring. What is a sound next step?",
      "choices": [
        "Ask the caregiver to explain the conflict to the family and seek a personal apology without management present.",
        "Document the pattern, hear both perspectives, set boundaries and apply the program’s contract fairly.",
        "Schedule a mediated pickup conversation with the family and employee before reviewing written expectations.",
        "Issue a written family warning based on the caregiver’s account, then offer an appeal to the director.",
        "Reassign the caregiver to a different schedule temporarily to reduce conflict while you review documentation."
      ],
      "answer": "B",
      "rationale": "Professional boundaries are enforceable without abandoning fairness; a director should document the conduct and use proportionate remedies.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "A director should not leave a recurring staff–family conflict solely to the affected caregiver."
        },
        "B": {
          "type": "preferred",
          "text": "Professional boundaries are enforceable without abandoning fairness; a director should document the conduct and use proportionate remedies."
        },
        "C": {
          "type": "review",
          "text": "Mediation might help, but staff need immediate boundaries and the director should review records and policy first."
        },
        "D": {
          "type": "review",
          "text": "A formal warning may be warranted, but the facts and policy should be assessed before deciding."
        },
        "E": {
          "type": "acceptable",
          "text": "Temporary separation may help, but it should not quietly shift the burden onto an employee or replace fair inquiry."
        }
      },
      "family": "c1-o3",
      "acceptable": {
        "E": "Temporary separation may help, but it should not quietly shift the burden onto an employee or replace fair inquiry."
      },
      "refs": [
        "naeyc",
        "daffron"
      ]
    },
    {
      "id": "C2Q01",
      "chapter": 2,
      "objective": 1,
      "scenario": "A caregiver receives an allegation of possible abuse by another employee. The incident date is unclear, and your camera system stores footage for only a limited time. As director, which actions are appropriate? Select ALL that apply.",
      "choices": [
        "Preserve unaltered footage, records and factual accounts before routine deletion can occur.",
        "Conduct repeated detailed interviews with the child to resolve discrepancies before agencies become involved.",
        "Address independent mandated-reporting duties and assess any separate licensing notice.",
        "Secure the child’s immediate safety and review whether an employee’s access needs to change.",
        "Hold the external report until surveillance confirms that an assault actually occurred."
      ],
      "answer": "A|C|D",
      "answerSet": [
        "A",
        "C",
        "D"
      ],
      "multi": true,
      "rationale": "Reasonable suspicion triggers reporting duties without proof. The director preserves evidence and safeguards children; the designated authorities investigate. Reporting to a director does not replace a mandated report.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "Original records and contemporaneous facts protect the child and the fairness of the inquiry."
        },
        "B": {
          "type": "review",
          "text": "Repeated investigative questioning may contaminate accounts and is not a substitute for authorized investigation."
        },
        "C": {
          "type": "preferred",
          "text": "Reporting pathways are distinct; neither one automatically satisfies the other."
        },
        "D": {
          "type": "preferred",
          "text": "Risk management comes before a final conclusion about the allegation."
        },
        "E": {
          "type": "review",
          "text": "Reasonable suspicion does not require complete proof or a video record."
        }
      },
      "family": "c2-o1",
      "acceptable": {},
      "refs": [
        "pen11166",
        "report101212",
        "naeyc"
      ]
    },
    {
      "id": "C2Q02",
      "chapter": 2,
      "objective": 1,
      "scenario": "A four-year-old whose family is unhoused arrives repeatedly with severely soiled clothing. Today staff observe dried feces on the child’s skin and receive credible information about an immediate street-safety threat. The parent has declined one shelter option. What is the director’s reporting response?",
      "choices": [
        "Make the required child-protection report now and complete the written SCAR within 36 hours, while ensuring immediate care.",
        "Call the child-protection hotline for informal advice and file the SCAR only if the worker confirms neglect is proven.",
        "Coordinate hygiene supplies and housing outreach first, then report if the child arrives in unsafe conditions again.",
        "Send Community Care Licensing an unusual-incident report and let licensing determine whether a SCAR is necessary.",
        "Arrange a same-day parent meeting with a housing advocate before deciding whether a report would be appropriate."
      ],
      "answer": "A",
      "rationale": "Specific, documented danger and unmet basic needs provide reasonable suspicion of possible neglect or endangerment in this scenario. Report immediately or as soon as practicable to a designated child-protection agency and send the written SCAR within 36 hours; ensure the child’s immediate safety and offer support. Homelessness or refusal of a particular shelter alone does not establish neglect.",
      "feedback": {
        "A": {
          "type": "preferred",
          "tag": "c2-o1",
          "text": "Specific, documented danger and unmet basic needs provide reasonable suspicion of possible neglect or endangerment in this scenario. Report immediately or as soon as practicable to a designated child-protection agency and send the written SCAR within 36 hours; ensure the child’s immediate safety and offer support. Homelessness or refusal of a particular shelter alone does not establish neglect."
        },
        "B": {
          "type": "review",
          "tag": "c2-o1",
          "text": "A mandated reporter does not wait for a hotline worker to prove neglect. Giving the facts to an authorized agency may constitute the initial report, but required written follow-up must also occur."
        },
        "C": {
          "type": "review",
          "tag": "c2-o1",
          "text": "Assistance is valuable, but a credible present safety threat already raises reporting duties. Resources cannot replace a mandated report."
        },
        "D": {
          "type": "review",
          "tag": "c2-o1",
          "text": "An unusual-incident report to licensing and a mandated report to child protection serve different purposes. Licensing does not decide whether the individual must make a SCAR."
        },
        "E": {
          "type": "review",
          "tag": "c2-o1",
          "text": "A family meeting may provide support, but it must not delay a report when reasonable suspicion already exists. The reporter is not the investigator."
        }
      },
      "family": "c2-o1",
      "acceptable": {},
      "refs": [
        "pen11166",
        "childhomeless",
        "report101212",
        "pen11165_2"
      ]
    },
    {
      "id": "C2Q03",
      "chapter": 2,
      "objective": 2,
      "scenario": "After a mandated report, a parent files a complaint alleging insects, sanitation problems and unauthorized staff. You believe the complaint is retaliatory. What do you do?",
      "choices": [
        "Tell staff to discuss only issues they personally witnessed, then prepare a factual summary for licensing.",
        "Provide the investigator with the complaint timeline while asking for review by a different analyst due to suspected bias.",
        "Invite an independent sanitation review before responding to the licensing complaint.",
        "Provide copies of the latest internal safety checklist and postpone staff interviews until counsel is available.",
        "Cooperate with the inspection, preserve original evidence and correct verified deficiencies without retaliation."
      ],
      "answer": "E",
      "rationale": "The complaint must be evaluated on evidence. The director protects confidentiality and cooperates with the appropriate licensing process.",
      "feedback": {
        "A": {
          "type": "acceptable",
          "text": "Factual communication is useful, but the director still must independently cooperate and correct actual conditions."
        },
        "B": {
          "type": "review",
          "text": "You may raise a process concern, but do not condition or delay lawful inspection access on reassignment."
        },
        "C": {
          "type": "review",
          "text": "An independent assessment can supplement the process, not replace timely cooperation with licensing."
        },
        "D": {
          "type": "review",
          "text": "Records are helpful, but restricting lawful inspection and interviews can create a separate compliance issue."
        },
        "E": {
          "type": "preferred",
          "text": "The complaint must be evaluated on evidence. The director protects confidentiality and cooperates with the appropriate licensing process."
        }
      },
      "family": "c2-o2",
      "acceptable": {
        "A": "Factual communication is useful, but the director still must independently cooperate and correct actual conditions."
      },
      "refs": [
        "secure2026",
        "naeyc"
      ]
    },
    {
      "id": "C2Q04",
      "chapter": 2,
      "objective": 2,
      "scenario": "A staff member reports that another employee slapped a child, but you did not see it and the accused employee denies it. There is no video.",
      "choices": [
        "Remove the employee from child contact pending risk review, protect the child, report promptly, and preserve relevant facts.",
        "Temporarily reassign the accused employee and ask the family whether they want a formal investigation.",
        "Document the complaint and request a same-day licensing consultation before alerting child-protection authorities.",
        "Refer both staff for coaching while increasing observation, because no injury is visible and the account is disputed.",
        "Separately interview the accuser and accused, then file only if their accounts reveal corroboration."
      ],
      "answer": "A",
      "rationale": "An eyewitness account of a child being slapped can meet the reasonable-suspicion standard even without video or injury. Protect the child, restrict the accused employee’s child contact during an appropriate review, make mandatory reports, preserve records, and avoid announcing guilt. Administrative leave may be a sensible precaution, subject to employer policy and law; it is not itself an automatic statutory finding or penalty.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "An eyewitness account of a child being slapped can meet the reasonable-suspicion standard even without video or injury. Protect the child, restrict the accused employee’s child contact during an appropriate review, make mandatory reports, preserve records, and avoid announcing guilt. Administrative leave may be a sensible precaution, subject to employer policy and law; it is not itself an automatic statutory finding or penalty."
        },
        "B": {
          "type": "review",
          "text": "Reassignment may protect children, but a mandated reporter cannot make reporting suspected abuse contingent on a family requesting an investigation."
        },
        "C": {
          "type": "review",
          "text": "A consultation does not replace a mandated reporter’s independent obligation when reasonable suspicion exists."
        },
        "D": {
          "type": "review",
          "text": "An allegation of physical abuse cannot be reduced to coaching based solely on lack of visible injury."
        },
        "E": {
          "type": "review",
          "text": "A supervisor may gather immediate facts, but reporting cannot wait for self-conducted corroboration."
        }
      },
      "family": "c2-o2",
      "acceptable": {},
      "refs": [
        "pen11166",
        "report101212"
      ]
    },
    {
      "id": "C2Q05",
      "chapter": 2,
      "objective": 3,
      "scenario": "A mother says, “I don’t trust men with young children. I refuse to leave my daughters with that male caregiver.” Your employee has no adverse history and meets all qualifications.",
      "choices": [
        "Arrange an additional classroom observation and report back on supervision procedures without discussing the employee.",
        "Listen privately, review concrete safety concerns and qualified staffing, and protect the employee from bias.",
        "Ask the family to submit its concern in writing before deciding whether any staffing review is necessary.",
        "Offer a different available caregiver for this family whenever staffing permits, without discussing the stated bias.",
        "Explain that the worker passed required screening and close the conversation unless the family provides proof."
      ],
      "answer": "B",
      "rationale": "The parent’s trust concerns deserve respectful inquiry; gender alone is not evidence of danger or a sound basis for discriminatory staffing.",
      "feedback": {
        "A": {
          "type": "acceptable",
          "text": "Transparent procedures help, but the family’s expressed concern still deserves a respectful and equitable response."
        },
        "B": {
          "type": "preferred",
          "text": "The parent’s trust concerns deserve respectful inquiry; gender alone is not evidence of danger or a sound basis for discriminatory staffing."
        },
        "C": {
          "type": "review",
          "text": "Written records are useful, but the director can discuss specific safety concerns immediately and fairly."
        },
        "D": {
          "type": "review",
          "text": "A feasible scheduling accommodation may be considered, but leaving discriminatory assumptions unaddressed can harm staff."
        },
        "E": {
          "type": "review",
          "text": "Screening is relevant, but a director should invite specific factual concerns rather than dismiss the conversation."
        }
      },
      "family": "c2-o3",
      "acceptable": {
        "A": "Transparent procedures help, but the family’s expressed concern still deserves a respectful and equitable response."
      },
      "refs": [
        "employment",
        "naeyc",
        "feha"
      ]
    },
    {
      "id": "C2Q06",
      "chapter": 2,
      "objective": 3,
      "scenario": "After an allegation of possible staff abuse, the director has removed the employee from child contact, made the required reports and assigned qualified coverage. Other parents notice the staffing change and ask what happened. What is the most appropriate communication?",
      "choices": [
        "Send all enrolled families a summary of the allegation, noting that no findings have yet been made by investigators.",
        "Give necessary safety and staffing information, communicate appropriately with affected families, and follow required notices.",
        "Confirm that a staffing change occurred but withhold all details, including relevant safety information from an affected parent.",
        "Share a redacted copy of the complaint to maintain transparency while removing the employee’s and child’s names.",
        "Wait for the final investigative result before describing any operational changes or required licensing communications."
      ],
      "answer": "B",
      "rationale": "Protect children and confidentiality together: communicate necessary operational and safety facts, notify directly affected families appropriately, cooperate with authorities, and comply with any required legal or licensing notices. A mere allegation does not automatically require broadcasting details to every family. Formal facility licensing accusations or suspension can trigger separate statutory parent-notification duties under Health and Safety Code § 1596.8895.",
      "feedback": {
        "A": {
          "type": "review",
          "tag": "c2-o3",
          "text": "Automatically sending an unverified accusation to all families risks disclosing confidential information and suggesting guilt without findings. Notify families when necessary and when required by law or licensing action."
        },
        "B": {
          "type": "preferred",
          "tag": "c2-o3",
          "text": "Protect children and confidentiality together: communicate necessary operational and safety facts, notify directly affected families appropriately, cooperate with authorities, and comply with any required legal or licensing notices. A mere allegation does not automatically require broadcasting details to every family. Formal facility licensing accusations or suspension can trigger separate statutory parent-notification duties under Health and Safety Code § 1596.8895."
        },
        "C": {
          "type": "review",
          "tag": "c2-o3",
          "text": "Confidentiality is not a complete gag order. A directly affected parent may need safety information, and certain licensing actions carry mandatory notice requirements."
        },
        "D": {
          "type": "review",
          "tag": "c2-o3",
          "text": "Removing names does not necessarily prevent identification of the child or employee. A complaint is not an appropriate general parent newsletter."
        },
        "E": {
          "type": "review",
          "tag": "c2-o3",
          "text": "Necessary staffing, child-safety, and legally required notices cannot automatically wait for a final investigative conclusion."
        }
      },
      "family": "c2-o3",
      "acceptable": {},
      "refs": [
        "pen11166",
        "report101212",
        "parentnotice",
        "naeyc"
      ]
    },
    {
      "id": "C2Q07",
      "chapter": 2,
      "objective": 1,
      "scenario": "A child says, without prompting, that a household adult hurt them. The teacher begins asking for the exact details and wants to interview the child's sibling too. What should you direct the teacher to do?",
      "choices": [
        "Notify the director and ask the child to repeat the story once in front of a second staff witness.",
        "Write down the child’s words and consult an agency hotline before discussing the matter with the accused adult.",
        "Reassure the child and arrange counseling resources, then report after the supervisor has collected a full chronology.",
        "Stop investigative questions, protect the child, record the exact disclosure and follow reporting rules.",
        "Ask one neutral clarifying question about immediate safety, then arrange a parent conference before making a report."
      ],
      "answer": "D",
      "rationale": "Protect the child, document spontaneous statements, and follow reporting duties without becoming an investigator.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Repeated disclosure requests may distort evidence and burden the child."
        },
        "B": {
          "type": "review",
          "text": "Document the child’s words and report reasonable suspicion. Do not confront or alert the accused adult; that could increase risk to the child."
        },
        "C": {
          "type": "review",
          "text": "Support matters, but a full chronology is the investigating agency’s responsibility, not a prerequisite."
        },
        "D": {
          "type": "preferred",
          "text": "Protect the child, document spontaneous statements, and follow reporting duties without becoming an investigator."
        },
        "E": {
          "type": "review",
          "text": "Limited safety clarification may be warranted, but reporting must not wait for a family conference."
        }
      },
      "family": "c2-o1",
      "acceptable": {},
      "refs": [
        "pen11166",
        "naeyc"
      ]
    },
    {
      "id": "C2Q08",
      "chapter": 2,
      "objective": 1,
      "scenario": "An employee wants to send a video of an autistic child’s distress to an outside training consultant. The clip includes the child’s voice and classmates. What should the director authorize?",
      "choices": [
        "Show the recording in a private staff meeting and ask a qualified consultant to describe possible supports.",        "Provide a written account of what happened, including only child-relevant details, and seek a documented consultation.",
        "Share a short clip that blurs the child’s face through the employee’s private professional account.",
        "Ask the family to approve the clip by text, then send it to the specialist through whichever platform is easiest.",
        "Use a nonidentifying summary through approved channels and review permissions before sharing any recording."
      ],
      "answer": "E",
      "rationale": "Keep identifiable child records and recordings out of unauthorized external recipients; use de-identified scenarios and approved channels.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Internal review may be appropriate if authorized, but sharing with an outside consultant requires separate assessment."
        },
        "B": {
          "type": "acceptable",
          "text": "This can be appropriate if the account is de-identified and the consultation follows policy; verify approval and storage."
        },
        "C": {
          "type": "review",
          "text": "Voices, surroundings, metadata and context may still identify the child; a private account is not authorization."
        },
        "D": {
          "type": "review",
          "text": "Consent and platform security must meet the program’s actual requirements, not merely convenience."
        },
        "E": {
          "type": "preferred",
          "text": "Keep identifiable child records and recordings out of unauthorized external recipients; use de-identified scenarios and approved channels."
        }
      },
      "family": "c2-o1",
      "acceptable": {
        "B": "This can be appropriate if the account is de-identified and the consultation follows policy; verify approval and storage."
      },
      "refs": [
        "naeyc",
        "ada"
      ]
    },
    {
      "id": "C2Q09",
      "chapter": 2,
      "objective": 2,
      "scenario": "A person who says they are the child's other parent arrives demanding pickup. The enrolled guardian has not listed that person as authorized, and the visitor threatens to call police. Which response is strongest?",
      "choices": [
        "Verify legal authority and pickup records while keeping the child supervised and managing any escalation safely.",
        "Call the listed guardian first and release the child if the visitor provides a matching identification card.",
        "Invite the visitor into the office while staff verify the file and arrange for a second adult to observe.",
        "Ask the visitor to obtain a court document electronically and let them wait with the child meanwhile.",
        "Rely on the latest verbal instructions from the enrolling parent unless the visitor brings a police officer."
      ],
      "answer": "A",
      "rationale": "Verify legal pickup authority and preserve safety while responding calmly to escalation.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "Verify legal pickup authority and preserve safety while responding calmly to escalation."
        },
        "B": {
          "type": "review",
          "text": "Identity verification alone does not resolve restrictions, custody orders, or authorization."
        },
        "C": {
          "type": "review",
          "text": "Do not admit a demanding, unverified pickup adult into child-accessible space simply to check records. Verify authority behind the secured boundary and summon help if the behavior escalates."
        },
        "D": {
          "type": "review",
          "text": "An unverified visitor should not gain access to the child while authority remains unresolved."
        },
        "E": {
          "type": "review",
          "text": "Staff must assess custody documents and policy; law enforcement presence does not automatically settle authority."
        }
      },
      "family": "c2-o2",
      "acceptable": {},
      "refs": [
        "signout",
        "naeyc"
      ]
    },
    {
      "id": "C2Q10",
      "chapter": 2,
      "objective": 2,
      "scenario": "An unhoused parent repeatedly misses a standard uniform requirement and asks for a different drop-off time to reach a job interview. What should guide a director's decision?",
      "choices": [
        "Maintain the published drop-off schedule but offer referral contacts and information on nearby employment services.",
        "Review the child’s needs and safe staffing, apply policies flexibly where possible and offer support privately.",
        "Ask the family to meet with the attendance coordinator so any exception is applied consistently and documented.",
        "Make a one-day exception based on the interview time but tell staff not to discuss it to avoid complaints of favoritism.",
        "Allow the new drop-off time for one week and ask the family to locate permanent housing before renewal."
      ],
      "answer": "B",
      "rationale": "Equity means responding to actual needs and constraints while preserving child safety, confidentiality and consistent decision-making.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Referrals can help, but the director should examine reasonable adjustments rather than simply defaulting to policy."
        },
        "B": {
          "type": "preferred",
          "text": "Equity means responding to actual needs and constraints while preserving child safety, confidentiality and consistent decision-making."
        },
        "C": {
          "type": "acceptable",
          "text": "Process consistency matters; the director must still consider actual access needs and capacity."
        },
        "D": {
          "type": "review",
          "text": "An accommodation should be transparent within appropriate personnel channels and meet safe staffing rules."
        },
        "E": {
          "type": "review",
          "text": "Housing status should not become an unrelated condition of a reasonable scheduling decision."
        }
      },
      "family": "c2-o2",
      "acceptable": {
        "C": "Process consistency matters; the director must still consider actual access needs and capacity."
      },
      "refs": [
        "childhomeless",
        "naeyc"
      ]
    },
    {
      "id": "C2Q11",
      "chapter": 2,
      "objective": 3,
      "scenario": "A complaint alleges staff misconduct, and an investigator requests records. The parent also demands the accused employee's entire personnel file. Which actions should the director take? Select ALL that apply.",
      "choices": [
        "Maintain child safety while separating urgent precautions from a final finding of fault.",
        "Remove unverified comments from the file before release to avoid distracting investigators.",
        "Provide families with appropriate safety and process information without disclosing private staff details.",
        "Preserve original records and provide responsive information to authorized investigators.",
        "Give the family the employee’s full personnel file because the complaint concerns their child."
      ],
      "answer": "A|C|D",
      "rationale": "Preserve evidence, address child safety, cooperate through authorized channels, and keep sensitive employee information confidential.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "Interim measures do not require announcing guilt."
        },
        "B": {
          "type": "review",
          "text": "Editing original records can compromise evidence and accountability."
        },
        "C": {
          "type": "preferred",
          "text": "Communicate what is relevant and authorized, not everything in the record."
        },
        "D": {
          "type": "preferred",
          "text": "Authorized review relies on intact, reliable evidence."
        },
        "E": {
          "type": "review",
          "text": "Family concern does not override unrelated personnel privacy protections."
        }
      },
      "family": "c2-o3",
      "acceptable": {},
      "refs": [
        "naeyc",
        "secure2026",
        "pen11166"
      ],
      "answerSet": [
        "A",
        "C",
        "D"
      ],
      "multi": true
    },
    {
      "id": "C2Q12",
      "chapter": 2,
      "objective": 3,
      "scenario": "A child-safety event may require a mandated report and an unusual incident report. The director thinks filing one report should resolve both duties and prevent a citation. What is correct?",
      "choices": [
        "Make the mandated report promptly and wait for child-protection staff to instruct you on any licensing notice.",
        "File an LIC 624 to demonstrate transparency, then treat the original staffing or safety lapse as automatically excused.",
        "Record the event in the child’s file and notify the parent, then report externally only if an injury is confirmed.",
        "Check both reporting pathways independently, notify licensing promptly if required, and preserve each record.",
        "Request a written waiver from the family while completing the internal incident form for the director’s records."
      ],
      "answer": "D",
      "rationale": "Reporting to child protection does not automatically satisfy a center licensee’s separate incident-reporting obligations.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Mandatory reporting and licensing reporting are separate duties with different triggers and timelines."
        },
        "B": {
          "type": "review",
          "text": "Timely reporting helps accountability but is not immunity from a citation for a separate violation."
        },
        "C": {
          "type": "review",
          "text": "An unusual threat or suspected abuse may be reportable without confirmed injury."
        },
        "D": {
          "type": "preferred",
          "text": "Reporting to child protection does not automatically satisfy a center licensee’s separate incident-reporting obligations."
        },
        "E": {
          "type": "review",
          "text": "Family permission cannot replace reporting duties to licensing or child-protection authorities."
        }
      },
      "family": "c2-o3",
      "acceptable": {},
      "refs": [
        "report101212",
        "incident624",
        "pen11166",
        "cclreports"
      ]
    },
    {
      "id": "C3Q01",
      "chapter": 3,
      "objective": 1,
      "scenario": "The opening caregiver is 25 minutes late. Seven children are waiting with a qualified director who is scheduled to leave for a meeting. What is your first priority?",
      "choices": [
        "Have families wait in the lobby with children until the late caregiver arrives while you attend the meeting.",
        "Count the late caregiver as an employee on the posted roster, but maintain a mobile phone check-in.",
        "Combine the children into a nearby classroom and ask the other teacher to accept temporary responsibility.",
        "Ask a previously screened assistant to remain with the group while you attend the scheduled off-site meeting.",
        "Keep qualified coverage in place, adjust intake or the meeting, and activate the staffing contingency."
      ],
      "answer": "E",
      "rationale": "Real, physically present qualified supervision governs; a schedule does not create staffing.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "You must confirm children are safely supervised and avoid an unapproved, confusing arrival process."
        },
        "B": {
          "type": "review",
          "text": "A paper schedule and remote availability do not satisfy physical supervision requirements."
        },
        "C": {
          "type": "acceptable",
          "text": "Combining groups is possible only when capacity, age mix and qualified ratios remain compliant."
        },
        "D": {
          "type": "review",
          "text": "A screened assistant may not meet the teacher qualifications or ratios required for the role."
        },
        "E": {
          "type": "preferred",
          "text": "Real, physically present qualified supervision governs; a schedule does not create staffing."
        }
      },
      "family": "c3-o1",
      "acceptable": {
        "C": "Combining groups is possible only when capacity, age mix and qualified ratios remain compliant."
      },
      "refs": [
        "ratio",
        "supervision"
      ]
    },
    {
      "id": "C3Q02",
      "chapter": 3,
      "objective": 1,
      "scenario": "In a California preschool child care center, one fully qualified teacher is visually supervising 12 preschool children. A thirteenth child arrives; there is no aide or second teacher. The program is not operating under an applicable exception.",
      "choices": [
        "Hold the thirteenth child’s admission until a qualified staffing arrangement meets the applicable ratio.",
        "Offer a brief parent-supervised play period on site before enrolling the child after the next pickup.",
        "Ask a cleared aide to help the teacher immediately, then admit the child after verifying the aide rules.",
        "Place the child with a nearby qualified teacher in an approved room once that room’s capacity is checked.",
        "Begin intake while contacting the on-call teacher and complete the roster once the teacher reaches the center."
      ],
      "answer": "A",
      "rationale": "California Title 22 § 101216.3 establishes a general one-teacher-to-twelve-preschool-children center ratio, with specified exceptions and aide configurations.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "California Title 22 § 101216.3 establishes a general one-teacher-to-twelve-preschool-children center ratio, with specified exceptions and aide configurations."
        },
        "B": {
          "type": "review",
          "text": "Parent presence does not automatically create a licensed exemption to admission or staffing requirements."
        },
        "C": {
          "type": "review",
          "text": "The aide’s status may help in certain permitted configurations, but verification must precede admission."
        },
        "D": {
          "type": "acceptable",
          "text": "This may be a valid alternative only if all room, ratio and license conditions are satisfied."
        },
        "E": {
          "type": "review",
          "text": "The ratio applies during the waiting period; a future arrival cannot justify current excess enrollment."
        }
      },
      "family": "c3-o1",
      "acceptable": {
        "D": "This may be a valid alternative only if all room, ratio and license conditions are satisfied."
      },
      "refs": [
        "ratio",
        "supervision"
      ]
    },
    {
      "id": "C3Q03",
      "chapter": 3,
      "objective": 2,
      "scenario": "A director is considering opening a second mixed-age classroom. A supervisor says the maximum number of children is all that matters, regardless of ages and staff qualifications. What is the best response?",
      "choices": [
        "Use the posted license capacity and add a credentialed teacher if enrollment reaches the maximum number.",
        "Verify the age mix, license conditions, staff credentials, ratios and physical supervision before opening.",
        "Consult the facility’s prior inspection report to confirm that an adjacent area was previously used for children.",
        "Assign the most experienced staff member to lead the room and set the age mix after the first week.",
        "Ask families for preferred schedules so the two rooms never have their highest attendance at the same time."
      ],
      "answer": "B",
      "rationale": "Enrollment capacity, qualified staffing, age groups and the facility’s specific license must be considered together.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "A single capacity figure cannot establish ratios for mixed ages or physical space approval."
        },
        "B": {
          "type": "preferred",
          "text": "Enrollment capacity, qualified staffing, age groups and the facility’s specific license must be considered together."
        },
        "C": {
          "type": "review",
          "text": "Past inspection history does not establish that a room is currently approved or properly staffed for a different age group."
        },
        "D": {
          "type": "review",
          "text": "Experience is not a substitute for specific qualification, age group and licensing checks."
        },
        "E": {
          "type": "review",
          "text": "Staggered attendance may help, but staffing and license rules still apply to every actual configuration."
        }
      },
      "family": "c3-o2",
      "acceptable": {},
      "refs": [
        "ratio",
        "familyratio",
        "supervision"
      ]
    },
    {
      "id": "C3Q04",
      "chapter": 3,
      "objective": 2,
      "scenario": "A water main breaks at noon. The preschool bathrooms no longer flush, handwashing sinks have no running water, and the utility company cannot estimate restoration. Families are at work. What should the director do?",
      "choices": [
        "Continue normal operations with bottled drinking water and postpone bathroom use.",
        "Move children to a playground while waiting for the utility to call back.",
        "Activate the emergency operations plan, assess sanitation and safe-care capacity, arrange prompt family pickup or approved relocation, and review notification duties.",
        "Ask teachers to carry buckets from the outdoor pool to flush the toilets.",
        "Keep only the older children because they can wait longer to use the restroom."
      ],
      "answer": "C",
      "rationale": "Water and sanitation failure can make safe operation impossible. Respond through the approved emergency plan, maintain supervision, and determine any required notifications.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Bottled drinking water does not restore toilets, handwashing sinks, or safe food-service sanitation. Keeping the room operating unchanged is not a safe solution."
        },
        "B": {
          "type": "review",
          "text": "A playground move does not solve loss of handwashing and toilets or establish approved care capacity for the rest of the day."
        },
        "C": {
          "type": "preferred",
          "text": "Water and sanitation failure can make safe operation impossible. Respond through the approved emergency plan, maintain supervision, and determine any required notifications."
        },
        "D": {
          "type": "review",
          "text": "Using pool water for toilet flushing introduces avoidable contamination and does not restore required handwashing or food preparation facilities."
        },
        "E": {
          "type": "review",
          "text": "Older preschoolers still need accessible sanitation. The facility must assess everyone’s safe-care conditions, not keep only children thought able to wait."
        }
      },
      "family": "c3-o2",
      "acceptable": {},
      "refs": [
        "supervision",
        "disaster"
      ]
    },
    {
      "id": "C3Q05",
      "chapter": 3,
      "objective": 3,
      "scenario": "The evacuation plan assumes every child follows shouted instructions. One autistic child becomes disoriented by alarms, and another child uses a wheelchair. What must change?",
      "choices": [
        "Continue group drills using the current route while providing one-on-one advance warnings to affected children.",
        "Give the two children quiet earmuffs and let them wait briefly until the other children have exited.",
        "Ask each family to provide a personal aide for drills, then retain the current evacuation procedure.",
        "Assign accessible routes and trained support roles, adapt warning methods, then practice the revised drill.",
        "Create separate evacuation instructions for mobility and sensory needs, and conduct an initial rehearsal with staff."
      ],
      "answer": "D",
      "rationale": "The center disaster plan must address the needs of children who cannot evacuate independently and should be rehearsed, not merely filed.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Preparation helps transitions, but the inaccessible route and missing assigned assistance remain unresolved."
        },
        "B": {
          "type": "review",
          "text": "Sensory supports may help, but delaying evacuation without an approved safety plan puts children at risk."
        },
        "C": {
          "type": "review",
          "text": "A family-provided aide cannot replace the director’s responsibility to design an accessible emergency plan."
        },
        "D": {
          "type": "preferred",
          "text": "The center disaster plan must address the needs of children who cannot evacuate independently and should be rehearsed, not merely filed."
        },
        "E": {
          "type": "acceptable",
          "text": "Separate instructions are helpful, but the complete plan must coordinate staffing and full-group accountability."
        }
      },
      "family": "c3-o3",
      "acceptable": {
        "E": "Separate instructions are helpful, but the complete plan must coordinate staffing and full-group accountability."
      },
      "refs": [
        "ada2026",
        "disaster",
        "supervision"
      ]
    },
    {
      "id": "C3Q06",
      "chapter": 3,
      "objective": 3,
      "scenario": "Food-storage audit: you find an unopened shelf-stable product one day after a “best if used by” date, an infant formula past its use-by date, and a refrigerated tray of food kept at an unsafe temperature. Which actions are supported? Select ALL that apply.",
      "choices": [
        "Reheat the temperature-abused refrigerated tray and serve it once it feels fully hot.",
        "Quarantine the temperature-abused food and discard it under the approved food-safety procedure.",
        "Discard every shelf-stable item after any best-by date because all printed dates are legal expiration limits.",
        "Inspect the shelf-stable product’s condition, storage history and policy before deciding whether it is usable.",
        "Remove expired infant formula from service and follow the required disposal procedure."
      ],
      "answer": "B|D|E",
      "answerSet": [
        "B",
        "D",
        "E"
      ],
      "multi": true,
      "rationale": "Some date labels communicate quality, but formula dating, temperature abuse and contaminated food require distinct responses. Do not use questionable food in a child care setting while verification is pending.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Reheating does not automatically correct unsafe holding or contamination history."
        },
        "B": {
          "type": "preferred",
          "text": "Unsafe temperature exposure requires action, not an appearance test."
        },
        "C": {
          "type": "review",
          "text": "Best-by dates do not all function as mandatory food-safety expiration dates."
        },
        "D": {
          "type": "preferred",
          "text": "A condition-based assessment distinguishes quality dating from regulated expiration."
        },
        "E": {
          "type": "preferred",
          "text": "Formula use-by dating has a specific safety significance."
        }
      },
      "family": "c3-o3",
      "acceptable": {},
      "refs": [
        "food",
        "fooddate"
      ]
    },
    {
      "id": "C3Q07",
      "chapter": 3,
      "objective": 1,
      "scenario": "A grandparent picks up a child, signs a nickname without recording the time, and says the teacher can fill in the rest later. In a licensed California child care center, what should the supervisor require?",
      "choices": [
        "Confirm authorization and have the adult record the required pickup time and full legal signature.",
        "Allow pickup after checking photo identification and request a complete electronic signature later that day.",
        "Have a second teacher witness the release and attach an explanatory note to the incomplete sign-out entry.",
        "Verify that the grandparent is authorized, then record the time yourself and ask for initials on the next visit.",
        "Accept the nickname if the child recognizes the grandparent and the daily attendance total stays accurate."
      ],
      "answer": "A",
      "rationale": "California center sign-out rules require a full legal signature and recorded time from the person removing the child.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "California center sign-out rules require a full legal signature and recorded time from the person removing the child."
        },
        "B": {
          "type": "review",
          "text": "Identity checking matters, but a late signature should not replace the required contemporaneous sign-out."
        },
        "C": {
          "type": "review",
          "text": "A witness may support documentation, but it does not substitute for the required sign-out procedure."
        },
        "D": {
          "type": "review",
          "text": "The sign-out process assigns a specific recordkeeping duty to the responsible adult at the time of pickup."
        },
        "E": {
          "type": "review",
          "text": "Familiarity does not establish compliance with required legal-signature and sign-out records."
        }
      },
      "family": "c3-o1",
      "acceptable": {},
      "refs": [
        "signout"
      ]
    },
    {
      "id": "C3Q08",
      "chapter": 3,
      "objective": 1,
      "scenario": "A center classroom is within its usual teacher-child ratio, but attendance would exceed the site's licensed capacity if two additional children arrive. What is the correct supervisory conclusion?",
      "choices": [
        "Offer to add a qualified teacher immediately, then treat the extra staff member as increasing licensed capacity.",
        "Check licensed capacity and room staffing, then redirect enrollment until a fully compliant space is available.",
        "Admit the two children because teacher-to-child ratios are satisfied and report the temporary overage afterward.",
        "Use a multipurpose room as overflow care only after confirming that its use and staffing are approved.",
        "Ask families to stagger arrival times and admit everyone so long as no more than the licensed total is present."
      ],
      "answer": "B",
      "rationale": "Compliant ratios and licensed capacity are distinct requirements, and both must be satisfied.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Staffing increases do not independently authorize exceeding the licensed capacity."
        },
        "B": {
          "type": "preferred",
          "text": "Compliant ratios and licensed capacity are distinct requirements, and both must be satisfied."
        },
        "C": {
          "type": "review",
          "text": "Ratios and licensed capacity are distinct requirements; a subsequent report is not a capacity waiver."
        },
        "D": {
          "type": "acceptable",
          "text": "This can be compliant if approved in advance; a director should not assume a spare room is licensed space."
        },
        "E": {
          "type": "acceptable",
          "text": "Staggering can work if all actual attendance, location and ratio conditions are met; do not exceed them."
        }
      },
      "family": "c3-o1",
      "acceptable": {
        "D": "This can be compliant if approved in advance; a director should not assume a spare room is licensed space.",
        "E": "Staggering can work if all actual attendance, location and ratio conditions are met; do not exceed them."
      },
      "refs": [
        "ratio",
        "buildings"
      ]
    },
    {
      "id": "C3Q09",
      "chapter": 3,
      "objective": 2,
      "scenario": "An individual arrives unexpectedly saying they are a Community Care Licensing analyst. Staff are unsure whether the badge is authentic. What is the strongest response?",
      "choices": [
        "Ask the visitor to wait with an administrator while the licensing office verifies their name and assignment.",
        "Permit the visitor to inspect common areas while withholding classrooms until the director returns.",
        "Check official credentials promptly, confirm through the regional office if necessary, and allow lawful access.",
        "Request an emailed inspection notice and a formal appointment before providing children’s records.",
        "Ask the visitor to show a government ID, then let them inspect rooms without recording their arrival or purpose."
      ],
      "answer": "C",
      "rationale": "An LPA visit can be unannounced; verify credentials and facilitate authorized inspection without sacrificing child safety.",
      "feedback": {
        "A": {
          "type": "acceptable",
          "text": "A quick verification is appropriate if conducted without obstructing legitimate unannounced access."
        },
        "B": {
          "type": "review",
          "text": "An authentic analyst’s lawful access cannot be conditioned on the director’s convenience."
        },
        "C": {
          "type": "preferred",
          "text": "An LPA visit can be unannounced; verify credentials and facilitate authorized inspection without sacrificing child safety."
        },
        "D": {
          "type": "review",
          "text": "CCL inspections can be unannounced; advance notice is not a universal prerequisite."
        },
        "E": {
          "type": "review",
          "text": "Identity checks help, but the facility should follow its complete verification and visitor process."
        }
      },
      "family": "c3-o2",
      "acceptable": {
        "A": "A quick verification is appropriate if conducted without obstructing legitimate unannounced access."
      },
      "refs": [
        "secure2026",
        "inspect101200"
      ]
    },
    {
      "id": "C3Q10",
      "chapter": 3,
      "objective": 2,
      "scenario": "A field trip will include an autistic child with an individualized elopement plan. Staff have a van, two caregivers and several transitions between locations. What is the strongest plan?",
      "choices": [
        "Schedule an earlier departure to reduce crowds and place a second adult near bus doors at each stop.",
        "Cancel the child’s participation until they have completed a therapy program for following adult directions.",
        "Assign a familiar caregiver to stay beside the child on the outing while the driver handles the other children.",
        "Review the child’s elopement plan, secure transportation roles, and verify restraints and headcounts at transitions.",
        "Obtain family approval for the trip and allow the child to use a wearable location tracker as the main safeguard."
      ],
      "answer": "D",
      "rationale": "Transportation supervision must address driver eligibility, safe restraints, roster control, and repeated counts.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Reduced crowds can help, but safe transport also requires full restraint, staffing and attendance procedures."
        },
        "B": {
          "type": "review",
          "text": "Automatic disability-based exclusion is not an individualized review of reasonable modifications."
        },
        "C": {
          "type": "review",
          "text": "A familiar adult may help, but the driver cannot replace qualified group supervision or repeated headcounts."
        },
        "D": {
          "type": "preferred",
          "text": "Transportation supervision must address driver eligibility, safe restraints, roster control, and repeated counts."
        },
        "E": {
          "type": "review",
          "text": "Permission and a tracker can supplement but never replace active supervision and transport safeguards."
        }
      },
      "family": "c3-o2",
      "acceptable": {},
      "refs": [
        "ada2026",
        "transport",
        "supervision"
      ]
    },
    {
      "id": "C3Q11",
      "chapter": 3,
      "objective": 3,
      "scenario": "During a surprise compliance walk, a director finds a cleaning spray accessible to children, a damaged stair gate, and no updated emergency contact list. Which actions belong in the response? Select ALL that apply.",
      "choices": [
        "Keep the affected room open under increased observation until the next scheduled maintenance visit.",
        "Update emergency contacts and assign documented repair owners, deadlines and rechecks.",
        "Ask staff to omit the defects from future logs because the supervisor has already noticed them.",
        "Revise daily opening inspections to catch similar hazards before they threaten children.",
        "Secure the cleaning chemical and physically prevent access to the damaged gate immediately."
      ],
      "answer": "B|D|E",
      "rationale": "Respond to immediate hazards, implement documented corrections, and strengthen the system that should have found them sooner.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Observation does not make a reachable chemical or damaged barrier safe."
        },
        "B": {
          "type": "preferred",
          "text": "A corrective action plan needs measurable completion, not only a promise."
        },
        "C": {
          "type": "review",
          "text": "Concealing defects weakens safety management and truthful records."
        },
        "D": {
          "type": "preferred",
          "text": "Prevention requires changing the process that failed to find the defects."
        },
        "E": {
          "type": "preferred",
          "text": "Immediate physical hazards cannot wait for the next inspection cycle."
        }
      },
      "family": "c3-o3",
      "acceptable": {},
      "refs": [
        "buildings",
        "disaster"
      ],
      "answerSet": [
        "B",
        "D",
        "E"
      ],
      "multi": true
    },
    {
      "id": "C3Q12",
      "chapter": 3,
      "objective": 3,
      "scenario": "An enrollment coordinator claims a new staff member can count in the teacher-child ratio because she has completed orientation, although the director has not checked educational qualifications. What should happen next?",
      "choices": [
        "Verify role-specific eligibility and staffing rules before counting the employee toward required supervision.",
        "Treat the new hire as a teacher during a temporary onboarding period because they completed orientation.",
        "Assign the new hire to a mixed-age group where more experienced staff are present, then reassess after a week.",
        "Ask the licensing analyst whether the new employee can qualify by experience while they begin classroom coverage.",
        "Use the employee in an approved aide role while the director reviews their transcripts and experience."
      ],
      "answer": "A",
      "rationale": "Correct ratio planning depends on the employee’s actual qualifications and role, not a generic orientation checklist.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "Correct ratio planning depends on the employee’s actual qualifications and role, not a generic orientation checklist."
        },
        "B": {
          "type": "review",
          "text": "Orientation does not substitute for required educational and experience qualifications."
        },
        "C": {
          "type": "review",
          "text": "The ages and setting may impose different rules; a supervised placement still requires proper authorization."
        },
        "D": {
          "type": "review",
          "text": "Seeking guidance is prudent, but do not assign a qualifying role before eligibility is confirmed."
        },
        "E": {
          "type": "acceptable",
          "text": "An aide role may be appropriate if all clearance, supervision and ratio requirements are verified first."
        }
      },
      "family": "c3-o3",
      "acceptable": {
        "E": "An aide role may be appropriate if all clearance, supervision and ratio requirements are verified first."
      },
      "refs": [
        "ratio",
        "supervision"
      ]
    },
    {
      "id": "C4Q01",
      "chapter": 4,
      "objective": 1,
      "scenario": "A child is transported by ambulance to an emergency department. The parent repeatedly says, “I am not coming,” and your caregiver cannot remain indefinitely because the center needs qualified coverage. As director, what is best?",
      "choices": [
        "Direct a cleared staff member to remain until closing and ask the parent to sign an emergency care extension.",
        "Coordinate a lawful handoff with the hospital and authorized contacts while preserving center supervision.",
        "Notify child welfare immediately of abandonment while asking hospital staff to retain responsibility for the child.",
        "Ask hospital social work to coordinate discharge and tell the assigned caregiver to return to the center promptly.",
        "Arrange transport for the parent and tell the hospital that the pickup problem is solved once a ride is booked."
      ],
      "answer": "B",
      "rationale": "A hospital handoff does not erase responsibility for accurate information and safe coordination. A parent’s refusal requires fact-specific assessment, not automatic conclusions.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "A staffing extension may be needed but does not by itself resolve parental refusal or licensing duties."
        },
        "B": {
          "type": "preferred",
          "text": "A hospital handoff does not erase responsibility for accurate information and safe coordination. A parent’s refusal requires fact-specific assessment, not automatic conclusions."
        },
        "C": {
          "type": "review",
          "text": "A report may be appropriate on the facts, but refusal alone does not automatically establish legal abandonment."
        },
        "D": {
          "type": "acceptable",
          "text": "Social work may help, but the director must verify a lawful safe handoff and any ongoing responsibility."
        },
        "E": {
          "type": "review",
          "text": "Transportation support may help, but a scheduled ride does not ensure the child has a safe discharge plan."
        }
      },
      "family": "c4-o1",
      "acceptable": {
        "D": "Social work may help, but the director must verify a lawful safe handoff and any ongoing responsibility."
      },
      "refs": [
        "report101212",
        "pen11166",
        "supervision"
      ]
    },
    {
      "id": "C4Q02",
      "chapter": 4,
      "objective": 1,
      "scenario": "A non-speaking autistic child with a documented seizure disorder becomes unresponsive and then confused. Staff disagree about what they witnessed. What should the director do?",
      "choices": [
        "Preserve the available video for the neurologist and limit the incident report to facts staff directly observed.",
        "Allow the child to rest in a quiet area under supervision while staff gather more descriptions of the episode.",
        "Follow the seizure action plan, obtain indicated help, record observations and support the child’s communication.",
        "Call the parent for permission before using the documented emergency plan if the child is no longer convulsing.",
        "Ask the trained first-aid lead to evaluate symptoms and initiate the plan only when another adult confirms them."
      ],
      "answer": "C",
      "rationale": "The director coordinates an emergency response based on observed signs and written procedures; unqualified speculation is not a care plan.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Evidence may aid clinicians, but it is not a substitute for immediate care and appropriate family communication."
        },
        "B": {
          "type": "review",
          "text": "Rest and observation may be helpful after the event but cannot replace the prescribed seizure response."
        },
        "C": {
          "type": "preferred",
          "text": "The director coordinates an emergency response based on observed signs and written procedures; unqualified speculation is not a care plan."
        },
        "D": {
          "type": "review",
          "text": "When emergency criteria are met, acting on the authorized plan should not be delayed for an unnecessary call."
        },
        "E": {
          "type": "review",
          "text": "A second observation can help records, but it should not delay a needed response under the plan."
        }
      },
      "family": "c4-o1",
      "acceptable": {},
      "refs": [
        "aap",
        "health",
        "supervision",
        "observation101226"
      ]
    },
    {
      "id": "C4Q03",
      "chapter": 4,
      "objective": 2,
      "scenario": "A child with a severe allergy may have eaten an unsafe snack. A staff member says the child looks fine, but another notices wheezing and distress. What is the director’s action?",
      "choices": [
        "Remove the snack, monitor symptoms continuously and call the child’s physician for medication advice.",
        "Ask another trained adult to retrieve the child’s plan while the director waits to see whether wheezing persists.",
        "Call 911 immediately and have staff collect the allergy plan, but postpone parent notice until the child is stable.",
        "Activate the emergency allergy plan and emergency services promptly, with trained care and clear documentation.",
        "Ask the trained employee to assess breathing and give the authorized rescue medication while the director calls family."
      ],
      "answer": "D",
      "rationale": "Breathing symptoms following possible allergen exposure can be urgent; emergency action cannot wait for a parent to arrive.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Clinical advice may be useful, but wheezing after suspected exposure warrants immediate emergency action."
        },
        "B": {
          "type": "review",
          "text": "Retrieving the plan is necessary but emergency action should begin without waiting for symptoms to worsen."
        },
        "C": {
          "type": "acceptable",
          "text": "Emergency response is appropriate; the authorized representative also needs timely communication."
        },
        "D": {
          "type": "preferred",
          "text": "Breathing symptoms following possible allergen exposure can be urgent; emergency action cannot wait for a parent to arrive."
        },
        "E": {
          "type": "review",
          "text": "This could be part of correct care, but emergency services and the full action plan must not be deferred."
        }
      },
      "family": "c4-o2",
      "acceptable": {
        "C": "Emergency response is appropriate; the authorized representative also needs timely communication."
      },
      "refs": [
        "aap",
        "health"
      ]
    },
    {
      "id": "C4Q04",
      "chapter": 4,
      "objective": 2,
      "scenario": "A newly hired caregiver wants to give a medication based on the parent’s text message, but the signed orders and staff authorization are incomplete.",
      "choices": [
        "Contact the parent and prescribing clinician to obtain the missing requirements before any routine administration.",
        "Call licensing before providing the medication and record the analyst’s verbal advice as sufficient authority.",
        "Use the parent’s text as interim consent because it documents the family’s intent and contains a dosage.",
        "Have the experienced lead caregiver supervise the new employee while the medication is administered.",
        "Pause unauthorized administration, verify written orders and qualified staff, and escalate urgent health needs safely."
      ],
      "answer": "E",
      "rationale": "A director verifies authority and safe procedure without improvising medical care.",
      "feedback": {
        "A": {
          "type": "acceptable",
          "text": "This may be appropriate, but the director also must manage safe interim storage and urgent health concerns."
        },
        "B": {
          "type": "review",
          "text": "Agency consultation may help clarify policy; it does not automatically replace the required care plan or order."
        },
        "C": {
          "type": "review",
          "text": "A text is not necessarily the required authorization or medication instruction under program rules."
        },
        "D": {
          "type": "review",
          "text": "Supervision cannot replace required written authorization, qualifications or training."
        },
        "E": {
          "type": "preferred",
          "text": "A director verifies authority and safe procedure without improvising medical care."
        }
      },
      "family": "c4-o2",
      "acceptable": {
        "A": "This may be appropriate, but the director also must manage safe interim storage and urgent health concerns."
      },
      "refs": [
        "health",
        "naeyc"
      ]
    },
    {
      "id": "C4Q05",
      "chapter": 4,
      "objective": 3,
      "scenario": "During an ER handoff, the caregiver describes an autistic child as “difficult and aggressive.” The clinician needs a reliable symptom history. What should you direct the caregiver to do?",
      "choices": [
        "Give the clinician a factual timeline, treatment history, allergies and the child’s communication supports.",
        "Summarize the child’s autism support plan and describe the last behavior that staff considered unusual.",
        "Let the parent explain the child’s usual behavior and restrict staff input to what happened during transport.",
        "Explain that the child has been agitated, then ask clinicians to interpret whether the agitation is medical.",
        "Provide the signed emergency action plan and tell clinicians the child does not reliably answer spoken questions."
      ],
      "answer": "A",
      "rationale": "Objective handoffs help clinicians and preserve dignity and communication access.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "Objective handoffs help clinicians and preserve dignity and communication access."
        },
        "B": {
          "type": "review",
          "text": "Support context matters, but the medical history and actual physical symptoms must also be conveyed."
        },
        "C": {
          "type": "review",
          "text": "Parent expertise is important, but staff observations before transport can be crucial to treatment."
        },
        "D": {
          "type": "review",
          "text": "A general label can obscure important onset, behavior and symptom details that staff directly witnessed."
        },
        "E": {
          "type": "acceptable",
          "text": "These details help, but staff should also give the observed timeline, symptoms and interventions."
        }
      },
      "family": "c4-o3",
      "acceptable": {
        "E": "These details help, but staff should also give the observed timeline, symptoms and interventions."
      },
      "refs": [
        "ada2026",
        "health"
      ]
    },
    {
      "id": "C4Q06",
      "chapter": 4,
      "objective": 3,
      "scenario": "A substitute is not briefed about an autistic child’s elopement plan. A gate is found unlatched, but the child remained within supervision and did not leave. What should the director do?",
      "choices": [
        "Document the near miss and submit an unusual incident report automatically because an elopement plan exists.",
        "Secure the gate, rebrief staff on the elopement plan and document, review and correct the handoff failure.",
        "Tell the substitute to review all files before the next shift and make them responsible for locating safety plans.",
        "Ask the family whether the child can skip outdoor activities until every substitute is trained.",        "Assign a familiar adult to the child during outdoor play and check the gate before every transition."
      ],
      "answer": "B",
      "rationale": "Near misses are an opportunity to change systems before an injury occurs.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "A plan’s existence alone does not establish that a reportable unusual incident occurred; assess actual threat and rules."
        },
        "B": {
          "type": "preferred",
          "text": "Near misses are an opportunity to change systems before an injury occurs."
        },
        "C": {
          "type": "review",
          "text": "Individual accountability matters, but leadership must provide a reliable high-priority handoff process."
        },
        "D": {
          "type": "review",
          "text": "Blanket exclusion can deny access; supervisors should build safe coverage and reasonable supports."
        },
        "E": {
          "type": "review",
          "text": "Additional direct support is useful, but a missing plan handoff and broken access control still need correction."
        }
      },
      "family": "c4-o3",
      "acceptable": {},
      "refs": [
        "ada2026",
        "supervision",
        "report101212"
      ]
    },
    {
      "id": "C4Q07",
      "chapter": 4,
      "objective": 1,
      "scenario": "A parent is two hours late to collect a child, cannot be reached, and the facility is approaching closing time. What should the director do?",
      "choices": [
        "Apply the center’s late fee immediately and tell the family the child must leave before the last employee clocks out.",
        "Call law enforcement at the scheduled closing time while the classroom staff leave the child in the office.",
        "Maintain qualified supervision, contact approved adults, document attempts and escalate a genuine safety concern.",
        "Authorize a familiar teacher to drive the child home after leaving a voicemail for the parent.",
        "Ask a previously authorized contact to collect the child and complete ordinary sign-out once identity is confirmed."
      ],
      "answer": "C",
      "rationale": "An uncollected child needs safe supervision, verified contacts, documentation and a defined escalation route, even after normal closing.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Contract consequences do not eliminate the center’s duty to supervise the child safely."
        },
        "B": {
          "type": "review",
          "text": "An emergency referral may become appropriate, but the child cannot be left without qualified supervision."
        },
        "C": {
          "type": "preferred",
          "text": "An uncollected child needs safe supervision, verified contacts, documentation and a defined escalation route, even after normal closing."
        },
        "D": {
          "type": "review",
          "text": "Familiarity does not establish approved transport, release or consent."
        },
        "E": {
          "type": "acceptable",
          "text": "This may solve the pickup problem, provided authorization and supervision remain intact."
        }
      },
      "family": "c4-o1",
      "acceptable": {
        "E": "This may solve the pickup problem, provided authorization and supervision remain intact."
      },
      "refs": [
        "signout",
        "supervision"
      ]
    },
    {
      "id": "C4Q08",
      "chapter": 4,
      "objective": 1,
      "scenario": "A child returns after illness with no fever, but arrives lethargic and repeatedly struggles to stay awake. A parent says the temperature check proves the child may stay. What is the supervisor's response?",
      "choices": [
        "Accept the child provisionally and require the parent to answer calls if symptoms worsen during the morning.",
        "Move the child to a quiet rest area with close supervision and reassess before deciding whether attendance is safe.",
        "Ask the parent for a signed statement that the child is well enough to attend despite the reported fatigue.",
        "Assess the child’s condition under health protocols, seek appropriate help, and document the response.",
        "Provide an adapted low-activity schedule so the child can participate without being required to remain alert."
      ],
      "answer": "D",
      "rationale": "Illness decisions require observed symptoms, current health policy, and proportionate escalation, not fever alone.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "A normal temperature does not eliminate significant lethargy or an immediate health assessment."
        },
        "B": {
          "type": "acceptable",
          "text": "Temporary observation may be appropriate, but urgent symptoms require prompt evaluation and possible escalation."
        },
        "C": {
          "type": "review",
          "text": "A parent’s assurance does not override observed health concerns or facility illness policies."
        },
        "D": {
          "type": "preferred",
          "text": "Illness decisions require observed symptoms, current health policy, and proportionate escalation, not fever alone."
        },
        "E": {
          "type": "review",
          "text": "Adapting activities cannot substitute for evaluating unusual lethargy and possible medical danger."
        }
      },
      "family": "c4-o1",
      "acceptable": {
        "B": "Temporary observation may be appropriate, but urgent symptoms require prompt evaluation and possible escalation."
      },
      "refs": [
        "health",
        "supervision",
        "observation101226"
      ]
    },
    {
      "id": "C4Q09",
      "chapter": 4,
      "objective": 2,
      "scenario": "A staff member discovers that a substitute has not seen a child's allergy action plan, and the child's snack is about to be served. What is the first priority?",
      "choices": [
        "Use the family-approved menu from the prior week and notify parents that a substitute is present.",
        "Delay only the affected child’s snack until a safe item and an authorized adult are verified.",
        "Ask the substitute to follow general allergy protocols and document any incident if symptoms appear.",
        "Ask a trained veteran teacher to monitor the snack while the substitute learns the allergy plan afterward.",
        "Verify the written allergy plan and safe snack, brief the substitute, and check emergency readiness first."
      ],
      "answer": "E",
      "rationale": "Before potentially unsafe food is served, verify the individualized plan and communicate it to those providing care.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Menus may have changed, and the substitute needs the current individualized allergy instructions."
        },
        "B": {
          "type": "acceptable",
          "text": "This may be a temporary safety step, but the director still needs the written plan and a clear staff handoff."
        },
        "C": {
          "type": "review",
          "text": "General protocols cannot replace a known child-specific plan and precautions before exposure."
        },
        "D": {
          "type": "review",
          "text": "A trained teacher may provide coverage but the child’s immediate meal and the substitute’s role still need clarity."
        },
        "E": {
          "type": "preferred",
          "text": "Before potentially unsafe food is served, verify the individualized plan and communicate it to those providing care."
        }
      },
      "family": "c4-o2",
      "acceptable": {
        "B": "This may be a temporary safety step, but the director still needs the written plan and a clear staff handoff."
      },
      "refs": [
        "aap",
        "health"
      ]
    },
    {
      "id": "C4Q10",
      "chapter": 4,
      "objective": 2,
      "scenario": "The fire alarm sounds during a drill. A preschool child with mobility needs is in a room whose exit is temporarily obstructed by stored furniture. What should the director prioritize?",
      "choices": [
        "Use an accessible safe route and assigned assistance, then correct the obstruction and rehearse the plan.",
        "Move children into the hallway to avoid the blocked doorway and finish the drill from that location.",
        "Have the assigned adult assist the child through the alternative exit while the supervisor checks group accountability.",
        "Pause the drill until facilities clears the main exit, leaving everyone assembled in the classroom.",
        "Carry the child immediately using any available adult, even though staff have not reviewed transfer safety."
      ],
      "answer": "A",
      "rationale": "An emergency plan must account for individual access needs, clear exits, assigned roles, and lessons from drills.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "An emergency plan must account for individual access needs, clear exits, assigned roles, and lessons from drills."
        },
        "B": {
          "type": "review",
          "text": "A hallway may not be a safe final evacuation route and does not resolve the accessibility failure."
        },
        "C": {
          "type": "acceptable",
          "text": "This can be appropriate if the alternative is verified safe and the obstruction is also corrected afterward."
        },
        "D": {
          "type": "review",
          "text": "In a real alarm, delay can be dangerous; drills must practice a workable alternate route."
        },
        "E": {
          "type": "review",
          "text": "Unplanned carrying can create avoidable injury; use trained support and the individualized evacuation plan."
        }
      },
      "family": "c4-o2",
      "acceptable": {
        "C": "This can be appropriate if the alternative is verified safe and the obstruction is also corrected afterward."
      },
      "refs": [
        "disaster",
        "ada"
      ]
    },
    {
      "id": "C4Q11",
      "chapter": 4,
      "objective": 3,
      "scenario": "A child with a medical support plan is transported by ambulance while the director must keep the rest of the center running. Which actions belong in the director's plan? Select ALL that apply.",
      "choices": [
        "Provide responders with accurate, relevant health information and authorized emergency instructions.",
        "Release all qualified staff to accompany the child because emergency care takes priority over the center.",
        "Arrange continuing center coverage, authorized family communication and contemporaneous records.",
        "Delay incident documentation until the hospital issues its final diagnosis to avoid contradicting clinicians.",
        "Evaluate whether licensing, child-protection or other distinct reports apply on their own timelines."
      ],
      "answer": "A|C|E",
      "rationale": "A medical emergency demands a child-specific response and a center-wide coordination plan, including independent reporting decisions.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "Timely factual handoffs support appropriate clinical care."
        },
        "B": {
          "type": "review",
          "text": "Other children still require compliant supervision."
        },
        "C": {
          "type": "preferred",
          "text": "The director manages two concurrent care responsibilities."
        },
        "D": {
          "type": "review",
          "text": "Observed facts should be documented promptly even when diagnosis is uncertain."
        },
        "E": {
          "type": "preferred",
          "text": "Each reporting rule has its own trigger; one notice does not automatically satisfy all duties."
        }
      },
      "family": "c4-o3",
      "acceptable": {},
      "refs": [
        "report101212",
        "health",
        "supervision"
      ],
      "answerSet": [
        "A",
        "C",
        "E"
      ],
      "multi": true
    },
    {
      "id": "C4Q12",
      "chapter": 4,
      "objective": 3,
      "scenario": "At a field trip transition, a child is missing from supervision and later found unharmed near the bus. A staff member says no report is needed because nobody was injured. What should the director do?",
      "choices": [
        "Call the family to describe that the child was located safely, then file only if the parent requests a formal report.",
        "Ask the group leader to write a statement and report after the director confirms whether any injury occurred.",
        "Confirm safety, notify required parties and promptly file the applicable incident report, then correct the system.",
        "File an LIC 624 and note that quick recovery prevents any potential licensing citation for the temporary absence.",
        "Record the temporary absence in the field-trip log and ask staff to repeat headcounts at the next outing."
      ],
      "answer": "C",
      "rationale": "Treat a missing-child near miss as a serious systems-learning opportunity, with appropriate safety and reporting review.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Parent preference does not determine licensing reportability after a threatening child absence."
        },
        "B": {
          "type": "review",
          "text": "A reportable absence threatening safety does not require injury, and required notice has deadlines."
        },
        "C": {
          "type": "preferred",
          "text": "Treat a missing-child near miss as a serious systems-learning opportunity, with appropriate safety and reporting review."
        },
        "D": {
          "type": "review",
          "text": "Reporting is essential, but it does not automatically excuse inadequate supervision or prevent a citation."
        },
        "E": {
          "type": "review",
          "text": "Internal records do not replace external reporting when a child was missing from supervision."
        }
      },
      "family": "c4-o3",
      "acceptable": {},
      "refs": [
        "report101212",
        "incident624",
        "supervision",
        "cclreports"
      ]
    },
    {
      "id": "C5Q01",
      "chapter": 5,
      "objective": 1,
      "scenario": "An employee has been late six times in a month. Each late arrival forces another teacher to stay and sometimes puts staffing close to a violation.",
      "choices": [
        "Ask the employee’s coworkers to document each late arrival and decide whether formal action is deserved.",
        "Reduce the employee’s opening duties for a month while you observe whether the pattern improves voluntarily.",
        "Begin progressive discipline under policy while asking staff to absorb late arrivals for the rest of the month.",
        "Review verified attendance privately, provide a clear improvement plan, and secure reliable backup coverage.",
        "Offer a shift exchange if another qualified person agrees and document measurable arrival expectations."
      ],
      "answer": "D",
      "rationale": "The director must manage immediate coverage and a repeat performance issue, while applying fair procedures and measuring improvement.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Coworkers should not be responsible for personnel discipline or its confidential evidence review."
        },
        "B": {
          "type": "review",
          "text": "A change in duties may help but cannot excuse recurring coverage gaps without a clear plan and follow-up."
        },
        "C": {
          "type": "review",
          "text": "Accountability matters, but unsafe or inequitable coverage cannot continue while discipline proceeds."
        },
        "D": {
          "type": "preferred",
          "text": "The director must manage immediate coverage and a repeat performance issue, while applying fair procedures and measuring improvement."
        },
        "E": {
          "type": "acceptable",
          "text": "A feasible adjustment could help, but it needs a broader attendance review and contingency coverage."
        }
      },
      "family": "c5-o1",
      "acceptable": {
        "E": "A feasible adjustment could help, but it needs a broader attendance review and contingency coverage."
      },
      "refs": [
        "naeyc",
        "ratio",
        "daffron"
      ]
    },
    {
      "id": "C5Q02",
      "chapter": 5,
      "objective": 1,
      "scenario": "During a noisy transition, an autistic child becomes overwhelmed. A veteran teacher favors removing the child from the activity; a new aide suggests sensory supports. What should the director do?",
      "choices": [
        "Use the experienced teacher’s classroom-management method for one week and let the new aide collect data.",
        "Ask the family to choose one staff member’s approach, then instruct everyone to follow that choice.",
        "Let the child opt out of the noisiest transition and introduce gradual supported participation afterward.",
        "Provide all staff a sensory-support workshop and postpone direct observation until everyone completes training.",
        "Observe the trigger, review the child’s support plan and coach staff on an individualized de-escalation approach."
      ],
      "answer": "E",
      "rationale": "Strong supervision uses observed needs, professional input, and clear roles rather than treating disagreement as disloyalty.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Tenure does not establish which strategy meets the child’s needs or personal-rights requirements."
        },
        "B": {
          "type": "review",
          "text": "Parent input is essential, but directors remain responsible for safe, lawful supervision."
        },
        "C": {
          "type": "acceptable",
          "text": "This could help sensory regulation if included in an individualized plan, but needs observation and a whole-team approach."
        },
        "D": {
          "type": "review",
          "text": "Training helps but immediate behavior, context and child-specific safety still need review."
        },
        "E": {
          "type": "preferred",
          "text": "Strong supervision uses observed needs, professional input, and clear roles rather than treating disagreement as disloyalty."
        }
      },
      "family": "c5-o1",
      "acceptable": {
        "C": "This could help sensory regulation if included in an individualized plan, but needs observation and a whole-team approach."
      },
      "refs": [
        "ada2026",
        "naeyc"
      ]
    },
    {
      "id": "C5Q03",
      "chapter": 5,
      "objective": 2,
      "scenario": "A child with a documented severe food allergy attends a half-day public school program. The school rejects the allergist’s emergency plan and sends the child back to your center without a reliable medication handoff. What should the director do?",
      "choices": [
        "Accept the child without confirming medication because the school remains responsible.",
        "Ask the family to keep the child home indefinitely until the agencies agree.",
        "Coordinate a written, workable emergency and medication handoff with the family and responsible professionals, protect the child immediately, and evaluate reporting obligations if harm or neglect is suspected.",
        "Ask the preschool teacher to rewrite the allergist’s orders so the school will accept them.",
        "Stop documenting school communications to avoid becoming involved in the dispute."
      ],
      "answer": "C",
      "rationale": "The child needs a reliable, individualized emergency plan and authorized medication procedures across settings; the director must not improvise medical orders.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Sending the child into care without verified emergency medicine or an actionable plan creates a foreseeable anaphylaxis response gap."
        },
        "B": {
          "type": "review",
          "text": "Indefinite exclusion shifts responsibility to the family without first attempting individualized coordination and appropriate accommodations."
        },
        "C": {
          "type": "preferred",
          "text": "The child needs a reliable, individualized emergency plan and authorized medication procedures across settings; the director must not improvise medical orders."
        },
        "D": {
          "type": "review",
          "text": "A teacher must not alter an allergist’s medical orders. Seek authorized clarification from the clinician and receiving program."
        },
        "E": {
          "type": "review",
          "text": "Stopping documentation destroys the shared factual timeline needed to fix a failed emergency-medication handoff."
        }
      },
      "family": "c5-o2",
      "acceptable": {},
      "refs": [
        "ada",
        "supervision",
        "daffron"
      ]
    },
    {
      "id": "C5Q04",
      "chapter": 5,
      "objective": 2,
      "scenario": "A preschool child who uses AAC and needs additional supervision is repeatedly excluded from field trips because staff “do not have time for that.”",
      "choices": [
        "Shorten the child’s outing to one stop and require the family to approve the modified schedule.",
        "Assess individualized risks, AAC access and support staffing, then plan and verify meaningful participation.",
        "Request a volunteer aide from the family to accompany the child as a condition of joining this trip.",
        "Offer the child an alternative activity on campus while other children attend the outing.",
        "Assign a trained caregiver and rehearse transitions with the child, then confirm full-group safety procedures."
      ],
      "answer": "B",
      "rationale": "Directors should solve real safety and resource constraints without treating disability as automatic disqualification.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Reduced duration may be helpful if individualized, but unilateral participation limits need justification."
        },
        "B": {
          "type": "preferred",
          "text": "Directors should solve real safety and resource constraints without treating disability as automatic disqualification."
        },
        "C": {
          "type": "review",
          "text": "An assistant could be useful but cannot be imposed automatically without an individualized ADA assessment."
        },
        "D": {
          "type": "review",
          "text": "An alternative may be needed in exceptional circumstances, but not as a routine disability-based exclusion."
        },
        "E": {
          "type": "acceptable",
          "text": "Preparation is valuable, but the director must also verify the broader access and accommodation decision."
        }
      },
      "family": "c5-o2",
      "acceptable": {
        "E": "Preparation is valuable, but the director must also verify the broader access and accommodation decision."
      },
      "refs": [
        "ada2026",
        "supervision"
      ]
    },
    {
      "id": "C5Q05",
      "chapter": 5,
      "objective": 3,
      "scenario": "A surprise inspection identifies the same food-storage and emergency-handoff deficiencies that were supposedly fixed by last month’s staff memo.",
      "choices": [
        "Repeat the staff memo with examples from the inspection and require a signed acknowledgement from each classroom.",
        "Ask the licensing analyst for an extension while staff complete a revised online refresher.",
        "Assign owners and deadlines, observe the corrected process, and verify that compliance lasts beyond training.",
        "Install a daily checklist with supervisor initials and compare it against actual room conditions each week.",
        "Hold employees accountable for repeat findings after confirming the prior memo was delivered to them."
      ],
      "answer": "C",
      "rationale": "Training completion and memos are not evidence of competence or durable change; evaluate actual behavior and outcomes.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Acknowledgement proves receipt, not actual corrected food and emergency practices."
        },
        "B": {
          "type": "review",
          "text": "An extension might help schedules but not eliminate current safety hazards or duties."
        },
        "C": {
          "type": "preferred",
          "text": "Training completion and memos are not evidence of competence or durable change; evaluate actual behavior and outcomes."
        },
        "D": {
          "type": "acceptable",
          "text": "A check-and-audit process may be strong, but actual corrective ownership and staff practice still matter."
        },
        "E": {
          "type": "review",
          "text": "Accountability is necessary when warranted, but the program must also repair systems that fail repeatedly."
        }
      },
      "family": "c5-o3",
      "acceptable": {
        "D": "A check-and-audit process may be strong, but actual corrective ownership and staff practice still matter."
      },
      "refs": [
        "health",
        "daffron"
      ]
    },
    {
      "id": "C5Q06",
      "chapter": 5,
      "objective": 3,
      "scenario": "Your final program review finds that nearly all directors passed the online quiz, but several still mishandle a role-played suspected-abuse report. What can legitimately be concluded?",
      "choices": [
        "Replace the knowledge quiz with scenarios only, then use performance on the final scenario as proof of readiness.",
        "Ask each learner to explain the correct reporting rule in writing and repeat the explanation until fluent.",
        "Increase the passing score for the next group, since more rigorous testing should prevent reporting mistakes.",
        "Treat quiz success as partial learning, reteach the response and evaluate unassisted performance later.",
        "Keep the course unchanged but assign a qualified mentor to supervise each new director’s first report."
      ],
      "answer": "D",
      "rationale": "Scenario feedback is not sufficient proof of mastery; use transfer-focused evaluation and refine the instruction and workplace supports.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Simulation is useful but one pass cannot establish retained workplace performance over time."
        },
        "B": {
          "type": "review",
          "text": "Written recall can reinforce knowledge but does not establish the ability to act during a real event."
        },
        "C": {
          "type": "review",
          "text": "A higher quiz threshold does not directly teach or demonstrate the missing real-world performance."
        },
        "D": {
          "type": "preferred",
          "text": "Scenario feedback is not sufficient proof of mastery; use transfer-focused evaluation and refine the instruction and workplace supports."
        },
        "E": {
          "type": "acceptable",
          "text": "Mentorship can help transfer, but the observed curriculum gap also requires instructional review."
        }
      },
      "family": "c5-o3",
      "acceptable": {
        "E": "Mentorship can help transfer, but the observed curriculum gap also requires instructional review."
      },
      "refs": [
        "daffron",
        "knowles"
      ]
    },
    {
      "id": "C5Q07",
      "chapter": 5,
      "objective": 1,
      "scenario": "A non-speaking preschooler uses an AAC device, but a substitute repeatedly removes it during transitions because it 'slows the class down.' What is the director's strongest response?",
      "choices": [
        "Reduce transition demands while the support team evaluates when AAC use would be most efficient.",
        "Require the substitute to keep the device nearby during transitions but not offer it unless the child asks first.",
        "Have the family train the substitute privately before the next shift while the device remains stored during class.",
        "Assign another employee to carry the device and interpret the child’s cues during group movement.",
        "Restore access to the AAC device and teach staff a transition routine that supports effective communication."
      ],
      "answer": "E",
      "rationale": "Supervision includes ensuring staff can implement an individualized communication support consistently.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Adapted routines can help, but convenience cannot justify withholding the communication aid."
        },
        "B": {
          "type": "review",
          "text": "A non-speaking child may need consistent access to initiate communication without an explicit request."
        },
        "C": {
          "type": "review",
          "text": "Family input may help, but the program must ensure ongoing access and staff competence now."
        },
        "D": {
          "type": "review",
          "text": "A support person may help, but the plan must protect the child’s own communication access and autonomy."
        },
        "E": {
          "type": "preferred",
          "text": "Supervision includes ensuring staff can implement an individualized communication support consistently."
        }
      },
      "family": "c5-o1",
      "acceptable": {},
      "refs": [
        "ada2026",
        "naeyc"
      ]
    },
    {
      "id": "C5Q08",
      "chapter": 5,
      "objective": 1,
      "scenario": "A training session receives excellent satisfaction ratings. Two weeks later, staff still omit key steps during an unannounced practice drill. What does the director know?",
      "choices": [
        "Revisit the actual task, coach weak steps and check performance again after a delay.",
        "Have supervisors observe one live drill and sign off once each employee can repeat the main steps.",
        "Reformat the slides into shorter lessons and let learners take the online test as many times as needed.",
        "Provide a quick-reference card for the missed steps and test staff in unannounced scenarios after practice.",
        "Expand the next presentation to cover the same content in greater detail, then repeat the satisfaction survey."
      ],
      "answer": "A",
      "rationale": "Confirmative evaluation examines retention and actual behavior after training, not just attendance or satisfaction.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "Confirmative evaluation examines retention and actual behavior after training, not just attendance or satisfaction."
        },
        "B": {
          "type": "review",
          "text": "Observation is useful, but one immediate demonstration may not establish later retained competence."
        },
        "C": {
          "type": "review",
          "text": "Improved accessibility is helpful, but repeated quiz scores alone do not demonstrate safe transfer."
        },
        "D": {
          "type": "acceptable",
          "text": "This is a strong approach if paired with diagnosis of the underlying gaps and appropriate coaching."
        },
        "E": {
          "type": "review",
          "text": "More information and higher ratings do not ensure staff can execute the required procedures."
        }
      },
      "family": "c5-o1",
      "acceptable": {
        "D": "This is a strong approach if paired with diagnosis of the underlying gaps and appropriate coaching."
      },
      "refs": [
        "daffron",
        "knowles"
      ]
    },
    {
      "id": "C5Q09",
      "chapter": 5,
      "objective": 2,
      "scenario": "An autistic child becomes distressed and strikes a caregiver. Staff propose isolating the child behind a closed door and withholding the AAC device until calm. A parent says to do whatever works. What should the director decide?",
      "choices": [
        "Remove the AAC tablet during aggression to protect it, then return it once the child communicates calmly.",
        "Reject punitive isolation and AAC removal; protect everyone and revise supports using the child’s plan.",
        "Offer a supervised calming space, reduce sensory demands and coordinate a functional support review with the family.",
        "Use a quiet room with a staff member guarding the doorway until the child complies with instructions.",
        "Ask the parent to sign consent for time-out behind a closed door before staff begin using the new procedure."
      ],
      "answer": "B",
      "rationale": "Removing a child’s AAC device to control behavior or isolating the child punitively can undermine communication, dignity, and personal rights. The supervisor should ensure immediate safety, provide appropriate regulation supports, and review an individualized plan with qualified staff and the family. Parental agreement alone does not authorize an unsafe or prohibited restraint or isolation practice.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Removing access to communication as a consequence can intensify distress and undermine disability access."
        },
        "B": {
          "type": "preferred",
          "text": "Removing a child’s AAC device to control behavior or isolating the child punitively can undermine communication, dignity, and personal rights. The supervisor should ensure immediate safety, provide appropriate regulation supports, and review an individualized plan with qualified staff and the family. Parental agreement alone does not authorize an unsafe or prohibited restraint or isolation practice."
        },
        "C": {
          "type": "acceptable",
          "text": "This can be appropriate, but the director must explicitly reject punitive restrictions and ensure whole-group safety."
        },
        "D": {
          "type": "review",
          "text": "A locked or enforced isolation practice may violate personal rights; a voluntary safe break is different."
        },
        "E": {
          "type": "review",
          "text": "Family agreement cannot authorize discipline that violates licensing personal-rights protections."
        }
      },
      "family": "c5-o2",
      "acceptable": {
        "C": "A supportive calming space and functional review are constructive, but the director must also expressly reject locking the child in or withholding AAC."
      },
      "refs": [
        "ada2026",
        "naeyc",
        "cdsslaw",
        "rights101223"
      ]
    },
    {
      "id": "C5Q10",
      "chapter": 5,
      "objective": 2,
      "scenario": "A parent insists that a child with a disability must be excluded from an upcoming outing because the group is 'too difficult' when the child attends. Staff have not tried the child's documented supports. What should the director do?",
      "choices": [
        "Move the outing to a less crowded destination and let all children attend, provided qualified ratios remain intact.",
        "Assign a trained adult and confirm transportation needs, then tell the family a separate aide is required if behavior continues.",
        "Make an individualized inclusion and safety plan, trying reasonable modifications before any exclusion decision.",
        "Invite the child for the shorter first half of the outing while staff evaluate whether longer attendance is realistic.",
        "Ask staff to repeat the child’s existing classroom plan on the trip without additional assessment."
      ],
      "answer": "C",
      "rationale": "Individualized planning and effective staff preparation support inclusion while addressing genuine safety constraints.",
      "feedback": {
        "A": {
          "type": "acceptable",
          "text": "Changing the setting may improve access but does not replace individual support and travel safety assessment."
        },
        "B": {
          "type": "review",
          "text": "Support may be needed, but an automatic family-paid aide rule is not an individualized ADA analysis."
        },
        "C": {
          "type": "preferred",
          "text": "Individualized planning and effective staff preparation support inclusion while addressing genuine safety constraints."
        },
        "D": {
          "type": "review",
          "text": "A trial may be defensible if tailored to the child; involuntary partial exclusion requires individualized justification."
        },
        "E": {
          "type": "review",
          "text": "Travel introduces new locations, transitions and risks that may need specific adjustments."
        }
      },
      "family": "c5-o2",
      "acceptable": {
        "A": "Changing the setting may improve access but does not replace individual support and travel safety assessment."
      },
      "refs": [
        "ada2026",
        "supervision"
      ]
    },
    {
      "id": "C5Q11",
      "chapter": 5,
      "objective": 3,
      "scenario": "A supervisor is revising annual training after an inspection identifies repeated problems in different classrooms. What should the redesign include? Select ALL that apply.",
      "choices": [
        "Assess whether resources, workload and supervisory support make the expected practice feasible.",
        "Translate each recurring deficiency into an observable objective and practice activity.",
        "Repeat the existing presentation and rely on acknowledgement signatures as proof of correction.",
        "Watch employees perform the task after training and record whether the same error returns.",
        "Avoid identifying persistent system defects in the evaluation because they might become discoverable."
      ],
      "answer": "A|B|D",
      "rationale": "Design objectives, practice and follow-up around demonstrated needs, then correct organizational barriers to transfer.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "Instruction alone cannot overcome broken tools or unworkable staffing."
        },
        "B": {
          "type": "preferred",
          "text": "Training should aim at the actual missed workplace performance."
        },
        "C": {
          "type": "review",
          "text": "Acknowledgement does not establish competence or sustained compliance."
        },
        "D": {
          "type": "preferred",
          "text": "Observed performance tests application rather than attendance."
        },
        "E": {
          "type": "review",
          "text": "Concealment prevents reliable problem solving and undermines accountability."
        }
      },
      "family": "c5-o3",
      "acceptable": {},
      "refs": [
        "daffron",
        "knowles"
      ],
      "answerSet": [
        "A",
        "B",
        "D"
      ],
      "multi": true
    },
    {
      "id": "C5Q12",
      "chapter": 5,
      "objective": 3,
      "scenario": "A director reviews the new course and sees that a learner answered every item correctly but mishandled a simulated child-pickup confrontation. How should completion be interpreted?",
      "choices": [
        "Assign the learner to observe an experienced director handling pickup conflicts and immediately authorize solo duty.",
        "Use the simulation to identify the specific missing step, rehearse it with feedback and later reassess it unprompted.",
        "Award completion because the learner met the question-count target, but recommend additional voluntary coaching.",
        "Require a second online attempt with shuffled choices before issuing any certificate of participation.",
        "Use the course as evidence of knowledge, coach the failed skill and confirm independent performance later."
      ],
      "answer": "E",
      "rationale": "Online decisions are a useful assessment layer, but live or observed performance completes the evidence of transfer.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Modeling is useful, but observed independent practice should precede reliance on the skill."
        },
        "B": {
          "type": "acceptable",
          "text": "This is an excellent focused plan when the course result is not mistaken for a professional license."
        },
        "C": {
          "type": "review",
          "text": "Completion can be recorded, yet the observed pickup failure deserves more than optional follow-up before relying on competence."
        },
        "D": {
          "type": "review",
          "text": "Another quiz may verify recall, but it may not correct the practical skill demonstrated poorly."
        },
        "E": {
          "type": "preferred",
          "text": "Online decisions are a useful assessment layer, but live or observed performance completes the evidence of transfer."
        }
      },
      "family": "c5-o3",
      "acceptable": {
        "B": "This is an excellent focused plan when the course result is not mistaken for a professional license."
      },
      "refs": [
        "daffron",
        "knowles",
        "signout"
      ]
    },
    {
      "id": "C2Q13",
      "chapter": 2,
      "objective": 2,
      "scenario": "A parent discovers that another parent livestreamed her child during a classroom visit. The public recording remains online, and the family demands action. What is the strongest initial response?",
      "choices": [
        "Stop further recording, document the incident, request removal, notify affected families appropriately, and review any licensing notification duty.",
        "Explain that the center’s signed photo release covers other parents recording during a classroom visit.",
        "Ask the visitor to remove the post, but avoid documenting the incident until the family files a formal complaint.",
        "Stop the recording, secure the classroom, and ask the visitor to remove the post before deciding what else is necessary.",
        "Call CPS immediately solely because an unauthorized recording of a child appeared online."
      ],
      "answer": "A",
      "rationale": "A facility photo release does not transfer publishing permission to other parents. Stop further exposure without seizing property, preserve evidence, contact affected families as appropriate, and assess whether any licensing notification is required. A privacy concern is not automatically a mandated CPS report. Visitor recording restrictions and facility photo-release agreements are facility policies; Title 22 does not itself create a universal ban on all parental photography.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "A facility photo release does not transfer publishing permission to other parents. Stop further exposure without seizing property, preserve evidence, contact affected families as appropriate, and assess whether any licensing notification is required. A privacy concern is not automatically a mandated CPS report. Visitor recording restrictions and facility photo-release agreements are facility policies; Title 22 does not itself create a universal ban on all parental photography."
        },
        "B": {
          "type": "review",
          "text": "A photo release authorizing the center’s activities does not independently authorize a visiting parent to broadcast another child online."
        },
        "C": {
          "type": "review",
          "text": "Requesting takedown helps, but waiting for a formal complaint can lose evidence and delay family communication and risk review."
        },
        "D": {
          "type": "acceptable",
          "text": "Stopping the recording and requesting removal are sound immediate steps, but the director must also document the incident and assess affected-family communication and applicable notifications."
        },
        "E": {
          "type": "review",
          "text": "Unauthorized livestreaming can violate privacy policy and implicate personal rights, but is not automatically reportable child abuse under CANRA."
        }
      },
      "family": "c2-o2",
      "acceptable": {
        "D": "Stopping the recording and requesting removal are sound immediate steps, but the director must also document the incident and assess affected-family communication and applicable notifications."
      },
      "refs": [
        "personalrights",
        "parentinspect",
        "supervision"
      ]
    },
    {
      "id": "C2Q14",
      "chapter": 2,
      "objective": 2,
      "scenario": "During a lawful classroom inspection, a parent records and questions another family’s four-year-old about a neighborhood dispute. The parent refuses to stop, citing inspection rights. What should the director do?",
      "choices": [
        "Tell all parents that inspections are suspended until a new visitor policy is approved.",
        "Intervene to protect the child, stop the questioning, offer a lawful inspection without the interference, and restrict access if conduct presents a risk.",
        "Have the classroom teacher take the parent to the office while the other children remain in free play.",
        "Allow the parent to finish because inspection rights include questioning anyone present.",
        "Separate the child from the visitor and move the conversation to reception, then follow up on the privacy incident."
      ],
      "answer": "B",
      "rationale": "The statutory right to inspect is not a general license to interrogate other children or interfere with their care. Apply conduct-based safety limits while preserving lawful inspection rights.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "One visitor’s misconduct does not justify suspending other families’ statutory inspection rights."
        },
        "B": {
          "type": "preferred",
          "text": "The statutory right to inspect is not a general license to interrogate other children or interfere with their care. Apply conduct-based safety limits while preserving lawful inspection rights."
        },
        "C": {
          "type": "review",
          "text": "Pulling the assigned teacher from an active classroom can break required supervision or staffing while the visitor continues to interfere."
        },
        "D": {
          "type": "review",
          "text": "Inspection rights do not authorize interrogating or recording an unrelated child about a private dispute."
        },
        "E": {
          "type": "acceptable",
          "text": "Separating the child and redirecting the visitor is protective; follow-up should also address documentation, the affected family, and any continuing risk."
        }
      },
      "family": "c2-o2",
      "acceptable": {
        "E": "Separating the child and redirecting the visitor is protective; follow-up should also address documentation, the affected family, and any continuing risk."
      },
      "refs": [
        "parentinspect",
        "personalrights",
        "supervision"
      ]
    },
    {
      "id": "C3Q13",
      "chapter": 3,
      "objective": 2,
      "scenario": "A parent signs out a preschooler but asks to wait in the active classroom for 45 minutes until a ride arrives. When offered reception seating, the parent invokes the right to inspect. What should the director do?",
      "choices": [
        "Explain that parents lose all inspection rights once their child is signed out.",
        "Permit the family to stay in the classroom if they remain near the doorway.",
        "Distinguish waiting from inspection, offer a suitable waiting area, and facilitate any genuine lawful inspection without disrupting care.",
        "Require an inspection appointment the following morning before allowing observation.",
        "Offer a brief, supervised observation and then explain the separate waiting-area policy."
      ],
      "answer": "C",
      "rationale": "A request to wait is not itself an inspection. A responsible parent has statutory inspection rights, subject to statutory conditions and child safety; a center may manage waiting, access and supervision without imposing blanket inspection hours.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "An enrolling parent does not automatically lose inspection rights merely because that family’s child was signed out."
        },
        "B": {
          "type": "review",
          "text": "Using an active classroom as a rideshare waiting room can disrupt routines and blur accountability for the signed-out child."
        },
        "C": {
          "type": "preferred",
          "text": "A request to wait is not itself an inspection. A responsible parent has statutory inspection rights, subject to statutory conditions and child safety; a center may manage waiting, access and supervision without imposing blanket inspection hours."
        },
        "D": {
          "type": "review",
          "text": "Requiring advance appointments for genuine parent inspections conflicts with the unannounced access right in Health and Safety Code § 1596.857."
        },
        "E": {
          "type": "acceptable",
          "text": "This accommodates an immediate observation and a waiting alternative, but the parent should also understand that the facility is not limiting statutory inspection rights."
        }
      },
      "family": "c3-o2",
      "acceptable": {
        "E": "This accommodates an immediate observation and a waiting alternative, but the parent should also understand that the facility is not limiting statutory inspection rights."
      },
      "refs": [
        "parentinspect",
        "parentrights",
        "supervision"
      ]
    },
    {
      "id": "C3Q14",
      "chapter": 3,
      "objective": 2,
      "scenario": "Four parents arrive together asking to inspect two preschool classrooms. Each classroom is at its minimum staffing ratio, and teachers cannot leave supervision. What is the best response?",
      "choices": [
        "Have the classroom teachers escort the parents while children work independently.",        "Verify identities and facilitate prompt, safe observation using available administrative coverage without diverting classroom teachers from supervision.",
        "Postpone all visits until the afternoon because several requests arrived together.",
        "Require a separate background-cleared escort for each parent as a condition of entry.",
        "Coordinate quiet observations in small groups while the director remains available and staff continue supervision."
      ],
      "answer": "B",
      "rationale": "Staff must maintain actual supervision and required ratios. A facility may organize access to avoid disruption, but should not impose an unreasonable delay or blanket restriction on lawful inspection. The law does not categorically require an escort for every inspection.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Teachers responsible for children cannot abandon active supervision to conduct visitor tours."
        },
        "B": {
          "type": "preferred",
          "text": "Staff must maintain actual supervision and required ratios. A facility may organize access to avoid disruption, but should not impose an unreasonable delay or blanket restriction on lawful inspection. The law does not categorically require an escort for every inspection."
        },
        "C": {
          "type": "review",
          "text": "The number of simultaneous requests alone is not grounds for refusing otherwise lawful unannounced inspection for half a day."
        },
        "D": {
          "type": "review",
          "text": "California law does not categorically require a separate background-cleared escort for every parent exercising inspection rights."
        },
        "E": {
          "type": "acceptable",
          "text": "Small-group observations can protect classroom routines, provided this does not become an arbitrary delay or denial of inspection rights."
        }
      },
      "family": "c3-o2",
      "acceptable": {
        "E": "Small-group observations can protect classroom routines, provided this does not become an arbitrary delay or denial of inspection rights."
      },
      "refs": [
        "parentinspect",
        "ratio",
        "supervision"
      ]
    },
    {
      "id": "C3Q15",
      "chapter": 3,
      "objective": 2,
      "scenario": "An agitated man demands pickup of a four-year-old at a locked entrance. She calls him “Daddy,” but he is absent from the printed authorized pickup roster. The mother has not notified the center. What should happen first?",
      "choices": [
        "Admit him to reception to verify his identity away from the classroom.",
        "Keep the entrance secured, move the child away from the doorway, and telephone the mother while the man waits outside.",
        "Accept his identification and ask him to sign the child out while you contact the mother.",
        "Keep the entrance secured, protect the child, deny release, direct him to leave, and call emergency services if the threat continues.",
        "Send a staff member outside to explain the pickup form and request he return later."
      ],
      "answer": "D",
      "rationale": "Recognition, family titles and pressure do not establish pickup authorization. Keep current written authorizations accessible to authorized staff at the entrance, protect the child, and respond to threats without prolonging an unsafe confrontation. The entrance-copy practice is a facility safeguard; §101221 requires records identifying authorized pickup persons.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Allowing an agitated, unlisted adult past the locked entrance increases risk before pickup authority has been established."
        },
        "B": {
          "type": "acceptable",
          "text": "Securing the entrance and moving the child to safety are appropriate; prolonged negotiation with an aggressive visitor is not. Follow the threat-response plan."
        },
        "C": {
          "type": "review",
          "text": "A child’s use of “Daddy” and an adult’s photo ID do not replace lawful release authorization on file."
        },
        "D": {
          "type": "preferred",
          "text": "Recognition, family titles and pressure do not establish pickup authorization. Keep current written authorizations accessible to authorized staff at the entrance, protect the child, and respond to threats without prolonging an unsafe confrontation. The entrance-copy practice is a facility safeguard; §101221 requires records identifying authorized pickup persons."
        },
        "E": {
          "type": "review",
          "text": "Sending an employee outside to negotiate at close range exposes staff to the confrontation and may divert classroom supervision."
        }
      },
      "family": "c3-o2",
      "acceptable": {
        "B": "Securing the entrance and moving the child to safety are appropriate; prolonged negotiation with an aggressive visitor is not. Follow the threat-response plan."
      },
      "refs": [
        "pickuprecords",
        "supervision",
        "secure2026"
      ]
    },
    {
      "id": "C3Q16",
      "chapter": 3,
      "objective": 2,
      "scenario": "Ten minutes before closing, caller ID shows a mother’s name. The caller says an unlisted boyfriend will collect her child. The center requires written pickup changes. What should staff do?",
      "choices": [
        "Record the caller’s name and permit pickup after the boyfriend signs the attendance sheet.",
        "Obtain an authenticated written change, independently verify through a trusted contact method, check government photo ID, and document release.",
        "Ask the caller for the child’s birth date and compare it with the enrollment form.",
        "Decline the change unless authentication can be completed; maintain supervision until an authorized adult arrives.",
        "Ask the boyfriend to send a photograph of his license to the number shown on caller ID."
      ],
      "answer": "B",
      "rationale": "Caller ID and personal details are not sufficient authentication. Written, verifiable changes and ID checks are strong facility policies; do not mislabel every step as an express Title 22 statutory requirement.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Caller ID can be spoofed or used by someone else; displayed contact information is not independent verification."
        },
        "B": {
          "type": "preferred",
          "text": "Caller ID and personal details are not sufficient authentication. Written, verifiable changes and ID checks are strong facility policies; do not mislabel every step as an express Title 22 statutory requirement."
        },
        "C": {
          "type": "review",
          "text": "Knowing familiar details about a child or parent is not reliable proof of authorization to change the pickup roster."
        },
        "D": {
          "type": "acceptable",
          "text": "Refusing release until authorization is established is protective, but a secure documented change procedure may allow a lawful alternate pickup."
        },
        "E": {
          "type": "review",
          "text": "Texting back the unverified caller and releasing at the curb bypasses both independent authentication and secure sign-out."
        }
      },
      "family": "c3-o2",
      "acceptable": {
        "D": "Refusing release until authorization is established is protective, but a secure documented change procedure may allow a lawful alternate pickup."
      },
      "refs": [
        "pickuprecords",
        "signout",
        "secure2026"
      ]
    },
    {
      "id": "C3Q17",
      "chapter": 3,
      "objective": 2,
      "scenario": "A preschool room has 13 children and two qualified teachers. One teacher becomes ill and must leave immediately. The director is qualified and currently in the office. What should happen?",
      "choices": [
        "Keep the remaining teacher with 13 children until the substitute arrives in 20 minutes.",
        "Ask an enrolled parent to help supervise while the director makes calls.",
        "Provide immediate qualified coverage yourself or through a cleared floater, then arrange replacement staffing.",
        "Transfer one child to an approved preschool room with a verified open ratio position, updating supervision and attendance.",
        "Combine the preschoolers with a toddler group before checking the receiving room’s licensing conditions."
      ],
      "answer": "C",
      "rationale": "For a standard California child care center preschool classroom, the usual teacher-child ratio is 1:12; actual qualified coverage matters, not a roster. Confirm the applicable license/program exceptions and do not use unqualified visitors as staff.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "The actual ratio becomes noncompliant as soon as the teacher leaves; the roster’s earlier staffing cannot cover 13 children now."
        },
        "B": {
          "type": "review",
          "text": "An enrolled parent’s teaching credential does not establish eligibility to count as a cleared, qualified center teacher."
        },
        "C": {
          "type": "preferred",
          "text": "For a standard California child care center preschool classroom, the usual teacher-child ratio is 1:12; actual qualified coverage matters, not a roster. Confirm the applicable license/program exceptions and do not use unqualified visitors as staff."
        },
        "D": {
          "type": "acceptable",
          "text": "A verified, properly supervised transfer to an approved room with sufficient staffing can restore compliance; confirm receiving capacity and the child’s needs."
        },
        "E": {
          "type": "review",
          "text": "An unscreened shift into another age group can create ratio, qualification, and capacity violations elsewhere."
        }
      },
      "family": "c3-o2",
      "acceptable": {
        "D": "A verified, properly supervised transfer to an approved room with sufficient staffing can restore compliance; confirm receiving capacity and the child’s needs."
      },
      "refs": [
        "ratio",
        "supervision",
        "clearance"
      ]
    },
    {
      "id": "C3Q18",
      "chapter": 3,
      "objective": 2,
      "scenario": "Nine infants are awake in an infant room with two qualified infant teachers. A cleared preschool aide offers to cover one teacher’s break. Before the break, what must the supervisor establish?",
      "choices": [
        "Review the actual 1:4 infant staffing requirement, aide substitution conditions, and staff qualifications; secure compliant coverage before anyone leaves.",
        "Allow the aide to substitute because two adults are present, regardless of infant qualifications.",
        "Allow one teacher to supervise nine infants for a short break if most are in cribs.",
        "Ask the toddler teacher to observe through an open half-door while supervising toddlers.",
        "Delay the break and bring in qualified, cleared infant-care coverage while correcting any existing staffing shortfall."
      ],
      "answer": "A",
      "rationale": "Under 22 CCR § 101416.5(b), one teacher is required per four infants. Aides may substitute only if a fully qualified teacher supervises no more than 12 infants and each aide directly supervises no more than four. Nine awake infants require at least three properly qualified/countable staff in a compliant configuration. The sleeping-infant provision in subsection (d) has separate conditions.",
      "feedback": {
        "A": {
          "type": "preferred",
          "text": "Under 22 CCR § 101416.5(b), one teacher is required per four infants. Aides may substitute only if a fully qualified teacher supervises no more than 12 infants and each aide directly supervises no more than four. Nine awake infants require at least three properly qualified/countable staff in a compliant configuration. The sleeping-infant provision in subsection (d) has separate conditions."
        },
        "B": {
          "type": "review",
          "text": "Criminal-record clearance alone does not satisfy the specific infant-teacher and aide staffing conditions in § 101416.5."
        },
        "C": {
          "type": "review",
          "text": "Sleeping or resting infants are still in care; a short break does not permit one teacher to supervise nine infants."
        },
        "D": {
          "type": "review",
          "text": "A teacher supervising toddlers in another room cannot simultaneously count as direct supervision of an infant group."
        },
        "E": {
          "type": "acceptable",
          "text": "This protects the break transition, but nine awake infants with only two staff require immediate correction before waiting for the break."
        }
      },
      "family": "c3-o2",
      "acceptable": {
        "E": "Delaying the break and obtaining compliant coverage is protective; the current nine-infant configuration also requires immediate review."
      },
      "refs": [
        "infantratio",
        "supervision"
      ]
    },
    {
      "id": "C4Q13",
      "chapter": 4,
      "objective": 2,
      "scenario": "An unauthorized man refuses to leave the locked entrance, shouting while a child inside tries to open the exit. Staff have a panic button and a smart-speaker alert. What should the supervisor do?",
      "choices": [
        "Trigger the smart-speaker routine and wait to see whether it contacts security.",
        "Open the door slightly to explain the pickup policy face to face.",
        "Secure children and staff away from the entrance, activate the emergency plan, use the panic button, and call 911 for an active threat.",
        "Keep the door secured, move the children away, and call the parent while another staff member assesses whether emergency help is needed.",
        "Send a teacher through a side door to photograph the man’s vehicle."
      ],
      "answer": "C",
      "rationale": "Layered security can help, but consumer automation is not a substitute for trained supervision, secure access, reliable communication, and emergency services. Document and review the event afterward.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "A smart-speaker announcement does not substitute for a secure perimeter, staff supervision, and a direct 911 call when danger is immediate."
        },
        "B": {
          "type": "review",
          "text": "Opening the door during an aggressive confrontation turns a secured barrier into an access risk."
        },
        "C": {
          "type": "preferred",
          "text": "Layered security can help, but consumer automation is not a substitute for trained supervision, secure access, reliable communication, and emergency services. Document and review the event afterward."
        },
        "D": {
          "type": "acceptable",
          "text": "Securing children is essential, but do not delay emergency services when an aggressive person poses an immediate threat."
        },
        "E": {
          "type": "review",
          "text": "Sending staff outside for photographs increases their exposure and reduces attention available for the children inside."
        }
      },
      "family": "c4-o2",
      "acceptable": {
        "D": "Securing children is essential, but do not delay emergency services when an aggressive person poses an immediate threat."
      },
      "refs": [
        "supervision",
        "secure2026",
        "disaster"
      ]
    },
    {
      "id": "C4Q14",
      "chapter": 4,
      "objective": 2,
      "scenario": "An audit reveals a substitute released a child to an unlisted adult after an unauthenticated telephone call. The mother denies making the call. What system change most directly addresses the failure?",
      "choices": [
        "Require staff to retake an annual online course about authorized pickup.",
        "Use documented, authenticated pickup updates; independent verification; printed lists at the entrance; photo ID; and accurate sign-out.",
        "Permit only biological parents to pick up children, regardless of the authorization record.",
        "Replace printed pickup lists with a cloud-only spreadsheet to prevent outdated copies.",
        "Require a director to approve each alternate pickup and check identification, while keeping the existing telephone-change practice."
      ],
      "answer": "B",
      "rationale": "A defensible process combines authenticated written instructions, accessible records, ID verification, and contemporaneous sign-out. Distinguish regulatory recordkeeping requirements from additional facility safeguards.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "A yearly quiz cannot, by itself, prevent an unauthenticated phone call from authorizing an unsafe release at the door."
        },
        "B": {
          "type": "preferred",
          "text": "A defensible process combines authenticated written instructions, accessible records, ID verification, and contemporaneous sign-out. Distinguish regulatory recordkeeping requirements from additional facility safeguards."
        },
        "C": {
          "type": "review",
          "text": "Families may designate authorized pickup adults; banning all non-parent pickups is not a workable substitute for verification."
        },
        "D": {
          "type": "review",
          "text": "Cloud-only records may be unavailable during outages and do not authenticate the person requesting a change."
        },
        "E": {
          "type": "acceptable",
          "text": "Supervisor approval and photo ID improve oversight, but the phone request itself still needs independent authentication and documentation."
        }
      },
      "family": "c4-o2",
      "acceptable": {
        "E": "Supervisor approval and photo ID improve oversight, but the phone request itself still needs independent authentication and documentation."
      },
      "refs": [
        "pickuprecords",
        "signout",
        "secure2026"
      ]
    },
    {
      "id": "C5Q13",
      "chapter": 5,
      "objective": 2,
      "scenario": "A caregiver posts a sensory-play photo to a public account. A recognizable child in the background has no photo-release consent. What is the director’s strongest response?",
      "choices": [
        "Ask the caregiver to make the account private and crop the photo later.",
        "Require removal, document the incident, and coach staff on consent checks.",
        "Require immediate removal, preserve the record, inform the affected family appropriately, evaluate licensing duties, and improve the posting workflow.",
        "File a child-abuse report solely because the photograph was posted without consent.",
        "Remove the post quietly and avoid contacting the family unless they discover it."
      ],
      "answer": "C",
      "rationale": "Personal rights and privacy concerns require a prompt, proportionate response. The specific conduct and applicable rules determine licensing and other reporting obligations; an unauthorized photo is not automatically suspected child abuse. Visitor recording restrictions and facility photo-release agreements are facility policies; Title 22 does not itself create a universal ban on all parental photography.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "Cropping after public posting does not undo the initial unauthorized image exposure; the post requires immediate removal and review."
        },
        "B": {
          "type": "acceptable",
          "text": "Removal and coaching are appropriate, but transparent family communication and an incident-specific compliance review are also needed."
        },
        "C": {
          "type": "preferred",
          "text": "Personal rights and privacy concerns require a prompt, proportionate response. The specific conduct and applicable rules determine licensing and other reporting obligations; an unauthorized photo is not automatically suspected child abuse. Visitor recording restrictions and facility photo-release agreements are facility policies; Title 22 does not itself create a universal ban on all parental photography."
        },
        "D": {
          "type": "review",
          "text": "A photo-policy breach is not automatically a child abuse report. Evaluate reporting triggers on the actual facts."
        },
        "E": {
          "type": "review",
          "text": "Quiet removal without family notification undermines trust and obscures what happened to a recognizable child’s image."
        }
      },
      "family": "c5-o2",
      "acceptable": {
        "B": "Removal and coaching are appropriate, but transparent family communication and an incident-specific compliance review are also needed."
      },
      "refs": [
        "personalrights",
        "rights101223"
      ]
    },
    {
      "id": "C5Q14",
      "chapter": 5,
      "objective": 2,
      "scenario": "A supervisor proposes limiting parent classroom inspections to Tuesdays from 10–11 a.m. with 24 hours’ notice. What should the director do?",
      "choices": [
        "Adopt the rule if all parents sign the updated enrollment agreement.",
        "Reject the fixed-hour and advance-notice limits; develop conduct-based procedures that preserve lawful unannounced inspection.",
        "Change the rule to a short daily window just before closing.",
        "Reject the time limit and allow inspections, while developing a safety and privacy procedure later.",
        "Ask licensing for a waiver permitting a one-hour weekly inspection window."
      ],
      "answer": "B",
      "rationale": "Health and Safety Code § 1596.857(a) allows an identified responsible parent or guardian to inspect without advance notice during normal operating hours OR whenever the child is receiving services. Parents must respect children’s routines; the facility may manage disruptive or dangerous conduct, but may not impose a weekly appointment-only inspection window.",
      "feedback": {
        "A": {
          "type": "review",
          "text": "A signed parent handbook cannot waive a statutory right to inspect without advance notice."
        },
        "B": {
          "type": "preferred",
          "text": "Under Health and Safety Code § 1596.857(a), the responsible parent or guardian presenting identification may inspect without advance notice during normal operating hours OR whenever their child receives care. Safety procedures can regulate conduct, not eliminate the inspection right."
        },
        "C": {
          "type": "review",
          "text": "A short late-day window still improperly substitutes the facility’s preferred time for lawful parent access."
        },
        "D": {
          "type": "acceptable",
          "text": "Rejecting the unlawful restriction is correct; the facility still needs workable, non-obstructive procedures for safety, privacy, and supervision."
        },
        "E": {
          "type": "review",
          "text": "A request for a licensing waiver does not itself authorize restricting inspection rights guaranteed by statute."
        }
      },
      "family": "c5-o2",
      "acceptable": {
        "D": "Rejecting the unlawful restriction is correct; the facility still needs workable, non-obstructive procedures for safety, privacy, and supervision."
      },
      "refs": [
        "parentinspect",
        "parentrights"
      ]
    }
  ],
  "lessons": [
    {
      "title": "Staff Culture & Supervisory Judgment",
      "subtitle": "Set expectations, assess staff fitness for duty, resolve conflict, and protect children without making snap judgments.",
      "html": "<div class=\"photo-grid-two\"><figure><img data-photo=\"ch1a\" alt=\"Photograph from the child care program\"></figure><figure><img data-photo=\"ch1b\" alt=\"Photograph from the child care program\"></figure></div>\n<p><strong>Your role:</strong> You direct a licensed child care program. A staff member's comment is not merely gossip; it may reveal burnout, bias, poor judgment, or a genuine threat to children. Your duty is to establish facts, promptly control immediate risks, document observations and responses, and make fair personnel decisions.</p><p>Separate <strong>an alarming statement</strong> from <strong>substantiated conduct</strong>. If an employee says “I hate kids,” do not ignore it or treat it as a legal formula that automatically requires firing. Arrange safe coverage when risk is uncertain, speak privately with the employee, examine behavior and complaints, and make a proportionate decision under written policy and applicable employment law. Reassess whether supervision, coaching, leave, reassignment, or separation is warranted. Children should never become the experiment that tests whether someone is safe.</p><p>Conflict resolution is also a director's responsibility: a disagreement between two skilled educators can damage handoffs and child supervision. Professional boundaries help staff distinguish legitimate concerns from personal conflict and keep the focus on children. Gather both accounts separately, specify observed behavior, agree on performance standards and follow through. The <em>NAEYC Code of Ethics</em> calls for fair, consistent personnel practices and protection against physical or emotional harm (NAEYC, 2025).</p><p><strong>Adult learning connection:</strong> Supervisors learn effectively when professional experience is taken seriously and dilemmas are analyzed rather than memorized. Adults need opportunities to examine choices, discuss competing responsibilities, and practice transfer to real situations (Knowles et al., 2015; Daffron &amp; Caffarella, 2021, chs. 8–10).</p><h3>Director’s decision cycle</h3><p>Before responding to a concerning staff comment, separate <strong>immediate safety</strong> from <strong>fact-finding</strong> and <strong>long-term accountability</strong>. First, establish safe coverage. Next, record the exact statement and observable conduct. Then hold a private, fair conversation, consider support or corrective action, and check whether the response actually worked.</p><p>Adult-learning connection: a learner who chooses automatic dismissal or complete inaction should receive targeted coaching about proportionality and interim protection, then reconsider the original situation. The objective is not memorizing the director’s preferred phrase. It is explaining how a supervisor protects children while making a defensible personnel decision.</p>"
    },
    {
      "title": "Reporting, Allegations & Family Equity",
      "subtitle": "Respond to uncertain allegations, avoid bias, document objectively, and protect children without punishing poverty.",
      "html": "<div class=\"photo-grid-two\"><figure><img data-photo=\"ch2a\" alt=\"Photograph from the child care program\"></figure><figure><img data-photo=\"ch2b\" alt=\"Photograph from the child care program\"></figure></div>\n<p><strong>Reasonable suspicion is not proof.</strong> Under California Penal Code § 11166, a mandated reporter must make an initial report immediately or as soon as practicably possible when the legal threshold is met, with a written follow-up generally within 36 hours. Reporting to a supervisor is not a substitute. Security video can help preserve evidence but must not delay a required report. A director should protect the child's immediate safety, preserve relevant footage, record the child's words accurately, and avoid leading interviews or personal detective work.</p><p><strong>Housing instability is not automatically neglect.</strong> California Department of Education guidance explicitly warns against reporting families solely for homelessness. The distinction changes when there are independently concerning facts, such as a child left in soiled clothing, a credible safety threat, or unmet basic care needs. A director should document what was actually observed, consider supports, and apply the legal reasonable-suspicion threshold, not penalize poverty (California Department of Education, 2020).</p><p>When an allegation involves an employee, immediate protection may require removing that person from child contact pending review, without presuming guilt. Suspected child abuse must be reported to the appropriate child-protection authority; a separate report to Community Care Licensing may also be required. Parents directly affected by a safety concern need appropriate information, while broad disclosure of unverified allegations or personnel files is not the default. Certain formal licensing actions trigger specific parent notices under California Health and Safety Code § 1596.8895. Family complaints deserve a fair response, even when a complaint follows a report. Records, inspection cooperation, and confidentiality protect both children and program credibility. Gender-based discomfort with a male caregiver calls for a calm parent conversation, protection against staff discrimination, and a practical plan that never compromises ratios or care.</p><p><strong>Program-planning lens:</strong> Who is excluded when programs are designed around the easiest family to serve? Assess stakeholder needs and organizational context rather than confusing barriers with lack of motivation (Daffron &amp; Caffarella, 2021, chs. 5–6).</p><h3>Evidence, reporting, and dignity</h3><p>A mandated reporter does not need to prove an allegation before acting on reasonable suspicion, and the supervisor should not conduct an amateur investigation. Preserve dated observations, follow applicable reporting procedures, protect the child, and limit disclosures. When families are unhoused or under financial strain, distinguish a lack of resources from specific evidence of neglect or endangerment.</p><p>Practice the difference between an <strong>observation</strong> (“the child arrived in soiled clothing”) and an <strong>inference</strong> (“the parent does not care”). The same distinction matters when responding to complaints against employees: objective documentation and professional boundaries are stronger than retaliation, gossip, or reflexive disbelief.</p>"
    },
    {
      "title": "Licensing, Ratios & Daily Operations",
      "subtitle": "Make staffing, food safety, evacuation, and physical environment decisions that stand up to scrutiny.",
      "html": "<div class=\"photo-grid-two\"><figure><img data-photo=\"ch3a\" alt=\"Photograph from the child care program\"></figure><figure><img data-photo=\"ch3b\" alt=\"Photograph from the child care program\"></figure></div>\n<p>Running a child care program means knowing the difference between <strong>what is convenient</strong> and <strong>what is compliant</strong>. A staff-child ratio is a floor for safe supervision, not a target to reach only when an inspector arrives. The exact staffing requirements depend on whether the program is a child care center or a family child care home and on children's ages and staffing qualifications. For example, California Title 22 § 101216.3 generally permits one teacher to supervise no more than 12 preschool children at a center, with separately defined qualified-aide configurations and exceptions. Do not apply that number indiscriminately to infants, school-age programs, or family homes.</p><p>When an employee is late, ask two questions: “Are children safe right now?” and “What must change so we do not keep approaching this compliance cliff?” Use a relief coverage plan, arrival roster, break schedule, and corrective follow-up. Counting someone who is offsite, unqualified, or doing unrelated tasks can create a dangerous paper-only ratio.</p><p>Inspect smoke alarms and fire equipment under applicable fire and licensing rules, keep exits unobstructed, and have a written emergency/disaster plan. California Title 22 § 101174 requires child care centers to conduct and document disaster drills at least every six months. Plan for children who cannot evacuate independently, including those with mobility, sensory, or communication needs.</p><p>Food date labels are another trap: a “best if used by” date often refers to quality rather than automatic danger, but contamination, improper storage, and expired infant formula require attention. Facility food-control policy and Title 22 § 101227 are central. Follow actual storage conditions and safe food-handling procedures, not guesswork.</p><p><strong>Continuity of operations during utility disruptions:</strong> A water-main break, sanitation failure, or power outage may make safe care impossible. Drinking water and hand sanitizer do not independently replace functioning toilets, handwashing, and safe food service. Assess the actual licensed setting under 22 CCR §§ 101227 and 101238, activate the disruption plan, preserve supervision through family pickup or approved relocation, and assess applicable incident-notification duties.</p><p><strong>Program planning connection:</strong> Reliable operations require staffing, scheduling, budgets, and evaluation—not merely a written policy (Daffron &amp; Caffarella, 2021, chs. 10–12).</p><h3>Supervision is a real-time condition</h3><p>Licensing compliance depends on the people and children actually present, not just the roster. Before changing attendance, groupings, or staffing, verify the applicable license, ages, qualifications, supervision arrangements, and emergency coverage. A late employee, an inaccessible evacuation route, or a medication handoff can turn a routine shift into a safety problem.</p><p>Use a practical handoff: <strong>child or area affected → present risk → action already taken → named next owner → verification time</strong>. This structure makes it possible to audit whether a corrective action survived the shift change.</p>"
    },
    {
      "title": "Emergencies & Parent Accountability",
      "subtitle": "Direct crises without abandoning care, making unsupported medical decisions, or losing track of responsibility.",
      "html": "<div class=\"photo-grid-two\"><figure><img data-photo=\"ch4a\" alt=\"Photograph from the child care program\"></figure><figure><img data-photo=\"ch4b\" alt=\"Photograph from the child care program\"></figure></div>\n<p>Medical emergencies expose weak systems: who has the child's plan, who contacts EMS, who accompanies the child when authorized, and who continues supervising everyone else? Your role as director is to activate trained procedures and maintain continuity without allowing one urgent event to create a second unsafe situation.</p><p>Consider a child transported to an emergency department whose parent will not come. You cannot force a parent to appear, diagnose neglect from a single phone conversation, or assume hospital personnel can keep a child indefinitely. You can clearly communicate with the hospital, summon authorized caregivers, maintain facility staffing and handoffs, record contact attempts, and work with hospital social work and the appropriate authority when facts support concern about abandonment or danger.</p><p>With allergies, seizures, communication devices, or developmental disabilities, the supervisor must ensure staff have reviewed child-specific plans, received appropriate training, communicated accurately to emergency responders and recognized their professional limits. A written policy only works if staff can execute it during a stressful shift.</p><p><strong>Transfer of training:</strong> The point of simulations is to expose assumptions. A correct answer on a screen does not prove readiness. Use role-play, delayed follow-up, observation, and debriefing to see whether learners can act appropriately without on-screen hints (Knowles et al., 2015; Daffron &amp; Caffarella, 2021, chs. 8–10).</p><h3>Two emergencies can happen at once</h3><p>When one child requires emergency care, the supervisor must coordinate the child’s plan, emergency responders, family contact, documentation, and the supervision of everyone remaining in care. A parent who cannot or will not come to the hospital creates a separate continuity-of-care issue; the program should coordinate with hospital personnel and appropriate authorities rather than inventing guardianship or assuming responsibility has ended.</p><p>High-stakes scenarios require <strong>demonstration and rehearsal</strong>. An online answer can reveal a learner’s reasoning, but a later drill should verify whether the director can make assignments, communicate a safe handoff, and follow the actual emergency plan under time pressure.</p>"
    },
    {
      "title": "Leadership, Inclusion & Program Improvement",
      "subtitle": "Build accountability, support staff, and close the loop after difficult incidents.",
      "html": "<div class=\"photo-grid-two\"><figure><img data-photo=\"ch5a\" alt=\"Photograph from the child care program\"></figure><figure><img data-photo=\"ch5b\" alt=\"Photograph from the child care program\"></figure></div>\n<p>A director can make an urgent decision and still fail as a leader if the same preventable issue returns next week. Use a consistent improvement cycle: <strong>observe → protect → document → communicate → correct → verify</strong>. Avoid the illusion that “everyone has been reminded” proves the system has changed.</p><p>Inclusion is not merely a supportive attitude. A child who uses AAC, has an elopement risk, experiences seizures, or needs a quieter transition may require specific staffing, communication, emergency and supervision adjustments. Do not equate a disability with inevitable exclusion, and do not expect an individual teacher to invent a solution without program resources.</p><p>Adaptive leadership involves recognizing when a problem is more than a technical deficiency. Some failures are created by unrealistic staffing, conflicting incentives, and cultures where employees are afraid to report concerns. Leadership means challenging those conditions and giving employees a workable plan.</p><p><strong>EDACE 830 connection:</strong> The interactive program-planning model emphasizes needs, stakeholder participation, teaching design, evaluation, staffing and budget. Assess transfer of training through real workplace performance, not just quiz completion (Daffron &amp; Caffarella, 2021, chs. 6–12). Scaffolding can help adults learn the next step, but the assistance should fade as their judgment strengthens. Confirmative evaluation checks whether they still make sound decisions later, without a prompt on the screen. That is why this lab includes reflective follow-up rather than claiming competence from a certificate alone.</p><h3>From training completion to transfer</h3><p>A quiz can show recognition of the preferred response while missing the skills needed in a busy classroom. After an incident, ask whether the problem involved knowledge, workload, unclear authority, a missing resource, or a failed handoff. Choose a corrective action with a named owner, a deadline, and an observable verification step.</p><p>For children who use AAC, have disabilities, or require individualized supervision, inclusion should be evaluated through practical accommodations and staffing rather than automatic exclusion. The same principle applies to adult learners: provide temporary supports when needed, then fade them and test independent performance.</p>"
    }
  ],
  "glossary": {
    "reasonable suspicion": "An objectively reasonable concern based on facts; proof is not required to report suspected child abuse or neglect in California.",
    "mandated reporter": "A person designated by law to report reasonable suspicion of child abuse or neglect to an authorized agency.",
    "ratio": "The required relationship between qualified staff and children in attendance, dependent on license type, ages, roles and rules.",
    "staff fitness for duty": "Whether an employee can presently perform required caregiving tasks safely and professionally.",
    "documentation": "An objective, dated record of direct observations, actions, contacts and the person responsible for follow-up.",
    "select-all-that-apply": "An item with more than one necessary action: choose every supported option and avoid unsupported or harmful choices.",
    "AAC": "Augmentative and alternative communication methods such as pictures, gestures or speech-generating devices.",
    "trauma-informed": "An approach that considers stress and adverse experiences, supports dignity and avoids unnecessary re-traumatization.",
    "handoff": "The clear transfer of safety information, tasks and responsibility between staff or agencies.",
    "inclusion": "Providing meaningful, safe participation and reasonable support rather than unnecessary exclusion.",
    "staff-child ratio": "The number of children a qualified caregiver or teacher may supervise under the requirements that apply to the program, age group, and staff qualifications.",
    "scaffolding": "Temporary learning support, such as a simpler follow-up question or explanation, that is reduced as the learner gains independence.",
    "transfer of training": "Using a skill learned during instruction in the actual workplace, including under changing or stressful conditions.",
    "confirmative evaluation": "Follow-up assessment of whether instruction continues to work and whether learners retain and use what they learned.",
    "professional boundaries": "Clear, respectful limits on roles, communication and expectations that protect children, employees, and families."
  },
  "sources": [
    [
      "Daffron, S. R., & Caffarella, R. S. (2021). Planning programs for adult learners: A practical guide (4th ed.). Jossey-Bass. Relevant chapters: 5–6 (context and needs), 8–9 (instruction and transfer), 10–12 (evaluation and implementation).",
      ""
    ],
    [
      "Knowles, M. S., Holton, E. F., III, & Swanson, R. A. (2015). The adult learner (8th ed.). Routledge.",
      ""
    ],
    [
      "Kestin, G., Miller, K., Klales, A., Milbourne, T., & Ponti, G. (2025). AI tutoring outperforms in-class active learning: An RCT introducing a novel research-based design in an authentic educational setting. Scientific Reports, 15, Article 17458.",
      ""
    ],
    [
      "Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. Proceedings of the National Academy of Sciences, 122(26), e2422633122.",
      ""
    ],
    [
      "NAEYC. (2025). Code of ethics for early childhood educators (including administrator responsibilities).",
      "https://www.naeyc.org/resources/position-statements/code-of-ethics/"
    ],
    [
      "California Penal Code § 11166: Child abuse and neglect reporting; reasonable suspicion and timing.",
      "https://law.justia.com/codes/california/code-pen/part-4/title-1/chapter-2/article-2-5/section-11166/"
    ],
    [
      "California Department of Education. (2020). Responsive early education for young children and families experiencing homelessness.",
      "https://www.cde.ca.gov/sp/cd/re/documents/earlyedhomelessness2020.pdf"
    ],
    [
      "California Code of Regulations, tit. 22, § 101216.3: Teacher-child ratio (child care centers).",
      "https://regulations.justia.com/states/california/title-22/division-12/chapter-1/article-6/section-101216-3/"
    ],
    [
      "California Code of Regulations, tit. 22, § 102416.5: Staffing ratio and capacity (family child care homes).",
      "https://www.cdss.ca.gov/getinfo/pdf/fcc.pdf"
    ],
    [
      "California Code of Regulations, tit. 22, § 101174: Disaster and mass casualty plan; documented drills.",
      "https://www.law.cornell.edu/regulations/california/22-CCR-101174"
    ],
    [
      "California Code of Regulations, tit. 22, § 101238: Buildings and grounds.",
      "https://regulations.justia.com/states/california/title-22/division-12/chapter-1/article-7/section-101238/"
    ],
    [
      "California Code of Regulations, tit. 22, § 101227: Food service; protection against contamination.",
      "https://www.cdss.ca.gov/ord/entres/getinfo/pdf/ccc5.pdf"
    ],
    [
      "USDA FSIS. (2024). Is dating of shelf-stable foods required by federal law?",
      "https://ask.fsis.usda.gov/article/Is-the-dating-of-shelf-stable-foods-required-by-federal-law"
    ],
    [
      "Judicial Council of California. (2026). CACI No. 2513: Business judgment for at-will employment.",
      "https://www.justia.com/trials-litigation/docs/caci/2500/2513/"
    ],
    [
      "U.S. Department of Justice. (2020). Commonly asked questions about child care centers and the Americans with Disabilities Act.",
      "https://www.ada.gov/resources/child-care-centers/"
    ],
    [
      "American Academy of Pediatrics. (2025). Anaphylaxis in infants & children: Responding to severe allergic reactions.",
      "https://www.healthychildren.org/English/health-issues/injuries-emergencies/pages/anaphylaxis.aspx"
    ],
    [
      "CDC. (2026). Safety, health, and injury prevention recommendations.",
      "https://www.cdc.gov/early-care/safety/index.html"
    ],
    [
      "CDSS: Child Care Licensing Laws and Regulations",
      "https://www.cdss.ca.gov/inforesources/child-care-licensing/resources-for-providers/laws-and-regulations"
    ],
    [
      "CDSS (2026): Best Practices for Maintaining a Safe and Secure Child Care Environment",
      "https://www.cdss.ca.gov/portals/9/CCLD/Provider%20Email/2026/Best%20Practices%20for%20Maintaining%20a%20Safe%20and%20Secure%20Child%20Care%20Environment.pdf"
    ],
    [
      "Cal. Code Regs. tit. 22, § 101229.1: Sign In and Sign Out",
      "https://www.law.cornell.edu/regulations/california/22-CCR-101229.1"
    ],
    [
      "Cal. Code Regs. tit. 22, § 101212: Reporting Requirements",
      "https://www.cdss.ca.gov/getinfo/pdf/ccc4.PDF"
    ],
    [
      "Cal. Code Regs. tit. 22, § 101225: Transportation",
      "https://regulations.justia.com/states/california/title-22/division-12/chapter-1/article-6/section-101225/"
    ],
    [
      "Cal. Code Regs. tit. 22, § 101229: Responsibility for Providing Care and Supervision",
      "https://www.cdss.ca.gov/ord/entres/getinfo/pdf/ccc5.pdf"
    ],
    [
      "CDSS Form LIC 624: Unusual Incident/Injury Report",
      "https://www.cdss.ca.gov/inforesources/forms-brochures/forms-alphabetic-list/i-l"
    ],
    [
      "California Child Care Center Regulations: Health-Related Services, § 101226",
      "https://www.cdss.ca.gov/inforesources/letters-regulations/legislation-and-regulations/community-care-licensing-regulations/child-care"
    ],
    [
      "U.S. Department of Justice, Equal Access to Child Care (2026): individualized assessments, reasonable modifications and direct threat.",
      "https://www.ada.gov/topics/child-care-centers/"
    ],
    [
      "California Code of Regulations, title 22, §101223: Child Care Center Personal Rights.",
      "https://www.law.cornell.edu/regulations/california/22-CCR-101223"
    ],
    [
      "California Code of Regulations, title 22, §101226.3: Observation of the Child.",
      "https://regulations.justia.com/states/california/title-22/division-12/chapter-1/article-6/section-101226-3/"
    ],
    [
      "California Child Care Licensing, Child Care Reporting Requirements: incident notification timing and separate reports.",
      "https://ccld.childcarevideos.org/family-child-care-providers/child-care-reporting-requirements/transcript/"
    ],
    [
      "California Health and Safety Code § 1596.8895: Parent notice following specified child care facility licensing accusations, suspension, or revocation actions.",
      "https://law.justia.com/codes/california/code-hsc/division-2/chapter-3-4/article-4/section-1596-8895/"
    ]
  ],
  "photos": [
    "",
    "",
    "",
    "",
    ""
  ],
  "photoAlts": [
    "",
    "",
    "",
    "",
    ""
  ],
  "lensCases": [
    {
      "title": "Child safety and employee fairness",
      "situation": "A teacher expresses intense frustration about one child after several difficult shifts.",
      "question": "Which observations would justify an immediate restriction on unsupervised work, and what evidence is still missing?",
      "employee": "Frustration might reflect burnout, lack of support, poor fit or actual hostility; context and conduct matter.",
      "supervisor": "A director must not gamble with safety while sorting facts. Fair investigation, documentation, interim coverage and follow-up can coexist."
    },
    {
      "title": "Poverty is not a diagnosis",
      "situation": "A four-year-old living in unsheltered conditions arrives repeatedly with serious hygiene needs, and staff learn of a credible immediate safety threat.",
      "question": "How do you meet the immediate need, make the required report when reasonable suspicion exists, and still provide nonjudgmental family assistance?",
      "employee": "The family deserves help and dignity; the child deserves basic care and safety.",
      "supervisor": "Protect the child, make the mandated child-protection report without delay when the legal threshold is met, document observations, and coordinate resources; do not equate poverty alone with abuse."
    },
    {
      "title": "The roster is not reality",
      "situation": "The morning staff schedule looks compliant but one qualifying teacher has not arrived. Another visitor claims pickup authority despite being absent from the printed authorized list.",
      "question": "Who is physically supervising children now, and does your license permit the actual configuration? What if an aggressive unauthorized pickup visitor arrives?",
      "employee": "A late coworker may be dealing with a genuine emergency.",
      "supervisor": "The director must preserve real coverage immediately while addressing attendance fairly afterward."
    },
    {
      "title": "The parent will not come",
      "situation": "A child has been taken to the hospital. The parent says they cannot or will not come, and staff are due to leave.",
      "question": "Who is now responsible for the child, and which authority can coordinate safe discharge?",
      "employee": "A caregiver may be worried about leaving a frightened child alone and losing classroom coverage.",
      "supervisor": "Direct communication with the hospital, approved contacts and follow-up must replace improvised assumptions."
    },
    {
      "title": "The after-action meeting",
      "situation": "A preventable safety incident occurs despite staff completing annual training.",
      "question": "Did the process fail because of knowledge, resources, incentives or a broken handoff?",
      "employee": "A staff member may know the policy but not be able to execute it under staffing strain.",
      "supervisor": "Improve the system, check actual performance, and avoid relying on another signature sheet as proof."
    },
    {
      "title": "When an inspection becomes interference",
      "situation": "A parent invokes inspection rights, begins recording other children and asks one child questions about a family dispute.",
      "question": "How do you protect the other children while preserving legitimate inspection access?",
      "employee": "Staff must keep supervising their assigned children rather than becoming distracted by a confrontation.",
      "supervisor": "Stop conduct that jeopardizes privacy or care; use specific, documented safety boundaries instead of blanket inspection bans."
    },
    {
      "title": "The pickup nobody authorized",
      "situation": "A child runs toward a familiar adult who is not on the printed pickup list. He becomes aggressive; her parent did not send him.",
      "question": "What must already be at the entrance, and what changes when the adult refuses to leave?",
      "employee": "The child’s excitement is real but does not establish legal release authority.",
      "supervisor": "Keep the entrance secure, child supervised, authorization records accessible, and emergency response ready."
    }
  ],
  "supports": {
    "c1-o1": "Check the employee's actual conduct, child safety, fair process, and documented coaching or reassignment before making a final personnel decision.",
    "c1-o2": "Check the employee's actual conduct, child safety, fair process, and documented coaching or reassignment before making a final personnel decision.",
    "c1-o3": "Check the employee's actual conduct, child safety, fair process, and documented coaching or reassignment before making a final personnel decision.",
    "c2-o1": "Separate reasonable suspicion from proof: protect the child, report to the proper authority when required, and do not substitute internal review for a mandated report.",
    "c2-o2": "Separate reasonable suspicion from proof: protect the child, report to the proper authority when required, and do not substitute internal review for a mandated report.",
    "c2-o3": "Separate reasonable suspicion from proof: protect the child, report to the proper authority when required, and do not substitute internal review for a mandated report.",
    "c3-o1": "Identify the specific licensing duty, maintain qualified supervision and records, then document corrective action and confirm it worked.",
    "c3-o2": "Identify the specific licensing duty, maintain qualified supervision and records, then document corrective action and confirm it worked.",
    "c3-o3": "Identify the specific licensing duty, maintain qualified supervision and records, then document corrective action and confirm it worked.",
    "c4-o1": "Prioritize immediate medical or environmental safety, maintain coverage for other children, follow emergency plans, and make distinct required notifications.",
    "c4-o2": "Prioritize immediate medical or environmental safety, maintain coverage for other children, follow emergency plans, and make distinct required notifications.",
    "c4-o3": "Prioritize immediate medical or environmental safety, maintain coverage for other children, follow emergency plans, and make distinct required notifications.",
    "c5-o1": "Identify the child's individual needs, protect equal access and staff fairness, coach the team, and measure whether the revised practice is sustained.",
    "c5-o2": "Identify the child's individual needs, protect equal access and staff fairness, coach the team, and measure whether the revised practice is sustained.",
    "c5-o3": "Identify the child's individual needs, protect equal access and staff fairness, coach the team, and measure whether the revised practice is sustained."
  },
  "sourceMap": {
    "daffron": {
      "label": "Daffron, S. R., & Caffarella, R. S. (2021). Planning programs for adult learners: A practical guide (4th ed.). Jossey-Bass.",
      "url": "",
      "short": "Daffron & Caffarella (2021)",
      "chaptersByChapter": {
        "1": "chs. 6, 8–9",
        "2": "chs. 5–6",
        "3": "chs. 9, 11",
        "4": "chs. 3, 8–9",
        "5": "chs. 7–10"
      }
    },
    "knowles": {
      "label": "Knowles, M. S., Holton, E. F., III, & Swanson, R. A. (2015). The adult learner (8th ed.). Routledge.",
      "url": "",
      "short": "Knowles et al. (2015)"
    },
    "kestin": {
      "label": "Kestin, G., Miller, K., Klales, A., Milbourne, T., & Ponti, G. (2025). AI tutoring outperforms in-class active learning: An RCT introducing a novel research-based design in an authentic educational setting. Scientific Reports, 15, Article 17458.",
      "url": "",
      "short": "Kestin et al. (2025)"
    },
    "bastani": {
      "label": "Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. Proceedings of the National Academy of Sciences, 122(26), e2422633122.",
      "url": "",
      "short": "Bastani et al. (2025)"
    },
    "naeyc": {
      "label": "NAEYC. (2025). Code of ethics for early childhood educators (including administrator responsibilities).",
      "url": "https://www.naeyc.org/resources/position-statements/code-of-ethics/",
      "short": "NAEYC Code of Ethics (2025)"
    },
    "pen11166": {
      "label": "California Penal Code § 11166: Child abuse and neglect reporting; reasonable suspicion and timing.",
      "url": "https://law.justia.com/codes/california/code-pen/part-4/title-1/chapter-2/article-2-5/section-11166/",
      "short": "Cal. Penal Code § 11166"
    },
    "childhomeless": {
      "label": "California Department of Education. (2020). Responsive early education for young children and families experiencing homelessness.",
      "url": "https://www.cde.ca.gov/sp/cd/re/documents/earlyedhomelessness2020.pdf",
      "short": "Cal. Dept. of Education (2020)"
    },
    "ratio": {
      "label": "California Code of Regulations, tit. 22, § 101216.3: Teacher-child ratio (child care centers).",
      "url": "https://regulations.justia.com/states/california/title-22/division-12/chapter-1/article-6/section-101216-3/",
      "short": "Cal. Title 22 § 101216.3"
    },
    "familyratio": {
      "label": "California Code of Regulations, tit. 22, § 102416.5: Staffing ratio and capacity (family child care homes).",
      "url": "https://www.cdss.ca.gov/getinfo/pdf/fcc.pdf",
      "short": "Cal. Title 22 § 102416.5"
    },
    "disaster": {
      "label": "California Code of Regulations, tit. 22, § 101174: Disaster and mass casualty plan; documented drills.",
      "url": "https://www.law.cornell.edu/regulations/california/22-CCR-101174",
      "short": "Cal. Title 22 § 101174"
    },
    "buildings": {
      "label": "California Code of Regulations, tit. 22, § 101238: Buildings and grounds.",
      "url": "https://regulations.justia.com/states/california/title-22/division-12/chapter-1/article-7/section-101238/",
      "short": "Cal. Title 22 § 101238"
    },
    "food": {
      "label": "California Code of Regulations, tit. 22, § 101227: Food service; protection against contamination.",
      "url": "https://www.cdss.ca.gov/ord/entres/getinfo/pdf/ccc5.pdf",
      "short": "Cal. Title 22 § 101227"
    },
    "fooddate": {
      "label": "USDA FSIS. (2024). Is dating of shelf-stable foods required by federal law?",
      "url": "https://ask.fsis.usda.gov/article/Is-the-dating-of-shelf-stable-foods-required-by-federal-law",
      "short": "USDA FSIS (2024)"
    },
    "employment": {
      "label": "Judicial Council of California. (2026). CACI No. 2513: Business judgment for at-will employment.",
      "url": "https://www.justia.com/trials-litigation/docs/caci/2500/2513/",
      "short": "California CACI 2513 (2026)"
    },
    "ada": {
      "label": "U.S. Department of Justice. (2020). Commonly asked questions about child care centers and the Americans with Disabilities Act.",
      "url": "https://www.ada.gov/resources/child-care-centers/",
      "short": "U.S. DOJ ADA Guidance (2020)"
    },
    "aap": {
      "label": "American Academy of Pediatrics. (2025). Anaphylaxis in infants & children: Responding to severe allergic reactions.",
      "url": "https://www.healthychildren.org/English/health-issues/injuries-emergencies/pages/anaphylaxis.aspx",
      "short": "AAP Anaphylaxis Guidance"
    },
    "cdc": {
      "label": "CDC. (2026). Safety, health, and injury prevention recommendations.",
      "url": "https://www.cdc.gov/early-care/safety/index.html",
      "short": "CDC Early Care Safety (2026)"
    },
    "cdsslaw": {
      "label": "CDSS: Child Care Licensing Laws and Regulations",
      "url": "https://www.cdss.ca.gov/inforesources/child-care-licensing/resources-for-providers/laws-and-regulations",
      "short": "CDSS Laws & Regulations"
    },
    "secure2026": {
      "label": "CDSS (2026): Best Practices for Maintaining a Safe and Secure Child Care Environment",
      "url": "https://www.cdss.ca.gov/portals/9/CCLD/Provider%20Email/2026/Best%20Practices%20for%20Maintaining%20a%20Safe%20and%20Secure%20Child%20Care%20Environment.pdf",
      "short": "CDSS Safety Practices (2026)"
    },
    "signout": {
      "label": "Cal. Code Regs. tit. 22, § 101229.1: Sign In and Sign Out",
      "url": "https://www.law.cornell.edu/regulations/california/22-CCR-101229.1",
      "short": "22 CCR § 101229.1"
    },
    "report101212": {
      "label": "Cal. Code Regs. tit. 22, § 101212: Reporting Requirements",
      "url": "https://www.cdss.ca.gov/getinfo/pdf/ccc4.PDF",
      "short": "22 CCR § 101212"
    },
    "transport": {
      "label": "Cal. Code Regs. tit. 22, § 101225: Transportation",
      "url": "https://regulations.justia.com/states/california/title-22/division-12/chapter-1/article-6/section-101225/",
      "short": "22 CCR § 101225"
    },
    "supervision": {
      "label": "Cal. Code Regs. tit. 22, § 101229: Responsibility for Providing Care and Supervision",
      "url": "https://www.cdss.ca.gov/ord/entres/getinfo/pdf/ccc5.pdf",
      "short": "22 CCR § 101229"
    },
    "incident624": {
      "label": "CDSS Form LIC 624: Unusual Incident/Injury Report",
      "url": "https://www.cdss.ca.gov/inforesources/forms-brochures/forms-alphabetic-list/i-l",
      "short": "CDSS LIC 624"
    },
    "health": {
      "label": "California Child Care Center Regulations: Health-Related Services, § 101226",
      "url": "https://www.cdss.ca.gov/inforesources/letters-regulations/legislation-and-regulations/community-care-licensing-regulations/child-care",
      "short": "22 CCR § 101226"
    },
    "ada2026": {
      "label": "U.S. Department of Justice, Equal Access to Child Care (2026): individualized assessments, reasonable modifications and direct threat.",
      "short": "DOJ: Equal Access to Child Care",
      "url": "https://www.ada.gov/topics/child-care-centers/"
    },
    "rights101223": {
      "label": "California Code of Regulations, title 22, §101223: Child Care Center Personal Rights.",
      "short": "22 CCR §101223",
      "url": "https://www.law.cornell.edu/regulations/california/22-CCR-101223"
    },
    "observation101226": {
      "label": "California Code of Regulations, title 22, §101226.3: Observation of the Child.",
      "short": "22 CCR §101226.3",
      "url": "https://regulations.justia.com/states/california/title-22/division-12/chapter-1/article-6/section-101226-3/"
    },
    "cclreports": {
      "label": "California Child Care Licensing, Child Care Reporting Requirements: incident notification timing and separate reports.",
      "short": "CCL Reporting Guide",
      "url": "https://ccld.childcarevideos.org/family-child-care-providers/child-care-reporting-requirements/transcript/"
    },
    "parentnotice": {
      "label": "California Health and Safety Code § 1596.8895: Parent notice following specified child care facility licensing accusations, suspension, or revocation actions.",
      "url": "https://law.justia.com/codes/california/code-hsc/division-2/chapter-3-4/article-4/section-1596-8895/",
      "short": "Cal. H&S Code § 1596.8895"
    },
    "parentinspect": {
      "label": "California Health and Safety Code §1596.857 — Parent inspection rights and safety limitations",
      "url": "https://law.justia.com/codes/california/code-hsc/division-2/chapter-3-4/article-2/section-1596-857/",
      "short": "California Health and Safety Code §1596.857"
    },
    "pickuprecords": {
      "label": "22 CCR §101221 — Child records and persons authorized to take a child",
      "url": "https://www.law.cornell.edu/regulations/california/22-CCR-101221",
      "short": "22 CCR §101221"
    },
    "personalrights": {
      "label": "22 CCR §101223 — Personal Rights",
      "url": "https://www.law.cornell.edu/regulations/california/22-CCR-101223",
      "short": "22 CCR §101223"
    },
    "infantratio": {
      "label": "22 CCR §101416.5 — Infant care teacher-child ratio",
      "url": "https://www.law.cornell.edu/regulations/california/22-CCR-101416.5",
      "short": "22 CCR §101416.5"
    },
    "clearance": {
      "label": "22 CCR §101170 — Criminal record clearance",
      "url": "https://www.law.cornell.edu/regulations/california/22-CCR-101170",
      "short": "22 CCR §101170"
    },
    "parentrights": {
      "label": "22 CCR §101218.1 — Parent rights",
      "url": "https://www.law.cornell.edu/regulations/california/22-CCR-101218.1",
      "short": "22 CCR §101218.1"
    },
    "feha": {
      "label": "California Government Code § 12940(a) — Fair Employment and Housing Act",
      "short": "Cal. Gov. Code § 12940(a)",
      "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=12940.&lawCode=GOV"
    },
    "inspect101200": {
      "label": "22 CCR § 101200 — Licensing inspection authority",
      "short": "22 CCR § 101200",
      "url": "https://www.law.cornell.edu/regulations/california/22-CCR-101200"
    },
    "pen11165_2": {
      "label": "California Penal Code § 11165.2 — Neglect and poverty distinction",
      "short": "Penal Code § 11165.2",
      "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=11165.2.&lawCode=PEN"
    }
  }
}

================================== END data/questions.json ==================================

================================== BEGIN data/branching.json ==================================
{
  "labs": {
    "1": {
      "0": {
        "lead": "You corrected the sign-out record transparently. The next morning, the senior shift lead who promoted early sign-outs tells colleagues you undermined her in front of a parent. A different parent requests yesterday’s departure record.",
        "prompt": "What do you do when the technically correct correction triggers a staff challenge and a family inquiry?",
        "options": [
          {
            "text": "Preserve the correction trail, verify yesterday’s departure evidence, explain confirmed facts to the parent, and privately address the lead’s conflicting instruction.",
            "why": "Protects record integrity and family trust while treating the senior employee fairly. The original correct decision did not eliminate a new interpersonal problem.",
            "level": 2
          },
          {
            "text": "Share the corrected record with the parent and schedule an all-staff reminder, leaving the lead’s objection for the next evaluation cycle.",
            "why": "Provides some accountability but delays resolving a supervisor-level instruction that could repeat today.",
            "level": 1
          },
          {
            "text": "Tell the lead to apologize publicly and warn the team that any criticism of management will result in termination.",
            "why": "Punishing discussion can suppress future near-miss reporting and avoids examining how conflicting instructions developed.",
            "level": 0
          },
          {
            "text": "Offer to replace yesterday’s record with a clean copy so the parent does not see the correction.",
            "why": "Removing the audit trail conceals the original inaccuracy and undermines credibility.",
            "level": 0
          }
        ],
        "takeaway": "Transparent corrections can provoke uncomfortable reactions. The director still owes fair supervision, verified records, and family communication."
      },
      "1": {
        "lead": "The parent signs the child out correctly, but you never correct the earlier false entry. The following afternoon, a parent asks why her portal shows departure before she entered the building.",
        "prompt": "How do you respond when a deferred record correction becomes a credibility problem?",
        "options": [
          {
            "text": "Preserve the original entry, append a clearly dated correction, review actual handoffs, inform the family of verified facts, and address the staff instruction.",
            "why": "Corrects the prior omission without hiding it and identifies the system fault.",
            "level": 2
          },
          {
            "text": "Apologize and correct this family’s entry, but rely on the next staff meeting to settle the larger practice.",
            "why": "Helps the family but leaves other unreliable sign-outs and conflicting guidance unchecked.",
            "level": 1
          },
          {
            "text": "Ask the parent to confirm the original time so the facility will not have to change stored information.",
            "why": "A parent should not be pressured to validate an inaccurate departure time.",
            "level": 0
          },
          {
            "text": "Turn off parent access to attendance records until the discrepancy stops attracting complaints.",
            "why": "Suppressing visibility does not repair child-release accountability.",
            "level": 0
          }
        ],
        "takeaway": "A seemingly minor deferred correction can turn into a trust and safety problem across multiple families."
      },
      "2": {
        "lead": "You left the false sign-out untouched. A licensing analyst now compares the sheet with a timestamped camera clip showing the child still in care after the recorded departure. Staff ask whether to “standardize” other entries before the analyst reviews them.",
        "prompt": "What must happen when the uncorrected record is challenged by objective evidence?",
        "options": [
          {
            "text": "Prevent additional edits, preserve the raw records and video, explain the discrepancy accurately to the analyst, and implement traceable corrections and a verified release protocol.",
            "why": "Acknowledges the actual record without manufacturing a cover story and protects future pickups.",
            "level": 2
          },
          {
            "text": "Tell the analyst a correction is needed and ask staff to stop pre-filling forms, but postpone checking prior entries.",
            "why": "Stops new bad entries but leaves the extent and cause of the problem unknown.",
            "level": 1
          },
          {
            "text": "Direct staff to rewrite earlier departure times so the paper file aligns with camera timestamps before the analyst returns.",
            "why": "Backdating and concealed rewriting compound the problem.",
            "level": 0
          },
          {
            "text": "Blame the newest teacher as the sole cause and keep the senior lead’s contrary instructions out of the review.",
            "why": "Scapegoating suppresses evidence of an organizational instruction failure.",
            "level": 0
          }
        ],
        "takeaway": "An unsafe recordkeeping decision may create a second problem: pressure to conceal what happened. Preserve evidence and correct transparently."
      },
      "3": {
        "lead": "You sent the new teacher home before arranging replacement coverage. Within minutes, one room is at risk of falling below qualified staffing requirements, while the senior lead continues using pre-filled times.",
        "prompt": "What is the director’s first corrective sequence?",
        "options": [
          {
            "text": "Restore qualified classroom coverage immediately, stop early sign-out entries, preserve existing records, then investigate both employees’ instructions without prejudging the teacher.",
            "why": "Stabilizes child supervision first and then addresses records and personnel fairness.",
            "level": 2
          },
          {
            "text": "Move a cleared, qualified floater into the room and retrain the shift lead, but leave the existing inaccurate entries uncorrected.",
            "why": "Floor coverage improves; the recordkeeping gap still requires a transparent correction.",
            "level": 1
          },
          {
            "text": "Leave the room with current staffing while interviewing the senior lead, because the teacher has already been removed from duty.",
            "why": "Administrative investigation cannot supersede required classroom supervision.",
            "level": 0
          },
          {
            "text": "Call the teacher back and require her to accept responsibility for all false entries before she can supervise again.",
            "why": "Compelled admissions do not establish facts or repair unsafe coverage.",
            "level": 0
          }
        ],
        "takeaway": "Personnel accountability must not create a new supervision violation; recovery begins with real coverage and traceable records."
      }
    },
    "2": {
      "0": {
        "lead": "You reassigned the caregiver but saved only today’s footage and delayed a mandated report while asking for a date. The video system is about to overwrite the oldest available recordings. A family member asks whether a report has been made.",
        "prompt": "What is the immediate recovery action?",
        "options": [
          {
            "text": "Preserve all remaining rolling footage, make the required mandated report without waiting for a precise timestamp, protect children, and document the previous delay accurately.",
            "why": "Corrects the reporting lapse, protects evidence, and avoids a private investigation.",
            "level": 2
          },
          {
            "text": "Call the reporting agency now and maintain the reassignment, but wait to export other video until the family narrows down the day.",
            "why": "Reporting starts, but valuable time-sensitive records remain at risk.",
            "level": 1
          },
          {
            "text": "Ask staff to interview the child again to narrow the date before the next camera cycle.",
            "why": "Repeated internal questioning risks influencing the child and prolongs evidence loss.",
            "level": 0
          },
          {
            "text": "Ask the family not to tell investigators about the delay because you have already moved the caregiver.",
            "why": "Concealing a delay undermines the integrity of the investigation.",
            "level": 0
          }
        ],        "takeaway": "The first protective step does not excuse delayed reporting or incomplete preservation."
      },
      "1": {
        "lead": "You safeguarded children, preserved footage, and made the required report. Two days later, an upset parent posts an allegation online; the employee says your report was malicious and threatens to file a retaliatory licensing complaint. None of those claims has yet been substantiated.",
        "prompt": "How should a director respond after doing the right thing produces a new conflict?",
        "options": [
          {
            "text": "Maintain appropriate interim safeguards, preserve the communications and agency correspondence, respond to any licensing inquiry factually, and protect personnel and child confidentiality.",
            "why": "The original report remains appropriate if supported by reasonable suspicion; a new complaint calls for verified facts, not retaliation.",
            "level": 2
          },
          {
            "text": "Tell affected families that reporting occurred and staffing is safe, but publish the employee’s name to counter inaccurate online claims.",
            "why": "Reassurance is appropriate, but publicly identifying an accused employee breaches confidentiality and may unfairly prejudice the investigation.",
            "level": 0
          },
          {
            "text": "Document the threatened complaint, consult agency guidance, and avoid public arguments, but postpone responding to the directly affected family’s legitimate process questions.",
            "why": "Protects confidentiality but leaves room for appropriate verified family updates.",
            "level": 1
          },
          {
            "text": "Withdraw the mandated report because the employee threatened to complain about the center.",
            "why": "Required reporting cannot be retracted to avoid retaliation.",
            "level": 0
          }
        ],
        "takeaway": "Correct reporting can still lead to accusations or scrutiny. Respond with evidence, restraint, and child-centered safeguards."
      },
      "2": {
        "lead": "Teachers repeatedly questioned the child before reporting. Accounts now contain inconsistent details, and one caregiver asks whether staff should interview classmates to “clear things up.” The child appears distressed by the repeated questions.",
        "prompt": "What should change now?",
        "options": [
          {
            "text": "Stop repeated internal questioning, record exactly what was asked and disclosed, make the required report promptly, preserve recordings, and follow trained agency instructions.",
            "why": "Limits further harm while providing investigators an honest account of the previous interviews.",
            "level": 2
          },
          {
            "text": "Make the report and stop questioning the child, but summarize earlier statements as a single certain timeline without identifying differences.",
            "why": "Reporting is essential, but merging inconsistent accounts into a false certainty can distort evidence.",
            "level": 1
          },
          {
            "text": "Have a different teacher start interviews again so the child can provide a fresh account.",
            "why": "Another interview can add distress and contaminate information.",
            "level": 0
          },
          {
            "text": "Tell the family their account is no longer credible because different child statements do not match.",
            "why": "Inconsistency does not remove a mandated reporter’s duty when reasonable suspicion exists.",
            "level": 0
          }
        ],
        "takeaway": "When questioning has already occurred, disclose the process accurately and leave investigative interviewing to trained authorities."
      },
      "3": {
        "lead": "You waited for licensing to arrive. An analyst cannot attend until tomorrow, and the camera system will overwrite an earlier segment tonight. The family calls asking why no child-protection agency has contacted them.",
        "prompt": "What must be done before the next video cycle?",
        "options": [
          {
            "text": "Preserve all accessible footage immediately, make a timely report now based on reasonable suspicion, maintain interim safety measures, and document the reasons for the delay.",
            "why": "Stops preventable loss and addresses the independent child-protection reporting duty.",
            "level": 2
          },
          {
            "text": "Export the footage and contact child protection, but delay documenting the timeline until the licensing visit is complete.",
            "why": "Protects critical evidence and reporting, but a contemporaneous account of actions and delays matters.",
            "level": 1
          },
          {
            "text": "Wait another day because the licensing analyst will decide whether abuse occurred.",
            "why": "Licensing review does not replace a mandated reporter’s independent obligation.",
            "level": 0
          },
          {
            "text": "Ask the family to obtain footage directly from the vendor so the program need not preserve it.",
            "why": "Delegating evidence preservation to the family risks loss and exposes confidential recordings.",
            "level": 0
          }
        ],
        "takeaway": "CCL communication and a mandated report are different pathways; one does not suspend the other."
      }
    },
    "3": {
      "0": {
        "lead": "You allowed the late teacher’s attendance to be recorded as though they arrived on time. At payroll review, the clock-in system conflicts with the coverage sheet, and a teacher admits the room had 13 preschoolers with one qualified teacher for several minutes.",
        "prompt": "How should the director correct the record and ongoing risk?",
        "options": [
          {
            "text": "Restore and verify real-time coverage, preserve both original records, document the actual staffing gap, make any required notifications, and redesign opening contingencies.",
            "why": "Prioritizes present safety and accurate reconstruction rather than simply making records agree.",
            "level": 2
          },
          {
            "text": "Correct the attendance sheet and remind staff about honest clock-in times, but defer checking whether the room exceeded ratio.",
            "why": "Records improve, but the missed coverage risk remains unassessed.",
            "level": 1
          },
          {
            "text": "Change payroll clock-in times to match the sign-in sheet so auditors see a consistent record.",
            "why": "Manufacturing consistency hides the actual ratio problem and creates employment-record risks.",
            "level": 0
          },
          {
            "text": "Tell the teacher to describe the opening as fully staffed because the late employee made up the minutes later.",
            "why": "Hours made up later cannot retroactively supervise children.",
            "level": 0
          }
        ],
        "takeaway": "Paper compliance cannot cure a real-time staffing shortage. Recover facts before redesigning the opening shift."
      },
      "1": {
        "lead": "You stepped into the room and recorded actual arrivals. The teacher arrives visibly distressed and explains that a new bus schedule prevents timely child-care drop-off twice a week. Two other staff members now ask for similar exceptions.",
        "prompt": "How do you respond without undermining the qualified opening plan?",
        "options": [
          {
            "text": "Set clear documented arrival expectations, review feasible formal schedule adjustments, assign verified qualified opening coverage, and apply standards consistently.",
            "why": "Acknowledges legitimate barriers without making child supervision dependent on an informal exception.",
            "level": 2
          },
          {
            "text": "Offer a trial shift swap with qualified coverage and review attendance after one week, but leave backup arrangements undocumented.",
            "why": "A practical adaptation can work, but the coverage plan needs reliable ownership.",
            "level": 1
          },
          {
            "text": "Promise all opening employees they can arrive late when needed because the director can usually step in.",
            "why": "An informal open-ended exemption makes ratios dependent on the director’s availability.",
            "level": 0
          },
          {
            "text": "Reject any discussion of schedule barriers and terminate the teacher immediately, even if no replacement opener is ready.",
            "why": "A purely punitive response can create a larger staffing crisis without improving reliability.",
            "level": 0
          }
        ],
        "takeaway": "An appropriate real-time coverage decision may reveal a recurring structural scheduling problem, not just an individual fault."
      },
      "2": {
        "lead": "You moved two children without confirming receiving-room attendance. The adjacent room now has 14 preschoolers with one teacher, and its lead says a child with an individualized supervision plan is beginning a difficult transition.",
        "prompt": "What should the director do first?",
        "options": [
          {
            "text": "Restore qualified ratios in both rooms immediately, confirm each room’s staffing and care plans, document movements, and establish a preapproved overflow procedure.",
            "why": "Prevents transferring one supervision violation into another and safeguards individualized support.",
            "level": 2
          },
          {
            "text": "Move one child back and check the current headcounts, but postpone reviewing that child’s transition safeguards.",
            "why": "Partial correction may reduce numbers without ensuring both rooms meet every supervision need.",
            "level": 1
          },
          {
            "text": "Ask the receiving teacher to keep both extra children for ten minutes because the move has already been entered in attendance.",
            "why": "A completed roster entry does not authorize over-ratio supervision.",
            "level": 0
          },
          {
            "text": "Have a child wait independently at the office door until the original teacher returns.",
            "why": "A child cannot be used as an unsupervised ratio adjustment.",
            "level": 0
          }
        ],
        "takeaway": "Moving children is only a valid contingency when the receiving room has verified capacity, qualified supervision, and appropriate support."
      },
      "3": {
        "lead": "You asked a parent volunteer to cover. The parent has a public-school credential but no verified child-care clearance in the center’s file. Another teacher is preparing for a break while the parent is alone near a group of preschoolers.",
        "prompt": "How do you regain a safe and defensible staffing arrangement?",
        "options": [
          {
            "text": "Put a qualified, cleared employee or qualified director physically in the room, keep the volunteer from unsupervised child contact, review the staffing lapse, and secure a backup plan.",
            "why": "Restores required supervision without assuming an outside credential replaces center clearance and qualifications.",
            "level": 2
          },
          {
            "text": "Keep the qualified teacher present with the volunteer until a floater arrives, then document the event and review screening records.",
            "why": "May stabilize supervision immediately, but a longer-term verified staffing contingency is still needed.",
            "level": 1
          },
          {
            "text": "Treat the parent’s public-school license as equivalent to clearance for the rest of the day.",
            "why": "Another credential does not establish the facility-specific requirements for unsupervised work.",
            "level": 0
          },
          {
            "text": "Ask the volunteer to supervise only children whose families know them personally.",
            "why": "Familiarity is not a substitute for appropriate staff qualifications and supervision.",
            "level": 0
          }
        ],
        "takeaway": "An emergency does not turn an unverified volunteer into a countable qualified staff member."
      }
    },
    "4": {
      "0": {
        "lead": "You provided a verified handoff and kept supervision intact. Hospital social work then reports that the parent’s car broke down, while an extended family member offers to collect the child but is not listed as an authorized hospital decision-maker.",
        "prompt": "How should the director coordinate safely without assuming legal custody?",
        "options": [
          {
            "text": "Continue documenting contacts, involve hospital social work and the parent, verify lawful decision-makers and a safe plan, and evaluate reporting only if independent safety facts warrant it.",
            "why": "Solves a new transportation obstacle without equating poverty or delay with neglect.",
            "level": 2
          },
          {
            "text": "Arrange transportation with the parent and ask social work to confirm arrival, but do not clarify who may authorize discharge if the plan fails.",
            "why": "Transport help is valuable, yet discharge authority and contingency ownership remain unresolved.",
            "level": 1
          },
          {
            "text": "Authorize the family member to sign discharge paperwork because they are willing to drive.",
            "why": "Child-care staff cannot confer hospital medical authority by informal permission.",
            "level": 0
          },
          {
            "text": "Automatically report neglect because the parent cannot reach the hospital within one hour.",
            "why": "Transportation hardship alone does not establish the statutory threshold for neglect.",
            "level": 0
          }
        ],
        "takeaway": "Even an excellent handoff can be followed by an unexpected logistical and legal coordination problem."
      },
      "1": {
        "lead": "You remained at the hospital without designating center coverage. A lead teacher calls to say the evening floater is leaving and two classrooms may fall below required staffing. The hospital simultaneously asks whom to contact about discharge.",
        "prompt": "What needs to happen first?",
        "options": [
          {
            "text": "Assign verified qualified coverage at the center immediately, designate an authorized hospital liaison, coordinate with social work and the parent, and document both safety tracks.",
            "why": "Restores simultaneous accountability to children at both locations.",
            "level": 2
          },
          {
            "text": "Call a cleared qualified floater to the center and inform hospital social work of the parent’s barrier, but leave discharge follow-up unassigned.",
            "why": "Center coverage improves while the hospital still lacks a reliable decision coordinator.",
            "level": 1
          },
          {
            "text": "Tell the teachers to combine all groups temporarily, regardless of ages or room approval, until you return.",
            "why": "Unverified mixed-age consolidation can introduce a new licensing violation.",
            "level": 0
          },
          {
            "text": "Stay at the hospital and ask classroom staff to manage until closing because the emergency child is the highest priority.",
            "why": "Child safety at the hospital does not suspend duties to children still enrolled at the center.",
            "level": 0
          }
        ],
        "takeaway": "Accompanying one child cannot leave all other children without confirmed lawful supervision."
      },
      "2": {
        "lead": "You proposed taking the child to your home. Hospital staff question your authority and refuse to discharge the child to you. A parent later explains that their transportation has failed, not that they have relinquished parental responsibility.",
        "prompt": "What is the appropriate recovery plan?",
        "options": [
          {
            "text": "Withdraw the unauthorized home-placement proposal, coordinate the parent and hospital social worker, identify legal discharge authority, and document an individualized safe transport plan.",
            "why": "Corrects the overreach and distinguishes a practical family barrier from custody authority.",
            "level": 2
          },
          {
            "text": "Offer to meet the parent at the hospital with transportation and ask staff to confirm discharge authorization before any release.",
            "why": "Transportation may help, but a written contingency and assigned coordinator are still required.",
            "level": 1
          },
          {
            "text": "Ask another employee to take the child home instead because they have prior experience as a caregiver.",
            "why": "Changing the destination adult does not establish medical or custody authority.",
            "level": 0
          },
          {
            "text": "Tell hospital staff the center’s enrollment agreement authorizes your home as an emergency placement.",
            "why": "A child-care admission agreement does not confer residential placement or medical custody rights.",
            "level": 0
          }
        ],
        "takeaway": "Well-intentioned improvisation may cross lawful authority boundaries; the corrective path is verification and coordinated support."
      },
      "3": {
        "lead": "You described the parent as having abandoned the child before checking why they could not attend. The hospital records that claim, while the parent says the bus route was canceled and asks for help reaching social work.",
        "prompt": "How do you correct the record without dismissing possible safety concerns?",
        "options": [
          {
            "text": "Correct the inaccurate characterization with hospital staff, document the parent’s actual statements, involve social work, verify a safe discharge arrangement, and assess any separate safety facts.",
            "why": "Avoids an unsupported neglect label while preserving appropriate child-protection assessment.",
            "level": 2
          },
          {
            "text": "Clarify that the parent faces a transportation barrier and help arrange a ride, but leave the original abandonment statement uncorrected in the communication log.",
            "why": "Practical support helps, but an inaccurate record can seriously harm a family.",
            "level": 1
          },
          {
            "text": "Tell the parent that requesting transportation help is proof of neglect and terminate the placement.",
            "why": "Economic and transportation barriers alone are not proof of neglect or grounds for retaliatory action.",
            "level": 0
          },
          {
            "text": "Ask hospital staff to keep the parent’s explanation out of the record because the director’s first assessment should stand.",
            "why": "Concealing contradictory facts undermines accurate care coordination.",
            "level": 0
          }
        ],
        "takeaway": "A director must distinguish reported observations from unsupported judgments and correct mistakes visibly."
      }
    },
    "5": {
      "0": {
        "lead": "You secured the open gate, verified every child, and implemented an improvement plan. Three weeks later, the checklists are all signed, but a surprise walk-through finds a latch still unsecured. The staff member says they checked the box from memory.",
        "prompt": "What is the next evidence-based improvement step?",
        "options": [
          {
            "text": "Make the gate safe now, observe the actual closing routine, coach and assign ownership, test the verification method, and recheck performance on later shifts.",
            "why": "Moves beyond paperwork completion to demonstrated and sustained transfer.",
            "level": 2
          },
          {
            "text": "Require a second signature on every gate check and observe a sample at the end of the week.",
            "why": "Adds verification but may not address the actual workflow and staffing barriers causing the lapse.",
            "level": 1
          },
          {
            "text": "Count the signed checklists as proof that retraining succeeded despite the unsecured latch.",
            "why": "Administrative completion is not evidence of safe behavior.",
            "level": 0
          },
          {
            "text": "Remove gate checks from the training plan because staff already know the correct rule.",
            "why": "Knowledge alone does not establish applied practice.",
            "level": 0
          }
        ],
        "takeaway": "Correct initial intervention is not a guarantee that new behavior will transfer to busy shifts."
      },
      "1": {
        "lead": "You secured the gate and asked staff to sign the existing checklist. A week later, an opening employee checks the box without walking to the gate; a child approaches the unlatched entrance before a teacher intervenes.",
        "prompt": "What is the director’s strongest response to the repeat near miss?",
        "options": [
          {
            "text": "Protect the child and secure the gate, document and evaluate the near miss, observe real checks, revise coverage and verification, and follow up over multiple shifts.",
            "why": "Responds to the immediate hazard and the repeated system failure.",
            "level": 2
          },
          {
            "text": "Assign one staff member to check the gate and ask them to initial a new form, but postpone observing the routine.",
            "why": "Ownership improves, but unobserved paperwork can repeat the same failure.",
            "level": 1
          },
          {
            "text": "Stop documenting gate errors so the program’s safety record does not look worse.",
            "why": "Suppressing near misses removes essential safety information.",
            "level": 0
          },
          {
            "text": "Wait for an actual elopement before revising the procedure because no child was injured.",
            "why": "A near miss is valuable evidence that risk controls are failing.",
            "level": 0
          }
        ],
        "takeaway": "A reminder and a signature do not constitute a verified new safety behavior."
      },
      "2": {
        "lead": "You prioritized additional enrollment rather than a staffing and gate-safety correction. The next morning, classrooms are full and the regular opener calls out. Staff report they cannot leave their groups to test the gate latch.",
        "prompt": "How do you regain control of the operational risk?",
        "options": [
          {
            "text": "Hold intake where necessary, ensure verified qualified coverage, secure the gate immediately, assess capacity and supervision, then redesign staffing before accepting more children.",
            "why": "Restores real operating limits and safety checks before financial or scheduling goals.",
            "level": 2
          },
          {
            "text": "Bring in a cleared qualified substitute and arrange an immediate gate check, but leave future enrollment commitments unchanged pending review.",
            "why": "Stabilizes today but may preserve an underlying capacity-pressure problem.",
            "level": 1
          },
          {
            "text": "Have a parent volunteer supervise a group so staff can test the latch without verifying clearance or qualifications.",
            "why": "One safety repair cannot justify another supervision breach.",
            "level": 0
          },
          {
            "text": "Ask staff to skip gate checks until the new enrollment revenue pays for additional coverage.",
            "why": "Deferring a known safety control exposes children to preventable risk.",
            "level": 0
          }
        ],
        "takeaway": "Growth decisions and safety systems must be evaluated together; revenue cannot substitute for supervised operations."
      },
      "3": {
        "lead": "You punished the entire team for the gate lapse. Two employees now admit privately that they stopped reporting near misses because they fear collective discipline. A new staff member finds the latch sticking.",
        "prompt": "What response rebuilds a reliable early-warning system?",
        "options": [
          {
            "text": "Repair and verify the gate, protect immediate supervision, invite factual reporting without blanket retaliation, investigate individual accountability fairly, and monitor near-miss disclosures.",
            "why": "Addresses the hazard and restores the information flow needed to learn from failures.",
            "level": 2
          },
          {
            "text": "Thank the employee for speaking up, repair the latch, and remind everyone of expectations, but keep the blanket punishment policy.",
            "why": "Corrects one hazard but leaves the fear that silenced reports in place.",
            "level": 1
          },
          {
            "text": "Require every employee to name the colleague responsible for past near misses before the gate can be repaired.",
            "why": "The physical hazard cannot wait for a compelled blame exercise.",
            "level": 0
          },
          {
            "text": "Post the names of all employees who failed a gate check to demonstrate transparency to families.",
            "why": "Public shaming can suppress reporting and unfairly expose personnel information.",
            "level": 0
          }
        ],
        "takeaway": "A punitive reporting culture can hide hazards; accountability must encourage timely, factual disclosure."
      }
    }
  },
  "capstone": {
    "1": {
      "0": {
        "head": "A second crisis at the center",
        "lead": "You ordered a closure before assigning supervised pickup. A teacher calls: two parents have not arrived, and one classroom is now below qualified staffing. The hospital also needs a discharge contact.",
        "question": "How do you repair the immediate safety breakdown while keeping hospital follow-up lawful?",
        "choices": [
          [
            "Restore qualified coverage and supervised release at the center, appoint a hospital liaison, then coordinate the parent and social worker on lawful discharge.",
            "Correcting the unsafe closure cannot wait; children at both locations need named, capable supervision.",
            2
          ],
          [
            "Call cleared coverage back to the center and alert hospital social work, but leave the discharge coordinator unnamed.",
            "This stabilizes the center but preserves a predictable hospital handoff gap.",
            1
          ],
          [
            "Have a waiting parent supervise the remaining children while you personally travel to the hospital.",
            "A parent cannot be improvised into qualified supervisory coverage.",
            0
          ],
          [
            "Assume that closing-time rules ended the program’s responsibility to children whose families have not arrived.",
            "Supervision continues until lawful, safe release; an announced closure does not end that duty.",
            0
          ]
        ]
      },
      "1": {
        "head": "The missing owner",
        "lead": "EMS received medical facts and classrooms are covered, but no one was assigned to take follow-up calls. The hospital tried three numbers while the parent explained they cannot travel.",
        "question": "How will you repair the information and discharge handoff?",
        "choices": [
          [
            "Assign an authorized liaison now, reconstruct missed calls, involve hospital social work and the parent, and verify the lawful discharge plan.",
            "A named owner restores continuity without assuming medical authority.",
            2
          ],
          [
            "Help arrange transportation and send the hospital a new contact number, but leave backup responsibility undefined.",
            "Transport support helps, yet a second lost call is still possible.",
            1
          ],
          [
            "Tell the hospital whichever caregiver answers first may approve discharge for the family.",
            "Being reachable does not create medical-consent authority.",
            0
          ],
          [
            "Wait for the parent to appear before assigning any hospital contact.",
            "The hospital needs lawful coordination while the transportation problem continues.",
            0
          ]
        ]
      },
      "2": {
        "head": "The unexpected barrier",
        "lead": "Your medical handoff and classroom coverage were effective. Hospital social work now learns the parent’s car broke down, a relative offers a ride, and the hospital asks who can make discharge decisions.",
        "question": "What is the strongest next decision despite having handled the first crisis correctly?",
        "choices": [
          [
            "Coordinate authorized contacts, hospital social work, the parent, and verified safe transportation without assuming neglect or legal custody.",
            "The right initial choice does not eliminate new barriers; verify authority and discharge safety.",
            2
          ],
          [
            "Arrange the ride and verify that the parent receives updates, but postpone confirming discharge decision-making authority.",
            "This may solve transport but not the hospital’s legal and safety question.",
            1
          ],
          [
            "Authorize the helpful relative to sign medical discharge paperwork on behalf of the program.",
            "The program cannot grant the relative medical decision-making powers.",
            0
          ],
          [
            "Tell staff to label the transportation delay as child abandonment in all incident notes.",
            "Inability to travel, without more, does not establish neglect.",
            0
          ]
        ]
      },
      "3": {
        "head": "The missing medical timeline",
        "lead": "Staff followed your direction not to document uncertain symptoms. At the emergency department, clinicians ask when the child first became unresponsive; nobody can reliably answer, and the parent is still unable to travel.",
        "question": "What is your strongest recovery action?",
        "choices": [
          [
            "Reconstruct objective observations and times without inventing facts, designate a liaison, and coordinate authorized family and hospital social-work follow-up.",
            "A transparent gap in the timeline is safer than a fabricated one, and discharge coordination must continue.",
            2
          ],
          [
            "Ask staff to record what each personally remembers and arrange the parent’s transport, but do not yet assign someone to verify the timeline with EMS.",
            "Improves some records but leaves an important communication bridge incomplete.",
            1
          ],
          [
            "Ask everyone to agree on the most plausible symptom onset so the hospital receives a consistent account.",
            "Consistency cannot be manufactured at the expense of reliable medical facts.",
            0
          ],
          [
            "Withhold all timing information until a physician formally diagnoses the illness.",
            "Observed times matter even without a confirmed diagnosis.",
            0
          ]
        ]
      }
    },
    "2": {
      "0": {
        "head": "The report that invites a counter-allegation",
        "lead": "You coordinated a safe hospital plan. Later that afternoon, a family reports possible harm by a staff member without a known date. Rolling camera footage may overwrite. The family asks that you “handle it quietly.”",
        "question": "How do you respond when your successful emergency response is followed by a separate child-protection concern?",
        "choices": [
          [
            "Protect children, preserve available footage, make individual mandated reports when reasonable suspicion exists, assess separate CCL notice duties, and cooperate without promising secrecy.",
            "The new allegation needs its own lawful, timely process even though the hospital crisis was handled well.",
            2
          ],
          [
            "Restrict child contact and make the mandated report, but defer preserving older rolling footage until the family identifies a date.",
            "Safety and reporting begin, yet time-sensitive evidence remains exposed.",
            1
          ],
          [
            "Have the lead teacher conduct repeated child and peer interviews before the reporting agency is contacted.",
            "A private investigation can contaminate disclosures and improperly delay reporting.",
            0
          ],
          [
            "Promise to investigate privately and contact authorities only after video confirms abuse.",
            "Reasonable suspicion, not proof, triggers the mandated reporting duty.",
            0
          ]
        ]
      },
      "1": {
        "head": "Two unresolved handoffs",
        "lead": "You arranged some help for the parent but never assigned backup discharge responsibility. Hospital staff call again as a second family alleges that a caregiver hurt their child on an unknown date; relevant video will soon overwrite.",
        "question": "How will you handle both live problems without delaying mandatory child-protection action?",
        "choices": [
          [
            "Assign hospital discharge coordination, place appropriate interim child protections, secure footage, report reasonable suspicion promptly, and check distinct licensing-notice requirements.",
            "Parallel ownership prevents either child’s safety from depending on completion of the other task.",
            2
          ],
          [
            "Make the mandated report and assign hospital follow-up, but postpone preserving footage until an agency requests it.",
            "Both pathways begin, but avoidable evidence loss remains.",
            1
          ],
          [
            "Complete the hospital discharge arrangements before involving any child-protection agency.",
            "One urgent situation does not suspend an independent reporting deadline.",
            0
          ],
          [
            "Ask employees to question children until the allegation is certain so your hospital work is not interrupted by an unfounded report.",
            "Internal interviews and delay risk compounding harm.",
            0
          ]
        ]
      },
      "2": {
        "head": "The custody assertion is challenged",
        "lead": "Your team told hospital staff that an unverified adult could approve discharge. The hospital rejects that claim and asks for a written clarification. Simultaneously, a parent reports possible employee abuse without a date.",
        "question": "What corrective steps must happen in parallel?",
        "choices": [
          [
            "Withdraw the unsupported consent claim, assign lawful hospital coordination, safeguard children, preserve footage, and make any required child-protection and CCL reports.",
            "Corrects the authority error while responding independently to the new allegation.",
            2
          ],
          [
            "Correct hospital contact information and make the mandated report, but leave footage preservation for the next shift.",
            "Reporting begins, but evidence at risk of overwrite needs immediate attention.",
            1
          ],
          [
            "Have the unverified adult sign a new authorization note and ask classroom staff to gather witness accounts before reporting.",
            "A self-written authorization does not cure consent authority, and private interviews delay reporting.",
            0
          ],
          [
            "Tell the hospital to accept the center’s account because the parent signed an enrollment form months ago.",
            "Enrollment does not grant unrestricted medical decision-making authority.",
            0
          ]
        ]
      },
      "3": {
        "head": "The unanswered discharge decision",
        "lead": "The hospital cannot establish parental consent authority and asks for a supervisor. At the same time, a separate family alleges staff harm to a child and security video may overwrite. No one knows the incident date.",
        "question": "How do you prevent an authority gap from causing a second reporting failure?",
        "choices": [
          [
            "Clarify lawful hospital decision-makers through social work and the parent, assign a liaison, protect children, preserve footage, and report reasonable suspicion promptly.",
            "Maintains two distinct safety tracks with explicit owners and reporting pathways.",
            2
          ],
          [
            "Call both hospital social work and the reporting hotline promptly, but leave preservation of older footage unassigned.",
            "The communications start, but an essential evidence task can still be missed.",
            1
          ],
          [
            "Offer to personally sign hospital consent forms and privately interview the child before deciding whether a report is necessary.",
            "Neither informal medical authority nor investigative questioning is appropriate.",
            0
          ],
          [
            "Post a public request for witnesses to the alleged abuse so an exact timestamp can be found before filing a report.",
            "Public speculation breaches confidentiality and delays required action.",
            0
          ]
        ]
      }
    },
    "3": {
      "0": {
        "head": "A complaint after the right decision",
        "lead": "You protected children, preserved video, and made the required report. Three days later, someone files a licensing complaint alleging that your center fabricated the staff allegation. The accusation is unverified. Employees fear speaking up again, and families want answers.",
        "question": "How should you respond to scrutiny without retreating from your reporting duty?",
        "choices": [
          [
            "Preserve original records and reporting chronology, cooperate factually with licensing, maintain justified safeguards, protect confidential information, and coach staff on good-faith reporting.",
            "An appropriate report can still trigger a complaint. Objective evidence, fairness, and staff trust must carry the response.",
            2
          ],
          [
            "Cooperate with the inspection and protect records, but postpone staff reassurance and coaching until the complaint is closed.",
            "Regulatory cooperation is sound, but silence may chill future child-safety reporting.",
            1
          ],
          [
            "Reveal the reporter’s identity to the employee to show the center did not initiate the concern.",
            "Exposing confidential reporting information may endanger people and undermine lawful process.",
            0
          ],
          [
            "Withdraw the original mandated report to persuade the complainant to stop accusing the center.",
            "A complaint does not invalidate a good-faith report or authorize concealment.",
            0
          ]
        ]
      },
      "1": {
        "head": "The footage is gone",
        "lead": "You reported the concern but waited to preserve older footage. Overnight the system overwrites a potentially relevant segment. The family asks why the recording was not saved, and the agency requests the original preservation timeline.",
        "question": "What leadership response preserves accountability after preventable evidence loss?",
        "choices": [
          [
            "Disclose the actual preservation timeline to investigators, safeguard remaining records, reinforce child protections, and change automatic-retention and escalation procedures.",
            "Accurate disclosure and systemic correction matter more than managing the appearance of an error.",
            2
          ],
          [
            "Preserve what remains, inform the agency of the loss, and assign a future video-export owner, but postpone checking other current allegations.",
            "Addresses this event but leaves broader evidence-preservation risks unexamined.",
            1
          ],
          [
            "Suggest the missing video never existed so no one will conclude the center mishandled the report.",
            "Misrepresentation compounds the original failure.",
            0
          ],
          [
            "Ask a staff member to recreate the missing events in a staged video for the case file.",
            "Fabricated evidence is never an acceptable corrective measure.",
            0
          ]
        ]
      },
      "2": {
        "head": "Repeated questioning becomes a complaint",
        "lead": "Staff repeatedly interviewed the child and classmates. A family now complains that the children were pressured and gives investigators conflicting versions of what adults asked. A licensing analyst requests your notes.",
        "question": "What is the strongest corrective response?",
        "choices": [
          [
            "Stop unauthorized interviews, preserve verbatim original notes and chronology, cooperate with authorized investigators, protect children, and retrain staff on disclosure handling.",
            "Acknowledges the process failure and prevents additional contamination while fulfilling reporting duties.",
            2
          ],
          [
            "Stop interviews and provide the analyst available notes, but do not yet review the program’s disclosure-response procedure.",
            "Immediate harm is limited, though recurrence remains possible.",
            1
          ],
          [
            "Rewrite the notes to match a single consistent statement before giving them to investigators.",
            "Concealing inconsistent versions can compromise the investigation.",
            0
          ],
          [
            "Tell the family that questioning was harmless because staff were only trying to help.",
            "Dismissal avoids the actual risk of influencing disclosure.",
            0
          ]
        ]
      },
      "3": {
        "head": "The delayed report and lost trust",
        "lead": "You waited for proof rather than reporting reasonable suspicion. The parent learns the hotline was never contacted, and a recording was overwritten. A licensing analyst asks why the delay occurred.",
        "question": "How should the director begin repair now?",
        "choices": [
          [
            "Make the mandated report without further delay, document the true chronology, preserve remaining evidence, maintain interim child safeguards, and cooperate with licensing separately.",
            "Late corrective action does not erase the delay, but further concealment would create more harm.",
            2
          ],
          [
            "Contact the reporting hotline and maintain safety coverage, but leave the written timeline until you know what the analyst believes.",
            "Reporting must proceed, but contemporaneous transparency is still necessary.",
            1
          ],
          [
            "Argue that the absence of video proves no reasonable suspicion ever existed.",
            "The reporting threshold does not require confirming footage.",
            0
          ],
          [
            "Ask the parent to withdraw the concern because a licensing complaint would damage the program.",
            "Pressuring a reporting family compounds the ethical and safety failure.",
            0
          ]
        ]
      }
    }
  },
  "schemaVersion": "7.2.0"
}

================================== END data/branching.json ==================================

================================== BEGIN js/app.js ==================================


/* Instructional design: keep the learner at the center. */
const DATA=window.LWM_DATA;
const IMG={"welcomeHero":"images/welcomeHero.webp","welcomeSecondary":"images/welcomeSecondary.webp","welcomeTertiary":"images/welcomeTertiary.webp","welcomeQuirky":"images/welcomeQuirky.webp","ch1a":"images/ch1a.webp","ch1b":"images/ch1b.webp","ch2a":"images/ch2a.webp","ch2b":"images/ch2b.webp","ch3a":"images/ch3a.webp","ch3b":"images/ch3b.webp","ch4a":"images/ch4a.webp","ch4b":"images/ch4b.webp","ch5a":"images/ch5a.webp","ch5b":"images/ch5b.webp"};
const STORAGE='care-with-a-compass-supervisor-v72-72q'; const LEGACY='care-with-a-compass-supervisor-v63-60q'; const MAX_DECISIONS=20;
const CHAPTERS=DATA.lessons.length, Q=DATA.questions;
const BRANCHING=window.COMPASS_BRANCHING; if(!BRANCHING||BRANCHING.schemaVersion!=='7.2.0')throw Error('Branching data missing: ensure branch data loads before the application');
let state=null,storageWorks=true,lastGlossBtn=null;
const ABC='ABCDE';
function fresh(){return {chapter:1,phase:'welcome',history:{},pendingGap:{},wrongTags:{},needsWorkshop:{},maxProgress:{},lab:{},current:null,order:[0,1,2,3,4],lastAnswer:null,reflection:{},refReviewed:{},done:[],capstone:{step:0,choices:[],reflection:'',completed:false},certificateName:'',completedAt:null}}
function load(){try{let a=localStorage.getItem(STORAGE)||sessionStorage.getItem(STORAGE);return a?JSON.parse(a):null}catch(e){try{let a=sessionStorage.getItem(STORAGE)||sessionStorage.getItem(LEGACY);return a?JSON.parse(a):null}catch(_){storageWorks=false;return null}}}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state));storageWorks=true}catch(e){try{sessionStorage.setItem(STORAGE,JSON.stringify(state));storageWorks=true}catch(_){storageWorks=false}}}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function chItems(ch){return Q.filter(q=>q.chapter===ch)}
function history(ch){return state.history[ch]||[]}
function unique(ch){return new Set(history(ch).map(x=>x.id)).size}
function latestResults(ch){let map={}; for(const e of history(ch))map[e.id]=e.correct;return map}
// A clean first pass ends after twelve decisions. Unresolved decisions receive targeted practice, then move to live support after the chapter ceiling.
function passes(ch){const map=latestResults(ch);const ids=chItems(ch).map(q=>q.id);return ids.every(id=>map[id]===true)}
function chapterReady(ch){let ready=passes(ch);let capped=history(ch).length>=Math.max(MAX_DECISIONS,chItems(ch).length+8);if(capped&&!ready)state.needsWorkshop[ch]=true;return ready||capped}
function chapterProgress(ch){if(state.done.includes(ch)||chapterReady(ch))return 100;let seen=unique(ch);if(!seen)return 0;let latest=latestResults(ch);let correct=Object.values(latest).filter(Boolean).length;let raw=Math.min(97,Math.round(66*seen/chItems(ch).length+25*correct/chItems(ch).length+6*Math.max(0,history(ch).length-chItems(ch).length)/6));state.maxProgress[ch]=Math.max(state.maxProgress[ch]||0,raw);return state.maxProgress[ch]}
function progressHtml(ch){let v=chapterProgress(ch);return `<section class="chapterprogress" aria-label="Chapter ${ch} progress"><div class="progressline"><span>Chapter progress</span><span>${v===100?'Complete':v===0?'Ready to begin':'In progress'}</span></div><div class="bar" role="progressbar" aria-label="Chapter ${ch} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}"><div class="fill" style="width:${v}%"></div></div><p class="progresshint">${v===100?'Supervisory decisions complete.':'Keep exploring supervisory decisions and evidence.'}</p></section>`}
function nav(){let n=document.getElementById('nav');n.innerHTML=DATA.lessons.map((l,i)=>{const ch=i+1,done=state.done.includes(ch),cur=ch===state.chapter,v=chapterProgress(ch);return `<div class="navitem ${cur?'current':''} ${done?'done':''}" ${cur?'aria-current="step"':''}><span class="round">${done?'✓':ch}</span><div class="navcopy"><span class="navlabel">${esc(l.title)}</span><div class="navtrack" role="progressbar" aria-label="Chapter ${ch}: ${esc(l.title)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}"><span class="navfill" style="width:${v}%"></span></div></div></div>`}).join('');if(window.innerWidth<=830){let a=n.querySelector('.navitem.current');if(a){n.scrollLeft=Math.max(0,a.offsetLeft-n.offsetLeft-n.clientWidth/2+a.clientWidth/2)}}}
function hydratePhotos(){document.querySelectorAll('img[data-photo]').forEach(img=>{const k=img.getAttribute('data-photo');if(IMG[k]){img.src=IMG[k];img.loading='lazy';img.decoding='async';}})}
function render(content){nav();document.getElementById('main').innerHTML=content;hydratePhotos();let h=document.getElementById('focushead');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}window.scrollTo({top:0,behavior:'instant'});save()}
function sourcesHtml(){return `<details><summary>Course readings, California rules and references</summary><p class="meta">Original EDACE 830 supervisor-training demonstration. Class readings and outside references are listed below. Scenarios are fictional composites; requirements depend on license type, jurisdiction, age group and role. This is not legal, clinical or mandated-reporter certification.</p><ul>${DATA.sources.map(x=>`<li>${x[1]?`<a href="${esc(x[1])}" target="_blank" rel="noopener noreferrer">${esc(x[0])}</a>`:esc(x[0])}</li>`).join('')}</ul></details>`}
/* Richard Lawrence Stenlund: judge the situation, not the child. */
const BANNER_SLIDES=[
 {key:'welcomeHero',alt:'Children gathered around a table in an active child care classroom.',caption:'Learning happens in the middle of everyday routines.',position:'center 56%'},
 {key:'welcomeSecondary',alt:'Instructor sharing a guitar lesson with young children in the program.',caption:'Supervisors support the adults who make these experiences possible.',position:'center 46%'},
 {key:'ch3a',alt:'Children and caregivers together on an educational outing at a boardwalk.',caption:'Care extends beyond the classroom. Planning and supervision travel with the group.',position:'center 48%'},
 {key:'welcomeQuirky',alt:'Children watching bubbles fill an indoor play area.',caption:'The ordinary moments matter. So does the leadership behind them.',position:'center 42%'}
];
let bannerIndex=0;
function bannerChange(next){
 const img=document.getElementById('bannerImage'),caption=document.getElementById('bannerCaption');
 if(!img||!caption)return;
 bannerIndex=(next+BANNER_SLIDES.length)%BANNER_SLIDES.length;
 const slide=BANNER_SLIDES[bannerIndex];
 img.src=IMG[slide.key];img.alt=slide.alt;img.style.objectPosition=slide.position;
 caption.textContent=slide.caption;
 document.querySelectorAll('[data-slide-dot]').forEach((b,i)=>{b.setAttribute('aria-current',String(i===bannerIndex));b.setAttribute('aria-label','Show photograph '+(i+1)+' of '+BANNER_SLIDES.length+(i===bannerIndex?', currently selected':''))});
 const status=document.getElementById('bannerStatus');if(status)status.textContent='Photograph '+(bannerIndex+1)+' of '+BANNER_SLIDES.length;
}
function bannerKeydown(event){if(event.key==='ArrowRight'){event.preventDefault();bannerChange(bannerIndex+1)}else if(event.key==='ArrowLeft'){event.preventDefault();bannerChange(bannerIndex-1)}}
function welcome(){state.phase='welcome';bannerIndex=0;render(`
<div class="eyebrow">EDACE 830 · Online adult-learning demonstration</div>
<section class="opening-banner" aria-roledescription="carousel" aria-label="Photographs from an early childhood program" onkeydown="bannerKeydown(event)">
  <img id="bannerImage" src="${IMG.welcomeHero}" alt="${BANNER_SLIDES[0].alt}" style="object-position:${BANNER_SLIDES[0].position}" decoding="async" fetchpriority="high">
  <div class="banner-tint" aria-hidden="true"></div>
  <div class="banner-copy"><p class="banner-kicker">The Supervisor Leadership Academy</p><h1 id="focushead">Care with a Compass</h1><p class="banner-subhead">The hard part is not knowing the rules. It is knowing what to do when everything happens at once.</p></div>
  <div class="banner-controls"><button class="banner-arrow" type="button" onclick="bannerChange(bannerIndex-1)" aria-label="Previous photograph">‹</button><button class="banner-arrow" type="button" onclick="bannerChange(bannerIndex+1)" aria-label="Next photograph">›</button></div>
</section>
<div class="banner-meta"><p id="bannerCaption">${BANNER_SLIDES[0].caption}</p><div class="banner-dots" role="group" aria-label="Choose a photograph">${BANNER_SLIDES.map((slide,i)=>`<button type="button" data-slide-dot="${i}" aria-current="${i===0}" aria-label="Show photograph ${i+1} of ${BANNER_SLIDES.length}" onclick="bannerChange(${i})"></button>`).join('')}</div></div>
<p id="bannerStatus" class="sr-only" aria-live="polite">Photograph 1 of 4</p>
<section class="card welcome-lede"><div><span class="tag">From classroom to director’s desk</span><h2>What would you do?</h2><p>Anyone can explain a policy when the room is quiet. A supervisor has to apply it while children need attention, staff are stretched thin, parents are calling, and the next problem is already arriving.</p><p>This program puts you in the director’s position. You will handle staffing conflicts, licensing responsibilities, family concerns, emergencies, and situations where a perfectly reasonable first decision creates a new problem.</p><p>Some questions are deliberately difficult. A response may be understandable without being the strongest one. The feedback explains the trade-offs so you can learn from the decision rather than just memorize an answer.</p><div class="actions"><button class="action" onclick="resume()">${state.chapter>1||history(state.chapter).length||state.current?'Continue the training':'Begin chapter one'}</button><button class="action secondary" onclick="restart()">Start a fresh session</button></div></div><aside class="welcome-facts" aria-label="Program at a glance"><div><strong>5</strong><span>Learning chapters</span></div><div><strong>${Q.length}</strong><span>Applied questions</span></div><div><strong>5 + 1</strong><span>Branching labs and capstone</span></div><div><strong>Offline</strong><span>Self-contained training</span></div></aside></section>
<section class="card"><h2>What supervisors will practice</h2><div class="chapter-highlights"><div><strong>Lead adults</strong><span>Coach staff, confront harmful attitudes, and preserve fair expectations.</span></div><div><strong>Keep children safe</strong><span>Respond to emergencies while maintaining required supervision.</span></div><div><strong>Work with families</strong><span>Navigate difficult conversations, boundaries, and competing obligations.</span></div><div><strong>Make defensible decisions</strong><span>Identify facts, document concerns, and know when to escalate.</span></div><div><strong>Learn from incidents</strong><span>Turn unexpected problems into better training and procedures.</span></div></div></section>
<section class="card"><h2>How the learning works</h2><p><strong>First, you get the context.</strong> Each chapter includes a short lesson, key concepts, and examples drawn from the practical work of supervising caregivers. Then you make decisions in fictionalized situations based on challenges that arise in early childhood programs.</p><p><strong>Then the program adapts.</strong> Responses receive specific feedback. When your decisions indicate a gap, the module supplies targeted reinforcement and another chance to apply the concept. The goal is to build judgment, not to reward lucky guesses.</p><div class="process-strip"><div><span class="step-number">01</span><strong>Understand</strong><span>Read the lesson and explore definitions.</span></div><div><span class="step-number">02</span><strong>Decide</strong><span>Respond to a realistic supervisory dilemma.</span></div><div><span class="step-number">03</span><strong>Reconsider</strong><span>Review explanatory feedback and trade-offs.</span></div><div><span class="step-number">04</span><strong>Apply</strong><span>Practice again and transfer learning to the job.</span></div></div></section>
<section class="card"><h2>Training coverage at a glance</h2><p>The academy includes ${Q.length} applied questions across five chapters, with chapter-specific question counts. Answer choices have their own explanations and source references. An incorrect answer triggers a connected follow-up before the chapter review; after repeated attempts, the module recommends coached practice rather than claiming mastery.</p><div style="overflow-x:auto"><table class="coverage-table"><thead><tr><th>Chapter</th><th>What is assessed</th><th>Questions</th></tr></thead><tbody><tr><td>1 · Staff culture</td><td>Coaching, staff privacy, burnout, respectful conduct and clearance</td><td>${chItems(1).length}</td></tr><tr><td>2 · Reporting</td><td>Reasonable suspicion, evidence, family rights, pickup and privacy</td><td>${chItems(2).length}</td></tr><tr><td>3 · Licensing</td><td>Ratios, capacity, inspections, attendance, hazards and transport</td><td>${chItems(3).length}</td></tr><tr><td>4 · Emergencies</td><td>Health plans, crisis staffing, evacuation, reporting and near misses</td><td>${chItems(4).length}</td></tr><tr><td>5 · Improvement</td><td>Inclusion, accessibility, training transfer and program improvement</td><td>${chItems(5).length}</td></tr></tbody></table></div><p class="meta">The references are linked after each answered question. Legal requirements vary by license category and should be checked against current California guidance.</p><div class="report-actions"><button class="action secondary" type="button" onclick="downloadProgress()">Download my learning summary</button></div></section>${sourcesHtml()}`)}
function resume(){if(state.phase==='capstone')return capstone();if(state.phase==='certificate')return certificateView();if(state.phase==='finished')return finish();if(state.phase==='reflection'||chapterReady(state.chapter))return reflection();if(state.current)return showQuestion();return lesson()}
function restart(){if(confirm('Start over? This resets progress in this tab.')){state=fresh();welcome()}}
/* Richard Lawrence Stenlund: language should open doors. */
function glossary(text){
 // One pass through visible text only. Never search within HTML attributes or a newly inserted tooltip.
 const terms=Object.entries(DATA.glossary).sort((a,b)=>b[0].length-a[0].length);
 const seen=new Set();
 const escaped=terms.map(([term])=>term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
 const pattern=new RegExp('\\b('+escaped.join('|')+')(?:s|es)?\\b','gi');
 return text.split(/(<[^>]+>)/g).map(segment=>{
   if(segment.startsWith('<'))return segment;
   return segment.replace(pattern,(full)=>{
     const lower=full.toLowerCase();
     const entry=terms.find(([term])=>lower===term.toLowerCase() || lower===term.toLowerCase()+'s' || lower===term.toLowerCase()+'es');
     if(!entry || seen.has(entry[0]))return full;
     const [term,def]=entry;
     seen.add(term);
     return `<button class="glossbtn" type="button" data-definition="${esc(def)}" data-term="${esc(term)}" aria-label="${esc(full)}. Definition available" aria-expanded="false" onclick="showGloss(this.dataset.term,this)">${esc(full)}<span class="glosshint" aria-hidden="true">?</span></button>`;
   });
 }).join('');
}
function positionGloss(){
 const g=document.getElementById('glossary');
 if(!g||g.hidden||!lastGlossBtn||!lastGlossBtn.isConnected)return;
 const rect=lastGlossBtn.getBoundingClientRect(),gap=10,pad=12;
 const width=g.offsetWidth,height=g.offsetHeight;
 const vw=document.documentElement.clientWidth,vh=window.innerHeight;
 const left=Math.max(pad,Math.min(rect.left,vw-width-pad));
 let top=rect.bottom+gap;
 if(top+height>vh-pad){
   top=rect.top-height-gap>=pad?rect.top-height-gap:Math.max(pad,vh-height-pad);
 }
 g.style.left=Math.round(left)+'px';
 g.style.top=Math.round(top)+'px';
}
function showGloss(term,btn){
 const g=document.getElementById('glossary');if(!g)return;
 if(lastGlossBtn&&lastGlossBtn!==btn)lastGlossBtn.setAttribute('aria-expanded','false');
 lastGlossBtn=btn;
 btn.setAttribute('aria-controls','glossary');btn.setAttribute('aria-expanded','true');
 g.classList.add('gloss-popover');g.setAttribute('role','dialog');
 g.hidden=false;
 g.innerHTML=`<strong>${esc(term)}</strong><p>${esc(DATA.glossary[term])}</p><button class="action secondary" type="button" onclick="closeGloss()">Close definition</button>`;
 document.body.classList.add('gloss-open');
 positionGloss();
 g.focus({preventScroll:true});
}
function closeGloss(restoreFocus=true){
 const g=document.getElementById('glossary');if(g)g.hidden=true;
 document.body.classList.remove('gloss-open');
 if(lastGlossBtn){lastGlossBtn.setAttribute('aria-expanded','false');if(restoreFocus&&lastGlossBtn.isConnected)lastGlossBtn.focus({preventScroll:true})}
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.querySelector('.glossbox.gloss-popover:not([hidden])')){e.preventDefault();closeGloss()}});
document.addEventListener('pointerdown',e=>{
 const g=document.getElementById('glossary');
 if(g&&!g.hidden&&!g.contains(e.target)&&!e.target.closest('.glossbtn'))closeGloss(false);
});
window.addEventListener('resize',positionGloss);
window.addEventListener('scroll',()=>{
 const g=document.getElementById('glossary');
 if(g&&!g.hidden)positionGloss();
},{passive:true});
function lensHtml(ch){const items=(DATA.lensCases||[]).filter(x=>(x.chapter||0)===ch);const item=items[0]||DATA.lensCases?.[ch-1];if(!item)return '';return `<details class="lens"><summary>Try another angle: ${esc(item.title)}</summary><p>${esc(item.situation)}</p><p><strong>What would you ask first?</strong> ${esc(item.question)}</p><button class="action secondary" type="button" onclick="showLens(this,${ch})">Consider both perspectives</button><div class="lenscompare" hidden></div></details>`}
function extraLensesHtml(){return (DATA.lensCases||[]).slice(5).map((item,idx)=>`<details class="lens"><summary>Try another angle: ${esc(item.title)}</summary><p>${esc(item.situation)}</p><p><strong>What would you ask first?</strong> ${esc(item.question)}</p><button class="action secondary" type="button" aria-expanded="false" onclick="showLens(this,${6+idx})">Consider both perspectives</button><div class="lenscompare" hidden></div></details>`).join('')}
function showLens(btn,ch){let item=DATA.lensCases?.[ch-1],el=btn.nextElementSibling;if(!item||!el)return;let expanded=!el.hidden;el.hidden=expanded;btn.textContent=expanded?'Consider both perspectives':'Hide the perspectives';btn.setAttribute('aria-expanded',String(!expanded));if(!expanded){el.innerHTML=`<div class="perspectives"><div><strong>Staff, child, or family perspective</strong><p>${esc(item.employee)}</p></div><div><strong>Leadership or program perspective</strong><p>${esc(item.supervisor)}</p></div></div><p class="meta">Ask questions and check the facts before making a decision.</p>`}}

// Two connected, changing-facts decisions per chapter. All people and settings are fictionalized instructional composites.
const LABELS={2:'Most complete response',1:'Defensible, with conditions',0:'Reconsider the trade-off'};
const TRAILS={"1":{"title":"The missing child at pickup","intro":"At the end of the day, a parent arrives to collect her child. The attendance sheet shows that the child was signed out 15 minutes ago, but the parent says nobody picked her up. The new teacher says another staff member told her to complete sign-out entries before families arrived. The child is still safely in the classroom.","first":{"prompt":"What should the director do first?","options":[{"text":"Confirm the child is safe, correct the inaccurate record, and find out who instructed staff to sign children out early.","level":2,"why":"The child is safe, but the false departure time is a serious accountability problem. Address the record immediately and investigate how the instruction arose."},{"text":"Ask the parent to sign the child out now, then review the recordkeeping process with the team before the next pickup period.","level":1,"why":"This addresses the immediate handoff, but it leaves the false entry and its cause insufficiently documented and investigated."},{"text":"Keep the original entry because changing attendance records after the fact could create questions during an inspection.","level":0,"why":"Knowingly leaving an inaccurate entry in place compounds the problem. Corrections should be transparent and traceable."},{"text":"Send the teacher home for the day and ask the most experienced staff member to handle sign-outs.","level":0,"why":"Removing the teacher may be necessary in some circumstances, but it does not establish why the record was falsified or repair the current entry."}]},"follow":{"lead":"The director learns that two shift leads gave opposite instructions: one said to record the actual departure time, while the other told staff to fill in times early to speed up pickup. Another parent now asks whether the facility can prove exactly when her child left yesterday.","prompt":"How should the director respond to the new problem?","options":[{"text":"Preserve the original entries and correction history, review yesterday’s handoff evidence, retrain both shift leads on one written procedure, and explain verified facts to the parent.","level":2,"why":"This protects record integrity, addresses the parent’s concern without guessing, and fixes the conflicting instructions."},{"text":"Review yesterday’s records with the parent, then remind staff at the next meeting to be more careful.","level":1,"why":"Reviewing the concern is reasonable, but a general reminder is inadequate when supervisors have been giving contradictory directions."},{"text":"Rewrite yesterday’s departure times to match the usual pickup schedule so the records look consistent.","level":0,"why":"Inventing or backdating departure times destroys the reliability of the records."},{"text":"Tell the parent that sign-out records are internal documents and refuse to discuss whether the entry is accurate.","level":0,"why":"A dismissive response avoids the concern and does nothing to resolve potentially inaccurate records."}]},"takeaway":"A coaching problem can become a records-integrity and family-trust problem. Verify the child’s safety, preserve an accurate audit trail, correct conflicting instructions, and then assess individual accountability."},"2":{"title":"A report with no timestamp","intro":"A family alleges a caregiver hurt their child at an unknown time. Video overwrites after several days.","first":{"prompt":"What is your immediate response?","options":[{"text":"Temporarily reassign the caregiver, preserve today’s footage, and wait for the family to identify a date.","level":1,"why":"Immediate protective steps help, but reasonable-suspicion reporting must not wait for a timestamp."},{"text":"Protect children, preserve all available rolling footage, and make required reports based on reasonable suspicion.","level":2,"why":"Reporting and protective measures can proceed without a private investigation or a precise timestamp."},{"text":"Have teachers question the child and classmates repeatedly until they agree on when the incident occurred.","level":0,"why":"Repeated questioning risks harm and compromises an external investigation."},{"text":"Wait for a licensing analyst before preserving the footage or contacting child protection.","level":0,"why":"Recording may overwrite, and reporting duties cannot wait for an agency visit."}]},"follow":{"lead":"The allegation remains unsubstantiated after the initial agency report. A different parent asks whether the accused caregiver will be allowed to work.","prompt":"What should the director say or do?","options":[{"text":"Tell other families the employee committed abuse so they can decide whether to withdraw.","level":0,"why":"An allegation is not a finding, and confidential personnel information requires protection."},{"text":"Maintain safe staffing but refuse to give the directly affected family any appropriate process update.","level":1,"why":"Protecting confidentiality matters, but the directly affected family may need factual safety and process information."},{"text":"Share verified safety arrangements as appropriate, maintain interim protections, and cooperate with investigators.","level":2,"why":"This balances child safety, family trust, and fair treatment of the accused employee."},{"text":"Restore unsupervised duties because the first agency contact did not lead to an immediate arrest.","level":0,"why":"A pending investigation is not proof of safety."}]},"takeaway":"Protect children, preserve recordings before overwrite, report reasonable suspicion promptly, and communicate verified facts without declaring guilt."},"3":{"title":"The clock and the ratio","intro":"A teacher is late. A second teacher suggests signing in for them so the attendance sheet shows enough coverage.","first":{"prompt":"What does the director decide?","options":[{"text":"Ask the arriving teacher to sign in at the scheduled time so the daily roster appears compliant.","level":0,"why":"False attendance records conceal rather than fix an actual staffing gap."},{"text":"Step into the room or assign qualified coverage, record actual times, and control intake if needed.","level":2,"why":"Real-time qualified coverage and accurate records come before administrative follow-up."},{"text":"Move children to the adjacent classroom without checking its current ratio.","level":1,"why":"Moving children might work, but only after verifying the receiving room has capacity and supervision."},{"text":"Ask a parent with public-school teaching experience to supervise until the employee arrives.","level":0,"why":"A credential alone does not establish clearance or eligibility to count toward ratio."}]},"follow":{"lead":"The employee arrives late again the next week, and they report a childcare transportation problem of their own.","prompt":"What longer-term response is defensible?","options":[{"text":"Allow informal recurring late arrivals and ask the opener to manage as best they can.","level":1,"why":"Flexibility is possible, but undocumented coverage gaps are not."},{"text":"Dock every opening employee’s pay whenever one colleague is late.","level":0,"why":"Collective pay penalties do not create qualified coverage and may violate wage rules."},{"text":"Set documented expectations, arrange a qualified backup, and consider a formal schedule adjustment.","level":2,"why":"The plan addresses both the employee’s barrier and the center’s daily safety obligations."},{"text":"Terminate the teacher during check-in without securing replacement coverage.","level":0,"why":"The response may create another supervision emergency."}]},"takeaway":"A schedule is not supervision. Maintain real-time ratios, keep honest records, and solve repeat attendance problems through verified staffing plans."},"4":{"title":"The child who remains at the hospital","intro":"A child is transferred to emergency care. A parent answers the phone but refuses to come to the hospital.","first":{"prompt":"What is the director’s plan?","options":[{"text":"Confirm the hospital has essential medical and contact records, maintain appropriate coordination, and document the parent’s response.","level":2,"why":"The director should support safe handoff and appropriate communication without assuming legal custody."},{"text":"Stay at the hospital indefinitely without arranging supervision back at the center.","level":1,"why":"Supporting the child is valuable, but the director must also protect the children still in care and coordinate authorized responsibilities."},{"text":"Take the child to the director’s home if the parent cannot arrive by discharge.","level":0,"why":"An informal private placement bypasses legal authority and safe discharge procedures."},{"text":"Tell hospital staff that the parent has abandoned the child and end all communication.","level":0,"why":"The facts do not establish abandonment, and the director must provide accurate information."}]},"follow":{"lead":"The parent now says they have no transportation, and the hospital is concerned about a safe discharge plan.","prompt":"What does the director do next?","options":[{"text":"Coordinate with hospital social work and the parent on a safe discharge plan, document barriers, and consult proper authorities if safety concerns meet reporting thresholds.","level":2,"why":"Practical support and appropriate escalation protect the child without making unsupported accusations."},{"text":"Arrange a verified transportation option with the parent and hospital while continuing to assess whether discharge is safe.","level":1,"why":"Transportation may solve part of the problem, but discharge safety and legal responsibility still require confirmation."},{"text":"Promise the hospital that an unapproved volunteer will sign discharge forms.","level":0,"why":"An unapproved volunteer cannot assume parental or legal consent authority."},{"text":"Make a public post naming the parent to pressure them to come to the hospital.","level":0,"why":"Public accusations violate privacy and may make the situation less safe."}]},"takeaway":"An emergency does not end at transport. Coordinate factual handoffs, preserve roles and consent authority, and solve barriers without assuming neglect from hardship alone."},"5":{"title":"The near miss becomes a pattern","intro":"The program received written reminders to secure gates and verify emergency plans. A substitute missed a critical handoff and a gate was left open.","first":{"prompt":"What director-level action is strongest?","options":[{"text":"Secure the gate, verify every child is safe, document the near miss, and address the recurring failure through accountable staff retraining and system changes.","level":2,"why":"Immediate safety measures and systemic correction are both necessary."},{"text":"Secure the gate and remind staff to sign the existing checklist before the next shift.","level":1,"why":"The immediate risk is addressed, but reminders alone may not fix the system failure."},{"text":"Increase enrollment to offset the time lost to staff retraining.","level":0,"why":"Revenue does not address the safety defect."},{"text":"Punish all employees equally so no one will admit a future near miss.","level":0,"why":"Collective blame discourages reporting and learning."}]},"follow":{"lead":"Three weeks later, the new checklist is complete, but observation shows staff routinely sign it without checking.","prompt":"How should the program evaluation respond?","options":[{"text":"Observe actual practice, redesign verification so signatures reflect completed checks, and use follow-up audits to measure compliance.","level":2,"why":"Evaluation must test behavior and safety outcomes, not merely completed paperwork."},{"text":"Add a second signature line and revisit the problem after a month.","level":1,"why":"Another signature may help accountability, but it is not evidence that the gate was checked."},{"text":"Report that training succeeded because the checklist completion rate reached 100 percent.","level":0,"why":"A completed form is not proof of safer behavior."},{"text":"Stop observing because the new paperwork demonstrates staff buy-in.","level":0,"why":"Stopping observation hides the gap between documented and actual practice."}]},"takeaway":"Evaluate what staff actually do, not what forms say they did. Use observed performance, feedback, and repeated checks to verify transfer of training."}};
function trailFeedback(option){return `<strong>${LABELS[option.level]}.</strong> ${esc(option.why)}`}
function decisionLabHtml(ch){let t=TRAILS[ch];if(!t)return '';let st=state.lab?.[ch]||{};return `<details class="decision-lab" ${st.stage?'open':''}><summary>${esc(t.title)}</summary><p>${esc(t.intro)}</p><p class="lab-instruction">Choose a response. The next situation, decision options, and consequences will depend on what you choose.</p><p><strong>${esc(t.first.prompt)}</strong></p><div class="lab-choices" id="lab-one">${t.first.options.map((x,i)=>`<button class="lab-option" type="button" aria-pressed="${st.first===i}" onclick="labChoose(${ch},1,${i})">${ABC[i]}. ${esc(x.text)}</button>`).join('')}</div><div id="lab-reveal">${labRevealHtml(ch,st)}</div></details>`}
function labFollow(ch,st){return BRANCHING.labs[String(ch)]?.[String(st.first)] || TRAILS[ch].follow}
function labRevealHtml(ch,st){if(!st||st.first===undefined)return '';const t=TRAILS[ch],a=t.first.options[st.first],follow=labFollow(ch,st);let s=`<div class="lab-feedback ${a.level===2?'':a.level===1?'acceptable':'review'}" tabindex="-1" id="lab-feedback-one">${trailFeedback(a)}</div><div class="lab-step">Your decision changes what happens next</div><p class="branch-context">${esc(follow.lead)}</p><p><strong>${esc(follow.prompt)}</strong></p><div class="lab-choices" id="lab-two">${follow.options.map((x,i)=>`<button class="lab-option" type="button" aria-pressed="${st.second===i}" onclick="labChoose(${ch},2,${i})">${ABC[i]}. ${esc(x.text)}</button>`).join('')}</div>`;if(st.second!==undefined){let b=follow.options[st.second];s+=`<div class="lab-feedback ${b.level===2?'':b.level===1?'acceptable':'review'}" tabindex="-1" id="lab-feedback-two">${trailFeedback(b)}<p>${esc(follow.takeaway)}</p></div>`}return s}
function labChoose(ch,step,i){const t=TRAILS[ch];if(!t||ch!==state.chapter)return;state.lab[ch]??={};const opts=step===1?t.first.options:labFollow(ch,state.lab[ch]).options;if(i<0||i>=opts.length)return;if(step===1)state.lab[ch]={first:i,stage:true};else if(state.lab[ch].first!==undefined){state.lab[ch].second=i;state.lab[ch].stage=true}else return;let box=document.getElementById('lab-reveal');if(box){box.innerHTML=labRevealHtml(ch,state.lab[ch]);document.getElementById(step===1?'lab-feedback-one':'lab-feedback-two')?.focus({preventScroll:true})}document.querySelectorAll('#lab-one .lab-option').forEach((b,j)=>b.setAttribute('aria-pressed',String(j===state.lab[ch].first)));save()}

function lesson(){const ch=state.chapter,l=DATA.lessons[ch-1];state.phase='lesson';render(`<div class="eyebrow">Chapter ${ch} of ${CHAPTERS} · Lesson</div><h1 id="focushead">${esc(l.title)}</h1><p class="lede">${esc(l.subtitle)}</p>${progressHtml(ch)}<section class="card lesson"><div class="lesson-mark" aria-hidden="true">${['✦','☼','✚','⚖','♡'][ch-1]}</div>${glossary(l.html)}${decisionLabHtml(ch)}${lensHtml(ch)}${ch===5?extraLensesHtml():''}<div class="glossbox" id="glossary" role="region" aria-label="Glossary definition" tabindex="-1" hidden></div></section><div class="actions"><button class="action" onclick="continueFromLesson()">${history(ch).length||state.current?'Continue supervisory decisions':'Try a supervisory situation'}</button></div>${sourcesHtml()}`)}

function continueFromLesson(){return state.current ? showQuestion() : question()}
// Consolidated misconception families are aligned with the chapter objective.
function pick(ch){let items=chItems(ch),h=history(ch),latest=latestResults(ch),seen=new Set(h.map(x=>x.id));let pending=state.pendingGap[ch];let unused=items.filter(q=>!seen.has(q.id));let pool=unused.length?unused:items.filter(q=>latest[q.id]!==true);if(!pool.length)pool=items;
 if(pending){let nearby=pool.filter(q=>q.id!==pending.origin&&q.family===pending.family);if(nearby.length)pool=nearby;delete state.pendingGap[ch]}
 let counts={};h.forEach(e=>counts[e.id]=(counts[e.id]||0)+1);pool.sort((a,b)=>(counts[a.id]||0)-(counts[b.id]||0)||a.id.localeCompare(b.id));return pool[0]}
function question(){state.selectedMulti=[];let ch=state.chapter;if(chapterReady(ch))return reflection();let q=pick(ch);state.current=q.id;state.lastAnswer=null;state.phase='question';state.order=q.choices.map((_,i)=>i);showQuestion()}
function citeQ(q){return `<div class="scenario-references"><strong>Why this guidance?</strong> ${q.refs.map(k=>{const r=DATA.sourceMap[k];if(!r)return '';const label=r.short+(r.chaptersByChapter?`, ${r.chaptersByChapter[String(q.chapter)]||'chs. 8–9'}`:'');return r.url?`<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`:`<span>${esc(label)}</span>`}).filter(Boolean).join(' · ')}</div>`}
function showQuestion(){state.phase=state.lastAnswer!==null?'answered':'question';let ch=state.chapter,q=Q.find(x=>x.id===state.current);if(!q)return question();let answered=state.phase==='answered';let opt=state.order||q.choices.map((_,i)=>i),multi=!!q.multi;state.selectedMulti??=[];render(`<div class="eyebrow">Chapter ${ch} of ${CHAPTERS} · Director’s decision</div><h1 id="focushead">${esc(DATA.lessons[ch-1].title)}</h1>${progressHtml(ch)}<div class="card"><span class="tag">You are the director</span><span class="tag">${chItems(ch).length} situations in this chapter</span>${multi?'<span class="tag">Select all that apply</span>':''}<h2>${esc(q.scenario)}</h2><p>${multi?'Choose ALL necessary or defensible actions. More than one answer is correct; do not select actions that undermine safety or fairness.':'Which response is the strongest initial supervisory decision? A second response may also be defensible with conditions.'}</p><div class="choices">${opt.map((j,i)=>{let L=ABC[j],sel=multi&&state.selectedMulti.includes(L);return `<button class="choice ${sel?'chosen':''}" id="opt${i}" data-letter="${L}" ${multi?`aria-pressed="${sel}" onclick="toggleMulti('${L}')"`:`onclick="answer('${L}')"`} ${answered?'disabled':''}><span class="letter">${multi?(sel?'✓':'□'):ABC[i]}</span><span>${esc(q.choices[j])}</span></button>`}).join('')}</div>${multi&&!answered?'<div class="actions"><button class="action" onclick="submitMulti()">Evaluate selected actions</button></div>':''}<div id="response" aria-live="polite"></div></div><details><summary>Review the chapter lesson</summary><div class="lesson">${glossary(DATA.lessons[ch-1].html)}${lensHtml(ch)}${ch===5?extraLensesHtml():''}</div><div class="glossbox" id="glossary" role="region" aria-label="Glossary definition" tabindex="-1" hidden></div></details><div class="actions"><button class="action ghost" onclick="lesson()">Return to lesson</button><button class="action ghost" onclick="welcome()">Pause / overview</button></div>`);if(answered)showFeedback(q,state.lastAnswer)}
function gradeResponse(q,selection){if(q.multi){let selected=selection?selection.split('|').filter(Boolean):[];let gold=q.answerSet;return selected.length===gold.length&&selected.every(x=>gold.includes(x))?2:(selected.length&&selected.every(x=>gold.includes(x))?1:0)}return selection===q.answer?2:(q.acceptable&&q.acceptable[selection]?1:0)}
function recordResponse(q,selection){let ch=state.chapter,quality=gradeResponse(q,selection),ok=q.multi?quality===2:quality>0;state.lastAnswer=selection;state.phase='answered';(state.history[ch]??=[]).push({id:q.id,correct:ok,quality,option:selection});if(!ok){let fam=q.family;(state.wrongTags[ch]??={})[fam]=((state.wrongTags[ch]||{})[fam]||0)+1;state.pendingGap[ch]={family:fam,origin:q.id}}showFeedback(q,selection);if(q.multi)document.querySelector('button[onclick="submitMulti()"]')?.parentElement?.remove();nav();let p=document.querySelector('.chapterprogress');if(p)p.outerHTML=progressHtml(ch);save()}
function answer(letter){if(state.phase!=='question'||state.lastAnswer!==null)return;recordResponse(Q.find(x=>x.id===state.current),letter)}
function toggleMulti(letter){if(state.phase!=='question'||state.lastAnswer!==null)return;state.selectedMulti??=[];state.selectedMulti=state.selectedMulti.includes(letter)?state.selectedMulti.filter(x=>x!==letter):[...state.selectedMulti,letter].sort();document.querySelectorAll('.choice').forEach(el=>{let sel=state.selectedMulti.includes(el.dataset.letter);el.setAttribute('aria-pressed',sel?'true':'false');el.classList.toggle('chosen',sel);el.querySelector('.letter').textContent=sel?'✓':'□'});save()}
function submitMulti(){if(state.phase!=='question'||state.lastAnswer!==null)return;if(!state.selectedMulti?.length){let r=document.getElementById('response');r.innerHTML='<p class="note" role="alert">Choose one or more actions before evaluating.</p>';return}recordResponse(Q.find(x=>x.id===state.current),state.selectedMulti.join('|'))}
function showFeedback(q,selection){let quality=gradeResponse(q,selection),ch=state.chapter,multi=!!q.multi,sel=multi?selection.split('|'): [selection],gold=multi?q.answerSet:[q.answer];document.querySelectorAll('.choice').forEach(el=>{el.disabled=true;let v=el.dataset.letter;el.classList.toggle('chosen',sel.includes(v));el.classList.toggle('preferred',gold.includes(v));});let text='';if(multi){let missing=gold.filter(x=>!sel.includes(x)),extras=sel.filter(x=>!gold.includes(x));let lines=gold.map(k=>`<li><strong>${k}.</strong> ${esc(q.choices[ABC.indexOf(k)])}</li>`).join('');let reasons=sel.map(k=>`<li><strong>${k}.</strong> ${esc(q.feedback?.[k]?.text||'Review the option against the stated duties.')}</li>`).join('');text=`<p>${quality===2?'You selected every supported action and avoided the harmful alternatives.':quality===1?'Your choices are defensible, but incomplete. A director needs the whole response.':'Some selections are unsafe or unnecessary, or key actions are missing.'}</p>${missing.length?`<p><strong>Missing:</strong> ${missing.join(', ')}</p>`:''}${extras.length?`<p><strong>Reconsider:</strong> ${extras.join(', ')}</p>`:''}<p><strong>Your selected actions, explained:</strong></p><ul>${reasons}</ul><p><strong>Supported actions:</strong></p><ul>${lines}</ul><p>${esc(q.rationale)}</p>`}else{text=quality===2?`<p>${esc(q.rationale)}</p>`:quality===1?`<p><strong>Your choice:</strong> ${esc(q.choices[ABC.indexOf(selection)])}</p><p>${esc(q.acceptable[selection])}</p><p><strong>More complete response:</strong> ${esc(q.choices[ABC.indexOf(q.answer)])}</p><p>${esc(q.rationale)}</p>`:`<p><strong>Your choice:</strong> ${esc(q.choices[ABC.indexOf(selection)])}</p><p>${esc(q.feedback[selection]?.text||'This approach leaves a critical gap.')}</p><p><strong>Stronger response:</strong> ${esc(q.choices[ABC.indexOf(q.answer)])}</p><p>${esc(q.rationale)}</p>`}let refHtml=citeQ(q);document.getElementById('response').innerHTML=`<div class="feedback ${quality===2?'':quality===1?'acceptable':'review'}" role="status" tabindex="-1"><h3>${quality===2?'A well-supported decision':quality===1?'Defensible, with conditions':'Consider the consequences'}</h3>${text}${refHtml}</div><div class="actions"><button class="action" onclick="nextDecision()">${chapterReady(ch)?'Continue':'Next supervisory decision'}</button></div>`;document.querySelector('#response .feedback')?.focus({preventScroll:true});save()}
function nextDecision(){return chapterReady(state.chapter)?reflection():question()}
const samples=[["“I hear what you said. While I arrange coverage, I need to understand what you meant, what has happened during supervision, and whether every child can be cared for safely.”","Do not substitute either automatic dismissal or casual reassurance for a documented safety and personnel review."],["“We will respond to what was observed, keep the child safe, make any required report and preserve records. We will not treat poverty as proof of abuse.”","Avoid private detective work before reporting and avoid assuming homelessness alone is neglect."],["“Our actual roster has to meet the rule right now. I will cover or adjust intake, then correct the schedule and document that we are compliant.”","Never confuse a posted staff schedule with physically present qualified coverage."],["“Here is the factual timeline and the child’s care plan. Who at the hospital is coordinating a safe discharge, and who are our authorized contacts?”","Do not assume that a parent’s refusal automatically proves neglect, or that the director gains parental medical authority."],["“We need to observe the real process, assign corrective ownership, and verify the change; signing another checklist is not proof of safety.”","A quiz or training attendance record is not evidence of reliable skill transfer."]];

function reflection(){let ch=state.chapter,l=DATA.lessons[ch-1];state.phase='reflection';render(`<div class="eyebrow">Chapter ${ch} · Applied reflection</div><h1 id="focushead">Put it into supervisory practice</h1>${progressHtml(ch)}<div class="card"><p>You have worked through this chapter's situations. Before moving on, consider how you would apply the ideas as a director with your staff, children or families.</p>${state.needsWorkshop[ch]?'<div class="note">Some decisions deserve conversation and live rehearsal. Bring a question from this chapter to your next workshop or coaching conversation.</div>':''}<h2>${esc(l.title)}</h2><p>Identify a caregiving situation. What action would you take as director? What law or policy would you verify, whom would you consult, and how would you measure follow-through?</p><label for="reflection">Your plan or opening words</label><textarea id="reflection" oninput="saveReflection(this.value)" placeholder="A situation I could face is…">${esc(state.reflection[ch]||'')}</textarea><div class="actions"><button class="action" onclick="compareReflection()">Compare with a director response</button></div><div id="reflectionHelp" role="region" aria-label="Reflection comparison" tabindex="-1" aria-live="polite">${state.refReviewed[ch]?sampleHtml(ch):''}</div>${state.refReviewed[ch]?`<div class="actions"><button class="action" onclick="finishChapter()">Save and continue</button></div>`:''}</div>`)}
function saveReflection(v){state.reflection[state.chapter]=v;save()}
function sampleHtml(ch){return `<div class="note"><strong>One useful opening:</strong><p>${esc(samples[ch-1][0])}</p><strong>Something to reconsider:</strong><p>${esc(samples[ch-1][1])}</p><p class="meta">Compare this example with your reasoning; local policy and individual care plans may require a different response.</p></div>`}
function compareReflection(){let el=document.getElementById('reflection'),v=el?.value.trim();if(!v){el.focus();return}saveReflection(el.value);state.refReviewed[state.chapter]=true;document.getElementById('reflectionHelp').innerHTML=sampleHtml(state.chapter);let actions=document.getElementById('reflectionHelp').nextElementSibling;if(!actions){document.getElementById('reflectionHelp').insertAdjacentHTML('afterend','<div class="actions"><button class="action" onclick="finishChapter()">Save and continue</button></div>')}document.getElementById('reflectionHelp')?.focus({preventScroll:true});save()}
function finishChapter(){let ch=state.chapter;if(!(state.reflection[ch]||'').trim()){document.getElementById('reflection')?.focus();return}if(!state.refReviewed[ch])return;if(!state.done.includes(ch))state.done.push(ch);if(ch<CHAPTERS){state.chapter++;state.current=null;state.lastAnswer=null;state.phase='lesson';lesson()}else{state.phase='capstone';state.capstone??={step:0,choices:[],reflection:'',completed:false};capstone()}save()}

const FINAL_CHALLENGE=[{"head":"The afternoon that changes everything","lead":"You direct a child care center. A child with a complex medical and communication profile becomes seriously ill. Staff activate the emergency plan; EMS transports the child to the emergency department.","question":"What should you coordinate first?","bridges":{},"choices":[["Close the center immediately without verifying how children remaining on site will be supervised.","Closing without a supervised reunification plan can create a second emergency.",0],["Share the care plan with EMS and keep qualified coverage on site, but leave follow-up ownership unspecified.","The handoff and coverage are protected, but a named person must own updates and the next verification.",1],["Give EMS relevant medical facts and contacts, name an authorized hospital liaison, and verify remaining classroom coverage.","The response protects the child being transported and all children still in care.",2],["Tell staff not to document symptoms until clinicians establish a diagnosis.","Record observable facts and the timeline even while the medical diagnosis remains uncertain.",0]]},{"head":"The parent cannot get to the hospital","lead":"The parent says, “I cannot get there.” A transportation barrier emerges, and the hospital asks who may make discharge decisions.","question":"What is the strongest director-level response?","bridges":{"2":"Your first decision established coverage and a responsible hospital contact. A fresh obstacle appears.","1":"The hospital has basic information, but no one was clearly assigned to coordinate follow-up. The gap becomes visible as discharge questions arise.","0":"Your first response left a safety or documentation breach to repair, even as the hospital seeks a discharge plan."},"choices":[["Document the barrier, contact authorized family supports, involve hospital social work, and verify a safe lawful discharge plan.","Transportation hardship by itself is not neglect; coordinated follow-up and correct consent authority matter.",2],["Help arrange verified transportation and confirm the parent receives the details, but do not yet establish who owns discharge coordination.","Practical transport help is useful; safe discharge and legal responsibility still need verified ownership.",1],["Tell the hospital that the center automatically acquires legal custody whenever the parent cannot travel.","A program does not receive medical decision-making or custody authority merely because it supervises a child.",0],["Instruct the accompanying caregiver to sign medical consent forms on the parent’s behalf.","Facility staff cannot assume parental medical consent authority outside applicable law and authorized emergency procedures.",0]]},{"head":"The allegation without a timestamp","lead":"While handling the hospital situation, a family reports suspected abuse by an employee but cannot name the date. Security footage may overwrite soon.","question":"What protects children and the integrity of the reporting process?","bridges":{"2":"The hospital and family have a coordinated pathway. An unrelated child-protection concern arrives.","1":"Transportation assistance is underway, but discharge accountability remains incomplete when another urgent report arrives.","0":"The hospital still lacks a reliable discharge arrangement. The director must correct that risk while addressing a second allegation."},"choices":[["Restrict the employee’s unsupervised child contact, preserve footage, promptly make the mandated report, but defer a suitable affected-family process update.","The safety, evidence, and immediate reporting duties are protected; the family still needs appropriate, verified communication.",1],["Have staff repeatedly question the child and classmates to pin down a date before calling investigators.","Repeated internal interviewing can compound harm and distort evidence; reasonable-suspicion reporting cannot wait.",0],["Wait for conclusive video before any child-protection or licensing communication.","Mandated reporting is triggered by reasonable suspicion, not proof or a completed private investigation.",0],["Put interim safeguards in place, preserve all available footage, make required reports promptly, and cooperate confidentially with agencies.","The director fulfills reporting duties, safeguards children, and avoids declaring an allegation proven.",2]]},{"head":"A director’s real test","lead":"One month later, observations reveal fragile opening coverage, inconsistent family communication, and signed safety checklists for tasks that staff never completed.","question":"How will you know the program has actually improved?","bridges":{"2":"The allegation was reported promptly, recordings were preserved, and protective steps remained in place. The pattern behind these events now needs attention.","1":"Immediate protections were taken, but appropriate communication with the affected family still needs to be repaired. You also identify broader operational weaknesses.","0":"The allegation process was mishandled and requires immediate correction. The review also exposes a wider pattern of fragile operations."},"choices":[["Declare the issue resolved after every employee signs the online refresher completion sheet.","Completion records do not show that staff perform the required behaviors under pressure.",0],["Set observable standards, name owners, rehearse decisions, observe actual work, coach, and measure whether practice changes.","Evidence of transfer comes from safer routines and repeated verification, not signatures alone.",2],["Add a second verifier to checklist checks and schedule immediate observations, but defer fixing fragile staff coverage.","Independent verification helps; leaving the staffing bottleneck intact makes the improvement incomplete.",1],["Rewrite the handbook without observing practices or reviewing failed shift schedules.","Written policies alone do not demonstrate that unsafe behaviors have changed.",0]]}];
// Each option owns its own quality level, preventing a grading matrix from drifting away from the words.
const CAPSTONE_BRANCHES=BRANCHING.capstone;
function capstoneStage(i,c){if(i===0)return FINAL_CHALLENGE[0];const previous=c?.choices?.[i-1];return CAPSTONE_BRANCHES[String(i)]?.[String(previous)] || FINAL_CHALLENGE[i]}
function capstoneScore(i,c){const q=capstoneStage(i,c),chosen=c.choices[i];return q.choices[chosen]?.[2]??0}
function capstoneJourney(c){return FINAL_CHALLENGE.map((_,i)=>{const q=capstoneStage(i,c),selected=c.choices[i],o=q.choices[selected];return `<div class="path-event"><div class="path-event-head"><span>Decision ${i+1}: ${esc(q.head)}</span><strong>${LABELS[o[2]]}</strong></div><p><strong>You chose:</strong> ${esc(o[0])}</p><p class="meta">${esc(o[1])}</p></div>`}).join('')}

function ensureCapstone(){state.capstone??={step:0,choices:[],reflection:'',completed:false};state.capstone.choices??=[];state.capstone.step??=0;state.capstone.reflection??='';return state.capstone}
/* Richard Lawrence Stenlund: bring the learning full circle. */
function capstone(){const c=ensureCapstone();if(c.completed){state.phase='finished';return finish()};state.phase='capstone';const i=Math.min(c.step,FINAL_CHALLENGE.length);if(i>=FINAL_CHALLENGE.length)return capstoneReflection();const q=capstoneStage(i,c),sel=c.choices[i];const progress=FINAL_CHALLENGE.map((_,j)=>`<span class="capstone-dot ${j<i?'done':j===i?'active':''}" aria-hidden="true"></span>`).join('');render(`<div class="eyebrow">Final challenge · Decisions with consequences</div><h1 id="focushead">When the director’s plans meet real life</h1><p class="lede">Every decision changes the next challenge. Even the strongest first response can be followed by an unexpected complication.</p><div class="capstone-step">Decision ${i+1} of ${FINAL_CHALLENGE.length}</div><div class="capstone-progress" aria-label="Final challenge progress">${progress}</div><section class="card"><h2>${esc(q.head)}</h2><div class="capstone-context">${i>0?`<p class="branch-path-label">NEW DEVELOPMENT · Based on your previous choice</p>`:''}<p>${esc(q.lead)}</p></div><p><strong>${esc(q.question)}</strong></p><div class="capstone-options">${q.choices.map((o,j)=>`<button type="button" class="capstone-option ${sel===j?'chosen':''}" aria-pressed="${sel===j}" onclick="chooseCapstone(${j})" ${sel!==undefined?'disabled':''}><strong>${ABC[j]}.</strong> ${esc(o[0])}</button>`).join('')}</div>${sel!==undefined?`<div class="capstone-feedback ${capstoneScore(i,c)===2?'':capstoneScore(i,c)===1?'acceptable':'review'}" role="status" tabindex="-1" id="capstoneFeedback"><strong>${LABELS[capstoneScore(i,c)]}</strong><p>${esc(q.choices[sel][1])}</p><p class="meta">Your decision will alter the next event and available responses.</p></div><div class="actions"><button class="action" onclick="nextCapstone()">${i===FINAL_CHALLENGE.length-1?'Review your decision trail':'See the consequence'}</button></div>`:''}</section><p class="foot">Follow individualized plans, current regulations, lawful reporting routes, and verified emergency procedures. These are fictional training situations.</p>`)}
function chooseCapstone(choice){const c=ensureCapstone(),i=c.step,q=capstoneStage(i,c);if(state.phase!=='capstone'||i>=FINAL_CHALLENGE.length||c.choices[i]!==undefined||choice<0||choice>=q.choices.length)return;c.choices[i]=choice;const oldY=window.scrollY;capstone();window.scrollTo({top:oldY,behavior:'instant'});const feedback=document.getElementById('capstoneFeedback');feedback?.scrollIntoView({block:'nearest',behavior:'smooth'});feedback?.focus({preventScroll:true});save()}
function nextCapstone(){const c=ensureCapstone();if(c.step>=FINAL_CHALLENGE.length||c.choices[c.step]===undefined)return;c.step+=1;capstone();save()}
function chapterOneComparison(){const lab=state.lab?.[1];if(lab?.first!==undefined)return `In Chapter 1 you considered: “${esc(TRAILS[1].first.options[lab.first].text)}”`;return 'In Chapter 1 you evaluated staff comments, fitness for duty and safe coverage.'}

function capstoneReflection(){const c=ensureCapstone();if(c.choices.length<FINAL_CHALLENGE.length)return capstone();state.phase='capstone';render(`<div class="eyebrow">Final challenge · Decision retrospective</div><h1 id="focushead">What did your choices set in motion?</h1><p class="lede">Review the actual decisions you encountered and what you would do differently. A sound first decision can still be followed by a difficult complaint, practical barrier, or new allegation.</p><section class="card"><h2>Your four-decision trail</h2><div class="decision-trail">${capstoneJourney(c)}</div><p class="meta">This is feedback for practice, not an authorization or legal certification. A better second decision does not erase the effects of an earlier unsafe one.</p></section><div class="card"><h2>Connect to your earlier leadership practice</h2><div class="capstone-retrospective"><p>${chapterOneComparison()}</p></div><label for="capstoneReflection"><strong>How would you manage the consequences of your decisions and verify that children, families, and staff are protected?</strong></label><textarea id="capstoneReflection" rows="6" oninput="saveCapstoneReflection(this.value)" placeholder="The outcome changed because ... My first correction would be ... To prevent recurrence I would verify ...">${esc(c.reflection)}</textarea><p class="meta">In your own words, distinguish a lawful requirement, facility procedure, and professional leadership judgment.</p><div id="capstoneValidation" role="status" aria-live="polite"></div><div class="actions"><button class="action" onclick="completeCapstone()">Complete the learning lab</button></div></div>`)}
function saveCapstoneReflection(v){ensureCapstone().reflection=v;save()}
function completeCapstone(){const c=ensureCapstone();let v=document.getElementById('capstoneReflection')?.value||'';c.reflection=v;if(c.choices.length<FINAL_CHALLENGE.length||c.choices.some(x=>x===undefined))return;if(!v.trim()){document.getElementById('capstoneValidation').textContent='Please write a brief reflection before continuing.';document.getElementById('capstoneReflection')?.focus();save();return}c.completed=true;state.completedAt=state.completedAt||new Date().toISOString();state.phase='finished';finish();save()}
function setCertificateName(name){state.certificateName=String(name).slice(0,80);const preview=document.getElementById('certificate-name-preview');if(preview){const n=state.certificateName.trim();preview.textContent=n||'Your name here';preview.classList.toggle('long',n.length>27&&n.length<=43);preview.classList.toggle('very-long',n.length>43)}const err=document.getElementById('certNameError');if(err)err.textContent='';save()}
function completedDate(){return state.completedAt?new Intl.DateTimeFormat('en-US',{year:'numeric',month:'long',day:'numeric'}).format(new Date(state.completedAt)):'Completion date unavailable'}
function certificateMarkup(){const n=(state.certificateName||'').trim(),cls=n.length>43?'very-long':n.length>27?'long':'';return `<article class="certificate-paper" aria-label="Letter-size completion certificate"><div class="certificate-frame"><div><div class="cert-brand">Care with a Compass</div><div class="cert-rule"></div><p class="cert-kicker">An interactive child care supervisor learning lab</p><h2 class="cert-title">Certificate of Completion</h2></div><div><p class="cert-recipient-label">Presented to</p><div class="cert-name ${cls}" id="certificate-name-preview">${esc(n||'Your name here')}</div><p class="cert-copy">In recognition of completing the five learning chapters and the culminating child care leadership challenge in</p><div class="cert-program">Care with a Compass</div><p class="cert-copy">Supervisory Judgment, Child Safety and Program Accountability</p><p class="cert-statement">Completed guided practice in staff leadership, child protection, licensing, emergency coordination and program improvement.</p></div><div><div class="cert-rule"></div><div class="cert-date-label">Date of completion</div><div class="cert-date">${esc(completedDate())}</div><p class="cert-footer">All scenarios are fictionalized instructional composites. This certificate records completion of the interactive learning lab only; it does not confer clinical credentials, mandated-reporter certification, accredited hours, or demonstrated professional competence.</p></div></div></article>`}
function certificateView(){if(!ensureCapstone().completed)return capstone();state.phase='certificate';render(`<div class="eyebrow">Your completion certificate</div><h1 id="focushead">Certificate of completion</h1><p class="lede">Enter the name you would like printed, then preview your 8.5 × 11-inch certificate. Only the certificate will print, not the learning pages or your reflections.</p><div class="card"><label for="certName"><strong>Name to appear on the certificate</strong></label><input id="certName" class="certificate-input" type="text" maxlength="80" autocomplete="name" value="${esc(state.certificateName||'')}" oninput="setCertificateName(this.value)" placeholder="Your full name" style="display:block;width:100%;padding:12px 15px;border:2px solid #807588;border-radius:10px;font:inherit;margin:10px 0"><p class="meta">Completion date: ${esc(completedDate())}. For printing, choose US Letter (8.5 × 11), portrait, and turn on background graphics if your print dialog provides that option.</p><div class="actions"><button class="action" onclick="printCertificate()">Print certificate</button><button class="action secondary" onclick="finish()">Back to completion summary</button></div><p class="meta" id="certNameError" role="status" aria-live="polite"></p></div><div class="certificate-shell" id="certificatePreview">${certificateMarkup()}</div>`)}
function printCertificate(){if(!ensureCapstone().completed)return;const input=document.getElementById('certName');if(input)setCertificateName(input.value);if(!(state.certificateName||'').trim()){const e=document.getElementById('certNameError');if(e)e.textContent='Enter the name you would like printed first.';input?.focus();return}const host=document.getElementById('certificatePrintHost');if(!host)return;host.innerHTML=certificateMarkup();document.body.classList.add('print-certificate');save();window.print()}
window.addEventListener('afterprint',()=>document.body.classList.remove('print-certificate'));

function downloadReflections(){const lines=['Care with a Compass: My director decision notes',''];DATA.lessons.forEach((l,i)=>{lines.push(`${i+1}. ${l.title}`);lines.push(state.reflection[i+1]||'(not recorded)');lines.push('')});lines.push('Final challenge: What changed in your thinking?');lines.push(state.capstone?.reflection||'(not recorded)');lines.push('');const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Care_with_a_Compass_Director_Reflections.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function finish(){if(!ensureCapstone().completed){state.phase='capstone';return capstone()};state.phase='finished';render(`<div class="eyebrow">Learning lab · Completed</div><h1 id="focushead">Completion and next steps</h1><p class="lede">You have completed the five chapter activities and final challenge. Review your reflections, practice difficult decisions with a qualified facilitator, and apply the lessons using your child-specific care plans, local policies and applicable licensing rules.</p><div class="card"><h2>Chapter reflections</h2>${DATA.lessons.map((l,i)=>`<div class="journey"><strong>${i+1}. ${esc(l.title)}</strong><span class="small"> · Complete</span>${state.reflection[i+1]?`<blockquote>${esc(state.reflection[i+1])}</blockquote>`:''}</div>`).join('')}<div class="capstone-retrospective"><strong>Your consequence-driven decisions</strong><div class="decision-trail compact">${capstoneJourney(ensureCapstone())}</div><strong>Reflection</strong><blockquote>${esc(state.capstone.reflection||'')}</blockquote></div><p class="note">Bring your reflections to supervised role-play, director coaching and a program improvement meeting.</p><div class="actions"><button class="action secondary" onclick="downloadProgress()">Download learning summary</button><button class="action" onclick="certificateView()">View and print your certificate</button><button class="action secondary" onclick="document.body.classList.remove('print-certificate');window.print()">Print reflections</button><button class="action secondary" onclick="downloadReflections()">Save reflections as text</button><button class="action secondary" onclick="restart()">Restart the learning lab</button></div></div>${sourcesHtml()}`)}
// Dispatch on saved phase without replacing it with the welcome state.

function downloadProgress(){
 const lines=['CARE WITH A COMPASS | LEARNING SUMMARY','Supervisor Leadership Academy · Offline','',
  'This file stays on your device unless you choose to share it.','',
  'Training: 72 questions in 5 chapters. A certificate records participation, not professional licensure.',''];
 for(let ch=1;ch<=CHAPTERS;ch++){
  const attempted=history(ch),uniqueIds=new Set(attempted.map(x=>x.id)),latest=latestResults(ch);
  const lastCorrect=Object.values(latest).filter(Boolean).length;
  lines.push('CHAPTER '+ch+': '+DATA.lessons[ch-1].title,
    'Questions attempted: '+uniqueIds.size+' of '+chItems(ch).length,
    'Most recent preferred decisions: '+lastCorrect+' of '+chItems(ch).length,
    'Follow-up coaching recommended: '+(state.needsWorkshop[ch]?'Yes':'Not flagged'),
    'Reflection: '+(state.reflection[ch]||'(not entered)'),'');
 }
 lines.push('Follow-up: practice uncertain decisions with a qualified supervisor and verify current licensing policies.');
 const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});
 const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='Care_with_a_Compass_Learning_Summary.txt';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);
}
state=load()||fresh();if(!state.history||!state.done)state=fresh();state.needsWorkshop??={};state.maxProgress??={};state.lab??={};state.reflection??={};state.refReviewed??={};state.capstone??={step:0,choices:[],reflection:'',completed:false};state.certificateName??='';state.completedAt??=null;state.wrongTags??={};state.pendingGap??={};state.selectedMulti??=[];
if(state.phase==='certificate')certificateView();else if(state.phase==='capstone')capstone();else if(state.phase==='finished')finish();else if(state.phase==='lesson')lesson();else if(state.phase==='question'||state.phase==='answered')showQuestion();else if(state.phase==='reflection')reflection();else welcome();



================================== END js/app.js ==================================

================================== BEGIN js/branching.js ==================================
window.COMPASS_BRANCHING={"labs":{"1":{"0":{"lead":"You corrected the sign-out record transparently. The next morning, the senior shift lead who promoted early sign-outs tells colleagues you undermined her in front of a parent. A different parent requests yesterday’s departure record.","prompt":"What do you do when the technically correct correction triggers a staff challenge and a family inquiry?","options":[{"text":"Preserve the correction trail, verify yesterday’s departure evidence, explain confirmed facts to the parent, and privately address the lead’s conflicting instruction.","why":"Protects record integrity and family trust while treating the senior employee fairly. The original correct decision did not eliminate a new interpersonal problem.","level":2},{"text":"Share the corrected record with the parent and schedule an all-staff reminder, leaving the lead’s objection for the next evaluation cycle.","why":"Provides some accountability but delays resolving a supervisor-level instruction that could repeat today.","level":1},{"text":"Tell the lead to apologize publicly and warn the team that any criticism of management will result in termination.","why":"Punishing discussion can suppress future near-miss reporting and avoids examining how conflicting instructions developed.","level":0},{"text":"Offer to replace yesterday’s record with a clean copy so the parent does not see the correction.","why":"Removing the audit trail conceals the original inaccuracy and undermines credibility.","level":0}],"takeaway":"Transparent corrections can provoke uncomfortable reactions. The director still owes fair supervision, verified records, and family communication."},"1":{"lead":"The parent signs the child out correctly, but you never correct the earlier false entry. The following afternoon, a parent asks why her portal shows departure before she entered the building.","prompt":"How do you respond when a deferred record correction becomes a credibility problem?","options":[{"text":"Preserve the original entry, append a clearly dated correction, review actual handoffs, inform the family of verified facts, and address the staff instruction.","why":"Corrects the prior omission without hiding it and identifies the system fault.","level":2},{"text":"Apologize and correct this family’s entry, but rely on the next staff meeting to settle the larger practice.","why":"Helps the family but leaves other unreliable sign-outs and conflicting guidance unchecked.","level":1},{"text":"Ask the parent to confirm the original time so the facility will not have to change stored information.","why":"A parent should not be pressured to validate an inaccurate departure time.","level":0},{"text":"Turn off parent access to attendance records until the discrepancy stops attracting complaints.","why":"Suppressing visibility does not repair child-release accountability.","level":0}],"takeaway":"A seemingly minor deferred correction can turn into a trust and safety problem across multiple families."},"2":{"lead":"You left the false sign-out untouched. A licensing analyst now compares the sheet with a timestamped camera clip showing the child still in care after the recorded departure. Staff ask whether to “standardize” other entries before the analyst reviews them.","prompt":"What must happen when the uncorrected record is challenged by objective evidence?","options":[{"text":"Prevent additional edits, preserve the raw records and video, explain the discrepancy accurately to the analyst, and implement traceable corrections and a verified release protocol.","why":"Acknowledges the actual record without manufacturing a cover story and protects future pickups.","level":2},{"text":"Tell the analyst a correction is needed and ask staff to stop pre-filling forms, but postpone checking prior entries.","why":"Stops new bad entries but leaves the extent and cause of the problem unknown.","level":1},{"text":"Direct staff to rewrite earlier departure times so the paper file aligns with camera timestamps before the analyst returns.","why":"Backdating and concealed rewriting compound the problem.","level":0},{"text":"Blame the newest teacher as the sole cause and keep the senior lead’s contrary instructions out of the review.","why":"Scapegoating suppresses evidence of an organizational instruction failure.","level":0}],"takeaway":"An unsafe recordkeeping decision may create a second problem: pressure to conceal what happened. Preserve evidence and correct transparently."},"3":{"lead":"You sent the new teacher home before arranging replacement coverage. Within minutes, one room is at risk of falling below qualified staffing requirements, while the senior lead continues using pre-filled times.","prompt":"What is the director’s first corrective sequence?","options":[{"text":"Restore qualified classroom coverage immediately, stop early sign-out entries, preserve existing records, then investigate both employees’ instructions without prejudging the teacher.","why":"Stabilizes child supervision first and then addresses records and personnel fairness.","level":2},{"text":"Move a cleared, qualified floater into the room and retrain the shift lead, but leave the existing inaccurate entries uncorrected.","why":"Floor coverage improves; the recordkeeping gap still requires a transparent correction.","level":1},{"text":"Leave the room with current staffing while interviewing the senior lead, because the teacher has already been removed from duty.","why":"Administrative investigation cannot supersede required classroom supervision.","level":0},{"text":"Call the teacher back and require her to accept responsibility for all false entries before she can supervise again.","why":"Compelled admissions do not establish facts or repair unsafe coverage.","level":0}],"takeaway":"Personnel accountability must not create a new supervision violation; recovery begins with real coverage and traceable records."}},"2":{"0":{"lead":"You reassigned the caregiver but saved only today’s footage and delayed a mandated report while asking for a date. The video system is about to overwrite the oldest available recordings. A family member asks whether a report has been made.","prompt":"What is the immediate recovery action?","options":[{"text":"Preserve all remaining rolling footage, make the required mandated report without waiting for a precise timestamp, protect children, and document the previous delay accurately.","why":"Corrects the reporting lapse, protects evidence, and avoids a private investigation.","level":2},{"text":"Call the reporting agency now and maintain the reassignment, but wait to export other video until the family narrows down the day.","why":"Reporting starts, but valuable time-sensitive records remain at risk.","level":1},{"text":"Ask staff to interview the child again to narrow the date before the next camera cycle.","why":"Repeated internal questioning risks influencing the child and prolongs evidence loss.","level":0},{"text":"Ask the family not to tell investigators about the delay because you have already moved the caregiver.","why":"Concealing a delay undermines the integrity of the investigation.","level":0}],"takeaway":"The first protective step does not excuse delayed reporting or incomplete preservation."},"1":{"lead":"You safeguarded children, preserved footage, and made the required report. Two days later, an upset parent posts an allegation online; the employee says your report was malicious and threatens to file a retaliatory licensing complaint. None of those claims has yet been substantiated.","prompt":"How should a director respond after doing the right thing produces a new conflict?","options":[{"text":"Maintain appropriate interim safeguards, preserve the communications and agency correspondence, respond to any licensing inquiry factually, and protect personnel and child confidentiality.","why":"The original report remains appropriate if supported by reasonable suspicion; a new complaint calls for verified facts, not retaliation.","level":2},{"text":"Tell affected families that reporting occurred and staffing is safe, but publish the employee’s name to counter inaccurate online claims.","why":"Reassurance is appropriate, but publicly identifying an accused employee breaches confidentiality and may unfairly prejudice the investigation.","level":0},{"text":"Document the threatened complaint, consult agency guidance, and avoid public arguments, but postpone responding to the directly affected family’s legitimate process questions.","why":"Protects confidentiality but leaves room for appropriate verified family updates.","level":1},{"text":"Withdraw the mandated report because the employee threatened to complain about the center.","why":"Required reporting cannot be retracted to avoid retaliation.","level":0}],"takeaway":"Correct reporting can still lead to accusations or scrutiny. Respond with evidence, restraint, and child-centered safeguards."},"2":{"lead":"Teachers repeatedly questioned the child before reporting. Accounts now contain inconsistent details, and one caregiver asks whether staff should interview classmates to “clear things up.” The child appears distressed by the repeated questions.","prompt":"What should change now?","options":[{"text":"Stop repeated internal questioning, record exactly what was asked and disclosed, make the required report promptly, preserve recordings, and follow trained agency instructions.","why":"Limits further harm while providing investigators an honest account of the previous interviews.","level":2},{"text":"Make the report and stop questioning the child, but summarize earlier statements as a single certain timeline without identifying differences.","why":"Reporting is essential, but merging inconsistent accounts into a false certainty can distort evidence.","level":1},{"text":"Have a different teacher start interviews again so the child can provide a fresh account.","why":"Another interview can add distress and contaminate information.","level":0},{"text":"Tell the family their account is no longer credible because different child statements do not match.","why":"Inconsistency does not remove a mandated reporter’s duty when reasonable suspicion exists.","level":0}],"takeaway":"When questioning has already occurred, disclose the process accurately and leave investigative interviewing to trained authorities."},"3":{"lead":"You waited for licensing to arrive. An analyst cannot attend until tomorrow, and the camera system will overwrite an earlier segment tonight. The family calls asking why no child-protection agency has contacted them.","prompt":"What must be done before the next video cycle?","options":[{"text":"Preserve all accessible footage immediately, make a timely report now based on reasonable suspicion, maintain interim safety measures, and document the reasons for the delay.","why":"Stops preventable loss and addresses the independent child-protection reporting duty.","level":2},{"text":"Export the footage and contact child protection, but delay documenting the timeline until the licensing visit is complete.","why":"Protects critical evidence and reporting, but a contemporaneous account of actions and delays matters.","level":1},{"text":"Wait another day because the licensing analyst will decide whether abuse occurred.","why":"Licensing review does not replace a mandated reporter’s independent obligation.","level":0},{"text":"Ask the family to obtain footage directly from the vendor so the program need not preserve it.","why":"Delegating evidence preservation to the family risks loss and exposes confidential recordings.","level":0}],"takeaway":"CCL communication and a mandated report are different pathways; one does not suspend the other."}},"3":{"0":{"lead":"You allowed the late teacher’s attendance to be recorded as though they arrived on time. At payroll review, the clock-in system conflicts with the coverage sheet, and a teacher admits the room had 13 preschoolers with one qualified teacher for several minutes.","prompt":"How should the director correct the record and ongoing risk?","options":[{"text":"Restore and verify real-time coverage, preserve both original records, document the actual staffing gap, make any required notifications, and redesign opening contingencies.","why":"Prioritizes present safety and accurate reconstruction rather than simply making records agree.","level":2},{"text":"Correct the attendance sheet and remind staff about honest clock-in times, but defer checking whether the room exceeded ratio.","why":"Records improve, but the missed coverage risk remains unassessed.","level":1},{"text":"Change payroll clock-in times to match the sign-in sheet so auditors see a consistent record.","why":"Manufacturing consistency hides the actual ratio problem and creates employment-record risks.","level":0},{"text":"Tell the teacher to describe the opening as fully staffed because the late employee made up the minutes later.","why":"Hours made up later cannot retroactively supervise children.","level":0}],"takeaway":"Paper compliance cannot cure a real-time staffing shortage. Recover facts before redesigning the opening shift."},"1":{"lead":"You stepped into the room and recorded actual arrivals. The teacher arrives visibly distressed and explains that a new bus schedule prevents timely child-care drop-off twice a week. Two other staff members now ask for similar exceptions.","prompt":"How do you respond without undermining the qualified opening plan?","options":[{"text":"Set clear documented arrival expectations, review feasible formal schedule adjustments, assign verified qualified opening coverage, and apply standards consistently.","why":"Acknowledges legitimate barriers without making child supervision dependent on an informal exception.","level":2},{"text":"Offer a trial shift swap with qualified coverage and review attendance after one week, but leave backup arrangements undocumented.","why":"A practical adaptation can work, but the coverage plan needs reliable ownership.","level":1},{"text":"Promise all opening employees they can arrive late when needed because the director can usually step in.","why":"An informal open-ended exemption makes ratios dependent on the director’s availability.","level":0},{"text":"Reject any discussion of schedule barriers and terminate the teacher immediately, even if no replacement opener is ready.","why":"A purely punitive response can create a larger staffing crisis without improving reliability.","level":0}],"takeaway":"An appropriate real-time coverage decision may reveal a recurring structural scheduling problem, not just an individual fault."},"2":{"lead":"You moved two children without confirming receiving-room attendance. The adjacent room now has 14 preschoolers with one teacher, and its lead says a child with an individualized supervision plan is beginning a difficult transition.","prompt":"What should the director do first?","options":[{"text":"Restore qualified ratios in both rooms immediately, confirm each room’s staffing and care plans, document movements, and establish a preapproved overflow procedure.","why":"Prevents transferring one supervision violation into another and safeguards individualized support.","level":2},{"text":"Move one child back and check the current headcounts, but postpone reviewing that child’s transition safeguards.","why":"Partial correction may reduce numbers without ensuring both rooms meet every supervision need.","level":1},{"text":"Ask the receiving teacher to keep both extra children for ten minutes because the move has already been entered in attendance.","why":"A completed roster entry does not authorize over-ratio supervision.","level":0},{"text":"Have a child wait independently at the office door until the original teacher returns.","why":"A child cannot be used as an unsupervised ratio adjustment.","level":0}],"takeaway":"Moving children is only a valid contingency when the receiving room has verified capacity, qualified supervision, and appropriate support."},"3":{"lead":"You asked a parent volunteer to cover. The parent has a public-school credential but no verified child-care clearance in the center’s file. Another teacher is preparing for a break while the parent is alone near a group of preschoolers.","prompt":"How do you regain a safe and defensible staffing arrangement?","options":[{"text":"Put a qualified, cleared employee or qualified director physically in the room, keep the volunteer from unsupervised child contact, review the staffing lapse, and secure a backup plan.","why":"Restores required supervision without assuming an outside credential replaces center clearance and qualifications.","level":2},{"text":"Keep the qualified teacher present with the volunteer until a floater arrives, then document the event and review screening records.","why":"May stabilize supervision immediately, but a longer-term verified staffing contingency is still needed.","level":1},{"text":"Treat the parent’s public-school license as equivalent to clearance for the rest of the day.","why":"Another credential does not establish the facility-specific requirements for unsupervised work.","level":0},{"text":"Ask the volunteer to supervise only children whose families know them personally.","why":"Familiarity is not a substitute for appropriate staff qualifications and supervision.","level":0}],"takeaway":"An emergency does not turn an unverified volunteer into a countable qualified staff member."}},"4":{"0":{"lead":"You provided a verified handoff and kept supervision intact. Hospital social work then reports that the parent’s car broke down, while an extended family member offers to collect the child but is not listed as an authorized hospital decision-maker.","prompt":"How should the director coordinate safely without assuming legal custody?","options":[{"text":"Continue documenting contacts, involve hospital social work and the parent, verify lawful decision-makers and a safe plan, and evaluate reporting only if independent safety facts warrant it.","why":"Solves a new transportation obstacle without equating poverty or delay with neglect.","level":2},{"text":"Arrange transportation with the parent and ask social work to confirm arrival, but do not clarify who may authorize discharge if the plan fails.","why":"Transport help is valuable, yet discharge authority and contingency ownership remain unresolved.","level":1},{"text":"Authorize the family member to sign discharge paperwork because they are willing to drive.","why":"Child-care staff cannot confer hospital medical authority by informal permission.","level":0},{"text":"Automatically report neglect because the parent cannot reach the hospital within one hour.","why":"Transportation hardship alone does not establish the statutory threshold for neglect.","level":0}],"takeaway":"Even an excellent handoff can be followed by an unexpected logistical and legal coordination problem."},"1":{"lead":"You remained at the hospital without designating center coverage. A lead teacher calls to say the evening floater is leaving and two classrooms may fall below required staffing. The hospital simultaneously asks whom to contact about discharge.","prompt":"What needs to happen first?","options":[{"text":"Assign verified qualified coverage at the center immediately, designate an authorized hospital liaison, coordinate with social work and the parent, and document both safety tracks.","why":"Restores simultaneous accountability to children at both locations.","level":2},{"text":"Call a cleared qualified floater to the center and inform hospital social work of the parent’s barrier, but leave discharge follow-up unassigned.","why":"Center coverage improves while the hospital still lacks a reliable decision coordinator.","level":1},{"text":"Tell the teachers to combine all groups temporarily, regardless of ages or room approval, until you return.","why":"Unverified mixed-age consolidation can introduce a new licensing violation.","level":0},{"text":"Stay at the hospital and ask classroom staff to manage until closing because the emergency child is the highest priority.","why":"Child safety at the hospital does not suspend duties to children still enrolled at the center.","level":0}],"takeaway":"Accompanying one child cannot leave all other children without confirmed lawful supervision."},"2":{"lead":"You proposed taking the child to your home. Hospital staff question your authority and refuse to discharge the child to you. A parent later explains that their transportation has failed, not that they have relinquished parental responsibility.","prompt":"What is the appropriate recovery plan?","options":[{"text":"Withdraw the unauthorized home-placement proposal, coordinate the parent and hospital social worker, identify legal discharge authority, and document an individualized safe transport plan.","why":"Corrects the overreach and distinguishes a practical family barrier from custody authority.","level":2},{"text":"Offer to meet the parent at the hospital with transportation and ask staff to confirm discharge authorization before any release.","why":"Transportation may help, but a written contingency and assigned coordinator are still required.","level":1},{"text":"Ask another employee to take the child home instead because they have prior experience as a caregiver.","why":"Changing the destination adult does not establish medical or custody authority.","level":0},{"text":"Tell hospital staff the center’s enrollment agreement authorizes your home as an emergency placement.","why":"A child-care admission agreement does not confer residential placement or medical custody rights.","level":0}],"takeaway":"Well-intentioned improvisation may cross lawful authority boundaries; the corrective path is verification and coordinated support."},"3":{"lead":"You described the parent as having abandoned the child before checking why they could not attend. The hospital records that claim, while the parent says the bus route was canceled and asks for help reaching social work.","prompt":"How do you correct the record without dismissing possible safety concerns?","options":[{"text":"Correct the inaccurate characterization with hospital staff, document the parent’s actual statements, involve social work, verify a safe discharge arrangement, and assess any separate safety facts.","why":"Avoids an unsupported neglect label while preserving appropriate child-protection assessment.","level":2},{"text":"Clarify that the parent faces a transportation barrier and help arrange a ride, but leave the original abandonment statement uncorrected in the communication log.","why":"Practical support helps, but an inaccurate record can seriously harm a family.","level":1},{"text":"Tell the parent that requesting transportation help is proof of neglect and terminate the placement.","why":"Economic and transportation barriers alone are not proof of neglect or grounds for retaliatory action.","level":0},{"text":"Ask hospital staff to keep the parent’s explanation out of the record because the director’s first assessment should stand.","why":"Concealing contradictory facts undermines accurate care coordination.","level":0}],"takeaway":"A director must distinguish reported observations from unsupported judgments and correct mistakes visibly."}},"5":{"0":{"lead":"You secured the open gate, verified every child, and implemented an improvement plan. Three weeks later, the checklists are all signed, but a surprise walk-through finds a latch still unsecured. The staff member says they checked the box from memory.","prompt":"What is the next evidence-based improvement step?","options":[{"text":"Make the gate safe now, observe the actual closing routine, coach and assign ownership, test the verification method, and recheck performance on later shifts.","why":"Moves beyond paperwork completion to demonstrated and sustained transfer.","level":2},{"text":"Require a second signature on every gate check and observe a sample at the end of the week.","why":"Adds verification but may not address the actual workflow and staffing barriers causing the lapse.","level":1},{"text":"Count the signed checklists as proof that retraining succeeded despite the unsecured latch.","why":"Administrative completion is not evidence of safe behavior.","level":0},{"text":"Remove gate checks from the training plan because staff already know the correct rule.","why":"Knowledge alone does not establish applied practice.","level":0}],"takeaway":"Correct initial intervention is not a guarantee that new behavior will transfer to busy shifts."},"1":{"lead":"You secured the gate and asked staff to sign the existing checklist. A week later, an opening employee checks the box without walking to the gate; a child approaches the unlatched entrance before a teacher intervenes.","prompt":"What is the director’s strongest response to the repeat near miss?","options":[{"text":"Protect the child and secure the gate, document and evaluate the near miss, observe real checks, revise coverage and verification, and follow up over multiple shifts.","why":"Responds to the immediate hazard and the repeated system failure.","level":2},{"text":"Assign one staff member to check the gate and ask them to initial a new form, but postpone observing the routine.","why":"Ownership improves, but unobserved paperwork can repeat the same failure.","level":1},{"text":"Stop documenting gate errors so the program’s safety record does not look worse.","why":"Suppressing near misses removes essential safety information.","level":0},{"text":"Wait for an actual elopement before revising the procedure because no child was injured.","why":"A near miss is valuable evidence that risk controls are failing.","level":0}],"takeaway":"A reminder and a signature do not constitute a verified new safety behavior."},"2":{"lead":"You prioritized additional enrollment rather than a staffing and gate-safety correction. The next morning, classrooms are full and the regular opener calls out. Staff report they cannot leave their groups to test the gate latch.","prompt":"How do you regain control of the operational risk?","options":[{"text":"Hold intake where necessary, ensure verified qualified coverage, secure the gate immediately, assess capacity and supervision, then redesign staffing before accepting more children.","why":"Restores real operating limits and safety checks before financial or scheduling goals.","level":2},{"text":"Bring in a cleared qualified substitute and arrange an immediate gate check, but leave future enrollment commitments unchanged pending review.","why":"Stabilizes today but may preserve an underlying capacity-pressure problem.","level":1},{"text":"Have a parent volunteer supervise a group so staff can test the latch without verifying clearance or qualifications.","why":"One safety repair cannot justify another supervision breach.","level":0},{"text":"Ask staff to skip gate checks until the new enrollment revenue pays for additional coverage.","why":"Deferring a known safety control exposes children to preventable risk.","level":0}],"takeaway":"Growth decisions and safety systems must be evaluated together; revenue cannot substitute for supervised operations."},"3":{"lead":"You punished the entire team for the gate lapse. Two employees now admit privately that they stopped reporting near misses because they fear collective discipline. A new staff member finds the latch sticking.","prompt":"What response rebuilds a reliable early-warning system?","options":[{"text":"Repair and verify the gate, protect immediate supervision, invite factual reporting without blanket retaliation, investigate individual accountability fairly, and monitor near-miss disclosures.","why":"Addresses the hazard and restores the information flow needed to learn from failures.","level":2},{"text":"Thank the employee for speaking up, repair the latch, and remind everyone of expectations, but keep the blanket punishment policy.","why":"Corrects one hazard but leaves the fear that silenced reports in place.","level":1},{"text":"Require every employee to name the colleague responsible for past near misses before the gate can be repaired.","why":"The physical hazard cannot wait for a compelled blame exercise.","level":0},{"text":"Post the names of all employees who failed a gate check to demonstrate transparency to families.","why":"Public shaming can suppress reporting and unfairly expose personnel information.","level":0}],"takeaway":"A punitive reporting culture can hide hazards; accountability must encourage timely, factual disclosure."}}},"capstone":{"1":{"0":{"head":"A second crisis at the center","lead":"You ordered a closure before assigning supervised pickup. A teacher calls: two parents have not arrived, and one classroom is now below qualified staffing. The hospital also needs a discharge contact.","question":"How do you repair the immediate safety breakdown while keeping hospital follow-up lawful?","choices":[["Restore qualified coverage and supervised release at the center, appoint a hospital liaison, then coordinate the parent and social worker on lawful discharge.","Correcting the unsafe closure cannot wait; children at both locations need named, capable supervision.",2],["Call cleared coverage back to the center and alert hospital social work, but leave the discharge coordinator unnamed.","This stabilizes the center but preserves a predictable hospital handoff gap.",1],["Have a waiting parent supervise the remaining children while you personally travel to the hospital.","A parent cannot be improvised into qualified supervisory coverage.",0],["Assume that closing-time rules ended the program’s responsibility to children whose families have not arrived.","Supervision continues until lawful, safe release; an announced closure does not end that duty.",0]]},"1":{"head":"The missing owner","lead":"EMS received medical facts and classrooms are covered, but no one was assigned to take follow-up calls. The hospital tried three numbers while the parent explained they cannot travel.","question":"How will you repair the information and discharge handoff?","choices":[["Assign an authorized liaison now, reconstruct missed calls, involve hospital social work and the parent, and verify the lawful discharge plan.","A named owner restores continuity without assuming medical authority.",2],["Help arrange transportation and send the hospital a new contact number, but leave backup responsibility undefined.","Transport support helps, yet a second lost call is still possible.",1],["Tell the hospital whichever caregiver answers first may approve discharge for the family.","Being reachable does not create medical-consent authority.",0],["Wait for the parent to appear before assigning any hospital contact.","The hospital needs lawful coordination while the transportation problem continues.",0]]},"2":{"head":"The unexpected barrier","lead":"Your medical handoff and classroom coverage were effective. Hospital social work now learns the parent’s car broke down, a relative offers a ride, and the hospital asks who can make discharge decisions.","question":"What is the strongest next decision despite having handled the first crisis correctly?","choices":[["Coordinate authorized contacts, hospital social work, the parent, and verified safe transportation without assuming neglect or legal custody.","The right initial choice does not eliminate new barriers; verify authority and discharge safety.",2],["Arrange the ride and verify that the parent receives updates, but postpone confirming discharge decision-making authority.","This may solve transport but not the hospital’s legal and safety question.",1],["Authorize the helpful relative to sign medical discharge paperwork on behalf of the program.","The program cannot grant the relative medical decision-making powers.",0],["Tell staff to label the transportation delay as child abandonment in all incident notes.","Inability to travel, without more, does not establish neglect.",0]]},"3":{"head":"The missing medical timeline","lead":"Staff followed your direction not to document uncertain symptoms. At the emergency department, clinicians ask when the child first became unresponsive; nobody can reliably answer, and the parent is still unable to travel.","question":"What is your strongest recovery action?","choices":[["Reconstruct objective observations and times without inventing facts, designate a liaison, and coordinate authorized family and hospital social-work follow-up.","A transparent gap in the timeline is safer than a fabricated one, and discharge coordination must continue.",2],["Ask staff to record what each personally remembers and arrange the parent’s transport, but do not yet assign someone to verify the timeline with EMS.","Improves some records but leaves an important communication bridge incomplete.",1],["Ask everyone to agree on the most plausible symptom onset so the hospital receives a consistent account.","Consistency cannot be manufactured at the expense of reliable medical facts.",0],["Withhold all timing information until a physician formally diagnoses the illness.","Observed times matter even without a confirmed diagnosis.",0]]}},"2":{"0":{"head":"The report that invites a counter-allegation","lead":"You coordinated a safe hospital plan. Later that afternoon, a family reports possible harm by a staff member without a known date. Rolling camera footage may overwrite. The family asks that you “handle it quietly.”","question":"How do you respond when your successful emergency response is followed by a separate child-protection concern?","choices":[["Protect children, preserve available footage, make individual mandated reports when reasonable suspicion exists, assess separate CCL notice duties, and cooperate without promising secrecy.","The new allegation needs its own lawful, timely process even though the hospital crisis was handled well.",2],["Restrict child contact and make the mandated report, but defer preserving older rolling footage until the family identifies a date.","Safety and reporting begin, yet time-sensitive evidence remains exposed.",1],["Have the lead teacher conduct repeated child and peer interviews before the reporting agency is contacted.","A private investigation can contaminate disclosures and improperly delay reporting.",0],["Promise to investigate privately and contact authorities only after video confirms abuse.","Reasonable suspicion, not proof, triggers the mandated reporting duty.",0]]},"1":{"head":"Two unresolved handoffs","lead":"You arranged some help for the parent but never assigned backup discharge responsibility. Hospital staff call again as a second family alleges that a caregiver hurt their child on an unknown date; relevant video will soon overwrite.","question":"How will you handle both live problems without delaying mandatory child-protection action?","choices":[["Assign hospital discharge coordination, place appropriate interim child protections, secure footage, report reasonable suspicion promptly, and check distinct licensing-notice requirements.","Parallel ownership prevents either child’s safety from depending on completion of the other task.",2],["Make the mandated report and assign hospital follow-up, but postpone preserving footage until an agency requests it.","Both pathways begin, but avoidable evidence loss remains.",1],["Complete the hospital discharge arrangements before involving any child-protection agency.","One urgent situation does not suspend an independent reporting deadline.",0],["Ask employees to question children until the allegation is certain so your hospital work is not interrupted by an unfounded report.","Internal interviews and delay risk compounding harm.",0]]},"2":{"head":"The custody assertion is challenged","lead":"Your team told hospital staff that an unverified adult could approve discharge. The hospital rejects that claim and asks for a written clarification. Simultaneously, a parent reports possible employee abuse without a date.","question":"What corrective steps must happen in parallel?","choices":[["Withdraw the unsupported consent claim, assign lawful hospital coordination, safeguard children, preserve footage, and make any required child-protection and CCL reports.","Corrects the authority error while responding independently to the new allegation.",2],["Correct hospital contact information and make the mandated report, but leave footage preservation for the next shift.","Reporting begins, but evidence at risk of overwrite needs immediate attention.",1],["Have the unverified adult sign a new authorization note and ask classroom staff to gather witness accounts before reporting.","A self-written authorization does not cure consent authority, and private interviews delay reporting.",0],["Tell the hospital to accept the center’s account because the parent signed an enrollment form months ago.","Enrollment does not grant unrestricted medical decision-making authority.",0]]},"3":{"head":"The unanswered discharge decision","lead":"The hospital cannot establish parental consent authority and asks for a supervisor. At the same time, a separate family alleges staff harm to a child and security video may overwrite. No one knows the incident date.","question":"How do you prevent an authority gap from causing a second reporting failure?","choices":[["Clarify lawful hospital decision-makers through social work and the parent, assign a liaison, protect children, preserve footage, and report reasonable suspicion promptly.","Maintains two distinct safety tracks with explicit owners and reporting pathways.",2],["Call both hospital social work and the reporting hotline promptly, but leave preservation of older footage unassigned.","The communications start, but an essential evidence task can still be missed.",1],["Offer to personally sign hospital consent forms and privately interview the child before deciding whether a report is necessary.","Neither informal medical authority nor investigative questioning is appropriate.",0],["Post a public request for witnesses to the alleged abuse so an exact timestamp can be found before filing a report.","Public speculation breaches confidentiality and delays required action.",0]]}},"3":{"0":{"head":"A complaint after the right decision","lead":"You protected children, preserved video, and made the required report. Three days later, someone files a licensing complaint alleging that your center fabricated the staff allegation. The accusation is unverified. Employees fear speaking up again, and families want answers.","question":"How should you respond to scrutiny without retreating from your reporting duty?","choices":[["Preserve original records and reporting chronology, cooperate factually with licensing, maintain justified safeguards, protect confidential information, and coach staff on good-faith reporting.","An appropriate report can still trigger a complaint. Objective evidence, fairness, and staff trust must carry the response.",2],["Cooperate with the inspection and protect records, but postpone staff reassurance and coaching until the complaint is closed.","Regulatory cooperation is sound, but silence may chill future child-safety reporting.",1],["Reveal the reporter’s identity to the employee to show the center did not initiate the concern.","Exposing confidential reporting information may endanger people and undermine lawful process.",0],["Withdraw the original mandated report to persuade the complainant to stop accusing the center.","A complaint does not invalidate a good-faith report or authorize concealment.",0]]},"1":{"head":"The footage is gone","lead":"You reported the concern but waited to preserve older footage. Overnight the system overwrites a potentially relevant segment. The family asks why the recording was not saved, and the agency requests the original preservation timeline.","question":"What leadership response preserves accountability after preventable evidence loss?","choices":[["Disclose the actual preservation timeline to investigators, safeguard remaining records, reinforce child protections, and change automatic-retention and escalation procedures.","Accurate disclosure and systemic correction matter more than managing the appearance of an error.",2],["Preserve what remains, inform the agency of the loss, and assign a future video-export owner, but postpone checking other current allegations.","Addresses this event but leaves broader evidence-preservation risks unexamined.",1],["Suggest the missing video never existed so no one will conclude the center mishandled the report.","Misrepresentation compounds the original failure.",0],["Ask a staff member to recreate the missing events in a staged video for the case file.","Fabricated evidence is never an acceptable corrective measure.",0]]},"2":{"head":"Repeated questioning becomes a complaint","lead":"Staff repeatedly interviewed the child and classmates. A family now complains that the children were pressured and gives investigators conflicting versions of what adults asked. A licensing analyst requests your notes.","question":"What is the strongest corrective response?","choices":[["Stop unauthorized interviews, preserve verbatim original notes and chronology, cooperate with authorized investigators, protect children, and retrain staff on disclosure handling.","Acknowledges the process failure and prevents additional contamination while fulfilling reporting duties.",2],["Stop interviews and provide the analyst available notes, but do not yet review the program’s disclosure-response procedure.","Immediate harm is limited, though recurrence remains possible.",1],["Rewrite the notes to match a single consistent statement before giving them to investigators.","Concealing inconsistent versions can compromise the investigation.",0],["Tell the family that questioning was harmless because staff were only trying to help.","Dismissal avoids the actual risk of influencing disclosure.",0]]},"3":{"head":"The delayed report and lost trust","lead":"You waited for proof rather than reporting reasonable suspicion. The parent learns the hotline was never contacted, and a recording was overwritten. A licensing analyst asks why the delay occurred.","question":"How should the director begin repair now?","choices":[["Make the mandated report without further delay, document the true chronology, preserve remaining evidence, maintain interim child safeguards, and cooperate with licensing separately.","Late corrective action does not erase the delay, but further concealment would create more harm.",2],["Contact the reporting hotline and maintain safety coverage, but leave the written timeline until you know what the analyst believes.","Reporting must proceed, but contemporaneous transparency is still necessary.",1],["Argue that the absence of video proves no reasonable suspicion ever existed.","The reporting threshold does not require confirming footage.",0],["Ask the parent to withdraw the concern because a licensing complaint would damage the program.","Pressuring a reporting family compounds the ethical and safety failure.",0]]}}},"schemaVersion":"7.2.0"};

================================== END js/branching.js ==================================

================================== BEGIN css/styles.css ==================================

:root{--plum:#512888;--plumdeep:#321653;--teal:#336b58;--paper:#fbfafd;--ink:#262433;--muted:#545262;--border:#d1c6df;--gold:#b7a57a;--surface:#fff}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif}button,textarea{font:inherit}button{cursor:pointer}button:focus-visible,a:focus-visible,textarea:focus-visible,summary:focus-visible{outline:3px solid #c97e2a;outline-offset:3px}.shell{display:grid;grid-template-columns:minmax(250px,310px) minmax(0,1fr);min-height:100vh}.side{background:var(--plumdeep);color:#fff;padding:30px 25px;position:sticky;top:0;height:100vh;overflow:auto}.brand{font-family:Georgia,serif;font-size:27px;font-weight:bold;line-height:1.14}.small{font-size:.86rem}.side .small{color:#e7dff0}.nav{display:flex;flex-direction:column;gap:8px;margin-top:28px}.navitem{display:flex;gap:10px;align-items:center;padding:11px;border-radius:11px;background:#ffffff0d;color:#fff;font-size:.88rem;border:1px solid #ffffff24}.navitem.current{background:#ffffff28;border-color:#ead8ab}.navitem.done{border-color:#8fcfc4}.navcopy{flex:1;min-width:0}.navlabel{display:block;line-height:1.3}.navtrack{height:5px;margin-top:8px;border-radius:30px;background:#ffffff45;overflow:hidden}.navfill{display:block;height:100%;border-radius:30px;background:#a8e3d6}.navitem.current .navfill{background:#e7c981}.chapterprogress{margin:18px 0 24px}.chapterprogress .bar{height:13px;margin-top:8px}.chapterprogress .progressline{display:flex;justify-content:space-between;gap:12px;font-size:.93rem;font-weight:650}.chapterprogress .progressline span:last-child{color:var(--muted);font-weight:500}.progresshint{font-size:.88rem;color:var(--muted);margin:6px 0 0}.round{width:25px;height:25px;display:inline-grid;place-items:center;border:1px solid #ffffff7f;border-radius:50%;flex-shrink:0}.side hr{border:0;border-top:1px solid #ffffff34;margin:25px 0}.main{max-width:1020px;width:100%;margin:auto;padding:32px clamp(18px,4vw,64px) 70px}.eyebrow{letter-spacing:.14em;text-transform:uppercase;font-size:.74rem;font-weight:800;color:var(--teal)}h1,h2,h3{font-family:Georgia,serif;line-height:1.16;letter-spacing:-.02em}h1{font-size:clamp(2.15rem,4.3vw,3.6rem);margin:14px 0 16px}h2{font-size:clamp(1.6rem,3vw,2.4rem)}h3{font-size:1.2rem}.lede{font-size:1.15rem;line-height:1.65;color:#4d4657}.hero{display:grid;grid-template-columns:1.1fr .9fr;align-items:stretch;gap:24px}.hero img{width:100%;height:100%;min-height:230px;object-fit:cover;border-radius:18px}.card{background:#fff;border:1px solid var(--border);border-radius:17px;padding:clamp(20px,3vw,32px);box-shadow:0 8px 24px #3023410b}.action{border:0;border-radius:100px;padding:13px 24px;background:var(--plum);color:#fff;font-weight:700;display:inline-block;text-decoration:none}.action:hover{background:#332344}.action.secondary{background:#eae5ef;color:var(--plumdeep)}.action.ghost{background:transparent;color:var(--plum);border:1px solid var(--border)}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:25px}.note{background:#f4f0f5;padding:16px;border-left:4px solid var(--plum);border-radius:10px}.lesson{font-size:1.06rem;line-height:1.85}.lesson p{margin:0 0 1.2rem}.lesson strong{color:var(--plum)}.lesson img{width:100%;height:255px;object-fit:cover;border-radius:14px;margin:5px 0 18px}.meta{color:var(--muted);font-size:.9rem}.choices{display:grid;gap:12px;margin-top:24px}.choice{border:2px solid #c9c0ce;background:#fff;color:var(--ink);padding:17px 18px;border-radius:12px;text-align:left;display:flex;align-items:flex-start;gap:13px;line-height:1.5;width:100%;transition:border-color .16s}.choice:hover:not(:disabled){border-color:var(--plum);background:#f8f4fa}.choice:disabled{cursor:default;opacity:1}.choice .letter{display:inline-grid;place-items:center;flex-shrink:0;background:#f0ebf3;border-radius:8px;width:29px;height:29px;font-weight:800}.choice.chosen{border-color:var(--plum);background:#f0e9f8}.choice.preferred{border-color:var(--teal);background:#e9f5f1}.feedback{padding:22px;border-radius:13px;background:#edf6f2;border-left:5px solid var(--teal);margin-top:18px}.feedback.review{background:#fff6e9;border-color:#94621c}.feedback h3{margin:0 0 8px}.bar{height:11px;background:#b9afbf;border-radius:100px;overflow:hidden;margin:8px 0}.fill{background:var(--teal);height:100%;border-radius:100px;transition:width .22s}details{margin:15px 0;background:#fff;border:1px solid var(--border);border-radius:12px;padding:13px 18px}summary{cursor:pointer;font-weight:700}details p{margin-bottom:6px}.stats{display:flex;gap:14px;flex-wrap:wrap;margin:19px 0}.stat{background:#f5f2f6;border-radius:12px;padding:11px 16px;min-width:140px}.stat b{display:block;font-size:1.3rem;color:var(--plum)}.foot{font-size:.82rem;color:var(--muted);margin-top:30px}.foot a{color:var(--teal)}textarea{width:100%;padding:15px;border:2px solid #807588;border-radius:10px;min-height:120px;resize:vertical}ul.clean{padding-left:20px}li{margin:7px 0}.tag{display:inline-block;font-size:.78rem;background:#ede6f0;padding:4px 9px;border-radius:20px;margin-right:6px;color:var(--plum)}.glossbtn{border:0;background:#e7f0ed;color:var(--teal);text-decoration:underline;text-underline-offset:3px;border-radius:5px;padding:0 3px;font-weight:600}.glossbox{padding:18px;background:#edf6f3;border-radius:10px;margin:14px 0}.printonly{display:none}@media(max-width:830px){.shell{display:block}.side{position:static;height:auto;padding:18px}.nav{display:flex;flex-direction:row;overflow-x:auto;margin-top:12px}.navitem{min-width:150px}.side hr,.side .small.hide-mobile{display:none}.brand{font-size:22px}.main{padding:22px 17px 60px}.hero{grid-template-columns:1fr}.hero img{max-height:250px}.choice{padding:13px}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}@media print{.side,.actions,.choices,.hero img,.feedback,.foot{display:none!important}.shell{display:block}.printonly{display:block}.main{max-width:none}.card{box-shadow:none;border:0}}

/* Version 7 accessibility and mobile refinements; V6.2 aesthetic retained. */
#focushead:focus,#glossary:focus,.feedback:focus{outline:3px solid #c97e2a;outline-offset:3px}
.choice{border-color:#807588}.action.ghost{border-color:#807588}.bar{background:#e6e1ea;border:1px solid #756b7d}.navtrack{background:#00000066}
.sr-only{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.journey{margin:17px 0}blockquote{white-space:pre-wrap;margin:8px 0 0;padding-left:14px;border-left:3px solid var(--plum)}
@media(max-width:830px){.lesson img{height:180px}}
@media print{details,.chapterprogress,.lesson img{display:none!important}blockquote{white-space:pre-wrap}}

/* Version 7.5: learner-friendly contextual definitions and dual-perspective exercises. */
.glossbtn{position:relative;display:inline;padding:1px 3px;border-bottom:1px dotted #14665e;line-height:inherit;white-space:normal}
.glossbtn .glosshint{display:inline-grid;place-items:center;width:14px;height:14px;margin-left:3px;border:1px solid #14665e;border-radius:50%;font:700 10px/1 system-ui;vertical-align:2px}
.glossbtn:hover::after,.glossbtn:focus-visible::after{content:attr(data-definition);position:absolute;left:0;bottom:calc(100% + 9px);width:min(320px,75vw);white-space:normal;text-decoration:none;text-align:left;background:#302341;color:#fff;border:2px solid #e7c981;border-radius:11px;padding:11px 13px;font:500 14px/1.45 system-ui;box-shadow:0 12px 25px #30234133;z-index:12;pointer-events:none}
.skillstrip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:18px 0 20px}
.skillstrip>div{padding:12px 10px;border-radius:10px;background:#f5f0f7;border:1px solid #d9d1db}
.skillstrip strong{display:block;color:#512888;font-size:.94rem}
.skillstrip span{display:block;font-size:.82rem;color:#545262}
.lens{background:#f9f6fa;border:1px solid #bcb1c7;margin:20px 0}.lens summary{color:#512888}.lens p{font-size:1rem;line-height:1.6}
.lenscompare{margin:15px 0}.perspectives{display:grid;grid-template-columns:1fr 1fr;gap:12px}.perspectives>div{padding:13px;border-left:4px solid #14665e;background:#f1f9f5;border-radius:9px}.perspectives>div:nth-child(2){border-left-color:#ad8240;background:#fff8ed}
@media(max-width:680px){.skillstrip,.perspectives{grid-template-columns:1fr}.glossbtn:hover::after,.glossbtn:focus-visible::after{display:none}}

/* Version 7.5 enhancements. Original V7.2 visual design and image set preserved. */
.lesson-photo{object-fit:cover;object-position:center 46%;}
.lesson-photo[data-chapter="2"]{object-position:center 39%;}
.lesson-photo[data-chapter="3"]{object-position:center 48%;}
.lesson-photo[data-chapter="4"]{object-position:center 37%;}
.lesson-photo[data-chapter="5"]{object-position:center 35%;}.decision-lab{border:1px solid #8e7e9d;background:#f9f7fa;box-shadow:0 4px 14px #3023410c;}
.decision-lab summary{font-family:Georgia,serif;font-size:1.17rem;color:var(--plumdeep);}
.lab-instruction{font-size:.94rem;color:var(--muted)}
.lab-choices{display:grid;gap:9px;margin:15px 0}
.lab-option{display:block;width:100%;text-align:left;background:white;color:var(--ink);border:2px solid #807588;border-radius:11px;padding:11px 15px;line-height:1.55}
.lab-option:hover,.lab-option:focus-visible{background:#f0e9f8;border-color:var(--plum)}
.lab-option[aria-pressed="true"]{border-color:var(--teal);background:#edf6f3}
.lab-feedback{background:#eef6f2;border-left:4px solid var(--teal);padding:13px 16px;margin-top:15px;border-radius:8px}
.lab-feedback:focus{outline:3px solid #c97e2a;outline-offset:3px}
.lab-step{font-weight:bold;color:var(--plumdeep);font-size:.91rem;margin:12px 0 3px}
.lab-next{margin-top:13px}
@media(max-width:680px){.lab-option{padding:11px 12px}}
@media print{.decision-lab{display:none!important}}

/* V7.4: the closing scenario and letter-size certificate, consistent with V7.3.1. */
.capstone-step{font-size:.9rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--teal)}
.capstone-progress{display:flex;gap:7px;margin:15px 0 23px}
.capstone-dot{height:7px;flex:1;border-radius:99px;background:#a18aaf}
.capstone-dot.done{background:var(--teal)}
.capstone-dot.active{background:var(--gold)}
.capstone-context{border-left:4px solid var(--gold);padding:12px 18px;background:#fff8eb;border-radius:9px;margin:12px 0 18px}
.capstone-options{display:grid;gap:11px;margin-top:18px}
.capstone-option{display:block;text-align:left;width:100%;border:2px solid #807588;border-radius:12px;padding:15px 17px;background:white;color:var(--ink);line-height:1.55}
.capstone-option:hover:not(:disabled),.capstone-option:focus-visible{border-color:var(--plum);background:#f7f3f9}
.capstone-option[disabled]{cursor:default;opacity:1}
.capstone-option.chosen{border-color:var(--teal);background:#edf6f3}
.capstone-feedback{background:#f0f5f2;border-left:4px solid var(--teal);border-radius:11px;padding:16px 19px;margin-top:16px}
.capstone-feedback:focus{outline:3px solid #c97e2a;outline-offset:3px}
.capstone-retrospective{background:#f9f6fb;border:1px solid #c7b6d0;border-radius:12px;padding:18px;margin:20px 0}
.capstone-snapshot{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:14px 0}
.capstone-snapshot>div{background:white;border-left:4px solid var(--teal);padding:12px;border-radius:8px}
.capstone-snapshot>div:first-child{border-left-color:var(--gold)}
.capstone-snapshot strong{display:block;margin-bottom:6px}
.certificate-input{max-width:480px}.certificate-input:focus-visible{outline:3px solid #c97e2a;outline-offset:3px}
.certificate-shell{margin:24px 0 10px}
.certificate-paper{width:100%;max-width:8.5in;min-height:10.8in;margin:0 auto;background:#fffdf9;color:#321653;border:2px solid #4c365e;box-shadow:0 14px 45px #30234123;padding:16px;box-sizing:border-box}
.certificate-frame{border:5px double #b38c50;outline:1px solid #78658a;outline-offset:-11px;height:100%;min-height:calc(10.8in - 34px);padding:clamp(16px,4vw,46px);display:flex;flex-direction:column;align-items:center;justify-content:space-between;text-align:center;position:relative;box-sizing:border-box}
.cert-brand{letter-spacing:.2em;text-transform:uppercase;font:700 .9rem/1.5 system-ui,sans-serif;color:#512888;margin-top:15px}
.cert-kicker{letter-spacing:.28em;text-transform:uppercase;font:700 .77rem/1.5 system-ui,sans-serif;color:#75618a}
.cert-rule{height:2px;width:64px;background:#b38c50;margin:22px auto}
.cert-title{font:normal clamp(2.1rem,4vw,3.3rem)/1.12 Georgia,serif;margin:20px 0 26px;color:#352344}
.cert-recipient-label{font:normal 1rem/1.5 Georgia,serif;color:#5b5260;margin:12px 0}
.cert-name{font:normal clamp(2rem,4vw,3rem)/1.14 Georgia,serif;color:#352344;border-bottom:2px solid #b38c50;padding:0 15px 13px;min-width:70%;margin:10px 0 28px;overflow-wrap:anywhere}
.cert-name.long{font-size:2.15rem}.cert-name.very-long{font-size:1.65rem}
.cert-copy{font:normal 1.12rem/1.7 Georgia,serif;max-width:530px;margin:0 auto;color:#4e4653}
.cert-program{font:bold 1.45rem/1.35 Georgia,serif;color:#352344;margin:14px 0}
.cert-statement{font:italic 1rem/1.6 Georgia,serif;color:#625168;max-width:510px;margin:22px auto 0}
.cert-date-label{font:700 .78rem/1.4 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.12em;color:#5c4d6f}
.cert-date{font:1.15rem/1.5 Georgia,serif;margin-top:7px}
.cert-footer{font:.72rem/1.5 system-ui,sans-serif;color:#675f6b;max-width:520px;margin:25px auto 10px}
#certificatePrintHost{display:none}
@media(max-width:680px){.capstone-snapshot{grid-template-columns:1fr}.capstone-option{padding:12px}.certificate-paper{min-height:600px;padding:8px}.certificate-frame{min-height:570px;aspect-ratio:auto;padding:15px 10px}.cert-brand{font-size:.64rem;margin-top:7px}.cert-kicker{font-size:.6rem;letter-spacing:.16em}.cert-title{font-size:clamp(1.3rem,5vw,2.2rem);margin:9px 0}.cert-rule{margin:11px auto}.cert-recipient-label{font-size:.75rem}.cert-name{font-size:clamp(1.15rem,5vw,2rem);margin:5px 0 10px;padding-bottom:5px}.cert-name.long{font-size:1.15rem}.cert-name.very-long{font-size:1rem}.cert-copy{font-size:.78rem;line-height:1.5}.cert-program{font-size:1.05rem;margin:6px 0}.cert-statement{font-size:.72rem;margin:8px auto 0}.cert-date-label{font-size:.56rem}.cert-date{font-size:.8rem;margin-top:2px}.cert-footer{font-size:.53rem;margin:9px auto 5px}}
@page lwm-certificate{size:letter portrait;margin:0}
@media print{
 body.print-certificate{margin:0!important;padding:0!important;background:white!important}
 body.print-certificate .shell{display:none!important}
 body.print-certificate #certificatePrintHost{page:lwm-certificate!important;display:block!important;margin:0!important;padding:0!important;width:8.5in!important;height:11in!important;overflow:hidden!important;break-inside:avoid!important;page-break-inside:avoid!important}
 body.print-certificate .certificate-paper{width:8.5in!important;max-width:none!important;height:11in!important;min-height:11in!important;margin:0!important;padding:.16in!important;box-shadow:none!important;border:2px solid #4c365e!important;background:white!important;box-sizing:border-box!important}
 body.print-certificate .certificate-frame{width:100%!important;height:100%!important;min-height:0!important;aspect-ratio:auto!important;padding:.48in .43in!important;border:5px double #b38c50!important;outline:1px solid #78658a!important;outline-offset:-11px!important;box-sizing:border-box!important}
 body.print-certificate .cert-brand{font-size:13px!important;margin-top:15px!important}
 body.print-certificate .cert-kicker{font-size:11px!important;letter-spacing:.25em!important}
 body.print-certificate .cert-title{font-size:39px!important;margin:23px 0 25px!important}
 body.print-certificate .cert-rule{margin:23px auto!important}
 body.print-certificate .cert-recipient-label{font-size:16px!important}
 body.print-certificate .cert-name{font-size:37px!important;margin:10px 0 27px!important;padding-bottom:13px!important}
 body.print-certificate .cert-name.long{font-size:30px!important}
 body.print-certificate .cert-name.very-long{font-size:25px!important}
 body.print-certificate .cert-copy{font-size:18px!important;line-height:1.6!important}
 body.print-certificate .cert-program{font-size:24px!important;margin:14px 0!important}
 body.print-certificate .cert-statement{font-size:16px!important;margin:22px auto 0!important}
 body.print-certificate .cert-date-label{font-size:12px!important}
 body.print-certificate .cert-date{font-size:18px!important;margin-top:6px!important}
 body.print-certificate .cert-footer{font-size:10px!important;margin:22px auto 8px!important}
 *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
}


/* V7.5: response quality is explanatory, not a visible number. */
.feedback.acceptable,.lab-feedback.acceptable{background:#fff8eb;border-left-color:#9b702a}
.lab-feedback.review{background:#fff2eb;border-left-color:#ae624b}
.capstone-feedback{line-height:1.62}
.lab-option[aria-pressed="true"]{box-shadow:inset 0 0 0 1px var(--teal)}
@media(max-width:680px){.lab-feedback{padding:11px 13px}}

/* V7.5.1: glossary panel is fixed to the viewport, not placed at the foot of the lesson. */
.glossbox.gloss-popover{
 position:fixed; z-index:50; width:min(360px,calc(100vw - 24px));
 max-height:min(65vh,430px); overflow-y:auto; margin:0;
 box-shadow:0 14px 34px #30234138; border:2px solid var(--teal);
}
body.gloss-open .glossbtn:hover::after,
body.gloss-open .glossbtn:focus-visible::after{display:none}
.capstone-feedback.acceptable{background:#fff8eb;border-left-color:#9b702a}
.capstone-feedback.review{background:#fff2eb;border-left-color:#ae624b}

/* Director's Desk v2: select-all and reference feedback */
.scenario-references{margin-top:17px;padding-top:12px;border-top:1px solid #b8d0ca;font-size:.85rem;line-height:1.8}.scenario-references a{color:#115d68;text-decoration:underline;text-underline-offset:3px}.choice[aria-pressed="true"]{border-color:#16645d;background:#eaf6f1}.choice[aria-pressed="true"] .letter{background:#16645d;color:white}.choice.preferred{border-color:#216f65}.tag+ .tag{background:#e4f4ed;color:#155e4d}.feedback ul{margin:4px 0 12px;padding-left:22px}.feedback li{margin-bottom:6px}


/* Next style layer */

:root{--plum:#1f5861;--plumdeep:#11343d;--teal:#096f67;--paper:#f6f8f5;--ink:#22323b;--muted:#4e5d64;--border:#cedbd8;--gold:#e7aa5f;--surface:#fff}
.side{background:linear-gradient(166deg,#183f49,#0f343d 65%,#164c4b)}.action{background:#165967}.action:hover{background:#0d404a}
.hero-art{background:radial-gradient(circle at 20% 25%,#d9efe1,#c0dfd3 47%,#a8d4d0);min-height:270px;border-radius:18px;position:relative;display:flex;align-items:center;justify-content:center;flex-direction:column;overflow:hidden}
.hero-art:before,.hero-art:after{content:"";position:absolute;border:2px solid #ffffff6a;border-radius:50%;width:380px;height:380px;top:-140px;right:-115px}
.hero-art:after{width:230px;height:230px;top:auto;bottom:-90px;left:-70px}
.hero-orbit{position:absolute;font-size:42px;top:22px;right:45px;color:#fefefe;z-index:1}
.hero-emblem{height:150px;width:150px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff8ec;color:#1a6871;box-shadow:0 18px 35px #16494c22;font-family:Georgia,serif;font-size:94px;position:relative;z-index:1}
.hero-emblem span{font-family:system-ui;font-size:31px;position:absolute;right:10px;bottom:9px;color:#ad6c3e;background:#fff8ec;border-radius:50%;width:45px;height:45px;text-align:center;line-height:45px}
.hero-art-caption{font-size:.82rem;letter-spacing:.04em;font-weight:800;color:#204e51;margin-top:21px;position:relative;z-index:1}
.lesson-mark{width:55px;height:55px;border-radius:16px;display:grid;place-items:center;font-size:32px;background:#e8f5f0;color:#175d65;margin-bottom:18px}
.skillstrip>div{background:#eef6f2;border-color:#c2d9d4}.skillstrip strong,.lens summary,.decision-lab summary{color:#165967}
.feedback.review{background:#fff8e8}.feedback.acceptable,.lab-feedback.acceptable{background:#fff8e9;border-left-color:#a5752c}
.certificate-frame{border-color:#c39a60}.cert-brand,.cert-program{color:#165967}
@media(max-width:830px){.hero-art{min-height:190px}.hero-emblem{width:110px;height:110px;font-size:70px}.hero-emblem span{font-size:23px;width:34px;height:34px;line-height:34px}}
@media print{.hero-art{display:none!important}}


/* Next style layer */

:root{--plum:#512888;--plumdeep:#2e1750;--teal:#2f6f62;--gold:#c9a227;--paper:#faf8fd;--ink:#282538;--muted:#5a5669;--border:#d9d1e4}
.side{background:linear-gradient(180deg,#35185f 0%,#512888 55%,#261245 100%)!important}
.action{background:#512888!important}.action:hover{background:#3b1d66!important}.action.secondary{background:#ede7f5!important;color:#35185f!important}
.brand{letter-spacing:-.02em}.small[style]{color:#eadff9!important}
.photo-hero{display:grid;grid-template-columns:1.05fr .95fr;gap:22px;align-items:stretch}
.hero-copy,.hero-visual{overflow:hidden}.hero-copy .lede{margin-top:0}.hero-visual{display:flex;flex-direction:column;gap:12px}
.welcome-main{width:100%;height:330px;object-fit:cover;border-radius:16px;display:block}
.mini-mosaic{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.mini-mosaic img{width:100%;height:110px;object-fit:cover;border-radius:12px;display:block}
.chapter-highlights{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-top:18px}.chapter-highlights>div{background:#f4eff8;border:1px solid #dbd0e6;border-radius:12px;padding:14px 14px 13px}.chapter-highlights strong,.terms-grid strong{display:block;color:#512888;margin-bottom:6px}.chapter-highlights span,.terms-grid span{font-size:.92rem;color:#534f62;display:block;line-height:1.45}
.terms-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}.terms-grid>div{background:#fff;border:1px solid var(--border);border-radius:12px;padding:14px}
.stage-cards>div{background:#eef5f3;border-color:#cfe1db}
.chapter-hero-wrap{margin:16px 0 18px}.chapter-hero{width:100%;height:295px;object-fit:cover;border-radius:14px;display:block}.photo-caption{margin:8px 4px 0;color:#635d70;font-size:.9rem}
.photo-grid-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:16px 0 18px}.photo-grid-two figure{margin:0;background:#fff;border:1px solid var(--border);border-radius:14px;padding:8px}.photo-grid-two img{width:100%;height:180px;object-fit:cover;border-radius:10px;display:block}.photo-grid-two figcaption{font-size:.84rem;color:#5e5868;line-height:1.35;padding:8px 3px 4px}
.lesson-mark{background:#f1ebf9!important;color:#512888!important}.skillstrip>div{background:#f5f1fa!important;border-color:#d8cfe5!important}.skillstrip strong,.lens summary,.decision-lab summary{color:#512888!important}
.feedback.review{background:#fff7ea!important}.feedback.acceptable,.lab-feedback.acceptable{background:#fff7ea!important;border-left-color:#b07c1f!important}
.navitem.current{background:#ffffff2e!important;border-color:#e7c981!important}.navfill{background:#dbc068!important}.navitem.done{border-color:#a7dbc4!important}
@media(max-width:900px){.photo-hero{grid-template-columns:1fr}.welcome-main{height:260px}}
@media(max-width:680px){.mini-mosaic{grid-template-columns:1fr 1fr}.mini-mosaic img:nth-child(3){grid-column:1 / -1}.photo-grid-two,.terms-grid{grid-template-columns:1fr}.chapter-hero{height:220px}}
@media print{.photo-hero,.mini-mosaic,.chapter-hero-wrap,.photo-grid-two{display:none!important}}


/* Next style layer */

/* Presentation uses only uploaded program photographs; no external assets required. */
.opening-banner{height:clamp(365px,42vw,560px);overflow:hidden;position:relative;border-radius:21px;background:#35185e;margin-top:14px;isolation:isolate;box-shadow:0 18px 35px #29154126}
.opening-banner>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 56%;display:block;z-index:0}
.banner-tint{position:absolute;inset:0;background:linear-gradient(90deg,rgba(25,14,39,.84) 0%,rgba(25,14,39,.64) 43%,rgba(25,14,39,.15) 100%),linear-gradient(0deg,rgba(25,14,39,.36),transparent 55%);z-index:1}
.banner-copy{position:absolute;inset:auto auto 35px 33px;max-width:680px;right:150px;z-index:2;color:#fff;text-shadow:0 2px 12px #130a2b77}
.banner-kicker{margin:0 0 8px;color:#f7e8aa;font-size:.81rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
.banner-copy h1{margin:0 0 12px;font:700 clamp(2.7rem,5vw,4.8rem)/1.07 Georgia,serif;color:#fff;letter-spacing:-.025em}
.banner-subhead{max-width:570px;font-size:clamp(1rem,1.75vw,1.28rem);font-weight:510;line-height:1.55;margin:0}
.banner-controls{position:absolute;right:24px;bottom:24px;display:flex;gap:9px;z-index:3}
.banner-arrow{display:grid;place-items:center;width:45px;height:45px;border-radius:50%;background:#ffffffed;color:#35185e;border:2px solid #ffffff;font-size:29px;line-height:1;cursor:pointer}
.banner-arrow:hover{background:#f1e5ff}
.banner-arrow:focus-visible,.banner-dots button:focus-visible{outline:3px solid #d5a829;outline-offset:3px}
.banner-meta{display:flex;gap:20px;justify-content:space-between;align-items:center;padding:11px 7px 21px;color:#5c5669;font-size:.9rem}.banner-meta p{margin:0}
.banner-dots{display:flex;gap:8px;align-items:center}.banner-dots button{display:block;height:11px;width:11px;flex:0 0 auto;border:0;border-radius:99px;background:#bcb2ca;padding:0;cursor:pointer}.banner-dots button[aria-current="true"]{width:30px;background:#512888}
.welcome-lede{display:grid;grid-template-columns:minmax(0,1fr) 255px;gap:28px;margin-bottom:22px}.welcome-lede h2{margin:10px 0 14px}.welcome-lede p{max-width:760px}
.welcome-facts{display:grid;gap:12px;align-content:start;background:#f5f0fa;padding:16px;border-radius:14px;border:1px solid #ded1ea}.welcome-facts>div{border-bottom:1px solid #d8cbe4;padding:9px 3px 12px}.welcome-facts>div:last-child{border-bottom:0}.welcome-facts strong{display:block;color:#512888;font-size:1.65rem;line-height:1.2}.welcome-facts span{display:block;color:#5c5369;font-size:.91rem;margin-top:3px}
.process-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px;margin:19px 0}.process-strip>div{border-top:3px solid #512888;background:#f5f1fa;padding:15px 12px;border-radius:0 0 11px 11px}.process-strip .step-number{display:block;color:#7b5fa1;font-size:.77rem;font-weight:800;margin-bottom:8px}.process-strip strong{display:block;color:#321653}.process-strip span:last-child{font-size:.85rem;line-height:1.42;display:block;margin-top:6px;color:#5c5369}
.lesson img.chapter-hero{height:300px;width:100%;object-fit:cover;margin:0;border-radius:15px}.lesson .photo-grid-two img{height:180px;width:100%;object-fit:cover;margin:0;border-radius:10px}
.lesson .photo-grid-two figure:nth-child(2) img{object-position:center 45%}.lesson .photo-grid-two figure:first-child img{object-position:center 42%}
.lesson .photo-grid-two img[data-photo="welcomeQuirky"],.lesson .photo-grid-two img[data-photo="ch3b"]{object-position:center 40%}
.lesson .photo-grid-two img[data-photo="ch5b"]{object-position:center 42%}
.card+.card{margin-top:22px}
@media(max-width:800px){.welcome-lede{grid-template-columns:1fr}.welcome-facts{grid-template-columns:repeat(2,1fr)}.process-strip{grid-template-columns:repeat(2,1fr)}.opening-banner{height:440px}.banner-copy{right:30px;bottom:88px}.banner-tint{background:linear-gradient(0deg,#1b1121df,rgba(27,17,33,.12) 90%)}}
@media(max-width:500px){.opening-banner{height:410px}.banner-copy{left:20px;right:20px;bottom:86px}.banner-copy h1{font-size:2.6rem}.banner-subhead{font-size:1rem}.banner-controls{right:17px;bottom:16px}.banner-meta{align-items:flex-start;flex-direction:column;gap:8px}.process-strip{grid-template-columns:1fr 1fr}.welcome-facts{grid-template-columns:1fr 1fr}.lesson img.chapter-hero{height:220px}}
@media(prefers-reduced-motion:reduce){.opening-banner img{transition:none!important}}
@media print{.opening-banner,.banner-meta,.banner-controls{display:none!important}}


/* Next style layer */

/* V6 palette: exact Maple Hill V7.5 base design tokens. */
:root{--plum:#44305d;--plumdeep:#302341;--teal:#14665e;--paper:#fcfaf6;--ink:#262433;--muted:#545262;--border:#d9d1db;--gold:#dfac51;--surface:#fff}
body{background:#fcfaf6;color:#262433}
.side{background:#302341!important;color:#fff!important}
.action{background:#44305d!important;color:#fff!important}.action:hover{background:#332344!important}.action.secondary{background:#eae5ef!important;color:#302341!important}
.action.ghost{color:#44305d;border-color:#807588!important}.side .small{color:#e7dff0!important}
.eyebrow,.capstone-step,.foot a{color:#14665e!important}
.tag{background:#ede6f0;color:#44305d}.lesson strong,.chapter-highlights strong,.terms-grid strong,.welcome-facts strong,.skillstrip strong{color:#44305d!important}
.lesson-mark{background:#f0ebf3!important;color:#44305d!important}.lesson .glossbtn{background:#e7f0ed!important;color:#14665e!important}
.glossbox,.feedback,.lab-feedback{background:#edf6f3!important;border-color:#14665e!important}
.feedback.review,.lab-feedback.review{background:#fff6e9!important;border-color:#94621c!important}
.feedback.acceptable,.lab-feedback.acceptable{background:#fff8eb!important;border-color:#9b702a!important}
.navitem.current{background:#ffffff28!important;border-color:#ead8ab!important}.navitem.done{border-color:#8fcfc4!important}.navfill{background:#a8e3d6!important}.navitem.current .navfill{background:#e7c981!important}
.bar{background:#e6e1ea!important}.fill{background:#14665e!important}
.opening-banner{background:#302341;box-shadow:0 18px 35px #30234126}
.banner-tint{background:linear-gradient(90deg,rgba(29,20,42,.84) 0%,rgba(29,20,42,.62) 43%,rgba(29,20,42,.14) 100%),linear-gradient(0deg,rgba(29,20,42,.30),transparent 60%)}
.banner-kicker{color:#f4deaa!important}.banner-arrow{color:#302341;background:#ffffffed}.banner-arrow:hover{background:#f1edf5}
.banner-dots button{background:#bcb2ca}.banner-dots button[aria-current="true"]{background:#44305d!important}
.welcome-facts{background:#f5f2f6;border-color:#d9d1db}.welcome-facts>div{border-color:#d9d1db}
.process-strip>div,.chapter-highlights>div{background:#f5f2f6;border-color:#d9d1db}.process-strip>div{border-top-color:#44305d}
.process-strip .step-number{color:#75618a}.process-strip strong{color:#302341}.stage-cards>div{background:#edf6f3;border-color:#cbded5}
.photo-grid-two figure{background:#fff;border-color:#d9d1db}.photo-caption,.photo-grid-two figcaption{color:#545262}
.lens{background:#f9f6fa;border-color:#bcb1c7}.lens summary,.decision-lab summary{color:#44305d!important}
.choice:hover:not(:disabled),.lab-option:hover{background:#f8f4fa!important;border-color:#44305d!important}.choice.chosen{background:#f1edf5!important;border-color:#44305d!important}
.choice.preferred{background:#e9f5f1!important;border-color:#14665e!important}.choice[aria-pressed="true"]{background:#e9f5f1!important;border-color:#14665e!important}
.choice[aria-pressed="true"] .letter{background:#14665e!important}
.capstone-option.chosen{background:#edf6f3;border-color:#14665e!important}
.capstone-feedback{border-color:#14665e}
.cert-brand,.cert-program{color:#44305d!important}.certificate-paper{border-color:#44305d}.certificate-frame{border-color:#dfac51}
.main .card{border-color:#d9d1db}
#focushead:focus{outline:3px solid #604963!important;outline-offset:4px}/* Focus moves to page headings programmatically; interactive controls retain their visible focus indicators. */
/* Progress, coverage-map and learning-report tools */
.coverage-table{width:100%;border-collapse:collapse;line-height:1.55;font-size:.93rem}.coverage-table th,.coverage-table td{padding:11px 12px;text-align:left;border-bottom:1px solid #d9d1db}.coverage-table th{background:#f5f2f6;color:#302341}.coverage-table td:last-child{text-align:right;font-variant-numeric:tabular-nums}.coverage-table tr:last-child td{border-bottom:0}
.question-progress{display:flex;justify-content:space-between;gap:12px;font-size:.88rem;font-weight:650;color:#545262;margin-top:8px}.instruction-tag{font-size:.78rem;font-weight:700;color:#14665e;letter-spacing:.02em}
.report-actions{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}.report-actions button{font-weight:700}
@media(max-width:800px){.banner-tint{background:linear-gradient(0deg,#302341e0,rgba(48,35,65,.13) 90%)}}
@media print{.coverage-table{font-size:.75rem}}

/* v7.2: accessible visual hierarchy for choice-dependent consequences */
.branch-path-label{font-weight:800;letter-spacing:.06em;font-size:.73rem;color:#355a50;text-transform:uppercase;margin:0 0 .4rem}
.branch-context{padding:14px 18px;border-left:4px solid #336b58;border-radius:5px;background:#eef4f0;line-height:1.65}
.decision-trail{display:grid;gap:11px;margin:18px 0}.path-event{padding:14px 17px;background:#f7f5fa;border:1px solid #d1c6df;border-radius:10px}.path-event-head{display:flex;gap:10px;justify-content:space-between;flex-wrap:wrap}.path-event-head span{font-weight:800}.path-event-head strong{color:#425e57;font-size:.8rem}.path-event p{margin:6px 0 0}.decision-trail.compact .path-event{padding:10px 12px}
@media(max-width:650px){.path-event-head{display:block}.path-event-head strong{display:block;margin-top:4px}}

================================== END css/styles.css ==================================

================================== BEGIN index.html ==================================
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#44305d"><title>Care with a Compass | Supervisor Leadership Academy v7.2</title>




<link rel="stylesheet" href="css/styles.css"></head><body><div class="shell"><aside class="side"><div class="brand">Care with<br>a Compass</div><p class="small" style="color:#e3d6f4;font-weight:700;letter-spacing:.08em">EDACE 830 · INDEPENDENT STUDENT PROJECT</p><p class="small hide-mobile">The Director’s Desk · Caregiver Supervisor Leadership Lab</p><div id="nav" class="nav" aria-label="Chapter progress"></div><hr><p class="small">Five learning chapters, 72 applied questions, targeted remediation, 20 branching follow-ups and a 4-stage cascading capstone, and a completion certificate.</p><p class="small">Supervisor edition v7.2 · Photo slideshow · Offline</p></aside><main class="main" id="main" aria-live="off"></main></div>
<div id="certificatePrintHost" aria-hidden="true"></div><!-- Data editing: use the included Question_Editor.html and import this HTML. --><script src="js/data.js"></script><script src="js/branching.js"></script><script src="js/app.js"></script></body></html>
================================== END index.html ==================================

================================== BEGIN Question_Editor.html ==================================
<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Compass Question Editor</title><style>:root{font:16px system-ui;color:#263b3d;background:#f7f3f0}body{max-width:1150px;margin:auto;padding:28px}h1{color:#604963}header,p{line-height:1.5}.bar{display:flex;gap:9px;flex-wrap:wrap;margin:16px 0}button,.file{border:0;background:#604963;color:white;padding:11px 15px;border-radius:9px;cursor:pointer;font:inherit}button.secondary{background:#3b7875}button.danger{background:#a33c43}input,textarea,select{box-sizing:border-box;width:100%;border:1px solid #c8c2c5;border-radius:7px;padding:9px;background:white;font:inherit}textarea{min-height:100px}label{font-weight:650;display:block;margin-top:12px}main{display:grid;grid-template-columns:minmax(230px,32%) 1fr;gap:20px}.panel{background:white;border-radius:12px;padding:20px;box-shadow:0 2px 14px #0001}#items{height:65vh;overflow:auto}#items button{display:block;width:100%;text-align:left;margin:5px 0;background:#edf1ef;color:#233;border-radius:7px}#items button.active{background:#d9c8db}small{color:#526}#status{min-height:24px;color:#305b48}#empty{color:#666}@media(max-width:700px){main{display:block}.panel{margin-bottom:14px}#items{height:240px}}</style><body><header><h1>Care with a Compass · Question Editor</h1><p>Offline question editor. Open <strong>data/questions.json</strong>, edit questions, and export both updated JSON and <strong>js/data.js</strong>. Replace those two files in the modular project. No server required. Keep backups.</p></header><div class="bar"><label class="file">Open course HTML<input id="htmlFile" type="file" accept=".html,.htm" hidden></label><label class="file">Open questions JSON<input id="jsonFile" type="file" accept=".json" hidden></label><button id="exportHtml">Download updated standalone HTML (legacy)</button><button class="secondary" id="exportJs">Download updated js/data.js</button><button class="secondary" id="exportJson">Download question database JSON</button><button class="secondary" id="add">Add question</button></div><p id="status" role="status">Open data/questions.json to begin. Export both JSON and JS when finished.</p><main><section class="panel"><label>Find a question<input id="search" placeholder="Search ID, chapter, or scenario"></label><p id="count"></p><div id="items"></div></section><section class="panel"><div id="empty">Select a question to edit.</div><div id="form" hidden><label>Question ID<input id="qid"></label><label>Chapter (1–5)<input id="chapter" type="number" min="1" max="5"></label><label>Learning objective<input id="objective" type="number" min="1" max="5"></label><label>Scenario<textarea id="scenario"></textarea></label><label>Answer choices (one per line, in A–E order)<textarea id="choices" rows="8"></textarea></label><label>Preferred answer letter(s), e.g. A or A,C<input id="answer" placeholder="A or A,C"></label><label>Why this answer is best<textarea id="rationale"></textarea></label><label>Source IDs, comma-separated (see questions.json sourceMap)<input id="refs"></label><div class="bar"><button id="save">Save changes</button><button class="danger" id="remove">Delete question</button></div><small>Saving preserves existing custom feedback and partial-credit maps. For detailed per-choice edits, edit questions.json directly. Export JSON and JS, then replace data/questions.json and js/data.js to publish your changes.</small></div></section></main><script>
let courseHTML='',data=null,selected=-1;const $=id=>document.getElementById(id);const say=x=>$('status').textContent=x;function download(name,content,type){const u=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),500)}function render(){if(!data)return;let term=$('search').value.toLowerCase();$('count').textContent=data.questions.length+' questions · '+data.questions.filter(q=>(q.id+' '+q.chapter+' '+q.scenario).toLowerCase().includes(term)).length+' shown';$('items').replaceChildren();data.questions.forEach((q,i)=>{if(!(q.id+' '+q.chapter+' '+q.scenario).toLowerCase().includes(term))return;let b=document.createElement('button');b.textContent=q.id+' · '+q.scenario.slice(0,85);b.className=i===selected?'active':'';b.onclick=()=>choose(i);$('items').append(b)})}function choose(i){selected=i;const q=data.questions[i];$('empty').hidden=true;$('form').hidden=false;for(const k of ['id','chapter','objective','scenario','answer','rationale'])$(k==='id'?'qid':k).value=q[k]??'';$('choices').value=q.choices.join('\n');$('refs').value=(q.refs||[]).join(', ');render()}$('htmlFile').onchange=async e=>{let f=e.target.files[0];if(!f)return;let t=await f.text(),m=t.match(/window\.LWM_DATA=(\{[\s\S]*?\});<\/script>/);if(!m){say('Cannot find course data in that HTML file.');return}try{data=JSON.parse(m[1]);courseHTML=t;selected=-1;render();say('Loaded '+data.questions.length+' questions. Edit, then export updated HTML.')}catch(e){say('Invalid course data: '+e.message)}};$('jsonFile').onchange=async e=>{let f=e.target.files[0];if(!f)return;try{let obj=JSON.parse(await f.text());if(!Array.isArray(obj.questions))throw Error('Missing questions array');data=obj;selected=-1;render();say('Loaded JSON. For standalone HTML export, also load a matching course HTML (loading HTML replaces current data).')}catch(e){say(e.message)}};$('search').oninput=render;$('save').onclick=()=>{if(selected<0)return;let q=data.questions[selected],id=$('qid').value.trim(),choices=$('choices').value.split('\n').map(s=>s.trim()).filter(Boolean),ch=+$('chapter').value,ans=$('answer').value;if(!id||ch<1||ch>5||choices.length<2||choices.length>5||!ans.split(/[|,\s]+/).filter(Boolean).every(x=>x.length===1&&'ABCDE'.indexOf(x)>=0&&'ABCDE'.indexOf(x)<choices.length)||data.questions.some((x,i)=>i!==selected&&x.id===id)){say('Check unique ID, chapter 1–5, 2–5 choices, and answer letter.');return}const letters=[...new Set(ans.toUpperCase().split(/[|,\s]+/).filter(Boolean))].sort();const multi=letters.length>1;const oldFeedback=q.feedback||{},oldAcceptable=q.acceptable||{};Object.assign(q,{id,chapter:ch,objective:+$('objective').value||1,scenario:$('scenario').value.trim(),choices,answer:letters.join('|'),rationale:$('rationale').value.trim(),refs:$('refs').value.split(',').map(s=>s.trim()).filter(Boolean),family:'c'+ch+'-o'+(+$('objective').value||1),acceptable:Object.fromEntries(Object.entries(oldAcceptable).filter(([k])=>!letters.includes(k)&&'ABCDE'.indexOf(k)<choices.length)),multi,answerSet:multi?letters:undefined});if(!multi){delete q.multi;delete q.answerSet;}q.feedback={};choices.forEach((_,i)=>{let k='ABCDE'[i],preferred=letters.includes(k),old=oldFeedback[k];q.feedback[k]={type:preferred?'preferred':q.acceptable[k]?'acceptable':'review',text:old?.text||(preferred?q.rationale:'Explain why this alternative is incomplete or unsafe.')}});render();say('Saved '+id+' in the editor. Download HTML to make it permanent.')};$('add').onclick=()=>{if(!data){say('Load a course first.');return}let ch=3,n=1,id;do{id='C'+ch+'Q'+String(n++).padStart(2,'0')}while(data.questions.some(q=>q.id===id));data.questions.push({id,chapter:ch,objective:1,scenario:'New scenario',choices:['First option','Second option'],answer:'A',rationale:'Explain the correct response.',feedback:{},family:'c3-o1',acceptable:{},refs:[]});choose(data.questions.length-1);say('New question added. Edit and save it.')};$('remove').onclick=()=>{if(selected<0||!confirm('Delete this question?'))return;data.questions.splice(selected,1);selected=-1;$('form').hidden=true;$('empty').hidden=false;render();say('Question deleted. Export to preserve changes.')};$('exportJson').onclick=()=>{if(!data)return say('Load data first.');download('compass_questions_updated.json',JSON.stringify(data,null,2),'application/json')};$('exportJs').onclick=()=>{if(!data)return say('Load questions.json first.');download('data.js','window.LWM_DATA='+JSON.stringify(data).replaceAll('</','<\/')+';\n','text/javascript');say('Downloaded data.js. Replace js/data.js in your project and also export questions.json.')} ;$('exportHtml').onclick=()=>{if(!data||!courseHTML)return say('Standalone export requires an embedded-data offline HTML; use JSON and JS exports for the modular site.');let output=courseHTML.replace(/window\.LWM_DATA=\{[\s\S]*?\};<\/script>/,'window.LWM_DATA='+JSON.stringify(data).replaceAll('</','<\\/')+';<\/script>');if(output===courseHTML&&data.questions.length===0)return say('Export failed.');download('Care_with_a_Compass_Updated_Offline.html',output,'text/html');say('Downloaded updated offline course with '+data.questions.length+' questions.')};</script></body></html>
================================== END Question_Editor.html ==================================

================================== BEGIN tools/qa_release.py ==================================
#!/usr/bin/env python3
"""Release integrity gate for the question bank, source lists and capstone."""
from pathlib import Path
import json,re,collections,subprocess,sys
root=Path(__file__).resolve().parents[1]
d=json.loads((root/'data/questions.json').read_text(encoding='utf-8'))
q=d['questions']; app=(root/'js/app.js').read_text(encoding='utf-8')
assert len(q)==72,(len(q),'questions rather than 72')
ids=[x['id'] for x in q];assert len(ids)==len(set(ids)), 'Duplicate question IDs'
assert len(d['lessons'])==5 and len(d['lensCases'])==7
for x in q:
 labels=[chr(65+j) for j in range(len(x['choices']))]
 assert len(labels)==5,(x['id'],'expected 5 choices')
 assert set(x['feedback'])==set(labels),(x['id'],'missing feedback')
 gold=x.get('answerSet') if x.get('multi') else [x['answer']]
 assert set(gold)<=set(labels),(x['id'],'invalid key')
 if x.get('multi'):
  assert x['answer']=='|'.join(gold),(x['id'],'multi answer mismatch')
 else:
  assert 'answerSet' not in x,(x['id'],'stale answerSet')
  assert len(gold)==1,(x['id'],'invalid single key')
 for k in gold:
  assert x['feedback'][k]['type']=='preferred',(x['id'],k,'correct action not labelled preferred')
 for k in labels:
  assert bool(k in gold)==(x['feedback'][k]['type']=='preferred'),(x['id'],k,'feedback disagrees with key')
 for k in x.get('acceptable',{}):
  assert k not in gold and x['feedback'][k]['type']=='acceptable',(x['id'],k,'unsafe partial score mapping')
 for k in labels:
  if x['feedback'][k]['type']=='acceptable':
   assert k in x.get('acceptable',{}),(x['id'],k,'missing acceptable entry')
  assert x['feedback'][k]['text'].strip(),(x['id'],k,'empty rationale')
 assert all(k in d['sourceMap'] for k in x['refs']),(x['id'],'bad source ref')
for phrase in ['exceptional needs adjustment','severely disabled','50% increase','50% reimbursement','chs-ca.org']:
 assert phrase.lower() not in d['lessons'][2]['html'].lower(),('retired subsidy text in chapter 3',phrase)
 assert all(phrase.lower() not in ' '.join(s).lower() for s in d['sources']),('retired subsidy source',phrase)
assert all(x[1]=='' for x in d['sources'][:4]),'Academic entries must not be links'
assert 'item.family||item.familyPerspective' not in app,'Broken extra lens keys'
assert 'showLens(this,${6+idx})' in app,'Additional lenses must be interactive'
assert '<strong>60</strong><span>Applied questions</span>' not in app,'Outdated 60 count'
assert 'The academy now contains twelve practice questions' not in app,'Outdated 12 count'
assert '<td>12</td></tr>' not in app,'Stale 12-per-chapter table'
assert all(f'${{chItems({i}).length}}' in app for i in range(1,6)), 'Missing dynamic table count'
assert 'function capstoneScore(i,c)' in app and 'function capstoneStage(i,c)' in app,'Branch scores must derive from chosen scene' 
cap=re.search(r'const FINAL_CHALLENGE=(\[.*?\]);\n',app,re.S)
assert cap,'Capstone source missing'
steps=json.loads(cap.group(1))
assert len(steps)==4
preferred=[]
for step in steps:
 assert len(step['choices'])==4
 levels=[o[2] for o in step['choices']]
 assert sorted(levels)==[0,0,1,2],(step['head'],levels)
 preferred.append(levels.index(2))
 assert all(o[0] and o[1] for o in step['choices'])
 assert 'bridges' in step
assert preferred != [0,1,2,3],f'Too-obvious preferred diagonal {preferred}'
assert 'cannot' in steps[0]['choices'][0][1] or 'second emergency' in steps[0]['choices'][0][1]
assert steps[0]['choices'][0][2]==0,'Unsafe unsupervised closure got passing credit'
for f in ['js/app.js','js/data.js']:
 p=subprocess.run(['node','--check',str(root/f)],capture_output=True,text=True)
 assert p.returncode==0,p.stderr
jss=(root/'js/data.js').read_text(encoding='utf-8')
assert jss.startswith('window.LWM_DATA=')
assert json.loads(jss[len('window.LWM_DATA='):].strip().rstrip(';'))==d,'data.js diverged from JSON source'
assert len(list((root/'images').glob('*.webp')))==14,'Expected image assets'
html=(root/'Care_with_a_Compass_Standalone_Offline.html').read_text(encoding='utf-8')
assert html.count('data:image/webp;base64,')==14,'Standalone images incomplete'
assert '<script src=' not in html and 'js/app.js' not in html,'Standalone accidentally references external scripts'
assert 'const BRANCHING=window.COMPASS_BRANCHING' in html,'Standalone branching logic is stale'
assert 'The academy now contains twelve practice questions' not in html
assert 'Supervising specialized care also means understanding reimbursement.' not in html
branch_test=subprocess.run([sys.executable,str(root/'tools/qa_branching.py')],capture_output=True,text=True)
assert branch_test.returncode==0,branch_test.stderr
print('PASS: 72 questions, 5 lessons, 7 lenses, question feedback alignment, 32 branch scenes, 4 capstone stages, source parity, JavaScript, 14 images, standalone parity')

================================== END tools/qa_release.py ==================================

================================== BEGIN tools/qa_branching.py ==================================
#!/usr/bin/env python3
"""Structural regression tests for all 32 consequence-based follow-up scenes."""
from pathlib import Path
import json, re, collections, subprocess
root=Path(__file__).resolve().parents[1]
b=json.loads((root/'data/branching.json').read_text(encoding='utf-8'))
app=(root/'js/app.js').read_text(encoding='utf-8')
assert b['schemaVersion']=='7.2.0'
assert set(b['labs'])=={'1','2','3','4','5'}
assert set(b['capstone'])=={'1','2','3'}
leads=[]
seen=set()
for ch,variants in b['labs'].items():
 assert set(variants)=={'0','1','2','3'},('lab paths missing',ch)
 for prior,branch in variants.items():
  where=f'Lab {ch} choice {prior}'
  assert len(branch['lead'])>=70 and len(branch['prompt'])>=20,where
  assert len(branch['options'])==4,where
  levels=sorted(x['level'] for x in branch['options'])
  assert levels==[0,0,1,2],(where,levels)
  assert all(len(x['text'])>=65 and len(x['why'])>=45 for x in branch['options']),where
  assert len(branch['takeaway'])>60,where
  assert branch['lead'] not in seen,(where,'reused scenario text')
  seen.add(branch['lead'])
  leads.append(branch['lead'])
for step,variants in b['capstone'].items():
 assert set(variants)=={'0','1','2','3'},('capstone paths missing',step)
 for prior,branch in variants.items():
  where=f'Capstone {step} previous choice {prior}'
  assert len(branch['head'])>=12 and len(branch['lead'])>=70 and len(branch['question'])>=20,where
  assert len(branch['choices'])==4,where
  assert sorted(x[2] for x in branch['choices'])==[0,0,1,2],where
  assert all(len(x[0])>=65 and len(x[1])>=45 for x in branch['choices']),where
  assert branch['lead'] not in seen,(where,'reused scenario')
  seen.add(branch['lead'])
  leads.append(branch['lead'])
assert len(leads)==32
assert 'function labFollow(ch,st)' in app
assert 'labFollow(ch,st)' in app
assert 'function capstoneStage(i,c)' in app
assert 'capstoneStage(i,c)' in app
assert 'capstoneScore(i,c)' in app
assert 'capstoneJourney(c)' in app
assert 'v72-72q' in app and 'v71-72q' not in app
js=(root/'js/branching.js').read_text(encoding='utf-8')
assert js.startswith('window.COMPASS_BRANCHING=')
assert json.loads(js[len('window.COMPASS_BRANCHING='):].strip().rstrip(';'))==b,'Branch source diverged from generated JS'
html=(root/'Care_with_a_Compass_Standalone_Offline.html').read_text(encoding='utf-8')
assert 'window.COMPASS_BRANCHING=' in html and 'const BRANCHING=window.COMPASS_BRANCHING' in html
assert html.count('data:image/webp;base64,')==14
assert '<script src=' not in html
for p in (root/'js/app.js',root/'js/branching.js',root/'js/data.js'):
 res=subprocess.run(['node','--check',str(p)],capture_output=True,text=True)
 assert res.returncode==0,(str(p),res.stderr)
print('PASS: 32 unique dynamic branches, 128 evaluated options, grade labels, stable offline bundle')

================================== END tools/qa_branching.py ==================================