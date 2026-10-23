@SCRUM-2
Feature: Admin Authentication
  As an admin
  I want to sign in with my registered username and password
  So that I can access authenticated areas of the website

  Background:
    Given the user is on the Login page

  @TC-SCRUM-2-01 @P1 @smoke @regression
  Scenario: Successful Admin Authentication
    When the user logs in with valid admin credentials
    Then the system authenticates the user successfully
    And the user is redirected to the Dashboard page
    And the page title is "Dashboard"

  @TC-SCRUM-2-02 @P1 @regression
  Scenario Outline: Authentication Failure with Invalid Credentials
    When the user logs in with "<username>" and "<password>"
    Then the system denies access and remains on the Login page
    And an error message "Invalid credentials" is displayed
    And no authenticated session is created

    Examples:
      | username   | password   | comment                      |
      | valid_usr  | invalid_pwd| Valid user, wrong password   |
      | invalid_usr | valid_pwd  | Wrong user, valid password   |
      | invalid_usr | invalid_pwd| Both username and password wrong|
      | unreg_usr   | any_pwd    | Unregistered account         |


  @TC-SCRUM-2-03 @P2 @regression
  Scenario Outline: Mandatory Field Validation
    When the user attempts to login with <username> and <password>
    Then the system prevents the authentication request
    And the field "<field>" displays a "Required" error message

    Examples:
      | username | password | field    |
      |          | valid_pwd | Username |
      | valid_usr|          | Password |
      |          |          | Both     |
      |   (space)| valid_pwd | Username |
      | valid_usr|   (space) | Password |

  @TC-SCRUM-2-04 @P2 @regression
  Scenario: System Error Handling (API 500)
    When the authentication API returns an internal server error
    Then the login process fails
    And an error message "Internal Server Error" is displayed

  @TC-SCRUM-2-05 @P3 @regression
  Scenario: Non-standard Format Input
    When the user logs in with a username containing non-standard characters
    Then the system processes the login based on account existence regardless of format
