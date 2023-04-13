import { Fragment } from "react";
import { VscLocation } from "react-icons/vsc";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsThermometerSun } from "react-icons/bs";
import { BsDropletHalf } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

function WeatherDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const weather = location.state;
  let weatherImgSrc = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <Fragment>
      <section className="app-container">
        <h3 className="weather-title flex-center">
          <BsArrowLeftShort
            className="arrow-left"
            onClick={() => navigate("/")}
          />
          Weather App
        </h3>
        <hr />
        <article className="weather-details">
          <img src={weatherImgSrc} alt="Weather view" />
          <p className="temperature">{`${Math.floor(
            weather?.main?.temp - 273
          )}°C`}</p>
          <p className="p-tag weather-desc">
            {weather?.weather[0].description}
          </p>
          <p className="p-tag flex-center">
            <VscLocation />
            {weather?.name}, {weather?.sys?.country}
          </p>
        </article>
        <article className="feels-humidity-row">
          <div className="left-colum feels-humidity-colum">
            <BsThermometerSun className="icon-style" />
            <p className="p-tag">
              {`${Math.floor(weather?.main?.feels_like - 273)}°C`}
              <br />
              <span>Feels like</span>
            </p>
          </div>
          <div className="feels-humidity-colum">
            <BsDropletHalf className="icon-style" />
            <p className="p-tag">
              {weather?.main?.humidity}&#37;
              <br />
              <span>Humidity</span>
            </p>
          </div>
        </article>
      </section>
    </Fragment>
  );
}

export default WeatherDetails;
