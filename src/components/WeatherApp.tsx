import { useState } from "react";

export const WeatherApp = () => {
  const url: string = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY: string = "3f3c92e9e324fe90cb28f8697eb0806e";
  const difKelvin: number = 273.15;

  const [city, setCity] = useState("");
  const [data, setDataWeather] = useState(null);

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    // console.log(e);
  };
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.length > 0) fetchWeather();
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${url}?q=${city}&appid=${API_KEY}`);
      const data = await response.json();
      console.log(data);

      setDataWeather(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <h1>Aplicación del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleChangeCity} />
        <button type="submit">Buscar</button>
      </form>
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>Temperatura: {parseInt(data?.main?.temp - difKelvin)} °C</p>
          <p>Condición Metereólogica: {data.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt=""
          />
        </div>
      )}
    </div>
  );
};
