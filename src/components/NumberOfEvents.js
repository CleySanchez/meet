import React, { useState } from 'react';

const NumberOfEvents = () => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
  };

  return (
    <div className="number-of-events">
      <input
        type="text"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;

