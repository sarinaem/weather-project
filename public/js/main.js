const cityNameInput = document.getElementById("inputLabel");
const imgWeather = document.getElementById("img-of-weather");
const tempInput = document.getElementsByClassName("tempInput");
const detailInput = document.getElementById("detailCity");
const humidityInput = document.getElementById("degree-humidity");
const windInput = document.getElementById("wind");
const weatherIcon = document.getElementById("weather-icon");
const dayInput = document.querySelectorAll(".days");
const cityOutput = document.getElementById("cityNames");
const tempOtherDay = document.querySelectorAll(".temp-other-day");
const APIKey = "1732a9d86ff1913e09dd01beb311e578";

let options = { month: "long", day: "numeric" };

async function getWeather() {
  try {
    var weatherResult = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&appid=${APIKey}&exclude={current}&lang=fa`
      )
    ).json();
    sendInfo(weatherResult);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function convertToCel(value) {
  return (value - 273).toFixed(0);
}

function sendInfo(data) {
  var cityName = data["name"];
  var temp = Math.round(data.main.temp);
  var detail = {
    cityName: data["name"],
    date: new Date(data.dt * 1000).toLocaleString("fa-IR", options).toString(),
    // .toLocaleDateString("fa-IR")
  };

  var wind = data["wind"]["speed"] + "km/h";
  var humidity = data.main.humidity + "%";

  // humidityInput
  cityOutput.innerHTML = `روزهای آینده ${cityName}`;
  tempInput[0].innerHTML = convertToCel(temp) + "°";
  detailInput.innerHTML = `${detail.cityName} ${detail.date}`;
  windInput.innerHTML = wind;
  humidityInput.innerHTML = humidity;

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = src = "../../assest/img/cloud.svg";
  } else if (data.weather[0].main === "HighTemperature") {
    weatherIcon.src = src = "../../assest/img/high temperature.svg";
  } else if (data.weather[0].main === "Blizzard") {
    weatherIcon.src = src = "../../assest/img/blizzard_color";
  } else if (data.weather[0].main === "Fog") {
    weatherIcon.src = src = "../../assest/img/fog.svg";
  } else if (data.weather[0].main === "Hail") {
    weatherIcon.src = src = "../../assest/img/hail.svg";
  } else if (data.weather[0].main === "Moderate snow") {
    weatherIcon.src = src = "../../assest/img/moderate-snow.svg";
  } else if (data.weather[0].main === "Sandstorm") {
    weatherIcon.src = src = "../../assest/img/sandstorm.svg";
  } else if (data.weather[0].main === "Rainbow") {
    weatherIcon.src = src = "../../assest/img/rainbow.svg";
  } else if (data.weather[0].main === "Sunny") {
    weatherIcon.src = src = "../../assest/img/sunny_color.svg";
  } else if (data.weather[0].main === "SunCloudy") {
    weatherIcon.src = src = "../../assest/img/04_sun_cloudy_color.svg";
  } else if (data.weather[0].main === "MoonCloudy") {
    weatherIcon.src = src = "../../assest/img/moon-cloudy.svg";
  } else if (data.weather[0].main === "Dry") {
    weatherIcon.src = src = "../../assest/img/dry.svg";
  } else if (data.weather[0].main === "Blizzard_color") {
    weatherIcon.src = src = "../../assest/img/blizzard_color.svg";
  } else if (data.weather[0].main === "FullMoon") {
    weatherIcon.src = src = "../../assest/img/full moon.svg";
  } else if (data.weather[0].main === "PartlyCloudy") {
    weatherIcon.src = src = "../../assest/img/partly-cloudy.svg";
  } else if (data.weather[0].main === "Sunset") {
    weatherIcon.src = src = "../../assest/img/sunset_color.svg";
  } else if (data.weather[0].main === "Typhoon") {
    weatherIcon.src = src = "../../assest/img/typhoon_color.svg";
  } else if (data.weather[0].main === "Snow") {
    weatherIcon.src = src = "../../assest/img/snow_color.svg";
  } else if (data.weather[0].main === "Thunderstorm") {
    weatherIcon.src = src = "../../assest/img/thunderstorm.svg";
  } else if (data.weather[0].main === "Wet") {
    weatherIcon.src = src = "../../assest/img/wet.svg";
  } else if (data.weather[0].main === "Lightning") {
    weatherIcon.src = src = "../../assest/img/lightning_color.svg";
  } else if (data.weather[0].main === "Sun_cloudy") {
    weatherIcon.src = src = "../../assest/img/sun_cloudy.svg";
  } else {
    weatherIcon.src = src = "../../assest/img/moon_stars.svg";
  }
}

async function NextDays() {
  var fiveDaysNext = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput.value}&units=metric&appid=${APIKey}&lang=fa`
    )
  ).json();
  giveInformation(fiveDaysNext);
}
var date = new Date();

function giveInformation(data) {
  data.list.forEach((dayData, index) => {
    const temp = Math.round(dayData.main.temp);
    const dateNew = new Date(dayData.dt * 1000);

    tempOtherDay[index].innerHTML = temp + "°";
    dayInput[index].innerHTML = dateNew.toLocaleString("fa-IR", {
      month: "long",
      day: "numeric",
    });
  });
}

cityNameInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" || e.key === "ج") {
    await getWeather(e);
    await NextDays();
  }
});
