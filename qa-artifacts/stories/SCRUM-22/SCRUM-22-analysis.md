# SCRUM-22 – Display Application Footer

- **ADO link**: https://selflearning.atlassian.net/browse/SCRUM-22 · **State**: In Progress · **Sprint**: Not specified · **Analysed**: 2026-10-28
- **Verdict**: Blocked

## Acceptance criteria
| AC | Criterion | Testable? | Notes |
|---|---|---|---|
| AC-01 | Display a visually distinct footer on shared-layout authenticated pages, without covering content; keep it reachable at page bottom and at viewport bottom on short pages. | Partly | “pages that use the shared layout” is not enumerated, and footer positioning is not defined for long pages or variable viewports. |
| AC-02 | Display the exact product/version text `OrangeHRM OS 5.9` and keep it consistent with the application release across shared-layout pages. | Partly | Exact runtime source of the version and behavior if release data differs are unspecified. |
| AC-03 | Display the release-appropriate copyright `© 2005 - 2026 OrangeHRM, Inc.`, with readable consistent presentation across shared-layout pages. | Partly | “Applicable application release” does not define the rule for changing the copyright year or version by release. |

## User Workflow
**Main Workflow**

| Step | Actor | Action | Expected System Behavior | Source AC |
|---|---|---|---|---|
| WF-01 | Authenticated Admin | Sign in and open an authenticated page that uses the shared application layout. | The shared-layout page displays the footer in its designated lower page area. | AC-01 |
| WF-02 | Authenticated Admin | Scroll down a page with content taller than the viewport. | The footer remains accessible after reaching the bottom of the page. | AC-01 |
| WF-03 | Authenticated Admin | Open a short shared-layout page. | The footer is positioned at the bottom of the viewport. | AC-01 |
| WF-04 | System | Render the footer. | The footer is visually distinguishable from main content and does not obscure or overlap essential content. | AC-01 |
| WF-05 | Authenticated Admin | Review the footer. | The exact product name and version are displayed as `OrangeHRM OS 5.9`. | AC-02 |
| WF-06 | Authenticated Admin | Navigate among shared-layout pages. | The displayed product name, version, and copyright remain consistent with the same application release. | AC-02, AC-03 |
| WF-07 | Authenticated Admin | Review the copyright text. | The exact notice `© 2005 - 2026 OrangeHRM, Inc.` is displayed and is readable and visually distinguishable. | AC-03 |

**Alternative and Failure Workflows**

WF-A: Unauthenticated page access

**Starting condition:** A signed-out or unauthenticated user opens a page that normally uses the application shared layout.
1. User action: Open the page or attempt to continue navigation.
2. System response: The Login page must render the application footer, including the application version and copyright notice.
3. Final state: Authentication redirect or current page behavior remains subject to the application's existing authentication rules; those rules are not specified in this story.

**Related Acceptance Criteria:** AC-01

WF-B: Page does not use the shared layout

**Starting condition:** An authenticated user opens a page excluded from the shared application layout.
1. User action: Open the page.
2. System response: Footer behavior is not specified for layouts that do not use the shared layout.
3. Final state: The page remains governed by requirements outside the available story.

**Related Acceptance Criteria:** AC-01

WF-C: Version or copyright metadata is unavailable

**Starting condition:** Runtime release metadata cannot be read while rendering a shared-layout authenticated page.
1. User action: Open the page.
2. System response: Fallback text, retry behavior, and error presentation are not specified in the story.
3. Final state: Not specified in the available requirements.

**Related Acceptance Criteria:** AC-02, AC-03

## Positive scenarios

1. **Authenticated shared-layout footer:** An authenticated Admin opens each shared-layout page and the footer is present below visually separate main content without overlapping controls or information.
2. **Footer on scrolled long page:** On a page taller than the viewport, the footer remains accessible by scrolling to the end of the page and is not obscured by fixed page elements.
3. **Footer on short page:** On a shared-layout page shorter than the viewport, the footer is positioned at the bottom of the viewport.
4. **Application version:** The footer displays exactly `OrangeHRM OS 5.9` from the deployed application's release metadata.
5. **Version consistency:** The same application version text is displayed on representative shared-layout pages in one release.
6. **Copyright notice:** The footer displays exactly `© 2005 - 2026 OrangeHRM, Inc.` in the applicable release and uses text that remains readable against the footer background.
7. **Copyright consistency:** The same copyright notice is displayed consistently on representative shared-layout pages in one release.

## Negative scenarios

1. **Footer on the Login page:** A signed-out user opening the Login page must see the application version and copyright notice in the footer.
2. **Footer obscuring content:** Footer rendering must not overlap, cover, or disable any essential page control, form, table, or text.
3. **Unauthorized footer rendering:** Footer rendering must not itself bypass, change, or weaken the application's existing authentication rules.
4. **Incorrect release metadata:** The UI must not display a version or copyright value that conflicts with the known deployed release; fallback behavior is unspecified and requires clarification.

## Edge cases

1. Shared-layout pages with no body content and with minimal content.
2. Shared-layout pages substantially taller than the viewport.
3. Desktop, tablet, and mobile viewport widths where the footer text may wrap.
4. Browser zoom levels that increase effective layout height.
5. Long application page content combined with fixed headers or side navigation.
6. Navigation from short pages to long pages and back without a reload where footer position must remain correct.
7. Browser display without JavaScript affecting footer rendering, if application rendering supports this mode.
8. Applied product theme or contrast settings that affect footer distinguishability and readability.
9. Release changes where the copyright year, product name, or version differs; the current story defines only the example `OrangeHRM OS 5.9` and `© 2005 - 2026` values.

## Open questions for the PO
1. [AC-01] Which pages use the shared application layout, and which routes are explicitly excluded or unauthenticated?
2. [AC-01] What exact positioning is required on long pages: normal document-flow footer, sticky footer, or another behavior?
3. [AC-01] What minimum contrast ratio, visual separator, spacing, and footer height are required for the footer to be considered visually distinguishable?
4. [AC-01] Which browser and viewport breakpoints are supported for responsive footer positioning and text wrapping?
5. [AC-02] Which application field or runtime configuration is the authoritative source of product name and version?
6. [AC-02] Must the footer always display `OrangeHRM OS 5.9`, or must the numeric version change for each application release?
7. [AC-03] Which copyright value is required for releases other than the stated `© 2005 - 2026 OrangeHRM, Inc.` value?
8. [AC-03] Is the copyright notice derived from release metadata, or must it remain fixed as specified?
9. [ACs 02-03] What behavior is required when release metadata is missing, delayed, malformed, or unavailable?
10. [ACs 01-03] Does the footer render in read-only or modal states, print/PDF output, and background pages not reachable through normal navigation?

## Assumptions
- The authenticated Admin role is representative of all authorized roles using the shared application layout unless the story or application routing grants different layout access.
- Shared-layout pages include the application's normal authenticated routes; this list must be verified before test design.
- `OrangeHRM OS 5.9` and `© 2005 - 2026 OrangeHRM, Inc.` are the expected values for the application release described by this story unless release metadata is explicitly defined.
- “Bottom of the viewport on short pages” means that no essential main-content area is added below the footer and document height remains at least the viewport height.

## Risks
| Risk | Likelihood | Impact | Priority |
|---|---|---|---|
| Page list for shared-layout coverage is not complete. | High | High | P1 |
| Footer overlap or unreadable text varies by responsive viewport. | High | Medium | P2 |
| Runtime version source may not match the deployed release. | Medium | High | P1 |
| Copyright requirement may be release-dependent but is not defined. | Medium | High | P1 |
| Footer behavior in unauthorized/authenticated states may be inconsistent with routing. | Medium | High | P1 |
| Fixed footer positioning may obscure controls on long pages. | Medium | High | P1 |

## Test scope
- **In scope**: Footer presence, shared-layout page coverage, authenticated-only rendering, visual separation, short-page viewport positioning, long-page scroll accessibility, content non-overlap, product/version text, copyright text, consistency across representative pages, responsive layouts, and release metadata.
- **Out of scope**: Footer design outside shared-layout pages, authentication implementation, route authorization rules, application release packaging, and API implementation details not described in the story.
- **Test levels**: Unit · API/data-source verification · Component/UI · E2E · exploratory · visual/responsive testing
- **Test data / environment needs**: Authenticated users and representative shared-layout pages for short and long content; a deployed build whose release version is known; signed-out access; representative desktop/mobile viewport sizes; known and unavailable release metadata if supported.
- **Dependencies**: Shared-layout route inventory, authoritative release metadata, browser matrix, product/version source, and approved footer visual design.
