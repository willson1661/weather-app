import "./styles.css";
import axios from "axios";

import img1 from "./newimages/5.png";
import img2 from "./newimages/1.png";
import img3 from "./newimages/7.png";
import img5 from "./newimages/9.png";
import img6 from "./newimages/12.png";
import img4 from "./newimages/13.png";

import img7 from "./newimages/14.png";
import img8 from "./newimages/15.jpg";

import { useState } from "react";

export default function App() {
  const [data, setData] = useState({
    celcius: 304,
    name: "Hyderabad",
    humidity: 10,
    speed: 2,
    image: img1,
    main: "Clouds",
  });
  const [name, setName] = useState("");
  const handleClick = (e) => {
    if (name !== "") {
      e.preventDefault();
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=f00c38e0279b7bc85480c3fe775d518c`;
      axios
        .get(apiUrl)
        .then((weather) => {
          let imagePath = "";
          if (weather.data.weather[0].main === "Clouds") {
            imagePath = img1;
          } else if (weather.data.weather[0].main === "Sky") {
            imagePath = img2;
          } else if (weather.data.weather[0].main === "Clear") {
            imagePath = img2;
          } else if (weather.data.weather[0].main === "Rain") {
            imagePath = img3;
          } else if (weather.data.weather[0].main === "Drizzle") {
            imagePath = img5;
          } else if (weather.data.weather[0].main === "Smoke" || "Haze") {
            imagePath = img6;
          } else {
            imagePath = img1;
          }
          setData({
            ...data,
            celcius: weather.data.main.temp,
            name: weather.data.name,
            humidity: weather.data.main.humidity,
            speed: weather.data.wind.speed,

            image: imagePath,
            main: weather.data.weather[0].description,
          });
        })

        .catch((err) => console.log(err));
    }
  };

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();

    const date = `${WeekDays[currentDate.getDay()]}, ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    } `;
    return date;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="weather_app">
          <div className="input_1">
            <form id="myGeeks" onClick={handleClick}>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setName(e.target.value)}
                autocomplete="on"
                id="text_id"
                name="fname"
              />

              <img
                className="img8"
                alt="aer"
                src={img8}
                onClick={handleClick}
              />
              <input className="t11" type="submit" />

              <img className="img_1" alt="aeb" src={data.image} />

              <div className="date">
                <span>{toDateFunction()} </span>
              </div>
              <h4>{data.main.toUpperCase()}</h4>

              <h1>{Math.round(data.celcius - 273.15)}°C</h1>
              <h2>{data.name}</h2>

              <img className="img4" alt="aej" src={img4} />
              <div className="humidity">
                <h3 className="h3_1">{Math.round(data.humidity)}%</h3>
                <h3>Humidity</h3>
              </div>
              <img className="img7" alt="aek" src={img7} />
              <div className="wind">
                <h3 className="h3_2">{Math.round(data.speed * 3.6)} Km/h</h3>
                <h3>Wind Speed</h3>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
