import PropTypes from 'prop-types';
import React, {useState} from 'react';

const Event = (event) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    let handleClick = () => {
        setIsCollapsed(!isCollapsed);
    }

    //This can be changed to a new style of date
    const formattedDate = new Date(event.event.start.dateTime).toLocaleDateString();
    return (
        <div role="listitem" className='event'>
            <div data-testid='event-summary'>
                <h2>{event.event.summary}</h2><br/><br/>
                {formattedDate}<br/>@{event.event.summary} | {event.event.location}
            </div>
            {!isCollapsed && (
                    <div data-testid='event-details'>
                        <h3>About event:</h3><br />
                        <a href = {event.event.htmlLink} target='_blank' rel='noreferrer'>See details on Google Calendar</a><br />
                        {event.event.description}
                    </div>
            )}
            <button className='details-btn' onClick={handleClick}>
                {isCollapsed?'Show Details':'Hide Details'}
            </button>
        </div>
    );
}


Event.propTypes = {
    event: PropTypes.shape({}).isRequired,
}

export default Event;
