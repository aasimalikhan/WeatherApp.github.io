console.log("ASDSDa");
const api = {
    key: "3bfa90e4fb82b62d60798afaabba4fec",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13)
    {
        getResults(searchbox.value);

    }
}

function getResults(query)
{
    fetch(`${api.baseurl}weather?q=${query}&unit=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round((weather.main.temp) - 273.15).toFixed(1)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
  
    if(weather.weather[0].main == 'Clouds')
    {
        document.body.style.backgroundImage = "url('cloudy.jpg')";
    }
    else if(weather.weather[0].main == 'Sunny')
    {
        document.body.style.backgroundImage = "url('sunny.jpg')";
    }
    else if(weather.weather[0].main == 'Mist')
    {
        document.body.style.backgroundImage = "url('mist.jpg')";
    }
    else if(weather.weather[0].main == 'Fog')
    {
        document.body.style.backgroundImage = "url('fog.jpg')";
    }
    else if(weather.weather[0].main == 'Clear')
    {
        document.body.style.backgroundImage = "url('clear.jpg')";
    }
    else if(weather.weather[0].main == 'Haze')
    {
        document.body.style.backgroundImage = "url('haze.jpg')";
    }
    else if(weather.weather[0].main == 'Snow')
    {
        document.body.style.backgroundImage = "url('snow.jpg')";
    }

    else if(weather.weather[0].main == 'Rain')
    {
        document.body.style.backgroundImage = "url('rain.jpg')";
    }
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${(weather.main.temp_min - 273.15).toFixed(1)}°C / ${(weather.main.temp_max - 273.15).toFixed(1)}°C`;

}

function dateBuilder(d){
    let months=["January","February","March","April","May","June","July",
                "August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Webnesday","Thursday","Friday","Saturday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}