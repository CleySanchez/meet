// src/components/NumberOfEvents.js
import React from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
  return (
    <div>
      <label htmlFor="numberOfEvents">Number of Events:</label>
      <input
        id="numberOfEvents"
        type="number"
        className="number-of-events"
        onChange={(e) => setCurrentNOE(e.target.value)}
      />
    </div>
  );
};

export default NumberOfEvents;
