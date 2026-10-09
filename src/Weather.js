import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  function handleResponse(response) {
    console.log(response.data);

    setWeatherData({
      ready: true,
      city: response.data.city,
      time: response.data.time,
      date: new Date(response.data.time * 1000).toLocaleDateString("en-US", {
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

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="container">
          <form>
            <div className="row g-2 align-items-center">
              <div className="col-8 col-md-9">
                <input
                  type="search"
                  placeholder="Enter a city..."
                  className="form-control"
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

          <div className="row">
            <div className="col-12">
              <h1>Miami</h1>
              <p>
                {weatherData.date} <span className="weather-details">•</span>{" "}
                {new Date(weatherData.time * 1000).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div className="row align-items-center">
                <div className="col-6">
                  <h1 className="display-4 my-3">
                    {Math.round(weatherData.temperature)}
                    <span className="unit">°C | °F</span>
                  </h1>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <img
                    src={weatherData.icon_url}
                    alt={weatherData.condition}
                    className="img-fluid icon"
                  />
                </div>
              </div>
              <p className="text-capitalize"> {weatherData.condition}..</p>
            </div>
            <div className="col-12 my-5">
              <div className="row text-center">
                <p className="col-4">
                  <span className="weather-details">Humidity:</span>{" "}
                  {weatherData.humidity}%
                </p>
                <p className="col-4">
                  <span className="weather-details">Wind:</span>{" "}
                  {weatherData.wind} km/h
                </p>
                <p className="col-4">
                  <span className="weather-details">Precipitation:</span>{" "}
                  {weatherData.precipitation}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "9387af763ce4b20bcfo1t37b0bacd41e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    console.log(apiUrl);

    return "Loading...";
  }
}
