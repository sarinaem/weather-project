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

  let weatherCurrect = data.weather[0].icon;

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

function giveInformation(data) {
  data.list.forEach((dayData, index) => {
    const temp = Math.round(dayData.main.temp);
    const dateNew = new Date(dayData.dt * 1000);
    weather = dayData.weather[0].main;
    tempOtherDay[index].innerHTML = `${temp}°`;
    dayInput[index].innerHTML = dateNew.toLocaleString("fa-IR", {
      weekday: "long",
    });
  });
}
// help chatgpt

// function giveInformation(data) {
//   const uniqueDays = new Map();

//   data.list.forEach((dayData) => {
//     const dateNew = new Date(dayData.dt * 1000);
//     const dateKey = dateNew.toLocaleDateString("fa-IR");

//     if (!uniqueDays.has(dateKey) && dateNew.getHours() === 12) {
//       uniqueDays.set(dateKey, dayData);
//     }
//   });

//   const daysArray = Array.from(uniqueDays.values());

//   daysArray.forEach((dayData, index) => {
//     if (index < tempOtherDay.length) {
//       const temp = Math.round(dayData.main.temp);
//       const dateNew = new Date(dayData.dt * 1000);

//       tempOtherDay[index].innerHTML = `${temp}°`;

//       dayInput[index].innerHTML = dateNew.toLocaleString("fa-IR", {
//         weekday: "long",
//       });
//     }
//   });
// }

cityNameInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" || e.key === "ج") {
    await getWeather(e);
    await NextDays();
  }
});
