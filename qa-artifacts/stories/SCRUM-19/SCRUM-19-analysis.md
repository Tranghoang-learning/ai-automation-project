# SCRUM-19 – Left navigation

- **ADO link**: https://selflearning.atlassian.net/browse/SCRUM-19 · **State**: To Do · **Sprint**: Not specified · **Analysed**: 2026-10-28
- **Verdict**: Blocked

## Acceptance criteria
| AC | Criterion | Testable? | Notes |
|---|---|---|---|
| AC-01 | Display the expanded sidebar on the Dashboard, including OrangeHRM branding, vertically ordered navigation controls, icons and labels, visual separation, and a collapse control. | Yes | Relative position and visual separation require a defined viewport/layout reference. |
| AC-02 | Display the 13 specified navigation items in exact order, with icons and labels; separate Search by a horizontal divider. | Yes | Item destination and exact icon design must match the application specification. |
| AC-03 | Navigate from each available item to its destination and synchronize navigation/authentication state. | Partly | Available/authorized items and each destination are not listed; unauthorized behavior is not specified. |
| AC-04 | Highlight the Dashboard item on Dashboard and keep the active item synchronized with the displayed page. | Yes | Parent and alias page behavior is not specified. |
| AC-05 | Provide collapse/expand controls while preserving usable content and resizing the main area. | Partly | “if supported” makes collapse/expand optional, and persistence/default state are unspecified. |
| AC-06 | Provide live sidebar Search that updates as the user types or deletes text, shows matching items, and restores/clears results according to input. | Partly | Search matching rules, default state, result presentation, and stale-response behavior are undefined. |

## User Workflow
**Main Workflow**

| Step | Actor | Action | Expected System Behavior | Source AC |
|---|---|---|---|---|
| WF-01 | Admin user | Sign in and open Dashboard. | The expanded left sidebar is present on the left edge of the application content area. | AC-01 |
| WF-02 | System | Render the sidebar header. | The OrangeHRM logo and collapse control are displayed. | AC-01 |
| WF-03 | System | Render the navigation list. | Search and the remaining menu items appear vertically in the specified order. | AC-01, AC-02 |
| WF-04 | System | Render each navigation item. | The corresponding icon and text label are displayed. | AC-01, AC-02 |
| WF-05 | System | Render navigation separation. | A horizontal divider separates Search from the remaining items. | AC-02, AC-06 |
| WF-06 | Admin user | Select an available navigation item. | The system opens its associated destination and applies authentication and authorization rules. | AC-03 |
| WF-07 | System | Complete destination navigation. | The navigation item corresponding to the displayed page is visually active. | AC-03, AC-04 |
| WF-08 | Admin user | Activate the displayed collapse control. | When collapse behavior is supported, the sidebar enters the collapsed state; otherwise no behavior is specified. | AC-05 |
| WF-09 | Admin user | Activate the expand control in the collapsed state. | When expand behavior is supported, the sidebar returns to the expanded state; otherwise no behavior is specified. | AC-05 |
| WF-10 | System | Change sidebar display state. | Essential main-content area is not obscured, and main content accommodates the current sidebar state. | AC-05 |
| WF-11 | Admin user | Enter text in Search. | Matching menu items are updated for every character entry, modification, or deletion and the latest input determines the displayed match. | AC-06 |
| WF-12 | Admin user | Clear Search. | Previous results are cleared and the navigation list is restored to the default all-items state according to defined behavior. | AC-06 |
| WF-13 | Admin user | Enter a keyword with no matches. | The exact text “no result found” is displayed. | AC-06 |

**Alternative and Failure Workflows**

WF-A: Unauthorized destination navigation

**Starting condition:** The selected navigation item requires authorization not granted to the current Admin user.
1. User action: Select the navigation item.
2. System response: Authentication and authorization rules are applied to the destination; the resulting rejection behavior is not specified.
3. Final state: The active item must remain consistent with the page actually displayed.

**Related Acceptance Criteria:** AC-03, AC-04

WF-B: Collapse state unsupported

**Starting condition:** The sidebar collapse behavior is not supported by the application.
1. User action: Look for or activate the collapse control.
2. System response: AC-05 states that collapse is conditional on application support, but does not define behavior when support is absent.
3. Final state: Not specified in the available requirements.

**Related Acceptance Criteria:** AC-05

WF-C: Search input produces matches, no matches, or is cleared

**Starting condition:** The sidebar is expanded and Search is available.
1. User action: Enter a keyword, modify or delete characters, or clear the field.
2. System response: Search results update for the latest input; a no-match state displays “no result found”; clearing restores/clears results according to the application's defined behavior.
3. Final state: Search remains available for continued typing.

**Related Acceptance Criteria:** AC-06

WF-D: Search state cannot be reset unambiguously

**Starting condition:** Search is cleared while previous results are displayed.
1. User action: Clear the Search field.
2. System response: AC-06 permits either clearing results or restoring default state and also requires all items to display again; the explicit precedence is ambiguous.
3. Final state: Not uniquely defined in the available requirements.

**Related Acceptance Criteria:** AC-06

## Positive scenarios

1. **Authenticated Dashboard display:** With an authenticated Admin on Dashboard, the sidebar appears on the left edge, contains the logo, uses vertical navigation items with icons and labels, is visually separate from content, and has an expanded-state collapse control.
2. **Exact navigation order:** The sidebar lists Search, Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, and Buzz in that exact order.
3. **Direct navigation:** Selecting an available item opens its associated page, applies authorization, and highlights the corresponding active item.
4. **Dashboard active state:** Dashboard is highlighted only while Dashboard is the displayed page.
5. **Collapse and expand:** When supported, activating collapse minimizes the sidebar and activating the expand control restores it without obscuring essential content.
6. **Responsive layout:** Changing between expanded and collapsed states adjusts the main content area to the sidebar's current state.
7. **Live Search:** Entering, changing, deleting, or clearing characters updates the menu search according to the latest input without a button or Enter key.
8. **No-search-results state:** A keyword with no matching item displays “no result found” and Search remains editable.
9. **Search reset:** Clearing a non-empty query restores the full navigation item list and allows another search.

## Negative scenarios

1. **Unavailable destination:** Selecting a navigation item that is unavailable or unauthorized must have the destination protected by authentication and authorization rules; the required rejection behavior is unspecified.
2. **No matching Search result:** Entering a value that matches no configured menu item displays the exact message “no result found”.
3. **Empty Search query:** Clearing Search must produce a deterministic full-list or default-list state; the current criteria conflict on whether default results are cleared only or restored.
4. **Unsupported collapse behavior:** If collapse or expansion is not supported, AC-05 does not define whether controls must be omitted or remain disabled.

## Edge cases

1. Search input at each character, including the first character, removal of the final character, and multiple rapid edits.
2. Search keywords that match one, multiple, or zero item labels.
3. Case sensitivity, partial labels, whitespace-only input, leading/trailing spaces, and special characters; matching rules are unspecified.
4. Long item lists or labels and viewport sizes where sidebar/main-content overlap could occur; exact layout constraints are unspecified.
5. Repeated collapse/expand activation and navigation while collapsed.
6. Browser navigation/back/forward or page refresh during sidebar interactions; persistence and state restoration are unspecified.

## Open questions for the PO
1. [AC-03/AC-04] Which navigation items are available to the Admin role, and what are their exact destination routes and page identifiers?
2. [AC-03] Which page and UI state must be shown when an authenticated Admin lacks authorization for a destination?
3. [AC-04] How must nested pages, redirected pages, and pages sharing a route update their active navigation item?
4. [AC-05] Is sidebar collapse/expand mandatory for this release, or conditional and feature-enabled per deployment?
5. [AC-05] Which sidebar state is the default, and is the state persisted across navigation, refresh, or sign-out/sign-in?
6. [AC-05] What minimum viewport or responsive breakpoints trigger a specific sidebar layout, and when does it overlap essential content?
7. [AC-06] Does Search filter navigation items or search application pages/keywords differently?
8. [AC-06] Which matching rules apply: case sensitivity, partial match, exact match, token match, and trimming of whitespace?
9. [AC-06] When Search is cleared, must results be cleared and then default to all items, or restored directly to the default state?
10. [AC-06] May the UI display a second results container, or must matching items replace the normal navigation list in place?
11. [AC-06] What exact timing or debounce is permitted for live Search updates, and must rapid input always show only the latest-input result?
12. [AC-06] Must the error message be shown in the existing application language/locale exactly as “no result found”?
13. [AC-01/AC-02] Which accessibility requirements apply to the sidebar and Search control (keyboard operation, focus, screen-reader labels)?

## Assumptions
- The target application uses the OrangeHRM Demo web UI and the story's “Admin user” is authenticated before the sidebar workflow begins.
- “Available navigation items” means items that are rendered and permitted by the current user's authorization.
- The navigation order and labels in AC-02 are authoritative for this story.
- Search applies to the sidebar navigation items unless PO clarification identifies another configured search behavior.

## Risks
| Risk | Likelihood | Impact | Priority |
|---|---|---|---|
| Optional collapse/expand behavior produces inconsistent implementation and untestable controls. | H | H | P1 |
| Search behavior is interpreted as global application search rather than navigation-item filtering. | H | H | P1 |
| Cleared Search has two potentially different UI outcomes in AC-06. | H | H | P1 |
| Destination and authorization rules are not linked to each menu item. | H | H | P1 |
| Active-item synchronization is unclear for nested, redirected, or shared routes. | M | H | P1 |
| Layout requirements lack viewport and overlap measurements. | M | H | P1 |
| Live Search has no measurable debounce or matching-rule definition. | H | M | P2 |

## Test scope
- **In scope**: Dashboard sidebar display, navigation-item order and presentation, menu navigation, active state, role authorization, collapse/expand behavior, responsive layout, and sidebar Search behavior.
- **Out of scope**: server implementation, non-sidebar application features, exact visual design outside story criteria, and authorization policy definitions not supplied by this story.
- **Test levels**: unit (dev) · API · E2E · exploratory
- **Test data / environment needs**: Authenticated Admin account; application account with authorized and unauthorized menu destinations; desktop and supported responsive viewport sizes; stable OrangeHRM demo environment.
- **Dependencies**: Destination routes/pages, role authorization configuration, orangeHRM UI implementation, defined Search matching rules, responsive layout breakpoints, and sidebar feature configuration.
