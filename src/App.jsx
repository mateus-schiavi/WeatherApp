import React, { useState, useEffect } from 'react';
import Left from './Components/Left/Left';
import Right from './Components/Right/Right';

const apiKey = '26ed082640d97b5f0061ec58b8c12cd6';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [searchCity, setSearchCity] = useState('Suzano');
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
        const currentResponse = await fetch(currentWeatherUrl);

        if (currentResponse.ok) {
          const currentData = await currentResponse.json();
          setWeatherData(currentData);
          console.log('Current Weather Data:', currentData);

          const { coord: { lat, lon } } = currentData;
          fetchForecastData(lat, lon);
        } else {
          console.error('Error in current weather API response');
        }
      } catch (error) {
        console.error('Error fetching current weather data', error);
      }
    };

    const fetchForecastData = async (lat, lon) => {
      try {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
    
        if (forecastResponse.ok) {
          const forecastData = await forecastResponse.json();
          console.log('Forecast Data:', forecastData); // Log the data
          setForecastData(forecastData);
        } else {
          console.error('Error in forecast API response');
        }
      } catch (error) {
        console.error('Error fetching forecast data', error);
      }
    };

    fetchWeatherData();
  }, [searchCity]);

  return (
    <div>
      <Left
        weatherData={weatherData}
        searchCity={searchCity}
        setSearchCity={setSearchCity}
      />
      <Right
        weatherData={weatherData}
        forecastData={forecastData}
        isCelsius={isCelsius}
      />
    </div>
  );
}

export default App;
