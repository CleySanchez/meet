import { loadFeature, defineFeature } from 'jest-cucumber'; 
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {

  test('When user has not searched for a city, show upcoming events from all cities', ({ given, when, then }) => {
    let AppComponent;

    given('user has not searched for any city', () => {
      AppComponent = render(<App />);
    });

    when('the user opens the app', () => {
      // The app is rendered in the given step
    });

    then('the user should see the list of all upcoming events', async () => {
      const eventList =  await waitFor(() => {AppComponent.container.querySelector('#event-list');})
      console.log(eventList); // Debug to check if event list is rendered

      // Ensure the event list container exists
      expect(eventList).not.toBeNull();

      await waitFor(() => {
        
        const eventItems = within(eventList).queryAllByRole('listitem');
        console.log(`Number of events: ${eventItems.length}`); // Debug log for the number of events

        // Ensure events are displayed
        expect(eventItems.length).toBeGreaterThan(0);
      });
    });
  });

  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    let CitySearchComponent;

    given('the user is typing Berlin in the city textbox', () => {
      CitySearchComponent = render(<App />);
      const citySearchInput = screen.getByPlaceholderText('Search for a city');
      userEvent.type(citySearchInput, 'Berlin, Germany');
    });

    and('the list of suggested cities is showing', async () => {
      await waitFor(() => {
        const suggestionItems = screen.getAllByRole('listitem');
        expect(suggestionItems.length).toBeGreaterThan(0);  // Ensure suggestions are displayed
      });
    });

    when('the user selects a city like Berlin, Germany from the list', async () => {
      const berlinOptions = screen.getAllByText('Berlin, Germany');
      userEvent.click(berlinOptions);  // Click the first matching item

      await waitFor(() => {
        const citySearchInput = screen.getByPlaceholderText('Search for a city');
        console.log(`Selected city: ${citySearchInput.value}`);  // Debug log for selected city

        // Ensure city is selected properly
        expect(citySearchInput.value).toBe('Berlin, Germany');
      });
    });

    then('their city should be changed to Berlin, Germany', async () => {
      const citySearchInput = screen.getByPlaceholderText('Search for a city');

      await waitFor(() => {
        console.log(`Selected city: ${citySearchInput.value}`);  // Debug log for selected city

        // Ensure city is selected correctly
        expect(citySearchInput.value).toBe('Berlin, Germany');
      });
    });

    and('the user should see a list of upcoming events in that city', async () => {
      const eventList = CitySearchComponent.container.querySelector('#event-list');
      expect(eventList).not.toBeNull();  // Ensure the event list container exists

      await waitFor(() => {
        const eventItems = within(eventList).queryAllByRole('listitem');
        expect(eventItems.length).toBeGreaterThan(0);  // Ensure events are displayed
      });
    });
  });
});
