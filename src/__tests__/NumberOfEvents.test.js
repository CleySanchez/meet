import { render, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders spinbutton input', () => {
    const setCurrentNOE = jest.fn();
    const { getByRole } = render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
    const input = getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });

  test('default value of input is 32', () => {
    const setCurrentNOE = jest.fn();
    const { getByRole } = render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
    const input = getByRole('spinbutton');
    expect(input.value).toBe('32');
  });

  test('changes value when user types', () => {
    const setCurrentNOE = jest.fn();
    const { getByRole } = render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
    const input = getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '10' } });
    expect(input.value).toBe('10');
  });
});
