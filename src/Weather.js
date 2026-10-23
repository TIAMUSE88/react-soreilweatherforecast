import { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    search(city);
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search(searchCity) {
    const apiKey = "9387af763ce4b20bcfo1t37b0bacd41e";
    const query = `query=${encodeURIComponent(searchCity)}&key=${apiKey}&units=metric`;
    const currentUrl = `https://api.shecodes.io/weather/v1/current?${query}`;
    const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?${query}`;

    setWeatherData({ ready: false });
    setError("");
    Promise.all([axios.get(currentUrl), axios.get(forecastUrl)])
      .then(([currentResponse, forecastResponse]) => {
        const current = currentResponse.data;
        setWeatherData({
          ready: true,
          city: current.city,
          time: current.time,
          date: new Date(current.time * 1000).toLocaleDateString("en-GB", {
            weekday: "long",
          }),
          temperature: current.temperature.current,
          condition: current.condition.description,
          icon_url: `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${current.condition.icon}.png`,
          humidity: current.temperature.humidity,
          wind: current.wind.speed,
          precipitation: current.temperature.precipitation,
          forecast: forecastResponse.data.daily.slice(0, 5).map((day) => ({
            date: day.time,
            condition: day.condition.description,
            icon_url: `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${day.condition.icon}.png`,
            high: day.temperature.maximum,
            low: day.temperature.minimum,
          })),
        });
      })
      .catch(() => {
        setError("Could not load weather for that city. Please try again.");
      });
  }

  useEffect(() => {
    search(props.defaultCity);
  }, [props.defaultCity]);

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!weatherData.ready) {
    return <p>Loading...</p>;
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
                  value={city}
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
          <WeatherForecast forecast={weatherData.forecast} />
        </div>
      </div>
    );
  }
}
