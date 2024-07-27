import React, { useState } from 'react';

function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <h2>{event.name}</h2>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && <p>Event Details</p>}
    </div>
  );
}

export default Event;