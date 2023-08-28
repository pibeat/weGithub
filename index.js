

//DATE

let now = new Date;

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

function currentDate(){
    let date = document.querySelector("#every-day");
    date.innerHTML =`${hour}.${minute} _ ${day}, ${dates} ${month}, ${years}`;
}

currentDate();

console.log(currentDate);


////
function changeCity(response) {
  document.querySelector("#country").innerHTML = response.data.name;
  let temperature = document.querySelector("#degrees");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
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
