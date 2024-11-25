const cityNameInput = document.getElementById("inputLabel");
const imgWeather = document.getElementById("img-of-weather");
const tempInput = document.getElementsByClassName("tempInput");
const detailInput = document.getElementById("detailCity");
const humidityInput = document.getElementById("degree-humidity");
const windInput = document.getElementById("wind");
const weatherIcon = document.getElementById("weather-icon");
const dayInput = document.getElementById("days");
const cityOutput = document.getElementById("cityNames");
const APIKey = "1732a9d86ff1913e09dd01beb311e578";
var days = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
];

let options = { month: "long", day: "numeric" };

async function getWeather() {
  var weatherResult = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&appid=${APIKey}&exclude={current}&lang=fa`
    )
  ).json();
  sendInfo(weatherResult);
}

function convertToCel(value) {
  return (value - 273).toFixed(0);
}
var date = new Date();
dateNew: date.setDate(date.getDate() + 5);

function sendInfo(data) {
  var cityName = data["name"];
  var temp = Math.round(data.main.temp);
  var detail = {
    cityName: data["name"],
    date: new Date(data.dt * 1000).toLocaleString("fa-IR", options).toString(),
    // .toLocaleDateString("fa-IR")
  };

  var wind = data["wind"]["speed"] + " km/h";
  var humidity = data.main.humidity + "%";

  // humidityInput
  cityOutput.innerHTML = `روزهای آینده ${cityName}`;
  tempInput[0].innerHTML = convertToCel(temp);
  detailInput.innerHTML = `${detail.cityName} ${detail.date}`;
  windInput.innerHTML = wind;
  humidityInput.innerHTML = humidity;

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "../../assest/img/cloud.svg";
  } else if (data.weather[0].main === "HighTemperature") {
    weatherIcon.src = "../../assest/img/high temperature.svg";
  } else if (data.weather[0].main === "Blizzard") {
    weatherIcon.src = "../../assest/img/blizzard_color";
  } else if (data.weather[0].main === "Fog") {
    weatherIcon.src = "../../assest/img/fog.svg";
  } else if (data.weather[0].main === "Hail") {
    weatherIcon.src = "../../assest/img/hail.svg";
  } else if (data.weather[0].main === "Moderate snow") {
    weatherIcon.src = "../../assest/img/moderate-snow.svg";
  } else if (data.weather[0].main === "Sandstorm") {
    weatherIcon.src = "../../assest/img/sandstorm.svg";
  } else if (data.weather[0].main === "Rainbow") {
    weatherIcon.src = "../../assest/img/rainbow.svg";
  } else if (data.weather[0].main === "Sunny") {
    weatherIcon.src = "../../assest/img/sunny_color.svg";
  } else if (data.weather[0].main === "SunCloudy") {
    weatherIcon.src = "../../assest/img/04_sun_cloudy_color.svg";
  } else if (data.weather[0].main === "MoonCloudy") {
    weatherIcon.src = "../../assest/img/moon-cloudy.svg";
  } else if (data.weather[0].main === "Dry") {
    weatherIcon.src = "../../assest/img/dry.svg";
  } else if (data.weather[0].main === "Blizzard_color") {
    weatherIcon.src = "../../assest/img/blizzard_color.svg";
  } else if (data.weather[0].main === "FullMoon") {
    weatherIcon.src = "../../assest/img/full moon.svg";
  } else if (data.weather[0].main === "PartlyCloudy") {
    weatherIcon.src = "../../assest/img/partly-cloudy.svg";
  } else if (data.weather[0].main === "Sunset") {
    weatherIcon.src = "../../assest/img/sunset_color.svg";
  } else if (data.weather[0].main === "Typhoon") {
    weatherIcon.src = "../../assest/img/typhoon_color.svg";
  } else if (data.weather[0].main === "Snow") {
    weatherIcon.src = "../../assest/img/snow_color.svg";
  } else if (data.weather[0].main === "Thunderstorm") {
    weatherIcon.src = "../../assest/img/thunderstorm.svg";
  } else if (data.weather[0].main === "Wet") {
    weatherIcon.src = "../../assest/img/wet.svg";
  } else if (data.weather[0].main === "Lightning") {
    weatherIcon.src = "../../assest/img/lightning_color.svg";
  } else if (data.weather[0].main === "Sun_cloudy") {
    weatherIcon.src = "../../assest/img/sun_cloudy.svg";
  } else {
    weatherIcon.src = "../../assest/img/moon_stars.svg";
  }
}

cityNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather(e);
  }
});
