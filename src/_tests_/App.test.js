import {render, waitFor, within} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

describe('<App /> component', () =>{

    let AppDOM;
    let AppComponent;

    beforeEach(() => {
        AppComponent = render(<App />);
        AppDOM = AppComponent.container.firstChild;
    });

    test('renders list of events', () => {
        waitFor(()=> {
            expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
        });

    });

    test('Render CitySearch', () => {
        waitFor(()=> {
            expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
        })

    });

    //WHEN USER:    Changes the NumberOfResults
    //COMP:         EventList
    //SUBCOMP:      ListItems
    //COUNT:        NumberOfResults or less
/*     test('Changing NumberOfResults yields a list with that number or less', async() => {
        const user = userEvent.setup();
        
        const NumberOfResultsDOM = AppDOM.querySelector('#number-of-results');
        const norTextbox = within(NumberOfResultsDOM).queryByRole('textbox');
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEvents = within(EventListDOM).queryAllByRole('listitem');

        //Check that there are more than two current items
        expect(allRenderedEvents.length).toBeGreaterThan(2);
       
        //Check that the initial value is there and the modified value is passed
        expect(norTextbox).toHaveValue('32');
        await user.type(norTextbox, '{backspace}{backspace}2');
        expect(norTextbox).toHaveValue('2');

        //Check that there are now two
        const updatedRenderedEvents = within(EventListDOM).queryAllByRole('listitem');
        expect(updatedRenderedEvents.length).toBe(2);

    }); */

    test('Changing the CitySearch will yield a list with results that only contain the search', async() => {
        const user = userEvent.setup();
        let citySearchTextbox, norTextbox, CitySearchDOM;
        //AT START
        //COMP:         CitySearch
        await waitFor(() => {
            CitySearchDOM = AppDOM.querySelector('#city-search');
            citySearchTextbox = within(CitySearchDOM).queryByRole('textbox');
        });


        const allEvents = await getEvents();

        //USER:         Allows 9999 results
        await waitFor(() => {
            const NumberOfResultsDOM = AppDOM.querySelector('#number-of-results');
            norTextbox = within(NumberOfResultsDOM).queryByRole('textbox');
        });

        await user.type(norTextbox, '{backspace}{backspace}9999');
        expect(norTextbox).toHaveValue('9999');

        //USER:         Types in the location of db's first event
        await user.type(citySearchTextbox, allEvents[0].location);
        const firstSuggestedItem = within(CitySearchDOM).queryByText(allEvents[0].location);
        await user.click(firstSuggestedItem);

        //EXPECT:       list items equals filtered events length
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEvents = within(EventListDOM).queryAllByRole('listitem');

        const expectedEvents = allEvents.filter(
            event => event.location === allEvents[0].location
        );

        expect(allRenderedEvents.length).toBe(expectedEvents.length)


    })

});

