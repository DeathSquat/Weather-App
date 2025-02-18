const API_KEY = "d3fcb572ae344ab7e7abc9e18f7f3c4d"; // Ensure this is activated

document.getElementById("search-btn").addEventListener("click", getWeather);
document.getElementById("location-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

function getWeather() {
    const location = document.getElementById("location-input").value.trim();
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.cod == 404) {  // Fix: Correctly checking if location is not found
                showError();
            } else {
                showWeather(data);
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            showError();
        });
}

function showWeather(data) {
    document.querySelector(".not-found").style.display = "none";
    document.querySelector(".weather-box").style.display = "block";
    document.querySelector(".weather-details").style.display = "block";

    document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.getElementById("humidity-value").innerHTML = `${data.main.humidity}%`;
    document.getElementById("wind-speed").innerHTML = `${data.wind.speed} m/s`;

    // Update weather icon dynamically
    const iconCode = data.weather[0].icon;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function showError() {
    document.querySelector(".weather-box").style.display = "none";
    document.querySelector(".weather-details").style.display = "none";
    document.querySelector(".not-found").style.display = "block";
}
