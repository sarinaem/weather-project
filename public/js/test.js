const weatherImg = {
  "01d": "../../assest/img/sunny_color.svg",
  "01n": "../../assest/img/full moon.svg",
  "02d": "../../assest/img/sun_cloudy.svg",
  "02n": "../../assest/img/moon-cloudy.svg",
  "03d": "../../assest/img/cloud.svg",
  "03n": "../../assest/img/cloud.svg",
  "04d": "",
  "04n": "",
  "09d": "",
  "09n": "",
  "10d": "../../assest/img/rain.jpg",
  "10n": "../../assest/img/rain.jpg",
  "11d": "../../assest/img/thunderstorm.svg",
  "11n": "../../assest/img/thunderstorm.svg",
  "13d": "../../assest/img/snow_color.svg",
  "13n": "../../assest/img/snow_color.svg",
  "50d": "../../assest/img/fog.svg",
  "50n": "../../assest/img/fog.svg",
};

let weatherCurrect = data.weather[0].icon;

UpdateWeather(weatherCurrect);

function UpdateWeather(weatherCurrect) {
  if (weatherCurrect === "Clouds") {
    weatherIcon.src = "../../assest/img/cloud.svg";
  } else if (weatherCurrect === "HighTemperature") {
    weatherIcon.src = "../../assest/img/high temperature.svg";
  } else if (weatherCurrect === "Blizzard") {
    weatherIcon.src = "../../assest/img/blizzard_color";
  } else if (weatherCurrect === "Fog") {
    weatherIcon.src = "../../assest/img/fog.svg";
  } else if (weatherCurrect === "Hail") {
    weatherIcon.src = "../../assest/img/hail.svg";
  } else if (weatherCurrect === "Moderate snow") {
    weatherIcon.src = "../../assest/img/moderate-snow.svg";
  } else if (weatherCurrect === "Sand") {
    weatherIcon.src = "../../assest/img/sandstorm.svg";
  } else if (weatherCurrect === "Rainbow") {
    weatherIcon.src = "../../assest/img/rainbow.svg";
  } else if (weatherCurrect === "Clear") {
    weatherIcon.src = "../../assest/img/sunny_color.svg";
  } else if (weatherCurrect === "SunCloudy") {
    weatherIcon.src = "../../assest/img/04_sun_cloudy_color.svg";
  } else if (weatherCurrect === "MoonCloudy") {
    weatherIcon.src = "../../assest/img/moon-cloudy.svg";
  } else if (weatherCurrect === "Dry") {
    weatherIcon.src = "../../assest/img/dry.svg";
  } else if (weatherCurrect === "Blizzard_color") {
    weatherIcon.src = "../../assest/img/blizzard_color.svg";
  } else if (weatherCurrect === "FullMoon") {
    weatherIcon.src = "../../assest/img/full moon.svg";
  } else if (weatherCurrect === "PartlyCloudy") {
    weatherIcon.src = "../../assest/img/partly-cloudy.svg";
  } else if (weatherCurrect === "Sunset") {
    weatherIcon.src = "../../assest/img/sunset_color.svg";
  } else if (weatherCurrect === "Typhoon") {
    weatherIcon.src = "../../assest/img/typhoon_color.svg";
  } else if (weatherCurrect === "Snow") {
    weatherIcon.src = "../../assest/img/snow_color.svg";
  } else if (weatherCurrect === "Thunderstorm") {
    weatherIcon.src = "../../assest/img/thunderstorm.svg";
  } else if (weatherCurrect === "Wet") {
    weatherIcon.src = "../../assest/img/wet.svg";
  } else if (weatherCurrect === "Lightning") {
    weatherIcon.src = "../../assest/img/lightning_color.svg";
  } else if (weatherCurrect === "Sun_cloudy") {
    weatherIcon.src = "../../assest/img/sun_cloudy.svg";
  } else if (weatherCurrect === "moon_stars") {
    weatherIcon.src = "../../assest/img/moon_stars.svg";
  } else if (weatherCurrect === "Rain") {
    weatherIcon.src = "../../assest/img/rain.jpg";
  } else {
    console.error("Day input elements not found");
  }

  weatherIcon.classList.add("block");
}
