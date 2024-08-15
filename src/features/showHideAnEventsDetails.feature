Feature: Show/Hide Event Details

Scenario: An event element is collapsed by default
  Given the user opens the app
  Then the event element should be collapsed by default

Scenario: User can expand an event to see details
  Given the event element is collapsed
  When the user clicks on the event
  Then the event element should expand to show details

Scenario: User can collapse an event to hide details
  Given the event element is expanded
  When the user clicks on the event
  Then the event element should collapse to hide details
