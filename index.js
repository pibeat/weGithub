//DATE

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let dates = now.getDate();

let months = [
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
  "December"
];
let month = months[now.getMonth()];
let years = now.getFullYear();
let hour = now.getHours();
let minute = now.getMinutes();

function currentDate() {
  let date = document.querySelector("#every-day");
  date.innerHTML = `${hour}.${minute} _ ${day}, ${dates} ${month}, ${years}`;
}
currentDate();

console.log(currentDate);

//weekdays

function nameDays(date) {
  let dates = new Date(date * 1000);
  let day = dates.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function weekForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weekdays");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (dayF) {
    forecastHtml =
      forecastHtml +
      `<div class="col">
  <br>
  <br>
  <div id="forecast-day">${nameDays(dayF.dt)}</div>
  <br>
  <img class="im" id="dimg_5"
      src="https://openweathermap.org/img/wn/${dayF.weather[0].icon}@2x.png">
</br>
<span id="temp_max">${Math.round(
        dayF.temp.max
      )}º</span>/<span id="temp_min">${Math.round(dayF.temp.min)}º</span>
</div>`;
  });
  forecastHtml = forecastHtml + `</div>`;

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weekForecast);
}
//

function changeCity(response) {
  document.querySelector("#country").innerHTML = response.data.name;
  let temperature = document.querySelector("#degrees");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let farTemp = document.querySelector("#fahrenheit");
  farTemp.innerHTML = Math.round((temperature.innerHTML * 9) / 5 + 32);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#descriptionweather").innerHTML =
    response.data.weather[0].main;
  let sunElement = document.querySelector("#icon-sun");
  sunElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  changeImage();

  getForecast(response.data.coord);
}

function replaceH1(city) {
  let apiKey = "ed238469f9b5e9d801834270e65449bc";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(changeCity);
}

function temperatureCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");

  replaceH1(city);
}

let searchForm = document.querySelector("#container-input");
searchForm.addEventListener("submit", temperatureCity);