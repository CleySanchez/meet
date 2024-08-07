// src/components/Event.js
import React, { useState } from 'react';

const Event = ({ event }) => {
  const { summary, location, start, description } = event;
  const [showDetails, setShowDetails] = useState(false);

  const eventDate = new Date(start.dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const handleDetailsToggle = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className="event">
      <h2>{summary}</h2>
      <p>{location}</p>
      <p>{eventDate}</p>
      <button className="details-btn" onClick={handleDetailsToggle}>
        {showDetails ? 'hide details' : 'show details'}
      </button>
      {showDetails && (
        <div className="details">
          <p>{description}</p>
        </div>
      )}
    </li>
  );
};

export default Event;
