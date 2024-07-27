#!/bin/bash

# Remove unnecessary files
rm -f src/logo.svg src/App.test.js src/reportWebVitals.js

# Clean up App.js
cat > src/App.js << EOL
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
EOL

# Clean up index.js
cat > src/index.js << EOL
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
EOL

# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Configure setupTests.js
cat > src/setupTests.js << EOL
import '@testing-library/jest-dom';
EOL

# Create the __tests__ directory
mkdir -p src/__tests__

# Create integration test for App component
cat > src/__tests__/App.test.js << EOL
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('<App /> component', () => {
  test('renders list of events', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#event-list')).toBeInTheDocument();
  });

  test('updates event list when number of events changes', async () => {
    const user = userEvent.setup();
    const { getByRole, findAllByText } = render(<App />);
    const numberOfEventsInput = getByRole('spinbutton');

    await user.clear(numberOfEventsInput);
    await user.type(numberOfEventsInput, '10');
    const eventItems = await findAllByText(/Event \d/i);
    expect(eventItems).toHaveLength(10);
  });
});
EOL

# Create the EventList component
cat > src/components/EventList.js << EOL
import React from 'react';

function EventList({ numberOfEvents }) {
  const events = Array.from({ length: numberOfEvents }, (_, i) => ({ id: i, name: \`Event \${i + 1}\` }));

  return (
    <div id="event-list">
      {events.map(event => (
        <div key={event.id} className="event-item">
          {event.name}
        </div>
      ))}
    </div>
  );
}

export default EventList;
EOL

# Create the NumberOfEvents component
cat > src/components/NumberOfEvents.js << EOL
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
EOL

# Create integration test for NumberOfEvents component
cat > src/__tests__/NumberOfEvents.test.js << EOL
import { render, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders spinbutton input', () => {
    const setCurrentNOE = jest.fn();
    const { getByRole } = render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
    const input = getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });

  test('default value of input is 32', () => {
    const setCurrentNOE = jest.fn();
    const { getByRole } = render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
    const input = getByRole('spinbutton');
    expect(input.value).toBe('32');
  });

  test('changes value when user types', () => {
    const setCurrentNOE = jest.fn();
    const { getByRole } = render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
    const input = getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '10' } });
    expect(input.value).toBe('10');
  });
});
EOL

# Create the Event component
cat > src/components/Event.js << EOL
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
EOL

# Create integration test for Event component
cat > src/__tests__/Event.test.js << EOL
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';

describe('<Event /> component', () => {
  test('toggles event details on button click', () => {
    const event = { id: 1, name: 'Event 1', details: 'Event Details' };
    const { getByText, queryByText } = render(<Event event={event} />);
    const button = getByText('Show Details');
    userEvent.click(button);
    expect(queryByText('Event Details')).toBeInTheDocument();
    userEvent.click(button);
    expect(queryByText('Event Details')).not.toBeInTheDocument();
  });
});
EOL

# Run tests
npm test -- --coverage --watchAll=false

# Deploy to GitHub Pages
npm run deploy
