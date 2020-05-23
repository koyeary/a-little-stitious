$(document).ready(function () {

    // Display the most recent search in search history on document load
    var history = Object.keys(localStorage);
    getCoords(history[0]);
    // Display a button for last five items in search history
    searchHistory();


    // Find and render the date and time
   // var dateObj = new Date();
    var d = new Date();
    var today = d.toDateString();
    $(".date").html("<h4>" + today + "</h4>");

    // BONUS: Find and render the local time for the search city

    //  This function handles the search-button click event
    $("#search-city").on("click", function (event) {
        event.preventDefault();
        // Grab the input from the textbox
        var city = $("#search-input").val().trim();
        // Call the weather data for the selected city
        getCoords(city);
        // wipe out previous search-history buttons and start fresh
        $(".search-history").empty();
        // get the latest from local storage
        searchHistory();
    });


    // Make a call for geographic coordinates - coordinates are required to access Open Weather Map's "One Call" JSON object. 
    function getCoords(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4081942e5f99ae6e3a9f08ab5e60f5ca";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var coords = {
                lat: lat,
                lon: lon
            };
            localStorage.setItem(city, JSON.stringify(coords));
            // use city ID to retrieve detailed information from the "one call" API
            oneCall(city);
        });
    }

    // Get the "One Call" object
    function oneCall(city) {
        // get the geographic coordinates from local storage
        var coords = JSON.parse(localStorage.getItem(city));
        var lat = coords.lat;
        var lon = coords.lon;
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=4081942e5f99ae6e3a9f08ab5e60f5ca";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // remove existing forecast content from browser
            $(".forecast").empty();
            $("")
            var current = response.current;
            var forecast = response.daily;
            var wind = current.wind_speed;
            var temp = (current.temp - 273.15) * 1.80 + 32;
            var humidity = current.humidity;
            var uvi = current.uvi;
            var weather = current.weather[0].description;
            var icon = current.weather[0].icon;

            // create an object that holds all the necessary data
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

            // save all data in local storage by city
            localStorage.setItem(city, JSON.stringify(weatherData));

            //Clear any previous data
            $(".current").empty();
            // Render the weather conditions of the most recent city search
            renderData(city);

        });
    }



    // Function to render data of the most recent/current city-search to the browser
    function renderData(city) {
        // get weatherData of most recent city search from local storage
        var data = JSON.parse(localStorage.getItem(city));
        var humidity = data.humidity;
        var icon = data.icon;
        var temp = data.temp;
        var uvi = data.uvi;
        var weather = data.weather;
        var wind = data.wind;


        //  Render weather data to browser
        $(".city").html("<h3>" + city + "</h3>"); // City Name
        $(".current").html("<img src='https://openweathermap.org/img/w/" + icon + ".png'><p>" + temp.toFixed(2) + " &deg;F<br>" + weather.replace(/\"/g, "") + "<br> Humidity: " + humidity + "%<br>Wind Speed: " + wind + "<br>UV Index: " + uvi + "</p>"); // Weather Icon

        // given the uv index for the search item, display a color that indicates uv-index conditions
        if (uvi > 8) {
            $(".uv-index").css("background-color", "purple"); // very severe conditions
        } else if (uvi > 5) {
            $(".uv-index").css("background-color", "red"); // severe conditions
        } else if (uvi > 3) {
            $(".uv-index").css("background-color", "yellow");  // moderate conditions
        } else if (uvi < 3) {
            $(".uv-index").css("background-color", "green"); // favorable conditions
        }

        // "One Call's" default behavior is to retrieve the forecast of the following 7 days. 
        // Create an object that retrieves date, temperature, icon and humidity for only the next five days.
        var fiveDay = {
            dayOne: data.forecast[1],
            dayTwo: data.forecast[2],
            dayThree: data.forecast[3],
            dayFour: data.forecast[4],
            dayFive: data.forecast[5],
        }

        // Render the data for the 5-day forecast object 
        $.each(fiveDay, function (index) {
            var forecast = fiveDay[index];
            var humidityF = forecast.humidity;
            var tempF = (forecast.temp.max - 273.15) * 1.80 + 32;
            var iconF = (forecast.weather[0].icon);
            
            var n = forecast.dt;

            $(".forecast").append("<p class='" + index + "'>");
            $("." + index).html("<p><img src='https://openweathermap.org/img/w/" + iconF + ".png'></p>");
            $("." + index).append("<p id='" + index + "-temp'>");
            $("#" + index + "-temp").html(tempF.toFixed(2) + " &deg;F<br>Humdity: " + humidityF + "%</p>");

        });

    }

    // Loop through 5 most recent items in local storage
    function searchHistory(storedCity) {
        //reset button display to prevent doubling
        $(".button-group").empty();
       // var storedCity = history[i];
        if (history.length >= 7) {
            // retrieve search history data
            for (let i = 0; i < 7; i++) {
                var storedCity = history[i];
                // make a button for each item 
                selectHistory(storedCity);
             } 
        } else if (history.length < 7) {
            // If there are less than seven items in local storage, only create buttons for existing items
            for (let i = 0; i < history.length; i++) {
                var storedCity = history[i];
               selectHistory(storedCity); 
            } 
        } else if (history = []) {
            // If there is nothing in local storage, only display the search bar
            $("main").css("display", "none");
        }

    }

    // Function to create buttons and click event for the stored city-searches. Buttons pull up current weather and forecast for that city when clicked.   
    function selectHistory(storedCity) {
        // remove spaces from the storedCity string and create ID for buttons
        var searchID = storedCity.replace(/ /g, '');
        // dynamically append html buttons
        $(".button-group").append("<a class='button' id='" + searchID + "'>" + storedCity + "</a>");
        $("#" + searchID).on('click', function (event) {
            event.preventDefault();
            getCoords(storedCity);
        });
    }
 
});

