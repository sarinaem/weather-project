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
  800: "../../assest/img/sunny_color.svg",
  800: "../../assest/img/full moon.svg",
  801: "../../assest/img/sun_cloudy.svg",
  801: "../../assest/img/moon-cloudy.svg",
  802: "../../assest/img/partly-cloudy.svg",
  802: "../../assest/img/partiy-cloudy-night.svg",
  521: "../../assest/img/rain.jpg",
  503: "../../assest/img/heavy-rain.svg",
  531: "../../assest/img/hail.svg",
  210: "../../assest/img/lightning_color.svg",
  211: "../../assest/img/thunderstorm.svg",
  613: "../../assest/img/moderate-snow.svg",
  602: "../../assest/img/blizzard_color.svg",
  601: "../../assest/img/snow_color.svg",
  751: "../../assest/img/sandstorm.svg",

  741: "../../assest/img/fog.svg",
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
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

function getNextFiveDays() {
  const days = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
  ];
  const today = new Date();
  const nextFiveDays = [];

  for (let i = 1; i <= 5; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    nextFiveDays.push(days[nextDay.getDay()]);
  }

  return nextFiveDays;
}

const nextFiveDays = getNextFiveDays();

// function giveInformation(data) {
//   data.list.forEach((dayData, index) => {
//     const temp = Math.round(dayData.main.temp);
//     const dateNew = new Date(dayData.dt * 1000);
//     weather = dayData.weather[0].main;
//     tempOtherDay[index].innerHTML = `${temp}°`;
//     dayInput[index].innerHTML = dateNew.toLocaleString("fa-IR", {
//       weekday: "long",
//     });
//     const weatherCurrect = dayData.weather[0].icon;
//     weatherIcon[index].src =
//       weatherImg[weatherCurrect] ||
//       "../../assest/img/flat-404-error-template_23-2147741195.avif";
//   });
// }
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

async function NextDays() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput.value}&units=metric&appid=${APIKey}&lang=fa`
    );
    const fiveDaysNext = await response.json();
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

function getNextFiveDays() {
  const days = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
  ];
  const today = new Date();
  const nextFiveDays = [];

  for (let i = 1; i <= 5; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    nextFiveDays.push(days[nextDay.getDay()]);
  }

  return nextFiveDays;
}

const nextFiveDays = getNextFiveDays();

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
  800: "../../assest/img/sunny_color.svg",
  801: "../../assest/img/sun_cloudy.svg",
  802: "../../assest/img/partly-cloudy.svg",
  521: "../../assest/img/rain.jpg",
  503: "../../assest/img/heavy-rain.svg",
  531: "../../assest/img/hail.svg",
  210: "../../assest/img/lightning_color.svg",
  211: "../../assest/img/thunderstorm.svg",
  613: "../../assest/img/moderate-snow.svg",
  602: "../../assest/img/blizzard_color.svg",
  601: "../../assest/img/snow_color.svg",
  751: "../../assest/img/sandstorm.svg",
  741: "../../assest/img/fog.svg",
};

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&units=metric&appid=${APIKey}&lang=fa`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const weatherResult = await response.json();
    sendInfo(weatherResult);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("خطا در دریافت داده‌های آب و هوا: " + error.message);
  }
}

function convertToCel(value) {
  return Math.round(value); // چون در حال حاضر از متریک استفاده می‌کنید
}

function sendInfo(data) {
  const cityName = data["name"];
  const temp = data.main.temp;
  const detail = {
    cityName: data["name"],
    date: new Date(data.dt * 1000).toLocaleString("fa-IR", options).toString(),
  };

  const wind = data["wind"]["speed"] + "km/h";
  const humidity = data.main.humidity + "%";

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

    if (!response.ok) {
      throw new Error("City not found");
    }

    const fiveDaysNext = await response.json();
    giveInformation(fiveDaysNext); // نمایش اطلاعات پیش‌بینی
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    alert("خطا در دریافت پیش‌بینی آب و هوا: " + error.message);
  }
}

function getNextFiveDays() {
  const days = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
  ];
  const today = new Date();
  const nextFiveDays = [];

  for (let i = 1; i <= 5; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    nextFiveDays.push(days[nextDay.getDay()]);
  }

  return nextFiveDays;
}

function giveInformation(data) {
  const uniqueDays = new Map();

  data.list.forEach((dayData) => {
    const dateNew = new Date(dayData.dt * 1000);
    const dateKey = dateNew.toLocaleDateString("fa-IR");

    if (!uniqueDays.has(dateKey)) {
      uniqueDays.set(dateKey, dayData);
    }
  });

  const daysArray = Array.from(uniqueDays.values());

  daysArray.forEach((dayData, index) => {
    if (index < tempOtherDay.length && index < weatherIcon.length) {
      const temp = Math.round(dayData.main.temp);
      const dateNew = new Date(dayData.dt * 1000);

      tempOtherDay[index].innerHTML = `${temp}°`;
      dayInput[index].innerHTML = dateNew.toLocaleString("fa-IR", {
        weekday: "long",
      });
      const weatherCurrect = dayData.weather[0].icon;
      weatherIcon[index].src =
        weatherImg[weatherCurrect] ||
        "../../assest/img/flat-404-error-template_23-2147741195.avif";
    }
  });
}

// اضافه کردن رویداد به فیلد ورودی
cityNameInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await getWeather();
    await NextDays();
  }
});
