import { render } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';

const event = {
  summary: 'Event Title',
  created: '2023-07-26T14:00:00Z',
  location: 'Berlin, Germany'
};

describe('<Event /> component', () => {
  test('renders event title', () => {
    const { getByText } = render(<Event event={event} />);
    expect(getByText('Event Title')).toBeInTheDocument();
  });

  test('renders event time', () => {
    const { getByText } = render(<Event event={event} />);
    expect(getByText('2023-07-26T14:00:00Z')).toBeInTheDocument();
  });

  test('renders event location', () => {
    const { getByText } = render(<Event event={event} />);
    expect(getByText('Berlin, Germany')).toBeInTheDocument();
  });

  test('renders show details button', () => {
    const { getByText } = render(<Event event={event} />);
    expect(getByText('Show Details')).toBeInTheDocument();
  });

  test('toggles event details on button click', () => {
    const { getByText, queryByText } = render(<Event event={event} />);
    const button = getByText('Show Details');
    userEvent.click(button);
    expect(queryByText('Event Details')).toBeInTheDocument();
    userEvent.click(button);
    expect(queryByText('Event Details')).not.toBeInTheDocument();
  });
});
