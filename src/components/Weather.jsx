import axios from "axios";
import { useEffect, useState } from "react";
import { WEATHER_API_URL } from "../assets/API_URL";
import { WEATHER_API_TOKEN } from "../assets/API_URL";
import { Badge } from "@mantine/core";
import "./weather.css";

export default function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(`${WEATHER_API_URL}?city=${city}&key=${WEATHER_API_TOKEN}`)
      .then((response) => {
        setWeatherData(response.data.data[0]);
        console.log(response);
      })
      .catch((e) => console.log("Error fetching Weather", e));
  }, [city]);
  if (weatherData !== null)
    return (
      <div className="weather-widget">
        <h2>{weatherData.temp}°C</h2>
        <p className="weather-description">
          {" "}
          {weatherData.weather.description}
        </p>
        <div className="additional-info">
          <p>💨 Wind: {weatherData.wind_spd} m/s</p>
          <p>💦 Humidity: {weatherData.rh}%</p>
        </div>
        <Badge size="sm" variant="light" color="cyan">
          Current weather in {weatherData.city_name}
        </Badge>
      </div>
    );
}
