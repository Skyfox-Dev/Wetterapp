const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '0ac287cb0bmshbd063ae5fa41d2bp1ffec1jsnc627950e95a3',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};
async function getResponse() {
  const city = document.querySelector('.searchbar input').value;
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}&lang=de`;
  const forecasturl = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3&lang=de`;
    const allgemein = document.querySelector('.allgemein');
    allgemein.classList.add('show');
    const uppercontent = document.querySelector('.uppercontent');
    uppercontent.style.borderRadius = '0px 0px 0px 0px';
    const allgemeinbar = document.querySelector('.allgemeinbar');
    allgemeinbar.classList.add('show');
    const dreitagebar = document.querySelector('.dreitagebar');
    dreitagebar.classList.add('show');
    const dreitage = document.querySelector('.dreitage');
    dreitage.classList.add('show');
    const searchbar = document.querySelector('.searchbar');
    searchbar.style.marginTop = '10px';
  fetch(url, options)
      .then(response => response.json())
      .then(data => {
          const cityName = data.location.name + ", " + data.location.region + ", " + data.location.country;
          const localTime = data.location.localtime;
          const tempC = data.current.temp_c + ' °C';
          const feelsLikeC = 'Gefühlt: ' + data.current.feelslike_c + ' °C';
          const condition = data.current.condition.text;
          const humidity = 'Feuchtigkeit: ' + data.current.humidity + '%';
          const wind = 'Wind: ' + data.current.wind_kph + 'km/h';
          var iconUrl = data.current.condition.icon;
          document.querySelector('#Stadtname').textContent = cityName;
          document.querySelector('#Datum').textContent = localTime;
          document.querySelector('#tempC').textContent = tempC;
          document.querySelector('#feelslike').textContent = feelsLikeC;
          document.querySelector('#condition').textContent = condition;
          document.querySelector('#humidity').textContent = humidity;
          document.querySelector('#wind').textContent = wind;
          document.querySelector('wetterbild').style.backgroundImage = 'url("' + iconUrl + '")';
        })
  fetch(forecasturl, options)
    .then(response => response.json())
    .then(data => {
        const forecastDays = data.forecast.forecastday;
        const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        const weekdayStr = [];
      
        for (let i = 0; i < forecastDays.length; i++) {
        const date = new Date(forecastDays[i].date);
        const weekday = weekdays[date.getDay()];
        weekdayStr.push(weekday);
        }
      
        document.querySelector('#wochentag1').textContent = weekdayStr[0];
        document.querySelector('#wochentag2').textContent = weekdayStr[1];
        document.querySelector('#wochentag3').textContent = weekdayStr[2]; 
        
        for (let i = 0; i < forecastDays.length; i++) {
          var iconUrl = data.forecast.forecastday[i].day.condition.icon;
          document.querySelector(`tagesicon${i+1}`).style.backgroundImage = `url("${iconUrl}")`;
        }
        for (let i = 0; i < forecastDays.length; i++) {
          var temp = data.forecast.forecastday[i].day.mintemp_c + "°C bis " + data.forecast.forecastday[i].day.maxtemp_c + "°C";
          document.querySelector(`temp${i+1}`).textContent = temp;
        }
          })
            .catch(error => console.error(error));
}
function handleKeyPress(event) {
  if (event.keyCode === 13) {
    getResponse();
    return false;
  }
  return true;
}