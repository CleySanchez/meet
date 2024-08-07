import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import mockData from '../mock-data';
import { within } from '@testing-library/react';

describe('<EventList /> component', () => {
  const events = mockData;

  test('renders a list of events', () => {
    const { getAllByRole } = render(<EventList events={events} />);
    const eventItems = getAllByRole('listitem');
    expect(eventItems).toHaveLength(events.length);
  });

  test('renders event details correctly', () => {
    const { getAllByRole } = render(<EventList events={events} />);
    const eventItems = getAllByRole('listitem');

    events.forEach((event, index) => {
      const eventItem = eventItems[index];
      const { getByText } = within(eventItem);

      expect(getByText(event.summary)).toBeInTheDocument();
      expect(getByText(event.location)).toBeInTheDocument();
      
      const eventDate = new Date(event.start.dateTime).toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      expect(getByText(eventDate)).toBeInTheDocument();
    });
  });
});
