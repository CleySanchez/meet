import { render, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders textbox input', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('default value of input is 32', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const input = getByRole('textbox');
    expect(input.value).toBe('32');
  });

  test('changes value when user types', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: '10' } });
    expect(input.value).toBe('10');
  });
});
