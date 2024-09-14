import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch country data from the API
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Filter suggestions based on the query
    if (query.length > 0) {
      const filteredSuggestions = data.filter(country =>
        country.name.common.toLowerCase().startsWith(query.toLowerCase()) ||
        (country.capital && country.capital[0].toLowerCase().startsWith(query.toLowerCase()))
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, data]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.name.common);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a country or capital..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelect(suggestion)}>
              {suggestion.name.common} ({suggestion.capital ? suggestion.capital[0] : 'No capital'})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
