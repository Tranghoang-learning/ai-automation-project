@SCRUM-20
Feature: Top navigation for authenticated administrators
  As an authenticated administrator
  I want to use the top navigation
  So that I can identify the current page and access account and support actions

  Background:
    Given the administrator is authenticated
    And the application is displayed at 1366 x 768

  @TC-SCRUM-20-01 @P1 @smoke
  Scenario: TC-SCRUM-20-01 Verify top navigation content when an authenticated administrator views an application page
    Given the administrator is viewing an application page
    When the administrator reviews the top navigation
    Then the current page title is displayed
    And the Upgrade control is available
    And the account area is available
    And the top navigation is visually distinct from the main page content

  @TC-SCRUM-20-02 @P1 @regression
  Scenario: TC-SCRUM-20-02 Verify the top navigation remains fixed while the administrator scrolls
    Given the administrator is viewing a scrollable application page
    When the administrator scrolls the page
    Then the top navigation remains fixed in the viewport

  @TC-SCRUM-20-04 @P1 @smoke
  Scenario: TC-SCRUM-20-04 Verify Upgrade opens the specified destination in a new tab
    Given the Upgrade control is available
    When the administrator selects Upgrade
    Then a new browser tab opens at "https://orangehrm.com/open-source/upgrade-to-advanced"

  @TC-SCRUM-20-05 @P1 @smoke
  Scenario: TC-SCRUM-20-05 Verify the authenticated account area and account menu contents
    Given the account area represents the authenticated administrator
    When the administrator reviews and opens the account area
    Then the authenticated administrator's avatar is displayed
    And the authenticated administrator's account name is displayed
    And a downward indicator is displayed
    And the account menu contains About, Support, Change Password, and Logout

  @TC-SCRUM-20-07 @P1 @regression
  Scenario: TC-SCRUM-20-07 Verify About displays authoritative API data
    Given the account menu is open
    And the About API returns the company name, application version, active employee total, and terminated employee total
    When the administrator selects About
    Then an About popup is displayed
    And the company name from the API is displayed
    And the application version from the API is displayed
    And "Active Employees" displays the value from the API field "numberOfActiveEmployee"
    And "Employees Terminated" displays the value from the API field "numberOfPastEmployee"

  @TC-SCRUM-20-08 @P2 @regression
  Scenario Outline: TC-SCRUM-20-08 Verify employee-total formatting for Active Employees and Employees Terminated
    Given the account menu is open
    And the About API returns <total> for the <field>
    When the administrator selects About
    Then the <field> value is displayed as <displayed_total>

    Examples:
      | case                         | field                 | total   | displayed_total |
      | active zero employees       | Active Employees      | 0       | "0"             |
      | active comma boundary       | Active Employees      | 9999    | "9999"          |
      | active 10,001 value         | Active Employees      | 10001   | "10001"         |
      | active million-scale        | Active Employees      | 1200000 | "1200000"       |
      | terminated zero employees   | Employees Terminated  | 0       | "0"             |
      | terminated comma boundary   | Employees Terminated  | 9999    | "9999"          |
      | terminated 10,001 value     | Employees Terminated  | 10001   | "10001"         |
      | terminated million-scale    | Employees Terminated  | 1200000 | "1200000"       |

  @TC-SCRUM-20-09 @P1 @regression
  Scenario: TC-SCRUM-20-09 Verify unavailable About data displays the required message
    Given the account menu is open
    And the About API cannot retrieve a required value
    When the administrator selects About
    Then the About popup displays "Data is unavailable to view"

  @TC-SCRUM-20-10 @P1 @regression
  Scenario: TC-SCRUM-20-10 Verify About popup focus trapping and dismissal
    Given the About popup is open
    When the administrator attempts to move focus outside the popup
    Then focus remains trapped inside the popup
    When the administrator presses Escape
    Then the About popup closes immediately
    When the administrator opens the About popup again and selects its close control
    Then the About popup closes

  @TC-SCRUM-20-11 @P1 @regression
  Scenario: TC-SCRUM-20-11 Verify account-menu dismissal by outside click and Escape
    Given the account menu is open
    When the administrator clicks outside the account menu
    Then the account menu closes
    When the administrator opens the account menu again and presses Escape
    Then the account menu closes

  @TC-SCRUM-20-12 @P1 @smoke
  Scenario: TC-SCRUM-20-12 Verify Support navigates in the current tab
    Given the account menu is open
    When the administrator selects Support
    Then the current browser tab navigates to "https://opensource-demo.orangehrmlive.com/web/index.php/help/support"

  @TC-SCRUM-20-13 @P1 @smoke
  Scenario: TC-SCRUM-20-13 Verify Change Password navigates in the current tab
    Given the account menu is open
    When the administrator selects Change Password
    Then the current browser tab navigates to "https://opensource-demo.orangehrmlive.com/web/index.php/pim/updatePassword"

  @TC-SCRUM-20-14 @P1 @smoke
  Scenario: TC-SCRUM-20-14 Verify Logout ends the session and returns to Login
    Given the account menu is open
    When the administrator selects Logout
    Then the administrator's session ends
    And the current browser tab navigates to the Login page

  @TC-SCRUM-20-15 @P1 @smoke
  Scenario: TC-SCRUM-20-15 Verify Help opens the specified destination in a new tab
    Given the help control is available
    When the administrator selects the help control
    Then a new browser tab opens at "https://starterhelp.orangehrm.com/hc/en-us"

  @TC-SCRUM-20-16 @P1 @regression
  Scenario Outline: TC-SCRUM-20-16 Verify an unavailable external destination displays an error toast
    Given the <destination> destination is unavailable
    When the administrator selects the <control>
    Then an error toast message "Failed to load" is displayed

    Examples:
      | case          | destination | control |
      | unavailable upgrade | Upgrade URL | Upgrade |
      | unavailable help    | Help URL    | help control |
