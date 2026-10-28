Feature: View Dashboard
  As an authenticated Admin user
  I want to access the Dashboard automatically after logging in
  So that I can view relevant HR information in a single location

  Background:
    Given the user is on the login page

  @SCRUM-7 @TC-SCRUM-7-01 @P1 @smoke
  Scenario: Successful redirect to Dashboard after login
    When the user logs in with valid Admin credentials
    Then the user should be redirected to the Dashboard page

  @SCRUM-7 @TC-SCRUM-7-02 @P1 @smoke
  Scenario: Dashboard footer should display copyright information and company link
    Given the user is logged in as Admin
    Then the footer should display "OrangeHRM OS 5.9 © 2005 - 2026 OrangeHRM, Inc. All rights reserved."

  @SCRUM-7 @TC-SCRUM-7-03 @P2 @regression
  Scenario: Browser refresh session persistence
    Given the user is logged in and on the Dashboard page
    When the user refreshes the browser
    Then the user should remain on the Dashboard page

  @SCRUM-7 @TC-SCRUM-7-04 @P1 @regression
  Scenario: Browser refresh after session expiration
    Given the user is on the Dashboard page
    And the user session has expired
    When the user refreshes the browser
    Then the user should be redirected to the Login page

  @SCRUM-7 @TC-SCRUM-7-05 @P1 @smoke
  Scenario: Unauthenticated access to root URL
    Given the user is not logged in
    When the user navigates to the root URL
    Then the user should be redirected to the Login page
