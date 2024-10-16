
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch/CitySearch';
import { getEvents, extractLocations } from '../api';

describe('CitySearch component', () => {
    let CitySearchComponent
    let allEvents;
    let allLocations;
    
    beforeEach(async() => {
        allEvents = await getEvents()
        allLocations = await extractLocations(allEvents)
        CitySearchComponent = render(<CitySearch allLocations={allLocations} />);
    })
    
    //AT START
    //EXPECT COMP:  textbox
    //WITH CLASS:   'city'
    test('Renders text input.', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    //AT START
    //UNEXPECT COMP:    List
    test('Suggestion list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    })

    // WHEN USER:       Clicks textbox
    // EXPECT COMP:     SuggestionList.js
    // WITH CLASS:      'suggestions'
    test('Renders a list of suggestions when the cityTextBox gains focus', async () => {
        const user = userEvent.setup();
        await user.click(CitySearchComponent.queryByRole('textbox'));
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });

    // LONG TEST / SEE INSIDE
    test('updates the list of suggestions correctly when user types in the cityTextBox', async() =>{
        const user = userEvent.setup();

        // WHEN USER:   Inputs 'Berlin'
        // IN COMP:     'textbox'
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        // FILTER:          All locations
        // WHICH CONTAIN:   BERLILN
        const suggestions = allLocations ? allLocations.filter((location) => {
            return location.toLowerCase().indexOf(cityTextBox.value.toLowerCase()) > -1;
        }): [];

        // EXPECT COMP:     ListItems
        // WITH LENGTH      Filtered locations + 1
        // FOR EACH         ListItem in parent component
        // EXPECT           Text equals suggestion of equal index
        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for(let i = 0; i<suggestions.length; i++) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i])
        }

    });

    // LONG TEST / SEE INSIDE
    test('Renders the suggestion text in the cityTextBox after clicking the suggestion', async() => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = await extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

        // WHEN USER:   Inputs 'Berlin'
        // IN COMP:     'textbox'
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        // WHEN USER:   Clicks the first listitem
        // IN COMP:     list
        const firstSuggested = CitySearchComponent.queryAllByRole('listitem')[0];
        await user.click(firstSuggested);

        //EXPECT        Text equals user input
        expect(cityTextBox).toHaveValue(firstSuggested.textContent);
    });
    
});
