let api_key = 'b859f03b3e78d2b397a1852122b4cb3d';

let cityName = document.querySelector('.city-name');
let temp = document.querySelector('.temp');
let iconWeather = document.querySelector('.icon');
let description = document.querySelector('.description');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

        
    } else {
        console.log("Geolocation not supported!");
    }
};

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + api_key)
        .then((response) => response.json())
        .then((data) => {
            let nameValue = data['name'];
            let tempValue = Math.round(data['main']['temp']);
            console.log(tempValue);
            let icon = data['weather'][0]['icon'];
            let descriptionValue = data['weather'][0]['description'];
            let humidityValue = data['main']['humidity'];
            let windValue = data['wind']['speed'];

            cityName.innerHTML =  "Weather in " + nameValue;
            temp.innerHTML = tempValue + "°C";
            console.log(temp);
            iconWeather.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            description.innerHTML = descriptionValue;
            humidity.innerHTML = "Humidity: " + humidityValue + "%";
            wind.innerHTML = "Wind speed: " + windValue + " Km/h";
        });

};

function showWeather() {
    let city = document.getElementById('search_bar').value;

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + api_key)
        .then((response) => response.json())
        .then((data) => {
            let nameValue = data['name'];
            let tempValue = Math.round(data['main']['temp']);
            let icon = data['weather'][0]['icon'];
            let descriptionValue = data['weather'][0]['description'];
            let humidityValue = data['main']['humidity'];
            let windValue = data['wind']['speed'];

            cityName.innerHTML =  "Weather in " + nameValue;
            temp.innerHTML = tempValue + "°C";
            iconWeather.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            description.innerHTML = descriptionValue;
            humidity.innerHTML = "Humidity: " + humidityValue + "%";
            wind.innerHTML = "Wind speed: " + windValue + " Km/h";

            document.getElementById('search_bar').value = "";
        })
        .catch(err => {
            alert("City " + city + " doesn't exist!");
            document.getElementById('search_bar').value = "";
        });
};




