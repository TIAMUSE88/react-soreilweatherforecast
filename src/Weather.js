import { useState } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      city: response.data.city,
      time: response.data.time,
      date: new Date(response.data.time * 1000).toLocaleDateString("en-UK", {
        weekday: "long",
      }),
      temperature: response.data.temperature.current,
      condition: response.data.condition.description,
      icon_url: `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`,
      humidity: response.data.temperature.humidity,
      icon: response.data.condition.icon,
      wind: response.data.wind.speed,
      precipitation: response.data.temperature.precipitation,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "9387af763ce4b20bcfo1t37b0bacd41e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row g-2 align-items-center">
              <div className="col-8 col-md-9">
                <input
                  type="search"
                  placeholder="Enter a city..."
                  className="form-control"
                  autoFocus="on"
                  onChange={handleCityChange}
                />
              </div>
              <div className="col-4 col-md-3">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-primary px-3"
                />
              </div>
            </div>
          </form>
          <WeatherInfo weatherData={weatherData} />
        </div>
      </div>
    );
  } else {
    search();

    return "Loading...";
  }
}
