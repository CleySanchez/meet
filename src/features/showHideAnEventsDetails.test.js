import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import mockData from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let EventComponent;

  test('An event element is collapsed by default', ({ given, then }) => {
    given('the user has loaded the event list', () => {
      EventComponent = render(<Event event={mockData[0]} />);
    });

    then('the event details should be hidden by default', () => {
      const detailsElement = EventComponent.queryByText(mockData[0].description);
      expect(detailsElement).toBeNull();  // Details should be hidden by default
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user has loaded the event list', () => {
      EventComponent = render(<Event event={mockData[0]} />);
    });

    when('the user clicks on the "show details" button for an event', async () => {
      const showDetailsButton = screen.getByText('show details');
      await act(async () => {
        userEvent.click(showDetailsButton);
      });
    });

    then('the event details should be displayed', async () => {
      await waitFor(() => {
        const detailsElement = screen.getByText((content, element) => 
          content.startsWith('Have you wondered how you can ask Google')
        );
        expect(detailsElement).toBeInTheDocument();  // Ensure details are displayed
      });
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the event details are displayed', () => {
      EventComponent = render(<Event event={mockData[0]} />);
      const showDetailsButton = screen.getByText('show details');
      act(() => {
        userEvent.click(showDetailsButton);
      });
    });

    when('the user clicks on the "hide details" button for the same event', async () => {
      const hideDetailsButton = await screen.findByText(/hide details/i);
      await act(async () => {
        userEvent.click(hideDetailsButton);
      });
    });

    then('the event details should be hidden', () => {
      const detailsElement = screen.queryByText(mockData[0].description);
      expect(detailsElement).toBeNull();  // Ensure details are hidden again
    });
  });
});
