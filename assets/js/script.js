$(document).ready(function () {
    //on opening, load the most recent item in the search history
    console.log(Object.keys(localStorage));   
    //Find and render the date and time
    var dateObj = new Date();
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = weekdays[dateObj.getDay()];

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = dateObj.getDate();
    var month = months[dateObj.getMonth()];
    var year = dateObj.getUTCFullYear();

    var today = day + ", " + month + " " + date + ", " + year;
    $(".date").html("<h2>" + today + "</h2>");

    //BONUS: Find and render the local time for the search city

    // This function handles the search-button click event
    $("#search-city").on("click", function (event) {
        event.preventDefault(); 
        // This line grabs the input from the textbox
        var city = $("#search-input").val().trim();
        getID(city);
    });

 
    //Make a call to retrieve city ID
    function getID(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4081942e5f99ae6e3a9f08ab5e60f5ca";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            //    console.log(lat + ", " + lon)
            var coords = {
                lat: lat,
                lon: lon
            };
            localStorage.setItem(city, JSON.stringify(coords));
            //use city ID to retrieve detailed information from the "one call" API
            oneCall(city);
        });
    }


    function oneCall(city) {
        //get the geographic coordinates stored in the previous call
        var coords = JSON.parse(localStorage.getItem(city));
        var lat = coords.lat;
        var lon = coords.lon;
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=4081942e5f99ae6e3a9f08ab5e60f5ca";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var current = response.current;
            var forecast = response.daily;
            var wind = current.wind_speed;
            var temp = (current.temp - 273.15) * 1.80 + 32;
            var humidity = current.humidity;
            var uvi = current.uvi;
            var weather = current.weather[0].description;
            var icon = current.weather[0].icon;


            var weatherData = {
                humidity,
                icon,
                lat,
                lon,
                wind,
                temp,
                uvi,
                weather,
                forecast
            };

            //save all data in local storage by city name
            localStorage.setItem(city, JSON.stringify(weatherData));
            //render the data to the browser
            $(".forecast").empty()
            .then(renderData(city));
  
        });
    }



    //function to render data to page
    function renderData(city) {
        $(".city").html("<h1>" + city + " Weather Details</h1>");
        var data = JSON.parse(localStorage.getItem(city));
        var humidity = data.humidity;
        var icon = data.icon;
        var temp = data.temp;
        var uvi = data.uvi;
        var weather = data.weather;
        var wind = data.wind;
        $(".wind").text("Wind Speed: " + wind);
        $(".icon").html("<img src='https://openweathermap.org/img/w/" + icon + ".png'>");
        $(".humidity").text("Humidity: " + humidity);
        $(".temp").text("Temperature (F) " + temp.toFixed(2));
        $(".uv-index").text("UV Index: " + uvi);
        $(".weather").text("Conditions: " + weather.replace(/\"/g, ""));

        var fiveDay = {
            dayOne: data.forecast[1],
            dayTwo: data.forecast[2],
            dayThree: data.forecast[3],
            dayFour: data.forecast[4],
            dayFive: data.forecast[5],
        }


        $.each(fiveDay, function (index) {
            var forecast = fiveDay[index];
            var humidityF = forecast.humidity;
            var tempF = (forecast.temp.max - 273.15) * 1.80 + 32;
            var iconF = (forecast.weather[0].icon);
            var dt = forecast.dt;
          
            console.log(dt);
           
            $(".forecast").append("<p class='" + index + "'>");
            $("." + index).html("<p><img src='https://openweathermap.org/img/w/" + iconF + ".png'></p>");
            $("." + index).append("<p id='" + index + "-date'>");
            $("." + index).append("<p id='" + index + "-temp'>");
            $("." + index).append("<p id='" + index + "-humidity'>");

       //     $("#" + index + "-date").text();
            $("#" + index + "-temp").text("Temperature (F) " + tempF.toFixed(2));
            $("#" + index + "-humidity").text("Humidity: " + humidityF);

        });

    }
});

