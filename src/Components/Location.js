import { Fragment, useState, useEffect } from "react";
import "./styles.css";
import { useOnKeyEnter } from "../Hooks/useOnKeyEnter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";

function Location() {
  const [city, setCity] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function submitHandler() {
    setCity(currentCity);
    setCurrentCity("");
  }
  useOnKeyEnter(submitHandler, "Enter");

  // const getDeviceLocation = async () => {
  //   setLoading(true);
  //   await axios
  //     .get("https://ipapi.co/json")
  //     .then((res) => {
  //       let location = res.data;
  //       setCity(location.city);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // };
  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localitylanguage=en`;
    setLoading(true);
    fetch(geoApiUrl)
      .then((res) => res.json())
      .then((data) => {
        setCity(data.city);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Location.");
        break;

      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;

      case error.TIMEOUT:
        alert("The request to get device location timed out.");
        break;

      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;

      default:
        alert("An unknown error occurred.");
    }
  };

  useEffect(() => {
    if (city !== "") {
      setIsError(false);
      setLoading(true);
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`;
      axios
        .get(apiUrl)
        .then((res) => {
          navigate("weather-details", { state: res.data });
          setCity("");
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("Invalid City Name!");
            setIsError(true);
            setLoading(false);
          } else {
            setError("");
          }
        });
    }
  }, [city, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <section className="app-container">
          <h3 className="weather-title">Weather App</h3>
          <hr />
          <input
            type="text"
            value={currentCity}
            placeholder="Enter city name"
            onChange={(e) => setCurrentCity(e.target.value)}
          />
          {isError && <p className="error-msg">{error}</p>}
          <p className="or-btwn-line">
            <span>or</span>
          </p>
          <button onClick={getDeviceLocation}>Get Device Location</button>
        </section>
      )}
    </Fragment>
  );
}

export default Location;
