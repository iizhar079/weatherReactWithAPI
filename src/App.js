import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import Icon from "./download.jpg";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [ country,setCountry] = useState();
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();

  const apiKey = "f56f24967aaf51182d1d4df628297c6d";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
      });
  };

  function handleCountry(event) {
    setCountry(event.target.value);
    setCities(countries.find((ctr) => ctr.name === event.target.value).states);
  }
  const handleLocationChange = (e) => {
    setCity(e.target.value);
  };

  const countries = [
    {
      name: "Pakistan",
      states: [
        {
          name: "Swabi",
        },
        {
          name: "Mardan",
        },
      ],
    },
    {
      name: "India",
      states: [
        {
          name: "Panvel",
        },
        {
          name: "Mumbai",
        },
      ],
    },
  ];

  return (
    <div className="col-md-12">
    <h1 className=" text-white heading">Weather App with Drop-Down</h1>
      <form onSubmit={handleSubmit} className="col-md-12 text-center  mt-5">
        <div className="slct">
          <select onChange={handleCountry} className="form-select w-25 text-white bg-dark">
            <option>Select Countries</option>
            {countries.map((ctr) => (
              <option value={ctr.name}>{ctr.name}</option>
            ))}
          </select>
          <select
            onChange={handleLocationChange}
            className="form-select w-25 slct1 bg-dark text-white "
          >
            <option>Select City</option>
            {cities.map((c) => (
              <option value={city}>{c.name}</option>
            ))}
          </select>
        </div>
        <br />
        <button type="submit" className="btn btn-outline-dark text-white">
          Check Weather
        </button>
      </form>

      {Object.keys(weatherData).length > 0 && (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded wetherResultBox">
            <img className="weathorIcon" src={Icon} alt="\weather-Icon" />

            <h5 className="weathorCity">{weatherData?.name}</h5>
            <h6 className="weathorTemp">
              {weatherData.main ? (
                <p className="bold">
                  {(weatherData.main.feels_like - 273).toFixed()}°C
                </p>
              ) : null}
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
