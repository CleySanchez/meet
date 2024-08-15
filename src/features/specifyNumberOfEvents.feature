Feature: Specify Number of Events

Scenario: Show default number of events when user hasn’t specified a number
  Given the user hasn’t specified the number of events
  Then (32) events should be displayed by default

Scenario: User can change the number of events they want to see
  Given the user has specified the number of events
  When the user sets the number to 10
  Then 10 events should be displayed
