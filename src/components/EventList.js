import React from 'react';

function EventList({ numberOfEvents }) {
  const events = Array.from({ length: numberOfEvents }, (_, i) => ({ id: i, name: `Event ${i + 1}` }));

  return (
    <div id="event-list">
      {events.map(event => (
        <div key={event.id} className="event-item">
          {event.name}
        </div>
      ))}
    </div>
  );
}

export default EventList;
