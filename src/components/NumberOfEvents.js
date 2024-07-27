// src/components/NumberOfEvents.js

import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [number, setNumber] = useState(32);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setNumber(value);
    setCurrentNOE(value);
  };

  return (
    <div>
      <label htmlFor="number-of-events">Number of Events:</label>
      <input
        id="number-of-events"
        type="number"
        className="number-of-events"
        value={number}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
