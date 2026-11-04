# SCRUM-20 – Top Navigation

- **Jira link**: [SCRUM-20](https://selflearning.atlassian.net/browse/SCRUM-20) · **State**: Approved · **Sprint**: SCRUM Sprint 0 · **Analysed**: 2026-11-03 · **Approved**: 2026-11-03
- **Verdict**: Ready for automation and execution

This analysis reflects the final PO-approved clarifications for AC-01 through AC-05, including the confirmed About API contract, external-error-toast behavior, employee-total rendering, and timeout/network-failure handling.

## Acceptance criteria

| AC | Criterion | Testable? | Notes |
|---|---|---|---|
| AC-01 | The authenticated Admin user can see a top navigation header containing the current page title, Upgrade control, and account area in the stated application locations. | Yes | The header shall remain fixed in the viewport while scrolling. The supported viewport is 1366 × 768. Long page titles and account names shall be truncated with an ellipsis. |
| AC-02 | The user can identify and select the Upgrade control, which opens the specified upgrade URL in a new window. | Yes | The icon, label, exact destination, and new-window behavior are measurable. |
| AC-03 | The user can see the authenticated user’s avatar, account name, and a downward arrow in the account area beside Upgrade. | Yes | The expected authenticated identity and adjacency can be verified with controlled user data. |
| AC-04 | The user can open the account menu, see the four named actions, dismiss the menu using the specified interactions, and execute each action. | Yes | Menu contents, dismissal, API-sourced About data and formatting, current-tab navigation, account-action loading and timeout behavior, and logout outcome are testable. The About popup must display `Active Employees` from `numberOfActiveEmployee` and `Employees Terminated` from `numberOfPastEmployee`. |
| AC-05 | The user can identify and select the help control, which opens the specified help URL in a new window. | Yes | The icon, circular background, approximate location, exact destination, and new-window behavior are measurable. |

## AC review findings

- The story is testable because it defines five acceptance criteria, named controls, required menu actions, and exact URLs for external and internal navigation.
- AC-01 is clarified: the header remains fixed in the viewport during scrolling, the supported viewport is 1366 × 768, and overlong page titles and account names use ellipsis truncation.
- AC-02 and AC-05 are clarified: “new window” means a new browser tab.
- AC-04 is clarified: About values are authoritative API data. The About popup displays `Active Employees` from the API field `numberOfActiveEmployee` and `Employees Terminated` from the API field `numberOfPastEmployee`; unavailable About data displays `Data is unavailable to view`; the About popup closes through its `x` icon; Support and Change Password use the current tab; account actions keep the dropdown open or show a loading state until completion.
- AC-04 excludes non-Admin and unauthenticated users from this story’s scope.
- Accessibility behavior is defined for interactive controls: Enter and Space activate buttons; Enter, Space, or Down Arrow on the menu button opens the menu and moves focus to the first menu item; modal focus is trapped; Escape closes the popup immediately.
- If an external Upgrade or Help destination cannot be opened or is unavailable, the system displays an error toast message with the exact text `Failed to load`.
- About employee totals currently render as raw numeric strings in the live UI: `0`, `9999`, `10001`, and `1200000`.
- When an account action starts, its button is disabled and displays a loading indicator. Repeated clicks are blocked. If the API does not respond within 15 seconds, loading ends, the spinner disappears, and the system displays `We are experiencing a temporary delay. Please check your connection and try again.` The same message applies to network failure.

## Scenario decomposition

### Positive scenarios

| ID | Scenario | Expected outcome | Source AC |
|---|---|---|---|
| TC-SCRUM-20-01 | Authenticated Admin opens an application page | The top navigation header is visible across the top of the main application area, to the right of the left sidebar. The current page title appears on the left; Upgrade and the account area appear on the right; the header is visually distinct from page content. | AC-01 |
| TC-SCRUM-20-02 | Admin inspects the Upgrade control | The control is visible on the right side of the header and contains an upgrade-related icon and the label “Upgrade.” | AC-02 |
| TC-SCRUM-20-04 | Admin inspects the account area | The area is adjacent to Upgrade and displays the authenticated user’s avatar, account name, and a downward-pointing arrow. | AC-03 |
| TC-SCRUM-20-05 | Admin opens the account menu | The menu opens and contains About, Support, Change Password, and Logout. | AC-04 |
| TC-SCRUM-20-07 | Admin selects About | The About popup displays the company name, application version, `Active Employees` from `numberOfActiveEmployee`, and `Employees Terminated` from `numberOfPastEmployee`. | AC-04 |
| TC-SCRUM-20-08 | Admin selects About and verifies employee totals | For each approved value, both `Active Employees` (`numberOfActiveEmployee`) and `Employees Terminated` (`numberOfPastEmployee`) display the approved live UI representation. | AC-04 |
| TC-SCRUM-20-09 | Admin selects Logout | The authenticated session ends and the browser navigates to the Login page. | AC-04 |
| TC-SCRUM-20-10 | Admin inspects the help control | A question-mark icon inside a light-colored circular background is visible beneath the orange header toward the right side of the main application area. | AC-05 |
| TC-SCRUM-20-11 | Admin selects the help control | A new browser tab opens at `https://starterhelp.orangehrm.com/hc/en-us`. | AC-05 |

### Negative scenarios

The acceptance criteria define both the About-data failure response and the external-destination failure response. Non-Admin and unauthenticated users are explicitly out of scope for this story.

| ID | Candidate condition | Missing expected behavior | Related AC |
|---|---|---|---|
| TC-SCRUM-20-N01 | API data for the About popup cannot be retrieved or a value is unavailable | The About popup displays `Data is unavailable to view`. | AC-04 |
| TC-SCRUM-20-N02 | An external Upgrade or Help destination is unreachable | The system displays an error toast message with the exact text `Failed to load`. | AC-02, AC-05 |
| TC-SCRUM-20-N03 | The user selects an account action repeatedly before completion | The clicked button becomes disabled immediately, displays a loading indicator, and blocks duplicate clicks. | AC-04 |
| TC-SCRUM-20-N04 | An account-action API request times out after 15 seconds or encounters a network failure | Loading ends, the spinner disappears, and the system displays `We are experiencing a temporary delay. Please check your connection and try again.` | AC-04 |

### Edge cases

| ID | Edge condition | Expected result currently supported | Related AC |
|---|---|---|---|
| TC-SCRUM-20-E01 | User clicks outside an open account menu | The account dropdown closes. | AC-04 |
| TC-SCRUM-20-E02 | User presses Escape while an open account menu is visible | The account dropdown closes. | AC-04 |
| TC-SCRUM-20-E03 | User scrolls a page far enough to move the header from its initial viewport position | The header remains fixed in the viewport at 1366 × 768. | AC-01 |
| TC-SCRUM-20-E04 | Long account name or long current-page title is displayed | The affected text is truncated with an ellipsis and does not overlap adjacent controls. | AC-01, AC-03 |
| TC-SCRUM-20-E05 | About popup displays zero terminated employees or a large employee total | The live UI renders the tested totals as raw numeric strings for both `Active Employees` and `Employees Terminated`: `0`, `9999`, `10001`, and `1200000`. | AC-04 |
| TC-SCRUM-20-E06 | User activates Upgrade or Help repeatedly | Each activation opens a new browser tab. | AC-02, AC-05 |
| TC-SCRUM-20-E07 | User presses Escape or clicks the About popup `x` icon | Escape closes the popup immediately; the `x` icon closes the popup. | AC-04 |
| TC-SCRUM-20-E08 | User opens the account menu using the keyboard | Enter, Space, or Down Arrow opens the menu and immediately moves focus to the first menu item. | AC-04 |
| TC-SCRUM-20-E09 | User activates a button using the keyboard | Enter and Space activate the button. | AC-02, AC-04, AC-05 |
| TC-SCRUM-20-E10 | User opens the About modal and attempts to move focus outside it | Focus remains trapped inside the modal until it is dismissed. | AC-04 |
| TC-SCRUM-20-E11 | Account action remains pending for 15 seconds | The loading state terminates, the spinner disappears, and the specified temporary-delay message is displayed. | AC-04 |

## User Workflow

**Main Workflow**

| Step | Actor | Action | Expected System Behavior | Source AC |
|---|---|---|---|---|
| WF-01 | Admin user | Authenticate and open an application page. | The system displays the top navigation header to the right of the left sidebar. | AC-01 |
| WF-02 | System | Render the header contents. | The current page title appears on the left; Upgrade and the user account area appear on the right; the header is visually distinct from the main content. | AC-01 |
| WF-03 | Admin user | Inspect the account area. | The authenticated user’s avatar and account name are visible, with a downward-pointing arrow indicating a dropdown. | AC-03 |
| WF-04 | Admin user | Select the account area. | The configured account menu opens with About, Support, Change Password, and Logout. | AC-04 |
| WF-05 | Admin user | Select one available account action. | The account dropdown remains open or shows a loading state until the action completes. About opens the About popup with API-sourced data; Support or Change Password navigates in the current tab; Logout ends the session and navigates to Login. | AC-04 |
| WF-06 | Admin user | Select Upgrade. | A new browser tab opens at the specified upgrade URL. | AC-02 |
| WF-07 | Admin user | Select the help control. | A new browser tab opens at the specified help URL. | AC-05 |

**Alternative and Failure Workflows**

WF-A: Dismiss account menu by clicking outside

**Starting condition:** The account menu is open.
1. User action: Click outside the account dropdown.
2. System response: The account dropdown closes.
3. Final state: The account menu is no longer open.

**Related Acceptance Criteria:** AC-04

WF-B: Dismiss account menu with Escape

**Starting condition:** The account menu is open.
1. User action: Press Escape.
2. System response: The account dropdown closes.
3. Final state: The account menu is no longer open.

**Related Acceptance Criteria:** AC-04

WF-C: Header behavior during scrolling

**Starting condition:** The application page contains enough content to scroll.
1. User action: Scroll the page.
2. System response: The header remains fixed in the viewport.
3. Final state: The header remains visible at its fixed position.

**Related Acceptance Criteria:** AC-01

WF-D: About data unavailable

**Starting condition:** The Admin opens the account menu and selects About while the About API cannot retrieve one or more required values.
1. User action: Select About.
2. System response: The About popup displays `Data is unavailable to view`.
3. Final state: The user can dismiss the popup through its `x` icon or Escape; modal focus remains trapped while it is open.

**Related Acceptance Criteria:** AC-04

WF-E: Account action timeout or network failure

**Starting condition:** The account menu is open and an account action request is pending.
1. User action: Select an account action.
2. System response: The selected button immediately becomes disabled and displays a loading indicator. If the API does not respond within 15 seconds, or a network failure occurs, loading terminates and the system displays `We are experiencing a temporary delay. Please check your connection and try again.`.
3. Final state: The user cannot submit the same action repeatedly during the pending request, and the loading spinner is not visible after timeout or failure.

**Related Acceptance Criteria:** AC-04

WF-F: External destination unavailable

**Starting condition:** The Admin selects Upgrade or Help while the destination cannot be opened or is unavailable.
1. User action: Select Upgrade or Help.
2. System response: The system displays an error toast message.
3. Final state: The external navigation failure is communicated to the user through the toast.

**Related Acceptance Criteria:** AC-02, AC-05

No other alternative or failure behavior is specified in the available requirements.

## Open questions for the PO

No open questions remain from the supplied clarifications.

## Assumptions

- The story’s “authenticated Admin user” is the only in-scope persona; non-Admin and unauthenticated behavior is out of scope.
- The exact URLs in the story are authoritative, including path and protocol.
- “Current page title” means the title of the currently displayed application page, not the browser document title, unless the PO clarifies otherwise.
- “New window” means a new browser tab.
- Support and Change Password navigate in the current tab.
- Company name, application version, active employee total, and terminated employee total are authoritative API data.
- The About API endpoint is `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/core/about`.
- The approved About API fixture returns company name `OrangeHRM`, product name `OrangeHRM OS`, version `5.9`, `numberOfActiveEmployee: 147`, and `numberOfPastEmployee: 0`. The UI labels are `Active Employees` and `Employees Terminated`, respectively.
- Unavailable About data produces `Data is unavailable to view`.
- The account menu remains open or shows a loading state until an account action completes.
- Long page titles and account names are truncated with an ellipsis.
- The supplied accessibility behavior applies to the header controls, account menu, and About modal.
- Repeated Upgrade or Help activations each open a new browser tab.
- An unavailable external destination results in an error toast message.
- An account action request has a 15-second timeout; timeout and network failure display the specified temporary-delay message.
- API employee totals use the specified zero, comma-separated, and metric-abbreviation formats.
- Existing authentication and employee records are test-environment dependencies, not functionality delivered by this story.

## Risks

| Risk | Likelihood | Impact | Priority |
|---|---|---|---|
| Conflicting fixed-versus-scrolling requirement produces inconsistent acceptance results. | H | H | P1 |
| External URL availability can cause inconsistent results even though the required failure response is defined. | M | H | P1 |
| API-sourced About values can change during execution and make expected results unstable. | M | M | P2 |
| Loading-state behavior can leave the account menu unusable if the 15-second timeout or failure recovery is not handled. | M | H | P1 |
| Accessibility focus management is complex and can prevent keyboard-only completion if implemented incorrectly. | M | H | P1 |

## Test scope

- **In scope**: Header rendering at 1366 × 768; fixed-on-scroll behavior; ellipsis truncation; current page title; Upgrade control; authenticated account identity; account menu contents, keyboard operation, and dismissal; API-sourced About content and unavailable-data message; About modal focus trapping and dismissal; Support, Change Password, and Logout actions; Help control; exact navigation destinations; new-tab behavior.
- **Out of scope**: Implementation details; authentication implementation; employee-count calculation; external Upgrade and Help site functionality after navigation; Support and Change Password page functionality after arrival; non-Admin and unauthenticated behavior.
- **Test levels**: Unit/component (dev) · API or integration for account/About data and failure state · E2E UI for authenticated workflows, keyboard behavior, modal focus, and navigation · exploratory accessibility testing at 1366 × 768.
- **Test data / environment needs**: An Admin account; a stable authenticated session; a known current-page title; controlled long and normal account names; access to `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/core/about`; the About API fixture with `companyName: OrangeHRM`, `productName: OrangeHRM OS`, `version: 5.9`, `numberOfActiveEmployee: 147`, and `numberOfPastEmployee: 0`; additional API responses for zero, 9999, 10001, and 1200000 to compare against the values currently rendered by the live UI; API timeout and network-failure fixtures; external destination failure fixtures; at least one scrollable page; browser support for observing new tabs; network access to the three specified destinations.
- **Dependencies**: Authentication and authorization; left navigation and main application layout; account/profile data; About statistics service; routing for Support and Change Password; logout/session invalidation; browser popup/new-context handling; availability of external URLs.
