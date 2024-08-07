// src/__tests__/NumberOfEvents.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ParentComponent from '../components/ParentComponent';


test('<NumberOfEvents /> component number of events text box value changes when the user types in it', async () => {
  await act(async () => {
    render(<ParentComponent />);
  });

  const user = userEvent.setup();
  const numberTextBox = screen.getByLabelText(/number of events/i);
  await act(async () => {
    await user.type(numberTextBox, '123');
  });

  expect(numberTextBox).toHaveValue(123);
});
