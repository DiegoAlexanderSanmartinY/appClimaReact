import { useState } from "react";

export const WheaterApp = () => {

    const url = 'https://api.openweathermap.org/data/2.5/weather'; 
    const apiKey = '939f81d79b4d17e8c3d901cdeb22d9cb';
    const difKelvin = 273.15;


    const [city, setCity] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleChangeCity = (e) => {
        setCity(e.target.value.trim());
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(city.length > 0 ) fetchClima(city)
    }

    const onClick = (e) => {
        setCity('')
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${url}?q=${city}&appid=${apiKey}`)
            const data = await response.json();
            console.log(data)
            setDataClima(data)
        } catch (error) {
            console.error('Error: ', error)
        }
    }

  return (
    <div className="container">
      <h1>Wheater App</h1>
      <form onSubmit={ handleSubmit }>
          <input
            type="text"
            placeholder='Enter a city'
            value={city}
            onChange={handleChangeCity}
            onClick={onClick}
          />
        <button type="submit" >
          Search
        </button>
      </form>
      {
        dataClima && (
            <div>
                <h2>{dataClima.name}</h2>
                <p>Temperatura: { ((dataClima?.main?.temp) - difKelvin).toFixed(2) } C</p>
                <p>Condicion metereologica: {dataClima?.weather?.[0].main}</p>
                    <img src={` https://openweathermap.org/img/wn/${dataClima?.weather?.[0].icon}@2x.png`} alt="clima description" />
            </div>
        )
      }
    </div>
  );
};
