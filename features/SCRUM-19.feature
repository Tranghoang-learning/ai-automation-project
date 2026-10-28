@SCRUM-19
Feature: Left navigation sidebar
  As an authenticated Admin user
  I want to navigate the application and manage the left navigation sidebar
  So that I can access required modules and main content conveniently

  Background:
    Given the administrator is authenticated
    And the administrator is viewing the Dashboard page

  @TC-SCRUM-19-01 @P1 @smoke @regression
  Scenario: Display the left navigation sidebar on Dashboard
    Then the left navigation sidebar is displayed on the Dashboard page
    And the OrangeHRM logo is displayed
    And the navigation items are presented vertically beneath the logo
    And every navigation item displays its icon and text label
    And the sidebar is visually distinct from the main Dashboard content
    And the expanded sidebar displays the collapse control

  @TC-SCRUM-19-02 @P1 @regression
  Scenario: Display navigation items in the required order
    Then the navigation items are displayed in the following order
      | Search      |
      | Admin       |
      | PIM         |
      | Leave       |
      | Time        |
      | Recruitment |
      | My Info     |
      | Performance |
      | Dashboard   |
      | Directory   |
      | Maintenance |
      | Claim       |
      | Buzz        |
    And Search is separated from the remaining navigation items

  @TC-SCRUM-19-03 @P1 @regression
  Scenario Outline: Navigate to an available module
    When the administrator selects the "<navigation_item>" navigation item
    Then the administrator is navigated to the associated destination
    And authentication and authorization rules are applied to the destination
    And the navigation item corresponding to the displayed page is active

    Examples:
      | navigation_item |
      | Admin           |
      | PIM             |
      | Leave           |
      | Time            |
      | Recruitment     |
      | My Info         |
      | Performance     |
      | Dashboard       |
      | Directory       |
      | Maintenance     |
      | Claim           |
      | Buzz            |

  @TC-SCRUM-19-04 @P1 @smoke
  Scenario: Identify the Dashboard as the active navigation item
    Given the administrator is viewing the Dashboard page
    Then the Dashboard navigation item is active

  @TC-SCRUM-19-05 @P1 @regression
  Scenario: Keep the active navigation item synchronized with the displayed page
    When the administrator navigates successfully to another available page
    Then the navigation item corresponding to the displayed page is active

  @TC-SCRUM-19-06 @P1 @suggestion @regression
  Scenario: Collapse and expand the supported sidebar
    Given sidebar collapse and expansion are supported
    And the sidebar is expanded
    When the administrator collapses the sidebar
    Then the sidebar is collapsed
    And essential main content remains usable
    And the main content area accommodates the collapsed sidebar
    When the administrator expands the sidebar
    Then the sidebar is expanded
    And essential main content remains usable
    And the main content area accommodates the expanded sidebar

  @TC-SCRUM-19-07 @P1 @suggestion @regression
  Scenario Outline: Update sidebar search for the latest input
    Given sidebar Search is available
    When the administrator enters "<search_input>"
    Then the displayed navigation items reflect the latest search input

    Examples:
      | search_input |
      | A            |
      | Admin        |
      | ad           |

  @TC-SCRUM-19-08 @P2 @suggestion @regression
  Scenario: Report no navigation item matching the search
    Given sidebar Search is available
    When the administrator searches for a keyword that matches no navigation item
    Then the message "no result found" is displayed
    And the administrator can continue entering a search keyword

  @TC-SCRUM-19-09 @P1 @suggestion @regression
  Scenario: Clear the sidebar search and restore all navigation items
    Given sidebar Search contains a previous search
    When the administrator clears the search
    Then the previous search results are cleared
    And all navigation items are displayed again

  @TC-SCRUM-19-10 @P2 @suggestion @regression
  Scenario: Continue searching after deleting characters
    Given sidebar Search is available
    And the administrator has entered a search keyword
    When the administrator deletes characters from the search keyword
    Then the displayed navigation items reflect the resulting search keyword
    And the administrator can continue changing the search keyword
