import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('<App /> component', () => {
  test('renders list of events', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#event-list')).toBeInTheDocument();
  });

  test('updates event list when number of events changes', async () => {
    const user = userEvent.setup();
    const { getByRole, findAllByText } = render(<App />);
    const numberOfEventsInput = getByRole('spinbutton');

    await user.clear(numberOfEventsInput);
    await user.type(numberOfEventsInput, '10');
    const eventItems = await findAllByText(/Event \d/i);
    expect(eventItems).toHaveLength(10);
  });
});
