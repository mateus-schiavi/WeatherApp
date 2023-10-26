import React, { useState, useEffect } from 'react';
import './Left.css';
import PropTypes from 'prop-types';
import { addDays, format } from 'date-fns';

function Left({ weatherData, searchCity, setSearchCity }) {
    const [newCity, setNewCity] = useState('Suzano');
    const tomorrow = addDays(new Date(), 1);
    const today = new Date();
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (newCity.trim() !== '') {
            setSearchCity(newCity);
            setSearched(true);
        }
    };

    const handleInputChange = (e) => {
        setNewCity(e.target.value);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div className='left-container'>
            <div className='left-side'>
                <div className='input'>
                    <input
                        type="text"
                        placeholder='Search for places'
                        value={newCity}
                        onChange={handleInputChange}
                        onKeyPress={handleInputKeyPress}
                    />
                </div>
                {searched && weatherData && weatherData.weather ? (
                    <>
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
                                Today {format(today, 'MMM d')}
                            </div>
                            <div className='city'>{weatherData.name}</div>
                        </div>
                    </>
                ) : null}
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