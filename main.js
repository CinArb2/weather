
const apiKey = '9b17d7be3dc82eaf6d86688e7d03c770';
let nameCity = document.querySelector('[name="city"]');
let weatherInfo = document.querySelector('.weather_info');


const url = (city) => {
  if (typeof city === 'object') {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.long}&appid=${apiKey}`
  } else {
    return `https://api.openweathermap.org/data/2.5/find?q=${city}&cnt=10&appid=${apiKey}`
  }
}

function createEl(data) {
  let elemento = document.createElement('div')
  elemento.classList.add('temp-container');
  let temp = data.main.temp * 1 - 273.15;

  elemento.innerHTML = 
        `<img class="icon_weather" src="./incons/icon-weat/${data.weather[0].icon}.png" alt="icon weather state">
        <h1 class="city">${data.name}</h1>
        <button class="temperature">${temp.toFixed(2)}°C</button>
        <span class="weather_states">${data.weather[0].main}</span>
        <div class="temp_info">
          <div class="box wind">
            <p>Wind</p>
            <span>${data.wind.speed}m/s</span>
          </div>
          <div class="box hum">
            <p>Hum</p>
            <span>${data.main.humidity}%</span>
          </div>
        </div>`
  weatherInfo.appendChild(elemento);
}

function notFound() {
  let elemento = document.createElement('div');
    elemento.classList.add('temp-container');
  elemento.innerHTML = `
    <img class="icon_not-found" src="./incons/Attention_perspective_matte.png" alt="">
    <h1 class="city">Ooops...</h1>
    <p>City not found</p>
    <span>Please try again .. :)</span>  
  `
    weatherInfo.appendChild(elemento);
}

async function getWeatherByLocation(city) {
  try {
    const weather = await fetch(url(city), { origin: "cors" });
    const weatherData = await weather.json();

    if (weatherData.list) {
      createEl(weatherData.list[0]);
    } else {
      createEl(weatherData);
    }
  } catch (error) {
    notFound()
  }
}

const successCb = (position) => {
  let objCoord = {
    lat: position.coords.latitude,
    long: position.coords.longitude,
  }
  getWeatherByLocation(objCoord);
}

const convertTemp = (elem) => {
  const numberPattern = /[-]?[0-9]+[.]?[0-9]+/g;
  let number = elem.match(numberPattern);
  
  if (elem.includes('F')) {
    let cels = (number * 1 - 32) * (5 / 9);
    return cels.toFixed(2)
  } else if (elem.includes('C')) {
    let far = (number * 9 / 5) + 32;
    return far.toFixed(2)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation.getCurrentPosition(successCb);

  nameCity.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      let tempContainer = document.querySelector('.temp-container');
      if (tempContainer) {tempContainer.remove()};
      getWeatherByLocation(nameCity.value);
    }
  })

  document.addEventListener('click', e => {
    if (e.target.matches('.temperature') && e.target.textContent.includes('F')) {
      let cels = convertTemp(e.target.textContent);
      e.target.textContent = `${cels}°C`;

    } else if (e.target.matches('.temperature') && e.target.textContent.includes('C')) {
      let farh = convertTemp(e.target.textContent);
      e.target.textContent = `${farh}°F`;
    }
  });

})



