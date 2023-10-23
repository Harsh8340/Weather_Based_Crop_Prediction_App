import React, { useState } from 'react';

const FieldParametersForm = ({ onSubmit }) => {
  const [soilType, setSoilType] = useState('');
  const [climate, setClimate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input data
    if ( !soilType || !climate) {
      setError('All fields are required');
    } else {
      setError('');
      // Call the onSubmit callback with input parameters
      onSubmit({  soilType, climate});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Soil Type:
        <input type="text" value={soilType} onChange={(e) => setSoilType(e.target.value)} />
      </label>
      <label>
        Climate:
        <input type="text" value={climate} onChange={(e) => setClimate(e.target.value)} />
      </label>

        
      <button type="submit">Get Crop Suggestions</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default FieldParametersForm;
