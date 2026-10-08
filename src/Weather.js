import React from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  function handleResponse(response) {
    console.log(response.data);
  }

  const apiKey = "9387af763ce4b20bcfo1t37b0bacd41e";
  const city = "Miami";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleResponse);
  console.log(apiUrl);
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
            <h1>Miami, Florida</h1>
            <p>
              Tuesday, July 27 <span className="weather-details">•</span> 10:11
              PM
            </p>
            <div className="row align-items-center">
              <div className="col-6">
                <h1 className="display-4 my-3">
                  22<span className="unit">°C</span>
                </h1>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <img
                  src="https://thumbs.dreamstime.com/b/d-sunny-weather-icon-isolated-white-background-d-illustration-sunny-weather-icon-isolated-white-background-perfect-355450240.jpg"
                  alt="Sunny"
                  className="img-fluid icon"
                />
              </div>
            </div>
            <p> Mostly sunny (Clear)</p>
          </div>
          <div className="col-12 my-5">
            <div className="row text-center">
              <p className="col-4">
                <span className="weather-details">Humidity:</span> 60%
              </p>
              <p className="col-4">
                <span className="weather-details">Wind:</span> 5 km/h
              </p>
              <p className="col-4">
                <span className="weather-details">Precipitation:</span> 7%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
