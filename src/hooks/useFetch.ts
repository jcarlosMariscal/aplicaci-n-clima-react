import { useState } from "react";
import { DataAPI } from "../types/WeatherResponse";
import { weatherKeys } from "../helpers/weatherKeys";

export const useFetch = (city: string) => {
  const { url, API_KEY } = weatherKeys();
  const [data, setDataWeather] = useState<DataAPI>();
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
  return { fetchWeather, data };
};
