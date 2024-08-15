import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppComponent;
  let AppDOM;
  let EventListDOM;

  test('An event element is collapsed by default', ({ given, then }) => {
    given('the user opens the app', () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('.event');
    });

    then('the event element should be collapsed by default', () => {
      const eventDetails = within(EventListDOM).queryByRole('details');
      expect(eventDetails).toBeNull();
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    given('the event element is collapsed', () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('.event');
    });

    when('the user clicks on the event', async () => {
      const user = userEvent.setup();
      await user.click(EventListDOM);
    });

    then('the event element should expand to show details', async () => {
      const eventDetails = await within(EventListDOM).findByRole('details');
      expect(eventDetails).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    given('the event element is expanded', async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('.event');
      const user = userEvent.setup();
      await user.click(EventListDOM); // To expand the event
    });

    when('the user clicks on the event', async () => {
      const user = userEvent.setup();
      await user.click(EventListDOM); // To collapse the event
    });

    then('the event element should collapse to hide details', async () => {
      const eventDetails = within(EventListDOM).queryByRole('details');
      expect(eventDetails).toBeNull();
    });
  });

});
