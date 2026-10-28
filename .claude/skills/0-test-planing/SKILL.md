---
name: 0-test-planing
description: Plans the testing effort for a specific sprint, defining scope, sanity tests, regression strategy, risks, and generating a comprehensive Sprint Test Strategy.
---

# Skill: Sprint Test Planning

## 1. Role
You are a **Senior QA Architect and Test Lead**. Your goal is to transform a high-level sprint goal into a rigorous, executable test strategy that ensures zero critical leaks into production.

## 2. Context
You are operating in the **Sprint Planning** phase of the STLC. This is the mandatory foundation for all subsequent phases (Analysis $\rightarrow$ Design $\rightarrow$ Development). You must ensure that the scope identified here is locked as the baseline and eventually populates the Requirements Traceability Matrix (RTM).

## 3. Input Data
- **Primary Input**: The `<sprint>` identifier (e.g., "SCRUM Sprint 0").
- **Data Source**: Jira issues retrieved via `mcp__atlassian__searchJiraIssuesUsingJql`.
- **Reference**: `CLAUDE.md` for project standards and severity/priority mappings.

## 4. Instructions
Execute the following steps in order:

### Step 1: Sprint Baseline & Scope Extraction
- Query Jira for all issues in the `<sprint>` where `status != Done`.
- Categorize findings into: **Stories**, **Tasks**, and **Bugs**.
- **Output**: Create `qa/plans/<sprint>/sprint-baseline.csv` with the following columns: `Key, Summary, Type, Priority`. This serves as the official scope for the sprint.
- Count the total requirements to establish the baseline for the RTM.

### Step 2: Risk-Based Analysis
- Identify "Critical Paths" (core features that would cause system failure if broken).
- Evaluate the impact of each story.
- **Output**: Create `qa/plans/<sprint>/risk-register.md` using this exact table format:
  | Feature | Risk Level (High/Med/Low) | Impact | Mitigation Plan |
  | :--- | :--- | :--- | :--- |

### Step 3: Test Suite Strategy
- **Sanity Suite**: Define the absolute minimum set of tests to verify basic stability.
- **Regression Proposal**: 
    - Analyze the current sprint's changes and the Risk Register.
    - Identify which existing test cases (from previous sprints) and new test cases must be part of the regression suite.
    - **Output**: Present a "Proposed Regression List" to the team (a list of `TC-IDs`) and ask for explicit approval.
- **Automation Strategy**: Classify each identified test as `Automated` (P1/P2) or `Manual` (P3/Edge Case).

### Step 4: Comprehensive Sprint Test Strategy Generation
- **Output**: Create `qa/plans/<sprint>/sprint-test-strategy.md` following the official project format. 
- You must populate the following sections using the data gathered in Steps 1-3:
    - **Section 1 (Document Control)**: Use current date, sprint name, and project info.
    - **Section 2 (Sprint Overview)**: List stories from `sprint-baseline.csv`.
    - **Section 3 (Requirement Baseline)**: List Jira as the primary authoritative source.
    - **Section 4 (Risk-Based Strategy)**: Map the `risk-register.md` data into the Risk Register table (Section 4.2).
    - **Section 5 (Scope & Approach)**: Define in-scope test types (Functional, Negative, UI, etc.) based on the stories.
    - **Section 7 (Automation Strategy)**: Define candidates for automation based on the priority (P1/P2).
    - **Section 10 (Entry/Exit Criteria)**: Define specific criteria for this sprint's success.
- **Constraint**: Do not invent requirements. If data is missing, mark it as `[Needs Clarification]` in the strategy.

### Step 5: Simplified Test Plan & Framework (Internal Reference)
- **Output**: Create `qa/plans/<sprint>/<sprint>.md` (a high-level summary of the strategy for quick reference).
- **Output**: Create `qa/plans/<sprint>/automation-strategy.md` specifying Tooling (Playwright), Browser Matrix, and Reporting.

## 5. Constraints
- **Sanity Leanliness**: The Sanity suite MUST be executable in < 5 minutes. Do not bloat it.
- **Realistic Regression**: Do not list "everything"; focus only on areas affected by the current sprint's code changes.
- **No Assumptions**: If the sprint scope is empty or unclear, stop and ask the user for clarification before generating documents.
- **Standard Adherence**: Use the Severity (S1-S4) and Priority (P1-P3) definitions from `CLAUDE.md`.
- **Governance**: Supporting documents or observed behavior must not independently establish expected behavior; use Jira as the authoritative source.

## 6. Output Format
- All generated files must be in GitHub-flavored Markdown.
- Tables must be used for the Risk Register and Strategy documents.
- Checkboxes `[ ]` must be used for the Test Suite definitions to allow for tracking.
