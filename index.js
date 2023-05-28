/** @format */

document.addEventListener("DOMContentLoaded", function () {
  let searchBtn = document.querySelector(".searchBtn");
  searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let cityName = document.getElementById("city-input").value;
    weather(cityName);
  });

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

  function weather(cityName) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios.get(apiUrl).then(function (response) {
      WeatherData(response);
    });
  }
  function WeatherData(response) {
    let weather = response.data;
    let temperature = Math.round(weather.main.temp);
    let description = weather.weather[0].main;
    let humidity = weather.main.humidity;
    let windSpeed = weather.wind.speed;
    let city = document.querySelector("#city");
    city.innerHTML = weather.name;
    let temp = document.querySelector("#temperature");
    temp.innerHTML = temperature.toString().slice(0, 2) + "ºC";
    let desc = document.querySelector("#weather-description");
    desc.innerHTML = description;
    let forhumidity = document.querySelector("#humidity");
    forhumidity.innerHTML = "Humidity: " + Math.round(humidity) + "%";
    let forwind = document.querySelector("#wind");
    forwind.innerHTML = "Wind: " + Math.round(windSpeed) + "km/h";
    let weatherIcon = document.querySelector("#weather-icon");
    if (temperature < 10) {
      weatherIcon.innerHTML = "❄";
    } else if (temperature >= 10 && temperature < 25) {
      weatherIcon.innerHTML = "🌤";
    } else {
      weatherIcon.innerHTML = "⛈";
    }
  }

  let currentBtn = document.querySelector(".currentBtn");
  currentBtn.addEventListener("click", function (event) {
    event.preventDefault();
    getCurrentLocation();
  });

  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getCurrentWeather(latitude, longitude);
  }

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function getCurrentWeather(latitude, longitude) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    axios.get(apiUrl).then(function (response) {
      WeatherData(response);
    });
  }
});
