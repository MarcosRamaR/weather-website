let apiKey //obtain your API key from https://openweathermap.org/api
let difKelvin = 273.15
let urlBase = 'https://api.openweathermap.org/data/2.5/weather'

const inputCity = document.getElementById('cityEntry')
const buttonSearch = document.getElementById('buttonSearch')


buttonSearch.addEventListener('click', startSearch)

inputCity.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        startSearch()
    }
})

function startSearch() {
    const city = inputCity.value
    if (city) {
        fetchData(city)
    }
}

function fetchData(city){
    fetch(`${urlBase}?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(response => showWeatherData(response))
}


function showWeatherData(weatherData){
    console.log(weatherData)
    const divDataWeather = document.getElementById('dataWeather')
    divDataWeather.innerHTML = ''
    const cityName= weatherData.name
    const cityTemp= weatherData.main.temp - difKelvin
    const weatherDescription= weatherData.weather[0].description
    const country = weatherData.sys.country
    const humidity = weatherData.main.humidity
    const icon = weatherData.weather[0].icon

    const cityTitle = document.createElement('h2')
    cityTitle.textContent = cityName + ', ' + country

    const tempInfo = document.createElement('p')
    tempInfo.textContent = `Temperature: ${cityTemp.toFixed(2)} °C`

    const iconInfo = document.createElement('img')
    iconInfo.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    const weatherInfo = document.createElement('p')
    weatherInfo.textContent = `Weather: ${weatherDescription}`

    const weatherHumidity = document.createElement('p')
    weatherHumidity.textContent = `Humidity: ${humidity}%`


    divDataWeather.appendChild(cityTitle)
    divDataWeather.appendChild(tempInfo)
    divDataWeather.appendChild(weatherInfo)
    divDataWeather.appendChild(iconInfo)
    divDataWeather.appendChild(weatherHumidity)
}