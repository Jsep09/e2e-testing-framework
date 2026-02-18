Feature: As a user I expect to be able to navigate to the home page

    @dev
    @smoke
    @regression
    Scenario: As a user I expect to be able to see contact
    Given I am on the "home" page
    And the "header-logo" element should be displayed
    Then the "contacts header" should contain the text "Contacts"
