Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default.
    Given the user navigates to the events page
    Then each event element should be collapsed by default

  Scenario: User can expand an event to see details.
    Given the user navigates to the events page
    When the user clicks on the expand details button of an event
    Then the details of that event should be visible

  Scenario: User can collapse an event to hide details.
    Given the user navigates to the events page
    And the details of an event are visible
    When the user clicks on the collapse details button of that event
    Then the details of that event should be hidden