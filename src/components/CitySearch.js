import React, { useState } from 'react';

const CitySearch = ({ locations, updateEvents }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);
    const filteredLocations = locations.filter(location => location.toUpperCase().indexOf(value.toUpperCase()) > -1);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (value) => {
    setQuery(value);
    setSuggestions([]);
    updateEvents(value);
  };

  return (
    <div className="CitySearch">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onChange={handleInputChanged}
      />
      <ul className="suggestions">
        <li onClick={() => handleItemClicked('all')}>
          <b>See all cities</b>
        </li>
        {suggestions.map((suggestion) => (
          <li key={suggestion} onClick={() => handleItemClicked(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySearch;
