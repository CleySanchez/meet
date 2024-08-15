import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  let AppComponent;
  let AppDOM;
  let CitySearchDOM;
  let citySearchInput;

  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('user hasn’t searched for any city', () => {
      // No specific action required here
    });

    when('the user opens the app', () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    then('the user should see the list of all upcoming events', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32); // Adjust based on default events
      });
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    given('the main page is open', () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      citySearchInput = within(CitySearchDOM).queryByRole('textbox');
    });

    when('user starts typing in the city textbox', async () => {
      const user = userEvent.setup();
      await user.type(citySearchInput, "Berlin");
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', async () => {
      const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(2); // Adjust based on mock data
    });
  });

  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    given('user was typing “Berlin” in the city textbox', async () => {
      const user = userEvent.setup();
      await user.type(citySearchInput, "Berlin");
    });

    and('the list of suggested cities is showing', () => {
      const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(2); // Adjust based on mock data
    });

    when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
      const user = userEvent.setup();
      const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      await user.click(suggestionListItems[0]); // Select the first suggestion
    });

    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      expect(citySearchInput.value).toBe('Berlin, Germany');
    });

    and('the user should receive a list of upcoming events in that city', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });
  });
});
