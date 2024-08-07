// src/components/ParentComponent.js
import React, { useState } from 'react';
import NumberOfEvents from './NumberOfEvents';

const ParentComponent = () => {
  const [currentNOE, setCurrentNOE] = useState(0);

  return (
    <div>
      <h1>Event Manager</h1>
      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
    </div>
  );
};

export default ParentComponent;
