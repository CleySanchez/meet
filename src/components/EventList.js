// EventList.js
import React from 'react';

const EventList = ({ events }) => {
 // console.log('EventList events:', events); // Debugging log
  return (
    <ul>
      {events.map(event => (
        <li key={event.id} className="event-item">
          <div className="event">
            <h2>{event.summary}</h2>
            <p>{event.location}</p>
            <p>{new Date(event.start.dateTime).toLocaleString([], {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EventList;

