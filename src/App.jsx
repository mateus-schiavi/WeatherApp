import React, { useState, useEffect } from 'react';
import Left from './Components/Left/Left';
import Right from './Components/Right/Right';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchCity, setSearchCity] = useState('Suzano');
  const apiKey = 'b2c5a889695347dc4dc2328d28e4a837';

  useEffect(() => {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}&units=metric`;

    const fetchData = async () => {
      try {
        const [currentResponse, forecastResponse] = await Promise.all([
          fetch(currentWeatherUrl),
          fetch(forecastUrl),
        ]);

        if (currentResponse.ok && forecastResponse.ok) {
          const currentData = await currentResponse.json();
          const forecastData = await forecastResponse.json();

          setWeatherData(currentData);
          setForecastData(forecastData);

          console.log('Current Weather Data:', currentData);
          console.log('Forecast Data:', forecastData);
        } else {
          console.error('Error in API response');
        }
      } catch (error) {
        console.error('Error fetching data from the API', error);
      }
    };

    fetchData();
  }, [searchCity, apiKey]);

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
      />
    </div>
  );
}

export default App;
