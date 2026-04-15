const apiKey = "336c960cbcccd76818bacd75b60413db";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
const loading = document.querySelector(".loading");

async function checkWeather(city) {

  loading.style.display = "block";
  weather.style.display = "none";
  error.style.display = "none";

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  loading.style.display = "none";

  if (response.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherIcon = document.querySelector(".weather-icon");

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src ="clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "mist.png";
    }

    weather.style.display = "block";
    error.style.display = "none";
  }

  searchBox.value = "";
}

/* Button click */
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

/* Enter key */
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
