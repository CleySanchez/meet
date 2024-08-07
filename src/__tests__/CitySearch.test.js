import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import CitySearch from '../components/CitySearch';
import { mockData } from '../mock-data';
import { getEvents } from '../api.js';  // Add the '.js' extension

// Mock the API call
jest.mock('../api.js', () => ({  // Add the '.js' extension
  getEvents: jest.fn(),
  extractLocations: jest.fn((events) => {
    const locations = events.map((event) => event.location);
    return [...new Set(locations)];
  }),
}));

describe('<CitySearch /> component', () => {
  beforeEach(() => {
    getEvents.mockResolvedValue(mockData);
  });

  test('renders city search input', async () => {
    const { getByPlaceholderText } = render(<CitySearch />);
    await waitFor(() => {
      expect(getByPlaceholderText('Search for a city')).toBeInTheDocument();
    });
  });

  // Add other tests as needed
});
