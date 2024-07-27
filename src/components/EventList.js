// src/components/EventList.js

import React from 'react';

const EventList = ({ events }) => {
  return (
    <div id="event-list">
      {events.map(event => (
        <div key={event.id} className="event-item">
          <h2>{event.name}</h2>
          <p>{event.location}</p>
          <p>{new Date(event.date).toString()}</p>
          <button>Show Details</button>
        </div>
      ))}
    </div>
  );
};

export default EventList;

