


  // This function handles the search-button click event
  $("#search-city").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var city = $("#search-input").val().trim();
    searchOWM(city);
  });


var searchOWM= function(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4081942e5f99ae6e3a9f08ab5e60f5ca";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        
        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
      });

      }
  


