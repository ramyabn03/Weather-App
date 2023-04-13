import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Location from "./Components/Location";
import WeatherDetails from "./Components/WeatherDetails";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Location />} />
          <Route path="/weather-details" element={<WeatherDetails />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
