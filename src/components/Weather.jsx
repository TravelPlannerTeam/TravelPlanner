import axios from "axios";
import { useEffect, useState } from "react";
import { ActionIcon, Badge, Popover, Text } from "@mantine/core";
import { IconSun } from "@tabler/icons-react";

import { WEATHER_API_URL } from "../assets/API_URL";
import { WEATHER_API_TOKEN } from "../assets/API_URL";
import "./weather.css";

export default function Weather({ city }) {
  const [weather, setWeather] = useState(null);
  const [opened, setOpened] = useState(false);

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
      <div>
        {/* Overlay for dark background when popover is open */}
        {opened && (
          <div
            className="popover-overlay"
            onClick={() => setOpened(false)}
          ></div>
        )}
        {/* Only show this button in mobile view */}
        <div className="mobile-weather-button">
          <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom-end"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <ActionIcon
                variant="filled"
                color="yellow"
                radius="md"
                size="xl"
                aria-label="Toggle weather"
                onClick={() => setOpened((o) => !o)}
              >
                <IconSun style={{ width: "70%", height: "70%" }} stroke={1.2} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown
              className="weather-widget-dropdown"
              style={{ borderRadius: "1em" }}
            >
              <div className="weather-widget-dropdown">
                <h2>{weather.current.temp_c}°C</h2>
                <p className="weather-description">
                  {weather.current.condition.text}
                </p>
                <div className="additional-info">
                  <p>💨 Wind: {weather.current.wind_kph} m/s</p>
                  <p>💦 Humidity: {weather.current.humidity}%</p>
                </div>
                <Badge size="sm" variant="light" color="cyan">
                  Current weather in {weather.location.name}
                </Badge>
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>

        {/* Weather widget for desktop view */}
        <div className="weather-widget">
          <h2>{weather.current.temp_c}°C</h2>
          <p className="weather-description">
            {" "}
            {weather.current.condition.text}
          </p>
          <div className="additional-info">
            <p>💨 Wind:{weather.current.wind_kph} m/s</p>
            <p>💦 Humidity: {weather.current.humidity}%</p>
          </div>
          <Badge size="sm" variant="light" color="cyan">
            Current weather in {weather.location.name}
          </Badge>
        </div>
      </div>
    );
}
