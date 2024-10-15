Feature: Specify the number of events

  Scenario: When the user hasn’t specified a number, 35 is the default number
    Given the user hasn’t specified the number of events to display
    Then the default number of displayed events should be 35

  Scenario: User can change the number of events they want to see
    Given the user has not specified the number of events
    When the user types a number into the “number of events” textbox
    Then the number of events displayed should change to that number
