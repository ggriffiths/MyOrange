var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var syracuse = new google.maps.LatLng(43.037633, -76.134011);
  var mapOptions = {
    zoom: 17,
    center: syracuse,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var waypts = [];
  var checkboxArray = document.getElementById('waypoints');
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected == true) {
      waypts.push({
          location:checkboxArray[i].value,
          stopover:true});
    }
  }
  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING
  };

    directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions_panel');
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);