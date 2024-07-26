# Supprimer les fichiers inutiles s'ils existent
rm -f src/logo.svg src/App.test.js src/reportWebVitals.js

# Nettoyer le fichier App.js
cat > src/App.js << EOL
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Ajoutez vos composants ici */}
    </div>
  );
}

export default App;
EOL

# Nettoyer le fichier index.js
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

# Installer les bibliothèques de test
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Configurer setupTests.js
cat > src/setupTests.js << EOL
import '@testing-library/jest-dom';
EOL

# Créer le dossier __tests__ pour les tests
mkdir -p src/__tests__

# Fonctionnalité 1 : Écrire les tests pour la fonctionnalité Filtrer les événements par ville
cat > src/__tests__/App.test.js << EOL
import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  test('renders list of events', () => {
    const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });
});
EOL

# Implémenter le composant App.js pour passer le test
cat > src/App.js << EOL
import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <div id="event-list"></div>
    </div>
  );
}

export default App;
EOL

# Fonctionnalité 2 : Préparer les tests et le composant Event
cat > src/__tests__/Event.test.js << EOL
import { render } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';

const event = {
  summary: 'Event Title',
  created: '2023-07-26T14:00:00Z',
  location: 'Berlin, Germany'
};

describe('<Event /> component', () => {
  test('renders event title', () => {
    const { getByText } = render(<Event event={event} />);
    expect(getByText('Event Title')).toBeInTheDocument();
  });

  test('renders event time', () => {
    const { getByText } = render(<Event event={event} />);
    expect(getByText('2023-07-26T14:00:00Z')).toBeInTheDocument();
  });

  test('renders event location', () => {
    const { getByText } = render(<Event event={event} />);
    expect(getByText('Berlin, Germany')).toBeInTheDocument();
  });

  test('renders show details button', () => {
    const { getByText } = render(<Event event={event} />);
    expect(getByText('Show Details')).toBeInTheDocument();
  });

  test('toggles event details on button click', () => {
    const { getByText, queryByText } = render(<Event event={event} />);
    const button = getByText('Show Details');
    userEvent.click(button);
    expect(queryByText('Event Details')).toBeInTheDocument();
    userEvent.click(button);
    expect(queryByText('Event Details')).not.toBeInTheDocument();
  });
});
EOL

# Créer le composant Event.js pour passer les tests
mkdir -p src/components
cat > src/components/Event.js << EOL
import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="event">
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && <p>Event Details</p>}
    </div>
  );
};

export default Event;
EOL

# Fonctionnalité 3 : Écrire les tests pour la fonctionnalité Spécifier le nombre d'événements
cat > src/__tests__/NumberOfEvents.test.js << EOL
import { render, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders textbox input', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('default value of input is 32', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const input = getByRole('textbox');
    expect(input.value).toBe('32');
  });

  test('changes value when user types', () => {
    const { getByRole } = render(<NumberOfEvents />);
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: '10' } });
    expect(input.value).toBe('10');
  });
});
EOL

# Créer le composant NumberOfEvents.js pour passer les tests
cat > src/components/NumberOfEvents.js << EOL
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
EOL

# Installer la dépendance pour éviter l'avertissement
npm install --save-dev @babel/plugin-transform-private-property-in-object

# Exécuter les tests pour vérifier que tout passe
npm test -- --coverage
npm test -- --detectOpenHandles

# Initialiser Git seulement s'il n'est pas déjà initialisé
if [ ! -d ".git" ]; then
  git init
fi

# Ajouter tous les fichiers à git, committer les changements
git add .
git commit -m "Initial commit with tests and components"
