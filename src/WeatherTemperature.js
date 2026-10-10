import react, { useState } from "react";

export default function WeatherTemperature(props) {
  const { temperature } = props;
  const [unit, setUnit] = useState("celsius");

  function convertFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function convertCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <div className="WeatherTemperature">
        <h1 className="display-4 my-3">
          {Math.round(temperature)}
          <span className="unit">
            °C |{" "}
            <a href="/" onClick={convertFahrenheit}>
              °F
            </a>
          </span>
        </h1>
      </div>
    );
  } else {
    let fahrenheitTemperature = (temperature * 9) / 5 + 32;

    return (
      <div className="WeatherTemperature">
        <h1 className="display-4 my-3">
          {Math.round(fahrenheitTemperature)}
          <span className="unit">
            °F |{" "}
            <a href="/" onClick={convertCelsius}>
              °C
            </a>
          </span>
        </h1>
      </div>
    );
  }
}
