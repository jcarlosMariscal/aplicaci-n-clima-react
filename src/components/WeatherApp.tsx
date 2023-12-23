import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export const WeatherApp = () => {
  const [city, setCity] = useState<string>("");
  const { fetchWeather, data } = useFetch(city);
  const difKelvin: number = 273.15;

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCity(e.target.value);
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.length > 0) fetchWeather();
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
          <p>
            Temperatura: {parseInt(String(data?.main?.temp - difKelvin))} °C
          </p>
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
