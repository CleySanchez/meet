import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';

describe('<Event /> component', () => {
  test('toggles event details on button click', async () => {
    const event = { id: 1, name: 'Event 1', details: 'Event Details' };
    const { getByText, queryByText } = render(<Event event={event} />);
    
    const button = getByText('Show Details');
    userEvent.click(button);

    await waitFor(() => expect(queryByText('Event Details')).toBeInTheDocument());

    userEvent.click(button);
    
    await waitFor(() => expect(queryByText('Event Details')).not.toBeInTheDocument());
  });
});
