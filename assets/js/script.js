$(document).ready(function () {
    //on opening, load the most recent item in the search history

    //Find and render the date and time
    var dateObj = new Date();
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = weekdays[dateObj.getDay()];

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = dateObj.getDate();
    var month = months[dateObj.getMonth()];
    var year = dateObj.getUTCFullYear();

    var today = day + ", " + month + " " + date + ", " + year;

    //BONUS: Find and render the local time for the search city

    // This function handles the search-button click event
    $("#search-city").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var city = $("#search-input").val().trim();
        queryWeather(city);
        queryForecast(city);
        // getUVIndex(city);

    });

    /* function getHistory(city) {
            var getHistory = JSON.parse(sessionStorage.getItem(city));
           console.log(getHistory)
        } 
     */
    var queryWeather = function (city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=4081942e5f99ae6e3a9f08ab5e60f5ca";
 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var name = response.name;
            var wind = response.wind.speed;
            var humidity = response.main.humidity;
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var tempF = /* ( */response.main.temp /*- 273.15 ) * 1.80 + 32; */

            //render city and date
            $(".city").html("<h1>" + name + " Weather Details</h1>");
            $(".date").html("<h2>" + today + "</h2>");
            //render query response
            $(".wind").text("Wind Speed: " + wind);
            $(".humidity").text("Humidity: " + humidity);
            $(".tempF").text("Temperature (F) " + tempF/* .toFixed(2) */);
            //BONUS: add celsius
            /*    getUVIndex(); */

            //Then save it into the storage:
            var searchHistory = {
                city: {
                    name,
                    wind,
                    humidity,
                    lat,
                    lon,
                    tempF
                }
            }
            localStorage.setItem(name, JSON.stringify(searchHistory.city));
        });
    }

   var queryForecast = function (city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=4081942e5f99ae6e3a9f08ab5e60f5ca";
 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var listData = response.list[1];
            var wind = listData.wind.speed;
            var humidity = listData.main.humidity;
           
            var tempF = /* (response.main.temp - 273.15) * 1.80 + 32; */ listData.main.temp;
            var weather = listData.weather[0];
          //  var icon = listData.weather[0].icon;
/* 
            var lat = city.coord.lat;
            var lon = city.coord.lon; */
            
            $("section").append("<div id='forecast'>");
            $("#forecast").text("info: " + wind + ", " + humidity + ", " + tempF/* + ", " + lat + " & " + lon */);
            console.log(weather.description);
            console.log(weather.icon);
            //render city and date
          /*   $(".city").html("<h1>" + name + " Weather Details</h1>");
            $(".date").html("<h2>" + today + "</h2>"); */
            //render query response
    /*         $(".wind").text("Wind Speed: " + wind);
            $(".humidity").text("Humidity: " + humidity);
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2)); */
            //BONUS: add celsius
            /*    getUVIndex(); */

            //Then save it into the storage:
  /*           var searchHistory = {
                city: {
                    name,
                    wind,
                    humidity,
                    lat,
                    lon,
                    tempF
  /*               } 
            
            localStorage.setItem(name, JSON.stringify(searchHistory.city));*/
        });
    } 
    //end of document
});

 



       

        
/* var checkForHistory = JSON.parse(sessionStorage.getItem("searchHistory")); */

//stringify the search history array and save it to the search history key in local Storage        

 /*   var uvCoord = function(city) {
       JSON.parse(sessionStorage.getItem(city.coord));
   }  */


    
/* 
   function getUVIndex(city) { 
    var getCity = JSON.parse(sessionStorage.getItem(city));       
    console.log(getCity.lat);
    } */
/*     var uvQuery = "https://api.openweathermap.org/v3/uvi?appid=4081942e5f99ae6e3a9f08ab5e60f5ca&lat=" + cityLat + "&lon=" + cityLon;  
    $.ajax({
        url: uvQuery,
        method: "GET"
    }).then(function(response) {
        $(".uv-index").text("UV Index: " + response);
    }) */


