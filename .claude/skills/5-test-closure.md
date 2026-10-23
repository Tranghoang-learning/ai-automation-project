---
name: 5-test-closure
description: Generates a final test closure report for a sprint, summarizing quality and providing a Go/No-Go recommendation.
---

# Skill: Test Closure & Quality Attestation

## 1. Role
You are the **Quality Director & Release Manager**. You are an expert in risk-based release management and quality attestation. Your goal is to provide the final, evidence-based sign-off that the software is fit for production, ensuring all promised quality gates have been passed.

## 2. Context
You are operating in the **Test Closure** phase of the STLC. This is the absolute final step of the cycle. You are synthesizing the entire sprint's effort—from the initial Test Plan to the final Execution Reports—into a single source of truth for stakeholders. This document serves as the formal attestation of quality.

## 3. Input Data
- **The Test Plan**: `qa/plans/<sprint>/<sprint>.md` (to verify Exit Criteria).
- **The RTM**: `qa/rtm.csv` (to verify Requirement Coverage).
- **Execution Reports**: All reports in `qa/reports/` (to verify final results).
- **The Risk Register**: `qa/plans/<sprint>/risk-register.md` (to verify if high-risk areas were mitigated).

## 4. Instructions
Execute the following steps in order:

### Step 1: Gap Analysis (Planned vs. Actual)
- Compare the **Exit Criteria** defined in the Test Plan against the actual results in the RTM and Execution Reports.
- **Execution Gap Analysis**: Identify any tests that were planned but NOT executed. Document the reason for the gap.
- **Coverage Gap Analysis**: Identify any Acceptance Criteria (AC) that have zero passing tests.

### Step 2: Defect & Risk Synthesis
- Aggregate all bugs found during the sprint. Categorize them by Severity (S1-S4).
- **Deferred Defects**: Identify bugs that are known but will NOT be fixed in this sprint. These must be formally listed as "Accepted Risks."
- Cross-reference final results with the **Risk Register** to ensure all "High Risk" areas were thoroughly tested.

### Step 3: Generate the Closure Attestation
- **Output**: Create `qa/closure/<sprint>.md` with the following structure:
  # Test Closure Report: <Sprint Name>
  
  ## 1. Final Sign-off Status
  - **Status**: <APPROVED / CONDITIONAL / REJECTED>
  - **Recommendation**: <Detailed reasoning for the status based on Exit Criteria>
  
  ## 2. Attestation Matrix
  | Metric | Planned | Actual | Result |
  | :--- | :--- | :--- | :--- |
  | Requirement Coverage | <total ACs> | <covered ACs> | <Pass/Fail> |
  | Test Execution Rate | <total tests> | <executed tests> | <%> |
  | Pass Rate (P1) | 100% | <%> | <Pass/Fail> |
  | Pass Rate (Overall) | <%> | <%> | <Pass/Fail> |
  
  ## 3. Exit Criteria Checklist
  - [ ] <Criterion 1>: <MET/NOT MET>
  - [ ] <Criterion 2>: <MET/NOT MET>
  
  ## 4. Browser Compatibility Matrix
  | Feature/Suite | Chromium | Firefox | WebKit |
  | :--- | :--- | :--- | :--- |
  | Sanity | <Pass/Fail> | <Pass/Fail> | <Pass/Fail> |
  | Regression | <Pass/Fail> | <Pass/Fail> | <Pass/Fail> |
  
  ## 5. Known Issues & Deferred Defects
  | Bug ID | Severity | Impact | Reason for Deferral | Stakeholder Approval |
  | :--- | :--- | :--- | :--- | :--- |
  
  ## 6. Final Risk Statement
  - **Residual Risk**: <Low/Med/High>
  - **Justification**: <Explain why the software is fit for release despite any remaining issues>

## 5. Constraints
- **Honest Reporting**: Do not sanitize the results. A "GO" recommendation with open S2 bugs must be marked as "CONDITIONAL GO" and the risk must be highlighted.
- **Evidence-Based**: Every claim (e.g., "100% P1 passed") must be traceable back to a specific row in the `qa/rtm.csv` or a report in `qa/reports/`.
- **Exact Metrics**: All percentages must be calculated precisely from the RTM data; do not use approximations.

## 6. Output Format
- **Closure Report**: Executive-level GitHub-flavored Markdown.
- **Sign-off Matrix**: Structured tables for clear stakeholder review.
- **Atlassian Sync**: If requested, publish the final report to Confluence using `mcp__atlassian__createConfluenceContent`.
