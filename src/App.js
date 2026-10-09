import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center my-5">Soreil Weather-Forecast App</h1>
        <Weather defaultCity="Miami" />
        <footer>
          This was coded by{" "}
          <em>
            {" "}
            <a
              href="https://www.linkedin.com/in/traceymarie88/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tracey-Marie
            </a>
          </em>
          . Open Sourced on{" "}
          <a
            href="https://github.com/TIAMUSE88/react-soreilweatherforecast"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github.
          </a>
        </footer>
      </div>
    </div>
  );
}
