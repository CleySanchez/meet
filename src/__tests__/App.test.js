import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import mockData from '../mock-data';

test('<App /> renders list of events', async () => {
  const { container } = render(<App />);
  await waitFor(() => {
    expect(container.querySelectorAll('.event-item')).toHaveLength(mockData.length);
  });
});

test('<App /> renders a list of events matching the city selected by the user', async () => {
  render(<App />);

  // Wait for the events to be rendered
  await waitFor(() => {
    expect(screen.getAllByText('Learn JavaScript').length).toBeGreaterThan(0);
  });

  // Simulate city search
  const cityInput = screen.getByPlaceholderText('Search for a city');
  fireEvent.change(cityInput, { target: { value: 'Berlin' } });

  // Ensure filtered events are rendered
  await waitFor(() => {
    const eventItems = screen.getAllByText('Berlin, Germany');
    expect(eventItems.length).toBeGreaterThan(0);
  });
});
