const cityNameInput = document.getElementById("inputLabel");
const imgWeather = document.getElementById("img-of-weather");
const tempInput = document.getElementsByClassName("tempInput");
const detailInput = document.getElementById("detailCity");
const humidityInput = document.getElementById("degree-humidity");
const windInput = document.getElementById("wind");
const weatherIcon = document.querySelectorAll(".weather-icon");
const dayInput = document.querySelectorAll(".days");
const cityOutput = document.getElementById("cityNames");
const tempOtherDay = document.querySelectorAll(".temp-other-day");
const APIKey = "1732a9d86ff1913e09dd01beb311e578";

let options = { month: "long", day: "numeric" };
const weatherImg = {
  "01d": "../../assest/img/sunny_color.svg",
  "01n": "../../assest/img/full moon.svg",
  "02d": "../../assest/img/sun_cloudy.svg",
  "02n": "../../assest/img/moon-cloudy.svg",
  "03d": "../../assest/img/cloud.svg",
  "03n": "../../assest/img/cloud.svg",
  "10d": "../../assest/img/rain.jpg",
  "10n": "../../assest/img/rain.jpg",
  400: "../../assest/img/11111.png",
  200: "../../assest/img/thunderstorm.svg",
  "11n": "../../assest/img/thunderstorm.svg",
  "13d": "../../assest/img/snow_color.svg",
  "13n": "../../assest/img/snow_color.svg",
  "50d": "../../assest/img/fog.svg",
  "50n": "../../assest/img/fog.svg",
  // 800: "../../assest/img/sunny_color.svg",
  // 800: "../../assest/img/full moon.svg",
  // 801: "../../assest/img/sun_cloudy.svg",
  // 801: "../../assest/img/moon-cloudy.svg",
  // 802: "../../assest/img/partly-cloudy.svg",
  // 802: "../../assest/img/partiy-cloudy-night.svg",
  // 521: "../../assest/img/rain.jpg",
  // 503: "../../assest/img/heavy-rain.svg",
  // 531: "../../assest/img/hail.svg",
  // 210: "../../assest/img/lightning_color.svg",
  // 211: "../../assest/img/thunderstorm.svg",
  // 613: "../../assest/img/moderate-snow.svg",
  // 602: "../../assest/img/blizzard_color.svg",
  // 601: "../../assest/img/snow_color.svg",
  // 751: "../../assest/img/sandstorm.svg",

  // 741: "../../assest/img/fog.svg",
};

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
  return (value - 273.15).toFixed(0);
}

function sendInfo(data) {
  var cityName = data["name"];
  var temp = Math.round(data.main.temp);
  var detail = {
    cityName: data["name"],
    date: new Date(data.dt * 1000).toLocaleString("fa-IR", options).toString(),
  };

  var wind = data["wind"]["speed"] + "km/h";
  var humidity = data.main.humidity + "%";

  cityOutput.innerHTML = `روزهای آینده ${cityName}`;

  tempInput[0].innerHTML = convertToCel(temp) + "°";
  detailInput.innerHTML = `${detail.cityName} ${detail.date}`;
  windInput.innerHTML = wind;
  humidityInput.innerHTML = humidity;

  const weatherCurrect = data.weather[0].icon;
  imgWeather.src =
    weatherImg[weatherCurrect] ||
    "../../assest/img/flat-404-error-template_23-2147741195.avif";
}

async function NextDays() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput.value}&units=metric&appid=${APIKey}&lang=fa`
    );
    const fiveDaysNext = await response.json();
    console.log(fiveDaysNext); // بررسی داده‌ها

    giveInformdataation(fiveDaysNext);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

function giveInformdataation(data) {
  data.list.forEach((dayData, index) => {
    if (index < tempOtherDay.length && index < weatherIcon.length) {
      const temp = Math.round(dayData.main.temp);
      const dateNew = new Date(dayData.dt * 1000);
      weather = dayData.weather[0].main;
      tempOtherDay[index].innerHTML = `${temp}°`;
      dayInput[index].innerHTML = dateNew.toLocaleString("fa-IR", {
        weekday: "long",
      });
      const weatherCurrect = dayData.weather[0].icon;
      weatherIcon[index].src =
        weatherImg[weatherCurrect] || "../../asset/img/11111.png";
    }
  });
}
// help chatgpt

// function giveInformation(data) {
//   const uniqueDays = new Map();

//   data.list.forEach((dayData) => {
//     const dateNew = new Date(dayData.dt * 1000);
//     const dateKey = dateNew.toLocaleDateString("fa-IR");

//     if (!uniqueDays.has(dateKey)) {
//       uniqueDays.set(dateKey, dayData);
//     }
//   });

//   const daysArray = Array.from(uniqueDays.values());

//   daysArray.forEach((dayData, index) => {
//     if (index < tempOtherDay.length && index < weatherIcon.length) {
//       const temp = Math.round(dayData.main.temp);
//       const dateNew = new Date(dayData.dt * 1000);

//       tempOtherDay[index].innerHTML = `${temp}°`;

//       dayInput[index].innerHTML = dateNew.toLocaleString("fa-IR", {
//         weekday: "long",
//       });
//       const weatherCurrect = dayData.weather[0].icon;
//       weatherIcon[index].src =
//         weatherImg[weatherCurrect] ||
//         "../../assest/img/flat-404-error-template_23-2147741195.avif";
//     }
//   });
// }

cityNameInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await getWeather(e);
    await NextDays();
  }
});
