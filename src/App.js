import React, { useState } from 'react';
import './App.css';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';

function App() {
  const [currentNOE, setCurrentNOE] = useState(32);

  return (
    <div className="App">
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      <EventList numberOfEvents={currentNOE} />
    </div>
  );
}

export default App;
