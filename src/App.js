import React, { useState, useEffect } from 'react';

import './App.css';
import CitySelector from './Components/CitySelector';
import CropPrediction from './Components/CropPrediction';
import FieldParametersForm from './Components/FieldParametersForm'; // Import the form component
import axios from 'axios'; // Import axios for making API requests

const citiesData = [
  { name: 'Delhi', soilType: 'Sandy Soil', climate: 'Warm Climate' },
  { name: 'Mumbai', soilType: 'Clay Soil', climate: 'Warm Climate' },
  { name: 'Chennai', soilType: 'Sandy Soil', climate: 'Hot Climate' },
  { name: 'Kolkata', soilType: 'Loamy Soil', climate: 'Moderate Climate' },
  { name: 'Bengaluru', soilType: 'Red Soil', climate: 'Moderate Climate' },
  { name: 'Hyderabad', soilType: 'Sandy Loam', climate: 'Hot Climate' },
  { name: 'Pune', soilType: 'Clay Loam', climate: 'Moderate Climate' },
  { name: 'Ahmedabad', soilType: 'Silty Soil', climate: 'Hot Climate' },
  { name: 'Jaipur', soilType: 'Sandy Soil', climate: 'Hot Climate' },
  { name: 'Lucknow', soilType: 'Silt Loam', climate: 'Moderate Climate' },
  { name: 'Patna', soilType: 'Loamy Soil', climate: 'Moderate Climate' },
  { name: 'Bhopal', soilType: 'Clay Soil', climate: 'Moderate Climate' },
  { name: 'Ranchi', soilType: 'Sandy Loam', climate: 'Moderate Climate' },
  { name: 'Thiruvananthapuram', soilType: 'Laterite Soil', climate: 'Hot Climate' },
  { name: 'Raipur', soilType: 'Red Sandy Soil', climate: 'Hot Climate' },
  { name: 'Chandigarh', soilType: 'Silt Loam', climate: 'Moderate Climate' },
  { name: 'Dehradun', soilType: 'Clay Loam', climate: 'Moderate Climate' },
  { name: 'Gandhinagar', soilType: 'Black Soil', climate: 'Hot Climate' },
  { name: 'Shimla', soilType: 'Loamy Soil', climate: 'Moderate Climate' },
  { name: 'Aizawl', soilType: 'Silt Loam', climate: 'Moderate Climate' },
  { name: 'Dispur', soilType: 'Clay Soil', climate: 'Moderate Climate' },
  { name: 'Itanagar', soilType: 'Sandy Soil', climate: 'Moderate Climate' },
  { name: 'Imphal', soilType: 'Loamy Soil', climate: 'Moderate Climate' },
  { name: 'Agartala', soilType: 'Clay Loam', climate: 'Moderate Climate' },
  { name: 'Kohima', soilType: 'Silt Loam', climate: 'Moderate Climate' },
  { name: 'Gangtok', soilType: 'Loamy Soil', climate: 'Moderate Climate' },
  { name: 'Panaji', soilType: 'Red Soil', climate: 'Hot Climate' },
  { name: 'Dharamshala', soilType: 'Sandy Loam', climate: 'Moderate Climate' },
  { name: 'Srinagar', soilType: 'Loamy Soil', climate: 'Cold Climate' },
  { name: 'Nagpur', soilType: 'Clay Soil', climate: 'Hot Climate' },
  { name: 'Bihar' , soilType: 'Loamy Soil', climate: 'Hot and Cold Climate'}
  // Add more cities as needed
];




const suggestCrops = (soilType, climate) => {
  if (soilType === 'Sandy Soil') {
    if (climate === 'Warm Climate') {
      return ['Rice', 'Maize', 'Millet'];
    } else if (climate === 'Hot Climate') {
      return ['Sorghum', 'Finger Millet', 'Pearl Millet'];
    }
  } else if (soilType === 'Clay Soil') {
    if (climate === 'Warm Climate') {
      return ['Wheat', 'Barley', 'Sunflower'];
    } else if (climate === 'Hot Climate') {
      return ['Soybeans', 'Peanuts', 'Lentils'];
    }
  } else if (soilType === 'Loamy Soil') {
    if (climate === 'Moderate Climate') {
      return ['Cotton', 'Sugarcane', 'Tobacco'];
    }
  } else if (soilType === 'Red Soil') {
    if (climate === 'Moderate Climate') {
      return ['Groundnut', 'Potato', 'Ginger'];
    } else if (climate === 'Hot Climate') {
      return ['Chili', 'Cotton', 'Oilseeds'];
    }
  } else if (soilType === 'Sandy Loam') {
    if (climate === 'Hot Climate') {
      return ['Watermelon', 'Pumpkin', 'Tomato'];
    }
  } else if (soilType === 'Clay Loam') {
    if (climate === 'Moderate Climate') {
      return ['Barley', 'Peas', 'Lentils'];
    }
  } else if (soilType === 'Silty Soil') {
    if (climate === 'Hot Climate') {
      return ['Barley', 'Wheat', 'Cotton'];
    }
  } else if (soilType === 'Laterite Soil') {
    if (climate === 'Hot Climate') {
      return ['Cashew', 'Coconut', 'Areca nut'];
    }
  } else if (soilType === 'Red Sandy Soil') {
    if (climate === 'Hot Climate') {
      return ['Paddy', 'Sugarcane', 'Groundnut'];
    }
  } else if (soilType === 'Black Soil') {
    if (climate === 'Hot Climate') {
      return ['Cotton', 'Soybeans', 'Sugarcane'];
    }
  } else if (soilType === 'Cold Climate Soil') {
    if (climate === 'Cold Climate') {
      return ['Apples', 'Almonds', 'Walnuts'];
    }
  }

  // Default crops if no suitable crops are found
  return ['No suitable crops found'];
};


function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedParameters, setSelectedParameters] = useState(null);
  const [suggestedCrops, setSuggestedCrops] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=1d9055f8c4fca9e2ebb2d276a7d3838b&units=metric`)
        .then(response => {
          setWeatherData({
            temp: response.data.main.temp,
            description: response.data.weather[0].description,
            imageURL: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
          });
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          setWeatherData(null);
        });
    }
  }, [selectedCity]);

  const handleParametersSubmit = (parameters) => {
    setSelectedParameters(parameters);
    const crops = suggestCrops(parameters.soilType, parameters.climate);
    setSuggestedCrops(crops);
  };

  const selectedCityData = citiesData.find((city) => city.name === selectedCity);

  return (
    <div className="app-container">
      <h1>Farming Calendar</h1>
      <CitySelector cities={citiesData} onSelectCity={setSelectedCity} />
      {selectedCityData && <CropPrediction predictedCrop={selectedCityData.predictedCrop} />}
      <FieldParametersForm onSubmit={handleParametersSubmit} />

      {selectedParameters && (
        <div>
          <h2>Selected Field Parameters</h2>
          <p>Soil Type: {selectedParameters.soilType}</p>
          <p>Climate: {selectedParameters.climate}</p>
          <p>Resources: {selectedParameters.resources}</p>
        </div>
      )}

      {weatherData && (
        <div>
          <h2>Weather in {selectedCity}</h2>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Description: {weatherData.description}</p>
          <img src={weatherData.imageURL} alt="Weather icon" />
        </div>
      )}

      {suggestedCrops.length > 0 && (
        <div>
          <h2>Suggested Crops</h2>
          <ul>
            {suggestedCrops.map((crop, index) => (
              <li key={index}>{crop}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;