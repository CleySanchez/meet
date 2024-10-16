import {rerender, render, screen, waitFor} from '@testing-library/react';
import EventList from '../components/EventList/EventList';
import { getEvents } from '../api';
import testEventData from '../testEventData.js';

describe('<EventList /> component', () => {
    let allEvents;
    let EventListComponent;

    beforeEach(async() => {
        allEvents = testEventData;
        EventListComponent = render(<EventList events={allEvents} />);
    })

    //AT START
    //EXPECT COMP:  list
    test('Has an element with the "list" role', () => {
        expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
    });

    //AT START / No Input
    //EXPECT COMP:  listItems equal to 32 when no number specified
    test('Renders 32 Events when no number is specified.', async () => {
        waitFor(() => {
            expect(EventListComponent.queryAllByRole('listitem')).toHaveLength(32);
        })
    });

    //When there is a maxNumber passed, it shows a smaller number of events.
    test('Renders one event when asked for one event', async() => {
        EventListComponent.rerender(<EventList events={allEvents} numberOfResults={1} />);
        await waitFor(() => {
            
            expect(EventListComponent.queryAllByRole('listitem')).toHaveLength(1);
        });
    });

});