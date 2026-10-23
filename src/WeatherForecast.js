export default function WeatherForecast({ forecast }) {
  return (
    <div className="WeatherForecast">
      <div className="row row-cols-2 row-cols-md-5 text-center g-3">
        {forecast.map((day) => (
          <div className="col" key={day.date}>
            <div className="WeatherForecast-Day">
              <div>
                {new Date(day.date * 1000).toLocaleDateString("en-GB", {
                  weekday: "short",
                })}
              </div>
              <img
                src={day.icon_url}
                alt={day.condition}
                className="WeatherForecast-icon"
              />
              <div className="WeatherForecast-temp">
                <strong>{Math.round(day.high)}°</strong>
                <span className="text-muted"> | {Math.round(day.low)}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
