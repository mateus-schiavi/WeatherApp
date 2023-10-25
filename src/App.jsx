import React, { useState, useEffect } from 'react';
import Left from './Components/Left/Left';
import Right from './Components/Right/Right';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState('Suzano');
  const apiKey = '4e953b5fbb8c2fc08be901d59abea176';

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);

          console.log('Dados da cidade pesquisada:', data);
        } else {
          console.error('Erro na resposta da API');
        }
      } catch (error) {
        console.error('Erro ao buscar dados da API', error);
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
      <Right weatherData={weatherData} />
    </div>
  );
}

export default App;
