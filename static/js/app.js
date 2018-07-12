$.get('../../components/header.html', function(response) {
  $("#nav").html(response);
});

$("#weather-info").css("display", "none");

$("#search_weather").submit( event => {
  event.preventDefault();
  var searchTerm = $("#city_search").val();
  console.log(searchTerm);

  var url = 'http://api.openweathermap.org/data/2.5/weather';
  var data = {
    q: searchTerm,
    APPID: '433ee877d8f648a1875a418c7251cb35'
  };

  function convertFar(degree) {
    return (((degree - 273) * (9/5)) + 32).toFixed(2);
  }

  function showWeather(response) {
    $('#city_name').text(response.name + ', ' + response.sys.country);
    $("#high").html(convertFar(response.main.temp_max) + "&deg");
    $("#low").html(convertFar(response.main.temp_min) + "&deg");
    $("#forecast").html(response.weather[0].main);
    $("#humidity").html(response.main.humidity + "%");

    // console.log(response);
    $("#weather-info").css("display", "block");
  }

  $.get(url, data, showWeather);
});
