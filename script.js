const key = API;
const url = " https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input')
const searchbtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')

async function checkweather(city) {
    const response = await fetch(url + city + `&appid=${key}`)

    if (response.status == 404) {
        document.querySelector(".weather").style.display = "none"
        document.querySelector(".error").style.display = "block"

    } else {
        let data = await response.json();

        // console.log(data)

        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".Wind").innerHTML = data.wind.speed + " km/h"

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }

        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"

    }
}


function performSearch() {
        const city = searchBox.value;
        checkweather(city);
    }

    searchbtn.addEventListener('click', performSearch);
    searchBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
