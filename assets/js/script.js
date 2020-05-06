
//Render date in "day name, month name + date number, year" format.
var dateObj = new Date();
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var day = weekdays[dateObj.getDay()];

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var date = dateObj.getDate();
var month = months[dateObj.getMonth()];
var year = dateObj.getUTCFullYear();

var today = day + ", " + month + " " + date + ", " + year;




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
          console.log(response);
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".date").html("<h2>" + today + "</h2>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
       
     //function to get lat and lon for the city
     //api call using lat on lon to retrive uv index
     //example "http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}"   
     //   $(".uv-index").text("UV Index: ") + response
     
        
        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
      });

      }
  


