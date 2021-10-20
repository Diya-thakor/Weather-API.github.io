$('document').ready(function () {
    //Get all elements which are to be shown
    let location = $('.location');
    let icon = $('.weather-icon');
    let description = $('.description');
    let temprature = $('.temperature-value');
    let notification = $('.notification');
    let min_max = $('.low-high-temperature');

    //This is for date part
    let date = $('.date');
    let date_ = new Date;
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    date.text(`${date_.getDate()}/${monthNames[date_.getMonth()]}/${date_.getFullYear()}`);

    //About search button and place
    let city = document.querySelector('#search');
    city.addEventListener('keydown', function (event) {
        if (event.keyCode == 13) {
            getResultByCity(city.value);
        }
    });
    // $('#btn').click(getResultByCity(city.value));

    function getResultByCity(city) {
        let api_city = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
        fetch(api_city)
            .then(function (response) {
                //take the response given by api
                let data = response.json();
                console.log(data);
                return data;
            })
            .then(function assignValObject(data) {
                weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
                weather.minTemp = Math.floor(data.main.temp_min - KELVIN);
                weather.maxTemp = Math.floor(data.main.temp_max - KELVIN);
            }).
            then(function(){
                location.html(`<p>${weather.city}, ${weather.country}</p>`);
                icon.html(`<img src="icons/${weather.iconId}.png">`);
                description.html(`${weather.description}`);
                temprature.html(`${weather.temperature.value}°C`);
                min_max.html(`${weather.maxTemp}°C/${weather.minTemp}°C`)
            })
        
    }

    //Hide error at initial stage
    notification.hide();

    //Create an object to store all information
    const weather = {};

    weather.temperature = {
        unit: "celsius"
    }

    //Constant values
    const KELVIN = 273;

    //KEY
    const key = '82005d27a116c2880c8f0fcb866998a0';

    //get weather
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else {
        notification.show();
        notification.innerHTML = "<p>Browser doesn't Support Geolocation<p>";
    }

    //Function for setting position
    function setPosition(Position) {
        let latitude = Position.coords.latitude;
        let longitude = Position.coords.longitude;
        getWeather(latitude, longitude);
    }

    //Function for showing error
    function showError(error) {
        notification.show();
        notification.html(`<p>${error.message}</p>`);
        // console.log(notification);
    }

    //Function to Get Weather
    function getWeather(latitude, longitude) {
        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
        fetch(api).then(function (response) {
            let data = response.json();
            return data;
        })
            .then(function (data) {
                weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
                weather.minTemp = Math.floor(data.main.temp_min - KELVIN);
                weather.maxTemp = Math.floor(data.main.temp_max - KELVIN);
            })
            .then(function () {
                location.html(`<p>${weather.city}, ${weather.country}</p>`);
                icon.html(`<img src="icons/${weather.iconId}.png">`);
                description.html(`${weather.description}`);
                temprature.html(`${weather.temperature.value}°C`);
                min_max.html(`${weather.maxTemp}°C/${weather.minTemp}°C`)
            });
    }
});
// function displayWeather() {

// }