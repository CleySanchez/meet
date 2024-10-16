import { loadFeature, defineFeature } from 'jest-cucumber';
import {render, within, waitFor} from '@testing-library/react'
import App from '../App';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {

    test('An event element is collapsed by default.', ({ given, then }) => {
        
        //Components we need to look at
        let AppComponent, AppDOM, EventListDOM;

        given('the user navigates to the events page', async() => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            await waitFor( () => {
                EventListDOM = AppDOM.querySelector('#event-list')
                expect(EventListDOM).toBeInTheDocument();
            })
        });

        then('each event element should be collapsed by default', async() => {
            
            let allEvents;
            await waitFor(()=> {
                
                allEvents = within(EventListDOM).queryAllByRole('listitem');
                expect(allEvents.length).toBeGreaterThanOrEqual(1);
            })

            allEvents.forEach((eventView) => {
                expect(within(eventView).queryByTestId('event-details')).toBeNull()
            })
        });
    });

    test('User can expand an event to see details.', ({ given, when, then }) => {
        
        //Components we need to look at
        let firstEvent, toggleButton, AppComponent, AppDOM;

        given('the user navigates to the events page', async() => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;


            let EventListItems;

            await waitFor(() => {
                const EventListDOM = AppDOM.querySelector('#event-list');

                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
            });

            firstEvent = EventListItems[0];
        });

        when('the user clicks on the expand details button of an event', async() => {
            const user = userEvent.setup();

            toggleButton = within(firstEvent).getByRole('button');
            
            await user.click(toggleButton);
        });

        then('the details of that event should be visible', () => {
            expect(within(firstEvent).queryByTestId('event-details')).toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide details.', ({ given, and, when, then }) => {
        
        //Components we need to look at
        let firstEvent, toggleButton, AppComponent, AppDOM;
        given('the user navigates to the events page', async() => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;

            let EventListItems;
            
            await waitFor(() => {
                const EventListDOM = AppDOM.querySelector('#event-list');
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
            });

            firstEvent = EventListItems[0];
        });

        and('the details of an event are visible', async() => {
            const user = userEvent.setup();

            toggleButton = within(firstEvent).getByRole('button');
            
            await user.click(toggleButton);

            expect(within(firstEvent).queryByTestId('event-details')).toBeInTheDocument();
        });

        when('the user clicks on the collapse details button of that event', async() => {
            const user = userEvent.setup();

            await user.click(toggleButton);
        });

        then('the details of that event should be hidden', () => {
            expect(within(firstEvent).queryByTestId('event-details')).toBeNull();
        });
    });



})