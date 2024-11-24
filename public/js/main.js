const cityNameInput = document.getElementById("inputLabel");
const imgWeather = document.getElementById("img-of-weather");
const tempInput = document.getElementsByClassName("tempInput");
const detailInput = document.getElementById("detailCity");
const humidityInput = document.getElementById("degree-humidity");
const windInput = document.getElementById("wind");
const smallImgInput = document.getElementById("smallImgWeather");
const dayInput = document.getElementById("days");
const cityOutput = document.getElementById("cityNames");
var date = new Date();
const APIKey = "1732a9d86ff1913e09dd01beb311e578";

async function getWeather() {
  var weatherResult = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&appid=${APIKey}&exclude={current}&lang=fa`
    )
  ).json();
  sendInfo(weatherResult);
}
console.log(weatherResult);

function sendInfo(data) {
  var cityName = data["name"];
  var temp = data.main.temp;
  var detail = {
    cityName: data["name"],
    dateNew: date.setDate(date.getDate() + 5),
  };
  var wind = data.wind.speed;
  var humidity = data.main.humidity;

  // humidityInput
  cityOutput.innerHTML = `روزهای آینده ${cityName}`;
  tempInput.innerHTML = temp;
  detailInput.innerHTML = detail;
  windInput.innerHTML = wind;
  humidityInput.innerHTML = humidity;
}

cityNameInput.addEventListener("keydown", getWeather);
