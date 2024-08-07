import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import mockData from '../mock-data';
import { getEvents } from '../api.js';

// Mock the API call
jest.mock('../api.js', () => ({
  getEvents: jest.fn(),
  extractLocations: jest.fn((events) => {
    const locations = events.map((event) => event.location);
    return [...new Set(locations)];
  }),
}));

describe('<Event /> component', () => {
  let EventComponent;
  let event;

  beforeEach(() => {
    getEvents.mockResolvedValue(mockData);
    event = mockData[0];
    EventComponent = render(<Event event={event} />);
  });

  test('renders event details correctly', async () => {
    const { getByText } = EventComponent;
    await waitFor(() => {
      expect(getByText(event.summary)).toBeInTheDocument();
      expect(getByText(event.location)).toBeInTheDocument();
      const eventDate = new Date(event.start.dateTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      expect(getByText(eventDate)).toBeInTheDocument();
    });
  });

  test('renders event Title', async () => {
    const { queryByText } = EventComponent;
    await waitFor(() => {
      expect(queryByText(event.summary)).toBeInTheDocument();
    });
  });

  test('renders event location', async () => {
    const { queryByText } = EventComponent;
    await waitFor(() => {
      expect(queryByText(event.location)).toBeInTheDocument();
    });
  });

  test('renders event details button with the title (show details)', async () => {
    const { queryByText } = EventComponent;
    await waitFor(() => {
      expect(queryByText('show details')).toBeInTheDocument();
    });
  });

  test("by default, event's details section should be hidden", async () => {
    const { container } = EventComponent;
    await waitFor(() => {
      expect(container.querySelector('.details')).not.toBeInTheDocument();
    });
  });

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    const user = userEvent.setup();
    const { queryByText, container } = EventComponent;
    await user.click(queryByText('show details'));

    await waitFor(() => {
      expect(container.querySelector('.details')).toBeInTheDocument();
      expect(queryByText('hide details')).toBeInTheDocument();
      expect(queryByText('show details')).not.toBeInTheDocument();
    });
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    const user = userEvent.setup();
    const { queryByText, container } = EventComponent;

    await user.click(queryByText('show details'));
    await waitFor(() => {
      expect(container.querySelector('.details')).toBeInTheDocument();
      expect(queryByText('hide details')).toBeInTheDocument();
      expect(queryByText('show details')).not.toBeInTheDocument();
    });

    await user.click(queryByText('hide details'));
    await waitFor(() => {
      expect(container.querySelector('.details')).not.toBeInTheDocument();
      expect(queryByText('hide details')).not.toBeInTheDocument();
      expect(queryByText('show details')).toBeInTheDocument();
    });
  });
});
