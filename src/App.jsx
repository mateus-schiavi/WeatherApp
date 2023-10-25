import React, { useState, useEffect } from 'react';
import Left from './Components/Left/Left';
import Right from './Components/Right/Right';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [forecastDataFiveDays, setForecastDataFiveDays] = useState(null);
  const [searchCity, setSearchCity] = useState('Suzano');
  const apiKey = '9173b14f8f0405e63830c31b389b0bc0'; // Replace with your API key

  useEffect(() => {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}&units=metric`;
    const forecastUrlFiveDays = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${searchCity}&appid=${apiKey}&units=metric&cnt=5`;

    const fetchData = async () => {
      try {
        const [currentResponse, forecastResponse, forecastResponseFiveDays] = await Promise.all([
          fetch(currentWeatherUrl),
          fetch(forecastUrl),
          fetch(forecastUrlFiveDays),
        ]);

        if (currentResponse.ok && forecastResponse.ok) {
          const currentData = await currentResponse.json();
          const forecastData = await forecastResponse.json();
          const forecastDataFiveDays = await forecastResponseFiveDays.json();

          setWeatherData(currentData);
          setForecastData(forecastData);
          setForecastDataFiveDays(forecastDataFiveDays);

          console.log('Current Weather Data:', currentData);
          console.log('Forecast Data:', forecastData);
          console.log('Forecast Data for Five Days:', forecastDataFiveDays);
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
        forecastDataFiveDays={forecastDataFiveDays} // Pass the new state to the Right component
      />
    </div>
  );
}

export default App;
