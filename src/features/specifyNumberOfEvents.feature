Feature: Specify Number of Events

    Scenario: When user has not specified a number, 32 events are shown by default.
        Given the user navigates to the events page
        When the user does not specify the number of events
        Then the default max number of events should be displayed

    Scenario: User can change the number of events displayed
        Given the user is on the events page
        When the user specifies a new number of events to be displayed
        Then the page should display the specified number of events