Feature: Filter events by city

  Scenario: When user has not searched for a city, show upcoming events from all cities
    Given user has not searched for any city
    When the user opens the app
    Then the user should see the list of all upcoming events

  Scenario: User can select a city from the suggested list
    Given the user is typing Berlin in the city textbox
    And the list of suggested cities is showing
    When the user selects a city like Berlin, Germany from the list
    Then their city should be changed to Berlin, Germany
    And the user should see a list of upcoming events in that city
