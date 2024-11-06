import axios from "axios";
import { useEffect, useState } from "react";
import { WEATHER_API_URL } from "../assets/API_URL";
import { WEATHER_API_TOKEN } from "../assets/API_URL";

export default function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  const widgetStyles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContenet: "space-between",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#4a90e2",
    color: "#ffffff",
    width: "30vw",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    marginLeft: "70vw",
  };

  const tempStyles = {
    fontSize: "1rem",
    fontWeight: "bold",
    margin: "0 1em",
  };

  const additionalInfoStyles = {
    fontSize: "0.8rem",
    margin: "0 2em",
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
