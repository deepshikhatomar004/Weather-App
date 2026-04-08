const apiKey = "336c960cbcccd76818bacd75b60413db";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherBox = document.querySelector(".Weather");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (!city || city.trim() === "") {
    alert("Please enter a city name");
    return;
  }

  if (apiKey === "PASTE_YOUR_OPENWEATHER_API_KEY_HERE") {
    alert("Please add your OpenWeather API key in script.js");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}${encodeURIComponent(city)}&appid=${apiKey}`);

    if (!response.ok) {
      if (response.status === 404) {
        alert("City not found");
      } else {
        alert("Unable to fetch weather data");
      }
      return;
    }

    const data = await response.json();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

    const weatherMain = data.weather[0].main;

    if (weatherMain === "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (weatherMain === "Clear") {
      weatherIcon.src = "clear.png";
    } else if (weatherMain === "Rain") {
      weatherIcon.src = "rain.png";
    } else if (weatherMain === "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (weatherMain === "Mist" || weatherMain === "Haze" || weatherMain === "Fog") {
      weatherIcon.src = "mist.png";
    } else if (weatherMain === "Snow") {
      weatherIcon.src = "snow.png";
    } else {
      weatherIcon.src = "clear.png";
    }

    weatherBox.style.display = "block";
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
