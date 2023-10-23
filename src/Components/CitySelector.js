import React from 'react';

const CitySelector = ({ cities, onSelectCity }) => {
  return (
    <div className="city-selector">
      <label htmlFor="city">Select City:</label>
      <select id="city" onChange={(e) => onSelectCity(e.target.value)}>
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;
