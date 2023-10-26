import React, { useState, useEffect } from 'react';
import './Right.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const windDirectionMap = {
  0: 'N',
  45: 'NE',
  90: 'E',
  135: 'SE',
  180: 'S',
  225: 'SW',
  270: 'W',
  315: 'NW',
};

function Right({ weatherData, forecastData }) {
  if (!weatherData || !forecastData) {
    return (
      <div className='right-container'>
        <p>Loading...</p>
      </div>
    );
  }
  const [isCelsius, setIsCelsius] = useState(true);

  const handleCelsiusClick = () => {
    setIsCelsius(true);
  };

  const handleFahrenheitClick = () => {
    setIsCelsius(false);
  };


  const getWindDirection = (degrees) => {
    const closestDirection = Object.keys(windDirectionMap).reduce((prev, curr) =>
      Math.abs(curr - degrees) < Math.abs(prev - degrees) ? curr : prev
    );
    return windDirectionMap[closestDirection];
  };

  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDay = today.getDay() + 1;

  const [dailyForecasts, setDailyForecasts] = useState([]);

  useEffect(() => {
    if (forecastData && forecastData.list) {
      // Filter daily forecasts for the next five days
      const nextFiveDays = forecastData.list.filter((dayData, index) => index < 5);

      // Update the dailyForecasts state
      setDailyForecasts(nextFiveDays);
    }
  }, [forecastData]);

  return (
    <div className='right-container'>
      <div className='temperature-buttons'>
        <button className='button-celsius' onClick={handleCelsiusClick}>°C</button>
        <button className='button-fahrenheit' onClick={handleFahrenheitClick}>°F</button>
      </div>
      <div className='weather-images'>
        {dailyForecasts.map((dayData, index) => {
          const { temp_max, temp_min } = dayData.main;
          const forecastDate = new Date(dayData.dt * 1000);
          const dayName = dayNames[(currentDay + index) % 7];
          const weatherDescription = dayData.weather[0].description;

          const maxTempUnit = isCelsius ? '°C' : '°F';
          const minTempUnit = isCelsius ? '°C' : '°F';

          return (
            <div key={index} className='day-forecast'>
              <p>{dayName}</p>
              <img src={`https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`} alt={dayData.weather[0].description} />
              <div className='temperature-info'>
                <div>
                  <p>{temp_max.toFixed(0)}{maxTempUnit}</p>
                </div>
                <div>
                  <p> {temp_min.toFixed(0)}{minTempUnit}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='weather-container'>
        <div className='weather-info'>
          <div className='info-box wind-status'>
            <h3>Wind Status</h3>
            <p>{weatherData.wind.speed} mph</p>
            <FontAwesomeIcon icon={faArrowUp} rotation={weatherData.wind.deg === 0 ? 0 : (Math.round(weatherData.wind.deg / 90) * 90)} />
            {getWindDirection(weatherData.wind.deg)}
          </div>
          <div className='info-box humidity'>
            <h3>Humidity</h3>
            <p>{weatherData.main.humidity}%</p>
            <div className='progress-labels'>
              <span className="label-left">0%</span>
              <span className="label-middle">50%</span>
              <span className="label-right">100%</span>
            </div>
            <progress max="100" value={weatherData.main.humidity}></progress>
          </div>
          <div className='info-box visibility'>
            <h3>Visibility</h3>
            <p>{(weatherData.visibility / 1609.34).toFixed(2)} miles</p>
          </div>
          <div className='info-box air-pressure'>
            <h3>Air Pressure</h3>
            <p>{weatherData.main.pressure} mb</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Right.propTypes = {
  weatherData: PropTypes.object,
  forecastData: PropTypes.object,
  isCelsius: PropTypes.bool, // Change to bool since it represents a boolean value
};

export default Right;
