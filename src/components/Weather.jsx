import axios from "axios";
import { useEffect, useState } from "react";
import { WEATHER_API_URL } from "../assets/API_URL";
import { WEATHER_API_TOKEN } from "../assets/API_URL";

export default function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  const Apikey = "078f0f6d0f3a4805b3660728af344b64";
  const widgetStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#4a90e2",
    color: "#ffffff",
    width: "150px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const tempStyles = {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: "5px 0",
  };

  const additionalInfoStyles = {
    fontSize: "0.8rem",
    marginTop: "5px",
  };
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
      <div style={widgetStyles}>
        <h3>{weatherData.city_name}</h3>
        <div style={tempStyles}>{weatherData.temp}°C</div>
        <p>{weatherData.weather.description}</p>
        <div style={additionalInfoStyles}>
          <p>Wind: {weatherData.wind_spd} m/s</p>
          <p>Humidity: {weatherData.rh}%</p>
        </div>
      </div>
    );
}
