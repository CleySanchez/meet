import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppComponent;
  let AppDOM;
  let NumberOfEventsComponent;

  test('Show default number of events when user hasn’t specified a number', ({ given, then }) => {
    given('the user hasn’t specified the number of events', () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      NumberOfEventsComponent = within(AppDOM).queryByRole('textbox');
    });

    then(/^\("(.*)"\) events should be displayed by default$/, () => {
      expect(NumberOfEventsComponent).toHaveValue('32'); // Ensure default is set to 32
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('the user has specified the number of events', () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      NumberOfEventsComponent = within(AppDOM).queryByRole('textbox');
    });

    when('the user sets the number to 10', async () => {
      const user = userEvent.setup();
      await user.clear(NumberOfEventsComponent);
      await user.type(NumberOfEventsComponent, '10');
    });

    then('10 events should be displayed', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems).toHaveLength(10);
      });
    });
  });

});
