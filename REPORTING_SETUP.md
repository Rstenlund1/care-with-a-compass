# Care with a Compass · Instructor Email Reporting Setup (v9.8.4)

The public site runs on GitHub Pages, so it cannot send an email itself. For a short supervised pilot, use a verified **Formspree form** to send instructor notifications to **rickstenlund@outlook.com**.

## Connect a Formspree form

1. Create and verify a Formspree account at https://formspree.io/ using the instructor's Outlook email.
2. Choose **New Form**. Name it **Care with a Compass – Training Reports** and set the recipient/target email to **rickstenlund@outlook.com**.
3. Under **Workflow → Validation**, check whether a default *required email* rule is enabled. Remove that rule if present: the training deliberately requires only the learner's **name**, with an **optional organization**, and does not request a learner email address.
4. Under **Project Settings → Restrict to Domain**, enter `rstenlund1.github.io` (without `https://` or a path). This reduces casual unauthorized submissions, but it is not authentication.
5. Under **Integration**, copy the **public form endpoint**, in the format `https://formspree.io/f/xxxxxxxx`. Do **not** copy API keys, email passwords, or a private dashboard link.
6. Edit the public GitHub repository `index.html`. Locate `window.CWC_REPORT_ENDPOINT=""` and change the empty quotes to your **exact Formspree endpoint**. Do not alter the surrounding script.
7. Confirm that the published site loads the updated `index.html`. Test registration in the main introductory panel and one explicit Submit Chapter Results action with an imaginary adult's name; verify that **Formspree shows a submission and the instructor Outlook inbox receives the notification**. Check Junk/Spam as needed.
8. Test final assessment submission and optional facilitator scoring. Repeat with an incomplete answer path to confirm coaching gaps are listed correctly.

## Expected volume

Each participant can generate **five learner-submitted chapter notices**, **one final-assessment notice**, and **one instructor-review notice**: approximately **seven submissions per participant**. Fifteen learners can therefore generate roughly **105 notices**. Formspree's published free plan currently includes **50 monthly submissions**; a paid plan is likely needed for the full proposed pilot. Pricing and terms may change; see https://formspree.io/plans/.

## What goes into the reports

Every report contains the learner's self-entered name, optional organization, browser-local session ID, date, and event type. Chapter reports summarize attempted items, first-try preferred decisions, current preferred decisions, individual question/objective IDs requiring coaching, and whether the question-attempt cap triggered a facilitator flag. The final assessment adds scored portions, gate metrics, and selected **option IDs**, while facilitator updates provide the manual score and provisional outcome.

**Raw open-ended learner reflections, details about children, family names, and staff case narratives are deliberately excluded.** The enrollment screen tells learners that their performance will be sent to the instructor and warns against entering other people's private information.

## Reliability and limitations

- No report goes to a provider while `window.CWC_REPORT_ENDPOINT` is empty.
- Reports are queued **in the learner's browser** and delivered on completion or a later visit once the endpoint is configured. Failed submissions remain locally queued for a later retry. Clearing browser storage, switching learner, or starting over may discard undelivered records.
- The site does not provide secure logins, attendance verification, confirmed facilitator identity, tamperproof scores, or a central class roster.
- The completion certificate documents finished activities and is separate from the proposed **90/100 plus safety-gates** competency assessment.
- For formal credentialing or legally regulated educational records, move reporting to a protected server with authenticated users, stronger consent/access controls, and encrypted records. Formspree is suitable only if the program's consent, privacy, and institutional requirements allow sending these fields through this provider.

## References

- Formspree form creation: https://help.formspree.io/articles/building-your-form/building-an-html-form
- Formspree AJAX submissions: https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax
- Formspree Workflow validation: https://help.formspree.io/articles/building-your-form/getting-started-with-workflow
- Domain restriction: https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain
- Plans: https://formspree.io/plans/
