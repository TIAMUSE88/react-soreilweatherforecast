import Weather from "./Weather";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  const { weatherData } = props;

  return (
    <div className="WeatherInfo">
      <div className="row">
        <div className="col-12">
          <h1>{weatherData.city}</h1>
          <p>
            {weatherData.date} <span className="weather-details">•</span>{" "}
            {new Date(weatherData.time * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div className="row align-items-center">
            <div className="col-6">
              <WeatherTemperature temperature={weatherData.temperature} />
            </div>
            <div className="col-6 d-flex justify-content-center">
              <img
                src={weatherData.icon_url}
                alt={weatherData.condition}
                className="img-fluid icon"
              />
            </div>
          </div>
          <p className="text-capitalize">{weatherData.condition}..</p>
        </div>
        <div className="col-12 my-5">
          <div className="row text-center">
            <p className="col-6">
              <span className="weather-details">Humidity:</span>{" "}
              {weatherData.humidity}%
            </p>
            <p className="col-6">
              <span className="weather-details">Wind:</span> {weatherData.wind}{" "}
              km/h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
