import { loadFeature, defineFeature } from 'jest-cucumber';
import {render, within, waitFor} from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('When user has not specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        
        let AppComponent;
        let AppDOM;
        
        given('the user navigates to the events page', () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
        });

        when('the user does not specify the number of events', () => {
            //Default
        });

        then('the default max number of events should be displayed', async() => {
            await waitFor(() => {          
                const EventListDOM = AppDOM.querySelector('#event-list');
    
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('User can change the number of events displayed', ({ given, when, then }) => {
        
        let AppComponent;
        let AppDOM;
        given('the user is on the events page', () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
        });
    
        when('the user specifies a new number of events to be displayed', async() => {
          
          const user = userEvent.setup();
          let NumberOfResultsDOM;

          await waitFor(() => {
            NumberOfResultsDOM = AppDOM.querySelector('#number-of-results');
            expect (NumberOfResultsDOM).toBeInTheDocument();
          })

          //Enter 10 into the textbox
          let norTextbox;
          await waitFor(() => {
            norTextbox = within(NumberOfResultsDOM).getByRole('textbox');
            expect(norTextbox).toBeInTheDocument();
          })

          await user.type(norTextbox, '{backspace}{backspace}10');
          expect(norTextbox).toHaveValue('10');

    
        });
    
        then('the page should display the specified number of events', async() => {
          let EventListDOM;
          //There should be 10 events
          waitFor(() => {
            EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
          })
          let allRenderedEvents;
          await waitFor(() => {
            allRenderedEvents = within(EventListDOM).queryAllByRole('listitem');
          });
          expect(allRenderedEvents.length).toBe(10);
        });
      });

});