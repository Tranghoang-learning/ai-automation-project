# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Playwright test automation project** using TypeScript. It's configured for cross-browser testing (Chromium, Firefox, WebKit) with GitHub Actions CI.

## STLC Workflow

The project follows a structured Software Testing Life Cycle (STLC). Use the following skills in order:

| Phase | Skill/Command | Output |
| :--- | :--- | :--- |
| **Sprint Planning** | `/0-test-planing <sprint>` $\rightarrow$ `/tag-regression <TCS>` | `qa/plans/`, `risk-register.md`, `automation-strategy.md` |
| **Reqs Analysis** | `/1-analyze-story <KEY>` | `qa/stories/<KEY>/<KEY>.md`, `qa/rtm.csv` |
| **Test Design** | `/2-test-case-generator <KEY>` | `features/<KEY>*.feature`, `qa/stories/<KEY>/manual-test-cases.csv` |
| **Develop Scripts**| `/3-automation-developer <KEY>`| `pages/`, `tests/*.spec.ts` (tagged with `@<KEY>`) |
| **Test Execution** | `npm run test:story -- @<KEY>`| `playwright-report/` |
| **Test Analysis** | `failure-triager` agent | `qa/reports/<KEY>-triage.md` |
| **Test Reporting** | `/4-test-report <KEY/sprint>` | `qa/reports/<KEY/sprint>.md`, `qa/rtm.csv` (Updated) |
| **Fixing** | `/bug-report` $\rightarrow$ `/retest` | Jira Bug, `qa/bugs/<KEY>.md` |
| **Test Closure** | `/5-test-closure <sprint>` | `qa/closure/<sprint>.md` |

**Note:** Sprint Planning must be completed and approved before starting Reqs Analysis for any story in the current sprint.

## Specialized Agents

- **`test-design-reviewer`**: Audits test cases for AC coverage and edge cases.
- **`automation-reviewer`**: Enforces POM adherence and accessibility-first locators.
- **`failure-triager`**: Categorizes failures as BUG, FLAKE, or ENV to reduce pipeline noise.

## Conventions

- **IDs**: 
  - Story = Jira key (`QA-12`)
  - Acceptance Criterion = `AC-<n>`
  - Test Case = `TC-<key>-<nn>` (e.g., `TC-QA-12-03`)
  - Bug = Jira key, or `BUG-<slug>` before it's filed.
- **Tagging**: Every scenario and spec is tagged: `@<KEY> @TC-<key>-<nn> @P1|@P2|@P3` and `@smoke` or `@regression`.
- **Naming**: Spec titles start with the TC id: `test('TC-QA-12-02 rejects an empty title', ...)`.
- **Git**: Branches and PRs include the Jira key (`QA-12-add-filter-tests`) so Jira links them.
- **Locators**: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`. No CSS/XPath chains, no `waitForTimeout`.
- **Data**: Test data from fixtures or `.env`; never hard-code secrets. Never edit `.env*`, `playwright/.auth/` or `*-snapshots/` baselines (a hook blocks it).

## Severity vs Priority

- **Severity** (impact): 
  - S1 Critical – data loss/security/system down, no workaround
  - S2 Major – core feature broken
  - S3 Minor – easy workaround
  - S4 Trivial – cosmetic.
- **Priority** (urgency): 
  - P1 fix this sprint, blocks release
  - P2 this sprint if capacity
  - P3 backlog. 
- **Mapping**: Map to Jira priority Highest/High/Medium/Low.

## Definition of Done (QA view)

- Every AC has ≥1 test case in `qa/rtm.csv`; P1 cases are automated.
- All P1/P2 tests pass in CI; no open S1/S2 bugs on the story.
- Regression suite green on the sprint's main branch.

## Common Commands

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps

# Run all tests
npm test

# Run tests for a specific story/key
npm run test:story -- @SCRUM-2

# Run tests in headed mode
npx playwright test --headed

# Run a specific test file
npx playwright test tests/example.spec.ts

# Show test report
npx playwright show-report
```

## Project Structure

```
ai-automation-project/
├── .github/workflows/playwright.yml  # CI pipeline
├── .claude/skills/                   # Custom STLC skills
├── .claude/agents/                   # Specialized agent personas
├── fixtures/                         # Test fixtures
├── pages/                            # Page Object Model classes
├── tests/                            # Test files (tagged with @KEY)
├── features/                         # Gherkin .feature files
├── qa/                               # QA Documentation
│   ├── plans/                        # Sprint test plans
│   ├── stories/                      # Story folders (Analysis & Manual Tests)
│   ├── reports/                      # Execution & Triage reports
│   ├── bugs/                          # Bug documentation
│   └── closure/                      # Closure reports
│   └── rtm.csv                      # Requirements Traceability Matrix
├── playwright.config.ts             # Playwright configuration
└── package.json                     # Dependencies and scripts
```

## Test Architecture & Standards

- **Test runner**: Playwright Test (`@playwright/test`)
- **Language**: TypeScript (CommonJS)
- **Tagging**: Every test must include the `@<KEY>` tag in its title for targeted execution.
- **Locator Strategy**: **Accessibility-first**. Use `getByRole()`, `getByLabel()`, `getByPlaceholder()`, `getByText()`, and `getByTestId()`. Avoid CSS/XPath.
- **POM Adherence**: 
    - `pages/`: Interaction logic and locators.
    - `tests/`: High-level business flows and assertions.
- **Assertions**: Use web-first assertions (e.g., `expect(locator).toBeVisible()`).
- **Prohibited**: `page.waitForTimeout()` is strictly forbidden.

## Naming Convention

Use the following convention:
<feature>[.<sub-feature>].spec.ts

- feature: The primary business feature or functional area under test.
- sub-feature: An optional qualifier identifying a distinct workflow or behavior.
- .spec.ts: The required file suffix for Playwright TypeScript test files.
- Use lowercase kebab-case for feature and sub-feature names.

**Examples:**
- login.spec.ts
- login.validation.spec.ts
- forgot-password.spec.ts
- dashboard.widgets.spec.ts
- employee-management.create-employee.spec.ts