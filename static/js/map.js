// My Google Maps API Key
// AIzaSyD7Sk6ToMe9LSOpq8oeKRD8D6jxKdzAvjY

$("#search_location").submit( event => {
  event.preventDefault();
  var searchTerm = $("#loc_search").val();
  showMap(searchTerm);
});


function showMap(searchTerm="Boston") {
  var map;
  function initMap(response) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: response.coord.lat, lng: response.coord.lon},
      zoom: 8
    });
  }

  // need to call initMap function to show map
  var url = 'http://api.openweathermap.org/data/2.5/weather';
  var data = {
    q: searchTerm,
    APPID: '433ee877d8f648a1875a418c7251cb35'
  };

  $.get(url, data, initMap);
}

setTimeout(function(){
  $("#home_link").removeClass("active");
  $("#map_link").addClass("active");
}, 1);
