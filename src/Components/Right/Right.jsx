import React from 'react';
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

function Right({ weatherData }) {
    if (!weatherData) {

        return (
            <div className='right-container'>
                <p>Loading...</p>
                {/* Outros elementos de interface de usuário padrão */}
            </div>
        );
    }

    const getWindDirection = (degrees) => {
        const closestDirection = Object.keys(windDirectionMap).reduce((prev, curr) =>
            Math.abs(curr - degrees) < Math.abs(prev - degrees) ? curr : prev
        );
        return windDirectionMap[closestDirection];
    };

    return (
        <div className='right-container'>
            <div className='temperature-buttons'>
                <button className='button-celsius'>°C</button>
                <button className='button-fahrenheit'>°F</button>
            </div>
            <div className='weather-container'>
                <div className='weather-info'>
                    <div className='info-box wind-status'>
                        <h3>Wind Status</h3>
                        <p>{weatherData.wind.speed} mph</p>
                        <FontAwesomeIcon icon={faArrowUp} rotation={weatherData.wind.deg} />
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
};

export default Right;
