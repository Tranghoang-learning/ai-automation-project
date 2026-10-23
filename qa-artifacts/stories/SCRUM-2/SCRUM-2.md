# QA Analysis: SCRUM-2 - Authenticate Admin Using Username and Password

## 1. Story Overview
**Summary**: As an admin, when I am on the Login page, I want to sign in with my registered username and password so that I can access authenticated areas of the website.
**Priority**: High
**Sprint**: SCRUM Sprint 0

## 2. Requirement Breakdown

### 2.1 Acceptance Criteria (AC)
| ID | Requirement | Type | Priority | Testability |
| :--- | :--- | :--- | :--- | :--- |
| AC-01 | Successful authentication with valid credentials | Functional | P1 | High |
| AC-02 | Redirect to Dashboard page after successful login | Functional | P1 | High |
| AC-03 | Page title is "Dashboard" after successful login | Visual | P1 | High |
| AC-04 | Login fails with credentials that do not match a registered account | Negative | P1 | High |
| AC-05 | Stay on Login page if login fails | Functional | P1 | High |
| AC-06 | Error message "Invalid credentials" on login failure | Visual | P1 | High |
| AC-07 | "Required" message under Username field if empty | Negative | P2 | High |
| AC-08 | "Required" message under Password field if empty | Negative | P2 | High |
| AC-09 | "Required" messages under both fields if both empty | Negative | P2 | High |
| AC-10 | Fields containing only whitespace treated as empty | Negative | P2 | High |
| AC-11 | No authentication request sent if fields are empty/whitespace | Technical | P2 | Medium |
| AC-12 | Login fails on API error 500 / unexpected system error | Negative | P2 | Medium |
| AC-13 | Error message "Internal Server Error" on API failure | Visual | P2 | Medium |
| AC-14 | Username and password are mandatory fields | Functional | P1 | High |
| AC-15 | Failed authentication must not create an authenticated user session | Security | P1 | High |
| AC-16 | All validation and authentication error messages must match the provided UI mockups | Visual | P2 | Low (No mockups) |
| AC-17 | No additional validation rules for format/complexity/lockout | Boundary | P3 | High |

## 3. Test Scenarios (Scenario-Based Design)

### 3.1 Positive Scenarios
- [ ] **S-POS-01: Successful Admin Authentication** $\rightarrow$ System authenticates user, redirects to Dashboard, and displays page title "Dashboard". (Maps to: AC-01, AC-02, AC-03, AC-14)

### 3.2 Negative & Edge Scenarios
- [ ] **S-NEG-01: Authentication Failure (Invalid Credentials)** $\rightarrow$ System stays on Login page, displays "Invalid credentials", and ensures no session is created. (Maps to: AC-04, AC-05, AC-06, AC-15)
- [ ] **S-NEG-02: Mandatory Field Validation (Empty/Whitespace)** $\rightarrow$ System prevents API request and displays "Required" messages under the relevant empty/whitespace fields. (Maps to: AC-07, AC-08, AC-09, AC-10, AC-11)
- [ ] **S-NEG-03: System Error Handling (API 500)** $\rightarrow$ System fails login and displays "Internal Server Error" message. (Maps to: AC-12, AC-13)
- [ ] **S-EDGE-01: Non-standard Format Input** $\rightarrow$ System processes login based on account existence regardless of character complexity (no format restrictions). (Maps to: AC-17)

## 4. Pre-conditions & Data
- **User Role**: Admin.
- **Test Data**: 
    - Valid Admin credentials.
    - Invalid/Unregistered credentials.
    - Empty/Whitespace inputs.
- **Environment**: Login page accessible.

## 5. Risks & Assumptions
- **Mockups**: None provided; assuming standard UI layout for validation messages.
- **API Errors**: Simulating 500 errors will require network interception.

## 6. Traceability Baseline
The identified scenarios (S-POS-01, S-NEG-01 to S-NEG-03, S-EDGE-01) will be the source for the consolidated test cases in the RTM.
