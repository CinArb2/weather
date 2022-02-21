
const apiKey = '9b17d7be3dc82eaf6d86688e7d03c770';
let city = '';
let nameCity = document.querySelector('[name="city"]')
let weatherInfo = document.querySelector('.weather_info')
let urlBack = `https://imsea.herokuapp.com/api/1?q=`
let proxy = `https://cors-anywhere.herokuapp.com/`

const url = (city) => {
  return `https://api.openweathermap.org/data/2.5/find?q=${city}&cnt=10&appid=${apiKey}`
}

function createEl(city, temp, state, iconId) {
  let elemento = document.createElement('div')
  elemento.classList.add('temp-container');

  elemento.innerHTML = `<h1 class="city">${city}</h1>
        <div class="temp_info">
          <span class="temperature">${temp}°F</span>
          <span class="weather_states">${state}</span>
          <img src="http://openweathermap.org/img/wn/${iconId}@2x.png" alt="icon weather state">
        </div>`
  weatherInfo.appendChild(elemento);
}


async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), { origin: "cors" });
  
  const respData = await resp.json();

  let cityName = respData.list[0].name
  let temperature = respData.list[0].main.temp;
  let state = respData.list[0].weather[0].description;
  let iconId = respData.list[0].weather[0].icon;
  
  createEl(cityName, temperature, state, iconId)
  
  const imgback = await fetch(`${proxy}${urlBack}${cityName}`, { origin: "cors" });
  const respImg = await imgback.json();

  const backImage = respImg.results[0];
  weatherInfo.style.backgroundImage = `url(${backImage})`;
}


nameCity.addEventListener('keydown', e => {

  let tempContainer = document.querySelector('.temp-container');

  if (e.key === 'Enter') {

    city = nameCity.value;

    if (tempContainer) {
      tempContainer.remove();
    }
    getWeatherByLocation(city);
  }
})

