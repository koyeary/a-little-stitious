$(document).ready(function() {


    var dateObj = new Date();
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = weekdays[dateObj.getDay()];

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = dateObj.getDate();
    var month = months[dateObj.getMonth()];
    var year = dateObj.getUTCFullYear();

    var today = day + ", " + month + " " + date + ", " + year;


    var searchHistory = [];

    // This function handles the search-button click event
    $("#search-city").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var city = $("#search-input").val().trim();
        searchOWM(city);
        //getUVIndex(city);
    });

    var searchOWM = function(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4081942e5f99ae6e3a9f08ab5e60f5ca";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            //render query response
            $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            //render date and time (still need to add time)
            $(".date").html("<h2>" + today + "</h2>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            // Convert the temp to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            // render temp content
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
            //get search coordinates and perform UV Index query 
            //var lat = response.coord.lat;
            //var lon = response.coord.lon;
            //function to find and render UV Index
/*             console.log("lat: " + lat + " lon: " + lon); */

    
    //Then save it into the storage to avoid more requests later on:
    sessionStorage.setItem("searchHistory", JSON.stringify(response));
  
    return data;  
  });
    }
});       

        

//stringify the search history array and save it to the search history key in local Storage        


   /* var uvQuery = "https://api.openweathermap.org/data/2.5/uvi?" + x + "appid=4081942e5f99ae6e3a9f08ab5e60f5ca";
    function getUVIndex() {       
        $.ajax({
            url: uvQuery,
            method: "GET"
        }).then(function(response) {
            $(".uv-index").text("UV Index: " + response);
        })
    }
    
    */

   
/* }); */