@SCRUM-22
Feature: Application footer
  As an authenticated administrator
  I want application information to remain available
  So that I can identify the application version and copyright information

  Background:
    Given the administrator is authenticated

  @TC-SCRUM-22-01 @P1 @smoke
  Scenario: TC-SCRUM-22-01 Display the footer on the Dashboard page
    Given the administrator is viewing the Dashboard page
    And the Dashboard page uses the shared application layout
    When the administrator reviews the Dashboard page
    Then the application footer is displayed
    And the footer is visually distinct from the main page content
    And the footer does not obscure essential page content

  @TC-SCRUM-22-02 @P1 @regression
  Scenario: TC-SCRUM-22-02 Keep the footer accessible at the bottom of a long Dashboard page
    Given the administrator is viewing the Dashboard page
    And the Dashboard page has content taller than the viewport
    When the administrator reaches the bottom of the page
    Then the application footer is accessible without overlapping essential page content

  @TC-SCRUM-22-03 @P1 @regression
  Scenario: TC-SCRUM-22-03 Position the footer at the bottom of a short Dashboard page
    Given the administrator is viewing the Dashboard page
    And the Dashboard page has content shorter than the viewport
    When the administrator opens the page
    Then the application footer is positioned at the bottom of the viewport

  @TC-SCRUM-22-04 @P1 @smoke
  Scenario: TC-SCRUM-22-04 Display the application version on Dashboard
    Given the administrator is viewing the Dashboard page
    And the application release version is OrangeHRM OS 5.9
    When the administrator views the application footer
    Then the footer displays "OrangeHRM OS 5.9"

  @TC-SCRUM-22-05 @P1 @regression
  Scenario: TC-SCRUM-22-05 Keep the application version consistent across shared-layout pages
    Given the administrator is viewing shared-layout pages in one application release
    When the administrator navigates between those pages
    Then every application footer displays the same version as the deployed application release

  @TC-SCRUM-22-06 @P1 @smoke
  Scenario: TC-SCRUM-22-06 Display the copyright notice on Dashboard
    Given the administrator is viewing the Dashboard page
    And the application release uses the copyright value "© 2005 - 2026 OrangeHRM, Inc. All rights reserved."
    When the administrator views the application footer
    Then the footer displays "© 2005 - 2026 OrangeHRM, Inc. All rights reserved."
    And the copyright notice is readable and visually distinct from surrounding footer content

  @TC-SCRUM-22-07 @P1 @suggestion @regression
  Scenario: TC-SCRUM-22-07 Keep release information consistent across shared-layout pages
    Given the administrator is viewing shared-layout pages in one application release
    When the administrator navigates between those pages
    Then the application version displayed in every footer matches the deployed release
    And the copyright notice displayed in every footer matches the applicable release

  @TC-SCRUM-22-08 @P1 @suggestion @regression
  Scenario: TC-SCRUM-22-08 Display the footer on the Login page
    Given the administrator is not authenticated
    And the Login page is fully loaded
    When the administrator views the Login page
    Then the application version is displayed in the footer
    And the copyright notice is displayed in the footer
    And both footer elements are visible in the viewport
