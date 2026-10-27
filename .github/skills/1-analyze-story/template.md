# <Story-id> – <title>

- **ADO link**: <url> · **State**: <state> · **Sprint**: <iteration> · **Analysed**: <date>
- **Verdict**: Ready for test design | Blocked

## Acceptance criteria
| AC | Criterion | Testable? | Notes |
|---|---|---|---|
| AC-1 | ... | Yes / Partly / No | ... |

## User Workflow
**Main Workflow**

| Step| Actor| Action| Expected System Behavior |Source AC|
|---|---|---|---|---|
|WF-01| User|<User action>| <Expected behavior supported by requirements> | AC-XX|
|WF-02|User| <Next action> |<Expected system response> |AC-XX|
|WF-03|System | <System processing> | <Expected outcome> | AC-XX|

**Alternative and Failure Workflows**

WF-A: <Alternative or failure scenario name>

**Starting condition:** <Verified condition>
1. User action: <Action supported by requirements>.
2. System response: <Expected behavior supported by requirements>.
3. Final state: <Verified outcome>.

**Related Acceptance Criteria:** AC-XX

Repeat this section for each distinct alternative or failure path.

If no alternative or failure behavior is specified, state: Not specified in the available requirements. Do not invent expected behavior.

## Open questions for the PO
1. [AC-n] ...

## Assumptions
- ...

## Risks
| Risk | Likelihood | Impact | Priority |
|---|---|---|---|
| ... | H/M/L | H/M/L | P1/P2/P3 |

## Test scope
- **In scope**: functional, API, UI, roles ...
- **Out of scope**: ...
- **Test levels**: unit (dev) · API · E2E · exploratory
- **Test data / environment needs**: ...
- **Dependencies**: ...
