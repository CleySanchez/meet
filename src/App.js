// src/App.js
import React, { useState, useEffect } from 'react';
import mockData from './mock-data';

function App() {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(35); // Default to showing 32 events
  const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events based on the numberOfEvents

  useEffect(() => {
    // Fetch events (you are using mockData for now)
    setEvents(mockData);
  }, []);

  useEffect(() => {
    // Update the filtered events based on numberOfEvents
    setFilteredEvents(events.slice(0, numberOfEvents));
  }, [events, numberOfEvents]);

  const handleNumberOfEventsChange = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value > 0 ? value : 1); // Ensure at least 1 event is shown
  };

  return (
    <div className="App">
      <div className="CitySearch">
        <input className="city" placeholder="Search for a city" type="text" />
        <ul className="suggestions">
          <li><b>See all cities</b></li>
        </ul>
      </div>
      
      <div>
        <label htmlFor="numberOfEvents">Number of Events:</label>
        <input
          className="number-of-events"
          id="numberOfEvents"
          type="number"
          value={numberOfEvents}
          onChange={handleNumberOfEventsChange}
        />
      </div>
      
      <ul>
        {filteredEvents.map((event, index) => (
          <li key={index} className="event-item">
            <div className="event">
              <h2>{event.summary}</h2>
              <p>{event.location}</p>
              <p>{new Date(event.start.dateTime).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
