import React, { useState } from 'react';
import './Left.css';
import PropTypes from 'prop-types';
import { addDays, format, getMonth } from 'date-fns';

function Left({ weatherData, searchCity, setSearchCity }) {
    const [newCity, setNewCity] = useState('');
    const tomorrow = addDays(new Date(), 1);
    const today = new Date(); // Adicione isso para obter a data atual

    const handleSearch = async () => {
        if (newCity.trim() !== '') {
            setSearchCity(newCity);
        }
    };

    if (!weatherData || weatherData.name !== searchCity) {
        return (
            <div className='left-container'>
                <div className='left-side'>
                    <div className='input'>
                        <input
                            type="text"
                            placeholder='Search for places'
                            onChange={(e) => setSearchCity(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='left-container'>
            <div className='left-side'>
                <div className='input'>
                    <input
                        type="text"
                        placeholder='Search for places'
                        onChange={(e) => setSearchCity(e.target.value)}
                    />
                </div>
                <div>
                    <img
                        className='image'
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                        alt="weather image"
                    />
                </div>
                <div>
                    <span className='temperature'><h2>{Math.round(weatherData.main.temp)}°C</h2></span>
                </div>
                <div className='description'>
                    <p>{weatherData.weather[0].description}</p>
                </div>
                <div className='place'>
                    <div className='date'>
                       Today {format(today, 'MMM d')} {/* Formate a data atual como Mês e Dia */}
                    </div>
                    <div className='city'>{weatherData.name}</div>
                </div>
            </div>
        </div>
    );
}

Left.propTypes = {
    weatherData: PropTypes.object,
    searchCity: PropTypes.string.isRequired,
    setSearchCity: PropTypes.func.isRequired,
};

export default Left;
