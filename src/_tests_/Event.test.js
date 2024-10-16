import {getByRole, queryByRole, render, screen} from '@testing-library/react';
import Event from '../components/Event/Event';
import { getEvents, extractLocations } from '../api';
import userEvent from '@testing-library/user-event';


describe('<Event /> Component', () => {
    let EventComponent;
    let testEvent;

    beforeEach(async() => {
        let testEventArray = await getEvents();
        testEvent = testEventArray[0];
        EventComponent = render(<Event event={testEvent}/>)
    })
    //Feature 2.3
    //The event details are not shown

    //AT START          (collapsed)
    //EXPECT COMP:      button
    //EXPECT COMP:      Summary Div
    //TODO:             Check for all variables
    test('Test Feature 2.3: There is a collapse button', () => {
        expect(EventComponent.queryByRole('button')).toBeInTheDocument();
    });

    test('Test Feature 2.3: Shows a summary even when collapsed', () => {
        expect(EventComponent.getByTestId('event-summary')).toBeInTheDocument();
    });

    //AT START
    //AND WHEN
    //EXPECT COMP:      BUTTON
    //TEXT:             Show Details
    //UNEXPECT COMP:    details
    test('Details are hidden when the button"s text is show details', () => {
        expect(EventComponent.queryByTestId('event-details')).toBeNull();
        expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
    });

    //WHEN USER:        Clicks button
    //EXPECT COMP:      details
    //EXPECT COMP:      BUTTON
    //TEXT:             Hide Details
    //TODO:             Check for all details
    test('Details are hidden when the button"s text is show details', async() => {
        const user = userEvent.setup();
        await user.click(EventComponent.queryByRole('button'));
        expect(EventComponent.getByTestId('event-details')).toBeInTheDocument();
        expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
    });

});