import {loadFeature, defineFeature} from 'jest-cucumber';
import {render, within, waitFor} from '@testing-library/react'
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents, extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    
    test('When a user hasn\'t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('the user hasn\'t searched for a city', () => {
            //FROM START
        });

        let AppComponent;
        when('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        then('the user should see the list of upcoming events', async() => {
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {

                const EventListDOM = AppDOM.querySelector('#event-list');
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });

        });
    });

    test('The user should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        let AppComponent;
        given('that the main page is open', () => {
            AppComponent = render(<App />);
        });

        let CitySearchDOM;
        when('the user begins typing in the city-search textbox', async() => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                CitySearchDOM = AppDOM.querySelector('#city-search');
                expect(CitySearchDOM).toBeInTheDocument();
            })
            
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, 'Ber');
        });

        then('the user should receive a list of cities from the data that match what they have typed', async() => {
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            const allLocations = await extractLocations(await getEvents());

            const suggestions = allLocations ? allLocations.filter((location) => {
                return location.toLowerCase().indexOf('ber') > -1;
            }): [];

            for(let i = 0; i<suggestions.length; i++) {
                expect(suggestionListItems[i].textContent).toBe(suggestions[i])
            }            
        });
    });

    test('The user can select a city from the suggested list', ({ given, and, when, then }) => {
        
        let AppComponent;
        let AppDOM; 
        let CitySearchDOM;
        let citySearchInput;
        
        given('that the user was typing in the city textbox', async() => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            await waitFor( () => {
                CitySearchDOM = AppDOM.querySelector('#city-search');
                expect(CitySearchDOM).toBeInTheDocument();
            })
            citySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, 'Ber');
        });

        let suggestionListItems;
        and('the list of suggested cities is showing', async() => {
            suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem')
            const allLocations = await extractLocations(await getEvents());

            const suggestions = allLocations ? allLocations.filter((location) => {
                return location.toLowerCase().indexOf('ber') > -1;
            }): [];

            for(let i = 0; i<suggestions.length; i++) {
                expect(suggestionListItems[i].textContent).toBe(suggestions[i])
            }   
        });

        when('the user selects a city', async() => {
            const user = userEvent.setup();
            await user.click(suggestionListItems[0]);
        });
       
        and('the user types 2 expected results', async() => {
            const NumberOfResultsDOM = AppDOM.querySelector('#number-of-results');
            const norTextbox = within(NumberOfResultsDOM).queryByRole('textbox');
            const user = userEvent.setup();

            await user.type(norTextbox, '{backspace}{backspace}2')
        });

        then('the searchbox should change to that city', () => {
            expect(citySearchInput.value).toBe(suggestionListItems[0].textContent);
        });


        and('events should appear matching that city in the quantity requested', async() => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const allRenderedEvents = within(EventListDOM).queryAllByRole('listitem');
    
            expect(allRenderedEvents.length).toBe(2)
        });
    });

});