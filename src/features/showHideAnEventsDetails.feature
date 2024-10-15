Feature: Show/hide an event’s details

  Scenario: An event element is collapsed by default
    Given the user has loaded the event list
    Then the event details should be hidden by default

  Scenario: User can expand an event to see its details
    Given the user has loaded the event list
    When the user clicks on the "show details" button for an event
    Then the event details should be displayed

  Scenario: User can collapse an event to hide its details
    Given the event details are displayed
    When the user clicks on the "hide details" button for the same event
    Then the event details should be hidden
