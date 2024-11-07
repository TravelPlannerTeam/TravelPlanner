import axios from "axios";
import { useEffect, useState } from "react";
import { WEATHER_API_URL } from "../assets/API_URL";
import { WEATHER_API_TOKEN } from "../assets/API_URL";
import { Badge } from "@mantine/core";
import "./weather.css";

export default function Weather({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${WEATHER_API_URL}?key=${WEATHER_API_TOKEN}&q=${city}&days=1&aqi=no&alerts=no`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response);
      })
      .catch((e) => console.log("Error fetching Weather", e));
  }, [city]);
  if (weather !== null)
    return (
      <div className="weather-widget">
        <h2>{weather.current.temp_c}°C</h2>
        <p className="weather-description"> {weather.current.condition.text}</p>
        <div className="additional-info">
          <p>💨 Wind:{weather.current.wind_kph} m/s</p>
          <p>💦 Humidity: {weather.current.humidity}%</p>
        </div>
        <Badge size="sm" variant="light" color="cyan">
          Current weather in {weather.location.name}
        </Badge>
      </div>
    );
}
