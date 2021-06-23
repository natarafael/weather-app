import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  TiWeatherPartlySunny,
  TiWeatherSunny,
  TiWeatherStormy,
  TiWeatherShower,
  TiWeatherDownpour,
  TiWeatherSnow,
  TiWeatherCloudy,
} from "react-icons/ti";

import "./Weather.css";

const Weather = () => {
  const [localization, SetLocalization] = useState({
    city: "Foz do Iguaçu",
    country: "br",
  });
  const [weather, setWeather] = useState({
    city: undefined,
    country: undefined,
    icon: undefined,
    id: undefined,
    temp: undefined,
    temp_max: null,
    temp_min: null,
    description: "",
    humidity: undefined,
    feelslike: undefined,
    sunset: undefined,
    sunrise: undefined,
    error: false,
  });
  //   const [localization, SetLocalization]

  const API_key = "6c2d30f0b1db064a946b8daca26bba69";

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${localization.city},${localization.country}&appid=${API_key}`
      );

      const country = JSON.parse(JSON.stringify(response.data.sys.country));
      const id = JSON.parse(JSON.stringify(response.data.weather[0].id));
      const temp = JSON.parse(JSON.stringify(response.data.main.temp));
      const tempMax = JSON.parse(JSON.stringify(response.data.main.temp_max));
      const tempMin = JSON.parse(JSON.stringify(response.data.main.temp_min));
      const description = JSON.parse(
        JSON.stringify(response.data.weather[0].description)
      );
      const humidity = JSON.parse(JSON.stringify(response.data.main.humidity));
      const feelslike = JSON.parse(
        JSON.stringify(response.data.main.feels_like)
      );
      const sunset = JSON.parse(JSON.stringify(response.data.sys.sunset));
      const sunrise = JSON.parse(JSON.stringify(response.data.sys.sunrise));

      setWeather({
        city: response.data.name,
        country: country,
        id: id,
        temp: temp,
        temp_max: tempMax,
        temp_min: tempMin,
        description: description,
        humidity: humidity,
        feelslike: feelslike,
        sunset: sunset,
        sunrise: sunrise,
        error: false,
      });
    };
    fetchWeatherData();
  }, [localization]);

  console.log(weather);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.elements.city.value && e.target.elements.country.value) {
      SetLocalization({
        city: e.target.elements.city.value,
        country: e.target.elements.country.value,
      });
    }
    e.target.elements.city.value = "";
    e.target.elements.country.value = "";
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Cidade" name="city"></input>
          <input type="text" placeholder="País" name="country"></input>
          <br />
          <button>Procurar</button>
        </form>
      </div>
      <div className="container">
        <div className="cards">
          <h1>{weather.city}</h1>

          <h5>{handleIcon(weather.id)}</h5>

          <h1>{Math.floor(weather.temp - 273.15)}&deg;</h1>
          {minmaxtemp(weather.temp_min, weather.temp_max)}

          <h4>{weather.description}</h4>
        </div>
      </div>
    </div>
  );
};

export default Weather;

// funcoes complementares

function minmaxtemp(min, max) {
  return (
    <h3>
      <span className="px-4">{Math.floor(min - 273.15)}&deg;</span>
      <span className="px-4">{Math.floor(max - 273.15)}&deg;</span>
    </h3>
  );
}

function handleIcon(rangeID) {
  if (rangeID >= 200 && rangeID < 232) {
    return <TiWeatherStormy />;
  }
  if (rangeID >= 300 && rangeID <= 321) {
    return <TiWeatherShower />;
  }
  if (rangeID >= 500 && rangeID <= 521) {
    return <TiWeatherDownpour />;
  }
  if (rangeID >= 600 && rangeID <= 622) {
    return <TiWeatherSnow />;
  }
  if (rangeID >= 701 && rangeID <= 781) {
    return <TiWeatherPartlySunny />;
  }
  if (rangeID === 800) {
    return <TiWeatherSunny />;
  }
  if (rangeID >= 801 && rangeID <= 804) {
    return <TiWeatherCloudy />;
  }
  return <TiWeatherCloudy />;
}

// var sec = 1425909686;
// var date = new Date(sec * 1000);
// var timestr = date.toLocaleTimeString();

// console.log(date, timestr);
