const apiKey = "72c4abb610ca82ed57846beeff41a4fc";

// HTML Elements
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const icon = document.getElementById("icon");

const feels = document.getElementById("feels");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const visibility = document.getElementById("visibility");
const pressure = document.getElementById("pressure");
const direction = document.getElementById("direction");
const progressBar = document.getElementById("progressBar");

const date = document.getElementById("date");
const time = document.getElementById("time");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const updated = document.getElementById("updated");
// --------------------
// Live Date & Time
// --------------------
function updateDateTime() {
    const now = new Date();

    date.innerHTML = now.toDateString();

    time.innerHTML = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

updateDateTime();
setInterval(updateDateTime, 1000);

// --------------------
// Search Weather
// --------------------
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city===""){
        alert("Please enter a city.");
        return;
    }

    getWeatherByCity(city);
});

// Enter Key Support
cityInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){
        searchBtn.click();
    }

});

// --------------------
// Current Location
// --------------------
locationBtn.addEventListener("click",()=>{

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position=>{

            const lat=position.coords.latitude;
            const lon=position.coords.longitude;

            getWeatherByLocation(lat,lon);

        },()=>{

            alert("Location permission denied.");

        });

    }
    else{

        alert("Geolocation is not supported.");

    }

});

// --------------------
// Weather by City
// --------------------
async function getWeatherByCity(city){

const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetchWeather(url);

}

// --------------------
// Weather by Location
// --------------------
async function getWeatherByLocation(lat,lon){

const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

fetchWeather(url);

}

// --------------------
// Fetch Weather
// --------------------
async function fetchWeather(url){

try{

const response=await fetch(url);

const data=await response.json();

if(data.cod!=200){

alert("City Not Found");

return;

}

function changeBackground(temp, icon) {

    // Night backgrounds
    if (icon.endsWith("n")) {

        if (temp >= 40) {
    document.body.style.backgroundImage = "url('images/extreme-hot.jpg')";
}
        else if (temp >= 25) {
            document.body.style.backgroundImage = "url('images/warm-night.jpg')";
        }
        else if (temp >= 15) {
            document.body.style.backgroundImage = "url('images/cool-night.jpg')";
        }
        else {
            document.body.style.backgroundImage = "url('images/cold-night.jpg')";
        }

        return;
    }

    // Day backgrounds
    if (temp >= 40) {
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    }
    else if (temp >= 35) {
        document.body.style.backgroundImage = "url('images/hot.jpg')";
    }
    else if (temp >= 28) {
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    }
    else if (temp >= 20) {
        document.body.style.backgroundImage = "url('images/pleasant.jpg')";
    }
    else if (temp >= 10) {
        document.body.style.backgroundImage = "url('images/cloudy.jpg')";
    }
    else if (temp >= 0) {
        document.body.style.backgroundImage = "url('images/cold.jpg')";
    }
    else {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }
}
displayWeather(data);
changeBackground(
    data.main.temp,
    data.weather[0].icon
);

}
catch(error){

alert("Something went wrong.");

console.log(error);

}

}

// --------------------
// Display Weather
// --------------------
function displayWeather(data){

cityName.innerHTML=data.name;

temp.innerHTML=Math.round(data.main.temp)+"°C";

desc.innerHTML=data.weather[0].description;

icon.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

feels.innerHTML=Math.round(data.main.feels_like)+"°C";

humidity.innerHTML=data.main.humidity+"%";

wind.innerHTML=(data.wind.speed*3.6).toFixed(1)+" km/h";

visibility.innerHTML=(data.visibility/1000).toFixed(1)+" km";

pressure.innerHTML=data.main.pressure+" hPa";

direction.innerHTML=data.wind.deg+"°";
// Max & Min Temperature
maxTemp.innerHTML = Math.round(data.main.temp_max) + "°C";
minTemp.innerHTML = Math.round(data.main.temp_min) + "°C";

// Sunrise
const sunriseTime = new Date(data.sys.sunrise * 1000);
sunrise.innerHTML = sunriseTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});

// Sunset
const sunsetTime = new Date(data.sys.sunset * 1000);
sunset.innerHTML = sunsetTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});

// Last Updated
updated.innerHTML = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});

progressBar.style.width=data.main.humidity+"%";

}