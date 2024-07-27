import React from 'react';

function NumberOfEvents({ setCurrentNOE }) {
  return (
    <div>
      <input
        type="number"
        defaultValue={32}
        onChange={(e) => setCurrentNOE(parseInt(e.target.value))}
      />
    </div>
  );
}

export default NumberOfEvents;
