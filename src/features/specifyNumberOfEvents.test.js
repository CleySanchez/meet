import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppComponent;

  test('When the user hasn’t specified a number, 35 is the default number', ({ given, then }) => {
    given('the user hasn’t specified the number of events to display', () => {
      AppComponent = render(<App />);
    });

    then('the default number of displayed events should be 35', () => {
      const eventItems = AppComponent.container.querySelectorAll('.event-item');
      expect(eventItems.length).toBe(35);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('the user has not specified the number of events', () => {
      AppComponent = render(<App />);
    });

    when('the user types a number into the “number of events” textbox', () => {
      const numberInput = AppComponent.getByLabelText('Number of Events:');
      fireEvent.change(numberInput, { target: { value: '10' } });
    });

    then('the number of events displayed should change to that number', () => {
      const eventItems = AppComponent.container.querySelectorAll('.event-item');
      expect(eventItems.length).toBe(10);
    });
  });
});
