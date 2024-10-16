Feature: Filter events by city
    
    Scenario: When a user hasn't searched for a city, show upcoming events from all cities.
        Given the user hasn't searched for a city
        When the user opens the app
        Then the user should see the list of upcoming events

    Scenario: The user should see a list of suggestions when they search for a city.
        Given that the main page is open
        When the user begins typing in the city-search textbox
        Then the user should receive a list of cities from the data that match what they have typed

    Scenario: The user can select a city from the suggested list
        Given that the user was typing in the city textbox
        And the list of suggested cities is showing
        When the user selects a city
        And the user types 2 expected results
        Then the searchbox should change to that city
        And events should appear matching that city in the quantity requested