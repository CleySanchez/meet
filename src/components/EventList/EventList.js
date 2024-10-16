import Event from '../Event/Event';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';


const EventList = ({events, numberOfResults, selectedCity, setInfoAlert,}) => {
    
    const allCitiesString = 'See All Cities';

    let [filteredEvents, setFilteredEvents] = useState(events.slice(0,numberOfResults));

    useEffect(() => {
        let newFilteredEvents = events;
        let filterString = selectedCity;

        if(selectedCity===allCitiesString || selectedCity==='')
            newFilteredEvents = events
        else
            newFilteredEvents = newFilteredEvents.filter((event) => (event.location === filterString));
        
        if(numberOfResults){
            newFilteredEvents = newFilteredEvents.slice(0,numberOfResults);
            if(setInfoAlert)
                setInfoAlert('');
        }else{
            newFilteredEvents = [];
            if(setInfoAlert)
                setInfoAlert('Please enter the number of events you want to see.')
        }
        
        setFilteredEvents(newFilteredEvents);
    }, [numberOfResults, selectedCity, events, setInfoAlert]);

    return (
        <div 
            id="event-list" 
            role="list"
        >
            {events &&
                (filteredEvents.map(event => <Event key={event.id} event = {event} />))
            }
        </div>
    );
}

EventList.defaultProps = {
    resultCount: 32,
    selectedCity: ''
}

EventList.propTypes = {
    events: PropTypes.array.isRequired,
    numberOfResults: PropTypes.number,
    selectedCity: PropTypes.string,
    setInfoAlert: PropTypes.func,
};

export default EventList;