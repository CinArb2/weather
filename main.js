
const apiKey = '9b17d7be3dc82eaf6d86688e7d03c770';
const proxy = 'https://weather-app-cindy-arb.herokuapp.com/'

const url = city => {
  `${proxy}https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
}

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors"});
    //const respData = await resp.json();

    console.log(resp);
}

getWeatherByLocation('London')