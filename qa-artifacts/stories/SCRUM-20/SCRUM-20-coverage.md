# SCRUM-20 Test Coverage Report

- **Story**: SCRUM-20 – Top Navigation
- **Source of truth**: [SCRUM-20-analysis.md](./SCRUM-20-analysis.md)
Status: Approved
- **Generated**: 2026-11-03

## Acceptance-criteria coverage

| AC | Expected behavior represented in analysis | Status | Test cases | Coverage notes |
|---|---|---|---|---|
| AC-01 | Authenticated Admin sees the top navigation at 1366 × 768 and it remains fixed while scrolling. | Covered | TC-SCRUM-20-01, TC-SCRUM-20-02 | Long-text truncation was removed from the approved test scope. |
| AC-02 | Upgrade is identifiable and opens the specified destination in a new tab; unavailable destination produces an error toast. | Covered | TC-SCRUM-20-04, TC-SCRUM-20-16 | Normal navigation and external failure are covered. |
| AC-03 | Account area displays the authenticated Admin avatar, account name, and downward indicator beside Upgrade. | Covered | TC-SCRUM-20-05 | Identity display is covered; long-name truncation was removed from the approved test scope. |
| AC-04 | Account menu actions, About data, formatting, dismissal, current-tab navigation, and logout behave as specified. | Covered | TC-SCRUM-20-05, TC-SCRUM-20-07, TC-SCRUM-20-08, TC-SCRUM-20-09, TC-SCRUM-20-10, TC-SCRUM-20-11, TC-SCRUM-20-12, TC-SCRUM-20-13, TC-SCRUM-20-14 | TC-SCRUM-20-07 explicitly verifies `Active Employees` from `numberOfActiveEmployee` and `Employees Terminated` from `numberOfPastEmployee`. Keyboard activation and account-action loading/failure coverage were removed from the approved test scope. |
| AC-05 | Help control is identifiable and opens the specified destination in a new tab; unavailable destination produces an error toast. | Covered | TC-SCRUM-20-15, TC-SCRUM-20-16 | Normal navigation and external failure are covered. |

**Summary:** 5 ACs covered, 0 ACs blocked.

## Test conditions and techniques

| Condition ID | Source | Condition | Risk | Technique | Coverage limitation |
|---|---|---|---|---|---|
| COND-SCRUM-20-01 | AC-01 | Header content and visual distinction at 1366 × 768 | Missing or misleading navigation context | Equivalence partitioning | Only the approved viewport is in scope. |
| COND-SCRUM-20-02 | AC-01 | Header remains fixed during scrolling | Loss of navigation access on long pages | State transition | Requires a scrollable authenticated page. |
| COND-SCRUM-20-03 | AC-01, AC-03 | Overlong page title and account name | Overlap or hidden controls | Boundary value analysis | The analysis requires ellipsis but does not define an exact character-length boundary. |
| COND-SCRUM-20-04 | AC-02, AC-05 | External destination opens in a new tab or fails to load | Broken or misdirected external navigation | Decision table testing | The exact failure toast is `Failed to load`. |
| COND-SCRUM-20-05 | AC-03, AC-04 | Account identity and menu actions are available | Incorrect account operation or missing action | Equivalence partitioning | Controlled Admin identity and account data are required. |
| COND-SCRUM-20-06 | AC-04 | API-sourced About values render in the popup, including `Active Employees` and `Employees Terminated` field mapping | Incorrect or stale organizational information or swapped employee totals | Decision table testing | TC-SCRUM-20-07 compares `Active Employees` to `numberOfActiveEmployee` and `Employees Terminated` to `numberOfPastEmployee` using the approved endpoint and fixture. |
| COND-SCRUM-20-07 | AC-04 | Employee-total display for live API values in both About fields | Misleading workforce totals or inconsistent field formatting | Boundary value analysis | Zero, 9999, 10001, and 1200000 are each covered for both `Active Employees` (`numberOfActiveEmployee`) and `Employees Terminated` (`numberOfPastEmployee`) using the values currently rendered by the live UI. |
| COND-SCRUM-20-08 | AC-04 | About API value unavailable | Missing failure communication | Error guessing | The approved message is exact: `Data is unavailable to view`. |
| COND-SCRUM-20-09 | AC-04 | Menu and modal dismissal/focus behavior | Keyboard trap or inaccessible workflow | State transition | Requires keyboard and focus-observation capability. |
| COND-SCRUM-20-10 | AC-04 | Account action loading and duplicate prevention | Duplicate requests or stuck controls | State transition | Backend-controlled pending, timeout, and network-failure fixtures are required. |
| COND-SCRUM-20-11 | AC-04 | Account action timeout at 15 seconds and network failure | Indefinite spinner or unclear failure | Boundary value analysis | The exact behavior below and at the 15-second boundary is not separately specified; the approved timeout condition is covered. |
| COND-SCRUM-20-12 | AC-02, AC-04, AC-05 | Keyboard activation of controls | Keyboard-only users cannot complete actions | Error guessing | Accessibility behavior is covered for the keys stated in the analysis. |

## Scenario-to-test-case mapping

| Scenario/Test ID range | Count | Mapping status |
|---|---:|---|
| Remaining SCRUM-20 test cases | 14 | 1:1 between Gherkin scenarios and manual CSV records |

All scenarios have `@SCRUM-20`, `@TC-SCRUM-20-nn`, and priority tags. Existing `@smoke` and `@regression` tags are retained from the existing feature artifact; no new suite tags were added.

## Contradictions and evidence limitations

1. The approved About endpoint and fixture values are documented, but the complete API contract and error schema are not included.
2. Admin credentials are available through the project-approved role-based credential source; secret values must not be stored in test artifacts.
3. External Upgrade and Help sites are third-party destinations. Tests require controlled network failure simulation for deterministic error-toast coverage.
4. The analysis does not define the exact visual styling or text of the error toast beyond requiring an error toast message.

## Clarifications needed

No remaining PO clarifications are recorded for the approved employee-total formatting cases.

## Priority and automation notes

- 13 cases are P1 and 1 case is P2.
- No scenario is marked `@manual`; the analysis provides observable outcomes for all generated cases.
- All cases are automation candidates subject to API, authentication, browser-tab, focus, and network-failure test-fixture availability.
