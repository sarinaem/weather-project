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

  let weatherCurrect = data.weather[0].main;
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
  }
}

async function NextDays() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput.value}&units=metric&appid=${APIKey}&lang=fa`
    );
    const fiveDaysNext = await response.json();
    giveInformation(fiveDaysNext);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

// function giveInformation(data) {
//   data.list.forEach((dayData, index) => {
//     const temp = Math.round(dayData.main.temp);
//     const dateNew = new Date(dayData.dt * 1000);
//     weather = dayData.weather[0].main;
//     tempOtherDay[index].innerHTML = `${temp}°`;
//     dayInput[index].innerHTML = dateNew.toLocaleString("fa-IR", {
//       weekday: "long",
//     });
//   });
// }
// help chatgpt

function giveInformation(data) {
  const uniqueDays = new Map();

  data.list.forEach((dayData) => {
    const dateNew = new Date(dayData.dt * 1000);
    const dateKey = dateNew.toLocaleDateString("fa-IR");

    if (!uniqueDays.has(dateKey) && dateNew.getHours() === 12) {
      uniqueDays.set(dateKey, dayData);
    }
  });

  const daysArray = Array.from(uniqueDays.values());

  daysArray.forEach((dayData, index) => {
    if (index < tempOtherDay.length) {
      const temp = Math.round(dayData.main.temp);
      const dateNew = new Date(dayData.dt * 1000);

      tempOtherDay[index].innerHTML = `${temp}°`;

      dayInput[index].innerHTML = dateNew.toLocaleString("fa-IR", {
        weekday: "long",
      });
    }
  });
}

cityNameInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" || e.key === "ج") {
    await getWeather(e);
    await NextDays();
  }
});
