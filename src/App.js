import React, { useState, useEffect } from 'react';
import mockData from './mock-data';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setEvents(mockData);
      setFilteredEvents(mockData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter(event =>
        event.location.toLowerCase().includes(city.toLowerCase())
      )
    );
  }, [city, events]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="App">
      <div className="CitySearch">
        <input
          className="city"
          placeholder="Search for a city"
          type="text"
          value={city}
          onChange={handleCityChange}
        />
      </div>
      <div className="NumberOfEvents">
        <label htmlFor="numberOfEvents">Number of Events:</label>
        <input className="number-of-events" id="numberOfEvents" type="number" />
      </div>
      <ul className="events-list">
        {filteredEvents.map((event, index) => (
          <li key={index} className="event-item">
            <div className="event">
              <h2>{event.summary}</h2>
              <p>{event.location}</p>
              <p>{new Date(event.start.dateTime).toLocaleString()}</p>
            </div>
            <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
              <button className="show-details">Show Details</button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
