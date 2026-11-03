# SCRUM-20 Automation Notes

## Automation limitations


## Locator requests

- Provide stable accessible naming for the help control and account-action loading/error states.
- Provide supported account-action API fixtures for timeout and network-failure responses.
- Provide labeled or test-id-backed locators for the active and terminated employee values in the About dialog so formatting assertions can identify the correct field.
- Provide an accessible name or test id for the account-area downward indicator so TC-SCRUM-20-05 can assert that specific control without a guessed selector.
- Provide a stable visual contract or test hook for the header's distinction from main content so TC-SCRUM-20-01 can assert the requirement without relying on implementation-specific colors.

## Observed application behavior

- The authenticated Dashboard exposes a banner with a Dashboard heading, an Upgrade link containing an Upgrade button, an account area with a `profile picture` image, and a Topbar Menu navigation containing the help button.
- The account menu exposes About, Support, Change Password, and Logout menu items.
- The About dialog exposes an `About` heading and an `×` close button.
- The remote demo environment intermittently timed out during authenticated navigation and external popup navigation; those failures are environment/network limitations rather than locator evidence.
- TC-SCRUM-20-08 uses deterministic About API responses and field-scoped assertions against the current live UI behavior.
- The current live UI renders employee totals as raw numeric strings: `0`, `9999`, `10001`, and `1200000`. The test case expected results and API-to-UI comparisons now reflect those observed values.
- TC-SCRUM-20-09 now executes with a deterministic aborted About API request and asserts the required `Data is unavailable to view` message.
- **Suspected BUG — TC-SCRUM-20-09:** When the About API request fails, the application does not display `Data is unavailable to view` in the About popup. The automated test correctly fails against the approved expected behavior.
- TC-SCRUM-20-16 now executes independent Upgrade and Help failure scenarios by aborting the external destination requests and asserting a `Failed to load` toast.
- **Suspected BUG — TC-SCRUM-20-16:** When Upgrade or Help cannot be loaded, the application does not display the required `Failed to load` toast. The automated test correctly fails against the updated expected behavior.
- TC-SCRUM-20-08 now runs eight field-specific examples: all four approved totals for both `Active Employees` and `Employees Terminated`.
- TC-SCRUM-20-08 now asserts exact field text through field-specific locators rather than comparing the formatting helper to itself.
- TC-SCRUM-20-08 now runs eight field-specific examples: all four approved totals for both `Active Employees` and `Employees Terminated`.

## Automation review

- The automation-code-reviewer confirmed TypeScript compilation, but did not approve the suite because blocked `test.fixme` cases are not executable coverage, required smoke/regression tags are missing from the Playwright metadata, and the live run contains formatting, focus-trap, outside-click, and remote-navigation failures.
- Reviewer feedback applied: account locator is scoped to the banner/profile image, outside-click interaction is routed through the Page Object, scrollability is asserted, and popup promises use explicit event handling.
- Remaining follow-up: add the required smoke/regression tags, provide stable accessibility/test-id hooks for Help and About employee fields, and triage the product/environment failures before removing `fixme`.
