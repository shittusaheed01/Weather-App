import React, { useState } from "react";
import "./index.css";
// Api codes
const api = {
  key: "dd09061fe055f8e6ab64bdc8ce61af00",
  base: "http://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [value, setValue] = useState("");
  const [weather, setWeather] = useState({});

  // fetches data
  const search = (e) => {
    if (e.key === "Enter") {
      console.log(value)
      fetch(`${api.base}weather?q=${value}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then(
          (result) => setWeather(result),
          setValue(""),
        );
    }
  };
  // gets date
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = new Date();
  const weekday = today.getDay();
  var dayName = days[weekday];
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  return (
    <main className={typeof weather.main != "undefined" ? ((Math.round(weather.main.temp)) > 16 ? "warm" : "cold" ) : ("")}>
      <div className="container">
        <p className="time">{`${dayName} ${day}/${month + 1}/${year}`}</p>
        {typeof weather.main != "undefined" ? (
          <div className="details">
            <p className="city">{`${weather.name}, ${weather.sys.country}`}</p>
          </div>
        ) : (
          " "
        )}

        <div className="input-div">
          <input
            type="text"
            placeholder="Enter City"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="weather">
            <p className="temp"> Temperature: {Math.round(weather.main.temp)}° </p>
            <p className="condition">Weather: {weather.weather[0].description}</p>
          </div>
        ) : (
          " "
        )}
      </div>
    </main>
  );
};

export default App;
